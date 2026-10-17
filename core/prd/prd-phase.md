# PrdPhase: Product Maturity Gate & Adaptive Branching Specification

The `PrdPhase` module establishes the lifecycle and maturity gate for digital products within the DGRF engine. It controls adaptive horizontal sensor routing, deactivates irrelevant metrics, and ensures that early-stage discovery is not penalized by enterprise scalability criteria.

---

## 1. Product Maturity Classification Taxonomy

`PrdPhase` classifies a digital capability into one of three sequential maturity horizons:

| Phase Key | Maturity Stage | Primary Horizon | Sunk-Cost / Runway Exposure | Active Product Sensor |
| :--- | :--- | :--- | :---: | :--- |
| `discovery` | **Phase 1: Customer Discovery & Validation** | Problem-Solution Fit & MVP | Seed / Early Venture Runway | `PrdDisc` (D1–D5) |
| `growth` | **Phase 2: PMF Search & Early Growth** | Repeatable Retention & Habituation | Growth Capital In-Flight | `PrdFit` (F1–F5) |
| `scale` | **Phase 3: Platform Scalability & Maturity** | Gross Margin, NRR, SRE Resilience | Mature Enterprise Capital | `PrdScale` (C1–C5) |

---

## 2. Adaptive Branching Specification

Dynamic routing selects the active sensor suite on the horizontal execution axis ($X$) based on product maturity:

$$\text{PrdDel Sensor} = \begin{cases} \text{PrdDisc} & \text{if Phase} = \text{discovery} \\ \text{PrdFit} & \text{if Phase} = \text{growth} \\ \text{PrdScale} & \text{if Phase} = \text{scale} \end{cases}$$

### 2.1 Phase 1: Customer Discovery & Validation (`discovery`)
- **Operating Context:** Concept stage, prototype testing, or pilot MVP with limited trial users.
- **Primary Executive Question:** *"Is this a real, urgent customer problem, and does willingness-to-pay exist?"*
- **Active Sensor:** `PrdDisc` (D1: Problem Severity, D2: Customer Research Depth, D3: Prototype Velocity, D4: Willingness to Pay, D5: MVP Scoping).
- **Suppressed Metrics:** Financial unit economics and long-term retention curves are deactivated (unmeasurable prior to market launch).

### 2.2 Phase 2: PMF Search & Early Growth (`growth`)
- **Operating Context:** Live in market with active recurring users; seeking repeatable customer acquisition and retention.
- **Primary Executive Question:** *"Does our retention curve flatten, and are users organically adopting core features?"*
- **Active Sensor:** `PrdFit` (F1: Retention Curve Stability, F2: Core Feature Adoption, F3: Feedback Loop Velocity, F4: Unit Economics & Organic Pull, F5: UX Friction).
- **Core Diagnosis:** Detects the **Leaky Bucket Syndrome** (burning marketing capital to compensate for poor product retention).

### 2.3 Phase 3: Platform Scalability & Maturity (`scale`)
- **Operating Context:** Established enterprise customer base, significant recurring revenue (ARR), high concurrent traffic.
- **Primary Executive Question:** *"Is architectural debt, feature sprawl, or organizational bureaucracy choking delivery velocity?"*
- **Active Sensor:** `PrdScale` (C1: Feature Bloat Pruning, C2: Enterprise Churn & NRR, C3: Release Bureaucracy, C4: Infrastructure Resilience, C5: Gross Margin Efficiency).
- **Core Diagnosis:** Detects **Scale Stagnation** (engineering capacity consumed entirely by maintenance and brittle legacy code).

---

## 3. Interaction with PrdOps

While the horizontal axis adapts dynamically via `PrdPhase`, the vertical axis (**`PrdOps`**) evaluates the product operating model across all phases, measuring whether the organization functions as an **Empowered Product Team** or an order-taking **Feature Factory**.

$$\text{Product Resilience Plane} = \left(\text{PrdDel}(\text{PrdPhase}), \, \text{PrdOps}\right)$$
