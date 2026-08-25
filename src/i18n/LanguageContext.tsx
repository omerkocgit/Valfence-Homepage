/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { createContext, useContext, useState, useEffect } from 'react';
import { translations, TranslationDictionary } from './translations';
import { trackEvent } from '../services/clarity';

export type Language = 'EN' | 'DE';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: TranslationDictionary;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguageState] = useState<Language>(() => {
    try {
      const saved = localStorage.getItem('valfence_lang');
      if (saved === 'EN' || saved === 'DE') {
        return saved;
      }
    } catch {
      // ignore
    }
    return 'EN';
  });

  useEffect(() => {
    try {
      localStorage.setItem('valfence_lang', language);
    } catch {
      // ignore
    }
    document.documentElement.lang = language.toLowerCase();
  }, [language]);

  const setLanguage = (lang: Language) => {
    if (lang === language) return;
    setLanguageState(lang);
    trackEvent('language_change', { language: lang });
  };

  const value: LanguageContextType = {
    language,
    setLanguage,
    t: translations[language],
  };

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = (): LanguageContextType => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
