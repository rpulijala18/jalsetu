import React from 'react';
import { Droplets, CloudRain, Truck, ShieldCheck, Activity, Gauge } from 'lucide-react';
import { SimulationState } from '../../types/simulation';

interface MetricsPanelProps {
  state: SimulationState;
}

export const MetricsPanel: React.FC<MetricsPanelProps> = ({ state }) => {
  const fillPercent = Math.round((state.tankLevel / state.tankCapacity) * 100);
  const rainPercent = Math.round((state.rainReserve / state.rainReserveCapacity) * 100);

  return (
    <div className="border-t border-cyan-500/20 bg-[#030814]/95 backdrop-blur-2xl px-4 py-2 font-mono select-none shadow-[0_-8px_30px_rgba(0,0,0,0.8)]">
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-2.5 items-center">
        {/* Metric 1: Tank Reservoir Capacity */}
        <div className="flex flex-col gap-1 p-2 rounded-lg bg-[#071324]/80 border border-cyan-500/20 hover:border-cyan-500/40 transition-colors">
          <div className="flex items-center justify-between text-[11px] text-slate-400">
            <span className="flex items-center gap-1 font-semibold">
              <Gauge className="w-3.5 h-3.5 text-cyan-400" /> RESERVOIR
            </span>
            <span className="text-cyan-300 font-bold font-display text-xs">{fillPercent}%</span>
          </div>
          <div className="w-full bg-slate-900 h-1.5 rounded-full overflow-hidden border border-cyan-950">
            <div 
              className={`h-full rounded-full transition-all duration-500 ${
                fillPercent < 30 ? 'bg-red-500 shadow-glow-red' : fillPercent < 60 ? 'bg-amber-400 shadow-glow-amber' : 'bg-cyan-400 shadow-glow-cyan'
              }`}
              style={{ width: `${fillPercent}%` }}
            />
          </div>
          <div className="text-[10px] text-slate-400 truncate flex justify-between">
            <span>{state.tankLevel.toLocaleString()} L</span>
            <span className="text-slate-500">/ 30,000 L</span>
          </div>
        </div>

        {/* Metric 2: Rainwater Reserve */}
        <div className="flex flex-col gap-1 p-2 rounded-lg bg-[#071324]/80 border border-cyan-500/20 hover:border-cyan-500/40 transition-colors">
          <div className="flex items-center justify-between text-[11px] text-slate-400">
            <span className="flex items-center gap-1 font-semibold">
              <CloudRain className="w-3.5 h-3.5 text-sky-400" /> RAIN RESERVE
            </span>
            <span className="text-sky-300 font-bold font-display text-xs">{rainPercent}%</span>
          </div>
          <div className="w-full bg-slate-900 h-1.5 rounded-full overflow-hidden border border-cyan-950">
            <div 
              className="h-full bg-sky-400 rounded-full transition-all duration-500 shadow-[0_0_12px_rgba(56,189,248,0.5)]"
              style={{ width: `${rainPercent}%` }}
            />
          </div>
          <div className="text-[10px] text-slate-400 truncate flex justify-between">
            <span>{state.rainReserve.toLocaleString()} L</span>
            <span className="text-slate-500">/ 4,000 L</span>
          </div>
        </div>

        {/* Metric 3: Emergency Tanker */}
        <div className="flex flex-col justify-center p-2 rounded-lg bg-[#071324]/80 border border-cyan-500/20 hover:border-cyan-500/40 transition-colors">
          <span className="text-[10px] text-slate-400 font-semibold uppercase flex items-center gap-1">
            <Truck className="w-3 h-3 text-amber-400" /> TANKER LOGISTICS
          </span>
          <span className="font-display font-bold text-xs text-amber-300 truncate mt-0.5">
            {state.tankerLocation.replace(/_/g, ' ')}
          </span>
          <span className="text-[10px] text-slate-400">
            Payload: {state.tankerCapacity.toLocaleString()} L
          </span>
        </div>

        {/* Metric 4: Water Conserved */}
        <div className="flex flex-col justify-center p-2 rounded-lg bg-[#071324]/80 border border-cyan-500/20 hover:border-cyan-500/40 transition-colors">
          <span className="text-[10px] text-slate-400 font-semibold uppercase flex items-center gap-1">
            <Droplets className="w-3 h-3 text-cyan-400" /> CONSERVED
          </span>
          <span className="font-display font-bold text-xs text-cyan-300 truncate mt-0.5">
            {state.waterConserved.toLocaleString()} L
          </span>
          <span className="text-[10px] text-emerald-400">
            Autonomous Rationing
          </span>
        </div>

        {/* Metric 5: People Protected */}
        <div className="flex flex-col justify-center p-2 rounded-lg bg-[#071324]/80 border border-cyan-500/20 hover:border-cyan-500/40 transition-colors">
          <span className="text-[10px] text-slate-400 font-semibold uppercase flex items-center gap-1">
            <ShieldCheck className="w-3 h-3 text-emerald-400" /> WARD SECURITY
          </span>
          <span className="font-display font-bold text-xs text-emerald-300 truncate mt-0.5">
            {state.populationProtected.toLocaleString()} / {state.populationTotal.toLocaleString()}
          </span>
          <span className="text-[10px] text-slate-400">
            Zero Hospital Deficit
          </span>
        </div>

        {/* Metric 6: Runout Hours */}
        <div className="flex flex-col justify-center p-2 rounded-lg bg-[#071324]/80 border border-cyan-500/20 hover:border-cyan-500/40 transition-colors">
          <span className="text-[10px] text-slate-400 font-semibold uppercase flex items-center gap-1">
            <Activity className="w-3 h-3 text-rose-400" /> TIME TO CRITICAL
          </span>
          <span className="font-display font-bold text-xs text-slate-200 truncate mt-0.5">
            {state.timeToShortageHours.toFixed(1)} Hours
          </span>
          <span className="text-[10px] text-slate-400">
            Mass-Balance Telemetry
          </span>
        </div>
      </div>
    </div>
  );
};
