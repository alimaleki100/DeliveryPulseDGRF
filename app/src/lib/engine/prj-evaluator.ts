/**
 * Delivery & Governance Risk Framework (DGRF) Mathematical Scoring Engine
 * Based on "Diagnosing Project Delivery Risk: A Governance and Execution Framework for Enterprise IT"
 * Author: Ali Maleki
 */

// --- 1. Type Definitions for Anchors ---

export type D1Anchor = 3 | 10 | 18 | 25;
export type D2Anchor = 3 | 9 | 15 | 20;
export type D3Anchor = 3 | 9 | 15 | 20;
export type D4Anchor = 3 | 8 | 14 | 20;
export type D5Anchor = 2 | 7 | 11 | 15;

export type O1Anchor = 3 | 10 | 18 | 25;
export type O2Anchor = 3 | 8 | 14 | 20;
export type O3Anchor = 3 | 8 | 14 | 20;
export type O4Anchor = 2 | 6 | 11 | 15;
export type O5Anchor = 3 | 8 | 14 | 20;

export type P1Anchor = 3 | 10 | 18 | 25;
export type P2Anchor = 3 | 8 | 14 | 20;
export type P3Anchor = 3 | 8 | 14 | 20;
export type P4Anchor = 2 | 6 | 11 | 15;
export type P5Anchor = 3 | 8 | 14 | 20;

export interface PrjGovInputs {
  d1: D1Anchor; // Authority (Max 25)
  d2: D2Anchor; // Procurement (Max 20)
  d3: D3Anchor; // Scope CCB (Max 20)
  d4: D4Anchor; // Risk Contingency (Max 20)
  d5: D5Anchor; // Architecture Coupling (Max 15)
}

export interface PrjDelInputs {
  o1: O1Anchor; // Schedule (Max 25)
  o2: O2Anchor; // Acceptance (Max 20)
  o3: O3Anchor; // Capital Efficiency (Max 20)
  o4: O4Anchor; // Team Morale (Max 15)
  o5: O5Anchor; // Reporting Truth (Max 20)
}

export interface PrjPreFlightInputs {
  p1: P1Anchor; // Estimation Rigor (Max 25)
  p2: P2Anchor; // Acceptance Definition (Max 20)
  p3: P3Anchor; // Capital Runway (Max 20)
  p4: P4Anchor; // Core Team Readiness (Max 15)
  p5: P5Anchor; // Observability Baseline (Max 20)
}

export type QuadrantId = 'Q1' | 'Q2' | 'Q3' | 'Q4';

export interface QuadrantDefinition {
  id: QuadrantId;
  name: string;
  tagline: string;
  clinicalSummary: string;
  recommendedAction: string;
  urgency: 'CRITICAL' | 'HIGH' | 'MODERATE' | 'LOW';
  themeColor: string;
  badgeClass: string;
}

export interface EvaluationResult {
  gov: {
    rawBase: number;
    penalty: number;
    totalScore: number;
    normalizedPercentage: number;
    breakdown: {
      d1: D1Anchor;
      d2: D2Anchor;
      d3: D3Anchor;
      d4: D4Anchor;
      d5: D5Anchor;
    };
  };
  del: {
    rawBase: number;
    penalty: number;
    totalScore: number;
    normalizedPercentage: number;
    breakdown: {
      o1: O1Anchor;
      o2: O2Anchor;
      o3: O3Anchor;
      o4: O4Anchor;
      o5: O5Anchor;
    };
  };
  quadrant: QuadrantDefinition;
  inBufferZone: boolean;
  bufferDetails: {
    govInBuffer: boolean;
    delInBuffer: boolean;
    explanation: string;
  };
  calculatedAt: string;
}

// --- 2. Descriptive Metadata for Interactive UI ---

export interface AnchorOption<T extends number> {
  value: T;
  level: 1 | 2 | 3 | 4;
  label: string;
  description: string;
}

export interface DimensionMeta<T extends number> {
  code: string;
  title: string;
  category: 'Structural Governance' | 'Operational Delivery' | 'Pre-Flight Readiness';
  maxPoints: number;
  weightLabel: string;
  description: string;
  options: AnchorOption<T>[];
}

export const PRJ_GOV_META: {
  d1: DimensionMeta<D1Anchor>;
  d2: DimensionMeta<D2Anchor>;
  d3: DimensionMeta<D3Anchor>;
  d4: DimensionMeta<D4Anchor>;
  d5: DimensionMeta<D5Anchor>;
} = {
  d1: {
    code: 'D1',
    title: 'Decision-Making Authority & Sponsorship',
    category: 'Structural Governance',
    maxPoints: 25,
    weightLabel: '25 pts',
    description: 'Measures executive alignment, unilateral mandate, and escalation velocity.',
    options: [
      { value: 3, level: 1, label: 'Single Accountable Owner', description: 'Single executive sponsor with unilateral decision mandate and direct budget discretion.' },
      { value: 10, level: 2, label: 'Structured Delegation', description: 'Clear steering sponsor with structured escalation protocols and bounded delegation.' },
      { value: 18, level: 3, label: 'Diffuse Consensus', description: 'Multi-stakeholder committee requiring consensus; cross-functional stalemates common.' },
      { value: 25, level: 4, label: 'Absentee / Paralyzed Ownership', description: 'Paralyzed decision rights, absentee sponsor, or active political infighting across C-suite.' },
    ],
  },
  d2: {
    code: 'D2',
    title: 'Procurement Alignment & Vendor Contracting',
    category: 'Structural Governance',
    maxPoints: 20,
    weightLabel: '20 pts',
    description: 'Incentive compatibility between enterprise principal and delivery partner/vendor.',
    options: [
      { value: 3, level: 1, label: 'Outcome-Aligned / Shared Risk', description: 'Shared risk-reward commercial terms tied directly to business milestone outcomes.' },
      { value: 9, level: 2, label: 'Time & Materials with Quality Gates', description: 'Capped T&M with rigorous sprint-level quality and velocity acceptance criteria.' },
      { value: 15, level: 3, label: 'Adversarial Fixed-Price', description: 'Rigid fixed-price contract with zero flexibility; heavy change-order penalty friction.' },
      { value: 20, level: 4, label: 'Predatory / Unaligned Cost-Plus', description: 'Predatory vendor lock-in or unaligned cost-plus structure with zero penalty for slippage.' },
    ],
  },
  d3: {
    code: 'D3',
    title: 'Scope Control & Change Control Board (CCB)',
    category: 'Structural Governance',
    maxPoints: 20,
    weightLabel: '20 pts',
    description: 'Discipline in protecting the core baseline and evaluating trade-offs.',
    options: [
      { value: 3, level: 1, label: 'Zero-Sum Trade-off Discipline', description: 'Rigorous CCB; every scope addition mandates dropping equivalent baseline complexity.' },
      { value: 9, level: 2, label: 'Formal Impact Verification', description: 'Empirical impact analysis before any scope approval; scheduled baseline reviews.' },
      { value: 15, level: 3, label: 'Permissive CCB Drift', description: 'Permissive change control with frequent ad-hoc emergency additions without budget adjustments.' },
      { value: 20, level: 4, label: 'Uncontrolled Backdoor Creep', description: 'Completely ungoverned scope expansion; continuous executive backdoor features.' },
    ],
  },
  d4: {
    code: 'D4',
    title: 'Risk Contingency & Reserves Allocation',
    category: 'Structural Governance',
    maxPoints: 20,
    weightLabel: '20 pts',
    description: 'Adequacy and control of unallocated schedule and capital buffers.',
    options: [
      { value: 3, level: 1, label: 'Ring-Fenced Buffer (>= 20%)', description: 'Actuarially validated contingency (>=20%) controlled solely by the delivery leadership.' },
      { value: 8, level: 2, label: 'Standard Reserve (10-15%)', description: 'Standard 10-15% reserve with clear governance drawdown protocol.' },
      { value: 14, level: 3, label: 'Depleted Reserve (< 5%)', description: 'Minimal buffer (<5%) prematurely absorbed into baseline by financial pressures.' },
      { value: 20, level: 4, label: 'Zero Contingency Buffer', description: 'Zero contingency reserve; any unexpected variance causes an immediate cash/delivery crisis.' },
    ],
  },
  d5: {
    code: 'D5',
    title: 'Architectural Coupling & Technical Governance',
    category: 'Structural Governance',
    maxPoints: 15,
    weightLabel: '15 pts',
    description: 'Autonomy of system boundaries vs legacy blast-radius entanglement.',
    options: [
      { value: 2, level: 1, label: 'Decoupled / Independent Deployability', description: 'Modular architecture with contract-tested APIs and automated backward compatibility.' },
      { value: 7, level: 2, label: 'Bounded Monolith', description: 'Well-defined bounded context with documented integration points.' },
      { value: 11, level: 3, label: 'Synchronous Legacy Coupling', description: 'High dependency on monolithic legacy core systems; synchronized release trains required.' },
      { value: 15, level: 4, label: 'Undocumented Spaghetti Monolith', description: 'Severe legacy entanglement; unknown blast radius with zero automated regression harness.' },
    ],
  },
};

export const PRJ_DEL_META: {
  o1: DimensionMeta<O1Anchor>;
  o2: DimensionMeta<O2Anchor>;
  o3: DimensionMeta<O3Anchor>;
  o4: DimensionMeta<O4Anchor>;
  o5: DimensionMeta<O5Anchor>;
} = {
  o1: {
    code: 'O1',
    title: 'Schedule Velocity & Critical Path Variance',
    category: 'Operational Delivery',
    maxPoints: 25,
    weightLabel: '25 pts',
    description: 'Milestone tracking and critical path divergence from target baseline.',
    options: [
      { value: 3, level: 1, label: 'Ahead / On Schedule (< 5% Var)', description: 'Tracking on or ahead of critical path schedule with zero baseline drift.' },
      { value: 10, level: 2, label: 'Minor Slippage (5-15% Var)', description: 'Manageable schedule variance absorbable within normal sprint tolerances.' },
      { value: 18, level: 3, label: 'Substantial Delay (15-30% Var)', description: 'Critical path delayed 15-30%; testing window compressed to preserve dates.' },
      { value: 25, level: 4, label: 'Severe Breakdown (> 30% Var)', description: 'Critical path blown by >30%; multiple cosmetic re-baselines masking delivery stall.' },
    ],
  },
  o2: {
    code: 'O2',
    title: 'Acceptance Testing & Defect Inflow',
    category: 'Operational Delivery',
    maxPoints: 20,
    weightLabel: '20 pts',
    description: 'Defect arrival vs burn-down, UAT pass rate, and technical debt build-up.',
    options: [
      { value: 3, level: 1, label: 'Defect Burn-down Exceeds Inflow', description: 'Automated test pass rate >95%; zero P1 release blockers; defect burn-down healthy.' },
      { value: 8, level: 2, label: 'Stable Defect Equilibrium', description: 'Manageable P2/P3 backlog with reliable workarounds; stable release cadence.' },
      { value: 14, level: 3, label: 'Defect Backlog Expanding', description: 'Defect arrival outpaces closure; critical P1 defects accumulating into release date.' },
      { value: 20, level: 4, label: 'Uncontrolled Quality Crisis', description: 'Severe test suite failures; QA bypassed or sign-offs coerced to hit arbitrary deadlines.' },
    ],
  },
  o3: {
    code: 'O3',
    title: 'Capital Efficiency & Cost Variance (CPI)',
    category: 'Operational Delivery',
    maxPoints: 20,
    weightLabel: '20 pts',
    description: 'Earned Value Management (EVM) Cost Performance Index and cash burn rate.',
    options: [
      { value: 3, level: 1, label: 'Optimal Efficiency (CPI >= 0.98)', description: 'Financial expenditure directly matches verified delivered capability.' },
      { value: 8, level: 2, label: 'Minor Burn Deviation (CPI 0.90-0.97)', description: 'Minor cost overrun with identified root causes and active remediation.' },
      { value: 14, level: 3, label: 'Severe Capital Bleed (CPI 0.75-0.89)', description: 'Significant burn acceleration without proportional software value delivered.' },
      { value: 20, level: 4, label: 'Runaway Burn Rate (CPI < 0.75)', description: 'Acute cash burn crisis; imminent capital exhaustion requiring emergency injection.' },
    ],
  },
  o4: {
    code: 'O4',
    title: 'Team Morale & Cognitive Load',
    category: 'Operational Delivery',
    maxPoints: 15,
    weightLabel: '15 pts',
    description: 'Engineering psychological safety, overtime hours, and flight intent.',
    options: [
      { value: 2, level: 1, label: 'High Cohesion & Psychological Safety', description: 'Sustainable 40hr cadence, high trust, zero voluntary turnover of lead personnel.' },
      { value: 6, level: 2, label: 'Periodic Crunch / Stable Core', description: 'Occasional release crunch; core engineering leadership stable and engaged.' },
      { value: 11, level: 3, label: 'Chronic Crunch (> 50 hrs/wk)', description: 'Chronic overtime; growing cynicism; key tech leads actively interviewing outside.' },
      { value: 15, level: 4, label: 'Acute Burnout & Lead Resignations', description: 'Toxic blame culture, departure of irreplaceable architects, engineering paralysis.' },
    ],
  },
  o5: {
    code: 'O5',
    title: 'Reporting Truth & "Watermelon Effect"',
    category: 'Operational Delivery',
    maxPoints: 20,
    weightLabel: '20 pts',
    description: 'Transparency of executive dashboard metrics vs engineering reality.',
    options: [
      { value: 3, level: 1, label: 'Radical Candor & Transparency', description: 'Unfiltered ground truth; defects and blockers surfaced immediately without fear.' },
      { value: 8, level: 2, label: 'Balanced Status Reporting', description: 'Minor administrative smoothing, but all core technical risks honestly escalated.' },
      { value: 14, level: 3, label: 'Pronounced "Watermelon Effect"', description: 'Executive dashboards report Green while engineering Slack channels report Red.' },
      { value: 20, level: 4, label: 'Systemic Metric Fabrication', description: 'Bad news actively suppressed; manufactured milestones; punitive culture.' },
    ],
  },
};

// --- 3. Quadrant Diagnostic Definitions ---

export const QUADRANT_DEFINITIONS: Record<QuadrantId, QuadrantDefinition> = {
  Q1: {
    id: 'Q1',
    name: 'Systemic Fragility',
    tagline: 'High Governance Risk (>=50) & High Delivery Risk (>=50)',
    clinicalSummary:
      'Catastrophic multi-vector breakdown. The initiative suffers simultaneously from fractured executive governance and failing delivery execution. Capital expenditure is disconnected from delivered business capability.',
    recommendedAction:
      'IMMEDIATE CAPITAL FREEZE / WORK-STOP. Cease sprint execution immediately. Replace diffuse steering committees with a single accountable executive, renegotiate or terminate adversarial vendor contracts, and cut scope to a viable core slice.',
    urgency: 'CRITICAL',
    themeColor: '#f43f5e',
    badgeClass: 'bg-rose-500/20 text-rose-400 border-rose-500/40',
  },
  Q2: {
    id: 'Q2',
    name: 'Fragile Governance',
    tagline: 'High Governance Risk (>=50) & Low Delivery Risk (<50)',
    clinicalSummary:
      'The "Heroic Engineers on a Sinking Ship" archetype. Delivery engineering is executing diligently and meeting technical milestones, but the structural foundations (contracts, sponsorship, scope control) are dysfunctional.',
    recommendedAction:
      'UPSTREAM STRUCTURAL INTERVENTION. Shield the delivery team from governance politics. Intervene at the steering committee level to enforce scope trade-offs and align vendor incentives before team burnout triggers a collapse into Q1.',
    urgency: 'HIGH',
    themeColor: '#f59e0b',
    badgeClass: 'bg-amber-500/20 text-amber-400 border-amber-500/40',
  },
  Q3: {
    id: 'Q3',
    name: 'Resilient Conditions',
    tagline: 'Low Governance Risk (<50) & Low Delivery Risk (<50)',
    clinicalSummary:
      'Target enterprise operating benchmark. Clear executive mandate, aligned vendor procurement, disciplined scope control, high engineering morale, and transparent reporting metrics.',
    recommendedAction:
      'AUTONOMOUS PRESERVATION. Protect the initiative from disruptive organizational reorganizations. Maintain current governance rhythms and conduct periodic health audits to detect early variance.',
    urgency: 'LOW',
    themeColor: '#10b981',
    badgeClass: 'bg-emerald-500/20 text-emerald-400 border-emerald-500/40',
  },
  Q4: {
    id: 'Q4',
    name: 'Execution Constraint',
    tagline: 'Low Governance Risk (<50) & High Delivery Risk (>=50)',
    clinicalSummary:
      'The "Sound Ship, Struggling Crew" archetype. Governance is clear, funding is secured, and sponsorship is committed, but ground execution is stalled by technical debt, skill shortages, or testing bottlenecks.',
    recommendedAction:
      'OPERATIONAL ENABLEMENT & DEBT REFACTORING. Do NOT add administrative governance or more steering oversight. Inject senior principal architects, refactor testing automation pipelines, and reduce work-in-progress (WIP).',
    urgency: 'MODERATE',
    themeColor: '#38bdf8',
    badgeClass: 'bg-sky-500/20 text-sky-400 border-sky-500/40',
  },
};

// --- 4. Preset Scenarios for Rapid Executive Simulation ---

export interface PresetScenario {
  id: string;
  name: string;
  subtitle: string;
  expectedQuadrant: QuadrantId;
  gov: PrjGovInputs;
  del: PrjDelInputs;
}

export const PRESET_SCENARIOS: PresetScenario[] = [
  {
    id: 'legacy-core',
    name: 'Legacy Core Modernization',
    subtitle: 'High-stakes banking overhaul with diffuse committee & adversarial vendor',
    expectedQuadrant: 'Q1',
    gov: { d1: 25, d2: 15, d3: 15, d4: 14, d5: 11 }, // Raw: 80 + 10 penalty = 90
    del: { o1: 25, o2: 14, o3: 14, o4: 11, o5: 14 }, // Raw: 78 + 10 penalty = 88
  },
  {
    id: 'heroic-ship',
    name: 'Heroic Engineers on a Sinking Ship',
    subtitle: 'Exceptional engineering talent battling toxic politics and scope creep',
    expectedQuadrant: 'Q2',
    gov: { d1: 25, d2: 15, d3: 20, d4: 14, d5: 11 }, // High Gov (85+)
    del: { o1: 3, o2: 8, o3: 8, o4: 11, o5: 8 },      // Low Del (<40)
  },
  {
    id: 'resilient-benchmark',
    name: 'Cloud-Native Value Stream',
    subtitle: 'Single-threaded executive sponsor, outcome contracts & automated CI/CD',
    expectedQuadrant: 'Q3',
    gov: { d1: 3, d2: 3, d3: 3, d4: 3, d5: 2 },       // Optimal Gov (14)
    del: { o1: 3, o2: 3, o3: 3, o4: 2, o5: 3 },       // Optimal Del (14)
  },
  {
    id: 'execution-drag',
    name: 'Well-Funded Technical Debt Trap',
    subtitle: 'Supportive board and solid budget, but paralyzed by monolithic legacy debt',
    expectedQuadrant: 'Q4',
    gov: { d1: 3, d2: 9, d3: 9, d4: 8, d5: 7 },       // Low Gov (36)
    del: { o1: 25, o2: 14, o3: 14, o4: 11, o5: 8 },   // High Del (72 + 10 = 82)
  },
  {
    id: 'metastable-buffer',
    name: 'Metastable Tipping Point (Buffer Zone)',
    subtitle: 'Initiative teetering on the 40-60 transition threshold requiring intervention',
    expectedQuadrant: 'Q1',
    gov: { d1: 10, d2: 9, d3: 9, d4: 14, d5: 7 },     // Gov: 49 (Buffer Zone)
    del: { o1: 10, o2: 14, o3: 8, o4: 11, o5: 8 },    // Del: 51 (Buffer Zone)
  },
];

// --- 5. Pure Scoring Logic & Functions ---

export function evaluatePrjGov(inputs: PrjGovInputs): {
  rawBase: number;
  penalty: number;
  totalScore: number;
  normalizedPercentage: number;
} {
  const { d1, d2, d3, d4, d5 } = inputs;
  const rawBase = d1 + d2 + d3 + d4 + d5;

  // Revised Structural Interaction Rule:
  // Penalty_gov = 10 if D1 === 25 && D2 >= 15, else 0
  const penalty = d1 === 25 && d2 >= 15 ? 10 : 0;
  const totalScore = Math.min(100, rawBase + penalty);

  return {
    rawBase,
    penalty,
    totalScore,
    normalizedPercentage: totalScore,
  };
}

export function evaluatePrjDel(inputs: PrjDelInputs): {
  rawBase: number;
  penalty: number;
  totalScore: number;
  normalizedPercentage: number;
} {
  const { o1, o2, o3, o4, o5 } = inputs;
  const rawBase = o1 + o2 + o3 + o4 + o5;

  // Revised Operational Interaction Rule:
  // Penalty_del = 10 if O1 === 25 && O2 >= 14, else 0
  const penalty = o1 === 25 && o2 >= 14 ? 10 : 0;
  const totalScore = Math.min(100, rawBase + penalty);

  return {
    rawBase,
    penalty,
    totalScore,
    normalizedPercentage: totalScore,
  };
}

export function evaluatePrjPreFlight(inputs: PrjPreFlightInputs): {
  rawBase: number;
  penalty: number;
  totalScore: number;
} {
  const { p1, p2, p3, p4, p5 } = inputs;
  const rawBase = p1 + p2 + p3 + p4 + p5;

  // Preflight interaction: arbitrary deadline (P1=25) with missing acceptance (P2>=14)
  const penalty = p1 === 25 && p2 >= 14 ? 10 : 0;
  const totalScore = Math.min(100, rawBase + penalty);

  return {
    rawBase,
    penalty,
    totalScore,
  };
}

export function determineQuadrant(scoreGov: number, scoreDel: number): QuadrantDefinition {
  // Threshold = 50
  // Q1: Gov >= 50 && Del >= 50 (Systemic Fragility)
  // Q2: Gov >= 50 && Del < 50 (Fragile Governance)
  // Q3: Gov < 50 && Del < 50 (Resilient Conditions)
  // Q4: Gov < 50 && Del >= 50 (Execution Constraint)
  if (scoreGov >= 50 && scoreDel >= 50) {
    return QUADRANT_DEFINITIONS.Q1;
  }
  if (scoreGov >= 50 && scoreDel < 50) {
    return QUADRANT_DEFINITIONS.Q2;
  }
  if (scoreGov < 50 && scoreDel < 50) {
    return QUADRANT_DEFINITIONS.Q3;
  }
  return QUADRANT_DEFINITIONS.Q4;
}

export function isInBufferZone(scoreGov: number, scoreDel: number): boolean {
  // Flag inBufferZone = true if either score falls in [40, 60]
  return (scoreGov >= 40 && scoreGov <= 60) || (scoreDel >= 40 && scoreDel <= 60);
}

export function calculateDGRF(govInputs: PrjGovInputs, delInputs: PrjDelInputs): EvaluationResult {
  const govResult = evaluatePrjGov(govInputs);
  const delResult = evaluatePrjDel(delInputs);

  const govScore = govResult.totalScore;
  const delScore = delResult.totalScore;

  const govInBuffer = govScore >= 40 && govScore <= 60;
  const delInBuffer = delScore >= 40 && delScore <= 60;
  const inBufferZone = govInBuffer || delInBuffer;

  let bufferExplanation = 'Both governance and delivery scores reside outside the ambiguous [40, 60] transition corridor.';
  if (govInBuffer && delInBuffer) {
    bufferExplanation = 'Dual-Axis Metastability: Both Governance and Delivery scores lie within [40, 60]. Deterministic categorization is provisional; immediate qualitative audit is mandatory.';
  } else if (govInBuffer) {
    bufferExplanation = 'Governance Boundary Metastability: Structural Governance score (40-60) is approaching the critical phase change threshold.';
  } else if (delInBuffer) {
    bufferExplanation = 'Delivery Boundary Metastability: Operational Delivery score (40-60) is hovering near the execution tipping point.';
  }

  const quadrant = determineQuadrant(govScore, delScore);

  return {
    gov: {
      rawBase: govResult.rawBase,
      penalty: govResult.penalty,
      totalScore: govScore,
      normalizedPercentage: govResult.normalizedPercentage,
      breakdown: { ...govInputs },
    },
    del: {
      rawBase: delResult.rawBase,
      penalty: delResult.penalty,
      totalScore: delScore,
      normalizedPercentage: delResult.normalizedPercentage,
      breakdown: { ...delInputs },
    },
    quadrant,
    inBufferZone,
    bufferDetails: {
      govInBuffer,
      delInBuffer,
      explanation: bufferExplanation,
    },
    calculatedAt: new Date().toISOString(),
  };
}
