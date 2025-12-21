import { useState, useEffect } from "react";
import { FileText, Download, ExternalLink, ChevronDown, ChevronRight, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
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

interface FormsLibraryProps {
  onFormSelect?: (form: LegalForm) => void;
}

const FormsLibrary = ({ onFormSelect }: FormsLibraryProps) => {
  const [forms, setForms] = useState<LegalForm[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [expandedCategories, setExpandedCategories] = useState<Set<string>>(new Set(["Family Law"]));
  const [selectedForm, setSelectedForm] = useState<LegalForm | null>(null);
  const { toast } = useToast();

  useEffect(() => {
    fetchForms();
  }, []);

  const fetchForms = async () => {
    try {
      const { data, error } = await supabase
        .from("legal_forms")
        .select("*")
        .order("category", { ascending: true })
        .order("form_name", { ascending: true });

      if (error) throw error;
      setForms(data || []);
    } catch (error) {
      console.error("Error fetching forms:", error);
      toast({
        title: "Error",
        description: "Failed to load forms library.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const toggleCategory = (category: string) => {
    setExpandedCategories((prev) => {
      const next = new Set(prev);
      if (next.has(category)) {
        next.delete(category);
      } else {
        next.add(category);
      }
      return next;
    });
  };

  const handleDownload = (form: LegalForm) => {
    // Open the PDF in a new tab (external HK Judiciary URL)
    window.open(form.pdf_file_path, "_blank");
    toast({
      title: "Opening form",
      description: `${form.form_name} is opening in a new tab.`,
    });
  };

  const handleFormClick = (form: LegalForm) => {
    setSelectedForm(form);
    onFormSelect?.(form);
  };

  // Group forms by category
  const formsByCategory = forms.reduce((acc, form) => {
    if (!acc[form.category]) {
      acc[form.category] = [];
    }
    acc[form.category].push(form);
    return acc;
  }, {} as Record<string, LegalForm[]>);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-12">
        <Loader2 className="w-8 h-8 animate-spin text-muted-foreground" />
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2 mb-6">
        <FileText className="w-5 h-5 text-primary" />
        <h2 className="text-lg font-semibold">Forms Library</h2>
        <span className="text-xs text-muted-foreground">({forms.length} forms)</span>
      </div>

      {Object.entries(formsByCategory).map(([category, categoryForms]) => (
        <div key={category} className="border border-border rounded-lg overflow-hidden">
          {/* Category Header */}
          <button
            onClick={() => toggleCategory(category)}
            className="w-full flex items-center justify-between p-4 bg-secondary/50 hover:bg-secondary transition-colors text-left"
          >
            <div className="flex items-center gap-2">
              {expandedCategories.has(category) ? (
                <ChevronDown className="w-4 h-4" />
              ) : (
                <ChevronRight className="w-4 h-4" />
              )}
              <span className="font-medium">{category}</span>
              <span className="text-xs text-muted-foreground bg-background px-2 py-0.5 rounded-full">
                {categoryForms.length}
              </span>
            </div>
          </button>

          {/* Forms List */}
          {expandedCategories.has(category) && (
            <div className="divide-y divide-border">
              {categoryForms.map((form) => (
                <div
                  key={form.id}
                  className={`p-4 hover:bg-muted/50 transition-colors cursor-pointer ${
                    selectedForm?.id === form.id ? "bg-primary/5 border-l-2 border-l-primary" : ""
                  }`}
                  onClick={() => handleFormClick(form)}
                >
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <h3 className="font-medium text-sm truncate">{form.form_name}</h3>
                        {form.form_number && (
                          <span className="text-xs bg-primary/10 text-primary px-2 py-0.5 rounded-full whitespace-nowrap">
                            {form.form_number}
                          </span>
                        )}
                      </div>
                      {form.description && (
                        <p className="text-xs text-muted-foreground line-clamp-2">
                          {form.description}
                        </p>
                      )}
                      {form.form_name === "Financial Statement" && form.form_number === "Form E" && (
                        <span className="inline-block mt-2 text-xs bg-green-500/10 text-green-600 px-2 py-0.5 rounded-full">
                          Beta Testing Available
                        </span>
                      )}
                    </div>
                    <div className="flex items-center gap-2 flex-shrink-0">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleDownload(form);
                        }}
                        className="text-xs"
                      >
                        <ExternalLink className="w-3 h-3 mr-1" />
                        View PDF
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      ))}

      {/* Selected Form Details Panel */}
      {selectedForm && (
        <div className="mt-6 p-4 bg-card border border-border rounded-lg">
          <div className="flex items-start justify-between mb-4">
            <div>
              <h3 className="font-semibold text-lg">{selectedForm.form_name}</h3>
              {selectedForm.form_number && (
                <span className="text-sm text-muted-foreground">{selectedForm.form_number}</span>
              )}
            </div>
            <Button onClick={() => handleDownload(selectedForm)}>
              <Download className="w-4 h-4 mr-2" />
              Download PDF
            </Button>
          </div>
          
          {selectedForm.description && (
            <p className="text-sm text-muted-foreground mb-4">{selectedForm.description}</p>
          )}

          {selectedForm.common_scenarios && selectedForm.common_scenarios.length > 0 && (
            <div className="mb-4">
              <h4 className="text-sm font-medium mb-2">When to use this form:</h4>
              <ul className="space-y-1">
                {selectedForm.common_scenarios.map((scenario, index) => (
                  <li key={index} className="text-sm text-muted-foreground flex items-start gap-2">
                    <span className="text-primary mt-0.5">•</span>
                    {scenario}
                  </li>
                ))}
              </ul>
            </div>
          )}

          {selectedForm.form_name === "Financial Statement" && selectedForm.form_number === "Form E" && (
            <div className="mt-4 p-4 bg-green-500/5 border border-green-500/20 rounded-lg">
              <p className="text-sm font-medium text-green-600 mb-2">
                This form is available for in-browser editing!
              </p>
              <Button variant="default" className="w-full" asChild>
                <a href="/ai-tools">Try Form E Beta Editor</a>
              </Button>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default FormsLibrary;
