import React, { createContext, useContext, useState, useEffect } from 'react';
import { LanguageCode } from '../types/index.js';
import { translations, languages, TranslationDictionary } from '../i18n/translations.js';

interface LanguageContextType {
  lang: LanguageCode;
  setLang: (lang: LanguageCode) => void;
  t: TranslationDictionary;
  dir: 'ltr' | 'rtl';
  languages: typeof languages;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [lang, setLangState] = useState<LanguageCode>(() => {
    const saved = localStorage.getItem('findora_lang') as LanguageCode;
    if (saved && languages[saved]) return saved;
    // Detect browser language
    const navLang = navigator.language.toLowerCase();
    if (navLang.startsWith('ar')) return 'ar';
    if (navLang.startsWith('tr')) return 'tr';
    if (navLang.includes('ku') || navLang.includes('ckb')) return 'ckb';
    return 'en';
  });

  const setLang = (newLang: LanguageCode) => {
    if (languages[newLang]) {
      setLangState(newLang);
      localStorage.setItem('findora_lang', newLang);
    }
  };

  useEffect(() => {
    const dir = languages[lang].dir;
    document.documentElement.dir = dir;
    document.documentElement.lang = lang;
  }, [lang]);

  const value = {
    lang,
    setLang,
    t: translations[lang] || translations.en,
    dir: languages[lang].dir,
    languages,
  };

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
};

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}
