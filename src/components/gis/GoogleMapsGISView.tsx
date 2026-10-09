import React, { useState } from 'react';
import { 
  MapPin, 
  Layers, 
  Compass, 
  Truck, 
  Building2, 
  Droplets, 
  AlertOctagon, 
  Search, 
  Sparkles,
  ExternalLink,
  Loader2,
  Navigation,
  Globe
} from 'lucide-react';
import { SimulationState, ZoneData } from '../../types/simulation';
import { useSimulation } from '../../context/SimulationContext';

interface GoogleMapsGISViewProps {
  state: SimulationState;
  zones?: ZoneData[];
  onSelectZone?: (zone: ZoneData) => void;
  onSwitchTo3D?: () => void;
}

const POPULAR_LOCATIONS = [
  { name: 'East Delhi', query: 'Lakshmi Nagar, East Delhi, India' },
  { name: 'Bengaluru', query: 'Bellandur, Bengaluru, Karnataka, India' },
  { name: 'Mumbai', query: 'Bandra West, Mumbai, Maharashtra, India' },
  { name: 'Jaipur', query: 'Malviya Nagar, Jaipur, Rajasthan, India' },
  { name: 'Hyderabad', query: 'Hitec City, Hyderabad, Telangana, India' }
];

export const GoogleMapsGISView: React.FC<GoogleMapsGISViewProps> = ({
  state,
  onSwitchTo3D
}) => {
  const { 
    currentLocation, 
    detectLiveLocation, 
    searchLocation, 
    isLocating, 
    locationError 
  } = useSimulation();

  const [mapType, setMapType] = useState<'k' | 'm'>('k'); // 'k' = satellite, 'm' = roadmap
  const [showOverlays, setShowOverlays] = useState<boolean>(true);
  const [searchQuery, setSearchQuery] = useState<string>('');

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      searchLocation(searchQuery);
    }
  };

  const googleMapsUrl = `https://maps.google.com/maps?q=${currentLocation.lat},${currentLocation.lng}&z=16&t=${mapType}&output=embed`;

  return (
    <div className="relative w-full h-full bg-[#020611] overflow-hidden flex flex-col font-mono text-xs select-none">
      {/* Top GIS Control & Search Bar */}
      <div className="z-20 bg-[#040c1a]/95 backdrop-blur-xl border-b border-cyan-500/20 px-4 py-2 flex flex-wrap items-center justify-between gap-3 text-slate-200">
        {/* Real Coordinate Telemetry & Live Location Trigger */}
        <div className="flex items-center gap-2.5 flex-wrap">
          <button
            onClick={detectLiveLocation}
            disabled={isLocating}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-slate-950 font-bold text-xs uppercase shadow-glow-cyan active:scale-95 transition-all"
            title="Detect real device GPS coordinates"
          >
            {isLocating ? (
              <Loader2 className="w-3.5 h-3.5 animate-spin text-slate-950" />
            ) : (
              <Navigation className="w-3.5 h-3.5 text-slate-950 fill-current" />
            )}
            <span>{isLocating ? 'LOCATING...' : 'USE MY LIVE GPS'}</span>
          </button>

          <div className="flex items-center gap-2 px-3 py-1 rounded-lg bg-[#071324] border border-cyan-500/30">
            <span className={`w-2 h-2 rounded-full ${currentLocation.isLive ? 'bg-emerald-400 animate-ping' : 'bg-cyan-400'}`} />
            <span className="text-cyan-300 font-bold">
              {currentLocation.lat.toFixed(4)}° N, {currentLocation.lng.toFixed(4)}° E
            </span>
            <span className="text-slate-400 hidden sm:inline">• {currentLocation.name}, {currentLocation.city}</span>
          </div>
        </div>

        {/* Search Bar for Any Locality */}
        <form onSubmit={handleSearchSubmit} className="flex items-center gap-1.5">
          <div className="relative">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search any locality (e.g. Indiranagar, Rohini)..."
              className="bg-[#071324] border border-cyan-500/30 text-white placeholder:text-slate-500 px-3 py-1.5 rounded-lg text-xs font-mono outline-none focus:border-cyan-400 focus:shadow-glow-cyan w-56 sm:w-64 transition-all"
            />
          </div>
          <button
            type="submit"
            className="px-3 py-1.5 rounded-lg bg-cyan-950 hover:bg-cyan-900 border border-cyan-500/40 text-cyan-300 font-bold transition-colors"
          >
            <Search className="w-3.5 h-3.5" />
          </button>
        </form>

        {/* View Switchers */}
        <div className="flex items-center gap-2">
          {/* Quick city jump tags */}
          <div className="hidden xl:flex items-center gap-1 text-[10px]">
            {POPULAR_LOCATIONS.map((loc) => (
              <button
                key={loc.name}
                onClick={() => searchLocation(loc.query)}
                className="px-2 py-0.5 rounded bg-slate-900/80 hover:bg-cyan-950 hover:text-cyan-300 border border-slate-800 text-slate-400 transition-colors"
              >
                {loc.name}
              </button>
            ))}
          </div>

          {/* Map Layer Mode */}
          <div className="flex items-center rounded-lg bg-[#071324] border border-cyan-500/20 p-0.5">
            <button
              onClick={() => setMapType('k')}
              className={`px-2.5 py-1 rounded text-[11px] font-bold uppercase transition-all ${
                mapType === 'k' ? 'bg-cyan-600 text-white shadow-sm' : 'text-slate-400 hover:text-white'
              }`}
            >
              Satellite
            </button>
            <button
              onClick={() => setMapType('m')}
              className={`px-2.5 py-1 rounded text-[11px] font-bold uppercase transition-all ${
                mapType === 'm' ? 'bg-cyan-600 text-white shadow-sm' : 'text-slate-400 hover:text-white'
              }`}
            >
              Roadmap
            </button>
          </div>

          {/* Toggle telemetry HUD */}
          <button
            onClick={() => setShowOverlays(!showOverlays)}
            className={`px-2.5 py-1 rounded-lg border text-xs font-bold uppercase transition-all ${
              showOverlays 
                ? 'bg-cyan-950 text-cyan-300 border-cyan-500/50 shadow-glow-cyan/20' 
                : 'bg-slate-900 text-slate-400 border-slate-800'
            }`}
          >
            <Layers className="w-3.5 h-3.5 inline mr-1" />
            HUD
          </button>

          {/* Return to 3D Twin */}
          {onSwitchTo3D && (
            <button
              onClick={onSwitchTo3D}
              className="px-3 py-1 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-slate-950 font-bold text-xs uppercase shadow-glow-emerald transition-all"
            >
              Switch to 3D Twin
            </button>
          )}
        </div>
      </div>

      {/* Error banner if GPS denied */}
      {locationError && (
        <div className="bg-red-950/90 border-b border-red-500/40 text-red-200 px-4 py-1 text-xs font-mono flex items-center justify-between z-20">
          <span>⚠️ {locationError}</span>
        </div>
      )}

      {/* Main Map Container */}
      <div className="relative flex-1 w-full h-full">
        {/* Google Maps Real Iframe */}
        <iframe
          title="Google Maps Real Location Satellite"
          src={googleMapsUrl}
          className="w-full h-full border-0 filter contrast-[1.08] saturate-[1.12]"
          loading="lazy"
          allowFullScreen
        />

        {/* Dynamic Telemetry Overlay Layer */}
        {showOverlays && (
          <div className="absolute inset-0 pointer-events-none p-4 flex flex-col justify-between">
            {/* Top Overlay: Community Overview & Incident Status */}
            <div className="flex flex-wrap items-start justify-between gap-3 pointer-events-auto">
              <div className="bg-[#030a17]/90 backdrop-blur-xl p-3.5 rounded-xl border border-cyan-500/30 shadow-2xl max-w-sm">
                <div className="flex items-center gap-2 text-cyan-300 font-bold font-display text-sm uppercase">
                  <MapPin className="w-4 h-4 text-cyan-400" />
                  {currentLocation.name} Digital Twin
                </div>
                <div className="text-xs text-slate-300 mt-1">
                  {currentLocation.city} {currentLocation.country ? `• ${currentLocation.country}` : ''}
                </div>
                <div className="mt-2 pt-2 border-t border-cyan-950 flex items-center justify-between text-[11px]">
                  <span className="text-slate-400 uppercase font-semibold">Population Connected:</span>
                  <span className="text-white font-bold">{state.populationTotal.toLocaleString()}</span>
                </div>
              </div>

              {/* Status Alert Banner */}
              {state.activeIncident && (
                <div className="bg-red-950/90 backdrop-blur-xl p-3.5 rounded-xl border border-red-500/50 shadow-glow-red max-w-xs animate-pulse">
                  <div className="flex items-center gap-1.5 font-bold text-xs uppercase text-red-300">
                    <AlertOctagon className="w-4 h-4 text-red-400" />
                    LIVE SATELLITE BREACH ALERT
                  </div>
                  <div className="text-xs text-red-100 mt-1">
                    Main distribution feeder fracture mapped in {currentLocation.name}.
                  </div>
                </div>
              )}
            </div>

            {/* Bottom Overlay: Key GIS Markers on Real Map */}
            <div className="flex flex-wrap items-end justify-between gap-4 pointer-events-auto">
              {/* Infrastructure Markers Quick HUD */}
              <div className="bg-[#030a17]/90 backdrop-blur-xl p-3 rounded-xl border border-cyan-500/30 shadow-2xl flex flex-wrap gap-2 text-xs">
                <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#071324] border border-cyan-500/30 text-cyan-300">
                  <Droplets className="w-3.5 h-3.5 text-cyan-400" />
                  <span>Central Reservoir (30,000 L)</span>
                </div>

                <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#071324] border border-red-500/30 text-red-300">
                  <Building2 className="w-3.5 h-3.5 text-red-400" />
                  <span>{currentLocation.name} Hospital (ICU Priority)</span>
                </div>

                <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#071324] border border-amber-500/30 text-amber-300">
                  <Truck className="w-3.5 h-3.5 text-amber-400" />
                  <span>Tanker Convoy #{state.tankerLocation}</span>
                </div>
              </div>

              {/* Google Maps External View Action */}
              <a
                href={`https://www.google.com/maps/search/?api=1&query=${currentLocation.lat},${currentLocation.lng}`}
                target="_blank"
                rel="noopener noreferrer"
                className="px-3.5 py-2 rounded-xl bg-[#030a17]/90 hover:bg-[#071324] text-cyan-300 border border-cyan-500/40 text-xs shadow-glow-cyan/20 flex items-center gap-1.5 transition-colors"
              >
                <span>Open in Google Maps</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
