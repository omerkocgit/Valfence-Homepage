/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { useLanguage, Language } from '../i18n/LanguageContext';
import { Globe } from 'lucide-react';

interface LanguageSwitcherProps {
  variant?: 'compact' | 'full';
  className?: string;
}

export const LanguageSwitcher: React.FC<LanguageSwitcherProps> = ({
  variant = 'compact',
  className = '',
}) => {
  const { language, setLanguage } = useLanguage();

  return (
    <div
      id="header-language-switcher"
      className={`inline-flex items-center p-0.5 rounded-lg bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-xs font-semibold ${className}`}
      role="group"
      aria-label="Language selection"
    >
      <button
        type="button"
        id="lang-btn-en"
        onClick={() => setLanguage('EN')}
        className={`px-2 py-1 rounded-md transition-all font-mono font-bold cursor-pointer ${
          language === 'EN'
            ? 'bg-white dark:bg-slate-800 text-blue-700 dark:text-sky-300 shadow-2xs border border-slate-200/80 dark:border-slate-700'
            : 'text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
        }`}
        aria-pressed={language === 'EN'}
        title="English"
      >
        EN
      </button>
      <span className="text-slate-300 dark:text-slate-700 select-none px-0.5">|</span>
      <button
        type="button"
        id="lang-btn-de"
        onClick={() => setLanguage('DE')}
        className={`px-2 py-1 rounded-md transition-all font-mono font-bold cursor-pointer ${
          language === 'DE'
            ? 'bg-white dark:bg-slate-800 text-blue-700 dark:text-sky-300 shadow-2xs border border-slate-200/80 dark:border-slate-700'
            : 'text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
        }`}
        aria-pressed={language === 'DE'}
        title="Deutsch"
      >
        DE
      </button>
    </div>
  );
};
