/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export type ConfidenceLevel = 'high' | 'medium' | 'low';
export type ApprovalStatus = 'pending' | 'approved' | 'overridden';

export interface EvidenceSource {
  documentName: string;
  documentType: 'Yield Report' | 'PPA Contract' | 'Market Forecast' | 'Grid Agreement' | 'Financial Model' | 'Benchmark';
  pages: string;
  excerpt: string;
  extractedDate: string;
  valuationCutoffEligible: boolean;
  sourceConfidence: ConfidenceLevel;
  crossCheckInfo?: string;
}

export interface ValuationAssumption {
  id: string;
  name: string;
  category: 'Yield & Production' | 'Revenue & Commercial' | 'CapEx & OpEx' | 'Financing & Valuation';
  unit: string;
  originalValue: number;
  currentValue: number;
  minRange: number;
  maxRange: number;
  step: number;
  primarySource: EvidenceSource;
  crossCheckBenchmark: string;
  analystRationale: string;
  status: ApprovalStatus;
  userOverrideNote?: string;
  valuationImpactHigh: string; // e.g. "+1.2% IRR"
  valuationImpactLow: string;
}

export interface ComparisonFeature {
  capability: string;
  genericAI: string;
  manualExcel: string;
  broadValuation: string;
  valfenceWorkflow: string;
  highlight: boolean;
}

export interface PilotCriterion {
  id: string;
  title: string;
  description: string;
  selected: boolean;
}

export type ModalType = 'none' | 'privacy' | 'imprint' | 'consent-settings' | 'export-preview' | 'case-summary';

export interface ConsentState {
  analytics: boolean;
  essential: boolean;
  hasResponded: boolean;
  updatedAt?: string;
}
