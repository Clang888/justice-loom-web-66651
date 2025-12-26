const Contact = () => {
  return (
    <section className="py-16 bg-secondary">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-bold">Get in touch</h2>
        <p className="mt-3 text-muted-foreground max-w-2xl">
          Contact us for consultations, speaking engagement requests or general questions.
        </p>

        <div className="mt-8 grid md:grid-cols-2 gap-6 max-w-lg">
          <div className="bg-card border border-border rounded-2xl p-6">
            <h3 className="font-semibold mb-2">Email</h3>
            <p className="text-sm text-muted-foreground">justlaweducation@gmail.com</p>
          </div>
          <div className="bg-card border border-border rounded-2xl p-6">
            <h3 className="font-semibold mb-2">Phone</h3>
            <p className="text-sm text-muted-foreground">+853 92959750</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
