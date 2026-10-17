# DGRF PrjGov: Structural Governance Risk Rubric (D1–D5)

The **Structural Governance (`PrjGov`)** vector quantifies the institutional, contractual, and architectural preconditions under which an enterprise IT project operates. Structural governance determines the project's **degrees of freedom** and sets the boundary conditions for all downstream operational execution.

---

## Dimension Overview

| Dimension | Domain | Anchor Scores (L1 $\to$ L4) | Max Points | Primary Theoretical Foundation |
| :--- | :--- | :--- | :--- | :--- |
| **D1** | **Decision-Making Authority & Sponsorship** | 3, 10, 18, **25** | 25 | Single-Threaded Leadership / Organizational Cybernetics |
| **D2** | **Procurement & Risk Allocation** | 3, 9, 15, **20** | 20 | Principal-Agent Theory (Eisenhardt, 1989) & COBIT APO10 |
| **D3** | **Scope Governance & CCB Discipline** | 3, 9, 15, **20** | 20 | Zero-Sum Scope Tradeoff & Baseline Control |
| **D4** | **Risk Contingency & Reserves Allocation** | 3, 8, 14, **20** | 20 | Actuarial Reserve Modeling & Buffer Ring-Fencing |
| **D5** | **Architecture Coupling & Technical Governance** | 2, 7, 11, **15** | 15 | Conway's Law (Conway, 1968) & Domain-Driven Bounded Contexts |

$$\text{Base}_{\text{gov}} = \sum_{i=1}^5 D_i \in [14, 100]$$

---

## D1: Decision-Making Authority & Sponsorship

- **Maximum Weight:** 25 points
- **Theoretical Basis:** High-stakes technology transformations cannot survive consensus-by-committee. When authority is diffuse, decision latency compounds exponentially, and political compromise replaces technical coherence.
- **Traceable Audit Artifacts:** Project Charter, Executive RACI Matrix, Steering Committee Minutes, Delegation of Authority (DoA) register, Escalation Turnaround Logs.

### Calibration Rubric

| Level | Score | Anchor Designation | Empirical Diagnostic Characteristics | Traceable Evidence Benchmark |
| :---: | :---: | :--- | :--- | :--- |
| **L1** | **3** | **Single Accountable Owner (Unilateral Mandate)** | A single C-level or VP-level executive owns the budget, timeline, and outcome. Escalations resolved in $< 48$ hours. Zero reliance on diffuse steering consensus. | Signed project charter naming a single Business Sponsor with unilateral budget signing authority up to project cap. |
| **L2** | **10** | **Structured Steering Delegation** | Clear primary sponsor supported by an agile steering committee. Explicit escalation SLA ($< 1$ week). Bounded delegation granted to Project Director. | Formal steering committee charter with documented voting rules and delegation limits defined in DoA. |
| **L3** | **18** | **Diffuse Committee Consensus** | Multiple department heads must reach unanimous consensus. Escalation turnaround takes 2–4 weeks. Cross-departmental stalemates stall technical execution. | Meeting minutes show deferred decisions across 3+ consecutive steering sessions; competing stakeholder requirements logged without resolution. |
| **L4** | **25** | **Absentee Sponsor / Paralyzed Ownership** | Absentee sponsor, contested ownership across competing C-suite peers, or active executive infighting. Zero authoritative mandate to unblock delivery. | No signed charter; conflicting executive mandates; project manager forced to adjudicate strategic scope disputes without authority. |

---

## D2: Procurement Alignment & Vendor Contracting

- **Maximum Weight:** 20 points
- **Theoretical Basis:** Principal-Agent Theory (Eisenhardt, 1989; Stiglitz, 1989) and COBIT APO10 (Manage Vendors). Traditional fixed-price waterfall contracting creates an adversarial zero-sum game: the client hoards scope while the vendor cuts quality to maximize gross margin.
- **Traceable Audit Artifacts:** Master Services Agreement (MSA), Statements of Work (SOW), Commercial Incentive Schedule, Vendor SLA Scorecards, Dispute Escalation Log.

### Calibration Rubric

| Level | Score | Anchor Designation | Empirical Diagnostic Characteristics | Traceable Evidence Benchmark |
| :---: | :---: | :--- | :--- | :--- |
| **L1** | **3** | **Outcome-Linked / Shared Risk-Reward** | Vendor compensation is tied to verified business outcomes or sprint quality gates. Shared risk-reward pool. High transparency and aligned incentives. | SOW with holdback tranches released upon independent acceptance and verifiable production telemetry; joint risk reserve. |
| **L2** | **9** | **Capped T&M with Quality Gates** | Time-and-Materials with a Guaranteed Maximum Price (GMP) and rigorous sprint acceptance criteria. Vendor staffing vetted by client leads. | Monthly invoicing subject to automated test suite pass rate $>95\%$ and zero critical defect carryover. |
| **L3** | **15** | **Adversarial Fixed-Price Waterfall** | Rigid fixed-price terms with severe change order friction. Vendor incentivized to minimize hours, staff junior personnel, and penalize client requirements. | SOW containing rigid waterfall milestones; formal change requests exceed 15% of contract value; legal disputation over defect definitions. |
| **L4** | **20** | **Predatory Lock-In / Unaligned Cost-Plus** | Cost-plus contracting with zero penalties for delay, or proprietary legacy vendor lock-in with unchecked billing and offshore rotation. | Vendor replaces senior architects with junior staff post-signing without penalty; billing continues regardless of milestone slippage. |

---

## D3: Scope Governance & Change Control Board (CCB)

- **Maximum Weight:** 20 points
- **Theoretical Basis:** Uncontrolled scope growth is the leading proximate driver of software schedule collapse. Governance must enforce strict zero-sum tradeoffs rather than unconstrained backlog accumulation.
- **Traceable Audit Artifacts:** CCB Charter, Change Request (CR) Log, Impact Assessment Worksheets, Scope Tradeoff Audit Trail.

### Calibration Rubric

| Level | Score | Anchor Designation | Empirical Diagnostic Characteristics | Traceable Evidence Benchmark |
| :---: | :---: | :--- | :--- | :--- |
| **L1** | **3** | **Zero-Sum Tradeoff Discipline** | Any approved scope addition mandates dropping an equivalent estimate of existing baseline scope. Strict architectural integrity enforced. | Documented CCB logs showing scope trade-offs (1 item added = 1 item subtracted); zero baseline budget variance. |
| **L2** | **9** | **Empirical Impact Assessment** | Formal CCB meets bi-weekly. Every change undergoes rigorous cost, schedule, and architectural regression modeling before sign-off. | CCB approval requires signed technical impact statement from lead enterprise architect and financial controller. |
| **L3** | **15** | **Permissive CCB Drift** | CCB exists on paper but rubber-stamps executive requests. Frequent "emergency" additions approved without schedule or budget extensions. | CR log shows $>85\%$ approval rate without corresponding budget/schedule extensions; scope expansion $>25\%$ over baseline. |
| **L4** | **20** | **Ungoverned Executive Backdoors** | Zero scope control. Executives, business analysts, and vendors add features directly into sprint backlogs bypassing the CCB completely. | No centralized CR log; direct developer task injection via unreviewed tickets or verbal executive orders. |

---

## D4: Risk Contingency & Reserves Allocation

- **Maximum Weight:** 20 points
- **Theoretical Basis:** Actuarial reserve modeling and reference class forecasting (Flyvbjerg, 2011). Software initiatives without dedicated, ring-fenced contingency buffers collapse upon the first unforeseen technical dependency discovery.
- **Traceable Audit Artifacts:** Risk Management Plan, Financial Contingency Ledger, Drawdown Authorization Protocol, Quantitative Schedule Risk Analysis (QSRA).

### Calibration Rubric

| Level | Score | Anchor Designation | Empirical Diagnostic Characteristics | Traceable Evidence Benchmark |
| :---: | :---: | :--- | :--- | :--- |
| **L1** | **3** | **Ring-Fenced Buffer ($\ge 20\%$)** | Dedicated financial ($\ge 20\%$) and schedule ($\ge 15\%$) contingency buffer under the direct control of the Project Lead. Formal drawdown criteria. | Financial ledger verifying dedicated contingency GL code; authorized drawdown without board-level renegotiation. |
| **L2** | **8** | **Standard Reserve ($10\text{--}15\%$)** | Adequate contingency reserves ($10\text{--}15\%$) managed under a formal governance approval protocol. | Documented risk register linked directly to reserve drawdown estimates with finance sign-off. |
| **L3** | **14** | **Depleted / Shaved Buffer ($< 5\%$)** | Minimal contingency ($< 5\%$) prematurely absorbed into baseline operational expenses or trimmed during initial budget negotiations. | Risk log contains unmitigated high-impact risks with zero assigned contingency; any cost overrun requires emergency budget approvals. |
| **L4** | **20** | **Zero Contingency Buffer** | Zero financial or schedule buffer. Project operates on a best-case "happy path" assumption; any friction results in immediate financial distress. | Budget spreadsheet has zero unallocated reserve lines; schedule contains zero buffer sprints before hard market commitments. |

---

## D5: Architecture Coupling & Technical Debt Governance

- **Maximum Weight:** 15 points
- **Theoretical Basis:** Conway's Law (Conway, 1968) and Domain-Driven Design (Evans, 2003). Organizational governance boundaries dictate technical architecture. Fractured governance creates monolithic spaghetti systems with high blast radiuses and severe deployment coupling.
- **Traceable Audit Artifacts:** Enterprise Architecture Sign-Off, Service Dependency Graphs, API Contract Repositories, Automated Regression Suite Coverage Reports.

### Calibration Rubric

| Level | Score | Anchor Designation | Empirical Diagnostic Characteristics | Traceable Evidence Benchmark |
| :---: | :---: | :--- | :--- | :--- |
| **L1** | **2** | **Decoupled / Independent Deployability** | Modular architecture with strict API contracts and consumer-driven contract tests. Autonomous team deployment without synchronized release trains. | Architecture diagram showing bounded contexts; CI/CD pipeline enables independent production deployment without cross-team sync. |
| **L2** | **7** | **Bounded Monolith** | Single codebase with strictly enforced module boundaries and documented interfaces. Synchronized deployments are scheduled and predictable. | Linter rules enforcing modular boundaries; automated regression test suite passes in $< 30$ minutes. |
| **L3** | **11** | **Synchronous Legacy Coupling** | High dependency on legacy monolithic backends. Changes require coordinated multi-system testing and weekend deployment freezes. | Dependency map showing $>5$ external system calls on critical transactions; release trains require multi-team sign-offs. |
| **L4** | **15** | **Undocumented Spaghetti Monolith** | Extreme legacy entanglement, undocumented database triggers, circular dependencies, and zero automated regression testing harness. | Zero automated test coverage; releases require 72-hour manual regression cycles; defects routinely discovered in unrelated subsystems. |

---

## Structural Interaction Rule

$$\text{Penalty}_{\text{gov}} = \begin{cases} 10 & \text{if } D_1 = 25 \land D_2 \ge 15 \\ 0 & \text{otherwise} \end{cases}$$

$$\text{Score}_{\text{gov}} = \min\left(100, \, \text{Base}_{\text{gov}} + \text{Penalty}_{\text{gov}}\right)$$
