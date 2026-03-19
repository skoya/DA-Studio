import { useEffect, useMemo, useState } from 'react';
import { controls as allControls, jurisdictionPacks, networkProfiles } from '@/lib/catalog';
import { exportSvg } from '@/lib/exports';
import { evaluateRules, getRiskScore } from '@/lib/rules';
import { getClientSegmentLabel } from '@/lib/site';
import { parseWorkspace, toWorkspaceExport, WORKSPACE_KEY } from '@/lib/workspace';
import type { SimulationScenario } from '@/lib/types';
import { SwimlaneDiagram, HeatmapGrid } from '@/components/charts/SvgCharts';

export default function SimulationWorkbench({ scenario }: { scenario: SimulationScenario }) {
  const [selectedJurisdiction, setSelectedJurisdiction] = useState(scenario.jurisdictions[0] ?? 'eu');
  const [selectedClientSegment, setSelectedClientSegment] = useState(scenario.clientSegments[0] ?? 'institutional');
  const [selectedNetwork, setSelectedNetwork] = useState(networkProfiles[0]?.id ?? '');
  const [selectedValues, setSelectedValues] = useState<Record<string, string>>(
    Object.fromEntries(scenario.variables.map((variable) => [variable.id, variable.defaultValue])),
  );
  const [selectedBranches, setSelectedBranches] = useState<string[]>([]);
  const [saveStatus, setSaveStatus] = useState('Not saved in this session.');

  useEffect(() => {
    const raw = window.localStorage.getItem('da-studio-preferences');
    if (!raw) return;
    const parsed = JSON.parse(raw);
    if (parsed.jurisdiction) setSelectedJurisdiction(parsed.jurisdiction);
    if (parsed.clientSegment) setSelectedClientSegment(parsed.clientSegment);
    if (parsed.network) setSelectedNetwork(parsed.network);
  }, []);

  const network = networkProfiles.find((item) => item.id === selectedNetwork);
  const rules = useMemo(
    () =>
      evaluateRules({
        jurisdiction: selectedJurisdiction,
        clientSegment: selectedClientSegment,
        assetFamily: scenario.assetFamily,
        networkType: network?.category,
        latencyNeed: (selectedValues.latencyNeed as 'low' | 'medium' | 'high' | undefined) ?? 'medium',
        valueSensitivity: scenario.id === 'repo-collateral-mobilization' ? 'high' : 'medium',
      }),
    [network?.category, scenario.assetFamily, scenario.id, selectedClientSegment, selectedJurisdiction, selectedValues.latencyNeed],
  );

  const visibleControls = useMemo(() => {
    const ids = new Set([
      ...scenario.steps.flatMap((step) => step.controls),
      ...selectedBranches.flatMap((branchId) => scenario.branches.find((branch) => branch.id === branchId)?.addedControls ?? []),
      ...rules.addedControls,
    ]);
    return allControls.filter((control) => ids.has(control.id));
  }, [rules.addedControls, scenario.branches, scenario.steps, selectedBranches]);

  const riskScore = useMemo(
    () =>
      getRiskScore({
        jurisdiction: selectedJurisdiction,
        clientSegment: selectedClientSegment,
        assetFamily: scenario.assetFamily,
        networkType: network?.category,
        latencyNeed: (selectedValues.latencyNeed as 'low' | 'medium' | 'high' | undefined) ?? 'medium',
        valueSensitivity: scenario.id === 'repo-collateral-mobilization' ? 'high' : 'medium',
      }),
    [network?.category, scenario.assetFamily, scenario.id, selectedClientSegment, selectedJurisdiction, selectedValues.latencyNeed],
  );

  const controlMatrix = useMemo(() => {
    const values: Record<string, number> = {};
    visibleControls.forEach((control) => {
      values[`${control.title}:Required`] = control.severityIfMissing === 'critical' ? 5 : control.severityIfMissing === 'high' ? 4 : 3;
      values[`${control.title}:Evidence`] = Math.min(5, control.evidenceExamples.length);
      values[`${control.title}:Owners`] = Math.min(5, control.ownerHints.length);
    });
    return values;
  }, [visibleControls]);

  function saveState() {
    const bundle = parseWorkspace(window.localStorage.getItem(WORKSPACE_KEY));
    bundle.savedSimulationStates = [
      {
        schemaVersion: 1,
        scenarioId: scenario.id,
        selectedJurisdiction,
        selectedClientSegment,
        selectedNetwork,
        selectedValues,
        selectedBranches,
        savedAt: new Date().toISOString(),
      },
      ...bundle.savedSimulationStates.filter((item) => item.scenarioId !== scenario.id),
    ];
    window.localStorage.setItem(WORKSPACE_KEY, toWorkspaceExport(bundle));
    setSaveStatus(`Saved ${scenario.title} to the local workspace.`);
  }

  const markdownSummary = `# ${scenario.title}

- Jurisdiction: ${selectedJurisdiction}
- Client segment: ${getClientSegmentLabel(selectedClientSegment)}
- Network: ${network?.label ?? selectedNetwork}
- Risk score: ${riskScore}/100
- Required reviews: ${rules.requiredReviews.join(', ') || 'None'}
- Warnings:
${[...rules.warnings, ...selectedBranches.flatMap((branchId) => scenario.branches.find((branch) => branch.id === branchId)?.addedWarnings ?? [])]
  .map((warning) => `  - ${warning}`)
  .join('\n')}
`;

  return (
    <div className="grid">
      <section className="surface card">
        <div className="split">
          <div>
            <p className="eyebrow">Deep simulation</p>
            <h1 style={{ fontSize: 'clamp(2rem,4vw,3.4rem)' }}>{scenario.title}</h1>
            <p>{scenario.summary}</p>
            <div className="meta-row">
              <span className="pill">Actors: {scenario.actors.length}</span>
              <span className="pill">Happy-path phases: {scenario.happyPath.length}</span>
              <span className="pill">Exception branches: {scenario.branches.length}</span>
            </div>
          </div>
          <div className="card">
            <strong>Simulation summary</strong>
            <div className="stat">
              <span>Risk score</span>
              <strong>{riskScore}/100</strong>
            </div>
            <div className="stat">
              <span>Required reviews</span>
              <strong>{rules.requiredReviews.length || 0}</strong>
            </div>
          </div>
        </div>
      </section>

      <section className="surface card">
        <div className="context-grid">
          <Field label="Jurisdiction">
            <select value={selectedJurisdiction} onChange={(event) => setSelectedJurisdiction(event.target.value)} data-testid="simulation-jurisdiction">
              {jurisdictionPacks
                .filter((pack) => scenario.jurisdictions.includes(pack.id))
                .map((pack) => (
                  <option key={pack.id} value={pack.id}>
                    {pack.label}
                  </option>
                ))}
            </select>
          </Field>
          <Field label="Client segment">
            <select
              value={selectedClientSegment}
              onChange={(event) => setSelectedClientSegment(event.target.value as typeof selectedClientSegment)}
              data-testid="simulation-client-segment"
            >
              {scenario.clientSegments.map((segment) => (
                <option key={segment} value={segment}>
                  {getClientSegmentLabel(segment)}
                </option>
              ))}
            </select>
          </Field>
          <Field label="Network / rail">
            <select value={selectedNetwork} onChange={(event) => setSelectedNetwork(event.target.value)}>
              {networkProfiles.map((profile) => (
                <option key={profile.id} value={profile.id}>
                  {profile.label}
                </option>
              ))}
            </select>
          </Field>
          {scenario.variables.map((variable) => (
            <Field key={variable.id} label={variable.label}>
              <select
                value={selectedValues[variable.id]}
                onChange={(event) => setSelectedValues((current) => ({ ...current, [variable.id]: event.target.value }))}
              >
                {variable.options.map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>
            </Field>
          ))}
        </div>
      </section>

      <div className="grid two-col">
        <SwimlaneDiagram
          id="simulation-swimlane"
          title="Lifecycle swimlane"
          lanes={[...new Set(scenario.steps.map((step) => step.lane))]}
          steps={scenario.steps.map((step) => ({ title: step.title, lane: step.lane }))}
        />
        <HeatmapGrid
          id="simulation-controls-heatmap"
          title="Control coverage heatmap"
          rows={visibleControls.map((control) => control.title)}
          columns={['Required', 'Evidence', 'Owners']}
          values={controlMatrix}
        />
      </div>

      <section className="surface card">
        <div className="split">
          <div>
            <p className="eyebrow">Timeline and evidence</p>
            {scenario.steps.map((step, index) => (
              <div key={step.id} className="row">
                <strong>
                  {index + 1}. {step.title}
                </strong>
                <p>{step.summary}</p>
                <p className="muted">Lane: {step.lane}</p>
                <div className="meta-row">
                  {step.documents.map((document) => (
                    <span key={document} className="pill">
                      {document}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
          <aside className="sidebar">
            <div className="card">
              <strong>Exception browser</strong>
              <div className="grid" style={{ marginTop: '0.75rem' }}>
                {scenario.branches.map((branch) => {
                  const active = selectedBranches.includes(branch.id);
                  return (
                    <label key={branch.id} className="card" style={{ padding: '0.8rem' }}>
                      <input
                        type="checkbox"
                        checked={active}
                        onChange={() =>
                          setSelectedBranches((current) =>
                            active ? current.filter((item) => item !== branch.id) : [...current, branch.id],
                          )
                        }
                      />{' '}
                      {branch.label}
                      <p>{branch.trigger}</p>
                    </label>
                  );
                })}
              </div>
            </div>
            <div className="card" style={{ marginTop: '1rem' }}>
              <strong>Governance outcome</strong>
              <ul>
                {[...rules.warnings, ...selectedBranches.flatMap((branchId) => scenario.branches.find((branch) => branch.id === branchId)?.addedWarnings ?? [])].map(
                  (warning) => (
                    <li key={warning}>{warning}</li>
                  ),
                )}
              </ul>
              <p className="muted">Reviews: {rules.requiredReviews.join(', ') || 'None'}</p>
            </div>
            <div className="meta-row" style={{ marginTop: '1rem' }}>
              <button type="button" onClick={saveState} data-testid="save-simulation">
                Save state
              </button>
              <a
                className="button secondary"
                href={`data:text/markdown;charset=utf-8,${encodeURIComponent(markdownSummary)}`}
                download={`${scenario.id}.md`}
                data-testid="export-simulation"
              >
                Export markdown
              </a>
              <button type="button" className="secondary" onClick={() => exportSvg('simulation-swimlane', `${scenario.id}-swimlane.svg`)}>
                Export SVG
              </button>
            </div>
            <p className="muted" data-testid="simulation-save-status" aria-live="polite" style={{ marginTop: '0.75rem' }}>
              {saveStatus}
            </p>
          </aside>
        </div>
      </section>

      <section className="surface card">
        <p className="eyebrow">Control drawer</p>
        <div className="grid two-col">
          {visibleControls.map((control) => (
            <article key={control.id} className="card">
              <span className="pill">{control.domain}</span>
              <h3>{control.title}</h3>
              <p>{control.objective}</p>
              <p className="muted">Evidence: {control.evidenceExamples.join(', ')}</p>
            </article>
          ))}
        </div>
      </section>
    </div>
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
