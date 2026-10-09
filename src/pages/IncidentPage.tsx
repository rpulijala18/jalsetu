import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useSimulation } from '../context/SimulationContext';
import { CommandHeader } from '../components/command/CommandHeader';
import { IncidentPanel } from '../components/command/IncidentPanel';
import { ArrowLeft, ArrowRight, Cpu, ShieldCheck, Database, Radio } from 'lucide-react';

export const IncidentPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { 
    state, 
    incident, 
    analyzeWithAI, 
    isAnalyzing, 
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
        {/* Navigation Breadcrumb / Header */}
        <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
          <div className="flex items-center gap-3">
            <button
              onClick={() => navigate('/command-center')}
              className="p-2 rounded-xl border border-cyan-500/30 bg-[#061224] text-cyan-300 hover:bg-[#0a1e3a] transition-all shadow-sm"
              title="Return to 3D Command Center"
            >
              <ArrowLeft className="w-4 h-4" />
            </button>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight uppercase">
                  Incident Dispatch &bull; {id || 'JSL-104'}
                </h1>
                <span className="px-2 py-0.5 rounded-full bg-rose-950/80 border border-rose-500/50 text-rose-300 font-mono text-[10px] font-bold uppercase animate-pulse">
                  CRITICAL BREACH
                </span>
              </div>
              <p className="text-xs font-mono text-slate-400 mt-1">
                Telemetry log & emergency escalation threshold &bull; Ward: <span className="text-cyan-300">{currentLocation.name}</span>
              </p>
            </div>
          </div>

          <button
            onClick={() => navigate('/command-center')}
            className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-slate-950 font-mono font-bold text-xs uppercase shadow-glow-cyan transition-all"
          >
            <span>Return to 3D Twin</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        {/* Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Incident Card */}
          <div className="lg:col-span-2">
            <div className="p-6 rounded-2xl border border-cyan-500/20 bg-[#040c1a]/90 backdrop-blur-xl shadow-2xl">
              <IncidentPanel 
                incident={incident} 
                onAnalyze={async () => {
                  await analyzeWithAI();
                  navigate(`/response/${id || 'JSL-104'}`);
                }}
                isAnalyzing={isAnalyzing}
              />
            </div>
          </div>

          {/* AI Decision Pipeline Info Sidebar */}
          <div className="space-y-4 font-mono text-xs">
            <div className="p-5 rounded-2xl border border-cyan-500/20 bg-[#040c1a]/90 backdrop-blur-xl shadow-2xl space-y-3">
              <div className="text-white font-bold uppercase tracking-wider flex items-center gap-2 text-xs">
                <Cpu className="w-4 h-4 text-violet-400" />
                BEDROCK REASONING ENGINE
              </div>
              <p className="text-slate-300 text-[11px] leading-relaxed font-sans">
                Upon telemetry breach detection, sensor matrices across 5 discrete consumption nodes are bundled into structured JSON payloads and submitted to Amazon Bedrock Foundation Models for optimal contingency ranking.
              </p>
              <div className="p-3 rounded-xl border border-emerald-500/30 bg-emerald-950/20 text-emerald-300 text-[11px] font-semibold flex items-start gap-2 font-sans">
                <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <span>Deterministic Safety Rules guarantee hospital dialysis reserves are never rationed below life-critical threshold.</span>
              </div>
            </div>

            <div className="p-5 rounded-2xl border border-cyan-500/20 bg-[#040c1a]/90 backdrop-blur-xl shadow-2xl space-y-2.5">
              <div className="text-slate-300 font-bold uppercase text-[11px] flex items-center gap-1.5">
                <Database className="w-3.5 h-3.5 text-cyan-400" />
                TELEMETRY INGESTION STREAM
              </div>
              <div className="space-y-1.5 text-[11px] text-slate-400">
                <div className="flex justify-between p-2 rounded-lg bg-[#020712] border border-cyan-500/10">
                  <span>Trunk Feeder Flow:</span>
                  <span className="text-rose-400 font-bold">0 L/min (Fracture)</span>
                </div>
                <div className="flex justify-between p-2 rounded-lg bg-[#020712] border border-cyan-500/10">
                  <span>Junction Pressure:</span>
                  <span className="text-amber-400 font-bold">0.4 bar (Loss of Head)</span>
                </div>
                <div className="flex justify-between p-2 rounded-lg bg-[#020712] border border-cyan-500/10">
                  <span>Gravity Reservoir:</span>
                  <span className="text-cyan-300 font-bold">{state.tankLevel.toLocaleString()} L</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};
