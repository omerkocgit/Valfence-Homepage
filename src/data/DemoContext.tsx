import React, {createContext, useContext, useMemo, useState} from 'react';
import {INITIAL_ASSUMPTIONS, calculateDeterministicDCF} from './mockValuation';
import type {ValuationAssumption} from '../types';

function useDemoState() {
  const [assumptions, setAssumptions] = useState<ValuationAssumption[]>(() => INITIAL_ASSUMPTIONS.map(a => ({...a})));
  const [scenarioMode, setScenarioMode] = useState<'p50' | 'p90'>('p50');
  const base = useMemo(() => calculateDeterministicDCF(48, assumptions), [assumptions]);
  const downside = useMemo(() => calculateDeterministicDCF(48, assumptions, 'p90'), [assumptions]);
  const result = scenarioMode === 'p50' ? base : downside;
  const approvedCount = assumptions.filter(a => a.status === 'approved').length;
  return {assumptions, setAssumptions, scenarioMode, setScenarioMode, base, downside, result, approvedCount};
}
const DemoContext = createContext<ReturnType<typeof useDemoState> | null>(null);
export function DemoProvider({children}: {children: React.ReactNode}) {
  const value = useDemoState();
  return <DemoContext.Provider value={value}>{children}</DemoContext.Provider>;
}
export function useDemo() {
  const value = useContext(DemoContext);
  if (!value) throw new Error('DemoProvider is required');
  return value;
}
