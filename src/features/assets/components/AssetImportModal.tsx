// Asset Import Modal Component for CyberSoluce
// Handles importing assets from CSV or JSON files

import React, { useState } from 'react';
import { Modal } from '../../../components/ui/modal';
import { Card } from '../../../components/ui/card';
import { Button } from '../../../components/ui/button';
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore - Icons exist in lucide-react but TypeScript definitions may be outdated
import * as LucideIcons from 'lucide-react';
import { CoreAsset } from '../types/asset';

// Type-safe icon imports with fallbacks
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const LucideIconsAny = LucideIcons as any;
const Upload = (LucideIconsAny.Upload || LucideIconsAny.UploadCloud || LucideIconsAny.FileUp) as React.ComponentType<{ className?: string; [key: string]: unknown }>;
const AlertCircle = LucideIconsAny.AlertCircle as React.ComponentType<{ className?: string; [key: string]: unknown }>;
const Download = LucideIconsAny.Download as React.ComponentType<{ className?: string; [key: string]: unknown }>;

// Icons that TypeScript recognizes
const { FileText, CheckCircle } = LucideIcons;

interface AssetImportModalProps {
  isOpen: boolean;
  onClose: () => void;
  onImport: (assets: Omit<CoreAsset, 'id' | 'createdAt' | 'updatedAt'>[]) => Promise<void>;
}

interface ImportResult {
  success: number;
  failed: number;
  errors: string[];
}

export const AssetImportModal: React.FC<AssetImportModalProps> = ({
  isOpen,
  onClose,
  onImport,
}) => {
  const [file, setFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [importResult, setImportResult] = useState<ImportResult | null>(null);
  const [preview, setPreview] = useState<Omit<CoreAsset, 'id' | 'createdAt' | 'updatedAt'>[]>([]);

  const handleFileSelect = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (!selectedFile) return;

    setFile(selectedFile);
    setImportResult(null);
    setPreview([]);

    try {
      const text = await selectedFile.text();
      let parsed: any[] = [];

      if (selectedFile.name.endsWith('.json')) {
        parsed = JSON.parse(text);
        if (!Array.isArray(parsed)) {
          parsed = [parsed];
        }
      } else if (selectedFile.name.endsWith('.csv')) {
        parsed = parseCSV(text);
      } else {
        throw new Error('Unsupported file format. Please use CSV or JSON.');
      }

      // Convert to CoreAsset format
      const assets = parsed.map((item, index) => convertToAsset(item, index));
      setPreview(assets.slice(0, 5)); // Show preview of first 5
    } catch (error) {
      setImportResult({
        success: 0,
        failed: 0,
        errors: [`Failed to parse file: ${error instanceof Error ? error.message : 'Unknown error'}`],
      });
    }
  };

  const parseCSV = (csvText: string): any[] => {
    const lines = csvText.split('\n').filter(line => line.trim());
    if (lines.length < 2) return [];

    const headers = lines[0].split(',').map(h => h.trim().toLowerCase());
    const rows: any[] = [];

    for (let i = 1; i < lines.length; i++) {
      const values = lines[i].split(',').map(v => v.trim());
      const row: any = {};
      headers.forEach((header, index) => {
        row[header] = values[index] || '';
      });
      rows.push(row);
    }

    return rows;
  };

  const convertToAsset = (item: any, index: number): Omit<CoreAsset, 'id' | 'createdAt' | 'updatedAt'> => {
    return {
      organizationId: '',
      name: item.name || item.asset_name || `Imported Asset ${index + 1}`,
      description: item.description || item.desc || '',
      type: (item.type || item.asset_type || 'Server') as CoreAsset['type'],
      category: (item.category || 'hardware') as CoreAsset['category'],
      owner: item.owner || 'Unknown',
      custodian: item.custodian,
      location: item.location || '',
      ipAddress: item.ip_address || item.ipAddress,
      criticality: (item.criticality || item.criticality_level || 'Medium') as CoreAsset['criticality'],
      dataClassification: (item.data_classification || item.classification || 'Internal') as CoreAsset['dataClassification'],
      status: (item.status || 'Active') as CoreAsset['status'],
      riskScore: parseInt(item.risk_score || item.riskScore || '0') || 0,
      complianceFrameworks: item.compliance_frameworks 
        ? (Array.isArray(item.compliance_frameworks) ? item.compliance_frameworks : item.compliance_frameworks.split(','))
        : [],
      tags: item.tags 
        ? (Array.isArray(item.tags) ? item.tags : item.tags.split(',').map((t: string) => t.trim()))
        : [],
      relationships: [],
      vulnerabilities: [],
      dependencies: [],
    };
  };

  const handleImport = async () => {
    if (!file) return;

    setLoading(true);
    setImportResult(null);

    try {
      const text = await file.text();
      let parsed: any[] = [];

      if (file.name.endsWith('.json')) {
        parsed = JSON.parse(text);
        if (!Array.isArray(parsed)) {
          parsed = [parsed];
        }
      } else if (file.name.endsWith('.csv')) {
        parsed = parseCSV(text);
      }

      const assets = parsed.map((item, index) => convertToAsset(item, index));
      const errors: string[] = [];

      // Validate assets
      const validAssets = assets.filter((asset, index) => {
        if (!asset.name || asset.name.trim().length === 0) {
          errors.push(`Row ${index + 1}: Missing asset name`);
          return false;
        }
        if (!asset.owner || asset.owner.trim().length === 0) {
          errors.push(`Row ${index + 1}: Missing owner`);
          return false;
        }
        return true;
      });

      if (validAssets.length === 0) {
        setImportResult({
          success: 0,
          failed: assets.length,
          errors: errors.length > 0 ? errors : ['No valid assets found in file'],
        });
        setLoading(false);
        return;
      }

      await onImport(validAssets);

      setImportResult({
        success: validAssets.length,
        failed: assets.length - validAssets.length,
        errors: errors.slice(0, 10), // Show first 10 errors
      });

      // Reset after successful import
      setTimeout(() => {
        setFile(null);
        setPreview([]);
        setImportResult(null);
      }, 2000);
    } catch (error) {
      setImportResult({
        success: 0,
        failed: 0,
        errors: [`Import failed: ${error instanceof Error ? error.message : 'Unknown error'}`],
      });
    } finally {
      setLoading(false);
    }
  };

  const downloadTemplate = () => {
    const template = [
      {
        name: 'Web Server - Production',
        type: 'Server',
        category: 'hardware',
        owner: 'IT Operations',
        location: 'AWS US-East-1',
        criticality: 'Critical',
        data_classification: 'Internal',
        status: 'Active',
        risk_score: 75,
        compliance_frameworks: 'NIST CSF,ISO 27001',
        tags: 'production,web,aws',
      },
      {
        name: 'Customer Database',
        type: 'Database',
        category: 'data',
        owner: 'DBA Team',
        location: 'Azure West Europe',
        criticality: 'Critical',
        data_classification: 'Restricted',
        status: 'Active',
        risk_score: 85,
        compliance_frameworks: 'GDPR,HIPAA',
        tags: 'database,customer-data,restricted',
      },
    ];

    const csv = [
      'name,type,category,owner,location,criticality,data_classification,status,risk_score,compliance_frameworks,tags',
      ...template.map(item => 
        Object.values(item).map(val => `"${val}"`).join(',')
      ),
    ].join('\n');

    const blob = new Blob([csv], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'asset-import-template.csv';
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Import Assets"
      description="Import assets from CSV or JSON file"
      size="lg"
    >
      <div className="space-y-6">
        {/* Instructions */}
        <Card className="p-4 bg-blue-50 dark:bg-blue-900/20 border-blue-200 dark:border-blue-800">
          <div className="flex items-start space-x-3">
            <FileText className="w-5 h-5 text-blue-600 dark:text-blue-400 mt-0.5" />
            <div className="flex-1">
              <h4 className="text-sm font-medium text-blue-900 dark:text-blue-200 mb-1">
                Import Instructions
              </h4>
              <ul className="text-sm text-blue-800 dark:text-blue-300 space-y-1 list-disc list-inside">
                <li>Supported formats: CSV or JSON</li>
                <li>Required fields: name, owner</li>
                <li>Optional fields: type, category, location, criticality, status, risk_score, tags</li>
                <li>Download template CSV for reference</li>
              </ul>
            </div>
          </div>
        </Card>

        {/* File Upload */}
        <Card className="p-4">
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Select File
              </label>
              <div className="flex items-center space-x-3">
                <label className="flex-1 cursor-pointer">
                  <div className="flex items-center justify-center px-6 py-4 border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg hover:border-blue-500 dark:hover:border-blue-400 transition-colors">
                    <div className="text-center">
                      <Upload className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        {file ? file.name : 'Click to upload or drag and drop'}
                      </p>
                      <p className="text-xs text-gray-500 dark:text-gray-500 mt-1">
                        CSV or JSON (max 10MB)
                      </p>
                    </div>
                  </div>
                  <input
                    type="file"
                    accept=".csv,.json"
                    onChange={handleFileSelect}
                    className="hidden"
                  />
                </label>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <Button
                variant="outline"
                size="sm"
                icon={Download}
                onClick={downloadTemplate}
              >
                Download Template
              </Button>
            </div>
          </div>
        </Card>

        {/* Preview */}
        {preview.length > 0 && (
          <Card className="p-4">
            <h4 className="text-sm font-medium text-gray-900 dark:text-white mb-3">
              Preview (showing first {preview.length} assets)
            </h4>
            <div className="space-y-2 max-h-64 overflow-y-auto">
              {preview.map((asset, index) => (
                <div
                  key={index}
                  className="p-3 bg-gray-50 dark:bg-gray-700/50 rounded border border-gray-200 dark:border-gray-600"
                >
                  <p className="text-sm font-medium text-gray-900 dark:text-white">
                    {asset.name}
                  </p>
                  <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                    {asset.type} • {asset.category} • Owner: {asset.owner}
                  </p>
                </div>
              ))}
            </div>
          </Card>
        )}

        {/* Import Result */}
        {importResult && (
          <Card className={`p-4 ${
            importResult.success > 0 
              ? 'bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-800'
              : 'bg-red-50 dark:bg-red-900/20 border-red-200 dark:border-red-800'
          }`}>
            <div className="flex items-start space-x-3">
              {importResult.success > 0 ? (
                <CheckCircle className="w-5 h-5 text-green-600 dark:text-green-400 mt-0.5" />
              ) : (
                <AlertCircle className="w-5 h-5 text-red-600 dark:text-red-400 mt-0.5" />
              )}
              <div className="flex-1">
                <h4 className={`text-sm font-medium mb-2 ${
                  importResult.success > 0
                    ? 'text-green-900 dark:text-green-200'
                    : 'text-red-900 dark:text-red-200'
                }`}>
                  Import {importResult.success > 0 ? 'Successful' : 'Failed'}
                </h4>
                <p className={`text-sm mb-2 ${
                  importResult.success > 0
                    ? 'text-green-800 dark:text-green-300'
                    : 'text-red-800 dark:text-red-300'
                }`}>
                  Successfully imported {importResult.success} asset(s)
                  {importResult.failed > 0 && `, ${importResult.failed} failed`}
                </p>
                {importResult.errors.length > 0 && (
                  <div className="mt-2 space-y-1">
                    {importResult.errors.map((error, index) => (
                      <p key={index} className="text-xs text-red-700 dark:text-red-400">
                        {error}
                      </p>
                    ))}
                    {importResult.errors.length >= 10 && (
                      <p className="text-xs text-red-700 dark:text-red-400 italic">
                        ... and more errors
                      </p>
                    )}
                  </div>
                )}
              </div>
            </div>
          </Card>
        )}

        {/* Actions */}
        <div className="flex items-center justify-end space-x-3 pt-4 border-t border-gray-200 dark:border-gray-700">
          <Button
            variant="outline"
            onClick={onClose}
            disabled={loading}
          >
            Cancel
          </Button>
          <Button
            onClick={handleImport}
            loading={loading}
            disabled={!file || preview.length === 0}
            icon={Upload}
          >
            Import Assets
          </Button>
        </div>
      </div>
    </Modal>
  );
};

