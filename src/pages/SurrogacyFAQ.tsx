import { HelpCircle, ChevronDown, ChevronLeft } from "lucide-react";
import { Link } from "react-router-dom";
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
    answer: "Yes, although the 'intended parents' on a child's birth certificate abroad are the 'legal parents' this does not have any legal weight in Hong Kong. The intended parents must apply for a Parental Order to be recognised as the legal parents of a surrogate baby born abroad."
  },
  {
    question: "Do I need my partner's consent to use my frozen eggs?",
    answer: "In Hong Kong, you must be married in order to use your frozen eggs. If embryos were created with a partner's sperm, both parties must consent to their use. Consent can be withdrawn at any time before the embryos are used."
  },
  {
    question: "Can I pay a surrogate in HK?",
    answer: "If you need some guidance through the surrogacy process please contact Just Law."
  }
];

const SurrogacyFAQ = () => {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const toggleFaq = (index: number) => {
    setOpenFaq(openFaq === index ? null : index);
  };

  return (
    <section className="py-16 bg-secondary">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <Link to="/egg-freezing-surrogacy" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground mb-6">
          <ChevronLeft className="w-4 h-4" />
          Back to Egg Freezing & Surrogacy
        </Link>

        <div className="flex items-center gap-3 mb-2">
          <HelpCircle className="w-8 h-8 text-primary" />
        </div>
        <h1 className="text-3xl font-bold">Frequently Asked Questions</h1>
        <p className="mt-3 text-muted-foreground max-w-2xl">
          Common questions about egg freezing and surrogacy in Hong Kong.
        </p>

        <div className="mt-10 space-y-3">
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

        <div className="mt-12 p-4 bg-primary/5 rounded-xl border border-primary/10">
          <p className="text-sm text-muted-foreground">
            <strong className="text-foreground">Have more questions?</strong> Contact us for personalised guidance on your egg freezing or surrogacy journey.
          </p>
        </div>
      </div>
    </section>
  );
};

export default SurrogacyFAQ;
