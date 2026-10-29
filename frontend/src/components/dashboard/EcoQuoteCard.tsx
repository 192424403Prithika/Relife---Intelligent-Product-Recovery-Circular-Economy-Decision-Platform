'use client';

import React from 'react';
import { Leaf, Sun } from 'lucide-react';

export function EcoQuoteCard() {
  return (
    <div className="p-5 rounded-3xl bg-gradient-to-br from-emerald-50 via-[#EAF6ED] to-teal-50 border border-emerald-200/50 shadow-[0_2px_12px_rgba(0,0,0,0.03)] relative overflow-hidden flex flex-col justify-between">
      <div>
        <div className="flex items-center gap-2 mb-2 text-amber-500">
          <Sun className="w-5 h-5 fill-amber-400" />
          <Leaf className="w-4 h-4 text-[#073E2E] fill-current" />
        </div>

        <h4 className="text-sm font-bold text-[#073E2E] font-sans leading-snug">
          &ldquo;Better circular habits, <br /> a greener tomorrow.&rdquo;
        </h4>

        <p className="text-[11px] text-slate-600 mt-2 leading-relaxed">
          Autonomous testing and repair preserves 85% of embedded manufacturing energy across all returned product categories, from electronics to smart home appliances.
        </p>
      </div>

      <div className="mt-4 pt-2 text-[10px] font-mono text-emerald-800 font-semibold flex items-center justify-between">
        <span>ReLife AI • Hub Protocol</span>
        <span>Eco-Standard R2</span>
      </div>
    </div>
  );
}

