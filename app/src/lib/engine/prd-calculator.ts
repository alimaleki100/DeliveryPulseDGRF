/**
 * Delivery & Governance Risk Framework (DGRF)
 * PrdModule Core Calculation Engine
 * 
 * Formal implementation of Product Mode scoring:
 * - Product Operating Model (PrdOps, Y-Axis): S1–S5
 * - Phase 1 Discovery & Hypothesis (PrdDisc, X-Axis): D1–D5
 * - Phase 2 PMF & Retention Dynamics (PrdFit, X-Axis): F1–F5
 * - Phase 3 Platform Scalability & Maturity (PrdScale, X-Axis): C1–C5
 * 
 * Reference: DGRF Product Value & Operating Model Framework
 */

import {
  QuadrantId,
  QuadrantDefinition,
  PRD_QUADRANT_DEFINITIONS,
  BufferZoneResult,
  evaluateBufferZone,
  determineQuadrantId,
  DGRF_THRESHOLDS,
  AxisEvaluation,
} from '../types/dgrf-shared';

export type ProductPhase = 'discovery' | 'growth' | 'scale';

export interface PrdOpsInputs {
  s1: 3 | 10 | 18 | 25; // Team Model & Decision Autonomy
  s2: 3 | 8 | 14 | 20;  // North Star & Outcome Focus
  s3: 3 | 8 | 14 | 20;  // Continuous Discovery Habits
  s4: 3 | 8 | 14 | 20;  // Domain Autonomy & System Boundaries
  s5: 2 | 6 | 11 | 15;  // Technical Debt Allocation & Architecture
}

export interface PrdDiscInputs {
  d1: 3 | 10 | 18 | 25; // Problem Severity & Urgent Need
  d2: 3 | 8 | 14 | 20;  // Customer Research Depth & Objectivity
  d3: 3 | 8 | 14 | 20;  // Prototype Validation Velocity
  d4: 3 | 8 | 14 | 20;  // Willingness to Pay & Skin-in-the-Game
  d5: 2 | 6 | 11 | 15;  // MVP Scoping Feasibility & Focus
}

export interface PrdFitInputs {
  f1: 3 | 10 | 18 | 25; // User Retention Curve Stability
  f2: 3 | 8 | 14 | 20;  // Core Feature Adoption & Habituation
  f3: 3 | 8 | 14 | 20;  // Feedback Loop Velocity & Responsiveness
  f4: 3 | 8 | 14 | 20;  // Organic Pull & Unit Economic Traction
  f5: 2 | 6 | 11 | 15;  // User Experience Friction & Defect Drag
}

export interface PrdScaleInputs {
  c1: 3 | 8 | 14 | 20;  // Feature Bloat & Surface Area Drag
  c2: 3 | 10 | 18 | 25; // Enterprise Churn & Net Revenue Retention
  c3: 3 | 8 | 14 | 20;  // Release Bureaucracy & Cycle Time
  c4: 3 | 8 | 14 | 20;  // Infrastructure Resilience & Traffic Spikes
  c5: 2 | 6 | 11 | 15;  // Platform Cost Efficiency & Gross Margin
}

export const PRD_OPS_ANCHORS = {
  s1: [3, 10, 18, 25] as const,
  s2: [3, 8, 14, 20] as const,
  s3: [3, 8, 14, 20] as const,
  s4: [3, 8, 14, 20] as const,
  s5: [2, 6, 11, 15] as const,
};

export const PRD_DISC_ANCHORS = {
  d1: [3, 10, 18, 25] as const,
  d2: [3, 8, 14, 20] as const,
  d3: [3, 8, 14, 20] as const,
  d4: [3, 8, 14, 20] as const,
  d5: [2, 6, 11, 15] as const,
};

export const PRD_FIT_ANCHORS = {
  f1: [3, 10, 18, 25] as const,
  f2: [3, 8, 14, 20] as const,
  f3: [3, 8, 14, 20] as const,
  f4: [3, 8, 14, 20] as const,
  f5: [2, 6, 11, 15] as const,
};

export const PRD_SCALE_ANCHORS = {
  c1: [3, 8, 14, 20] as const,
  c2: [3, 10, 18, 25] as const,
  c3: [3, 8, 14, 20] as const,
  c4: [3, 8, 14, 20] as const,
  c5: [2, 6, 11, 15] as const,
};

export interface PrdEvaluationResult {
  domain: 'product';
  phase: ProductPhase;
  activeSensor: 'PrdDisc' | 'PrdFit' | 'PrdScale';
  ops: AxisEvaluation;
  del: AxisEvaluation;
  quadrant: QuadrantDefinition;
  bufferZone: BufferZoneResult;
  calculatedAt: string;
}

export function snapToAnchor<T extends number>(value: number, allowedAnchors: readonly T[]): T {
  let closest = allowedAnchors[0];
  let minDiff = Math.abs(value - closest);
  for (const anchor of allowedAnchors) {
    const diff = Math.abs(value - anchor);
    if (diff < minDiff) {
      minDiff = diff;
      closest = anchor;
    }
  }
  return closest;
}

/**
 * Evaluates Product Operating Model (PrdOps, Y-Axis)
 * Base Sum: min(100, sum(S1..S5)), Floor = 14
 * Non-Linear Interaction Penalty (+10 pts):
 * Pure Feature Factory (S1=25) compounding Zero Outcome Instrumentation (S2>=14)
 * or Zero Customer Contact (S3>=14).
 */
export function evaluatePrdOps(inputs: PrdOpsInputs): AxisEvaluation {
  const s1 = snapToAnchor(inputs.s1, PRD_OPS_ANCHORS.s1);
  const s2 = snapToAnchor(inputs.s2, PRD_OPS_ANCHORS.s2);
  const s3 = snapToAnchor(inputs.s3, PRD_OPS_ANCHORS.s3);
  const s4 = snapToAnchor(inputs.s4, PRD_OPS_ANCHORS.s4);
  const s5 = snapToAnchor(inputs.s5, PRD_OPS_ANCHORS.s5);

  const rawBase = Math.min(100, Math.max(DGRF_THRESHOLDS.ACTUARIAL_FLOOR, s1 + s2 + s3 + s4 + s5));

  // Operating Model Interaction Penalty:
  // Pure Feature Factory with no outcome metrics or zero discovery contact
  const interactionPenalty =
    s1 === 25 && (s2 >= 14 || s3 >= 14) ? DGRF_THRESHOLDS.INTERACTION_PENALTY_POINTS : 0;

  const totalScore = Math.min(100, rawBase + interactionPenalty);

  return {
    rawBase,
    interactionPenalty,
    totalScore,
    normalizedPercentage: totalScore,
    breakdown: { s1, s2, s3, s4, s5 },
  };
}

/**
 * Evaluates Phase 1 Customer Discovery (PrdDisc, X-Axis)
 * Base Sum: min(100, sum(D1..D5)), Floor = 14
 * Interaction Penalty (+10 pts):
 * Hallucinated/Manufactured Problem (D1=25) combined with Zero Customer Interviews (D2>=14).
 */
export function evaluatePrdDisc(inputs: PrdDiscInputs): AxisEvaluation {
  const d1 = snapToAnchor(inputs.d1, PRD_DISC_ANCHORS.d1);
  const d2 = snapToAnchor(inputs.d2, PRD_DISC_ANCHORS.d2);
  const d3 = snapToAnchor(inputs.d3, PRD_DISC_ANCHORS.d3);
  const d4 = snapToAnchor(inputs.d4, PRD_DISC_ANCHORS.d4);
  const d5 = snapToAnchor(inputs.d5, PRD_DISC_ANCHORS.d5);

  const rawBase = Math.min(100, Math.max(DGRF_THRESHOLDS.ACTUARIAL_FLOOR, d1 + d2 + d3 + d4 + d5));

  // Discovery Interaction Penalty:
  // Fabricated problem ungrounded in any user interviews
  const interactionPenalty =
    d1 === 25 && d2 >= 14 ? DGRF_THRESHOLDS.INTERACTION_PENALTY_POINTS : 0;

  const totalScore = Math.min(100, rawBase + interactionPenalty);

  return {
    rawBase,
    interactionPenalty,
    totalScore,
    normalizedPercentage: totalScore,
    breakdown: { d1, d2, d3, d4, d5 },
  };
}

/**
 * Evaluates Phase 2 PMF & Retention (PrdFit, X-Axis)
 * Base Sum: min(100, sum(F1..F5)), Floor = 14
 * Interaction Penalty (+10 pts):
 * Terminal Decay / Leaky Bucket (F1=25) compounding Zero Organic Pull / Ad Dependency (F4>=14).
 */
export function evaluatePrdFit(inputs: PrdFitInputs): AxisEvaluation {
  const f1 = snapToAnchor(inputs.f1, PRD_FIT_ANCHORS.f1);
  const f2 = snapToAnchor(inputs.f2, PRD_FIT_ANCHORS.f2);
  const f3 = snapToAnchor(inputs.f3, PRD_FIT_ANCHORS.f3);
  const f4 = snapToAnchor(inputs.f4, PRD_FIT_ANCHORS.f4);
  const f5 = snapToAnchor(inputs.f5, PRD_FIT_ANCHORS.f5);

  const rawBase = Math.min(100, Math.max(DGRF_THRESHOLDS.ACTUARIAL_FLOOR, f1 + f2 + f3 + f4 + f5));

  // PMF Interaction Penalty:
  // Pouring capital into a leaky bucket with zero organic pull
  const interactionPenalty =
    f1 === 25 && f4 >= 14 ? DGRF_THRESHOLDS.INTERACTION_PENALTY_POINTS : 0;

  const totalScore = Math.min(100, rawBase + interactionPenalty);

  return {
    rawBase,
    interactionPenalty,
    totalScore,
    normalizedPercentage: totalScore,
    breakdown: { f1, f2, f3, f4, f5 },
  };
}

/**
 * Evaluates Phase 3 Platform Scalability & Maturity (PrdScale, X-Axis)
 * Base Sum: min(100, sum(C1..C5)), Floor = 14
 * Interaction Penalty (+10 pts):
 * Severe Enterprise Attrition (C2=25) compounding Catastrophic Feature Bloat (C1>=14)
 * or Release Bureaucracy (C3>=14).
 */
export function evaluatePrdScale(inputs: PrdScaleInputs): AxisEvaluation {
  const c1 = snapToAnchor(inputs.c1, PRD_SCALE_ANCHORS.c1);
  const c2 = snapToAnchor(inputs.c2, PRD_SCALE_ANCHORS.c2);
  const c3 = snapToAnchor(inputs.c3, PRD_SCALE_ANCHORS.c3);
  const c4 = snapToAnchor(inputs.c4, PRD_SCALE_ANCHORS.c4);
  const c5 = snapToAnchor(inputs.c5, PRD_SCALE_ANCHORS.c5);

  const rawBase = Math.min(100, Math.max(DGRF_THRESHOLDS.ACTUARIAL_FLOOR, c1 + c2 + c3 + c4 + c5));

  // Scale Interaction Penalty:
  // Enterprise logo churn/contraction amidst platform bloat or deployment paralysis
  const interactionPenalty =
    c2 === 25 && (c1 >= 14 || c3 >= 14) ? DGRF_THRESHOLDS.INTERACTION_PENALTY_POINTS : 0;

  const totalScore = Math.min(100, rawBase + interactionPenalty);

  return {
    rawBase,
    interactionPenalty,
    totalScore,
    normalizedPercentage: totalScore,
    breakdown: { c1, c2, c3, c4, c5 },
  };
}

export interface CalculatePrdParams {
  ops: PrdOpsInputs;
  phase?: ProductPhase;
  disc?: PrdDiscInputs;
  fit?: PrdFitInputs;
  scale?: PrdScaleInputs;
}

/**
 * Main PrdModule Calculation Pipeline
 * Incorporates:
 * 1. Adaptive horizontal routing based on product maturity phase (discovery -> PrdDisc, growth -> PrdFit, scale -> PrdScale)
 * 2. Strict anchor validation, floor of 14, and cap of 100
 * 3. 10-point non-linear interaction penalties on both axes
 * 4. 40-60 Transitional Buffer Zone evaluation
 * 5. Strict Product Quadrant assignment (Threshold theta = 50)
 */
export function calculatePrdDGRF(params: CalculatePrdParams): PrdEvaluationResult {
  const phase = params.phase ?? 'growth';
  const opsResult = evaluatePrdOps(params.ops);

  let activeSensor: 'PrdDisc' | 'PrdFit' | 'PrdScale';
  let delResult: AxisEvaluation;

  if (phase === 'discovery') {
    activeSensor = 'PrdDisc';
    const discInputs: PrdDiscInputs = params.disc ?? {
      d1: 10,
      d2: 8,
      d3: 8,
      d4: 8,
      d5: 6,
    };
    delResult = evaluatePrdDisc(discInputs);
  } else if (phase === 'scale') {
    activeSensor = 'PrdScale';
    const scaleInputs: PrdScaleInputs = params.scale ?? {
      c1: 8,
      c2: 10,
      c3: 8,
      c4: 8,
      c5: 6,
    };
    delResult = evaluatePrdScale(scaleInputs);
  } else {
    // Default to 'growth'
    activeSensor = 'PrdFit';
    const fitInputs: PrdFitInputs = params.fit ?? {
      f1: 10,
      f2: 8,
      f3: 8,
      f4: 8,
      f5: 6,
    };
    delResult = evaluatePrdFit(fitInputs);
  }

  const opsScore = opsResult.totalScore;
  const delScore = delResult.totalScore;

  // Buffer Zone Evaluation
  const bufferZone = evaluateBufferZone(
    opsScore,
    delScore,
    'Product Operating Model (PrdOps)',
    `Execution & Market Pull (${activeSensor})`
  );

  // Quadrant Determination
  const quadrantId = determineQuadrantId(opsScore, delScore, DGRF_THRESHOLDS.THETA);
  const quadrant = PRD_QUADRANT_DEFINITIONS[quadrantId];

  return {
    domain: 'product',
    phase,
    activeSensor,
    ops: opsResult,
    del: delResult,
    quadrant,
    bufferZone,
    calculatedAt: new Date().toISOString(),
  };
}
