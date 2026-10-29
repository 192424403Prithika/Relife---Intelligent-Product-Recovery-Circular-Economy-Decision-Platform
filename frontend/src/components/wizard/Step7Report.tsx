'use client';

import React, { useState, useEffect } from 'react';
import { RecommendationReportResponse } from '../../lib/types';
import { getRecommendationReport } from '../../lib/api';
import { formatINR, formatKg } from '../../lib/formatters';
import {
  FileText,
  Printer,
  Download,
  Share2,
  CheckCircle2,
  Award,
  Sparkles,
  QrCode,
  ShieldCheck,
  TrendingUp,
  Leaf,
  Clock,
  RefreshCw,
  Info,
} from 'lucide-react';
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

interface Step7Props {
  returnId: string;
}

const PATHWAY_CHART_COLORS: Record<string, string> = {
  'Direct Resale': '#FFC21A',
  Repair: '#22D3EE',
  Refurbishment: '#F57C00',
  'Component Harvesting': '#A855F7',
  Recycling: '#10B981',
};

export function Step7Report({ returnId }: Step7Props) {
  const [report, setReport] = useState<RecommendationReportResponse | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!returnId) return;
    setIsLoading(true);
    getRecommendationReport(returnId)
      .then((res) => {
        setReport(res);
      })
      .catch((err) => {
        console.error('Failed to load report:', err);
        setError('Failed to generate recommendation report.');
      })
      .finally(() => setIsLoading(false));
  }, [returnId]);

  const handlePrintPdf = () => {
    window.print();
  };

  if (isLoading) {
    return (
      <div className="bg-[#12131A] border border-[#252836] rounded-2xl p-12 text-center text-slate-400 space-y-3">
        <RefreshCw className="w-8 h-8 animate-spin mx-auto text-[#FFC21A]" />
        <p className="text-sm font-semibold text-white">Synthesizing Explainable Recommendation Report...</p>
        <p className="text-xs text-slate-500">Compiling computer vision inferences, bench tests, and circular economics</p>
      </div>
    );
  }

  if (error || !report) {
    return (
      <div className="bg-[#12131A] border border-[#252836] rounded-2xl p-8 text-center text-red-400 space-y-2">
        <p className="text-sm font-semibold">{error || 'Report generation error.'}</p>
      </div>
    );
  }

  const chartData = report.ranked_pathways.map((p) => ({
    name: p.pathway,
    nrv: Math.max(0, p.net_recovery_value),
    revenue: p.expected_revenue,
    cost: p.expected_cost,
    color: PATHWAY_CHART_COLORS[p.pathway] || '#FFC21A',
    isSafetyOverride: p.is_safety_override,
  }));

  return (
    <div className="space-y-6 print:m-0 print:p-0">
      {/* Top Action Bar */}
      <div className="flex flex-wrap items-center justify-between gap-3 bg-[#12131A] border border-[#252836] p-4 rounded-2xl print:hidden">
        <div>
          <span className="text-[10px] font-mono text-[#FFC21A] uppercase tracking-wider font-bold">
            Certified Circular Disposition
          </span>
          <h3 className="text-base font-bold text-white flex items-center gap-2">
            <FileText className="w-5 h-5 text-[#FFC21A]" />
            <span>Product Recovery Recommendation Report</span>
          </h3>
        </div>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={handlePrintPdf}
            className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-gradient-to-r from-[#FFC21A] to-[#F57C00] text-slate-950 text-xs font-bold shadow-md hover:brightness-110 active:scale-[0.98] transition-all cursor-pointer"
          >
            <Download className="w-4 h-4" />
            <span>Download Report as PDF</span>
          </button>
        </div>
      </div>

      {/* Hero Winner Banner */}
      <div className="p-6 rounded-2xl bg-gradient-to-r from-[#1E202E] via-[#12131A] to-[#1E202E] border-2 border-[#FFC21A] shadow-2xl relative overflow-hidden">
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div className="space-y-2 max-w-2xl">
            <div className="flex items-center gap-2">
              <span className="px-2.5 py-1 rounded-lg bg-[#FFC21A] text-slate-950 font-mono font-bold text-xs uppercase tracking-wider">
                Rank #1 Recommendation
              </span>
              <span className="text-xs font-mono text-slate-400">
                Return ID: {report.return_id}
              </span>
            </div>

            <h2 className="text-2xl font-extrabold text-white">
              Recommended Pathway: <span className="text-[#FFC21A]">{report.winner.pathway}</span>
            </h2>

            <p className="text-xs text-slate-300 leading-relaxed">
              {report.winner_rationale}
            </p>
          </div>

          <div className="bg-[#08080D] p-4 rounded-xl border border-[#252836] text-right shrink-0">
            <span className="text-[10px] text-slate-400 uppercase tracking-wider font-mono block">
              Net Recovery Value
            </span>
            <span className="text-2xl font-mono font-extrabold text-[#FFC21A]">
              {formatINR(report.winner.net_recovery_value)}
            </span>
            <div className="text-[10px] text-slate-400 mt-1">
              Rev: {formatINR(report.winner.expected_revenue)} • Cost: {formatINR(report.winner.expected_cost)}
            </div>
          </div>
        </div>

        {/* 3 Separate Confidence Ratings */}
        <div className="mt-5 pt-4 border-t border-[#252836] grid grid-cols-1 md:grid-cols-3 gap-3 text-xs">
          <div className="p-3 rounded-xl bg-[#08080D]/80 border border-[#252836]">
            <span className="text-[10px] text-slate-400 block">Optical Defect Confidence:</span>
            <div className="flex items-baseline gap-2 mt-0.5">
              <span className="text-base font-bold font-mono text-[#FFC21A]">
                {report.confidence_breakdown.detection_confidence}%
              </span>
              <span className="text-[10px] text-slate-500">OpenCV Preprocessed</span>
            </div>
          </div>

          <div className="p-3 rounded-xl bg-[#08080D]/80 border border-[#252836]">
            <span className="text-[10px] text-slate-400 block">Hardware Condition Confidence:</span>
            <div className="flex items-baseline gap-2 mt-0.5">
              <span className="text-base font-bold font-mono text-cyan-400">
                {report.confidence_breakdown.condition_confidence}%
              </span>
              <span className="text-[10px] text-slate-500">Bench Diagnostics</span>
            </div>
          </div>

          <div className="p-3 rounded-xl bg-[#08080D]/80 border border-[#252836]">
            <span className="text-[10px] text-slate-400 block">Overall Recommendation Confidence:</span>
            <div className="flex items-baseline gap-2 mt-0.5">
              <span className="text-base font-bold font-mono text-emerald-400">
                {report.confidence_breakdown.overall_recommendation_confidence}%
              </span>
              <span className="text-[10px] text-slate-500">Multi-Criteria Score</span>
            </div>
          </div>
        </div>
      </div>

      {/* Comparison Chart & Passport QR */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Net Value Comparison Bar Chart (8 cols) */}
        <div className="lg:col-span-8 bg-[#12131A] border border-[#252836] rounded-2xl p-5 shadow-xl space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-[#1E202E]">
            <div>
              <h4 className="text-sm font-bold text-white flex items-center gap-2">
                <TrendingUp className="w-4 h-4 text-[#FFC21A]" />
                <span>Net Recovery Value by Pathway (₹ INR)</span>
              </h4>
              <p className="text-[11px] text-slate-400">
                Comparative yield analysis showing profit realization after operational overhead
              </p>
            </div>
            <span className="text-[10px] font-mono text-slate-400 bg-[#08080D] px-2 py-0.5 rounded border border-[#252836]">
              sample assumption
            </span>
          </div>

          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={chartData}
                layout="vertical"
                margin={{ top: 10, right: 30, left: 60, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" stroke="#252836" horizontal={false} />
                <XAxis
                  type="number"
                  stroke="#64748B"
                  fontSize={10}
                  tickFormatter={(v) => `₹${(v / 1000).toFixed(0)}k`}
                />
                <YAxis
                  dataKey="name"
                  type="category"
                  stroke="#94A3B8"
                  fontSize={11}
                  width={110}
                />
                <Tooltip
                  formatter={(val: any) => [`₹${Number(val).toLocaleString()}`, 'Net Value']}
                  contentStyle={{
                    backgroundColor: '#08080D',
                    borderColor: '#252836',
                    borderRadius: '8px',
                    color: '#FFFFFF',
                    fontSize: '11px',
                  }}
                />
                <Bar dataKey="nrv" radius={[0, 6, 6, 0]}>
                  {chartData.map((entry, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={entry.isSafetyOverride ? '#451A1A' : entry.color}
                    />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Digital Product Passport Badge (4 cols) */}
        <div className="lg:col-span-4 bg-[#12131A] border border-[#252836] rounded-2xl p-5 shadow-xl flex flex-col justify-between">
          <div className="space-y-3">
            <div className="flex items-center gap-2 pb-2 border-b border-[#1E202E]">
              <QrCode className="w-4 h-4 text-[#FFC21A]" />
              <h4 className="text-xs font-bold text-white uppercase tracking-wider font-mono">
                Recovery Passport
              </h4>
            </div>

            <div className="flex justify-center p-3 bg-white rounded-xl shadow-md">
              {report.qr_code_data_url ? (
                <img
                  src={report.qr_code_data_url}
                  alt="Recovery Passport QR"
                  className="w-32 h-32"
                />
              ) : (
                <div className="w-32 h-32 flex items-center justify-center text-xs text-slate-500">
                  QR Pending
                </div>
              )}
            </div>

            <div className="text-center">
              <span className="text-xs font-mono font-bold text-white block">
                {report.return_id}
              </span>
              <a
                href={`/passport/${report.return_id}`}
                target="_blank"
                rel="noreferrer"
                className="text-[11px] text-[#FFC21A] hover:underline block mt-1"
              >
                Open Public Passport Page ↗
              </a>
            </div>

            <div className="space-y-1.5 text-[11px] pt-2 border-t border-[#1E202E]">
              <div className="flex justify-between text-slate-400">
                <span>Waste Diverted:</span>
                <span className="font-mono text-emerald-400 font-semibold">
                  {formatKg(report.environmental_impact.waste_diverted_kg)}
                </span>
              </div>
              <div className="flex justify-between text-slate-400">
                <span>CO₂e Avoided:</span>
                <span className="font-mono text-emerald-400 font-semibold">
                  {report.environmental_impact.co2e_avoided_kg} kg
                </span>
              </div>
              <div className="flex justify-between text-slate-400">
                <span>Life Extension:</span>
                <span className="font-mono text-slate-200">
                  +{report.environmental_impact.lifetime_extension_months} months
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Fallback Rationale: Why Others Ranked Lower */}
      <div className="bg-[#12131A] border border-[#252836] rounded-2xl p-5 shadow-xl space-y-3">
        <h4 className="text-xs font-bold text-white uppercase tracking-wider font-mono flex items-center gap-2">
          <Info className="w-4 h-4 text-[#FFC21A]" />
          <span>Why Other Pathways Ranked Lower</span>
        </h4>
        <div className="p-4 rounded-xl bg-[#08080D] border border-[#252836] text-xs font-mono text-slate-300 whitespace-pre-line leading-relaxed">
          {report.fallback_rationale}
        </div>
      </div>
    </div>
  );
}
