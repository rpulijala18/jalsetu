import React, { createContext, useContext, useState, useCallback, ReactNode } from 'react';
import { 
  SimulationState, 
  ZoneData, 
  PipelineSegment, 
  CrisisScenarioType,
  HumanEntity,
  CitizenFeedback
} from '../types/simulation';
import { Incident } from '../types/incident';
import { BedrockResponsePlan, WorkflowStep } from '../types/response';
import { 
  INITIAL_SIMULATION_STATE, 
  COMMUNITY_ZONES, 
  PIPELINE_SEGMENTS, 
  SAMPLE_INCIDENT_JSL104, 
  SAMPLE_AI_RESPONSE_PLAN,
  INITIAL_STEP_FUNCTION_STEPS,
  INITIAL_COMMUNITY_PEOPLE
} from '../simulation/seedData';
import { useLiveLocation, GeoLocationData } from '../hooks/useLiveLocation';
import { sound } from '../utils/audioAlerts';

interface SimulationContextType {
  state: SimulationState;
  zones: ZoneData[];
  pipelines: PipelineSegment[];
  people: HumanEntity[];
  selectedPerson: HumanEntity | null;
  showPeople: boolean;
  incident: Incident | null;
  responsePlan: BedrockResponsePlan | null;
  workflowSteps: WorkflowStep[];
  selectedZone: ZoneData | null;
  cameraFocus: [number, number, number] | null;
  isDemoRunning: boolean;
  activeTab: 'CRISIS' | 'INCIDENT' | 'AI_RESPONSE' | 'WORKFLOW' | 'WHAT_IF' | 'CITIZENS';
  soundEnabled: boolean;
  
  // Real Location & Geocoding
  currentLocation: GeoLocationData;
  locationPresets: GeoLocationData[];
  detectLiveLocation: () => Promise<GeoLocationData | null>;
  searchLocation: (query: string) => Promise<GeoLocationData | null>;
  selectPresetLocation: (presetId: string) => GeoLocationData | null;
  isLocating: boolean;
  locationError: string | null;

  // Actions
  setSelectedZone: (zone: ZoneData | null) => void;
  setSelectedPerson: (person: HumanEntity | null) => void;
  setShowPeople: (show: boolean) => void;
  setSoundEnabled: (enabled: boolean) => void;
  setCameraFocus: (target: [number, number, number] | null) => void;
  setActiveTab: (tab: 'CRISIS' | 'INCIDENT' | 'AI_RESPONSE' | 'WORKFLOW' | 'WHAT_IF' | 'CITIZENS') => void;
  triggerScenario: (scenario: CrisisScenarioType) => void;
  analyzeWithAI: () => Promise<void>;
  executeResponse: () => Promise<void>;
  broadcastCitizenAlert: (message: string) => void;
  runHeroDemo: () => void;
  resetDemo: () => void;
  runWhatIf: (delayHours: number) => void;
  resetWhatIf: () => void;
  isAnalyzing: boolean;
  isExecuting: boolean;
}

const SimulationContext = createContext<SimulationContextType | undefined>(undefined);

export const SimulationProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const { 
    location: currentLocation, 
    detectLiveLocation: detectGeo, 
    searchLocation: searchGeo, 
    selectPresetLocation: selectPresetGeo,
    isLoading: isLocating, 
    error: locationError,
    presets: locationPresets
  } = useLiveLocation();

  const [state, setState] = useState<SimulationState>(INITIAL_SIMULATION_STATE);
  const [zones, setZones] = useState<ZoneData[]>(COMMUNITY_ZONES);
  const [pipelines, setPipelines] = useState<PipelineSegment[]>(PIPELINE_SEGMENTS);
  const [people, setPeople] = useState<HumanEntity[]>(INITIAL_COMMUNITY_PEOPLE);
  const [selectedPerson, setSelectedPerson] = useState<HumanEntity | null>(null);
  const [showPeople, setShowPeople] = useState<boolean>(true);
  const [soundEnabled, setSoundEnabledState] = useState<boolean>(true);

  const [incident, setIncident] = useState<Incident | null>(null);
  const [responsePlan, setResponsePlan] = useState<BedrockResponsePlan | null>(null);
  const [workflowSteps, setWorkflowSteps] = useState<WorkflowStep[]>(INITIAL_STEP_FUNCTION_STEPS);
  const [selectedZone, setSelectedZone] = useState<ZoneData | null>(null);
  const [cameraFocus, setCameraFocus] = useState<[number, number, number] | null>(null);
  const [isDemoRunning, setIsDemoRunning] = useState<boolean>(false);
  const [isAnalyzing, setIsAnalyzing] = useState<boolean>(false);
  const [isExecuting, setIsExecuting] = useState<boolean>(false);
  const [activeTab, setActiveTab] = useState<'CRISIS' | 'INCIDENT' | 'AI_RESPONSE' | 'WORKFLOW' | 'WHAT_IF' | 'CITIZENS'>('CRISIS');

  const setSoundEnabled = useCallback((enabled: boolean) => {
    setSoundEnabledState(enabled);
    sound.enabled = enabled;
  }, []);

  // Dynamically tailor zone names, demands, and population to the real location
  const adaptZonesToLocation = useCallback((loc: GeoLocationData) => {
    const pop = loc.population || 2840;
    const baseDemand = loc.dailyDemandLiters || 29000;

    setZones(prev => prev.map(z => {
      if (z.id === 'hospital') {
        return { 
          ...z, 
          name: loc.hospitalName || `${loc.name} General Hospital`,
          population: Math.round(pop * 0.11),
          demandLiters: Math.round(baseDemand * 0.20),
          allocationLiters: Math.round(baseDemand * 0.20),
          description: `Critical care hospital serving ${loc.name}. Zero tolerance for water stoppage.`
        };
      }
      if (z.id === 'school') {
        return { 
          ...z, 
          name: loc.schoolName || `${loc.name} Public School`,
          population: Math.round(pop * 0.18),
          demandLiters: Math.round(baseDemand * 0.10),
          allocationLiters: Math.round(baseDemand * 0.10),
          description: `Primary and secondary school campus in ${loc.name}.`
        };
      }
      if (z.id === 'zoneA') {
        return { 
          ...z, 
          name: loc.sectorAName || `${loc.name} Sector A (North)`,
          population: Math.round(pop * 0.28),
          demandLiters: Math.round(baseDemand * 0.28),
          allocationLiters: Math.round(baseDemand * 0.28),
          description: `High-density multi-story residential enclave in ${loc.name}.`
        };
      }
      if (z.id === 'zoneB') {
        return { 
          ...z, 
          name: loc.sectorBName || `${loc.name} Sector B (Central)`,
          population: Math.round(pop * 0.26),
          demandLiters: Math.round(baseDemand * 0.24),
          allocationLiters: Math.round(baseDemand * 0.24),
          description: `Central residential ward connected to the main municipal distribution grid.`
        };
      }
      if (z.id === 'zoneC') {
        return { 
          ...z, 
          name: loc.sectorCName || `${loc.name} Sector C (East)`,
          population: Math.round(pop * 0.17),
          demandLiters: Math.round(baseDemand * 0.18),
          allocationLiters: Math.round(baseDemand * 0.18),
          description: `Eastern residential & mixed commercial corridor.`
        };
      }
      return z;
    }));

    setState(prev => ({
      ...prev,
      populationTotal: pop,
      populationProtected: pop,
      tankCapacity: Math.round(baseDemand * 1.1),
      tankLevel: Math.round(baseDemand * 0.65),
      hospitalDemand: Math.round(baseDemand * 0.20),
      hospitalAllocation: Math.round(baseDemand * 0.20),
      schoolDemand: Math.round(baseDemand * 0.10),
      schoolAllocation: Math.round(baseDemand * 0.10),
      zoneADemand: Math.round(baseDemand * 0.28),
      zoneAAllocation: Math.round(baseDemand * 0.28),
      zoneBDemand: Math.round(baseDemand * 0.24),
      zoneBAllocation: Math.round(baseDemand * 0.24),
      zoneCDemand: Math.round(baseDemand * 0.18),
      zoneCAllocation: Math.round(baseDemand * 0.18),
    }));
  }, []);

  const detectLiveLocation = useCallback(async () => {
    sound.playClick();
    const res = await detectGeo();
    if (res) {
      adaptZonesToLocation(res);
    }
    return res;
  }, [detectGeo, adaptZonesToLocation]);

  const selectPresetLocation = useCallback((presetId: string) => {
    sound.playClick();
    const res = selectPresetGeo(presetId);
    if (res) {
      adaptZonesToLocation(res);
    }
    return res;
  }, [selectPresetGeo, adaptZonesToLocation]);

  const searchLocation = useCallback(async (query: string) => {
    sound.playClick();
    const res = await searchGeo(query);
    if (res) {
      adaptZonesToLocation(res);
    }
    return res;
  }, [searchGeo, adaptZonesToLocation]);

  // Reset to default baseline
  const resetDemo = useCallback(() => {
    sound.playClick();
    setState(INITIAL_SIMULATION_STATE);
    setZones(COMMUNITY_ZONES);
    setPipelines(PIPELINE_SEGMENTS);
    setPeople(INITIAL_COMMUNITY_PEOPLE);
    setIncident(null);
    setResponsePlan(null);
    setWorkflowSteps(INITIAL_STEP_FUNCTION_STEPS);
    setSelectedZone(null);
    setSelectedPerson(null);
    setCameraFocus(null);
    setIsDemoRunning(false);
    setIsAnalyzing(false);
    setIsExecuting(false);
    setActiveTab('CRISIS');
  }, []);

  // Broadcast citizen emergency SMS/PA message
  const broadcastCitizenAlert = useCallback((message: string) => {
    sound.playDispatch();
    const newBroadcast: CitizenFeedback = {
      id: `broadcast-${Date.now()}`,
      author: 'Municipal Emergency Broadcast',
      role: 'Automated Citizen Alert System',
      location: currentLocation.name,
      time: 'Just now',
      sentiment: 'POSITIVE',
      message: message,
      verified: true
    };
    setState(prev => ({
      ...prev,
      activeCitizenFeed: [newBroadcast, ...prev.activeCitizenFeed]
    }));
  }, [currentLocation]);

  // Trigger Crisis Scenario
  const triggerScenario = useCallback((scenario: CrisisScenarioType) => {
    sound.playAlarm();

    if (scenario === 'MAIN_PIPELINE_FAILURE') {
      setPipelines(prev => prev.map(p => 
        p.id === 'pipe-hub-zoneA' || p.id === 'pipe-tank-hub' 
          ? { ...p, status: 'FAILED', flowRate: 0 } 
          : p
      ));

      const newIncident: Incident = {
        ...SAMPLE_INCIDENT_JSL104,
        id: `JSL-${Math.floor(100 + Math.random() * 900)}`,
        detectedAt: new Date().toISOString(),
        description: `Sudden pressure collapse in ${currentLocation.name} trunk distribution manifold. Flow to Sector A completely interrupted.`
      };
      setIncident(newIncident);

      setZones(prev => prev.map(z => {
        if (z.id === 'zoneA') {
          return { ...z, status: 'CRITICAL', deficitLiters: z.demandLiters, allocationLiters: 0 };
        }
        if (z.id === 'hospital') {
          return { ...z, priority: 'CRITICAL', status: 'WARNING' };
        }
        if (z.id === 'school') {
          return { ...z, priority: 'HIGH', status: 'WARNING' };
        }
        return z;
      }));

      // Humanized citizen panic & stress
      setPeople(prev => prev.map(p => {
        if (p.zoneId === 'zoneA') {
          return {
            ...p,
            hydrationScore: 32,
            status: 'Dry taps reported - awaiting emergency relief',
            quote: 'Our taps ran completely dry 15 minutes ago. We desperately need an emergency tanker.'
          };
        }
        if (p.role === 'DOCTOR') {
          return {
            ...p,
            hydrationScore: 68,
            status: 'Monitoring backup sterilization water buffer',
            quote: 'Dialysis unit water pressure is dropping toward danger limits. We need priority protection!'
          };
        }
        if (p.role === 'ENGINEER') {
          return {
            ...p,
            status: 'Tracing manifold rupture location with ultrasound',
            quote: 'Pipeline burst detected at junction 4. Diverting flows to avoid back-siphonage.'
          };
        }
        return p;
      }));

      const panicFeedback: CitizenFeedback = {
        id: `sos-${Date.now()}`,
        author: 'Sunita Sharma',
        role: 'Resident & Mother of 2',
        location: `${currentLocation.name} Sector A`,
        time: 'Just now',
        sentiment: 'CRITICAL',
        message: 'Pipeline failure! Domestic taps have zero pressure. Over 800 families currently without water.',
        verified: true
      };

      setState(prev => ({
        ...prev,
        pipelineStatus: 'FAILED',
        activeIncident: true,
        activeIncidentId: newIncident.id,
        currentScenario: 'MAIN_PIPELINE_FAILURE',
        zoneAAllocation: 0,
        waterSecurityScore: 42,
        timeToShortageHours: 3.4,
        populationProtected: Math.round(prev.populationTotal * 0.58),
        humanStressIndex: 86,
        grievanceQueueLength: 48,
        activeCitizenFeed: [panicFeedback, ...prev.activeCitizenFeed],
        tankLevel: Math.round(prev.tankLevel * 0.88),
      }));

      setActiveTab('INCIDENT');
    } else if (scenario === 'DROUGHT') {
      const droughtIncident: Incident = {
        id: `JSL-DR-${Math.floor(100 + Math.random() * 900)}`,
        title: `Severe Drought Alert: ${currentLocation.name}`,
        scenarioType: 'DROUGHT',
        severity: 'HIGH',
        status: 'DETECTED',
        detectedAt: new Date().toISOString(),
        affectedZonesCount: 5,
        criticalFacilitiesCount: 2,
        estimatedTimeToShortage: '4h 50m',
        currentReserveLiters: 6500,
        description: `Upstream supply cut across ${currentLocation.city}. Total reservoir storage fallen to 22% critical threshold.`,
        sensorAlerts: ['Reservoir Depth Critical: 0.65m', 'Inflow Velocity: 0 L/min', 'Upstream Dam Release Delayed']
      };
      setIncident(droughtIncident);

      setState(prev => ({
        ...prev,
        tankLevel: 6500,
        waterSecurityScore: 48,
        activeIncident: true,
        activeIncidentId: droughtIncident.id,
        currentScenario: 'DROUGHT',
        humanStressIndex: 78,
        grievanceQueueLength: 34,
      }));
      setActiveTab('INCIDENT');
    } else if (scenario === 'PIPELINE_LEAK') {
      setPipelines(prev => prev.map(p => 
        p.id === 'pipe-hub-zoneB' ? { ...p, status: 'WARNING', flowRate: 0.5 } : p
      ));
      const leakIncident: Incident = {
        id: `JSL-LK-${Math.floor(100 + Math.random() * 900)}`,
        title: `Secondary Line Fracture: Sector B`,
        scenarioType: 'PIPELINE_LEAK',
        severity: 'MEDIUM',
        status: 'DETECTED',
        detectedAt: new Date().toISOString(),
        affectedZonesCount: 1,
        criticalFacilitiesCount: 0,
        estimatedTimeToShortage: '7h 15m',
        currentReserveLiters: 16800,
        description: `Subsurface fracture detected in ${currentLocation.name} Sector B. Water escaping at 850 L/hr.`,
        sensorAlerts: ['Acoustic Ultrasound Sensor #AL-09 Rupture Frequency', 'Manifold Delta: -35%']
      };
      setIncident(leakIncident);

      setState(prev => ({
        ...prev,
        pipelineStatus: 'PARTIAL',
        waterSecurityScore: 66,
        activeIncident: true,
        activeIncidentId: leakIncident.id,
        currentScenario: 'PIPELINE_LEAK',
        humanStressIndex: 54,
        grievanceQueueLength: 16,
      }));
      setActiveTab('INCIDENT');
    }
  }, [currentLocation]);

  // Bedrock AI Analysis
  const analyzeWithAI = useCallback(async () => {
    sound.playClick();
    setIsAnalyzing(true);
    await new Promise(r => setTimeout(r, 1100));

    sound.playSuccess();
    setResponsePlan({
      ...SAMPLE_AI_RESPONSE_PLAN,
      incidentSummary: `Amazon Bedrock synthesized live telemetry for ${currentLocation.name}. Preserving hospital dialysis & school buffers via priority ring-fencing, followed by autonomous 8,000L emergency tanker routing to Sector A.`,
      generatedAt: new Date().toISOString()
    });
    if (incident) {
      setIncident({
        ...incident,
        status: 'PLAN_GENERATED'
      });
    }
    setIsAnalyzing(false);
    setActiveTab('AI_RESPONSE');
  }, [incident, currentLocation]);

  // Execute Step Functions Workflow
  const executeResponse = useCallback(async () => {
    if (!responsePlan) return;
    sound.playDispatch();
    setIsExecuting(true);
    setActiveTab('WORKFLOW');

    const stepIds: WorkflowStep['id'][] = [
      'INCIDENT',
      'VALIDATE',
      'PRIORITIZE',
      'ALLOCATE',
      'DISPATCH',
      'CONSERVE',
      'VERIFY',
      'RESOLVED'
    ];

    for (let i = 0; i < stepIds.length; i++) {
      const stepId = stepIds[i];
      setWorkflowSteps(prev => prev.map((s, idx) => {
        if (idx < i) return { ...s, status: 'COMPLETED' };
        if (idx === i) return { ...s, status: 'RUNNING' };
        return { ...s, status: 'PENDING' };
      }));

      if (stepId === 'ALLOCATE') {
        setZones(prev => prev.map(z => {
          if (z.id === 'hospital') return { ...z, status: 'PROTECTED', allocationLiters: z.demandLiters };
          if (z.id === 'school') return { ...z, status: 'PROTECTED', allocationLiters: z.demandLiters };
          return z;
        }));
      }

      if (stepId === 'DISPATCH') {
        sound.playDispatch();
        setState(prev => ({
          ...prev,
          tankerAvailable: false,
          tankerLocation: 'EN_ROUTE_ZONE_A'
        }));
        setPeople(prev => prev.map(p => {
          if (p.role === 'TANKER_DRIVER') {
            return {
              ...p,
              status: 'En route with 8,000L priority load to Sector A',
              quote: 'Emergency siren on. ETA to Sector A community point is 4 minutes.'
            };
          }
          return p;
        }));
      }

      if (stepId === 'CONSERVE') {
        setState(prev => ({
          ...prev,
          rainReserve: 0,
          tankLevel: prev.tankLevel + 4000,
          zoneBAllocation: Math.round(prev.zoneBDemand * 0.6),
          waterConserved: 9400,
        }));
        setZones(prev => prev.map(z => {
          if (z.id === 'zoneB') return { ...z, allocationLiters: Math.round(z.demandLiters * 0.6), status: 'OPTIMAL' };
          if (z.id === 'zoneA') return { ...z, allocationLiters: z.demandLiters, status: 'PROTECTED', deficitLiters: 0 };
          return z;
        }));
      }

      await new Promise(r => setTimeout(r, 550));
    }

    sound.playSuccess();
    setWorkflowSteps(prev => prev.map(s => ({ ...s, status: 'COMPLETED' })));

    // Re-hydrate humans and log positive citizen feedback
    const relievedFeedback: CitizenFeedback = {
      id: `relief-${Date.now()}`,
      author: 'Sunita Sharma',
      role: 'Resident & Mother of 2',
      location: `${currentLocation.name} Sector A`,
      time: 'Just now',
      sentiment: 'RELIEVED',
      message: 'Tanker arrived safely! Water distributed to all ground-floor storage points. Orderly line, zero disputes.',
      verified: true
    };

    setPeople(prev => prev.map(p => {
      if (p.zoneId === 'zoneA') {
        return {
          ...p,
          hydrationScore: 92,
          status: 'Water replenished via emergency tanker',
          quote: 'Water delivered on time! Our families are relieved.'
        };
      }
      if (p.role === 'DOCTOR') {
        return {
          ...p,
          hydrationScore: 99,
          status: 'Trauma & Dialysis units secured at 100% capacity',
          quote: 'Zero disruption to dialysis beds. Bedrock priority ring-fencing succeeded.'
        };
      }
      return p;
    }));

    setState(prev => ({
      ...prev,
      tankerLocation: 'ZONE_A',
      tankerWaterDelivered: 8000,
      activeIncident: false,
      stepFunctionsStatus: 'COMPLETED',
      populationProtected: prev.populationTotal,
      criticalFacilitiesProtected: 2,
      waterSecurityScore: 96,
      timeToShortageHours: 32.0,
      waterConserved: 9400,
      humanStressIndex: 18,
      grievanceQueueLength: 3,
      activeCitizenFeed: [relievedFeedback, ...prev.activeCitizenFeed]
    }));

    if (incident) {
      setIncident({
        ...incident,
        status: 'RESOLVED'
      });
    }

    setIsExecuting(false);
  }, [responsePlan, incident, currentLocation]);

  // Run Hero Demo
  const runHeroDemo = useCallback(async () => {
    resetDemo();
    setIsDemoRunning(true);

    await new Promise(r => setTimeout(r, 1200));
    triggerScenario('MAIN_PIPELINE_FAILURE');
    await new Promise(r => setTimeout(r, 2000));
    await analyzeWithAI();
    await new Promise(r => setTimeout(r, 2200));
    await executeResponse();
    setIsDemoRunning(false);
  }, [resetDemo, triggerScenario, analyzeWithAI, executeResponse]);

  // What-If Simulation
  const runWhatIf = useCallback((delayHours: number) => {
    sound.playClick();
    setState(prev => ({
      ...prev,
      isWhatIfActive: true,
      whatIfDelayHours: delayHours,
      waterSecurityScore: Math.max(28, prev.waterSecurityScore - 26),
      humanStressIndex: Math.min(96, prev.humanStressIndex + 38),
    }));
    setActiveTab('WHAT_IF');
  }, []);

  const resetWhatIf = useCallback(() => {
    sound.playClick();
    setState(prev => ({
      ...prev,
      isWhatIfActive: false,
      whatIfDelayHours: undefined,
      waterSecurityScore: 96,
      humanStressIndex: 18,
    }));
  }, []);

  return (
    <SimulationContext.Provider
      value={{
        state,
        zones,
        pipelines,
        people,
        selectedPerson,
        showPeople,
        incident,
        responsePlan,
        workflowSteps,
        selectedZone,
        cameraFocus,
        isDemoRunning,
        activeTab,
        soundEnabled,
        currentLocation,
        locationPresets,
        detectLiveLocation,
        searchLocation,
        selectPresetLocation,
        isLocating,
        locationError,
        setSelectedZone,
        setSelectedPerson,
        setShowPeople,
        setSoundEnabled,
        setCameraFocus,
        setActiveTab,
        triggerScenario,
        analyzeWithAI,
        executeResponse,
        broadcastCitizenAlert,
        runHeroDemo,
        resetDemo,
        runWhatIf,
        resetWhatIf,
        isAnalyzing,
        isExecuting,
      }}
    >
      {children}
    </SimulationContext.Provider>
  );
};

export const useSimulation = () => {
  const context = useContext(SimulationContext);
  if (!context) {
    throw new Error('useSimulation must be used within a SimulationProvider');
  }
  return context;
};
