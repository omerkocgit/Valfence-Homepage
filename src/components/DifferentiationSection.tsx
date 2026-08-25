/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { Check, X } from 'lucide-react';
import { useLanguage } from '../i18n/LanguageContext';
import { BrandLogo } from './BrandLogo';

export const DifferentiationSection: React.FC = () => {
  const { t, language } = useLanguage();
  const isDe = language === 'DE';

  const comparisons = t.differentiation.rows;

  return (
    <section
      id="differentiation-section"
      className="py-16 lg:py-24 bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 border-b border-slate-200 dark:border-slate-800 transition-colors duration-200"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-3xl mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 dark:bg-blue-950 border border-blue-200 dark:border-blue-800 text-blue-700 dark:text-sky-400 text-xs font-bold uppercase tracking-wider mb-3">
            <span>{t.differentiation.eyebrow}</span>
          </div>
          <h2 className="text-2xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 dark:text-white tracking-tight leading-tight mb-4">
            {t.differentiation.headlineMain}{' '}
            <span className="text-blue-700 dark:text-sky-400">
              {t.differentiation.headlineHighlight}
            </span>
          </h2>
          <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300 leading-relaxed">
            {t.differentiation.subline}
          </p>
        </div>

        {/* Comparison Matrix Table */}
        <div className="overflow-x-auto rounded-2xl border border-slate-200 dark:border-slate-800 shadow-md bg-white dark:bg-slate-900">
          <table className="w-full text-left text-xs sm:text-sm border-collapse min-w-[680px]">
            <thead>
              <tr className="border-b border-slate-200 dark:border-slate-800 bg-slate-100/90 dark:bg-slate-950">
                <th className="py-3.5 px-4 text-slate-700 dark:text-slate-300 font-bold uppercase tracking-wider text-xs w-1/4">
                  {t.differentiation.colDimension}
                </th>
                <th className="py-3.5 px-3 text-slate-500 dark:text-slate-400 font-semibold text-xs w-1/5">
                  {t.differentiation.colGenericAi}
                </th>
                <th className="py-3.5 px-3 text-slate-500 dark:text-slate-400 font-semibold text-xs w-1/5">
                  {t.differentiation.colManualExcel}
                </th>
                <th className="py-3.5 px-3 text-slate-500 dark:text-slate-400 font-semibold text-xs w-1/5">
                  {t.differentiation.colBroadSaas}
                </th>
                <th className="py-3.5 px-4 bg-blue-50 dark:bg-blue-950/80 border-l border-r border-blue-200 dark:border-blue-800 text-blue-700 dark:text-sky-300 font-bold text-xs sm:text-sm w-1/4">
                  <div className="flex items-center gap-1.5">
                    <BrandLogo variant="mark-only" size="sm" />
                    <span>{t.differentiation.colValfence}</span>
                  </div>
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200 dark:divide-slate-800">
              {comparisons.map((row, idx) => (
                <tr
                  key={idx}
                  className="hover:bg-slate-50/70 dark:hover:bg-slate-800/60 transition-colors"
                >
                  <td className="py-3.5 px-4 font-bold text-slate-800 dark:text-slate-200">
                    {row.feature}
                  </td>
                  <td className="py-3.5 px-3 text-slate-600 dark:text-slate-400">
                    <div className="flex items-center gap-1.5">
                      <X className="w-3.5 h-3.5 text-rose-500 shrink-0" />
                      <span className="text-xs">{row.genericAI}</span>
                    </div>
                  </td>
                  <td className="py-3.5 px-3 text-slate-600 dark:text-slate-400">
                    <div className="flex items-center gap-1.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-slate-400 shrink-0" />
                      <span className="text-xs">{row.manualExcel}</span>
                    </div>
                  </td>
                  <td className="py-3.5 px-3 text-slate-600 dark:text-slate-400">
                    <div className="flex items-center gap-1.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-slate-400 shrink-0" />
                      <span className="text-xs">{row.broadSoftware}</span>
                    </div>
                  </td>
                  <td className="py-3.5 px-4 bg-blue-50/40 dark:bg-blue-950/30 border-l border-r border-blue-200 dark:border-blue-800 font-semibold text-blue-900 dark:text-sky-200">
                    <div className="flex items-center gap-1.5">
                      <Check className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0" />
                      <span className="text-xs">{row.valfence}</span>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Supporting Summary Cards below table */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
          <div className="p-4 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-xs text-slate-600 dark:text-slate-400 shadow-2xs">
            <span className="font-bold text-slate-900 dark:text-slate-200 block mb-1">
              {isDe ? 'Deterministische Rechenlogik' : 'Deterministic Calculation Engine'}
            </span>
            {isDe ? 'Keine LLM-Halluzinationen in mathematischen Formeln oder DCF-Berechnungen.' : 'Zero LLM hallucinations in cash flow mathematics or DCF waterfall mechanics.'}
          </div>
          <div className="p-4 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-xs text-slate-600 dark:text-slate-400 shadow-2xs">
            <span className="font-bold text-slate-900 dark:text-slate-200 block mb-1">
              {isDe ? 'Nahtlose Excel-Integration' : 'Native Excel Compatibility'}
            </span>
            {isDe ? 'Vollständig formelgebundene .xlsx-Modelle, kompatibel mit Ihren bestehenden IC-Präsentationen.' : 'Formula-driven .xlsx models matching your investment committee review standards.'}
          </div>
          <div className="p-4 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-xs text-slate-600 dark:text-slate-400 shadow-2xs">
            <span className="font-bold text-slate-900 dark:text-slate-200 block mb-1">
              {isDe ? 'Lückenloses Audit-Protokoll' : 'End-to-End Audit Trail'}
            </span>
            {isDe ? 'Jede Annahme ist mit exaktem PDF-Seitenzitat und Textausschnitt hinterlegt.' : 'Every assumption is backed by exact PDF page citations and excerpt verification.'}
          </div>
        </div>
      </div>
    </section>
  );
};
