// Asset Inventory Dashboard for CyberSoluce
// Uses CyberSoluce design system and components

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Plus, Search, Filter, Download, Upload, 
  Server, Database, Shield, AlertTriangle,
  TrendingUp, FileText, BarChart3
} from 'lucide-react';
import { useAssetInventory } from '../contexts/AssetInventoryContext';
import { Card } from '../../../components/ui/card';
import { Button } from '../../../components/ui/button';
import PageHeader from '../../../components/common/PageHeader';
import { getCriticalityColor, getStatusColor, getRiskScoreColor, formatDate } from '../utils/assetUtils';
import { Badge } from '../../../components/ui/badge';
import { AssetDetailModal } from './AssetDetailModal';
import { AssetFormModal } from './AssetFormModal';
import { AssetImportModal } from './AssetImportModal';
import { AdvancedFiltersModal } from './AdvancedFiltersModal';
import { BulkEditModal } from './BulkEditModal';
import { CoreAsset } from '../types/asset';

export const AssetInventoryDashboard: React.FC = () => {
  const {
    assets,
    filteredAssets,
    paginatedAssets,
    stats,
    filters,
    loading,
    selectedAssets,
    currentPage,
    itemsPerPage,
    totalPages,
    updateFilters,
    updateSort,
    setCurrentPage,
    selectAsset,
    selectAllAssets,
    showAssetDetail: showDetailInContext,
    hideAssetDetail,
    showImportModal: showImportInContext,
    hideImportModal,
    deleteAssets,
    addAsset,
    updateAsset,
    refreshAssets,
    selectedAsset,
    showDetailModal,
    showImportModal,
  } = useAssetInventory();

  const [searchQuery, setSearchQuery] = useState(filters.search);
  const [showFilters, setShowFilters] = useState(false);
  const [showAdvancedFilters, setShowAdvancedFilters] = useState(false);
  const [showBulkEdit, setShowBulkEdit] = useState(false);
  const [showFormModal, setShowFormModal] = useState(false);
  const [editingAsset, setEditingAsset] = useState<CoreAsset | null>(null);

  const handleSearch = (value: string) => {
    setSearchQuery(value);
    updateFilters({ search: value });
  };

  const handleDeleteSelected = async () => {
    if (selectedAssets.length === 0) return;
    if (window.confirm(`Delete ${selectedAssets.length} asset(s)?`)) {
      try {
        await deleteAssets(selectedAssets);
      } catch (error) {
        console.error('Failed to delete assets:', error);
      }
    }
  };

  const handleBulkEdit = async (updates: Partial<CoreAsset>) => {
    // Apply updates to all selected assets
    for (const assetId of selectedAssets) {
      try {
        await updateAsset(assetId, updates);
      } catch (error) {
        console.error(`Failed to update asset ${assetId}:`, error);
      }
    }
    setShowBulkEdit(false);
  };

  const getSelectedAssetsList = () => {
    return assets.filter(asset => selectedAssets.includes(asset.id));
  };

  const handleCreateAsset = () => {
    setEditingAsset(null);
    setShowFormModal(true);
  };

  const handleEditAsset = (asset: CoreAsset) => {
    setEditingAsset(asset);
    setShowFormModal(true);
  };

  const handleFormSubmit = async (assetData: Omit<CoreAsset, 'id' | 'createdAt' | 'updatedAt'>) => {
    if (editingAsset) {
      await updateAsset(editingAsset.id, assetData);
    } else {
      await addAsset(assetData);
    }
    setShowFormModal(false);
    setEditingAsset(null);
  };

  const handleImportAssets = async (importedAssets: Omit<CoreAsset, 'id' | 'createdAt' | 'updatedAt'>[]) => {
    // Import assets one by one
    for (const assetData of importedAssets) {
      try {
        await addAsset(assetData);
      } catch (error) {
        console.error('Failed to import asset:', error);
      }
    }
  };

  const handleDeleteAsset = async (assetId: string) => {
    try {
      await deleteAssets([assetId]);
    } catch (error) {
      console.error('Failed to delete asset:', error);
    }
  };

  return (
    <div className="space-y-6 p-6">
      {/* Page Header */}
      <PageHeader
        title="Asset Inventory"
        subtitle="Unified asset management with product extensions"
        icon={Server}
        actions={
          <div className="flex items-center space-x-3">
            <Button
              variant="outline"
              size="sm"
              onClick={showImportModal}
              icon={Upload}
            >
              Import
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => refreshAssets()}
            >
              Refresh
            </Button>
            <Button
              size="sm"
              onClick={handleCreateAsset}
              icon={Plus}
            >
              Add Asset
            </Button>
          </div>
        }
      />

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <Card className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-400">Total Assets</p>
                <p className="text-3xl font-bold text-gray-900 dark:text-white mt-2">
                  {stats.total}
                </p>
              </div>
              <div className="bg-blue-100 dark:bg-blue-900/30 p-3 rounded-lg">
                <Server className="h-6 w-6 text-blue-600 dark:text-blue-400" />
              </div>
            </div>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <Card className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-400">Critical Assets</p>
                <p className="text-3xl font-bold text-red-600 dark:text-red-400 mt-2">
                  {stats.critical}
                </p>
              </div>
              <div className="bg-red-100 dark:bg-red-900/30 p-3 rounded-lg">
                <AlertTriangle className="h-6 w-6 text-red-600 dark:text-red-400" />
              </div>
            </div>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <Card className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-400">Recently Added</p>
                <p className="text-3xl font-bold text-green-600 dark:text-green-400 mt-2">
                  {stats.recentlyAdded}
                </p>
              </div>
              <div className="bg-green-100 dark:bg-green-900/30 p-3 rounded-lg">
                <TrendingUp className="h-6 w-6 text-green-600 dark:text-green-400" />
              </div>
            </div>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <Card className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-400">Untagged</p>
                <p className="text-3xl font-bold text-yellow-600 dark:text-yellow-400 mt-2">
                  {stats.untagged}
                </p>
              </div>
              <div className="bg-yellow-100 dark:bg-yellow-900/30 p-3 rounded-lg">
                <FileText className="h-6 w-6 text-yellow-600 dark:text-yellow-400" />
              </div>
            </div>
          </Card>
        </motion.div>
      </div>

      {/* Search and Filters */}
      <Card className="p-4">
        <div className="flex items-center space-x-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search assets..."
              value={searchQuery}
              onChange={(e) => handleSearch(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-command-blue-500 focus:border-transparent"
            />
          </div>
          <Button
            variant="outline"
            size="sm"
            onClick={() => setShowAdvancedFilters(true)}
            icon={Filter}
          >
            Advanced Filters
          </Button>
          {selectedAssets.length > 0 && (
            <>
              <Button
                variant="outline"
                size="sm"
                onClick={() => setShowBulkEdit(true)}
              >
                Bulk Edit ({selectedAssets.length})
              </Button>
              <Button
                variant="destructive"
                size="sm"
                onClick={handleDeleteSelected}
              >
                Delete ({selectedAssets.length})
              </Button>
            </>
          )}
        </div>
      </Card>

      {/* Assets Table */}
      <Card>
        <div className="overflow-x-auto">
          {loading ? (
            <div className="flex justify-center items-center py-12">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-command-blue-600"></div>
            </div>
          ) : paginatedAssets.length === 0 ? (
            <div className="text-center py-12">
              <Server className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-600 dark:text-gray-400">No assets found</p>
              <Button
                variant="outline"
                className="mt-4"
                onClick={handleCreateAsset}
                icon={Plus}
              >
                Add Your First Asset
              </Button>
            </div>
          ) : (
            <table className="w-full">
              <thead className="bg-gray-50 dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    <input
                      type="checkbox"
                      checked={selectedAssets.length === paginatedAssets.length && paginatedAssets.length > 0}
                      onChange={selectAllAssets}
                      className="rounded border-gray-300 text-command-blue-600 focus:ring-command-blue-500"
                    />
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider cursor-pointer"
                      onClick={() => updateSort('name')}>
                    Name
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider cursor-pointer"
                      onClick={() => updateSort('type')}>
                    Type
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider cursor-pointer"
                      onClick={() => updateSort('criticality')}>
                    Criticality
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider cursor-pointer"
                      onClick={() => updateSort('riskScore')}>
                    Risk Score
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider cursor-pointer"
                      onClick={() => updateSort('status')}>
                    Status
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    Owner
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    Updated
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white dark:bg-gray-900 divide-y divide-gray-200 dark:divide-gray-700">
                {paginatedAssets.map((asset) => (
                  <tr
                    key={asset.id}
                    className="hover:bg-gray-50 dark:hover:bg-gray-800 cursor-pointer"
                    onClick={() => showDetailInContext(asset)}
                  >
                    <td className="px-6 py-4 whitespace-nowrap" onClick={(e) => e.stopPropagation()}>
                      <input
                        type="checkbox"
                        checked={selectedAssets.includes(asset.id)}
                        onChange={() => selectAsset(asset.id)}
                        className="rounded border-gray-300 text-command-blue-600 focus:ring-command-blue-500"
                      />
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900 dark:text-white">
                        {asset.name}
                      </div>
                      {asset.description && (
                        <div className="text-sm text-gray-500 dark:text-gray-400 truncate max-w-xs">
                          {asset.description}
                        </div>
                      )}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <Badge variant="outline">{asset.type}</Badge>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getCriticalityColor(asset.criticality)}`}>
                        {asset.criticality}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <span className={`text-sm font-medium ${getRiskScoreColor(asset.riskScore)} px-2 py-1 rounded`}>
                          {asset.riskScore}
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(asset.status)}`}>
                        {asset.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                      {asset.owner}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                      {formatDate(asset.updatedAt)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="px-6 py-4 border-t border-gray-200 dark:border-gray-700 flex items-center justify-between">
            <div className="text-sm text-gray-700 dark:text-gray-300">
              Showing {(currentPage - 1) * itemsPerPage + 1} to {Math.min(currentPage * itemsPerPage, filteredAssets.length)} of {filteredAssets.length} assets
            </div>
            <div className="flex items-center space-x-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setCurrentPage(currentPage - 1)}
                disabled={currentPage === 1}
              >
                Previous
              </Button>
              <span className="text-sm text-gray-700 dark:text-gray-300">
                Page {currentPage} of {totalPages}
              </span>
              <Button
                variant="outline"
                size="sm"
                onClick={() => setCurrentPage(currentPage + 1)}
                disabled={currentPage === totalPages}
              >
                Next
              </Button>
            </div>
          </div>
        )}
      </Card>

      {/* Modals */}
      <AssetDetailModal
        asset={selectedAsset}
        isOpen={showDetailModal}
        onClose={hideAssetDetail}
        onEdit={handleEditAsset}
        onDelete={handleDeleteAsset}
      />

      <AssetFormModal
        asset={editingAsset}
        isOpen={showFormModal}
        onClose={() => {
          setShowFormModal(false);
          setEditingAsset(null);
        }}
        onSubmit={handleFormSubmit}
      />

      <AssetImportModal
        isOpen={showImportModal}
        onClose={hideImportModal}
        onImport={handleImportAssets}
      />

      <AdvancedFiltersModal
        isOpen={showAdvancedFilters}
        onClose={() => setShowAdvancedFilters(false)}
        onApplyFilters={updateFilters}
        currentFilters={filters}
      />

      <BulkEditModal
        isOpen={showBulkEdit}
        onClose={() => setShowBulkEdit(false)}
        selectedAssets={getSelectedAssetsList()}
        onSave={handleBulkEdit}
      />
    </div>
  );
};

