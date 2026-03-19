import { describe, expect, it } from 'vitest';
import { calculateBusinessModelMetrics, createScenario } from '@/lib/business-model';

describe('business model simulator', () => {
  it('calculates deterministic output metrics', () => {
    const scenario = createScenario('wealth-distribution');
    const metrics = calculateBusinessModelMetrics(scenario);

    expect(metrics.annualRevenue).toBeGreaterThan(0);
    expect(metrics.breakEvenMonth).toBeGreaterThan(0);
    expect(metrics.sensitivity[0].impact).toBeGreaterThanOrEqual(metrics.sensitivity[1].impact);
  });
});
