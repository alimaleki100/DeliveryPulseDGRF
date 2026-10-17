'use client';

import React from 'react';
import { PRESET_SCENARIOS, PresetScenario, QUADRANT_DEFINITIONS } from '@/lib/engine/prj-evaluator';
import { Sparkles, ArrowRight } from 'lucide-react';

interface ScenarioCardsProps {
  activeScenarioId?: string;
  onSelectScenario: (scenario: PresetScenario) => void;
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
            Executive Archetype Presets
          </h3>
        </div>
        <span className="text-[11px] text-slate-500">
          Click any archetype to calibrate the cockpit
        </span>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-2.5">
        {PRESET_SCENARIOS.map((scenario) => {
          const isSelected = activeScenarioId === scenario.id;
          const qDef = QUADRANT_DEFINITIONS[scenario.expectedQuadrant];

          return (
            <button
              key={scenario.id}
              onClick={() => onSelectScenario(scenario)}
              className={`group relative text-left p-3 rounded-xl border transition-all duration-200 ${
                isSelected
                  ? 'bg-slate-800/95 border-emerald-500/60 shadow-lg shadow-emerald-950/40 ring-1 ring-emerald-500/30'
                  : 'bg-slate-900/70 border-slate-800 hover:border-slate-700 hover:bg-slate-850/80'
              }`}
            >
              <div className="flex items-center justify-between gap-1 mb-1.5">
                <span
                  className={`text-[10px] font-bold px-1.5 py-0.5 rounded border ${qDef.badgeClass}`}
                >
                  {scenario.expectedQuadrant}
                </span>
                <ArrowRight className={`w-3.5 h-3.5 text-slate-500 transition-transform group-hover:translate-x-0.5 ${
                  isSelected ? 'text-emerald-400' : ''
                }`} />
              </div>

              <div className="font-semibold text-xs text-slate-200 line-clamp-1 mb-1">
                {scenario.name}
              </div>

              <p className="text-[11px] text-slate-400 line-clamp-2 leading-tight">
                {scenario.subtitle}
              </p>
            </button>
          );
        })}
      </div>
    </div>
  );
};
