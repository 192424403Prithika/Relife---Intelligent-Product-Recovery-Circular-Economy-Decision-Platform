from typing import List, Optional
from pydantic import BaseModel


class KPIs(BaseModel):
    total_returns: int
    total_returns_change_pct: float
    recovery_rate_pct: float
    recovery_rate_change_pct: float
    value_recovered_inr: float
    value_recovered_change_pct: float
    waste_diverted_kg: float
    waste_diverted_change_pct: float
    awaiting_human_review: int
    awaiting_human_review_change: int


class PathwayDistributionItem(BaseModel):
    name: str
    count: int
    percentage: float
    color: str


class ValueOverTimePoint(BaseModel):
    date: str
    daily_value_inr: float
    cumulative_value_inr: float
    returns_count: int


class DefectCategoryItem(BaseModel):
    category: str
    count: int
    percentage: float


class PredictedVsActualItem(BaseModel):
    pathway: str
    predicted_value: float
    actual_value: float
    count: int


class RecentReturnItem(BaseModel):
    id: str
    product_id: str
    brand_model: str
    category: str
    defect_summary: str
    recommended_pathway: str
    confidence: float
    status: str
    received_date: str


class HumanReviewItem(BaseModel):
    id: str
    return_id: str
    product_name: str
    category: str
    reason: str
    defect_confidence: float
    recommended_pathway: str
    required_test: str
    received_date: str


class DashboardResponse(BaseModel):
    date_range: str
    is_sample_data: bool = True
    kpis: KPIs
    pathway_distribution: List[PathwayDistributionItem]
    value_over_time: List[ValueOverTimePoint]
    common_defects: List[DefectCategoryItem]
    predicted_vs_actual: List[PredictedVsActualItem]
    recent_returns: List[RecentReturnItem]
    human_review_queue: List[HumanReviewItem]


class ProductItem(BaseModel):
    id: str
    brand: str
    model: str
    category: str
    msrp_inr: float
    weight_kg: float


class CreateReturnRequest(BaseModel):
    product_id: str
    return_reason: str = "Customer return - diagnostic inspection"
    defect_category: str = "scratch"
    defect_severity: str = "minor"
    defect_description: str = "Cosmetic surface wear"
    needs_human_review: bool = False
    review_reason: Optional[str] = None
    required_test: Optional[str] = None


class ResolveReviewRequest(BaseModel):
    action: str = "pass"
    pathway: Optional[str] = None
    notes: Optional[str] = None


