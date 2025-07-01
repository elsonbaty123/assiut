"use client";

import React, { createContext, useState, ReactNode, useMemo, useEffect } from "react";
import { ar } from "@/locales/ar";
import { en } from "@/locales/en";

type Language = "ar" | "en";

interface LanguageContextType {
  language: Language;
  setLanguage: (language: Language) => void;
  t: (key: string, params?: Record<string, string | number>) => string;
}

export const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

const translations = { ar, en };

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguage] = useState<Language>("ar");

  useEffect(() => {
    // This effect runs once on the client after hydration.
    // It safely reads from localStorage and updates the DOM and state.
    const savedLanguage = localStorage.getItem("language") as Language;
    if (savedLanguage && ["ar", "en"].includes(savedLanguage)) {
      setLanguage(savedLanguage);
      document.documentElement.lang = savedLanguage;
      document.documentElement.dir = savedLanguage === 'ar' ? 'rtl' : 'ltr';
    } else {
      // If nothing is saved, ensure the default is applied to the DOM.
      document.documentElement.lang = 'ar';
      document.documentElement.dir = 'rtl';
    }
  }, []);

  const handleSetLanguage = (lang: Language) => {
    setLanguage(lang);
    localStorage.setItem("language", lang);
    document.documentElement.lang = lang;
    document.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr';
  };

  const t = useMemo(() => (key: string, params?: Record<string, string | number>) => {
    let translation = translations[language][key as keyof typeof translations[typeof language]] || key;
    if (params) {
        Object.keys(params).forEach(paramKey => {
            translation = translation.replace(`{${paramKey}}`, String(params[paramKey]));
        });
    }
    return translation;
  }, [language]);


  return (
    <LanguageContext.Provider value={{ language, setLanguage: handleSetLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
}
