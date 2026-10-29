# ReLife AI — Intelligent Product Recovery & Circular Economy Decision Platform
### Hackathon Prototype (Complete End-to-End Decision Engine)

**ReLife AI** is an AI-powered product recovery decision platform for returned electronics (laptops and smartphones). It automates the end-to-end return evaluation lifecycle: optical defect detection, hardware functional testing, itemized cost/revenue estimation, weighted multi-objective decision modeling across 5 circular pathways, technician escalation, B2B parts marketplace matching, and closed-loop outcome settlement.

Runs locally with **one command** and is demo-ready in under 2 minutes.

---

## ⚡ Quick Start: One-Command Launch

### Windows (Batch / CMD)
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

The script automatically sets up the Python virtual environment, seeds SQLite with products, canonical demo returns, B2B buyers, and marketplace components, and launches both services:
- **Decision Platform UI**: [http://localhost:3000](http://localhost:3000)
- **FastAPI Interactive Docs**: [http://localhost:8000/docs](http://localhost:8000/docs)
- **Digital Product Passport Demo**: [http://localhost:3000/passport/REL-DEMO-001](http://localhost:3000/passport/REL-DEMO-001)

---

## 🧭 The 10 Core Platform Steps

1. **Product Registration & QR Passport**: Form capturing brand, model, purchase price, age (months), return reason, warranty, and customer issue. Automatically generates a unique Return ID (`REL-xxxx`) and scannable QR code leading to its Digital Product Recovery Passport (`/passport/[id]`).
2. **Computer Vision Optical Inspection**: Upload 1–5 images or select pre-loaded demo images. OpenCV preprocessing runs bilateral edge-preserving denoising and Laplacian blur variance detection (threshold `< 100.0` = blurry). Defect detector locates `crack`, `dent`, `scratch`, `missing part` with normalized bounding boxes, severity badges, and confidence metrics. Includes visible `Demo Mode` badge.
3. **Functional Test Checklist**: Bench input checklist (`powers on`, `display ok`, `battery health %`, `motherboard ok`, `RAM ok`, `storage ok`, `ports ok`) accepting `pass`, `fail`, or `unknown`. Any unknown test reduces confidence and triggers technician escalation.
4. **Cost & Value Estimation**: Itemized breakdown across all 5 pathways (parts, labor, testing, cleaning, handling, storage, transport) and secondary resale/component values. Every metric is tagged `estimated` with sample assumptions clearly disclosed.
5. **Five-Pathway Decision Engine**: Evaluates **Direct Resale, Repair, Refurbishment, Component Harvesting, and Recycling**. Calculates:
   $$\text{Net Recovery Value} = \text{Expected Revenue} - \text{Expected Cost}$$
   Ranked via user-configurable objective weight sliders (**Profit, Environment, Speed, Risk**). Hard safety overrides permanently block resale if display is cracked or battery health $< 70\%$.
6. **Human Review Routing**: Automatically routes items to technician queue if images are blurry, defect confidence $< 70\%$, bench tests unknown, or top pathways are tied. Prescribes specific diagnostic tests with manual override capabilities.
7. **Explainable Recommendation Report**: Interactive Recharts bar chart of net recovery values, detailed winner rationale, fallback rationales, 3 distinct confidences (detection, condition, overall recommendation), and one-click PDF printing.
8. **Component Marketplace**: Lists harvested sub-assemblies (displays, logic boards, RAM, SSDs, batteries, camera sensors) with condition ratings. Matches lots against 4 registered B2B circular buyers using compatibility, demand, and bid price factors with instant allocation.
9. **Closed-Loop Outcome Tracking**: Record actual finalized pathway, actual revenue, actual cost, and turnaround time against AI predictions with live variance badges and downloadable ESG certificates.
10. **Executive Dashboard**: Real-time circular operations telemetry: total returns, recovery yield rate, recovered value (₹), landfill waste diverted (kg), pathway donut distribution, top hardware defect modes, and urgent review queue.

---

## 🎬 2-Minute Demo Walkthrough

Follow the scripted demo scenario in [`DEMO_SCRIPT.md`](DEMO_SCRIPT.md):
1. Navigate to **Register Product** in sidebar.
2. Click **"Scenario A: Laptop Cracked Screen"** (or hit the gold banner "Load Laptop Demo Scenario").
3. Proceed through **Image Inspection** $\rightarrow$ observe OpenCV Laplacian blur variance (185.0 = Sharp) and bounding boxes identifying the cracked display.
4. Verify **Functional Tests** $\rightarrow$ display fails, battery passes (91%), condition score calculated at 85.0.
5. Review **Itemized Economics** $\rightarrow$ parts replacement ₹24,000, net recovery ₹96,385.
6. Observe **Decision Engine** $\rightarrow$ Direct Resale is blocked with a hard safety override alert; Repair ranks #1. Adjust objective sliders to test real-time re-ranking!
7. Sign off **Human Review** & view the **Explainable Report** with Recharts bar chart and print-to-PDF button.
8. Open the **Digital Product Recovery Passport** via QR or link: [http://localhost:3000/passport/REL-DEMO-001](http://localhost:3000/passport/REL-DEMO-001).

---

## ⚖️ Honesty & Compliance Disclosures

- **Sample Assumptions**: All secondary market prices, repair costs, and carbon emission factors are seeded illustrative assumptions and clearly labeled in the user interface.
- **Physical Sensor Limits**: The UI explicitly states that optical computer vision cannot confirm battery chemical state or internal electrical integrity; battery and motherboard diagnostics require dedicated bench testing.
- **Confidence Metrics**: Confidence scores are displayed alongside all computer vision detections and model recommendations.
- **Demo Mode**: The fallback detector is visibly branded with a "Demo Mode: OpenCV Preprocessed + Simulated Detections" badge.

---

## 🛠️ Tech Stack

| Component | Technology | Description |
|---|---|---|
| **Frontend** | Next.js 14 (App Router), React 18, TypeScript, Tailwind CSS | Dark Theme (`#08080D` background, `#12131A` cards, `#FFC21A` gold & `#F57C00` orange accents) |
| **Charts** | Recharts | Net Recovery Value, Predicted vs Actual, Pathway distribution |
| **Icons** | Lucide React | Modern feather-style iconography |
| **Backend** | Python 3.10+, FastAPI, Pydantic v2, Uvicorn | High-performance asynchronous REST API |
| **Computer Vision** | OpenCV (`opencv-python-headless`) | Bilateral denoising, Laplacian blur variance check, 640x640 aspect resize |
| **Database** | SQLite 3 (`backend/relife.db`), SQLAlchemy 2.0 | Portable schema (PostgreSQL ready) with 12 interconnected tables |
| **QR Engine** | Python `qrcode[pil]` | Scannable base64 data URLs for Digital Product Passports |

---

## 📁 Repository Structure

```
ReLife/
├── backend/
│   ├── app/
│   │   ├── main.py                  # FastAPI entrypoint, CORS, route registry
│   │   ├── database.py              # SQLAlchemy database session & engine
│   │   ├── models.py                # 12 relational tables
│   │   ├── schemas.py               # Pydantic request & response models
│   │   ├── pricing_data.py          # Component values, costs, buyers, ESG factors
│   │   ├── vision.py                # OpenCV preprocessing & defect detector fallback
│   │   ├── decision_engine.py       # 5-pathway multi-objective weighted engine & overrides
│   │   └── api/
│   │       ├── dashboard.py         # GET /api/dashboard & triage
│   │       ├── registration.py      # POST /api/returns/register & QR passport
│   │       ├── inspection.py        # POST /api/inspections/upload & sample images
│   │       ├── tests.py             # POST /api/returns/{id}/tests
│   │       ├── decision.py          # GET /api/returns/{id}/economics, evaluate, report
│   │       ├── marketplace.py       # GET /api/marketplace/components & allocate
│   │       └── outcomes.py          # GET /api/outcomes & POST /api/outcomes
│   ├── static/samples/              # Synthetic inspection sample images
│   ├── requirements.txt             # Python dependencies
│   ├── seed.py                      # Database seeding script (52 returns + 5 demo cases)
│   └── relife.db                    # SQLite database
│
├── frontend/
│   ├── src/
│   │   ├── app/
│   │   │   ├── page.tsx             # Main dashboard page
│   │   │   ├── layout.tsx           # App shell with dark theme
│   │   │   ├── globals.css          # Dark theme styles & scrollbars
│   │   │   └── passport/[id]/page.tsx # Digital Product Recovery Passport
│   │   ├── components/
│   │   │   ├── wizard/              # 7-Step Recovery Wizard
│   │   │   │   ├── RecoveryWizard.tsx
│   │   │   │   ├── Step1Registration.tsx
│   │   │   │   ├── Step2ImageInspection.tsx
│   │   │   │   ├── Step3FunctionalTests.tsx
│   │   │   │   ├── Step4CostEstimation.tsx
│   │   │   │   ├── Step5DecisionEngine.tsx
│   │   │   │   ├── Step6HumanReview.tsx
│   │   │   │   └── Step7Report.tsx
│   │   │   ├── marketplace/
│   │   │   │   └── MarketplaceWorkbench.tsx # Step 8 B2B matching workbench
│   │   │   ├── outcomes/
│   │   │   │   └── OutcomeTrackingWorkbench.tsx # Step 9 closed-loop tracker
│   │   │   ├── dashboard/           # Dashboard visualizer cards
│   │   │   ├── layout/              # Sidebar & Header
│   │   │   └── ui/                  # Reusable card, badge, modal primitives
│   │   └── lib/
│   │       ├── api.ts               # Typed API client
│   │       ├── types.ts             # TypeScript interfaces
│   │       └── formatters.ts        # Currency and unit formatters
│   ├── package.json
│   └── tailwind.config.ts
│
├── DEMO_SCRIPT.md                   # Step-by-step hackathon demo script
├── run.bat                          # One-command runner (Windows Batch)
├── run.ps1                          # One-command runner (Windows PowerShell)
└── README.md
```

---

## 📡 Core API Reference

| Endpoint | Method | Description |
|---|---|---|
| `/api/returns/register` | `POST` | Registers product return and produces QR code data URL |
| `/api/inspections/upload` | `POST` | OpenCV preprocessing & defect detection with bounding boxes |
| `/api/inspections/sample-images`| `GET` | Returns list of pre-configured synthetic sample defect images |
| `/api/returns/{id}/tests` | `POST` | Records functional checklist and calculates condition score |
| `/api/returns/{id}/economics` | `GET` | Returns itemized costs and revenues for all 5 pathways |
| `/api/returns/{id}/evaluate` | `POST` | Runs 5-pathway decision engine with configurable slider weights |
| `/api/returns/{id}/report` | `GET` | Compiles full explainable recommendation report |
| `/api/returns/{id}/resolve-review`| `POST` | Resolves human review with technician override |
| `/api/marketplace/components` | `GET` | Lists harvestable components matched with B2B buyers |
| `/api/marketplace/allocate` | `POST` | Allocates component lot to circular buyer |
| `/api/outcomes` | `GET` / `POST` | Retrieves and records finalized recovery settlements |
| `/api/dashboard` | `GET` | Aggregated executive KPIs, pathway donut, defects & queue |

---

Built for circular electronics recovery and zero-e-waste reverse supply chains.
