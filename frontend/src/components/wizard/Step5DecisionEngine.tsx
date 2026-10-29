'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { ObjectiveWeights, EvaluateDecisionResponse, PathwayEvaluationItem } from '../../lib/types';
import { evaluateDecision } from '../../lib/api';
import { formatINR } from '../../lib/formatters';
import {
  Sliders,
  Award,
  ShieldAlert,
  ArrowRight,
  RefreshCw,
  TrendingUp,
  Clock,
  Leaf,
  AlertTriangle,
  CheckCircle2,
  SlidersHorizontal,
} from 'lucide-react';

interface Step5Props {
  returnId: string;
  onDecisionComplete: (data: EvaluateDecisionResponse) => void;
  decisionData: EvaluateDecisionResponse | null;
}

export function Step5DecisionEngine({
  returnId,
  onDecisionComplete,
  decisionData,
}: Step5Props) {
  const [weights, setWeights] = useState<ObjectiveWeights>({
    profit: 40,
    environment: 30,
    speed: 15,
    risk: 15,
  });

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [localData, setLocalData] = useState<EvaluateDecisionResponse | null>(decisionData);

  const runEvaluation = useCallback(
    async (currentWeights: ObjectiveWeights) => {
      if (!returnId) return;
      setIsLoading(true);
      setError(null);

      try {
        const res = await evaluateDecision(returnId, currentWeights);
        setLocalData(res);
        onDecisionComplete(res);
      } catch (err: any) {
        console.error('Decision evaluation failed:', err);
        setError(err.message || 'Decision engine failed.');
      } finally {
        setIsLoading(false);
      }
    },
    [returnId, onDecisionComplete]
  );

  useEffect(() => {
    runEvaluation(weights);
  }, []);

  const handleSliderChange = (key: keyof ObjectiveWeights, value: number) => {
    const updated = { ...weights, [key]: value };
    setWeights(updated);
    // Debounced or live re-evaluation
    runEvaluation(updated);
  };

  const handleWeightPreset = (preset: 'balanced' | 'max_profit' | 'eco_champion' | 'speed_run') => {
    let newWeights: ObjectiveWeights;
    if (preset === 'max_profit') {
      newWeights = { profit: 70, environment: 10, speed: 10, risk: 10 };
    } else if (preset === 'eco_champion') {
      newWeights = { profit: 20, environment: 60, speed: 10, risk: 10 };
    } else if (preset === 'speed_run') {
      newWeights = { profit: 25, environment: 15, speed: 50, risk: 10 };
    } else {
      newWeights = { profit: 40, environment: 30, speed: 15, risk: 15 };
    }
    setWeights(newWeights);
    runEvaluation(newWeights);
  };

  return (
    <div className="space-y-6">
      {/* Objective Weights Control Panel */}
      <div className="bg-[#12131A] border border-[#252836] rounded-2xl p-5 shadow-xl space-y-4">
        <div className="flex flex-wrap items-center justify-between pb-3 border-b border-[#1E202E] gap-2">
          <div className="flex items-center gap-2">
            <SlidersHorizontal className="w-5 h-5 text-[#FFC21A]" />
            <div>
              <h3 className="text-sm font-bold text-white">Multi-Objective Optimization Sliders</h3>
              <p className="text-[11px] text-slate-400">
                Adjust corporate priority weights; rankings and Net Recovery Values recalculate instantly.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-1.5">
            <button
              type="button"
              onClick={() => handleWeightPreset('balanced')}
              className="text-[10px] font-semibold px-2.5 py-1 rounded-lg bg-[#1E202E] text-slate-300 hover:text-white border border-[#252836]"
            >
              Balanced
            </button>
            <button
              type="button"
              onClick={() => handleWeightPreset('max_profit')}
              className="text-[10px] font-semibold px-2.5 py-1 rounded-lg bg-[#1E202E] text-[#FFC21A] hover:bg-[#252836] border border-[#FFC21A]/30"
            >
              Max Profit
            </button>
            <button
              type="button"
              onClick={() => handleWeightPreset('eco_champion')}
              className="text-[10px] font-semibold px-2.5 py-1 rounded-lg bg-[#1E202E] text-emerald-400 hover:bg-[#252836] border border-emerald-500/30"
            >
              Eco Champion
            </button>
            <button
              type="button"
              onClick={() => handleWeightPreset('speed_run')}
              className="text-[10px] font-semibold px-2.5 py-1 rounded-lg bg-[#1E202E] text-cyan-400 hover:bg-[#252836] border border-cyan-500/30"
            >
              Speed Turnaround
            </button>
          </div>
        </div>

        {/* Sliders Grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 pt-1">
          {/* Profit Weight */}
          <div className="bg-[#08080D] p-3 rounded-xl border border-[#252836] space-y-2">
            <div className="flex justify-between items-center text-xs">
              <span className="font-semibold text-white flex items-center gap-1.5">
                <TrendingUp className="w-3.5 h-3.5 text-[#FFC21A]" />
                Profitability
              </span>
              <span className="font-mono font-bold text-[#FFC21A]">{weights.profit}%</span>
            </div>
            <input
              type="range"
              min={0}
              max={100}
              step={5}
              value={weights.profit}
              onChange={(e) => handleSliderChange('profit', parseInt(e.target.value))}
              className="w-full accent-[#FFC21A] h-1.5 bg-[#1E202E] rounded cursor-pointer"
            />
          </div>

          {/* Environmental Weight */}
          <div className="bg-[#08080D] p-3 rounded-xl border border-[#252836] space-y-2">
            <div className="flex justify-between items-center text-xs">
              <span className="font-semibold text-white flex items-center gap-1.5">
                <Leaf className="w-3.5 h-3.5 text-emerald-400" />
                ESG / Carbon
              </span>
              <span className="font-mono font-bold text-emerald-400">{weights.environment}%</span>
            </div>
            <input
              type="range"
              min={0}
              max={100}
              step={5}
              value={weights.environment}
              onChange={(e) => handleSliderChange('environment', parseInt(e.target.value))}
              className="w-full accent-emerald-400 h-1.5 bg-[#1E202E] rounded cursor-pointer"
            />
          </div>

          {/* Speed Weight */}
          <div className="bg-[#08080D] p-3 rounded-xl border border-[#252836] space-y-2">
            <div className="flex justify-between items-center text-xs">
              <span className="font-semibold text-white flex items-center gap-1.5">
                <Clock className="w-3.5 h-3.5 text-cyan-400" />
                Turnaround Speed
              </span>
              <span className="font-mono font-bold text-cyan-400">{weights.speed}%</span>
            </div>
            <input
              type="range"
              min={0}
              max={100}
              step={5}
              value={weights.speed}
              onChange={(e) => handleSliderChange('speed', parseInt(e.target.value))}
              className="w-full accent-cyan-400 h-1.5 bg-[#1E202E] rounded cursor-pointer"
            />
          </div>

          {/* Risk Penalty */}
          <div className="bg-[#08080D] p-3 rounded-xl border border-[#252836] space-y-2">
            <div className="flex justify-between items-center text-xs">
              <span className="font-semibold text-white flex items-center gap-1.5">
                <ShieldAlert className="w-3.5 h-3.5 text-red-400" />
                Risk Aversion
              </span>
              <span className="font-mono font-bold text-red-400">{weights.risk}%</span>
            </div>
            <input
              type="range"
              min={0}
              max={100}
              step={5}
              value={weights.risk}
              onChange={(e) => handleSliderChange('risk', parseInt(e.target.value))}
              className="w-full accent-red-400 h-1.5 bg-[#1E202E] rounded cursor-pointer"
            />
          </div>
        </div>
      </div>

      {error && (
        <div className="p-3 rounded-xl bg-red-950/40 border border-red-500/40 text-red-300 text-xs flex items-center gap-2">
          <AlertTriangle className="w-4 h-4 shrink-0" />
          <span>{error}</span>
        </div>
      )}

      {/* Ranked Pathways Cards */}
      {localData && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h4 className="text-sm font-bold text-white flex items-center gap-2">
              <Award className="w-4 h-4 text-[#FFC21A]" />
              <span>Ranked Pathway Decisions (Hard Safety Constraints Enforced)</span>
            </h4>
            {isLoading && (
              <span className="text-xs text-[#FFC21A] flex items-center gap-1 font-mono">
                <RefreshCw className="w-3 h-3 animate-spin" />
                Re-scoring...
              </span>
            )}
          </div>

          <div className="grid grid-cols-1 gap-3">
            {localData.ranked_pathways.map((pathway: PathwayEvaluationItem, idx: number) => {
              const isWinner = pathway.rank === 1;

              return (
                <div
                  key={pathway.pathway}
                  className={`p-4 rounded-2xl border transition-all ${
                    pathway.is_safety_override
                      ? 'bg-red-950/20 border-red-500/30 opacity-75'
                      : isWinner
                      ? 'bg-gradient-to-r from-[#181926] via-[#1E202E] to-[#181926] border-[#FFC21A] shadow-xl ring-1 ring-[#FFC21A]/50'
                      : 'bg-[#12131A] border-[#252836] hover:border-slate-600'
                  }`}
                >
                  <div className="flex flex-wrap items-center justify-between gap-3">
                    <div className="flex items-center gap-3">
                      <div
                        className={`w-8 h-8 rounded-xl flex items-center justify-center font-bold text-xs font-mono shrink-0 ${
                          isWinner
                            ? 'bg-[#FFC21A] text-slate-950 shadow-md'
                            : pathway.is_safety_override
                            ? 'bg-red-950 text-red-400 border border-red-500/40'
                            : 'bg-[#1E202E] text-slate-300 border border-[#252836]'
                        }`}
                      >
                        #{pathway.rank}
                      </div>

                      <div>
                        <div className="flex items-center gap-2">
                          <span className="font-bold text-sm text-white">{pathway.pathway}</span>
                          {isWinner && (
                            <span className="px-2 py-0.5 rounded-full bg-[#FFC21A]/20 border border-[#FFC21A]/50 text-[#FFC21A] text-[10px] font-bold uppercase tracking-wider">
                              Optimal Recommendation
                            </span>
                          )}
                          {pathway.is_safety_override && (
                            <span className="px-2 py-0.5 rounded-full bg-red-950 border border-red-500 text-red-300 text-[10px] font-bold uppercase tracking-wider flex items-center gap-1">
                              <ShieldAlert className="w-3 h-3" />
                              Safety Override Blocked
                            </span>
                          )}
                        </div>

                        {pathway.override_reason ? (
                          <p className="text-[11px] text-red-400 font-medium mt-0.5">
                            Constraint: {pathway.override_reason}
                          </p>
                        ) : (
                          <p className="text-[11px] text-slate-400 mt-0.5">
                            Turnaround: {pathway.recovery_time_days} days • Risk Score: {pathway.risk_score} • Eco Score: {pathway.environmental_score}
                          </p>
                        )}
                      </div>
                    </div>

                    <div className="flex items-center gap-6 text-right">
                      <div>
                        <span className="text-[10px] text-slate-400 block">Weighted Score</span>
                        <span className="text-sm font-mono font-bold text-white">
                          {pathway.weighted_score.toFixed(1)} pts
                        </span>
                      </div>

                      <div>
                        <span className="text-[10px] text-slate-400 block">Expected Revenue</span>
                        <span className="text-xs font-mono text-emerald-400 font-semibold">
                          {formatINR(pathway.expected_revenue)}
                        </span>
                      </div>

                      <div>
                        <span className="text-[10px] text-slate-400 block">Net Recovery Value</span>
                        <span className={`text-base font-mono font-bold ${isWinner ? 'text-[#FFC21A]' : 'text-slate-200'}`}>
                          {formatINR(pathway.net_recovery_value)}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Rationale Callout Card */}
          <div className="p-4 rounded-xl bg-[#08080D] border border-[#252836] text-xs space-y-2">
            <div className="font-bold text-[#FFC21A] flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4" />
              <span>Engine Decision Rationale:</span>
            </div>
            <p className="text-slate-300 leading-relaxed">{localData.winner_rationale}</p>
          </div>
        </div>
      )}
    </div>
  );
}
