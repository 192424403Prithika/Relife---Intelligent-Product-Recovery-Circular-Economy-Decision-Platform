# ReLife AI — Intelligent Product Recovery & Circular Economy Decision Platform
### Phase 1: Enterprise Circular Recovery Dashboard

**ReLife AI** is an intelligent reverse-logistics and multi-category circular recovery platform. It automates product intake triage, defect analysis, and circular routing across 5 high-yield pathways: **Resale, Repair, Refurbish, Harvest, and Recycle**.

Phase 1 delivers the full **Application Dashboard**, powered by a high-performance **Python FastAPI** backend with **SQLite**, and an enterprise-grade **Next.js (App Router)** user interface styled with the **Finora** design system (forest green accents, clean card architecture, and mint highlights).

---

## ⚡ Quick Start: One-Command Launch

### Windows (Command Prompt / Batch)
```cmd
run.bat
```

### Windows (PowerShell)
```powershell
.\run.ps1
```

### Linux / macOS
```bash
chmod +x run.sh
./run.sh
```

The script automatically initializes the Python virtual environment, seeds the database with 52 multi-category returns across 31 products, and launches both the backend and frontend servers:
- **Dashboard Web UI**: [http://localhost:3000](http://localhost:3000)
- **FastAPI Documentation**: [http://localhost:8000/docs](http://localhost:8000/docs)
- **API Endpoint**: [http://localhost:8000/api/dashboard?range=30d](http://localhost:8000/api/dashboard?range=30d)

---

## 🛠️ Tech Stack

| Layer | Technologies |
|---|---|
| **Frontend** | Next.js 14 (App Router), React 18, TypeScript, Tailwind CSS, Recharts, Lucide React |
| **Backend** | Python 3.10+, FastAPI, SQLAlchemy 2.0, Pydantic v2 |
| **Database** | SQLite 3 (`backend/relife.db`) |
| **Design System** | Finora-inspired light palette (`#F4F7F5` background, `#073E2E` forest green, `#10B981` mint) |
| **Number Formatting**| Indian numbering system (`₹`, Lakhs `L`, Crores `Cr`, standard commas `18,09,550`) |

---

## 📋 Manual Setup Instructions

### 1. Backend Setup
```bash
cd backend

# Create and activate Python virtual environment
python -m venv .venv

# Windows:
.venv\Scripts\activate
# Linux/macOS:
source .venv/bin/activate

# Install dependencies
pip install -r requirements.txt

# Seed the SQLite database with 52 realistic multi-category return records
python seed.py

# Launch FastAPI server on port 8000
python -m uvicorn app.main:app --host 0.0.0.0 --port 8000 --reload
```

### 2. Frontend Setup
```bash
cd frontend

# Install Node dependencies
npm install

# Start Next.js development server on port 3000
npm run dev
# Or build and run production server:
# npm run build && npm run start
```

Visit [http://localhost:3000](http://localhost:3000) in your browser.

---

## 🏗️ Architecture & Database Design

The data layer is intentionally designed to support all future platform phases (**Phase 2: Product Registration, Phase 3: CV Inspection, Phase 4: Decision Engine, Phase 5: Marketplace & Outcomes**) without requiring schema redesigns:

```
ReLife/
├── backend/
│   ├── app/
│   │   ├── main.py              # FastAPI app, CORS, routers
│   │   ├── database.py          # SQLAlchemy SQLite configuration
│   │   ├── models.py            # 5 Core Tables (products, returns, defects, recommendations, recovery_outcomes)
│   │   ├── schemas.py           # Pydantic schemas for /api/dashboard
│   │   ├── services.py          # Metrics aggregation service (7d, 30d, all)
│   │   └── api/
│   │       └── dashboard.py     # GET /api/dashboard endpoint
│   ├── seed.py                  # Idempotent seed script (52 returns across 8 product categories)
│   ├── requirements.txt         # Backend Python dependencies
│   └── relife.db                # SQLite database file
│
├── frontend/
│   ├── src/
│   │   ├── app/
│   │   │   ├── layout.tsx       # Root layout with sidebar navigation
│   │   │   ├── page.tsx         # 3-Column Finora dashboard with live filtering
│   │   │   └── globals.css      # Theme colors, custom scrollbars, and tooltips
│   │   ├── components/
│   │   │   ├── layout/
│   │   │   │   ├── Sidebar.tsx  # Navigation (active Dashboard, disabled future phases with tooltips)
│   │   │   │   └── Header.tsx   # Search, date range selector (7d, 30d, all), profile avatar
│   │   │   ├── dashboard/
│   │   │   │   ├── HeroBanner.tsx               # Forest green card with total value recovered & quick actions
│   │   │   │   ├── PathwayDistributionChart.tsx # Donut chart with center total & detailed legend
│   │   │   │   ├── ValueOverTimeChart.tsx       # Monthly recovery bar chart with active callout
│   │   │   │   ├── RecoveryRateGauge.tsx        # Circular progress ring with multi-category salvage breakdown
│   │   │   │   ├── CommonDefectsChart.tsx       # Top hardware failure modes with progress indicators
│   │   │   │   ├── EcoImpactCard.tsx            # Landfill diversion metrics & e-waste card
│   │   │   │   ├── RecentReturnsTable.tsx       # Dynamic category filter, search, brand avatars & status chips
│   │   │   │   ├── HumanReviewQueue.tsx         # Bench inspection items with test requirements
│   │   │   │   ├── PredictedVsActualChart.tsx   # Forecast vs realized recovery value grouped bar
│   │   │   │   └── EcoQuoteCard.tsx             # Sustainability quote card
│   │   │   └── ui/
│   │   │       ├── Card.tsx     # Clean rounded white cards with soft shadows
│   │   │       ├── Badge.tsx    # Status chips and pathway badges
│   │   │       ├── Skeleton.tsx # Loading skeletons
│   │   │       └── Tooltip.tsx  # Accessible tooltips
│   │   └── lib/
│   │       ├── api.ts           # Fetch client for FastAPI
│   │       ├── formatters.ts    # Indian Rupee & weight formatters
│   │       └── types.ts         # TypeScript interfaces
│   ├── tailwind.config.ts
│   └── package.json
│
├── run.bat                      # Windows CMD one-command runner
├── run.ps1                      # Windows PowerShell one-command runner
├── run.sh                       # Unix/macOS one-command runner
└── README.md
```

### The 5 Core Database Tables
1. **`products`**: Universal catalog of returned products across 8 categories (Smartphones, Laptops, Audio & Sound, Smart Appliances, Gaming Consoles, Wearables, Monitors, Cameras & Drones) with MSRP in INR and weights for waste diversion accounting.
2. **`returns`**: Ledger of return items received, dates, inspection states, and human review flags.
3. **`defects`**: Granular defect signatures identified by CV/sensors (`battery fault`, `crack`, `scratch`, `dent`, `missing part`).
4. **`recommendations`**: Circular decision engine outputs with confidence scores, predicted recovery values, and reasoning.
5. **`recovery_outcomes`**: Closed loop financial outcomes with actual values, refurbishment costs, and kg of e-waste diverted from landfill.

---

## 📊 Multi-Category Product Coverage

- **Smartphones & Tablets**: Apple iPhone 14 Pro, Samsung Galaxy S23 Ultra, Google Pixel 7 Pro, iPad Pro M2, OnePlus 11 5G
- **Laptops & Computing**: Apple MacBook Air & Pro, Dell XPS 15, Lenovo ThinkPad X1 Carbon, ASUS ROG Zephyrus
- **Audio & Sound**: Sony WH-1000XM5, Bose QuietComfort 45, Apple AirPods Max, JBL Bar 500 Soundbar
- **Smart Home & Appliances**: Dyson V15 Detect Vacuum, Philips Connected Air Fryer, Roborock S8 Pro Robot Vacuum, Breville Barista Touch
- **Gaming & Consoles**: Sony PlayStation 5, Nintendo Switch OLED, Microsoft Xbox Series X, Valve Steam Deck
- **Wearables & Smartwatches**: Apple Watch Ultra 2, Samsung Galaxy Watch 6, Garmin Forerunner 965
- **Monitors & Displays**: LG UltraFine 27" 4K Ergo Monitor, Samsung Odyssey G7 32"
- **Cameras & Drones**: Sony Alpha A7 IV Mirrorless, DJI Mini 4 Pro Drone, GoPro HERO12 Black
