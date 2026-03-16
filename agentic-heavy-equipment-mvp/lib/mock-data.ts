import { Deal, MachineRecord, ProcurementRecommendation } from '@/lib/types';

export const deals: Deal[] = [
  {
    id: 'deal-001',
    assetName: 'CAT 320 Excavator',
    category: 'Excavator',
    askingPrice: 148000,
    seller: 'North Ridge Equipment',
    location: 'Brisbane, AU',
    listingUrl: 'https://example.com/listings/cat-320',
    riskScore: 32,
    stage: 'inspection',
    status: 'active',
    notes: ['Oil sample requested', 'Seller sent walkaround video'],
    missingItems: ['Service history PDF', 'Lien release confirmation'],
    createdAt: '2026-03-15'
  },
  {
    id: 'deal-002',
    assetName: 'JLG 860SJ Boom Lift',
    category: 'Boom Lift',
    askingPrice: 87000,
    seller: 'LiftFleet QLD',
    location: 'Gold Coast, AU',
    riskScore: 61,
    stage: 'transport',
    status: 'at-risk',
    notes: ['Hydraulic seep observed on inspection'],
    missingItems: ['Revised transport quote'],
    createdAt: '2026-03-12'
  },
  {
    id: 'deal-003',
    assetName: 'Bobcat T770 Track Loader',
    category: 'Skid Steer',
    askingPrice: 64000,
    seller: 'Western Plant Sales',
    location: 'Perth, AU',
    riskScore: 18,
    stage: 'escrow',
    status: 'active',
    notes: ['Financing approved', 'Title check clear'],
    missingItems: ['Carrier pickup confirmation'],
    createdAt: '2026-03-10'
  }
];

export const machines: MachineRecord[] = [
  {
    id: 'machine-001',
    serialNumber: 'CAT0320XKJ22109',
    assetName: 'CAT 320 Excavator',
    manufacturer: 'Caterpillar',
    model: '320',
    year: 2021,
    hours: 3140,
    trustScore: 82,
    lastInspection: '2026-03-14',
    location: 'Brisbane, AU',
    knownIssues: ['Minor track wear'],
    maintenanceEvents: ['500h service logged', 'Hydraulic filter replaced']
  },
  {
    id: 'machine-002',
    serialNumber: 'JLG860SJX77210',
    assetName: 'JLG 860SJ Boom Lift',
    manufacturer: 'JLG',
    model: '860SJ',
    year: 2019,
    hours: 4275,
    trustScore: 64,
    lastInspection: '2026-03-11',
    location: 'Gold Coast, AU',
    knownIssues: ['Hydraulic seep on main cylinder'],
    maintenanceEvents: ['Tyres replaced', 'Annual certification passed']
  },
  {
    id: 'machine-003',
    serialNumber: 'BCT770AU11891',
    assetName: 'Bobcat T770 Track Loader',
    manufacturer: 'Bobcat',
    model: 'T770',
    year: 2022,
    hours: 1490,
    trustScore: 91,
    lastInspection: '2026-03-08',
    location: 'Perth, AU',
    knownIssues: [],
    maintenanceEvents: ['Full service at 1000h', 'Undercarriage inspection clean']
  }
];

export const recommendations: ProcurementRecommendation[] = [
  {
    id: 'rec-001',
    assetClass: '20T–25T Excavators',
    recommendation: 'buy',
    reason: 'Utilization is high across fleet and replacement lead times are widening.',
    targetBand: 'A$120k–A$165k',
    urgency: 'high'
  },
  {
    id: 'rec-002',
    assetClass: 'Articulated Boom Lifts',
    recommendation: 'hold',
    reason: 'Current usage is stable and pricing has not materially improved.',
    targetBand: 'A$75k–A$95k',
    urgency: 'medium'
  },
  {
    id: 'rec-003',
    assetClass: 'Skid Steers',
    recommendation: 'sell',
    reason: 'Two units are underutilized and secondary market demand remains healthy.',
    targetBand: 'A$55k–A$70k',
    urgency: 'medium'
  }
];
