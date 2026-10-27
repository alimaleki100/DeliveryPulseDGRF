'use client';

import React, { useState } from 'react';
import { DualModeEvaluation } from '@/lib/engine/dual-mode-engine';

interface RiskRadarProps {
  evaluation: DualModeEvaluation;
}

export const RiskRadar: React.FC<RiskRadarProps> = ({ evaluation }) => {
  const [viewMode, setViewMode] = useState<'split' | 'unified'>('split');

  const { mode, totalGov, totalDel, dimensionBreakdown } = evaluation;

  const govDimensions = dimensionBreakdown.filter((d) => d.category === 'gov');
  const delDimensions = dimensionBreakdown.filter((d) => d.category === 'del');

  const centerX = 100;
  const centerY = 100;
  const radius = 72;

  const getPoint = (index: number, total: number, percentage: number) => {
    const angle = (Math.PI * 2 / total) * index - Math.PI / 2;
    const r = (radius * percentage) / 100;
    const x = centerX + r * Math.cos(angle);
    const y = centerY + r * Math.sin(angle);
    return { x, y };
  };

  const getPolygonPath = (items: { normPercent: number }[]) => {
    return (
      items
        .map((item, idx) => {
          const pt = getPoint(idx, items.length, Math.max(4, item.normPercent));
          return `${idx === 0 ? 'M' : 'L'} ${pt.x.toFixed(2)} ${pt.y.toFixed(2)}`;
        })
        .join(' ') + ' Z'
    );
  };

  const unifiedPath =
    dimensionBreakdown
      .map((item, idx) => {
        const pt = getPoint(idx, 10, Math.max(4, item.normPercent));
        return `${idx === 0 ? 'M' : 'L'} ${pt.x.toFixed(2)} ${pt.y.toFixed(2)}`;
      })
      .join(' ') + ' Z';

  return (
    <div className="relative rounded-2xl bg-slate-900/90 border border-slate-800 p-5 shadow-2xl backdrop-blur-xl flex flex-col justify-between">
      {/* Radar Header with Mode Toggle */}
      <div className="flex items-center justify-between pb-4 border-b border-slate-800/80 mb-3">
        <div>
          <div className="flex items-center gap-2">
            <span className="h-2 w-2 rounded-full bg-cyan-400 animate-pulse" />
            <h3 className="text-sm font-semibold tracking-wider uppercase text-slate-300">
              10-Axis Live Normalized Radar
            </h3>
          </div>
          <p className="text-xs text-slate-500 mt-0.5 font-mono">
            Amber: {evaluation.govAxisName} · Blue: {evaluation.delAxisName}
          </p>
        </div>

        <div className="inline-flex rounded-lg bg-slate-950 p-0.5 border border-slate-800 text-xs">
          <button
            onClick={() => setViewMode('split')}
            className={`px-2.5 py-1 rounded-md font-medium transition-all ${
              viewMode === 'split'
                ? 'bg-slate-800 text-slate-200 shadow-sm'
                : 'text-slate-500 hover:text-slate-300'
            }`}
          >
            Dual Layer
          </button>
          <button
            onClick={() => setViewMode('unified')}
            className={`px-2.5 py-1 rounded-md font-medium transition-all ${
              viewMode === 'unified'
                ? 'bg-slate-800 text-slate-200 shadow-sm'
                : 'text-slate-500 hover:text-slate-300'
            }`}
          >
            Unified 10D
          </button>
        </div>
      </div>

      {/* SVG Radar Canvas */}
      <div className="relative aspect-square w-full max-w-[440px] mx-auto select-none my-auto">
        <svg viewBox="0 0 200 200" className="w-full h-full overflow-visible">
          <defs>
            <radialGradient id="dual-radar-glow-grad" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#6366f1" stopOpacity="0.1" />
              <stop offset="100%" stopColor="#080c14" stopOpacity="0" />
            </radialGradient>
          </defs>

          {/* Background circle glow */}
          <circle cx={centerX} cy={centerY} r={radius} fill="url(#dual-radar-glow-grad)" />

          {/* Concentric Web Rings at 25%, 50%, 75%, 100% */}
          {[25, 50, 75, 100].map((level) => (
            <g key={level}>
              <circle
                cx={centerX}
                cy={centerY}
                r={(radius * level) / 100}
                fill="none"
                stroke={level === 50 ? '#6366f1' : '#334155'}
                strokeWidth={level === 50 ? '0.9' : '0.5'}
                strokeDasharray={level === 50 ? '2,2' : undefined}
                strokeOpacity={level === 50 ? '0.75' : '0.4'}
              />
              <text
                x={centerX + 2}
                y={centerY - (radius * level) / 100 + 4}
                className="fill-slate-600 font-mono text-[3px] select-none"
              >
                {level}%
              </text>
            </g>
          ))}

          {viewMode === 'split' ? (
            /* Dual 5-spoke layers */
            <>
              {/* 5 Axis spokes */}
              {govDimensions.map((_, idx) => {
                const pt = getPoint(idx, 5, 100);
                return (
                  <line
                    key={idx}
                    x1={centerX}
                    y1={centerY}
                    x2={pt.x}
                    y2={pt.y}
                    stroke="#334155"
                    strokeWidth="0.6"
                    strokeDasharray="2,2"
                  />
                );
              })}

              {/* Governance Polygon (Amber) */}
              <path
                d={getPolygonPath(govDimensions)}
                fill="rgba(245, 158, 11, 0.22)"
                stroke="#F59E0B"
                strokeWidth="1.6"
                strokeLinejoin="round"
                className="transition-all duration-300"
              />

              {/* Delivery / Traction Polygon (Blue/Cyan) */}
              <path
                d={getPolygonPath(delDimensions)}
                fill="rgba(14, 165, 233, 0.22)"
                stroke="#0EA5E9"
                strokeWidth="1.6"
                strokeLinejoin="round"
                className="transition-all duration-300"
              />

              {/* Gov Data points */}
              {govDimensions.map((d, idx) => {
                const pt = getPoint(idx, 5, Math.max(4, d.normPercent));
                return (
                  <circle
                    key={`gov-${idx}`}
                    cx={pt.x}
                    cy={pt.y}
                    r="2.4"
                    fill="#F59E0B"
                    stroke="#080C14"
                    strokeWidth="0.9"
                    className="transition-all duration-300"
                  />
                );
              })}

              {/* Del Data points */}
              {delDimensions.map((d, idx) => {
                const pt = getPoint(idx, 5, Math.max(4, d.normPercent));
                return (
                  <circle
                    key={`del-${idx}`}
                    cx={pt.x}
                    cy={pt.y}
                    r="2.4"
                    fill="#0EA5E9"
                    stroke="#080C14"
                    strokeWidth="0.9"
                    className="transition-all duration-300"
                  />
                );
              })}

              {/* Axis Labels */}
              {govDimensions.map((d, idx) => {
                const pt = getPoint(idx, 5, 117);
                return (
                  <text
                    key={`lbl-${idx}`}
                    x={pt.x}
                    y={pt.y}
                    textAnchor="middle"
                    dominantBaseline="middle"
                    className="fill-slate-300 font-mono text-[3.8px] font-semibold"
                  >
                    {d.code} / {delDimensions[idx].code}
                  </text>
                );
              })}
            </>
          ) : (
            /* Unified 10-spoke polygon */
            <>
              {dimensionBreakdown.map((_, idx) => {
                const pt = getPoint(idx, 10, 100);
                return (
                  <line
                    key={idx}
                    x1={centerX}
                    y1={centerY}
                    x2={pt.x}
                    y2={pt.y}
                    stroke="#334155"
                    strokeWidth="0.6"
                    strokeDasharray="2,2"
                  />
                );
              })}

              <path
                d={unifiedPath}
                fill="rgba(99, 102, 241, 0.2)"
                stroke="#6366F1"
                strokeWidth="1.6"
                strokeLinejoin="round"
                className="transition-all duration-300"
              />

              {dimensionBreakdown.map((d, idx) => {
                const pt = getPoint(idx, 10, Math.max(4, d.normPercent));
                const color = d.category === 'gov' ? '#F59E0B' : '#0EA5E9';
                return (
                  <circle
                    key={idx}
                    cx={pt.x}
                    cy={pt.y}
                    r="2.2"
                    fill={color}
                    stroke="#080C14"
                    strokeWidth="0.8"
                    className="transition-all duration-300"
                  />
                );
              })}

              {dimensionBreakdown.map((d, idx) => {
                const pt = getPoint(idx, 10, 117);
                return (
                  <text
                    key={idx}
                    x={pt.x}
                    y={pt.y}
                    textAnchor="middle"
                    dominantBaseline="middle"
                    className="fill-slate-400 font-mono text-[3.4px] font-medium"
                  >
                    {d.code}
                  </text>
                );
              })}
            </>
          )}
        </svg>
      </div>

      {/* Legend */}
      <div className="mt-3 pt-3 border-t border-slate-800/80 flex items-center justify-around text-xs">
        <div className="flex items-center gap-2">
          <span className="w-3 h-3 rounded-full bg-amber-500/80 border border-amber-400" />
          <span className="text-slate-300 font-medium font-mono">
            {mode === 'project' ? 'PrjGov (D1–D5)' : 'PrdGov (G1–G5)'}: {totalGov}/100
          </span>
        </div>
        <div className="flex items-center gap-2">
          <span className="w-3 h-3 rounded-full bg-sky-400/80 border border-sky-300" />
          <span className="text-slate-300 font-medium font-mono">
            {mode === 'project' ? 'PrjDel (O1–O5)' : 'PrdDel (P1–P5)'}: {totalDel}/100
          </span>
        </div>
      </div>
    </div>
  );
};
