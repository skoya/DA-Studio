import type { ClientSegment, JurisdictionPack, Lens, NetworkProfile, SourceCard } from './types';
import { clientSegments, depthOptions, lensOptions } from './catalog';

export const APP_TITLE = 'Digital Asset Studio';
export const APP_DESCRIPTION =
  'Static-first digital-asset learning, simulation, governance, strategy, and business-model workbench for financial-services teams.';

export const defaultSelections = {
  lens: 'learning' as Lens,
  depth: 'practitioner' as const,
  jurisdiction: 'eu',
  clientSegment: 'institutional' as ClientSegment,
  network: 'permissioned-chain-pattern',
};

export function getLensLabel(id: string): string {
  return lensOptions.find((item) => item.id === id)?.label ?? id;
}

export function getDepthLabel(id: string): string {
  return depthOptions.find((item) => item.id === id)?.label ?? id;
}

export function getClientSegmentLabel(id: string): string {
  return clientSegments.find((item) => item.id === id)?.label ?? id;
}

export function formatDate(date: string): string {
  return new Date(date).toLocaleDateString('en-GB', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });
}

export function daysSince(date: string): number {
  const diff = Date.now() - new Date(date).getTime();
  return Math.floor(diff / (1000 * 60 * 60 * 24));
}

export function getStaleness(source: SourceCard) {
  const age = daysSince(source.lastReviewed);
  const stale = age > source.staleAfterDays;
  const score = Math.min(100, Math.round((age / source.staleAfterDays) * 100));

  return {
    age,
    stale,
    score,
    label: stale ? 'Stale review needed' : age > source.staleAfterDays * 0.75 ? 'Review soon' : 'Current',
  };
}

export function getJurisdictionWarnings(pack: JurisdictionPack, selectedNetwork?: NetworkProfile) {
  const warnings = [...pack.defaultWarnings];

  if (selectedNetwork?.category === 'public-chain') {
    warnings.push('Public-chain use raises privacy, transfer-screening, and operational-support questions.');
  }

  if (pack.status === 'tier2') {
    warnings.push('This pack is summary-level and should not be treated as launch-ready advice.');
  }

  return warnings;
}
