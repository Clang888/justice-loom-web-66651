const Mission = () => {
  return (
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
  );
};

export default Mission;
