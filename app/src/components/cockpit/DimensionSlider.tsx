'use client';

import React from 'react';
import {
  CockpitGovInputs,
  CockpitDelInputs,
  D1_META,
  D2_META,
  D3_META,
  D4_META,
  D5_META,
  O1_META,
  O2_META,
  O3_META,
  O4_META,
  O5_META,
  DimensionMetadata,
} from '@/lib/engine/cockpit-engine';
import { ShieldAlert, Layers, Activity, Zap, Info, Check } from 'lucide-react';

interface DimensionSliderProps {
  activeTab: 'gov' | 'del';
  onTabChange: (tab: 'gov' | 'del') => void;
  govInputs: CockpitGovInputs;
  delInputs: CockpitDelInputs;
  onGovChange: (key: keyof CockpitGovInputs, val: any) => void;
  onDelChange: (key: keyof CockpitDelInputs, val: any) => void;
}

export const DimensionSlider: React.FC<DimensionSliderProps> = ({
  activeTab,
  onTabChange,
  govInputs,
  delInputs,
  onGovChange,
  onDelChange,
}) => {
  const govPenaltyActive = govInputs.d1 === 25 && govInputs.d2 >= 13;

  return (
    <div className="rounded-2xl bg-slate-900/90 border border-slate-800 p-5 sm:p-6 shadow-2xl backdrop-blur-xl">
      {/* Tab Navigation */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-slate-800/80 mb-5 gap-3">
        <div className="flex items-center gap-2">
          <button
            onClick={() => onTabChange('gov')}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-semibold uppercase tracking-wider transition-all ${
              activeTab === 'gov'
                ? 'bg-amber-500/20 text-amber-300 border border-amber-500/40 shadow-sm'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
            }`}
          >
            <Layers className="w-4 h-4 text-amber-400" />
            <span>Structural Governance (D1–D5)</span>
            {govPenaltyActive && (
              <span className="w-2 h-2 rounded-full bg-rose-500 animate-ping" />
            )}
          </button>

          <button
            onClick={() => onTabChange('del')}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-semibold uppercase tracking-wider transition-all ${
              activeTab === 'del'
                ? 'bg-sky-500/20 text-sky-300 border border-sky-500/40 shadow-sm'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
            }`}
          >
            <Activity className="w-4 h-4 text-sky-400" />
            <span>Operational Delivery (O1–O5)</span>
          </button>
        </div>

        <span className="text-xs text-slate-500 font-mono">
          {activeTab === 'gov'
            ? 'Y-Axis Vectors (PrjGov, Max 100)'
            : 'X-Axis Vectors (PrjDel, Max 100)'}
        </span>
      </div>

      {/* Cross-dimensional Penalty Alert Banner */}
      {activeTab === 'gov' && govPenaltyActive && (
        <div className="mb-6 p-4 rounded-xl bg-rose-950/70 border border-rose-500/60 flex items-start gap-3.5 text-rose-200 animate-fadeIn shadow-lg">
          <ShieldAlert className="w-5 h-5 text-rose-400 shrink-0 mt-0.5" />
          <div className="text-xs">
            <span className="font-bold uppercase tracking-wider text-rose-300 block mb-1">
              Nonlinear Interactive Penalty Triggered (+10 Pts Added to PrjGov)
            </span>
            <span className="leading-relaxed text-slate-200">
              Mathematical Rule: Absentee Mandate (<code className="font-mono text-rose-300">D1 = 25</code>) combined with Adversarial Procurement / Vendor Lock-in (<code className="font-mono text-rose-300">D2 &ge; 13</code>) unleashes unchecked vendor opportunism. A 10-point systemic penalty is added directly to composite Governance Risk.
            </span>
          </div>
        </div>
      )}

      {/* Dimension Items */}
      <div className="space-y-6">
        {activeTab === 'gov' ? (
          <>
            {renderDimensionBlock(D1_META, govInputs.d1, (val) => onGovChange('d1', val))}
            {renderDimensionBlock(D2_META, govInputs.d2, (val) => onGovChange('d2', val))}
            {renderDimensionBlock(D3_META, govInputs.d3, (val) => onGovChange('d3', val))}
            {renderDimensionBlock(D4_META, govInputs.d4, (val) => onGovChange('d4', val))}
            {renderDimensionBlock(D5_META, govInputs.d5, (val) => onGovChange('d5', val))}
          </>
        ) : (
          <>
            {renderDimensionBlock(O1_META, delInputs.o1, (val) => onDelChange('o1', val))}
            {renderDimensionBlock(O2_META, delInputs.o2, (val) => onDelChange('o2', val))}
            {renderDimensionBlock(O3_META, delInputs.o3, (val) => onDelChange('o3', val))}
            {renderDimensionBlock(O4_META, delInputs.o4, (val) => onDelChange('o4', val))}
            {renderDimensionBlock(O5_META, delInputs.o5, (val) => onDelChange('o5', val))}
          </>
        )}
      </div>
    </div>
  );

  function renderDimensionBlock<T extends number>(
    meta: DimensionMetadata<T>,
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
          <span className="text-slate-500 font-medium">Foundation:</span> {meta.theoreticalBasis}
        </p>

        {/* Radio-Pill 4-Anchor Cards */}
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
