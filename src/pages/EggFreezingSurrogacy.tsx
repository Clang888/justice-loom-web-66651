import { useState } from "react";
import { Baby, Snowflake } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { useTranslation } from "react-i18next";
import planningCalendarImage from "@/assets/fertility-planning-calendar.jpg";

const EggFreezingSurrogacy = () => {
  const { t } = useTranslation();
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
        <h1 className="text-3xl font-bold">{t('eggFreezingSurrogacy.title')}</h1>

        {/* Resources Section - Two Column Layout */}
        <div className="mt-12 grid md:grid-cols-2 gap-8 items-start">
          {/* Surrogacy Resources */}
          <div className="text-center">
            <h2 className="text-2xl font-semibold mb-6">{t('eggFreezingSurrogacy.surrogacyResources')}</h2>
            <div className="grid gap-6">
              <Link to="/surrogacy-states" className="block bg-card border-2 border-green-500 rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow min-h-[180px] flex flex-col justify-center">
                <span className="block bg-green-600 text-white text-xs font-semibold px-2 py-1 rounded mb-2 w-fit mx-auto">{t('eggFreezingSurrogacy.free')}</span>
                <h3 className="font-semibold text-lg mb-2">{t('eggFreezingSurrogacy.usaSurrogacyStates')}</h3>
                <p className="text-sm text-muted-foreground">
                  {t('eggFreezingSurrogacy.usaSurrogacyDesc')}
                </p>
              </Link>

              <Link to="/surrogacy-tracker" className="block bg-card border-2 border-green-500 rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow min-h-[180px] flex flex-col justify-center">
                <span className="block bg-green-600 text-white text-xs font-semibold px-2 py-1 rounded mb-2 w-fit mx-auto">{t('eggFreezingSurrogacy.free')}</span>
                <h3 className="text-lg font-semibold mb-2">{t('eggFreezingSurrogacy.surrogacyTracker')}</h3>
                <p className="text-sm text-muted-foreground">
                  {t('eggFreezingSurrogacy.surrogacyTrackerDesc')}
                </p>
              </Link>

              {/* Surrogacy Considerations Card */}
              <div className="bg-card border border-border rounded-2xl p-6 shadow-sm min-h-[180px] flex flex-col justify-center">
                <div className="flex items-center justify-center gap-3 mb-4">
                  <Baby className="w-6 h-6 text-primary" />
                  <h3 className="font-semibold text-xl">{t('eggFreezingSurrogacy.surrogacyConsiderations')}</h3>
                </div>
                <ul className="space-y-2 text-sm text-muted-foreground text-left mx-auto w-fit">
                  <li>→ {t('eggFreezingSurrogacy.ukSurrogacyLaw')}</li>
                  <li>→ {t('eggFreezingSurrogacy.internationalSurrogacy')}</li>
                  <li>→ {t('eggFreezingSurrogacy.surrogateAgreements')}</li>
                  <li>→ {t('eggFreezingSurrogacy.birthRegistration')}</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Egg Freezing Resources */}
          <div className="text-center">
            <h2 className="text-2xl font-semibold mb-6">{t('eggFreezingSurrogacy.eggFreezingResources')}</h2>
            <div className="grid gap-6">
              <div className="bg-card border-2 border-blue-300 rounded-2xl p-6 shadow-sm flex flex-col">
                <h3 className="font-semibold text-lg mb-3 text-center">{t('eggFreezingSurrogacy.eggOptimisationGuide')}</h3>
                
                {/* Teaser matching guide design */}
                <div className="rounded-xl overflow-hidden border-4 border-[#8fa89a] mb-4">
                  <div className="flex">
                    {/* Calendar image */}
                    <div className="w-2/5">
                      <img 
                        src={planningCalendarImage} 
                        alt="Planning calendar" 
                        className="w-full h-full object-cover"
                      />
                    </div>
                    {/* Timeline text on yellow background */}
                    <div className="w-3/5 bg-[#f5d547] p-4 flex flex-col justify-center" style={{ fontFamily: "'Comic Sans MS', cursive, sans-serif" }}>
                      <div className="space-y-3">
                        <div>
                          <p className="text-sm font-bold text-black">{t('eggFreezingSurrogacy.month1_2')}</p>
                          <p className="text-sm text-black">{t('eggFreezingSurrogacy.month1_2Desc')}</p>
                        </div>
                        <div>
                          <p className="text-sm font-bold text-black">{t('eggFreezingSurrogacy.month3')}</p>
                          <p className="text-sm text-black">{t('eggFreezingSurrogacy.month3Desc')}</p>
                        </div>
                        <div>
                          <p className="text-sm font-bold text-black">{t('eggFreezingSurrogacy.month4')}</p>
                          <p className="text-sm text-black">{t('eggFreezingSurrogacy.month4Desc')}</p>
                        </div>
                        <div>
                          <p className="text-sm font-bold text-black">{t('eggFreezingSurrogacy.postRetrieval')}</p>
                          <p className="text-sm text-black">{t('eggFreezingSurrogacy.postRetrievalDesc')}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                
                <p className="text-xs text-muted-foreground mb-3 text-center">
                  {t('eggFreezingSurrogacy.guideIncludes')}
                </p>
                
                <Button 
                  size="lg"
                  onClick={handlePurchase}
                  disabled={isLoading}
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white uppercase font-semibold"
                >
                  {isLoading ? t('eggFreezingSurrogacy.loading') : t('eggFreezingSurrogacy.purchaseGuide')}
                </Button>
              </div>

              <Link to="/egg-freezing-clinics-hk" className="block bg-card border-2 border-green-500 rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow min-h-[180px] flex flex-col justify-center">
                <span className="block bg-green-600 text-white text-xs font-semibold px-2 py-1 rounded mb-2 w-fit mx-auto">{t('eggFreezingSurrogacy.free')}</span>
                <h3 className="font-semibold text-lg mb-2">{t('eggFreezingSurrogacy.eggFreezingClinicsHK')}</h3>
                <p className="text-sm text-muted-foreground">
                  {t('eggFreezingSurrogacy.eggFreezingClinicsDesc')}
                </p>
              </Link>

              {/* Egg Freezing Info Card */}
              <div className="bg-card border border-border rounded-2xl p-6 shadow-sm min-h-[180px] flex flex-col justify-center">
                <div className="flex items-center justify-center gap-3 mb-4">
                  <Snowflake className="w-6 h-6 text-primary" />
                  <h3 className="font-semibold text-xl">{t('eggFreezingSurrogacy.eggFreezingConsiderations')}</h3>
                </div>
                <ul className="space-y-2 text-sm text-muted-foreground text-left mx-auto w-fit">
                  <li>→ {t('eggFreezingSurrogacy.consentStorage')}</li>
                  <li>→ {t('eggFreezingSurrogacy.storageDuration')}</li>
                  <li>→ {t('eggFreezingSurrogacy.partnerConsent')}</li>
                  <li>→ {t('eggFreezingSurrogacy.crossBorderStorage')}</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
        <div className="mt-12 bg-card border border-border rounded-2xl p-8 text-center">
          <h2 className="text-2xl font-semibold mb-3">{t('eggFreezingSurrogacy.needGuidance')}</h2>
          <p className="text-muted-foreground mb-6 max-w-xl mx-auto">
            {t('eggFreezingSurrogacy.needGuidanceDesc')}
          </p>
          <Link to="/contact">
            <Button size="lg">{t('eggFreezingSurrogacy.bookConsultation')}</Button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default EggFreezingSurrogacy;
