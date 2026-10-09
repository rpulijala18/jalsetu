import React from 'react';

interface StatusBadgeProps {
  status: 'OPERATIONAL' | 'WARNING' | 'CRITICAL' | 'PROTECTED' | 'OPTIMAL' | 'PENDING' | 'RUNNING' | 'COMPLETED' | 'FAILED';
  label?: string;
  className?: string;
  pulse?: boolean;
}

export const StatusBadge: React.FC<StatusBadgeProps> = ({ status, label, className = '', pulse = false }) => {
  const displayLabel = label || status;
  
  let colorStyles = 'bg-cyan-950/80 text-cyan-400 border-cyan-500/40';
  let dotColor = 'bg-cyan-400';

  switch (status) {
    case 'OPERATIONAL':
    case 'PROTECTED':
    case 'OPTIMAL':
    case 'COMPLETED':
      colorStyles = 'bg-emerald-950/70 text-emerald-300 border-emerald-500/40 shadow-glow-green/20';
      dotColor = 'bg-emerald-400';
      break;
    case 'WARNING':
    case 'PENDING':
      colorStyles = 'bg-amber-950/70 text-amber-300 border-amber-500/40 shadow-glow-amber/20';
      dotColor = 'bg-amber-400';
      break;
    case 'CRITICAL':
    case 'FAILED':
      colorStyles = 'bg-red-950/80 text-red-300 border-red-500/50 shadow-glow-red/30';
      dotColor = 'bg-red-500';
      break;
    case 'RUNNING':
      colorStyles = 'bg-cyan-950/80 text-cyan-300 border-cyan-500/50 shadow-glow-cyan/30';
      dotColor = 'bg-cyan-400';
      break;
  }

  return (
    <span className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-mono font-medium tracking-wide border uppercase ${colorStyles} ${className}`}>
      <span className={`w-1.5 h-1.5 rounded-full ${dotColor} ${pulse || status === 'CRITICAL' || status === 'RUNNING' ? 'animate-ping' : ''}`} />
      <span>{displayLabel}</span>
    </span>
  );
};
