import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import {
  DollarSign,
  TrendingUp,
  Calculator,
  Target,
  AlertTriangle,
  CheckCircle,
  BarChart3,
  PieChart
} from 'lucide-react';
import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  PieChart as RechartsPieChart,
  Pie,
  Cell,
  BarChart,
  Bar
} from 'recharts';
import { mockExecutiveMetrics } from '../data/mockData';

const BudgetSimulator: React.FC = () => {
  const [simulationInputs, setSimulationInputs] = useState({
    totalBudget: 2500000,
    securityToolsPercent: 35,
    trainingPercent: 15,
    consultingPercent: 25,
    compliancePercent: 25,
    riskTolerance: 'medium',
    industryType: 'technology',
    employeeCount: 500
  });

  const [scenarioMode, setScenarioMode] = useState<'current' | 'optimized' | 'minimal'>('current');
  const [showAdvancedSettings, setShowAdvancedSettings] = useState(false);
  const [simulationResults, setSimulationResults] = useState(null);
  const [refreshing, setRefreshing] = useState(false);
  
  // Run simulation when inputs change
  useEffect(() => {
    const runSimulation = () => {
      const results = {
        riskReduction: calculateRiskReduction(),
        costEffectiveness: calculateCostEffectiveness(),
        complianceImpact: calculateComplianceImpact(),
        recommendations: generateRecommendations()
      };
      setSimulationResults(results);
    };
    
    const debounceTimer = setTimeout(runSimulation, 500);
    return () => clearTimeout(debounceTimer);
  }, [simulationInputs, scenarioMode]);
  
  const calculateRiskReduction = () => {
    const baseReduction = simulationInputs.securityToolsPercent * 0.8 + 
                         simulationInputs.trainingPercent * 0.6;
    return Math.min(95, Math.max(30, baseReduction));
  };
  
  const calculateCostEffectiveness = () => {
    const efficiency = (simulationInputs.securityToolsPercent + simulationInputs.trainingPercent) / 2;
    return Math.min(100, Math.max(40, efficiency + 20));
  };
  
  const calculateComplianceImpact = () => {
    const complianceBoost = simulationInputs.compliancePercent * 2.5 + 
                           simulationInputs.consultingPercent * 1.5;
    return Math.min(98, Math.max(65, complianceBoost));
  };
  
  const generateRecommendations = () => {
    const recs = [];
    
    if (simulationInputs.securityToolsPercent < 30) {
      recs.push('Consider increasing security tools investment for better protection');
    }
    if (simulationInputs.trainingPercent < 10) {
      recs.push('Increase training budget to reduce human error incidents');
    }
    if (simulationInputs.consultingPercent > 35) {
      recs.push('High consulting spend - consider building internal capabilities');
    }
    
    return recs;
  };
  
  const handleRefresh = async () => {
    setRefreshing(true);
    // Simulate refresh
    setTimeout(() => setRefreshing(false), 1000);
  };

  // Budget allocation colors
  const budgetColors = ['#005B96', '#33A1DE', '#10B981', '#F59E0B', '#8B5CF6'];

  // Calculate budget allocation
  const calculateAllocation = () => {
    const { totalBudget, securityToolsPercent, trainingPercent, consultingPercent, compliancePercent } = simulationInputs;
    
    return {
      securityTools: (totalBudget * securityToolsPercent) / 100,
      training: (totalBudget * trainingPercent) / 100,
      consulting: (totalBudget * consultingPercent) / 100,
      compliance: (totalBudget * compliancePercent) / 100,
    };
  };

  const allocation = calculateAllocation();

  // Pie chart data
  const pieData = [
    { name: 'Security Tools', value: allocation.securityTools, percentage: simulationInputs.securityToolsPercent },
    { name: 'Training & Awareness', value: allocation.training, percentage: simulationInputs.trainingPercent },
    { name: 'Consulting Services', value: allocation.consulting, percentage: simulationInputs.consultingPercent },
    { name: 'Compliance & Audit', value: allocation.compliance, percentage: simulationInputs.compliancePercent }
  ];

  // ROI scenarios
  const roiScenarios = {
    current: {
      riskReduction: 60,
      efficiency: 70,
      complianceScore: 82,
      estimatedROI: 2.1
    },
    optimized: {
      riskReduction: 85,
      efficiency: 90,
      complianceScore: 95,
      estimatedROI: 3.4
    },
    minimal: {
      riskReduction: 40,
      efficiency: 50,
      complianceScore: 65,
      estimatedROI: 1.2
    }
  };

  const currentScenario = roiScenarios[scenarioMode];

  // Industry benchmarks (mock data)
  const industryBenchmarks = [
    { category: 'Security Tools', industry: 40, current: simulationInputs.securityToolsPercent },
    { category: 'Training', industry: 12, current: simulationInputs.trainingPercent },
    { category: 'Consulting', industry: 20, current: simulationInputs.consultingPercent },
    { category: 'Compliance', industry: 28, current: simulationInputs.compliancePercent }
  ];

  // Update input handler
  const handleInputChange = (field: string, value: number | string) => {
    setSimulationInputs(prev => ({
      ...prev,
      [field]: value
    }));
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
            Budget Optimization Simulator
          </h1>
          <p className="text-gray-600 dark:text-gray-300 mt-1">
            Optimize cybersecurity investments for maximum risk reduction
          </p>
        </div>
        
        <div className="flex items-center space-x-3">
          <button
            onClick={() => setScenarioMode('current')}
            className={`px-3 py-2 rounded-md text-sm ${
              scenarioMode === 'current' 
                ? 'bg-command-blue-100 text-command-blue-700' 
                : 'text-gray-600 hover:bg-gray-100 dark:hover:bg-gray-700'
            }`}
          >
            Current
          </button>
          <button
            onClick={() => setScenarioMode('optimized')}
            className={`px-3 py-2 rounded-md text-sm ${
              scenarioMode === 'optimized' 
                ? 'bg-green-100 text-green-700' 
                : 'text-gray-600 hover:bg-gray-100 dark:hover:bg-gray-700'
            }`}
          >
            Optimized
          </button>
          <button
            onClick={() => setScenarioMode('minimal')}
            className={`px-3 py-2 rounded-md text-sm ${
              scenarioMode === 'minimal' 
                ? 'bg-orange-100 text-orange-700' 
                : 'text-gray-600 hover:bg-gray-100 dark:hover:bg-gray-700'
            }`}
          >
            Minimal
          </button>
        </div>
      </div>

      {/* Scenario Results */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6"
        >
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
              Risk Reduction
            </h2>
            <AlertTriangle className="h-6 w-6 text-red-600" />
          </div>
          <div className="text-3xl font-bold text-red-600 mb-2">
            {simulationResults ? calculateRiskReduction().toFixed(0) : currentScenario.riskReduction}%
          </div>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            Expected reduction
          </p>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6"
        >
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
              Efficiency Gain
            </h2>
            <TrendingUp className="h-6 w-6 text-blue-600" />
          </div>
          <div className="text-3xl font-bold text-blue-600 mb-2">
            {simulationResults ? calculateCostEffectiveness().toFixed(0) : currentScenario.efficiency}%
          </div>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            Operational efficiency
          </p>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6"
        >
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
              Compliance Score
            </h2>
            <CheckCircle className="h-6 w-6 text-green-600" />
          </div>
          <div className="text-3xl font-bold text-green-600 mb-2">
            {simulationResults ? calculateComplianceImpact().toFixed(0) : currentScenario.complianceScore}%
          </div>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            Framework compliance
          </p>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6"
        >
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
              Estimated ROI
            </h2>
            <Calculator className="h-6 w-6 text-purple-600" />
          </div>
          <div className="text-3xl font-bold text-purple-600 mb-2">
            {currentScenario.estimatedROI.toFixed(1)}x
          </div>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            3-year projection
          </p>
        </motion.div>
      </div>

      {/* Budget Controls */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Budget Inputs */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-6">
            Budget Allocation Simulator
          </h2>
          
          <div className="space-y-6">
            {/* Total Budget */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Total Annual Budget
              </label>
              <div className="relative">
                <DollarSign className="h-5 w-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input
                  type="number"
                  value={simulationInputs.totalBudget}
                  onChange={(e) => handleInputChange('totalBudget', parseInt(e.target.value))}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:ring-command-blue-500 focus:border-command-blue-500 dark:bg-gray-700"
                />
              </div>
            </div>
            
            {/* Allocation Sliders */}
            {[
              { key: 'securityToolsPercent', label: 'Security Tools', color: 'command-blue' },
              { key: 'trainingPercent', label: 'Training & Awareness', color: 'action-cyan' },
              { key: 'consultingPercent', label: 'Consulting Services', color: 'green' },
              { key: 'compliancePercent', label: 'Compliance & Audit', color: 'yellow' }
            ].map((slider) => (
              <div key={slider.key}>
                <div className="flex justify-between mb-2">
                  <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                    {slider.label}
                  </label>
                  <span className="text-sm text-gray-600 dark:text-gray-400">
                    {simulationInputs[slider.key as keyof typeof simulationInputs]}% 
                    (${((simulationInputs.totalBudget * (simulationInputs[slider.key as keyof typeof simulationInputs] as number)) / 100 / 1000).toFixed(0)}K)
                  </span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="50"
                  step="5"
                  value={simulationInputs[slider.key as keyof typeof simulationInputs]}
                  onChange={(e) => handleInputChange(slider.key, parseInt(e.target.value))}
                  className="w-full"
                />
              </div>
            ))}
            
            {/* Additional Parameters */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Risk Tolerance
                </label>
                <select
                  value={simulationInputs.riskTolerance}
                  onChange={(e) => handleInputChange('riskTolerance', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:ring-command-blue-500 focus:border-command-blue-500 dark:bg-gray-700"
                >
                  <option value="low">Low</option>
                  <option value="medium">Medium</option>
                  <option value="high">High</option>
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Industry
                </label>
                <select
                  value={simulationInputs.industryType}
                  onChange={(e) => handleInputChange('industryType', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:ring-command-blue-500 focus:border-command-blue-500 dark:bg-gray-700"
                >
                  <option value="technology">Technology</option>
                  <option value="healthcare">Healthcare</option>
                  <option value="financial">Financial Services</option>
                  <option value="manufacturing">Manufacturing</option>
                  <option value="retail">Retail</option>
                </select>
              </div>
            </div>
          </div>
        </div>

        {/* Budget Visualization */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-6">
            Budget Allocation Visualization
          </h2>
          
          <ResponsiveContainer width="100%" height={300}>
            <RechartsPieChart>
              <Pie
                data={pieData}
                cx="50%"
                cy="50%"
                outerRadius={100}
                dataKey="value"
                label={({ name, percentage }) => `${name}: ${percentage}%`}
                labelLine={false}
              >
                {pieData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={budgetColors[index]} />
                ))}
              </Pie>
              <Tooltip 
                formatter={(value: number) => [`$${(value / 1000).toFixed(0)}K`, 'Allocation']}
              />
            </RechartsPieChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Industry Benchmark Comparison */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
        <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-6">
          Industry Benchmark Comparison
        </h2>
        
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={industryBenchmarks}>
            <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
            <XAxis dataKey="category" stroke="#6B7280" />
            <YAxis stroke="#6B7280" />
            <Tooltip 
              contentStyle={{ 
                backgroundColor: '#1F2937',
                border: '1px solid #374151',
                borderRadius: '8px'
              }}
            />
            <Bar dataKey="industry" fill="#6B7280" name="Industry Average" />
            <Bar dataKey="current" fill="#005B96" name="Your Allocation" />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Optimization Recommendations */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
        <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-6">
          Optimization Recommendations
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[
            {
              title: 'Increase Security Tools Investment',
              description: 'Current allocation is below industry average. Consider investing in advanced threat detection.',
              impact: 'High',
              effort: 'Medium',
              savings: 150000,
              timeline: 'Q2 2024',
              type: 'opportunity'
            },
            {
              title: 'Optimize Consulting Spend',
              description: 'Current consulting costs are above benchmark. Consider in-house capabilities.',
              impact: 'Medium',
              effort: 'High',
              savings: 75000,
              timeline: 'Q3 2024',
              type: 'efficiency'
            },
            {
              title: 'Enhance Training Program',
              description: 'Increase security awareness training to reduce human error incidents.',
              impact: 'High',
              effort: 'Low',
              savings: 200000,
              timeline: 'Q2 2024',
              type: 'opportunity'
            }
          ].map((recommendation, index) => (
            <motion.div
              key={recommendation.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className={`border rounded-lg p-4 ${
                recommendation.type === 'opportunity' 
                  ? 'border-green-200 bg-green-50 dark:border-green-800 dark:bg-green-900/20'
                  : 'border-blue-200 bg-blue-50 dark:border-blue-800 dark:bg-blue-900/20'
              }`}
            >
              <div className="flex items-start justify-between mb-3">
                <h3 className="font-semibold text-gray-900 dark:text-white text-sm">
                  {recommendation.title}
                </h3>
                <span className={`px-2 py-1 rounded-full text-xs ${
                  recommendation.impact === 'High' ? 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300' :
                  recommendation.impact === 'Medium' ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300' :
                  'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300'
                }`}>
                  {recommendation.impact} Impact
                </span>
              </div>
              
              <p className="text-sm text-gray-700 dark:text-gray-300 mb-4">
                {recommendation.description}
              </p>
              
              <div className="space-y-2 text-xs">
                <div className="flex justify-between">
                  <span className="text-gray-500 dark:text-gray-400">Potential Savings:</span>
                  <span className="text-green-600 font-medium">${(recommendation.savings / 1000).toFixed(0)}K</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500 dark:text-gray-400">Implementation:</span>
                  <span className="text-gray-900 dark:text-white">{recommendation.effort} effort</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500 dark:text-gray-400">Timeline:</span>
                  <span className="text-gray-900 dark:text-white">{recommendation.timeline}</span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Budget Impact Analysis */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
        <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-6">
          Multi-Year Budget Impact Analysis
        </h2>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div>
            <h3 className="font-medium text-gray-900 dark:text-white mb-4">
              Cost-Benefit Projection
            </h3>
            <ResponsiveContainer width="100%" height={250}>
              <LineChart
                data={[
                  { year: '2024', investment: 2500, benefits: 1800, netBenefit: -700 },
                  { year: '2025', investment: 2600, benefits: 4200, netBenefit: 1600 },
                  { year: '2026', investment: 2700, benefits: 5800, netBenefit: 3100 },
                  { year: '2027', investment: 2800, benefits: 7200, netBenefit: 4400 }
                ]}
              >
                <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                <XAxis dataKey="year" stroke="#6B7280" />
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
                  dataKey="investment" 
                  stroke="#EF4444" 
                  strokeWidth={2}
                  name="Investment"
                />
                <Line 
                  type="monotone" 
                  dataKey="benefits" 
                  stroke="#10B981" 
                  strokeWidth={2}
                  name="Benefits"
                />
                <Line 
                  type="monotone" 
                  dataKey="netBenefit" 
                  stroke="#005B96" 
                  strokeWidth={3}
                  name="Net Benefit"
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
          
          <div>
            <h3 className="font-medium text-gray-900 dark:text-white mb-4">
              Key Financial Metrics
            </h3>
            <div className="space-y-4">
              <div className="bg-gray-50 dark:bg-gray-900 rounded-lg p-4">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600 dark:text-gray-400">Break-even Point</span>
                  <span className="text-lg font-bold text-gray-900 dark:text-white">18 months</span>
                </div>
              </div>
              
              <div className="bg-gray-50 dark:bg-gray-900 rounded-lg p-4">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600 dark:text-gray-400">3-Year Net Benefit</span>
                  <span className="text-lg font-bold text-green-600">$4.2M</span>
                </div>
              </div>
              
              <div className="bg-gray-50 dark:bg-gray-900 rounded-lg p-4">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600 dark:text-gray-400">Risk Reduction Value</span>
                  <span className="text-lg font-bold text-blue-600">$2.8M</span>
                </div>
              </div>
              
              <div className="bg-gray-50 dark:bg-gray-900 rounded-lg p-4">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600 dark:text-gray-400">Efficiency Savings</span>
                  <span className="text-lg font-bold text-purple-600">$1.4M</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BudgetSimulator;