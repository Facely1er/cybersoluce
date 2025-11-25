// Unified Asset Service for CyberSoluce
// Adapted from assetmanager-main with extensions for product-specific data
// Supports TechnoSoluce, VendorSoluce, and CyberCorrect extensions via JSONB

import { supabase } from '../../../lib/supabase';
import { CoreAsset, AssetRelationship, Vulnerability, TechnoSoluceExtension, VendorSoluceExtension, CyberCorrectExtension } from '../types/asset';
import { logError } from '../../../utils/logger';

// Cache implementation
class SimpleCache<T> {
  private cache = new Map<string, { data: T; timestamp: number }>();
  private readonly ttl: number;

  constructor(ttl = 5 * 60 * 1000) { // 5 minutes default
    this.ttl = ttl;
  }

  set(key: string, data: T): void {
    this.cache.set(key, { data, timestamp: Date.now() });
  }

  get(key: string): T | null {
    const entry = this.cache.get(key);
    if (!entry) return null;

    if (Date.now() - entry.timestamp > this.ttl) {
      this.cache.delete(key);
      return null;
    }

    return entry.data;
  }

  clear(): void {
    this.cache.clear();
  }
}

const assetCache = new SimpleCache<CoreAsset>();

// Database row type (simplified - matches cs_assets table)
interface AssetRow {
  id: string;
  organization_id: string | null;
  name: string;
  description: string | null;
  type: string;
  category: string | null;
  subcategory: string | null;
  owner: string;
  custodian: string | null;
  location: string | null;
  ip_address: string | null;
  criticality: string;
  data_classification: string | null;
  business_value: string | null;
  status: string;
  risk_score: number;
  compliance_frameworks: string[];
  data_types: string[];
  retention_period: number | null;
  legal_basis: string[];
  data_subject_rights: string[];
  cross_border_transfer: boolean | null;
  third_party_sharing: boolean | null;
  encryption_status: string | null;
  tags: string[];
  metadata: Record<string, any> | null;
  technosoluce_data: TechnoSoluceExtension | null;
  vendorsoluce_data: VendorSoluceExtension | null;
  cybercorrect_data: CyberCorrectExtension | null;
  created_at: string;
  updated_at: string;
  last_assessed: string | null;
  last_reviewed: string | null;
  next_review: string | null;
}

// Convert database row to CoreAsset interface
const mapRowToAsset = async (row: AssetRow): Promise<CoreAsset> => {
  const cacheKey = `asset_${row.id}`;
  const cached = assetCache.get(cacheKey);
  if (cached) return cached;

  try {
    if (!supabase) {
      throw new Error('Supabase client not initialized');
    }

    // Get relationships, vulnerabilities, and dependencies in parallel
    const [relationshipsData, vulnerabilitiesData, dependenciesData] = await Promise.all([
      supabase
        .from('cs_asset_relationships')
        .select(`
          id,
          relationship_type,
          strength,
          data_flow_direction,
          is_personal_data,
          purpose,
          target_asset_id,
          target_asset:cs_assets!cs_asset_relationships_target_asset_id_fkey(id, name)
        `)
        .eq('source_asset_id', row.id),
      supabase
        .from('cs_asset_vulnerabilities')
        .select('*')
        .eq('asset_id', row.id),
      supabase
        .from('cs_asset_dependencies')
        .select(`
          id,
          dependency_type,
          criticality,
          description,
          is_active,
          last_validated,
          risk_level,
          bidirectional,
          dependent_asset_id,
          dependent_asset:cs_assets!cs_asset_dependencies_dependent_asset_id_fkey(id, name)
        `)
        .eq('asset_id', row.id)
    ]);

    const relationships: AssetRelationship[] = (relationshipsData.data || []).map(rel => ({
      id: rel.id,
      relatedAssetId: rel.target_asset_id,
      relatedAssetName: (rel.target_asset as { name: string })?.name || '',
      relationshipType: rel.relationship_type as AssetRelationship['relationshipType'],
      strength: rel.strength as AssetRelationship['strength'],
      dataFlowDirection: rel.data_flow_direction as AssetRelationship['dataFlowDirection'],
      isPersonalData: rel.is_personal_data || false,
      purpose: rel.purpose || '',
    }));

    const vulnerabilities: Vulnerability[] = (vulnerabilitiesData.data || []).map(vuln => ({
      id: vuln.id,
      cveId: vuln.cve_id || undefined,
      severity: vuln.severity as Vulnerability['severity'],
      title: vuln.title,
      description: vuln.description || '',
      discoveredAt: new Date(vuln.discovered_at),
      status: vuln.status as Vulnerability['status'],
      cvssScore: vuln.cvss_score || undefined,
    }));

    const dependencies = (dependenciesData.data || []).map(dep => ({
      id: dep.id,
      dependentAssetId: dep.dependent_asset_id,
      dependentAssetName: (dep.dependent_asset as { name: string })?.name || '',
      dependencyType: dep.dependency_type,
      criticality: dep.criticality as CoreAsset['criticality'],
      description: dep.description || '',
      isActive: dep.is_active,
      lastValidated: new Date(dep.last_validated),
      riskLevel: dep.risk_level as 'Low' | 'Medium' | 'High' | 'Critical' | undefined,
    }));

    const asset: CoreAsset = {
      id: row.id,
      organizationId: row.organization_id || '',
      name: row.name,
      description: row.description || '',
      type: row.type as CoreAsset['type'],
      category: (row.category as CoreAsset['category']) || 'hardware',
      subcategory: row.subcategory,
      owner: row.owner,
      custodian: row.custodian,
      location: row.location || '',
      ipAddress: row.ip_address || undefined,
      criticality: row.criticality as CoreAsset['criticality'],
      dataClassification: (row.data_classification as CoreAsset['dataClassification']) || 'Internal',
      businessValue: row.business_value as CoreAsset['businessValue'],
      status: row.status as CoreAsset['status'],
      riskScore: row.risk_score,
      complianceFrameworks: row.compliance_frameworks || [],
      dataTypes: row.data_types || [],
      retentionPeriod: row.retention_period || undefined,
      legalBasis: row.legal_basis || [],
      dataSubjectRights: row.data_subject_rights || [],
      crossBorderTransfer: row.cross_border_transfer || false,
      thirdPartySharing: row.third_party_sharing || false,
      encryptionStatus: row.encryption_status as CoreAsset['encryptionStatus'],
      tags: row.tags || [],
      metadata: row.metadata || {},
      relationships,
      vulnerabilities,
      dependencies,
      technosoluce_data: row.technosoluce_data || undefined,
      vendorsoluce_data: row.vendorsoluce_data || undefined,
      cybercorrect_data: row.cybercorrect_data || undefined,
      createdAt: new Date(row.created_at),
      updatedAt: new Date(row.updated_at),
      lastAssessed: row.last_assessed ? new Date(row.last_assessed) : undefined,
      lastReviewed: row.last_reviewed ? new Date(row.last_reviewed) : undefined,
      nextReview: row.next_review ? new Date(row.next_review) : undefined,
    };

    assetCache.set(cacheKey, asset);
    return asset;
  } catch (error) {
    logError('mapRowToAsset', error, { assetId: row.id });
    throw error;
  }
};

// Convert CoreAsset to database insert format
const mapAssetToInsert = (asset: Omit<CoreAsset, 'id' | 'createdAt' | 'updatedAt'>, organizationId?: string) => ({
  organization_id: organizationId || null,
  name: asset.name,
  description: asset.description,
  type: asset.type,
  category: asset.category,
  subcategory: asset.subcategory,
  owner: asset.owner,
  custodian: asset.custodian,
  location: typeof asset.location === 'string' ? asset.location : JSON.stringify(asset.location),
  ip_address: asset.ipAddress || null,
  criticality: asset.criticality,
  data_classification: asset.dataClassification,
  business_value: asset.businessValue,
  status: asset.status,
  risk_score: asset.riskScore,
  compliance_frameworks: asset.complianceFrameworks || [],
  data_types: asset.dataTypes || [],
  retention_period: asset.retentionPeriod || null,
  legal_basis: asset.legalBasis || [],
  data_subject_rights: asset.dataSubjectRights || [],
  cross_border_transfer: asset.crossBorderTransfer || false,
  third_party_sharing: asset.thirdPartySharing || false,
  encryption_status: asset.encryptionStatus,
  tags: asset.tags || [],
  metadata: asset.metadata || {},
  technosoluce_data: asset.technosoluce_data || null,
  vendorsoluce_data: asset.vendorsoluce_data || null,
  cybercorrect_data: asset.cybercorrect_data || null,
  last_assessed: asset.lastAssessed?.toISOString() || null,
  last_reviewed: asset.lastReviewed?.toISOString() || null,
  next_review: asset.nextReview?.toISOString() || null,
});

// Convert CoreAsset to database update format
const mapAssetToUpdate = (asset: Partial<CoreAsset>) => {
  const update: any = {};
  
  if (asset.name !== undefined) update.name = asset.name;
  if (asset.description !== undefined) update.description = asset.description;
  if (asset.type !== undefined) update.type = asset.type;
  if (asset.category !== undefined) update.category = asset.category;
  if (asset.subcategory !== undefined) update.subcategory = asset.subcategory;
  if (asset.owner !== undefined) update.owner = asset.owner;
  if (asset.custodian !== undefined) update.custodian = asset.custodian;
  if (asset.location !== undefined) update.location = typeof asset.location === 'string' ? asset.location : JSON.stringify(asset.location);
  if (asset.ipAddress !== undefined) update.ip_address = asset.ipAddress || null;
  if (asset.criticality !== undefined) update.criticality = asset.criticality;
  if (asset.dataClassification !== undefined) update.data_classification = asset.dataClassification;
  if (asset.businessValue !== undefined) update.business_value = asset.businessValue;
  if (asset.status !== undefined) update.status = asset.status;
  if (asset.riskScore !== undefined) update.risk_score = asset.riskScore;
  if (asset.complianceFrameworks !== undefined) update.compliance_frameworks = asset.complianceFrameworks;
  if (asset.dataTypes !== undefined) update.data_types = asset.dataTypes;
  if (asset.retentionPeriod !== undefined) update.retention_period = asset.retentionPeriod || null;
  if (asset.legalBasis !== undefined) update.legal_basis = asset.legalBasis;
  if (asset.dataSubjectRights !== undefined) update.data_subject_rights = asset.dataSubjectRights;
  if (asset.crossBorderTransfer !== undefined) update.cross_border_transfer = asset.crossBorderTransfer;
  if (asset.thirdPartySharing !== undefined) update.third_party_sharing = asset.thirdPartySharing;
  if (asset.encryptionStatus !== undefined) update.encryption_status = asset.encryptionStatus;
  if (asset.tags !== undefined) update.tags = asset.tags;
  if (asset.metadata !== undefined) update.metadata = asset.metadata;
  if (asset.technosoluce_data !== undefined) update.technosoluce_data = asset.technosoluce_data || null;
  if (asset.vendorsoluce_data !== undefined) update.vendorsoluce_data = asset.vendorsoluce_data || null;
  if (asset.cybercorrect_data !== undefined) update.cybercorrect_data = asset.cybercorrect_data || null;
  if (asset.lastAssessed !== undefined) update.last_assessed = asset.lastAssessed?.toISOString() || null;
  if (asset.lastReviewed !== undefined) update.last_reviewed = asset.lastReviewed?.toISOString() || null;
  if (asset.nextReview !== undefined) update.next_review = asset.nextReview?.toISOString() || null;
  
  return update;
};

// Unified Asset Service
export const assetService = {
  // Get all assets for the current organization
  async getAssets(organizationId?: string): Promise<CoreAsset[]> {
    if (!supabase) {
      return [];
    }
    
    try {
      let query = supabase
        .from('cs_assets')
        .select('*')
        .order('created_at', { ascending: false })
        .limit(1000);

      if (organizationId) {
        query = query.eq('organization_id', organizationId);
      }

      const { data, error } = await query;
      
      if (error) {
        logError('assetService.getAssets', error);
        return [];
      }

      const assets = await Promise.all((data || []).map(row => mapRowToAsset(row as AssetRow)));
      return assets;
    } catch (error) {
      logError('assetService.getAssets', error);
      return [];
    }
  },

  // Get a single asset by ID
  async getAsset(id: string): Promise<CoreAsset | null> {
    if (!supabase) {
      return null;
    }
    
    try {
      const { data, error } = await supabase
        .from('cs_assets')
        .select('*')
        .eq('id', id)
        .single();

      if (error) {
        if (error.code === 'PGRST116') {
          return null; // Asset not found
        }
        logError('assetService.getAsset', error);
        return null;
      }

      return await mapRowToAsset(data as AssetRow);
    } catch (error) {
      logError('assetService.getAsset', error);
      return null;
    }
  },

  // Create a new asset
  async createAsset(
    assetData: Omit<CoreAsset, 'id' | 'createdAt' | 'updatedAt'>,
    organizationId?: string
  ): Promise<CoreAsset> {
    if (!supabase) {
      throw new Error('Supabase client not initialized');
    }
    
    try {
      const insertData = mapAssetToInsert(assetData, organizationId);
      const { data, error } = await supabase
        .from('cs_assets')
        .insert(insertData)
        .select()
        .single();

      if (error) {
        logError('assetService.createAsset', error);
        throw error;
      }

      const newAsset = await mapRowToAsset(data as AssetRow);

      // Handle relationships, vulnerabilities, and dependencies in parallel
      await Promise.all([
        assetData.relationships?.length ? this.updateAssetRelationships(newAsset.id, assetData.relationships) : Promise.resolve(),
        assetData.vulnerabilities?.length ? this.updateAssetVulnerabilities(newAsset.id, assetData.vulnerabilities) : Promise.resolve(),
        assetData.dependencies?.length ? this.updateAssetDependencies(newAsset.id, assetData.dependencies) : Promise.resolve()
      ]);

      return await this.getAsset(newAsset.id) || newAsset;
    } catch (error) {
      logError('assetService.createAsset', error);
      throw error;
    }
  },

  // Update an existing asset
  async updateAsset(id: string, updates: Partial<CoreAsset>): Promise<CoreAsset> {
    if (!supabase) {
      throw new Error('Supabase client not initialized');
    }
    
    try {
      const updateData = mapAssetToUpdate(updates);
      const { data, error } = await supabase
        .from('cs_assets')
        .update(updateData)
        .eq('id', id)
        .select()
        .single();

      if (error) {
        logError('assetService.updateAsset', error);
        throw error;
      }

      // Handle relationships, vulnerabilities, and dependencies updates in parallel
      await Promise.all([
        updates.relationships !== undefined ? this.updateAssetRelationships(id, updates.relationships) : Promise.resolve(),
        updates.vulnerabilities !== undefined ? this.updateAssetVulnerabilities(id, updates.vulnerabilities) : Promise.resolve(),
        updates.dependencies !== undefined ? this.updateAssetDependencies(id, updates.dependencies) : Promise.resolve()
      ]);

      return await this.getAsset(id) || await mapRowToAsset(data as AssetRow);
    } catch (error) {
      logError('assetService.updateAsset', error);
      throw error;
    }
  },

  // Delete assets
  async deleteAssets(ids: string[]): Promise<void> {
    if (!supabase) {
      return;
    }
    
    try {
      const { error } = await supabase
        .from('cs_assets')
        .delete()
        .in('id', ids);

      if (error) {
        logError('assetService.deleteAssets', error);
        throw error;
      }

      // Clear cache for deleted assets
      ids.forEach(id => assetCache.clear());
    } catch (error) {
      logError('assetService.deleteAssets', error);
      throw error;
    }
  },

  // Update asset relationships
  async updateAssetRelationships(assetId: string, relationships: AssetRelationship[]): Promise<void> {
    if (!supabase) return;

    try {
      // Delete existing relationships
      await supabase
        .from('cs_asset_relationships')
        .delete()
        .eq('source_asset_id', assetId);

      // Insert new relationships
      if (relationships.length > 0) {
        const relationshipsData = relationships.map(rel => ({
          source_asset_id: assetId,
          target_asset_id: rel.relatedAssetId,
          relationship_type: rel.relationshipType,
          strength: rel.strength,
          data_flow_direction: rel.dataFlowDirection,
          is_personal_data: rel.isPersonalData,
          purpose: rel.purpose,
        }));

        const { error } = await supabase
          .from('cs_asset_relationships')
          .insert(relationshipsData);

        if (error) {
          logError('assetService.updateAssetRelationships', error);
          throw error;
        }
      }
    } catch (error) {
      logError('assetService.updateAssetRelationships', error);
      throw error;
    }
  },

  // Update asset vulnerabilities
  async updateAssetVulnerabilities(assetId: string, vulnerabilities: Vulnerability[]): Promise<void> {
    if (!supabase) return;

    try {
      // Delete existing vulnerabilities
      await supabase
        .from('cs_asset_vulnerabilities')
        .delete()
        .eq('asset_id', assetId);

      // Insert new vulnerabilities
      if (vulnerabilities.length > 0) {
        const vulnerabilitiesData = vulnerabilities.map(vuln => ({
          asset_id: assetId,
          cve_id: vuln.cveId || null,
          severity: vuln.severity,
          cvss_score: vuln.cvssScore || null,
          title: vuln.title,
          description: vuln.description,
          discovered_at: vuln.discoveredAt.toISOString(),
          status: vuln.status,
        }));

        const { error } = await supabase
          .from('cs_asset_vulnerabilities')
          .insert(vulnerabilitiesData);

        if (error) {
          logError('assetService.updateAssetVulnerabilities', error);
          throw error;
        }
      }
    } catch (error) {
      logError('assetService.updateAssetVulnerabilities', error);
      throw error;
    }
  },

  // Update asset dependencies
  async updateAssetDependencies(assetId: string, dependencies: CoreAsset['dependencies']): Promise<void> {
    if (!supabase) return;

    try {
      // Delete existing dependencies
      await supabase
        .from('cs_asset_dependencies')
        .delete()
        .eq('asset_id', assetId);

      // Insert new dependencies
      if (dependencies && dependencies.length > 0) {
        const dependenciesData = dependencies.map(dep => ({
          asset_id: assetId,
          dependent_asset_id: dep.dependentAssetId,
          dependency_type: dep.dependencyType,
          criticality: dep.criticality,
          description: dep.description,
          is_active: dep.isActive,
          last_validated: dep.lastValidated.toISOString(),
          risk_level: dep.riskLevel,
          bidirectional: dep.bidirectional,
        }));

        const { error } = await supabase
          .from('cs_asset_dependencies')
          .insert(dependenciesData);

        if (error) {
          logError('assetService.updateAssetDependencies', error);
          throw error;
        }
      }
    } catch (error) {
      logError('assetService.updateAssetDependencies', error);
      throw error;
    }
  },

  // Search assets
  async searchAssets(query: string, organizationId?: string): Promise<CoreAsset[]> {
    if (!supabase) {
      return [];
    }

    try {
      let searchQuery = supabase
        .from('cs_assets')
        .select('*')
        .or(`name.ilike.%${query}%,description.ilike.%${query}%,owner.ilike.%${query}%,location.ilike.%${query}%`)
        .order('created_at', { ascending: false });

      if (organizationId) {
        searchQuery = searchQuery.eq('organization_id', organizationId);
      }

      const { data, error } = await searchQuery;

      if (error) {
        logError('assetService.searchAssets', error);
        return [];
      }

      const assets = await Promise.all(
        (data || []).map(row => mapRowToAsset(row as AssetRow))
      );

      return assets;
    } catch (error) {
      logError('assetService.searchAssets', error);
      return [];
    }
  },

  // Clear cache
  clearCache(): void {
    assetCache.clear();
  }
};

