from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from .database import engine, Base
from .api.dashboard import router as dashboard_router

# Create tables if they do not exist
Base.metadata.create_all(bind=engine)

app = FastAPI(
    title="ReLife AI API",
    description="Returned-Electronics Circular Recovery Platform API",
    version="1.0.0"
)

# Enable CORS for frontend integration
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:3000",
        "http://127.0.0.1:3000",
        "http://localhost:3001",
        "*"
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(dashboard_router)


@app.get("/")
def root():
    return {
        "status": "online",
        "platform": "ReLife AI - Returned Electronics Recovery",
        "phase": "Phase 1 - Dashboard",
        "docs_url": "/docs",
        "api_endpoint": "/api/dashboard"
    }


if __name__ == "__main__":
    import uvicorn
    uvicorn.run("app.main:app", host="0.0.0.0", port=8000, reload=True)

