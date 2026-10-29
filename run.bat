@echo off
echo ===================================================
echo Starting ReLife AI Platform (Phase 1: Dashboard)
echo ===================================================

echo [1/3] Checking Python virtual environment and database...
cd /d "%~dp0backend"
if not exist ".venv" (
    echo Creating Python virtual environment...
    python -m venv .venv
    call .venv\Scripts\activate.bat
    pip install -r requirements.txt
) else (
    call .venv\Scripts\activate.bat
)

if not exist "relife.db" (
    echo Seeding SQLite database with sample returns data...
    python seed.py
)

echo [2/3] Starting FastAPI Backend on http://localhost:8000...
start "ReLife Backend (FastAPI)" cmd /k ".venv\Scripts\python.exe -m uvicorn app.main:app --host 0.0.0.0 --port 8000 --reload"

echo [3/3] Starting Next.js Frontend on http://localhost:3000...
cd /d "%~dp0frontend"
if not exist "node_modules" (
    echo Installing frontend dependencies...
    npm install
)
start "ReLife Frontend (Next.js)" cmd /k "npm run dev"

echo.
echo ===================================================
echo ReLife AI is launching!
echo Backend Docs:  http://localhost:8000/docs
echo Dashboard UI:  http://localhost:3000
echo ===================================================

