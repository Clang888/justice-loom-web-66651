import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { Upload, FileText, Trash2, Loader2 } from "lucide-react";
import { z } from "zod";

const formSchema = z.object({
  form_name: z.string().trim().min(1, "Form name is required").max(200),
  form_number: z.string().trim().max(100).optional(),
  category: z.string().trim().min(1, "Category is required").max(100),
  description: z.string().trim().max(1000).optional(),
  keywords: z.string().trim().max(500).optional(),
});

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

const Admin = () => {
  const [isAdmin, setIsAdmin] = useState(false);
  const [loading, setLoading] = useState(true);
  const [forms, setForms] = useState<LegalForm[]>([]);
  const [uploading, setUploading] = useState(false);
  
  // Form state
  const [formName, setFormName] = useState("");
  const [formNumber, setFormNumber] = useState("");
  const [category, setCategory] = useState("");
  const [description, setDescription] = useState("");
  const [keywords, setKeywords] = useState("");
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    // Set up auth state listener FIRST
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

    // THEN check for existing session
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

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 50 * 1024 * 1024) {
        toast({
          title: "File too large",
          description: "Maximum file size is 50MB",
          variant: "destructive",
        });
        return;
      }
      
      const validTypes = ['application/pdf', 'application/zip', 'application/x-zip-compressed'];
      if (!validTypes.includes(file.type)) {
        toast({
          title: "Invalid file type",
          description: "Only PDF and ZIP files are allowed",
          variant: "destructive",
        });
        return;
      }
      
      setSelectedFile(file);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!selectedFile) {
      toast({
        title: "No file selected",
        description: "Please select a PDF or ZIP file to upload",
        variant: "destructive",
      });
      return;
    }

    // Validate form data
    const validation = formSchema.safeParse({
      form_name: formName,
      form_number: formNumber || undefined,
      category,
      description: description || undefined,
      keywords: keywords || undefined,
    });

    if (!validation.success) {
      const firstError = validation.error.issues[0];
      toast({
        title: "Validation Error",
        description: firstError.message,
        variant: "destructive",
      });
      return;
    }

    setUploading(true);

    try {
      // Upload file to storage
      const fileExt = selectedFile.name.split('.').pop();
      const fileName = `${Date.now()}-${Math.random().toString(36).substring(7)}.${fileExt}`;
      const filePath = `forms/${fileName}`;

      const { error: uploadError } = await supabase.storage
        .from("legal-forms")
        .upload(filePath, selectedFile);

      if (uploadError) throw uploadError;

      // Insert form metadata
      const keywordsArray = keywords ? keywords.split(',').map(k => k.trim()).filter(k => k) : null;
      
      const { error: insertError } = await supabase
        .from("legal_forms")
        .insert({
          form_name: validation.data.form_name,
          form_number: validation.data.form_number || null,
          category: validation.data.category,
          description: validation.data.description || null,
          keywords: keywordsArray,
          pdf_file_path: filePath,
        });

      if (insertError) throw insertError;

      toast({
        title: "Success",
        description: "Form uploaded successfully",
      });

      // Reset form
      setFormName("");
      setFormNumber("");
      setCategory("");
      setDescription("");
      setKeywords("");
      setSelectedFile(null);
      
      // Reload forms
      loadForms();
    } catch (error: any) {
      console.error("Error uploading form:", error);
      toast({
        title: "Upload Failed",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setUploading(false);
    }
  };

  const handleDelete = async (formId: string, filePath: string) => {
    if (!confirm("Are you sure you want to delete this form?")) return;

    try {
      // Delete file from storage
      const { error: storageError } = await supabase.storage
        .from("legal-forms")
        .remove([filePath]);

      if (storageError) throw storageError;

      // Delete from database
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
          <p className="text-muted-foreground">Manage legal forms and documents</p>
        </div>

        {/* Upload Form */}
        <div className="bg-card border border-border rounded-lg p-6 mb-8">
          <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
            <Upload className="w-5 h-5" />
            Upload New Form
          </h2>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-2">
                  Form Name *
                </label>
                <input
                  type="text"
                  value={formName}
                  onChange={(e) => setFormName(e.target.value)}
                  className="w-full px-4 py-2 rounded-lg border border-input bg-background focus:outline-none focus:ring-2 focus:ring-ring"
                  placeholder="e.g., Divorce Petition Form"
                  required
                  maxLength={200}
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">
                  Form Number
                </label>
                <input
                  type="text"
                  value={formNumber}
                  onChange={(e) => setFormNumber(e.target.value)}
                  className="w-full px-4 py-2 rounded-lg border border-input bg-background focus:outline-none focus:ring-2 focus:ring-ring"
                  placeholder="e.g., HK-DIV-001"
                  maxLength={100}
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">
                Category *
              </label>
              <input
                type="text"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full px-4 py-2 rounded-lg border border-input bg-background focus:outline-none focus:ring-2 focus:ring-ring"
                placeholder="e.g., Divorce, Small Claims, Wills"
                required
                maxLength={100}
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">
                Description
              </label>
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="w-full px-4 py-2 rounded-lg border border-input bg-background focus:outline-none focus:ring-2 focus:ring-ring"
                rows={3}
                placeholder="Brief description of the form..."
                maxLength={1000}
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">
                Keywords (comma-separated)
              </label>
              <input
                type="text"
                value={keywords}
                onChange={(e) => setKeywords(e.target.value)}
                className="w-full px-4 py-2 rounded-lg border border-input bg-background focus:outline-none focus:ring-2 focus:ring-ring"
                placeholder="e.g., divorce, petition, hong kong"
                maxLength={500}
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">
                PDF/ZIP File (max 50MB) *
              </label>
              <input
                type="file"
                accept=".pdf,.zip"
                onChange={handleFileChange}
                className="w-full px-4 py-2 rounded-lg border border-input bg-background focus:outline-none focus:ring-2 focus:ring-ring"
                required
              />
              {selectedFile && (
                <p className="text-sm text-muted-foreground mt-2">
                  Selected: {selectedFile.name} ({(selectedFile.size / 1024 / 1024).toFixed(2)} MB)
                </p>
              )}
            </div>

            <Button type="submit" disabled={uploading} className="w-full">
              {uploading ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  Uploading...
                </>
              ) : (
                <>
                  <Upload className="w-4 h-4 mr-2" />
                  Upload Form
                </>
              )}
            </Button>
          </form>
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
