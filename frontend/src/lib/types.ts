export type DateRange = '7d' | '30d' | 'all';

export interface KPIs {
  total_returns: number;
  total_returns_change_pct: number;
  recovery_rate_pct: number;
  recovery_rate_change_pct: number;
  value_recovered_inr: number;
  value_recovered_change_pct: number;
  waste_diverted_kg: number;
  waste_diverted_change_pct: number;
  awaiting_human_review: number;
  awaiting_human_review_change: number;
}

export interface PathwayDistributionItem {
  name: 'Resale' | 'Repair' | 'Refurbish' | 'Harvest' | 'Recycle';
  count: number;
  percentage: number;
  color: string;
}

export interface ValueOverTimePoint {
  date: string;
  daily_value_inr: number;
  cumulative_value_inr: number;
  returns_count: number;
}

export interface DefectCategoryItem {
  category: string;
  count: number;
  percentage: number;
}

export interface PredictedVsActualItem {
  pathway: string;
  predicted_value: number;
  actual_value: number;
  count: number;
}

export type ReturnStatus = 'Recovered' | 'In progress' | 'Needs human review';

export interface RecentReturnItem {
  id: string;
  product_id: string;
  brand_model: string;
  category: string;
  defect_summary: string;
  recommended_pathway: string;
  confidence: number;
  status: ReturnStatus;
  received_date: string;
}

export interface HumanReviewItem {
  id: string;
  return_id: string;
  product_name: string;
  category: string;
  reason: string;
  defect_confidence: number;
  recommended_pathway: string;
  required_test: string;
  received_date: string;
}

export interface DashboardResponse {
  date_range: DateRange;
  is_sample_data: boolean;
  kpis: KPIs;
  pathway_distribution: PathwayDistributionItem[];
  value_over_time: ValueOverTimePoint[];
  common_defects: DefectCategoryItem[];
  predicted_vs_actual: PredictedVsActualItem[];
  recent_returns: RecentReturnItem[];
  human_review_queue: HumanReviewItem[];
}

