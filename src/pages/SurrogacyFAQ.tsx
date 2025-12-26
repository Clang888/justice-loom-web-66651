import { HelpCircle, ChevronDown, ChevronLeft } from "lucide-react";
import { Link } from "react-router-dom";
import { useState } from "react";
import { useTranslation } from "react-i18next";

const SurrogacyFAQ = () => {
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const { t } = useTranslation();

  const faqKeys = Array.from({ length: 15 }, (_, i) => i + 1);

  const toggleFaq = (index: number) => {
    setOpenFaq(openFaq === index ? null : index);
  };

  return (
    <section className="py-16 bg-secondary">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <Link to="/egg-freezing-surrogacy" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground mb-6">
          <ChevronLeft className="w-4 h-4" />
          {t('faq.backLink')}
        </Link>

        <div className="flex items-center gap-3 mb-2">
          <HelpCircle className="w-8 h-8 text-primary" />
        </div>
        <h1 className="text-3xl font-bold">{t('faq.title')}</h1>
        <p className="mt-3 text-muted-foreground max-w-2xl">
          {t('faq.subtitle')}
        </p>

        <div className="mt-10 space-y-3">
          {faqKeys.map((num) => (
            <div 
              key={num} 
              className="bg-card border border-border rounded-xl overflow-hidden"
            >
              <button
                onClick={() => toggleFaq(num)}
                className="w-full px-6 py-4 flex items-center justify-between text-left hover:bg-muted/50 transition-colors"
              >
                <span className="font-medium pr-4">{t(`faq.q${num}`)}</span>
                <ChevronDown 
                  className={`w-5 h-5 flex-shrink-0 transition-transform ${
                    openFaq === num ? "rotate-180" : ""
                  }`} 
                />
              </button>
              {openFaq === num && (
                <div className="px-6 pb-4 text-muted-foreground">
                  {t(`faq.a${num}`)}
                </div>
              )}
            </div>
          ))}
        </div>

        <div className="mt-12 p-4 bg-primary/5 rounded-xl border border-primary/10">
          <p className="text-sm text-muted-foreground">
            <strong className="text-foreground">{t('faq.moreQuestions')}</strong> {t('faq.moreQuestionsDesc')}
          </p>
        </div>
      </div>
    </section>
  );
};

export default SurrogacyFAQ;
