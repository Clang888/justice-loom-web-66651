import { Lock } from "lucide-react";
import planningCalendarImage from "@/assets/fertility-planning-calendar.jpg";

const FertilityGuideTeaser = () => {
  return (
    <div className="space-y-8 text-foreground">
      {/* Header */}
      <div className="text-center border-b border-border pb-8">
        <h1 className="text-3xl font-bold mb-2">Optimal Retrieval Planning Guide</h1>
        <p className="text-muted-foreground">Your Complete Roadmap for Egg Freezing Success</p>
      </div>

      {/* Preview Section - Timeline (Visible) */}
      <section>
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-semibold">Step-by-Step Timeline (時間表)</h2>
          <span className="text-xs text-muted-foreground">Preview</span>
        </div>

        <img 
          src={planningCalendarImage} 
          alt="Planning calendar for fertility journey" 
          className="w-full rounded-xl object-cover h-32 md:h-40 mb-4"
        />
        
        <div className="space-y-4">
          <div className="bg-secondary/50 rounded-xl p-5 border-l-4 border-blue-500">
            <h3 className="font-semibold mb-2">
              Month 1-2: Research & Initial Consultation
            </h3>
            <ul className="text-sm text-muted-foreground space-y-1">
              <li>• Research clinics and compare services</li>
              <li>• Schedule initial consultation with 2-3 clinics</li>
              <li>• Complete baseline fertility tests (AMH, AFC, FSH)</li>
              <li>• Review test results with fertility specialist</li>
            </ul>
          </div>
          
          <div className="bg-secondary/50 rounded-xl p-5 border-l-4 border-green-500">
            <h3 className="font-semibold mb-2">
              Month 3: Preparation Phase
            </h3>
            <ul className="text-sm text-muted-foreground space-y-1">
              <li>• Begin lifestyle optimization (diet, exercise, supplements)</li>
              <li>• Complete required pre-procedure tests</li>
              <li>• Finalize clinic selection and payment plan</li>
              <li>• Learn injection techniques (if applicable)</li>
            </ul>
          </div>
        </div>
      </section>

      {/* Blurred/Locked Content Preview */}
      <div className="relative">
        {/* Blurred background content */}
        <div className="blur-sm pointer-events-none select-none opacity-60">
          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">Public and Private Clinic Comparisons</h2>
            <div className="bg-secondary/50 rounded-xl p-5 h-32"></div>
          </section>
          
          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">Traditional Chinese Foods for Optimum Egg Health</h2>
            <div className="bg-secondary/50 rounded-xl p-5 h-32"></div>
          </section>
          
          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">Legal and Financial Considerations</h2>
            <div className="bg-secondary/50 rounded-xl p-5 h-32"></div>
          </section>
          
          <section>
            <h2 className="text-2xl font-semibold mb-4">Frequently Asked Questions</h2>
            <div className="bg-secondary/50 rounded-xl p-5 h-32"></div>
          </section>
        </div>

        {/* Lock overlay */}
        <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-b from-transparent via-background/80 to-background">
          <div className="text-center p-8 bg-card border border-border rounded-2xl shadow-lg max-w-md mx-4">
            <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
              <Lock className="w-8 h-8 text-primary" />
            </div>
            <h3 className="text-xl font-bold mb-2">Full Guide Includes:</h3>
            <ul className="text-sm text-muted-foreground text-left space-y-2 mb-4">
              <li>✓ Complete 4-month timeline with detailed action items</li>
              <li>✓ Public vs Private clinic comparison table</li>
              <li>✓ How to check clinic success rates (CHRT data)</li>
              <li>✓ Traditional Chinese foods for egg health</li>
              <li>✓ Legal & financial considerations in Hong Kong</li>
              <li>✓ Supplements & lifestyle optimization guide</li>
              <li>✓ Post-retrieval recovery tips</li>
              <li>✓ Frequently asked questions</li>
            </ul>
            <p className="text-xs text-muted-foreground">
              Purchase to download the complete PDF guide
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FertilityGuideTeaser;
