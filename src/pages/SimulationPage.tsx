import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useSimulation } from '../context/SimulationContext';
import { CommandHeader } from '../components/command/CommandHeader';
import { CrisisPanel } from '../components/command/CrisisPanel';
import { Activity, ArrowRight, Sparkles, Layers, ShieldCheck, Zap } from 'lucide-react';

export const SimulationPage: React.FC = () => {
  const navigate = useNavigate();
  const { 
    state, 
    triggerScenario, 
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
        {/* Navigation Breadcrumb */}
        <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight uppercase">
                Crisis Simulation Suite
              </h1>
              <span className="px-2 py-0.5 rounded-full bg-cyan-950/80 border border-cyan-500/50 text-cyan-300 font-mono text-[10px] font-bold uppercase">
                6 FAILURE MODELS
              </span>
            </div>
            <p className="text-xs font-mono text-slate-400 mt-1">
              Select and trigger real-time hydrological disruptions across <span className="text-cyan-300 font-bold">{currentLocation.name}</span>
            </p>
          </div>

          <button
            onClick={() => navigate('/command-center')}
            className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-slate-950 font-mono font-bold text-xs uppercase shadow-glow-cyan transition-all"
          >
            <span>Open 3D Command Center</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        {/* Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Crisis Matrix Panel */}
          <div className="lg:col-span-2">
            <div className="p-6 rounded-2xl border border-cyan-500/20 bg-[#040c1a]/90 backdrop-blur-xl shadow-2xl">
              <CrisisPanel 
                onTriggerScenario={(type) => {
                  triggerScenario(type);
                  navigate('/command-center');
                }}
                activeScenario={state.currentScenario}
                isIncidentActive={state.activeIncident}
              />
            </div>
          </div>

          {/* Simulation Architecture Sidebar */}
          <div className="space-y-4 font-mono text-xs">
            <div className="p-5 rounded-2xl border border-cyan-500/20 bg-[#040c1a]/90 backdrop-blur-xl shadow-2xl space-y-3">
              <div className="text-white font-bold uppercase tracking-wider flex items-center gap-2 text-xs">
                <Activity className="w-4 h-4 text-cyan-400" />
                SIMULATION ARCHITECTURE
              </div>
              <p className="text-slate-300 text-[11px] leading-relaxed font-sans">
                JalSetu executes physical mass-balance equations continuously across 5 discrete consumption nodes and a 30,000 L cylindrical gravity reservoir.
              </p>
              <div className="p-3 rounded-xl bg-[#020712] border border-cyan-500/20 space-y-1.5 text-[11px] text-cyan-300">
                <div className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-cyan-400" />
                  <span>Time Step: 100ms discrete simulation tick</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-cyan-400" />
                  <span>Hydraulic Head: Hazen-Williams friction loss</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-cyan-400" />
                  <span>Zero-Hardware: 100% in-browser digital twin</span>
                </div>
              </div>
            </div>

            <div className="p-5 rounded-2xl border border-cyan-500/30 bg-gradient-to-b from-cyan-950/40 to-[#040c1a] shadow-glow-cyan/10 space-y-3">
              <div className="text-white font-bold text-xs uppercase flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-cyan-400" />
                AUTOMATED HERO STORY
              </div>
              <p className="text-slate-300 text-[11px] font-sans leading-relaxed">
                Experience the complete 3-minute hackathon story: main pipeline rupture, Bedrock AI remediation synthesis, Step Functions state machine execution, and post-crisis stabilization.
              </p>
              <button
                onClick={() => {
                  runHeroDemo();
                  navigate('/command-center');
                }}
                className="w-full py-3 px-4 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-slate-950 font-bold text-xs uppercase shadow-glow-cyan transition-all flex items-center justify-center gap-2 active:scale-95"
              >
                <span>Launch Hero Sequence</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};
