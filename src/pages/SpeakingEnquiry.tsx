import { useState } from "react";
import { Link } from "react-router-dom";
import { ChevronLeft, Mic } from "lucide-react";

const SpeakingEnquiry = () => {
  const [form, setForm] = useState({
    name: "",
    email: "",
    organization: "",
    eventType: "",
    eventDate: "",
    location: "",
    audience: "",
    topics: "",
    additionalInfo: "",
  });
  const [sent, setSent] = useState(false);

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSent(true);
  };

  return (
    <section className="py-16 bg-secondary min-h-screen">
      <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
        <Link to="/books" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground mb-6">
          <ChevronLeft className="w-4 h-4" />
          Back to Books & Speaking
        </Link>

        <div className="flex items-center gap-3 mb-2">
          <Mic className="w-8 h-8 text-primary" />
          <h1 className="text-3xl font-bold">Hire Caroline for a Speaking Engagement</h1>
        </div>
        <p className="mt-3 text-muted-foreground max-w-2xl">
          Caroline has delivered 30+ international talks on family law, access to justice, and legal technology. 
          Fill out the form below to discuss your event.
        </p>

        <div className="mt-8 bg-card border border-border rounded-2xl p-6">
          {!sent ? (
            <form onSubmit={onSubmit} className="space-y-5">
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium mb-1">Your Name *</label>
                  <input
                    id="name"
                    type="text"
                    required
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    className="w-full rounded-xl border border-border bg-background px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm font-medium mb-1">Email *</label>
                  <input
                    id="email"
                    type="email"
                    required
                    value={form.email}
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                    className="w-full rounded-xl border border-border bg-background px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="organization" className="block text-sm font-medium mb-1">Organization / Company *</label>
                <input
                  id="organization"
                  type="text"
                  required
                  value={form.organization}
                  onChange={(e) => setForm({ ...form, organization: e.target.value })}
                  className="w-full rounded-xl border border-border bg-background px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                />
              </div>

              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="eventType" className="block text-sm font-medium mb-1">Event Type *</label>
                  <select
                    id="eventType"
                    required
                    value={form.eventType}
                    onChange={(e) => setForm({ ...form, eventType: e.target.value })}
                    className="w-full rounded-xl border border-border bg-background px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                  >
                    <option value="">Select type...</option>
                    <option value="conference">Conference / Summit</option>
                    <option value="seminar">Seminar / Workshop</option>
                    <option value="webinar">Webinar</option>
                    <option value="podcast">Podcast</option>
                    <option value="panel">Panel Discussion</option>
                    <option value="corporate">Corporate Event</option>
                    <option value="academic">Academic Lecture</option>
                    <option value="other">Other</option>
                  </select>
                </div>
                <div>
                  <label htmlFor="eventDate" className="block text-sm font-medium mb-1">Proposed Date</label>
                  <input
                    id="eventDate"
                    type="text"
                    placeholder="e.g., March 2026 or TBD"
                    value={form.eventDate}
                    onChange={(e) => setForm({ ...form, eventDate: e.target.value })}
                    className="w-full rounded-xl border border-border bg-background px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                  />
                </div>
              </div>

              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="location" className="block text-sm font-medium mb-1">Location</label>
                  <input
                    id="location"
                    type="text"
                    placeholder="City, Country or Virtual"
                    value={form.location}
                    onChange={(e) => setForm({ ...form, location: e.target.value })}
                    className="w-full rounded-xl border border-border bg-background px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                  />
                </div>
                <div>
                  <label htmlFor="audience" className="block text-sm font-medium mb-1">Expected Audience Size</label>
                  <input
                    id="audience"
                    type="text"
                    placeholder="e.g., 50-100 attendees"
                    value={form.audience}
                    onChange={(e) => setForm({ ...form, audience: e.target.value })}
                    className="w-full rounded-xl border border-border bg-background px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="topics" className="block text-sm font-medium mb-1">Topics of Interest *</label>
                <textarea
                  id="topics"
                  rows={3}
                  required
                  placeholder="What topics would you like Caroline to speak about?"
                  value={form.topics}
                  onChange={(e) => setForm({ ...form, topics: e.target.value })}
                  className="w-full rounded-xl border border-border bg-background px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                />
              </div>

              <div>
                <label htmlFor="additionalInfo" className="block text-sm font-medium mb-1">Additional Information</label>
                <textarea
                  id="additionalInfo"
                  rows={3}
                  placeholder="Any other details about your event..."
                  value={form.additionalInfo}
                  onChange={(e) => setForm({ ...form, additionalInfo: e.target.value })}
                  className="w-full rounded-xl border border-border bg-background px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                />
              </div>

              <button
                type="submit"
                className="rounded-xl px-6 py-2.5 bg-primary text-primary-foreground font-medium hover:bg-primary/90"
              >
                Submit Enquiry
              </button>
            </form>
          ) : (
            <div className="rounded-xl bg-secondary p-8 text-center">
              <Mic className="w-12 h-12 mx-auto mb-4 text-primary" />
              <h3 className="text-lg font-semibold mb-2">Thank you for your enquiry!</h3>
              <p className="text-sm text-muted-foreground">
                We&apos;ve received your speaking engagement request and will be in touch soon to discuss the details.
              </p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default SpeakingEnquiry;
