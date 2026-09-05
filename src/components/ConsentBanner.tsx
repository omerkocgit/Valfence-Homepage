/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { ShieldCheck, Cookie, X, CheckCircle2 } from 'lucide-react';
import {
  getSavedConsent,
  saveConsent,
} from '../services/clarity';
import { useDialog } from '../hooks/useDialog';
import { useLanguage } from '../i18n/LanguageContext';

interface ConsentBannerProps {
  forceOpenSettings?: boolean;
  onCloseSettings?: () => void;
}

export const ConsentBanner: React.FC<ConsentBannerProps> = ({
  forceOpenSettings = false,
  onCloseSettings = () => {},
}) => {
  const { t, language } = useLanguage();
  const [showBanner, setShowBanner] = useState<boolean>(false);
  const [showSettingsModal, setShowSettingsModal] = useState<boolean>(false);
  const [analyticsToggle, setAnalyticsToggle] = useState<boolean>(false);

  useEffect(() => {
    // Check if user already gave/denied consent
    const consent = getSavedConsent();
    if (!consent.hasResponded) {
      setShowBanner(true);
    } else {
      setAnalyticsToggle(!!consent.analytics);
    }
  }, []);

  useEffect(() => {
    if (forceOpenSettings) {
      setShowSettingsModal(true);
      const consent = getSavedConsent();
      setAnalyticsToggle(!!consent.analytics);
    }
  }, [forceOpenSettings]);

  const closeSettings = () => {
    setShowSettingsModal(false);
    onCloseSettings();
  };
  const dialogRef = useDialog(showSettingsModal, closeSettings);

  const handleAcceptAll = () => {
    saveConsent(true);
    setAnalyticsToggle(true);
    setShowBanner(false);
    setShowSettingsModal(false);
    onCloseSettings();
  };

  const handleRejectAll = () => {
    saveConsent(false);
    setAnalyticsToggle(false);
    setShowBanner(false);
    setShowSettingsModal(false);
    onCloseSettings();
  };

  const handleSaveCustom = () => {
    saveConsent(analyticsToggle);
    setShowBanner(false);
    setShowSettingsModal(false);
    onCloseSettings();
  };

  return (
    <>
      {/* 1. Floating Banner at Bottom */}
      {showBanner && !showSettingsModal && (
        <div
          id="cookie-consent-banner"
          className="fixed bottom-4 left-4 right-4 md:left-auto md:right-6 md:max-w-md z-50 bg-slate-900/95 backdrop-blur-md border border-slate-700 rounded-2xl shadow-2xl p-5 text-slate-100 text-xs sm:text-sm animate-in fade-in slide-in-from-bottom-4 duration-300"
        >
          <div className="flex items-start gap-3 mb-3">
            <div className="p-2 rounded-lg bg-blue-950 text-sky-400 border border-sky-800/80 shrink-0">
              <Cookie className="w-5 h-5" />
            </div>
            <div>
              <h4 className="font-bold text-white text-sm">
                {t.consent.title}
              </h4>
              <p className="text-xs text-slate-300 mt-1 leading-relaxed">
                {t.consent.description}
              </p>
            </div>
          </div>

          <div className="flex flex-wrap items-center justify-between gap-2 pt-2 border-t border-slate-800">
            <button
              onClick={() => setShowSettingsModal(true)}
              className="text-xs text-slate-400 hover:text-slate-200 underline font-medium cursor-pointer"
            >
              {t.consent.customize}
            </button>

            <div className="flex items-center gap-2">
              <button
                id="btn-consent-decline"
                onClick={handleRejectAll}
                className="px-3.5 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-semibold transition-colors border border-slate-700 cursor-pointer"
              >
                {t.consent.rejectAll}
              </button>
              <button
                id="btn-consent-accept"
                onClick={handleAcceptAll}
                className="px-3.5 py-1.5 rounded-lg bg-blue-600 hover:bg-blue-500 text-white text-xs font-semibold transition-colors shadow-sm cursor-pointer"
              >
                {t.consent.acceptAll}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 2. Detailed Consent Settings Modal */}
      {showSettingsModal && (
        <div
          className="fixed inset-0 z-[70] flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm"
          ref={dialogRef}
          tabIndex={-1}
          aria-labelledby="consent-settings-title"
          role="dialog"
          aria-modal="true"
        >
          <div className="relative w-full max-w-lg bg-slate-900 border border-slate-700 rounded-2xl shadow-2xl max-h-[calc(100dvh-2rem)] overflow-y-auto p-5 sm:p-6 text-slate-100 space-y-5">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-5 h-5 text-sky-400" />
                <h3 id="consent-settings-title" className="font-bold text-base text-white">
                  {t.consent.settingsTitle}
                </h3>
              </div>
              <button
                onClick={closeSettings}
                aria-label={language === 'DE' ? 'Einstellungen schließen' : 'Close settings'}
                className="p-1 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <p className="text-xs text-slate-300 leading-relaxed">
              {t.consent.settingsSubtitle}
            </p>

            <div className="space-y-3 text-xs">
              {/* Essential Cookies */}
              <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 flex items-start justify-between gap-3">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-white text-sm">{t.consent.essentialTitle}</span>
                    <span className="text-[10px] bg-slate-800 text-slate-400 px-2 py-0.5 rounded font-mono">
                      {t.consent.alwaysActive}
                    </span>
                  </div>
                  <p className="text-slate-400 text-xs mt-1">
                    {t.consent.essentialDesc}
                  </p>
                </div>
                <div className="w-5 h-5 rounded bg-emerald-600/30 text-emerald-400 flex items-center justify-center border border-emerald-500/50 shrink-0">
                  <CheckCircle2 className="w-4 h-4" />
                </div>
              </div>

              {/* Microsoft Clarity Analytics */}
              <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 flex items-start justify-between gap-3">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-white text-sm">{t.consent.analyticsTitle}</span>

                  </div>
                  <p className="text-slate-400 text-xs mt-1">
                    {t.consent.analyticsDesc}
                  </p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer shrink-0 mt-1">
                  <input
                    type="checkbox"
                    aria-label={t.consent.analyticsTitle}
                    checked={analyticsToggle}
                    onChange={(e) => setAnalyticsToggle(e.target.checked)}
                    className="sr-only peer"
                  />
                  <div className="w-9 h-5 bg-slate-800 peer-focus-visible:ring-2 peer-focus-visible:ring-sky-400 peer-focus-visible:ring-offset-2 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-blue-600"></div>
                </label>
              </div>
            </div>

            <div className="flex flex-wrap gap-3 items-center justify-between pt-3 border-t border-slate-800">
              <button
                onClick={handleRejectAll}
                className="px-4 py-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-semibold transition-colors cursor-pointer"
              >
                {t.consent.rejectAll}
              </button>
              <div className="flex items-center gap-2">
                <button
                  onClick={handleSaveCustom}
                  className="px-4 py-2 rounded-lg bg-blue-600 hover:bg-blue-500 text-white text-xs font-semibold transition-colors cursor-pointer"
                >
                  {t.consent.savePreferences}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
