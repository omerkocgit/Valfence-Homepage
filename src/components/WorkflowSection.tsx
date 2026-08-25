/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import {
  FolderSearch,
  Scale,
  UserCheck,
  Calculator,
  FileSpreadsheet,
  CheckCircle2,
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { useLanguage } from '../i18n/LanguageContext';
import { trackEvent } from '../services/clarity';

export const WorkflowSection: React.FC = () => {
  const { t, language } = useLanguage();
  const isDe = language === 'DE';
  const [activeStep, setActiveStep] = useState<number>(0);

  const icons = [
    <FolderSearch className="w-4.5 h-4.5" key="0" />,
    <Scale className="w-4.5 h-4.5" key="1" />,
    <UserCheck className="w-4.5 h-4.5" key="2" />,
    <Calculator className="w-4.5 h-4.5" key="3" />,
    <FileSpreadsheet className="w-4.5 h-4.5" key="4" />,
  ];

  const steps = t.workflow.steps.map((step, idx) => ({
    ...step,
    icon: icons[idx],
  }));

  const handleStepClick = (index: number) => {
    setActiveStep(index);
    trackEvent('workflow_step_view', { step: steps[index].title });
  };

  return (
    <section
      id="workflow-section"
      className="py-16 lg:py-24 bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 border-b border-slate-200 dark:border-slate-800 transition-colors duration-200"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center max-w-3xl mx-auto mb-12"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 dark:bg-blue-950 border border-blue-200 dark:border-blue-800 text-blue-700 dark:text-sky-400 text-xs font-bold uppercase tracking-wider mb-3">
            <span>{t.workflow.eyebrow}</span>
          </div>
          <h2 className="text-2xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 dark:text-white tracking-tight leading-tight mb-4">
            {t.workflow.headline}
          </h2>
          <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300">
            {t.workflow.subline}
          </p>

          {/* Operating Principle Banner */}
          <div className="mt-6 inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-2xs">
            <span className="text-xs font-mono uppercase text-slate-500 dark:text-slate-400 font-bold">
              {isDe ? 'Grundprinzip:' : 'Operating Principle:'}
            </span>
            <span className="text-xs sm:text-sm font-bold text-blue-700 dark:text-sky-400 font-mono">
              {isDe ? 'Lückenlose Rückverfolgbarkeit für jeden Parameter' : 'Complete Source Traceability for Every Parameter'}
            </span>
          </div>
        </motion.div>

        {/* 5-Step Interactive Navigation */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="grid grid-cols-2 sm:grid-cols-5 gap-2 sm:gap-2.5 mb-6"
        >
          {steps.map((step, idx) => {
            const isActive = activeStep === idx;
            return (
              <button
                key={step.number}
                id={`workflow-nav-${idx}`}
                onClick={() => handleStepClick(idx)}
                className={`p-3 rounded-xl border text-left transition-all cursor-pointer ${
                  isActive
                    ? 'bg-blue-600 border-blue-600 text-white shadow-xs'
                    : 'bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400 hover:border-slate-300 dark:hover:border-slate-700 hover:text-slate-900 dark:hover:text-slate-200'
                }`}
              >
                <div className="flex items-center justify-between mb-1">
                  <span className={`text-xs font-mono font-bold ${isActive ? 'text-blue-100' : 'text-slate-400 dark:text-slate-500'}`}>
                    {isDe ? 'Schritt' : 'Step'} {step.number}
                  </span>
                  <div className={isActive ? 'text-white' : 'text-slate-400 dark:text-slate-500'}>
                    {step.icon}
                  </div>
                </div>
                <div className="text-xs sm:text-sm font-bold truncate">
                  {step.title}
                </div>
              </button>
            );
          })}
        </motion.div>

        {/* Active Step Deep-Dive Card with AnimatePresence */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="p-5 sm:p-7 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-2xs min-h-[260px]"
        >
          <AnimatePresence mode="wait">
            <motion.div
              key={activeStep}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.25 }}
              className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center"
            >
              {/* Left: Step Overview */}
              <div className="lg:col-span-7 space-y-3.5">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-mono px-2.5 py-0.5 rounded bg-blue-100 dark:bg-blue-950 text-blue-700 dark:text-sky-300 font-bold border border-blue-200 dark:border-blue-800">
                    {steps[activeStep].badge}
                  </span>
                  <span className="text-xs font-mono text-slate-500 dark:text-slate-400">
                    {steps[activeStep].microcopy}
                  </span>
                </div>

                <h3 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white">
                  {steps[activeStep].number}. {steps[activeStep].title}
                </h3>

                <p className="text-sm sm:text-base text-slate-700 dark:text-slate-300 leading-relaxed font-normal">
                  {steps[activeStep].shortDesc}
                </p>

                <div className="space-y-2 pt-1">
                  {steps[activeStep].details.map((detail, dIdx) => (
                    <div key={dIdx} className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-700 dark:text-slate-300">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5" />
                      <span>{detail}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Right: Concrete Artifact Preview Box */}
              <div className="lg:col-span-5 bg-slate-50 dark:bg-slate-950 rounded-xl p-4 sm:p-5 border border-slate-200 dark:border-slate-800 space-y-2.5 font-mono text-xs shadow-2xs">
                <div className="flex items-center justify-between text-slate-500 dark:text-slate-400 border-b border-slate-200 dark:border-slate-800 pb-2">
                  <span className="text-[11px] uppercase tracking-wider text-blue-700 dark:text-sky-400 font-bold">
                    {isDe ? 'Geprüfter Workflow-Ertrag' : 'Verified Workflow Artifact'}
                  </span>
                  <span className="text-[11px] text-emerald-600 dark:text-emerald-400 font-bold">
                    {isDe ? 'Stufe' : 'Stage'} {steps[activeStep].number}
                  </span>
                </div>

                {activeStep === 0 && (
                  <div className="space-y-2 text-slate-700 dark:text-slate-300 text-[11px]">
                    <div className="p-2.5 rounded bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
                      <span className="text-blue-700 dark:text-sky-300 font-bold">{isDe ? 'Extrahierte Datenquelle' : 'Extracted Source'}:</span>
                      <p className="text-slate-600 dark:text-slate-400">{isDe ? 'DNV Ertragsgutachten (EYRA), Seite 42' : 'DNV Energy Yield Assessment (EYRA), p. 42'}</p>
                      <p className="text-emerald-600 dark:text-emerald-400 text-[10px] font-semibold">{isDe ? '100% Textanker-Verknüpfung' : '100% Text Anchor Linked'}</p>
                    </div>
                    <div className="p-2.5 rounded bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
                      <span className="text-blue-700 dark:text-sky-300 font-bold">{isDe ? 'PPA-Vertragsentwurf' : 'Offtake Term Sheet'}:</span>
                      <p className="text-slate-600 dark:text-slate-400">{isDe ? '10 Jahre Abnahmevertrag €72/MWh Preisuntergrenze' : '10-Yr Fixed Offtake @ €72/MWh Price Floor'}</p>
                    </div>
                  </div>
                )}

                {activeStep === 1 && (
                  <div className="space-y-2 text-slate-700 dark:text-slate-300 text-[11px]">
                    <div className="p-2.5 rounded bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
                      <div className="flex justify-between">
                        <span className="text-blue-700 dark:text-sky-300 font-bold">{isDe ? 'P50 Kapazitätsfaktor' : 'P50 Capacity Factor'}:</span>
                        <span className="font-bold text-slate-900 dark:text-white">34.8%</span>
                      </div>
                      <p className="text-slate-500 dark:text-slate-400">{isDe ? 'Bruttoertrag abzüglich 11,4% Gesamtverluste' : 'Gross yield minus 11.4% total loss factor'}</p>
                      <p className="text-amber-600 dark:text-amber-400 text-[10px] font-semibold">{isDe ? 'Konflikt mit Verkäufer-IM erkannt (36,5%)' : 'Conflict detected with Seller IM (36.5%)'}</p>
                    </div>
                  </div>
                )}

                {activeStep === 2 && (
                  <div className="space-y-2 text-slate-700 dark:text-slate-300 text-[11px]">
                    <div className="p-2.5 rounded bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
                      <div className="flex justify-between items-center text-emerald-600 dark:text-emerald-400 font-bold">
                        <span>{isDe ? 'Analysten-Freigabe' : 'Analyst Sign-off'}:</span>
                        <span>{isDe ? 'Freigegeben' : 'Approved'} ✓</span>
                      </div>
                      <p className="text-slate-600 dark:text-slate-400 mt-1">{isDe ? 'P50-Konservative Annahme gewählt mit Begründungsvermerk' : 'P50 conservative estimate adopted with audit note'}</p>
                      <p className="text-slate-500 text-[10px]">{isDe ? 'Zeitstempel: 2026-08-22 · Freigabe protokolliert' : 'Timestamp: 2026-08-22 · Audit trail locked'}</p>
                    </div>
                  </div>
                )}

                {activeStep === 3 && (
                  <div className="space-y-2 text-slate-700 dark:text-slate-300 text-[11px]">
                    <div className="p-2.5 rounded bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
                      <span className="text-blue-700 dark:text-sky-300 font-bold">{isDe ? 'DCF-Ergebnisse (Basisfall)' : 'DCF Waterfall Output (Base)'}:</span>
                      <p className="text-slate-700 dark:text-slate-300">{isDe ? 'Eigenkapitalrendite (Equity IRR)' : 'Equity IRR'}: <span className="text-emerald-600 dark:text-emerald-400 font-bold">9.82%</span></p>
                      <p className="text-slate-700 dark:text-slate-300">{isDe ? 'P90 Downside-Rendite' : 'P90 Downside IRR'}: <span className="text-amber-600 dark:text-amber-400 font-bold">7.41%</span></p>
                      <p className="text-slate-700 dark:text-slate-300">{isDe ? 'Unternehmenswert (EV)' : 'Enterprise Value (EV)'}: <span className="text-slate-900 dark:text-white font-bold">€64.2M</span></p>
                    </div>
                  </div>
                )}

                {activeStep === 4 && (
                  <div className="space-y-2 text-slate-700 dark:text-slate-300 text-[11px]">
                    <div className="p-2.5 rounded bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
                      <span className="text-emerald-600 dark:text-emerald-400 font-bold">{isDe ? 'Generierte Lieferobjekte' : 'Generated Package'}:</span>
                      <p className="text-slate-700 dark:text-slate-300">✓ NorthRidge_Valuation_Model_v1.xlsx</p>
                      <p className="text-slate-700 dark:text-slate-300">✓ IC_Executive_Memo_NorthRidge.pdf</p>
                      <p className="text-slate-700 dark:text-slate-300">✓ Full_Audit_Register_Citations.csv</p>
                    </div>
                  </div>
                )}
              </div>
            </motion.div>
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
};
