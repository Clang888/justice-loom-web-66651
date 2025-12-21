const About = () => {
  return <section className="py-16 bg-card">
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
    </section>;
};
export default About;