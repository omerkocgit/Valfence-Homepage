/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { ModalType } from '../types';
import { X, FileSpreadsheet, CheckCircle2 } from 'lucide-react';
import { BrandLogo } from './BrandLogo';
import { useLanguage } from '../i18n/LanguageContext';

interface LegalModalsProps {
  activeModal: ModalType;
  onClose: () => void;
  onOpenPrivacySettings: () => void;
}

export const LegalModals: React.FC<LegalModalsProps> = ({
  activeModal,
  onClose,
  onOpenPrivacySettings,
}) => {
  const { language } = useLanguage();
  const isDe = language === 'DE';

  if (activeModal === 'none' || activeModal === 'consent-settings') {
    return null;
  }

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm overflow-y-auto"
      role="dialog"
      aria-modal="true"
    >
      <div className="relative w-full max-w-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl shadow-2xl overflow-hidden my-8 max-h-[90vh] flex flex-col text-slate-900 dark:text-slate-100">
        {/* Modal Top Header */}
        <div className="bg-slate-100 dark:bg-slate-950 px-6 py-4 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <BrandLogo variant="mark-only" size="sm" />
            <h2 className="text-base font-bold text-slate-900 dark:text-white">
              {activeModal === 'imprint' && (isDe ? 'Vorläufiges Impressum' : 'Interim Imprint (Impressum)')}
              {activeModal === 'privacy' && (isDe ? 'Vorläufige Datenschutzerklärung' : 'Interim Privacy Notice (Datenschutzerklärung)')}
              {activeModal === 'export-preview' && (isDe ? 'Excel-Bewertungsmodell-Struktur (.xlsx)' : 'Excel Valuation Model Structure (.xlsx)')}
              {activeModal === 'case-summary' && (isDe ? '1-Seiten Investment-Committee-Memo' : 'One-Page Executive Review Memo')}
            </h2>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-500 hover:text-slate-900 hover:bg-slate-200 dark:text-slate-400 dark:hover:text-white dark:hover:bg-slate-800 transition-colors cursor-pointer"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Content Scroll Area */}
        <div className="p-6 overflow-y-auto space-y-5 text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
          {/* 1. IMPRINT */}
          {activeModal === 'imprint' && (
            <div className="space-y-4">
              <div className="p-3 bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-800/60 rounded-xl text-xs text-amber-900 dark:text-amber-200">
                <strong>{isDe ? 'Status:' : 'Status:'}</strong> {isDe ? 'Vorbereitende Produktvalidierung · Projekt / Gesellschaft in Gründung.' : 'Pre-launch product validation · Project / company in formation.'}
              </div>

              <div>
                <h3 className="font-bold text-slate-900 dark:text-white text-base mb-1">
                  {isDe ? 'Angaben gemäß § 5 DDG (Digitale-Dienste-Gesetz)' : 'Information pursuant to Section 5 DDG (German Digital Services Act)'}
                </h3>
                <p><strong>{isDe ? 'Marke / Projekt:' : 'Brand / Project:'}</strong> VALFENCE</p>
                <p><strong>{isDe ? 'Projektinhaber / Verantwortlich:' : 'Project Owner / Responsible Person:'}</strong> Ömer Koç</p>
                <p><strong>{isDe ? 'Rechtsform:' : 'Legal Form:'}</strong> {isDe ? 'Wird nach formaler Eintragung ergänzt.' : 'To be added following formal corporate registration.'}</p>
                <p><strong>{isDe ? 'Sitz / Postanschrift:' : 'Registered Office / Postal Address:'}</strong> {isDe ? 'Wird vor dem öffentlichen Launch finalisiert.' : 'Will be finalized prior to public launch.'}</p>
              </div>

              <div className="pt-2 border-t border-slate-200 dark:border-slate-800">
                <h4 className="font-bold text-slate-900 dark:text-white mb-1">{isDe ? 'Kontaktinformationen' : 'Contact Information'}</h4>
                <p><strong>Email:</strong> <a href="mailto:info.valfence@gmail.com" className="text-blue-600 dark:text-sky-400 hover:underline font-mono">info.valfence@gmail.com</a></p>
                <p><strong>{isDe ? 'Telefon:' : 'Telephone:'}</strong> {isDe ? 'Wird bei Gründung bereitgestellt, sofern gesetzlich vorgeschrieben.' : 'Will be provided if legally required upon incorporation.'}</p>
              </div>

              <div className="pt-2 border-t border-slate-200 dark:border-slate-800">
                <h4 className="font-bold text-slate-900 dark:text-white mb-1">{isDe ? 'Register- & Steuerangaben' : 'Registration & Tax Details'}</h4>
                <p><strong>{isDe ? 'Handelsregister & Registernummer:' : 'Commercial Register & Number:'}</strong> {isDe ? 'Noch nicht eingetragen / wird bei Gründung aktualisiert.' : 'Not yet registered / will be updated upon company formation.'}</p>
                <p><strong>{isDe ? 'Umsatzsteuer-ID & Steuernummer:' : 'VAT Identification & Tax Number:'}</strong> {isDe ? 'Noch nicht erteilt / wird nach Zuteilung ergänzt.' : 'Not yet issued / will be updated upon assignment.'}</p>
              </div>

              <div className="pt-2 border-t border-slate-200 dark:border-slate-800">
                <h4 className="font-bold text-slate-900 dark:text-white mb-1">{isDe ? 'Haftungsausschluss & Regulatorischer Hinweis' : 'Disclaimer & Regulatory Notice'}</h4>
                <p className="text-xs text-slate-600 dark:text-slate-400">
                  {isDe
                    ? 'Die Inhalte dieser Vorab-Landingpage und des Prototyps dienen ausschließlich allgemeinen Produktvalidierungs- und Hypothesentest-Zwecken. Sie stellen keine Anlage-, Finanz-, Steuer-, Rechts- oder Unternehmenstransaktionsberatung dar.'
                    : 'The contents of this pre-launch landing page and prototype are provided solely for general product-validation and hypothesis-testing purposes. They do not constitute investment, financial, tax, legal, or commercial transaction advice.'}
                </p>
              </div>
            </div>
          )}

          {/* 2. PRIVACY NOTICE */}
          {activeModal === 'privacy' && (
            <div className="space-y-4 text-xs sm:text-sm">
              <div className="p-3 bg-sky-50 dark:bg-sky-950/60 border border-sky-200 dark:border-sky-800/60 rounded-xl text-xs text-sky-900 dark:text-sky-200">
                <strong>{isDe ? 'Stand:' : 'Last Updated:'}</strong> {isDe ? 'August 2026 · Vorläufige Datenschutzhinweise gemäß Art. 13 DSGVO.' : '22 August 2026 · Interim pre-launch privacy information pursuant to Article 13 GDPR.'}
              </div>

              <div>
                <h3 className="font-bold text-slate-900 dark:text-white text-base mb-1">{isDe ? '1. Verantwortlicher' : '1. Data Controller'}</h3>
                <p><strong>{isDe ? 'Projekt:' : 'Project:'}</strong> VALFENCE ({isDe ? 'Projekt in Gründung' : 'Project in formation'})</p>
                <p><strong>{isDe ? 'Verantwortliche Person:' : 'Responsible Person:'}</strong> Ömer Koç</p>
                <p><strong>{isDe ? 'Kontakt-E-Mail:' : 'Contact Email:'}</strong> <a href="mailto:info.valfence@gmail.com" className="text-blue-600 dark:text-sky-400 hover:underline font-mono">info.valfence@gmail.com</a></p>
                <p><strong>{isDe ? 'Anschrift:' : 'Address:'}</strong> {isDe ? 'Postanschrift wird vor dem offiziellen Launch ergänzt.' : 'Postal address will be added prior to formal public launch.'}</p>
              </div>

              <div className="pt-2 border-t border-slate-200 dark:border-slate-800">
                <h3 className="font-bold text-slate-900 dark:text-white text-base mb-1">{isDe ? '2. Technisches Hosting & Server-Logfiles' : '2. Technical Hosting & Request Logs'}</h3>
                <p className="text-xs text-slate-700 dark:text-slate-300">
                  {isDe
                    ? 'Beim Zugriff auf diese Website verarbeitet die Hosting-Infrastruktur technische Anfragedaten (IP-Adresse, Browser-User-Agent, abgerufene URL und Zeitstempel) ausschließlich zur sicheren Auslieferung der Website.'
                    : 'When accessing this website, the hosting infrastructure processes technical request data (IP address, browser user-agent, requested URL, and timestamps) strictly to deliver the website securely.'}
                </p>
              </div>

              <div className="pt-2 border-t border-slate-200 dark:border-slate-800">
                <h3 className="font-bold text-slate-900 dark:text-white text-base mb-1">{isDe ? '3. Microsoft Clarity Webanalyse & Einwilligung' : '3. Microsoft Clarity Analytics & Consent'}</h3>
                <p className="text-xs text-slate-700 dark:text-slate-300 mb-2">
                  {isDe
                    ? 'Mit Ihrer ausdrücklichen vorherigen Zustimmung nutzt diese Website Microsoft Clarity (Projekt-ID: y6e38bczqs), um Besucherinteraktionen, Scrolltiefe und Navigationsmuster zu verstehen.'
                    : 'With your explicit prior consent, this website utilizes Microsoft Clarity (Project ID: y6e38bczqs) to understand visitor interaction, scroll depth, and navigation patterns.'}
                </p>
                <ul className="list-disc pl-5 space-y-1 text-xs text-slate-600 dark:text-slate-400">
                  <li><strong>{isDe ? 'Einwilligungs-Gate:' : 'Consent Gate:'}</strong> {isDe ? 'Clarity-Cookies und Skripte werden erst nach Erteilung der Einwilligung geladen.' : 'Clarity cookies and scripts are withheld until consent is granted.'}</li>
                  <li><strong>{isDe ? 'Rechtsgrundlage:' : 'Legal Basis:'}</strong> {isDe ? 'Einwilligung gemäß Art. 6 Abs. 1 lit. a DSGVO.' : 'Consent under Article 6(1)(a) GDPR.'}</li>
                  <li><strong>{isDe ? 'Werbung deaktiviert:' : 'Advertising Denied:'}</strong> {isDe ? 'Werbe-Tracking und Marketing-Cookies von Drittanbietern sind dauerhaft deaktiviert.' : 'Ad tracking and third-party advertising cookies are permanently denied.'}</li>
                  <li><strong>{isDe ? 'Widerruf:' : 'Withdrawal:'}</strong> {isDe ? 'Sie können Ihre Einwilligung jederzeit über die Cookie-Einstellungen im Footer anpassen oder widerrufen.' : 'You can modify or withdraw your consent at any time via the Cookie Settings in the footer.'}</li>
                </ul>
              </div>

              <div className="pt-2 border-t border-slate-200 dark:border-slate-800">
                <h3 className="font-bold text-slate-900 dark:text-white text-base mb-1">{isDe ? '4. E-Mail-Anfragen' : '4. Direct Email Inquiries'}</h3>
                <p className="text-xs text-slate-700 dark:text-slate-300">
                  {isDe
                    ? 'Wenn Sie uns per E-Mail kontaktieren (info.valfence@gmail.com), werden Ihre Angaben ausschließlich zur Bearbeitung Ihrer Anfrage und zur Erörterung möglicher Pilotpartnerschaften verarbeitet.'
                    : 'If you contact us by email (info.valfence@gmail.com), your information is processed solely to respond to your inquiry and discuss potential pilot partnerships.'}
                </p>
              </div>

              <div className="pt-2 border-t border-slate-200 dark:border-slate-800">
                <h3 className="font-bold text-slate-900 dark:text-white text-base mb-1">{isDe ? '5. Ihre Datenschutzrechte' : '5. Your Data Protection Rights'}</h3>
                <p className="text-xs text-slate-600 dark:text-slate-400">
                  {isDe
                    ? 'Gemäß DSGVO haben Sie das Recht auf Auskunft, Berichtigung, Löschung, Einschränkung der Verarbeitung, Datenübertragbarkeit sowie das Recht, erteilte Einwilligungen jederzeit mit Wirkung für die Zukunft zu widerrufen.'
                    : 'Under the GDPR, you have the right to request access, rectification, erasure, restriction of processing, data portability, and withdrawal of consent without affecting the lawfulness of processing based on consent before its withdrawal.'}
                </p>
              </div>
            </div>
          )}

          {/* 3. EXCEL MODEL PREVIEW */}
          {activeModal === 'export-preview' && (
            <div className="space-y-4">
              <div className="p-3 bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-200 dark:border-emerald-800/60 rounded-xl text-xs text-emerald-900 dark:text-emerald-300 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <FileSpreadsheet className="w-4 h-4" />
                  <span>{isDe ? 'Excel-Arbeitsmappenformat (.xlsx) · Formelverknüpft · Nativer Handoff' : 'Excel Workbook Format (.xlsx) · Formula-Linked · Native Handoff'}</span>
                </div>
                <span className="font-mono font-bold">{isDe ? 'Standard M&A Layout' : 'Standard M&A Layout'}</span>
              </div>

              <p className="text-xs text-slate-700 dark:text-slate-300">
                {isDe
                  ? 'VALFENCE exportiert vollständige, formelaktive Excel-Modelle, die institutionellen M&A-Standards entsprechen. Jede Zelle verweist transparent auf ihre zugrundeliegende Datenquelle.'
                  : 'VALFENCE exports complete, formula-active Excel models matching institutional M&A standards. Every cell maps back to its underlying evidence source.'}
              </p>

              <div className="space-y-2 text-xs font-mono">
                <div className="p-3 rounded-lg bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 space-y-1">
                  <div className="flex justify-between font-bold text-blue-700 dark:text-sky-400">
                    <span>{isDe ? 'Tabellenblatt 01: Annahmen & Herkunftsregister' : 'Sheet 01: Inputs & Provenance Register'}</span>
                    <span className="text-emerald-600 dark:text-emerald-400">23 Parameters</span>
                  </div>
                  <p className="text-slate-600 dark:text-slate-400 text-[11px]">{isDe ? 'Dynamische Zellreferenzen mit PDF-Hyperlinks und zeitgestempelten Analysten-Freigaben.' : 'Dynamic cell references with PDF page hyperlinks and timestamped analyst sign-offs.'}</p>
                </div>

                <div className="p-3 rounded-lg bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 space-y-1">
                  <div className="flex justify-between font-bold text-blue-700 dark:text-sky-400">
                    <span>{isDe ? 'Tabellenblatt 02: Energieertrag & Degradation' : 'Sheet 02: Energy Yield & Degradation'}</span>
                    <span className="text-slate-800 dark:text-slate-300">P50 / P75 / P90</span>
                  </div>
                  <p className="text-slate-600 dark:text-slate-400 text-[11px]">{isDe ? 'Brutto-Netto-Ertragswasserfall, Nachlauf- & Übertragungsverluste, 0,4%/Jahr Degradationskurven.' : 'Gross-to-net yield waterfall, wake & transmission losses, 0.4%/yr degradation curves.'}</p>
                </div>

                <div className="p-3 rounded-lg bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 space-y-1">
                  <div className="flex justify-between font-bold text-blue-700 dark:text-sky-400">
                    <span>{isDe ? 'Tabellenblatt 03: Erlöse & Abnahmeverträge' : 'Sheet 03: Revenue & Commercial Offtake'}</span>
                    <span className="text-slate-800 dark:text-slate-300">CfD / PPA / Merchant</span>
                  </div>
                  <p className="text-slate-600 dark:text-slate-400 text-[11px]">{isDe ? '10-jährige vertragliche Preisuntergrenze + Capture-Preiskurven mit Kannibalisierungsabschlägen.' : '10-yr contracted floor structure + capture price curves with solar/wind cannibalization discounts.'}</p>
                </div>

                <div className="p-3 rounded-lg bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 space-y-1">
                  <div className="flex justify-between font-bold text-blue-700 dark:text-sky-400">
                    <span>{isDe ? 'Tabellenblatt 04: 25-Jahre DCF & Wasserfall' : 'Sheet 04: 25-Year DCF & Waterfall'}</span>
                    <span className="text-emerald-600 dark:text-emerald-400">NPV, IRR, DSCR</span>
                  </div>
                  <p className="text-slate-600 dark:text-slate-400 text-[11px]">{isDe ? 'Gesculptete Schuldentilgung, steuerliche Abschreibungen, Dividendenausschüttungen, Sensitivitätsmatrizen.' : 'Sculpted debt repayment, tax depreciation, dividend distributions, sensitivity matrices.'}</p>
                </div>
              </div>
            </div>
          )}

          {/* 4. CASE REVIEW MEMO PREVIEW */}
          {activeModal === 'case-summary' && (
            <div className="space-y-5 text-slate-800 dark:text-slate-200">
              {/* Document Header Banner */}
              <div className="p-4 bg-slate-100 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold uppercase bg-blue-100 dark:bg-blue-950 text-blue-700 dark:text-sky-300 border border-blue-200 dark:border-blue-800">
                      {isDe ? 'INVESTMENT COMMITTEE MEMO (1-SEITER)' : 'INVESTMENT COMMITTEE MEMO (ONE-PAGER)'}
                    </span>
                    <span className="text-xs text-slate-500 font-mono">DOC-ID: VAL-2026-NR48</span>
                  </div>
                  <h3 className="text-base font-bold text-slate-900 dark:text-white">
                    Project North Ridge · 48.0 MW Onshore Wind Farm Acquisition
                  </h3>
                </div>
                <div className="flex items-center gap-2 shrink-0">
                  <span className="inline-flex items-center gap-1 text-xs font-mono font-bold bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300 px-2.5 py-1 rounded border border-emerald-200 dark:border-emerald-800">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    {isDe ? 'IC Gate: Freigegeben' : 'IC Gate: Passed'}
                  </span>
                </div>
              </div>

              {/* Deal Metadata Strip */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs font-mono bg-white dark:bg-slate-950 p-3.5 rounded-xl border border-slate-200 dark:border-slate-800">
                <div>
                  <span className="text-slate-500 block text-[10px] uppercase">{isDe ? 'Asset / Technologie' : 'Asset / Technology'}</span>
                  <span className="font-bold text-slate-900 dark:text-white">Onshore Wind (12x 4.0MW)</span>
                </div>
                <div>
                  <span className="text-slate-500 block text-[10px] uppercase">{isDe ? 'Region / Netz' : 'Geography / Grid'}</span>
                  <span className="font-bold text-slate-900 dark:text-white">Iberia / 110kV Interconnect</span>
                </div>
                <div>
                  <span className="text-slate-500 block text-[10px] uppercase">{isDe ? 'Bewertungsstichtag' : 'Valuation Cutoff'}</span>
                  <span className="font-bold text-slate-900 dark:text-white">30-Jun-2026 (COD Q4-25)</span>
                </div>
                <div>
                  <span className="text-slate-500 block text-[10px] uppercase">{isDe ? 'Geprüft mit' : 'Audited By'}</span>
                  <span className="font-bold text-slate-900 dark:text-white">VALFENCE Automated DCF</span>
                </div>
              </div>

              {/* Executive Recommendation Box */}
              <div className="p-3.5 bg-blue-50/70 dark:bg-blue-950/40 rounded-xl border border-blue-200 dark:border-blue-800/80 text-xs">
                <span className="font-bold text-blue-800 dark:text-sky-300 block mb-1">
                  {isDe ? '1. Management-Empfehlung & Transaktionsbewertung:' : '1. Executive Recommendation & Transaction Pricing:'}
                </span>
                <p className="text-slate-700 dark:text-slate-300 leading-relaxed">
                  {isDe
                    ? 'Freigabe zur Abgabe eines verbindlichen Angebots für 100% des Eigenkapitals an der North Ridge Wind SPV zu einem Unternehmenswert (EV) von €64,20 Mio. (€1.338k/MW) und einem Eigenkapitalkaufpreis von €22,20 Mio. Das Asset liefert eine Basisfall-Eigenkapitalrendite (Equity IRR) von 9,82% gegenüber einer Mindestrendite von 8,50% (+132 bps Spread).'
                    : 'Authorize submission of binding offer for 100% equity in North Ridge Wind SPV at an Enterprise Value of €64.20M (€1,338k/MW) and Equity Purchase Price of €22.20M. The asset delivers a Base Case Equity IRR of 9.82% against an investment hurdle of 8.50% (+132 bps equity spread).'}
                </p>
              </div>

              {/* 4 Core Return Metrics Grid */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                <div className="p-3 rounded-xl bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 shadow-2xs">
                  <span className="text-[11px] text-slate-500 block">{isDe ? 'Basisfall Equity IRR (P50)' : 'Base Equity IRR (P50)'}</span>
                  <div className="text-xl font-extrabold font-mono text-blue-600 dark:text-sky-400 mt-0.5">
                    9.82%
                  </div>
                  <span className="text-[10px] text-slate-400 font-mono">Hurdle: 8.50%</span>
                </div>
                <div className="p-3 rounded-xl bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 shadow-2xs">
                  <span className="text-[11px] text-slate-500 block">{isDe ? 'Downside Equity IRR (P90)' : 'Downside Equity IRR (P90)'}</span>
                  <div className="text-xl font-extrabold font-mono text-amber-600 dark:text-amber-400 mt-0.5">
                    7.41%
                  </div>
                  <span className="text-[10px] text-slate-400 font-mono">Floor: 6.50%</span>
                </div>
                <div className="p-3 rounded-xl bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 shadow-2xs">
                  <span className="text-[11px] text-slate-500 block">{isDe ? 'Min. DSCR (Senior Debt)' : 'Min. DSCR (Senior Debt)'}</span>
                  <div className="text-xl font-extrabold font-mono text-emerald-600 dark:text-emerald-400 mt-0.5">
                    1.35x
                  </div>
                  <span className="text-[10px] text-slate-400 font-mono">Covenant: 1.20x</span>
                </div>
                <div className="p-3 rounded-xl bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 shadow-2xs">
                  <span className="text-[11px] text-slate-500 block">{isDe ? 'Netto Equity MoIC' : 'Net Equity MoIC'}</span>
                  <div className="text-xl font-extrabold font-mono text-indigo-600 dark:text-indigo-400 mt-0.5">
                    2.28x
                  </div>
                  <span className="text-[10px] text-slate-400 font-mono">{isDe ? '25-Jahre Konzession' : '25-Yr Concession'}</span>
                </div>
              </div>

              {/* Material Assumptions with Exact Source Traceability */}
              <div className="space-y-2">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-bold text-slate-900 dark:text-white uppercase font-mono tracking-wider">
                    {isDe ? '2. Modellannahmen & Quellennachweis' : '2. Underwriting Assumptions & Source Traceability'}
                  </span>
                  <span className="text-slate-500 font-mono text-[11px]">{isDe ? '100% Quellen verifiziert' : '100% Cites Verified'}</span>
                </div>

                <div className="rounded-xl border border-slate-200 dark:border-slate-800 overflow-hidden text-xs">
                  <table className="w-full text-left">
                    <thead className="bg-slate-100 dark:bg-slate-950 border-b border-slate-200 dark:border-slate-800 text-[11px] font-mono text-slate-500">
                      <tr>
                        <th className="py-2 px-3 font-semibold">{isDe ? 'Parameter' : 'Parameter'}</th>
                        <th className="py-2 px-3 font-semibold">{isDe ? 'Angesetzter Wert' : 'Adopted Value'}</th>
                        <th className="py-2 px-3 font-semibold">{isDe ? 'Dokumentenquelle' : 'Underlying Evidence Source'}</th>
                        <th className="py-2 px-3 font-semibold text-right">{isDe ? 'Konfidenz' : 'Confidence'}</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-200 dark:divide-slate-800 font-mono bg-white dark:bg-slate-900">
                      <tr>
                        <td className="py-2 px-3 font-semibold text-slate-900 dark:text-white">P50 Net Capacity Factor</td>
                        <td className="py-2 px-3 text-blue-600 dark:text-sky-400 font-bold">34.8% (146.3 GWh)</td>
                        <td className="py-2 px-3 text-slate-600 dark:text-slate-300">DNV GL EYRA Report (Doc #3.1, p. 42)</td>
                        <td className="py-2 px-3 text-right text-emerald-600 dark:text-emerald-400 font-bold">High (P50)</td>
                      </tr>
                      <tr>
                        <td className="py-2 px-3 font-semibold text-slate-900 dark:text-white">Offtake PPA Strike Price</td>
                        <td className="py-2 px-3 text-blue-600 dark:text-sky-400 font-bold">€72.00 / MWh</td>
                        <td className="py-2 px-3 text-slate-600 dark:text-slate-300">Statkraft 10-Yr Term Sheet (Doc #4.2, p. 8)</td>
                        <td className="py-2 px-3 text-right text-emerald-600 dark:text-emerald-400 font-bold">Contracted</td>
                      </tr>
                      <tr>
                        <td className="py-2 px-3 font-semibold text-slate-900 dark:text-white">All-in CapEx</td>
                        <td className="py-2 px-3 text-blue-600 dark:text-sky-400 font-bold">€1,245k / MW</td>
                        <td className="py-2 px-3 text-slate-600 dark:text-slate-300">Turnkey EPC Agreement (Doc #2.1, p. 118)</td>
                        <td className="py-2 px-3 text-right text-emerald-600 dark:text-emerald-400 font-bold">Fixed Wrap</td>
                      </tr>
                      <tr>
                        <td className="py-2 px-3 font-semibold text-slate-900 dark:text-white">Fixed OpEx & Land Lease</td>
                        <td className="py-2 px-3 text-blue-600 dark:text-sky-400 font-bold">€28.5k / MW / yr</td>
                        <td className="py-2 px-3 text-slate-600 dark:text-slate-300">Vestas AOM5000 Agreement (Doc #5.1, Sched C)</td>
                        <td className="py-2 px-3 text-right text-emerald-600 dark:text-emerald-400 font-bold">15-Yr Full Scope</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Stress-Testing Sensitivity Grid */}
              <div className="p-3.5 bg-slate-100 dark:bg-slate-950 rounded-xl border border-slate-200 dark:border-slate-800 space-y-2 text-xs">
                <span className="font-bold text-slate-900 dark:text-white uppercase font-mono tracking-wider block">
                  {isDe ? '3. Bewertungssensitivität & Downside-Szenarien' : '3. Valuation Sensitivity & Downside Breakeven'}
                </span>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 text-slate-700 dark:text-slate-300 font-mono">
                  <div className="p-2 bg-white dark:bg-slate-900 rounded-lg border border-slate-200 dark:border-slate-800">
                    <span className="text-[10px] text-slate-500 block">{isDe ? 'P90 Ertrag (-11,2% Vol)' : 'P90 Yield (-11.2% Vol)'}</span>
                    <strong className="text-amber-600 dark:text-amber-400">7.41% Equity IRR</strong>
                    <span className="text-[10px] text-slate-400 block mt-0.5">{isDe ? 'DSCR: 1,22x (Ausreichend)' : 'DSCR: 1.22x (Comfortable)'}</span>
                  </div>
                  <div className="p-2 bg-white dark:bg-slate-900 rounded-lg border border-slate-200 dark:border-slate-800">
                    <span className="text-[10px] text-slate-500 block">{isDe ? 'Merchant-Preis -15% Post-PPA' : 'Merchant Price -15% Post-PPA'}</span>
                    <strong className="text-blue-600 dark:text-sky-400">8.94% Equity IRR</strong>
                    <span className="text-[10px] text-slate-400 block mt-0.5">{isDe ? 'Schulden voll getilgt J15' : 'Debt fully amortized Y15'}</span>
                  </div>
                  <div className="p-2 bg-white dark:bg-slate-900 rounded-lg border border-slate-200 dark:border-slate-800">
                    <span className="text-[10px] text-slate-500 block">{isDe ? 'Kombinierter Stress (P90 + -10% PPA)' : 'Combined Stress (P90 + -10% PPA)'}</span>
                    <strong className="text-rose-600 dark:text-rose-400">6.18% Equity IRR</strong>
                    <span className="text-[10px] text-slate-400 block mt-0.5">{isDe ? 'Kein Ausfallrisiko auf Vorrangdarlehen' : 'Zero default risk on senior debt'}</span>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Modal Bottom Actions */}
        <div className="bg-slate-100 dark:bg-slate-950 px-6 py-4 border-t border-slate-200 dark:border-slate-800 flex items-center justify-between">
          {activeModal === 'privacy' ? (
            <button
              onClick={() => {
                onClose();
                onOpenPrivacySettings();
              }}
              className="text-xs text-blue-700 dark:text-sky-400 hover:underline font-medium cursor-pointer"
            >
              {isDe ? 'Cookie- & Analyse-Einwilligung konfigurieren' : 'Configure Analytics & Cookie Consent'}
            </button>
          ) : (
            <span className="text-xs text-slate-500 font-mono">
              {isDe ? 'VALFENCE Vorab-Dokument' : 'VALFENCE Pre-Launch Document'}
            </span>
          )}

          <button
            onClick={onClose}
            className="px-4 py-2 rounded-lg bg-slate-200 hover:bg-slate-300 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-900 dark:text-white text-xs font-semibold transition-colors cursor-pointer"
          >
            {isDe ? 'Schließen' : 'Close'}
          </button>
        </div>
      </div>
    </div>
  );
};
