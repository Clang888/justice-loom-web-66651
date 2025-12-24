import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import SurrogacyJourneyTracker from "@/components/SurrogacyJourneyTracker";

const SurrogacyTracker = () => {
  return (
    <section className="py-16 bg-background">
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        <Link 
          to="/egg-freezing-surrogacy" 
          className="text-sm text-muted-foreground hover:underline mb-6 inline-flex items-center gap-2"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Egg Freezing & Surrogacy
        </Link>

        <div className="mt-6">
          <SurrogacyJourneyTracker />
        </div>
      </div>
    </section>
  );
};

export default SurrogacyTracker;
