import { useState } from "react";
import { ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import Form2Editor from "@/components/Form2Editor";
import Form2CEditor from "@/components/Form2CEditor";
import FormEEditor from "@/components/FormEEditor";

interface FormItem {
  id: string;
  name: string;
  description?: string;
}

const divorceCategories = [
  {
    id: "main-cause",
    title: "The Divorce (Main Cause)",
    forms: [
      {
        id: "form-2",
        name: "Petition_Form 2: Behaviour",
      },
      {
        id: "form-2c",
        name: "Petition_Form 2C: Joint application for divorce based on two years' separation",
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
  const [showForm2Editor, setShowForm2Editor] = useState(false);
  const [showForm2CEditor, setShowForm2CEditor] = useState(false);
  const [showFormEEditor, setShowFormEEditor] = useState(false);

  const handleFormClick = (formId: string) => {
    if (formId === "form-2") {
      setShowForm2Editor(true);
    } else if (formId === "form-2c") {
      setShowForm2CEditor(true);
    } else if (formId === "form-e") {
      setShowFormEEditor(true);
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
                      onClick={() => handleFormClick(form.id)}
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

      {showForm2Editor && (
        <Form2Editor onClose={() => setShowForm2Editor(false)} />
      )}

      {showForm2CEditor && (
        <Form2CEditor onClose={() => setShowForm2CEditor(false)} />
      )}

      {showFormEEditor && (
        <FormEEditor onClose={() => setShowFormEEditor(false)} />
      )}
    </section>
  );
};

export default DivorceForms;
