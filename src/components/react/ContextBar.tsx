import { useEffect, useState } from 'react';
import { clientSegments, depthOptions, lensOptions, networkProfiles, jurisdictionPacks } from '@/lib/catalog';
import { defaultSelections } from '@/lib/site';
import { WORKSPACE_KEY, defaultWorkspace, parseWorkspace, toWorkspaceExport } from '@/lib/workspace';

const PREFERENCES_KEY = 'da-studio-preferences';

type Preferences = typeof defaultSelections;

export default function ContextBar() {
  const [prefs, setPrefs] = useState<Preferences>(defaultSelections);

  useEffect(() => {
    const raw = window.localStorage.getItem(PREFERENCES_KEY);
    if (raw) {
      setPrefs({ ...defaultSelections, ...JSON.parse(raw) });
    }
  }, []);

  useEffect(() => {
    window.localStorage.setItem(PREFERENCES_KEY, JSON.stringify(prefs));
  }, [prefs]);

  return (
    <section className="surface card section" aria-label="Global context">
      <div className="grid" style={{ gap: '0.9rem' }}>
        <div>
          <p className="eyebrow">Global context</p>
          <h3>Lens, depth, market, segment, and network travel with you</h3>
          <p>
            These selections shape simulation warnings, workbench defaults, and governance overlays. Core reading
            content still works without JavaScript.
          </p>
        </div>
        <div className="context-grid">
          <Field label="Lens">
            <select value={prefs.lens} onChange={(event) => setPrefs((current) => ({ ...current, lens: event.target.value as Preferences['lens'] }))}>
              {lensOptions.map((option) => (
                <option key={option.id} value={option.id}>
                  {option.label}
                </option>
              ))}
            </select>
          </Field>
          <Field label="Depth">
            <select value={prefs.depth} onChange={(event) => setPrefs((current) => ({ ...current, depth: event.target.value as Preferences['depth'] }))}>
              {depthOptions.map((option) => (
                <option key={option.id} value={option.id}>
                  {option.label}
                </option>
              ))}
            </select>
          </Field>
          <Field label="Jurisdiction">
            <select
              value={prefs.jurisdiction}
              onChange={(event) => setPrefs((current) => ({ ...current, jurisdiction: event.target.value }))}
            >
              {jurisdictionPacks.map((option) => (
                <option key={option.id} value={option.id}>
                  {option.label}
                </option>
              ))}
            </select>
          </Field>
          <Field label="Client segment">
            <select
              value={prefs.clientSegment}
              onChange={(event) =>
                setPrefs((current) => ({ ...current, clientSegment: event.target.value as Preferences['clientSegment'] }))
              }
            >
              {clientSegments.map((option) => (
                <option key={option.id} value={option.id}>
                  {option.label}
                </option>
              ))}
            </select>
          </Field>
          <Field label="Network / rail">
            <select value={prefs.network} onChange={(event) => setPrefs((current) => ({ ...current, network: event.target.value }))}>
              {networkProfiles.map((option) => (
                <option key={option.id} value={option.id}>
                  {option.label}
                </option>
              ))}
            </select>
          </Field>
        </div>
        <div className="summary-grid">
          <div className="card">
            <strong>Workspace export</strong>
            <p>Export the current local-only workspace bundle, including saved simulations and projects.</p>
            <button
              type="button"
              className="secondary"
              onClick={() => {
                const bundle = parseWorkspace(window.localStorage.getItem(WORKSPACE_KEY)) ?? defaultWorkspace;
                const link = document.createElement('a');
                const blob = new Blob([toWorkspaceExport(bundle)], { type: 'application/json' });
                link.href = URL.createObjectURL(blob);
                link.download = 'da-studio-workspace.json';
                link.click();
                URL.revokeObjectURL(link.href);
              }}
            >
              Export Workspace
            </button>
          </div>
          <div className="card">
            <strong>Release posture</strong>
            <p>Deterministic rules stay on. AI remains optional and is not required for core product behavior.</p>
          </div>
        </div>
      </div>
    </section>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="field">
      <label>
        <span>{label}</span>
        {children}
      </label>
    </div>
  );
}
