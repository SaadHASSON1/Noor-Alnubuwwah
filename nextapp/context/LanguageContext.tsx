'use client';
import React, { createContext, useContext, useState, useEffect } from 'react';

export type Lang = 'ar' | 'en';

interface LangContextValue {
  lang: Lang;
  setLang: (l: Lang) => void;
  isEn: boolean;
}

const LangContext = createContext<LangContextValue>({
  lang: 'ar',
  setLang: () => {},
  isEn: false,
});

export const LanguageProvider = ({ children }: { children: React.ReactNode }) => {
  const [lang, setLangState] = useState<Lang>('ar');

  const setLang = (l: Lang) => {
    setLangState(l);
    if (typeof window !== 'undefined') {
      localStorage.setItem('noor-lang', l);
      document.documentElement.dir  = l === 'en' ? 'ltr' : 'rtl';
      document.documentElement.lang = l;
    }
  };

  useEffect(() => {
    const saved = localStorage.getItem('noor-lang') as Lang | null;
    if (saved === 'en') setLang('en');
  }, []);

  return (
    <LangContext.Provider value={{ lang, setLang, isEn: lang === 'en' }}>
      {children}
    </LangContext.Provider>
  );
};

export const useLanguage = () => useContext(LangContext);
