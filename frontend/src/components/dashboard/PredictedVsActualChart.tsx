'use client';

import React from 'react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from 'recharts';
import { PredictedVsActualItem } from '../../lib/types';
import { formatINR } from '../../lib/formatters';
import { Card } from '../ui/Card';
import { ChartSkeleton } from '../ui/Skeleton';

interface PredictedVsActualChartProps {
  data: PredictedVsActualItem[];
  isLoading: boolean;
}

export function PredictedVsActualChart({ data, isLoading }: PredictedVsActualChartProps) {
  if (isLoading) {
    return (
      <Card title="Predicted vs. Actual Recovery Value" subtitle="Forecast precision by circular pathway">
        <ChartSkeleton height="h-64" />
      </Card>
    );
  }

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      const item = data.find((d) => d.pathway === label) || (payload[0].payload as PredictedVsActualItem);
      const diff = item.actual_value - item.predicted_value;
      const diffPct = item.predicted_value > 0 ? (diff / item.predicted_value) * 100 : 0;
      const isPositive = diff >= 0;

      return (
        <div className="bg-[#08080D] border border-[#252836] rounded-xl p-3 shadow-2xl text-xs font-mono">
          <div className="text-xs font-bold text-white mb-1.5 pb-1 border-b border-[#1E202E] flex items-center justify-between">
            <span>{item.pathway} Pathway</span>
            <span className="text-slate-400 font-normal">{item.count} items</span>
          </div>
          <div className="space-y-1 text-xs">
            <div className="flex justify-between gap-6 text-slate-300">
              <span>Predicted Value:</span>
              <span className="font-bold text-[#FFC21A]">{formatINR(item.predicted_value, false)}</span>
            </div>
            <div className="flex justify-between gap-6 text-slate-300">
              <span>Actual Realized:</span>
              <span className="font-bold text-[#22D3EE]">{formatINR(item.actual_value, false)}</span>
            </div>
            <div className="pt-1.5 border-t border-[#1E202E] flex justify-between gap-6 items-center">
              <span className="text-slate-400">Variance:</span>
              <span
                className={`font-bold px-1.5 py-0.5 rounded text-[11px] ${
                  isPositive ? 'text-emerald-300 bg-emerald-950/80 border border-emerald-500/30' : 'text-amber-300 bg-amber-950/80 border border-amber-500/30'
                }`}
              >
                {isPositive ? '+' : ''}
                {diffPct.toFixed(1)}% ({formatINR(diff, true)})
              </span>
            </div>
          </div>
        </div>
      );
    }
    return null;
  };

  return (
    <Card
      title="Predicted vs. Actual Value"
      action={
        <span className="text-xs font-mono font-semibold text-[#FFC21A] bg-[#08080D] border border-[#252836] px-2.5 py-1 rounded-lg">
          Closed-Loop Audit
        </span>
      }
      className="h-full flex flex-col justify-between"
    >
      <div className="h-60 w-full pt-1">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data} margin={{ top: 10, right: 10, left: 0, bottom: 5 }} barGap={4}>
            <CartesianGrid strokeDasharray="3 3" stroke="#1E202E" vertical={false} />
            <XAxis
              dataKey="pathway"
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
            <Legend
              verticalAlign="top"
              align="right"
              iconType="circle"
              wrapperStyle={{ paddingBottom: 8, fontSize: 11 }}
              formatter={(value) => (
                <span className="text-slate-300 font-medium text-xs">
                  {value === 'predicted_value' ? 'Predicted (Model)' : 'Actual Realized'}
                </span>
              )}
            />
            <Bar
              dataKey="predicted_value"
              name="predicted_value"
              fill="#FFC21A"
              radius={[4, 4, 0, 0]}
              barSize={14}
            />
            <Bar
              dataKey="actual_value"
              name="actual_value"
              fill="#22D3EE"
              radius={[4, 4, 0, 0]}
              barSize={14}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </Card>
  );
}
