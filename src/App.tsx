/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { LanguageProvider } from './i18n/LanguageContext';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { AudienceStrip } from './components/AudienceStrip';
import { VisualShowcaseSection } from './components/VisualShowcaseSection';
import { ConceptWorkspace } from './components/ConceptWorkspace';
import { ProblemSection } from './components/ProblemSection';
import { WorkflowSection } from './components/WorkflowSection';
import { BenefitsSection } from './components/BenefitsSection';
import { DifferentiationSection } from './components/DifferentiationSection';
import { PilotSection } from './components/PilotSection';
import { RoadmapSection } from './components/RoadmapSection';
import { FinalCTA } from './components/FinalCTA';
import { Footer } from './components/Footer';
import { LegalModals } from './components/LegalModals';
import { ConsentBanner } from './components/ConsentBanner';
import { ScrollProgressBar } from './components/ScrollProgressBar';
import { AmbientBackground } from './components/AmbientBackground';
import { FloatingSideNav } from './components/FloatingSideNav';
import { ModalType } from './types';
import { initClarity, getSavedConsent } from './services/clarity';

export default function App() {
  return (
    <LanguageProvider>
      <MainAppContent />
    </LanguageProvider>
  );
}

function MainAppContent() {
  const [activeModal, setActiveModal] = useState<ModalType>('none');
  const [isOpenConsentSettings, setIsOpenConsentSettings] = useState<boolean>(false);
  const [isDark, setIsDark] = useState<boolean>(false);
  const [activeSection, setActiveSection] = useState<string>('hero-section');

  // Initialize theme from localStorage or default to clean light mode
  useEffect(() => {
    const savedTheme = localStorage.getItem('valfence_theme');
    if (savedTheme === 'dark') {
      setIsDark(true);
      document.documentElement.classList.add('dark');
    } else {
      setIsDark(false);
      document.documentElement.classList.remove('dark');
    }
  }, []);

  const handleToggleTheme = () => {
    setIsDark((prev) => {
      const next = !prev;
      if (next) {
        document.documentElement.classList.add('dark');
        localStorage.setItem('valfence_theme', 'dark');
      } else {
        document.documentElement.classList.remove('dark');
        localStorage.setItem('valfence_theme', 'light');
      }
      return next;
    });
  };

  // Initialize Microsoft Clarity conditionally if consent was previously given
  useEffect(() => {
    const saved = getSavedConsent();
    if (saved.analytics) {
      initClarity(true);
    }
  }, []);

  // Precise ScrollSpy that tracks each individual section for header and side nav dots
  useEffect(() => {
    const sections = [
      { id: 'hero-section' },
      { id: 'problem-section' },
      { id: 'workflow-section' },
      { id: 'concept-section' },
      { id: 'visual-showcase-section' },
      { id: 'benefits-section' },
      { id: 'differentiation-section' },
      { id: 'pilot-section' },
      { id: 'roadmap-section' },
    ];

    let ticking = false;
    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          if (window.scrollY < 120) {
            setActiveSection('');
            ticking = false;
            return;
          }

          // Check sections relative to a 180px viewport trigger line
          const viewportCheckLine = 180;
          let currentActive = '';

          for (const sec of sections) {
            const el = document.getElementById(sec.id);
            if (el) {
              const rect = el.getBoundingClientRect();
              if (rect.top <= viewportCheckLine && rect.bottom > viewportCheckLine) {
                currentActive = sec.id;
                break;
              }
            }
          }

          // Option A: Map roadmap-section and bottom of the page to 'pilot-section'
          // so "Pilot & Fit" and the institutional partnership/roadmap stay consistently highlighted
          if (
            currentActive === 'roadmap-section' ||
            window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 350
          ) {
            currentActive = 'pilot-section';
          }

          if (currentActive !== undefined) {
            setActiveSection(currentActive);
          }
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleExploreWorkflow = () => {
    const el = document.getElementById('concept-section');
    if (el) {
      const yOffset = -76;
      const y = el.getBoundingClientRect().top + window.pageYOffset + yOffset;
      window.scrollTo({ top: y, behavior: 'smooth' });
    }
  };

  const handleOpenPilotEnquiry = () => {
    window.location.href = 'mailto:info.valfence@gmail.com?subject=VALFENCE%20pilot%20enquiry';
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 flex flex-col font-sans selection:bg-blue-600 selection:text-white transition-colors duration-200 relative w-full">
      {/* 0. Top Viewport Scroll Progress Bar */}
      <ScrollProgressBar />

      {/* 0. Subtle Dynamic Ambient Mesh & Glow (Z-0) */}
      <AmbientBackground />

      {/* 1. Header Navigation with Fixed Position, ScrollSpy & Theme Toggle */}
      <Header
        activeSection={activeSection}
        isDark={isDark}
        onToggleTheme={handleToggleTheme}
        onOpenPilotEnquiry={handleOpenPilotEnquiry}
      />

      {/* 2. FullPage-Style Floating Side Dots (Proximity Snap Indicator) */}
      <FloatingSideNav activeSection={activeSection} />

      {/* 3. Main Content with Top Padding to accommodate the 72px (h-18) fixed header */}
      <main className="flex-1 relative z-10 pt-18">
        {/* 1. Hero Section with Motion Reveals */}
        <div className="snap-section">
          <Hero onExploreClick={handleExploreWorkflow} />
        </div>

        {/* 2. Audience Strip with Staggered Fade-in */}
        <AudienceStrip />

        {/* 3. Problem Statement & 3 Pain Cards (Nav 1: Problem) */}
        <div className="snap-section">
          <ProblemSection />
        </div>

        {/* 4. Workflow & Operating Principle (Nav 2: Workflow) */}
        <div className="snap-section">
          <WorkflowSection />
        </div>

        {/* 5. Interactive Live Concept Interface (Nav 3: Live Workspace) */}
        <div className="snap-section">
          <ConceptWorkspace onOpenModal={(modal) => setActiveModal(modal)} />
        </div>

        {/* 6. Interactive Visual Showcase (Graph, Simulator, Scanner) */}
        <div className="snap-section">
          <VisualShowcaseSection />
        </div>

        {/* 7. Key Benefits with Animated Numbers (Nav 4: Benefits) */}
        <div className="snap-section">
          <BenefitsSection />
        </div>

        {/* 8. Differentiation & 4-Way Comparison Matrix (Nav 5: Why VALFENCE) */}
        <div className="snap-section">
          <DifferentiationSection />
        </div>

        {/* 9. First Validation Pilot & Interactive Case Fit Tool (Nav 6: Pilot & Fit) */}
        <div className="snap-section">
          <PilotSection />
        </div>

        {/* 10. Long-Term Direction / Roadmap */}
        <div className="snap-section">
          <RoadmapSection />
        </div>

        {/* 11. Final Conversion CTA Banner */}
        <FinalCTA />
      </main>

      {/* 13. Footer */}
      <Footer
        onOpenModal={(modal) => setActiveModal(modal)}
        onOpenConsentSettings={() => setIsOpenConsentSettings(true)}
      />

      {/* 14. Legal & Preview Modals (Imprint, Privacy, Excel Model, Memo) */}
      <LegalModals
        activeModal={activeModal}
        onClose={() => setActiveModal('none')}
        onOpenPrivacySettings={() => {
          setActiveModal('none');
          setIsOpenConsentSettings(true);
        }}
      />

      {/* 15. GDPR Cookie & Microsoft Clarity Consent Banner / Modal */}
      <ConsentBanner
        isOpenSettings={isOpenConsentSettings}
        onCloseSettings={() => setIsOpenConsentSettings(false)}
      />
    </div>
  );
}

