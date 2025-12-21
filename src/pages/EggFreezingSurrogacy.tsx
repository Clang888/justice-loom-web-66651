import { Baby, Snowflake, BookOpen, ChevronRight, Scale, HelpCircle, ChevronDown } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import SurrogacyJourneyTracker from "@/components/SurrogacyJourneyTracker";
import { useState } from "react";

const faqs = [
  {
    question: "How long can I store my frozen eggs in HK?",
    answer: "Under HK law, eggs can be stored for up to 10 years, with extensions possible under certain circumstances. You should check with your fertility clinic about specific storage policies and renewal requirements."
  },
  {
    question: "Is surrogacy legal in HK?",
    answer: "Surrogacy is highly regulated in Hong Kong by the Human Reproductive Technology Ordinance (HRTO) and the Parent and Child Ordinance (PCO). Many HK residents pursue surrogacy arrangements abroad."
  },
  {
    question: "What is a Parental Order and when do I need one?",
    answer: "A Parental Order transfers legal parenthood from the surrogate (and her partner, if applicable) to the intended parents. The requirements vary depending on where the surrogacy takes place and where you intend to raise the child."
  },
  {
    question: "Can I use a surrogate abroad and bring the child back to HK?",
    answer: "Yes, but although the 'intended parents' on a child's birth certificate abroad are the 'legal parents' this does not have any legal weight in Hong Kong. The intended parents must apply for a Parental Order to be recognised as the legal parents of a surrogate baby born abroad."
  },
  {
    question: "Do I need my partner's consent to use my frozen eggs?",
    answer: "If you froze your eggs alone, you do not need your partner's consent to use them. However, if embryos were created with a partner's sperm, both parties must consent to their use. Consent can be withdrawn at any time before the embryos are used."
  },
  {
    question: "Can I pay a surrogate in HK?",
    answer: "Commercial surrogacy is not clearly regulated in HK. Many intended parents from HK pursue surrogacy arrangements in jurisdictions where it is legally permitted and regulated. It is important to understand the legal implications in both the surrogacy jurisdiction and HK."
  }
];

const EggFreezingSurrogacy = () => {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const toggleFaq = (index: number) => {
    setOpenFaq(openFaq === index ? null : index);
  };
  return (
    <section className="py-16 bg-secondary">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-3 mb-2">
          <Baby className="w-8 h-8 text-primary" />
          <Snowflake className="w-8 h-8 text-primary" />
        </div>
        <h1 className="text-3xl font-bold">Egg Freezing & Surrogacy</h1>
        <p className="mt-3 text-muted-foreground max-w-2xl">
          Comprehensive legal guidance for fertility preservation and surrogacy arrangements, 
          helping you navigate the complex legal landscape with confidence.
        </p>

        <div className="mt-10 grid md:grid-cols-2 gap-8">
          {/* Egg Freezing Card */}
          <div className="bg-card border border-border rounded-2xl p-6 shadow-sm">
            <div className="flex items-center gap-3 mb-4">
              <Snowflake className="w-6 h-6 text-primary" />
              <h2 className="font-semibold text-xl">Egg Freezing</h2>
            </div>
            <p className="text-muted-foreground mb-4">
              Understanding your legal rights and options when preserving your fertility for the future.
            </p>
            <ul className="space-y-2 text-sm text-muted-foreground mb-6">
              <li className="flex items-start gap-2">
                <Scale className="w-4 h-4 mt-0.5 flex-shrink-0" />
                <span>Consent and storage agreements</span>
              </li>
              <li className="flex items-start gap-2">
                <Scale className="w-4 h-4 mt-0.5 flex-shrink-0" />
                <span>Storage duration and renewal rights</span>
              </li>
              <li className="flex items-start gap-2">
                <Scale className="w-4 h-4 mt-0.5 flex-shrink-0" />
                <span>Partner consent considerations</span>
              </li>
              <li className="flex items-start gap-2">
                <Scale className="w-4 h-4 mt-0.5 flex-shrink-0" />
                <span>Cross-border storage regulations</span>
              </li>
            </ul>
          </div>

          {/* Surrogacy Card */}
          <div className="bg-card border border-border rounded-2xl p-6 shadow-sm">
            <div className="flex items-center gap-3 mb-4">
              <Baby className="w-6 h-6 text-primary" />
              <h2 className="font-semibold text-xl">Surrogacy</h2>
            </div>
            <p className="text-muted-foreground mb-4">
              Navigate the legal frameworks for domestic and international surrogacy arrangements.
            </p>
            <ul className="space-y-2 text-sm text-muted-foreground mb-6">
              <li className="flex items-start gap-2">
                <Scale className="w-4 h-4 mt-0.5 flex-shrink-0" />
                <span>UK surrogacy law and parental orders</span>
              </li>
              <li className="flex items-start gap-2">
                <Scale className="w-4 h-4 mt-0.5 flex-shrink-0" />
                <span>International surrogacy considerations</span>
              </li>
              <li className="flex items-start gap-2">
                <Scale className="w-4 h-4 mt-0.5 flex-shrink-0" />
                <span>Surrogate and intended parent agreements</span>
              </li>
              <li className="flex items-start gap-2">
                <Scale className="w-4 h-4 mt-0.5 flex-shrink-0" />
                <span>Birth registration and citizenship</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Resources Section */}
        <div className="mt-12">
          <h2 className="text-2xl font-semibold mb-6">Resources & Tools</h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-card border border-border rounded-2xl p-6 shadow-sm">
              <div className="flex items-center gap-3 mb-4">
                <BookOpen className="w-6 h-6" />
                <h3 className="font-semibold text-lg">Educational Guides</h3>
              </div>
              <p className="text-sm text-muted-foreground mb-4">
                Comprehensive guides covering legal requirements, timelines, and practical considerations.
              </p>
              <Link to="/books" className="inline-flex items-center gap-2 text-sm font-medium hover:underline">
                Browse Guides <ChevronRight className="w-4 h-4" />
              </Link>
            </div>
            
            <SurrogacyJourneyTracker />
          </div>
        </div>

        {/* FAQ Section */}
        <div className="mt-12">
          <div className="flex items-center gap-3 mb-6">
            <HelpCircle className="w-6 h-6 text-primary" />
            <h2 className="text-2xl font-semibold">Frequently Asked Questions</h2>
          </div>
          <div className="space-y-3">
            {faqs.map((faq, index) => (
              <div 
                key={index} 
                className="bg-card border border-border rounded-xl overflow-hidden"
              >
                <button
                  onClick={() => toggleFaq(index)}
                  className="w-full px-6 py-4 flex items-center justify-between text-left hover:bg-muted/50 transition-colors"
                >
                  <span className="font-medium pr-4">{faq.question}</span>
                  <ChevronDown 
                    className={`w-5 h-5 flex-shrink-0 transition-transform ${
                      openFaq === index ? "rotate-180" : ""
                    }`} 
                  />
                </button>
                {openFaq === index && (
                  <div className="px-6 pb-4 text-muted-foreground">
                    {faq.answer}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        <div className="mt-12 bg-card border border-border rounded-2xl p-8 text-center">
          <h2 className="text-2xl font-semibold mb-3">Need Personalised Advice?</h2>
          <p className="text-muted-foreground mb-6 max-w-xl mx-auto">
            Every fertility and surrogacy journey is unique. Get expert legal guidance tailored to your specific situation.
          </p>
          <Link to="/contact">
            <Button size="lg">
              Book a Consultation
              <ChevronRight className="w-4 h-4 ml-2" />
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default EggFreezingSurrogacy;
