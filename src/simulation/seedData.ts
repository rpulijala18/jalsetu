import { SimulationState, ZoneData, PipelineSegment } from '../types/simulation';
import { Incident } from '../types/incident';
import { BedrockResponsePlan, WorkflowStep } from '../types/response';

export const INITIAL_SIMULATION_STATE: SimulationState = {
  tankCapacity: 30000,
  tankLevel: 18000,
  pipelineStatus: 'NORMAL',
  
  hospitalDemand: 6000,
  hospitalAllocation: 6000,
  
  schoolDemand: 3000,
  schoolAllocation: 3000,
  
  zoneADemand: 8000,
  zoneAAllocation: 8000,
  
  zoneBDemand: 7000,
  zoneBAllocation: 7000,
  
  zoneCDemand: 5000,
  zoneCAllocation: 5000,
  
  tankerAvailable: true,
  tankerLocation: 'DEPOT',
  tankerCapacity: 10000,
  tankerWaterDelivered: 0,
  
  rainReserve: 4000,
  rainReserveCapacity: 4000,
  rainfall: 0,
  
  populationTotal: 2840,
  populationProtected: 2840,
  criticalFacilitiesTotal: 2,
  criticalFacilitiesProtected: 2,
  waterConserved: 0,
  waterSecurityScore: 82,
  timeToShortageHours: 14.5,
  
  // Humanized Impact Metrics
  humanStressIndex: 14,
  vulnerableProtected: 1410,
  grievanceQueueLength: 2,
  activeCitizenFeed: [
    {
      id: 'feed-1',
      author: 'Dr. Ananya Sen',
      role: 'ICU Chief, General Hospital',
      location: 'Medical Trauma Wing',
      time: 'Just now',
      sentiment: 'POSITIVE',
      message: 'Continuous supply verified. Sterilization autoclave and hemodialysis lines operating at 100% nominal pressure.',
      verified: true
    },
    {
      id: 'feed-2',
      author: 'Sunita Sharma',
      role: 'Resident & Mother of 2',
      location: 'Sector A, High-Rise Cluster',
      time: '2 mins ago',
      sentiment: 'NEUTRAL',
      message: 'Morning tap flow steady. We filled our 50L domestic storage drums without queue congestion.',
      verified: true
    },
    {
      id: 'feed-3',
      author: 'Er. Vikram Rathore',
      role: 'Municipal Pipeline Inspector',
      location: 'Telemetry Junction Hub',
      time: '5 mins ago',
      sentiment: 'POSITIVE',
      message: 'Acoustic ultrasound inspection on trunk line shows 4.2 bar nominal pressure. No audible leaks.',
      verified: true
    }
  ],
  
  activeIncident: false,
  activeIncidentId: undefined,
  currentScenario: undefined,
  stepFunctionsStatus: 'IDLE',
  
  simTick: 0,
  simSpeed: 1,
  isPaused: false,
  
  isWhatIfActive: false,
};

export const INITIAL_COMMUNITY_PEOPLE: import('../types/simulation').HumanEntity[] = [
  {
    id: 'person-doctor',
    name: 'Dr. Ananya Sen',
    role: 'DOCTOR',
    position: [-9.2, 0, -5.8],
    zoneId: 'hospital',
    status: 'Monitoring ICU reserve',
    hydrationScore: 98,
    quote: 'Dialysis and emergency surgical suites cannot tolerate even 15 minutes of zero pressure.',
    avatarColor: '#f8fafc'
  },
  {
    id: 'person-nurse',
    name: 'Sister Mary Varghese',
    role: 'NURSE',
    position: [-11.0, 0, -6.5],
    zoneId: 'hospital',
    status: 'Managing sterile ward supplies',
    hydrationScore: 95,
    quote: 'Emergency ward water supply is stable. Patient hydration protocols active.',
    avatarColor: '#06b6d4'
  },
  {
    id: 'person-engineer',
    name: 'Er. Vikram Rathore',
    role: 'ENGINEER',
    position: [-6.2, 0, 3.8],
    zoneId: 'zoneA',
    status: 'Inspecting North Trunk Manifold',
    hydrationScore: 90,
    quote: 'Sensor telemetry is streaming to AWS EventBridge. Valve seals holding under pressure.',
    avatarColor: '#f59e0b'
  },
  {
    id: 'person-technician',
    name: 'Sanjay Verma',
    role: 'ENGINEER',
    position: [-0.8, 0, 1.2],
    zoneId: 'tank',
    status: 'Reservoir Inflow Calibration',
    hydrationScore: 92,
    quote: 'Central reservoir float telemetry calibrated to ±0.2% precision.',
    avatarColor: '#eab308'
  },
  {
    id: 'person-citizen-1',
    name: 'Sunita Sharma',
    role: 'CITIZEN',
    position: [-10.8, 0, 9.2],
    zoneId: 'zoneA',
    status: 'Awaiting daily domestic allocation',
    hydrationScore: 84,
    quote: 'Having real-time municipal tanker tracking gives our residential committee peace of mind.',
    avatarColor: '#ec4899'
  },
  {
    id: 'person-citizen-2',
    name: 'Rameshwar Lal',
    role: 'CITIZEN',
    position: [-12.2, 0, 10.4],
    zoneId: 'zoneA',
    status: 'Senior citizen representative',
    hydrationScore: 78,
    quote: 'Elderly residents need reliable ground-floor water delivery when pipeline pressure is rationed.',
    avatarColor: '#8b5cf6'
  },
  {
    id: 'person-student-1',
    name: 'Aarav Sharma',
    role: 'STUDENT',
    position: [9.8, 0, -4.8],
    zoneId: 'school',
    status: 'In campus assembly courtyard',
    hydrationScore: 96,
    quote: 'Our school water coolers have clean drinking water today!',
    avatarColor: '#3b82f6'
  },
  {
    id: 'person-student-2',
    name: 'Pooja Iyer',
    role: 'STUDENT',
    position: [11.2, 0, -5.4],
    zoneId: 'school',
    status: 'Midday meal dining hall',
    hydrationScore: 92,
    quote: 'Midday meal prep requires clean treated water for 500+ students.',
    avatarColor: '#10b981'
  },
  {
    id: 'person-driver',
    name: 'Gurpreet Singh',
    role: 'TANKER_DRIVER',
    position: [-12.8, 0, 5.2],
    zoneId: 'tanker',
    status: 'Emergency Tanker Pilot (10,000 L)',
    hydrationScore: 94,
    quote: 'GPS telemetry linked to municipal Step Functions. Ready to roll within 90 seconds.',
    avatarColor: '#0284c7'
  }
];

export const COMMUNITY_ZONES: ZoneData[] = [
  {
    id: 'hospital',
    name: 'Lakshmi Nagar General Hospital',
    type: 'HOSPITAL',
    population: 320,
    priority: 'CRITICAL',
    demandLiters: 6000,
    allocationLiters: 6000,
    status: 'PROTECTED',
    deficitLiters: 0,
    position: [-10, 0, -8],
    description: 'Tier-2 trauma center and emergency ward. Water continuity is vital for dialysis and sterilization.'
  },
  {
    id: 'school',
    name: 'Saraswati Vidya Mandir School',
    type: 'SCHOOL',
    population: 520,
    priority: 'HIGH',
    demandLiters: 3000,
    allocationLiters: 3000,
    status: 'OPTIMAL',
    deficitLiters: 0,
    position: [10, 0, -8],
    description: 'Primary and secondary community campus serving 520 students and kitchen staff.'
  },
  {
    id: 'zoneA',
    name: 'Residential Block A (North)',
    type: 'RESIDENTIAL',
    population: 800,
    priority: 'MEDIUM',
    demandLiters: 8000,
    allocationLiters: 8000,
    status: 'OPTIMAL',
    deficitLiters: 0,
    position: [-12, 0, 8],
    description: 'High-density multi-story apartment clusters directly fed via primary north header.'
  },
  {
    id: 'zoneB',
    name: 'Residential Block B (Central)',
    type: 'RESIDENTIAL',
    population: 1200,
    priority: 'MEDIUM',
    demandLiters: 7000,
    allocationLiters: 7000,
    status: 'OPTIMAL',
    deficitLiters: 0,
    position: [0, 0, 10],
    description: 'Central family residential colony with community water points.'
  },
  {
    id: 'zoneC',
    name: 'Residential Block C (East)',
    type: 'RESIDENTIAL',
    population: 840,
    priority: 'STANDARD',
    demandLiters: 5000,
    allocationLiters: 5000,
    status: 'OPTIMAL',
    deficitLiters: 0,
    position: [12, 0, 8],
    description: 'Low-rise residential enclave and commercial storefronts.'
  }
];

export const PIPELINE_SEGMENTS: PipelineSegment[] = [
  {
    id: 'pipe-tank-hub',
    from: 'tank',
    to: 'hub',
    status: 'NORMAL',
    flowRate: 1.0,
    path: [[0, 1.2, 0], [0, 0.4, 0]]
  },
  {
    id: 'pipe-hub-hospital',
    from: 'hub',
    to: 'hospital',
    status: 'NORMAL',
    flowRate: 1.0,
    path: [[0, 0.4, 0], [-5, 0.4, -4], [-10, 0.4, -8]]
  },
  {
    id: 'pipe-hub-school',
    from: 'hub',
    to: 'school',
    status: 'NORMAL',
    flowRate: 1.0,
    path: [[0, 0.4, 0], [5, 0.4, -4], [10, 0.4, -8]]
  },
  {
    id: 'pipe-hub-zoneA',
    from: 'hub',
    to: 'zoneA',
    status: 'NORMAL',
    flowRate: 1.0,
    path: [[0, 0.4, 0], [-6, 0.4, 4], [-12, 0.4, 8]]
  },
  {
    id: 'pipe-hub-zoneB',
    from: 'hub',
    to: 'zoneB',
    status: 'NORMAL',
    flowRate: 1.0,
    path: [[0, 0.4, 0], [0, 0.4, 6], [0, 0.4, 10]]
  },
  {
    id: 'pipe-hub-zoneC',
    from: 'hub',
    to: 'zoneC',
    status: 'NORMAL',
    flowRate: 1.0,
    path: [[0, 0.4, 0], [6, 0.4, 4], [12, 0.4, 8]]
  }
];

export const INITIAL_STEP_FUNCTION_STEPS: WorkflowStep[] = [
  { id: 'INCIDENT', label: 'INCIDENT DETECTED', description: 'Pipeline breach telemetries confirmed across sensor array', status: 'PENDING' },
  { id: 'VALIDATE', label: 'VALIDATE CONSTRAINTS', description: 'Confirm telemetry thresholds & integrity rules', status: 'PENDING' },
  { id: 'PRIORITIZE', label: 'PRIORITIZE SERVICES', description: 'Bedrock evaluation of critical infrastructure weight', status: 'PENDING' },
  { id: 'ALLOCATE', label: 'ALLOCATE RESERVES', description: 'Reserve essential hospital (6,000 L) & school quotas', status: 'PENDING' },
  { id: 'DISPATCH', label: 'DISPATCH TANKER', description: 'Autonomous emergency tanker routing to Zone A', status: 'PENDING' },
  { id: 'CONSERVE', label: 'APPLY CONSERVATION', description: 'Activate 40% pressure rationing on Zone B & activate rain reserve', status: 'PENDING' },
  { id: 'VERIFY', label: 'VERIFY SECURITY', description: 'Confirm zero-critical deficit and telemetry stabilisation', status: 'PENDING' },
  { id: 'RESOLVED', label: 'CRISIS RESOLVED', description: 'Event published to EventBridge & metrics stored in DynamoDB', status: 'PENDING' },
];

export const SAMPLE_INCIDENT_JSL104: Incident = {
  id: 'JSL-104',
  title: 'Main Pipeline Failure',
  scenarioType: 'MAIN_PIPELINE_FAILURE',
  severity: 'CRITICAL',
  status: 'DETECTED',
  detectedAt: '2026-10-06T14:28:10Z',
  affectedZonesCount: 3,
  criticalFacilitiesCount: 2,
  estimatedTimeToShortage: '3h 42m',
  currentReserveLiters: 18000,
  description: 'Sudden pressure drop in main trunk distribution manifold. Flow to Residential Zone A and secondary loops interrupted.',
  sensorAlerts: [
    'Sensor #P-04 Pressure Drop: -82% (Normal: 4.2 bar, Current: 0.7 bar)',
    'Sensor #M-01 Flow Disruption: Flow velocity near zero',
    'Zone A Inflow Delta: -7,200 L/hr deficit detected'
  ]
};

export const SAMPLE_AI_RESPONSE_PLAN: BedrockResponsePlan = {
  id: 'PLAN-BEDROCK-992',
  incidentId: 'JSL-104',
  incidentSummary: 'Primary pipeline failure will cause critical supply interruption within approximately 3h 42m. Hospital continuity must be preserved first, followed by school and residential rationing.',
  severity: 'CRITICAL',
  priorityOrder: ['hospital', 'school', 'zoneA', 'zoneB', 'zoneC'],
  actions: [
    {
      action: 'RESERVE_WATER',
      target: 'hospital',
      amountLiters: 6000,
      description: 'Ring-fence 6,000 L dedicated emergency reservoir for hospital critical care'
    },
    {
      action: 'RESERVE_WATER',
      target: 'school',
      amountLiters: 3000,
      description: 'Preserve 3,000 L for school daytime operational buffer'
    },
    {
      action: 'DISPATCH_TANKER',
      target: 'zoneA',
      amountLiters: 8000,
      description: 'Dispatch 10,000 L emergency tanker with 8,000 L payload to Zone A depot'
    },
    {
      action: 'REDUCE_CONSUMPTION',
      target: 'zoneB',
      percentageReduction: 40,
      description: 'Implement smart valve rationing reducing non-essential pressure by 40%'
    },
    {
      action: 'ACTIVATE_RAIN_RESERVE',
      target: 'rainReserve',
      amountLiters: 4000,
      description: 'Inject 4,000 L treated rainwater reserve into secondary loop'
    },
    {
      action: 'NOTIFY_OPERATOR',
      target: 'municipal_authority',
      description: 'Alert Jal Sansthan Emergency Response Bureau via EventBridge'
    }
  ],
  conservationActions: [
    {
      target: 'zoneB',
      reductionPercent: 40,
      category: 'DOMESTIC',
      impactLiters: 2800
    },
    {
      target: 'zoneC',
      reductionPercent: 20,
      category: 'COMMERCIAL',
      impactLiters: 1000
    }
  ],
  estimatedWaterSaved: 9400,
  estimatedPopulationProtected: 1240,
  reasoning: 'Rationing domestic loops while deploying the emergency tanker mitigates residential dry-run without compromising medical sterile services. Rainwater injection buffers the remaining shortfall.',
  confidence: 0.94,
  generatedAt: new Date().toISOString(),
  isValidated: true,
};
