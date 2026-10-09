import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useSimulation } from '../context/SimulationContext';
import { CommandHeader } from '../components/command/CommandHeader';
import { 
  CheckCircle2, 
  Droplets, 
  Users, 
  Building2, 
  Truck, 
  Clock, 
  ShieldCheck, 
  ArrowRight,
  TrendingUp,
  BarChart3,
  Award,
  Zap
} from 'lucide-react';

export const ImpactPage: React.FC = () => {
  const navigate = useNavigate();
  const { 
    state, 
    resetDemo, 
    runHeroDemo, 
    isDemoRunning,
    currentLocation 
  } = useSimulation();

  return (
    <div className="min-h-screen bg-[#020612] text-slate-100 flex flex-col font-sans select-none">
      <CommandHeader 
        state={state} 
        onReset={resetDemo} 
        onRunHeroDemo={runHeroDemo} 
        isDemoRunning={isDemoRunning}
      />

      <main className="flex-1 max-w-6xl w-full mx-auto px-6 py-8">
        {/* Banner: Crisis Contained */}
        <div className="p-8 rounded-2xl border border-emerald-500/40 bg-gradient-to-r from-emerald-950/40 via-[#04101e] to-[#030914] backdrop-blur-2xl shadow-[0_0_35px_rgba(16,185,129,0.15)] mb-8 flex flex-wrap items-center justify-between gap-6 font-mono">
          <div className="flex items-center gap-5">
            <div className="w-16 h-16 rounded-2xl border border-emerald-500/50 bg-emerald-950/80 flex items-center justify-center text-emerald-400 shadow-glow-emerald/30">
              <CheckCircle2 className="w-10 h-10 animate-pulse" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="px-2.5 py-0.5 rounded-full bg-emerald-950 border border-emerald-500/50 text-emerald-300 text-[10px] font-bold uppercase tracking-wider">
                  AUTONOMOUS RESOLUTION COMPLETE
                </span>
                <span className="text-xs text-slate-400">
                  Incident #{state.activeIncidentId || 'JSL-104'}
                </span>
              </div>
              <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight uppercase mt-1">
                CRISIS CONTAINED
              </h1>
              <p className="text-xs text-emerald-400/90 font-medium mt-0.5 font-sans">
                Zero hospital ICU deficit achieved &bull; Municipal water continuity secured in {currentLocation.name}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => navigate('/command-center')}
              className="flex items-center gap-2 px-5 py-3 rounded-xl bg-gradient-to-r from-emerald-500 via-teal-500 to-cyan-500 hover:from-emerald-400 hover:to-teal-400 text-slate-950 font-bold text-xs uppercase shadow-glow-emerald transition-all active:scale-95"
            >
              <span>View 3D Digital Twin</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* 6 Key Environmental Metrics */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3.5 mb-8 font-mono">
          <div className="p-4 rounded-xl border border-cyan-500/20 bg-[#040c1a]/90">
            <div className="text-[10px] text-slate-400 uppercase flex items-center gap-1 font-semibold">
              <Droplets className="w-3.5 h-3.5 text-cyan-400" /> WATER SAVED
            </div>
            <div className="font-extrabold text-2xl text-cyan-300 mt-2">
              9,400 L
            </div>
            <div className="text-[10px] text-emerald-400 font-bold mt-1 uppercase">
              Smart Valve Throttling
            </div>
          </div>

          <div className="p-4 rounded-xl border border-cyan-500/20 bg-[#040c1a]/90">
            <div className="text-[10px] text-slate-400 uppercase flex items-center gap-1 font-semibold">
              <Users className="w-3.5 h-3.5 text-sky-400" /> POPULATION SAFE
            </div>
            <div className="font-extrabold text-2xl text-white mt-2">
              1,240
            </div>
            <div className="text-[10px] text-slate-400 font-bold mt-1 uppercase">
              Zone A & B Clusters
            </div>
          </div>

          <div className="p-4 rounded-xl border border-cyan-500/20 bg-[#040c1a]/90">
            <div className="text-[10px] text-slate-400 uppercase flex items-center gap-1 font-semibold">
              <Building2 className="w-3.5 h-3.5 text-amber-400" /> CRITICAL HOSPITALS
            </div>
            <div className="font-extrabold text-2xl text-emerald-400 mt-2">
              100%
            </div>
            <div className="text-[10px] text-emerald-400 font-bold mt-1 uppercase">
              0 Liters Deficit
            </div>
          </div>

          <div className="p-4 rounded-xl border border-cyan-500/20 bg-[#040c1a]/90">
            <div className="text-[10px] text-slate-400 uppercase flex items-center gap-1 font-semibold">
              <Clock className="w-3.5 h-3.5 text-violet-400" /> TIME TO MITIGATION
            </div>
            <div className="font-extrabold text-2xl text-violet-300 mt-2">
              42 Sec
            </div>
            <div className="text-[10px] text-slate-400 font-bold mt-1 uppercase">
              From Rupture To Plan
            </div>
          </div>

          <div className="p-4 rounded-xl border border-cyan-500/20 bg-[#040c1a]/90">
            <div className="text-[10px] text-slate-400 uppercase flex items-center gap-1 font-semibold">
              <Truck className="w-3.5 h-3.5 text-amber-400" /> TANKER RELIEF
            </div>
            <div className="font-extrabold text-2xl text-amber-300 mt-2">
              8,000 L
            </div>
            <div className="text-[10px] text-amber-400 font-bold mt-1 uppercase">
              On-Target Dispatch
            </div>
          </div>

          <div className="p-4 rounded-xl border border-cyan-500/20 bg-[#040c1a]/90">
            <div className="text-[10px] text-slate-400 uppercase flex items-center gap-1 font-semibold">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" /> RESILIENCE SCORE
            </div>
            <div className="font-extrabold text-2xl text-emerald-400 mt-2">
              98 / 100
            </div>
            <div className="text-[10px] text-emerald-400 font-bold mt-1 uppercase">
              ISO-Community Tier 1
            </div>
          </div>
        </div>

        {/* Detailed Breakdown Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 font-mono text-xs">
          {/* Baseline vs Intervention Comparison */}
          <div className="p-6 rounded-2xl border border-cyan-500/20 bg-[#040c1a]/90 backdrop-blur-xl shadow-2xl space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-cyan-500/15">
              <span className="text-white font-bold uppercase flex items-center gap-2">
                <BarChart3 className="w-4 h-4 text-cyan-400" />
                CONVENTIONAL RESPONSE VS JALSETU AI
              </span>
              <span className="text-cyan-300 text-[10px]">COMPARISON</span>
            </div>

            <div className="space-y-3">
              <div className="p-3 rounded-xl bg-[#020712] border border-cyan-500/15">
                <div className="flex justify-between font-bold">
                  <span className="text-slate-400">Response Initiation:</span>
                  <div className="flex gap-4">
                    <span className="text-rose-400 line-through">4.5 Hours</span>
                    <span className="text-emerald-400">42 Seconds (JalSetu)</span>
                  </div>
                </div>
                <p className="text-[11px] text-slate-400 mt-1 font-sans">
                  Human manual inspection cycle vs Bedrock AI telemetry ingestion.
                </p>
              </div>

              <div className="p-3 rounded-xl bg-[#020712] border border-cyan-500/15">
                <div className="flex justify-between font-bold">
                  <span className="text-slate-400">Hospital ICU Continuity:</span>
                  <div className="flex gap-4">
                    <span className="text-rose-400">Deficit: -4,000 L</span>
                    <span className="text-emerald-400">Protected (0 Deficit)</span>
                  </div>
                </div>
                <p className="text-[11px] text-slate-400 mt-1 font-sans">
                  Deterministic safety barrier automatically reserves minimum dialysis quota.
                </p>
              </div>

              <div className="p-3 rounded-xl bg-[#020712] border border-cyan-500/15">
                <div className="flex justify-between font-bold">
                  <span className="text-slate-400">Uncontrolled Water Wastage:</span>
                  <div className="flex gap-4">
                    <span className="text-rose-400">12,500 L Lost</span>
                    <span className="text-emerald-400">3,100 L Contained</span>
                  </div>
                </div>
                <p className="text-[11px] text-slate-400 mt-1 font-sans">
                  Immediate automated upstream valve closure stops fracture spill.
                </p>
              </div>
            </div>
          </div>

          {/* Environmental Stewardship & SDG Alignment */}
          <div className="p-6 rounded-2xl border border-cyan-500/20 bg-[#040c1a]/90 backdrop-blur-xl shadow-2xl space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-cyan-500/15">
              <span className="text-white font-bold uppercase flex items-center gap-2">
                <Award className="w-4 h-4 text-emerald-400" />
                UN SDG 6: CLEAN WATER & SANITATION
              </span>
              <span className="text-emerald-400 text-[10px]">HEAT & WATER TRACK</span>
            </div>

            <div className="space-y-3 font-sans text-slate-300 text-xs">
              <p className="leading-relaxed">
                By synthesizing physical digital twins with autonomous AI orchestration, JalSetu eliminates the blind spots that turn standard infrastructure breakdowns into human humanitarian crises.
              </p>
              <div className="p-3.5 rounded-xl border border-cyan-500/20 bg-[#020712] space-y-2 font-mono text-[11px]">
                <div className="flex items-center gap-2 text-cyan-300 font-bold">
                  <Zap className="w-3.5 h-3.5 text-cyan-400" /> Target 6.4: Water-Use Efficiency
                </div>
                <p className="text-slate-400 font-sans">
                  Increases urban water resilience index by 38% through real-time demand balancing and rainwater harvesting diversion.
                </p>
              </div>
              <div className="p-3.5 rounded-xl border border-emerald-500/20 bg-[#020712] space-y-2 font-mono text-[11px]">
                <div className="flex items-center gap-2 text-emerald-300 font-bold">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" /> Target 11.5: Disaster Preparedness
                </div>
                <p className="text-slate-400 font-sans">
                  Protects vulnerable urban communities against heatwaves, droughts, and flash pipeline failures.
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};
