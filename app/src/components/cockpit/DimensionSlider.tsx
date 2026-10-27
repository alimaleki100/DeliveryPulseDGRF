'use client';

import React from 'react';
import {
  GovernanceMode,
  ProjectScores,
  ProductScores,
  PROJECT_D1,
  PROJECT_D2,
  PROJECT_D3,
  PROJECT_D4,
  PROJECT_D5,
  PROJECT_O1,
  PROJECT_O2,
  PROJECT_O3,
  PROJECT_O4,
  PROJECT_O5,
  PRODUCT_G1,
  PRODUCT_G2,
  PRODUCT_G3,
  PRODUCT_G4,
  PRODUCT_G5,
  PRODUCT_P1,
  PRODUCT_P2,
  PRODUCT_P3,
  PRODUCT_P4,
  PRODUCT_P5,
  DimensionDef,
} from '@/lib/engine/dual-mode-engine';
import { ShieldAlert, Layers, Activity, AlertTriangle, Zap, Check } from 'lucide-react';

interface DimensionSliderProps {
  mode: GovernanceMode;
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

  const part2Label = isProject
    ? 'Part 2: Operational Delivery (PrjDel, O1–O5)'
    : 'Part 2: Operational Traction & Flow (PrdDel, P1–P5)';

  return (
    <div className="rounded-2xl bg-slate-900/90 border border-slate-800 p-5 sm:p-6 shadow-2xl backdrop-blur-xl">
      {/* Questionnaire Tabs Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-slate-800/80 mb-5 gap-3">
        <div className="flex items-center gap-2">
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

        <span className="text-xs text-slate-500 font-mono">
          {activePart === 'gov' ? 'Vertical Y-Axis (0–100)' : 'Horizontal X-Axis (0–100)'}
        </span>
      </div>

      {/* Nonlinear Penalty Warning Banner */}
      {penaltyActive && (
        <div className="mb-6 p-4 rounded-xl bg-rose-950/70 border border-rose-500/60 flex items-start gap-3.5 text-rose-200 animate-fadeIn shadow-lg">
          <ShieldAlert className="w-5 h-5 text-rose-400 shrink-0 mt-0.5" />
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
        {isProject ? (
          activePart === 'gov' ? (
            <>
              {renderDimensionBlock(PROJECT_D1, projectScores.d1, (v) => onProjectScoreChange('d1', v))}
              {renderDimensionBlock(PROJECT_D2, projectScores.d2, (v) => onProjectScoreChange('d2', v))}
              {renderDimensionBlock(PROJECT_D3, projectScores.d3, (v) => onProjectScoreChange('d3', v))}
              {renderDimensionBlock(PROJECT_D4, projectScores.d4, (v) => onProjectScoreChange('d4', v))}
              {renderDimensionBlock(PROJECT_D5, projectScores.d5, (v) => onProjectScoreChange('d5', v))}
            </>
          ) : (
            <>
              {renderDimensionBlock(PROJECT_O1, projectScores.o1, (v) => onProjectScoreChange('o1', v))}
              {renderDimensionBlock(PROJECT_O2, projectScores.o2, (v) => onProjectScoreChange('o2', v))}
              {renderDimensionBlock(PROJECT_O3, projectScores.o3, (v) => onProjectScoreChange('o3', v))}
              {renderDimensionBlock(PROJECT_O4, projectScores.o4, (v) => onProjectScoreChange('o4', v))}
              {renderDimensionBlock(PROJECT_O5, projectScores.o5, (v) => onProjectScoreChange('o5', v))}
            </>
          )
        ) : (
          activePart === 'gov' ? (
            <>
              {renderDimensionBlock(PRODUCT_G1, productScores.g1, (v) => onProductScoreChange('g1', v))}
              {renderDimensionBlock(PRODUCT_G2, productScores.g2, (v) => onProductScoreChange('g2', v))}
              {renderDimensionBlock(PRODUCT_G3, productScores.g3, (v) => onProductScoreChange('g3', v))}
              {renderDimensionBlock(PRODUCT_G4, productScores.g4, (v) => onProductScoreChange('g4', v))}
              {renderDimensionBlock(PRODUCT_G5, productScores.g5, (v) => onProductScoreChange('g5', v))}
            </>
          ) : (
            <>
              {renderDimensionBlock(PRODUCT_P1, productScores.p1, (v) => onProductScoreChange('p1', v))}
              {renderDimensionBlock(PRODUCT_P2, productScores.p2, (v) => onProductScoreChange('p2', v))}
              {renderDimensionBlock(PRODUCT_P3, productScores.p3, (v) => onProductScoreChange('p3', v))}
              {renderDimensionBlock(PRODUCT_P4, productScores.p4, (v) => onProductScoreChange('p4', v))}
              {renderDimensionBlock(PRODUCT_P5, productScores.p5, (v) => onProductScoreChange('p5', v))}
            </>
          )
        )}
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
