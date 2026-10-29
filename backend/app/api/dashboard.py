from fastapi import APIRouter, Depends, Query
from sqlalchemy.orm import Session
from ..database import get_db
from ..schemas import DashboardResponse
from ..services import get_dashboard_metrics

router = APIRouter(prefix="/api", tags=["dashboard"])


@router.get("/dashboard", response_model=DashboardResponse)
def get_dashboard(
    range: str = Query(
        "30d",
        alias="range",
        description="Filter range: '7d', '30d', or 'all'",
        pattern="^(7d|30d|all)$"
    ),
    db: Session = Depends(get_db)
):
    """
    Returns aggregated metrics for the ReLife AI recovery dashboard.
    All returned data is seeded realistic sample data for Phase 1.
    """
    return get_dashboard_metrics(db=db, date_range=range)
