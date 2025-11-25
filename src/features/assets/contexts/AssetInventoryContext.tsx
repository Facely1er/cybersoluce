// Asset Inventory Context for CyberSoluce
// Adapted from assetmanager-main to use CyberSoluce patterns and design system

import React, { createContext, useContext, useState, useEffect, useMemo, useCallback } from 'react';
import { CoreAsset, AssetFilters, AssetInventoryState, SortConfig, AssetStats } from '../types/asset';
import { assetService } from '../services/assetService';
import { filterAssets, sortAssets, calculateAssetStats } from '../utils/assetUtils';
import { useAuth } from '../../../context/AuthContext';
import { logError } from '../../../utils/logger';

const initialFilters: AssetFilters = {
  search: '',
  types: [],
  categories: [],
  criticalities: [],
  owners: [],
  locations: [],
  complianceFrameworks: [],
  status: [],
  tags: [],
  riskScoreRange: [0, 100],
  dataClassification: [],
};

const initialSortConfig: SortConfig = {
  key: null,
  direction: 'asc',
};

interface AssetInventoryContextType extends AssetInventoryState {
  stats: AssetStats;
  paginatedAssets: CoreAsset[];
  filterOptions: {
    owners: string[];
    locations: string[];
    tags: string[];
  };
  totalPages: number;
  updateFilters: (newFilters: Partial<AssetFilters>) => void;
  updateSort: (key: keyof CoreAsset) => void;
  setCurrentPage: (page: number) => void;
  setItemsPerPage: (itemsPerPage: number) => void;
  selectAsset: (assetId: string) => void;
  selectAllAssets: () => void;
  showAssetDetail: (asset: CoreAsset) => void;
  hideAssetDetail: () => void;
  showImportModal: () => void;
  hideImportModal: () => void;
  deleteAssets: (assetIds: string[]) => Promise<void>;
  addAsset: (asset: Omit<CoreAsset, 'id' | 'createdAt' | 'updatedAt'>) => Promise<CoreAsset>;
  updateAsset: (assetId: string, updates: Partial<CoreAsset>) => Promise<void>;
  replaceAssets: (newAssets: CoreAsset[]) => void;
  refreshAssets: () => Promise<void>;
}

const AssetInventoryContext = createContext<AssetInventoryContextType | undefined>(undefined);

export const useAssetInventory = () => {
  const context = useContext(AssetInventoryContext);
  if (context === undefined) {
    throw new Error('useAssetInventory must be used within an AssetInventoryProvider');
  }
  return context;
};

interface AssetInventoryProviderProps {
  children: React.ReactNode;
}

export const AssetInventoryProvider: React.FC<AssetInventoryProviderProps> = ({ children }) => {
  const { user } = useAuth();
  const [state, setState] = useState<AssetInventoryState>({
    assets: [],
    filteredAssets: [],
    selectedAssets: [],
    filters: initialFilters,
    sortConfig: initialSortConfig,
    currentPage: 1,
    itemsPerPage: 25, // Default page size for CyberSoluce
    loading: false,
    selectedAsset: null,
    showDetailModal: false,
    showImportModal: false,
    searchDebounce: 0,
  });

  // Load assets on mount and when user changes
  const loadAssets = useCallback(async () => {
    setState(prev => ({ ...prev, loading: true }));
    try {
      // Get organization ID from user if available
      const organizationId = (user as any)?.organizationId || undefined;
      const assets = await assetService.getAssets(organizationId);
      setState(prev => ({ ...prev, assets, loading: false }));
    } catch (error) {
      logError('AssetInventoryProvider.loadAssets', error as Error);
      setState(prev => ({ ...prev, assets: [], loading: false }));
    }
  }, [user]);

  useEffect(() => {
    loadAssets();
  }, [loadAssets]);

  // Debounced search and filter effect
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      try {
        setState(prev => ({ ...prev, loading: true }));
        
        const filtered = filterAssets(state.assets, state.filters);
        const sorted = sortAssets(filtered, state.sortConfig);
        
        setState(prev => ({
          ...prev,
          filteredAssets: sorted,
          currentPage: 1, // Reset to first page when filtering
          loading: false,
        }));
      } catch (error) {
        logError('AssetInventoryProvider.filterAssets', error as Error);
        setState(prev => ({ ...prev, loading: false }));
      }
    }, 300); // 300ms debounce

    return () => clearTimeout(timeoutId);
  }, [state.filters, state.assets, state.sortConfig]);

  // Calculate statistics with error handling
  const stats = useMemo(() => {
    try {
      return calculateAssetStats(state.assets);
    } catch (error) {
      logError('AssetInventoryProvider.calculateStats', error as Error);
      return {
        total: 0,
        critical: 0,
        untagged: 0,
        recentlyAdded: 0,
        byType: {},
        byCriticality: {},
        byStatus: {},
        byDataClassification: {},
        byEncryptionStatus: {},
        privacyCompliant: 0,
        withPIA: 0,
        crossBorderTransfer: 0,
        thirdPartySharing: 0,
      };
    }
  }, [state.assets]);

  // Get paginated assets with bounds checking
  const paginatedAssets = useMemo(() => {
    const startIndex = (state.currentPage - 1) * state.itemsPerPage;
    const endIndex = startIndex + state.itemsPerPage;
    return state.filteredAssets.slice(startIndex, endIndex);
  }, [state.filteredAssets, state.currentPage, state.itemsPerPage]);

  // Calculate total pages
  const totalPages = useMemo(() => {
    return Math.ceil(state.filteredAssets.length / state.itemsPerPage);
  }, [state.filteredAssets.length, state.itemsPerPage]);

  // Get unique filter options with memoization
  const filterOptions = useMemo(() => ({
    owners: [...new Set(state.assets.map(asset => asset.owner))].sort(),
    locations: [...new Set(state.assets.map(asset => typeof asset.location === 'string' ? asset.location : ''))].filter(Boolean).sort(),
    tags: [...new Set(state.assets.flatMap(asset => asset.tags))].sort(),
  }), [state.assets]);

  const updateFilters = useCallback((newFilters: Partial<AssetFilters>) => {
    setState(prev => ({
      ...prev,
      filters: { ...prev.filters, ...newFilters },
    }));
  }, []);

  const updateSort = useCallback((key: keyof CoreAsset) => {
    setState(prev => ({
      ...prev,
      sortConfig: {
        key,
        direction: prev.sortConfig.key === key && prev.sortConfig.direction === 'asc' ? 'desc' : 'asc',
      },
    }));
  }, []);

  const setCurrentPage = useCallback((page: number) => {
    setState(prev => {
      const totalPages = Math.ceil(prev.filteredAssets.length / prev.itemsPerPage);
      const validPage = Math.max(1, Math.min(page, totalPages));
      return { ...prev, currentPage: validPage };
    });
  }, []);

  const setItemsPerPage = useCallback((itemsPerPage: number) => {
    const validItemsPerPage = Math.min(Math.max(itemsPerPage, 10), 100); // Between 10 and 100
    setState(prev => ({ ...prev, itemsPerPage: validItemsPerPage, currentPage: 1 }));
  }, []);

  const selectAsset = useCallback((assetId: string) => {
    setState(prev => ({
      ...prev,
      selectedAssets: prev.selectedAssets.includes(assetId)
        ? prev.selectedAssets.filter(id => id !== assetId)
        : [...prev.selectedAssets, assetId],
    }));
  }, []);

  const selectAllAssets = useCallback(() => {
    setState(prev => {
      const currentPageAssets = prev.filteredAssets.slice(
        (prev.currentPage - 1) * prev.itemsPerPage,
        prev.currentPage * prev.itemsPerPage
      );
      const allSelected = currentPageAssets.every(asset => prev.selectedAssets.includes(asset.id));
      return {
        ...prev,
        selectedAssets: allSelected
          ? prev.selectedAssets.filter(id => !currentPageAssets.some(a => a.id === id))
          : [...new Set([...prev.selectedAssets, ...currentPageAssets.map(a => a.id)])],
      };
    });
  }, []);

  const showAssetDetail = useCallback((asset: CoreAsset) => {
    setState(prev => ({
      ...prev,
      selectedAsset: asset,
      showDetailModal: true,
    }));
  }, []);

  const hideAssetDetail = useCallback(() => {
    setState(prev => ({
      ...prev,
      selectedAsset: null,
      showDetailModal: false,
    }));
  }, []);

  const showImportModal = useCallback(() => {
    setState(prev => ({ ...prev, showImportModal: true }));
  }, []);

  const hideImportModal = useCallback(() => {
    setState(prev => ({ ...prev, showImportModal: false }));
  }, []);

  const deleteAssets = useCallback(async (assetIds: string[]) => {
    try {
      await assetService.deleteAssets(assetIds);
      await loadAssets(); // Reload assets after deletion
      setState(prev => ({
        ...prev,
        selectedAssets: prev.selectedAssets.filter(id => !assetIds.includes(id)),
      }));
    } catch (error) {
      logError('AssetInventoryProvider.deleteAssets', error as Error);
      throw error;
    }
  }, [loadAssets]);

  const addAsset = useCallback(async (assetData: Omit<CoreAsset, 'id' | 'createdAt' | 'updatedAt'>): Promise<CoreAsset> => {
    try {
      const organizationId = (user as any)?.organizationId || undefined;
      const newAsset = await assetService.createAsset(assetData, organizationId);
      await loadAssets(); // Reload assets after creation
      return newAsset;
    } catch (error) {
      logError('AssetInventoryProvider.addAsset', error as Error);
      throw error;
    }
  }, [user, loadAssets]);

  const updateAsset = useCallback(async (assetId: string, updates: Partial<CoreAsset>): Promise<void> => {
    try {
      await assetService.updateAsset(assetId, updates);
      await loadAssets(); // Reload assets after update
      if (state.selectedAsset?.id === assetId) {
        const updatedAsset = await assetService.getAsset(assetId);
        if (updatedAsset) {
          setState(prev => ({ ...prev, selectedAsset: updatedAsset }));
        }
      }
    } catch (error) {
      logError('AssetInventoryProvider.updateAsset', error as Error);
      throw error;
    }
  }, [loadAssets, state.selectedAsset]);

  const replaceAssets = useCallback((newAssets: CoreAsset[]) => {
    setState(prev => ({ ...prev, assets: newAssets }));
  }, []);

  const refreshAssets = useCallback(async () => {
    await loadAssets();
  }, [loadAssets]);

  const value: AssetInventoryContextType = {
    ...state,
    stats,
    paginatedAssets,
    filterOptions,
    totalPages,
    updateFilters,
    updateSort,
    setCurrentPage,
    setItemsPerPage,
    selectAsset,
    selectAllAssets,
    showAssetDetail,
    hideAssetDetail,
    showImportModal,
    hideImportModal,
    deleteAssets,
    addAsset,
    updateAsset,
    replaceAssets,
    refreshAssets,
  };

  return (
    <AssetInventoryContext.Provider value={value}>
      {children}
    </AssetInventoryContext.Provider>
  );
};

