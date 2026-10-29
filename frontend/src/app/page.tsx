'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { DateRange, DashboardResponse } from '../lib/types';
import { fetchDashboardData } from '../lib/api';
import { Header } from '../components/layout/Header';
import { HeroBanner } from '../components/dashboard/HeroBanner';
import { PathwayDistributionChart } from '../components/dashboard/PathwayDistributionChart';
import { ValueOverTimeChart } from '../components/dashboard/ValueOverTimeChart';
import { RecoveryRateGauge } from '../components/dashboard/RecoveryRateGauge';
import { EcoImpactCard } from '../components/dashboard/EcoImpactCard';
import { CommonDefectsChart } from '../components/dashboard/CommonDefectsChart';
import { PredictedVsActualChart } from '../components/dashboard/PredictedVsActualChart';
import { RecentReturnsTable } from '../components/dashboard/RecentReturnsTable';
import { HumanReviewQueue } from '../components/dashboard/HumanReviewQueue';
import { EcoQuoteCard } from '../components/dashboard/EcoQuoteCard';
import { AlertCircle, RefreshCw } from 'lucide-react';

export default function DashboardPage() {
  const [dateRange, setDateRange] = useState<DateRange>('30d');
  const [data, setData] = useState<DashboardResponse | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const loadData = useCallback(async (range: DateRange) => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await fetchDashboardData(range);
      setData(response);
    } catch (err: any) {
      console.error('Error fetching dashboard data:', err);
      setError(
        'Unable to connect to the ReLife FastAPI backend. Please ensure the backend server is running on port 8000.'
      );
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    loadData(dateRange);
  }, [dateRange, loadData]);

  return (
    <div className="flex-1 min-h-screen bg-[#F4F7F5] text-slate-800 flex flex-col font-sans">
      {/* Top Navigation Bar with Search, Profile & Date Filter */}
      <Header
        dateRange={dateRange}
        onDateRangeChange={setDateRange}
        isLoading={isLoading}
      />

      {/* Main Grid matching Finora composition perfectly */}
      <main className="flex-1 p-5 sm:p-6 lg:p-7 max-w-[1800px] w-full mx-auto space-y-6">
        {/* Error notification banner if backend is unreachable */}
        {error && (
          <div className="p-4 rounded-2xl bg-rose-50 border border-rose-200 text-rose-700 flex items-center justify-between gap-4 shadow-sm">
            <div className="flex items-center gap-3">
              <AlertCircle className="w-5 h-5 text-rose-500 shrink-0" />
              <div className="text-xs">
                <span className="font-bold">Connection Notice:</span> {error}
              </div>
            </div>
            <button
              onClick={() => loadData(dateRange)}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white border border-rose-200 text-xs font-semibold text-rose-700 hover:bg-rose-100 transition-colors shadow-sm"
            >
              <RefreshCw className="w-3.5 h-3.5" />
              Retry
            </button>
          </div>
        )}

        {/* 3-Column Finora Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          {/* Left Main Column: Hero Banner + Monthly Recovery Bar Chart + Recent Returns Table */}
          <div className="lg:col-span-12 xl:col-span-5 space-y-6 flex flex-col">
            {/* Signature Dark Green Hero Card + Quick Action Buttons */}
            <HeroBanner kpis={data?.kpis || null} isLoading={isLoading} />

            {/* Monthly Recovery Velocity (Finora Monthly Spending Bar Chart) */}
            <ValueOverTimeChart
              data={data?.value_over_time || []}
              isLoading={isLoading}
            />

            {/* Recent Returns Table (Finora Recent Transactions Table) */}
            <RecentReturnsTable
              returns={data?.recent_returns || []}
              isLoading={isLoading}
            />
          </div>

          {/* Middle Analytics Column: Recovery Overview Donut + Progress Gauge + Top Failure Modes */}
          <div className="lg:col-span-6 xl:col-span-4 space-y-6 flex flex-col">
            {/* Donut Chart (Finora Spending Overview) */}
            <PathwayDistributionChart
              data={data?.pathway_distribution || []}
              totalValue={data?.kpis?.value_recovered_inr || 1809550}
              isLoading={isLoading}
            />

            {/* Circular Recovery Rate Progress Gauge (Finora Budget Progress) */}
            <RecoveryRateGauge
              rate={data?.kpis?.recovery_rate_pct || 71.2}
            />

            {/* Common Defect Categories (Finora Top Categories) */}
            <CommonDefectsChart
              data={data?.common_defects || []}
              isLoading={isLoading}
            />
          </div>

          {/* Right Insights Column: Eco Impact + Upcoming Bench Tests + Prediction Variance + Quote */}
          <div className="lg:col-span-6 xl:col-span-3 space-y-6 flex flex-col">
            {/* Eco Impact Card (Finora Grow Your Money) */}
            <EcoImpactCard
              wasteDivertedKg={data?.kpis?.waste_diverted_kg || 26.8}
            />

            {/* Human Review Queue (Finora Upcoming Bills) */}
            <HumanReviewQueue
              queue={data?.human_review_queue || []}
              isLoading={isLoading}
            />

            {/* Forecast vs Realized Recovery Value (Predicted vs Actual) */}
            <PredictedVsActualChart
              data={data?.predicted_vs_actual || []}
              isLoading={isLoading}
            />

            {/* Eco Quote Card (Finora Bottom Right Quote) */}
            <EcoQuoteCard />
          </div>
        </div>
      </main>

      {/* Global Clean Professional Footer */}
      <footer className="border-t border-slate-200/60 py-4 px-8 text-xs text-slate-400 bg-white/60 backdrop-blur-sm mt-8">
        <div className="flex flex-col sm:flex-row items-center justify-between max-w-[1800px] mx-auto gap-2">
          <span>ReLife AI • Circular Electronics Reverse-Logistics OS</span>
          <span>Enterprise Fleet Recovery Engine</span>
        </div>
      </footer>
    </div>
  );
}
