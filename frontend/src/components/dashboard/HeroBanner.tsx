'use client';

import React from 'react';
import { KPIs } from '../../lib/types';
import { formatINR } from '../../lib/formatters';
import {
  Sparkles,
  ArrowUpRight,
  ScanLine,
  PlusCircle,
  Cpu,
  ArrowRightLeft,
  CheckCircle,
  Eye,
  Layers,
  Coins,
} from 'lucide-react';

interface HeroBannerProps {
  kpis: KPIs | null;
  isLoading: boolean;
}

export function HeroBanner({ kpis, isLoading }: HeroBannerProps) {
  const valueRecovered = kpis?.value_recovered_inr || 1809550;
  const growthPct = kpis?.value_recovered_change_pct || 18.2;

  const quickActions = [
    { label: 'Scan Product', icon: ScanLine, bg: 'bg-emerald-100', text: 'text-emerald-800' },
    { label: 'Add Return', icon: PlusCircle, bg: 'bg-amber-100', text: 'text-amber-800' },
    { label: 'Run Triage', icon: Cpu, bg: 'bg-purple-100', text: 'text-purple-800' },
    { label: 'Transfer', icon: ArrowRightLeft, bg: 'bg-sky-100', text: 'text-sky-800' },
    { label: 'Review Queue', icon: Layers, bg: 'bg-rose-100', text: 'text-rose-800' },
  ];

  return (
    <div className="space-y-4">
      {/* Dark Forest Green Signature Hero Card */}
      <div className="relative bg-gradient-to-br from-[#063828] via-[#084835] to-[#0A5740] rounded-3xl p-6 sm:p-7 text-white shadow-xl shadow-emerald-950/20 overflow-hidden">
        {/* Ambient background circles & decorations */}
        <div className="absolute -top-12 -right-12 w-48 h-48 rounded-full bg-emerald-400/10 blur-2xl pointer-events-none" />
        <div className="absolute -bottom-10 -left-10 w-40 h-40 rounded-full bg-[#10B981]/15 blur-2xl pointer-events-none" />

        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          {/* Left Text & Metrics */}
          <div className="space-y-4 max-w-lg">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-xl sm:text-2xl font-bold font-sans tracking-tight text-white flex items-center gap-2">
                  Good Afternoon, Ayesha
                  <span className="text-amber-300">☀️</span>
                </h2>
                <p className="text-xs sm:text-sm text-emerald-100/80 font-medium mt-1">
                  Circular recovery pipeline is performing at peak efficiency! Here&apos;s today&apos;s inventory overview.
                </p>
              </div>
            </div>

            {/* Value Recovered Display */}
            <div className="pt-2">
              <div className="flex items-center gap-2 text-xs text-emerald-200/90 font-medium">
                <span>Total Value Recovered</span>
                <Eye className="w-3.5 h-3.5 opacity-70 cursor-pointer hover:opacity-100" />
              </div>

              <div className="flex items-baseline gap-3 mt-1">
                <span className="text-3xl sm:text-4xl font-extrabold tracking-tight font-sans text-white">
                  {isLoading ? '...' : formatINR(valueRecovered, false)}
                </span>
              </div>

              <div className="flex items-center gap-2 mt-2">
                <span className="inline-flex items-center gap-1 text-xs font-semibold text-emerald-300 bg-emerald-900/60 border border-emerald-500/30 px-2.5 py-0.5 rounded-full">
                  <ArrowUpRight className="w-3.5 h-3.5" />
                  <span>{growthPct}% vs. last month</span>
                </span>
                <span className="text-[11px] text-emerald-200/70 font-mono">
                  ({kpis?.total_returns || 52} products processed)
                </span>
              </div>
            </div>
          </div>

          {/* Right: Status Pill & Graphical Visual */}
          <div className="flex flex-col items-end justify-between self-stretch">
            {/* Top Healthy Badge */}
            <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-900/60 border border-emerald-400/40 text-emerald-300 text-xs font-semibold shadow-sm">
              <CheckCircle className="w-3.5 h-3.5 text-emerald-400" />
              <span>Healthy</span>
            </div>

            {/* Decorative Wallet / Device Graphic with Coins */}
            <div className="relative mt-4 md:mt-0 flex items-center justify-center">
              <div className="w-28 h-20 sm:w-32 sm:h-24 rounded-2xl bg-gradient-to-tr from-emerald-900/80 to-emerald-700/60 border border-emerald-400/30 shadow-2xl flex items-center justify-center relative p-3">
                <div className="w-full h-full rounded-xl bg-emerald-800/80 border border-emerald-300/30 flex flex-col justify-between p-2">
                  <div className="flex justify-between items-center">
                    <div className="w-4 h-2.5 rounded bg-amber-400/80" />
                    <span className="text-[9px] font-mono font-bold text-emerald-200">ReLife</span>
                  </div>
                  <div className="text-[10px] font-mono text-emerald-100 font-bold">
                    **** 2026
                  </div>
                </div>

                {/* Floating Coins / Chips */}
                <div className="absolute -top-3 -right-2 w-7 h-7 rounded-full bg-amber-400 border-2 border-white flex items-center justify-center shadow-lg shadow-amber-900/40 text-[#073E2E] font-bold text-xs">
                  ₹
                </div>
                <div className="absolute -bottom-2 -left-2 w-6 h-6 rounded-full bg-emerald-300 border-2 border-white flex items-center justify-center shadow-md text-emerald-950 font-bold text-[10px]">
                  ♻
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Quick Action Buttons Row (Exact match to Finora) */}
      <div className="grid grid-cols-5 gap-2 sm:gap-4 bg-white rounded-2xl p-3 sm:p-4 border border-slate-100 shadow-[0_2px_10px_rgba(0,0,0,0.03)]">
        {quickActions.map((action, i) => {
          const Icon = action.icon;
          return (
            <button
              key={i}
              type="button"
              className="flex flex-col items-center justify-center gap-1.5 p-2 rounded-xl hover:bg-slate-50 transition-all group"
            >
              <div
                className={`w-10 h-10 sm:w-11 sm:h-11 rounded-2xl ${action.bg} ${action.text} flex items-center justify-center shadow-sm group-hover:scale-105 transition-transform`}
              >
                <Icon className="w-5 h-5" />
              </div>
              <span className="text-[11px] font-semibold text-slate-700 tracking-tight text-center">
                {action.label}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}

