export interface Task {
  id: string;
  title: string;
  description: string;
  taskType: 'evidence' | 'remediation' | 'review';
  framework?: string;
  controlId?: string;
  priority: 'critical' | 'high' | 'medium' | 'low';
  estimatedHours?: number;
  assignedTo?: string;
  assignedBy?: string;
  status: 'draft' | 'assigned' | 'in_progress' | 'review' | 'completed' | 'blocked';
  dueDate?: Date;
  createdAt: Date;
  updatedAt: Date;
  progress: number;
  tags: string[];
  customFields?: Record<string, any>;
  dependencies: TaskDependency[];
  attachments: TaskAttachment[];
}

export interface TaskDependency {
  taskId: string;
  type: 'blocks' | 'triggers' | 'informs';
  status: 'active' | 'resolved';
}

export interface TaskAttachment {
  id: string;
  name: string;
  url: string;
  type: string;
  size: number;
  uploadedBy: string;
  uploadedAt: Date;
}

export interface AssignmentSuggestion {
  userId: string;
  name: string;
  email: string;
  score: number;
  reasoning: {
    skillMatch: number;
    workloadCapacity: number;
    previousPerformance: number;
    availability: number;
  };
  currentWorkload: {
    activeTasks: number;
    estimatedHours: number;
    capacityUtilization: number;
  };
  relevantSkills: string[];
  recentPerformance: {
    completionRate: number;
    avgQualityScore: number;
    onTimeDelivery: number;
  };
}

export interface Timeline {
  id: string;
  name: string;
  description: string;
  framework: string;
  startDate: Date;
  targetCompletion: Date;
  status: 'draft' | 'active' | 'paused' | 'completed' | 'cancelled';
  currentProgress: number;
  healthScore: number;
  milestones: Milestone[];
  criticalPath: string[];
  resourceAllocation: ResourceAllocation;
  analytics: TimelineAnalytics;
}

export interface Milestone {
  id: string;
  name: string;
  type: 'framework' | 'business' | 'risk';
  targetDate: Date;
  status: 'pending' | 'in_progress' | 'completed' | 'delayed' | 'cancelled';
  progress: number;
  dependencies: string[];
  successCriteria?: string;
  attendees?: string[];
}

export interface ResourceAllocation {
  fteSecurityEngineers: number;
  fteComplianceOfficers: number;
  budgetAllocated: number;
  budgetSpent: number;
}

export interface TimelineAnalytics {
  projectedCompletion: Date;
  riskScore: 'low' | 'medium' | 'high' | 'critical';
  bufferDays: number;
  scheduleVariance: number;
  resourceUtilization: number;
}

export interface EvidenceItem {
  id: string;
  controlId: string;
  framework: string;
  evidenceType: 'document' | 'screenshot' | 'report' | 'log' | 'configuration';
  title: string;
  description?: string;
  filePath?: string;
  fileHash?: string;
  collectedBy: 'manual' | 'automated';
  collectionDate: Date;
  validityPeriod?: number;
  expiresAt?: Date;
  validationStatus: 'pending' | 'valid' | 'invalid' | 'expired';
  retentionPolicy: string;
  tags: string[];
  metadata: Record<string, any>;
  validations: EvidenceValidation[];
  chainOfCustody: CustodyRecord[];
}

export interface EvidenceValidation {
  id: string;
  validatorId: string;
  validationDate: Date;
  status: 'approved' | 'rejected' | 'needs_revision';
  comments?: string;
  validationCriteria: ValidationCriterion[];
  complianceScore?: number;
}

export interface ValidationCriterion {
  criterion: string;
  status: 'pass' | 'fail' | 'partial';
  notes?: string;
}

export interface CustodyRecord {
  action: string;
  userId: string;
  timestamp: Date;
  ipAddress?: string;
  notes?: string;
}

export interface NotificationRule {
  id: string;
  ruleName: string;
  description: string;
  trigger: NotificationTrigger;
  recipients: NotificationRecipients;
  deliveryChannels: DeliveryChannel[];
  escalation?: EscalationConfig;
  active: boolean;
  createdAt: Date;
  createdBy: string;
}

export interface NotificationTrigger {
  eventType: 'task_due_approaching' | 'milestone_approaching' | 'evidence_expiring' | 'compliance_gap';
  conditions: Record<string, any>;
}

export interface NotificationRecipients {
  includeAssignee: boolean;
  includeManager: boolean;
  includeStakeholders: boolean;
  customRecipients: string[];
}

export interface DeliveryChannel {
  channel: 'email' | 'slack' | 'teams' | 'sms' | 'webhook';
  priority: number;
  template: string;
  conditions?: Record<string, any>;
}

export interface EscalationConfig {
  enabled: boolean;
  escalateAfterDays: number;
  escalateTo: 'manager' | 'stakeholder' | 'custom';
  escalationChannels: string[];
}

export interface OrchestrationAnalytics {
  analyticsPeriod: {
    startDate: Date;
    endDate: Date;
    periodType: string;
  };
  taskMetrics: {
    totalTasks: number;
    completedTasks: number;
    inProgressTasks: number;
    overdueTasks: number;
    completionRate: number;
    averageCompletionTimeHours: number;
    onTimeDeliveryRate: number;
  };
  timelineMetrics: {
    activeTimelines: number;
    milestonesHit: number;
    milestonesMissed: number;
    averageScheduleVariance: number;
    criticalPathDelays: number;
  };
  evidenceMetrics: {
    evidenceItemsCollected: number;
    automatedCollectionRate: number;
    validationSuccessRate: number;
    averageValidationTimeHours: number;
    evidenceCoveragePercentage: number;
  };
  notificationMetrics: {
    notificationsSent: number;
    emailOpenRate: number;
    responseRate: number;
    escalationRate: number;
    userSatisfaction: number;
  };
  teamPerformance: {
    topPerformers: TeamMember[];
    workloadDistribution: {
      balanced: boolean;
      utilizationVariance: number;
      overloadedUsers: number;
    };
  };
  complianceImpact: {
    controlsImplemented: number;
    complianceScoreImprovement: number;
    riskReductionPercentage: number;
    auditReadiness: number;
  };
}

export interface TeamMember {
  userId: string;
  name: string;
  tasksCompleted: number;
  completionRate: number;
  qualityScore: number;
  currentWorkload: {
    activeTasks: number;
    estimatedHours: number;
    capacityUtilization: number;
  };
}

export interface BulkTaskRequest {
  source: 'assessment' | 'gap_analysis' | 'manual';
  sourceId?: string;
  taskTemplate: {
    framework: string;
    defaultPriority: 'critical' | 'high' | 'medium' | 'low';
    dueDateOffsetDays: number;
    autoAssign: boolean;
    businessUnit?: string;
  };
  gaps: ComplianceGap[];
}

export interface ComplianceGap {
  controlId: string;
  gapDescription: string;
  remediationType: 'technical' | 'documentation' | 'process' | 'training';
  estimatedEffort: 'minimal' | 'low' | 'medium' | 'high' | 'significant';
  priority?: 'critical' | 'high' | 'medium' | 'low';
}