'use client';

import React, { useState, useMemo } from 'react';
import { RecentReturnItem } from '../../lib/types';
import { Card } from '../ui/Card';
import { StatusChip, PathwayBadge } from '../ui/Badge';
import { TableSkeleton } from '../ui/Skeleton';
import {
  Search,
  Laptop,
  Smartphone,
  Headphones,
  Gamepad2,
  Watch,
  Tv,
  Camera,
  Home,
  Package,
  ChevronLeft,
  ChevronRight,
  X,
} from 'lucide-react';

interface RecentReturnsTableProps {
  returns: RecentReturnItem[];
  isLoading: boolean;
}

export function RecentReturnsTable({ returns, isLoading }: RecentReturnsTableProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [categoryFilter, setCategoryFilter] = useState<string>('all');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;

  // Extract all unique categories dynamically from seeded data
  const availableCategories = useMemo(() => {
    const set = new Set<string>();
    returns.forEach((r) => {
      if (r.category) set.add(r.category);
    });
    return Array.from(set).sort();
  }, [returns]);

  const filteredData = useMemo(() => {
    let result = [...returns];

    if (searchTerm.trim()) {
      const q = searchTerm.toLowerCase();
      result = result.filter(
        (item) =>
          item.id.toLowerCase().includes(q) ||
          item.brand_model.toLowerCase().includes(q) ||
          item.defect_summary.toLowerCase().includes(q) ||
          item.recommended_pathway.toLowerCase().includes(q) ||
          item.category.toLowerCase().includes(q)
      );
    }

    if (statusFilter !== 'all') {
      result = result.filter((item) => item.status === statusFilter);
    }

    if (categoryFilter !== 'all') {
      result = result.filter((item) => item.category === categoryFilter);
    }

    return result;
  }, [returns, searchTerm, statusFilter, categoryFilter]);

  const totalPages = Math.ceil(filteredData.length / itemsPerPage) || 1;
  const paginatedData = filteredData.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  // Helper for brand badge letter/icon
  const getBrandInitial = (brandModel: string) => {
    const firstWord = brandModel.split(' ')[0] || 'D';
    return firstWord.slice(0, 2).toUpperCase();
  };

  const getBrandColor = (brandModel: string) => {
    const s = brandModel.toLowerCase();
    if (s.includes('apple')) return 'bg-slate-900 text-white';
    if (s.includes('dell')) return 'bg-blue-600 text-white';
    if (s.includes('lenovo')) return 'bg-red-600 text-white';
    if (s.includes('samsung')) return 'bg-sky-600 text-white';
    if (s.includes('google')) return 'bg-amber-500 text-white';
    if (s.includes('oneplus')) return 'bg-rose-600 text-white';
    if (s.includes('sony')) return 'bg-neutral-900 text-white';
    if (s.includes('dyson')) return 'bg-purple-700 text-white';
    if (s.includes('nintendo')) return 'bg-red-500 text-white';
    if (s.includes('bose')) return 'bg-zinc-900 text-white';
    if (s.includes('jbl')) return 'bg-orange-600 text-white';
    if (s.includes('philips')) return 'bg-blue-800 text-white';
    if (s.includes('roborock')) return 'bg-stone-800 text-white';
    if (s.includes('breville')) return 'bg-amber-800 text-white';
    if (s.includes('microsoft') || s.includes('xbox')) return 'bg-emerald-600 text-white';
    if (s.includes('valve') || s.includes('steam')) return 'bg-slate-700 text-white';
    if (s.includes('garmin')) return 'bg-cyan-700 text-white';
    if (s.includes('lg')) return 'bg-rose-700 text-white';
    if (s.includes('dji')) return 'bg-zinc-800 text-white';
    if (s.includes('gopro')) return 'bg-sky-700 text-white';
    if (s.includes('asus')) return 'bg-indigo-600 text-white';
    if (s.includes('hp')) return 'bg-blue-700 text-white';
    return 'bg-[#073E2E] text-white';
  };

  const getCategoryIcon = (category: string) => {
    const cat = category.toLowerCase();
    if (cat.includes('laptop') || cat.includes('comput')) return Laptop;
    if (cat.includes('phone') || cat.includes('tablet')) return Smartphone;
    if (cat.includes('audio') || cat.includes('sound') || cat.includes('headphone')) return Headphones;
    if (cat.includes('gaming') || cat.includes('console')) return Gamepad2;
    if (cat.includes('wearable') || cat.includes('watch')) return Watch;
    if (cat.includes('monitor') || cat.includes('display')) return Tv;
    if (cat.includes('camera') || cat.includes('drone')) return Camera;
    if (cat.includes('appliance') || cat.includes('home')) return Home;
    return Package;
  };

  return (
    <Card
      title="Recent Returns Triage"
      action={
        <span className="text-xs font-semibold text-[#073E2E] cursor-pointer hover:underline">
          View All →
        </span>
      }
    >
      {/* Search & Filter Toolbar */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-3 mb-4">
        <div className="relative w-full sm:w-80">
          <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => {
              setSearchTerm(e.target.value);
              setCurrentPage(1);
            }}
            placeholder="Search all products, ID, category, or defects..."
            className="w-full pl-9 pr-8 py-1.5 bg-slate-50 border border-slate-200 rounded-full text-xs text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-1 focus:ring-[#073E2E]"
          />
          {searchTerm && (
            <button
              onClick={() => setSearchTerm('')}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
            >
              <X className="w-3 h-3" />
            </button>
          )}
        </div>

        <div className="flex items-center gap-2 w-full sm:w-auto justify-end">
          <select
            value={categoryFilter}
            onChange={(e) => {
              setCategoryFilter(e.target.value);
              setCurrentPage(1);
            }}
            className="bg-slate-50 border border-slate-200 rounded-lg text-xs text-slate-600 py-1.5 px-2.5 focus:outline-none"
          >
            <option value="all">All Product Categories</option>
            {availableCategories.map((cat) => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
          </select>

          <select
            value={statusFilter}
            onChange={(e) => {
              setStatusFilter(e.target.value);
              setCurrentPage(1);
            }}
            className="bg-slate-50 border border-slate-200 rounded-lg text-xs text-slate-600 py-1.5 px-2.5 focus:outline-none"
          >
            <option value="all">All Statuses</option>
            <option value="Recovered">Recovered</option>
            <option value="In progress">In progress</option>
            <option value="Needs human review">Needs review</option>
          </select>
        </div>
      </div>

      {isLoading ? (
        <TableSkeleton />
      ) : filteredData.length === 0 ? (
        <div className="py-12 text-center text-slate-400 text-xs">
          No return items found.
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="text-slate-400 uppercase tracking-wider font-semibold border-b border-slate-100 text-[10px]">
                <th className="py-2.5 px-3">Date / ID</th>
                <th className="py-2.5 px-3">Product Model</th>
                <th className="py-2.5 px-3">Defect Summary</th>
                <th className="py-2.5 px-3">Pathway</th>
                <th className="py-2.5 px-3">Confidence</th>
                <th className="py-2.5 px-3 text-right">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {paginatedData.map((item) => {
                const CategoryIcon = getCategoryIcon(item.category);
                return (
                  <tr key={item.id} className="hover:bg-slate-50/70 transition-colors">
                    {/* Date & ID */}
                    <td className="py-3 px-3">
                      <span className="font-mono font-bold text-slate-900 block text-xs">
                        {item.id}
                      </span>
                      <span className="text-[10px] text-slate-400">{item.received_date}</span>
                    </td>

                    {/* Brand & Model with Finora style circular avatar */}
                    <td className="py-3 px-3">
                      <div className="flex items-center gap-2.5">
                        <div
                          className={`w-7 h-7 rounded-full ${getBrandColor(
                            item.brand_model
                          )} flex items-center justify-center font-bold text-[10px] shrink-0 shadow-sm`}
                        >
                          {getBrandInitial(item.brand_model)}
                        </div>
                        <div>
                          <span className="font-bold text-slate-800 block text-xs">
                            {item.brand_model}
                          </span>
                          <div className="flex items-center gap-1.5 text-[10px] text-slate-400 mt-0.5">
                            <CategoryIcon className="w-3 h-3 text-slate-400 shrink-0" />
                            <span>
                              {item.category} • SKU: {item.product_id}
                            </span>
                          </div>
                        </div>
                      </div>
                    </td>

                    {/* Defect Summary */}
                    <td className="py-3 px-3 text-slate-600 max-w-xs truncate text-xs">
                      {item.defect_summary}
                    </td>

                    {/* Pathway */}
                    <td className="py-3 px-3">
                      <PathwayBadge pathway={item.recommended_pathway} />
                    </td>

                    {/* Confidence */}
                    <td className="py-3 px-3">
                      <div className="flex items-center gap-1.5">
                        <div className="w-12 bg-slate-100 h-1.5 rounded-full overflow-hidden">
                          <div
                            className="h-full rounded-full bg-[#073E2E]"
                            style={{ width: `${item.confidence}%` }}
                          />
                        </div>
                        <span className="font-mono text-[11px] font-semibold text-slate-700">
                          {item.confidence.toFixed(0)}%
                        </span>
                      </div>
                    </td>

                    {/* Status */}
                    <td className="py-3 px-3 text-right">
                      <StatusChip status={item.status} />
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}

      {/* Pagination Controls */}
      {!isLoading && filteredData.length > 0 && (
        <div className="flex items-center justify-between pt-3 mt-1 border-t border-slate-100 text-xs text-slate-400">
          <div>
            Showing {(currentPage - 1) * itemsPerPage + 1} -{' '}
            {Math.min(currentPage * itemsPerPage, filteredData.length)} of {filteredData.length} items
          </div>
          <div className="flex items-center gap-1">
            <button
              onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
              disabled={currentPage === 1}
              className="p-1 rounded-lg hover:bg-slate-100 text-slate-600 disabled:opacity-30 disabled:cursor-not-allowed"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <span className="font-semibold text-slate-700 px-2">
              {currentPage} / {totalPages}
            </span>
            <button
              onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
              disabled={currentPage === totalPages}
              className="p-1 rounded-lg hover:bg-slate-100 text-slate-600 disabled:opacity-30 disabled:cursor-not-allowed"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}
    </Card>
  );
}
