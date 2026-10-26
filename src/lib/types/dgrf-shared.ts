/**
 * Delivery & Governance Risk Framework (DGRF)
 * Shared Core Types & Constants: Quadrant Geometry, Buffer Zone, & Anchor Standards
 * 
 * Reference: "Diagnosing Project Delivery Risk: A Two-Axis Governance Framework"
 * Ali Maleki (MBA, PMP) — PM World Journal (PMWJ), October 2026
 */

export type QuadrantId = 'Q1' | 'Q2' | 'Q3' | 'Q4';
export type AnchorLevel = 'L1' | 'L2' | 'L3' | 'L4';
export type DgrfDomain = 'project' | 'product';

export const DGRF_THRESHOLDS = {
  /** Decision boundary separating high risk (>50) from low/controlled risk (<=50) */
  THETA: 50,
  /** Lower boundary of empirical transitional buffer zone */
  BUFFER_LOWER: 40,
  /** Upper boundary of empirical transitional buffer zone */
  BUFFER_UPPER: 60,
  /** Absolute theoretical minimum score for 5 calibrated dimensions (L1 on all 5: 3+3+3+3+2) */
  ACTUARIAL_FLOOR: 14,
  /** Maximum unpenalized or penalized ceiling */
  ACTUARIAL_CEILING: 100,
  /** Standard non-linear interaction penalty magnitude */
  INTERACTION_PENALTY_POINTS: 10,
} as const;

export interface QuadrantDefinition {
  id: QuadrantId;
  name: string;
  clinicalName: string;
  badgeClass: string;
  themeColor: string;
  description: string;
  pathology: string;
  prescription: string;
}

/**
 * Project Mode (PrjModule) 2x2 Quadrant Taxonomy
 * Axis Y: Structural Governance (PrjGov)
 * Axis X: Operational Delivery (PrjDel)
 */
export const PRJ_QUADRANT_DEFINITIONS: Record<QuadrantId, QuadrantDefinition> = {
  Q1: {
    id: 'Q1',
    name: 'Systemic Fragility',
    clinicalName: 'Multi-Vector Failure Trajectory',
    badgeClass: 'bg-rose-500/10 text-rose-400 border-rose-500/30',
    themeColor: '#f43f5e',
    description: 'High Structural Governance Risk (PrjGov > 50) and High Operational Delivery Risk (PrjDel > 50).',
    pathology: 'Toxic contracts, diffuse governance, cascading critical-path slippage, and accelerating defect inflow.',
    prescription: 'Immediate Executive Stop-Work / Reset. Commercial renegotiation, baseline restructuring, or graceful termination.',
  },
  Q2: {
    id: 'Q2',
    name: 'Fragile Governance',
    clinicalName: 'Decoupled Governance Vulnerability',
    badgeClass: 'bg-amber-500/10 text-amber-400 border-amber-500/30',
    themeColor: '#f59e0b',
    description: 'High Structural Governance Risk (PrjGov > 50) and Controlled Operational Delivery Risk (PrjDel <= 50).',
    pathology: 'Competent delivery execution insulated temporarily by heroic efforts or modular architecture, but undermined by upstream procurement flaws or diffuse authority.',
    prescription: 'Upstream Governance Intervention. Clarify single-point executive sponsor mandate and renegotiate vendor terms before execution hits architectural coupling.',
  },
  Q3: {
    id: 'Q3',
    name: 'Resilient Conditions',
    clinicalName: 'Target Enterprise Benchmark',
    badgeClass: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30',
    themeColor: '#10b981',
    description: 'Controlled Structural Governance (PrjGov <= 50) and Controlled Operational Delivery (PrjDel <= 50).',
    pathology: 'Sound commercial risk alignment, empowered decision-making, predictable delivery velocity, and honest status candor.',
    prescription: 'Sustain & Protect. Maintain CCB discipline, protect contingency buffers, and defend team from scope creep.',
  },
  Q4: {
    id: 'Q4',
    name: 'Execution Constraint',
    clinicalName: 'Operational Delivery Bottleneck',
    badgeClass: 'bg-sky-500/10 text-sky-400 border-sky-500/30',
    themeColor: '#38bdf8',
    description: 'Controlled Structural Governance (PrjGov <= 50) and High Operational Delivery Risk (PrjDel > 50).',
    pathology: 'Sound governance mandate and contracts, but execution blocked by legacy technical drag, skill shortages, or optimistic estimation.',
    prescription: 'Operational Capacity Injection. Re-baseline sprint commitments, inject senior engineering talent, or descope low-priority features.',
  },
};

/**
 * Product Mode (PrdModule) 2x2 Quadrant Taxonomy
 * Axis Y: Product Operating Model Risk (PrdOps)
 * Axis X: Execution & Market Pull Risk (PrdDel)
 */
export const PRD_QUADRANT_DEFINITIONS: Record<QuadrantId, QuadrantDefinition> = {
  Q1: {
    id: 'Q1',
    name: 'Product Death Spiral',
    clinicalName: 'Terminal Irrelevance Trajectory',
    badgeClass: 'bg-rose-500/10 text-rose-400 border-rose-500/30',
    themeColor: '#f43f5e',
    description: 'High Operating Model Risk (PrdOps > 50) and High Execution/Market Pull Risk (PrdDel > 50).',
    pathology: 'Order-taking feature factory building unvalidated features that suffer terminal churn or negative retention.',
    prescription: 'Strategic Reset or Sunset. Halt feature delivery. Re-interview target users or gracefully decommission product.',
  },
  Q2: {
    id: 'Q2',
    name: 'The Zombie Product',
    clinicalName: 'Feature Factory Trap',
    badgeClass: 'bg-amber-500/10 text-amber-400 border-amber-500/30',
    themeColor: '#f59e0b',
    description: 'High Operating Model Risk (PrdOps > 50) and Controlled Delivery Execution (PrdDel <= 50).',
    pathology: 'Flawless failure paradox: engineering delivers on time with high velocity, but nobody uses or retains the features shipped.',
    prescription: 'Operating Model Turnaround. Abolish output roadmaps; empower product trios with outcome-based OKRs and mandatory weekly discovery.',
  },
  Q3: {
    id: 'Q3',
    name: 'Product-Led Engine',
    clinicalName: 'Scalable Value Machine',
    badgeClass: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30',
    themeColor: '#10b981',
    description: 'Controlled Operating Model Risk (PrdOps <= 50) and Strong Market Pull / Delivery (PrdDel <= 50).',
    pathology: 'Empowered product trios, continuous discovery habits, robust cohort retention flattening, and disciplined tech debt allocation.',
    prescription: 'Scale & Insulate. Expand market footprint while fiercely protecting team autonomy and preventing feature bloat.',
  },
  Q4: {
    id: 'Q4',
    name: 'Platform Bottleneck',
    clinicalName: 'Technical Debt Obstacle',
    badgeClass: 'bg-sky-500/10 text-sky-400 border-sky-500/30',
    themeColor: '#38bdf8',
    description: 'Controlled Operating Model (PrdOps <= 50) and High Delivery/Technical Friction (PrdDel > 50).',
    pathology: 'Strong product-market discovery and user empathy, but execution choked by brittle architecture, release bureaucracy, or cloud cost drag.',
    prescription: 'Engineering Capacity & Refactoring. Dedicate 40% of sprint capacity to platform refactoring, automated testing, and CI/CD pipelines.',
  },
};

export interface BufferZoneResult {
  inBufferZone: boolean;
  axis1InBuffer: boolean;
  axis2InBuffer: boolean;
  explanation: string;
}

export interface DimensionAnchor<T extends number = number> {
  level: AnchorLevel;
  score: T;
  title: string;
  description: string;
  benchmark: string;
}

export interface AxisEvaluation {
  rawBase: number;
  interactionPenalty: number;
  totalScore: number;
  normalizedPercentage: number;
  breakdown: Record<string, number>;
}

export interface DgrfEvaluationResult {
  domain: DgrfDomain;
  axisY: AxisEvaluation;
  axisX: AxisEvaluation;
  quadrant: QuadrantDefinition;
  bufferZone: BufferZoneResult;
  calculatedAt: string;
}

/**
 * Clamps a score between the DGRF floor and ceiling
 */
export function clampScore(
  score: number,
  min = DGRF_THRESHOLDS.ACTUARIAL_FLOOR,
  max = DGRF_THRESHOLDS.ACTUARIAL_CEILING
): number {
  return Math.max(min, Math.min(max, score));
}

/**
 * Tests whether a score falls inside the 40-60 transitional buffer zone
 */
export function isScoreInBufferZone(score: number): boolean {
  return score >= DGRF_THRESHOLDS.BUFFER_LOWER && score <= DGRF_THRESHOLDS.BUFFER_UPPER;
}

/**
 * Calculates the buffer zone status across both dimensions of a 2x2 matrix
 */
export function evaluateBufferZone(
  axisYScore: number,
  axisXScore: number,
  axisYLabel = 'Vertical Axis',
  axisXLabel = 'Horizontal Axis'
): BufferZoneResult {
  const axis1InBuffer = isScoreInBufferZone(axisYScore);
  const axis2InBuffer = isScoreInBufferZone(axisXScore);
  const inBufferZone = axis1InBuffer || axis2InBuffer;

  let explanation = `Both ${axisYLabel} and ${axisXLabel} reside outside the ambiguous [40, 60] transition corridor.`;
  if (axis1InBuffer && axis2InBuffer) {
    explanation = `Dual-Axis Metastability: Both ${axisYLabel} (${axisYScore}) and ${axisXLabel} (${axisXScore}) lie within [40, 60]. Categorization is provisional; qualitative clinical audit is mandatory.`;
  } else if (axis1InBuffer) {
    explanation = `${axisYLabel} Boundary Metastability: Score (${axisYScore}) is hovering within the [40, 60] critical transition corridor.`;
  } else if (axis2InBuffer) {
    explanation = `${axisXLabel} Boundary Metastability: Score (${axisXScore}) is hovering within the [40, 60] critical transition corridor.`;
  }

  return {
    inBufferZone,
    axis1InBuffer,
    axis2InBuffer,
    explanation,
  };
}

/**
 * Strict Quadrant Determination based on the published PMWJ formulation:
 * Threshold theta = 50:
 * - Q1: Y > 50 AND X > 50
 * - Q2: Y > 50 AND X <= 50
 * - Q3: Y <= 50 AND X <= 50
 * - Q4: Y <= 50 AND X > 50
 */
export function determineQuadrantId(
  yScore: number,
  xScore: number,
  theta = DGRF_THRESHOLDS.THETA
): QuadrantId {
  if (yScore > theta && xScore > theta) {
    return 'Q1';
  }
  if (yScore > theta && xScore <= theta) {
    return 'Q2';
  }
  if (yScore <= theta && xScore <= theta) {
    return 'Q3';
  }
  return 'Q4';
}
