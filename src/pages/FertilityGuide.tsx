import { Link } from "react-router-dom";
import { ArrowLeft, Download, Lock, Printer } from "lucide-react";
import { Button } from "@/components/ui/button";
import FertilityPlanningGuide from "@/components/FertilityPlanningGuide";

const FertilityGuide = () => {
  const handleDownload = () => {
    // TODO: Implement payment gate with Stripe
    console.log("Download clicked - implement Stripe payment");
  };

  const handlePrintPDF = () => {
    window.print();
  };

  return (
    <>
      {/* Print-specific styles */}
      <style>{`
        @media print {
          /* Hide non-essential elements */
          header, footer, nav, 
          .no-print,
          button:not(.print-button) {
            display: none !important;
          }
          
          /* Reset page styling */
          body {
            -webkit-print-color-adjust: exact !important;
            print-color-adjust: exact !important;
          }
          
          /* Make the guide full width */
          .print-container {
            max-width: 100% !important;
            padding: 0 !important;
            margin: 0 !important;
          }
          
          .print-container > div {
            border: none !important;
            box-shadow: none !important;
            padding: 20px !important;
          }
          
          /* Ensure images print */
          img {
            max-width: 100% !important;
            page-break-inside: avoid;
          }
          
          /* Avoid page breaks inside sections */
          section {
            page-break-inside: avoid;
          }
          
          /* Page margins */
          @page {
            margin: 1cm;
          }
        }
      `}</style>
      
      <section className="py-16 bg-background">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <Link 
            to="/egg-freezing-clinics-hk" 
            className="text-sm text-muted-foreground hover:underline mb-6 inline-flex items-center gap-2 no-print"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Egg Freezing Clinics
          </Link>

          {/* Premium Banner */}
          <div className="bg-gradient-to-r from-primary/10 via-primary/5 to-primary/10 border border-primary/20 rounded-2xl p-6 mb-8 no-print">
            <div className="flex flex-col md:flex-row items-center justify-between gap-4">
              <div>
                <h1 className="text-2xl font-bold mb-1">Premium Fertility Planning Guide</h1>
                <p className="text-muted-foreground">
                  Complete roadmap with TCM foods, clinic comparisons, legal guidance & more
                </p>
              </div>
              <div className="flex gap-2">
                <Button 
                  onClick={handlePrintPDF}
                  size="lg"
                  variant="outline"
                  className="gap-2 whitespace-nowrap"
                >
                  <Printer className="w-4 h-4" />
                  Download PDF
                </Button>
                <Button 
                  onClick={handleDownload}
                  size="lg"
                  className="gap-2 whitespace-nowrap"
                >
                  <Lock className="w-4 h-4" />
                  Purchase · HK$199
                </Button>
              </div>
            </div>
          </div>

          {/* Guide Preview */}
          <div className="bg-card border border-border rounded-2xl p-8 shadow-sm print-container">
            <FertilityPlanningGuide />
          </div>

          {/* Bottom CTA */}
          <div className="mt-8 text-center no-print">
            <div className="flex justify-center gap-3">
              <Button 
                onClick={handlePrintPDF}
                size="lg"
                variant="outline"
                className="gap-2"
              >
                <Download className="w-4 h-4" />
                Download PDF
              </Button>
              <Button 
                onClick={handleDownload}
                size="lg"
                className="gap-2"
              >
                <Lock className="w-4 h-4" />
                Purchase Guide · HK$199
              </Button>
            </div>
            <p className="text-xs text-muted-foreground mt-3">
              One-time purchase · Instant PDF download · Lifetime access
            </p>
          </div>
        </div>
      </section>
    </>
  );
};

export default FertilityGuide;
