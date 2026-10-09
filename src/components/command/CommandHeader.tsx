import React, { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { 
  Droplets, 
  Activity, 
  Users, 
  Building2, 
  AlertTriangle, 
  ShieldCheck, 
  RotateCcw, 
  Sparkles,
  UserCheck,
  MapPin,
  Clock,
  Compass,
  Cpu,
  Navigation,
  Loader2
} from 'lucide-react';
import { SimulationState } from '../../types/simulation';
import { useSimulation } from '../../context/SimulationContext';

interface CommandHeaderProps {
  state: SimulationState;
  onReset: () => void;
  onRunHeroDemo: () => void;
  onTriggerCrisis?: () => void;
  isDemoRunning?: boolean;
}

export const CommandHeader: React.FC<CommandHeaderProps> = ({
  state,
  onReset,
  onRunHeroDemo,
  onTriggerCrisis,
  isDemoRunning = false,
}) => {
  const { currentLocation, detectLiveLocation, isLocating } = useSimulation();
  const isCritical = state.activeIncident || state.pipelineStatus === 'FAILED';

  // Live ticking clock
  const [timeStr, setTimeStr] = useState<string>('');
  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setTimeStr(now.toLocaleTimeString('en-IN', { hour12: false }));
    };
    updateTime();
    const timer = setInterval(updateTime, 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <header className="border-b border-cyan-500/20 bg-[#030814]/95 backdrop-blur-2xl sticky top-0 z-50 px-4 py-2 font-sans select-none shadow-[0_4px_30px_rgba(0,0,0,0.8)]">
      {/* Top Bar */}
      <div className="flex flex-wrap items-center justify-between gap-3">
        {/* Brand & Identity */}
        <div className="flex items-center gap-3">
          <NavLink to="/" className="flex items-center gap-2.5 group">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-cyan-500 via-sky-500 to-blue-600 p-0.5 shadow-glow-cyan flex items-center justify-center transition-transform group-hover:scale-105">
              <div className="w-full h-full bg-[#030814] rounded-[10px] flex items-center justify-center">
                <Droplets className="w-5 h-5 text-cyan-400 fill-cyan-400/20 animate-pulse" />
              </div>
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-display font-extrabold text-xl tracking-wider text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 via-sky-200 to-white">
                  JALSETU
                </span>
                <span className="text-[10px] font-mono px-2 py-0.5 bg-cyan-950/90 text-cyan-300 border border-cyan-500/40 rounded-full flex items-center gap-1 shadow-sm">
                  <Cpu className="w-3 h-3 text-cyan-400" />
                  BEDROCK 3.0
                </span>
              </div>
              <div className="flex items-center gap-2 text-[10px] font-mono text-slate-400 -mt-0.5">
                <span className="text-cyan-400/80 font-semibold">3D DIGITAL TWIN</span>
                <span>•</span>
                <button
                  onClick={(e) => {
                    e.preventDefault();
                    detectLiveLocation();
                  }}
                  className="flex items-center gap-1 text-slate-300 hover:text-cyan-300 transition-colors group/loc"
                  title="Click to detect your live device GPS location"
                >
                  <MapPin className="w-3 h-3 text-red-400" />
                  <span className="underline decoration-dotted">{currentLocation.name}, {currentLocation.city}</span>
                  <span className="text-[9px] text-cyan-400/90 px-1 py-0.2 bg-cyan-950/80 rounded border border-cyan-500/30">
                    {currentLocation.lat.toFixed(3)}°N, {currentLocation.lng.toFixed(3)}°E
                  </span>
                </button>
              </div>
            </div>
          </NavLink>

          {/* Navigation Links */}
          <nav className="hidden lg:flex items-center gap-1 border-l border-slate-800/80 pl-4 ml-2 text-xs font-mono">
            <NavLink 
              to="/command-center" 
              className={({ isActive }) => `px-3 py-1.5 rounded-lg transition-all ${
                isActive 
                  ? 'bg-cyan-950/80 text-cyan-300 border border-cyan-500/40 shadow-[0_0_15px_-3px_rgba(0,242,254,0.3)] font-bold' 
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900/40'
              }`}
            >
              Command Center
            </NavLink>
            <NavLink 
              to="/simulation" 
              className={({ isActive }) => `px-3 py-1.5 rounded-lg transition-all ${
                isActive 
                  ? 'bg-cyan-950/80 text-cyan-300 border border-cyan-500/40 shadow-[0_0_15px_-3px_rgba(0,242,254,0.3)] font-bold' 
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900/40'
              }`}
            >
              Simulations
            </NavLink>
            <NavLink 
              to={`/incident/${state.activeIncidentId || 'JSL-104'}`} 
              className={({ isActive }) => `px-3 py-1.5 rounded-lg transition-all flex items-center gap-1.5 ${
                isActive 
                  ? 'bg-cyan-950/80 text-cyan-300 border border-cyan-500/40 shadow-[0_0_15px_-3px_rgba(0,242,254,0.3)] font-bold' 
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900/40'
              }`}
            >
              Incident {state.activeIncident && <span className="w-2 h-2 rounded-full bg-red-500 animate-ping" />}
            </NavLink>
            <NavLink 
              to={`/response/${state.activeIncidentId || 'JSL-104'}`} 
              className={({ isActive }) => `px-3 py-1.5 rounded-lg transition-all ${
                isActive 
                  ? 'bg-cyan-950/80 text-cyan-300 border border-cyan-500/40 shadow-[0_0_15px_-3px_rgba(0,242,254,0.3)] font-bold' 
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900/40'
              }`}
            >
              AI Plan
            </NavLink>
            <NavLink 
              to="/impact" 
              className={({ isActive }) => `px-3 py-1.5 rounded-lg transition-all ${
                isActive 
                  ? 'bg-cyan-950/80 text-cyan-300 border border-cyan-500/40 shadow-[0_0_15px_-3px_rgba(0,242,254,0.3)] font-bold' 
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900/40'
              }`}
            >
              Impact
            </NavLink>
            <NavLink 
              to="/settings" 
              className={({ isActive }) => `px-3 py-1.5 rounded-lg transition-all ${
                isActive 
                  ? 'bg-cyan-950/80 text-cyan-300 border border-cyan-500/40 shadow-[0_0_15px_-3px_rgba(0,242,254,0.3)] font-bold' 
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900/40'
              }`}
            >
              AWS Setup
            </NavLink>
          </nav>
        </div>

        {/* Action Controls & Officer Profile */}
        <div className="flex items-center gap-2.5">
          {/* Real Time Clock */}
          <div className="hidden md:flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-[#071324] border border-cyan-500/20 text-xs font-mono text-cyan-300">
            <Clock className="w-3.5 h-3.5 text-cyan-400" />
            <span>{timeStr} IST</span>
          </div>

          {/* Live Device GPS Detect Button */}
          <button
            onClick={detectLiveLocation}
            disabled={isLocating}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-cyan-950/80 hover:bg-cyan-900 border border-cyan-500/40 text-cyan-300 font-mono font-bold text-xs uppercase shadow-sm active:scale-95 transition-all"
            title="Detect real device GPS coordinates"
          >
            {isLocating ? (
              <Loader2 className="w-3.5 h-3.5 animate-spin text-cyan-300" />
            ) : (
              <Navigation className="w-3.5 h-3.5 text-cyan-400 fill-cyan-400/20" />
            )}
            <span className="hidden sm:inline">{isLocating ? 'LOCATING...' : 'LIVE GPS'}</span>
          </button>

          {/* Hero Demo Trigger */}
          <button
            onClick={onRunHeroDemo}
            disabled={isDemoRunning}
            className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-slate-950 font-mono font-bold text-xs uppercase shadow-glow-cyan hover:shadow-cyan-400/60 active:scale-95 transition-all disabled:opacity-50"
            title="Runs complete automated 3-minute hackathon story"
          >
            <Sparkles className="w-3.5 h-3.5 animate-spin text-slate-950" style={{ animationDuration: '4s' }} />
            {isDemoRunning ? 'RUNNING STORY...' : 'RUN HERO DEMO'}
          </button>

          {!state.activeIncident && onTriggerCrisis && (
            <button
              onClick={onTriggerCrisis}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-gradient-to-r from-red-600 to-rose-700 hover:from-red-500 hover:to-rose-600 text-white font-mono font-bold text-xs uppercase shadow-glow-red hover:shadow-red-500/60 active:scale-95 transition-all"
            >
              <AlertTriangle className="w-3.5 h-3.5" />
              SIMULATE FAILURE
            </button>
          )}

          <button
            onClick={onReset}
            className="flex items-center gap-1 px-2.5 py-1.5 rounded-lg bg-[#081222] hover:bg-[#0e203a] text-slate-300 border border-slate-700/60 font-mono text-xs font-semibold active:scale-95 transition-all"
            title="Restore simulation to default optimal state"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            RESET
          </button>

          {/* Signed In As: Operator */}
          <div className="hidden xl:flex items-center gap-2 pl-3 border-l border-slate-800 text-right">
            <div className="w-8 h-8 rounded-lg bg-cyan-950/80 border border-cyan-500/40 flex items-center justify-center">
              <UserCheck className="w-4 h-4 text-cyan-300" />
            </div>
            <div>
              <div className="text-[10px] text-slate-400 font-mono">Authenticated</div>
              <div className="text-xs font-bold text-slate-200">Water Operations Officer</div>
            </div>
          </div>
        </div>
      </div>

      {/* Global Status HUD Bar */}
      <div className="mt-2 pt-2 border-t border-cyan-500/10 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-2 text-xs font-mono">
        {/* System Status */}
        <div className={`flex items-center justify-between px-3 py-1 rounded-lg border transition-all ${
          isCritical 
            ? 'bg-red-950/60 border-red-500/40 shadow-glow-red/20' 
            : 'bg-[#061224]/80 border-cyan-500/20'
        }`}>
          <span className="text-slate-400 flex items-center gap-1.5 text-[11px]">
            <Activity className={`w-3.5 h-3.5 ${isCritical ? 'text-red-400 animate-pulse' : 'text-cyan-400'}`} /> 
            STATUS
          </span>
          <span className={`font-bold px-2 py-0.5 rounded-full text-[10px] uppercase ${
            isCritical ? 'bg-red-500 text-white font-black' : 'bg-emerald-950 text-emerald-300 border border-emerald-500/40'
          }`}>
            {isCritical ? 'CRISIS ACTIVE' : 'OPERATIONAL'}
          </span>
        </div>

        {/* Water Reserve */}
        <div className="flex items-center justify-between px-3 py-1 rounded-lg bg-[#061224]/80 border border-cyan-500/20">
          <span className="text-slate-400 flex items-center gap-1 text-[11px]">
            <Droplets className="w-3.5 h-3.5 text-blue-400" /> RESERVE
          </span>
          <span className="font-display font-bold text-cyan-300 text-sm">
            {state.tankLevel.toLocaleString()} L
          </span>
        </div>

        {/* Population */}
        <div className="flex items-center justify-between px-3 py-1 rounded-lg bg-[#061224]/80 border border-cyan-500/20">
          <span className="text-slate-400 flex items-center gap-1 text-[11px]">
            <Users className="w-3.5 h-3.5 text-sky-400" /> POPULATION
          </span>
          <span className="font-display font-bold text-slate-200 text-sm">
            {state.populationTotal.toLocaleString()}
          </span>
        </div>

        {/* Critical Facilities */}
        <div className="flex items-center justify-between px-3 py-1 rounded-lg bg-[#061224]/80 border border-cyan-500/20">
          <span className="text-slate-400 flex items-center gap-1 text-[11px]">
            <Building2 className="w-3.5 h-3.5 text-amber-400" /> CRITICAL
          </span>
          <span className="font-display font-bold text-emerald-400 text-sm">
            {state.criticalFacilitiesProtected} / {state.criticalFacilitiesTotal}
          </span>
        </div>

        {/* Active Incidents */}
        <div className="flex items-center justify-between px-3 py-1 rounded-lg bg-[#061224]/80 border border-cyan-500/20">
          <span className="text-slate-400 flex items-center gap-1 text-[11px]">
            <AlertTriangle className={`w-3.5 h-3.5 ${state.activeIncident ? 'text-red-400 animate-pulse' : 'text-slate-500'}`} /> INCIDENTS
          </span>
          <span className={`font-display font-bold text-sm ${state.activeIncident ? 'text-red-400' : 'text-slate-400'}`}>
            {state.activeIncident ? '1 ACTIVE' : '0'}
          </span>
        </div>

        {/* Water Security */}
        <div className="flex items-center justify-between px-3 py-1 rounded-lg bg-[#061224]/80 border border-cyan-500/20">
          <span className="text-slate-400 flex items-center gap-1 text-[11px]">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" /> SECURITY
          </span>
          <span className={`font-display font-bold text-sm ${
            state.waterSecurityScore >= 80 ? 'text-emerald-300' : state.waterSecurityScore >= 50 ? 'text-amber-400' : 'text-red-400'
          }`}>
            {state.waterSecurityScore}%
          </span>
        </div>
      </div>
    </header>
  );
};
