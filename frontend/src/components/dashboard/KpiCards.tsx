'use client';

import React from 'react';
import { KPIs } from '../../lib/types';
import { formatINR, formatIndianNumber, formatKg, formatPercent } from '../../lib/formatters';
import { KpiSkeleton } from '../ui/Skeleton';
import {
  PackageCheck,
  Percent,
  IndianRupee,
  Scale,
  AlertCircle,
  TrendingUp,
  TrendingDown,
  ArrowUpRight,
  ArrowDownRight,
} from 'lucide-react';

interface KpiCardsProps {
  kpis: KPIs | null;
  isLoading: boolean;
}

export function KpiCards({ kpis, isLoading }: KpiCardsProps) {
  if (isLoading || !kpis) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
        {[...Array(5)].map((_, i) => (
          <KpiSkeleton key={i} />
        ))}
      </div>
    );
  }

  const cards = [
    {
      title: 'Total Returns',
      subtitle: 'Incoming electronics volume',
      value: formatIndianNumber(kpis.total_returns),
      unit: 'Units',
      change: kpis.total_returns_change_pct,
      changeLabel: 'vs prior 30d',
      icon: PackageCheck,
      accentColor: '#FFC21A',
      iconColor: 'text-[#FFC21A]',
      iconBg: 'bg-[#FFC21A]/10 border-[#FFC21A]/30',
      gradient: 'from-[#FFC21A]/10 via-transparent to-transparent',
    },
    {
      title: 'Recovery Rate',
      subtitle: 'Circular salvage efficiency',
      value: formatPercent(kpis.recovery_rate_pct),
      unit: 'Salvaged',
      change: kpis.recovery_rate_change_pct,
      changeLabel: 'fleet yield',
      icon: Percent,
      accentColor: '#22D3EE',
      iconColor: 'text-[#22D3EE]',
      iconBg: 'bg-[#22D3EE]/10 border-[#22D3EE]/30',
      gradient: 'from-[#22D3EE]/10 via-transparent to-transparent',
    },
    {
      title: 'Value Recovered',
      subtitle: 'Recaptured residual value',
      value: formatINR(kpis.value_recovered_inr, true),
      fullValue: formatINR(kpis.value_recovered_inr, false),
      unit: 'INR Gross',
      change: kpis.value_recovered_change_pct,
      changeLabel: 'margin capture',
      icon: IndianRupee,
      accentColor: '#10B981',
      iconColor: 'text-[#10B981]',
      iconBg: 'bg-[#10B981]/10 border-[#10B981]/30',
      gradient: 'from-[#10B981]/10 via-transparent to-transparent',
    },
    {
      title: 'Waste Diverted',
      subtitle: 'Landfill avoidance weight',
      value: formatKg(kpis.waste_diverted_kg),
      unit: 'E-Waste saved',
      change: kpis.waste_diverted_change_pct,
      changeLabel: 'environmental',
      icon: Scale,
      accentColor: '#F57C00',
      iconColor: 'text-[#F57C00]',
      iconBg: 'bg-[#F57C00]/10 border-[#F57C00]/30',
      gradient: 'from-[#F57C00]/10 via-transparent to-transparent',
    },
    {
      title: 'Awaiting Review',
      subtitle: 'AI guardrail review queue',
      value: formatIndianNumber(kpis.awaiting_human_review),
      unit: 'Bench tests',
      change: kpis.awaiting_human_review_change,
      isCountDelta: true,
      changeLabel: 'pending units',
      icon: AlertCircle,
      accentColor: '#F59E0B',
      iconColor: 'text-amber-400',
      iconBg: 'bg-amber-400/10 border-amber-400/30',
      gradient: 'from-amber-500/10 via-transparent to-transparent',
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
      {cards.map((card, idx) => {
        const Icon = card.icon;
        const isPositive = card.change >= 0;

        return (
          <div
            key={idx}
            className="relative bg-gradient-to-b from-[#18140E] to-[#110E09] border border-[#FFC21A]/20 hover:border-[#FFC21A]/60 rounded-2xl p-5 shadow-xl shadow-black/70 hover:shadow-2xl transition-all duration-300 group overflow-hidden"
          >
            {/* Top ambient color edge */}
            <div
              className="absolute top-0 inset-x-4 h-[2px] opacity-70 group-hover:opacity-100 transition-opacity"
              style={{
                background: `linear-gradient(90deg, transparent, ${card.accentColor}, transparent)`,
              }}
            />

            {/* Header: Title and Icon */}
            <div className="flex items-start justify-between">
              <div>
                <h3 className="text-xs font-semibold text-slate-300 uppercase tracking-wider font-mono">
                  {card.title}
                </h3>
                <p className="text-[10px] text-slate-400 font-sans mt-0.5">
                  {card.subtitle}
                </p>
              </div>
              <div
                className={`p-2.5 rounded-xl border ${card.iconBg} ${card.iconColor} shadow-md group-hover:scale-105 transition-transform`}
              >
                <Icon className="w-4 h-4" />
              </div>
            </div>

            {/* Metric Value Display */}
            <div className="mt-4">
              <div className="flex items-baseline gap-2" title={card.fullValue || card.value}>
                <span className="text-2xl sm:text-3xl font-bold tracking-tight text-white font-sans drop-shadow-sm">
                  {card.value}
                </span>
                {card.fullValue && (
                  <span className="text-[11px] text-slate-400 font-mono hidden xl:inline">
                    {card.fullValue}
                  </span>
                )}
              </div>
            </div>

            {/* Footer: Trend and Sample Data Badge */}
            <div className="mt-4 pt-3 border-t border-[#FFC21A]/10 flex items-center justify-between text-xs">
              <div
                className={`inline-flex items-center gap-1 font-semibold text-[11px] px-2 py-0.5 rounded-md ${
                  isPositive
                    ? 'text-emerald-400 bg-emerald-500/10 border border-emerald-500/20'
                    : 'text-rose-400 bg-rose-500/10 border border-rose-500/20'
                }`}
              >
                {isPositive ? (
                  <ArrowUpRight className="w-3.5 h-3.5" />
                ) : (
                  <ArrowDownRight className="w-3.5 h-3.5" />
                )}
                <span>
                  {isPositive ? '+' : ''}
                  {card.isCountDelta ? card.change : `${card.change}%`}
                </span>
                <span className="text-[10px] text-slate-400 font-normal">
                  {card.changeLabel}
                </span>
              </div>

              <span className="text-[9px] uppercase tracking-wider text-[#FFC21A]/80 font-mono bg-[#FFC21A]/10 px-1.5 py-0.5 rounded border border-[#FFC21A]/20">
                Sample
              </span>
            </div>
          </div>
        );
      })}
    </div>
  );
}
