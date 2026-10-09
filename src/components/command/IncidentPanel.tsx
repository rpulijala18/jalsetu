import React from 'react';
import { 
  AlertTriangle, 
  Clock, 
  Droplets, 
  Building2, 
  MapPin, 
  Sparkles, 
  AlertOctagon,
  Radio,
  ShieldAlert,
  Loader2
} from 'lucide-react';
import { Incident } from '../../types/incident';

interface IncidentPanelProps {
  incident: Incident | null;
  onAnalyze: () => void;
  isAnalyzing: boolean;
}

export const IncidentPanel: React.FC<IncidentPanelProps> = ({
  incident,
  onAnalyze,
  isAnalyzing
}) => {
  if (!incident) {
    return (
      <div className="p-8 text-center rounded-2xl border border-cyan-500/20 bg-[#050e1c]/80 backdrop-blur-xl font-mono select-none">
        <div className="w-12 h-12 rounded-xl border border-cyan-500/30 bg-cyan-950/60 shadow-glow-cyan/20 flex items-center justify-center mx-auto text-cyan-400 mb-3">
          <Droplets className="w-6 h-6 animate-pulse" />
        </div>
        <h4 className="font-bold text-sm uppercase text-slate-200">No Active Breaches</h4>
        <p className="text-xs text-slate-400 mt-1 font-sans">
          All hydraulic telemetry nominal. Select a scenario from the <span className="text-cyan-400 font-bold">CRISIS</span> tab to simulate a disruption.
        </p>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-3.5 font-mono select-none">
      {/* Incident Header Card */}
      <div className="p-4 rounded-xl border border-rose-500/40 bg-gradient-to-b from-rose-950/40 to-[#071325]/90 backdrop-blur-xl shadow-[0_0_25px_rgba(244,63,94,0.18)]">
        <div className="flex items-center justify-between text-xs text-rose-300 mb-2">
          <span className="flex items-center gap-1.5 font-bold tracking-wider uppercase text-[11px]">
            <AlertOctagon className="w-4 h-4 text-rose-400 animate-pulse" />
            INCIDENT #{incident.id}
          </span>
          <span className="text-[10px] px-2 py-0.5 rounded-full bg-rose-950 border border-rose-500/50 text-rose-200 font-bold uppercase shadow-glow-red/20">
            {incident.severity}
          </span>
        </div>

        <h3 className="font-bold text-base text-white uppercase tracking-tight">
          {incident.title}
        </h3>
        <p className="text-xs text-slate-300 mt-1.5 leading-relaxed font-sans">
          {incident.description}
        </p>

        {/* Status ticker */}
        <div className="mt-3 pt-2.5 border-t border-rose-500/20 flex items-center justify-between text-xs">
          <span className="text-slate-400 text-[11px] uppercase flex items-center gap-1.5">
            <Radio className="w-3 h-3 text-rose-400 animate-ping" /> STATUS:
          </span>
          <span className="text-rose-400 font-bold uppercase tracking-wide">
            {isAnalyzing ? 'BEDROCK SYNTHESIS IN PROGRESS...' : incident.status.replace(/_/g, ' ')}
          </span>
        </div>
      </div>

      {/* Incident Metrics Grid */}
      <div className="grid grid-cols-2 gap-2 text-xs">
        <div className="p-3 rounded-lg border border-cyan-500/20 bg-[#050e1c]/90">
          <div className="text-slate-400 font-medium flex items-center gap-1 text-[10px] uppercase">
            <MapPin className="w-3.5 h-3.5 text-rose-400" /> AFFECTED ZONES
          </div>
          <div className="font-bold text-base text-white mt-1">
            {incident.affectedZonesCount} Zone(s)
          </div>
        </div>

        <div className="p-3 rounded-lg border border-rose-500/30 bg-rose-950/20">
          <div className="text-rose-300/80 font-medium flex items-center gap-1 text-[10px] uppercase">
            <Building2 className="w-3.5 h-3.5 text-amber-400" /> CRITICAL HOSPITALS
          </div>
          <div className="font-bold text-base text-rose-300 mt-1">
            {incident.criticalFacilitiesCount} AT RISK
          </div>
        </div>

        <div className="p-3 rounded-lg border border-cyan-500/20 bg-[#050e1c]/90">
          <div className="text-slate-400 font-medium flex items-center gap-1 text-[10px] uppercase">
            <Clock className="w-3.5 h-3.5 text-violet-400" /> TIME TO CRITICAL
          </div>
          <div className="font-bold text-base text-rose-400 mt-1">
            {incident.estimatedTimeToShortage}
          </div>
        </div>

        <div className="p-3 rounded-lg border border-cyan-500/20 bg-[#050e1c]/90">
          <div className="text-slate-400 font-medium flex items-center gap-1 text-[10px] uppercase">
            <Droplets className="w-3.5 h-3.5 text-cyan-400" /> CURRENT RESERVE
          </div>
          <div className="font-bold text-base text-cyan-300 mt-1">
            {incident.currentReserveLiters.toLocaleString()} L
          </div>
        </div>
      </div>

      {/* Sensor Alerts Feed */}
      {incident.sensorAlerts && incident.sensorAlerts.length > 0 && (
        <div className="p-3.5 rounded-xl border border-cyan-500/20 bg-[#050e1c]/90 text-xs">
          <div className="text-slate-300 font-bold mb-2 flex items-center gap-1.5 text-[10px] uppercase tracking-wider">
            <ShieldAlert className="w-3.5 h-3.5 text-amber-400" />
            TELEMETRY SENSOR DETECTIONS
          </div>
          <ul className="space-y-1.5 text-slate-300 text-[11px]">
            {incident.sensorAlerts.map((alert, i) => (
              <li key={i} className="flex items-start gap-2">
                <span className="text-rose-400 font-bold">›</span>
                <span>{alert}</span>
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Action CTA Button */}
      <button
        onClick={onAnalyze}
        disabled={isAnalyzing}
        className="w-full py-3.5 px-4 rounded-xl text-xs font-bold tracking-wider uppercase bg-gradient-to-r from-cyan-500 via-sky-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-slate-950 shadow-glow-cyan hover:shadow-cyan-400/60 transition-all flex items-center justify-center gap-2 active:scale-98 disabled:opacity-50"
      >
        {isAnalyzing ? (
          <>
            <Loader2 className="w-4 h-4 animate-spin text-slate-950" />
            <span>SYNTHESIZING WITH AMAZON BEDROCK...</span>
          </>
        ) : (
          <>
            <Sparkles className="w-4 h-4 text-slate-950" />
            <span>ANALYZE WITH JALSETU AI</span>
          </>
        )}
      </button>
    </div>
  );
};
