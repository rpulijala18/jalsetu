import React, { useRef, useEffect, useState } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import type { OrbitControls as OrbitControlsImpl } from 'three-stdlib';
import { useSimulation } from '../../context/SimulationContext';
import { WaterTank } from './WaterTank';
import { Hospital } from './Hospital';
import { School } from './School';
import { ResidentialZone } from './ResidentialZone';
import { Pipeline } from './Pipeline';
import { WaterTanker } from './WaterTanker';
import { RainReserve } from './RainReserve';
import { CommunityEnvironment } from './Environment';
import { CommunityPeople } from './HumanAvatars';
import { ZoneData } from '../../types/simulation';
import { 
  AlertTriangle, 
  X, 
  RotateCcw, 
  Sparkles, 
  MapPin, 
  Camera, 
  Map, 
  Navigation,
  Loader2,
  Users,
  Volume2,
  VolumeX,
  ChevronDown,
  Globe2,
  Radio
} from 'lucide-react';

interface CommunitySceneProps {
  onToggleGoogleMaps?: () => void;
  isGoogleMapsActive?: boolean;
}

export const CommunityScene: React.FC<CommunitySceneProps> = ({
  onToggleGoogleMaps,
  isGoogleMapsActive = false,
}) => {
  const {
    state,
    zones,
    pipelines,
    people,
    selectedPerson,
    setSelectedPerson,
    showPeople,
    setShowPeople,
    selectedZone,
    setSelectedZone,
    cameraFocus,
    setCameraFocus,
    currentLocation,
    locationPresets,
    selectPresetLocation,
    detectLiveLocation,
    isLocating,
    soundEnabled,
    setSoundEnabled,
    broadcastCitizenAlert
  } = useSimulation();

  const controlsRef = useRef<OrbitControlsImpl>(null);
  const [activeViewPreset, setActiveViewPreset] = useState<string>('drone');
  const [showLocationDropdown, setShowLocationDropdown] = useState<boolean>(false);

  // Smooth camera refocus when cameraFocus changes
  useEffect(() => {
    if (controlsRef.current && cameraFocus) {
      controlsRef.current.target.set(cameraFocus[0], cameraFocus[1], cameraFocus[2]);
      controlsRef.current.update();
    }
  }, [cameraFocus]);

  // Set Camera View Presets
  const setCameraPreset = (
    presetId: string, 
    pos: [number, number, number], 
    target: [number, number, number] = [0, 0, 0]
  ) => {
    if (controlsRef.current) {
      setActiveViewPreset(presetId);
      controlsRef.current.object.position.set(...pos);
      controlsRef.current.target.set(...target);
      controlsRef.current.update();
    }
  };

  const handleResetCamera = () => {
    setCameraPreset('drone', [22, 18, 22], [0, 0, 0]);
    setCameraFocus(null);
    setSelectedZone(null);
    setSelectedPerson(null);
  };

  const handleFocusZone = (z: ZoneData) => {
    setSelectedZone(z);
    setSelectedPerson(null);
    setCameraFocus(z.position);
    if (controlsRef.current) {
      controlsRef.current.object.position.set(z.position[0] + 8, z.position[1] + 6, z.position[2] + 8);
      controlsRef.current.target.set(z.position[0], z.position[1], z.position[2]);
      controlsRef.current.update();
    }
  };

  const hospitalZone = zones.find(z => z.id === 'hospital')!;
  const schoolZone = zones.find(z => z.id === 'school')!;
  const zoneA = zones.find(z => z.id === 'zoneA')!;
  const zoneB = zones.find(z => z.id === 'zoneB')!;
  const zoneC = zones.find(z => z.id === 'zoneC')!;

  return (
    <div className="w-full h-full relative select-none bg-[#020612] overflow-hidden">
      {/* 3D Canvas */}
      <Canvas
        camera={{ position: [22, 18, 22], fov: 42 }}
        shadows
        className="w-full h-full cursor-grab active:cursor-grabbing"
        onPointerMissed={() => {
          setSelectedZone(null);
          setSelectedPerson(null);
        }}
      >
        <ambientLight intensity={0.65} />
        <directionalLight 
          position={[18, 30, 20]} 
          intensity={1.6} 
          castShadow 
          shadow-mapSize={[1024, 1024]}
          color="#f8fafc"
        />
        <pointLight position={[0, 8, 0]} intensity={1.8} color="#00f2fe" distance={35} />
        <pointLight position={[-10, 6, -8]} intensity={1.2} color="#38bdf8" distance={25} />

        {/* Environment with Real Satellite Imagery Ground Plane */}
        <CommunityEnvironment />

        {/* Central Water Tank */}
        <WaterTank 
          capacity={state.tankCapacity}
          currentLevel={state.tankLevel}
          isSelected={selectedZone?.id === 'tank'}
          onClick={() => {
            setSelectedPerson(null);
            setSelectedZone({
              id: 'tank',
              name: `${currentLocation.name} Reservoir`,
              type: 'INFRASTRUCTURE',
              population: state.populationTotal,
              priority: 'CRITICAL',
              demandLiters: state.tankCapacity,
              allocationLiters: state.tankLevel,
              status: state.tankLevel < 10000 ? 'CRITICAL' : 'PROTECTED',
              deficitLiters: 0,
              position: [0, 0, 0],
              description: `Primary elevated municipal water storage reservoir feeding ${currentLocation.name}. Capacity: ${state.tankCapacity.toLocaleString()} L.`
            });
            setCameraPreset('tank', [0, 5, 8], [0, 2, 0]);
          }}
        />

        {/* Hospital */}
        {hospitalZone && (
          <Hospital 
            data={hospitalZone}
            isSelected={selectedZone?.id === 'hospital'}
            onClick={() => handleFocusZone(hospitalZone)}
          />
        )}

        {/* School */}
        {schoolZone && (
          <School 
            data={schoolZone}
            isSelected={selectedZone?.id === 'school'}
            onClick={() => handleFocusZone(schoolZone)}
          />
        )}

        {/* Residential Zones */}
        {zoneA && (
          <ResidentialZone 
            data={zoneA}
            isSelected={selectedZone?.id === 'zoneA'}
            onClick={() => handleFocusZone(zoneA)}
          />
        )}
        {zoneB && (
          <ResidentialZone 
            data={zoneB}
            isSelected={selectedZone?.id === 'zoneB'}
            onClick={() => handleFocusZone(zoneB)}
          />
        )}
        {zoneC && (
          <ResidentialZone 
            data={zoneC}
            isSelected={selectedZone?.id === 'zoneC'}
            onClick={() => handleFocusZone(zoneC)}
          />
        )}

        {/* Pipeline Network Segments */}
        {pipelines.map(seg => (
          <Pipeline 
            key={seg.id}
            segment={seg}
            onClick={() => {
              setCameraFocus(seg.path[1] || seg.path[0]);
            }}
          />
        ))}

        {/* Emergency Tanker Vehicle */}
        <WaterTanker 
          locationStatus={state.tankerLocation}
          capacity={state.tankerCapacity}
          waterDelivered={state.tankerWaterDelivered}
          onClick={() => {
            setCameraPreset('tanker', [-12, 4, 12], [-10, 0.4, 6]);
          }}
        />

        {/* Rainwater Reserve */}
        <RainReserve 
          capacity={state.rainReserveCapacity}
          currentLevel={state.rainReserve}
          onClick={() => {
            setCameraPreset('rain', [-5, 4, -7], [-5, 0.5, -11]);
          }}
        />

        {/* Human Citizens, Responders, Doctors, Students, & Engineers in 3D */}
        {showPeople && (
          <CommunityPeople
            people={people}
            onSelectPerson={(p) => {
              setSelectedZone(null);
              setSelectedPerson(p);
              if (controlsRef.current) {
                controlsRef.current.target.set(p.position[0], p.position[1] + 1, p.position[2]);
                controlsRef.current.object.position.set(p.position[0] + 4, p.position[1] + 3, p.position[2] + 4);
                controlsRef.current.update();
              }
            }}
            selectedPersonId={selectedPerson?.id}
          />
        )}

        <OrbitControls 
          ref={controlsRef}
          makeDefault
          enableDamping
          dampingFactor={0.05}
          maxPolarAngle={Math.PI / 2.05}
          minPolarAngle={Math.PI / 8}
          minDistance={4}
          maxDistance={60}
        />
      </Canvas>

      {/* Top HUD: Real Geographic Anchoring, Live Location Presets, & Camera Controls */}
      <div className="absolute top-3 left-3 right-3 z-10 flex flex-wrap items-center justify-between gap-2 font-mono text-xs pointer-events-none">
        {/* Real Location Selector with Presets Drawer & Live GPS */}
        <div className="flex items-center gap-1.5 bg-[#030814]/95 backdrop-blur-xl px-2.5 py-1.5 rounded-xl border border-cyan-500/30 shadow-2xl pointer-events-auto relative">
          {/* Live GPS button */}
          <button
            onClick={detectLiveLocation}
            disabled={isLocating}
            className="px-2.5 py-1 rounded-lg bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-slate-950 font-bold text-[11px] uppercase flex items-center gap-1.5 shadow-glow-cyan active:scale-95 transition-all"
            title="Detect real device GPS coordinates"
          >
            {isLocating ? (
              <Loader2 className="w-3.5 h-3.5 animate-spin text-slate-950" />
            ) : (
              <Navigation className="w-3.5 h-3.5 text-slate-950 fill-current" />
            )}
            <span>{isLocating ? 'LOCATING...' : 'LIVE GPS'}</span>
          </button>

          {/* Current Location Display & Dropdown Trigger */}
          <div className="relative">
            <button
              onClick={() => setShowLocationDropdown(!showLocationDropdown)}
              className="flex items-center gap-1.5 px-2 py-1 rounded-lg hover:bg-slate-800/80 transition-colors text-slate-200"
            >
              <MapPin className="w-3.5 h-3.5 text-red-400 shrink-0" />
              <span className="font-bold text-white text-xs max-w-[130px] truncate">{currentLocation.name}</span>
              <span className="text-[10px] text-cyan-300 bg-cyan-950/80 border border-cyan-500/40 px-1.5 py-0.5 rounded hidden sm:inline">
                {currentLocation.city}
              </span>
              <ChevronDown className="w-3 h-3 text-slate-400" />
            </button>

            {/* Presets Dropdown */}
            {showLocationDropdown && (
              <div className="absolute top-full left-0 mt-2 w-72 bg-[#040d1e]/98 backdrop-blur-2xl border border-cyan-500/40 rounded-xl p-2 shadow-2xl z-50 text-slate-200 space-y-1">
                <div className="text-[10px] text-cyan-400 font-bold px-2 py-1 uppercase tracking-wider flex items-center justify-between">
                  <span className="flex items-center gap-1">
                    <Globe2 className="w-3 h-3" /> REAL-WORLD COMMUNITIES
                  </span>
                  <span className="text-[9px] text-slate-400">{locationPresets.length} PRESETS</span>
                </div>
                <div className="max-h-60 overflow-y-auto space-y-1">
                  {locationPresets.map((loc) => (
                    <button
                      key={loc.id}
                      onClick={() => {
                        selectPresetLocation(loc.id!);
                        setShowLocationDropdown(false);
                      }}
                      className={`w-full text-left px-2.5 py-1.5 rounded-lg transition-all flex flex-col gap-0.5 text-xs ${
                        currentLocation.id === loc.id
                          ? 'bg-cyan-950 text-cyan-200 border border-cyan-500/50'
                          : 'hover:bg-slate-800/60 text-slate-300'
                      }`}
                    >
                      <div className="flex items-center justify-between font-bold text-[11px]">
                        <span>{loc.name}</span>
                        <span className="text-[9px] text-cyan-400">{loc.city}</span>
                      </div>
                      <div className="text-[9px] text-slate-400 truncate">
                        Pop: {loc.population?.toLocaleString()} • {loc.stressProfile?.slice(0, 42)}...
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* View Presets & Human Avatars Controls */}
        <div className="flex items-center gap-1 bg-[#030814]/95 backdrop-blur-xl p-1 rounded-xl border border-cyan-500/30 shadow-2xl pointer-events-auto text-slate-200">
          <span className="text-[10px] text-slate-400 px-1.5 font-semibold flex items-center gap-1 hidden md:flex">
            <Camera className="w-3.5 h-3.5 text-cyan-400" /> VIEW:
          </span>

          {/* Preset: Drone Aerial */}
          <button
            onClick={() => setCameraPreset('drone', [24, 20, 24], [0, 0, 0])}
            className={`px-2.5 py-1 rounded-lg text-[11px] font-bold uppercase transition-all flex items-center gap-1 ${
              activeViewPreset === 'drone' 
                ? 'bg-gradient-to-r from-cyan-500 to-blue-600 text-slate-950 shadow-glow-cyan' 
                : 'text-slate-400 hover:text-white hover:bg-slate-900/60'
            }`}
          >
            <Sparkles className="w-3 h-3" />
            <span className="hidden sm:inline">Drone</span>
          </button>

          {/* Preset: Hospital Ward */}
          <button
            onClick={() => {
              setActiveViewPreset('hospital');
              handleFocusZone(hospitalZone);
            }}
            className={`px-2 py-1 rounded-lg text-[11px] font-bold uppercase transition-all ${
              activeViewPreset === 'hospital' 
                ? 'bg-cyan-600 text-white shadow-glow-cyan' 
                : 'text-slate-400 hover:text-white hover:bg-slate-900/60'
            }`}
          >
            Hospital
          </button>

          {/* Preset: Citizens & Queue */}
          <button
            onClick={() => {
              setActiveViewPreset('people');
              setCameraPreset('people', [-11, 4, 14], [-10.8, 0.8, 9.2]);
              const citizen = people.find(p => p.zoneId === 'zoneA');
              if (citizen) setSelectedPerson(citizen);
            }}
            className={`px-2 py-1 rounded-lg text-[11px] font-bold uppercase transition-all flex items-center gap-1 ${
              activeViewPreset === 'people' 
                ? 'bg-pink-600 text-white shadow-glow-pink' 
                : 'text-slate-400 hover:text-white hover:bg-slate-900/60'
            }`}
          >
            <Users className="w-3 h-3 text-pink-300" />
            Citizens
          </button>

          {/* Toggle People Avatars */}
          <button
            onClick={() => setShowPeople(!showPeople)}
            className={`px-2 py-1 rounded-lg text-[11px] font-bold uppercase transition-all flex items-center gap-1 ${
              showPeople
                ? 'bg-cyan-950 text-cyan-300 border border-cyan-500/40'
                : 'bg-slate-900 text-slate-500 border border-slate-800'
            }`}
            title="Toggle 3D Human Citizens, Doctors, and Engineers"
          >
            <Users className="w-3.5 h-3.5" />
            <span className="text-[10px]">{people.length}</span>
          </button>

          {/* Audio Alert Toggle */}
          <button
            onClick={() => setSoundEnabled(!soundEnabled)}
            className={`p-1.5 rounded-lg transition-all ${
              soundEnabled
                ? 'text-cyan-400 hover:bg-cyan-950/60'
                : 'text-slate-500 hover:bg-slate-900'
            }`}
            title={soundEnabled ? 'Mute Telemetry Sound FX' : 'Enable Telemetry Sound FX'}
          >
            {soundEnabled ? <Volume2 className="w-3.5 h-3.5" /> : <VolumeX className="w-3.5 h-3.5" />}
          </button>

          {/* Toggle Full Google Maps Satellite View */}
          {onToggleGoogleMaps && (
            <button
              onClick={onToggleGoogleMaps}
              className={`px-2.5 py-1 rounded-lg font-bold text-[11px] uppercase transition-all flex items-center gap-1.5 ${
                isGoogleMapsActive
                  ? 'bg-emerald-600 text-slate-950 shadow-glow-emerald'
                  : 'bg-cyan-950 text-cyan-300 border border-cyan-500/40 hover:bg-cyan-900'
              }`}
            >
              <Map className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Google Maps</span>
            </button>
          )}

          {/* Reset Camera */}
          <button
            onClick={handleResetCamera}
            className="p-1 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
            title="Reset Camera"
          >
            <RotateCcw className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Interactive Human / Citizen Profile Card (When clicking on a person in 3D) */}
      {selectedPerson && (
        <div className="absolute top-16 right-4 z-20 w-80 rounded-2xl border border-pink-500/50 bg-[#060a18]/95 backdrop-blur-2xl p-4 shadow-2xl font-mono text-xs text-slate-200">
          <div className="flex items-start justify-between gap-2 border-b border-pink-900/40 pb-2 mb-3">
            <div className="flex items-center gap-2">
              <div className="w-9 h-9 rounded-xl bg-pink-950/80 border border-pink-500/50 flex items-center justify-center text-pink-300">
                <Users className="w-5 h-5" />
              </div>
              <div>
                <span className="text-[10px] text-pink-400 uppercase font-bold tracking-wider">
                  CITIZEN PROFILE
                </span>
                <h3 className="font-display font-extrabold text-sm text-white">
                  {selectedPerson.name}
                </h3>
              </div>
            </div>
            <button
              onClick={() => setSelectedPerson(null)}
              className="p-1 rounded-lg hover:bg-slate-800 text-slate-400 hover:text-white"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          <div className="space-y-2 text-xs">
            <div className="flex items-center justify-between">
              <span className="text-slate-400">Role:</span>
              <span className="font-bold px-2 py-0.5 rounded-full text-[10px] uppercase bg-cyan-950 text-cyan-300 border border-cyan-500/40">
                {selectedPerson.role}
              </span>
            </div>

            <div className="flex items-center justify-between">
              <span className="text-slate-400">Hydration Status:</span>
              <div className="flex items-center gap-2">
                <div className="w-20 h-2 bg-slate-800 rounded-full overflow-hidden">
                  <div 
                    className={`h-full transition-all ${
                      selectedPerson.hydrationScore >= 80 ? 'bg-emerald-400' :
                      selectedPerson.hydrationScore >= 45 ? 'bg-amber-400' : 'bg-red-400'
                    }`} 
                    style={{ width: `${selectedPerson.hydrationScore}%` }} 
                  />
                </div>
                <span className="font-bold text-white text-[11px]">{selectedPerson.hydrationScore}%</span>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <span className="text-slate-400">Current Task:</span>
              <span className="text-cyan-300 text-[11px] font-bold truncate max-w-[170px]">
                {selectedPerson.status}
              </span>
            </div>

            <div className="p-2.5 rounded-xl bg-slate-900/80 border border-slate-800 text-slate-300 italic text-[11px] leading-relaxed">
              "{selectedPerson.quote}"
            </div>

            {/* Direct Citizen Response Action */}
            <div className="pt-2 flex items-center gap-2">
              <button
                onClick={() => {
                  broadcastCitizenAlert(`Priority water relief confirmed for ${selectedPerson.name}'s sector. Standby for delivery.`);
                }}
                className="w-full py-1.5 px-3 rounded-xl bg-gradient-to-r from-pink-600 to-rose-700 hover:from-pink-500 hover:to-rose-600 text-white font-bold text-[11px] flex items-center justify-center gap-1.5 shadow-glow-pink active:scale-95 transition-all"
              >
                <Radio className="w-3.5 h-3.5" />
                <span>SEND DIRECT SECTOR ALERT</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Floating Info Overlay for Selected Building / Infrastructure */}
      {selectedZone && !selectedPerson && (
        <div className="absolute top-16 right-4 z-20 w-80 rounded-2xl border border-cyan-500/40 bg-[#040d1e]/95 backdrop-blur-2xl p-4 shadow-2xl font-mono text-xs text-slate-200">
          <div className="flex items-start justify-between gap-2 border-b border-cyan-950 pb-2 mb-3">
            <div>
              <span className="text-[10px] text-cyan-400 uppercase font-bold tracking-wider">
                INFRASTRUCTURE TELEMETRY
              </span>
              <h3 className="font-display font-extrabold text-base text-white tracking-wide">
                {selectedZone.name}
              </h3>
            </div>
            <button
              onClick={() => setSelectedZone(null)}
              className="p-1 rounded-lg hover:bg-slate-800 text-slate-400 hover:text-white"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          <div className="space-y-2 text-xs">
            <div className="flex items-center justify-between">
              <span className="text-slate-400">Priority:</span>
              <span className={`font-bold px-2 py-0.5 rounded-full text-[10px] uppercase ${
                selectedZone.priority === 'CRITICAL' ? 'bg-red-950 text-red-300 border border-red-500/40' :
                selectedZone.priority === 'HIGH' ? 'bg-amber-950 text-amber-300 border border-amber-500/40' :
                'bg-cyan-950 text-cyan-300 border border-cyan-500/40'
              }`}>
                {selectedZone.priority}
              </span>
            </div>

            <div className="flex items-center justify-between">
              <span className="text-slate-400">Population Served:</span>
              <span className="font-bold text-white">
                {selectedZone.population.toLocaleString()}
              </span>
            </div>

            <div className="flex items-center justify-between">
              <span className="text-slate-400">Water Requirement:</span>
              <span className="font-bold text-cyan-300 font-display text-sm">
                {selectedZone.demandLiters.toLocaleString()} L
              </span>
            </div>

            <div className="flex items-center justify-between">
              <span className="text-slate-400">Current Allocation:</span>
              <span className="font-bold text-emerald-400 font-display text-sm">
                {selectedZone.allocationLiters.toLocaleString()} L
              </span>
            </div>

            <div className="flex items-center justify-between">
              <span className="text-slate-400">Status:</span>
              <span className={`font-bold uppercase ${
                selectedZone.status === 'CRITICAL' ? 'text-red-400' :
                selectedZone.status === 'WARNING' ? 'text-amber-400' :
                'text-emerald-400'
              }`}>
                {selectedZone.status}
              </span>
            </div>

            {selectedZone.deficitLiters > 0 && (
              <div className="p-2.5 rounded-lg bg-red-950/70 border border-red-500/50 text-red-300 font-bold text-[11px] flex items-center gap-1.5 shadow-glow-red/20">
                <AlertTriangle className="w-3.5 h-3.5 text-red-400 animate-pulse" />
                DEFICIT: -{selectedZone.deficitLiters.toLocaleString()} L
              </div>
            )}

            <p className="text-[11px] text-slate-400 pt-2 border-t border-slate-800 leading-relaxed font-sans">
              {selectedZone.description}
            </p>
          </div>
        </div>
      )}
    </div>
  );
};
