# DGRF PrjDel Live: Active Delivery Execution & Telemetry Rubric (O1–O5)

The **Operational Delivery (`PrjDel` Live)** vector evaluates the real-time execution health, engineering throughput, defect dynamics, and psychological safety of an active enterprise IT program. Grounded in Earned Value Management (EVM) and DORA metrics, it provides an objective operational counterweight to structural governance assumptions.

---

## Dimension Overview

| Dimension | Domain | Anchor Scores (L1 $\to$ L4) | Max Points | Primary Theoretical Foundation |
| :--- | :--- | :--- | :--- | :--- |
| **O1** | **Schedule Critical Path Drift** | 3, 10, 18, **25** | 25 | EVM Schedule Performance Index (SPI) & Critical Path Method |
| **O2** | **Acceptance & Defect Inflow Dynamics** | 3, 8, 14, **20** | 20 | Software Reliability Growth Models & Defect Escape Rates |
| **O3** | **Capital Efficiency & Cost Variance** | 3, 8, 14, **20** | 20 | EVM Cost Performance Index (CPI) & Run-Rate Sustainability |
| **O4** | **Team Morale, Flow & Attrition Risk** | 2, 6, 11, **15** | 15 | Psychological Safety (Edmondson, 2018) & Cognitive Overload |
| **O5** | **Reporting Integrity & The "Mum Effect"** | 3, 8, 14, **20** | 20 | The Mum Effect & The "Watermelon Effect" (Keil & Robey, 1999) |

$$\text{Base}_{\text{del}} = \sum_{j=1}^5 O_j \in [14, 100]$$

---

## O1: Schedule Critical Path Drift

- **Maximum Weight:** 25 points
- **Theoretical Basis:** Critical Path Method (CPM) and Earned Value Management Schedule Variance ($SV = EV - PV$). When critical path milestones slip, non-critical activities cannot compensate; schedule compression tactics inevitably degrade quality.
- **Traceable Telemetry:** CPM Network Schedule, Baseline vs Forecast Milestones, Sprint Velocity Burndown, Critical Path Slack Tracking.

### Calibration Rubric

| Level | Score | Anchor Designation | Empirical Diagnostic Characteristics | Telemetry Threshold |
| :---: | :---: | :--- | :--- | :--- |
| **L1** | **3** | **On Schedule / Ahead ($\text{SPI} \ge 0.98$)** | Zero slippage on critical path milestones. Critical path float is stable or increasing. Delivery cadence matches or exceeds baseline forecast. | Critical path milestone variance $< 5\%$; $\text{SPI} \ge 0.98$; zero baseline re-anchoring required. |
| **L2** | **10** | **Minor Recoverable Slippage ($0.90 \le \text{SPI} < 0.98$)** | Minor delay ($5\text{--}15\%$) on non-critical path or recoverable critical path items using available float without compressing test phases. | Critical path variance $5\text{--}15\%$; schedule recovery plan verified without overtime crunch. |
| **L3** | **18** | **Substantial Critical Path Delay ($0.75 \le \text{SPI} < 0.90$)** | Critical path delayed by $15\text{--}30\%$. Buffer sprints exhausted; management compresses system integration or testing phase to protect date. | Milestone slip $15\text{--}30\%$; test execution window reduced by $> 25\%$; cosmetic baseline resets. |
| **L4** | **25** | **Critical Path Breakdown ($\text{SPI} < 0.75$)** | Critical path broken ($> 30\%$ slip). Multiple cosmetic re-baselining events masking persistent stall. Deliverable target dates mathematically impossible. | Critical path variance $> 30\%$; $\ge 2$ unapproved baseline resets in previous quarter; $\text{SPI} < 0.75$. |

---

## O2: Acceptance & Defect Inflow Dynamics

- **Maximum Weight:** 20 points
- **Theoretical Basis:** Software Reliability Engineering (Musa, 1999). A widening delta between defect discovery and defect resolution signals an impending quality collapse and technical debt explosion.
- **Traceable Telemetry:** User Acceptance Testing (UAT) First-Time Pass Rate, Defect Arrival vs Burn-Down Curve, P1/P2 Defect Aging, Automated Test Flakiness Index.

### Calibration Rubric

| Level | Score | Anchor Designation | Empirical Diagnostic Characteristics | Telemetry Threshold |
| :---: | :---: | :--- | :--- | :--- |
| **L1** | **3** | **Net-Negative Inflow / Flawless UAT** | Defect resolution significantly outpaces discovery. High test automation coverage ($>85\%$). Zero P1 (showstopper) open defects at milestone gate. | UAT first-time pass rate $> 95\%$; zero open P1 defects; defect closure rate $> 1.25\times$ arrival rate. |
| **L2** | **8** | **Stable Defect Equilibrium** | Defect discovery matches resolution rate. Manageable P2/P3 defect backlog with agreed workarounds; no P1 blockers active. | UAT pass rate $85\text{--}94\%$; P1 defects resolved within 24-hour SLA; zero architectural release blockers. |
| **L3** | **14** | **Defect Arrival Outpacing Resolution** | Defect discovery exceeds burn-down. P1 defects accumulating into milestone release dates; regression test suites failing or frequently skipped. | UAT pass rate $65\text{--}84\%$; active P1 backlog growing week-over-week; defect escape rate to staging $> 20\%$. |
| **L4** | **20** | **Catastrophic Quality Crisis** | Uncontrolled defect explosion. Formal testing bypassed or sign-offs coerced to hit arbitrary dates; core platform stability failing in staging environments. | UAT pass rate $< 65\%$; $\ge 5$ active P1 release blockers; testing bypassed; critical regressions deployed. |

---

## O3: Capital Efficiency & Cost Variance (CPI)

- **Maximum Weight:** 20 points
- **Theoretical Basis:** EVM Cost Performance Index ($\text{CPI} = \frac{EV}{AC}$). A project burning capital faster than it delivers verified business capability will face emergency liquidity exhaustion regardless of executive goodwill.
- **Traceable Telemetry:** Monthly Actual Cost (AC), Earned Value (EV), Cost Performance Index (CPI), Burn Rate Runway Projections.

### Calibration Rubric

| Level | Score | Anchor Designation | Empirical Diagnostic Characteristics | Telemetry Threshold |
| :---: | :---: | :--- | :--- | :--- |
| **L1** | **3** | **Optimal Capital Efficiency ($\text{CPI} \ge 0.98$)** | Financial burn rate strictly mirrors verified delivered value. Minimal contractor over-billing or unbudgeted infrastructure costs. | $\text{CPI} \ge 0.98$; Cost Variance ($CV$) within $\pm 2\%$ of planned expenditure. |
| **L2** | **8** | **Minor Budget Variance ($0.90 \le \text{CPI} < 0.98$)** | Minor cost overruns ($5\text{--}10\%$) with identified root causes (e.g., temporary cloud scaling or specialized tool licensing) and active mitigation. | $\text{CPI} \in [0.90, 0.97]$; projected Estimate at Completion (EAC) within approved contingency. |
| **L3** | **14** | **Severe Capital Bleed ($0.75 \le \text{CPI} < 0.90$)** | Substantial budget burn without proportional software capability delivered. High vendor billing for rework and defect remediation. | $\text{CPI} \in [0.75, 0.89]$; EAC exceeds approved budget + contingency; cash runway reduced by $> 25\%$. |
| **L4** | **20** | **Runaway Burn Rate ($\text{CPI} < 0.75$)** | Acute cash burn crisis. Project will exhaust allocated capital months before target release, requiring emergency board-level capital replenishment. | $\text{CPI} < 0.75$; unbudgeted contractor headcount surge; imminent capital exhaustion within 60 days. |

---

## O4: Team Morale, Flow & Attrition Risk

- **Maximum Weight:** 15 points
- **Theoretical Basis:** Psychological Safety in High-Performing Teams (Edmondson, 2018) and Sustainable Pace (Beck, 2001). Chronic overtime and heroics cause key-person cognitive exhaustion, leading to sudden departures of critical system architects.
- **Traceable Telemetry:** Voluntary Engineering Attrition Rate, Overtime / Weekend PR Commit Frequency, Anonymous Pulse Survey Psychological Safety Score, PR Review Latency.

### Calibration Rubric

| Level | Score | Anchor Designation | Empirical Diagnostic Characteristics | Telemetry Threshold |
| :---: | :---: | :--- | :--- | :--- |
| **L1** | **2** | **Sustainable Cadence & Psychological Safety** | Sustainable 40-hour work week. High psychological safety; engineering candidly discusses mistakes. Zero voluntary departures in lead roles. | Voluntary attrition $< 5\%$; weekend commits $< 2\%$; team pulse score $> 8.5/10$. |
| **L2** | **6** | **Occasional Release Crunch / Stable Core** | Predictable, temporary overtime during major milestone release windows. Core technical leads committed and engaged. | Voluntary attrition $5\text{--}12\%$; weekend commits $< 10\%$; team pulse score $7.0\text{--}8.4/10$. |
| **L3** | **11** | **Chronic Crunch ($> 50\text{ hrs/wk}$)** | Persistent overtime across multiple consecutive sprints. Rising cynicism; lead engineers expressing frustration and actively interviewing. | Voluntary attrition $13\text{--}25\%$; weekend commits $> 20\%$; key system architect resignations threatened. |
| **L4** | **15** | **Acute Burnout & Lead Resignations** | Toxic blame culture; departure of irreplaceable core technical architects and tech leads; engineering paralysis and severe cynicism. | Voluntary attrition $> 25\%$; key lead architects departed; engineering team in active revolt. |

---

## O5: Reporting Integrity & The "Mum Effect"

- **Maximum Weight:** 20 points
- **Theoretical Basis:** The "Mum Effect" (unwillingness to transmit bad news up the corporate hierarchy; Keil & Robey, 1999) and the "Watermelon Effect" (dashboards show Green on the outside while engineering is Red on the inside).
- **Traceable Telemetry:** Audit Delta between PMO Dashboard RAG Status and Raw Jira/Git Repository Metrics, Frequency of Bad News Escalation.

### Calibration Rubric

| Level | Score | Anchor Designation | Empirical Diagnostic Characteristics | Telemetry Threshold |
| :---: | :---: | :--- | :--- | :--- |
| **L1** | **3** | **Radical Candor & Unfiltered Truth** | Bad news is surfaced immediately and rewarded. Steering reports reflect raw engineering metrics without cosmetic filtering. | PMO dashboard RAG status matches engineering telemetry within 24 hours; blockers escalated immediately. |
| **L2** | **8** | **Balanced Administrative Smoothing** | Minor administrative smoothing of friction, but all fundamental technical impediments and risks are honestly escalated to leadership. | Minor lag ($< 1$ sprint) in reporting minor variance; all P1 risks escalated in steering materials. |
| **L3** | **14** | **Pronounced "Watermelon Effect"** | PMO status reports Green or Amber-Green, while engineering Slack channels and Jira show critical blockers, missed sprints, and panic. | Discrepancy between dashboard (Green) and actual defect backlog / velocity ($> 20\%$ variance). |
| **L4** | **20** | **Systemic Metric Fabrication** | Deliberate suppression of bad news; punitive response to engineers who report delays; fabricated milestone sign-offs; complete executive detachment. | Documented suppression of risk audits; gag orders on status reports; cosmetic milestone "done" definitions. |

---

## Operational Interaction Rule

$$\text{Penalty}_{\text{del}} = \begin{cases} 10 & \text{if } O_1 = 25 \land O_2 \ge 14 \\ 0 & \text{otherwise} \end{cases}$$

$$\text{Score}_{\text{del}} = \min\left(100, \, \text{Base}_{\text{del}} + \text{Penalty}_{\text{del}}\right)$$
