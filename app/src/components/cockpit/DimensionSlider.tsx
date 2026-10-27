'use client';

import React from 'react';
import {
  GovernanceMode,
  ProjectScores,
  ProductScores,
  DimensionDef,
  getDimensionsForEvaluation,
} from '@/lib/engine/dual-mode-engine';
import { ShieldAlert, Layers, Activity, AlertTriangle, Zap, Check } from 'lucide-react';

interface DimensionSliderProps {
  mode: GovernanceMode;
  phase: string;
  activePart: 'gov' | 'del';
  onPartChange: (part: 'gov' | 'del') => void;
  projectScores: ProjectScores;
  productScores: ProductScores;
  onProjectScoreChange: (key: keyof ProjectScores, val: any) => void;
  onProductScoreChange: (key: keyof ProductScores, val: any) => void;
  penaltyActive: boolean;
  penaltyMessage: string | null;
}

export const DimensionSlider: React.FC<DimensionSliderProps> = ({
  mode,
  phase,
  activePart,
  onPartChange,
  projectScores,
  productScores,
  onProjectScoreChange,
  onProductScoreChange,
  penaltyActive,
  penaltyMessage,
}) => {
  const isProject = mode === 'project';

  const part1Label = isProject
    ? 'Part 1: Structural Governance (PrjGov, D1–D5)'
    : 'Part 1: Strategic Product Governance (PrdGov, G1–G5)';

  let part2Label = isProject
    ? phase === 'preflight'
      ? 'Part 2: Operational Readiness — Pre-Flight Baseline Audit (P1–P5)'
      : 'Part 2: Operational Delivery — In-Flight Live Telemetry (O1–O5)'
    : phase === 'discovery'
    ? 'Part 2: Operational Traction — Phase 1 Discovery & Validation (P1–P5)'
    : phase === 'pmf'
    ? 'Part 2: Operational Traction — Phase 2 PMF & Retention (P1–P5)'
    : 'Part 2: Operational Traction — Phase 3 Scale & Platform Flow (P1–P5)';

  const currentDimensions = getDimensionsForEvaluation(mode, phase, activePart);

  // Score keys mapped to the 5 dimensions
  const projectGovKeys: (keyof ProjectScores)[] = ['d1', 'd2', 'd3', 'd4', 'd5'];
  const projectDelKeys: (keyof ProjectScores)[] = ['o1', 'o2', 'o3', 'o4', 'o5'];
  const productGovKeys: (keyof ProductScores)[] = ['g1', 'g2', 'g3', 'g4', 'g5'];
  const productDelKeys: (keyof ProductScores)[] = ['p1', 'p2', 'p3', 'p4', 'p5'];

  return (
    <div className="rounded-2xl bg-slate-900/90 border border-slate-800 p-5 sm:p-6 shadow-2xl backdrop-blur-xl">
      {/* Questionnaire Tabs Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-slate-800/80 mb-5 gap-3">
        <div className="flex flex-wrap items-center gap-2">
          <button
            onClick={() => onPartChange('gov')}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-semibold uppercase tracking-wider transition-all ${
              activePart === 'gov'
                ? 'bg-amber-500/20 text-amber-300 border border-amber-500/40 shadow-sm'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
            }`}
          >
            <Layers className="w-4 h-4 text-amber-400" />
            <span>{part1Label}</span>
            {isProject && penaltyActive && (
              <span className="w-2 h-2 rounded-full bg-rose-500 animate-ping" />
            )}
          </button>

          <button
            onClick={() => onPartChange('del')}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-semibold uppercase tracking-wider transition-all ${
              activePart === 'del'
                ? 'bg-sky-500/20 text-sky-300 border border-sky-500/40 shadow-sm'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
            }`}
          >
            <Activity className="w-4 h-4 text-sky-400" />
            <span>{part2Label}</span>
            {!isProject && penaltyActive && (
              <span className="w-2 h-2 rounded-full bg-rose-500 animate-ping" />
            )}
          </button>
        </div>

        <div className="flex items-center gap-2 text-xs font-mono text-slate-400">
          <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
          <span>Interactive Radio-Cards · Discrete Criteria</span>
        </div>
      </div>

      {/* Dynamic Penalty Warning Banner */}
      {penaltyActive && (
        <div className="mb-6 p-4 rounded-xl bg-rose-950/40 border border-rose-500/50 flex items-start gap-3 shadow-lg shadow-rose-950/20 animate-in fade-in duration-300">
          <AlertTriangle className="w-5 h-5 text-rose-400 shrink-0 mt-0.5" />
          <div className="text-xs">
            <span className="font-bold uppercase tracking-wider text-rose-300 block mb-1">
              Nonlinear Interaction Penalty Triggered
            </span>
            <span className="leading-relaxed text-slate-200">
              {penaltyMessage}
            </span>
          </div>
        </div>
      )}

      {/* Dimension Items List */}
      <div className="space-y-6">
        {currentDimensions.map((dim, idx) => {
          if (isProject) {
            if (activePart === 'gov') {
              const key = projectGovKeys[idx];
              return renderDimensionBlock(
                dim,
                projectScores[key],
                (v) => onProjectScoreChange(key, v)
              );
            } else {
              const key = projectDelKeys[idx];
              return renderDimensionBlock(
                dim,
                projectScores[key],
                (v) => onProjectScoreChange(key, v)
              );
            }
          } else {
            if (activePart === 'gov') {
              const key = productGovKeys[idx];
              return renderDimensionBlock(
                dim,
                productScores[key],
                (v) => onProductScoreChange(key, v)
              );
            } else {
              const key = productDelKeys[idx];
              return renderDimensionBlock(
                dim,
                productScores[key],
                (v) => onProductScoreChange(key, v)
              );
            }
          }
        })}
      </div>
    </div>
  );

  function renderDimensionBlock<T extends number>(
    meta: DimensionDef<T>,
    currentVal: T,
    onChange: (val: T) => void
  ) {
    return (
      <div
        key={meta.code}
        className="p-4 sm:p-5 rounded-xl bg-slate-950/70 border border-slate-800/80 transition-all hover:border-slate-700/80"
      >
        {/* Dimension Header */}
        <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
          <div className="flex items-center gap-2.5">
            <span className="font-mono font-bold text-xs px-2.5 py-1 rounded bg-slate-800 text-slate-100 border border-slate-700">
              {meta.code}
            </span>
            <h4 className="font-bold text-sm text-white">
              {meta.name}
            </h4>
          </div>

          <div className="flex items-center gap-3">
            <span className="text-xs text-slate-400">
              Max: <strong className="text-slate-200 font-mono">{meta.weightLabel}</strong>
            </span>
            <span className="text-xs font-mono font-bold px-2.5 py-1 rounded bg-slate-900 text-emerald-400 border border-slate-700">
              Active: {currentVal} pts
            </span>
          </div>
        </div>

        <p className="text-xs text-slate-400 mb-3.5">
          <span className="text-slate-500 font-medium">Focus:</span> {meta.focusArea}
        </p>

        {/* 4 Clickable Radio-Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2.5">
          {meta.options.map((opt) => {
            const isSelected = currentVal === opt.value;

            const borderColors = {
              0: isSelected
                ? 'bg-emerald-500/15 border-emerald-500 text-emerald-300 ring-1 ring-emerald-500/40 shadow-lg shadow-emerald-950/30'
                : 'hover:border-slate-700 text-slate-300 bg-slate-900/60 border-slate-800',
              1: isSelected
                ? 'bg-sky-500/15 border-sky-500 text-sky-300 ring-1 ring-sky-500/40 shadow-lg shadow-sky-950/30'
                : 'hover:border-slate-700 text-slate-300 bg-slate-900/60 border-slate-800',
              2: isSelected
                ? 'bg-amber-500/15 border-amber-500 text-amber-300 ring-1 ring-amber-500/40 shadow-lg shadow-amber-950/30'
                : 'hover:border-slate-700 text-slate-300 bg-slate-900/60 border-slate-800',
              3: isSelected
                ? 'bg-rose-500/15 border-rose-500 text-rose-300 ring-1 ring-rose-500/40 shadow-lg shadow-rose-950/30'
                : 'hover:border-slate-700 text-slate-300 bg-slate-900/60 border-slate-800',
            };

            return (
              <button
                key={opt.value}
                onClick={() => onChange(opt.value)}
                className={`text-left p-3 rounded-xl border text-xs transition-all duration-150 flex flex-col justify-between ${
                  borderColors[opt.level]
                }`}
              >
                <div>
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="text-[10px] font-mono uppercase font-bold text-slate-500">
                      Level {opt.level}
                    </span>
                    <span
                      className={`font-mono font-extrabold text-xs px-1.5 py-0.5 rounded ${
                        isSelected
                          ? 'bg-slate-950/80 text-white border border-slate-700'
                          : 'text-slate-400'
                      }`}
                    >
                      {opt.value} pts
                    </span>
                  </div>

                  <div className="font-bold text-[11px] mb-1.5 line-clamp-1 text-slate-100">
                    {opt.label}
                  </div>

                  <p className="text-[10.5px] text-slate-400 leading-snug mb-2 line-clamp-2">
                    {opt.description}
                  </p>
                </div>

                <div className="pt-2 border-t border-slate-800/80 text-[10px] text-slate-500 leading-tight line-clamp-2 italic">
                  Criteria: {opt.criteria}
                </div>
              </button>
            );
          })}
        </div>
      </div>
    );
  }
};
