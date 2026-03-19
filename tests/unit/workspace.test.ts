import { describe, expect, it } from 'vitest';
import { migrateWorkspace, parseWorkspace, WORKSPACE_SCHEMA_VERSION } from '@/lib/workspace';

describe('workspace migrations', () => {
  it('migrates schema version 1 payloads to the current version', () => {
    const migrated = migrateWorkspace({
      schemaVersion: 1,
      projects: [],
      simulations: [{ scenarioId: 'native-crypto-lifecycle' }],
      notes: ['legacy'],
    });

    expect(migrated.schemaVersion).toBe(WORKSPACE_SCHEMA_VERSION);
    expect(migrated.savedSimulationStates).toHaveLength(1);
    expect(migrated.notes).toContain('legacy');
  });

  it('falls back safely on invalid JSON', () => {
    const parsed = parseWorkspace('{invalid json');
    expect(parsed.schemaVersion).toBe(WORKSPACE_SCHEMA_VERSION);
    expect(parsed.projects).toHaveLength(0);
  });
});
