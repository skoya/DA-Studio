import { mkdir, writeFile } from 'node:fs/promises';
import { join } from 'node:path';
import {
  concepts,
  controls,
  glossaryTerms,
  journeys,
  jurisdictionPacks,
  networkProfiles,
  patterns,
  releaseNotes,
  simulations,
  sourceCards,
} from '../src/lib/catalog';

type Node = {
  id: string;
  type: string;
  label: string;
  href: string;
  summary: string;
};

type Edge = {
  from: string;
  to: string;
  relation: string;
};

const nodes: Node[] = [
  ...concepts.map((item) => ({ id: item.id, type: 'concept', label: item.title, href: `/learn/${item.id}/`, summary: item.summary })),
  ...controls.map((item) => ({ id: item.id, type: 'control', label: item.title, href: `/controls/${item.id}/`, summary: item.objective })),
  ...jurisdictionPacks.map((item) => ({ id: item.id, type: 'jurisdiction', label: item.label, href: `/markets/${item.id}/`, summary: item.summary })),
  ...networkProfiles.map((item) => ({ id: item.id, type: 'network', label: item.label, href: `/networks/${item.id}/`, summary: item.summary })),
  ...patterns.map((item) => ({ id: item.id, type: 'pattern', label: item.title, href: `/patterns/#${item.id}`, summary: item.summary })),
  ...simulations.map((item) => ({ id: item.id, type: 'simulation', label: item.title, href: `/simulate/${item.id}/`, summary: item.summary })),
  ...sourceCards.map((item) => ({ id: item.id, type: 'source', label: item.title, href: `/sources/#${item.id}`, summary: item.summary })),
  ...glossaryTerms.map((item) => ({ id: item.id, type: 'glossary', label: item.term, href: `/learn/#glossary-${item.id}`, summary: item.shortDefinition })),
  ...journeys.map((item) => ({ id: item.id, type: 'journey', label: item.title, href: '/start/', summary: item.summary })),
  ...releaseNotes.map((item) => ({ id: item.id, type: 'release', label: item.title, href: '/releases/', summary: item.summary })),
];

const edges: Edge[] = [];

for (const concept of concepts) {
  concept.relatedControls.forEach((id) => edges.push({ from: concept.id, to: id, relation: 'related-control' }));
  concept.relatedSimulations.forEach((id) => edges.push({ from: concept.id, to: id, relation: 'related-simulation' }));
  concept.relatedPatterns.forEach((id) => edges.push({ from: concept.id, to: id, relation: 'related-pattern' }));
  concept.relatedGlossary.forEach((id) => edges.push({ from: concept.id, to: id, relation: 'uses-term' }));
  concept.sourceIds.forEach((id) => edges.push({ from: concept.id, to: id, relation: 'source' }));
}

for (const jurisdiction of jurisdictionPacks) {
  jurisdiction.sourceIds.forEach((id) => edges.push({ from: jurisdiction.id, to: id, relation: 'source' }));
}

for (const simulation of simulations) {
  simulation.sourceIds.forEach((id) => edges.push({ from: simulation.id, to: id, relation: 'source' }));
  simulation.steps.forEach((step) =>
    step.controls.forEach((id) => edges.push({ from: simulation.id, to: id, relation: `step:${step.id}` })),
  );
}

const searchIndex = nodes.map((node) => ({
  ...node,
  keywords: [
    node.type,
    ...edges.filter((edge) => edge.from === node.id).map((edge) => edge.to),
  ],
}));

const outputDir = join(process.cwd(), 'src', 'data', 'generated');
await mkdir(outputDir, { recursive: true });
await writeFile(join(outputDir, 'content-graph.json'), JSON.stringify({ generatedAt: new Date().toISOString(), nodes, edges }, null, 2));
await writeFile(join(outputDir, 'search-index.json'), JSON.stringify(searchIndex, null, 2));

console.log(`generated graph with ${nodes.length} nodes and ${edges.length} edges`);
