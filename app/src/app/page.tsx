'use client';

import React, { useState, useMemo } from 'react';
import {
  calculateCockpitDGRF,
  CockpitGovInputs,
  CockpitDelInputs,
  CockpitPresetScenario,
  COCKPIT_PRESETS,
} from '@/lib/engine/cockpit-engine';
import { TriAgentOutput } from '@/lib/gemini';
import { ScenarioCards } from '@/components/cockpit/ScenarioCards';
import { DimensionSlider } from '@/components/cockpit/DimensionSlider';
import { RiskMatrix } from '@/components/matrix/RiskMatrix';
import { RiskRadar } from '@/components/radar/RiskRadar';
import { DiagnosticSummaryFooter } from '@/components/cockpit/DiagnosticSummaryFooter';
import { TriAgentModal } from '@/components/cockpit/TriAgentModal';
import {
  Sparkles,
  RefreshCw,
  FolderGit2,
  ChevronDown,
  ShieldAlert,
  BrainCircuit,
  FileCheck2,
  CheckCircle2,
  AlertTriangle,
  Info,
  Layers,
} from 'lucide-react';

const ENTERPRISE_PROGRAMS = [
  'Core Modernization Wave 1 (Cloud & Microservices)',
  'Commercial Off-The-Shelf (COTS) ERP Migration',
  'Global Real-Time Payments Gateway v3',
  'Healthcare Regulatory Interoperability Platform',
];

export default function DiagnosticCockpitPage() {
  const [selectedProgram, setSelectedProgram] = useState(ENTERPRISE_PROGRAMS[0]);
  const [customProgramName, setCustomProgramName] = useState('');
  const [activeScenarioId, setActiveScenarioId] = useState<string>('case-a-bi');
  const [activeTab, setActiveTab] = useState<'gov' | 'del'>('gov');

  // Tri-Agent AI Modal State
  const [isTriAgentModalOpen, setIsTriAgentModalOpen] = useState(false);
  const [triAgentBrief, setTriAgentBrief] = useState<TriAgentOutput | null>(null);
  const [isLoadingBrief, setIsLoadingBrief] = useState(false);

  // Initial State seeded from first preset (Case A)
  const [govInputs, setGovInputs] = useState<CockpitGovInputs>(COCKPIT_PRESETS[0].gov);
  const [delInputs, setDelInputs] = useState<CockpitDelInputs>(COCKPIT_PRESETS[0].del);

  // Real-time pure evaluation calculation
  const evaluation = useMemo(() => {
    return calculateCockpitDGRF(govInputs, delInputs);
  }, [govInputs, delInputs]);

  const activeProjectTitle = customProgramName.trim() || selectedProgram;

  // Handle preset scenario selection
  const handleSelectScenario = (scenario: CockpitPresetScenario) => {
    setActiveScenarioId(scenario.id);
    setGovInputs({ ...scenario.gov });
    setDelInputs({ ...scenario.del });
  };

  // Handle individual anchor adjustments
  const handleGovChange = (key: keyof CockpitGovInputs, val: any) => {
    setActiveScenarioId('custom');
    setGovInputs((prev) => ({
      ...prev,
      [key]: val,
    }));
  };

  const handleDelChange = (key: keyof CockpitDelInputs, val: any) => {
    setActiveScenarioId('custom');
    setDelInputs((prev) => ({
      ...prev,
      [key]: val,
    }));
  };

  const handleResetToBenchmark = () => {
    const benchmark = COCKPIT_PRESETS.find((s) => s.id === 'case-d-resilient') || COCKPIT_PRESETS[3];
    handleSelectScenario(benchmark);
  };

  // Generate Tri-Agent Squad AI Clinical Brief
  const handleGenerateTriAgentBrief = async () => {
    setIsLoadingBrief(true);
    try {
      const res = await fetch('/api/diagnose', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          evaluation,
          projectContext: {
            name: activeProjectTitle,
            industry: 'Global Enterprise IT',
            budget: '$15M+',
          },
        }),
      });

      if (!res.ok) {
        throw new Error(`Failed to generate brief (status ${res.status})`);
      }

      const data = await res.json();
      if (data.brief) {
        setTriAgentBrief(data.brief);
        setIsTriAgentModalOpen(true);
      }
    } catch (err) {
      console.error('Error contacting Tri-Agent API route:', err);
    } finally {
      setIsLoadingBrief(false);
    }
  };

  return (
    <div className="space-y-8 animate-fadeIn pb-16">
      {/* Top Banner: Context & Program Switcher */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 pb-6 border-b border-[#1E293B]">
        <div>
          <div className="flex items-center gap-2 mb-1.5">
            <span className="px-2.5 py-0.5 rounded text-[11px] font-mono font-bold uppercase tracking-wider bg-indigo-500/10 text-indigo-400 border border-indigo-500/30">
              Interactive DGRF Cockpit
            </span>
            <span className="text-slate-600">·</span>
            <span className="text-slate-400 text-xs font-mono">
              Ali Maleki Mathematical Model
            </span>
          </div>

          <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
            Delivery & Governance Risk Diagnostic Plane
          </h1>
          <p className="text-sm text-slate-400 mt-1 max-w-3xl leading-relaxed">
            Decoupling Structural Governance (<code className="text-amber-400 font-mono">PrjGov</code>) from Operational Delivery (<code className="text-sky-400 font-mono">PrjDel</code>) to mathematically isolate root-cause failure vectors and calculate nonlinear interaction penalties.
          </p>
        </div>

        {/* Enterprise Program Switcher Dropdown & Reset */}
        <div className="flex flex-col sm:flex-row sm:items-center gap-2.5">
          <div className="flex flex-col text-xs">
            <label className="text-slate-400 text-[11px] font-semibold mb-1 flex items-center gap-1.5">
              <FolderGit2 className="w-3.5 h-3.5 text-emerald-400" />
              Active Enterprise Program:
            </label>
            <div className="relative">
              <select
                value={selectedProgram}
                onChange={(e) => {
                  setSelectedProgram(e.target.value);
                  setCustomProgramName('');
                }}
                className="w-72 appearance-none px-3 py-2 rounded-xl bg-slate-900 border border-slate-800 text-slate-200 text-xs font-medium focus:outline-none focus:border-indigo-500 pr-8 transition-colors cursor-pointer"
              >
                {ENTERPRISE_PROGRAMS.map((prog) => (
                  <option key={prog} value={prog}>
                    {prog}
                  </option>
                ))}
              </select>
              <ChevronDown className="w-4 h-4 text-slate-500 absolute right-2.5 top-2.5 pointer-events-none" />
            </div>
          </div>

          <button
            onClick={handleResetToBenchmark}
            title="Reset to Case D: Resilient Benchmark (Q3)"
            className="sm:mt-5 p-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-400 hover:text-emerald-400 border border-slate-800 transition-colors flex items-center gap-1.5 text-xs font-medium"
          >
            <RefreshCw className="w-4 h-4" />
            <span className="sm:hidden">Reset to Benchmark</span>
          </button>
        </div>
      </div>

      {/* Preset Scenarios: One-Click Archetypes */}
      <section>
        <ScenarioCards
          activeScenarioId={activeScenarioId}
          onSelectScenario={handleSelectScenario}
        />
      </section>

      {/* Visual Diagnostic Twin: 2x2 Matrix & 10-Axis Live Radar */}
      <section className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <RiskMatrix evaluation={evaluation} />
        <RiskRadar evaluation={evaluation} />
      </section>

      {/* Dimension Anchor Controls (D1..D5 and O1..O5) */}
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

      {/* Tri-Agent Squad Consultation Banner Card */}
      <section className="p-6 rounded-2xl bg-gradient-to-r from-slate-900 via-slate-900 to-indigo-950/40 border border-slate-800 shadow-2xl backdrop-blur-xl flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="space-y-1.5 max-w-2xl">
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-0.5 rounded text-[10px] font-mono font-bold bg-indigo-500/20 text-indigo-300 border border-indigo-500/40 uppercase">
              Tri-Agent Squad Advisory
            </span>
            <span className="text-slate-500 text-xs font-mono">· Gemini 2.5 Flash</span>
          </div>

          <h3 className="text-lg font-bold text-white">
            Need an Executive Board-Ready Clinical Report?
          </h3>
          <p className="text-xs text-slate-300 leading-relaxed">
            Run our multi-agent diagnostic pipeline: <strong className="text-rose-400">Agent 1 (Triage Lead)</strong> diagnoses governance traps, <strong className="text-amber-400">Agent 2 (Actuary)</strong> calculates capital exposure and nonlinear penalties, and <strong className="text-emerald-400">Agent 3 (Recovery Architect)</strong> drafts a prioritized 72-hour reset mandate with 30-60-90 day intervention blueprints.
          </p>
        </div>

        <button
          onClick={handleGenerateTriAgentBrief}
          disabled={isLoadingBrief}
          className="shrink-0 inline-flex items-center gap-2.5 px-5 py-3 rounded-xl text-xs font-bold bg-gradient-to-r from-indigo-600 via-indigo-500 to-emerald-500 hover:from-indigo-500 hover:to-emerald-400 text-white shadow-xl shadow-indigo-950/80 transition-all active:scale-[0.98] disabled:opacity-50"
        >
          <BrainCircuit className="w-4 h-4 text-amber-300" />
          <span>Launch Tri-Agent Diagnostic Squad</span>
        </button>
      </section>

      {/* Real-Time Diagnostic Summary Footer */}
      <DiagnosticSummaryFooter
        evaluation={evaluation}
        onOpenTriAgentModal={handleGenerateTriAgentBrief}
        isLoadingBrief={isLoadingBrief}
      />

      {/* Tri-Agent Advisory Brief Modal */}
      <TriAgentModal
        isOpen={isTriAgentModalOpen}
        onClose={() => setIsTriAgentModalOpen(false)}
        brief={triAgentBrief}
        evaluation={evaluation}
        projectName={activeProjectTitle}
      />
    </div>
  );
}
