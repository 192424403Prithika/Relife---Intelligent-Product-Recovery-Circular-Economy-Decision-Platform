'use client';

import React from 'react';
import { DefectCategoryItem } from '../../lib/types';
import { Card } from '../ui/Card';
import { ChartSkeleton } from '../ui/Skeleton';
import {
  BatteryWarning,
  Sparkles,
  ShieldAlert,
  Cpu,
  PackageX,
} from 'lucide-react';

interface CommonDefectsChartProps {
  data: DefectCategoryItem[];
  isLoading: boolean;
  selectedDefect?: string | null;
  onSelectDefect?: (defect: string) => void;
}

const DEFECT_CONFIG: Record<
  string,
  { color: string; bg: string; icon: React.ElementType }
> = {
  'Battery fault': { color: 'text-[#F57C00]', bg: 'bg-[#F57C00]/20 border border-[#F57C00]/30', icon: BatteryWarning },
  Crack: { color: 'text-red-400', bg: 'bg-red-950/60 border border-red-500/30', icon: ShieldAlert },
  Scratch: { color: 'text-[#FFC21A]', bg: 'bg-[#FFC21A]/20 border border-[#FFC21A]/30', icon: Sparkles },
  Dent: { color: 'text-cyan-400', bg: 'bg-cyan-950/60 border border-cyan-500/30', icon: Cpu },
  'Missing part': { color: 'text-purple-400', bg: 'bg-purple-950/60 border border-purple-500/30', icon: PackageX },
};

export function CommonDefectsChart({
  data,
  isLoading,
  selectedDefect,
  onSelectDefect,
}: CommonDefectsChartProps) {
  if (isLoading) {
    return (
      <Card title="Top Defect Categories" subtitle="Hardware failure taxonomy">
        <ChartSkeleton height="h-64" />
      </Card>
    );
  }

  return (
    <Card
      title="Common Defect Categories"
      action={
        <span className="text-xs font-mono text-slate-400">
          OpenCV Classified
        </span>
      }
      className="h-full flex flex-col justify-between"
    >
      <div className="space-y-3.5 py-1">
        {data.map((item) => {
          const cfg = DEFECT_CONFIG[item.category] || {
            color: 'text-slate-300',
            bg: 'bg-[#1E202E]',
            icon: Sparkles,
          };
          const Icon = cfg.icon;
          const isSelected =
            selectedDefect?.toLowerCase() === item.category.toLowerCase();

          return (
            <div
              key={item.category}
              onClick={() => onSelectDefect && onSelectDefect(item.category)}
              className={`p-2 rounded-xl cursor-pointer transition-colors ${
                isSelected
                  ? 'bg-[#1E202E] border border-[#FFC21A]/50 text-white'
                  : 'hover:bg-[#181926] text-slate-300'
              }`}
            >
              <div className="flex items-center justify-between text-xs mb-1.5">
                <div className="flex items-center gap-2.5">
                  <div className={`p-1.5 rounded-lg ${cfg.bg} ${cfg.color} shrink-0`}>
                    <Icon className="w-3.5 h-3.5" />
                  </div>
                  <span
                    className={`font-sans ${
                      isSelected
                        ? 'font-bold text-[#FFC21A]'
                        : 'font-semibold text-white'
                    }`}
                  >
                    {item.category}
                  </span>
                </div>
                <div className="flex items-center gap-3 font-mono">
                  <span className="text-slate-400 text-[11px]">{item.percentage}%</span>
                  <span className="text-white font-bold text-[11px] min-w-[36px] text-right">
                    {item.count} units
                  </span>
                </div>
              </div>

              {/* Progress bar */}
              <div className="w-full bg-[#1E202E] h-1.5 rounded-full overflow-hidden">
                <div
                  className="h-full rounded-full bg-[#FFC21A] transition-all duration-500"
                  style={{ width: `${Math.min(100, item.percentage * 2)}%` }}
                />
              </div>
            </div>
          );
        })}
      </div>
    </Card>
  );
}
