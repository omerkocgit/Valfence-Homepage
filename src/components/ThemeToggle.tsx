/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { Sun, Moon } from 'lucide-react';
import { motion } from 'motion/react';
import { trackEvent } from '../services/clarity';

interface ThemeToggleProps {
  isDark: boolean;
  onToggle: () => void;
}

export const ThemeToggle: React.FC<ThemeToggleProps> = ({ isDark, onToggle }) => {
  return (
    <button
      id="theme-toggle-btn"
      type="button"
      onClick={() => {
        onToggle();
        trackEvent('theme_toggled', { mode: !isDark ? 'dark' : 'light' });
      }}
      className="relative flex items-center p-1 rounded-full border border-slate-200 dark:border-slate-700/80 bg-slate-100/90 dark:bg-slate-900/90 shadow-2xs hover:border-slate-300 dark:hover:border-slate-600 transition-colors select-none cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500"
      aria-label={isDark ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
      title={isDark ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
    >
      <div className="relative flex items-center gap-1">
        {/* Animated Sliding Pill Background */}
        <motion.div
          className="absolute top-0 bottom-0 rounded-full bg-white dark:bg-slate-800 shadow-xs border border-slate-200/80 dark:border-slate-700/80"
          layout
          transition={{ type: 'spring', stiffness: 500, damping: 35 }}
          style={{
            width: '50%',
            left: isDark ? '50%' : '0%',
          }}
        />

        {/* Light Option */}
        <span
          className={`relative z-10 flex items-center justify-center gap-1 px-2 py-1 rounded-full text-[11px] font-mono font-medium transition-colors ${
            !isDark
              ? 'text-slate-900 font-bold'
              : 'text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
          }`}
        >
          <motion.div
            animate={{ rotate: !isDark ? 0 : -90, scale: !isDark ? 1 : 0.85 }}
            transition={{ duration: 0.2 }}
          >
            <Sun className={`w-3.5 h-3.5 ${!isDark ? 'text-amber-500' : 'text-slate-400'}`} />
          </motion.div>
          <span className="hidden sm:inline">Light</span>
        </span>

        {/* Dark Option */}
        <span
          className={`relative z-10 flex items-center justify-center gap-1 px-2 py-1 rounded-full text-[11px] font-mono font-medium transition-colors ${
            isDark
              ? 'text-white font-bold'
              : 'text-slate-500 hover:text-slate-900'
          }`}
        >
          <motion.div
            animate={{ rotate: isDark ? 0 : 90, scale: isDark ? 1 : 0.85 }}
            transition={{ duration: 0.2 }}
          >
            <Moon className={`w-3.5 h-3.5 ${isDark ? 'text-sky-400' : 'text-slate-400'}`} />
          </motion.div>
          <span className="hidden sm:inline">Dark</span>
        </span>
      </div>
    </button>
  );
};
