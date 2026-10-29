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
  ChevronRight,
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
  'Battery fault': { color: 'text-amber-700', bg: 'bg-amber-100', icon: BatteryWarning },
  Crack: { color: 'text-rose-700', bg: 'bg-rose-100', icon: ShieldAlert },
  Scratch: { color: 'text-emerald-700', bg: 'bg-emerald-100', icon: Sparkles },
  Dent: { color: 'text-sky-700', bg: 'bg-sky-100', icon: Cpu },
  'Missing part': { color: 'text-purple-700', bg: 'bg-purple-100', icon: PackageX },
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
      title="Top Failure Modes"
      action={
        <span className="text-xs text-slate-400 font-medium">
          Filter by Defect
        </span>
      }
      className="h-full flex flex-col justify-between"
    >
      <div className="space-y-3.5 py-1">
        {data.map((item) => {
          const cfg = DEFECT_CONFIG[item.category] || {
            color: 'text-slate-700',
            bg: 'bg-slate-100',
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
                  ? 'bg-amber-50/80 border border-amber-200'
                  : 'hover:bg-slate-50'
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
                        ? 'font-bold text-amber-900'
                        : 'font-semibold text-slate-800'
                    }`}
                  >
                    {item.category}
                  </span>
                </div>
                <div className="flex items-center gap-3 font-mono">
                  <span className="text-slate-400 text-[11px]">{item.percentage}%</span>
                  <span className="text-slate-800 font-bold text-[11px] min-w-[36px] text-right">
                    {item.count}u
                  </span>
                </div>
              </div>

              {/* Progress bar */}
              <div className="w-full bg-slate-100 h-1.5 rounded-full overflow-hidden">
                <div
                  className="h-full rounded-full bg-[#073E2E] transition-all duration-500"
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
