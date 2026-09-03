export type PortalType = 'gov' | 'operator' | 'citizen';
export type UserRole = 'gov' | 'operator' | 'citizen';

export interface AuthUser {
  role: UserRole;
  name: string;
  designation: string;
  agency: string;
  badgeText: string;
  avatarInitials: string;
}

export type GovNavType = 'overview' | 'explorer' | 'evidence' | 'citizen' | 'risk';

export type ViolationStatus = 
  | 'pending_review' 
  | 'awaiting_mine_response' 
  | 'response_submitted_awaiting_verification';

export interface MineRecord {
  id: string;
  name: string;
  region: string;
  state: string;
  status: 'critical' | 'monitor' | 'compliant';
  complianceScore: number;
  operator: string;
  lastInspection: string;
  permitExp: string;
  activeReports: number;
  unauthorizedAreaHa?: number;
  coalfield: string;
  productionCapacityMTPA: number;
  latitude: number;
  longitude: number;
  flags: { title: string; note: string; severity: number }[];
}

export interface CitizenReportRecord {
  id: string; // e.g. 'CR-882'
  pin: string; // e.g. '1428'
  mineId: string;
  mineName: string;
  village: string;
  category: string;
  categoryKey: string;
  date: string;
  timestamp: string;
  details: string;
  stage: 1 | 2 | 3 | 4 | 5;
  statusText: string;
  statusColor: 'emerald' | 'blue' | 'red' | 'amber';
  geotagCorrelationPct?: number;
  contributedToScn?: boolean;
  scnNumber?: string;
  scnNoticeDate?: string;
  scnOutcome?: string;
  outcomeStatus?: 'pending' | 'resolved' | 'active_notice';
  estimatedNextUpdate?: string;
}
