import { Flag, ChevronLeft, CheckCircle2, AlertTriangle, XCircle } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

interface StateInfo {
  name: string;
  status: "friendly" | "moderate" | "restrictive";
  notes: string;
  preBirthOrder: boolean;
  compensatedSurrogacy: boolean;
}

const surrogacyStates: StateInfo[] = [
  { name: "California", status: "friendly", notes: "Most surrogacy-friendly state with comprehensive laws protecting all parties.", preBirthOrder: true, compensatedSurrogacy: true },
  { name: "Connecticut", status: "friendly", notes: "Strong legal protections with established surrogacy framework.", preBirthOrder: true, compensatedSurrogacy: true },
  { name: "Delaware", status: "friendly", notes: "Surrogacy-friendly with clear legal pathways.", preBirthOrder: true, compensatedSurrogacy: true },
  { name: "Maine", status: "friendly", notes: "Supportive legal environment for surrogacy arrangements.", preBirthOrder: true, compensatedSurrogacy: true },
  { name: "Nevada", status: "friendly", notes: "Well-established surrogacy laws with strong protections.", preBirthOrder: true, compensatedSurrogacy: true },
  { name: "New Hampshire", status: "friendly", notes: "Clear statutory framework for gestational surrogacy.", preBirthOrder: true, compensatedSurrogacy: true },
  { name: "Oregon", status: "friendly", notes: "Progressive surrogacy laws with broad protections.", preBirthOrder: true, compensatedSurrogacy: true },
  { name: "Rhode Island", status: "friendly", notes: "Supportive legal framework for intended parents.", preBirthOrder: true, compensatedSurrogacy: true },
  { name: "Washington", status: "friendly", notes: "Comprehensive Uniform Parentage Act adoption.", preBirthOrder: true, compensatedSurrogacy: true },
  { name: "Vermont", status: "friendly", notes: "Strong protections under state surrogacy laws.", preBirthOrder: true, compensatedSurrogacy: true },
  { name: "Colorado", status: "friendly", notes: "Recently enacted comprehensive surrogacy legislation.", preBirthOrder: true, compensatedSurrogacy: true },
  { name: "Illinois", status: "friendly", notes: "Gestational Surrogacy Act provides clear guidelines.", preBirthOrder: true, compensatedSurrogacy: true },
  { name: "Maryland", status: "friendly", notes: "Court-friendly with established case law.", preBirthOrder: true, compensatedSurrogacy: true },
  { name: "New Jersey", status: "friendly", notes: "Updated laws now support gestational surrogacy.", preBirthOrder: true, compensatedSurrogacy: true },
  { name: "Texas", status: "moderate", notes: "Gestational agreements allowed but with specific requirements.", preBirthOrder: true, compensatedSurrogacy: true },
  { name: "Florida", status: "moderate", notes: "Permits surrogacy but with some restrictions on who can participate.", preBirthOrder: true, compensatedSurrogacy: true },
  { name: "Georgia", status: "moderate", notes: "No specific laws but courts generally supportive.", preBirthOrder: false, compensatedSurrogacy: true },
  { name: "Ohio", status: "moderate", notes: "No statutory framework but court-dependent outcomes.", preBirthOrder: false, compensatedSurrogacy: true },
  { name: "Pennsylvania", status: "moderate", notes: "Case-by-case basis with varying court interpretations.", preBirthOrder: false, compensatedSurrogacy: true },
  { name: "Michigan", status: "restrictive", notes: "Compensated surrogacy contracts are unenforceable.", preBirthOrder: false, compensatedSurrogacy: false },
  { name: "Louisiana", status: "restrictive", notes: "Only altruistic surrogacy for married heterosexual couples.", preBirthOrder: false, compensatedSurrogacy: false },
  { name: "Nebraska", status: "restrictive", notes: "No legal framework; surrogacy contracts may be unenforceable.", preBirthOrder: false, compensatedSurrogacy: false },
];

const getStatusIcon = (status: string) => {
  switch (status) {
    case "friendly":
      return <CheckCircle2 className="w-5 h-5 text-green-600" />;
    case "moderate":
      return <AlertTriangle className="w-5 h-5 text-yellow-600" />;
    case "restrictive":
      return <XCircle className="w-5 h-5 text-red-600" />;
    default:
      return null;
  }
};

const getStatusBg = (status: string) => {
  switch (status) {
    case "friendly":
      return "bg-green-50 border-green-200";
    case "moderate":
      return "bg-yellow-50 border-yellow-200";
    case "restrictive":
      return "bg-red-50 border-red-200";
    default:
      return "";
  }
};

const SurrogacyStates = () => {
  const friendlyStates = surrogacyStates.filter(s => s.status === "friendly");
  const moderateStates = surrogacyStates.filter(s => s.status === "moderate");
  const restrictiveStates = surrogacyStates.filter(s => s.status === "restrictive");

  return (
    <section className="py-16 bg-secondary">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <Link to="/egg-freezing-surrogacy" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground mb-6">
          <ChevronLeft className="w-4 h-4" />
          Back to Egg Freezing & Surrogacy
        </Link>

        <div className="flex items-center gap-3 mb-2">
          <Flag className="w-8 h-8 text-primary" />
        </div>
        <h1 className="text-3xl font-bold">Surrogacy Friendly States in the USA</h1>
        <p className="mt-3 text-muted-foreground max-w-3xl">
          Surrogacy laws in the U.S. are set by each state, not by the federal government. This means the rules are complex and can be very different from one state to another. Below is a guide to help you understand which states are most supportive of surrogacy arrangements.
        </p>

        <div className="mt-6 p-4 bg-primary/5 rounded-xl border border-primary/10">
          <p className="text-sm text-muted-foreground">
            <strong className="text-foreground">Important Disclaimer:</strong> This information is a general guide and not legal advice. Laws change frequently. For the most current and specific guidance, please consult with a qualified lawyer specialising in reproductive law.
          </p>
        </div>

        {/* Legend */}
        <div className="mt-8 flex flex-wrap gap-4">
          <div className="flex items-center gap-2 text-sm">
            <CheckCircle2 className="w-4 h-4 text-green-600" />
            <span>Surrogacy Friendly</span>
          </div>
          <div className="flex items-center gap-2 text-sm">
            <AlertTriangle className="w-4 h-4 text-yellow-600" />
            <span>Moderate (case-by-case)</span>
          </div>
          <div className="flex items-center gap-2 text-sm">
            <XCircle className="w-4 h-4 text-red-600" />
            <span>Restrictive</span>
          </div>
        </div>

        {/* Friendly States */}
        <div className="mt-10">
          <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
            <CheckCircle2 className="w-5 h-5 text-green-600" />
            Surrogacy Friendly States
          </h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {friendlyStates.map((state) => (
              <div key={state.name} className={`p-4 rounded-xl border ${getStatusBg(state.status)}`}>
                <div className="flex items-start justify-between gap-2 mb-2">
                  <h3 className="font-semibold">{state.name}</h3>
                  {getStatusIcon(state.status)}
                </div>
                <p className="text-sm text-muted-foreground mb-3">{state.notes}</p>
                <div className="flex flex-wrap gap-2 text-xs">
                  {state.preBirthOrder && (
                    <span className="px-2 py-1 bg-green-100 text-green-700 rounded-full">Pre-Birth Order</span>
                  )}
                  {state.compensatedSurrogacy && (
                    <span className="px-2 py-1 bg-green-100 text-green-700 rounded-full">Compensated</span>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Moderate States */}
        <div className="mt-10">
          <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
            <AlertTriangle className="w-5 h-5 text-yellow-600" />
            Moderate States
          </h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {moderateStates.map((state) => (
              <div key={state.name} className={`p-4 rounded-xl border ${getStatusBg(state.status)}`}>
                <div className="flex items-start justify-between gap-2 mb-2">
                  <h3 className="font-semibold">{state.name}</h3>
                  {getStatusIcon(state.status)}
                </div>
                <p className="text-sm text-muted-foreground mb-3">{state.notes}</p>
                <div className="flex flex-wrap gap-2 text-xs">
                  {state.preBirthOrder && (
                    <span className="px-2 py-1 bg-yellow-100 text-yellow-700 rounded-full">Pre-Birth Order</span>
                  )}
                  {state.compensatedSurrogacy && (
                    <span className="px-2 py-1 bg-yellow-100 text-yellow-700 rounded-full">Compensated</span>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Restrictive States */}
        <div className="mt-10">
          <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
            <XCircle className="w-5 h-5 text-red-600" />
            Restrictive States
          </h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {restrictiveStates.map((state) => (
              <div key={state.name} className={`p-4 rounded-xl border ${getStatusBg(state.status)}`}>
                <div className="flex items-start justify-between gap-2 mb-2">
                  <h3 className="font-semibold">{state.name}</h3>
                  {getStatusIcon(state.status)}
                </div>
                <p className="text-sm text-muted-foreground mb-3">{state.notes}</p>
                <div className="flex flex-wrap gap-2 text-xs">
                  {!state.preBirthOrder && (
                    <span className="px-2 py-1 bg-red-100 text-red-700 rounded-full">No Pre-Birth Order</span>
                  )}
                  {!state.compensatedSurrogacy && (
                    <span className="px-2 py-1 bg-red-100 text-red-700 rounded-full">No Compensated</span>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className="mt-12 bg-card border border-border rounded-2xl p-8 text-center">
          <h2 className="text-2xl font-semibold mb-3">Need Legal Guidance?</h2>
          <p className="text-muted-foreground mb-6 max-w-xl mx-auto">
            Navigating surrogacy laws across different states can be complex. Get expert legal advice tailored to your specific situation.
          </p>
          <Link to="/contact">
            <Button size="lg">Book a Consultation</Button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default SurrogacyStates;
