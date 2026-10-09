import React from 'react';
import { 
  AlertOctagon, 
  DropletOff, 
  Clock, 
  TrendingUp, 
  CloudRain, 
  Wrench, 
  Sparkles,
  Zap,
  Activity
} from 'lucide-react';
import { CrisisScenarioType } from '../../types/simulation';

interface CrisisPanelProps {
  onTriggerScenario: (type: CrisisScenarioType) => void;
  activeScenario?: CrisisScenarioType;
  isIncidentActive: boolean;
}

export const CrisisPanel: React.FC<CrisisPanelProps> = ({
  onTriggerScenario,
  activeScenario,
  isIncidentActive
}) => {
  const scenarios: {
    type: CrisisScenarioType;
    title: string;
    description: string;
    icon: React.ReactNode;
    severity: 'CRITICAL' | 'HIGH' | 'MEDIUM';
    badgeColor: string;
    isPrimary?: boolean;
  }[] = [
    {
      type: 'MAIN_PIPELINE_FAILURE',
      title: 'Main Pipeline Rupture',
      description: 'Primary 200mm trunk line fracture cutting supply to Zone A; triggers rapid reservoir pressure collapse.',
      icon: <AlertOctagon className="w-4 h-4 text-rose-400" />,
      severity: 'CRITICAL',
      badgeColor: 'border-rose-500/50 bg-rose-950/60 text-rose-300',
      isPrimary: true,
    },
    {
      type: 'DROUGHT',
      title: 'Drought & Low Inflow',
      description: 'Municipal supply drops 75%; central reservoir levels plummet to emergency 25% threshold.',
      icon: <DropletOff className="w-4 h-4 text-amber-400" />,
      severity: 'HIGH',
      badgeColor: 'border-amber-500/50 bg-amber-950/60 text-amber-300',
    },
    {
      type: 'PIPELINE_LEAK',
      title: 'Zone B Junction Leak',
      description: 'Subterranean acoustic sensors identify localized joint fracture bleeding 850 L/hr.',
      icon: <Wrench className="w-4 h-4 text-cyan-400" />,
      severity: 'MEDIUM',
      badgeColor: 'border-cyan-500/50 bg-cyan-950/60 text-cyan-300',
    },
    {
      type: 'TANKER_DELAY',
      title: 'Tanker Transit Delay (+2h)',
      description: 'Highway freight gridlock delays relief convoy; tests automated contingency rationing.',
      icon: <Clock className="w-4 h-4 text-violet-400" />,
      severity: 'HIGH',
      badgeColor: 'border-violet-500/50 bg-violet-950/60 text-violet-300',
    },
    {
      type: 'DEMAND_SURGE',
      title: 'Peak Heatwave Demand',
      description: '42°C urban heat island effect drives 45% abnormal domestic cooling consumption surge.',
      icon: <TrendingUp className="w-4 h-4 text-orange-400" />,
      severity: 'MEDIUM',
      badgeColor: 'border-orange-500/50 bg-orange-950/60 text-orange-300',
    },
    {
      type: 'FLOOD',
      title: 'Cloudburst & Urban Runoff',
      description: 'Flash rainfall overburdens storm drains; triggers maximum rainwater harvesting diversion.',
      icon: <CloudRain className="w-4 h-4 text-sky-400" />,
      severity: 'MEDIUM',
      badgeColor: 'border-sky-500/50 bg-sky-950/60 text-sky-300',
    },
  ];

  return (
    <div className="flex flex-col gap-3.5 font-mono select-none">
      {/* Header */}
      <div className="flex items-center justify-between pb-2 border-b border-cyan-500/15">
        <div>
          <div className="flex items-center gap-2">
            <Activity className="w-4 h-4 text-cyan-400" />
            <h3 className="text-xs font-bold uppercase tracking-wider text-white">
              Crisis Simulation Matrix
            </h3>
          </div>
          <p className="text-[10px] text-slate-400 mt-0.5">
            Trigger real-time disruptions & observe digital twin reaction
          </p>
        </div>
        <span className="text-[10px] px-2 py-0.5 rounded-full bg-cyan-950 border border-cyan-500/30 text-cyan-300">
          6 SCENARIOS
        </span>
      </div>

      {/* Scenario Cards */}
      <div className="space-y-2.5">
        {scenarios.map((s) => {
          const isActive = activeScenario === s.type;

          return (
            <div
              key={s.type}
              className={`p-3 rounded-xl border transition-all ${
                isActive 
                  ? 'bg-rose-950/40 border-rose-500/60 shadow-[0_0_20px_rgba(244,63,94,0.25)] ring-1 ring-rose-500/40' 
                  : s.isPrimary
                    ? 'bg-[#061224]/90 border-cyan-500/40 hover:border-cyan-400 shadow-[0_0_15px_rgba(6,182,212,0.15)]'
                    : 'bg-[#050e1c]/80 border-slate-800/80 hover:border-cyan-500/30 hover:bg-[#071326]'
              }`}
            >
              <div className="flex items-start justify-between gap-3">
                <div className="flex items-start gap-2.5 min-w-0">
                  <div className={`p-2 rounded-lg border shrink-0 ${
                    isActive 
                      ? 'bg-rose-950 border-rose-500/40 shadow-glow-red' 
                      : 'bg-[#030914] border-cyan-500/20'
                  }`}>
                    {s.icon}
                  </div>
                  <div className="min-w-0">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="font-bold text-xs text-white uppercase tracking-tight">
                        {s.title}
                      </span>
                      <span className={`text-[9px] px-1.5 py-0.2 rounded border font-semibold ${s.badgeColor}`}>
                        {s.severity}
                      </span>
                      {s.isPrimary && (
                        <span className="text-[9px] px-1.5 py-0.2 rounded bg-cyan-950/90 border border-cyan-400/50 text-cyan-300 font-bold flex items-center gap-1 shadow-glow-cyan/20">
                          <Zap className="w-2.5 h-2.5" /> HERO
                        </span>
                      )}
                    </div>
                    <p className="text-[11px] text-slate-300 mt-1 leading-snug line-clamp-2 font-sans">
                      {s.description}
                    </p>
                  </div>
                </div>

                <button
                  onClick={() => onTriggerScenario(s.type)}
                  disabled={isIncidentActive && !isActive}
                  className={`shrink-0 px-3 py-1.5 rounded-lg font-bold text-[11px] uppercase tracking-wider transition-all shadow-sm ${
                    isActive
                      ? 'bg-rose-500 text-white shadow-glow-red cursor-default'
                      : s.isPrimary
                        ? 'bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-slate-950 font-black shadow-glow-cyan active:scale-95'
                        : 'bg-cyan-950/70 hover:bg-cyan-900 border border-cyan-500/40 text-cyan-300 active:scale-95'
                  } disabled:opacity-30 disabled:cursor-not-allowed`}
                >
                  {isActive ? 'ACTIVE' : 'SIMULATE'}
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
