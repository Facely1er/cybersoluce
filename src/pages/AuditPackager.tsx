import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Package,
  FileText,
  Download,
  Check,
  Clock,
  AlertTriangle,
  Plus,
  Filter,
  Search,
  Calendar,
  User,
  Shield,
  Eye,
  Edit,
  Trash2,
  Upload,
  Settings,
  Copy,
  CheckCircle,
  X,
  Star,
  Archive,
  Send,
  BookOpen,
  Building,
  Globe
} from 'lucide-react';
import { AuditPackage, Framework, Evidence } from '../types/cybersoluce';
import { mockFrameworks, mockEvidence } from '../data/mockData';
import { formatDate, formatRelativeTime } from '../utils/formatters';
import { useConfirmDialog } from '../hooks/useConfirmDialog';
import ConfirmDialog from '../components/common/ConfirmDialog';
import { useNotify } from '../components/notifications/NotificationSystem';
import EnhancedTable from '../components/tables/EnhancedTable';
import { Badge } from '../components/ui/badge';
import { Button } from '../components/ui/button';
import { Modal } from '../components/ui/modal';
import { Progress } from '../components/ui/progress';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '../components/ui/tabs';

const AuditPackager: React.FC = () => {
  const [auditPackages, setAuditPackages] = useState<AuditPackage[]>([
    {
      id: 'audit-1',
      name: 'Q1 2024 NIST CSF Compliance Package',
      frameworkId: 'nist-csf-2',
      generatedDate: new Date('2024-02-15'),
      controls: ['gv-1', 'gv-2', 'id-1'],
      evidence: mockEvidence,
      status: 'submitted',
      auditor: 'External Audit Firm',
      submittedBy: 'Sarah Chen'
    },
    {
      id: 'audit-2', 
      name: 'ISO 27001 Certification Package',
      frameworkId: 'iso-27001',
      generatedDate: new Date('2024-02-20'),
      controls: ['a5-1-1'],
      evidence: mockEvidence.slice(0, 1),
      status: 'draft',
      submittedBy: 'Michael Rodriguez'
    },
    {
      id: 'audit-3',
      name: 'SOC 2 Type II Package',
      frameworkId: 'nist-csf-2',
      generatedDate: new Date('2024-01-10'),
      controls: ['gv-1', 'pr-1'],
      evidence: mockEvidence.slice(0, 2),
      status: 'approved',
      auditor: 'Independent Auditor',
      submittedBy: 'Emma Thompson'
    }
  ]);

  const [activeTab, setActiveTab] = useState<'packages' | 'templates' | 'analytics'>('packages');
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showPreviewModal, setShowPreviewModal] = useState(false);
  const [selectedPackage, setSelectedPackage] = useState<AuditPackage | null>(null);
  const [currentStep, setCurrentStep] = useState(1);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [frameworkFilter, setFrameworkFilter] = useState<string>('all');
  const [showBulkActions, setShowBulkActions] = useState(false);
  const [selectedPackages, setSelectedPackages] = useState<Set<string>>(new Set());
  
  // Package creation state
  const [packageForm, setPackageForm] = useState({
    name: '',
    description: '',
    frameworkId: '',
    auditor: '',
    deadline: '',
    templateId: '',
    scope: 'full',
    priority: 'medium',
    tags: [] as string[],
    customControls: [] as string[],
    automatedEvidence: true,
    includePreviousFindings: false,
    generateExecutiveSummary: true
  });

  // Enhanced templates with more detail
  const packageTemplates = [
    {
      id: 'soc2-type2',
      name: 'SOC 2 Type II',
      description: 'Service Organization Control 2 Type II audit package with all required controls and evidence',
      framework: 'SOC 2',
      controls: 28,
      estimatedTime: '2-3 weeks',
      complexity: 'High',
      requiredEvidence: ['Security policies', 'Access logs', 'Change management records', 'Incident reports'],
      tags: ['compliance', 'attestation', 'security'],
      popular: true
    },
    {
      id: 'iso27001-cert',
      name: 'ISO 27001 Certification',
      description: 'Complete ISO 27001:2022 certification package with all Annex A controls',
      framework: 'ISO 27001',
      controls: 114,
      estimatedTime: '4-6 weeks',
      complexity: 'Very High',
      requiredEvidence: ['ISMS documentation', 'Risk assessments', 'Policy documents', 'Training records'],
      tags: ['iso', 'certification', 'isms'],
      popular: true
    },
    {
      id: 'nist-csf-assessment',
      name: 'NIST CSF 2.0 Assessment',
      description: 'Comprehensive NIST Cybersecurity Framework 2.0 assessment with Govern function',
      framework: 'NIST CSF 2.0',
      controls: 108,
      estimatedTime: '3-4 weeks',
      complexity: 'High',
      requiredEvidence: ['Security procedures', 'Governance documentation', 'Control implementations'],
      tags: ['nist', 'framework', 'governance'],
      popular: true
    },
    {
      id: 'cmmc-level2',
      name: 'CMMC Level 2',
      description: 'Cybersecurity Maturity Model Certification Level 2 for DoD contractors',
      framework: 'CMMC 2.0',
      controls: 110,
      estimatedTime: '5-7 weeks',
      complexity: 'Very High',
      requiredEvidence: ['System security plans', 'Configuration baselines', 'Access control matrices'],
      tags: ['cmmc', 'dod', 'certification'],
      popular: false
    },
    {
      id: 'pci-dss',
      name: 'PCI DSS Compliance',
      description: 'Payment Card Industry Data Security Standard compliance package',
      framework: 'PCI DSS',
      controls: 12,
      estimatedTime: '2-3 weeks',
      complexity: 'Medium',
      requiredEvidence: ['Network diagrams', 'Vulnerability scans', 'Security policies'],
      tags: ['pci', 'payment', 'compliance'],
      popular: false
    },
    {
      id: 'gdpr-audit',
      name: 'GDPR Compliance Audit',
      description: 'General Data Protection Regulation compliance audit package',
      framework: 'GDPR',
      controls: 47,
      estimatedTime: '3-5 weeks',
      complexity: 'High',
      requiredEvidence: ['Privacy policies', 'Data flow diagrams', 'Consent records', 'Breach procedures'],
      tags: ['gdpr', 'privacy', 'eu'],
      popular: false
    }
  ];

  const { openConfirm, isOpen, options, confirmAction, closeConfirm, loading } = useConfirmDialog();
  const notify = useNotify();

  // Enhanced package analytics
  const packageAnalytics = {
    totalPackages: auditPackages.length,
    draftPackages: auditPackages.filter(p => p.status === 'draft').length,
    submittedPackages: auditPackages.filter(p => p.status === 'submitted').length,
    approvedPackages: auditPackages.filter(p => p.status === 'approved').length,
    rejectedPackages: auditPackages.filter(p => p.status === 'returned').length,
    totalEvidence: auditPackages.reduce((acc, pkg) => acc + pkg.evidence.length, 0),
    avgCompletionTime: '3.2 weeks',
    approvalRate: 85
  };

  // Filter packages based on search and filters
  const filteredPackages = auditPackages.filter(pkg => {
    const matchesSearch = searchQuery === '' || 
      pkg.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      pkg.submittedBy.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesStatus = statusFilter === 'all' || pkg.status === statusFilter;
    const matchesFramework = frameworkFilter === 'all' || pkg.frameworkId === frameworkFilter;
    
    return matchesSearch && matchesStatus && matchesFramework;
  });

  const handleCreatePackage = () => {
    if (!packageForm.name || !packageForm.frameworkId) {
      notify.error('Missing Information', 'Please fill in all required fields');
      return;
    }

    const newPackage: AuditPackage = {
      id: `audit-${Date.now()}`,
      name: packageForm.name,
      frameworkId: packageForm.frameworkId,
      generatedDate: new Date(),
      controls: packageForm.customControls,
      evidence: mockEvidence.filter(e => packageForm.customControls.includes(e.controlId)),
      status: 'draft',
      submittedBy: 'Current User',
      auditor: packageForm.auditor
    };

    setAuditPackages([...auditPackages, newPackage]);
    setShowCreateModal(false);
    setCurrentStep(1);
    setPackageForm({
      name: '',
      description: '',
      frameworkId: '',
      auditor: '',
      deadline: '',
      templateId: '',
      scope: 'full',
      priority: 'medium',
      tags: [],
      customControls: [],
      automatedEvidence: true,
      includePreviousFindings: false,
      generateExecutiveSummary: true
    });
    
    notify.success('Package Created', `Audit package "${newPackage.name}" has been created successfully`);
  };

  const handleDeletePackage = async (pkg: AuditPackage) => {
    const confirmed = await openConfirm({
      title: 'Delete Audit Package',
      description: `Are you sure you want to delete "${pkg.name}"? This action cannot be undone.`,
      confirmLabel: 'Delete',
      type: 'danger'
    });

    if (confirmed) {
      setAuditPackages(prev => prev.filter(p => p.id !== pkg.id));
      notify.success('Package Deleted', 'Audit package has been deleted successfully');
      closeConfirm();
    }
  };

  const handleDuplicatePackage = (pkg: AuditPackage) => {
    const duplicatedPackage: AuditPackage = {
      ...pkg,
      id: `audit-${Date.now()}`,
      name: `${pkg.name} (Copy)`,
      generatedDate: new Date(),
      status: 'draft',
      submittedBy: 'Current User'
    };
    
    setAuditPackages([...auditPackages, duplicatedPackage]);
    notify.success('Package Duplicated', `Copy of "${pkg.name}" has been created`);
  };

  const handleBulkAction = async (action: 'delete' | 'archive' | 'submit') => {
    if (selectedPackages.size === 0) return;

    const packageNames = Array.from(selectedPackages)
      .map(id => auditPackages.find(p => p.id === id)?.name)
      .filter(Boolean)
      .join(', ');

    let confirmed = false;
    
    switch (action) {
      case 'delete':
        confirmed = await openConfirm({
          title: 'Delete Selected Packages',
          description: `Are you sure you want to delete ${selectedPackages.size} packages? This action cannot be undone.`,
          confirmLabel: 'Delete All',
          type: 'danger'
        });
        break;
      case 'archive':
        confirmed = await openConfirm({
          title: 'Archive Selected Packages',
          description: `Archive ${selectedPackages.size} packages?`,
          confirmLabel: 'Archive'
        });
        break;
      case 'submit':
        confirmed = await openConfirm({
          title: 'Submit Selected Packages',
          description: `Submit ${selectedPackages.size} packages for review?`,
          confirmLabel: 'Submit'
        });
        break;
    }

    if (confirmed) {
      if (action === 'delete') {
        setAuditPackages(prev => prev.filter(p => !selectedPackages.has(p.id)));
      } else {
        const newStatus = action === 'archive' ? 'archived' : 'submitted';
        setAuditPackages(prev => prev.map(p => 
          selectedPackages.has(p.id) ? { ...p, status: newStatus as any } : p
        ));
      }
      
      setSelectedPackages(new Set());
      setShowBulkActions(false);
      notify.success('Bulk Action Complete', `${selectedPackages.size} packages ${action}ed successfully`);
      closeConfirm();
    }
  };

  const packageColumns = [
    {
      key: 'name' as keyof AuditPackage,
      header: 'Package Name',
      sortable: true,
      render: (value: any, row: AuditPackage) => (
        <div className="flex items-center">
          <Package className="h-5 w-5 text-blue-600 dark:text-blue-400 mr-3" />
          <div>
            <div className="font-medium text-gray-900 dark:text-white">{row.name}</div>
            <div className="text-sm text-gray-500 dark:text-gray-400">by {row.submittedBy}</div>
          </div>
        </div>
      )
    },
    {
      key: 'frameworkId' as keyof AuditPackage,
      header: 'Framework',
      render: (value: any, row: AuditPackage) => {
        const framework = mockFrameworks.find(f => f.id === row.frameworkId);
        return (
          <div>
            <div className="font-medium">{framework?.name || 'Unknown'}</div>
            <div className="text-sm text-gray-500">v{framework?.version || 'N/A'}</div>
          </div>
        );
      }
    },
    {
      key: 'controls' as keyof AuditPackage,
      header: 'Controls',
      align: 'center' as const,
      render: (value: any, row: AuditPackage) => (
        <Badge variant="outline">{row.controls.length} controls</Badge>
      )
    },
    {
      key: 'evidence' as keyof AuditPackage,
      header: 'Evidence',
      align: 'center' as const,
      render: (value: any, row: AuditPackage) => (
        <Badge variant="info">{row.evidence.length} items</Badge>
      )
    },
    {
      key: 'status' as keyof AuditPackage,
      header: 'Status',
      render: (value: any, row: AuditPackage) => {
        const statusConfig = {
          draft: { variant: 'secondary' as const, label: 'Draft' },
          submitted: { variant: 'info' as const, label: 'Under Review' },
          approved: { variant: 'success' as const, label: 'Approved' },
          returned: { variant: 'warning' as const, label: 'Returned' },
          archived: { variant: 'secondary' as const, label: 'Archived' }
        };
        const config = statusConfig[row.status as keyof typeof statusConfig] || statusConfig.draft;
        return <Badge variant={config.variant}>{config.label}</Badge>;
      }
    },
    {
      key: 'generatedDate' as keyof AuditPackage,
      header: 'Created',
      formatter: 'date' as const,
      render: (value: any) => formatRelativeTime(value)
    }
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
      {/* Enhanced Header */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
            Audit Package Generator
          </h1>
          <p className="text-gray-600 dark:text-gray-300 mt-1">
            Create comprehensive audit packages with evidence collection and documentation
          </p>
        </div>
        
        <div className="flex items-center gap-3">
          <Button variant="outline" size="sm">
            <Settings className="h-4 w-4 mr-2" />
            Settings
          </Button>
          
          <Button 
            onClick={() => setShowCreateModal(true)}
            className="bg-blue-600 hover:bg-blue-700"
          >
            <Plus className="h-4 w-4 mr-2" />
            Create Package
          </Button>
        </div>
      </div>

      {/* Enhanced Analytics Dashboard */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Total Packages</p>
              <p className="text-3xl font-bold text-gray-900 dark:text-white">{packageAnalytics.totalPackages}</p>
              <p className="text-xs text-gray-500 mt-1">Active audit packages</p>
            </div>
            <Package className="h-8 w-8 text-blue-600 dark:text-blue-400" />
          </div>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Under Review</p>
              <p className="text-3xl font-bold text-blue-600">{packageAnalytics.submittedPackages}</p>
              <p className="text-xs text-blue-500 mt-1">Awaiting approval</p>
            </div>
            <Eye className="h-8 w-8 text-blue-600" />
          </div>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Approved</p>
              <p className="text-3xl font-bold text-green-600">{packageAnalytics.approvedPackages}</p>
              <p className="text-xs text-green-500 mt-1">{packageAnalytics.approvalRate}% approval rate</p>
            </div>
            <CheckCircle className="h-8 w-8 text-green-600" />
          </div>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Evidence Items</p>
              <p className="text-3xl font-bold text-purple-600">{packageAnalytics.totalEvidence}</p>
              <p className="text-xs text-purple-500 mt-1">Collected artifacts</p>
            </div>
            <FileText className="h-8 w-8 text-purple-600" />
          </div>
        </motion.div>
      </div>

      {/* Enhanced Tabs */}
      <Tabs value={activeTab} onValueChange={(value) => setActiveTab(value as any)}>
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="packages">Audit Packages</TabsTrigger>
          <TabsTrigger value="templates">Templates</TabsTrigger>
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
        </TabsList>

        <TabsContent value="packages" className="space-y-6">
          {/* Enhanced Filters */}
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-4">
            <div className="flex flex-col lg:flex-row lg:items-center gap-4">
              <div className="flex-1 relative">
                <Search className="h-4 w-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search packages..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-800"
                />
              </div>
              
              <div className="flex items-center gap-3">
                <select
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                  className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-800"
                >
                  <option value="all">All Status</option>
                  <option value="draft">Draft</option>
                  <option value="submitted">Under Review</option>
                  <option value="approved">Approved</option>
                  <option value="returned">Returned</option>
                </select>
                
                <select
                  value={frameworkFilter}
                  onChange={(e) => setFrameworkFilter(e.target.value)}
                  className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-800"
                >
                  <option value="all">All Frameworks</option>
                  {mockFrameworks.map(fw => (
                    <option key={fw.id} value={fw.id}>{fw.name}</option>
                  ))}
                </select>

                {selectedPackages.size > 0 && (
                  <Button
                    variant="outline"
                    onClick={() => setShowBulkActions(!showBulkActions)}
                  >
                    Bulk Actions ({selectedPackages.size})
                  </Button>
                )}
              </div>
            </div>

            {showBulkActions && selectedPackages.size > 0 && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                className="mt-4 p-4 bg-gray-50 dark:bg-gray-700 rounded-lg"
              >
                <div className="flex items-center gap-3">
                  <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                    {selectedPackages.size} packages selected:
                  </span>
                  <Button size="sm" variant="outline" onClick={() => handleBulkAction('submit')}>
                    <Send className="h-4 w-4 mr-1" />
                    Submit
                  </Button>
                  <Button size="sm" variant="outline" onClick={() => handleBulkAction('archive')}>
                    <Archive className="h-4 w-4 mr-1" />
                    Archive
                  </Button>
                  <Button size="sm" variant="destructive" onClick={() => handleBulkAction('delete')}>
                    <Trash2 className="h-4 w-4 mr-1" />
                    Delete
                  </Button>
                </div>
              </motion.div>
            )}
          </div>

          {/* Enhanced Package Table */}
          <EnhancedTable
            data={filteredPackages}
            columns={packageColumns}
            searchable={false}
            selectable={true}
            onSelectionChange={(selectedRows) => {
              const selectedIds = new Set(selectedRows.map(row => row.id));
              setSelectedPackages(selectedIds);
            }}
            onRowClick={(pkg) => {
              setSelectedPackage(pkg);
              setShowPreviewModal(true);
            }}
            emptyState={{
              title: 'No Audit Packages',
              description: 'Create your first audit package to get started with compliance documentation.',
              action: {
                label: 'Create Package',
                onClick: () => setShowCreateModal(true)
              }
            }}
          />
        </TabsContent>

        <TabsContent value="templates" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {packageTemplates.map((template, index) => (
              <motion.div
                key={template.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ scale: 1.02 }}
                className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 border border-gray-200 dark:border-gray-700 hover:shadow-xl transition-all cursor-pointer relative"
              >
                {template.popular && (
                  <div className="absolute top-3 right-3 bg-yellow-100 dark:bg-yellow-900/30 text-yellow-800 dark:text-yellow-300 px-2 py-1 rounded-full text-xs font-medium flex items-center">
                    <Star className="h-3 w-3 mr-1" />
                    Popular
                  </div>
                )}
                
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-semibold text-gray-900 dark:text-white">{template.name}</h3>
                  <Shield className="h-6 w-6 text-blue-600 dark:text-blue-400" />
                </div>
                
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                  {template.description}
                </p>
                
                <div className="space-y-3 mb-4">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-500 dark:text-gray-400">Controls:</span>
                    <span className="text-gray-900 dark:text-white font-medium">{template.controls}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-500 dark:text-gray-400">Timeline:</span>
                    <span className="text-gray-900 dark:text-white font-medium">{template.estimatedTime}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-500 dark:text-gray-400">Complexity:</span>
                    <Badge 
                      variant={
                        template.complexity === 'Very High' ? 'destructive' :
                        template.complexity === 'High' ? 'warning' :
                        template.complexity === 'Medium' ? 'info' : 'success'
                      }
                      size="sm"
                    >
                      {template.complexity}
                    </Badge>
                  </div>
                </div>
                
                <div className="mb-4">
                  <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Required Evidence:</h4>
                  <div className="space-y-1">
                    {template.requiredEvidence.slice(0, 3).map((evidence, i) => (
                      <div key={i} className="flex items-center text-xs text-gray-600 dark:text-gray-400">
                        <CheckCircle className="h-3 w-3 text-green-500 mr-1" />
                        {evidence}
                      </div>
                    ))}
                    {template.requiredEvidence.length > 3 && (
                      <div className="text-xs text-gray-500 dark:text-gray-400">
                        +{template.requiredEvidence.length - 3} more items
                      </div>
                    )}
                  </div>
                </div>
                
                <div className="flex flex-wrap gap-1 mb-4">
                  {template.tags.map((tag) => (
                    <span 
                      key={tag}
                      className="px-2 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-300 rounded text-xs"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
                
                <div className="flex gap-2">
                  <Button 
                    size="sm" 
                    className="flex-1"
                    onClick={() => {
                      setPackageForm({
                        ...packageForm,
                        templateId: template.id,
                        name: `${template.name} - ${new Date().toLocaleDateString()}`
                      });
                      setShowCreateModal(true);
                    }}
                  >
                    Use Template
                  </Button>
                  <Button size="sm" variant="outline">
                    <Eye className="h-4 w-4" />
                  </Button>
                </div>
              </motion.div>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="analytics" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                Package Status Distribution
              </h3>
              <div className="space-y-4">
                {[
                  { status: 'draft', count: packageAnalytics.draftPackages, color: 'bg-gray-500', label: 'Draft' },
                  { status: 'submitted', count: packageAnalytics.submittedPackages, color: 'bg-blue-500', label: 'Under Review' },
                  { status: 'approved', count: packageAnalytics.approvedPackages, color: 'bg-green-500', label: 'Approved' },
                  { status: 'returned', count: packageAnalytics.rejectedPackages, color: 'bg-orange-500', label: 'Returned' }
                ].map((item) => (
                  <div key={item.status} className="flex items-center justify-between">
                    <div className="flex items-center">
                      <div className={`w-3 h-3 rounded-full ${item.color} mr-3`}></div>
                      <span className="text-sm text-gray-700 dark:text-gray-300">{item.label}</span>
                    </div>
                    <span className="text-sm font-medium text-gray-900 dark:text-white">{item.count}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                Performance Metrics
              </h3>
              <div className="space-y-4">
                <div>
                  <div className="flex justify-between mb-2">
                    <span className="text-sm text-gray-600 dark:text-gray-400">Approval Rate</span>
                    <span className="text-sm font-medium text-gray-900 dark:text-white">{packageAnalytics.approvalRate}%</span>
                  </div>
                  <Progress value={packageAnalytics.approvalRate} color="success" />
                </div>
                
                <div>
                  <div className="flex justify-between mb-2">
                    <span className="text-sm text-gray-600 dark:text-gray-400">Avg. Completion Time</span>
                    <span className="text-sm font-medium text-gray-900 dark:text-white">{packageAnalytics.avgCompletionTime}</span>
                  </div>
                </div>
                
                <div>
                  <div className="flex justify-between mb-2">
                    <span className="text-sm text-gray-600 dark:text-gray-400">Evidence Collection Rate</span>
                    <span className="text-sm font-medium text-gray-900 dark:text-white">94%</span>
                  </div>
                  <Progress value={94} color="success" />
                </div>
              </div>
            </div>
          </div>
        </TabsContent>
      </Tabs>

      {/* Enhanced Create Package Modal */}
      <Modal
        isOpen={showCreateModal}
        onClose={() => setShowCreateModal(false)}
        title="Create Audit Package"
        size="xl"
      >
        <div className="space-y-6">
          {/* Progress Indicator */}
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center space-x-4">
              {[1, 2, 3].map((step) => (
                <div key={step} className="flex items-center">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                    currentStep >= step 
                      ? 'bg-blue-600 text-white' 
                      : 'bg-gray-200 dark:bg-gray-700 text-gray-500'
                  }`}>
                    {step}
                  </div>
                  {step < 3 && <div className="w-12 h-0.5 bg-gray-200 dark:bg-gray-700 mx-2"></div>}
                </div>
              ))}
            </div>
            <span className="text-sm text-gray-500 dark:text-gray-400">
              Step {currentStep} of 3
            </span>
          </div>

          {/* Step Content */}
          <AnimatePresence mode="wait">
            {currentStep === 1 && (
              <motion.div
                key="step1"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-4"
              >
                <h3 className="text-lg font-medium text-gray-900 dark:text-white">Package Information</h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      Package Name *
                    </label>
                    <input
                      type="text"
                      value={packageForm.name}
                      onChange={(e) => setPackageForm({...packageForm, name: e.target.value})}
                      placeholder="e.g., Q1 2024 SOC 2 Audit Package"
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      Framework *
                    </label>
                    <select
                      value={packageForm.frameworkId}
                      onChange={(e) => setPackageForm({...packageForm, frameworkId: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700"
                    >
                      <option value="">Select Framework</option>
                      {mockFrameworks.map((framework) => (
                        <option key={framework.id} value={framework.id}>
                          {framework.name} v{framework.version}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Description
                  </label>
                  <textarea
                    value={packageForm.description}
                    onChange={(e) => setPackageForm({...packageForm, description: e.target.value})}
                    placeholder="Describe the purpose and scope of this audit package..."
                    rows={3}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700"
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      Priority
                    </label>
                    <select
                      value={packageForm.priority}
                      onChange={(e) => setPackageForm({...packageForm, priority: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700"
                    >
                      <option value="low">Low</option>
                      <option value="medium">Medium</option>
                      <option value="high">High</option>
                      <option value="critical">Critical</option>
                    </select>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      Auditor
                    </label>
                    <input
                      type="text"
                      value={packageForm.auditor}
                      onChange={(e) => setPackageForm({...packageForm, auditor: e.target.value})}
                      placeholder="External Audit Firm"
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      Deadline
                    </label>
                    <input
                      type="date"
                      value={packageForm.deadline}
                      onChange={(e) => setPackageForm({...packageForm, deadline: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700"
                    />
                  </div>
                </div>
              </motion.div>
            )}

            {currentStep === 2 && (
              <motion.div
                key="step2"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-4"
              >
                <h3 className="text-lg font-medium text-gray-900 dark:text-white">Controls & Evidence</h3>
                
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Select Controls
                    </label>
                    <div className="max-h-64 overflow-y-auto border border-gray-300 dark:border-gray-600 rounded-md p-3 space-y-2">
                      {packageForm.frameworkId && mockFrameworks
                        .find(f => f.id === packageForm.frameworkId)?.controls
                        ?.map((control) => (
                        <label key={control.id} className="flex items-center space-x-2 p-2 hover:bg-gray-50 dark:hover:bg-gray-700 rounded">
                          <input
                            type="checkbox"
                            checked={packageForm.customControls.includes(control.id)}
                            onChange={(e) => {
                              if (e.target.checked) {
                                setPackageForm({
                                  ...packageForm,
                                  customControls: [...packageForm.customControls, control.id]
                                });
                              } else {
                                setPackageForm({
                                  ...packageForm,
                                  customControls: packageForm.customControls.filter(id => id !== control.id)
                                });
                              }
                            }}
                            className="h-4 w-4 text-blue-600 rounded border-gray-300"
                          />
                          <div className="flex-1">
                            <span className="text-sm font-medium text-gray-900 dark:text-white">
                              {control.id}
                            </span>
                            <span className="text-sm text-gray-500 dark:text-gray-400 ml-2">
                              {control.title}
                            </span>
                          </div>
                        </label>
                      ))}
                    </div>
                  </div>

                  <div className="space-y-4">
                    <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300">Options</h4>
                    
                    <label className="flex items-center space-x-2">
                      <input
                        type="checkbox"
                        checked={packageForm.automatedEvidence}
                        onChange={(e) => setPackageForm({...packageForm, automatedEvidence: e.target.checked})}
                        className="h-4 w-4 text-blue-600 rounded border-gray-300"
                      />
                      <span className="text-sm text-gray-700 dark:text-gray-300">Automated evidence collection</span>
                    </label>
                    
                    <label className="flex items-center space-x-2">
                      <input
                        type="checkbox"
                        checked={packageForm.includePreviousFindings}
                        onChange={(e) => setPackageForm({...packageForm, includePreviousFindings: e.target.checked})}
                        className="h-4 w-4 text-blue-600 rounded border-gray-300"
                      />
                      <span className="text-sm text-gray-700 dark:text-gray-300">Include previous audit findings</span>
                    </label>
                    
                    <label className="flex items-center space-x-2">
                      <input
                        type="checkbox"
                        checked={packageForm.generateExecutiveSummary}
                        onChange={(e) => setPackageForm({...packageForm, generateExecutiveSummary: e.target.checked})}
                        className="h-4 w-4 text-blue-600 rounded border-gray-300"
                      />
                      <span className="text-sm text-gray-700 dark:text-gray-300">Generate executive summary</span>
                    </label>

                    <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg">
                      <h5 className="text-sm font-medium text-blue-800 dark:text-blue-200 mb-2">Package Preview</h5>
                      <div className="space-y-2 text-sm">
                        <div className="flex justify-between">
                          <span className="text-blue-700 dark:text-blue-300">Selected Controls:</span>
                          <span className="text-blue-900 dark:text-blue-100 font-medium">{packageForm.customControls.length}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-blue-700 dark:text-blue-300">Est. Evidence Items:</span>
                          <span className="text-blue-900 dark:text-blue-100 font-medium">{packageForm.customControls.length * 2}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-blue-700 dark:text-blue-300">Est. Completion:</span>
                          <span className="text-blue-900 dark:text-blue-100 font-medium">2-3 weeks</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}

            {currentStep === 3 && (
              <motion.div
                key="step3"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-4"
              >
                <h3 className="text-lg font-medium text-gray-900 dark:text-white">Review & Create</h3>
                
                <div className="bg-gray-50 dark:bg-gray-700/50 rounded-lg p-6">
                  <h4 className="font-medium text-gray-900 dark:text-white mb-4">Package Summary</h4>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-3">
                      <div>
                        <span className="text-sm text-gray-500 dark:text-gray-400">Package Name:</span>
                        <p className="font-medium text-gray-900 dark:text-white">{packageForm.name}</p>
                      </div>
                      
                      <div>
                        <span className="text-sm text-gray-500 dark:text-gray-400">Framework:</span>
                        <p className="font-medium text-gray-900 dark:text-white">
                          {mockFrameworks.find(f => f.id === packageForm.frameworkId)?.name || 'Not selected'}
                        </p>
                      </div>
                      
                      <div>
                        <span className="text-sm text-gray-500 dark:text-gray-400">Priority:</span>
                        <Badge variant={
                          packageForm.priority === 'critical' ? 'destructive' :
                          packageForm.priority === 'high' ? 'warning' :
                          packageForm.priority === 'medium' ? 'info' : 'secondary'
                        }>
                          {packageForm.priority}
                        </Badge>
                      </div>
                    </div>
                    
                    <div className="space-y-3">
                      <div>
                        <span className="text-sm text-gray-500 dark:text-gray-400">Controls Selected:</span>
                        <p className="font-medium text-gray-900 dark:text-white">{packageForm.customControls.length}</p>
                      </div>
                      
                      <div>
                        <span className="text-sm text-gray-500 dark:text-gray-400">Auditor:</span>
                        <p className="font-medium text-gray-900 dark:text-white">{packageForm.auditor || 'Not specified'}</p>
                      </div>
                      
                      <div>
                        <span className="text-sm text-gray-500 dark:text-gray-400">Deadline:</span>
                        <p className="font-medium text-gray-900 dark:text-white">
                          {packageForm.deadline ? formatDate(packageForm.deadline) : 'Not specified'}
                        </p>
                      </div>
                    </div>
                  </div>

                  {packageForm.description && (
                    <div className="mt-4">
                      <span className="text-sm text-gray-500 dark:text-gray-400">Description:</span>
                      <p className="text-gray-700 dark:text-gray-300 mt-1">{packageForm.description}</p>
                    </div>
                  )}
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Navigation */}
          <div className="flex justify-between pt-6 border-t border-gray-200 dark:border-gray-700">
            <div>
              {currentStep > 1 && (
                <Button
                  variant="outline"
                  onClick={() => setCurrentStep(currentStep - 1)}
                >
                  Previous
                </Button>
              )}
            </div>
            
            <div className="flex gap-3">
              <Button
                variant="outline"
                onClick={() => setShowCreateModal(false)}
              >
                Cancel
              </Button>
              
              {currentStep < 3 ? (
                <Button
                  onClick={() => setCurrentStep(currentStep + 1)}
                  disabled={
                    (currentStep === 1 && (!packageForm.name || !packageForm.frameworkId)) ||
                    (currentStep === 2 && packageForm.customControls.length === 0)
                  }
                >
                  Next
                </Button>
              ) : (
                <Button
                  onClick={handleCreatePackage}
                  disabled={!packageForm.name || !packageForm.frameworkId || packageForm.customControls.length === 0}
                >
                  Create Package
                </Button>
              )}
            </div>
          </div>
        </div>
      </Modal>

      {/* Enhanced Package Preview Modal */}
      <Modal
        isOpen={showPreviewModal}
        onClose={() => setShowPreviewModal(false)}
        title={selectedPackage?.name || 'Package Preview'}
        size="xl"
      >
        {selectedPackage && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="md:col-span-2">
                <div className="bg-gray-50 dark:bg-gray-700/50 rounded-lg p-4 mb-4">
                  <h4 className="font-medium text-gray-900 dark:text-white mb-3">Package Details</h4>
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <span className="text-gray-500 dark:text-gray-400">Framework:</span>
                      <p className="font-medium text-gray-900 dark:text-white">
                        {mockFrameworks.find(f => f.id === selectedPackage.frameworkId)?.name}
                      </p>
                    </div>
                    <div>
                      <span className="text-gray-500 dark:text-gray-400">Created:</span>
                      <p className="font-medium text-gray-900 dark:text-white">
                        {formatDate(selectedPackage.generatedDate)}
                      </p>
                    </div>
                    <div>
                      <span className="text-gray-500 dark:text-gray-400">Submitted By:</span>
                      <p className="font-medium text-gray-900 dark:text-white">{selectedPackage.submittedBy}</p>
                    </div>
                    <div>
                      <span className="text-gray-500 dark:text-gray-400">Auditor:</span>
                      <p className="font-medium text-gray-900 dark:text-white">{selectedPackage.auditor || 'Not assigned'}</p>
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <div>
                    <h4 className="font-medium text-gray-900 dark:text-white mb-2">Controls ({selectedPackage.controls.length})</h4>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                      {selectedPackage.controls.map((controlId) => (
                        <div key={controlId} className="px-3 py-2 bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-300 rounded text-sm font-mono">
                          {controlId}
                        </div>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h4 className="font-medium text-gray-900 dark:text-white mb-2">Evidence ({selectedPackage.evidence.length})</h4>
                    <div className="space-y-2">
                      {selectedPackage.evidence.map((evidence) => (
                        <div key={evidence.id} className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                          <div className="flex items-center">
                            <FileText className="h-4 w-4 text-gray-500 mr-2" />
                            <div>
                              <span className="text-sm font-medium text-gray-900 dark:text-white">{evidence.title}</span>
                              <p className="text-xs text-gray-500 dark:text-gray-400">{evidence.description}</p>
                            </div>
                          </div>
                          <Badge variant={
                            evidence.reviewStatus === 'approved' ? 'success' :
                            evidence.reviewStatus === 'rejected' ? 'destructive' : 'warning'
                          } size="sm">
                            {evidence.reviewStatus}
                          </Badge>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-4">
                  <h4 className="font-medium text-gray-900 dark:text-white mb-3">Quick Actions</h4>
                  <div className="space-y-2">
                    <Button size="sm" className="w-full justify-start">
                      <Download className="h-4 w-4 mr-2" />
                      Export Package
                    </Button>
                    <Button size="sm" variant="outline" className="w-full justify-start">
                      <Copy className="h-4 w-4 mr-2" />
                      Duplicate
                    </Button>
                    <Button size="sm" variant="outline" className="w-full justify-start">
                      <Edit className="h-4 w-4 mr-2" />
                      Edit Package
                    </Button>
                    {selectedPackage.status === 'draft' && (
                      <Button size="sm" variant="outline" className="w-full justify-start">
                        <Send className="h-4 w-4 mr-2" />
                        Submit for Review
                      </Button>
                    )}
                  </div>
                </div>

                <div className="bg-gray-50 dark:bg-gray-700/50 rounded-lg p-4">
                  <h4 className="font-medium text-gray-900 dark:text-white mb-3">Package Statistics</h4>
                  <div className="space-y-3">
                    <div>
                      <div className="flex justify-between mb-1">
                        <span className="text-sm text-gray-600 dark:text-gray-400">Completeness</span>
                        <span className="text-sm font-medium text-gray-900 dark:text-white">85%</span>
                      </div>
                      <Progress value={85} color="success" />
                    </div>
                    
                    <div>
                      <div className="flex justify-between mb-1">
                        <span className="text-sm text-gray-600 dark:text-gray-400">Evidence Quality</span>
                        <span className="text-sm font-medium text-gray-900 dark:text-white">92%</span>
                      </div>
                      <Progress value={92} color="success" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </Modal>

      {/* Confirmation Dialog */}
      <ConfirmDialog
        isOpen={isOpen}
        onClose={closeConfirm}
        onConfirm={confirmAction}
        title={options?.title || ''}
        description={options?.description || ''}
        confirmLabel={options?.confirmLabel}
        type={options?.type}
        loading={loading}
      />
    </div>
  );
};

export default AuditPackager;