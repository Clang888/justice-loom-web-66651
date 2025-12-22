import { Link } from "react-router-dom";
import { ArrowLeft, Download, Lock, Printer } from "lucide-react";
import { Button } from "@/components/ui/button";
import FertilityPlanningGuide from "@/components/FertilityPlanningGuide";
import { useRef } from "react";

const FertilityGuide = () => {
  const printRef = useRef<HTMLDivElement>(null);

  const handleDownload = () => {
    // TODO: Implement payment gate with Stripe
    console.log("Download clicked - implement Stripe payment");
  };

  const handlePrintPDF = () => {
    if (!printRef.current) return;
    
    const printContent = printRef.current.innerHTML;
    const printWindow = window.open('', '_blank');
    
    if (!printWindow) {
      alert('Please allow popups to download the PDF');
      return;
    }
    
    printWindow.document.write(`
      <!DOCTYPE html>
      <html>
        <head>
          <title>Hong Kong Fertility Planning Guide</title>
          <meta charset="UTF-8">
          <style>
            @import url('https://fonts.googleapis.com/css2?family=Noto+Sans+SC:wght@400;500;600;700&family=Inter:wght@300;400;500;600&display=swap');
            * {
              margin: 0;
              padding: 0;
              box-sizing: border-box;
            }
            body {
              font-family: 'Inter', 'Noto Sans SC', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
              line-height: 1.6;
              color: #1a1a1a;
              padding: 40px;
              max-width: 800px;
              margin: 0 auto;
            }
            h1 { font-size: 28px; margin-bottom: 8px; font-weight: bold; }
            h2 { font-size: 20px; margin-top: 24px; margin-bottom: 12px; font-weight: 600; page-break-after: avoid; }
            h3 { font-size: 14px; margin-bottom: 6px; font-weight: 600; page-break-after: avoid; }
            p { margin-bottom: 10px; color: #444; font-size: 13px; orphans: 3; widows: 3; }
            ul { margin-left: 16px; margin-bottom: 10px; }
            li { margin-bottom: 3px; color: #444; font-size: 13px; }
            img { max-width: 100%; height: 120px; object-fit: cover; border-radius: 8px; margin: 12px 0; page-break-inside: avoid; }
            table { width: 100%; border-collapse: collapse; margin: 12px 0; font-size: 11px; page-break-inside: avoid; }
            th, td { border: 1px solid #ddd; padding: 6px 8px; text-align: left; }
            th { background: #f5f5f5; font-weight: 600; }
            tr { page-break-inside: avoid; page-break-after: auto; }
            thead { display: table-header-group; }
            section { margin-bottom: 24px; page-break-inside: auto; }
            .text-primary { color: #1e3a5f; }
            .text-muted-foreground { color: #666; }
            .bg-secondary\\/50, .bg-primary\\/10 { background: #f8f8f8; padding: 12px; border-radius: 8px; margin: 10px 0; page-break-inside: avoid; }
            .border-l-4 { border-left: 4px solid; padding-left: 12px; margin-bottom: 8px; page-break-inside: avoid; }
            .border-blue-500 { border-color: #3b82f6; }
            .border-green-500 { border-color: #22c55e; }
            .border-orange-500 { border-color: #f97316; }
            .border-cyan-500 { border-color: #06b6d4; }
            .grid { display: grid; gap: 12px; }
            .md\\:grid-cols-2 { grid-template-columns: repeat(2, 1fr); }
            .md\\:grid-cols-3 { grid-template-columns: repeat(3, 1fr); }
            .flex { display: flex; }
            .items-center { align-items: center; }
            .gap-2 { gap: 6px; }
            .gap-3 { gap: 10px; }
            .gap-4 { gap: 12px; }
            .mb-2 { margin-bottom: 6px; }
            .mb-3 { margin-bottom: 10px; }
            .mb-4 { margin-bottom: 12px; }
            .mb-6 { margin-bottom: 16px; }
            .mt-6 { margin-top: 16px; }
            .space-y-1 > * + * { margin-top: 3px; }
            .space-y-2 > * + * { margin-top: 6px; }
            .space-y-3 > * + * { margin-top: 10px; }
            .space-y-4 > * + * { margin-top: 12px; }
            .rounded-xl { border-radius: 10px; }
            .rounded-lg { border-radius: 6px; }
            .p-3 { padding: 10px; }
            .p-5 { padding: 14px; }
            .text-sm { font-size: 13px; }
            .text-xs { font-size: 11px; }
            .text-2xl { font-size: 20px; }
            .text-3xl { font-size: 24px; }
            .font-semibold { font-weight: 600; }
            .font-bold { font-weight: 700; }
            .font-medium { font-weight: 500; }
            svg { display: none; }
            /* Page break controls */
            .page-break-before { page-break-before: always; }
            section:nth-of-type(3) { page-break-before: always; }
            section:nth-of-type(5) { page-break-before: always; }
            @page { 
              margin: 1.2cm; 
              size: A4; 
            }
            @media print {
              body { padding: 0; }
              img { height: 100px; }
            }
          </style>
        </head>
        <body>
          ${printContent}
        </body>
      </html>
    `);
    
    printWindow.document.close();
    
    // Wait for images to load before printing
    setTimeout(() => {
      printWindow.print();
    }, 500);
  };

  return (
    <section className="py-16 bg-background">
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        <Link 
          to="/egg-freezing-clinics-hk" 
          className="text-sm text-muted-foreground hover:underline mb-6 inline-flex items-center gap-2"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Egg Freezing Clinics
        </Link>

        {/* Premium Banner */}
        <div className="bg-gradient-to-r from-primary/10 via-primary/5 to-primary/10 border border-primary/20 rounded-2xl p-6 mb-8">
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

        {/* Guide Content - wrapped in ref for printing */}
        <div ref={printRef} className="bg-card border border-border rounded-2xl p-8 shadow-sm">
          <FertilityPlanningGuide />
        </div>

        {/* Bottom CTA */}
        <div className="mt-8 text-center">
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
  );
};

export default FertilityGuide;
