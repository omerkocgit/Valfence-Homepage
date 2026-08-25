/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { Wind, Sun, BatteryCharging, Network } from 'lucide-react';
import { useLanguage } from '../i18n/LanguageContext';

export const RoadmapSection: React.FC = () => {
  const { t, language } = useLanguage();
  const isDe = language === 'DE';

  const icons = [
    <Wind className="w-5 h-5 text-blue-600 dark:text-sky-400" key="0" />,
    <Sun className="w-5 h-5 text-amber-600 dark:text-amber-400" key="1" />,
    <BatteryCharging className="w-5 h-5 text-emerald-600 dark:text-emerald-400" key="2" />,
    <Network className="w-5 h-5 text-purple-600 dark:text-purple-400" key="3" />,
  ];

  const steps = t.roadmap.steps.map((step, idx) => ({
    ...step,
    icon: icons[idx],
    active: idx === 0,
  }));

  return (
    <section id="roadmap-section" className="py-16 lg:py-24 bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 border-b border-slate-200 dark:border-slate-800 transition-colors duration-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-3xl mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 dark:bg-blue-950 border border-blue-200 dark:border-blue-800 text-blue-700 dark:text-sky-400 text-xs font-bold uppercase tracking-wider mb-3">
            <span>{t.roadmap.eyebrow}</span>
          </div>
          <h2 className="text-2xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 dark:text-white tracking-tight mb-3">
            {t.roadmap.headline}
          </h2>
          <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300 leading-relaxed">
            {t.roadmap.subline}
          </p>
        </div>

        {/* Roadmap Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
          {steps.map((s, idx) => (
            <div
              key={idx}
              className={`p-5 rounded-2xl border flex flex-col justify-between transition-all ${
                s.active
                  ? 'bg-blue-50 dark:bg-slate-900 border-blue-500 dark:border-sky-500 shadow-2xs'
                  : 'bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 shadow-2xs'
              }`}
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <div className="p-2 rounded-lg bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700">
                    {s.icon}
                  </div>
                  <span
                    className={`text-[11px] font-mono font-bold px-2 py-0.5 rounded border ${
                      s.active
                        ? 'bg-blue-100 dark:bg-sky-950 text-blue-700 dark:text-sky-300 border-blue-300 dark:border-sky-700'
                        : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 border-slate-200 dark:border-slate-700'
                    }`}
                  >
                    {s.status}
                  </span>
                </div>

                <span className="text-xs text-blue-700 dark:text-sky-400 font-mono font-semibold block">
                  {s.stage}
                </span>
                <h3 className="text-base font-bold text-slate-900 dark:text-white mt-0.5 mb-1.5">
                  {s.title}
                </h3>
                <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                  {s.description}
                </p>
              </div>

              <div className="mt-4 pt-3 border-t border-slate-200 dark:border-slate-800 text-[11px] font-mono text-slate-500 flex items-center justify-between">
                <span>Phase 0{idx + 1}</span>
                {s.active && (
                  <span className="text-blue-700 dark:text-sky-400 font-bold">
                    {isDe ? 'Aktiver Fokus' : 'Active Focus'}
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
