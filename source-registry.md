# DA Research Source Registry

A living reference of quality sources for digital asset intelligence research.
Add new sources whenever they surface during research pipelines.
Use this to diversify away from default CoinDesk reliance.

---

## Primary / Official Sources

| Source | URL | Best for |
|--------|-----|----------|
| Ledger security blog | https://www.ledger.com/blog | Incident reports, product announcements |
| Ledger Enterprise | https://enterprise.ledger.com | Institutional product claims |
| Fireblocks blog | https://www.fireblocks.com/blog | **Reliability 8/10.** Product, security, institutional updates. First-party primary for its own network/product announcements. Usage: 1 (2026-08-11 am 20% — primary-source claim verified: Cari Network inter-bank tokenised deposits model) |
| Taurus SA | https://www.taurushq.com | Swiss custody, tokenisation. NOTE: correct domain is taurushq.com (taurusgroup.ch was the old entry) |
| Taurus SA — regulatory status | https://www.taurushq.com/legal/regulatory-risk/regulatory-status.html | **Reliability 9/10.** Primary licence disclosure: FINMA status, CySEC licence no. 465/26, TDX-as-OTF. The authoritative first-party page for licence questions — found 2026-08-05, previously missed |
| Taurus SA — clients page | https://www.taurushq.com/clients/ | **Reliability 6/10.** First-party logo wall. Useful for finding *undisclosed* names (Temenos, UNHCR, Delubac) but carries unevidenced superlatives. Found 2026-08-05 |
| FINMA — authorised institutions register | https://www.finma.ch/en/finma-public/authorised-institutions-individuals-and-products/ | **Reliability 10/10.** Swiss licence verification. Still not successfully opened as at 2026-08-05 — outstanding |
| State Street Investor Relations | https://investors.statestreet.com/investor-news-events/press-releases/ | **Reliability 10/10.** Counterparty primary; settled a launch-date dispute that trade press had muddied. 403s to bots, fine in browser |
| Santander press room | https://www.santander.com/en/press-room/press-releases | **Reliability 10/10.** Counterparty primary for Openbank crypto |
| ClearBank newsroom | https://clear.bank/learn/news | **Reliability 9/10.** Counterparty primary; had the Circle Mint / USDC-EURC detail trade press dropped |
| The Hashgraph Association | https://www.hashgraph.swiss/news-all | **Reliability 7/10.** Counterparty primary for Hedera/HBAR partnerships |
| Anchorage Digital | https://www.anchorage.com | US regulated custody |
| Coinbase Institutional | https://institutional.coinbase.com | US custody, regulated products |
| BitGo blog | https://www.bitgo.com/resources | MPC custody, trust company |
| FINOS | https://www.finos.org | Open-source financial standards (CDM, etc.) |
| SWIFT | https://www.swift.com/our-solutions/swift-for-corporates/digital-assets | Interoperability, messaging |
| BIS | https://www.bis.org/topics/fintech.htm | Central bank digital, research |
| ⚠️ Bank of England / PRA | https://www.bankofengland.co.uk | MPC decisions, Court minutes, regulatory statements. Usage: 2 (2026-07-30 pm: 40% of candidates — above 25% threshold; 2 official docs used; 2026-08-06 pm 17% — primary source, Green notice 2026/02) |
| FSB | https://www.fsb.org/work-of-the-fsb/financial-innovation-and-structural-change/crypto-assets | **Reliability 10/10.** Regulatory policy. Usage: 1 (2026-08-11 am 20% — primary source, Regional Engagement Chair appointment) |
| FATF | https://www.fatf-gafi.org/en/topics/virtual-assets.html | AML/Travel Rule |
| SEC | https://www.sec.gov/spotlight/cybersecurity | US enforcement, filings |
| FCA | https://www.fca.org.uk/firms/cryptoassets | UK crypto regulation |
| AMF (France) | https://www.amf-france.org/en | MiCA, PSAN/CASP registration |
| ESMA | https://www.esma.europa.eu/esmas-activities/digital-finance-and-innovation | MiCA, EU markets |
| NIST CMVP | https://csrc.nist.gov/projects/cryptographic-module-validation-program | FIPS certification verification |
| Common Criteria Portal | https://www.commoncriteriaportal.org | EAL certification verification |
| npm security advisories | https://www.npmjs.com/advisories | Supply chain / npm incidents |
| DTI Foundation (DTIF) | https://dtif.org | **Reliability 9/10.** Registration Authority for ISO 24165 Digital Token Identifier — primary source for digital-token identifier data/governance; ESMA's own MiCA guidance directs CASPs to this registry. Found 2026-08-12 (digital-asset taxonomy WS1). |
| SEC — rules-regulations hub | https://www.sec.gov/rules-regulations | **Reliability 10/10.** US primary; found the actual Interpretive Release 33-11412 (5-way crypto-asset taxonomy, 2026-03-17) at `/rules-regulations/2026/03/s7-2026-09` when the release number alone did not resolve via search — go to the dated rules-regulations index directly. Found 2026-08-12 (digital-asset taxonomy WS3). |
| Congress.gov | https://www.congress.gov | **Reliability 10/10.** US primary bill text and CRS summaries — used for GENIUS Act (S.1582, enacted) and CLARITY Act (H.R.3633, passed House, stalled in Senate as of 2026-08). Bill-status pages are the fastest way to confirm enacted vs pending. Found 2026-08-12 (WS3). |
| MAS (Monetary Authority of Singapore) | https://www.mas.gov.sg | **Reliability 9/10 in principle, but** its `/news/media-releases/` pages returned only a generic "service unavailable" body to WebFetch on 2026-08-12 — likely bot-gated. Guideline pages (`/regulation/guidelines/...`) and whitepaper pages fetched fine. Prefer 2-3 independent law-firm secondary summaries (Reed Smith, Bird & Bird, Allen & Gledhill) to corroborate MAS media releases if direct fetch fails. |
| VARA Rulebooks | https://rulebooks.vara.ae | **Reliability 8/10.** Dubai VA primary rulebook site; the "Introduction" page only exposes a schedule/definitions pointer, not substantive rule text, via WebFetch — fetch specific rulebook sub-pages (e.g. `/rulebook/virtual-asset-issuance-rulebook`) directly rather than the landing page. Found 2026-08-12 (WS3). |
| HKMA | https://www.hkma.gov.hk | **Reliability 10/10.** Primary for Hong Kong's Stablecoins Ordinance (in force 2025-08-01) and stablecoin-issuer licence grants (first licences 2026-04-10: Anchorpoint, HSBC). Found 2026-08-12 (WS3). |
| BIS Basel Framework / FSI summaries | https://www.bis.org/basel_framework and https://www.bis.org/fsi/fsisummaries | **Reliability 10/10 but fetch-hostile.** `basel_framework/chapter/SCO/60.htm` is JS-rendered and returns only nav content to WebFetch; `fsisummaries/crypto_exposures.pdf` returns raw compressed PDF streams to WebFetch. Workaround that succeeded: `curl -sL -A "Mozilla/5.0" -o file.pdf <url> && pdftotext file.pdf -`. This is the primary source for BCBS Group 1a/1b/2a/2b cryptoasset prudential classification (Group 2 exposure limit: should not generally exceed 1% of Tier 1 capital, hard cap 2%; Group 2a and 2b both carry a 1,250%-equivalent risk weight, differentiated only by hedging recognition). Found 2026-08-12 (WS3). |
| OSFI (Canada) | https://www.osfi-bsif.gc.ca | **Reliability 9/10.** Primary for a national BCBS-transposition example (2026 guideline on capital/liquidity treatment of crypto-asset exposures). Useful as a template when checking whether other jurisdictions have transposed the Basel cryptoasset standard yet. Found 2026-08-12 (WS3). |

### US/UK/APAC crypto regulatory law-firm commentary (added 2026-08-12, WS3)

| Source | URL | Best for |
|--------|-----|----------|
| Ropes & Gray | https://www.ropesgray.com/en/insights | **Reliability 8/10.** Detailed US SEC/CFTC digital-asset alerts. |
| Ballard Spahr | https://www.ballardspahr.com/insights | **Reliability 8/10.** US securities/crypto alerts, good plain-English breakdowns of SEC releases. |
| Davis Polk | https://www.davispolk.com/insights | **Reliability 9/10.** US/HK/UK bank-regulatory client updates; caught the Hong Kong stablecoin regime's exact in-force date. |
| Sidley Austin | https://www.sidley.com/en/insights | **Reliability 8/10.** US bank-regulator and HK/APAC crypto alerts. |
| Skadden | https://www.skadden.com/insights | **Reliability 9/10.** Best single secondary source found for BCBS Group 1a/1b/2a/2b mechanics — closely tracked the primary BIS text once cross-checked. |
| Reed Smith | https://www.reedsmith.com/en/perspectives | **Reliability 8/10.** UK/Singapore/HK regulatory perspectives, good for regime-transition explainers. |
| Gibson Dunn | https://www.gibsondunn.com/insights | **Reliability 8/10.** Financial-regulatory updates, e.g. Singapore DTSP extraterritoriality. |
| Freshfields (Technology Quotient blog) | https://www.freshfields.com/en/our-thinking/blogs/technology-quotient | **Reliability 8/10.** UK crypto statutory-instrument analysis. |
| Herbert Smith Freehills Kramer | https://www.hsfkramer.com | **Reliability 8/10.** UK/EU crypto-regime alerts. |
| Kayrouz & Associates | https://www.kayrouzandassociates.com/insights | **Reliability 6/10.** UAE/VARA specialist boutique — useful for VARA numeric thresholds but single-source only in this run; cross-check before citing precisely. |
| CryptoverseLawyers | https://www.cryptoverselawyers.io | **Reliability 6/10.** UAE/RWA tokenisation specialist blog — treat as a starting point, verify against VARA primary rulebook text. |
| CryptoSlate — Crypto Laws reference pages | https://cryptoslate.com/crypto-laws/ | **Reliability 6/10.** Handy per-topic/per-jurisdiction explainer index (used for Basel SCO60 and Japan PSA), undated — check freshness before citing standalone. |
| OECD Global Forum — tax transparency | https://www.oecd.org/content/dam/oecd/en/networks/global-forum-tax-transparency/ | **Reliability 10/10.** Primary source for CARF (Crypto-Asset Reporting Framework) monitoring/implementation updates — has precisely quantified jurisdiction-commitment figures (75 committed, 53 MCAA signatories as of Nov 2025). NOTE: iso.org and fatf-gafi.org 403 automated fetch; oecd.org PDFs fetched cleanly. Found 2026-08-12. |
| BIS/CPMI tokenisation reports | https://www.bis.org/cpmi/publ/ | **Reliability 10/10.** Primary central-bank-standard-setter source for tokenisation concepts (tokens/platforms/token arrangements framework, Oct 2024 report to G20). Found 2026-08-12. |
| GFMA (Global Financial Markets Association) | https://www.gfma.org | **Reliability 8/10.** Industry-consortium (AFME/SIFMA/ASIFMA umbrella) primary source; its 2023 "Proposed Approach for the Classification and Understanding of Digital Assets" (co-authored with BCG/Clifford Chance/Cravath) is the broadest general digital-asset ontology attempt found among global standards bodies — but is explicitly self-described as non-endorsed/provisional, not a ratified standard. Found 2026-08-12. |
| ICMA — Bond Data Taxonomy | https://www.icmagroup.org/fintech-and-digitalisation/fintech-advisory-committee-and-related-groups/bond-data-taxonomy/ | **Reliability 9/10.** Primary source, ICMA-convened multi-stakeholder working group; concretely adopted (HKSAR digital green bond 2024, v2.0 April 2026). Found 2026-08-12. |
| ⚠️ iso.org (direct standard/committee pages) | https://www.iso.org | Authoritative but **403s to automated fetch** consistently (committee pages, standard listing pages, OBP UI all blocked as at 2026-08-12). Use national-body mirrors (ANSI webstore, BSI knowledge, AFNOR boutique, SIS) or standards.iteh.ai PDF-sample drafts instead, and cross-corroborate across 2+ mirrors before treating a bibliographic fact as settled. |

---

## Tier-1 Financial & General Press

| Outlet | URL | Best for |
|--------|-----|----------|
| Financial Times | https://www.ft.com | Breaking institutional, IPO, M&A |
| Bloomberg | https://www.bloomberg.com | Market data, institutional news |
| Reuters | https://www.reuters.com | Wire-level breaking news |
| Wall Street Journal | https://www.wsj.com | US institutional, regulatory |
| The Economist | https://www.economist.com | Analysis, macro |

---

## DA-Specialist Outlets (non-CoinDesk)

| Outlet | URL | Strengths / Notes |
|--------|-----|----------|
| ⚠️ The Block | https://www.theblock.co | Strong research team, data, institutional. Usage: 8 (2026-07-28 am 17%; 2026-07-28 pm 20%; 2026-07-29 am 40% — above 25% threshold; 2026-07-29 pm 20%; 2026-07-30 pm 20%; 2026-08-04 am 40% — above 25% threshold; 2026-08-05 taurus 4%; 2026-08-07 am 17%; 2026-08-11 am 20%; 2026-08-11 pm 20%) |
| DL News | https://www.dlnews.com | Good on European/institutional angle |
| Blockworks | https://blockworks.co | Institutional, macro, podcasts |
| Decrypt | https://decrypt.co | Consumer, technology, product news. Usage: 21 (2026-07-27 pm 33%; 2026-07-28 am 33% — above 25% threshold both runs; not used 2026-07-28 pm; 2026-07-29 pm 40% — above 25% threshold; 2026-07-30 am 40% — above 25% threshold; 2026-07-30 pm 20%; 2026-07-31 am 20%; 2026-07-31 pm 17%; 2026-08-03 am 20%; 2026-08-03 pm 20%; 2026-08-04 pm 20%; 2026-08-05 am 40% — above 25% threshold; 2026-08-05 pm 20%; 2026-08-06 am 33% — above 25% threshold; 2026-08-06 pm 17%; 2026-08-07 am 33% — above 25% threshold; 2026-08-07 pm 17%; 2026-08-11 am 20%; 2026-08-12 am 40% — above 25% threshold; not used 2026-08-12 pm; 2026-08-13 am 40% — above 25% threshold, 2 of 5 candidates and both attack-analysis attachments) — top_outlet 2/5 last runs as at 2026-08-13 am; over-reliance pattern not active, but two consecutive am slots topped by Decrypt — bias the next am sweep toward The Block, DL News and Blockworks |
| ⚠️ The Defiant | https://thedefiant.io | DeFi-focused, good on protocol news. Usage: 16 (2026-07-27 am 40%; 2026-07-28 am 33% — above 25% threshold both runs; 2026-07-29 am 20%; 2026-07-30 am 40% — above 25% threshold; 2026-07-31 am 40% — above 25% threshold; 2026-07-31 pm 17%; 2026-08-03 am 20%; 2026-08-03 pm 20%; 2026-08-04 am 40% — above 25% threshold; 2026-08-05 am 20%; 2026-08-06 am 17%; 2026-08-07 am 20%; 2026-08-12 am 20%; 2026-08-12 pm 17%) |
| Ledger Insights | https://www.ledgerinsights.com | Institutional tokenisation, regulated infrastructure; strong European/bank angle. Usage: 7 (2026-07-28 pm 20%; 2026-08-05 taurus 8.5% — 4 citations, top *outlet* in that brief but well under threshold; 2026-08-12 am 20%; 2026-08-13 am 20% — Anchorpoint/HKDAP stablecoin beta, the run's lead regulated-infrastructure story) |
| Finextra | https://www.finextra.com | Fintech/regtech news, regulatory sandbox coverage; good for global emerging markets angle. Usage: 7 (2026-07-28 pm 20%; 2026-07-31 pm 17%; 2026-08-03 am 20%; 2026-08-05 pm 20%; 2026-08-05 taurus 2% — ⚠️ 403s to automated fetch, readable via search index only; 2026-08-06 am 17%; 2026-08-13 am 20% — DORA cryptographic-migration piece; note this was a Finextra *blogposting*, i.e. contributed commentary rather than newsroom reporting, so treat as opinion-tier) |
| Protos | https://protos.com | Investigative, sceptical angle useful. Usage: 3 (2026-08-05 am 20%; 2026-08-07 pm 17%; 2026-08-12 pm 17% — sourced the Coreum bridge exploit that drove this run's attack-analysis attachment) |
| Unchained (Laura Shin) | https://unchainedcrypto.com | Long-form, research-quality interviews |
| CVJ.ch (Crypto Valley Journal) | https://cvj.ch | **Reliability 8/10.** Best single source for Swiss crypto regulatory status and MiCA authorisation tracking. ⚠️ Publishes **living articles** updated in place (its Swiss-MiCA survey went six→seven→eight providers while the URL slug stayed "seven") — always cite with an "as at" date. Usage: 1 (2026-08-05 taurus, 2%) |
| Disruption Banking | https://www.disruptionbanking.com | **Reliability 7/10.** European bank digital-asset launches. Usage: 1 (2026-08-05 taurus, 2%) |
| FF News | https://ffnews.com | **Reliability 6/10.** Fintech/tradetech press-release carrier, good coverage of infrastructure deals. Usage: 1 |
| Payment Expert | https://paymentexpert.com | **Reliability 6/10.** Payments and tokenisation. Usage: 1 |
| Asset Servicing Times | https://www.assetservicingtimes.com | **Reliability 7/10.** Custody/asset-servicing trade press — strong for the institutional custodian angle. Usage: 1 |
| FinTech Futures | https://www.fintechfutures.com | **Reliability 7/10.** Bank technology selections. Usage: 1 |
| The Fintech Times | https://thefintechtimes.com | **Reliability 6/10.** Useful non-CoinDesk substitute for vendor licence/selection stories. Usage: 2 (2026-08-05 taurus, 4%) |
| Tech.eu | https://tech.eu | **Reliability 7/10.** European funding rounds and expansion — good for Series A/B corroboration. Usage: 1 |
| Venturelab (Swiss) | https://www.venturelab.swiss | **Reliability 8/10.** Swiss startup funding record; authoritative for Swiss round composition. Usage: 1 |
| Clipperton | https://www.clipperton.com | **Reliability 7/10.** European tech M&A/financing advisory; deal-level investor lists. Usage: 1 |
| ⚠️ Cointelegraph | https://cointelegraph.com | Broad DA news, regulation, market. Usage: 7 (2026-08-05 am 20%; 2026-08-05 pm 20%; 2026-08-05 taurus 2%; 2026-08-06 pm 17%; 2026-08-07 pm 17%; 2026-08-11 pm 40% — above 25% threshold, joint top outlet with CoinDesk; 2026-08-12 am 20%; 2026-08-12 pm 17%) |
| ⚠️ CoinDesk | https://www.coindesk.com | Default fallback — use sparingly, max 1-2 per brief. Usage: 25 (2026-07-27 am: 60%; 2026-07-27 pm: 33%; 2026-07-28 pm: 40% — above 25% threshold three runs; 2026-07-29 am: 20%; 2026-07-29 pm: 40% — above 25% threshold; 2026-07-30 am: 20%; 2026-07-30 pm: 20%; 2026-07-31 am: 40% — above 25% threshold; 2026-08-03 am: 40% — above 25% threshold; 2026-08-03 pm: 60% — above 25% threshold; 2026-08-04 am: 20%; 2026-08-04 pm: 80% — above 25% threshold; 2026-08-05 pm: 40% — above 25% threshold; 2026-08-05 taurus: **1 citation, 2%** — deliberately held to a single load-bearing use; 2026-08-06 am: 17%; 2026-08-06 pm: 33% — above 25% threshold; 2026-08-07 am: 17%; 2026-08-07 pm: 33% — above 25% threshold; not used 2026-08-11 am; 2026-08-11 pm: 40% — above 25% threshold, joint top outlet with Cointelegraph; not used 2026-08-12 am; 2026-08-12 pm: 33% — above 25% threshold, 2 of 6 sources; 2026-08-13 am: 20% — 1 citation, under threshold, cap respected) — over-reliance pattern **no longer active as at 2026-08-13 am** (top_outlet 2 of the last 5 runs; the 08-07 pm run has aged out of the window, so the ACTIVE tag from 08-12 pm is rolled off). Long-run usage remains the highest in the registry — keep enforcing the 1-2 citation cap hard and keep biasing selection toward The Block, DL News, Blockworks, Ledger Insights and first-party issuer/regulator pages |

---

## Security Research & Incident Sources

| Source | URL | Best for |
|--------|-----|----------|
| Checkmarx security blog | https://checkmarx.com/blog | Supply chain attacks, npm |
| Sonatype blog | https://blog.sonatype.com | Open source security, npm |
| SlowMist | https://slowmist.medium.com | On-chain forensics, DeFi incidents |
| Chainalysis blog | https://www.chainalysis.com/blog | **Reliability 9/10.** On-chain analytics, hack tracing; also strong first-party regulatory analysis. Usage: 1 (2026-08-11 am 20% — FATF DeFi report functional-approach analysis, verified) |
| Elliptic | https://www.elliptic.co/blog | Blockchain analytics, compliance |
| ZachXBT (on-chain) | https://zachxbt.mirror.xyz | Real-time hack tracing, loss estimates |
| Phylum | https://blog.phylum.io | Supply chain / package security |
| Cycode | https://cycode.com/blog | Software supply chain security |
| Security Affairs | https://securityaffairs.com | Security news aggregator |
| Krebs on Security | https://krebsonsecurity.com | Investigative security journalism |
| Blockaid blog | https://www.blockaid.io/blog | Real-time DApp threat detection |

---

## Data & Analytics

| Source | URL | Best for |
|--------|-----|----------|
| Chainalysis reports | https://go.chainalysis.com/crypto-crime-report.html | Annual crime stats, institutional |
| Elliptic research | https://www.elliptic.co/resources | Compliance, sanctions |
| Kaiko | https://www.kaiko.com | Institutional market data |
| Coin Metrics | https://coinmetrics.io | On-chain data, research |
| DefiLlama | https://defillama.com | TVL, protocol data |
| Nansen | https://nansen.ai | On-chain intelligence |
| Glassnode | https://glassnode.com | On-chain market intelligence |

---

## Regulatory & Legal Commentary

| Source | URL | Best for |
|--------|-----|----------|
| Linklaters — digital assets | https://www.linklaters.com/en/insights/topics/digital-assets | GSIB legal perspective |
| Allen & Overy / A&O Shearman | https://www.aoshearman.com/en/insights | Regulatory analysis |
| Clifford Chance | https://www.cliffordchance.com/expertise/services/digital-assets.html | EU/UK regulatory |
| Norton Rose Fulbright | https://www.nortonrosefulbright.com/en/knowledge/topics/financial-technology | Custody, MiCA |
| RFP.wiki | https://www.rfp.wiki/vendors | Vendor comparison, enterprise claims |
| Bär & Karrer | https://www.baerkarrer.ch/en/publications | **Reliability 9/10.** Swiss financial regulation — the most precise of the FINMA Guidance 01/2026 commentaries; used it to catch three over-precise quotations |
| MLL Legal | https://www.mll-news.com | **Reliability 8/10.** Swiss fintech/DLT regulation |
| CMS Law-Now (Switzerland) | https://cms-lawnow.com | **Reliability 8/10.** Swiss + EU regulatory e-alerts |
| Borel & Barbey | https://www.borel-barbey.ch/en/ | **Reliability 7/10.** Geneva financial regulation |
| Goldblum & Partners | https://goldblum.ch | **Reliability 7/10.** Swiss crypto licensing, MiCA-vs-Switzerland comparisons |
| Loyens & Loeff | https://www.loyensloeff.com/insights | **Reliability 9/10.** Best source found for the FinIA/FINIG reform and its realistic timetable — corrected an "in force late 2026" error to "2027 at the earliest" |
| Grant Thornton Switzerland | https://www.grantthornton.ch/en/insights | **Reliability 8/10.** Swiss licence-category reform |
| Deloitte Switzerland — Tax & Legal blog | https://www.deloitte.com/ch/en/services/tax/blogs | **Reliability 8/10.** Swiss payment-token and financial-institution categories |
| CapLaw | https://caplaw.ch | **Reliability 8/10.** Swiss capital markets law journal; critical analysis rather than marketing |

---

## Academic & Research

| Source | URL | Best for |
|--------|-----|----------|
| BIS working papers | https://www.bis.org/list/wppdf/index.htm | Central bank, monetary policy |
| Federal Reserve | https://www.federalreserve.gov/publications.htm | US monetary, custody regulation |
| Cambridge Centre for Alt Finance | https://ccaf.io | Industry data, benchmarks |
| IOSCO | https://www.iosco.org | Global securities regulation |
| ⚠️ EthSystems | https://ethsystems.org (NOTE: `ethsystem.org`, singular, is a Namecheap URL-forward to this domain — cite the plural URL) | **Reliability 7/10 for technical depth, vendor-bias-flagged.** Institutional Ethereum privacy infrastructure research/engineering firm founded by the team that ran the Ethereum Foundation's Institutional Privacy Task Force; Joe Lubin among supporters. Technical knowledge base: 23 use cases, 10 privacy architectures, 69 cryptographic building-block patterns, regulatory frameworks by jurisdiction, all scored via its own "CROPS" (censorship-resistance/open-source/privacy/security) framework, with links to working GitHub prototypes. Good for: Ethereum privacy-tech architecture detail and pattern comparison no generalist outlet covers at this depth. ⚠️ Sells paid institutional consulting/PoC/engineering services in the exact category it evaluates — treat architecture *recommendations* as vendor marketing, corroborate with an independent secondary source before citing as neutral, and prefer its factual/technical pattern descriptions over its comparative judgments. Blog post dates observed as 2026 (may be templated/future-dated) — check publish dates before citing as current. Added 2026-08-13 per Bobby's request. |

---

## Notes on Source Weighting

- **Primary sources** (company pages, regulatory filings, primary incident reports): weight highest, but verify claims aren't just marketing.
- **Tier-1 financial press** (FT, Bloomberg, Reuters, WSJ): strong for corporate news, IPO, M&A; less strong on technical crypto detail.
- **DA specialist** (The Block, DL News, Blockworks): good for institutional crypto news; check The Block research specifically for data-backed pieces.
- **Security researchers** (ZachXBT, SlowMist, Chainalysis): essential for incident forensics and loss estimates.
- **CoinDesk**: usable but avoid as the primary or majority source in any brief — max 1-2 citations per report.

---

## Run note — Taurus vendor brief, 5 August 2026 (verification run)

47 sources across ~30 publications. Top origin was Taurus first-party at 19%; no
outlet above 25%; CoinDesk held to 1 citation (2%).

Three registry-level lessons from this run:
1. **Company `/legal/` and `/regulatory-*` pages are underused.** Taurus's regulatory-
   status page settled a licence number that four trade outlets had not pinned down.
   Check `<vendor>/legal/` before trusting trade press on licences.
2. **Issuer IR press rooms beat trade press on dates.** A "January vs March" launch
   dispute across trade summaries evaporated on reading the issuer's own release.
3. **Watch for living articles.** CVJ.ch updates surveys in place without changing the
   slug. Cite with "as at" dates or the citation silently rots.

*Last updated: 5 August 2026 (Taurus verification run). Add new sources with date found.*
