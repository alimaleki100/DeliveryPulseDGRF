'use client';

import React from 'react';
import { CockpitEvaluation } from '@/lib/engine/cockpit-engine';
import { ShieldAlert, AlertCircle, Compass } from 'lucide-react';

interface RiskMatrixProps {
  evaluation: CockpitEvaluation;
}

export const RiskMatrix: React.FC<RiskMatrixProps> = ({ evaluation }) => {
  const { gov, del, quadrant, inBufferZone, hasGovPenalty } = evaluation;

  // Clamped coordinates between 0 and 100
  const x = Math.max(0, Math.min(100, del.totalScore));
  const y = Math.max(0, Math.min(100, gov.totalScore));

  // In SVG coordinates, Y=0 is at top, Y=100 is at bottom.
  // We want Gov=100 at top, Gov=0 at bottom, so SVG Y = 100 - y.
  // Delivery=0 at left, Delivery=100 at right, so SVG X = x.
  const svgX = x;
  const svgY = 100 - y;

  return (
    <div className="relative rounded-2xl bg-slate-900/90 border border-slate-800 p-5 shadow-2xl backdrop-blur-xl flex flex-col justify-between">
      {/* Header */}
      <div className="flex items-center justify-between pb-4 border-b border-slate-800/80 mb-4">
        <div>
          <div className="flex items-center gap-2">
            <span
              className="h-2 w-2 rounded-full animate-pulse"
              style={{ backgroundColor: quadrant.hexColor }}
            />
            <h3 className="text-sm font-semibold tracking-wider uppercase text-slate-300">
              DGRF 2x2 Diagnostic Matrix
            </h3>
          </div>
          <p className="text-xs text-slate-500 mt-0.5">
            Cartesian Plane: Operational Delivery (X) vs Structural Governance (Y)
          </p>
        </div>

        <div className="flex items-center gap-2">
          {inBufferZone && (
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
              id="matrix-subgrid"
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
            <filter id="matrix-glow" x="-50%" y="-50%" width="200%" height="200%">
              <feGaussianBlur stdDeviation="3" result="blur" />
              <feMerge>
                <feMergeNode in="blur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>

            {/* Buffer zone stripes */}
            <pattern
              id="buffer-pattern"
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
          <rect x="0" y="0" width="100" height="100" fill="url(#matrix-subgrid)" rx="4" />

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
          <rect x="40" y="0" width="20" height="100" fill="url(#buffer-pattern)" />
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
          <rect x="0" y="40" width="100" height="20" fill="url(#buffer-pattern)" />
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
            <text className="fill-amber-400/90 font-bold text-[4.5px] uppercase tracking-wide">
              Q2 · Fragile Governance
            </text>
            <text className="fill-slate-500 text-[3px]">High Gov Risk / Low Del Risk</text>
          </g>

          {/* Q1 */}
          <g transform="translate(54, 8)">
            <text className="fill-rose-400/90 font-bold text-[4.5px] uppercase tracking-wide">
              Q1 · Systemic Fragility
            </text>
            <text className="fill-slate-500 text-[3px]">Critical Multi-Vector Failure</text>
          </g>

          {/* Q3 */}
          <g transform="translate(4, 92)">
            <text className="fill-emerald-400/90 font-bold text-[4.5px] uppercase tracking-wide">
              Q3 · Resilient Equilibrium
            </text>
            <text className="fill-slate-500 text-[3px]">Target Enterprise Benchmark</text>
          </g>

          {/* Q4 */}
          <g transform="translate(54, 92)">
            <text className="fill-sky-400/90 font-bold text-[4.5px] uppercase tracking-wide">
              Q4 · Execution Constraint
            </text>
            <text className="fill-slate-500 text-[3px]">Sound Governance / Delivery Drag</text>
          </g>

          {/* Threshold markers */}
          <text x="50" y="103.5" textAnchor="middle" className="fill-slate-500 font-mono text-[3.2px]">
            θ=50
          </text>
          <text x="-3" y="51" textAnchor="end" className="fill-slate-500 font-mono text-[3.2px]">
            θ=50
          </text>

          {/* Pulsing Target Dot & Crosshairs */}
          {/* Outer expanding ping halo */}
          <circle
            cx={svgX}
            cy={svgY}
            r="6"
            fill={quadrant.hexColor}
            fillOpacity="0.25"
            className="animate-ping"
            style={{ transformOrigin: `${svgX}px ${svgY}px`, animationDuration: '2.5s' }}
          />

          {/* Middle glow circle */}
          <circle
            cx={svgX}
            cy={svgY}
            r="4.5"
            fill={quadrant.hexColor}
            fillOpacity="0.4"
            filter="url(#matrix-glow)"
          />

          {/* Crosshair guidelines */}
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
          <span className="text-sky-400">Del: {del.totalScore}</span>
          <span className="text-slate-600">·</span>
          <span className="text-amber-400">Gov: {gov.totalScore}</span>
        </div>
      </div>

      {/* Axis Information Footer */}
      <div className="mt-4 pt-3 border-t border-slate-800/80 grid grid-cols-2 gap-3 text-xs">
        <div className="flex items-start gap-2 text-slate-400">
          <span className="font-semibold font-mono text-slate-200 uppercase tracking-wider text-[10px] bg-slate-800 px-1.5 py-0.5 rounded">
            X-Axis
          </span>
          <div>
            <span className="text-slate-300 font-medium">Operational Delivery:</span>{' '}
            <strong className="text-sky-400 font-mono">{del.totalScore}/100</strong>
            <span className="text-slate-500 block text-[11px]">
              (O1 Schedule, O2 Budget Burn, O3 Defects, O4 Morale, O5 Truth)
            </span>
          </div>
        </div>

        <div className="flex items-start gap-2 text-slate-400">
          <span className="font-semibold font-mono text-slate-200 uppercase tracking-wider text-[10px] bg-slate-800 px-1.5 py-0.5 rounded">
            Y-Axis
          </span>
          <div>
            <span className="text-slate-300 font-medium">Structural Governance:</span>{' '}
            <strong className="text-amber-400 font-mono">{gov.totalScore}/100</strong>
            {hasGovPenalty && (
              <span className="text-rose-400 font-semibold block text-[11px]">
                (+10 Nonlinear Penalty Applied)
              </span>
            )}
            <span className="text-slate-500 block text-[11px]">
              (D1 Mandate, D2 Procurement, D3 Scope, D4 Reserve, D5 Coupling)
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
