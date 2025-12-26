import { useTranslation } from "react-i18next";

const Testimonials = () => {
  const { t } = useTranslation();

  return (
    <section className="py-16 bg-card">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-bold">{t('testimonials.title')}</h2>
        <div className="mt-8 grid md:grid-cols-3 gap-6">
          <blockquote className="bg-secondary border border-border rounded-2xl p-6 text-sm">
            <p>"{t('testimonials.quote1')}"</p>
            <footer className="mt-4 text-muted-foreground">— {t('testimonials.quote1Author')}</footer>
          </blockquote>
          <blockquote className="bg-secondary border border-border rounded-2xl p-6 text-sm">
            <p>"{t('testimonials.quote2')}"</p>
            <footer className="mt-4 text-muted-foreground">— {t('testimonials.quote2Author')}</footer>
          </blockquote>
          <blockquote className="bg-secondary border border-border rounded-2xl p-6 text-sm">
            <p>"{t('testimonials.quote3')}"</p>
            <footer className="mt-4 text-muted-foreground">— {t('testimonials.quote3Author')}</footer>
          </blockquote>
          <blockquote className="bg-secondary border border-border rounded-2xl p-6 text-sm">
            <p>"{t('testimonials.quote4')}"</p>
            <footer className="mt-4 text-muted-foreground">— {t('testimonials.quote4Author')}</footer>
          </blockquote>
          <blockquote className="bg-secondary border border-border rounded-2xl p-6 text-sm">
            <p>"{t('testimonials.quote5')}"</p>
            <footer className="mt-4 text-muted-foreground">— {t('testimonials.quote5Author')}</footer>
          </blockquote>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
