# DGRF PrdDisc: Phase 1 Discovery & Hypothesis Rubric (D1–D5)

The **Product Discovery (`PrdDisc`)** module is deployed during **Phase 1 (Pre-Revenue, Inception, MVP)**. Grounded in Lean Startup methodology (Ries, 2011) and Customer Development (Blank, 2013), it assesses whether the team is solving a genuine, high-severity problem with demonstrable market demand before building expensive production software.

---

## Dimension Overview

| Dimension | Domain | Anchor Scores (L1 $\to$ L4) | Max Points | Primary Theoretical Foundation |
| :--- | :--- | :--- | :--- | :--- |
| **D1** | **Problem Severity & Urgent Need** | 3, 10, 18, **25** | 25 | "Hair on Fire" Problem Validation & Economic Impact |
| **D2** | **Customer Research Depth & Objectivity** | 3, 8, 14, **20** | 20 | The Mom Test & Confirmation Bias Neutralization (Fitzpatrick, 2013) |
| **D3** | **Prototype Validation Velocity** | 3, 8, 14, **20** | 20 | Build-Measure-Learn Cycle Time & Rapid Prototyping (Ries, 2011) |
| **D4** | **Willingness to Pay & Skin-in-the-Game** | 3, 8, 14, **20** | 20 | Economic Commitment vs Verbal Compliments |
| **D5** | **MVP Scoping Feasibility & Focus** | 2, 6, 11, **15** | 15 | Minimum Viable Product Simplicity & Core Hypothesis Isolation |

$$\text{Base}_{\text{disc}} = \sum_{i=1}^5 D_i \in [14, 100]$$

---

## D1: Problem Severity & Urgent Need

- **Maximum Weight:** 25 points
- **Theoretical Basis:** Steve Blank's Customer Development framework. A product must address a critical pain point where customers are actively seeking solutions and incurring measurable economic loss today ("hair on fire" problems vs nice-to-have luxuries).
- **Traceable Artifacts:** Problem Opportunity Statements, Customer Loss Quantification Models, Current Workaround Analyses.

### Calibration Rubric

| Level | Score | Anchor Designation | Empirical Diagnostic Characteristics | Traceable Evidence Benchmark |
| :---: | :---: | :--- | :--- | :--- |
| **L1** | **3** | **Acute Mission-Critical Problem** | Target customers currently spend substantial money, time, or manual labor on painful workarounds. Urgent willingness to adopt a solution. | Quantified economic loss documented (e.g., "$50k/month in manual reconciliations"); customers currently using broken multi-tool hacks. |
| **L2** | **10** | **Recognized High Priority Need** | Customers acknowledge the problem as a top-3 operational challenge, but existing manual processes provide tolerable mitigation. | Documented customer ranking placing the problem in top 3 organizational priorities for current fiscal year. |
| **L3** | **18** | **Latent / Mild Inconvenience** | Customers agree the problem exists in theory, but express low urgency to change current habits. "Nice to have when we have extra time." | Discovery interviews reveal problem is ranked low; customers unwilling to allocate staff or budget to solve it. |
| **L4** | **25** | **Manufactured / Hallucinated Problem** | Problem exists solely in the imagination of the founders or executive sponsors. Target customers do not recognize the issue. | Interviewees repeatedly state "this is not a problem for us" or express bewilderment at the proposed use case. |

---

## D2: Customer Research Depth & Objectivity

- **Maximum Weight:** 20 points
- **Theoretical Basis:** The Mom Test (Rob Fitzpatrick, 2013). User research is invalid if it asks hypothetical future questions ("Would you buy a product that does X?"). Valid discovery investigates past customer behavior and verifiable facts.
- **Traceable Artifacts:** Interview Transcripts, Past Behavior Audio Logs, Discovery Persona Syntheses.

### Calibration Rubric

| Level | Score | Anchor Designation | Empirical Diagnostic Characteristics | Traceable Evidence Benchmark |
| :---: | :---: | :--- | :--- | :--- |
| **L1** | **3** | **Behavioral Research ($\ge 30$ Interviews)** | $\ge 30$ open-ended interviews conducted focusing strictly on past behaviors and real workflows. Zero pitch bias or hypothetical questions. | Interview database with indexed quotes, exact workflow screenshots, and cross-interview pattern synthesis. |
| **L2** | **8** | **Adequate Discovery Sample ($15\text{--}29$ Interviews)** | Thorough interviews conducted across target user segments with objective qualitative rigor. | Structured interview repository with clear segmentation between decision-makers and end-users. |
| **L3** | **14** | **Superficial Survey / Confirmation Bias** | Team relies on multiple-choice online surveys or leading questions that pitch the solution rather than probing the problem. | Survey questions containing leading prompts ("Would you like a tool that saves you 10 hours a week?"); sample size $< 10$ interviews. |
| **L4** | **20** | **Zero Validated Customer Interviews** | Zero external user discovery. Assumptions validated solely by internal colleagues, friends, or executive intuition. | No interview notes or recordings exist; research consists of desktop market analysis and analyst reports. |

---

## D3: Prototype Validation Velocity

- **Maximum Weight:** 20 points
- **Theoretical Basis:** Rapid Experimentation (Eric Ries; Alberto Savoia). Validating hypotheses with throwaway clickable prototypes or concierge experiments is orders of magnitude cheaper than writing production backend services.
- **Traceable Artifacts:** Figma Clickable Prototypes, Wizard of Oz Test Logs, Usability Test Recordings, Experiment Scorecards.

### Calibration Rubric

| Level | Score | Anchor Designation | Empirical Diagnostic Characteristics | Traceable Evidence Benchmark |
| :---: | :---: | :--- | :--- | :--- |
| **L1** | **3** | **Rapid Weekly Prototype Iterations** | Hypotheses tested weekly using clickable prototypes, landing page tests, or concierge workflows. Fast user learning loops. | Usability test recordings showing $\ge 5$ prototype iterations tested with external users within a 30-day window. |
| **L2** | **8** | **Bi-Weekly Interactive Testing** | Prototypes evaluated systematically with external users before backend engineering begins. | Documented prototype test rounds with task completion rates and qualitative feedback synthesis. |
| **L3** | **14** | **Static Wireframe Reviews** | Prototypes shown passively in slide decks or tested only internally within the company without user task observation. | Figma links reviewed by internal managers; zero observed user test sessions recorded. |
| **L4** | **20** | **Coding First (Zero Prototyping)** | Engineering started immediately on full production code without creating or testing any low-fidelity prototype or concept proof. | Full production architecture built for 3+ months without a single external user ever seeing a screen. |

---

## D4: Willingness to Pay & Skin-in-the-Game

- **Maximum Weight:** 20 points
- **Theoretical Basis:** Economic Signaling & Customer Skin-in-the-Game. Verbal praise ("This looks amazing!") is statistically uncorrelated with commercial adoption. Valid demand requires non-refundable deposits, letters of intent (LOI), or pre-orders.
- **Traceable Artifacts:** Signed Letters of Intent (LOI), Paid Pilot Agreements, Non-Refundable Deposit Invoices, Waitlist Pre-Orders.

### Calibration Rubric

| Level | Score | Anchor Designation | Empirical Diagnostic Characteristics | Traceable Evidence Benchmark |
| :---: | :---: | :--- | :--- | :--- |
| **L1** | **3** | **Signed LOIs / Paid Pilot Commitments** | Multiple enterprise customers have signed binding LOIs, put down cash deposits, or committed pilot budgets before launch. | $\ge 3$ signed LOIs with explicit pricing terms or active paid pilot invoices in escrow. |
| **L2** | **8** | **Committed Data / Time Investment** | Prospects have provided proprietary datasets, spent hours configuring integrations, or introduced C-level decision-makers. | Written pilot agreements committing internal client technical resources and integration timelines. |
| **L3** | **14** | **Verbal Interest Without Commitment** | Prospects offer encouraging compliments ("Let us know when it's built") but refuse to sign LOIs or commit budget. | Notes recording positive feedback, but zero financial, contractual, or operational commitment. |
| **L4** | **20** | **Total Commercial Apathy / Pricing Rejection** | Prospects balk at proposed price points, refuse follow-up meetings, or demand the product be offered completely free. | Prospects ghost post-pricing discussions; pricing sensitivity tests show zero willingness to pay. |

---

## D5: MVP Scoping Feasibility & Focus

- **Maximum Weight:** 15 points
- **Theoretical Basis:** Gall's Law: "A complex system that works is invariably found to have evolved from a simple system that worked." A bloated initial scope attempting to do everything fails to do anything well.
- **Traceable Artifacts:** Minimum Viable Product Scope Document, Non-Essential Feature Drop List, User Journey Map.

### Calibration Rubric

| Level | Score | Anchor Designation | Empirical Diagnostic Characteristics | Traceable Evidence Benchmark |
| :---: | :---: | :--- | :--- | :--- |
| **L1** | **2** | **Irreducible Core Value Slice** | MVP tests a single, focused value hypothesis. All extraneous features ruthlessly cut; build time $< 6$ weeks. | Scope document containing a single user flow; list of $>20$ intentionally deferred features documented. |
| **L2** | **6** | **Disciplined Core Flow with Minimal Scope** | Clear boundary around primary user workflow; build time estimated at 2–3 months. | Epics confined strictly to primary user journey; secondary features marked as post-MVP. |
| **L3** | **11** | **Feature Bloat Creep (Scope Expansion)** | MVP includes multiple secondary user personas, complex permission systems, and extensive integration wishlists. | MVP PRD spans $>50$ pages; estimated initial build time $> 6$ months before first user can test. |
| **L4** | **15** | **Monolithic Kitchen-Sink Trap** | Attempting to build an entire enterprise platform to replace existing legacy systems on day one. Guaranteed failure. | PRD includes hundreds of requirements; leadership refuses to launch without feature parity with 10-year-old incumbents. |
