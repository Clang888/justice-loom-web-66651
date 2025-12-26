import { useState } from "react";
import { ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import Form2CEditor from "@/components/Form2CEditor";
import FormEEditor from "@/components/FormEEditor";
import PDFEditor from "@/components/PDFEditor";

interface FormItem {
  id: string;
  name: string;
  description?: string;
  pdfUrl?: string;
}

const divorceCategories = [
  {
    id: "main-cause",
    title: "The Divorce (Main Cause)",
    forms: [
      {
        id: "form-2c",
        name: "Petition Form 2C: Joint application for divorce based on two years' separation",
      },
      {
        id: "petition-consent-1-year",
        name: "Petition for Divorce: Consent (1 Year Separation)",
        pdfUrl: "/forms/petition-consent-1-year.pdf",
      },
      {
        id: "petition-2-years-separation",
        name: "Petition for Divorce: Two Years' Separation",
        pdfUrl: "/forms/petition-2-years-separation.pdf",
      },
      {
        id: "petition-desertion",
        name: "Petition for Divorce: Desertion",
        pdfUrl: "/forms/petition-desertion.pdf",
      },
      {
        id: "petition-behaviour",
        name: "Petition for Divorce: Behaviour",
        pdfUrl: "/forms/petition-behaviour.pdf",
      },
      {
        id: "petition-adultery",
        name: "Petition for Divorce: Adultery",
        pdfUrl: "/forms/petition-adultery.pdf",
      },
    ] as FormItem[],
  },
  {
    id: "financial",
    title: "Financial",
    forms: [
      {
        id: "form-e",
        name: "Form E: Financial Statement",
      },
    ] as FormItem[],
  },
  {
    id: "children",
    title: "Children",
    forms: [] as FormItem[],
  },
];

const DivorceForms = () => {
  const [showForm2CEditor, setShowForm2CEditor] = useState(false);
  const [showFormEEditor, setShowFormEEditor] = useState(false);
  const [activePdfForm, setActivePdfForm] = useState<FormItem | null>(null);

  const handleFormClick = (form: FormItem) => {
    if (form.id === "form-2c") {
      setShowForm2CEditor(true);
    } else if (form.id === "form-e") {
      setShowFormEEditor(true);
    } else if (form.pdfUrl) {
      setActivePdfForm(form);
    }
  };

  return (
    <section className="py-16 bg-secondary min-h-screen">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <Link to="/services">
          <Button variant="ghost" size="sm" className="mb-6 gap-2">
            <ArrowLeft className="w-4 h-4" />
            Back to Divorce & Wills
          </Button>
        </Link>

        <h1 className="text-3xl font-bold">Fillable Divorce Forms</h1>
        <p className="mt-3 text-muted-foreground max-w-2xl">
          Select a category to view available forms. Click on any form to fill it out online.
        </p>

        <div className="mt-8 grid grid-cols-1 max-w-2xl gap-6">
          {divorceCategories.map((category) => (
            <div
              key={category.id}
              className="bg-card border border-border rounded-2xl p-6 shadow-sm"
            >
              <div className="mb-4">
                <h2 className="font-semibold text-lg">{category.title}</h2>
              </div>

              {category.forms.length > 0 ? (
                <div className="space-y-2">
                  {category.forms.map((form) => (
                    <Button
                      key={form.id}
                      variant="outline"
                      size="sm"
                      className="w-full justify-start text-left h-auto py-3"
                      onClick={() => handleFormClick(form)}
                    >
                      <div>
                        <div className="font-medium">{form.name}</div>
                        {form.description && (
                          <div className="text-xs text-muted-foreground mt-1">
                            {form.description}
                          </div>
                        )}
                      </div>
                    </Button>
                  ))}
                </div>
              ) : (
                <p className="text-sm text-muted-foreground italic">
                  Forms coming soon...
                </p>
              )}
            </div>
          ))}
        </div>
      </div>

      {showForm2CEditor && (
        <Form2CEditor onClose={() => setShowForm2CEditor(false)} />
      )}

      {showFormEEditor && (
        <FormEEditor onClose={() => setShowFormEEditor(false)} />
      )}

      {activePdfForm && activePdfForm.pdfUrl && (
        <PDFEditor
          pdfUrl={activePdfForm.pdfUrl}
          formName={activePdfForm.name}
          onClose={() => setActivePdfForm(null)}
        />
      )}
    </section>
  );
};

export default DivorceForms;
