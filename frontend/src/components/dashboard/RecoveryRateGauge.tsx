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
      title="Circular Recovery Progress"
      action={
        <button className="text-xs text-slate-400 hover:text-slate-700 font-medium flex items-center gap-0.5">
          <span>View All</span>
          <ChevronRight className="w-3.5 h-3.5" />
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
              className="text-slate-100"
              strokeWidth="9"
              stroke="currentColor"
              fill="transparent"
            />
            <circle
              cx="50"
              cy="50"
              r="40"
              className="text-[#073E2E]"
              strokeWidth="9"
              strokeDasharray="251.2"
              strokeDashoffset={strokeDashoffset}
              strokeLinecap="round"
              stroke="currentColor"
              fill="transparent"
            />
          </svg>
          <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
            <span className="text-2xl font-extrabold text-slate-900 font-sans tracking-tight">
              {rate}%
            </span>
            <span className="text-[9px] text-slate-400 font-medium uppercase tracking-wider">
              Overall Yield
            </span>
          </div>
        </div>

        {/* Multi-Category Salvage Breakdown */}
        <div className="flex-1 w-full space-y-2 text-xs">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#073E2E]" />
              <span className="text-slate-600 font-medium">Smart Devices & Mobile</span>
            </div>
            <span className="font-bold text-slate-800">74%</span>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-sky-500" />
              <span className="text-slate-600 font-medium">Computing & Consoles</span>
            </div>
            <span className="font-bold text-slate-800">71%</span>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-indigo-500" />
              <span className="text-slate-600 font-medium">Audio & Wearables</span>
            </div>
            <span className="font-bold text-slate-800">68%</span>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-amber-500" />
              <span className="text-slate-600 font-medium">Home & Smart Appliances</span>
            </div>
            <span className="font-bold text-slate-800">64%</span>
          </div>
        </div>
      </div>

      {/* Motivational Bottom Callout matching Finora's "You're on track!" */}
      <div className="mt-4 p-3 rounded-2xl bg-emerald-50/80 border border-emerald-200/50 flex items-start gap-2.5">
        <div className="p-1 rounded-lg bg-emerald-200/70 text-[#073E2E] shrink-0 mt-0.5">
          <Award className="w-3.5 h-3.5" />
        </div>
        <div>
          <h5 className="text-xs font-bold text-[#073E2E]">You&apos;re on track!</h5>
          <p className="text-[11px] text-emerald-800 font-medium leading-tight mt-0.5">
            You&apos;ve salvaged {rate}% of all returned products across categories without landfill disposal. Keep it up!
          </p>
        </div>
      </div>
    </Card>
  );
}

