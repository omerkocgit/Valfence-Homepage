/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import {
  ArrowRight,
  ShieldCheck,
  FileCheck2,
  Cpu,
  Sparkles,
} from 'lucide-react';
import { motion } from 'motion/react';
import { useLanguage } from '../i18n/LanguageContext';
import { trackEvent } from '../services/clarity';

interface HeroProps {
  onExploreClick: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onExploreClick }) => {
  const { t } = useLanguage();

  return (
    <section
      id="hero-section"
      className="relative overflow-hidden bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-white pt-14 pb-16 lg:pt-20 lg:pb-24 border-b border-slate-200 dark:border-slate-800 transition-colors duration-200"
    >
      {/* Background Architectural Grid Lines & Ambient Flare */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Soft Radial Center Flare (Hardware-accelerated zero-blur gradient) */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[850px] h-[460px] rounded-full bg-radial from-blue-500/12 via-sky-400/6 to-transparent dark:from-blue-600/20 dark:via-sky-500/8 dark:to-transparent pointer-events-none" />

        {/* Elegant financial contour curves */}
        <svg
          className="absolute inset-0 w-full h-full opacity-[0.25] dark:opacity-[0.16]"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            <linearGradient id="heroLineGrad" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#2563eb" stopOpacity="0" />
              <stop offset="35%" stopColor="#3b82f6" stopOpacity="0.45" />
              <stop offset="70%" stopColor="#0ea5e9" stopOpacity="0.55" />
              <stop offset="100%" stopColor="#10b981" stopOpacity="0" />
            </linearGradient>
          </defs>
          <path d="M -100 120 C 300 80, 700 240, 1400 100" fill="none" stroke="url(#heroLineGrad)" strokeWidth="1.2" />
          <path d="M -50 220 C 350 170, 750 340, 1450 190" fill="none" stroke="url(#heroLineGrad)" strokeWidth="0.8" strokeDasharray="4 8" />
          <path d="M 0 340 C 450 290, 850 440, 1500 310" fill="none" stroke="url(#heroLineGrad)" strokeWidth="1" />
        </svg>

        {/* Top Accent Line */}
        <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-blue-500/40 dark:via-sky-400/40 to-transparent" />
      </div>

      <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        {/* Eyebrow badge */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-blue-700 dark:text-sky-400 text-xs font-semibold tracking-wide uppercase shadow-2xs mb-6"
        >
          <span className="w-2 h-2 rounded-full bg-blue-600 dark:bg-sky-400 animate-pulse" />
          <span>{t.hero.eyebrow}</span>
        </motion.div>

        {/* Primary Headline */}
        <motion.h1
          id="hero-headline"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-slate-900 dark:text-white leading-[1.14] mb-6 max-w-4xl mx-auto font-sans"
        >
          {t.hero.headlinePart1}
          <span className="text-blue-600 dark:text-sky-400 underline decoration-blue-300 dark:decoration-blue-700 decoration-2 underline-offset-4">
            {t.hero.headlineHighlight}
          </span>
        </motion.h1>

        {/* Subline */}
        <motion.p
          id="hero-subline"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-base sm:text-lg text-slate-600 dark:text-slate-300 max-w-3xl mx-auto font-normal leading-relaxed mb-8 text-balance"
        >
          {t.hero.subline}
        </motion.p>

        {/* Action Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-3.5 mb-4"
        >
          <a
            id="hero-primary-cta"
            href="mailto:info.valfence@gmail.com?subject=VALFENCE%20pilot%20enquiry"
            onClick={() => trackEvent('cta_click', { location: 'hero_primary' })}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 active:bg-blue-800 text-white font-semibold text-sm sm:text-base px-7 py-3.5 rounded-lg shadow-sm transition-all active:scale-[0.98]"
          >
            <span>{t.hero.primaryCta}</span>
            <ArrowRight className="w-4 h-4 text-blue-100" />
          </a>

          <button
            id="hero-secondary-cta"
            onClick={() => {
              trackEvent('cta_click', { location: 'hero_secondary' });
              onExploreClick();
            }}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-white dark:bg-slate-900 hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-800 dark:text-slate-100 font-semibold text-sm sm:text-base px-6 py-3.5 rounded-lg border border-slate-300 dark:border-slate-700 shadow-2xs transition-all active:scale-[0.98] cursor-pointer"
          >
            <Sparkles className="w-4 h-4 text-blue-600 dark:text-sky-400" />
            <span>{t.hero.secondaryCta}</span>
          </button>
        </motion.div>

        {/* Microcopy */}
        <p className="text-xs text-slate-500 dark:text-slate-400 mb-12 max-w-xl mx-auto">
          {t.hero.microcopy}
        </p>

        {/* Three Core Principles / Trust Pillars */}
        <motion.div
          id="hero-trust-pillars"
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.4 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-8 border-t border-slate-200 dark:border-slate-800 text-left"
        >
          <div className="flex items-start gap-3.5 p-4 sm:p-5 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-2xs hover:border-slate-300 dark:hover:border-slate-700 transition-colors">
            <div className="p-2.5 rounded-lg bg-blue-50 dark:bg-blue-950 text-blue-700 dark:text-sky-400 shrink-0 border border-blue-200 dark:border-blue-800">
              <FileCheck2 className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-sm font-semibold text-slate-900 dark:text-slate-100 mb-1">
                {t.hero.pillar1Title}
              </h2>
              <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                {t.hero.pillar1Desc}
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3.5 p-4 sm:p-5 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-2xs hover:border-slate-300 dark:hover:border-slate-700 transition-colors">
            <div className="p-2.5 rounded-lg bg-emerald-50 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-400 shrink-0 border border-emerald-200 dark:border-emerald-800">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-sm font-semibold text-slate-900 dark:text-slate-100 mb-1">
                {t.hero.pillar2Title}
              </h2>
              <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                {t.hero.pillar2Desc}
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3.5 p-4 sm:p-5 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-2xs hover:border-slate-300 dark:hover:border-slate-700 transition-colors">
            <div className="p-2.5 rounded-lg bg-purple-50 dark:bg-purple-950 text-purple-700 dark:text-purple-400 shrink-0 border border-purple-200 dark:border-purple-800">
              <Cpu className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-sm font-semibold text-slate-900 dark:text-slate-100 mb-1">
                {t.hero.pillar3Title}
              </h2>
              <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                {t.hero.pillar3Desc}
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
