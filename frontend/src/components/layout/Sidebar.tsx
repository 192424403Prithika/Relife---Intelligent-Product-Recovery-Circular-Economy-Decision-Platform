'use client';

import React from 'react';
import {
  LayoutDashboard,
  PlusCircle,
  ScanEye,
  Sparkles,
  ShoppingBag,
  CheckCircle2,
  FileBarChart2,
  Settings,
  Leaf,
  ArrowRight,
  Sprout,
} from 'lucide-react';
import { Tooltip } from '../ui/Tooltip';

interface NavItem {
  name: string;
  icon: React.ElementType;
  active?: boolean;
  comingSoon?: boolean;
  phase?: string;
  description?: string;
}

const NAV_ITEMS: NavItem[] = [
  { name: 'Dashboard', icon: LayoutDashboard, active: true },
  {
    name: 'Register Product',
    icon: PlusCircle,
    comingSoon: true,
    phase: 'Phase 2',
    description: 'Universal SKU, serial & barcode intake gateway',
  },
  {
    name: 'Inspections',
    icon: ScanEye,
    comingSoon: true,
    phase: 'Phase 3',
    description: 'Computer vision defect diagnosis',
  },
  {
    name: 'Recommendations',
    icon: Sparkles,
    comingSoon: true,
    phase: 'Phase 4',
    description: 'Autonomous circular decision engine',
  },
  {
    name: 'Marketplace',
    icon: ShoppingBag,
    comingSoon: true,
    phase: 'Phase 5',
    description: 'B2B certified refurbished exchange',
  },
  {
    name: 'Outcomes',
    icon: CheckCircle2,
    comingSoon: true,
    phase: 'Phase 5',
    description: 'Closed-loop recovery ledger & audit',
  },
  {
    name: 'Reports',
    icon: FileBarChart2,
    comingSoon: true,
    phase: 'Future',
    description: 'ESG & compliance audit reports',
  },
  {
    name: 'Settings',
    icon: Settings,
    comingSoon: true,
    phase: 'Future',
    description: 'Hub configuration & AI thresholds',
  },
];

export function Sidebar() {
  return (
    <aside className="w-64 bg-white border-r border-slate-200/80 flex flex-col justify-between shrink-0 h-screen sticky top-0 select-none z-30">
      <div className="flex flex-col h-full justify-between p-5 overflow-y-auto">
        <div>
          {/* Top Brand Logo */}
          <div className="flex items-center gap-2.5 mb-8 px-2 pt-1">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-[#073E2E] to-[#10B981] flex items-center justify-center text-white shadow-sm shadow-emerald-900/20">
              <Leaf className="w-5 h-5 fill-current" />
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="font-sans text-xl font-bold tracking-tight text-slate-900">
                  ReLife
                </span>
                <span className="text-[10px] font-bold px-1.5 py-0.2 rounded-md bg-emerald-100 text-[#073E2E] font-mono">
                  AI
                </span>
              </div>
              <p className="text-[10px] text-slate-400 font-medium tracking-tight">
                Smart. Circular. Better Tomorrow.
              </p>
            </div>
          </div>

          {/* Navigation Links */}
          <nav className="space-y-1.5" aria-label="Main Navigation">
            {NAV_ITEMS.map((item) => {
              const Icon = item.icon;
              if (item.active) {
                return (
                  <div
                    key={item.name}
                    aria-current="page"
                    className="flex items-center justify-between px-3.5 py-2.5 rounded-xl bg-[#073E2E] text-white font-medium shadow-sm transition-all"
                  >
                    <div className="flex items-center gap-3">
                      <Icon className="w-4 h-4 text-emerald-400" />
                      <span className="text-sm tracking-tight">{item.name}</span>
                    </div>
                  </div>
                );
              }

              return (
                <Tooltip
                  key={item.name}
                  content={`${item.name} — ${item.description} (${item.phase})`}
                  position="right"
                >
                  <button
                    disabled
                    aria-disabled="true"
                    className="w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-slate-500 hover:text-slate-800 hover:bg-slate-50 cursor-not-allowed transition-all text-left group"
                  >
                    <div className="flex items-center gap-3">
                      <Icon className="w-4 h-4 text-slate-400 group-hover:text-slate-600" />
                      <span className="text-sm tracking-tight font-medium">{item.name}</span>
                    </div>
                    <span className="text-[9px] font-semibold uppercase tracking-wider text-slate-400 bg-slate-100 px-1.5 py-0.5 rounded">
                      {item.phase === 'Future' ? 'Soon' : item.phase}
                    </span>
                  </button>
                </Tooltip>
              );
            })}
          </nav>
        </div>

        {/* Bottom Finora-style Promo Card */}
        <div className="mt-6 pt-2">
          <div className="p-4 rounded-2xl bg-gradient-to-br from-emerald-50 via-teal-50/60 to-emerald-100/40 border border-emerald-200/50 relative overflow-hidden group">
            {/* Soft decorative leaf shape */}
            <div className="w-10 h-10 rounded-xl bg-emerald-200/60 flex items-center justify-center text-emerald-800 mb-2.5">
              <Sprout className="w-5 h-5 text-[#073E2E]" />
            </div>

            <h4 className="text-xs font-bold text-slate-900 font-sans leading-snug">
              Small steps <br /> divert big waste
            </h4>
            <p className="text-[10px] text-slate-500 mt-1 font-medium">
              Track. Salvage. Restore.
            </p>

            <button
              type="button"
              className="mt-3 w-full flex items-center justify-center gap-1.5 py-2 px-3 rounded-xl bg-[#073E2E] hover:bg-[#053023] text-white text-[11px] font-semibold shadow-sm transition-all"
            >
              <span>View Eco Goals</span>
              <ArrowRight className="w-3 h-3" />
            </button>
          </div>
        </div>
      </div>
    </aside>
  );
}
