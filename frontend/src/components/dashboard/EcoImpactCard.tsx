'use client';

import React from 'react';
import { Sprout, ArrowRight, TrendingUp } from 'lucide-react';
import { formatKg } from '../../lib/formatters';

interface EcoImpactCardProps {
  wasteDivertedKg?: number;
}

export function EcoImpactCard({ wasteDivertedKg = 26.8 }: EcoImpactCardProps) {
  return (
    <div className="bg-[#12131A] rounded-3xl p-5 border border-[#252836] shadow-xl relative overflow-hidden flex flex-col justify-between text-white">
      <div>
        <div className="flex items-center gap-2 mb-2">
          <div className="w-8 h-8 rounded-xl bg-emerald-950/80 border border-emerald-500/30 text-emerald-400 flex items-center justify-center">
            <Sprout className="w-4 h-4" />
          </div>
          <div>
            <h3 className="text-sm font-bold text-white font-sans leading-tight">
              E-Waste Diverted
            </h3>
            <span className="text-[10px] text-emerald-400 font-semibold uppercase tracking-wider font-mono">
              Eco Target: 30 kg
            </span>
          </div>
        </div>

        <p className="text-xs text-slate-400 font-sans leading-relaxed mt-2">
          Circular recovery prevented toxic heavy metals and battery cells from entering landfills.
        </p>

        <div className="mt-3 flex items-baseline gap-2">
          <span className="text-2xl font-extrabold font-mono text-emerald-400">
            {formatKg(wasteDivertedKg)}
          </span>
          <span className="text-xs font-semibold text-emerald-300 bg-emerald-950 px-2 py-0.5 rounded-full border border-emerald-500/30">
            +14.6% vs target
          </span>
        </div>
      </div>

      <div className="mt-4 pt-3 border-t border-[#1E202E] flex items-center justify-between">
        <span className="text-[11px] text-[#FFC21A] font-semibold">
          38.5 kg CO₂e saved / kg
        </span>

        {/* Mini rising graphic */}
        <div className="flex items-end gap-1 h-8">
          <div className="w-1.5 h-3 bg-emerald-800 rounded-t-sm" />
          <div className="w-1.5 h-5 bg-emerald-600 rounded-t-sm" />
          <div className="w-1.5 h-7 bg-emerald-500 rounded-t-sm" />
          <div className="w-1.5 h-8 bg-emerald-400 rounded-t-sm" />
        </div>
      </div>
    </div>
  );
}
