'use client';

import React from 'react';
import { RecentReturnItem } from '../../lib/types';
import { PathwayBadge, StatusChip } from '../ui/Badge';
import { formatINR } from '../../lib/formatters';
import {
  X,
  Sparkles,
  ShieldCheck,
  Cpu,
  Layers,
  ArrowRight,
  CheckCircle,
  Clock,
  Printer,
} from 'lucide-react';

interface ReturnDetailModalProps {
  item: RecentReturnItem | null;
  onClose: () => void;
}

export function ReturnDetailModal({ item, onClose }: ReturnDetailModalProps) {
  if (!item) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-white border border-slate-200 rounded-3xl w-full max-w-lg shadow-2xl overflow-hidden flex flex-col">
        {/* Modal Top Bar */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100 bg-slate-50/70">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-emerald-100 text-[#073E2E] flex items-center justify-center font-bold text-xs">
              ID
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-sm font-bold text-slate-900 font-mono">
                  {item.id}
                </h3>
                <StatusChip status={item.status} />
              </div>
              <p className="text-[11px] text-slate-400 font-sans">
                Received on {item.received_date} • SKU: {item.product_id}
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-full text-slate-400 hover:text-slate-700 hover:bg-slate-200/50 transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Content Body */}
        <div className="p-6 space-y-4 text-xs font-sans">
          {/* Product Header Card */}
          <div className="p-4 rounded-2xl bg-gradient-to-r from-emerald-50 via-teal-50/50 to-slate-50 border border-emerald-100 flex items-center justify-between">
            <div>
              <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-800">
                {item.category}
              </span>
              <h4 className="text-base font-bold text-slate-900 mt-0.5">
                {item.brand_model}
              </h4>
            </div>
            <div className="text-right">
              <span className="text-[10px] text-slate-400 block">AI Triage Pathway</span>
              <div className="mt-1">
                <PathwayBadge pathway={item.recommended_pathway} />
              </div>
            </div>
          </div>

          {/* Diagnostic & Defect Findings */}
          <div className="space-y-2">
            <h5 className="font-bold text-slate-800 flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-[#073E2E]" />
              Inspection Defect Profile
            </h5>
            <div className="p-3.5 bg-slate-50 rounded-2xl border border-slate-100 space-y-2">
              <div className="flex justify-between items-center">
                <span className="text-slate-500">Failure Signature:</span>
                <span className="font-semibold text-slate-800">{item.defect_summary}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-slate-500">Computer Vision Confidence:</span>
                <span className="font-bold text-emerald-700 font-mono">{item.confidence}%</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-slate-500">Inspection Standard:</span>
                <span className="font-mono text-slate-700">R2v3 Certified Protocol</span>
              </div>
            </div>
          </div>

          {/* Decision Engine Recommendation */}
          <div className="space-y-2">
            <h5 className="font-bold text-slate-800 flex items-center gap-1.5">
              <Sparkles className="w-4 h-4 text-[#073E2E]" />
              Circular Decision Reasoning
            </h5>
            <p className="p-3.5 bg-emerald-50/60 rounded-2xl border border-emerald-100/70 text-slate-700 leading-relaxed text-xs">
              Automated multi-factor evaluation calculated maximum net recovery margin by routing through{' '}
              <strong className="text-[#073E2E]">{item.recommended_pathway}</strong>. This pathway preserves component integrity and avoids unnecessary down-cycling while maintaining regulatory compliance.
            </p>
          </div>

          {/* Action Row */}
          <div className="pt-2 flex items-center justify-between border-t border-slate-100">
            <button
              onClick={() => alert(`Manifest label printed for ${item.id}`)}
              className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl border border-slate-200 text-slate-600 hover:bg-slate-50 font-semibold transition-colors"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>Print Barcode Label</span>
            </button>

            <button
              onClick={onClose}
              className="px-5 py-2 rounded-xl bg-[#073E2E] hover:bg-[#053023] text-white font-semibold transition-all shadow-sm"
            >
              Done
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

