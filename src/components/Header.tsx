/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { BrandLogo } from './BrandLogo';
import { ThemeToggle } from './ThemeToggle';
import { LanguageSwitcher } from './LanguageSwitcher';
import { useLanguage } from '../i18n/LanguageContext';
import { trackEvent } from '../services/clarity';
import { Menu, X, ArrowUpRight, Sparkles } from 'lucide-react';

interface HeaderProps {
  activeSection: string;
  isDark: boolean;
  onToggleTheme: () => void;
  onOpenPilotEnquiry: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  activeSection,
  isDark,
  onToggleTheme,
  onOpenPilotEnquiry,
}) => {
  const { t } = useLanguage();
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    let ticking = false;
    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          setIsScrolled(window.scrollY > 15);
          ticking = false;
        });
        ticking = true;
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { id: 'problem-section', label: t.nav.problem },
    { id: 'workflow-section', label: t.nav.workflow },
    { id: 'concept-section', label: t.nav.workspace, isSpecial: true },
    { id: 'benefits-section', label: t.nav.benefits },
    { id: 'differentiation-section', label: t.nav.whyValfence },
    { id: 'pilot-section', label: t.nav.pilotFit },
  ];

  const handleNavClick = (sectionId: string, label: string) => {
    setMobileMenuOpen(false);
    trackEvent('nav_click', { section: label });
    const el = document.getElementById(sectionId);
    if (el) {
      const yOffset = -75;
      const y = el.getBoundingClientRect().top + window.pageYOffset + yOffset;
      window.scrollTo({ top: y, behavior: 'smooth' });
    }
  };

  return (
    <header
      id="main-navigation"
      className={`fixed top-0 left-0 right-0 z-50 w-full transition-all duration-200 ${
        isScrolled
          ? 'bg-white/90 dark:bg-slate-950/90 backdrop-blur-md border-b border-slate-200/80 dark:border-slate-800/80 shadow-sm'
          : 'bg-transparent border-b border-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-18">
          {/* Logo */}
          <div className="flex items-center shrink-0">
            <a
              href="#"
              id="nav-logo-link"
              className="flex items-center group transition-transform focus:outline-none"
              onClick={(e) => {
                e.preventDefault();
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
            >
              <BrandLogo variant="horizontal" theme="auto" size="md" />
            </a>
          </div>

          {/* Desktop Navigation with Active Scroll-Spy Indicator & Smooth Scale Highlight */}
          <nav className="hidden lg:flex items-center gap-1 xl:gap-2 mx-auto px-2">
            {navItems.map((item) => {
              const isActive =
                activeSection === item.id ||
                (item.id === 'concept-section' && activeSection === 'visual-showcase-section') ||
                (item.id === 'pilot-section' && activeSection === 'roadmap-section');
              return (
                <button
                  key={item.id}
                  id={`nav-link-${item.id}`}
                  onClick={() => handleNavClick(item.id, item.label)}
                  className={`px-2.5 xl:px-3 py-1.5 rounded-lg transition-all duration-200 origin-center relative cursor-pointer whitespace-nowrap shrink-0 text-xs xl:text-sm border ${
                    isActive
                      ? 'text-blue-700 dark:text-sky-300 font-bold bg-blue-50 dark:bg-blue-950/90 border-blue-300 dark:border-blue-700 shadow-sm scale-105 z-10'
                      : item.isSpecial
                      ? 'text-blue-600 dark:text-sky-400 hover:bg-blue-50/60 dark:hover:bg-blue-950/40 border-transparent font-semibold hover:scale-[1.02]'
                      : 'text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100/80 dark:hover:bg-slate-800/60 border-transparent font-medium hover:scale-[1.02]'
                  }`}
                >
                  <span className="flex items-center gap-1.5 whitespace-nowrap">
                    {item.isSpecial && (
                      <Sparkles className="w-3.5 h-3.5 text-blue-600 dark:text-sky-400 shrink-0" />
                    )}
                    <span>{item.label}</span>
                  </span>
                  {isActive && (
                    <span className="absolute -bottom-1 left-2.5 right-2.5 h-0.5 bg-blue-600 dark:bg-sky-400 rounded-full shadow-[0_0_8px_rgba(37,99,235,0.8)]" />
                  )}
                </button>
              );
            })}
          </nav>

          {/* Right Controls: Theme Toggle, Primary Action & Language Switcher with Dedicated Separation */}
          <div className="hidden lg:flex items-center gap-2 xl:gap-3 shrink-0 ml-3 xl:ml-6 pl-3 xl:pl-4 border-l border-slate-200 dark:border-slate-800">
            <ThemeToggle isDark={isDark} onToggle={onToggleTheme} />

            <a
              id="header-cta-pilot"
              href="mailto:info.valfence@gmail.com?subject=VALFENCE%20pilot%20enquiry"
              onClick={() => trackEvent('cta_click', { location: 'header' })}
              className="inline-flex items-center gap-1.5 bg-blue-600 hover:bg-blue-700 active:bg-blue-800 text-white dark:bg-blue-600 dark:hover:bg-blue-500 text-xs xl:text-sm font-semibold px-3 xl:px-4 py-2 rounded-lg shadow-xs transition-all active:scale-[0.98] whitespace-nowrap shrink-0"
            >
              <span>{t.nav.discussPilot}</span>
              <ArrowUpRight className="w-4 h-4 text-blue-100 shrink-0" />
            </a>

            {/* Language Switcher to the right of Discuss a pilot */}
            <LanguageSwitcher className="shrink-0" />
          </div>

          {/* Mobile & Tablet hamburger, Language Switcher & Theme Toggle */}
          <div className="flex lg:hidden items-center gap-2 shrink-0">
            <LanguageSwitcher />
            <ThemeToggle isDark={isDark} onToggle={onToggleTheme} />
            <button
              id="mobile-menu-toggle"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800 focus:outline-none cursor-pointer"
              aria-label="Toggle navigation menu"
              aria-expanded={mobileMenuOpen}
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile & Tablet dropdown */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-white dark:bg-slate-950 border-b border-slate-200 dark:border-slate-800 px-4 pt-2 pb-6 space-y-1.5 shadow-lg">
          {navItems.map((item) => {
            const isActive = activeSection === item.id;
            return (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id, item.label)}
                className={`w-full text-left px-3 py-2.5 rounded-lg text-sm transition-colors flex items-center justify-between ${
                  isActive
                    ? 'bg-blue-50 dark:bg-slate-800 text-blue-600 dark:text-sky-400 font-bold'
                    : 'text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800'
                }`}
              >
                <span>{item.label}</span>
                {isActive && (
                  <span className="text-xs bg-blue-100 dark:bg-blue-950 text-blue-700 dark:text-sky-300 px-2 py-0.5 rounded font-mono">
                    Active
                  </span>
                )}
              </button>
            );
          })}
          <div className="pt-3 border-t border-slate-200 dark:border-slate-800 flex flex-col gap-2">
            <a
              href="mailto:info.valfence@gmail.com?subject=VALFENCE%20pilot%20enquiry"
              onClick={() => trackEvent('cta_click', { location: 'mobile_menu' })}
              className="flex items-center justify-center gap-2 w-full bg-blue-600 hover:bg-blue-700 active:bg-blue-800 text-white font-semibold py-2.5 px-4 rounded-lg text-sm text-center"
            >
              <span>{t.nav.discussPilot}</span>
              <ArrowUpRight className="w-4 h-4 text-blue-100" />
            </a>
          </div>
        </div>
      )}
    </header>
  );
};
