# DGRF PrdFit: Phase 2 Product-Market Fit & Retention Rubric (F1–F5)

The **Product-Market Fit & Retention (`PrdFit`)** module is deployed during **Phase 2 (Growth, Early Traction, Scaling PMF)**. Grounded in quantitative retention frameworks (Balfour / Reforge; Amplitude Product Analytics), it evaluates whether a product has achieved sustainable product-market fit or is merely pouring paid marketing into a "leaky bucket".

---

## Dimension Overview

| Dimension | Domain | Anchor Scores (L1 $\to$ L4) | Max Points | Primary Theoretical Foundation |
| :--- | :--- | :--- | :--- | :--- |
| **F1** | **User Retention Curve Stability** | 3, 10, 18, **25** | 25 | Retention Curve Flattening (Reforge / Balfour, 2018) |
| **F2** | **Core Feature Adoption & Habituation** | 3, 8, 14, **20** | 20 | The Hook Model & Habit Formation (Eyal, 2014) |
| **F3** | **Feedback Loop Velocity & Responsiveness** | 3, 8, 14, **20** | 20 | Quantitative Customer Feedback Velocity & NPS Distribution |
| **F4** | **Organic Pull & Unit Economic Traction** | 3, 8, 14, **20** | 20 | Sean Ellis PMF Survey ($>40\%$) & Word-of-Mouth Organic K-Factor |
| **F5** | **User Experience Friction & Defect Drag** | 2, 6, 11, **15** | 15 | Usability Heuristics (Nielsen, 1994) & UX Churn Attribution |

$$\text{Base}_{\text{fit}} = \sum_{n=1}^5 F_n \in [14, 100]$$

---

## F1: User Retention Curve Stability

- **Maximum Weight:** 25 points
- **Theoretical Basis:** Retention is the definitive quantitative validator of Product-Market Fit. If a cohort retention curve does not flatten parallel to the x-axis, the product lacks PMF regardless of initial acquisition spikes (Brian Balfour, Reforge).
- **Traceable Telemetry:** Cohort Retention Heatmaps (Day 1 / 7 / 30 / 90), Monthly Active User (MAU) Churn Rate, Unbounded Cohort Curves.

### Calibration Rubric

| Level | Score | Anchor Designation | Empirical Diagnostic Characteristics | Telemetry Threshold |
| :---: | :---: | :--- | :--- | :--- |
| **L1** | **3** | **Flattened Asymptote Retention Curve** | Cohort retention curves flatten definitively at a high baseline. Month-over-month cohort retention is stable; cohort lines do not decay to zero. | B2B SaaS: Day 90 cohort retention flattens at $\ge 40\%$; Consumer/Prosumer: Day 30 flattens at $\ge 25\%$. |
| **L2** | **10** | **Moderate Flattening with Minor Churn** | Retention curves show clear stabilization, but initial drop-off during onboarding is steeper than industry top-quartile. | B2B: Day 90 retention flattens at $25\text{--}39\%$; user renewal rate $> 80\%$. |
| **L3** | **18** | **Persistent Negative Slope (Decay)** | Retention curve continues to decline steadily month after month without flattening. Users gradually abandon the product over a 6-month period. | Day 90 retention $< 20\%$ with downward slope; churn exceeds new user expansion rate. |
| **L4** | **25** | **Terminal Decay to Zero ("Leaky Bucket")** | Retention curve plunges straight to zero within 30 to 60 days. Product has zero recurring engagement; growth driven entirely by unsustainable ad spend. | Day 30 retention $< 5\%$; zero long-term retained cohorts; CAC payback period mathematically unrecoverable. |

---

## F2: Core Feature Adoption & Habituation

- **Maximum Weight:** 20 points
- **Theoretical Basis:** Habit Loops & The "Aha! Moment" (Nir Eyal, 2014; Casey Winters). High retention requires users to rapidly reach their core value milestone and integrate the product into their weekly operating rhythm.
- **Traceable Telemetry:** Time-to-First-Value (TTFV), Daily Active Users / Monthly Active Users (DAU/MAU Ratio), Core Event Frequency per User.

### Calibration Rubric

| Level | Score | Anchor Designation | Empirical Diagnostic Characteristics | Telemetry Threshold |
| :---: | :---: | :--- | :--- | :--- |
| **L1** | **3** | **Rapid Habituation & High DAU/MAU** | Users reach the "Aha! Moment" in $< 15$ minutes. The core value loop is executed multiple times per week; sticky daily workflow. | $\text{DAU/MAU} \ge 0.40$ (or weekly $\ge 0.65$); TTFV $< 1$ day; $>70\%$ of activated users adopt core feature. |
| **L2** | **8** | **Solid Weekly Engagement Cadence** | Users reliably return weekly to complete standard business workflows. Steady feature engagement across core cohorts. | $\text{DAU/MAU} \in [0.25, 0.39]$; core action executed $\ge 2\times$ per week by active users. |
| **L3** | **14** | **Fragmented Feature Usage / High TTFV** | Users take days or weeks to configure the product before realizing any value. High drop-off during initial workflow setup. | $\text{DAU/MAU} \in [0.10, 0.24]$; TTFV $> 14$ days; $<30\%$ of signups ever trigger the core value event. |
| **L4** | **20** | **Superficial Logins with Zero Action** | Users log in once, look around the dashboard without performing the core action, and never return. Complete lack of user habituation. | $\text{DAU/MAU} < 0.10$; $>80\%$ of accounts show zero core feature events after day 1. |

---

## F3: Feedback Loop Velocity & Responsiveness

- **Maximum Weight:** 20 points
- **Theoretical Basis:** Closed-Loop Customer Feedback. A product achieving PMF maintains tight qualitative and quantitative channels with active users, turning customer frustrations into rapid product refinements.
- **Traceable Telemetry:** In-App CSAT Scores, Support Ticket Tag Distribution, Median Time to Resolve Usability Roadblocks.

### Calibration Rubric

| Level | Score | Anchor Designation | Empirical Diagnostic Characteristics | Telemetry Threshold |
| :---: | :---: | :--- | :--- | :--- |
| **L1** | **3** | **Real-Time Automated Feedback Loops** | In-app feedback mechanisms capture friction at the exact point of drop-off. Customer advisory board meets bi-weekly with product designers. | CSAT score $> 88\%$; usability defects resolved in $< 1$ sprint; qualitative feedback cataloged automatically. |
| **L2** | **8** | **Systematic Monthly User Reviews** | Monthly NPS and CSAT surveys reviewed across all product squads. Clear roadmap prioritization given to user pain points. | CSAT score $75\text{--}87\%$; structured feedback review meetings held every sprint. |
| **L3** | **14** | **Unmonitored Support Silo** | Customer complaints and support tickets remain siloed in customer service; product managers rarely inspect support escalations. | CSAT score $60\text{--}74\%$; product team does not have access to Zendesk/Intercom support logs. |
| **L4** | **20** | **Hostile User Sentiment & Ghosting** | Users express widespread outrage on public forums, app store reviews, or social media; company unresponsive or deletes negative comments. | CSAT score $< 60\%$; Net Promoter Score (NPS) negative; support ticket resolution latency $> 30$ days. |

---

## F4: Organic Pull & Unit Economic Traction

- **Maximum Weight:** 20 points
- **Theoretical Basis:** The Sean Ellis PMF Test (Ellis, 2010). Asking users "How would you feel if you could no longer use this product?" If $\ge 40\%$ answer "Very Disappointed", product-market fit is established.
- **Traceable Telemetry:** Sean Ellis PMF Survey Percentage, Organic Referral K-Factor, Customer Acquisition Cost (CAC) to LTV Ratio.

### Calibration Rubric

| Level | Score | Anchor Designation | Empirical Diagnostic Characteristics | Telemetry Threshold |
| :---: | :---: | :--- | :--- | :--- |
| **L1** | **3** | **Decisive Organic Pull ($\ge 40\%$ Sean Ellis)** | Customers actively recommend the product to peers without referral incentives. Spontaneous word-of-mouth growth; strong organic acquisition. | $\ge 40\%$ of respondents would be "very disappointed"; organic viral coefficient $K > 0.4$; $\text{LTV/CAC} > 3.5$. |
| **L2** | **8** | **Healthy Traction ($30\text{--}39\%$ Sean Ellis)** | Solid organic growth supported by content and inbound marketing. Customers describe the product as valuable. | Sean Ellis score $30\text{--}39\%$; organic inbound represents $>40\%$ of new pipeline; $\text{LTV/CAC} > 2.5$. |
| **L3** | **14** | **Paid Growth Subsidy ($15\text{--}29\%$ Sean Ellis)** | New user acquisition collapses whenever paid ad spending is paused. Low organic referral; customers view product as replaceable. | Sean Ellis score $15\text{--}29\%$; $>80\%$ of acquisition driven by paid marketing; $\text{LTV/CAC} < 1.5$. |
| **L4** | **20** | **Total Indifference ($< 15\%$ Sean Ellis)** | Customers would not care if the product disappeared tomorrow. Acquisition requires aggressive discount giveaways or coercive sales tactics. | Sean Ellis score $< 15\%$; zero organic referrals; customers actively seeking alternatives to switch away. |

---

## F5: User Experience Friction & Defect Drag

- **Maximum Weight:** 15 points
- **Theoretical Basis:** Usability Engineering (Jakob Nielsen, 1994). Confusing UX friction, inconsistent mental models, and software crashes directly amplify user churn during the critical first week of product evaluation.
- **Traceable Telemetry:** FullStory / PostHog Rage Click Frequency, Dead Click Rate, Onboarding Funnel Conversion Rate.

### Calibration Rubric

| Level | Score | Anchor Designation | Empirical Diagnostic Characteristics | Telemetry Threshold |
| :---: | :---: | :--- | :--- | :--- |
| **L1** | **2** | **Frictionless Intuitive Design** | Zero onboarding friction. Clean visual hierarchy, zero user dead clicks, and instant responsiveness. Accessibility standards verified. | Onboarding funnel completion $> 75\%$; rage clicks $< 0.5\%$ of user sessions. |
| **L2** | **6** | **Minor Usability Polish Needed** | Straightforward user journey with occasional minor UI inconsistencies that do not block core task completion. | Onboarding funnel completion $55\text{--}74\%$; rage clicks $< 2.0\%$. |
| **L3** | **11** | **Confusing Navigation & Workflow Friction** | Users routinely get stuck, abandon setup wizards, or file support tickets asking how to perform basic platform actions. | Onboarding completion $30\text{--}54\%$; rage clicks $> 5.0\%$; high drop-off on form submissions. |
| **L4** | **15** | **Severe UX Hostility & Broken Flows** | Broken layouts, frequent crash loops, mobile unresponsiveness, and contradictory navigation menus. | Onboarding completion $< 30\%$; rage clicks $> 10\%$; users actively abandon workflows in frustration. |
