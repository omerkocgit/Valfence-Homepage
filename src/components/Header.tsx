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
import { ArrowUpRight, Sparkles } from 'lucide-react';

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

  useEffect(() => {
    const header = document.getElementById('main-navigation');
    if (!header) return;
    const updateHeight = () => {
      document.documentElement.style.setProperty('--header-height', `${header.getBoundingClientRect().height}px`);
    };
    const observer = new ResizeObserver(updateHeight);
    observer.observe(header);
    updateHeight();
    return () => observer.disconnect();
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
    trackEvent('nav_click', { section: label });
    const el = document.getElementById(sectionId);
    if (el) {
      const yOffset = -(document.getElementById('main-navigation')?.getBoundingClientRect().height ?? 72) - 8;
      const y = el.getBoundingClientRect().top + window.pageYOffset + yOffset;
      window.scrollTo({ top: y, behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'instant' : 'smooth' });
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
        <div className="flex flex-wrap lg:flex-nowrap items-center justify-between min-h-18 py-3 lg:py-0 gap-y-2">
          {/* Logo */}
          <div className="order-1 flex items-center min-w-0 shrink-0">
            <a
              href="#"
              id="nav-logo-link"
              className="flex items-center group transition-transform focus:outline-none"
              onClick={(e) => {
                e.preventDefault();
                window.scrollTo({ top: 0, behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'instant' : 'smooth' });
              }}
            >
              <BrandLogo variant="horizontal" theme="auto" size="md" className="header-brand" />
            </a>
          </div>

          {/* Desktop Navigation with Active Scroll-Spy Indicator & Smooth Scale Highlight */}
          <nav className="order-3 lg:order-2 w-full lg:w-auto grid grid-cols-3 sm:flex items-center justify-center gap-1 lg:gap-0.5 xl:gap-1 mx-auto px-1 pb-1 lg:pb-0">
            {navItems.map((item) => {
              const isActive =
                activeSection === item.id ||
                (item.id === 'concept-section' && activeSection === 'visual-showcase-section') ||
                (item.id === 'pilot-section' && activeSection === 'roadmap-section');
              return (
                <button
                  key={item.id}
                  id={`nav-link-${item.id}`}
                  aria-current={isActive ? 'location' : undefined}
                  onClick={() => handleNavClick(item.id, item.label)}
                  className={`min-w-0 h-full px-1.5 xl:px-2 py-1.5 rounded-lg transition-all duration-200 origin-center relative cursor-pointer sm:whitespace-nowrap shrink-0 text-[11px] xl:text-xs border ${
                    isActive
                      ? 'text-blue-700 dark:text-sky-300 font-bold bg-blue-50 dark:bg-blue-950/90 border-blue-300 dark:border-blue-700 shadow-sm scale-105 z-10'
                      : item.isSpecial
                      ? 'text-blue-600 dark:text-sky-400 hover:bg-blue-50/60 dark:hover:bg-blue-950/40 border-transparent font-semibold hover:scale-[1.02]'
                      : 'text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100/80 dark:hover:bg-slate-800/60 border-transparent font-medium hover:scale-[1.02]'
                  }`}
                >
                  <span className="flex items-center justify-center gap-1 sm:gap-1.5 whitespace-normal sm:whitespace-nowrap">
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
          <div className="order-2 lg:order-3 flex items-center gap-1.5 xl:gap-2 shrink-0 ml-2 xl:ml-3 pl-2 xl:pl-3 border-l border-slate-200 dark:border-slate-800">
            <ThemeToggle isDark={isDark} onToggle={onToggleTheme} />

            <a
              id="header-cta-pilot"
              href="mailto:info.valfence@gmail.com?subject=VALFENCE%20pilot%20enquiry"
              onClick={() => trackEvent('cta_click', { location: 'header' })}
              className="hidden sm:inline-flex items-center gap-1.5 bg-blue-600 hover:bg-blue-700 active:bg-blue-800 text-white dark:bg-blue-600 dark:hover:bg-blue-500 text-[11px] xl:text-xs font-semibold px-2 xl:px-3 py-2 rounded-lg shadow-xs transition-all active:scale-[0.98] whitespace-nowrap shrink-0"
            >
              <span>{t.nav.discussPilot}</span>
              <ArrowUpRight className="w-4 h-4 text-blue-100 shrink-0" />
            </a>

            {/* Language Switcher to the right of Discuss a pilot */}
            <LanguageSwitcher className="shrink-0" />
          </div>

        </div>
      </div>
    </header>
  );
};
