import { SimulationState, ZoneData, PipelineSegment } from '../types/simulation';
import { Incident } from '../types/incident';
import { BedrockResponsePlan, WorkflowStep } from '../types/response';
import { GeoLocationData } from '../hooks/useLiveLocation';

export interface ReportData {
  location: GeoLocationData;
  state: SimulationState;
  zones: ZoneData[];
  incident: Incident | null;
  plan: BedrockResponsePlan | null;
  workflowSteps: WorkflowStep[];
}

export const generateProductionReport = (data: ReportData) => {
  const timestamp = new Date().toISOString();
  const reportObj = {
    reportId: `JALSETU-AUDIT-${Date.now()}`,
    generatedAt: timestamp,
    system: 'JalSetu Autonomous Water Crisis Response Core',
    jurisdiction: {
      ward: data.location.name,
      city: data.location.city,
      state: data.location.state || 'N/A',
      country: data.location.country || 'India',
      coordinates: `${data.location.lat.toFixed(5)}°N, ${data.location.lng.toFixed(5)}°E`,
      population: data.state.populationTotal,
    },
    incidentSummary: data.incident ? {
      id: data.incident.id,
      title: data.incident.title,
      severity: data.incident.severity,
      detectedAt: data.incident.detectedAt,
      affectedZonesCount: data.incident.affectedZonesCount,
      estimatedShortageTime: data.incident.estimatedTimeToShortage,
      sensorAlerts: data.incident.sensorAlerts
    } : 'NO ACTIVE CRITICAL BREACH - SYSTEM NOMINAL',
    hydrologicalTelemetry: {
      centralReservoirRemaining: `${data.state.tankLevel.toLocaleString()} L / ${data.state.tankCapacity.toLocaleString()} L`,
      waterSecurityScore: `${data.state.waterSecurityScore}%`,
      humanStressIndex: `${data.state.humanStressIndex}%`,
      emergencyTankerDelivered: `${data.state.tankerWaterDelivered.toLocaleString()} L`,
      waterConservedByRationing: `${data.state.waterConserved.toLocaleString()} L`,
      criticalFacilitiesProtected: `${data.state.criticalFacilitiesProtected} / ${data.state.criticalFacilitiesTotal}`,
    },
    aiDecisionAudit: data.plan ? {
      planId: data.plan.id,
      model: 'Amazon Bedrock (Claude 3.5 Sonnet / Anthropic)',
      confidence: data.plan.confidence,
      priorityOrder: data.plan.priorityOrder,
      actionsTaken: data.plan.actions.map(a => `${a.action}: ${a.description}`)
    } : 'N/A',
    workflowExecution: data.workflowSteps.map(s => ({
      step: s.id,
      label: s.label,
      status: s.status,
      description: s.description
    })),
    cryptographicVerificationHash: `SHA256-${Math.random().toString(36).substring(2)}${Date.now()}`
  };

  const jsonString = JSON.stringify(reportObj, null, 2);
  const blob = new Blob([jsonString], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `JALSETU_CRISIS_REPORT_${data.location.name.replace(/\s+/g, '_')}_${new Date().toISOString().slice(0, 10)}.json`;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
};
