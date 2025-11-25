import React, { useState } from 'react';
import { Upload, Download, FileText, AlertTriangle, CheckCircle } from 'lucide-react';
import { Button } from '../ui/button';
import { Modal } from '../ui/modal';
import { importFromCSV, importFromJSON, ImportResult, ImportOptions } from '../../utils/dataImport';

interface ImportButtonProps {
  onImport: (data: any[]) => void;
  templateData?: any[];
  templateFilename?: string;
  acceptedTypes?: '.csv' | '.json' | '.csv,.json';
  importOptions?: ImportOptions;
  buttonText?: string;
  buttonVariant?: 'default' | 'outline' | 'ghost';
  buttonSize?: 'sm' | 'md' | 'lg';
  className?: string;
  disabled?: boolean;
}

const ImportButton: React.FC<ImportButtonProps> = ({
  onImport,
  templateData = [],
  templateFilename = 'import-template',
  acceptedTypes = '.csv,.json',
  importOptions = {},
  buttonText = 'Import',
  buttonVariant = 'outline',
  buttonSize = 'sm',
  className = '',
  disabled = false
}) => {
  const [modalOpen, setModalOpen] = useState(false);
  const [file, setFile] = useState<File | null>(null);
  const [importResult, setImportResult] = useState<ImportResult | null>(null);
  const [importing, setImporting] = useState(false);

  const downloadTemplate = () => {
    if (templateData.length === 0) return;

    const isCSV = acceptedTypes.includes('.csv');
    const filename = `${templateFilename}.${isCSV ? 'csv' : 'json'}`;

    if (isCSV) {
      // Generate CSV template
      const headers = Object.keys(templateData[0]).join(',');
      const rows = templateData.map(row => 
        Object.values(row).map(value => {
          const stringValue = value?.toString() || '';
          return stringValue.includes(',') ? `"${stringValue}"` : stringValue;
        }).join(',')
      );
      const csvContent = [headers, ...rows].join('\n');
      
      const blob = new Blob([csvContent], { type: 'text/csv' });
      downloadFile(blob, filename);
    } else {
      // Generate JSON template
      const jsonContent = JSON.stringify(templateData, null, 2);
      const blob = new Blob([jsonContent], { type: 'application/json' });
      downloadFile(blob, filename);
    }
  };

  const downloadFile = (blob: Blob, filename: string) => {
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  const handleFileSelect = (selectedFile: File) => {
    setFile(selectedFile);
    setImportResult(null);
  };

  const handleImport = async () => {
    if (!file) return;

    setImporting(true);
    setImportResult(null);

    try {
      let result: ImportResult;
      
      if (file.name.endsWith('.csv')) {
        result = await importFromCSV(file, importOptions);
      } else if (file.name.endsWith('.json')) {
        result = await importFromJSON(file, importOptions);
      } else {
        result = {
          success: false,
          errors: ['Unsupported file type. Please use CSV or JSON files.']
        };
      }

      setImportResult(result);
      
      if (result.success && result.data) {
        onImport(result.data);
        setModalOpen(false);
        setFile(null);
      }
    } catch (error) {
      setImportResult({
        success: false,
        errors: [`Import failed: ${error instanceof Error ? error.message : 'Unknown error'}`]
      });
    } finally {
      setImporting(false);
    }
  };

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    const droppedFiles = Array.from(e.dataTransfer.files);
    const validFile = droppedFiles.find(f => 
      acceptedTypes.split(',').some(type => f.name.endsWith(type.trim()))
    );
    
    if (validFile) {
      handleFileSelect(validFile);
    }
  };

  return (
    <>
      <Button
        variant={buttonVariant}
        size={buttonSize}
        onClick={() => setModalOpen(true)}
        disabled={disabled}
        className={className}
      >
        <Upload className="h-4 w-4 mr-2" />
        {buttonText}
      </Button>

      <Modal
        isOpen={modalOpen}
        onClose={() => {
          setModalOpen(false);
          setFile(null);
          setImportResult(null);
        }}
        title="Import Data"
        size="md"
      >
        <div className="space-y-4">
          <div>
            <h4 className="text-sm font-medium text-gray-900 dark:text-white mb-2">
              Import Data from File
            </h4>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Upload a {acceptedTypes.replace(',', ' or ')} file with your data.
            </p>
          </div>

          {templateData.length > 0 && (
            <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-blue-800 dark:text-blue-200">
                    Need help with the format?
                  </p>
                  <p className="text-xs text-blue-600 dark:text-blue-300">
                    Download our template to see the expected format
                  </p>
                </div>
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={downloadTemplate}
                >
                  <Download className="h-4 w-4 mr-2" />
                  Template
                </Button>
              </div>
            </div>
          )}

          <div
            className="border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg p-8 text-center hover:border-blue-400 transition-colors"
            onDragEnter={handleDrag}
            onDragLeave={handleDrag}
            onDragOver={handleDrag}
            onDrop={handleDrop}
          >
            {file ? (
              <div>
                <FileText className="h-12 w-12 text-green-600 mx-auto mb-4" />
                <p className="text-sm font-medium text-gray-900 dark:text-white">
                  {file.name}
                </p>
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  {(file.size / 1024).toFixed(1)} KB
                </p>
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={() => {
                    setFile(null);
                    setImportResult(null);
                  }}
                  className="mt-2"
                >
                  Remove
                </Button>
              </div>
            ) : (
              <div>
                <Upload className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                  Drag and drop your file here, or
                </p>
                <label className="cursor-pointer">
                  <span className="text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 font-medium">
                    browse to upload
                  </span>
                  <input
                    type="file"
                    accept={acceptedTypes}
                    onChange={(e) => {
                      const selectedFile = e.target.files?.[0];
                      if (selectedFile) handleFileSelect(selectedFile);
                    }}
                    className="hidden"
                  />
                </label>
              </div>
            )}
          </div>

          {importResult && (
            <div className={`p-4 rounded-lg ${
              importResult.success 
                ? 'bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800'
                : 'bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800'
            }`}>
              <div className="flex items-start">
                {importResult.success ? (
                  <CheckCircle className="h-5 w-5 text-green-600 dark:text-green-400 mt-0.5 mr-3" />
                ) : (
                  <AlertTriangle className="h-5 w-5 text-red-600 dark:text-red-400 mt-0.5 mr-3" />
                )}
                <div>
                  <h5 className={`font-medium ${
                    importResult.success 
                      ? 'text-green-800 dark:text-green-200' 
                      : 'text-red-800 dark:text-red-200'
                  }`}>
                    {importResult.success ? 'Import Successful' : 'Import Failed'}
                  </h5>
                  <p className={`text-sm ${
                    importResult.success 
                      ? 'text-green-700 dark:text-green-300' 
                      : 'text-red-700 dark:text-red-300'
                  }`}>
                    {importResult.message}
                  </p>
                  {importResult.errors && importResult.errors.length > 0 && (
                    <ul className="mt-2 text-sm text-red-700 dark:text-red-300 space-y-1">
                      {importResult.errors.map((error, index) => (
                        <li key={index}>• {error}</li>
                      ))}
                    </ul>
                  )}
                </div>
              </div>
            </div>
          )}

          <div className="flex justify-end space-x-3 pt-4">
            <Button
              variant="outline"
              onClick={() => {
                setModalOpen(false);
                setFile(null);
                setImportResult(null);
              }}
            >
              Cancel
            </Button>
            <Button
              onClick={handleImport}
              disabled={!file || importing}
              loading={importing}
            >
              {importing ? 'Importing...' : 'Import Data'}
            </Button>
          </div>
        </div>
      </Modal>
    </>
  );
};

export default ImportButton;