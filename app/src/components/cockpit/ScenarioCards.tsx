'use client';

import React from 'react';
import { COCKPIT_PRESETS, CockpitPresetScenario, COCKPIT_QUADRANTS } from '@/lib/engine/cockpit-engine';
import { Sparkles, ArrowRight, ShieldAlert, CheckCircle2 } from 'lucide-react';

interface ScenarioCardsProps {
  activeScenarioId?: string;
  onSelectScenario: (scenario: CockpitPresetScenario) => void;
}

export const ScenarioCards: React.FC<ScenarioCardsProps> = ({
  activeScenarioId,
  onSelectScenario,
}) => {
  return (
    <div className="w-full">
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <Sparkles className="w-4 h-4 text-amber-400" />
          <h3 className="text-xs font-semibold uppercase tracking-wider text-slate-300">
            Executive Archetype Presets (One-Click Calibration)
          </h3>
        </div>
        <span className="text-[11px] text-slate-500 font-mono">
          Click any archetype to calibrate the cockpit
        </span>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
        {COCKPIT_PRESETS.map((scenario) => {
          const isSelected = activeScenarioId === scenario.id;
          const qDef = COCKPIT_QUADRANTS[scenario.expectedQuadrant];

          return (
            <button
              key={scenario.id}
              onClick={() => onSelectScenario(scenario)}
              className={`group relative text-left p-3.5 rounded-xl border transition-all duration-200 flex flex-col justify-between ${
                isSelected
                  ? 'bg-slate-900/95 border-emerald-500/60 shadow-lg shadow-emerald-950/40 ring-1 ring-emerald-500/30'
                  : 'bg-slate-900/60 border-slate-800 hover:border-slate-700 hover:bg-slate-850/80'
              }`}
            >
              <div>
                <div className="flex items-center justify-between gap-1 mb-2">
                  <span
                    className={`text-[10px] font-bold font-mono px-2 py-0.5 rounded border ${qDef.badgeClass}`}
                  >
                    {scenario.expectedQuadrant}: {qDef.name}
                  </span>

                  {scenario.expectedPenalty && (
                    <span className="text-[9px] font-mono font-bold px-1.5 py-0.5 rounded bg-rose-500/20 text-rose-300 border border-rose-500/30">
                      +10 Penalty
                    </span>
                  )}

                  <ArrowRight
                    className={`w-3.5 h-3.5 text-slate-500 transition-transform group-hover:translate-x-1 ${
                      isSelected ? 'text-emerald-400' : ''
                    }`}
                  />
                </div>

                <div className="font-bold text-xs text-white mb-1">
                  {scenario.name}
                </div>

                <p className="text-[11px] text-slate-400 leading-snug line-clamp-2">
                  {scenario.subtitle}
                </p>
              </div>

              <div className="mt-3 pt-2 border-t border-slate-800/80 flex items-center justify-between text-[10px] text-slate-500 font-mono">
                <span>D: [{Object.values(scenario.gov).join(',')}]</span>
                <span>O: [{Object.values(scenario.del).join(',')}]</span>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
};
