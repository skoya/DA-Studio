import { defineCollection } from 'astro:content';
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
} from './lib/catalog';
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
} from './lib/schema';

export const collections = {
  concepts: defineCollection({
    loader: async () => concepts,
    schema: conceptSchema,
  }),
  glossary: defineCollection({
    loader: async () => glossaryTerms,
    schema: glossarySchema,
  }),
  journeys: defineCollection({
    loader: async () => journeys,
    schema: journeySchema,
  }),
  jurisdictions: defineCollection({
    loader: async () => jurisdictionPacks,
    schema: jurisdictionSchema,
  }),
  networks: defineCollection({
    loader: async () => networkProfiles,
    schema: networkSchema,
  }),
  patterns: defineCollection({
    loader: async () => patterns,
    schema: patternSchema,
  }),
  controls: defineCollection({
    loader: async () => controls,
    schema: controlSchema,
  }),
  simulations: defineCollection({
    loader: async () => simulations,
    schema: simulationSchema,
  }),
  sources: defineCollection({
    loader: async () => sourceCards,
    schema: sourceSchema,
  }),
  'release-notes': defineCollection({
    loader: async () => releaseNotes,
    schema: releaseNoteSchema,
  }),
  migrations: defineCollection({
    loader: async () => contentPackVersions,
    schema: contentPackVersionSchema,
  }),
};
