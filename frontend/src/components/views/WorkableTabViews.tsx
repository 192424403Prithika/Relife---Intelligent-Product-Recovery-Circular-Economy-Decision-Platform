'use client';

import React, { useState } from 'react';
import { useNavigation } from '../../context/NavigationContext';
import { Card } from '../ui/Card';
import { formatINR, formatKg } from '../../lib/formatters';
import { RecoveryWizard } from '../wizard/RecoveryWizard';
import { MarketplaceWorkbench } from '../marketplace/MarketplaceWorkbench';
import { OutcomeTrackingWorkbench } from '../outcomes/OutcomeTrackingWorkbench';
import {
  ScanEye,
  Sparkles,
  ShoppingBag,
  CheckCircle2,
  FileBarChart2,
  Settings,
  PlusCircle,
  ArrowLeft,
  CheckCircle,
  ShieldCheck,
  Download,
  Sliders,
  Camera,
  RefreshCw,
  Box,
  Truck,
  Layers,
  Award,
  Cpu,
  TrendingUp,
  Tag,
  Clock,
  Printer,
  QrCode,
} from 'lucide-react';

interface WorkableTabViewsProps {
  onOpenIntake: () => void;
}

export function WorkableTabViews({ onOpenIntake }: WorkableTabViewsProps) {
  const { activeTab, setActiveTab } = useNavigation();

  if (activeTab === 'dashboard') return null;

  return (
    <div className="space-y-6 animate-in fade-in duration-150">
      {/* Top Banner Navigation */}
      <div className="flex items-center justify-between pb-3 border-b border-[#252836]">
        <button
          onClick={() => setActiveTab('dashboard')}
          className="flex items-center gap-2 text-xs font-bold text-[#FFC21A] hover:underline"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Executive Dashboard</span>
        </button>

        <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider font-mono">
          ReLife AI Module • {activeTab.toUpperCase()}
        </span>
      </div>

      {/* CORE 7-STEP RECOVERY WIZARD (Intake, Vision, Tests, Cost, Decision, Review, Report) */}
      {activeTab === 'register' && (
        <RecoveryWizard />
      )}

      {/* INSPECTIONS WORKBENCH */}
      {activeTab === 'inspections' && (
        <div className="space-y-6">
          <Card title="Computer Vision Optical Inspection Workbench">
            <div className="space-y-4">
              <div className="p-4 rounded-xl bg-[#08080D] border border-amber-500/30 text-xs flex items-center justify-between">
                <span className="text-amber-300">
                  <strong>OpenCV Preprocessing Engine:</strong> Bilateral edge-preserving denoising + Laplacian blur variance grading (threshold: 100.0).
                </span>
                <span className="text-[10px] font-mono text-[#FFC21A] px-2 py-0.5 rounded bg-[#1E202E] border border-[#FFC21A]/30">
                  Demo Mode Active
                </span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="p-4 rounded-2xl bg-[#08080D] border border-[#252836] space-y-2">
                  <div className="text-xs font-bold text-white flex items-center gap-2">
                    <Camera className="w-4 h-4 text-[#FFC21A]" />
                    <span>Laplacian Blur Check</span>
                  </div>
                  <p className="text-[11px] text-slate-400">
                    Calculates variance of the second derivative of pixel intensity. Flags handheld motion blur.
                  </p>
                  <span className="text-xs font-mono font-bold text-emerald-400 block pt-1">
                    Threshold: &lt; 100 Variance = Blurry
                  </span>
                </div>

                <div className="p-4 rounded-2xl bg-[#08080D] border border-[#252836] space-y-2">
                  <div className="text-xs font-bold text-white flex items-center gap-2">
                    <ScanEye className="w-4 h-4 text-[#22D3EE]" />
                    <span>Defect Classes Detected</span>
                  </div>
                  <p className="text-[11px] text-slate-400">
                    Cracks, Dents, Scratches, and Missing Parts classified with bounding boxes and severity metrics.
                  </p>
                  <span className="text-xs font-mono font-bold text-[#22D3EE] block pt-1">
                    4 Core Anomaly Categories
                  </span>
                </div>

                <div className="p-4 rounded-2xl bg-[#08080D] border border-[#252836] space-y-2">
                  <div className="text-xs font-bold text-white flex items-center gap-2">
                    <ShieldCheck className="w-4 h-4 text-emerald-400" />
                    <span>Safety Constraint Routing</span>
                  </div>
                  <p className="text-[11px] text-slate-400">
                    Defects exceeding structural thresholds immediately trigger Human Technician review.
                  </p>
                  <span className="text-xs font-mono font-bold text-emerald-400 block pt-1">
                    Absolute Hard Overrides
                  </span>
                </div>
              </div>

              <div className="pt-2 text-center">
                <button
                  type="button"
                  onClick={() => setActiveTab('register')}
                  className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-[#FFC21A] to-[#F57C00] text-slate-950 font-bold text-xs shadow-lg hover:brightness-110 active:scale-[0.99] transition-all cursor-pointer"
                >
                  Launch Step-by-Step Vision Diagnostic Wizard
                </button>
              </div>
            </div>
          </Card>
        </div>
      )}

      {/* RECOMMENDATIONS MATRIX */}
      {activeTab === 'recommendations' && (
        <div className="space-y-6">
          <Card title="Five-Pathway Decision Engine Matrix">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead>
                  <tr className="border-b border-[#252836] text-slate-400 uppercase text-[10px] font-mono">
                    <th className="py-3 px-3">Circular Pathway</th>
                    <th className="py-3 px-3">Qualification Rules</th>
                    <th className="py-3 px-3">Recovery Yield Target</th>
                    <th className="py-3 px-3">Avg Realization</th>
                    <th className="py-3 px-3 text-right">E-Waste Preserved</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#1E202E]">
                  <tr>
                    <td className="py-3.5 px-3 font-bold text-[#FFC21A]">1. Direct Resale</td>
                    <td className="py-3.5 px-3 text-slate-300">Grade A casing; 100% pass on all visual & electrical tests</td>
                    <td className="py-3.5 px-3 font-mono text-emerald-400">75% - 85% MSRP</td>
                    <td className="py-3.5 px-3 font-bold text-white">1 Business Day</td>
                    <td className="py-3.5 px-3 text-right font-mono text-emerald-400">98% saved</td>
                  </tr>
                  <tr>
                    <td className="py-3.5 px-3 font-bold text-[#22D3EE]">2. Repair</td>
                    <td className="py-3.5 px-3 text-slate-300">Isolated modular failure (cracked screen, battery replacement)</td>
                    <td className="py-3.5 px-3 font-mono text-emerald-400">55% - 65% MSRP</td>
                    <td className="py-3.5 px-3 font-bold text-white">2 - 3 Days</td>
                    <td className="py-3.5 px-3 text-right font-mono text-emerald-400">94% saved</td>
                  </tr>
                  <tr>
                    <td className="py-3.5 px-3 font-bold text-[#F57C00]">3. Refurbishment</td>
                    <td className="py-3.5 px-3 text-slate-300">Multi-surface scuffs, cosmetic re-casing & battery renew</td>
                    <td className="py-3.5 px-3 font-mono text-emerald-400">40% - 50% MSRP</td>
                    <td className="py-3.5 px-3 font-bold text-white">4 - 5 Days</td>
                    <td className="py-3.5 px-3 text-right font-mono text-emerald-400">90% saved</td>
                  </tr>
                  <tr>
                    <td className="py-3.5 px-3 font-bold text-purple-400">4. Harvesting</td>
                    <td className="py-3.5 px-3 text-slate-300">Repair uneconomic; harvest working display, RAM, SSD</td>
                    <td className="py-3.5 px-3 font-mono text-emerald-400">25% - 35% MSRP</td>
                    <td className="py-3.5 px-3 font-bold text-white">3 Days</td>
                    <td className="py-3.5 px-3 text-right font-mono text-emerald-400">75% saved</td>
                  </tr>
                  <tr>
                    <td className="py-3.5 px-3 font-bold text-emerald-400">5. Recycling</td>
                    <td className="py-3.5 px-3 text-slate-300">End-of-life unrecoverable faults; zero-landfill smelting</td>
                    <td className="py-3.5 px-3 font-mono text-emerald-400">8% - 14% MSRP</td>
                    <td className="py-3.5 px-3 font-bold text-white">5 Days</td>
                    <td className="py-3.5 px-3 text-right font-mono text-emerald-400">85% smelted</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div className="pt-4 mt-2 border-t border-[#1E202E] flex justify-end">
              <button
                type="button"
                onClick={() => setActiveTab('register')}
                className="px-4 py-2 rounded-xl bg-[#1E202E] hover:bg-[#252836] text-[#FFC21A] text-xs font-bold border border-[#FFC21A]/30 transition-all"
              >
                Evaluate Product with Live Sliders →
              </button>
            </div>
          </Card>
        </div>
      )}

      {/* COMPONENT MARKETPLACE (Step 8) */}
      {activeTab === 'marketplace' && (
        <MarketplaceWorkbench />
      )}

      {/* OUTCOMES & CLOSED-LOOP REALIZATION (Step 9) */}
      {activeTab === 'outcomes' && (
        <OutcomeTrackingWorkbench />
      )}

      {/* REPORTS & PASSPORTS (Step 7 & DPP) */}
      {activeTab === 'reports' && (
        <div className="space-y-6">
          <Card title="Digital Product Recovery Passports & ESG Ledger">
            <div className="space-y-4 text-xs">
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="p-4 rounded-2xl bg-[#08080D] border border-emerald-500/30">
                  <span className="text-[10px] font-bold text-emerald-400 uppercase font-mono">GHG Emissions Avoided</span>
                  <p className="text-2xl font-bold font-mono text-white mt-1">1,480 kg CO₂e</p>
                  <p className="text-[10px] text-slate-400 mt-1">Primary manufacturing displacement</p>
                </div>
                <div className="p-4 rounded-2xl bg-[#08080D] border border-cyan-500/30">
                  <span className="text-[10px] font-bold text-cyan-400 uppercase font-mono">Precious Metals Salvaged</span>
                  <p className="text-2xl font-bold font-mono text-white mt-1">4.2 kg</p>
                  <p className="text-[10px] text-slate-400 mt-1">Gold, copper & rare earths preserved</p>
                </div>
                <div className="p-4 rounded-2xl bg-[#08080D] border border-amber-500/30">
                  <span className="text-[10px] font-bold text-[#FFC21A] uppercase font-mono">Lithium Battery Cells Protected</span>
                  <p className="text-2xl font-bold font-mono text-white mt-1">18.6 Ah</p>
                  <p className="text-[10px] text-slate-400 mt-1">Zero thermal runaway incidents</p>
                </div>
              </div>

              <div className="pt-2 flex justify-between items-center">
                <a
                  href="/passport/REL-DEMO-001"
                  target="_blank"
                  className="text-xs font-semibold text-[#FFC21A] hover:underline"
                >
                  View Sample Digital Product Passport (REL-DEMO-001) ↗
                </a>

                <button
                  type="button"
                  onClick={() => window.print()}
                  className="px-4 py-2 rounded-xl bg-gradient-to-r from-[#FFC21A] to-[#F57C00] text-slate-950 font-bold text-xs shadow-md transition-all flex items-center gap-1.5"
                >
                  <Printer className="w-3.5 h-3.5" />
                  <span>Print Circular Audit Report</span>
                </button>
              </div>
            </div>
          </Card>
        </div>
      )}

      {/* SETTINGS */}
      {activeTab === 'settings' && (
        <div className="space-y-6">
          <Card title="Algorithm Parameters & Safety Sensitivity Thresholds">
            <div className="space-y-4 text-xs max-w-xl">
              <div>
                <label className="block text-white font-bold mb-1">
                  Automated Triage Escalation Threshold (%)
                </label>
                <input
                  type="range"
                  min="50"
                  max="95"
                  defaultValue="70"
                  className="w-full accent-[#FFC21A]"
                />
                <span className="text-[11px] text-slate-400 mt-0.5 block">
                  Predictions under 70% confidence automatically route to the human technician queue.
                </span>
              </div>

              <div className="space-y-2 pt-2 border-t border-[#1E202E]">
                <label className="flex items-center gap-2 cursor-pointer text-slate-300">
                  <input type="checkbox" defaultChecked className="accent-[#FFC21A]" />
                  <span>Enforce battery degradation safety constraint (block resale if health &lt; 70%)</span>
                </label>
                <label className="flex items-center gap-2 cursor-pointer text-slate-300">
                  <input type="checkbox" defaultChecked className="accent-[#FFC21A]" />
                  <span>Disqualify Direct Resale automatically upon display glass fracture detection</span>
                </label>
              </div>

              <div className="pt-2">
                <button
                  type="button"
                  onClick={() => alert('Platform parameters saved successfully!')}
                  className="px-4 py-2 rounded-xl bg-[#1E202E] hover:bg-[#252836] text-[#FFC21A] border border-[#FFC21A]/30 font-bold text-xs"
                >
                  Save Platform Settings
                </button>
              </div>
            </div>
          </Card>
        </div>
      )}
    </div>
  );
}
