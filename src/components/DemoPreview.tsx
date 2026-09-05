import React from 'react';
import {useDemo} from '../data/DemoContext';
import {useLanguage} from '../i18n/LanguageContext';

export function DemoPreview({kind}: {kind: 'export-preview' | 'case-summary'}) {
  const {assumptions, result, base, downside, approvedCount, scenarioMode} = useDemo();
  const {language} = useLanguage();
  const de = language === 'DE';
  const fmt = (n: number, digits = 1) => n.toLocaleString(de ? 'de-DE' : 'en-GB', {minimumFractionDigits: digits, maximumFractionDigits: digits});
  const labels: Record<string, string> = {
    ncf_p50: de ? 'Netto-Kapazitätsfaktor' : 'Net capacity factor',
    merchant_power_price: de ? 'Durchschnittlicher Strompreis' : 'Average power price',
    fixed_opex: de ? 'Fixe Betriebskosten' : 'Fixed operating costs',
    debt_gearing: de ? 'Fremdkapitalquote' : 'Debt gearing',
  };
  return <div className="space-y-5" data-testid="demo-preview">
    <p className="rounded-xl bg-blue-50 dark:bg-blue-950/40 p-4 text-xs text-blue-800 dark:text-sky-200">
      {de ? 'Fiktives Beispiel · Aktuelle Demo-Eingaben · Keine Anlageempfehlung. Diese Vorschau erzeugt keine Excel-Datei.' : 'Fictional example · Current demo inputs · No investment recommendation. This preview does not generate an Excel file.'}
    </p>
    <div className="flex flex-wrap justify-between gap-3">
      <h3 className="font-bold">North Ridge · 48 MW · {scenarioMode.toUpperCase()}</h3>
      <span className="text-xs">{de ? 'Demo-Freigaben' : 'Demo approvals'}: {approvedCount}/{assumptions.length}</span>
    </div>
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
      {[
        [de ? 'Unternehmenswert' : 'Enterprise value', '€' + fmt(result.enterpriseValue) + 'M'],
        [de ? 'Eigenkapitalwert (EV − Schulden)' : 'Equity value (EV − debt)', '€' + fmt(result.equityValue) + 'M'],
        ['Equity IRR · ' + scenarioMode.toUpperCase(), fmt(result.equityIRR) + '%'],
        ['Min. DSCR', fmt(result.dscrMin, 2) + 'x'],
      ].map(([label, value]) => <div key={label} className="min-w-0 break-words rounded-xl border border-slate-200 dark:border-slate-700 p-3">
        <span className="block text-xs text-slate-500 dark:text-slate-400">{label}</span>
        <strong className="text-xl font-mono text-blue-600 dark:text-sky-400">{value}</strong>
      </div>)}
    </div>
    <div className="overflow-x-auto rounded-xl border border-slate-200 dark:border-slate-700">
      <table className="w-full text-left text-xs">
        <caption className="p-3 text-left font-semibold">{de ? 'Aktuelle Annahmen' : 'Current assumptions'}</caption>
        <thead className="bg-slate-100 dark:bg-slate-950"><tr>
          <th className="p-3">{de ? 'Parameter' : 'Parameter'}</th><th className="p-3">{de ? 'Wert' : 'Value'}</th><th className="p-3">Status</th>
        </tr></thead>
        <tbody>{assumptions.map(a => <tr key={a.id} className="border-t border-slate-200 dark:border-slate-800">
          <th scope="row" className="p-3 font-medium">{labels[a.id]}</th>
          <td className="p-3 font-mono">{fmt(a.currentValue)} {a.unit}</td>
          <td className="p-3">{a.status === 'approved' ? (de ? 'Freigegeben' : 'Approved') : (de ? 'Ausstehend' : 'Pending')}</td>
        </tr>)}</tbody>
      </table>
    </div>
    {kind === 'case-summary' ? <div className="rounded-xl bg-slate-100 dark:bg-slate-950 p-4 text-xs space-y-2">
      <p>P50 Equity IRR: <strong>{fmt(base.equityIRR)}%</strong> · P90 Equity IRR: <strong>{fmt(downside.equityIRR)}%</strong></p>
      <p>{de ? 'P90 verwendet 11,2 % weniger Ertrag bei unveränderten Kosten und Finanzierung. Die Vorschau übernimmt alle Änderungen aus dem Arbeitsbereich.' : 'P90 uses 11.2% lower generation with unchanged costs and financing. The preview reflects every change in the workspace.'}</p>
    </div> : <div className="overflow-x-auto rounded-xl border border-slate-200 dark:border-slate-700">
      <table className="w-full text-xs font-mono">
        <caption className="p-3 text-left font-semibold">{de ? 'Cashflow-Vorschau · Mio. € · Erste 6 von 25 Jahren' : 'Cash-flow preview · €M · First 6 of 25 years'}</caption>
        <thead className="bg-slate-100 dark:bg-slate-950"><tr>{[de ? 'Jahr' : 'Year', de ? 'Erlöse' : 'Revenue', 'OpEx', de ? 'Schuldendienst' : 'Debt service', 'FCFE'].map(label => <th key={label} className="p-3 text-right">{label}</th>)}</tr></thead>
        <tbody>{result.annualCashFlows.slice(0, 6).map(row => <tr key={row.year} className="border-t border-slate-200 dark:border-slate-800">
          {[row.year, fmt(row.revenue, 2), fmt(row.opex, 2), fmt(row.debtService, 2), fmt(row.fcfE, 2)].map((value, i) => <td key={i} className="p-3 text-right">{value}</td>)}
        </tr>)}</tbody>
      </table>
    </div>}
    <p className="text-xs text-slate-500 dark:text-slate-400">{de ? 'Vereinfachte Demo: 25 Jahre, 0,4 % jährliche Degradation, 2 % Kosteninflation, 18 Jahre Schuldentilgung bei 4,5 %, feste jährliche Reserve von 0,4 Mio. € und 6,5 % Diskontsatz. IRR und Mindest-DSCR werden aus den Cashflows berechnet.' : 'Simplified demo: 25 years, 0.4% annual degradation, 2% cost inflation, 18-year debt repayment at 4.5%, a fixed €0.4M annual reserve and a 6.5% discount rate. IRR and minimum DSCR are calculated from the cash flows.'}</p>
  </div>;
}
