import React from 'react';

interface MetricCardProps {
  label: string;
  value: string | number;
  unit?: string;
  subtext?: string;
  icon?: React.ReactNode;
  trend?: 'up' | 'down' | 'neutral';
  alert?: boolean;
  className?: string;
}

export const MetricCard: React.FC<MetricCardProps> = ({
  label,
  value,
  unit,
  subtext,
  icon,
  alert = false,
  className = '',
}) => {
  return (
    <div className={`p-3 rounded-lg border transition-all duration-200 ${
      alert 
        ? 'bg-red-950/40 border-red-500/40 shadow-glow-red/20' 
        : 'bg-[#091322]/80 border-cyan-900/40 hover:border-cyan-500/30'
    } ${className}`}>
      <div className="flex items-center justify-between text-xs font-mono tracking-wider text-slate-400 mb-1">
        <span className="uppercase flex items-center gap-1.5">{icon} {label}</span>
      </div>
      <div className="flex items-baseline gap-1">
        <span className={`text-xl font-bold font-display tracking-wide ${alert ? 'text-red-400' : 'text-cyan-300'}`}>
          {value}
        </span>
        {unit && <span className="text-xs font-mono text-slate-400">{unit}</span>}
      </div>
      {subtext && (
        <div className="text-[11px] text-slate-400 font-mono mt-0.5 truncate">
          {subtext}
        </div>
      )}
    </div>
  );
};
