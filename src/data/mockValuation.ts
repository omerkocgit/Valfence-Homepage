/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { ValuationAssumption } from '../types';

export const INITIAL_ASSUMPTIONS: ValuationAssumption[] = [
  {
    id: 'ncf_p50',
    name: 'Net Capacity Factor (P50)',
    category: 'Yield & Production',
    unit: '%',
    originalValue: 34.8,
    currentValue: 34.8,
    minRange: 32.5,
    maxRange: 36.0,
    step: 0.1,
    primarySource: {
      documentName: 'Independent Energy Yield Assessment (DNV-GL)',
      documentType: 'Yield Report',
      pages: 'pp. 18-21',
      excerpt: 'Based on 10-year calibrated LiDAR measurements and terrain roughness modeling, the P50 net production yields 146.3 GWh/a, corresponding to an operational Net Capacity Factor of 34.8% after array wake losses (6.4%) and grid transmission degradation (1.8%).',
      extractedDate: '2026-05-14',
      valuationCutoffEligible: true,
      sourceConfidence: 'high',
      crossCheckInfo: 'Country Benchmark: 33.2% - 35.4% for 4.2 MW Class IIA onshore wind sites.',
    },
    crossCheckBenchmark: 'Regional Class IIA Onshore Average: 33.2% – 35.4%',
    analystRationale: 'Adopted P50 case from independent engineer. Long-term wind measurement data exceeds 36 months with >98% data recovery.',
    status: 'pending',
    valuationImpactHigh: '+1.4% Equity IRR (€2.1M NPV)',
    valuationImpactLow: '-1.6% Equity IRR (-€2.4M NPV)',
  },
  {
    id: 'merchant_power_price',
    name: 'Average Capture Price (Y1-Y10)',
    category: 'Revenue & Commercial',
    unit: '€/MWh',
    originalValue: 68.5,
    currentValue: 68.5,
    minRange: 62.0,
    maxRange: 74.0,
    step: 0.5,
    primarySource: {
      documentName: 'Pexapark Renewable Energy Price Report & PPA Term Sheet',
      documentType: 'PPA Contract',
      pages: 'pp. 7-12',
      excerpt: '10-year Pay-as-Produced Corporate PPA covering 70% of nominal generation at a fixed strike of 72.0 €/MWh. Merchant capture discount for remaining 30% volume modeled at 88% of baseload forward curve (projected 60.3 €/MWh avg).',
      extractedDate: '2026-06-01',
      valuationCutoffEligible: true,
      sourceConfidence: 'medium',
      crossCheckInfo: 'Recent precedent transaction (Baltic Wind 2026) struck 10-year cPPA at 69.8 €/MWh.',
    },
    crossCheckBenchmark: '10-yr Corporate PPA Index: 66.0 – 71.5 €/MWh',
    analystRationale: 'Blended revenue structure: 70% contracted floor + 30% merchant with 12% wind cannibalization haircut.',
    status: 'pending',
    valuationImpactHigh: '+1.9% Equity IRR (€2.8M NPV)',
    valuationImpactLow: '-2.1% Equity IRR (-€3.1M NPV)',
  },
  {
    id: 'fixed_opex',
    name: 'Fixed Operating Costs (O&M + Lease)',
    category: 'CapEx & OpEx',
    unit: 'k€/MW/yr',
    originalValue: 38.5,
    currentValue: 38.5,
    minRange: 35.0,
    maxRange: 42.0,
    step: 0.5,
    primarySource: {
      documentName: 'Full-Scope Turbine TSA/SMA Term Sheet & Landowner Lease Agreement',
      documentType: 'Financial Model',
      pages: 'pp. 14-19',
      excerpt: '15-year Full Service Agreement with OEM indexed to HICP at €28.2k/MW/a. Municipal taxes, land leases (€5.8k/MW/a), insurance, and balance of plant management total €38.5k/MW/a operational baseline.',
      extractedDate: '2026-04-20',
      valuationCutoffEligible: true,
      sourceConfidence: 'high',
      crossCheckInfo: 'Tier-1 European Onshore O&M baseline: 36.0 – 41.0 k€/MW/yr.',
    },
    crossCheckBenchmark: 'European Benchmark: 36.0 – 41.0 k€/MW/a',
    analystRationale: 'Contractually bounded by draft TSA. First 5 years under warranty with availability guarantee (97.5%).',
    status: 'pending',
    valuationImpactHigh: '-0.7% Equity IRR (-€1.0M NPV)',
    valuationImpactLow: '+0.8% Equity IRR (+€1.1M NPV)',
  },
  {
    id: 'debt_gearing',
    name: 'Senior Debt Gearing',
    category: 'Financing & Valuation',
    unit: '%',
    originalValue: 70.0,
    currentValue: 70.0,
    minRange: 65.0,
    maxRange: 75.0,
    step: 1.0,
    primarySource: {
      documentName: 'Indicative Debt Financing Term Sheet (Nordic Infrastructure Bank)',
      documentType: 'Financial Model',
      pages: 'pp. 4-8',
      excerpt: 'Non-recourse project finance facility sizing constrained to minimum DSCR of 1.25x (P90 case) or 70.0% Debt/Capex cap. Margin 210 bps over 6M Euribor with 18-year amortization schedule.',
      extractedDate: '2026-06-15',
      valuationCutoffEligible: true,
      sourceConfidence: 'medium',
      crossCheckInfo: 'Market precedent gearing for contracted wind portfolios: 68% - 73%.',
    },
    crossCheckBenchmark: 'Project Finance Standard: 65% – 72% Gearing (1.25x DSCR)',
    analystRationale: '70% gearing assumes P90 DSCR hurdle is satisfied. 18-year sculpted repayment profile.',
    status: 'pending',
    valuationImpactHigh: '+1.1% Equity IRR (+€0.6M Equity NPV)',
    valuationImpactLow: '-1.2% Equity IRR (-€0.7M Equity NPV)',
  },
];

export interface DCFCalculationResult {
  enterpriseValue: number;
  equityValue: number;
  equityIRR: number;
  projectIRR: number;
  dscrMin: number;
  debtPrincipal: number;
  annualCashFlows: { year: number; revenue: number; opex: number; debtService: number; fcfE: number }[];
}

/** Annual IRR for this demo's conventional initial outflow and subsequent inflows. */
export function calculateIRR(cashFlows: number[]): number {
  const npv = (rate: number) => cashFlows.reduce((sum, cf, year) => sum + cf / (1 + rate) ** year, 0);
  let low = -0.99;
  let high = 1;
  while (npv(high) > 0 && high < 1024) high *= 2;
  if (npv(low) < 0 || npv(high) > 0) return NaN;
  for (let iteration = 0; iteration < 150; iteration++) {
    const mid = (low + high) / 2;
    if (npv(mid) > 0) low = mid;
    else high = mid;
  }
  return ((low + high) / 2) * 100;
}

/**
 * Illustrative, simplified 25-year demo. Not an underwriting model.
 * Both scenarios and all displayed metrics use the same cash-flow series.
 */
export function calculateDeterministicDCF(
  capacityMW: number = 48,
  assumptions: ValuationAssumption[],
  scenario: 'p50' | 'p90' = 'p50',
): DCFCalculationResult {
  const value = (id: string, fallback: number) => assumptions.find(a => a.id === id)?.currentValue ?? fallback;
  const ncf = value('ncf_p50', 34.8);
  const price = value('merchant_power_price', 68.5);
  const opex = value('fixed_opex', 38.5);
  const gearing = value('debt_gearing', 70);
  const totalCapex = capacityMW * 1.25;
  const debtPrincipal = totalCapex * gearing / 100;
  const equityInitial = totalCapex - debtPrincipal;
  const rate = 0.045;
  const debtService = debtPrincipal * rate / (1 - (1 + rate) ** -18);
  const generation = capacityMW * 8760 * ncf / 100 * (scenario === 'p90' ? 0.888 : 1);
  const annualCashFlows = Array.from({length: 25}, (_, index) => {
    const year = index + 1;
    const revenue = generation * 0.996 ** index * price / 1e6;
    const annualOpex = capacityMW * opex / 1000 * 1.02 ** index;
    const debt = year <= 18 ? debtService : 0;
    // A fixed illustrative reserve; negative flows remain visible.
    return {year, revenue, opex: annualOpex, debtService: debt, fcfE: revenue - annualOpex - debt - 0.4};
  });
  const projectFlows = annualCashFlows.map(cf => cf.revenue - cf.opex - 0.4);
  const pv = (flows: number[], discount: number) => flows.reduce((sum, cf, i) => sum + cf / (1 + discount) ** (i + 1), 0);
  const enterpriseValue = pv(projectFlows, 0.065);
  return {
    enterpriseValue,
    equityValue: enterpriseValue - debtPrincipal,
    equityIRR: calculateIRR([-equityInitial, ...annualCashFlows.map(cf => cf.fcfE)]),
    projectIRR: calculateIRR([-totalCapex, ...projectFlows]),
    dscrMin: Math.min(...annualCashFlows.filter(cf => cf.debtService > 0).map(cf => (cf.revenue - cf.opex - 0.4) / cf.debtService)),
    debtPrincipal,
    annualCashFlows,
  };
}
