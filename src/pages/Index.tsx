import { Link } from "react-router-dom";
import { ShieldCheck, Globe } from "lucide-react";

const Index = () => {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-card to-secondary">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-20 grid lg:grid-cols-2 gap-10 items-center">
        <div>
          <p className="inline-block rounded-full bg-primary text-primary-foreground text-xs font-medium px-3 py-1 mb-4">Access to Justice</p>
          <h1 className="text-4xl sm:text-5xl font-extrabold leading-tight">
            Easy-to-use legal guidance for <span className="underline decoration-amber-400 decoration-4 underline-offset-4">self-represented people</span>
          </h1>
          <p className="mt-5 text-lg text-muted-foreground max-w-xl">
            Founded by Caroline Langley, barrister with 30+ years of multi-jurisdictional experience. Our mission: make justice easy to find, easy to understand, and easy to use.
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            <Link to="/services" className="rounded-xl px-5 py-3 bg-primary text-primary-foreground font-medium hover:bg-primary/90">Explore Services</Link>
            <Link to="/ai-tools" className="rounded-xl px-5 py-3 border border-border font-medium hover:bg-card">Try AI Tools</Link>
          </div>
          <div className="mt-6 flex items-center gap-6 text-sm text-muted-foreground">
            <div className="flex items-center gap-2"><ShieldCheck className="w-4 h-4" /> Practical, plain-English tools</div>
            <div className="flex items-center gap-2"><Globe className="w-4 h-4" /> Common-law focus (HK, UK, IE, AU, CA, US)</div>
          </div>
        </div>
        <div className="lg:justify-self-end">
          <img
            src="/jle-hero-1600.jpg"
            alt="Just Law Education - AI Powered"
            className="w-full h-auto rounded-2xl border border-border shadow-sm object-cover"
          />
        </div>
      </div>
    </section>
  );
};

export default Index;
