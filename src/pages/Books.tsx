import { ChevronRight } from "lucide-react";
import { Link } from "react-router-dom";

const Books = () => {
  return (
    <section className="py-16 bg-secondary">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-bold mb-3">Books & Guides</h2>
        <p className="text-muted-foreground mb-6">From courtroom timelines to financial disclosure, we publish practical resources you can actually use.</p>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="bg-card border border-border rounded-2xl p-5 flex gap-4">
            <img 
              src="/book-cover-hk.png" 
              alt="Hong Kong Family Court: A Guide to Self Representation book cover" 
              className="w-24 h-auto rounded-lg shadow-md flex-shrink-0"
            />
            <div>
              <h3 className="font-semibold">Hong Kong Family Court: A Guide to Self Representation</h3>
              <p className="text-sm text-muted-foreground mt-2">Published by HKU Press (2026). A step by step guide for anyone wanting to represent themselves in Family Court in Hong Kong.</p>
              <Link to="/contact" className="mt-3 inline-flex items-center gap-2 text-sm font-medium hover:underline">Publication updates <ChevronRight className="w-4 h-4" /></Link>
            </div>
          </div>
          <div className="bg-card border border-border rounded-2xl p-5">
            <h3 className="font-semibold">My Divorce Journal Workbook</h3>
            <p className="text-sm text-muted-foreground mt-2">Scheduled for publication in spring 2026. A workbook to guide the user through all aspects of divorce.</p>
            <Link to="/contact" className="mt-3 inline-flex items-center gap-2 text-sm font-medium hover:underline">Join the early list <ChevronRight className="w-4 h-4" /></Link>
          </div>
          <div className="bg-card border border-border rounded-2xl p-5">
            <h4 className="font-semibold mb-2">Media & Talks</h4>
            <ul className="text-sm text-muted-foreground space-y-2 mb-3">
              <li>30+ speaking engagements</li>
              <li>Founder of the 1,000+ member LinkedIn group "Just Law Education"</li>
              <li>Podcast & webinar appearances</li>
            </ul>
            <Link to="/contact" className="inline-flex items-center gap-2 text-sm font-medium hover:underline">
              Request Caroline for an event <ChevronRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Books;
