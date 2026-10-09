export interface ResponseAction {
  action: 'RESERVE_WATER' | 'DISPATCH_TANKER' | 'ACTIVATE_RAIN_RESERVE' | 'REDUCE_CONSUMPTION' | 'NOTIFY_OPERATOR';
  target: string;
  amountLiters?: number;
  percentageReduction?: number;
  description?: string;
}

export interface ConservationAction {
  target: string;
  reductionPercent: number;
  category: 'DOMESTIC' | 'COMMERCIAL' | 'IRRIGATION';
  impactLiters: number;
}

export interface BedrockResponsePlan {
  id: string;
  incidentId: string;
  incidentSummary: string;
  severity: 'LOW' | 'MEDIUM' | 'HIGH' | 'CRITICAL';
  priorityOrder: string[];
  actions: ResponseAction[];
  conservationActions: ConservationAction[];
  estimatedWaterSaved: number;
  estimatedPopulationProtected: number;
  reasoning: string;
  confidence: number;
  generatedAt: string;
  isValidated: boolean;
  validationErrors?: string[];
}

export type StepFunctionStepId = 
  | 'INCIDENT' 
  | 'VALIDATE' 
  | 'PRIORITIZE' 
  | 'ALLOCATE' 
  | 'DISPATCH' 
  | 'CONSERVE' 
  | 'VERIFY' 
  | 'RESOLVED';

export type StepStatus = 'PENDING' | 'RUNNING' | 'COMPLETED' | 'FAILED';

export interface WorkflowStep {
  id: StepFunctionStepId;
  label: string;
  description: string;
  status: StepStatus;
  timestamp?: string;
}
