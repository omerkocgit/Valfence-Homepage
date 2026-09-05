/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { useDialog } from '../hooks/useDialog';
import { DemoPreview } from './DemoPreview';
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

  const dialogRef = useDialog(activeModal !== 'none' && activeModal !== 'consent-settings', onClose);

  if (activeModal === 'none' || activeModal === 'consent-settings') {
    return null;
  }

  return (
    <div
      className="fixed inset-0 z-[70] flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm overflow-y-auto"
      ref={dialogRef}
      tabIndex={-1}
      aria-labelledby="legal-modal-title"
      role="dialog"
      aria-modal="true"
    >
      <div className="relative w-full max-w-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl shadow-2xl overflow-hidden max-h-[calc(100dvh-2rem)] flex flex-col text-slate-900 dark:text-slate-100">
        {/* Modal Top Header */}
        <div className="bg-slate-100 dark:bg-slate-950 px-4 sm:px-6 py-4 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <BrandLogo variant="mark-only" size="sm" />
            <h2 id="legal-modal-title" className="text-base font-bold text-slate-900 dark:text-white">
              {activeModal === 'imprint' && (isDe ? 'Vorläufiges Impressum' : 'Interim Imprint (Impressum)')}
              {activeModal === 'privacy' && (isDe ? 'Vorläufige Datenschutzerklärung' : 'Interim Privacy Notice (Datenschutzerklärung)')}
              {activeModal === 'export-preview' && (isDe ? 'Modellvorschau' : 'Model preview')}
              {activeModal === 'case-summary' && (isDe ? 'Demo-Memo' : 'Demo memo')}
            </h2>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-500 hover:text-slate-900 hover:bg-slate-200 dark:text-slate-400 dark:hover:text-white dark:hover:bg-slate-800 transition-colors cursor-pointer"
            aria-label={isDe ? "Dialog schließen" : "Close modal"}
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Content Scroll Area */}
        <div className="p-4 sm:p-6 overflow-y-auto space-y-5 text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
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

          {(activeModal === 'export-preview' || activeModal === 'case-summary') && (
            <DemoPreview kind={activeModal} />
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
