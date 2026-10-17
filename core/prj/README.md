# DGRF PrjModule: Project Delivery & Governance Risk Framework

The **PrjModule** is the core operational risk engine of the Delivery & Governance Risk Framework (DGRF). It provides an actuarial, non-linear diagnostic methodology designed to decouple **Structural Governance (`PrjGov`)** from **Operational Delivery (`PrjDel`)**.

---

## 1. Architectural Philosophy: Decoupling Governance from Execution

Enterprise IT audits routinely fail because they compress multidimensional organizational dynamics into scalar status metrics or superficial Red-Amber-Green (RAG) dashboards. This conflates two distinct organizational domains:

1. **Structural Governance ($\text{PrjGov}$, Y-Axis):** Upstream constraints, institutional power distribution, contractual risk allocation, scope control authority, contingency reserves, and architectural boundaries.
2. **Operational Delivery ($\text{PrjDel}$, X-Axis):** Downstream execution kinetics, critical path velocity, defect discovery/burn-down, earned capital efficiency, team cognitive load, and reporting candor.

By isolating these two axes, DGRF prevents the common failure mode of treating governance pathologies with delivery remedies (e.g., adding status meetings or micromanaging sprint velocity when the true bottleneck is an adversarial fixed-price vendor contract).

---

## 2. Operational Branching Formula

Project evaluation requirements vary fundamentally across lifecycle stages. In early inception and procurement phases, live delivery metrics (e.g., defect burn-down, EVM indices) do not yet exist. Therefore, DGRF applies deterministic operational branching:

$$\text{PrjDel} = \begin{cases} \text{PrjPreFlight} & \text{if } \text{Phase} \in \{\text{Phase 0, Inception, Scoping, Pre-Contract}\} \\ \text{PrjLive} & \text{if } \text{Phase} \in \{\text{Active Execution, System Integration, Cutover}\} \end{cases}$$

- **$\text{PrjGov}$ (D1–D5):** Evaluated continuously across all project lifecycle stages.
- **$\text{PrjPreFlight}$ (P1–P5):** Stress-tests baseline viability before commercial commitment.
- **$\text{PrjLive}$ (O1–O5):** Tracks real-time telemetry and execution drift in flight.

---

## 3. Formal Mathematical Formulations

### A. Base Score Calculations
Each dimension is scored against calibrated actuarial anchors with discrete points:

$$\text{Base}_{\text{gov}} = \min\left(100, \sum_{i=1}^5 D_i\right)$$

$$\text{Base}_{\text{del}} = \begin{cases} \min\left(100, \sum_{j=1}^5 O_j\right) & \text{for PrjLive} \\[8pt] \min\left(100, \sum_{k=1}^5 P_k\right) & \text{for PrjPreFlight} \end{cases}$$

- **Actuarial Floor:** The absolute theoretical minimum score on either axis is **14 points** (Level 1 across all 5 dimensions: $3 + 3 + 3 + 3 + 2 = 14$).
- **Actuarial Ceiling:** Unpenalized maximum base score is **100 points** ($25 + 20 + 20 + 20 + 15 = 100$).

---

### B. Non-Linear Cross-Dimensional Interaction Penalties

In real-world enterprise delivery, failure modes compound non-linearly. When two compounding structural or operational defects occur simultaneously, the combined systemic risk exceeds the sum of its parts.

#### 1. Structural Interaction Penalty ($\text{Penalty}_{\text{gov}}$)
When executive decision rights are paralyzed ($D_1 = 25$) and the enterprise is locked into an adversarial vendor commercial contract ($D_2 \ge 15$), vendor opportunism runs unchecked because no executive has the authority to enforce penalties or negotiate scope tradeoffs:

$$\text{Penalty}_{\text{gov}} = \begin{cases} 10 & \text{if } D_1 = 25 \land D_2 \ge 15 \\ 0 & \text{otherwise} \end{cases}$$

#### 2. Operational Interaction Penalty ($\text{Penalty}_{\text{del}}$)
When critical path delay exceeds $30\%$ ($O_1 = 25$) while defect arrival outpaces remediation ($O_2 \ge 14$), delivery teams invariably attempt compression shortcuts (bypassing regression tests, deploying hotfixes), creating a catastrophic runaway quality death-spiral:

$$\text{Penalty}_{\text{del}} = \begin{cases} 10 & \text{if } O_1 = 25 \land O_2 \ge 14 \\ 0 & \text{otherwise} \end{cases}$$

#### Arithmetic Justification for 10-Point Magnitude
A 10-point penalty is mathematically calibrated to push compound worst-case baseline scores sitting immediately below the decision boundary ($47\text{--}48\text{ points}$) across the $50\text{-point}$ threshold and deep into the $[40, 60]$ empirical buffer zone ($57\text{--}58\text{ points}$). This prevents pathological initiatives from hiding in "moderate risk" categories due to cosmetic smoothing of intermediate dimensions.

---

### C. Final Plane Coordinates

$$\text{Score}_{\text{gov}} = \min\left(100, \, \text{Base}_{\text{gov}} + \text{Penalty}_{\text{gov}}\right)$$

$$\text{Score}_{\text{del}} = \min\left(100, \, \text{Base}_{\text{del}} + \text{Penalty}_{\text{del}}\right)$$

---

## 4. The 2x2 Diagnostic Matrix & Empirical Buffer Zone

```text
       Governance Risk (Score_gov, Y-Axis)
         100 ┌─────────────────────────┬─────────────────────────┐
             │                         │                         │
             │           Q2            │           Q1            │
             │   Fragile Governance    │   Systemic Fragility    │
             │  "Heroic Sinking Ship"  │  "Immediate Work-Stop"  │
             │                         │                         │
          50 ├ - - - - - - - - - - - - ┼ - - - - - - - - - - - - ┤
             │                         │                         │
             │           Q3            │           Q4            │
             │   Resilient Conditions  │   Execution Constraint  │
             │  "Target Operating Org" │  "Technical Debt Drag"  │
             │                         │                         │
           0 └─────────────────────────┴─────────────────────────┘
             0                        50                       100
                    Operational Delivery Risk (Score_del, X-Axis)
```

### Quadrant Clinical Taxonomy
- **$Q_1$: Systemic Fragility ($\text{Score}_{\text{gov}} \ge 50, \text{Score}_{\text{del}} \ge 50$)**  
  *Pathology:* Dual structural-operational collapse.  
  *Clinical Prescription:* **Immediate Capital Freeze / Work-Stop.** Continuing execution burns cash without delivering capability. Renegotiate or terminate vendor contracts, replace steering committees with a single accountable owner, and descope to an irreducible core slice.
- **$Q_2$: Fragile Governance ($\text{Score}_{\text{gov}} \ge 50, \text{Score}_{\text{del}} < 50$)**  
  *Pathology:* "Heroic Engineers on a Sinking Ship." Competent engineering teams hit sprint milestones, but upstream contracts, authority, and scope control are crumbling.  
  *Clinical Prescription:* **Upstream Structural Reform.** Shield the engineering team from organizational politics. Restructure steering bodies and enforce CCB discipline before engineer burnout triggers a drop into $Q_1$.
- **$Q_3$: Resilient Conditions ($\text{Score}_{\text{gov}} < 50, \text{Score}_{\text{del}} < 50$)**  
  *Pathology:* Target enterprise operating equilibrium. Single-threaded ownership, aligned procurement, disciplined scope control, sustainable team morale, and candid reporting.  
  *Clinical Prescription:* **Autonomous Preservation.** Maintain existing governance cadences; conduct periodic preventative health checks; prevent extraneous executive meddling.
- **$Q_4$: Execution Constraint ($\text{Score}_{\text{gov}} < 50, \text{Score}_{\text{del}} \ge 50$)**  
  *Pathology:* "Sound Ship, Struggling Crew." Strong governance and budget, but ground execution is choking on monolithic architecture, legacy dependencies, or test automation bottlenecks.  
  *Clinical Prescription:* **Operational Enablement & Debt Refactoring.** Do NOT introduce more project managers or administrative governance. Inject senior principal architecture mentoring, automate regression pipelines, and reduce work-in-progress (WIP).

---

### The $[40, 60]$ Empirical Buffer Zone

Deterministic thresholding at $\theta = 50$ creates edge-case sensitivity where a single anchor shift alters the strategic diagnosis. DGRF resolves this through the **Empirical Buffer Zone**:

$$\text{inBufferZone} \iff \left(\text{Score}_{\text{gov}} \in [40, 60]\right) \lor \left(\text{Score}_{\text{del}} \in [40, 60]\right)$$

When an initiative enters the buffer zone, the diagnosis is marked as **metastable**. In this state:
1. Automated classification is treated as provisional.
2. A formal qualitative audit is mandated across high-risk dimensions.
3. Pre-emptive governance interventions are triggered before the project crosses the irreversible 50-point threshold.

---

## 5. Technical Documentation Index

- [Structural Governance Rubric (D1–D5)](./prj-gov.md)
- [Active Execution & EVM Telemetry Rubric (O1–O5)](./prj-del-live.md)
- [Pre-Contract Baseline Assumption Audit Rubric (P1–P5)](./prj-del-preflight.md)
- [JSON Schema Definitions](./schemas/)
