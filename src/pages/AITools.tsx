import { Link } from "react-router-dom";
import { Briefcase, MessageSquare, Zap, BookOpen } from "lucide-react";
import { Button } from "@/components/ui/button";

const AITools = () => {
  return (
    <section className="min-h-screen bg-gradient-to-b from-background to-secondary py-12">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <h1 className="text-4xl sm:text-5xl font-extrabold mb-4">
            AI Legal Tools
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Choose your AI assistant based on your needs
          </p>
        </div>

        {/* Product Cards */}
        <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {/* Briefcase Card */}
          <div className="bg-card border border-border rounded-2xl p-8 shadow-lg hover:shadow-xl transition-shadow">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-3 bg-primary/10 rounded-xl">
                <Briefcase className="w-8 h-8 text-primary" />
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-2">
                  <h2 className="text-2xl font-bold">Briefcase</h2>
                  <span className="px-2 py-0.5 bg-primary/10 text-primary text-xs font-semibold rounded-full">BETA</span>
                </div>
                <p className="text-sm text-muted-foreground">Quick Legal Form Discovery (HK Only)</p>
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
              <h3 className="font-semibold mb-3 flex items-center gap-2 text-sm">
                <BookOpen className="w-4 h-4" />
                Use Cases:
              </h3>
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
              <div className="flex-1">
                <div className="flex items-center gap-2">
                  <h2 className="text-2xl font-bold">My Legal Assistant</h2>
                  <span className="px-2 py-0.5 bg-primary/10 text-primary text-xs font-semibold rounded-full">BETA</span>
                </div>
                <p className="text-sm text-muted-foreground">In-Depth Legal Consultation (HK Only)</p>
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
              <h3 className="font-semibold mb-3 flex items-center gap-2 text-sm">
                <BookOpen className="w-4 h-4" />
                Use Cases:
              </h3>
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
  );
};

export default AITools;
