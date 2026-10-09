import React, { useState } from 'react';
import { useSimulation } from '../context/SimulationContext';
import { CommandHeader } from '../components/command/CommandHeader';
import { MetricsPanel } from '../components/command/MetricsPanel';
import { CommunityScene } from '../components/3d/CommunityScene';
import { GoogleMapsGISView } from '../components/gis/GoogleMapsGISView';
import { CrisisPanel } from '../components/command/CrisisPanel';
import { IncidentPanel } from '../components/command/IncidentPanel';
import { AIResponsePanel } from '../components/command/AIResponsePanel';
import { WorkflowPanel } from '../components/command/WorkflowPanel';
import { WhatIfPanel } from '../components/command/WhatIfPanel';
import { CitizenPanel } from '../components/command/CitizenPanel';
import { generateProductionReport } from '../utils/reportGenerator';
import { 
  AlertOctagon, 
  Cpu, 
  Workflow, 
  Sparkles, 
  Flame, 
  Map, 
  Box,
  Users,
  Download
} from 'lucide-react';

export const CommandCenter: React.FC = () => {
  const {
    state,
    zones,
    incident,
    responsePlan,
    workflowSteps,
    activeTab,
    setActiveTab,
    triggerScenario,
    analyzeWithAI,
    executeResponse,
    runHeroDemo,
    resetDemo,
    runWhatIf,
    resetWhatIf,
    isAnalyzing,
    isExecuting,
    isDemoRunning,
    setSelectedZone,
    currentLocation
  } = useSimulation();

  const [isGoogleMapsMode, setIsGoogleMapsMode] = useState<boolean>(false);

  const handleExportReport = () => {
    generateProductionReport({
      location: currentLocation,
      state,
      zones,
      incident,
      plan: responsePlan,
      workflowSteps
    });
  };

  return (
    <div className="h-screen w-screen bg-[#030712] text-slate-100 flex flex-col overflow-hidden font-sans select-none">
      {/* TOP: Global System Status Bar */}
      <CommandHeader 
        state={state} 
        onReset={resetDemo} 
        onRunHeroDemo={runHeroDemo} 
        onTriggerCrisis={() => triggerScenario('MAIN_PIPELINE_FAILURE')}
        isDemoRunning={isDemoRunning}
      />

      {/* CENTER: Main Split Workspace */}
      <div className="flex-1 flex flex-col lg:flex-row min-h-0 relative">
        {/* LEFT: 3D Digital Twin OR Google Maps Satellite Mode (70% screen width) */}
        <div className="flex-1 lg:w-[68%] xl:w-[70%] h-full relative border-r border-cyan-500/20 bg-[#02050c]">
          {!isGoogleMapsMode ? (
            <CommunityScene 
              onToggleGoogleMaps={() => setIsGoogleMapsMode(true)}
              isGoogleMapsActive={false}
            />
          ) : (
            <GoogleMapsGISView 
              state={state}
              zones={zones}
              onSelectZone={setSelectedZone}
              onSwitchTo3D={() => setIsGoogleMapsMode(false)}
            />
          )}

          {/* Quick Floating Mode Switcher & Quick Export in Bottom Corner */}
          <div className="absolute bottom-4 left-4 z-20 flex items-center gap-2">
            <button
              onClick={() => setIsGoogleMapsMode(!isGoogleMapsMode)}
              className="px-3.5 py-2 rounded-xl bg-[#040c1a]/90 backdrop-blur-xl border border-cyan-500/40 text-cyan-300 font-mono text-xs font-bold shadow-glow-cyan hover:bg-cyan-950/80 hover:border-cyan-400 transition-all flex items-center gap-2"
            >
              {isGoogleMapsMode ? (
                <>
                  <Box className="w-4 h-4 text-cyan-400" />
                  <span>SWITCH TO 3D DIGITAL TWIN</span>
                </>
              ) : (
                <>
                  <Map className="w-4 h-4 text-emerald-400" />
                  <span>SWITCH TO GOOGLE MAPS SATELLITE</span>
                </>
              )}
            </button>

            <button
              onClick={handleExportReport}
              className="px-3 py-2 rounded-xl bg-[#040c1a]/90 backdrop-blur-xl border border-purple-500/40 text-purple-300 font-mono text-xs font-bold hover:bg-purple-950/80 hover:border-purple-400 transition-all flex items-center gap-1.5 shadow-sm"
              title="Download official Municipal Water Crisis Incident Audit Report in JSON format"
            >
              <Download className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">EXPORT AUDIT REPORT</span>
            </button>
          </div>
        </div>

        {/* RIGHT: Crisis / Control / Human Impact Panel (Occupies ~30% screen width, min 360px) */}
        <div className="w-full lg:w-[32%] xl:w-[30%] min-w-[360px] h-full flex flex-col bg-[#040a16]/95 backdrop-blur-2xl border-l border-cyan-500/20 z-20 overflow-hidden shadow-2xl">
          {/* Panel Tab Navigation */}
          <div className="flex items-center border-b border-cyan-500/15 bg-[#020712] px-2 py-2 overflow-x-auto gap-1 text-[11px] font-mono scrollbar-none">
            <button
              onClick={() => setActiveTab('CRISIS')}
              className={`px-2.5 py-1.5 rounded-lg transition-all flex items-center gap-1.5 whitespace-nowrap ${
                activeTab === 'CRISIS'
                  ? 'bg-cyan-950/90 text-cyan-300 border border-cyan-500/50 shadow-glow-cyan/40 font-bold'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900/40'
              }`}
            >
              <Flame className="w-3.5 h-3.5 text-amber-400" />
              CRISIS
            </button>

            <button
              onClick={() => setActiveTab('INCIDENT')}
              className={`px-2.5 py-1.5 rounded-lg transition-all flex items-center gap-1.5 whitespace-nowrap ${
                activeTab === 'INCIDENT'
                  ? 'bg-cyan-950/90 text-cyan-300 border border-cyan-500/50 shadow-glow-cyan/40 font-bold'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900/40'
              }`}
            >
              <AlertOctagon className="w-3.5 h-3.5 text-red-400" />
              INCIDENT
              {state.activeIncident && (
                <span className="w-2 h-2 rounded-full bg-red-500 animate-ping" />
              )}
            </button>

            <button
              onClick={() => setActiveTab('AI_RESPONSE')}
              className={`px-2.5 py-1.5 rounded-lg transition-all flex items-center gap-1.5 whitespace-nowrap ${
                activeTab === 'AI_RESPONSE'
                  ? 'bg-cyan-950/90 text-cyan-300 border border-cyan-500/50 shadow-glow-cyan/40 font-bold'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900/40'
              }`}
            >
              <Cpu className="w-3.5 h-3.5 text-cyan-400" />
              AI PLAN
            </button>

            <button
              onClick={() => setActiveTab('WORKFLOW')}
              className={`px-2.5 py-1.5 rounded-lg transition-all flex items-center gap-1.5 whitespace-nowrap ${
                activeTab === 'WORKFLOW'
                  ? 'bg-cyan-950/90 text-cyan-300 border border-cyan-500/50 shadow-glow-cyan/40 font-bold'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900/40'
              }`}
            >
              <Workflow className="w-3.5 h-3.5 text-sky-400" />
              WORKFLOW
            </button>

            <button
              onClick={() => setActiveTab('CITIZENS')}
              className={`px-2.5 py-1.5 rounded-lg transition-all flex items-center gap-1.5 whitespace-nowrap ${
                activeTab === 'CITIZENS'
                  ? 'bg-pink-950/90 text-pink-300 border border-pink-500/50 shadow-glow-pink font-bold'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900/40'
              }`}
            >
              <Users className="w-3.5 h-3.5 text-pink-400" />
              CITIZENS
              <span className={`px-1 rounded text-[9px] ${state.humanStressIndex > 50 ? 'bg-red-500 text-white' : 'bg-slate-800 text-slate-300'}`}>
                {state.humanStressIndex}%
              </span>
            </button>

            <button
              onClick={() => setActiveTab('WHAT_IF')}
              className={`px-2.5 py-1.5 rounded-lg transition-all flex items-center gap-1.5 whitespace-nowrap ${
                activeTab === 'WHAT_IF'
                  ? 'bg-cyan-950/90 text-cyan-300 border border-cyan-500/50 shadow-glow-cyan/40 font-bold'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900/40'
              }`}
            >
              <Sparkles className="w-3.5 h-3.5 text-amber-400" />
              WHAT-IF
            </button>
          </div>

          {/* Panel Scrollable Body */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {activeTab === 'CRISIS' && (
              <CrisisPanel 
                onTriggerScenario={triggerScenario}
                activeScenario={state.currentScenario}
                isIncidentActive={state.activeIncident}
              />
            )}

            {activeTab === 'INCIDENT' && (
              <IncidentPanel 
                incident={incident}
                onAnalyze={analyzeWithAI}
                isAnalyzing={isAnalyzing}
              />
            )}

            {activeTab === 'AI_RESPONSE' && (
              <AIResponsePanel 
                plan={responsePlan}
                onExecute={executeResponse}
                isExecuting={isExecuting}
              />
            )}

            {activeTab === 'WORKFLOW' && (
              <WorkflowPanel 
                steps={workflowSteps}
                isExecuting={isExecuting}
              />
            )}

            {activeTab === 'CITIZENS' && (
              <CitizenPanel />
            )}

            {activeTab === 'WHAT_IF' && (
              <WhatIfPanel 
                isWhatIfActive={state.isWhatIfActive}
                onRunWhatIf={runWhatIf}
                onResetWhatIf={resetWhatIf}
              />
            )}
          </div>

          {/* Production AWS Telemetry Bar at bottom of sidebar */}
          <div className="p-2.5 border-t border-cyan-500/15 bg-[#020612] font-mono text-[10px] text-slate-400 flex items-center justify-between">
            <div className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span className="text-slate-300 font-bold">AWS CLOUD STACK</span>
            </div>
            <div className="flex items-center gap-2 text-[9px] text-cyan-400">
              <span>Bedrock: 28ms</span>
              <span>•</span>
              <span>StepFn: Sync</span>
              <span>•</span>
              <span>DDB: 4ms</span>
            </div>
          </div>
        </div>
      </div>

      {/* BOTTOM: Environmental Metrics Bar */}
      <MetricsPanel state={state} />
    </div>
  );
};
