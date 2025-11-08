import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { Upload, FileText, Trash2, Loader2, Bot, CheckCircle2, XCircle } from "lucide-react";

interface LegalForm {
  id: string;
  form_name: string;
  form_number: string | null;
  category: string;
  description: string | null;
  pdf_file_path: string;
  common_scenarios: string[] | null;
  keywords: string[] | null;
  created_at: string | null;
}

interface FileUploadStatus {
  file: File;
  status: 'uploading' | 'analyzing' | 'ready' | 'failed';
  metadata?: {
    form_name: string;
    form_number: string | null;
    category: string;
    description: string | null;
    keywords: string[];
    common_scenarios: string[];
  };
  error?: string;
  filePath?: string;
}

const Admin = () => {
  const [isAdmin, setIsAdmin] = useState(false);
  const [loading, setLoading] = useState(true);
  const [forms, setForms] = useState<LegalForm[]>([]);
  const [uploadQueue, setUploadQueue] = useState<FileUploadStatus[]>([]);
  const [processing, setProcessing] = useState(false);

  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        if (session?.user) {
          setTimeout(() => {
            checkAdminStatus(session.user.id);
          }, 0);
        } else {
          navigate("/auth");
        }
      }
    );

    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session?.user) {
        checkAdminStatus(session.user.id);
      } else {
        navigate("/auth");
      }
    });

    return () => subscription.unsubscribe();
  }, [navigate]);

  const checkAdminStatus = async (userId: string) => {
    try {
      const { data, error } = await supabase
        .from("user_roles")
        .select("role")
        .eq("user_id", userId)
        .eq("role", "admin")
        .maybeSingle();

      if (error) throw error;

      setIsAdmin(!!data);
      if (data) {
        loadForms();
      }
    } catch (error) {
      console.error("Error checking admin status:", error);
      toast({
        title: "Error",
        description: "Failed to verify admin access",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const loadForms = async () => {
    try {
      const { data, error } = await supabase
        .from("legal_forms")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) throw error;
      setForms(data || []);
    } catch (error) {
      console.error("Error loading forms:", error);
      toast({
        title: "Error",
        description: "Failed to load forms",
        variant: "destructive",
      });
    }
  };

  const handleFilesSelected = async (files: FileList | null) => {
    if (!files || files.length === 0) return;

    const newFiles: FileUploadStatus[] = [];
    
    for (let i = 0; i < Math.min(files.length, 10); i++) {
      const file = files[i];
      
      if (file.size > 50 * 1024 * 1024) {
        toast({
          title: "File too large",
          description: `${file.name} exceeds 50MB limit`,
          variant: "destructive",
        });
        continue;
      }
      
      if (file.type !== 'application/pdf') {
        toast({
          title: "Invalid file type",
          description: `${file.name} is not a PDF file`,
          variant: "destructive",
        });
        continue;
      }
      
      newFiles.push({
        file,
        status: 'uploading',
      });
    }

    if (newFiles.length > 0) {
      setUploadQueue(prev => [...prev, ...newFiles]);
      processFiles(newFiles);
    }
  };

  const processFiles = async (filesToProcess: FileUploadStatus[]) => {
    for (const fileStatus of filesToProcess) {
      await processFile(fileStatus);
      // Small delay between files to avoid rate limiting
      await new Promise(resolve => setTimeout(resolve, 500));
    }
  };

  const processFile = async (fileStatus: FileUploadStatus) => {
    try {
      // Step 1: Upload to storage
      const fileExt = fileStatus.file.name.split('.').pop();
      const fileName = `${Date.now()}-${Math.random().toString(36).substring(7)}.${fileExt}`;
      const filePath = `forms/${fileName}`;

      const { error: uploadError } = await supabase.storage
        .from("legal-forms")
        .upload(filePath, fileStatus.file);

      if (uploadError) throw uploadError;

      // Update status to analyzing
      setUploadQueue(prev => prev.map(f => 
        f.file === fileStatus.file 
          ? { ...f, status: 'analyzing', filePath } 
          : f
      ));

      // Step 2: Analyze with AI
      const formData = new FormData();
      formData.append('file', fileStatus.file);

      const { data: analyzeData, error: analyzeError } = await supabase.functions.invoke(
        'analyze-legal-form',
        {
          body: formData,
        }
      );

      if (analyzeError) throw analyzeError;

      if (analyzeData.error) {
        throw new Error(analyzeData.error);
      }

      // Update status to ready with metadata
      setUploadQueue(prev => prev.map(f => 
        f.file === fileStatus.file 
          ? { 
              ...f, 
              status: 'ready',
              metadata: analyzeData.metadata,
              filePath 
            } 
          : f
      ));

    } catch (error: any) {
      console.error('Error processing file:', error);
      
      // Update status to failed
      setUploadQueue(prev => prev.map(f => 
        f.file === fileStatus.file 
          ? { 
              ...f, 
              status: 'failed',
              error: error.message 
            } 
          : f
      ));
    }
  };

  const handleSaveAll = async () => {
    const readyFiles = uploadQueue.filter(f => f.status === 'ready');
    
    if (readyFiles.length === 0) {
      toast({
        title: "No files ready",
        description: "Wait for files to finish analyzing",
        variant: "destructive",
      });
      return;
    }

    setProcessing(true);

    try {
      for (const fileStatus of readyFiles) {
        if (!fileStatus.metadata || !fileStatus.filePath) continue;

        const { error } = await supabase
          .from("legal_forms")
          .insert({
            form_name: fileStatus.metadata.form_name,
            form_number: fileStatus.metadata.form_number,
            category: fileStatus.metadata.category,
            description: fileStatus.metadata.description,
            keywords: fileStatus.metadata.keywords,
            common_scenarios: fileStatus.metadata.common_scenarios,
            pdf_file_path: fileStatus.filePath,
          });

        if (error) throw error;
      }

      toast({
        title: "Success",
        description: `${readyFiles.length} form(s) saved successfully`,
      });

      // Clear upload queue and reload forms
      setUploadQueue([]);
      loadForms();

    } catch (error: any) {
      console.error("Error saving forms:", error);
      toast({
        title: "Save Failed",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setProcessing(false);
    }
  };

  const handleRetry = async (fileStatus: FileUploadStatus) => {
    setUploadQueue(prev => prev.map(f => 
      f.file === fileStatus.file 
        ? { ...f, status: 'uploading', error: undefined } 
        : f
    ));
    await processFile(fileStatus);
  };

  const handleRemoveFromQueue = (fileStatus: FileUploadStatus) => {
    setUploadQueue(prev => prev.filter(f => f.file !== fileStatus.file));
  };

  const handleDelete = async (formId: string, filePath: string) => {
    if (!confirm("Are you sure you want to delete this form?")) return;

    try {
      const { error: storageError } = await supabase.storage
        .from("legal-forms")
        .remove([filePath]);

      if (storageError) throw storageError;

      const { error: dbError } = await supabase
        .from("legal_forms")
        .delete()
        .eq("id", formId);

      if (dbError) throw dbError;

      toast({
        title: "Success",
        description: "Form deleted successfully",
      });

      loadForms();
    } catch (error: any) {
      console.error("Error deleting form:", error);
      toast({
        title: "Delete Failed",
        description: error.message,
        variant: "destructive",
      });
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin" />
      </div>
    );
  }

  if (!isAdmin) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center px-4">
        <div className="text-center">
          <h1 className="text-3xl font-bold mb-4">Access Denied</h1>
          <p className="text-muted-foreground mb-6">
            You need admin privileges to access this page.
          </p>
          <Button onClick={() => navigate("/")}>Go Home</Button>
        </div>
      </div>
    );
  }

  return (
    <section className="min-h-screen bg-background py-8">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Admin Panel</h1>
          <p className="text-muted-foreground">AI-powered bulk upload for legal forms</p>
        </div>

        {/* Bulk Upload Zone */}
        <div className="bg-card border border-border rounded-lg p-6 mb-8">
          <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
            <Bot className="w-5 h-5" />
            AI Bulk Upload
          </h2>

          <div className="mb-6">
            <label 
              htmlFor="file-upload"
              className="flex flex-col items-center justify-center w-full h-64 border-2 border-dashed border-border rounded-lg cursor-pointer bg-secondary/20 hover:bg-secondary/40 transition-colors"
            >
              <div className="flex flex-col items-center justify-center pt-5 pb-6">
                <Upload className="w-12 h-12 mb-4 text-muted-foreground" />
                <p className="mb-2 text-sm font-semibold">
                  Drop PDF files here or click to browse
                </p>
                <p className="text-xs text-muted-foreground">
                  Upload up to 10 PDFs (max 50MB each)
                </p>
                <p className="text-xs text-muted-foreground mt-2">
                  AI will automatically extract metadata from each file
                </p>
              </div>
              <input
                id="file-upload"
                type="file"
                className="hidden"
                accept=".pdf"
                multiple
                onChange={(e) => handleFilesSelected(e.target.files)}
              />
            </label>
          </div>

          {/* Upload Queue */}
          {uploadQueue.length > 0 && (
            <div className="space-y-3">
              {uploadQueue.map((fileStatus, idx) => (
                <div
                  key={idx}
                  className="border border-border rounded-lg p-4 bg-background"
                >
                  <div className="flex items-start gap-3">
                    {fileStatus.status === 'uploading' && (
                      <Loader2 className="w-5 h-5 animate-spin text-primary mt-1 shrink-0" />
                    )}
                    {fileStatus.status === 'analyzing' && (
                      <Bot className="w-5 h-5 text-primary animate-pulse mt-1 shrink-0" />
                    )}
                    {fileStatus.status === 'ready' && (
                      <CheckCircle2 className="w-5 h-5 text-green-500 mt-1 shrink-0" />
                    )}
                    {fileStatus.status === 'failed' && (
                      <XCircle className="w-5 h-5 text-destructive mt-1 shrink-0" />
                    )}

                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between mb-2">
                        <p className="font-medium truncate">{fileStatus.file.name}</p>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleRemoveFromQueue(fileStatus)}
                        >
                          <XCircle className="w-4 h-4" />
                        </Button>
                      </div>

                      {fileStatus.status === 'uploading' && (
                        <p className="text-sm text-muted-foreground">Uploading...</p>
                      )}

                      {fileStatus.status === 'analyzing' && (
                        <p className="text-sm text-muted-foreground">Analyzing with AI...</p>
                      )}

                      {fileStatus.status === 'failed' && (
                        <div>
                          <p className="text-sm text-destructive mb-2">{fileStatus.error}</p>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handleRetry(fileStatus)}
                          >
                            Retry
                          </Button>
                        </div>
                      )}

                      {fileStatus.status === 'ready' && fileStatus.metadata && (
                        <div className="bg-secondary/50 rounded-lg p-3 mt-2">
                          <div className="grid gap-2 text-sm">
                            <div>
                              <span className="font-medium">Name:</span> {fileStatus.metadata.form_name}
                            </div>
                            {fileStatus.metadata.form_number && (
                              <div>
                                <span className="font-medium">Number:</span> {fileStatus.metadata.form_number}
                              </div>
                            )}
                            <div>
                              <span className="font-medium">Category:</span> {fileStatus.metadata.category}
                            </div>
                            {fileStatus.metadata.description && (
                              <div>
                                <span className="font-medium">Description:</span> {fileStatus.metadata.description}
                              </div>
                            )}
                            {fileStatus.metadata.keywords.length > 0 && (
                              <div className="flex flex-wrap gap-1 mt-1">
                                {fileStatus.metadata.keywords.map((keyword, i) => (
                                  <span
                                    key={i}
                                    className="px-2 py-0.5 bg-primary/10 text-xs rounded"
                                  >
                                    {keyword}
                                  </span>
                                ))}
                              </div>
                            )}
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ))}

              <Button
                onClick={handleSaveAll}
                disabled={processing || uploadQueue.filter(f => f.status === 'ready').length === 0}
                className="w-full"
              >
                {processing ? (
                  <>
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    Saving...
                  </>
                ) : (
                  <>
                    <CheckCircle2 className="w-4 h-4 mr-2" />
                    Save All Ready Forms ({uploadQueue.filter(f => f.status === 'ready').length})
                  </>
                )}
              </Button>
            </div>
          )}
        </div>

        {/* Forms List */}
        <div className="bg-card border border-border rounded-lg p-6">
          <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
            <FileText className="w-5 h-5" />
            Uploaded Forms ({forms.length})
          </h2>

          <div className="space-y-4">
            {forms.length === 0 ? (
              <p className="text-muted-foreground text-center py-8">
                No forms uploaded yet
              </p>
            ) : (
              forms.map((form) => (
                <div
                  key={form.id}
                  className="border border-border rounded-lg p-4 hover:bg-secondary/50 transition-colors"
                >
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <h3 className="font-semibold">{form.form_name}</h3>
                      {form.form_number && (
                        <p className="text-sm text-muted-foreground">
                          Form Number: {form.form_number}
                        </p>
                      )}
                      <p className="text-sm text-muted-foreground">
                        Category: {form.category}
                      </p>
                      {form.description && (
                        <p className="text-sm mt-2">{form.description}</p>
                      )}
                      {form.keywords && form.keywords.length > 0 && (
                        <div className="flex flex-wrap gap-2 mt-2">
                          {form.keywords.map((keyword, idx) => (
                            <span
                              key={idx}
                              className="px-2 py-1 bg-secondary text-xs rounded"
                            >
                              {keyword}
                            </span>
                          ))}
                        </div>
                      )}
                    </div>
                    <Button
                      variant="destructive"
                      size="icon"
                      onClick={() => handleDelete(form.id, form.pdf_file_path)}
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Admin;
