import { CrisisScenarioType } from './simulation';

export type IncidentSeverity = 'LOW' | 'MEDIUM' | 'HIGH' | 'CRITICAL';
export type IncidentStatus = 'DETECTED' | 'AI_ANALYSIS_IN_PROGRESS' | 'PLAN_GENERATED' | 'EXECUTING' | 'RESOLVED';

export interface Incident {
  id: string; // e.g. "JSL-104"
  title: string;
  scenarioType: CrisisScenarioType;
  severity: IncidentSeverity;
  status: IncidentStatus;
  detectedAt: string;
  affectedZonesCount: number;
  criticalFacilitiesCount: number;
  estimatedTimeToShortage: string; // e.g. "3h 42m"
  currentReserveLiters: number;
  description: string;
  sensorAlerts: string[];
}
