'use client';

import React, { useState, useMemo } from 'react';
import {
  calculateDGRF,
  PrjGovInputs,
  PrjDelInputs,
  PresetScenario,
  PRESET_SCENARIOS,
} from '@/lib/engine/prj-evaluator';
import { ScenarioCards } from '@/components/cockpit/ScenarioCards';
import { DimensionSlider } from '@/components/cockpit/DimensionSlider';
import { RiskMatrix } from '@/components/matrix/RiskMatrix';
import { RiskRadar } from '@/components/radar/RiskRadar';
import { ExecutiveSummary } from '@/components/cockpit/ExecutiveSummary';
import { LeadModal } from '@/components/cockpit/LeadModal';
import { Sliders, RefreshCw, BarChart3, HelpCircle } from 'lucide-react';

export default function DiagnosticCockpitPage() {
  const [projectName, setProjectName] = useState('Core Modernization Wave 1');
  const [activeScenarioId, setActiveScenarioId] = useState<string>('legacy-core');
  const [activeTab, setActiveTab] = useState<'gov' | 'del'>('gov');
  const [isLeadModalOpen, setIsLeadModalOpen] = useState(false);

  // Initial State seeded from first scenario
  const [govInputs, setGovInputs] = useState<PrjGovInputs>(PRESET_SCENARIOS[0].gov);
  const [delInputs, setDelInputs] = useState<PrjDelInputs>(PRESET_SCENARIOS[0].del);

  // Real-time pure evaluation calculation
  const evaluation = useMemo(() => {
    return calculateDGRF(govInputs, delInputs);
  }, [govInputs, delInputs]);

  // Handle Scenario selection
  const handleSelectScenario = (scenario: PresetScenario) => {
    setActiveScenarioId(scenario.id);
    setGovInputs({ ...scenario.gov });
    setDelInputs({ ...scenario.del });
  };

  // Handle individual anchor changes
  const handleGovChange = (key: keyof PrjGovInputs, val: number) => {
    setActiveScenarioId('custom');
    setGovInputs((prev) => ({
      ...prev,
      [key]: val,
    }));
  };

  const handleDelChange = (key: keyof PrjDelInputs, val: number) => {
    setActiveScenarioId('custom');
    setDelInputs((prev) => ({
      ...prev,
      [key]: val,
    }));
  };

  const handleResetToBenchmark = () => {
    const benchmark = PRESET_SCENARIOS.find((s) => s.id === 'resilient-benchmark') || PRESET_SCENARIOS[2];
    handleSelectScenario(benchmark);
  };

  return (
    <div className="space-y-8 animate-fadeIn">
      {/* Title & Project Context Banner */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 pb-6 border-b border-slate-800">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="px-2 py-0.5 rounded text-[11px] font-bold uppercase tracking-wider bg-emerald-500/10 text-emerald-400 border border-emerald-500/30">
              Interactive Diagnostic Cockpit
            </span>
            <span className="text-slate-500 text-xs">·</span>
            <span className="text-slate-400 text-xs font-mono">Ali Maleki DGRF Engine</span>
          </div>

          <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
            Delivery & Governance Risk Framework
          </h1>
          <p className="text-sm text-slate-400 mt-1 max-w-3xl">
            Decoupling Structural Governance (<code className="text-amber-400">PrjGov</code>) from Operational Delivery (<code className="text-sky-400">PrjDel</code>) to isolate root-cause failure vectors in enterprise IT initiatives.
          </p>
        </div>

        {/* Project Name Quick-Input */}
        <div className="flex items-center gap-3">
          <div className="flex flex-col text-xs">
            <label className="text-slate-400 text-[11px] font-medium mb-1">
              Active Enterprise Program:
            </label>
            <input
              type="text"
              value={projectName}
              onChange={(e) => setProjectName(e.target.value)}
              placeholder="e.g. Core Banking Transformation"
              className="px-3 py-1.5 rounded-lg bg-slate-900 border border-slate-800 text-slate-200 text-xs focus:outline-none focus:border-emerald-500 transition-colors w-64"
            />
          </div>

          <button
            onClick={handleResetToBenchmark}
            title="Reset to Resilient Benchmark (Q3)"
            className="mt-4 p-2 rounded-lg bg-slate-900 hover:bg-slate-800 text-slate-400 hover:text-slate-200 border border-slate-800 transition-colors"
          >
            <RefreshCw className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Preset Scenarios Carousel / Selector */}
      <section>
        <ScenarioCards
          activeScenarioId={activeScenarioId}
          onSelectScenario={handleSelectScenario}
        />
      </section>

      {/* Visual Diagnostic Section: 2x2 Matrix & Real-Time Radar */}
      <section className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <RiskMatrix evaluation={evaluation} />
        <RiskRadar evaluation={evaluation} />
      </section>

      {/* Dimension Anchor Controls (D1-D5 & O1-O5) */}
      <section>
        <DimensionSlider
          activeTab={activeTab}
          onTabChange={setActiveTab}
          govInputs={govInputs}
          delInputs={delInputs}
          onGovChange={handleGovChange}
          onDelChange={handleDelChange}
        />
      </section>

      {/* Executive Prescriptions & Clinical Brief */}
      <section>
        <ExecutiveSummary
          evaluation={evaluation}
          projectName={projectName}
          onOpenLeadModal={() => setIsLeadModalOpen(true)}
        />
      </section>

      {/* Advisory Consultation Modal */}
      <LeadModal
        isOpen={isLeadModalOpen}
        onClose={() => setIsLeadModalOpen(false)}
        evaluation={evaluation}
        projectName={projectName}
      />
    </div>
  );
}
