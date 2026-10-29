'use client';

import React, { useState } from 'react';
import { DateRange } from '../../lib/types';
import {
  Search,
  Bell,
  ChevronDown,
  Calendar,
  X,
  CheckCircle,
} from 'lucide-react';

interface HeaderProps {
  dateRange: DateRange;
  onDateRangeChange: (range: DateRange) => void;
  searchTerm?: string;
  onSearchChange?: (term: string) => void;
  isLoading?: boolean;
}

export function Header({
  dateRange,
  onDateRangeChange,
  searchTerm = '',
  onSearchChange,
  isLoading = false,
}: HeaderProps) {
  const [showNotification, setShowNotification] = useState<boolean>(false);
  const [showProfileMenu, setShowProfileMenu] = useState<boolean>(false);

  const ranges: { id: DateRange; label: string }[] = [
    { id: '7d', label: '7 Days' },
    { id: '30d', label: '30 Days' },
    { id: 'all', label: 'All Time' },
  ];

  return (
    <header className="sticky top-0 z-30 bg-[#F4F7F5]/90 backdrop-blur-md px-6 lg:px-8 py-3.5 border-b border-slate-200/70">
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 max-w-[1800px] mx-auto">
        {/* Left: Global Search Bar */}
        <div className="relative w-full sm:w-80 lg:w-96">
          <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => onSearchChange && onSearchChange(e.target.value)}
            placeholder="Search all products, serials, defects, or pathways..."
            className="w-full pl-10 pr-9 py-2 bg-white border border-slate-200 rounded-full text-xs text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-[#073E2E] shadow-sm transition-all"
          />
          {searchTerm && onSearchChange && (
            <button
              onClick={() => onSearchChange('')}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          )}
        </div>

        {/* Right: Date Range Selector, Notification Bell & User Profile */}
        <div className="flex items-center gap-3.5 justify-end w-full sm:w-auto">
          {/* Date Range Selector */}
          <div className="flex items-center bg-white p-1 rounded-full border border-slate-200 shadow-sm">
            <span className="flex items-center pl-2.5 pr-1 text-slate-400">
              <Calendar className="w-3.5 h-3.5 text-slate-500" />
            </span>
            {ranges.map((range) => {
              const active = dateRange === range.id;
              return (
                <button
                  key={range.id}
                  onClick={() => onDateRangeChange(range.id)}
                  disabled={isLoading}
                  className={`px-3.5 py-1 rounded-full text-xs font-semibold tracking-tight transition-all ${
                    active
                      ? 'bg-[#073E2E] text-white shadow-sm'
                      : 'text-slate-500 hover:text-slate-800'
                  } ${isLoading ? 'opacity-50 cursor-wait' : ''}`}
                >
                  {range.label}
                </button>
              );
            })}
          </div>

          {/* Notification Bell with Dropdown Menu */}
          <div className="relative">
            <button
              type="button"
              onClick={() => setShowNotification(!showNotification)}
              className="relative p-2 rounded-full bg-white border border-slate-200 text-slate-600 hover:text-slate-900 shadow-sm transition-all hover:bg-slate-50"
              aria-label="Notifications"
            >
              <Bell className="w-4 h-4" />
              <span className="absolute -top-0.5 -right-0.5 w-4 h-4 rounded-full bg-rose-500 text-white text-[9px] font-bold flex items-center justify-center shadow-sm">
                3
              </span>
            </button>

            {showNotification && (
              <div className="absolute right-0 mt-2 w-72 bg-white rounded-2xl shadow-xl border border-slate-100 p-3 text-xs z-50 animate-in fade-in slide-in-from-top-1">
                <div className="flex items-center justify-between pb-2 mb-2 border-b border-slate-100 font-bold text-slate-800">
                  <span>System Alerts</span>
                  <span className="text-[10px] text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full font-mono">
                    3 New
                  </span>
                </div>
                <div className="space-y-2">
                  <div className="p-2 rounded-xl bg-slate-50 hover:bg-slate-100 transition-colors cursor-pointer">
                    <p className="font-semibold text-slate-900">7 returns flagged for bench test</p>
                    <p className="text-[10px] text-slate-400 mt-0.5">Automated AI confidence under 65%</p>
                  </div>
                  <div className="p-2 rounded-xl bg-slate-50 hover:bg-slate-100 transition-colors cursor-pointer">
                    <p className="font-semibold text-slate-900">Monthly recovery exceeded target</p>
                    <p className="text-[10px] text-slate-400 mt-0.5">₹18,09,550 recovered (+18.2%)</p>
                  </div>
                  <div className="p-2 rounded-xl bg-slate-50 hover:bg-slate-100 transition-colors cursor-pointer">
                    <p className="font-semibold text-slate-900">E-waste diversion milestone</p>
                    <p className="text-[10px] text-slate-400 mt-0.5">26.8 kg saved from regional landfills</p>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* User Profile */}
          <div className="relative">
            <button
              onClick={() => setShowProfileMenu(!showProfileMenu)}
              className="flex items-center gap-2.5 pl-2 border-l border-slate-200 text-left hover:opacity-85 transition-opacity"
            >
              <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-emerald-600 to-teal-400 flex items-center justify-center text-white font-bold text-xs shadow-sm ring-2 ring-white">
                AK
              </div>
              <div className="hidden sm:flex flex-col text-left">
                <span className="text-xs font-bold text-slate-800 leading-none font-sans">
                  Ayesha Khan
                </span>
                <span className="text-[10px] text-slate-400 font-medium leading-tight mt-0.5">
                  Recovery Lead
                </span>
              </div>
              <ChevronDown className="w-3.5 h-3.5 text-slate-400 hidden sm:block" />
            </button>

            {showProfileMenu && (
              <div className="absolute right-0 mt-2 w-56 bg-white rounded-2xl shadow-xl border border-slate-100 p-2 text-xs z-50 animate-in fade-in slide-in-from-top-1">
                <div className="p-2 border-b border-slate-100 mb-1">
                  <p className="font-bold text-slate-900">Ayesha Khan</p>
                  <p className="text-[10px] text-slate-400">ayesha.khan@relife.ai</p>
                  <span className="inline-block mt-1 text-[9px] font-semibold text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded-full">
                    Hub Lead • Tier 1 Access
                  </span>
                </div>
                <button
                  onClick={() => setShowProfileMenu(false)}
                  className="w-full text-left p-2 rounded-xl hover:bg-slate-50 text-slate-700 transition-colors font-medium"
                >
                  Hub Triage Preferences
                </button>
                <button
                  onClick={() => setShowProfileMenu(false)}
                  className="w-full text-left p-2 rounded-xl hover:bg-slate-50 text-slate-700 transition-colors font-medium"
                >
                  Audit Log & Credentials
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
