const Testimonials = () => {
  return (
    <section className="py-16 bg-card">
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
          <blockquote className="bg-secondary border border-border rounded-2xl p-6 text-sm">
            <p>"Caroline's strategic insight and meticulous attention to detail transformed our approach to cross-border transactions. Her guidance was invaluable."</p>
            <footer className="mt-4 text-muted-foreground">— Michael Chen, CEO, Pacific Rim Ventures (Singapore)</footer>
          </blockquote>
          <blockquote className="bg-secondary border border-border rounded-2xl p-6 text-sm">
            <p>"Caroline Langley became a quiet anchor in my fight to bring my children home. She showed up, listening first, offering thoughtful, practical guidance, and steadying me when the ground felt like quicksand. There's no ego with Caroline; she is humble, grounded, and unmistakably child centred. What also sets her apart is her clear grasp of how responsible media can protect children and influence outcomes. Caroline helped me balance public advocacy with legal strategy, never chasing headlines, always safeguarding the case and keeping the focus where it belongs. She doesn't just point to a path forward; she helps you find your footing on it. For any parent living the nightmare of parental abduction, Caroline's integrity, calm, and quiet expertise make an extraordinary difference."</p>
            <footer className="mt-4 text-muted-foreground">— Mandy Kelly, Mother & Advocate (Dublin)</footer>
          </blockquote>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
