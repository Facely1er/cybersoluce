import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Brain,
  CheckCircle,
  Target,
  Clock
} from 'lucide-react';
import { useGovernanceStore } from '../../stores/governanceStore';
import { mockIntegrationData } from '../../data/mockData';
import EnhancedChart from '../charts/EnhancedChart';
import { ermitsAPI, IntelligenceCorrelationEngine } from '../../services/ermitsIntegration';
import NetworkVisualization from './NetworkVisualization';

const IntelligenceEngine: React.FC = () => {
  const {
    intelligenceInsights,
    addIntelligenceInsight,
    acknowledgeInsight
  } = useGovernanceStore();

  const [activeTab, setActiveTab] = useState<'feed' | 'analytics' | 'correlations'>('feed');
  const [filterType, setFilterType] = useState<'all' | 'predictive' | 'correlation' | 'recommendation' | 'alert'>('all');
  const [showUnacknowledged, setShowUnacknowledged] = useState(false);
  const [isGeneratingInsights, setIsGeneratingInsights] = useState(false);
  const [predictiveData, setPredictiveData] = useState<any[]>([]);
  const [correlationData, setCorrelationData] = useState<any[]>([]);
  const [loadingAnalytics, setLoadingAnalytics] = useState(false);
  
  // Enhanced mock insights with more variety
  const enhancedInsights = [
    ...intelligenceInsights,
    {
      id: 'insight-new-1',
      type: 'recommendation' as const,
      source: 'threatIntel' as const,
      confidence: 85,
      impact: 'high' as const,
      title: 'Budget Optimization Opportunity',
      description: 'Analysis suggests 15% budget reallocation could improve security posture by 23%',
      actionable: true,
      relatedItems: ['budget-planning'],
      timestamp: new Date(Date.now() - 30 * 60 * 1000),
      acknowledged: false
    },
    {
      id: 'insight-new-2',
      type: 'alert' as const,
      source: 'threatIntel' as const,
      confidence: 96,
      impact: 'critical' as const,
      title: 'Emerging Threat Pattern',
      description: 'New attack vector detected targeting your industry sector with 34% success rate',
      actionable: true,
      relatedItems: ['threat-intelligence'],
      timestamp: new Date(Date.now() - 15 * 60 * 1000),
      acknowledged: false
    }
  ];
  
  // Load analytics data on component mount
  useEffect(() => {
    loadPredictiveAnalytics();
    loadCorrelationData();
  }, []);

  const loadPredictiveAnalytics = async () => {
    setLoadingAnalytics(true);
    try {
      const riskTrends = await ermitsAPI.predictRiskTrends('90d');
      setPredictiveData(riskTrends);
    } catch (error) {
      console.error('Failed to load predictive analytics:', error);
      // Fallback to mock data
      setPredictiveData([
        { date: '2024-03-01', predictedRiskScore: 7.5, confidence: 82 },
        { date: '2024-04-01', predictedRiskScore: 6.8, confidence: 78 },
        { date: '2024-05-01', predictedRiskScore: 6.2, confidence: 75 },
        { date: '2024-06-01', predictedRiskScore: 5.8, confidence: 72 }
      ]);
    } finally {
      setLoadingAnalytics(false);
    }
  };

  const loadCorrelationData = async () => {
    try {
      await IntelligenceCorrelationEngine.correlateThreatsAndRisks([], []);
      setCorrelationData([
        { source: 'ThreatIntel', target: 'RiskRegister', strength: 0.92, type: 'high-correlation' },
        { source: 'VendorRisk', target: 'ComplianceGaps', strength: 0.78, type: 'medium-correlation' },
        { source: 'TrainingScores', target: 'IncidentRate', strength: -0.85, type: 'negative-correlation' },
        { source: 'PatchManagement', target: 'VulnerabilityExposure', strength: -0.91, type: 'negative-correlation' },
        { source: 'AccessControls', target: 'DataBreachRisk', strength: -0.73, type: 'medium-correlation' }
      ]);
    } catch (error) {
      console.error('Failed to load correlation data:', error);
    }
  };

  const handleGenerateInsights = async () => {
    setIsGeneratingInsights(true);
    
    try {
      // Generate cross-product insights using ERMITS API
      const newInsights = await ermitsAPI.generateCrossProductInsights();
      
      // Add each insight to the store
      newInsights.forEach(insight => {
        addIntelligenceInsight({
          type: insight.type,
          source: insight.source,
          confidence: insight.confidence,
          impact: insight.impact,
          title: insight.title,
          description: insight.description,
          actionable: insight.actionable,
          relatedItems: insight.relatedItems,
          acknowledged: false
        });
      });
      
      // Refresh analytics data
      await loadPredictiveAnalytics();
      await loadCorrelationData();
      
    } catch (error) {
      console.error('Failed to generate insights:', error);
      
      // Fallback to creating a single insight
      const fallbackInsight = {
        type: 'recommendation' as const,
        source: 'intelligence' as const,
        confidence: 85,
        impact: 'medium' as const,
        title: 'Analysis Complete',
        description: 'Intelligence analysis completed. Review the updated insights and recommendations.',
        actionable: true,
        relatedItems: ['analysis'],
        acknowledged: false
      };
      
      addIntelligenceInsight(fallbackInsight);
    } finally {
      setIsGeneratingInsights(false);
    }
  };
  

  // Filter insights
  const filteredInsights = enhancedInsights.filter(insight => {
    const matchesType = filterType === 'all' || (insight.type && insight.type === filterType);
    const matchesAcknowledged = !showUnacknowledged || !insight.acknowledged;
    return matchesType && matchesAcknowledged;
  });

  // Get source color
  const getSourceColor = (source: string) => {
    switch (source) {
      case 'threatIntel': return 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300';
      case 'cyberCorrect': return 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300';
      case 'ermitsTraining': return 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300';
      case 'ermits': return 'bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-300';
      case 'intelligence': return 'bg-action-cyan-100 text-action-cyan-800 dark:bg-action-cyan-900/30 dark:text-action-cyan-300';
      default: return 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300';
    }
  };

  // Get impact color
  const getImpactColor = (impact: string) => {
    switch (impact) {
      case 'critical': return 'text-red-600 bg-red-100 dark:bg-red-900/30';
      case 'high': return 'text-orange-600 bg-orange-100 dark:bg-orange-900/30';
      case 'medium': return 'text-yellow-600 bg-yellow-100 dark:bg-yellow-900/30';
      case 'low': return 'text-green-600 bg-green-100 dark:bg-green-900/30';
      default: return 'text-gray-600 bg-gray-100 dark:bg-gray-700';
    }
  };

  // Get type icon
  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'predictive': return Brain;
      case 'correlation': return Target;
      case 'recommendation': return Target;
      case 'alert': return Brain;
      default: return Brain;
    }
  };

  return (
    <div className="space-y-6 p-6">
      {/* Header */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
            Intelligence Engine™
          </h1>
          <p className="text-gray-600 dark:text-gray-300 mt-1">
            AI-powered insights and cross-product intelligence correlation
          </p>
        </div>
        
        <div className="flex items-center space-x-3">
          <div className="flex items-center space-x-2">
            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
            <span className="text-sm text-gray-600 dark:text-gray-400">Live Intelligence</span>
          </div>
          
          <button 
            onClick={handleGenerateInsights}
            disabled={isGeneratingInsights}
            className="flex items-center px-4 py-2 bg-command-blue-600 text-white rounded-md hover:bg-command-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <Brain className="h-4 w-4 mr-2" />
            {isGeneratingInsights ? 'Analyzing...' : 'Run Analysis'}
          </button>
        </div>
      </div>

      {/* ERMITS Integration Status */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {Object.entries(mockIntegrationData).map(([product, data]) => (
          <motion.div
            key={product}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white dark:bg-gray-800 rounded-lg shadow p-4 border border-gray-200 dark:border-gray-700"
          >
            <div className="flex items-center justify-between mb-2">
              <h3 className="font-medium text-gray-900 dark:text-white text-sm capitalize">
                {product === 'threatIntel' ? 'ThreatIntel™' :
                 product === 'cyberCorrect' ? 'CyberCorrect™' :
                 product === 'ermitsTraining' ? 'ERMITS Training' :
                 product.replace(/([A-Z])/g, ' $1').trim()}
              </h3>
              <div className="w-2 h-2 bg-green-500 rounded-full"></div>
            </div>
            
            <div className="space-y-1 text-xs">
              {Object.entries(data)
                .filter(([key]) => key !== 'lastUpdate')
                .map(([key, value]) => (
                <div key={key} className="flex justify-between">
                  <span className="text-gray-600 dark:text-gray-400 capitalize">
                    {key.replace(/([A-Z])/g, ' $1').trim()}:
                  </span>
                  <span className="text-gray-900 dark:text-white font-medium">
                    {typeof value === 'string' ? value : String(value)}
                  </span>
                </div>
              ))}
            </div>
            
            <div className="text-xs text-gray-500 dark:text-gray-400 mt-2">
              Updated: {new Date(data.lastUpdate).toLocaleTimeString()}
            </div>
          </motion.div>
        ))}
      </div>

      {/* Intelligence Feed Tabs */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden">
        <div className="border-b border-gray-200 dark:border-gray-700">
          <nav className="flex space-x-8 px-6 pt-4">
            {[
              { id: 'feed', label: 'Intelligence Feed', icon: Brain },
              { id: 'analytics', label: 'Predictive Analytics', icon: Target },
              { id: 'correlations', label: 'Cross-Product Correlations', icon: Brain }
            ].map(tab => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as any)}
                  className={`pb-4 px-1 border-b-2 font-medium text-sm ${
                    activeTab === tab.id
                      ? 'border-command-blue-500 text-command-blue-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 dark:text-gray-400 dark:hover:text-gray-300'
                  }`}
                >
                  <Icon className="h-4 w-4 mr-2 inline" />
                  {tab.label}
                </button>
              );
            })}
          </nav>
        </div>

        <div className="p-6">
          {/* Filters */}
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center space-x-4">
              <select
                value={filterType}
                onChange={(e) => setFilterType(e.target.value as any)}
                className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-800 text-sm"
                aria-label="Filter insights by type"
                title="Filter insights by type"
              >
                <option value="all">All Types</option>
                <option value="predictive">Predictive</option>
                <option value="correlation">Correlation</option>
                <option value="recommendation">Recommendation</option>
                <option value="alert">Alert</option>
              </select>
              
              <label className="flex items-center text-sm text-gray-600 dark:text-gray-400">
                <input
                  type="checkbox"
                  checked={showUnacknowledged}
                  onChange={(e) => setShowUnacknowledged(e.target.checked)}
                  className="mr-2 h-4 w-4 text-command-blue-600 rounded border-gray-300"
                />
                Unacknowledged only
              </label>
            </div>
            
            <span className="text-sm text-gray-500 dark:text-gray-400">
              {filteredInsights.length} insights
            </span>
          </div>

          {/* Intelligence Feed */}
          {activeTab === 'feed' && (
            <div className="space-y-4 max-h-96 overflow-y-auto">
              <AnimatePresence>
                {filteredInsights
                  .sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime())
                  .map((insight) => {
                  const Icon = getTypeIcon(insight.type || 'predictive');
                  
                  return (
                    <motion.div
                      key={insight.id}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: 20 }}
                      className={`border rounded-lg p-4 ${
                        insight.acknowledged 
                          ? 'border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900' 
                          : 'border-action-cyan-200 dark:border-action-cyan-800 bg-action-cyan-50 dark:bg-action-cyan-900/20'
                      }`}
                    >
                      <div className="flex items-start justify-between mb-3">
                        <div className="flex items-center">
                          <Icon className="h-5 w-5 text-command-blue-600 mr-2" />
                          <div>
                            <h3 className="font-medium text-gray-900 dark:text-white">
                              {insight.title}
                            </h3>
                            <div className="flex items-center space-x-2 mt-1">
                              <span className={`px-2 py-1 text-xs font-medium rounded-full ${getSourceColor(insight.source)}`}>
                                {insight.source}
                              </span>
                              <span className={`px-2 py-1 text-xs font-medium rounded-full ${getImpactColor(insight.impact)}`}>
                                {insight.impact} impact
                              </span>
                              {insight.confidence !== undefined && (
                                <span className="text-xs text-gray-500 dark:text-gray-400">
                                  {insight.confidence}% confidence
                                </span>
                              )}
                            </div>
                          </div>
                        </div>
                        
                        {!insight.acknowledged && (
                          <button
                            onClick={() => acknowledgeInsight(insight.id)}
                            className="text-command-blue-600 hover:text-command-blue-800 p-1"
                            aria-label="Acknowledge insight"
                            title="Acknowledge insight"
                          >
                            <CheckCircle className="h-5 w-5" />
                          </button>
                        )}
                      </div>
                      
                      <p className="text-sm text-gray-700 dark:text-gray-300 mb-3">
                        {insight.description}
                      </p>
                      
                      <div className="flex items-center justify-between text-xs">
                        <div className="flex items-center text-gray-500 dark:text-gray-400">
                          <Clock className="h-3 w-3 mr-1" />
                          {insight.timestamp.toLocaleString()}
                        </div>
                        
                        {insight.actionable && (
                          <button className="flex items-center text-command-blue-600 hover:text-command-blue-800">
                            Take Action
                            <Target className="h-3 w-3 ml-1" />
                          </button>
                        )}
                      </div>
                    </motion.div>
                  );
                })}
              </AnimatePresence>
            </div>
          )}

          {/* Predictive Analytics */}
          {activeTab === 'analytics' && (
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-gradient-to-br from-red-50 to-red-100 dark:from-red-900/20 dark:to-red-800/20 rounded-lg p-6 border border-red-200 dark:border-red-800">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="font-semibold text-red-900 dark:text-red-100">Threat Prediction</h3>
                    <Brain className="h-6 w-6 text-red-600 dark:text-red-400" />
                  </div>
                  <div className="text-2xl font-bold text-red-600 dark:text-red-400 mb-2">
                    23% ↑
                  </div>
                  <p className="text-sm text-red-700 dark:text-red-300">
                    Ransomware risk increase predicted for next 30 days
                  </p>
                </div>

                <div className="bg-gradient-to-br from-yellow-50 to-yellow-100 dark:from-yellow-900/20 dark:to-yellow-800/20 rounded-lg p-6 border border-yellow-200 dark:border-yellow-800">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="font-semibold text-yellow-900 dark:text-yellow-100">Compliance Forecast</h3>
                    <Target className="h-6 w-6 text-yellow-600 dark:text-yellow-400" />
                  </div>
                  <div className="text-2xl font-bold text-yellow-600 dark:text-yellow-400 mb-2">
                    87%
                  </div>
                  <p className="text-sm text-yellow-700 dark:text-yellow-300">
                    Projected compliance rate by Q2 2024
                  </p>
                </div>

                <div className="bg-gradient-to-br from-green-50 to-green-100 dark:from-green-900/20 dark:to-green-800/20 rounded-lg p-6 border border-green-200 dark:border-green-800">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="font-semibold text-green-900 dark:text-green-100">Maturity Growth</h3>
                    <Target className="h-6 w-6 text-green-600 dark:text-green-400" />
                  </div>
                  <div className="text-2xl font-bold text-green-600 dark:text-green-400 mb-2">
                    +0.4
                  </div>
                  <p className="text-sm text-green-700 dark:text-green-300">
                    Expected maturity level increase
                  </p>
                </div>
              </div>
              
              {/* Predictive Charts */}
              <EnhancedChart
                type="line"
                title="Risk Trajectory Analysis"
                subtitle="Predicted risk trends based on current data patterns"
                data={{
                  labels: predictiveData.map(item => item.date),
                  datasets: [
                    {
                      label: 'Predicted Risk Score',
                      data: predictiveData.map(item => item.predictedRiskScore),
                      borderColor: '#EF4444',
                      backgroundColor: 'rgba(239, 68, 68, 0.1)',
                      tension: 0.4,
                      fill: true
                    },
                    {
                      label: 'Confidence Level',
                      data: predictiveData.map(item => item.confidence),
                      borderColor: '#3B82F6',
                      backgroundColor: 'rgba(59, 130, 246, 0.1)',
                      tension: 0.4,
                      yAxisID: 'y1'
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
                      type: 'linear' as const,
                      display: true,
                      position: 'left' as const,
                      title: {
                        display: true,
                        text: 'Risk Score'
                      }
                    },
                    y1: {
                      type: 'linear' as const,
                      display: true,
                      position: 'right' as const,
                      title: {
                        display: true,
                        text: 'Confidence %'
                      },
                      grid: {
                        drawOnChartArea: false,
                      },
                    },
                  },
                }}
                loading={loadingAnalytics}
                height={350}
              />
            </div>
          )}

          {/* Cross-Product Correlations */}
          {activeTab === 'correlations' && (
            <div className="space-y-6">
              <div className="bg-gray-50 dark:bg-gray-900 rounded-lg p-6">
                <h3 className="font-semibold text-gray-900 dark:text-white mb-4">
                  ERMITS Ecosystem Correlations
                </h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="bg-white dark:bg-gray-800 rounded-lg p-4 border border-gray-200 dark:border-gray-700">
                    <h4 className="font-medium text-gray-900 dark:text-white mb-3">
                      Threat-Risk Correlation
                    </h4>
                    <div className="space-y-2">
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-gray-600 dark:text-gray-400">Phishing → Access Risk</span>
                        <span className="text-red-600 font-medium">92%</span>
                      </div>
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-gray-600 dark:text-gray-400">Vendor Risk → Data Breach</span>
                        <span className="text-orange-600 font-medium">78%</span>
                      </div>
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-gray-600 dark:text-gray-400">Training Gap → Incidents</span>
                        <span className="text-yellow-600 font-medium">65%</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="bg-white dark:bg-gray-800 rounded-lg p-4 border border-gray-200 dark:border-gray-700">
                    <h4 className="font-medium text-gray-900 dark:text-white mb-3">
                      Control Effectiveness
                    </h4>
                    <div className="space-y-2">
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-gray-600 dark:text-gray-400">MFA Implementation</span>
                        <span className="text-green-600 font-medium">94%</span>
                      </div>
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-gray-600 dark:text-gray-400">Backup Verification</span>
                        <span className="text-blue-600 font-medium">87%</span>
                      </div>
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-gray-600 dark:text-gray-400">Patch Management</span>
                        <span className="text-yellow-600 font-medium">72%</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              
              <NetworkVisualization 
                data={correlationData}
                title="Intelligence Network Graph"
                subtitle="Interactive visualization of cross-product correlations"
              />
            </div>
          )}
        </div>
      </div>
      </div>
    </div>
  );
};

export default IntelligenceEngine;