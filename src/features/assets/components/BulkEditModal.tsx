// Bulk Edit Modal for CyberSoluce Asset Inventory
// Adapted from assetmanager-main with CyberSoluce design system

import React, { useState } from 'react';
import { X, Save, Users, MapPin, Tag, Shield, AlertCircle, CheckCircle } from 'lucide-react';
import { CoreAsset, CriticalityLevel, AssetStatus } from '../types/asset';
import { Card } from '../../../components/ui/card';
import { Button } from '../../../components/ui/button';
import { Badge } from '../../../components/ui/badge';

interface BulkEditModalProps {
  isOpen: boolean;
  onClose: () => void;
  selectedAssets: CoreAsset[];
  onSave: (updates: Partial<CoreAsset>) => Promise<void>;
}

export const BulkEditModal: React.FC<BulkEditModalProps> = ({
  isOpen,
  onClose,
  selectedAssets,
  onSave,
}) => {
  const [updates, setUpdates] = useState<Partial<CoreAsset & { addTags?: string; removeTags?: string[] }>>({});
  const [fieldsToUpdate, setFieldsToUpdate] = useState<Set<string>>(new Set());
  const [isSubmitting, setIsSubmitting] = useState(false);

  const criticalityOptions: CriticalityLevel[] = ['Critical', 'High', 'Medium', 'Low', 'critical', 'high', 'medium', 'low'];
  const statusOptions: AssetStatus[] = ['Active', 'Inactive', 'Retired', 'Planned', 'active', 'inactive', 'disposed', 'maintenance', 'quarantined', 'decommissioned'];

  const handleFieldToggle = (field: string) => {
    const newFields = new Set(fieldsToUpdate);
    if (newFields.has(field)) {
      newFields.delete(field);
      const newUpdates = { ...updates };
      delete newUpdates[field as keyof typeof updates];
      setUpdates(newUpdates);
    } else {
      newFields.add(field);
    }
    setFieldsToUpdate(newFields);
  };

  const handleSave = async () => {
    if (fieldsToUpdate.size === 0) return;
    
    setIsSubmitting(true);
    try {
      const filteredUpdates = Object.fromEntries(
        Object.entries(updates).filter(([key]) => fieldsToUpdate.has(key))
      );
      
      // Handle tag updates separately
      if (filteredUpdates.addTags) {
        const tagsToAdd = filteredUpdates.addTags.split(',').map(t => t.trim()).filter(Boolean);
        filteredUpdates.tags = [...new Set([...(selectedAssets[0]?.tags || []), ...tagsToAdd])];
        delete filteredUpdates.addTags;
      }
      
      await onSave(filteredUpdates);
      onClose();
      setUpdates({});
      setFieldsToUpdate(new Set());
    } catch (error) {
      console.error('Error saving bulk updates:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleClose = () => {
    onClose();
    setUpdates({});
    setFieldsToUpdate(new Set());
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <Card className="max-w-2xl w-full max-h-[90vh] overflow-hidden flex flex-col">
        {/* Header */}
        <div className="bg-gradient-to-r from-command-blue-600 to-command-blue-700 px-6 py-4 text-white">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-white bg-opacity-20 rounded-lg">
                <Users className="h-5 w-5" />
              </div>
              <div>
                <h2 className="text-xl font-bold">Bulk Edit Assets</h2>
                <p className="text-sm opacity-90">Update {selectedAssets.length} selected assets</p>
              </div>
            </div>
            <button
              onClick={handleClose}
              className="p-2 hover:bg-white hover:bg-opacity-20 rounded-lg transition-colors"
            >
              <X className="h-5 w-5" />
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto flex-1">
          {selectedAssets.length === 0 ? (
            <div className="text-center py-8">
              <AlertCircle className="h-12 w-12 mx-auto mb-4 text-gray-400" />
              <p className="text-gray-600 dark:text-gray-400">No assets selected for bulk editing</p>
            </div>
          ) : (
            <div className="space-y-6">
              {/* Selected Assets Preview */}
              <Card className="p-4 bg-blue-50 dark:bg-blue-900/20 border-blue-200 dark:border-blue-800">
                <h3 className="font-medium text-blue-900 dark:text-blue-100 mb-2">
                  Selected Assets ({selectedAssets.length})
                </h3>
                <div className="max-h-32 overflow-y-auto">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                    {selectedAssets.slice(0, 10).map(asset => (
                      <div key={asset.id} className="text-sm text-blue-800 dark:text-blue-200 truncate">
                        • {asset.name} ({asset.type})
                      </div>
                    ))}
                    {selectedAssets.length > 10 && (
                      <div className="text-sm text-blue-600 dark:text-blue-300 italic">
                        ... and {selectedAssets.length - 10} more assets
                      </div>
                    )}
                  </div>
                </div>
              </Card>

              {/* Owner */}
              <div className="flex items-start space-x-3">
                <input
                  type="checkbox"
                  checked={fieldsToUpdate.has('owner')}
                  onChange={() => handleFieldToggle('owner')}
                  className="mt-2 h-4 w-4 text-command-blue-600 focus:ring-command-blue-500 border-gray-300 rounded"
                />
                <div className="flex-1">
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    <Users className="h-4 w-4 inline mr-1" />
                    Owner
                  </label>
                  <input
                    type="text"
                    value={updates.owner || ''}
                    onChange={(e) => setUpdates({ ...updates, owner: e.target.value })}
                    disabled={!fieldsToUpdate.has('owner')}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-command-blue-500 disabled:bg-gray-100 dark:disabled:bg-gray-700"
                    placeholder="Enter new owner"
                  />
                </div>
              </div>

              {/* Location */}
              <div className="flex items-start space-x-3">
                <input
                  type="checkbox"
                  checked={fieldsToUpdate.has('location')}
                  onChange={() => handleFieldToggle('location')}
                  className="mt-2 h-4 w-4 text-command-blue-600 focus:ring-command-blue-500 border-gray-300 rounded"
                />
                <div className="flex-1">
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    <MapPin className="h-4 w-4 inline mr-1" />
                    Location
                  </label>
                  <input
                    type="text"
                    value={typeof updates.location === 'string' ? updates.location : ''}
                    onChange={(e) => setUpdates({ ...updates, location: e.target.value })}
                    disabled={!fieldsToUpdate.has('location')}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-command-blue-500 disabled:bg-gray-100 dark:disabled:bg-gray-700"
                    placeholder="Enter new location"
                  />
                </div>
              </div>

              {/* Criticality */}
              <div className="flex items-start space-x-3">
                <input
                  type="checkbox"
                  checked={fieldsToUpdate.has('criticality')}
                  onChange={() => handleFieldToggle('criticality')}
                  className="mt-2 h-4 w-4 text-command-blue-600 focus:ring-command-blue-500 border-gray-300 rounded"
                />
                <div className="flex-1">
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    <Shield className="h-4 w-4 inline mr-1" />
                    Criticality
                  </label>
                  <select
                    value={updates.criticality || ''}
                    onChange={(e) => setUpdates({ ...updates, criticality: e.target.value as CriticalityLevel })}
                    disabled={!fieldsToUpdate.has('criticality')}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-command-blue-500 disabled:bg-gray-100 dark:disabled:bg-gray-700"
                  >
                    <option value="">Select criticality</option>
                    {criticalityOptions.map(level => (
                      <option key={level} value={level}>{level}</option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Status */}
              <div className="flex items-start space-x-3">
                <input
                  type="checkbox"
                  checked={fieldsToUpdate.has('status')}
                  onChange={() => handleFieldToggle('status')}
                  className="mt-2 h-4 w-4 text-command-blue-600 focus:ring-command-blue-500 border-gray-300 rounded"
                />
                <div className="flex-1">
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    <CheckCircle className="h-4 w-4 inline mr-1" />
                    Status
                  </label>
                  <select
                    value={updates.status || ''}
                    onChange={(e) => setUpdates({ ...updates, status: e.target.value as AssetStatus })}
                    disabled={!fieldsToUpdate.has('status')}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-command-blue-500 disabled:bg-gray-100 dark:disabled:bg-gray-700"
                  >
                    <option value="">Select status</option>
                    {statusOptions.map(status => (
                      <option key={status} value={status}>{status}</option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Tags */}
              <div className="flex items-start space-x-3">
                <input
                  type="checkbox"
                  checked={fieldsToUpdate.has('addTags')}
                  onChange={() => handleFieldToggle('addTags')}
                  className="mt-2 h-4 w-4 text-command-blue-600 focus:ring-command-blue-500 border-gray-300 rounded"
                />
                <div className="flex-1">
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    <Tag className="h-4 w-4 inline mr-1" />
                    Add Tags (comma-separated)
                  </label>
                  <input
                    type="text"
                    value={updates.addTags || ''}
                    onChange={(e) => setUpdates({ ...updates, addTags: e.target.value })}
                    disabled={!fieldsToUpdate.has('addTags')}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-command-blue-500 disabled:bg-gray-100 dark:disabled:bg-gray-700"
                    placeholder="tag1, tag2, tag3"
                  />
                  <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
                    Tags will be added to existing tags for all selected assets
                  </p>
                </div>
              </div>

              {/* Compliance Frameworks */}
              <div className="flex items-start space-x-3">
                <input
                  type="checkbox"
                  checked={fieldsToUpdate.has('complianceFrameworks')}
                  onChange={() => handleFieldToggle('complianceFrameworks')}
                  className="mt-2 h-4 w-4 text-command-blue-600 focus:ring-command-blue-500 border-gray-300 rounded"
                />
                <div className="flex-1">
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    <Shield className="h-4 w-4 inline mr-1" />
                    Compliance Frameworks (comma-separated)
                  </label>
                  <input
                    type="text"
                    value={Array.isArray(updates.complianceFrameworks) ? updates.complianceFrameworks.join(', ') : ''}
                    onChange={(e) => setUpdates({ 
                      ...updates, 
                      complianceFrameworks: e.target.value.split(',').map(f => f.trim()).filter(Boolean) 
                    })}
                    disabled={!fieldsToUpdate.has('complianceFrameworks')}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-command-blue-500 disabled:bg-gray-100 dark:disabled:bg-gray-700"
                    placeholder="NIST-CSF, ISO-27001, GDPR"
                  />
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="px-6 py-4 border-t border-gray-200 dark:border-gray-700 flex items-center justify-end space-x-3 bg-gray-50 dark:bg-gray-800">
          <Button
            variant="outline"
            onClick={handleClose}
            disabled={isSubmitting}
          >
            Cancel
          </Button>
          <Button
            onClick={handleSave}
            disabled={fieldsToUpdate.size === 0 || isSubmitting}
            icon={Save}
          >
            {isSubmitting ? 'Saving...' : `Save Changes (${fieldsToUpdate.size} fields)`}
          </Button>
        </div>
      </Card>
    </div>
  );
};

