import { ChevronLeft } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

interface StateInfo {
  name: string;
  notes: string;
  preBirthOrder: boolean;
  compensatedSurrogacy: boolean;
}

const friendlyStates: StateInfo[] = [
  { name: "California", notes: "Most surrogacy friendly state with comprehensive laws protecting all parties.", preBirthOrder: true, compensatedSurrogacy: true },
  { name: "Connecticut", notes: "Strong legal protections with established surrogacy framework.", preBirthOrder: true, compensatedSurrogacy: true },
  { name: "Delaware", notes: "Surrogacy friendly with clear legal pathways.", preBirthOrder: true, compensatedSurrogacy: true },
  { name: "Maine", notes: "Supportive legal environment for surrogacy arrangements.", preBirthOrder: true, compensatedSurrogacy: true },
  { name: "Nevada", notes: "Well-established surrogacy laws with strong protections.", preBirthOrder: true, compensatedSurrogacy: true },
  { name: "New Hampshire", notes: "Clear statutory framework for gestational surrogacy.", preBirthOrder: true, compensatedSurrogacy: true },
  { name: "Oregon", notes: "Progressive surrogacy laws with broad protections.", preBirthOrder: true, compensatedSurrogacy: true },
  { name: "Rhode Island", notes: "Supportive legal framework for intended parents.", preBirthOrder: true, compensatedSurrogacy: true },
  { name: "Washington", notes: "Comprehensive Uniform Parentage Act adoption.", preBirthOrder: true, compensatedSurrogacy: true },
  { name: "Vermont", notes: "Strong protections under state surrogacy laws.", preBirthOrder: true, compensatedSurrogacy: true },
  { name: "Colorado", notes: "Recently enacted comprehensive surrogacy legislation.", preBirthOrder: true, compensatedSurrogacy: true },
  { name: "Illinois", notes: "Gestational Surrogacy Act provides clear guidelines.", preBirthOrder: true, compensatedSurrogacy: true },
  { name: "Maryland", notes: "Court-friendly with established case law.", preBirthOrder: true, compensatedSurrogacy: true },
  { name: "New Jersey", notes: "Updated laws now support gestational surrogacy.", preBirthOrder: true, compensatedSurrogacy: true },
];

const SurrogacyStates = () => {
  return (
    <section className="py-16 bg-secondary">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <Link to="/egg-freezing-surrogacy" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground mb-6">
          <ChevronLeft className="w-4 h-4" />
          Back to Egg Freezing & Surrogacy
        </Link>

        <h1 className="text-3xl font-bold">Surrogacy Friendly States in the USA</h1>
        <p className="mt-3 text-muted-foreground max-w-3xl">
          Surrogacy laws in the U.S. are set by each state, not by the federal government. This means the rules are complex and can be very different from one state to another. Below is a guide to help you understand which states are most supportive of surrogacy arrangements.
        </p>

        <div className="mt-6 p-4 bg-primary/5 rounded-xl border border-primary/10">
          <p className="text-sm text-muted-foreground">
            <strong className="text-foreground">Important Disclaimer:</strong> This information is a general guide and not legal advice. Laws change frequently. For the most current and specific guidance, please consult with a qualified lawyer specialising in reproductive law.
          </p>
        </div>

        {/* Friendly States */}
        <div className="mt-10">
          <h2 className="text-xl font-semibold mb-4">
            Surrogacy Friendly States
          </h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {friendlyStates.map((state) => (
              <div key={state.name} className="p-4 rounded-xl border bg-green-50 border-green-200">
                <h3 className="font-semibold mb-2">{state.name}</h3>
                <p className="text-sm text-muted-foreground">{state.notes}</p>
              </div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className="mt-12 bg-card border border-border rounded-2xl p-8 text-center">
          <h2 className="text-2xl font-semibold mb-3">Need Guidance?</h2>
          <p className="text-muted-foreground mb-6 max-w-xl mx-auto">
            Receive personalised expert guidance on international surrogacy<br />before you take the first step.
          </p>
          <Button 
            size="lg" 
            onClick={() => {
              window.scrollTo(0, 0);
              window.location.href = '/contact';
            }}
          >
            Book a Consultation
          </Button>
        </div>
      </div>
    </section>
  );
};

export default SurrogacyStates;
