'use client';

import React, { useState } from 'react';
import { EvaluationResult } from '@/lib/engine/prj-evaluator';
import { ClinicalBriefResponse } from '@/lib/gemini';
import {
  BrainCircuit,
  AlertCircle,
  CheckCircle2,
  AlertTriangle,
  ArrowRight,
  Sparkles,
  Loader2,
  FileText,
  UserCheck,
} from 'lucide-react';

interface ExecutiveSummaryProps {
  evaluation: EvaluationResult;
  projectName: string;
  onOpenLeadModal: () => void;
}

export const ExecutiveSummary: React.FC<ExecutiveSummaryProps> = ({
  evaluation,
  projectName,
  onOpenLeadModal,
}) => {
  const [brief, setBrief] = useState<ClinicalBriefResponse | null>(null);
  const [isLoadingBrief, setIsLoadingBrief] = useState(false);
  const [briefError, setBriefError] = useState<string | null>(null);

  const { gov, del, quadrant, inBufferZone, bufferDetails } = evaluation;

  const handleGenerateBrief = async () => {
    setIsLoadingBrief(true);
    setBriefError(null);

    try {
      const res = await fetch('/api/diagnose', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          evaluation,
          projectContext: {
            name: projectName || 'Enterprise Initiative',
            industry: 'Global Enterprise',
            budget: '$15M+',
          },
        }),
      });

      if (!res.ok) {
        throw new Error(`Failed to generate brief (status ${res.status})`);
      }

      const data = await res.json();
      if (data.brief) {
        setBrief(data.brief);
      } else {
        throw new Error(data.error || 'No brief returned');
      }
    } catch (err: any) {
      console.error(err);
      setBriefError('Could not generate AI brief. Please try again.');
    } finally {
      setIsLoadingBrief(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Executive Metric Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Governance Score Card */}
        <div className="rounded-2xl bg-slate-900/90 border border-slate-800 p-5 shadow-xl backdrop-blur-xl">
          <div className="flex items-center justify-between text-xs text-slate-400 mb-2">
            <span className="font-semibold uppercase tracking-wider text-amber-400">
              Structural Governance
            </span>
            <span className="font-mono text-slate-500">PrjGov (D1–D5)</span>
          </div>

          <div className="flex items-baseline gap-2 mb-2">
            <span className="text-3xl font-extrabold font-mono text-white">
              {gov.totalScore}
            </span>
            <span className="text-slate-500 text-xs font-mono">/ 100</span>
            {gov.penalty > 0 && (
              <span className="ml-auto text-[11px] font-semibold text-rose-400 bg-rose-500/10 border border-rose-500/30 px-2 py-0.5 rounded-full">
                +{gov.penalty} Penalty
              </span>
            )}
          </div>

          {/* Progress bar */}
          <div className="w-full bg-slate-800 rounded-full h-1.5 overflow-hidden mb-2">
            <div
              className={`h-full transition-all duration-300 ${
                gov.totalScore >= 50 ? 'bg-rose-500' : 'bg-emerald-500'
              }`}
              style={{ width: `${gov.totalScore}%` }}
            />
          </div>

          <p className="text-[11px] text-slate-400 leading-tight">
            Base: {gov.rawBase} pts · {gov.totalScore >= 50 ? 'High Risk Governance' : 'Governed State'}
          </p>
        </div>

        {/* Delivery Score Card */}
        <div className="rounded-2xl bg-slate-900/90 border border-slate-800 p-5 shadow-xl backdrop-blur-xl">
          <div className="flex items-center justify-between text-xs text-slate-400 mb-2">
            <span className="font-semibold uppercase tracking-wider text-sky-400">
              Operational Delivery
            </span>
            <span className="font-mono text-slate-500">PrjDel (O1–O5)</span>
          </div>

          <div className="flex items-baseline gap-2 mb-2">
            <span className="text-3xl font-extrabold font-mono text-white">
              {del.totalScore}
            </span>
            <span className="text-slate-500 text-xs font-mono">/ 100</span>
            {del.penalty > 0 && (
              <span className="ml-auto text-[11px] font-semibold text-rose-400 bg-rose-500/10 border border-rose-500/30 px-2 py-0.5 rounded-full">
                +{del.penalty} Penalty
              </span>
            )}
          </div>

          {/* Progress bar */}
          <div className="w-full bg-slate-800 rounded-full h-1.5 overflow-hidden mb-2">
            <div
              className={`h-full transition-all duration-300 ${
                del.totalScore >= 50 ? 'bg-rose-500' : 'bg-sky-500'
              }`}
              style={{ width: `${del.totalScore}%` }}
            />
          </div>

          <p className="text-[11px] text-slate-400 leading-tight">
            Base: {del.rawBase} pts · {del.totalScore >= 50 ? 'Severe Execution Drag' : 'Viable Velocity'}
          </p>
        </div>

        {/* Quadrant Classification Card */}
        <div className="rounded-2xl bg-slate-900/90 border border-slate-800 p-5 shadow-xl backdrop-blur-xl flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between text-xs text-slate-400 mb-1.5">
              <span className="font-semibold uppercase tracking-wider text-slate-300">
                Diagnostic State
              </span>
              <span
                className={`text-[10px] font-bold px-1.5 py-0.5 rounded border uppercase ${
                  quadrant.urgency === 'CRITICAL'
                    ? 'bg-rose-500/20 text-rose-400 border-rose-500/30'
                    : quadrant.urgency === 'HIGH'
                    ? 'bg-amber-500/20 text-amber-400 border-amber-500/30'
                    : quadrant.urgency === 'MODERATE'
                    ? 'bg-sky-500/20 text-sky-400 border-sky-500/30'
                    : 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30'
                }`}
              >
                {quadrant.urgency}
              </span>
            </div>

            <div className="text-xl font-bold text-white flex items-center gap-2 mb-1">
              <span className="font-mono text-emerald-400">{quadrant.id}:</span>
              <span>{quadrant.name}</span>
            </div>

            <p className="text-[11px] text-slate-400 leading-snug line-clamp-2">
              {quadrant.clinicalSummary}
            </p>
          </div>

          {inBufferZone && (
            <div className="mt-2 pt-2 border-t border-slate-800/80 flex items-center gap-1.5 text-[11px] text-indigo-400">
              <AlertCircle className="w-3.5 h-3.5 shrink-0" />
              <span>Metastable Buffer Zone [40-60] active</span>
            </div>
          )}
        </div>
      </div>

      {/* Clinical Recommendation Panel */}
      <div className="rounded-2xl bg-slate-900/90 border border-slate-800 p-6 shadow-2xl backdrop-blur-xl">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-800 mb-4">
          <div>
            <h3 className="text-base font-bold text-white flex items-center gap-2">
              <FileText className="w-4 h-4 text-emerald-400" />
              Clinical Governance Prescription
            </h3>
            <p className="text-xs text-slate-400 mt-0.5">
              Actuarial mitigation path based on Ali Maleki&apos;s DGRF Framework
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <button
              onClick={handleGenerateBrief}
              disabled={isLoadingBrief}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white shadow-lg shadow-emerald-950/50 transition-all disabled:opacity-50"
            >
              {isLoadingBrief ? (
                <>
                  <Loader2 className="w-3.5 h-3.5 animate-spin" />
                  Generating Clinical Brief...
                </>
              ) : (
                <>
                  <Sparkles className="w-3.5 h-3.5 text-amber-300" />
                  Generate AI Clinical Brief (Gemini)
                </>
              )}
            </button>

            <button
              onClick={onOpenLeadModal}
              className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-semibold bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 transition-all"
            >
              <UserCheck className="w-3.5 h-3.5 text-slate-400" />
              Request Advisory Turnaround
            </button>
          </div>
        </div>

        {/* Immediate Recommended Action */}
        <div className="p-4 rounded-xl bg-slate-950/70 border border-slate-800 mb-4">
          <div className="text-[11px] uppercase tracking-wider font-bold text-slate-400 mb-1">
            Immediate Recommended Executive Action:
          </div>
          <p className="text-sm font-semibold text-slate-200">
            {quadrant.recommendedAction}
          </p>
        </div>

        {/* Buffer Zone Deep-Dive Details */}
        {inBufferZone && (
          <div className="p-3.5 rounded-xl bg-indigo-950/40 border border-indigo-500/30 text-indigo-200 text-xs flex items-start gap-3 mb-4">
            <AlertCircle className="w-4 h-4 text-indigo-400 shrink-0 mt-0.5" />
            <div>
              <span className="font-bold uppercase tracking-wider block mb-0.5 text-indigo-300">
                Empirical Buffer Zone Active (Score in 40–60 range)
              </span>
              <span>{bufferDetails.explanation}</span>
            </div>
          </div>
        )}

        {/* AI Brief Result Container */}
        {brief && (
          <div className="mt-5 pt-5 border-t border-slate-800 space-y-4 animate-fadeIn">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-emerald-400 uppercase tracking-wider flex items-center gap-1.5">
                <BrainCircuit className="w-4 h-4" />
                Executive Clinical Brief ({brief.source === 'gemini-flash' ? 'Google Gemini 1.5 Flash' : 'Deterministic Engine'})
              </span>
              <span className="text-[11px] text-slate-500 font-mono">
                Advisory Confidential
              </span>
            </div>

            <div className="p-4 rounded-xl bg-slate-950 border border-emerald-500/30">
              <h4 className="text-sm font-bold text-white mb-2">
                {brief.headline}
              </h4>
              <p className="text-xs text-slate-300 leading-relaxed whitespace-pre-line">
                {brief.executiveSummary}
              </p>
            </div>

            {/* Root Causes */}
            <div>
              <h5 className="text-xs font-bold uppercase tracking-wider text-slate-300 mb-2">
                Identified Root Cause Failure Vectors:
              </h5>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-2.5">
                {brief.rootCauseAnalysis.map((cause, i) => (
                  <div
                    key={i}
                    className="p-3 rounded-lg bg-slate-950/80 border border-slate-800 text-xs text-slate-300"
                  >
                    <span className="font-mono text-[10px] text-emerald-400 block mb-1">
                      VECTOR {i + 1}
                    </span>
                    {cause}
                  </div>
                ))}
              </div>
            </div>

            {/* 30-Day Action Plan */}
            <div>
              <h5 className="text-xs font-bold uppercase tracking-wider text-slate-300 mb-2">
                30-Day Executive Turnaround Plan:
              </h5>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                <div className="p-3 rounded-lg bg-rose-950/20 border border-rose-500/20">
                  <span className="text-[11px] font-bold text-rose-400 uppercase block mb-1.5">
                    1. Cease Immediately
                  </span>
                  <ul className="text-xs text-slate-300 space-y-1 list-disc list-inside">
                    {brief.thirtyDayActionPlan.stopImmediate.map((item, idx) => (
                      <li key={idx}>{item}</li>
                    ))}
                  </ul>
                </div>

                <div className="p-3 rounded-lg bg-emerald-950/20 border border-emerald-500/20">
                  <span className="text-[11px] font-bold text-emerald-400 uppercase block mb-1.5">
                    2. Initiate Immediately
                  </span>
                  <ul className="text-xs text-slate-300 space-y-1 list-disc list-inside">
                    {brief.thirtyDayActionPlan.startImmediate.map((item, idx) => (
                      <li key={idx}>{item}</li>
                    ))}
                  </ul>
                </div>

                <div className="p-3 rounded-lg bg-amber-950/20 border border-amber-500/20">
                  <span className="text-[11px] font-bold text-amber-400 uppercase block mb-1.5">
                    3. Renegotiate Terms
                  </span>
                  <ul className="text-xs text-slate-300 space-y-1 list-disc list-inside">
                    {brief.thirtyDayActionPlan.renegotiate.map((item, idx) => (
                      <li key={idx}>{item}</li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>

            {/* 90-Day Outlook */}
            <div className="p-3.5 rounded-xl bg-slate-950/90 border border-slate-800 text-xs text-slate-300">
              <span className="font-bold text-slate-200 block mb-1">
                90-Day Prognostic Outlook:
              </span>
              <p className="leading-relaxed text-slate-400">
                {brief.prognosticOutlook}
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
