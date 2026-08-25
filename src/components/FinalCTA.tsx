/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { Mail, ArrowRight, ShieldCheck, CheckCircle } from 'lucide-react';
import { useLanguage } from '../i18n/LanguageContext';
import { trackEvent } from '../services/clarity';

export const FinalCTA: React.FC = () => {
  const { t } = useLanguage();

  return (
    <section
      id="final-cta-section"
      className="py-14 lg:py-20 bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-white border-b border-slate-200 dark:border-slate-800 transition-colors duration-200"
    >
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="rounded-3xl bg-gradient-to-br from-blue-50/90 via-sky-50/40 to-white dark:from-slate-900 dark:via-slate-900/90 dark:to-slate-950 p-8 sm:p-12 text-slate-900 dark:text-white border border-blue-200/90 dark:border-slate-800 shadow-xl text-center relative overflow-hidden transition-colors duration-200">
          {/* Background subtle glow */}
          <div className="absolute -top-24 -right-24 w-72 h-72 bg-blue-500/10 dark:bg-blue-500/20 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute -bottom-24 -left-24 w-72 h-72 bg-indigo-500/10 dark:bg-indigo-500/20 rounded-full blur-3xl pointer-events-none" />

          <div className="relative z-10 max-w-3xl mx-auto">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-blue-100 dark:bg-blue-950/90 border border-blue-200 dark:border-sky-800 text-blue-700 dark:text-sky-400 text-xs font-bold tracking-wide uppercase mb-5">
              <ShieldCheck className="w-4 h-4" />
              <span>{t.finalCta.eyebrow}</span>
            </div>

            <h2 className="text-2xl sm:text-4xl font-extrabold tracking-tight text-slate-900 dark:text-white mb-4 leading-tight">
              {t.finalCta.headline}
            </h2>

            <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300 max-w-2xl mx-auto mb-8 leading-relaxed">
              {t.finalCta.subline}
            </p>

            {/* Primary CTA button */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3 mb-4">
              <a
                id="final-cta-email"
                href="mailto:info.valfence@gmail.com?subject=VALFENCE%20pilot%20enquiry"
                onClick={() => trackEvent('cta_click', { location: 'final_cta_button' })}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 active:bg-blue-800 text-white font-bold text-sm px-8 py-3.5 rounded-lg shadow-sm transition-all active:scale-[0.98]"
              >
                <Mail className="w-4 h-4 text-blue-100" />
                <span>{t.finalCta.primaryBtn}</span>
                <ArrowRight className="w-4 h-4 text-blue-100" />
              </a>
            </div>

            {/* Microcopy */}
            <p className="text-xs text-slate-500 dark:text-slate-400 mb-6">
              {t.finalCta.directContact}: <a href="mailto:info.valfence@gmail.com" className="text-blue-600 dark:text-sky-400 hover:underline font-mono">info.valfence@gmail.com</a> · {t.finalCta.zeroCommitment}
            </p>

            {/* Assurance Badges */}
            <div className="flex flex-wrap items-center justify-center gap-4 text-xs text-slate-600 dark:text-slate-400 pt-5 border-t border-slate-200 dark:border-slate-800">
              <div className="flex items-center gap-1.5">
                <CheckCircle className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
                <span>{t.finalCta.badge1}</span>
              </div>
              <div className="flex items-center gap-1.5">
                <CheckCircle className="w-3.5 h-3.5 text-emerald-400" />
                <span>{t.finalCta.badge2}</span>
              </div>
              <div className="flex items-center gap-1.5">
                <CheckCircle className="w-3.5 h-3.5 text-emerald-400" />
                <span>{t.finalCta.badge3}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
