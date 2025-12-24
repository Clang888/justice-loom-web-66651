import { Link, useSearchParams } from "react-router-dom";
import { ArrowLeft, Download, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import FertilityGuideTeaser from "@/components/FertilityGuideTeaser";
import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

const FertilityGuide = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [searchParams] = useSearchParams();
  const paymentSuccess = searchParams.get('payment') === 'success';

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
    <section className="py-16 bg-background">
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        <Link 
          to="/egg-freezing-surrogacy" 
          className="text-sm text-muted-foreground hover:underline mb-6 inline-flex items-center gap-2"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Egg Freezing & Surrogacy
        </Link>

        {/* Payment Success Banner */}
        {paymentSuccess && (
          <div className="bg-green-50 border border-green-200 rounded-2xl p-6 mb-8">
            <div className="flex flex-col md:flex-row items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <CheckCircle className="w-8 h-8 text-green-600" />
                <div>
                  <h2 className="text-xl font-bold text-green-800">Thank You for Your Purchase!</h2>
                  <p className="text-green-700">
                    Your guide is ready to download.
                  </p>
                </div>
              </div>
              <a 
                href="/guides/egg-optimisation-guide.pdf" 
                download="Egg-Optimisation-Planning-Guide.pdf"
                className="inline-flex"
              >
                <Button 
                  size="lg"
                  className="gap-2 bg-green-600 hover:bg-green-700 text-white"
                >
                  <Download className="w-4 h-4" />
                  Download Your PDF Guide
                </Button>
              </a>
            </div>
          </div>
        )}

        {/* Premium Banner */}
        <div className="bg-gradient-to-r from-primary/10 via-primary/5 to-primary/10 border border-primary/20 rounded-2xl p-6 mb-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div>
              <h1 className="text-2xl font-bold mb-1">Egg Optimisation Planning Guide</h1>
              <p className="text-muted-foreground">
                Your Complete Roadmap for Egg Freezing Success
              </p>
            </div>
            {!paymentSuccess && (
              <Button 
                onClick={handlePurchase}
                disabled={isLoading}
                size="lg"
                className="gap-2 whitespace-nowrap bg-blue-600 hover:bg-blue-700 text-white uppercase font-semibold"
              >
                {isLoading ? "Loading..." : "PURCHASE GUIDE HK$199"}
              </Button>
            )}
          </div>
        </div>

        {/* Guide Content - Teaser or Full based on payment */}
        <div className="bg-card border border-border rounded-2xl p-8 shadow-sm">
          <FertilityGuideTeaser />
        </div>

        {/* Bottom CTA */}
        <div className="mt-8 text-center">
          {paymentSuccess ? (
            <div>
              <a 
                href="/guides/egg-optimisation-guide.pdf" 
                download="Egg-Optimisation-Planning-Guide.pdf"
                className="inline-flex"
              >
                <Button 
                  size="lg"
                  className="gap-2 bg-green-600 hover:bg-green-700 text-white"
                >
                  <Download className="w-4 h-4" />
                  Download Your PDF Guide
                </Button>
              </a>
              <p className="text-xs text-muted-foreground mt-3">
                Thank you for your purchase · Lifetime access
              </p>
            </div>
          ) : (
            <div>
              <Button 
                onClick={handlePurchase}
                disabled={isLoading}
                size="lg"
                className="gap-2 bg-blue-600 hover:bg-blue-700 text-white uppercase font-semibold"
              >
                {isLoading ? "Loading..." : "PURCHASE GUIDE HK$199"}
              </Button>
              <p className="text-xs text-muted-foreground mt-3">
                One-time purchase · Instant PDF download · Lifetime access
              </p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default FertilityGuide;
