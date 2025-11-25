import React, { useState, useMemo, useCallback, useRef, useEffect } from 'react';
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore - Icons exist in lucide-react but TypeScript definitions may be outdated
import * as LucideIcons from 'lucide-react';

// Type-safe icon imports with fallbacks
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const LucideIconsAny = LucideIcons as any;
const CheckSquare = LucideIconsAny.CheckSquare as React.ComponentType<{ className?: string; [key: string]: unknown }>;
const AlertTriangle = LucideIconsAny.AlertTriangle as React.ComponentType<{ className?: string; [key: string]: unknown }>;
const Plus = LucideIconsAny.Plus as React.ComponentType<{ className?: string; [key: string]: unknown }>;
const Search = LucideIconsAny.Search as React.ComponentType<{ className?: string; [key: string]: unknown }>;
const Calendar = LucideIconsAny.Calendar as React.ComponentType<{ className?: string; [key: string]: unknown }>;
const Edit3 = LucideIconsAny.Edit3 as React.ComponentType<{ className?: string; [key: string]: unknown }>;
const Trash2 = LucideIconsAny.Trash2 as React.ComponentType<{ className?: string; [key: string]: unknown }>;
const MessageSquare = LucideIconsAny.MessageSquare as React.ComponentType<{ className?: string; [key: string]: unknown }>;
const Paperclip = LucideIconsAny.Paperclip as React.ComponentType<{ className?: string; [key: string]: unknown }>;
const XCircle = LucideIconsAny.XCircle as React.ComponentType<{ className?: string; [key: string]: unknown }>;

// Icons that TypeScript recognizes
const { Target, Eye, CheckCircle } = LucideIcons;
import { Task, TaskFilter, TaskMetrics, TaskStatus, TaskPriority, TaskType } from '../types';
import { taskService } from '../../../../services/taskService';
import { useAuth } from '../../../../shared/hooks/useAuth';
import { Breadcrumbs } from '../../../../shared/components/layout';
import { Input } from '../../../../components/ui/input';
import { Textarea } from '../../../../components/ui/textarea';

interface TaskManagementDashboardProps {
  addNotification: (type: 'success' | 'error' | 'warning' | 'info', message: string) => void;
}

export const TaskManagementDashboard: React.FC<TaskManagementDashboardProps> = ({
  addNotification
}) => {
  const { user } = useAuth();
  const [activeView, setActiveView] = useState<'kanban' | 'list' | 'calendar'>('kanban');
  const [filters, setFilters] = useState<TaskFilter>({});
  const [searchTerm, setSearchTerm] = useState('');
  const [showCreateTask, setShowCreateTask] = useState(false);
  const [tasks, setTasks] = useState<Task[]>([]);
  const [, setLoading] = useState(false);
  const [formErrors, setFormErrors] = useState<Record<string, string>>({});
  const [touchedFields, setTouchedFields] = useState<Record<string, boolean>>({});
  const [taskFormData, setTaskFormData] = useState({
    title: '',
    description: '',
    type: 'assessment' as TaskType,
    priority: 'medium' as TaskPriority,
    nistFunction: 'Identify',
    nistCategory: '',
    nistSubcategory: '',
    assignedTo: '',
    dueDate: '',
    estimatedHours: 8
  });

  // Refs for task progress bars
  const taskProgressBarRefs = useRef<Map<string, HTMLDivElement>>(new Map());

  // Update task progress bar widths
  useEffect(() => {
    tasks.forEach(task => {
      const ref = taskProgressBarRefs.current.get(task.id);
      if (ref) {
        ref.style.width = `${task.progress}%`;
      }
    });
  }, [tasks]);

  const setTaskProgressBarRef = (taskId: string, progress: number) => (element: HTMLDivElement | null) => {
    if (element) {
      taskProgressBarRefs.current.set(taskId, element);
      element.style.width = `${progress}%`;
    } else {
      taskProgressBarRefs.current.delete(taskId);
    }
  };

  // Mock task data for NIST CSF v2.0 implementation
  const mockTasks: Task[] = [
    {
      id: 'task-001',
      title: 'Complete Asset Inventory Assessment',
      description: 'Conduct comprehensive assessment of organizational assets for ID.AM-01 control implementation',
      type: 'assessment',
      priority: 'high',
      status: 'in-progress',
      nistFunction: 'Identify',
      nistCategory: 'Asset Management',
      nistSubcategory: 'ID.AM-01',
      relatedControlId: 'id.am-01',
      assignedTo: ['user-002', 'user-003'],
      assignedBy: 'user-001',
      createdAt: new Date('2024-02-01'),
      updatedAt: new Date('2024-02-15'),
      dueDate: new Date('2024-02-28'),
      estimatedHours: 20,
      actualHours: 12,
      progress: 60,
      dependencies: [],
      subtasks: [
        {
          id: 'st-001',
          title: 'Hardware Inventory',
          description: 'Catalog all hardware assets',
          assignedTo: 'user-002',
          status: 'completed',
          dueDate: new Date('2024-02-20'),
          estimatedHours: 8,
          actualHours: 6
        },
        {
          id: 'st-002',
          title: 'Software Inventory',
          description: 'Catalog all software assets',
          assignedTo: 'user-003',
          status: 'in-progress',
          dueDate: new Date('2024-02-25'),
          estimatedHours: 12,
          actualHours: 6
        }
      ],
      attachments: [],
      comments: [
        {
          id: 'comment-001',
          content: 'Hardware inventory completed ahead of schedule',
          createdAt: new Date('2024-02-20'),
          createdBy: 'user-002',
          mentions: ['user-001'],
          attachments: [],
          isSystemGenerated: false
        }
      ],
      evidence: ['ev-001'],
      approvalRequired: true,
      tags: ['assessment', 'asset-management', 'high-priority'],
      workflowId: 'wf-001',
      stageId: 'stage-1',
      metadata: {
        businessImpact: 'high',
        technicalComplexity: 'medium',
        riskReduction: 25,
        complianceImpact: ['NIST CSF', 'ISO 27001'],
        successCriteria: ['95% asset discovery accuracy', 'Complete classification']
      }
    },
    {
      id: 'task-002',
      title: 'Implement Multi-Factor Authentication',
      description: 'Deploy MFA solution for all user accounts (PR.AA-01)',
      type: 'control-implementation',
      priority: 'critical',
      status: 'not-started',
      nistFunction: 'Protect',
      nistCategory: 'Identity Management',
      nistSubcategory: 'PR.AA-01',
      relatedControlId: 'pr.aa-01',
      assignedTo: ['user-002'],
      assignedBy: 'user-001',
      createdAt: new Date('2024-02-10'),
      updatedAt: new Date('2024-02-10'),
      dueDate: new Date('2024-03-15'),
      estimatedHours: 40,
      progress: 0,
      dependencies: [
        { taskId: 'task-001', type: 'blocks', description: 'Asset inventory required for MFA scope' }
      ],
      subtasks: [],
      attachments: [],
      comments: [],
      evidence: [],
      approvalRequired: true,
      tags: ['implementation', 'access-control', 'critical'],
      metadata: {
        businessImpact: 'critical',
        technicalComplexity: 'high',
        riskReduction: 40,
        complianceImpact: ['NIST CSF', 'SOC 2'],
        successCriteria: ['100% user coverage', 'Zero bypass vulnerabilities']
      }
    },
    {
      id: 'task-003',
      title: 'Develop Incident Response Policy',
      description: 'Create comprehensive incident response policy for RS.RP-01',
      type: 'policy-development',
      priority: 'medium',
      status: 'review',
      nistFunction: 'Respond',
      nistCategory: 'Response Planning',
      nistSubcategory: 'RS.RP-01',
      relatedControlId: 'rs.rp-01',
      assignedTo: ['user-003'],
      assignedBy: 'user-001',
      createdAt: new Date('2024-01-15'),
      updatedAt: new Date('2024-02-10'),
      dueDate: new Date('2024-02-25'),
      estimatedHours: 16,
      actualHours: 14,
      progress: 90,
      dependencies: [],
      subtasks: [],
      attachments: [],
      comments: [],
      evidence: ['ev-002'],
      approvalRequired: true,
      tags: ['policy', 'incident-response', 'medium-priority'],
      metadata: {
        businessImpact: 'high',
        technicalComplexity: 'low',
        riskReduction: 30,
        complianceImpact: ['NIST CSF'],
        successCriteria: ['Policy approved', 'Training completed']
      }
    }
  ];

  const loadTasks = useCallback(async () => {
    if (!user || !('id' in user)) return;
    
    setLoading(true);
    try {
      const userId = (user as { id: string }).id;
      const fetchedTasks = await taskService.getTasks(userId, undefined, filters);
      setTasks(fetchedTasks.length > 0 ? fetchedTasks : mockTasks);
    } catch (error) {
      console.error('Failed to load tasks:', error);
      setTasks(mockTasks); // Fallback to mock data
      addNotification('warning', 'Using sample data - connect to database for full functionality');
    } finally {
      setLoading(false);
    }
  }, [user, addNotification, filters]);

  // Load tasks on component mount and when user changes
  React.useEffect(() => {
    if (user) {
      loadTasks();
    }
  }, [user, loadTasks]);

  const metrics: TaskMetrics = useMemo(() => {
    const totalTasks = tasks.length;
    const completedTasks = tasks.filter(t => t.status === 'completed').length;
    const overdueTasks = tasks.filter(t => new Date(t.dueDate) < new Date() && t.status !== 'completed').length;
    
    const tasksByStatus = tasks.reduce((acc, task) => {
      acc[task.status] = (acc[task.status] || 0) + 1;
      return acc;
    }, {} as Record<TaskStatus, number>);

    const tasksByPriority = tasks.reduce((acc, task) => {
      acc[task.priority] = (acc[task.priority] || 0) + 1;
      return acc;
    }, {} as Record<TaskPriority, number>);

    const tasksByFunction = tasks.reduce((acc, task) => {
      acc[task.nistFunction] = (acc[task.nistFunction] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);

    const upcomingDeadlines = tasks.filter(t => {
      const daysUntilDue = (new Date(t.dueDate).getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24);
      return daysUntilDue <= 7 && daysUntilDue > 0 && t.status !== 'completed';
    }).length;

    const blockedTasks = tasks.filter(t => t.status === 'blocked').length;

    return {
      totalTasks,
      completedTasks,
      overdueTasks,
      tasksByStatus,
      tasksByPriority,
      tasksByFunction,
      tasksByAssignee: {},
      averageCompletionTime: 0,
      upcomingDeadlines,
      blockedTasks
    };
  }, [tasks]);

  const getStatusColor = (status: TaskStatus) => {
    switch (status) {
      case 'completed': return 'bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-300';
      case 'in-progress': return 'bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-300';
      case 'blocked': return 'bg-red-100 dark:bg-red-900/30 text-red-800 dark:text-red-300';
      case 'review': return 'bg-purple-100 dark:bg-purple-900/30 text-purple-800 dark:text-purple-300';
      case 'overdue': return 'bg-red-100 dark:bg-red-900/30 text-red-800 dark:text-red-300';
      default: return 'bg-gray-100 dark:bg-gray-900/30 text-gray-800 dark:text-gray-300';
    }
  };

  const getPriorityColor = (priority: TaskPriority) => {
    switch (priority) {
      case 'critical': return 'text-red-600 dark:text-red-400';
      case 'high': return 'text-orange-600 dark:text-orange-400';
      case 'medium': return 'text-yellow-600 dark:text-yellow-400';
      case 'low': return 'text-green-600 dark:text-green-400';
    }
  };

  const filteredTasks = useMemo(() => {
    return tasks.filter(task => {
      const matchesSearch = task.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           task.description.toLowerCase().includes(searchTerm.toLowerCase());
      
      const matchesFunction = !filters.nistFunction?.length || filters.nistFunction.includes(task.nistFunction);
      const matchesType = !filters.type?.length || filters.type.includes(task.type);
      const matchesStatus = !filters.status?.length || filters.status.includes(task.status);
      const matchesPriority = !filters.priority?.length || filters.priority.includes(task.priority);
      
      return matchesSearch && matchesFunction && matchesType && matchesStatus && matchesPriority;
    });
  }, [tasks, searchTerm, filters]);

  const kanbanColumns = [
    { id: 'not-started', title: 'Not Started', tasks: filteredTasks.filter(t => t.status === 'not-started') },
    { id: 'in-progress', title: 'In Progress', tasks: filteredTasks.filter(t => t.status === 'in-progress') },
    { id: 'blocked', title: 'Blocked', tasks: filteredTasks.filter(t => t.status === 'blocked') },
    { id: 'review', title: 'Review', tasks: filteredTasks.filter(t => t.status === 'review') },
    { id: 'completed', title: 'Completed', tasks: filteredTasks.filter(t => t.status === 'completed') }
  ];

  // Real-time validation
  const validateField = (name: string, value: string | number) => {
    const errors: Record<string, string> = {};
    
    switch (name) {
      case 'title':
        if (!value || (typeof value === 'string' && !value.trim())) {
          errors.title = 'Task title is required';
        } else if (typeof value === 'string' && value.length < 3) {
          errors.title = 'Title must be at least 3 characters';
        } else if (typeof value === 'string' && value.length > 200) {
          errors.title = 'Title must be less than 200 characters';
        }
        break;
      case 'description':
        if (!value || (typeof value === 'string' && !value.trim())) {
          errors.description = 'Task description is required';
        } else if (typeof value === 'string' && value.length < 10) {
          errors.description = 'Description must be at least 10 characters';
        }
        break;
      case 'dueDate':
        if (!value) {
          errors.dueDate = 'Due date is required';
        } else if (typeof value === 'string') {
          const selectedDate = new Date(value);
          const today = new Date();
          today.setHours(0, 0, 0, 0);
          if (selectedDate < today) {
            errors.dueDate = 'Due date cannot be in the past';
          }
        }
        break;
      case 'estimatedHours':
        if (!value || (typeof value === 'number' && value <= 0)) {
          errors.estimatedHours = 'Estimated hours must be greater than 0';
        } else if (typeof value === 'number' && value > 1000) {
          errors.estimatedHours = 'Estimated hours seems too high (max 1000)';
        }
        break;
    }
    
    setFormErrors(prev => ({ ...prev, ...errors }));
    return Object.keys(errors).length === 0;
  };

  const handleFieldBlur = (name: string, value: string | number) => {
    setTouchedFields(prev => ({ ...prev, [name]: true }));
    validateField(name, value);
  };

  const handleFieldChange = (name: string, value: string | number) => {
    setTaskFormData(prev => ({ ...prev, [name]: value }));
    
    // Validate on change if field has been touched
    if (touchedFields[name]) {
      validateField(name, value);
    }
  };

  const handleCreateTask = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Mark all fields as touched
    const allFields = Object.keys(taskFormData);
    setTouchedFields(
      allFields.reduce((acc, field) => ({ ...acc, [field]: true }), {} as Record<string, boolean>)
    );
    
    // Validate all fields
    const validationResults = allFields.map(field => 
      validateField(field, taskFormData[field as keyof typeof taskFormData] as string | number)
    );
    
    if (!validationResults.every(result => result)) {
      addNotification('error', 'Please fix the form errors before submitting');
      return;
    }
    
    if (!user || !('id' in user)) {
      addNotification('error', 'User not authenticated');
      return;
    }

    const userId = (user as { id: string }).id;

    const newTaskData: Omit<Task, 'id' | 'createdAt' | 'updatedAt'> = {
      title: taskFormData.title,
      description: taskFormData.description,
      type: taskFormData.type,
      priority: taskFormData.priority,
      status: 'not-started',
      nistFunction: taskFormData.nistFunction as any,
      nistCategory: taskFormData.nistCategory,
      nistSubcategory: taskFormData.nistSubcategory,
      relatedControlId: taskFormData.nistSubcategory.toLowerCase().replace('.', '.'),
      assignedTo: [taskFormData.assignedTo],
      assignedBy: userId,
      dueDate: new Date(taskFormData.dueDate),
      estimatedHours: taskFormData.estimatedHours,
      progress: 0,
      dependencies: [],
      subtasks: [],
      attachments: [],
      comments: [],
      evidence: [],
      approvalRequired: false,
      tags: [taskFormData.type, taskFormData.nistFunction.toLowerCase()],
      metadata: {
        businessImpact: 'medium',
        technicalComplexity: 'medium',
        riskReduction: 10,
        complianceImpact: ['NIST CSF'],
        successCriteria: []
      }
    };

    try {
      const createdTask = await taskService.createTask(newTaskData, userId);
      
      setTasks(prev => [...prev, createdTask]);
      addNotification('success', `Task "${createdTask.title}" created successfully`);
      setShowCreateTask(false);
      
      // Reset form
      setTaskFormData({
        title: '',
        description: '',
        type: 'assessment',
        priority: 'medium',
        nistFunction: 'Identify',
        nistCategory: '',
        nistSubcategory: '',
        assignedTo: '',
        dueDate: '',
        estimatedHours: 8
      });
      setFormErrors({});
      setTouchedFields({});
    } catch (error: any) {
      addNotification('error', (error as Error).message || 'Failed to create task');
    }
  };

  const handleUpdateTaskStatus = async (taskId: string, newStatus: TaskStatus) => {
    const task = tasks.find(t => t.id === taskId);
    if (!task || !user || !('id' in user)) return;

    try {
      const userId = (user as { id: string }).id;
      const updatedTask = { ...task, status: newStatus, updatedAt: new Date() };
      const updatedTaskData = await taskService.updateTask(updatedTask, userId);
      
      setTasks(prev => prev.map(t => t.id === taskId ? updatedTaskData : t));
      addNotification('success', `Task status updated to ${newStatus}`);
    } catch (error: unknown) {
      addNotification('error', (error as Error).message || 'Failed to update task');
    }
  };

  const handleDeleteTask = async (taskId: string) => {
    if (!user || !('id' in user)) return;
    
    if (window.confirm('Are you sure you want to delete this task?')) {
      try {
        const userId = (user as { id: string }).id;
        await taskService.deleteTask(taskId, userId);
        setTasks(prev => prev.filter(t => t.id !== taskId));
        addNotification('success', 'Task deleted successfully');
      } catch (error: unknown) {
        addNotification('error', (error as Error).message || 'Failed to delete task');
      }
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Breadcrumbs */}
      <div className="mb-6">
        <Breadcrumbs 
          items={[
            { label: 'Task Management', isActive: true }
          ]} 
        />
      </div>

      {/* Header */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 mb-8">
        <div className="p-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="p-3 bg-gradient-to-br from-green-100 to-emerald-100 dark:from-green-900/30 dark:to-emerald-900/30 rounded-xl">
                <CheckSquare className="w-8 h-8 text-green-600 dark:text-green-400" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
                  NIST CSF v2.0 Task Management
                </h1>
                <p className="text-gray-600 dark:text-gray-300">
                  Track implementation tasks and deliverables across all framework functions
                </p>
              </div>
            </div>
            
            <button
              onClick={() => setShowCreateTask(true)}
              className="flex items-center space-x-2 bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors"
            >
              <Plus className="w-4 h-4" />
              <span>Create Task</span>
            </button>
          </div>
        </div>
      </div>

      {/* Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-6 mb-8">
        <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg border border-gray-200 dark:border-gray-700">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Total Tasks</p>
              <p className="text-3xl font-bold text-blue-600 dark:text-blue-400">{metrics.totalTasks}</p>
            </div>
            <CheckSquare className="w-8 h-8 text-blue-600 dark:text-blue-400" />
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg border border-gray-200 dark:border-gray-700">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Completed</p>
              <p className="text-3xl font-bold text-green-600 dark:text-green-400">{metrics.completedTasks}</p>
            </div>
            <CheckCircle className="w-8 h-8 text-green-600 dark:text-green-400" />
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg border border-gray-200 dark:border-gray-700">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Overdue</p>
              <p className="text-3xl font-bold text-red-600 dark:text-red-400">{metrics.overdueTasks}</p>
            </div>
            <AlertTriangle className="w-8 h-8 text-red-600 dark:text-red-400" />
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg border border-gray-200 dark:border-gray-700">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Blocked</p>
              <p className="text-3xl font-bold text-orange-600 dark:text-orange-400">{metrics.blockedTasks}</p>
            </div>
            <XCircle className="w-8 h-8 text-orange-600 dark:text-orange-400" />
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg border border-gray-200 dark:border-gray-700">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Due This Week</p>
              <p className="text-3xl font-bold text-purple-600 dark:text-purple-400">{metrics.upcomingDeadlines}</p>
            </div>
            <Calendar className="w-8 h-8 text-purple-600 dark:text-purple-400" />
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg border border-gray-200 dark:border-gray-700">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Completion Rate</p>
              <p className="text-3xl font-bold text-indigo-600 dark:text-indigo-400">
                {metrics.totalTasks > 0 ? Math.round((metrics.completedTasks / metrics.totalTasks) * 100) : 0}%
              </p>
            </div>
            <Target className="w-8 h-8 text-indigo-600 dark:text-indigo-400" />
          </div>
        </div>
      </div>

      {/* Filters and Controls */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 mb-8 p-6">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0 mb-6">
          <div className="flex-1 max-w-lg">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                id="task-search"
                name="task-search"
                type="text"
                placeholder="Search tasks..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-green-500 focus:border-transparent"
              />
            </div>
          </div>
          
          <div className="flex items-center space-x-4">
            <div className="flex space-x-1 bg-gray-100 dark:bg-gray-700 rounded-lg p-1">
              {(['kanban', 'list', 'calendar'] as const).map((view) => (
                <button
                  key={view}
                  onClick={() => setActiveView(view)}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors capitalize ${
                    activeView === view
                      ? 'bg-green-600 text-white'
                      : 'text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
                  }`}
                >
                  {view}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Quick Filters */}
        <div className="flex flex-wrap gap-4">
          <select
            id="nist-function-filter"
            name="nist-function-filter"
            aria-label="Filter by NIST function"
            onChange={(e) => setFilters(prev => ({ 
              ...prev, 
              nistFunction: e.target.value === 'all' ? undefined : [e.target.value] 
            }))}
            className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-green-500 focus:border-transparent"
          >
            <option value="all">All Functions</option>
            <option value="Govern">Govern</option>
            <option value="Identify">Identify</option>
            <option value="Protect">Protect</option>
            <option value="Detect">Detect</option>
            <option value="Respond">Respond</option>
            <option value="Recover">Recover</option>
          </select>

          <select
            id="priority-filter"
            name="priority-filter"
            aria-label="Filter by priority"
            onChange={(e) => setFilters(prev => ({ 
              ...prev, 
              priority: e.target.value === 'all' ? undefined : [e.target.value as TaskPriority] 
            }))}
            className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-green-500 focus:border-transparent"
          >
            <option value="all">All Priorities</option>
            <option value="critical">Critical</option>
            <option value="high">High</option>
            <option value="medium">Medium</option>
            <option value="low">Low</option>
          </select>

          <select
            id="status-filter"
            name="status-filter"
            aria-label="Filter by status"
            onChange={(e) => setFilters(prev => ({ 
              ...prev, 
              status: e.target.value === 'all' ? undefined : [e.target.value as TaskStatus] 
            }))}
            className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-green-500 focus:border-transparent"
          >
            <option value="all">All Status</option>
            <option value="not-started">Not Started</option>
            <option value="in-progress">In Progress</option>
            <option value="blocked">Blocked</option>
            <option value="review">Review</option>
            <option value="completed">Completed</option>
          </select>
        </div>
      </div>

      {/* Kanban Board */}
      {activeView === 'kanban' && (
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 p-6">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
            {kanbanColumns.map((column) => (
              <div key={column.id} className="space-y-4">
                <div className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700/50 rounded-lg">
                  <h3 className="font-semibold text-gray-900 dark:text-white">
                    {column.title}
                  </h3>
                  <span className="bg-gray-200 dark:bg-gray-600 text-gray-700 dark:text-gray-300 px-2 py-1 rounded-full text-xs font-medium">
                    {column.tasks.length}
                  </span>
                </div>

                <div className="space-y-3 min-h-[400px]">
                  {column.tasks.map((task) => (
                    <div key={task.id} className="border border-gray-200 dark:border-gray-700 rounded-lg p-4 hover:shadow-md transition-shadow bg-white dark:bg-gray-800">
                      <div className="flex items-start justify-between mb-3">
                        <div className="flex-1">
                          <h4 className="font-medium text-gray-900 dark:text-white mb-1">
                            {task.title}
                          </h4>
                          <p className="text-sm text-gray-600 dark:text-gray-300 line-clamp-2">
                            {task.description}
                          </p>
                        </div>
                        <span className={`px-2 py-1 rounded text-xs font-medium ${getPriorityColor(task.priority)}`}>
                          {task.priority}
                        </span>
                      </div>

                      <div className="flex items-center justify-between mb-3">
                        <span className="px-2 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-300 text-xs rounded">
                          {task.nistSubcategory}
                        </span>
                        <span className="text-xs text-gray-500 dark:text-gray-400">
                          {task.dueDate.toLocaleDateString()}
                        </span>
                      </div>

                      <div className="flex items-center justify-between mb-3">
                        <div className="text-xs text-gray-500 dark:text-gray-400">
                          Progress: {task.progress}%
                        </div>
                        <div className="flex items-center space-x-1">
                          {task.comments.length > 0 && (
                            <span className="flex items-center space-x-1 text-xs text-gray-500">
                              <MessageSquare className="w-3 h-3" />
                              <span>{task.comments.length}</span>
                            </span>
                          )}
                          {task.attachments.length > 0 && (
                            <span className="flex items-center space-x-1 text-xs text-gray-500">
                              <Paperclip className="w-3 h-3" />
                              <span>{task.attachments.length}</span>
                            </span>
                          )}
                        </div>
                      </div>

                      <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2 mb-3">
                        <div
                          ref={setTaskProgressBarRef(task.id, task.progress)}
                          className="bg-green-500 h-2 rounded-full transition-all duration-300"
                        />
                      </div>

                      <div className="flex items-center justify-between">
                        <div className="flex -space-x-2">
                          {task.assignedTo.slice(0, 3).map((userId, index) => (
                            <div key={index} className="w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center text-white text-xs font-bold border-2 border-white dark:border-gray-800">
                              {userId.charAt(userId.length - 1)}
                            </div>
                          ))}
                          {task.assignedTo.length > 3 && (
                            <div className="w-6 h-6 bg-gray-400 rounded-full flex items-center justify-center text-white text-xs font-bold border-2 border-white dark:border-gray-800">
                              +{task.assignedTo.length - 3}
                            </div>
                          )}
                        </div>
                        
                        <div className="flex space-x-1">
                          <button
                            onClick={() => addNotification('info', `Viewing task: ${task.title}`)}
                            aria-label={`View task ${task.title}`}
                            className="p-1 text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                          >
                            <Eye className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => handleDeleteTask(task.id)}
                            aria-label={`Delete task ${task.title}`}
                            className="p-1 text-gray-400 hover:text-red-600 dark:hover:text-red-400 transition-colors"
                          >
                            <Trash2 className="w-3 h-3" />
                          </button>
                        </div>
                      </div>
                      
                      {/* Quick Status Update */}
                      <div className="mt-3 pt-3 border-t border-gray-200 dark:border-gray-700">
                        <div className="flex space-x-1">
                          <button
                            onClick={() => handleUpdateTaskStatus(task.id, 'in-progress')}
                            disabled={task.status === 'in-progress'}
                            className="text-xs bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-300 px-2 py-1 rounded hover:bg-blue-200 dark:hover:bg-blue-800/50 disabled:opacity-50 transition-colors"
                          >
                            Start
                          </button>
                          <button
                            onClick={() => handleUpdateTaskStatus(task.id, 'completed')}
                            disabled={task.status === 'completed'}
                            className="text-xs bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-300 px-2 py-1 rounded hover:bg-green-200 dark:hover:bg-green-800/50 disabled:opacity-50 transition-colors"
                          >
                            Complete
                          </button>
                          <button
                            onClick={() => handleUpdateTaskStatus(task.id, 'blocked')}
                            disabled={task.status === 'blocked'}
                            className="text-xs bg-red-100 dark:bg-red-900/30 text-red-800 dark:text-red-300 px-2 py-1 rounded hover:bg-red-200 dark:hover:bg-red-800/50 disabled:opacity-50 transition-colors"
                          >
                            Block
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* List View */}
      {activeView === 'list' && (
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 dark:bg-gray-700">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    Task
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    NIST Function
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    Assignee
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    Priority
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    Due Date
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    Progress
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                {filteredTasks.map((task) => (
                  <tr key={task.id} className="hover:bg-gray-50 dark:hover:bg-gray-700/50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div>
                        <div className="font-medium text-gray-900 dark:text-white">
                          {task.title}
                        </div>
                        <div className="text-sm text-gray-500 dark:text-gray-400">
                          {task.nistSubcategory}
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-gray-900 dark:text-white">
                      {task.nistFunction}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex -space-x-2">
                        {task.assignedTo.slice(0, 2).map((userId, index) => (
                          <div key={index} className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center text-white text-xs font-bold border-2 border-white dark:border-gray-800">
                            {userId.charAt(userId.length - 1)}
                          </div>
                        ))}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`font-medium ${getPriorityColor(task.priority)}`}>
                        {task.priority}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(task.status)}`}>
                        {task.status.replace('-', ' ')}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-gray-900 dark:text-white">
                      {task.dueDate.toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center space-x-2">
                        <div className="flex-1 bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                          <div
                            ref={setTaskProgressBarRef(task.id, task.progress)}
                            className="bg-green-500 h-2 rounded-full"
                          />
                        </div>
                        <span className="text-sm text-gray-600 dark:text-gray-300">
                          {task.progress}%
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex space-x-2">
                        <button
                          onClick={() => addNotification('info', `Viewing task: ${task.title}`)}
                          aria-label={`View task ${task.title}`}
                          className="p-2 text-blue-600 dark:text-blue-400 hover:bg-blue-100 dark:hover:bg-blue-900/30 rounded-lg transition-colors"
                        >
                          <Eye className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => addNotification('info', 'Task editing feature coming soon')}
                          aria-label={`Edit task ${task.title}`}
                          className="p-2 text-green-600 dark:text-green-400 hover:bg-green-100 dark:hover:bg-green-900/30 rounded-lg transition-colors"
                        >
                          <Edit3 className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => handleDeleteTask(task.id)}
                          aria-label={`Delete task ${task.title}`}
                          className="p-2 text-red-600 dark:text-red-400 hover:bg-red-100 dark:hover:bg-red-900/30 rounded-lg transition-colors"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Create Task Modal */}
      {showCreateTask && (
        <div className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="bg-white dark:bg-gray-800 rounded-2xl p-8 max-w-2xl w-full mx-4 shadow-2xl border border-gray-200 dark:border-gray-700 max-h-[90vh] overflow-y-auto">
            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
              Create Implementation Task
            </h3>
            
            <form onSubmit={handleCreateTask} className="space-y-4" noValidate>
              <Input
                label="Task Title *"
                  id="task-title"
                  name="task-title"
                  type="text"
                  required
                  value={taskFormData.title}
                onChange={(e) => handleFieldChange('title', e.target.value)}
                onBlur={(e) => handleFieldBlur('title', e.target.value)}
                error={touchedFields.title ? formErrors.title : undefined}
                success={touchedFields.title && !formErrors.title && taskFormData.title.length >= 3}
                showSuccessIcon={touchedFields.title && !formErrors.title && taskFormData.title.length >= 3}
                helperText="Enter a descriptive title for the task"
                  placeholder="Enter task title"
                />

              <Textarea
                label="Description *"
                  id="task-description"
                  name="task-description"
                  required
                  value={taskFormData.description}
                onChange={(e) => handleFieldChange('description', e.target.value)}
                onBlur={(e) => handleFieldBlur('description', e.target.value)}
                error={touchedFields.description ? formErrors.description : undefined}
                success={touchedFields.description && !formErrors.description && taskFormData.description.length >= 10}
                maxLength={1000}
                showCharCount
                helperText="Describe the task objectives and deliverables"
                  placeholder="Describe the task objectives and deliverables"
                rows={3}
                />
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="task-type" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Task Type *
                  </label>
                  <select
                    id="task-type"
                    name="task-type"
                    required
                    value={taskFormData.type}
                    onChange={(e) => setTaskFormData(prev => ({ ...prev, type: e.target.value as TaskType }))}
                    className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  >
                    <option value="assessment">Assessment</option>
                    <option value="evidence-collection">Evidence Collection</option>
                    <option value="policy-development">Policy Development</option>
                    <option value="control-implementation">Control Implementation</option>
                    <option value="testing-validation">Testing & Validation</option>
                    <option value="documentation">Documentation</option>
                    <option value="training">Training</option>
                    <option value="review-approval">Review & Approval</option>
                    <option value="monitoring">Monitoring</option>
                    <option value="remediation">Remediation</option>
                  </select>
                </div>
                
                <div>
                  <label htmlFor="task-priority" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Priority *
                  </label>
                  <select
                    id="task-priority"
                    name="task-priority"
                    required
                    value={taskFormData.priority}
                    onChange={(e) => setTaskFormData(prev => ({ ...prev, priority: e.target.value as TaskPriority }))}
                    className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  >
                    <option value="low">Low</option>
                    <option value="medium">Medium</option>
                    <option value="high">High</option>
                    <option value="critical">Critical</option>
                  </select>
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="task-nist-function" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    NIST Function *
                  </label>
                  <select
                    id="task-nist-function"
                    name="task-nist-function"
                    required
                    value={taskFormData.nistFunction}
                    onChange={(e) => setTaskFormData(prev => ({ ...prev, nistFunction: e.target.value }))}
                    className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  >
                    <option value="Govern">Govern</option>
                    <option value="Identify">Identify</option>
                    <option value="Protect">Protect</option>
                    <option value="Detect">Detect</option>
                    <option value="Respond">Respond</option>
                    <option value="Recover">Recover</option>
                  </select>
                </div>
                
                <div>
                  <label htmlFor="task-nist-category" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    NIST Category
                  </label>
                  <input
                    id="task-nist-category"
                    name="task-nist-category"
                    type="text"
                    value={taskFormData.nistCategory}
                    onChange={(e) => setTaskFormData(prev => ({ ...prev, nistCategory: e.target.value }))}
                    className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    placeholder="e.g., Asset Management"
                  />
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="task-nist-subcategory" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    NIST Subcategory
                  </label>
                  <input
                    id="task-nist-subcategory"
                    name="task-nist-subcategory"
                    type="text"
                    value={taskFormData.nistSubcategory}
                    onChange={(e) => setTaskFormData(prev => ({ ...prev, nistSubcategory: e.target.value }))}
                    className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    placeholder="e.g., ID.AM-01"
                  />
                </div>
                
                <div>
                  <label htmlFor="task-assigned-to" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Assigned To *
                  </label>
                  <select
                    id="task-assigned-to"
                    name="task-assigned-to"
                    required
                    value={taskFormData.assignedTo}
                    onChange={(e) => setTaskFormData(prev => ({ ...prev, assignedTo: e.target.value }))}
                    className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  >
                    <option value="">Select team member</option>
                    <option value="user-001">Sarah Johnson (CISO)</option>
                    <option value="user-002">Mike Chen (Security Analyst)</option>
                    <option value="user-003">Emily Rodriguez (Compliance Officer)</option>
                    <option value="team-it">IT Team</option>
                    <option value="team-security">Security Team</option>
                    <option value="team-compliance">Compliance Team</option>
                  </select>
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Input
                  label="Due Date *"
                    id="task-due-date"
                    name="task-due-date"
                    type="date"
                    required
                    value={taskFormData.dueDate}
                  onChange={(e) => handleFieldChange('dueDate', e.target.value)}
                  onBlur={(e) => handleFieldBlur('dueDate', e.target.value)}
                  error={touchedFields.dueDate ? formErrors.dueDate : undefined}
                  success={touchedFields.dueDate && !formErrors.dueDate && taskFormData.dueDate}
                  helperText="Select a due date for this task"
                />

                <Input
                  label="Estimated Hours"
                    id="task-estimated-hours"
                    name="task-estimated-hours"
                    type="number"
                    min="1"
                  max="1000"
                    value={taskFormData.estimatedHours}
                  onChange={(e) => handleFieldChange('estimatedHours', parseInt(e.target.value) || 0)}
                  onBlur={(e) => handleFieldBlur('estimatedHours', parseInt(e.target.value) || 0)}
                  error={touchedFields.estimatedHours ? formErrors.estimatedHours : undefined}
                  success={touchedFields.estimatedHours && !formErrors.estimatedHours && taskFormData.estimatedHours > 0}
                  helperText="Estimated hours to complete this task"
                  />
              </div>
              
              <div className="flex space-x-4 pt-4">
                <button
                  type="button"
                  onClick={() => {
                    setShowCreateTask(false);
                    setTaskFormData({
                      title: '',
                      description: '',
                      type: 'assessment',
                      priority: 'medium',
                      nistFunction: 'Identify',
                      nistCategory: '',
                      nistSubcategory: '',
                      assignedTo: '',
                      dueDate: '',
                      estimatedHours: 8
                    });
                  }}
                  className="flex-1 px-6 py-3 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors font-medium"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 px-6 py-3 bg-green-600 text-white rounded-xl hover:bg-green-700 transition-colors font-medium"
                >
                  Create Task
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};