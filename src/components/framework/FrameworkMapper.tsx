import React, { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Shield, 
  GitBranch, 
  Target, 
  CheckCircle, 
  AlertTriangle, 
  Eye,
  Filter,
  Download,
  Plus,
  Search,
  BarChart3,
  Network,
  Zap,
  RefreshCw,
  Settings,
  Users,
  FileText,
  ArrowRight,
  X,
  ChevronDown,
  ChevronRight,
  Link2,
  Layers,
  Globe
} from 'lucide-react';
import { useGovernanceStore } from '../../stores/governanceStore';
import { Framework, ControlMapping } from '../../types/cybersoluce';
import EnhancedChart from '../charts/EnhancedChart';
import ControlEvidencePanel from './ControlEvidencePanel';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Badge } from '../ui/badge';
import { Progress } from '../ui/progress';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '../ui/tabs';
import { Tooltip } from '../ui/tooltip';
import { Modal } from '../ui/modal';
import EmptyState from '../common/EmptyState';

const FrameworkMapper: React.FC = () => {
  const {
    frameworks,
    selectedFrameworks,
    controlMappings,
    selectFramework,
    deselectFramework,
    getMappingsForControl
  } = useGovernanceStore();

  // State management
  const [activeTab, setActiveTab] = useState('overview');
  const [viewMode, setViewMode] = useState<'grid' | 'matrix' | 'network' | 'visual'>('grid');
  const [filterByStatus, setFilterByStatus] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [showMappingModal, setShowMappingModal] = useState(false);
  const [selectedMapping, setSelectedMapping] = useState<ControlMapping | null>(null);
  const [showAdvancedFilters, setShowAdvancedFilters] = useState(false);
  const [mappingAnalytics, setMappingAnalytics] = useState<any>(null);

  // Enhanced framework data with more realistic information
  const enhancedFrameworks = useMemo(() => 
    frameworks.map(framework => ({
      ...framework,
      controlsImplemented: Math.floor(Math.random() * 50) + 20,
      totalControls: Math.floor(Math.random() * 30) + 70,
      lastAssessment: new Date(Date.now() - Math.random() * 30 * 24 * 60 * 60 * 1000),
      mappingCompleteness: Math.floor(Math.random() * 40) + 60,
      criticalGaps: Math.floor(Math.random() * 5) + 1,
      riskScore: (Math.random() * 3 + 2).toFixed(1),
      compliancePercentage: Math.floor(Math.random() * 30) + 70
    })), [frameworks]
  );
  
  // Enhanced mock mappings with more details
  const enhancedMockMappings = [
    {
      id: 'map-1',
      sourceFramework: 'NIST CSF 2.0',
      sourceControl: 'GV.OC-1',
      targetFramework: 'ISO 27001',
      targetControl: 'A.5.1.1',
      mappingType: 'exact',
      confidence: 95,
      category: 'Governance',
      validatedBy: 'Security Team',
      validationDate: new Date('2024-02-15'),
      notes: 'Direct mapping between organizational context controls'
    },
    {
      id: 'map-2', 
      sourceFramework: 'NIST CSF 2.0',
      sourceControl: 'PR.AC-1',
      targetFramework: 'CMMC 2.0',
      targetControl: 'AC.L2-3.1.1',
      mappingType: 'partial',
      confidence: 82,
      category: 'Access Control',
      validatedBy: 'Compliance Officer',
      validationDate: new Date('2024-02-10'),
      notes: 'Partial overlap in access control requirements'
    },
    {
      id: 'map-3',
      sourceFramework: 'ISO 27001',
      sourceControl: 'A.12.1.2',
      targetFramework: 'GDPR',
      targetControl: 'Art. 32',
      mappingType: 'related',
      confidence: 78,
      category: 'Data Protection',
      validatedBy: 'Privacy Officer',
      validationDate: new Date('2024-02-20'),
      notes: 'Related controls for data security measures'
    },
    {
      id: 'map-4',
      sourceFramework: 'NIST CSF 2.0',
      sourceControl: 'DE.CM-1',
      targetFramework: 'CIS Controls v8',
      targetControl: 'CIS 6.1',
      mappingType: 'exact',
      confidence: 92,
      category: 'Monitoring',
      validatedBy: 'SOC Team',
      validationDate: new Date('2024-02-18'),
      notes: 'Continuous monitoring alignment'
    }
  ];

  // Enhanced analytics data
  useEffect(() => {
    const generateAnalytics = () => {
      setMappingAnalytics({
        totalMappings: enhancedMockMappings.length,
        exactMappings: enhancedMockMappings.filter(m => m.mappingType === 'exact').length,
        partialMappings: enhancedMockMappings.filter(m => m.mappingType === 'partial').length,
        relatedMappings: enhancedMockMappings.filter(m => m.mappingType === 'related').length,
        avgConfidence: Math.round(enhancedMockMappings.reduce((acc, m) => acc + m.confidence, 0) / enhancedMockMappings.length),
        categories: [...new Set(enhancedMockMappings.map(m => m.category))],
        frameworkCoverage: {
          'NIST CSF 2.0': 87,
          'ISO 27001': 92,
          'CMMC 2.0': 78,
          'GDPR': 85,
          'CIS Controls v8': 73
        }
      });
    };

    generateAnalytics();
  }, [enhancedMockMappings]);

  const handleExportMapping = async () => {
    setIsLoading(true);
    // Simulate export process
    setTimeout(() => {
      setIsLoading(false);
      // In real app, this would trigger download
      alert('Framework mapping exported successfully!');
    }, 2000);
  };

  const filteredMappings = enhancedMockMappings.filter(mapping => {
    const matchesStatus = filterByStatus === 'all' || mapping.mappingType === filterByStatus;
    const matchesSearch = !searchQuery || 
      mapping.sourceControl.toLowerCase().includes(searchQuery.toLowerCase()) ||
      mapping.targetControl.toLowerCase().includes(searchQuery.toLowerCase()) ||
      mapping.category.toLowerCase().includes(searchQuery.toLowerCase());
    
    return matchesStatus && matchesSearch;
  });

  const frameworkColors = {
    'nist-csf-2': 'bg-blue-100 text-blue-800 border-blue-200 dark:bg-blue-900/30 dark:text-blue-300',
    'iso-27001': 'bg-green-100 text-green-800 border-green-200 dark:bg-green-900/30 dark:text-green-300',
    'cmmc-2': 'bg-purple-100 text-purple-800 border-purple-200 dark:bg-purple-900/30 dark:text-purple-300',
    'cis-controls': 'bg-orange-100 text-orange-800 border-orange-200 dark:bg-orange-900/30 dark:text-orange-300',
    'gdpr': 'bg-indigo-100 text-indigo-800 border-indigo-200 dark:bg-indigo-900/30 dark:text-indigo-300',
  };

  const getMappingTypeColor = (type: string) => {
    switch (type) {
      case 'exact': return 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300';
      case 'partial': return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300';
      case 'related': return 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300';
      default: return 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300';
    }
  };

  const getConfidenceColor = (confidence: number) => {
    if (confidence >= 90) return 'text-green-600 dark:text-green-400';
    if (confidence >= 80) return 'text-blue-600 dark:text-blue-400';
    if (confidence >= 70) return 'text-yellow-600 dark:text-yellow-400';
    return 'text-red-600 dark:text-red-400';
  };

  return (
    <div className="space-y-6 p-6">
      {/* Enhanced Header with Actions */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
            Framework Fusion Technology™
          </h1>
          <p className="text-gray-600 dark:text-gray-300 mt-1">
            Advanced framework mapping and alignment with AI-powered crosswalk capabilities
          </p>
        </div>
        
        <div className="flex items-center space-x-3">
          <Button variant="outline" size="sm" onClick={() => setShowAdvancedFilters(!showAdvancedFilters)}>
            <Settings className="h-4 w-4 mr-2" />
            Advanced
          </Button>
          
          <Button variant="outline" size="sm">
            <RefreshCw className="h-4 w-4 mr-2" />
            Sync Frameworks
          </Button>
          
          <Button onClick={handleExportMapping} loading={isLoading}>
            <Download className="h-4 w-4 mr-2" />
            Export Mapping
          </Button>
        </div>
      </div>

      {/* Key Metrics Dashboard */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-900/20 dark:to-blue-800/20 rounded-lg shadow-lg p-6 border border-blue-200 dark:border-blue-800"
        >
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-sm font-medium text-blue-700 dark:text-blue-300">Total Mappings</h3>
            <GitBranch className="h-5 w-5 text-blue-600 dark:text-blue-400" />
          </div>
          <div className="text-2xl font-bold text-blue-900 dark:text-blue-100">
            {mappingAnalytics?.totalMappings || 0}
          </div>
          <div className="text-xs text-blue-600 dark:text-blue-400 mt-1">
            Across {selectedFrameworks.length} frameworks
          </div>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-gradient-to-br from-green-50 to-green-100 dark:from-green-900/20 dark:to-green-800/20 rounded-lg shadow-lg p-6 border border-green-200 dark:border-green-800"
        >
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-sm font-medium text-green-700 dark:text-green-300">Exact Matches</h3>
            <CheckCircle className="h-5 w-5 text-green-600 dark:text-green-400" />
          </div>
          <div className="text-2xl font-bold text-green-900 dark:text-green-100">
            {mappingAnalytics?.exactMappings || 0}
          </div>
          <div className="text-xs text-green-600 dark:text-green-400 mt-1">
            High confidence mappings
          </div>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-gradient-to-br from-yellow-50 to-yellow-100 dark:from-yellow-900/20 dark:to-yellow-800/20 rounded-lg shadow-lg p-6 border border-yellow-200 dark:border-yellow-800"
        >
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-sm font-medium text-yellow-700 dark:text-yellow-300">Partial Matches</h3>
            <AlertTriangle className="h-5 w-5 text-yellow-600 dark:text-yellow-400" />
          </div>
          <div className="text-2xl font-bold text-yellow-900 dark:text-yellow-100">
            {mappingAnalytics?.partialMappings || 0}
          </div>
          <div className="text-xs text-yellow-600 dark:text-yellow-400 mt-1">
            Require review
          </div>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-gradient-to-br from-purple-50 to-purple-100 dark:from-purple-900/20 dark:to-purple-800/20 rounded-lg shadow-lg p-6 border border-purple-200 dark:border-purple-800"
        >
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-sm font-medium text-purple-700 dark:text-purple-300">Avg. Confidence</h3>
            <Target className="h-5 w-5 text-purple-600 dark:text-purple-400" />
          </div>
          <div className="text-2xl font-bold text-purple-900 dark:text-purple-100">
            {mappingAnalytics?.avgConfidence || 0}%
          </div>
          <div className="text-xs text-purple-600 dark:text-purple-400 mt-1">
            Mapping accuracy
          </div>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="bg-gradient-to-br from-indigo-50 to-indigo-100 dark:from-indigo-900/20 dark:to-indigo-800/20 rounded-lg shadow-lg p-6 border border-indigo-200 dark:border-indigo-800"
        >
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-sm font-medium text-indigo-700 dark:text-indigo-300">Coverage Score</h3>
            <BarChart3 className="h-5 w-5 text-indigo-600 dark:text-indigo-400" />
          </div>
          <div className="text-2xl font-bold text-indigo-900 dark:text-indigo-100">
            87%
          </div>
          <div className="text-xs text-indigo-600 dark:text-indigo-400 mt-1">
            Framework alignment
          </div>
        </motion.div>
      </div>

      {/* Advanced Filters */}
      <AnimatePresence>
        {showAdvancedFilters && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 border border-gray-200 dark:border-gray-700"
          >
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Mapping Type
                </label>
                <select
                  value={filterByStatus}
                  onChange={(e) => setFilterByStatus(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-800"
                >
                  <option value="all">All Types</option>
                  <option value="exact">Exact Matches</option>
                  <option value="partial">Partial Matches</option>
                  <option value="related">Related Controls</option>
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Category
                </label>
                <select className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-800">
                  <option value="all">All Categories</option>
                  <option value="governance">Governance</option>
                  <option value="access-control">Access Control</option>
                  <option value="data-protection">Data Protection</option>
                  <option value="monitoring">Monitoring</option>
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Confidence Level
                </label>
                <select className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-800">
                  <option value="all">All Levels</option>
                  <option value="high">High (90%+)</option>
                  <option value="medium">Medium (70-89%)</option>
                  <option value="low">Low (&lt;70%)</option>
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Validation Status
                </label>
                <select className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-800">
                  <option value="all">All Status</option>
                  <option value="validated">Validated</option>
                  <option value="pending">Pending Review</option>
                  <option value="rejected">Needs Revision</option>
                </select>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main Content Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="frameworks">Frameworks</TabsTrigger>
          <TabsTrigger value="mappings">Mappings</TabsTrigger>
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
          <TabsTrigger value="gaps">Gap Analysis</TabsTrigger>
        </TabsList>

        {/* Overview Tab */}
        <TabsContent value="overview" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Framework Coverage Chart */}
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 border border-gray-200 dark:border-gray-700">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                Framework Coverage Analysis
              </h3>
              {mappingAnalytics?.frameworkCoverage && (
                <EnhancedChart
                  type="bar"
                  data={{
                    labels: Object.keys(mappingAnalytics.frameworkCoverage),
                    datasets: [{
                      label: 'Coverage %',
                      data: Object.values(mappingAnalytics.frameworkCoverage),
                      backgroundColor: [
                        'rgba(59, 130, 246, 0.7)',
                        'rgba(16, 185, 129, 0.7)',
                        'rgba(147, 51, 234, 0.7)',
                        'rgba(245, 158, 11, 0.7)',
                        'rgba(99, 102, 241, 0.7)'
                      ],
                      borderColor: [
                        'rgba(59, 130, 246, 1)',
                        'rgba(16, 185, 129, 1)',
                        'rgba(147, 51, 234, 1)',
                        'rgba(245, 158, 11, 1)',
                        'rgba(99, 102, 241, 1)'
                      ],
                      borderWidth: 2
                    }]
                  }}
                  options={{
                    responsive: true,
                    scales: {
                      y: {
                        beginAtZero: true,
                        max: 100,
                        ticks: {
                          callback: function(value) {
                            return value + '%';
                          }
                        }
                      }
                    }
                  }}
                  height={250}
                />
              )}
            </div>

            {/* Mapping Quality Distribution */}
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 border border-gray-200 dark:border-gray-700">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                Mapping Quality Distribution
              </h3>
              <EnhancedChart
                type="doughnut"
                data={{
                  labels: ['Exact Match', 'Partial Match', 'Related', 'No Mapping'],
                  datasets: [{
                    data: [
                      mappingAnalytics?.exactMappings || 0,
                      mappingAnalytics?.partialMappings || 0,
                      mappingAnalytics?.relatedMappings || 0,
                      5 // Placeholder for unmapped controls
                    ],
                    backgroundColor: [
                      'rgba(16, 185, 129, 0.8)',
                      'rgba(245, 158, 11, 0.8)',
                      'rgba(59, 130, 246, 0.8)',
                      'rgba(156, 163, 175, 0.8)'
                    ],
                    borderWidth: 2,
                    borderColor: '#ffffff'
                  }]
                }}
                height={250}
              />
            </div>
          </div>

          {/* Quick Actions */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <motion.div
              whileHover={{ scale: 1.02 }}
              className="bg-gradient-to-br from-green-50 to-green-100 dark:from-green-900/20 dark:to-green-800/20 rounded-lg p-6 border border-green-200 dark:border-green-800 cursor-pointer"
              onClick={() => setShowMappingModal(true)}
            >
              <div className="flex items-center justify-between mb-3">
                <h3 className="font-semibold text-green-900 dark:text-green-100">Create New Mapping</h3>
                <Plus className="h-5 w-5 text-green-600 dark:text-green-400" />
              </div>
              <p className="text-sm text-green-700 dark:text-green-300">
                Map controls between selected frameworks with AI assistance
              </p>
            </motion.div>

            <motion.div
              whileHover={{ scale: 1.02 }}
              className="bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-900/20 dark:to-blue-800/20 rounded-lg p-6 border border-blue-200 dark:border-blue-800 cursor-pointer"
            >
              <div className="flex items-center justify-between mb-3">
                <h3 className="font-semibold text-blue-900 dark:text-blue-100">AI Mapping Assistant</h3>
                <Zap className="h-5 w-5 text-blue-600 dark:text-blue-400" />
              </div>
              <p className="text-sm text-blue-700 dark:text-blue-300">
                Let AI automatically suggest control mappings based on content analysis
              </p>
            </motion.div>

            <motion.div
              whileHover={{ scale: 1.02 }}
              className="bg-gradient-to-br from-purple-50 to-purple-100 dark:from-purple-900/20 dark:to-purple-800/20 rounded-lg p-6 border border-purple-200 dark:border-purple-800 cursor-pointer"
            >
              <div className="flex items-center justify-between mb-3">
                <h3 className="font-semibold text-purple-900 dark:text-purple-100">Import Mappings</h3>
                <FileText className="h-5 w-5 text-purple-600 dark:text-purple-400" />
              </div>
              <p className="text-sm text-purple-700 dark:text-purple-300">
                Import existing framework mappings from CSV or industry templates
              </p>
            </motion.div>
          </div>
        </TabsContent>

        {/* Frameworks Tab */}
        <TabsContent value="frameworks" className="space-y-6">
          {/* Enhanced Framework Selection */}
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 border border-gray-200 dark:border-gray-700">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
                Available Frameworks
              </h2>
              <div className="flex items-center space-x-3">
                <Input
                  placeholder="Search frameworks..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-64"
                />
                <Button variant="outline">
                  <Globe className="h-4 w-4 mr-2" />
                  Regional Filter
                </Button>
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {enhancedFrameworks.map((framework) => (
                <motion.div
                  key={framework.id}
                  whileHover={{ scale: 1.02, y: -2 }}
                  className={`border-2 rounded-xl p-6 cursor-pointer transition-all duration-300 ${
                    selectedFrameworks.includes(framework.id)
                      ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20 shadow-lg'
                      : 'border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600 hover:shadow-md'
                  }`}
                  onClick={() => {
                    selectedFrameworks.includes(framework.id)
                      ? deselectFramework(framework.id)
                      : selectFramework(framework.id);
                  }}
                >
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-2">
                        <h3 className="font-semibold text-gray-900 dark:text-white text-lg">
                          {framework.name}
                        </h3>
                        {selectedFrameworks.includes(framework.id) && (
                          <CheckCircle className="h-6 w-6 text-blue-600 dark:text-blue-400" />
                        )}
                      </div>
                      <div className="flex items-center space-x-2 mb-2">
                        <Badge variant="secondary" size="sm">v{framework.version}</Badge>
                        <Badge variant="outline" size="sm">{framework.region?.toUpperCase() || 'GLOBAL'}</Badge>
                      </div>
                    </div>
                  </div>
                  
                  <p className="text-sm text-gray-700 dark:text-gray-300 mb-4">
                    {framework.description}
                  </p>
                  
                  {/* Enhanced metrics */}
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-xs text-gray-500 dark:text-gray-400">Implementation</span>
                      <span className="text-xs font-medium text-gray-900 dark:text-white">
                        {framework.controlsImplemented}/{framework.totalControls}
                      </span>
                    </div>
                    <Progress 
                      value={(framework.controlsImplemented / framework.totalControls) * 100} 
                      size="sm"
                      color={framework.controlsImplemented / framework.totalControls >= 0.8 ? 'success' : 
                             framework.controlsImplemented / framework.totalControls >= 0.6 ? 'warning' : 'danger'}
                    />
                    
                    <div className="grid grid-cols-3 gap-2 text-xs">
                      <div className="text-center">
                        <div className="font-medium text-gray-900 dark:text-white">{framework.mappingCompleteness}%</div>
                        <div className="text-gray-500 dark:text-gray-400">Mapped</div>
                      </div>
                      <div className="text-center">
                        <div className="font-medium text-red-600 dark:text-red-400">{framework.criticalGaps}</div>
                        <div className="text-gray-500 dark:text-gray-400">Gaps</div>
                      </div>
                      <div className="text-center">
                        <div className="font-medium text-blue-600 dark:text-blue-400">{framework.riskScore}</div>
                        <div className="text-gray-500 dark:text-gray-400">Risk</div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </TabsContent>

        {/* Mappings Tab */}
        <TabsContent value="mappings" className="space-y-6">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700">
            <div className="p-6 border-b border-gray-200 dark:border-gray-700">
              <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
                  Control Mapping Matrix
                </h2>
                
                <div className="flex items-center space-x-3">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                    <Input
                      placeholder="Search mappings..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="pl-10 w-64"
                    />
                  </div>
                  
                  <select
                    value={viewMode}
                    onChange={(e) => setViewMode(e.target.value as any)}
                    className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-800"
                  >
                    <option value="grid">Grid View</option>
                    <option value="matrix">Matrix View</option>
                    <option value="network">Network View</option>
                    <option value="visual">Visual Mapper</option>
                  </select>
                  
                  <Button size="sm" onClick={() => setShowMappingModal(true)}>
                    <Plus className="h-4 w-4 mr-2" />
                    Add Mapping
                  </Button>
                </div>
              </div>
            </div>

            {/* Mapping Content */}
            <div className="p-6">
              {viewMode === 'matrix' && (
                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                    <thead>
                      <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                          Source Control
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                          Target Control
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                          Type
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                          Confidence
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                          Category
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                          Actions
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
                      {filteredMappings.map((mapping) => (
                        <motion.tr 
                          key={mapping.id} 
                          className="hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                        >
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div>
                              <div className="text-sm font-medium text-gray-900 dark:text-white">
                                {mapping.sourceControl}
                              </div>
                              <div className="text-xs text-gray-500 dark:text-gray-400">
                                {mapping.sourceFramework}
                              </div>
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div>
                              <div className="text-sm font-medium text-gray-900 dark:text-white">
                                {mapping.targetControl}
                              </div>
                              <div className="text-xs text-gray-500 dark:text-gray-400">
                                {mapping.targetFramework}
                              </div>
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <Badge className={getMappingTypeColor(mapping.mappingType)} size="sm">
                              {mapping.mappingType}
                            </Badge>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="flex items-center">
                              <div className="w-16 bg-gray-200 dark:bg-gray-700 rounded-full h-2 mr-2">
                                <div 
                                  className="bg-blue-600 dark:bg-blue-500 h-2 rounded-full transition-all duration-300"
                                  style={{ width: `${mapping.confidence}%` }}
                                />
                              </div>
                              <span className={`text-sm font-medium ${getConfidenceColor(mapping.confidence)}`}>
                                {mapping.confidence}%
                              </span>
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <Badge variant="outline" size="sm">
                              {mapping.category}
                            </Badge>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium space-x-2">
                            <Tooltip content="View details">
                              <Button 
                                variant="ghost" 
                                size="sm"
                                onClick={() => setSelectedMapping(mapping)}
                              >
                                <Eye className="h-4 w-4" />
                              </Button>
                            </Tooltip>
                            <Tooltip content="Edit mapping">
                              <Button variant="ghost" size="sm">
                                <Settings className="h-4 w-4" />
                              </Button>
                            </Tooltip>
                          </td>
                        </motion.tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}

              {viewMode === 'visual' && (
                <div className="bg-gray-50 dark:bg-gray-900 rounded-lg p-8 text-center">
                  <Network className="h-16 w-16 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
                    Visual Mapping Interface
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400 mb-6">
                    Interactive drag-and-drop interface for creating control mappings between frameworks
                  </p>
                  <Button>
                    <Layers className="h-4 w-4 mr-2" />
                    Launch Visual Mapper
                  </Button>
                </div>
              )}

              {(viewMode === 'grid' || viewMode === 'network') && (
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  {selectedFrameworks.slice(0, 2).map((frameworkId) => {
                    const framework = enhancedFrameworks.find(f => f.id === frameworkId);
                    if (!framework) return null;

                    return (
                      <div key={frameworkId} className="border border-gray-200 dark:border-gray-700 rounded-lg p-6">
                        <div className="flex items-center justify-between mb-4">
                          <h3 className="font-semibold text-gray-900 dark:text-white">
                            {framework.name}
                          </h3>
                          <Badge className={frameworkColors[framework.id as keyof typeof frameworkColors] || 'bg-gray-100 text-gray-800'}>
                            {framework.controls?.length || 0} controls
                          </Badge>
                        </div>
                        
                        <div className="space-y-3 max-h-96 overflow-y-auto">
                          {framework.controls?.slice(0, 10).map((control) => {
                            const mappings = getMappingsForControl(control.id);
                            return (
                              <motion.div 
                                key={control.id}
                                whileHover={{ scale: 1.01 }}
                                className="p-4 border border-gray-100 dark:border-gray-700 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                              >
                                <div className="flex items-start justify-between">
                                  <div className="flex-1">
                                    <div className="flex items-center space-x-2 mb-2">
                                      <Badge variant="outline" size="sm">{control.id}</Badge>
                                      <Badge 
                                        size="sm"
                                        className={
                                          control.status === 'implemented' ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300' :
                                          control.status === 'in-progress' ? 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300' :
                                          control.status === 'verified' ? 'bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-300' :
                                          'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300'
                                        }
                                      >
                                        {control.status}
                                      </Badge>
                                      {mappings.length > 0 && (
                                        <span className="inline-flex px-2 py-0.5 text-xs rounded bg-action-cyan-50 text-action-cyan-700 dark:bg-action-cyan-900/30 dark:text-action-cyan-300">
                                          {mappings.length} mapped
                                        </span>
                                      )}
                                    </div>
                                    <p className="font-medium text-gray-900 dark:text-white text-sm mb-1">
                                      {control.title}
                                    </p>
                                    <p className="text-xs text-gray-600 dark:text-gray-400 mb-2">
                                      Maturity Level: {control.maturityLevel}/5
                                    </p>
                                    {control.frameworkId === 'nist-csf-2' && (
                                      <div className="mt-2 pt-2 border-t border-gray-200 dark:border-gray-700">
                                        <ControlEvidencePanel
                                          controlId={control.id}
                                          frameworkId={control.frameworkId}
                                        />
                                      </div>
                                    )}
                                  </div>
                                  
                                  <Tooltip content="Create mapping">
                                    <Button variant="ghost" size="sm">
                                      <Link2 className="h-4 w-4" />
                                    </Button>
                                  </Tooltip>
                                </div>
                              </motion.div>
                            );
                          })}
                          
                          {(framework.controls?.length || 0) > 10 && (
                            <div className="text-center pt-4">
                              <Button variant="outline" size="sm">
                                View All {framework.controls?.length} Controls
                                <ChevronDown className="h-4 w-4 ml-2" />
                              </Button>
                            </div>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          </div>
        </TabsContent>

        {/* Analytics Tab */}
        <TabsContent value="analytics" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Mapping Trends */}
            <div className="lg:col-span-2 bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 border border-gray-200 dark:border-gray-700">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                Mapping Progress Over Time
              </h3>
              <EnhancedChart
                type="line"
                data={{
                  labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
                  datasets: [
                    {
                      label: 'Total Mappings',
                      data: [45, 52, 61, 78, 89, 94],
                      borderColor: 'rgb(59, 130, 246)',
                      backgroundColor: 'rgba(59, 130, 246, 0.1)',
                      tension: 0.4,
                      fill: true
                    },
                    {
                      label: 'Validated Mappings',
                      data: [32, 38, 45, 58, 67, 74],
                      borderColor: 'rgb(16, 185, 129)',
                      backgroundColor: 'rgba(16, 185, 129, 0.1)',
                      tension: 0.4,
                      fill: true
                    }
                  ]
                }}
                options={{
                  responsive: true,
                  interaction: {
                    mode: 'index' as const,
                    intersect: false,
                  },
                  scales: {
                    y: {
                      beginAtZero: true,
                      title: {
                        display: true,
                        text: 'Number of Mappings'
                      }
                    }
                  }
                }}
                height={300}
              />
            </div>

            {/* Mapping Quality Metrics */}
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 border border-gray-200 dark:border-gray-700">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-6">
                Mapping Quality Metrics
              </h3>
              
              <div className="space-y-6">
                <div>
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm text-gray-600 dark:text-gray-400">Accuracy Rate</span>
                    <span className="text-sm font-medium text-gray-900 dark:text-white">94%</span>
                  </div>
                  <Progress value={94} color="success" size="sm" />
                </div>
                
                <div>
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm text-gray-600 dark:text-gray-400">Validation Rate</span>
                    <span className="text-sm font-medium text-gray-900 dark:text-white">87%</span>
                  </div>
                  <Progress value={87} color="default" size="sm" />
                </div>
                
                <div>
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm text-gray-600 dark:text-gray-400">Coverage Depth</span>
                    <span className="text-sm font-medium text-gray-900 dark:text-white">76%</span>
                  </div>
                  <Progress value={76} color="warning" size="sm" />
                </div>
                
                <div className="pt-4 border-t border-gray-200 dark:border-gray-700">
                  <h4 className="font-medium text-gray-900 dark:text-white mb-3">Quality Insights</h4>
                  <div className="space-y-2 text-sm">
                    <div className="flex items-center text-green-600 dark:text-green-400">
                      <CheckCircle className="h-4 w-4 mr-2" />
                      High mapping accuracy across core controls
                    </div>
                    <div className="flex items-center text-yellow-600 dark:text-yellow-400">
                      <AlertTriangle className="h-4 w-4 mr-2" />
                      Some partial mappings need validation
                    </div>
                    <div className="flex items-center text-blue-600 dark:text-blue-400">
                      <Target className="h-4 w-4 mr-2" />
                      Opportunity for deeper control alignment
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </TabsContent>

        {/* Gap Analysis Tab */}
        <TabsContent value="gaps" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2 space-y-6">
              {/* Framework Comparison */}
              <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 border border-gray-200 dark:border-gray-700">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-6">
                  Cross-Framework Gap Analysis
                </h3>
                
                {selectedFrameworks.length >= 2 ? (
                  <div className="space-y-4">
                    {selectedFrameworks.map((frameworkId) => {
                      const framework = enhancedFrameworks.find(f => f.id === frameworkId);
                      if (!framework) return null;

                      const implementationRate = (framework.controlsImplemented / framework.totalControls) * 100;

                      return (
                        <div key={frameworkId} className="border border-gray-200 dark:border-gray-700 rounded-lg p-4">
                          <div className="flex items-center justify-between mb-3">
                            <div className="flex items-center space-x-3">
                              <h4 className="font-medium text-gray-900 dark:text-white">
                                {framework.name}
                              </h4>
                              <Badge variant="outline" size="sm">
                                Risk: {framework.riskScore}
                              </Badge>
                            </div>
                            <div className="text-sm text-gray-600 dark:text-gray-400">
                              {framework.controlsImplemented}/{framework.totalControls} implemented
                            </div>
                          </div>
                          
                          <div className="grid grid-cols-3 gap-4 mb-4">
                            <div className="text-center">
                              <div className="text-lg font-bold text-green-600 dark:text-green-400">
                                {framework.controlsImplemented}
                              </div>
                              <div className="text-xs text-gray-500 dark:text-gray-400">Implemented</div>
                            </div>
                            <div className="text-center">
                              <div className="text-lg font-bold text-yellow-600 dark:text-yellow-400">
                                {Math.floor((framework.totalControls - framework.controlsImplemented) * 0.6)}
                              </div>
                              <div className="text-xs text-gray-500 dark:text-gray-400">In Progress</div>
                            </div>
                            <div className="text-center">
                              <div className="text-lg font-bold text-red-600 dark:text-red-400">
                                {framework.criticalGaps}
                              </div>
                              <div className="text-xs text-gray-500 dark:text-gray-400">Critical Gaps</div>
                            </div>
                          </div>
                          
                          <Progress
                            value={implementationRate}
                            color={implementationRate >= 80 ? 'success' : implementationRate >= 60 ? 'warning' : 'danger'}
                            showLabel
                          />
                        </div>
                      );
                    })}
                  </div>
                ) : (
                  <EmptyState
                    icon={GitBranch}
                    title="Select Frameworks to Compare"
                    description="Choose at least 2 frameworks to perform gap analysis and identify implementation differences."
                    action={{
                      label: "Go to Frameworks",
                      onClick: () => setActiveTab('frameworks')
                    }}
                  />
                )}
              </div>
            </div>
            
            {/* Critical Gaps Summary */}
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 border border-gray-200 dark:border-gray-700">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-6">
                Critical Gaps Identified
              </h3>
              
              <div className="space-y-4">
                {[
                  {
                    control: 'Multi-factor Authentication',
                    frameworks: ['NIST CSF', 'ISO 27001'],
                    priority: 'Critical',
                    impact: 'High'
                  },
                  {
                    control: 'Incident Response Procedures',
                    frameworks: ['CMMC 2.0', 'CIS Controls'],
                    priority: 'High',
                    impact: 'Medium'
                  },
                  {
                    control: 'Data Encryption Standards',
                    frameworks: ['GDPR', 'ISO 27001'],
                    priority: 'Medium',
                    impact: 'High'
                  },
                  {
                    control: 'Vendor Risk Management',
                    frameworks: ['NIST CSF', 'CMMC 2.0'],
                    priority: 'Medium',
                    impact: 'Medium'
                  }
                ].map((gap, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="p-4 bg-red-50 dark:bg-red-900/20 rounded-lg border border-red-200 dark:border-red-800"
                  >
                    <div className="flex items-start justify-between mb-2">
                      <h4 className="font-medium text-red-900 dark:text-red-100 text-sm">
                        {gap.control}
                      </h4>
                      <Badge 
                        className={
                          gap.priority === 'Critical' ? 'bg-red-100 text-red-800 dark:bg-red-900/50 dark:text-red-300' :
                          gap.priority === 'High' ? 'bg-orange-100 text-orange-800 dark:bg-orange-900/50 dark:text-orange-300' :
                          'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/50 dark:text-yellow-300'
                        }
                        size="sm"
                      >
                        {gap.priority}
                      </Badge>
                    </div>
                    <div className="flex flex-wrap gap-1 mb-2">
                      {gap.frameworks.map(fw => (
                        <Badge key={fw} variant="outline" size="sm" className="text-xs">
                          {fw}
                        </Badge>
                      ))}
                    </div>
                    <div className="text-xs text-red-700 dark:text-red-300">
                      Impact: {gap.impact}
                    </div>
                  </motion.div>
                ))}
              </div>
              
              <div className="mt-6 pt-4 border-t border-gray-200 dark:border-gray-700">
                <Button className="w-full" size="sm">
                  <FileText className="h-4 w-4 mr-2" />
                  Generate Gap Analysis Report
                </Button>
              </div>
            </div>
          </div>
        </TabsContent>
      </Tabs>

      {/* Mapping Detail Modal */}
      <Modal
        isOpen={!!selectedMapping}
        onClose={() => setSelectedMapping(null)}
        title="Mapping Details"
        size="lg"
      >
        {selectedMapping && (
          <div className="space-y-6">
            <div className="grid grid-cols-2 gap-6">
              <div className="space-y-4">
                <div>
                  <h4 className="font-medium text-gray-900 dark:text-white mb-2">Source Control</h4>
                  <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-200 dark:border-blue-800">
                    <div className="font-medium text-blue-900 dark:text-blue-100">
                      {selectedMapping.sourceControl}
                    </div>
                    <div className="text-sm text-blue-700 dark:text-blue-300">
                      {selectedMapping.sourceFramework}
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="space-y-4">
                <div>
                  <h4 className="font-medium text-gray-900 dark:text-white mb-2">Target Control</h4>
                  <div className="p-4 bg-green-50 dark:bg-green-900/20 rounded-lg border border-green-200 dark:border-green-800">
                    <div className="font-medium text-green-900 dark:text-green-100">
                      {selectedMapping.targetControl}
                    </div>
                    <div className="text-sm text-green-700 dark:text-green-300">
                      {selectedMapping.targetFramework}
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="grid grid-cols-3 gap-4">
              <div>
                <h4 className="font-medium text-gray-900 dark:text-white mb-2">Mapping Type</h4>
                <Badge className={getMappingTypeColor(selectedMapping.mappingType)}>
                  {selectedMapping.mappingType}
                </Badge>
              </div>
              <div>
                <h4 className="font-medium text-gray-900 dark:text-white mb-2">Confidence</h4>
                <div className={`text-lg font-bold ${getConfidenceColor(selectedMapping.confidence)}`}>
                  {selectedMapping.confidence}%
                </div>
              </div>
              <div>
                <h4 className="font-medium text-gray-900 dark:text-white mb-2">Category</h4>
                <Badge variant="outline">{selectedMapping.category}</Badge>
              </div>
            </div>
            
            {selectedMapping.notes && (
              <div>
                <h4 className="font-medium text-gray-900 dark:text-white mb-2">Notes</h4>
                <p className="text-sm text-gray-600 dark:text-gray-400 p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                  {selectedMapping.notes}
                </p>
              </div>
            )}
            
            <div className="flex justify-end space-x-3 pt-4 border-t border-gray-200 dark:border-gray-700">
              <Button variant="outline" onClick={() => setSelectedMapping(null)}>
                Close
              </Button>
              <Button>
                <Settings className="h-4 w-4 mr-2" />
                Edit Mapping
              </Button>
            </div>
          </div>
        )}
      </Modal>

      {/* Add Mapping Modal */}
      <Modal
        isOpen={showMappingModal}
        onClose={() => setShowMappingModal(false)}
        title="Create New Control Mapping"
        size="xl"
      >
        <div className="space-y-6">
          <div className="grid grid-cols-2 gap-6">
            <div>
              <h4 className="font-medium text-gray-900 dark:text-white mb-4">Source Framework</h4>
              <div className="space-y-2">
                <select className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-800">
                  <option value="">Select source framework</option>
                  {enhancedFrameworks.map(fw => (
                    <option key={fw.id} value={fw.id}>{fw.name}</option>
                  ))}
                </select>
                <select className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-800">
                  <option value="">Select source control</option>
                </select>
              </div>
            </div>
            
            <div>
              <h4 className="font-medium text-gray-900 dark:text-white mb-4">Target Framework</h4>
              <div className="space-y-2">
                <select className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-800">
                  <option value="">Select target framework</option>
                  {enhancedFrameworks.map(fw => (
                    <option key={fw.id} value={fw.id}>{fw.name}</option>
                  ))}
                </select>
                <select className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-800">
                  <option value="">Select target control</option>
                </select>
              </div>
            </div>
          </div>
          
          <div className="grid grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Mapping Type
              </label>
              <select className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-800">
                <option value="exact">Exact Match</option>
                <option value="partial">Partial Match</option>
                <option value="related">Related Control</option>
              </select>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Confidence Level
              </label>
              <input
                type="range"
                min="0"
                max="100"
                defaultValue="80"
                className="w-full"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Category
              </label>
              <select className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-800">
                <option value="governance">Governance</option>
                <option value="access-control">Access Control</option>
                <option value="data-protection">Data Protection</option>
                <option value="monitoring">Monitoring</option>
              </select>
            </div>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Mapping Notes
            </label>
            <textarea
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-800"
              rows={3}
              placeholder="Add notes about this mapping relationship..."
            />
          </div>
          
          <div className="flex justify-end space-x-3 pt-4 border-t border-gray-200 dark:border-gray-700">
            <Button variant="outline" onClick={() => setShowMappingModal(false)}>
              Cancel
            </Button>
            <Button onClick={() => setShowMappingModal(false)}>
              <CheckCircle className="h-4 w-4 mr-2" />
              Create Mapping
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default FrameworkMapper;