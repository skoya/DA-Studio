export type Depth = 'plain' | 'practitioner' | 'expert';
export type Lens =
  | 'learning'
  | 'client'
  | 'product'
  | 'operations'
  | 'risk'
  | 'technology'
  | 'executive';

export type ClientSegment =
  | 'retail'
  | 'affluent'
  | 'hnw'
  | 'uhnw'
  | 'family-office'
  | 'institutional'
  | 'corporate-treasury'
  | 'issuer';

export type Confidence = 'high' | 'medium' | 'low';
export type ChangeStatus =
  | 'final'
  | 'transitional'
  | 'draft'
  | 'sandbox'
  | 'consultation'
  | 'statement'
  | 'market-practice';

export type SourceCard = {
  id: string;
  title: string;
  organization: string;
  url: string;
  sourceType:
    | 'law'
    | 'guidance'
    | 'standard'
    | 'official-page'
    | 'official-press-release'
    | 'industry-body';
  jurisdiction?: string;
  status?: ChangeStatus | 'proposal' | 'press-release';
  lastReviewed: string;
  staleAfterDays: number;
  owner: string;
  confidence: Confidence;
  criticality: 'low' | 'medium' | 'high';
  relevanceTags: string[];
  impactAreas: string[];
  summary: string;
};

export type GlossaryTerm = {
  id: string;
  term: string;
  shortDefinition: string;
  practitionerNote: string;
  expertNote: string;
  relatedTerms: string[];
  sourceIds: string[];
};

export type Concept = {
  id: string;
  title: string;
  summary: string;
  plain: string;
  practitioner: string;
  expert: string;
  whyItMatters: string[];
  misconceptions: string[];
  clientImpacts: Record<ClientSegment, string>;
  jurisdictionNotes: Record<string, string>;
  relatedGlossary: string[];
  relatedPatterns: string[];
  relatedSimulations: string[];
  relatedControls: string[];
  sourceIds: string[];
  lastReviewed: string;
  reviewOwner: string;
  freshnessDays: number;
};

export type Journey = {
  id: string;
  title: string;
  summary: string;
  audience: string[];
  stops: { label: string; href: string }[];
};

export type JurisdictionPack = {
  id: string;
  label: string;
  status: 'tier1' | 'tier2' | 'global';
  summary: string;
  authorities: { name: string; url?: string }[];
  marketRelevance: string[];
  coreTopics: string[];
  activityMap: string[];
  controlHotspots: string[];
  simulationOverlays: string[];
  defaultWarnings: string[];
  confidence: Confidence;
  changeStatus: ChangeStatus;
  sourceIds: string[];
  lastReviewed: string;
};

export type NetworkProfile = {
  id: string;
  label: string;
  category:
    | 'public-chain'
    | 'permissioned-chain'
    | 'fmi'
    | 'bank-rail'
    | 'tokenization-stack'
    | 'middleware'
    | 'custody'
    | 'other';
  summary: string;
  assetSupport: string[];
  participantModel: string;
  settlementModel: string;
  identityModel: string;
  privacyModel: string;
  finalityProfile: string;
  operatingWindow: string;
  controlConsiderations: string[];
  interoperabilityNotes: string[];
  sourceIds: string[];
  lastReviewed: string;
};

export type Pattern = {
  id: string;
  title: string;
  summary: string;
  clientSegments: ClientSegment[];
  assetFamily: string;
  legalWrapper: string;
  settlementAsset: string;
  custodyModel: string;
  networkType: string;
  primaryObjective: string;
  controlHotspots: string[];
  sourceIds: string[];
};

export type Control = {
  id: string;
  domain: string;
  title: string;
  objective: string;
  whyItMatters: string;
  appliesWhen: string[];
  evidenceExamples: string[];
  severityIfMissing: 'low' | 'medium' | 'high' | 'critical';
  ownerHints: string[];
  sourceIds: string[];
  relatedRules: string[];
  relatedSimulations: string[];
};

export type RuleEffectType =
  | 'allow'
  | 'warn'
  | 'block'
  | 'require_legal_review'
  | 'require_compliance_review'
  | 'require_risk_review'
  | 'add_control'
  | 'add_artifact'
  | 'add_disclosure'
  | 'add_simulation_branch'
  | 'set_confidence_low';

export type RuleDefinition = {
  id: string;
  title: string;
  description: string;
  if: Partial<{
    jurisdiction: string;
    clientSegment: ClientSegment;
    assetFamily: string;
    activityType: string;
    settlementAsset: string;
    networkType: string;
    custodyModel: string;
    latencyNeed: 'low' | 'medium' | 'high';
    valueSensitivity: 'low' | 'medium' | 'high';
  }>;
  effects: { type: RuleEffectType; value?: string }[];
  rationale: string;
  sourceIds: string[];
};

export type SimulationVariable = {
  id: string;
  label: string;
  options: string[];
  defaultValue: string;
};

export type SimulationStep = {
  id: string;
  title: string;
  lane: string;
  summary: string;
  documents: string[];
  controls: string[];
  sources: string[];
};

export type SimulationBranch = {
  id: string;
  label: string;
  trigger: string;
  impact: string[];
  addedWarnings: string[];
  addedControls: string[];
  addedArtifacts: string[];
};

export type SimulationScenario = {
  id: string;
  title: string;
  summary: string;
  assetFamily: string;
  clientSegments: ClientSegment[];
  jurisdictions: string[];
  actors: string[];
  variables: SimulationVariable[];
  happyPath: string[];
  operationalArtifacts: string[];
  sourceIds: string[];
  steps: SimulationStep[];
  branches: SimulationBranch[];
};

export type ReleaseNote = {
  id: string;
  title: string;
  releasedAt: string;
  summary: string;
  highlights: string[];
};

export type ContentPackVersion = {
  id: string;
  version: string;
  releasedAt: string;
  changes: string[];
  backwardCompatible: boolean;
};

export type ExplorationProject = {
  id: string;
  title: string;
  summary: string;
  problemStatement: string;
  targetClientSegments: string[];
  targetJurisdictions: string[];
  assetFamilies: string[];
  productPattern?: string;
  networksOrRails: string[];
  assumptions: { id: string; label: string; value: string }[];
  evidenceLinks: string[];
  tags: string[];
  lastEditedAt: string;
  schemaVersion: number;
};

export type BusinessModelScenario = {
  id: string;
  label: string;
  template: string;
  assumptions: Record<string, number | string | boolean>;
  notes?: string;
  createdAt: string;
  updatedAt: string;
  schemaVersion: number;
};
