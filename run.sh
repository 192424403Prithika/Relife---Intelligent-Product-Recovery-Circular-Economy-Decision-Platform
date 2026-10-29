#!/usr/bin/env bash
set -e

echo "==================================================="
echo "Starting ReLife AI Platform (Phase 1: Dashboard)"
echo "==================================================="

ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"

# 1. Backend
echo "[1/3] Preparing backend & database..."
cd "$ROOT_DIR/backend"
if [ ! -d ".venv" ]; then
    echo "Creating Python virtual environment..."
    python3 -m venv .venv
    .venv/bin/pip install -r requirements.txt
fi

if [ ! -f "relife.db" ]; then
    echo "Seeding SQLite database..."
    PYTHONPATH="$ROOT_DIR/backend" .venv/bin/python seed.py
fi

echo "[2/3] Starting FastAPI Backend on http://localhost:8000..."
PYTHONPATH="$ROOT_DIR/backend" .venv/bin/python -m uvicorn app.main:app --host 0.0.0.0 --port 8000 --reload &
BACKEND_PID=$!

# 2. Frontend
echo "[3/3] Starting Next.js Frontend on http://localhost:3000..."
cd "$ROOT_DIR/frontend"
if [ ! -d "node_modules" ]; then
    npm install
fi

npm run dev &
FRONTEND_PID=$!

echo ""
echo "==================================================="
echo "ReLife AI is running!"
echo "Backend:  http://localhost:8000/docs"
echo "Frontend: http://localhost:3000"
echo "Press Ctrl+C to terminate both servers."
echo "==================================================="

trap "kill $BACKEND_PID $FRONTEND_PID" SIGINT SIGTERM EXIT
wait

