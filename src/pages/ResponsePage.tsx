import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useSimulation } from '../context/SimulationContext';
import { CommandHeader } from '../components/command/CommandHeader';
import { AIResponsePanel } from '../components/command/AIResponsePanel';
import { WorkflowPanel } from '../components/command/WorkflowPanel';
import { ArrowLeft, ArrowRight, Cpu, Workflow } from 'lucide-react';

export const ResponsePage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { 
    state, 
    responsePlan, 
    workflowSteps, 
    executeResponse, 
    isExecuting, 
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
                  AI Response &bull; Step Functions
                </h1>
                <span className="px-2 py-0.5 rounded-full bg-violet-950/80 border border-violet-500/50 text-violet-300 font-mono text-[10px] font-bold uppercase">
                  BEDROCK 3.0
                </span>
              </div>
              <p className="text-xs font-mono text-slate-400 mt-1">
                Amazon Bedrock Strategic Allocation Plan for Incident #{id || 'JSL-104'} &bull; Ward: <span className="text-cyan-300">{currentLocation.name}</span>
              </p>
            </div>
          </div>

          <button
            onClick={() => navigate('/command-center')}
            className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-slate-950 font-mono font-bold text-xs uppercase shadow-glow-cyan transition-all"
          >
            <span>Watch 3D Response</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        {/* Dual Panel Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* AI Response Plan Panel */}
          <div className="p-6 rounded-2xl border border-cyan-500/20 bg-[#040c1a]/90 backdrop-blur-xl shadow-2xl">
            <AIResponsePanel 
              plan={responsePlan} 
              onExecute={executeResponse} 
              isExecuting={isExecuting} 
            />
          </div>

          {/* AWS Step Functions Workflow Panel */}
          <div className="p-6 rounded-2xl border border-cyan-500/20 bg-[#040c1a]/90 backdrop-blur-xl shadow-2xl">
            <WorkflowPanel 
              steps={workflowSteps} 
              isExecuting={isExecuting} 
            />
          </div>
        </div>
      </main>
    </div>
  );
};
