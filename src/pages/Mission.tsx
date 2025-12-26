import { useTranslation } from "react-i18next";

const Mission = () => {
  const { t } = useTranslation();

  return (
    <section className="py-16 bg-card">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-3 gap-8 items-start">
          <div className="lg:col-span-2">
            <h2 className="text-3xl font-bold">{t('mission.title')}</h2>
            <p className="mt-4 text-muted-foreground leading-relaxed">
              {t('mission.description')}
            </p>
          </div>
          <div className="bg-secondary border border-border rounded-2xl p-6">
            <h3 className="font-semibold mb-2">{t('mission.glanceTitle')}</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>{t('mission.glance1')}</li>
              <li>{t('mission.glance2')}</li>
              <li>{t('mission.glance3')}</li>
              <li>{t('mission.glance4')}</li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Mission;
