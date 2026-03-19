import { useEffect, useMemo, useState } from 'react';
import {
  buildBusinessNarrative,
  businessModelTemplates,
  calculateBusinessModelMetrics,
  createScenario,
  formatCurrency,
} from '@/lib/business-model';
import { exportSvg } from '@/lib/exports';
import { parseWorkspace, toWorkspaceExport, WORKSPACE_KEY } from '@/lib/workspace';
import { LineChart, RadarChart, TornadoChart, WaterfallChart } from '@/components/charts/SvgCharts';

export default function BusinessModelSimulator() {
  const [scenario, setScenario] = useState(createScenario());
  const [comparison, setComparison] = useState(createScenario('institutional-issuance'));

  const metrics = useMemo(() => calculateBusinessModelMetrics(scenario), [scenario]);
  const comparisonMetrics = useMemo(() => calculateBusinessModelMetrics(comparison), [comparison]);
  const narrative = useMemo(() => buildBusinessNarrative(metrics), [metrics]);

  useEffect(() => {
    const bundle = parseWorkspace(window.localStorage.getItem(WORKSPACE_KEY));
    const saved = bundle.businessModelScenarios;
    if (saved[0]) setScenario(saved[0]);
    if (saved[1]) setComparison(saved[1]);
  }, []);

  function updateScenario(field: string, value: number, target: 'primary' | 'comparison') {
    const setter = target === 'primary' ? setScenario : setComparison;
    setter((current) => ({
      ...current,
      assumptions: {
        ...current.assumptions,
        [field]: value,
      },
      updatedAt: new Date().toISOString(),
    }));
  }

  function saveToWorkspace() {
    const bundle = parseWorkspace(window.localStorage.getItem(WORKSPACE_KEY));
    bundle.businessModelScenarios = [scenario, comparison];
    window.localStorage.setItem(WORKSPACE_KEY, toWorkspaceExport(bundle));
  }

  return (
    <div className="grid">
      <section className="surface card">
        <p className="eyebrow">Business model simulator</p>
        <h1 style={{ fontSize: 'clamp(2rem,4vw,3.2rem)' }}>Deterministic scenario economics with control-burden visibility</h1>
        <p>
          Revenue, cost, adoption, and control-intensity assumptions stay explicit. Outputs are illustrative internal planning tools only.
        </p>
      </section>

      <section className="surface card">
        <div className="grid two-col">
          <ScenarioForm
            title="Primary scenario"
            scenario={scenario}
            onTemplateChange={(value) => setScenario(createScenario(value))}
            onChange={(field, value) => updateScenario(field, value, 'primary')}
          />
          <ScenarioForm
            title="Comparison scenario"
            scenario={comparison}
            onTemplateChange={(value) => setComparison(createScenario(value))}
            onChange={(field, value) => updateScenario(field, value, 'comparison')}
          />
        </div>
      </section>

      <section className="surface card">
        <div className="summary-grid">
          <MetricCard label="Annual revenue" value={formatCurrency(metrics.annualRevenue)} />
          <MetricCard label="Gross margin" value={formatCurrency(metrics.grossMargin)} />
          <MetricCard label="Break-even month" value={`Month ${metrics.breakEvenMonth}`} />
          <MetricCard label="Launch complexity" value={`${metrics.launchComplexityIndex}/100`} />
          <MetricCard label="Control-adjusted profitability" value={`${metrics.controlAdjustedProfitability}%`} />
        </div>
      </section>

      <div className="grid two-col">
        <WaterfallChart
          id="business-waterfall"
          title="Economic waterfall"
          steps={[
            { label: 'Revenue', value: metrics.annualRevenue },
            { label: 'Fixed', value: -metrics.fixedCosts },
            { label: 'Variable', value: -metrics.variableCosts },
            { label: 'Contribution', value: metrics.contributionMargin },
          ]}
        />
        <LineChart
          id="business-breakeven"
          title="Break-even curve"
          values={Array.from({ length: 12 }, (_, index) => (metrics.annualRevenue / 12 - metrics.variableCosts / 12) * (index + 1) - metrics.fixedCosts)}
        />
      </div>

      <div className="grid two-col">
        <TornadoChart id="business-sensitivity" title="Sensitivity ranking" items={metrics.sensitivity} />
        <RadarChart
          id="business-risk-reward"
          title="Risk vs reward posture"
          values={[
            { label: 'Reward', value: Math.max(0, metrics.controlAdjustedProfitability + 40) },
            { label: 'Complexity', value: metrics.launchComplexityIndex },
            { label: 'Resilience', value: 100 - Math.min(90, metrics.variableCosts / 10000) },
            { label: 'Payback', value: Math.max(0, 100 - metrics.paybackPeriodMonths * 2) },
          ]}
        />
      </div>

      <section className="surface card">
        <div className="grid two-col">
          <div className="card">
            <strong>Scenario comparison</strong>
            <p>Primary annual revenue: {formatCurrency(metrics.annualRevenue)}</p>
            <p>Comparison annual revenue: {formatCurrency(comparisonMetrics.annualRevenue)}</p>
            <p>Primary break-even: month {metrics.breakEvenMonth}</p>
            <p>Comparison break-even: month {comparisonMetrics.breakEvenMonth}</p>
          </div>
          <div className="card">
            <strong>Narrative summary</strong>
            <ul>
              {narrative.map((line) => (
                <li key={line}>{line}</li>
              ))}
            </ul>
          </div>
        </div>
        <div className="meta-row" style={{ marginTop: '1rem' }}>
          <button type="button" onClick={saveToWorkspace} data-testid="save-business-scenario">
            Save scenarios
          </button>
            <a
              className="button secondary"
              href={`data:text/markdown;charset=utf-8,${encodeURIComponent(narrative.join('\n'))}`}
              download="business-model-summary.md"
              data-testid="export-business-summary"
            >
              Export summary
            </a>
          <button type="button" className="secondary" onClick={() => exportSvg('business-waterfall', 'business-waterfall.svg')}>
            Export waterfall SVG
          </button>
        </div>
      </section>
    </div>
  );
}

function ScenarioForm({
  title,
  scenario,
  onTemplateChange,
  onChange,
}: {
  title: string;
  scenario: ReturnType<typeof createScenario>;
  onTemplateChange: (value: string) => void;
  onChange: (field: string, value: number) => void;
}) {
  const numericFields = Object.entries(scenario.assumptions).filter(([, value]) => typeof value === 'number');

  return (
    <div className="card">
      <div className="field">
        <label>{title}</label>
        <select value={scenario.template} onChange={(event) => onTemplateChange(event.target.value)}>
          {businessModelTemplates.map((template) => (
            <option key={template.id} value={template.id}>
              {template.label}
            </option>
          ))}
        </select>
      </div>
      <div className="form-grid" style={{ marginTop: '0.8rem' }}>
        {numericFields.map(([field, value]) => (
          <div className="field" key={field}>
            <label>{field}</label>
            <input
              type="number"
              value={Number(value)}
              onChange={(event) => onChange(field, Number(event.target.value))}
              data-testid={`business-input-${field}`}
            />
          </div>
        ))}
      </div>
    </div>
  );
}

function MetricCard({ label, value }: { label: string; value: string }) {
  const slug = label.toLowerCase().replace(/[^a-z0-9]+/g, '-');
  return (
    <div className="card" data-testid={`metric-${slug}`}>
      <span className="muted">{label}</span>
      <strong>{value}</strong>
    </div>
  );
}
