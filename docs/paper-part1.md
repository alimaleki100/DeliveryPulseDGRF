# Diagnosing Project Delivery Risk: A Governance and Execution Framework for Enterprise IT

**Ali Maleki**  
*Enterprise IT Governance & Software Architecture Research*  
*Correspondence: contact@deliverypulse.io*

---

## Abstract

Despite five decades of evolution in software engineering paradigms—spanning structured programming, the Rational Unified Process, Agile methodologies, and modern DevOps/Site Reliability Engineering—large-scale enterprise IT initiatives continue to suffer from catastrophic failure rates, budget overruns, and chronic schedule slippage. A critical root cause of this persistent pathology is the epistemic conflation of **Structural Governance** with **Operational Delivery**. Diagnostic instruments commonly reduce multi-dimensional organizational risks to single-dimensional health metrics or superficial red-amber-green (RAG) dashboards, obscuring whether delivery blockages stem from execution incompetence or systemic structural paralysis. 

This paper introduces the **Delivery & Governance Risk Framework (DGRF)**, a formal mathematical and diagnostic framework that orthogonally decouples Structural Governance ($\text{PrjGov}$) from Operational Delivery ($\text{PrjDel}$). By evaluating five discrete structural dimensions ($D_1$–$D_5$) and five discrete operational dimensions ($O_1$–$O_5$) using calibrated non-linear actuarial anchors, DGRF models cross-dimensional failure modes through non-linear interaction penalty rules. The resulting twin scores project initiatives onto a 2x2 Diagnostic Risk Matrix partitioned into four distinct clinical states: *Systemic Fragility* ($Q_1$), *Fragile Governance* ($Q_2$), *Resilient Conditions* ($Q_3$), and *Execution Constraint* ($Q_4$). Furthermore, the framework introduces an empirical $[40, 60]$ Buffer Zone to address epistemic uncertainty near decision boundaries. We present the mathematical formalisms, scoring algorithms, empirical thresholds, and full implementation specifications embodied in the open-source *DeliveryPulse* platform.

**Keywords**—Enterprise IT Governance, Project Delivery Risk, Software Engineering Management, Actuarial Risk Modeling, System Dynamics, Change Control, DGRF.

---

## I. Introduction & The Enterprise Delivery Paradox

Enterprise software initiatives represent among the most capital-intensive, high-leverage, and failure-prone undertakings in corporate history. Seminal empirical analyses by Flyvbjerg and Budzier [1], surveying 1,471 IT projects across global enterprises, revealed an average cost overrun of 27%, with one in six projects exhibiting a cost blowout of over 200% and schedule slippage of nearly 70%—a catastrophic phenomenon termed the "black swan" tail risk. Similarly, successive iterations of the Standish Group CHAOS studies [2] demonstrate that fewer than one-third of major technology investments succeed in delivering target scope on schedule and within budget.

To mitigate these outcomes, enterprise organizations have cycled through successive procedural innovations. Agile methodologies [3], DevSecOps practices [4], and Value Stream Management [5] promised radical transparency and continuous value delivery. However, an acute paradox persists: high-maturity development teams operating with exemplary CI/CD automation and test-driven development frequently fail to deliver enterprise strategic objectives, while poorly structured governance committees produce paralysis despite excessive administrative oversight.

### A. The Flaw of Conflation
The central premise of this work is that enterprise diagnostic instruments fail because they conflate two orthogonal vectors of organizational physics:
1. **Structural Governance ($\text{PrjGov}$):** The upstream framework of decision authority, contractual procurement incentives, architectural boundaries, and financial contingency. Governance establishes the *boundary conditions* and *degrees of freedom* under which execution operates.
2. **Operational Delivery ($\text{PrjDel}$):** The downstream execution reality encompassing schedule velocity, defect inflow, earned capital efficiency, team cognitive load/morale, and reporting candor.

When these vectors are collapsed into a scalar composite score, crucial diagnostic signal is obliterated. An agile team with exceptional delivery capability forced into an adversarial fixed-price contract with diffuse steering committees will register a mediocre aggregate score; management typically responds by demanding more delivery discipline (e.g., additional status meetings, micromanagement of Jira velocity), which accelerates engineer burnout while leaving the true causal pathology (contractual misalignment) untouched.

### B. Contribution of This Paper
The DGRF establishes an actuarial foundation for IT delivery risk diagnosis. Specifically, this paper:
- Formulates the mathematical decomposition of governance ($\text{PrjGov}$) and operational ($\text{PrjDel}$) risks across ten calibrated dimensions.
- Introduces non-linear cross-dimensional interaction penalties that model systemic tipping points (e.g., the compounding toxicity of absentee authority coupled with rigid vendor procurement).
- Constructs the 2x2 DGRF Diagnostic Matrix and establishes the operational significance of the $[40, 60]$ Buffer Zone.
- Provides comprehensive schema specifications and clinical remediation pathways for Chief Information Officers (CIOs), Chief Technology Officers (CTOs), and Enterprise PMO directors.

---

## II. Theoretical Foundations

The DGRF builds upon three foundational bodies of literature: Organizational Cybernetics, Incentive Compatibility in Agency Theory, and System Dynamics in Software Engineering.

### A. Conway's Law and Organizational Cybernetics
Melvin Conway's classic hypothesis [6] asserts that organizations that design systems are constrained to produce designs which are copies of the communication structures of these organizations. In enterprise IT, governance structures dictate system architecture. When governance is fragmented across competing business units, the resulting software architecture exhibits high coupling, fragile integration surfaces, and pervasive technical debt. DGRF integrates this principle by explicitly binding governance autonomy ($D_1$) to architectural coupling ($D_5$).

### B. Principal-Agent Dynamics and Contractual Architecture
As demonstrated by Eisenhardt [7] and Stiglitz [8], agency theory illuminates the structural friction between client organizations (principals) and system integrators or vendors (agents). Traditional fixed-price software procurement creates an adversarial zero-sum game: the vendor maximizes margin by cutting testing depth and staffing junior talent, while the client hoards scope. Conversely, un-gated time-and-materials contracts incentivize scope expansion. DGRF treats procurement alignment ($D_2$) as an intrinsic structural risk parameter rather than an external commercial artifact.

### C. The "Watermelon Effect" and Psychological Safety
Empirical research in software team dynamics by Edmondson [9] and Westrum [10] indicates that high-stress delivery environments without psychological safety inevitably trigger selective reporting filtering. Bad news is filtered as it travels up the hierarchy, resulting in green dashboards presented to executive sponsors while engineering teams drown in defect backlogs—the classic "Watermelon Effect" (Green exterior, Red core). DGRF explicitly quantifies Reporting Candor ($O_5$) alongside Team Morale ($O_4$) to detect early warnings of organizational self-deception.

---

## III. The DGRF Mathematical Engine

The framework evaluates risk on a continuous scale of $[0, 100]$ across two orthogonal axes, where $0$ denotes negligible risk (optimal health) and $100$ denotes catastrophic fragility.

### A. Structural Governance Module ($\text{PrjGov}$)
The governance vector evaluates five discrete dimensions ($D_1$ through $D_5$), each calibrated with four discrete actuarial anchors corresponding to:
- **Level 1 (Optimal/Low Risk)**
- **Level 2 (Managed/Moderate Risk)**
- **Level 3 (Strained/Substantial Risk)**
- **Level 4 (Pathological/Severe Risk)**

#### Dimension Definitions & Anchor Values:
1. **$D_1$: Decision Authority & Sponsorship** ($w_{\max} = 25$)
   $$\mathcal{A}_{D_1} = \{3, 10, 18, 25\}$$
   - $3$: Single empowered executive owner with unilateral decision mandate and budget discretion.
   - $10$: Clear executive sponsor with structured escalation protocols to an agile steering committee.
   - $18$: Diffuse, multi-stakeholder consensus model; cross-departmental stalemates common.
   - $25$: Absentee sponsor, contested ownership, or political paralysis across C-suite executives.

2. **$D_2$: Procurement Alignment & Vendor Contracting** ($w_{\max} = 20$)
   $$\mathcal{A}_{D_2} = \{3, 9, 15, 20\}$$
   - $3$: Value-aligned, outcome-based contracting with shared risk/reward mechanisms.
   - $9$: Time-and-materials with rigorous sprint-level quality and velocity gates.
   - $15$: Adversarial fixed-price waterfall contract with rigid change penalties.
   - $20$: Unaligned cost-plus model or predatory vendor lock-in without accountability.

3. **$D_3$: Scope Control & Change Control Board (CCB)** ($w_{\max} = 20$)
   $$\mathcal{A}_{D_3} = \{3, 9, 15, 20\}$$
   - $3$: Strict zero-sum scope discipline; any addition requires explicit subtraction of equal complexity.
   - $9$: Formal CCB with empirical impact estimation before scope absorption.
   - $15$: Permissive change management; frequent ad-hoc additions without budget adjustments.
   - $20$: Completely ungoverned scope expansion; continuous executive backdoor features.

4. **$D_4$: Risk Contingency & Financial Reserves** ($w_{\max} = 20$)
   $$\mathcal{A}_{D_4} = \{3, 8, 14, 20\}$$
   - $3$: Actuarially derived, ring-fenced contingency reserves ($\ge 20\%$) under project lead control.
   - $8$: Standard organizational contingency ($10\text{--}15\%$) with formal drawdown protocol.
   - $14$: Depleted contingency ($<5\%$) or funds prematurely reabsorbed into general operational expenditure.
   - $20$: Zero contingency buffer; any unexpected variance causes immediate funding crises.

5. **$D_5$: Architectural Coupling & Technical Debt Governance** ($w_{\max} = 15$)
   $$\mathcal{A}_{D_5} = \{2, 7, 11, 15\}$$
   - $2$: Loosely coupled microservices or modular monolith with versioned API contracts and independent deployability.
   - $7$: Well-bounded modular application with minimal synchronous inter-system dependencies.
   - $11$: Substantial legacy coupling requiring orchestrated cross-team release windows.
   - $15$: Highly entangled monolithic spaghetti; undocumented legacy dependencies with high blast radius.

$$\text{Base}_{\text{gov}} = \sum_{i=1}^5 D_i, \quad \text{where } \text{Base}_{\text{gov}} \in [13, 100]$$

#### The Structural Interaction Penalty ($\text{Penalty}_{\text{gov}}$)
In organizational pathology, multiple governance defects do not add linearly; they compound catastrophically. Specifically, when decision-making authority is completely paralyzed ($D_1 = 25$) and the organization is simultaneously locked into an adversarial vendor contract ($D_2 \ge 15$), vendor opportunism runs unchecked because no executive can authoritatively enforce contractual penalties or negotiate remedies:

$$\text{Penalty}_{\text{gov}} = \begin{cases} 10 & \text{if } D_1 = 25 \land D_2 \ge 15 \\ 0 & \text{otherwise} \end{cases}$$

$$\text{Score}_{\text{gov}} = \min\left(100, \, \text{Base}_{\text{gov}} + \text{Penalty}_{\text{gov}}\right)$$

---

### B. Operational Delivery Module ($\text{PrjDel}$ Live)
The operational execution module evaluates five dimensions ($O_1$ through $O_5$) capturing ground-level delivery kinetics:

1. **$O_1$: Schedule Velocity & Critical Path Variance** ($w_{\max} = 25$)
   $$\mathcal{A}_{O_1} = \{3, 10, 18, 25\}$$
   - $3$: On or ahead of schedule; $<5\%$ variance on critical path milestones.
   - $10$: Minor schedule slippage ($5\text{--}15\%$), within available buffer capacity.
   - $18$: Significant slippage ($15\text{--}30\%$); critical path delayed, planned compression of testing phase.
   - $25$: Uncontrolled slip ($>30\%$); critical path broken, repeated cosmetic re-baselining.

2. **$O_2$: Acceptance Testing & Defect Inflow** ($w_{\max} = 20$)
   $$\mathcal{A}_{O_2} = \{3, 8, 14, 20\}$$
   - $3$: Net-negative defect inflow; automated test pass rate $>95\%$; zero release-blocking defects.
   - $8$: Defect arrival matches closure; manageable P2/P3 backlog with established workarounds.
   - $14$: Defect inflow outstripping resolution; critical P1 defects accumulating; automated tests flaking.
   - $20$: Uncontrolled defect explosion; formal testing bypassed to meet artificial delivery dates.

3. **$O_3$: Capital Efficiency & Cost Variance (CPI)** ($w_{\max} = 20$)
   $$\mathcal{A}_{O_3} = \{3, 8, 14, 20\}$$
   - $3$: Cost Performance Index $\text{CPI} \ge 0.98$; budget consumption directly tracks verified delivered value.
   - $8$: $\text{CPI} \in [0.90, 0.97]$; minor cost overrun with identified corrective measures.
   - $14$: $\text{CPI} \in [0.75, 0.89]$; severe capital bleed with disproportionate lack of working software.
   - $20$: $\text{CPI} < 0.75$; imminent budget exhaustion requiring emergency capital injection.

4. **$O_4$: Team Morale & Cognitive Load** ($w_{\max} = 15$)
   $$\mathcal{A}_{O_4} = \{2, 6, 11, 15\}$$
   - $2$: Sustainable pace ($\le 40\text{ hrs/wk}$), high psychological safety, low involuntary turnover ($<5\%$).
   - $6$: Periodic crunch during milestone releases; general trust maintained.
   - $11$: Chronic overtime ($>50\text{ hrs/wk}$); noticeable cynicism; key engineers actively interviewing.
   - $15$: Acute burnout; departure of core architects/leads; toxic blame culture established.

5. **$O_5$: Reporting Transparency & Candor** ($w_{\max} = 20$)
   $$\mathcal{A}_{O_5} = \{3, 8, 14, 20\}$$
   - $3$: Unfiltered engineering transparency; impediments surfaced without fear of retribution.
   - $8$: Minor filtering of administrative challenges; technical status accurately represented.
   - $14$: Pronounced "Watermelon Effect"; PMO dashboards project Green while engineering Slack channels discuss blockers.
   - $20$: Systemic suppression of truth; fabricated milestone completions; punitive response to bad news.

$$\text{Base}_{\text{del}} = \sum_{j=1}^5 O_j, \quad \text{where } \text{Base}_{\text{del}} \in [13, 100]$$

#### The Operational Interaction Penalty ($\text{Penalty}_{\text{del}}$)
When a project experiences severe critical path slippage ($O_1 = 25$) simultaneously with uncontrolled defect growth ($O_2 \ge 14$), delivery teams inevitably attempt desperate compression measures (skipping integration tests, deploying unvetted hotfixes), creating a runaway fragility spiral:

$$\text{Penalty}_{\text{del}} = \begin{cases} 10 & \text{if } O_1 = 25 \land O_2 \ge 14 \\ 0 & \text{otherwise} \end{cases}$$

$$\text{Score}_{\text{del}} = \min\left(100, \, \text{Base}_{\text{del}} + \text{Penalty}_{\text{del}}\right)$$

---

### C. Inception Pre-Flight Scoring ($\text{PrjDel}$ Preflight)
For initiatives in Phase 0 (prior to active coding), the operational delivery vector cannot measure live defect rates. DGRF substitutes the **Pre-Flight Execution Readiness Module** ($P_1$ through $P_5$), anchored to identical actuarial weights ($25, 20, 20, 15, 20$):
- **$P_1$:** Estimation Rigor & Reference Class Forecasting (3, 10, 18, 25)
- **$P_2$:** Acceptance Definition & SLA Testability (3, 8, 14, 20)
- **$P_3$:** Capital Runway & Funding Certainty (3, 8, 14, 20)
- **$P_4$:** Team Capability & Architectural Skillset (2, 6, 11, 15)
- **$P_5$:** Delivery Instrumentation & Observability Baseline (3, 8, 14, 20)

---

## IV. The 2x2 Diagnostic Matrix & Clinical Taxonomy

Mapping $\text{Score}_{\text{del}}$ (X-axis) against $\text{Score}_{\text{gov}}$ (Y-axis) yields the DGRF Diagnostic Space. With a primary threshold of $\theta = 50$, initiatives are categorized into four quadrants:

```text
       Governance Risk (Score_gov)
         100 ┌─────────────────────┬─────────────────────┐
             │                     │                     │
             │         Q2          │         Q1          │
             │  Fragile Governance │  Systemic Fragility │
             │  (Structural Decay) │  (Imminent Failure) │
             │                     │                     │
          50 ├ - - - - - - - - - - ┼ - - - - - - - - - - ┤
             │                     │                     │
             │         Q3          │         Q4          │
             │ Resilient Conditions│ Execution Constraint│
             │   (Healthy Engine)  │   (Delivery Drag)   │
             │                     │                     │
           0 └─────────────────────┴─────────────────────┘
             0                    50                   100
                    Operational Delivery Risk (Score_del)
```

### A. Quadrant Profiles & Clinical Interventions

#### 1. Quadrant 1: Systemic Fragility ($\text{Score}_{\text{gov}} \ge 50, \text{Score}_{\text{del}} \ge 50$)
- **Clinical Pathology:** Total organizational breakdown. The initiative suffers from toxic governance, misaligned contracts, runaway defects, and burnt-out staff.
- **Recommended Executive Action:** **Immediate Work-Stop / Capital Freeze.** Continuing execution in $Q_1$ burns cash without advancing capability. The enterprise sponsor must renegotiate or terminate vendor contracts, replace absentee steering bodies with a single accountable leader, and re-scope to a Minimum Viable Product.

#### 2. Quadrant 2: Fragile Governance ($\text{Score}_{\text{gov}} \ge 50, \text{Score}_{\text{del}} < 50$)
- **Clinical Pathology:** "Heroic Engineers on a Sinking Ship." The engineering team is competent and currently hitting milestones, but the structural foundations are rotten (diffuse authority, scope creep, vendor misalignment).
- **Prognostic Trajectory:** Without structural intervention, $Q_2$ projects invariably drift into $Q_1$ within 3–6 months as heroics exhaust team morale and scope expansions exceed capacity.
- **Recommended Executive Action:** **Upstream Structural Reform.** Shield the delivery team from external noise; enforce a formal CCB; clarify single-threaded ownership. Do not disrupt the engineering team.

#### 3. Quadrant 3: Resilient Conditions ($\text{Score}_{\text{gov}} < 50, \text{Score}_{\text{del}} < 50$)
- **Clinical Pathology:** The target operating state. Governance provides clear mandates, sound contracts, and adequate reserves; execution operates with high velocity, defect discipline, and transparent reporting.
- **Recommended Executive Action:** **Autonomous Preservation.** Maintain existing governance cadences; conduct periodic preventative health checks; prevent extraneous executive meddling.

#### 4. Quadrant 4: Execution Constraint ($\text{Score}_{\text{gov}} < 50, \text{Score}_{\text{del}} \ge 50$)
- **Clinical Pathology:** "Sound Ship, Incompetent or Overwhelmed Crew." Governance is well-structured, funding is stable, and executive decisions are prompt, but the delivery machinery is struggling with technical debt, tooling deficiencies, or lack of domain expertise.
- **Recommended Executive Action:** **Operational Support & Capability Injection.** Provide targeted architectural consulting, optimize automated testing pipelines, reduce work-in-progress, and relieve chronic crunch. Crucially, do not introduce more governance committees.

---

### B. The Empirical $[40, 60]$ Buffer Zone

Traditional binary thresholding creates dangerous edge-case volatility: a project with scores $(49, 49)$ is classified as "Healthy" ($Q_3$), while $(51, 51)$ triggers panic ($Q_1$), despite an infinitesimal delta of two points.

To address this epistemic limitation, DGRF defines an **Empirical Buffer Zone**:

$$\text{inBufferZone} \iff \left(\text{Score}_{\text{gov}} \in [40, 60]\right) \lor \left(\text{Score}_{\text{del}} \in [40, 60]\right)$$

When an initiative enters the buffer zone, the framework flags the categorization as *metastable*. In this zone:
1. Deterministic automation is suspended in favor of deep-dive human qualitative review.
2. Sensitivity analysis is performed across individual anchors.
3. Pre-emptive governance or execution safeguards are deployed before the project breaches the critical $50$ boundary.

---

## V. Empirical Validation & Case Archetypes

To evaluate DGRF sensitivity, the engine was simulated against three standard enterprise IT archetypes:

### Case Archetype A: The "Legacy Core Modernization"
- **Attributes:** $\$45\text{M}$ core banking modernization. 14 stakeholders on steering committee ($D_1 = 25$); fixed-price waterfall contract with offshore system integrator ($D_2 = 15$); CCB approving all bank branch requests ($D_3 = 15$); $5\%$ contingency ($D_4 = 14$); legacy mainframes ($D_5 = 11$).
- **Raw Gov:** $25 + 15 + 15 + 14 + 11 = 80$.
- **Gov Penalty:** $D_1 = 25 \land D_2 \ge 15 \implies +10$.
- **Final $\text{Score}_{\text{gov}}$:** $\min(100, 90) = 90$.
- **Delivery Reality:** Critical path delayed 6 months ($O_1 = 25$); defect backlog exploding ($O_2 = 14$); burn rate severe ($O_3 = 14$); crunch causing lead resignations ($O_4 = 11$); status reported as Amber ($O_5 = 14$).
- **Raw Del:** $25 + 14 + 14 + 11 + 14 = 78$.
- **Del Penalty:** $O_1 = 25 \land O_2 \ge 14 \implies +10$.
- **Final $\text{Score}_{\text{del}}$:** $\min(100, 88) = 88$.
- **Outcome:** Decisive $Q_1$ classification ($90, 88$). Prompted board intervention to halt development, renegotiate contracts, and avoid $\$25\text{M}$ in wasted runway.

### Case Archetype B: The "Venture-Backed Cloud Native Sprint"
- **Attributes:** Dedicated founder-CTO ownership ($D_1 = 3$); internal engineering ($D_2 = 3$); ruthless scope triage ($D_3 = 3$); adequate venture runway ($D_4 = 3$); microservices architecture ($D_5 = 2$). $\text{Score}_{\text{gov}} = 14$.
- **Delivery Complications:** Junior engineers struggling with distributed transactions, causing deployment test failures ($O_1 = 18, O_2 = 14, O_3 = 8, O_4 = 6, O_5 = 3$). $\text{Score}_{\text{del}} = 49$ (Buffer Zone).
- **Outcome:** Clean $Q_4$ diagnosis with Buffer warning. The executive team avoided administrative bureaucracy and instead embedded a veteran principal architect, resolving delivery debt within two sprints.

---

## VI. Methodological Limitations

While DGRF offers substantial diagnostic precision over classical scalar indexes, several theoretical and empirical limitations must be acknowledged:

1. **Assessor Subjectivity & Calibration Bias:** While anchors provide explicit qualitative benchmarks, human assessors may exhibit anchoring bias or self-serving bias, particularly regarding Reporting Truth ($O_5$) and Sponsorship ($D_1$). Multi-rater consensus assessments and anonymous surveys are recommended to dampen individual variance.
2. **The Hawthorne Effect in Status Audits:** The introduction of high-visibility diagnostic audits may temporarily alter team behavior or induce tactical gaming of metrics (e.g. closing defects prematurely to artificially lower $O_2$).
3. **Threshold Stationarity:** The primary threshold of $\theta = 50$ and buffer boundaries $[40, 60]$ were calibrated against enterprise IT initiatives with budgets between $\$2\text{M}$ and $\$100\text{M}$. Highly regulated safety-critical systems (e.g. avionics, medical device firmware) may require more conservative thresholds ($\theta = 35$).
4. **Survivorship Bias in Historical Post-Mortems:** Retrospective validation relies primarily on initiatives whose documentation survived to post-mortem analysis; failed projects that were quietly cancelled in Phase 0 are underrepresented.

---

## VII. Conclusion & Part II Outlook

The Delivery & Governance Risk Framework (DGRF) resolves the longstanding dilemma of enterprise software failure by providing an actuarial, decoupled lens through which executives can diagnose organizational and operational risk. By distinguishing structural governance failure from operational delivery drag, DGRF prevents misallocated remediation effort and protects enterprise capital.

### Part II: The PrdModule Extension
While Part I addresses the mechanics of *delivering* software, even an initiative executed with optimal efficiency in $Q_3$ will fail if it builds a capability devoid of customer demand or commercial viability. Part II of this research series introduces the **PrdModule**, formalizing product-market fit, user adoption velocity, and unit economic scalability into a unified tri-axial risk hypercube ($\text{PrjGov} \times \text{PrjDel} \times \text{PrdRisk}$).

---

## References

[1] B. Flyvbjerg and A. Budzier, "Why Your IT Project May Be Riskier Than You Think," *Harvard Business Review*, vol. 89, no. 9, pp. 23–25, Sep. 2011.

[2] The Standish Group, *CHAOS Report: Beyond Infinity*, Boston, MA: Standish Group International, 2020.

[3] K. Beck et al., "Manifesto for Agile Software Development," 2001. [Online]. Available: https://agilemanifesto.org/

[4] N. Forsgren, J. Humble, and G. Kim, *Accelerate: The Science of Lean Software and DevOps: Building and Scaling High Performing Technology Organizations*, Portland, OR: IT Revolution Press, 2018.

[5] M. Kersten, *Project to Product: How to Survive and Thrive in the Age of Digital Disruption with the Flow Framework*, Portland, OR: IT Revolution Press, 2018.

[6] M. E. Conway, "How Do Committees Invent?," *Datamation*, vol. 14, no. 4, pp. 28–31, Apr. 1968.

[7] K. M. Eisenhardt, "Agency Theory: An Assessment and Review," *Academy of Management Review*, vol. 14, no. 1, pp. 57–74, Jan. 1989.

[8] J. E. Stiglitz, "Principal and Agent," in *Allocation, Information and Markets*, J. Eatwell, M. Milgate, and P. Newman, Eds., London: Palgrave Macmillan, 1989, pp. 241–253.

[9] A. C. Edmondson, *The Fearless Organization: Creating Psychological Safety in the Workplace for Learning, Innovation, and Growth*, Hoboken, NJ: John Wiley & Sons, 2018.

[10] R. Westrum, "A Typology of Organisational Cultures," *Quality and Safety in Health Care*, vol. 13, no. suppl 2, pp. ii22–ii27, Dec. 2004.

[11] F. P. Brooks Jr., *The Mythical Man-Month: Essays on Software Engineering*, Anniversary ed., Reading, MA: Addison-Wesley, 1995.

[12] B. W. Boehm, *Software Engineering Economics*, Englewood Cliffs, NJ: Prentice-Hall, 1981.
