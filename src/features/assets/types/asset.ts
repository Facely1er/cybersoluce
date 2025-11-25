// Unified Asset Type Definition for CyberSoluce
// Merged from assetmanager-main and cybersoluce-merged-main
// Extended with polymorphic JSONB pattern for product extensions

// Core Asset Type - Universal fields (95% of code)
export interface CoreAsset {
  readonly id: string;
  organizationId: string;
  
  // Basic Information
  name: string;
  description: string;
  type: AssetType;
  category: AssetCategory;
  subcategory?: string;
  
  // Ownership & Location
  owner: string;
  custodian?: string;
  location: AssetLocation | string; // Support both string and object
  
  // Classification
  criticality: CriticalityLevel;
  dataClassification: DataClassification;
  businessValue?: BusinessValue;
  
  // Status & Lifecycle
  status: AssetStatus;
  lifecycle?: AssetLifecycle;
  
  // Risk & Compliance
  riskScore: number; // 0-100
  complianceFrameworks: readonly string[];
  requirements?: ComplianceRequirement[];
  
  // Relationships & Dependencies
  relationships: AssetRelationship[];
  dependencies: AssetDependency[];
  
  // Security
  vulnerabilities: Vulnerability[];
  controls?: SecurityControl[];
  
  // Privacy & Data Protection
  dataTypes?: string[]; // e.g., ['PII', 'PHI', 'Financial']
  retentionPeriod?: number; // in days
  legalBasis?: string[]; // GDPR legal basis
  dataSubjectRights?: string[];
  crossBorderTransfer?: boolean;
  thirdPartySharing?: boolean;
  encryptionStatus?: EncryptionStatus;
  accessControls?: AccessControl[];
  privacyImpactAssessment?: PrivacyImpactAssessment | null;
  dataBreachHistory?: DataBreach[];
  
  // Technical Specifications
  technicalSpecs?: TechnicalSpecifications;
  ipAddress?: string;
  
  // Metadata
  tags: string[];
  metadata?: Record<string, any>;
  
  // Timestamps
  createdAt: Date;
  updatedAt: Date;
  lastAssessed?: Date;
  lastReviewed?: Date;
  nextReview?: Date;
  
  // Product Extensions (JSONB columns - 5% product-specific code)
  technosoluce_data?: TechnoSoluceExtension;
  vendorsoluce_data?: VendorSoluceExtension;
  cybercorrect_data?: CyberCorrectExtension;
}

// Main Asset interface (alias for CoreAsset for backward compatibility)
export type Asset = CoreAsset;

// Asset Type Enums
export type AssetCategory = 
  | 'hardware' 
  | 'software' 
  | 'data' 
  | 'personnel' 
  | 'facilities' 
  | 'services' 
  | 'documents' 
  | 'intellectual-property'
  | 'vendor'
  | 'process';

export type AssetType = 
  | 'Server' 
  | 'Database' 
  | 'Application' 
  | 'Network' 
  | 'Endpoint' 
  | 'Cloud Service'
  | 'Information Asset'
  | 'Data Repository'
  | 'API'
  | 'File System'
  | 'Document'
  | 'Personal Data'
  | 'Sensitive Data'
  | 'Business Process'
  | 'Third Party Service'
  | 'server'
  | 'workstation'
  | 'network-device'
  | 'mobile-device'
  | 'operating-system'
  | 'personal-data'
  | 'business-data'
  | 'financial-data'
  | 'employee'
  | 'contractor'
  | 'vendor'
  | 'building'
  | 'room'
  | 'cloud-service'
  | 'saas-application'
  | 'policy'
  | 'procedure'
  | 'patent'
  | 'trademark';

export type CriticalityLevel = 'Critical' | 'High' | 'Medium' | 'Low' | 'critical' | 'high' | 'medium' | 'low';

export type AssetStatus = 
  | 'Active' 
  | 'Inactive' 
  | 'Retired' 
  | 'Planned'
  | 'active'
  | 'inactive'
  | 'disposed'
  | 'maintenance'
  | 'quarantined'
  | 'decommissioned';

export type DataClassification = 
  | 'Public' 
  | 'Internal' 
  | 'Confidential' 
  | 'Restricted' 
  | 'Top Secret'
  | 'public'
  | 'internal'
  | 'confidential'
  | 'restricted'
  | 'top-secret';

export type BusinessValue = 
  | 'mission-critical' 
  | 'business-important' 
  | 'operational' 
  | 'developmental' 
  | 'administrative';

export type EncryptionStatus = 
  | 'Encrypted' 
  | 'Not Encrypted' 
  | 'Partially Encrypted' 
  | 'Unknown';

// Product Extensions (JSONB structures)

// TechnoSoluce Extension - Software Component Intelligence
export interface TechnoSoluceExtension {
  // SBOM Information
  sbomFormat?: 'SPDX' | 'CycloneDX' | 'SWID';
  packageUrl?: string; // PURL format
  version?: string;
  purl?: string;
  
  // Component Details
  componentName?: string;
  componentVersion?: string;
  componentType?: string;
  licenses?: License[];
  
  // Vulnerability Information
  vulnerabilities?: ComponentVulnerability[];
  vulnerabilityCount?: number;
  criticalVulnerabilityCount?: number;
  
  // Dependencies
  dependencies?: ComponentDependency[];
  dependencyCount?: number;
  
  // Risk Scoring
  componentRiskScore?: number; // 0-10
  endOfLife?: boolean;
  endOfLifeDate?: Date;
  patchAvailable?: boolean;
  
  // Metadata
  lastScanned?: Date;
  scanSource?: string; // e.g., 'OSV.dev', 'Snyk', 'GitHub'
}

export interface License {
  id: string;
  name: string;
  spdxId?: string;
  url?: string;
  isOsiApproved?: boolean;
  isFsfLibre?: boolean;
}

export interface ComponentVulnerability {
  id: string;
  cveId?: string;
  ghsaId?: string;
  severity: 'Critical' | 'High' | 'Medium' | 'Low';
  cvssScore?: number;
  title: string;
  description: string;
  affectedVersions: string[];
  fixedVersions?: string[];
  publishedDate?: Date;
  lastModified?: Date;
  status: 'Open' | 'In Progress' | 'Resolved' | 'Accepted Risk';
}

export interface ComponentDependency {
  id: string;
  name: string;
  version: string;
  type: 'direct' | 'transitive';
  purl?: string;
}

// VendorSoluce Extension - Vendor Risk Management
export interface VendorSoluceExtension {
  // Vendor Information
  vendorName: string;
  vendorId?: string;
  vendorType?: 'Software' | 'Cloud' | 'Hardware' | 'Services' | 'Consulting';
  
  // Contract Management
  contractValue?: number;
  contractCurrency?: string;
  contractStartDate?: Date;
  contractEndDate?: Date;
  contractRenewalDate?: Date;
  contractStatus?: 'Active' | 'Expiring' | 'Expired' | 'Terminated';
  
  // Risk Assessment
  riskAssessmentScore?: number; // 0-100
  riskLevel?: 'Critical' | 'High' | 'Medium' | 'Low';
  lastRiskAssessment?: Date;
  nextRiskAssessment?: Date;
  
  // Compliance & Certifications
  certifications?: Certification[];
  soc2Type?: 'Type I' | 'Type II';
  iso27001?: boolean;
  gdprCompliant?: boolean;
  
  // Data Processing
  dataProcessingRole?: 'controller' | 'processor' | 'joint-controller';
  dataProcessingAgreement?: boolean;
  dataProcessingAgreementDate?: Date;
  
  // ESG Scoring
  esgScore?: number; // 0-100
  esgLastUpdated?: Date;
  
  // Fourth-Party Risk
  fourthPartyVendors?: FourthPartyVendor[];
  fourthPartyRiskScore?: number;
  
  // Relationship Management
  relationshipManager?: string;
  accountManager?: string;
  supportLevel?: 'Basic' | 'Standard' | 'Premium' | 'Enterprise';
}

export interface Certification {
  id: string;
  name: string;
  type: string;
  issuer: string;
  issueDate: Date;
  expirationDate?: Date;
  status: 'Valid' | 'Expired' | 'Pending';
}

export interface FourthPartyVendor {
  id: string;
  name: string;
  service: string;
  riskLevel: 'Critical' | 'High' | 'Medium' | 'Low';
}

// CyberCorrect Extension - Privacy Compliance
export interface CyberCorrectExtension {
  // Data Classification
  containsPersonalData: boolean;
  personalDataTypes?: PersonalDataType[];
  sensitivePersonalData?: boolean;
  
  // Processing Information
  processingPurposes?: string[];
  legalBasis?: LegalBasis[];
  retentionPeriod?: number; // in days
  retentionBasis?: string;
  
  // Compliance Status
  gdprCompliant?: boolean;
  ccpaCompliant?: boolean;
  hipaaCompliant?: boolean;
  otherRegulations?: string[];
  
  // Privacy Impact Assessment
  piaRequired?: boolean;
  piaCompleted?: boolean;
  piaDate?: Date;
  piaStatus?: 'Draft' | 'Under Review' | 'Approved' | 'Needs Update';
  
  // Data Subject Rights
  dsrQueue?: DataSubjectRequest[];
  dsrResponseTimeframe?: number; // in days
  
  // Breach Risk
  breachRiskScore?: number; // 0-100
  lastBreachRiskAssessment?: Date;
  
  // Consent Management
  requiresConsent?: boolean;
  consentObtained?: boolean;
  consentWithdrawn?: boolean;
  
  // Data Transfers
  crossBorderTransfer?: boolean;
  transferMechanism?: 'Adequacy Decision' | 'SCCs' | 'BCRs' | 'Derogations';
  transferDestinations?: string[];
}

export type PersonalDataType = 
  | 'Name'
  | 'Email'
  | 'Phone'
  | 'Address'
  | 'Date of Birth'
  | 'SSN'
  | 'Financial'
  | 'Health'
  | 'Biometric'
  | 'Location'
  | 'Behavioral'
  | 'Other';

export type LegalBasis = 
  | 'Consent'
  | 'Contract'
  | 'Legal Obligation'
  | 'Vital Interests'
  | 'Public Task'
  | 'Legitimate Interests';

export interface DataSubjectRequest {
  id: string;
  type: 'Access' | 'Rectification' | 'Erasure' | 'Portability' | 'Objection' | 'Restriction';
  status: 'Pending' | 'In Progress' | 'Completed' | 'Rejected';
  submittedDate: Date;
  dueDate: Date;
  completedDate?: Date;
}

// Supporting Interfaces

export interface AssetLocation {
  type: 'physical' | 'logical' | 'cloud' | 'hybrid';
  address?: string;
  building?: string;
  room?: string;
  rack?: string;
  cloudProvider?: string;
  region?: string;
  subnet?: string;
  coordinates?: {
    latitude: number;
    longitude: number;
  };
}

export interface TechnicalSpecifications {
  operatingSystem?: string;
  version?: string;
  manufacturer?: string;
  model?: string;
  serialNumber?: string;
  ipAddress?: string;
  macAddress?: string;
  capacity?: string;
  specifications?: Record<string, any>;
}

export interface AssetRelationship {
  readonly id: string;
  relatedAssetId: string;
  relatedAssetName: string;
  relationshipType: RelationshipType;
  strength: RelationshipStrength;
  dataFlowDirection?: 'Inbound' | 'Outbound' | 'Bidirectional' | 'None';
  isPersonalData?: boolean;
  purpose?: string;
}

export type RelationshipType = 
  | 'Depends On' 
  | 'Connects To' 
  | 'Hosts' 
  | 'Manages' 
  | 'Accesses' 
  | 'Processes' 
  | 'Stores' 
  | 'Transmits' 
  | 'Shares' 
  | 'Backs Up' 
  | 'Replicates' 
  | 'Synchronizes'
  | 'depends-on'
  | 'supports'
  | 'communicates-with'
  | 'hosts'
  | 'processes'
  | 'stores'
  | 'accesses'
  | 'manages';

export type RelationshipStrength = 'Strong' | 'Medium' | 'Weak' | 'strong' | 'moderate' | 'weak' | 'critical';

export interface Vulnerability {
  readonly id: string;
  cveId?: string;
  severity: VulnerabilitySeverity;
  title: string;
  description: string;
  discoveredAt: Date;
  status: VulnerabilityStatus;
  cvssScore?: number;
  remediation?: VulnerabilityRemediation;
}

export type VulnerabilitySeverity = 'Critical' | 'High' | 'Medium' | 'Low' | 'critical' | 'high' | 'medium' | 'low' | 'informational';

export type VulnerabilityStatus = 'Open' | 'In Progress' | 'Resolved' | 'Accepted Risk' | 'open' | 'in-progress' | 'resolved' | 'risk-accepted' | 'false-positive';

export interface VulnerabilityRemediation {
  priority: CriticalityLevel;
  estimatedEffort?: string;
  targetDate?: Date;
  assignedTo?: string;
  strategy?: RemediationStrategy;
  progress?: number;
  notes?: string;
}

export type RemediationStrategy = 
  | 'patch' 
  | 'configuration-change' 
  | 'workaround' 
  | 'compensating-control' 
  | 'risk-acceptance' 
  | 'system-replacement';

export interface AssetDependency {
  id: string;
  dependentAssetId: string;
  dependentAssetName: string;
  dependencyType: DependencyType;
  criticality: CriticalityLevel;
  description: string;
  isActive: boolean;
  lastValidated: Date;
  riskLevel?: 'Low' | 'Medium' | 'High' | 'Critical';
  bidirectional?: boolean;
}

export type DependencyType = 
  | 'Technical' 
  | 'Data' 
  | 'Process' 
  | 'Compliance' 
  | 'Operational'
  | 'functional'
  | 'data-flow'
  | 'network'
  | 'service'
  | 'support'
  | 'backup'
  | 'disaster-recovery';

export interface SecurityControl {
  id: string;
  name: string;
  description: string;
  type: ControlType;
  framework: string;
  controlFamily?: string;
  implementationStatus: ImplementationStatus;
  effectivenessRating?: EffectivenessRating;
  testingFrequency?: TestingFrequency;
  lastTested?: Date;
  nextTest?: Date;
  owner: string;
  evidence: string[];
  exceptions?: ControlException[];
}

export type ControlType = 
  | 'preventive' 
  | 'detective' 
  | 'corrective' 
  | 'deterrent' 
  | 'compensating';

export type ImplementationStatus = 
  | 'not-implemented' 
  | 'partially-implemented' 
  | 'implemented' 
  | 'not-applicable'
  | 'Not Started'
  | 'In Progress'
  | 'Completed'
  | 'Non-Applicable'
  | 'Exempt';

export type EffectivenessRating = 
  | 'ineffective' 
  | 'partially-effective' 
  | 'effective' 
  | 'highly-effective';

export type TestingFrequency = 
  | 'continuous' 
  | 'daily' 
  | 'weekly' 
  | 'monthly' 
  | 'quarterly' 
  | 'annually' 
  | 'ad-hoc';

export interface ControlException {
  id: string;
  reason: string;
  approvedBy: string;
  approvalDate: Date;
  expirationDate: Date;
  compensatingControls: string[];
  riskAcceptance: string;
}

export interface ComplianceRequirement {
  id: string;
  framework: string;
  requirementId: string;
  title: string;
  description: string;
  category: 'Technical' | 'Organizational' | 'Physical' | 'Administrative';
  priority: 'Critical' | 'High' | 'Medium' | 'Low';
  status: 'Not Started' | 'In Progress' | 'Completed' | 'Non-Applicable' | 'Exempt';
  dueDate?: Date;
  responsible: string;
  evidence: string[];
  lastReviewed: Date;
  nextReviewDate: Date;
  mandatory?: boolean;
  exceptions?: string[];
}

export interface AccessControl {
  id: string;
  type: 'Role-Based' | 'Attribute-Based' | 'Rule-Based' | 'Mandatory' | 'Discretionary';
  description: string;
  permissions: string[];
  isActive: boolean;
  lastReviewed: Date;
}

export interface PrivacyImpactAssessment {
  id: string;
  assessmentDate: Date;
  assessor: string;
  riskLevel: 'Low' | 'Medium' | 'High' | 'Critical';
  findings: string[];
  recommendations: string[];
  status: 'Draft' | 'Under Review' | 'Approved' | 'Needs Update';
  nextReviewDate: Date;
}

export interface DataBreach {
  id: string;
  incidentDate: Date;
  discoveryDate: Date;
  description: string;
  severity: 'Low' | 'Medium' | 'High' | 'Critical';
  affectedRecords: number;
  status: 'Open' | 'Under Investigation' | 'Resolved' | 'Closed';
  regulatoryNotification: boolean;
  notificationDate?: Date;
}

export interface AssetLifecycle {
  phase: LifecyclePhase;
  acquisitionDate?: Date;
  deploymentDate?: Date;
  endOfLife?: Date;
  disposalDate?: Date;
  maintenanceSchedule?: MaintenanceSchedule;
  supportContract?: SupportContract;
  warrantyExpiration?: Date;
}

export type LifecyclePhase = 
  | 'planning' 
  | 'acquisition' 
  | 'deployment' 
  | 'operation' 
  | 'maintenance' 
  | 'disposal';

export interface MaintenanceSchedule {
  frequency: TestingFrequency;
  lastMaintenance?: Date;
  nextMaintenance: Date;
  maintenanceType: MaintenanceType;
  assignedTo: string;
}

export type MaintenanceType = 
  | 'preventive' 
  | 'corrective' 
  | 'predictive' 
  | 'emergency';

export interface SupportContract {
  vendor: string;
  contractNumber: string;
  startDate: Date;
  endDate: Date;
  supportLevel: SupportLevel;
  responseTime: string;
  coverage: string[];
}

export type SupportLevel = 
  | 'basic' 
  | 'standard' 
  | 'premium' 
  | 'enterprise';

// Filter and State Interfaces

export interface AssetFilters {
  search: string;
  types: AssetType[];
  categories?: AssetCategory[];
  criticalities: CriticalityLevel[];
  owners: string[];
  locations: string[];
  complianceFrameworks: string[];
  status: AssetStatus[];
  tags: string[];
  riskScoreRange: [number, number];
  dataClassification?: DataClassification[];
  metadata?: Record<string, any>; // For advanced filters (hasVulnerabilities, missingCompliance, etc.)
}

export interface SortConfig {
  key: keyof CoreAsset | null;
  direction: SortDirection;
}

export type SortDirection = 'asc' | 'desc';

export interface AssetInventoryState {
  assets: CoreAsset[];
  filteredAssets: CoreAsset[];
  selectedAssets: string[];
  filters: AssetFilters;
  sortConfig: SortConfig;
  currentPage: number;
  itemsPerPage: number;
  loading: boolean;
  selectedAsset: CoreAsset | null;
  showDetailModal: boolean;
  showImportModal: boolean;
  searchDebounce: number;
}

export interface AssetStats {
  total: number;
  critical: number;
  untagged: number;
  recentlyAdded: number;
  byType: Record<string, number>;
  byCriticality: Record<string, number>;
  byStatus: Record<string, number>;
  byDataClassification: Record<string, number>;
  byEncryptionStatus: Record<string, number>;
  privacyCompliant: number;
  withPIA: number;
  crossBorderTransfer: number;
  thirdPartySharing: number;
}

// Export all types
export * from './index';

