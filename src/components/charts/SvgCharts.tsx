import type { CSSProperties } from 'react';

function frameStyle(): CSSProperties {
  return {
    border: '1px solid rgba(20,40,29,0.12)',
    borderRadius: '18px',
    padding: '1rem',
    background: 'rgba(255,255,255,0.68)',
  };
}

export function RadarChart({
  id,
  title,
  values,
}: {
  id: string;
  title: string;
  values: Array<{ label: string; value: number }>;
}) {
  const size = 260;
  const center = size / 2;
  const radius = 88;
  const points = values
    .map((item, index) => {
      const angle = (Math.PI * 2 * index) / values.length - Math.PI / 2;
      const scaled = radius * (item.value / 100);
      const x = center + Math.cos(angle) * scaled;
      const y = center + Math.sin(angle) * scaled;
      return `${x},${y}`;
    })
    .join(' ');

  return (
    <figure className="chart-card" style={frameStyle()}>
      <figcaption>
        <strong>{title}</strong>
      </figcaption>
      <svg id={id} viewBox={`0 0 ${size} ${size}`} role="img" aria-label={title}>
        {[20, 40, 60, 80, 100].map((ring) => (
          <circle
            key={ring}
            cx={center}
            cy={center}
            r={(radius * ring) / 100}
            fill="none"
            stroke="rgba(20,40,29,0.14)"
          />
        ))}
        {values.map((item, index) => {
          const angle = (Math.PI * 2 * index) / values.length - Math.PI / 2;
          const labelX = center + Math.cos(angle) * (radius + 24);
          const labelY = center + Math.sin(angle) * (radius + 24);
          return (
            <g key={item.label}>
              <line
                x1={center}
                y1={center}
                x2={center + Math.cos(angle) * radius}
                y2={center + Math.sin(angle) * radius}
                stroke="rgba(20,40,29,0.18)"
              />
              <text x={labelX} y={labelY} textAnchor="middle" fontSize="11" fill="#14281d">
                {item.label}
              </text>
            </g>
          );
        })}
        <polygon points={points} fill="rgba(14,107,84,0.24)" stroke="#0e6b54" strokeWidth="2" />
      </svg>
    </figure>
  );
}

export function HeatmapGrid({
  id,
  title,
  rows,
  columns,
  values,
}: {
  id: string;
  title: string;
  rows: string[];
  columns: string[];
  values: Record<string, number>;
}) {
  const cell = 40;
  const width = columns.length * cell + 120;
  const height = rows.length * cell + 80;

  return (
    <figure className="chart-card" style={frameStyle()}>
      <figcaption>
        <strong>{title}</strong>
      </figcaption>
      <svg id={id} viewBox={`0 0 ${width} ${height}`} role="img" aria-label={title}>
        {columns.map((column, index) => (
          <text key={column} x={120 + index * cell + 18} y={20} fontSize="11" fill="#14281d">
            {column}
          </text>
        ))}
        {rows.map((row, rowIndex) => (
          <g key={row}>
            <text x={0} y={60 + rowIndex * cell + 14} fontSize="11" fill="#14281d">
              {row}
            </text>
            {columns.map((column, columnIndex) => {
              const score = values[`${row}:${column}`] ?? 0;
              const alpha = Math.max(0.1, score / 5);
              return (
                <rect
                  key={column}
                  x={120 + columnIndex * cell}
                  y={40 + rowIndex * cell}
                  width={32}
                  height={32}
                  rx={8}
                  fill={`rgba(14,107,84,${alpha})`}
                  stroke="rgba(20,40,29,0.16)"
                />
              );
            })}
          </g>
        ))}
      </svg>
    </figure>
  );
}

export function WaterfallChart({
  id,
  title,
  steps,
}: {
  id: string;
  title: string;
  steps: Array<{ label: string; value: number }>;
}) {
  let running = 0;
  const width = 420;
  const height = 240;
  const barWidth = 54;
  const max = Math.max(...steps.map((step) => Math.abs(step.value)), Math.abs(steps.reduce((sum, step) => sum + step.value, 0)), 1);

  return (
    <figure className="chart-card" style={frameStyle()}>
      <figcaption>
        <strong>{title}</strong>
      </figcaption>
      <svg id={id} viewBox={`0 0 ${width} ${height}`} role="img" aria-label={title}>
        <line x1="20" y1="190" x2="400" y2="190" stroke="rgba(20,40,29,0.18)" />
        {steps.map((step, index) => {
          const start = running;
          running += step.value;
          const y = 190 - (Math.max(start, running) / max) * 120;
          const h = (Math.abs(step.value) / max) * 120;
          return (
            <g key={step.label}>
              <rect
                x={40 + index * 64}
                y={y}
                width={barWidth}
                height={Math.max(10, h)}
                rx={10}
                fill={step.value >= 0 ? '#0e6b54' : '#cb5b2f'}
              />
              <text x={67 + index * 64} y={210} fontSize="11" textAnchor="middle" fill="#14281d">
                {step.label}
              </text>
            </g>
          );
        })}
      </svg>
    </figure>
  );
}

export function TornadoChart({
  id,
  title,
  items,
}: {
  id: string;
  title: string;
  items: Array<{ label: string; impact: number }>;
}) {
  const width = 420;
  const height = 70 + items.length * 34;
  const max = Math.max(...items.map((item) => item.impact), 1);

  return (
    <figure className="chart-card" style={frameStyle()}>
      <figcaption>
        <strong>{title}</strong>
      </figcaption>
      <svg id={id} viewBox={`0 0 ${width} ${height}`} role="img" aria-label={title}>
        <line x1="210" y1="20" x2="210" y2={height - 20} stroke="rgba(20,40,29,0.18)" />
        {items.map((item, index) => {
          const length = (item.impact / max) * 150;
          return (
            <g key={item.label}>
              <text x="12" y={42 + index * 34} fontSize="11" fill="#14281d">
                {item.label}
              </text>
              <rect x={210 - length} y={30 + index * 34} width={length} height="16" rx="8" fill="#cb5b2f" />
              <rect x={210} y={30 + index * 34} width={length * 0.6} height="16" rx="8" fill="#0e6b54" />
            </g>
          );
        })}
      </svg>
    </figure>
  );
}

export function LineChart({
  id,
  title,
  values,
}: {
  id: string;
  title: string;
  values: number[];
}) {
  const width = 420;
  const height = 220;
  const max = Math.max(...values, 1);
  const points = values
    .map((value, index) => {
      const x = 30 + (index / Math.max(1, values.length - 1)) * 360;
      const y = 180 - (value / max) * 120;
      return `${x},${y}`;
    })
    .join(' ');

  return (
    <figure className="chart-card" style={frameStyle()}>
      <figcaption>
        <strong>{title}</strong>
      </figcaption>
      <svg id={id} viewBox={`0 0 ${width} ${height}`} role="img" aria-label={title}>
        <line x1="20" y1="180" x2="400" y2="180" stroke="rgba(20,40,29,0.18)" />
        <polyline points={points} fill="none" stroke="#0e6b54" strokeWidth="3" />
        {values.map((value, index) => {
          const x = 30 + (index / Math.max(1, values.length - 1)) * 360;
          const y = 180 - (value / max) * 120;
          return <circle key={`${value}-${index}`} cx={x} cy={y} r="4" fill="#cb5b2f" />;
        })}
      </svg>
    </figure>
  );
}

export function TreeDiagram({
  id,
  title,
  nodes,
}: {
  id: string;
  title: string;
  nodes: Array<{ label: string; depth: number }>;
}) {
  const width = 420;
  const height = Math.max(180, nodes.length * 40 + 20);
  return (
    <figure className="chart-card" style={frameStyle()}>
      <figcaption>
        <strong>{title}</strong>
      </figcaption>
      <svg id={id} viewBox={`0 0 ${width} ${height}`} role="img" aria-label={title}>
        {nodes.map((node, index) => {
          const x = 20 + node.depth * 70;
          const y = 20 + index * 34;
          return (
            <g key={`${node.label}-${index}`}>
              {node.depth > 0 ? <line x1={x - 30} y1={y + 10} x2={x} y2={y + 10} stroke="rgba(20,40,29,0.18)" /> : null}
              <rect x={x} y={y} width="150" height="22" rx="11" fill="rgba(14,107,84,0.14)" stroke="rgba(20,40,29,0.16)" />
              <text x={x + 10} y={y + 14} fontSize="11" fill="#14281d">
                {node.label}
              </text>
            </g>
          );
        })}
      </svg>
    </figure>
  );
}

export function SwimlaneDiagram({
  id,
  title,
  lanes,
  steps,
}: {
  id: string;
  title: string;
  lanes: string[];
  steps: Array<{ title: string; lane: string }>;
}) {
  const width = 700;
  const height = lanes.length * 72 + 50;
  return (
    <figure className="chart-card" style={frameStyle()}>
      <figcaption>
        <strong>{title}</strong>
      </figcaption>
      <svg id={id} viewBox={`0 0 ${width} ${height}`} role="img" aria-label={title}>
        {lanes.map((lane, laneIndex) => (
          <g key={lane}>
            <rect x="0" y={laneIndex * 72 + 20} width={width} height="52" fill={laneIndex % 2 ? 'rgba(255,255,255,0.4)' : 'rgba(14,107,84,0.04)'} />
            <text x="10" y={laneIndex * 72 + 50} fontSize="12" fill="#14281d">
              {lane}
            </text>
          </g>
        ))}
        {steps.map((step, index) => {
          const laneIndex = lanes.findIndex((lane) => lane === step.lane);
          return (
            <g key={`${step.title}-${index}`}>
              <rect x={140 + index * 80} y={laneIndex * 72 + 28} width="64" height="34" rx="14" fill="#0e6b54" />
              <text x={172 + index * 80} y={laneIndex * 72 + 48} textAnchor="middle" fontSize="10" fill="white">
                {index + 1}
              </text>
            </g>
          );
        })}
      </svg>
    </figure>
  );
}

export function MatrixDiagram({
  id,
  title,
  rows,
  columns,
  data,
}: {
  id: string;
  title: string;
  rows: string[];
  columns: string[];
  data: Record<string, string>;
}) {
  const cell = 48;
  const width = columns.length * cell + 150;
  const height = rows.length * cell + 80;
  return (
    <figure className="chart-card" style={frameStyle()}>
      <figcaption>
        <strong>{title}</strong>
      </figcaption>
      <svg id={id} viewBox={`0 0 ${width} ${height}`} role="img" aria-label={title}>
        {columns.map((column, index) => (
          <text key={column} x={150 + index * cell + 18} y={20} fontSize="11">
            {column}
          </text>
        ))}
        {rows.map((row, rowIndex) => (
          <g key={row}>
            <text x="0" y={56 + rowIndex * cell} fontSize="11">
              {row}
            </text>
            {columns.map((column, columnIndex) => (
              <g key={column}>
                <rect
                  x={150 + columnIndex * cell}
                  y={32 + rowIndex * cell}
                  width="34"
                  height="34"
                  rx="12"
                  fill="rgba(14,107,84,0.1)"
                  stroke="rgba(20,40,29,0.14)"
                />
                <text x={167 + columnIndex * cell} y={53 + rowIndex * cell} fontSize="11" textAnchor="middle">
                  {data[`${row}:${column}`] ?? ''}
                </text>
              </g>
            ))}
          </g>
        ))}
      </svg>
    </figure>
  );
}

export function NetworkMap({
  id,
  title,
  center,
  nodes,
}: {
  id: string;
  title: string;
  center: string;
  nodes: string[];
}) {
  const size = 320;
  const cx = size / 2;
  const cy = size / 2;
  const radius = 96;

  return (
    <figure className="chart-card" style={frameStyle()}>
      <figcaption>
        <strong>{title}</strong>
      </figcaption>
      <svg id={id} viewBox={`0 0 ${size} ${size}`} role="img" aria-label={title}>
        <circle cx={cx} cy={cy} r="48" fill="#0e6b54" />
        <text x={cx} y={cy + 4} fill="white" textAnchor="middle" fontSize="12">
          {center}
        </text>
        {nodes.map((node, index) => {
          const angle = (Math.PI * 2 * index) / nodes.length - Math.PI / 2;
          const x = cx + Math.cos(angle) * radius;
          const y = cy + Math.sin(angle) * radius;
          return (
            <g key={node}>
              <line x1={cx} y1={cy} x2={x} y2={y} stroke="rgba(20,40,29,0.18)" />
              <circle cx={x} cy={y} r="30" fill="rgba(203,91,47,0.14)" stroke="#cb5b2f" />
              <text x={x} y={y + 4} textAnchor="middle" fontSize="11">
                {node}
              </text>
            </g>
          );
        })}
      </svg>
    </figure>
  );
}
