import { useState } from "react";
import { Baby, Snowflake } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

const EggFreezingSurrogacy = () => {
  const [isLoading, setIsLoading] = useState(false);

  const handlePurchase = async () => {
    setIsLoading(true);
    try {
      const { data, error } = await supabase.functions.invoke('create-guide-payment', {
        body: {}
      });

      if (error) throw error;

      if (data?.url) {
        window.open(data.url, '_blank');
      }
    } catch (error) {
      console.error('Payment error:', error);
      toast.error('Unable to start checkout. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section className="py-16 bg-secondary">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold">Egg Freezing & Surrogacy</h1>


        {/* Resources Section - Two Column Layout */}
        <div className="mt-12 grid md:grid-cols-2 gap-8 items-start">
          {/* Surrogacy Resources */}
          <div className="text-center">
            <h2 className="text-2xl font-semibold mb-6">Surrogacy Resources</h2>
            <div className="grid gap-6">
              <Link to="/surrogacy-states" className="block bg-card border-2 border-green-500 rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow min-h-[180px] flex flex-col justify-center">
                <span className="block bg-green-600 text-white text-xs font-semibold px-2 py-1 rounded mb-2 w-fit mx-auto">FREE</span>
                <h3 className="font-semibold text-lg mb-2">USA Surrogacy Friendly States</h3>
                <p className="text-sm text-muted-foreground">
                  Browse the list of US states with supportive surrogacy laws.
                </p>
              </Link>

              <Link to="/surrogacy-tracker" className="block bg-card border-2 border-green-500 rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow min-h-[180px] flex flex-col justify-center">
                <span className="block bg-green-600 text-white text-xs font-semibold px-2 py-1 rounded mb-2 w-fit mx-auto">FREE</span>
                <h3 className="text-lg font-semibold mb-2">Surrogacy Journey Tracker</h3>
                <p className="text-sm text-muted-foreground">
                  Track your path from initial research to bringing baby home with our step-by-step guide.
                </p>
              </Link>

              {/* Surrogacy Considerations Card */}
              <div className="bg-card border border-border rounded-2xl p-6 shadow-sm min-h-[180px] flex flex-col justify-center">
                <div className="flex items-center justify-center gap-3 mb-4">
                  <Baby className="w-6 h-6 text-primary" />
                  <h3 className="font-semibold text-xl">Surrogacy Considerations</h3>
                </div>
                <ul className="space-y-2 text-sm text-muted-foreground text-left">
                  <li>UK surrogacy law and parental orders</li>
                  <li>International surrogacy considerations</li>
                  <li>Surrogate and intended parent agreements</li>
                  <li>Birth registration and citizenship</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Egg Freezing Resources */}
          <div className="text-center">
            <h2 className="text-2xl font-semibold mb-6">Egg Freezing Resources</h2>
            <div className="grid gap-6">
              <div className="bg-card border-2 border-blue-300 rounded-2xl p-6 shadow-sm flex flex-col">
                <h3 className="font-semibold text-lg mb-3 text-center">Egg Optimisation Planning Guide</h3>
                
                {/* Compact Teaser */}
                <div className="bg-secondary/50 rounded-lg p-4 mb-4 text-left">
                  <p className="text-xs text-muted-foreground mb-2">Preview: Step-by-Step Timeline</p>
                  <div className="border-l-2 border-blue-500 pl-3 mb-2">
                    <p className="text-sm font-medium">Month 1-2: Research & Initial Consultation</p>
                    <p className="text-xs text-muted-foreground">Research clinics, schedule consultations, complete fertility tests</p>
                  </div>
                  <div className="border-l-2 border-green-500 pl-3">
                    <p className="text-sm font-medium">Month 3: Preparation Phase</p>
                    <p className="text-xs text-muted-foreground">Lifestyle optimization, pre-procedure tests, finalize clinic</p>
                  </div>
                </div>
                
                <p className="text-xs text-muted-foreground mb-3 text-center">
                  Full guide includes clinic comparisons, TCM foods, legal considerations & more
                </p>
                
                <Button 
                  size="lg"
                  onClick={handlePurchase}
                  disabled={isLoading}
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white uppercase font-semibold"
                >
                  {isLoading ? "Loading..." : "PURCHASE GUIDE HK$199"}
                </Button>
              </div>

              <Link to="/egg-freezing-clinics-hk" className="block bg-card border-2 border-green-500 rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow min-h-[180px] flex flex-col justify-center">
                <span className="block bg-green-600 text-white text-xs font-semibold px-2 py-1 rounded mb-2 w-fit mx-auto">FREE</span>
                <h3 className="font-semibold text-lg mb-2">Egg Freezing Clinics in Hong Kong</h3>
                <p className="text-sm text-muted-foreground">
                  Find reputable fertility clinics offering egg freezing services in Hong Kong.
                </p>
              </Link>

              {/* Egg Freezing Info Card */}
              <div className="bg-card border border-border rounded-2xl p-6 shadow-sm min-h-[180px] flex flex-col justify-center">
                <div className="flex items-center justify-center gap-3 mb-4">
                  <Snowflake className="w-6 h-6 text-primary" />
                  <h3 className="font-semibold text-xl">Egg Freezing Considerations</h3>
                </div>
                <ul className="space-y-2 text-sm text-muted-foreground text-left">
                  <li>Consent and storage agreements</li>
                  <li>Storage duration and renewal rights</li>
                  <li>Partner consent considerations</li>
                  <li>Cross-border storage regulations</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
        <div className="mt-12 bg-card border border-border rounded-2xl p-8 text-center">
          <h2 className="text-2xl font-semibold mb-3">Need Guidance?</h2>
          <p className="text-muted-foreground mb-6 max-w-xl mx-auto">
            Receive personalised expert guidance on international surrogacy<br />before you take the first step.
          </p>
          <Link to="/contact">
            <Button size="lg">Book a Consultation</Button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default EggFreezingSurrogacy;
