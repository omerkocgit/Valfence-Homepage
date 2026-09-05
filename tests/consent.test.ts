import {test} from 'node:test';
import assert from 'node:assert/strict';
import {getSavedConsent, saveConsent, trackEvent} from '../src/services/clarity';

test('Consent defaults safely, persists session choice and uses analytics-only ConsentV2', () => {
  let stored: string | null = null;
  const calls: unknown[][] = [];
  Object.defineProperty(globalThis, 'localStorage', {configurable: true, value: {
    getItem: () => stored,
    setItem: (_key: string, value: string) => {stored = value;},
  }});
  Object.defineProperty(globalThis, 'window', {configurable: true, value: {
    location: {hostname: 'example.com'}, _clarityLoaded: true,
    clarity: (...args: unknown[]) => {calls.push(args);},
  }});
  assert.equal(getSavedConsent().analytics, false);
  stored = '{"analytics":"true","hasResponded":true}';
  assert.equal(getSavedConsent().analytics, false);
  stored = 'invalid json';
  assert.equal(getSavedConsent().analytics, false);
  saveConsent(true);
  assert.deepEqual(calls.at(-1), ['consentv2', {analytics_Storage: 'granted', ad_Storage: 'denied'}]);
  trackEvent('scenario', {mode: 'p90'});
  assert.deepEqual(calls.at(-1), ['set', 'mode', 'p90']);
  saveConsent(false);
  assert.deepEqual(calls.at(-1), ['consentv2', {analytics_Storage: 'denied', ad_Storage: 'denied'}]);
  const count = calls.length;
  trackEvent('must_not_send');
  assert.equal(calls.length, count);
  Object.defineProperty(globalThis, 'localStorage', {configurable: true, value: {
    getItem: () => {throw new Error('blocked');}, setItem: () => {throw new Error('blocked');},
  }});
  saveConsent(true);
  assert.equal(getSavedConsent().analytics, true);
  saveConsent(false);
  assert.equal(getSavedConsent().analytics, false);
});
