# DGRF PrjModule: Delivery & Governance Risk Framework

The **PrjModule** forms the foundational risk-diagnostic engine of DeliveryPulse, decoupling **Structural Governance (`PrjGov`)** from **Operational Delivery (`PrjDel`)**.

Traditional enterprise software audits frequently conflate execution friction (e.g. CI/CD test failures, velocity drops) with systemic structural failure (e.g. fractured decision authority, toxic vendor incentives). The DGRF establishes an actuarial, non-linear scoring architecture to isolate causal failure modes and provide deterministic executive guidance.

---

## 1. Structural Governance Dimensions (`PrjGov`: D1–D5)

Measures structural preconditions, accountability structures, contractual architecture, and boundary autonomy.

| Dimension | Domain | Anchor Scores (L1 $\to$ L4) | Max Score | Key Indicator |
| :--- | :--- | :--- | :--- | :--- |
| **D1** | **Authority & Sponsorship** | 3, 10, 18, **25** | 25 | Single accountable executive vs diffuse committee consensus |
| **D2** | **Procurement & Contracting** | 3, 9, 15, **20** | 20 | Outcome-based alignment vs adversarial fixed-price or locked T&M |
| **D3** | **Scope Control & CCB** | 3, 9, 15, **20** | 20 | Trade-off discipline vs unvetted executive backdoors |
| **D4** | **Risk Contingency Reserves** | 3, 8, 14, **20** | 20 | Actuarial buffers ($\ge 20\%$) vs zero contingency |
| **D5** | **Architecture Coupling** | 2, 7, 11, **15** | 15 | Autonomous bounded domains vs brittle spaghetti monoliths |

### Structural Interaction Rule
When executive sponsorship is paralyzed or absentee ($D_1 = 25$) simultaneously with adversarial vendor incentives ($D_2 \ge 15$), governance friction compounds non-linearly:

$$\text{Penalty}_{\text{gov}} = \begin{cases} 10 & \text{if } D_1 = 25 \land D_2 \ge 15 \\ 0 & \text{otherwise} \end{cases}$$

$$\text{Score}_{\text{gov}} = \min\left(100, \sum_{i=1}^5 D_i + \text{Penalty}_{\text{gov}}\right)$$

---

## 2. Operational Delivery Dimensions (`PrjDel` Live: O1–O5)

Measures real-time execution health, team velocity, defect intake, and organizational honesty.

| Dimension | Domain | Anchor Scores (L1 $\to$ L4) | Max Score | Key Indicator |
| :--- | :--- | :--- | :--- | :--- |
| **O1** | **Schedule Velocity & Variance** | 3, 10, 18, **25** | 25 | Critical path slip rate vs baseline schedule |
| **O2** | **Acceptance & Defect Inflow** | 3, 8, 14, **20** | 20 | Defect burn-down vs expanding release blockers |
| **O3** | **Capital Efficiency (CPI)** | 3, 8, 14, **20** | 20 | EVM Cost Performance Index vs cash burn |
| **O4** | **Team Morale & Attrition** | 2, 6, 11, **15** | 15 | Psychological safety vs chronic crunch and flight intent |
| **O5** | **Reporting Transparency** | 3, 8, 14, **20** | 20 | Radical candor vs the "Watermelon Effect" (Green exterior, Red interior) |

### Operational Interaction Rule
When critical path slip exceeds $30\%$ ($O_1 = 25$) while defect inflow remains uncontained ($O_2 \ge 14$), quality shortcuts create catastrophic technical debt spirals:

$$\text{Penalty}_{\text{del}} = \begin{cases} 10 & \text{if } O_1 = 25 \land O_2 \ge 14 \\ 0 & \text{otherwise} \end{cases}$$

$$\text{Score}_{\text{del}} = \min\left(100, \sum_{i=1}^5 O_i + \text{Penalty}_{\text{del}}\right)$$

---

## 3. Pre-Flight Execution Risk (`PrjDel` Preflight: P1–P5)

Applied during Phase 0 / Inception to stress-test projects before capital allocation.

- **P1: Schedule Estimation Rigor** (3, 10, 18, 25)
- **P2: Acceptance Definition & SLAs** (3, 8, 14, 20)
- **P3: Capital Runway & Adequacy** (3, 8, 14, 20)
- **P4: Core Team Readiness & Capability** (2, 6, 11, 15)
- **P5: Telemetry & Observability Baseline** (3, 8, 14, 20)

---

## 4. The 2x2 DGRF Diagnostic Matrix & Buffer Zone

The two orthogonal scores map onto a diagnostic plane:
- **X-Axis:** Operational Delivery Risk ($\text{Score}_{\text{del}} \in [0, 100]$)
- **Y-Axis:** Structural Governance Risk ($\text{Score}_{\text{gov}} \in [0, 100]$)
- **Primary Threshold:** $\theta = 50$

```text
       Governance Risk (Y)
         100 ┌─────────────────────┬─────────────────────┐
             │                     │                     │
             │       Q2            │         Q1          │
             │  Fragile Governance │  Systemic Fragility │
             │                     │                     │
          50 ├ - - - - - - - - - - ┼ - - - - - - - - - - ┤
             │                     │                     │
             │       Q3            │         Q4          │
             │ Resilient Conditions│ Execution Constraint│
             │                     │                     │
           0 └─────────────────────┴─────────────────────┘
             0                    50                   100
                            Delivery Risk (X)
```

### The 40–60 Buffer Zone
When either $\text{Score}_{\text{gov}} \in [40, 60]$ or $\text{Score}_{\text{del}} \in [40, 60]$, the project enters the **Empirical Buffer Zone**. Here, deterministic categorization must be treated as provisional; qualitative interviews and immediate pre-emptive intervention are recommended to prevent irreversible drift into Q1.
