'use client';

import React, { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import { RecommendationReportResponse } from '../../../lib/types';
import { getRecommendationReport } from '../../../lib/api';
import { formatINR, formatKg } from '../../../lib/formatters';
import {
  QrCode,
  ShieldCheck,
  CheckCircle2,
  Cpu,
  Leaf,
  Clock,
  Printer,
  ArrowLeft,
  Sparkles,
  Award,
  RefreshCw,
  Info,
} from 'lucide-react';

export default function PassportPage() {
  const params = useParams();
  const returnId = (params?.id as string) || 'REL-DEMO-001';

  const [report, setReport] = useState<RecommendationReportResponse | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!returnId) return;
    setIsLoading(true);
    getRecommendationReport(returnId)
      .then((data) => {
        setReport(data);
      })
      .catch((err) => {
        console.error('Error fetching passport report:', err);
        setError('Recovery Passport not found for this product identifier.');
      })
      .finally(() => setIsLoading(false));
  }, [returnId]);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-[#08080D] text-white flex flex-col items-center justify-center p-6 space-y-4 font-sans">
        <RefreshCw className="w-10 h-10 animate-spin text-[#FFC21A]" />
        <p className="text-sm font-semibold">Decrypting Digital Product Recovery Passport...</p>
      </div>
    );
  }

  if (error || !report) {
    return (
      <div className="min-h-screen bg-[#08080D] text-white flex flex-col items-center justify-center p-6 space-y-4 font-sans text-center">
        <ShieldCheck className="w-12 h-12 text-red-400" />
        <h2 className="text-lg font-bold text-red-300">Passport Unverified</h2>
        <p className="text-xs text-slate-400 max-w-sm">{error}</p>
        <a
          href="/"
          className="px-4 py-2 rounded-xl bg-[#1E202E] text-xs font-semibold text-[#FFC21A] border border-[#FFC21A]/30"
        >
          Return to Platform
        </a>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#08080D] text-slate-200 font-sans p-4 sm:p-8">
      <div className="max-w-4xl mx-auto space-y-6">
        {/* Top Header */}
        <div className="flex items-center justify-between pb-4 border-b border-[#252836]">
          <a
            href="/"
            className="flex items-center gap-2 text-xs font-bold text-[#FFC21A] hover:underline"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to ReLife AI Platform</span>
          </a>

          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
            <span className="text-xs font-mono font-bold text-emerald-400 uppercase tracking-wider">
              Cryptographically Verified Passport
            </span>
          </div>
        </div>

        {/* Passport Certificate Card */}
        <div className="bg-[#12131A] border-2 border-[#FFC21A] rounded-3xl p-6 sm:p-8 shadow-2xl relative overflow-hidden">
          {/* Watermark Logo */}
          <div className="absolute right-[-20px] bottom-[-20px] text-white/5 pointer-events-none font-bold text-9xl font-mono select-none">
            RELIFE
          </div>

          <div className="space-y-6 relative z-10">
            {/* Certificate Header */}
            <div className="flex flex-wrap items-start justify-between gap-4 pb-6 border-b border-[#1E202E]">
              <div>
                <span className="text-[11px] font-mono text-[#FFC21A] font-bold tracking-widest uppercase">
                  Open Circular Product Passport (DPP)
                </span>
                <h1 className="text-2xl sm:text-3xl font-extrabold text-white mt-1">
                  {report.product_name}
                </h1>
                <p className="text-xs text-slate-400 mt-1">
                  Official reverse logistics and circular disposition certification.
                </p>
              </div>

              <div className="p-3 bg-white rounded-2xl shadow-lg shrink-0">
                {report.qr_code_data_url ? (
                  <img
                    src={report.qr_code_data_url}
                    alt="Passport QR"
                    className="w-24 h-24"
                  />
                ) : (
                  <QrCode className="w-24 h-24 text-slate-900" />
                )}
              </div>
            </div>

            {/* Spec Matrix */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-xs">
              <div className="p-3 bg-[#08080D] rounded-xl border border-[#252836]">
                <span className="text-[10px] text-slate-400 block">Product ID:</span>
                <span className="font-mono font-bold text-white text-xs mt-0.5 block truncate">
                  {report.return_id}
                </span>
              </div>

              <div className="p-3 bg-[#08080D] rounded-xl border border-[#252836]">
                <span className="text-[10px] text-slate-400 block">Category:</span>
                <span className="font-bold text-white text-xs mt-0.5 block">
                  {report.category}
                </span>
              </div>

              <div className="p-3 bg-[#08080D] rounded-xl border border-[#252836]">
                <span className="text-[10px] text-slate-400 block">Original MSRP:</span>
                <span className="font-mono font-bold text-[#FFC21A] text-xs mt-0.5 block">
                  {formatINR(report.purchase_price)}
                </span>
              </div>

              <div className="p-3 bg-[#08080D] rounded-xl border border-[#252836]">
                <span className="text-[10px] text-slate-400 block">Device Age:</span>
                <span className="font-bold text-white text-xs mt-0.5 block">
                  {report.age_months} Months
                </span>
              </div>
            </div>

            {/* Circular Disposition Winner */}
            <div className="p-5 rounded-2xl bg-gradient-to-r from-[#181926] via-[#1E202E] to-[#181926] border border-[#FFC21A]/50 space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-[#FFC21A] uppercase tracking-wider flex items-center gap-1.5">
                  <Award className="w-4 h-4" />
                  Validated Disposition Pathway:
                </span>
                <span className="text-xs font-mono font-bold text-emerald-400">
                  {report.winner.weighted_score.toFixed(1)} / 100 Score
                </span>
              </div>

              <div className="text-xl font-extrabold text-white">
                {report.winner.pathway}
              </div>

              <p className="text-xs text-slate-300 leading-relaxed">
                {report.winner_rationale}
              </p>
            </div>

            {/* Environmental Impact Metrics */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="p-4 rounded-xl bg-[#08080D] border border-emerald-500/30 flex items-center gap-3">
                <Leaf className="w-8 h-8 text-emerald-400 shrink-0" />
                <div>
                  <span className="text-[10px] text-slate-400 block">Waste Diverted</span>
                  <span className="text-lg font-mono font-bold text-emerald-400">
                    {formatKg(report.environmental_impact.waste_diverted_kg)}
                  </span>
                </div>
              </div>

              <div className="p-4 rounded-xl bg-[#08080D] border border-emerald-500/30 flex items-center gap-3">
                <Sparkles className="w-8 h-8 text-emerald-400 shrink-0" />
                <div>
                  <span className="text-[10px] text-slate-400 block">CO₂e Avoided</span>
                  <span className="text-lg font-mono font-bold text-emerald-400">
                    {report.environmental_impact.co2e_avoided_kg} kg
                  </span>
                </div>
              </div>

              <div className="p-4 rounded-xl bg-[#08080D] border border-cyan-500/30 flex items-center gap-3">
                <Clock className="w-8 h-8 text-cyan-400 shrink-0" />
                <div>
                  <span className="text-[10px] text-slate-400 block">Lifecycle Extension</span>
                  <span className="text-lg font-mono font-bold text-cyan-400">
                    +{report.environmental_impact.lifetime_extension_months} Months
                  </span>
                </div>
              </div>
            </div>

            {/* Confidence Stamp */}
            <div className="pt-4 border-t border-[#1E202E] flex flex-wrap items-center justify-between gap-3 text-xs text-slate-400 font-mono">
              <div>
                <span>Timestamp: </span>
                <span className="text-slate-200">{report.generated_at} UTC</span>
              </div>
              <div className="flex items-center gap-2">
                <span>Model Confidence: </span>
                <span className="text-[#FFC21A] font-bold">
                  {report.confidence_breakdown.overall_recommendation_confidence}%
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Print Button */}
        <div className="text-center">
          <button
            type="button"
            onClick={() => window.print()}
            className="px-6 py-3 rounded-xl bg-[#1E202E] hover:bg-[#252836] text-[#FFC21A] border border-[#FFC21A]/30 text-xs font-bold transition-all inline-flex items-center gap-2 cursor-pointer"
          >
            <Printer className="w-4 h-4" />
            <span>Print Official Recovery Passport</span>
          </button>
        </div>
      </div>
    </div>
  );
}
