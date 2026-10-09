import React from 'react';
import { 
  CheckCircle2, 
  Cpu, 
  ShieldCheck, 
  ArrowRight, 
  Droplets, 
  Users,
  Sparkles,
  Zap,
  Loader2
} from 'lucide-react';
import { BedrockResponsePlan } from '../../types/response';

interface AIResponsePanelProps {
  plan: BedrockResponsePlan | null;
  onExecute: () => void;
  isExecuting: boolean;
}

export const AIResponsePanel: React.FC<AIResponsePanelProps> = ({
  plan,
  onExecute,
  isExecuting
}) => {
  if (!plan) {
    return (
      <div className="p-8 text-center rounded-2xl border border-cyan-500/20 bg-[#050e1c]/80 backdrop-blur-xl font-mono select-none">
        <div className="w-12 h-12 rounded-xl border border-violet-500/40 bg-violet-950/60 shadow-[0_0_20px_rgba(168,85,247,0.25)] flex items-center justify-center mx-auto text-violet-300 mb-3">
          <Cpu className="w-6 h-6 animate-pulse" />
        </div>
        <h4 className="font-bold text-sm uppercase text-slate-200">Awaiting AI Dispatch</h4>
        <p className="text-xs text-slate-400 mt-1 font-sans">
          Trigger a crisis scenario and click <span className="text-cyan-400 font-bold">&ldquo;ANALYZE WITH JALSETU AI&rdquo;</span> to formulate an Amazon Bedrock strategic response.
        </p>
      </div>
    );
  }

  const confidencePct = Math.round(plan.confidence * 100);

  return (
    <div className="flex flex-col gap-3.5 font-mono select-none">
      {/* Bedrock Engine Header */}
      <div className="p-4 rounded-xl border border-violet-500/40 bg-gradient-to-b from-violet-950/30 to-[#071325]/90 backdrop-blur-xl shadow-[0_0_25px_rgba(168,85,247,0.18)]">
        <div className="flex items-center justify-between text-xs mb-2">
          <span className="flex items-center gap-1.5 text-violet-300 font-bold uppercase tracking-wider text-[11px]">
            <Cpu className="w-4 h-4 text-violet-400" />
            AMAZON BEDROCK CORE
          </span>
          <span className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-950 border border-emerald-500/50 text-emerald-300 font-bold shadow-glow-emerald/20">
            CONFIDENCE: {confidencePct}%
          </span>
        </div>

        <h3 className="font-bold text-base text-white uppercase tracking-tight">
          JalSetu Strategic Allocation Plan
        </h3>
        
        <div className="mt-2.5 p-3 rounded-lg bg-[#040a16] border border-cyan-500/20 text-xs text-slate-300 leading-relaxed font-sans italic">
          &ldquo;{plan.incidentSummary}&rdquo;
        </div>

        {/* Safety Validation Badge */}
        <div className="mt-3 flex items-center justify-between pt-2 border-t border-cyan-500/15 text-xs">
          <span className="flex items-center gap-1.5 text-emerald-400 font-bold uppercase text-[11px]">
            <ShieldCheck className="w-4 h-4 text-emerald-400" />
            SAFETY RULES: VALIDATED
          </span>
          <span className="text-slate-400 text-[10px]">
            Hospital Dialysis Ring-Fenced
          </span>
        </div>
      </div>

      {/* Recommended Actions Checklist */}
      <div className="p-3.5 rounded-xl border border-cyan-500/20 bg-[#050e1c]/90">
        <div className="text-xs font-bold text-slate-200 uppercase tracking-wider mb-2.5 flex items-center justify-between">
          <span className="flex items-center gap-1.5 text-cyan-300">
            <Zap className="w-3.5 h-3.5 text-cyan-400" /> RECOMMENDED INTERVENTIONS
          </span>
          <span className="text-[10px] px-2 py-0.5 rounded bg-cyan-950 border border-cyan-500/30 text-cyan-300">
            {plan.actions.length} ACTIONS
          </span>
        </div>

        <div className="space-y-2">
          {plan.actions.map((act, index) => (
            <div 
              key={index} 
              className="flex items-start gap-2.5 text-xs p-2.5 rounded-lg border border-cyan-500/15 bg-[#030914] hover:border-cyan-400/40 transition-colors"
            >
              <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
              <div className="flex-1 min-w-0">
                <span className="text-slate-200 font-medium">
                  {act.description || `${act.action.replace(/_/g, ' ')}: ${act.target}`}
                </span>
                {act.amountLiters && (
                  <span className="ml-1.5 text-cyan-400 font-bold">
                    (+{act.amountLiters.toLocaleString()} L)
                  </span>
                )}
                {act.percentageReduction && (
                  <span className="ml-1.5 text-rose-400 font-bold">
                    (-{act.percentageReduction}%)
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Anticipated Impact Metrics */}
      <div className="grid grid-cols-2 gap-2 text-xs">
        <div className="p-3 rounded-lg border border-cyan-500/20 bg-[#050e1c]/90">
          <div className="text-slate-400 font-medium flex items-center gap-1 text-[10px] uppercase">
            <Droplets className="w-3.5 h-3.5 text-cyan-400" /> WATER CONSERVED
          </div>
          <div className="font-bold text-base text-cyan-300 mt-1">
            {plan.estimatedWaterSaved.toLocaleString()} L
          </div>
        </div>

        <div className="p-3 rounded-lg border border-emerald-500/30 bg-emerald-950/20">
          <div className="text-emerald-300/80 font-medium flex items-center gap-1 text-[10px] uppercase">
            <Users className="w-3.5 h-3.5 text-emerald-400" /> CITIZENS SAFEGUARDED
          </div>
          <div className="font-bold text-base text-emerald-300 mt-1">
            {plan.estimatedPopulationProtected.toLocaleString()}
          </div>
        </div>
      </div>

      {/* Execute Response Button */}
      <button
        onClick={onExecute}
        disabled={isExecuting}
        className="w-full py-3.5 px-4 rounded-xl text-xs font-bold tracking-wider uppercase bg-gradient-to-r from-emerald-500 via-teal-500 to-cyan-500 hover:from-emerald-400 hover:to-teal-400 text-slate-950 shadow-glow-emerald hover:shadow-emerald-400/60 transition-all flex items-center justify-center gap-2 active:scale-98 disabled:opacity-50"
      >
        {isExecuting ? (
          <>
            <Loader2 className="w-4 h-4 animate-spin text-slate-950" />
            <span>ORCHESTRATING VIA AWS STEP FUNCTIONS...</span>
          </>
        ) : (
          <>
            <ArrowRight className="w-4 h-4 text-slate-950" />
            <span>EXECUTE RESPONSE PLAN</span>
          </>
        )}
      </button>
    </div>
  );
};
