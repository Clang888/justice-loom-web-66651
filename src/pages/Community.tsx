import { Mail, ChevronRight } from "lucide-react";
import { Link } from "react-router-dom";

const Community = () => {
  return (
    <section className="py-16 bg-card">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-bold">Join the community</h2>
        <p className="mt-3 text-muted-foreground max-w-2xl">
          Connect with others, ask questions, and share what you&apos;ve learned. Our LinkedIn group and newsletter offer practical discussions, templates, and updates.
        </p>
        <div className="mt-6 grid md:grid-cols-2 gap-6">
          <div className="bg-secondary border border-border rounded-2xl p-6">
            <img src="/linkedin-group.png" alt="Just Law LinkedIn Group" className="w-full h-32 object-cover rounded-lg mb-4" />
            <h3 className="font-semibold">LinkedIn Group</h3>
            <p className="text-sm text-muted-foreground mt-2">Just Law: Innovating Law with AI. Join the conversation with over 1,500 members.</p>
            <Link to="/contact" className="mt-3 inline-flex items-center gap-2 text-sm font-medium hover:underline">Get the invite <ChevronRight className="w-4 h-4" /></Link>
          </div>
          <div className="bg-secondary border border-border rounded-2xl p-6">
            <div className="flex items-center gap-3 mb-4"><Mail className="w-6 h-6" /><h3 className="font-semibold">Newsletter</h3></div>
            <p className="text-sm text-muted-foreground mt-2">Bi-monthly digest: new guides, upcoming reforms, short tips you can use.</p>
            <Link to="/contact" className="mt-3 inline-flex items-center gap-2 text-sm font-medium hover:underline">Sign up <ChevronRight className="w-4 h-4" /></Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Community;
