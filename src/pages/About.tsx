const About = () => {
  return (
    <section className="py-16 bg-card">
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
  );
};

export default About;
