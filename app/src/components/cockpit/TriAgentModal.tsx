'use client';

import React, { useState } from 'react';
import { TriAgentOutput } from '@/lib/gemini';
import { DualModeEvaluation } from '@/lib/engine/dual-mode-engine';
import {
  X,
  ShieldAlert,
  Calculator,
  Compass,
  FileText,
  Copy,
  Check,
  Download,
  AlertTriangle,
  Clock,
  Sparkles,
  ChevronRight,
  TrendingDown,
  Layers,
  Zap,
} from 'lucide-react';

interface TriAgentModalProps {
  isOpen: boolean;
  onClose: () => void;
  brief: TriAgentOutput | null;
  evaluation: DualModeEvaluation;
  projectName: string;
}

export const TriAgentModal: React.FC<TriAgentModalProps> = ({
  isOpen,
  onClose,
  brief,
  evaluation,
  projectName,
}) => {
  const [activeTab, setActiveTab] = useState<'triage' | 'actuary' | 'recovery' | 'synthesis'>('triage');
  const [hasCopied, setHasCopied] = useState(false);

  if (!isOpen || !brief) return null;

  const { triageLead, actuary, recoveryArchitect, metadata } = brief;
  const isProject = evaluation.mode === 'project';

  const generateMarkdownReport = (): string => {
    return `# DGRF Executive Clinical Brief — ${projectName}
**Assessment Mode:** ${isProject ? 'Enterprise Project Mode (DGRF-Project)' : 'Digital Product Mode (DGRF-Product / PrdModule)'}
**Lifecycle Phase:** ${evaluation.phaseName}
**Evaluation Date:** ${new Date(metadata.generatedAt).toLocaleString()}
**Diagnostic Quadrant:** ${evaluation.quadrant.id} (${evaluation.quadrant.name}) — Urgency: ${evaluation.quadrant.urgency}
**${evaluation.govAxisName}:** ${evaluation.totalGov}/100 (Raw: ${evaluation.rawGov}, Penalty: ${evaluation.govPenalty})
**${evaluation.delAxisName}:** ${evaluation.totalDel}/100 (Raw: ${evaluation.rawDel}, Penalty: ${evaluation.delPenalty})
**Buffer Zone Status:** ${evaluation.bufferZone.active ? 'Active Metastability [40-60]' : 'Resolved'}
**Framework Attribution:** Delivery & Governance Risk Framework (DGRF) authored by Ali Maleki (MBA, PMP)

---

## 1. AGENT 1: TRIAGE LEAD (${isProject ? 'Project Governance Diagnostics' : 'Product Strategy Diagnostics'})
**Headline:** ${triageLead.headline}

### Diagnostic Summary
${triageLead.diagnosticSummary}

### Root Cause Failure Vectors
${triageLead.rootCauseVectors
  .map(
    (v) => `* **Vector ${v.vectorNumber} [${v.severity}]:** ${v.title}
  ${v.mechanics}`
  )
  .join('\n')}

### Active Behavioral Traps
${triageLead.activeGovernanceTraps.map((t) => `* ${t}`).join('\n')}

---

## 2. AGENT 2: ACTUARY (Capital Velocity & Risk Modeling)
**Headline:** ${actuary.headline}
**Financial Risk Rating:** ${actuary.financialRiskRating}

### Capital Burn Velocity
${actuary.capitalBurnVelocity}

### Contractual / Unit Economic Alignment
${actuary.contractualMisalignment}

### Interaction Penalty Analysis
${actuary.penaltyTriggerAnalysis}

### Actuarial Loss Exposure
${actuary.actuarialLossExposure}

---

## 3. AGENT 3: RECOVERY ARCHITECT (Intervention Engineering)
**Headline:** ${recoveryArchitect.headline}

### 72-Hour Reset Mandate
* **Immediate Action:** ${recoveryArchitect.seventyTwoHourMandate.action}
* **Executive Rationale:** ${recoveryArchitect.seventyTwoHourMandate.rationale}
* **Tangible Deliverable:** ${recoveryArchitect.seventyTwoHourMandate.deliverable}

### Prioritized Turnaround Blueprint
#### 30-Day Focus
${recoveryArchitect.interventionBlueprint.thirtyDay.map((item) => `* ${item}`).join('\n')}

#### 60-Day Focus
${recoveryArchitect.interventionBlueprint.sixtyDay.map((item) => `* ${item}`).join('\n')}

#### 90-Day Focus
${recoveryArchitect.interventionBlueprint.ninetyDay.map((item) => `* ${item}`).join('\n')}

### Exit Criteria
${recoveryArchitect.exitCriteria}

---
*Report generated via DeliveryPulse DGRF Tri-Agent Squad (${metadata.source}).*
`;
  };

  const handleCopyReport = async () => {
    try {
      await navigator.clipboard.writeText(generateMarkdownReport());
      setHasCopied(true);
      setTimeout(() => setHasCopied(false), 2500);
    } catch (err) {
      console.error('Failed to copy report:', err);
    }
  };

  const handleDownloadReport = () => {
    const reportText = generateMarkdownReport();
    const blob = new Blob([reportText], { type: 'text/markdown;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `DGRF-${evaluation.mode.toUpperCase()}-Brief-${projectName.replace(/\s+/g, '-')}-${evaluation.quadrant.id}.md`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 bg-slate-950/80 backdrop-blur-md animate-fadeIn">
      <div className="relative w-full max-w-5xl max-h-[90vh] bg-slate-900 border border-slate-800 rounded-2xl shadow-2xl overflow-hidden flex flex-col">
        {/* Modal Top Bar */}
        <div className="px-6 py-4 border-b border-slate-800 flex items-center justify-between bg-slate-950/70">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-indigo-500 to-emerald-400 p-0.5 flex items-center justify-center shadow-lg">
              <div className="w-full h-full bg-slate-950 rounded-[6px] flex items-center justify-center">
                <Sparkles className="w-4 h-4 text-emerald-400" />
              </div>
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-sm sm:text-base font-extrabold text-white tracking-tight">
                  DGRF Tri-Agent Advisory Brief
                </h2>
                <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded-full bg-indigo-500/10 text-indigo-400 border border-indigo-500/30">
                  {metadata.source === 'gemini-2.5-flash' ? 'Gemini 2.5 Flash' : 'Deterministic Engine'}
                </span>
                <span className="text-[10px] font-mono uppercase font-bold px-2 py-0.5 rounded-full bg-slate-800 text-slate-300 border border-slate-700">
                  {isProject ? 'Project Mode' : 'Product Mode'}
                </span>
              </div>
              <p className="text-[11px] text-slate-400">
                {projectName} · Phase: {evaluation.phaseName}
              </p>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center gap-2">
            <button
              onClick={handleCopyReport}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 transition-colors"
              title="Copy formatted markdown to clipboard"
            >
              {hasCopied ? (
                <>
                  <Check className="w-3.5 h-3.5 text-emerald-400" />
                  <span className="text-emerald-400">Copied!</span>
                </>
              ) : (
                <>
                  <Copy className="w-3.5 h-3.5 text-slate-400" />
                  <span>Copy Report</span>
                </>
              )}
            </button>

            <button
              onClick={handleDownloadReport}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold bg-indigo-600 hover:bg-indigo-500 text-white transition-colors shadow-sm"
              title="Download Markdown Report"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Export .md</span>
            </button>

            <button
              onClick={onClose}
              className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white transition-colors"
              title="Close modal"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Executive Metric Micro-Banner */}
        <div className="px-6 py-2.5 bg-slate-950/40 border-b border-slate-800/80 flex flex-wrap items-center justify-between text-xs font-mono">
          <div className="flex items-center gap-4">
            <span className="text-slate-400">
              {isProject ? 'PrjGov' : 'PrdGov'}:{' '}
              <strong className="text-amber-400">{evaluation.totalGov}/100</strong>
              {evaluation.govPenalty > 0 && (
                <span className="ml-1 text-[10px] text-rose-400 bg-rose-500/10 px-1 rounded border border-rose-500/20">
                  +{evaluation.govPenalty} Penalty
                </span>
              )}
            </span>
            <span className="text-slate-600">|</span>
            <span className="text-slate-400">
              {isProject ? 'PrjDel' : 'PrdDel'}:{' '}
              <strong className="text-sky-400">{evaluation.totalDel}/100</strong>
              {evaluation.delPenalty > 0 && (
                <span className="ml-1 text-[10px] text-rose-400 bg-rose-500/10 px-1 rounded border border-rose-500/20">
                  +{evaluation.delPenalty} Penalty
                </span>
              )}
            </span>
            <span className="text-slate-600">|</span>
            <span className="text-slate-400">
              Quadrant:{' '}
              <span className={`px-1.5 py-0.5 rounded text-[10px] font-bold border ${evaluation.quadrant.badgeClass}`}>
                {evaluation.quadrant.id}: {evaluation.quadrant.name}
              </span>
            </span>
          </div>

          <div className="text-[11px] text-slate-400 font-sans">
            {evaluation.immediate72HourReset.action}
          </div>
        </div>

        {/* Agent Tabs */}
        <div className="px-6 pt-3 border-b border-slate-800 flex items-center gap-2 overflow-x-auto bg-slate-900/60">
          <button
            onClick={() => setActiveTab('triage')}
            className={`flex items-center gap-2 px-4 py-2.5 border-b-2 text-xs font-semibold transition-all whitespace-nowrap ${
              activeTab === 'triage'
                ? 'border-rose-500 text-rose-400 bg-rose-500/5'
                : 'border-transparent text-slate-400 hover:text-slate-200 hover:bg-slate-800/40'
            }`}
          >
            <ShieldAlert className="w-4 h-4 text-rose-400" />
            <span>Agent 1: Triage Lead</span>
            <span className="w-1.5 h-1.5 rounded-full bg-rose-400" />
          </button>

          <button
            onClick={() => setActiveTab('actuary')}
            className={`flex items-center gap-2 px-4 py-2.5 border-b-2 text-xs font-semibold transition-all whitespace-nowrap ${
              activeTab === 'actuary'
                ? 'border-amber-500 text-amber-400 bg-amber-500/5'
                : 'border-transparent text-slate-400 hover:text-slate-200 hover:bg-slate-800/40'
            }`}
          >
            <Calculator className="w-4 h-4 text-amber-400" />
            <span>Agent 2: Actuary</span>
            <span className="w-1.5 h-1.5 rounded-full bg-amber-400" />
          </button>

          <button
            onClick={() => setActiveTab('recovery')}
            className={`flex items-center gap-2 px-4 py-2.5 border-b-2 text-xs font-semibold transition-all whitespace-nowrap ${
              activeTab === 'recovery'
                ? 'border-emerald-500 text-emerald-400 bg-emerald-500/5'
                : 'border-transparent text-slate-400 hover:text-slate-200 hover:bg-slate-800/40'
            }`}
          >
            <Compass className="w-4 h-4 text-emerald-400" />
            <span>Agent 3: Recovery Architect</span>
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
          </button>

          <button
            onClick={() => setActiveTab('synthesis')}
            className={`flex items-center gap-2 px-4 py-2.5 border-b-2 text-xs font-semibold transition-all whitespace-nowrap ${
              activeTab === 'synthesis'
                ? 'border-indigo-500 text-indigo-400 bg-indigo-500/5'
                : 'border-transparent text-slate-400 hover:text-slate-200 hover:bg-slate-800/40'
            }`}
          >
            <FileText className="w-4 h-4 text-indigo-400" />
            <span>Executive Synthesis</span>
          </button>
        </div>

        {/* Tab Content Area */}
        <div className="p-6 overflow-y-auto flex-1 space-y-6">
          {/* TAB 1: TRIAGE LEAD */}
          {activeTab === 'triage' && (
            <div className="space-y-6 animate-fadeIn">
              <div className="p-4 rounded-xl bg-slate-950/80 border border-rose-500/30">
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-[10px] font-mono uppercase font-bold text-rose-400 bg-rose-500/10 px-2 py-0.5 rounded border border-rose-500/20">
                    {triageLead.agentTitle}
                  </span>
                </div>
                <h3 className="text-base font-bold text-white mb-2">
                  {triageLead.headline}
                </h3>
                <p className="text-xs text-slate-300 leading-relaxed">
                  {triageLead.diagnosticSummary}
                </p>
              </div>

              {/* Root Cause Failure Vectors */}
              <div>
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-300 mb-3 flex items-center gap-2">
                  <ShieldAlert className="w-4 h-4 text-rose-400" />
                  Identified Root Cause Failure Vectors
                </h4>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                  {triageLead.rootCauseVectors.map((v) => (
                    <div
                      key={v.vectorNumber}
                      className="p-4 rounded-xl bg-slate-950/90 border border-slate-800 flex flex-col justify-between"
                    >
                      <div>
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-[10px] font-mono font-bold text-slate-500">
                            VECTOR 0{v.vectorNumber}
                          </span>
                          <span
                            className={`text-[9px] font-bold px-1.5 py-0.5 rounded uppercase ${
                              v.severity === 'CRITICAL'
                                ? 'bg-rose-500/20 text-rose-400 border border-rose-500/30'
                                : v.severity === 'HIGH'
                                ? 'bg-amber-500/20 text-amber-400 border border-amber-500/30'
                                : 'bg-sky-500/20 text-sky-400 border border-sky-500/30'
                            }`}
                          >
                            {v.severity}
                          </span>
                        </div>
                        <h5 className="text-xs font-bold text-slate-200 mb-1.5">
                          {v.title}
                        </h5>
                      </div>
                      <p className="text-[11px] text-slate-400 leading-relaxed mt-2">
                        {v.mechanics}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Active Governance Traps */}
              <div className="p-4 rounded-xl bg-slate-950/60 border border-slate-800">
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-300 mb-2 flex items-center gap-2">
                  <AlertTriangle className="w-4 h-4 text-amber-400" />
                  Active Behavioral & Structural Traps
                </h4>
                <ul className="space-y-2">
                  {triageLead.activeGovernanceTraps.map((trap, idx) => (
                    <li
                      key={idx}
                      className="text-xs text-slate-300 flex items-start gap-2 bg-slate-900/60 p-2.5 rounded-lg border border-slate-800/80"
                    >
                      <span className="text-amber-400 font-bold shrink-0">·</span>
                      <span>{trap}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          )}

          {/* TAB 2: ACTUARY */}
          {activeTab === 'actuary' && (
            <div className="space-y-6 animate-fadeIn">
              <div className="p-4 rounded-xl bg-slate-950/80 border border-amber-500/30">
                <div className="flex items-center justify-between mb-1">
                  <span className="text-[10px] font-mono uppercase font-bold text-amber-400 bg-amber-500/10 px-2 py-0.5 rounded border border-amber-500/20">
                    {actuary.agentTitle}
                  </span>
                  <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded bg-rose-500/10 text-rose-400 border border-rose-500/30">
                    RATING: {actuary.financialRiskRating}
                  </span>
                </div>
                <h3 className="text-base font-bold text-white mb-2">
                  {actuary.headline}
                </h3>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Capital Burn */}
                <div className="p-4 rounded-xl bg-slate-950/90 border border-slate-800">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-slate-300 mb-2 flex items-center gap-2">
                    <TrendingDown className="w-4 h-4 text-rose-400" />
                    Capital Burn Velocity
                  </h4>
                  <p className="text-xs text-slate-300 leading-relaxed">
                    {actuary.capitalBurnVelocity}
                  </p>
                </div>

                {/* Contractual / Unit Economics */}
                <div className="p-4 rounded-xl bg-slate-950/90 border border-slate-800">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-slate-300 mb-2 flex items-center gap-2">
                    <Layers className="w-4 h-4 text-amber-400" />
                    {isProject ? 'Contractual Alignment' : 'Unit Economic Traction'}
                  </h4>
                  <p className="text-xs text-slate-300 leading-relaxed">
                    {actuary.contractualMisalignment}
                  </p>
                </div>

                {/* Penalty Trigger Analysis */}
                <div className="p-4 rounded-xl bg-slate-950/90 border border-slate-800">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-slate-300 mb-2 flex items-center gap-2">
                    <Zap className="w-4 h-4 text-indigo-400" />
                    Nonlinear Penalty Trigger Analysis
                  </h4>
                  <p className="text-xs text-slate-300 leading-relaxed">
                    {actuary.penaltyTriggerAnalysis}
                  </p>
                </div>

                {/* Actuarial Loss Exposure */}
                <div className="p-4 rounded-xl bg-slate-950/90 border border-slate-800">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-slate-300 mb-2 flex items-center gap-2">
                    <Calculator className="w-4 h-4 text-emerald-400" />
                    Estimated Actuarial Loss Exposure
                  </h4>
                  <p className="text-xs text-slate-300 leading-relaxed">
                    {actuary.actuarialLossExposure}
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* TAB 3: RECOVERY ARCHITECT */}
          {activeTab === 'recovery' && (
            <div className="space-y-6 animate-fadeIn">
              <div className="p-4 rounded-xl bg-slate-950/80 border border-emerald-500/30">
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-[10px] font-mono uppercase font-bold text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20">
                    {recoveryArchitect.agentTitle}
                  </span>
                </div>
                <h3 className="text-base font-bold text-white mb-2">
                  {recoveryArchitect.headline}
                </h3>
              </div>

              {/* 72-Hour Reset Mandate */}
              <div className="p-5 rounded-xl bg-rose-950/30 border border-rose-500/40">
                <div className="flex items-center gap-2 text-rose-400 mb-2">
                  <Clock className="w-4 h-4 animate-pulse" />
                  <span className="font-extrabold uppercase tracking-wider text-xs">
                    72-Hour Reset Mandate (Immediate Directive)
                  </span>
                </div>

                <div className="space-y-3 text-xs">
                  <div>
                    <span className="text-slate-400 font-semibold block mb-0.5">
                      Executive Directive:
                    </span>
                    <p className="text-white font-medium">
                      {recoveryArchitect.seventyTwoHourMandate.action}
                    </p>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pt-2 border-t border-rose-500/20">
                    <div>
                      <span className="text-slate-400 font-semibold block mb-0.5">
                        Operational Rationale:
                      </span>
                      <p className="text-slate-300 text-[11px]">
                        {recoveryArchitect.seventyTwoHourMandate.rationale}
                      </p>
                    </div>

                    <div>
                      <span className="text-slate-400 font-semibold block mb-0.5">
                        Mandatory 72h Deliverable:
                      </span>
                      <p className="text-emerald-300 text-[11px] font-mono">
                        {recoveryArchitect.seventyTwoHourMandate.deliverable}
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* 30-60-90 Day Blueprint */}
              <div>
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-300 mb-3 flex items-center gap-2">
                  <Compass className="w-4 h-4 text-emerald-400" />
                  Prioritized 30–60–90 Day Recovery Blueprint
                </h4>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                  {/* 30 Day */}
                  <div className="p-4 rounded-xl bg-slate-950/90 border border-slate-800">
                    <span className="font-mono text-[11px] font-bold text-emerald-400 uppercase block mb-2 pb-1 border-b border-slate-800">
                      Phase 1: 30-Day Stabilization
                    </span>
                    <ul className="space-y-2 text-xs text-slate-300">
                      {recoveryArchitect.interventionBlueprint.thirtyDay.map((item, i) => (
                        <li key={i} className="flex items-start gap-2">
                          <ChevronRight className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* 60 Day */}
                  <div className="p-4 rounded-xl bg-slate-950/90 border border-slate-800">
                    <span className="font-mono text-[11px] font-bold text-sky-400 uppercase block mb-2 pb-1 border-b border-slate-800">
                      Phase 2: 60-Day Re-baselining
                    </span>
                    <ul className="space-y-2 text-xs text-slate-300">
                      {recoveryArchitect.interventionBlueprint.sixtyDay.map((item, i) => (
                        <li key={i} className="flex items-start gap-2">
                          <ChevronRight className="w-3.5 h-3.5 text-sky-400 shrink-0 mt-0.5" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* 90 Day */}
                  <div className="p-4 rounded-xl bg-slate-950/90 border border-slate-800">
                    <span className="font-mono text-[11px] font-bold text-indigo-400 uppercase block mb-2 pb-1 border-b border-slate-800">
                      Phase 3: 90-Day Execution
                    </span>
                    <ul className="space-y-2 text-xs text-slate-300">
                      {recoveryArchitect.interventionBlueprint.ninetyDay.map((item, i) => (
                        <li key={i} className="flex items-start gap-2">
                          <ChevronRight className="w-3.5 h-3.5 text-indigo-400 shrink-0 mt-0.5" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>

              {/* Exit Criteria */}
              <div className="p-4 rounded-xl bg-slate-950/60 border border-slate-800 text-xs">
                <span className="font-bold text-slate-300 block mb-1">
                  Maturity Exit Criteria:
                </span>
                <p className="text-slate-400 leading-relaxed font-mono">
                  {recoveryArchitect.exitCriteria}
                </p>
              </div>
            </div>
          )}

          {/* TAB 4: SYNTHESIS */}
          {activeTab === 'synthesis' && (
            <div className="space-y-5 animate-fadeIn">
              <div className="p-5 rounded-xl bg-slate-950 border border-slate-800 text-xs text-slate-300 space-y-4 font-mono leading-relaxed">
                <div className="pb-3 border-b border-slate-800 text-slate-400 font-sans">
                  <h3 className="text-sm font-bold text-white mb-1">
                    Consolidated Tri-Agent Executive Memorandum ({isProject ? 'DGRF-Project' : 'DGRF-Product'})
                  </h3>
                  <p className="text-xs text-slate-400">
                    Synthesized for C-Suite Briefing & Board Audit Committee Review · Phase: {evaluation.phaseName}
                  </p>
                </div>

                <div>
                  <strong className="text-rose-400 block mb-1">1. TRIAGE LEAD CLINICAL FINDINGS:</strong>
                  <p className="text-slate-300 font-sans">{triageLead.diagnosticSummary}</p>
                </div>

                <div>
                  <strong className="text-amber-400 block mb-1">2. ACTUARIAL CAPITAL ASSESSMENT:</strong>
                  <p className="text-slate-300 font-sans">{actuary.capitalBurnVelocity}</p>
                  <p className="text-slate-300 font-sans mt-1">{actuary.penaltyTriggerAnalysis}</p>
                </div>

                <div>
                  <strong className="text-emerald-400 block mb-1">3. RECOVERY ARCHITECT DIRECTIVE:</strong>
                  <p className="text-slate-300 font-sans">{recoveryArchitect.seventyTwoHourMandate.action}</p>
                  <p className="text-slate-400 font-sans text-[11px] mt-1">
                    Deliverable: {recoveryArchitect.seventyTwoHourMandate.deliverable}
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Modal Footer */}
        <div className="px-6 py-3.5 border-t border-slate-800 bg-slate-950/80 flex items-center justify-between text-xs text-slate-500">
          <div>
            <span>DeliveryPulse (DGRF Framework) — Authored by Ali Maleki (MBA, PMP)</span>
          </div>

          <button
            onClick={onClose}
            className="px-4 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 transition-colors font-medium text-xs"
          >
            Close Brief
          </button>
        </div>
      </div>
    </div>
  );
};
