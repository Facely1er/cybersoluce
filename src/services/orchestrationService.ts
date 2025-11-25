import { 
  Task, 
  AssignmentSuggestion, 
  Timeline, 
  EvidenceItem, 
  NotificationRule,
  OrchestrationAnalytics,
  BulkTaskRequest,
  EvidenceValidation,
  Milestone,
  TaskDependency,
  TaskAttachment,
  ValidationCriterion,
  CustodyRecord
} from '../types/orchestration';
import { supabaseClient } from '../lib/supabaseClient';

// Helper function to get current user ID
async function getCurrentUserId(): Promise<string> {
  if (!supabaseClient) {
    throw new Error('Supabase not configured');
  }
  const { data: { user }, error } = await supabaseClient.auth.getUser();
  if (error || !user) {
    throw new Error('Authentication required');
  }
  return user.id;
}

// Helper function to get user's organization ID
async function getUserOrganizationId(userId: string): Promise<string | null> {
  if (!supabaseClient) return null;
  const { data } = await supabaseClient
    .from('cs_profiles')
    .select('organization_id')
    .eq('id', userId)
    .single();
  return data?.organization_id || null;
}

// Mapper functions to convert database rows to TypeScript types
function mapTaskRowToTask(row: any): Task {
  return {
    id: row.id,
    title: row.title,
    description: row.description || '',
    taskType: row.task_type as Task['taskType'],
    framework: row.framework_id,
    controlId: row.control_id,
    priority: row.priority as Task['priority'],
    estimatedHours: row.estimated_hours,
    assignedTo: row.assigned_to,
    assignedBy: row.assigned_by,
    status: row.status as Task['status'],
    dueDate: row.due_date ? new Date(row.due_date) : undefined,
    createdAt: new Date(row.created_at),
    updatedAt: new Date(row.updated_at),
    progress: row.progress || 0,
    tags: row.tags || [],
    customFields: row.metadata || {},
    dependencies: [], // Will be loaded separately
    attachments: [] // Will be loaded separately
  };
}

function mapTimelineRowToTimeline(row: any, milestones: Milestone[] = []): Timeline {
  return {
    id: row.id,
    name: row.name,
    description: row.description || '',
    framework: row.framework || '',
    startDate: new Date(row.start_date),
    targetCompletion: new Date(row.target_completion),
    status: row.status as Timeline['status'],
    currentProgress: row.current_progress || 0,
    healthScore: row.health_score || 100,
    milestones: milestones,
    criticalPath: row.critical_path || [],
    resourceAllocation: row.resource_allocation || {
      fteSecurityEngineers: 0,
      fteComplianceOfficers: 0,
      budgetAllocated: 0,
      budgetSpent: 0
    },
    analytics: row.analytics || {
      projectedCompletion: new Date(row.target_completion),
      riskScore: 'low',
      bufferDays: 0,
      scheduleVariance: 0,
      resourceUtilization: 0
    }
  };
}

function mapMilestoneRowToMilestone(row: any): Milestone {
  return {
    id: row.id,
    name: row.name,
    type: row.type as Milestone['type'],
    targetDate: new Date(row.target_date),
    status: row.status as Milestone['status'],
    progress: row.progress || 0,
    dependencies: row.dependencies || [],
    successCriteria: row.success_criteria,
    attendees: row.attendees || []
  };
}

function mapEvidenceRowToEvidenceItem(row: any, validations: EvidenceValidation[] = []): EvidenceItem {
  return {
    id: row.id,
    controlId: row.control_id,
    framework: row.framework_id,
    evidenceType: row.type as EvidenceItem['evidenceType'],
    title: row.title,
    description: row.description,
    filePath: row.location,
    fileHash: row.file_hash,
    collectedBy: row.collected_by as 'manual' | 'automated',
    collectionDate: new Date(row.collection_date),
    validityPeriod: row.validity_period_days,
    expiresAt: row.expires_at ? new Date(row.expires_at) : undefined,
    validationStatus: row.validation_status as EvidenceItem['validationStatus'],
    retentionPolicy: row.retention_policy || 'default',
    tags: row.tags || [],
    metadata: row.metadata || {},
    validations: validations,
    chainOfCustody: [] // Will be loaded separately if needed
  };
}

function mapEvidenceValidationRowToValidation(row: any): EvidenceValidation {
  return {
    id: row.id,
    validatorId: row.validator_id,
    validationDate: new Date(row.validation_date),
    status: row.status as EvidenceValidation['status'],
    comments: row.comments,
    validationCriteria: row.validation_criteria || [],
    complianceScore: row.compliance_score
  };
}

function mapNotificationRuleRowToRule(row: any): NotificationRule {
  return {
    id: row.id,
    ruleName: row.rule_name,
    description: row.description || '',
    trigger: row.trigger,
    recipients: row.recipients,
    deliveryChannels: row.delivery_channels,
    escalation: row.escalation,
    active: row.active,
    createdAt: new Date(row.created_at),
    createdBy: row.created_by
  };
}

class OrchestrationService {
  private useSupabase: boolean;

  constructor() {
    this.useSupabase = !!supabaseClient;
  }

  // Task Management APIs
  async createTask(taskData: Partial<Task>): Promise<Task> {
    if (!this.useSupabase || !supabaseClient) {
      // Fallback to mock data if Supabase not available
      return {
        id: `task-${Date.now()}`,
        title: taskData.title || 'New Task',
        description: taskData.description || '',
        taskType: taskData.taskType || 'remediation',
        priority: taskData.priority || 'medium',
        status: 'draft',
        createdAt: new Date(),
        updatedAt: new Date(),
        progress: 0,
        tags: [],
        dependencies: [],
        attachments: [],
        ...taskData
      } as Task;
    }

    try {
      const userId = await getCurrentUserId();
      const orgId = await getUserOrganizationId(userId);

      const { data, error } = await supabaseClient
        .from('cs_tasks')
        .insert({
          owner_id: userId,
          organization_id: orgId,
          title: taskData.title || 'New Task',
          description: taskData.description || '',
          task_type: taskData.taskType || 'remediation',
          framework_id: taskData.framework,
          control_id: taskData.controlId,
          priority: taskData.priority || 'medium',
          status: taskData.status || 'draft',
          assigned_to: taskData.assignedTo,
          assigned_by: taskData.assignedBy || userId,
          estimated_hours: taskData.estimatedHours,
          due_date: taskData.dueDate?.toISOString(),
          progress: taskData.progress || 0,
          tags: taskData.tags || [],
          metadata: taskData.customFields || {}
        })
        .select()
        .single();

      if (error || !data) {
        throw new Error(error?.message || 'Failed to create task');
      }

      return mapTaskRowToTask(data);
    } catch (error) {
      console.error('Error creating task:', error);
      throw error;
    }
  }

  async getTasks(filters?: {
    status?: string;
    assignedTo?: string;
    framework?: string;
    priority?: string;
    dueAfter?: Date;
    dueBefore?: Date;
  }): Promise<Task[]> {
    if (!this.useSupabase || !supabaseClient) {
      return [];
    }

    try {
      const userId = await getCurrentUserId();
      let query = supabaseClient
        .from('cs_tasks')
        .select('*')
        .or(`owner_id.eq.${userId},assigned_to.eq.${userId}`)
        .order('created_at', { ascending: false });

      if (filters?.status) {
        query = query.eq('status', filters.status);
      }
      if (filters?.assignedTo) {
        query = query.eq('assigned_to', filters.assignedTo);
      }
      if (filters?.framework) {
        query = query.eq('framework_id', filters.framework);
      }
      if (filters?.priority) {
        query = query.eq('priority', filters.priority);
      }
      if (filters?.dueAfter) {
        query = query.gte('due_date', filters.dueAfter.toISOString());
      }
      if (filters?.dueBefore) {
        query = query.lte('due_date', filters.dueBefore.toISOString());
      }

      const { data, error } = await query;

      if (error) {
        throw new Error(error.message);
      }

      // Load dependencies and attachments for each task
      const tasks = (data || []).map(mapTaskRowToTask);
      
      // Load dependencies
      for (const task of tasks) {
        const { data: deps } = await supabaseClient
          .from('cs_task_dependencies')
          .select('*')
          .eq('parent_task_id', task.id);
        
        task.dependencies = (deps || []).map(dep => ({
          taskId: dep.dependent_task_id,
          type: dep.dependency_type as TaskDependency['type'],
          status: 'active' as const
        }));

        // Load attachments
        const { data: atts } = await supabaseClient
          .from('cs_task_attachments')
          .select('*')
          .eq('task_id', task.id);
        
        task.attachments = (atts || []).map(att => ({
          id: att.id,
          name: att.name,
          url: att.url,
          type: att.type || '',
          size: att.size_bytes || 0,
          uploadedBy: att.uploaded_by,
          uploadedAt: new Date(att.uploaded_at)
        }));
      }

      return tasks;
    } catch (error) {
      console.error('Error fetching tasks:', error);
      return [];
    }
  }

  async getTask(taskId: string): Promise<Task> {
    if (!this.useSupabase || !supabaseClient) {
      throw new Error('Task not found');
    }

    try {
      const { data, error } = await supabaseClient
        .from('cs_tasks')
        .select('*')
        .eq('id', taskId)
        .single();

      if (error || !data) {
        throw new Error(error?.message || 'Task not found');
      }

      const task = mapTaskRowToTask(data);

      // Load dependencies
      const { data: deps } = await supabaseClient
        .from('cs_task_dependencies')
        .select('*')
        .eq('parent_task_id', taskId);
      
      task.dependencies = (deps || []).map(dep => ({
        taskId: dep.dependent_task_id,
        type: dep.dependency_type as TaskDependency['type'],
        status: 'active' as const
      }));

      // Load attachments
      const { data: atts } = await supabaseClient
        .from('cs_task_attachments')
        .select('*')
        .eq('task_id', taskId);
      
      task.attachments = (atts || []).map(att => ({
        id: att.id,
        name: att.name,
        url: att.url,
        type: att.type || '',
        size: att.size_bytes || 0,
        uploadedBy: att.uploaded_by,
        uploadedAt: new Date(att.uploaded_at)
      }));

      return task;
    } catch (error) {
      console.error('Error fetching task:', error);
      throw error;
    }
  }

  async updateTask(taskId: string, updates: Partial<Task>): Promise<Task> {
    if (!this.useSupabase || !supabaseClient) {
      // Fallback to mock
      return {
        id: taskId,
        title: 'Updated Task',
        description: '',
        taskType: 'remediation',
        priority: 'medium',
        status: 'in_progress',
        createdAt: new Date(),
        updatedAt: new Date(),
        progress: 50,
        tags: [],
        dependencies: [],
        attachments: [],
        ...updates
      } as Task;
    }

    try {
      const updateData: any = {
        updated_at: new Date().toISOString()
      };

      if (updates.title !== undefined) updateData.title = updates.title;
      if (updates.description !== undefined) updateData.description = updates.description;
      if (updates.taskType !== undefined) updateData.task_type = updates.taskType;
      if (updates.framework !== undefined) updateData.framework_id = updates.framework;
      if (updates.controlId !== undefined) updateData.control_id = updates.controlId;
      if (updates.priority !== undefined) updateData.priority = updates.priority;
      if (updates.status !== undefined) updateData.status = updates.status;
      if (updates.assignedTo !== undefined) updateData.assigned_to = updates.assignedTo;
      if (updates.estimatedHours !== undefined) updateData.estimated_hours = updates.estimatedHours;
      if (updates.dueDate !== undefined) updateData.due_date = updates.dueDate?.toISOString();
      if (updates.progress !== undefined) updateData.progress = updates.progress;
      if (updates.tags !== undefined) updateData.tags = updates.tags;
      if (updates.customFields !== undefined) updateData.metadata = updates.customFields;

      if (updates.status === 'completed') {
        updateData.completed_at = new Date().toISOString();
      }

      const { data, error } = await supabaseClient
        .from('cs_tasks')
        .update(updateData)
        .eq('id', taskId)
        .select()
        .single();

      if (error || !data) {
        throw new Error(error?.message || 'Failed to update task');
      }

      // Log update activity
      const userId = await getCurrentUserId();
      await supabaseClient
        .from('cs_task_updates')
        .insert({
          task_id: taskId,
          user_id: userId,
          update_type: 'status_change',
          old_value: updates.status,
          new_value: updates.status
        });

      return mapTaskRowToTask(data);
    } catch (error) {
      console.error('Error updating task:', error);
      throw error;
    }
  }

  async getAssignmentSuggestions(taskId: string, options?: {
    considerWorkload?: boolean;
    considerSkills?: boolean;
    considerAvailability?: boolean;
    maxSuggestions?: number;
    filters?: Record<string, any>;
  }): Promise<{
    suggestions: AssignmentSuggestion[];
    assignmentRecommendation: {
      recommendedUser: string;
      confidence: 'low' | 'medium' | 'high';
      expectedCompletion: Date;
    };
  }> {
    if (!this.useSupabase || !supabaseClient) {
      return {
        suggestions: [],
        assignmentRecommendation: {
          recommendedUser: 'user-1',
          confidence: 'medium',
          expectedCompletion: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000)
        }
      };
    }

    try {
      const userId = await getCurrentUserId();
      const orgId = await getUserOrganizationId(userId);

      // Get task details
      const task = await this.getTask(taskId);

      // Get users in the organization
      const { data: profiles } = await supabaseClient
        .from('cs_profiles')
        .select('id, email, first_name, last_name, role')
        .eq('organization_id', orgId);

      // Get workload for each user
      const suggestions: AssignmentSuggestion[] = [];
      const maxSuggestions = options?.maxSuggestions || 5;

      for (const profile of (profiles || []).slice(0, 20)) { // Limit to 20 for performance
        // Get user's active tasks
        const { data: userTasks } = await supabaseClient
          .from('cs_tasks')
          .select('estimated_hours, status')
          .eq('assigned_to', profile.id)
          .in('status', ['assigned', 'in_progress']);

        const activeTasks = userTasks?.length || 0;
        const estimatedHours = userTasks?.reduce((sum, t) => sum + (t.estimated_hours || 0), 0) || 0;
        const capacityUtilization = Math.min(100, (estimatedHours / 40) * 100); // Assuming 40 hours/week capacity

        // Calculate score (simplified - in production would consider skills, performance, etc.)
        let score = 50; // Base score
        if (options?.considerWorkload) {
          score += (100 - capacityUtilization) * 0.3; // Lower utilization = higher score
        }
        if (options?.considerAvailability) {
          score += 20; // Assume available
        }

        suggestions.push({
          userId: profile.id,
          name: `${profile.first_name || ''} ${profile.last_name || ''}`.trim() || profile.email,
          email: profile.email,
          score: Math.min(100, Math.max(0, score)),
          reasoning: {
            skillMatch: 75,
            workloadCapacity: 100 - capacityUtilization,
            previousPerformance: 85,
            availability: 90
          },
          currentWorkload: {
            activeTasks,
            estimatedHours,
            capacityUtilization
          },
          relevantSkills: [], // Would be populated from user profile skills
          recentPerformance: {
            completionRate: 85,
            avgQualityScore: 4.2,
            onTimeDelivery: 80
          }
        });
      }

      // Sort by score and take top N
      suggestions.sort((a, b) => b.score - a.score);
      const topSuggestions = suggestions.slice(0, maxSuggestions);

      return {
        suggestions: topSuggestions,
        assignmentRecommendation: {
          recommendedUser: topSuggestions[0]?.userId || '',
          confidence: topSuggestions[0]?.score >= 80 ? 'high' : topSuggestions[0]?.score >= 60 ? 'medium' : 'low',
          expectedCompletion: new Date(Date.now() + (task.estimatedHours || 8) * 60 * 60 * 1000)
        }
      };
    } catch (error) {
      console.error('Error getting assignment suggestions:', error);
      return {
        suggestions: [],
        assignmentRecommendation: {
          recommendedUser: '',
          confidence: 'low',
          expectedCompletion: new Date()
        }
      };
    }
  }

  async assignTask(taskId: string, assignmentData: {
    assignedTo: string;
    assignmentNote?: string;
    priorityOverride?: string;
    dueDateAdjustment?: Date;
  }): Promise<Task> {
    if (!this.useSupabase || !supabaseClient) {
      return {
        id: taskId,
        title: 'Assigned Task',
        description: '',
        taskType: 'remediation',
        priority: 'medium',
        status: 'assigned',
        assignedTo: assignmentData.assignedTo,
        createdAt: new Date(),
        updatedAt: new Date(),
        progress: 0,
        tags: [],
        dependencies: [],
        attachments: []
      } as Task;
    }

    try {
      const userId = await getCurrentUserId();
      const updateData: any = {
        assigned_to: assignmentData.assignedTo,
        assigned_by: userId,
        status: 'assigned',
        updated_at: new Date().toISOString()
      };

      if (assignmentData.priorityOverride) {
        updateData.priority = assignmentData.priorityOverride;
      }
      if (assignmentData.dueDateAdjustment) {
        updateData.due_date = assignmentData.dueDateAdjustment.toISOString();
      }

      const { data, error } = await supabaseClient
        .from('cs_tasks')
        .update(updateData)
        .eq('id', taskId)
        .select()
        .single();

      if (error || !data) {
        throw new Error(error?.message || 'Failed to assign task');
      }

      // Log assignment activity
      await supabaseClient
        .from('cs_task_updates')
        .insert({
          task_id: taskId,
          user_id: userId,
          update_type: 'assignment',
          new_value: assignmentData.assignedTo,
          content: assignmentData.assignmentNote
        });

      return mapTaskRowToTask(data);
    } catch (error) {
      console.error('Error assigning task:', error);
      throw error;
    }
  }

  async createBulkTasks(bulkRequest: BulkTaskRequest): Promise<{
    bulkOperationId: string;
    tasksCreated: number;
    tasks: Task[];
    summary: {
      totalEstimatedHours: number;
      autoAssigned: number;
      requiresManualAssignment: number;
      highPriority: number;
      mediumPriority: number;
      lowPriority: number;
    };
  }> {
    if (!this.useSupabase || !supabaseClient) {
      return {
        bulkOperationId: `bulk-${Date.now()}`,
        tasksCreated: bulkRequest.gaps.length,
        tasks: [],
        summary: {
          totalEstimatedHours: 0,
          autoAssigned: 0,
          requiresManualAssignment: bulkRequest.gaps.length,
          highPriority: 0,
          mediumPriority: 0,
          lowPriority: 0
        }
      };
    }

    try {
      const userId = await getCurrentUserId();
      const orgId = await getUserOrganizationId(userId);
      const bulkOperationId = `bulk-${Date.now()}`;

      const tasks: Task[] = [];
      const summary = {
        totalEstimatedHours: 0,
        autoAssigned: 0,
        requiresManualAssignment: 0,
        highPriority: 0,
        mediumPriority: 0,
        lowPriority: 0
      };

      // Map effort to hours
      const effortToHours: Record<string, number> = {
        minimal: 2,
        low: 4,
        medium: 8,
        high: 16,
        significant: 32
      };

      for (const gap of bulkRequest.gaps) {
        const priority = gap.priority || bulkRequest.taskTemplate.defaultPriority;
        const estimatedHours = effortToHours[gap.estimatedEffort] || 8;
        const dueDate = new Date(Date.now() + bulkRequest.taskTemplate.dueDateOffsetDays * 24 * 60 * 60 * 1000);

        const taskData: Partial<Task> = {
          title: `Remediate: ${gap.controlId}`,
          description: gap.gapDescription,
          taskType: gap.remediationType === 'technical' ? 'remediation' : 
                   gap.remediationType === 'documentation' ? 'evidence' : 'remediation',
          framework: bulkRequest.taskTemplate.framework,
          controlId: gap.controlId,
          priority,
          estimatedHours,
          dueDate,
          status: 'draft',
          tags: [gap.remediationType]
        };

        const task = await this.createTask(taskData);
        tasks.push(task);

        summary.totalEstimatedHours += estimatedHours;
        if (task.assignedTo) {
          summary.autoAssigned++;
        } else {
          summary.requiresManualAssignment++;
        }

        if (priority === 'high' || priority === 'critical') {
          summary.highPriority++;
        } else if (priority === 'medium') {
          summary.mediumPriority++;
        } else {
          summary.lowPriority++;
        }
      }

      return {
        bulkOperationId,
        tasksCreated: tasks.length,
        tasks,
        summary
      };
    } catch (error) {
      console.error('Error creating bulk tasks:', error);
      throw error;
    }
  }

  // Timeline Management APIs
  async createTimeline(timelineData: Partial<Timeline>): Promise<Timeline> {
    if (!this.useSupabase || !supabaseClient) {
      return {
        id: `timeline-${Date.now()}`,
        name: timelineData.name || 'New Timeline',
        description: timelineData.description || '',
        framework: timelineData.framework || 'NIST CSF',
        startDate: timelineData.startDate || new Date(),
        targetCompletion: timelineData.targetCompletion || new Date(Date.now() + 90 * 24 * 60 * 60 * 1000),
        status: 'draft',
        currentProgress: 0,
        healthScore: 100,
        milestones: [],
        criticalPath: [],
        resourceAllocation: {
          fteSecurityEngineers: 0,
          fteComplianceOfficers: 0,
          budgetAllocated: 0,
          budgetSpent: 0
        },
        analytics: {
          projectedCompletion: new Date(Date.now() + 90 * 24 * 60 * 60 * 1000),
          riskScore: 'low',
          bufferDays: 0,
          scheduleVariance: 0,
          resourceUtilization: 0
        }
      } as Timeline;
    }

    try {
      const userId = await getCurrentUserId();
      const orgId = await getUserOrganizationId(userId);

      const startDate = timelineData.startDate || new Date();
      const targetCompletion = timelineData.targetCompletion || new Date(Date.now() + 90 * 24 * 60 * 60 * 1000);

      const { data, error } = await supabaseClient
        .from('cs_timelines')
        .insert({
          owner_id: userId,
          organization_id: orgId,
          name: timelineData.name || 'New Timeline',
          description: timelineData.description || '',
          framework: timelineData.framework || 'NIST CSF',
          start_date: startDate.toISOString().split('T')[0],
          target_completion: targetCompletion.toISOString().split('T')[0],
          status: timelineData.status || 'draft',
          current_progress: 0,
          health_score: 100,
          critical_path: [],
          resource_allocation: timelineData.resourceAllocation || {},
          analytics: timelineData.analytics || {}
        })
        .select()
        .single();

      if (error || !data) {
        throw new Error(error?.message || 'Failed to create timeline');
      }

      return mapTimelineRowToTimeline(data);
    } catch (error) {
      console.error('Error creating timeline:', error);
      throw error;
    }
  }

  async getTimelines(): Promise<Timeline[]> {
    if (!this.useSupabase || !supabaseClient) {
      return [];
    }

    try {
      const userId = await getCurrentUserId();
      const { data, error } = await supabaseClient
        .from('cs_timelines')
        .select('*')
        .or(`owner_id.eq.${userId}`)
        .order('created_at', { ascending: false });

      if (error) {
        throw new Error(error.message);
      }

      // Load milestones for each timeline
      const timelines: Timeline[] = [];
      for (const row of (data || [])) {
        const { data: milestones } = await supabaseClient
          .from('cs_milestones')
          .select('*')
          .eq('timeline_id', row.id)
          .order('target_date', { ascending: true });

        timelines.push(mapTimelineRowToTimeline(row, (milestones || []).map(mapMilestoneRowToMilestone)));
      }

      return timelines;
    } catch (error) {
      console.error('Error fetching timelines:', error);
      return [];
    }
  }

  async getTimelineAnalytics(timelineId: string): Promise<any> {
    if (!this.useSupabase || !supabaseClient) {
      return {
        currentStatus: {
          overallProgress: 0,
          milestonesCompleted: 0,
          milestonesTotal: 0,
          tasksCompleted: 0,
          tasksTotal: 0,
          daysElapsed: 0,
          daysRemaining: 0
        },
        performanceMetrics: {
          velocity: {
            tasksPerWeek: 0,
            projectedCompletion: new Date().toISOString(),
            onSchedule: true
          },
          quality: {
            reworkRate: 0,
            firstTimeSuccess: 100,
            stakeholderSatisfaction: 5.0
          },
          resourceUtilization: {
            teamCapacity: 0,
            budgetUtilization: 0,
            efficiencyScore: 100
          }
        }
      };
    }

    try {
      const { data: timeline } = await supabaseClient
        .from('cs_timelines')
        .select('*')
        .eq('id', timelineId)
        .single();

      if (!timeline) {
        throw new Error('Timeline not found');
      }

      // Get milestones
      const { data: milestones } = await supabaseClient
        .from('cs_milestones')
        .select('*')
        .eq('timeline_id', timelineId);

      const milestonesCompleted = milestones?.filter(m => m.status === 'completed').length || 0;
      const milestonesTotal = milestones?.length || 0;

      // Get tasks associated with this timeline (via framework)
      const { data: tasks } = await supabaseClient
        .from('cs_tasks')
        .select('status, progress')
        .eq('framework_id', timeline.framework);

      const tasksCompleted = tasks?.filter(t => t.status === 'completed').length || 0;
      const tasksTotal = tasks?.length || 0;

      const startDate = new Date(timeline.start_date);
      const targetDate = new Date(timeline.target_completion);
      const now = new Date();
      const daysElapsed = Math.floor((now.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24));
      const daysRemaining = Math.floor((targetDate.getTime() - now.getTime()) / (1000 * 60 * 60 * 24));

      const resourceAllocation = timeline.resource_allocation || {};
      const budgetUtilization = resourceAllocation.budget_allocated > 0
        ? (resourceAllocation.budget_spent / resourceAllocation.budget_allocated) * 100
        : 0;

      return {
        currentStatus: {
          overallProgress: timeline.current_progress || 0,
          milestonesCompleted,
          milestonesTotal,
          tasksCompleted,
          tasksTotal,
          daysElapsed: Math.max(0, daysElapsed),
          daysRemaining: Math.max(0, daysRemaining)
        },
        performanceMetrics: {
          velocity: {
            tasksPerWeek: tasksTotal > 0 ? (tasksCompleted / Math.max(1, daysElapsed / 7)) : 0,
            projectedCompletion: timeline.analytics?.projected_completion || targetDate.toISOString(),
            onSchedule: daysRemaining >= 0
          },
          quality: {
            reworkRate: 5, // Would be calculated from task updates
            firstTimeSuccess: 92,
            stakeholderSatisfaction: 4.3
          },
          resourceUtilization: {
            teamCapacity: timeline.analytics?.resource_utilization || 0,
            budgetUtilization: Math.min(100, budgetUtilization),
            efficiencyScore: 88
          }
        }
      };
    } catch (error) {
      console.error('Error fetching timeline analytics:', error);
      throw error;
    }
  }

  // Evidence Vault APIs
  async uploadEvidence(evidenceData: FormData): Promise<EvidenceItem> {
    if (!this.useSupabase || !supabaseClient) {
      return {
        id: `evidence-${Date.now()}`,
        controlId: 'MOCK-1',
        framework: 'NIST CSF',
        evidenceType: 'document',
        title: 'Mock Evidence',
        collectedBy: 'manual',
        collectionDate: new Date(),
        validationStatus: 'pending',
        retentionPolicy: 'default',
        tags: [],
        metadata: {},
        validations: [],
        chainOfCustody: []
      } as EvidenceItem;
    }

    try {
      const userId = await getCurrentUserId();
      const orgId = await getUserOrganizationId(userId);

      // Extract form data
      const controlId = evidenceData.get('controlId') as string;
      const framework = evidenceData.get('framework') as string;
      const evidenceType = evidenceData.get('evidenceType') as string;
      const title = evidenceData.get('title') as string;
      const description = evidenceData.get('description') as string;
      const validityPeriod = parseInt(evidenceData.get('validityPeriod') as string) || 365;
      const tags = (evidenceData.get('tags') as string)?.split(',').map(t => t.trim()).filter(t => t) || [];
      const file = evidenceData.get('file') as File;

      if (!file) {
        throw new Error('File is required');
      }

      // Upload file to Supabase Storage
      const fileExt = file.name.split('.').pop();
      const fileName = `${userId}/${Date.now()}.${fileExt}`;
      const filePath = `evidence/${fileName}`;

      const { error: uploadError } = await supabaseClient.storage
        .from('evidence')
        .upload(filePath, file);

      if (uploadError) {
        throw new Error(`File upload failed: ${uploadError.message}`);
      }

      // Get file hash (would calculate SHA-256 in production)
      const fileHash = 'pending'; // Would calculate actual hash

      // Calculate expiration date
      const expiresAt = new Date();
      expiresAt.setDate(expiresAt.getDate() + validityPeriod);

      // Create evidence record
      const { data, error } = await supabaseClient
        .from('cs_evidence')
        .insert({
          owner_id: userId,
          organization_id: orgId,
          control_id: controlId,
          framework_id: framework,
          type: evidenceType,
          title,
          description,
          location: filePath,
          file_hash: fileHash,
          file_size_bytes: file.size,
          collected_by: 'manual',
          collection_date: new Date().toISOString(),
          validity_period_days: validityPeriod,
          expires_at: expiresAt.toISOString(),
          validation_status: 'pending',
          retention_policy: 'compliance_default_7_years',
          tags
        })
        .select()
        .single();

      if (error || !data) {
        throw new Error(error?.message || 'Failed to create evidence record');
      }

      return mapEvidenceRowToEvidenceItem(data);
    } catch (error) {
      console.error('Error uploading evidence:', error);
      throw error;
    }
  }

  async getEvidence(filters?: {
    framework?: string;
    controlId?: string;
    evidenceType?: string;
    validationStatus?: string;
    createdAfter?: Date;
    page?: number;
    limit?: number;
  }): Promise<{
    results: EvidenceItem[];
    pagination: {
      page: number;
      limit: number;
      totalResults: number;
      totalPages: number;
    };
  }> {
    if (!this.useSupabase || !supabaseClient) {
      return {
        results: [],
        pagination: {
          page: 1,
          limit: 20,
          totalResults: 0,
          totalPages: 1
        }
      };
    }

    try {
      const userId = await getCurrentUserId();
      const page = filters?.page || 1;
      const limit = filters?.limit || 20;
      const offset = (page - 1) * limit;

      let query = supabaseClient
        .from('cs_evidence')
        .select('*', { count: 'exact' })
        .eq('owner_id', userId)
        .order('created_at', { ascending: false })
        .range(offset, offset + limit - 1);

      if (filters?.framework) {
        query = query.eq('framework_id', filters.framework);
      }
      if (filters?.controlId) {
        query = query.eq('control_id', filters.controlId);
      }
      if (filters?.evidenceType) {
        query = query.eq('type', filters.evidenceType);
      }
      if (filters?.validationStatus) {
        query = query.eq('validation_status', filters.validationStatus);
      }
      if (filters?.createdAfter) {
        query = query.gte('created_at', filters.createdAfter.toISOString());
      }

      const { data, error, count } = await query;

      if (error) {
        throw new Error(error.message);
      }

      // Load validations for each evidence item
      const evidenceItems: EvidenceItem[] = [];
      for (const row of (data || [])) {
        const { data: validations } = await supabaseClient
          .from('cs_evidence_validations')
          .select('*')
          .eq('evidence_id', row.id)
          .order('validation_date', { ascending: false });

        evidenceItems.push(mapEvidenceRowToEvidenceItem(
          row,
          (validations || []).map(mapEvidenceValidationRowToValidation)
        ));
      }

      const totalResults = count || 0;
      const totalPages = Math.ceil(totalResults / limit);

      return {
        results: evidenceItems,
        pagination: {
          page,
          limit,
          totalResults,
          totalPages
        }
      };
    } catch (error) {
      console.error('Error fetching evidence:', error);
      return {
        results: [],
        pagination: {
          page: 1,
          limit: 20,
          totalResults: 0,
          totalPages: 1
        }
      };
    }
  }

  async validateEvidence(evidenceId: string, validationData: {
    validationType: 'manual' | 'automated';
    validatorNotes?: string;
    validationCriteria: ValidationCriterion[];
    complianceScore: number;
    recommendations?: string[];
  }): Promise<EvidenceValidation> {
    if (!this.useSupabase || !supabaseClient) {
      return {
        id: `validation-${Date.now()}`,
        validatorId: 'user-1',
        validationDate: new Date(),
        status: 'approved',
        validationCriteria: []
      } as EvidenceValidation;
    }

    try {
      const userId = await getCurrentUserId();

      // Determine status from compliance score
      const status = validationData.complianceScore >= 80 ? 'approved' :
                    validationData.complianceScore >= 60 ? 'needs_revision' : 'rejected';

      const { data, error } = await supabaseClient
        .from('cs_evidence_validations')
        .insert({
          evidence_id: evidenceId,
          validator_id: userId,
          status,
          comments: validationData.validatorNotes,
          validation_criteria: validationData.validationCriteria,
          compliance_score: validationData.complianceScore
        })
        .select()
        .single();

      if (error || !data) {
        throw new Error(error?.message || 'Failed to create validation');
      }

      // Update evidence validation status
      await supabaseClient
        .from('cs_evidence')
        .update({ validation_status: status })
        .eq('id', evidenceId);

      return mapEvidenceValidationRowToValidation(data);
    } catch (error) {
      console.error('Error validating evidence:', error);
      throw error;
    }
  }

  // Notification APIs
  async createNotificationRule(ruleData: Partial<NotificationRule>): Promise<NotificationRule> {
    if (!this.useSupabase || !supabaseClient) {
      return {
        id: `rule-${Date.now()}`,
        ruleName: ruleData.ruleName || 'New Rule',
        description: ruleData.description || '',
        trigger: {
          eventType: 'task_due_approaching',
          conditions: {}
        },
        recipients: {
          includeAssignee: true,
          includeManager: false,
          includeStakeholders: false,
          customRecipients: []
        },
        deliveryChannels: [],
        active: true,
        createdAt: new Date(),
        createdBy: 'user-1',
        ...ruleData
      } as NotificationRule;
    }

    try {
      const userId = await getCurrentUserId();
      const orgId = await getUserOrganizationId(userId);

      const { data, error } = await supabaseClient
        .from('cs_notification_rules')
        .insert({
          owner_id: userId,
          organization_id: orgId,
          rule_name: ruleData.ruleName || 'New Rule',
          description: ruleData.description || '',
          trigger: ruleData.trigger || {
            eventType: 'task_due_approaching',
            conditions: {}
          },
          recipients: ruleData.recipients || {
            includeAssignee: true,
            includeManager: false,
            includeStakeholders: false,
            customRecipients: []
          },
          delivery_channels: ruleData.deliveryChannels || [],
          escalation: ruleData.escalation,
          active: ruleData.active !== undefined ? ruleData.active : true,
          created_by: userId
        })
        .select()
        .single();

      if (error || !data) {
        throw new Error(error?.message || 'Failed to create notification rule');
      }

      return mapNotificationRuleRowToRule(data);
    } catch (error) {
      console.error('Error creating notification rule:', error);
      throw error;
    }
  }

  async sendNotification(notificationData: {
    notificationType: string;
    recipients: Array<{
      userId: string;
      channels: string[];
    }>;
    message: {
      subject: string;
      body: string;
      priority: 'low' | 'medium' | 'high' | 'critical';
      context?: Record<string, any>;
    };
    attachments?: Array<{
      type: string;
      id: string;
    }>;
    tracking?: {
      requireAcknowledgment: boolean;
      escalateIfNoResponseHours?: number;
    };
  }): Promise<{
    notificationId: string;
    status: string;
    sentAt: Date;
    deliverySummary: Record<string, any>;
  }> {
    // This would integrate with email/Slack/SMS services
    // For now, return success response
    return {
      notificationId: `notif-${Date.now()}`,
      status: 'sent',
      sentAt: new Date(),
      deliverySummary: {
        email: notificationData.recipients.filter(r => r.channels.includes('email')).length,
        slack: notificationData.recipients.filter(r => r.channels.includes('slack')).length,
        sms: notificationData.recipients.filter(r => r.channels.includes('sms')).length
      }
    };
  }

  // Analytics APIs
  async getOrchestrationAnalytics(period: 'last_7_days' | 'last_30_days' | 'last_90_days' = 'last_30_days'): Promise<OrchestrationAnalytics> {
    if (!this.useSupabase || !supabaseClient) {
      return {
        analyticsPeriod: {
          startDate: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000),
          endDate: new Date(),
          periodType: 'last_30_days'
        },
        taskMetrics: {
          totalTasks: 0,
          completedTasks: 0,
          inProgressTasks: 0,
          overdueTasks: 0,
          completionRate: 0,
          averageCompletionTimeHours: 0,
          onTimeDeliveryRate: 0
        },
        timelineMetrics: {
          activeTimelines: 0,
          milestonesHit: 0,
          milestonesMissed: 0,
          averageScheduleVariance: 0,
          criticalPathDelays: 0
        },
        evidenceMetrics: {
          evidenceItemsCollected: 0,
          automatedCollectionRate: 0,
          validationSuccessRate: 0,
          averageValidationTimeHours: 0,
          evidenceCoveragePercentage: 0
        },
        notificationMetrics: {
          notificationsSent: 0,
          emailOpenRate: 0,
          responseRate: 0,
          escalationRate: 0,
          userSatisfaction: 0
        },
        teamPerformance: {
          topPerformers: [],
          workloadDistribution: {
            balanced: true,
            utilizationVariance: 0,
            overloadedUsers: 0
          }
        },
        complianceImpact: {
          controlsImplemented: 0,
          complianceScoreImprovement: 0,
          riskReductionPercentage: 0,
          auditReadiness: 0
        }
      } as OrchestrationAnalytics;
    }

    try {
      const userId = await getCurrentUserId();
      const days = period === 'last_7_days' ? 7 : period === 'last_30_days' ? 30 : 90;
      const startDate = new Date(Date.now() - days * 24 * 60 * 60 * 1000);

      // Get task metrics
      const { data: tasks } = await supabaseClient
        .from('cs_tasks')
        .select('status, completed_at, created_at, due_date')
        .eq('owner_id', userId)
        .gte('created_at', startDate.toISOString());

      const totalTasks = tasks?.length || 0;
      const completedTasks = tasks?.filter(t => t.status === 'completed').length || 0;
      const inProgressTasks = tasks?.filter(t => t.status === 'in_progress').length || 0;
      const overdueTasks = tasks?.filter(t => {
        if (!t.due_date || t.status === 'completed') return false;
        return new Date(t.due_date) < new Date();
      }).length || 0;

      // Calculate completion times
      const completedTaskTimes = tasks?.filter(t => t.status === 'completed' && t.completed_at && t.created_at)
        .map(t => {
          const created = new Date(t.created_at);
          const completed = new Date(t.completed_at);
          return (completed.getTime() - created.getTime()) / (1000 * 60 * 60);
        }) || [];
      const avgCompletionTime = completedTaskTimes.length > 0
        ? completedTaskTimes.reduce((a, b) => a + b, 0) / completedTaskTimes.length
        : 0;

      // Get timeline metrics
      const { data: timelines } = await supabaseClient
        .from('cs_timelines')
        .select('id, status')
        .eq('owner_id', userId)
        .gte('created_at', startDate.toISOString());

      const activeTimelines = timelines?.filter(t => t.status === 'active').length || 0;

      // Get milestone metrics
      const timelineIds = timelines?.map(t => t.id) || [];
      const { data: milestones } = timelineIds.length > 0
        ? await supabaseClient
            .from('cs_milestones')
            .select('status, target_date, completion_date')
            .in('timeline_id', timelineIds)
        : { data: null };

      const milestonesHit = milestones?.filter(m => m.status === 'completed').length || 0;
      const milestonesMissed = milestones?.filter(m => {
        if (m.status === 'completed') return false;
        return new Date(m.target_date) < new Date();
      }).length || 0;

      // Get evidence metrics
      const { data: evidence } = await supabaseClient
        .from('cs_evidence')
        .select('collected_by, validation_status')
        .eq('owner_id', userId)
        .gte('created_at', startDate.toISOString());

      const evidenceItemsCollected = evidence?.length || 0;
      const automatedCollection = evidence?.filter(e => e.collected_by === 'automated').length || 0;
      const automatedCollectionRate = evidenceItemsCollected > 0
        ? (automatedCollection / evidenceItemsCollected) * 100
        : 0;

      const validatedEvidence = evidence?.filter(e => e.validation_status === 'valid').length || 0;
      const validationSuccessRate = evidenceItemsCollected > 0
        ? (validatedEvidence / evidenceItemsCollected) * 100
        : 0;

      return {
        analyticsPeriod: {
          startDate,
          endDate: new Date(),
          periodType: period
        },
        taskMetrics: {
          totalTasks,
          completedTasks,
          inProgressTasks,
          overdueTasks,
          completionRate: totalTasks > 0 ? (completedTasks / totalTasks) * 100 : 0,
          averageCompletionTimeHours: avgCompletionTime,
          onTimeDeliveryRate: completedTasks > 0
            ? ((completedTasks - overdueTasks) / completedTasks) * 100
            : 0
        },
        timelineMetrics: {
          activeTimelines,
          milestonesHit,
          milestonesMissed,
          averageScheduleVariance: 0, // Would calculate from timeline analytics
          criticalPathDelays: 0
        },
        evidenceMetrics: {
          evidenceItemsCollected,
          automatedCollectionRate,
          validationSuccessRate,
          averageValidationTimeHours: 4.2, // Would calculate from validation timestamps
          evidenceCoveragePercentage: 87 // Would calculate from controls
        },
        notificationMetrics: {
          notificationsSent: 0, // Would track from notification logs
          emailOpenRate: 0,
          responseRate: 0,
          escalationRate: 0,
          userSatisfaction: 0
        },
        teamPerformance: {
          topPerformers: [],
          workloadDistribution: {
            balanced: true,
            utilizationVariance: 0.15,
            overloadedUsers: 0
          }
        },
        complianceImpact: {
          controlsImplemented: 0, // Would calculate from completed tasks
          complianceScoreImprovement: 0,
          riskReductionPercentage: 0,
          auditReadiness: 87
        }
      } as OrchestrationAnalytics;
    } catch (error) {
      console.error('Error fetching analytics:', error);
      throw error;
    }
  }
}

export const orchestrationService = new OrchestrationService();
export default orchestrationService;