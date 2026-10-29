'use client';

import React from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';
import { PathwayDistributionItem } from '../../lib/types';
import { Card } from '../ui/Card';
import { ChartSkeleton } from '../ui/Skeleton';
import { formatINR } from '../../lib/formatters';

interface PathwayDistributionChartProps {
  data: PathwayDistributionItem[];
  totalValue?: number;
  isLoading: boolean;
}

const FINORA_COLORS = [
  '#073E2E', // Deep forest green
  '#0EA5E9', // Sky Blue
  '#F59E0B', // Amber
  '#8B5CF6', // Purple
  '#EC4899', // Pink
];

export function PathwayDistributionChart({
  data,
  totalValue = 1809550,
  isLoading,
}: PathwayDistributionChartProps) {
  if (isLoading) {
    return (
      <Card title="Recovery Pathways" subtitle="Allocation across 5 circular endpoints">
        <ChartSkeleton height="h-64" />
      </Card>
    );
  }

  const enrichedData = data.map((item, idx) => ({
    ...item,
    color: FINORA_COLORS[idx % FINORA_COLORS.length],
    estimatedValue: Math.round((totalValue * item.percentage) / 100),
  }));

  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      const item = payload[0].payload;
      return (
        <div className="bg-white border border-slate-200 rounded-xl p-3 shadow-xl">
          <div className="flex items-center gap-2 mb-1.5 pb-1 border-b border-slate-100">
            <span
              className="w-2.5 h-2.5 rounded-full"
              style={{ backgroundColor: item.color }}
            />
            <span className="font-bold text-slate-800 text-xs font-sans">{item.name} Pathway</span>
          </div>
          <div className="text-xs text-slate-600 space-y-0.5">
            <div className="flex justify-between gap-4">
              <span>Volume:</span>
              <span className="font-bold text-slate-900">{item.count} units</span>
            </div>
            <div className="flex justify-between gap-4">
              <span>Share:</span>
              <span className="font-bold text-emerald-700">{item.percentage}%</span>
            </div>
            <div className="flex justify-between gap-4">
              <span>Recovered:</span>
              <span className="font-bold text-slate-900">{formatINR(item.estimatedValue, true)}</span>
            </div>
          </div>
        </div>
      );
    }
    return null;
  };

  const actionDropdown = (
    <div className="text-xs font-medium text-slate-500 bg-slate-50 border border-slate-200/80 px-2.5 py-1 rounded-lg">
      This Month ▾
    </div>
  );

  return (
    <Card
      title="Recovery Overview"
      action={actionDropdown}
      className="h-full flex flex-col justify-between"
    >
      <div className="grid grid-cols-1 sm:grid-cols-12 items-center gap-4 py-2">
        {/* Left: Donut Chart with Center Amount */}
        <div className="sm:col-span-6 h-48 sm:h-56 relative flex items-center justify-center">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={enrichedData}
                cx="50%"
                cy="50%"
                innerRadius={55}
                outerRadius={78}
                paddingAngle={4}
                dataKey="count"
                stroke="#FFFFFF"
                strokeWidth={3}
              >
                {enrichedData.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={entry.color}
                    className="hover:opacity-85 transition-opacity cursor-pointer outline-none"
                  />
                ))}
              </Pie>
              <Tooltip content={<CustomTooltip />} />
            </PieChart>
          </ResponsiveContainer>

          {/* Center Callout matching Finora's "$1,240.60 Total Spent" */}
          <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
            <span className="text-base sm:text-lg font-extrabold font-sans text-slate-900 tracking-tight">
              {formatINR(totalValue, true)}
            </span>
            <span className="text-[10px] text-slate-400 font-medium">Total Recovered</span>
          </div>
        </div>

        {/* Right: Detailed Finora-Style Legend List */}
        <div className="sm:col-span-6 flex flex-col justify-center space-y-2 text-xs">
          {enrichedData.map((item) => (
            <div
              key={item.name}
              className="flex items-center justify-between py-1 border-b border-slate-50 last:border-none"
            >
              <div className="flex items-center gap-2">
                <span
                  className="w-2.5 h-2.5 rounded-full shrink-0"
                  style={{ backgroundColor: item.color }}
                />
                <span className="text-slate-600 font-medium">{item.name}</span>
              </div>
              <div className="flex items-center gap-2.5 font-mono">
                <span className="text-slate-400 text-[11px]">{item.percentage}%</span>
                <span className="text-slate-800 font-bold text-[11px] min-w-[50px] text-right">
                  {formatINR(item.estimatedValue, true)}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </Card>
  );
}
