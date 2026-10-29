'use client';

import React, { useState } from 'react';
import { KPIs } from '../../lib/types';
import { formatINR } from '../../lib/formatters';
import {
  ArrowUpRight,
  ScanLine,
  PlusCircle,
  Cpu,
  ArrowRightLeft,
  CheckCircle,
  Eye,
  EyeOff,
  Layers,
  Sparkles,
  Award,
} from 'lucide-react';

interface HeroBannerProps {
  kpis: KPIs | null;
  isLoading: boolean;
  onOpenIntake: () => void;
  onRunTriage: () => void;
  onOpenReviewQueue: () => void;
  onOpenTransfer: () => void;
}

export function HeroBanner({
  kpis,
  isLoading,
  onOpenIntake,
  onRunTriage,
  onOpenReviewQueue,
  onOpenTransfer,
}: HeroBannerProps) {
  const [showBalance, setShowBalance] = useState<boolean>(true);
  const valueRecovered = kpis?.value_recovered_inr || 1809550;
  const growthPct = kpis?.value_recovered_change_pct || 18.2;

  const quickActions = [
    {
      label: 'Recovery Wizard',
      icon: PlusCircle,
      bg: 'bg-[#FFC21A]/20 border border-[#FFC21A]/40 text-[#FFC21A]',
      action: onOpenIntake,
    },
    {
      label: 'Scan QR Passport',
      icon: ScanLine,
      bg: 'bg-[#22D3EE]/20 border border-[#22D3EE]/40 text-[#22D3EE]',
      action: onOpenIntake,
    },
    {
      label: 'Run AI Triage',
      icon: Cpu,
      bg: 'bg-[#F57C00]/20 border border-[#F57C00]/40 text-[#F57C00]',
      action: onRunTriage,
    },
    {
      label: 'Decision Matrix',
      icon: ArrowRightLeft,
      bg: 'bg-[#A855F7]/20 border border-[#A855F7]/40 text-[#A855F7]',
      action: onOpenTransfer,
    },
    {
      label: 'Review Queue',
      icon: Layers,
      bg: 'bg-red-500/20 border border-red-500/40 text-red-300',
      action: onOpenReviewQueue,
    },
  ];

  return (
    <div className="space-y-4">
      {/* Dark Theme Hero Card */}
      <div className="relative bg-gradient-to-br from-[#12131A] via-[#181926] to-[#12131A] rounded-3xl p-6 sm:p-7 text-white shadow-2xl border border-[#252836] overflow-hidden">
        {/* Ambient Gold/Orange background glows */}
        <div className="absolute -top-12 -right-12 w-48 h-48 rounded-full bg-[#FFC21A]/10 blur-3xl pointer-events-none" />
        <div className="absolute -bottom-10 -left-10 w-40 h-40 rounded-full bg-[#F57C00]/10 blur-3xl pointer-events-none" />

        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          {/* Left Text & Metrics */}
          <div className="space-y-4 max-w-lg">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-xl sm:text-2xl font-extrabold font-sans tracking-tight text-white flex items-center gap-2">
                  <span>ReLife Circular Operations</span>
                  <Sparkles className="w-5 h-5 text-[#FFC21A]" />
                </h2>
                <p className="text-xs sm:text-sm text-slate-300 font-medium mt-1">
                  AI-powered product recovery and multi-criteria circular disposition platform.
                </p>
              </div>
            </div>

            {/* Value Recovered Display */}
            <div className="pt-2">
              <div className="flex items-center gap-2 text-xs text-slate-400 font-medium">
                <span>Total Value Recovered</span>
                <button
                  type="button"
                  onClick={() => setShowBalance(!showBalance)}
                  className="opacity-70 hover:opacity-100 transition-opacity"
                  title={showBalance ? 'Hide Value' : 'Show Value'}
                >
                  {showBalance ? (
                    <Eye className="w-3.5 h-3.5 text-slate-400" />
                  ) : (
                    <EyeOff className="w-3.5 h-3.5 text-slate-400" />
                  )}
                </button>
              </div>

              <div className="flex items-baseline gap-3 mt-1">
                <span className="text-3xl sm:text-4xl font-extrabold tracking-tight font-mono text-[#FFC21A]">
                  {isLoading
                    ? '...'
                    : showBalance
                    ? formatINR(valueRecovered, false)
                    : '₹ ••••••••'}
                </span>
              </div>

              <div className="flex items-center gap-2 mt-2">
                <span className="inline-flex items-center gap-1 text-xs font-semibold text-emerald-400 bg-emerald-950/80 border border-emerald-500/40 px-2.5 py-0.5 rounded-full">
                  <ArrowUpRight className="w-3.5 h-3.5" />
                  <span>+{growthPct}% vs. last month</span>
                </span>
                <span className="text-[11px] text-slate-400 font-mono">
                  ({kpis?.total_returns || 52} returns cataloged)
                </span>
              </div>
            </div>
          </div>

          {/* Right: Status Pill & Passport Badge */}
          <div className="flex flex-col items-end justify-between self-stretch">
            {/* Top Operational Status Badge */}
            <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-950/80 border border-emerald-400/40 text-emerald-300 text-xs font-semibold shadow-sm">
              <CheckCircle className="w-3.5 h-3.5 text-emerald-400" />
              <span>Pipeline Active</span>
            </div>

            {/* Circular Recovery Card Graphic */}
            <div className="relative mt-4 md:mt-0 flex items-center justify-center">
              <div className="w-32 h-20 sm:w-36 sm:h-24 rounded-2xl bg-gradient-to-tr from-[#1E202E] to-[#252836] border border-[#FFC21A]/30 shadow-2xl flex items-center justify-center p-3">
                <div className="w-full h-full rounded-xl bg-[#08080D] border border-[#252836] flex flex-col justify-between p-2">
                  <div className="flex justify-between items-center">
                    <div className="w-4 h-2.5 rounded bg-[#FFC21A]" />
                    <span className="text-[9px] font-mono font-bold text-[#FFC21A]">ReLife AI</span>
                  </div>
                  <div className="text-[10px] font-mono text-slate-300 font-bold">
                    PASSPORT 2026
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Quick Action Navigation Bar */}
      <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
        {quickActions.map((action, idx) => {
          const Icon = action.icon;
          return (
            <button
              key={idx}
              type="button"
              onClick={action.action}
              className={`flex items-center justify-center gap-2 p-3 rounded-2xl ${action.bg} shadow-md transition-all hover:scale-[1.02] active:scale-[0.98] font-bold text-xs`}
            >
              <Icon className="w-4 h-4 shrink-0" />
              <span className="truncate">{action.label}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
