import { useTranslation } from 'react-i18next';
import { Globe } from 'lucide-react';
import { Button } from '@/components/ui/button';

const LanguageSwitcher = () => {
  const { i18n } = useTranslation();

  const toggleLanguage = () => {
    const newLang = i18n.language === 'zh-HK' ? 'en' : 'zh-HK';
    i18n.changeLanguage(newLang);
  };

  const currentLangLabel = i18n.language === 'zh-HK' ? 'EN' : '中文';

  return (
    <Button
      variant="ghost"
      size="sm"
      onClick={toggleLanguage}
      className="flex items-center gap-1.5 text-sm font-medium hover:bg-accent/10"
      aria-label="Switch language"
    >
      <Globe className="w-4 h-4" />
      <span>{currentLangLabel}</span>
    </Button>
  );
};

export default LanguageSwitcher;
