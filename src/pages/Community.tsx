import { Mail } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

const Community = () => {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email.trim() || !name.trim()) {
      toast.error("Please enter your name and email");
      return;
    }

    setIsSubmitting(true);
    try {
      const { error } = await supabase
        .from("newsletter_subscribers")
        .insert({ email: email.trim(), name: name.trim() });

      if (error) {
        if (error.code === "23505") {
          toast.error("This email is already subscribed");
        } else {
          throw error;
        }
      } else {
        toast.success("Successfully subscribed to the newsletter!");
        setEmail("");
        setName("");
      }
    } catch (error) {
      toast.error("Failed to subscribe. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="py-16 bg-card">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-bold">Join the community</h2>
        <p className="mt-3 text-muted-foreground max-w-2xl">
          Connect with others, ask questions, and share what you&apos;ve learned. Our LinkedIn group and newsletter offer practical discussions, templates, and updates.
        </p>
        <div className="mt-6 grid md:grid-cols-2 gap-6">
          <div className="bg-secondary border border-border rounded-2xl p-6">
            <img src="/li-china-logo.png" alt="LinkedIn China - Just Law" className="w-full h-32 object-contain rounded-lg mb-4" />
            <h3 className="font-semibold">LinkedIn Group</h3>
            <p className="text-sm text-muted-foreground mt-2">Just Law. Join the conversation with over 1,500 members.</p>
          </div>
          <div className="bg-secondary border border-border rounded-2xl p-6">
            <div className="flex items-center gap-3 mb-4"><Mail className="w-6 h-6" /><h3 className="font-semibold">Newsletter</h3></div>
            <p className="text-sm text-muted-foreground mt-2 mb-4">Bi-monthly digest: new guides, upcoming reforms, short tips you can use.</p>
            
            <form onSubmit={handleSubscribe} className="space-y-3">
              <input
                type="text"
                placeholder="Your name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full px-4 py-2 rounded-lg border border-border bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/20"
              />
              <input
                type="email"
                placeholder="Your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-2 rounded-lg border border-border bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/20"
              />
              <Button type="submit" disabled={isSubmitting} className="w-full">
                {isSubmitting ? "Subscribing..." : "Subscribe"}
              </Button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Community;
