import { useState } from "react";
import { ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useTranslation } from "react-i18next";
import Form2Editor from "@/components/Form2Editor";
import Form2CEditor from "@/components/Form2CEditor";
import FormEEditor from "@/components/FormEEditor";

interface FormItem {
  id: string;
  nameKey: string;
  description?: string;
}

interface CategoryItem {
  id: string;
  titleKey: string;
  forms: FormItem[];
}

const divorceCategories: CategoryItem[] = [
  {
    id: "main-cause",
    titleKey: "divorceForms.mainCause",
    forms: [
      {
        id: "form-2",
        nameKey: "divorceForms.form2",
      },
      {
        id: "form-2c",
        nameKey: "divorceForms.form2c",
      },
    ],
  },
  {
    id: "financial",
    titleKey: "divorceForms.financial",
    forms: [
      {
        id: "form-e",
        nameKey: "divorceForms.formE",
      },
    ],
  },
  {
    id: "children",
    titleKey: "divorceForms.children",
    forms: [],
  },
];

const DivorceForms = () => {
  const { t } = useTranslation();
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
            {t("divorceForms.backButton")}
          </Button>
        </Link>

        <h1 className="text-3xl font-bold">{t("divorceForms.title")}</h1>
        <p className="mt-3 text-muted-foreground max-w-2xl">
          {t("divorceForms.description")}
        </p>

        <div className="mt-8 grid grid-cols-1 max-w-2xl gap-6">
          {divorceCategories.map((category) => (
            <div
              key={category.id}
              className="bg-card border border-border rounded-2xl p-6 shadow-sm"
            >
              <div className="mb-4">
                <h2 className="font-semibold text-lg">{t(category.titleKey)}</h2>
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
                        <div className="font-medium">{t(form.nameKey)}</div>
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
                  {t("divorceForms.comingSoon")}
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
