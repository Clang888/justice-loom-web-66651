import { useState } from "react";
import { Mail, Phone } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

const Contact = () => {
  const [newsletter, setNewsletter] = useState({ name: "", email: "" });
  const [newsletterSent, setNewsletterSent] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const onNewsletterSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    const { error } = await supabase
      .from('newsletter_subscribers')
      .insert({ name: newsletter.name, email: newsletter.email });
    
    setIsSubmitting(false);
    
    if (error) {
      if (error.code === '23505') {
        toast.error("This email is already subscribed!");
      } else {
        toast.error("Failed to subscribe. Please try again.");
      }
      return;
    }
    
    setNewsletterSent(true);
    toast.success("Successfully subscribed!");
  };

  return (
    <section className="py-16 bg-secondary">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-bold">Get in touch</h2>
        <p className="mt-3 text-muted-foreground max-w-2xl">
          Contact us for consultations, speaking engagement requests or general questions.
        </p>

        <div className="mt-8 grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* Newsletter Signup */}
          <div className="bg-card border border-border rounded-2xl p-6 md:col-span-2">
            {!newsletterSent ? (
              <form onSubmit={onNewsletterSubmit} className="space-y-3">
                <div>
                  <label htmlFor="newsletter-name" className="block text-sm font-medium mb-1">Name</label>
                  <input
                    id="newsletter-name"
                    type="text"
                    required
                    value={newsletter.name}
                    onChange={(e) => setNewsletter({ ...newsletter, name: e.target.value })}
                    className="w-full rounded-xl border border-border bg-background px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                  />
                </div>
                <div>
                  <label htmlFor="newsletter-email" className="block text-sm font-medium mb-1">Email</label>
                  <input
                    id="newsletter-email"
                    type="email"
                    required
                    value={newsletter.email}
                    onChange={(e) => setNewsletter({ ...newsletter, email: e.target.value })}
                    className="w-full rounded-xl border border-border bg-background px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                  />
                </div>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full rounded-xl px-6 py-2.5 bg-primary text-primary-foreground font-medium hover:bg-primary/90 disabled:opacity-50"
                >
                  {isSubmitting ? "Entering..." : "Enter"}
                </button>
              </form>
            ) : (
              <div className="rounded-xl bg-secondary p-4 text-center">
                <p className="text-sm font-medium">You&apos;re subscribed! Thanks for joining.</p>
              </div>
            )}
          </div>

          <div className="bg-card border border-border rounded-2xl p-6">
            <div className="flex items-center gap-3 mb-2">
              <Mail className="w-5 h-5" />
              <h3 className="font-semibold">Email</h3>
            </div>
            <p className="text-sm text-muted-foreground">justlaweducation@gmail.com</p>
          </div>
          <div className="bg-card border border-border rounded-2xl p-6">
            <div className="flex items-center gap-3 mb-2">
              <Phone className="w-5 h-5" />
              <h3 className="font-semibold">Phone</h3>
            </div>
            <p className="text-sm text-muted-foreground">+853 92959750</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
