# Implementation Plan

## Scope

Build a static-first Digital Asset Studio on Astro + TypeScript that works under GitLab Pages base paths and includes:

- core reading routes for Learn, Markets, Networks, Controls, Sources, Releases, and Workspace;
- deterministic rules, source trust UX, and typed content collections;
- six deep simulations with exportable outputs;
- Strategy & Venture Workbench flows;
- Business Model Simulator with SVG visuals;
- local persistence with schema migrations;
- Playwright-first coverage and a passing `pnpm verify:ci`.

## Delivery Slices

1. Foundation and base-path-safe shell
2. Typed content, sources, generated graph, and browsing routes
3. Rules engine and deep simulations
4. Workspace persistence, imports/exports, and migrations
5. Strategy workbench and business model simulator
6. Playwright hardening, docs, release notes, and status truthfulness
