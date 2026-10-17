# DGRF PrdOps: Product Operating Model & Team Strategy Rubric (S1–S5)

The **Product Operating Model (`PrdOps`)** vector measures how product strategy is executed, how decisions are made, and whether teams function as **Empowered Product Teams** solving problems or as a **Feature Factory** executing arbitrary ticket backlogs (Cagan, 2017; Torres, 2021).

---

## Dimension Overview

| Dimension | Domain | Anchor Scores (L1 $\to$ L4) | Max Points | Primary Theoretical Foundation |
| :--- | :--- | :--- | :--- | :--- |
| **S1** | **Team Model & Decision Autonomy** | 3, 10, 18, **25** | 25 | Empowered Teams vs Feature Factory (Cagan, 2017) |
| **S2** | **North Star & Outcome Focus** | 3, 8, 14, **20** | 20 | OKR Outcome Management & Value Metrics (Doerr, 2018) |
| **S3** | **Continuous Discovery Habits** | 3, 8, 14, **20** | 20 | Continuous Discovery Habits & Opportunity Trees (Torres, 2021) |
| **S4** | **Domain Autonomy & System Boundaries** | 3, 8, 14, **20** | 20 | Team Topologies & Stream-Aligned Teams (Skelton & Pais, 2019) |
| **S5** | **Technical Debt Allocation & Architecture** | 2, 6, 11, **15** | 15 | Flow Framework & Sustainable Engineering Ratio (Kersten, 2018) |

$$\text{Base}_{\text{ops}} = \sum_{m=1}^5 S_m \in [14, 100]$$

---

## S1: Team Model & Decision Autonomy

- **Maximum Weight:** 25 points
- **Theoretical Basis:** Empowered Product Teams (Marty Cagan). In feature factories, teams exist to build features assigned by business stakeholders. In empowered teams, product managers, designers, and engineers are entrusted to solve customer problems and held accountable for outcomes.
- **Traceable Artifacts:** Product Trio Charter, Product Strategy Documents, Feature Intake Request Logs.

### Calibration Rubric

| Level | Score | Anchor Designation | Empirical Diagnostic Characteristics | Traceable Evidence Benchmark |
| :---: | :---: | :--- | :--- | :--- |
| **L1** | **3** | **Empowered Product Trio** | Product Manager, Tech Lead, and Product Designer collaborate daily. Team is empowered to decide the best solution for an assigned strategic problem. | Team charter grants autonomy over solution space; zero executive mandate on specific UI features or implementation details. |
| **L2** | **10** | **Collaborative Squad with Guardrails** | Strong team ownership with periodic executive reviews. Minor stakeholder roadmap inputs, but team controls backlog prioritization. | Documented quarterly roadmap based on customer problem statements rather than fixed feature lists. |
| **L3** | **18** | **Stakeholder-Driven Delivery Squad** | Team acts primarily as order-takers for internal sales, marketing, or executive stakeholders. High volume of custom feature requests. | Jira backlog dominated by tickets titled "Requested by Sales / Executive"; roadmap is a timeline of feature delivery dates. |
| **L4** | **25** | **Pure Feature Factory** | Complete absence of empowerment. Developers are treated as ticket-closers; PM acts as a project coordinator transcribing executive demands. | 100% of sprint backlog is dictated top-down; zero user research or solution ideation performed by engineering or design. |

---

## S2: North Star & Outcome Focus

- **Maximum Weight:** 20 points
- **Theoretical Basis:** Outcome-Based Product Management (Doerr, 2018; Seiden, 2019). Tracking shipped features gives a false sense of progress. Product maturity requires anchoring teams to a single North Star Metric and measurable business outcomes.
- **Traceable Artifacts:** North Star Metric Hierarchy, Quarterly OKR Scorecards, Product Analytics Dashboards.

### Calibration Rubric

| Level | Score | Anchor Designation | Empirical Diagnostic Characteristics | Traceable Evidence Benchmark |
| :---: | :---: | :--- | :--- | :--- |
| **L1** | **3** | **Quantified Outcome Anchoring** | Single North Star metric explicitly connects daily sprint deliverables to customer value. OKRs measure customer behavior change, not outputs. | Amplitude/Mixpanel dashboards showing real-time cohort retention and leading indicators of customer value. |
| **L2** | **8** | **Leading Outcome Indicators** | Clear business KPIs defined and tracked at sprint boundaries. Features are evaluated retrospectively against behavioral adoption. | Quarterly OKR reviews measuring adoption and engagement percentages rather than delivery completion percentages. |
| **L3** | **14** | **Output Metrics Disguised as OKRs** | "OKRs" consist of feature delivery dates ("Launch v2 by June 30"). Success is declared upon release regardless of customer adoption. | OKR ledger where 80%+ of key results start with "Deliver", "Launch", or "Complete". Zero post-launch behavioral analysis. |
| **L4** | **20** | **Zero Outcome Instrumentation** | No product metrics defined. Success is measured solely by whether milestones were met on schedule. Nobody tracks if customers use features. | No product analytics tool installed; product team does not know daily/monthly active users or feature adoption rates. |

---

## S3: Continuous Discovery Habits

- **Maximum Weight:** 20 points
- **Theoretical Basis:** Continuous Discovery Habits (Teresa Torres, 2021). High-performing product teams engage in weekly touchpoints with customers to continuously test assumptions before building expensive production code.
- **Traceable Artifacts:** Weekly Customer Interview Logs, Opportunity Solution Trees (OST), Assumption Test Results.

### Calibration Rubric

| Level | Score | Anchor Designation | Empirical Diagnostic Characteristics | Traceable Evidence Benchmark |
| :---: | :---: | :--- | :--- | :--- |
| **L1** | **3** | **Weekly Continuous Discovery Cadence** | The Product Trio conducts $\ge 1$ structured customer interview every week. Assumptions tested via rapid low-fidelity prototypes. | Customer interview repository updated weekly with video recordings, opportunity trees, and assumption experiment logs. |
| **L2** | **8** | **Bi-Weekly Discovery Sprints** | Regular discovery interviews conducted before major quarterly roadmap bets. Prototypes tested with representative user cohorts. | Documented user research synthesis reports preceding every major feature release. |
| **L3** | **14** | **Infrequent / Ad-Hoc Research** | Research is outsourced to external agencies or conducted once per year during annual planning. Engineers never speak to customers. | No customer contact for $> 60$ days; product decisions based on internal stakeholder opinions or anecdotal executive feedback. |
| **L4** | **20** | **Zero Customer Contact (Assumption Bias)** | Product decisions made entirely in corporate conference rooms based on internal speculation. "We know what our customers need." | Zero user interviews conducted in past 12 months; customer feedback dismissed as edge cases by executive leadership. |

---

## S4: Domain Autonomy & System Boundaries

- **Maximum Weight:** 20 points
- **Theoretical Basis:** Team Topologies (Skelton & Pais, 2019). Stream-aligned product teams must have end-to-end domain ownership and minimal cognitive load, avoiding heavy handoffs to specialized horizontal silos.
- **Traceable Artifacts:** Team Topologies Map, Cross-Team Dependency Logs, Release Lead Time Metrics.

### Calibration Rubric

| Level | Score | Anchor Designation | Empirical Diagnostic Characteristics | Traceable Evidence Benchmark |
| :---: | :---: | :--- | :--- | :--- |
| **L1** | **3** | **Autonomous Stream-Aligned Team** | Cross-functional team possesses all skills (frontend, backend, QA, DevOps) to ship from idea to production independently. | Lead time from commit to production $< 2$ hours; zero cross-team blocking tickets in Jira. |
| **L2** | **8** | **Light Platform Dependency** | Team owns its domain but depends on an internal platform team for infrastructure, auth, or shared CI/CD pipelines. | Documented APIs between stream team and platform team; dependency wait times $< 3$ business days. |
| **L3** | **14** | **Heavy Multi-Team Handoffs** | Feature delivery requires coordinated scheduling across $\ge 3$ specialized component teams (e.g., DBA team, API team, UI team, QA team). | Cross-team dependency blockers logged in $> 40\%$ of sprint tasks; release requires coordinated integration testing window. |
| **L4** | **20** | **Total Organizational Gridlock** | Paralyzing matrix structure. Teams own horizontal fragments; nobody has end-to-end accountability for customer value delivery. | Multi-month release trains; cross-team blame during outages; changes require architecture review board approval. |

---

## S5: Technical Debt Health & Architecture

- **Maximum Weight:** 15 points
- **Theoretical Basis:** The Flow Framework (Kersten, 2018). If product management starves engineering of refactoring time, technical debt increases until feature velocity drops to near zero.
- **Traceable Artifacts:** Engineering Debt Allocation Ratio in Sprint Backlogs, SonarQube Code Quality Telemetry, Bug-to-Feature Ratio.

### Calibration Rubric

| Level | Score | Anchor Designation | Empirical Diagnostic Characteristics | Traceable Evidence Benchmark |
| :---: | :---: | :--- | :--- | :--- |
| **L1** | **2** | **Protected Refactoring Allocation ($\ge 20\%$)** | Product leadership explicitly reserves $\ge 20\%$ of every sprint capacity for technical debt refactoring and architecture health. | Sprint velocity logs showing consistent 20–25% allocation to non-functional debt tickets; low defect carryover. |
| **L2** | **6** | **Balanced Periodic Debt Reduction** | Dedicated technical debt hardening sprints scheduled every quarter; core architecture maintained systematically. | Quarterly refactoring milestones; test automation coverage $> 75\%$. |
| **L3** | **11** | **Starved Architecture (Debt Accumulation)** | Product leadership deprioritizes debt to hit commercial delivery deadlines. Engineers warning of fragility; code becoming brittle. | Refactoring tickets repeatedly deferred for $> 6$ months; new features require modifying legacy spaghetti code. |
| **L4** | **15** | **Terminal Technical Debt Paralysis** | Zero debt allocation. Codebase is so brittle that minor changes trigger widespread regression bugs; engineers dread touching core modules. | Bug tickets outnumber feature tickets in sprints; $> 50\%$ of engineering capacity consumed by firefighting and hotfixes. |
