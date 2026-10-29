import React from 'react';

export function Skeleton({ className = '' }: { className?: string }) {
  return (
    <div
      className={`animate-pulse bg-[#211C13]/70 rounded-md border border-[#FFC21A]/10 ${className}`}
    />
  );
}

export function KpiSkeleton() {
  return (
    <div className="bg-[#15120C] border border-[#FFC21A]/20 rounded-xl p-5 shadow-lg space-y-3">
      <div className="flex justify-between items-center">
        <Skeleton className="h-4 w-28" />
        <Skeleton className="h-4 w-12 rounded-full" />
      </div>
      <Skeleton className="h-8 w-36" />
      <div className="flex items-center gap-2 pt-1">
        <Skeleton className="h-4 w-16 rounded" />
        <Skeleton className="h-3 w-20" />
      </div>
    </div>
  );
}

export function ChartSkeleton({ height = 'h-64' }: { height?: string }) {
  return (
    <div className={`w-full ${height} flex flex-col justify-center items-center gap-3 p-4`}>
      <div className="w-12 h-12 rounded-full border-2 border-[#FFC21A]/30 border-t-[#FFC21A] animate-spin" />
      <span className="text-xs text-slate-400">Loading metrics visualization...</span>
    </div>
  );
}

export function TableSkeleton() {
  return (
    <div className="space-y-3 py-2">
      {[...Array(6)].map((_, i) => (
        <div key={i} className="flex items-center justify-between gap-4 py-2 border-b border-[#FFC21A]/10">
          <Skeleton className="h-5 w-24" />
          <Skeleton className="h-5 w-36" />
          <Skeleton className="h-5 w-20" />
          <Skeleton className="h-5 w-48" />
          <Skeleton className="h-5 w-20" />
          <Skeleton className="h-5 w-16" />
          <Skeleton className="h-6 w-24 rounded-full" />
        </div>
      ))}
    </div>
  );
}

