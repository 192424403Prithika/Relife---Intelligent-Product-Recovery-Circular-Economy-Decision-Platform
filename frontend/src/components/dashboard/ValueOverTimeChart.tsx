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
      <Card title="Recovery Velocity" subtitle="Daily value recovered">
        <ChartSkeleton height="h-64" />
      </Card>
    );
  }

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
        <div className="bg-[#08080D] border border-[#252836] rounded-xl p-3 shadow-2xl text-xs font-mono">
          <div className="text-xs font-bold text-white mb-1">{pt.monthName}</div>
          <div className="text-xs text-slate-300 space-y-0.5">
            <div className="flex justify-between gap-4">
              <span>Recovered Value:</span>
              <span className="font-bold text-[#FFC21A]">{formatINR(pt.daily_value_inr, false)}</span>
            </div>
            <div className="flex justify-between gap-4">
              <span>Cumulative:</span>
              <span className="font-bold text-white">{formatINR(pt.cumulative_value_inr, true)}</span>
            </div>
            <div className="flex justify-between gap-4">
              <span>Returns Count:</span>
              <span className="font-bold text-white">{pt.returns_count} units</span>
            </div>
          </div>
        </div>
      );
    }
    return null;
  };

  return (
    <Card
      title="Value Recovery Timeline"
      action={
        <div className="text-xs font-mono font-semibold text-slate-400 bg-[#08080D] border border-[#252836] px-2.5 py-1 rounded-lg">
          30-Day Trend
        </div>
      }
      className="h-full flex flex-col justify-between"
    >
      {/* Active Callout Pill */}
      <div className="flex items-center justify-center my-1">
        {activeItem && (
          <div className="inline-flex flex-col items-center px-4 py-1.5 rounded-xl bg-[#08080D] border border-[#FFC21A]/40 text-center shadow-md">
            <span className="text-[10px] text-slate-400 font-mono font-semibold">{activeItem.monthName}</span>
            <span className="text-sm font-bold font-mono text-[#FFC21A]">
              {formatINR(activeItem.daily_value_inr, false)}
            </span>
          </div>
        )}
      </div>

      <div className="h-52 w-full pt-1">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={sampleData} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#1E202E" vertical={false} />
            <XAxis
              dataKey="monthName"
              stroke="#64748B"
              fontSize={10}
              tickLine={false}
              axisLine={false}
            />
            <YAxis
              stroke="#64748B"
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
                  fill={index === selectedIdx ? '#FFC21A' : '#1E202E'}
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
