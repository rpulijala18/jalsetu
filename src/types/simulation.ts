export type PipelineStatus = 'NORMAL' | 'WARNING' | 'FAILED' | 'PARTIAL';

export type CrisisScenarioType = 
  | 'MAIN_PIPELINE_FAILURE'
  | 'DROUGHT'
  | 'TANKER_DELAY'
  | 'DEMAND_SURGE'
  | 'FLOOD'
  | 'PIPELINE_LEAK';

export interface ZoneData {
  id: string;
  name: string;
  type: 'HOSPITAL' | 'SCHOOL' | 'RESIDENTIAL' | 'INFRASTRUCTURE';
  population: number;
  priority: 'CRITICAL' | 'HIGH' | 'MEDIUM' | 'STANDARD';
  demandLiters: number;
  allocationLiters: number;
  status: 'PROTECTED' | 'OPTIMAL' | 'WARNING' | 'CRITICAL' | 'DEFICIT';
  deficitLiters: number;
  position: [number, number, number];
  description: string;
}

export interface PipelineSegment {
  id: string;
  from: string;
  to: string;
  status: PipelineStatus;
  flowRate: number; // 0 to 1
  path: [number, number, number][];
}

export interface CitizenFeedback {
  id: string;
  author: string;
  role: string;
  location: string;
  time: string;
  sentiment: 'POSITIVE' | 'NEUTRAL' | 'CRITICAL' | 'RELIEVED';
  message: string;
  verified: boolean;
}

export interface HumanEntity {
  id: string;
  name: string;
  role: 'DOCTOR' | 'NURSE' | 'CITIZEN' | 'STUDENT' | 'ENGINEER' | 'TANKER_DRIVER';
  position: [number, number, number];
  zoneId: string;
  status: string;
  hydrationScore: number; // 0 to 100
  quote: string;
  avatarColor: string;
}

export interface SimulationState {
  // Central Tank
  tankCapacity: number;
  tankLevel: number;
  pipelineStatus: PipelineStatus;
  
  // Zones & Facilities
  hospitalDemand: number;
  hospitalAllocation: number;
  schoolDemand: number;
  schoolAllocation: number;
  zoneADemand: number;
  zoneAAllocation: number;
  zoneBDemand: number;
  zoneBAllocation: number;
  zoneCDemand: number;
  zoneCAllocation: number;
  
  // Tanker & Reserves
  tankerAvailable: boolean;
  tankerLocation: string; // 'DEPOT' | 'EN_ROUTE_ZONE_A' | 'ZONE_A' | 'DELIVERING'
  tankerCapacity: number;
  tankerWaterDelivered: number;
  
  rainReserve: number;
  rainReserveCapacity: number;
  rainfall: number;
  
  // Metrics & Protection
  populationTotal: number;
  populationProtected: number;
  criticalFacilitiesTotal: number;
  criticalFacilitiesProtected: number;
  waterConserved: number;
  waterSecurityScore: number; // 0 - 100
  timeToShortageHours: number;

  // Humanized Impact Metrics
  humanStressIndex: number; // 0 - 100%
  vulnerableProtected: number; // Infants, ICU patients, elderly
  grievanceQueueLength: number;
  activeCitizenFeed: CitizenFeedback[];
  
  // Crisis & Incident
  activeIncident: boolean;
  activeIncidentId?: string;
  currentScenario?: CrisisScenarioType;
  stepFunctionsStatus?: 'IDLE' | 'PENDING' | 'RUNNING' | 'COMPLETED' | 'FAILED';
  
  // Simulation clock
  simTick: number;
  simSpeed: number; // 1x, 2x, etc.
  isPaused: boolean;
  
  // What-If comparison state
  isWhatIfActive: boolean;
  whatIfDelayHours?: number;
}
