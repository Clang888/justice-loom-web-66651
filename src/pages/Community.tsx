const Community = () => {
  return (
    <section className="py-16 bg-card">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-bold">Join the community</h2>
        <p className="mt-3 text-muted-foreground max-w-2xl">
          Connect with others, ask questions, and share what you&apos;ve learned. Our LinkedIn group offers practical discussions, templates, and updates.
        </p>
        <div className="mt-6">
          <div className="bg-secondary border border-border rounded-2xl p-6 max-w-md">
            <img src="/li-china-logo.png" alt="LinkedIn China - Just Law" className="w-full h-32 object-contain rounded-lg mb-4" />
            <h3 className="font-semibold">LinkedIn Group</h3>
            <p className="text-sm text-muted-foreground mt-2">Just Law. Join the conversation with over 1,500 members.</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Community;
