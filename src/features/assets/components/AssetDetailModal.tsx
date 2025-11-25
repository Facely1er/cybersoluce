// Asset Detail Modal Component for CyberSoluce
// Displays comprehensive asset information including product extensions

import React from 'react';
import { Modal } from '../../../components/ui/modal';
import { Card } from '../../../components/ui/card';
import { Badge } from '../../../components/ui/badge';
import { Button } from '../../../components/ui/button';
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore - Icons exist in lucide-react but TypeScript definitions may be outdated
import * as LucideIcons from 'lucide-react';

// Type-safe icon imports with fallbacks
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const LucideIconsAny = LucideIcons as any;
const Server = LucideIconsAny.Server as React.ComponentType<{ className?: string; [key: string]: unknown }>;
const Cloud = LucideIconsAny.Cloud as React.ComponentType<{ className?: string; [key: string]: unknown }>;
const Building = LucideIconsAny.Building as React.ComponentType<{ className?: string; [key: string]: unknown }>;
const Edit3 = LucideIconsAny.Edit3 as React.ComponentType<{ className?: string; [key: string]: unknown }>;
const Trash2 = LucideIconsAny.Trash2 as React.ComponentType<{ className?: string; [key: string]: unknown }>;
const LinkIcon = LucideIconsAny.Link as React.ComponentType<{ className?: string; [key: string]: unknown }>;
const AlertTriangle = LucideIconsAny.AlertTriangle as React.ComponentType<{ className?: string; [key: string]: unknown }>;

// Icons that TypeScript recognizes
const { Database, Shield, FileText, Package } = LucideIcons;
import { CoreAsset } from '../types/asset';
import { 
  getCriticalityColor, 
  getStatusColor, 
  getRiskScoreColor,
  getDataClassificationColor,
  formatDate,
  formatDateTime 
} from '../utils/assetUtils';

interface AssetDetailModalProps {
  asset: CoreAsset | null;
  isOpen: boolean;
  onClose: () => void;
  onEdit?: (asset: CoreAsset) => void;
  onDelete?: (assetId: string) => void;
}

export const AssetDetailModal: React.FC<AssetDetailModalProps> = ({
  asset,
  isOpen,
  onClose,
  onEdit,
  onDelete,
}) => {
  if (!asset) return null;

  const getCategoryIcon = (category: string) => {
    switch (category?.toLowerCase()) {
      case 'hardware': return Server;
      case 'software': return Database;
      case 'data': return FileText;
      case 'services': return Cloud;
      case 'vendor': return Building;
      default: return Shield;
    }
  };

  const CategoryIcon = getCategoryIcon(asset.category);

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={asset.name}
      description={`${asset.type} • ${asset.category}`}
      size="xl"
    >
      <div className="space-y-6">
        {/* Header Actions */}
        <div className="flex items-center justify-end space-x-2 pb-4 border-b border-gray-200 dark:border-gray-700">
          {onEdit && (
            <Button
              variant="outline"
              size="sm"
              icon={Edit3 as any}
              onClick={() => {
                onEdit(asset);
                onClose();
              }}
            >
              Edit
            </Button>
          )}
          {onDelete && (
            <Button
              variant="destructive"
              size="sm"
              icon={Trash2 as any}
              onClick={() => {
                if (window.confirm(`Are you sure you want to delete "${asset.name}"?`)) {
                  onDelete(asset.id);
                  onClose();
                }
              }}
            >
              Delete
            </Button>
          )}
        </div>

        {/* Basic Information */}
        <Card className="p-6">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center">
            <CategoryIcon className="w-5 h-5 mr-2 text-blue-600 dark:text-blue-400" />
            Basic Information
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="text-sm font-medium text-gray-500 dark:text-gray-400">Name</label>
              <p className="text-gray-900 dark:text-white mt-1">{asset.name}</p>
            </div>
            <div>
              <label className="text-sm font-medium text-gray-500 dark:text-gray-400">Type</label>
              <p className="text-gray-900 dark:text-white mt-1">
                <Badge variant="outline">{asset.type}</Badge>
              </p>
            </div>
            <div>
              <label className="text-sm font-medium text-gray-500 dark:text-gray-400">Category</label>
              <p className="text-gray-900 dark:text-white mt-1 capitalize">{asset.category}</p>
            </div>
            <div>
              <label className="text-sm font-medium text-gray-500 dark:text-gray-400">Status</label>
              <p className="mt-1">
                <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(asset.status)}`}>
                  {asset.status}
                </span>
              </p>
            </div>
            <div className="md:col-span-2">
              <label className="text-sm font-medium text-gray-500 dark:text-gray-400">Description</label>
              <p className="text-gray-900 dark:text-white mt-1">{asset.description || 'No description provided'}</p>
            </div>
          </div>
        </Card>

        {/* Classification & Risk */}
        <Card className="p-6">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center">
            <Shield className="w-5 h-5 mr-2 text-blue-600 dark:text-blue-400" />
            Classification & Risk
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="text-sm font-medium text-gray-500 dark:text-gray-400">Criticality</label>
              <p className="mt-1">
                <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getCriticalityColor(asset.criticality)}`}>
                  {asset.criticality}
                </span>
              </p>
            </div>
            <div>
              <label className="text-sm font-medium text-gray-500 dark:text-gray-400">Risk Score</label>
              <p className="mt-1">
                <span className={`inline-flex items-center px-2.5 py-0.5 rounded text-sm font-medium ${getRiskScoreColor(asset.riskScore)}`}>
                  {asset.riskScore}/100
                </span>
              </p>
            </div>
            {asset.dataClassification && (
              <div>
                <label className="text-sm font-medium text-gray-500 dark:text-gray-400">Data Classification</label>
                <p className="mt-1">
                  <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getDataClassificationColor(asset.dataClassification)}`}>
                    {asset.dataClassification}
                  </span>
                </p>
              </div>
            )}
            {asset.businessValue && (
              <div>
                <label className="text-sm font-medium text-gray-500 dark:text-gray-400">Business Value</label>
                <p className="text-gray-900 dark:text-white mt-1 capitalize">{asset.businessValue}</p>
              </div>
            )}
          </div>
        </Card>

        {/* Ownership & Location */}
        <Card className="p-6">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center">
            <Building className="w-5 h-5 mr-2 text-blue-600 dark:text-blue-400" />
            Ownership & Location
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="text-sm font-medium text-gray-500 dark:text-gray-400">Owner</label>
              <p className="text-gray-900 dark:text-white mt-1">{asset.owner}</p>
            </div>
            {asset.custodian && (
              <div>
                <label className="text-sm font-medium text-gray-500 dark:text-gray-400">Custodian</label>
                <p className="text-gray-900 dark:text-white mt-1">{asset.custodian}</p>
              </div>
            )}
            <div>
              <label className="text-sm font-medium text-gray-500 dark:text-gray-400">Location</label>
              <p className="text-gray-900 dark:text-white mt-1">
                {typeof asset.location === 'string' ? asset.location : JSON.stringify(asset.location)}
              </p>
            </div>
            {asset.ipAddress && (
              <div>
                <label className="text-sm font-medium text-gray-500 dark:text-gray-400">IP Address</label>
                <p className="text-gray-900 dark:text-white mt-1">{asset.ipAddress}</p>
              </div>
            )}
          </div>
        </Card>

        {/* Compliance & Frameworks */}
        {asset.complianceFrameworks.length > 0 && (
          <Card className="p-6">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Compliance Frameworks</h3>
            <div className="flex flex-wrap gap-2">
              {asset.complianceFrameworks.map((framework, index) => (
                <Badge key={index} variant="outline">{framework}</Badge>
              ))}
            </div>
          </Card>
        )}

        {/* Product Extensions */}
        {(asset.technosoluce_data || asset.vendorsoluce_data || asset.cybercorrect_data) && (
          <Card className="p-6">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Product Extensions</h3>
            <div className="space-y-4">
              {asset.technosoluce_data && (
                <div className="border-l-4 border-blue-500 pl-4">
                  <h4 className="font-medium text-gray-900 dark:text-white mb-2 flex items-center">
                    <Package className="w-4 h-4 mr-2" />
                    TechnoSoluce Extension
                  </h4>
                  <div className="text-sm text-gray-600 dark:text-gray-400 space-y-1">
                    {asset.technosoluce_data.componentName && (
                      <p>Component: {asset.technosoluce_data.componentName} {asset.technosoluce_data.componentVersion}</p>
                    )}
                    {asset.technosoluce_data.vulnerabilityCount !== undefined && (
                      <p>Vulnerabilities: {asset.technosoluce_data.vulnerabilityCount} ({asset.technosoluce_data.criticalVulnerabilityCount || 0} critical)</p>
                    )}
                    {asset.technosoluce_data.componentRiskScore !== undefined && (
                      <p>Component Risk Score: {asset.technosoluce_data.componentRiskScore}/10</p>
                    )}
                  </div>
                </div>
              )}
              {asset.vendorsoluce_data && (
                <div className="border-l-4 border-green-500 pl-4">
                  <h4 className="font-medium text-gray-900 dark:text-white mb-2 flex items-center">
                    <Building className="w-4 h-4 mr-2" />
                    VendorSoluce Extension
                  </h4>
                  <div className="text-sm text-gray-600 dark:text-gray-400 space-y-1">
                    <p>Vendor: {asset.vendorsoluce_data.vendorName}</p>
                    {asset.vendorsoluce_data.riskAssessmentScore !== undefined && (
                      <p>Risk Assessment Score: {asset.vendorsoluce_data.riskAssessmentScore}/100</p>
                    )}
                    {asset.vendorsoluce_data.contractValue && (
                      <p>Contract Value: {asset.vendorsoluce_data.contractCurrency || '$'}{asset.vendorsoluce_data.contractValue.toLocaleString()}</p>
                    )}
                  </div>
                </div>
              )}
              {asset.cybercorrect_data && (
                <div className="border-l-4 border-purple-500 pl-4">
                  <h4 className="font-medium text-gray-900 dark:text-white mb-2 flex items-center">
                    <Shield className="w-4 h-4 mr-2" />
                    CyberCorrect Extension
                  </h4>
                  <div className="text-sm text-gray-600 dark:text-gray-400 space-y-1">
                    <p>Contains Personal Data: {asset.cybercorrect_data.containsPersonalData ? 'Yes' : 'No'}</p>
                    {asset.cybercorrect_data.gdprCompliant !== undefined && (
                      <p>GDPR Compliant: {asset.cybercorrect_data.gdprCompliant ? 'Yes' : 'No'}</p>
                    )}
                    {asset.cybercorrect_data.breachRiskScore !== undefined && (
                      <p>Breach Risk Score: {asset.cybercorrect_data.breachRiskScore}/100</p>
                    )}
                  </div>
                </div>
              )}
            </div>
          </Card>
        )}

        {/* Relationships */}
        {asset.relationships.length > 0 && (
          <Card className="p-6">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center">
              <LinkIcon className="w-5 h-5 mr-2 text-blue-600 dark:text-blue-400" />
              Relationships ({asset.relationships.length})
            </h3>
            <div className="space-y-2">
              {asset.relationships.slice(0, 5).map((rel) => (
                <div key={rel.id} className="flex items-center justify-between p-2 bg-gray-50 dark:bg-gray-700/50 rounded">
                  <span className="text-sm text-gray-900 dark:text-white">{rel.relatedAssetName}</span>
                  <Badge variant="outline" className="text-xs">{rel.relationshipType}</Badge>
                </div>
              ))}
              {asset.relationships.length > 5 && (
                <p className="text-sm text-gray-500 dark:text-gray-400">+{asset.relationships.length - 5} more relationships</p>
              )}
            </div>
          </Card>
        )}

        {/* Vulnerabilities */}
        {asset.vulnerabilities.length > 0 && (
          <Card className="p-6">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center">
              <AlertTriangle className="w-5 h-5 mr-2 text-red-600 dark:text-red-400" />
              Vulnerabilities ({asset.vulnerabilities.length})
            </h3>
            <div className="space-y-2">
              {asset.vulnerabilities.slice(0, 5).map((vuln) => (
                <div key={vuln.id} className="flex items-center justify-between p-2 bg-red-50 dark:bg-red-900/20 rounded">
                  <div>
                    <p className="text-sm font-medium text-gray-900 dark:text-white">{vuln.title}</p>
                    {vuln.cveId && (
                      <p className="text-xs text-gray-500 dark:text-gray-400">{vuln.cveId}</p>
                    )}
                  </div>
                  <Badge variant="outline" className={`text-xs ${getCriticalityColor(vuln.severity)}`}>
                    {vuln.severity}
                  </Badge>
                </div>
              ))}
              {asset.vulnerabilities.length > 5 && (
                <p className="text-sm text-gray-500 dark:text-gray-400">+{asset.vulnerabilities.length - 5} more vulnerabilities</p>
              )}
            </div>
          </Card>
        )}

        {/* Metadata */}
        <Card className="p-6">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Metadata</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
            <div>
              <label className="text-sm font-medium text-gray-500 dark:text-gray-400">Created</label>
              <p className="text-gray-900 dark:text-white mt-1">{formatDateTime(asset.createdAt)}</p>
            </div>
            <div>
              <label className="text-sm font-medium text-gray-500 dark:text-gray-400">Last Updated</label>
              <p className="text-gray-900 dark:text-white mt-1">{formatDateTime(asset.updatedAt)}</p>
            </div>
            {asset.lastAssessed && (
              <div>
                <label className="text-sm font-medium text-gray-500 dark:text-gray-400">Last Assessed</label>
                <p className="text-gray-900 dark:text-white mt-1">{formatDate(asset.lastAssessed)}</p>
              </div>
            )}
            {asset.nextReview && (
              <div>
                <label className="text-sm font-medium text-gray-500 dark:text-gray-400">Next Review</label>
                <p className="text-gray-900 dark:text-white mt-1">{formatDate(asset.nextReview)}</p>
              </div>
            )}
          </div>
          {asset.tags.length > 0 && (
            <div className="mt-4">
              <label className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-2 block">Tags</label>
              <div className="flex flex-wrap gap-2">
                {asset.tags.map((tag, index) => (
                  <Badge key={index} variant="outline" className="text-xs">#{tag}</Badge>
                ))}
              </div>
            </div>
          )}
        </Card>
      </div>
    </Modal>
  );
};

