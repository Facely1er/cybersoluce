import React, { useState, useMemo } from 'react';
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore - Icons exist in lucide-react but TypeScript definitions may be outdated
import * as LucideIcons from 'lucide-react';

// Type-safe icon imports with fallbacks
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const LucideIconsAny = LucideIcons as any;
const Search = LucideIconsAny.Search as React.ComponentType<{ className?: string; [key: string]: unknown }>;
const Download = LucideIconsAny.Download as React.ComponentType<{ className?: string; [key: string]: unknown }>;
const AlertTriangle = LucideIconsAny.AlertTriangle as React.ComponentType<{ className?: string; [key: string]: unknown }>;
const AlertCircle = LucideIconsAny.AlertCircle as React.ComponentType<{ className?: string; [key: string]: unknown }>;
const ExternalLink = LucideIconsAny.ExternalLink as React.ComponentType<{ className?: string; [key: string]: unknown }>;
const Landmark = LucideIconsAny.Landmark as React.ComponentType<{ className?: string; [key: string]: unknown }>;
const KeyRound = LucideIconsAny.KeyRound as React.ComponentType<{ className?: string; [key: string]: unknown }>;
const ShieldCheck = LucideIconsAny.ShieldCheck as React.ComponentType<{ className?: string; [key: string]: unknown }>;
const Globe = LucideIconsAny.Globe as React.ComponentType<{ className?: string; [key: string]: unknown }>;
const Building = LucideIconsAny.Building as React.ComponentType<{ className?: string; [key: string]: unknown }>;
const RotateCcw = LucideIconsAny.RotateCcw as React.ComponentType<{ className?: string; [key: string]: unknown }>;
const Handshake = LucideIconsAny.Handshake as React.ComponentType<{ className?: string; [key: string]: unknown }>;
const GraduationCap = LucideIconsAny.GraduationCap as React.ComponentType<{ className?: string; [key: string]: unknown }>;
const Scale = LucideIconsAny.Scale as React.ComponentType<{ className?: string; [key: string]: unknown }>;
const Award = LucideIconsAny.Award as React.ComponentType<{ className?: string; [key: string]: unknown }>;
const ArrowRight = LucideIconsAny.ArrowRight as React.ComponentType<{ className?: string; [key: string]: unknown }>;
const BarChart3 = LucideIconsAny.BarChart3 as React.ComponentType<{ className?: string; [key: string]: unknown }>;

// Icons that TypeScript recognizes
const { FileText, Shield } = LucideIcons;
import { Breadcrumbs } from './Breadcrumbs';
import { SecurityPolicy, securityPolicies, policyCategories, frameworkMappings } from './data/policies';

interface PolicyRepositoryViewProps {
  onBack: () => void;
}

export const PolicyRepositoryView: React.FC<PolicyRepositoryViewProps> = ({ onBack: _onBack }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterCategory, setFilterCategory] = useState('all');
  const [filterFramework, setFilterFramework] = useState('all');
  const [filterPriority, setFilterPriority] = useState('all');
  const [filterFrequency, setFilterFrequency] = useState('all');
  const [sortBy, setSortBy] = useState<'name' | 'priority' | 'lastUpdated' | 'frequency'>('priority');
  const [selectedPolicy, setSelectedPolicy] = useState<SecurityPolicy | null>(null);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');

  // Filter and sort policies
  const filteredPolicies = useMemo(() => {
    const filtered = securityPolicies.filter(policy => {
      const matchesSearch = policy.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           policy.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           policy.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
      const matchesCategory = filterCategory === 'all' || policy.category === filterCategory;
      const matchesFramework = filterFramework === 'all' || policy.complianceMapping.includes(filterFramework);
      const matchesPriority = filterPriority === 'all' || policy.priority === filterPriority;
      const matchesFrequency = filterFrequency === 'all' || policy.frequencyOfUse === filterFrequency;
      
      return matchesSearch && matchesCategory && matchesFramework && matchesPriority && matchesFrequency;
    });

    // Sort policies
    filtered.sort((a, b) => {
      switch (sortBy) {
        case 'name':
          return a.name.localeCompare(b.name);
        case 'priority': {
          const priorityOrder = { critical: 4, high: 3, medium: 2, low: 1 };
          return priorityOrder[b.priority] - priorityOrder[a.priority];
        }
        case 'lastUpdated':
          return new Date(b.lastUpdated).getTime() - new Date(a.lastUpdated).getTime();
        case 'frequency': {
          const frequencyOrder: Record<string, number> = { daily: 7, weekly: 6, monthly: 5, quarterly: 4, annually: 3, 'as-needed': 2 };
          return (frequencyOrder[b.frequencyOfUse] || 0) - (frequencyOrder[a.frequencyOfUse] || 0);
        }
        default:
          return 0;
      }
    });

    return filtered;
  }, [searchTerm, filterCategory, filterFramework, filterPriority, filterFrequency, sortBy]);

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'critical':
        return 'bg-red-100 dark:bg-red-900/30 text-red-800 dark:text-red-300 border-red-200 dark:border-red-800';
      case 'high':
        return 'bg-orange-100 dark:bg-orange-900/30 text-orange-800 dark:text-orange-300 border-orange-200 dark:border-orange-800';
      case 'medium':
        return 'bg-yellow-100 dark:bg-yellow-900/30 text-yellow-800 dark:text-yellow-300 border-yellow-200 dark:border-yellow-800';
      case 'low':
        return 'bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-300 border-green-200 dark:border-green-800';
      default:
        return 'bg-gray-100 dark:bg-gray-900/30 text-gray-800 dark:text-gray-300 border-gray-200 dark:border-gray-800';
    }
  };

  const getFrequencyColor = (frequency: string) => {
    switch (frequency) {
      case 'daily':
        return 'bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-300';
      case 'weekly':
        return 'bg-indigo-100 dark:bg-indigo-900/30 text-indigo-800 dark:text-indigo-300';
      case 'monthly':
        return 'bg-purple-100 dark:bg-purple-900/30 text-purple-800 dark:text-purple-300';
      case 'quarterly':
        return 'bg-pink-100 dark:bg-pink-900/30 text-pink-800 dark:text-pink-300';
      case 'annually':
        return 'bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-300';
      case 'as-needed':
        return 'bg-gray-100 dark:bg-gray-900/30 text-gray-800 dark:text-gray-300';
      default:
        return 'bg-gray-100 dark:bg-gray-900/30 text-gray-800 dark:text-gray-300';
    }
  };

  const getCategoryIcon = (category: string) => {
    const iconMap: Record<string, React.ComponentType<{ className?: string; size?: number }>> = {
      'governance': Landmark,
      'access-control': KeyRound,
      'data-protection': ShieldCheck,
      'incident-response': AlertTriangle,
      'network-security': Globe,
      'physical-security': Building,
      'business-continuity': RotateCcw,
      'vendor-management': Handshake,
      'training-awareness': GraduationCap,
      'risk-management': Scale
    };
    
    return iconMap[category] || FileText;
  };

  const getBusinessImpactColor = (impact: string) => {
    switch (impact) {
      case 'critical':
        return 'text-red-600 dark:text-red-400';
      case 'high':
        return 'text-orange-600 dark:text-orange-400';
      case 'medium':
        return 'text-yellow-600 dark:text-yellow-400';
      case 'low':
        return 'text-green-600 dark:text-green-400';
      default:
        return 'text-gray-600 dark:text-gray-400';
    }
  };

  const stats = useMemo(() => {
    const total = securityPolicies.length;
    const critical = securityPolicies.filter(p => p.priority === 'critical').length;
    const templatesAvailable = securityPolicies.filter(p => p.templateAvailable).length;
    const frameworks = new Set(securityPolicies.flatMap(p => p.complianceMapping)).size;
    
    return { total, critical, templatesAvailable, frameworks };
  }, []);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Breadcrumbs */}
      <div className="mb-6">
        <Breadcrumbs 
          items={[
            { label: 'Dashboard', href: '#' },
            { label: 'Policy Repository' }
          ]}
        />
      </div>

      {/* Header */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 mb-8">
        <div className="p-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="p-3 bg-gradient-to-br from-blue-100 to-indigo-100 dark:from-blue-900/30 dark:to-indigo-900/30 rounded-xl">
                <Shield className="w-8 h-8 text-blue-600 dark:text-blue-400" />
              </div>
              <div>
                <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
                  Security Policy Repository
                </h1>
                <p className="text-gray-600 dark:text-gray-300 mt-2 text-lg">
                  Comprehensive collection of baseline security policies mapped to compliance frameworks
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Statistics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg border border-gray-200 dark:border-gray-700">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Total Policies</p>
              <p className="text-3xl font-bold text-blue-600 dark:text-blue-400">{stats.total}</p>
            </div>
            <FileText className="w-8 h-8 text-blue-600 dark:text-blue-400" />
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg border border-gray-200 dark:border-gray-700">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Critical Priority</p>
              <p className="text-3xl font-bold text-red-600 dark:text-red-400">{stats.critical}</p>
            </div>
            <AlertCircle className="w-8 h-8 text-red-600 dark:text-red-400" />
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg border border-gray-200 dark:border-gray-700">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Templates Available</p>
              <p className="text-3xl font-bold text-green-600 dark:text-green-400">{stats.templatesAvailable}</p>
            </div>
            <Download className="w-8 h-8 text-green-600 dark:text-green-400" />
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg border border-gray-200 dark:border-gray-700">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Frameworks Covered</p>
              <p className="text-3xl font-bold text-purple-600 dark:text-purple-400">{stats.frameworks}</p>
            </div>
            <Award className="w-8 h-8 text-purple-600 dark:text-purple-400" />
          </div>
        </div>
      </div>

      {/* Filters and Search */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 mb-8 p-6">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0">
          <div className="flex-1 max-w-lg">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search policies, descriptions, or tags..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-12 pr-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
          </div>
          
          <div className="flex flex-wrap gap-4">
            <select
              value={filterCategory}
              onChange={(e) => setFilterCategory(e.target.value)}
              aria-label="Filter by category"
              title="Filter by category"
              className="px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="all">All Categories</option>
              {policyCategories.map((category: string) => (
                <option key={category} value={category}>{category}</option>
              ))}
            </select>
            
            <select
              value={filterFramework}
              onChange={(e) => setFilterFramework(e.target.value)}
              aria-label="Filter by framework"
              title="Filter by framework"
              className="px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="all">All Frameworks</option>
              {Object.entries(frameworkMappings).map(([id, _names]: [string, string[]]) => (
                <option key={id} value={id}>{id}</option>
              ))}
            </select>

            <select
              value={filterPriority}
              onChange={(e) => setFilterPriority(e.target.value)}
              aria-label="Filter by priority"
              title="Filter by priority"
              className="px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="all">All Priorities</option>
              <option value="critical">Critical</option>
              <option value="high">High</option>
              <option value="medium">Medium</option>
              <option value="low">Low</option>
            </select>

            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as 'name' | 'priority' | 'lastUpdated' | 'frequency')}
              aria-label="Sort policies by"
              title="Sort policies by"
              className="px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="priority">Sort by Priority</option>
              <option value="name">Sort by Name</option>
              <option value="lastUpdated">Sort by Last Updated</option>
              <option value="frequency">Sort by Frequency</option>
            </select>

            <div className="flex border border-gray-300 dark:border-gray-600 rounded-xl overflow-hidden">
              <button
                onClick={() => setViewMode('grid')}
                aria-label="Switch to grid view"
                title="Switch to grid view"
                className={`px-4 py-3 ${viewMode === 'grid' ? 'bg-blue-600 text-white' : 'bg-white dark:bg-gray-700 text-gray-900 dark:text-white'} transition-colors`}
              >
                <BarChart3 className="w-4 h-4" />
              </button>
              <button
                onClick={() => setViewMode('list')}
                aria-label="Switch to list view"
                title="Switch to list view"
                className={`px-4 py-3 ${viewMode === 'list' ? 'bg-blue-600 text-white' : 'bg-white dark:bg-gray-700 text-gray-900 dark:text-white'} transition-colors`}
              >
                <FileText className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Policy Categories Overview */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 mb-8 p-6">
        <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-6">Policy Categories</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
          {policyCategories.map((category: string) => {
            const categoryCount = securityPolicies.filter(p => p.category === category).length;
            const CategoryIcon = getCategoryIcon(category);
            return (
              <button
                key={category}
                onClick={() => setFilterCategory(category)}
                className={`p-4 rounded-lg border-2 transition-all duration-200 text-left hover:shadow-md ${
                  filterCategory === category
                    ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20'
                    : 'border-gray-200 dark:border-gray-600 hover:border-blue-300 dark:hover:border-blue-500'
                }`}
              >
                <div className="mb-2">
                  <CategoryIcon className="w-8 h-8 text-blue-600 dark:text-blue-400" />
                </div>
                <div className="font-medium text-gray-900 dark:text-white text-sm mb-1">
                  {category}
                </div>
                <div className="text-xs text-gray-600 dark:text-gray-300">
                  {categoryCount} policies
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Policies Display */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700">
        <div className="p-6 border-b border-gray-200 dark:border-gray-700">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
              Security Policies ({filteredPolicies.length})
            </h2>
            <div className="text-sm text-gray-500 dark:text-gray-400">
              {filteredPolicies.filter(p => p.priority === 'critical').length} critical • 
              {filteredPolicies.filter(p => p.templateAvailable).length} templates available
            </div>
          </div>
        </div>

        {filteredPolicies.length === 0 ? (
          <div className="p-16 text-center">
            <FileText className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
              No Policies Found
            </h3>
            <p className="text-gray-600 dark:text-gray-300 mb-8">
              No policies match your current search and filter criteria.
            </p>
            <button
              onClick={() => {
                setSearchTerm('');
                setFilterCategory('all');
                setFilterFramework('all');
                setFilterPriority('all');
                setFilterFrequency('all');
              }}
              className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors"
            >
              Clear All Filters
            </button>
          </div>
        ) : viewMode === 'grid' ? (
          <div className="p-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredPolicies.map(policy => {
              const CategoryIcon = getCategoryIcon(policy.category);
              return (
              <div
                key={policy.id}
                className="border border-gray-200 dark:border-gray-700 rounded-xl p-6 hover:shadow-lg transition-all duration-300 cursor-pointer group"
                onClick={() => setSelectedPolicy(policy)}
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center space-x-3">
                    <div className="p-2 bg-blue-100 dark:bg-blue-900/30 rounded-lg">
                      <CategoryIcon className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                    </div>
                    <div>
                      <h3 className="font-bold text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                        {policy.name}
                      </h3>
                      <div className="text-sm text-gray-500 dark:text-gray-400">
                        v{policy.version} • {policy.documentType}
                      </div>
                    </div>
                  </div>
                  <div className="flex flex-col items-end space-y-2">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium border ${getPriorityColor(policy.priority)}`}>
                      {policy.priority}
                    </span>
                    {policy.templateAvailable && (
                      <Download className="w-4 h-4 text-green-500" />
                    )}
                  </div>
                </div>

                <p className="text-gray-600 dark:text-gray-300 text-sm mb-4 line-clamp-3">
                  {policy.description}
                </p>

                <div className="space-y-3 mb-4">
                  <div className="flex items-center justify-between text-sm">
                    {policy.spanOfUse && (
                      <>
                        <span className="text-gray-500 dark:text-gray-400">Span of Use:</span>
                        <span className="font-medium text-gray-900 dark:text-white capitalize">
                          {policy.spanOfUse.replace('-', ' ')}
                        </span>
                      </>
                    )}
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-500 dark:text-gray-400">Frequency:</span>
                    <span className={`px-2 py-1 rounded text-xs font-medium ${getFrequencyColor(policy.frequencyOfUse)}`}>
                      {policy.frequencyOfUse}
                    </span>
                  </div>
                  {policy.businessImpact && (
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-500 dark:text-gray-400">Business Impact:</span>
                      <span className={`font-medium ${getBusinessImpactColor(policy.businessImpact)}`}>
                        {policy.businessImpact}
                      </span>
                    </div>
                  )}
                </div>

                <div className="border-t border-gray-200 dark:border-gray-700 pt-4">
                  <div className="text-xs text-gray-500 dark:text-gray-400 mb-2">Compliance Mapping:</div>
                  <div className="flex flex-wrap gap-1">
                    {policy.complianceMapping.slice(0, 3).map(framework => (
                      <span
                        key={framework}
                        className="px-2 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-300 text-xs rounded"
                      >
                        {frameworkMappings[framework] || framework}
                      </span>
                    ))}
                    {policy.complianceMapping.length > 3 && (
                      <span className="px-2 py-1 bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 text-xs rounded">
                        +{policy.complianceMapping.length - 3}
                      </span>
                    )}
                  </div>
                </div>
              </div>
              );
            })}
          </div>
        ) : (
          <div className="divide-y divide-gray-200 dark:divide-gray-700">
            {filteredPolicies.map(policy => {
              const CategoryIcon = getCategoryIcon(policy.category);
              return (
              <div
                key={policy.id}
                className="p-6 hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors cursor-pointer"
                onClick={() => setSelectedPolicy(policy)}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4 flex-1">
                    <div className="p-2 bg-blue-100 dark:bg-blue-900/30 rounded-lg">
                      <CategoryIcon className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                    </div>
                    
                    <div className="flex-1 grid grid-cols-1 md:grid-cols-6 gap-4">
                      <div className="md:col-span-2">
                        <h3 className="font-bold text-gray-900 dark:text-white">{policy.name}</h3>
                        <p className="text-sm text-gray-600 dark:text-gray-300">v{policy.version} • {policy.owner}</p>
                      </div>
                      
                      <div className="text-center">
                        <span className={`px-2 py-1 rounded-full text-xs font-medium border ${getPriorityColor(policy.priority)}`}>
                          {policy.priority}
                        </span>
                      </div>
                      
                      <div className="text-center">
                        <span className={`px-2 py-1 rounded text-xs font-medium ${getFrequencyColor(policy.frequencyOfUse)}`}>
                          {policy.frequencyOfUse}
                        </span>
                      </div>
                      
                      {policy.spanOfUse && (
                        <div className="text-center">
                          <span className="text-sm text-gray-600 dark:text-gray-300 capitalize">
                            {policy.spanOfUse.replace('-', ' ')}
                          </span>
                        </div>
                      )}
                      
                      <div className="text-center">
                        <div className="flex items-center justify-center space-x-2">
                          {policy.templateAvailable && (
                            <Download className="w-4 h-4 text-green-500" />
                          )}
                          <span className="text-sm text-gray-500 dark:text-gray-400">
                            {policy.complianceMapping.length} frameworks
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <ArrowRight className="w-5 h-5 text-gray-400" />
                </div>
              </div>
              );
            })}
          </div>
        )}
      </div>

      {/* Policy Detail Modal */}
      {selectedPolicy && (
        <div className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white dark:bg-gray-800 rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto shadow-2xl border border-gray-200 dark:border-gray-700">
            <div className="p-8">
              {/* Header */}
              <div className="flex items-start justify-between mb-6">
                <div className="flex items-center space-x-4">
                  <div className="p-3 bg-blue-100 dark:bg-blue-900/30 rounded-xl">
                    {(() => {
                      const CategoryIcon = getCategoryIcon(selectedPolicy.category);
                      return <CategoryIcon className="w-8 h-8 text-blue-600 dark:text-blue-400" />;
                    })()}
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                      {selectedPolicy.name}
                    </h2>
                    <div className="flex items-center space-x-4 mt-2">
                      {selectedPolicy.version && (
                        <span className="text-sm text-gray-600 dark:text-gray-300">
                          Version {selectedPolicy.version}
                        </span>
                      )}
                      <span className={`px-3 py-1 rounded-full text-xs font-medium border ${getPriorityColor(selectedPolicy.priority)}`}>
                        {selectedPolicy.priority} Priority
                      </span>
                      {selectedPolicy.documentType && (
                        <span className="text-sm text-gray-600 dark:text-gray-300">
                          {selectedPolicy.documentType}
                        </span>
                      )}
                    </div>
                  </div>
                </div>
                <button
                  onClick={() => setSelectedPolicy(null)}
                  className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 text-2xl"
                >
                  ×
                </button>
              </div>

              {/* Description */}
              <div className="mb-6">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">Description</h3>
                <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                  {selectedPolicy.description}
                </p>
              </div>

              {/* Key Details Grid */}
              <div className="grid md:grid-cols-2 gap-6 mb-6">
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                    <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Span of Use</span>
                    <span className="text-sm text-gray-900 dark:text-white capitalize">
                      {selectedPolicy.spanOfUse?.replace('-', ' ') || 'N/A'}
                    </span>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                    <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Frequency of Use</span>
                    <span className={`px-2 py-1 rounded text-xs font-medium ${getFrequencyColor(selectedPolicy.frequencyOfUse)}`}>
                      {selectedPolicy.frequencyOfUse}
                    </span>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                    <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Review Frequency</span>
                    <span className="text-sm text-gray-900 dark:text-white">
                      {selectedPolicy.reviewFrequency}
                    </span>
                  </div>
                  {selectedPolicy.businessImpact && (
                    <div className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                      <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Business Impact</span>
                      <span className={`font-medium ${getBusinessImpactColor(selectedPolicy.businessImpact)}`}>
                        {selectedPolicy.businessImpact}
                      </span>
                    </div>
                  )}
                </div>
                
                <div className="space-y-4">
                  {selectedPolicy.owner && (
                    <div className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                      <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Owner</span>
                      <span className="text-sm text-gray-900 dark:text-white">{selectedPolicy.owner}</span>
                    </div>
                  )}
                  {selectedPolicy.approver && (
                    <div className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                      <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Approver</span>
                      <span className="text-sm text-gray-900 dark:text-white">{selectedPolicy.approver}</span>
                    </div>
                  )}
                  <div className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                    <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Last Updated</span>
                    <span className="text-sm text-gray-900 dark:text-white">
                      {selectedPolicy.lastUpdated instanceof Date 
                        ? selectedPolicy.lastUpdated.toLocaleDateString()
                        : new Date(selectedPolicy.lastUpdated).toLocaleDateString()}
                    </span>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                    <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Implementation Time</span>
                    <span className="text-sm text-gray-900 dark:text-white">
                      {selectedPolicy.estimatedImplementationTime}
                    </span>
                  </div>
                </div>
              </div>

              {/* Implementation Guidance */}
              <div className="mb-6">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">Implementation Guidance</h3>
                <p className="text-gray-600 dark:text-gray-300 leading-relaxed bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg">
                  {selectedPolicy.implementationGuidance}
                </p>
              </div>

              {/* Compliance Requirements */}
              <div className="mb-6">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">Compliance Requirements</h3>
                <div className="space-y-3">
                  {selectedPolicy.complianceRequirements?.map((req: { framework: string; mandatory: boolean; controls: string[] }, index: number) => (
                    <div key={index} className="border border-gray-200 dark:border-gray-600 rounded-lg p-4">
                      <div className="flex items-center justify-between mb-2">
                        <span className="font-medium text-gray-900 dark:text-white">{req.framework}</span>
                        <span className={`px-2 py-1 rounded text-xs font-medium ${
                          req.mandatory 
                            ? 'bg-red-100 dark:bg-red-900/30 text-red-800 dark:text-red-300' 
                            : 'bg-yellow-100 dark:bg-yellow-900/30 text-yellow-800 dark:text-yellow-300'
                        }`}>
                          {req.mandatory ? 'Mandatory' : 'Recommended'}
                        </span>
                      </div>
                      <div className="text-sm text-gray-600 dark:text-gray-300">
                        Controls: {req.controls.join(', ')}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Framework Mapping */}
              <div className="mb-6">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">Framework Mapping</h3>
                <div className="flex flex-wrap gap-2">
                  {selectedPolicy.complianceMapping.map((framework: string) => (
                    <span
                      key={framework}
                      className="px-3 py-2 bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-300 text-sm rounded-lg border border-blue-200 dark:border-blue-800"
                    >
                      {frameworkMappings[framework]?.[0] || framework}
                    </span>
                  ))}
                </div>
              </div>

              {/* Tags */}
              <div className="mb-6">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">Tags</h3>
                <div className="flex flex-wrap gap-2">
                  {selectedPolicy.tags.map((tag: string) => (
                    <span
                      key={tag}
                      className="px-3 py-1 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 text-sm rounded-full"
                    >
                      #{tag}
                    </span>
                  ))}
                </div>
              </div>

              {/* Actions */}
              <div className="flex space-x-4">
                {selectedPolicy.templateAvailable && (
                  <button className="flex items-center space-x-2 bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors">
                    <Download className="w-4 h-4" />
                    <span>Download Template</span>
                  </button>
                )}
                <button className="flex items-center space-x-2 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 px-6 py-3 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
                  <ExternalLink className="w-4 h-4" />
                  <span>View Full Document</span>
                </button>
                <button
                  onClick={() => setSelectedPolicy(null)}
                  className="px-6 py-3 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};