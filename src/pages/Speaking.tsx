import { ChevronRight } from "lucide-react";
import { Link } from "react-router-dom";

const Speaking = () => {
  return (
    <section className="py-16 bg-secondary">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-bold">Speaking & Events</h2>
        <p className="mt-3 text-muted-foreground max-w-3xl">
          Caroline Langley has delivered 30+ international talks, webinars, and media appearances on access to justice, self-representation, and legal technology.
          Invite her to speak at your conference, panel, or podcast.
        </p>

        <div className="mt-6 grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="bg-card border border-border rounded-2xl p-6 shadow-sm">
            <h3 className="font-semibold">Family Law Reform</h3>
            <p className="text-sm text-muted-foreground mt-2">Keynote on modernizing divorce and child proceedings in common-law courts.</p>
          </div>
          <div className="bg-card border border-border rounded-2xl p-6 shadow-sm">
            <h3 className="font-semibold">AI for Access to Justice</h3>
            <p className="text-sm text-muted-foreground mt-2">Session on ethical AI tools for self-represented litigants.</p>
          </div>
          <div className="bg-card border border-border rounded-2xl p-6 shadow-sm">
            <h3 className="font-semibold">Cross-Border Practice</h3>
            <p className="text-sm text-muted-foreground mt-2">Panel on multi-jurisdictional family and civil cases.</p>
          </div>
        </div>

        <Link to="/contact" className="mt-6 inline-flex items-center gap-2 text-sm font-medium hover:underline">
          Request Caroline for an event <ChevronRight className="w-4 h-4" />
        </Link>
      </div>
    </section>
  );
};

export default Speaking;
