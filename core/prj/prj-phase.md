# PrjPhase: Project Lifecycle Gate & Dynamic Routing Specification

The `PrjPhase` module acts as the entry classification gate for enterprise IT programs within the DGRF engine. It calibrates failure exposure, controls dynamic telemetry routing, and provides contextual sensitivity adjustments.

---

## 1. Lifecycle Classification Taxonomy

`PrjPhase` classifies an initiative into one of three sequential lifecycle operating contexts:

| Phase Key | Lifecycle Stage | Primary Focus | Sunk-Cost Exposure | Active Delivery Sensor |
| :--- | :--- | :--- | :---: | :--- |
| `phase_zero` | **Pre-Contract / Scoping** | Feasibility, DoD, Estimates | Low (Shaping Phase) | `PrjPreFlight` (P1–P5) |
| `active_execution` | **Active Execution** | Critical Path, UAT, Burn Rate | High (Capital In-Flight) | `PrjLive` (O1–O5) |
| `cutover_stabilization`| **Go-Live / Cutover** | Operations, Rollback, Business Defect | Critical (Operational Risk)| `PrjLive` (O1–O5) |

---

## 2. Dynamic Routing Logic (The Delivery Switch)

A common flaw in project assurance is applying active execution telemetry to unstarted initiatives. `PrjPhase` resolves this through deterministic routing:

$$\text{PrjDel Sensor} = \begin{cases} \text{PrjPreFlight} & \text{if Phase} = \text{phase\_zero} \\  \text{PrjLive} & \text{if Phase} \in \{\text{active\_execution}, \text{cutover\_stabilization}\} \end{cases}$$

### 2.1 Pre-Contract Scoping (`phase_zero`)
- **Sensor:** `PrjPreFlight` (P1: Deadline Realism, P2: Requirement Maturity, P3: Budget Fidelity, P4: Dedicated Resources, P5: DoD Alignment).
- **Matrix Meaning:** The horizontal axis ($X$) represents **Baseline Commitment Risk**, not execution failure.

### 2.2 Active Execution & Cutover Stabilization
- **Sensor:** `PrjLive` (O1: Schedule Drift, O2: Acceptance Friction, O3: Capital Burn, O4: Team Morale, O5: Reporting Truth).
- **Matrix Meaning:** The horizontal axis ($X$) represents **Live Operational Friction**.
- **Cutover Scrutiny:** During cutover stabilization, evaluators enforce strict validation of rollback readiness, business process workarounds, and Sev-1 defect triage.

---

## 3. Mathematical Phase Multipliers ($M_{\text{phase}}$)

The framework models the changing cost of remediation across the project lifecycle:

- **Phase 0 ($M_{\text{phase}} = 0.75$):** 25% structural discount reflecting that governance flaws identified prior to contracting can be renegotiated inexpensively.
- **Active Execution ($M_{\text{phase}} = 1.00$):** Baseline parity.
- **Cutover Stabilization ($M_{\text{phase}} = 1.20$):** 20% risk premium reflecting acute operational vulnerability and business-interruption risk.

### Operational Application Rule
To ensure maximum factual transparency, the DGRF engine enforces reporting **unadjusted raw scores** side-by-side with **phase-adjusted scenario scores**:

$$\text{PrjGov}_{\text{unadjusted}} = \min(100, \text{Base}_{\text{gov}} + \text{Penalty}_{\text{gov}})$$
$$\text{PrjGov}_{\text{scenario}} = \min\left(100, \text{Round}\left(\text{PrjGov}_{\text{unadjusted}} \times M_{\text{phase}}\right)\right)$$
