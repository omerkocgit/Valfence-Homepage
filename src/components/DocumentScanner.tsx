import React, {useEffect, useRef, useState} from 'react';
import {animate, motion, useInView, useMotionValue, useReducedMotion, useTransform} from 'motion/react';
import {FileText, FileSpreadsheet} from 'lucide-react';
import {useLanguage} from '../i18n/LanguageContext';

export function DocumentScanner() {
  const {language} = useLanguage();
  const de = language === 'DE';
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, {margin: '80px'});
  const reduced = useReducedMotion();
  const position = useMotionValue(55);
  const clip = useTransform(position, p => `polygon(${p}% 0, 100% 0, 100% 100%, ${p}% 100%)`);
  const left = useTransform(position, p => `${p}%`);
  const [automatic, setAutomatic] = useState(true);
  const [manual, setManual] = useState(55);
  const running = automatic && !reduced;
  useEffect(() => { if (reduced) setManual(Math.round(position.get())); }, [reduced, position]);
  useEffect(() => {
    if (!running || !inView) return;
    const controls = animate(position, [position.get(), 85, 15, position.get()], {
      duration: 8, repeat: Infinity, ease: 'easeInOut',
    });
    return () => controls.stop();
  }, [running, inView, position]);
  const toggle = () => {
    if (running) setManual(Math.round(position.get()));
    setAutomatic(!automatic);
  };
  const rows = de ? [
    {label: 'PPA-Preis', raw: '§14.3: Abnahme zu 68 Euro je MWh.', value: '68,00 €/MWh', source: '§14.3 · Beispiel'},
    {label: 'Jährliche Steigerung', raw: '§14.3: Jährliche Anpassung um 1,5 Prozent.', value: '1,50 % / Jahr', source: '§14.3 · Beispiel'},
    {label: 'Abregelung', raw: '§14.4: Entschädigung oberhalb von 2 Prozent.', value: '> 2,00 %', source: '§14.4 · Beispiel'},
  ] : [
    {label: 'PPA price', raw: '§14.3: Purchase at 68 euros per MWh.', value: '€68.00/MWh', source: '§14.3 · Sample'},
    {label: 'Annual escalation', raw: '§14.3: Adjust annually by 1.5 percent.', value: '1.50% / year', source: '§14.3 · Sample'},
    {label: 'Curtailment', raw: '§14.4: Compensation above 2 percent.', value: '> 2.00%', source: '§14.4 · Sample'},
  ];
  return <div ref={ref} className="p-4 sm:p-8 space-y-4">
    <div className="flex flex-wrap items-center justify-between gap-3">
      <h3 className="font-bold text-sm text-slate-900 dark:text-white">{de ? 'Vom Vertragstext zum Datenfeld' : 'From contract text to structured fields'}</h3>
      <button type="button" disabled={!!reduced} aria-pressed={running} onClick={toggle}
        className="px-3 py-2 rounded-lg bg-slate-100 dark:bg-slate-800 text-xs font-semibold text-slate-700 dark:text-slate-200 disabled:opacity-70 cursor-pointer">
        {reduced ? (de ? 'Manueller Scan · reduzierte Bewegung' : 'Manual scan · reduced motion') : running ? (de ? 'Auto-Scan pausieren' : 'Pause Auto-Scan') : (de ? 'Auto-Scan fortsetzen' : 'Resume Auto-Scan')}
      </button>
    </div>
    <p className="text-xs text-slate-500 dark:text-slate-400">{de ? 'Vorher/Nachher-Beispiel mit fiktivem Vertragstext. Keine echte Dokumentenextraktion. Pausieren und den Regler bis zum Rand bewegen, um beide Ansichten zu lesen.' : 'Before/after example with fictional contract text. No actual document extraction. Pause and move the slider to either edge to read both views.'}</p>
    <div className="relative rounded-xl border border-slate-200 dark:border-slate-700 overflow-hidden" data-testid="scanner-stage">
      <div className="p-4 sm:p-6 bg-slate-100 dark:bg-slate-950">
        <div className="flex items-center gap-2 mb-4 text-sm font-bold text-slate-700 dark:text-slate-300"><FileText className="w-4 h-4 shrink-0"/>{de ? 'Vertrag · Beispiel' : 'Contract · Sample'}</div>
        <div className="space-y-3">{rows.map(row => <div key={row.label} className="h-28 sm:h-24 rounded-lg border border-slate-200 dark:border-slate-800 p-3">
          <p className="text-xs font-semibold text-slate-600 dark:text-slate-400">{row.label}</p>
          <p className="mt-2 text-xs text-slate-600 dark:text-slate-400">{row.raw}</p>
        </div>)}</div>
      </div>
      <motion.div style={{clipPath: clip}} className="absolute inset-0 p-4 sm:p-6 bg-white dark:bg-slate-900">
        <div className="flex items-center gap-2 mb-4 text-sm font-bold text-emerald-700 dark:text-emerald-400"><FileSpreadsheet className="w-4 h-4 shrink-0"/>{de ? 'Datenfelder · Beispiel' : 'Fields · Sample'}</div>
        <div className="space-y-3">{rows.map(row => <div key={row.label} className="h-28 sm:h-24 rounded-lg border border-blue-200 dark:border-blue-900 p-3">
          <p className="text-xs font-semibold text-slate-600 dark:text-slate-400">{row.label}</p>
          <p className="mt-1 font-mono text-base font-bold text-blue-600 dark:text-sky-400">{row.value}</p>
          <p className="text-[11px] text-slate-500 dark:text-slate-400">{row.source}</p>
        </div>)}</div>
      </motion.div>
      <motion.div style={{left}} aria-hidden="true" className="absolute top-0 bottom-0 w-0.5 bg-sky-400 shadow-[0_0_12px_#38bdf8] pointer-events-none" />
    </div>
    <label className="block text-xs text-slate-600 dark:text-slate-400">
      <span className="flex justify-between gap-3 mb-2"><span>{de ? 'Vollständige Datenfelder' : 'Full structured fields'}</span><span>{de ? 'Vollständiger Vertrag' : 'Full contract text'}</span></span>
      <input type="range" min="0" max="100" value={running ? 55 : manual} disabled={running}
        aria-label={de ? 'Scan-Position' : 'Scan position'}
        onChange={event => {const value = Number(event.target.value); setManual(value); position.set(value);}}
        className="w-full accent-blue-600 h-6 disabled:opacity-40 cursor-ew-resize" />
    </label>
  </div>;
}
