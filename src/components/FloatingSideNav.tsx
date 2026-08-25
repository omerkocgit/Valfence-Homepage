/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { useLanguage } from '../i18n/LanguageContext';
import { trackEvent } from '../services/clarity';

interface FloatingSideNavProps {
  activeSection: string;
}

export const FloatingSideNav: React.FC<FloatingSideNavProps> = ({ activeSection }) => {
  const { t, language } = useLanguage();
  const [hoveredId, setHoveredId] = useState<string | null>(null);

  const sections = [
    { id: 'hero-section', label: language === 'DE' ? 'Start' : 'Overview' },
    { id: 'problem-section', label: t.nav.problem },
    { id: 'workflow-section', label: t.nav.workflow },
    { id: 'concept-section', label: t.nav.workspace },
    { id: 'visual-showcase-section', label: language === 'DE' ? 'Live-Simulation' : 'Visual Showcase' },
    { id: 'benefits-section', label: t.nav.benefits },
    { id: 'differentiation-section', label: t.nav.whyValfence },
    { id: 'pilot-section', label: t.nav.pilotFit },
  ];

  const scrollToSection = (id: string, label: string) => {
    trackEvent('side_nav_click', { section: label });
    const el = document.getElementById(id);
    if (el) {
      const yOffset = -76;
      const y = el.getBoundingClientRect().top + window.pageYOffset + yOffset;
      window.scrollTo({ top: y, behavior: 'smooth' });
    }
  };

  return (
    <aside
      aria-label="Section navigation"
      className="fixed right-3 sm:right-5 top-1/2 -translate-y-1/2 z-40 hidden md:flex flex-col items-end gap-3 pointer-events-none"
    >
      <div className="p-2 rounded-full bg-white/80 dark:bg-slate-900/80 backdrop-blur-md border border-slate-200/80 dark:border-slate-800/80 shadow-md flex flex-col gap-2.5 pointer-events-auto">
        {sections.map((sec) => {
          const isActive =
            activeSection === sec.id ||
            (sec.id === 'hero-section' && !activeSection);

          const isHovered = hoveredId === sec.id;

          return (
            <div
              key={sec.id}
              className="relative flex items-center justify-end group"
              onMouseEnter={() => setHoveredId(sec.id)}
              onMouseLeave={() => setHoveredId(null)}
            >
              {/* Tooltip on left of dot */}
              <div
                className={`absolute right-7 px-2.5 py-1 rounded-md text-xs font-semibold whitespace-nowrap transition-all duration-200 pointer-events-none shadow-sm ${
                  isHovered
                    ? 'opacity-100 translate-x-0 bg-slate-900 text-white dark:bg-white dark:text-slate-900'
                    : 'opacity-0 translate-x-2'
                }`}
              >
                {sec.label}
              </div>

              {/* Dot Button */}
              <button
                type="button"
                onClick={() => scrollToSection(sec.id, sec.label)}
                aria-label={`Scroll to ${sec.label}`}
                className={`w-3.5 h-3.5 rounded-full flex items-center justify-center transition-all duration-300 cursor-pointer focus:outline-none ${
                  isActive
                    ? 'scale-125 ring-2 ring-blue-600 dark:ring-sky-400 bg-blue-600 dark:bg-sky-400 shadow-[0_0_8px_rgba(37,99,235,0.8)]'
                    : 'bg-slate-300 dark:bg-slate-700 hover:bg-blue-400 dark:hover:bg-sky-500 hover:scale-110'
                }`}
              >
                {isActive && (
                  <span className="w-1 h-1 rounded-full bg-white dark:bg-slate-950" />
                )}
              </button>
            </div>
          );
        })}
      </div>
    </aside>
  );
};
