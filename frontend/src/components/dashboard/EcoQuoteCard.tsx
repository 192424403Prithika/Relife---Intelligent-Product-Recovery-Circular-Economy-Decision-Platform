'use client';

import React from 'react';
import { Leaf, Sun, Award } from 'lucide-react';

export function EcoQuoteCard() {
  return (
    <div className="p-5 rounded-3xl bg-[#12131A] border border-[#252836] shadow-xl relative overflow-hidden flex flex-col justify-between text-white">
      <div>
        <div className="flex items-center gap-2 mb-2">
          <Sun className="w-5 h-5 text-[#FFC21A] fill-[#FFC21A]/30" />
          <Leaf className="w-4 h-4 text-emerald-400" />
        </div>

        <h4 className="text-sm font-bold text-white font-sans leading-snug">
          &ldquo;Intelligent product recovery, <br /> zero electronic landfill.&rdquo;
        </h4>

        <p className="text-[11px] text-slate-400 mt-2 leading-relaxed">
          Autonomous testing and repair preserves 85% of embedded manufacturing energy across electronics and consumer hardware.
        </p>
      </div>

      <div className="mt-4 pt-3 border-t border-[#1E202E] text-[10px] font-mono text-[#FFC21A] font-semibold flex items-center justify-between">
        <span>ReLife AI Protocol</span>
        <span className="text-emerald-400">R2v3 Certified</span>
      </div>
    </div>
  );
}
