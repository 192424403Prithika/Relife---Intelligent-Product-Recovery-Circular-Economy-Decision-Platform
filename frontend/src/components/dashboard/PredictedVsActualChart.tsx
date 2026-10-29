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
        <div className="bg-white border border-slate-200 rounded-xl p-3 shadow-xl">
          <div className="text-xs font-bold text-slate-900 mb-1.5 pb-1 border-b border-slate-100 flex items-center justify-between">
            <span>{item.pathway} Pathway</span>
            <span className="text-slate-400 font-normal">{item.count} validated</span>
          </div>
          <div className="space-y-1 text-xs">
            <div className="flex justify-between gap-6 text-slate-600">
              <span>Predicted Value:</span>
              <span className="font-bold text-slate-900">{formatINR(item.predicted_value, false)}</span>
            </div>
            <div className="flex justify-between gap-6 text-slate-600">
              <span>Actual Realized:</span>
              <span className="font-bold text-[#073E2E]">{formatINR(item.actual_value, false)}</span>
            </div>
            <div className="pt-1.5 border-t border-slate-100 flex justify-between gap-6 items-center">
              <span className="text-slate-500">Variance:</span>
              <span
                className={`font-bold px-1.5 py-0.2 rounded text-[11px] ${
                  isPositive ? 'text-emerald-700 bg-emerald-50' : 'text-amber-700 bg-amber-50'
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
      title="Forecast vs. Realized Value"
      action={
        <span className="text-xs font-semibold text-[#073E2E] cursor-pointer hover:underline">
          Analysis →
        </span>
      }
      className="h-full flex flex-col justify-between"
    >
      <div className="h-60 w-full pt-1">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data} margin={{ top: 10, right: 10, left: 0, bottom: 5 }} barGap={4}>
            <CartesianGrid strokeDasharray="3 3" stroke="#F1F5F9" vertical={false} />
            <XAxis
              dataKey="pathway"
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
            <Legend
              verticalAlign="top"
              align="right"
              iconType="circle"
              wrapperStyle={{ paddingBottom: 8, fontSize: 11 }}
              formatter={(value) => (
                <span className="text-slate-600 font-medium text-xs">
                  {value === 'predicted_value' ? 'Predicted' : 'Actual'}
                </span>
              )}
            />
            <Bar
              dataKey="predicted_value"
              name="predicted_value"
              fill="#073E2E"
              radius={[4, 4, 0, 0]}
              barSize={14}
            />
            <Bar
              dataKey="actual_value"
              name="actual_value"
              fill="#34D399"
              radius={[4, 4, 0, 0]}
              barSize={14}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </Card>
  );
}
