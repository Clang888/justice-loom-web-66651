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
                <h3 className="font-semibold text-lg">Surrogacy Friendly States in the USA</h3>
              </div>
              
              <div className="text-sm text-muted-foreground space-y-4 mb-6">
                <p className="font-medium text-foreground">
                  PLEASE NOTE that this information is a general guide and not legal advice. Laws change frequently. For the most current and specific guidance, please consult with a qualified lawyer specialising in reproductive law.
                </p>
                
                <p>
                  Surrogacy laws in the U.S. are set by each state, not by the federal government. This means the rules are complex and can be very different from one state to another. Some states strongly support surrogacy, while others are restrictive or even ban it. Below please find a list of surrogacy friendly states and surrogacy agencies in those states.
                </p>

                <div>
                  <h4 className="font-semibold text-foreground mb-2">CRITICAL DISCLAIMERS & ADVICE</h4>
                  <ul className="space-y-3">
                    <li>
                      <strong>Type of Surrogacy Matters:</strong> The above primarily refers to gestational surrogacy. Traditional surrogacy (where the surrogate is the egg donor) is legally riskier and prohibited or heavily restricted in many more states due to complex parental rights issues.
                    </li>
                    <li>
                      <strong>Pre-Birth Orders:</strong> A key goal in surrogacy-friendly states is obtaining a pre-birth order, which establishes the intended parents as the legal parents before birth, avoiding the need for adoption.
                    </li>
                    <li>
                      <strong>Residency:</strong> Some states require the intended parents, the surrogate, or both to be residents. Always check local statutes.
                    </li>
                    <li>
                      <strong>Marital Status/Sexual Orientation:</strong> Laws in some states (e.g., Louisiana, Florida historically) favour or only protect married heterosexual couples. This is changing but must be verified. You must consult with reproductive law attorney. They can navigate the specific county court procedures, draft the contract, and secure the parentage order. The American Society for Reproductive Medicine (ASRM) or Academy of Adoption & Assisted Reproduction Attorneys (AAAA) are good starting points for referrals.
                    </li>
                    <li>
                      <strong>Agency Selection:</strong> If using an agency, ensure they have proven expertise and established legal partnerships in the states where they match surrogates and intended parents.
                    </li>
                  </ul>
                </div>

                <p className="italic">
                  This information is a general guide and not legal advice. Laws change frequently. For the most current and specific guidance, please consult with a qualified lawyer specialising in reproductive law.
                </p>
              </div>

              <Link to="/books" className="inline-flex items-center gap-2 text-sm font-medium hover:underline">
                Browse Surrogacy Friendly States in the USA
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
