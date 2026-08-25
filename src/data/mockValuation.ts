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
  enterpriseValue: number; // €M
  equityValue: number; // €M
  equityIRR: number; // %
  projectIRR: number; // %
  p90EquityIRR: number; // %
  dscrMin: number;
  annualCashFlows: { year: number; revenue: number; opex: number; debtService: number; fcfE: number }[];
}

/**
 * Deterministic Financial Calculation Engine
 * Calculates DCF metrics deterministically based on user approved/adjusted assumptions
 */
export function calculateDeterministicDCF(
  capacityMW: number = 48.0,
  assumptions: ValuationAssumption[]
): DCFCalculationResult {
  const ncf = assumptions.find((a) => a.id === 'ncf_p50')?.currentValue ?? 34.8;
  const price = assumptions.find((a) => a.id === 'merchant_power_price')?.currentValue ?? 68.5;
  const opexPerMW = assumptions.find((a) => a.id === 'fixed_opex')?.currentValue ?? 38.5;
  const gearingPct = assumptions.find((a) => a.id === 'debt_gearing')?.currentValue ?? 70.0;

  // Total installed capex (~1.25M €/MW)
  const totalCapex = capacityMW * 1.25; // 60.0 M€
  const debtPrincipal = totalCapex * (gearingPct / 100); // 42.0 M€
  const equityInitial = totalCapex - debtPrincipal; // 18.0 M€

  // Annual Generation: MW * 8760 * (NCF / 100) -> MWh
  const annualGenMWh = capacityMW * 8760 * (ncf / 100); // ~146,334 MWh

  // Annual Revenue: Gen * Price / 1,000,000 -> M€
  const annualRevenue = (annualGenMWh * price) / 1_000_000; // ~10.02 M€

  // Annual OpEx: capacityMW * opexPerMW / 1,000 -> M€
  const annualOpEx = (capacityMW * opexPerMW) / 1_000; // ~1.848 M€

  // Annual EBITDA
  const annualEbitda = annualRevenue - annualOpEx; // ~8.17 M€

  // Annual Debt Service (18-yr annuity @ 4.5% all-in cost)
  const r = 0.045;
  const n = 18;
  const annualDebtService = (debtPrincipal * (r * Math.pow(1 + r, n))) / (Math.pow(1 + r, n) - 1); // ~3.45 M€

  // Minimum DSCR
  const dscrMin = parseFloat((annualEbitda / Math.max(0.1, annualDebtService)).toFixed(2));

  // Annual Free Cash Flow to Equity (FCFE)
  const annualFcfe = Math.max(0, annualEbitda - annualDebtService - 0.5); // after tax & reserve

  // 25-year Cash flow series
  const annualCashFlows = [];
  for (let yr = 1; yr <= 25; yr++) {
    // slight degradation 0.4% per yr
    const degFactor = Math.pow(1 - 0.004, yr - 1);
    const yrGen = annualGenMWh * degFactor;
    const yrRev = (yrGen * price) / 1_000_000;
    const yrOpex = annualOpEx * Math.pow(1.02, yr - 1); // 2% inflation
    const yrEbitda = yrRev - yrOpex;
    const yrDebt = yr <= 18 ? annualDebtService : 0;
    const yrFcfe = Math.max(0, yrEbitda - yrDebt - 0.4);

    annualCashFlows.push({
      year: yr,
      revenue: parseFloat(yrRev.toFixed(2)),
      opex: parseFloat(yrOpex.toFixed(2)),
      debtService: parseFloat(yrDebt.toFixed(2)),
      fcfE: parseFloat(yrFcfe.toFixed(2)),
    });
  }

  // Calculate NPV (Discount rate = 6.5% for project, 8.0% for equity)
  const wacc = 0.065;
  const ke = 0.082;

  let equityNPV = -equityInitial;
  let projectNPV = -totalCapex;

  for (let t = 1; t <= 25; t++) {
    const cf = annualCashFlows[t - 1];
    equityNPV += cf.fcfE / Math.pow(1 + ke, t);
    projectNPV += (cf.revenue - cf.opex) / Math.pow(1 + wacc, t);
  }

  // Approximate IRRs
  const approxProjectIRR = 7.4 + (ncf - 34.8) * 0.35 + (price - 68.5) * 0.12 - (opexPerMW - 38.5) * 0.08;
  const approxEquityIRR =
    9.8 +
    (ncf - 34.8) * 0.65 +
    (price - 68.5) * 0.22 -
    (opexPerMW - 38.5) * 0.14 +
    (gearingPct - 70.0) * 0.11;
  const approxP90EquityIRR = approxEquityIRR - 2.4;

  return {
    enterpriseValue: parseFloat((totalCapex + projectNPV).toFixed(1)),
    equityValue: parseFloat((equityInitial + equityNPV).toFixed(1)),
    equityIRR: parseFloat(approxEquityIRR.toFixed(1)),
    projectIRR: parseFloat(approxProjectIRR.toFixed(1)),
    p90EquityIRR: parseFloat(approxP90EquityIRR.toFixed(1)),
    dscrMin,
    annualCashFlows,
  };
}
