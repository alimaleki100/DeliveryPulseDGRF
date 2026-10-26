/**
 * Delivery & Governance Risk Framework (DGRF)
 * PrjModule Core Calculation Engine
 * 
 * Formal implementation of Project Mode scoring:
 * - Structural Governance (PrjGov, Y-Axis): D1–D5
 * - Operational Delivery Live (PrjLive, X-Axis): O1–O5
 * - Operational Delivery Pre-Flight (PrjPreFlight, X-Axis): P1–P5
 * 
 * Reference: "Diagnosing Project Delivery Risk: A Two-Axis Governance Framework"
 * Ali Maleki (MBA, PMP) — PM World Journal (PMWJ), October 2026
 */

import {
  QuadrantId,
  QuadrantDefinition,
  PRJ_QUADRANT_DEFINITIONS,
  BufferZoneResult,
  evaluateBufferZone,
  determineQuadrantId,
  DGRF_THRESHOLDS,
  AxisEvaluation,
  clampScore,
} from '../types/dgrf-shared';

export type ProjectPhase = 'phase_zero' | 'active_execution' | 'cutover_stabilization';

export interface PrjGovInputs {
  d1: 3 | 10 | 18 | 25;
  d2: 3 | 9 | 15 | 20;
  d3: 3 | 9 | 15 | 20;
  d4: 3 | 8 | 14 | 20;
  d5: 2 | 7 | 11 | 15;
}

export interface PrjDelLiveInputs {
  o1: 3 | 10 | 18 | 25;
  o2: 3 | 8 | 14 | 20;
  o3: 3 | 8 | 14 | 20;
  o4: 3 | 8 | 14 | 20;
  o5: 2 | 7 | 11 | 15;
}

export interface PrjDelPreFlightInputs {
  p1: 3 | 10 | 18 | 25;
  p2: 3 | 8 | 14 | 20;
  p3: 3 | 8 | 14 | 20;
  p4: 3 | 8 | 14 | 20;
  p5: 2 | 7 | 11 | 15;
}

export const PRJ_GOV_ANCHORS = {
  d1: [3, 10, 18, 25] as const,
  d2: [3, 9, 15, 20] as const,
  d3: [3, 9, 15, 20] as const,
  d4: [3, 8, 14, 20] as const,
  d5: [2, 7, 11, 15] as const,
};

export const PRJ_DEL_LIVE_ANCHORS = {
  o1: [3, 10, 18, 25] as const,
  o2: [3, 8, 14, 20] as const,
  o3: [3, 8, 14, 20] as const,
  o4: [3, 8, 14, 20] as const,
  o5: [2, 7, 11, 15] as const,
};

export const PRJ_DEL_PREFLIGHT_ANCHORS = {
  p1: [3, 10, 18, 25] as const,
  p2: [3, 8, 14, 20] as const,
  p3: [3, 8, 14, 20] as const,
  p4: [3, 8, 14, 20] as const,
  p5: [2, 7, 11, 15] as const,
};

export const PHASE_SENSITIVITY_MULTIPLIERS: Record<ProjectPhase, number> = {
  phase_zero: 0.75,
  active_execution: 1.0,
  cutover_stabilization: 1.2,
};

export interface PrjEvaluationResult {
  domain: 'project';
  phase: ProjectPhase;
  activeDelSensor: 'PrjLive' | 'PrjPreFlight';
  gov: AxisEvaluation;
  del: AxisEvaluation;
  quadrant: QuadrantDefinition;
  bufferZone: BufferZoneResult;
  phaseSensitivity: {
    multiplier: number;
    scenarioGovScore: number;
    disclosureNote: string;
  };
  calculatedAt: string;
}

/**
 * Validates whether a value matches the anchor levels for a dimension, or snaps to nearest anchor
 */
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
 * Evaluates Structural Governance (PrjGov, Y-Axis)
 * Base Sum: min(100, sum(D1..D5)), Floor = 14
 * Interaction Penalty: +10 if D1 === 25 AND D2 >= 15
 * Final Score: min(100, Base + Penalty)
 */
export function evaluatePrjGov(inputs: PrjGovInputs): AxisEvaluation {
  const d1 = snapToAnchor(inputs.d1, PRJ_GOV_ANCHORS.d1);
  const d2 = snapToAnchor(inputs.d2, PRJ_GOV_ANCHORS.d2);
  const d3 = snapToAnchor(inputs.d3, PRJ_GOV_ANCHORS.d3);
  const d4 = snapToAnchor(inputs.d4, PRJ_GOV_ANCHORS.d4);
  const d5 = snapToAnchor(inputs.d5, PRJ_GOV_ANCHORS.d5);

  const rawBase = Math.min(100, Math.max(DGRF_THRESHOLDS.ACTUARIAL_FLOOR, d1 + d2 + d3 + d4 + d5));

  // Structural Interaction Penalty:
  // Paralyzed executive mandate (D1=25) locked into adversarial vendor risk (D2>=15)
  const interactionPenalty =
    d1 === 25 && d2 >= 15 ? DGRF_THRESHOLDS.INTERACTION_PENALTY_POINTS : 0;

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
 * Evaluates Live Operational Delivery (PrjLive, X-Axis)
 * Base Sum: min(100, sum(O1..O5)), Floor = 14
 * Interaction Penalty: +10 if O1 === 25 AND O2 >= 14
 * Final Score: min(100, Base + Penalty)
 */
export function evaluatePrjDelLive(inputs: PrjDelLiveInputs): AxisEvaluation {
  const o1 = snapToAnchor(inputs.o1, PRJ_DEL_LIVE_ANCHORS.o1);
  const o2 = snapToAnchor(inputs.o2, PRJ_DEL_LIVE_ANCHORS.o2);
  const o3 = snapToAnchor(inputs.o3, PRJ_DEL_LIVE_ANCHORS.o3);
  const o4 = snapToAnchor(inputs.o4, PRJ_DEL_LIVE_ANCHORS.o4);
  const o5 = snapToAnchor(inputs.o5, PRJ_DEL_LIVE_ANCHORS.o5);

  const rawBase = Math.min(100, Math.max(DGRF_THRESHOLDS.ACTUARIAL_FLOOR, o1 + o2 + o3 + o4 + o5));

  // Operational Interaction Penalty:
  // Severe critical path slip (O1=25) compounding uncontained defect inflow (O2>=14)
  const interactionPenalty =
    o1 === 25 && o2 >= 14 ? DGRF_THRESHOLDS.INTERACTION_PENALTY_POINTS : 0;

  const totalScore = Math.min(100, rawBase + interactionPenalty);

  return {
    rawBase,
    interactionPenalty,
    totalScore,
    normalizedPercentage: totalScore,
    breakdown: { o1, o2, o3, o4, o5 },
  };
}

/**
 * Evaluates Pre-Flight Baseline Delivery (PrjPreFlight, X-Axis)
 * Base Sum: min(100, sum(P1..P5)), Floor = 14
 * Interaction Penalty: +10 if P1 === 25 AND P2 >= 14
 * Final Score: min(100, Base + Penalty)
 */
export function evaluatePrjDelPreFlight(inputs: PrjDelPreFlightInputs): AxisEvaluation {
  const p1 = snapToAnchor(inputs.p1, PRJ_DEL_PREFLIGHT_ANCHORS.p1);
  const p2 = snapToAnchor(inputs.p2, PRJ_DEL_PREFLIGHT_ANCHORS.p2);
  const p3 = snapToAnchor(inputs.p3, PRJ_DEL_PREFLIGHT_ANCHORS.p3);
  const p4 = snapToAnchor(inputs.p4, PRJ_DEL_PREFLIGHT_ANCHORS.p4);
  const p5 = snapToAnchor(inputs.p5, PRJ_DEL_PREFLIGHT_ANCHORS.p5);

  const rawBase = Math.min(100, Math.max(DGRF_THRESHOLDS.ACTUARIAL_FLOOR, p1 + p2 + p3 + p4 + p5));

  // Pre-Flight Interaction Penalty:
  // Mandated arbitrary deadline (P1=25) combined with subjective/missing acceptance gates (P2>=14)
  const interactionPenalty =
    p1 === 25 && p2 >= 14 ? DGRF_THRESHOLDS.INTERACTION_PENALTY_POINTS : 0;

  const totalScore = Math.min(100, rawBase + interactionPenalty);

  return {
    rawBase,
    interactionPenalty,
    totalScore,
    normalizedPercentage: totalScore,
    breakdown: { p1, p2, p3, p4, p5 },
  };
}

export interface CalculatePrjParams {
  gov: PrjGovInputs;
  phase?: ProjectPhase;
  delLive?: PrjDelLiveInputs;
  delPreFlight?: PrjDelPreFlightInputs;
}

/**
 * Main PrjModule Calculation Pipeline
 * Incorporates:
 * 1. Deterministic operational branching (PrjPreFlight for phase_zero; PrjLive for active/cutover)
 * 2. Strict anchor validation and floor/cap arithmetic
 * 3. Compounding 10-point interaction penalties
 * 4. 40-60 Transitional Buffer Zone evaluation
 * 5. Strict PMWJ Quadrant assignment (Threshold theta = 50)
 */
export function calculatePrjDGRF(params: CalculatePrjParams): PrjEvaluationResult {
  const phase = params.phase ?? 'active_execution';
  const govResult = evaluatePrjGov(params.gov);

  const isPreFlight = phase === 'phase_zero';
  const activeDelSensor: 'PrjLive' | 'PrjPreFlight' = isPreFlight ? 'PrjPreFlight' : 'PrjLive';

  let delResult: AxisEvaluation;
  if (isPreFlight) {
    const preFlightInputs: PrjDelPreFlightInputs = params.delPreFlight ?? {
      p1: 10,
      p2: 8,
      p3: 8,
      p4: 8,
      p5: 7,
    };
    delResult = evaluatePrjDelPreFlight(preFlightInputs);
  } else {
    const liveInputs: PrjDelLiveInputs = params.delLive ?? {
      o1: 10,
      o2: 8,
      o3: 8,
      o4: 8,
      o5: 7,
    };
    delResult = evaluatePrjDelLive(liveInputs);
  }

  const govScore = govResult.totalScore;
  const delScore = delResult.totalScore;

  // Buffer Zone Evaluation
  const bufferZone = evaluateBufferZone(
    govScore,
    delScore,
    'Structural Governance (PrjGov)',
    `Operational Delivery (${activeDelSensor})`
  );

  // Quadrant Determination
  const quadrantId = determineQuadrantId(govScore, delScore, DGRF_THRESHOLDS.THETA);
  const quadrant = PRJ_QUADRANT_DEFINITIONS[quadrantId];

  // Phase Multiplier Modeling (Sensitivity Only)
  const multiplier = PHASE_SENSITIVITY_MULTIPLIERS[phase] ?? 1.0;
  const scenarioGovScore = clampScore(Math.round(govScore * multiplier), DGRF_THRESHOLDS.ACTUARIAL_FLOOR, 100);

  return {
    domain: 'project',
    phase,
    activeDelSensor,
    gov: govResult,
    del: delResult,
    quadrant,
    bufferZone,
    phaseSensitivity: {
      multiplier,
      scenarioGovScore,
      disclosureNote:
        'Standard DGRF operational practice mandates reporting multiplier-unadjusted scores and project phase separately to prevent premature risk masking.',
    },
    calculatedAt: new Date().toISOString(),
  };
}
