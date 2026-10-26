/**
 * Tri-Agent Risk Advisory Squad & Gemini Flash Client
 * 
 * Powered by Google Gemini 2.5 Flash with Deterministic Enterprise Fallback.
 * 
 * Agents:
 * 1. Agent 1: Triage Lead (Identifies root cause failure vectors and active governance traps)
 * 2. Agent 2: Actuary (Analyzes capital burn velocity, contractual misalignment, and penalty triggers)
 * 3. Agent 3: Recovery Architect (Provides a prioritized 30-60-90 day intervention blueprint and 72-hour reset mandate)
 */

import { CockpitEvaluation } from './engine/cockpit-engine';

export interface TriAgentOutput {
  triageLead: {
    agentTitle: string;
    headline: string;
    diagnosticSummary: string;
    rootCauseVectors: {
      vectorNumber: number;
      title: string;
      severity: 'CRITICAL' | 'HIGH' | 'MODERATE' | 'LOW';
      mechanics: string;
    }[];
    activeGovernanceTraps: string[];
  };
  actuary: {
    agentTitle: string;
    headline: string;
    capitalBurnVelocity: string;
    contractualMisalignment: string;
    penaltyTriggerAnalysis: string;
    actuarialLossExposure: string;
    financialRiskRating: 'SEVERE DEFICIT' | 'UNCHECKED EROSION' | 'STABLE EQUILIBRIUM' | 'MODERATE DRAG';
    metricsSummary: {
      govScore: number;
      delScore: number;
      penaltyApplied: number;
      quadrantId: string;
    };
  };
  recoveryArchitect: {
    agentTitle: string;
    headline: string;
    seventyTwoHourMandate: {
      action: string;
      rationale: string;
      deliverable: string;
    };
    interventionBlueprint: {
      thirtyDay: string[];
      sixtyDay: string[];
      ninetyDay: string[];
    };
    exitCriteria: string;
  };
  metadata: {
    projectName: string;
    generatedAt: string;
    source: 'gemini-2.5-flash' | 'deterministic-tri-agent-fallback';
    authorCredit: string;
  };
}

export async function generateTriAgentBrief(
  evaluation: CockpitEvaluation,
  projectContext?: { name?: string; industry?: string; budget?: string }
): Promise<TriAgentOutput> {
  const apiKey = process.env.GEMINI_API_KEY;
  const projectName = projectContext?.name || 'Enterprise Program';

  if (!apiKey) {
    return generateDeterministicTriAgentFallback(evaluation, projectContext);
  }

  const prompt = `
You are the Lead Coordinator of the DGRF Tri-Agent Risk Advisory Squad, presenting an executive clinical brief to the Board of Directors, CIO, and Audit Committee.

PROJECT CONTEXT:
Name: ${projectName}
Industry: ${projectContext?.industry || 'Enterprise Corporate'}
Budget: ${projectContext?.budget || '$15M+'}

DGRF ACTUARIAL EVALUATION:
- Structural Governance Score (PrjGov): ${evaluation.gov.totalScore}/100 (Raw: ${evaluation.gov.rawBase}, Penalty: ${evaluation.gov.penalty})
  - D1 Decision Authority & Mandate: ${evaluation.gov.breakdown.d1} / 25
  - D2 Procurement & Vendor Risk: ${evaluation.gov.breakdown.d2} / 20
  - D3 Scope CCB & Baseline: ${evaluation.gov.breakdown.d3} / 20
  - D4 Contingency & Reserves: ${evaluation.gov.breakdown.d4} / 20
  - D5 Architectural Complexity: ${evaluation.gov.breakdown.d5} / 15
  - Interactive Penalty Active: ${evaluation.hasGovPenalty ? 'YES (+10 pts for D1=25 & D2>=13)' : 'NO'}

- Operational Delivery Score (PrjDel): ${evaluation.del.totalScore}/100 (Raw: ${evaluation.del.rawBase})
  - O1 Schedule Slip: ${evaluation.del.breakdown.o1} / 25
  - O2 Budget Burn: ${evaluation.del.breakdown.o2} / 20
  - O3 Defect Density: ${evaluation.del.breakdown.o3} / 20
  - O4 Cognitive Fatigue & Turnover: ${evaluation.del.breakdown.o4} / 20
  - O5 Stakeholder Friction: ${evaluation.del.breakdown.o5} / 15

- Diagnostic Quadrant: ${evaluation.quadrant.id} (${evaluation.quadrant.name}) - ${evaluation.quadrant.urgency}
- Buffer Zone [40-60]: ${evaluation.inBufferZone ? 'ACTIVE METASTABILITY' : 'RESOLVED'}

YOUR TASK:
Synthesize 3 distinct agent advisory viewpoints:
1. Agent 1: Triage Lead (Identifies root cause failure vectors and active governance traps).
2. Agent 2: Actuary (Analyzes capital burn velocity, contractual misalignment, and penalty triggers).
3. Agent 3: Recovery Architect (Provides a prioritized 30-60-90 day intervention blueprint and 72-hour reset mandate).

Output strictly valid JSON with NO surrounding markdown backticks or commentary matching this exact schema:
{
  "triageLead": {
    "agentTitle": "Agent 1: Triage Lead (Governance & Structural Diagnostics)",
    "headline": "String summarizing diagnosis",
    "diagnosticSummary": "Paragraph analyzing organizational failure modes",
    "rootCauseVectors": [
      { "vectorNumber": 1, "title": "Vector 1 Title", "severity": "CRITICAL", "mechanics": "Explanation" },
      { "vectorNumber": 2, "title": "Vector 2 Title", "severity": "HIGH", "mechanics": "Explanation" },
      { "vectorNumber": 3, "title": "Vector 3 Title", "severity": "HIGH", "mechanics": "Explanation" }
    ],
    "activeGovernanceTraps": ["Trap 1", "Trap 2"]
  },
  "actuary": {
    "agentTitle": "Agent 2: Actuary (Capital Velocity & Risk Modeling)",
    "headline": "String summarizing financial exposure",
    "capitalBurnVelocity": "Analysis of burn rate vs capability realization",
    "contractualMisalignment": "Analysis of commercial vendor incentives",
    "penaltyTriggerAnalysis": "Explanation of mathematical interaction penalties",
    "actuarialLossExposure": "Quantification of potential write-down",
    "financialRiskRating": "SEVERE DEFICIT",
    "metricsSummary": {
      "govScore": ${evaluation.gov.totalScore},
      "delScore": ${evaluation.del.totalScore},
      "penaltyApplied": ${evaluation.gov.penalty},
      "quadrantId": "${evaluation.quadrant.id}"
    }
  },
  "recoveryArchitect": {
    "agentTitle": "Agent 3: Recovery Architect (Intervention Engineering)",
    "headline": "String summarizing recovery posture",
    "seventyTwoHourMandate": {
      "action": "Immediate 72-hour emergency step",
      "rationale": "Why this must happen now",
      "deliverable": "Tangible artifact produced in 72 hours"
    },
    "interventionBlueprint": {
      "thirtyDay": ["Item 1", "Item 2", "Item 3"],
      "sixtyDay": ["Item 1", "Item 2"],
      "ninetyDay": ["Item 1", "Item 2"]
    },
    "exitCriteria": "Measurable threshold to exit current high-risk state"
  }
}
`;

  try {
    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${apiKey}`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          contents: [{ role: 'user', parts: [{ text: prompt }] }],
          generationConfig: {
            temperature: 0.2,
            responseMimeType: 'application/json',
          },
        }),
      }
    );

    if (!response.ok) {
      console.warn(`Gemini API error ${response.status}. Defaulting to deterministic Tri-Agent fallback.`);
      return generateDeterministicTriAgentFallback(evaluation, projectContext);
    }

    const data = await response.json();
    const rawText = data.candidates?.[0]?.content?.parts?.[0]?.text;
    if (!rawText) {
      return generateDeterministicTriAgentFallback(evaluation, projectContext);
    }

    const cleaned = rawText.replace(/^```json\s*/i, '').replace(/```\s*$/i, '').trim();
    const parsed = JSON.parse(cleaned);

    return {
      ...parsed,
      metadata: {
        projectName,
        generatedAt: new Date().toISOString(),
        source: 'gemini-2.5-flash',
        authorCredit: 'DGRF Framework authored by Ali Maleki',
      },
    };
  } catch (err) {
    console.error('Error invoking Gemini 2.5 Flash:', err);
    return generateDeterministicTriAgentFallback(evaluation, projectContext);
  }
}

/**
 * Deterministic Tri-Agent Advisory Engine Fallback (Zero-Latency / Offline)
 * Formulated upon Ali Maleki's DGRF peer-reviewed paper rules.
 */
export function generateDeterministicTriAgentFallback(
  evaluation: CockpitEvaluation,
  projectContext?: { name?: string; industry?: string; budget?: string }
): TriAgentOutput {
  const pName = projectContext?.name || 'The initiative';
  const qId = evaluation.quadrant.id;
  const hasPenalty = evaluation.hasGovPenalty;

  if (qId === 'Q1') {
    return {
      triageLead: {
        agentTitle: 'Agent 1: Triage Lead (Governance & Structural Diagnostics)',
        headline: `Acute Systemic Fragility: ${pName} is trapped in a multi-vector collapse trajectory.`,
        diagnosticSummary: `${pName} exhibits concurrent breakdown across both Structural Governance (${evaluation.gov.totalScore}/100) and Operational Delivery (${evaluation.del.totalScore}/100). Upstream decision rights have disintegrated, while ground delivery is overwhelmed by mounting schedule compression and defect inflow. Continuing execution without intervention constitutes fiduciary negligence.`,
        rootCauseVectors: [
          {
            vectorNumber: 1,
            title: 'Paralyzed Executive Decision Rights',
            severity: 'CRITICAL',
            mechanics: `Decision authority score (D1: ${evaluation.gov.breakdown.d1}/25) reflects diffuse accountability. Critical impediments stall for weeks across consensus committees.`,
          },
          {
            vectorNumber: 2,
            title: 'Adversarial Procurement Friction & Lock-in',
            severity: 'CRITICAL',
            mechanics: `Vendor risk allocation (D2: ${evaluation.gov.breakdown.d2}/20) incentivizes scope change requests rather than verified delivery milestone completion.`,
          },
          {
            vectorNumber: 3,
            title: 'Quality Kinetics Breakdown (Defect Inflow)',
            severity: 'HIGH',
            mechanics: `Defect density (O3: ${evaluation.del.breakdown.o3}/20) outpaces resolution capacity, triggering desperate testing shortcuts on the critical path (O1: ${evaluation.del.breakdown.o1}/25).`,
          },
        ],
        activeGovernanceTraps: [
          'The Watermelon Effect: Green dashboards presented to steering committees concealing red engineering realities.',
          hasPenalty ? 'Compound Authority-Vendor Lock-in: Paralyzed sponsor rights combined with predatory vendor billing.' : 'The Cosmetic Re-baseline Trap: Moving milestone dates without reducing scope or technical dependencies.',
        ],
      },
      actuary: {
        agentTitle: 'Agent 2: Actuary (Capital Velocity & Risk Modeling)',
        headline: `Runaway Capital Depletion: Spending is decoupled from verified capability realization.`,
        capitalBurnVelocity: `CPI is severely degraded. Capital expenditure is flowing into contractor overhead, change order negotiation, and regression defect firefighting rather than usable business software.`,
        contractualMisalignment: `Commercial terms reward the vendor for project duration and complexity rather than delivered business value. Contractual ambiguity creates an escalating change-request tollbooth.`,
        penaltyTriggerAnalysis: hasPenalty
          ? 'Mathematical Rule Triggered: D1=25 (Absentee Mandate) combined with D2>=13 (Adversarial Procurement) activates the +10 Nonlinear Interaction Penalty, driving composite Governance to ' + evaluation.gov.totalScore + '/100.'
          : 'Interactive threshold sitting at ' + evaluation.gov.rawBase + ' pts base governance. Further vendor friction will trigger the 10-point systemic penalty.',
        actuarialLossExposure: 'Estimated 65–85% loss of invested capital if program is not immediately restructured.',
        financialRiskRating: 'SEVERE DEFICIT',
        metricsSummary: {
          govScore: evaluation.gov.totalScore,
          delScore: evaluation.del.totalScore,
          penaltyApplied: evaluation.gov.penalty,
          quadrantId: 'Q1',
        },
      },
      recoveryArchitect: {
        agentTitle: 'Agent 3: Recovery Architect (Intervention Engineering)',
        headline: 'Emergency Turnaround Mandate: 72-Hour Capital Freeze & Architectural Reset.',
        seventyTwoHourMandate: {
          action: 'Institute an immediate 72-Hour Capital Freeze & dissolve multi-stakeholder consensus steering committee.',
          rationale: 'Stop ongoing capital bleeding and prevent vendors from logging unverified billable milestones.',
          deliverable: 'Board-mandated single turnaround officer appointed with unilateral veto authority over budget and scope.',
        },
        interventionBlueprint: {
          thirtyDay: [
            'Conduct an exhaustive zero-base scope audit: cut minimum 35% of secondary feature requirements.',
            'Restructure vendor contract from uncapped billing into 3 verifiable milestone deliverables with defect escrow.',
            'Establish an insulated 2-week stabilization sprint dedicated 100% to clearing Sev-1/Sev-2 blockers.',
          ],
          sixtyDay: [
            'Implement automated regression and deployment telemetry to eliminate manual status reporting.',
            'Re-baseline schedule using Monte Carlo probabilistic modeling with a 20% protected contingency reserve.',
          ],
          ninetyDay: [
            'Validate first end-to-end integration slice in staging environment under actual user traffic.',
            'Transition program from Q1 into Q4 (Execution Controlled) as governance parameters stabilize.',
          ],
        },
        exitCriteria: 'Composite PrjGov reduced below 50, zero open Sev-1 defect backlog, and SPI >= 0.90 across 3 consecutive sprints.',
      },
      metadata: {
        projectName: pName,
        generatedAt: new Date().toISOString(),
        source: 'deterministic-tri-agent-fallback',
        authorCredit: 'DGRF Framework authored by Ali Maleki',
      },
    };
  }

  if (qId === 'Q2') {
    return {
      triageLead: {
        agentTitle: 'Agent 1: Triage Lead (Governance & Structural Diagnostics)',
        headline: `Fragile Governance Trap: Ground delivery is temporarily subsidizing toxic upstream governance.`,
        diagnosticSummary: `${pName} is operating under the "Heroic Engineers on a Sinking Ship" dynamic. Operational delivery registers controlled risk (${evaluation.del.totalScore}/100), but Structural Governance is dangerously elevated (${evaluation.gov.totalScore}/100). The current progress is held together by lead engineer overtime and architecture insulation, but team burnout or contract disputes will cause a sudden cliff migration into Q1.`,
        rootCauseVectors: [
          {
            vectorNumber: 1,
            title: 'Diffuse Sponsor Ownership',
            severity: 'HIGH',
            mechanics: `Decision rights (D1: ${evaluation.gov.breakdown.d1}/25) require navigating political consensus rather than clear executive ownership.`,
          },
          {
            vectorNumber: 2,
            title: 'Scope Infiltration without CCB Balance',
            severity: 'HIGH',
            mechanics: `Scope governance (D3: ${evaluation.gov.breakdown.d3}/20) lacks zero-sum subtraction discipline, continually leaking executive pet features into sprints.`,
          },
          {
            vectorNumber: 3,
            title: 'Contingency Reserve Vulnerability',
            severity: 'MODERATE',
            mechanics: `Reserve governance (D4: ${evaluation.gov.breakdown.d4}/20) leaves zero financial margin to absorb legacy system integration hurdles.`,
          },
        ],
        activeGovernanceTraps: [
          'The Heroic Subsidy: Praising developers for late-night rescues instead of fixing upstream requirements chaos.',
          'The Scope Sponge: Delivery team absorbing ad-hoc stakeholder demands without contractual cost adjustments.',
        ],
      },
      actuary: {
        agentTitle: 'Agent 2: Actuary (Capital Velocity & Risk Modeling)',
        headline: `Hidden Contractual Risk: High burn efficiency masking upstream legal & scope exposure.`,
        capitalBurnVelocity: `Burn rate is currently efficient (CPI near baseline), but unapproved scope expansion is accumulating unfunded liabilities.`,
        contractualMisalignment: `Vendor is executing well technically but will seek contract re-negotiation or substantial claims once initial commitments are completed.`,
        penaltyTriggerAnalysis: hasPenalty
          ? 'Structural penalty active due to vendor lock-in. Governance reform required immediately.'
          : 'Structural score sitting at ' + evaluation.gov.totalScore + '/100. Any escalation in vendor disputes will cross into Q1 territory.',
        actuarialLossExposure: '30–45% risk of budget expansion when unmanaged scope surfaces during user acceptance testing.',
        financialRiskRating: 'UNCHECKED EROSION',
        metricsSummary: {
          govScore: evaluation.gov.totalScore,
          delScore: evaluation.del.totalScore,
          penaltyApplied: evaluation.gov.penalty,
          quadrantId: 'Q2',
        },
      },
      recoveryArchitect: {
        agentTitle: 'Agent 3: Recovery Architect (Intervention Engineering)',
        headline: 'Upstream Governance Lockdown: Protect Delivery Velocity and Re-anchor Mandate.',
        seventyTwoHourMandate: {
          action: 'Establish an executive umbrella locking the backlog and shielding delivery squads from political steering meetings.',
          rationale: 'Stop engineering leads from burning cognitive capacity on stakeholder diplomacy.',
          deliverable: 'Backlog intake freeze memorandum signed by C-level sponsor.',
        },
        interventionBlueprint: {
          thirtyDay: [
            'Empower a single Product Owner with exclusive backlog prioritization authority; eliminate stakeholder vetoes.',
            'Institute a strict zero-sum CCB policy: any new feature request must remove equal story points from the current release.',
            'Conduct a formal contract alignment check with vendor leadership to formalize scope boundaries.',
          ],
          sixtyDay: [
            'Re-fund contingency reserves to a minimum of 20% under sole sponsor control.',
            'Codify architectural contracts to ensure delivery decoupled from legacy enterprise silos.',
          ],
          ninetyDay: [
            'Transition program from Q2 into Q3 (Resilient Equilibrium) as upstream governance catches up to delivery excellence.',
          ],
        },
        exitCriteria: 'PrjGov reduced below 50, zero ad-hoc scope inclusions, and formalized sponsor escalation pathway.',
      },
      metadata: {
        projectName: pName,
        generatedAt: new Date().toISOString(),
        source: 'deterministic-tri-agent-fallback',
        authorCredit: 'DGRF Framework authored by Ali Maleki',
      },
    };
  }

  if (qId === 'Q4') {
    return {
      triageLead: {
        agentTitle: 'Agent 1: Triage Lead (Governance & Structural Diagnostics)',
        headline: `Execution Constraint: Strong governance charter blocked by ground-level delivery friction.`,
        diagnosticSummary: `${pName} exhibits healthy structural governance (${evaluation.gov.totalScore}/100) but suffers from acute operational delivery drag (${evaluation.del.totalScore}/100). Executive sponsorship is unified and funding is secure, but the delivery machinery is choking on legacy system coupling, test bottlenecks, or team fatigue.`,
        rootCauseVectors: [
          {
            vectorNumber: 1,
            title: 'Critical Path Schedule Friction',
            severity: 'CRITICAL',
            mechanics: `Schedule variance (O1: ${evaluation.del.breakdown.o1}/25) is slipping due to unpredicted integration complexity.`,
          },
          {
            vectorNumber: 2,
            title: 'Testing Automation & Defect Drag',
            severity: 'HIGH',
            mechanics: `Defect density (O3: ${evaluation.del.breakdown.o3}/20) is slowing sprint velocity due to excessive manual regression testing.`,
          },
          {
            vectorNumber: 3,
            title: 'Cognitive Load and Team Fatigue',
            severity: 'MODERATE',
            mechanics: `Engineering team morale (O4: ${evaluation.del.breakdown.o4}/20) is strained by frequent emergency patch deployments.`,
          },
        ],
        activeGovernanceTraps: [
          'The Oversight Fallacy: Adding more PMO status meetings and administrative reports to solve pure technical debt.',
          'The Sprint Crunch: Pressuring exhausted developers to work weekends instead of automating release pipelines.',
        ],
      },
      actuary: {
        agentTitle: 'Agent 2: Actuary (Capital Velocity & Risk Modeling)',
        headline: 'Execution Efficiency Deficit: Capital is available but technical friction delays realization.',
        capitalBurnVelocity: 'Burn rate is manageable, but schedule delays threaten market opportunity windows.',
        contractualMisalignment: 'Vendor relationships are healthy, but contractual staffing lacks specialized senior engineering talent in core integration areas.',
        penaltyTriggerAnalysis: 'Zero structural penalties active. Focus must remain on operational engineering unblocking.',
        actuarialLossExposure: '15–25% delay penalty risk unless testing automation is prioritized.',
        financialRiskRating: 'MODERATE DRAG',
        metricsSummary: {
          govScore: evaluation.gov.totalScore,
          delScore: evaluation.del.totalScore,
          penaltyApplied: evaluation.gov.penalty,
          quadrantId: 'Q4',
        },
      },
      recoveryArchitect: {
        agentTitle: 'Agent 3: Recovery Architect (Intervention Engineering)',
        headline: 'Technical Capacity Injection: Automate Pipelines & Slash Work-In-Progress.',
        seventyTwoHourMandate: {
          action: 'Slash Work-In-Progress (WIP) by 40% and abolish all non-essential administrative status meetings.',
          rationale: 'Give engineering teams immediate cognitive room to fix core CI/CD and architectural bottlenecks.',
          deliverable: 'Automated test pipeline audit and senior technical lead onboarding plan.',
        },
        interventionBlueprint: {
          thirtyDay: [
            'Dedicate the next 2 sprints exclusively to CI/CD pipeline automation and regression test suites.',
            'Augment team with 2 specialized senior platform engineers to resolve legacy coupling bottlenecks.',
            'Eliminate manual status slide decks; replace with automated Jira/Git telemetry.',
          ],
          sixtyDay: [
            'Achieve 80%+ automated regression test pass rates on all pull requests.',
            'Stabilize sprint velocity and reduce Mean Time To Recovery (MTTR) below 2 hours.',
          ],
          ninetyDay: [
            'Transition program from Q4 into Q3 (Resilient Equilibrium) as delivery drag dissolves.',
          ],
        },
        exitCriteria: 'PrjDel reduced below 50, critical path milestones on schedule, and automated release pipeline active.',
      },
      metadata: {
        projectName: pName,
        generatedAt: new Date().toISOString(),
        source: 'deterministic-tri-agent-fallback',
        authorCredit: 'DGRF Framework authored by Ali Maleki',
      },
    };
  }

  // Q3: Resilient Equilibrium
  return {
    triageLead: {
      agentTitle: 'Agent 1: Triage Lead (Governance & Structural Diagnostics)',
      headline: `Resilient Operating Equilibrium: ${pName} demonstrates exemplary enterprise delivery standards.`,
      diagnosticSummary: `${pName} resides firmly in Quadrant 3 (${evaluation.gov.totalScore}/100 Gov, ${evaluation.del.totalScore}/100 Del). Decision rights are single-threaded, vendor contracts are outcome-aligned, defect arrival is tightly controlled, and reporting candor is high. This program serves as an enterprise benchmark.`,
      rootCauseVectors: [
        {
          vectorNumber: 1,
          title: 'Exemplary Decision Clarity',
          severity: 'LOW',
          mechanics: `Single-point sponsor ownership (D1: ${evaluation.gov.breakdown.d1}/25) enables swift resolution of blockers.`,
        },
        {
          vectorNumber: 2,
          title: 'Decoupled Technical Architecture',
          severity: 'LOW',
          mechanics: `Modular boundaries (D5: ${evaluation.gov.breakdown.d5}/15) enable autonomous delivery squads without cascading regressions.`,
        },
        {
          vectorNumber: 3,
          title: 'Predictable Delivery Velocity',
          severity: 'LOW',
          mechanics: `Critical path milestones (O1: ${evaluation.del.breakdown.o1}/25) and defect containment (O3: ${evaluation.del.breakdown.o3}/20) track plans accurately.`,
        },
      ],
      activeGovernanceTraps: [
        'Complacency Trap: Allowing cosmetic scope creep or executive pet projects to infiltrate a high-performing baseline.',
        'Over-governance: Attempting to standardize or add bureaucratic reporting layers onto an already thriving initiative.',
      ],
    },
    actuary: {
      agentTitle: 'Agent 2: Actuary (Capital Velocity & Risk Modeling)',
      headline: 'Optimal Capital Efficiency: High ROI with predictable capital realization.',
      capitalBurnVelocity: 'CPI >= 1.0. Every invested dollar yields tangible, tested software capabilities aligned with business value.',
      contractualMisalignment: 'Shared risk-reward milestones successfully incentivize vendor delivery excellence and talent retention.',
      penaltyTriggerAnalysis: 'Zero structural or operational penalties. Model confirms robust mathematical margin.',
      actuarialLossExposure: '< 5% residual risk under standard enterprise market conditions.',
      financialRiskRating: 'STABLE EQUILIBRIUM',
      metricsSummary: {
        govScore: evaluation.gov.totalScore,
        delScore: evaluation.del.totalScore,
        penaltyApplied: evaluation.gov.penalty,
        quadrantId: 'Q3',
      },
    },
    recoveryArchitect: {
      agentTitle: 'Agent 3: Recovery Architect (Intervention Engineering)',
      headline: 'Sustain & Scale: Protect Team Autonomy and Codify Best Practices.',
      seventyTwoHourMandate: {
        action: 'Formally protect team charter and publish sprint velocity telemetry to executive board.',
        rationale: 'Prevent external interference while recognizing high-performing engineering culture.',
        deliverable: 'Executive program status brief confirming target milestone dates.',
      },
      interventionBlueprint: {
        thirtyDay: [
          'Maintain rigorous CCB zero-sum change discipline to prevent late-stage scope creep.',
          'Codify engineering practices (automated CI/CD, testing standards) for broader organization adoption.',
        ],
        sixtyDay: [
          'Lock in long-term key talent retention packages for core architects and engineers.',
          'Review post-launch operational readiness and transition to DevOps support.',
        ],
        ninetyDay: [
          'Execute scheduled production cutover with zero downtime deployment strategies.',
        ],
      },
      exitCriteria: 'Maintain PrjGov and PrjDel <= 50 through final go-live and stabilization.',
    },
    metadata: {
      projectName: pName,
      generatedAt: new Date().toISOString(),
      source: 'deterministic-tri-agent-fallback',
      authorCredit: 'DGRF Framework authored by Ali Maleki',
    },
  };
}

/**
 * Backward compatibility interface and adapter for ExecutiveSummary and LeadModal
 */
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
  evaluation: any,
  projectContext?: { name?: string; industry?: string; budget?: string }
): Promise<ClinicalBriefResponse> {
  const triAgent = await generateTriAgentBrief(evaluation, projectContext);
  return {
    headline: triAgent.triageLead.headline,
    executiveSummary: triAgent.triageLead.diagnosticSummary,
    rootCauseAnalysis: triAgent.triageLead.rootCauseVectors.map((v) => `${v.title}: ${v.mechanics}`),
    thirtyDayActionPlan: {
      stopImmediate: [triAgent.recoveryArchitect.seventyTwoHourMandate.action],
      startImmediate: triAgent.recoveryArchitect.interventionBlueprint.thirtyDay,
      renegotiate: [triAgent.actuary.contractualMisalignment],
    },
    prognosticOutlook: triAgent.actuary.actuarialLossExposure,
    source: triAgent.metadata.source === 'gemini-2.5-flash' ? 'gemini-flash' : 'deterministic-fallback',
  };
}

