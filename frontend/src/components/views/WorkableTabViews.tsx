'use client';

import React, { useState } from 'react';
import { useNavigation } from '../../context/NavigationContext';
import { Card } from '../ui/Card';
import { formatINR, formatKg } from '../../lib/formatters';
import {
  ScanEye,
  Sparkles,
  ShoppingBag,
  CheckCircle2,
  FileBarChart2,
  Settings,
  PlusCircle,
  ArrowLeft,
  CheckCircle,
  ShieldCheck,
  Download,
  Sliders,
  Camera,
  RefreshCw,
  Box,
  Truck,
  Layers,
  Award,
} from 'lucide-react';

interface WorkableTabViewsProps {
  onOpenIntake: () => void;
}

export function WorkableTabViews({ onOpenIntake }: WorkableTabViewsProps) {
  const { activeTab, setActiveTab } = useNavigation();

  if (activeTab === 'dashboard') return null;

  return (
    <div className="space-y-6 animate-in fade-in duration-150">
      {/* Top Banner Navigation */}
      <div className="flex items-center justify-between pb-3 border-b border-slate-200">
        <button
          onClick={() => setActiveTab('dashboard')}
          className="flex items-center gap-2 text-xs font-bold text-[#073E2E] hover:underline"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Main Dashboard</span>
        </button>

        <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider font-mono">
          ReLife Module • {activeTab.toUpperCase()}
        </span>
      </div>

      {activeTab === 'register' && (
        <div className="space-y-6">
          <div className="p-6 rounded-3xl bg-gradient-to-r from-[#073E2E] to-emerald-800 text-white shadow-xl flex items-center justify-between">
            <div className="space-y-2">
              <span className="text-xs font-bold uppercase tracking-wider text-emerald-200 font-mono">
                Intake Gateway
              </span>
              <h2 className="text-2xl font-bold font-sans">
                Universal Product Registration & Triage
              </h2>
              <p className="text-xs text-emerald-100/90 max-w-xl">
                Ingest returned products across all categories. Capture device serials, run automated optical defect categorization, and instantly route into the circular recovery pipeline.
              </p>
            </div>
            <button
              onClick={onOpenIntake}
              className="flex items-center gap-2 px-5 py-3 rounded-2xl bg-white text-[#073E2E] font-bold text-xs shadow-lg hover:bg-emerald-50 transition-all shrink-0"
            >
              <PlusCircle className="w-4 h-4" />
              <span>Launch Quick Intake Form</span>
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card title="Barcode & Serial Scanning">
              <div className="p-6 border-2 border-dashed border-emerald-200 rounded-2xl flex flex-col items-center justify-center text-center space-y-3">
                <Camera className="w-10 h-10 text-[#073E2E]" />
                <div>
                  <p className="font-bold text-xs text-slate-800">Laser Scanner Ready</p>
                  <p className="text-[11px] text-slate-400 mt-0.5">Position barcode or IMEI under scanner</p>
                </div>
                <button
                  onClick={onOpenIntake}
                  className="px-4 py-1.5 rounded-xl bg-[#073E2E] text-white text-xs font-semibold"
                >
                  Simulate Scan
                </button>
              </div>
            </Card>

            <Card title="Automated CV Vision Grading">
              <div className="space-y-3 text-xs">
                <div className="flex justify-between items-center py-1.5 border-b border-slate-100">
                  <span className="text-slate-500">Optical Resolution:</span>
                  <span className="font-mono font-bold text-slate-800">48 MP Multi-Angle</span>
                </div>
                <div className="flex justify-between items-center py-1.5 border-b border-slate-100">
                  <span className="text-slate-500">Classification Model:</span>
                  <span className="font-mono font-bold text-emerald-700">ReLife-Vision v3.2</span>
                </div>
                <div className="flex justify-between items-center py-1.5 border-b border-slate-100">
                  <span className="text-slate-500">Inference Latency:</span>
                  <span className="font-mono font-bold text-slate-800">142 ms / item</span>
                </div>
              </div>
            </Card>

            <Card title="Compliance & Audit Trail">
              <div className="space-y-2 text-xs">
                <div className="flex items-center gap-2 text-emerald-700 font-semibold">
                  <ShieldCheck className="w-4 h-4" />
                  <span>R2v3 Certified Protocol Active</span>
                </div>
                <p className="text-[11px] text-slate-500 leading-relaxed">
                  Every intake registers an immutable cryptographic audit record tracking receipt timestamp, initial defect state, and chain-of-custody.
                </p>
              </div>
            </Card>
          </div>
        </div>
      )}

      {activeTab === 'inspections' && (
        <div className="space-y-6">
          <Card title="Computer Vision Defect Inspection Workbench">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
              <div className="lg:col-span-7 bg-slate-900 rounded-2xl p-6 relative overflow-hidden min-h-[320px] flex flex-col justify-between text-white">
                <div className="flex justify-between items-center text-xs">
                  <span className="flex items-center gap-2 text-emerald-400 font-mono">
                    <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                    LIVE OPTICAL SENSOR FEED: CAM-04
                  </span>
                  <span className="text-slate-400 font-mono">1080p @ 60 FPS</span>
                </div>

                {/* Simulated Bounding Box */}
                <div className="self-center border-2 border-emerald-400 bg-emerald-400/10 p-4 rounded-xl w-64 text-center">
                  <span className="text-[10px] font-mono bg-emerald-400 text-slate-900 px-1.5 py-0.5 rounded font-bold">
                    DEFECT: Micro-scratch (Minor) - 96.4%
                  </span>
                  <div className="h-20 flex items-center justify-center text-slate-300 font-mono text-xs">
                    [Product Surface Scan]
                  </div>
                </div>

                <div className="flex justify-between items-center text-xs pt-2 border-t border-slate-800">
                  <span>Surface Planarity: 0.02 mm</span>
                  <span>Thermal Load: 31.4°C (Nominal)</span>
                </div>
              </div>

              <div className="lg:col-span-5 space-y-4 text-xs">
                <h4 className="font-bold text-slate-900">Diagnostic Inspection Tools</h4>
                <div className="space-y-2">
                  <button
                    onClick={() => alert('Triggered multi-angle strobe re-scan!')}
                    className="w-full flex items-center justify-between p-3 rounded-xl border border-slate-200 hover:bg-slate-50 font-semibold"
                  >
                    <span>Trigger Multi-Angle Strobe Scan</span>
                    <RefreshCw className="w-4 h-4 text-[#073E2E]" />
                  </button>
                  <button
                    onClick={() => alert('Laser micrometer planarity verification completed: PASS')}
                    className="w-full flex items-center justify-between p-3 rounded-xl border border-slate-200 hover:bg-slate-50 font-semibold"
                  >
                    <span>Run Laser Planarity Verification</span>
                    <ShieldCheck className="w-4 h-4 text-[#073E2E]" />
                  </button>
                  <button
                    onClick={() => alert('Acoustic stethoscope vibration check: Normal')}
                    className="w-full flex items-center justify-between p-3 rounded-xl border border-slate-200 hover:bg-slate-50 font-semibold"
                  >
                    <span>Acoustic Vibration & Bearing Check</span>
                    <Award className="w-4 h-4 text-[#073E2E]" />
                  </button>
                </div>
              </div>
            </div>
          </Card>
        </div>
      )}

      {activeTab === 'recommendations' && (
        <div className="space-y-6">
          <Card title="Autonomous Circular Pathway Routing Matrix">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead>
                  <tr className="border-b border-slate-100 text-slate-400 uppercase text-[10px] font-semibold">
                    <th className="py-3 px-3">Circular Pathway</th>
                    <th className="py-3 px-3">Qualification Criteria</th>
                    <th className="py-3 px-3">Target Recovery Yield</th>
                    <th className="py-3 px-3">Avg Net Margin</th>
                    <th className="py-3 px-3 text-right">E-Waste Avoidance</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  <tr>
                    <td className="py-3 px-3 font-bold text-emerald-800">1. Resale</td>
                    <td className="py-3 px-3">Flawless or minor cosmetic handling wear</td>
                    <td className="py-3 px-3 font-mono">75% - 85% MSRP</td>
                    <td className="py-3 px-3 font-bold text-emerald-700">+68%</td>
                    <td className="py-3 px-3 text-right font-mono">98% saved</td>
                  </tr>
                  <tr>
                    <td className="py-3 px-3 font-bold text-sky-800">2. Repair</td>
                    <td className="py-3 px-3">Single component failure (battery, port, display)</td>
                    <td className="py-3 px-3 font-mono">55% - 65% MSRP</td>
                    <td className="py-3 px-3 font-bold text-sky-700">+48%</td>
                    <td className="py-3 px-3 text-right font-mono">94% saved</td>
                  </tr>
                  <tr>
                    <td className="py-3 px-3 font-bold text-amber-800">3. Refurbish</td>
                    <td className="py-3 px-3">Multi-surface scuffs, casing and cell replacement</td>
                    <td className="py-3 px-3 font-mono">40% - 50% MSRP</td>
                    <td className="py-3 px-3 font-bold text-amber-700">+34%</td>
                    <td className="py-3 px-3 text-right font-mono">90% saved</td>
                  </tr>
                  <tr>
                    <td className="py-3 px-3 font-bold text-purple-800">4. Harvest</td>
                    <td className="py-3 px-3">Uneconomical full repair; extract camera, chips, RAM</td>
                    <td className="py-3 px-3 font-mono">25% - 35% MSRP</td>
                    <td className="py-3 px-3 font-bold text-purple-700">+22%</td>
                    <td className="py-3 px-3 text-right font-mono">75% saved</td>
                  </tr>
                  <tr>
                    <td className="py-3 px-3 font-bold text-rose-800">5. Recycle</td>
                    <td className="py-3 px-3">End-of-life status; certified precious metals recovery</td>
                    <td className="py-3 px-3 font-mono">8% - 14% MSRP</td>
                    <td className="py-3 px-3 font-bold text-slate-700">+8%</td>
                    <td className="py-3 px-3 text-right font-mono">88% smelted</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </Card>
        </div>
      )}

      {activeTab === 'marketplace' && (
        <div className="space-y-6">
          <Card
            title="B2B Certified Refurbished & Resale Exchange"
            action={
              <button
                onClick={() => alert('B2B Inventory Manifest exported!')}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-[#073E2E] text-white text-xs font-semibold"
              >
                <Download className="w-3.5 h-3.5" />
                <span>Export Manifest</span>
              </button>
            }
          >
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 pt-2">
              {[
                { name: 'Apple MacBook Air M2', cat: 'Laptops', grade: 'Grade A+', price: 79900, stock: 4 },
                { name: 'Sony PlayStation 5', cat: 'Gaming', grade: 'Grade A', price: 34990, stock: 6 },
                { name: 'Sony WH-1000XM5', cat: 'Audio', grade: 'Grade A+', price: 18990, stock: 8 },
                { name: 'Dyson V15 Cordless Vacuum', cat: 'Appliances', grade: 'Grade A', price: 38900, stock: 3 },
                { name: 'Samsung Galaxy S23 Ultra', cat: 'Smartphones', grade: 'Grade A+', price: 68900, stock: 5 },
                { name: 'DJI Mini 4 Pro Drone', cat: 'Drones', grade: 'Grade A', price: 54900, stock: 2 },
              ].map((prod, i) => (
                <div key={i} className="p-4 rounded-2xl bg-slate-50 border border-slate-100 flex flex-col justify-between">
                  <div>
                    <div className="flex justify-between items-center mb-1">
                      <span className="text-[10px] font-bold text-slate-400 uppercase">{prod.cat}</span>
                      <span className="text-[10px] font-bold text-emerald-800 bg-emerald-100 px-2 py-0.5 rounded-full">
                        {prod.grade}
                      </span>
                    </div>
                    <h5 className="font-bold text-xs text-slate-900">{prod.name}</h5>
                    <p className="text-base font-extrabold text-[#073E2E] mt-2">{formatINR(prod.price, false)}</p>
                    <p className="text-[10px] text-slate-400">Available: {prod.stock} units</p>
                  </div>
                  <button
                    onClick={() => alert(`Allocated purchase order for ${prod.name}`)}
                    className="mt-3 w-full py-1.5 rounded-xl border border-slate-200 hover:bg-slate-200/50 text-xs font-semibold text-slate-700"
                  >
                    Place Batch Order
                  </button>
                </div>
              ))}
            </div>
          </Card>
        </div>
      )}

      {activeTab === 'outcomes' && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            <Card title="Total Financial Recovery">
              <span className="text-3xl font-extrabold text-[#073E2E]">₹18,09,550</span>
              <p className="text-[11px] text-emerald-700 mt-1 font-semibold">+18.2% vs previous period</p>
            </Card>

            <Card title="E-Waste Diverted">
              <span className="text-3xl font-extrabold text-[#073E2E]">26.8 kg</span>
              <p className="text-[11px] text-emerald-700 mt-1 font-semibold">Zero hazardous landfill discharge</p>
            </Card>

            <Card title="Circularity Efficiency">
              <span className="text-3xl font-extrabold text-[#073E2E]">71.2%</span>
              <p className="text-[11px] text-emerald-700 mt-1 font-semibold">Validated R2v3 audit compliance</p>
            </Card>
          </div>

          <Card
            title="Closed-Loop Financial Audit Ledger"
            action={
              <button
                onClick={() => alert('Certificate of Destruction & Diversion downloaded!')}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-[#073E2E] text-white text-xs font-semibold"
              >
                <Download className="w-3.5 h-3.5" />
                <span>Download ESG Certificate</span>
              </button>
            }
          >
            <p className="text-xs text-slate-500 py-2">
              Every completed item has its financial recovery value confirmed by downstream buyers and certified recycling partners.
            </p>
          </Card>
        </div>
      )}

      {activeTab === 'reports' && (
        <div className="space-y-6">
          <Card title="Circular Economy ESG & Scope 3 Emissions Report">
            <div className="space-y-4 text-xs">
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-100">
                  <span className="text-[10px] font-bold text-emerald-800 uppercase">GHG Avoided</span>
                  <p className="text-2xl font-bold text-[#073E2E] mt-1">1,480 kg CO2e</p>
                  <p className="text-[10px] text-slate-500 mt-1">Manufacturing displacement</p>
                </div>
                <div className="p-4 rounded-2xl bg-sky-50 border border-sky-100">
                  <span className="text-[10px] font-bold text-sky-800 uppercase">Copper & Gold Salvaged</span>
                  <p className="text-2xl font-bold text-sky-900 mt-1">4.2 kg</p>
                  <p className="text-[10px] text-slate-500 mt-1">Precious metals returned to supply</p>
                </div>
                <div className="p-4 rounded-2xl bg-amber-50 border border-amber-100">
                  <span className="text-[10px] font-bold text-amber-800 uppercase">Lithium Protected</span>
                  <p className="text-2xl font-bold text-amber-900 mt-1">18.6 Ah</p>
                  <p className="text-[10px] text-slate-500 mt-1">Safely re-celled or recycled</p>
                </div>
              </div>

              <div className="pt-2 flex justify-end">
                <button
                  onClick={() => alert('Sustainability report exported!')}
                  className="px-4 py-2 rounded-xl bg-[#073E2E] text-white font-semibold text-xs flex items-center gap-1.5"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>Download Annual Circular Audit Report</span>
                </button>
              </div>
            </div>
          </Card>
        </div>
      )}

      {activeTab === 'settings' && (
        <div className="space-y-6">
          <Card title="Hub Configuration & AI Autonomous Triage Thresholds">
            <div className="space-y-4 text-xs max-w-xl">
              <div>
                <label className="block text-slate-800 font-bold mb-1">
                  Automated Triage Confidence Threshold (%)
                </label>
                <input
                  type="range"
                  min="50"
                  max="95"
                  defaultValue="65"
                  className="w-full accent-[#073E2E]"
                />
                <span className="text-[11px] text-slate-400 mt-0.5 block">
                  Items below 65% are routed to the human technician bench test queue.
                </span>
              </div>

              <div className="space-y-2 pt-2 border-t border-slate-100">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input type="checkbox" defaultChecked className="accent-[#073E2E]" />
                  <span className="text-slate-800 font-medium">
                    Automatically approve Grade A+ Resale without manual inspection
                  </span>
                </label>
                <label className="flex items-center gap-2 cursor-pointer">
                  <input type="checkbox" defaultChecked className="accent-[#073E2E]" />
                  <span className="text-slate-800 font-medium">
                    Enforce liquid ingress strip verification protocol on all returned hardware
                  </span>
                </label>
              </div>

              <div className="pt-2">
                <button
                  onClick={() => alert('Hub configuration saved successfully!')}
                  className="px-4 py-2 rounded-xl bg-[#073E2E] text-white font-semibold text-xs"
                >
                  Save Hub Settings
                </button>
              </div>
            </div>
          </Card>
        </div>
      )}
    </div>
  );
}

