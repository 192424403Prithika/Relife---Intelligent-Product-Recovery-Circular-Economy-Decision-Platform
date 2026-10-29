'use client';

import React from 'react';
import { Card } from '../ui/Card';
import { Award, ChevronRight } from 'lucide-react';

interface RecoveryRateGaugeProps {
  rate?: number;
}

export function RecoveryRateGauge({ rate = 71.2 }: RecoveryRateGaugeProps) {
  const strokeDashoffset = 251.2 - (251.2 * rate) / 100;

  return (
    <Card
      title="Circular Recovery Rate"
      action={
        <button className="text-xs text-slate-400 hover:text-white font-medium flex items-center gap-0.5">
          <span>Target: 75%</span>
        </button>
      }
    >
      <div className="flex flex-col sm:flex-row items-center justify-between gap-5 py-1">
        {/* Circular Progress Gauge */}
        <div className="relative w-32 h-32 flex items-center justify-center shrink-0">
          <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
            <circle
              cx="50"
              cy="50"
              r="40"
              className="text-[#1E202E]"
              strokeWidth="9"
              stroke="currentColor"
              fill="transparent"
            />
            <circle
              cx="50"
              cy="50"
              r="40"
              className="text-[#FFC21A]"
              strokeWidth="9"
              strokeDasharray="251.2"
              strokeDashoffset={strokeDashoffset}
              strokeLinecap="round"
              stroke="currentColor"
              fill="transparent"
            />
          </svg>
          <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
            <span className="text-2xl font-extrabold text-white font-mono tracking-tight">
              {rate}%
            </span>
            <span className="text-[9px] text-slate-400 font-mono uppercase tracking-wider">
              Yield Rate
            </span>
          </div>
        </div>

        {/* Multi-Category Salvage Breakdown */}
        <div className="flex-1 w-full space-y-2 text-xs">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#FFC21A]" />
              <span className="text-slate-300 font-medium">Laptops & Ultrabooks</span>
            </div>
            <span className="font-bold text-white font-mono">74%</span>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#22D3EE]" />
              <span className="text-slate-300 font-medium">Smartphones & Tablets</span>
            </div>
            <span className="font-bold text-white font-mono">71%</span>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#F57C00]" />
              <span className="text-slate-300 font-medium">Components & Parts</span>
            </div>
            <span className="font-bold text-white font-mono">68%</span>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-400" />
              <span className="text-slate-300 font-medium">Certified Smelted</span>
            </div>
            <span className="font-bold text-white font-mono">64%</span>
          </div>
        </div>
      </div>

      {/* Bottom Callout */}
      <div className="mt-4 p-3 rounded-2xl bg-[#08080D] border border-emerald-500/30 flex items-start gap-2.5">
        <div className="p-1 rounded-lg bg-emerald-950/80 text-emerald-400 shrink-0 mt-0.5">
          <Award className="w-3.5 h-3.5" />
        </div>
        <div>
          <h5 className="text-xs font-bold text-emerald-300">Circular Milestone Achieved</h5>
          <p className="text-[11px] text-slate-300 font-medium leading-tight mt-0.5">
            You&apos;ve diverted {rate}% of all returned products across categories without landfill disposal.
          </p>
        </div>
      </div>
    </Card>
  );
}
