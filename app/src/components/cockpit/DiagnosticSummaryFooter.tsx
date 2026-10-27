'use client';

import React from 'react';
import { DualModeEvaluation } from '@/lib/engine/dual-mode-engine';
import {
  ShieldAlert,
  Sparkles,
  ArrowRight,
  Loader2,
  Clock,
} from 'lucide-react';

interface DiagnosticSummaryFooterProps {
  evaluation: DualModeEvaluation;
  onOpenTriAgentModal: () => void;
  isLoadingBrief?: boolean;
}

export const DiagnosticSummaryFooter: React.FC<DiagnosticSummaryFooterProps> = ({
  evaluation,
  onOpenTriAgentModal,
  isLoadingBrief = false,
}) => {
  const {
    mode,
    totalGov,
    totalDel,
    quadrant,
    penaltyActive,
    penaltyMessage,
    bufferZone,
    immediate72HourReset,
  } = evaluation;

  // Threshold color bands: Emerald <= 35, Amber 36–50, Red > 50
  const getScoreBadge = (score: number, label: string) => {
    let colorClass = 'text-emerald-400 bg-emerald-500/10 border-emerald-500/30';
    if (score > 50) {
      colorClass = 'text-rose-400 bg-rose-500/10 border-rose-500/30';
    } else if (score > 35) {
      colorClass = 'text-amber-400 bg-amber-500/10 border-amber-500/30';
    }

    return (
      <div className="flex items-center gap-1.5">
        <span className="text-xs font-mono text-slate-400">{label}:</span>
        <span className={`px-2 py-0.5 rounded text-xs font-bold font-mono border ${colorClass}`}>
          {score}/100
        </span>
      </div>
    );
  };

  const isProject = mode === 'project';

  return (
    <div className="sticky bottom-0 z-30 w-full bg-[#080C14]/95 border-t border-[#1E293B] shadow-[0_-10px_30px_rgba(0,0,0,0.6)] backdrop-blur-xl transition-all">
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
                {isProject ? 'Project State:' : 'Product State:'}
              </span>
              <span
                className={`px-2.5 py-0.5 rounded-full text-xs font-bold font-mono border ${quadrant.badgeClass}`}
              >
                {quadrant.id}: {quadrant.name}
              </span>
            </div>

            {/* Governance Score */}
            {getScoreBadge(totalGov, isProject ? 'PrjGov' : 'PrdGov')}

            {/* Delivery / Traction Score */}
            {getScoreBadge(totalDel, isProject ? 'PrjDel' : 'PrdDel')}

            {/* Penalty Trigger Alert Chip */}
            {penaltyActive && (
              <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded text-[10px] font-mono font-bold bg-rose-500/20 text-rose-300 border border-rose-500/40 animate-pulse">
                <ShieldAlert className="w-3.5 h-3.5 text-rose-400" />
                {isProject ? '+10 Penalty Active' : '+12 Blind Leaky Bucket'}
              </span>
            )}

            {/* Buffer Zone Status */}
            {bufferZone.active && (
              <span className="hidden lg:inline-flex items-center gap-1.5 px-2 py-0.5 rounded text-[10px] font-mono text-indigo-400 bg-indigo-500/10 border border-indigo-500/30">
                <span className="w-1.5 h-1.5 rounded-full bg-indigo-400 animate-pulse" />
                Buffer [40–60]
              </span>
            )}
          </div>

          {/* Center: Recommended Immediate 72h Reset Directive */}
          <div className="hidden xl:flex items-center gap-2 text-xs max-w-md">
            <span className="text-slate-400 font-semibold shrink-0 uppercase tracking-wider text-[10px] bg-slate-900 border border-slate-800 px-2 py-0.5 rounded flex items-center gap-1">
              <Clock className="w-3 h-3 text-amber-400" />
              72h Reset:
            </span>
            <span className="text-slate-200 truncate font-medium">
              {immediate72HourReset.action}
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
                  <span>Generate AI Clinical Brief</span>
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
