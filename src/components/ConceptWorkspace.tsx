/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useMemo } from 'react';
import {
  INITIAL_ASSUMPTIONS,
  calculateDeterministicDCF,
  DCFCalculationResult,
} from '../data/mockValuation';
import { ValuationAssumption, ModalType } from '../types';
import { BenchmarkWidget } from './BenchmarkWidget';
import {
  FileText,
  ShieldCheck,
  Lock,
  Unlock,
  CheckCircle2,
  AlertCircle,
  TrendingUp,
  FileSpreadsheet,
  Layers,
  Sparkles,
  ChevronRight,
  Sliders,
  RotateCcw,
  BookOpen,
  Info,
  CalendarCheck,
  GitCompare,
  AlertTriangle,
  HelpCircle,
  BarChart3,
} from 'lucide-react';
import { trackEvent } from '../services/clarity';
import { useLanguage } from '../i18n/LanguageContext';

interface ConceptWorkspaceProps {
  onOpenModal: (modal: ModalType) => void;
}

export const ConceptWorkspace: React.FC<ConceptWorkspaceProps> = ({ onOpenModal }) => {
  const { t, language } = useLanguage();
  const isDe = language === 'DE';

  const [assumptions, setAssumptions] = useState<ValuationAssumption[]>(INITIAL_ASSUMPTIONS);
  const [selectedId, setSelectedId] = useState<string>('ncf_p50');
  const [scenarioMode, setScenarioMode] = useState<'p50' | 'p90'>('p50');
  const [activeTab, setActiveTab] = useState<'assumptions' | 'conflict-resolver' | 'dcf-waterfall' | 'missing-inputs' | 'benchmarks'>('assumptions');

  // Interactive Conflict Resolver state
  const [resolvedConflictSource, setResolvedConflictSource] = useState<'contract' | 'advisor'>('contract');

  const currentAssumption =
    assumptions.find((a) => a.id === selectedId) || assumptions[0];

  // Localized assumption display helper
  const getLocalizedAssumption = (a: ValuationAssumption) => {
    if (!isDe) return a;
    const deData: Record<string, {
      name: string;
      category: string;
      documentName: string;
      documentType: string;
      excerpt: string;
      crossCheckBenchmark: string;
      valuationImpactHigh: string;
    }> = {
      ncf_p50: {
        name: 'Netto-Kapazitätsfaktor (P50)',
        category: 'Ertrag & Produktion',
        documentName: 'Unabhängiges Ertragsgutachten (DNV-GL)',
        documentType: 'Ertragsgutachten',
        excerpt: 'Basierend auf 10-jährigen kalibrierten LiDAR-Messungen und Geländerauheitsmodellen beträgt die P50-Nettoproduktion 146,3 GWh/a, was einem betrieblichen Netto-Kapazitätsfaktor von 34,8 % nach Parkabschattungsverlusten (6,4 %) und Übertragungsverlusten (1,8 %) entspricht.',
        crossCheckBenchmark: 'Regionaler Onshore-Schnitt Klasse IIA: 33,2 % – 35,4 %',
        valuationImpactHigh: '+1,4 % Equity-IRR (2,1 Mio. € NPV)',
      },
      merchant_power_price: {
        name: 'Durchschnittlicher Capture-Preis (J1-J10)',
        category: 'Erlöse & Vermarktung',
        documentName: 'Pexapark Strompreisbericht & PPA-Term-Sheet',
        documentType: 'PPA-Vertrag',
        excerpt: '10-jähriges Pay-as-Produced Corporate-PPA für 70 % der Nominalerzeugung bei festen 72,0 €/MWh. Merchant-Capture-Abschlag für verbleibende 30 % mit 88 % des Baseload-Terminmarkts modelliert (projiziert 60,3 €/MWh im Schnitt).',
        crossCheckBenchmark: '10-Jahres-Corporate-PPA-Index: 66,0 – 71,5 €/MWh',
        valuationImpactHigh: '+1,9 % Equity-IRR (2,8 Mio. € NPV)',
      },
      fixed_opex: {
        name: 'Fixe Betriebskosten (O&M + Pacht)',
        category: 'CapEx & OpEx',
        documentName: 'Turbinen-TSA/SMA-Term-Sheet & Pachtvertrag',
        documentType: 'Finanzmodell',
        excerpt: '15-jähriger Vollwartungsvertrag mit OEM indexiert an HICP bei 28,2 k€/MW/a. Kommunale Abgaben, Pachtverträge (5,8 k€/MW/a), Versicherung und Betriebsführung ergeben 38,5 k€/MW/a Betriebsaufwand.',
        crossCheckBenchmark: 'Europäischer Benchmark: 36,0 – 41,0 k€/MW/a',
        valuationImpactHigh: '-0,7 % Equity-IRR (-1,0 Mio. € NPV)',
      },
      debt_gearing: {
        name: 'Fremdkapitalquote (Senior Gearing)',
        category: 'Finanzierung & Bewertung',
        documentName: 'Indikatives Kreditfinanzierungs-Term-Sheet (Nordic Infrastructure Bank)',
        documentType: 'Finanzmodell',
        excerpt: 'Non-Recourse-Projektfinanzierung dimensioniert auf Mindest-DSCR von 1,25x (P90-Fall) oder max. 70,0 % Debt/Capex. Marge 210 bps über 6M Euribor mit 18-jährigem Tilgungsplan.',
        crossCheckBenchmark: 'Projektfinanzierungsstandard: 65 % – 72 % Gearing (1,25x DSCR)',
        valuationImpactHigh: '+1,1 % Equity-IRR (+0,6 Mio. € Equity-NPV)',
      },
    };

    const extra = deData[a.id];
    if (!extra) return a;

    return {
      ...a,
      name: extra.name,
      category: extra.category,
      crossCheckBenchmark: extra.crossCheckBenchmark,
      valuationImpactHigh: extra.valuationImpactHigh,
      primarySource: {
        ...a.primarySource,
        documentName: extra.documentName,
        documentType: extra.documentType,
        excerpt: extra.excerpt,
      },
    };
  };

  const localizedCurrent = useMemo(() => getLocalizedAssumption(currentAssumption), [currentAssumption, isDe]);

  // Calculate deterministic results dynamically (memoized to avoid unneeded CPU load)
  const baseDcf: DCFCalculationResult = useMemo(
    () => calculateDeterministicDCF(48.0, assumptions),
    [assumptions]
  );

  // If P90 scenario is active, adjust displayed metrics
  const activeIrr = scenarioMode === 'p50' ? baseDcf.equityIRR : baseDcf.p90EquityIRR;
  const activeEv = scenarioMode === 'p50' ? baseDcf.enterpriseValue : Number((baseDcf.enterpriseValue * 0.91).toFixed(1));
  const activeDscr = scenarioMode === 'p50' ? baseDcf.dscrMin : Number((baseDcf.dscrMin * 0.88).toFixed(2));

  const approvedCount = useMemo(
    () => assumptions.filter((a) => a.status === 'approved' || a.status === 'overridden').length,
    [assumptions]
  );
  const isAllReviewed = approvedCount === assumptions.length;

  const handleValueChange = (newValue: number) => {
    setAssumptions((prev) =>
      prev.map((item) =>
        item.id === selectedId
          ? {
              ...item,
              currentValue: Number(newValue.toFixed(2)),
              status: newValue === item.originalValue ? item.status : 'overridden',
            }
          : item
      )
    );
    trackEvent('assumption_adjusted', { assumption: currentAssumption.name, value: newValue });
  };

  const handleApprove = () => {
    setAssumptions((prev) =>
      prev.map((item) =>
        item.id === selectedId ? { ...item, status: 'approved' } : item
      )
    );
    trackEvent('assumption_approved', { assumption: currentAssumption.name });
  };

  const handleResetAssumption = () => {
    setAssumptions((prev) =>
      prev.map((item) =>
        item.id === selectedId
          ? { ...item, currentValue: item.originalValue, status: 'pending', userOverrideNote: '' }
          : item
      )
    );
  };

  return (
    <section
      id="concept-section"
      className="py-14 lg:py-20 bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 border-b border-slate-200 dark:border-slate-800 relative transition-colors duration-200"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-10">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-50 dark:bg-blue-950/80 border border-blue-200 dark:border-blue-800 text-blue-700 dark:text-sky-400 text-xs font-semibold uppercase tracking-wider mb-2.5">
            <Sparkles className="w-3.5 h-3.5" />
            <span>{t.workspace.eyebrow}</span>
          </div>
          <h2 className="text-2xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight mb-3">
            {t.workspace.headline}
          </h2>
          <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300">
            {t.workspace.subline}
          </p>
        </div>

        {/* Workspace Shell */}
        <div
          id="valuation-workspace-container"
          className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-md overflow-hidden transition-colors"
        >
          {/* Workspace Top Bar */}
          <div className="bg-slate-100/90 dark:bg-slate-950 px-4 sm:px-6 py-3 border-b border-slate-200 dark:border-slate-800 flex flex-wrap items-center justify-between gap-3 text-xs sm:text-sm">
            <div className="flex items-center gap-2.5">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <span className="font-mono text-slate-700 dark:text-slate-300 font-semibold uppercase tracking-wider text-xs">
                {t.workspace.assetLabel}
              </span>
              <span className="text-slate-400 hidden sm:inline-block">·</span>
              <span className="text-slate-500 dark:text-slate-400 hidden sm:inline-block text-xs">
                {t.workspace.assetTag}
              </span>
            </div>

            {/* Top Scenario & Governance Controls */}
            <div className="flex items-center gap-2.5">
              {/* Scenario Toggle */}
              <div className="inline-flex items-center p-0.5 rounded-lg bg-slate-200 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 text-xs font-semibold">
                <button
                  onClick={() => {
                    setScenarioMode('p50');
                    trackEvent('scenario_switch', { mode: 'p50' });
                  }}
                  className={`px-2.5 py-1 rounded-md transition-all cursor-pointer ${
                    scenarioMode === 'p50'
                      ? 'bg-blue-600 text-white shadow-xs'
                      : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                  }`}
                >
                  {t.workspace.p50Btn}
                </button>
                <button
                  onClick={() => {
                    setScenarioMode('p90');
                    trackEvent('scenario_switch', { mode: 'p90' });
                  }}
                  className={`px-2.5 py-1 rounded-md transition-all cursor-pointer ${
                    scenarioMode === 'p90'
                      ? 'bg-amber-600 text-white shadow-xs'
                      : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                  }`}
                >
                  {t.workspace.p90Btn}
                </button>
              </div>

              {/* Review Gate Badge */}
              <div
                className={`flex items-center gap-1.5 px-2.5 py-1 rounded-md border text-xs font-semibold ${
                  isAllReviewed
                    ? 'bg-emerald-50 dark:bg-emerald-950/80 text-emerald-700 dark:text-emerald-300 border-emerald-200 dark:border-emerald-700'
                    : 'bg-amber-50 dark:bg-amber-950/70 text-amber-700 dark:text-amber-300 border-amber-200 dark:border-amber-800'
                }`}
              >
                {isAllReviewed ? (
                  <>
                    <Unlock className="w-3.5 h-3.5" />
                    <span>{t.workspace.approvedStatus}</span>
                  </>
                ) : (
                  <>
                    <Lock className="w-3.5 h-3.5" />
                    <span>{t.workspace.governanceGate}: {assumptions.length - approvedCount} {t.workspace.pendingReview}</span>
                  </>
                )}
              </div>
            </div>
          </div>

          {/* Subheader / Tabs Bar */}
          <div className="bg-slate-50 dark:bg-slate-900 px-4 sm:px-6 py-2 border-b border-slate-200 dark:border-slate-800 flex flex-wrap items-center justify-between gap-2.5 text-xs sm:text-sm">
            <div className="flex items-center gap-1 overflow-x-auto py-1">
              <button
                onClick={() => setActiveTab('assumptions')}
                className={`px-3 py-1.5 rounded-md font-semibold transition-colors cursor-pointer shrink-0 ${
                  activeTab === 'assumptions'
                    ? 'bg-blue-600 text-white shadow-xs'
                    : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200 hover:bg-slate-200/60 dark:hover:bg-slate-800'
                }`}
              >
                {t.workspace.tabs.assumptions} ({approvedCount}/{assumptions.length})
              </button>
              <button
                onClick={() => setActiveTab('conflict-resolver')}
                className={`px-3 py-1.5 rounded-md font-semibold transition-colors cursor-pointer shrink-0 inline-flex items-center gap-1.5 ${
                  activeTab === 'conflict-resolver'
                    ? 'bg-blue-600 text-white shadow-xs'
                    : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200 hover:bg-slate-200/60 dark:hover:bg-slate-800'
                }`}
              >
                <GitCompare className="w-3.5 h-3.5 text-amber-500" />
                <span>{t.workspace.tabs.conflictResolver}</span>
              </button>
              <button
                onClick={() => setActiveTab('dcf-waterfall')}
                className={`px-3 py-1.5 rounded-md font-semibold transition-colors cursor-pointer shrink-0 ${
                  activeTab === 'dcf-waterfall'
                    ? 'bg-blue-600 text-white shadow-xs'
                    : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200 hover:bg-slate-200/60 dark:hover:bg-slate-800'
                }`}
              >
                {t.workspace.tabs.dcfWaterfall}
              </button>
              <button
                onClick={() => setActiveTab('missing-inputs')}
                className={`px-3 py-1.5 rounded-md font-semibold transition-colors cursor-pointer shrink-0 inline-flex items-center gap-1 ${
                  activeTab === 'missing-inputs'
                    ? 'bg-blue-600 text-white shadow-xs'
                    : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200 hover:bg-slate-200/60 dark:hover:bg-slate-800'
                }`}
              >
                <span>{t.workspace.tabs.missingInputs}</span>
                <span className="text-[10px] bg-red-100 dark:bg-red-950 text-red-700 dark:text-red-300 px-1.5 py-0.2 rounded font-mono">
                  5
                </span>
              </button>
              <button
                onClick={() => setActiveTab('benchmarks')}
                className={`px-3 py-1.5 rounded-md font-semibold transition-colors cursor-pointer shrink-0 inline-flex items-center gap-1.5 ${
                  activeTab === 'benchmarks'
                    ? 'bg-blue-600 text-white shadow-xs'
                    : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200 hover:bg-slate-200/60 dark:hover:bg-slate-800'
                }`}
              >
                <BarChart3 className="w-3.5 h-3.5 text-blue-500 dark:text-sky-400" />
                <span>{t.workspace.tabs.benchmarks}</span>
              </button>
            </div>

            {/* Export Actions */}
            <div className="flex items-center gap-2">
              <button
                onClick={() => onOpenModal('export-preview')}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md bg-white dark:bg-slate-800 hover:bg-slate-50 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 border border-slate-300 dark:border-slate-700 text-xs font-semibold transition-colors cursor-pointer shadow-2xs"
              >
                <FileSpreadsheet className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
                <span>{t.workspace.exportExcelBtn}</span>
              </button>
              <button
                onClick={() => onOpenModal('case-summary')}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md bg-white dark:bg-slate-800 hover:bg-slate-50 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 border border-slate-300 dark:border-slate-700 text-xs font-semibold transition-colors cursor-pointer shadow-2xs"
              >
                <FileText className="w-3.5 h-3.5 text-blue-600 dark:text-sky-400" />
                <span>{t.workspace.generateMemoBtn}</span>
              </button>
            </div>
          </div>

          {/* Main Content Area */}
          <div className="p-4 sm:p-6 lg:p-7 grid grid-cols-1 lg:grid-cols-12 gap-5">
            {/* Left Sidebar: Assumption Selector (Available in all tabs) */}
            <div className="lg:col-span-4 space-y-2.5">
              <div className="flex items-center justify-between text-xs text-slate-500 dark:text-slate-400 uppercase font-mono tracking-wider mb-1 px-1">
                <span>{isDe ? 'Wesentliche Deal-Parameter' : 'Material Deal Parameters'}</span>
                <span>{isDe ? 'Prüfstatus' : 'Audit Status'}</span>
              </div>

              {assumptions.map((item) => {
                const locItem = getLocalizedAssumption(item);
                const isSelected = item.id === selectedId;
                return (
                  <button
                    key={item.id}
                    id={`assumption-tab-${item.id}`}
                    onClick={() => setSelectedId(item.id)}
                    className={`w-full text-left p-3 rounded-xl border transition-all cursor-pointer ${
                      isSelected
                        ? 'bg-blue-50/70 dark:bg-slate-800 border-blue-500 dark:border-sky-500 shadow-xs ring-1 ring-blue-500/30'
                        : 'bg-white dark:bg-slate-900/80 border-slate-200 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700 hover:bg-slate-50/60 dark:hover:bg-slate-800'
                    }`}
                  >
                    <div className="flex items-start justify-between gap-2 mb-1">
                      <span className="text-xs text-blue-600 dark:text-sky-400 font-mono font-medium">
                        {locItem.category}
                      </span>
                      {item.status === 'approved' ? (
                        <span className="inline-flex items-center gap-1 text-[11px] font-semibold bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-400 px-1.5 py-0.5 rounded border border-emerald-200 dark:border-emerald-800">
                          <CheckCircle2 className="w-3 h-3" />
                          {isDe ? 'Freigegeben' : 'Approved'}
                        </span>
                      ) : item.status === 'overridden' ? (
                        <span className="inline-flex items-center gap-1 text-[11px] font-semibold bg-blue-100 dark:bg-blue-950 text-blue-700 dark:text-sky-300 px-1.5 py-0.5 rounded border border-blue-200 dark:border-sky-800">
                          <Sliders className="w-3 h-3" />
                          {isDe ? 'Überschrieben' : 'Overridden'}
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1 text-[11px] font-semibold bg-amber-100 dark:bg-amber-950 text-amber-700 dark:text-amber-300 px-1.5 py-0.5 rounded border border-amber-200 dark:border-amber-800">
                          <AlertCircle className="w-3 h-3" />
                          {isDe ? 'Prüfung erford.' : 'Review Req.'}
                        </span>
                      )}
                    </div>

                    <div className="flex items-baseline justify-between">
                      <span className="text-sm font-semibold text-slate-800 dark:text-slate-200">
                        {locItem.name}
                      </span>
                      <span className="font-mono text-sm font-bold text-slate-900 dark:text-white">
                        {item.currentValue} {item.unit}
                      </span>
                    </div>

                    <div className="mt-1 text-[11px] text-slate-500 dark:text-slate-400 flex items-center justify-between">
                      <span>{isDe ? 'Bandbreite' : 'Range'}: {item.minRange} - {item.maxRange} {item.unit}</span>
                      <span className="text-slate-400 dark:text-slate-500">{item.primarySource.pages}</span>
                    </div>
                  </button>
                );
              })}

              {/* Dynamic Live Metric Tile */}
              <div className="p-3.5 rounded-xl bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-xs space-y-1.5">
                <div className="flex items-center justify-between text-slate-600 dark:text-slate-400 font-semibold">
                  <span>{isDe ? `Aktuelle ${scenarioMode.toUpperCase()}-Bewertung:` : `Current ${scenarioMode.toUpperCase()} Valuation:`}</span>
                  <span className="font-mono text-blue-600 dark:text-sky-400 font-bold">
                    {activeIrr}% IRR (€{activeEv}M EV)
                  </span>
                </div>
                <p className="text-slate-500 dark:text-slate-400 text-[11px] leading-relaxed">
                  {isDe
                    ? 'Deterministische Berechnung: Jede Parameteränderung fließt sofort in die 25-jährige Cashflow-Rechnung ein.'
                    : 'Calculations are deterministic: any slider tweak instantly propagates through the 25-year waterfall below.'}
                </p>
              </div>
            </div>

            {/* Right Pane: Switched View according to activeTab */}
            <div className="lg:col-span-8">
              {activeTab === 'assumptions' && (
                <div className="bg-slate-50/70 dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-700/80 p-5 space-y-5">
                  {/* Assumption Top Details */}
                  <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-200 dark:border-slate-800 pb-3.5">
                    <div>
                      <span className="text-xs font-mono uppercase text-blue-600 dark:text-sky-400 tracking-wider">
                        {localizedCurrent.category} · {isDe ? 'Parameter-Prüfung' : 'Parameter Audit'}
                      </span>
                      <h3 className="text-lg font-bold text-slate-900 dark:text-white mt-0.5">
                        {localizedCurrent.name}
                      </h3>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-xs text-slate-500 dark:text-slate-400">{isDe ? 'Konfidenz:' : 'Confidence:'}</span>
                      <span
                        className={`text-xs px-2.5 py-0.5 rounded font-bold border ${
                          currentAssumption.primarySource.sourceConfidence === 'high'
                            ? 'bg-emerald-100 dark:bg-emerald-950/80 text-emerald-800 dark:text-emerald-300 border-emerald-300 dark:border-emerald-800'
                            : 'bg-amber-100 dark:bg-amber-950/80 text-amber-800 dark:text-amber-300 border-amber-300 dark:border-amber-800'
                        }`}
                      >
                        {currentAssumption.primarySource.sourceConfidence === 'high'
                          ? (isDe ? 'HOCH' : 'HIGH')
                          : (isDe ? 'MITTEL' : 'MEDIUM')}
                      </span>
                    </div>
                  </div>

                  {/* Slider & Value Control */}
                  <div className="bg-white dark:bg-slate-950 rounded-xl p-4 border border-slate-200 dark:border-slate-800 space-y-3 shadow-2xs">
                    <div className="flex flex-wrap items-baseline justify-between gap-2">
                      <label className="text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider">
                        {isDe ? 'Parameter anpassen & Sensitivität prüfen' : 'Adjust Parameter & Test Sensitivity'}
                      </label>
                      <span className="text-xs text-slate-500 dark:text-slate-400">
                        {isDe ? 'Empfohlene Bandbreite:' : 'Suggested Range:'}{' '}
                        <span className="font-mono text-blue-600 dark:text-sky-400 font-bold">
                          {currentAssumption.minRange} – {currentAssumption.maxRange} {currentAssumption.unit}
                        </span>
                      </span>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-12 gap-3 items-center">
                      <div className="sm:col-span-8 space-y-1">
                        <input
                          id="assumption-slider"
                          type="range"
                          min={currentAssumption.minRange}
                          max={currentAssumption.maxRange}
                          step={currentAssumption.step}
                          value={currentAssumption.currentValue}
                          onChange={(e) => handleValueChange(parseFloat(e.target.value))}
                          className="w-full h-2 bg-slate-200 dark:bg-slate-800 rounded-lg appearance-none cursor-pointer accent-blue-600"
                        />
                        <div className="flex justify-between text-[11px] font-mono text-slate-500 dark:text-slate-400">
                          <span>Min: {currentAssumption.minRange} {currentAssumption.unit}</span>
                          <span className="text-blue-600 dark:text-sky-400 font-bold">
                            {isDe ? 'Basis:' : 'Base:'} {currentAssumption.originalValue} {currentAssumption.unit}
                          </span>
                          <span>Max: {currentAssumption.maxRange} {currentAssumption.unit}</span>
                        </div>
                      </div>

                      <div className="sm:col-span-4 flex items-center justify-end gap-2">
                        <div className="bg-slate-100 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 px-3 py-1.5 rounded-lg text-right w-full font-mono">
                          <span className="text-lg font-extrabold text-slate-900 dark:text-white">
                            {currentAssumption.currentValue}
                          </span>
                          <span className="text-xs text-slate-500 dark:text-slate-400 ml-1">
                            {currentAssumption.unit}
                          </span>
                        </div>
                        {currentAssumption.currentValue !== currentAssumption.originalValue && (
                          <button
                            onClick={handleResetAssumption}
                            title={isDe ? 'Auf Quelldokument-Wert zurücksetzen' : 'Reset to source document value'}
                            className="p-2 rounded-lg bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-600 dark:text-slate-300 border border-slate-300 dark:border-slate-700 cursor-pointer"
                          >
                            <RotateCcw className="w-4 h-4" />
                          </button>
                        )}
                      </div>
                    </div>

                    <div className="flex flex-wrap items-center justify-between text-xs pt-2 border-t border-slate-200 dark:border-slate-800 text-slate-500 dark:text-slate-400">
                      <span>{isDe ? 'Bewertungssensitivität:' : 'Valuation Sensitivity:'}</span>
                      <span className="font-mono text-emerald-600 dark:text-emerald-400 font-semibold">
                        {localizedCurrent.valuationImpactHigh}
                      </span>
                    </div>
                  </div>

                  {/* Provenance Box with Document Excerpt */}
                  <div className="space-y-2.5">
                    <div className="flex items-center justify-between text-xs font-bold text-slate-700 dark:text-slate-300">
                      <div className="flex items-center gap-1.5">
                        <BookOpen className="w-4 h-4 text-blue-600 dark:text-sky-400" />
                        <span>{isDe ? 'Quellenbeleg & Dokumentenauszug' : 'Source Citation & Document Excerpt'}</span>
                      </div>
                      <span className="inline-flex items-center gap-1 text-[11px] bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 px-2 py-0.5 rounded border border-slate-300 dark:border-slate-700">
                        <CalendarCheck className="w-3 h-3 text-emerald-600 dark:text-emerald-400" />
                        {isDe ? 'Geprüft:' : 'Verified:'} {currentAssumption.primarySource.extractedDate}
                      </span>
                    </div>

                    <div className="bg-white dark:bg-slate-950 rounded-xl p-4 border-l-4 border-l-blue-600 dark:border-l-sky-500 border border-slate-200 dark:border-slate-800 space-y-2 shadow-2xs">
                      <div className="flex items-center justify-between text-xs">
                        <span className="font-bold text-slate-800 dark:text-slate-200">
                          {localizedCurrent.primarySource.documentName}
                        </span>
                        <span className="font-mono text-blue-700 dark:text-sky-400 text-xs bg-blue-50 dark:bg-sky-950/80 px-2 py-0.5 rounded border border-blue-200 dark:border-sky-800 font-semibold">
                          {localizedCurrent.primarySource.pages}
                        </span>
                      </div>
                      <p className="text-xs text-slate-700 dark:text-slate-300 italic font-mono leading-relaxed bg-slate-50 dark:bg-slate-900/80 p-3 rounded-lg border border-slate-200 dark:border-slate-800">
                        “{localizedCurrent.primarySource.excerpt}”
                      </p>
                      <div className="flex flex-wrap items-center justify-between text-[11px] text-slate-500 dark:text-slate-400 pt-0.5">
                        <span>{isDe ? 'Benchmark:' : 'Benchmark:'} {localizedCurrent.crossCheckBenchmark}</span>
                        <span>{isDe ? 'Typ:' : 'Type:'} {localizedCurrent.primarySource.documentType}</span>
                      </div>
                    </div>
                  </div>

                  {/* Sign-off Action Bar */}
                  <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-2 border-t border-slate-200 dark:border-slate-800">
                    <div className="text-xs text-slate-600 dark:text-slate-400">
                      {isDe ? 'Governance-Gate: ' : 'Governance Gate: '}
                      <span className="font-semibold text-slate-800 dark:text-slate-200">
                        {currentAssumption.status === 'approved'
                          ? (isDe ? 'Freigegeben für IC-Modell' : 'Approved for Investment Committee model')
                          : currentAssumption.status === 'overridden'
                          ? (isDe ? 'Benutzerdefinierte Anpassung aktiv' : 'Custom Override Applied')
                          : (isDe ? 'Analysten-Freigabe erforderlich' : 'Requires Analyst Sign-Off')}
                      </span>
                    </div>

                    <button
                      id="btn-approve-assumption"
                      onClick={handleApprove}
                      className={`w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-2 rounded-lg text-xs font-bold transition-all cursor-pointer shadow-xs ${
                        currentAssumption.status === 'approved'
                          ? 'bg-emerald-600 text-white'
                          : 'bg-blue-600 hover:bg-blue-700 active:bg-blue-800 text-white dark:bg-blue-600 dark:hover:bg-blue-500'
                      }`}
                    >
                      <CheckCircle2 className="w-4 h-4" />
                      <span>{currentAssumption.status === 'approved' ? (isDe ? 'Freigegeben ✓' : 'Approved ✓') : (isDe ? 'Für Modell freigeben' : 'Approve for Model')}</span>
                    </button>
                  </div>
                </div>
              )}

              {activeTab === 'conflict-resolver' && (
                <div className="bg-slate-50/70 dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-700/80 p-5 space-y-4">
                  <div className="flex items-center justify-between border-b border-slate-200 dark:border-slate-800 pb-3">
                    <div>
                      <span className="text-xs font-mono uppercase text-amber-600 dark:text-amber-400 tracking-wider font-semibold">
                        {isDe ? 'Datenraum-Konflikt erkannt' : 'Data Room Conflict Detected'}
                      </span>
                      <h3 className="text-lg font-bold text-slate-900 dark:text-white mt-0.5">
                        {isDe ? 'PPA-Mindestpreis vs. Berater-Ertragskurve' : 'PPA Floor Price vs. Technical Advisor Curve'}
                      </h3>
                    </div>
                    <span className="text-xs bg-amber-100 dark:bg-amber-950 text-amber-800 dark:text-amber-300 px-2.5 py-1 rounded font-mono font-bold border border-amber-300 dark:border-amber-800">
                      Delta: €3.5 / MWh
                    </span>
                  </div>

                  <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                    {isDe
                      ? 'Zwei Quellen im Datenraum weisen abweichende Werte auf. Wählen Sie die zu übernehmende Datenquelle oder definieren Sie eine Anpassung:'
                      : 'Two data room sources present divergent figures. Choose which source to adopt or specify a blended analyst override:'}
                  </p>

                  {/* Conflict Choice Cards */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                    {/* Source A */}
                    <div
                      onClick={() => setResolvedConflictSource('contract')}
                      className={`p-4 rounded-xl border cursor-pointer transition-all ${
                        resolvedConflictSource === 'contract'
                          ? 'bg-blue-50 dark:bg-blue-950/40 border-blue-600 dark:border-blue-500 ring-2 ring-blue-500/30'
                          : 'bg-white dark:bg-slate-950 border-slate-200 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700'
                      }`}
                    >
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-xs font-bold text-slate-800 dark:text-slate-200">
                          {isDe ? 'Quelle A: Gezeichnetes Term Sheet' : 'Source A: Executed Term Sheet'}
                        </span>
                        <span className="text-xs font-mono font-bold text-blue-600 dark:text-sky-400">
                          €72.0 / MWh
                        </span>
                      </div>
                      <p className="text-xs text-slate-600 dark:text-slate-400 mb-2 leading-relaxed">
                        {isDe
                          ? '„Gezeichnetes Corporate-PPA für 70 % der Nominalleistung mit Statkraft über 10 Jahre.“'
                          : '“Signed Corporate PPA covering 70% nominal output with Statkraft for 10-year term.”'}
                      </p>
                      <div className="text-[11px] text-slate-500 flex items-center justify-between pt-2 border-t border-slate-200 dark:border-slate-800">
                        <span>Doc: Contract_PPA_v4.pdf</span>
                        <span className="font-mono text-emerald-600 dark:text-emerald-400 font-semibold">10.3% IRR</span>
                      </div>
                    </div>

                    {/* Source B */}
                    <div
                      onClick={() => setResolvedConflictSource('advisor')}
                      className={`p-4 rounded-xl border cursor-pointer transition-all ${
                        resolvedConflictSource === 'advisor'
                          ? 'bg-blue-50 dark:bg-blue-950/40 border-blue-600 dark:border-blue-500 ring-2 ring-blue-500/30'
                          : 'bg-white dark:bg-slate-950 border-slate-200 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700'
                      }`}
                    >
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-xs font-bold text-slate-800 dark:text-slate-200">
                          {isDe ? 'Quelle B: Pexapark Berater-Prognose' : 'Source B: Advisor Pexapark Forecast'}
                        </span>
                        <span className="text-xs font-mono font-bold text-amber-600 dark:text-amber-400">
                          €68.5 / MWh
                        </span>
                      </div>
                      <p className="text-xs text-slate-600 dark:text-slate-400 mb-2 leading-relaxed">
                        {isDe
                          ? '„Pexapark European Index mit 12 % Kannibalisierungsabschlag auf die verbleibende Merchant-Erzeugung.“'
                          : '“Pexapark European Index factoring 12% wind cannibalization discount across merchant residual.”'}
                      </p>
                      <div className="text-[11px] text-slate-500 flex items-center justify-between pt-2 border-t border-slate-200 dark:border-slate-800">
                        <span>Doc: Market_Report_Q2.pdf</span>
                        <span className="font-mono text-amber-600 dark:text-amber-400 font-semibold">9.8% IRR</span>
                      </div>
                    </div>
                  </div>

                  <div className="p-3 bg-white dark:bg-slate-950 rounded-lg border border-slate-200 dark:border-slate-800 flex items-center justify-between text-xs">
                    <span className="text-slate-600 dark:text-slate-400">
                      {isDe ? 'Ausgewählter Basisfall: ' : 'Selected Base Case: '}
                      <strong className="text-slate-900 dark:text-white">
                        {resolvedConflictSource === 'contract'
                          ? (isDe ? 'Gezeichnetes Term Sheet (72,0 €/MWh)' : 'Executed Term Sheet (€72.0/MWh)')
                          : (isDe ? 'Pexapark Berater (68,5 €/MWh)' : 'Pexapark Advisor (€68.5/MWh)')}
                      </strong>
                    </span>
                    <span className="font-mono text-blue-600 dark:text-sky-400 font-semibold">
                      {isDe ? 'Prüfvermerk protokolliert ✓' : 'Audit Note Logged ✓'}
                    </span>
                  </div>
                </div>
              )}

              {activeTab === 'dcf-waterfall' && (
                <div className="bg-slate-50/70 dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-700/80 p-5 space-y-4">
                  <div className="flex items-center justify-between border-b border-slate-200 dark:border-slate-800 pb-3">
                    <div>
                      <span className="text-xs font-mono uppercase text-blue-600 dark:text-sky-400 tracking-wider font-semibold">
                        {isDe ? `Deterministische Berechnung (${scenarioMode.toUpperCase()})` : `Deterministic Calculation Outputs (${scenarioMode.toUpperCase()})`}
                      </span>
                      <h3 className="text-lg font-bold text-slate-900 dark:text-white mt-0.5">
                        {isDe ? '25-Jahre Cashflow-Wasserfall des Projekts' : '25-Year Asset Cash Flow Waterfall'}
                      </h3>
                    </div>
                    <span className="text-xs text-slate-500 dark:text-slate-400 font-mono">
                      Cap: 48.0 MW
                    </span>
                  </div>

                  {/* Top Key Metrics Grid */}
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                    <div className="bg-white dark:bg-slate-950 p-3 rounded-xl border border-slate-200 dark:border-slate-800 shadow-2xs">
                      <span className="text-xs text-slate-500 dark:text-slate-400">Equity IRR</span>
                      <div className="text-xl font-mono font-extrabold text-blue-600 dark:text-sky-400 mt-0.5">
                        {activeIrr}%
                      </div>
                      <span className="text-[10px] text-slate-400">{isDe ? 'Ziel-Hurdle: 8,5 %' : 'Target hurdle: 8.5%'}</span>
                    </div>

                    <div className="bg-white dark:bg-slate-950 p-3 rounded-xl border border-slate-200 dark:border-slate-800 shadow-2xs">
                      <span className="text-xs text-slate-500 dark:text-slate-400">{isDe ? 'Unternehmenswert (EV)' : 'Enterprise Value'}</span>
                      <div className="text-xl font-mono font-extrabold text-emerald-600 dark:text-emerald-400 mt-0.5">
                        €{activeEv}M
                      </div>
                      <span className="text-[10px] text-slate-400">{isDe ? 'Ungehebelter DCF' : 'Ungeared DCF'}</span>
                    </div>

                    <div className="bg-white dark:bg-slate-950 p-3 rounded-xl border border-slate-200 dark:border-slate-800 shadow-2xs">
                      <span className="text-xs text-slate-500 dark:text-slate-400">{isDe ? 'Mindest-DSCR' : 'Minimum DSCR'}</span>
                      <div className="text-xl font-mono font-extrabold text-purple-600 dark:text-purple-400 mt-0.5">
                        {activeDscr}x
                      </div>
                      <span className="text-[10px] text-slate-400">{isDe ? 'Covenant: 1,25x' : 'Covenant: 1.25x'}</span>
                    </div>

                    <div className="bg-white dark:bg-slate-950 p-3 rounded-xl border border-slate-200 dark:border-slate-800 shadow-2xs">
                      <span className="text-xs text-slate-500 dark:text-slate-400">{isDe ? 'Fremdkapital' : 'Debt Sizing'}</span>
                      <div className="text-xl font-mono font-extrabold text-slate-800 dark:text-slate-200 mt-0.5">
                        €42.0M
                      </div>
                      <span className="text-[10px] text-slate-400">{isDe ? '70,0 % Gearing' : '70.0% Gearing'}</span>
                    </div>
                  </div>

                  {/* Cash Flow Table */}
                  <div className="overflow-x-auto border border-slate-200 dark:border-slate-800 rounded-lg">
                    <table className="w-full text-xs font-mono border-collapse">
                      <thead>
                        <tr className="border-b border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400 bg-slate-100 dark:bg-slate-950">
                          <th className="py-2 px-3 text-left">{isDe ? 'Periode' : 'Period'}</th>
                          <th className="py-2 px-3 text-right">{isDe ? 'Erlöse (M€)' : 'Revenue (€M)'}</th>
                          <th className="py-2 px-3 text-right">{isDe ? 'OpEx (M€)' : 'OpEx (€M)'}</th>
                          <th className="py-2 px-3 text-right">{isDe ? 'Schuldendienst (M€)' : 'Debt Service (€M)'}</th>
                          <th className="py-2 px-3 text-right text-emerald-600 dark:text-emerald-400">{isDe ? 'FCFE (M€)' : 'FCFE (€M)'}</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-200 dark:divide-slate-800/80 bg-white dark:bg-slate-900/60">
                        {baseDcf.annualCashFlows.slice(0, 6).map((row) => (
                          <tr key={row.year} className="hover:bg-slate-50 dark:hover:bg-slate-800/50">
                            <td className="py-1.5 px-3 font-bold text-slate-800 dark:text-slate-300">{isDe ? `Jahr ${row.year}` : `Year ${row.year}`}</td>
                            <td className="py-1.5 px-3 text-right text-slate-700 dark:text-slate-200">€{row.revenue}M</td>
                            <td className="py-1.5 px-3 text-right text-slate-500 dark:text-slate-400">(€{row.opex}M)</td>
                            <td className="py-1.5 px-3 text-right text-amber-600 dark:text-amber-400">(€{row.debtService}M)</td>
                            <td className="py-1.5 px-3 text-right font-bold text-emerald-600 dark:text-emerald-400">€{row.fcfE}M</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}

              {activeTab === 'missing-inputs' && (
                <div className="bg-slate-50/70 dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-700/80 p-5 space-y-4">
                  <div className="flex items-center justify-between border-b border-slate-200 dark:border-slate-800 pb-3">
                    <div>
                      <span className="text-xs font-mono uppercase text-red-600 dark:text-red-400 tracking-wider font-semibold">
                        {isDe ? 'Datenraum: Fehlende Eingaben & Lücken' : 'Data Room Missing Inputs Register'}
                      </span>
                      <h3 className="text-lg font-bold text-slate-900 dark:text-white mt-0.5">
                        {isDe ? '5 kritische Informationslücken identifiziert' : '5 Critical Information Gaps Flagged'}
                      </h3>
                    </div>
                    <span className="text-xs bg-red-100 dark:bg-red-950 text-red-700 dark:text-red-300 px-2.5 py-1 rounded font-mono font-bold border border-red-300 dark:border-red-800">
                      {isDe ? 'Hohe Priorität' : 'High Review Priority'}
                    </span>
                  </div>

                  <div className="space-y-2.5">
                    {(isDe ? [
                      {
                        title: 'Einspeisemanagement & Abregelungs-Kompensation',
                        category: 'Recht & Netzanschluss',
                        impact: 'Mögliches Risiko von -0,6 % IRR bei Abregelung > 3,5 % ohne Entschädigung',
                        action: 'ÜNB-Netzanschlussvertrag Anhang 4 vom Verkäufer anfordern',
                      },
                      {
                        title: 'Rückbaubürgschaft der Windenergieanlagen',
                        category: 'Grundstück & Umwelt',
                        impact: '1,2 Mio. € CapEx-Rücklage in Jahr 20 durch Gemeinde gefordert',
                        action: 'Gemeindlichen Umweltgenehmigungsbescheid anfordern',
                      },
                      {
                        title: 'O&M-Indexierung nach Garantiezeit',
                        category: 'Betriebsaufwand (OpEx)',
                        impact: 'Indexierungsmechanismus nach Ablauf des 15-jährigen TSA unbestätigt',
                        action: 'OEM-Wartungsvertrag Anhang C (Preisgleitklausel) anfordern',
                      },
                      {
                        title: 'Indexierungsformel der Pachtvertrags-Verlängerung',
                        category: 'Pacht & Liegenschaften',
                        impact: 'Pachtoptionspreis für Jahre 25–35 ohne VPI-Deckelungsklausel',
                        action: 'Notariellen Pachtvertrag Abschnitt 8.4 anfordern',
                      },
                      {
                        title: 'Verlustfaktor des Umspannwerk-Transformators',
                        category: 'Technische Anbindung',
                        impact: 'Hochspannungsverlustfaktor (geschätzt 1,4 %) erfordert Gutachter-Freigabe',
                        action: 'Netzbetreiber-Verlustzuweisungsplan anfordern',
                      },
                    ] : [
                      {
                        title: 'Grid Curtailment Indemnity Clause',
                        category: 'Legal & Grid Connection',
                        impact: 'Potential -0.6% IRR risk if curtailment >3.5% without compensation',
                        action: 'Request TSO Grid Connection Annex 4 from Seller',
                      },
                      {
                        title: 'Turbine Decommissioning Bond Terms',
                        category: 'Land & Environmental',
                        impact: '€1.2M CapEx reserve at Year 20 required by local municipality',
                        action: 'Request Municipality Environmental Permitting Order',
                      },
                      {
                        title: 'Post-Warranty O&M Escalator Benchmark',
                        category: 'Operating Expenditure',
                        impact: 'Indexation mechanism after year 15 TSA expiration unconfirmed',
                        action: 'Request OEM Service Contract Schedule C (Escalation Index)',
                      },
                      {
                        title: 'Land Lease Extension Indexation Formula',
                        category: 'Real Estate & Land Tenure',
                        impact: 'Year 25-35 lease option pricing formula missing CPI-cap clause',
                        action: 'Request Land Lease Notarial Deed Section 8.4',
                      },
                      {
                        title: 'Substation Shared Transformer Loss Factor',
                        category: 'Technical Interconnection',
                        impact: 'High-voltage line loss factor (estimated 1.4%) needs engineering sign-off',
                        action: 'Request Grid Operator Loss Allocation Schedule',
                      },
                    ]).map((gap, i) => (
                      <div key={i} className="p-3.5 bg-white dark:bg-slate-950 rounded-xl border border-slate-200 dark:border-slate-800 text-xs space-y-1.5 shadow-2xs">
                        <div className="flex items-center justify-between">
                          <span className="font-bold text-slate-900 dark:text-white">
                            {gap.title}
                          </span>
                          <span className="text-[11px] font-mono text-amber-600 dark:text-amber-400 bg-amber-50 dark:bg-amber-950 px-2 py-0.5 rounded border border-amber-200 dark:border-amber-800">
                            {gap.category}
                          </span>
                        </div>
                        <p className="text-slate-600 dark:text-slate-400 text-xs">
                          {gap.impact}
                        </p>
                        <div className="text-[11px] text-blue-600 dark:text-sky-400 font-semibold pt-1 border-t border-slate-200 dark:border-slate-800 flex items-center gap-1">
                          <span>{isDe ? 'Maßnahme:' : 'Action:'}</span>
                          <span>{gap.action}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {activeTab === 'benchmarks' && (
                <BenchmarkWidget />
              )}
            </div>
          </div>

          {/* Footer Bar of Workspace */}
          <div className="bg-slate-100 dark:bg-slate-950 px-4 sm:px-6 py-3.5 border-t border-slate-200 dark:border-slate-800 flex flex-wrap items-center justify-between gap-3">
            <div className="flex items-center gap-2 text-xs text-slate-600 dark:text-slate-400">
              <ShieldCheck className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0" />
              <span>
                {isDe
                  ? 'Alle Eingaben verfügen über lückenlose Dokumenten-Provenienz. Quellenbelege, Anpassungen und DCF-Formeln exportieren sauber nach Excel.'
                  : 'All inputs carry document-level provenance. Citations, overrides, and DCF formulas export cleanly to Excel.'}
              </span>
            </div>

            <a
              href="mailto:info.valfence@gmail.com?subject=VALFENCE%20pilot%20enquiry"
              onClick={() => trackEvent('cta_click', { location: 'workspace_footer' })}
              className="inline-flex items-center gap-1.5 bg-blue-600 hover:bg-blue-700 active:bg-blue-800 text-white text-xs font-semibold px-4 py-2 rounded-lg transition-colors shadow-2xs"
            >
              <span>{isDe ? 'Pilotprojekt anfragen' : 'Discuss a pilot on your deal'}</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};
