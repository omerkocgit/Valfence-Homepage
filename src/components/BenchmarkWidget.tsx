/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Sparkles } from 'lucide-react';
import { motion } from 'motion/react';
import type { ValuationAssumption } from '../types';
import type { DCFCalculationResult } from '../data/mockValuation';
import { useLanguage } from '../i18n/LanguageContext';

interface BenchmarkItem {
  id: string;
  metric: string;
  unit: string;
  dealValue: number;
  marketMin: number;
  marketP25: number;
  marketMedian: number;
  marketP75: number;
  marketMax: number;
  source: string;
  assessment: 'favorable' | 'inline' | 'stretched';
  notes: string;
}

export const BenchmarkWidget = ({assumptions, result}: {assumptions: ValuationAssumption[]; result: DCFCalculationResult}) => {
  const { language } = useLanguage();
  const isDe = language === 'DE';
  const [assetType, setAssetType] = useState<'wind' | 'solar' | 'bess'>('wind');

  const windBenchmarks: BenchmarkItem[] = [
    {
      id: 'capex',
      metric: isDe ? 'Gesamt-CapEx (schlüsselfertiges EPC)' : 'All-in CapEx (Turnkey EPC)',
      unit: '€/kW',
      dealValue: 1245,
      marketMin: 1100,
      marketP25: 1180,
      marketMedian: 1280,
      marketP75: 1390,
      marketMax: 1520,
      source: 'IRENA / BNEF European Onshore Wind Q2-2026',
      assessment: 'favorable',
      notes: isDe
        ? 'Transaktion liegt im 42. Perzentil dank verhandeltem OEM-Turbinenliefervertrag.'
        : 'Deal sits in the 42nd percentile, benefiting from negotiated OEM turbine supply agreement.',
    },
    {
      id: 'ncf',
      metric: isDe ? 'Netto-Kapazitätsfaktor (P50)' : 'Net Capacity Factor (P50)',
      unit: '%',
      dealValue: 34.8,
      marketMin: 27.0,
      marketP25: 30.5,
      marketMedian: 33.2,
      marketP75: 36.0,
      marketMax: 39.5,
      source: 'DNV European Wind Yield Benchmark Database',
      assessment: 'favorable',
      notes: isDe
        ? 'Über dem Median für Windklasse II; validiert durch 10-jährigen LiDAR-Messmast vor Ort.'
        : 'Above median for Class II wind regime; validated by 10-year LiDAR on-site wind mast.',
    },
    {
      id: 'opex',
      metric: isDe ? 'Fixe OpEx + Vollwartung (TSA) + Pacht' : 'Fixed OpEx + TSA + Land',
      unit: '€/kW/yr',
      dealValue: 28.5,
      marketMin: 23.0,
      marketP25: 26.5,
      marketMedian: 29.8,
      marketP75: 33.5,
      marketMax: 38.0,
      source: 'Wood Mackenzie Onshore Wind Operating Cost Index',
      assessment: 'inline',
      notes: isDe
        ? 'Im Marktschnitt für 15-jähriges OEM-Vollwartungspaket; nach Jahr 15 ist Indexierungsprüfung erforderlich.'
        : 'In-line with 15-year full-wrap OEM service package; post-year 15 requires indexation verification.',
    },
    {
      id: 'ppa',
      metric: isDe ? 'Durchschnittlicher Strompreis' : 'Average power price',
      unit: '€/MWh',
      dealValue: 72.0,
      marketMin: 58.0,
      marketP25: 64.0,
      marketMedian: 69.5,
      marketP75: 75.0,
      marketMax: 84.0,
      source: 'Pexapark European PPA Pricing Index (Iberia Hub)',
      assessment: 'favorable',
      notes: isDe
        ? '+2,50 €/MWh Prämie gegenüber Baseload, besichert durch Corporate-Abnehmer mit Investment-Grade-Rating.'
        : '+€2.5/MWh premium over merchant baseload, backed by investment-grade corporate offtaker.',
    },
    {
      id: 'irr',
      metric: isDe ? 'Eigenkapital-IRR (Szenario)' : 'Current scenario Equity IRR',
      unit: '%',
      dealValue: 9.82,
      marketMin: 7.20,
      marketP25: 8.00,
      marketMedian: 8.65,
      marketP75: 9.40,
      marketMax: 10.80,
      source: 'European Infrastructure M&A Transaction Multiples',
      assessment: 'favorable',
      notes: isDe
        ? '+117 Bp über der Median-Renditeanforderung für kontrahierte Core+-Infrastruktur.'
        : '+117 bps above market median underwriting hurdle for contracted core+ infrastructure.',
    },
  ];

  const solarBenchmarks: BenchmarkItem[] = [
    {
      id: 'capex',
      metric: isDe ? 'Gesamt-CapEx (Freiflächen-PV)' : 'All-in CapEx (Utility Scale)',
      unit: '€/kWp',
      dealValue: 640,
      marketMin: 560,
      marketP25: 610,
      marketMedian: 670,
      marketP75: 740,
      marketMax: 820,
      source: 'BNEF PV Systems Cost Benchmark 2026',
      assessment: 'favorable',
      notes: isDe
        ? 'Einachsige Nachführung (Tracker) mit Tier-1 bifazialen TOPCon-Solarmodulen.'
        : 'Single-axis tracker configuration with Tier-1 bifacial TOPCon modules.',
    },
    {
      id: 'ncf',
      metric: isDe ? 'Spezifischer Ertrag (P50)' : 'Specific Yield (P50)',
      unit: 'kWh/kWp',
      dealValue: 1780,
      marketMin: 1450,
      marketP25: 1620,
      marketMedian: 1740,
      marketP75: 1860,
      marketMax: 2020,
      source: 'SolarGIS Southern Europe Irradiance Dataset',
      assessment: 'inline',
      notes: isDe
        ? 'Typischer südeuropäischer Solarkorridor (hohe GHI) mit 0,45 %/Jahr Moduldegradation.'
        : 'Standard high-GHI southern European solar corridor with 0.45%/yr module degradation.',
    },
    {
      id: 'opex',
      metric: isDe ? 'O&M + Wechselrichter-Rücklage' : 'O&M + Inverter Reserve',
      unit: '€/kWp/yr',
      dealValue: 12.4,
      marketMin: 9.5,
      marketP25: 11.2,
      marketMedian: 13.0,
      marketP75: 15.5,
      marketMax: 18.0,
      source: 'SolarPower Europe O&M Best Practices Report',
      assessment: 'inline',
      notes: isDe
        ? 'Beinhaltet Drohnen-Thermograﬁeprüfungen und Wechselrichter-Repowering-Rücklage ab Jahr 12.'
        : 'Includes drone thermal imaging inspections and year-12 string inverter repowering reserve.',
    },
    {
      id: 'ppa',
      metric: isDe ? 'Solar-Capture-Preis (nach Kannibalisierung)' : 'Solar Capture Price (Post-Cannibalization)',
      unit: '€/MWh',
      dealValue: 48.5,
      marketMin: 36.0,
      marketP25: 42.0,
      marketMedian: 47.0,
      marketP75: 53.5,
      marketMax: 62.0,
      source: 'Aurora Energy Research Solar Cannibalization Curve',
      assessment: 'inline',
      notes: isDe
        ? 'Berücksichtigt 26 % Duck-Curve-Abschlag gegenüber Baseload während der Mittagsspitze.'
        : 'Captures 26% duck-curve discount relative to baseload power during midday peak.',
    },
    {
      id: 'irr',
      metric: isDe ? 'Eigenkapital-IRR (Base Case)' : 'Base Case Equity IRR',
      unit: '%',
      dealValue: 8.90,
      marketMin: 6.80,
      marketP25: 7.60,
      marketMedian: 8.30,
      marketP75: 9.10,
      marketMax: 10.20,
      source: 'Inframation M&A Transaction Database',
      assessment: 'favorable',
      notes: isDe
        ? 'Attraktive risikobereinigte Rendite, abgesichert durch 12-jährigen festen Corporate CfD.'
        : 'Attractive risk-adjusted return supported by 12-year fixed corporate CfD structure.',
    },
  ];

  const bessBenchmarks: BenchmarkItem[] = [
    {
      id: 'capex',
      metric: isDe ? 'BESS Installations-CapEx (2-Stunden)' : 'BESS Installed CapEx (2-Hour)',
      unit: '€/kWh',
      dealValue: 245,
      marketMin: 210,
      marketP25: 235,
      marketMedian: 260,
      marketP75: 295,
      marketMax: 340,
      source: 'BNEF Energy Storage System Cost Survey 2026',
      assessment: 'favorable',
      notes: isDe
        ? 'LFP-Zellchemie mit Flüssigkühlung, integriertem PCS und Transformatorpaket.'
        : 'LFP chemistry with liquid thermal management, integrated PCS and transformer package.',
    },
    {
      id: 'cycles',
      metric: isDe ? 'Wirkungsgrad Round-Trip (AC-AC)' : 'Round-Trip Efficiency (AC-AC)',
      unit: '%',
      dealValue: 87.2,
      marketMin: 82.0,
      marketP25: 84.5,
      marketMedian: 86.5,
      marketP75: 88.5,
      marketMax: 91.0,
      source: 'EPRI Energy Storage Technology Guidelines',
      assessment: 'inline',
      notes: isDe
        ? 'Konform mit OEM-Garantieanforderungen für 1,5 tägliche Vollzyklen bei Arbitrage-Betrieb.'
        : 'Matches OEM degradation warranty schedule for 1.5 daily full-equivalent cycles.',
    },
    {
      id: 'opex',
      metric: isDe ? 'Kapazitätswartung & Augmentation' : 'Capacity Maintenance & Augmentation',
      unit: '€/kW/yr',
      dealValue: 18.0,
      marketMin: 14.0,
      marketP25: 16.5,
      marketMedian: 19.0,
      marketP75: 22.0,
      marketMax: 26.0,
      source: 'Clean Energy Associates Storage O&M Benchmark',
      assessment: 'inline',
      notes: isDe
        ? 'Rückstellung für Zellen-Augmentierung im Jahr 8 zur Erhaltung von 80 % der Nennkapazität.'
        : 'Includes year-8 cell augmentation reserve to maintain 80% State of Health.',
    },
    {
      id: 'revenue',
      metric: isDe ? 'Arbitrage + Regelleistungserlöse' : 'Arbitrage + Frequency Response Revenue',
      unit: 'k€/MW/yr',
      dealValue: 118.0,
      marketMin: 85.0,
      marketP25: 100.0,
      marketMedian: 112.0,
      marketP75: 126.0,
      marketMax: 145.0,
      source: 'Modo Energy Storage Revenue Benchmark 2026',
      assessment: 'favorable',
      notes: isDe
        ? 'Multi-Market-Optimierung (FCR + aFRR + Day-Ahead Arbitrage) durch KI-Trading-Algorithmus.'
        : 'Multi-market stack (FCR + aFRR + intraday wholesale arbitrage) via algorithmic bidding.',
    },
    {
      id: 'irr',
      metric: isDe ? 'Eigenkapital-IRR (Base Case)' : 'Base Case Equity IRR',
      unit: '%',
      dealValue: 11.40,
      marketMin: 8.50,
      marketP25: 9.80,
      marketMedian: 10.90,
      marketP75: 12.20,
      marketMax: 13.80,
      source: 'Energy Storage Investment Index Europe',
      assessment: 'favorable',
      notes: isDe
        ? '+50 Bp Renditepuffer über Merchant-BESS-Hurdle-Rates zur Absicherung von Volatilitätsrisiken.'
        : '+50 bps spread over merchant BESS underwriting hurdles to cushion merchant volatility.',
    },
  ];

  const sampleItems =
    assetType === 'wind'
      ? windBenchmarks
      : assetType === 'solar'
      ? solarBenchmarks
      : bessBenchmarks;

  const currentItems = sampleItems.map(item => {
    const valueById: Record<string, number> = {
      capex: 1250,
      ncf: assumptions.find(a => a.id === 'ncf_p50')!.currentValue,
      opex: assumptions.find(a => a.id === 'fixed_opex')!.currentValue,
      ppa: assumptions.find(a => a.id === 'merchant_power_price')!.currentValue,
      irr: result.equityIRR,
    };
    const dealValue = assetType === 'wind' ? (valueById[item.id] ?? item.dealValue) : item.dealValue;
    return {...item, dealValue,
      source: isDe ? 'Fiktive Demo-Bandbreite' : 'Illustrative sample band',
      notes: isDe ? 'Beispielvergleich; keine aktuellen oder verifizierten Marktdaten.' : 'Example comparison; not current or verified market data.',
    };
  });

  return (
    <div className="bg-slate-50/80 dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-700/80 p-4 sm:p-5 space-y-4">
      {/* Header & Asset Switcher */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-200 dark:border-slate-800 pb-3.5">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-xs font-mono uppercase text-blue-600 dark:text-sky-400 tracking-wider font-semibold">
              {isDe ? 'Markt-Benchmarking Intelligence' : 'Market Benchmarking Intelligence'}
            </span>
            <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800">
              {isDe ? 'Beispieldaten' : 'Sample data'}
            </span>
          </div>
          <h3 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white mt-0.5">
            {isDe ? 'Transaktionsannahmen vs. europäische Markt-Mediane' : 'Asset Assumptions vs European Market Medians'}
          </h3>
        </div>

        {/* Technology Selector Tabs */}
        <div className="inline-flex flex-wrap items-center p-0.5 rounded-lg bg-slate-200/90 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 text-xs font-semibold shrink-0">
          <button
            aria-pressed={assetType === 'wind'}
            onClick={() => setAssetType('wind')}
            className={`px-3 py-1.5 rounded-md transition-all cursor-pointer ${
              assetType === 'wind'
                ? 'bg-blue-600 text-white shadow-xs font-bold'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            💨 {isDe ? 'Wind (Demo)' : 'Wind (Demo)'}
          </button>
          <button
            aria-pressed={assetType === 'solar'}
            onClick={() => setAssetType('solar')}
            className={`px-3 py-1.5 rounded-md transition-all cursor-pointer ${
              assetType === 'solar'
                ? 'bg-blue-600 text-white shadow-xs font-bold'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            ☀️ {isDe ? 'Solar-PV' : 'Solar PV'}
          </button>
          <button
            aria-pressed={assetType === 'bess'}
            onClick={() => setAssetType('bess')}
            className={`px-3 py-1.5 rounded-md transition-all cursor-pointer ${
              assetType === 'bess'
                ? 'bg-blue-600 text-white shadow-xs font-bold'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            🔋 {isDe ? 'Batteriespeicher (BESS)' : 'Storage (BESS)'}
          </button>
        </div>
      </div>

      {/* Info Callout */}
      <div className="p-3 bg-white dark:bg-slate-950 rounded-xl border border-slate-200 dark:border-slate-800 text-xs flex items-start gap-2.5">
        <Sparkles className="w-4 h-4 text-blue-600 dark:text-sky-400 shrink-0 mt-0.5" />
        <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
          {isDe
            ? 'Wind zeigt die aktuellen Demo-Eingaben. Solar und Speicher sind separate Beispiele. Alle Vergleichsbandbreiten sind illustrativ.'
            : 'Wind reflects the current workspace inputs. Solar and storage are separate examples. All comparison bands are illustrative.'}
        </p>
      </div>

      {/* Benchmark Metric Cards */}
      <div className="space-y-3">
        {currentItems.map((item) => {
          const totalRange = item.marketMax - item.marketMin;
          const dealPos = Math.max(0, Math.min(100, ((item.dealValue - item.marketMin) / totalRange) * 100));
          const p25Pos = ((item.marketP25 - item.marketMin) / totalRange) * 100;
          const medianPos = ((item.marketMedian - item.marketMin) / totalRange) * 100;
          const p75Pos = ((item.marketP75 - item.marketMin) / totalRange) * 100;

          return (
            <div
              key={item.id}
              className="p-4 bg-white dark:bg-slate-950 rounded-xl border border-slate-200 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700 transition-colors shadow-2xs space-y-2.5"
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1.5">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-slate-900 dark:text-white text-xs sm:text-sm">
                      {item.metric}
                    </span>
                    <span className="text-[10px] font-mono text-slate-500 bg-slate-100 dark:bg-slate-900 px-1.5 py-0.5 rounded border border-slate-200 dark:border-slate-800">
                      {item.unit}
                    </span>
                  </div>
                  <span className="text-[11px] text-slate-500 font-mono">
                    {isDe ? 'Quelle: ' : 'Source: '}{item.source}
                  </span>
                </div>

                <div className="flex items-center gap-3 self-start sm:self-auto">
                  <div className="text-right">
                    <span className="text-[10px] text-slate-400 block uppercase font-mono">
                      {isDe ? 'Deal-Wert' : 'Deal Value'}
                    </span>
                    <div className="text-base font-extrabold font-mono text-blue-600 dark:text-sky-400">
                      {item.dealValue.toLocaleString(isDe ? 'de-DE' : 'en-GB', {maximumFractionDigits: 2})} {item.unit}
                    </div>
                  </div>
                  <span
                    className={`text-[11px] font-mono font-bold px-2 py-0.5 rounded border ${
                      item.dealValue >= item.marketMin && item.dealValue <= item.marketMax
                        ? 'bg-emerald-50 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300 border-emerald-200 dark:border-emerald-800'
                        : 'bg-blue-50 dark:bg-blue-950 text-blue-700 dark:text-sky-300 border-blue-200 dark:border-blue-800'
                    }`}
                  >
                    {item.dealValue >= item.marketMin && item.dealValue <= item.marketMax ? (isDe ? 'In Beispielband' : 'Inside sample band') : (isDe ? 'Außerhalb Beispielband' : 'Outside sample band')}
                  </span>
                </div>
              </div>

              {/* Visual Benchmark Range Bar */}
              <div className="pt-2 pb-1">
                <div className="relative h-4 bg-slate-100 dark:bg-slate-900 rounded-full overflow-visible flex items-center border border-slate-200 dark:border-slate-800">
                  {/* P25 to P75 Interquartile Band */}
                  <div
                    className="absolute top-0 bottom-0 bg-blue-100/80 dark:bg-blue-950/60 rounded-full"
                    style={{
                      left: `${p25Pos}%`,
                      width: `${p75Pos - p25Pos}%`,
                    }}
                    title={`P25 (${item.marketP25}) to P75 (${item.marketP75}) Interquartile Range`}
                  />

                  {/* Market Median Line */}
                  <div
                    className="absolute top-0 bottom-0 w-0.5 bg-slate-400 dark:bg-slate-500 z-10"
                    style={{ left: `${medianPos}%` }}
                    title={`Market Median: ${item.marketMedian.toLocaleString(isDe ? 'de-DE' : 'en-GB')} ${item.unit}`}
                  />

                  {/* Deal Pinpoint Marker */}
                  <motion.div
                    initial={{ scale: 0.8 }}
                    animate={{ scale: 1 }}
                    className="absolute -top-1.5 w-7 h-7 -ml-3.5 rounded-full bg-blue-600 dark:bg-sky-400 text-white dark:text-slate-950 flex items-center justify-center shadow-md z-20 font-mono text-[9px] font-extrabold border-2 border-white dark:border-slate-900 cursor-pointer"
                    style={{ left: `${dealPos}%` }}
                    title={`Deal Position: ${item.dealValue} ${item.unit}`}
                  >
                    📍
                  </motion.div>
                </div>

                {/* Range Labels */}
                <div className="flex justify-between items-center text-[10px] font-mono text-slate-400 pt-1.5">
                  <span>Min: {item.marketMin.toLocaleString(isDe ? 'de-DE' : 'en-GB')}</span>
                  <span className="text-slate-500 dark:text-slate-400 font-semibold">
                    {isDe ? 'Markt-Median: ' : 'Market Median: '}{item.marketMedian.toLocaleString(isDe ? 'de-DE' : 'en-GB')} {item.unit}
                  </span>
                  <span>Max: {item.marketMax.toLocaleString(isDe ? 'de-DE' : 'en-GB')}</span>
                </div>
              </div>

              {/* Analyst Rationale Note */}
              <div className="text-[11px] text-slate-600 dark:text-slate-400 pt-1.5 border-t border-slate-100 dark:border-slate-800">
                <span className="font-semibold text-slate-800 dark:text-slate-200">
                  {isDe ? 'IC-Benchmark-Notiz: ' : 'IC Benchmark Note: '}
                </span>
                {item.notes}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
