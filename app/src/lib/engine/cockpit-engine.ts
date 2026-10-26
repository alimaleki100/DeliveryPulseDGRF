/**
 * DeliveryPulse — DGRF Diagnostic Cockpit Engine
 * Mathematical Core & Deterministic Scoring Architecture
 * 
 * Formal implementation of:
 * - Structural Governance Score (PrjGov, 0–100): D1–D5
 * - Operational Delivery Score (PrjDel, 0–100): O1–O5
 * - Nonlinear Interactive Penalty:
 *   If (D1 === 25 && D2 >= 13) { PrjGov = Math.min(100, Sum(D1..D5) + 10); }
 * - Quadrant Mapping (Threshold theta = 50):
 *   Q1 (PrjGov > 50 && PrjDel > 50): Systemic Fragility (Critical / Red)
 *   Q2 (PrjGov > 50 && PrjDel <= 50): Fragile Governance (Early Warning / Amber)
 *   Q3 (PrjGov <= 50 && PrjDel <= 50): Resilient Equilibrium (Stable / Emerald)
 *   Q4 (PrjGov <= 50 && PrjDel > 50): Execution Constraint (Operational / Cyan)
 * 
 * Author: Ali Maleki (MBA, PMP)
 */

export type CockpitQuadrantId = 'Q1' | 'Q2' | 'Q3' | 'Q4';

export interface CockpitQuadrant {
  id: CockpitQuadrantId;
  name: string;
  clinicalName: string;
  badgeClass: string;
  themeColor: string;
  hexColor: string;
  urgency: 'CRITICAL' | 'HIGH' | 'STABLE' | 'MODERATE';
  description: string;
  pathology: string;
  immediateAction: string;
  prescription: string;
}

export const COCKPIT_QUADRANTS: Record<CockpitQuadrantId, CockpitQuadrant> = {
  Q1: {
    id: 'Q1',
    name: 'Systemic Fragility',
    clinicalName: 'Multi-Vector Failure Trajectory',
    badgeClass: 'bg-rose-500/15 text-rose-400 border-rose-500/30',
    themeColor: '#ef4444',
    hexColor: '#EF4444',
    urgency: 'CRITICAL',
    description: 'High Structural Governance Risk (PrjGov > 50) and High Operational Delivery Risk (PrjDel > 50).',
    pathology: 'Toxic vendor contracting, diffuse sponsor authority, cascading critical-path slippage, and runaway defect inflow.',
    immediateAction: '72-Hour Capital Freeze & Immediate Steering Committee Restructuring.',
    prescription: 'Halt all non-essential feature development. Terminate or convert cost-plus contracts into shared risk-reward milestones. Appoint a single turnaround executive with unilateral scope and budget authority.',
  },
  Q2: {
    id: 'Q2',
    name: 'Fragile Governance',
    clinicalName: 'Decoupled Governance Vulnerability',
    badgeClass: 'bg-amber-500/15 text-amber-400 border-amber-500/30',
    themeColor: '#f59e0b',
    hexColor: '#F59E0B',
    urgency: 'HIGH',
    description: 'High Structural Governance Risk (PrjGov > 50) and Controlled Operational Delivery (PrjDel <= 50).',
    pathology: 'Delivery momentum temporarily sustained by heroic engineering or modular architecture, but undermined by upstream procurement flaws or diffuse authority.',
    immediateAction: 'Upstream Sponsor Intervention & Scope Intake Lockdown.',
    prescription: 'Abolish multi-stakeholder consensus committees. Establish formal Change Control Board (CCB) with zero-sum scope subtraction. Protect delivery squads from political churn.',
  },
  Q3: {
    id: 'Q3',
    name: 'Resilient Equilibrium',
    clinicalName: 'Target Enterprise Benchmark',
    badgeClass: 'bg-emerald-500/15 text-emerald-400 border-emerald-500/30',
    themeColor: '#10b981',
    hexColor: '#10B981',
    urgency: 'STABLE',
    description: 'Controlled Structural Governance (PrjGov <= 50) and Controlled Operational Delivery (PrjDel <= 50).',
    pathology: 'Sound commercial risk alignment, empowered decision-making, predictable delivery velocity, and honest status candor.',
    immediateAction: 'Sustain & Defend Team Autonomy.',
    prescription: 'Maintain strict CCB discipline, defend 15-20% contingency buffers, and resist executive pressure to artificially compress schedules.',
  },
  Q4: {
    id: 'Q4',
    name: 'Execution Constraint',
    clinicalName: 'Operational Delivery Bottleneck',
    badgeClass: 'bg-sky-500/15 text-sky-400 border-sky-500/30',
    themeColor: '#0ea5e9',
    hexColor: '#0EA5E9',
    urgency: 'MODERATE',
    description: 'Controlled Structural Governance (PrjGov <= 50) and High Operational Delivery Risk (PrjDel > 50).',
    pathology: 'Sound governance mandate and contracts, but execution blocked by legacy technical drag, test automation deficits, or skill shortages.',
    immediateAction: 'Engineering Capacity Injection (Do Not Add PMO Overhead).',
    prescription: 'Do NOT add PMO reporting layers or extra status meetings. Slash Work-In-Progress (WIP) by 40%, inject senior architectural leads, and dedicate sprints to technical debt refactoring.',
  },
};

export interface DimensionOption<T extends number = number> {
  value: T;
  level: 0 | 1 | 2 | 3;
  label: string;
  description: string;
  criteria: string;
}

export interface DimensionMetadata<T extends number = number> {
  code: string;
  name: string;
  category: 'gov' | 'del';
  maxPoints: number;
  weightLabel: string;
  theoreticalBasis: string;
  options: DimensionOption<T>[];
}

// D1: Decision Authority & Mandate (Max 25 pts: 0, 8, 16, 25)
export const D1_META: DimensionMetadata<0 | 8 | 16 | 25> = {
  code: 'D1',
  name: 'Decision Authority & Mandate',
  category: 'gov',
  maxPoints: 25,
  weightLabel: '25 pts',
  theoreticalBasis: 'Executive Sponsorship & Single-Point Accountability',
  options: [
    {
      value: 0,
      level: 0,
      label: 'Single-Threaded Executive Owner',
      description: 'Named VP/Sponsor with full P&L, hiring, and unilateral architectural sign-off.',
      criteria: 'Decisions resolved within 24 hours. Zero consensus committee vetoes.',
    },
    {
      value: 8,
      level: 1,
      label: 'Empowered Lead with Minor Escalation',
      description: 'Dedicated business sponsor with clear mandate, minor board oversight on major pivots.',
      criteria: 'Standard escalation latency < 3 business days; clear charter.',
    },
    {
      value: 16,
      level: 2,
      label: 'Fragmented Multi-Stakeholder Matrix',
      description: 'Authority split across 3+ business divisions with conflicting commercial goals.',
      criteria: 'Decisions stalled in steering committees for 2-4 weeks; compromise architectures.',
    },
    {
      value: 25,
      level: 3,
      label: 'Absentee / Paralyzed Authority',
      description: 'No identifiable business owner; leadership denies accountability for budget overruns.',
      criteria: 'Complete paralysis; architectural decisions deferred indefinitely; fear of blame.',
    },
  ],
};

// D2: Procurement & Vendor Risk Allocation (Max 20 pts: 0, 7, 13, 20)
export const D2_META: DimensionMetadata<0 | 7 | 13 | 20> = {
  code: 'D2',
  name: 'Procurement & Vendor Risk Allocation',
  category: 'gov',
  maxPoints: 20,
  weightLabel: '20 pts',
  theoreticalBasis: 'Contractual Alignment & Principal-Agent Theory',
  options: [
    {
      value: 0,
      level: 0,
      label: 'Outcome-Aligned Shared Risk',
      description: 'Vendor compensation tied strictly to production milestones and defect escrow.',
      criteria: 'Shared risk-reward commercial model; skin-in-the-game SLAs.',
    },
    {
      value: 7,
      level: 1,
      label: 'Capped T&M with Performance Milestones',
      description: 'Time and materials contract with contractual spending caps and audit rights.',
      criteria: 'Vendor delivers under periodic deliverables review with burn rate ceilings.',
    },
    {
      value: 13,
      level: 2,
      label: 'Adversarial Fixed-Price / Rigid SOW',
      description: 'Rigid statement of work triggering constant change requests (CR) for minor adjustments.',
      criteria: 'Vendor disputes every sprint item; change order friction consumes 20%+ of delivery time.',
    },
    {
      value: 20,
      level: 3,
      label: 'Predatory Vendor Lock-in / Cost-Plus',
      description: 'Uncapped billing with zero penalties for delay; proprietary vendor lock-in.',
      criteria: 'Vendor rotates senior architects off project; billing continues regardless of milestone slippage.',
    },
  ],
};

// D3: Scope Governance & Baseline Integrity (Max 20 pts: 0, 7, 14, 20)
export const D3_META: DimensionMetadata<0 | 7 | 14 | 20> = {
  code: 'D3',
  name: 'Scope Governance & Baseline Integrity',
  category: 'gov',
  maxPoints: 20,
  weightLabel: '20 pts',
  theoreticalBasis: 'Configuration Control & Zero-Sum Scope Management',
  options: [
    {
      value: 0,
      level: 0,
      label: 'Zero-Sum Baseline CCB Enforcement',
      description: 'Every added requirement mandates equal scope or budget subtraction.',
      criteria: 'Strict formal CCB; baseline tracked in version control; scope creep rate < 2%.',
    },
    {
      value: 7,
      level: 1,
      label: 'Formal CCB with Managed Tradeoffs',
      description: 'Regular change reviews with documented cost and timeline impact assessments.',
      criteria: 'Scope adjustments logged quarterly; minor variance absorbed within contingency.',
    },
    {
      value: 14,
      level: 2,
      label: 'Permeable Backlog (Informal Requests)',
      description: 'Stakeholders slip pet requirements directly to developers without formal approval.',
      criteria: 'Backlog grows 15-25% per quarter without baseline adjustments or capacity additions.',
    },
    {
      value: 20,
      level: 3,
      label: 'Unchecked Scope Expansion Trap',
      description: 'Open-ended scope pipeline; executives promise bespoke client features ad-hoc.',
      criteria: 'Requirements churn exceeds 40%; teams build contradictory features simultaneously.',
    },
  ],
};

// D4: Contingency & Reserve Governance (Max 20 pts: 0, 7, 14, 20)
export const D4_META: DimensionMetadata<0 | 7 | 14 | 20> = {
  code: 'D4',
  name: 'Contingency & Reserve Governance',
  category: 'gov',
  maxPoints: 20,
  weightLabel: '20 pts',
  theoreticalBasis: 'Actuarial Capital Buffering & Sunk-Cost Management',
  options: [
    {
      value: 0,
      level: 0,
      label: 'Dedicated Ring-Fenced Reserve (>=25%)',
      description: 'Financial and timeline contingency ring-fenced under executive sponsor sole release.',
      criteria: 'Reserve intact; Monte Carlo simulation validates 90% confidence envelope.',
    },
    {
      value: 7,
      level: 1,
      label: 'Adequate Contingency (15-24%)',
      description: 'Standard 15% budget reserve allocated with formal drawdown criteria.',
      criteria: 'Drawdown logged against quantified risk registers; variance under control.',
    },
    {
      value: 14,
      level: 2,
      label: 'Depleted / Fictional Reserve (<10%)',
      description: 'Contingency was absorbed by initial procurement discounts or early baseline slip.',
      criteria: 'Zero buffer remaining; unforeseen technical debt immediately stalls program funding.',
    },
    {
      value: 20,
      level: 3,
      label: 'Negative Runway / Unfunded Deficit',
      description: 'Project is already operating in budget deficit with unapproved emergency credit.',
      criteria: 'Contractor invoices held back; program relies on end-of-year capital redistribution.',
    },
  ],
};

// D5: Architectural Complexity & Coupling (Max 15 pts: 0, 5, 10, 15)
export const D5_META: DimensionMetadata<0 | 5 | 10 | 15> = {
  code: 'D5',
  name: 'Architectural Complexity & Coupling',
  category: 'gov',
  maxPoints: 15,
  weightLabel: '15 pts',
  theoreticalBasis: 'Modular Insulation & Conways Law (Domain Boundaries)',
  options: [
    {
      value: 0,
      level: 0,
      label: 'Decoupled Event-Driven / Clean Interfaces',
      description: 'Strict API contracts, domain boundaries, and isolated microservices or modular packages.',
      criteria: 'Services deploy independently; failures contained within single sub-domain.',
    },
    {
      value: 5,
      level: 1,
      label: 'Modular Monolith with Defined Boundaries',
      description: 'Well-structured codebase with clear layer separation and shared database conventions.',
      criteria: 'Integration testing automated; cross-module regressions < 5% of releases.',
    },
    {
      value: 10,
      level: 2,
      label: 'Tight Synchronous Cross-System Locks',
      description: 'Distributed 2-phase commit or tight synchronous dependencies across legacy mainframes.',
      criteria: 'Releases require simultaneous synchronized downtime across 4+ enterprise platforms.',
    },
    {
      value: 15,
      level: 3,
      label: 'Monolithic Distributed Spaghetti Trap',
      description: 'Unbounded shared database tables, circular dependencies, and undocumented triggers.',
      criteria: 'Single line schema change cascades catastrophic outages across unrelated corporate portals.',
    },
  ],
};

// O1: Schedule Slip & Milestone Drift (Max 25 pts: 0, 8, 16, 25)
export const O1_META: DimensionMetadata<0 | 8 | 16 | 25> = {
  code: 'O1',
  name: 'Schedule Slip & Milestone Drift',
  category: 'del',
  maxPoints: 25,
  weightLabel: '25 pts',
  theoreticalBasis: 'Critical Path Analysis & Earned Schedule Telemetry',
  options: [
    {
      value: 0,
      level: 0,
      label: 'On Schedule / Ahead of Critical Path',
      description: 'Critical path milestones delivered on or ahead of baseline schedule.',
      criteria: 'SPI >= 1.0; zero critical path slippage in past 90 days.',
    },
    {
      value: 8,
      level: 1,
      label: 'Minor Non-Critical Path Slip (<10%)',
      description: 'Isolated sprint variances on non-critical deliverables easily absorbed.',
      criteria: 'SPI in [0.90, 0.99]; critical path milestone dates unaffected.',
    },
    {
      value: 16,
      level: 2,
      label: 'Substantial Milestone Compression (10-25%)',
      description: 'Key testing phases compressed to preserve artificial executive launch dates.',
      criteria: 'SPI in [0.75, 0.89]; release dates pushed back by 1-2 months; critical path compromised.',
    },
    {
      value: 25,
      level: 3,
      label: 'Runaway Critical Path Slip (>30%)',
      description: 'Major deliverable milestones missed repeatedly; zero credible schedule baseline.',
      criteria: 'SPI < 0.70; project timeline doubled without end-to-end integration proof.',
    },
  ],
};

// O2: Budget Burn & Capital Depletion (Max 20 pts: 0, 7, 13, 20)
export const O2_META: DimensionMetadata<0 | 7 | 13 | 20> = {
  code: 'O2',
  name: 'Budget Burn & Capital Depletion',
  category: 'del',
  maxPoints: 20,
  weightLabel: '20 pts',
  theoreticalBasis: 'Cost Performance Index (CPI) & Capital Efficiency',
  options: [
    {
      value: 0,
      level: 0,
      label: 'Optimal Burn Efficiency (CPI >= 1.0)',
      description: 'Capital expenditure tracks earned value deliverables dollar-for-dollar.',
      criteria: 'CPI >= 1.0; burn rate linear and aligned with verified functional progress.',
    },
    {
      value: 7,
      level: 1,
      label: 'Controlled Variance (CPI 0.90 - 0.99)',
      description: 'Minor variance attributable to temporary vendor onboarding or license ramp.',
      criteria: 'Budget burn tracks planned curves within 5% tolerance.',
    },
    {
      value: 13,
      level: 2,
      label: 'Accelerating Capital Drain (CPI 0.75 - 0.89)',
      description: 'Spending accelerates while software capability delivery slows down.',
      criteria: 'Overtime and emergency vendor augmentation inflating monthly spend by 25%+.',
    },
    {
      value: 20,
      level: 3,
      label: 'Runaway Burn / Severe Overrun (CPI < 0.75)',
      description: '70%+ of budget consumed with less than 35% of functional scope delivered.',
      criteria: 'Emergency capital requests required every quarter; burn rate entirely decoupled from value.',
    },
  ],
};

// O3: Defect Density & Unplanned Churn (Max 20 pts: 0, 7, 14, 20)
export const O3_META: DimensionMetadata<0 | 7 | 14 | 20> = {
  code: 'O3',
  name: 'Defect Density & Unplanned Churn',
  category: 'del',
  maxPoints: 20,
  weightLabel: '20 pts',
  theoreticalBasis: 'Quality Kinetics & Software Reliability Engineering',
  options: [
    {
      value: 0,
      level: 0,
      label: 'Zero Severe Defects / Flawless CI/CD',
      description: 'Automated test suites pass with >85% coverage; zero Sev-1/Sev-2 blockers.',
      criteria: 'Continuous delivery active; defect arrival rate < resolution rate in all sprints.',
    },
    {
      value: 7,
      level: 1,
      label: 'Contained Defect Inflow with Rapid Fixes',
      description: 'Manageable bug backlog resolved within standard sprint remediation cycles.',
      criteria: 'Mean time to resolve (MTTR) < 48 hours; release gates enforced cleanly.',
    },
    {
      value: 14,
      level: 2,
      label: 'Expanding Defect Inflow (Defects > Fixes)',
      description: 'New bug discovery consistently outpaces engineering capacity to patch them.',
      criteria: 'Sev-1/Sev-2 defects open for > 3 weeks; regression test cycle requires manual testing.',
    },
    {
      value: 20,
      level: 3,
      label: 'Terminal Defect Death Spiral',
      description: 'Deploying bug fixes triggers two new bugs elsewhere; code integrity collapsed.',
      criteria: 'Test environments constantly broken; release candidate rejected by business UAT 3+ times.',
    },
  ],
};

// O4: Team Cognitive Load & Turnover (Max 20 pts: 0, 7, 14, 20)
export const O4_META: DimensionMetadata<0 | 7 | 14 | 20> = {
  code: 'O4',
  name: 'Team Cognitive Load & Turnover',
  category: 'del',
  maxPoints: 20,
  weightLabel: '20 pts',
  theoreticalBasis: 'Team Topologies & Engineering Cognitive Fatigue',
  options: [
    {
      value: 0,
      level: 0,
      label: 'High Morale & Sustainable Cadence',
      description: 'Zero unplanned turnover; team has high psychological safety and clear focus.',
      criteria: 'Sprint velocity stable; sustainable 40-hr pace; team NPS > 60.',
    },
    {
      value: 7,
      level: 1,
      label: 'Manageable Pressure during Releases',
      description: 'Occasional late sprints before releases, compensated with time-in-lieu.',
      criteria: 'Turnover in line with industry average (<10%); strong team cohesion.',
    },
    {
      value: 14,
      level: 2,
      label: 'Chronic Overtime & Heroic Burnout',
      description: 'Delivery sustained only by weekend overtime of 2-3 key technical heroes.',
      criteria: 'Lead engineers express severe frustration; key person dependency risk is extreme.',
    },
    {
      value: 20,
      level: 3,
      label: 'Mass Resignations of Key Architects',
      description: 'Lead developers and architects resigning in protest; institutional memory erased.',
      criteria: 'Turnover > 30%; remaining team consists of junior offshore replacements lacking context.',
    },
  ],
};

// O5: Stakeholder Friction & Alignment (Max 15 pts: 0, 5, 10, 15)
export const O5_META: DimensionMetadata<0 | 5 | 10 | 15> = {
  code: 'O5',
  name: 'Stakeholder Friction & Alignment',
  category: 'del',
  maxPoints: 15,
  weightLabel: '15 pts',
  theoreticalBasis: 'Organizational Candor & The "Watermelon Effect" (Green Outside, Red Inside)',
  options: [
    {
      value: 0,
      level: 0,
      label: 'Transparent Candor & Trust',
      description: 'Status reports reflect ground truth with zero cosmetic filtering.',
      criteria: 'Bad news escalated immediately to steering committee without fear of punishment.',
    },
    {
      value: 5,
      level: 1,
      label: 'Constructive Business Partnership',
      description: 'Business and IT collaborate openly during sprint reviews and demos.',
      criteria: 'Stakeholders attend demos; feedback incorporated into next planning cycle.',
    },
    {
      value: 10,
      level: 2,
      label: 'Defensive Posturing & Blame Culture',
      description: 'Meetings dominated by finger-pointing between IT, operations, and external vendors.',
      criteria: 'Emails cc-ing legal/procurement; status reports selectively omit red risks.',
    },
    {
      value: 15,
      level: 3,
      label: 'Total Breakdown ("Watermelon Effect")',
      description: 'Steering reports show Green until the day before scheduled go-live, then collapse.',
      criteria: 'Executives blindsided by reality; mutual litigation threats between vendor and client.',
    },
  ],
};

export interface CockpitGovInputs {
  d1: 0 | 8 | 16 | 25;
  d2: 0 | 7 | 13 | 20;
  d3: 0 | 7 | 14 | 20;
  d4: 0 | 7 | 14 | 20;
  d5: 0 | 5 | 10 | 15;
}

export interface CockpitDelInputs {
  o1: 0 | 8 | 16 | 25;
  o2: 0 | 7 | 13 | 20;
  o3: 0 | 7 | 14 | 20;
  o4: 0 | 7 | 14 | 20;
  o5: 0 | 5 | 10 | 15;
}

export interface CockpitPresetScenario {
  id: string;
  name: string;
  subtitle: string;
  description: string;
  expectedQuadrant: CockpitQuadrantId;
  gov: CockpitGovInputs;
  del: CockpitDelInputs;
  expectedPenalty: boolean;
}

export const COCKPIT_PRESETS: CockpitPresetScenario[] = [
  {
    id: 'case-a-bi',
    name: 'Case A: Business Intelligence',
    subtitle: 'Balanced Multi-Vector Drift (Q1 Critical)',
    description: 'BI platform modernization suffering symmetric governance ambiguity and delivery friction.',
    expectedQuadrant: 'Q1',
    gov: { d1: 16, d2: 13, d3: 14, d4: 14, d5: 10 },
    del: { o1: 16, o2: 13, o3: 14, o4: 14, o5: 10 },
    expectedPenalty: false,
  },
  {
    id: 'case-b-cots',
    name: 'Case B: COTS Vendor Lock-in',
    subtitle: 'Predatory Contract + Paralyzed Sponsor (Q1 + 10 Penalty)',
    description: 'Off-the-shelf ERP replacement where absentee leadership is captured by predatory vendor billing.',
    expectedQuadrant: 'Q1',
    gov: { d1: 25, d2: 20, d3: 14, d4: 14, d5: 5 },
    del: { o1: 16, o2: 13, o3: 14, o4: 7, o5: 10 },
    expectedPenalty: true, // D1 === 25 && D2 >= 13
  },
  {
    id: 'case-c-modular',
    name: 'Case C: Modular Enterprise',
    subtitle: 'Decoupled Architecture Absorbing Governance Drag (Q2)',
    description: 'Toxic upstream steering committee, but decoupled microservice architecture insulates delivery.',
    expectedQuadrant: 'Q2',
    gov: { d1: 16, d2: 13, d3: 14, d4: 14, d5: 0 },
    del: { o1: 8, o2: 7, o3: 7, o4: 7, o5: 5 },
    expectedPenalty: false,
  },
  {
    id: 'case-d-resilient',
    name: 'Case D: Resilient Benchmark',
    subtitle: 'Lighthouse Target Operating Model (Q3 Stable)',
    description: 'Empowered single-point sponsor, outcome-aligned contract, clean architecture, and rapid CI/CD.',
    expectedQuadrant: 'Q3',
    gov: { d1: 0, d2: 0, d3: 7, d4: 0, d5: 0 },
    del: { o1: 8, o2: 0, o3: 7, o4: 7, o5: 0 },
    expectedPenalty: false,
  },
];

export interface CockpitEvaluation {
  gov: {
    rawBase: number;
    penalty: number;
    totalScore: number;
    breakdown: CockpitGovInputs;
  };
  del: {
    rawBase: number;
    penalty: number;
    totalScore: number;
    breakdown: CockpitDelInputs;
  };
  quadrant: CockpitQuadrant;
  inBufferZone: boolean;
  bufferDetails: {
    govInBuffer: boolean;
    delInBuffer: boolean;
    explanation: string;
  };
  hasGovPenalty: boolean;
  calculatedAt: string;
}

/**
 * Pure Deterministic DGRF Scoring Engine
 * Rule:
 * BaseGov = sum(D1..D5)
 * If (D1 === 25 && D2 >= 13) { PrjGov = Math.min(100, BaseGov + 10); } else { PrjGov = Math.min(100, BaseGov); }
 * BaseDel = sum(O1..O5)
 * PrjDel = Math.min(100, BaseDel);
 */
export function calculateCockpitDGRF(
  govInputs: CockpitGovInputs,
  delInputs: CockpitDelInputs
): CockpitEvaluation {
  const govBase = govInputs.d1 + govInputs.d2 + govInputs.d3 + govInputs.d4 + govInputs.d5;
  const hasGovPenalty = govInputs.d1 === 25 && govInputs.d2 >= 13;
  const govPenalty = hasGovPenalty ? 10 : 0;
  const govTotal = Math.min(100, Math.max(0, govBase + govPenalty));

  const delBase = delInputs.o1 + delInputs.o2 + delInputs.o3 + delInputs.o4 + delInputs.o5;
  const delTotal = Math.min(100, Math.max(0, delBase));

  // Buffer Zone: 40 to 60
  const govInBuffer = govTotal >= 40 && govTotal <= 60;
  const delInBuffer = delTotal >= 40 && delTotal <= 60;
  const inBufferZone = govInBuffer || delInBuffer;

  let explanation = 'Scores reside outside the ambiguous [40, 60] transitional corridor.';
  if (govInBuffer && delInBuffer) {
    explanation = `Dual-Axis Metastability: Both PrjGov (${govTotal}) and PrjDel (${delTotal}) lie within [40, 60]. Deterministic categorization is provisional; immediate qualitative audit is mandatory.`;
  } else if (govInBuffer) {
    explanation = `Governance Boundary Metastability: Structural Governance score (${govTotal}) is hovering within the [40, 60] transitional zone.`;
  } else if (delInBuffer) {
    explanation = `Delivery Boundary Metastability: Operational Delivery score (${delTotal}) is hovering within the [40, 60] execution transition corridor.`;
  }

  // Quadrant Assignment (Threshold theta = 50)
  // Q1: PrjGov > 50 && PrjDel > 50
  // Q2: PrjGov > 50 && PrjDel <= 50
  // Q3: PrjGov <= 50 && PrjDel <= 50
  // Q4: PrjGov <= 50 && PrjDel > 50
  let qId: CockpitQuadrantId = 'Q3';
  if (govTotal > 50 && delTotal > 50) {
    qId = 'Q1';
  } else if (govTotal > 50 && delTotal <= 50) {
    qId = 'Q2';
  } else if (govTotal <= 50 && delTotal <= 50) {
    qId = 'Q3';
  } else {
    qId = 'Q4';
  }

  const quadrant = COCKPIT_QUADRANTS[qId];

  return {
    gov: {
      rawBase: govBase,
      penalty: govPenalty,
      totalScore: govTotal,
      breakdown: { ...govInputs },
    },
    del: {
      rawBase: delBase,
      penalty: 0,
      totalScore: delTotal,
      breakdown: { ...delInputs },
    },
    quadrant,
    inBufferZone,
    bufferDetails: {
      govInBuffer,
      delInBuffer,
      explanation,
    },
    hasGovPenalty,
    calculatedAt: new Date().toISOString(),
  };
}
