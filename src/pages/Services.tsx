import { Hammer, ShieldCheck, FileText, Calculator, FlaskConical, Edit } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import FormECalculator from "@/components/FormECalculator";
import Form2CEditor from "@/components/Form2CEditor";

const Services = () => {
  const [showCalculator, setShowCalculator] = useState(false);
  const [showForm2CEditor, setShowForm2CEditor] = useState(false);

  return (
    <section className="py-16 bg-secondary">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-bold">Services</h2>
        <p className="mt-3 text-muted-foreground max-w-2xl">
          Guides, worksheets and templates to help you navigate your way through your legal issues.
        </p>

        <div className="mt-8 grid md:grid-cols-2 gap-6">
          {/* Divorce Card - Enhanced with form links */}
          <div className="bg-card border border-border rounded-2xl p-6 shadow-sm">
            <div className="flex items-center gap-3">
              <Hammer className="w-6 h-6" />
              <h3 className="font-semibold text-lg">Divorce</h3>
            </div>
            <p className="mt-3 text-sm text-muted-foreground">
              Timetables (FDA/FDR), Form E guidance, disclosure checklists, settlement prep.
            </p>
            
            <div className="mt-4 space-y-2">
              <Link to="/forms">
                <Button variant="outline" size="sm" className="w-full justify-start gap-2">
                  <FileText className="w-4 h-4" />
                  Fillable Divorce Forms
                </Button>
              </Link>
              <Button 
                variant="outline" 
                size="sm" 
                className="w-full justify-start gap-2"
                onClick={() => setShowForm2CEditor(true)}
              >
                <Edit className="w-4 h-4" />
                Form 2C - Joint Application (Fill Online)
              </Button>
              <Link to="/forms?edit=form-e">
                <Button variant="outline" size="sm" className="w-full justify-start gap-2">
                  <Calculator className="w-4 h-4" />
                  Form E (Financial Statement)
                </Button>
              </Link>
              <Button 
                variant="outline" 
                size="sm" 
                className="w-full justify-start gap-2"
                onClick={() => setShowCalculator(!showCalculator)}
              >
                <FlaskConical className="w-4 h-4" />
                Beta Testing Form E Calculator
              </Button>
            </div>
          </div>

          {/* Wills & Estates Card */}
          <div className="bg-card border border-border rounded-2xl p-6 shadow-sm">
            <div className="flex items-center gap-3">
              <ShieldCheck className="w-6 h-6" />
              <h3 className="font-semibold text-lg">Wills & Estates</h3>
            </div>
            <p className="mt-3 text-sm text-muted-foreground">
              Starter packs, asset schedules, executorship basics, witness requirements.
            </p>
          </div>
        </div>

        {/* Form E Calculator - shown when toggled */}
        {showCalculator && (
          <div className="mt-8">
            <FormECalculator />
          </div>
        )}
      </div>

      {/* Form 2C Editor Modal */}
      {showForm2CEditor && (
        <Form2CEditor onClose={() => setShowForm2CEditor(false)} />
      )}
    </section>
  );
};

export default Services;
