/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import {
  Link2,
  ShieldCheck,
  Calculator,
  Zap,
  FileCheck,
  CheckCircle2,
  Lock,
  ArrowUpRight,
} from 'lucide-react';
import { motion } from 'motion/react';
import { useLanguage } from '../i18n/LanguageContext';
import { AnimatedCounter } from './AnimatedCounter';

export const BenefitsSection: React.FC = () => {
  const { t, language } = useLanguage();
  const isDe = language === 'DE';

  const icons = [
    <Link2 className="w-5 h-5 text-blue-600 dark:text-sky-400" key="0" />,
    <ShieldCheck className="w-5 h-5 text-emerald-600 dark:text-emerald-400" key="1" />,
    <Calculator className="w-5 h-5 text-indigo-600 dark:text-indigo-400" key="2" />,
    <Zap className="w-5 h-5 text-amber-600 dark:text-amber-400" key="3" />,
    <FileCheck className="w-5 h-5 text-purple-600 dark:text-purple-400" key="4" />,
  ];

  const benefits = t.benefits.cards.map((b, idx) => ({
    ...b,
    icon: icons[idx] || <FileCheck className="w-5 h-5 text-blue-600" />,
  }));

  return (
    <section
      id="benefits-section"
      className="py-16 lg:py-24 bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 border-b border-slate-200 dark:border-slate-800 transition-colors duration-200"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="max-w-3xl mb-12"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 dark:bg-slate-800 border border-blue-200 dark:border-slate-700 text-blue-700 dark:text-sky-400 text-xs font-bold uppercase tracking-wider mb-3">
            <span>{t.benefits.eyebrow}</span>
          </div>
          <h2 className="text-2xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 dark:text-white tracking-tight mb-4">
            {t.benefits.headlineMain}{' '}
            <span className="text-slate-500 dark:text-slate-400 font-normal">{t.benefits.headlineSub}</span>
          </h2>
          <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300 leading-relaxed">
            {t.benefits.subline}
          </p>
        </motion.div>

        {/* Animated Counter Stats Ribbon */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-4 p-5 mb-10 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-2xs"
        >
          <div className="p-3 text-center sm:text-left">
            <span className="text-xs font-mono text-slate-500 dark:text-slate-400 block">{t.benefits.stat1Label}</span>
            <div className="text-2xl sm:text-3xl font-extrabold font-mono text-blue-700 dark:text-sky-400 mt-1">
              <AnimatedCounter to={70} prefix="~" suffix="%" />
            </div>
            <span className="text-[11px] text-slate-500">{t.benefits.stat1Desc}</span>
          </div>
          <div className="p-3 text-center sm:text-left">
            <span className="text-xs font-mono text-slate-500 dark:text-slate-400 block">{t.benefits.stat2Label}</span>
            <div className="text-2xl sm:text-3xl font-extrabold font-mono text-emerald-600 dark:text-emerald-400 mt-1">
              <AnimatedCounter to={100} suffix="%" />
            </div>
            <span className="text-[11px] text-slate-500">{t.benefits.stat2Desc}</span>
          </div>
          <div className="p-3 text-center sm:text-left">
            <span className="text-xs font-mono text-slate-500 dark:text-slate-400 block">{t.benefits.stat3Label}</span>
            <div className="text-2xl sm:text-3xl font-extrabold font-mono text-slate-900 dark:text-white mt-1">
              <AnimatedCounter to={0} suffix="%" />
            </div>
            <span className="text-[11px] text-slate-500">{t.benefits.stat3Desc}</span>
          </div>
          <div className="p-3 text-center sm:text-left">
            <span className="text-xs font-mono text-slate-500 dark:text-slate-400 block">{t.benefits.stat4Label}</span>
            <div className="text-2xl sm:text-3xl font-extrabold font-mono text-indigo-600 dark:text-indigo-400 mt-1">
              <AnimatedCounter to={100} suffix="%" />
            </div>
            <span className="text-[11px] text-slate-500">{t.benefits.stat4Desc}</span>
          </div>
        </motion.div>

        {/* Benefits Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
          {benefits.map((b, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.08 }}
              className="p-5 sm:p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 flex flex-col justify-between shadow-2xs hover:border-slate-300 dark:hover:border-slate-700 transition-colors"
            >
              <div>
                <div className="flex items-center justify-between mb-3.5">
                  <div className="p-2 rounded-lg bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700">
                    {b.icon}
                  </div>
                  <span className="text-xs font-mono text-slate-600 dark:text-slate-400 px-2.5 py-0.5 rounded-full bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 font-semibold">
                    {b.tag}
                  </span>
                </div>

                <h3 className="text-base font-bold text-slate-900 dark:text-white mb-1.5">
                  {b.title}
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                  {b.description}
                </p>
              </div>

              <div className="mt-5 pt-3 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-xs font-mono">
                <span className="text-blue-700 dark:text-sky-400 font-semibold">{b.highlight}</span>
                <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
              </div>
            </motion.div>
          ))}

          {/* Pilot Wedge Card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.45 }}
            className="p-5 sm:p-6 rounded-2xl bg-blue-50 dark:bg-slate-900 border border-blue-200 dark:border-blue-800 flex flex-col justify-between shadow-2xs hover:border-blue-300 dark:hover:border-blue-700 transition-colors"
          >
            <div>
              <div className="flex items-center justify-between mb-3.5">
                <div className="p-2 rounded-lg bg-blue-100 dark:bg-blue-950 border border-blue-300 dark:border-blue-700 text-blue-700 dark:text-sky-300">
                  <Lock className="w-5 h-5" />
                </div>
                <span className="text-xs font-mono text-blue-700 dark:text-sky-300 px-2.5 py-0.5 rounded-full bg-blue-100 dark:bg-blue-950 border border-blue-300 dark:border-blue-800 font-bold">
                  {isDe ? 'Pilotphase' : 'Pilot Track'}
                </span>
              </div>

              <h3 className="text-base font-bold text-slate-900 dark:text-white mb-1.5">
                {t.benefits.pilotCardTitle}
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                {t.benefits.pilotCardDesc}
              </p>
            </div>

            <div className="mt-5 pt-3 border-t border-blue-200 dark:border-blue-800 flex items-center justify-between">
              <a
                href="mailto:info.valfence@gmail.com?subject=VALFENCE%20pilot%20enquiry"
                className="text-xs font-bold text-blue-700 dark:text-sky-300 hover:underline inline-flex items-center gap-1"
              >
                <span>{t.benefits.pilotCardBtn}</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </a>
              <span className="text-[11px] text-slate-500 font-mono">
                {isDe ? '0 € Pilot-Setup' : 'Zero upfront cost'}
              </span>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
