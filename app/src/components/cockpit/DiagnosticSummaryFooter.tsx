'use client';

import React from 'react';
import { CockpitEvaluation } from '@/lib/engine/cockpit-engine';
import {
  ShieldAlert,
  Activity,
  Sparkles,
  AlertTriangle,
  ArrowRight,
  Loader2,
  CheckCircle2,
} from 'lucide-react';

interface DiagnosticSummaryFooterProps {
  evaluation: CockpitEvaluation;
  onOpenTriAgentModal: () => void;
  isLoadingBrief?: boolean;
}

export const DiagnosticSummaryFooter: React.FC<DiagnosticSummaryFooterProps> = ({
  evaluation,
  onOpenTriAgentModal,
  isLoadingBrief = false,
}) => {
  const { gov, del, quadrant, hasGovPenalty, inBufferZone } = evaluation;

  return (
    <div className="sticky bottom-0 z-30 w-full bg-slate-950/95 border-t border-slate-800 shadow-[0_-10px_30px_rgba(0,0,0,0.5)] backdrop-blur-xl transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3.5">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          {/* Left: Scores & Indicator */}
          <div className="flex flex-wrap items-center gap-4 sm:gap-6">
            {/* Live Indicator */}
            <div className="flex items-center gap-2">
              <span className="relative flex h-3 w-3">
                <span
                  className="animate-ping absolute inline-flex h-full w-full rounded-full opacity-75"
                  style={{ backgroundColor: quadrant.hexColor }}
                />
                <span
                  className="relative inline-flex rounded-full h-3 w-3"
                  style={{ backgroundColor: quadrant.hexColor }}
                />
              </span>
              <span className="text-xs font-mono font-bold uppercase tracking-wider text-slate-400">
                Live State:
              </span>
              <span
                className={`px-2.5 py-0.5 rounded-full text-xs font-bold font-mono border ${quadrant.badgeClass}`}
              >
                {quadrant.id}: {quadrant.name}
              </span>
            </div>

            {/* PrjGov Score */}
            <div className="flex items-center gap-2">
              <span className="text-xs font-mono text-slate-400">PrjGov:</span>
              <span className="text-base font-extrabold font-mono text-amber-400">
                {gov.totalScore}
              </span>
              <span className="text-[10px] text-slate-500 font-mono">/ 100</span>

              {hasGovPenalty && (
                <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-rose-500/20 text-rose-300 border border-rose-500/40 animate-pulse">
                  <ShieldAlert className="w-3 h-3 text-rose-400" />
                  +10 Penalty Active
                </span>
              )}
            </div>

            {/* PrjDel Score */}
            <div className="flex items-center gap-2">
              <span className="text-xs font-mono text-slate-400">PrjDel:</span>
              <span className="text-base font-extrabold font-mono text-sky-400">
                {del.totalScore}
              </span>
              <span className="text-[10px] text-slate-500 font-mono">/ 100</span>
            </div>

            {/* Buffer Zone Flag */}
            {inBufferZone && (
              <span className="hidden lg:inline-flex items-center gap-1.5 px-2 py-0.5 rounded text-[10px] font-mono text-indigo-400 bg-indigo-500/10 border border-indigo-500/30">
                <span className="w-1.5 h-1.5 rounded-full bg-indigo-400 animate-pulse" />
                Buffer [40–60]
              </span>
            )}
          </div>

          {/* Center: Recommended Immediate Executive Action */}
          <div className="hidden xl:flex items-center gap-2 text-xs max-w-md">
            <span className="text-slate-400 font-semibold shrink-0 uppercase tracking-wider text-[10px] bg-slate-900 border border-slate-800 px-2 py-0.5 rounded">
              Action:
            </span>
            <span className="text-slate-200 truncate font-medium">
              {quadrant.immediateAction}
            </span>
          </div>

          {/* Right: Tri-Agent Squad CTA Button */}
          <div className="flex items-center gap-3">
            <button
              onClick={onOpenTriAgentModal}
              disabled={isLoadingBrief}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold bg-gradient-to-r from-indigo-600 via-indigo-500 to-emerald-500 hover:from-indigo-500 hover:to-emerald-400 text-white shadow-lg shadow-indigo-950/60 transition-all active:scale-[0.98] disabled:opacity-50"
            >
              {isLoadingBrief ? (
                <>
                  <Loader2 className="w-3.5 h-3.5 animate-spin" />
                  <span>Consulting Tri-Agent Squad...</span>
                </>
              ) : (
                <>
                  <Sparkles className="w-3.5 h-3.5 text-amber-300 animate-pulse" />
                  <span>Generate AI Clinical Brief (Tri-Agent)</span>
                  <ArrowRight className="w-3.5 h-3.5 text-slate-200" />
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
