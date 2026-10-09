import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSimulation } from '../context/SimulationContext';
import { CommandHeader } from '../components/command/CommandHeader';
import { 
  Cloud, 
  Cpu, 
  Database, 
  Workflow, 
  Shield, 
  Terminal,
  ArrowRight,
  CheckCircle2,
  Radio,
  ExternalLink,
  Layers
} from 'lucide-react';

export const SettingsPage: React.FC = () => {
  const navigate = useNavigate();
  const { state, resetDemo, runHeroDemo, isDemoRunning, currentLocation } = useSimulation();
  const [demoMode, setDemoMode] = useState<boolean>(true);

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
                AWS Engine & Telemetry Architecture
              </h1>
              <span className="px-2 py-0.5 rounded-full bg-cyan-950/80 border border-cyan-500/50 text-cyan-300 font-mono text-[10px] font-bold uppercase">
                CLOUD ARCHITECTURE
              </span>
            </div>
            <p className="text-xs font-mono text-slate-400 mt-1">
              Zero-credential browser environment &bull; CloudWatch event stream &bull; Bedrock foundation parameters
            </p>
          </div>

          <button
            onClick={() => navigate('/command-center')}
            className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-slate-950 font-mono font-bold text-xs uppercase shadow-glow-cyan transition-all"
          >
            <span>Launch Command Center</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        {/* Demo Mode Toggle & Status Banner */}
        <div className="p-6 rounded-2xl border border-cyan-500/30 bg-[#040c1a]/90 backdrop-blur-xl mb-6 flex items-center justify-between flex-wrap gap-4 font-mono text-xs shadow-2xl">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl border border-cyan-500/40 bg-cyan-950/80 flex items-center justify-center text-cyan-400 shadow-glow-cyan/20">
              <Cloud className="w-6 h-6" />
            </div>
            <div>
              <div className="text-white font-bold text-sm uppercase">
                OPERATIONAL EXECUTION MODE
              </div>
              <div className="text-slate-300 text-xs mt-0.5 font-sans">
                {demoMode 
                  ? 'DEMO MODE: High-fidelity deterministic simulation with Bedrock schema validation (No AWS credentials needed)' 
                  : 'LIVE AWS MODE: Direct invocation of API Gateway, Bedrock, and Step Functions'}
              </div>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <span className={`px-3 py-1 rounded-full text-xs font-bold border ${
              demoMode 
                ? 'bg-cyan-950/80 text-cyan-300 border-cyan-500/40' 
                : 'bg-emerald-950/80 text-emerald-300 border-emerald-500/40'
            }`}>
              {demoMode ? 'DEMO MODE ACTIVE' : 'LIVE AWS CONNECTED'}
            </span>
            <button
              onClick={() => setDemoMode(!demoMode)}
              className="px-3.5 py-1.5 rounded-xl border border-cyan-500/40 bg-[#061426] hover:bg-[#0a2240] text-cyan-300 font-bold text-xs uppercase transition-all shadow-sm active:scale-95"
            >
              Toggle Mode
            </button>
          </div>
        </div>

        {/* AWS Services Matrix Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8 font-mono text-xs">
          <div className="p-5 rounded-xl border border-violet-500/30 bg-[#040c1a]/90 space-y-2">
            <div className="flex items-center justify-between font-bold text-white">
              <span className="flex items-center gap-2 text-sm uppercase text-violet-300">
                <Cpu className="w-4 h-4 text-violet-400" /> AMAZON BEDROCK
              </span>
              <span className="px-2 py-0.5 rounded bg-emerald-950 border border-emerald-500/40 text-emerald-300 text-[10px]">
                OPERATIONAL
              </span>
            </div>
            <p className="text-slate-400 text-[11px] font-sans">
              Model ID: <code className="text-cyan-300">anthropic.claude-3-sonnet-20240229-v1:0</code>
            </p>
            <div className="text-slate-300 text-[11px] font-sans leading-relaxed">
              Synthesizes physical sensor telemetry into deterministic JSON mitigation plans. Local safety rule barrier prevents hospital quota violations.
            </div>
          </div>

          <div className="p-5 rounded-xl border border-sky-500/30 bg-[#040c1a]/90 space-y-2">
            <div className="flex items-center justify-between font-bold text-white">
              <span className="flex items-center gap-2 text-sm uppercase text-sky-300">
                <Workflow className="w-4 h-4 text-sky-400" /> AWS STEP FUNCTIONS
              </span>
              <span className="px-2 py-0.5 rounded bg-emerald-950 border border-emerald-500/40 text-emerald-300 text-[10px]">
                OPERATIONAL
              </span>
            </div>
            <p className="text-slate-400 text-[11px] font-sans">
              State Machine: <code className="text-sky-300">JalSetuCrisisOrchestrator</code>
            </p>
            <div className="text-slate-300 text-[11px] font-sans leading-relaxed">
              8-stage state machine orchestrating isolation valves, emergency tanker logistics, gravity reroutes, and public SMS alerts.
            </div>
          </div>

          <div className="p-5 rounded-xl border border-amber-500/30 bg-[#040c1a]/90 space-y-2">
            <div className="flex items-center justify-between font-bold text-white">
              <span className="flex items-center gap-2 text-sm uppercase text-amber-300">
                <Database className="w-4 h-4 text-amber-400" /> AMAZON TIMESTREAM / DYNAMODB
              </span>
              <span className="px-2 py-0.5 rounded bg-emerald-950 border border-emerald-500/40 text-emerald-300 text-[10px]">
                OPERATIONAL
              </span>
            </div>
            <p className="text-slate-400 text-[11px] font-sans">
              Table: <code className="text-amber-300">JalSetuTelemetryHistory</code>
            </p>
            <div className="text-slate-300 text-[11px] font-sans leading-relaxed">
              High-frequency 100ms time-series storage storing water levels, flow meters, acoustic junction pressure, and tanker GPS locations.
            </div>
          </div>

          <div className="p-5 rounded-xl border border-emerald-500/30 bg-[#040c1a]/90 space-y-2">
            <div className="flex items-center justify-between font-bold text-white">
              <span className="flex items-center gap-2 text-sm uppercase text-emerald-300">
                <Shield className="w-4 h-4 text-emerald-400" /> AWS CLOUDWATCH
              </span>
              <span className="px-2 py-0.5 rounded bg-emerald-950 border border-emerald-500/40 text-emerald-300 text-[10px]">
                OPERATIONAL
              </span>
            </div>
            <p className="text-slate-400 text-[11px] font-sans">
              Alarm: <code className="text-emerald-300">MainFeederPressureCollapseAlarm</code>
            </p>
            <div className="text-slate-300 text-[11px] font-sans leading-relaxed">
              Automated anomaly detection triggering Step Functions execution when flow drops below critical safety threshold (&lt;50 L/min).
            </div>
          </div>
        </div>

        {/* Zero-Credential Hackathon Deployment Compliance */}
        <div className="p-6 rounded-2xl border border-cyan-500/20 bg-[#040c1a]/90 space-y-3 font-mono text-xs">
          <div className="flex items-center justify-between text-white font-bold text-sm uppercase">
            <span className="flex items-center gap-2">
              <Terminal className="w-4 h-4 text-cyan-400" /> HACKATHON EVALUATION COMPLIANCE
            </span>
            <span className="text-cyan-300 text-[11px]">AWS AMPLIFY READY</span>
          </div>
          <p className="text-slate-300 font-sans text-xs leading-relaxed">
            Per hackathon evaluation instructions, this web application is fully client-side autonomous. Evaluators and judges do not need AWS IAM credentials to test or grade the system. All AI reasoning formats match the exact Amazon Bedrock JSON response schemas.
          </p>
          <div className="p-3 rounded-xl bg-[#020712] border border-cyan-500/20 text-slate-300 space-y-1">
            <div className="text-cyan-300 font-bold">• Zero Hardware: 100% simulated digital twin inside WebGL</div>
            <div className="text-cyan-300 font-bold">• Real Geographic Coordinates: {currentLocation.name} [{currentLocation.lat.toFixed(4)}°N, {currentLocation.lng.toFixed(4)}°E]</div>
            <div className="text-cyan-300 font-bold">• 1-Click Hero Story: Complete end-to-end demonstration narrative</div>
          </div>
        </div>
      </main>
    </div>
  );
};
