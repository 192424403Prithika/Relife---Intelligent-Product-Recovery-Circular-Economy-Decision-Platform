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
import { useNavigation, NavigationTab } from '../../context/NavigationContext';

interface NavItem {
  id: NavigationTab;
  name: string;
  icon: React.ElementType;
  badge?: string;
  description: string;
}

const NAV_ITEMS: NavItem[] = [
  {
    id: 'dashboard',
    name: 'Dashboard',
    icon: LayoutDashboard,
    description: 'Executive circular recovery overview',
  },
  {
    id: 'register',
    name: 'Register Product',
    icon: PlusCircle,
    badge: 'Intake',
    description: 'Universal SKU, serial & barcode intake gateway',
  },
  {
    id: 'inspections',
    name: 'Inspections',
    icon: ScanEye,
    badge: 'CV Vision',
    description: 'Computer vision defect diagnosis workbench',
  },
  {
    id: 'recommendations',
    name: 'Recommendations',
    icon: Sparkles,
    badge: 'AI Engine',
    description: 'Autonomous circular pathway routing matrix',
  },
  {
    id: 'marketplace',
    name: 'Marketplace',
    icon: ShoppingBag,
    badge: 'B2B',
    description: 'Certified refurbished & component exchange',
  },
  {
    id: 'outcomes',
    name: 'Outcomes',
    icon: CheckCircle2,
    badge: 'Ledger',
    description: 'Closed-loop recovery ledger & audit realization',
  },
  {
    id: 'reports',
    name: 'Reports',
    icon: FileBarChart2,
    badge: 'ESG',
    description: 'Circularity & carbon footprint metrics',
  },
  {
    id: 'settings',
    name: 'Settings',
    icon: Settings,
    badge: 'Hub',
    description: 'Hub configuration & AI sensitivity thresholds',
  },
];

export function Sidebar() {
  const { activeTab, setActiveTab } = useNavigation();

  return (
    <aside className="w-64 bg-white border-r border-slate-200/80 flex flex-col justify-between shrink-0 h-screen sticky top-0 select-none z-30">
      <div className="flex flex-col h-full justify-between p-5 overflow-y-auto">
        <div>
          {/* Top Brand Logo */}
          <div
            onClick={() => setActiveTab('dashboard')}
            className="flex items-center gap-2.5 mb-8 px-2 pt-1 cursor-pointer group"
          >
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-[#073E2E] to-[#10B981] flex items-center justify-center text-white shadow-sm shadow-emerald-900/20 group-hover:scale-105 transition-transform">
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
              const isActive = activeTab === item.id;

              return (
                <button
                  key={item.id}
                  onClick={() => setActiveTab(item.id)}
                  className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl transition-all text-left ${
                    isActive
                      ? 'bg-[#073E2E] text-white shadow-sm font-semibold'
                      : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50 font-medium'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <Icon
                      className={`w-4 h-4 ${
                        isActive ? 'text-emerald-400' : 'text-slate-400'
                      }`}
                    />
                    <span className="text-sm tracking-tight">{item.name}</span>
                  </div>

                  {item.badge && (
                    <span
                      className={`text-[9px] font-semibold uppercase tracking-wider px-1.5 py-0.5 rounded ${
                        isActive
                          ? 'text-emerald-200 bg-emerald-900/60'
                          : 'text-slate-400 bg-slate-100'
                      }`}
                    >
                      {item.badge}
                    </span>
                  )}
                </button>
              );
            })}
          </nav>
        </div>

        {/* Bottom Finora-style Promo Card */}
        <div className="mt-6 pt-2">
          <div className="p-4 rounded-2xl bg-gradient-to-br from-emerald-50 via-teal-50/60 to-emerald-100/40 border border-emerald-200/50 relative overflow-hidden group">
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
              onClick={() => setActiveTab('outcomes')}
              className="mt-3 w-full flex items-center justify-center gap-1.5 py-2 px-3 rounded-xl bg-[#073E2E] hover:bg-[#053023] text-white text-[11px] font-semibold shadow-sm transition-all"
            >
              <span>View Eco Ledger</span>
              <ArrowRight className="w-3 h-3" />
            </button>
          </div>
        </div>
      </div>
    </aside>
  );
}
