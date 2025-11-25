import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Plus,
  Filter,
  Calendar,
  User,
  AlertTriangle,
  CheckCircle,
  Clock,
  FileText,
  Shield,
  Target,
  Users,
  Search,
  Download,
  Upload,
  Settings,
  TrendingUp,
  GitBranch,
  Bell,
  Eye,
  MoreHorizontal,
  ChevronDown,
  ChevronRight,
  BarChart3,
  PieChart,
  Activity,
  Workflow,
  Grid,
  List,
  Play,
  ArrowRight,
  Edit,
  Trash2,
  Copy,
  Send,
  Archive
} from 'lucide-react';
import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  BarChart,
  Bar,
  PieChart as RechartsPieChart,
  Pie,
  Cell
} from 'recharts';
import { useGovernanceStore } from '../../stores/governanceStore';
import { GovernanceItem, User as UserType } from '../../types/cybersoluce';
import { formatDate, formatRelativeTime } from '../../utils/formatters';
import EnhancedTable from '../tables/EnhancedTable';
import { Button } from '../ui/button';
import { Modal } from '../ui/modal';
import { Badge } from '../ui/badge';
import { Progress } from '../ui/progress';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '../ui/tabs';
import FormField from '../forms/FormField';
import useForm from '../../hooks/useForm';

const GovernanceOrchestrator: React.FC = () => {
  const {
    governanceItems,
    addGovernanceItem,
    updateGovernanceItem,
    deleteGovernanceItem,
    frameworks
  } = useGovernanceStore();

  // State management
  const [activeView, setActiveView] = useState<'overview' | 'workflows' | 'tasks' | 'risks' | 'analytics'>('overview');
  const [viewMode, setViewMode] = useState<'kanban' | 'list' | 'calendar' | 'timeline'>('kanban');
  const [filterType, setFilterType] = useState<'all' | 'risk' | 'policy' | 'task' | 'evidence'>('all');
  const [filterStatus, setFilterStatus] = useState<'all' | 'pending' | 'in-progress' | 'completed' | 'overdue'>('all');
  const [filterPriority, setFilterPriority] = useState<'all' | 'critical' | 'high' | 'medium' | 'low'>('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedItems, setSelectedItems] = useState<string[]>([]);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showWorkflowDesigner, setShowWorkflowDesigner] = useState(false);
  const [workflowTemplates, setWorkflowTemplates] = useState([
    {
      id: 'compliance-review',
      name: 'Compliance Review Workflow',
      description: 'Standard compliance review process with stakeholder approvals',
      steps: [
        'Initial Assessment',
        'Stakeholder Review',
        'Control Validation',
        'Final Approval'
      ],
      estimatedDuration: '2-3 weeks',
      complexity: 'Medium'
    },
    {
      id: 'risk-assessment',
      name: 'Risk Assessment Workflow',
      description: 'Comprehensive risk identification and mitigation planning',
      steps: [
        'Risk Identification',
        'Impact Analysis',
        'Mitigation Planning',
        'Implementation Tracking'
      ],
      estimatedDuration: '3-4 weeks',
      complexity: 'High'
    },
    {
      id: 'policy-update',
      name: 'Policy Update Workflow',
      description: 'Structured policy review and update process',
      steps: [
        'Draft Review',
        'Legal Review',
        'Stakeholder Approval',
        'Publication'
      ],
      estimatedDuration: '1-2 weeks',
      complexity: 'Low'
    }
  ]);

  // Mock users for assignment
  const teamMembers: UserType[] = [
    { id: 'user-1', firstName: 'Sarah', lastName: 'Chen', email: 'sarah.chen@company.com', role: 'executive', department: 'Security' },
    { id: 'user-2', firstName: 'Michael', lastName: 'Rodriguez', email: 'michael.rodriguez@company.com', role: 'manager', department: 'IT' },
    { id: 'user-3', firstName: 'Emma', lastName: 'Thompson', email: 'emma.thompson@company.com', role: 'analyst', department: 'Compliance' },
    { id: 'user-4', firstName: 'David', lastName: 'Kim', email: 'david.kim@company.com', role: 'auditor', department: 'Risk' }
  ];

  // Form for creating new governance items
  const {
    values: formValues,
    errors: formErrors,
    isSubmitting,
    setValue: setFormValue,
    handleSubmit: handleFormSubmit,
    reset: resetForm
  } = useForm({
    initialValues: {
      title: '',
      description: '',
      type: 'task',
      priority: 'medium',
      assigneeId: '',
      dueDate: '',
      frameworks: [],
      tags: ''
    },
    validationSchema: {
      title: { required: true, minLength: 3 },
      description: { required: true, minLength: 10 },
      type: { required: true },
      priority: { required: true },
      assigneeId: { required: true },
      dueDate: { required: true }
    },
    onSubmit: async (data) => {
      const assignee = teamMembers.find(m => m.id === data.assigneeId);
      if (!assignee) return;

      const newItem: Omit<GovernanceItem, 'id' | 'createdDate' | 'lastModified'> = {
        title: data.title,
        description: data.description,
        type: data.type as any,
        status: 'pending',
        priority: data.priority as any,
        assignee,
        dueDate: new Date(data.dueDate),
        framework: Array.isArray(data.frameworks) ? data.frameworks : [],
        tags: data.tags ? data.tags.split(',').map(t => t.trim()) : [],
        attachments: []
      };

      addGovernanceItem(newItem);
      setShowCreateModal(false);
      resetForm();
    }
  });

  // Enhanced filtering with multiple criteria
  const filteredItems = governanceItems.filter(item => {
    const matchesType = filterType === 'all' || item.type === filterType;
    const matchesStatus = filterStatus === 'all' || item.status === filterStatus;
    const matchesPriority = filterPriority === 'all' || item.priority === filterPriority;
    const matchesSearch = searchTerm === '' || 
      item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.assignee.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.assignee.lastName.toLowerCase().includes(searchTerm.toLowerCase());
    
    return matchesType && matchesStatus && matchesPriority && matchesSearch;
  });

  // Analytics calculations
  const analytics = {
    total: governanceItems.length,
    completed: governanceItems.filter(item => item.status === 'completed').length,
    inProgress: governanceItems.filter(item => item.status === 'in-progress').length,
    overdue: governanceItems.filter(item => 
      item.status !== 'completed' && new Date(item.dueDate) < new Date()
    ).length,
    byType: {
      risk: governanceItems.filter(item => item.type === 'risk').length,
      policy: governanceItems.filter(item => item.type === 'policy').length,
      task: governanceItems.filter(item => item.type === 'task').length,
      evidence: governanceItems.filter(item => item.type === 'evidence').length
    },
    byPriority: {
      critical: governanceItems.filter(item => item.priority === 'critical').length,
      high: governanceItems.filter(item => item.priority === 'high').length,
      medium: governanceItems.filter(item => item.priority === 'medium').length,
      low: governanceItems.filter(item => item.priority === 'low').length
    }
  };

  // Mock trend data for analytics
  const trendData = [
    { month: 'Jan', completed: 12, created: 15, overdue: 2 },
    { month: 'Feb', completed: 18, created: 22, overdue: 1 },
    { month: 'Mar', completed: 25, created: 20, overdue: 3 },
    { month: 'Apr', completed: 30, created: 25, overdue: 2 },
    { month: 'May', completed: 28, created: 30, overdue: 4 },
    { month: 'Jun', completed: 35, created: 28, overdue: 1 }
  ];

  // Group items by status for Kanban view
  const groupedItems = {
    pending: filteredItems.filter(item => item.status === 'pending'),
    'in-progress': filteredItems.filter(item => item.status === 'in-progress'),
    completed: filteredItems.filter(item => item.status === 'completed'),
    overdue: filteredItems.filter(item => 
      item.status !== 'completed' && new Date(item.dueDate) < new Date()
    )
  };

  // Get icon for governance item type
  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'risk': return AlertTriangle;
      case 'policy': return FileText;
      case 'task': return CheckCircle;
      case 'evidence': return Shield;
      default: return FileText;
    }
  };

  // Get color for priority
  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'critical': return 'border-l-red-500 bg-red-50 dark:bg-red-900/20';
      case 'high': return 'border-l-orange-500 bg-orange-50 dark:bg-orange-900/20';
      case 'medium': return 'border-l-yellow-500 bg-yellow-50 dark:bg-yellow-900/20';
      case 'low': return 'border-l-green-500 bg-green-50 dark:bg-green-900/20';
      default: return 'border-l-gray-500 bg-gray-50 dark:bg-gray-900/20';
    }
  };

  // Get status color
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'text-green-600 bg-green-100 dark:bg-green-900/30';
      case 'in-progress': return 'text-blue-600 bg-blue-100 dark:bg-blue-900/30';
      case 'pending': return 'text-gray-600 bg-gray-100 dark:bg-gray-700';
      case 'overdue': return 'text-red-600 bg-red-100 dark:bg-red-900/30';
      default: return 'text-gray-600 bg-gray-100 dark:bg-gray-700';
    }
  };

  // Handle bulk actions
  const handleBulkAction = (action: string) => {
    switch (action) {
      case 'delete':
        selectedItems.forEach(id => deleteGovernanceItem(id));
        setSelectedItems([]);
        break;
      case 'complete':
        selectedItems.forEach(id => 
          updateGovernanceItem(id, { status: 'completed' })
        );
        setSelectedItems([]);
        break;
      case 'export':
        console.log('Exporting selected items:', selectedItems);
        break;
    }
  };

  // Table columns for list view
  const tableColumns = [
    {
      key: 'title',
      header: 'Title',
      sortable: true,
      render: (value: string, row: GovernanceItem) => {
        const Icon = getTypeIcon(row.type);
        return (
          <div className="flex items-center">
            <Icon className="h-5 w-5 text-gray-400 mr-3" />
            <div>
              <div className="font-medium text-gray-900 dark:text-white">{value}</div>
              <div className="text-sm text-gray-500 dark:text-gray-400 capitalize">{row.type}</div>
            </div>
          </div>
        );
      }
    },
    {
      key: 'priority',
      header: 'Priority',
      sortable: true,
      render: (value: string) => (
        <Badge variant={
          value === 'critical' ? 'destructive' :
          value === 'high' ? 'warning' :
          value === 'medium' ? 'default' : 'secondary'
        }>
          {value}
        </Badge>
      )
    },
    {
      key: 'status',
      header: 'Status',
      sortable: true,
      render: (value: string) => (
        <Badge variant={
          value === 'completed' ? 'success' :
          value === 'in-progress' ? 'info' :
          value === 'overdue' ? 'destructive' : 'secondary'
        }>
          {value.replace('-', ' ')}
        </Badge>
      )
    },
    {
      key: 'assignee',
      header: 'Assignee',
      render: (assignee: UserType) => (
        <div className="flex items-center">
          <div className="h-8 w-8 rounded-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center mr-2">
            <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
              {assignee.firstName[0]}{assignee.lastName[0]}
            </span>
          </div>
          <span className="text-sm text-gray-900 dark:text-white">
            {assignee.firstName} {assignee.lastName}
          </span>
        </div>
      )
    },
    {
      key: 'dueDate',
      header: 'Due Date',
      sortable: true,
      formatter: 'date' as const,
      render: (value: Date, row: GovernanceItem) => {
        const isOverdue = new Date(value) < new Date() && row.status !== 'completed';
        return (
          <div className={isOverdue ? 'text-red-600' : 'text-gray-900 dark:text-white'}>
            <div className="text-sm">{formatDate(value)}</div>
            <div className="text-xs text-gray-500">{formatRelativeTime(value)}</div>
          </div>
        );
      }
    }
  ];

  // Colors for charts
  const chartColors = ['#005B96', '#33A1DE', '#10B981', '#F59E0B', '#EF4444'];

  return (
    <div className="space-y-6">
      {/* Enhanced Header */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
            Governance Orchestration
          </h1>
          <p className="text-gray-600 dark:text-gray-300 mt-1">
            Coordinate cybersecurity governance activities across your organization
          </p>
        </div>
        
        <div className="flex items-center space-x-3">
          <Button variant="outline" size="sm">
            <Upload className="h-4 w-4 mr-2" />
            Import
          </Button>
          <Button variant="outline" size="sm">
            <Download className="h-4 w-4 mr-2" />
            Export
          </Button>
          <Button 
            onClick={() => setShowWorkflowDesigner(true)}
            variant="outline"
          >
            <Workflow className="h-4 w-4 mr-2" />
            Workflow Designer
          </Button>
          <Button 
            onClick={() => setShowCreateModal(true)}
            className="bg-command-blue-600 hover:bg-command-blue-700"
          >
            <Plus className="h-4 w-4 mr-2" />
            New Item
          </Button>
        </div>
      </div>

      {/* Navigation Tabs */}
      <Tabs value={activeView} onValueChange={(value) => setActiveView(value as any)}>
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="workflows">Workflows</TabsTrigger>
          <TabsTrigger value="tasks">Tasks</TabsTrigger>
          <TabsTrigger value="risks">Risks</TabsTrigger>
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
        </TabsList>

        {/* Overview Tab */}
        <TabsContent value="overview" className="space-y-6">
          {/* Metrics Dashboard */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6"
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Total Items</p>
                  <p className="text-3xl font-bold text-command-blue-600">{analytics.total}</p>
                  <p className="text-xs text-gray-500 mt-1">Active governance items</p>
                </div>
                <div className="bg-command-blue-100 dark:bg-command-blue-900/30 p-3 rounded-full">
                  <Workflow className="h-8 w-8 text-command-blue-600" />
                </div>
              </div>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6"
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600 dark:text-gray-400">In Progress</p>
                  <p className="text-3xl font-bold text-blue-600">{analytics.inProgress}</p>
                  <p className="text-xs text-blue-500 mt-1">
                    {analytics.total > 0 ? Math.round((analytics.inProgress / analytics.total) * 100) : 0}% of total
                  </p>
                </div>
                <div className="bg-blue-100 dark:bg-blue-900/30 p-3 rounded-full">
                  <Clock className="h-8 w-8 text-blue-600" />
                </div>
              </div>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6"
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Completed</p>
                  <p className="text-3xl font-bold text-green-600">{analytics.completed}</p>
                  <p className="text-xs text-green-500 mt-1">
                    {analytics.total > 0 ? Math.round((analytics.completed / analytics.total) * 100) : 0}% completion rate
                  </p>
                </div>
                <div className="bg-green-100 dark:bg-green-900/30 p-3 rounded-full">
                  <CheckCircle className="h-8 w-8 text-green-600" />
                </div>
              </div>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6"
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Overdue</p>
                  <p className="text-3xl font-bold text-red-600">{analytics.overdue}</p>
                  <p className="text-xs text-red-500 mt-1">Require immediate attention</p>
                </div>
                <div className="bg-red-100 dark:bg-red-900/30 p-3 rounded-full">
                  <AlertTriangle className="h-8 w-8 text-red-600" />
                </div>
              </div>
            </motion.div>
          </div>

          {/* Advanced Filters and View Controls */}
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-4">
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
              <div className="flex flex-wrap items-center gap-4">
                {/* Search */}
                <div className="relative">
                  <Search className="h-4 w-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Search governance items..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-800 text-sm w-64"
                  />
                </div>
                
                {/* Filters */}
                <select
                  value={filterType}
                  onChange={(e) => setFilterType(e.target.value as any)}
                  className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-800 text-sm"
                >
                  <option value="all">All Types</option>
                  <option value="risk">Risks</option>
                  <option value="policy">Policies</option>
                  <option value="task">Tasks</option>
                  <option value="evidence">Evidence</option>
                </select>
                
                <select
                  value={filterStatus}
                  onChange={(e) => setFilterStatus(e.target.value as any)}
                  className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-800 text-sm"
                >
                  <option value="all">All Status</option>
                  <option value="pending">Pending</option>
                  <option value="in-progress">In Progress</option>
                  <option value="completed">Completed</option>
                  <option value="overdue">Overdue</option>
                </select>

                <select
                  value={filterPriority}
                  onChange={(e) => setFilterPriority(e.target.value as any)}
                  className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-800 text-sm"
                >
                  <option value="all">All Priorities</option>
                  <option value="critical">Critical</option>
                  <option value="high">High</option>
                  <option value="medium">Medium</option>
                  <option value="low">Low</option>
                </select>
              </div>
              
              {/* View Mode and Bulk Actions */}
              <div className="flex items-center space-x-2">
                {selectedItems.length > 0 && (
                  <div className="flex items-center space-x-2 mr-4">
                    <span className="text-sm text-gray-600 dark:text-gray-400">
                      {selectedItems.length} selected
                    </span>
                    <Button variant="outline" size="sm" onClick={() => handleBulkAction('complete')}>
                      Mark Complete
                    </Button>
                    <Button variant="outline" size="sm" onClick={() => handleBulkAction('export')}>
                      Export
                    </Button>
                    <Button variant="destructive" size="sm" onClick={() => handleBulkAction('delete')}>
                      Delete
                    </Button>
                  </div>
                )}
                
                <div className="flex items-center space-x-1 bg-gray-100 dark:bg-gray-700 rounded-lg p-1">
                  <button
                    onClick={() => setViewMode('kanban')}
                    className={`p-2 rounded ${viewMode === 'kanban' ? 'bg-white dark:bg-gray-600 shadow' : ''}`}
                  >
                    <Grid className="h-4 w-4" />
                  </button>
                  <button
                    onClick={() => setViewMode('list')}
                    className={`p-2 rounded ${viewMode === 'list' ? 'bg-white dark:bg-gray-600 shadow' : ''}`}
                  >
                    <List className="h-4 w-4" />
                  </button>
                  <button
                    onClick={() => setViewMode('timeline')}
                    className={`p-2 rounded ${viewMode === 'timeline' ? 'bg-white dark:bg-gray-600 shadow' : ''}`}
                  >
                    <Activity className="h-4 w-4" />
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Main Content View */}
          {viewMode === 'kanban' && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {Object.entries(groupedItems).map(([status, items]) => (
                <div key={status} className="bg-gray-50 dark:bg-gray-900 rounded-lg p-4">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="font-semibold text-gray-900 dark:text-white capitalize">
                      {status.replace('-', ' ')}
                    </h3>
                    <Badge variant="secondary">{items.length}</Badge>
                  </div>
                  
                  <div className="space-y-3 max-h-96 overflow-y-auto">
                    {items.map((item) => {
                      const Icon = getTypeIcon(item.type);
                      const isOverdue = new Date(item.dueDate) < new Date() && item.status !== 'completed';
                      
                      return (
                        <motion.div
                          key={item.id}
                          whileHover={{ scale: 1.02 }}
                          className={`bg-white dark:bg-gray-800 rounded-lg p-4 border-l-4 ${getPriorityColor(item.priority)} shadow-sm cursor-pointer`}
                        >
                          <div className="flex items-start justify-between mb-2">
                            <div className="flex items-center">
                              <input
                                type="checkbox"
                                checked={selectedItems.includes(item.id)}
                                onChange={(e) => {
                                  if (e.target.checked) {
                                    setSelectedItems([...selectedItems, item.id]);
                                  } else {
                                    setSelectedItems(selectedItems.filter(id => id !== item.id));
                                  }
                                }}
                                className="mr-2"
                              />
                              <Icon className="h-4 w-4 mr-2 text-gray-600 dark:text-gray-400" />
                              <span className="text-xs text-gray-500 dark:text-gray-400 uppercase tracking-wide">
                                {item.type}
                              </span>
                            </div>
                            <Badge variant={
                              item.priority === 'critical' ? 'destructive' :
                              item.priority === 'high' ? 'warning' :
                              item.priority === 'medium' ? 'default' : 'success'
                            } size="sm">
                              {item.priority}
                            </Badge>
                          </div>
                          
                          <h4 className="font-medium text-gray-900 dark:text-white text-sm mb-2">
                            {item.title}
                          </h4>
                          
                          <p className="text-xs text-gray-600 dark:text-gray-400 mb-3 line-clamp-2">
                            {item.description}
                          </p>
                          
                          <div className="flex items-center justify-between text-xs mb-3">
                            <div className="flex items-center text-gray-500 dark:text-gray-400">
                              <User className="h-3 w-3 mr-1" />
                              {item.assignee.firstName}
                            </div>
                            <div className={`flex items-center ${isOverdue ? 'text-red-500' : 'text-gray-500 dark:text-gray-400'}`}>
                              <Calendar className="h-3 w-3 mr-1" />
                              {formatDate(item.dueDate)}
                            </div>
                          </div>
                          
                          {/* Framework tags */}
                          <div className="flex flex-wrap gap-1 mb-3">
                            {item.framework.slice(0, 2).map((fw) => (
                              <Badge key={fw} variant="outline" size="sm">
                                {fw.toUpperCase()}
                              </Badge>
                            ))}
                            {item.framework.length > 2 && (
                              <Badge variant="outline" size="sm">
                                +{item.framework.length - 2}
                              </Badge>
                            )}
                          </div>

                          {/* Action buttons */}
                          <div className="flex items-center justify-between">
                            <div className="flex space-x-1">
                              <button className="p-1 hover:bg-gray-100 dark:hover:bg-gray-700 rounded">
                                <Edit className="h-3 w-3 text-gray-400" />
                              </button>
                              <button className="p-1 hover:bg-gray-100 dark:hover:bg-gray-700 rounded">
                                <Copy className="h-3 w-3 text-gray-400" />
                              </button>
                              <button className="p-1 hover:bg-gray-100 dark:hover:bg-gray-700 rounded">
                                <Send className="h-3 w-3 text-gray-400" />
                              </button>
                            </div>
                            <button className="p-1 hover:bg-gray-100 dark:hover:bg-gray-700 rounded">
                              <MoreHorizontal className="h-3 w-3 text-gray-400" />
                            </button>
                          </div>
                        </motion.div>
                      );
                    })}
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* List View */}
          {viewMode === 'list' && (
            <EnhancedTable
              data={filteredItems}
              columns={tableColumns}
              searchable={false}
              selectable={true}
              exportable={true}
              pagination={true}
              pageSize={10}
              onSelectionChange={(rows) => setSelectedItems(rows.map(r => r.id))}
              emptyState={{
                title: 'No governance items found',
                description: 'Create your first governance item to get started',
                action: {
                  label: 'Create Item',
                  onClick: () => setShowCreateModal(true)
                }
              }}
            />
          )}

          {/* Timeline View */}
          {viewMode === 'timeline' && (
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-6">
                Governance Timeline
              </h3>
              <div className="space-y-8">
                {filteredItems
                  .sort((a, b) => new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime())
                  .map((item, index) => {
                    const Icon = getTypeIcon(item.type);
                    const isOverdue = new Date(item.dueDate) < new Date() && item.status !== 'completed';
                    
                    return (
                      <div key={item.id} className="flex items-start">
                        <div className="flex flex-col items-center mr-4">
                          <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                            item.status === 'completed' ? 'bg-green-100 dark:bg-green-900/30' :
                            isOverdue ? 'bg-red-100 dark:bg-red-900/30' :
                            'bg-blue-100 dark:bg-blue-900/30'
                          }`}>
                            <Icon className={`h-5 w-5 ${
                              item.status === 'completed' ? 'text-green-600' :
                              isOverdue ? 'text-red-600' :
                              'text-blue-600'
                            }`} />
                          </div>
                          {index < filteredItems.length - 1 && (
                            <div className="w-px h-16 bg-gray-300 dark:bg-gray-600 mt-2" />
                          )}
                        </div>
                        
                        <div className="flex-1 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-4">
                          <div className="flex items-start justify-between">
                            <div className="flex-1">
                              <div className="flex items-center space-x-2 mb-2">
                                <h4 className="font-medium text-gray-900 dark:text-white">{item.title}</h4>
                                <Badge variant={
                                  item.priority === 'critical' ? 'destructive' :
                                  item.priority === 'high' ? 'warning' :
                                  'default'
                                } size="sm">
                                  {item.priority}
                                </Badge>
                              </div>
                              <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                                {item.description}
                              </p>
                              <div className="flex items-center space-x-4 text-xs text-gray-500 dark:text-gray-400">
                                <span>Assigned to: {item.assignee.firstName} {item.assignee.lastName}</span>
                                <span className={isOverdue ? 'text-red-500' : ''}>
                                  Due: {formatDate(item.dueDate)}
                                </span>
                              </div>
                            </div>
                            <Badge variant={
                              item.status === 'completed' ? 'success' :
                              item.status === 'in-progress' ? 'info' :
                              isOverdue ? 'destructive' : 'secondary'
                            }>
                              {item.status.replace('-', ' ')}
                            </Badge>
                          </div>
                        </div>
                      </div>
                    );
                  })}
              </div>
            </div>
          )}
        </TabsContent>

        {/* Workflows Tab */}
        <TabsContent value="workflows" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {workflowTemplates.map((template) => (
              <motion.div
                key={template.id}
                whileHover={{ scale: 1.02 }}
                className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 border border-gray-200 dark:border-gray-700"
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="bg-purple-100 dark:bg-purple-900/30 p-3 rounded-lg">
                    <Workflow className="h-6 w-6 text-purple-600" />
                  </div>
                  <Badge variant="info" size="sm">{template.complexity}</Badge>
                </div>
                
                <h3 className="font-semibold text-gray-900 dark:text-white mb-2">
                  {template.name}
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                  {template.description}
                </p>
                
                <div className="space-y-2 mb-4">
                  <div className="text-xs text-gray-500 dark:text-gray-400">Duration: {template.estimatedDuration}</div>
                  <div className="text-xs text-gray-500 dark:text-gray-400">Steps: {template.steps.length}</div>
                </div>
                
                <div className="space-y-2 mb-4">
                  {template.steps.map((step, index) => (
                    <div key={index} className="flex items-center text-xs text-gray-600 dark:text-gray-400">
                      <div className="w-4 h-4 rounded-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center mr-2">
                        <span className="text-xs">{index + 1}</span>
                      </div>
                      {step}
                    </div>
                  ))}
                </div>
                
                <Button className="w-full" size="sm">
                  Use Template
                </Button>
              </motion.div>
            ))}
          </div>
        </TabsContent>

        {/* Analytics Tab */}
        <TabsContent value="analytics" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Completion Trends */}
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                Completion Trends
              </h3>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={trendData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                  <XAxis dataKey="month" stroke="#6B7280" />
                  <YAxis stroke="#6B7280" />
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: '#1F2937',
                      border: '1px solid #374151',
                      borderRadius: '8px'
                    }}
                  />
                  <Line type="monotone" dataKey="completed" stroke="#10B981" strokeWidth={2} name="Completed" />
                  <Line type="monotone" dataKey="created" stroke="#3B82F6" strokeWidth={2} name="Created" />
                  <Line type="monotone" dataKey="overdue" stroke="#EF4444" strokeWidth={2} name="Overdue" />
                </LineChart>
              </ResponsiveContainer>
            </div>

            {/* Item Distribution */}
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                Item Distribution by Type
              </h3>
              <ResponsiveContainer width="100%" height={300}>
                <RechartsPieChart>
                  <Pie
                    data={Object.entries(analytics.byType).map(([type, count]) => ({ type, count }))}
                    cx="50%"
                    cy="50%"
                    outerRadius={100}
                    dataKey="count"
                    label={({ type, count }) => `${type}: ${count}`}
                  >
                    {Object.entries(analytics.byType).map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={chartColors[index]} />
                    ))}
                  </Pie>
                  <Tooltip />
                </RechartsPieChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Performance Metrics */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
              <h4 className="font-medium text-gray-900 dark:text-white mb-4">Team Performance</h4>
              <div className="space-y-4">
                {teamMembers.map((member) => {
                  const memberItems = governanceItems.filter(item => item.assignee.id === member.id);
                  const completedItems = memberItems.filter(item => item.status === 'completed');
                  const completionRate = memberItems.length > 0 ? (completedItems.length / memberItems.length) * 100 : 0;
                  
                  return (
                    <div key={member.id} className="space-y-2">
                      <div className="flex justify-between">
                        <span className="text-sm text-gray-700 dark:text-gray-300">
                          {member.firstName} {member.lastName}
                        </span>
                        <span className="text-sm text-gray-500 dark:text-gray-400">
                          {completedItems.length}/{memberItems.length}
                        </span>
                      </div>
                      <Progress value={completionRate} color="success" />
                    </div>
                  );
                })}
              </div>
            </div>

            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
              <h4 className="font-medium text-gray-900 dark:text-white mb-4">Priority Distribution</h4>
              <ResponsiveContainer width="100%" height={200}>
                <BarChart data={Object.entries(analytics.byPriority).map(([priority, count]) => ({ priority, count }))}>
                  <XAxis dataKey="priority" stroke="#6B7280" />
                  <YAxis stroke="#6B7280" />
                  <Tooltip />
                  <Bar dataKey="count" fill="#005B96" />
                </BarChart>
              </ResponsiveContainer>
            </div>

            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
              <h4 className="font-medium text-gray-900 dark:text-white mb-4">Key Metrics</h4>
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600 dark:text-gray-400">Avg. Completion Time</span>
                  <span className="text-lg font-bold text-gray-900 dark:text-white">12 days</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600 dark:text-gray-400">On-time Delivery</span>
                  <span className="text-lg font-bold text-green-600">87%</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600 dark:text-gray-400">Quality Score</span>
                  <span className="text-lg font-bold text-blue-600">4.2/5.0</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600 dark:text-gray-400">Active Workflows</span>
                  <span className="text-lg font-bold text-purple-600">6</span>
                </div>
              </div>
            </div>
          </div>
        </TabsContent>

        {/* Tasks Tab */}
        <TabsContent value="tasks">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
              Task Management
            </h3>
            <EnhancedTable
              data={filteredItems.filter(item => item.type === 'task')}
              columns={tableColumns}
              searchable={true}
              selectable={true}
              exportable={true}
              pagination={true}
              pageSize={15}
              emptyState={{
                title: 'No tasks found',
                description: 'Create your first task to start tracking governance activities'
              }}
            />
          </div>
        </TabsContent>

        {/* Risks Tab */}
        <TabsContent value="risks">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
              Risk Management
            </h3>
            <EnhancedTable
              data={filteredItems.filter(item => item.type === 'risk')}
              columns={tableColumns}
              searchable={true}
              selectable={true}
              exportable={true}
              pagination={true}
              pageSize={15}
              emptyState={{
                title: 'No risks found',
                description: 'Start by identifying and documenting cybersecurity risks'
              }}
            />
          </div>
        </TabsContent>
      </Tabs>

      {/* Create Item Modal */}
      <Modal
        isOpen={showCreateModal}
        onClose={() => setShowCreateModal(false)}
        title="Create Governance Item"
        size="lg"
      >
        <form onSubmit={handleFormSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <FormField
              name="title"
              label="Title"
              type="text"
              value={formValues.title}
              onChange={(value) => setFormValue('title', value)}
              error={formErrors.title}
              placeholder="Enter item title"
              required
            />
            
            <FormField
              name="type"
              label="Type"
              type="select"
              value={formValues.type}
              onChange={(value) => setFormValue('type', value)}
              error={formErrors.type}
              options={[
                { value: 'task', label: 'Task' },
                { value: 'risk', label: 'Risk' },
                { value: 'policy', label: 'Policy' },
                { value: 'evidence', label: 'Evidence' }
              ]}
              required
            />
          </div>

          <FormField
            name="description"
            label="Description"
            type="textarea"
            value={formValues.description}
            onChange={(value) => setFormValue('description', value)}
            error={formErrors.description}
            placeholder="Provide detailed description"
            required
            rows={4}
          />

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <FormField
              name="priority"
              label="Priority"
              type="select"
              value={formValues.priority}
              onChange={(value) => setFormValue('priority', value)}
              error={formErrors.priority}
              options={[
                { value: 'low', label: 'Low' },
                { value: 'medium', label: 'Medium' },
                { value: 'high', label: 'High' },
                { value: 'critical', label: 'Critical' }
              ]}
              required
            />
            
            <FormField
              name="assigneeId"
              label="Assignee"
              type="select"
              value={formValues.assigneeId}
              onChange={(value) => setFormValue('assigneeId', value)}
              error={formErrors.assigneeId}
              options={[
                { value: '', label: 'Select assignee' },
                ...teamMembers.map(member => ({
                  value: member.id,
                  label: `${member.firstName} ${member.lastName}`
                }))
              ]}
              required
            />
            
            <FormField
              name="dueDate"
              label="Due Date"
              type="date"
              value={formValues.dueDate}
              onChange={(value) => setFormValue('dueDate', value)}
              error={formErrors.dueDate}
              required
            />
          </div>

          <FormField
            name="tags"
            label="Tags"
            type="text"
            value={formValues.tags}
            onChange={(value) => setFormValue('tags', value)}
            placeholder="Enter tags separated by commas"
            helperText="Tags help organize and filter governance items"
          />

          <div className="flex justify-end space-x-3">
            <Button variant="outline" onClick={() => setShowCreateModal(false)}>
              Cancel
            </Button>
            <Button type="submit" loading={isSubmitting}>
              Create Item
            </Button>
          </div>
        </form>
      </Modal>

      {/* Workflow Designer Modal */}
      <Modal
        isOpen={showWorkflowDesigner}
        onClose={() => setShowWorkflowDesigner(false)}
        title="Workflow Designer"
        size="xl"
      >
        <div className="space-y-6">
          <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-6 border border-blue-100 dark:border-blue-800">
            <div className="flex items-center">
              <Workflow className="h-6 w-6 text-blue-600 dark:text-blue-400 mr-3" />
              <div>
                <h3 className="font-medium text-blue-800 dark:text-blue-300">Custom Workflow Designer</h3>
                <p className="text-sm text-blue-700 dark:text-blue-200 mt-1">
                  Create custom governance workflows tailored to your organization's processes
                </p>
              </div>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h4 className="font-medium text-gray-900 dark:text-white mb-4">Workflow Canvas</h4>
              <div className="border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg p-8 text-center">
                <Workflow className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-600 dark:text-gray-400">
                  Drag and drop workflow components here
                </p>
              </div>
            </div>
            
            <div>
              <h4 className="font-medium text-gray-900 dark:text-white mb-4">Workflow Components</h4>
              <div className="space-y-3">
                {[
                  { name: 'Start Event', icon: Play, description: 'Begin workflow execution' },
                  { name: 'Task', icon: CheckCircle, description: 'Manual or automated task' },
                  { name: 'Decision', icon: GitBranch, description: 'Conditional branching' },
                  { name: 'End Event', icon: Target, description: 'Complete workflow' }
                ].map((component) => (
                  <div key={component.name} className="flex items-center p-3 border border-gray-200 dark:border-gray-700 rounded-lg cursor-move">
                    <component.icon className="h-5 w-5 text-blue-600 mr-3" />
                    <div>
                      <div className="font-medium text-gray-900 dark:text-white">{component.name}</div>
                      <div className="text-sm text-gray-500 dark:text-gray-400">{component.description}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default GovernanceOrchestrator;