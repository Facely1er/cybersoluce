import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import {
  CheckSquare,
  Plus,
  Filter,
  Calendar,
  Clock,
  User,
  AlertTriangle,
  CheckCircle,
  ArrowRight,
  MoreHorizontal,
  MessageSquare,
  Upload,
  Download,
  FileText
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { Task, AssignmentSuggestion } from '../types/orchestration';
import { orchestrationService } from '../services/orchestrationService';
import EnhancedTable from '../components/tables/EnhancedTable';
import StatusBadge from '../components/ui/StatusBadge';
import { Button } from '../components/ui/button';
import { useNotify } from '../components/notifications/NotificationSystem';
import PageHeader from '../components/common/PageHeader';
import EmptyState from '../components/common/EmptyState';
import TaskAssignmentEngine from '../components/orchestration/TaskAssignmentEngine';
import { Modal } from '../components/ui/modal';
import BulkTaskCreator from '../components/orchestration/BulkTaskCreator';
import { Input } from '../components/ui/input';
import { Select } from '../components/ui/select';

const TaskManagement: React.FC = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState({
    status: 'all',
    priority: 'all',
    assignedTo: 'all'
  });
  const [selectedTasks, setSelectedTasks] = useState<Task[]>([]);
  const notify = useNotify();
  const [assignmentModalOpen, setAssignmentModalOpen] = useState(false);
  const [selectedTaskForAssignment, setSelectedTaskForAssignment] = useState<Task | null>(null);
  const [bulkCreateModalOpen, setBulkCreateModalOpen] = useState(false);
  const [newTaskModalOpen, setNewTaskModalOpen] = useState(false);
  const [importModalOpen, setImportModalOpen] = useState(false);

  const handleImportTasks = async (file: File) => {
    try {
      const text = await file.text();
      const lines = text.split('\n');
      const headers = lines[0].split(',').map(h => h.trim());
      
      const importedTasks = lines.slice(1)
        .filter(line => line.trim())
        .map((line, index) => {
          const values = line.split(',').map(v => v.trim().replace(/^"|"$/g, ''));
          const taskData: any = {};
          
          headers.forEach((header, i) => {
            switch (header.toLowerCase()) {
              case 'title':
                taskData.title = values[i];
                break;
              case 'description':
                taskData.description = values[i];
                break;
              case 'priority':
                taskData.priority = values[i].toLowerCase();
                break;
              case 'framework':
                taskData.framework = values[i];
                break;
              case 'control_id':
              case 'controlid':
                taskData.controlId = values[i];
                break;
              case 'estimated_hours':
              case 'estimatedhours':
                taskData.estimatedHours = parseInt(values[i]) || 0;
                break;
              case 'due_date':
              case 'duedate':
                taskData.dueDate = values[i] ? new Date(values[i]) : undefined;
                break;
              case 'tags':
                taskData.tags = values[i] ? values[i].split(';').map(t => t.trim()) : [];
                break;
            }
          });
          
          return {
            id: `imported-task-${Date.now()}-${index}`,
            taskType: 'remediation',
            status: 'draft',
            createdAt: new Date(),
            updatedAt: new Date(),
            progress: 0,
            dependencies: [],
            attachments: [],
            ...taskData
          } as Task;
        })
        .filter(task => task.title); // Only include tasks with titles
      
      setTasks(prev => [...importedTasks, ...prev]);
      setImportModalOpen(false);
      notify.success(`Imported ${importedTasks.length} tasks successfully`);
    } catch (error) {
      console.error('Failed to import tasks:', error);
      notify.error('Failed to import tasks. Please check file format.');
    }
  };

  useEffect(() => {
    loadTasks();
  }, [filter]);

  const loadTasks = async () => {
    try {
      setLoading(true);
      const filterParams = Object.fromEntries(
        Object.entries(filter).filter(([_, value]) => value !== 'all')
      );
      const tasksData = await orchestrationService.getTasks(filterParams);
      setTasks(tasksData);
    } catch (error) {
     console.warn('Backend API unavailable, using mock data:', error);
     // Gracefully fall back to mock data when API is unavailable
     setTasks(mockTasks);
     notify.info('Demo Mode', 'Using sample data for demonstration purposes.');
    } finally {
      setLoading(false);
    }
  };

  const handleTaskUpdate = async (taskId: string, updates: Partial<Task>) => {
    try {
      const updatedTask = await orchestrationService.updateTask(taskId, updates);
      setTasks(prev => prev.map(task => 
        task.id === taskId ? updatedTask : task
      ));
      notify.success('Task updated successfully');
    } catch (error) {
      console.error('Failed to update task:', error);
      notify.error('Failed to update task');
    }
  };

  const handleAssignTask = (task: Task) => {
    setSelectedTaskForAssignment(task);
    setAssignmentModalOpen(true);
  };

  const handleTaskAssigned = (updatedTask: Task) => {
    setTasks(prev => prev.map(task => 
      task.id === updatedTask.id ? updatedTask : task
    ));
    setAssignmentModalOpen(false);
    setSelectedTaskForAssignment(null);
  };

  const handleBulkStatusUpdate = async (status: string) => {
    try {
      await Promise.all(
        selectedTasks.map(task => 
          orchestrationService.updateTask(task.id, { status } as any)
        )
      );
      await loadTasks();
      setSelectedTasks([]);
      notify.success(`Updated ${selectedTasks.length} tasks`);
    } catch (error) {
      console.error('Failed to update tasks:', error);
      notify.error('Failed to update tasks');
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'critical': return 'text-red-600 bg-red-100 dark:bg-red-900/30';
      case 'high': return 'text-orange-600 bg-orange-100 dark:bg-orange-900/30';
      case 'medium': return 'text-yellow-600 bg-yellow-100 dark:bg-yellow-900/30';
      case 'low': return 'text-green-600 bg-green-100 dark:bg-green-900/30';
      default: return 'text-gray-600 bg-gray-100 dark:bg-gray-700';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed': return CheckCircle;
      case 'in_progress': return Clock;
      case 'blocked': return AlertTriangle;
      default: return CheckSquare;
    }
  };

  const columns = [
    {
      key: 'title' as keyof Task,
      header: 'Task',
      sortable: true,
      render: (value: any, task: Task) => (
        <div className="flex items-start space-x-3">
          <div className="flex-shrink-0 mt-1">
            {React.createElement(getStatusIcon(task.status), {
              className: `h-5 w-5 ${
                task.status === 'completed' ? 'text-green-500' :
                task.status === 'blocked' ? 'text-red-500' :
                'text-blue-500'
              }`
            })}
          </div>
          <div className="min-w-0 flex-1">
            <p className="text-sm font-medium text-gray-900 dark:text-white truncate">
              {task.title}
            </p>
            <div className="flex items-center space-x-2 mt-1">
              {task.framework && (
                <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300">
                  {task.framework}
                </span>
              )}
              {task.controlId && (
                <span className="text-xs text-gray-500 dark:text-gray-400">
                  {task.controlId}
                </span>
              )}
            </div>
          </div>
        </div>
      )
    },
    {
      key: 'priority' as keyof Task,
      header: 'Priority',
      sortable: true,
      render: (value: string) => (
        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getPriorityColor(value)}`}>
          {value.charAt(0).toUpperCase() + value.slice(1)}
        </span>
      )
    },
    {
      key: 'status' as keyof Task,
      header: 'Status',
      sortable: true,
      render: (value: string) => (
        <StatusBadge status={value.replace('_', '-')} size="sm" />
      )
    },
    {
      key: 'assignedTo' as keyof Task,
      header: 'Assignee',
      render: (value: string | undefined, task: Task) => (
        <div className="flex items-center space-x-2">
          {value ? (
            <>
              <div className="flex-shrink-0 h-8 w-8 bg-gray-300 dark:bg-gray-600 rounded-full flex items-center justify-center">
                <User className="h-4 w-4 text-gray-600 dark:text-gray-300" />
              </div>
              <div className="ml-2">
                <p className="text-sm text-gray-900 dark:text-white">{value}</p>
              </div>
            </>
          ) : (
            <Button
              size="sm"
              variant="outline"
              onClick={(e) => {
                e.stopPropagation();
                handleAssignTask(task);
              }}
            >
              Assign
            </Button>
          )}
        </div>
      )
    },
    {
      key: 'dueDate' as keyof Task,
      header: 'Due Date',
      sortable: true,
      formatter: 'date' as const,
      render: (value: Date | undefined) => {
        if (!value) return <span className="text-gray-500 dark:text-gray-400">—</span>;
        
        const now = new Date();
        const isOverdue = value < now;
        const daysDiff = Math.ceil((value.getTime() - now.getTime()) / (1000 * 60 * 60 * 24));
        
        return (
          <div className="text-sm">
            <div className={`${isOverdue ? 'text-red-600 dark:text-red-400' : 'text-gray-900 dark:text-white'}`}>
              {value.toLocaleDateString()}
            </div>
            {isOverdue ? (
              <div className="text-xs text-red-500">Overdue</div>
            ) : daysDiff <= 3 ? (
              <div className="text-xs text-yellow-600">Due soon</div>
            ) : null}
          </div>
        );
      }
    },
    {
      key: 'progress' as keyof Task,
      header: 'Progress',
      render: (value: number) => (
        <div className="flex items-center space-x-2">
          <div className="flex-1 bg-gray-200 dark:bg-gray-700 rounded-full h-2">
            <div 
              className="bg-blue-600 h-2 rounded-full transition-all duration-300"
              style={{ width: `${value}%` }}
            />
          </div>
          <span className="text-xs text-gray-600 dark:text-gray-400 w-10">
            {value}%
          </span>
        </div>
      )
    }
  ];

  // Mock data for demonstration
  const mockTasks: Task[] = [
    {
      id: 'task-1',
      title: 'Implement Multi-Factor Authentication',
      description: 'Deploy MFA for all privileged accounts',
      taskType: 'remediation',
      framework: 'NIST 800-171',
      controlId: 'AC-3.13',
      priority: 'critical',
      estimatedHours: 16,
      assignedTo: 'Sarah Johnson',
      status: 'in_progress',
      dueDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
      createdAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000),
      updatedAt: new Date(),
      progress: 65,
      tags: ['mfa', 'authentication', 'privileged-access'],
      dependencies: [],
      attachments: []
    },
    {
      id: 'task-2',
      title: 'Update Security Policy Documentation',
      description: 'Review and update information security policies',
      taskType: 'documentation',
      framework: 'ISO 27001',
      controlId: 'A.5.1.1',
      priority: 'high',
      estimatedHours: 12,
      assignedTo: 'Michael Chen',
      status: 'assigned',
      dueDate: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000),
      createdAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000),
      updatedAt: new Date(),
      progress: 25,
      tags: ['policy', 'documentation', 'iso27001'],
      dependencies: [],
      attachments: []
    },
    {
      id: 'task-3',
      title: 'Network Segmentation Implementation',
      description: 'Implement network segmentation controls',
      taskType: 'remediation',
      framework: 'NIST CSF',
      controlId: 'PR.AC-5',
      priority: 'medium',
      estimatedHours: 40,
      status: 'draft',
      dueDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
      createdAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000),
      updatedAt: new Date(),
      progress: 0,
      tags: ['network', 'segmentation', 'nist-csf'],
      dependencies: [],
      attachments: []
    }
  ];

  const displayTasks = tasks.length > 0 ? tasks : mockTasks;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
      <PageHeader
        title="Task Management"
        subtitle="Orchestrate compliance tasks across your organization"
        icon={CheckSquare}
        actions={
          <div className="flex items-center space-x-3">
            <Button variant="outline" size="sm">
              <Filter className="h-4 w-4 mr-2" />
              Filter
            </Button>
            <Button variant="outline" onClick={() => setImportModalOpen(true)}>
              <Upload className="h-4 w-4 mr-2" />
              Import Tasks
            </Button>
            <Button variant="outline" onClick={() => setBulkCreateModalOpen(true)}>
              <CheckSquare className="h-4 w-4 mr-2" />
              Bulk Create
            </Button>
            <Button onClick={() => setNewTaskModalOpen(true)}>
              <Plus className="h-4 w-4 mr-2" />
              New Task
            </Button>
          </div>
        }
      />

      {/* Task Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {[
          {
            title: 'Total Tasks',
            value: displayTasks.length,
            icon: CheckSquare,
            color: 'blue'
          },
          {
            title: 'In Progress',
            value: displayTasks.filter(t => t.status === 'in_progress').length,
            icon: Clock,
            color: 'orange'
          },
          {
            title: 'Completed',
            value: displayTasks.filter(t => t.status === 'completed').length,
            icon: CheckCircle,
            color: 'green'
          },
          {
            title: 'Overdue',
            value: displayTasks.filter(t => t.dueDate && t.dueDate < new Date() && t.status !== 'completed').length,
            icon: AlertTriangle,
            color: 'red'
          }
        ].map((stat, index) => (
          <motion.div
            key={stat.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
                  {stat.title}
                </p>
                <p className="text-3xl font-bold text-gray-900 dark:text-white">
                  {stat.value}
                </p>
              </div>
              <div className={`p-3 rounded-full ${
                stat.color === 'blue' ? 'bg-blue-100 dark:bg-blue-900/30' :
                stat.color === 'orange' ? 'bg-orange-100 dark:bg-orange-900/30' :
                stat.color === 'green' ? 'bg-green-100 dark:bg-green-900/30' :
                'bg-red-100 dark:bg-red-900/30'
              }`}>
                <stat.icon className={`h-8 w-8 ${
                  stat.color === 'blue' ? 'text-blue-600 dark:text-blue-400' :
                  stat.color === 'orange' ? 'text-orange-600 dark:text-orange-400' :
                  stat.color === 'green' ? 'text-green-600 dark:text-green-400' :
                  'text-red-600 dark:text-red-400'
                }`} />
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Bulk Actions */}
      {selectedTasks.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-4"
        >
          <div className="flex items-center justify-between">
            <span className="text-sm text-blue-800 dark:text-blue-200">
              {selectedTasks.length} task{selectedTasks.length > 1 ? 's' : ''} selected
            </span>
            <div className="flex items-center space-x-2">
              <Button
                size="sm"
                variant="outline"
                onClick={() => handleBulkStatusUpdate('in_progress')}
              >
                Mark In Progress
              </Button>
              <Button
                size="sm"
                variant="outline"
                onClick={() => handleBulkStatusUpdate('completed')}
              >
                Mark Completed
              </Button>
              <Button
                size="sm"
                variant="outline"
                onClick={() => setSelectedTasks([])}
              >
                Clear Selection
              </Button>
            </div>
          </div>
        </motion.div>
      )}

      {/* Tasks Table */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg">
        <EnhancedTable
          data={displayTasks}
          columns={columns}
          loading={loading}
          searchable
          filterable
          exportable
          selectable
          pagination
          pageSize={20}
          onSelectionChange={setSelectedTasks}
          onRowClick={(task) => {
            // Navigate to task detail page
            console.log('Navigate to task:', task.id);
          }}
          emptyState={{
            title: 'No tasks found',
            description: 'Create your first task to get started with orchestration',
            action: {
              label: 'Create Task',
              onClick: () => console.log('Create new task')
            }
          }}
        />
      </div>

      {/* Task Assignment Modal */}
      <Modal
        isOpen={assignmentModalOpen}
        onClose={() => {
          setAssignmentModalOpen(false);
          setSelectedTaskForAssignment(null);
        }}
        title="Assign Task"
        size="lg"
      >
        {selectedTaskForAssignment && (
          <TaskAssignmentEngine
            task={selectedTaskForAssignment}
            onAssigned={handleTaskAssigned}
            onClose={() => {
              setAssignmentModalOpen(false);
              setSelectedTaskForAssignment(null);
            }}
          />
        )}
      </Modal>

      {/* Bulk Task Creation Modal */}
      <Modal
        isOpen={bulkCreateModalOpen}
        onClose={() => setBulkCreateModalOpen(false)}
        title="Bulk Task Creation"
        size="xl"
      >
        <BulkTaskCreator
          onTasksCreated={(tasks) => {
            setTasks(prev => [...tasks, ...prev]);
            setBulkCreateModalOpen(false);
            notify.success(`Created ${tasks.length} tasks successfully`);
          }}
          onClose={() => setBulkCreateModalOpen(false)}
        />
      </Modal>

      {/* Import Tasks Modal */}
      <Modal
        isOpen={importModalOpen}
        onClose={() => setImportModalOpen(false)}
        title="Import Tasks"
        size="md"
      >
        <TaskImportForm
          onSubmit={handleImportTasks}
          onCancel={() => setImportModalOpen(false)}
        />
      </Modal>

      {/* New Task Modal */}
      <Modal
        isOpen={newTaskModalOpen}
        onClose={() => setNewTaskModalOpen(false)}
        title="Create New Task"
        size="lg"
      >
        <NewTaskForm
          onSubmit={(taskData) => {
            // Add the new task to the list
            const newTask = {
              id: `task-${Date.now()}`,
              ...taskData,
              status: 'draft',
              createdAt: new Date(),
              updatedAt: new Date(),
              progress: 0,
              dependencies: [],
              attachments: []
            } as Task;
            setTasks(prev => [newTask, ...prev]);
            setNewTaskModalOpen(false);
            notify.success('Task created successfully');
          }}
          onCancel={() => setNewTaskModalOpen(false)}
        />
      </Modal>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Link to="/orchestration/bulk-create">
          <motion.div
            whileHover={{ scale: 1.02 }}
            className="bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-900/20 dark:to-blue-800/20 rounded-lg p-6 border border-blue-200 dark:border-blue-800 cursor-pointer"
          >
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-semibold text-blue-900 dark:text-blue-100">
                Bulk Task Creation
              </h3>
              <CheckSquare className="h-6 w-6 text-blue-600" />
            </div>
            <p className="text-sm text-blue-700 dark:text-blue-300">
              Create multiple tasks from assessment gaps
            </p>
          </motion.div>
        </Link>

        <Link to="/orchestration/timelines">
          <motion.div
            whileHover={{ scale: 1.02 }}
            className="bg-gradient-to-br from-purple-50 to-purple-100 dark:from-purple-900/20 dark:to-purple-800/20 rounded-lg p-6 border border-purple-200 dark:border-purple-800 cursor-pointer"
          >
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-semibold text-purple-900 dark:text-purple-100">
                Timeline Management
              </h3>
              <Calendar className="h-6 w-6 text-purple-600" />
            </div>
            <p className="text-sm text-purple-700 dark:text-purple-300">
              Manage project timelines and milestones
            </p>
          </motion.div>
        </Link>

        <Link to="/orchestration/evidence">
          <motion.div
            whileHover={{ scale: 1.02 }}
            className="bg-gradient-to-br from-green-50 to-green-100 dark:from-green-900/20 dark:to-green-800/20 rounded-lg p-6 border border-green-200 dark:border-green-800 cursor-pointer"
          >
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-semibold text-green-900 dark:text-green-100">
                Evidence Vault
              </h3>
              <MessageSquare className="h-6 w-6 text-green-600" />
            </div>
            <p className="text-sm text-green-700 dark:text-green-300">
              Manage compliance evidence and validation
            </p>
          </motion.div>
        </Link>
      </div>
    </div>
  );
};

// Task Import Form Component
const TaskImportForm: React.FC<{
  onSubmit: (file: File) => void;
  onCancel: () => void;
}> = ({ onSubmit, onCancel }) => {
  const [file, setFile] = useState<File | null>(null);
  const [dragActive, setDragActive] = useState(false);

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      setFile(e.dataTransfer.files[0]);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (file) {
      onSubmit(file);
    }
  };

  const downloadTemplate = () => {
    const csvContent = [
      'title,description,priority,framework,control_id,estimated_hours,due_date,tags',
      'Example Task,Task description,high,NIST 800-171,AC-3.13,8,2024-12-31,security;compliance',
      'Another Task,Another description,medium,ISO 27001,A.9.2.1,16,2024-11-30,access;control'
    ].join('\n');
    
    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'task-import-template.csv';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <h4 className="text-sm font-medium text-gray-900 dark:text-white mb-2">
          Import Tasks from CSV
        </h4>
        <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
          Upload a CSV file with task data. Use our template for the correct format.
        </p>
        
        <div className="mb-4">
          <Button type="button" variant="outline" size="sm" onClick={downloadTemplate}>
            <Download className="h-4 w-4 mr-2" />
            Download Template
          </Button>
        </div>
      </div>

      <div
        className={`border-2 border-dashed rounded-lg p-8 text-center transition-colors ${
          dragActive 
            ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20' 
            : 'border-gray-300 dark:border-gray-600 hover:border-blue-400'
        }`}
        onDragEnter={handleDrag}
        onDragLeave={handleDrag}
        onDragOver={handleDrag}
        onDrop={handleDrop}
      >
        {file ? (
          <div>
            <FileText className="h-12 w-12 text-green-600 mx-auto mb-4" />
            <p className="text-sm font-medium text-gray-900 dark:text-white">
              {file.name}
            </p>
            <p className="text-xs text-gray-500 dark:text-gray-400">
              {(file.size / 1024).toFixed(1)} KB
            </p>
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={() => setFile(null)}
              className="mt-2"
            >
              Remove
            </Button>
          </div>
        ) : (
          <div>
            <Upload className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
              Drag and drop your CSV file here, or
            </p>
            <label className="cursor-pointer">
              <span className="text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 font-medium">
                browse to upload
              </span>
              <input
                type="file"
                accept=".csv"
                onChange={(e) => setFile(e.target.files?.[0] || null)}
                className="hidden"
              />
            </label>
          </div>
        )}
      </div>

      <div className="text-xs text-gray-500 dark:text-gray-400">
        <p className="mb-1"><strong>Supported columns:</strong></p>
        <p>title, description, priority, framework, control_id, estimated_hours, due_date, tags</p>
        <p className="mt-2"><strong>Note:</strong> Tags should be separated by semicolons (;)</p>
      </div>

      <div className="flex justify-end space-x-3 pt-4">
        <Button variant="outline" onClick={onCancel}>
          Cancel
        </Button>
        <Button type="submit" disabled={!file}>
          Import Tasks
        </Button>
      </div>
    </form>
  );
};

// New Task Form Component
const NewTaskForm: React.FC<{
  onSubmit: (taskData: any) => void;
  onCancel: () => void;
}> = ({ onSubmit, onCancel }) => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    taskType: 'remediation',
    framework: '',
    controlId: '',
    priority: 'medium',
    estimatedHours: 0,
    dueDate: '',
    tags: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.title.trim()) {
      alert('Please enter a task title');
      return;
    }

    const taskData = {
      ...formData,
      estimatedHours: formData.estimatedHours || undefined,
      dueDate: formData.dueDate ? new Date(formData.dueDate) : undefined,
      tags: formData.tags.split(',').map(t => t.trim()).filter(t => t.length > 0)
    };

    onSubmit(taskData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <Input
        label="Task Title"
        value={formData.title}
        onChange={(e) => setFormData({...formData, title: e.target.value})}
        placeholder="Enter task title"
        required
      />
      
      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
          Description
        </label>
        <textarea
          value={formData.description}
          onChange={(e) => setFormData({...formData, description: e.target.value})}
          placeholder="Enter task description"
          rows={3}
          className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Select
          label="Task Type"
          value={formData.taskType}
          onChange={(e) => setFormData({...formData, taskType: e.target.value})}
          options={[
            { value: 'remediation', label: 'Remediation' },
            { value: 'evidence', label: 'Evidence Collection' },
            { value: 'review', label: 'Review & Approval' }
          ]}
          required
        />
        
        <Select
          label="Priority"
          value={formData.priority}
          onChange={(e) => setFormData({...formData, priority: e.target.value})}
          options={[
            { value: 'low', label: 'Low' },
            { value: 'medium', label: 'Medium' },
            { value: 'high', label: 'High' },
            { value: 'critical', label: 'Critical' }
          ]}
          required
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Input
          label="Framework (Optional)"
          value={formData.framework}
          onChange={(e) => setFormData({...formData, framework: e.target.value})}
          placeholder="e.g., NIST 800-171"
        />
        
        <Input
          label="Control ID (Optional)"
          value={formData.controlId}
          onChange={(e) => setFormData({...formData, controlId: e.target.value})}
          placeholder="e.g., AC-3.13"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Input
          label="Estimated Hours (Optional)"
          type="number"
          value={formData.estimatedHours}
          onChange={(e) => setFormData({...formData, estimatedHours: parseInt(e.target.value) || 0})}
          min="0"
          max="999"
        />
        
        <Input
          label="Due Date (Optional)"
          type="date"
          value={formData.dueDate}
          onChange={(e) => setFormData({...formData, dueDate: e.target.value})}
        />
      </div>

      <Input
        label="Tags (Optional)"
        value={formData.tags}
        onChange={(e) => setFormData({...formData, tags: e.target.value})}
        placeholder="mfa, authentication, compliance (comma-separated)"
        helperText="Separate multiple tags with commas"
      />

      <div className="flex justify-end space-x-3 pt-4">
        <Button variant="outline" onClick={onCancel}>
          Cancel
        </Button>
        <Button type="submit">
          Create Task
        </Button>
      </div>
    </form>
  );
};

export default TaskManagement;