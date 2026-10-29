# ReLife AI One-Command Launch Script for PowerShell
Write-Host "===================================================" -ForegroundColor Gold
Write-Host "Starting ReLife AI Platform (Phase 1: Dashboard)" -ForegroundColor Cyan
Write-Host "===================================================" -ForegroundColor Gold

$rootDir = Split-Path -Parent $MyInvocation.MyCommand.Path

# 1. Setup & Start Backend
Write-Host "[1/3] Verifying Backend & SQLite database..." -ForegroundColor Yellow
Set-Location "$rootDir\backend"
if (-not (Test-Path ".venv")) {
    Write-Host "Creating Python virtual environment..."
    python -m venv .venv
    & "$rootDir\backend\.venv\Scripts\pip.exe" install -r requirements.txt
}

if (-not (Test-Path "relife.db")) {
    Write-Host "Seeding SQLite database with sample data..."
    $env:PYTHONPATH = "$rootDir\backend"
    & "$rootDir\backend\.venv\Scripts\python.exe" seed.py
}

Write-Host "[2/3] Starting FastAPI Backend on http://localhost:8000..." -ForegroundColor Green
Start-Process powershell -ArgumentList "-NoExit", "-Command", "cd '$rootDir\backend'; `$env:PYTHONPATH = '$rootDir\backend'; .\.venv\Scripts\python.exe -m uvicorn app.main:app --host 0.0.0.0 --port 8000 --reload"

# 2. Setup & Start Frontend
Write-Host "[3/3] Starting Next.js Frontend on http://localhost:3000..." -ForegroundColor Green
Start-Process powershell -ArgumentList "-NoExit", "-Command", "cd '$rootDir\frontend'; npm run dev"

Write-Host "`n===================================================" -ForegroundColor Gold
Write-Host "ReLife AI is running!" -ForegroundColor Green
Write-Host "Backend API & Docs: http://localhost:8000/docs" -ForegroundColor Cyan
Write-Host "Dashboard Web App:  http://localhost:3000" -ForegroundColor Cyan
Write-Host "===================================================" -ForegroundColor Gold

