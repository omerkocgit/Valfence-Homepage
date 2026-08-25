/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { Users, Building2, Wind, Sun, BatteryCharging, Briefcase } from 'lucide-react';
import { motion } from 'motion/react';
import { useLanguage } from '../i18n/LanguageContext';

export const AudienceStrip: React.FC = () => {
  const { t } = useLanguage();

  return (
    <section id="audience-strip" className="bg-slate-50 dark:bg-slate-950 py-8 sm:py-10 border-b border-slate-200 dark:border-slate-800 transition-colors duration-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-6"
        >
          <span className="text-xs font-mono uppercase text-slate-500 dark:text-slate-400 tracking-wider font-semibold">
            {t.audience.eyebrow}
          </span>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6">
          {/* Persona 1: Users */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="p-4 sm:p-5 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 flex items-start gap-3.5 shadow-2xs hover:border-slate-300 dark:hover:border-slate-700 transition-colors"
          >
            <div className="p-2 rounded-lg bg-blue-100 dark:bg-blue-950/80 text-blue-700 dark:text-sky-400 border border-blue-200 dark:border-blue-800/60 shrink-0">
              <Users className="w-4.5 h-4.5" />
            </div>
            <div>
              <span className="text-xs font-semibold uppercase text-blue-700 dark:text-sky-400 font-mono">
                {t.audience.persona1Tag}
              </span>
              <h3 className="text-sm sm:text-base font-bold text-slate-900 dark:text-white mt-0.5">
                {t.audience.persona1Title}
              </h3>
              <p className="text-xs text-slate-600 dark:text-slate-400 mt-1 leading-relaxed">
                {t.audience.persona1Desc}
              </p>
            </div>
          </motion.div>

          {/* Persona 2: Organization */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="p-4 sm:p-5 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 flex items-start gap-3.5 shadow-2xs hover:border-slate-300 dark:hover:border-slate-700 transition-colors"
          >
            <div className="p-2 rounded-lg bg-indigo-100 dark:bg-indigo-950/80 text-indigo-700 dark:text-indigo-400 border border-indigo-200 dark:border-indigo-800/60 shrink-0">
              <Building2 className="w-4.5 h-4.5" />
            </div>
            <div>
              <span className="text-xs font-semibold uppercase text-indigo-700 dark:text-indigo-400 font-mono">
                {t.audience.persona2Tag}
              </span>
              <h3 className="text-sm sm:text-base font-bold text-slate-900 dark:text-white mt-0.5">
                {t.audience.persona2Title}
              </h3>
              <p className="text-xs text-slate-600 dark:text-slate-400 mt-1 leading-relaxed">
                {t.audience.persona2Desc}
              </p>
            </div>
          </motion.div>

          {/* Persona 3: Transactions */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="p-4 sm:p-5 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 flex items-start gap-3.5 shadow-2xs hover:border-slate-300 dark:hover:border-slate-700 transition-colors"
          >
            <div className="p-2 rounded-lg bg-emerald-100 dark:bg-emerald-950/80 text-emerald-700 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-800/60 shrink-0">
              <Briefcase className="w-4.5 h-4.5" />
            </div>
            <div>
              <span className="text-xs font-semibold uppercase text-emerald-700 dark:text-emerald-400 font-mono">
                {t.audience.persona3Tag}
              </span>
              <h3 className="text-sm sm:text-base font-bold text-slate-900 dark:text-white mt-0.5">
                {t.audience.persona3Title}
              </h3>
              <div className="flex flex-wrap gap-1.5 mt-2">
                <span className="inline-flex items-center gap-1 text-[11px] bg-slate-50 dark:bg-slate-800 text-slate-700 dark:text-slate-300 px-2 py-0.5 rounded border border-slate-200 dark:border-slate-700 font-medium">
                  <Wind className="w-3 h-3 text-blue-600 dark:text-sky-400" /> {t.audience.assetWind}
                </span>
                <span className="inline-flex items-center gap-1 text-[11px] bg-slate-50 dark:bg-slate-800 text-slate-700 dark:text-slate-300 px-2 py-0.5 rounded border border-slate-200 dark:border-slate-700 font-medium">
                  <Sun className="w-3 h-3 text-amber-500" /> {t.audience.assetSolar}
                </span>
                <span className="inline-flex items-center gap-1 text-[11px] bg-slate-50 dark:bg-slate-800 text-slate-700 dark:text-slate-300 px-2 py-0.5 rounded border border-slate-200 dark:border-slate-700 font-medium">
                  <BatteryCharging className="w-3 h-3 text-emerald-600 dark:text-emerald-400" /> {t.audience.assetBess}
                </span>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
