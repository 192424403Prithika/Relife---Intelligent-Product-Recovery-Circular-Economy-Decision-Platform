import io
import base64
import random
from datetime import datetime, timedelta
import qrcode
from app.database import engine, SessionLocal, Base
from app.models import (
    Product, ReturnItem, Defect, Recommendation,
    RecoveryOutcome, Buyer, Inspection, FunctionalTest, Component
)
from app.pricing_data import SEED_BUYERS


def make_qr_data_url(passport_url: str) -> str:
    qr = qrcode.QRCode(version=1, box_size=8, border=2)
    qr.add_data(passport_url)
    qr.make(fit=True)
    img = qr.make_image(fill_color="#073E2E", back_color="white")
    buffer = io.BytesIO()
    img.save(buffer, format="PNG")
    b64 = base64.b64encode(buffer.getvalue()).decode("utf-8")
    return f"data:image/png;base64,{b64}"

PRODUCTS_DATA = [
    # Laptops & Computing
    {"id": "PRD-LPT-001", "brand": "Apple", "model": "MacBook Air M2", "category": "Laptops", "msrp_inr": 114900, "weight_kg": 1.24},
    {"id": "PRD-LPT-002", "brand": "Apple", "model": "MacBook Pro 14 (M2 Pro)", "category": "Laptops", "msrp_inr": 169900, "weight_kg": 1.60},
    {"id": "PRD-LPT-003", "brand": "Dell", "model": "XPS 15 (9520)", "category": "Laptops", "msrp_inr": 145000, "weight_kg": 1.92},
    {"id": "PRD-LPT-004", "brand": "Lenovo", "model": "ThinkPad X1 Carbon Gen 10", "category": "Laptops", "msrp_inr": 152000, "weight_kg": 1.12},
    {"id": "PRD-LPT-005", "brand": "HP", "model": "Spectre x360 14", "category": "Laptops", "msrp_inr": 128000, "weight_kg": 1.39},
    {"id": "PRD-LPT-006", "brand": "ASUS", "model": "ROG Zephyrus G14", "category": "Laptops", "msrp_inr": 135000, "weight_kg": 1.65},

    # Smartphones & Tablets
    {"id": "PRD-PHN-001", "brand": "Apple", "model": "iPhone 14 Pro", "category": "Smartphones", "msrp_inr": 119900, "weight_kg": 0.206},
    {"id": "PRD-PHN-002", "brand": "Apple", "model": "iPad Pro 11 M2", "category": "Smartphones", "msrp_inr": 81900, "weight_kg": 0.466},
    {"id": "PRD-PHN-003", "brand": "Samsung", "model": "Galaxy S23 Ultra", "category": "Smartphones", "msrp_inr": 124900, "weight_kg": 0.234},
    {"id": "PRD-PHN-004", "brand": "Google", "model": "Pixel 7 Pro", "category": "Smartphones", "msrp_inr": 72900, "weight_kg": 0.212},
    {"id": "PRD-PHN-005", "brand": "OnePlus", "model": "OnePlus 11 5G", "category": "Smartphones", "msrp_inr": 56900, "weight_kg": 0.205},

    # Audio & Sound
    {"id": "PRD-AUD-001", "brand": "Sony", "model": "WH-1000XM5 Wireless", "category": "Audio & Sound", "msrp_inr": 29990, "weight_kg": 0.250},
    {"id": "PRD-AUD-002", "brand": "Apple", "model": "AirPods Max", "category": "Audio & Sound", "msrp_inr": 59900, "weight_kg": 0.385},
    {"id": "PRD-AUD-003", "brand": "Bose", "model": "QuietComfort 45", "category": "Audio & Sound", "msrp_inr": 26900, "weight_kg": 0.240},
    {"id": "PRD-AUD-004", "brand": "JBL", "model": "Bar 500 Pro Dolby Atmos", "category": "Audio & Sound", "msrp_inr": 44999, "weight_kg": 4.100},

    # Smart Home & Appliances
    {"id": "PRD-APP-001", "brand": "Dyson", "model": "V15 Detect Cordless Vacuum", "category": "Smart Appliances", "msrp_inr": 62900, "weight_kg": 3.100},
    {"id": "PRD-APP-002", "brand": "Philips", "model": "Connected Air Fryer XXL", "category": "Smart Appliances", "msrp_inr": 14995, "weight_kg": 5.500},
    {"id": "PRD-APP-003", "brand": "Roborock", "model": "S8 Pro Ultra Robot Vacuum", "category": "Smart Appliances", "msrp_inr": 89900, "weight_kg": 4.800},
    {"id": "PRD-APP-004", "brand": "Breville", "model": "Barista Touch Espresso Machine", "category": "Smart Appliances", "msrp_inr": 98000, "weight_kg": 10.200},

    # Gaming & Consoles
    {"id": "PRD-GAM-001", "brand": "Sony", "model": "PlayStation 5 Horizon Bundle", "category": "Gaming & Consoles", "msrp_inr": 49990, "weight_kg": 3.900},
    {"id": "PRD-GAM-002", "brand": "Nintendo", "model": "Switch OLED Model", "category": "Gaming & Consoles", "msrp_inr": 31990, "weight_kg": 0.420},
    {"id": "PRD-GAM-003", "brand": "Microsoft", "model": "Xbox Series X", "category": "Gaming & Consoles", "msrp_inr": 52990, "weight_kg": 4.450},
    {"id": "PRD-GAM-004", "brand": "Valve", "model": "Steam Deck OLED 512GB", "category": "Gaming & Consoles", "msrp_inr": 54900, "weight_kg": 0.640},

    # Wearables & Smartwatches
    {"id": "PRD-WRS-001", "brand": "Apple", "model": "Watch Ultra 2 Titanium", "category": "Wearables", "msrp_inr": 89900, "weight_kg": 0.061},
    {"id": "PRD-WRS-002", "brand": "Samsung", "model": "Galaxy Watch 6 Classic", "category": "Wearables", "msrp_inr": 36999, "weight_kg": 0.059},
    {"id": "PRD-WRS-003", "brand": "Garmin", "model": "Forerunner 965 GPS AMOLED", "category": "Wearables", "msrp_inr": 67490, "weight_kg": 0.053},

    # Monitors & Displays
    {"id": "PRD-DSP-001", "brand": "LG", "model": "UltraFine 27\" 4K Ergo Monitor", "category": "Monitors & Displays", "msrp_inr": 42000, "weight_kg": 6.200},
    {"id": "PRD-DSP-002", "brand": "Samsung", "model": "Odyssey G7 32\" QHD 240Hz", "category": "Monitors & Displays", "msrp_inr": 54000, "weight_kg": 7.800},

    # Cameras & Drones
    {"id": "PRD-CAM-001", "brand": "Sony", "model": "Alpha A7 IV Mirrorless Camera", "category": "Cameras & Drones", "msrp_inr": 224990, "weight_kg": 0.658},
    {"id": "PRD-CAM-002", "brand": "DJI", "model": "Mini 4 Pro Fly More Combo", "category": "Cameras & Drones", "msrp_inr": 89990, "weight_kg": 0.249},
    {"id": "PRD-CAM-003", "brand": "GoPro", "model": "HERO12 Black 5.3K Action Cam", "category": "Cameras & Drones", "msrp_inr": 39990, "weight_kg": 0.154},
]

RETURN_REASONS = [
    "Buyer remorse / unopened",
    "Minor cosmetic blemish on unboxing",
    "Screen flickering / display anomaly",
    "Rapid battery discharge",
    "Defective charging connector",
    "Damaged package during courier transit",
    "Missing original power adapter",
    "Device failed automated diagnostics",
]

HUMAN_REVIEW_SCENARIOS = [
    {
        "reason": "Battery test missing",
        "required_test": "Execute 3-cycle battery diagnostic & thermal load stress test",
        "pathway": "Repair",
        "confidence": 61.5
    },
    {
        "reason": "Low defect confidence score",
        "required_test": "Manual high-resolution optical inspection for hairline micro-cracks",
        "pathway": "Refurbish",
        "confidence": 58.2
    },
    {
        "reason": "Liquid ingress marker triggered",
        "required_test": "Inspect internal Liquid Contact Indicator (LCI) & board ultrasonic wash check",
        "pathway": "Harvest",
        "confidence": 63.8
    },
    {
        "reason": "Cryptographic display serial mismatch",
        "required_test": "Run OEM component authorization & serial pairing validation",
        "pathway": "Repair",
        "confidence": 66.0
    },
    {
        "reason": "Unusual acoustic anomaly in cooling fan",
        "required_test": "Acoustic stethoscope chamber test & spindle bearing clearance verification",
        "pathway": "Refurbish",
        "confidence": 64.1
    },
    {
        "reason": "IMEI / Board barcode label degradation",
        "required_test": "Hardware JTAG firmware interrogation for motherboard electronic serial ID",
        "pathway": "Resale",
        "confidence": 68.4
    },
    {
        "reason": "Chassis micro-deflection exceeding 1.2mm",
        "required_test": "Laser micrometer surface planarity check on chassis integrity",
        "pathway": "Harvest",
        "confidence": 59.7
    }
]

DEFECT_TEMPLATES = [
    {"category": "battery fault", "desc": "Reduced capacity below 78% health or rapid cycle drop", "severities": ["minor", "moderate", "severe"]},
    {"category": "crack", "desc": "Corner glass fracture or bezel hairline crack", "severities": ["minor", "moderate", "severe"]},
    {"category": "scratch", "desc": "Surface abrasive marks on anodized back chassis", "severities": ["minor", "moderate"]},
    {"category": "dent", "desc": "Corner drop impact dent on aluminum frame", "severities": ["minor", "moderate"]},
    {"category": "missing part", "desc": "Missing original stylus, SIM tray, or rubber feet", "severities": ["minor"]},
]


def seed_database():
    print("Clearing and creating database tables...")
    Base.metadata.drop_all(bind=engine)
    Base.metadata.create_all(bind=engine)

    db = SessionLocal()
    random.seed(42)  # Deterministic seed for reproducible testing

    try:
        # 1. Insert Products
        products = []
        for p_data in PRODUCTS_DATA:
            prod = Product(**p_data)
            db.add(prod)
            products.append(prod)
        db.commit()
        print(f"Seeded {len(products)} products.")

        # 1b. Seed Circular B2B Buyers
        for b_data in SEED_BUYERS:
            b_obj = Buyer(
                name=b_data["name"],
                buyer_type=b_data["buyer_type"],
                target_components=b_data["target_components"],
                min_condition=b_data["min_condition"],
                bid_price_factor=b_data["bid_price_factor"],
                demand_rating=b_data["demand_rating"],
                location=b_data["location"],
            )
            db.add(b_obj)
        db.commit()
        print(f"Seeded {len(SEED_BUYERS)} B2B circular buyers.")

        # 2. Plan 52 Returns across the last 30 days
        # Distribution: 18 Resale, 13 Repair, 9 Refurbish, 7 Harvest, 5 Recycle
        pathways_plan = (
            ["Resale"] * 18 +
            ["Repair"] * 13 +
            ["Refurbish"] * 9 +
            ["Harvest"] * 7 +
            ["Recycle"] * 5
        )
        random.shuffle(pathways_plan)

        # 7 items specifically assigned to human review (~13.5%)
        human_review_indices = set(random.sample(range(52), len(HUMAN_REVIEW_SCENARIOS)))
        hr_scenarios_queue = list(HUMAN_REVIEW_SCENARIOS)

        # Reference base date: Today
        base_date = datetime(2026, 10, 29, 11, 30, 0)

        total_returns_count = 52
        for idx in range(total_returns_count):
            return_num = idx + 1
            ret_id = f"RET-2026-{return_num:04d}"
            prod = random.choice(products)
            pathway = pathways_plan[idx]

            # Date distribution: smooth 30-day timeline with slightly more volume in recent 10 days
            day_offset = int(random.triangular(0, 30, 8))
            hour_offset = random.randint(8, 19)
            min_offset = random.randint(0, 59)
            received_date = base_date - timedelta(days=day_offset, hours=hour_offset, minutes=min_offset)

            is_human_review = idx in human_review_indices
            hr_data = None
            if is_human_review:
                hr_data = hr_scenarios_queue.pop(0) if hr_scenarios_queue else None

            # Status determination:
            # - If human review: "Needs human review"
            # - If older than 5 days: 85% "Recovered", 15% "In progress"
            # - If within last 5 days: 40% "Recovered", 60% "In progress"
            if is_human_review:
                status = "Needs human review"
            elif day_offset > 5:
                status = "Recovered" if random.random() < 0.85 else "In progress"
            else:
                status = "Recovered" if random.random() < 0.40 else "In progress"

            # Create ReturnItem
            return_item = ReturnItem(
                id=ret_id,
                product_id=prod.id,
                return_reason=random.choice(RETURN_REASONS),
                received_date=received_date,
                status=status,
                needs_human_review=is_human_review,
                review_reason=hr_data["reason"] if hr_data else None,
                required_test=hr_data["required_test"] if hr_data else None,
                created_at=received_date
            )
            db.add(return_item)

            # Defects generation based on pathway (Universal across all product categories)
            defects_to_add = []
            if pathway == "Resale":
                # Very minor cosmetic or light surface scuff
                if random.random() < 0.6:
                    defects_to_add.append(("scratch", "minor", "Superficial hairline blemish on outer finish", random.uniform(92, 98)))
                else:
                    defects_to_add.append(("scratch", "minor", "Minor handling marks near connector / port", random.uniform(94, 99)))
            elif pathway == "Repair":
                # Targeted power, crack, or housing issue
                choice = random.choice(["battery fault", "crack", "dent"])
                if choice == "battery fault":
                    defects_to_add.append(("battery fault", "moderate", "Power unit / battery retention drop under operational load", random.uniform(85, 96)))
                elif choice == "crack":
                    defects_to_add.append(("crack", "minor", "Hairline fracture on outer casing / glass element", random.uniform(88, 97)))
                else:
                    defects_to_add.append(("dent", "minor", "Impact indentation on corner bevel / frame", random.uniform(86, 94)))
                    defects_to_add.append(("scratch", "minor", "Light surface abrasion across exterior finish", random.uniform(90, 96)))
            elif pathway == "Refurbish":
                defects_to_add.append(("dent", "moderate", "Noticeable indentation on chassis / enclosure", random.uniform(82, 92)))
                defects_to_add.append(("scratch", "moderate", "Deep abrasion marks across top exterior cover", random.uniform(84, 94)))
                if random.random() < 0.4:
                    defects_to_add.append(("battery fault", "minor", "Battery charge cycle degradation", random.uniform(80, 91)))
            elif pathway == "Harvest":
                defects_to_add.append(("crack", "severe", "Fractured structural housing with internal element exposure", random.uniform(89, 98)))
                defects_to_add.append(("missing part", "minor", "Missing OEM sub-assembly accessory or daughter ribbon", random.uniform(85, 95)))
                if random.random() < 0.5:
                    defects_to_add.append(("battery fault", "severe", "Swollen cell envelope or damaged power cell", random.uniform(90, 98)))
            else:  # Recycle
                defects_to_add.append(("crack", "severe", "Crushed structural module and broken substrate", random.uniform(95, 99)))
                defects_to_add.append(("dent", "severe", "Structural chassis torsion beyond allowable tolerance", random.uniform(92, 98)))
                defects_to_add.append(("missing part", "moderate", "Missing mainboard power IC and shielding", random.uniform(88, 97)))

            # If human review item with low defect confidence, override confidence
            if is_human_review and hr_data and hr_data["confidence"] < 65:
                defects_to_add[0] = (defects_to_add[0][0], defects_to_add[0][1], defects_to_add[0][2], hr_data["confidence"])

            for cat, sev, desc, conf in defects_to_add:
                d_obj = Defect(
                    return_id=ret_id,
                    category=cat,
                    severity=sev,
                    description=desc,
                    confidence=round(conf, 1),
                    detected_by="automated_cv" if conf > 70 else "manual_entry"
                )
                db.add(d_obj)

            # Recommendation generation
            rec_conf = hr_data["confidence"] if is_human_review and hr_data else (
                random.uniform(91, 98) if pathway == "Resale" else
                random.uniform(84, 94) if pathway == "Repair" else
                random.uniform(80, 91) if pathway == "Refurbish" else
                random.uniform(76, 88) if pathway == "Harvest" else
                random.uniform(85, 96)
            )

            # Value ratios based on pathway
            msrp = prod.msrp_inr
            if pathway == "Resale":
                pred_val = msrp * random.uniform(0.68, 0.78)
                est_cost = msrp * random.uniform(0.02, 0.05)
                reasoning = "Excellent mechanical & cosmetic state. Suitable for certified pre-owned direct resale."
            elif pathway == "Repair":
                pred_val = msrp * random.uniform(0.52, 0.64)
                est_cost = msrp * random.uniform(0.08, 0.15)
                reasoning = "Isolated component defect detected. Replacing targeted module yields optimal net margin."
            elif pathway == "Refurbish":
                pred_val = msrp * random.uniform(0.40, 0.50)
                est_cost = msrp * random.uniform(0.12, 0.20)
                reasoning = "Multi-surface wear requires casing renewal, battery replacement, and full validation."
            elif pathway == "Harvest":
                pred_val = msrp * random.uniform(0.22, 0.32)
                est_cost = msrp * random.uniform(0.04, 0.08)
                reasoning = "Main unit uneconomical to restore, but high-value camera, RAM, and sub-assemblies viable."
            else:  # Recycle
                pred_val = msrp * random.uniform(0.06, 0.12)
                est_cost = msrp * random.uniform(0.01, 0.03)
                reasoning = "End-of-life status. Route to certified R2/e-Stewards shredding and precious metals extraction."

            recommendation = Recommendation(
                return_id=ret_id,
                pathway=pathway,
                confidence=round(rec_conf, 1),
                predicted_value_inr=round(pred_val, 0),
                estimated_cost_inr=round(est_cost, 0),
                reasoning=reasoning,
                generated_at=received_date + timedelta(minutes=15)
            )
            db.add(recommendation)

            # Recovery Outcome generation (for Recovered returns)
            if status == "Recovered":
                # Real-world variation: actual value deviates slightly (-8% to +6%) from predicted
                variance = random.uniform(0.92, 1.05)
                actual_val = pred_val * variance
                actual_cost = est_cost * random.uniform(0.95, 1.10)
                waste_diverted = prod.weight_kg * (
                    0.98 if pathway == "Resale" else
                    0.94 if pathway == "Repair" else
                    0.90 if pathway == "Refurbish" else
                    0.75 if pathway == "Harvest" else
                    0.88  # Material recycled divert from landfill
                )

                completed_date = received_date + timedelta(days=random.randint(1, 4), hours=random.randint(1, 8))
                outcome = RecoveryOutcome(
                    return_id=ret_id,
                    actual_pathway=pathway,
                    actual_value_inr=round(actual_val, 0),
                    refurbish_cost_inr=round(actual_cost, 0),
                    waste_diverted_kg=round(waste_diverted, 3),
                    completed_at=completed_date,
                    notes=f"Recovery pipeline closed via {pathway}. Quality QA check passed."
                )
                db.add(outcome)

        # 3. Canonical Hackathon Demo Cases (Steps 1 to 7 Scenarios)
        canonical_demos = [
            {
                "id": "REL-DEMO-001",
                "product_id": "PRD-LPT-002",  # MacBook Pro 14
                "purchase_price": 169900.0,
                "age_months": 7,
                "reason": "Display cracked during transit",
                "customer_issue": "Internal display shattered, chassis otherwise pristine",
                "status": "In progress",
                "needs_human_review": False,
                "image": "laptop_cracked_screen.jpg",
                "defects": [
                    ("crack", "high", "Radiating fracture across display panel; digitizer broken", 94.6, 0.15, 0.18, 0.65, 0.55),
                    ("scratch", "low", "Minor chassis bevel scuff", 88.0, 0.08, 0.78, 0.25, 0.12)
                ],
                "tests": {
                    "powers_on": "pass",
                    "display_ok": "fail",
                    "battery_health_pct": 91,
                    "battery_test": "pass",
                    "motherboard_ok": "pass",
                    "ram_ok": "pass",
                    "storage_ok": "pass",
                    "ports_ok": "pass"
                },
                "recommended_pathway": "Repair",
                "confidence": 91.2,
                "winner_rationale": "Repair recommended: Modular display replacement restores full secondary value (NRV: ₹78,250).",
            },
            {
                "id": "REL-DEMO-002",
                "product_id": "PRD-PHN-001",  # iPhone 14 Pro
                "purchase_price": 119900.0,
                "age_months": 14,
                "reason": "Battery thermal throttling / fast discharge",
                "customer_issue": "Shuts down unexpectedly at 30% battery",
                "status": "In progress",
                "needs_human_review": False,
                "image": "phone_scratched_back.jpg",
                "defects": [
                    ("scratch", "low", "Surface scratches on rear oleophobic coating", 92.5, 0.18, 0.22, 0.44, 0.38)
                ],
                "tests": {
                    "powers_on": "pass",
                    "display_ok": "pass",
                    "battery_health_pct": 62,
                    "battery_test": "fail",
                    "motherboard_ok": "pass",
                    "ram_ok": "pass",
                    "storage_ok": "pass",
                    "ports_ok": "pass"
                },
                "recommended_pathway": "Repair",
                "confidence": 88.5,
                "winner_rationale": "Direct Resale blocked by safety override (battery health 62% < 70%). Battery replacement repair recommended.",
            },
            {
                "id": "REL-DEMO-003",
                "product_id": "PRD-LPT-003",  # Dell XPS 15
                "purchase_price": 145000.0,
                "age_months": 48,
                "reason": "Dead unit; electrical liquid surge",
                "customer_issue": "Liquid spill on keyboard; smoke observed",
                "status": "In progress",
                "needs_human_review": False,
                "image": "laptop_cracked_screen.jpg",
                "defects": [
                    ("crack", "high", "Chassis impact fracture and board deformation", 96.0, 0.10, 0.10, 0.80, 0.80)
                ],
                "tests": {
                    "powers_on": "fail",
                    "display_ok": "fail",
                    "battery_health_pct": 20,
                    "battery_test": "fail",
                    "motherboard_ok": "fail",
                    "ram_ok": "fail",
                    "storage_ok": "unknown",
                    "ports_ok": "fail"
                },
                "recommended_pathway": "Recycling",
                "confidence": 95.0,
                "winner_rationale": "Recycling recommended: Unrecoverable motherboard failure and high repair costs preclude economic restoration.",
            },
            {
                "id": "REL-DEMO-004",
                "product_id": "PRD-LPT-001",  # MacBook Air M2
                "purchase_price": 114900.0,
                "age_months": 2,
                "reason": "Buyer remorse / incorrect color",
                "customer_issue": "Box opened once, zero usage marks",
                "status": "Recovered",
                "needs_human_review": False,
                "image": "laptop_clean_pristine.jpg",
                "defects": [],
                "tests": {
                    "powers_on": "pass",
                    "display_ok": "pass",
                    "battery_health_pct": 100,
                    "battery_test": "pass",
                    "motherboard_ok": "pass",
                    "ram_ok": "pass",
                    "storage_ok": "pass",
                    "ports_ok": "pass"
                },
                "recommended_pathway": "Direct Resale",
                "confidence": 97.5,
                "winner_rationale": "Direct Resale optimal: Pristine condition and 100% battery health yields maximum recovery value (₹86,175) in 1 day.",
            },
            {
                "id": "REL-DEMO-005",
                "product_id": "PRD-PHN-004",  # Pixel 7 Pro
                "purchase_price": 72900.0,
                "age_months": 10,
                "reason": "Handheld photo upload blurry; diagnostic incomplete",
                "customer_issue": "Camera lens blur; internal diagnostic unknown",
                "status": "Needs human review",
                "needs_human_review": True,
                "image": "blurry_camera_photo.jpg",
                "defects": [
                    ("scratch", "low", "Faint surface marking obscured by motion blur", 54.2, 0.25, 0.30, 0.40, 0.35)
                ],
                "tests": {
                    "powers_on": "pass",
                    "display_ok": "unknown",
                    "battery_health_pct": -1,
                    "battery_test": "unknown",
                    "motherboard_ok": "unknown",
                    "ram_ok": "pass",
                    "storage_ok": "pass",
                    "ports_ok": "unknown"
                },
                "recommended_pathway": "Repair",
                "confidence": 56.4,
                "winner_rationale": "Human review required: Low image confidence (54.2%) and unknown electrical tests. Route to technician bench.",
            }
        ]

        now = datetime.utcnow()
        for c in canonical_demos:
            passport_url = f"/passport/{c['id']}"
            qr_url = make_qr_data_url(f"http://localhost:3000{passport_url}")

            r_item = ReturnItem(
                id=c["id"],
                product_id=c["product_id"],
                purchase_price=c["purchase_price"],
                age_months=c["age_months"],
                return_reason=c["reason"],
                warranty_status="Active",
                customer_issue=c["customer_issue"],
                received_date=now - timedelta(hours=random.randint(2, 48)),
                status=c["status"],
                needs_human_review=c["needs_human_review"],
                review_reason="Optical blur & unknown tests" if c["needs_human_review"] else None,
                required_test="Execute bench diagnostic for unknown tests" if c["needs_human_review"] else None,
                qr_code_data=qr_url,
                qr_code_url=passport_url,
                created_at=now - timedelta(hours=random.randint(2, 48))
            )
            db.add(r_item)
            db.flush()

            # Inspection
            insp = Inspection(
                return_id=c["id"],
                image_url=f"/api/inspections/image/{c['image']}",
                image_count=1,
                is_blurry="blurry" in c["image"],
                blur_score=45.0 if "blurry" in c["image"] else 185.0,
                quality_flag="Low Quality (Blurry)" if "blurry" in c["image"] else "Pass",
                model_version="YOLOv8-ReLife-Simulated-v1.0",
                inspected_at=now
            )
            db.add(insp)
            db.flush()

            # Defects
            for d in c["defects"]:
                db.add(Defect(
                    inspection_id=insp.id,
                    return_id=c["id"],
                    defect_type=d[0],
                    severity=d[1],
                    description=d[2],
                    confidence=d[3],
                    bbox_x=d[4],
                    bbox_y=d[5],
                    bbox_w=d[6],
                    bbox_h=d[7],
                    is_simulated=True,
                    detected_by="opencv_yolo_fallback"
                ))

            # Functional Tests
            db.add(FunctionalTest(
                return_id=c["id"],
                powers_on=c["tests"]["powers_on"],
                display_ok=c["tests"]["display_ok"],
                battery_health_pct=c["tests"]["battery_health_pct"],
                battery_test=c["tests"]["battery_test"],
                motherboard_ok=c["tests"]["motherboard_ok"],
                ram_ok=c["tests"]["ram_ok"],
                storage_ok=c["tests"]["storage_ok"],
                ports_ok=c["tests"]["ports_ok"],
                overall_condition_score=78.0 if not c["needs_human_review"] else 50.0,
                has_unknown_test=c["needs_human_review"],
                tested_at=now
            ))

            # Recommendation
            db.add(Recommendation(
                return_id=c["id"],
                selected_pathway=c["recommended_pathway"],
                confidence_overall=c["confidence"],
                confidence_detection=c["confidence"],
                confidence_condition=c["confidence"],
                winner_rationale=c["winner_rationale"],
                fallback_rationale="Alternative pathways evaluated against profitability and carbon diversion constraints.",
                human_review_required=c["needs_human_review"],
                required_tests="Optical high-res capture, battery impedance test" if c["needs_human_review"] else "None",
                generated_at=now
            ))

        # 4. Seed Harvestable Components for Component Marketplace
        sample_components = [
            {"return_id": "REL-DEMO-001", "type": "display", "cond": "Grade A", "val": 22500, "harvested": False},
            {"return_id": "REL-DEMO-001", "type": "motherboard", "cond": "Grade A", "val": 38000, "harvested": False},
            {"return_id": "REL-DEMO-001", "type": "RAM", "cond": "Grade A", "val": 8500, "harvested": False},
            {"return_id": "REL-DEMO-001", "type": "storage", "cond": "Grade A", "val": 6500, "harvested": False},
            {"return_id": "REL-DEMO-002", "type": "display", "cond": "Grade A", "val": 18500, "harvested": False},
            {"return_id": "REL-DEMO-002", "type": "camera_module", "cond": "Grade A", "val": 12000, "harvested": False},
            {"return_id": "REL-DEMO-002", "type": "motherboard", "cond": "Grade A", "val": 28000, "harvested": False},
            {"return_id": "REL-DEMO-003", "type": "display", "cond": "Grade B", "val": 12500, "harvested": True, "buyer_id": 1},
            {"return_id": "REL-DEMO-003", "type": "battery", "cond": "Defective", "val": 1200, "harvested": True, "buyer_id": 3},
            {"return_id": "REL-DEMO-005", "type": "display", "cond": "Grade B", "val": 9800, "harvested": False},
            {"return_id": "REL-DEMO-005", "type": "camera_module", "cond": "Grade A", "val": 7500, "harvested": False},
        ]
        for sc in sample_components:
            comp_obj = Component(
                return_id=sc["return_id"],
                component_type=sc["type"],
                condition=sc["cond"],
                estimated_value=sc["val"],
                is_harvested=sc["harvested"],
                buyer_match_id=sc.get("buyer_id")
            )
            db.add(comp_obj)

        # 5. Seed Outcome for REL-DEMO-004 (Pristine resale completed)
        db.add(RecoveryOutcome(
            return_id="REL-DEMO-004",
            actual_pathway="Direct Resale",
            actual_revenue=88500.0,
            actual_cost=1500.0,
            refurbish_cost_inr=1500.0,
            actual_value_inr=88500.0,
            actual_time_days=1,
            waste_diverted_kg=1.21,
            notes="Direct resale through enterprise certified outlet completed within 24 hours.",
            completed_at=now - timedelta(days=1)
        ))

        db.commit()
        print(f"Successfully seeded {total_returns_count} returns + {len(canonical_demos)} canonical demo cases + {len(sample_components)} marketplace components.")

    except Exception as e:
        db.rollback()
        print(f"Error seeding database: {e}")
        raise
    finally:
        db.close()


if __name__ == "__main__":
    seed_database()

