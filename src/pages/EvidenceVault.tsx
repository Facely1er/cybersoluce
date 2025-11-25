import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import {
  FileText,
  Upload,
  Search,
  Filter,
  Download,
  Check,
  X,
  Eye,
  Shield,
  Clock,
  AlertTriangle,
  CheckCircle,
  Database,
  Plus,
  Hash,
  Calendar,
  User,
  Tag
} from 'lucide-react';
import { EvidenceItem, EvidenceValidation } from '../types/orchestration';
import { orchestrationService } from '../services/orchestrationService';
import PageHeader from '../components/common/PageHeader';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Select } from '../components/ui/select';
import EnhancedTable from '../components/tables/EnhancedTable';
import StatusBadge from '../components/ui/StatusBadge';
import { Modal } from '../components/ui/modal';
import { useNotify } from '../components/notifications/NotificationSystem';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '../components/ui/tabs';

const EvidenceVault: React.FC = () => {
  const [evidence, setEvidence] = useState<EvidenceItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [uploadModalOpen, setUploadModalOpen] = useState(false);
  const [validationModalOpen, setValidationModalOpen] = useState(false);
  const [selectedEvidence, setSelectedEvidence] = useState<EvidenceItem | null>(null);
  const [activeTab, setActiveTab] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [filters, setFilters] = useState({
    framework: 'all',
    evidenceType: 'all',
    validationStatus: 'all'
  });

  const notify = useNotify();

  const handleExportEvidence = () => {
    try {
      const exportData = filteredEvidence.map(item => ({
        'Control ID': item.controlId,
        'Framework': item.framework,
        'Title': item.title,
        'Type': item.evidenceType,
        'Validation Status': item.validationStatus,
        'Collection Date': item.collectionDate.toLocaleDateString(),
        'Expires At': item.expiresAt?.toLocaleDateString() || 'N/A',
        'Collected By': item.collectedBy,
        'Tags': item.tags.join(', '),
        'Business Unit': item.metadata?.businessUnit || 'N/A'
      }));

      const headers = Object.keys(exportData[0] || {}).join(',');
      const rows = exportData.map(row => 
        Object.values(row).map(value => {
          const stringValue = value?.toString() || '';
          if (stringValue.includes(',') || stringValue.includes('"')) {
            return `"${stringValue.replace(/"/g, '""')}"`;
          }
          return stringValue;
        }).join(',')
      );
      
      const csvContent = [headers, ...rows].join('\n');
      
      const blob = new Blob([csvContent], { type: 'text/csv' });
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `evidence-export-${new Date().toISOString().split('T')[0]}.csv`;
      link.style.display = 'none';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
      
      notify.success('Evidence exported successfully');
    } catch (error) {
      console.error('Export failed:', error);
      notify.error('Export failed');
    }
  };

  useEffect(() => {
    loadEvidence();
  }, [filters]);

  const loadEvidence = async () => {
    try {
      setLoading(true);
      const filterParams = Object.fromEntries(
        Object.entries(filters).filter(([_, value]) => value !== 'all')
      );
      
      // Try to fetch from API, fallback to mock data if backend is unavailable
      let evidenceData;
      try {
        evidenceData = await orchestrationService.getEvidence(filterParams);
        setEvidence(evidenceData.results);
      } catch (apiError) {
        // Backend unavailable - use mock data for demonstration
        console.warn('Backend API unavailable, using mock data:', apiError);
        const mockEvidence: EvidenceItem[] = [
          {
            id: 'evidence-1',
            controlId: 'AC-3.13',
            framework: 'NIST 800-171r3',
            evidenceType: 'screenshot',
            title: 'MFA Configuration Screenshots',
            description: 'Screenshots showing successful MFA implementation for privileged accounts',
            filePath: '/evidence/mfa_screenshots.zip',
            fileHash: 'e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855',
            collectedBy: 'manual',
            collectionDate: new Date('2024-02-15'),
            validityPeriod: 365,
            expiresAt: new Date('2025-02-15'),
            validationStatus: 'valid',
            retentionPolicy: 'compliance_default_7_years',
            tags: ['mfa', 'authentication', 'privileged-access'],
            metadata: {
              controlsAddressed: ['AC-3.13'],
              systemsInvolved: ['Active Directory', 'RSA SecurID'],
              businessUnit: 'IT Security'
            },
            validations: [
              {
                id: 'validation-1',
                validatorId: 'user-234',
                validationDate: new Date('2024-02-16'),
                status: 'approved',
                comments: 'Screenshots clearly show MFA enabled for all privileged accounts',
                validationCriteria: [
                  {
                    criterion: 'MFA enabled for all privileged accounts',
                    status: 'pass',
                    notes: 'All 15 privileged accounts show MFA enabled'
                  }
                ],
                complianceScore: 95
              }
            ],
            chainOfCustody: [
              {
                action: 'created',
                userId: 'user-789',
                timestamp: new Date('2024-02-15'),
                ipAddress: '192.168.1.100'
              }
            ]
          },
          {
            id: 'evidence-2',
            controlId: 'SC-7.1',
            framework: 'NIST 800-171r3',
            evidenceType: 'configuration',
            title: 'Firewall Configuration Export',
            description: 'Network boundary protection firewall configuration file',
            filePath: '/evidence/firewall_config.txt',
            fileHash: 'a1b2c3d4e5f6789012345678901234567890123456789012345678901234567890',
            collectedBy: 'automated',
            collectionDate: new Date('2024-02-20'),
            validityPeriod: 90,
            expiresAt: new Date('2024-05-20'),
            validationStatus: 'pending',
            retentionPolicy: 'compliance_default_7_years',
            tags: ['firewall', 'network', 'boundary-protection'],
            metadata: {
              controlsAddressed: ['SC-7.1'],
              systemsInvolved: ['Palo Alto Firewall'],
              businessUnit: 'Network Security'
            },
            validations: [],
            chainOfCustody: [
              {
                action: 'auto_collected',
                userId: 'system',
                timestamp: new Date('2024-02-20'),
                notes: 'Automated collection via API'
              }
            ]
          },
          {
            id: 'evidence-3',
            controlId: 'AU-12.1',
            framework: 'NIST 800-171r3',
            evidenceType: 'report',
            title: 'Audit Log Analysis Report',
            description: 'Comprehensive audit log analysis for Q1 2024',
            filePath: '/evidence/audit_report_q1_2024.pdf',
            fileHash: 'f1e2d3c4b5a6978123456789012345678901234567890123456789012345678901',
            collectedBy: 'automated',
            collectionDate: new Date('2024-02-25'),
            validityPeriod: 180,
            expiresAt: new Date('2024-08-25'),
            validationStatus: 'expired',
            retentionPolicy: 'compliance_default_7_years',
            tags: ['audit', 'logging', 'analysis'],
            metadata: {
              controlsAddressed: ['AU-12.1', 'AU-6.1'],
              systemsInvolved: ['SIEM', 'Log Management'],
              businessUnit: 'Security Operations'
            },
            validations: [
              {
                id: 'validation-2',
                validatorId: 'user-345',
                validationDate: new Date('2024-02-26'),
                status: 'approved',
                comments: 'Comprehensive audit log analysis meets requirements',
                validationCriteria: [
                  {
                    criterion: 'Log completeness verification',
                    status: 'pass',
                    notes: '99.7% log completeness achieved'
                  }
                ],
                complianceScore: 88
              }
            ],
            chainOfCustody: [
              {
                action: 'auto_collected',
                userId: 'system',
                timestamp: new Date('2024-02-25'),
                notes: 'Automated quarterly report generation'
              }
            ]
          }
        ];
        setEvidence(mockEvidence);
        // Show info message instead of error when using mock data
        notify.info('Demo Mode', 'Using sample data - connect to backend for live data');
      }
    } catch (error) {
      // This should only catch unexpected errors now
      console.error('Unexpected error loading evidence:', error);
      notify.error('Application Error', 'An unexpected error occurred. Please refresh the page.');
    } finally {
      setLoading(false);
    }
  };

  const handleUploadEvidence = async (formData: FormData) => {
    try {
      const newEvidence = await orchestrationService.uploadEvidence(formData);
      setEvidence(prev => [newEvidence, ...prev]);
      setUploadModalOpen(false);
      notify.success('Evidence uploaded successfully');
    } catch (error) {
      console.error('Failed to upload evidence:', error);
      notify.error('Failed to upload evidence');
    }
  };

  const handleValidateEvidence = async (evidenceId: string, validationData: any) => {
    try {
      await orchestrationService.validateEvidence(evidenceId, validationData);
      await loadEvidence(); // Refresh data
      setValidationModalOpen(false);
      setSelectedEvidence(null);
      notify.success('Evidence validated successfully');
    } catch (error) {
      console.error('Failed to validate evidence:', error);
      notify.error('Failed to validate evidence');
    }
  };

  const getValidationStatusColor = (status: string) => {
    switch (status) {
      case 'valid': return 'text-green-600 bg-green-100 dark:bg-green-900/30';
      case 'invalid': return 'text-red-600 bg-red-100 dark:bg-red-900/30';
      case 'expired': return 'text-gray-600 bg-gray-100 dark:bg-gray-700';
      default: return 'text-yellow-600 bg-yellow-100 dark:bg-yellow-900/30';
    }
  };

  const getEvidenceTypeIcon = (type: string) => {
    switch (type) {
      case 'document': return FileText;
      case 'screenshot': return Eye;
      case 'report': return Database;
      case 'configuration': return Shield;
      default: return FileText;
    }
  };

  const filteredEvidence = evidence.filter(item => {
    if (activeTab !== 'all') {
      switch (activeTab) {
        case 'pending':
          return item.validationStatus === 'pending';
        case 'expired':
          return item.validationStatus === 'expired' || 
                 (item.expiresAt && item.expiresAt < new Date());
        case 'expiring':
          const thirtyDaysFromNow = new Date(Date.now() + 30 * 24 * 60 * 60 * 1000);
          return item.expiresAt && item.expiresAt < thirtyDaysFromNow && item.expiresAt > new Date();
      }
    }
    
    if (searchQuery) {
      return item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
             item.controlId.toLowerCase().includes(searchQuery.toLowerCase()) ||
             item.framework.toLowerCase().includes(searchQuery.toLowerCase());
    }
    
    return true;
  });

  const columns = [
    {
      key: 'title' as keyof EvidenceItem,
      header: 'Evidence',
      sortable: true,
      render: (value: any, evidence: EvidenceItem) => {
        const Icon = getEvidenceTypeIcon(evidence.evidenceType);
        return (
          <div className="flex items-start space-x-3">
            <Icon className="h-5 w-5 text-blue-600 dark:text-blue-400 mt-1" />
            <div className="min-w-0 flex-1">
              <p className="text-sm font-medium text-gray-900 dark:text-white">
                {evidence.title}
              </p>
              <div className="flex items-center space-x-2 mt-1">
                <span className="text-xs text-gray-500 dark:text-gray-400">
                  {evidence.controlId}
                </span>
                <span className="text-xs text-gray-400">•</span>
                <span className="text-xs text-gray-500 dark:text-gray-400">
                  {evidence.framework}
                </span>
              </div>
              <div className="flex flex-wrap gap-1 mt-2">
                {evidence.tags.slice(0, 3).map(tag => (
                  <span key={tag} className="inline-flex items-center px-2 py-0.5 rounded-full text-xs bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300">
                    <Tag className="h-3 w-3 mr-1" />
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </div>
        );
      }
    },
    {
      key: 'validationStatus' as keyof EvidenceItem,
      header: 'Status',
      sortable: true,
      render: (value: string) => (
        <StatusBadge status={value} size="sm" />
      )
    },
    {
      key: 'collectedBy' as keyof EvidenceItem,
      header: 'Collection',
      render: (value: string, evidence: EvidenceItem) => (
        <div className="text-sm">
          <div className={`inline-flex items-center px-2 py-1 rounded-full text-xs ${
            value === 'automated' 
              ? 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300'
              : 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300'
          }`}>
            {value === 'automated' ? '🤖' : '👤'} {value}
          </div>
          <div className="text-xs text-gray-500 dark:text-gray-400 mt-1">
            {evidence.collectionDate.toLocaleDateString()}
          </div>
        </div>
      )
    },
    {
      key: 'expiresAt' as keyof EvidenceItem,
      header: 'Expires',
      sortable: true,
      render: (value: Date | undefined) => {
        if (!value) return <span className="text-gray-500">—</span>;
        
        const now = new Date();
        const isExpired = value < now;
        const daysUntilExpiry = Math.ceil((value.getTime() - now.getTime()) / (1000 * 60 * 60 * 24));
        
        return (
          <div className="text-sm">
            <div className={`${
              isExpired ? 'text-red-600 dark:text-red-400' :
              daysUntilExpiry <= 30 ? 'text-yellow-600 dark:text-yellow-400' :
              'text-gray-900 dark:text-white'
            }`}>
              {value.toLocaleDateString()}
            </div>
            {isExpired ? (
              <div className="text-xs text-red-500">Expired</div>
            ) : daysUntilExpiry <= 30 ? (
              <div className="text-xs text-yellow-600">Expires soon</div>
            ) : null}
          </div>
        );
      }
    },
    {
      key: 'validations' as keyof EvidenceItem,
      header: 'Validation Score',
      render: (validations: EvidenceValidation[]) => {
        const latestValidation = validations[validations.length - 1];
        if (!latestValidation?.complianceScore) {
          return <span className="text-gray-500">—</span>;
        }
        
        return (
          <div className="text-sm">
            <div className="font-medium text-gray-900 dark:text-white">
              {latestValidation.complianceScore}%
            </div>
            <div className="text-xs text-gray-500 dark:text-gray-400">
              {latestValidation.status}
            </div>
          </div>
        );
      }
    }
  ];

  const evidenceTypeOptions = [
    { value: 'all', label: 'All Types' },
    { value: 'document', label: 'Documents' },
    { value: 'screenshot', label: 'Screenshots' },
    { value: 'report', label: 'Reports' },
    { value: 'log', label: 'Log Files' },
    { value: 'configuration', label: 'Configurations' }
  ];

  const frameworkOptions = [
    { value: 'all', label: 'All Frameworks' },
    { value: 'NIST 800-171r3', label: 'NIST 800-171r3' },
    { value: 'ISO 27001', label: 'ISO 27001' },
    { value: 'NIST CSF 2.0', label: 'NIST CSF 2.0' },
    { value: 'CMMC 2.0', label: 'CMMC 2.0' }
  ];

  const statusOptions = [
    { value: 'all', label: 'All Status' },
    { value: 'pending', label: 'Pending Validation' },
    { value: 'valid', label: 'Valid' },
    { value: 'invalid', label: 'Invalid' },
    { value: 'expired', label: 'Expired' }
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
      <PageHeader
        title="Evidence Vault"
        subtitle="Secure repository for compliance evidence and documentation"
        icon={Database}
        actions={
          <div className="flex items-center space-x-3">
            <Button variant="outline" size="sm">
              <Download className="h-4 w-4 mr-2" onClick={handleExportEvidence} />
              Export Evidence
            </Button>
            <Button onClick={() => setUploadModalOpen(true)}>
              <Upload className="h-4 w-4 mr-2" />
              Upload Evidence
            </Button>
          </div>
        }
      />

      {/* Evidence Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {[
          {
            title: 'Total Evidence',
            value: evidence.length,
            icon: FileText,
            color: 'blue'
          },
          {
            title: 'Pending Validation',
            value: evidence.filter(e => e.validationStatus === 'pending').length,
            icon: Clock,
            color: 'orange'
          },
          {
            title: 'Valid Evidence',
            value: evidence.filter(e => e.validationStatus === 'valid').length,
            icon: CheckCircle,
            color: 'green'
          },
          {
            title: 'Expiring Soon',
            value: evidence.filter(e => {
              if (!e.expiresAt) return false;
              const thirtyDaysFromNow = new Date(Date.now() + 30 * 24 * 60 * 60 * 1000);
              return e.expiresAt < thirtyDaysFromNow && e.expiresAt > new Date();
            }).length,
            icon: AlertTriangle,
            color: 'red'
          }
        ].map((stat, index) => (
          <motion.div
            key={stat.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
                  {stat.title}
                </p>
                <p className="text-3xl font-bold text-gray-900 dark:text-white">
                  {stat.value}
                </p>
              </div>
              <div className={`p-3 rounded-full ${
                stat.color === 'blue' ? 'bg-blue-100 dark:bg-blue-900/30' :
                stat.color === 'orange' ? 'bg-orange-100 dark:bg-orange-900/30' :
                stat.color === 'green' ? 'bg-green-100 dark:bg-green-900/30' :
                'bg-red-100 dark:bg-red-900/30'
              }`}>
                <stat.icon className={`h-8 w-8 ${
                  stat.color === 'blue' ? 'text-blue-600 dark:text-blue-400' :
                  stat.color === 'orange' ? 'text-orange-600 dark:text-orange-400' :
                  stat.color === 'green' ? 'text-green-600 dark:text-green-400' :
                  'text-red-600 dark:text-red-400'
                }`} />
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Evidence Tabs and Filters */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-6">
            <TabsList className="mb-4 lg:mb-0">
              <TabsTrigger value="all">All Evidence</TabsTrigger>
              <TabsTrigger value="pending">Pending Validation</TabsTrigger>
              <TabsTrigger value="expiring">Expiring Soon</TabsTrigger>
              <TabsTrigger value="expired">Expired</TabsTrigger>
            </TabsList>
            
            <div className="flex flex-col sm:flex-row gap-3">
              <Input
                placeholder="Search evidence..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full sm:w-64"
              />
              <Select
                value={filters.framework}
                onChange={(e) => setFilters({...filters, framework: e.target.value})}
                options={frameworkOptions}
                className="w-full sm:w-40"
              />
              <Select
                value={filters.evidenceType}
                onChange={(e) => setFilters({...filters, evidenceType: e.target.value})}
                options={evidenceTypeOptions}
                className="w-full sm:w-40"
              />
            </div>
          </div>

          <TabsContent value={activeTab}>
            <EnhancedTable
              data={filteredEvidence}
              columns={columns}
              loading={loading}
              pagination
              pageSize={15}
              onRowClick={(evidence) => {
                setSelectedEvidence(evidence);
                setValidationModalOpen(true);
              }}
              emptyState={{
                title: 'No evidence found',
                description: 'Upload your first evidence item to get started',
                action: {
                  label: 'Upload Evidence',
                  onClick: () => setUploadModalOpen(true)
                }
              }}
              className="mt-4"
            />
          </TabsContent>
        </Tabs>
      </div>

      {/* Upload Evidence Modal */}
      <Modal
        isOpen={uploadModalOpen}
        onClose={() => setUploadModalOpen(false)}
        title="Upload Evidence"
        size="lg"
      >
        <EvidenceUploadForm 
          onSubmit={handleUploadEvidence}
          onCancel={() => setUploadModalOpen(false)}
        />
      </Modal>

      {/* Evidence Validation Modal */}
      <Modal
        isOpen={validationModalOpen}
        onClose={() => {
          setValidationModalOpen(false);
          setSelectedEvidence(null);
        }}
        title="Evidence Validation"
        size="lg"
      >
        {selectedEvidence && (
          <EvidenceValidationForm
            evidence={selectedEvidence}
            onSubmit={(validationData) => handleValidateEvidence(selectedEvidence.id, validationData)}
            onCancel={() => {
              setValidationModalOpen(false);
              setSelectedEvidence(null);
            }}
          />
        )}
      </Modal>
    </div>
  );
};

// Evidence Upload Form Component
const EvidenceUploadForm: React.FC<{
  onSubmit: (formData: FormData) => void;
  onCancel: () => void;
}> = ({ onSubmit, onCancel }) => {
  const [formData, setFormData] = useState({
    controlId: '',
    framework: '',
    evidenceType: 'document',
    title: '',
    description: '',
    validityPeriod: 365,
    tags: ''
  });
  const [file, setFile] = useState<File | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!file) {
      alert('Please select a file to upload');
      return;
    }

    const formDataToSend = new FormData();
    Object.entries(formData).forEach(([key, value]) => {
      formDataToSend.append(key, value.toString());
    });
    formDataToSend.append('file', file);
    formDataToSend.append('tags', formData.tags.split(',').map(t => t.trim()).join(','));

    onSubmit(formDataToSend);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Input
          label="Control ID"
          value={formData.controlId}
          onChange={(e) => setFormData({...formData, controlId: e.target.value})}
          placeholder="e.g., AC-3.13"
          required
        />
        
        <Select
          label="Framework"
          value={formData.framework}
          onChange={(e) => setFormData({...formData, framework: e.target.value})}
          options={[
            { value: '', label: 'Select Framework' },
            { value: 'NIST 800-171r3', label: 'NIST 800-171r3' },
            { value: 'ISO 27001', label: 'ISO 27001' },
            { value: 'NIST CSF 2.0', label: 'NIST CSF 2.0' },
            { value: 'CMMC 2.0', label: 'CMMC 2.0' }
          ]}
          required
        />
      </div>

      <Select
        label="Evidence Type"
        value={formData.evidenceType}
        onChange={(e) => setFormData({...formData, evidenceType: e.target.value})}
        options={[
          { value: 'document', label: 'Document' },
          { value: 'screenshot', label: 'Screenshot' },
          { value: 'report', label: 'Report' },
          { value: 'log', label: 'Log File' },
          { value: 'configuration', label: 'Configuration' }
        ]}
        required
      />

      <Input
        label="Title"
        value={formData.title}
        onChange={(e) => setFormData({...formData, title: e.target.value})}
        placeholder="Descriptive title for the evidence"
        required
      />

      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
          Description
        </label>
        <textarea
          value={formData.description}
          onChange={(e) => setFormData({...formData, description: e.target.value})}
          placeholder="Detailed description of the evidence"
          rows={3}
          className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
          File
        </label>
        <input
          type="file"
          onChange={(e) => setFile(e.target.files?.[0] || null)}
          className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700"
          required
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Input
          label="Validity Period (days)"
          type="number"
          value={formData.validityPeriod}
          onChange={(e) => setFormData({...formData, validityPeriod: parseInt(e.target.value)})}
          min="1"
          max="3650"
        />
        
        <Input
          label="Tags (comma-separated)"
          value={formData.tags}
          onChange={(e) => setFormData({...formData, tags: e.target.value})}
          placeholder="mfa, authentication, privileged-access"
        />
      </div>

      <div className="flex justify-end space-x-3 pt-4">
        <Button variant="outline" onClick={onCancel}>
          Cancel
        </Button>
        <Button type="submit">
          Upload Evidence
        </Button>
      </div>
    </form>
  );
};

// Evidence Validation Form Component
const EvidenceValidationForm: React.FC<{
  evidence: EvidenceItem;
  onSubmit: (validationData: any) => void;
  onCancel: () => void;
}> = ({ evidence, onSubmit, onCancel }) => {
  const [validationData, setValidationData] = useState({
    validationType: 'manual',
    validatorNotes: '',
    complianceScore: 0,
    recommendations: '',
    validationCriteria: [
      { criterion: '', status: 'pass', notes: '' }
    ]
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({
      ...validationData,
      validationCriteria: validationData.validationCriteria.filter(c => c.criterion),
      recommendations: validationData.recommendations.split('\n').filter(r => r.trim())
    });
  };

  const addCriterion = () => {
    setValidationData({
      ...validationData,
      validationCriteria: [
        ...validationData.validationCriteria,
        { criterion: '', status: 'pass', notes: '' }
      ]
    });
  };

  return (
    <div className="space-y-6">
      {/* Evidence Details */}
      <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
        <h4 className="font-medium text-gray-900 dark:text-white mb-2">Evidence Details</h4>
        <div className="grid grid-cols-2 gap-4 text-sm">
          <div>
            <span className="text-gray-600 dark:text-gray-400">Control ID:</span>
            <span className="ml-2 font-medium text-gray-900 dark:text-white">{evidence.controlId}</span>
          </div>
          <div>
            <span className="text-gray-600 dark:text-gray-400">Framework:</span>
            <span className="ml-2 font-medium text-gray-900 dark:text-white">{evidence.framework}</span>
          </div>
          <div>
            <span className="text-gray-600 dark:text-gray-400">Type:</span>
            <span className="ml-2 font-medium text-gray-900 dark:text-white">{evidence.evidenceType}</span>
          </div>
          <div>
            <span className="text-gray-600 dark:text-gray-400">Collected:</span>
            <span className="ml-2 font-medium text-gray-900 dark:text-white">
              {evidence.collectionDate.toLocaleDateString()}
            </span>
          </div>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Validator Notes
          </label>
          <textarea
            value={validationData.validatorNotes}
            onChange={(e) => setValidationData({...validationData, validatorNotes: e.target.value})}
            placeholder="Enter your validation notes and observations..."
            rows={3}
            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Compliance Score (0-100)
          </label>
          <input
            type="range"
            min="0"
            max="100"
            value={validationData.complianceScore}
            onChange={(e) => setValidationData({...validationData, complianceScore: parseInt(e.target.value)})}
            className="w-full"
          />
          <div className="flex justify-between text-sm text-gray-600 dark:text-gray-400 mt-1">
            <span>Non-compliant (0)</span>
            <span className="font-medium text-gray-900 dark:text-white">
              {validationData.complianceScore}%
            </span>
            <span>Fully compliant (100)</span>
          </div>
        </div>

        <div>
          <div className="flex justify-between items-center mb-2">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              Validation Criteria
            </label>
            <Button type="button" variant="outline" size="sm" onClick={addCriterion}>
              <Plus className="h-4 w-4 mr-1" />
              Add Criterion
            </Button>
          </div>
          
          <div className="space-y-3">
            {validationData.validationCriteria.map((criterion, index) => (
              <div key={index} className="grid grid-cols-12 gap-2 items-end">
                <div className="col-span-5">
                  <input
                    type="text"
                    value={criterion.criterion}
                    onChange={(e) => {
                      const newCriteria = [...validationData.validationCriteria];
                      newCriteria[index].criterion = e.target.value;
                      setValidationData({...validationData, validationCriteria: newCriteria});
                    }}
                    placeholder="Validation criterion"
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 text-sm"
                  />
                </div>
                <div className="col-span-2">
                  <select
                    value={criterion.status}
                    onChange={(e) => {
                      const newCriteria = [...validationData.validationCriteria];
                      newCriteria[index].status = e.target.value as 'pass' | 'fail' | 'partial';
                      setValidationData({...validationData, validationCriteria: newCriteria});
                    }}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 text-sm"
                  >
                    <option value="pass">Pass</option>
                    <option value="partial">Partial</option>
                    <option value="fail">Fail</option>
                  </select>
                </div>
                <div className="col-span-4">
                  <input
                    type="text"
                    value={criterion.notes}
                    onChange={(e) => {
                      const newCriteria = [...validationData.validationCriteria];
                      newCriteria[index].notes = e.target.value;
                      setValidationData({...validationData, validationCriteria: newCriteria});
                    }}
                    placeholder="Notes"
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 text-sm"
                  />
                </div>
                <div className="col-span-1">
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={() => {
                      const newCriteria = validationData.validationCriteria.filter((_, i) => i !== index);
                      setValidationData({...validationData, validationCriteria: newCriteria});
                    }}
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Recommendations (one per line)
          </label>
          <textarea
            value={validationData.recommendations}
            onChange={(e) => setValidationData({...validationData, recommendations: e.target.value})}
            placeholder="Enter recommendations for improvement..."
            rows={3}
            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700"
          />
        </div>

        <div className="flex justify-end space-x-3 pt-4">
          <Button variant="outline" onClick={onCancel}>
            Cancel
          </Button>
          <Button type="submit">
            Submit Validation
          </Button>
        </div>
      </form>
    </div>
  );
};

// Evidence Import Form Component
const EvidenceImportForm: React.FC<{
  onSubmit: (file: File) => void;
  onCancel: () => void;
}> = ({ onSubmit, onCancel }) => {
  const [file, setFile] = useState<File | null>(null);
  const [dragActive, setDragActive] = useState(false);

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      setFile(e.dataTransfer.files[0]);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (file) {
      onSubmit(file);
    }
  };

  const downloadTemplate = () => {
    const csvContent = [
      'control_id,framework,evidence_type,title,description,validity_period,tags',
      'AC-3.13,NIST 800-171r3,screenshot,MFA Configuration,Screenshots of MFA setup,365,mfa;authentication',
      'SC-7.1,NIST 800-171r3,configuration,Firewall Config,Network boundary protection config,90,firewall;network'
    ].join('\n');
    
    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'evidence-import-template.csv';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <h4 className="text-sm font-medium text-gray-900 dark:text-white mb-2">
          Import Evidence Metadata
        </h4>
        <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
          Upload a CSV file with evidence metadata. Use our template for the correct format.
        </p>
        
        <div className="mb-4">
          <Button type="button" variant="outline" size="sm" onClick={downloadTemplate}>
            <Download className="h-4 w-4 mr-2" />
            Download Template
          </Button>
        </div>
      </div>

      <div
        className={`border-2 border-dashed rounded-lg p-8 text-center transition-colors ${
          dragActive 
            ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20' 
            : 'border-gray-300 dark:border-gray-600 hover:border-blue-400'
        }`}
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
              onClick={() => setFile(null)}
              className="mt-2"
            >
              Remove
            </Button>
          </div>
        ) : (
          <div>
            <Upload className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
              Drag and drop your CSV file here, or
            </p>
            <label className="cursor-pointer">
              <span className="text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 font-medium">
                browse to upload
              </span>
              <input
                type="file"
                accept=".csv"
                onChange={(e) => setFile(e.target.files?.[0] || null)}
                className="hidden"
              />
            </label>
          </div>
        )}
      </div>

      <div className="text-xs text-gray-500 dark:text-gray-400">
        <p className="mb-1"><strong>Supported columns:</strong></p>
        <p>control_id, framework, evidence_type, title, description, validity_period, tags</p>
        <p className="mt-2"><strong>Note:</strong> Tags should be separated by semicolons (;)</p>
      </div>

      <div className="flex justify-end space-x-3 pt-4">
        <Button variant="outline" onClick={onCancel}>
          Cancel
        </Button>
        <Button type="submit" disabled={!file}>
          Import Evidence
        </Button>
      </div>
    </form>
  );
};

export default EvidenceVault;