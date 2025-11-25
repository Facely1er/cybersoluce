import { useState, useEffect, useCallback } from 'react';
import { Asset, AssetRelationship } from '../../../../shared/types/assets';
import { validateAndSanitize } from '../../../../lib/validation';

interface AssetManagementState {
  assets: Asset[];
  relationships: AssetRelationship[];
  loading: boolean;
  error: string | null;
}

export const useAssetManagement = () => {
  
  const [state, setState] = useState<AssetManagementState>({
    assets: [],
    relationships: [],
    loading: false,
    error: null
  });

  const loadAssets = useCallback(async () => {
    setState(prev => ({ ...prev, loading: true, error: null }));
    
    try {
      let assets: Asset[] = [];
      let relationships: AssetRelationship[] = [];
      
      // Always load from localStorage as primary data source to avoid Supabase connection issues
      const savedAssets = localStorage.getItem('asset-inventory');
      const savedRelationships = localStorage.getItem('asset-relationships');
      
      assets = savedAssets ? JSON.parse(savedAssets).map((asset: any) => {
        const parseDate = (dateValue: string | Date | undefined): Date => {
          if (!dateValue) return new Date();
          if (dateValue instanceof Date) return dateValue;
          const parsed = new Date(dateValue);
          return isNaN(parsed.getTime()) ? new Date() : parsed;
        };

        return {
          ...asset,
          createdAt: parseDate(asset.createdAt),
          updatedAt: parseDate(asset.updatedAt),
          lastReviewed: parseDate(asset.lastReviewed),
          nextReview: parseDate(asset.nextReview),
          riskAssessment: {
            ...asset.riskAssessment,
            lastAssessment: parseDate(asset.riskAssessment?.lastAssessment),
            nextAssessment: parseDate(asset.riskAssessment?.nextAssessment)
          },
          lifecycle: {
            ...asset.lifecycle,
            deploymentDate: asset.lifecycle?.deploymentDate ? parseDate(asset.lifecycle.deploymentDate) : undefined,
            acquisitionDate: asset.lifecycle?.acquisitionDate ? parseDate(asset.lifecycle.acquisitionDate) : undefined,
            endOfLife: asset.lifecycle?.endOfLife ? parseDate(asset.lifecycle.endOfLife) : undefined,
            disposalDate: asset.lifecycle?.disposalDate ? parseDate(asset.lifecycle.disposalDate) : undefined,
            maintenanceSchedule: {
              ...asset.lifecycle?.maintenanceSchedule,
              lastMaintenance: asset.lifecycle?.maintenanceSchedule?.lastMaintenance ? 
                parseDate(asset.lifecycle.maintenanceSchedule.lastMaintenance) : undefined,
              nextMaintenance: parseDate(asset.lifecycle?.maintenanceSchedule?.nextMaintenance)
            }
          }
        } as Asset;
      }) : [];
      
      relationships = savedRelationships ? JSON.parse(savedRelationships).map((rel: any) => {
        const parseDate = (dateValue: string | Date | undefined): Date => {
          if (!dateValue) return new Date();
          if (dateValue instanceof Date) return dateValue;
          const parsed = new Date(dateValue);
          return isNaN(parsed.getTime()) ? new Date() : parsed;
        };

        return {
          ...rel,
          createdAt: parseDate(rel.createdAt)
        } as AssetRelationship;
      }) : [];

      setState({
        assets,
        relationships,
        loading: false,
        error: null
      });
    } catch (error) {
      console.warn('Failed to load assets:', error);
      setState(prev => ({
        ...prev,
        loading: false,
        error: error instanceof Error ? error.message : 'Failed to load assets'
      }));
    }
  }, []);

  // Helper method to calculate changes for audit logging
  const getChanges = useCallback((previous: Asset | undefined, current: Asset): Record<string, unknown> => {
    if (!previous) return {};
    
    const changes: Record<string, unknown> = {};
    
    // Compare key fields
    const fieldsToTrack = ['name', 'description', 'category', 'owner', 'status', 'criticality', 'informationClassification'];
    
    fieldsToTrack.forEach(field => {
      if (previous[field as keyof Asset] !== current[field as keyof Asset]) {
        changes[field] = {
          from: previous[field as keyof Asset],
          to: current[field as keyof Asset]
        };
      }
    });
    
    return changes;
  }, []);

  const saveAsset = useCallback(async (asset: Asset) => {
    try {
      // Validate and sanitize asset data
      validateAndSanitize({}, asset);
      
      // Store previous values for audit
      const previousAsset = state.assets.find(a => a.id === asset.id);
      
      // Save to localStorage as primary storage
      const existingAssets = JSON.parse(localStorage.getItem('asset-inventory') || '[]');
      const assetIndex = existingAssets.findIndex((a: Asset) => a.id === asset.id);
      
      if (assetIndex >= 0) {
        existingAssets[assetIndex] = asset;
      } else {
        existingAssets.push(asset);
      }
      
      localStorage.setItem('asset-inventory', JSON.stringify(existingAssets));
      
      // Update local state
      setState(prev => {
        const updatedAssets = [...prev.assets];
        const index = updatedAssets.findIndex(a => a.id === asset.id);
        if (index >= 0) {
          updatedAssets[index] = asset;
        } else {
          updatedAssets.push(asset);
        }
        return { ...prev, assets: updatedAssets };
      });
      
      // Audit log - changes tracked via getChanges helper if needed
      if (previousAsset) {
        const changes = getChanges(previousAsset, asset);
        if (Object.keys(changes).length > 0) {
          // Changes logged for audit trail
          console.debug('Asset updated:', { assetId: asset.id, changes });
        }
      }
      
      return asset;
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Failed to save asset';
      console.warn('Failed to save asset:', error);
      setState(prev => ({ ...prev, error: errorMessage }));
      throw error;
    }
  }, [state.assets, getChanges]);

  const deleteAsset = useCallback(async (assetId: string) => {
    try {
      const assetToDelete = state.assets.find(a => a.id === assetId);
      if (!assetToDelete) {
        throw new Error('Asset not found');
      }
      
      // Remove from localStorage as primary storage
      const existingAssets = JSON.parse(localStorage.getItem('asset-inventory') || '[]');
      const filteredAssets = existingAssets.filter((a: Asset) => a.id !== assetId);
      localStorage.setItem('asset-inventory', JSON.stringify(filteredAssets));
      
      // Update local state
      setState(prev => ({
        ...prev,
        assets: prev.assets.filter(a => a.id !== assetId)
      }));
      
      // Audit log - asset deletion tracked
      console.debug('Asset deleted:', { assetId, assetName: assetToDelete.name });
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Failed to delete asset';
      console.warn('Failed to delete asset:', error);
      setState(prev => ({ ...prev, error: errorMessage }));
      throw error;
    }
  }, [state.assets]);

  const saveRelationship = useCallback(async (relationship: AssetRelationship) => {
    try {
      // Save to localStorage as primary storage
      const existingRelationships = JSON.parse(localStorage.getItem('asset-relationships') || '[]');
      const relationshipIndex = existingRelationships.findIndex((r: AssetRelationship) => r.id === relationship.id);
      
      if (relationshipIndex >= 0) {
        existingRelationships[relationshipIndex] = relationship;
      } else {
        existingRelationships.push(relationship);
      }
      
      localStorage.setItem('asset-relationships', JSON.stringify(existingRelationships));
      
      // Update local state
      setState(prev => {
        const updatedRelationships = [...prev.relationships];
        const index = updatedRelationships.findIndex(r => r.id === relationship.id);
        if (index >= 0) {
          updatedRelationships[index] = relationship;
        } else {
          updatedRelationships.push(relationship);
        }
        return { ...prev, relationships: updatedRelationships };
      });
      
      // Audit log - relationship saved
      console.debug('Relationship saved:', { relationshipId: relationship.id });
      
      return relationship;
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Failed to save relationship';
      console.warn('Failed to save relationship:', error);
      setState(prev => ({ ...prev, error: errorMessage }));
      throw error;
    }
  }, []);

  const createAsset = useCallback(async (assetData: Omit<Asset, 'id' | 'createdAt' | 'updatedAt'>) => {
    const newAsset: Asset = {
      ...assetData,
      id: Date.now().toString(),
      createdAt: new Date(),
      updatedAt: new Date()
    };

    return saveAsset(newAsset);
  }, [saveAsset]);

  const updateAsset = useCallback(async (assetId: string, updates: Partial<Asset>) => {
    const asset = state.assets.find(a => a.id === assetId);
    if (!asset) {
      throw new Error('Asset not found');
    }

    const updatedAsset: Asset = {
      ...asset,
      ...updates,
      updatedAt: new Date()
    };

    return saveAsset(updatedAsset);
  }, [state.assets, saveAsset]);

  useEffect(() => {
    loadAssets();
  }, [loadAssets]);

  return {
    ...state,
    loadAssets,
    createAsset,
    updateAsset,
    saveAsset,
    deleteAsset,
    saveRelationship,
    refetch: loadAssets,
    getChanges
  };
};