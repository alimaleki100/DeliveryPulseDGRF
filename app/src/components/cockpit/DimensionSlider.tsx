'use client';

import React from 'react';
import {
  PRJ_GOV_META,
  PRJ_DEL_META,
  PrjGovInputs,
  PrjDelInputs,
  D1Anchor,
  D2Anchor,
  D3Anchor,
  D4Anchor,
  D5Anchor,
  O1Anchor,
  O2Anchor,
  O3Anchor,
  O4Anchor,
  O5Anchor,
} from '@/lib/engine/prj-evaluator';
import { ShieldAlert, Zap, AlertTriangle, Layers, Activity } from 'lucide-react';

interface DimensionSliderProps {
  activeTab: 'gov' | 'del';
  onTabChange: (tab: 'gov' | 'del') => void;
  govInputs: PrjGovInputs;
  delInputs: PrjDelInputs;
  onGovChange: (key: keyof PrjGovInputs, val: number) => void;
  onDelChange: (key: keyof PrjDelInputs, val: number) => void;
}

export const DimensionSlider: React.FC<DimensionSliderProps> = ({
  activeTab,
  onTabChange,
  govInputs,
  delInputs,
  onGovChange,
  onDelChange,
}) => {
  const govPenaltyActive = govInputs.d1 === 25 && govInputs.d2 >= 15;
  const delPenaltyActive = delInputs.o1 === 25 && delInputs.o2 >= 14;

  return (
    <div className="rounded-2xl bg-slate-900/90 border border-slate-800 p-5 shadow-2xl backdrop-blur-xl">
      {/* Tab Navigation */}
      <div className="flex items-center justify-between pb-4 border-b border-slate-800/80 mb-5">
        <div className="flex items-center gap-2">
          <button
            onClick={() => onTabChange('gov')}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold uppercase tracking-wider transition-all ${
              activeTab === 'gov'
                ? 'bg-amber-500/20 text-amber-300 border border-amber-500/40 shadow-sm'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
            }`}
          >
            <Layers className="w-3.5 h-3.5" />
            Structural Governance (D1–D5)
            {govPenaltyActive && (
              <span className="w-2 h-2 rounded-full bg-rose-500 animate-ping" />
            )}
          </button>

          <button
            onClick={() => onTabChange('del')}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold uppercase tracking-wider transition-all ${
              activeTab === 'del'
                ? 'bg-sky-500/20 text-sky-300 border border-sky-500/40 shadow-sm'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
            }`}
          >
            <Activity className="w-3.5 h-3.5" />
            Operational Delivery (O1–O5)
            {delPenaltyActive && (
              <span className="w-2 h-2 rounded-full bg-rose-500 animate-ping" />
            )}
          </button>
        </div>

        <span className="text-xs text-slate-500">
          Calibrate DGRF Actuarial Anchors
        </span>
      </div>

      {/* Cross-dimensional Penalty Alert Banners */}
      {activeTab === 'gov' && govPenaltyActive && (
        <div className="mb-5 p-3.5 rounded-xl bg-rose-950/60 border border-rose-500/50 flex items-start gap-3 text-rose-200 animate-fadeIn">
          <ShieldAlert className="w-5 h-5 text-rose-400 shrink-0 mt-0.5" />
          <div className="text-xs">
            <span className="font-bold uppercase tracking-wider text-rose-300 block mb-0.5">
              Structural Interaction Penalty Triggered (+10 Pts)
            </span>
            <span>
              Mathematical Rule: Absentee / Paralyzed Authority (D1 = 25) combined with Adversarial Vendor Contracting (D2 &ge; 15) unleashes unchecked vendor opportunism. +10 points added directly to composite Governance Risk.
            </span>
          </div>
        </div>
      )}

      {activeTab === 'del' && delPenaltyActive && (
        <div className="mb-5 p-3.5 rounded-xl bg-rose-950/60 border border-rose-500/50 flex items-start gap-3 text-rose-200 animate-fadeIn">
          <AlertTriangle className="w-5 h-5 text-rose-400 shrink-0 mt-0.5" />
          <div className="text-xs">
            <span className="font-bold uppercase tracking-wider text-rose-300 block mb-0.5">
              Operational Interaction Penalty Triggered (+10 Pts)
            </span>
            <span>
              Mathematical Rule: Critical Path Schedule Failure (O1 = 25) combined with Defect Inflow Expansion (O2 &ge; 14) triggers desperate test compression and technical debt spirals. +10 points added directly to composite Delivery Risk.
            </span>
          </div>
        </div>
      )}

      {/* Dimension Items */}
      <div className="space-y-6">
        {activeTab === 'gov' ? (
          <>
            {renderDimensionCard('d1', PRJ_GOV_META.d1, govInputs.d1, (val) => onGovChange('d1', val))}
            {renderDimensionCard('d2', PRJ_GOV_META.d2, govInputs.d2, (val) => onGovChange('d2', val))}
            {renderDimensionCard('d3', PRJ_GOV_META.d3, govInputs.d3, (val) => onGovChange('d3', val))}
            {renderDimensionCard('d4', PRJ_GOV_META.d4, govInputs.d4, (val) => onGovChange('d4', val))}
            {renderDimensionCard('d5', PRJ_GOV_META.d5, govInputs.d5, (val) => onGovChange('d5', val))}
          </>
        ) : (
          <>
            {renderDimensionCard('o1', PRJ_DEL_META.o1, delInputs.o1, (val) => onDelChange('o1', val))}
            {renderDimensionCard('o2', PRJ_DEL_META.o2, delInputs.o2, (val) => onDelChange('o2', val))}
            {renderDimensionCard('o3', PRJ_DEL_META.o3, delInputs.o3, (val) => onDelChange('o3', val))}
            {renderDimensionCard('o4', PRJ_DEL_META.o4, delInputs.o4, (val) => onDelChange('o4', val))}
            {renderDimensionCard('o5', PRJ_DEL_META.o5, delInputs.o5, (val) => onDelChange('o5', val))}
          </>
        )}
      </div>
    </div>
  );

  function renderDimensionCard<T extends number>(
    key: string,
    meta: {
      code: string;
      title: string;
      weightLabel: string;
      description: string;
      options: { value: T; level: 1 | 2 | 3 | 4; label: string; description: string }[];
    },
    currentVal: T,
    onChange: (val: T) => void
  ) {
    return (
      <div key={key} className="p-4 rounded-xl bg-slate-950/60 border border-slate-800/80">
        <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
          <div className="flex items-center gap-2">
            <span className="font-mono font-bold text-xs px-2 py-0.5 rounded bg-slate-800 text-slate-200 border border-slate-700">
              {meta.code}
            </span>
            <span className="font-semibold text-sm text-slate-200">
              {meta.title}
            </span>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-xs text-slate-400">
              Max: <strong className="text-slate-200">{meta.weightLabel}</strong>
            </span>
            <span className="text-xs font-mono font-semibold px-2 py-0.5 rounded bg-slate-800 text-emerald-400 border border-slate-700">
              Score: {currentVal}
            </span>
          </div>
        </div>

        <p className="text-xs text-slate-400 mb-3.5">
          {meta.description}
        </p>

        {/* 4 Discrete Anchor Buttons */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2">
          {meta.options.map((opt) => {
            const isSelected = currentVal === opt.value;
            const levelColors = {
              1: isSelected ? 'bg-emerald-500/20 border-emerald-500 text-emerald-300 ring-1 ring-emerald-500/50' : 'hover:border-slate-700 text-slate-300',
              2: isSelected ? 'bg-sky-500/20 border-sky-500 text-sky-300 ring-1 ring-sky-500/50' : 'hover:border-slate-700 text-slate-300',
              3: isSelected ? 'bg-amber-500/20 border-amber-500 text-amber-300 ring-1 ring-amber-500/50' : 'hover:border-slate-700 text-slate-300',
              4: isSelected ? 'bg-rose-500/20 border-rose-500 text-rose-300 ring-1 ring-rose-500/50' : 'hover:border-slate-700 text-slate-300',
            };

            return (
              <button
                key={opt.value}
                onClick={() => onChange(opt.value)}
                className={`text-left p-2.5 rounded-lg border text-xs transition-all duration-150 flex flex-col justify-between ${
                  isSelected
                    ? levelColors[opt.level]
                    : 'bg-slate-900/80 border-slate-800 hover:bg-slate-850'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-[10px] font-mono text-slate-500 uppercase">
                      L{opt.level}
                    </span>
                    <span className={`font-mono font-bold text-xs ${
                      isSelected ? 'text-white' : 'text-slate-400'
                    }`}>
                      {opt.value} pts
                    </span>
                  </div>
                  <div className="font-semibold text-[11px] mb-1 line-clamp-1">
                    {opt.label}
                  </div>
                </div>

                <p className="text-[10px] text-slate-400 leading-tight line-clamp-3">
                  {opt.description}
                </p>
              </button>
            );
          })}
        </div>
      </div>
    );
  }
};
