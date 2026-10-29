'use client';

import React from 'react';
import { HumanReviewItem } from '../../lib/types';
import { Card } from '../ui/Card';
import { Skeleton } from '../ui/Skeleton';
import {
  BatteryWarning,
  Eye,
  Droplets,
  Cpu,
  Volume2,
  Barcode,
  ChevronRight,
  ShieldAlert,
} from 'lucide-react';

interface HumanReviewQueueProps {
  queue: HumanReviewItem[];
  isLoading: boolean;
  onResolveItem?: (item: HumanReviewItem) => void;
}

export function HumanReviewQueue({ queue, isLoading, onResolveItem }: HumanReviewQueueProps) {
  const getIcon = (reason: string) => {
    if (reason.includes('Battery')) return BatteryWarning;
    if (reason.includes('Liquid')) return Droplets;
    if (reason.includes('barcode') || reason.includes('serial') || reason.includes('label')) return Barcode;
    if (reason.includes('acoustic') || reason.includes('fan')) return Volume2;
    if (reason.includes('confidence')) return Eye;
    return Cpu;
  };

  const getIconColor = (index: number) => {
    const colors = [
      'bg-amber-100 text-amber-800',
      'bg-sky-100 text-sky-800',
      'bg-purple-100 text-purple-800',
      'bg-rose-100 text-rose-800',
      'bg-emerald-100 text-emerald-800',
    ];
    return colors[index % colors.length];
  };

  if (isLoading) {
    return (
      <Card title="Upcoming Bench Tests" subtitle="AI guardrail review queue">
        <div className="space-y-3 py-2">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="flex items-center justify-between py-2 border-b border-slate-100">
              <Skeleton className="h-4 w-28" />
              <Skeleton className="h-4 w-16" />
            </div>
          ))}
        </div>
      </Card>
    );
  }

  return (
    <Card
      title="Upcoming Inspections"
      action={
        <span className="text-xs font-semibold text-[#073E2E] cursor-pointer hover:underline">
          {queue.length} Pending
        </span>
      }
    >
      {queue.length === 0 ? (
        <div className="py-8 text-center text-slate-400 text-xs">
          No bench tests currently pending. All automated checks passed.
        </div>
      ) : (
        <div className="space-y-2.5 py-1">
          {queue.slice(0, 5).map((item, index) => {
            const Icon = getIcon(item.reason);
            const iconStyle = getIconColor(index);

            return (
              <div
                key={item.id}
                onClick={() => onResolveItem && onResolveItem(item)}
                className="flex items-center justify-between p-2.5 rounded-2xl hover:bg-slate-50 transition-colors border border-transparent hover:border-slate-100 group cursor-pointer"
                title="Click to execute bench test and resolve review"
              >
                <div className="flex items-center gap-3 min-w-0">
                  <div
                    className={`w-9 h-9 rounded-2xl ${iconStyle} flex items-center justify-center shrink-0 shadow-sm`}
                  >
                    <Icon className="w-4 h-4" />
                  </div>
                  <div className="min-w-0">
                    <h5 className="text-xs font-bold text-slate-800 font-sans group-hover:text-[#073E2E] transition-colors truncate">
                      {item.product_name}
                    </h5>
                    <p className="text-[10px] text-slate-500 font-medium truncate max-w-[170px]">
                      {item.reason}
                    </p>
                  </div>
                </div>

                <div className="flex flex-col items-end shrink-0 pl-2">
                  <span className="text-xs font-bold text-[#073E2E] font-mono">
                    {item.defect_confidence}%
                  </span>
                  <span className="text-[10px] text-amber-800 bg-amber-100/70 hover:bg-amber-200 px-2 py-0.5 rounded-full font-semibold mt-0.5 transition-colors">
                    Test Now →
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </Card>
  );
}
