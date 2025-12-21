import { Scale, ShieldCheck, FileText, Calculator, FlaskConical, Mail, Loader2 } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import FormECalculator from "@/components/FormECalculator";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

const Services = () => {
  const [showCalculator, setShowCalculator] = useState(false);
  const [showEmailCapture, setShowEmailCapture] = useState(false);
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [hasAccess, setHasAccess] = useState(false);

  const validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleEmailSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateEmail(email)) {
      toast.error("Please enter a valid email address");
      return;
    }

    setIsSubmitting(true);
    
    try {
      const { error } = await supabase
        .from('form_e_beta_signups')
        .insert({ email: email.toLowerCase().trim() });

      if (error) {
        if (error.code === '23505') {
          // Duplicate email - still grant access
          toast.success("Welcome back! You already have access.");
        } else {
          throw error;
        }
      } else {
        toast.success("Thank you! You now have access to the beta calculator.");
      }

      setHasAccess(true);
      setShowEmailCapture(false);
      setShowCalculator(true);
    } catch (error: any) {
      console.error("Error saving email:", error);
      toast.error("Something went wrong. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleBetaClick = () => {
    if (hasAccess) {
      setShowCalculator(!showCalculator);
    } else {
      setShowEmailCapture(true);
    }
  };

  return (
    <section className="py-16 bg-secondary">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">

        <div className="mt-8 flex flex-col md:flex-row justify-center gap-6">
          {/* Divorce Card */}
          <div className="bg-card border border-border rounded-2xl p-6 shadow-sm w-full max-w-sm">
            <div className="flex items-center gap-3">
              <Scale className="w-6 h-6" />
              <h3 className="font-semibold text-lg">Divorce</h3>
            </div>
            
            <div className="mt-4 space-y-2">
              <Link to="/divorce-forms">
                <Button variant="outline" size="sm" className="w-full justify-start gap-2">
                  <FileText className="w-4 h-4" />
                  Fillable Divorce Forms
                </Button>
              </Link>
              <Link to="/form-e">
                <Button variant="outline" size="sm" className="w-full justify-start gap-2">
                  <Calculator className="w-4 h-4" />
                  Form E (Financial Statement)
                </Button>
              </Link>
              <Button 
                variant="outline" 
                size="sm" 
                className="w-full justify-start gap-2"
                onClick={handleBetaClick}
              >
                <FlaskConical className="w-4 h-4" />
                Beta Testing Form E Calculator
              </Button>
            </div>
          </div>

          {/* Wills & Estates Card */}
          <div className="bg-card border border-border rounded-2xl p-6 shadow-sm w-full max-w-sm">
            <div className="flex items-center gap-3">
              <ShieldCheck className="w-6 h-6" />
              <h3 className="font-semibold text-lg">Wills & Estates</h3>
            </div>
            <p className="mt-3 text-sm text-muted-foreground">
              Simple Wills, Enduring Power of Attorney<br />Advanced Directives, Executors & Witnesses
            </p>
          </div>
        </div>

        {/* Email Capture Modal */}
        {showEmailCapture && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
            <div className="bg-card border border-border rounded-2xl p-6 max-w-md w-full">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2 bg-primary/10 rounded-lg">
                  <FlaskConical className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold">Join the Beta</h3>
                  <p className="text-sm text-muted-foreground">Get early access to Form E Calculator</p>
                </div>
              </div>

              <p className="text-sm text-muted-foreground mb-4">
                Enter your email to access our beta Form E Calculator. We'll keep you updated on new features and improvements. Your participation and feedback is important to us.
              </p>

              <form onSubmit={handleEmailSubmit} className="space-y-4">
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="your@email.com"
                    required
                    className="w-full pl-10 pr-4 py-2.5 bg-secondary/50 border border-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                  />
                </div>

                <div className="flex gap-3">
                  <Button 
                    type="button" 
                    variant="outline" 
                    className="flex-1"
                    onClick={() => setShowEmailCapture(false)}
                  >
                    Cancel
                  </Button>
                  <Button 
                    type="submit" 
                    className="flex-1"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                        Submitting...
                      </>
                    ) : (
                      "Get Access"
                    )}
                  </Button>
                </div>
              </form>

              <p className="mt-4 text-xs text-muted-foreground text-center">
                We respect your privacy. Your email will only be used for beta updates.
              </p>
            </div>
          </div>
        )}

        {/* Form E Calculator - shown when toggled */}
        {showCalculator && (
          <div className="mt-8">
            <FormECalculator />
          </div>
        )}
      </div>
    </section>
  );
};

export default Services;
