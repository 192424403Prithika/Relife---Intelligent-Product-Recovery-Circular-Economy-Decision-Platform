import React from 'react';
import { ReturnStatus } from '../../lib/types';
import { Sparkles, Wrench, RefreshCw, Layers, Trash2 } from 'lucide-react';

export function StatusChip({ status }: { status: ReturnStatus | string }) {
  if (status === 'Recovered') {
    return (
      <span className="inline-flex items-center gap-1.5 text-xs font-semibold px-2.5 py-0.5 rounded-full bg-emerald-950/80 text-emerald-400 border border-emerald-500/40">
        <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
        Recovered
      </span>
    );
  }
  if (status === 'In progress') {
    return (
      <span className="inline-flex items-center gap-1.5 text-xs font-semibold px-2.5 py-0.5 rounded-full bg-cyan-950/80 text-cyan-400 border border-cyan-500/40">
        <span className="w-1.5 h-1.5 rounded-full bg-cyan-400" />
        In progress
      </span>
    );
  }
  return (
    <span className="inline-flex items-center gap-1.5 text-xs font-semibold px-2.5 py-0.5 rounded-full bg-amber-950/80 text-[#FFC21A] border border-[#FFC21A]/40">
      <span className="w-1.5 h-1.5 rounded-full bg-[#FFC21A]" />
      Needs review
    </span>
  );
}

export function PathwayBadge({ pathway }: { pathway: string }) {
  const styles: Record<string, { bg: string; text: string; border: string; icon: React.ElementType }> = {
    Resale: {
      bg: 'bg-amber-950/60',
      text: 'text-[#FFC21A]',
      border: 'border-[#FFC21A]/40',
      icon: Sparkles,
    },
    'Direct Resale': {
      bg: 'bg-amber-950/60',
      text: 'text-[#FFC21A]',
      border: 'border-[#FFC21A]/40',
      icon: Sparkles,
    },
    Repair: {
      bg: 'bg-cyan-950/60',
      text: 'text-cyan-400',
      border: 'border-cyan-500/40',
      icon: Wrench,
    },
    Refurbish: {
      bg: 'bg-orange-950/60',
      text: 'text-[#F57C00]',
      border: 'border-[#F57C00]/40',
      icon: RefreshCw,
    },
    Refurbishment: {
      bg: 'bg-orange-950/60',
      text: 'text-[#F57C00]',
      border: 'border-[#F57C00]/40',
      icon: RefreshCw,
    },
    Harvest: {
      bg: 'bg-purple-950/60',
      text: 'text-purple-400',
      border: 'border-purple-500/40',
      icon: Layers,
    },
    'Component Harvesting': {
      bg: 'bg-purple-950/60',
      text: 'text-purple-400',
      border: 'border-purple-500/40',
      icon: Layers,
    },
    Recycle: {
      bg: 'bg-emerald-950/60',
      text: 'text-emerald-400',
      border: 'border-emerald-500/40',
      icon: Trash2,
    },
    Recycling: {
      bg: 'bg-emerald-950/60',
      text: 'text-emerald-400',
      border: 'border-emerald-500/40',
      icon: Trash2,
    },
  };

  const config = styles[pathway] || {
    bg: 'bg-[#1E202E]',
    text: 'text-slate-300',
    border: 'border-[#252836]',
    icon: Sparkles,
  };
  const Icon = config.icon;

  return (
    <span
      className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold ${config.bg} ${config.text} border ${config.border}`}
    >
      <Icon className="w-3 h-3 shrink-0" />
      <span>{pathway}</span>
    </span>
  );
}
