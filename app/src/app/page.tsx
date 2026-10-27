'use client';

import React, { useState, useMemo } from 'react';
import {
  GovernanceMode,
  ProjectScores,
  ProductScores,
  PROJECT_PHASES,
  PRODUCT_PHASES,
  calculateDualModeDGRF,
  getDefaultProjectScores,
  getDefaultProductScores,
  DualModeEvaluation,
} from '@/lib/engine/dual-mode-engine';
import { TriAgentOutput } from '@/lib/gemini';
import { DimensionSlider } from '@/components/cockpit/DimensionSlider';
import { RiskMatrix } from '@/components/matrix/RiskMatrix';
import { RiskRadar } from '@/components/radar/RiskRadar';
import { DiagnosticSummaryFooter } from '@/components/cockpit/DiagnosticSummaryFooter';
import { TriAgentModal } from '@/components/cockpit/TriAgentModal';
import {
  Briefcase,
  Boxes,
  Sparkles,
  RefreshCw,
  ShieldAlert,
  Activity,
  AlertTriangle,
  Clock,
  ArrowRight,
  SlidersHorizontal,
  ChevronRight,
  Compass,
  FileCheck2,
  Zap,
} from 'lucide-react';

const SUGGESTED_PROJECT_NAMES = [
  'Core Modernization Wave 1 (Cloud & Microservices)',
  'Enterprise SAP S/4HANA Global Migration',
  'Real-Time Payment Gateway & Clearing Engine',
  'Healthcare Interoperability Data Lakehouse',
];

const SUGGESTED_PRODUCT_NAMES = [
  'PulseAI Enterprise Copilot & Insights Engine',
  'Multi-Tenant SaaS B2B Self-Serve Portal',
  'Embedded FinTech Lending & Credit Ledger',
  'Omnichannel Logistics Dispatch Platform',
];

export default function DiagnosticCockpitPage() {
  // Step 1: Mode Selection
  const [mode, setMode] = useState<GovernanceMode>('project');

  // Step 2: Phase Selection
  const [projectPhase, setProjectPhase] = useState<string>('execution');
  const [productPhase, setProductPhase] = useState<string>('scale');

  // Step 3: Questionnaires State
  const [activePart, setActivePart] = useState<'gov' | 'del'>('gov');
  const [projectScores, setProjectScores] = useState<ProjectScores>(getDefaultProjectScores());
  const [productScores, setProductScores] = useState<ProductScores>(getDefaultProductScores());

  // Program/Initiative Name
  const [customInitiativeName, setCustomInitiativeName] = useState<string>('');

  // AI Tri-Agent Modal State
  const [isTriAgentModalOpen, setIsTriAgentModalOpen] = useState(false);
  const [triAgentBrief, setTriAgentBrief] = useState<TriAgentOutput | null>(null);
  const [isLoadingBrief, setIsLoadingBrief] = useState(false);

  const activePhase = mode === 'project' ? projectPhase : productPhase;
  const activePhases = mode === 'project' ? PROJECT_PHASES : PRODUCT_PHASES;

  const activeInitiativeTitle = useMemo(() => {
    if (customInitiativeName.trim()) return customInitiativeName.trim();
    return mode === 'project'
      ? SUGGESTED_PROJECT_NAMES[0]
      : SUGGESTED_PRODUCT_NAMES[0];
  }, [customInitiativeName, mode]);

  // Real-time evaluation
  const evaluation: DualModeEvaluation = useMemo(() => {
    return calculateDualModeDGRF(mode, activePhase, projectScores, productScores);
  }, [mode, activePhase, projectScores, productScores]);

  // Handlers for score changes
  const handleProjectScoreChange = (key: keyof ProjectScores, val: any) => {
    setProjectScores((prev) => ({
      ...prev,
      [key]: val,
    }));
  };

  const handleProductScoreChange = (key: keyof ProductScores, val: any) => {
    setProductScores((prev) => ({
      ...prev,
      [key]: val,
    }));
  };

  const handleResetScores = () => {
    if (mode === 'project') {
      setProjectScores(getDefaultProjectScores());
    } else {
      setProductScores(getDefaultProductScores());
    }
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
            name: activeInitiativeTitle,
            industry: mode === 'project' ? 'Enterprise IT & Cloud' : 'B2B SaaS / Product',
            budget: mode === 'project' ? '$24.5M Capital IT' : '$4.2M Annual Run-Rate',
          },
        }),
      });

      if (!res.ok) {
        throw new Error(`Failed to generate brief: ${res.statusText}`);
      }

      const data = await res.json();
      setTriAgentBrief(data.brief);
      setIsTriAgentModalOpen(true);
    } catch (err) {
      console.error('Error generating AI clinical brief:', err);
    } finally {
      setIsLoadingBrief(false);
    }
  };

  return (
    <div className="space-y-8 pb-32">
      {/* Cockpit Executive Action Bar */}
      <section className="rounded-2xl border border-slate-800/90 bg-slate-900/80 p-5 shadow-xl backdrop-blur-md">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-xl bg-gradient-to-br from-indigo-500 via-indigo-600 to-sky-600 flex items-center justify-center shadow-lg shadow-indigo-500/20 border border-indigo-400/30 shrink-0">
              <Compass className="h-5 w-5 text-white" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-lg font-bold tracking-tight text-white">
                  DGRF Diagnostic Cockpit
                </h1>
                <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded bg-indigo-500/15 border border-indigo-500/30 text-indigo-400">
                  Dual-Mode 4-Step Engine
                </span>
              </div>
              <p className="text-xs text-slate-400">
                Empirical Governance & Delivery Decoupling Architecture
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={handleResetScores}
              className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl border border-slate-800 bg-slate-950/70 hover:bg-slate-800 text-xs font-medium text-slate-300 transition-colors"
              title="Reset scores to baseline defaults"
            >
              <RefreshCw className="h-3.5 w-3.5" />
              Reset Inputs
            </button>
            <button
              onClick={handleGenerateTriAgentBrief}
              disabled={isLoadingBrief}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-gradient-to-r from-indigo-600 via-indigo-500 to-sky-600 hover:from-indigo-500 hover:to-sky-500 text-white font-medium text-xs shadow-lg shadow-indigo-500/25 transition-all disabled:opacity-50"
            >
              <Sparkles className="h-4 w-4" />
              {isLoadingBrief ? 'Consulting Tri-Agent Squad...' : 'Generate AI Clinical Brief'}
            </button>
          </div>
        </div>
      </section>
        {/* Initiative Name Input & Overview Bar */}
        <section className="rounded-2xl border border-slate-800/80 bg-slate-900/60 p-4 sm:p-5 backdrop-blur-sm">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="flex-1">
              <label className="block text-xs font-mono uppercase tracking-wider text-slate-400 mb-1">
                Active Assessment Target / Initiative Name
              </label>
              <input
                type="text"
                value={customInitiativeName}
                onChange={(e) => setCustomInitiativeName(e.target.value)}
                placeholder={mode === 'project' ? SUGGESTED_PROJECT_NAMES[0] : SUGGESTED_PRODUCT_NAMES[0]}
                className="w-full bg-slate-950/80 border border-slate-800 rounded-lg px-3.5 py-2 text-sm text-slate-200 placeholder-slate-500 focus:outline-none focus:border-indigo-500/60 focus:ring-1 focus:ring-indigo-500/40"
              />
            </div>
            <div className="flex items-center gap-2 text-xs text-slate-400 self-end md:self-center">
              <span className="font-mono text-slate-500">Benchmark Mode:</span>
              <span className="px-2 py-1 rounded bg-slate-800/70 text-slate-300 font-medium">
                {mode === 'project' ? 'PMWJ Oct 2026 Canonical' : 'PrdModule Horizon Standard'}
              </span>
            </div>
          </div>
        </section>

        {/* STEP 1: Governance Mode Selection */}
        <section className="space-y-3">
          <div className="flex items-center gap-2">
            <span className="flex h-6 w-6 items-center justify-center rounded-full bg-indigo-500/20 text-xs font-bold font-mono text-indigo-400 border border-indigo-500/30">
              1
            </span>
            <h2 className="text-base font-semibold text-slate-100">Step 1: Governance Mode Selection</h2>
            <span className="text-xs text-slate-400">— Choose operational context</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Enterprise Project Mode Card */}
            <div
              onClick={() => setMode('project')}
              className={`cursor-pointer rounded-2xl p-5 border transition-all text-left relative overflow-hidden ${
                mode === 'project'
                  ? 'border-indigo-500/80 bg-indigo-950/20 shadow-lg shadow-indigo-500/10 ring-1 ring-indigo-500/40'
                  : 'border-slate-800 bg-slate-900/40 hover:border-slate-700 hover:bg-slate-900/60'
              }`}
            >
              <div className="flex items-start justify-between gap-3">
                <div className="flex items-center gap-3">
                  <div
                    className={`h-10 w-10 rounded-xl flex items-center justify-center transition-colors ${
                      mode === 'project'
                        ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/30'
                        : 'bg-slate-800 text-slate-400'
                    }`}
                  >
                    <Briefcase className="h-5 w-5" />
                  </div>
                  <div>
                    <h3 className="text-sm font-bold text-white">Enterprise Project Mode (DGRF-Project)</h3>
                    <p className="text-xs text-slate-400">Fixed-Scope, Capital IT, COTS & Systems Integration</p>
                  </div>
                </div>
                {mode === 'project' && (
                  <span className="px-2 py-0.5 rounded text-[10px] font-bold font-mono bg-indigo-500/20 text-indigo-300 border border-indigo-500/40">
                    ACTIVE
                  </span>
                )}
              </div>

              <div className="mt-4 pt-3 border-t border-slate-800/80 space-y-1.5 text-xs text-slate-400">
                <div className="flex items-center justify-between">
                  <span className="text-slate-400">Target:</span>
                  <span className="text-slate-300 font-medium">ERP, Core Banking, Data Warehouses, Infrastructure</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-slate-400">Dual Axes:</span>
                  <span className="text-slate-300 font-mono">Structural Gov (PrjGov) vs. Operational Del (PrjDel)</span>
                </div>
              </div>
            </div>

            {/* Digital Product Mode Card */}
            <div
              onClick={() => setMode('product')}
              className={`cursor-pointer rounded-2xl p-5 border transition-all text-left relative overflow-hidden ${
                mode === 'product'
                  ? 'border-sky-500/80 bg-sky-950/20 shadow-lg shadow-sky-500/10 ring-1 ring-sky-500/40'
                  : 'border-slate-800 bg-slate-900/40 hover:border-slate-700 hover:bg-slate-900/60'
              }`}
            >
              <div className="flex items-start justify-between gap-3">
                <div className="flex items-center gap-3">
                  <div
                    className={`h-10 w-10 rounded-xl flex items-center justify-center transition-colors ${
                      mode === 'product'
                        ? 'bg-sky-600 text-white shadow-md shadow-sky-600/30'
                        : 'bg-slate-800 text-slate-400'
                    }`}
                  >
                    <Boxes className="h-5 w-5" />
                  </div>
                  <div>
                    <h3 className="text-sm font-bold text-white">Digital Product Mode (DGRF-Product / PrdModule)</h3>
                    <p className="text-xs text-slate-400">Outcome-Driven SaaS, Digital Platforms & Continuous Discovery</p>
                  </div>
                </div>
                {mode === 'product' && (
                  <span className="px-2 py-0.5 rounded text-[10px] font-bold font-mono bg-sky-500/20 text-sky-300 border border-sky-500/40">
                    ACTIVE
                  </span>
                )}
              </div>

              <div className="mt-4 pt-3 border-t border-slate-800/80 space-y-1.5 text-xs text-slate-400">
                <div className="flex items-center justify-between">
                  <span className="text-slate-400">Target:</span>
                  <span className="text-slate-300 font-medium">B2B/B2C SaaS, Internal Developer Portals, Mobile Apps</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-slate-400">Dual Axes:</span>
                  <span className="text-slate-300 font-mono">Strategic Gov (PrdGov) vs. Operational Flow (PrdDel)</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* STEP 2: Lifecycle Phase Selector */}
        <section className="space-y-3">
          <div className="flex items-center gap-2">
            <span className="flex h-6 w-6 items-center justify-center rounded-full bg-indigo-500/20 text-xs font-bold font-mono text-indigo-400 border border-indigo-500/30">
              2
            </span>
            <h2 className="text-base font-semibold text-slate-100">Step 2: Lifecycle Phase Calibration</h2>
            <span className="text-xs text-slate-400">— Contextual sensitivity gate</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
            {activePhases.map((phase) => {
              const isSelected = activePhase === phase.id;
              return (
                <div
                  key={phase.id}
                  onClick={() => {
                    if (mode === 'project') setProjectPhase(phase.id);
                    else setProductPhase(phase.id);
                  }}
                  className={`cursor-pointer rounded-xl p-4 border transition-all text-left flex flex-col justify-between ${
                    isSelected
                      ? mode === 'project'
                        ? 'border-indigo-500 bg-indigo-950/30 shadow-md ring-1 ring-indigo-500/40'
                        : 'border-sky-500 bg-sky-950/30 shadow-md ring-1 ring-sky-500/40'
                      : 'border-slate-800/80 bg-slate-900/50 hover:border-slate-700 hover:bg-slate-800/40'
                  }`}
                >
                  <div>
                    <div className="flex items-center justify-between mb-1.5">
                      <span className="text-[10px] font-mono uppercase tracking-wider text-slate-400">
                        {phase.subtitle}
                      </span>
                      {isSelected && (
                        <span className="h-2 w-2 rounded-full bg-indigo-400 animate-pulse" />
                      )}
                    </div>
                    <h4 className="text-xs font-bold text-slate-100 leading-snug">{phase.name}</h4>
                  </div>
                  <div className="mt-3 pt-2.5 border-t border-slate-800/60">
                    <p className="text-[11px] text-slate-400 leading-normal line-clamp-2">
                      <strong className="text-slate-300">Focus:</strong> {phase.focus}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* STEP 3: Two-Part Interactive Questionnaires */}
        <section className="space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div className="flex items-center gap-2">
              <span className="flex h-6 w-6 items-center justify-center rounded-full bg-indigo-500/20 text-xs font-bold font-mono text-indigo-400 border border-indigo-500/30">
                3
              </span>
              <h2 className="text-base font-semibold text-slate-100">Step 3: Two-Part Diagnostic Questionnaire</h2>
              <span className="text-xs text-slate-400">— 10 discrete weighted dimensions</span>
            </div>

            {/* Quick stats / tab toggles */}
            <div className="flex items-center gap-2 text-xs font-mono">
              <span className="text-slate-400">Current Raw Gov:</span>
              <span className="px-2 py-0.5 rounded bg-amber-500/10 text-amber-300 border border-amber-500/20 font-bold">
                {evaluation.totalGov}/100
              </span>
              <span className="text-slate-500">|</span>
              <span className="text-slate-400">Current Raw Del:</span>
              <span className="px-2 py-0.5 rounded bg-sky-500/10 text-sky-300 border border-sky-500/20 font-bold">
                {evaluation.totalDel}/100
              </span>
            </div>
          </div>

          {/* Dimension Slider with 4 radio cards per question & Part 1 / Part 2 tabs */}
          <DimensionSlider
            mode={mode}
            activePart={activePart}
            onPartChange={setActivePart}
            projectScores={projectScores}
            productScores={productScores}
            onProjectScoreChange={handleProjectScoreChange}
            onProductScoreChange={handleProductScoreChange}
            penaltyActive={evaluation.penaltyActive}
            penaltyMessage={evaluation.penaltyMessage}
          />
        </section>

        {/* STEP 4: Real-Time Diagnostic Outputs */}
        <section className="space-y-4 pt-4 border-t border-slate-800">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="flex h-6 w-6 items-center justify-center rounded-full bg-indigo-500/20 text-xs font-bold font-mono text-indigo-400 border border-indigo-500/30">
                4
              </span>
              <h2 className="text-base font-semibold text-slate-100">Step 4: Real-Time Diagnostic Outputs</h2>
              <span className="text-xs text-slate-400">— Mathematical coordinate & radar projection</span>
            </div>

            <div className="flex items-center gap-2">
              <span className={`px-2.5 py-1 rounded-full text-xs font-bold border ${evaluation.quadrant.badgeClass}`}>
                {evaluation.quadrant.id}: {evaluation.quadrant.name}
              </span>
            </div>
          </div>

          {/* Grid Layout: 2x2 Matrix & Radar + Directives */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-stretch">
            {/* Left: 2x2 Matrix */}
            <div className="h-full">
              <RiskMatrix evaluation={evaluation} />
            </div>

            {/* Right: 10-Axis Live Radar & Score Breakdown */}
            <div className="h-full flex flex-col justify-between space-y-6">
              <RiskRadar evaluation={evaluation} />

              {/* 72-Hour Reset Directive Card */}
              <div className="rounded-2xl border border-slate-800 bg-slate-900/90 p-5 shadow-xl backdrop-blur-sm">
                <div className="flex items-center gap-2.5 mb-3 text-amber-400">
                  <Clock className="h-5 w-5" />
                  <h3 className="text-sm font-bold tracking-tight text-white">
                    {evaluation.immediate72HourReset.title}
                  </h3>
                </div>
                <div className="space-y-3 text-xs">
                  <div className="p-3 rounded-xl bg-slate-950/70 border border-slate-800/80">
                    <span className="text-[10px] font-mono uppercase text-slate-400 block mb-1">
                      Immediate Mandate / Triage Action
                    </span>
                    <p className="text-slate-200 font-medium leading-relaxed">
                      {evaluation.immediate72HourReset.action}
                    </p>
                  </div>
                  <div className="p-3 rounded-xl bg-slate-950/70 border border-slate-800/80">
                    <span className="text-[10px] font-mono uppercase text-slate-400 block mb-1">
                      Enforceable Deliverable (72h Horizon)
                    </span>
                    <p className="text-slate-300 font-mono text-[11px] leading-relaxed">
                      {evaluation.immediate72HourReset.deliverable}
                    </p>
                  </div>
                </div>

                <div className="mt-4 pt-3 border-t border-slate-800/80 flex items-center justify-between">
                  <span className="text-xs text-slate-400">
                    Diagnostic Confidence: <strong className="text-emerald-400 font-mono">Deterministic (100%)</strong>
                  </span>
                  <button
                    onClick={handleGenerateTriAgentBrief}
                    disabled={isLoadingBrief}
                    className="inline-flex items-center gap-1.5 text-xs text-indigo-400 hover:text-indigo-300 font-medium transition-colors"
                  >
                    Deep AI Advisory Squad
                    <ArrowRight className="h-3.5 w-3.5" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Diagnostic Footer with Score Readouts & Modal Launch */}
        <DiagnosticSummaryFooter
          evaluation={evaluation}
          onOpenTriAgentModal={handleGenerateTriAgentBrief}
          isLoadingBrief={isLoadingBrief}
        />

      {/* Tri-Agent Squad AI Clinical Brief Modal */}
      <TriAgentModal
        isOpen={isTriAgentModalOpen}
        onClose={() => setIsTriAgentModalOpen(false)}
        brief={triAgentBrief}
        evaluation={evaluation}
        projectName={activeInitiativeTitle}
      />
    </div>
  );
}
