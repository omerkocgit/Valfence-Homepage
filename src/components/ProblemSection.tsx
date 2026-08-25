/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { Layers, HelpCircle, History, Quote } from 'lucide-react';
import { motion } from 'motion/react';
import { useLanguage } from '../i18n/LanguageContext';

export const ProblemSection: React.FC = () => {
  const { t } = useLanguage();

  return (
    <section id="problem-section" className="py-16 lg:py-24 bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 border-b border-slate-200 dark:border-slate-800 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="max-w-3xl mb-12"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red-100 dark:bg-red-950/70 border border-red-200 dark:border-red-800/80 text-red-700 dark:text-rose-400 text-xs font-bold uppercase tracking-wider mb-3">
            <span>{t.problem.eyebrow}</span>
          </div>
          <h2 className="text-2xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 dark:text-white tracking-tight leading-[1.15] mb-4">
            {t.problem.headlineStart}{' '}
            <span className="text-slate-500 dark:text-slate-400 font-normal">
              {t.problem.headlineSub}
            </span>
          </h2>
          <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300 leading-relaxed">
            {t.problem.body}
          </p>
        </motion.div>

        {/* 3 Core Pain Point Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-10">
          {/* Pain 1 */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 flex flex-col justify-between shadow-2xs hover:border-slate-300 dark:hover:border-slate-700 transition-colors"
          >
            <div>
              <div className="w-9 h-9 rounded-lg bg-amber-100 dark:bg-amber-950/80 text-amber-700 dark:text-amber-400 flex items-center justify-center border border-amber-200 dark:border-amber-800/60 mb-4">
                <Layers className="w-4.5 h-4.5" />
              </div>
              <span className="text-xs font-mono text-amber-700 dark:text-amber-400 uppercase font-bold">
                {t.problem.friction1Tag}
              </span>
              <h3 className="text-base font-bold text-slate-900 dark:text-white mt-1 mb-2">
                {t.problem.friction1Title}
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                {t.problem.friction1Desc}
              </p>
            </div>
            <div className="mt-5 pt-3 border-t border-slate-100 dark:border-slate-800 text-xs text-slate-500 font-mono">
              {t.problem.friction1Impact}
            </div>
          </motion.div>

          {/* Pain 2 */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 flex flex-col justify-between shadow-2xs hover:border-slate-300 dark:hover:border-slate-700 transition-colors"
          >
            <div>
              <div className="w-9 h-9 rounded-lg bg-blue-100 dark:bg-blue-950/80 text-blue-700 dark:text-sky-400 flex items-center justify-center border border-blue-200 dark:border-blue-800/60 mb-4">
                <HelpCircle className="w-4.5 h-4.5" />
              </div>
              <span className="text-xs font-mono text-blue-700 dark:text-sky-400 uppercase font-bold">
                {t.problem.friction2Tag}
              </span>
              <h3 className="text-base font-bold text-slate-900 dark:text-white mt-1 mb-2">
                {t.problem.friction2Title}
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                {t.problem.friction2Desc}
              </p>
            </div>
            <div className="mt-5 pt-3 border-t border-slate-100 dark:border-slate-800 text-xs text-slate-500 font-mono">
              {t.problem.friction2Impact}
            </div>
          </motion.div>

          {/* Pain 3 */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 flex flex-col justify-between shadow-2xs hover:border-slate-300 dark:hover:border-slate-700 transition-colors"
          >
            <div>
              <div className="w-9 h-9 rounded-lg bg-rose-100 dark:bg-rose-950/80 text-rose-700 dark:text-rose-400 flex items-center justify-center border border-rose-200 dark:border-rose-800/60 mb-4">
                <History className="w-4.5 h-4.5" />
              </div>
              <span className="text-xs font-mono text-rose-700 dark:text-rose-400 uppercase font-bold">
                {t.problem.friction3Tag}
              </span>
              <h3 className="text-base font-bold text-slate-900 dark:text-white mt-1 mb-2">
                {t.problem.friction3Title}
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                {t.problem.friction3Desc}
              </p>
            </div>
            <div className="mt-5 pt-3 border-t border-slate-100 dark:border-slate-800 text-xs text-slate-500 font-mono">
              {t.problem.friction3Impact}
            </div>
          </motion.div>
        </div>

        {/* Quotation Spotlight Card */}
        <motion.div
          initial={{ opacity: 0, scale: 0.98 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="p-6 sm:p-7 rounded-2xl bg-blue-50/80 dark:bg-slate-900 text-slate-900 dark:text-white border border-blue-200/90 dark:border-slate-800 shadow-sm transition-colors duration-200"
        >
          <div className="flex items-start gap-4">
            <div className="p-2.5 rounded-xl bg-blue-100 dark:bg-blue-900/60 text-blue-700 dark:text-sky-400 border border-blue-200 dark:border-blue-700 shrink-0">
              <Quote className="w-5 h-5" />
            </div>
            <div>
              <blockquote className="text-lg sm:text-xl font-bold italic leading-snug text-slate-900 dark:text-slate-100">
                {t.problem.quoteText}
              </blockquote>
              <p className="text-xs text-blue-700 dark:text-sky-300 font-mono mt-2 font-semibold">
                {t.problem.quoteAuthor}
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
