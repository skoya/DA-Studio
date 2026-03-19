import { z } from 'zod';

const clientSegmentEnum = z.enum([
  'retail',
  'affluent',
  'hnw',
  'uhnw',
  'family-office',
  'institutional',
  'corporate-treasury',
  'issuer',
]);

const confidenceEnum = z.enum(['high', 'medium', 'low']);
const changeStatusEnum = z.enum([
  'final',
  'transitional',
  'draft',
  'sandbox',
  'consultation',
  'statement',
  'market-practice',
]);

export const sourceSchema = z.object({
  id: z.string(),
  title: z.string(),
  organization: z.string(),
  url: z.string().url(),
  sourceType: z.enum([
    'law',
    'guidance',
    'standard',
    'official-page',
    'official-press-release',
    'industry-body',
  ]),
  jurisdiction: z.string().optional(),
  status: z
    .enum([
      'final',
      'transitional',
      'draft',
      'sandbox',
      'consultation',
      'statement',
      'market-practice',
      'proposal',
      'press-release',
    ])
    .optional(),
  lastReviewed: z.string(),
  staleAfterDays: z.number().int().positive(),
  owner: z.string(),
  confidence: confidenceEnum,
  criticality: z.enum(['low', 'medium', 'high']),
  relevanceTags: z.array(z.string()),
  impactAreas: z.array(z.string()),
  summary: z.string(),
});

export const glossarySchema = z.object({
  id: z.string(),
  term: z.string(),
  shortDefinition: z.string(),
  practitionerNote: z.string(),
  expertNote: z.string(),
  relatedTerms: z.array(z.string()),
  sourceIds: z.array(z.string()),
});

export const conceptSchema = z.object({
  id: z.string(),
  title: z.string(),
  summary: z.string(),
  plain: z.string(),
  practitioner: z.string(),
  expert: z.string(),
  whyItMatters: z.array(z.string()),
  misconceptions: z.array(z.string()),
  clientImpacts: z.record(clientSegmentEnum, z.string()),
  jurisdictionNotes: z.record(z.string(), z.string()),
  relatedGlossary: z.array(z.string()),
  relatedPatterns: z.array(z.string()),
  relatedSimulations: z.array(z.string()),
  relatedControls: z.array(z.string()),
  sourceIds: z.array(z.string()),
  lastReviewed: z.string(),
  reviewOwner: z.string(),
  freshnessDays: z.number().int().positive(),
});

export const journeySchema = z.object({
  id: z.string(),
  title: z.string(),
  summary: z.string(),
  audience: z.array(z.string()),
  stops: z.array(
    z.object({
      label: z.string(),
      href: z.string(),
    }),
  ),
});

export const jurisdictionSchema = z.object({
  id: z.string(),
  label: z.string(),
  status: z.enum(['tier1', 'tier2', 'global']),
  summary: z.string(),
  authorities: z.array(z.object({ name: z.string(), url: z.string().url().optional() })),
  marketRelevance: z.array(z.string()),
  coreTopics: z.array(z.string()),
  activityMap: z.array(z.string()),
  controlHotspots: z.array(z.string()),
  simulationOverlays: z.array(z.string()),
  defaultWarnings: z.array(z.string()),
  confidence: confidenceEnum,
  changeStatus: changeStatusEnum,
  sourceIds: z.array(z.string()),
  lastReviewed: z.string(),
});

export const networkSchema = z.object({
  id: z.string(),
  label: z.string(),
  category: z.enum([
    'public-chain',
    'permissioned-chain',
    'fmi',
    'bank-rail',
    'tokenization-stack',
    'middleware',
    'custody',
    'other',
  ]),
  summary: z.string(),
  assetSupport: z.array(z.string()),
  participantModel: z.string(),
  settlementModel: z.string(),
  identityModel: z.string(),
  privacyModel: z.string(),
  finalityProfile: z.string(),
  operatingWindow: z.string(),
  controlConsiderations: z.array(z.string()),
  interoperabilityNotes: z.array(z.string()),
  sourceIds: z.array(z.string()),
  lastReviewed: z.string(),
});

export const patternSchema = z.object({
  id: z.string(),
  title: z.string(),
  summary: z.string(),
  clientSegments: z.array(clientSegmentEnum),
  assetFamily: z.string(),
  legalWrapper: z.string(),
  settlementAsset: z.string(),
  custodyModel: z.string(),
  networkType: z.string(),
  primaryObjective: z.string(),
  controlHotspots: z.array(z.string()),
  sourceIds: z.array(z.string()),
});

export const controlSchema = z.object({
  id: z.string(),
  domain: z.string(),
  title: z.string(),
  objective: z.string(),
  whyItMatters: z.string(),
  appliesWhen: z.array(z.string()),
  evidenceExamples: z.array(z.string()),
  severityIfMissing: z.enum(['low', 'medium', 'high', 'critical']),
  ownerHints: z.array(z.string()),
  sourceIds: z.array(z.string()),
  relatedRules: z.array(z.string()),
  relatedSimulations: z.array(z.string()),
});

export const simulationSchema = z.object({
  id: z.string(),
  title: z.string(),
  summary: z.string(),
  assetFamily: z.string(),
  clientSegments: z.array(clientSegmentEnum),
  jurisdictions: z.array(z.string()),
  actors: z.array(z.string()),
  variables: z.array(
    z.object({
      id: z.string(),
      label: z.string(),
      options: z.array(z.string()),
      defaultValue: z.string(),
    }),
  ),
  happyPath: z.array(z.string()),
  operationalArtifacts: z.array(z.string()),
  sourceIds: z.array(z.string()),
  steps: z.array(
    z.object({
      id: z.string(),
      title: z.string(),
      lane: z.string(),
      summary: z.string(),
      documents: z.array(z.string()),
      controls: z.array(z.string()),
      sources: z.array(z.string()),
    }),
  ),
  branches: z.array(
    z.object({
      id: z.string(),
      label: z.string(),
      trigger: z.string(),
      impact: z.array(z.string()),
      addedWarnings: z.array(z.string()),
      addedControls: z.array(z.string()),
      addedArtifacts: z.array(z.string()),
    }),
  ),
});

export const releaseNoteSchema = z.object({
  id: z.string(),
  title: z.string(),
  releasedAt: z.string(),
  summary: z.string(),
  highlights: z.array(z.string()),
});

export const contentPackVersionSchema = z.object({
  id: z.string(),
  version: z.string(),
  releasedAt: z.string(),
  changes: z.array(z.string()),
  backwardCompatible: z.boolean(),
});
