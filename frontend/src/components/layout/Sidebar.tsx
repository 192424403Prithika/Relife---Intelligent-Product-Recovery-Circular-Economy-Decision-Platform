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
  ShieldCheck,
  Cpu,
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
    name: 'Recovery Wizard',
    icon: PlusCircle,
    badge: 'Core 7-Step',
    description: '7-step intake, CV vision & decision engine',
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
    name: 'Reports & Passports',
    icon: FileBarChart2,
    badge: 'DPP',
    description: 'Digital Product Passports & ESG audit reports',
  },
  {
    id: 'settings',
    name: 'Settings',
    icon: Settings,
    badge: 'Config',
    description: 'Algorithm weights & sensitivity thresholds',
  },
];

export function Sidebar() {
  const { activeTab, setActiveTab } = useNavigation();

  return (
    <aside className="w-64 bg-[#0D0E15] border-r border-[#252836] flex flex-col justify-between shrink-0 h-screen sticky top-0 select-none z-30 font-sans">
      <div className="flex flex-col h-full justify-between p-4 overflow-y-auto">
        <div>
          {/* Top Brand Logo */}
          <div
            onClick={() => setActiveTab('dashboard')}
            className="flex items-center gap-3 mb-6 px-2 pt-1 cursor-pointer group"
          >
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-[#FFC21A] to-[#F57C00] flex items-center justify-center text-slate-950 shadow-md shadow-amber-900/30 group-hover:scale-105 transition-transform font-black">
              <Leaf className="w-5 h-5 fill-current" />
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="text-lg font-extrabold tracking-tight text-white">
                  ReLife
                </span>
                <span className="text-[10px] font-bold px-1.5 py-0.2 rounded bg-[#FFC21A] text-slate-950 font-mono">
                  AI
                </span>
              </div>
              <p className="text-[10px] text-slate-400 font-medium">
                Product Recovery & Circular AI
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
                  className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl transition-all text-left ${
                    isActive
                      ? 'bg-gradient-to-r from-[#FFC21A] to-[#F57C00] text-slate-950 font-bold shadow-lg shadow-amber-950/40'
                      : 'text-slate-400 hover:text-white hover:bg-[#181926] font-medium'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <Icon
                      className={`w-4 h-4 ${
                        isActive ? 'text-slate-950' : 'text-slate-400'
                      }`}
                    />
                    <span className="text-xs tracking-tight">{item.name}</span>
                  </div>

                  {item.badge && (
                    <span
                      className={`text-[9px] font-semibold uppercase tracking-wider px-1.5 py-0.5 rounded ${
                        isActive
                          ? 'text-slate-950 bg-black/20'
                          : 'text-slate-400 bg-[#1E202E]'
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

        {/* Bottom Circular Promo Card */}
        <div className="mt-4 pt-2">
          <div className="p-4 rounded-2xl bg-[#12131A] border border-[#252836] relative overflow-hidden group">
            <div className="flex items-center justify-between mb-2">
              <div className="w-8 h-8 rounded-lg bg-[#FFC21A]/20 flex items-center justify-center text-[#FFC21A]">
                <Cpu className="w-4 h-4" />
              </div>
              <span className="text-[9px] font-mono font-bold text-emerald-400 bg-emerald-950/80 px-1.5 py-0.5 rounded border border-emerald-500/30">
                100% Circular
              </span>
            </div>

            <h4 className="text-xs font-bold text-white leading-snug">
              Autonomous Reverse Logistics
            </h4>
            <p className="text-[10px] text-slate-400 mt-1">
              Zero electronic landfill waste by 2030.
            </p>

            <button
              type="button"
              onClick={() => setActiveTab('register')}
              className="mt-3 w-full flex items-center justify-center gap-1.5 py-2 px-3 rounded-xl bg-[#1E202E] hover:bg-[#252836] text-[#FFC21A] text-[11px] font-bold border border-[#FFC21A]/30 transition-all"
            >
              <span>Launch Intake Flow</span>
              <ArrowRight className="w-3 h-3" />
            </button>
          </div>
        </div>
      </div>
    </aside>
  );
}
