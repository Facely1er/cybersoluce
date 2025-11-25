import { supabase } from '../lib/supabase';
import { Task, TaskFilter } from '../features/nist/tasks/types';

// Check if Supabase is ready
const isSupabaseReady = () => {
  try {
    return supabase !== null && typeof supabase !== 'undefined';
  } catch {
    return false;
  }
};

export class TaskService {
  private static instance: TaskService;

  static getInstance(): TaskService {
    if (!TaskService.instance) {
      TaskService.instance = new TaskService();
    }
    return TaskService.instance;
  }

  async getTasks(userId: string, organizationId?: string, filters?: TaskFilter): Promise<Task[]> {
    if (!isSupabaseReady()) {
      return this.getLocalTasks();
    }

    try {
      let query = supabase
        .from('tasks')
        .select('*')
        .order('created_at', { ascending: false });

      if (organizationId) {
        query = query.eq('organization_id', organizationId);
      }

      const { data, error } = await query;

      if (error) throw error;

      let tasks = (data || []).map(this.transformFromDatabase);

      // Apply filters
      if (filters) {
        tasks = this.applyFilters(tasks, filters);
      }

      return tasks;
    } catch (error) {
      console.warn('Failed to fetch tasks from Supabase, falling back to local storage:', error);
      return this.getLocalTasks();
    }
  }

  async createTask(task: Omit<Task, 'id' | 'createdAt' | 'updatedAt'>, userId: string): Promise<Task> {
    const newTask: Task = {
      ...task,
      id: Date.now().toString(),
      createdAt: new Date(),
      updatedAt: new Date()
    };

    if (!isSupabaseReady()) {
      return this.saveLocalTask(newTask);
    }

    try {
      const dbTask = this.transformToDatabase(newTask, userId);
      const { data, error } = await supabase
        .from('tasks')
        .insert(dbTask)
        .select()
        .single();

      if (error) throw error;

      const transformedTask = this.transformFromDatabase(data);
      
      // Also save locally as backup
      this.saveLocalTask(transformedTask);
      
      return transformedTask;
    } catch (error) {
      console.warn('Failed to create task in Supabase, saving locally:', error);
      return this.saveLocalTask(newTask);
    }
  }

  async updateTask(task: Task, userId: string): Promise<Task> {
    if (!isSupabaseReady()) {
      return this.saveLocalTask(task);
    }

    try {
      const dbTask = this.transformToDatabase(task, userId);
      const { data, error } = await supabase
        .from('tasks')
        .update(dbTask)
        .eq('id', task.id)
        .select()
        .single();

      if (error) throw error;

      const transformedTask = this.transformFromDatabase(data);
      
      // Also save locally as backup
      this.saveLocalTask(transformedTask);
      
      return transformedTask;
    } catch (error) {
      console.warn('Failed to update task in Supabase, saving locally:', error);
      return this.saveLocalTask(task);
    }
  }

  async deleteTask(taskId: string, userId: string): Promise<void> {
    if (!isSupabaseReady()) {
      this.deleteLocalTask(taskId);
      return;
    }

    try {
      const { error } = await supabase
        .from('tasks')
        .delete()
        .eq('id', taskId);

      if (error) throw error;

      this.deleteLocalTask(taskId);
    } catch (error) {
      console.warn('Failed to delete task from Supabase, removing locally:', error);
      this.deleteLocalTask(taskId);
    }
  }

  async assignTasksFromAssessment(
    assessmentId: string, 
    sectionId: string, 
    questionIds: string[], 
    assignedTo: string[],
    assignedBy: string
  ): Promise<Task[]> {
    const tasks: Task[] = [];

    for (const questionId of questionIds) {
      const task: Omit<Task, 'id' | 'createdAt' | 'updatedAt'> = {
        title: `Complete Assessment Question ${questionId}`,
        description: `Complete and provide evidence for assessment question ${questionId} in section ${sectionId}`,
        type: 'assessment',
        priority: 'medium',
        status: 'todo',
        assignedTo: assignedTo.join(','),
        assignedBy,
        dueDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // 1 week from now
        tags: ['assessment', 'auto-generated'],
        attachments: [],
        comments: [],
        estimatedHours: 2,
        actualHours: undefined,
        dependencies: [],
        progress: 0,
        assessmentId,
        questionId
      };

      const createdTask = await this.createTask(task, assignedBy);
      tasks.push(createdTask);
    }

    return tasks;
  }

  private applyFilters(tasks: Task[], filters: TaskFilter): Task[] {
    return tasks.filter(task => {
      if (filters.status?.length && !filters.status.includes(task.status)) {
        return false;
      }
      if (filters.priority?.length && !filters.priority.includes(task.priority)) {
        return false;
      }
      if (filters.type?.length && !filters.type.includes(task.type)) {
        return false;
      }
      if (filters.assignedTo?.length && !filters.assignedTo.includes(task.assignedTo)) {
        return false;
      }
      if (filters.dueDateRange) {
        const dueDate = new Date(task.dueDate);
        if (dueDate < filters.dueDateRange.start || dueDate > filters.dueDateRange.end) {
          return false;
        }
      }
      if (filters.tags?.length && !filters.tags.some(tag => task.tags.includes(tag))) {
        return false;
      }
      return true;
    });
  }

  private getLocalTasks(): Task[] {
    try {
      const localData = localStorage.getItem('cybersoluce-tasks');
      if (localData) {
        const parsed = JSON.parse(localData);
        return parsed.map((task: any) => this.transformFromDatabase(task));
      }
    } catch (error) {
      console.error('Failed to parse local tasks:', error);
    }
    return [];
  }

  private saveLocalTask(task: Task): Task {
    try {
      const existingTasks = this.getLocalTasks();
      const taskIndex = existingTasks.findIndex(t => t.id === task.id);
      
      if (taskIndex >= 0) {
        existingTasks[taskIndex] = task;
      } else {
        existingTasks.push(task);
      }
      
      localStorage.setItem('cybersoluce-tasks', JSON.stringify(existingTasks));
      return task;
    } catch (error) {
      console.error('Failed to save task locally:', error);
      throw error;
    }
  }

  private deleteLocalTask(taskId: string): void {
    try {
      const existingTasks = this.getLocalTasks();
      const filteredTasks = existingTasks.filter(t => t.id !== taskId);
      localStorage.setItem('cybersoluce-tasks', JSON.stringify(filteredTasks));
    } catch (error) {
      console.error('Failed to delete task locally:', error);
    }
  }

  private transformToDatabase(task: Task, userId: string): any {
    return {
      id: task.id,
      title: task.title,
      description: task.description,
      type: task.type,
      priority: task.priority,
      status: task.status,
      nist_function: task.nistFunction,
      nist_category: task.nistCategory,
      nist_subcategory: task.nistSubcategory,
      related_control_id: task.relatedControlId,
      assigned_to: Array.isArray(task.assignedTo) ? task.assignedTo : [task.assignedTo],
      assigned_by: task.assignedBy,
      due_date: task.dueDate.toISOString(),
      start_date: task.startDate?.toISOString(),
      created_at: task.createdAt.toISOString(),
      updated_at: task.updatedAt.toISOString(),
      completed_at: task.completedAt?.toISOString(),
      estimated_hours: task.estimatedHours,
      actual_hours: task.actualHours,
      progress: task.progress,
      dependencies: task.dependencies,
      subtasks: task.subtasks,
      attachments: task.attachments,
      comments: task.comments,
      evidence: task.evidence,
      approval_required: task.approvalRequired,
      approved_by: task.approvedBy,
      approved_at: task.approvedAt?.toISOString(),
      tags: task.tags,
      workflow_id: task.workflowId,
      stage_id: task.stageId,
      metadata: task.metadata,
      created_by: userId
    };
  }

  private transformFromDatabase(dbTask: any): Task {
    const assignedTo = dbTask.assigned_to || dbTask.assignedTo;
    return {
      id: dbTask.id,
      title: dbTask.title,
      description: dbTask.description,
      type: dbTask.type,
      priority: dbTask.priority,
      status: dbTask.status,
      nistFunction: dbTask.nist_function || dbTask.nistFunction || 'Identify',
      nistCategory: dbTask.nist_category || dbTask.nistCategory || '',
      nistSubcategory: dbTask.nist_subcategory || dbTask.nistSubcategory || '',
      relatedControlId: dbTask.related_control_id || dbTask.relatedControlId || '',
      assignedTo: Array.isArray(assignedTo) ? assignedTo : (assignedTo ? [assignedTo] : []),
      assignedBy: dbTask.assigned_by || dbTask.assignedBy || '',
      createdAt: new Date(dbTask.created_at || dbTask.createdAt),
      updatedAt: new Date(dbTask.updated_at || dbTask.updatedAt),
      dueDate: new Date(dbTask.due_date || dbTask.dueDate),
      startDate: dbTask.start_date || dbTask.startDate ? new Date(dbTask.start_date || dbTask.startDate) : undefined,
      completedAt: dbTask.completed_at || dbTask.completedAt ? new Date(dbTask.completed_at || dbTask.completedAt) : undefined,
      estimatedHours: dbTask.estimated_hours || dbTask.estimatedHours || 0,
      actualHours: dbTask.actual_hours || dbTask.actualHours,
      progress: dbTask.progress || 0,
      dependencies: dbTask.dependencies || [],
      subtasks: dbTask.subtasks || [],
      attachments: dbTask.attachments || [],
      comments: dbTask.comments || [],
      evidence: dbTask.evidence || [],
      approvalRequired: dbTask.approval_required || dbTask.approvalRequired || false,
      approvedBy: dbTask.approved_by || dbTask.approvedBy,
      approvedAt: dbTask.approved_at || dbTask.approvedAt ? new Date(dbTask.approved_at || dbTask.approvedAt) : undefined,
      tags: dbTask.tags || [],
      workflowId: dbTask.workflow_id || dbTask.workflowId,
      stageId: dbTask.stage_id || dbTask.stageId,
      metadata: dbTask.metadata || {
        businessImpact: 'medium',
        technicalComplexity: 'medium',
        riskReduction: 0,
        complianceImpact: [],
        successCriteria: []
      }
    };
  }
}

export const taskService = TaskService.getInstance();
