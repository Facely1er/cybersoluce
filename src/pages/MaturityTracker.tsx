import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  TrendingUp,
  Target,
  Clock,
  Award,
  BarChart3,
  ArrowUp,
  ArrowDown,
  Minus,
  Calendar,
  Users,
  CheckCircle,
  Plus,
  Filter,
  Download,
  Settings,
  Lightbulb,
  AlertTriangle,
  PlayCircle,
  PauseCircle,
  Eye,
  Edit,
  Trash2,
  Zap,
  Brain,
  Gauge
} from 'lucide-react';
import {
  ResponsiveContainer,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  AreaChart,
  Area
} from 'recharts';
import { mockMaturityDomains } from '../data/mockData';
import SEOHead from '../components/common/SEOHead';
import { Badge } from '../components/ui/badge';
import { Button } from '../components/ui/button';
import { Progress } from '../components/ui/progress';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '../components/ui/tabs';
import { Alert } from '../components/ui/alert';
import EnhancedTable from '../components/tables/EnhancedTable';
import { Modal } from '../components/ui/modal';
import FormField from '../components/forms/FormField';
import useForm from '../hooks/useForm';

interface MaturityGoal {
  id: string;
  domainId: string;
  targetLevel: number;
  currentLevel: number;
  targetDate: Date;
  description: string;
  priority: 'low' | 'medium' | 'high' | 'critical';
  status: 'planning' | 'in-progress' | 'completed' | 'on-hold';
  assignee: string;
  budget: number;
  dependencies: string[];
  milestones: Milestone[];
}

interface Milestone {
  id: string;
  title: string;
  description: string;
  targetDate: Date;
  completed: boolean;
  completedDate?: Date;
}

interface MaturityRecommendation {
  id: string;
  domainId: string;
  title: string;
  description: string;
  impact: 'low' | 'medium' | 'high' | 'critical';
  effort: 'minimal' | 'moderate' | 'significant' | 'major';
  timeframe: string;
  expectedMaturityGain: number;
  prerequisites: string[];
  cost: number;
  roi: number;
}

const MaturityTracker: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'overview' | 'domains' | 'goals' | 'roadmap' | 'analytics'>('overview');
  const [selectedDomain, setSelectedDomain] = useState<string | null>(null);
  const [timeRange, setTimeRange] = useState<'3m' | '6m' | '1y' | '2y'>('6m');
  const [showCreateGoal, setShowCreateGoal] = useState(false);
  const [showRecommendations, setShowRecommendations] = useState(false);
  const [filterPriority, setFilterPriority] = useState<'all' | 'critical' | 'high' | 'medium' | 'low'>('all');
  const [viewMode, setViewMode] = useState<'grid' | 'table' | 'timeline'>('grid');

  // Enhanced maturity data with more comprehensive tracking
  const enhancedMaturityData = mockMaturityDomains.map(domain => ({
    ...domain,
    improvementPlan: [
      'Implement automated controls',
      'Enhance monitoring capabilities', 
      'Establish continuous improvement process'
    ],
    keyMetrics: {
      controlsImplemented: Math.floor(Math.random() * 30) + 40,
      totalControls: Math.floor(Math.random() * 20) + 80,
      riskReduction: Math.floor(Math.random() * 30) + 60,
      costSavings: Math.floor(Math.random() * 500000) + 100000,
      timeToTarget: Math.floor(Math.random() * 12) + 6, // months
      investmentRequired: Math.floor(Math.random() * 200000) + 50000
    },
    historicalData: [
      { month: 'Aug 23', level: domain.currentLevel - 0.8 },
      { month: 'Sep 23', level: domain.currentLevel - 0.6 },
      { month: 'Oct 23', level: domain.currentLevel - 0.4 },
      { month: 'Nov 23', level: domain.currentLevel - 0.2 },
      { month: 'Dec 23', level: domain.currentLevel - 0.1 },
      { month: 'Jan 24', level: domain.currentLevel },
      { month: 'Feb 24', level: domain.currentLevel }
    ]
  }));

  // Mock maturity goals
  const [maturityGoals, setMaturityGoals] = useState<MaturityGoal[]>([
    {
      id: 'goal-1',
      domainId: 'domain-1',
      targetLevel: 4,
      currentLevel: 3,
      targetDate: new Date('2024-06-30'),
      description: 'Enhance Identity & Access Management to level 4',
      priority: 'high',
      status: 'in-progress',
      assignee: 'Sarah Chen',
      budget: 75000,
      dependencies: ['goal-2'],
      milestones: [
        { id: 'm1', title: 'MFA Implementation', description: 'Deploy MFA across all systems', targetDate: new Date('2024-04-15'), completed: true, completedDate: new Date('2024-04-10') },
        { id: 'm2', title: 'PAM Solution', description: 'Implement privileged access management', targetDate: new Date('2024-05-31'), completed: false },
        { id: 'm3', title: 'Zero Trust Architecture', description: 'Design and implement zero trust', targetDate: new Date('2024-06-30'), completed: false }
      ]
    },
    {
      id: 'goal-2',
      domainId: 'domain-2',
      targetLevel: 3,
      currentLevel: 2,
      targetDate: new Date('2024-08-31'),
      description: 'Improve Data Protection maturity to level 3',
      priority: 'medium',
      status: 'planning',
      assignee: 'Michael Rodriguez',
      budget: 125000,
      dependencies: [],
      milestones: [
        { id: 'm4', title: 'Data Classification', description: 'Implement data classification scheme', targetDate: new Date('2024-05-15'), completed: false },
        { id: 'm5', title: 'DLP Deployment', description: 'Deploy data loss prevention tools', targetDate: new Date('2024-07-15'), completed: false }
      ]
    }
  ]);

  // Mock recommendations with AI-powered insights
  const maturityRecommendations: MaturityRecommendation[] = [
    {
      id: 'rec-1',
      domainId: 'domain-1',
      title: 'Implement Zero Trust Architecture',
      description: 'Deploy zero trust network access to improve identity management maturity',
      impact: 'high',
      effort: 'significant',
      timeframe: '3-6 months',
      expectedMaturityGain: 0.8,
      prerequisites: ['MFA implementation', 'Network segmentation'],
      cost: 150000,
      roi: 2.3
    },
    {
      id: 'rec-2',
      domainId: 'domain-2',
      title: 'Advanced Data Classification',
      description: 'Implement AI-powered data discovery and classification system',
      impact: 'high',
      effort: 'moderate',
      timeframe: '2-4 months',
      expectedMaturityGain: 0.6,
      prerequisites: ['Data inventory completion'],
      cost: 85000,
      roi: 3.1
    },
    {
      id: 'rec-3',
      domainId: 'domain-1',
      title: 'Security Automation Platform',
      description: 'Deploy SOAR platform for incident response automation',
      impact: 'medium',
      effort: 'moderate',
      timeframe: '2-3 months',
      expectedMaturityGain: 0.4,
      prerequisites: ['SIEM integration'],
      cost: 120000,
      roi: 1.8
    }
  ];

  // Calculate overall maturity metrics
  const overallMetrics = {
    currentAvg: enhancedMaturityData.reduce((acc, d) => acc + d.currentLevel, 0) / enhancedMaturityData.length,
    targetAvg: enhancedMaturityData.reduce((acc, d) => acc + d.targetLevel, 0) / enhancedMaturityData.length,
    totalProgress: enhancedMaturityData.reduce((acc, d) => {
      const domainProgress = d.subDomains.reduce((sum, sub) => sum + sub.progress, 0) / d.subDomains.length;
      return acc + domainProgress;
    }, 0) / enhancedMaturityData.length,
    totalInvestment: maturityGoals.reduce((sum, goal) => sum + goal.budget, 0),
    activeGoals: maturityGoals.filter(g => g.status === 'in-progress').length,
    completedGoals: maturityGoals.filter(g => g.status === 'completed').length
  };

  // Form for creating new goals
  const {
    values: goalValues,
    errors: goalErrors,
    setValue: setGoalValue,
    handleSubmit: handleGoalSubmit,
    reset: resetGoalForm
  } = useForm<{
    domainId: string;
    targetLevel: number;
    targetDate: string;
    description: string;
    priority: string;
    assignee: string;
    budget: number;
  }>({
    initialValues: {
      domainId: '',
      targetLevel: 3,
      targetDate: '',
      description: '',
      priority: 'medium',
      assignee: '',
      budget: 0
    },
    validationSchema: {
      domainId: { required: true },
      targetLevel: { required: true },
      targetDate: { required: true },
      description: { required: true },
      assignee: { required: true },
      budget: { required: true }
    },
    onSubmit: async (values) => {
      const newGoal: MaturityGoal = {
        id: `goal-${Date.now()}`,
        ...values,
        currentLevel: enhancedMaturityData.find(d => d.id === values.domainId)?.currentLevel || 1,
        targetDate: new Date(values.targetDate),
        status: 'planning',
        dependencies: [],
        milestones: []
      };
      
      setMaturityGoals(prev => [...prev, newGoal]);
      setShowCreateGoal(false);
      resetGoalForm();
    }
  });

  // Mock historical data for trends
  const trendData = [
    { month: 'Aug 23', overall: 2.1, iam: 2.5, dataProtection: 1.8, incidentResponse: 2.0, networkSecurity: 2.2 },
    { month: 'Sep 23', overall: 2.3, iam: 2.7, dataProtection: 1.9, incidentResponse: 2.1, networkSecurity: 2.4 },
    { month: 'Oct 23', overall: 2.5, iam: 2.8, dataProtection: 2.0, incidentResponse: 2.3, networkSecurity: 2.6 },
    { month: 'Nov 23', overall: 2.7, iam: 3.0, dataProtection: 2.1, incidentResponse: 2.5, networkSecurity: 2.8 },
    { month: 'Dec 23', overall: 2.8, iam: 3.1, dataProtection: 2.2, incidentResponse: 2.6, networkSecurity: 3.0 },
    { month: 'Jan 24', overall: 3.0, iam: 3.2, dataProtection: 2.4, incidentResponse: 2.8, networkSecurity: 3.1 },
    { month: 'Feb 24', overall: 3.1, iam: 3.3, dataProtection: 2.6, incidentResponse: 3.0, networkSecurity: 3.2 }
  ];

  // Radar chart data
  const radarData = enhancedMaturityData.map(domain => ({
    domain: domain.name.split(' ')[0],
    current: domain.currentLevel,
    target: domain.targetLevel,
    benchmark: domain.benchmarkScore || domain.currentLevel * 0.9,
    industry: domain.currentLevel * 1.1
  }));

  // Progress vs Investment data
  const investmentData = [
    { quarter: 'Q1 2024', investment: 125000, maturityGain: 0.3, cumulativeGain: 0.3 },
    { quarter: 'Q2 2024', investment: 200000, maturityGain: 0.5, cumulativeGain: 0.8 },
    { quarter: 'Q3 2024', investment: 175000, maturityGain: 0.4, cumulativeGain: 1.2 },
    { quarter: 'Q4 2024', investment: 150000, maturityGain: 0.3, cumulativeGain: 1.5 }
  ];

  // Get trend icon
  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case 'improving': return <ArrowUp className="h-4 w-4 text-green-500" />;
      case 'declining': return <ArrowDown className="h-4 w-4 text-red-500" />;
      default: return <Minus className="h-4 w-4 text-gray-500" />;
    }
  };

  // Get maturity level color
  const getMaturityColor = (level: number) => {
    if (level < 2) return 'text-red-600 bg-red-100 dark:bg-red-900/30';
    if (level < 3) return 'text-orange-600 bg-orange-100 dark:bg-orange-900/30';
    if (level < 4) return 'text-yellow-600 bg-yellow-100 dark:bg-yellow-900/30';
    if (level < 5) return 'text-blue-600 bg-blue-100 dark:bg-blue-900/30';
    return 'text-green-600 bg-green-100 dark:bg-green-900/30';
  };

  const maturityLevels = [
    { level: 1, name: 'Initial', description: 'Ad hoc, unpredictable, reactive', color: 'red' },
    { level: 2, name: 'Developing', description: 'Some processes, often reactive', color: 'orange' },
    { level: 3, name: 'Defined', description: 'Documented processes, proactive', color: 'yellow' },
    { level: 4, name: 'Managed', description: 'Measured and controlled', color: 'blue' },
    { level: 5, name: 'Optimizing', description: 'Continuous improvement focus', color: 'green' }
  ];

  // Filtered data based on current filters
  const filteredGoals = maturityGoals.filter(goal => 
    filterPriority === 'all' || goal.priority === filterPriority
  );

  const filteredRecommendations = maturityRecommendations.filter(rec =>
    filterPriority === 'all' || rec.impact === filterPriority
  );

  return (
    <>
      <SEOHead 
        title="Maturity Acceleration Engine - CyberSoluce™"
        description="Track and accelerate cybersecurity maturity with CMMI-style progression tracking and strategic roadmap development."
        keywords="cybersecurity maturity, CMMI, maturity tracking, security improvement, capability maturity"
      />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
        {/* Enhanced Header */}
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
              Maturity Acceleration Engine
            </h1>
            <p className="text-gray-600 dark:text-gray-300 mt-1">
              Track and accelerate cybersecurity maturity across domains with AI-powered insights
            </p>
          </div>
          
          <div className="flex flex-wrap items-center gap-3">
            <select
              value={timeRange}
              onChange={(e) => setTimeRange(e.target.value as any)}
              className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-800 text-sm"
            >
              <option value="3m">Last 3 Months</option>
              <option value="6m">Last 6 Months</option>
              <option value="1y">Last Year</option>
              <option value="2y">Last 2 Years</option>
            </select>
            
            <Button
              onClick={() => setShowCreateGoal(true)}
              className="flex items-center gap-2"
            >
              <Plus className="h-4 w-4" />
              New Goal
            </Button>
            
            <Button
              onClick={() => setShowRecommendations(true)}
              variant="outline"
              className="flex items-center gap-2"
            >
              <Lightbulb className="h-4 w-4" />
              AI Recommendations
            </Button>
            
            <Button variant="outline" className="flex items-center gap-2">
              <Download className="h-4 w-4" />
              Export
            </Button>
          </div>
        </div>

        {/* Key Metrics Dashboard */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6"
          >
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
                Current Maturity
              </h2>
              <Award className="h-6 w-6 text-command-blue-600" />
            </div>
            <div className="text-3xl font-bold text-command-blue-600 mb-2">
              {overallMetrics.currentAvg.toFixed(1)}/5.0
            </div>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Organization average
            </p>
            <div className="mt-3">
              <Progress value={(overallMetrics.currentAvg / 5) * 100} className="h-2" />
            </div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6"
          >
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
                Target Progress
              </h2>
              <Target className="h-6 w-6 text-action-cyan-400" />
            </div>
            <div className="text-3xl font-bold text-action-cyan-400 mb-2">
              {overallMetrics.totalProgress.toFixed(0)}%
            </div>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              To target state
            </p>
            <div className="mt-3">
              <Progress value={overallMetrics.totalProgress} color="success" className="h-2" />
            </div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6"
          >
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
                Active Goals
              </h2>
              <TrendingUp className="h-6 w-6 text-purple-600" />
            </div>
            <div className="text-3xl font-bold text-purple-600 mb-2">
              {overallMetrics.activeGoals}
            </div>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              In progress
            </p>
            <div className="mt-3 text-xs text-gray-500">
              {overallMetrics.completedGoals} completed this year
            </div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6"
          >
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
                Total Investment
              </h2>
              <Zap className="h-6 w-6 text-green-600" />
            </div>
            <div className="text-3xl font-bold text-green-600 mb-2">
              ${(overallMetrics.totalInvestment / 1000).toFixed(0)}K
            </div>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Planned budget
            </p>
            <div className="mt-3 text-xs text-green-600">
              ROI: 2.4x projected
            </div>
          </motion.div>
        </div>

        {/* Enhanced Tabbed Interface */}
        <Tabs value={activeTab} onValueChange={(value) => setActiveTab(value as any)}>
          <TabsList className="grid grid-cols-5 w-full max-w-2xl">
            <TabsTrigger value="overview" className="flex items-center gap-2">
              <Gauge className="h-4 w-4" />
              Overview
            </TabsTrigger>
            <TabsTrigger value="domains" className="flex items-center gap-2">
              <BarChart3 className="h-4 w-4" />
              Domains
            </TabsTrigger>
            <TabsTrigger value="goals" className="flex items-center gap-2">
              <Target className="h-4 w-4" />
              Goals
            </TabsTrigger>
            <TabsTrigger value="roadmap" className="flex items-center gap-2">
              <Calendar className="h-4 w-4" />
              Roadmap
            </TabsTrigger>
            <TabsTrigger value="analytics" className="flex items-center gap-2">
              <TrendingUp className="h-4 w-4" />
              Analytics
            </TabsTrigger>
          </TabsList>

          {/* Overview Tab */}
          <TabsContent value="overview" className="space-y-6">
            {/* Maturity Level Reference */}
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                Maturity Level Reference (CMMI-based)
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
                {maturityLevels.map((level) => (
                  <div 
                    key={level.level}
                    className={`p-4 rounded-lg border-2 ${getMaturityColor(level.level)} border-opacity-50`}
                  >
                    <div className="flex items-center justify-center mb-2">
                      <span className="text-2xl font-bold">{level.level}</span>
                    </div>
                    <h3 className="font-semibold text-center mb-2">{level.name}</h3>
                    <p className="text-xs text-center">{level.description}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Quick Insights */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                  Maturity Acceleration Opportunities
                </h3>
                <div className="space-y-4">
                  {maturityRecommendations.slice(0, 3).map((rec) => (
                    <div key={rec.id} className="flex items-start space-x-3 p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                      <div className="flex-shrink-0">
                        <Brain className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h4 className="text-sm font-medium text-gray-900 dark:text-white">
                          {rec.title}
                        </h4>
                        <p className="text-xs text-gray-600 dark:text-gray-400 mt-1">
                          +{rec.expectedMaturityGain} maturity gain • {rec.timeframe} • ${(rec.cost / 1000).toFixed(0)}K
                        </p>
                        <div className="flex items-center space-x-2 mt-2">
                          <Badge variant={rec.impact === 'high' ? 'destructive' : rec.impact === 'medium' ? 'warning' : 'success'} size="sm">
                            {rec.impact} impact
                          </Badge>
                          <span className="text-xs text-green-600 dark:text-green-400">
                            {rec.roi}x ROI
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                <Button 
                  variant="outline" 
                  className="w-full mt-4"
                  onClick={() => setShowRecommendations(true)}
                >
                  View All Recommendations
                </Button>
              </div>

              <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                  Goal Achievement Timeline
                </h3>
                <div className="space-y-4">
                  {filteredGoals.slice(0, 4).map((goal) => (
                    <div key={goal.id} className="flex items-center space-x-3">
                      <div className={`w-3 h-3 rounded-full ${
                        goal.status === 'completed' ? 'bg-green-500' :
                        goal.status === 'in-progress' ? 'bg-blue-500' :
                        goal.status === 'on-hold' ? 'bg-yellow-500' :
                        'bg-gray-400'
                      }`} />
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-gray-900 dark:text-white truncate">
                          {goal.description}
                        </p>
                        <p className="text-xs text-gray-500 dark:text-gray-400">
                          Target: {goal.targetDate.toLocaleDateString()} • {goal.assignee}
                        </p>
                      </div>
                      <Badge 
                        variant={goal.priority === 'critical' ? 'destructive' : goal.priority === 'high' ? 'warning' : 'info'}
                        size="sm"
                      >
                        {goal.priority}
                      </Badge>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </TabsContent>

          {/* Domains Tab */}
          <TabsContent value="domains" className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
                Maturity Domain Details
              </h2>
              <div className="flex items-center gap-2">
                <Button
                  variant={viewMode === 'grid' ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setViewMode('grid')}
                >
                  Grid
                </Button>
                <Button
                  variant={viewMode === 'table' ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setViewMode('table')}
                >
                  Table
                </Button>
              </div>
            </div>

            {viewMode === 'grid' ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {enhancedMaturityData.map((domain) => (
                  <motion.div
                    key={domain.id}
                    whileHover={{ scale: 1.02, y: -5 }}
                    onClick={() => setSelectedDomain(selectedDomain === domain.id ? null : domain.id)}
                    className={`border rounded-lg p-6 cursor-pointer transition-all duration-300 ${
                      selectedDomain === domain.id
                        ? 'border-command-blue-500 bg-command-blue-50 dark:bg-command-blue-900/20 shadow-lg'
                        : 'border-gray-200 dark:border-gray-700 hover:border-gray-300 bg-white dark:bg-gray-800 hover:shadow-md'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="font-semibold text-gray-900 dark:text-white">
                        {domain.name}
                      </h3>
                      <div className="flex items-center">
                        {getTrendIcon(domain.trend)}
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4 mb-4">
                      <div>
                        <p className="text-xs text-gray-500 dark:text-gray-400 uppercase tracking-wide">Current</p>
                        <p className={`text-2xl font-bold ${getMaturityColor(domain.currentLevel).split(' ')[0]}`}>
                          {domain.currentLevel}
                        </p>
                      </div>
                      <div>
                        <p className="text-xs text-gray-500 dark:text-gray-400 uppercase tracking-wide">Target</p>
                        <p className="text-2xl font-bold text-gray-400">
                          {domain.targetLevel}
                        </p>
                      </div>
                    </div>
                    
                    <div className="mb-4">
                      <div className="flex justify-between text-sm mb-1">
                        <span className="text-gray-600 dark:text-gray-400">Progress</span>
                        <span className="text-gray-900 dark:text-white">
                          {Math.round((domain.currentLevel / domain.targetLevel) * 100)}%
                        </span>
                      </div>
                      <Progress 
                        value={(domain.currentLevel / domain.targetLevel) * 100}
                        className="h-2"
                      />
                    </div>
                    
                    <div className="space-y-2 text-xs text-gray-600 dark:text-gray-400">
                      <div className="flex items-center justify-between">
                        <span>Investment Required:</span>
                        <span className="font-medium">${(domain.keyMetrics.investmentRequired / 1000).toFixed(0)}K</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span>Time to Target:</span>
                        <span className="font-medium">{domain.keyMetrics.timeToTarget} months</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span>Expected ROI:</span>
                        <span className="text-green-600 font-medium">2.4x</span>
                      </div>
                    </div>

                    {/* Expanded domain details */}
                    <AnimatePresence>
                      {selectedDomain === domain.id && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: 'auto' }}
                          exit={{ opacity: 0, height: 0 }}
                          className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700"
                        >
                          <h4 className="font-medium text-gray-900 dark:text-white mb-3 text-sm">
                            Sub-Domains
                          </h4>
                          <div className="space-y-2">
                            {domain.subDomains.map((subDomain) => (
                              <div key={subDomain.id} className="text-xs">
                                <div className="flex justify-between mb-1">
                                  <span className="text-gray-700 dark:text-gray-300">{subDomain.name}</span>
                                  <span className="text-gray-900 dark:text-white font-medium">
                                    {subDomain.currentLevel}/{subDomain.targetLevel}
                                  </span>
                                </div>
                                <Progress 
                                  value={subDomain.progress}
                                  className="h-1"
                                />
                              </div>
                            ))}
                          </div>
                          
                          <div className="mt-4 pt-3 border-t border-gray-100 dark:border-gray-600">
                            <div className="flex gap-2">
                              <Button size="sm" variant="outline">
                                <Edit className="h-3 w-3 mr-1" />
                                Edit
                              </Button>
                              <Button size="sm" variant="outline">
                                <Eye className="h-3 w-3 mr-1" />
                                Details
                              </Button>
                            </div>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </motion.div>
                ))}
              </div>
            ) : (
              <EnhancedTable
                data={enhancedMaturityData.map(domain => ({
                  id: domain.id,
                  name: domain.name,
                  current: domain.currentLevel,
                  target: domain.targetLevel,
                  progress: Math.round((domain.currentLevel / domain.targetLevel) * 100),
                  trend: domain.trend,
                  lastAssessment: domain.assessmentDate.toLocaleDateString(),
                  investment: `$${(domain.keyMetrics.investmentRequired / 1000).toFixed(0)}K`,
                  timeToTarget: `${domain.keyMetrics.timeToTarget} months`
                }))}
                columns={[
                  { key: 'name', header: 'Domain', sortable: true },
                  { key: 'current', header: 'Current Level', sortable: true, align: 'center' },
                  { key: 'target', header: 'Target Level', sortable: true, align: 'center' },
                  { key: 'progress', header: 'Progress', sortable: true, align: 'center', formatter: 'percentage' },
                  { key: 'trend', header: 'Trend', align: 'center' },
                  { key: 'lastAssessment', header: 'Last Assessment', sortable: true },
                  { key: 'investment', header: 'Investment', align: 'right' },
                  { key: 'timeToTarget', header: 'Time to Target', align: 'center' }
                ]}
                searchable
                exportable
                onRowClick={(row) => setSelectedDomain(row.id)}
              />
            )}
          </TabsContent>

          {/* Goals Tab */}
          <TabsContent value="goals" className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
                Maturity Goals Management
              </h2>
              <div className="flex items-center gap-3">
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
                <Button onClick={() => setShowCreateGoal(true)}>
                  <Plus className="h-4 w-4 mr-2" />
                  New Goal
                </Button>
              </div>
            </div>

            <div className="space-y-4">
              {filteredGoals.map((goal) => (
                <motion.div
                  key={goal.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 border border-gray-200 dark:border-gray-700"
                >
                  <div className="flex flex-col lg:flex-row justify-between items-start mb-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                          {goal.description}
                        </h3>
                        <Badge 
                          variant={goal.priority === 'critical' ? 'destructive' : goal.priority === 'high' ? 'warning' : 'info'}
                        >
                          {goal.priority}
                        </Badge>
                        <Badge 
                          variant={goal.status === 'completed' ? 'success' : goal.status === 'in-progress' ? 'info' : 'secondary'}
                        >
                          {goal.status}
                        </Badge>
                      </div>
                      <p className="text-gray-600 dark:text-gray-400 mb-3">
                        Target: Level {goal.targetLevel} by {goal.targetDate.toLocaleDateString()}
                      </p>
                    </div>
                    
                    <div className="flex items-center gap-2">
                      <Button size="sm" variant="outline">
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button size="sm" variant="outline">
                        <Eye className="h-4 w-4" />
                      </Button>
                      <Button size="sm" variant="outline">
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
                    <div className="text-center p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                      <div className="text-lg font-bold text-command-blue-600">
                        {goal.currentLevel} → {goal.targetLevel}
                      </div>
                      <div className="text-xs text-gray-500 dark:text-gray-400">Maturity Level</div>
                    </div>
                    <div className="text-center p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                      <div className="text-lg font-bold text-green-600">
                        ${(goal.budget / 1000).toFixed(0)}K
                      </div>
                      <div className="text-xs text-gray-500 dark:text-gray-400">Budget</div>
                    </div>
                    <div className="text-center p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                      <div className="text-lg font-bold text-purple-600">
                        {goal.milestones.filter(m => m.completed).length}/{goal.milestones.length}
                      </div>
                      <div className="text-xs text-gray-500 dark:text-gray-400">Milestones</div>
                    </div>
                    <div className="text-center p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                      <div className="text-lg font-bold text-blue-600">
                        {Math.round((goal.milestones.filter(m => m.completed).length / goal.milestones.length) * 100)}%
                      </div>
                      <div className="text-xs text-gray-500 dark:text-gray-400">Complete</div>
                    </div>
                  </div>

                  <div className="mb-4">
                    <h4 className="text-sm font-medium text-gray-900 dark:text-white mb-2">
                      Milestones Progress
                    </h4>
                    <div className="space-y-2">
                      {goal.milestones.map((milestone) => (
                        <div key={milestone.id} className="flex items-center justify-between p-2 bg-gray-50 dark:bg-gray-700 rounded">
                          <div className="flex items-center">
                            <div className={`w-4 h-4 rounded-full mr-3 ${
                              milestone.completed ? 'bg-green-500' : 'bg-gray-300 dark:bg-gray-600'
                            } flex items-center justify-center`}>
                              {milestone.completed && <CheckCircle className="h-3 w-3 text-white" />}
                            </div>
                            <div>
                              <span className="text-sm font-medium text-gray-900 dark:text-white">
                                {milestone.title}
                              </span>
                              <div className="text-xs text-gray-500 dark:text-gray-400">
                                Due: {milestone.targetDate.toLocaleDateString()}
                              </div>
                            </div>
                          </div>
                          {milestone.completed && (
                            <span className="text-xs text-green-600 dark:text-green-400">
                              ✓ {milestone.completedDate?.toLocaleDateString()}
                            </span>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>

                  <Progress 
                    value={(goal.milestones.filter(m => m.completed).length / goal.milestones.length) * 100}
                    showLabel
                    className="mb-2"
                  />
                </motion.div>
              ))}
            </div>
          </TabsContent>

          {/* Roadmap Tab */}
          <TabsContent value="roadmap" className="space-y-6">
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-6">
                Maturity Acceleration Roadmap
              </h2>
              
              <div className="space-y-6">
                {[
                  {
                    quarter: 'Q2 2024',
                    goals: [
                      'Implement automated incident response workflows',
                      'Complete IAM maturity assessment',
                      'Deploy advanced threat detection'
                    ],
                    expectedGain: 0.3,
                    investment: 125000,
                    priority: 'high',
                    status: 'in-progress'
                  },
                  {
                    quarter: 'Q3 2024',
                    goals: [
                      'Establish data classification program',
                      'Implement zero trust architecture',
                      'Complete vendor risk assessments'
                    ],
                    expectedGain: 0.4,
                    investment: 175000,
                    priority: 'medium',
                    status: 'planning'
                  },
                  {
                    quarter: 'Q4 2024',
                    goals: [
                      'Deploy security orchestration platform',
                      'Complete compliance automation',
                      'Establish continuous monitoring'
                    ],
                    expectedGain: 0.5,
                    investment: 200000,
                    priority: 'high',
                    status: 'planning'
                  }
                ].map((roadmapItem, index) => (
                  <motion.div
                    key={roadmapItem.quarter}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="border border-gray-200 dark:border-gray-700 rounded-lg p-6 bg-gradient-to-r from-white to-gray-50 dark:from-gray-800 dark:to-gray-700"
                  >
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center">
                        <div className="w-10 h-10 rounded-full bg-command-blue-100 dark:bg-command-blue-900/30 flex items-center justify-center mr-4">
                          <span className="text-sm font-bold text-command-blue-600">{index + 1}</span>
                        </div>
                        <div>
                          <h3 className="font-semibold text-gray-900 dark:text-white">
                            {roadmapItem.quarter}
                          </h3>
                          <p className="text-sm text-gray-600 dark:text-gray-400">
                            Expected maturity gain: +{roadmapItem.expectedGain}
                          </p>
                        </div>
                      </div>
                      
                      <div className="flex items-center space-x-3">
                        <Badge 
                          variant={roadmapItem.priority === 'high' ? 'destructive' : 'warning'}
                        >
                          {roadmapItem.priority} priority
                        </Badge>
                        <Badge 
                          variant={roadmapItem.status === 'in-progress' ? 'info' : 'secondary'}
                        >
                          {roadmapItem.status}
                        </Badge>
                        <span className="text-sm font-medium text-green-600">
                          ${(roadmapItem.investment / 1000).toFixed(0)}K
                        </span>
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      {roadmapItem.goals.map((goal, goalIndex) => (
                        <div key={goalIndex} className="flex items-start p-3 bg-white dark:bg-gray-800 rounded border">
                          <CheckCircle className="h-4 w-4 text-gray-400 mr-2 mt-0.5" />
                          <span className="text-sm text-gray-700 dark:text-gray-300">{goal}</span>
                        </div>
                      ))}
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Investment vs Maturity Chart */}
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                Investment vs Maturity Acceleration
              </h3>
              <ResponsiveContainer width="100%" height={300}>
                <AreaChart data={investmentData}>
                  <defs>
                    <linearGradient id="investmentGradient" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#005B96" stopOpacity={0.3}/>
                      <stop offset="95%" stopColor="#005B96" stopOpacity={0}/>
                    </linearGradient>
                    <linearGradient id="gainGradient" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#10B981" stopOpacity={0.3}/>
                      <stop offset="95%" stopColor="#10B981" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                  <XAxis dataKey="quarter" stroke="#6B7280" />
                  <YAxis stroke="#6B7280" />
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: '#1F2937',
                      border: '1px solid #374151',
                      borderRadius: '8px'
                    }}
                  />
                  <Area
                    type="monotone"
                    dataKey="investment"
                    stroke="#005B96"
                    fillOpacity={1}
                    fill="url(#investmentGradient)"
                    strokeWidth={2}
                    name="Investment ($)"
                  />
                  <Area
                    type="monotone"
                    dataKey="cumulativeGain"
                    stroke="#10B981"
                    fillOpacity={1}
                    fill="url(#gainGradient)"
                    strokeWidth={2}
                    name="Cumulative Maturity Gain"
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </TabsContent>

          {/* Analytics Tab */}
          <TabsContent value="analytics" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Maturity Radar Chart */}
              <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
                <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                  Domain Maturity Overview
                </h2>
                
                <ResponsiveContainer width="100%" height={350}>
                  <RadarChart data={radarData}>
                    <PolarGrid stroke="#374151" />
                    <PolarAngleAxis dataKey="domain" tick={{ fontSize: 12, fill: '#6B7280' }} />
                    <PolarRadiusAxis 
                      angle={90} 
                      domain={[0, 5]} 
                      tick={{ fontSize: 10, fill: '#6B7280' }}
                    />
                    <Radar
                      name="Current"
                      dataKey="current"
                      stroke="#005B96"
                      fill="#005B96"
                      fillOpacity={0.3}
                      strokeWidth={2}
                    />
                    <Radar
                      name="Target"
                      dataKey="target"
                      stroke="#33A1DE"
                      fill="#33A1DE"
                      fillOpacity={0.1}
                      strokeWidth={2}
                      strokeDasharray="5 5"
                    />
                    <Radar
                      name="Benchmark"
                      dataKey="benchmark"
                      stroke="#10B981"
                      fill="transparent"
                      strokeWidth={1}
                      strokeDasharray="3 3"
                    />
                    <Radar
                      name="Industry"
                      dataKey="industry"
                      stroke="#F59E0B"
                      fill="transparent"
                      strokeWidth={1}
                      strokeDasharray="2 2"
                    />
                    <Tooltip />
                  </RadarChart>
                </ResponsiveContainer>
              </div>

              {/* Maturity Progression Timeline */}
              <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
                <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                  Maturity Progression Timeline
                </h2>
                
                <ResponsiveContainer width="100%" height={350}>
                  <LineChart data={trendData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                    <XAxis dataKey="month" stroke="#6B7280" />
                    <YAxis domain={[0, 5]} stroke="#6B7280" />
                    <Tooltip 
                      contentStyle={{ 
                        backgroundColor: '#1F2937',
                        border: '1px solid #374151',
                        borderRadius: '8px'
                      }}
                    />
                    <Line 
                      type="monotone" 
                      dataKey="overall" 
                      stroke="#005B96" 
                      strokeWidth={3}
                      name="Overall"
                      dot={{ fill: '#005B96', strokeWidth: 2, r: 4 }}
                    />
                    <Line 
                      type="monotone" 
                      dataKey="iam" 
                      stroke="#33A1DE" 
                      strokeWidth={2}
                      name="Identity & Access"
                    />
                    <Line 
                      type="monotone" 
                      dataKey="dataProtection" 
                      stroke="#10B981" 
                      strokeWidth={2}
                      name="Data Protection"
                    />
                    <Line 
                      type="monotone" 
                      dataKey="incidentResponse" 
                      stroke="#F59E0B" 
                      strokeWidth={2}
                      name="Incident Response"
                    />
                    <Line 
                      type="monotone" 
                      dataKey="networkSecurity" 
                      stroke="#8B5CF6" 
                      strokeWidth={2}
                      name="Network Security"
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Advanced Analytics Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                  Acceleration Rate
                </h3>
                <div className="text-center">
                  <div className="text-3xl font-bold text-green-600 mb-2">
                    +0.3
                  </div>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    Levels per quarter
                  </p>
                  <div className="mt-4">
                    <div className="flex justify-between text-xs mb-1">
                      <span>vs Industry</span>
                      <span className="text-green-600">+15% faster</span>
                    </div>
                    <Progress value={75} color="success" />
                  </div>
                </div>
              </div>

              <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                  Investment Efficiency
                </h3>
                <div className="text-center">
                  <div className="text-3xl font-bold text-blue-600 mb-2">
                    2.4x
                  </div>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    ROI on maturity investments
                  </p>
                  <div className="mt-4">
                    <div className="flex justify-between text-xs mb-1">
                      <span>Cost per level</span>
                      <span className="text-blue-600">$83K</span>
                    </div>
                    <Progress value={68} />
                  </div>
                </div>
              </div>

              <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                  Risk Reduction
                </h3>
                <div className="text-center">
                  <div className="text-3xl font-bold text-purple-600 mb-2">
                    47%
                  </div>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    Risk reduction achieved
                  </p>
                  <div className="mt-4">
                    <div className="flex justify-between text-xs mb-1">
                      <span>Target reduction</span>
                      <span className="text-purple-600">65%</span>
                    </div>
                    <Progress value={72} className="h-2" />
                  </div>
                </div>
              </div>
            </div>
          </TabsContent>
        </Tabs>

        {/* Create Goal Modal */}
        <Modal
          isOpen={showCreateGoal}
          onClose={() => setShowCreateGoal(false)}
          title="Create Maturity Goal"
          description="Set a new maturity target for a security domain"
          size="lg"
        >
          <form onSubmit={handleGoalSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormField
                name="domainId"
                label="Security Domain"
                type="select"
                value={goalValues.domainId}
                onChange={(value) => setGoalValue('domainId', value)}
                options={[
                  { value: '', label: 'Select a domain' },
                  ...enhancedMaturityData.map(domain => ({
                    value: domain.id,
                    label: domain.name
                  }))
                ]}
                error={goalErrors.domainId}
                required
              />
              
              <FormField
                name="targetLevel"
                label="Target Maturity Level"
                type="number"
                value={goalValues.targetLevel}
                onChange={(value) => setGoalValue('targetLevel', value)}
                error={goalErrors.targetLevel}
                required
              />
            </div>

            <FormField
              name="description"
              label="Goal Description"
              type="textarea"
              value={goalValues.description}
              onChange={(value) => setGoalValue('description', value)}
              error={goalErrors.description}
              placeholder="Describe the maturity goal and expected outcomes..."
              required
            />

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <FormField
                name="priority"
                label="Priority"
                type="select"
                value={goalValues.priority}
                onChange={(value) => setGoalValue('priority', value)}
                options={[
                  { value: 'low', label: 'Low' },
                  { value: 'medium', label: 'Medium' },
                  { value: 'high', label: 'High' },
                  { value: 'critical', label: 'Critical' }
                ]}
                error={goalErrors.priority}
                required
              />
              
              <FormField
                name="assignee"
                label="Assignee"
                type="text"
                value={goalValues.assignee}
                onChange={(value) => setGoalValue('assignee', value)}
                error={goalErrors.assignee}
                placeholder="Goal owner"
                required
              />
              
              <FormField
                name="targetDate"
                label="Target Date"
                type="date"
                value={goalValues.targetDate}
                onChange={(value) => setGoalValue('targetDate', value)}
                error={goalErrors.targetDate}
                required
              />
            </div>

            <FormField
              name="budget"
              label="Budget Allocation"
              type="number"
              value={goalValues.budget}
              onChange={(value) => setGoalValue('budget', value)}
              error={goalErrors.budget}
              placeholder="Estimated budget in USD"
              required
            />

            <div className="flex justify-end space-x-3">
              <Button 
                type="button" 
                variant="outline" 
                onClick={() => setShowCreateGoal(false)}
              >
                Cancel
              </Button>
              <Button type="submit">
                Create Goal
              </Button>
            </div>
          </form>
        </Modal>

        {/* AI Recommendations Modal */}
        <Modal
          isOpen={showRecommendations}
          onClose={() => setShowRecommendations(false)}
          title="AI-Powered Maturity Recommendations"
          description="Intelligent recommendations to accelerate your cybersecurity maturity"
          size="xl"
        >
          <div className="space-y-6">
            <Alert variant="info">
              <Brain className="h-4 w-4" />
              <div>
                <strong>AI Analysis Complete:</strong> Based on your current maturity levels, 
                industry benchmarks, and best practices, here are personalized recommendations 
                to accelerate your cybersecurity maturity.
              </div>
            </Alert>

            <div className="space-y-4">
              {filteredRecommendations.map((rec) => (
                <motion.div
                  key={rec.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="border border-gray-200 dark:border-gray-700 rounded-lg p-6 bg-gradient-to-r from-white to-gray-50 dark:from-gray-800 dark:to-gray-700"
                >
                  <div className="flex justify-between items-start mb-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                          {rec.title}
                        </h3>
                        <Badge variant={rec.impact === 'critical' ? 'destructive' : rec.impact === 'high' ? 'warning' : 'info'}>
                          {rec.impact} impact
                        </Badge>
                      </div>
                      <p className="text-gray-600 dark:text-gray-400 mb-3">
                        {rec.description}
                      </p>
                    </div>
                    <div className="text-right">
                      <div className="text-2xl font-bold text-green-600">
                        +{rec.expectedMaturityGain}
                      </div>
                      <div className="text-xs text-gray-500 dark:text-gray-400">
                        Maturity gain
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
                    <div className="text-center p-3 bg-white dark:bg-gray-800 rounded border">
                      <div className="text-sm font-bold text-blue-600">
                        {rec.timeframe}
                      </div>
                      <div className="text-xs text-gray-500 dark:text-gray-400">Timeline</div>
                    </div>
                    <div className="text-center p-3 bg-white dark:bg-gray-800 rounded border">
                      <div className="text-sm font-bold text-green-600">
                        ${(rec.cost / 1000).toFixed(0)}K
                      </div>
                      <div className="text-xs text-gray-500 dark:text-gray-400">Investment</div>
                    </div>
                    <div className="text-center p-3 bg-white dark:bg-gray-800 rounded border">
                      <div className="text-sm font-bold text-purple-600">
                        {rec.roi}x
                      </div>
                      <div className="text-xs text-gray-500 dark:text-gray-400">ROI</div>
                    </div>
                    <div className="text-center p-3 bg-white dark:bg-gray-800 rounded border">
                      <div className="text-sm font-bold text-orange-600">
                        {rec.effort}
                      </div>
                      <div className="text-xs text-gray-500 dark:text-gray-400">Effort</div>
                    </div>
                  </div>

                  {rec.prerequisites.length > 0 && (
                    <div className="mb-4">
                      <h4 className="text-sm font-medium text-gray-900 dark:text-white mb-2">
                        Prerequisites:
                      </h4>
                      <div className="flex flex-wrap gap-2">
                        {rec.prerequisites.map((prereq, index) => (
                          <span key={index} className="text-xs bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 px-2 py-1 rounded">
                            {prereq}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}

                  <div className="flex justify-end space-x-2">
                    <Button size="sm" variant="outline">
                      Learn More
                    </Button>
                    <Button size="sm">
                      Create Goal
                    </Button>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </Modal>
      </div>
    </>
  );
};

export default MaturityTracker;