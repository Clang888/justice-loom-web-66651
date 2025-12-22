import { Baby, Snowflake, Scale, Flag, Building2 } from "lucide-react";
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

        {/* Resources Section - Two Column Layout */}
        <div className="mt-12 grid md:grid-cols-2 gap-8">
          {/* Surrogacy Resources */}
          <div>
            <h2 className="text-2xl font-semibold mb-6">Surrogacy Resources</h2>
            <div className="space-y-6">
              <div className="bg-card border border-border rounded-2xl p-6 shadow-sm">
                <div className="flex items-start justify-between gap-4 mb-4">
                  <div className="flex items-center gap-3">
                    <Flag className="w-6 h-6 text-primary flex-shrink-0" />
                    <h3 className="font-semibold text-lg">Surrogacy Friendly States in the USA</h3>
                  </div>
                </div>

                <Link to="/surrogacy-states" className="inline-flex items-center gap-2 text-sm font-medium hover:underline mb-4">
                  Browse Surrogacy Friendly States in the USA
                </Link>
                
                <div className="text-sm text-muted-foreground space-y-4 mb-6">
                  <p className="font-medium text-foreground">
                    PLEASE NOTE that this information is a general guide and not legal advice. Laws change frequently. For the most current and specific guidance, please consult with a qualified lawyer specialising in reproductive law.
                  </p>
                  
                  <p>
                    Surrogacy laws in the U.S. are set by each state, not by the federal government. This means the rules are complex and can be very different from one state to another. Some states strongly support surrogacy, while others are restrictive or even ban it. Below please find a list of surrogacy friendly states and surrogacy agencies in those states.
                  </p>

                  <div>
                    <h4 className="font-semibold text-foreground mb-2">CRITICAL DISCLAIMERS & ADVICE</h4>
                    <ul className="space-y-3">
                      <li>
                        <strong>Type of Surrogacy Matters:</strong> The above primarily refers to gestational surrogacy. Traditional surrogacy (where the surrogate is the egg donor) is legally riskier and prohibited or heavily restricted in many more states due to complex parental rights issues.
                      </li>
                      <li>
                        <strong>Pre-Birth Orders:</strong> A key goal in surrogacy friendly states is obtaining a pre-birth order, which establishes the intended parents as the legal parents before birth, avoiding the need for adoption.
                      </li>
                      <li>
                        <strong>Residency:</strong> Some states require the intended parents, the surrogate, or both to be residents. Always check local statutes.
                      </li>
                      <li>
                        <strong>Marital Status/Sexual Orientation:</strong> Laws in some states (e.g., Louisiana, Florida historically) favour or only protect married heterosexual couples. This is changing but must be verified. You must consult with reproductive law attorney. They can navigate the specific county court procedures, draft the contract, and secure the parentage order. The <a href="https://www.asrm.org/" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">American Society for Reproductive Medicine (ASRM)</a> or <a href="https://adoptionart.org/" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">Academy of Adoption & Assisted Reproduction Attorneys (AAAA)</a> are good starting points for referrals.
                      </li>
                      <li>
                        <strong>Agency Selection:</strong> If using an agency, ensure they have proven expertise and established legal partnerships in the states where they match surrogates and intended parents.
                      </li>
                    </ul>
                  </div>

                  <p className="italic">
                    This information is a general guide and not legal advice. Laws change frequently. For the most current and specific guidance, please consult with a qualified lawyer specialising in reproductive law.
                  </p>
                </div>
              </div>
              
              <SurrogacyJourneyTracker />
            </div>
          </div>

          {/* Egg Freezing Resources */}
          <div>
            <h2 className="text-2xl font-semibold mb-6">Egg Freezing Resources</h2>
            <Link to="/egg-freezing-clinics-hk" className="block bg-card border border-border rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow">
              <div className="flex items-center gap-3 mb-4">
                <Building2 className="w-6 h-6 text-primary flex-shrink-0" />
                <h3 className="font-semibold text-lg">Egg Freezing Clinics in Hong Kong</h3>
              </div>
              <p className="text-sm text-muted-foreground">
                Find reputable fertility clinics offering egg freezing services in Hong Kong.
              </p>
            </Link>
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
