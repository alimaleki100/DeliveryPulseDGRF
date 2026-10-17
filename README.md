# DeliveryPulse: Delivery & Governance Risk Framework (DGRF)

[![Next.js](https://img.shields.io/badge/Next.js-15.0-black?style=for-the-badge&logo=next.js)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.6-blue?style=for-the-badge&logo=typescript)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.4-38bdf8?style=for-the-badge&logo=tailwindcss)](https://tailwindcss.com/)
[![License: MIT](https://img.shields.io/badge/License-MIT-emerald?style=for-the-badge)](LICENSE)

> **Decoupling Structural Governance from Operational Delivery in Enterprise IT Initiatives.**  
> Based on the foundational research manuscript *"Diagnosing Project Delivery Risk: A Governance and Execution Framework for Enterprise IT"* by **Ali Maleki**.

---

## 🧭 Executive Overview

Enterprise IT and transformation programs continuously suffer from catastrophic cost blowouts, missed deadlines, and quality crises. Diagnostic audits routinely fail because they conflate two orthogonal forces:

1. **Structural Governance (`PrjGov`):** Upstream authority, vendor procurement incentives, scope control discipline, contingency capitalization, and architectural coupling.
2. **Operational Delivery (`PrjDel`):** Downstream execution kinetics: milestone velocity, defect burn-down, capital efficiency (EVM), team psychological safety, and reporting candor.

**DeliveryPulse** provides an actuarial, non-linear diagnostic cockpit and scoring engine for CIOs, CTOs, and Transformation Boards to pinpoint exact organizational failure modes before capital is wasted.

---

## 📊 The 2x2 DGRF Diagnostic Matrix

The DGRF engine projects projects onto a 2D plane with an operational threshold of $\theta = 50$:

```text
       Governance Risk (Score_gov)
         100 ┌─────────────────────┬─────────────────────┐
             │                     │                     │
             │         Q2          │         Q1          │
             │  Fragile Governance │  Systemic Fragility │
             │  "Heroic Engineers" │ "Imminent Disaster" │
             │                     │                     │
          50 ├ - - - - - - - - - - ┼ - - - - - - - - - - ┤
             │                     │                     │
             │         Q3          │         Q4          │
             │ Resilient Conditions│ Execution Constraint│
             │  "Target Benchmark" │   "Delivery Drag"   │
             │                     │                     │
           0 └─────────────────────┴─────────────────────┘
             0                    50                   100
                    Operational Delivery Risk (Score_del)
```

### Quadrant Clinical Taxonomy
- **$Q_1$: Systemic Fragility ($\text{Score}_{\text{gov}} \ge 50, \text{Score}_{\text{del}} \ge 50$)**  
  *Total Organizational Breakdown.* Executive prescription: **Immediate Capital Freeze & Contract Renegotiation**.
- **$Q_2$: Fragile Governance ($\text{Score}_{\text{gov}} \ge 50, \text{Score}_{\text{del}} < 50$)**  
  *Heroics masking upstream rot.* Executive prescription: **Shield engineering; reform steering authority and eliminate scope creep**.
- **$Q_3$: Resilient Conditions ($\text{Score}_{\text{gov}} < 50, \text{Score}_{\text{del}} < 50$)**  
  *High-performance equilibrium.* Executive prescription: **Autonomous preservation; prevent executive meddling**.
- **$Q_4$: Execution Constraint ($\text{Score}_{\text{gov}} < 50, \text{Score}_{\text{del}} \ge 50$)**  
  *Solid charter hampered by execution friction.* Executive prescription: **Targeted architecture mentoring, pipeline automation, WIP reduction**.

### The 40–60 Empirical Buffer Zone
When either $\text{Score}_{\text{gov}} \in [40, 60]$ or $\text{Score}_{\text{del}} \in [40, 60]$, the project is flagged with `inBufferZone = true`. Categorization is marked as *provisional / metastable*, prompting qualitative interviews and preventative intervention before breaching the irreversible 50-point mark.

---

## 🧮 Mathematical Scoring Engine & Interaction Rules

The engine calculates risk along calibrated actuarial anchors with non-linear penalties:

### Structural Governance (`PrjGov`: D1–D5)
- **D1 Authority & Mandate:** $3, 10, 18, 25$ (Max 25)
- **D2 Procurement & Contracts:** $3, 9, 15, 20$ (Max 20)
- **D3 Scope CCB Discipline:** $3, 9, 15, 20$ (Max 20)
- **D4 Risk Contingency Buffer:** $3, 8, 14, 20$ (Max 20)
- **D5 Architectural Coupling:** $2, 7, 11, 15$ (Max 15)

$$\text{Penalty}_{\text{gov}} = 10 \quad \text{if } (D_1 = 25 \land D_2 \ge 15), \quad \text{else } 0$$
$$\text{Score}_{\text{gov}} = \min\left(100, \sum_{i=1}^5 D_i + \text{Penalty}_{\text{gov}}\right)$$

### Operational Delivery (`PrjDel` Live: O1–O5)
- **O1 Schedule Critical Path:** $3, 10, 18, 25$ (Max 25)
- **O2 Defect Inflow & Quality:** $3, 8, 14, 20$ (Max 20)
- **O3 Capital Efficiency (CPI):** $3, 8, 14, 20$ (Max 20)
- **O4 Team Morale & Burnout:** $2, 6, 11, 15$ (Max 15)
- **O5 Reporting Truth ("Watermelon Effect"):** $3, 8, 14, 20$ (Max 20)

$$\text{Penalty}_{\text{del}} = 10 \quad \text{if } (O_1 = 25 \land O_2 \ge 14), \quad \text{else } 0$$
$$\text{Score}_{\text{del}} = \min\left(100, \sum_{j=1}^5 O_j + \text{Penalty}_{\text{del}}\right)$$

---

## 📂 Repository Architecture

```text
DeliveryPulse/
├── README.md                      # Comprehensive overview & executive documentation
├── LICENSE                        # MIT License
│
├── core/                          # Pure theoretical models & JSON schemas
│   ├── prj/
│   │   ├── README.md              # PrjModule architecture and dimension guide
│   │   └── schemas/
│   │       ├── prj-gov.schema.json
│   │       ├── prj-del-live.schema.json
│   │       └── prj-del-preflight.schema.json
│   └── prd/
│       └── README.md              # PrdModule roadmap (Part II: PMF, Discovery, Scale)
│
├── docs/
│   └── paper-part1.md             # Complete manuscript with 12 IEEE references
│
└── app/                           # Next.js 15 Interactive Cockpit
    ├── package.json
    ├── tsconfig.json
    ├── tailwind.config.ts
    ├── src/
    │   ├── app/
    │   │   ├── layout.tsx         # Executive slate-950 theme
    │   │   ├── page.tsx           # Full interactive diagnostic cockpit
    │   │   └── api/
    │   │       ├── evaluate/      # Scoring engine route
    │   │       ├── diagnose/      # Gemini Flash clinical brief AI route
    │   │       └── lead/          # Executive advisory lead capture
    │   ├── components/
    │   │   ├── cockpit/           # Preset scenarios & interactive sliders
    │   │   ├── radar/             # Live SVG Radar calibrating dimensions
    │   │   └── matrix/            # Interactive 2x2 Matrix with pulsing marker & buffer zone
    │   └── lib/
    │       ├── engine/
    │       │   └── prj-evaluator.ts  # Revised TypeScript scoring engine
    │       └── gemini.ts             # Google Gemini SDK client
```

---

## 🚀 Quickstart & Local Development

### 1. Prerequisites
- Node.js >= 18.17 (Node 20+ recommended)
- npm or pnpm or yarn

### 2. Installation
```bash
cd app
npm install
```

### 3. Environment Setup (Optional for AI Briefs)
Create an `.env.local` inside `app/`:
```env
GEMINI_API_KEY=your_gemini_api_key_here
```
*(If omitted, DeliveryPulse utilizes a built-in deterministic clinical intelligence fallback).*

### 4. Run Development Server
```bash
npm run dev
```
Navigate to `http://localhost:3000` to interact with the executive cockpit.

### 5. Build for Production
```bash
npm run build
npm start
```

---

## 📡 API Endpoints

### `POST /api/evaluate`
Accepts a JSON payload with `gov` ($D_1$–$D_5$) and `del` ($O_1$–$O_5$) anchor values. Returns exact base scores, interaction penalties, total scores, quadrant categorization, and buffer zone status.

### `POST /api/diagnose`
Accepts evaluation output and produces an executive clinical brief powered by Gemini Flash, providing strategic remediation recommendations.

### `POST /api/lead`
Captures advisory consultation requests and logs lead diagnostic snapshots.

---

## 📜 Citation

If you use this framework or repository in academic or industrial research, please cite:

```bibtex
@article{maleki2026dgrf,
  author    = {Ali Maleki},
  title     = {Diagnosing Project Delivery Risk: A Governance and Execution Framework for Enterprise IT},
  journal   = {DeliveryPulse Research Series},
  volume    = {1},
  year      = {2026},
  url       = {https://github.com/deliverypulse/deliverypulse}
}
```

---

## 📄 License
Released under the [MIT License](LICENSE). Copyright © 2026 Ali Maleki, DeliveryPulse Contributors.
