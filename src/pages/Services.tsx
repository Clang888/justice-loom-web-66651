import { Hammer, ShieldCheck, BookOpen, ChevronRight } from "lucide-react";
import { Link } from "react-router-dom";
import SurrogacyJourneyTracker from "@/components/SurrogacyJourneyTracker";
import FormECalculator from "@/components/FormECalculator";

const Services = () => {
  return (
    <section className="py-16 bg-secondary">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-bold">Services</h2>
        <p className="mt-3 text-muted-foreground max-w-2xl">
          Guides, worksheets and templates to help you navigate your way through your legal issues.
        </p>

        <div className="mt-8 grid md:grid-cols-3 gap-6">
          {[
            { icon: <Hammer className="w-6 h-6" />, title: "Divorce", text: "Timetables (FDA/FDR), Form E guidance, disclosure checklists, settlement prep." },
            { icon: <ShieldCheck className="w-6 h-6" />, title: "Wills & Estates", text: "Starter packs, asset schedules, executorship basics, witness requirements." },
            { icon: <BookOpen className="w-6 h-6" />, title: "Surrogacy", text: "Legal frameworks, parental orders, international considerations, documentation." },
          ].map((card, i) => (
            <div key={i} className="bg-card border border-border rounded-2xl p-6 shadow-sm">
              <div className="flex items-center gap-3">{card.icon}<h3 className="font-semibold text-lg">{card.title}</h3></div>
              <p className="mt-3 text-sm text-muted-foreground">{card.text}</p>
              <Link to="/contact" className="mt-4 inline-flex items-center gap-2 text-sm font-medium hover:underline">
                Enquire <ChevronRight className="w-4 h-4" />
              </Link>
            </div>
          ))}
        </div>

        {/* Tools Grid */}
        <div className="mt-12 grid lg:grid-cols-2 gap-6">
          <FormECalculator />
          <SurrogacyJourneyTracker />
        </div>
      </div>
    </section>
  );
};

export default Services;
