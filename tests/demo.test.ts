import {test} from 'node:test';
import assert from 'node:assert/strict';
import {INITIAL_ASSUMPTIONS, calculateDeterministicDCF, calculateIRR} from '../src/data/mockValuation';

const assumptions = () => INITIAL_ASSUMPTIONS.map(a => ({...a}));
test('IRR solves an independently known cash flow', () => {
  assert.ok(Math.abs(calculateIRR([-100, 110]) - 10) < 1e-8);
});
test('P90 changes the full cash-flow series and reduces returns', () => {
  const base = calculateDeterministicDCF(48, assumptions());
  const p90 = calculateDeterministicDCF(48, assumptions(), 'p90');
  assert.equal(base.annualCashFlows.length, 25);
  assert.ok(Math.abs(p90.annualCashFlows[0].revenue / base.annualCashFlows[0].revenue - 0.888) < 1e-10);
  assert.ok(p90.equityIRR < base.equityIRR);
  assert.ok(p90.dscrMin < base.dscrMin);
  assert.ok(p90.enterpriseValue < base.enterpriseValue);
});
test('Displayed IRR discounts the generated equity cash flows to zero', () => {
  const data = assumptions();
  const result = calculateDeterministicDCF(48, data);
  const equityInitial = 60 - result.debtPrincipal;
  const npv = -equityInitial + result.annualCashFlows.reduce((sum, cf) => sum + cf.fcfE / (1 + result.equityIRR / 100) ** cf.year, 0);
  assert.ok(Math.abs(npv) < 1e-8);
});
test('Minimum DSCR uses all 18 debt years and debt stops in year 19', () => {
  const result = calculateDeterministicDCF(48, assumptions());
  const finalDebtYear = result.annualCashFlows[17];
  assert.ok(Math.abs(result.dscrMin - (finalDebtYear.revenue - finalDebtYear.opex - 0.4) / finalDebtYear.debtService) < 1e-10);
  assert.equal(result.annualCashFlows[18].debtService, 0);
});
test('Changing price and gearing updates value and debt without mutating input', () => {
  const original = assumptions();
  const adjusted = original.map(a => a.id === 'merchant_power_price' ? {...a, currentValue: 72} : a.id === 'debt_gearing' ? {...a, currentValue: 75} : a);
  const base = calculateDeterministicDCF(48, original);
  const next = calculateDeterministicDCF(48, adjusted);
  assert.equal(next.debtPrincipal, 45);
  assert.ok(next.enterpriseValue > base.enterpriseValue);
  assert.equal(next.equityValue, next.enterpriseValue - next.debtPrincipal);
  assert.equal(original[1].currentValue, 68.5);
});
test('A stressed scenario retains negative cash flows', () => {
  const stressed = assumptions().map(a => a.id === 'merchant_power_price' ? {...a, currentValue: 10} : a);
  assert.ok(calculateDeterministicDCF(48, stressed).annualCashFlows.some(cf => cf.fcfE < 0));
});
