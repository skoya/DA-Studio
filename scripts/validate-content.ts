import {
  concepts,
  contentPackVersions,
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
import {
  conceptSchema,
  contentPackVersionSchema,
  controlSchema,
  glossarySchema,
  journeySchema,
  jurisdictionSchema,
  networkSchema,
  patternSchema,
  releaseNoteSchema,
  simulationSchema,
  sourceSchema,
} from '../src/lib/schema';

const validators = [
  ['sources', sourceCards, sourceSchema],
  ['glossary', glossaryTerms, glossarySchema],
  ['concepts', concepts, conceptSchema],
  ['journeys', journeys, journeySchema],
  ['jurisdictions', jurisdictionPacks, jurisdictionSchema],
  ['networks', networkProfiles, networkSchema],
  ['patterns', patterns, patternSchema],
  ['controls', controls, controlSchema],
  ['simulations', simulations, simulationSchema],
  ['release-notes', releaseNotes, releaseNoteSchema],
  ['migrations', contentPackVersions, contentPackVersionSchema],
] as const;

const sourceIdSet = new Set(sourceCards.map((item) => item.id));
const controlIdSet = new Set(controls.map((item) => item.id));
const simulationIdSet = new Set(simulations.map((item) => item.id));
const patternIdSet = new Set(patterns.map((item) => item.id));
const glossaryIdSet = new Set(glossaryTerms.map((item) => item.id));

for (const [name, collection, schema] of validators) {
  for (const entry of collection) {
    schema.parse(entry);
  }
  console.log(`validated ${name}: ${collection.length}`);
}

for (const entry of concepts) {
  entry.sourceIds.forEach((id) => {
    if (!sourceIdSet.has(id)) throw new Error(`Concept ${entry.id} references missing source ${id}`);
  });
  entry.relatedControls.forEach((id) => {
    if (!controlIdSet.has(id)) throw new Error(`Concept ${entry.id} references missing control ${id}`);
  });
  entry.relatedSimulations.forEach((id) => {
    if (!simulationIdSet.has(id)) throw new Error(`Concept ${entry.id} references missing simulation ${id}`);
  });
  entry.relatedPatterns.forEach((id) => {
    if (!patternIdSet.has(id)) throw new Error(`Concept ${entry.id} references missing pattern ${id}`);
  });
  entry.relatedGlossary.forEach((id) => {
    if (!glossaryIdSet.has(id)) throw new Error(`Concept ${entry.id} references missing glossary term ${id}`);
  });
}

for (const control of controls) {
  control.sourceIds.forEach((id) => {
    if (!sourceIdSet.has(id)) throw new Error(`Control ${control.id} references missing source ${id}`);
  });
}

for (const simulation of simulations) {
  simulation.sourceIds.forEach((id) => {
    if (!sourceIdSet.has(id)) throw new Error(`Simulation ${simulation.id} references missing source ${id}`);
  });
  simulation.steps.forEach((step) => {
    step.controls.forEach((id) => {
      if (!controlIdSet.has(id)) throw new Error(`Simulation ${simulation.id} step ${step.id} references missing control ${id}`);
    });
  });
}

console.log('content validation passed');
