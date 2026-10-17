'use client';

import React from 'react';
import { EvaluationResult } from '@/lib/engine/prj-evaluator';
import { AlertCircle, ShieldAlert, CheckCircle2, AlertTriangle } from 'lucide-react';

interface RiskMatrixProps {
  evaluation: EvaluationResult;
  onSelectQuadrant?: (quadrantId: string) => void;
}

export const RiskMatrix: React.FC<RiskMatrixProps> = ({ evaluation }) => {
  const { gov, del, quadrant, inBufferZone } = evaluation;

  // Clamp values between 0 and 100
  const x = Math.max(0, Math.min(100, del.totalScore));
  const y = Math.max(0, Math.min(100, gov.totalScore));

  // In SVG coordinates, Y=0 is at top, Y=100 is at bottom.
  // We want Gov=100 at top, Gov=0 at bottom, so SVG Y = 100 - y.
  // Delivery=0 at left, Delivery=100 at right, so SVG X = x.
  const svgX = x;
  const svgY = 100 - y;

  return (
    <div className="relative rounded-2xl bg-slate-900/90 border border-slate-800 p-5 shadow-2xl backdrop-blur-xl">
      {/* Header */}
      <div className="flex items-center justify-between pb-4 border-b border-slate-800/80 mb-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
            <h3 className="text-sm font-semibold tracking-wider uppercase text-slate-300">
              DGRF 2x2 Diagnostic Matrix
            </h3>
          </div>
          <p className="text-xs text-slate-500 mt-0.5">
            Decoupled Structural Governance vs Operational Delivery Plane
          </p>
        </div>

        <div className="flex items-center gap-2">
          {inBufferZone && (
            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium bg-indigo-500/10 text-indigo-400 border border-indigo-500/30 animate-pulse">
              <span className="w-1.5 h-1.5 rounded-full bg-indigo-400" />
              Buffer Zone [40–60]
            </span>
          )}
          <span className={`px-2.5 py-1 rounded-full text-xs font-semibold border ${quadrant.badgeClass}`}>
            {quadrant.id}: {quadrant.name}
          </span>
        </div>
      </div>

      {/* SVG Coordinate Space */}
      <div className="relative aspect-square w-full max-w-[460px] mx-auto select-none">
        <svg
          viewBox="-10 -10 120 120"
          className="w-full h-full overflow-visible"
        >
          <defs>
            {/* Grid pattern */}
            <pattern id="matrix-subgrid" width="10" height="10" patternUnits="userSpaceOnUse">
              <path d="M 10 0 L 0 0 0 10" fill="none" stroke="rgba(148, 163, 184, 0.05)" strokeWidth="0.5" />
            </pattern>

            {/* Glowing filter for active marker */}
            <filter id="glow" x="-50%" y="-50%" width="200%" height="200%">
              <feGaussianBlur stdDeviation="3" result="blur" />
              <feMerge>
                <feMergeNode in="blur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>

            {/* Buffer zone striping */}
            <pattern id="buffer-stripes" width="4" height="4" patternTransform="rotate(45 0 0)" patternUnits="userSpaceOnUse">
              <line x1="0" y1="0" x2="0" y2="4" stroke="rgba(99, 102, 241, 0.12)" strokeWidth="1" />
            </pattern>
          </defs>

          {/* Background subgrid */}
          <rect x="0" y="0" width="100" height="100" fill="url(#matrix-subgrid)" rx="4" />

          {/* Quadrant Tinting */}
          {/* Q2: Top-Left (Gov >= 50, Del < 50) */}
          <rect x="0" y="0" width="50" height="50" fill="rgba(245, 158, 11, 0.03)" />
          {/* Q1: Top-Right (Gov >= 50, Del >= 50) */}
          <rect x="50" y="0" width="50" height="50" fill="rgba(244, 63, 94, 0.04)" />
          {/* Q3: Bottom-Left (Gov < 50, Del < 50) */}
          <rect x="0" y="50" width="50" height="50" fill="rgba(16, 185, 129, 0.04)" />
          {/* Q4: Bottom-Right (Gov < 50, Del >= 50) */}
          <rect x="50" y="50" width="50" height="50" fill="rgba(56, 189, 248, 0.03)" />

          {/* 40-60 Buffer Zone Bands */}
          {/* Vertical Buffer Band: X from 40 to 60 */}
          <rect x="40" y="0" width="20" height="100" fill="url(#buffer-stripes)" />
          <line x1="40" y1="0" x2="40" y2="100" stroke="#6366f1" strokeWidth="0.5" strokeDasharray="2,2" strokeOpacity="0.35" />
          <line x1="60" y1="0" x2="60" y2="100" stroke="#6366f1" strokeWidth="0.5" strokeDasharray="2,2" strokeOpacity="0.35" />

          {/* Horizontal Buffer Band: Y from 40 to 60 (SVG Y: 40 to 60) */}
          <rect x="0" y="40" width="100" height="20" fill="url(#buffer-stripes)" />
          <line x1="0" y1="40" x2="100" y2="40" stroke="#6366f1" strokeWidth="0.5" strokeDasharray="2,2" strokeOpacity="0.35" />
          <line x1="0" y1="60" x2="100" y2="60" stroke="#6366f1" strokeWidth="0.5" strokeDasharray="2,2" strokeOpacity="0.35" />

          {/* Central Threshold Axes (Theta = 50) */}
          <line x1="50" y1="0" x2="50" y2="100" stroke="#475569" strokeWidth="1" strokeDasharray="3,3" />
          <line x1="0" y1="50" x2="100" y2="50" stroke="#475569" strokeWidth="1" strokeDasharray="3,3" />

          {/* Outer Border */}
          <rect x="0" y="0" width="100" height="100" fill="none" stroke="#334155" strokeWidth="1.2" rx="2" />

          {/* Quadrant Labels */}
          {/* Q2 */}
          <g transform="translate(4, 8)">
            <text className="fill-amber-400/80 font-bold text-[4.5px] uppercase tracking-wide">Q2 · Fragile Governance</text>
            <text className="fill-slate-500 text-[3px]">High Gov Risk / Low Del Risk</text>
          </g>

          {/* Q1 */}
          <g transform="translate(54, 8)">
            <text className="fill-rose-400/90 font-bold text-[4.5px] uppercase tracking-wide">Q1 · Systemic Fragility</text>
            <text className="fill-slate-500 text-[3px]">Critical Multi-Vector Failure</text>
          </g>

          {/* Q3 */}
          <g transform="translate(4, 92)">
            <text className="fill-emerald-400/80 font-bold text-[4.5px] uppercase tracking-wide">Q3 · Resilient Conditions</text>
            <text className="fill-slate-500 text-[3px]">Target Enterprise Benchmark</text>
          </g>

          {/* Q4 */}
          <g transform="translate(54, 92)">
            <text className="fill-sky-400/80 font-bold text-[4.5px] uppercase tracking-wide">Q4 · Execution Constraint</text>
            <text className="fill-slate-500 text-[3px]">Sound Governance / Delivery Drag</text>
          </g>

          {/* Threshold marker label at 50 */}
          <text x="50" y="103.5" textAnchor="middle" className="fill-slate-500 text-[3.2px]">θ=50</text>
          <text x="-3" y="51" textAnchor="end" className="fill-slate-500 text-[3.2px]">θ=50</text>

          {/* Pulsing Target Marker */}
          {/* Outer expanding halo */}
          <circle
            cx={svgX}
            cy={svgY}
            r="6"
            fill={quadrant.themeColor}
            fillOpacity="0.2"
            className="animate-ping"
            style={{ transformOrigin: `${svgX}px ${svgY}px`, animationDuration: '2.5s' }}
          />

          {/* Middle glow circle */}
          <circle
            cx={svgX}
            cy={svgY}
            r="4.5"
            fill={quadrant.themeColor}
            fillOpacity="0.35"
            filter="url(#glow)"
          />

          {/* Crosshair target lines pointing to marker */}
          <line
            x1={svgX}
            y1={svgY - 3}
            x2={svgX}
            y2="0"
            stroke={quadrant.themeColor}
            strokeWidth="0.4"
            strokeDasharray="1,2"
            strokeOpacity="0.6"
          />
          <line
            x1={svgX}
            y1={svgY + 3}
            x2={svgX}
            y2="100"
            stroke={quadrant.themeColor}
            strokeWidth="0.4"
            strokeDasharray="1,2"
            strokeOpacity="0.6"
          />
          <line
            x1="0"
            y1={svgY}
            x2={svgX - 3}
            y2={svgY}
            stroke={quadrant.themeColor}
            strokeWidth="0.4"
            strokeDasharray="1,2"
            strokeOpacity="0.6"
          />
          <line
            x1={svgX + 3}
            y1={svgY}
            x2="100"
            y2={svgY}
            stroke={quadrant.themeColor}
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
            stroke={quadrant.themeColor}
            strokeWidth="0.8"
          />
        </svg>

        {/* Floating Coordinates Tag */}
        <div
          className="absolute pointer-events-none transform -translate-x-1/2 -translate-y-8 px-2 py-0.5 rounded bg-slate-950/95 border border-slate-700 text-[11px] font-mono font-semibold text-slate-200 shadow-lg whitespace-nowrap"
          style={{
            left: `${x}%`,
            top: `${100 - y}%`,
          }}
        >
          Del: {del.totalScore} | Gov: {gov.totalScore}
        </div>
      </div>

      {/* Axis Explanations */}
      <div className="mt-4 pt-3 border-t border-slate-800/80 grid grid-cols-2 gap-3 text-xs">
        <div className="flex items-start gap-2 text-slate-400">
          <span className="font-semibold text-slate-200 uppercase tracking-wider text-[11px] bg-slate-800 px-1.5 py-0.5 rounded">
            X-Axis
          </span>
          <div>
            <span className="text-slate-300 font-medium">Operational Delivery Risk:</span> {del.totalScore}/100
            <span className="text-slate-500 block text-[11px]">
              (O1 Schedule, O2 Defect Inflow, O3 CPI, O4 Morale, O5 Truth)
            </span>
          </div>
        </div>

        <div className="flex items-start gap-2 text-slate-400">
          <span className="font-semibold text-slate-200 uppercase tracking-wider text-[11px] bg-slate-800 px-1.5 py-0.5 rounded">
            Y-Axis
          </span>
          <div>
            <span className="text-slate-300 font-medium">Structural Governance Risk:</span> {gov.totalScore}/100
            <span className="text-slate-500 block text-[11px]">
              (D1 Authority, D2 Contracts, D3 CCB, D4 Contingency, D5 Coupling)
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
