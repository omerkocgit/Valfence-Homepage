import type {ConsentState} from '../types';

const CLARITY_PROJECT_ID = 'y6e38bczqs';
const STORAGE_KEY = 'valfence_consent_state_v1';
const defaultConsent = (): ConsentState => ({analytics: false, essential: true, hasResponded: false});
let sessionConsent: ConsentState | undefined;

declare global {
  interface Window {
    clarity?: ((...args: any[]) => void) & {q?: unknown[][]};
    _clarityLoaded?: boolean;
  }
}

export function getSavedConsent(): ConsentState {
  if (sessionConsent) return sessionConsent;
  try {
    const saved = JSON.parse(localStorage.getItem(STORAGE_KEY) ?? 'null');
    if (saved && typeof saved.analytics === 'boolean' && saved.hasResponded === true) {
      return {analytics: saved.analytics, essential: true, hasResponded: true, updatedAt: saved.updatedAt};
    }
  } catch { /* Missing or blocked storage starts with analytics disabled. */ }
  return defaultConsent();
}

export function saveConsent(analyticsGranted: boolean): ConsentState {
  const state: ConsentState = {
    analytics: analyticsGranted, essential: true, hasResponded: true, updatedAt: new Date().toISOString(),
  };
  sessionConsent = state;
  try { localStorage.setItem(STORAGE_KEY, JSON.stringify(state)); } catch { /* Keep the choice for this session. */ }
  if (analyticsGranted) initClarity(true);
  else revokeClarityConsent();
  return state;
}

function updateClarityConsent(granted: boolean) {
  window.clarity?.('consentv2', {analytics_Storage: granted ? 'granted' : 'denied', ad_Storage: 'denied'});
}

export function initClarity(consentGranted: boolean) {
  if (typeof window === 'undefined') return;
  // Local previews must not send test visits to the production analytics project.
  if (['localhost', '127.0.0.1', '[::1]'].includes(window.location.hostname)) return;
  if (!consentGranted) {revokeClarityConsent(); return;}
  if (!window._clarityLoaded) {
    window.clarity = window.clarity || function (...args: unknown[]) {
      (window.clarity!.q = window.clarity!.q || []).push(args);
    };
    // Queue explicit analytics-only consent before loading the external script.
    updateClarityConsent(true);
    const script = document.createElement('script');
    script.async = true;
    script.src = 'https://www.clarity.ms/tag/' + CLARITY_PROJECT_ID;
    script.onerror = () => {window._clarityLoaded = false; script.remove();};
    window._clarityLoaded = true;
    document.head.appendChild(script);
  } else updateClarityConsent(true);
}

export function revokeClarityConsent() {
  if (typeof window !== 'undefined') updateClarityConsent(false);
}

export function trackEvent(eventName: string, metadata?: Record<string, unknown>) {
  if (!getSavedConsent().analytics || typeof window === 'undefined' || !window.clarity) return;
  window.clarity('event', eventName);
  for (const [key, value] of Object.entries(metadata ?? {})) {
    window.clarity('set', key, String(value));
  }
}
