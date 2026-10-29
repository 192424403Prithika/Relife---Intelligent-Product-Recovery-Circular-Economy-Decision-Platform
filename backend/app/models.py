from datetime import datetime
from sqlalchemy import Column, String, Integer, Float, Boolean, DateTime, ForeignKey, Text
from sqlalchemy.orm import relationship
from .database import Base


class Product(Base):
    __tablename__ = "products"

    id = Column(String(32), primary_key=True, index=True)
    brand = Column(String(64), nullable=False)
    model = Column(String(128), nullable=False)
    category = Column(String(64), nullable=False, index=True)  # Universal product category (Laptop, Smartphone, Audio, Appliance, Gaming, etc.)
    msrp_inr = Column(Float, nullable=False, default=0.0)
    weight_kg = Column(Float, nullable=False, default=0.2)
    created_at = Column(DateTime, default=datetime.utcnow)

    # Relationships
    returns = relationship("ReturnItem", back_populates="product", cascade="all, delete-orphan")


class ReturnItem(Base):
    __tablename__ = "returns"

    id = Column(String(32), primary_key=True, index=True)
    product_id = Column(String(32), ForeignKey("products.id"), nullable=False, index=True)
    return_reason = Column(String(128), nullable=False)
    received_date = Column(DateTime, nullable=False, index=True)
    status = Column(String(32), nullable=False, default="In progress")  # Recovered | In progress | Needs human review
    needs_human_review = Column(Boolean, default=False, index=True)
    review_reason = Column(String(255), nullable=True)
    required_test = Column(String(255), nullable=True)
    created_at = Column(DateTime, default=datetime.utcnow)

    # Relationships
    product = relationship("Product", back_populates="returns")
    defects = relationship("Defect", back_populates="return_item", cascade="all, delete-orphan")
    recommendations = relationship("Recommendation", back_populates="return_item", cascade="all, delete-orphan")
    outcomes = relationship("RecoveryOutcome", back_populates="return_item", cascade="all, delete-orphan")


class Defect(Base):
    __tablename__ = "defects"

    id = Column(Integer, primary_key=True, autoincrement=True)
    return_id = Column(String(32), ForeignKey("returns.id"), nullable=False, index=True)
    category = Column(String(64), nullable=False, index=True)  # crack | dent | scratch | missing part | battery fault
    severity = Column(String(32), nullable=False, default="minor")  # minor | moderate | severe
    description = Column(String(255), nullable=False)
    confidence = Column(Float, nullable=False, default=90.0)
    detected_by = Column(String(32), default="automated_cv")

    return_item = relationship("ReturnItem", back_populates="defects")


class Recommendation(Base):
    __tablename__ = "recommendations"

    id = Column(Integer, primary_key=True, autoincrement=True)
    return_id = Column(String(32), ForeignKey("returns.id"), nullable=False, index=True)
    pathway = Column(String(32), nullable=False, index=True)  # Resale | Repair | Refurbish | Harvest | Recycle
    confidence = Column(Float, nullable=False, default=85.0)
    predicted_value_inr = Column(Float, nullable=False, default=0.0)
    estimated_cost_inr = Column(Float, nullable=False, default=0.0)
    reasoning = Column(Text, nullable=True)
    generated_at = Column(DateTime, default=datetime.utcnow)

    return_item = relationship("ReturnItem", back_populates="recommendations")


class RecoveryOutcome(Base):
    __tablename__ = "recovery_outcomes"

    id = Column(Integer, primary_key=True, autoincrement=True)
    return_id = Column(String(32), ForeignKey("returns.id"), nullable=False, index=True)
    actual_pathway = Column(String(32), nullable=False, index=True)
    actual_value_inr = Column(Float, nullable=False, default=0.0)
    refurbish_cost_inr = Column(Float, nullable=False, default=0.0)
    waste_diverted_kg = Column(Float, nullable=False, default=0.0)
    completed_at = Column(DateTime, default=datetime.utcnow)
    notes = Column(Text, nullable=True)

    return_item = relationship("ReturnItem", back_populates="outcomes")

