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
  },
  {
    question: "What is the difference between gestational and traditional surrogacy?",
    answer: "In gestational surrogacy, the surrogate carries an embryo created from the intended parents' or donors' eggs and sperm, meaning she has no genetic connection to the child. In traditional surrogacy, the surrogate uses her own eggs, making her the biological mother. Gestational surrogacy is more common and legally straightforward in most jurisdictions."
  },
  {
    question: "How much does surrogacy cost in the USA?",
    answer: "Surrogacy costs in the USA typically range from USD $100,000 to $200,000 or more, depending on the state, agency fees, surrogate compensation, medical expenses, legal fees, and whether egg or sperm donation is required. It's important to budget for unexpected expenses as well."
  },
  {
    question: "What happens if the surrogate wants to keep the baby?",
    answer: "With proper legal contracts in place, this scenario is extremely rare. In surrogacy-friendly jurisdictions, pre-birth orders establish the intended parents as the legal parents before birth. A well-drafted surrogacy agreement protects all parties and makes such disputes legally untenable."
  },
  {
    question: "Can single parents or same-sex couples use surrogacy?",
    answer: "Yes, many surrogacy-friendly states in the USA and other countries welcome single parents and same-sex couples. However, laws vary significantly by jurisdiction. Some states have restrictions, so it's crucial to work with a lawyer who understands the specific laws where your surrogacy will take place."
  },
  {
    question: "What medical tests are required before egg freezing?",
    answer: "Before egg freezing, you'll typically undergo blood tests to check hormone levels (AMH, FSH, estradiol), an ultrasound to assess ovarian reserve, and screening for infectious diseases. Your fertility specialist will also review your medical history and may recommend additional tests based on your individual circumstances."
  },
  {
    question: "What is the success rate of using frozen eggs?",
    answer: "Success rates depend on the age at which eggs were frozen. Eggs frozen before age 35 have higher success rates. Generally, about 80-90% of eggs survive the thawing process, and fertilisation rates are similar to fresh eggs. Your fertility clinic can provide personalised estimates based on your situation."
  },
  {
    question: "How do I choose a surrogacy agency?",
    answer: "Look for agencies with a strong track record, transparent pricing, thorough surrogate screening processes, and legal expertise. Ask about their matching process, support services, and what happens if complications arise. Seek references from previous intended parents and ensure they have experience with international clients if applicable."
  },
  {
    question: "What legal documents are needed for international surrogacy?",
    answer: "You'll typically need a surrogacy agreement, pre-birth or post-birth parentage order, the child's birth certificate, passport applications, and potentially immigration documents. Requirements vary by country. Working with lawyers in both the surrogacy country and your home country is essential to ensure all paperwork is properly handled."
  },
  {
    question: "Can I freeze embryos instead of eggs?",
    answer: "Yes, embryo freezing is an option if you have a partner or are using donor sperm. Embryos often have higher survival rates after thawing compared to eggs. However, embryos are considered shared property, which can create complications if relationships change. Discuss the pros and cons with your fertility specialist."
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
