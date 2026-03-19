import { useEffect, useState } from 'react';
import { parseWorkspace, toWorkspaceExport, WORKSPACE_KEY, WORKSPACE_SCHEMA_VERSION } from '@/lib/workspace';

export default function WorkspaceManager() {
  const [workspace, setWorkspace] = useState(parseWorkspace(null));
  const [statusMessage, setStatusMessage] = useState('Workspace ready for local save, import, or export.');

  useEffect(() => {
    setWorkspace(parseWorkspace(window.localStorage.getItem(WORKSPACE_KEY)));
  }, []);

  function save(next: typeof workspace) {
    setWorkspace(next);
    window.localStorage.setItem(WORKSPACE_KEY, toWorkspaceExport(next));
    setStatusMessage(`Workspace updated locally with ${next.notes.length} notes and ${next.savedSimulationStates.length} saved simulations.`);
  }

  return (
    <div className="grid">
      <section className="surface card">
        <p className="eyebrow">Local workspace</p>
        <h1 style={{ fontSize: 'clamp(2rem,4vw,3rem)' }}>Saved simulations, projects, scenarios, and notes</h1>
        <p>
          Workspace data is stored locally in the browser for this MVP. Every bundle carries a schema version and
          import flows migrate older versions forward.
        </p>
        <div className="summary-grid">
          <div className="card">
            <span className="muted">Schema version</span>
            <strong>{workspace.schemaVersion}</strong>
          </div>
          <div className="card">
            <span className="muted">Saved simulations</span>
            <strong>{workspace.savedSimulationStates.length}</strong>
          </div>
          <div className="card">
            <span className="muted">Projects</span>
            <strong>{workspace.projects.length}</strong>
          </div>
          <div className="card">
            <span className="muted">Business scenarios</span>
            <strong>{workspace.businessModelScenarios.length}</strong>
          </div>
        </div>
      </section>

      <section className="surface card">
        <div className="grid two-col">
          <div className="card">
            <strong>Export workspace bundle</strong>
            <p>JSON export preserves saved simulation states, strategy projects, scenarios, and notes.</p>
            <a
              className="button"
              href={`data:application/json;charset=utf-8,${encodeURIComponent(toWorkspaceExport(workspace))}`}
              download="da-studio-workspace.json"
              data-testid="workspace-export"
            >
              Export JSON
            </a>
          </div>
          <div className="card">
            <strong>Import workspace bundle</strong>
            <p>Imports migrate version 1 payloads into the current schema version {WORKSPACE_SCHEMA_VERSION}.</p>
            <input
              type="file"
              accept="application/json"
              onChange={async (event) => {
                const file = event.target.files?.[0];
                if (!file) return;
                const text = await file.text();
                save(parseWorkspace(text));
                setStatusMessage(`Imported workspace bundle from ${file.name}.`);
              }}
              data-testid="workspace-import"
            />
          </div>
        </div>
        <p className="muted" data-testid="workspace-status" aria-live="polite" style={{ marginTop: '1rem' }}>
          {statusMessage}
        </p>
      </section>

      <section className="surface card">
        <strong>Workspace notes</strong>
        <textarea
          rows={6}
          value={workspace.notes.join('\n')}
          onChange={(event) => save({ ...workspace, notes: event.target.value.split('\n').filter(Boolean) })}
          placeholder="Use sanitized internal planning notes only."
        />
      </section>

      <section className="surface card">
        <div className="grid two-col">
          <div className="card">
            <strong>Saved simulation states</strong>
            <ul>
              {workspace.savedSimulationStates.map((entry, index) => (
                <li key={`${String(entry.scenarioId)}-${index}`}>{String(entry.scenarioId)}</li>
              ))}
            </ul>
          </div>
          <div className="card">
            <strong>Projects and scenarios</strong>
            <p>Projects: {workspace.projects.map((project) => project.title).join(', ') || 'None saved yet.'}</p>
            <p>Scenarios: {workspace.businessModelScenarios.map((scenario) => scenario.label).join(', ') || 'None saved yet.'}</p>
          </div>
        </div>
      </section>
    </div>
  );
}
