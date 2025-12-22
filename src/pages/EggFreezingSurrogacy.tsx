import { useState } from "react";
import { Baby, Snowflake, Scale, ChevronDown, ChevronUp } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import SurrogacyJourneyTracker from "@/components/SurrogacyJourneyTracker";

const EggFreezingSurrogacy = () => {
  const [showTracker, setShowTracker] = useState(false);

  return (
    <section className="py-16 bg-secondary">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold">Egg Freezing & Surrogacy</h1>

        <div className="mt-10 grid md:grid-cols-2 gap-8">
          {/* Surrogacy Card */}
          <div className="bg-card border border-border rounded-2xl p-6 shadow-sm">
            <div className="flex items-center gap-3 mb-4">
              <Baby className="w-6 h-6 text-primary" />
              <h2 className="font-semibold text-xl">Surrogacy</h2>
            </div>
            <ul className="space-y-2 text-sm text-muted-foreground mb-6">
              <li className="flex items-start gap-2">
                <Scale className="w-4 h-4 mt-0.5 flex-shrink-0" />
                <span>UK surrogacy law and parental orders</span>
              </li>
              <li className="flex items-start gap-2">
                <Scale className="w-4 h-4 mt-0.5 flex-shrink-0" />
                <span>International surrogacy considerations</span>
              </li>
              <li className="flex items-start gap-2">
                <Scale className="w-4 h-4 mt-0.5 flex-shrink-0" />
                <span>Surrogate and intended parent agreements</span>
              </li>
              <li className="flex items-start gap-2">
                <Scale className="w-4 h-4 mt-0.5 flex-shrink-0" />
                <span>Birth registration and citizenship</span>
              </li>
            </ul>
          </div>

          {/* Egg Freezing Card */}
          <div className="bg-card border border-border rounded-2xl p-6 shadow-sm">
            <div className="flex items-center gap-3 mb-4">
              <Snowflake className="w-6 h-6 text-primary" />
              <h2 className="font-semibold text-xl">Egg Freezing</h2>
            </div>
            <ul className="space-y-2 text-sm text-muted-foreground mb-6">
              <li className="flex items-start gap-2">
                <Scale className="w-4 h-4 mt-0.5 flex-shrink-0" />
                <span>Consent and storage agreements</span>
              </li>
              <li className="flex items-start gap-2">
                <Scale className="w-4 h-4 mt-0.5 flex-shrink-0" />
                <span>Storage duration and renewal rights</span>
              </li>
              <li className="flex items-start gap-2">
                <Scale className="w-4 h-4 mt-0.5 flex-shrink-0" />
                <span>Partner consent considerations</span>
              </li>
              <li className="flex items-start gap-2">
                <Scale className="w-4 h-4 mt-0.5 flex-shrink-0" />
                <span>Cross-border storage regulations</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Resources Section - Two Column Layout */}
        <div className="mt-12 grid md:grid-cols-2 gap-8 items-start">
          {/* Surrogacy Resources */}
          <div className="text-center">
            <h2 className="text-2xl font-semibold mb-6">Surrogacy Resources</h2>
            <div className="space-y-6">
              <Link to="/surrogacy-states" className="block bg-card border border-border rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow">
                <span className="inline-block bg-green-600 text-white text-xs font-semibold px-2 py-1 rounded mb-2">FREE</span>
                <h3 className="font-semibold text-lg mb-2">USA Surrogacy Friendly States</h3>
                <p className="text-sm text-muted-foreground">
                  Browse the list of US states with supportive surrogacy laws.
                </p>
              </Link>

              <div className="bg-card border border-border rounded-2xl p-6 shadow-sm text-left">
                <span className="inline-block bg-green-600 text-white text-xs font-semibold px-2 py-1 rounded mb-2">FREE</span>
                <h3 className="text-lg font-semibold mb-2">Surrogacy Journey Tracker</h3>
                <p className="text-sm text-muted-foreground">
                  Understanding your options and making informed decisions about your surrogacy journey...{" "}
                  <button 
                    onClick={() => setShowTracker(!showTracker)} 
                    className="text-primary hover:underline font-medium inline-flex items-center gap-1"
                  >
                    {showTracker ? "show less" : "read more"}
                    {showTracker ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                  </button>
                </p>
                {showTracker && (
                  <div className="mt-6">
                    <SurrogacyJourneyTracker />
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Egg Freezing Resources */}
          <div className="text-center">
            <h2 className="text-2xl font-semibold mb-6">Egg Freezing Resources</h2>
            <div className="space-y-6">
              <Link to="/egg-freezing-clinics-hk" className="block bg-card border border-border rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow">
                <span className="inline-block bg-green-600 text-white text-xs font-semibold px-2 py-1 rounded mb-2">FREE</span>
                <h3 className="font-semibold text-lg mb-2">Egg Freezing Clinics in Hong Kong</h3>
                <p className="text-sm text-muted-foreground">
                  Find reputable fertility clinics offering egg freezing services in Hong Kong.
                </p>
              </Link>

              <div className="bg-card border border-border rounded-2xl p-6 shadow-sm">
                <Link to="/fertility-guide" className="block hover:opacity-80 transition-opacity">
                  <h3 className="font-semibold text-lg mb-2">Egg Retrieval Preparation Guide</h3>
                  <p className="text-sm text-muted-foreground">
                    Comprehensive guide covering timelines, clinic comparisons, and preparation tips.
                  </p>
                </Link>
                <Button 
                  size="lg"
                  className="w-full mt-4 bg-blue-600 hover:bg-blue-700 text-white uppercase font-semibold"
                >
                  PURCHASE GUIDE HK$100
                </Button>
              </div>
            </div>
          </div>
        </div>
        <div className="mt-12 bg-card border border-border rounded-2xl p-8 text-center">
          <h2 className="text-2xl font-semibold mb-3">Need Guidance?</h2>
          <p className="text-muted-foreground mb-6 max-w-xl mx-auto">
            Receive personalised expert guidance on international surrogacy<br />before you take the first step.
          </p>
          <Link to="/contact">
            <Button size="lg">Book a Consultation</Button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default EggFreezingSurrogacy;
