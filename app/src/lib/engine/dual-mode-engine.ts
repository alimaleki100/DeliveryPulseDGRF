/**
 * DeliveryPulse — DGRF Dual-Mode Diagnostic Engine (Project & Product)
 * 
 * Implements:
 * - Step 1: Governance Mode Selection ('project' | 'product')
 * - Step 2: Lifecycle Phase Calibration (Dynamic 2 Project Phases vs. 3 Product Phases)
 * - Step 3: Interactive Questionnaires (Dynamic Re-routing per Phase)
 * - Step 4: Real-Time Calculation & Nonlinear Penalty Engines:
 *   Project Penalty: If (D1 === 25 && D2 >= 13) { PrjGov = Math.min(100, rawPrjGov + 10); }
 *   Product Penalty:
 *     Discovery: If (P1 === 25 && P3 >= 14) { PrdDel = Math.min(100, rawPrdDel + 12); }
 *     PMF: If (P1 === 25 && P4 >= 14) { PrdDel = Math.min(100, rawPrdDel + 12); } // Blind Leaky Bucket
 *     Scale: If (P1 === 25 && P3 >= 14) { PrdDel = Math.min(100, rawPrdDel + 12); }
 * 
 * Quadrants:
 * - Project: Q1: Systemic Fragility | Q2: Fragile Governance | Q3: Resilient Equilibrium | Q4: Execution Constraint
 * - Product: Q1: Death Spiral | Q2: Zombie Product | Q3: Product-Led Engine | Q4: Platform Bottleneck
 * 
 * Author: Ali Maleki (MBA, PMP)
 */

export type GovernanceMode = 'project' | 'product';

export type ProjectPhase = 'preflight' | 'live';

export type ProductPhase = 'discovery' | 'pmf' | 'scale';

export interface PhaseDefinition {
  id: string;
  name: string;
  subtitle: string;
  focus: string;
}

export const PROJECT_PHASES: PhaseDefinition[] = [
  {
    id: 'preflight',
    name: 'Pre-Flight Scoping (PrjPreFlight)',
    subtitle: 'Phase 0',
    focus: 'Mandate clarity, vendor contracting structure, baseline ring-fencing, and architectural boundary definition before major capital commitment.',
  },
  {
    id: 'live',
    name: 'In-Flight / Live Delivery (PrjLive)',
    subtitle: 'Active Delivery',
    focus: 'Observed change discipline, schedule & burn drift, regression defects, and stakeholder friction during active delivery.',
  },
];

export const PRODUCT_PHASES: PhaseDefinition[] = [
  {
    id: 'discovery',
    name: 'Phase 1: Discovery & 0-to-1 Validation',
    subtitle: 'Phase 1',
    focus: 'Problem-solution validation, customer interview cadence, pivot speed, and assumption-to-evidence ratio.',
  },
  {
    id: 'pmf',
    name: 'Phase 2: Product-Market Fit (PMF) & Retention',
    subtitle: 'Phase 2',
    focus: 'Cohort retention curves, core funnel activation, user churn, and value stickiness before scaling.',
  },
  {
    id: 'scale',
    name: 'Phase 3: Scale & Expansion',
    subtitle: 'Phase 3',
    focus: 'Unit economics (LTV/CAC), CI/CD lead time, multi-team cognitive load, and architectural scalability.',
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

// =========================================================================
// 1. ENTERPRISE PROJECT MODE: PART 1 STRUCTURAL GOVERNANCE (PrjGov, D1–D5)
// =========================================================================

export const PROJECT_D1: DimensionDef<0 | 8 | 16 | 25> = {
  code: 'D1',
  name: 'Decision Authority & Executive Mandate',
  category: 'gov',
  maxPoints: 25,
  weightLabel: '25 pts',
  focusArea: 'Sponsorship & Decision Latency',
  options: [
    {
      value: 0,
      level: 0,
      label: 'Single Accountable Executive',
      description: 'Single accountable executive with full budget and unilateral veto power.',
      criteria: 'Weekly steering cadence with immediate decision turnaround on all escalated blockers.',
    },
    {
      value: 8,
      level: 1,
      label: 'Clear Sponsor with Escalation Cadence',
      description: 'Clear sponsor, weekly cadence, structured escalation pathways with documented sign-offs.',
      criteria: 'Decisions resolved within 3-5 business days; minor cross-functional consensus friction.',
    },
    {
      value: 16,
      level: 2,
      label: 'Steering Committee / Diffuse Authority',
      description: 'Steering committee with diffuse accountability; deferred decisions and political compromise.',
      criteria: 'Decisions require multi-departmental consensus; critical blockers delayed by >2 weeks.',
    },
    {
      value: 25,
      level: 3,
      label: 'Absentee / Paralyzed Sponsor',
      description: 'Absent or paralyzed sponsor; multi-committee gridlock; rogue unilateral team decisions.',
      criteria: 'Steering meetings canceled; no single authority can approve scope changes or release contingency.',
    },
  ],
};

export const PROJECT_D2: DimensionDef<0 | 7 | 13 | 20> = {
  code: 'D2',
  name: 'Procurement Architecture & Vendor Risk Allocation',
  category: 'gov',
  maxPoints: 20,
  weightLabel: '20 pts',
  focusArea: 'Contract Structure & Vendor Alignment',
  options: [
    {
      value: 0,
      level: 0,
      label: 'Outcome-Aligned / Shared-Risk Contract',
      description: 'Outcome-aligned / shared-risk milestone contract with escrowed performance deliverables.',
      criteria: 'Vendor margin tied directly to working production capabilities and acceptance criteria.',
    },
    {
      value: 7,
      level: 1,
      label: 'Capped T&M with Quality Gates',
      description: 'Capped Time & Materials with strict quality gate sign-offs and clear milestone thresholds.',
      criteria: 'Not-to-exceed ceiling with mandatory architectural reviews before billing increments.',
    },
    {
      value: 13,
      level: 2,
      label: 'Open T&M Without Scope Ceiling',
      description: 'Time & Materials without scope ceiling; vendor friction and misaligned commercial incentives.',
      criteria: 'Invoicing based solely on developer hours logged rather than verified software deliverables.',
    },
    {
      value: 20,
      level: 3,
      label: 'Adversarial Cost-Plus / Uncapped Drag',
      description: 'Cost-plus or open T&M; vendor profit incentive tied directly to delays and scope churn.',
      criteria: 'Active legal disputes over change requests; vendor withholding key IP or senior resources.',
    },
  ],
};

export const PROJECT_D3: DimensionDef<0 | 7 | 14 | 20> = {
  code: 'D3',
  name: 'Scope Governance & Baseline Integrity',
  category: 'gov',
  maxPoints: 20,
  weightLabel: '20 pts',
  focusArea: 'Change Control & Scope Baseline',
  options: [
    {
      value: 0,
      level: 0,
      label: 'Zero-Sum Trade-off Governance',
      description: 'Zero-sum trade-off governance; formal gate for any scope addition requiring scope deletion.',
      criteria: 'Every new feature addition requires equal descoping or explicit sponsor budget release.',
    },
    {
      value: 7,
      level: 1,
      label: 'Impact Verification Required',
      description: 'Impact verification required before change acceptance; documented cost/schedule modeling.',
      criteria: 'CCB meets bi-weekly; proposed changes analyzed for critical path impact before approval.',
    },
    {
      value: 14,
      level: 2,
      label: 'Permissive Change Control',
      description: 'Permissive change control; scope creep masked as refinement or user story elaboration.',
      criteria: 'Backlog grows unbounded; sprint commitments broken to accommodate mid-flight requests.',
    },
    {
      value: 20,
      level: 3,
      label: 'Uncontrolled Backdoor Creep',
      description: 'Uncontrolled backdoor creep; political feature insertions directly from stakeholders without budget.',
      criteria: 'No baseline exists; engineering accepts direct offline tasks from executive sponsors.',
    },
  ],
};

export const PROJECT_D4: DimensionDef<0 | 7 | 14 | 20> = {
  code: 'D4',
  name: 'Contingency & Reserve Governance',
  category: 'gov',
  maxPoints: 20,
  weightLabel: '20 pts',
  focusArea: 'Financial Reserves & Risk Absorption',
  options: [
    {
      value: 0,
      level: 0,
      label: 'Ring-Fenced Reserve (>20%)',
      description: 'Ring-fenced reserve (>20%) controlled solely by sponsor for risk mitigation.',
      criteria: 'Dedicated financial buffer explicitly allocated for known unknowns and technical volatility.',
    },
    {
      value: 7,
      level: 1,
      label: 'Standard Reserve (10–15%)',
      description: 'Standard reserve (10–15%) with planned drawdowns and structured release criteria.',
      criteria: 'Reserve tracked against program risk register with periodic actuarial reviews.',
    },
    {
      value: 14,
      level: 2,
      label: 'Depleted Reserve (<5%)',
      description: 'Depleted reserve (<5%); emergency requests needed for unexpected operational blockers.',
      criteria: 'Contingency spent on early baseline errors; zero absorption capacity remaining.',
    },
    {
      value: 20,
      level: 3,
      label: 'Zero Buffer / Optimistic Budgeting',
      description: 'Zero buffer; optimistic budgeting; zero contingency absorption capacity.',
      criteria: 'Budget assumes 100% ideal conditions; any technical defect causes immediate financial overrun.',
    },
  ],
};

export const PROJECT_D5: DimensionDef<0 | 5 | 10 | 15> = {
  code: 'D5',
  name: 'Architectural Complexity & Legacy Drag',
  category: 'gov',
  maxPoints: 15,
  weightLabel: '15 pts',
  focusArea: 'System Coupling & Technical Architecture',
  options: [
    {
      value: 0,
      level: 0,
      label: 'Decoupled Modular Architecture',
      description: 'Decoupled modular services; isolated interfaces with clear API contracts.',
      criteria: 'Components can be built, tested, and deployed independently without lockstep coordination.',
    },
    {
      value: 5,
      level: 1,
      label: 'Bounded Monolith with Clean APIs',
      description: 'Bounded monolith; clean integration points with documented interface specifications.',
      criteria: 'Controlled dependencies; well-structured schema boundaries with minimal cross-service leaking.',
    },
    {
      value: 10,
      level: 2,
      label: 'Synchronous Legacy Dependencies',
      description: 'Synchronous legacy dependencies; cross-system blocking during integration testing.',
      criteria: 'Testing blocked waiting for mainframe/legacy system availability; brittle shared staging environments.',
    },
    {
      value: 15,
      level: 3,
      label: 'Undocumented Spaghetti Monolith',
      description: 'Undocumented spaghetti monolith; high coupling; brittle shared databases and zero isolation.',
      criteria: 'Any code change in module A triggers unpredictable regression outages in unrelated module B.',
    },
  ],
};

// =========================================================================
// 2. ENTERPRISE PROJECT MODE: PART 2 OPERATIONAL DELIVERY (PrjDel)
// =========================================================================

// A. PRE-FLIGHT SCOPING (PrjPreFlight P1–P5)
export const PROJECT_PREFLIGHT_P1: DimensionDef<0 | 8 | 16 | 25> = {
  code: 'P1',
  name: 'Deadline Realism & Estimation Rigor',
  category: 'del',
  maxPoints: 25,
  weightLabel: '25 pts',
  focusArea: 'Planning Fallacy & Reference Class Forecasting',
  options: [
    {
      value: 0,
      level: 0,
      label: 'Empirical Probabilistic Estimation',
      description: 'Schedule derived from historical reference class benchmarks and Monte Carlo simulations (P80 confidence).',
      criteria: 'Quantitative Schedule Risk Analysis (QSRA) report with distribution curves and risk-adjusted milestone dates.',
    },
    {
      value: 8,
      level: 1,
      label: 'Parametric Estimation with Benchmarks',
      description: 'Schedule built using standardized work breakdown structures (WBS) and verified organizational velocity benchmarks.',
      criteria: 'Documented bottom-up WBS cross-referenced against >= 3 comparable organizational deliveries.',
    },
    {
      value: 16,
      level: 2,
      label: 'Optimistic Expert Consensus',
      description: 'Schedule based on subjective engineer consensus assuming zero external delays and immediate onboarding.',
      criteria: 'High-level Gantt chart without confidence bounds; dependencies assumed parallel with zero float.',
    },
    {
      value: 25,
      level: 3,
      label: 'Mandated Arbitrary Deadline',
      description: 'Target completion date mandated top-down by marketing or C-suite without feasibility review or architecture consultation.',
      criteria: 'Delivery date fixed by public corporate press release prior to scoping or architecture sign-off.',
    },
  ],
};

export const PROJECT_PREFLIGHT_P2: DimensionDef<0 | 7 | 13 | 20> = {
  code: 'P2',
  name: 'Requirement Maturity & Boundary Definition',
  category: 'del',
  maxPoints: 20,
  weightLabel: '20 pts',
  focusArea: 'Boundary Definition & Ambiguity Mitigation',
  options: [
    {
      value: 0,
      level: 0,
      label: 'Quantified Acceptance Criteria',
      description: 'Core functional boundaries explicitly mapped. All critical integrations defined with draft API contracts and NFR SLAs.',
      criteria: 'Formal specification with Given-When-Then criteria; latency, throughput, and security SLAs signed.',
    },
    {
      value: 7,
      level: 1,
      label: 'Detailed User Story Epics',
      description: 'Comprehensive functional backlog with clear user persona boundaries and agreed out-of-scope declarations.',
      criteria: 'Jira/Azure DevOps epic backlog with mapped dependencies and signed business requirement sign-offs.',
    },
    {
      value: 13,
      level: 2,
      label: 'Vague Functional Ambiguity',
      description: 'Requirements written as high-level narrative statements ("seamless user onboarding") without objective criteria.',
      criteria: 'High-level PRD with ambiguous metrics; statements containing "to be determined in sprint 1".',
    },
    {
      value: 20,
      level: 3,
      label: 'Unbounded Conceptual Aspiration',
      description: 'Project exists merely as an idea or pitch deck. Scope boundaries completely undefined; stakeholders disagree on goals.',
      criteria: 'Documentation consists solely of executive presentations; zero functional boundary definitions.',
    },
  ],
};

export const PROJECT_PREFLIGHT_P3: DimensionDef<0 | 7 | 14 | 20> = {
  code: 'P3',
  name: 'Budget Fidelity & Cost Estimation Model',
  category: 'del',
  maxPoints: 20,
  weightLabel: '20 pts',
  focusArea: 'Parametric Cost Modeling & Bidding Rigor',
  options: [
    {
      value: 0,
      level: 0,
      label: 'Independent Cost Estimate (ICE)',
      description: 'Parametric cost modeling with bottom-up engineering validation and independent financial audit.',
      criteria: 'Independent Cost Estimate (ICE) report prepared; vendor bids verified against market averages.',
    },
    {
      value: 7,
      level: 1,
      label: 'Structured Budget Model',
      description: 'Standard estimation with verified vendor rate cards, infrastructure sizing models, and licensing audits.',
      criteria: 'Cost model accounts for developer licenses, staging environments, and integration support costs.',
    },
    {
      value: 14,
      level: 2,
      label: 'Top-Down Capital Allocation',
      description: 'Fixed funding envelope assigned by finance committee without architectural feasibility analysis.',
      criteria: 'Scope forced to fit predetermined budget figure; critical non-functional testing descoped to meet price.',
    },
    {
      value: 20,
      level: 3,
      label: "Winner's Curse Bidding",
      description: 'Selection of lowest unvetted vendor bid with unrealistic cost assumptions to secure budget sign-off.',
      criteria: 'Vendor won via aggressively underpriced bid; clear expectation of aggressive change order claims.',
    },
  ],
};

export const PROJECT_PREFLIGHT_P4: DimensionDef<0 | 7 | 14 | 20> = {
  code: 'P4',
  name: 'Definition of Done & Verification Tooling',
  category: 'del',
  maxPoints: 20,
  weightLabel: '20 pts',
  focusArea: 'Automated Quality Baselines & DoD',
  options: [
    {
      value: 0,
      level: 0,
      label: 'Automated DoD Enforcement',
      description: 'CI/CD test gates, automated regression, and security scanning pre-configured before sprint 1.',
      criteria: 'Definition of Done includes automated code coverage (>80%), SonarQube quality gate, and vulnerability scan.',
    },
    {
      value: 7,
      level: 1,
      label: 'Documented Quality Standards',
      description: 'Clear sign-off criteria and regression thresholds agreed between sponsor and engineering leads.',
      criteria: 'Documented Definition of Ready (DoR) and Definition of Done (DoD) embedded in developer guidelines.',
    },
    {
      value: 14,
      level: 2,
      label: 'Informal Acceptance Gates',
      description: 'Subjective manual sign-offs without automated verification tooling or baseline test environments.',
      criteria: 'No test environments provisioned; quality assurance relies on manual tester walkthroughs.',
    },
    {
      value: 20,
      level: 3,
      label: 'Zero Verification Architecture',
      description: 'No test strategy, no DoD; quality deferred until post-launch UAT or production cutover.',
      criteria: 'Testing planned as a 4-week manual phase at the end of an 18-month waterfall cycle.',
    },
  ],
};

export const PROJECT_PREFLIGHT_P5: DimensionDef<0 | 5 | 10 | 15> = {
  code: 'P5',
  name: 'Dedicated Team & Resource Ring-Fencing',
  category: 'del',
  maxPoints: 15,
  weightLabel: '15 pts',
  focusArea: 'Resource Ring-Fencing vs Phantom Team Fallacy',
  options: [
    {
      value: 0,
      level: 0,
      label: '100% Dedicated Core Team',
      description: 'Key architects and delivery leads ring-fenced exclusively for initiative duration.',
      criteria: 'Named senior staff assigned 100% FTE; sponsor contractually guarantees zero operational poaching.',
    },
    {
      value: 5,
      level: 1,
      label: 'Substantially Dedicated (>80%)',
      description: 'Core team 80%+ dedicated with minimal operational maintenance overlap.',
      criteria: 'Key contributors protected by formal SLA; backfill resources in place for routine support duties.',
    },
    {
      value: 10,
      level: 2,
      label: 'Part-Time Allocation (<50%)',
      description: 'Key contributors split across 3+ parallel enterprise programs with competing priorities.',
      criteria: 'Core architect allocated at 25% FTE; delivery leads constantly pulled into operational outages.',
    },
    {
      value: 15,
      level: 3,
      label: 'Phantom Team Fallacy',
      description: 'Team not hired or allocated; staffing dependent on speculative vendor recruitment.',
      criteria: 'Project kicked off without staff; critical roles unstaffed 60 days post-charter approval.',
    },
  ],
};

// B. IN-FLIGHT / LIVE DELIVERY (PrjLive O1–O5)
export const PROJECT_LIVE_O1: DimensionDef<0 | 8 | 16 | 25> = {
  code: 'O1',
  name: 'Schedule Drift & Critical Path Delay',
  category: 'del',
  maxPoints: 25,
  weightLabel: '25 pts',
  focusArea: 'Schedule Variance & Milestone Slippage',
  options: [
    {
      value: 0,
      level: 0,
      label: 'Milestones On or Ahead of Baseline',
      description: 'Milestones on or ahead of critical path baseline; zero float degradation.',
      criteria: 'All primary releases delivered within planned window; SPI >= 1.0; buffer intact.',
    },
    {
      value: 8,
      level: 1,
      label: 'Minor Milestone Drift (<10%)',
      description: 'Minor milestone slip (<10%), absorbed by non-critical path buffers with clear recovery.',
      criteria: 'SPI 0.90–0.99; critical path uncompromised; corrective actions scheduled in upcoming sprint.',
    },
    {
      value: 16,
      level: 2,
      label: 'Moderate Critical Path Slip (10–25%)',
      description: 'Moderate critical path drift (10–25%); milestone commitments slipping into subsequent quarters.',
      criteria: 'SPI 0.75–0.89; critical path tasks delayed; non-critical float completely exhausted.',
    },
    {
      value: 25,
      level: 3,
      label: 'Severe Schedule Collapse (>25%)',
      description: 'Severe schedule collapse (>25% slip); critical path blocked indefinitely by unaddressed technical roadblocks.',
      criteria: 'SPI < 0.75; launch target postponed repeatedly; release dates omitted from executive status reports.',
    },
  ],
};

export const PROJECT_LIVE_O2: DimensionDef<0 | 7 | 13 | 20> = {
  code: 'O2',
  name: 'Budget Burn Velocity vs. Earned Value',
  category: 'del',
  maxPoints: 20,
  weightLabel: '20 pts',
  focusArea: 'Cost Performance Index (CPI) & Capital Depletion',
  options: [
    {
      value: 0,
      level: 0,
      label: 'CPI >= 1.0 (Value Matches Capital)',
      description: 'CPI >= 1.0; capital burn aligns directly with verified earned business value.',
      criteria: 'Financial expenditure tracks budget curve; zero unbudgeted contractor expansion.',
    },
    {
      value: 7,
      level: 1,
      label: 'CPI 0.90–0.99 (Minor Cost Variance)',
      description: 'CPI 0.90–0.99; slight cost variance within planned contingency threshold.',
      criteria: 'Cost variance accounted for by early hardware purchases or planned overtime.',
    },
    {
      value: 13,
      level: 2,
      label: 'CPI 0.75–0.89 (Burn Outpacing Delivery)',
      description: 'CPI 0.75–0.89; burn rate outpacing milestone delivery; contingency drawn down prematurely.',
      criteria: 'Substantial spending on contractor bench time without corresponding software feature completion.',
    },
    {
      value: 20,
      level: 3,
      label: 'CPI < 0.75 (Runaway Capital Depletion)',
      description: 'CPI < 0.75; runaway burn velocity with minimal delivered software capability.',
      criteria: 'More than 70% of budget exhausted with less than 30% of functional requirements delivered.',
    },
  ],
};

export const PROJECT_LIVE_O3: DimensionDef<0 | 7 | 14 | 20> = {
  code: 'O3',
  name: 'Defect Density & Unplanned Regression',
  category: 'del',
  maxPoints: 20,
  weightLabel: '20 pts',
  focusArea: 'Software Quality & Unplanned Rework',
  options: [
    {
      value: 0,
      level: 0,
      label: 'Zero Sev-1 Defects (>95% Pass Rate)',
      description: 'Zero critical (Sev-1) defects; automated regression suite pass rate >95%.',
      criteria: 'Rework consumes <10% of total engineering sprint capacity; clean deployment pipelines.',
    },
    {
      value: 7,
      level: 1,
      label: 'Manageable Defect Backlog',
      description: 'Manageable defect backlog; rapid turnaround on Sev-2 defects (<48 hours).',
      criteria: 'Rework consumes 10–20% of capacity; zero architectural showstoppers in staging.',
    },
    {
      value: 14,
      level: 2,
      label: 'Escalating Regression Escapes',
      description: 'Growing defect debt; regression escapes disrupting test environments and slowing testing.',
      criteria: 'Rework consumes 25–40% of sprint capacity; bug count growing faster than feature completion.',
    },
    {
      value: 20,
      level: 3,
      label: 'Defect Explosion / Paralyzed Testing',
      description: 'Defect explosion; Sev-1 blockers paralyzing test cycles; rollback failures in pre-prod.',
      criteria: 'Engineering capacity consumed 100% by emergency hotfixes; releases routinely aborted.',
    },
  ],
};

export const PROJECT_LIVE_O4: DimensionDef<0 | 7 | 14 | 20> = {
  code: 'O4',
  name: 'Team Cognitive Load & Key-Person Risk',
  category: 'del',
  maxPoints: 20,
  weightLabel: '20 pts',
  focusArea: 'Work-in-Progress & Team Attrition Risk',
  options: [
    {
      value: 0,
      level: 0,
      label: 'Sustainable Pace & Redundancy',
      description: 'Sustainable team pace; cross-trained redundancies across all critical architectural modules.',
      criteria: 'Team turnover <5%; bus factor >3 across all repositories; zero emergency weekend shifts.',
    },
    {
      value: 7,
      level: 1,
      label: 'Controlled Release Overtime',
      description: 'Manageable overtime during release windows; key-person backups identified and shadowing.',
      criteria: 'Occasional heroics during major milestones followed by compensatory time off; low burnout risk.',
    },
    {
      value: 14,
      level: 2,
      label: 'High Strain / Single Points of Failure',
      description: 'High cognitive strain; single point of failure (SPOF) on critical integration modules.',
      criteria: 'Program completely halts if 1 lead engineer is sick; sprint WIP limits routinely exceeded.',
    },
    {
      value: 20,
      level: 3,
      label: 'Severe Burnout & Architect Attrition',
      description: 'Severe team burnout; key architect attrition; knowledge vacuum in core legacy systems.',
      criteria: 'Lead architect and two senior developers resign mid-sprint; team morale in crisis.',
    },
  ],
};

export const PROJECT_LIVE_O5: DimensionDef<0 | 5 | 10 | 15> = {
  code: 'O5',
  name: 'Stakeholder Misalignment & Friction',
  category: 'del',
  maxPoints: 15,
  weightLabel: '15 pts',
  focusArea: 'Cross-Functional Trust & Escalate Latency',
  options: [
    {
      value: 0,
      level: 0,
      label: 'Unified Alignment & Active Trust',
      description: 'Unified alignment; weekly steering cadence focused on transparent obstacle removal.',
      criteria: 'Business stakeholders, PMO, and engineering leads operate under shared definitions of success.',
    },
    {
      value: 5,
      level: 1,
      label: 'Constructive Tension Resolved Rapidly',
      description: 'Constructive tension resolved through established escalation protocols and transparent demos.',
      criteria: 'Occasional disagreements over milestone prioritization resolved within weekly governance review.',
    },
    {
      value: 10,
      level: 2,
      label: 'Departmental Friction & Resistance',
      description: 'Departmental friction; passive-aggressive resistance from downstream operational units.',
      criteria: 'Operations team refuses to accept software handover; business users complain about lack of input.',
    },
    {
      value: 15,
      level: 3,
      label: 'Toxic Governance Breakdown',
      description: 'Toxic governance breakdown; executive disengagement; active political sabotage.',
      criteria: 'Steering committee turns into blame allocation sessions; business lines build shadow IT alternatives.',
    },
  ],
};

// =========================================================================
// 3. DIGITAL PRODUCT MODE: PART 1 STRATEGIC PRODUCT GOVERNANCE (PrdGov, G1–G5)
// =========================================================================

export const PRODUCT_G1: DimensionDef<0 | 8 | 16 | 25> = {
  code: 'G1',
  name: 'Strategic Vision & Executive Alignment',
  category: 'gov',
  maxPoints: 25,
  weightLabel: '25 pts',
  focusArea: 'Outcome Roadmaps & HiPPO Resistance',
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
      description: 'Structured discovery cadence; leadership reviews only strategic pivots and metrics.',
      criteria: 'Teams test hypotheses within agreed product guardrails with monthly reviews.',
    },
    {
      value: 14,
      level: 2,
      label: 'Trio Acts as Ticket-Takers',
      description: 'Trio acts as ticket-takers; features and UI specifications pre-dictated by stakeholders.',
      criteria: 'Product managers function as backlog administrators rather than strategic leaders.',
    },
    {
      value: 20,
      level: 3,
      label: 'Complete Lack of User Contact',
      description: 'Complete lack of user contact; development proceeds entirely without customer validation.',
      criteria: 'Engineers forbidden from contacting end-users; assumptions masquerade as validated facts.',
    },
  ],
};

export const PRODUCT_G4: DimensionDef<0 | 7 | 14 | 20> = {
  code: 'G4',
  name: 'Technical Debt & Architectural Capacity',
  category: 'gov',
  maxPoints: 20,
  weightLabel: '20 pts',
  focusArea: 'Engineering Health & Refactoring Allocation',
  options: [
    {
      value: 0,
      level: 0,
      label: 'Dedicated 20%+ Tech Debt Capacity',
      description: 'Dedicated 20%+ engineering capacity permanently reserved for tech debt & reliability.',
      criteria: 'Refactoring tasks tracked in sprint boards; architecture evolves gracefully.',
    },
    {
      value: 7,
      level: 1,
      label: 'Continuous Refactoring Baked In',
      description: 'Continuous refactoring baked into normal sprint cycles with steady debt reduction.',
      criteria: 'Tech debt treated as first-class backlog items alongside customer features.',
    },
    {
      value: 14,
      level: 2,
      label: 'Tech Debt Continuously Deprioritized',
      description: 'Tech debt acknowledged in retro but continuously deprioritized for urgent sales features.',
      criteria: 'Deployment lead times growing; test coverage declining below acceptable limits.',
    },
    {
      value: 20,
      level: 3,
      label: 'Critical Architectural Bankruptcy',
      description: 'Critical architectural bankruptcy; outages and severe performance drops during routine deployments.',
      criteria: 'Core platform unstable; developers spend >50% of time patching legacy vulnerabilities.',
    },
  ],
};

export const PRODUCT_G5: DimensionDef<0 | 5 | 10 | 15> = {
  code: 'G5',
  name: 'Regulatory, Privacy & Platform Compliance',
  category: 'gov',
  maxPoints: 15,
  weightLabel: '15 pts',
  focusArea: 'Compliance-as-Code & Privacy-by-Design',
  options: [
    {
      value: 0,
      level: 0,
      label: 'Privacy-by-Design & Automated CI/CD',
      description: 'Privacy-by-design & automated compliance checks in CI/CD pipeline.',
      criteria: 'SOC2, GDPR, and data lineage checks enforced automatically on pull requests.',
    },
    {
      value: 5,
      level: 1,
      label: 'Standard Compliance Gate Pre-Release',
      description: 'Standard legal/compliance gate prior to major releases with predictable sign-off times.',
      criteria: 'Privacy reviews completed within 5 business days with clear mitigation guidelines.',
    },
    {
      value: 10,
      level: 2,
      label: 'Manual Compliance Bottlenecks',
      description: 'Manual compliance bottlenecks; fear-driven security reviews halting releases for weeks.',
      criteria: 'Releases held up by opaque security committees with shifting compliance goalposts.',
    },
    {
      value: 15,
      level: 3,
      label: 'Severe Compliance Blindspots',
      description: 'Severe compliance blindspots; risk of legal/regulatory shutdown or data breach fines.',
      criteria: 'Customer PII unencrypted in test environments; zero regulatory audit readiness.',
    },
  ],
};

// =========================================================================
// 4. DIGITAL PRODUCT MODE: PART 2 OPERATIONAL TRACTION & FLOW (PrdDel)
// =========================================================================

// A. PHASE 1: DISCOVERY & 0-TO-1 VALIDATION (P1–P5)
export const PRODUCT_DISC_P1: DimensionDef<0 | 8 | 16 | 25> = {
  code: 'P1',
  name: 'Customer Discovery Velocity & Evidence Base',
  category: 'del',
  maxPoints: 25,
  weightLabel: '25 pts',
  focusArea: 'Discovery Interviews & Customer Evidence',
  options: [
    {
      value: 0,
      level: 0,
      label: '>5 User Discovery Sessions/Week',
      description: '>5 user discovery sessions/week with structured insight synthesis and rapid hypothesis testing.',
      criteria: 'Product Trio speaks with customers weekly; insights cataloged in continuous discovery tree.',
    },
    {
      value: 8,
      level: 1,
      label: 'Regular Bi-Weekly Interviews',
      description: 'Regular bi-weekly interviews; feedback directly shapes prototypes and roadmap prioritization.',
      criteria: 'User feedback documented with clear opportunity-solution trees reviewed monthly.',
    },
    {
      value: 16,
      level: 2,
      label: 'Sporadic Ad-Hoc Interviews',
      description: 'Sporadic ad-hoc interviews; validation happens only after code is already built and deployed.',
      criteria: 'Interviews conducted once a quarter; team relies on internal proxies rather than real users.',
    },
    {
      value: 25,
      level: 3,
      label: 'Zero Customer Contact',
      description: 'Zero customer contact; product built strictly on internal leadership assumptions and guesses.',
      criteria: 'No external users have seen prototypes; team building full-stack software blindly.',
    },
  ],
};

export const PRODUCT_DISC_P2: DimensionDef<0 | 7 | 13 | 20> = {
  code: 'P2',
  name: 'Experiment Cycle & Pivot Latency',
  category: 'del',
  maxPoints: 20,
  weightLabel: '20 pts',
  focusArea: 'Hypothesis Testing Speed & Pivot Agility',
  options: [
    {
      value: 0,
      level: 0,
      label: '<1 Week Idea to Validated Test',
      description: '<1 week from prototype hypothesis to validated test result with real prospective users.',
      criteria: 'Lightweight smoke tests, landing page tests, or clickable prototypes tested weekly.',
    },
    {
      value: 7,
      level: 1,
      label: '2-Week Validation Cycles',
      description: '2-week validation cycles matching agile sprints with structured quantitative results.',
      criteria: 'Every major feature assumption backed by an empirical test before production coding begins.',
    },
    {
      value: 13,
      level: 2,
      label: '4–6 Week Concept Delays',
      description: '4–6 week delays to test simple concept validations due to stakeholder sign-off friction.',
      criteria: 'Hypotheses languish in design committees; slow feedback loops cause engineering idle time.',
    },
    {
      value: 20,
      level: 3,
      label: 'Inability to Pivot / Locked Build',
      description: 'Inability to pivot; teams locked into multi-month build without interim checkpoints.',
      criteria: 'Management refuses to alter course even when early validation tests fail completely.',
    },
  ],
};

export const PRODUCT_DISC_P3: DimensionDef<0 | 7 | 14 | 20> = {
  code: 'P3',
  name: 'Problem-Solution Fit Signal',
  category: 'del',
  maxPoints: 20,
  weightLabel: '20 pts',
  focusArea: 'Customer Demand Urgency & Pain Severity',
  options: [
    {
      value: 0,
      level: 0,
      label: 'Strong Pull & Urgent Demand',
      description: 'Strong pull; pilot users actively demand early access and express acute urgency to solve pain.',
      criteria: 'Users offer letters of intent, pilot prepayments, or unprompted referrals to peers.',
    },
    {
      value: 7,
      level: 1,
      label: 'Identifiable Pain Point Confirmed',
      description: 'Identifiable pain point confirmed; moderate user enthusiasm with willingness to test betas.',
      criteria: 'Target users acknowledge high frequency of problem and engage regularly with early prototypes.',
    },
    {
      value: 14,
      level: 2,
      label: 'Lukewarm Conceptual Interest',
      description: 'Lukewarm engagement; users express conceptual interest in interviews but do not re-engage.',
      criteria: 'Pilots stall; users ignore follow-up scheduling and fail to complete test onboarding tasks.',
    },
    {
      value: 20,
      level: 3,
      label: 'Total Market Apathy',
      description: 'Total market apathy; target users do not recognize or experience the problem being solved.',
      criteria: 'Customer acquisition conversion near zero; prospects state problem is non-existent or trivial.',
    },
  ],
};

export const PRODUCT_DISC_P4: DimensionDef<0 | 7 | 14 | 20> = {
  code: 'P4',
  name: 'Prototype Fidelity & Technical Waste',
  category: 'del',
  maxPoints: 20,
  weightLabel: '20 pts',
  focusArea: 'Frugal Experimentation vs Over-Engineering',
  options: [
    {
      value: 0,
      level: 0,
      label: 'Low-Code / Clickable Smoke Tests',
      description: 'Low-code / Figma / clickable smoke tests before committing production engineering resources.',
      criteria: 'Zero production code written until demand validation and willingness-to-pay are confirmed.',
    },
    {
      value: 7,
      level: 1,
      label: 'Lightweight Throwaway Prototypes',
      description: 'Lightweight throwaway prototypes designed to answer specific high-risk assumptions.',
      criteria: 'Prototypes explicitly built with minimal architecture and discarded after validation test.',
    },
    {
      value: 14,
      level: 2,
      label: 'Over-Architected Full-Stack Builds',
      description: 'Over-architected full-stack builds for unvalidated hypotheses; wasted development time.',
      criteria: 'Engineers spend weeks designing distributed databases for features that users reject on day 1.',
    },
    {
      value: 20,
      level: 3,
      label: 'Enterprise Infrastructure Prematurely Built',
      description: 'Enterprise infrastructure built before acquiring a single validated user or active prospect.',
      criteria: 'Months spent on multi-region Kubernetes clusters and microservices for an unproven concept.',
    },
  ],
};

export const PRODUCT_DISC_P5: DimensionDef<0 | 5 | 10 | 15> = {
  code: 'P5',
  name: 'Team Validation Alignment',
  category: 'del',
  maxPoints: 15,
  weightLabel: '15 pts',
  focusArea: 'Cross-Functional Discovery Clarity',
  options: [
    {
      value: 0,
      level: 0,
      label: 'Unified Trio Clarity on Success',
      description: 'Unified Trio clarity on what constitutes a successful test and unambiguous kill-criteria.',
      criteria: 'Product, Design, and Engineering celebrate invalidating bad ideas quickly and pivot together.',
    },
    {
      value: 5,
      level: 1,
      label: 'Minor Metric Debates Resolved Fast',
      description: 'Minor debates on metrics, resolved quickly via empirical user tests and shared session recordings.',
      criteria: 'Shared customer interview recordings reviewed weekly across the entire squad.',
    },
    {
      value: 10,
      level: 2,
      label: 'Disagreement on Problem to Solve',
      description: 'Disagreement between Product, Design, and Tech on what core problem to solve first.',
      criteria: 'Siloed debates without customer data; teams pull in different directions on MVP scope.',
    },
    {
      value: 15,
      level: 3,
      label: 'Siloed Teams & Guesswork',
      description: 'Siloed teams; engineering builds while product team is still guessing basic customer requirements.',
      criteria: 'Zero cross-functional alignment; developers frustrated by constant scope redesigns.',
    },
  ],
};

// B. PHASE 2: PRODUCT-MARKET FIT (PMF) & RETENTION (P1–P5)
export const PRODUCT_PMF_P1: DimensionDef<0 | 8 | 16 | 25> = {
  code: 'P1',
  name: 'Cohort Retention & Churn Dynamics',
  category: 'del',
  maxPoints: 25,
  weightLabel: '25 pts',
  focusArea: 'Cohort Retention Curves & Logo Churn',
  options: [
    {
      value: 0,
      level: 0,
      label: 'Flattening / Smiling Retention Curve',
      description: 'Flattening / smiling retention curve; net negative revenue churn with organic expansion.',
      criteria: 'Cohort retention stabilizes parallel to x-axis at >40% by month 3; net revenue retention >110%.',
    },
    {
      value: 8,
      level: 1,
      label: 'Stable Retention Meeting Baseline',
      description: 'Stable retention meeting B2B/B2C SaaS benchmark; churn is manageable and predictable.',
      criteria: 'Monthly logo churn <2.5%; customer renewals predictable with positive expansion balance.',
    },
    {
      value: 16,
      level: 2,
      label: 'Downward Sloping Retention',
      description: 'Downward sloping retention; high acquisition spend masking a catastrophic leaky bucket.',
      criteria: 'Retention curve trends continuously toward zero; monthly logo churn 3–5%.',
    },
    {
      value: 25,
      level: 3,
      label: 'Immediate Drop-Off (>5% Churn)',
      description: 'Immediate drop-off; >5% monthly logo churn; high abandonment within first 7 days.',
      criteria: 'Over 80% of newly acquired cohorts abandon the product before completing month 1.',
    },
  ],
};

export const PRODUCT_PMF_P2: DimensionDef<0 | 7 | 13 | 20> = {
  code: 'P2',
  name: 'Core Funnel Activation Rate',
  category: 'del',
  maxPoints: 20,
  weightLabel: '20 pts',
  focusArea: 'Time-to-Value & Aha Moment Velocity',
  options: [
    {
      value: 0,
      level: 0,
      label: '>60% Activation to "Aha!" Moment',
      description: '>60% onboarding completion to "Aha!" moment within first session or initial 48 hours.',
      criteria: 'Time-to-value < 15 minutes; self-serve friction virtually non-existent.',
    },
    {
      value: 7,
      level: 1,
      label: 'Industry Standard Activation (40-60%)',
      description: 'Industry standard activation; self-serve friction minimal; clear onboarding guidance.',
      criteria: 'Most signups complete initial setup and realize core value within first week.',
    },
    {
      value: 13,
      level: 2,
      label: 'Steep Onboarding Drop-Offs',
      description: 'Steep onboarding drop-offs; requires manual sales or customer success intervention to activate.',
      criteria: '<25% of signups complete onboarding without direct human hand-holding.',
    },
    {
      value: 20,
      level: 3,
      label: 'Broken Activation Funnel (<15%)',
      description: 'Broken activation funnel; <15% of signups ever reach the core value proposition.',
      criteria: 'Complex setup, confusing configurations, and high friction cause immediate user bounce.',
    },
  ],
};

export const PRODUCT_PMF_P3: DimensionDef<0 | 7 | 14 | 20> = {
  code: 'P3',
  name: 'Value Stickiness & Engagement Depth',
  category: 'del',
  maxPoints: 20,
  weightLabel: '20 pts',
  focusArea: 'DAU/WAU Ratios & Habit Formation',
  options: [
    {
      value: 0,
      level: 0,
      label: 'DAU/WAU >50% (Indispensable Tool)',
      description: 'Daily/Weekly Active User ratio (DAU/WAU) >50%; indispensable workflow utility.',
      criteria: 'Users log in multiple times daily; product is a mission-critical system of record or engagement.',
    },
    {
      value: 7,
      level: 1,
      label: 'Consistent Weekly Utility',
      description: 'Consistent weekly utility; active core user group relies on product for recurring tasks.',
      criteria: 'DAU/WAU ratio 30–49%; dependable recurring workflow usage across customer segments.',
    },
    {
      value: 14,
      level: 2,
      label: 'Shelfware Tendency (Monthly Logins)',
      description: 'Shelfware tendency; users log in once or twice a month at most with declining engagement.',
      criteria: 'DAU/WAU ratio <20%; product viewed as non-essential optional utility.',
    },
    {
      value: 20,
      level: 3,
      label: 'Ghost Product (Forgotten Accounts)',
      description: 'Ghost product; users forget they have licenses or accounts; zero habitual workflow.',
      criteria: 'Zero active engagement; customer accounts go dormant for 60+ consecutive days.',
    },
  ],
};

export const PRODUCT_PMF_P4: DimensionDef<0 | 7 | 14 | 20> = {
  code: 'P4',
  name: 'Feature Usage Concentration vs. Bloat',
  category: 'del',
  maxPoints: 20,
  weightLabel: '20 pts',
  focusArea: 'Pareto Feature Distribution & Code Simplicity',
  options: [
    {
      value: 0,
      level: 0,
      label: '80% Users on Top 3 Core Features',
      description: '80% of active users utilize the top 3 core features; ruthless product simplification.',
      criteria: 'Laser focus on core value loop; low-value legacy features pruned systematically.',
    },
    {
      value: 7,
      level: 1,
      label: 'Balanced Feature Spread',
      description: 'Balanced feature spread with scheduled pruning of dead code and unused settings.',
      criteria: 'Core features dominate usage; secondary features add clear specialized value.',
    },
    {
      value: 14,
      level: 2,
      label: 'Cluttered UI & One-Off Custom Features',
      description: 'Cluttered UI; custom feature requests built for one-off sales prospects cluttering navigation.',
      criteria: 'Product team building features used by only 1 client; UI navigation becoming fragmented.',
    },
    {
      value: 20,
      level: 3,
      label: 'Massive Feature Sprawl (>70% Dead)',
      description: 'Massive feature sprawl; >70% of built code rarely or never used by active customers.',
      criteria: 'Codebase choked with dead features; users overwhelmed by cluttered settings and menus.',
    },
  ],
};

export const PRODUCT_PMF_P5: DimensionDef<0 | 5 | 10 | 15> = {
  code: 'P5',
  name: 'User Friction & Organic Referral',
  category: 'del',
  maxPoints: 15,
  weightLabel: '15 pts',
  focusArea: 'Net Promoter Score & Word-of-Mouth Virality',
  options: [
    {
      value: 0,
      level: 0,
      label: 'High NPS (>60) & Organic Virality',
      description: 'High NPS (>60); positive word-of-mouth referral loops driving inbound customer growth.',
      criteria: 'K-factor > 0.4; customers actively write public reviews and recommend tool to peers.',
    },
    {
      value: 5,
      level: 1,
      label: 'Healthy CSAT & Low Ticket Volume',
      description: 'Healthy CSAT; standard support ticket volume; positive overall user sentiment.',
      criteria: 'NPS 30–59; customer tickets handled efficiently without recurring usability complaints.',
    },
    {
      value: 10,
      level: 2,
      label: 'Chronic Usability Complaints',
      description: 'Chronic support tickets regarding usability barriers, unexpected bugs, and slow response times.',
      criteria: 'NPS 0–29; users report frequent frustration with routine workflows.',
    },
    {
      value: 15,
      level: 3,
      label: 'Hostile Sentiment & Competitor Migration',
      description: 'Hostile user sentiment; customers actively seeking alternatives and complaining publicly.',
      criteria: 'Negative NPS (<0); customers publicly warning others not to adopt platform.',
    },
  ],
};

// C. PHASE 3: SCALE & EXPANSION (P1–P5)
export const PRODUCT_SCALE_P1: DimensionDef<0 | 8 | 16 | 25> = {
  code: 'P1',
  name: 'Unit Economics & Capital Efficiency (LTV/CAC)',
  category: 'del',
  maxPoints: 25,
  weightLabel: '25 pts',
  focusArea: 'LTV/CAC Ratio & Capital Payback Horizon',
  options: [
    {
      value: 0,
      level: 0,
      label: 'LTV/CAC > 3.5 (Payback < 12 Mos)',
      description: 'LTV/CAC > 3.5; payback period < 12 months; highly sustainable unit economics.',
      criteria: 'Gross software margin >=80%; expansion revenue offsets all customer churn.',
    },
    {
      value: 8,
      level: 1,
      label: 'LTV/CAC 2.5–3.0 (Healthy Growth)',
      description: 'LTV/CAC 2.5–3.0; sustainable unit economics supported by predictable inbound growth.',
      criteria: 'Payback period 12–18 months; software gross margin 70–79%.',
    },
    {
      value: 16,
      level: 2,
      label: 'LTV/CAC < 1.5 (Margin Degradation)',
      description: 'LTV/CAC < 1.5; acquisition costs eating all gross margin; paid marketing dependency.',
      criteria: 'Payback period >24 months; increasing churn eroding customer lifetime value.',
    },
    {
      value: 25,
      level: 3,
      label: 'Negative Gross Margins',
      description: 'Negative margins; business loses money on every incremental user scaled.',
      criteria: 'Cloud hosting and customer support costs exceed subscription revenue per account.',
    },
  ],
};

export const PRODUCT_SCALE_P2: DimensionDef<0 | 7 | 13 | 20> = {
  code: 'P2',
  name: 'Cycle Time from Discovery to Value Release',
  category: 'del',
  maxPoints: 20,
  weightLabel: '20 pts',
  focusArea: 'Continuous CI/CD Delivery & Release Frequency',
  options: [
    {
      value: 0,
      level: 0,
      label: 'Continuous Deployment (< 2 Weeks)',
      description: 'Continuous deployment; idea to production telemetry < 2 weeks via automated canary pipelines.',
      criteria: 'DORA lead time for changes < 1 day; deployment frequency multiple times per day.',
    },
    {
      value: 7,
      level: 1,
      label: 'Bi-Weekly Predictable Releases',
      description: 'Bi-weekly predictable releases with quantitative telemetry feedback loops.',
      criteria: 'Lead time for changes 1–2 weeks; automated test suites and canary deployments active.',
    },
    {
      value: 13,
      level: 2,
      label: '2–3 Month Release Batches',
      description: '2–3 month release batches; manual QA bottlenecks; slow customer feedback.',
      criteria: 'Lead time for changes 1–3 months; deployments bundled into large quarterly trains.',
    },
    {
      value: 20,
      level: 3,
      label: 'Feature Factory Stalemate (>6 Mos)',
      description: 'Feature factory stalemate; releases take >6 months with deployment panic and CAB reviews.',
      criteria: 'Deployments require change advisory board approvals, freezes, and multi-week rollbacks.',
    },
  ],
};

export const PRODUCT_SCALE_P3: DimensionDef<0 | 7 | 14 | 20> = {
  code: 'P3',
  name: 'Telemetry & Quantitative Observability',
  category: 'del',
  maxPoints: 20,
  weightLabel: '20 pts',
  focusArea: 'Real-Time Telemetry & Behavioral Analytics',
  options: [
    {
      value: 0,
      level: 0,
      label: 'Complete Event Telemetry (Revenue-Tied)',
      description: 'Complete event tracking (Mixpanel/PostHog/Datadog) explicitly tied to revenue and active retention.',
      criteria: 'Real-time cohort retention dashboards, conversion funnels, and error telemetry active.',
    },
    {
      value: 7,
      level: 1,
      label: 'Standard Analytics on Core Workflows',
      description: 'Standard analytics on core workflows; qualitative cohort reviews conducted monthly.',
      criteria: 'Core onboarding and activation events tracked with monthly behavioral reviews.',
    },
    {
      value: 14,
      level: 2,
      label: 'Gaps in Funnel Tracking',
      description: 'Gaps in funnel tracking; team relies on anecdotal stakeholder feedback for decisions.',
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

export const PRODUCT_SCALE_P4: DimensionDef<0 | 7 | 14 | 20> = {
  code: 'P4',
  name: 'Cross-Team Cognitive Load & Debt Coupling',
  category: 'del',
  maxPoints: 20,
  weightLabel: '20 pts',
  focusArea: 'Stream-Aligned Architecture & Squad Independence',
  options: [
    {
      value: 0,
      level: 0,
      label: 'Modular Stream-Aligned Squads',
      description: 'Modular stream-aligned teams; clean bounded APIs; zero cross-squad blocking tickets.',
      criteria: 'Lead time from commit to prod < 2 hours; independent squad deployment without coordination.',
    },
    {
      value: 7,
      level: 1,
      label: 'Moderate Dependency Coordination',
      description: 'Moderate dependency coordination; dependencies resolved cleanly within sprint boundaries.',
      criteria: 'Cross-team blockers resolved within 2 business days; clear team API ownership contracts.',
    },
    {
      value: 14,
      level: 2,
      label: 'High Cognitive Load & Monolith Locks',
      description: 'High cognitive load; teams blocked by shared monolith, schema locks, and legacy service delays.',
      criteria: 'Cross-team dependency blockers logged in >40% of sprint tasks; release coordination meetings.',
    },
    {
      value: 20,
      level: 3,
      label: 'Organizational Gridlock & Chaos',
      description: 'Organizational gridlock; cross-team dependency chaos; releases freeze across all squads.',
      criteria: 'Developers work on 4+ unrelated codebases weekly; squad velocity drops to near zero.',
    },
  ],
};

export const PRODUCT_SCALE_P5: DimensionDef<0 | 5 | 10 | 15> = {
  code: 'P5',
  name: 'Platform Scalability & Incident Fatigue',
  category: 'del',
  maxPoints: 15,
  weightLabel: '15 pts',
  focusArea: 'SRE Availability & Chaos Resilience',
  options: [
    {
      value: 0,
      level: 0,
      label: '99.95%+ Uptime & Multi-Region Auto-Scale',
      description: '99.95%+ uptime; auto-scaling multi-region; proactive chaos engineering and automated failovers.',
      criteria: 'System availability >= 99.95%; MTTR < 15 minutes; zero manual scaling interventions.',
    },
    {
      value: 5,
      level: 1,
      label: 'Stable Cloud Infrastructure',
      description: 'Stable cloud infrastructure; minor latency spikes during peak loads without service outage.',
      criteria: 'System availability 99.90–99.94%; MTTR < 1 hour; predictable scaling profiles.',
    },
    {
      value: 10,
      level: 2,
      label: 'Chronic Performance Degradation',
      description: 'Chronic performance degradation; frequent manual server scaling interventions during peaks.',
      criteria: 'System availability 99.50–99.89%; MTTR 1–4 hours; regular database locks.',
    },
    {
      value: 15,
      level: 3,
      label: 'Critical Outage Blackouts & Alert Fatigue',
      description: 'Critical outage blackouts; alert fatigue; SLA breach penalties from enterprise customers.',
      criteria: 'System availability < 99.50%; MTTR > 4 hours; major production outages monthly.',
    },
  ],
};

// =========================================================================
// 5. HELPER: DYNAMIC QUESTIONNAIRE RETRIEVAL
// =========================================================================

export function getDimensionsForEvaluation(
  mode: GovernanceMode,
  phaseId: string,
  category: 'gov' | 'del'
): DimensionDef[] {
  if (mode === 'project') {
    if (category === 'gov') {
      return [PROJECT_D1, PROJECT_D2, PROJECT_D3, PROJECT_D4, PROJECT_D5];
    }
    // Del
    if (phaseId === 'preflight') {
      return [
        PROJECT_PREFLIGHT_P1,
        PROJECT_PREFLIGHT_P2,
        PROJECT_PREFLIGHT_P3,
        PROJECT_PREFLIGHT_P4,
        PROJECT_PREFLIGHT_P5,
      ];
    }
    return [
      PROJECT_LIVE_O1,
      PROJECT_LIVE_O2,
      PROJECT_LIVE_O3,
      PROJECT_LIVE_O4,
      PROJECT_LIVE_O5,
    ];
  }

  // Product Mode
  if (category === 'gov') {
    return [PRODUCT_G1, PRODUCT_G2, PRODUCT_G3, PRODUCT_G4, PRODUCT_G5];
  }

  // Del
  if (phaseId === 'discovery') {
    return [
      PRODUCT_DISC_P1,
      PRODUCT_DISC_P2,
      PRODUCT_DISC_P3,
      PRODUCT_DISC_P4,
      PRODUCT_DISC_P5,
    ];
  }
  if (phaseId === 'pmf') {
    return [
      PRODUCT_PMF_P1,
      PRODUCT_PMF_P2,
      PRODUCT_PMF_P3,
      PRODUCT_PMF_P4,
      PRODUCT_PMF_P5,
    ];
  }
  // scale
  return [
    PRODUCT_SCALE_P1,
    PRODUCT_SCALE_P2,
    PRODUCT_SCALE_P3,
    PRODUCT_SCALE_P4,
    PRODUCT_SCALE_P5,
  ];
}

// =========================================================================
// 6. SCORING & EVALUATION DATA MODELS
// =========================================================================

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
  urgency: 'CRITICAL' | 'HIGH' | 'MODERATE' | 'STABLE';
  description: string;
  clinicalAction: string;
}

export interface DimensionScoreItem {
  code: string;
  name: string;
  category: 'gov' | 'del';
  value: number;
  max: number;
  normPercent: number;
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
  dimensionBreakdown: DimensionScoreItem[];
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

// =========================================================================
// 7. DETERMINISTIC CALCULATION ENGINE
// =========================================================================

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
        description: 'Multi-Vector Collapse: Paralyzed governance combined with runaway schedule, budget depletion, and regression defects.',
        clinicalAction: '72-Hour Capital Freeze & Immediate Steering Committee Restructuring.',
      },
      Q2: {
        id: 'Q2',
        name: 'Fragile Governance',
        badgeClass: 'bg-amber-500/15 text-amber-400 border-amber-500/30',
        hexColor: '#F59E0B',
        themeColor: '#f59e0b',
        urgency: 'HIGH',
        description: 'Decoupled Governance Vulnerability: Heroic delivery team temporarily compensating for toxic procurement or absentee sponsorship.',
        clinicalAction: 'Lock Scope Intake & Re-anchor Single Accountable Executive Sponsor.',
      },
      Q3: {
        id: 'Q3',
        name: 'Resilient Equilibrium',
        badgeClass: 'bg-emerald-500/15 text-emerald-400 border-emerald-500/30',
        hexColor: '#10B981',
        themeColor: '#10b981',
        urgency: 'STABLE',
        description: 'Target Enterprise Operating Model: Single empowered mandate, outcome-aligned contract, and predictable delivery velocity.',
        clinicalAction: 'Defend Team Autonomy & Maintain Zero-Sum Scope Control.',
      },
      Q4: {
        id: 'Q4',
        name: 'Execution Constraint',
        badgeClass: 'bg-sky-500/15 text-sky-400 border-sky-500/30',
        hexColor: '#0EA5E9',
        themeColor: '#0ea5e9',
        urgency: 'MODERATE',
        description: 'Operational Friction: Robust governance and executive mandate, but execution choked by technical debt or legacy coupling.',
        clinicalAction: 'Slash Work-in-Progress (WIP) by 40% & Automate CI/CD Regression Tooling.',
      },
    };

    const phaseObj = PROJECT_PHASES.find((p) => p.id === phaseId) || PROJECT_PHASES[1];

    const bufferActive =
      (totalGov >= 40 && totalGov <= 60) || (totalDel >= 40 && totalDel <= 60);

    const isPreflight = phaseObj.id === 'preflight';
    const dimensionBreakdown: DimensionScoreItem[] = [
      { code: 'D1', name: 'Authority', category: 'gov', value: projectScores.d1, max: 25, normPercent: (projectScores.d1 / 25) * 100 },
      { code: 'D2', name: 'Procurement', category: 'gov', value: projectScores.d2, max: 20, normPercent: (projectScores.d2 / 20) * 100 },
      { code: 'D3', name: 'Scope Control', category: 'gov', value: projectScores.d3, max: 20, normPercent: (projectScores.d3 / 20) * 100 },
      { code: 'D4', name: 'Contingency', category: 'gov', value: projectScores.d4, max: 20, normPercent: (projectScores.d4 / 20) * 100 },
      { code: 'D5', name: 'Architecture', category: 'gov', value: projectScores.d5, max: 15, normPercent: (projectScores.d5 / 15) * 100 },
      {
        code: isPreflight ? 'P1' : 'O1',
        name: isPreflight ? 'Deadline Rigor' : 'Schedule Drift',
        category: 'del',
        value: projectScores.o1,
        max: 25,
        normPercent: (projectScores.o1 / 25) * 100,
      },
      {
        code: isPreflight ? 'P2' : 'O2',
        name: isPreflight ? 'Req Boundaries' : 'Burn Velocity',
        category: 'del',
        value: projectScores.o2,
        max: 20,
        normPercent: (projectScores.o2 / 20) * 100,
      },
      {
        code: isPreflight ? 'P3' : 'O3',
        name: isPreflight ? 'Budget Model' : 'Defect Churn',
        category: 'del',
        value: projectScores.o3,
        max: 20,
        normPercent: (projectScores.o3 / 20) * 100,
      },
      {
        code: isPreflight ? 'P4' : 'O4',
        name: isPreflight ? 'DoD Tooling' : 'Cognitive Load',
        category: 'del',
        value: projectScores.o4,
        max: 20,
        normPercent: (projectScores.o4 / 20) * 100,
      },
      {
        code: isPreflight ? 'P5' : 'O5',
        name: isPreflight ? 'Resource Ring-Fence' : 'Stakeholder Trust',
        category: 'del',
        value: projectScores.o5,
        max: 15,
        normPercent: (projectScores.o5 / 15) * 100,
      },
    ];

    return {
      mode: 'project',
      phase: phaseObj.id,
      phaseName: phaseObj.name,
      govAxisName: 'Structural Governance (PrjGov)',
      delAxisName: isPreflight
        ? 'Pre-Flight Readiness (PrjPreFlight)'
        : 'Operational Delivery (PrjDel)',
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
          ? 'Score falls within the metastable [40, 60] buffer zone. Comprehensive qualitative gate audit recommended.'
          : 'Scores reside outside the transitional buffer zone corridor.',
      },
      dimensionBreakdown,
      immediate72HourReset: {
        title: isPreflight
          ? 'Project Pre-Flight 72-Hour Gate Intervention'
          : 'Project Governance 72-Hour Reset Directive',
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

  // =========================================================================
  // PRODUCT MODE EVALUATION
  // =========================================================================
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

  const phaseObj = PRODUCT_PHASES.find((p) => p.id === phaseId) || PRODUCT_PHASES[0];

  // Dynamic Product Penalty Engine based on active Phase:
  let penaltyActive = false;
  let penaltyMessage: string | null = null;

  if (phaseObj.id === 'discovery') {
    penaltyActive = productScores.p1 === 25 && productScores.p3 >= 14;
    if (penaltyActive) {
      penaltyMessage =
        'P1=25 (Zero Customer Contact) combined with P3>=14 (Market Apathy) activates the +12 Discovery Failure Penalty on PrdDel.';
    }
  } else if (phaseObj.id === 'pmf') {
    penaltyActive = productScores.p1 === 25 && productScores.p4 >= 14;
    if (penaltyActive) {
      penaltyMessage =
        'P1=25 (Catastrophic Churn) combined with P4>=14 (Massive Feature Sprawl) triggers the +12 Blind Leaky Bucket Penalty on PrdDel.';
    }
  } else {
    // scale
    penaltyActive = productScores.p1 === 25 && productScores.p3 >= 14;
    if (penaltyActive) {
      penaltyMessage =
        'P1=25 (Negative Margins / Capital Burn) combined with P3>=14 (Blind Telemetry) triggers the +12 Scale Collapse Penalty on PrdDel.';
    }
  }

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

  const bufferActive =
    (totalGov >= 40 && totalGov <= 60) || (totalDel >= 40 && totalDel <= 60);

  // Dynamic names per product phase for radar
  let p1Name = 'Retention';
  let p2Name = 'Cycle Time';
  let p3Name = 'Unit Econ';
  let p4Name = 'Telemetry';
  let p5Name = 'Flow';

  if (phaseObj.id === 'discovery') {
    p1Name = 'Discovery Vel';
    p2Name = 'Pivot Latency';
    p3Name = 'Fit Signal';
    p4Name = 'Prototype Fid';
    p5Name = 'Trio Alignment';
  } else if (phaseObj.id === 'pmf') {
    p1Name = 'Cohort Churn';
    p2Name = 'Activation';
    p3Name = 'Stickiness';
    p4Name = 'Feature Focus';
    p5Name = 'Referral';
  } else {
    // scale
    p1Name = 'Unit Econ (CAC)';
    p2Name = 'Release Cycle';
    p3Name = 'Telemetry';
    p4Name = 'Cognitive Load';
    p5Name = 'Scalability';
  }

  const dimensionBreakdown: DimensionScoreItem[] = [
    { code: 'G1', name: 'Vision', category: 'gov', value: productScores.g1, max: 25, normPercent: (productScores.g1 / 25) * 100 },
    { code: 'G2', name: 'Capital', category: 'gov', value: productScores.g2, max: 20, normPercent: (productScores.g2 / 20) * 100 },
    { code: 'G3', name: 'Autonomy', category: 'gov', value: productScores.g3, max: 20, normPercent: (productScores.g3 / 20) * 100 },
    { code: 'G4', name: 'Tech Debt', category: 'gov', value: productScores.g4, max: 20, normPercent: (productScores.g4 / 20) * 100 },
    { code: 'G5', name: 'Compliance', category: 'gov', value: productScores.g5, max: 15, normPercent: (productScores.g5 / 15) * 100 },
    { code: 'P1', name: p1Name, category: 'del', value: productScores.p1, max: 25, normPercent: (productScores.p1 / 25) * 100 },
    { code: 'P2', name: p2Name, category: 'del', value: productScores.p2, max: 20, normPercent: (productScores.p2 / 20) * 100 },
    { code: 'P3', name: p3Name, category: 'del', value: productScores.p3, max: 20, normPercent: (productScores.p3 / 20) * 100 },
    { code: 'P4', name: p4Name, category: 'del', value: productScores.p4, max: 20, normPercent: (productScores.p4 / 20) * 100 },
    { code: 'P5', name: p5Name, category: 'del', value: productScores.p5, max: 15, normPercent: (productScores.p5 / 15) * 100 },
  ];

  return {
    mode: 'product',
    phase: phaseObj.id,
    phaseName: phaseObj.name,
    govAxisName: 'Strategic Product Governance (PrdGov)',
    delAxisName:
      phaseObj.id === 'discovery'
        ? 'Validation & Discovery Flow (PrdDel)'
        : phaseObj.id === 'pmf'
        ? 'Retention & Funnel Velocity (PrdDel)'
        : 'Unit Economics & Scale Flow (PrdDel)',
    rawGov,
    govPenalty,
    totalGov,
    rawDel,
    delPenalty,
    totalDel,
    quadrant: quadrantMap[qId],
    penaltyActive,
    penaltyMessage,
    bufferZone: {
      active: bufferActive,
      explanation: bufferActive
        ? 'Product score resides within the metastable [40, 60] transition zone. Cohort audit required.'
        : 'Scores reside outside the transitional buffer zone corridor.',
    },
    dimensionBreakdown,
    immediate72HourReset: {
      title:
        phaseObj.id === 'discovery'
          ? 'Phase 1 Discovery 72-Hour Realignment Directive'
          : phaseObj.id === 'pmf'
          ? 'Phase 2 PMF & Retention 72-Hour Reset Directive'
          : 'Phase 3 Scale & Platform 72-Hour Turnaround Directive',
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
