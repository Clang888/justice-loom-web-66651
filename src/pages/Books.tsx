import { ChevronRight } from "lucide-react";
import { Link } from "react-router-dom";

const Books = () => {
  return (
    <section className="py-16 bg-secondary">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-3 gap-8 items-start">
          <div className="lg:col-span-2">
            <h2 className="text-3xl font-bold">Books & guides</h2>
            <p className="mt-3 text-muted-foreground">From courtroom timelines to financial disclosure, we publish practical resources you can actually use.</p>
            <div className="mt-6 grid md:grid-cols-2 gap-6">
              <div className="bg-card border border-border rounded-2xl p-5">
                <h3 className="font-semibold">How to Represent Yourself in Family Court (Hong Kong)</h3>
                <p className="text-sm text-muted-foreground mt-2">Published by HKU Press. A step-by-step companion for SRLs in family proceedings.</p>
                <Link to="/contact" className="mt-3 inline-flex items-center gap-2 text-sm font-medium hover:underline">Publication updates <ChevronRight className="w-4 h-4" /></Link>
              </div>
              <div className="bg-card border border-border rounded-2xl p-5">
                <h3 className="font-semibold">Divorce Journal & Workbook (US)</h3>
                <p className="text-sm text-muted-foreground mt-2">A guided workbook for capturing facts, clarifying finances, and planning next steps.</p>
                <Link to="/contact" className="mt-3 inline-flex items-center gap-2 text-sm font-medium hover:underline">Join the early list <ChevronRight className="w-4 h-4" /></Link>
              </div>
            </div>
          </div>
          <aside className="bg-card border border-border rounded-2xl p-6">
            <h4 className="font-semibold mb-2">Media & talks</h4>
            <ul className="text-sm text-muted-foreground space-y-2">
              <li>30+ speaking engagements</li>
              <li>Founder of the 1,000+ member LinkedIn group "Just Law Education"</li>
              <li>Podcast & webinar appearances</li>
            </ul>
            <Link to="/contact" className="mt-3 inline-flex items-center gap-2 text-sm font-medium hover:underline">
              Request Caroline for an event <ChevronRight className="w-4 h-4" />
            </Link>
          </aside>
        </div>
      </div>
    </section>
  );
};

export default Books;
