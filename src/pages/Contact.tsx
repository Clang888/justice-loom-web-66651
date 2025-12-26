import { useState } from "react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import { useTranslation } from "react-i18next";
import { z } from "zod";

const contactSchema = z.object({
  name: z.string().trim().min(1, "Name is required").max(255, "Name must be under 255 characters"),
  email: z.string().trim().email("Invalid email address").max(255, "Email must be under 255 characters")
});

const Contact = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { t } = useTranslation();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const validation = contactSchema.safeParse({ name, email });
    if (!validation.success) {
      toast.error(validation.error.issues[0]?.message || "Validation error");
      return;
    }

    setIsSubmitting(true);
    
    try {
      const { error } = await supabase
        .from("contact_enquiries" as any)
        .insert(validation.data);

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
        <h2 className="text-3xl font-bold">{t('contact.title')}</h2>
        <p className="mt-3 text-muted-foreground max-w-2xl">
          {t('contact.subtitle')}
        </p>

        <form onSubmit={handleSubmit} className="mt-8 max-w-md space-y-4">
          <div>
            <label htmlFor="name" className="block text-sm font-medium mb-2">
              {t('contact.name')}
            </label>
            <input
              type="text"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-4 py-3 rounded-xl border border-border bg-card text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
              placeholder={t('contact.namePlaceholder')}
            />
          </div>
          <div>
            <label htmlFor="email" className="block text-sm font-medium mb-2">
              {t('contact.email')}
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-3 rounded-xl border border-border bg-card text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
              placeholder={t('contact.emailPlaceholder')}
            />
          </div>
          <Button type="submit" disabled={isSubmitting} className="w-full">
            {isSubmitting ? t('contact.submitting') : t('contact.submit')}
          </Button>
        </form>

        <div className="mt-12 grid md:grid-cols-2 gap-6 max-w-lg">
          <div className="bg-card border border-border rounded-2xl p-6">
            <h3 className="font-semibold mb-2">{t('contact.emailLabel')}</h3>
            <p className="text-sm text-muted-foreground">justlaweducation@gmail.com</p>
          </div>
          <div className="bg-card border border-border rounded-2xl p-6">
            <h3 className="font-semibold mb-2">{t('contact.phoneLabel')}</h3>
            <p className="text-sm text-muted-foreground">+852 9295 9750</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
