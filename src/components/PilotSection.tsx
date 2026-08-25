/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import {
  CheckCircle2,
  XCircle,
  ArrowRight,
  Mail,
  ShieldAlert,
  FileCheck2,
  Wind,
} from 'lucide-react';
import { useLanguage } from '../i18n/LanguageContext';
import { trackEvent } from '../services/clarity';

export const PilotSection: React.FC = () => {
  const { t } = useLanguage();

  const [selectedCriteria, setSelectedCriteria] = useState<{ [key: string]: boolean }>({
    case_type: true,
    doc_availability: true,
    analyst_capacity: true,
    comparison_willingness: false,
  });

  const criteriaConfig = t.pilot.criteria;

  const toggleCriterion = (id: string) => {
    setSelectedCriteria((prev) => ({ ...prev, [id]: !prev[id] }));
    trackEvent('pilot_criterion_toggled', { criterionId: id });
  };

  const selectedCount = Object.values(selectedCriteria).filter(Boolean).length;

  let fitStatus = {
    label: t.pilot.fitLevelLow,
    description: t.pilot.fitLevelLowDesc,
  };

  if (selectedCount >= 3) {
    fitStatus = {
      label: t.pilot.fitLevelHigh,
      description: t.pilot.fitLevelHighDesc,
    };
  } else if (selectedCount >= 2) {
    fitStatus = {
      label: t.pilot.fitLevelMedium,
      description: t.pilot.fitLevelMediumDesc,
    };
  }

  // Pre-filled mailto body
  const mailSubject = encodeURIComponent(t.pilot.emailSubject);
  const mailBody = encodeURIComponent(
    `${t.pilot.emailGreeting}\n\n${t.pilot.emailBodyIntro}\n\n${t.pilot.emailBodyMatch}\n${criteriaConfig
      .map((c) => `- [${selectedCriteria[c.id] ? 'x' : ' '}] ${c.title}`)
      .join('\n')}\n\n${t.pilot.emailBodyClosing}\n`
  );
  const mailtoLink = `mailto:info.valfence@gmail.com?subject=${mailSubject}&body=${mailBody}`;

  const deliverables = t.pilot.deliverablesList;
  const boundaries = t.pilot.boundariesList;

  return (
    <section
      id="pilot-section"
      className="py-16 lg:py-24 bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 relative border-b border-slate-200 dark:border-slate-800 transition-colors"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 dark:bg-blue-950 border border-blue-200 dark:border-blue-800 text-blue-700 dark:text-sky-400 text-xs font-bold uppercase tracking-wider mb-3">
            <Wind className="w-3.5 h-3.5" />
            <span>{t.pilot.eyebrow}</span>
          </div>
          <h2 className="text-2xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 dark:text-white tracking-tight leading-tight mb-3">
            {t.pilot.headline}
          </h2>
          <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300">
            {t.pilot.subline}
          </p>
        </div>

        {/* Deliverables vs Boundaries Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 mb-12">
          {/* Left: Pilot Deliverables */}
          <div className="lg:col-span-6 p-5 sm:p-7 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-4 shadow-2xs">
            <div className="flex items-center gap-2 text-emerald-700 dark:text-emerald-400 text-xs font-mono uppercase font-bold">
              <FileCheck2 className="w-4 h-4" />
              <span>{t.pilot.deliverablesBadge}</span>
            </div>

            <h3 className="text-lg font-bold text-slate-900 dark:text-white">
              {t.pilot.deliverablesTitle}
            </h3>

            <div className="space-y-2.5">
              {deliverables.map((item, idx) => (
                <div key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-700 dark:text-slate-300">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5" />
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Right: What the Pilot is NOT (Clear Boundaries) */}
          <div className="lg:col-span-6 p-5 sm:p-7 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-4 shadow-2xs">
            <div className="flex items-center gap-2 text-rose-700 dark:text-rose-400 text-xs font-mono uppercase font-bold">
              <ShieldAlert className="w-4 h-4" />
              <span>{t.pilot.boundariesBadge}</span>
            </div>

            <h3 className="text-lg font-bold text-slate-900 dark:text-white">
              {t.pilot.boundariesTitle}
            </h3>

            <div className="space-y-2.5">
              {boundaries.map((item, idx) => (
                <div key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-600 dark:text-slate-400">
                  <XCircle className="w-4 h-4 text-rose-500 shrink-0 mt-0.5" />
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Interactive Pilot Fit Check Tool */}
        <div className="p-5 sm:p-7 lg:p-8 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-md">
          <div className="max-w-3xl mx-auto text-center mb-6">
            <span className="text-xs font-mono uppercase text-blue-700 dark:text-sky-400 tracking-wider font-bold">
              {t.pilot.fitToolTitle}
            </span>
            <h3 className="text-xl sm:text-2xl font-extrabold text-slate-900 dark:text-white mt-1 mb-1.5">
              {t.pilot.fitToolTitle}
            </h3>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300">
              {t.pilot.fitToolSubtitle}
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 max-w-4xl mx-auto mb-6">
            {criteriaConfig.map((c) => {
              const isSelected = !!selectedCriteria[c.id];
              return (
                <button
                  key={c.id}
                  onClick={() => toggleCriterion(c.id)}
                  className={`p-3.5 rounded-xl border text-left transition-all flex items-start gap-3 cursor-pointer ${
                    isSelected
                      ? 'bg-blue-50 dark:bg-blue-950/80 border-blue-500 dark:border-sky-500 shadow-2xs'
                      : 'bg-slate-50 dark:bg-slate-950 border-slate-200 dark:border-slate-800 text-slate-500 dark:text-slate-400 hover:border-slate-300 dark:hover:border-slate-700'
                  }`}
                >
                  <div
                    className={`w-4.5 h-4.5 rounded-md flex items-center justify-center shrink-0 mt-0.5 border ${
                      isSelected
                        ? 'bg-blue-600 border-blue-600 text-white'
                        : 'border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-800'
                    }`}
                  >
                    {isSelected && <CheckCircle2 className="w-3.5 h-3.5" />}
                  </div>
                  <div>
                    <h4 className="text-xs sm:text-sm font-bold text-slate-900 dark:text-white mb-0.5">
                      {c.title}
                    </h4>
                    <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                      {c.description}
                    </p>
                  </div>
                </button>
              );
            })}
          </div>

          {/* Fit Status & Mail Action */}
          <div className="max-w-xl mx-auto text-center space-y-3 pt-3 border-t border-slate-200 dark:border-slate-800">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-slate-100 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-xs font-bold font-mono">
              <span className={`w-2 h-2 rounded-full ${selectedCount >= 3 ? 'bg-emerald-500' : 'bg-blue-500'}`} />
              <span className="text-slate-800 dark:text-slate-200">{fitStatus.label}</span>
            </div>

            <p className="text-xs text-slate-600 dark:text-slate-300">
              {fitStatus.description}
            </p>

            <div>
              <a
                id="btn-pilot-email-draft"
                href={mailtoLink}
                onClick={() => trackEvent('cta_click', { location: 'pilot_fit_tool', fit: fitStatus.label })}
                className="inline-flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 active:bg-blue-800 text-white font-bold text-xs sm:text-sm px-6 py-3 rounded-lg shadow-sm transition-all active:scale-[0.98]"
              >
                <Mail className="w-4 h-4 text-blue-100" />
                <span>{t.pilot.discussPilotBtn}</span>
                <ArrowRight className="w-4 h-4 text-blue-100" />
              </a>
            </div>

            <p className="text-[11px] text-slate-500 dark:text-slate-400">
              {t.pilot.directContactLabel}: info.valfence@gmail.com
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};
