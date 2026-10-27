/**
 * Tri-Agent Risk Advisory Squad & Gemini Flash Client
 * Dual-Mode Support: Project Mode & Product Mode
 * 
 * Powered by Google Gemini 2.5 Flash with Deterministic Enterprise Fallback.
 * 
 * Agents:
 * 1. Agent 1: Triage Lead (Identifies root cause failure vectors and active governance traps)
 * 2. Agent 2: Actuary (Analyzes capital burn velocity, contractual/unit-economic exposure, and penalty triggers)
 * 3. Agent 3: Recovery Architect (Provides a prioritized 30-60-90 day intervention blueprint and 72-hour reset mandate)
 */

import { DualModeEvaluation } from './engine/dual-mode-engine';

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
      mode: string;
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
    mode: string;
    phase: string;
    generatedAt: string;
    source: 'gemini-2.5-flash' | 'deterministic-tri-agent-fallback';
    authorCredit: string;
  };
}

export async function generateTriAgentBrief(
  evaluation: DualModeEvaluation,
  projectContext?: { name?: string; industry?: string; budget?: string }
): Promise<TriAgentOutput> {
  const apiKey = process.env.GEMINI_API_KEY;
  const initiativeName = projectContext?.name || (evaluation.mode === 'project' ? 'Enterprise Project' : 'Digital Product');

  if (!apiKey) {
    return generateDeterministicTriAgentFallback(evaluation, projectContext);
  }

  const prompt = `
You are the Lead Coordinator of the DGRF Tri-Agent Risk Advisory Squad, presenting an executive clinical brief to the Board of Directors, CIO, CPO, and Audit Committee.

INITIATIVE CONTEXT:
Name: ${initiativeName}
Mode: ${evaluation.mode === 'project' ? 'Enterprise Project Mode (DGRF-Project)' : 'Digital Product Mode (DGRF-Product / PrdModule)'}
Phase: ${evaluation.phaseName}
Industry: ${projectContext?.industry || 'Enterprise Corporate'}
Budget/Runway: ${projectContext?.budget || '$10M+'}

DGRF ASSESSMENT SCORES:
- Governance Axis (${evaluation.govAxisName}): ${evaluation.totalGov} / 100 (Raw: ${evaluation.rawGov}, Penalty: ${evaluation.govPenalty})
- Delivery / Traction Axis (${evaluation.delAxisName}): ${evaluation.totalDel} / 100 (Raw: ${evaluation.rawDel}, Penalty: ${evaluation.delPenalty})
- Penalty Trigger Status: ${evaluation.penaltyActive ? evaluation.penaltyMessage : 'No penalty triggered'}
- Diagnostic Quadrant: ${evaluation.quadrant.id} (${evaluation.quadrant.name}) - Urgency: ${evaluation.quadrant.urgency}
- Buffer Zone Status: ${evaluation.bufferZone.active ? 'METASTABLE [40-60]' : 'RESOLVED'}

DIMENSION BREAKDOWN:
${evaluation.dimensionBreakdown.map((d) => `- ${d.code} (${d.name}): ${d.value} / ${d.max} pts (${d.normPercent.toFixed(0)}%)`).join('\n')}

TASK:
Produce an incisive, clinical executive brief with 3 agent perspectives:
1. Agent 1: Triage Lead (Identifies root cause failure vectors and active governance traps).
2. Agent 2: Actuary (Analyzes capital burn velocity, contractual or unit economic misalignment, and penalty triggers).
3. Agent 3: Recovery Architect (Provides a prioritized 30-60-90 day intervention blueprint and 72-hour reset mandate).

Output strictly valid JSON with no markdown formatting backticks matching this schema:
{
  "triageLead": {
    "agentTitle": "Agent 1: Triage Lead (${evaluation.mode === 'project' ? 'Project Governance Diagnostics' : 'Product Strategy Diagnostics'})",
    "headline": "String headline",
    "diagnosticSummary": "Paragraph diagnostic analysis",
    "rootCauseVectors": [
      { "vectorNumber": 1, "title": "Title", "severity": "CRITICAL", "mechanics": "Detail" },
      { "vectorNumber": 2, "title": "Title", "severity": "HIGH", "mechanics": "Detail" },
      { "vectorNumber": 3, "title": "Title", "severity": "HIGH", "mechanics": "Detail" }
    ],
    "activeGovernanceTraps": ["Trap 1", "Trap 2"]
  },
  "actuary": {
    "agentTitle": "Agent 2: Actuary (Capital Velocity & Risk Modeling)",
    "headline": "Financial risk summary",
    "capitalBurnVelocity": "Burn rate analysis",
    "contractualMisalignment": "Contract or unit economic alignment analysis",
    "penaltyTriggerAnalysis": "Explanation of mathematical interaction penalties",
    "actuarialLossExposure": "Estimated loss or capital exposure",
    "financialRiskRating": "SEVERE DEFICIT",
    "metricsSummary": {
      "govScore": ${evaluation.totalGov},
      "delScore": ${evaluation.totalDel},
      "penaltyApplied": ${evaluation.govPenalty + evaluation.delPenalty},
      "quadrantId": "${evaluation.quadrant.id}",
      "mode": "${evaluation.mode}"
    }
  },
  "recoveryArchitect": {
    "agentTitle": "Agent 3: Recovery Architect (Intervention Engineering)",
    "headline": "Turnaround headline",
    "seventyTwoHourMandate": {
      "action": "Immediate 72-hour reset step",
      "rationale": "Why this must happen now",
      "deliverable": "Tangible artifact produced in 72h"
    },
    "interventionBlueprint": {
      "thirtyDay": ["Item 1", "Item 2", "Item 3"],
      "sixtyDay": ["Item 1", "Item 2"],
      "ninetyDay": ["Item 1", "Item 2"]
    },
    "exitCriteria": "Measurable threshold to exit high risk"
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
      console.warn(`Gemini API error ${response.status}. Using deterministic fallback.`);
      return generateDeterministicTriAgentFallback(evaluation, projectContext);
    }

    const data = await response.json();
    const candidateText = data.candidates?.[0]?.content?.parts?.[0]?.text;
    if (!candidateText) {
      return generateDeterministicTriAgentFallback(evaluation, projectContext);
    }

    const cleaned = candidateText.replace(/^```json\s*/i, '').replace(/```\s*$/i, '').trim();
    const parsed = JSON.parse(cleaned);

    return {
      ...parsed,
      metadata: {
        projectName: initiativeName,
        mode: evaluation.mode,
        phase: evaluation.phaseName,
        generatedAt: new Date().toISOString(),
        source: 'gemini-2.5-flash',
        authorCredit: 'DGRF Framework authored by Ali Maleki',
      },
    };
  } catch (err) {
    console.error('Error with Gemini Flash:', err);
    return generateDeterministicTriAgentFallback(evaluation, projectContext);
  }
}

/**
 * Deterministic Tri-Agent Advisory Fallback (Zero-Latency / Offline)
 * Formulated upon Ali Maleki's DGRF peer-reviewed paper rules.
 */
export function generateDeterministicTriAgentFallback(
  evaluation: DualModeEvaluation,
  projectContext?: { name?: string; industry?: string; budget?: string }
): TriAgentOutput {
  const pName = projectContext?.name || (evaluation.mode === 'project' ? 'Enterprise Project' : 'Digital Product');
  const qId = evaluation.quadrant.id;
  const isProj = evaluation.mode === 'project';

  if (isProj) {
    // Project Mode Fallback
    if (qId === 'Q1') {
      return {
        triageLead: {
          agentTitle: 'Agent 1: Triage Lead (Project Governance Diagnostics)',
          headline: `Acute Systemic Fragility: ${pName} is trapped in a multi-vector project collapse trajectory.`,
          diagnosticSummary: `${pName} exhibits concurrent breakdown across Structural Governance (${evaluation.totalGov}/100) and Operational Delivery (${evaluation.totalDel}/100) during ${evaluation.phaseName}. Sponsor decision rights have paralyzed, while critical path schedule slip and defect arrivals compound uncontrolled capital burn.`,
          rootCauseVectors: [
            {
              vectorNumber: 1,
              title: 'Absentee / Paralyzed Executive Mandate',
              severity: 'CRITICAL',
              mechanics: 'Diffuse steering committees and multi-stakeholder consensus paralyze decision rights. Architectural and scope trade-offs remain unescalated for weeks.',
            },
            {
              vectorNumber: 2,
              title: 'Adversarial Procurement & Vendor Lock-in',
              severity: 'CRITICAL',
              mechanics: 'Commercial terms incentivize the systems integrator to bill for delays and change orders rather than verified milestone outcomes.',
            },
            {
              vectorNumber: 3,
              title: 'Quality Kinetics & Schedule Compression',
              severity: 'HIGH',
              mechanics: 'Defect inflow exceeds resolution capacity, forcing engineering teams to compress UAT testing and accumulate critical path debt.',
            },
          ],
          activeGovernanceTraps: [
            'The Watermelon Effect: Status reports show green to steering committees while engineering is in continuous firefighting.',
            evaluation.penaltyActive
              ? 'Compounding Authority-Vendor Lock-in: D1=25 combined with D2>=13 triggers +10 penalty.'
              : 'Cosmetic Re-baselining: Pushing milestone dates without reducing scope or technical dependencies.',
          ],
        },
        actuary: {
          agentTitle: 'Agent 2: Actuary (Capital Velocity & Risk Modeling)',
          headline: `Runaway Capital Depletion: Spending is decoupled from verified capability realization.`,
          capitalBurnVelocity: `Cost Performance Index (CPI) is severely degraded. Capital expenditure is consumed by contractor overhead, change-order negotiation, and regression bug firefighting.`,
          contractualMisalignment: `Commercial statement of work rewards vendor duration. Change orders represent a continuous financial tollbooth.`,
          penaltyTriggerAnalysis: evaluation.penaltyActive
            ? 'Mathematical Rule Triggered: D1=25 (Absentee Mandate) combined with D2>=13 (Adversarial Procurement) activates the +10 Nonlinear Interaction Penalty on PrjGov.'
            : 'Unpenalized baseline. However, elevated governance risk exposes the enterprise to imminent cost escalation.',
          actuarialLossExposure: 'Estimated 65–85% loss of invested capital if program is not immediately restructured.',
          financialRiskRating: 'SEVERE DEFICIT',
          metricsSummary: {
            govScore: evaluation.totalGov,
            delScore: evaluation.totalDel,
            penaltyApplied: evaluation.govPenalty,
            quadrantId: 'Q1',
            mode: 'project',
          },
        },
        recoveryArchitect: {
          agentTitle: 'Agent 3: Recovery Architect (Intervention Engineering)',
          headline: 'Emergency Turnaround Mandate: 72-Hour Capital Freeze & Architectural Reset.',
          seventyTwoHourMandate: {
            action: evaluation.immediate72HourReset.action,
            rationale: 'Stop ongoing capital bleeding and prevent vendors from logging unverified billable milestones.',
            deliverable: evaluation.immediate72HourReset.deliverable,
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
          mode: 'project',
          phase: evaluation.phaseName,
          generatedAt: new Date().toISOString(),
          source: 'deterministic-tri-agent-fallback',
          authorCredit: 'DGRF Framework authored by Ali Maleki',
        },
      };
    }

    if (qId === 'Q2') {
      return {
        triageLead: {
          agentTitle: 'Agent 1: Triage Lead (Project Governance Diagnostics)',
          headline: `Fragile Governance Trap: Ground delivery is temporarily subsidizing toxic upstream governance.`,
          diagnosticSummary: `${pName} is operating under the classic "Heroic Engineers on a Sinking Ship" dynamic. Operational delivery registers viable metrics (${evaluation.totalDel}/100), but Structural Governance is severely elevated (${evaluation.totalGov}/100). The current delivery momentum is being subsidized by engineering overtime and modular insulation.`,
          rootCauseVectors: [
            {
              vectorNumber: 1,
              title: 'Diffuse Sponsor Ownership',
              severity: 'HIGH',
              mechanics: 'Decision rights require navigating political consensus rather than clear executive ownership.',
            },
            {
              vectorNumber: 2,
              title: 'Scope Infiltration without CCB Balance',
              severity: 'HIGH',
              mechanics: 'Scope governance lacks zero-sum subtraction discipline, continually leaking executive pet features into sprints.',
            },
            {
              vectorNumber: 3,
              title: 'Contingency Reserve Vulnerability',
              severity: 'MODERATE',
              mechanics: 'Reserve governance leaves zero financial margin to absorb legacy system integration hurdles.',
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
          contractualMisalignment: `Vendor is executing well technically but will seek contract re-negotiation or claims once initial commitments are completed.`,
          penaltyTriggerAnalysis: evaluation.penaltyActive
            ? 'Structural penalty active due to vendor lock-in. Governance reform required immediately.'
            : 'Structural score sitting at ' + evaluation.totalGov + '/100. Any escalation in vendor disputes will cross into Q1.',
          actuarialLossExposure: '30–45% risk of budget expansion when unmanaged scope surfaces during UAT.',
          financialRiskRating: 'UNCHECKED EROSION',
          metricsSummary: {
            govScore: evaluation.totalGov,
            delScore: evaluation.totalDel,
            penaltyApplied: evaluation.govPenalty,
            quadrantId: 'Q2',
            mode: 'project',
          },
        },
        recoveryArchitect: {
          agentTitle: 'Agent 3: Recovery Architect (Intervention Engineering)',
          headline: 'Upstream Governance Lockdown: Protect Delivery Velocity and Re-anchor Mandate.',
          seventyTwoHourMandate: {
            action: evaluation.immediate72HourReset.action,
            rationale: 'Stop engineering leads from burning cognitive capacity on stakeholder diplomacy.',
            deliverable: evaluation.immediate72HourReset.deliverable,
          },
          interventionBlueprint: {
            thirtyDay: [
              'Empower a single Product Owner with exclusive backlog prioritization authority; eliminate stakeholder vetoes.',
              'Institute a strict zero-sum CCB policy: any new feature request must remove equal story points from current release.',
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
          mode: 'project',
          phase: evaluation.phaseName,
          generatedAt: new Date().toISOString(),
          source: 'deterministic-tri-agent-fallback',
          authorCredit: 'DGRF Framework authored by Ali Maleki',
        },
      };
    }

    if (qId === 'Q4') {
      return {
        triageLead: {
          agentTitle: 'Agent 1: Triage Lead (Project Governance Diagnostics)',
          headline: `Execution Constraint: Strong governance charter blocked by ground-level delivery friction.`,
          diagnosticSummary: `${pName} exhibits healthy structural governance (${evaluation.totalGov}/100) but suffers from acute operational delivery drag (${evaluation.totalDel}/100). Executive sponsorship is unified and funding is secure, but the delivery machinery is choking on legacy system coupling or test bottlenecks.`,
          rootCauseVectors: [
            {
              vectorNumber: 1,
              title: 'Critical Path Schedule Friction',
              severity: 'CRITICAL',
              mechanics: 'Schedule variance is slipping due to unpredicted integration complexity and testing bottlenecks.',
            },
            {
              vectorNumber: 2,
              title: 'Testing Automation & Defect Drag',
              severity: 'HIGH',
              mechanics: 'Defect density is slowing sprint velocity due to excessive manual regression testing.',
            },
            {
              vectorNumber: 3,
              title: 'Cognitive Load and Team Fatigue',
              severity: 'MODERATE',
              mechanics: 'Engineering team morale is strained by frequent emergency patch deployments.',
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
            govScore: evaluation.totalGov,
            delScore: evaluation.totalDel,
            penaltyApplied: evaluation.govPenalty,
            quadrantId: 'Q4',
            mode: 'project',
          },
        },
        recoveryArchitect: {
          agentTitle: 'Agent 3: Recovery Architect (Intervention Engineering)',
          headline: 'Technical Capacity Injection: Automate Pipelines & Slash Work-In-Progress.',
          seventyTwoHourMandate: {
            action: evaluation.immediate72HourReset.action,
            rationale: 'Give engineering teams immediate cognitive room to fix core CI/CD and architectural bottlenecks.',
            deliverable: evaluation.immediate72HourReset.deliverable,
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
          mode: 'project',
          phase: evaluation.phaseName,
          generatedAt: new Date().toISOString(),
          source: 'deterministic-tri-agent-fallback',
          authorCredit: 'DGRF Framework authored by Ali Maleki',
        },
      };
    }

    // Q3 Resilient
    return {
      triageLead: {
        agentTitle: 'Agent 1: Triage Lead (Project Governance Diagnostics)',
        headline: `Resilient Operating Equilibrium: ${pName} demonstrates exemplary enterprise delivery standards.`,
        diagnosticSummary: `${pName} resides firmly in Quadrant 3 (${evaluation.totalGov}/100 Gov, ${evaluation.totalDel}/100 Del). Decision rights are single-threaded, vendor contracts are outcome-aligned, defect arrival is tightly controlled, and reporting candor is high.`,
        rootCauseVectors: [
          {
            vectorNumber: 1,
            title: 'Exemplary Decision Clarity',
            severity: 'LOW',
            mechanics: 'Single-point sponsor ownership enables swift resolution of blockers.',
          },
          {
            vectorNumber: 2,
            title: 'Decoupled Technical Architecture',
            severity: 'LOW',
            mechanics: 'Modular boundaries enable autonomous delivery squads without cascading regressions.',
          },
          {
            vectorNumber: 3,
            title: 'Predictable Delivery Velocity',
            severity: 'LOW',
            mechanics: 'Critical path milestones and defect containment track plans accurately.',
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
          govScore: evaluation.totalGov,
          delScore: evaluation.totalDel,
          penaltyApplied: evaluation.govPenalty,
          quadrantId: 'Q3',
          mode: 'project',
        },
      },
      recoveryArchitect: {
        agentTitle: 'Agent 3: Recovery Architect (Intervention Engineering)',
        headline: 'Sustain & Scale: Protect Team Autonomy and Codify Best Practices.',
        seventyTwoHourMandate: {
          action: evaluation.immediate72HourReset.action,
          rationale: 'Prevent external interference while recognizing high-performing engineering culture.',
          deliverable: evaluation.immediate72HourReset.deliverable,
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
        mode: 'project',
        phase: evaluation.phaseName,
        generatedAt: new Date().toISOString(),
        source: 'deterministic-tri-agent-fallback',
        authorCredit: 'DGRF Framework authored by Ali Maleki',
      },
    };
  }

  // ==========================================
  // Product Mode Fallback
  // ==========================================
  if (qId === 'Q1') {
    return {
      triageLead: {
        agentTitle: 'Agent 1: Triage Lead (Product Strategy Diagnostics)',
        headline: `Product Death Spiral: ${pName} is caught in terminal irrelevance and cohort collapse.`,
        diagnosticSummary: `${pName} exhibits severe strategic dysfunction (PrdGov: ${evaluation.totalGov}/100) and operational traction collapse (PrdDel: ${evaluation.totalDel}/100). The product is driven by top-down executive feature decrees without customer discovery, while users churn rapidly upon onboarding. Continuing to build features represents an existential drain on runway.`,
        rootCauseVectors: [
          {
            vectorNumber: 1,
            title: 'HiPPO-Driven Feature Factory',
            severity: 'CRITICAL',
            mechanics: 'Roadmap is dictated top-down by sales deals or executive intuition with zero customer discovery.',
          },
          {
            vectorNumber: 2,
            title: 'Catastrophic Leaky Bucket Churn',
            severity: 'CRITICAL',
            mechanics: 'Day 30 cohort retention decays straight to zero; user acquisition is completely subsidized by unsustainable ad spend.',
          },
          {
            vectorNumber: 3,
            title: 'Blind Cockpit (Telemetry Vacuum)',
            severity: 'HIGH',
            mechanics: 'Zero behavioral product telemetry installed; leadership makes roadmap decisions based on anecdotal opinions.',
          },
        ],
        activeGovernanceTraps: [
          'The Next Feature Fallacy: Believing that shipping one more bespoke feature will solve fundamental lack of product-market fit.',
          evaluation.penaltyActive
            ? 'Blind Leaky Bucket Penalty: P1=25 (Catastrophic Churn) combined with P4>=14 (Blind Telemetry) triggers +12 penalty on PrdDel.'
            : 'Ad Spend Masking: Pouring paid marketing into an un-retaining funnel to show vanity top-line growth.',
        ],
      },
      actuary: {
        agentTitle: 'Agent 2: Actuary (Capital Velocity & Risk Modeling)',
        headline: 'Terminal Capital Burn: CAC Payback Period is Mathematically Unrecoverable.',
        capitalBurnVelocity: 'LTV/CAC is inverted. High cloud infrastructure and customer support costs make each incremental user unprofitable.',
        contractualMisalignment: 'Engineering capacity is entirely consumed by maintaining dead bespoke features built for single churned accounts.',
        penaltyTriggerAnalysis: evaluation.penaltyActive
          ? 'Mathematical Penalty Triggered: P1=25 (Terminal Churn) + P4>=14 (Blind Telemetry) activates the +12 Blind Leaky Bucket Penalty on PrdDel.'
          : 'High delivery friction with negative cohort retention curves.',
        actuarialLossExposure: '80–95% risk of complete product write-off unless roadmap is frozen and pivoted.',
        financialRiskRating: 'SEVERE DEFICIT',
        metricsSummary: {
          govScore: evaluation.totalGov,
          delScore: evaluation.totalDel,
          penaltyApplied: evaluation.delPenalty,
          quadrantId: 'Q1',
          mode: 'product',
        },
      },
      recoveryArchitect: {
        agentTitle: 'Agent 3: Recovery Architect (Intervention Engineering)',
        headline: 'Strategic Reset Mandate: Halt Feature Factory & Initiate Customer Discovery.',
        seventyTwoHourMandate: {
          action: evaluation.immediate72HourReset.action,
          rationale: 'Stop building useless features and discover why real users are abandoning the product.',
          deliverable: evaluation.immediate72HourReset.deliverable,
        },
        interventionBlueprint: {
          thirtyDay: [
            'Halt all non-essential feature development; initiate 15 open-ended user interviews with churning accounts.',
            'Instrument comprehensive product analytics (PostHog/Mixpanel) across the onboarding funnel.',
            'Deprecate and prune 30% of dead codebase features that register < 5% monthly user adoption.',
          ],
          sixtyDay: [
            'Empower an autonomous Product Trio with outcome-based retention OKRs; eliminate executive sales feature requests.',
            'Test a single, focused value proposition MVP slice with rapid interactive prototypes.',
          ],
          ninetyDay: [
            'Verify cohort retention curve begins to flatten at >= 25% before resuming any paid customer acquisition.',
          ],
        },
        exitCriteria: 'PrdDel reduced below 50, Day 30 cohort retention flattens >= 25%, and event telemetry fully operational.',
      },
      metadata: {
        projectName: pName,
        mode: 'product',
        phase: evaluation.phaseName,
        generatedAt: new Date().toISOString(),
        source: 'deterministic-tri-agent-fallback',
        authorCredit: 'DGRF Framework authored by Ali Maleki',
      },
    };
  }

  if (qId === 'Q2') {
    return {
      triageLead: {
        agentTitle: 'Agent 1: Triage Lead (Product Strategy Diagnostics)',
        headline: `The Zombie Product: Engineering ships code with high velocity, but nobody uses the features.`,
        diagnosticSummary: `${pName} is caught in the "Feature Factory Trap" (PrdGov: ${evaluation.totalGov}/100, PrdDel: ${evaluation.totalDel}/100). The engineering team is productive and releases on time, but the roadmap is dictated by stakeholder politics rather than validated customer problems. Features are delivered into an empty void.`,
        rootCauseVectors: [
          {
            vectorNumber: 1,
            title: 'Output Roadmaps vs Outcome Discovery',
            severity: 'HIGH',
            mechanics: 'Success is declared upon shipping release dates rather than measuring customer adoption or business impact.',
          },
          {
            vectorNumber: 2,
            title: 'Sunk-Cost Zombie Features',
            severity: 'HIGH',
            mechanics: 'Underperforming features are never sunset or pruned, creating massive UI clutter and cognitive load.',
          },
          {
            vectorNumber: 3,
            title: 'Product Trio Disempowerment',
            severity: 'MODERATE',
            mechanics: 'Product managers act as backlog administrators and ticket-closers rather than customer problem researchers.',
          },
        ],
        activeGovernanceTraps: [
          'The Flawless Failure Paradox: Shipping 100% on schedule and within budget, but building a product that generates zero traction.',
          'The Feature Sprawl Trap: Adding more complexity to mask the failure of previous features.',
        ],
      },
      actuary: {
        agentTitle: 'Agent 2: Actuary (Capital Velocity & Risk Modeling)',
        headline: 'Wasted Capital Allocation: Engineering budget invested into low-yield feature factories.',
        capitalBurnVelocity: 'Development spend is predictable, but ROI per shipped feature is near zero.',
        contractualMisalignment: 'Quarterly bonuses tied to feature release volume instead of retained monthly active users.',
        penaltyTriggerAnalysis: 'Zero active interaction penalties, but capital efficiency is eroding continuously.',
        actuarialLossExposure: '40–55% wasted engineering capacity on un-adopted platform surface area.',
        financialRiskRating: 'UNCHECKED EROSION',
        metricsSummary: {
          govScore: evaluation.totalGov,
          delScore: evaluation.totalDel,
          penaltyApplied: 0,
          quadrantId: 'Q2',
          mode: 'product',
        },
      },
      recoveryArchitect: {
        agentTitle: 'Agent 3: Recovery Architect (Intervention Engineering)',
        headline: 'Operating Model Turnaround: Transition Backlog Administrators into Problem Solvers.',
        seventyTwoHourMandate: {
          action: evaluation.immediate72HourReset.action,
          rationale: 'Stop treating developers as ticket factories and refocus on customer problem validation.',
          deliverable: evaluation.immediate72HourReset.deliverable,
        },
        interventionBlueprint: {
          thirtyDay: [
            'Abolish the output roadmap; establish an Opportunity Solution Tree anchored to single North Star Metric.',
            'Mandate that product trio conducts minimum 1 customer interview per week.',
            'Institute a formal feature sunsetting schedule to prune the bottom 20% unused UI tabs.',
          ],
          sixtyDay: [
            'Transition executive reviews from milestone release dates to cohort activation and retention KPIs.',
            'Reserve 20% of engineering capacity for automated behavioral instrumentation.',
          ],
          ninetyDay: [
            'Transition product from Q2 into Q3 (Product-Led Engine) as outcome adoption outpaces release volume.',
          ],
        },
        exitCriteria: 'PrdGov reduced below 50, >= 60% of shipped features achieve active adoption, and weekly discovery habit codified.',
      },
      metadata: {
        projectName: pName,
        mode: 'product',
        phase: evaluation.phaseName,
        generatedAt: new Date().toISOString(),
        source: 'deterministic-tri-agent-fallback',
        authorCredit: 'DGRF Framework authored by Ali Maleki',
      },
    };
  }

  if (qId === 'Q4') {
    return {
      triageLead: {
        agentTitle: 'Agent 1: Triage Lead (Product Strategy Diagnostics)',
        headline: `Platform Bottleneck: Strong customer validation blocked by technical debt and release friction.`,
        diagnosticSummary: `${pName} has clear customer empathy and validated user problems (PrdGov: ${evaluation.totalGov}/100), but delivery flow is severely constrained by architectural debt and deployment bureaucracy (PrdDel: ${evaluation.totalDel}/100). The engineering team is eager to move fast, but the codebase is brittle and release trains take months.`,
        rootCauseVectors: [
          {
            vectorNumber: 1,
            title: 'Critical Architectural Debt',
            severity: 'CRITICAL',
            mechanics: 'Legacy spaghetti architecture and shared database locks trigger regressions on routine deployments.',
          },
          {
            vectorNumber: 2,
            title: 'Release Bureaucracy & Long Cycle Times',
            severity: 'HIGH',
            mechanics: 'Batch deployments take months; manual QA sign-offs and change review boards stall feedback loops.',
          },
          {
            vectorNumber: 3,
            title: 'Team Context Switching & Burnout',
            severity: 'HIGH',
            mechanics: 'Engineers are split across multiple horizontal platform maintenance tasks, destroying flow state.',
          },
        ],
        activeGovernanceTraps: [
          'The Starved Refactoring Trap: Refusing to grant engineering dedicated refactoring time to chase short-term sales deals.',
          'CAB Bureaucracy: Adding manual change review boards to catch bugs instead of building automated test pipelines.',
        ],
      },
      actuary: {
        agentTitle: 'Agent 2: Actuary (Capital Velocity & Risk Modeling)',
        headline: 'Technical Debt Tollbooth: High operational overhead choking growth velocity.',
        capitalBurnVelocity: 'Cloud infrastructure costs and developer firefighting hours consume >50% of budget.',
        contractualMisalignment: 'Sales commissions promise custom multi-tenant features without platform engineering capacity.',
        penaltyTriggerAnalysis: 'Zero active interaction penalties, but release latency threatens market positioning.',
        actuarialLossExposure: '25–35% customer churn risk due to platform unreliability and slow bug turnaround.',
        financialRiskRating: 'MODERATE DRAG',
        metricsSummary: {
          govScore: evaluation.totalGov,
          delScore: evaluation.totalDel,
          penaltyApplied: 0,
          quadrantId: 'Q4',
          mode: 'product',
        },
      },
      recoveryArchitect: {
        agentTitle: 'Agent 3: Recovery Architect (Intervention Engineering)',
        headline: 'Platform Refactoring Injection: Automate Pipelines & Decouple Architecture.',
        seventyTwoHourMandate: {
          action: evaluation.immediate72HourReset.action,
          rationale: 'Give engineering teams protected capacity to clear technical debt and automate deployment canary gates.',
          deliverable: evaluation.immediate72HourReset.deliverable,
        },
        interventionBlueprint: {
          thirtyDay: [
            'Dedicate 40% of the next 3 sprints strictly to automated testing, CI/CD pipeline, and canary releases.',
            'Decouple monolithic synchronous dependencies into asynchronous message queues or clean API contracts.',
            'Establish automated DORA telemetry (lead time for changes, deployment frequency, MTTR).',
          ],
          sixtyDay: [
            'Reduce release cycle time from months to bi-weekly automated deployments.',
            'Achieve 99.9% platform availability SLOs under peak traffic conditions.',
          ],
          ninetyDay: [
            'Transition product from Q4 into Q3 (Product-Led Engine) as flow state is restored.',
          ],
        },
        exitCriteria: 'PrdDel reduced below 50, deployment lead time < 48 hours, and change failure rate < 5%.',
      },
      metadata: {
        projectName: pName,
        mode: 'product',
        phase: evaluation.phaseName,
        generatedAt: new Date().toISOString(),
        source: 'deterministic-tri-agent-fallback',
        authorCredit: 'DGRF Framework authored by Ali Maleki',
      },
    };
  }

  // Q3 Product-Led Engine
  return {
    triageLead: {
      agentTitle: 'Agent 1: Triage Lead (Product Strategy Diagnostics)',
      headline: `Product-Led Scalable Engine: ${pName} operates at top-quartile digital product maturity.`,
      diagnosticSummary: `${pName} exhibits healthy outcome governance (${evaluation.totalGov}/100) and rapid delivery flow (${evaluation.totalDel}/100). Empowered product trios conduct continuous discovery, cohort retention curves flatten securely, and CI/CD pipelines enable on-demand customer value delivery.`,
      rootCauseVectors: [
        {
          vectorNumber: 1,
          title: 'Empowered Autonomous Product Trio',
          severity: 'LOW',
          mechanics: 'PM, Design, and Engineering collaborate daily with full ownership of customer problem space.',
        },
        {
          vectorNumber: 2,
          title: 'Flattened Cohort Retention & Habituation',
          severity: 'LOW',
          mechanics: 'Day 90 retention flattens at top-quartile benchmark with net negative revenue churn.',
        },
        {
          vectorNumber: 3,
          title: 'Continuous Delivery Flow',
          severity: 'LOW',
          mechanics: 'Deployment frequency multiple times per week via feature flags and automated observability.',
        },
      ],
      activeGovernanceTraps: [
        'The Scale Stagnation Trap: Introducing heavy corporate bureaucracy as headcount expands.',
        'Feature Bloat Temptation: Adding non-core features to satisfy enterprise edge cases.',
      ],
    },
    actuary: {
      agentTitle: 'Agent 2: Actuary (Capital Velocity & Risk Modeling)',
      headline: 'Elite Unit Economics: LTV/CAC > 3.5 with High Gross Software Margins.',
      capitalBurnVelocity: 'High capital efficiency. Customer acquisition costs are repaid within 12 months with organic viral word-of-mouth.',
      contractualMisalignment: 'Incentives aligned around customer retention and behavioral value metrics.',
      penaltyTriggerAnalysis: 'Zero active interaction penalties. Mathematical safety margins confirmed.',
      actuarialLossExposure: '< 5% residual risk under competitive market dynamics.',
      financialRiskRating: 'STABLE EQUILIBRIUM',
      metricsSummary: {
        govScore: evaluation.totalGov,
        delScore: evaluation.totalDel,
        penaltyApplied: 0,
        quadrantId: 'Q3',
        mode: 'product',
      },
    },
    recoveryArchitect: {
      agentTitle: 'Agent 3: Recovery Architect (Intervention Engineering)',
      headline: 'Scale & Insulate: Defend Team Autonomy and Codify Continuous Discovery.',
      seventyTwoHourMandate: {
        action: evaluation.immediate72HourReset.action,
        rationale: 'Protect top-performing squads from corporate interference or feature factory backsliding.',
        deliverable: evaluation.immediate72HourReset.deliverable,
      },
      interventionBlueprint: {
        thirtyDay: [
          'Codify continuous discovery and deployment playbooks for replication across expanding product squads.',
          'Fiercely maintain 20% protected capacity for ongoing platform engineering and technical debt health.',
        ],
        sixtyDay: [
          'Expand market footprint while ruthlessly pruning low-usage features to keep cognitive surface area compact.',
          'Review unit economics and gross margins as concurrency scales.',
        ],
        ninetyDay: [
          'Establish continuous experimentation infrastructure with automated statistical significance tracking.',
        ],
      },
      exitCriteria: 'Maintain PrdGov and PrdDel <= 50 through multi-squad scaling.',
    },
    metadata: {
      projectName: pName,
      mode: 'product',
      phase: evaluation.phaseName,
      generatedAt: new Date().toISOString(),
      source: 'deterministic-tri-agent-fallback',
      authorCredit: 'DGRF Framework authored by Ali Maleki',
    },
  };
}

/**
 * Backward compatibility helper
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
