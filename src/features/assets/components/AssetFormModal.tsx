// Asset Form Modal Component for CyberSoluce
// Handles creating and editing assets

import React, { useState, useEffect } from 'react';
import { Modal } from '../../../components/ui/modal';
import { Card } from '../../../components/ui/card';
import { Button } from '../../../components/ui/button';
import { Input } from '../../../components/ui/input';
import { 
  CoreAsset, 
  AssetType, 
  AssetCategory, 
  CriticalityLevel, 
  AssetStatus,
  DataClassification 
} from '../types/asset';

interface AssetFormModalProps {
  asset?: CoreAsset | null;
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (assetData: Omit<CoreAsset, 'id' | 'createdAt' | 'updatedAt'>) => Promise<void>;
}

export const AssetFormModal: React.FC<AssetFormModalProps> = ({
  asset,
  isOpen,
  onClose,
  onSubmit,
}) => {
  const [formData, setFormData] = useState<Partial<CoreAsset>>({
    name: '',
    description: '',
    type: 'Server' as AssetType,
    category: 'hardware' as AssetCategory,
    owner: '',
    location: '',
    criticality: 'Medium' as CriticalityLevel,
    dataClassification: 'Internal' as DataClassification,
    status: 'Active' as AssetStatus,
    riskScore: 0,
    complianceFrameworks: [],
    tags: [],
    relationships: [],
    vulnerabilities: [],
    dependencies: [],
  });
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  useEffect(() => {
    if (asset) {
      setFormData({
        name: asset.name,
        description: asset.description,
        type: asset.type,
        category: asset.category,
        owner: asset.owner,
        custodian: asset.custodian,
        location: typeof asset.location === 'string' ? asset.location : JSON.stringify(asset.location),
        ipAddress: asset.ipAddress,
        criticality: asset.criticality,
        dataClassification: asset.dataClassification,
        businessValue: asset.businessValue,
        status: asset.status,
        riskScore: asset.riskScore,
        complianceFrameworks: asset.complianceFrameworks,
        tags: asset.tags,
        dataTypes: asset.dataTypes,
        retentionPeriod: asset.retentionPeriod,
        encryptionStatus: asset.encryptionStatus,
        technosoluce_data: asset.technosoluce_data,
        vendorsoluce_data: asset.vendorsoluce_data,
        cybercorrect_data: asset.cybercorrect_data,
      });
    } else {
      // Reset form for new asset
      setFormData({
        name: '',
        description: '',
        type: 'Server' as AssetType,
        category: 'hardware' as AssetCategory,
        owner: '',
        location: '',
        criticality: 'Medium' as CriticalityLevel,
        dataClassification: 'Internal' as DataClassification,
        status: 'Active' as AssetStatus,
        riskScore: 0,
        complianceFrameworks: [],
        tags: [],
        relationships: [],
        vulnerabilities: [],
        dependencies: [],
      });
    }
    setErrors({});
  }, [asset, isOpen]);

  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {};

    if (!formData.name || formData.name.trim().length === 0) {
      newErrors.name = 'Asset name is required';
    }

    if (!formData.owner || formData.owner.trim().length === 0) {
      newErrors.owner = 'Owner is required';
    }

    if (formData.riskScore !== undefined && (formData.riskScore < 0 || formData.riskScore > 100)) {
      newErrors.riskScore = 'Risk score must be between 0 and 100';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setLoading(true);
    try {
      const assetData: Omit<CoreAsset, 'id' | 'createdAt' | 'updatedAt'> = {
        organizationId: asset?.organizationId || '',
        name: formData.name!,
        description: formData.description || '',
        type: formData.type!,
        category: formData.category!,
        owner: formData.owner!,
        custodian: formData.custodian,
        location: formData.location || '',
        ipAddress: formData.ipAddress,
        criticality: formData.criticality!,
        dataClassification: formData.dataClassification!,
        businessValue: formData.businessValue,
        status: formData.status!,
        riskScore: formData.riskScore || 0,
        complianceFrameworks: formData.complianceFrameworks || [],
        tags: formData.tags || [],
        dataTypes: formData.dataTypes || [],
        retentionPeriod: formData.retentionPeriod,
        encryptionStatus: formData.encryptionStatus,
        relationships: formData.relationships || [],
        vulnerabilities: formData.vulnerabilities || [],
        dependencies: formData.dependencies || [],
        technosoluce_data: formData.technosoluce_data,
        vendorsoluce_data: formData.vendorsoluce_data,
        cybercorrect_data: formData.cybercorrect_data,
      };

      await onSubmit(assetData);
      onClose();
    } catch (error) {
      console.error('Failed to save asset:', error);
      setErrors({ submit: 'Failed to save asset. Please try again.' });
    } finally {
      setLoading(false);
    }
  };

  const handleTagInput = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && e.currentTarget.value.trim()) {
      e.preventDefault();
      const newTag = e.currentTarget.value.trim();
      setFormData(prev => ({
        ...prev,
        tags: [...(prev.tags || []), newTag],
      }));
      e.currentTarget.value = '';
    }
  };

  const removeTag = (index: number) => {
    setFormData(prev => ({
      ...prev,
      tags: prev.tags?.filter((_, i) => i !== index) || [],
    }));
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={asset ? 'Edit Asset' : 'Create New Asset'}
      description={asset ? 'Update asset information' : 'Add a new asset to your inventory'}
      size="lg"
    >
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Basic Information */}
        <Card className="p-4">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Basic Information</h3>
          <div className="space-y-4">
            <Input
              label="Asset Name *"
              value={formData.name}
              onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
              error={errors.name}
              required
            />
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label htmlFor="asset-type" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Type *
                </label>
                <select
                  id="asset-type"
                  value={formData.type}
                  onChange={(e) => setFormData(prev => ({ ...prev, type: e.target.value as AssetType }))}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                  required
                >
                  <option value="Server">Server</option>
                  <option value="Database">Database</option>
                  <option value="Application">Application</option>
                  <option value="Network">Network</option>
                  <option value="Endpoint">Endpoint</option>
                  <option value="Cloud Service">Cloud Service</option>
                  <option value="Information Asset">Information Asset</option>
                  <option value="Data Repository">Data Repository</option>
                  <option value="API">API</option>
                  <option value="Third Party Service">Third Party Service</option>
                </select>
              </div>
              <div>
                <label htmlFor="asset-category" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Category *
                </label>
                <select
                  id="asset-category"
                  value={formData.category}
                  onChange={(e) => setFormData(prev => ({ ...prev, category: e.target.value as AssetCategory }))}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                  required
                >
                  <option value="hardware">Hardware</option>
                  <option value="software">Software</option>
                  <option value="data">Data</option>
                  <option value="services">Services</option>
                  <option value="vendor">Vendor</option>
                  <option value="personnel">Personnel</option>
                  <option value="facilities">Facilities</option>
                </select>
              </div>
            </div>
            <div>
              <label htmlFor="asset-description" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Description
              </label>
              <textarea
                id="asset-description"
                value={formData.description}
                onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                rows={3}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
              />
            </div>
          </div>
        </Card>

        {/* Ownership & Location */}
        <Card className="p-4">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Ownership & Location</h3>
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <Input
                label="Owner *"
                value={formData.owner}
                onChange={(e) => setFormData(prev => ({ ...prev, owner: e.target.value }))}
                error={errors.owner}
                required
              />
              <Input
                label="Custodian"
                value={formData.custodian || ''}
                onChange={(e) => setFormData(prev => ({ ...prev, custodian: e.target.value }))}
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <Input
                label="Location"
                value={typeof formData.location === 'string' ? formData.location : ''}
                onChange={(e) => setFormData(prev => ({ ...prev, location: e.target.value }))}
              />
              <Input
                label="IP Address"
                value={formData.ipAddress || ''}
                onChange={(e) => setFormData(prev => ({ ...prev, ipAddress: e.target.value }))}
              />
            </div>
          </div>
        </Card>

        {/* Classification & Risk */}
        <Card className="p-4">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Classification & Risk</h3>
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label htmlFor="asset-criticality" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Criticality *
                </label>
                <select
                  id="asset-criticality"
                  value={formData.criticality}
                  onChange={(e) => setFormData(prev => ({ ...prev, criticality: e.target.value as CriticalityLevel }))}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                  required
                >
                  <option value="Critical">Critical</option>
                  <option value="High">High</option>
                  <option value="Medium">Medium</option>
                  <option value="Low">Low</option>
                </select>
              </div>
              <div>
                <label htmlFor="asset-data-classification" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Data Classification *
                </label>
                <select
                  id="asset-data-classification"
                  value={formData.dataClassification}
                  onChange={(e) => setFormData(prev => ({ ...prev, dataClassification: e.target.value as DataClassification }))}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                  required
                >
                  <option value="Public">Public</option>
                  <option value="Internal">Internal</option>
                  <option value="Confidential">Confidential</option>
                  <option value="Restricted">Restricted</option>
                  <option value="Top Secret">Top Secret</option>
                </select>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label htmlFor="asset-status" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Status *
                </label>
                <select
                  id="asset-status"
                  value={formData.status}
                  onChange={(e) => setFormData(prev => ({ ...prev, status: e.target.value as AssetStatus }))}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                  required
                >
                  <option value="Active">Active</option>
                  <option value="Inactive">Inactive</option>
                  <option value="Planned">Planned</option>
                  <option value="Retired">Retired</option>
                  <option value="maintenance">Maintenance</option>
                  <option value="quarantined">Quarantined</option>
                </select>
              </div>
              <Input
                label="Risk Score (0-100)"
                type="number"
                min="0"
                max="100"
                value={formData.riskScore}
                onChange={(e) => setFormData(prev => ({ ...prev, riskScore: parseInt(e.target.value) || 0 }))}
                error={errors.riskScore}
              />
            </div>
          </div>
        </Card>

        {/* Tags */}
        <Card className="p-4">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Tags</h3>
          <div className="space-y-2">
            <Input
              label="Add Tag (Press Enter)"
              onKeyDown={handleTagInput}
              placeholder="Type a tag and press Enter"
            />
            {formData.tags && formData.tags.length > 0 && (
              <div className="flex flex-wrap gap-2 mt-2">
                {formData.tags.map((tag, index) => (
                  <span
                    key={index}
                    className="inline-flex items-center px-2 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-300 rounded text-sm"
                  >
                    {tag}
                    <button
                      type="button"
                      onClick={() => removeTag(index)}
                      className="ml-2 text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-200"
                    >
                      ×
                    </button>
                  </span>
                ))}
              </div>
            )}
          </div>
        </Card>

        {/* Error Message */}
        {errors.submit && (
          <div className="p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-md">
            <p className="text-sm text-red-600 dark:text-red-400">{errors.submit}</p>
          </div>
        )}

        {/* Form Actions */}
        <div className="flex items-center justify-end space-x-3 pt-4 border-t border-gray-200 dark:border-gray-700">
          <Button
            type="button"
            variant="outline"
            onClick={onClose}
            disabled={loading}
          >
            Cancel
          </Button>
          <Button
            type="submit"
            loading={loading}
          >
            {asset ? 'Update Asset' : 'Create Asset'}
          </Button>
        </div>
      </form>
    </Modal>
  );
};

