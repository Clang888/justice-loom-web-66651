import { Globe } from "lucide-react";
import { useTranslation } from "react-i18next";
import heroImage from "@/assets/hero-teahouse.jpg";

const Index = () => {
  const { t } = useTranslation();

  return (
    <>
      {/* Hero Section */}
      <section className="relative overflow-hidden gradient-hero">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_hsl(35_80%_55%_/_0.1),_transparent_50%)]"></div>
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-24 grid lg:grid-cols-2 gap-12 items-center relative">
          <div className="animate-fade-in">
            <p className="inline-block rounded-full bg-gradient-accent text-primary-foreground text-sm font-semibold px-5 py-2 mb-6 shadow-warm">{t('hero.badge')}</p>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight font-serif">
              {t('hero.title')} <span className="text-gradient">{t('hero.titleHighlight')}</span>
            </h1>
            <p className="mt-4 text-xl sm:text-2xl text-muted-foreground font-medium">
              {t('hero.subtitle')}
            </p>
            <p className="mt-6 text-base text-muted-foreground max-w-xl leading-relaxed">
              {t('hero.description')}
            </p>
            <div className="mt-8 flex items-center gap-3 text-sm text-muted-foreground bg-card/60 backdrop-blur-sm rounded-xl px-4 py-3 border border-border/50 inline-flex">
              <Globe className="w-5 h-5 text-accent" /> 
              <span>{t('hero.jurisdictions')}</span>
            </div>
          </div>
          <div className="lg:justify-self-end animate-scale-in" style={{ animationDelay: '0.2s' }}>
            <img
              src={heroImage}
              alt="Just Law - AI Powered"
              className="w-full h-auto rounded-2xl border border-border/50 shadow-elevated object-cover"
            />
          </div>
        </div>
      </section>

      {/* About Us Section */}
      <section className="py-20 bg-card relative">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left,_hsl(200_45%_30%_/_0.05),_transparent_50%)]"></div>
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative">
          <h2 className="text-3xl sm:text-4xl font-bold mb-10 font-serif">{t('about.title')}</h2>

          <div className="grid md:grid-cols-2 gap-8">
            {/* Caroline Langley */}
            <div className="card-elevated rounded-2xl p-8 hover-lift">
              <div className="bg-primary rounded-xl p-4 mb-6">
                <img src="/caroline-langley.png" alt="Caroline Langley" className="w-full aspect-square object-cover rounded-lg shadow-lg" />
              </div>
              <h3 className="font-bold text-xl mb-1 font-serif">{t('about.caroline.name')}</h3>
              <p className="text-sm font-semibold text-accent mb-4">{t('about.caroline.role')}</p>
              <p className="text-sm text-muted-foreground leading-relaxed">
                {t('about.caroline.bio')}
              </p>
            </div>

            {/* Alexandre Santos de Salles */}
            <div className="card-elevated rounded-2xl p-8 hover-lift">
              <div className="bg-primary rounded-xl p-4 mb-6">
                <img src="/alex-santos.png" alt="Alexandre Santos de Salles" className="w-full aspect-square object-cover rounded-lg shadow-lg" />
              </div>
              <h3 className="font-bold text-xl mb-1 font-serif">{t('about.alex.name')}</h3>
              <p className="text-sm font-semibold text-accent mb-4">{t('about.alex.role')}</p>
              <p className="text-sm text-muted-foreground leading-relaxed">
                {t('about.alex.bio')}
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Index;
