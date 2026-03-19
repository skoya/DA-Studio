import { useEffect, useMemo, useState } from 'react';
import { RadarChart, HeatmapGrid, MatrixDiagram, NetworkMap, TreeDiagram } from '@/components/charts/SvgCharts';
import { patterns } from '@/lib/catalog';
import { downloadText, exportSvg } from '@/lib/exports';
import { parseWorkspace, toWorkspaceExport, WORKSPACE_KEY } from '@/lib/workspace';
import type { ExplorationProject } from '@/lib/types';

const defaultProject: ExplorationProject = {
  id: 'project-tokenized-treasury',
  title: 'Tokenized treasury settlement proposition',
  summary: 'Explore whether a cross-border tokenized treasury and settlement proposition is strategically sensible.',
  problemStatement: 'Treasury teams want faster cross-border movement with clearer liquidity and control visibility.',
  targetClientSegments: ['institutional', 'corporate-treasury'],
  targetJurisdictions: ['sg', 'eu', 'uk'],
  assetFamilies: ['Tokenized cash', 'Tokenized fund'],
  productPattern: 'tokenized-cash-settlement',
  networksOrRails: ['kinexys', 'permissioned-chain-pattern'],
  assumptions: [
    { id: 'assumption-1', label: 'Treasury clients accept prefunding if liquidity visibility improves', value: 'Likely' },
    { id: 'assumption-2', label: 'Institutional onboarding can remain within existing control architecture', value: 'Needs validation' },
  ],
  evidenceLinks: ['mas-stablecoin', 'kinexys-digital-payments'],
  tags: ['treasury', 'tokenized cash', 'cross-border'],
  lastEditedAt: '2026-03-19T07:45:00Z',
  schemaVersion: 2,
};

const pestelDefaults = [
  { category: 'political', factor: 'Regulatory support for tokenization pilots', effectDirection: 'tailwind', impactScore: 3, certaintyScore: 3, timeHorizon: 'near', evidence: ['mas-project-guardian'] },
  { category: 'economic', factor: 'Treasury demand for extended operating windows', effectDirection: 'tailwind', impactScore: 4, certaintyScore: 4, timeHorizon: 'near', evidence: ['kinexys-digital-payments'] },
  { category: 'social', factor: 'Client comfort with tokenized cash models', effectDirection: 'mixed', impactScore: 2, certaintyScore: 2, timeHorizon: 'mid', evidence: ['mas-stablecoin'] },
  { category: 'technological', factor: 'Hybrid integration burden', effectDirection: 'headwind', impactScore: 4, certaintyScore: 4, timeHorizon: 'near', evidence: ['chainlink-dta'] },
  { category: 'environmental', factor: 'Operational efficiency and dematerialisation benefits', effectDirection: 'mixed', impactScore: 1, certaintyScore: 2, timeHorizon: 'long', evidence: ['ubs-tokenize'] },
  { category: 'legal', factor: 'Settlement-asset perimeter variation across markets', effectDirection: 'headwind', impactScore: 5, certaintyScore: 4, timeHorizon: 'near', evidence: ['mas-stablecoin', 'hkma-stablecoin'] },
] as const;

const fiveForcesDefaults = [
  { force: 'new-entrants', strength: 3, rationale: 'Entry barriers are moderate; product structure is hard, but technology is available.', evidence: ['ubs-tokenize'], mitigants: ['Use bank-grade control positioning'], opportunities: ['Partner-led distribution'] },
  { force: 'suppliers', strength: 4, rationale: 'Rail, custody, and middleware concentration is real.', evidence: ['kinexys-digital-payments'], mitigants: ['Design exit portability'], opportunities: ['Multi-rail roadmap'] },
  { force: 'buyers', strength: 3, rationale: 'Large treasury clients can negotiate around pricing and operating burden.', evidence: ['basel-crypto'], mitigants: ['Quantify resilience value'], opportunities: ['Workflow bundling'] },
  { force: 'substitutes', strength: 4, rationale: 'Traditional treasury rails remain viable substitutes.', evidence: ['kinexys-digital-payments'], mitigants: ['Focus on DvP and operating-window advantages'], opportunities: ['Settlement bundling'] },
  { force: 'rivalry', strength: 3, rationale: 'Market is active but not yet commoditised.', evidence: ['ubs-tokenize'], mitigants: ['Choose differentiated target workflow'], opportunities: ['Governance-first positioning'] },
] as const;

const defaultRaci = {
  activities: ['Classify product', 'Approve controls', 'Configure settlement rail', 'Support incidents'],
  roles: ['Product', 'Legal', 'Compliance', 'Operations', 'Treasury', 'Engineering', 'Executive sponsor'],
  assignments: {
    'Classify product': { Product: 'R', Legal: 'A', Compliance: 'C', Operations: 'I', Treasury: '', Engineering: '', 'Executive sponsor': 'I' },
    'Approve controls': { Product: 'C', Legal: 'C', Compliance: 'A', Operations: 'R', Treasury: 'C', Engineering: 'C', 'Executive sponsor': 'I' },
    'Configure settlement rail': { Product: 'C', Legal: '', Compliance: 'C', Operations: 'R', Treasury: 'A', Engineering: 'R', 'Executive sponsor': 'I' },
    'Support incidents': { Product: 'I', Legal: 'C', Compliance: 'C', Operations: 'R', Treasury: 'C', Engineering: 'R', 'Executive sponsor': 'A' },
  } as Record<string, Record<string, string>>,
};

const defaultPbs = [
  { label: 'Client proposition', depth: 0 },
  { label: 'Legal wrapper', depth: 0 },
  { label: 'Settlement', depth: 0 },
  { label: 'Settlement rail integration', depth: 1 },
  { label: 'Liquidity controls', depth: 1 },
  { label: 'Custody and safekeeping', depth: 0 },
  { label: 'Control evidence pack', depth: 1 },
  { label: 'Reporting', depth: 0 },
] as const;

const defaultWbs = [
  { label: 'Discovery', depth: 0 },
  { label: 'Legal and compliance review', depth: 0 },
  { label: 'Design', depth: 0 },
  { label: 'Architecture', depth: 0 },
  { label: 'Build', depth: 0 },
  { label: 'Testing', depth: 0 },
  { label: 'Pilot', depth: 0 },
  { label: 'Launch readiness', depth: 0 },
] as const;

export default function WorkbenchApp({ view }: { view: string }) {
  const [project, setProject] = useState(defaultProject);
  const [fvd, setFvd] = useState({ feasibility: 68, viability: 54, desirability: 71 });

  useEffect(() => {
    const bundle = parseWorkspace(window.localStorage.getItem(WORKSPACE_KEY));
    if (bundle.projects[0]) setProject(bundle.projects[0]);
  }, []);

  const pestelHeatmap = useMemo(() => {
    const values: Record<string, number> = {};
    pestelDefaults.forEach((entry) => {
      values[`${entry.category}:Impact`] = entry.impactScore;
      values[`${entry.category}:Certainty`] = entry.certaintyScore;
    });
    return values;
  }, []);

  const fiveForcesRadar = useMemo(
    () => fiveForcesDefaults.map((entry) => ({ label: entry.force.replace('-', ' '), value: entry.strength * 20 })),
    [],
  );

  function saveProject() {
    const bundle = parseWorkspace(window.localStorage.getItem(WORKSPACE_KEY));
    bundle.projects = [project];
    window.localStorage.setItem(WORKSPACE_KEY, toWorkspaceExport(bundle));
  }

  const decisionPack = useMemo(
    () => `# ${project.title}

## Idea summary
${project.summary}

## Problem statement
${project.problemStatement}

## Target clients
${project.targetClientSegments.join(', ')}

## Jurisdictions
${project.targetJurisdictions.join(', ')}

## FVD
- Feasibility: ${fvd.feasibility}
- Viability: ${fvd.viability}
- Desirability: ${fvd.desirability}

## Comparable pattern
${patterns.find((pattern) => pattern.id === project.productPattern)?.title ?? 'No pattern selected'}
`,
    [fvd.desirability, fvd.feasibility, fvd.viability, project],
  );

  return (
    <div className="grid">
      <section className="surface card">
        <p className="eyebrow">Strategy and venture workbench</p>
        <h1 style={{ fontSize: 'clamp(2rem,4vw,3rem)' }}>{project.title}</h1>
        <p>{project.summary}</p>
        <div className="meta-row">
          <span className="pill">Route view: {view}</span>
          <span className="pill">Schema version: {project.schemaVersion}</span>
          <span className="pill">Target markets: {project.targetJurisdictions.join(', ')}</span>
        </div>
      </section>

      <section className="surface card">
        <div className="form-grid">
          <Field label="Project title">
            <input value={project.title} onChange={(event) => setProject((current) => ({ ...current, title: event.target.value }))} />
          </Field>
          <Field label="Problem statement">
            <textarea
              rows={4}
              value={project.problemStatement}
              onChange={(event) => setProject((current) => ({ ...current, problemStatement: event.target.value }))}
            />
          </Field>
        </div>
        <div className="meta-row" style={{ marginTop: '1rem' }}>
          <button type="button" onClick={saveProject} data-testid="save-project">
            Save project
          </button>
          <button type="button" className="secondary" onClick={() => downloadText('decision-pack.md', decisionPack)} data-testid="decision-pack-export">
            Export decision pack
          </button>
        </div>
      </section>

      <div className="grid two-col">
        <HeatmapGrid id="pestel-heatmap" title="PESTEL heatmap" rows={['political', 'economic', 'social', 'technological', 'environmental', 'legal']} columns={['Impact', 'Certainty']} values={pestelHeatmap} />
        <RadarChart id="forces-radar" title="Five forces" values={fiveForcesRadar} />
      </div>

      <div className="grid two-col">
        <RadarChart
          id="fvd-radar"
          title="Feasibility / Viability / Desirability"
          values={[
            { label: 'Feasibility', value: fvd.feasibility },
            { label: 'Viability', value: fvd.viability },
            { label: 'Desirability', value: fvd.desirability },
          ]}
        />
        <div className="card">
          <strong>Adjust FVD scoring</strong>
          <div className="form-grid" style={{ marginTop: '0.8rem' }}>
            {(['feasibility', 'viability', 'desirability'] as const).map((key) => (
              <Field key={key} label={key}>
                <input
                  type="range"
                  min={0}
                  max={100}
                  value={fvd[key]}
                  onInput={(event) => setFvd((current) => ({ ...current, [key]: Number((event.target as HTMLInputElement).value) }))}
                  onChange={(event) => setFvd((current) => ({ ...current, [key]: Number(event.target.value) }))}
                  data-testid={`fvd-${key}`}
                />
              </Field>
            ))}
          </div>
          <p className="muted" data-testid="fvd-status">
            Recommendation: {Math.min(fvd.feasibility, fvd.viability, fvd.desirability) > 60 ? 'Proceed with caution' : 'Clarify blockers before progressing'}
          </p>
        </div>
      </div>

      <div className="grid two-col">
        <MatrixDiagram id="raci-matrix" title="RACI matrix" rows={defaultRaci.activities} columns={defaultRaci.roles} data={Object.fromEntries(Object.entries(defaultRaci.assignments).flatMap(([activity, values]) => Object.entries(values).map(([role, value]) => [`${activity}:${role}`, value])))} />
        <NetworkMap id="dependency-map" title="Dependency map" center="Core proposition" nodes={['Legal', 'Operations', 'Rail', 'Custody', 'Controls']} />
      </div>

      <div className="grid two-col">
        <TreeDiagram id="pbs-tree" title="Product breakdown structure" nodes={defaultPbs.map((item) => ({ label: item.label, depth: item.depth }))} />
        <TreeDiagram id="wbs-tree" title="Work breakdown structure" nodes={defaultWbs.map((item) => ({ label: item.label, depth: item.depth }))} />
      </div>

      <section className="surface card">
        <strong>Decision pack summary</strong>
        <p>{decisionPack}</p>
        <div className="meta-row">
          <button type="button" className="secondary" onClick={() => exportSvg('fvd-radar', 'fvd-radar.svg')}>
            Export FVD SVG
          </button>
          <button type="button" className="secondary" onClick={() => exportSvg('raci-matrix', 'raci-matrix.svg')}>
            Export RACI SVG
          </button>
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
