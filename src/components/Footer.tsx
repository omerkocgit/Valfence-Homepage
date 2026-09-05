/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { BrandLogo } from './BrandLogo';
import { ModalType } from '../types';
import { Mail, Cookie, Sparkles } from 'lucide-react';
import { useLanguage } from '../i18n/LanguageContext';
import { trackEvent } from '../services/clarity';

interface FooterProps {
  onOpenModal: (modal: ModalType) => void;
  onOpenConsentSettings: () => void;
}

export const Footer: React.FC<FooterProps> = ({
  onOpenModal,
  onOpenConsentSettings,
}) => {
  const { t } = useLanguage();

  const scrollToSection = (id: string, label: string) => {
    trackEvent('footer_nav_click', { section: label });
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'instant' : 'smooth' });
    }
  };

  return (
    <footer className="bg-slate-100 dark:bg-slate-950 text-slate-600 dark:text-slate-400 text-xs border-t border-slate-200 dark:border-slate-800 pt-16 pb-12 transition-colors duration-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 pb-12 border-b border-slate-200 dark:border-slate-800">
          {/* Brand & Descriptor */}
          <div className="md:col-span-5 space-y-4">
            <BrandLogo variant="horizontal" theme="auto" size="md" />
            <p className="text-sm text-slate-600 dark:text-slate-300 max-w-sm leading-relaxed">
              {t.footer.tagline}
            </p>
            <div className="pt-2 flex items-center gap-3">
              <a
                href="mailto:info.valfence@gmail.com?subject=VALFENCE%20pilot%20enquiry"
                className="inline-flex items-center gap-1.5 text-xs text-blue-700 dark:text-sky-400 hover:underline font-mono font-medium"
              >
                <Mail className="w-4 h-4" />
                <span>info.valfence@gmail.com</span>
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="md:col-span-3 space-y-3">
            <span className="text-xs font-mono uppercase text-slate-900 dark:text-slate-200 font-bold tracking-wider">
              {t.footer.exploreTitle}
            </span>
            <ul className="space-y-2 text-slate-600 dark:text-slate-400">
              <li>
                <button
                  onClick={() => scrollToSection('problem-section', 'Problem')}
                  className="hover:text-blue-700 dark:hover:text-white transition-colors cursor-pointer"
                >
                  {t.footer.linkProblem}
                </button>
              </li>
              <li>
                <button
                  onClick={() => scrollToSection('workflow-section', 'Workflow')}
                  className="hover:text-blue-700 dark:hover:text-white transition-colors cursor-pointer"
                >
                  {t.footer.linkWorkflow}
                </button>
              </li>
              <li>
                <button
                  onClick={() => scrollToSection('concept-section', 'Concept Interface')}
                  className="hover:text-blue-700 dark:hover:text-sky-400 transition-colors inline-flex items-center gap-1 cursor-pointer"
                >
                  <span>{t.footer.linkWorkspace}</span>
                  <Sparkles className="w-3 h-3 text-blue-600 dark:text-sky-400" />
                </button>
              </li>
              <li>
                <button
                  onClick={() => scrollToSection('benefits-section', 'Benefits')}
                  className="hover:text-blue-700 dark:hover:text-white transition-colors cursor-pointer"
                >
                  {t.footer.linkBenefits}
                </button>
              </li>
              <li>
                <button
                  onClick={() => scrollToSection('pilot-section', 'Pilot Scope')}
                  className="hover:text-blue-700 dark:hover:text-white transition-colors cursor-pointer"
                >
                  {t.footer.linkPilot}
                </button>
              </li>
            </ul>
          </div>

          {/* Governance & Core Principles */}
          <div className="md:col-span-4 space-y-3">
            <span className="text-xs font-mono uppercase text-slate-900 dark:text-slate-200 font-bold tracking-wider">
              {t.footer.principlesTitle}
            </span>
            <ul className="space-y-2 text-slate-600 dark:text-slate-400 text-xs">
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-blue-600 dark:bg-sky-400" />
                <span>{t.footer.principle1}</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-600 dark:bg-emerald-400" />
                <span>{t.footer.principle2}</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-indigo-600 dark:bg-indigo-400" />
                <span>{t.footer.principle3}</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-purple-600 dark:bg-purple-400" />
                <span>{t.footer.principle4}</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Legal, Consent and Disclaimer Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500 dark:text-slate-400">
          <div>
            <span>{t.footer.copyright}</span>
          </div>

          <div className="flex flex-wrap items-center gap-4">
            <button
              id="footer-link-imprint"
              onClick={() => onOpenModal('imprint')}
              className="hover:text-slate-900 dark:hover:text-white transition-colors cursor-pointer"
            >
              {t.footer.imprint}
            </button>
            <span className="text-slate-300 dark:text-slate-700">·</span>
            <button
              id="footer-link-privacy"
              onClick={() => onOpenModal('privacy')}
              className="hover:text-slate-900 dark:hover:text-white transition-colors cursor-pointer"
            >
              {t.footer.privacy}
            </button>
            <span className="text-slate-300 dark:text-slate-700">·</span>
            <button
              id="footer-link-consent"
              onClick={onOpenConsentSettings}
              className="hover:text-blue-700 dark:hover:text-sky-400 transition-colors inline-flex items-center gap-1 cursor-pointer"
            >
              <Cookie className="w-3.5 h-3.5" />
              <span>{t.footer.cookieSettings}</span>
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};
