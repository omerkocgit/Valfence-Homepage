/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * 
 * Microsoft Clarity Integration & Consent Management
 * Project ID: y6e38bczqs
 * Implements Microsoft Clarity Consent API V2
 */

import { ConsentState } from '../types';

const CLARITY_PROJECT_ID = 'y6e38bczqs';
const STORAGE_KEY = 'valfence_consent_state_v1';

declare global {
  interface Window {
    clarity?: (...args: any[]) => void;
    _clarityLoaded?: boolean;
  }
}

/**
 * Retrieves the saved consent state from localStorage
 */
export function getSavedConsent(): ConsentState {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      return JSON.parse(saved);
    }
  } catch (e) {
    console.error('Failed to read consent state', e);
  }
  return {
    analytics: false,
    essential: true,
    hasResponded: false,
  };
}

/**
 * Saves consent and initializes or updates Clarity status
 */
export function saveConsent(analyticsGranted: boolean): ConsentState {
  const newState: ConsentState = {
    analytics: analyticsGranted,
    essential: true,
    hasResponded: true,
    updatedAt: new Date().toISOString(),
  };

  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(newState));
  } catch (e) {
    console.error('Failed to save consent state', e);
  }

  if (analyticsGranted) {
    initClarity(true);
  } else {
    revokeClarityConsent();
  }

  return newState;
}

/**
 * Dynamically loads Microsoft Clarity script only when consent is granted
 */
export function initClarity(consentGranted: boolean) {
  if (typeof window === 'undefined') return;

  if (consentGranted && !window._clarityLoaded) {
    (function (c: any, l: any, a: any, r: any, i: any, t?: any, y?: any) {
      c[a] =
        c[a] ||
        function () {
          (c[a].q = c[a].q || []).push(arguments);
        };
      t = l.createElement(r);
      t.async = 1;
      t.src = 'https://www.clarity.ms/tag/' + i;
      y = l.getElementsByTagName(r)[0];
      y.parentNode.insertBefore(t, y);
      window._clarityLoaded = true;
    })(window, document, 'clarity', 'script', CLARITY_PROJECT_ID);

    // Call Clarity Consent API V2
    if (window.clarity) {
      window.clarity('consent', true);
    }
  } else if (window.clarity) {
    window.clarity('consent', consentGranted);
  }
}

/**
 * Revokes Clarity consent
 */
export function revokeClarityConsent() {
  if (typeof window !== 'undefined' && window.clarity) {
    window.clarity('consent', false);
  }
}

/**
 * Custom telemetry / event tracker that respects consent
 */
export function trackEvent(eventName: string, metadata?: Record<string, any>) {
  const consent = getSavedConsent();
  if (!consent.analytics) {
    return;
  }

  if (typeof window !== 'undefined' && window.clarity) {
    window.clarity('event', eventName);
    if (metadata) {
      window.clarity('set', metadata);
    }
  }
}
