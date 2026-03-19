
# Plan.md — Digital Asset Studio (UBS-oriented, static-first, GitLab Pages)

> This v2.0 edition reviews the prior plan, identifies gaps, and adds mandatory requirements for product-exploration frameworks, business-model simulation, upgradeability, AGENTS governance, and Playwright-first quality gates. In any conflict between earlier sections and the v2.0 addendum below, the v2.0 addendum wins.

**Status:** Reviewed and extended v2.0  
**Date:** 2026-03-18  
**Primary audience:** Codex, product owner, engineering, design, compliance, legal, architecture  
**Build target:** Fully static site deployable to GitLab Pages and buildable on a Mac mini without Azure or other always-on cloud infrastructure

## 0. Intent and guardrails

This plan is for an internal **Digital Asset Studio**: a website that helps professionals in traditional financial services learn, compare, simulate, and prototype digital-asset ideas across multiple client segments, jurisdictions, and operating models.

The site is **not** a trading platform, custody system, or source of legal/tax/investment advice. It is a research-backed education, simulation, design, and governance environment.

Key constraints:

1. The site must work **fully as a static site** on GitLab Pages.
2. It must support **very different users**: beginners, relationship managers, product teams, operations, legal, compliance, risk, engineering, cyber, and executives.
3. It must cover **multiple markets** and make it obvious when a concept is:
   - already established in the market,
   - an adjacent variation of an existing pattern, or
   - genuinely novel and therefore requires deeper review.
4. It must include **deep simulations**, not just simplified explainers.
5. It must be **easy to extend quickly** from a Mac mini build workflow and a GitLab repository.
6. It must be **control-first**: every scenario should expose risk, controls, and unresolved questions, not only the “happy path”.

## 1. Executive summary

Build a static-first site with four major modes:

- **Learn** — explain concepts at plain-English, practitioner, and expert levels.
- **Simulate** — step through end-to-end operational, technical, and control flows.
- **Design Studio** — turn a rough idea into a concept note, comparable patterns, architecture options, and control questions.
- **Govern** — overlay jurisdiction, client segment, regulatory posture, custody model, standards, and approval gates.

The correct architecture for the first serious version is:

- **Astro + TypeScript + MDX/JSON content collections** for a fully static site.
- **Pagefind** for fully static full-text search.
- **Client-side rules engine** for persona/jurisdiction/client-segment overlays.
- **Client-side simulation engine** driven by JSON/YAML/TS content definitions.
- **Local browser persistence** (IndexedDB/localStorage) for saved workspaces, notes, and concept drafts.
- **Optional AI adapters**, never mandatory for core functionality:
  - in-browser models using WebLLM or Transformers.js for lightweight assistance,
  - optional user-configured local/approved endpoint such as Ollama or an OpenAI-compatible API later,
  - no hard dependency on a server-side AI stack for MVP.

The site should be content-heavy but not CMS-heavy. The source of truth should be the repository, not a database. Non-engineers should be able to edit content via Markdown/JSON and GitLab merge requests.

The single biggest design principle is:

> **Everything should be understandable from multiple lenses at once: client, product, operations, legal/compliance, risk, and technology.**

That means every major page and simulation should support:
- a **persona/lens switcher**,
- a **depth switcher** (plain/practitioner/expert),
- a **jurisdiction selector**,
- a **client segment selector**,
- a **network/rail selector**,
- and a **source/authority panel**.

## 2. Research-informed conclusions that shape the architecture

The following conclusions come directly from the market and regulatory landscape:

1. **Digital assets in financial services are not one thing.** The site must cover native cryptoassets, tokenized traditional assets, stablecoins/e-money tokens, tokenized deposits, tokenized funds, tokenized bonds, structured products, repo/collateral, and digital securities on regulated venues.
2. **The market is hybrid.** It includes public chains, permissioned chains, regulated FMIs, bank-operated rails, tokenization stacks, messaging bridges, and traditional off-chain processes.
3. **Regulation is fragmented and fast-moving.** The site cannot pretend to offer one global answer. It needs a jurisdiction-pack model and clear confidence labeling.
4. **Custody and controls are central.** For institutional use, the deepest questions are not “what is a token?” but “who controls keys, what is the bankruptcy treatment, how do we reconcile records, what happens on compromise, what is the settlement asset, and what legal wrapper applies?”
5. **A static site can still be powerful** if the design is build-time content + client-side logic + optional local AI.
6. **AI must be optional and constrained.** The core educational, rules, and simulation layers must remain deterministic and auditable even when AI is disabled.

## 3. Product goals

### 3.1 Primary goals

The site should let a Redbank employee or similar financial-services professional:

- understand a digital asset concept at the right level for their role,
- compare possible product/operating-model patterns,
- simulate end-to-end workflows,
- identify risk/control requirements and likely approval gates,
- see how the answer changes by market and client segment,
- ask questions and get source-backed explanations,
- draft a concept note or prototype brief,
- identify whether similar patterns or vendors already exist,
- and recognize when something is novel enough to need exploratory work rather than pattern matching.

### 3.2 Non-goals for MVP

Do **not** build the following into the first serious version:

- live order routing or real trading,
- real wallet/key handling,
- storage of confidential client data on a backend,
- production custody workflows,
- workflow approval systems requiring audit-grade server-side storage,
- real-time market data ingestion,
- automated legal advice,
- automatic publication of external regulatory updates without human review.

### 3.3 Design principles

- **Static-first**
- **Source-backed**
- **Persona-aware**
- **Progressive disclosure**
- **Control-first**
- **Vendor-neutral**
- **No backend dependency for MVP**
- **No silent AI**
- **Local-first workspace**
- **Easy contribution model**


## 4. Recommended scope model

The user asked for coverage of all personas, jurisdictions, and types. The right way to do that without collapsing under scope is to use a **deep-core + scalable-pack** model.

### 4.1 Coverage model

#### Tier 1: Deep initial jurisdiction packs
These should receive the deepest research and simulation overlays first:

- Switzerland
- European Union
- United Kingdom
- Singapore
- Hong Kong

#### Tier 2: Strong summary packs with explicit legal-review warnings
These should be included early, but with more conservative gating and less automation:

- United States
- UAE / ADGM
- Japan

#### Global control/standards pack
This is always active and cross-cuts every market:

- Basel crypto prudential treatment
- NIST CSF 2.0
- FATF / Travel Rule
- FIPS 140-3
- cryptocurrency security standards such as CCSS
- ISO 20022 / ISO 24165 context

### 4.2 Why this model is correct

It reflects the actual market discussed in the research:
- Switzerland matters because of FINMA, Swiss DLT market structure, and SDX.
- The EU matters because of MiCA, DORA, the DLT Pilot, and ESMA technical outputs.
- The UK matters because of the Digital Securities Sandbox and its future crypto regime.
- Singapore and Hong Kong matter because of Project Guardian, tokenized funds, stablecoin regulation, and active policymaking.
- The US matters because it is commercially unavoidable, but the posture is changing quickly and should be treated with extra caution in a static educational tool.
- ADGM and Japan matter because they are important cross-border reference markets and help the site remain globally credible.

### 4.3 Product/type coverage model

#### Core asset and product families
- Native cryptoassets
- Stablecoins / e-money tokens / fiat-referenced tokens
- Tokenized deposits / bank money representations
- Tokenized money market funds and tokenized fund units
- Tokenized bonds / notes
- Tokenized structured products
- Tokenized equities / private shares
- Repo / collateral / liquidity-management uses
- Digital securities traded or settled on DLT venues/FMI-like environments

#### Optional advanced family (phase 2+)
- Staking
- DeFi connectivity and DeFi-style yield strategies
- Derivatives and perpetuals
- Private-credit tokenization
- Insurance-linked or alternative assets
- Programmable escrow / conditional settlement patterns

### 4.4 User-depth model

Every content object and simulation must support three depth levels:

- **Plain English** — useful to beginners and client-facing staff
- **Practitioner** — useful to product, operations, and business management
- **Expert** — useful to legal, compliance, risk, architecture, engineering, cyber

This is more important than role-specific jargon. Depth and lens are the two most important filters in the product.


## 5. Personas and jobs to be done

The site should not try to build a bespoke application for each individual title. Instead, it should support a set of reusable **lenses** and then map roles to those lenses.

### 5.1 Lenses

- **Learning lens**
- **Client/advisory lens**
- **Product/design lens**
- **Operations/custody lens**
- **Risk/compliance/legal lens**
- **Technology/cyber lens**
- **Executive/strategy lens**

### 5.2 Role map

| Role | Primary questions | Default lens | Default depth | Most important outputs |
|---|---|---:|---:|---|
| Newcomer / graduate / general employee | What is this? Why does it matter? | Learning | Plain | Explainers, glossary, guided journeys |
| Relationship manager / advisor | How do I explain this to a client? Is it suitable? | Client | Plain/Practitioner | Client-ready explanation, suitability, risks |
| UHNW / family office advisor | How does custody, governance, liquidity, and succession work? | Client | Practitioner | Wealth planning view, custody/governance, reporting |
| Wealth planner / trust specialist | What are the estate, trust, governance, incapacity, and beneficiary issues? | Client / Risk | Practitioner/Expert | Planning checklist, control flags, legal/tax unknowns |
| Product manager / structurer | What product pattern fits this idea? | Product | Practitioner | Pattern map, concept memo, control matrix |
| Institutional sales / coverage | What market pattern exists and for whom? | Product / Client | Practitioner | Comparable products, venue/network options |
| Origination banker / issuer coverage | How do I issue and distribute a tokenized bond or note? | Product | Practitioner/Expert | Issuance workflow, docs, controls |
| Treasury / liquidity management | What settlement asset and rail should we use? | Product / Ops | Practitioner/Expert | Latency, settlement, liquidity, failover |
| Operations / settlements / middle office | What is the lifecycle, reconciliation, and exception handling? | Operations | Practitioner/Expert | Swimlanes, event logs, exception paths |
| Custody / asset servicing | What is the safekeeping and corporate-action model? | Operations / Risk | Expert | Key management, segregation, servicing flows |
| Compliance / AML / sanctions | What controls must exist and where do they trigger? | Risk | Expert | Control library, gating rules, escalation paths |
| Legal / regulatory counsel | What classification and perimeter issues arise? | Risk | Expert | Jurisdiction pack, sources, unresolved legal questions |
| Risk / operational risk / NFR | What failure modes exist? | Risk | Expert | Heatmaps, control maturity, incident playbooks |
| Finance / accounting / tax | How do valuation, ledger treatment, and reporting work? | Risk / Ops | Expert | Records, valuation sources, accounting questions |
| Engineering / architecture | How would we implement this safely? | Technology | Expert | Technical flows, state model, interface contracts |
| Cyber / security / SRE | What is the cryptographic/security posture? | Technology / Risk | Expert | Key-control map, resilience, recovery |
| Executive sponsor / strategy | What are the credible opportunities and constraints? | Executive | Plain/Practitioner | Market map, decision summary, maturity score |

### 5.3 Cross-cutting user needs

Every persona needs some combination of:
- a clear answer,
- a comparable pattern,
- a control view,
- a jurisdiction view,
- and a next-step output.

### 5.4 Guided journeys

Create curated journeys on top of the raw content:

1. **Digital assets for wealth management**
2. **How tokenized funds work**
3. **How tokenized bonds are issued and serviced**
4. **Custody, safekeeping, and key governance**
5. **How to compare public chains, permissioned rails, and regulated venues**
6. **How to assess a new digital-asset product idea**
7. **How family-office and wealth-planning questions differ from institutional questions**
8. **How controls differ by jurisdiction**


## 6. Client segments and segmentation logic

The site should not hard-code simplistic “retail vs institutional” behavior. Use a richer client-segment model.

### 6.1 Client segments

- Retail
- Affluent / mass affluent
- HNW
- UHNW
- Family office
- External asset manager / adviser
- Asset manager / fund manager
- Hedge fund / active trading institution
- Pension / insurer / sovereign / official institution
- Corporate treasury
- Issuer / originator
- Intermediary / distributor / venue participant

### 6.2 Segment dimensions that matter operationally

Each client profile should include:

- legal form (natural person, company, fund, trust, foundation, etc.),
- residence / domicile,
- professional vs retail classification,
- sophistication / knowledge,
- suitability or appropriateness requirements,
- liquidity needs,
- leverage tolerance,
- desired custody model,
- reporting needs,
- size / ticket size,
- operating hours / latency sensitivity,
- product distribution restrictions,
- transferability restrictions,
- tax and planning sensitivity,
- succession/governance complexity.

### 6.3 Why this matters in the UI

The same product idea changes meaningfully when the target client changes.

Examples:
- Retail distribution may trigger stronger disclosure and suitability gating.
- UHNW and family-office cases often need governance, beneficiary, succession, and recovery logic.
- Institutional and treasury cases care more about latency, liquidity, atomic settlement, collateral, accounting treatment, and operational resilience.
- Wealth-planning users need to see trust, incapacity, death, and evidencing implications, not just portfolio exposure.

### 6.4 Client profile object

Create a reusable `clientProfile` object with fields such as:

```ts
type ClientProfile = {
  segment: 'retail' | 'affluent' | 'hnw' | 'uhnw' | 'family-office' | 'institutional' | 'corporate-treasury' | 'issuer';
  classification: 'retail' | 'professional' | 'eligible-counterparty' | 'accredited' | 'qualified-investor' | 'other';
  residenceJurisdiction: string;
  entityType: 'individual' | 'company' | 'fund' | 'trust' | 'foundation' | 'other';
  investmentObjective: string[];
  liquidityNeed: 'low' | 'medium' | 'high';
  latencyNeed: 'low' | 'medium' | 'high';
  custodyPreference: 'self' | 'bank-custody' | 'third-party-custody' | 'hybrid';
  suitabilityRequired: boolean;
  transferRestrictionsSensitivity: 'low' | 'medium' | 'high';
  planningComplexity: 'low' | 'medium' | 'high';
};
```

This object should be reusable in simulations, design studio, and comparison pages.


## 7. Jurisdiction-pack strategy

The correct implementation is not “one giant legal page”. It is a structured **jurisdiction pack** system with metadata, gating rules, learning summaries, and simulation overlays.

### 7.1 Pack structure

Each jurisdiction pack should include:

- market summary,
- authorities,
- key regulatory instruments,
- activity map (issuance, trading, custody, payments, distribution, fund tokens, stablecoins, etc.),
- client-distribution considerations,
- entity/licensing considerations,
- control hotspots,
- what the site can say with high confidence,
- what the site should label as “legal review required”,
- scenario overlays,
- source cards,
- last-reviewed date,
- change log.

### 7.2 Confidence labels

Use the following confidence labels on every regulatory statement:

- **High** — final rule/guidance from an official authority
- **Medium** — official proposal, consultation, or active sandbox/supervisory statement
- **Low** — market interpretation, industry body summary, or unresolved area

### 7.3 Change-status labels

- final / in force
- transitional
- draft / proposed
- sandbox / pilot
- under consultation
- supervisory speech / statement
- market practice only

### 7.4 Tier 1 jurisdiction summaries

#### Switzerland
Key reasons to include deeply:
- strong DLT legal/infrastructure relevance,
- FINMA custody guidance,
- SDX relevance,
- Swiss collective-asset and custody questions matter for institutional workflows.

Teach especially:
- custody and delegated custody,
- segregation and bankruptcy protection questions,
- custody of collective assets,
- DLT trading facility context,
- tokenized issuance and settlement patterns.

Simulation overlays:
- delegated custody to foreign sub-custodian,
- Swiss collective-asset custody branch,
- DLT venue vs bilateral issuance branch.

Research basis:
- FINMA Guidance 01/2026 on custody,
- Swiss federal/sif DLT overview,
- FINMA/BX Digital licensing materials.

#### European Union
Key reasons to include deeply:
- MiCA,
- DORA,
- ESMA machine-readable requirements,
- DLT Pilot,
- tokenized-fund and issuance disclosure mechanics.

Teach especially:
- cryptoasset categories and white-paper/disclosure concepts,
- service-provider questions,
- DORA operational resilience,
- ESMA register usage,
- order-book/record-keeping expectations,
- DLT Pilot boundaries.

Simulation overlays:
- CASP/CASP-like roles,
- white-paper artifact branch,
- order record JSON artifact,
- DORA incident/resilience controls.

Research basis:
- ESMA MiCA materials and interim register,
- ESMA machine-readable technical outputs,
- ESMA DLT Pilot materials,
- DORA sources.

#### United Kingdom
Key reasons to include deeply:
- Digital Securities Sandbox,
- future crypto regime timing,
- wealth and market-infrastructure relevance.

Teach especially:
- difference between digital securities and unbacked crypto,
- DSS scope and limitations,
- likely future-regime transition,
- sandbox vs production-regime thinking.

Simulation overlays:
- digital security allowed in DSS branch,
- unbacked crypto “not in DSS scope” block,
- future regime legal-review badge.

Research basis:
- Bank of England / FCA DSS pages,
- FCA future-crypto-regime page,
- FCA Project Guardian materials.

#### Singapore
Key reasons to include deeply:
- Project Guardian,
- tokenized fund commercialization patterns,
- stablecoin regime,
- active institutional experimentation and framework building.

Teach especially:
- tokenized-fund lifecycle patterns,
- compliance wrappers,
- settlement asset choices,
- stablecoin perimeter,
- digital-token service provider obligations.

Simulation overlays:
- Guardian Funds Framework branch,
- tokenized fund with tokenized cash/FX branch,
- Singapore stablecoin guardrails.

Research basis:
- MAS Project Guardian materials,
- MAS stablecoin framework,
- MAS DTSP notices/guidelines.

#### Hong Kong
Key reasons to include deeply:
- VA roadmap,
- stablecoin issuer regime,
- tokenization clarity,
- VATP developments.

Teach especially:
- roadmap pillars,
- exchange/platform limitations,
- stablecoin licensing perimeter,
- expansion of product types and client-type considerations.

Simulation overlays:
- fiat-referenced stablecoin branch,
- VATP/permitted-product branch,
- dealer/custodian legal-review branch.

Research basis:
- SFC ASPIRe roadmap,
- HKMA stablecoin issuer materials,
- SFC platform/product circulars and framework notes.

### 7.5 Tier 2 summaries

#### United States
Important but currently more fluid and fragmented. Present as:
- large commercial relevance,
- evolving securities/regulatory framing,
- banking-agency guidance changing,
- mandatory legal review for launches.

#### UAE / ADGM
Present as:
- important regional digital-asset hub,
- updated virtual-asset guidance,
- fiat-referenced token framework,
- useful comparator for cross-border institutional structuring.

#### Japan
Present as:
- important APAC reference market,
- payment-services / stablecoin / travel-rule relevance,
- evolving framework requiring specialist review.

### 7.6 Global standards pack

Always attach these control lenses:
- prudential treatment,
- cyber governance and supply chain,
- crypto-specific custody security,
- token identification and messaging standards,
- travel-rule obligations,
- cryptographic module posture.

### 7.7 Jurisdiction-pack schema

```ts
type JurisdictionPack = {
  id: string;
  label: string;
  status: 'tier1' | 'tier2' | 'global';
  lastReviewed: string;
  authorities: { name: string; url?: string }[];
  summary: string;
  marketRelevance: string[];
  coreTopics: string[];
  keyRules: RuleRef[];
  controlHotspots: string[];
  simulationOverlays: string[];
  defaultWarnings: string[];
  sourceIds: string[];
};
```


## 8. Product, asset, and activity taxonomy

Do not let “crypto” become a single taxonomy bucket. The content model should separate:

1. **Underlying economic exposure**
2. **Legal wrapper**
3. **Token form**
4. **Settlement asset**
5. **Venue / network / rail**
6. **Custody model**
7. **Target client segment**
8. **Activity type**

### 8.1 Underlying exposure examples

- Native cryptoasset
- Fiat currency exposure
- Government bond
- Corporate bond
- Fund / money market fund
- Equity / private equity
- Commodity
- Structured payoff
- Cash or deposit claim
- Collateral claim
- Derivative exposure

### 8.2 Token form examples

- native coin
- utility/governance token
- stablecoin / EMT / FRT / payment stablecoin
- tokenized deposit / commercial-bank-money representation
- tokenized fund unit
- tokenized bond/note
- tokenized security or structured note
- receipt / warehouse / entitlement token
- access token / identity token

### 8.3 Activity types

- educate / explore
- advise / distribute
- issue
- subscribe / redeem
- trade
- settle
- hold / custody
- transfer
- collateralize
- pledge / repo
- pay / remit
- service corporate actions
- reconcile / account / report
- incident respond
- exit / wind-down

### 8.4 Activity-perimeter insight

A lot of product confusion comes from mixing these levels together. The site should explicitly show “same exposure, different legal wrapper” and “same token form, different regulatory perimeter” comparisons.

Examples:
- a stablecoin is not the same thing as a tokenized deposit,
- a tokenized fund is not the same thing as a tokenized bond,
- a digital security on a regulated DLT venue is not the same thing as a freely circulating cryptoasset,
- a wealthy client asking for “crypto exposure” may mean direct exposure, fund exposure, ETP exposure, structured-product exposure, or custody support.

### 8.5 Taxonomy object

```ts
type AssetTaxonomy = {
  underlyingExposure: string;
  tokenForm: string;
  legalWrapper?: string;
  settlementAssetType?: string;
  venueType?: string;
  custodyModel?: string;
  activityTypes: string[];
  typicalClientSegments: string[];
  typicalJurisdictions: string[];
};
```


## 9. Networks, rails, venues, and vendor-registry model

The site should not treat “blockchain network” as the only infrastructure layer. The market includes:

- public blockchains,
- permissioned chain deployments,
- bank-run settlement rails,
- regulated DLT venues and FMIs,
- tokenization platforms,
- messaging/compliance middleware,
- custody providers,
- transfer-agent and asset-servicing layers,
- price/oracle/NAV layers,
- distribution and interoperability stacks.

### 9.1 Named market references to cover

At minimum, create pages or profiles for:

- public-chain pattern (generic)
- permissioned-chain pattern (generic)
- **SDX** as a regulated DLT market-infrastructure reference point
- **Kinexys** (formerly Onyx) as a bank-run digital-payments / settlement reference point
- **SG-FORGE / CoinVertible** as a regulated stablecoin/e-money-token reference pattern
- **UBS Tokenize** as a bank tokenization initiative reference point
- **Chainlink DTA** as a tokenized-fund workflow reference pattern
- **DigiFT** as a tokenized-fund / venue pattern in the reference set

Do not present these as endorsements. Present them as market exemplars with clearly labeled source-backed summaries.

### 9.2 Comparison dimensions

Every network/rail/vendor page should compare along these dimensions:

- asset types supported
- participant model
- public vs permissioned
- identity and whitelisting
- privacy / confidentiality model
- settlement model
- DvP / PvP capabilities
- operating hours
- finality profile
- corporate-action support
- integration model
- interoperability
- custody assumptions
- control hooks
- standards alignment
- concentration/lock-in risk
- exit portability

### 9.3 Vendor-neutrality rule

No page should say “best” without context. Instead say:
- best for ___ constraints,
- more appropriate when ___,
- weaker when ___,
- requires these controls,
- comparable alternatives include ___.

### 9.4 Network profile schema

```ts
type NetworkProfile = {
  id: string;
  label: string;
  category: 'public-chain' | 'permissioned-chain' | 'fmi' | 'bank-rail' | 'tokenization-stack' | 'middleware' | 'custody' | 'other';
  summary: string;
  assetSupport: string[];
  participantModel: string;
  settlementModel: string;
  identityModel: string;
  privacyModel: string;
  interoperabilityNotes: string[];
  controlConsiderations: string[];
  latencyProfile?: 'low' | 'medium' | 'high';
  sourceIds: string[];
  lastReviewed: string;
};
```

### 9.5 Performance and high-frequency lens

The user explicitly asked for cases involving large-value safekeeping and high-frequency demands. Therefore every relevant network/rail page must include:

- likely operating-window assumptions,
- pre-funding vs post-trade funding implications,
- batch vs atomic settlement implications,
- reconciliation burden,
- order-book and record-keeping considerations,
- throughput/finality discussion,
- failover considerations,
- key-management implications under high operational intensity.

Do **not** pretend this site can determine production-grade performance numbers across venues. Instead provide:
- architecture patterns,
- design tradeoffs,
- operational questions,
- control implications,
- and a checklist for proof-of-concept performance testing.


## 10. Information architecture and site map

### 10.1 Top-level navigation

- Home
- Start here
- Learn
- Simulate
- Design Studio
- Govern
- Markets
- Networks & Vendors
- Patterns
- Controls
- Glossary
- Workspace
- Sources & Releases

### 10.2 Recommended route structure

```text
/
 /start
 /learn/
 /learn/[topic]/
 /simulate/
 /simulate/[scenario]/
 /studio/
 /govern/
 /markets/
 /markets/[jurisdiction]/
 /patterns/
 /patterns/[pattern]/
 /networks/
 /networks/[network]/
 /controls/
 /controls/[control-domain]/
 /glossary/
 /glossary/[term]/
 /workspace/
 /sources/
 /releases/
```

### 10.3 Home page

The home page should immediately answer:
- What can I do here?
- Which lens fits me?
- Where do I start?

Recommended blocks:
- persona chooser,
- depth chooser,
- featured journeys,
- featured simulations,
- recently updated markets,
- “ask a question” search box,
- “start from an idea” card,
- “compare networks” card,
- “latest source review changes” strip.

### 10.4 Start-here experience

Provide three start modes:

1. **I am new to this**
2. **I need to answer a client or stakeholder question**
3. **I want to design or assess a product idea**

### 10.5 Learn section

Each topic page should have:
- simple summary,
- why it matters in traditional finance,
- how it changes by client type,
- how it changes by jurisdiction,
- how it works operationally,
- common misconceptions,
- related simulations,
- sources.

### 10.6 Simulate section

Simulation browser filters:
- topic
- client segment
- jurisdiction
- network/rail
- asset/product family
- depth
- lens
- control domain

### 10.7 Design Studio

This is the main prototype generator. It should support:
- blank canvas,
- start from existing pattern,
- start from client problem,
- start from asset type,
- start from jurisdiction,
- start from vendor/network.

### 10.8 Govern section

A decision-support area showing:
- applicable controls,
- jurisdiction notes,
- rule outcomes,
- evidence requirements,
- unresolved questions,
- and “do not proceed until reviewed” flags.

### 10.9 Workspace

The workspace is local-only in MVP. It should store:
- saved scenario states,
- saved comparisons,
- notes,
- concept memos,
- exported markdown/JSON bundles,
- AI settings (opt-in),
- dismissals/preferences.

### 10.10 Sources & releases

This is essential for trust. It should expose:
- official source cards,
- last-reviewed dates,
- what changed,
- stale flags,
- and release notes for content updates.


## 11. UX and interaction model

### 11.1 Core UI controls on almost every page

- **Lens selector**
- **Depth selector**
- **Jurisdiction selector**
- **Client segment selector**
- **Network/rail selector**
- **Source panel toggle**
- **Compare / save / export actions**

### 11.2 Progressive disclosure

Do not build separate pages for beginners and experts unless necessary. Build the same page with layered reveal:

- top summary,
- “show practitioner detail”,
- “show technical/control detail”,
- glossary hover states,
- expandable diagrams,
- sources collapsed by default but always reachable.

### 11.3 Explainability

Every claim that is not common instructional framing should be traceable to:
- a source,
- a rule,
- or a clearly labeled design assumption.

### 11.4 Persona-specific render hints

Examples:
- client lens defaults to simpler language and suitability warnings,
- legal lens defaults to jurisdiction notes, source panel open, and unresolved questions pinned,
- engineering lens defaults to events, state transitions, interfaces, and failure branches,
- operations lens defaults to swimlane view and reconciliation details.

### 11.5 Accessibility

Minimum requirements:
- WCAG-minded semantic structure,
- keyboard navigation,
- focus states,
- no critical info conveyed by color alone,
- diagrams with text alternatives,
- glossary expansion not only on hover,
- reduced-motion support,
- readable contrast,
- page weight discipline.

### 11.6 Content style rules

- no unexplained acronym on first use,
- define every term in glossary,
- always distinguish market practice from law/regulation,
- always distinguish prototype idea from production-ready pattern,
- always show the control consequences of “faster” or “more programmable” claims.

### 11.7 Trust UX

Show these on relevant pages:
- last updated,
- source quality,
- confidence level,
- warning if stale,
- warning if AI-generated summary is present,
- warning if selected combination is beyond supported scope.


## 12. Content architecture

The site should be content-driven, not hard-coded. Use Astro content collections for structured, typed content.

### 12.1 Content collections

Recommended collections:

- `glossary`
- `concepts`
- `journeys`
- `personas`
- `client-segments`
- `jurisdictions`
- `regulations`
- `standards`
- `patterns`
- `networks`
- `vendors`
- `controls`
- `simulations`
- `templates`
- `prompts`
- `sources`
- `release-notes`

### 12.2 Folder structure

```text
src/
  content/
    glossary/
    concepts/
    journeys/
    personas/
    client-segments/
    jurisdictions/
    regulations/
    standards/
    patterns/
    networks/
    vendors/
    controls/
    simulations/
    templates/
    prompts/
    sources/
    release-notes/
  data/
    rules/
    matrices/
    generated/
  components/
  layouts/
  pages/
  lib/
  store/
  styles/
scripts/
tests/
public/
```

### 12.3 Source card schema

```ts
type SourceCard = {
  id: string;
  title: string;
  organization: string;
  url: string;
  sourceType: 'law' | 'guidance' | 'standard' | 'official-page' | 'official-press-release' | 'industry-body' | 'internal-note';
  jurisdiction?: string;
  status?: 'final' | 'draft' | 'proposal' | 'transitional' | 'sandbox' | 'press-release';
  lastReviewed: string;
  relevanceTags: string[];
  confidence: 'high' | 'medium' | 'low';
  summary: string;
};
```

### 12.4 Content object requirement

Every major content file should include:
- title
- slug
- summary
- persona hints
- depth availability
- related terms
- related patterns
- related controls
- related simulations
- source IDs
- last-reviewed
- review owner
- freshness threshold

### 12.5 Knowledge graph generation

At build time, generate a local graph linking:
- concepts to simulations,
- patterns to networks,
- networks to controls,
- jurisdictions to regulations,
- client segments to suitability/control overlays,
- and everything to sources.

Create a generated JSON graph like:
```json
{
  "nodes": [...],
  "edges": [...]
}
```

Use it for:
- “related content”,
- compare pages,
- path suggestions,
- and Q&A retrieval context.


## 13. Rules engine and overlay system

The rules engine is the core of the “govern” layer and one of the main reasons the static architecture can still feel intelligent.

### 13.1 What the rules engine does

Based on selected inputs, it should determine:
- whether something is in scope or not,
- whether a legal/compliance/risk review is mandatory,
- which controls become required,
- which disclosures or artifacts are needed,
- which simulation branches appear,
- and which warning banners should be shown.

### 13.2 Input dimensions

Rules can evaluate combinations of:
- jurisdiction,
- client segment,
- client classification,
- asset type,
- activity type,
- settlement asset,
- network/rail type,
- custody model,
- target distribution model,
- novelty classification,
- latency requirement,
- value/size sensitivity.

### 13.3 Output effects

- `allow`
- `warn`
- `block`
- `require_legal_review`
- `require_compliance_review`
- `require_risk_review`
- `add_control`
- `add_artifact`
- `add_disclosure`
- `add_simulation_branch`
- `set_confidence_low`

### 13.4 Rule object example

```ts
type Rule = {
  id: string;
  title: string;
  description: string;
  if: Record<string, unknown>;
  effects: {
    type:
      | 'allow'
      | 'warn'
      | 'block'
      | 'require_legal_review'
      | 'require_compliance_review'
      | 'require_risk_review'
      | 'add_control'
      | 'add_artifact'
      | 'add_disclosure'
      | 'add_simulation_branch'
      | 'set_confidence_low';
    value?: string;
  }[];
  rationale: string;
  sourceIds: string[];
  jurisdictions?: string[];
};
```

### 13.5 Example rule categories

- jurisdiction perimeter rules,
- client distribution/suitability rules,
- stablecoin/tokenized cash rules,
- digital-securities sandbox/pilot applicability rules,
- custody segregation rules,
- travel-rule triggers,
- DORA/NIST operational-resilience overlays,
- prudential-treatment overlays,
- family-office governance overlays,
- high-frequency pre-trade-control overlays.

### 13.6 Why deterministic rules matter

AI can help explain, summarize, and brainstorm. It should **not** be the only thing deciding whether a control or legal-review flag is shown. Those flags must come from deterministic content and rules.


## 14. Control library and risk framework

This site will only be credible in a financial-services context if the control model is first-class.

### 14.1 Core control domains

1. Legal classification and perimeter
2. Licensing / entity / permissions
3. Client suitability / appropriateness / disclosure
4. AML / KYC / sanctions / travel rule
5. Market conduct / surveillance / abuse
6. Prudential capital / exposure / treasury / liquidity
7. Custody / safekeeping / segregation / key governance
8. Smart-contract / protocol / oracle / technical risk
9. Operational resilience / cyber / incident response
10. Third-party / outsourcing / concentration risk
11. Data protection / record keeping / privacy
12. Accounting / valuation / tax reporting
13. Corporate actions / servicing / reconciliation
14. Business continuity / exit / recovery / wind-down

### 14.2 Standards and frameworks to anchor against

Use the following as reference anchors:
- Basel crypto prudential framework and related amendments
- NIST CSF 2.0
- FATF travel-rule and targeted-update materials
- FIPS 140-3
- CCSS (as a crypto-specific security reference)
- ISO 20022 and ISO 24165 context where relevant

### 14.3 Control object schema

```ts
type Control = {
  id: string;
  domain: string;
  title: string;
  objective: string;
  whyItMatters: string;
  appliesWhen: string[];
  evidenceExamples: string[];
  severityIfMissing: 'low' | 'medium' | 'high' | 'critical';
  ownerHints: string[];
  sourceIds: string[];
  relatedRules: string[];
  relatedSimulations: string[];
};
```

### 14.4 Minimum control coverage by scenario

Every major simulation must expose:
- required controls,
- optional controls,
- evidence examples,
- owner hints,
- likely escalation path,
- and common failure modes if the control fails.

### 14.5 Example control prompts

#### Custody / key governance
- Who legally and operationally controls private keys or signing rights?
- Are keys split, policy-gated, hardware-protected, or externally delegated?
- What is the recovery model for compromise, death, incapacity, or staff exit?
- What segregation exists between house, omnibus, and client assets?
- What is the treatment if custody is delegated across borders?

#### Tokenized fund controls
- Who verifies investor eligibility?
- How is wallet whitelisting performed?
- What happens if NAV is unavailable or stale?
- What is the reconciliation source of truth?
- How are mint/burn events evidenced?

#### Wealth-planning controls
- Can the asset be held by a trust/foundation/company wrapper?
- Who can authorize transfers during incapacity?
- How are beneficiaries and succession instructions evidenced?
- Is there a recovery or break-glass process that is legally robust?

#### High-frequency / treasury controls
- Are assets pre-funded?
- What intraday limits exist?
- What finality assumptions are built into risk calculations?
- What happens during network congestion or venue outage?
- Are throttles/circuit breakers defined?

### 14.6 Risk scoring

Use a pragmatic, transparent scoring model:

- inherent complexity
- regulatory uncertainty
- operational complexity
- custody/key risk
- vendor concentration risk
- market/price/liquidity risk
- resilience risk
- client-harm risk

Provide a visible score with explanation, not a black-box number.


## 15. Simulation engine: design requirements

Deep simulations are one of the most important differentiators in this product.

### 15.1 Simulation philosophy

A simulation is not just a clickable demo. It is a structured model of:

- actors,
- states,
- events,
- decisions,
- documents,
- controls,
- exceptions,
- outputs,
- and unresolved questions.

### 15.2 Four depth layers for every simulation

- **Layer 1: Conceptual**
  - high-level steps,
  - major actors,
  - core purpose.

- **Layer 2: Operational**
  - approvals,
  - handoffs,
  - documents,
  - reconciliations,
  - servicing tasks.

- **Layer 3: Technical**
  - wallet/account setup,
  - message flows,
  - smart contracts,
  - mint/burn/transfer logic,
  - settlement mechanics,
  - data objects.

- **Layer 4: Failure and control**
  - sanctions hits,
  - key compromise,
  - settlement failure,
  - data mismatch,
  - outage,
  - stale NAV,
  - paused contract,
  - legal/perimeter problem,
  - cross-border delegation issue,
  - client unsuitability.

### 15.3 Simulation UI components

Each simulation page should contain:

- scenario summary,
- variable sidebar,
- swimlane view,
- stepper/timeline,
- live event log,
- documents/evidence drawer,
- controls drawer,
- jurisdiction overlay drawer,
- exception-path selector,
- “compare another setup” action,
- export button.

### 15.4 Simulation state model

```ts
type SimulationState = {
  scenarioId: string;
  selectedPersonaLens: string;
  selectedDepth: 'plain' | 'practitioner' | 'expert';
  selectedJurisdiction: string;
  selectedClientProfile: string;
  selectedNetwork: string;
  selectedSettlementAsset: string;
  selectedCustodyModel: string;
  selectedBranches: string[];
  eventHistory: SimulationEvent[];
  outputs: SimulationArtifact[];
  warnings: string[];
  requiredReviews: string[];
  riskScore: number;
};
```

### 15.5 Simulation artifact types

- concept memo
- sequence diagram
- control checklist
- data dictionary
- approval matrix
- unresolved-questions register
- exportable markdown summary
- JSON state snapshot

### 15.6 Simulation authoring model

Scenarios should be defined in content files, not hard-coded in components. The engine should render from data.

Recommended structure:
```text
src/content/simulations/
  native-crypto-spot.mdx
  tokenized-fund-sub-redemption.mdx
  tokenized-bond-issuance.mdx
  repo-collateral.mdx
  tokenized-cash-payments.mdx
  structured-product-lifecycle.mdx
  family-office-wealth-planning.mdx
  custody-operating-model.mdx
  incident-response-key-compromise.mdx
  market-launch-governance.mdx
```


## 16. Deep simulation catalog and required depth

The site should ship with at least the following **12 substantial simulations**, with the first 6 implemented at highest depth.

### 16.1 Priority 1 simulations (ship deepest first)

1. Native crypto onboarding, trading, custody, transfer, and reporting  
2. Tokenized money market fund subscription and redemption  
3. Tokenized bond issuance, distribution, settlement, and servicing  
4. Repo and collateral mobilization with digital assets  
5. Tokenized cash / stablecoin / tokenized deposit treasury and cross-border payments  
6. Structured product lifecycle for digital-asset-linked or tokenized instruments  

### 16.2 Priority 2 simulations

7. Secondary trading and settlement on a regulated DLT venue/FMI  
8. Custody operating model and key governance  
9. Family-office / UHNW wealth-planning and succession considerations  
10. Incident response: key compromise / smart-contract pause / network outage  
11. Market-launch governance: idea-to-approval workflow  
12. High-frequency / latency-sensitive market-making and treasury operations overlay

### 16.3 Optional phase 2 simulations

- tokenized private fund / alternative asset distribution
- staking and yield services
- derivatives/perpetuals (jurisdiction-limited)
- tokenized collateral for intraday liquidity
- cross-venue interoperability and settlement-asset bridging

### 16.4 Required simulation depth rule

A scenario is **not done** unless it has:
- at least one happy path,
- at least five meaningful exception branches,
- controls mapped to steps,
- documents/artifacts mapped to steps,
- jurisdiction overlays,
- client-segment overlays,
- and an exportable summary.

## 17. Detailed simulation specs

### 17.1 Simulation 1 — Native crypto onboarding, trading, custody, transfer, and reporting

**Purpose:** Help users understand direct crypto exposure for retail, HNW, UHNW, family-office, and institutional contexts.

**Actors:**
- client
- RM/advisor
- onboarding/KYC
- compliance/sanctions
- trading desk/venue
- custody provider
- wallet administration
- operations/reconciliation
- reporting/tax support

**Core variables:**
- jurisdiction
- client segment
- custody model (bank custody / third-party / self-custody assisted / hybrid)
- asset (BTC, ETH, other supported asset family)
- trading mode (advised / execution-only / institutional OTC)
- transfer type (internal / external wallet / venue)
- latency sensitivity
- account type (individual / trust / company / fund)

**Happy-path phases:**
1. client intent captured
2. product eligibility and client classification
3. onboarding and KYC
4. sanctions and source-of-wealth checks
5. suitability / disclosure
6. wallet or custody account setup
7. order capture
8. trade execution
9. settlement/allocation
10. safekeeping
11. reporting and valuation
12. optional transfer out
13. periodic review / statements / complaints handling

**Required exception branches:**
- client classified as unsuitable for selected product type
- sanctions or adverse media hit
- source-of-funds unresolved
- wallet address not approved / ownership cannot be attested
- transfer to unsupported jurisdiction or blacklisted address
- venue outage / settlement delay
- pricing-source mismatch
- custody provider incident / withdrawal suspension
- client death/incapacity for UHNW/family-office branch
- accounting/reporting mismatch

**Control highlights:**
- suitability and disclosure
- AML/KYC
- wallet attestation and transfer screening
- custody segregation
- incident handling and client communication
- travel-rule relevance when applicable
- wealth-planning governance overlays

**Outputs:**
- client-ready explanation
- operating-model checklist
- transfer control checklist
- family-office governance questions
- risk heatmap

### 17.2 Simulation 2 — Tokenized money market fund subscription and redemption

**Purpose:** Model a tokenized fund lifecycle from onboarding through subscription, minting, holding, servicing, redemption, and reconciliation.

**Actors:**
- client/investor
- RM/distributor
- compliance / KYC / eligibility
- issuer/fund manager
- transfer agent / registrar
- custodian
- tokenization platform / smart contract
- NAV source / administrator
- settlement bank / tokenized cash provider
- operations / reconciliation
- reporting

**Core variables:**
- jurisdiction
- client classification
- distribution type (private / professional / institutional / other)
- network/rail
- settlement asset (fiat, stablecoin, tokenized deposit)
- wallet model
- transfer restrictions
- fund type (money market / bond fund / other)
- transfer-agent pattern (off-chain registry dominant vs on-chain register dominant)

**Happy-path phases:**
1. investor onboarding
2. investor eligibility and distribution check
3. fund document review and disclosures
4. wallet whitelist / identity binding
5. subscription order capture
6. cash funding or tokenized-cash preparation
7. compliance validation
8. NAV strike / price confirmation
9. mint / allocation of fund tokens
10. delivery and records update
11. reconciliation of on-chain and off-chain books
12. holding/reporting
13. transfer restrictions enforcement for secondary movement if applicable
14. redemption request
15. burn / settle / cash-out
16. post-redemption reporting

**Required exception branches:**
- wallet not whitelisted
- investor not eligible for selected class or jurisdiction
- NAV stale or unavailable
- fiat funding not received
- tokenized cash transfer delayed or reverted
- smart contract paused
- registry mismatch
- sanctions/AML flag after order capture
- cut-off missed
- corporate-action or fee accrual mismatch
- redemption gate or suspension
- chain congestion or finality delay

**Control highlights:**
- investor eligibility
- transfer restrictions
- source-of-cash and AML checks
- NAV data governance
- mint/burn control
- reconciliation and source-of-truth policy
- servicing and fee logic
- incident and pause handling

**Market reference patterns to teach (without endorsement):**
- bank tokenization workflows,
- tokenized fund transfer-agency models,
- messaging + off-chain/on-chain synchronization patterns,
- permissioned vs public chain tradeoffs.

**Outputs:**
- fund-lifecycle sequence diagram
- control checklist
- document set
- jurisdiction warnings
- architecture options memo

### 17.3 Simulation 3 — Tokenized bond issuance, distribution, settlement, and servicing

**Purpose:** Show how a tokenized bond or note is originated, issued, allocated, settled, custodied, and serviced across its lifecycle.

**Actors:**
- issuer
- arranger / origination banker
- legal / documentation counsel
- investor / distributor
- venue / issuance platform
- settlement agent / cash leg
- custodian / asset servicer
- registrar / paying agent
- operations / reporting
- risk / compliance

**Core variables:**
- jurisdiction
- issuance type (private placement / public-style / sandbox/pilot / regulated venue)
- network/venue
- settlement asset type
- investor type
- transferable vs permissioned holding
- coupon type
- maturity profile

**Happy-path phases:**
1. mandate and product concept
2. legal wrapper and perimeter classification
3. term-sheet and documentation
4. identifier and instrument setup
5. investor targeting / distribution restrictions
6. order collection / bookbuild or bilateral placement
7. allocation
8. token issuance / mint
9. cash settlement / DvP
10. initial safekeeping
11. ongoing reporting
12. coupon/corporate-action servicing
13. secondary transfer or venue trading
14. maturity redemption or default workflow

**Required exception branches:**
- documentation not aligned with token mechanics
- investors not eligible for distribution
- settlement asset unavailable
- DvP not atomic and cash leg delayed
- corporate-action record mismatch
- coupon date failure or payer issue
- transfer restriction breach
- venue outage
- chain/network event requiring pause
- default/restructuring scenario
- cross-border holding/custody conflict

**Control highlights:**
- legal wrapper and offering restrictions
- issuer and investor onboarding
- identifier, records, and cap-table integrity
- DvP model
- paying-agent / corporate-action controls
- reconciliation and servicing
- custody segregation
- investor communications

**Outputs:**
- issuance workflow
- artifact list
- venue/network compare
- corporate-action map
- legal/open questions list

### 17.4 Simulation 4 — Repo and collateral mobilization with digital assets

**Purpose:** Model how tokenized assets or digital assets are used as collateral in repo or collateral-mobilization workflows.

**Actors:**
- lender / borrower
- collateral manager
- treasury
- operations / margining
- custodian / triparty / venue / settlement rail
- risk
- legal documentation
- default management

**Core variables:**
- collateral type
- haircut
- tri-party vs bilateral
- settlement asset
- network
- margining frequency
- operating window
- client type
- jurisdiction

**Happy-path phases:**
1. eligibility setup
2. counterparty onboarding
3. documentation and limits
4. collateral selection
5. haircut and valuation
6. transfer / pledge / lock
7. cash leg settlement
8. margin monitoring
9. substitution
10. unwind or roll
11. default handling if triggered

**Required exception branches:**
- collateral valuation stale
- transfer finality delayed
- collateral ineligible after rule change
- margin shortfall
- substitution failure
- concentration breach
- counterparty default
- network outage during unwind
- legal uncertainty on enforceability
- reconciliation mismatch

**Control highlights:**
- collateral eligibility and concentration
- haircut governance
- legal enforceability
- valuation source quality
- intraday monitoring
- liquidity and unwind planning
- incident/default procedures

**Outputs:**
- repo lifecycle map
- collateral control checklist
- default waterfall view
- high-frequency liquidity notes

### 17.5 Simulation 5 — Tokenized cash / stablecoin / tokenized deposit treasury and cross-border payments

**Purpose:** Compare how different tokenized cash models work for treasury, settlement, cross-border flows, and DvP/PvP use cases.

**Actors:**
- treasury / payments ops
- sending entity
- receiving entity
- bank / rail operator
- compliance / sanctions
- liquidity manager
- reconciliation / accounting
- technology / network operator

**Core variables:**
- tokenized cash type (stablecoin / EMT / FRT / tokenized deposit)
- network/rail
- currency
- cross-border or domestic
- operating hours requirement
- DvP/PvP need
- amount sensitivity
- jurisdiction pair

**Happy-path phases:**
1. use-case selection
2. permissible asset/rail determination
3. wallet/account setup
4. liquidity funding
5. transfer initiation
6. compliance screening
7. settlement execution
8. confirmation/finality handling
9. reconciliation and accounting
10. reporting and monitoring

**Required exception branches:**
- tokenized cash type not permitted for chosen context
- sanctions hit
- receiver not whitelisted
- liquidity not prefunded
- settlement finality delayed
- rail unavailable
- FX / PvP leg mismatch
- redemption/unwind issue
- accounting treatment unclear
- concentration / vendor risk breach

**Control highlights:**
- legal nature of settlement asset
- redemption rights and issuer risk
- liquidity and prefunding
- screening and travel-rule overlays
- finality and confirmation policy
- accounting/reconciliation
- vendor and operational concentration

**Outputs:**
- compare matrix for settlement-asset types
- treasury design memo
- control heatmap
- cross-border warning set

### 17.6 Simulation 6 — Structured product lifecycle

**Purpose:** Support idea generation and assessment for digital-asset-linked or tokenized structured products.

**Actors:**
- product structurer
- issuer
- sales/distribution
- legal
- risk
- hedging desk
- operations
- custodian / venue / registrar
- client/advisor

**Core variables:**
- target client segment
- payoff type
- underlying asset class
- wrapper type
- distribution jurisdiction
- hedging approach
- custody model
- transferability
- valuation frequency

**Happy-path phases:**
1. client/problem framing
2. payoff design
3. suitability and client-segment match
4. legal/perimeter and disclosure design
5. hedging and risk management setup
6. issuance
7. distribution / subscription
8. holding and valuation
9. corporate events / barrier events / servicing
10. maturity / unwind

**Required exception branches:**
- payoff too complex for target segment
- insufficient liquidity/hedging
- disclosure not aligned to product complexity
- custody mismatch
- valuation-source dispute
- underlying market dislocation
- early termination trigger
- legal wrapper conflict across jurisdictions
- investor complaint / suitability challenge

**Control highlights:**
- target-market definition
- suitability and disclosure
- model and valuation governance
- hedging and liquidity
- lifecycle servicing
- complaint handling and evidence

**Outputs:**
- product concept note
- client-segment fit view
- target-market warnings
- open questions register

### 17.7 Simulations 7–12 (summary specs)

For the remaining six simulations, define the same data model and minimum completion standard.

7. **Secondary trading on regulated DLT venue/FMI**  
   Focus: venue rules, DvP, order records, transfer restrictions, post-trade servicing.

8. **Custody operating model and key governance**  
   Focus: hot/warm/cold, MPC/HSM/policy, segregation, recovery, outsourcing, cross-border delegation.

9. **Family-office / UHNW wealth planning and succession**  
   Focus: governance structures, trust/foundation/company wrappers, incapacity/death, recovery, reporting, concentration, liquidity planning.

10. **Incident response**  
   Focus: key compromise, smart-contract pause, oracle failure, chain congestion, sanctions alert, vendor outage, client communications, recovery/wind-down.

11. **Market-launch governance**  
   Focus: idea intake, classification, risk/legal/compliance sign-off requirements, vendor due diligence, pilot-to-production pathway.

12. **High-frequency / latency-sensitive operations**  
   Focus: prefunding, intraday controls, throughput/finality assumptions, throttles, circuit breakers, failover, operational monitoring.


## 18. Design Studio and idea generation

The Design Studio is where users move from “I have a thought” to “I have a structured concept”.

### 18.1 Start modes

Users should be able to start from:
- a client problem,
- an asset class,
- a product family,
- a jurisdiction,
- a network/rail,
- an existing pattern,
- or a blank canvas.

### 18.2 Core canvas fields

- problem/opportunity statement
- target client segment
- target market/jurisdiction
- underlying exposure
- token form / legal wrapper
- settlement asset
- liquidity expectations
- distribution model
- custody model
- operating model
- key partners/vendors/networks
- target controls
- unresolved questions

### 18.3 Design Studio outputs

- concept memo (markdown)
- one-page executive summary
- comparable market patterns
- network/vendor shortlist
- control matrix
- jurisdiction warnings
- simulation links
- “what to validate next” checklist

### 18.4 Novelty meter

The site should classify ideas into:
- **Existing pattern**
- **Adjacent extension**
- **Frontier / novel concept**

This classification should come from:
- deterministic matching against the pattern library,
- plus optional AI commentary.

### 18.5 Pattern matching logic

Create a pattern library with tagged fields such as:
- client segment
- asset family
- legal wrapper
- network type
- settlement asset
- custody model
- primary objective
- control hotspots

Then compute similarity between the user’s idea and known patterns. This lets the site say:
- “similar to tokenized MMF distribution pattern”
- “similar to tokenized bond issuance on regulated venue”
- “closest live comparables exist, but your settlement asset choice is novel”
- “no close known pattern in current library”

### 18.6 AI role in idea generation

AI can help:
- rewrite rough ideas clearly,
- suggest adjacent patterns,
- challenge assumptions,
- propose missing controls,
- and draft a first concept memo.

AI must **not**:
- present speculation as law,
- suppress warnings,
- produce unsourced “definitive” regulatory answers,
- or hide uncertainty.

### 18.7 Challenger mode

One of the most useful features will be **Challenger mode**, which asks:
- what could go wrong?
- what would risk ask first?
- what would legal ask first?
- what would operations ask first?
- what part of this idea is actually new?
- what can be simulated right now?
- what requires external validation or legal review?


## 19. Q&A and retrieval model

The site must allow users to ask questions about digital-asset concepts, but the architecture must remain static-first.

### 19.1 Retrieval-first, not chat-first

The default flow should be:
1. retrieve relevant content from the local index,
2. show source-backed answer cards,
3. optionally summarize retrieved content with a local or approved AI adapter.

### 19.2 Minimum no-AI Q&A capability

Even with AI disabled, the site should support:
- strong search,
- FAQ blocks,
- “answer from patterns” pages,
- compare pages,
- source-backed glossaries,
- and structured explainer summaries.

### 19.3 Static search

Use **Pagefind** after the static build to create a fast local index with no backend dependency.

### 19.4 AI-enhanced answer flow

If the user enables AI:
- retrieve top local content nodes,
- build a small context packet,
- send that packet to the selected AI adapter,
- require the answer to cite local source cards and related pages,
- and always display a “generated summary” label.

### 19.5 Suggested answer templates

Support multiple answer templates:
- explain simply
- explain for client meeting
- explain for legal/compliance
- explain operational flow
- compare two approaches
- identify control deltas
- draft a concept note
- challenge this idea

### 19.6 No-black-box rule

Never let the AI answer without also showing:
- which local sources were used,
- which assumptions were injected,
- and where the site lacks confidence.


## 20. AI architecture compatible with GitLab Pages

The site should work well without Azure or any always-on backend. Therefore the AI architecture must be optional and adapter-based.

### 20.1 AI modes

- **Tutor** — explain a concept
- **Summarizer** — summarize retrieved sources
- **Designer** — draft concept notes
- **Challenger** — red-team an idea
- **Comparator** — compare patterns/networks
- **Control scout** — suggest missing control questions

### 20.2 Adapter types

#### Adapter A — No AI
Default. All core product functions still work.

#### Adapter B — In-browser local model
Use WebLLM or Transformers.js for light tasks:
- summarization,
- rewriting,
- classification,
- short answer generation.

Pros:
- no server dependency,
- privacy-friendly if content stays in browser.

Cons:
- limited context and model quality,
- device performance variability,
- larger client bundles if not carefully lazy-loaded.

#### Adapter C — User-configured localhost endpoint
Allow a user to point the site to a local Ollama or other approved local endpoint running on their machine or network.

Pros:
- stronger local models,
- no required vendor cloud dependency.

Cons:
- requires user setup,
- CORS / origin config considerations,
- governance still needed.

#### Adapter D — Approved external endpoint (future)
Possible later, but do not make the site depend on it.

### 20.3 AI settings UX

Provide:
- disabled / browser / localhost / external endpoint choice,
- model name,
- context size hints,
- privacy warning,
- “never store prompts” option,
- clear note that confidential data should not be pasted unless approved.

### 20.4 AI safety rules

- never override deterministic rule blocks,
- never hide uncertainty,
- never fabricate a legal answer when the local corpus marks confidence low,
- always cite local content cards,
- always preserve jurisdiction warnings,
- log output only locally unless the user exports.

### 20.5 Why this fits a Mac mini workflow

A Mac mini can comfortably build the static site and can also optionally run a local AI endpoint for private experimentation without requiring Azure infrastructure. The site should treat that as an optional acceleration path, not a requirement.


## 21. Static-first technical architecture

### 21.1 Core stack

Recommended stack:
- **Astro**
- **TypeScript**
- **MDX**
- **React islands** for interactive components
- **Pagefind** for search
- **Zod** for schema validation
- **Vitest** for unit tests
- **Playwright** for end-to-end tests
- **Dexie/IndexedDB** or equivalent for local workspace storage

### 21.2 Why Astro is a strong fit

Astro is well-suited to:
- static builds,
- content collections,
- MDX-heavy educational sites,
- partial hydration for only the interactive parts,
- and deployment under GitLab Pages base paths.

### 21.3 Rendering strategy

- pre-render all pages statically,
- hydrate only interactive components,
- lazy-load heavy simulation and AI components,
- keep the landing and learning pages lightweight.

### 21.4 State layers

- **Build-time content state** — all core knowledge
- **Client filter state** — lens, depth, market, client segment, network
- **Client workspace state** — notes, saved comparisons, saved simulations
- **Optional AI state** — adapter config, model choice, opt-in preferences

### 21.5 Local persistence

Use IndexedDB for:
- workspace items,
- saved simulation states,
- design-studio drafts,
- compare lists,
- AI settings.

Use localStorage only for small UI preferences.

### 21.6 Base path and URL correctness

GitLab Pages often serves project sites from a path prefix rather than a root domain. Therefore the site must:
- respect a configurable base path,
- avoid hard-coded absolute asset paths,
- test both root-domain and project-path deployment,
- and use helper utilities for asset and route generation.

### 21.7 Service worker / offline

Optional but useful:
- cache glossary, key pages, and simulations for offline demos,
- but do not complicate the MVP if it slows delivery.


## 22. GitLab Pages deployment plan

### 22.1 Core deployment requirements

The whole site must:
- build to static files,
- require no server runtime,
- work under GitLab Pages path prefixes,
- support fast iteration via GitLab CI/CD,
- and use GitLab Pages access controls if available in the target environment.

### 22.2 Recommended environment

- Node.js LTS on the Mac mini for local development
- pnpm or npm (pnpm preferred for monorepo-style speed)
- GitLab repository with CI/CD enabled
- GitLab Pages enabled
- optional Pages access control for internal-only usage
- optional custom domain later

### 22.3 Build script goals

The build should:
1. validate schemas,
2. lint content,
3. generate derived graph data,
4. build Astro static pages,
5. build Pagefind index,
6. run smoke tests against the built output,
7. publish the generated site.

### 22.4 Suggested scripts

```json
{
  "scripts": {
    "dev": "astro dev",
    "build": "astro build && pagefind --site dist",
    "preview": "astro preview",
    "typecheck": "astro check && tsc --noEmit",
    "lint": "eslint . && prettier -c .",
    "test": "vitest run",
    "e2e": "playwright test",
    "content:validate": "tsx scripts/validate-content.ts",
    "content:graph": "tsx scripts/build-graph.ts",
    "sources:check": "tsx scripts/check-sources.ts"
  }
}
```

### 22.5 Example Astro config (illustrative)

```ts
import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import mdx from '@astrojs/mdx';

const site = process.env.PUBLIC_SITE_URL || 'https://example.gitlab.io/project/';
const base = process.env.PUBLIC_BASE_PATH || '/';

export default defineConfig({
  site,
  base,
  output: 'static',
  trailingSlash: 'always',
  integrations: [react(), mdx()]
});
```

### 22.6 Example GitLab CI sketch (illustrative, verify against your instance docs)

```yaml
image: node:22

stages:
  - test
  - build
  - deploy

cache:
  paths:
    - .pnpm-store/

before_script:
  - corepack enable
  - pnpm install --frozen-lockfile

test:
  stage: test
  script:
    - pnpm content:validate
    - pnpm typecheck
    - pnpm lint
    - pnpm test

build:
  stage: build
  script:
    - export PUBLIC_SITE_URL="${CI_PAGES_URL}"
    - export PUBLIC_BASE_PATH="/${CI_PROJECT_NAME}/"
    - pnpm content:graph
    - pnpm build
  artifacts:
    paths:
      - dist/

pages:
  stage: deploy
  script:
    - rm -rf public
    - mv dist public
  artifacts:
    paths:
      - public
  rules:
    - if: '$CI_COMMIT_BRANCH == $CI_DEFAULT_BRANCH'
```

### 22.7 Preview environments

If the GitLab environment supports it, add branch or merge-request preview deployments so content and simulations can be reviewed before release.

### 22.8 Access control

If internal access is needed, use GitLab Pages access control or equivalent perimeter controls on the chosen GitLab environment. If those controls are unavailable, restrict the site via network perimeter or keep the project private and deploy where access controls are available.

### 22.9 Site size discipline

Because the site is static and may accumulate heavy content:
- aggressively lazy-load simulation JS,
- keep images optimized,
- avoid shipping large AI model bundles by default,
- and monitor build artifact size.


## 23. Data freshness and research update pipeline

A static site can still stay current if updates happen at build time.

### 23.1 Source register

Create a structured source register with:
- source ID,
- title,
- organization,
- URL,
- jurisdiction,
- tags,
- last reviewed,
- reviewer,
- confidence,
- and notes.

### 23.2 Freshness policy

Recommended freshness windows:
- Tier 1 regulatory pages: review every 30–60 days
- Tier 2 regulatory pages: review every 60–90 days
- standards pages: review every 90–180 days
- vendor/network pages: review every 30–90 days
- glossary basics: review only on need
- simulations: review whenever a relevant pack or source changes

### 23.3 Scheduled checks

Use scheduled CI/CD pipelines to:
- check source URLs,
- detect title/metadata changes,
- flag stale content,
- generate a change report,
- and open or prepare a content-review task.

### 23.4 Human review requirement

Do not auto-publish legal/regulatory interpretation changes without human review. The pipeline can detect and summarize change, but release should be gated.

### 23.5 Release notes

Publish human-readable release notes for:
- added jurisdiction packs,
- changed control assumptions,
- updated simulations,
- new vendor/network profiles,
- source changes,
- and breaking content changes.


## 24. Security, privacy, and internal-use precautions

### 24.1 Default data posture

Because the site is static, the safest default is:
- no server-side user accounts,
- no server-side storage of notes,
- no storage of confidential client data,
- no secrets embedded in the frontend.

### 24.2 Local workspace policy

The site should warn users:
- do not store real client-identifying information unless approved,
- use sanitized examples,
- exported files are stored wherever the user saves them,
- browser local storage is local to the device/browser profile.

### 24.3 AI privacy warnings

If AI is enabled:
- show where prompts are going,
- differentiate local browser model vs localhost endpoint vs external endpoint,
- default to AI off,
- and show a confirmation banner before first use.

### 24.4 Supply-chain precautions

- pin package versions where practical,
- use Dependabot/Renovate or GitLab equivalent,
- scan dependencies,
- and keep the front-end bundle understandable.

### 24.5 Content integrity

- schema validation for all content,
- CI checks for broken internal links,
- CI checks for missing source IDs,
- CI checks for stale Tier 1 pages,
- CI checks for missing “legal review required” labels on configured rule branches.


## 25. Repo structure for Codex

### 25.1 Recommended repo layout

```text
digital-asset-studio/
  .gitlab-ci.yml
  package.json
  pnpm-lock.yaml
  astro.config.mjs
  tsconfig.json
  .nvmrc
  public/
    icons/
    images/
  scripts/
    validate-content.ts
    build-graph.ts
    check-sources.ts
    generate-derived-data.ts
  src/
    content/
      glossary/
      concepts/
      journeys/
      personas/
      client-segments/
      jurisdictions/
      regulations/
      standards/
      patterns/
      networks/
      vendors/
      controls/
      simulations/
      sources/
      release-notes/
    data/
      rules/
      matrices/
      generated/
    lib/
      content/
      graph/
      rules/
      simulations/
      ai/
      export/
      formatting/
    store/
      filters.ts
      workspace.ts
      ai.ts
    components/
      layout/
      search/
      learn/
      simulate/
      studio/
      govern/
      controls/
      sources/
      common/
    pages/
      index.astro
      start.astro
      studio.astro
      workspace.astro
      sources.astro
      releases.astro
      learn/
      simulate/
      markets/
      patterns/
      networks/
      controls/
      glossary/
  tests/
    unit/
    e2e/
```

### 25.2 Generated data

Keep derived artifacts out of hand-authored content:
- graph JSON
- compare matrices
- rule indexes
- search helper structures
- source freshness reports

These should be generated by scripts.


## 26. Content authoring conventions

### 26.1 Naming rules

- file slugs should be short and stable,
- source IDs should be human-readable,
- jurisdiction IDs should be consistent (`ch`, `eu`, `uk`, `sg`, `hk`, `us`, `adgm`, `jp`, `global`),
- simulations should use hyphenated descriptive IDs.

### 26.2 Review metadata

Every Tier 1 and Tier 2 content file should contain frontmatter like:

```yaml
title: Tokenized fund subscription and redemption
summary: End-to-end simulation of onboarding, subscription, minting, holding, redemption, and reconciliation.
lastReviewed: 2026-03-18
reviewOwner: product-research
freshnessDays: 45
sourceIds:
  - mas-project-guardian
  - ubs-tokenize
  - chainlink-dta
  - esma-mica
relatedControls:
  - ctl-investor-eligibility
  - ctl-wallet-whitelisting
  - ctl-nav-governance
  - ctl-reconciliation
```

### 26.3 Content quality gates

Fail CI if:
- `lastReviewed` missing on Tier 1/Tier 2 pages,
- source IDs missing,
- linked source cards do not exist,
- stale pages exceed freshness threshold unless explicitly exempted,
- glossary terms referenced but undefined.

### 26.4 Diagram generation

Prefer data-driven diagrams. A simulation should generate:
- a swimlane,
- an event timeline,
- and optionally a sequence diagram,
from the scenario definition.


## 27. Recommended components

### 27.1 Foundational components

- `ShellLayout`
- `TopNav`
- `SideToc`
- `LensSelector`
- `DepthSelector`
- `FilterBar`
- `SourcePanel`
- `StaleBadge`
- `ConfidenceBadge`
- `GlossaryTerm`
- `CompareDrawer`
- `ExportMenu`

### 27.2 Learn components

- `ConceptHero`
- `WhyItMatters`
- `ClientSegmentTabs`
- `JurisdictionNotes`
- `RelatedPatterns`
- `FAQBlock`

### 27.3 Simulation components

- `SimulationShell`
- `VariablePanel`
- `SwimlaneView`
- `TimelineView`
- `EventLog`
- `DocumentsDrawer`
- `ControlsDrawer`
- `ExceptionBrowser`
- `OutcomeSummary`
- `RiskHeatmap`

### 27.4 Studio components

- `IdeaCanvas`
- `PatternMatcher`
- `ComparableCard`
- `NoveltyMeter`
- `ChallengePanel`
- `NextStepsChecklist`

### 27.5 Governance components

- `RuleResultList`
- `ControlChecklist`
- `ReviewGateCard`
- `JurisdictionPackSummary`
- `SourceMatrix`


## 28. Search, compare, and cross-linking

### 28.1 Search principles

Search should work across:
- concepts,
- glossary,
- simulations,
- patterns,
- markets,
- controls,
- networks/vendors,
- sources.

### 28.2 Compare experience

Support compare flows for:
- two asset/product patterns,
- two networks/rails,
- two jurisdictions,
- two custody models,
- or two selected scenario states.

### 28.3 Cross-linking rules

Every page should expose:
- related concepts,
- related simulations,
- related controls,
- related jurisdiction packs,
- related networks,
- related source cards.

### 28.4 Why compare is so important

Most internal users do not need a single answer. They need to understand tradeoffs:
- public chain vs permissioned rail,
- stablecoin vs tokenized deposit,
- retail vs professional distribution,
- direct crypto vs tokenized-fund exposure,
- internal custody vs external custody,
- DLT venue vs bilateral/off-chain model.


## 29. Example content matrices the site should expose

### 29.1 Pattern matrix

A compare matrix across:
- product family,
- typical client segments,
- typical settlement asset,
- typical custody model,
- typical jurisdictions,
- common control hotspots,
- common market references.

### 29.2 Jurisdiction matrix

A matrix showing:
- issuance
- trading
- custody
- stablecoins/tokenized cash
- fund tokenization
- sandbox/pilot relevance
- wealth-planning sensitivity
- confidence level
- last reviewed

### 29.3 Network matrix

A matrix showing:
- participant type
- privacy model
- settlement model
- whitelisting
- DvP/PvP relevance
- operating model
- control hotspots

### 29.4 Control matrix

A matrix showing controls by:
- scenario
- jurisdiction
- client segment
- asset/product family
- custody model
- network type


## 30. Family-office, UHNW, and wealth-planning depth requirements

The original user request explicitly mentioned retail, HNW, UHNW, institutional, family office, and wealth planning. Do not treat the wealth-planning segment as an afterthought.

### 30.1 Dedicated content areas for wealth planning

Create dedicated pages and scenario overlays for:
- governance structures for holding digital assets
- custody choices for family offices
- succession, death, and incapacity planning
- concentration and liquidity management
- valuation and reporting needs
- legal/tax uncertainty register
- trustee / protector / signatory governance patterns
- beneficiary access and recovery considerations

### 30.2 Family-office simulation must include

- individual holding vs trust/company/foundation wrapper branches,
- signatory policy branches,
- disaster recovery / incapacity / death branches,
- third-party delegate and advisor oversight branches,
- reporting and valuation branches,
- illiquidity / forced-sale planning branches,
- and jurisdiction/legal-review warnings.

### 30.3 Advisory UX

Provide an “advisor conversation prep” view that turns technical details into:
- simple explanations,
- important cautions,
- next questions to ask the client,
- and flags that require specialist follow-up.


## 31. High-frequency, institutional, and large-value safekeeping depth requirements

The site should take the user’s “high frequency” and “assets of considerable size” requirement seriously.

### 31.1 High-frequency / large-value design dimensions

Every relevant pattern should expose:
- operating hours,
- settlement finality assumptions,
- pre-funding requirements,
- inventory and liquidity management,
- transfer and whitelisting latency,
- circuit breakers and throttles,
- failure and rollback handling,
- reconciliation cadence,
- concentration and intraday exposure controls.

### 31.2 Treasury and market-making overlay

Create a reusable overlay that can be applied to simulations when `latencyNeed = high` or `valueSensitivity = high`.

This overlay should:
- add intraday limit controls,
- add pre-trade and pre-transfer checks,
- add circuit-breaker logic,
- add failure-to-settle branches,
- add venue/network outage branches,
- and add reconciliation urgency.

### 31.3 Safekeeping overlay

When asset value or client sensitivity is high, add:
- stricter custody controls,
- deeper key-governance detail,
- escalation and incident requirements,
- and stronger vendor concentration warnings.


## 32. Content packs to build first

### 32.1 Initial minimum viable content inventory

A credible first release should contain at least:

- 50+ glossary terms
- 25+ concept pages
- 8 jurisdiction packs (5 deep, 3 cautious)
- 20+ product/pattern pages
- 12 simulation definitions
- 60+ control entries
- 15+ network/vendor profiles
- 10+ guided journeys
- 60+ official source cards

### 32.2 What to ship in v1 vs v1.1

#### v1
- Home / Start
- Learn
- Markets
- Networks
- Controls
- Sources
- Design Studio v1
- 6 deep simulations
- local workspace
- static search

#### v1.1
- remaining 6 simulations
- compare improvements
- AI adapters
- preview/export improvements
- richer release notes and freshness dashboards


## 33. Testing and QA plan

### 33.1 Test layers

- schema tests
- rule-engine tests
- simulation snapshot tests
- route smoke tests
- accessibility tests
- base-path deployment tests
- search index tests
- export/import tests
- stale-content tests
- AI-disabled graceful-degradation tests

### 33.2 Critical automated tests

1. Project-path deployment test (`/<project>/...` links resolve)
2. Custom-domain test (`/...` links resolve)
3. Simulation deterministic state progression test
4. Rule overlay test by jurisdiction/client segment
5. Source-card existence test
6. Stale-badge appearance test
7. Search returns known concepts and simulations
8. Export/import of workspace item is lossless
9. Pages load without JS for core reading content
10. AI adapter failure does not break site

### 33.3 Manual review checklist

- language clarity by depth level,
- legal/compliance review of Tier 1 packs,
- operational realism of simulations,
- no vendor endorsement drift,
- no inaccurate implication of legal certainty,
- no unsafe suggestion to use unapproved tools/data.


## 34. Codex implementation roadmap

### 34.1 Phase 0 — Foundation
**Goal:** working static skeleton on GitLab Pages

Tasks:
- scaffold Astro project
- add TypeScript, MDX, React
- configure base-path-safe routing
- add layout, navigation, and filters
- add CI skeleton
- add content collection schemas
- add source cards and release notes collections

Definition of done:
- builds locally and in GitLab CI
- deploys correctly to GitLab Pages
- basic pages and navigation render correctly

### 34.2 Phase 1 — Knowledge core
**Goal:** credible educational site without simulations yet

Tasks:
- glossary
- concept pages
- jurisdiction pack structure
- network/vendor pages
- control library pages
- Pagefind search
- source panel and badges

Definition of done:
- users can browse and search content with filters
- source-backed pages exist for all Tier 1 packs

### 34.3 Phase 2 — Rules and overlays
**Goal:** make the content context-aware

Tasks:
- client profile model
- persona/lens model
- deterministic rules engine
- jurisdiction/client/network overlays
- compare views

Definition of done:
- selecting a market/client/pattern changes warnings, controls, and related pages

### 34.4 Phase 3 — Deep simulations
**Goal:** ship the first six full-depth simulations

Tasks:
- simulation engine
- swimlane/timeline/event log
- artifact/export
- exception branching
- risk scoring
- control and source drawers

Definition of done:
- six simulations meet the depth standard defined above

### 34.5 Phase 4 — Design Studio
**Goal:** turn knowledge into concept outputs

Tasks:
- idea canvas
- pattern matching
- novelty meter
- challenger view
- export concept memo

Definition of done:
- a user can go from idea to markdown concept note with controls and sources

### 34.6 Phase 5 — Optional AI
**Goal:** add optional assistance without breaking static-first architecture

Tasks:
- adapter framework
- browser model option
- localhost endpoint option
- retrieval-to-summary flow
- generated-answer labeling

Definition of done:
- AI is optional, cited, and cannot override deterministic warnings

### 34.7 Phase 6 — Freshness and governance
**Goal:** keep the site current

Tasks:
- source-check script
- stale badges
- release-note generation helpers
- review workflow docs
- scheduled CI jobs

Definition of done:
- stale content is visible and reviewable before publication


## 35. Acceptance criteria by major area

### 35.1 Learn section
- every page has plain/practitioner/expert depth
- every page has related simulations and sources
- glossary terms are linked inline

### 35.2 Markets section
- every jurisdiction pack shows authorities, status, core topics, source cards, last reviewed
- every Tier 1 pack has simulation overlays and control hotspots

### 35.3 Simulation section
- every simulation has happy path + exception paths
- every simulation supports client/jurisdiction filters
- every simulation can export a summary

### 35.4 Design Studio
- can start from blank or pattern
- can output concept memo and next steps
- can show novelty and comparable patterns

### 35.5 Controls
- controls are searchable and linked to simulations/patterns
- controls list evidence examples and owner hints

### 35.6 Sources & trust
- every nontrivial page links to source cards
- stale content is visibly marked
- release notes are published

### 35.7 GitLab Pages readiness
- static build only
- base-path safe
- no mandatory server endpoints
- works with Pages deployment pipeline


## 36. Reflection and self-review of this plan

This section intentionally critiques the plan so Codex and the product owner do not over-trust it.

### 36.1 What this plan gets right

- It fits the static GitLab Pages constraint.
- It treats controls and jurisdiction as first-class.
- It supports multiple personas without forking the entire product.
- It uses deterministic rules for governance rather than relying on AI.
- It keeps AI optional and compatible with a Mac mini/local workflow.
- It explicitly includes family office, wealth planning, and high-frequency concerns.
- It makes simulations deep enough to be educationally and operationally meaningful.

### 36.2 Main risks

#### Risk 1 — Scope explosion
“Cover all personas, jurisdictions, and types” can become unbounded.

**Mitigation:** Use the Tier 1/Tier 2 pack model, ship six deep simulations first, and enforce content templates.

#### Risk 2 — False legal certainty
A site like this can accidentally sound more authoritative than it is.

**Mitigation:** Confidence labels, stale badges, source cards, mandatory “legal review required” rules, and human-reviewed updates.

#### Risk 3 — AI overreach
It is tempting to let AI act smarter than the underlying evidence.

**Mitigation:** Retrieval-first answers, deterministic rule precedence, generated-summary labels, and opt-in adapters only.

#### Risk 4 — Static-site performance degradation
Rich simulations and optional AI can bloat the frontend bundle.

**Mitigation:** partial hydration, lazy loading, code splitting, lightweight defaults, and no default model downloads.

#### Risk 5 — Content maintenance burden
Regulations and network/vendor facts change.

**Mitigation:** source registry, freshness policy, scheduled checks, release notes, and human review workflow.

#### Risk 6 — Users will want collaboration
A good internal site often grows into shared workspaces and approvals.

**Mitigation:** postpone shared server features; make exports strong; keep a clean boundary between static MVP and future collaboration features.

### 36.3 Deliberate tradeoffs

- **Chosen:** static site + local state  
  **Not chosen:** server app + database  
  **Reason:** lower cost, faster start, easier GitLab Pages deployment.

- **Chosen:** deterministic rules + optional AI  
  **Not chosen:** AI-only chat product  
  **Reason:** governance and trust matter more than novelty.

- **Chosen:** curated source cards + editorial workflow  
  **Not chosen:** unrestricted web-search-at-runtime  
  **Reason:** static deployment, reliability, and control.

- **Chosen:** tiered jurisdiction coverage  
  **Not chosen:** pretending to cover the entire world equally  
  **Reason:** realism and maintainability.

### 36.4 What I would tighten if the project starts slipping

If time becomes tight, cut in this order:
1. external AI adapter
2. in-browser AI adapter
3. service worker/offline polish
4. advanced compare visualizations
5. Tier 2 jurisdiction depth

Do **not** cut:
- source cards,
- controls,
- rules engine,
- the first six deep simulations,
- base-path-safe GitLab Pages deployment,
- family office/UHNW and institutional depth.

### 36.5 Final recommendation after reflection

This should be built as a **static knowledge-and-simulation product** first, not as a bespoke “AI crypto portal”. The moat is the combination of:
- trustworthy curation,
- simulation depth,
- persona adaptation,
- jurisdiction overlays,
- and control intelligence.

That is the right shape for a serious internal tool in financial services.


## 37. Build instructions for a Mac mini

### 37.1 Local setup checklist

Install:
- Git
- Node.js LTS
- pnpm (recommended)
- a modern browser with WebGPU support if testing in-browser AI
- optional local AI runtime such as Ollama, only if desired

### 37.2 Local workflow

```bash
git clone <repo>
cd digital-asset-studio
corepack enable
pnpm install
pnpm content:validate
pnpm content:graph
pnpm dev
```

### 37.3 Production build locally

```bash
export PUBLIC_SITE_URL="https://<your-pages-url>/"
export PUBLIC_BASE_PATH="/<your-project>/"
pnpm build
```

Then test the built site locally before pushing.

### 37.4 Operational recommendation

Use the Mac mini for:
- local development,
- content authoring,
- visual QA,
- optional local AI experimentation,
- and scheduled local dry runs if preferred.

Use GitLab CI/CD for:
- authoritative build,
- review pipelines,
- and Pages publication.


## 38. Suggested first backlog for Codex

1. Scaffold Astro repo with GitLab Pages-safe base path handling  
2. Add content collections and schemas  
3. Build layout, home page, start-here flow, and source panel  
4. Add glossary + concept pages + related content graph  
5. Add jurisdiction packs for CH, EU, UK, SG, HK  
6. Add network/vendor pages for SDX, Kinexys, UBS Tokenize, Chainlink DTA, SG-FORGE, DigiFT, plus generic public/permissioned patterns  
7. Add control library and rule engine  
8. Build simulations 1–3  
9. Build simulations 4–6  
10. Build Design Studio v1  
11. Add local workspace, export/import  
12. Add Pagefind search and compare views  
13. Add stale badges and source freshness checks  
14. Add optional AI adapter framework  
15. Add Tier 2 jurisdiction packs and remaining simulations

This backlog is the best balance between ambition and real delivery.


## 39. Research basis and key official sources to seed the source register

Below is a pragmatic starter source register. These are the kinds of sources the site should cite and monitor. The site itself should store these as structured source cards, not only as prose.

### 39.1 Market and platform references

- UBS Tokenize — UBS page on tokenized bonds, funds, and structured products  
- UBS / DigiFT / Chainlink press materials on live tokenized fund workflow  
- Chainlink Digital Transfer Agent materials  
- SDX official site and regulatory descriptions  
- J.P. Morgan Kinexys official materials and corporate announcements  
- SG-FORGE / CoinVertible official pages  
- DigiFT official materials where relevant

### 39.2 Switzerland

- FINMA Guidance 01/2026 on custody of crypto-based assets
- Swiss federal/SIF materials on DLT, blockchain, and tokenization
- FINMA materials on DLT trading facilities and licensing
- SDX regulatory/reference pages

### 39.3 European Union

- ESMA MiCA page and interim register
- ESMA machine-readable reporting/order-book materials
- ESMA DLT Pilot materials
- EU DORA materials
- EBA crypto exposure materials as relevant

### 39.4 United Kingdom

- Bank of England / FCA Digital Securities Sandbox pages
- FCA page on the future UK cryptoasset regime
- FCA materials related to Project Guardian and tokenization policy work

### 39.5 Singapore

- MAS Project Guardian pages and commercialization outputs
- Guardian Funds Framework and tokenized-fund lifecycle materials
- MAS stablecoin framework pages
- MAS digital-token service provider notices/guidelines

### 39.6 Hong Kong

- SFC ASPIRe roadmap
- SFC VATP and product-framework materials
- HKMA stablecoin issuer regime materials
- SFC / FSTB dealer/custodian consultation outcomes

### 39.7 United States

- SEC materials clarifying application of securities laws to crypto assets
- FDIC crypto-activity guidance
- federal banking agency FAQs on tokenized securities treatment
- OCC stablecoin/payment-token materials

### 39.8 UAE / ADGM

- ADGM/FSRA digital-asset guidance pages
- ADGM fiat-referenced token framework materials

### 39.9 Japan

- FSA payment-services / stablecoin / crypto framework materials
- Japan travel-rule guidance and amendments

### 39.10 Global standards and controls

- Basel Committee materials on prudential treatment of cryptoasset exposures
- NIST CSF 2.0
- FIPS 140-3
- FATF targeted update and travel-rule best-practice materials
- ISO 20022 and ISO 24165 reference materials
- CCSS reference materials

### 39.11 Static-site and local-AI technical sources

- GitLab Pages documentation
- GitLab Pages access control / base URL / redirects / limits docs
- Pagefind documentation
- Astro documentation on content collections and `base` configuration
- WebLLM documentation
- Transformers.js documentation
- Ollama local API / origin configuration docs

## 40. Final instruction to Codex

Build this as a **repository-first static product** with:
- strong typed content collections,
- deterministic rules,
- deep simulations,
- local workspace,
- optional AI,
- and GitLab Pages-safe deployment from day one.

Do not start by building “chat”. Start by building:
1. content model,
2. source model,
3. rules model,
4. simulation model,
5. static deployment correctness.

That sequencing will produce a site that is actually trustworthy, extendable, and useful.



## 41. Selected source URLs to seed the repository source register

The list below is not exhaustive. It is a practical starter set of official or primary sources captured during the research for this plan. Store them in the repo as structured source cards with metadata, last-reviewed dates, and tags.

### 41.1 Bank / market / platform references

- UBS Tokenize — <https://www.ubs.com/global/en/investment-bank/tokenize.html>
- UBS Asset Management launches its first tokenized investment fund — <https://www.ubs.com/global/en/media/display-page-ndp/en-20241101-first-tokenized-investment-fund.html>
- UBS executes first live tokenized fund transaction leveraging Chainlink DTA — <https://www.ubs.com/global/en/media/display-page-ndp/en-20251104-chainlink.html>
- Chainlink Digital Transfer Agent technical standard — <https://chain.link/digital-transfer-agent-technical-standard>
- Chainlink DTA docs: How it works — <https://docs.chain.link/dta-technical-standard/how-it-works>
- Chainlink DTA docs: Actors — <https://docs.chain.link/dta-technical-standard/actors>
- Chainlink DTA docs: Architecture — <https://docs.chain.link/dta-technical-standard/concepts/architecture>
- SDX official site — <https://www.sdx.com/>
- Kinexys by J.P. Morgan — <https://www.jpmorgan.com/kinexys/index>
- Kinexys Digital Payments — <https://www.jpmorgan.com/kinexys/digital-payments>
- Kinexys Digital Payments developer documentation — <https://developer.payments.jpmorgan.com/docs/treasury/global-payments/capabilities/global-payments-2/jpm-coin-system>
- Introducing Kinexys — <https://www.jpmorgan.com/insights/payments/blockchain-digital-assets/introducing-kinexys>
- SG-FORGE home — <https://www.sgforge.com/>
- SG-FORGE CoinVertible — <https://www.sgforge.com/product/coinvertible/>
- SG-FORGE USD CoinVertible announcement — <https://www.sgforge.com/usd-stablecoin-bny-custodian/>
- DigiFT official site — <https://www.digift.io/>

### 41.2 Switzerland

- FINMA news release on custody guidance — <https://www.finma.ch/en/news/2026/01/20260112-mm-am-01-26/>
- FINMA Guidance 01/2026 PDF — <https://www.finma.ch/en/~/media/finma/dokumente/dokumentencenter/myfinma/4dokumentation/finma-aufsichtsmitteilungen/20260112-finma-aufsichtsmitteilung-01-2026.pdf?hash=D9301598FF6F909630F88578731A50DE&sc_lang=en>
- FINMA guidance index — <https://www.finma.ch/en/documentation/finma-guidance/>

### 41.3 European Union

- ESMA MiCA page — <https://www.esma.europa.eu/esmas-activities/digital-finance-and-innovation/markets-crypto-assets-regulation-mica>
- ESMA databases and registers — <https://www.esma.europa.eu/publications-and-data/databases-and-registers>
- ESMA home — <https://www.esma.europa.eu/>
- EBA draft technical standards on crypto-asset exposures — <https://www.eba.europa.eu/publications-and-media/press-releases/eba-publishes-draft-technical-standards-prudential-treatment-crypto-asset-exposures-under-capital>

### 41.4 United Kingdom

- Bank of England Digital Securities Sandbox — <https://www.bankofengland.co.uk/financial-stability/digital-securities-sandbox>
- Bank of England DSS operational guidance — <https://www.bankofengland.co.uk/financial-stability/digital-securities-sandbox/guidance-on-operation-digital-securities-sandbox>
- FCA Digital Securities Sandbox — <https://www.fca.org.uk/firms/innovation/digital-securities-sandbox>
- FCA new regime for cryptoasset regulation — <https://www.fca.org.uk/firms/new-regime-cryptoasset-regulation>
- FCA statement on Project Guardian tokenisation report — <https://www.fca.org.uk/news/statements/fca-welcomes-project-guardian-report-tokenisation>

### 41.5 Singapore

- MAS Project Guardian — <https://www.mas.gov.sg/schemes-and-initiatives/project-guardian>
- MAS stablecoin regulatory framework — <https://www.mas.gov.sg/news/media-releases/2023/mas-finalises-stablecoin-regulatory-framework>
- Project Guardian open and interoperable networks report — <https://www.mas.gov.sg/publications/monographs-or-information-paper/2023/project-guardian-open-interoperable-networks>

### 41.6 Hong Kong

- SFC ASPIRe roadmap — <https://www.sfc.hk/en/News-and-announcements/Policy-statements-and-announcements/A-S-P-I-Re-for-a-brighter-future-SFCs-regulatory-roadmap-for-Hong-Kongs-virtual-asset-market>
- SFC framework for VA perpetuals on VATPs — <https://www.sfc.hk/en/News-and-announcements/Policy-statements-and-announcements/A-high-level-framework-for-virtual-asset-perpetual-contracts-offering-by-VATP>
- HKMA stablecoin issuers regime — <https://www.hkma.gov.hk/eng/key-functions/international-financial-centre/stablecoin-issuers/>
- HKMA implementation press release — <https://www.hkma.gov.hk/eng/news-and-media/press-releases/2025/07/20250729-4/>
- HKMA explanatory note on licensing stablecoin issuers — <https://www.hkma.gov.hk/media/eng/doc/key-functions/ifc/stablecoin-issuers/Explanatory_Notes_on_Licensing_of_Stablecoin_Issuers_eng.pdf>

### 41.7 United States

- SEC crypto-assets interpretive release page — <https://www.sec.gov/rules-regulations/2026/03/s7-2026-09>
- SEC press release on application of securities laws to crypto assets — <https://www.sec.gov/newsroom/press-releases/2026-30-sec-clarifies-application-federal-securities-laws-crypto-assets>
- FDIC crypto-related activities guidance — <https://www.fdic.gov/news/press-releases/2025/fdic-clarifies-process-banks-engage-crypto-related-activities>
- FDIC FIL summary page — <https://www.fdic.gov/news/financial-institution-letters/2025/fdic-clarifies-process-banks-engage-crypto-related>
- Federal Reserve press release on tokenized securities capital treatment — <https://www.federalreserve.gov/newsevents/pressreleases/bcreg20260305a.htm>
- OCC GENIUS Act proposed rule release — <https://www.occ.treas.gov/news-issuances/bulletins/2026/bulletin-2026-3.html>
- OCC news release on proposed rule — <https://www.occ.treas.gov/news-issuances/news-releases/2026/nr-occ-2026-9.html>

### 41.8 UAE / ADGM

- ADGM VA guidance (10 June 2025) — <https://en.adgm.thomsonreuters.com/rulebook/guidance-regulation-virtual-asset-activities-adgm-10-june-2025>
- ADGM proposed fiat-referenced-token framework — <https://www.adgm.com/media/announcements/fsra-of-adgm-publishes-proposed-regulatory-framework-for-regulated-activities-involving-fiat-referenced-tokens>
- ADGM finalised fiat-referenced-token framework — <https://www.adgm.com/media/announcements/adgm-fsra-finalises-regulatory-framework-for-regulated-activities-involving-fiat-referenced-tokens>

### 41.9 Japan

- FSA 2025 paper on regulatory systems related to cryptoassets — <https://www.fsa.go.jp/en/news/2025/20250410_2/01.pdf>
- FSA participation in Project Guardian — <https://www.fsa.go.jp/en/news/2023/20230626.html>
- FSA 2025 news index — <https://www.fsa.go.jp/en/news/2025.html>

### 41.10 Global standards and controls

- Basel prudential treatment of cryptoasset exposures — <https://www.bis.org/bcbs/publ/d545.pdf>
- Basel summary — <https://www.bis.org/fsi/fsisummaries/crypto_exposures.pdf>
- NIST CSF 2.0 — <https://nvlpubs.nist.gov/nistpubs/CSWP/NIST.CSWP.29.pdf>
- NIST Cybersecurity Framework hub — <https://www.nist.gov/cyberframework>
- FIPS 140-3 overview — <https://csrc.nist.gov/pubs/fips/140-3/final>
- FIPS 140-3 PDF — <https://nvlpubs.nist.gov/nistpubs/FIPS/NIST.FIPS.140-3.pdf>
- FATF targeted update on virtual assets and VASPs (2025) — <https://www.fatf-gafi.org/en/publications/Fatfrecommendations/targeted-update-virtual-assets-vasps-2025.html>
- FATF Best Practices on Travel Rule Supervision — <https://www.fatf-gafi.org/content/dam/fatf-gafi/recommendations/Best-Practices-Travel-Rule-Supervision.pdf>
- FATF Recommendations — <https://www.fatf-gafi.org/en/publications/Fatfrecommendations/Fatf-recommendations.html>
- CCSS overview — <https://cryptoconsortium.org/standards-2/>
- CCSS details / current version info — <https://cryptoconsortium.org/cryptocurrency-security-standard-documentation/details/>
- ISO 20022 FAQ — <https://www.iso20022.org/faq>
- ISO 24165-1 DTI — <https://www.iso.org/standard/80601.html>

### 41.11 GitLab Pages and static-site technical references

- GitLab Pages overview — <https://docs.gitlab.com/user/project/pages/>
- GitLab Pages settings / intro — <https://docs.gitlab.com/user/project/pages/introduction/>
- GitLab Pages access control — <https://docs.gitlab.com/user/project/pages/pages_access_control/>
- Astro getting started — <https://docs.astro.build/en/getting-started/>
- Astro install — <https://docs.astro.build/en/install-and-setup/>
- Astro configuration reference — <https://docs.astro.build/en/reference/configuration-reference/>
- Astro CLI reference (`--base`, `--site`) — <https://docs.astro.build/en/reference/cli-reference/>
- Astro content collections guide — <https://docs.astro.build/it/guides/content-collections/>
- Astro content collections API — <https://docs.astro.build/en/reference/modules/astro-content/>
- Pagefind overview — <https://pagefind.app/>
- Pagefind getting started — <https://pagefind.app/docs/>
- Pagefind API — <https://pagefind.app/docs/api/>
- WebLLM docs — <https://webllm.mlc.ai/docs/>
- WebLLM home / protocol site — <https://www.webllm.org/>
- Transformers.js docs — <https://huggingface.co/docs/transformers.js/en/index>
- Ollama API introduction — <https://docs.ollama.com/api/introduction>
- Ollama quickstart — <https://docs.ollama.com/quickstart>
- Ollama FAQ (including additional origins / local-only notes) — <https://docs.ollama.com/faq>

## 42. Final note on research usage

Use official and primary sources wherever possible. When the site includes market-practice summaries or vendor descriptions, bind them to official pages and clearly label them as:
- official rule/guidance,
- official platform/company material,
- or market interpretation.

The repository should never allow a Tier 1 jurisdiction claim to exist without at least one linked official source card.


---

## 43. Gap review and v2.0 decisions

The v1 plan is already strong on scope, personas, jurisdiction packs, simulation depth, and static-first deployment. The main gaps are not conceptual; they are operational. To make the build consistently high-grade on a Mac mini + GitLab Pages workflow, Codex must now treat the following items as **mandatory** rather than “nice to have”.

### 43.1 Gaps found during review

| Gap | Why it matters | Mandatory fix in v2.0 |
|---|---|---|
| Product-exploration frameworks are missing | Users need to judge strategy, feasibility, delivery, and economics — not only legal/technical fit | Add a full **Strategy & Venture Workbench** with PESTEL, Porter’s Five Forces, feasibility/viability/desirability, RACI, PBS, WBS, and a business-model simulator |
| Playwright is mentioned but not mandated deeply enough | High-grade UX requires regression, accessibility, visual, and path-prefix coverage | Make **Playwright non-negotiable** with a route, feature, visual, accessibility, export, and base-path matrix |
| No AGENTS.md contract | Future feature work may drift away from the architectural and quality bar | Add **AGENTS.md** and require Codex to read it before making changes |
| Upgrade path is under-specified | Regulations, markets, vendors, and standards will keep changing | Add a **market-change engine**, versioned content packs, source freshness rules, workspace migrations, and deprecation mechanics |
| Business-model simulation is absent | Product ideas need economics, resourcing, and sensitivity analysis | Add an **interactive business-model simulator** with adjustable parameters and exportable charts |
| Strategic visuals are under-specified | Users need to present insights clearly and export them | Add explicit requirements for **SVG-first visualizations** and export support |
| Definition of done is not strong enough for autonomous build runs | Codex may stop too early or declare success without deep coverage | Add a **BUILD_STATUS.json** contract plus `pnpm verify:ci` as the hard gate |
| CI quality gates are too light for “high grade” | Build quality needs proof, not aspiration | Require lint, types, unit, content, build, search, Playwright, accessibility, visual, export, and stale-source checks in CI |

### 43.2 v2.0 operating decision

The site is no longer only a “knowledge + simulation” product. It is now a **Digital Asset Studio + Strategy & Venture Workbench**.

That means it must support four classes of work:

1. **Education** — learn the concepts.
2. **Operational simulation** — understand how the lifecycle works.
3. **Strategic/product exploration** — test whether a new idea is sensible and how it could be delivered.
4. **Governance and upgradeability** — keep answers trustworthy as markets and rules change.

### 43.3 Non-negotiable v2.0 outcomes

Codex must not consider the application complete until the repo contains all of the following:

- a working static Astro app deployable on GitLab Pages;
- the original knowledge, simulation, controls, and jurisdiction capabilities from v1;
- the new **Strategy & Venture Workbench**;
- the new **Business Model Simulator**;
- mandatory **Playwright** coverage;
- an **AGENTS.md** contract in the repo root;
- upgrade/freshness/versioning capabilities;
- a `BUILD_STATUS.json` file that records readiness truthfully.

---

## 44. Strategy & Venture Workbench

This section **extends and partly supersedes** Sections 18 and 29 where needed.

### 44.1 Purpose

Users must be able to move from:

> “I think there may be a product here”

to:

> “Here is a structured strategic, operational, economic, and governance assessment with clear visuals, assumptions, and next steps.”

This workbench should be usable by product, strategy, institutional coverage, wealth, innovation, operations, legal, risk, and executive users.

### 44.2 Workbench route structure

Add these routes:

```text
/studio/
/studio/idea/
/studio/strategy/
/studio/strategy/pestel/
/studio/strategy/five-forces/
/studio/strategy/fvd/
/studio/operating-model/raci/
/studio/delivery/pbs/
/studio/delivery/wbs/
/studio/business-model/
/studio/decision-pack/
```

### 44.3 Workbench tabs

Every exploration project should have the following tabs or panels:

1. **Idea framing**
2. **Market and external forces**
3. **Feasibility / Viability / Desirability**
4. **Operating model and accountability**
5. **Product structure and delivery breakdown**
6. **Business model and scenario economics**
7. **Governance, risks, and controls**
8. **Decision pack and exports**

### 44.4 Shared project object

The workbench should use a shared project model:

```ts
type ExplorationProject = {
  id: string;
  title: string;
  summary: string;
  problemStatement: string;
  targetClientSegments: string[];
  targetJurisdictions: string[];
  assetFamilies: string[];
  productPattern?: string;
  networksOrRails: string[];
  assumptions: Assumption[];
  evidenceLinks: string[];
  tags: string[];
  lastEditedAt: string;
  schemaVersion: number;
};
```

### 44.5 PESTEL analysis

#### Objective
Help users understand macro forces that affect the product idea.

#### Dimensions
- Political
- Economic
- Social
- Technological
- Environmental
- Legal / Regulatory

#### Required data model

```ts
type PestelEntry = {
  category: 'political' | 'economic' | 'social' | 'technological' | 'environmental' | 'legal';
  factor: string;
  effectDirection: 'tailwind' | 'headwind' | 'mixed' | 'unknown';
  impactScore: 1 | 2 | 3 | 4 | 5;
  certaintyScore: 1 | 2 | 3 | 4 | 5;
  timeHorizon: 'near' | 'mid' | 'long';
  evidence: string[];
  notes?: string;
};
```

#### UI requirements
- editable card list;
- aggregate heatmap;
- weighted summary score;
- per-jurisdiction comparison;
- “what changed by market?” diff view.

#### Visual requirements
- category heatmap;
- radar/spider summary;
- evidence-linked factor table.

### 44.6 Porter’s Five Forces analysis

#### Forces
- threat of new entrants
- bargaining power of suppliers
- bargaining power of buyers
- threat of substitutes
- rivalry among existing competitors

#### Required fields

```ts
type FiveForcesEntry = {
  force: 'new-entrants' | 'suppliers' | 'buyers' | 'substitutes' | 'rivalry';
  strength: 1 | 2 | 3 | 4 | 5;
  rationale: string;
  evidence: string[];
  mitigants: string[];
  opportunities: string[];
};
```

#### Outputs
- force radar;
- narrative summary;
- “defensible / undifferentiated / crowded / controllable” labels;
- competitor and substitute notes.

### 44.7 Feasibility / Viability / Desirability (FVD)

This is a core decision model for new product exploration.

#### Definitions
- **Feasibility** — can we build and operate it?
- **Viability** — can it make business and control sense?
- **Desirability** — do clients and internal stakeholders actually need it?

#### Required scoring model

```ts
type FvdAssessment = {
  feasibility: ScoreBlock;
  viability: ScoreBlock;
  desirability: ScoreBlock;
  thresholds: {
    pass: number;
    caution: number;
  };
};
type ScoreBlock = {
  score: number; // 0-100
  drivers: { label: string; value: number; notes?: string }[];
  blockers: string[];
  evidence: string[];
};
```

#### Required outputs
- triangle or three-axis score view;
- weighted scorecard;
- pass / caution / stop recommendation;
- key blockers list;
- “what evidence is still missing?” panel.

### 44.8 RACI operating model

The workbench must help users define accountability.

#### Default actor pool
- Front office / sales / RM
- Product
- Operations
- Custody
- Legal
- Compliance / FCC / AML
- Risk / NFR
- Finance / tax / accounting
- Engineering
- Cyber / security
- Data / reporting
- Executive sponsor
- External partner / vendor
- Client / issuer / fund manager (where relevant)

#### Required model

```ts
type RaciMatrix = {
  activities: string[];
  roles: string[];
  assignments: Record<string, Record<string, 'R' | 'A' | 'C' | 'I' | ''>>;
};
```

#### UX requirements
- editable matrix;
- templated by scenario;
- warnings when an activity has:
  - no Accountable owner,
  - more than one Accountable owner,
  - no Responsible owner.

#### Visual requirements
- matrix heatmap with export to SVG/PNG/PDF-friendly layout;
- lane-filtered view by function.

### 44.9 Product Breakdown Structure (PBS)

Users need to decompose a proposed product into constituent parts.

#### Typical top-level PBS branches
- Client proposition
- Legal wrapper
- Asset representation
- Distribution
- Settlement
- Custody
- Controls
- Reporting
- Servicing / corporate actions
- Vendor / network dependencies
- Documentation and approvals

#### Required object

```ts
type ProductBreakdownNode = {
  id: string;
  label: string;
  type: 'capability' | 'artifact' | 'control' | 'integration' | 'dependency';
  children?: ProductBreakdownNode[];
  notes?: string;
};
```

#### Visual requirements
- collapsible tree;
- printable hierarchy;
- “show only controls” and “show only external dependencies” filters.

### 44.10 Work Breakdown Structure (WBS)

Users need to understand delivery effort, not just product structure.

#### Required delivery phases
- Discovery
- Legal / compliance review
- Design
- Architecture
- Build
- Integration
- Testing
- Pilot / sandbox
- Launch readiness
- Post-launch governance

#### Required object

```ts
type WorkBreakdownItem = {
  id: string;
  name: string;
  phase: string;
  ownerRole: string;
  durationEstimateDays?: number;
  predecessors?: string[];
  deliverables?: string[];
  risks?: string[];
  status?: 'not-started' | 'in-progress' | 'blocked' | 'done';
};
```

#### Required views
- hierarchy tree;
- dependency list;
- lightweight Gantt/timeline;
- critical-path indicator;
- role workload summary.

### 44.11 Decision pack

Every workbench project must export a **Decision Pack** containing:

- idea summary;
- comparables;
- PESTEL;
- Porter’s Five Forces;
- FVD summary;
- RACI matrix;
- PBS tree;
- WBS view;
- business-model scenarios;
- key risks and controls;
- jurisdiction warnings;
- open questions;
- recommended next steps.

Exports must support:
- Markdown
- JSON bundle
- SVG/PNG for charts and diagrams
- print-friendly HTML

---

## 45. Business Model Simulator

This section is new and mandatory.

### 45.1 Purpose

A proposing user must be able to ask:

- Could this be commercially sensible?
- What assumptions matter most?
- Where do costs accumulate?
- What does the control burden do to the economics?
- Does the answer change by client segment, market, network, or operating model?

### 45.2 Simulator principles

- client-side only for MVP;
- deterministic math first;
- no need for real confidential data;
- allow conservative ranges when precise values are unknown;
- always separate **assumptions** from **facts**;
- export all assumptions with every result.

### 45.3 Simulator modes

Create templates for at least:

1. Wealth/distribution model
2. Institutional issuance model
3. Tokenized-fund servicing model
4. Treasury / settlement rail model
5. Custody / safekeeping service model
6. Platform / venue / network-access model

### 45.4 Required inputs

#### Revenue inputs
- onboarding fees
- custody fees
- issuance/origination fees
- servicing fees
- transaction fees
- spread or margin assumptions
- AUM / AUC / notional assumptions
- client growth assumptions
- utilization / turnover assumptions

#### Cost inputs
- engineering build cost
- integration cost
- legal/compliance cost
- operations staffing
- cyber/security tooling
- custody / infrastructure vendor cost
- network / gas / settlement fees
- support / servicing cost
- audit / assurance cost
- review / change-management cost

#### Risk and control inputs
- expected incident rate
- loss-event severity estimate
- control intensity score
- external dependency concentration score
- regulator / approval friction score
- resilience cost uplift
- capital / liquidity burden proxy score

#### Adoption inputs
- addressable client base
- conversion rate
- pilot-to-launch delay
- churn / attrition
- launch jurisdiction sequence
- feature rollout sequence

### 45.5 Required model object

```ts
type BusinessModelScenario = {
  id: string;
  label: string;
  template: string;
  assumptions: Record<string, number | string | boolean>;
  notes?: string;
  createdAt: string;
  updatedAt: string;
  schemaVersion: number;
};
```

### 45.6 Required computed outputs

- annualized revenue;
- variable vs fixed cost split;
- gross margin;
- contribution margin;
- estimated break-even month;
- payback period;
- scenario comparison table;
- sensitivity ranking of the most important assumptions;
- control-burden-adjusted profitability score;
- launch complexity index.

### 45.7 Required visuals

- waterfall chart;
- break-even curve;
- sensitivity tornado chart;
- scenario comparison bars;
- parameter slider panel;
- “risk vs reward” quadrant.

Implementation note:
- Prefer **SVG-based charts** for exportability and accessibility.
- Avoid canvas-only charts for critical visuals.
- Use plain SVG or a lightweight React/SVG library. If a charting library is used, it must still export deterministic SVG cleanly.

### 45.8 Business model narrative generator

The site should generate a human-readable summary from the scenario:

- strongest economic drivers;
- weakest assumptions;
- likely blockers to launch;
- where control cost changes the picture materially;
- what data would most improve confidence.

This can be deterministic template logic first, optional AI polish second.

### 45.9 Commercial realism rules

Do not let the simulator imply precision it does not have.

Display:
- scenario mode,
- confidence label,
- assumption completeness,
- uncertainty notes,
- and “illustrative internal planning only”.

---

## 46. Visual system and interaction standards for analysis outputs

### 46.1 Visual families that must exist

The application must support these visual families:

- swimlane lifecycle diagrams
- timelines
- event logs
- matrices
- trees / hierarchies
- heatmaps
- radar charts
- waterfall charts
- break-even lines
- tornado sensitivity charts
- network/dependency maps

### 46.2 SVG-first rule

All critical diagrams should render as **accessible SVG** where practical so they are:
- crisp on retina displays,
- inspectable,
- keyboard-focusable where relevant,
- and exportable.

### 46.3 Export rule

If a user can see a chart or matrix, they should be able to export:
- the current data as JSON,
- the textual interpretation as Markdown,
- and the visual as SVG/PNG when relevant.

### 46.4 No “dead visuals”

No chart should appear without:
- visible labels,
- legend or meaning,
- supporting summary,
- source or assumption hooks,
- and an empty-state explanation when data is incomplete.

### 46.5 Presentation mode

Add a presentation-friendly mode for exports and internal sharing:
- less chrome,
- larger text,
- condensed summary cards,
- print-friendly page breaks.

---

## 47. High-grade UX and performance standards

This section strengthens Sections 11 and 21.

### 47.1 Experience bar

The application should feel like a polished internal product, not a prototype dump.

Required characteristics:
- fast first load for reading flows;
- clear progressive disclosure;
- stable layout;
- obvious navigation;
- excellent keyboard support;
- elegant empty states;
- consistent visual language;
- low-friction exports and comparisons.

### 47.2 Performance budgets

Use explicit budgets for the static site:

- core reading routes should remain usable with minimal JS;
- route-level code splitting for simulations and studio features;
- avoid loading charting/AI bundles on routes that do not need them;
- keep critical route JS small enough that the site still feels responsive on corporate hardware and VPN conditions.

Recommended engineering budget targets:
- core reading pages: small interactive payload only;
- non-critical libraries lazy loaded;
- images optimized and pre-sized;
- avoid model downloads by default.

### 47.3 Accessibility bar

Meet a strong accessibility standard in practice, not just in prose:

- semantic HTML first;
- visible focus states;
- role-based interactive controls;
- no hover-only information;
- screen-reader labels on charts and filters;
- color contrast checks;
- reduced-motion compliance;
- keyboard coverage for all important journeys.

### 47.4 Responsive rules

Required viewports:
- laptop default
- wide desktop
- tablet portrait/landscape
- small mobile (for quick reference even if the richest tools are desktop-oriented)

### 47.5 Readability rules

- depth switch must genuinely change wording density;
- client-facing explanations must avoid engineering jargon;
- expert view must preserve rigor and not “dumb down” material;
- source and stale-state indicators must be easy to see.

---

## 48. Mandatory Playwright-first test architecture

This section **supersedes Section 33** where there is any conflict. Playwright is now a core build requirement, not a finishing task.

### 48.1 Mandatory policy

Every material user-facing feature must have Playwright coverage. When a feature changes, related Playwright tests must change in the same branch.

No merge is complete if:
- the behavior changed,
- and the Playwright coverage did not evolve.

### 48.2 Required test layers

1. Unit / schema / utility tests
2. Integration tests for rules and simulations
3. **Playwright E2E tests**
4. Visual regression tests
5. Accessibility checks
6. Static-build and base-path tests
7. Content freshness / source linkage tests

### 48.3 Required Playwright projects

Configure Playwright projects for at least:

- Chromium
- Firefox
- WebKit
- GitLab Pages prefixed base path
- root-path local preview
- mobile viewport smoke project
- no-JS reading project where feasible

Implementation hint:
- use Playwright projects to vary baseURL, browser, and viewport settings.

### 48.4 Required Playwright suites

#### A. Route smoke
- every major route loads without error;
- 404 route behaves correctly;
- navigation and breadcrumbs work.

#### B. Start and Learn flows
- persona chooser works;
- depth switch changes visible content;
- glossary links resolve;
- sources drawer opens.

#### C. Markets and governance
- jurisdiction selector changes content and warnings;
- stale badges render when expected;
- confidence badges render correctly;
- source cards exist for regulatory assertions.

#### D. Simulations
- happy path progression works;
- exception path branches render;
- state is preserved in local workspace;
- exports are generated;
- control drawer updates with selected context.

#### E. Strategy & Venture Workbench
- PESTEL create/edit/export flow;
- Five Forces create/edit/export flow;
- FVD scoring updates;
- RACI matrix editing;
- PBS tree editing;
- WBS dependency editing;
- decision pack export.

#### F. Business Model Simulator
- scenario loads;
- sliders/inputs recompute outputs;
- scenario comparison works;
- export contains current assumptions;
- charts render in accessible form.

#### G. Workspace and persistence
- save / reload local workspace;
- import/export round-trip;
- schema migration for older workspace versions.

#### H. Search and compare
- Pagefind returns expected results;
- compare view renders deltas for selected items.

#### I. Accessibility
- axe scan on critical pages;
- keyboard-only navigation on primary flows;
- focus order sanity;
- labels on interactive elements.

#### J. Visual regression
- home page
- a concept page
- a market pack page
- a simulation page
- strategy workbench views
- business model simulator
- exported chart/container components where stable enough

### 48.5 Accessibility testing requirement

Use `@axe-core/playwright` for automated accessibility scans, plus manual review checklists for items automation cannot guarantee.

### 48.6 Visual regression requirement

Use Playwright screenshot assertions for stable, high-value routes and components. Keep snapshots purposeful and not overly brittle.

### 48.7 Failure artifacts

On CI failures, retain:
- Playwright traces,
- screenshots,
- visual diffs,
- videos on retry,
- HTML report.

### 48.8 Required scripts

The repo must expose at least:

```json
{
  "scripts": {
    "verify:fast": "pnpm content:validate && pnpm typecheck && pnpm test",
    "e2e:install": "playwright install --with-deps",
    "e2e": "playwright test",
    "e2e:ci": "playwright test --reporter=line,html",
    "verify:ci": "pnpm content:validate && pnpm typecheck && pnpm lint && pnpm test && pnpm build && pnpm e2e:ci"
  }
}
```

If additional quality checks exist, `verify:ci` must include them.

### 48.9 CI gate rule

GitLab CI must block deploys when any of the following fail:
- type checks
- lint
- unit/integration tests
- static build
- Playwright
- content validation
- base-path correctness
- stale-source policy checks (for release branches / scheduled runs)

---

## 49. GitLab Pages deployment enhancements

This section extends Section 22 with stricter operationalization.

### 49.1 Base-path correctness is mandatory

Because GitLab Pages often serves project sites from `/<project>/`, the application must treat base-path correctness as a first-order engineering concern, not a post-build fix.

Required rules:
- all internal links use framework-safe helpers;
- assets resolve under both root-path and project-path previews;
- search assets and exported links are base-aware;
- Playwright must test both root and prefixed deployments.

### 49.2 Review previews

Use GitLab review apps or Pages parallel deployments for merge-request previews so legal, risk, design, and product reviewers can inspect changes before publishing.

### 49.3 Scheduled freshness jobs

Add scheduled CI jobs for:
- source checks,
- stale content detection,
- dependency updates,
- snapshot refresh review,
- workspace migration tests.

### 49.4 Release train concept

Use a simple release discipline:
- feature branches
- review preview
- default-branch release
- release notes entry
- content freshness summary

### 49.5 Recommended CI stages

```text
validate -> test -> build -> e2e -> preview -> deploy -> scheduled-freshness
```

---

## 50. Upgradeability and market-change engine

This is a new mandatory capability.

### 50.1 Why it matters

Markets, regulations, vendors, standards, and product patterns will change. The app must be designed to evolve without a rewrite.

### 50.2 Upgrade model

Use four layers of upgradeability:

1. **Content pack versioning**
2. **Source freshness monitoring**
3. **Workspace schema migrations**
4. **Feature flags / capability switches**

### 50.3 Content pack semver

Every major content or rules pack should include a semantic version:

```ts
type ContentPackVersion = {
  id: string;
  version: string; // e.g. 1.4.0
  releasedAt: string;
  changes: string[];
  backwardCompatible: boolean;
};
```

Use this for:
- jurisdiction packs,
- rules packs,
- simulation definitions,
- strategy templates,
- business model templates.

### 50.4 Workspace schema migration

Saved local workspaces must survive future app upgrades.

Required rules:
- every saved object includes `schemaVersion`;
- migration functions exist for old versions;
- import tests verify forward migration;
- migration notes appear in release notes when breaking changes occur.

### 50.5 Source freshness policy

Each source card should include:
- `lastReviewed`
- `staleAfterDays`
- `owner`
- `criticality`
- `impactAreas`

Example:
```ts
type FreshnessPolicy = {
  staleAfterDays: number;
  criticality: 'low' | 'medium' | 'high';
  owner: string;
  impactAreas: string[];
};
```

### 50.6 Staleness scoring

Generate a staleness score for each content node based on:
- oldest critical source,
- presence of superseding publications,
- market volatility,
- rule change status (final / draft / transitional).

### 50.7 Change impact workflow

When a source changes materially, the site should be able to flag:
- affected jurisdictions,
- affected simulations,
- affected controls,
- affected networks/vendors,
- and whether the change is educational only, governance-relevant, or structurally breaking.

### 50.8 Capability flags

Use simple client-side feature flags for:
- jurisdictions in preview
- simulations in beta
- optional AI adapters
- advanced workbench tools
- future collaborative features

### 50.9 Template upgrade packs

Provide a way to add new templates without touching core engine logic:

- new jurisdiction pack
- new vendor/network profile
- new simulation definition
- new strategy template
- new business model scenario template

### 50.10 Deprecation policy

When something is outdated:
- do not silently remove it;
- mark it deprecated;
- point to successor content where possible;
- preserve changelog visibility.

---

## 51. New content collections and route requirements for v2.0

### 51.1 Add these content collections

Add to Section 12:

- `analysis-frameworks`
- `strategy-templates`
- `business-model-templates`
- `org-role-templates`
- `delivery-playbooks`
- `migrations`
- `feature-flags`
- `quality-rubrics`

### 51.2 Add these route groups

Add to Section 10:

```text
/studio/strategy/
/studio/business-model/
/studio/decision-pack/
/labs/visuals/
/labs/components/
```

The `/labs` area can be internal-only and exists to:
- preview reusable analysis components,
- support design QA,
- support snapshot testing,
- and accelerate future upgrades.

---

## 52. BUILD_STATUS.json contract

Codex must maintain a truthful machine-readable status file so autonomous or semi-autonomous build loops have an objective completion signal.

### 52.1 Required file

Create and maintain:

```text
BUILD_STATUS.json
```

### 52.2 Required schema

```json
{
  "version": 1,
  "ready": false,
  "phase": "foundation",
  "completion": 0,
  "lastUpdated": "2026-03-18T00:00:00Z",
  "areas": {
    "shell": "not-started",
    "content-model": "not-started",
    "learn": "not-started",
    "markets": "not-started",
    "controls": "not-started",
    "simulations": "not-started",
    "strategy-workbench": "not-started",
    "business-model-simulator": "not-started",
    "workspace": "not-started",
    "search": "not-started",
    "tests": "not-started",
    "gitlab-pages": "not-started",
    "upgrade-engine": "not-started",
    "docs": "not-started"
  },
  "openRisks": [],
  "notes": []
}
```

### 52.3 Truthfulness rule

`ready` may only be set to `true` when:
- the app builds;
- `pnpm verify:ci` passes;
- the major areas are genuinely implemented;
- and AGENTS.md quality requirements are satisfied.

Do not use `ready: true` merely because scaffolding exists.

---

## 53. Strengthened Definition of Done

This section extends Sections 35 and 40.

The application is only “done enough for first serious release” when all of the following are true:

1. Static GitLab Pages deployment works correctly under a project base path.
2. Core Learn, Markets, Controls, Networks, Simulate, Studio, Workspace, Sources, and Releases routes exist.
3. At least six deep operational simulations are implemented to the v1 depth standard.
4. The full **Strategy & Venture Workbench** exists.
5. The **Business Model Simulator** exists with at least three scenario templates.
6. Workspace persistence and migration logic exist.
7. Search works against local static content.
8. Source and stale-state trust UX exists.
9. Playwright coverage exists across the mandatory suites.
10. `pnpm verify:ci` passes locally and in GitLab CI.
11. `BUILD_STATUS.json` truthfully records readiness.

---

## 54. Stronger instruction to Codex

This section supersedes Section 40.

### 54.1 Build sequence

Codex should proceed in this order:

1. repository shell and GitLab Pages correctness
2. content schemas and graph
3. core reading routes
4. controls + markets + sources trust system
5. rules engine
6. simulations
7. workspace persistence and migrations
8. Strategy & Venture Workbench
9. Business Model Simulator
10. Playwright matrix and hardening
11. release notes, BUILD_STATUS.json, docs, polish

### 54.2 Reflective development loop

For every major feature slice, Codex should follow this loop:

1. inspect affected code and requirements
2. plan the smallest complete vertical slice
3. implement it
4. run relevant tests
5. critique the result for UX, accessibility, clarity, and maintainability
6. improve it
7. update docs/tests/status files

### 54.3 Never stop early rule

Codex should not stop at scaffolding if the plan calls for working behavior. It should keep iterating until the feature is real enough to satisfy tests and the acceptance criteria.

### 54.4 Mandatory artifacts Codex must create or maintain

- `AGENTS.md`
- `BUILD_STATUS.json`
- `CHANGELOG.md` or release-note equivalent
- `tests/e2e/**`
- content collections and schemas
- quality scripts in `package.json`
- GitLab CI configuration
- base-path-safe deployment config

---

## 55. Additional official/primary technical sources to seed the source register

These should be added to the source register alongside the regulatory and market sources already listed above.

### 55.1 GitLab / static delivery

- GitLab Pages docs  
  <https://docs.gitlab.com/user/project/pages/>
- GitLab Pages parallel deployments / `path_prefix`  
  <https://docs.gitlab.com/user/project/pages/parallel_deployments/>
- GitLab review apps  
  <https://docs.gitlab.com/ci/review_apps/>
- GitLab job artifacts  
  <https://docs.gitlab.com/ci/jobs/job_artifacts/>

### 55.2 Astro / static app

- Astro configuration reference  
  <https://docs.astro.build/en/reference/configuration-reference/>
- Astro CLI `--base` support  
  <https://docs.astro.build/en/reference/cli-reference/>
- Astro environment variables / `BASE_URL`  
  <https://docs.astro.build/en/guides/environment-variables/>

### 55.3 Search

- Pagefind overview  
  <https://pagefind.app/>
- Pagefind docs  
  <https://pagefind.app/docs/>
- Pagefind JS API  
  <https://pagefind.app/docs/api/>

### 55.4 Testing

- Playwright configuration  
  <https://playwright.dev/docs/test-configuration>
- Playwright projects  
  <https://playwright.dev/docs/test-projects>
- Playwright best practices  
  <https://playwright.dev/docs/best-practices>
- Playwright visual comparisons  
  <https://playwright.dev/docs/test-snapshots>
- Playwright accessibility testing  
  <https://playwright.dev/docs/accessibility-testing>

### 55.5 Codex

- Codex CLI quickstart  
  <https://developers.openai.com/codex/quickstart/>
- Codex CLI features  
  <https://developers.openai.com/codex/cli/features/>
- Codex CLI reference (`codex exec`, resume, model selection)  
  <https://developers.openai.com/codex/cli/reference/>

---

## 56. Final v2.0 note

The right build is now:

- a **static, GitLab Pages-safe knowledge product**,
- a **deep simulation product**,
- a **strategy and venture workbench**,
- a **business-model simulator**,
- and a **continually upgradable market-intelligence surface**.

That combination is much more defensible than a generic “AI website about crypto”.
