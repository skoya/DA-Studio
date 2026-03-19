import type { BusinessModelScenario, ExplorationProject } from './types';

export const WORKSPACE_KEY = 'da-studio-workspace';
export const WORKSPACE_SCHEMA_VERSION = 2;

export type WorkspaceBundle = {
  schemaVersion: number;
  projects: ExplorationProject[];
  savedSimulationStates: Array<Record<string, unknown>>;
  businessModelScenarios: BusinessModelScenario[];
  notes: string[];
  savedAt: string;
};

type WorkspaceV1 = {
  schemaVersion: 1;
  projects: ExplorationProject[];
  simulations: Array<Record<string, unknown>>;
  notes: string[];
};

export function createEmptyWorkspace(): WorkspaceBundle {
  return {
    schemaVersion: WORKSPACE_SCHEMA_VERSION,
    projects: [],
    savedSimulationStates: [],
    businessModelScenarios: [],
    notes: [],
    savedAt: new Date().toISOString(),
  };
}

export const defaultWorkspace: WorkspaceBundle = createEmptyWorkspace();

export function migrateWorkspace(input: unknown): WorkspaceBundle {
  if (!input || typeof input !== 'object') {
    return createEmptyWorkspace();
  }

  const candidate = input as Partial<WorkspaceBundle & WorkspaceV1>;
  const base = createEmptyWorkspace();

  if (Number(candidate.schemaVersion) === 2) {
    return {
      ...base,
      ...candidate,
      savedAt: candidate.savedAt ?? new Date().toISOString(),
      projects: [...(candidate.projects ?? [])],
      savedSimulationStates: [...(candidate.savedSimulationStates ?? [])],
      businessModelScenarios: [...(candidate.businessModelScenarios ?? [])],
      notes: [...(candidate.notes ?? [])],
    };
  }

  if (Number(candidate.schemaVersion) === 1) {
    return {
      schemaVersion: WORKSPACE_SCHEMA_VERSION,
      projects: [...(candidate.projects ?? [])],
      savedSimulationStates: [...(candidate.simulations ?? [])],
      businessModelScenarios: [],
      notes: [...(candidate.notes ?? [])],
      savedAt: new Date().toISOString(),
    };
  }

  return createEmptyWorkspace();
}

export function parseWorkspace(raw: string | null): WorkspaceBundle {
  if (!raw) return createEmptyWorkspace();

  try {
    return migrateWorkspace(JSON.parse(raw));
  } catch {
    return createEmptyWorkspace();
  }
}

export function toWorkspaceExport(bundle: WorkspaceBundle) {
  return JSON.stringify(
    {
      ...bundle,
      schemaVersion: WORKSPACE_SCHEMA_VERSION,
      savedAt: new Date().toISOString(),
    },
    null,
    2,
  );
}
