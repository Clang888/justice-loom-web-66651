import { useState } from "react";
import { Mail, Phone, MessageSquare } from "lucide-react";

const Contact = () => {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [sent, setSent] = useState(false);

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSent(true);
  };

  return (
    <section className="py-16 bg-secondary">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-bold">Get in touch</h2>
        <p className="mt-3 text-muted-foreground max-w-2xl">
          Reach out for consultations, speaking requests, product demos, or general questions.
        </p>

        <div className="mt-8 grid lg:grid-cols-2 gap-8">
          <div className="bg-card border border-border rounded-2xl p-6">
            <h3 className="font-semibold text-lg mb-4">Send us a message</h3>
            {!sent ? (
              <form onSubmit={onSubmit} className="space-y-4">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium mb-1">Name</label>
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
                  <label htmlFor="email" className="block text-sm font-medium mb-1">Email</label>
                  <input
                    id="email"
                    type="email"
                    required
                    value={form.email}
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                    className="w-full rounded-xl border border-border bg-background px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                  />
                </div>
                <div>
                  <label htmlFor="message" className="block text-sm font-medium mb-1">Message</label>
                  <textarea
                    id="message"
                    rows={5}
                    required
                    value={form.message}
                    onChange={(e) => setForm({ ...form, message: e.target.value })}
                    className="w-full rounded-xl border border-border bg-background px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                  />
                </div>
                <button
                  type="submit"
                  className="rounded-xl px-6 py-2.5 bg-primary text-primary-foreground font-medium hover:bg-primary/90"
                >
                  Send Message
                </button>
              </form>
            ) : (
              <div className="rounded-xl bg-secondary p-6 text-center">
                <p className="text-sm font-medium">Thank you! We&apos;ll be in touch soon.</p>
              </div>
            )}
          </div>

          <div className="space-y-6">
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
              <p className="text-sm text-muted-foreground">+852 1234 5678</p>
            </div>
            <div className="bg-card border border-border rounded-2xl p-6">
              <div className="flex items-center gap-3 mb-2">
                <MessageSquare className="w-5 h-5" />
                <h3 className="font-semibold">Social</h3>
              </div>
              <p className="text-sm text-muted-foreground">Find us on LinkedIn & Facebook</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
