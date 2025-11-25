import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import {
  TrendingUp,
  Shield,
  DollarSign,
  Target,
  AlertTriangle,
  CheckCircle,
  Clock,
  Users,
  BarChart3
} from 'lucide-react';
import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  PieChart,
  Pie,
  Cell,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar
} from 'recharts';
import { mockExecutiveMetrics } from '../../data/mockData';
import { ExecutiveMetrics, KRI } from '../../types/cybersoluce';

const ExecutiveDashboard: React.FC = () => {
  const [timeRange, setTimeRange] = useState<'7d' | '30d' | '90d' | '1y'>('30d');
  const [metrics, setMetrics] = useState<ExecutiveMetrics>(mockExecutiveMetrics);

  // KRI status colors
  const getKRIStatusColor = (status: string) => {
    switch (status) {
      case 'normal': return 'text-green-600 bg-green-100 dark:bg-green-900/30';
      case 'warning': return 'text-yellow-600 bg-yellow-100 dark:bg-yellow-900/30';
      case 'critical': return 'text-red-600 bg-red-100 dark:bg-red-900/30';
      default: return 'text-gray-600 bg-gray-100 dark:bg-gray-700';
    }
  };

  // Compliance status colors
  const getComplianceColor = (status: string) => {
    switch (status) {
      case 'compliant': return 'bg-green-500';
      case 'partially-compliant': return 'bg-yellow-500';
      case 'non-compliant': return 'bg-red-500';
      default: return 'bg-gray-500';
    }
  };

  // Risk score color
  const getRiskScoreColor = (score: number) => {
    if (score <= 3) return 'text-green-600';
    if (score <= 6) return 'text-yellow-600';
    return 'text-red-600';
  };

  // Budget utilization colors for pie chart
  const budgetColors = ['#005B96', '#33A1DE', '#10B981', '#F59E0B'];

  // Maturity radar chart data
  const maturityRadarData = metrics.maturityProgression.map(domain => ({
    domain: domain.domainName.replace(' & ', '\n&\n'),
    current: domain.currentLevel,
    target: domain.targetLevel,
    fullMark: 5
  }));

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
            Executive Command Center
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
          >
            <option value="7d">Last 7 Days</option>
            <option value="30d">Last 30 Days</option>
            <option value="90d">Last Quarter</option>
            <option value="1y">Last Year</option>
          </select>
          
          <button className="px-4 py-2 bg-command-blue-600 text-white rounded-md hover:bg-command-blue-700">
            Generate Board Report
          </button>
        </div>
      </div>

      {/* Executive Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Risk Score</p>
              <p className={`text-3xl font-bold ${getRiskScoreColor(metrics.overallRiskScore)}`}>
                {metrics.overallRiskScore}/10
              </p>
              <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                Lower is better
              </p>
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
              <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Avg. Compliance</p>
              <p className="text-3xl font-bold text-green-600">
                {Math.round(metrics.complianceStatus.reduce((acc, c) => acc + c.percentage, 0) / metrics.complianceStatus.length)}%
              </p>
              <p className="text-xs text-green-500 mt-1">
                +3% from last month
              </p>
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
              <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Budget Utilization</p>
              <p className="text-3xl font-bold text-action-cyan-400">
                {Math.round((metrics.budgetUtilization.spentBudget / metrics.budgetUtilization.totalBudget) * 100)}%
              </p>
              <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                ${(metrics.budgetUtilization.remainingBudget / 1000).toFixed(0)}K remaining
              </p>
            </div>
            <div className="bg-action-cyan-100 dark:bg-action-cyan-900/30 p-3 rounded-full">
              <DollarSign className="h-8 w-8 text-action-cyan-400" />
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
              <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Maturity Progress</p>
              <p className="text-3xl font-bold text-purple-600">
                {Math.round(metrics.maturityProgression.reduce((acc, m) => acc + m.progress, 0) / metrics.maturityProgression.length)}%
              </p>
              <p className="text-xs text-purple-500 mt-1">
                To target state
              </p>
            </div>
            <div className="bg-purple-100 dark:bg-purple-900/30 p-3 rounded-full">
              <Target className="h-8 w-8 text-purple-600 dark:text-purple-400" />
            </div>
          </div>
        </motion.div>
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Risk Trend Chart */}
        <div className="lg:col-span-2 bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
            Risk & Compliance Trends
          </h2>
          
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={metrics.trendData.filter(t => t.metric === 'Risk Score' || t.metric === 'Compliance Score')}>
              <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
              <XAxis dataKey="period" stroke="#6B7280" />
              <YAxis stroke="#6B7280" />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: '#1F2937',
                  border: '1px solid #374151',
                  borderRadius: '8px'
                }}
              />
              <Line 
                type="monotone" 
                dataKey="value" 
                stroke="#005B96" 
                strokeWidth={3}
                dot={{ fill: '#005B96', strokeWidth: 2, r: 4 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Key Risk Indicators */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
            Key Risk Indicators
          </h2>
          
          <div className="space-y-4">
            {metrics.keyRiskIndicators.map((kri) => (
              <div key={kri.id} className="border border-gray-200 dark:border-gray-700 rounded-lg p-4">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="font-medium text-gray-900 dark:text-white text-sm">
                    {kri.name}
                  </h3>
                  <span className={`px-2 py-1 rounded-full text-xs ${getKRIStatusColor(kri.status)}`}>
                    {kri.status}
                  </span>
                </div>
                
                <div className="flex items-center justify-between">
                  <span className="text-2xl font-bold text-gray-900 dark:text-white">
                    {kri.value}{kri.unit}
                  </span>
                  <span className="text-sm text-gray-500 dark:text-gray-400">
                    Threshold: {kri.threshold}{kri.unit}
                  </span>
                </div>
                
                <div className="mt-2 w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                  <div 
                    className={`h-2 rounded-full ${
                      kri.value <= kri.threshold ? 'bg-green-500' : 'bg-red-500'
                    }`}
                    style={{ width: `${Math.min((kri.value / kri.threshold) * 100, 100)}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Maturity Radar Chart */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
            Cybersecurity Maturity Assessment
          </h2>
          
          <ResponsiveContainer width="100%" height={300}>
            <RadarChart data={maturityRadarData}>
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
              <Tooltip />
            </RadarChart>
          </ResponsiveContainer>
        </div>

        {/* Budget Allocation */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
            Security Budget Allocation
          </h2>
          
          <div className="grid grid-cols-2 gap-4">
            <div>
              <ResponsiveContainer width="100%" height={200}>
                <PieChart>
                  <Pie
                    data={metrics.budgetUtilization.categories}
                    cx="50%"
                    cy="50%"
                    outerRadius={80}
                    dataKey="spent"
                    label={({ name, percentage }) => `${name}: ${percentage.toFixed(1)}%`}
                    labelLine={false}
                  >
                    {metrics.budgetUtilization.categories.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={budgetColors[index % budgetColors.length]} />
                    ))}
                  </Pie>
                  <Tooltip formatter={(value: number) => [`$${(value / 1000).toFixed(0)}K`, 'Spent']} />
                </PieChart>
              </ResponsiveContainer>
            </div>
            
            <div className="space-y-3">
              {metrics.budgetUtilization.categories.map((category, index) => (
                <div key={category.id} className="flex items-center justify-between">
                  <div className="flex items-center">
                    <div 
                      className="w-3 h-3 rounded-full mr-2"
                      style={{ backgroundColor: budgetColors[index % budgetColors.length] }}
                    />
                    <span className="text-sm text-gray-700 dark:text-gray-300">{category.name}</span>
                  </div>
                  <span className="text-sm font-medium text-gray-900 dark:text-white">
                    ${(category.spent / 1000).toFixed(0)}K
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Recommendations Panel */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
        <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
          Strategic Recommendations
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {metrics.recommendations.map((rec) => (
            <motion.div
              key={rec.id}
              whileHover={{ scale: 1.02 }}
              className="border border-gray-200 dark:border-gray-700 rounded-lg p-4 hover:shadow-md transition-all"
            >
              <div className="flex items-start justify-between mb-2">
                <h3 className="font-medium text-gray-900 dark:text-white text-sm">
                  {rec.title}
                </h3>
                <span className={`px-2 py-1 rounded-full text-xs ${
                  rec.priority === 'critical' ? 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300' :
                  rec.priority === 'high' ? 'bg-orange-100 text-orange-800 dark:bg-orange-900/30 dark:text-orange-300' :
                  rec.priority === 'medium' ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300' :
                  'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300'
                }`}>
                  {rec.priority}
                </span>
              </div>
              
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">
                {rec.description}
              </p>
              
              <div className="space-y-2 text-xs">
                <div className="flex justify-between">
                  <span className="text-gray-500 dark:text-gray-400">Effort:</span>
                  <span className="text-gray-900 dark:text-white">{rec.estimatedEffort}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500 dark:text-gray-400">Cost:</span>
                  <span className="text-gray-900 dark:text-white">${(rec.estimatedCost / 1000).toFixed(0)}K</span>
                </div>
                {rec.dueDate && (
                  <div className="flex justify-between">
                    <span className="text-gray-500 dark:text-gray-400">Due:</span>
                    <span className="text-gray-900 dark:text-white">
                      {rec.dueDate.toLocaleDateString()}
                    </span>
                  </div>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ExecutiveDashboard;