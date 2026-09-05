import React, { useState, useEffect, useMemo } from 'react';
import {
  Activity,
  FileText,
  FileSpreadsheet,
  CheckCircle2,
  Sliders,
  Wind,
  Sun,
  BatteryCharging,
  Zap,
  Sparkles,
  Search,
  ScanLine,
  ArrowRight,
  TrendingUp,
  ShieldCheck,
  Cpu,
  Layers,
  ChevronRight,
} from 'lucide-react';
import { motion, AnimatePresence, useReducedMotion } from 'motion/react';
import { trackEvent } from '../services/clarity';
import { DocumentScanner } from './DocumentScanner';
import { INITIAL_ASSUMPTIONS, calculateDeterministicDCF } from '../data/mockValuation';
import { useLanguage } from '../i18n/LanguageContext';

type VisualMode = 'graph' | 'simulator' | 'scanner';

export const VisualShowcaseSection: React.FC = () => {
  const { t, language } = useLanguage();
  const isDe = language === 'DE';
  const reducedMotion = useReducedMotion();
  const fmt = (value: number, digits = 1) => value.toLocaleString(isDe ? 'de-DE' : 'en-GB', {minimumFractionDigits: digits, maximumFractionDigits: digits});
  const [activeMode, setActiveMode] = useState<VisualMode>('graph');

  // Graph state: selected active node
  const [selectedNode, setSelectedNode] = useState<string>('ai-gate');

  // Simulator state: interactive parameters
  const [windSpeed, setWindSpeed] = useState<number>(8.2); // m/s
  const [curtailment, setCurtailment] = useState<number>(2.5); // %
  const [ppaPrice, setPpaPrice] = useState<number>(68); // €/MWh
  const [assetType, setAssetType] = useState<'wind' | 'solar' | 'hybrid'>('wind');

  // Derived calculations for the simulator (memoized for peak performance)
  const { netGenGWh, annualRevenueM, calculatedIRR, calculatedDSCR } = useMemo(() => {
    const baseCapacityMW = 120;
    const theoretical =
      assetType === 'wind'
        ? (Math.pow(windSpeed / 7.5, 3) * baseCapacityMW * 8760 * 0.35) / 1000
        : (baseCapacityMW * 8760 * 0.22 * (windSpeed / 7)) / 1000;
    const netGen = Math.min(baseCapacityMW * 8760 / 1000, Math.max(10, theoretical * (1 - curtailment / 100)));
    const annualRev = (netGen * 1000 * ppaPrice) / 1000000;
    const demo = calculateDeterministicDCF(120, INITIAL_ASSUMPTIONS.map(a =>
      a.id === 'ncf_p50' ? {...a, currentValue: netGen * 1000 / (120 * 8760) * 100}
      : a.id === 'merchant_power_price' ? {...a, currentValue: ppaPrice} : a));
    const irr = demo.equityIRR;
    const dscr = demo.dscrMin;
    return {
      netGenGWh: netGen,
      annualRevenueM: annualRev,
      calculatedIRR: irr,
      calculatedDSCR: dscr,
    };
  }, [assetType, windSpeed, curtailment, ppaPrice]);

  const handleModeChange = (mode: VisualMode) => {
    setActiveMode(mode);
    trackEvent('visual_showcase_mode_change', { mode });
  };

  return (
    <section
      id="visual-showcase-section"
      className="py-16 lg:py-24 bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 border-b border-slate-200 dark:border-slate-800 transition-colors duration-200 relative overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 lg:gap-8 mb-8">
          <div className="flex-1 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 dark:bg-blue-950 border border-blue-200 dark:border-blue-800 text-blue-700 dark:text-sky-400 text-xs font-bold uppercase tracking-wider mb-2.5">
              <Sparkles className="w-3.5 h-3.5" />
              <span>{t.visualShowcase.eyebrow}</span>
            </div>
            <h2 className="text-2xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 dark:text-white tracking-tight leading-tight">
              {t.visualShowcase.headline}
            </h2>
            <p className="text-sm sm:text-base text-slate-600 dark:text-slate-400 mt-2 leading-relaxed">
              {t.visualShowcase.subline}
            </p>
          </div>

          {/* Mode Switcher Tabs - Grid of 3, cleanly fitting without horizontal scroll */}
          <div className="grid grid-cols-3 gap-1.5 p-1.5 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl shadow-2xs w-full lg:w-auto shrink-0">
            <button
              aria-pressed={activeMode === 'graph'}
              onClick={() => handleModeChange('graph')}
              className={`flex items-center justify-center gap-1.5 px-3 sm:px-4 py-2.5 rounded-lg text-xs font-bold transition-all text-center cursor-pointer ${
                activeMode === 'graph'
                  ? 'bg-blue-600 text-white shadow-2xs'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              <Activity className="w-3.5 h-3.5 shrink-0" />
              <span className="truncate">{t.visualShowcase.tabGraph}</span>
            </button>
            <button
              aria-pressed={activeMode === 'simulator'}
              onClick={() => handleModeChange('simulator')}
              className={`flex items-center justify-center gap-1.5 px-3 sm:px-4 py-2.5 rounded-lg text-xs font-bold transition-all text-center cursor-pointer ${
                activeMode === 'simulator'
                  ? 'bg-blue-600 text-white shadow-2xs'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              <Zap className="w-3.5 h-3.5 shrink-0" />
              <span className="truncate">{t.visualShowcase.tabSimulator}</span>
            </button>
            <button
              aria-pressed={activeMode === 'scanner'}
              onClick={() => handleModeChange('scanner')}
              className={`flex items-center justify-center gap-1.5 px-3 sm:px-4 py-2.5 rounded-lg text-xs font-bold transition-all text-center cursor-pointer ${
                activeMode === 'scanner'
                  ? 'bg-blue-600 text-white shadow-2xs'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              <ScanLine className="w-3.5 h-3.5 shrink-0" />
              <span className="truncate">{t.visualShowcase.tabScanner}</span>
            </button>
          </div>
        </div>

        {/* Main Showcase Stage */}
        <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-md overflow-hidden min-h-[520px]">
          <AnimatePresence mode="wait">
            {/* ========================================================================= */}
            {/* MODE 1: DILIGENCE NODE GRAPH */}
            {/* ========================================================================= */}
            {activeMode === 'graph' && (
              <motion.div
                key="graph"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.35 }}
                className="p-6 sm:p-8"
              >
                <p className="mb-4 text-xs text-slate-500 dark:text-slate-400">{isDe ? 'Fiktives Quellenbeispiel, unabhängig vom Arbeitsbereich. Keine echte Dokumentenextraktion.' : 'Fixed sample source workflow; independent of the live workspace. No actual document extraction.'}</p>
                {/* Header bar */}
                <div className="flex flex-wrap items-center justify-between gap-3 pb-6 border-b border-slate-200 dark:border-slate-800 text-xs font-mono">
                  <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
                    <span className="font-bold text-slate-800 dark:text-slate-200">
                      {isDe ? 'ILLUSTRATIVER QUELLEN-WORKFLOW' : 'ILLUSTRATIVE SOURCE WORKFLOW'}
                    </span>
                    <span className="text-slate-400">· {isDe ? 'Interaktive Provenienz-Topologie' : 'Interactive Provenance Topology'}</span>
                  </div>
                  <div className="text-slate-500 dark:text-slate-400">
                    {isDe ? 'Klicken Sie auf einen Knoten zur Prüfung von Prüfpfad & Parametern' : 'Click any node to inspect audit trail & parameters'}
                  </div>
                </div>

                {/* Graph Canvas Grid */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mt-6 items-center">
                  {/* Left & Center: Interactive Visual Pipeline Nodes */}
                  <div className="lg:col-span-8 relative py-4">
                    {/* SVG Connecting Flow Lines with animated pulse */}
                    <svg className="absolute inset-0 w-full h-full pointer-events-none hidden sm:block">
                      <defs>
                        <linearGradient id="flowGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                          <stop offset="0%" stopColor="#3b82f6" stopOpacity="0.8" />
                          <stop offset="50%" stopColor="#0ea5e9" stopOpacity="0.9" />
                          <stop offset="100%" stopColor="#10b981" stopOpacity="0.9" />
                        </linearGradient>
                      </defs>
                      <path
                        d="M 170 80 C 240 80, 260 160, 330 160"
                        fill="none"
                        stroke="url(#flowGrad)"
                        strokeWidth="2"
                        strokeDasharray="5 5"
                        className="animate-[dash_20s_linear_infinite]"
                      />
                      <path
                        d="M 170 160 C 240 160, 260 160, 330 160"
                        fill="none"
                        stroke="url(#flowGrad)"
                        strokeWidth="2"
                        strokeDasharray="5 5"
                      />
                      <path
                        d="M 170 240 C 240 240, 260 160, 330 160"
                        fill="none"
                        stroke="url(#flowGrad)"
                        strokeWidth="2"
                        strokeDasharray="5 5"
                      />
                      <path
                        d="M 480 160 C 530 160, 550 160, 600 160"
                        fill="none"
                        stroke="#10b981"
                        strokeWidth="2"
                        strokeDasharray="4 4"
                      />
                    </svg>

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 relative z-10">
                      {/* Column 1: Ingested Source Documents */}
                      <div className="space-y-3.5">
                        <span className="text-[11px] font-mono uppercase font-bold text-slate-500 dark:text-slate-400 block mb-2">
                          {isDe ? '1. Dokumenten-Erfassung' : '1. Source Ingestion'}
                        </span>

                        <button
                          role="button"
                        tabIndex={0}
                        aria-pressed={selectedNode === 'dnv-yield'}
                        onKeyDown={e => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); setSelectedNode('dnv-yield'); } }}
                        onClick={() => setSelectedNode('dnv-yield')}
                          className={`w-full p-3.5 rounded-xl border text-left transition-all cursor-pointer ${
                            selectedNode === 'dnv-yield'
                              ? 'bg-blue-50 dark:bg-blue-950/80 border-blue-500 dark:border-sky-400 shadow-sm'
                              : 'bg-slate-50 dark:bg-slate-950 border-slate-200 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700'
                          }`}
                        >
                          <div className="flex items-center justify-between mb-1">
                            <span className="text-xs font-bold text-slate-900 dark:text-white flex items-center gap-1.5">
                              <FileText className="w-4 h-4 text-blue-600 dark:text-sky-400" />
                              {isDe ? 'Technischer Ertrag' : 'Technical Yield'}
                            </span>
                            <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-blue-100 dark:bg-blue-900/60 text-blue-700 dark:text-sky-300 font-bold">
                              DNV P50
                            </span>
                          </div>
                          <p className="text-[11px] text-slate-500 dark:text-slate-400">
                            {isDe ? '365,8 GWh/a · 34,8 % NCF · 30 × 4 MW' : '365.8 GWh/yr · 34.8% NCF · 30 × 4 MW'}
                          </p>
                        </button>

                        <button
                          role="button"
                        tabIndex={0}
                        aria-pressed={selectedNode === 'ppa-terms'}
                        onKeyDown={e => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); setSelectedNode('ppa-terms'); } }}
                        onClick={() => setSelectedNode('ppa-terms')}
                          className={`w-full p-3.5 rounded-xl border text-left transition-all cursor-pointer ${
                            selectedNode === 'ppa-terms'
                              ? 'bg-blue-50 dark:bg-blue-950/80 border-blue-500 dark:border-sky-400 shadow-sm'
                              : 'bg-slate-50 dark:bg-slate-950 border-slate-200 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700'
                          }`}
                        >
                          <div className="flex items-center justify-between mb-1">
                            <span className="text-xs font-bold text-slate-900 dark:text-white flex items-center gap-1.5">
                              <FileText className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />
                              {isDe ? 'PPA-Abnahmevertrag' : 'Offtake PPA'}
                            </span>
                            <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-indigo-100 dark:bg-indigo-900/60 text-indigo-700 dark:text-indigo-300 font-bold">
                              {isDe ? '10-J. Fest' : '10-Yr Fixed'}
                            </span>
                          </div>
                          <p className="text-[11px] text-slate-500 dark:text-slate-400">
                            {isDe ? '68,00 €/MWh · Pay-as-Produced' : '€68.00/MWh · Pay-as-Produced'}
                          </p>
                        </button>

                        <button
                          role="button"
                        tabIndex={0}
                        aria-pressed={selectedNode === 'capex-quote'}
                        onKeyDown={e => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); setSelectedNode('capex-quote'); } }}
                        onClick={() => setSelectedNode('capex-quote')}
                          className={`w-full p-3.5 rounded-xl border text-left transition-all cursor-pointer ${
                            selectedNode === 'capex-quote'
                              ? 'bg-blue-50 dark:bg-blue-950/80 border-blue-500 dark:border-sky-400 shadow-sm'
                              : 'bg-slate-50 dark:bg-slate-950 border-slate-200 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700'
                          }`}
                        >
                          <div className="flex items-center justify-between mb-1">
                            <span className="text-xs font-bold text-slate-900 dark:text-white flex items-center gap-1.5">
                              <FileText className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                              {isDe ? 'CapEx / OpEx Struktur' : 'Capex / Opex Grid'}
                            </span>
                            <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-emerald-100 dark:bg-emerald-900/60 text-emerald-700 dark:text-emerald-300 font-bold">
                              {isDe ? 'EPC-Angebot' : 'EPC Quote'}
                            </span>
                          </div>
                          <p className="text-[11px] text-slate-500 dark:text-slate-400">
                            {isDe ? '1,25 Mio. €/MW CapEx · 24k €/MW OpEx' : '€1.25M/MW Capex · €24.5k/MW Opex'}
                          </p>
                        </button>
                      </div>

                      {/* Column 2: AI Parsing & Analyst Gate Node */}
                      <div className="space-y-3.5 sm:pt-6">
                        <span className="text-[11px] font-mono uppercase font-bold text-slate-500 dark:text-slate-400 block mb-2">
                          {isDe ? '2. VALFENCE Engine' : '2. VALFENCE Engine'}
                        </span>

                        <button
                          role="button"
                        tabIndex={0}
                        aria-pressed={selectedNode === 'ai-gate'}
                        onKeyDown={e => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); setSelectedNode('ai-gate'); } }}
                        onClick={() => setSelectedNode('ai-gate')}
                          className={`w-full p-4 rounded-xl border text-left transition-all cursor-pointer ${
                            selectedNode === 'ai-gate'
                              ? 'bg-blue-50 dark:bg-blue-950/90 border-blue-500 dark:border-sky-400 shadow-md ring-2 ring-blue-500/20'
                              : 'bg-slate-50 dark:bg-slate-950 border-slate-200 dark:border-slate-800'
                          }`}
                        >
                          <div className="flex items-center gap-2 text-blue-700 dark:text-sky-400 mb-2 font-bold text-xs">
                            <Cpu className="w-4.5 h-4.5 animate-spin" style={{ animationDuration: '8s' }} />
                            <span>{isDe ? 'KI-Extraktion + Gate' : 'AI Extraction + Gate'}</span>
                          </div>
                          <p className="text-xs font-bold text-slate-900 dark:text-white mb-1.5">
                            {isDe ? 'Deterministischer Parser' : 'Deterministic Parser'}
                          </p>
                          <p className="text-[11px] text-slate-600 dark:text-slate-400 leading-relaxed mb-3">
                            {isDe
                              ? 'Extrahiert 48 Parameter mit exakten Zitat-Koordinaten. Keine KI-Halluzinationen.'
                              : 'Extracts 48 parameters with citation coordinates. Illustrative review checkpoint.'}
                          </p>
                          <div className="inline-flex items-center gap-1 text-[10px] font-mono font-bold text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/80 px-2 py-0.5 rounded border border-emerald-200 dark:border-emerald-800">
                            <CheckCircle2 className="w-3 h-3" />
                            <span>{isDe ? 'Analystenfreigabe' : 'Analyst Approved'}</span>
                          </div>
                        </button>
                      </div>

                      {/* Column 3: Live Output Model & Metrics */}
                      <div className="space-y-3.5">
                        <span className="text-[11px] font-mono uppercase font-bold text-slate-500 dark:text-slate-400 block mb-2">
                          {isDe ? '3. Belastbares Modell-Paket' : '3. Defensible Model Pack'}
                        </span>

                        <button
                          role="button"
                        tabIndex={0}
                        aria-pressed={selectedNode === 'excel-output'}
                        onKeyDown={e => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); setSelectedNode('excel-output'); } }}
                        onClick={() => setSelectedNode('excel-output')}
                          className={`w-full p-3.5 rounded-xl border text-left transition-all cursor-pointer ${
                            selectedNode === 'excel-output'
                              ? 'bg-emerald-50 dark:bg-emerald-950/80 border-emerald-500 dark:border-emerald-400 shadow-sm'
                              : 'bg-slate-50 dark:bg-slate-950 border-slate-200 dark:border-slate-800 hover:border-slate-300'
                          }`}
                        >
                          <div className="flex items-center justify-between mb-1">
                            <span className="text-xs font-bold text-slate-900 dark:text-white flex items-center gap-1.5">
                              <FileSpreadsheet className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                              {isDe ? 'Excel DCF-Bewertung' : 'Excel Valuation DCF'}
                            </span>
                            <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-emerald-100 dark:bg-emerald-900/60 text-emerald-700 dark:text-emerald-300 font-bold">
                              .XLSX
                            </span>
                          </div>
                          <div className="flex justify-between items-center text-[11px] mt-2 font-mono">
                            <span className="text-slate-500">Equity IRR:</span>
                            <span className="font-bold text-emerald-600 dark:text-emerald-400">9.8%</span>
                          </div>
                          <div className="flex justify-between items-center text-[11px] font-mono">
                            <span className="text-slate-500">Equity NPV:</span>
                            <span className="font-bold text-slate-900 dark:text-slate-100">{isDe ? '42,6 Mio. €' : '€42.6M'}</span>
                          </div>
                        </button>

                        <button
                          role="button"
                        tabIndex={0}
                        aria-pressed={selectedNode === 'audit-memo'}
                        onKeyDown={e => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); setSelectedNode('audit-memo'); } }}
                        onClick={() => setSelectedNode('audit-memo')}
                          className={`w-full p-3.5 rounded-xl border text-left transition-all cursor-pointer ${
                            selectedNode === 'audit-memo'
                              ? 'bg-emerald-50 dark:bg-emerald-950/80 border-emerald-500 dark:border-emerald-400 shadow-sm'
                              : 'bg-slate-50 dark:bg-slate-950 border-slate-200 dark:border-slate-800 hover:border-slate-300'
                          }`}
                        >
                          <div className="flex items-center justify-between mb-1">
                            <span className="text-xs font-bold text-slate-900 dark:text-white flex items-center gap-1.5">
                              <ShieldCheck className="w-4 h-4 text-blue-600 dark:text-sky-400" />
                              {isDe ? 'IC-Prüfmemorandum' : 'IC Audit Trail'}
                            </span>
                            <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-blue-100 dark:bg-blue-900/60 text-blue-700 dark:text-sky-300 font-bold">
                              {isDe ? 'Prüfung verifiziert' : 'Audit Verified'}
                            </span>
                          </div>
                          <p className="text-[11px] text-slate-500 dark:text-slate-400">
                            {isDe ? '100 % Parameter-Rückverfolgbarkeit' : '100% Parameter Traceability'}
                          </p>
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* Right Panel: Selected Node Inspector Box */}
                  <div className="lg:col-span-4 bg-slate-50 dark:bg-slate-950 p-5 rounded-2xl border border-slate-200 dark:border-slate-800">
                    <div className="flex items-center justify-between pb-3 border-b border-slate-200 dark:border-slate-800 mb-3 text-xs">
                      <span className="font-mono uppercase font-bold text-blue-700 dark:text-sky-400">
                        {isDe ? 'Knoten-Inspektor' : 'Node Inspector'}
                      </span>
                      <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-200 dark:bg-slate-800 text-slate-700 dark:text-slate-300 font-bold">
                        {isDe ? 'AKTIVER KNOTEN' : 'ACTIVE TARGET'}
                      </span>
                    </div>

                    {selectedNode === 'dnv-yield' && (
                      <div className="space-y-3 text-xs">
                        <div className="font-bold text-slate-900 dark:text-white text-sm">
                          {isDe ? 'DNV Technisches Ertragsgutachten' : 'DNV Technical Energy Yield Report'}
                        </div>
                        <div className="p-3 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-1.5 font-mono text-[11px]">
                          <div className="flex justify-between">
                            <span className="text-slate-500">{isDe ? 'Dokument:' : 'Document:'}</span>
                            <span className="text-slate-800 dark:text-slate-200">DNV_GL_Yield_Rev3.pdf</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-slate-500">{isDe ? 'Seitenreferenz:' : 'Page Reference:'}</span>
                            <span className="text-blue-600 dark:text-sky-400">pp. 18-22 (Table 4.2)</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-slate-500">{isDe ? 'P50 Bruttoertrag:' : 'P50 Gross Yield:'}</span>
                            <span className="font-bold text-slate-900 dark:text-white">412 GWh/a</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-slate-500">{isDe ? 'Gesamtverluste:' : 'Total Loss Factor:'}</span>
                            <span className="text-amber-600 dark:text-amber-400">{isDe ? '11,21 % abgezogen' : '11.21% deducted'}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-slate-500">{isDe ? 'P50 Nettoertrag:' : 'P50 Net Yield:'}</span>
                            <span className="font-bold text-emerald-600 dark:text-emerald-400">{isDe ? '365,8 GWh/a' : '365.8 GWh/yr'}</span>
                          </div>
                        </div>
                        <p className="text-[11px] text-slate-500 leading-relaxed">
                          {isDe
                            ? 'Automatisierte OCR extrahiert die Energieverlustaufschlüsselung mit Zitatkoordinaten, direkt verknüpft mit Tabellenblatt \'Assumptions\'!C14.'
                            : 'Automated OCR extracts energy loss breakdown with cell-coordinate citations linked directly to Excel Sheet \'Assumptions\'!C14.'}
                        </p>
                      </div>
                    )}

                    {selectedNode === 'ppa-terms' && (
                      <div className="space-y-3 text-xs">
                        <div className="font-bold text-slate-900 dark:text-white text-sm">
                          {isDe ? 'Corporate PPA Term Sheet' : 'Corporate PPA Term Sheet'}
                        </div>
                        <div className="p-3 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-1.5 font-mono text-[11px]">
                          <div className="flex justify-between">
                            <span className="text-slate-500">{isDe ? 'Abnehmer:' : 'Offtaker:'}</span>
                            <span className="text-slate-800 dark:text-slate-200">Global Tech Corp (A- rated)</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-slate-500">{isDe ? 'Struktur:' : 'Structure:'}</span>
                            <span className="text-blue-600 dark:text-sky-400">Pay-as-Produced (100%)</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-slate-500">{isDe ? 'Basispreis:' : 'Base Price:'}</span>
                            <span className="font-bold text-emerald-600 dark:text-emerald-400">€68.00 / MWh</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-slate-500">{isDe ? 'Indexierung:' : 'Indexation:'}</span>
                            <span className="text-slate-800 dark:text-slate-200">{isDe ? '1,5 % feste Steigerung' : '1.5% fixed escalation'}</span>
                          </div>
                        </div>
                        <p className="text-[11px] text-slate-500 leading-relaxed">
                          {isDe
                            ? 'Erkennt Abregelungsentschädigungsklauseln automatisch und richtet die entsprechende Erlöslogik in Excel ein.'
                            : 'Recognizes curtailment compensation indemnity clause automatically and sets up conditional revenue logic in Excel.'}
                        </p>
                      </div>
                    )}

                    {selectedNode === 'capex-quote' && (
                      <div className="space-y-3 text-xs">
                        <div className="font-bold text-slate-900 dark:text-white text-sm">
                          {isDe ? 'EPC CapEx & OpEx Rahmenvertrag' : 'EPC Capex & Opex Framework'}
                        </div>
                        <div className="p-3 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-1.5 font-mono text-[11px]">
                          <div className="flex justify-between">
                            <span className="text-slate-500">{isDe ? 'Turbinenlieferung:' : 'Turbine Supply:'}</span>
                            <span className="text-slate-800 dark:text-slate-200">30 × 4 MW (sample)</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-slate-500">{isDe ? 'Gesamt-CapEx:' : 'Total Capex:'}</span>
                            <span className="font-bold text-slate-900 dark:text-white">{isDe ? '150,0 Mio. € (1,25 Mio. €/MW)' : '€150.0M (€1.25M/MW)'}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-slate-500">{isDe ? 'OpEx (J1-5):' : 'Opex (Y1-5):'}</span>
                            <span className="text-slate-800 dark:text-slate-200">{isDe ? '24.500 € / MW / a' : '€24,500 / MW / yr'}</span>
                          </div>
                        </div>
                        <p className="text-[11px] text-slate-500 leading-relaxed">
                          {isDe
                            ? 'Plant COD-Termine, Bauauszahlungspläne und langfristige Vollwartungsverträge (FSA).'
                            : 'Schedules COD timing, construction drawdowns, and long-term full-scope service agreements (FSA).'}
                        </p>
                      </div>
                    )}

                    {selectedNode === 'ai-gate' && (
                      <div className="space-y-3 text-xs">
                        <div className="font-bold text-slate-900 dark:text-white text-sm flex items-center gap-1.5">
                          <ShieldCheck className="w-4 h-4 text-emerald-500" />
                          <span>{isDe ? 'VALFENCE Governance-Prüftor' : 'VALFENCE Governance Gate'}</span>
                        </div>
                        <div className="p-3 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-2 font-mono text-[11px]">
                          <div className="flex justify-between items-center text-emerald-600 dark:text-emerald-400 font-bold">
                            <span>Status:</span>
                            <span>{isDe ? 'BEISPIEL-FREIGABE' : 'SAMPLE SIGN-OFF'}</span>
                          </div>
                          <div className="text-slate-600 dark:text-slate-400">
                            • {isDe ? 'Extraktions-Konfidenz: 99,4 %' : 'Extraction Confidence: 99.4%'}
                          </div>
                          <div className="text-slate-600 dark:text-slate-400">
                            • {isDe ? 'Prüfkoordinaten: 48/48 verifiziert' : 'Audit Coordinates: 48/48 Verified'}
                          </div>
                          <div className="text-slate-600 dark:text-slate-400">
                            • {isDe ? 'Analysten-Freigabe: J. Doe (VP M&A)' : 'Analyst Sign-Off: J. Doe (VP M&A)'}
                          </div>
                        </div>
                        <p className="text-[11px] text-slate-500 leading-relaxed">
                          {isDe
                            ? 'Veranschaulicht den geplanten Prüfschritt. Quellenauszüge und Freigabedaten sind fiktiv.'
                            : 'Illustrates the proposed review step. Source snippets and sign-off details here are fictional.'}
                        </p>
                      </div>
                    )}

                    {selectedNode === 'excel-output' && (
                      <div className="space-y-3 text-xs">
                        <div className="font-bold text-slate-900 dark:text-white text-sm">
                          {isDe ? 'Formel-natives Excel-Modell' : 'Formula-Native Excel Model'}
                        </div>
                        <div className="p-3 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-1.5 font-mono text-[11px]">
                          <div className="flex justify-between">
                            <span className="text-slate-500">{isDe ? 'Dateistruktur:' : 'File Structure:'}</span>
                            <span className="text-slate-800 dark:text-slate-200">{isDe ? '5-Reiter Standard-DCF' : '5-Tab Standard DCF'}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-slate-500">{isDe ? 'P50 Basis-IRR:' : 'P50 Base IRR:'}</span>
                            <span className="font-bold text-emerald-600 dark:text-emerald-400">9.8%</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-slate-500">{isDe ? 'P90 Downside-IRR:' : 'P90 Downside IRR:'}</span>
                            <span className="font-bold text-amber-600 dark:text-amber-400">7.4%</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-slate-500">{isDe ? 'Mindest-DSCR:' : 'Min DSCR:'}</span>
                            <span className="text-slate-900 dark:text-white font-bold">1.32x</span>
                          </div>
                        </div>
                        <p className="text-[11px] text-slate-500 leading-relaxed">
                          {isDe
                            ? 'Reine Excel-Formeln (=XIRR, =SUMMENPRODUKT). Keine Makros oder Add-Ins erforderlich.'
                            : 'Pure Excel formulas (`=XIRR`, `=SUMPRODUCT`). No hidden macros or proprietary plugins required.'}
                        </p>
                      </div>
                    )}

                    {selectedNode === 'audit-memo' && (
                      <div className="space-y-3 text-xs">
                        <div className="font-bold text-slate-900 dark:text-white text-sm">
                          {isDe ? 'Investment Committee Prüfmemorandum' : 'Investment Committee Audit Memo'}
                        </div>
                        <div className="p-3 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-1.5 font-mono text-[11px]">
                          <div className="flex justify-between">
                            <span className="text-slate-500">Format:</span>
                            <span className="text-slate-800 dark:text-slate-200">{isDe ? 'Automatisiertes IC-One-Pager' : 'Automated IC One-Pager'}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-slate-500">{isDe ? 'Quellenbelege:' : 'Source Footnotes:'}</span>
                            <span className="text-blue-600 dark:text-sky-400">{isDe ? '100 % dokumentenbasiert' : '100% Document-backed'}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-slate-500">{isDe ? 'Risikobewertung:' : 'Risk Assessment:'}</span>
                            <span className="text-emerald-600 dark:text-emerald-400">{isDe ? 'Geringes Modellrisiko' : 'Low Model Risk'}</span>
                          </div>
                        </div>
                        <p className="text-[11px] text-slate-500 leading-relaxed">
                          {isDe
                            ? 'Verteidigen Sie Bewertungszahlen vor dem IC mit direkten Hyperlinks zu den zugrundeliegenden Gutachten.'
                            : 'Defend valuation numbers in front of IC with direct hyperlinks back to underlying vendor reports.'}
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              </motion.div>
            )}

            {/* ========================================================================= */}
            {/* MODE 2: ASSET & YIELD SIMULATOR */}
            {/* ========================================================================= */}
            {activeMode === 'simulator' && (
              <motion.div
                key="simulator"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.35 }}
                className="p-6 sm:p-8"
              >
                <p className="mb-4 text-xs text-slate-500 dark:text-slate-400">{isDe ? 'Separates 120-MW-Beispiel. Vereinfachte Demo mit konstantem Strompreis; nicht mit dem 48-MW-Arbeitsbereich verbunden.' : 'Separate 120 MW example. Simplified demo with a constant power price; independent of the 48 MW workspace.'}</p>
                {/* Header Bar */}
                <div className="flex flex-wrap items-center justify-between gap-3 pb-6 border-b border-slate-200 dark:border-slate-800 text-xs font-mono">
                  <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-blue-500 animate-pulse" />
                    <span className="font-bold text-slate-800 dark:text-slate-200">
                      {isDe ? 'FINANZ-SIMULATOR FÜR ERNEUERBARE ENERGIEN' : 'RENEWABLE ENERGY FINANCIAL SIMULATOR'}
                    </span>
                    <span className="text-slate-400">· {isDe ? 'Ertrags- & Cashflow-Reaktion in Echtzeit' : 'Real-Time Yield & Cash Flow Reaction'}</span>
                  </div>
                  {/* Asset selector buttons */}
                  <div className="flex items-center gap-1 bg-slate-100 dark:bg-slate-950 p-1 rounded-lg border border-slate-200 dark:border-slate-800">
                    <button
                      aria-pressed={assetType === 'wind'}
                      onClick={() => setAssetType('wind')}
                      className={`flex items-center gap-1 px-2.5 py-1 rounded text-xs font-bold transition-colors cursor-pointer ${
                        assetType === 'wind'
                          ? 'bg-white dark:bg-slate-800 text-blue-600 dark:text-sky-400 shadow-2xs'
                          : 'text-slate-600 dark:text-slate-400'
                      }`}
                    >
                      <Wind className="w-3 h-3" />
                      <span>{isDe ? 'Windenergie' : 'Wind'}</span>
                    </button>
                    <button
                      aria-pressed={assetType === 'solar'}
                      onClick={() => setAssetType('solar')}
                      className={`flex items-center gap-1 px-2.5 py-1 rounded text-xs font-bold transition-colors cursor-pointer ${
                        assetType === 'solar'
                          ? 'bg-white dark:bg-slate-800 text-amber-600 dark:text-amber-400 shadow-2xs'
                          : 'text-slate-600 dark:text-slate-400'
                      }`}
                    >
                      <Sun className="w-3 h-3" />
                      <span>{isDe ? 'Photovoltaik (Solar)' : 'Solar PV'}</span>
                    </button>
                  </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mt-6 items-center">
                  {/* Left: Interactive Controls */}
                  <div className="lg:col-span-5 space-y-5 bg-slate-50 dark:bg-slate-950 p-5 rounded-2xl border border-slate-200 dark:border-slate-800">
                    <div className="flex items-center gap-2 text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider">
                      <Sliders className="w-4 h-4 text-blue-600 dark:text-sky-400" />
                      <span>{isDe ? 'Ressourcen- & Vermarktungsparameter' : 'Resource & Commercial Inputs'}</span>
                    </div>

                    {/* Wind Speed / Solar Irradiance Slider */}
                    <div className="space-y-2">
                      <div className="flex justify-between text-xs">
                        <span className="font-semibold text-slate-700 dark:text-slate-300">
                          {assetType === 'wind'
                            ? (isDe ? 'Mittlere Windgeschwindigkeit (P50)' : 'Average Wind Speed (P50)')
                            : (isDe ? 'Globale Sonneneinstrahlung' : 'Global Solar Irradiance')}
                        </span>
                        <span className="font-mono font-bold text-blue-600 dark:text-sky-400">
                          {assetType === 'wind' ? `${windSpeed.toFixed(1)} m/s` : `${(windSpeed * 200).toFixed(0)} kWh/m²`}
                        </span>
                      </div>
                      <input
                        type="range"
                        min="5.5"
                        max="11.0"
                        step="0.1"
                        aria-label={assetType === 'wind' ? (isDe ? 'Windgeschwindigkeit' : 'Wind speed') : (isDe ? 'Sonneneinstrahlung' : 'Solar irradiance')}
                        value={windSpeed}
                        onChange={(e) => setWindSpeed(parseFloat(e.target.value))}
                        className="w-full h-2 bg-slate-200 dark:bg-slate-800 rounded-lg appearance-none cursor-pointer accent-blue-600"
                      />
                      <div className="flex justify-between text-[10px] font-mono text-slate-600 dark:text-slate-400">
                        <span>{isDe ? 'Geringe Ressource (P90)' : 'Low Resource (P90)'}</span>
                        <span>{isDe ? 'Hohe Ressource (P10)' : 'High Resource (P10)'}</span>
                      </div>
                    </div>

                    {/* PPA Power Price Slider */}
                    <div className="space-y-2">
                      <div className="flex justify-between text-xs">
                        <span className="font-semibold text-slate-700 dark:text-slate-300">
                          {isDe ? 'PPA-Abnahmetarif' : 'PPA Offtake Tariff'}
                        </span>
                        <span className="font-mono font-bold text-emerald-600 dark:text-emerald-400">
                          €{ppaPrice.toFixed(0)} / MWh
                        </span>
                      </div>
                      <input
                        type="range"
                        min="40"
                        max="110"
                        step="1"
                        aria-label={isDe ? 'PPA-Preis' : 'PPA price'}
                        value={ppaPrice}
                        onChange={(e) => setPpaPrice(parseFloat(e.target.value))}
                        className="w-full h-2 bg-slate-200 dark:bg-slate-800 rounded-lg appearance-none cursor-pointer accent-emerald-600"
                      />
                      <div className="flex justify-between text-[10px] font-mono text-slate-600 dark:text-slate-400">
                        <span>€40 / MWh</span>
                        <span>€110 / MWh</span>
                      </div>
                    </div>

                    {/* Curtailment & Grid Loss Slider */}
                    <div className="space-y-2">
                      <div className="flex justify-between text-xs">
                        <span className="font-semibold text-slate-700 dark:text-slate-300">
                          {isDe ? 'Netzabregelung & Verlustfaktor' : 'Grid Curtailment & Loss Factor'}
                        </span>
                        <span className="font-mono font-bold text-amber-600 dark:text-amber-400">
                          {curtailment.toFixed(1)}%
                        </span>
                      </div>
                      <input
                        type="range"
                        min="0.5"
                        max="12.0"
                        step="0.5"
                        aria-label={isDe ? 'Abregelung' : 'Curtailment'}
                        value={curtailment}
                        onChange={(e) => setCurtailment(parseFloat(e.target.value))}
                        className="w-full h-2 bg-slate-200 dark:bg-slate-800 rounded-lg appearance-none cursor-pointer accent-amber-600"
                      />
                      <div className="flex justify-between text-[10px] font-mono text-slate-600 dark:text-slate-400">
                        <span>{isDe ? 'Minimal (0,5 %)' : 'Minimal (0.5%)'}</span>
                        <span>{isDe ? 'Starker Netzengpass (12 %)' : 'Severe Bottleneck (12%)'}</span>
                      </div>
                    </div>
                  </div>

                  {/* Right: Live Dynamic Financial Metrics Canvas */}
                  <div className="lg:col-span-7 space-y-5">
                    {/* Visual Animated Wave Graph */}
                    <div className="bg-slate-50 dark:bg-slate-950 p-5 rounded-2xl border border-slate-200 dark:border-slate-800 relative overflow-hidden">
                      <div className="flex flex-wrap items-center justify-between text-xs mb-3 gap-2">
                        <span className="font-mono uppercase font-bold text-slate-700 dark:text-slate-300 flex items-center gap-1.5">
                          <TrendingUp className="w-4 h-4 text-blue-600 dark:text-sky-400" />
                          {isDe ? 'Simulierte Monatsproduktion & Erlöse' : 'Simulated Monthly Production & Revenue'}
                        </span>
                        <div className="flex items-center gap-3 font-mono text-xs">
                          <span className="text-blue-600 dark:text-sky-400 font-bold">
                            ⚡ {fmt(netGenGWh, 1)} GWh/{isDe ? 'a' : 'yr'}
                          </span>
                          <span className="text-emerald-600 dark:text-emerald-400 font-bold">
                            💰 {isDe ? `${fmt(annualRevenueM, 2)} Mio. €` : `€${fmt(annualRevenueM, 2)}M`}/{isDe ? 'a' : 'yr'}
                          </span>
                        </div>
                      </div>

                      {/* Power & Revenue Visualizer Bars */}
                      <div className="grid grid-cols-12 gap-1.5 h-36 items-end pt-5 pb-1">
                        {[0.65, 0.78, 0.92, 1.12, 1.28, 1.18, 0.88, 0.72, 0.82, 1.08, 1.22, 0.98].map((factor, i) => {
                          const monthRevM = annualRevenueM * factor / 11.63;
                          const monthGenGWh = netGenGWh * factor / 11.63;
                          // Smooth proportional scaling without ceiling clipping
                          const heightPct = Math.min(88, Math.max(16, (monthRevM / 3.4) * 65));

                          return (
                            <div key={i} className="h-full flex flex-col justify-end items-center gap-1 group relative">
                              {/* Hover Tooltip */}
                              <div className="opacity-0 group-hover:opacity-100 transition-opacity absolute -top-8 left-1/2 -translate-x-1/2 bg-slate-900 text-white text-[9px] font-mono px-1.5 py-0.5 rounded shadow pointer-events-none whitespace-nowrap z-20">
                                {isDe ? `${monthRevM.toFixed(2)} Mio. €` : `€${monthRevM.toFixed(2)}M`} · {monthGenGWh.toFixed(1)} GWh
                              </div>

                              <motion.div
                                animate={{ height: `${heightPct}%` }}
                                transition={{ duration: 0.25, ease: 'easeOut' }}
                                className={`w-full rounded-t transition-colors ${
                                  i === 4 || i === 10
                                    ? 'bg-emerald-500 dark:bg-emerald-400 shadow-2xs'
                                    : 'bg-blue-500/80 dark:bg-sky-500/80 hover:bg-blue-600 dark:hover:bg-sky-400'
                                }`}
                              />
                              <span className="text-[9px] font-mono text-slate-600 dark:text-slate-400">
                                M{i + 1}
                              </span>
                            </div>
                          );
                        })}
                      </div>
                      <div className="flex justify-between items-center text-[10px] font-mono text-slate-500 pt-2 border-t border-slate-200 dark:border-slate-800">
                        <span>{isDe ? 'Jan (Winter Schwachlast)' : 'Jan (Winter Off-peak)'}</span>
                        <span>{isDe ? 'Mai (Spitzenerzeugung)' : 'May (Peak Generation)'}</span>
                        <span>{isDe ? 'Dez (Jahresendertrag)' : 'Dec (Year-end Yield)'}</span>
                      </div>
                    </div>

                    {/* Output KPI Cards */}
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5">
                      <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800">
                        <span className="text-[11px] text-slate-500 dark:text-slate-400 block font-mono">
                          {isDe ? 'Jahreserlöse' : 'Annual Revenue'}
                        </span>
                        <div className="text-lg sm:text-2xl font-extrabold font-mono text-slate-900 dark:text-white mt-1">
                          {isDe ? `${fmt(annualRevenueM, 2)} Mio. €` : `€${fmt(annualRevenueM, 2)}M`}
                        </div>
                        <span className="text-[10px] text-emerald-600 dark:text-emerald-400 font-semibold font-mono">
                          {isDe ? 'Kontrahiertes PPA' : 'Contracted PPA'}
                        </span>
                      </div>

                      <div className="p-4 rounded-xl bg-blue-50/70 dark:bg-blue-950/60 border border-blue-200 dark:border-blue-800">
                        <span className="text-[11px] text-blue-700 dark:text-sky-300 block font-mono font-bold">
                          {isDe ? 'Projekt-Eigenkapital-IRR' : 'Project Equity IRR'}
                        </span>
                        <div className="text-lg sm:text-2xl font-extrabold font-mono text-blue-700 dark:text-sky-400 mt-1">
                          {fmt(calculatedIRR, 2)}%
                        </div>
                        <span className="text-[10px] text-slate-500 dark:text-slate-400 font-mono">
                          {isDe ? 'P50 Basisfall' : 'P50 Base Case'}
                        </span>
                      </div>

                      <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800">
                        <span className="text-[11px] text-slate-500 dark:text-slate-400 block font-mono">
                          {isDe ? 'Mindest-DSCR' : 'Min Debt DSCR'}
                        </span>
                        <div className="text-lg sm:text-2xl font-extrabold font-mono text-slate-900 dark:text-white mt-1">
                          {fmt(calculatedDSCR, 2)}x
                        </div>
                        <span className="text-[10px] text-emerald-600 dark:text-emerald-400 font-semibold font-mono">
                          {isDe ? 'Beispielschwelle: 1,20x' : 'Illustrative threshold: 1.20x'}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}

            {/* ========================================================================= */}
            {/* MODE 3: DOCUMENT-TO-EXCEL SCANNER */}
            {/* ========================================================================= */}
            {activeMode === 'scanner' && (
              <motion.div key="scanner" initial={{opacity: 0, y: 15}} animate={{opacity: 1, y: 0}} exit={{opacity: 0, y: -15}} transition={{duration: 0.35}}>
                <DocumentScanner />
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
};
