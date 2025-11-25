import React, { useState, useMemo } from 'react';
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore - Icons exist in lucide-react but TypeScript definitions may be outdated
import * as LucideIcons from 'lucide-react';
import { AssessmentData, AssessmentVersion } from '../../shared/types/assessment';
import { Framework } from '../../types/ermits';

// Type-safe icon imports with fallbacks
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const LucideIconsAny = LucideIcons as any;
const ChevronLeft = LucideIconsAny.ChevronLeft as React.ComponentType<{ className?: string; [key: string]: unknown }>;
const History = LucideIconsAny.History as React.ComponentType<{ className?: string; [key: string]: unknown }>;
const GitBranch = LucideIconsAny.GitBranch as React.ComponentType<{ className?: string; [key: string]: unknown }>;
const Tag = LucideIconsAny.Tag as React.ComponentType<{ className?: string; [key: string]: unknown }>;
const Calendar = LucideIconsAny.Calendar as React.ComponentType<{ className?: string; [key: string]: unknown }>;
const User = LucideIconsAny.User as React.ComponentType<{ className?: string; [key: string]: unknown }>;
const TrendingUp = LucideIconsAny.TrendingUp as React.ComponentType<{ className?: string; [key: string]: unknown }>;
const TrendingDown = LucideIconsAny.TrendingDown as React.ComponentType<{ className?: string; [key: string]: unknown }>;
const Minus = LucideIconsAny.Minus as React.ComponentType<{ className?: string; [key: string]: unknown }>;
const Download = LucideIconsAny.Download as React.ComponentType<{ className?: string; [key: string]: unknown }>;
const RotateCcw = LucideIconsAny.RotateCcw as React.ComponentType<{ className?: string; [key: string]: unknown }>;
const Star = LucideIconsAny.Star as React.ComponentType<{ className?: string; [key: string]: unknown }>;

// Icons that TypeScript recognizes
const { CheckCircle } = LucideIcons;

interface VersionHistoryViewProps {
  assessment: AssessmentData;
  framework: Framework;
  onBack: () => void;
  onRestoreVersion: (versionId: string) => void;
  onCreateVersion: (description: string, versionType: 'major' | 'minor' | 'patch' | 'snapshot') => void;
  onCompareVersions: (baseVersionId: string, compareVersionId: string) => void;
}

export const VersionHistoryView: React.FC<VersionHistoryViewProps> = ({
  assessment,
  framework: _framework,
  onBack,
  onRestoreVersion,
  onCreateVersion,
  onCompareVersions
}) => {
  const [selectedVersions, setSelectedVersions] = useState<string[]>([]);
  const [showCreateVersion, setShowCreateVersion] = useState(false);
  const [filterType, setFilterType] = useState<'all' | 'major' | 'minor' | 'patch' | 'snapshot'>('all');
  const [sortBy, setSortBy] = useState<'date' | 'version' | 'score'>('date');
  const [newVersionForm, setNewVersionForm] = useState<{
    description: string;
    versionType: 'major' | 'minor' | 'patch' | 'snapshot';
    tags: string;
  }>({
    description: '',
    versionType: 'minor',
    tags: ''
  });

  // Mock version history data - in a real app, this would come from props or API
  const versionHistory: AssessmentVersion[] = useMemo(() => [
    {
      id: 'v1',
      versionNumber: '1.0.0',
      assessmentId: assessment.id,
      createdAt: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000), // 30 days ago
      createdBy: 'John Smith',
      versionType: 'major',
      description: 'Initial baseline assessment',
      changes: [],
      responses: {},
      metadata: {
        totalQuestions: 45,
        answeredQuestions: 45,
        overallScore: 65,
        completionRate: 100,
        timeSpent: 120
      },
      tags: ['baseline', 'initial'],
      isBaseline: true,
      approvalStatus: 'approved',
      approvedBy: 'Jane Doe',
      approvedAt: new Date(Date.now() - 29 * 24 * 60 * 60 * 1000),
      size: 2048,
      checksum: 'abc123'
    },
    {
      id: 'v2',
      versionNumber: '1.1.0',
      assessmentId: assessment.id,
      createdAt: new Date(Date.now() - 15 * 24 * 60 * 60 * 1000), // 15 days ago
      createdBy: 'Sarah Johnson',
      versionType: 'minor',
      description: 'Updated access control responses based on new implementations',
      changes: [],
      responses: {},
      metadata: {
        totalQuestions: 45,
        answeredQuestions: 45,
        overallScore: 72,
        completionRate: 100,
        timeSpent: 45
      },
      tags: ['access-control', 'improvement'],
      isBaseline: false,
      approvalStatus: 'approved',
      approvedBy: 'John Smith',
      approvedAt: new Date(Date.now() - 14 * 24 * 60 * 60 * 1000),
      size: 2156,
      checksum: 'def456'
    },
    {
      id: 'v3',
      versionNumber: '1.2.0',
      assessmentId: assessment.id,
      createdAt: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000), // 7 days ago
      createdBy: 'Mike Chen',
      versionType: 'minor',
      description: 'Post-incident assessment updates following security event',
      changes: [],
      responses: {},
      metadata: {
        totalQuestions: 45,
        answeredQuestions: 45,
        overallScore: 78,
        completionRate: 100,
        timeSpent: 60
      },
      tags: ['post-incident', 'security-event'],
      isBaseline: false,
      approvalStatus: 'pending',
      size: 2234,
      checksum: 'ghi789'
    }
  ], [assessment.id]);

  const filteredVersions = useMemo(() => {
    let filtered = versionHistory;
    
    if (filterType !== 'all') {
      filtered = filtered.filter(v => v.versionType === filterType);
    }
    
    filtered.sort((a, b) => {
      switch (sortBy) {
        case 'date':
          return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
        case 'version':
          return b.versionNumber.localeCompare(a.versionNumber);
        case 'score':
          return b.metadata.overallScore - a.metadata.overallScore;
        default:
          return 0;
      }
    });
    
    return filtered;
  }, [versionHistory, filterType, sortBy]);

  const handleVersionSelect = (versionId: string) => {
    setSelectedVersions(prev => {
      if (prev.includes(versionId)) {
        return prev.filter(id => id !== versionId);
      } else if (prev.length < 2) {
        return [...prev, versionId];
      } else {
        return [prev[1], versionId]; // Replace oldest selection
      }
    });
  };

  const handleCreateVersion = () => {
    onCreateVersion(newVersionForm.description, newVersionForm.versionType);
    setNewVersionForm({ description: '', versionType: 'minor', tags: '' });
    setShowCreateVersion(false);
  };

  const getVersionTypeColor = (type: string) => {
    switch (type) {
      case 'major':
        return 'bg-red-100 dark:bg-red-900/30 text-red-800 dark:text-red-300';
      case 'minor':
        return 'bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-300';
      case 'patch':
        return 'bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-300';
      case 'snapshot':
        return 'bg-purple-100 dark:bg-purple-900/30 text-purple-800 dark:text-purple-300';
      default:
        return 'bg-gray-100 dark:bg-gray-900/30 text-gray-800 dark:text-gray-300';
    }
  };

  const getApprovalStatusColor = (status: string) => {
    switch (status) {
      case 'approved':
        return 'bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-300';
      case 'pending':
        return 'bg-yellow-100 dark:bg-yellow-900/30 text-yellow-800 dark:text-yellow-300';
      case 'rejected':
        return 'bg-red-100 dark:bg-red-900/30 text-red-800 dark:text-red-300';
      default:
        return 'bg-gray-100 dark:bg-gray-900/30 text-gray-800 dark:text-gray-300';
    }
  };

  const getScoreChange = (currentScore: number, previousScore?: number) => {
    if (!previousScore) return null;
    const change = currentScore - previousScore;
    return {
      value: change,
      percentage: Math.round((change / previousScore) * 100),
      isPositive: change > 0,
      isNeutral: change === 0
    };
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 mb-8">
        <div className="p-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <button
                onClick={onBack}
                className="flex items-center space-x-2 text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
              >
                <ChevronLeft className="w-5 h-5" />
                <span>Back to Assessment</span>
              </button>
              <div className="h-6 w-px bg-gray-300 dark:bg-gray-600" />
              <div className="flex items-center space-x-3">
                <History className="w-8 h-8 text-blue-600 dark:text-blue-400" />
                <div>
                  <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
                    Version History
                  </h1>
                  <p className="text-gray-600 dark:text-gray-300">
                    {assessment.frameworkName} Assessment
                  </p>
                </div>
              </div>
            </div>
            
            <div className="flex items-center space-x-3">
              {selectedVersions.length === 2 && (
                <button
                  onClick={() => onCompareVersions(selectedVersions[0], selectedVersions[1])}
                  className="flex items-center space-x-2 bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 transition-colors"
                >
                  <GitBranch className="w-4 h-4" />
                  <span>Compare Versions</span>
                </button>
              )}
              
              <button
                onClick={() => setShowCreateVersion(true)}
                className="flex items-center space-x-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
              >
                <Tag className="w-4 h-4" />
                <span>Create Version</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Filters and Controls */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 mb-8 p-6">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between space-y-4 md:space-y-0">
          <div className="flex items-center space-x-4">
            <select
              value={filterType}
              onChange={(e) => setFilterType(e.target.value as 'all' | 'major' | 'minor' | 'patch' | 'snapshot')}
              aria-label="Filter by version type"
              className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="all">All Versions</option>
              <option value="major">Major Versions</option>
              <option value="minor">Minor Versions</option>
              <option value="patch">Patch Versions</option>
              <option value="snapshot">Snapshots</option>
            </select>
            
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as 'date' | 'version' | 'score')}
              aria-label="Sort versions by"
              className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="date">Sort by Date</option>
              <option value="version">Sort by Version</option>
              <option value="score">Sort by Score</option>
            </select>
          </div>
          
          <div className="text-sm text-gray-600 dark:text-gray-300">
            {selectedVersions.length > 0 && (
              <span>{selectedVersions.length} version(s) selected for comparison</span>
            )}
          </div>
        </div>
      </div>

      {/* Version Timeline */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700">
        <div className="p-6 border-b border-gray-200 dark:border-gray-700">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
            Assessment Timeline ({filteredVersions.length} versions)
          </h2>
        </div>
        
        <div className="p-6">
          <div className="space-y-6">
            {filteredVersions.map((version, index) => {
              const previousVersion = filteredVersions[index + 1];
              const scoreChange = getScoreChange(version.metadata.overallScore, previousVersion?.metadata.overallScore);
              const isSelected = selectedVersions.includes(version.id);
              
              return (
                <div key={version.id} className="relative">
                  {/* Timeline Line */}
                  {index < filteredVersions.length - 1 && (
                    <div className="absolute left-6 top-16 w-0.5 h-full bg-gray-200 dark:bg-gray-700 -z-10" />
                  )}
                  
                  <div className={`border-2 rounded-xl p-6 transition-all duration-200 ${
                    isSelected 
                      ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20' 
                      : 'border-gray-200 dark:border-gray-700 hover:border-blue-300 dark:hover:border-blue-600'
                  }`}>
                    <div className="flex items-start space-x-4">
                      {/* Timeline Dot */}
                      <div className={`flex-shrink-0 w-12 h-12 rounded-full flex items-center justify-center ${
                        version.isBaseline 
                          ? 'bg-gradient-to-br from-yellow-400 to-orange-500 text-white' 
                          : 'bg-gradient-to-br from-blue-500 to-indigo-600 text-white'
                      } shadow-lg`}>
                        {version.isBaseline ? <Star className="w-6 h-6" /> : <GitBranch className="w-6 h-6" />}
                      </div>
                      
                      <div className="flex-1">
                        <div className="flex items-center justify-between mb-3">
                          <div className="flex items-center space-x-3">
                            <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                              Version {version.versionNumber}
                            </h3>
                            <span className={`px-3 py-1 rounded-full text-xs font-medium ${getVersionTypeColor(version.versionType)}`}>
                              {version.versionType}
                            </span>
                            <span className={`px-3 py-1 rounded-full text-xs font-medium ${getApprovalStatusColor(version.approvalStatus)}`}>
                              {version.approvalStatus}
                            </span>
                            {version.isBaseline && (
                              <span className="px-3 py-1 rounded-full text-xs font-medium bg-yellow-100 dark:bg-yellow-900/30 text-yellow-800 dark:text-yellow-300">
                                Baseline
                              </span>
                            )}
                          </div>
                          
                          <div className="flex items-center space-x-2">
                            <label className="flex items-center">
                              <span className="sr-only">Select version {version.versionNumber} for comparison</span>
                              <input
                                type="checkbox"
                                checked={isSelected}
                                onChange={() => handleVersionSelect(version.id)}
                                aria-label={`Select version ${version.versionNumber} for comparison`}
                                className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                              />
                            </label>
                            <button
                              onClick={() => onRestoreVersion(version.id)}
                              aria-label={`Restore version ${version.versionNumber}`}
                              className="p-2 text-blue-600 dark:text-blue-400 hover:bg-blue-100 dark:hover:bg-blue-900/30 rounded-lg transition-colors"
                              title="Restore this version"
                            >
                              <RotateCcw className="w-4 h-4" />
                            </button>
                            <button 
                              aria-label={`Download version ${version.versionNumber}`}
                              className="p-2 text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
                            >
                              <Download className="w-4 h-4" />
                            </button>
                          </div>
                        </div>
                        
                        <p className="text-gray-600 dark:text-gray-300 mb-4 leading-relaxed">
                          {version.description}
                        </p>
                        
                        {/* Version Metrics */}
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                          <div className="text-center p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                            <div className="flex items-center justify-center space-x-2">
                              <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">
                                {version.metadata.overallScore}%
                              </div>
                              {scoreChange && (
                                <div className={`flex items-center text-sm ${
                                  scoreChange.isPositive ? 'text-green-600 dark:text-green-400' : 
                                  scoreChange.isNeutral ? 'text-gray-600 dark:text-gray-400' :
                                  'text-red-600 dark:text-red-400'
                                }`}>
                                  {scoreChange.isPositive ? <TrendingUp className="w-3 h-3" /> : 
                                   scoreChange.isNeutral ? <Minus className="w-3 h-3" /> :
                                   <TrendingDown className="w-3 h-3" />}
                                  <span>{scoreChange.isPositive ? '+' : ''}{scoreChange.value}%</span>
                                </div>
                              )}
                            </div>
                            <div className="text-xs text-gray-600 dark:text-gray-400">Overall Score</div>
                          </div>
                          
                          <div className="text-center p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                            <div className="text-2xl font-bold text-green-600 dark:text-green-400">
                              {version.metadata.completionRate}%
                            </div>
                            <div className="text-xs text-gray-600 dark:text-gray-400">Completion</div>
                          </div>
                          
                          <div className="text-center p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                            <div className="text-2xl font-bold text-purple-600 dark:text-purple-400">
                              {version.metadata.timeSpent}m
                            </div>
                            <div className="text-xs text-gray-600 dark:text-gray-400">Time Spent</div>
                          </div>
                          
                          <div className="text-center p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                            <div className="text-2xl font-bold text-orange-600 dark:text-orange-400">
                              {version.changes.length}
                            </div>
                            <div className="text-xs text-gray-600 dark:text-gray-400">Changes</div>
                          </div>
                        </div>
                        
                        {/* Version Details */}
                        <div className="flex items-center justify-between text-sm text-gray-600 dark:text-gray-300">
                          <div className="flex items-center space-x-4">
                            <div className="flex items-center space-x-1">
                              <Calendar className="w-4 h-4" />
                              <span>{version.createdAt.toLocaleDateString()}</span>
                            </div>
                            <div className="flex items-center space-x-1">
                              <User className="w-4 h-4" />
                              <span>{version.createdBy}</span>
                            </div>
                            {version.approvedBy && (
                              <div className="flex items-center space-x-1">
                                <CheckCircle className="w-4 h-4 text-green-500" />
                                <span>Approved by {version.approvedBy}</span>
                              </div>
                            )}
                          </div>
                          
                          <div className="flex items-center space-x-2">
                            {version.tags.map((tag: string, tagIndex: number) => (
                              <span key={tagIndex} className="px-2 py-1 bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 text-xs rounded">
                                #{tag}
                              </span>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Create Version Modal */}
      {showCreateVersion && (
        <div className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="bg-white dark:bg-gray-800 rounded-2xl p-8 max-w-md w-full mx-4 shadow-2xl border border-gray-200 dark:border-gray-700">
            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-6">
              Create New Version
            </h3>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Version Type
                </label>
                <select
                  value={newVersionForm.versionType}
                  onChange={(e) => setNewVersionForm(prev => ({ ...prev, versionType: e.target.value as 'major' | 'minor' | 'patch' | 'snapshot' }))}
                  aria-label="Version Type"
                  className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="patch">Patch (Bug fixes, minor updates)</option>
                  <option value="minor">Minor (New features, improvements)</option>
                  <option value="major">Major (Significant changes, restructuring)</option>
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Description
                </label>
                <textarea
                  value={newVersionForm.description}
                  onChange={(e) => setNewVersionForm(prev => ({ ...prev, description: e.target.value }))}
                  className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                  rows={3}
                  placeholder="Describe the changes in this version..."
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Tags (comma-separated)
                </label>
                <input
                  type="text"
                  value={newVersionForm.tags}
                  onChange={(e) => setNewVersionForm(prev => ({ ...prev, tags: e.target.value }))}
                  className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="annual-review, post-incident, improvement"
                />
              </div>
            </div>
            
            <div className="flex space-x-4 mt-8">
              <button
                onClick={() => setShowCreateVersion(false)}
                className="flex-1 px-6 py-3 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors font-medium"
              >
                Cancel
              </button>
              <button
                onClick={handleCreateVersion}
                disabled={!newVersionForm.description.trim()}
                className="flex-1 px-6 py-3 bg-blue-600 text-white rounded-xl hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors font-medium"
              >
                Create Version
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};