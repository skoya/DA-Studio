import { describe, expect, it } from 'vitest';
import { evaluateRules, getRiskScore } from '@/lib/rules';

describe('rules engine', () => {
  it('adds wealth-governance controls for family office contexts', () => {
    const result = evaluateRules({
      jurisdiction: 'ch',
      clientSegment: 'family-office',
      assetFamily: 'Native crypto',
      networkType: 'custody',
    });

    expect(result.addedControls).toContain('ctl-wealth-governance');
    expect(result.requiredReviews).toContain('Legal review');
  });

  it('adds high-intensity treasury controls when latency is high', () => {
    const result = evaluateRules({
      jurisdiction: 'sg',
      clientSegment: 'corporate-treasury',
      assetFamily: 'Tokenized cash',
      networkType: 'bank-rail',
      latencyNeed: 'high',
    });

    expect(result.addedControls).toContain('ctl-liquidity-prefunding');
    expect(result.warnings).toContain('High-intensity treasury overlay active');
  });

  it('computes higher risk scores for more complex contexts', () => {
    const low = getRiskScore({
      jurisdiction: 'ch',
      clientSegment: 'institutional',
      assetFamily: 'Tokenized fund',
    });
    const high = getRiskScore({
      jurisdiction: 'us',
      clientSegment: 'family-office',
      assetFamily: 'Structured product',
      latencyNeed: 'high',
      valueSensitivity: 'high',
    });

    expect(high).toBeGreaterThan(low);
  });
});
