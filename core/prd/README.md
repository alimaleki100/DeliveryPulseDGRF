# DGRF PrdModule: Product Value & Operating Model Framework

The **PrdModule** is the companion framework to the PrjModule. While the PrjModule evaluates the risk of **delivering** a digital capability (on schedule, within budget, with structural governance), the PrdModule evaluates the strategic risk of **what is being built and how product decisions are made**.

---

## 1. Paradigm Shift: From Iron Triangle to Continuous Value Creation

Traditional IT management operates within the **Iron Triangle of Project Management** (Cost, Schedule, Scope). However, in digital product management, achieving high on-time delivery while building the wrong product results in the **"Flawless Failure Paradox"**: software that meets all project deadlines but is rejected by users or economically unviable.

The PrdModule shifts enterprise focus from:
- **Outputs $\to$ Outcomes:** Transitioning from ticket volume and release dates to user retention and business impact.
- **Feature Factory $\to$ Empowered Product Teams:** Transitioning from top-down executive feature roadmaps to cross-functional teams solving validated user problems (Cagan, 2017).
- **Static Deadlines $\to$ Continuous Discovery & Delivery:** Transitioning from big-bang waterfall rollouts to continuous hypothesis validation loops (Torres, 2021).

---

## 2. PrdPhase Gate Mechanics

A product's risk profile transforms across its lifecycle. The PrdModule establishes a deterministic phase-gate branching architecture:

```text
┌─────────────────────────┐       ┌─────────────────────────┐       ┌─────────────────────────┐
│         Phase 1         │       │         Phase 2         │       │         Phase 3         │
│ Discovery & Hypothesis  │ ────> │ Product-Market Fit (PMF)│ ────> │  Scaling & Platform     │
│   (Pre-Revenue / MVP)   │       │   & Retention Loops     │       │    Maturity (Scale)     │
└─────────────────────────┘       └─────────────────────────┘       └─────────────────────────┘
            │                                 │                                 │
            ▼                                 ▼                                 ▼
      [ prd-disc.md ]                   [ prd-fit.md ]                    [ prd-scale.md ]
     (D1–D5 Rubric)                    (F1–F5 Rubric)                    (C1–C5 Rubric)
```

### The Phase Branching Rule
- **Phase 1: Discovery (`PrdDisc` D1–D5):** Applied before product-market fit. Evaluates problem severity, qualitative customer discovery depth, prototype validation cadence, and willingness to pay.
- **Phase 2: PMF & Retention (`PrdFit` F1–F5):** Applied during initial traction. Evaluates retention curve flattening, habituation, feedback loop velocity, and unit economics.
- **Phase 3: Scale & Platform (`PrdScale` C1–C5):** Applied during enterprise scaling. Evaluates feature bloat, Net Revenue Retention (NRR), cycle time bureaucracy, and infrastructure gross margins.

In all three phases, the **Product Operating Model (`PrdOps` S1–S5)** runs as the vertical anchor (Y-axis), assessing team empowerment and discovery habits.

---

## 3. The 2x2 Product Resilience Matrix

Mapping **Product Operating Model Risk (`PrdOps`, Y-Axis)** against **Product Delivery / Execution Risk (`PrdDel`, X-Axis)** yields the 2x2 Product Diagnostic Plane:

```text
       Product Operating Risk (PrdOps, Y-Axis)
         100 ┌─────────────────────────┬─────────────────────────┐
             │                         │                         │
             │           Q2            │           Q1            │
             │   The Zombie Product    │  Product Death Spiral   │
             │  "Feature Factory Trap" │  "Terminal Irrelevance" │
             │                         │                         │
          50 ├ - - - - - - - - - - - - ┼ - - - - - - - - - - - - ┤
             │                         │                         │
             │           Q3            │           Q4            │
             │   Product-Led Engine    │   Platform Bottleneck   │
             │  "Scalable Discovery"   │  "Tech Debt Obstacle"   │
             │                         │                         │
           0 └─────────────────────────┴─────────────────────────┘
             0                        50                       100
                     Execution & Delivery Risk (PrdDel, X-Axis)
```

### Quadrant Clinical Taxonomy
- **$Q_1$: Product Death Spiral ($\text{PrdOps} > 50, \text{PrdDel} > 50$)**  
  *Pathology:* The product has no organic market pull, is dictated by an executive feature factory, and cannot ship reliably. Engineering and product are in mutual recrimination.  
  *Prescription:* **Strategic Reset / Sunset Evaluation.** Cease feature additions immediately. Pivot back to core customer discovery or gracefully sunset the initiative.
- **$Q_2$: The Zombie Product ($\text{PrdOps} > 50, \text{PrdDel} \le 50$)**  
  *Pathology:* The classic "Feature Factory" trap. Engineering delivers code with high velocity, but nobody uses the shipped features. Roadmap is dictated top-down by executive fiat without customer discovery.  
  *Prescription:* **Operating Model Turnaround.** Abolish the output roadmap. Transition product managers from backlog administrators to customer problem investigators. Mandate weekly customer discovery interviews.
- **$Q_3$: Product-Led Engine ($\text{PrdOps} \le 50, \text{PrdDel} \le 50$)**  
  *Pathology:* Target product operating model. Cross-functional empowered teams, strong product-market fit, continuous discovery habits, and clean delivery architecture.  
  *Prescription:* **Scale & Protect.** Insulate teams from corporate restructuring; expand market share while vigilantly preventing feature bloat.
- **$Q_4$: Platform Bottleneck ($\text{PrdOps} \le 50, \text{PrdDel} > 50$)**  
  *Pathology:* Strong user empathy, clear problem-market fit, and passionate users, but execution is blocked by severe technical debt, fragile architecture, or release bureaucracy.  
  *Prescription:* **Engineering Capacity Injection & Refactoring.** Reallocate 40% of upcoming product cycles to architectural refactoring, platform engineering, and automated testing.

---

## 4. Documentation Index

- [Product Operating Model Rubric (S1–S5)](./prd-ops.md)
- [Phase 1: Pre-PMF Customer Discovery Rubric (D1–D5)](./prd-disc.md)
- [Phase 2: PMF & Retention Dynamics Rubric (F1–F5)](./prd-fit.md)
- [Phase 3: Platform Scalability & Churn Rubric (C1–C5)](./prd-scale.md)
