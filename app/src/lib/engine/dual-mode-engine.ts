/**
 * DeliveryPulse — DGRF Dual-Mode Diagnostic Engine (Project & Product)
 * 
 * Implements:
 * - Step 1: Governance Mode Selection ('project' | 'product')
 * - Step 2: Lifecycle Phase Calibration (4 phases per mode)
 * - Step 3: Interactive Questionnaires (D1-D5 & O1-O5 for Project; G1-G5 & P1-P5 for Product)
 * - Step 4: Real-Time Calculation & Nonlinear Penalty Engines:
 *   Project Penalty: If (D1 === 25 && D2 >= 13) { PrjGov = Math.min(100, rawPrjGov + 10); }
 *   Product Penalty: If (P1 === 25 && P4 >= 14) { PrdDel = Math.min(100, rawPrdDel + 12); } // Blind Leaky Bucket Penalty
 * - Quadrants:
 *   Project: Q1: Systemic Fragility | Q2: Fragile Governance | Q3: Resilient Equilibrium | Q4: Execution Constraint
 *   Product: Q1: Death Spiral | Q2: Zombie Product | Q3: Product-Led Engine | Q4: Platform Bottleneck
 * 
 * Author: Ali Maleki (MBA, PMP)
 */

export type GovernanceMode = 'project' | 'product';

export type ProjectPhase =
  | 'inception'
  | 'procurement'
  | 'execution'
  | 'cutover';

export type ProductPhase =
  | 'discovery'
  | 'pmf'
  | 'scale'
  | 'maturity';

export interface PhaseDefinition {
  id: string;
  name: string;
  subtitle: string;
  focus: string;
}

export const PROJECT_PHASES: PhaseDefinition[] = [
  {
    id: 'inception',
    name: 'Inception & Chartering',
    subtitle: 'Phase 1',
    focus: 'Sponsor mandate & scope baseline definition',
  },
  {
    id: 'procurement',
    name: 'Procurement & Architecture',
    subtitle: 'Phase 2',
    focus: 'Vendor terms, milestone escrow, technical architecture & debt',
  },
  {
    id: 'execution',
    name: 'Mid-Flight Execution / Build',
    subtitle: 'Phase 3',
    focus: 'Change-order churn, sprint velocity, burn rate vs. EVM',
  },
  {
    id: 'cutover',
    name: 'Integration & Cutover / UAT',
    subtitle: 'Phase 4',
    focus: 'Defect backlogs, operational readiness, stakeholder panic mitigation',
  },
];

export const PRODUCT_PHASES: PhaseDefinition[] = [
  {
    id: 'discovery',
    name: '0-to-1 Discovery & Validation',
    subtitle: 'Horizon 1',
    focus: 'Problem-solution fit, discovery cadence, roadmap flexibility',
  },
  {
    id: 'pmf',
    name: 'Product-Market Fit & Early Traction',
    subtitle: 'Horizon 2',
    focus: 'Retention curves, cohort churn, feature bloat prevention',
  },
  {
    id: 'scale',
    name: 'Scale & Market Expansion',
    subtitle: 'Horizon 3',
    focus: 'Unit economics, CAC/LTV, cross-team coupling, cognitive overload',
  },
  {
    id: 'maturity',
    name: 'Maturity & Architectural Debt',
    subtitle: 'Horizon 4',
    focus: 'Platform refactoring, legacy drag, growth plateau stabilization',
  },
];

export interface DimensionOption<T extends number = number> {
  value: T;
  level: 0 | 1 | 2 | 3;
  label: string;
  description: string;
  criteria: string;
}

export interface DimensionDef<T extends number = number> {
  code: string;
  name: string;
  category: 'gov' | 'del';
  maxPoints: number;
  weightLabel: string;
  focusArea: string;
  options: DimensionOption<T>[];
}

// ==========================================
// A. PROJECT MODE DIMENSIONS (D1-D5, O1-O5)
// ==========================================

export const PROJECT_D1: DimensionDef<0 | 8 | 16 | 25> = {
  code: 'D1',
  name: 'Decision Authority & Executive Mandate',
  category: 'gov',
  maxPoints: 25,
  weightLabel: '25 pts',
  focusArea: 'Executive Sponsorship & Single-Point Accountability',
  options: [
    {
      value: 0,
      level: 0,
      label: 'Single Accountable Executive',
      description: 'Single accountable executive with full budget and unilateral veto power.',
      criteria: 'Decisions resolved within 24 hours. Zero consensus committee vetoes.',
    },
    {
      value: 8,
      level: 1,
      label: 'Clear Sponsor & Escalation',
      description: 'Clear sponsor, weekly cadence, structured escalation pathways.',
      criteria: 'Standard escalation latency < 3 business days; clear operational charter.',
    },
    {
      value: 16,
      level: 2,
      label: 'Diffuse Steering Committee',
      description: 'Steering committee with diffuse accountability; deferred decisions and political compromise.',
      criteria: 'Decisions stalled in committees for 2-4 weeks; contradictory scope compromises.',
    },
    {
      value: 25,
      level: 3,
      label: 'Absent / Paralyzed Sponsor',
      description: 'Absent/paralyzed sponsor; multi-committee gridlock; rogue departmental decisions.',
      criteria: 'Complete paralysis; architectural decisions deferred indefinitely; fear of blame.',
    },
  ],
};

export const PROJECT_D2: DimensionDef<0 | 7 | 13 | 20> = {
  code: 'D2',
  name: 'Procurement Architecture & Vendor Risk',
  category: 'gov',
  maxPoints: 20,
  weightLabel: '20 pts',
  focusArea: 'Contractual Alignment & Risk Allocation',
  options: [
    {
      value: 0,
      level: 0,
      label: 'Outcome-Aligned / Shared Risk',
      description: 'Outcome-aligned / shared-risk milestone contract with defect escrow.',
      criteria: 'Shared risk-reward commercial model; skin-in-the-game vendor incentives.',
    },
    {
      value: 7,
      level: 1,
      label: 'Capped T&M with Quality Gates',
      description: 'Capped T&M with quality gate sign-offs and spend burn ceilings.',
      criteria: 'Vendor delivers under periodic deliverable review with burn rate boundaries.',
    },
    {
      value: 13,
      level: 2,
      label: 'T&M without Scope Ceiling',
      description: 'Time & Materials without scope ceiling; vendor friction and frequent change requests.',
      criteria: 'Vendor disputes sprint items; change-order friction consumes 20%+ of time.',
    },
    {
      value: 20,
      level: 3,
      label: 'Predatory Cost-Plus / Lock-in',
      description: 'Cost-plus or open T&M; vendor profit incentive tied directly to delays and headcounts.',
      criteria: 'Vendor replaces senior architects with junior staff; billing continues regardless of delays.',
    },
  ],
};

export const PROJECT_D3: DimensionDef<0 | 7 | 14 | 20> = {
  code: 'D3',
  name: 'Scope Governance & Baseline Integrity',
  category: 'gov',
  maxPoints: 20,
  weightLabel: '20 pts',
  focusArea: 'Configuration Control & Baseline Discipline',
  options: [
    {
      value: 0,
      level: 0,
      label: 'Zero-Sum Trade-off Governance',
      description: 'Zero-sum trade-off governance; formal gate for any scope addition (must subtract equal scope).',
      criteria: 'Strict formal CCB; baseline tracked in version control; scope creep rate < 2%.',
    },
    {
      value: 7,
      level: 1,
      label: 'Impact Verification Required',
      description: 'Impact verification required before acceptance; documented cost and schedule trade-offs.',
      criteria: 'Scope adjustments logged formally; minor variance absorbed within contingency.',
    },
    {
      value: 14,
      level: 2,
      label: 'Permissive Change Control',
      description: 'Permissive change control; scope creep masked as refinement or minor backlog grooming.',
      criteria: 'Backlog grows 15-25% per quarter without baseline adjustments or capacity additions.',
    },
    {
      value: 20,
      level: 3,
      label: 'Uncontrolled Backdoor Creep',
      description: 'Uncontrolled backdoor creep; political feature insertions without budget or timeline adjustment.',
      criteria: 'Requirements churn exceeds 40%; teams build contradictory features simultaneously.',
    },
  ],
};

export const PROJECT_D4: DimensionDef<0 | 7 | 14 | 20> = {
  code: 'D4',
  name: 'Contingency & Reserve Governance',
  category: 'gov',
  maxPoints: 20,
  weightLabel: '20 pts',
  focusArea: 'Actuarial Capital Buffering & Sunk-Cost Management',
  options: [
    {
      value: 0,
      level: 0,
      label: 'Ring-Fenced Reserve (>20%)',
      description: 'Ring-fenced reserve (>20%) controlled solely by sponsor under strict release criteria.',
      criteria: 'Reserve intact; Monte Carlo simulation validates 90% confidence envelope.',
    },
    {
      value: 7,
      level: 1,
      label: 'Standard Reserve (10–15%)',
      description: 'Standard reserve (10–15%) with planned drawdowns against quantified risk registers.',
      criteria: 'Drawdown logged against quantified risk registers; variance under control.',
    },
    {
      value: 14,
      level: 2,
      label: 'Depleted Reserve (<5%)',
      description: 'Depleted reserve (<5%); emergency requests needed for blockers; zero margin for error.',
      criteria: 'Zero buffer remaining; unforeseen technical debt immediately stalls program funding.',
    },
    {
      value: 20,
      level: 3,
      label: 'Zero Buffer / Optimistic Budget',
      description: 'Zero buffer; optimistic budgeting; zero contingency absorption; running in structural deficit.',
      criteria: 'Contractor invoices held back; program relies on emergency corporate capital injections.',
    },
  ],
};

export const PROJECT_D5: DimensionDef<0 | 5 | 10 | 15> = {
  code: 'D5',
  name: 'Architectural Complexity & Legacy Drag',
  category: 'gov',
  maxPoints: 15,
  weightLabel: '15 pts',
  focusArea: 'Modular Insulation & Conways Law',
  options: [
    {
      value: 0,
      level: 0,
      label: 'Decoupled Modular Services',
      description: 'Decoupled modular services; isolated interfaces and clear domain boundaries.',
      criteria: 'Services deploy independently; failures contained within single sub-domain.',
    },
    {
      value: 5,
      level: 1,
      label: 'Bounded Monolith with Clean APIs',
      description: 'Bounded monolith; clean integration points; well-structured codebase layer separation.',
      criteria: 'Integration testing automated; cross-module regressions < 5% of releases.',
    },
    {
      value: 10,
      level: 2,
      label: 'Synchronous Legacy Dependencies',
      description: 'Synchronous legacy dependencies; cross-system blocking; 2-phase commits across mainframes.',
      criteria: 'Releases require simultaneous synchronized downtime across 4+ enterprise platforms.',
    },
    {
      value: 15,
      level: 3,
      label: 'Undocumented Spaghetti Monolith',
      description: 'Undocumented spaghetti monolith; high coupling; brittle shared databases and circular triggers.',
      criteria: 'Single line schema change cascades catastrophic outages across unrelated corporate portals.',
    },
  ],
};

export const PROJECT_O1: DimensionDef<0 | 8 | 16 | 25> = {
  code: 'O1',
  name: 'Schedule Drift & Critical Path Delay',
  category: 'del',
  maxPoints: 25,
  weightLabel: '25 pts',
  focusArea: 'Critical Path Analysis & Earned Schedule',
  options: [
    {
      value: 0,
      level: 0,
      label: 'On Schedule (SPI >= 1.0)',
      description: 'Milestone delivered on or ahead of critical path; zero variance in past 90 days.',
      criteria: 'SPI >= 1.0; deliverables completed on or ahead of baseline schedule.',
    },
    {
      value: 8,
      level: 1,
      label: 'Minor Non-Critical Slip (<10%)',
      description: 'Minor non-critical slip (<10%); buffer absorbs variance without affecting release date.',
      criteria: 'SPI in [0.90, 0.99]; critical path milestone dates unaffected.',
    },
    {
      value: 16,
      level: 2,
      label: 'Critical Path Slip (10–25%)',
      description: 'Critical path delayed 10–25%; key testing compressed to preserve artificial launch dates.',
      criteria: 'SPI in [0.75, 0.89]; release dates pushed back by 1-2 months; testing phase crunched.',
    },
    {
      value: 25,
      level: 3,
      label: 'Runaway Critical Slip (>30%)',
      description: 'Severe runaway slip (>30%); no credible delivery baseline; milestone dates fictional.',
      criteria: 'SPI < 0.70; project timeline doubled without end-to-end integration proof.',
    },
  ],
};

export const PROJECT_O2: DimensionDef<0 | 7 | 13 | 20> = {
  code: 'O2',
  name: 'Budget Burn Velocity vs. Earned Value',
  category: 'del',
  maxPoints: 20,
  weightLabel: '20 pts',
  focusArea: 'Cost Performance Index (CPI) & Capital Efficiency',
  options: [
    {
      value: 0,
      level: 0,
      label: 'Optimal Cost Efficiency (CPI >= 1.0)',
      description: 'Optimal cost efficiency (CPI >= 1.0); capital expenditure tracks value dollar-for-dollar.',
      criteria: 'CPI >= 1.0; burn rate linear and aligned with verified functional progress.',
    },
    {
      value: 7,
      level: 1,
      label: 'Controlled Variance (CPI 0.90–0.99)',
      description: 'Controlled variance (CPI 0.90–0.99); within planned tolerances and contractual caps.',
      criteria: 'Budget burn tracks planned curves within 5% tolerance.',
    },
    {
      value: 13,
      level: 2,
      label: 'Accelerating Drain (CPI 0.75–0.89)',
      description: 'Capital drain accelerating (CPI 0.75–0.89); overtime and contractor overhead eating margins.',
      criteria: 'Overtime and emergency vendor augmentation inflating monthly spend by 25%+.',
    },
    {
      value: 20,
      level: 3,
      label: 'Runaway Burn / Overrun (CPI < 0.75)',
      description: 'Runaway burn (CPI < 0.75); capital depleted without working software capability.',
      criteria: 'Emergency capital requests required every quarter; burn rate decoupled from value.',
    },
  ],
};

export const PROJECT_O3: DimensionDef<0 | 7 | 14 | 20> = {
  code: 'O3',
  name: 'Defect Density & Unplanned Regression',
  category: 'del',
  maxPoints: 20,
  weightLabel: '20 pts',
  focusArea: 'Quality Kinetics & Software Reliability',
  options: [
    {
      value: 0,
      level: 0,
      label: 'Zero Sev-1/Sev-2 Blockers',
      description: 'Zero Sev-1/Sev-2 blockers; automated CI/CD passing >85%; zero open regressions.',
      criteria: 'Continuous delivery active; defect arrival rate < resolution rate in all sprints.',
    },
    {
      value: 7,
      level: 1,
      label: 'Manageable Defect Backlog',
      description: 'Manageable defect backlog; mean time to resolve (MTTR) < 48 hrs; release gates respected.',
      criteria: 'Mean time to resolve < 48 hours; release gates enforced cleanly.',
    },
    {
      value: 14,
      level: 2,
      label: 'Defect Inflow Exceeds Fixes',
      description: 'Defect inflow exceeds resolution; testing cycles continually delayed by unstable builds.',
      criteria: 'Sev-1/Sev-2 defects open for > 3 weeks; regression test cycle requires manual testing.',
    },
    {
      value: 20,
      level: 3,
      label: 'Terminal Defect Spiral',
      description: 'Terminal defect spiral; bug fixes trigger multiple regressions; build constantly broken.',
      criteria: 'Deploying bug fixes triggers two new bugs elsewhere; UAT rejected repeatedly.',
    },
  ],
};

export const PROJECT_O4: DimensionDef<0 | 7 | 14 | 20> = {
  code: 'O4',
  name: 'Team Cognitive Load & Key-Person Risk',
  category: 'del',
  maxPoints: 20,
  weightLabel: '20 pts',
  focusArea: 'Team Topologies & Engineering Sustainability',
  options: [
    {
      value: 0,
      level: 0,
      label: 'High Psychological Safety',
      description: 'High psychological safety; sustainable 40-hr pace; zero key-person lock; low turnover.',
      criteria: 'Sprint velocity stable; sustainable 40-hr pace; team NPS > 60.',
    },
    {
      value: 7,
      level: 1,
      label: 'Manageable Release Crunch',
      description: 'Manageable release crunch; minor turnover within norms; clear team boundaries.',
      criteria: 'Turnover in line with industry average (<10%); strong team cohesion.',
    },
    {
      value: 14,
      level: 2,
      label: 'Chronic Heroic Overtime',
      description: 'Chronic overtime; delivery depends entirely on 2–3 heroic architects working weekends.',
      criteria: 'Lead engineers express severe frustration; key person dependency risk is extreme.',
    },
    {
      value: 20,
      level: 3,
      label: 'Mass Burnout & Departures',
      description: 'Mass burnout; lead architects departing in protest; delivery paralysis and erased context.',
      criteria: 'Turnover > 30%; remaining team consists of junior replacements lacking domain context.',
    },
  ],
};

export const PROJECT_O5: DimensionDef<0 | 5 | 10 | 15> = {
  code: 'O5',
  name: 'Stakeholder Misalignment & Friction',
  category: 'del',
  maxPoints: 15,
  weightLabel: '15 pts',
  focusArea: 'Organizational Candor & Status Transparency',
  options: [
    {
      value: 0,
      level: 0,
      label: 'Transparent Candor & Trust',
      description: 'Transparent reporting candor; bad news escalated immediately without reprisal.',
      criteria: 'Bad news escalated immediately to steering committee without fear of punishment.',
    },
    {
      value: 5,
      level: 1,
      label: 'Constructive Business Alignment',
      description: 'Open business-IT alignment; constructive feedback loops; active demo participation.',
      criteria: 'Stakeholders attend demos; feedback incorporated into next planning cycle.',
    },
    {
      value: 10,
      level: 2,
      label: 'Blame Culture & Posturing',
      description: 'Blame culture; legal/procurement CC-ed; risks masked in slides; passive resistance.',
      criteria: 'Emails cc-ing legal/procurement; status reports selectively omit red risks.',
    },
    {
      value: 15,
      level: 3,
      label: 'The "Watermelon Effect"',
      description: '"Watermelon Effect"; green dashboards hiding red engineering reality; mutual litigation threats.',
      criteria: 'Steering reports show Green until the day before scheduled go-live, then collapse.',
    },
  ],
};

// ==========================================
// B. PRODUCT MODE DIMENSIONS (G1-G5, P1-P5)
// ==========================================

export const PRODUCT_G1: DimensionDef<0 | 8 | 16 | 25> = {
  code: 'G1',
  name: 'Strategic Vision & Executive Alignment',
  category: 'gov',
  maxPoints: 25,
  weightLabel: '25 pts',
  focusArea: 'Outcome-Based Management vs Feature Factory',
  options: [
    {
      value: 0,
      level: 0,
      label: 'Unified Outcome OKRs',
      description: 'Unified outcome OKRs; executive buy-in for discovery pivots; value-driven roadmap.',
      criteria: 'Company North Star Metric connects directly to daily squad sprint deliverables.',
    },
    {
      value: 8,
      level: 1,
      label: 'Clear Strategy with Minor Friction',
      description: 'Clear strategy; quarterly roadmap reviews with minor stakeholder feature friction.',
      criteria: 'Roadmap balanced between strategic customer outcomes and stakeholder inputs.',
    },
    {
      value: 16,
      level: 2,
      label: 'Sales-Driven Output Mandates',
      description: 'Feature-output mandates from executive sales deals; conflicting cross-team priorities.',
      criteria: 'Roadmap is a Gantt chart of bespoke sales promises; discovery deprioritized.',
    },
    {
      value: 25,
      level: 3,
      label: 'HiPPO-Driven Roadmap',
      description: "HiPPO-driven roadmap (Highest Paid Person's Opinion); zero discovery leeway; pure feature factory.",
      criteria: '100% of backlog dictated top-down by executive decree; zero user validation.',
    },
  ],
};

export const PRODUCT_G2: DimensionDef<0 | 7 | 13 | 20> = {
  code: 'G2',
  name: 'Dynamic Capital & Resource Allocation',
  category: 'gov',
  maxPoints: 20,
  weightLabel: '20 pts',
  focusArea: 'Metered Venture Funding & Agile Capital',
  options: [
    {
      value: 0,
      level: 0,
      label: 'Venture-Style Metered Funding',
      description: 'Venture-style metered funding based on validated customer traction milestones.',
      criteria: 'Capital released in tranches upon proving retention and willingness-to-pay.',
    },
    {
      value: 7,
      level: 1,
      label: 'Semi-Annual Outcome Adjustments',
      description: 'Semi-annual outcome-based budget adjustments with flexible headcount re-allocation.',
      criteria: 'Underperforming features descoped; capacity shifted to proven growth vectors.',
    },
    {
      value: 13,
      level: 2,
      label: 'Rigid Annual Capex Budgeting',
      description: 'Rigid annual Capex budgeting; cannot pivot resources to winning product bets.',
      criteria: 'Squads locked into fixed annual budgets regardless of customer adoption metrics.',
    },
    {
      value: 20,
      level: 3,
      label: 'Sunk-Cost Fallacy Funding',
      description: 'Sunk-cost fallacy funding; zombie initiatives starve high-growth bets of engineering talent.',
      criteria: 'Failed initiatives receive ongoing budget simply because millions were already invested.',
    },
  ],
};

export const PRODUCT_G3: DimensionDef<0 | 7 | 14 | 20> = {
  code: 'G3',
  name: 'Discovery Autonomy & Product Trio Authority',
  category: 'gov',
  maxPoints: 20,
  weightLabel: '20 pts',
  focusArea: 'Empowered Product Teams & Continuous Discovery',
  options: [
    {
      value: 0,
      level: 0,
      label: 'Autonomous Product Trio',
      description: 'Autonomous Product Trio (PM + Design + Tech Lead) with full decision authority over solution space.',
      criteria: 'Trio interviews >= 1 customer weekly; rapid assumption tests before code commit.',
    },
    {
      value: 7,
      level: 1,
      label: 'Structured Discovery Cadence',
      description: 'Structured discovery cadence; leadership reviews only major strategic pivots.',
      criteria: 'Customer research conducted systematically before major roadmap epics.',
    },
    {
      value: 14,
      level: 2,
      label: 'Trio Acts as Ticket-Takers',
      description: 'Trio acts as ticket-takers; features pre-dictated by business stakeholders; research ad-hoc.',
      criteria: 'Jira tickets authored by sales or executive sponsors; PM acts as project coordinator.',
    },
    {
      value: 20,
      level: 3,
      label: 'Zero Customer Contact',
      description: 'Complete lack of user contact; development built entirely on internal speculation.',
      criteria: 'Zero customer interviews in 12 months; "we know what our users need" mentality.',
    },
  ],
};

export const PRODUCT_G4: DimensionDef<0 | 7 | 14 | 20> = {
  code: 'G4',
  name: 'Technical Debt & Architectural Capacity',
  category: 'gov',
  maxPoints: 20,
  weightLabel: '20 pts',
  focusArea: 'Flow Framework & Sustainable Engineering Ratio',
  options: [
    {
      value: 0,
      level: 0,
      label: 'Dedicated 20%+ Capacity Reserved',
      description: 'Dedicated 20%+ engineering capacity reserved for tech debt, platform health & reliability.',
      criteria: 'Refactoring tickets consistently scheduled; defect carryover is low.',
    },
    {
      value: 7,
      level: 1,
      label: 'Continuous Refactoring in Sprints',
      description: 'Continuous refactoring baked into normal sprint cycles with quarterly hardening milestones.',
      criteria: 'Automated test coverage > 75%; architecture maintained proactively.',
    },
    {
      value: 14,
      level: 2,
      label: 'Tech Debt Continuously Deprioritized',
      description: 'Tech debt acknowledged but continuously deprioritized to hit aggressive sales release dates.',
      criteria: 'Refactoring tickets deferred > 6 months; core code becoming increasingly brittle.',
    },
    {
      value: 20,
      level: 3,
      label: 'Critical Architectural Bankruptcy',
      description: 'Critical architectural bankruptcy; outages during routine deployments; fear of modifying code.',
      criteria: 'Bugs outnumber feature tickets; >50% of engineering capacity consumed by hotfixes.',
    },
  ],
};

export const PRODUCT_G5: DimensionDef<0 | 5 | 10 | 15> = {
  code: 'G5',
  name: 'Regulatory, Privacy & Platform Compliance',
  category: 'gov',
  maxPoints: 15,
  weightLabel: '15 pts',
  focusArea: 'Data Privacy & Automated Governance',
  options: [
    {
      value: 0,
      level: 0,
      label: 'Privacy-by-Design & Automated Gates',
      description: 'Privacy-by-design & automated compliance checks integrated directly in CI/CD pipeline.',
      criteria: 'Automated SAST/DAST security scanning; zero compliance release bottlenecks.',
    },
    {
      value: 5,
      level: 1,
      label: 'Standard Compliance Review Gate',
      description: 'Standard legal/compliance gate prior to major releases with predictable sign-off criteria.',
      criteria: 'Security and compliance reviews completed within standard sprint cadences.',
    },
    {
      value: 10,
      level: 2,
      label: 'Manual Compliance Bottlenecks',
      description: 'Manual compliance bottlenecks; fear-driven security delays; siloed audit bureaucracy.',
      criteria: 'Releases held up for weeks in legal/compliance review queues.',
    },
    {
      value: 15,
      level: 3,
      label: 'Severe Compliance Blindspots',
      description: 'Severe compliance blindspots; un-sanitized customer data; imminent risk of regulatory halt.',
      criteria: 'Audit findings unaddressed; customer PII exposed without encryption or audit trail.',
    },
  ],
};

export const PRODUCT_P1: DimensionDef<0 | 8 | 16 | 25> = {
  code: 'P1',
  name: 'Cohort Retention & Churn Dynamics',
  category: 'del',
  maxPoints: 25,
  weightLabel: '25 pts',
  focusArea: 'Retention Curve Flattening & Organic Traction',
  options: [
    {
      value: 0,
      level: 0,
      label: 'Flattened Smiling Retention Curve',
      description: 'Flattening/smiling retention curve; net negative revenue churn; strong organic habituation.',
      criteria: 'Day 90 B2B cohort retention flattens >= 40%; expansion revenue offsets churn.',
    },
    {
      value: 8,
      level: 1,
      label: 'Stable Baseline Retention',
      description: 'Stable retention matching industry baseline; manageable churn with clear customer value.',
      criteria: 'Day 90 retention flattens in 25–39% corridor; annual logo renewal > 80%.',
    },
    {
      value: 16,
      level: 2,
      label: 'Persistent Downward Churn Slope',
      description: 'Downward retention slope; leaky-bucket growth masked by continuous paid ad marketing.',
      criteria: 'Day 90 retention < 20% with persistent negative slope; users abandon after onboarding.',
    },
    {
      value: 25,
      level: 3,
      label: 'Catastrophic Leaky Bucket Churn',
      description: 'Catastrophic churn (>5% monthly logo churn); users abandon after onboarding; zero long-term retention.',
      criteria: 'Day 30 retention < 5%; cohorts decay straight to zero; growth entirely subsidized by ad spend.',
    },
  ],
};

export const PRODUCT_P2: DimensionDef<0 | 7 | 13 | 20> = {
  code: 'P2',
  name: 'Cycle Time from Discovery to Value Release',
  category: 'del',
  maxPoints: 20,
  weightLabel: '20 pts',
  focusArea: 'DORA Velocity & Build-Measure-Learn Feedback',
  options: [
    {
      value: 0,
      level: 0,
      label: 'Continuous Deployment (<2 Weeks)',
      description: 'Continuous deployment; idea-to-customer feedback loop in < 2 weeks via feature flags.',
      criteria: 'Lead time for changes < 1 day; deployments on demand multiple times per week.',
    },
    {
      value: 7,
      level: 1,
      label: 'Bi-Weekly Releases with Telemetry',
      description: 'Bi-weekly releases with quantitative telemetry feedback and structured sprint reviews.',
      criteria: 'Lead time for changes 1-2 weeks; deployment frequency bi-weekly.',
    },
    {
      value: 13,
      level: 2,
      label: '2–3 Month Batch Releases',
      description: '2-3 month release cycles; batch deployments; slow feedback loops and manual QA testing.',
      criteria: 'Lead time for changes 1-3 months; deployments bundled into large quarterly trains.',
    },
    {
      value: 20,
      level: 3,
      label: 'Feature Factory Stalemate (>6 Mos)',
      description: 'Feature factory stalemate; releases take >6 months with zero user feedback or validation.',
      criteria: 'Deployment requires change advisory board approvals, freezes, and multi-week rollbacks.',
    },
  ],
};

export const PRODUCT_P3: DimensionDef<0 | 7 | 14 | 20> = {
  code: 'P3',
  name: 'Unit Economics & Capital Efficiency (LTV/CAC)',
  category: 'del',
  maxPoints: 20,
  weightLabel: '20 pts',
  focusArea: 'Unit Economics & Capital Payback',
  options: [
    {
      value: 0,
      level: 0,
      label: 'LTV/CAC > 3.5 (Payback < 12 Mos)',
      description: 'LTV/CAC > 3.5; payback period < 12 months; strong viral pull and organic word-of-mouth.',
      criteria: 'Organic referral K-factor > 0.4; gross software margin >= 80%.',
    },
    {
      value: 7,
      level: 1,
      label: 'Sustainable Unit Economics (~2.5–3.0)',
      description: 'LTV/CAC ~ 2.5–3.0; sustainable unit economics supported by predictable inbound channels.',
      criteria: 'Payback period 12–18 months; software gross margin 70–79%.',
    },
    {
      value: 14,
      level: 2,
      label: 'Subsidized Unit Economics (<1.5)',
      description: 'LTV/CAC < 1.5; acquisition costs eating operational margin; paid marketing dependency.',
      criteria: 'Payback period > 24 months; gross margin degrading due to cloud or support overhead.',
    },
    {
      value: 20,
      level: 3,
      label: 'Negative Gross Margins',
      description: 'Negative gross margins; product loses money on every incremental user; capital drain.',
      criteria: 'Cloud computing, API inference, and support costs exceed customer subscription fees.',
    },
  ],
};

export const PRODUCT_P4: DimensionDef<0 | 7 | 14 | 20> = {
  code: 'P4',
  name: 'Product Telemetry & Quantitative Observability',
  category: 'del',
  maxPoints: 20,
  weightLabel: '20 pts',
  focusArea: 'Behavioral Analytics & Instrumentation',
  options: [
    {
      value: 0,
      level: 0,
      label: 'Complete Event Telemetry',
      description: 'Complete event telemetry (Mixpanel/PostHog/Datadog) explicitly tied to business outcomes.',
      criteria: 'Real-time cohort retention dashboards, conversion funnels, and error telemetry active.',
    },
    {
      value: 7,
      level: 1,
      label: 'Standard Funnel Analytics',
      description: 'Standard analytics on core funnels; qualitative interviews conducted regularly.',
      criteria: 'Core onboarding and activation events tracked with monthly behavioral reviews.',
    },
    {
      value: 14,
      level: 2,
      label: 'Gaps in Funnel Tracking',
      description: 'Gaps in funnel tracking; decisions based primarily on anecdotal stakeholder feedback.',
      criteria: 'Product team cannot answer core DAU/MAU ratios or exact drop-off steps in onboarding.',
    },
    {
      value: 20,
      level: 3,
      label: 'Blind Cockpit (Zero Telemetry)',
      description: 'Blind cockpit; no telemetry on user behavior; crashes and drop-offs completely unmonitored.',
      criteria: 'Zero product analytics installed; team relies on user support tickets to discover outages.',
    },
  ],
};

export const PRODUCT_P5: DimensionDef<0 | 5 | 10 | 15> = {
  code: 'P5',
  name: 'Team Flow & Cognitive Context Switching',
  category: 'del',
  maxPoints: 15,
  weightLabel: '15 pts',
  focusArea: 'Stream-Aligned Autonomy & Team Focus',
  options: [
    {
      value: 0,
      level: 0,
      label: 'Deep Work Focus (1 Initiative)',
      description: 'Deep work focus; single product initiative per engineer; autonomous stream-aligned team.',
      criteria: 'Lead time from commit to prod < 2 hours; zero cross-team blocking tickets.',
    },
    {
      value: 5,
      level: 1,
      label: 'Manageable Multitasking (Max 2)',
      description: 'Manageable multitasking (max 2 parallel initiatives); clear sprint boundaries.',
      criteria: 'Minimal dependency handoffs; cross-team blockers resolved within 2 business days.',
    },
    {
      value: 10,
      level: 2,
      label: 'Chronic Context Switching',
      description: 'Chronic context switching; teams split across multiple clients, maintenance, and projects.',
      criteria: 'Cross-team dependency blockers logged in >40% of sprint tasks; release coordination meetings.',
    },
    {
      value: 15,
      level: 3,
      label: 'Severe Burnout & Gridlock',
      description: 'Severe burnout; key engineer departures; delivery paralysis; horizontal silo gridlock.',
      criteria: 'Developers work on 4+ unrelated codebases weekly; velocity drops to near zero.',
    },
  ],
};

// ==========================================
// C. SCORING & EVALUATION DATA MODELS
// ==========================================

export interface ProjectScores {
  d1: 0 | 8 | 16 | 25;
  d2: 0 | 7 | 13 | 20;
  d3: 0 | 7 | 14 | 20;
  d4: 0 | 7 | 14 | 20;
  d5: 0 | 5 | 10 | 15;
  o1: 0 | 8 | 16 | 25;
  o2: 0 | 7 | 13 | 20;
  o3: 0 | 7 | 14 | 20;
  o4: 0 | 7 | 14 | 20;
  o5: 0 | 5 | 10 | 15;
}

export interface ProductScores {
  g1: 0 | 8 | 16 | 25;
  g2: 0 | 7 | 13 | 20;
  g3: 0 | 7 | 14 | 20;
  g4: 0 | 7 | 14 | 20;
  g5: 0 | 5 | 10 | 15;
  p1: 0 | 8 | 16 | 25;
  p2: 0 | 7 | 13 | 20;
  p3: 0 | 7 | 14 | 20;
  p4: 0 | 7 | 14 | 20;
  p5: 0 | 5 | 10 | 15;
}

export interface QuadrantDetails {
  id: 'Q1' | 'Q2' | 'Q3' | 'Q4';
  name: string;
  badgeClass: string;
  hexColor: string;
  themeColor: string;
  urgency: 'CRITICAL' | 'HIGH' | 'STABLE' | 'MODERATE';
  description: string;
  clinicalAction: string;
}

export interface DualModeEvaluation {
  mode: GovernanceMode;
  phase: string;
  phaseName: string;
  govAxisName: string;
  delAxisName: string;
  rawGov: number;
  govPenalty: number;
  totalGov: number;
  rawDel: number;
  delPenalty: number;
  totalDel: number;
  quadrant: QuadrantDetails;
  penaltyActive: boolean;
  penaltyMessage: string | null;
  bufferZone: {
    active: boolean;
    explanation: string;
  };
  dimensionBreakdown: {
    code: string;
    name: string;
    category: 'gov' | 'del';
    value: number;
    max: number;
    normPercent: number;
  }[];
  immediate72HourReset: {
    title: string;
    action: string;
    deliverable: string;
  };
}

export function getDefaultProjectScores(): ProjectScores {
  return {
    d1: 8,
    d2: 7,
    d3: 7,
    d4: 7,
    d5: 5,
    o1: 8,
    o2: 7,
    o3: 7,
    o4: 7,
    o5: 5,
  };
}

export function getDefaultProductScores(): ProductScores {
  return {
    g1: 8,
    g2: 7,
    g3: 7,
    g4: 7,
    g5: 5,
    p1: 8,
    p2: 7,
    p3: 7,
    p4: 7,
    p5: 5,
  };
}

export function calculateDualModeDGRF(
  mode: GovernanceMode,
  phaseId: string,
  projectScores: ProjectScores,
  productScores: ProductScores
): DualModeEvaluation {
  if (mode === 'project') {
    const rawGov =
      projectScores.d1 +
      projectScores.d2 +
      projectScores.d3 +
      projectScores.d4 +
      projectScores.d5;

    // Project Penalty Engine:
    // If (D1 === 25 && D2 >= 13) { PrjGov = Math.min(100, rawPrjGov + 10); }
    const penaltyActive = projectScores.d1 === 25 && projectScores.d2 >= 13;
    const govPenalty = penaltyActive ? 10 : 0;
    const totalGov = Math.min(100, rawGov + govPenalty);

    const rawDel =
      projectScores.o1 +
      projectScores.o2 +
      projectScores.o3 +
      projectScores.o4 +
      projectScores.o5;
    const delPenalty = 0;
    const totalDel = Math.min(100, rawDel);

    // Quadrant logic
    let qId: 'Q1' | 'Q2' | 'Q3' | 'Q4' = 'Q3';
    if (totalGov > 50 && totalDel > 50) {
      qId = 'Q1';
    } else if (totalGov > 50 && totalDel <= 50) {
      qId = 'Q2';
    } else if (totalGov <= 50 && totalDel <= 50) {
      qId = 'Q3';
    } else {
      qId = 'Q4';
    }

    const quadrantMap: Record<'Q1' | 'Q2' | 'Q3' | 'Q4', QuadrantDetails> = {
      Q1: {
        id: 'Q1',
        name: 'Systemic Fragility',
        badgeClass: 'bg-rose-500/15 text-rose-400 border-rose-500/30',
        hexColor: '#EF4444',
        themeColor: '#ef4444',
        urgency: 'CRITICAL',
        description: 'Multi-Vector Collapse: Paralyzed governance combined with runaway schedule and defect decay.',
        clinicalAction: '72-Hour Capital Freeze & Immediate Steering Committee Restructuring.',
      },
      Q2: {
        id: 'Q2',
        name: 'Fragile Governance',
        badgeClass: 'bg-amber-500/15 text-amber-400 border-amber-500/30',
        hexColor: '#F59E0B',
        themeColor: '#f59e0b',
        urgency: 'HIGH',
        description: 'Decoupled Governance Vulnerability: Heroic engineering temporarily insulating toxic procurement or sponsor vacuum.',
        clinicalAction: 'Lock Scope Intake & Re-anchor Single-Threaded Executive Sponsor.',
      },
      Q3: {
        id: 'Q3',
        name: 'Resilient Equilibrium',
        badgeClass: 'bg-emerald-500/15 text-emerald-400 border-emerald-500/30',
        hexColor: '#10B981',
        themeColor: '#10b981',
        urgency: 'STABLE',
        description: 'Lighthouse Target Operating Model: Empowered mandate, outcome-aligned contract, and predictable delivery velocity.',
        clinicalAction: 'Defend Team Autonomy & Maintain Zero-Sum Scope Control.',
      },
      Q4: {
        id: 'Q4',
        name: 'Execution Constraint',
        badgeClass: 'bg-sky-500/15 text-sky-400 border-sky-500/30',
        hexColor: '#0EA5E9',
        themeColor: '#0ea5e9',
        urgency: 'MODERATE',
        description: 'Operational Delivery Bottleneck: Sound governance charter blocked by testing bottlenecks or technical debt.',
        clinicalAction: 'Inject Engineering Capacity (Slash WIP by 40%; Do NOT Add PMO Overhead).',
      },
    };

    const phaseObj = PROJECT_PHASES.find((p) => p.id === phaseId) || PROJECT_PHASES[0];

    const bufferActive =
      (totalGov >= 40 && totalGov <= 60) || (totalDel >= 40 && totalDel <= 60);

    const dimensionBreakdown = [
      { code: 'D1', name: 'Authority', category: 'gov' as const, value: projectScores.d1, max: 25, normPercent: (projectScores.d1 / 25) * 100 },
      { code: 'D2', name: 'Procurement', category: 'gov' as const, value: projectScores.d2, max: 20, normPercent: (projectScores.d2 / 20) * 100 },
      { code: 'D3', name: 'Scope CCB', category: 'gov' as const, value: projectScores.d3, max: 20, normPercent: (projectScores.d3 / 20) * 100 },
      { code: 'D4', name: 'Contingency', category: 'gov' as const, value: projectScores.d4, max: 20, normPercent: (projectScores.d4 / 20) * 100 },
      { code: 'D5', name: 'Architecture', category: 'gov' as const, value: projectScores.d5, max: 15, normPercent: (projectScores.d5 / 15) * 100 },
      { code: 'O1', name: 'Schedule', category: 'del' as const, value: projectScores.o1, max: 25, normPercent: (projectScores.o1 / 25) * 100 },
      { code: 'O2', name: 'Burn (CPI)', category: 'del' as const, value: projectScores.o2, max: 20, normPercent: (projectScores.o2 / 20) * 100 },
      { code: 'O3', name: 'Defect Churn', category: 'del' as const, value: projectScores.o3, max: 20, normPercent: (projectScores.o3 / 20) * 100 },
      { code: 'O4', name: 'Morale', category: 'del' as const, value: projectScores.o4, max: 20, normPercent: (projectScores.o4 / 20) * 100 },
      { code: 'O5', name: 'Candor', category: 'del' as const, value: projectScores.o5, max: 15, normPercent: (projectScores.o5 / 15) * 100 },
    ];

    return {
      mode: 'project',
      phase: phaseObj.id,
      phaseName: phaseObj.name,
      govAxisName: 'Structural Governance (PrjGov)',
      delAxisName: 'Operational Delivery (PrjDel)',
      rawGov,
      govPenalty,
      totalGov,
      rawDel,
      delPenalty,
      totalDel,
      quadrant: quadrantMap[qId],
      penaltyActive,
      penaltyMessage: penaltyActive
        ? 'D1=25 (Absentee Mandate) combined with D2>=13 (Adversarial Procurement) activates the +10 Nonlinear Interaction Penalty on PrjGov.'
        : null,
      bufferZone: {
        active: bufferActive,
        explanation: bufferActive
          ? 'Score falls within the metastable [40, 60] buffer zone. Qualitative audit recommended.'
          : 'Scores reside outside the transitional buffer zone corridor.',
      },
      dimensionBreakdown,
      immediate72HourReset: {
        title: 'Project Governance 72-Hour Reset Directive',
        action:
          qId === 'Q1'
            ? 'Issue immediate 72-Hour Capital Freeze & dissolve multi-stakeholder consensus committee.'
            : qId === 'Q2'
            ? 'Lock scope intake; establish formal zero-sum CCB with unilateral sponsor sign-off.'
            : qId === 'Q4'
            ? 'Slash Work-In-Progress by 40%; suspend non-critical status meetings to automate test CI/CD.'
            : 'Protect team charter and lock in long-term key architecture retention packages.',
        deliverable:
          qId === 'Q1'
            ? 'Single turnaround officer charter with exclusive budget veto authority.'
            : qId === 'Q2'
            ? 'Backlog intake freeze memorandum signed by C-level sponsor.'
            : qId === 'Q4'
            ? 'Automated test regression pipeline audit & senior technical lead onboarding plan.'
            : 'Executive status brief confirming predictable delivery milestones.',
      },
    };
  }

  // ==========================================
  // PRODUCT MODE EVALUATION
  // ==========================================
  const rawGov =
    productScores.g1 +
    productScores.g2 +
    productScores.g3 +
    productScores.g4 +
    productScores.g5;
  const govPenalty = 0;
  const totalGov = Math.min(100, rawGov);

  const rawDel =
    productScores.p1 +
    productScores.p2 +
    productScores.p3 +
    productScores.p4 +
    productScores.p5;

  // Product Penalty Engine:
  // If (P1 === 25 && P4 >= 14) { PrdDel = Math.min(100, rawPrdDel + 12); } // Blind Leaky Bucket Penalty
  const penaltyActive = productScores.p1 === 25 && productScores.p4 >= 14;
  const delPenalty = penaltyActive ? 12 : 0;
  const totalDel = Math.min(100, rawDel + delPenalty);

  // Quadrant logic
  let qId: 'Q1' | 'Q2' | 'Q3' | 'Q4' = 'Q3';
  if (totalGov > 50 && totalDel > 50) {
    qId = 'Q1';
  } else if (totalGov > 50 && totalDel <= 50) {
    qId = 'Q2';
  } else if (totalGov <= 50 && totalDel <= 50) {
    qId = 'Q3';
  } else {
    qId = 'Q4';
  }

  const quadrantMap: Record<'Q1' | 'Q2' | 'Q3' | 'Q4', QuadrantDetails> = {
    Q1: {
      id: 'Q1',
      name: 'Death Spiral',
      badgeClass: 'bg-rose-500/15 text-rose-400 border-rose-500/30',
      hexColor: '#EF4444',
      themeColor: '#ef4444',
      urgency: 'CRITICAL',
      description: 'Terminal Irrelevance: Executive HiPPO-driven feature factory combined with catastrophic cohort churn and blind telemetry.',
      clinicalAction: 'Immediate Feature Freeze & Strategic Pivot / Sunset Audit.',
    },
    Q2: {
      id: 'Q2',
      name: 'Zombie Product',
      badgeClass: 'bg-amber-500/15 text-amber-400 border-amber-500/30',
      hexColor: '#F59E0B',
      themeColor: '#f59e0b',
      urgency: 'HIGH',
      description: 'Feature Factory Trap: High delivery velocity and code output, but zero customer discovery; features go completely unused.',
      clinicalAction: 'Abolish Output Roadmaps & Mandate Weekly Continuous Customer Discovery.',
    },
    Q3: {
      id: 'Q3',
      name: 'Product-Led Engine',
      badgeClass: 'bg-emerald-500/15 text-emerald-400 border-emerald-500/30',
      hexColor: '#10B981',
      themeColor: '#10b981',
      urgency: 'STABLE',
      description: 'Scalable Discovery Engine: Autonomous Product Trios, flattening retention curves, deep quantitative telemetry, and healthy unit economics.',
      clinicalAction: 'Scale Footprint & Insulate Trios from Executive Bureaucracy.',
    },
    Q4: {
      id: 'Q4',
      name: 'Platform Bottleneck',
      badgeClass: 'bg-sky-500/15 text-sky-400 border-sky-500/30',
      hexColor: '#0EA5E9',
      themeColor: '#0ea5e9',
      urgency: 'MODERATE',
      description: 'Technical Debt Obstacle: Strong user empathy and problem validation, but flow choked by legacy architecture, compliance, or release bureaucracy.',
      clinicalAction: 'Dedicate 40% Capacity to Architectural Refactoring & CI/CD Automation.',
    },
  };

  const phaseObj = PRODUCT_PHASES.find((p) => p.id === phaseId) || PRODUCT_PHASES[0];

  const bufferActive =
    (totalGov >= 40 && totalGov <= 60) || (totalDel >= 40 && totalDel <= 60);

  const dimensionBreakdown = [
    { code: 'G1', name: 'Vision', category: 'gov' as const, value: productScores.g1, max: 25, normPercent: (productScores.g1 / 25) * 100 },
    { code: 'G2', name: 'Capital', category: 'gov' as const, value: productScores.g2, max: 20, normPercent: (productScores.g2 / 20) * 100 },
    { code: 'G3', name: 'Autonomy', category: 'gov' as const, value: productScores.g3, max: 20, normPercent: (productScores.g3 / 20) * 100 },
    { code: 'G4', name: 'Tech Debt', category: 'gov' as const, value: productScores.g4, max: 20, normPercent: (productScores.g4 / 20) * 100 },
    { code: 'G5', name: 'Compliance', category: 'gov' as const, value: productScores.g5, max: 15, normPercent: (productScores.g5 / 15) * 100 },
    { code: 'P1', name: 'Retention', category: 'del' as const, value: productScores.p1, max: 25, normPercent: (productScores.p1 / 25) * 100 },
    { code: 'P2', name: 'Cycle Time', category: 'del' as const, value: productScores.p2, max: 20, normPercent: (productScores.p2 / 20) * 100 },
    { code: 'P3', name: 'LTV/CAC', category: 'del' as const, value: productScores.p3, max: 20, normPercent: (productScores.p3 / 20) * 100 },
    { code: 'P4', name: 'Telemetry', category: 'del' as const, value: productScores.p4, max: 20, normPercent: (productScores.p4 / 20) * 100 },
    { code: 'P5', name: 'Flow', category: 'del' as const, value: productScores.p5, max: 15, normPercent: (productScores.p5 / 15) * 100 },
  ];

  return {
    mode: 'product',
    phase: phaseObj.id,
    phaseName: phaseObj.name,
    govAxisName: 'Strategic Product Governance (PrdGov)',
    delAxisName: 'Operational Traction & Flow (PrdDel)',
    rawGov,
    govPenalty,
    totalGov,
    rawDel,
    delPenalty,
    totalDel,
    quadrant: quadrantMap[qId],
    penaltyActive,
    penaltyMessage: penaltyActive
      ? 'P1=25 (Catastrophic Churn) combined with P4>=14 (Blind Telemetry) triggers the +12 Blind Leaky Bucket Penalty on PrdDel.'
      : null,
    bufferZone: {
      active: bufferActive,
      explanation: bufferActive
        ? 'Product score resides within the metastable [40, 60] transition zone. Cohort audit required.'
        : 'Scores reside outside the transitional buffer zone corridor.',
    },
    dimensionBreakdown,
    immediate72HourReset: {
      title: 'Digital Product 72-Hour Turnaround Directive',
      action:
        qId === 'Q1'
          ? 'Cease all paid marketing and new feature delivery; interview 10 churning accounts within 72 hours.'
          : qId === 'Q2'
          ? 'Abolish the output feature roadmap; transition PMs from backlog grooming to user problem discovery.'
          : qId === 'Q4'
          ? 'Allocate 40% of upcoming sprint capacity to platform refactoring and deployment automation.'
          : 'Protect empowered Product Trios from executive reorganizations and bespoke sales feature traps.',
      deliverable:
        qId === 'Q1'
          ? 'Churn pathology report and decision memorandum on strategic pivot vs graceful sunset.'
          : qId === 'Q2'
          ? 'Opportunity Solution Tree (OST) and weekly customer interview schedule.'
          : qId === 'Q4'
          ? 'Platform debt refactoring roadmap and automated CI/CD canary deployment plan.'
          : 'Product North Star scorecard tracking net negative revenue churn.',
    },
  };
}
