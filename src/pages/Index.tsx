import { useState } from "react";
import {
  BookOpen, Scale, Mic, Hammer, Users,
  ChevronRight, ShieldCheck, Globe, Mail, Phone, MessageSquare
} from "lucide-react";

const Index = () => {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [sent, setSent] = useState(false);

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSent(true);
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* NAV */}
      <header className="sticky top-0 z-50 bg-card/80 backdrop-blur border-b border-border">
        <nav className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 flex items-center justify-between h-16">
          <a href="#home" className="flex items-center gap-2 font-semibold text-lg">
            <Scale className="w-6 h-6" aria-hidden="true" />
            <span>Just Law Education</span>
          </a>
          <div className="hidden md:flex items-center gap-6 text-sm">
            <a href="#mission" className="hover:text-foreground">Mission</a>
            <a href="#about" className="hover:text-foreground">About</a>
            <a href="#services" className="hover:text-foreground">Services</a>
            <a href="#tools" className="hover:text-foreground">AI Tools</a>
            <a href="#books" className="hover:text-foreground">Books</a>
            <a href="#speaking" className="hover:text-foreground">Speaking</a>
            <a href="#testimonials" className="hover:text-foreground">Testimonials</a>
            <a href="#community" className="hover:text-foreground">Community</a>
            <a href="#contact" className="inline-flex items-center gap-1 rounded-full border px-3 py-1.5 hover:bg-secondary">
              Contact <ChevronRight className="w-4 h-4" />
            </a>
          </div>
        </nav>
      </header>

      {/* HERO */}
      <section id="home" className="relative overflow-hidden bg-gradient-to-b from-card to-secondary">
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
              <a href="#services" className="rounded-xl px-5 py-3 bg-primary text-primary-foreground font-medium hover:bg-primary/90">Explore Services</a>
              <a href="#tools" className="rounded-xl px-5 py-3 border border-border font-medium hover:bg-card">Try the MVP</a>
            </div>
            <div className="mt-6 flex items-center gap-6 text-sm text-muted-foreground">
              <div className="flex items-center gap-2"><ShieldCheck className="w-4 h-4" /> Practical, plain-English tools</div>
              <div className="flex items-center gap-2"><Globe className="w-4 h-4" /> Common-law focus (HK, UK, IE, AU, CA, US)</div>
            </div>
          </div>
          <div className="lg:justify-self-end">
            <img
              src="/jle-hero-1600.jpg"
              alt="Just Law Education - AI Powered"
              className="w-full h-auto rounded-2xl border border-border shadow-sm object-cover"
            />
          </div>
        </div>
      </section>

      {/* MISSION */}
      <section id="mission" className="py-16 border-t border-border bg-card">
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

      {/* ABOUT */}
      <section id="about" className="py-16 bg-card border-t border-border">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold">About us</h2>
          <p className="mt-3 text-muted-foreground max-w-3xl">
            We&apos;re a small, mission-driven team building practical tools so everyday people can navigate the law with confidence.
          </p>

          <div className="mt-8 grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Caroline */}
            <div className="bg-secondary border border-border rounded-2xl p-6">
              <img src="/jle-hero-1600.jpg" alt="Caroline Langley" className="w-full h-40 object-cover rounded-xl mb-4" />
              <h3 className="font-semibold">Caroline Langley</h3>
              <p className="text-sm text-muted-foreground">
                Founder & CEO · Barrister (HK, E&W, ROI; US-admitted). 35+ years cross-border practice; author, educator, and advocate for access to justice.
              </p>
              <a href="https://www.linkedin.com/in/cdlangley" className="text-sm font-medium hover:underline">LinkedIn</a>
            </div>

            {/* Placeholders */}
            <div className="bg-secondary border border-border rounded-2xl p-6">
              <div className="w-full h-40 rounded-xl bg-muted mb-4"></div>
              <h3 className="font-semibold">Head of Product</h3>
              <p className="text-sm text-muted-foreground">AI & UX Lead</p>
            </div>
            <div className="bg-secondary border border-border rounded-2xl p-6">
              <div className="w-full h-40 rounded-xl bg-muted mb-4"></div>
              <h3 className="font-semibold">Community Lead</h3>
              <p className="text-sm text-muted-foreground">Education & Outreach</p>
            </div>
            <div className="bg-secondary border border-border rounded-2xl p-6">
              <div className="w-full h-40 rounded-xl bg-muted mb-4"></div>
              <h3 className="font-semibold">Ops & Compliance</h3>
              <p className="text-sm text-muted-foreground">Data & Risk</p>
            </div>
          </div>
        </div>
      </section>

      {/* SPEAKING */}
      <section id="speaking" className="py-16 bg-secondary border-t border-border">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold">Speaking & Events</h2>
          <p className="mt-3 text-muted-foreground max-w-3xl">
            Caroline Langley has delivered 30+ international talks, webinars, and media appearances on access to justice, self-representation, and legal technology.
            Invite her to speak at your conference, panel, or podcast.
          </p>

          <div className="mt-6 grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="bg-card border border-border rounded-2xl p-6 shadow-sm">
              <h3 className="font-semibold">Family Law Reform</h3>
              <p className="text-sm text-muted-foreground mt-2">Keynote on modernizing divorce and child proceedings in common-law courts.</p>
            </div>
            <div className="bg-card border border-border rounded-2xl p-6 shadow-sm">
              <h3 className="font-semibold">AI for Access to Justice</h3>
              <p className="text-sm text-muted-foreground mt-2">Session on ethical AI tools for self-represented litigants.</p>
            </div>
            <div className="bg-card border border-border rounded-2xl p-6 shadow-sm">
              <h3 className="font-semibold">Cross-Border Practice</h3>
              <p className="text-sm text-muted-foreground mt-2">Panel on multi-jurisdictional family and civil cases.</p>
            </div>
          </div>

          <a href="#contact" className="mt-6 inline-flex items-center gap-2 text-sm font-medium hover:underline">
            Request Caroline for an event <ChevronRight className="w-4 h-4" />
          </a>
        </div>
      </section>

      {/* SERVICES */}
      <section id="services" className="py-16 bg-secondary border-t border-border">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold">Practical services</h2>
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
                <a href="#contact" className="mt-4 inline-flex items-center gap-2 text-sm font-medium hover:underline">
                  Enquire <ChevronRight className="w-4 h-4" />
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section id="testimonials" className="py-16 bg-card border-t border-border">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold">What people say</h2>
          <div className="mt-8 grid md:grid-cols-3 gap-6">
            <blockquote className="bg-secondary border border-border rounded-2xl p-6 text-sm">
              <p>"It's rare to find such a phenomenal talent as Caroline… vast experience in the courtroom and extensive knowledge of international law give her an incalculable advantage."</p>
              <footer className="mt-4 text-muted-foreground">— Warren Lichtenstein, Founder & Executive Chairman, Steel Partners Holdings (NY, USA)</footer>
            </blockquote>
            <blockquote className="bg-secondary border border-border rounded-2xl p-6 text-sm">
              <p>"A highly skilled and experienced attorney and mediator with an excellent reputation for professionalism and integrity… an asset to the clients she serves."</p>
              <footer className="mt-4 text-muted-foreground">— James M. Lyons, Former US Observer to the National Fund for Ireland; Special Advisor to President Clinton</footer>
            </blockquote>
            <blockquote className="bg-secondary border border-border rounded-2xl p-6 text-sm">
              <p>"She demonstrated that rare gift of coupling a solid grasp of geo-economic issues with market fluency."</p>
              <footer className="mt-4 text-muted-foreground">— Dr. Enzio von Pfeil, Associate Partner, St. James's Place Wealth Management (HK)</footer>
            </blockquote>
          </div>
        </div>
      </section>

      {/* TOOLS */}
      <section id="tools" className="py-16 bg-card border-t border-border">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-8 items-start">
            <div className="bg-secondary border border-border rounded-2xl p-6">
              <div className="flex items-center gap-3"><Mic className="w-6 h-6" /><h3 className="font-semibold text-lg">My Legal Assistant (MVP)</h3></div>
              <p className="mt-2 text-muted-foreground text-sm">A voice-guided assistant for Divorce, Wills & Small Claims. Prompts you with the right questions, helps structure information, and prepares next steps.</p>
              <ul className="mt-4 space-y-2 text-sm text-muted-foreground list-disc pl-5">
                <li>Voice prompts & smart forms</li>
                <li>Jurisdiction-aware checklists</li>
                <li>Plain-English explanations</li>
              </ul>
              <a href="#contact" className="mt-4 inline-flex items-center gap-2 rounded-xl px-4 py-2 bg-primary text-primary-foreground font-medium hover:bg-primary/90">
                Pilot with us <ChevronRight className="w-4 h-4" />
              </a>
            </div>
            <div className="bg-secondary border border-border rounded-2xl p-6">
              <div className="flex items-center gap-3"><Globe className="w-6 h-6" /><h3 className="font-semibold text-lg">Briefcase (Research Access)</h3></div>
              <p className="mt-2 text-muted-foreground text-sm">A bilingual interface that surfaces hard-to-find public legal files from dated systems, then explains them in simple language.</p>
              <ul className="mt-4 space-y-2 text-sm text-muted-foreground list-disc pl-5">
                <li>Chat-to-find and chat-to-explain</li>
                <li>Document previews and summaries</li>
                <li>Ethical access & privacy first</li>
              </ul>
              <a href="#contact" className="mt-4 inline-flex items-center gap-2 rounded-xl px-4 py-2 border border-border font-medium hover:bg-card">
                Request a demo <ChevronRight className="w-4 h-4" />
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* BOOKS */}
      <section id="books" className="py-16 bg-secondary border-t border-border">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-3 gap-8 items-start">
            <div className="lg:col-span-2">
              <h2 className="text-3xl font-bold">Books & guides</h2>
              <p className="mt-3 text-muted-foreground">From courtroom timelines to financial disclosure, we publish practical resources you can actually use.</p>
              <div className="mt-6 grid md:grid-cols-2 gap-6">
                <div className="bg-card border border-border rounded-2xl p-5">
                  <h3 className="font-semibold">How to Represent Yourself in Family Court (Hong Kong)</h3>
                  <p className="text-sm text-muted-foreground mt-2">Published by HKU Press. A step-by-step companion for SRLs in family proceedings.</p>
                  <a href="#contact" className="mt-3 inline-flex items-center gap-2 text-sm font-medium hover:underline">Publication updates <ChevronRight className="w-4 h-4" /></a>
                </div>
                <div className="bg-card border border-border rounded-2xl p-5">
                  <h3 className="font-semibold">Divorce Journal & Workbook (US)</h3>
                  <p className="text-sm text-muted-foreground mt-2">A guided workbook for capturing facts, clarifying finances, and planning next steps.</p>
                  <a href="#contact" className="mt-3 inline-flex items-center gap-2 text-sm font-medium hover:underline">Join the early list <ChevronRight className="w-4 h-4" /></a>
                </div>
              </div>
            </div>
            <aside className="bg-card border border-border rounded-2xl p-6">
              <h4 className="font-semibold mb-2">Media & talks</h4>
              <ul className="text-sm text-muted-foreground space-y-2">
                <li>30+ speaking engagements</li>
                <li>Founder of the 1,000+ member LinkedIn group "Just Law Education"</li>
                <li>Podcast & webinar appearances</li>
              </ul>
              <a href="#contact" className="mt-3 inline-flex items-center gap-2 text-sm font-medium hover:underline">
                Request Caroline for an event <ChevronRight className="w-4 h-4" />
              </a>
            </aside>
          </div>
        </div>
      </section>

      {/* COMMUNITY */}
      <section id="community" className="py-16 bg-card border-t border-border">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold">Join the community</h2>
          <p className="mt-3 text-muted-foreground max-w-2xl">
            Connect with others, ask questions, and share what you&apos;ve learned. Our Facebook group and newsletter offer practical discussions, templates, and updates.
          </p>
          <div className="mt-6 grid md:grid-cols-3 gap-6">
            <div className="bg-secondary border border-border rounded-2xl p-6">
              <div className="flex items-center gap-3"><Users className="w-6 h-6" /><h3 className="font-semibold">Facebook Group</h3></div>
              <p className="text-sm text-muted-foreground mt-2">"Just Law Education" — 1,000+ members. Weekly prompts, visuals, Q&A threads.</p>
              <a href="#contact" className="mt-3 inline-flex items-center gap-2 text-sm font-medium hover:underline">Get the invite <ChevronRight className="w-4 h-4" /></a>
            </div>
            <div className="bg-secondary border border-border rounded-2xl p-6">
              <div className="flex items-center gap-3"><MessageSquare className="w-6 h-6" /><h3 className="font-semibold">Newsletter</h3></div>
              <p className="text-sm text-muted-foreground mt-2">Plain-English legal tips, new tools, and early-access pilots.</p>
              <a href="#contact" className="mt-3 inline-flex items-center gap-2 text-sm font-medium hover:underline">Subscribe <ChevronRight className="w-4 h-4" /></a>
            </div>
            <div className="bg-secondary border border-border rounded-2xl p-6">
              <div className="flex items-center gap-3"><ShieldCheck className="w-6 h-6" /><h3 className="font-semibold">Testimonials</h3></div>
              <p className="text-sm text-muted-foreground mt-2">Serious international cases, often involving children. Private feedback available on request.</p>
              <a href="#contact" className="mt-3 inline-flex items-center gap-2 text-sm font-medium hover:underline">Share a story <ChevronRight className="w-4 h-4" /></a>
            </div>
          </div>
        </div>
      </section>

      {/* CONTACT */}
      <section id="contact" className="py-16 bg-secondary border-t border-border">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 grid lg:grid-cols-2 gap-10 items-start">
          <div>
            <h2 className="text-3xl font-bold">Contact</h2>
            <p className="mt-3 text-muted-foreground">For speaking, pilots, or general enquiries, drop us a note.</p>
            <div className="mt-6 space-y-3 text-muted-foreground">
              <div className="flex items-center gap-3"><Mail className="w-5 h-5" /> <span>justlaweducation@gmail.com</span></div>
              <div className="flex items-center gap-3"><Phone className="w-5 h-5" /> <span>+852 9295 9736</span></div>
            </div>
            <p className="mt-6 text-xs text-muted-foreground">
              Disclaimer: Content is general information, not legal advice. For case-specific advice, consult a qualified lawyer in your jurisdiction.
            </p>
          </div>

          <form onSubmit={onSubmit} className="bg-card border border-border rounded-2xl p-6 shadow-sm">
            <div className="grid gap-4">
              <label className="text-sm font-medium">Name
                <input
                  required
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  className="mt-1 w-full rounded-xl border border-input px-3 py-2 focus:outline-none focus:ring-2 focus:ring-ring"
                  placeholder="Your full name"
                />
              </label>
              <label className="text-sm font-medium">Email
                <input
                  type="email"
                  required
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  className="mt-1 w-full rounded-xl border border-input px-3 py-2 focus:outline-none focus:ring-2 focus:ring-ring"
                  placeholder="you@example.com"
                />
              </label>
              <label className="text-sm font-medium">Message
                <textarea
                  required
                  value={form.message}
                  onChange={(e) => setForm({ ...form, message: e.target.value })}
                  className="mt-1 w-full rounded-xl border border-input px-3 py-2 h-28 focus:outline-none focus:ring-2 focus:ring-ring"
                  placeholder="How can we help?"
                />
              </label>
              <button type="submit" className="rounded-xl px-4 py-2 bg-primary text-primary-foreground font-medium hover:bg-primary/90">
                Send
              </button>
              {sent && <p className="text-sm text-green-600 dark:text-green-400">Thanks — message captured locally for demo.</p>}
            </div>
          </form>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="border-t border-border bg-card">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10 text-sm text-muted-foreground">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
            <div>
              <div className="flex items-center gap-2 font-semibold"><Scale className="w-5 h-5" /> Just Law Education</div>
              <p className="mt-2 max-w-xl">Democratizing legal knowledge for self-represented people across common-law jurisdictions.</p>
            </div>
            <div className="grid grid-cols-2 gap-6">
              <div>
                <div className="font-semibold">Explore</div>
                <ul className="mt-2 space-y-1">
                  <li><a className="hover:underline" href="#mission">Mission</a></li>
                  <li><a className="hover:underline" href="#services">Services</a></li>
                  <li><a className="hover:underline" href="#tools">AI Tools</a></li>
                  <li><a className="hover:underline" href="#books">Books</a></li>
                </ul>
              </div>
              <div>
                <div className="font-semibold">Connect</div>
                <ul className="mt-2 space-y-1">
                  <li><a className="hover:underline" href="#community">Community</a></li>
                  <li><a className="hover:underline" href="#contact">Contact</a></li>
                  <li><a className="hover:underline" href="#contact">Newsletter</a></li>
                </ul>
              </div>
            </div>
          </div>
          <p className="mt-8">© {new Date().getFullYear()} Just Law Education. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
