import { Link } from "react-router-dom";
import { ShieldCheck, Globe, Briefcase, MessageSquare, Zap, BookOpen, Hammer, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";

const Index = () => {
  return (
    <>
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-b from-card to-secondary">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-20 grid lg:grid-cols-2 gap-10 items-center">
          <div>
            <p className="inline-block rounded-full bg-primary text-primary-foreground text-xs font-medium px-3 py-1 mb-4">Access to Justice</p>
            <h1 className="text-4xl sm:text-5xl font-extrabold leading-tight">
              Easy-to-use legal guidance for <span className="underline decoration-amber-400 decoration-4 underline-offset-4">self-represented people</span>
            </h1>
            <p className="mt-5 text-lg text-muted-foreground max-w-xl">
              Founded by Caroline Langley, barrister with 30+ years of multi-jurisdictional experience. Our mission: make justice easy to find, easy to understand, and easy to use.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <Link to="/services" className="rounded-xl px-5 py-3 bg-primary text-primary-foreground font-medium hover:bg-primary/90">Explore Services</Link>
              <Link to="/ai-tools" className="rounded-xl px-5 py-3 border border-border font-medium hover:bg-card">Try AI Tools</Link>
            </div>
            <div className="mt-6 flex items-center gap-6 text-sm text-muted-foreground">
              <div className="flex items-center gap-2"><ShieldCheck className="w-4 h-4" /> Practical, plain-English tools</div>
              <div className="flex items-center gap-2"><Globe className="w-4 h-4" /> Common-law focus (HK, UK, IE, AU, CA, US)</div>
            </div>
          </div>
          <div className="lg:justify-self-end">
            <img
              src="/jle-hero-1600.jpg"
              alt="Just Law - AI Powered"
              className="w-full h-auto rounded-2xl border border-border shadow-sm object-cover"
            />
          </div>
        </div>
      </section>

      {/* About Us Section */}
      <section className="py-16 bg-card">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold mb-8">About us</h2>

          <div className="grid md:grid-cols-2 gap-8">
            {/* Caroline Langley */}
            <div className="bg-secondary border border-border rounded-2xl p-6">
              <img src="/caroline-langley.png" alt="Caroline Langley" className="w-full aspect-square object-cover rounded-xl mb-4" />
              <h3 className="font-bold text-xl mb-1">CAROLINE LANGLEY</h3>
              <p className="text-sm font-semibold text-primary mb-3">CEO and Co-Founder</p>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Caroline is a barrister and legal innovator based in Hong Kong with over 30 years of frontline experience in law. She is qualified and has practised in 4 jurisdictions. She founded Just Law Education to make legal knowledge clear, practical, and accessible. Her forthcoming book, <span className="italic">"A Litigant's Guide to Self Representation in HK Family Court"</span>, builds on that mission, offering step-by-step guidance for litigants in person. Her current project <span className="italic">"My Legal Assistant"</span>, uses AI to simplify court forms and procedures, a concept that recently attracted a buy out offer from a Silicon Valley tech company. Caroline is dedicated to transforming real world legal challenges into intelligent, user friendly digital solutions.
              </p>
            </div>

            {/* Alexandre Santos de Salles */}
            <div className="bg-secondary border border-border rounded-2xl p-6">
              <img src="/alex-santos.png" alt="Alexandre Santos de Salles" className="w-full aspect-square object-cover rounded-xl mb-4" />
              <h3 className="font-bold text-xl mb-1">ALEX SANTOS</h3>
              <p className="text-sm font-semibold text-primary mb-3">CTO and Co-Founder</p>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Alex is a technology consultant and product designer based in Ireland, specialising in accessible, human-centered digital solutions. With a focus on demystifying complex systems, Alex builds applications that enable users to navigate technology with confidence and ease. His recent work includes Passenger.ie, an app that transforms the train booking experience for elderly users, making online rail services effortless and inclusive. Alex's approach combines deep user empathy with technical innovation, translating real-world friction points into intuitive digital experiences. In addition to development, Alex delivers digital literacy training to seniors and government organisations across Ireland, bridging the gap between people and technology through both education and design.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* AI Tools Section */}
      <section className="py-16 bg-gradient-to-b from-background to-secondary">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl sm:text-5xl font-extrabold mb-4">
              AI Legal Tools
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Choose your AI assistant based on your needs
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {/* Briefcase Card */}
            <div className="bg-card border border-border rounded-2xl p-8 shadow-lg hover:shadow-xl transition-shadow">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-3 bg-primary/10 rounded-xl">
                  <Briefcase className="w-8 h-8 text-primary" />
                </div>
                <div>
                  <h3 className="text-2xl font-bold">Briefcase</h3>
                  <p className="text-sm text-muted-foreground">Quick Legal Form Discovery</p>
                </div>
              </div>

              <div className="mb-6">
                <span className="inline-block px-3 py-1 bg-primary/10 text-primary text-xs font-semibold rounded-full mb-4">
                  <Zap className="w-3 h-3 inline mr-1" />
                  Fast & Transactional
                </span>
                <p className="text-muted-foreground mb-4">
                  Briefcase helps Hong Kong residents quickly find and access legal forms. 
                  Users can describe what form they need or describe their problem to get instant form recommendations. 
                  Users can then fill the PDFs directly in their browser and download completed documents.
                </p>
              </div>

              <div className="mb-6">
                <h4 className="font-semibold mb-3 flex items-center gap-2 text-sm">
                  <BookOpen className="w-4 h-4" />
                  Use Cases:
                </h4>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li className="flex items-start gap-2">
                    <span className="text-primary mt-0.5">•</span>
                    <span>"I need Form 3A" → retrieves the form directly</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-primary mt-0.5">•</span>
                    <span>"I need a divorce petition form" → finds and suggests Form 3A</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-primary mt-0.5">•</span>
                    <span>"What form do I need to change my company name?" → recommends the correct form</span>
                  </li>
                </ul>
              </div>

              <Link to="/briefcase">
                <Button className="w-full" size="lg">
                  Open Briefcase
                </Button>
              </Link>
            </div>

            {/* My Legal Assistant Card */}
            <div className="bg-card border border-border rounded-2xl p-8 shadow-lg hover:shadow-xl transition-shadow">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-3 bg-primary/10 rounded-xl">
                  <MessageSquare className="w-8 h-8 text-primary" />
                </div>
                <div>
                  <h3 className="text-2xl font-bold">My Legal Assistant</h3>
                  <p className="text-sm text-muted-foreground">In-Depth Legal Consultation</p>
                </div>
              </div>

              <div className="mb-6">
                <span className="inline-block px-3 py-1 bg-primary/10 text-primary text-xs font-semibold rounded-full mb-4">
                  <MessageSquare className="w-3 h-3 inline mr-1" />
                  Consultative & Educational
                </span>
                <p className="text-muted-foreground mb-4">
                  My Legal Assistant is a conversational AI that helps Hong Kong residents understand their legal situation through detailed discussion. 
                  Users can explain their case in depth, and the assistant provides guidance on their legal options and next steps. 
                  The assistant then tells users which specific forms they need to file.
                </p>
              </div>

              <div className="mb-6">
                <h4 className="font-semibold mb-3 flex items-center gap-2 text-sm">
                  <BookOpen className="w-4 h-4" />
                  Use Cases:
                </h4>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li className="flex items-start gap-2">
                    <span className="text-primary mt-0.5">•</span>
                    <span>User explains full divorce situation → Assistant discusses options, timelines, considerations → Then recommends forms needed</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-primary mt-0.5">•</span>
                    <span>Get detailed guidance on legal procedures and what to expect</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-primary mt-0.5">•</span>
                    <span>Understand your rights and available legal options</span>
                  </li>
                </ul>
              </div>

              <Link to="/assistant">
                <Button className="w-full" size="lg" variant="secondary">
                  Start Consultation
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* What We Stand For Section */}
      <section className="py-16 bg-card">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-3 gap-8 items-start">
            <div className="lg:col-span-2">
              <h2 className="text-3xl font-bold">What we stand for</h2>
              <p className="mt-4 text-muted-foreground leading-relaxed">
                It is Just, Right and Fair that everyone can access to justice. It is also Just, Right and Fair that the tools needed to access justice are easy to find, easy to understand and easy to use. We design practical, compassionate resources for self-represented litigants, starting with Hong Kong and other common-law jurisdictions.
              </p>
            </div>
            <div className="bg-secondary border border-border rounded-2xl p-6">
              <h3 className="font-semibold mb-2">At a glance</h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>30+ years of multi-jurisdictional civil practice</li>
                <li>Clear how-to procedural guides</li>
                <li>Community-driven learning & peer support</li>
                <li>Ethical and easy to use product design</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-16 bg-secondary">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold">Services</h2>
          <p className="mt-3 text-muted-foreground max-w-2xl">
            Plain-English pathways, worksheets, and templates to help you move forward with confidence.
          </p>

          <div className="mt-8 grid md:grid-cols-3 gap-6">
            {[
              { icon: <Hammer className="w-6 h-6" />, title: "Divorce & Finance", text: "Timetables (FDA/FDR), Form E guidance, disclosure checklists, settlement prep." },
              { icon: <ShieldCheck className="w-6 h-6" />, title: "Wills & Estates", text: "Starter packs, asset schedules, executorship basics, witness requirements." },
              { icon: <BookOpen className="w-6 h-6" />, title: "Small Claims", text: "Claim flow, evidence packs, hearing day prep, negotiation scripts." },
            ].map((card, i) => (
              <div key={i} className="bg-card border border-border rounded-2xl p-6 shadow-sm">
                <div className="flex items-center gap-3">{card.icon}<h3 className="font-semibold text-lg">{card.title}</h3></div>
                <p className="mt-3 text-sm text-muted-foreground">{card.text}</p>
                <Link to="/contact" className="mt-4 inline-flex items-center gap-2 text-sm font-medium hover:underline">
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
