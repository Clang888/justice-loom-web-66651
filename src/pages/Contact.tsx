import { useState } from "react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import { useTranslation } from "react-i18next";
import { z } from "zod";

// Validation schema
const contactSchema = z.object({
  name: z.string()
    .trim()
    .min(1, "Name is required")
    .max(200, "Name must be under 200 characters")
    .regex(/^[a-zA-Z\s\-'\.]+$/, "Name contains invalid characters"),
  email: z.string()
    .trim()
    .min(1, "Email is required")
    .email("Please enter a valid email address")
    .max(255, "Email must be under 255 characters"),
});

const Contact = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState<{ name?: string; email?: string }>({});
  const { t } = useTranslation();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrors({});
    
    // Validate with zod
    const result = contactSchema.safeParse({ name, email });
    
    if (!result.success) {
      const fieldErrors: { name?: string; email?: string } = {};
      result.error.issues.forEach((issue) => {
        if (issue.path[0] === "name") fieldErrors.name = issue.message;
        if (issue.path[0] === "email") fieldErrors.email = issue.message;
      });
      setErrors(fieldErrors);
      return;
    }

    setIsSubmitting(true);
    
    try {
      const { error } = await supabase
        .from("contact_enquiries" as any)
        .insert({ 
          name: result.data.name, 
          email: result.data.email.toLowerCase() 
        });

      if (error) {
        if (error.code === "23505") {
          setErrors({ email: "This email is already registered" });
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
              maxLength={200}
              className={`w-full px-4 py-3 rounded-xl border bg-card text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 ${
                errors.name ? "border-destructive" : "border-border"
              }`}
              placeholder={t('contact.namePlaceholder')}
            />
            {errors.name && (
              <p className="mt-1 text-sm text-destructive">{errors.name}</p>
            )}
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
              maxLength={255}
              className={`w-full px-4 py-3 rounded-xl border bg-card text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 ${
                errors.email ? "border-destructive" : "border-border"
              }`}
              placeholder={t('contact.emailPlaceholder')}
            />
            {errors.email && (
              <p className="mt-1 text-sm text-destructive">{errors.email}</p>
            )}
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
