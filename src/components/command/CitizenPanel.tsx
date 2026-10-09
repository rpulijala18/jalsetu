import React, { useState } from 'react';
import { 
  Users, 
  HeartPulse, 
  Radio, 
  Send, 
  CheckCircle2, 
  AlertTriangle, 
  ShieldAlert, 
  MessageSquare, 
  Sparkles,
  MapPin,
  Clock,
  Volume2
} from 'lucide-react';
import { useSimulation } from '../../context/SimulationContext';
import { HumanEntity } from '../../types/simulation';

export const CitizenPanel: React.FC = () => {
  const { 
    state, 
    people, 
    selectedPerson, 
    setSelectedPerson, 
    setCameraFocus, 
    currentLocation, 
    broadcastCitizenAlert 
  } = useSimulation();

  const [broadcastText, setBroadcastText] = useState<string>('');
  const [broadcastSent, setBroadcastSent] = useState<boolean>(false);

  const handleSendBroadcast = (e: React.FormEvent) => {
    e.preventDefault();
    if (!broadcastText.trim()) return;
    broadcastCitizenAlert(broadcastText);
    setBroadcastText('');
    setBroadcastSent(true);
    setTimeout(() => setBroadcastSent(false), 3000);
  };

  const handleSelectPerson = (person: HumanEntity) => {
    setSelectedPerson(person);
    setCameraFocus(person.position);
  };

  const quickTemplates = [
    `Emergency Water Tanker dispatched to ${currentLocation.name}. Orderly distribution active.`,
    `Hospital ICU & Dialysis lines ring-fenced. Residential rationing deployed at 40%.`,
    `Pipeline repairs in progress by Jal Sansthan engineers. Expected restoration in 2 hours.`
  ];

  return (
    <div className="space-y-4 font-mono text-xs text-slate-200 select-none">
      {/* Human Stress & Hydration Meter */}
      <div className="p-3.5 rounded-2xl bg-[#061224]/90 border border-cyan-500/30 shadow-xl space-y-3">
        <div className="flex items-center justify-between">
          <span className="text-[10px] text-pink-400 font-bold uppercase tracking-wider flex items-center gap-1.5">
            <HeartPulse className="w-3.5 h-3.5 text-pink-400 animate-pulse" />
            HUMAN STRESS & HYDRATION INDEX
          </span>
          <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase ${
            state.humanStressIndex > 60 ? 'bg-red-950 text-red-300 border border-red-500/50' :
            state.humanStressIndex > 30 ? 'bg-amber-950 text-amber-300 border border-amber-500/50' :
            'bg-emerald-950 text-emerald-300 border border-emerald-500/50'
          }`}>
            {state.humanStressIndex > 60 ? 'HIGH CRISIS' : state.humanStressIndex > 30 ? 'ELEVATED' : 'STABLE'}
          </span>
        </div>

        <div>
          <div className="flex items-center justify-between text-xs mb-1">
            <span className="text-slate-400">Citizen Stress Level:</span>
            <span className="font-bold font-display text-white text-sm">{state.humanStressIndex}%</span>
          </div>
          <div className="w-full bg-slate-900 h-2.5 rounded-full overflow-hidden border border-slate-800">
            <div 
              className={`h-full rounded-full transition-all duration-700 ${
                state.humanStressIndex > 60 ? 'bg-gradient-to-r from-amber-500 to-red-600 shadow-glow-red' :
                state.humanStressIndex > 30 ? 'bg-gradient-to-r from-yellow-400 to-amber-500' :
                'bg-gradient-to-r from-cyan-400 to-emerald-500 shadow-glow-cyan'
              }`}
              style={{ width: `${state.humanStressIndex}%` }}
            />
          </div>
        </div>

        {/* Demographic Breakdown */}
        <div className="grid grid-cols-3 gap-2 pt-1 border-t border-slate-800/80 text-center">
          <div className="p-2 rounded-lg bg-slate-950/60 border border-slate-800">
            <div className="text-[10px] text-slate-400">ICU Patients</div>
            <div className="text-xs font-bold text-cyan-300 mt-0.5">320 Secured</div>
          </div>
          <div className="p-2 rounded-lg bg-slate-950/60 border border-slate-800">
            <div className="text-[10px] text-slate-400">Elderly & Infants</div>
            <div className="text-xs font-bold text-purple-300 mt-0.5">1,090 Ward</div>
          </div>
          <div className="p-2 rounded-lg bg-slate-950/60 border border-slate-800">
            <div className="text-[10px] text-slate-400">SOS Queue</div>
            <div className={`text-xs font-bold mt-0.5 ${state.grievanceQueueLength > 10 ? 'text-red-400' : 'text-emerald-400'}`}>
              {state.grievanceQueueLength} Reports
            </div>
          </div>
        </div>
      </div>

      {/* Emergency Citizen Broadcast Tool */}
      <div className="p-3.5 rounded-2xl bg-[#061224]/90 border border-cyan-500/30 shadow-xl space-y-2.5">
        <div className="flex items-center justify-between">
          <span className="text-[10px] text-cyan-300 font-bold uppercase tracking-wider flex items-center gap-1.5">
            <Radio className="w-3.5 h-3.5 text-cyan-400" />
            EMERGENCY CITIZEN SMS / PA BROADCAST
          </span>
          <span className="text-[9px] text-slate-400">TO {currentLocation.name.toUpperCase()}</span>
        </div>

        <form onSubmit={handleSendBroadcast} className="space-y-2">
          <textarea
            value={broadcastText}
            onChange={(e) => setBroadcastText(e.target.value)}
            placeholder="Type official SMS announcement to all citizens in this ward..."
            className="w-full bg-[#030917] border border-cyan-500/30 rounded-xl p-2.5 text-xs text-white placeholder:text-slate-500 outline-none focus:border-cyan-400 transition-all resize-none h-16 font-mono"
          />

          <div className="flex flex-wrap gap-1">
            {quickTemplates.map((tmpl, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => setBroadcastText(tmpl)}
                className="text-[9px] px-2 py-0.5 rounded bg-slate-900 hover:bg-cyan-950 text-slate-300 border border-slate-800 hover:border-cyan-500/40 transition-colors truncate max-w-full text-left"
              >
                + Template {idx + 1}
              </button>
            ))}
          </div>

          <div className="flex items-center justify-between pt-1">
            {broadcastSent ? (
              <span className="text-emerald-400 text-[10px] font-bold flex items-center gap-1">
                <CheckCircle2 className="w-3.5 h-3.5" /> Broadcast Published via EventBridge
              </span>
            ) : (
              <span className="text-slate-500 text-[10px]">Reaches {state.populationTotal.toLocaleString()} residents</span>
            )}
            <button
              type="submit"
              disabled={!broadcastText.trim()}
              className="px-3 py-1.5 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-slate-950 font-bold text-xs uppercase shadow-glow-cyan flex items-center gap-1.5 disabled:opacity-50 active:scale-95 transition-all"
            >
              <Send className="w-3.5 h-3.5" />
              <span>TRANSMIT</span>
            </button>
          </div>
        </form>
      </div>

      {/* Real-time Citizen Feedback & Voices Ticker */}
      <div className="p-3.5 rounded-2xl bg-[#061224]/90 border border-cyan-500/30 shadow-xl space-y-2.5">
        <div className="flex items-center justify-between">
          <span className="text-[10px] text-cyan-300 font-bold uppercase tracking-wider flex items-center gap-1.5">
            <MessageSquare className="w-3.5 h-3.5 text-cyan-400" />
            LIVE CITIZEN VOICES & TELEMETRY FEED
          </span>
          <span className="text-[9px] text-slate-400">{state.activeCitizenFeed.length} EVENTS</span>
        </div>

        <div className="space-y-2 max-h-56 overflow-y-auto pr-1">
          {state.activeCitizenFeed.map((item) => (
            <div 
              key={item.id} 
              className={`p-2.5 rounded-xl border text-xs space-y-1 transition-all ${
                item.sentiment === 'CRITICAL' ? 'bg-red-950/40 border-red-500/40 text-red-200' :
                item.sentiment === 'RELIEVED' ? 'bg-emerald-950/40 border-emerald-500/40 text-emerald-200' :
                item.sentiment === 'POSITIVE' ? 'bg-cyan-950/40 border-cyan-500/40 text-cyan-200' :
                'bg-slate-900/60 border-slate-800 text-slate-300'
              }`}
            >
              <div className="flex items-center justify-between text-[10px]">
                <div className="flex items-center gap-1.5 font-bold">
                  <span>{item.author}</span>
                  <span className="text-slate-400 font-normal">({item.role})</span>
                </div>
                <span className="text-[9px] text-slate-500">{item.time}</span>
              </div>
              <p className="text-[11px] leading-relaxed italic">
                "{item.message}"
              </p>
              <div className="flex items-center gap-1 text-[9px] text-slate-400 pt-0.5">
                <MapPin className="w-2.5 h-2.5 text-cyan-400" />
                <span>{item.location}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 3D Human Responders & Key Personnel Roster */}
      <div className="p-3.5 rounded-2xl bg-[#061224]/90 border border-cyan-500/30 shadow-xl space-y-2.5">
        <div className="flex items-center justify-between">
          <span className="text-[10px] text-cyan-300 font-bold uppercase tracking-wider flex items-center gap-1.5">
            <Users className="w-3.5 h-3.5 text-cyan-400" />
            3D HUMAN RESPONDERS ROSTER
          </span>
          <span className="text-[9px] text-slate-400">CLICK TO FOCUS IN 3D</span>
        </div>

        <div className="space-y-1.5 max-h-48 overflow-y-auto pr-1">
          {people.map((person) => (
            <button
              key={person.id}
              onClick={() => handleSelectPerson(person)}
              className={`w-full text-left p-2 rounded-xl transition-all flex items-center justify-between text-xs ${
                selectedPerson?.id === person.id
                  ? 'bg-cyan-950 border border-cyan-400 shadow-glow-cyan/30 text-white'
                  : 'bg-slate-900/50 hover:bg-slate-800/80 border border-slate-800 text-slate-300'
              }`}
            >
              <div className="flex items-center gap-2">
                <div 
                  className="w-2.5 h-2.5 rounded-full" 
                  style={{ backgroundColor: person.avatarColor || '#38bdf8' }} 
                />
                <div>
                  <div className="font-bold text-[11px]">{person.name}</div>
                  <div className="text-[9px] text-slate-400">{person.role} • {person.status}</div>
                </div>
              </div>
              <div className="text-right">
                <span className={`text-[10px] font-bold ${
                  person.hydrationScore >= 80 ? 'text-emerald-400' :
                  person.hydrationScore >= 45 ? 'text-amber-400' : 'text-red-400'
                }`}>
                  {person.hydrationScore}%
                </span>
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};
