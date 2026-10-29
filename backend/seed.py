import random
from datetime import datetime, timedelta
from app.database import engine, SessionLocal, Base
from app.models import Product, ReturnItem, Defect, Recommendation, RecoveryOutcome

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

        db.commit()
        print(f"Successfully seeded {total_returns_count} returns with defects, recommendations, and outcomes.")

    except Exception as e:
        db.rollback()
        print(f"Error seeding database: {e}")
        raise
    finally:
        db.close()


if __name__ == "__main__":
    seed_database()

