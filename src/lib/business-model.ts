import type { BusinessModelScenario } from './types';

export const businessModelTemplates = [
  {
    id: 'wealth-distribution',
    label: 'Wealth / distribution model',
    defaults: {
      onboardingFees: 250,
      custodyFees: 1200,
      transactionFees: 40,
      servicingFees: 500,
      aum: 50000000,
      clientCount: 80,
      conversionRate: 0.2,
      buildCost: 450000,
      legalCost: 180000,
      operationsStaffing: 220000,
      vendorCost: 160000,
      resilienceUplift: 90000,
      controlIntensity: 0.65,
    },
  },
  {
    id: 'institutional-issuance',
    label: 'Institutional issuance model',
    defaults: {
      issuanceFees: 850000,
      servicingFees: 240000,
      transactionFees: 120000,
      notional: 300000000,
      clientCount: 8,
      conversionRate: 0.35,
      buildCost: 700000,
      legalCost: 280000,
      operationsStaffing: 340000,
      vendorCost: 220000,
      resilienceUplift: 140000,
      controlIntensity: 0.72,
    },
  },
  {
    id: 'tokenized-fund-servicing',
    label: 'Tokenized fund servicing model',
    defaults: {
      onboardingFees: 5000,
      custodyFees: 220000,
      servicingFees: 180000,
      transactionFees: 90000,
      aum: 800000000,
      clientCount: 32,
      conversionRate: 0.3,
      buildCost: 680000,
      legalCost: 240000,
      operationsStaffing: 300000,
      vendorCost: 260000,
      resilienceUplift: 160000,
      controlIntensity: 0.7,
    },
  },
] as const;

export type BusinessModelMetrics = {
  annualRevenue: number;
  fixedCosts: number;
  variableCosts: number;
  grossMargin: number;
  contributionMargin: number;
  breakEvenMonth: number;
  paybackPeriodMonths: number;
  controlAdjustedProfitability: number;
  launchComplexityIndex: number;
  sensitivity: Array<{ label: string; impact: number }>;
};

export function createScenario(templateId = 'wealth-distribution'): BusinessModelScenario {
  const template = businessModelTemplates.find((item) => item.id === templateId) ?? businessModelTemplates[0];
  const now = new Date().toISOString();

  return {
    id: `scenario-${template.id}`,
    label: template.label,
    template: template.id,
    assumptions: { ...template.defaults },
    createdAt: now,
    updatedAt: now,
    schemaVersion: 1,
  };
}

export function calculateBusinessModelMetrics(scenario: BusinessModelScenario): BusinessModelMetrics {
  const values = scenario.assumptions;
  const onboardingFees = Number(values.onboardingFees ?? 0);
  const custodyFees = Number(values.custodyFees ?? 0);
  const issuanceFees = Number(values.issuanceFees ?? 0);
  const servicingFees = Number(values.servicingFees ?? 0);
  const transactionFees = Number(values.transactionFees ?? 0);
  const clientCount = Number(values.clientCount ?? 0);
  const conversionRate = Number(values.conversionRate ?? 0);
  const buildCost = Number(values.buildCost ?? 0);
  const legalCost = Number(values.legalCost ?? 0);
  const operationsStaffing = Number(values.operationsStaffing ?? 0);
  const vendorCost = Number(values.vendorCost ?? 0);
  const resilienceUplift = Number(values.resilienceUplift ?? 0);
  const controlIntensity = Number(values.controlIntensity ?? 0);

  const activeClients = clientCount * conversionRate;
  const annualRevenue =
    activeClients * onboardingFees +
    custodyFees +
    issuanceFees +
    servicingFees +
    transactionFees;
  const fixedCosts = buildCost + legalCost + operationsStaffing;
  const variableCosts = vendorCost + resilienceUplift + annualRevenue * (0.08 + controlIntensity * 0.06);
  const grossMargin = annualRevenue - variableCosts;
  const contributionMargin = annualRevenue - (variableCosts * 0.75);
  const monthlyNet = Math.max(1, (annualRevenue - fixedCosts - variableCosts) / 12);
  const breakEvenMonth = Math.max(1, Math.ceil(fixedCosts / Math.max(1, monthlyNet + 1)));
  const paybackPeriodMonths = Math.max(1, Math.ceil((fixedCosts + variableCosts) / Math.max(1, monthlyNet + 1)));
  const controlAdjustedProfitability = Math.round(((grossMargin - fixedCosts * controlIntensity) / Math.max(1, annualRevenue)) * 100);
  const launchComplexityIndex = Math.round(Math.min(100, 40 + controlIntensity * 30 + (legalCost / 10000) * 0.6));

  const sensitivity = [
    { label: 'Conversion rate', impact: Math.round(activeClients * 10) },
    { label: 'Control intensity', impact: Math.round(controlIntensity * 100) },
    { label: 'Vendor cost', impact: Math.round(vendorCost / 5000) },
    { label: 'Legal cost', impact: Math.round(legalCost / 5000) },
  ].sort((a, b) => b.impact - a.impact);

  return {
    annualRevenue,
    fixedCosts,
    variableCosts,
    grossMargin,
    contributionMargin,
    breakEvenMonth,
    paybackPeriodMonths,
    controlAdjustedProfitability,
    launchComplexityIndex,
    sensitivity,
  };
}

export function formatCurrency(value: number) {
  return new Intl.NumberFormat('en-GB', {
    style: 'currency',
    currency: 'USD',
    maximumFractionDigits: 0,
  }).format(value);
}

export function buildBusinessNarrative(metrics: BusinessModelMetrics) {
  const leadSensitivity = metrics.sensitivity[0]?.label ?? 'Assumptions';
  const posture =
    metrics.controlAdjustedProfitability > 20
      ? 'commercially constructive'
      : metrics.controlAdjustedProfitability > 0
        ? 'viable but control-sensitive'
        : 'economically fragile';

  return [
    `The current scenario looks ${posture}.`,
    `${leadSensitivity} is the strongest driver in the current assumption set.`,
    `Break-even is projected around month ${metrics.breakEvenMonth}, but the launch complexity index is ${metrics.launchComplexityIndex}/100.`,
    'Use this as illustrative internal planning only, not as a validated forecast.',
  ];
}
