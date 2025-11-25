import { useState, useEffect, useCallback } from 'react';
import { Asset } from '../../../shared/types/assets';

interface AssetsState {
  assets: Asset[];
  loading: boolean;
  error: string | null;
}

export const useAssets = () => {
  const [state, setState] = useState<AssetsState>({
    assets: [],
    loading: false,
    error: null
  });

  const loadAssets = useCallback(async () => {
    setState(prev => ({ ...prev, loading: true, error: null }));
    
    try {
      // Load from localStorage for now
      const savedAssets = localStorage.getItem('asset-inventory');
      const assets = savedAssets ? JSON.parse(savedAssets) : [];
      
      setState({
        assets,
        loading: false,
        error: null
      });
    } catch {
      setState(prev => ({
        ...prev,
        loading: false,
        error: 'Failed to load assets'
      }));
    }
  }, []);

  const saveAsset = useCallback(async (asset: Asset) => {
    try {
      const existingAssets = JSON.parse(localStorage.getItem('asset-inventory') || '[]');
      const assetIndex = existingAssets.findIndex((a: Asset) => a.id === asset.id);
      
      if (assetIndex >= 0) {
        existingAssets[assetIndex] = asset;
      } else {
        existingAssets.push(asset);
      }
      
      localStorage.setItem('asset-inventory', JSON.stringify(existingAssets));
      
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
      
      return asset;
    } catch (error) {
      setState(prev => ({ ...prev, error: 'Failed to save asset' }));
      throw error;
    }
  }, []);

  const deleteAsset = useCallback(async (assetId: string) => {
    try {
      const existingAssets = JSON.parse(localStorage.getItem('asset-inventory') || '[]');
      const filteredAssets = existingAssets.filter((a: Asset) => a.id !== assetId);
      localStorage.setItem('asset-inventory', JSON.stringify(filteredAssets));
      
      setState(prev => ({
        ...prev,
        assets: prev.assets.filter(a => a.id !== assetId)
      }));
    } catch (error) {
      setState(prev => ({ ...prev, error: 'Failed to delete asset' }));
      throw error;
    }
  }, []);

  useEffect(() => {
    loadAssets();
  }, [loadAssets]);

  return {
    ...state,
    loadAssets,
    saveAsset,
    deleteAsset,
    refetch: loadAssets
  };
};