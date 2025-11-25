import React, { useState } from 'react';
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore - Icons exist in lucide-react but TypeScript definitions may be outdated
import * as LucideIcons from 'lucide-react';

// Type-safe icon imports with fallbacks
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const LucideIconsAny = LucideIcons as any;
const ChevronLeft = LucideIconsAny.ChevronLeft as React.ComponentType<{ className?: string; [key: string]: unknown }>;
const Download = LucideIconsAny.Download as React.ComponentType<{ className?: string; [key: string]: unknown }>;
const Star = LucideIconsAny.Star as React.ComponentType<{ className?: string; [key: string]: unknown }>;
const Building = LucideIconsAny.Building as React.ComponentType<{ className?: string; [key: string]: unknown }>;
const Filter = LucideIconsAny.Filter as React.ComponentType<{ className?: string; [key: string]: unknown }>;

// Icons that TypeScript recognizes
const { FileText, Users, Clock, Target } = LucideIcons;

import { templates } from './data/templates';

interface TemplateViewProps {
  onStartFromTemplate: (frameworkId: string, templateId: string) => void;
  onBack: () => void;
}

export const TemplateView: React.FC<TemplateViewProps> = ({
  onStartFromTemplate,
  onBack
}) => {
  const [filterIndustry, setFilterIndustry] = useState('all');
  const [filterFramework, setFilterFramework] = useState('all');

  const industries = [
    'all', 'Financial Services', 'Healthcare', 'Manufacturing', 'Government', 
    'Retail', 'Energy & Utilities', 'Technology', 'Education'
  ];
  
  const frameworkOptions = ['all', 'nist', 'iso27001', 'cmmc', 'privacy', 'scrm', 'hipaa', 'ferpa'];

  const filteredTemplates = templates.filter(template => {
    const matchesIndustry = filterIndustry === 'all' || template.industry === filterIndustry;
    const matchesFramework = filterFramework === 'all' || template.frameworkId === filterFramework;
    return matchesIndustry && matchesFramework;
  });

  const getFrameworkName = (frameworkId: string) => {
    const names: Record<string, string> = {
      'nist': 'NIST CSF',
      'iso27001': 'ISO 27001',
      'cmmc': 'CMMC',
      'privacy': 'NIST Privacy',
      'scrm': 'Supply Chain RM',
      'hipaa': 'HIPAA Security',
      'ferpa': 'FERPA'
    };
    return names[frameworkId] || frameworkId;
  };

  const getIndustryIcon = (industry: string) => {
    switch (industry) {
      case 'Financial Services':
        return '🏦';
      case 'Healthcare':
        return '🏥';
      case 'Manufacturing':
        return '🏭';
      case 'Government':
        return '🏛️';
      case 'Retail':
        return '🛍️';
      case 'Energy & Utilities':
        return '⚡';
      case 'Technology':
        return '💻';
      case 'Education':
        return '🎓';
      default:
        return '🏢';
    }
  };

  const getEstimatedTime = (prefilledCount: number, frameworkId: string) => {
    const baseTime = frameworkId === 'nist' ? 120 : frameworkId === 'iso27001' ? 180 : 90;
    const reduction = Math.min(prefilledCount * 5, baseTime * 0.4);
    return Math.round(baseTime - reduction);
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
                <span>Back to Dashboard</span>
              </button>
              <div className="h-6 w-px bg-gray-300 dark:bg-gray-600" />
              <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
                Assessment Templates
              </h1>
            </div>
          </div>
          <p className="text-gray-600 dark:text-gray-300 mt-2">
            Start your assessment with industry-specific templates that include pre-configured baseline responses and best practices
          </p>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 mb-8 p-6">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between space-y-4 md:space-y-0">
          <div className="flex items-center space-x-2">
            <Filter className="w-5 h-5 text-gray-400" />
            <span className="font-medium text-gray-900 dark:text-white">Filter Templates</span>
            <span className="text-sm text-gray-500 dark:text-gray-400">
              ({filteredTemplates.length} templates)
            </span>
          </div>
          
          <div className="flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-4">
            <select
              value={filterIndustry}
              onChange={(e) => setFilterIndustry(e.target.value)}
              aria-label="Filter by industry"
              className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              {industries.map(industry => (
                <option key={industry} value={industry}>
                  {industry === 'all' ? 'All Industries' : industry}
                </option>
              ))}
            </select>
            
            <select
              value={filterFramework}
              onChange={(e) => setFilterFramework(e.target.value)}
              aria-label="Filter by framework"
              className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              {frameworkOptions.map(framework => (
                <option key={framework} value={framework}>
                  {framework === 'all' ? 'All Frameworks' : getFrameworkName(framework)}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Templates Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredTemplates.map(template => {
          const prefilledCount = Object.keys(template.prefilledResponses).length;
          const estimatedTime = getEstimatedTime(prefilledCount, template.frameworkId);
          
          return (
            <div key={template.id} className="bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 hover:shadow-xl transition-all duration-300 group">
              <div className="p-6">
                {/* Header */}
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center space-x-3">
                    <div className="text-2xl">
                      {getIndustryIcon(template.industry)}
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900 dark:text-white text-lg group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                        {template.name}
                      </h3>
                      <div className="flex items-center space-x-2 mt-1">
                        <span className="px-2 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-300 text-xs font-medium rounded">
                          {getFrameworkName(template.frameworkId)}
                        </span>
                        <span className="px-2 py-1 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 text-xs font-medium rounded">
                          {template.industry}
                        </span>
                      </div>
                    </div>
                  </div>
                  
                  {template.isPublic && (
                    <div className="flex items-center space-x-1 text-yellow-500">
                      <Star className="w-4 h-4 fill-current" />
                      <span className="text-xs font-medium">Public</span>
                    </div>
                  )}
                </div>

                {/* Description */}
                <p className="text-gray-600 dark:text-gray-300 text-sm mb-4 leading-relaxed line-clamp-3">
                  {template.description}
                </p>

                {/* Metrics */}
                <div className="grid grid-cols-2 gap-4 mb-4">
                  <div className="flex items-center space-x-2">
                    <Target className="w-4 h-4 text-green-500" />
                    <div>
                      <div className="text-xs text-gray-500 dark:text-gray-400">Pre-filled</div>
                      <div className="font-semibold text-gray-900 dark:text-white">
                        {prefilledCount} questions
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Clock className="w-4 h-4 text-blue-500" />
                    <div>
                      <div className="text-xs text-gray-500 dark:text-gray-400">Est. Time</div>
                      <div className="font-semibold text-gray-900 dark:text-white">
                        {estimatedTime} min
                      </div>
                    </div>
                  </div>
                </div>

                {/* Tags */}
                <div className="flex flex-wrap gap-2 mb-4">
                  {template.tags.slice(0, 3).map(tag => (
                    <span
                      key={tag}
                      className="px-2 py-1 bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 text-xs rounded"
                    >
                      #{tag}
                    </span>
                  ))}
                  {template.tags.length > 3 && (
                    <span className="px-2 py-1 bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 text-xs rounded">
                      +{template.tags.length - 3} more
                    </span>
                  )}
                </div>

                {/* Footer */}
                <div className="flex items-center justify-between text-sm text-gray-600 dark:text-gray-300 mb-6">
                  <div className="flex items-center space-x-1">
                    <Users className="w-4 h-4" />
                    <span>By {template.createdBy}</span>
                  </div>
                  <div className="text-xs">
                    {template.createdAt.toLocaleDateString()}
                  </div>
                </div>

                {/* Actions */}
                <div className="flex space-x-3">
                  <button
                    onClick={() => onStartFromTemplate(template.frameworkId, template.id)}
                    className="flex-1 bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors font-medium text-sm group-hover:bg-blue-700"
                  >
                    Use Template
                  </button>
                  <button 
                    aria-label={`Download template ${template.name}`}
                    className="p-2 border border-gray-300 dark:border-gray-600 text-gray-600 dark:text-gray-300 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                  >
                    <Download className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Empty State */}
      {filteredTemplates.length === 0 && (
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 p-12 text-center">
          <FileText className="w-16 h-16 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
            No Templates Found
          </h3>
          <p className="text-gray-600 dark:text-gray-300 mb-6">
            No templates match your current filter criteria. Try adjusting your filters or check back later for new templates.
          </p>
          <button
            onClick={() => {
              setFilterIndustry('all');
              setFilterFramework('all');
            }}
            className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors"
          >
            Clear Filters
          </button>
        </div>
      )}

      {/* Template Creation CTA */}
      <div className="bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 rounded-xl border border-blue-200 dark:border-blue-800 p-8 mt-8 text-center">
        <Building className="w-12 h-12 text-blue-600 dark:text-blue-400 mx-auto mb-4" />
        <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
          Need a Custom Template?
        </h3>
        <p className="text-gray-600 dark:text-gray-300 mb-6 max-w-2xl mx-auto">
          Our experts can create custom assessment templates tailored to your organization's specific industry, 
          compliance requirements, and security posture. Get started faster with pre-configured baselines.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button className="bg-blue-600 text-white px-8 py-3 rounded-lg hover:bg-blue-700 transition-colors font-medium">
            Request Custom Template
          </button>
          <button className="border border-blue-600 text-blue-600 dark:text-blue-400 px-8 py-3 rounded-lg hover:bg-blue-50 dark:hover:bg-blue-900/20 transition-colors font-medium">
            Learn More
          </button>
        </div>
      </div>
    </div>
  );
};