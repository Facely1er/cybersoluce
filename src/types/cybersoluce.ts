export interface Framework {
  id: string;
  name: string;
  version: string;
  description: string;
  controls: Control[];
  categories: Category[];
  lastUpdated: Date;
  status: 'active' | 'deprecated' | 'draft';
  region?: 'global' | 'us' | 'eu' | 'apac';
  externalSource?: "nist-csf-v2" | null;
  origin?: "local" | "nist-implementator" | "ermits-auditor";
}

export interface Control {
  id: string;
  frameworkId: string;
  categoryId: string;
  title: string;
  description: string;
  implementationGuidance: string;
  priority: 'low' | 'medium' | 'high' | 'critical';
  status: 'not-started' | 'in-progress' | 'implemented' | 'verified';
  mappings: ControlMapping[];
  evidence: Evidence[];
  maturityLevel: number; // 1-5
  lastAssessed?: Date;
  nextReview?: Date;
}

export interface Category {
  id: string;
  name: string;
  description: string;
  frameworkId: string;
  controls: string[]; // Control IDs
}

export interface ControlMapping {
  id: string;
  sourceControlId: string;    // Preferred over sourceControl
  sourceControl?: string;     // Legacy field
  sourceFrameworkId: string; // Preferred over sourceFramework
  sourceFramework?: string;   // Legacy field
  targetControlId: string;   // Preferred over targetControl
  targetControl?: string;     // Legacy field
  targetFrameworkId: string; // Preferred over targetFramework
  targetFramework?: string;  // Legacy field
  strength: "strong" | "partial" | "related"; // Preferred over mappingType
  mappingType?: 'exact' | 'partial' | 'related' | 'none'; // Legacy field (exact=strong, partial=partial, related=related)
  confidence?: number; // 0-100 (optional for backward compatibility)
  rationale?: string;  // Preferred over notes
  notes?: string;      // Legacy field
}

export interface FrameworkMapping {
  id: string;
  frameworks: Framework[];
  controlMappings: ControlMapping[];
  gapAnalysis: GapAnalysis;
  complianceStatus: ComplianceStatus;
}

export interface GapAnalysis {
  totalControls: number;
  implementedControls: number;
  inProgressControls: number;
  notStartedControls: number;
  criticalGaps: string[];
  riskScore: number;
}

export interface ComplianceStatus {
  frameworkId: string;
  overallScore: number;
  categoryScores: CategoryScore[];
  lastAssessment: Date;
  nextDeadline?: Date;
  certificationStatus?: 'certified' | 'pending' | 'expired' | 'not-applicable';
}

export interface CategoryScore {
  categoryId: string;
  score: number;
  maxScore: number;
  percentage: number;
}

export interface GovernanceItem {
  id: string;
  type: 'risk' | 'policy' | 'task' | 'evidence' | 'finding';
  title: string;
  description: string;
  status: 'pending' | 'in-progress' | 'completed' | 'overdue' | 'cancelled';
  priority: 'low' | 'medium' | 'high' | 'critical';
  assignee: User;
  dueDate: Date;
  framework: string[];
  createdDate: Date;
  lastModified: Date;
  tags: string[];
  attachments: Attachment[];
}

export interface User {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  role: 'executive' | 'manager' | 'analyst' | 'auditor' | 'admin';
  department: string;
  avatar?: string;
}

export interface Attachment {
  id: string;
  name: string;
  type: string;
  size: number;
  uploadDate: Date;
  url: string;
}

export interface RiskRegisterItem {
  id: string;
  title: string;
  description: string;
  category: string;
  likelihood: number; // 1-5
  impact: number; // 1-5
  riskScore: number; // calculated
  inherentRisk: number;
  residualRisk: number;
  mitigation: string;
  owner: string;
  status: 'open' | 'mitigating' | 'monitoring' | 'closed';
  dueDate: Date;
  relatedControls: string[];
  lastReview: Date;
  nextReview: Date;
}

export interface MaturityDomain {
  id: string;
  name: string;
  description: string;
  currentLevel: number; // 1-5
  targetLevel: number;
  subDomains: SubDomain[];
  assessmentDate: Date;
  nextAssessment: Date;
  trend: 'improving' | 'stable' | 'declining';
  benchmarkScore?: number;
}

export interface SubDomain {
  id: string;
  name: string;
  currentLevel: number;
  targetLevel: number;
  progress: number; // percentage
  dependencies: string[];
}

export interface MaturityAssessment {
  domain: string;
  currentLevel: number; // 1-5 scale
  targetLevel: number;
  progress: number; // percentage
  timeframe: string;
  dependencies: string[];
  recommendations: string[];
  lastUpdated: Date;
  assessor: string;
}

export interface ExecutiveMetrics {
  overallRiskScore: number;
  complianceStatus: ComplianceMetric[];
  budgetUtilization: BudgetMetric;
  maturityProgression: MaturityMetric[];
  keyRiskIndicators: KRI[];
  recommendations: Recommendation[];
  trendData: TrendData[];
}

export interface ComplianceMetric {
  frameworkId: string;
  frameworkName: string;
  score: number;
  maxScore: number;
  percentage: number;
  status: 'compliant' | 'partially-compliant' | 'non-compliant';
  lastAssessment: Date;
}

export interface BudgetMetric {
  totalBudget: number;
  allocatedBudget: number;
  spentBudget: number;
  remainingBudget: number;
  categories: BudgetCategory[];
  forecast: BudgetForecast[];
}

export interface BudgetCategory {
  id: string;
  name: string;
  allocated: number;
  spent: number;
  percentage: number;
}

export interface BudgetForecast {
  month: string;
  projected: number;
  actual?: number;
}

export interface MaturityMetric {
  domainId: string;
  domainName: string;
  currentLevel: number;
  targetLevel: number;
  progress: number;
  trend: 'improving' | 'stable' | 'declining';
}

export interface KRI {
  id: string;
  name: string;
  description: string;
  value: number;
  threshold: number;
  unit: string;
  status: 'normal' | 'warning' | 'critical';
  trend: 'improving' | 'stable' | 'declining';
  lastUpdated: Date;
}

export interface Recommendation {
  id: string;
  title: string;
  description: string;
  priority: 'low' | 'medium' | 'high' | 'critical';
  category: string;
  estimatedEffort: string;
  estimatedCost: number;
  expectedImpact: string;
  relatedFrameworks: string[];
  dueDate?: Date;
  assignee?: string;
}

export interface TrendData {
  period: string;
  value: number;
  metric: string;
}

export interface IntelligenceInsight {
  id: string;
  type: 'predictive' | 'correlation' | 'recommendation' | 'alert';
  source: 'threatIntel' | 'cyberCorrect' | 'intelligence' | 'ermits' | 'external';
  confidence: number; // 0-100
  impact: 'low' | 'medium' | 'high' | 'critical';
  title: string;
  description: string;
  actionable: boolean;
  relatedItems: string[];
  timestamp: Date;
  expiryDate?: Date;
  acknowledged: boolean;
}

export interface Evidence {
  id: string;
  controlId: string;        // ID of the associated Control
  frameworkId: string;      // e.g., "nist-csf-2"
  title: string;
  description?: string;
  type: "policy" | "procedure" | "log" | "screenshot" | "ticket" | "other" | 'document' | 'report' | 'checklist' | 'artifact'; // Extended for backward compatibility
  location?: string;        // URL, file path, or storage reference (preferred over url)
  url?: string;            // Legacy field, use location instead
  addedBy: string;          // user id or name (preferred over uploadedBy)
  uploadedBy?: string;      // Legacy field
  addedAt: Date;            // Preferred over uploadDate
  uploadDate?: Date;        // Legacy field
  lastUpdatedAt?: Date;
  tags?: string[];
  reviewStatus?: 'pending' | 'approved' | 'rejected'; // Optional for backward compatibility
  reviewedBy?: string;
  reviewDate?: Date;
}

export interface AuditPackage {
  id: string;
  name: string;
  description?: string;
  frameworkId: string;      // e.g., "nist-csf-2" or "iso-27001"
  controlIds: string[];     // Preferred over controls
  controls?: string[];      // Legacy field
  evidenceIds: string[];    // Preferred over evidence array
  evidence?: Evidence[];    // Legacy field
  createdAt: Date;          // Preferred over generatedDate
  generatedDate?: Date;     // Legacy field
  createdBy: string;        // Preferred over submittedBy
  submittedBy?: string;     // Legacy field
  status: 'draft' | 'ready' | 'archived' | 'submitted' | 'approved' | 'returned'; // Extended for backward compatibility
  auditor?: string;
  deadline?: Date;
  priority?: 'low' | 'medium' | 'high' | 'critical';
  tags?: string[];
  version?: string;
  approvedBy?: string;
  approvedDate?: Date;
}

export interface WorkflowTemplate {
  id: string;
  name: string;
  description: string;
  steps: WorkflowStep[];
  estimatedDuration: string;
  complexity: 'Low' | 'Medium' | 'High';
  category: string;
  createdBy: string;
  createdDate: Date;
  usageCount: number;
}

export interface WorkflowStep {
  id: string;
  name: string;
  type: 'start' | 'task' | 'decision' | 'approval' | 'notification' | 'end';
  description: string;
  assignee?: string;
  estimatedDuration?: number;
  dependencies: string[];
  conditions?: WorkflowCondition[];
  actions: WorkflowAction[];
}

export interface WorkflowCondition {
  field: string;
  operator: 'equals' | 'not_equals' | 'greater_than' | 'less_than' | 'contains';
  value: any;
}

export interface WorkflowAction {
  type: 'assign' | 'notify' | 'update_status' | 'create_task' | 'send_email';
  parameters: Record<string, any>;
}

export interface GovernanceWorkflow {
  id: string;
  templateId: string;
  name: string;
  status: 'draft' | 'active' | 'paused' | 'completed' | 'cancelled';
  currentStep: string;
  progress: number;
  startDate: Date;
  expectedEndDate: Date;
  actualEndDate?: Date;
  participants: string[];
  data: Record<string, any>;
  history: WorkflowHistoryEntry[];
}

export interface WorkflowHistoryEntry {
  id: string;
  stepId: string;
  action: string;
  performedBy: string;
  timestamp: Date;
  notes?: string;
  attachments?: string[];
}