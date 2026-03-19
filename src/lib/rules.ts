import type { RuleDefinition } from './types';

export const rules: RuleDefinition[] = [
  {
    id: 'rule-retail-structured-products',
    title: 'Retail structured products need elevated suitability',
    description: 'Retail-facing structured product concepts should not progress without explicit target-market review.',
    if: { clientSegment: 'retail', assetFamily: 'Structured product' },
    effects: [
      { type: 'warn', value: 'Complex payoff for retail segment' },
      { type: 'require_compliance_review' },
      { type: 'add_control', value: 'ctl-suitability' },
    ],
    rationale: 'Complex payoff design increases client-harm risk when product comprehension is weak.',
    sourceIds: ['sec-crypto-2026'],
  },
  {
    id: 'rule-fund-wallet-whitelist',
    title: 'Tokenized funds require wallet whitelisting controls',
    description: 'Controlled transferability is a default expectation for tokenized fund flows in this release.',
    if: { assetFamily: 'Tokenized fund' },
    effects: [
      { type: 'add_control', value: 'ctl-investor-eligibility' },
      { type: 'add_artifact', value: 'Wallet whitelist evidence' },
    ],
    rationale: 'Investor eligibility and transfer restrictions are core to the fund model.',
    sourceIds: ['mas-project-guardian', 'chainlink-dta'],
  },
  {
    id: 'rule-nav-staleness',
    title: 'Tokenized fund NAV staleness handling',
    description: 'Tokenized fund flows must include a stale-NAV branch and documentation.',
    if: { assetFamily: 'Tokenized fund', activityType: 'subscribe' },
    effects: [
      { type: 'add_control', value: 'ctl-nav-governance' },
      { type: 'add_simulation_branch', value: 'nav-stale' },
    ],
    rationale: 'Pricing governance is a core operational risk driver.',
    sourceIds: ['mas-project-guardian'],
  },
  {
    id: 'rule-high-value-custody',
    title: 'High-value safekeeping requires stricter custody coverage',
    description: 'High-value use cases should activate stricter custody, recovery, and vendor oversight.',
    if: { valueSensitivity: 'high' },
    effects: [
      { type: 'add_control', value: 'ctl-custody-segregation' },
      { type: 'add_control', value: 'ctl-outsourcing' },
      { type: 'warn', value: 'High-value safekeeping overlay active' },
    ],
    rationale: 'Large-value holdings intensify segregation, recovery, and concentration concerns.',
    sourceIds: ['finma-guidance-01-2026', 'nist-csf-2'],
  },
  {
    id: 'rule-family-office-governance',
    title: 'Family office selections require governance overlays',
    description: 'Family office and UHNW use cases need authority, succession, and concentration treatment.',
    if: { clientSegment: 'family-office' },
    effects: [
      { type: 'add_control', value: 'ctl-wealth-governance' },
      { type: 'require_legal_review' },
      { type: 'warn', value: 'Wealth governance overlay active' },
    ],
    rationale: 'Private-client authority and continuity issues are structurally different from institutional desk use cases.',
    sourceIds: ['finma-guidance-01-2026'],
  },
  {
    id: 'rule-high-latency-overlay',
    title: 'High-latency or high-frequency overlay',
    description: 'High-intensity settlement cases require intraday and failover controls.',
    if: { latencyNeed: 'high' },
    effects: [
      { type: 'add_control', value: 'ctl-liquidity-prefunding' },
      { type: 'add_control', value: 'ctl-concentration' },
      { type: 'warn', value: 'High-intensity treasury overlay active' },
    ],
    rationale: 'Latency-sensitive operating models must make funding, limit, and outage design visible.',
    sourceIds: ['kinexys-digital-payments', 'basel-crypto'],
  },
  {
    id: 'rule-us-review-default',
    title: 'US market review is required by default',
    description: 'US selections require specialist legal review in this first release.',
    if: { jurisdiction: 'us' },
    effects: [
      { type: 'require_legal_review' },
      { type: 'warn', value: 'US launch assumptions require specialist legal review' },
    ],
    rationale: 'The US posture is commercially important but too fluid for launch assumptions without review.',
    sourceIds: ['sec-crypto-2026'],
  },
  {
    id: 'rule-uk-dss-scope',
    title: 'UK DSS scope warning',
    description: 'UK sandbox logic only applies to digital securities, not generic cryptoasset ideas.',
    if: { jurisdiction: 'uk', assetFamily: 'Native crypto' },
    effects: [
      { type: 'warn', value: 'Digital Securities Sandbox is not the default path for native crypto flows' },
      { type: 'set_confidence_low' },
    ],
    rationale: 'Digital securities and unbacked crypto require different perimeter framing.',
    sourceIds: ['boe-dss', 'fca-future-crypto'],
  },
  {
    id: 'rule-concentration-warning',
    title: 'Single-rail concentration warning',
    description: 'Bank rail or venue-centric models should show concentration and exit portability cautions.',
    if: { networkType: 'bank-rail' },
    effects: [
      { type: 'add_control', value: 'ctl-concentration' },
      { type: 'warn', value: 'Single-rail dependency needs explicit exit planning' },
    ],
    rationale: 'Operational resilience and portability depend on understanding concentration exposure.',
    sourceIds: ['nist-csf-2'],
  },
];

export type RuleContext = {
  jurisdiction: string;
  clientSegment: string;
  assetFamily: string;
  activityType?: string;
  settlementAsset?: string;
  networkType?: string;
  custodyModel?: string;
  latencyNeed?: 'low' | 'medium' | 'high';
  valueSensitivity?: 'low' | 'medium' | 'high';
};

export type RuleEvaluation = {
  warnings: string[];
  requiredReviews: string[];
  addedControls: string[];
  addedArtifacts: string[];
  addedBranches: string[];
  confidenceLow: boolean;
};

export function evaluateRules(context: RuleContext): RuleEvaluation {
  const result: RuleEvaluation = {
    warnings: [],
    requiredReviews: [],
    addedControls: [],
    addedArtifacts: [],
    addedBranches: [],
    confidenceLow: false,
  };

  for (const rule of rules) {
    const matches = Object.entries(rule.if).every(([key, value]) => context[key as keyof RuleContext] === value);
    if (!matches) continue;

    for (const effect of rule.effects) {
      switch (effect.type) {
        case 'warn':
          if (effect.value) result.warnings.push(effect.value);
          break;
        case 'require_legal_review':
          result.requiredReviews.push('Legal review');
          break;
        case 'require_compliance_review':
          result.requiredReviews.push('Compliance review');
          break;
        case 'require_risk_review':
          result.requiredReviews.push('Risk review');
          break;
        case 'add_control':
          if (effect.value) result.addedControls.push(effect.value);
          break;
        case 'add_artifact':
          if (effect.value) result.addedArtifacts.push(effect.value);
          break;
        case 'add_simulation_branch':
          if (effect.value) result.addedBranches.push(effect.value);
          break;
        case 'set_confidence_low':
          result.confidenceLow = true;
          break;
      }
    }
  }

  return {
    warnings: [...new Set(result.warnings)],
    requiredReviews: [...new Set(result.requiredReviews)],
    addedControls: [...new Set(result.addedControls)],
    addedArtifacts: [...new Set(result.addedArtifacts)],
    addedBranches: [...new Set(result.addedBranches)],
    confidenceLow: result.confidenceLow,
  };
}

export function getRiskScore(context: RuleContext) {
  let score = 38;

  if (context.jurisdiction === 'us') score += 18;
  if (context.clientSegment === 'family-office' || context.clientSegment === 'uhnw') score += 10;
  if (context.latencyNeed === 'high') score += 12;
  if (context.valueSensitivity === 'high') score += 14;
  if (context.assetFamily === 'Structured product') score += 14;
  if (context.assetFamily === 'Tokenized fund') score += 8;

  return Math.min(100, score);
}
