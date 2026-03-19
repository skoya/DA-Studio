# AGENTS.md — Digital Asset Studio delivery contract

This file governs all future work on the Digital Asset Studio repo.

## 1. Mission

Build and maintain a high-grade, static-first internal Digital Asset Studio for financial-services users. The application must help users learn, simulate, compare, govern, and prototype digital-asset ideas across jurisdictions, client segments, product types, and operating models.

The product is not a toy demo. It must be clear, trustworthy, fast, accessible, and maintainable.

## 2. Non-negotiables

1. **Static-first**  
   The app must deploy cleanly to GitLab Pages with no mandatory backend.

2. **GitLab Pages-safe**  
   The app must work under both root-path previews and project-path deployments.

3. **Typed content model**  
   Content must live in typed collections and/or typed data structures.

4. **Deterministic governance first**  
   Rules, warnings, control overlays, and jurisdiction logic must not depend on AI.

5. **AI is optional**  
   The app must remain useful with AI disabled.

6. **Source-backed trust**  
   Regulatory and market statements must link to maintained source cards.

7. **Playwright is mandatory**  
   Every material user-facing feature must be covered by Playwright.

8. **Accessibility is a release criterion**  
   Do not postpone accessibility as “later polish”.

9. **Upgradeability matters**  
   Preserve compatibility of content packs and saved workspace data.

10. **No fake completeness**  
    Do not mark the build done unless the app, tests, and status files support that claim.

## 3. Product areas that must remain coherent

The repo should feel like one product, not disconnected tools. Preserve consistency across:

- Learn
- Markets
- Networks & Vendors
- Controls
- Simulations
- Strategy & Venture Workbench
- Business Model Simulator
- Workspace
- Sources & Releases

## 4. Architecture guardrails

### 4.1 Allowed core shape
- Astro
- TypeScript
- static output
- MDX / JSON / YAML / TS content definitions
- Pagefind for search
- client-side rules/simulation engines
- local workspace persistence

### 4.2 Avoid by default
- required server runtime
- mandatory database
- server-only auth dependency for core reading features
- runtime web crawling
- opaque AI-only reasoning replacing deterministic logic
- oversized frontend bundles

### 4.3 State and persistence
- Prefer local state for MVP.
- Every persisted object must include `schemaVersion`.
- Provide migrations for persisted workspace bundles.

## 5. Reflective implementation loop

For every substantial task, follow this loop:

1. Inspect the relevant files, routes, schemas, tests, and user flows.
2. Write a brief implementation plan before major edits.
3. Implement the smallest complete vertical slice.
4. Run the fastest relevant checks first.
5. Critique the result:
   - UX clarity
   - correctness
   - accessibility
   - performance
   - maintainability
   - consistency with the plan
6. Improve the slice before moving on.
7. Update tests, docs, and `BUILD_STATUS.json`.

Do not stop at scaffolding if the requirement clearly calls for working behavior.

## 6. Quality bar

### 6.1 Product quality
- Clear IA and navigation
- Consistent design language
- Good empty states
- Good error states
- Useful defaults
- Sensible exports
- Strong comparison tools

### 6.2 Code quality
- Strong typing
- Small, composable components
- Prefer pure functions for rules and scoring
- Good naming
- No dead code
- No large unreviewed refactors without benefit
- Keep dependencies intentional

### 6.3 Content quality
- No unexplained acronyms on first use
- Distinguish facts, assumptions, and illustrative examples
- Distinguish regulation from market practice
- Distinguish “existing pattern” from “novel idea”

## 7. Playwright contract

### 7.1 Mandatory rule
If you change behavior, you change Playwright coverage in the same branch.

### 7.2 Required suites
Maintain and extend tests for:
- route smoke
- learn flows
- markets/governance
- simulations
- strategy workbench
- business model simulator
- workspace import/export
- search
- accessibility
- visual regression
- base-path deployments

### 7.3 Testing philosophy
- Prefer robust locators by role, label, text, and test id where justified.
- Avoid brittle selectors.
- Use stable screenshot targets.
- Keep tests readable and grouped by user journey.

### 7.4 Failure artifacts
Keep traces, screenshots, and HTML reports in CI for failures.

## 8. Accessibility contract

Every important interaction must be keyboard-usable.
Charts and analysis outputs need text summaries or labels.
No critical information may exist only in color or hover state.
Automated accessibility checks are required, but manual judgment still matters.

## 9. Design and visualization contract

### 9.1 SVG-first rule
Use accessible SVG for core charts and diagrams where practical.

### 9.2 Visual families to support
- matrices
- trees
- timelines
- swimlanes
- radar charts
- waterfall charts
- sensitivity charts
- network/dependency maps

### 9.3 Export rule
If the user sees it, they should be able to export the current data and interpretation.

## 10. Simulation depth contract

A deep simulation is not just a slideshow. It must model enough of the real operating shape to be useful.

Each major simulation should include:
- actors
- preconditions
- triggers
- happy path
- failure/exception branches
- operational artifacts
- control hooks
- source links
- output summary
- saved state support

Where relevant, include:
- reconciliation
- incident response
- liquidity/funding implications
- corporate actions
- reporting
- approvals
- failover

## 11. Strategy & Venture Workbench contract

The workbench is mandatory. Maintain:
- PESTEL
- Porter’s Five Forces
- Feasibility / Viability / Desirability
- RACI
- PBS
- WBS
- decision pack export

These are not decorative templates. They must be editable, stateful, exportable, and reasonably visual.

## 12. Business Model Simulator contract

Maintain:
- adjustable assumptions
- scenario comparison
- cost and revenue decomposition
- risk/control burden inputs
- sensitivity outputs
- exportable summaries and visuals

Never present simulated economics as if they were validated business forecasts.

## 13. Source and freshness contract

### 13.1 Source hierarchy
Prefer:
1. laws, regulations, official regulator guidance
2. official institution/vendor documentation
3. standards bodies
4. carefully labeled secondary interpretation

### 13.2 Every regulated or market-sensitive content node needs
- source links
- last reviewed date
- confidence label
- stale policy

### 13.3 When sources change
Update:
- affected content
- affected rules
- affected simulations
- release notes
- stale markers

## 14. Upgradeability contract

Preserve forward motion without breaking saved work.

Required:
- content pack versioning
- workspace schema migrations
- backward-aware imports
- release notes for breaking changes
- feature flags for preview capabilities

## 15. BUILD_STATUS.json contract

Maintain `BUILD_STATUS.json` truthfully.

Set `ready: true` only when:
- the app is meaningfully implemented,
- `pnpm verify:ci` passes,
- major areas in the plan are actually present,
- and no major known blockers remain hidden.

## 16. Required repo scripts

The repo should expose and maintain scripts equivalent to:
- `dev`
- `build`
- `preview`
- `typecheck`
- `lint`
- `test`
- `e2e`
- `e2e:ci`
- `verify:fast`
- `verify:ci`
- `content:validate`
- `content:graph`
- `sources:check`

## 17. PR / merge expectations

Before considering a task complete:
- run relevant tests locally;
- update Playwright for changed behavior;
- update docs if the feature changes usage;
- update release notes for user-visible changes;
- update `BUILD_STATUS.json`.

## 18. Things to reject

Reject or remove:
- hard-coded legal conclusions without sources
- routes that only look complete but do not work
- inaccessible custom controls
- giant generic chat interfaces replacing structured UX
- server dependencies added without explicit approval
- shipping new features without tests
- declaring completion based on scaffolding

## 19. Final standard

The right question is not “does it run?”  
The right question is “would a serious internal financial-services user trust and reuse it?”

Build to that bar.
