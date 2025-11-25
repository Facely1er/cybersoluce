// Asset Utility Functions for CyberSoluce
// Adapted from assetmanager-main to work with CoreAsset type

import { CoreAsset, AssetFilters, AssetStats, SortConfig } from '../types/asset';

export const calculateAssetStats = (assets: CoreAsset[]): AssetStats => {
  const now = new Date();
  const thirtyDaysAgo = new Date(now.getTime() - (30 * 24 * 60 * 60 * 1000));

  // Use single pass for better performance
  let critical = 0;
  let untagged = 0;
  let recentlyAdded = 0;
  const byType: Record<string, number> = {};
  const byCriticality: Record<string, number> = {};
  const byStatus: Record<string, number> = {};
  const byDataClassification: Record<string, number> = {};
  const byEncryptionStatus: Record<string, number> = {};
  let privacyCompliant = 0;
  let withPIA = 0;
  let crossBorderTransfer = 0;
  let thirdPartySharing = 0;

  for (const asset of assets) {
    // Count critical assets
    if (asset.criticality === 'Critical' || asset.criticality === 'critical') critical++;
    
    // Count untagged assets
    if (asset.tags.length === 0) untagged++;
    
    // Count recently added assets
    if (asset.createdAt > thirtyDaysAgo) recentlyAdded++;
    
    // Count by type
    byType[asset.type] = (byType[asset.type] || 0) + 1;
    
    // Count by criticality
    byCriticality[asset.criticality] = (byCriticality[asset.criticality] || 0) + 1;
    
    // Count by status
    byStatus[asset.status] = (byStatus[asset.status] || 0) + 1;
    
    // Count by data classification
    if (asset.dataClassification) {
      byDataClassification[asset.dataClassification] = (byDataClassification[asset.dataClassification] || 0) + 1;
    }
    
    // Count by encryption status
    if (asset.encryptionStatus) {
      byEncryptionStatus[asset.encryptionStatus] = (byEncryptionStatus[asset.encryptionStatus] || 0) + 1;
    }
    
    // Privacy compliance metrics
    if (asset.cybercorrect_data?.gdprCompliant) privacyCompliant++;
    if (asset.cybercorrect_data?.piaCompleted) withPIA++;
    if (asset.crossBorderTransfer) crossBorderTransfer++;
    if (asset.thirdPartySharing) thirdPartySharing++;
  }

  return {
    total: assets.length,
    critical,
    untagged,
    recentlyAdded,
    byType,
    byCriticality,
    byStatus,
    byDataClassification,
    byEncryptionStatus,
    privacyCompliant,
    withPIA,
    crossBorderTransfer,
    thirdPartySharing,
  };
};

// Advanced filter helpers
const hasVulnerabilities = (asset: CoreAsset): boolean => {
  return asset.vulnerabilities && asset.vulnerabilities.length > 0 &&
    asset.vulnerabilities.some(v => 
      v.status === 'Open' || v.status === 'open' || 
      v.status === 'In Progress' || v.status === 'in-progress'
    );
};

const hasDependencies = (asset: CoreAsset): boolean => {
  return asset.dependencies && asset.dependencies.length > 0 &&
    asset.dependencies.some(d => d.isActive);
};

const isIsolatedAsset = (asset: CoreAsset): boolean => {
  const hasRelationships = asset.relationships && asset.relationships.length > 0;
  const hasDeps = hasDependencies(asset);
  return !hasRelationships && !hasDeps;
};

const isCriticalPathAsset = (asset: CoreAsset): boolean => {
  const hasDeps = hasDependencies(asset);
  const hasDependents = asset.dependencies && asset.dependencies.length > 0;
  const isCritical = asset.criticality === 'Critical' || asset.criticality === 'critical';
  return (hasDeps && hasDependents) || (isCritical && hasDeps);
};

const hasMultipleFrameworks = (asset: CoreAsset): boolean => {
  return asset.complianceFrameworks && asset.complianceFrameworks.length > 1;
};

const isMissingCompliance = (asset: CoreAsset): boolean => {
  return !asset.complianceFrameworks || asset.complianceFrameworks.length === 0;
};

const isOverdueAssessment = (asset: CoreAsset): boolean => {
  if (!asset.nextReview) return false;
  return new Date(asset.nextReview) < new Date();
};

export const filterAssets = (assets: CoreAsset[], filters: AssetFilters): CoreAsset[] => {
  return assets.filter(asset => {
    // Search filter
    if (filters.search) {
      const searchLower = filters.search.toLowerCase();
      if (searchLower.length < 2) {
        return true; // Don't filter if search is too short
      }
      
      const locationStr = typeof asset.location === 'string' ? asset.location : JSON.stringify(asset.location);
      const searchableFields = [
        asset.name,
        asset.description,
        asset.owner,
        locationStr,
        asset.ipAddress || '',
        ...asset.tags,
        ...asset.complianceFrameworks,
      ].join(' ').toLowerCase();
      
      if (!searchableFields.includes(searchLower)) {
        return false;
      }
    }

    // Type filter
    if (filters.types.length > 0 && !filters.types.includes(asset.type)) {
      return false;
    }

    // Category filter
    if (filters.categories && filters.categories.length > 0 && asset.category && !filters.categories.includes(asset.category)) {
      return false;
    }

    // Criticality filter
    if (filters.criticalities.length > 0 && !filters.criticalities.includes(asset.criticality)) {
      return false;
    }

    // Owner filter
    if (filters.owners.length > 0 && !filters.owners.includes(asset.owner)) {
      return false;
    }

    // Location filter
    if (filters.locations.length > 0) {
      const locationStr = typeof asset.location === 'string' ? asset.location : JSON.stringify(asset.location);
      if (!filters.locations.includes(locationStr)) {
        return false;
      }
    }

    // Compliance frameworks filter
    if (filters.complianceFrameworks.length > 0) {
      const hasMatchingFramework = filters.complianceFrameworks.some(framework =>
        asset.complianceFrameworks.includes(framework)
      );
      if (!hasMatchingFramework) {
        return false;
      }
    }

    // Status filter
    if (filters.status.length > 0 && !filters.status.includes(asset.status)) {
      return false;
    }

    // Tags filter
    if (filters.tags.length > 0) {
      const hasMatchingTag = filters.tags.some(tag =>
        asset.tags.includes(tag)
      );
      if (!hasMatchingTag) {
        return false;
      }
    }

    // Data classification filter
    if (filters.dataClassification && filters.dataClassification.length > 0) {
      if (!asset.dataClassification || !filters.dataClassification.includes(asset.dataClassification)) {
        return false;
      }
    }

    // Risk score range filter
    const [minRisk, maxRisk] = filters.riskScoreRange;
    if (asset.riskScore < minRisk || asset.riskScore > maxRisk) {
      return false;
    }

    // Advanced filters (check metadata for filter flags)
    // These are set by AdvancedFiltersModal via metadata or can be checked directly
    if (filters.metadata) {
      const meta = filters.metadata as any;
      
      // Has vulnerabilities filter
      if (meta.hasVulnerabilities === 'yes' && !hasVulnerabilities(asset)) {
        return false;
      }
      if (meta.hasVulnerabilities === 'no' && hasVulnerabilities(asset)) {
        return false;
      }
      
      // Missing compliance filter
      if (meta.missingCompliance && !isMissingCompliance(asset)) {
        return false;
      }
      
      // Overdue assessment filter
      if (meta.overdueAssessment && !isOverdueAssessment(asset)) {
        return false;
      }
      
      // Multiple frameworks filter
      if (meta.multipleFrameworks && !hasMultipleFrameworks(asset)) {
        return false;
      }
      
      // Has dependencies filter
      if (meta.hasDependencies && !hasDependencies(asset)) {
        return false;
      }
      
      // Isolated assets filter
      if (meta.isolatedAssets && !isIsolatedAsset(asset)) {
        return false;
      }
      
      // Critical path assets filter
      if (meta.criticalPathAssets && !isCriticalPathAsset(asset)) {
        return false;
      }
      
      // Date filters
      if (meta.createdAfter) {
        const createdAfter = new Date(meta.createdAfter);
        if (asset.createdAt < createdAfter) {
          return false;
        }
      }
      
      if (meta.lastAssessedBefore) {
        if (!asset.lastAssessed) return false;
        const lastAssessedBefore = new Date(meta.lastAssessedBefore);
        if (asset.lastAssessed > lastAssessedBefore) {
          return false;
        }
      }
    }

    return true;
  });
};

export const sortAssets = (assets: CoreAsset[], sortConfig: SortConfig): CoreAsset[] => {
  if (!sortConfig.key) return assets;

  return [...assets].sort((a, b) => {
    const aValue = a[sortConfig.key!];
    const bValue = b[sortConfig.key!];

    if (aValue === null || aValue === undefined) return 1;
    if (bValue === null || bValue === undefined) return -1;

    let comparison = 0;
    
    // Handle different data types
    if (aValue instanceof Date && bValue instanceof Date) {
      comparison = aValue.getTime() - bValue.getTime();
    } else if (typeof aValue === 'string' && typeof bValue === 'string') {
      comparison = aValue.localeCompare(bValue);
    } else if (typeof aValue === 'number' && typeof bValue === 'number') {
      comparison = aValue - bValue;
    } else if (Array.isArray(aValue) && Array.isArray(bValue)) {
      comparison = aValue.length - bValue.length;
    } else {
      // Fallback to string comparison
      comparison = String(aValue).localeCompare(String(bValue));
    }

    return sortConfig.direction === 'desc' ? comparison * -1 : comparison;
  });
};

// Color utilities for CyberSoluce design system
export const getCriticalityColor = (criticality: string): string => {
  const crit = criticality.toLowerCase();
  switch (crit) {
    case 'critical': return 'text-red-600 bg-red-50 dark:text-red-400 dark:bg-red-900/20 border-red-200 dark:border-red-800';
    case 'high': return 'text-orange-600 bg-orange-50 dark:text-orange-400 dark:bg-orange-900/20 border-orange-200 dark:border-orange-800';
    case 'medium': return 'text-yellow-600 bg-yellow-50 dark:text-yellow-400 dark:bg-yellow-900/20 border-yellow-200 dark:border-yellow-800';
    case 'low': return 'text-green-600 bg-green-50 dark:text-green-400 dark:bg-green-900/20 border-green-200 dark:border-green-800';
    default: return 'text-gray-600 bg-gray-50 dark:text-gray-400 dark:bg-gray-800 border-gray-200 dark:border-gray-700';
  }
};

export const getStatusColor = (status: string): string => {
  const stat = status.toLowerCase();
  switch (stat) {
    case 'active': return 'text-green-600 bg-green-50 dark:text-green-400 dark:bg-green-900/20 border-green-200 dark:border-green-800';
    case 'inactive': return 'text-yellow-600 bg-yellow-50 dark:text-yellow-400 dark:bg-yellow-900/20 border-yellow-200 dark:border-yellow-800';
    case 'retired': 
    case 'disposed':
    case 'decommissioned': return 'text-gray-600 bg-gray-50 dark:text-gray-400 dark:bg-gray-800 border-gray-200 dark:border-gray-700';
    case 'planned': return 'text-blue-600 bg-blue-50 dark:text-blue-400 dark:bg-blue-900/20 border-blue-200 dark:border-blue-800';
    case 'maintenance': return 'text-purple-600 bg-purple-50 dark:text-purple-400 dark:bg-purple-900/20 border-purple-200 dark:border-purple-800';
    case 'quarantined': return 'text-red-600 bg-red-50 dark:text-red-400 dark:bg-red-900/20 border-red-200 dark:border-red-800';
    default: return 'text-gray-600 bg-gray-50 dark:text-gray-400 dark:bg-gray-800 border-gray-200 dark:border-gray-700';
  }
};

export const getRiskScoreColor = (score: number): string => {
  if (score >= 80) return 'text-red-600 bg-red-50 dark:text-red-400 dark:bg-red-900/20';
  if (score >= 60) return 'text-orange-600 bg-orange-50 dark:text-orange-400 dark:bg-orange-900/20';
  if (score >= 40) return 'text-yellow-600 bg-yellow-50 dark:text-yellow-400 dark:bg-yellow-900/20';
  return 'text-green-600 bg-green-50 dark:text-green-400 dark:bg-green-900/20';
};

export const getDataClassificationColor = (classification: string): string => {
  const cls = classification.toLowerCase();
  switch (cls) {
    case 'public': return 'text-green-600 bg-green-50 dark:text-green-400 dark:bg-green-900/20';
    case 'internal': return 'text-blue-600 bg-blue-50 dark:text-blue-400 dark:bg-blue-900/20';
    case 'confidential': return 'text-orange-600 bg-orange-50 dark:text-orange-400 dark:bg-orange-900/20';
    case 'restricted': 
    case 'top-secret': 
    case 'top secret': return 'text-red-600 bg-red-50 dark:text-red-400 dark:bg-red-900/20';
    default: return 'text-gray-600 bg-gray-50 dark:text-gray-400 dark:bg-gray-800';
  }
};

// Format date for display
export const formatDate = (date: Date | string | undefined): string => {
  if (!date) return 'N/A';
  const d = typeof date === 'string' ? new Date(date) : date;
  return d.toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' });
};

// Format date with time
export const formatDateTime = (date: Date | string | undefined): string => {
  if (!date) return 'N/A';
  const d = typeof date === 'string' ? new Date(date) : date;
  return d.toLocaleString('en-US', { year: 'numeric', month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' });
};

// Get relative time (e.g., "2 days ago")
export const getRelativeTime = (date: Date | string | undefined): string => {
  if (!date) return 'N/A';
  const d = typeof date === 'string' ? new Date(date) : date;
  const now = new Date();
  const diffMs = now.getTime() - d.getTime();
  const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));
  
  if (diffDays === 0) return 'Today';
  if (diffDays === 1) return 'Yesterday';
  if (diffDays < 7) return `${diffDays} days ago`;
  if (diffDays < 30) return `${Math.floor(diffDays / 7)} weeks ago`;
  if (diffDays < 365) return `${Math.floor(diffDays / 30)} months ago`;
  return `${Math.floor(diffDays / 365)} years ago`;
};

