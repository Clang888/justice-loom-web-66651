import { Baby, Snowflake, Scale, Flag } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import SurrogacyJourneyTracker from "@/components/SurrogacyJourneyTracker";

const EggFreezingSurrogacy = () => {
  return (
    <section className="py-16 bg-secondary">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-3 mb-2">
          <Baby className="w-8 h-8 text-primary" />
          <Snowflake className="w-8 h-8 text-primary" />
        </div>
        <h1 className="text-3xl font-bold">Egg Freezing & Surrogacy</h1>
        <p className="mt-3 text-muted-foreground max-w-2xl">
          Comprehensive legal guidance for fertility preservation and surrogacy arrangements, 
          helping you navigate the complex legal landscape with confidence.
        </p>

        <div className="mt-10 grid md:grid-cols-2 gap-8">
          {/* Surrogacy Card */}
          <div className="bg-card border border-border rounded-2xl p-6 shadow-sm">
            <div className="flex items-center gap-3 mb-4">
              <Baby className="w-6 h-6 text-primary" />
              <h2 className="font-semibold text-xl">Surrogacy</h2>
            </div>
            <p className="text-muted-foreground mb-4">
              Navigate the legal frameworks for domestic and international surrogacy arrangements.
            </p>
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
            <p className="text-muted-foreground mb-4">
              Understanding your legal rights and options when preserving your fertility for the future.
            </p>
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

        {/* Resources Section */}
        <div className="mt-12">
          <h2 className="text-2xl font-semibold mb-6">Surrogacy Resources</h2>
          <div className="space-y-6">
            <div className="bg-card border border-border rounded-2xl p-6 shadow-sm">
              <div className="flex items-start justify-between gap-4 mb-4">
                <div className="flex items-center gap-3">
                  <Flag className="w-6 h-6 text-primary flex-shrink-0" />
                  <h3 className="font-semibold text-lg">Surrogacy Friendly States in the USA</h3>
                </div>
              </div>

              <Link to="/surrogacy-states" className="inline-flex items-center gap-2 text-sm font-medium hover:underline">
                Browse Surrogacy Friendly States in the USA
              </Link>
            </div>
            
            <SurrogacyJourneyTracker />
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
