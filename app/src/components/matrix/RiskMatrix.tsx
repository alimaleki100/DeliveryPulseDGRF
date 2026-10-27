'use client';

import React from 'react';
import { DualModeEvaluation } from '@/lib/engine/dual-mode-engine';

interface RiskMatrixProps {
  evaluation: DualModeEvaluation;
}

export const RiskMatrix: React.FC<RiskMatrixProps> = ({ evaluation }) => {
  const { mode, totalGov, totalDel, quadrant, bufferZone, penaltyActive } = evaluation;

  // Clamped coordinates between 0 and 100
  const x = Math.max(0, Math.min(100, totalDel));
  const y = Math.max(0, Math.min(100, totalGov));

  // In SVG coordinates, Y=0 is at top, Y=100 is at bottom.
  // We want Gov=100 at top, Gov=0 at bottom, so SVG Y = 100 - y.
  // Del=0 at left, Del=100 at right, so SVG X = x.
  const svgX = x;
  const svgY = 100 - y;

  const isProject = mode === 'project';

  // Dynamic quadrant labels per mode
  const qLabels = isProject
    ? {
        q1: { title: 'Q1 · Systemic Fragility', subtitle: 'Critical Multi-Vector Failure' },
        q2: { title: 'Q2 · Fragile Governance', subtitle: 'High Gov Risk / Low Del Risk' },
        q3: { title: 'Q3 · Resilient Equilibrium', subtitle: 'Target Enterprise Benchmark' },
        q4: { title: 'Q4 · Execution Constraint', subtitle: 'Sound Governance / Delivery Drag' },
      }
    : {
        q1: { title: 'Q1 · Death Spiral', subtitle: 'Terminal Churn & HiPPO Roadmap' },
        q2: { title: 'Q2 · Zombie Product', subtitle: 'Feature Factory Trap (Zero Traction)' },
        q3: { title: 'Q3 · Product-Led Engine', subtitle: 'Autonomous Trios & Scalable Discovery' },
        q4: { title: 'Q4 · Platform Bottleneck', subtitle: 'Validated Need / Architectural Drag' },
      };

  return (
    <div className="relative rounded-2xl bg-slate-900/90 border border-slate-800 p-5 shadow-2xl backdrop-blur-xl flex flex-col justify-between">
      {/* Matrix Header */}
      <div className="flex items-center justify-between pb-4 border-b border-slate-800/80 mb-4">
        <div>
          <div className="flex items-center gap-2">
            <span
              className="h-2 w-2 rounded-full animate-pulse"
              style={{ backgroundColor: quadrant.hexColor }}
            />
            <h3 className="text-sm font-semibold tracking-wider uppercase text-slate-300">
              {isProject ? 'DGRF-Project 2x2 Matrix' : 'DGRF-Product 2x2 Matrix'}
            </h3>
          </div>
          <p className="text-xs text-slate-500 mt-0.5 font-mono">
            {evaluation.delAxisName} (X) vs {evaluation.govAxisName} (Y)
          </p>
        </div>

        <div className="flex items-center gap-2">
          {bufferZone.active && (
            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-mono font-medium bg-indigo-500/10 text-indigo-400 border border-indigo-500/30 animate-pulse">
              <span className="w-1.5 h-1.5 rounded-full bg-indigo-400" />
              Buffer [40–60]
            </span>
          )}

          <span
            className={`px-2.5 py-1 rounded-full text-xs font-mono font-bold border ${quadrant.badgeClass}`}
          >
            {quadrant.id}: {quadrant.name}
          </span>
        </div>
      </div>

      {/* SVG Cartesian Coordinate Space */}
      <div className="relative aspect-square w-full max-w-[440px] mx-auto select-none my-auto">
        <svg viewBox="-10 -10 120 120" className="w-full h-full overflow-visible">
          <defs>
            {/* Grid pattern */}
            <pattern
              id="dual-matrix-subgrid"
              width="10"
              height="10"
              patternUnits="userSpaceOnUse"
            >
              <path
                d="M 10 0 L 0 0 0 10"
                fill="none"
                stroke="rgba(148, 163, 184, 0.05)"
                strokeWidth="0.5"
              />
            </pattern>

            {/* Glowing filter for target pin */}
            <filter id="matrix-target-glow" x="-50%" y="-50%" width="200%" height="200%">
              <feGaussianBlur stdDeviation="3" result="blur" />
              <feMerge>
                <feMergeNode in="blur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>

            {/* Buffer zone stripes */}
            <pattern
              id="dual-buffer-stripes"
              width="4"
              height="4"
              patternTransform="rotate(45 0 0)"
              patternUnits="userSpaceOnUse"
            >
              <line
                x1="0"
                y1="0"
                x2="0"
                y2="4"
                stroke="rgba(99, 102, 241, 0.14)"
                strokeWidth="1"
              />
            </pattern>
          </defs>

          {/* Background subgrid */}
          <rect x="0" y="0" width="100" height="100" fill="url(#dual-matrix-subgrid)" rx="4" />

          {/* Quadrant Tinting */}
          {/* Q2: Top-Left (Gov > 50, Del <= 50) */}
          <rect x="0" y="0" width="50" height="50" fill="rgba(245, 158, 11, 0.04)" />
          {/* Q1: Top-Right (Gov > 50, Del > 50) */}
          <rect x="50" y="0" width="50" height="50" fill="rgba(239, 68, 68, 0.05)" />
          {/* Q3: Bottom-Left (Gov <= 50, Del <= 50) */}
          <rect x="0" y="50" width="50" height="50" fill="rgba(16, 185, 129, 0.05)" />
          {/* Q4: Bottom-Right (Gov <= 50, Del > 50) */}
          <rect x="50" y="50" width="50" height="50" fill="rgba(14, 165, 233, 0.04)" />

          {/* 40-60 Buffer Zone Bands */}
          {/* Vertical Buffer (X 40 to 60) */}
          <rect x="40" y="0" width="20" height="100" fill="url(#dual-buffer-stripes)" />
          <line
            x1="40"
            y1="0"
            x2="40"
            y2="100"
            stroke="#6366f1"
            strokeWidth="0.5"
            strokeDasharray="2,2"
            strokeOpacity="0.4"
          />
          <line
            x1="60"
            y1="0"
            x2="60"
            y2="100"
            stroke="#6366f1"
            strokeWidth="0.5"
            strokeDasharray="2,2"
            strokeOpacity="0.4"
          />

          {/* Horizontal Buffer (SVG Y 40 to 60) */}
          <rect x="0" y="40" width="100" height="20" fill="url(#dual-buffer-stripes)" />
          <line
            x1="0"
            y1="40"
            x2="100"
            y2="40"
            stroke="#6366f1"
            strokeWidth="0.5"
            strokeDasharray="2,2"
            strokeOpacity="0.4"
          />
          <line
            x1="0"
            y1="60"
            x2="100"
            y2="60"
            stroke="#6366f1"
            strokeWidth="0.5"
            strokeDasharray="2,2"
            strokeOpacity="0.4"
          />

          {/* Central Threshold Axes (Theta = 50) */}
          <line
            x1="50"
            y1="0"
            x2="50"
            y2="100"
            stroke="#475569"
            strokeWidth="0.8"
            strokeDasharray="3,3"
          />
          <line
            x1="0"
            y1="50"
            x2="100"
            y2="50"
            stroke="#475569"
            strokeWidth="0.8"
            strokeDasharray="3,3"
          />

          {/* Outer Border */}
          <rect
            x="0"
            y="0"
            width="100"
            height="100"
            fill="none"
            stroke="#334155"
            strokeWidth="1.2"
            rx="2"
          />

          {/* Quadrant Labels */}
          {/* Q2 */}
          <g transform="translate(4, 8)">
            <text className="fill-amber-400/90 font-bold text-[4.3px] uppercase tracking-wide">
              {qLabels.q2.title}
            </text>
            <text className="fill-slate-500 text-[2.8px]">{qLabels.q2.subtitle}</text>
          </g>

          {/* Q1 */}
          <g transform="translate(54, 8)">
            <text className="fill-rose-400/90 font-bold text-[4.3px] uppercase tracking-wide">
              {qLabels.q1.title}
            </text>
            <text className="fill-slate-500 text-[2.8px]">{qLabels.q1.subtitle}</text>
          </g>

          {/* Q3 */}
          <g transform="translate(4, 92)">
            <text className="fill-emerald-400/90 font-bold text-[4.3px] uppercase tracking-wide">
              {qLabels.q3.title}
            </text>
            <text className="fill-slate-500 text-[2.8px]">{qLabels.q3.subtitle}</text>
          </g>

          {/* Q4 */}
          <g transform="translate(54, 92)">
            <text className="fill-sky-400/90 font-bold text-[4.3px] uppercase tracking-wide">
              {qLabels.q4.title}
            </text>
            <text className="fill-slate-500 text-[2.8px]">{qLabels.q4.subtitle}</text>
          </g>

          {/* Threshold markers */}
          <text x="50" y="103.5" textAnchor="middle" className="fill-slate-500 font-mono text-[3.2px]">
            θ=50
          </text>
          <text x="-3" y="51" textAnchor="end" className="fill-slate-500 font-mono text-[3.2px]">
            θ=50
          </text>

          {/* Pulsing Target Dot & Guidelines */}
          <circle
            cx={svgX}
            cy={svgY}
            r="6"
            fill={quadrant.hexColor}
            fillOpacity="0.25"
            className="animate-ping"
            style={{ transformOrigin: `${svgX}px ${svgY}px`, animationDuration: '2.5s' }}
          />

          <circle
            cx={svgX}
            cy={svgY}
            r="4.5"
            fill={quadrant.hexColor}
            fillOpacity="0.4"
            filter="url(#matrix-target-glow)"
          />

          <line
            x1={svgX}
            y1={svgY - 3}
            x2={svgX}
            y2="0"
            stroke={quadrant.hexColor}
            strokeWidth="0.4"
            strokeDasharray="1,2"
            strokeOpacity="0.6"
          />
          <line
            x1={svgX}
            y1={svgY + 3}
            x2={svgX}
            y2="100"
            stroke={quadrant.hexColor}
            strokeWidth="0.4"
            strokeDasharray="1,2"
            strokeOpacity="0.6"
          />
          <line
            x1="0"
            y1={svgY}
            x2={svgX - 3}
            y2={svgY}
            stroke={quadrant.hexColor}
            strokeWidth="0.4"
            strokeDasharray="1,2"
            strokeOpacity="0.6"
          />
          <line
            x1={svgX + 3}
            y1={svgY}
            x2="100"
            y2={svgY}
            stroke={quadrant.hexColor}
            strokeWidth="0.4"
            strokeDasharray="1,2"
            strokeOpacity="0.6"
          />

          {/* Center pinpoint */}
          <circle
            cx={svgX}
            cy={svgY}
            r="2.2"
            fill="#ffffff"
            stroke={quadrant.hexColor}
            strokeWidth="0.8"
          />
        </svg>

        {/* Floating Coordinates Readout */}
        <div
          className="absolute pointer-events-none transform -translate-x-1/2 -translate-y-8 px-2.5 py-1 rounded-md bg-slate-950/95 border border-slate-700 text-[11px] font-mono font-bold text-slate-100 shadow-xl whitespace-nowrap flex items-center gap-1.5"
          style={{
            left: `${x}%`,
            top: `${100 - y}%`,
          }}
        >
          <span className="text-sky-400">
            {isProject ? 'Del' : 'Traction'}: {totalDel}
          </span>
          <span className="text-slate-600">·</span>
          <span className="text-amber-400">Gov: {totalGov}</span>
        </div>
      </div>

      {/* Axis Information Footer */}
      <div className="mt-4 pt-3 border-t border-slate-800/80 grid grid-cols-2 gap-3 text-xs">
        <div className="flex items-start gap-2 text-slate-400">
          <span className="font-semibold font-mono text-slate-200 uppercase tracking-wider text-[10px] bg-slate-800 px-1.5 py-0.5 rounded">
            X-Axis
          </span>
          <div>
            <span className="text-slate-300 font-medium">{evaluation.delAxisName}:</span>{' '}
            <strong className="text-sky-400 font-mono">{totalDel}/100</strong>
            {evaluation.delPenalty > 0 && (
              <span className="text-rose-400 font-semibold block text-[11px]">
                (+{evaluation.delPenalty} Blind Leaky Bucket Penalty)
              </span>
            )}
            <span className="text-slate-500 block text-[11px]">
              {isProject ? '(O1 Schedule, O2 Burn, O3 Defects, O4 Morale, O5 Candor)' : '(P1 Retention, P2 Cycle Time, P3 LTV/CAC, P4 Telemetry, P5 Flow)'}
            </span>
          </div>
        </div>

        <div className="flex items-start gap-2 text-slate-400">
          <span className="font-semibold font-mono text-slate-200 uppercase tracking-wider text-[10px] bg-slate-800 px-1.5 py-0.5 rounded">
            Y-Axis
          </span>
          <div>
            <span className="text-slate-300 font-medium">{evaluation.govAxisName}:</span>{' '}
            <strong className="text-amber-400 font-mono">{totalGov}/100</strong>
            {evaluation.govPenalty > 0 && (
              <span className="text-rose-400 font-semibold block text-[11px]">
                (+{evaluation.govPenalty} Authority-Procurement Penalty)
              </span>
            )}
            <span className="text-slate-500 block text-[11px]">
              {isProject ? '(D1 Mandate, D2 Procurement, D3 Scope, D4 Reserve, D5 Architecture)' : '(G1 Vision, G2 Capital, G3 Autonomy, G4 Tech Debt, G5 Compliance)'}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
