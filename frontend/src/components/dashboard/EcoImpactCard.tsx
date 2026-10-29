'use client';

import React from 'react';
import { Sprout, ArrowRight, TrendingUp } from 'lucide-react';
import { formatKg } from '../../lib/formatters';

interface EcoImpactCardProps {
  wasteDivertedKg?: number;
}

export function EcoImpactCard({ wasteDivertedKg = 26.8 }: EcoImpactCardProps) {
  return (
    <div className="bg-gradient-to-br from-[#EAF6ED] via-[#F1F9F3] to-[#E5F3E9] rounded-3xl p-5 border border-emerald-200/60 shadow-[0_2px_12px_rgba(0,0,0,0.03)] relative overflow-hidden flex flex-col justify-between">
      <div>
        <div className="flex items-center gap-2 mb-2">
          <div className="w-8 h-8 rounded-xl bg-emerald-200/70 text-[#073E2E] flex items-center justify-center">
            <Sprout className="w-4 h-4" />
          </div>
          <div>
            <h3 className="text-sm font-bold text-slate-900 font-sans leading-tight">
              E-Waste Diverted
            </h3>
            <span className="text-[10px] text-emerald-800 font-semibold uppercase tracking-wider font-mono">
              Eco Target: 30 kg
            </span>
          </div>
        </div>

        <p className="text-xs text-slate-600 font-sans leading-relaxed mt-2">
          Salvation pipelines prevented toxic heavy metals and lithium from entering landfills.
        </p>

        <div className="mt-3 flex items-baseline gap-2">
          <span className="text-2xl font-extrabold text-[#073E2E] font-sans">
            {formatKg(wasteDivertedKg)}
          </span>
          <span className="text-xs font-semibold text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded-full">
            +14.6% vs target
          </span>
        </div>
      </div>

      <div className="mt-4 pt-3 border-t border-emerald-200/50 flex items-center justify-between">
        <button
          type="button"
          className="flex items-center gap-1.5 py-2 px-3.5 rounded-xl bg-[#073E2E] hover:bg-[#053023] text-white text-xs font-semibold shadow-sm transition-all"
        >
          <span>Explore Pathways</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </button>

        {/* Mini rising graphic */}
        <div className="flex items-end gap-1 h-8">
          <div className="w-1.5 h-3 bg-emerald-300 rounded-t-sm" />
          <div className="w-1.5 h-5 bg-emerald-400 rounded-t-sm" />
          <div className="w-1.5 h-7 bg-emerald-500 rounded-t-sm" />
          <div className="w-1.5 h-8 bg-[#073E2E] rounded-t-sm" />
        </div>
      </div>
    </div>
  );
}

