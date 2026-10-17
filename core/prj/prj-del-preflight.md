# DGRF PrjDel Pre-Flight: Pre-Contract Baseline Audit Rubric (P1–P5)

The **Pre-Flight Execution Readiness (`PrjDel` Preflight)** vector is applied during **Phase 0, Inception, Scoping, and Pre-Contract Negotiations** before capital expenditure is committed. Because live operational telemetry (defects, CPI, burndown) does not yet exist in Phase 0, this module stress-tests the *foundational assumptions* of the proposed execution plan.

---

## Dimension Overview

| Dimension | Domain | Anchor Scores (L1 $\to$ L4) | Max Points | Primary Theoretical Foundation |
| :--- | :--- | :--- | :--- | :--- |
| **P1** | **Deadline Realism & Estimation Rigor** | 3, 10, 18, **25** | 25 | The Planning Fallacy & Reference Class Forecasting (Kahneman & Tversky, 1979) |
| **P2** | **Requirement Maturity & Boundary Definition** | 3, 8, 14, **20** | 20 | Boundary Objects (Star & Griesemer, 1989) & Ambiguity Economics |
| **P3** | **Budget Fidelity & Cost Estimation Model** | 3, 8, 14, **20** | 20 | Winner's Curse in Procurement & Parametric Cost Modeling |
| **P4** | **Dedicated Resource & Team Commitment** | 2, 6, 11, **15** | 15 | Ring-Fenced Core Capability vs The "Phantom Team" Fallacy |
| **P5** | **Definition of Done & Verification Tooling** | 3, 8, 14, **20** | 20 | Automated Verification Architecture & Telemetry Baselines |

$$\text{Base}_{\text{preflight}} = \sum_{k=1}^5 P_k \in [14, 100]$$

---

## P1: Deadline Realism & Estimation Rigor

- **Maximum Weight:** 25 points
- **Theoretical Basis:** The Planning Fallacy (Kahneman & Tversky, 1979) and Reference Class Forecasting (Flyvbjerg, 2011). Humans systematically underestimate project durations due to optimism bias, treating best-case scenarios as probable outcomes.
- **Traceable Audit Artifacts:** Probabilistic Monte Carlo Schedule Simulation, Reference Class Historical Comparison, Critical Dependency Mapping.

### Calibration Rubric

| Level | Score | Anchor Designation | Empirical Diagnostic Characteristics | Traceable Audit Evidence |
| :---: | :---: | :--- | :--- | :--- |
| **L1** | **3** | **Empirical Probabilistic Estimation** | Schedule derived from historical reference class benchmarks and Monte Carlo simulations with an 80% confidence interval ($P_{80}$). | Quantitative Schedule Risk Analysis (QSRA) report attached with distribution curves and risk-adjusted milestone dates. |
| **L2** | **10** | **Parametric Estimation with Benchmarks** | Schedule built using standardized work breakdown structures (WBS) and verified organizational historical velocity benchmarks. | Documented bottom-up WBS cross-referenced against $\ge 3$ comparable organizational deliveries. |
| **L3** | **18** | **Optimistic Expert Consensus** | Schedule based on subjective engineer consensus assuming zero external delays, zero dependency slip, and immediate staff onboarding. | High-level Gantt chart without confidence bounds; dependencies assumed to be parallel with zero float. |
| **L4** | **25** | **Mandated Arbitrary Deadline** | Target completion date mandated top-down by marketing or C-suite without feasibility review or architectural consultation. | Delivery date fixed by public press release or corporate event prior to scoping or architecture sign-off. |

---

## P2: Requirement Maturity & Boundary Definition

- **Maximum Weight:** 20 points
- **Theoretical Basis:** Requirements ambiguity is the primary upstream generator of change order disputes and defect rework. Projects starting with vague aspirations inevitably incur $>100\%$ scope expansion.
- **Traceable Audit Artifacts:** Functional Specification Document (FSD), Architectural Boundary Definitions, API Contract Drafts, Measurable Non-Functional Requirements (NFR) Schedule.

### Calibration Rubric

| Level | Score | Anchor Designation | Empirical Diagnostic Characteristics | Traceable Audit Evidence |
| :---: | :---: | :--- | :--- | :--- |
| **L1** | **3** | **Quantified Acceptance Criteria** | Core functional boundaries explicitly mapped. All critical integrations defined with draft API specifications and measurable NFR SLAs. | Formal FSD with Given-When-Then acceptance criteria; latency, throughput, and security SLAs documented. |
| **L2** | **8** | **Detailed User Story Epics** | Comprehensive functional backlog with clear user persona boundaries and agreed out-of-scope declarations. | Jira/Azure DevOps epic backlog with mapped dependencies and signed business requirement sign-offs. |
| **L3** | **14** | **Vague Functional Ambiguity** | Requirements written as high-level narrative statements ("seamless user onboarding", "automated compliance") without objective criteria. | High-level PRD with ambiguous success metrics; vendor statements containing phrases like "to be determined in sprint 1". |
| **L4** | **20** | **Unbounded Conceptual Aspiration** | Project exists merely as an idea or pitch deck. Scope boundaries are completely undefined; business stakeholders disagree on primary goals. | Project documentation consists solely of executive presentations; zero functional specifications or boundary definitions. |

---

## P3: Budget Fidelity & Cost Estimation Model

- **Maximum Weight:** 20 points
- **Theoretical Basis:** The "Winner's Curse" in competitive bidding (Capen et al., 1971). Procurement teams selecting the lowest unvetted vendor bid inevitably experience catastrophic budget explosions during execution.
- **Traceable Audit Artifacts:** Independent Cost Estimate (ICE), Vendor Cost Breakdown Sheets, Infrastructure Sizing Models, Licencing Audits.

### Calibration Rubric

| Level | Score | Anchor Designation | Empirical Diagnostic Characteristics | Traceable Audit Evidence |
| :---: | :---: | :--- | :--- | :--- |
| **L1** | **3** | **Independent Parametric Cost Validation** | Budget verified through independent actuarial cost models and historical industry benchmarks. Includes full infrastructure run-rates. | Third-party Independent Cost Estimate (ICE) validating financial model with $\ge 20\%$ dedicated contingency allocation. |
| **L2** | **8** | **Bottom-Up Verified Estimate** | Detailed bottom-up cost build by technical architecture and delivery leads, vetted against prevailing market contractor rates. | Itemized spreadsheet covering labor, cloud hosting, tooling licenses, and security testing allowances. |
| **L3** | **14** | **Underfunded Baseline / Shaved Estimates** | Budget reduced during finance executive reviews to meet arbitrary capital expenditure targets without corresponding scope drops. | Meeting minutes showing budget shaved by $>20\%$ while scope remained 100% fixed; no vendor cost guarantees. |
| **L4** | **20** | **Lowest Unvetted Bid / Speculative Funding** | Budget based solely on the lowest vendor proposal with obvious unrealistic assumptions; funding contingent on unconfirmed future capital. | Vendor contract structured with heavy exclusions and high hourly rates for inevitable change requests. |

---

## P4: Dedicated Resource Commitment

- **Maximum Weight:** 15 points
- **Theoretical Basis:** Brook's Law (Brooks, 1975) and Cognitive Context Switching (Weinberg, 1992). The "Phantom Team" fallacy occurs when key personnel are listed as committed on paper while remaining 80% allocated to existing operational fires.
- **Traceable Audit Artifacts:** Resource Allocation Matrix, Staffing Commitments Signed by Line Managers, Key-Person Dedicated Time Agreements.

### Calibration Rubric

| Level | Score | Anchor Designation | Empirical Diagnostic Characteristics | Traceable Audit Evidence |
| :---: | :---: | :--- | :--- | :--- |
| **L1** | **2** | **Ring-Fenced Dedicated Core Team** | 100% dedicated, named core engineering leads and principal architects released from all ongoing operational support duties. | HR/Line Manager signed staffing release letters; dedicated named leads onboarded before kickoff. |
| **L2** | **6** | **Committed Internal Team ($>75\%$ Allocation)** | Core internal engineers allocated at $\ge 75\%$ time, with minimal operational support handovers planned. | Resource management system confirms $\ge 75\%$ dedicated booking across all planned sprints. |
| **L3** | **11** | **Fractional / Shared Team Members** | Key architects and leads shared across $\ge 3$ simultaneous active projects. Heavy reliance on unvetted future contractor hiring. | Allocation records show core engineers at 20–30% capacity; key technical roles currently marked "TBD / To Be Hired". |
| **L4** | **15** | **The "Phantom Team" Fallacy** | Named experts in proposal are not assigned to project; staffing outsourced to revolving offshore teams with zero prior domain experience. | Zero named internal technical staff; vendor proposes 100% offshore rotation with zero proven stack experience. |

---

## P5: Definition of Done & Verification Tooling

- **Maximum Weight:** 20 points
- **Theoretical Basis:** Continuous Integration & Automated Verification (Forsgren et al., 2018). If an initiative begins without automated test harnesses and clear acceptance gates, subjective opinion replaces engineering quality control.
- **Traceable Audit Artifacts:** Definition of Done (DoD) Standard, CI/CD Pipeline Architecture, Staging Environment Readiness Sign-Off.

### Calibration Rubric

| Level | Score | Anchor Designation | Empirical Diagnostic Characteristics | Traceable Audit Evidence |
| :---: | :---: | :--- | :--- | :--- |
| **L1** | **3** | **Automated Pipeline & Strict DoD Ready** | Automated CI/CD pipelines, security scanners, and isolated test environments provisioned before sprint 1. Quantified DoD signed by all parties. | Working pipeline verifying linting, unit tests, and automated deployment into an isolated staging environment. |
| **L2** | **8** | **Standard DoD with Manual Gating** | Clear DoD agreed with documented manual acceptance testing procedures; staging environments provisioned and accessible. | Written DoD document signed off by Product Owner, QA Lead, and Vendor Delivery Director. |
| **L3** | **14** | **Informal Subjective Criteria** | DoD is vague or deferred until later stages ("QA will verify in Phase 3"); test environments still unprovisioned at project start. | No written DoD; environment provisioning ticket still open in infrastructure backlog at project kickoff. |
| **L4** | **20** | **Zero Quality Gates / Production Testing** | Zero definition of done; testing planned directly in production post-deployment; no CI/CD tooling or test automation. | Deployment planned via manual FTP/SSH scripts; zero automated regression or integration test suites. |

---

## Quadrant Interpretation in Pre-Flight Mode (Baseline Commitment Risk)

When executing DGRF in Pre-Flight mode, the coordinates represent **Baseline Commitment Risk**:

- **$Q_1$ (Systemic Fragility / Do Not Sign):** Unfunded, mandated deadline with an absentee sponsor and adversarial vendor contract. Signing this contract represents corporate negligence.
- **$Q_2$ (Fragile Governance / Contractual Trap):** Viable technical team and clear DoD, but toxic commercial contract and diffuse sponsorship. Reform procurement before signing.
- **$Q_3$ (Resilient Baseline / Greenlight):** Validated Monte Carlo estimates, outcome-aligned contract, ring-fenced team, and clear authority. Proceed to execution.
- **$Q_4$ (Execution Feasibility Deficit):** Strong governance and budget, but severe timeline or staffing capability gaps. Delay kickoff until lead architects are onboarded.
