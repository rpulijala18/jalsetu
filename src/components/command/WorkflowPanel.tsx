import React from 'react';
import { Workflow, CheckCircle2, Loader2, Sparkles } from 'lucide-react';
import { WorkflowStep } from '../../types/response';

interface WorkflowPanelProps {
  steps: WorkflowStep[];
  isExecuting: boolean;
}

export const WorkflowPanel: React.FC<WorkflowPanelProps> = ({ steps, isExecuting }) => {
  return (
    <div className="flex flex-col gap-3.5 font-mono select-none">
      {/* Header */}
      <div className="flex items-center justify-between pb-2 border-b border-cyan-500/15">
        <div>
          <h3 className="text-xs font-bold uppercase tracking-wider text-white flex items-center gap-2">
            <Workflow className="w-4 h-4 text-cyan-400" />
            AWS Step Functions Orchestration
          </h3>
          <p className="text-[10px] text-slate-400 mt-0.5">
            State Machine: <span className="text-cyan-300">JalSetuCrisisOrchestrator</span>
          </p>
        </div>
        {isExecuting && (
          <span className="text-[10px] py-0.5 px-2.5 rounded-full bg-cyan-950 border border-cyan-400/50 text-cyan-300 font-bold flex items-center gap-1.5 shadow-glow-cyan/20 animate-pulse">
            <Loader2 className="w-3 h-3 animate-spin text-cyan-300" />
            EXECUTING
          </span>
        )}
      </div>

      {/* Stepper container */}
      <div className="p-3.5 rounded-xl border border-cyan-500/20 bg-[#050e1c]/90 backdrop-blur-xl space-y-2">
        {steps.map((step, idx) => {
          let badge = (
            <span className="w-5 h-5 rounded-full border border-slate-700 bg-slate-900 text-slate-400 flex items-center justify-center text-[10px] font-bold">
              {idx + 1}
            </span>
          );

          let stepClasses = 'border-slate-800/80 bg-[#030914]/60 text-slate-400 opacity-60';

          if (step.status === 'COMPLETED') {
            badge = <CheckCircle2 className="w-5 h-5 text-emerald-400 drop-shadow-[0_0_8px_rgba(16,185,129,0.5)]" />;
            stepClasses = 'border-emerald-500/30 bg-emerald-950/20 text-slate-200';
          } else if (step.status === 'RUNNING') {
            badge = <Loader2 className="w-5 h-5 text-cyan-400 animate-spin drop-shadow-[0_0_8px_rgba(0,242,254,0.6)]" />;
            stepClasses = 'border-cyan-400/60 bg-cyan-950/40 text-white shadow-[0_0_20px_rgba(0,242,254,0.2)] ring-1 ring-cyan-500/40';
          }

          return (
            <div key={step.id} className="relative">
              <div className={`p-2.5 rounded-lg border transition-all flex items-center gap-3 ${stepClasses}`}>
                <div className="shrink-0">{badge}</div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold tracking-wide uppercase text-white truncate">
                      {step.label}
                    </span>
                    <span className={`text-[10px] font-bold uppercase tracking-wider ${
                      step.status === 'COMPLETED' ? 'text-emerald-400' :
                      step.status === 'RUNNING' ? 'text-cyan-300 animate-pulse' : 'text-slate-500'
                    }`}>
                      {step.status}
                    </span>
                  </div>
                  <p className="text-[11px] text-slate-300 truncate mt-0.5 font-sans">
                    {step.description}
                  </p>
                </div>
              </div>

              {/* Connecting line */}
              {idx < steps.length - 1 && (
                <div className="w-0.5 h-1.5 bg-cyan-500/20 mx-auto my-0.5" />
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};
