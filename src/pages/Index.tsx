import { Link } from "react-router-dom";
import { ShieldCheck, Globe, BookOpen, Hammer, ChevronRight } from "lucide-react";
import heroImage from "@/assets/hero-teahouse.jpg";

const Index = () => {
  return (
    <>
      {/* Hero Section */}
      <section className="relative overflow-hidden gradient-hero">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_hsl(35_80%_55%_/_0.1),_transparent_50%)]"></div>
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-24 grid lg:grid-cols-2 gap-12 items-center relative">
          <div className="animate-fade-in">
            <p className="inline-block rounded-full bg-gradient-accent text-primary-foreground text-sm font-semibold px-5 py-2 mb-6 shadow-warm">Just Law</p>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight font-serif">
              Your Guide to <span className="text-gradient">Self-Representation</span>
            </h1>
            <p className="mt-4 text-xl sm:text-2xl text-muted-foreground font-medium">
              Navigate Your Legal System with Confidence
            </p>
            <p className="mt-6 text-base text-muted-foreground max-w-xl leading-relaxed">
              Our mission is to make justice easy to find, easy to understand, and easy to use.
            </p>
            <div className="mt-8 flex items-center gap-3 text-sm text-muted-foreground bg-card/60 backdrop-blur-sm rounded-xl px-4 py-3 border border-border/50 inline-flex">
              <Globe className="w-5 h-5 text-accent" /> 
              <span>Common-law focus: Hong Kong, United States, England & Wales, Republic of Ireland.</span>
            </div>
          </div>
          <div className="lg:justify-self-end animate-scale-in" style={{ animationDelay: '0.2s' }}>
            <img
              src={heroImage}
              alt="Just Law - AI Powered"
              className="w-full h-auto rounded-2xl border border-border/50 shadow-elevated object-cover"
            />
          </div>
        </div>
      </section>

      {/* About Us Section */}
      <section className="py-20 bg-card relative">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left,_hsl(200_45%_30%_/_0.05),_transparent_50%)]"></div>
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative">
          <h2 className="text-3xl sm:text-4xl font-bold mb-10 font-serif">About us</h2>

          <div className="grid md:grid-cols-2 gap-8">
            {/* Caroline Langley */}
            <div className="card-elevated rounded-2xl p-8 hover-lift">
              <img src="/caroline-langley.png" alt="Caroline Langley" className="w-full aspect-square object-cover rounded-xl mb-6 shadow-lg" />
              <h3 className="font-bold text-xl mb-1 font-serif">CAROLINE LANGLEY</h3>
              <p className="text-sm font-semibold text-accent mb-4">CEO and Co-Founder</p>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Caroline is a barrister and legal innovator based in Hong Kong with over 30 years of frontline experience in law. She is qualified and has practised in 4 jurisdictions. She founded Just Law Education to make legal knowledge clear, practical, and accessible. Her forthcoming book, <span className="italic font-medium text-foreground">"A Litigant's Guide to Self Representation in HK Family Court"</span>, builds on that mission, offering step-by-step guidance for litigants in person. Her current project <span className="italic font-medium text-foreground">"My Legal Assistant"</span>, uses AI to simplify court forms and procedures, a concept that recently attracted a buy out offer from a Silicon Valley tech company. Caroline is dedicated to transforming real world legal challenges into intelligent, user friendly digital solutions.
              </p>
            </div>

            {/* Alexandre Santos de Salles */}
            <div className="card-elevated rounded-2xl p-8 hover-lift">
              <img src="/alex-santos.png" alt="Alexandre Santos de Salles" className="w-full aspect-square object-cover rounded-xl mb-6 shadow-lg" />
              <h3 className="font-bold text-xl mb-1 font-serif">ALEX SANTOS</h3>
              <p className="text-sm font-semibold text-accent mb-4">CTO and Co-Founder</p>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Alex is a technology consultant and product designer based in Ireland, specialising in accessible, human-centered digital solutions. With a focus on demystifying complex systems, Alex builds applications that enable users to navigate technology with confidence and ease. His recent work includes Passenger.ie, an app that transforms the train booking experience for elderly users, making online rail services effortless and inclusive. Alex's approach combines deep user empathy with technical innovation, translating real-world friction points into intuitive digital experiences. In addition to development, Alex delivers digital literacy training to seniors and government organisations across Ireland, bridging the gap between people and technology through both education and design.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* What We Stand For Section */}
      <section className="py-20 bg-card relative">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-3 gap-10 items-start">
            <div className="lg:col-span-2">
              <h2 className="text-3xl sm:text-4xl font-bold font-serif">What we stand for</h2>
              <p className="mt-6 text-muted-foreground leading-relaxed text-lg">
                It is Just, Right and Fair that everyone can access to justice. It is also Just, Right and Fair that the tools needed to access justice are easy to find, easy to understand and easy to use. We design practical, compassionate resources for self-represented litigants, starting with Hong Kong and other common-law jurisdictions.
              </p>
            </div>
            <div className="card-elevated rounded-2xl p-6">
              <h3 className="font-semibold mb-4 font-serif text-lg">At a glance</h3>
              <ul className="space-y-3 text-sm text-muted-foreground">
                <li className="flex items-start gap-2"><span className="text-accent">✓</span> 30+ years of multi-jurisdictional civil practice</li>
                <li className="flex items-start gap-2"><span className="text-accent">✓</span> Clear how-to procedural guides</li>
                <li className="flex items-start gap-2"><span className="text-accent">✓</span> Community-driven learning & peer support</li>
                <li className="flex items-start gap-2"><span className="text-accent">✓</span> Ethical and easy to use product design</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-20 gradient-warm relative">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_hsl(200_45%_30%_/_0.05),_transparent_50%)]"></div>
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative">
          <h2 className="text-3xl sm:text-4xl font-bold font-serif">Services</h2>
          <p className="mt-4 text-muted-foreground max-w-2xl text-lg">
            Plain-English pathways, worksheets, and templates to help you move forward with confidence.
          </p>

          <div className="mt-10 grid md:grid-cols-3 gap-8">
            {[
              { icon: <Hammer className="w-6 h-6" />, title: "Divorce & Finance", text: "Timetables (FDA/FDR), Form E guidance, disclosure checklists, settlement prep." },
              { icon: <ShieldCheck className="w-6 h-6" />, title: "Wills & Estates", text: "Starter packs, asset schedules, executorship basics, witness requirements." },
              { icon: <BookOpen className="w-6 h-6" />, title: "Small Claims", text: "Claim flow, evidence packs, hearing day prep, negotiation scripts." },
            ].map((card, i) => (
              <div key={i} className="card-elevated rounded-2xl p-8 hover-lift">
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-3 bg-accent/20 rounded-xl text-accent">
                    {card.icon}
                  </div>
                  <h3 className="font-semibold text-lg font-serif">{card.title}</h3>
                </div>
                <p className="text-sm text-muted-foreground leading-relaxed">{card.text}</p>
                <Link to="/contact" className="mt-5 inline-flex items-center gap-2 text-sm font-medium text-primary hover:text-accent transition-colors">
                  Enquire <ChevronRight className="w-4 h-4" />
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
};

export default Index;
