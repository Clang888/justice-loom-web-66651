import { Briefcase, ChevronRight } from "lucide-react";
import { Link } from "react-router-dom";

const AITools = () => {
  return (
    <section className="py-16 bg-card">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-bold mb-8">AI Tools</h2>
        
        <div className="max-w-3xl mx-auto">
          <div className="bg-secondary border border-border rounded-2xl p-8">
            <div className="flex items-center gap-3 mb-4">
              <Briefcase className="w-8 h-8" />
              <h3 className="font-semibold text-2xl">Briefcase: Your Law Companion</h3>
            </div>
            
            <p className="text-muted-foreground text-lg mb-6">
              Get guidance for divorce, small claims and wills, with outcome prediction & financial analysis. 
              Bilingual starting in HK, localised workflows, PDFs ready for Court filing. 
              Expand to all common law jurisdictions.
            </p>
            
            <div className="space-y-4 mb-6">
              <h4 className="font-semibold text-lg">Key Features:</h4>
              <ul className="space-y-2 text-sm text-muted-foreground list-disc pl-5">
                <li>AI powered voice recognition captures a user's story & automatically fills out required court forms</li>
                <li>Outcome prediction & financial analysis</li>
                <li>Bilingual interface (starting in Hong Kong)</li>
                <li>Localised workflows for common law jurisdictions</li>
                <li>Court-ready PDFs for filing</li>
                <li>Transparent subscription model - no mid-journey charges or paywall traps</li>
              </ul>
            </div>
            
            <Link 
              to="/contact" 
              className="inline-flex items-center gap-2 rounded-xl px-6 py-3 bg-primary text-primary-foreground font-medium hover:bg-primary/90"
            >
              Get Started <ChevronRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AITools;
