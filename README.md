# DeliveryPulse / DGRF: Diagnosing Project Delivery Risk: A Two-Axis Governance Framework

[![Next.js](https://img.shields.io/badge/Next.js-15.0-black?style=for-the-badge&logo=next.js)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.6-blue?style=for-the-badge&logo=typescript)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.4-38bdf8?style=for-the-badge&logo=tailwindcss)](https://tailwindcss.com/)
[![License: MIT](https://img.shields.io/badge/License-MIT-emerald?style=for-the-badge)](LICENSE)

> **Decoupling Structural Governance from Operational Delivery in Enterprise IT Initiatives.**  
> Grounded in the featured research paper:  
> **"Diagnosing Project Delivery Risk: A Two-Axis Governance Framework"**  
> Published in the **PM World Journal (PMWJ)**, Vol. XV, Issue X, October 2026.  
> **Author:** Ali Maleki (MBA, PMP) — Brno, Czech Republic.  
> *Official Repository:* `https://github.com/alimaleki100/DeliveryPulseDGRF`

---

## 🧭 Executive Overview

Enterprise IT programs and major technology modernizations continuously suffer from catastrophic cost overruns, missed milestones, and quality crises. Post-mortems frequently fail because assurance audits conflate two orthogonal organizational forces into single-dimensional scalar RAG dashboards:

1. **Structural Governance (`PrjGov`, Y-Axis):** Upstream institutional constraints, decision mandate authority, vendor contracting risk allocations, baseline change control discipline, contingency reserves, and architectural coupling.
2. **Operational Delivery (`PrjDel`, X-Axis):** Downstream execution kinetics: critical path milestone velocity, defect burn-down vs discovery, capital efficiency (EVM), team psychological safety, and status reporting candor.

**DeliveryPulse** provides an actuarial, non-linear diagnostic cockpit and scoring engine for CIOs, CTOs, and Transformation Boards to isolate causal failure vectors before capital is squandered.

---

## 📊 The 2x2 DGRF Diagnostic Matrix

The DGRF engine projects initiatives onto a 2D plane with an operational threshold of $\theta = 50$:

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
- **$Q_1$: Systemic Fragility ($\text{Score}_{\text{gov}} > 50, \text{Score}_{\text{del}} > 50$)**  
  *Total Organizational Breakdown.* Executive prescription: **Immediate Capital Freeze & Contract Renegotiation**.
- **$Q_2$: Fragile Governance ($\text{Score}_{\text{gov}} > 50, \text{Score}_{\text{del}} \le 50$)**  
  *Heroics masking upstream rot.* Executive prescription: **Shield engineering; reform steering authority and eliminate scope creep**.
- **$Q_3$: Resilient Conditions ($\text{Score}_{\text{gov}} \le 50, \text{Score}_{\text{del}} \le 50$)**  
  *Target benchmark equilibrium.* Executive prescription: **Autonomous preservation; prevent executive meddling**.
- **$Q_4$: Execution Constraint ($\text{Score}_{\text{gov}} \le 50, \text{Score}_{\text{del}} > 50$)**  
  *Solid charter hampered by execution friction.* Executive prescription: **Targeted architecture mentoring, pipeline automation, WIP reduction**.

---

### The 40–60 Transitional Buffer Zone

To address epistemic uncertainty near decision boundaries, the DGRF engine formalizes the **40–60 Transitional Buffer Zone** across both axes ($\text{PrjGov}$ and $\text{PrjDel}$):

$$\text{inBufferZone} \iff \left(\text{Score}_{\text{gov}} \in [40, 60]\right) \lor \left(\text{Score}_{\text{del}} \in [40, 60]\right)$$

- **Threshold Sensitivity:** The primary threshold $\theta = 50$ serves as a conservative diagnostic trigger within an effective raw score range starting from baseline floors (minimum sum = 14: Level 1 across 5 dimensions: $3+3+3+3+2 = 14$).
- **Metastable Flag:** Projects in $[40, 60]$ are marked as *metastable / provisional*, prompting deep qualitative sensitivity review before crossing the critical phase-change threshold.

---

### Phase Multipliers ($M_{\text{phase}}$) & Reporting Standard

The framework models the escalating cost of remediation across the project lifecycle:
- **Phase 0 / Scoping ($M_{\text{phase}} = 0.75$):** 25% structural discount reflecting that governance defects identified before contracting can be renegotiated inexpensively.
- **Active Execution ($M_{\text{phase}} = 1.00$):** Parity baseline.
- **Cutover Stabilization ($M_{\text{phase}} = 1.20$):** 20% risk premium reflecting acute operational vulnerability and business-interruption risk.

> [!IMPORTANT]
> **Operational Reporting Standard:** While phase multipliers provide scenario modeling for executive sensitivity analysis, the **primary operational standard** enforced by DGRF is reporting **multiplier-unadjusted raw scores and project lifecycle phase separately** to maintain total factual transparency.

---

## 🧮 Mathematical Scoring Engine & Interaction Rules

### Structural Governance (`PrjGov`: D1–D5)
- **D1 Decision Authority & Executive Mandate:** $3, 10, 18, \mathbf{25}$ (Max 25)
- **D2 Procurement Architecture & Vendor Risk Allocation:** $3, 9, 15, \mathbf{20}$ (Max 20)
- **D3 Scope Governance & Baseline Integrity:** $3, 9, 15, \mathbf{20}$ (Max 20)
- **D4 Risk Management & Contingency Governance:** $3, 8, 14, \mathbf{20}$ (Max 20)
- **D5 Architectural Complexity & Dependency Drag:** $2, 7, 11, \mathbf{15}$ (Max 15)

$$\text{Penalty}_{\text{gov}} = \begin{cases} 10 & \text{if } D_1 = 25 \land D_2 \ge 15 \\ 0 & \text{otherwise} \end{cases}$$
$$\text{Score}_{\text{gov}} = \min\left(100, \sum_{i=1}^5 D_i + \text{Penalty}_{\text{gov}}\right)$$

### Operational Delivery (`PrjDel` Live: O1–O5)
- **O1 Schedule Integrity & Milestone Drift:** $3, 10, 18, \mathbf{25}$ (Max 25)
- **O2 Product Acceptance & Defect Friction:** $3, 8, 14, \mathbf{20}$ (Max 20)
- **O3 Capital Efficiency & Burn-to-Value:** $3, 8, 14, \mathbf{20}$ (Max 20)
- **O4 Team Sustainability & Key-Person Exposure:** $2, 6, 11, \mathbf{15}$ (Max 15)
- **O5 Reporting Integrity & Bad-News Visibility:** $3, 8, 14, \mathbf{20}$ (Max 20)

$$\text{Penalty}_{\text{del}} = \begin{cases} 10 & \text{if } O_1 = 25 \land O_2 \ge 14 \\ 0 & \text{otherwise} \end{cases}$$
$$\text{Score}_{\text{del}} = \min\left(100, \sum_{j=1}^5 O_j + \text{Penalty}_{\text{del}}\right)$$

### Pre-Contract Scoping Sensor (`PrjPreFlight`: P1–P5)
When `Phase == phase_zero`, $\text{PrjDel}$ dynamically routes to $\text{PrjPreFlight}$:
- **P1 Deadline Realism (Planning Fallacy):** $3, 10, 18, \mathbf{25}$
- **P2 Requirement Maturity:** $3, 8, 14, \mathbf{20}$
- **P3 Budget Fidelity:** $3, 8, 14, \mathbf{20}$
- **P4 Dedicated Resource Commitment:** $2, 6, 11, \mathbf{15}$
- **P5 Definition of Done Alignment:** $3, 8, 14, \mathbf{20}$

---

## 🔬 Section 8 Benchmark Case Studies (PMWJ Manuscript)

The engine includes pre-calibrated benchmark profiles from Section 8 of the published paper:

| Case Profile | Lifecycle Phase | Inputs ($\text{Gov} \mid \text{Del}$) | Unadjusted Score ($\text{Gov} \mid \text{Del}$) | Buffer Zone | Quadrant | Trajectory / Outcome |
| :--- | :--- | :--- | :---: | :---: | :---: | :--- |
| **Case A: BI Modernization** | Active Execution (M6) | `[10, 20, 20, 14, 15]` $\mid$ `[18, 20, 20, 6, 14]` | **79** $\mid$ **78** | False | **Q1** | Cancelled after protracted decay |
| **Case B: Commercial COTS** | Active Execution (M6) | `[25, 20, 20, 20, 15]` $\mid$ `[10, 14, 14, 6, 20]` | **100** (Capped) $\mid$ **64** | False | **Q1** | Cancelled within 30 days (cliff) |
| **Case C: Modular Enterprise** | Active Execution | `[18, 9, 15, 14, 2]` $\mid$ `[3, 8, 3, 6, 8]` | **58** $\mid$ **28** | **True** | **Q2** | Shipped on schedule ($D_5=2$ insulation) |
| *Case C Sensitivity* | Active (Optimized $D_1$) | `[10, 9, 15, 14, 2]` $\mid$ `[3, 8, 3, 6, 8]` | **50** $\mid$ **28** | **True** | **Q3** | Reaches Resilient state via single sponsor |

---

## 📂 Repository Architecture

```text
DeliveryPulseDGRF/
├── README.md                      # Comprehensive overview & PMWJ published paper guide
├── LICENSE                        # MIT License
│
├── core/                          # Pure theoretical models, schemas & rubrics
│   ├── prj/
│   │   ├── README.md              # PrjModule architecture and dimension guide
│   │   ├── prj-phase.md           # Project lifecycle gates & dynamic routing
│   │   ├── prj-gov.md             # D1–D5 structural governance scoring rubric
│   │   ├── prj-del-live.md        # O1–O5 active delivery EVM telemetry guide
│   │   ├── prj-del-preflight.md   # P1–P5 pre-contract baseline assumption rubric
│   │   └── schemas/               # JSON schemas (prj-gov, prj-del-live, prj-del-preflight)
│   └── prd/
│       ├── README.md              # PrdModule roadmap & operating model
│       ├── prd-phase.md           # Product maturity gates & adaptive branching
│       ├── prd-ops.md             # S1–S5 product operating model & empowered teams
│       ├── prd-disc.md            # D1–D5 Phase 1: Pre-PMF customer discovery
│       ├── prd-fit.md             # F1–F5 Phase 2: PMF, retention curves & organic pull
│       └── prd-scale.md           # C1–C5 Phase 3: Platform scalability & gross margins
│
├── fixtures/                      # Section 8 JSON benchmark fixtures
│   ├── case-a-bi-modernization.json
│   ├── case-b-commercial-software.json
│   └── case-c-modular-enterprise-solution.json
│
├── docs/
│   └── paper-part1.md             # Complete manuscript: "Diagnosing Project Delivery Risk"
│
└── app/                           # Next.js 15 Interactive Cockpit
    ├── src/
    │   ├── app/                   # App Router pages and API routes (/evaluate, /diagnose, /lead)
    │   ├── components/            # Cockpit controls, SVG 2x2 Matrix, SVG Radar
    │   └── lib/engine/            # prj-evaluator.ts (PMWJ mathematical scoring engine)
    └── test/                      # Test suite verifying Section 8 cases
```

---

## 🚀 Quickstart & Local Development

```bash
cd app
npm install
npm test
npm run dev
```

Navigate to `http://localhost:3000` to interact with the executive cockpit.

---

## 📜 Citation

```bibtex
@article{maleki2026dgrf,
  author    = {Ali Maleki},
  title     = {Diagnosing Project Delivery Risk: A Two-Axis Governance Framework},
  journal   = {PM World Journal (PMWJ)},
  volume    = {XV},
  number    = {X},
  month     = {October},
  year      = {2026},
  address   = {Brno, Czech Republic},
  url       = {https://github.com/alimaleki100/DeliveryPulseDGRF}
}
```

---

## 📄 License
Released under the [MIT License](LICENSE). Copyright © 2026 Ali Maleki, DeliveryPulse Contributors.
