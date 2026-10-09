import React from 'react';
import { Sparkles, Clock, AlertTriangle, CheckCircle2, RotateCcw, Lightbulb } from 'lucide-react';

interface WhatIfPanelProps {
  isWhatIfActive: boolean;
  onRunWhatIf: (delayHours: number) => void;
  onResetWhatIf: () => void;
}

export const WhatIfPanel: React.FC<WhatIfPanelProps> = ({
  isWhatIfActive,
  onRunWhatIf,
  onResetWhatIf
}) => {
  return (
    <div className="flex flex-col gap-3.5 font-mono select-none">
      {/* Header */}
      <div className="flex items-center justify-between pb-2 border-b border-cyan-500/15">
        <div>
          <h3 className="text-xs font-bold uppercase tracking-wider text-white flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-amber-400" />
            What-If Contingency Sandbox
          </h3>
          <p className="text-[10px] text-slate-400 mt-0.5">
            Simulate hypothetical disruptions without mutating live state
          </p>
        </div>
      </div>

      {/* Scenario Card */}
      <div className="p-4 rounded-xl border border-amber-500/30 bg-gradient-to-b from-amber-950/20 to-[#071325]/90 backdrop-blur-xl shadow-[0_0_20px_rgba(245,158,11,0.12)] space-y-3">
        <div className="flex items-center gap-2 text-xs text-amber-300 font-bold">
          <Clock className="w-4 h-4 text-amber-400" />
          <span>HYPOTHETICAL DISRUPTION</span>
        </div>
        <h4 className="font-bold text-base text-white uppercase tracking-tight">
          &ldquo;What if the emergency tanker is delayed by 2 hours?&rdquo;
        </h4>
        <p className="text-xs text-slate-300 leading-relaxed font-sans">
          Simulates arterial highway gridlock delaying tanker delivery to Residential Zone A from 45 mins to 2h 45m.
        </p>

        <div className="pt-1">
          {!isWhatIfActive ? (
            <button
              onClick={() => onRunWhatIf(2)}
              className="w-full py-3 px-4 rounded-xl text-xs font-bold uppercase tracking-wider bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-400 hover:to-orange-400 text-slate-950 shadow-glow-amber transition-all flex items-center justify-center gap-2 active:scale-98"
            >
              RUN +2H DELAY CONTINGENCY
            </button>
          ) : (
            <button
              onClick={onResetWhatIf}
              className="w-full py-2.5 px-4 rounded-xl border border-slate-700 bg-slate-900/90 hover:bg-slate-800 text-slate-200 text-xs font-bold uppercase tracking-wider transition-all flex items-center justify-center gap-2 shadow-sm active:scale-98"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              RESTORE BASELINE PLAN
            </button>
          )}
        </div>
      </div>

      {/* Comparison table */}
      {isWhatIfActive && (
        <div className="p-4 rounded-xl border border-rose-500/40 bg-gradient-to-b from-rose-950/30 to-[#071325]/90 backdrop-blur-xl shadow-[0_0_25px_rgba(244,63,94,0.15)] space-y-3 text-xs">
          <div className="text-rose-400 font-bold tracking-wider flex items-center gap-1.5 uppercase text-[11px]">
            <AlertTriangle className="w-4 h-4" />
            BASELINE PLAN VS DELAY CONTINGENCY
          </div>

          <div className="space-y-2 border-t border-rose-500/20 pt-2.5">
            <div className="flex items-center justify-between p-2 rounded-lg bg-[#030914] border border-cyan-500/15">
              <span className="text-slate-400 font-medium">Tanker Arrival:</span>
              <span className="text-rose-400 font-bold">+2 Hours Delayed</span>
            </div>

            <div className="flex items-center justify-between p-2 rounded-lg bg-[#030914] border border-emerald-500/20">
              <span className="text-slate-400 font-medium">Hospital ICU:</span>
              <span className="text-emerald-400 font-bold flex items-center gap-1">
                <CheckCircle2 className="w-3.5 h-3.5" /> 100% PROTECTED
              </span>
            </div>

            <div className="flex items-center justify-between p-2 rounded-lg bg-[#030914] border border-emerald-500/20">
              <span className="text-slate-400 font-medium">Public School:</span>
              <span className="text-emerald-400 font-bold flex items-center gap-1">
                <CheckCircle2 className="w-3.5 h-3.5" /> 100% PROTECTED
              </span>
            </div>

            <div className="flex items-center justify-between p-2 rounded-lg bg-[#030914] border border-rose-500/30">
              <span className="text-slate-400 font-medium">Residential Zone A:</span>
              <span className="text-rose-400 font-bold flex items-center gap-1">
                <AlertTriangle className="w-3.5 h-3.5 animate-pulse" /> DEFICIT (-3,200 L)
              </span>
            </div>
          </div>

          {/* Additional AI Recommendation */}
          <div className="p-3 rounded-lg border border-amber-500/30 bg-amber-950/20 text-slate-200 text-[11px] leading-relaxed font-sans">
            <div className="font-bold text-amber-300 mb-1 flex items-center gap-1 font-mono uppercase text-[10px]">
              <Lightbulb className="w-3.5 h-3.5 text-amber-400" /> Bedrock AI Contingency Advisory:
            </div>
            • Automatically mobilize 4,000 L secondary rainwater reserve to backfill Zone A buffer.<br />
            • Throttle non-potable commercial flow by additional 12% to preserve core domestic lifeline.
          </div>
        </div>
      )}
    </div>
  );
};
