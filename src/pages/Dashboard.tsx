 import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import {
  Shield,
  CheckCircle,
  Brain,
  Clock,
  Eye,
  GitBranch,
  Target,
  DollarSign,
  Users,
  FileText,
  BarChart3,
  CheckSquare
} from 'lucide-react';
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip
} from 'recharts';
import { Link } from 'react-router-dom';
import { useGovernanceStore } from '../stores/governanceStore';
import { mockExecutiveMetrics, mockIntelligenceInsights, mockIntegrationData } from '../data/mockData';
import NistCsfMaturityPanel from '../components/executive/NistCsfMaturityPanel';
import { generateNistCsfBoardReport } from '../services/reporting/nistCsfReport';

const Dashboard: React.FC = () => {
  const { governanceItems, frameworks } = useGovernanceStore();
  const [isLoading, setIsLoading] = useState(true);
  const [timeRange, setTimeRange] = useState<'24h' | '7d' | '30d'>('7d');
  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    // Simulate loading executive dashboard data
    setTimeout(() => setIsLoading(false), 1000);
  }, []);

  // Mock trend data
  const trendData = [
    { date: '2024-02-15', riskScore: 7.8, compliance: 78, maturity: 2.9 },
    { date: '2024-02-16', riskScore: 7.5, compliance: 80, maturity: 3.0 },
    { date: '2024-02-17', riskScore: 7.3, compliance: 81, maturity: 3.0 },
    { date: '2024-02-18', riskScore: 7.1, compliance: 82, maturity: 3.1 },
    { date: '2024-02-19', riskScore: 7.0, compliance: 83, maturity: 3.1 },
    { date: '2024-02-20', riskScore: 6.8, compliance: 84, maturity: 3.2 },
    { date: '2024-02-21', riskScore: 7.2, compliance: 82, maturity: 3.1 },
  ];

  // Get unacknowledged insights count
  const unacknowledgedInsights = mockIntelligenceInsights.filter(i => !i.acknowledged).length;
  
  // Get overdue tasks count
  const overdueTasks = governanceItems.filter(item => 
    item.status !== 'completed' && new Date(item.dueDate) < new Date()
  ).length;

  const handleRefresh = () => {
    setRefreshing(true);
    setTimeout(() => setRefreshing(false), 2000);
  };

  const handleExportReport = () => {
    try {
      const html = generateNistCsfBoardReport({
        includeEvidence: true,
        includeMappings: true,
      });
      const blob = new Blob([html], { type: "text/html" });
      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = `cybersoluce-nist-csf-board-report-${new Date()
        .toISOString()
        .slice(0, 10)}.html`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
    } catch (err) {
      console.error("Failed to generate report:", err);
      alert("Failed to generate report. Please ensure NIST CSF framework is loaded.");
    }
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-command-blue-600"></div>
      </div>
    );
  }

  return (
      <div className="space-y-6 p-6">
        {/* Dashboard Header */}
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
              Governance Command Center
            </h1>
            <p className="text-gray-600 dark:text-gray-300 mt-1">
              360° Cybersecurity Governance Intelligence
            </p>
          </div>
          
          <div className="flex items-center space-x-3">
            <select
              value={timeRange}
              onChange={(e) => setTimeRange(e.target.value as any)}
              className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-800"
              aria-label="Select time range"
            >
              <option value="24h">Last 24 Hours</option>
              <option value="7d">Last 7 Days</option>
              <option value="30d">Last 30 Days</option>
            </select>
            
            <button 
              onClick={handleExportReport}
              className="px-4 py-2 bg-command-blue-600 text-white rounded-md hover:bg-command-blue-700 flex items-center space-x-2"
            >
              <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
              </svg>
              <span>Export NIST CSF Board Report</span>
            </button>
            
            <button 
              onClick={handleRefresh}
              disabled={refreshing}
              className="px-4 py-2 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-md hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors disabled:opacity-50"
            >
              {refreshing ? 'Refreshing...' : 'Refresh Data'}
            </button>
          </div>
        </div>

        {/* Executive Summary Cards */}
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Overall Risk Score</p>
                <p className="text-3xl font-bold text-red-600">
                  {mockExecutiveMetrics.overallRiskScore}/10
                </p>
                <p className="text-xs text-red-500 mt-1">-0.6 from last week</p>
              </div>
              <div className="bg-red-100 dark:bg-red-900/30 p-3 rounded-full">
                <Shield className="h-8 w-8 text-red-600 dark:text-red-400" />
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
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Compliance Score</p>
                <p className="text-3xl font-bold text-green-600">
                  {Math.round(mockExecutiveMetrics.complianceStatus.reduce((acc, c) => acc + c.percentage, 0) / mockExecutiveMetrics.complianceStatus.length)}%
                </p>
                <p className="text-xs text-green-500 mt-1">+4% from last month</p>
              </div>
              <div className="bg-green-100 dark:bg-green-900/30 p-3 rounded-full">
                <CheckCircle className="h-8 w-8 text-green-600 dark:text-green-400" />
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
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Intelligence Alerts</p>
                <p className="text-3xl font-bold text-action-cyan-400">
                  {unacknowledgedInsights}
                </p>
                <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">Require attention</p>
              </div>
              <div className="bg-action-cyan-100 dark:bg-action-cyan-900/30 p-3 rounded-full">
                <Brain className="h-8 w-8 text-action-cyan-400" />
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
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Overdue Tasks</p>
                <p className="text-3xl font-bold text-orange-600">
                  {overdueTasks}
                </p>
                <p className="text-xs text-orange-500 mt-1">Need immediate attention</p>
              </div>
              <div className="bg-orange-100 dark:bg-orange-900/30 p-3 rounded-full">
                <Clock className="h-8 w-8 text-orange-600 dark:text-orange-400" />
              </div>
            </div>
          </motion.div>
        </div>

        {/* Main Content Grid */}
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Risk & Compliance Trends */}
          <div className="lg:col-span-2 bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
                Governance Intelligence Trends
              </h2>
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 bg-command-blue-600 rounded-full"></div>
                <span className="text-sm text-gray-600 dark:text-gray-400">Risk Score</span>
                <div className="w-3 h-3 bg-action-cyan-400 rounded-full ml-4"></div>
                <span className="text-sm text-gray-600 dark:text-gray-400">Compliance</span>
              </div>
            </div>
            
            <ResponsiveContainer width="100%" height={300}>
              <AreaChart data={trendData}>
                <defs>
                  <linearGradient id="riskGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#005B96" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#005B96" stopOpacity={0}/>
                  </linearGradient>
                  <linearGradient id="complianceGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#33A1DE" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#33A1DE" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                <XAxis dataKey="date" stroke="#6B7280" />
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
                  dataKey="riskScore"
                  stroke="#005B96"
                  fillOpacity={1}
                  fill="url(#riskGradient)"
                  strokeWidth={2}
                />
                <Area
                  type="monotone"
                  dataKey="compliance"
                  stroke="#33A1DE"
                  fillOpacity={1}
                  fill="url(#complianceGradient)"
                  strokeWidth={2}
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>

          {/* ERMITS Integration Status */}
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-6">
              ERMITS Ecosystem CyberSoluce Intelligence Feed
            </h2>
            
            <div className="space-y-4">
              {Object.entries(mockIntegrationData).map(([product, data]) => (
                <div key={product} className="border border-gray-200 dark:border-gray-700 rounded-lg p-4">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center">
                      <div className="w-2 h-2 bg-green-500 rounded-full mr-2"></div>
                      <span className="font-medium text-gray-900 dark:text-white text-sm capitalize">
                        {product.replace(/([A-Z])/g, ' $1').trim()}
                      </span>
                    </div>
                    <Eye className="h-4 w-4 text-gray-400" />
                  </div>
                  
                  <div className="space-y-1">
                    {Object.entries(data)
                      .filter(([key]) => key !== 'lastUpdate')
                      .slice(0, 2)
                      .map(([key, value]) => (
                      <div key={key} className="flex justify-between text-xs">
                        <span className="text-gray-600 dark:text-gray-400 capitalize">
                          {key.replace(/([A-Z])/g, ' $1').trim()}:
                        </span>
                        <span className="text-gray-900 dark:text-white font-medium">
                          {String(value)}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
            
            <Link
              to="/intelligence"
              className="w-full mt-4 px-4 py-2 bg-action-cyan-400 text-white rounded-md hover:bg-action-cyan-500 text-center block"
            >
              View Full Intelligence
            </Link>
          </div>

          {/* Framework Coverage Section */}
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
              Framework Coverage
            </h2>
            <div className="flex items-center justify-between mb-4">
              <div>
                <div className="text-3xl font-bold text-gray-900 dark:text-white">
                  {frameworks.length}
                </div>
                <div className="text-sm text-gray-600 dark:text-gray-400">
                  Active Frameworks
                </div>
              </div>
              <Link
                to="/framework-mapper"
                className="px-4 py-2 bg-command-blue-600 text-white rounded-md hover:bg-command-blue-700 text-sm"
              >
                Manage Frameworks
              </Link>
            </div>
            {frameworks.length > 0 && (
              <div className="flex flex-wrap gap-2 mt-4">
                {frameworks.slice(0, 8).map((framework) => (
                  <span
                    key={framework.id}
                    className="px-3 py-1 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-full text-xs"
                  >
                    {framework.name}
                  </span>
                ))}
                {frameworks.length > 8 && (
                  <span className="px-3 py-1 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-full text-xs">
                    +{frameworks.length - 8} more
                  </span>
                )}
              </div>
            )}
          </div>

          {/* NIST CSF Maturity Panel */}
          <NistCsfMaturityPanel />
        </div>

        {/* Quick Actions Grid */}
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <Link to="/orchestration/tasks">
            <motion.div
              whileHover={{ scale: 1.02 }}
              className="bg-gradient-to-br from-orange-50 to-orange-100 dark:from-orange-900/20 dark:to-orange-800/20 rounded-lg p-6 border border-orange-200 dark:border-orange-800 cursor-pointer"
            >
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-semibold text-orange-900 dark:text-orange-100">
                  Task Management
                </h3>
                <CheckSquare className="h-6 w-6 text-orange-600" />
              </div>
              <p className="text-sm text-orange-700 dark:text-orange-300">
                Orchestrate compliance tasks and assignments
              </p>
            </motion.div>
          </Link>

          <Link to="/framework-mapper">
            <motion.div
              whileHover={{ scale: 1.02 }}
              className="bg-gradient-to-br from-command-blue-50 to-command-blue-100 dark:from-command-blue-900/20 dark:to-command-blue-800/20 rounded-lg p-6 border border-command-blue-200 dark:border-command-blue-800 cursor-pointer"
            >
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-semibold text-command-blue-900 dark:text-command-blue-100">
                  Framework Mapper
                </h3>
                <GitBranch className="h-6 w-6 text-command-blue-600" />
              </div>
              <p className="text-sm text-command-blue-700 dark:text-command-blue-300">
                Map and align controls across multiple frameworks
              </p>
            </motion.div>
          </Link>

          <Link to="/maturity-tracker">
            <motion.div
              whileHover={{ scale: 1.02 }}
              className="bg-gradient-to-br from-action-cyan-50 to-action-cyan-100 dark:from-action-cyan-900/20 dark:to-action-cyan-800/20 rounded-lg p-6 border border-action-cyan-200 dark:border-action-cyan-800 cursor-pointer"
            >
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-semibold text-action-cyan-900 dark:text-action-cyan-100">
                  Maturity Tracker
                </h3>
                <Target className="h-6 w-6 text-action-cyan-400" />
              </div>
              <p className="text-sm text-action-cyan-700 dark:text-action-cyan-300">
                Track cybersecurity maturity progression
              </p>
            </motion.div>
          </Link>

          <Link to="/budget-simulator">
            <motion.div
              whileHover={{ scale: 1.02 }}
              className="bg-gradient-to-br from-green-50 to-green-100 dark:from-green-900/20 dark:to-green-800/20 rounded-lg p-6 border border-green-200 dark:border-green-800 cursor-pointer"
            >
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-semibold text-green-900 dark:text-green-100">
                  Budget Simulator
                </h3>
                <DollarSign className="h-6 w-6 text-green-600" />
              </div>
              <p className="text-sm text-green-700 dark:text-green-300">
                Optimize security investment allocation
              </p>
            </motion.div>
          </Link>

          <Link to="/compliance-orchestrator">
            <motion.div
              whileHover={{ scale: 1.02 }}
              className="bg-gradient-to-br from-purple-50 to-purple-100 dark:from-purple-900/20 dark:to-purple-800/20 rounded-lg p-6 border border-purple-200 dark:border-purple-800 cursor-pointer"
            >
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-semibold text-purple-900 dark:text-purple-100">
                  Compliance Orchestrator
                </h3>
                <Users className="h-6 w-6 text-purple-600" />
              </div>
              <p className="text-sm text-purple-700 dark:text-purple-300">
                Orchestrate governance workflows
              </p>
            </motion.div>
          </Link>

          <Link to="/audit-packager">
            <motion.div
              whileHover={{ scale: 1.02 }}
              className="bg-gradient-to-br from-orange-50 to-orange-100 dark:from-orange-900/20 dark:to-orange-800/20 rounded-lg p-6 border border-orange-200 dark:border-orange-800 cursor-pointer"
            >
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-semibold text-orange-900 dark:text-orange-100">
                  Audit Packager
                </h3>
                <FileText className="h-6 w-6 text-orange-600" />
              </div>
              <p className="text-sm text-orange-700 dark:text-orange-300">
                Generate comprehensive audit packages
              </p>
            </motion.div>
          </Link>

          <Link to="/executive-reporting">
            <motion.div
              whileHover={{ scale: 1.02 }}
              className="bg-gradient-to-br from-indigo-50 to-indigo-100 dark:from-indigo-900/20 dark:to-indigo-800/20 rounded-lg p-6 border border-indigo-200 dark:border-indigo-800 cursor-pointer"
            >
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-semibold text-indigo-900 dark:text-indigo-100">
                  Executive Reporting
                </h3>
                <BarChart3 className="h-6 w-6 text-indigo-600" />
              </div>
              <p className="text-sm text-indigo-700 dark:text-indigo-300">
                Board-ready cybersecurity reports
              </p>
            </motion.div>
          </Link>
        </div>

        {/* Intelligence Engine Section */}
        <div className="max-w-7xl mx-auto bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
              Intelligence Engine™ Live Feed
            </h2>
            <Link 
              to="/intelligence"
              className="text-command-blue-600 hover:text-command-blue-800 text-sm font-medium"
            >
              View All Insights →
            </Link>
          </div>
          
          <div className="space-y-3 max-h-64 overflow-y-auto">
            {mockIntelligenceInsights.slice(0, 3).map((insight) => (
              <div 
                key={insight.id}
                className={`border rounded-lg p-4 ${
                  insight.acknowledged 
                    ? 'border-gray-200 dark:border-gray-700' 
                    : 'border-action-cyan-200 dark:border-action-cyan-800 bg-action-cyan-50 dark:bg-action-cyan-900/20'
                }`}
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <h3 className="font-medium text-gray-900 dark:text-white text-sm">
                      {insight.title}
                    </h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                      {insight.description}
                    </p>
                    <div className="flex items-center space-x-2 mt-2">
                      <span className="px-2 py-1 bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 rounded text-xs">
                        {insight.source}
                      </span>
                      <span className="text-xs text-gray-500 dark:text-gray-400">
                        {insight.confidence}% confidence
                      </span>
                    </div>
                  </div>
                  
                  {!insight.acknowledged && (
                    <button 
                      className="text-action-cyan-600 hover:text-action-cyan-800 ml-4"
                      aria-label="Acknowledge insight"
                      title="Acknowledge insight"
                    >
                      <CheckCircle className="h-5 w-5" />
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
  );
};

export default Dashboard;