'use client';

import React, { useState } from 'react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Cell,
} from 'recharts';
import { ValueOverTimePoint } from '../../lib/types';
import { formatINR } from '../../lib/formatters';
import { Card } from '../ui/Card';
import { ChartSkeleton } from '../ui/Skeleton';

interface ValueOverTimeChartProps {
  data: ValueOverTimePoint[];
  isLoading: boolean;
}

export function ValueOverTimeChart({ data, isLoading }: ValueOverTimeChartProps) {
  const [selectedIdx, setSelectedIdx] = useState<number>(data.length - 1);

  if (isLoading) {
    return (
      <Card title="Monthly Recovery Velocity" subtitle="Value recovered per cycle">
        <ChartSkeleton height="h-64" />
      </Card>
    );
  }

  // Group or sample points for a clean 12-bar display like Finora
  const sampleData = data.slice(-12).map((d, index) => {
    try {
      const parts = d.date.split('-');
      const dateObj = new Date(parseInt(parts[0]), parseInt(parts[1]) - 1, parseInt(parts[2]));
      return {
        ...d,
        monthName: dateObj.toLocaleDateString('en-IN', { day: 'numeric', month: 'short' }),
        isCurrent: index === data.slice(-12).length - 1,
      };
    } catch {
      return { ...d, monthName: d.date, isCurrent: index === data.slice(-12).length - 1 };
    }
  });

  const activeItem = sampleData[selectedIdx] || sampleData[sampleData.length - 1];

  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      const pt = payload[0].payload;
      return (
        <div className="bg-white border border-slate-200 rounded-xl p-3 shadow-xl">
          <div className="text-xs font-bold text-slate-900 mb-1">{pt.monthName}</div>
          <div className="text-xs text-slate-600 space-y-0.5">
            <div className="flex justify-between gap-4">
              <span>Recovered Value:</span>
              <span className="font-bold text-[#073E2E]">{formatINR(pt.daily_value_inr, false)}</span>
            </div>
            <div className="flex justify-between gap-4">
              <span>Cumulative:</span>
              <span className="font-bold text-slate-800">{formatINR(pt.cumulative_value_inr, true)}</span>
            </div>
            <div className="flex justify-between gap-4">
              <span>Returns Processed:</span>
              <span className="font-bold text-slate-800">{pt.returns_count} units</span>
            </div>
          </div>
        </div>
      );
    }
    return null;
  };

  const actionDropdown = (
    <div className="text-xs font-medium text-slate-500 bg-slate-50 border border-slate-200/80 px-2.5 py-1 rounded-lg">
      October 2026 ▾
    </div>
  );

  return (
    <Card title="Monthly Recovery" action={actionDropdown} className="h-full flex flex-col justify-between">
      {/* Active Callout Pill matching Finora's "$1,240.60 Apr" */}
      <div className="flex items-center justify-center my-1">
        {activeItem && (
          <div className="inline-flex flex-col items-center px-4 py-1.5 rounded-xl bg-emerald-50 border border-emerald-200/70 text-center shadow-sm">
            <span className="text-[10px] text-emerald-800 font-semibold">{activeItem.monthName}</span>
            <span className="text-sm font-bold text-[#073E2E] font-sans">
              {formatINR(activeItem.daily_value_inr, false)}
            </span>
          </div>
        )}
      </div>

      <div className="h-52 w-full pt-1">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={sampleData} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#F1F5F9" vertical={false} />
            <XAxis
              dataKey="monthName"
              stroke="#94A3B8"
              fontSize={10}
              tickLine={false}
              axisLine={false}
            />
            <YAxis
              stroke="#94A3B8"
              fontSize={10}
              tickLine={false}
              axisLine={false}
              tickFormatter={(v) => formatINR(v, true)}
              width={65}
            />
            <Tooltip content={<CustomTooltip />} />
            <Bar dataKey="daily_value_inr" radius={[6, 6, 0, 0]} barSize={16}>
              {sampleData.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={index === selectedIdx ? '#073E2E' : '#A7F3D0'}
                  className="hover:opacity-80 cursor-pointer transition-colors"
                  onClick={() => setSelectedIdx(index)}
                />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
    </Card>
  );
}
