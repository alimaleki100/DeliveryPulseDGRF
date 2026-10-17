/**
 * Google Gemini SDK Client & Executive Clinical Brief Generator
 * Powered by Gemini Flash
 */

import { EvaluationResult } from './engine/prj-evaluator';

export interface ClinicalBriefResponse {
  headline: string;
  executiveSummary: string;
  rootCauseAnalysis: string[];
  thirtyDayActionPlan: {
    stopImmediate: string[];
    startImmediate: string[];
    renegotiate: string[];
  };
  prognosticOutlook: string;
  source: 'gemini-flash' | 'deterministic-fallback';
}

export async function generateExecutiveBrief(
  evaluation: EvaluationResult,
  projectContext?: { name?: string; industry?: string; budget?: string }
): Promise<ClinicalBriefResponse> {
  const apiKey = process.env.GEMINI_API_KEY;

  if (!apiKey) {
    return generateDeterministicFallback(evaluation, projectContext);
  }

  const prompt = `
You are an elite Enterprise IT Governance and Turnaround Architect acting as a clinical advisor to the Board of Directors, CIO, and CTO.
Analyze the following Delivery & Governance Risk Framework (DGRF) assessment for:
Project Name: ${projectContext?.name || 'Enterprise Program'}
Industry: ${projectContext?.industry || 'Enterprise Corporate'}
Budget: ${projectContext?.budget || '$10M+'}

---
DGRF ASSESSMENT SCORES:
Structural Governance Score (PrjGov): ${evaluation.gov.totalScore} / 100 (Raw: ${evaluation.gov.rawBase}, Penalty: ${evaluation.gov.penalty})
- D1 Authority: ${evaluation.gov.breakdown.d1} / 25
- D2 Procurement: ${evaluation.gov.breakdown.d2} / 20
- D3 Scope CCB: ${evaluation.gov.breakdown.d3} / 20
- D4 Risk Contingency: ${evaluation.gov.breakdown.d4} / 20
- D5 Architecture Coupling: ${evaluation.gov.breakdown.d5} / 15

Operational Delivery Score (PrjDel): ${evaluation.del.totalScore} / 100 (Raw: ${evaluation.del.rawBase}, Penalty: ${evaluation.del.penalty})
- O1 Schedule: ${evaluation.del.breakdown.o1} / 25
- O2 Acceptance: ${evaluation.del.breakdown.o2} / 20
- O3 Capital Efficiency: ${evaluation.del.breakdown.o3} / 20
- O4 Team Morale: ${evaluation.del.breakdown.o4} / 15
- O5 Reporting Truth: ${evaluation.del.breakdown.o5} / 20

Diagnostic Quadrant: ${evaluation.quadrant.id} (${evaluation.quadrant.name})
In Buffer Zone [40-60]: ${evaluation.inBufferZone ? 'YES - Metastable boundary conditions' : 'NO'}

---
TASK:
Produce an incisive, clinical, executive-grade diagnostic brief. Be direct, authoritative, and eliminate corporate euphemisms. 
Output strictly valid JSON with this exact schema:
{
  "headline": "One punchy sentence summarizing the clinical status",
  "executiveSummary": "2-3 concise paragraphs of diagnostic assessment",
  "rootCauseAnalysis": [
    "Specific structural or operational failure mode 1",
    "Specific structural or operational failure mode 2",
    "Specific structural or operational failure mode 3"
  ],
  "thirtyDayActionPlan": {
    "stopImmediate": ["Action to cease immediately", "Action to cease immediately"],
    "startImmediate": ["Action to commence immediately", "Action to commence immediately"],
    "renegotiate": ["Contractual or governance terms to overhaul"]
  },
  "prognosticOutlook": "Prognosis over the next 90 days if interventions are not taken vs if taken."
}
Do not wrap in markdown fences or backticks. Return raw JSON only.
`;

  try {
    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          contents: [
            {
              role: 'user',
              parts: [{ text: prompt }],
            },
          ],
          generationConfig: {
            temperature: 0.2,
            responseMimeType: 'application/json',
          },
        }),
      }
    );

    if (!response.ok) {
      console.warn(`Gemini API returned status ${response.status}. Using deterministic fallback.`);
      return generateDeterministicFallback(evaluation, projectContext);
    }

    const data = await response.json();
    const candidateText = data.candidates?.[0]?.content?.parts?.[0]?.text;
    if (!candidateText) {
      return generateDeterministicFallback(evaluation, projectContext);
    }

    const cleaned = candidateText.replace(/^```json\s*/i, '').replace(/```\s*$/i, '').trim();
    const parsed = JSON.parse(cleaned);
    return {
      ...parsed,
      source: 'gemini-flash',
    };
  } catch (err) {
    console.error('Error generating brief with Gemini:', err);
    return generateDeterministicFallback(evaluation, projectContext);
  }
}

/**
 * Deterministic clinical intelligence engine fallback based on DGRF paper rules.
 */
export function generateDeterministicFallback(
  evaluation: EvaluationResult,
  projectContext?: { name?: string; industry?: string; budget?: string }
): ClinicalBriefResponse {
  const pName = projectContext?.name || 'The initiative';
  const qId = evaluation.quadrant.id;
  const isBuffer = evaluation.inBufferZone;
  const govPen = evaluation.gov.penalty > 0;
  const delPen = evaluation.del.penalty > 0;

  if (qId === 'Q1') {
    return {
      headline: `Acute Systemic Fragility: ${pName} is burning capital with compounded structural paralysis and delivery collapse.`,
      executiveSummary: `${pName} exhibits simultaneous breakdown across both Structural Governance (${evaluation.gov.totalScore}/100) and Operational Delivery (${evaluation.del.totalScore}/100). ${
        govPen ? 'The presence of the D1-D2 Structural Interaction Penalty indicates that paralyzed decision rights are directly compounding adversarial vendor commercial friction.' : ''
      } ${
        delPen ? 'Concurrently, the O1-O2 Operational Interaction Penalty reveals that critical path schedule delays have triggered desperate quality shortcuts, causing an uncontrolled defect explosion.' : ''
      } Continuing business-as-usual execution represents fiduciary negligence; capital expenditure is decoupled from verified capability realization.`,
      rootCauseAnalysis: [
        `Governance Paralysis: Diffuse decision authority (D1: ${evaluation.gov.breakdown.d1}/25) leaves commercial and technical impediments unescalated.`,
        `Quality & Velocity Collapse: Critical path variance (O1: ${evaluation.del.breakdown.o1}/25) coupled with defect backlog (O2: ${evaluation.del.breakdown.o2}/20) has created an irreversible crunch spiral.`,
        `Information Filtering: Status reporting candor (O5: ${evaluation.del.breakdown.o5}/20) reflects severe "Watermelon Effect" masking reality from senior leadership.`,
      ],
      thirtyDayActionPlan: {
        stopImmediate: [
          'Halt all non-essential feature development and issue an immediate capital freeze.',
          'Cease all cosmetic milestone re-baselining until causal dependencies are mapped.',
        ],
        startImmediate: [
          'Appoint a single accountable turnaround executive with unilateral budget and scope discretion.',
          'Execute a zero-defect stabilization sprint focusing exclusively on release blockers.',
        ],
        renegotiate: [
          'Convert adversarial fixed-price vendor contracts into shared risk-reward milestones with performance gates.',
          'Restructure change control boards to enforce a strict zero-sum scope reduction policy.',
        ],
      },
      prognosticOutlook:
        'If unaddressed, total write-down or emergency contract termination will occur within 60 to 90 days. If the 30-day intervention is executed, the initiative can stabilize into Quadrant 4 within two quarters.',
      source: 'deterministic-fallback',
    };
  }

  if (qId === 'Q2') {
    return {
      headline: `Fragile Governance Trap: Exceptional engineering heroics are temporarily compensating for rotten upstream governance.`,
      executiveSummary: `${pName} is operating under the classic "Heroic Engineers on a Sinking Ship" dynamic. While operational delivery registers a viable score (${evaluation.del.totalScore}/100), structural governance risk is severely elevated (${evaluation.gov.totalScore}/100). The current delivery momentum is unsustainable and being subsidized by engineering overtime and emotional investment. Without prompt intervention at the steering committee level, team burnout will inevitably trigger an abrupt migration into Quadrant 1.`,
      rootCauseAnalysis: [
        `Sponsorship Deficit: Upstream governance (D1: ${evaluation.gov.breakdown.d1}/25) forces engineers to make business prioritization trade-offs without cover.`,
        `Scope Infiltration: Change control discipline (D3: ${evaluation.gov.breakdown.d3}/20) lacks zero-sum boundaries, continually leaking unvetted requirements into sprints.`,
        `Contingency Depletion: Capital reserves (D4: ${evaluation.gov.breakdown.d4}/20) provide inadequate runway to absorb legacy technical discoveries.`,
      ],
      thirtyDayActionPlan: {
        stopImmediate: [
          'Stop engineering teams from participating in multi-stakeholder consensus steering sessions.',
          'Cease absorbing ad-hoc executive backlog requests without formal CCB subtraction.',
        ],
        startImmediate: [
          'Establish an executive umbrella to insulate delivery squads from organizational politics.',
          'Implement explicit team cognitive load caps to protect lead architecture personnel.',
        ],
        renegotiate: [
          'Re-align commercial vendor statements of work to penalize scope churn rather than sprint velocity.',
          'Mandate formal board sign-off on a ring-fenced 20% financial and schedule contingency reserve.',
        ],
      },
      prognosticOutlook:
        'Left unmitigated, key architecture leads will resign within 90 days, triggering immediate schedule collapse into Q1. Immediate structural reform will transition this program into Quadrant 3 Resilient Conditions.',
      source: 'deterministic-fallback',
    };
  }

  if (qId === 'Q3') {
    return {
      headline: `Resilient Operating Benchmark: ${pName} demonstrates exemplary governance alignment and delivery discipline.`,
      executiveSummary: `${pName} registers in Quadrant 3 (${evaluation.gov.totalScore}/100 Gov, ${evaluation.del.totalScore}/100 Del), reflecting the target operating equilibrium for enterprise IT investments. Decision authority is single-threaded, vendor incentives are outcome-aligned, defect arrival is contained, and reporting candor is high. ${
        isBuffer ? 'Note: The program resides near the upper edge of the [40, 60] buffer zone; vigilance is required to prevent scope or architecture creep.' : 'The initiative serves as an organizational lighthouse.'
      }`,
      rootCauseAnalysis: [
        `Decisive Governance: Clear escalation pathways and accountable ownership (D1: ${evaluation.gov.breakdown.d1}/25) minimize decision latency.`,
        `Technical Integrity: Architectural coupling (D5: ${evaluation.gov.breakdown.d5}/15) is managed with clean contracts, enabling autonomous deployments.`,
        `Psychological Safety: Engineering morale (O4: ${evaluation.del.breakdown.o4}/15) and reporting truth (O5: ${evaluation.del.breakdown.o5}/20) reflect high candor without fear of reprisal.`,
      ],
      thirtyDayActionPlan: {
        stopImmediate: [
          'Resist top-down pressure to accelerate velocity beyond sustainable team cadence.',
          'Avoid introducing administrative reporting layers that dilute engineering focus.',
        ],
        startImmediate: [
          'Codify best practices into corporate engineering playbook for cross-program replication.',
          'Maintain automated regression coverage and DORA metric telemetry tracking.',
        ],
        renegotiate: [
          'Lock in long-term key talent retention packages for core architects and engineers.',
          'Extend outcome-based vendor contracts for subsequent release phases.',
        ],
      },
      prognosticOutlook:
        'High probability (>85%) of successful value realization on schedule and within budget, provided executive leadership prevents bureaucratic scope expansion.',
      source: 'deterministic-fallback',
    };
  }

  // Q4: Execution Constraint
  return {
    headline: `Execution Constraint: Sound governance charter compromised by technical debt and execution friction.`,
    executiveSummary: `${pName} exhibits strong structural governance (${evaluation.gov.totalScore}/100) but suffers from acute operational delivery drag (${evaluation.del.totalScore}/100). The steering committee is aligned, funding is secure, and decision rights are unambiguous; however, the ground delivery machinery is choking on legacy dependencies, testing bottlenecks, or skill mismatches. The common executive error in Q4 is adding more project managers or steering oversight; what is needed is pure engineering capability injection.`,
    rootCauseAnalysis: [
      `Technical & Tooling Debt: Defect burn-down (O2: ${evaluation.del.breakdown.o2}/20) or test automation bottlenecks are stalling feature release velocity.`,
      `Capacity & Skill Mismatch: Delivery squads lack specialized domain knowledge or are grappling with monolithic coupling (D5: ${evaluation.gov.breakdown.d5}/15).`,
      `Cognitive Fatigue: Team morale (O4: ${evaluation.del.breakdown.o4}/15) is deteriorating due to repetitive manual regression testing and release heroics.`,
    ],
    thirtyDayActionPlan: {
      stopImmediate: [
        'Do NOT add more status meetings, PMO governance layers, or steering oversight.',
        'Stop committing to new functional deliverables until testing pipelines are automated.',
      ],
      startImmediate: [
        'Deploy dedicated senior architecture advisors to unblock integration and testing pipelines.',
        'Slash work-in-progress (WIP) by 40% to allow teams to clear accumulated technical debt.',
      ],
      renegotiate: [
        'Augment vendor staffing with proven specialized technical leads in place of generalist developers.',
        'Allocate 30% of upcoming sprint capacity explicitly to architectural refactoring.',
      ],
    },
    prognosticOutlook:
      'With targeted technical enablement and WIP reduction, the program will transition into Quadrant 3 within 60 days. Adding governance overhead will demoralize engineering and trigger attrition.',
    source: 'deterministic-fallback',
  };
}
