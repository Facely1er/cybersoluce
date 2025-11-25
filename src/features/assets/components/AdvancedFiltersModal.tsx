// Advanced Filters Modal for CyberSoluce Asset Inventory
// Adapted from assetmanager-main with CyberSoluce design system

import React, { useState, useEffect } from 'react';
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore - Icons exist in lucide-react but TypeScript definitions may be outdated
import * as LucideIcons from 'lucide-react';
import { AssetFilters } from '../types/asset';
import { Button } from '../../../components/ui/button';
import { Card } from '../../../components/ui/card';

// Type-safe icon imports with fallbacks
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const LucideIconsAny = LucideIcons as any;
const Filter = LucideIconsAny.Filter || LucideIconsAny.SlidersHorizontal || LucideIconsAny.Settings as React.ComponentType<{ className?: string; [key: string]: unknown }>;
const TrendingUp = LucideIconsAny.TrendingUp as React.ComponentType<{ className?: string; [key: string]: unknown }>;
const AlertTriangle = LucideIconsAny.AlertTriangle as React.ComponentType<{ className?: string; [key: string]: unknown }>;

// Icons that TypeScript recognizes
const { X, Calendar, Shield } = LucideIcons;

interface AdvancedFiltersModalProps {
  isOpen: boolean;
  onClose: () => void;
  onApplyFilters: (filters: Partial<AssetFilters>) => void;
  currentFilters: AssetFilters;
}

interface AdvancedFilterState {
  createdAfter?: string;
  lastAssessedBefore?: string;
  minRiskScore: number;
  maxRiskScore: number;
  hasVulnerabilities?: 'yes' | 'no' | '';
  missingCompliance: boolean;
  overdueAssessment: boolean;
  multipleFrameworks: boolean;
  hasDependencies: boolean;
  isolatedAssets: boolean;
  criticalPathAssets: boolean;
}

export const AdvancedFiltersModal: React.FC<AdvancedFiltersModalProps> = ({
  isOpen,
  onClose,
  onApplyFilters,
  currentFilters,
}) => {
  const [localFilters, setLocalFilters] = useState<AdvancedFilterState>({
    minRiskScore: currentFilters.riskScoreRange[0],
    maxRiskScore: currentFilters.riskScoreRange[1],
    hasVulnerabilities: '',
    missingCompliance: false,
    overdueAssessment: false,
    multipleFrameworks: false,
    hasDependencies: false,
    isolatedAssets: false,
    criticalPathAssets: false,
  });

  const [activeFiltersCount, setActiveFiltersCount] = useState(0);

  useEffect(() => {
    // Count active filters
    let count = 0;
    if (localFilters.createdAfter) count++;
    if (localFilters.lastAssessedBefore) count++;
    if (localFilters.minRiskScore > 0 || localFilters.maxRiskScore < 100) count++;
    if (localFilters.hasVulnerabilities) count++;
    if (localFilters.missingCompliance) count++;
    if (localFilters.overdueAssessment) count++;
    if (localFilters.multipleFrameworks) count++;
    if (localFilters.hasDependencies) count++;
    if (localFilters.isolatedAssets) count++;
    if (localFilters.criticalPathAssets) count++;
    
    setActiveFiltersCount(count);
  }, [localFilters]);

  const handleApply = () => {
    // Convert advanced filters to filter format
    const updatedFilters: Partial<AssetFilters> = {
      riskScoreRange: [localFilters.minRiskScore, localFilters.maxRiskScore],
      metadata: {
        // Date filters
        ...(localFilters.createdAfter && { createdAfter: localFilters.createdAfter }),
        ...(localFilters.lastAssessedBefore && { lastAssessedBefore: localFilters.lastAssessedBefore }),
        // Security filters
        ...(localFilters.hasVulnerabilities && { hasVulnerabilities: localFilters.hasVulnerabilities }),
        ...(localFilters.missingCompliance && { missingCompliance: true }),
        ...(localFilters.overdueAssessment && { overdueAssessment: true }),
        // Relationship filters
        ...(localFilters.hasDependencies && { hasDependencies: true }),
        ...(localFilters.isolatedAssets && { isolatedAssets: true }),
        ...(localFilters.criticalPathAssets && { criticalPathAssets: true }),
        ...(localFilters.multipleFrameworks && { multipleFrameworks: true }),
      },
    };
    
    onApplyFilters(updatedFilters);
    onClose();
  };

  const handleReset = () => {
    setLocalFilters({
      minRiskScore: 0,
      maxRiskScore: 100,
      hasVulnerabilities: '',
      missingCompliance: false,
      overdueAssessment: false,
      multipleFrameworks: false,
      hasDependencies: false,
      isolatedAssets: false,
      criticalPathAssets: false,
    });
    
    onApplyFilters({
      riskScoreRange: [0, 100],
    });
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <Card className="max-w-4xl w-full max-h-[90vh] overflow-hidden flex flex-col">
        {/* Header */}
        <div className="bg-gradient-to-r from-command-blue-600 to-command-blue-700 px-6 py-4 text-white">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-white bg-opacity-20 rounded-lg">
                <Filter className="h-5 w-5" />
              </div>
              <div>
                <h2 className="text-xl font-bold">Advanced Filters</h2>
                <p className="text-sm opacity-90">
                  Apply complex filtering criteria
                  {activeFiltersCount > 0 && (
                    <span className="ml-2 bg-white bg-opacity-20 px-2 py-1 rounded-full text-xs">
                      {activeFiltersCount} active
                    </span>
                  )}
                </p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="p-2 hover:bg-white hover:bg-opacity-20 rounded-lg transition-colors"
              aria-label="Close advanced filters modal"
            >
              <X className="h-5 w-5" />
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto flex-1">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Date Range Filters */}
            <Card className="p-4">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center">
                <Calendar className="h-5 w-5 mr-2" />
                Date Filters
              </h3>
              <div className="space-y-4">
                <div>
                  <label htmlFor="created-after" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Created After
                  </label>
                  <input
                    id="created-after"
                    type="date"
                    value={localFilters.createdAfter || ''}
                    onChange={(e) => setLocalFilters({ ...localFilters, createdAfter: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-command-blue-500"
                  />
                </div>
                <div>
                  <label htmlFor="last-assessed-before" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Last Assessed Before
                  </label>
                  <input
                    id="last-assessed-before"
                    type="date"
                    value={localFilters.lastAssessedBefore || ''}
                    onChange={(e) => setLocalFilters({ ...localFilters, lastAssessedBefore: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-command-blue-500"
                  />
                </div>
              </div>
            </Card>

            {/* Risk Score Filters */}
            <Card className="p-4">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center">
                <TrendingUp className="h-5 w-5 mr-2" />
                Risk Score Range
              </h3>
              <div className="space-y-4">
                <div>
                  <label htmlFor="min-risk-score" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Minimum Risk Score: {localFilters.minRiskScore}
                  </label>
                  <input
                    id="min-risk-score"
                    type="range"
                    min="0"
                    max="100"
                    value={localFilters.minRiskScore}
                    onChange={(e) => setLocalFilters({ ...localFilters, minRiskScore: parseInt(e.target.value) })}
                    className="w-full"
                  />
                </div>
                <div>
                  <label htmlFor="max-risk-score" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Maximum Risk Score: {localFilters.maxRiskScore}
                  </label>
                  <input
                    id="max-risk-score"
                    type="range"
                    min="0"
                    max="100"
                    value={localFilters.maxRiskScore}
                    onChange={(e) => setLocalFilters({ ...localFilters, maxRiskScore: parseInt(e.target.value) })}
                    className="w-full"
                  />
                </div>
              </div>
            </Card>

            {/* Security Filters */}
            <Card className="p-4">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center">
                <Shield className="h-5 w-5 mr-2" />
                Security Filters
              </h3>
              <div className="space-y-3">
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    checked={localFilters.hasVulnerabilities === 'yes'}
                    onChange={(e) => setLocalFilters({ 
                      ...localFilters, 
                      hasVulnerabilities: e.target.checked ? 'yes' : '' 
                    })}
                    className="mr-2 h-4 w-4 text-command-blue-600 focus:ring-command-blue-500 border-gray-300 rounded"
                  />
                  <span className="text-sm text-gray-700 dark:text-gray-300">Has Vulnerabilities</span>
                </label>
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    checked={localFilters.missingCompliance}
                    onChange={(e) => setLocalFilters({ ...localFilters, missingCompliance: e.target.checked })}
                    className="mr-2 h-4 w-4 text-command-blue-600 focus:ring-command-blue-500 border-gray-300 rounded"
                  />
                  <span className="text-sm text-gray-700 dark:text-gray-300">Missing Compliance Requirements</span>
                </label>
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    checked={localFilters.overdueAssessment}
                    onChange={(e) => setLocalFilters({ ...localFilters, overdueAssessment: e.target.checked })}
                    className="mr-2 h-4 w-4 text-command-blue-600 focus:ring-command-blue-500 border-gray-300 rounded"
                  />
                  <span className="text-sm text-gray-700 dark:text-gray-300">Overdue Assessment</span>
                </label>
              </div>
            </Card>

            {/* Relationship Filters */}
            <Card className="p-4">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center">
                <AlertTriangle className="h-5 w-5 mr-2" />
                Relationship Filters
              </h3>
              <div className="space-y-3">
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    checked={localFilters.hasDependencies}
                    onChange={(e) => setLocalFilters({ ...localFilters, hasDependencies: e.target.checked })}
                    className="mr-2 h-4 w-4 text-command-blue-600 focus:ring-command-blue-500 border-gray-300 rounded"
                  />
                  <span className="text-sm text-gray-700 dark:text-gray-300">Has Dependencies</span>
                </label>
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    checked={localFilters.isolatedAssets}
                    onChange={(e) => setLocalFilters({ ...localFilters, isolatedAssets: e.target.checked })}
                    className="mr-2 h-4 w-4 text-command-blue-600 focus:ring-command-blue-500 border-gray-300 rounded"
                  />
                  <span className="text-sm text-gray-700 dark:text-gray-300">Isolated Assets (No Relationships)</span>
                </label>
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    checked={localFilters.criticalPathAssets}
                    onChange={(e) => setLocalFilters({ ...localFilters, criticalPathAssets: e.target.checked })}
                    className="mr-2 h-4 w-4 text-command-blue-600 focus:ring-command-blue-500 border-gray-300 rounded"
                  />
                  <span className="text-sm text-gray-700 dark:text-gray-300">Critical Path Assets</span>
                </label>
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    checked={localFilters.multipleFrameworks}
                    onChange={(e) => setLocalFilters({ ...localFilters, multipleFrameworks: e.target.checked })}
                    className="mr-2 h-4 w-4 text-command-blue-600 focus:ring-command-blue-500 border-gray-300 rounded"
                  />
                  <span className="text-sm text-gray-700 dark:text-gray-300">Multiple Compliance Frameworks</span>
                </label>
              </div>
            </Card>
          </div>
        </div>

        {/* Footer */}
        <div className="px-6 py-4 border-t border-gray-200 dark:border-gray-700 flex items-center justify-between bg-gray-50 dark:bg-gray-800">
          <Button
            variant="outline"
            onClick={handleReset}
          >
            Reset All
          </Button>
          <div className="flex items-center space-x-3">
            <Button
              variant="outline"
              onClick={onClose}
            >
              Cancel
            </Button>
            <Button
              onClick={handleApply}
              disabled={activeFiltersCount === 0}
            >
              Apply Filters ({activeFiltersCount})
            </Button>
          </div>
        </div>
      </Card>
    </div>
  );
};

