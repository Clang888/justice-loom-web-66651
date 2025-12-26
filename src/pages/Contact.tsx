import { useState } from "react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";

const Contact = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!name.trim() || !email.trim()) {
      toast.error("Please fill in all fields");
      return;
    }

    setIsSubmitting(true);
    
    try {
      const { error } = await supabase
        .from("contact_enquiries" as any)
        .insert({ name: name.trim(), email: email.trim() });

      if (error) {
        if (error.code === "23505") {
          toast.error("This email is already registered");
        } else {
          throw error;
        }
      } else {
        toast.success("Thank you! We'll be in touch soon.");
        setName("");
        setEmail("");
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      toast.error("Something went wrong. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="py-16 bg-secondary">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-bold">Get in touch</h2>
        <p className="mt-3 text-muted-foreground max-w-2xl">
          Contact us for consultations, speaking engagement requests or general questions.
        </p>

        <form onSubmit={handleSubmit} className="mt-8 max-w-md space-y-4">
          <div>
            <label htmlFor="name" className="block text-sm font-medium mb-2">
              Name
            </label>
            <input
              type="text"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-4 py-3 rounded-xl border border-border bg-card text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
              placeholder="Your name"
            />
          </div>
          <div>
            <label htmlFor="email" className="block text-sm font-medium mb-2">
              Email
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-3 rounded-xl border border-border bg-card text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
              placeholder="your@email.com"
            />
          </div>
          <Button type="submit" disabled={isSubmitting} className="w-full">
            {isSubmitting ? "Submitting..." : "Submit"}
          </Button>
        </form>

        <div className="mt-12 grid md:grid-cols-2 gap-6 max-w-lg">
          <div className="bg-card border border-border rounded-2xl p-6">
            <h3 className="font-semibold mb-2">Email</h3>
            <p className="text-sm text-muted-foreground">justlaweducation@gmail.com</p>
          </div>
          <div className="bg-card border border-border rounded-2xl p-6">
            <h3 className="font-semibold mb-2">Phone</h3>
            <p className="text-sm text-muted-foreground">+853 92959750</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
