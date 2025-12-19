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
            <p>"An exceptional legal mind with the ability to simplify complex matters. Caroline's counsel has been instrumental in navigating our regulatory challenges."</p>
            <footer className="mt-4 text-muted-foreground">— Sarah Thompson, General Counsel, Meridian Financial Group (London, UK)</footer>
          </blockquote>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
