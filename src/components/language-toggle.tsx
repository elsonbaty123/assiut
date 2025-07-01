"use client";

import { Button } from "@/components/ui/button";
import { useTranslation } from "@/hooks/use-translation";

export function LanguageToggle() {
  const { language, setLanguage, t } = useTranslation();

  const toggleLanguage = () => {
    const newLang = language === "ar" ? "en" : "ar";
    setLanguage(newLang);
  };

  return (
    <Button variant="ghost" size="icon" onClick={toggleLanguage} aria-label={t('toggleLanguage')}>
      <span className="text-sm font-bold">{language === 'ar' ? 'EN' : 'AR'}</span>
    </Button>
  );
}
