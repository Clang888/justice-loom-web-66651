import { useState } from "react";
import { Link } from "react-router-dom";
import { FileText, ArrowLeft, MessageSquare } from "lucide-react";
import FormsLibrary from "@/components/FormsLibrary";
import PDFEditor from "@/components/PDFEditor";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

interface LegalForm {
  id: string;
  form_name: string;
  form_number: string | null;
  category: string;
  description: string | null;
  pdf_file_path: string;
  keywords: string[] | null;
  common_scenarios: string[] | null;
}

const Forms = () => {
  const [editingForm, setEditingForm] = useState<{ url: string; name: string } | null>(null);
  const { toast } = useToast();

  const handleEditForm = async (form: LegalForm) => {
    try {
      // Get signed URL from Supabase Storage
      const { data, error } = await supabase.storage
        .from("legal-forms")
        .createSignedUrl(form.pdf_file_path, 3600);

      if (error) throw error;

      if (data?.signedUrl) {
        setEditingForm({ url: data.signedUrl, name: form.form_name });
      }
    } catch (error) {
      console.error("Error accessing form:", error);
      toast({
        title: "Error",
        description: "Failed to open the form for editing.",
        variant: "destructive",
      });
    }
  };

  return (
    <>
      {editingForm && (
        <PDFEditor
          pdfUrl={editingForm.url}
          formName={editingForm.name}
          onClose={() => setEditingForm(null)}
        />
      )}
      
      <section className="bg-background min-h-screen">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 py-8">
          {/* Header */}
          <div className="mb-8">
            <Link to="/" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground mb-4">
              <ArrowLeft className="w-4 h-4" />
              Back to Home
            </Link>
            
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-3xl font-bold flex items-center gap-3">
                  <FileText className="w-8 h-8 text-primary" />
                  Hong Kong Family Court Forms
                </h1>
                <p className="text-muted-foreground mt-2">
                  Browse and download official Hong Kong court forms. Click "Edit in Browser" to fill forms directly.
                </p>
              </div>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="grid md:grid-cols-2 gap-4 mb-8">
            <Link to="/briefcase">
              <div className="p-4 bg-card border border-border rounded-lg hover:border-primary/50 transition-colors cursor-pointer">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-primary/10 rounded-lg">
                    <MessageSquare className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-medium">Not sure which form you need?</h3>
                    <p className="text-sm text-muted-foreground">Chat with our AI assistant to find the right form</p>
                  </div>
                </div>
              </div>
            </Link>
            
            <Link to="/ai-tools">
              <div className="p-4 bg-card border border-border rounded-lg hover:border-primary/50 transition-colors cursor-pointer">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-green-500/10 rounded-lg">
                    <FileText className="w-5 h-5 text-green-600" />
                  </div>
                  <div>
                    <h3 className="font-medium">Try Form E Beta</h3>
                    <p className="text-sm text-muted-foreground">Fill out the Financial Statement form in your browser</p>
                  </div>
                </div>
              </div>
            </Link>
          </div>

          {/* Forms Library */}
          <FormsLibrary onEditForm={handleEditForm} />

          {/* Source Attribution */}
          <div className="mt-8 p-4 bg-secondary/50 rounded-lg text-center">
            <p className="text-sm text-muted-foreground">
              Forms sourced from the{" "}
              <a 
                href="https://www.judiciary.hk/en/court_services_facilities/fcf.html"
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary hover:underline"
              >
                Hong Kong Judiciary
              </a>
              . For the most up-to-date forms, please visit the official website.
            </p>
          </div>
        </div>
      </section>
    </>
  );
};

export default Forms;
