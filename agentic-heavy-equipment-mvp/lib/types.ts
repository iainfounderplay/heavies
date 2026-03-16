export type DealStage =
  | 'intake'
  | 'inspection'
  | 'transport'
  | 'financing'
  | 'escrow'
  | 'delivered';

export type DealStatus = 'active' | 'at-risk' | 'closed';

export interface Deal {
  id: string;
  assetName: string;
  category: string;
  askingPrice: number;
  seller: string;
  location: string;
  listingUrl?: string;
  riskScore: number;
  stage: DealStage;
  status: DealStatus;
  notes: string[];
  missingItems: string[];
  createdAt: string;
}

export interface MachineRecord {
  id: string;
  serialNumber: string;
  assetName: string;
  manufacturer: string;
  model: string;
  year: number;
  hours: number;
  trustScore: number;
  lastInspection: string;
  location: string;
  knownIssues: string[];
  maintenanceEvents: string[];
}

export interface ProcurementRecommendation {
  id: string;
  assetClass: string;
  recommendation: 'buy' | 'hold' | 'sell';
  reason: string;
  targetBand: string;
  urgency: 'low' | 'medium' | 'high';
}
