'use client';

import React, { useState } from 'react';
import { EvaluationResult } from '@/lib/engine/prj-evaluator';

interface RiskRadarProps {
  evaluation: EvaluationResult;
}

export const RiskRadar: React.FC<RiskRadarProps> = ({ evaluation }) => {
  const [viewMode, setViewMode] = useState<'split' | 'unified'>('split');

  const { gov, del } = evaluation;

  // Normalized scores (0 to 100%)
  const govDimensions = [
    { code: 'D1', name: 'Authority', val: gov.breakdown.d1, max: 25, norm: (gov.breakdown.d1 / 25) * 100 },
    { code: 'D2', name: 'Procurement', val: gov.breakdown.d2, max: 20, norm: (gov.breakdown.d2 / 20) * 100 },
    { code: 'D3', name: 'Scope CCB', val: gov.breakdown.d3, max: 20, norm: (gov.breakdown.d3 / 20) * 100 },
    { code: 'D4', name: 'Contingency', val: gov.breakdown.d4, max: 20, norm: (gov.breakdown.d4 / 20) * 100 },
    { code: 'D5', name: 'Architecture', val: gov.breakdown.d5, max: 15, norm: (gov.breakdown.d5 / 15) * 100 },
  ];

  const delDimensions = [
    { code: 'O1', name: 'Schedule', val: del.breakdown.o1, max: 25, norm: (del.breakdown.o1 / 25) * 100 },
    { code: 'O2', name: 'Acceptance', val: del.breakdown.o2, max: 20, norm: (del.breakdown.o2 / 20) * 100 },
    { code: 'O3', name: 'Capital (CPI)', val: del.breakdown.o3, max: 20, norm: (del.breakdown.o3 / 20) * 100 },
    { code: 'O4', name: 'Morale', val: del.breakdown.o4, max: 15, norm: (del.breakdown.o4 / 15) * 100 },
    { code: 'O5', name: 'Reporting Truth', val: del.breakdown.o5, max: 20, norm: (del.breakdown.o5 / 20) * 100 },
  ];

  const unifiedDimensions = [
    ...govDimensions.map((d) => ({ ...d, type: 'gov' as const })),
    ...delDimensions.map((d) => ({ ...d, type: 'del' as const })),
  ];

  const centerX = 100;
  const centerY = 100;
  const radius = 72;

  // Helper to compute (x, y) for an index out of total items at percentage
  const getPoint = (index: number, total: number, percentage: number) => {
    // Start from top (-90 degrees)
    const angle = (Math.PI * 2 / total) * index - Math.PI / 2;
    const r = (radius * percentage) / 100;
    const x = centerX + r * Math.cos(angle);
    const y = centerY + r * Math.sin(angle);
    return { x, y };
  };

  // Build polygon path for 5-spoke
  const getPolygonPath = (items: { norm: number }[]) => {
    return items
      .map((item, idx) => {
        const pt = getPoint(idx, items.length, item.norm);
        return `${idx === 0 ? 'M' : 'L'} ${pt.x.toFixed(2)} ${pt.y.toFixed(2)}`;
      })
      .join(' ') + ' Z';
  };

  // Build unified 10-spoke path
  const unifiedPath = unifiedDimensions
    .map((item, idx) => {
      const pt = getPoint(idx, 10, item.norm);
      return `${idx === 0 ? 'M' : 'L'} ${pt.x.toFixed(2)} ${pt.y.toFixed(2)}`;
    })
    .join(' ') + ' Z';

  return (
    <div className="relative rounded-2xl bg-slate-900/90 border border-slate-800 p-5 shadow-2xl backdrop-blur-xl">
      {/* Header with toggle */}
      <div className="flex items-center justify-between pb-4 border-b border-slate-800/80 mb-3">
        <div>
          <div className="flex items-center gap-2">
            <span className="h-2 w-2 rounded-full bg-cyan-400 animate-pulse" />
            <h3 className="text-sm font-semibold tracking-wider uppercase text-slate-300">
              Live SVG Risk Radar
            </h3>
          </div>
          <p className="text-xs text-slate-500 mt-0.5">
            Normalized 10-Dimensional Vector Calibration
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

      {/* SVG Canvas */}
      <div className="relative aspect-square w-full max-w-[440px] mx-auto select-none">
        <svg viewBox="0 0 200 200" className="w-full h-full overflow-visible">
          <defs>
            <radialGradient id="radar-glow" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#0ea5e9" stopOpacity="0.08" />
              <stop offset="100%" stopColor="#0ea5e9" stopOpacity="0" />
            </radialGradient>
          </defs>

          {/* Background circle */}
          <circle cx={centerX} cy={centerY} r={radius} fill="url(#radar-glow)" />

          {/* Web Rings at 25%, 50%, 75%, 100% */}
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
                strokeOpacity={level === 50 ? '0.7' : '0.4'}
              />
              <text
                x={centerX + 2}
                y={centerY - (radius * level) / 100 + 4}
                className="fill-slate-600 text-[3px] select-none"
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

              {/* Structural Gov Polygon (Amber/Rose) */}
              <path
                d={getPolygonPath(govDimensions)}
                fill="rgba(245, 158, 11, 0.22)"
                stroke="#f59e0b"
                strokeWidth="1.5"
                strokeLinejoin="round"
                className="transition-all duration-300"
              />

              {/* Operational Del Polygon (Cyan/Sky) */}
              <path
                d={getPolygonPath(delDimensions)}
                fill="rgba(56, 189, 248, 0.22)"
                stroke="#38bdf8"
                strokeWidth="1.5"
                strokeLinejoin="round"
                className="transition-all duration-300"
              />

              {/* Data points for Gov */}
              {govDimensions.map((d, idx) => {
                const pt = getPoint(idx, 5, d.norm);
                return (
                  <circle
                    key={`gov-${idx}`}
                    cx={pt.x}
                    cy={pt.y}
                    r="2.2"
                    fill="#f59e0b"
                    stroke="#020617"
                    strokeWidth="0.8"
                    className="transition-all duration-300"
                  />
                );
              })}

              {/* Data points for Del */}
              {delDimensions.map((d, idx) => {
                const pt = getPoint(idx, 5, d.norm);
                return (
                  <circle
                    key={`del-${idx}`}
                    cx={pt.x}
                    cy={pt.y}
                    r="2.2"
                    fill="#38bdf8"
                    stroke="#020617"
                    strokeWidth="0.8"
                    className="transition-all duration-300"
                  />
                );
              })}

              {/* Axis Labels */}
              {govDimensions.map((d, idx) => {
                const pt = getPoint(idx, 5, 116);
                return (
                  <text
                    key={`lbl-${idx}`}
                    x={pt.x}
                    y={pt.y}
                    textAnchor="middle"
                    dominantBaseline="middle"
                    className="fill-slate-300 text-[3.8px] font-medium"
                  >
                    {d.code} / {delDimensions[idx].code}
                  </text>
                );
              })}
            </>
          ) : (
            /* Unified 10-spoke polygon */
            <>
              {unifiedDimensions.map((d, idx) => {
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
                fill="rgba(16, 185, 129, 0.2)"
                stroke="#10b981"
                strokeWidth="1.5"
                strokeLinejoin="round"
                className="transition-all duration-300"
              />

              {unifiedDimensions.map((d, idx) => {
                const pt = getPoint(idx, 10, d.norm);
                const color = d.type === 'gov' ? '#f59e0b' : '#38bdf8';
                return (
                  <circle
                    key={idx}
                    cx={pt.x}
                    cy={pt.y}
                    r="2"
                    fill={color}
                    stroke="#020617"
                    strokeWidth="0.8"
                    className="transition-all duration-300"
                  />
                );
              })}

              {unifiedDimensions.map((d, idx) => {
                const pt = getPoint(idx, 10, 116);
                return (
                  <text
                    key={idx}
                    x={pt.x}
                    y={pt.y}
                    textAnchor="middle"
                    dominantBaseline="middle"
                    className="fill-slate-400 text-[3.4px] font-medium"
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
          <span className="text-slate-300 font-medium">Gov (D1–D5): {gov.totalScore}/100</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="w-3 h-3 rounded-full bg-sky-400/80 border border-sky-300" />
          <span className="text-slate-300 font-medium">Del (O1–O5): {del.totalScore}/100</span>
        </div>
      </div>
    </div>
  );
};
