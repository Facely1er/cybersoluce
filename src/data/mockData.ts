import {
  Framework,
  Control,
  Category,
  GovernanceItem,
  RiskRegisterItem,
  MaturityDomain,
  ExecutiveMetrics,
  IntelligenceInsight,
  User,
  ControlMapping,
  Evidence
} from '../types/cybersoluce';

export const mockUsers: User[] = [
  {
    id: 'user-1',
    firstName: 'Sarah',
    lastName: 'Chen',
    email: 'sarah.chen@company.com',
    role: 'executive',
    department: 'Security'
  },
  {
    id: 'user-2',
    firstName: 'Michael',
    lastName: 'Rodriguez',
    email: 'michael.rodriguez@company.com',
    role: 'manager',
    department: 'IT'
  },
  {
    id: 'user-3',
    firstName: 'Emma',
    lastName: 'Thompson',
    email: 'emma.thompson@company.com',
    role: 'analyst',
    department: 'Compliance'
  }
];

export const mockFrameworks: Framework[] = [
  {
    id: 'nist-csf-2',
    name: 'NIST Cybersecurity Framework',
    version: '2.0',
    description: 'Comprehensive cybersecurity framework with Govern function',
    status: 'active',
    region: 'us',
    lastUpdated: new Date('2024-02-26'),
    categories: [
      {
        id: 'govern',
        name: 'Govern (GV)',
        description: 'Develop and implement organizational cybersecurity strategy',
        frameworkId: 'nist-csf-2',
        controls: ['gv-1', 'gv-2', 'gv-3']
      },
      {
        id: 'identify',
        name: 'Identify (ID)',
        description: 'Understand cybersecurity risks to systems, people, assets, data, and capabilities',
        frameworkId: 'nist-csf-2',
        controls: ['id-1', 'id-2', 'id-3']
      },
      {
        id: 'protect',
        name: 'Protect (PR)',
        description: 'Implement safeguards to ensure delivery of critical services',
        frameworkId: 'nist-csf-2',
        controls: ['pr-1', 'pr-2', 'pr-3']
      }
    ],
    controls: [
      {
        id: 'gv-1',
        frameworkId: 'nist-csf-2',
        categoryId: 'govern',
        title: 'Organizational Context',
        description: 'The organization\'s mission, stakeholder expectations, and legal and regulatory requirements are understood',
        implementationGuidance: 'Document organizational context, stakeholder requirements, and applicable regulations',
        priority: 'critical',
        status: 'implemented',
        mappings: [],
        evidence: [],
        maturityLevel: 4
      },
      {
        id: 'gv-2',
        frameworkId: 'nist-csf-2',
        categoryId: 'govern',
        title: 'Risk Management Strategy',
        description: 'Risk management processes are established, managed, and agreed to by organizational stakeholders',
        implementationGuidance: 'Establish enterprise risk management processes for cybersecurity',
        priority: 'critical',
        status: 'in-progress',
        mappings: [],
        evidence: [],
        maturityLevel: 3
      }
    ]
  },
  {
    id: 'iso-27001',
    name: 'ISO/IEC 27001',
    version: '2022',
    description: 'Information security management systems standard',
    status: 'active',
    region: 'global',
    lastUpdated: new Date('2022-10-25'),
    categories: [
      {
        id: 'a5',
        name: 'A.5 Information Security Policies',
        description: 'Management direction and support for information security',
        frameworkId: 'iso-27001',
        controls: ['a5-1-1', 'a5-1-2']
      }
    ],
    controls: [
      {
        id: 'a5-1-1',
        frameworkId: 'iso-27001',
        categoryId: 'a5',
        title: 'Policies for Information Security',
        description: 'Information security policy and topic-specific policies shall be defined',
        implementationGuidance: 'Develop comprehensive information security policies',
        priority: 'high',
        status: 'implemented',
        mappings: [],
        evidence: [],
        maturityLevel: 4
      }
    ]
  },
  {
    id: 'cmmc-2',
    name: 'CMMC',
    version: '2.0',
    description: 'Cybersecurity Maturity Model Certification',
    status: 'active',
    region: 'us',
    lastUpdated: new Date('2021-11-04'),
    categories: [
      {
        id: 'ac',
        name: 'Access Control (AC)',
        description: 'Control access to systems and data',
        frameworkId: 'cmmc-2',
        controls: ['ac-1', 'ac-2']
      }
    ],
    controls: [
      {
        id: 'ac-1',
        frameworkId: 'cmmc-2',
        categoryId: 'ac',
        title: 'Account Management',
        description: 'Manage system accounts, group memberships, privileges, and authorizations',
        implementationGuidance: 'Implement account lifecycle management processes',
        priority: 'high',
        status: 'in-progress',
        mappings: [],
        evidence: [],
        maturityLevel: 2
      }
    ]
  }
];

export const mockControlMappings: ControlMapping[] = [
  {
    id: 'mapping-1',
    sourceFramework: 'nist-csf-2',
    sourceControl: 'gv-1',
    targetFramework: 'iso-27001',
    targetControl: 'a5-1-1',
    mappingType: 'related',
    confidence: 85,
    notes: 'Both controls address organizational governance and policy establishment'
  }
];

export const mockGovernanceItems: GovernanceItem[] = [
  {
    id: 'gov-1',
    type: 'task',
    title: 'Update Information Security Policy',
    description: 'Annual review and update of enterprise information security policy',
    status: 'in-progress',
    priority: 'high',
    assignee: mockUsers[1],
    dueDate: new Date('2024-03-15'),
    framework: ['iso-27001', 'nist-csf-2'],
    createdDate: new Date('2024-02-01'),
    lastModified: new Date('2024-02-20'),
    tags: ['policy', 'annual-review'],
    attachments: []
  },
  {
    id: 'gov-2',
    type: 'risk',
    title: 'Cloud Infrastructure Security Risk',
    description: 'Assess security risks in cloud migration initiative',
    status: 'pending',
    priority: 'critical',
    assignee: mockUsers[2],
    dueDate: new Date('2024-03-30'),
    framework: ['nist-csf-2'],
    createdDate: new Date('2024-02-15'),
    lastModified: new Date('2024-02-15'),
    tags: ['cloud', 'migration', 'risk-assessment'],
    attachments: []
  }
];

export const mockRiskRegister: RiskRegisterItem[] = [
  {
    id: 'risk-1',
    title: 'Ransomware Attack on Critical Systems',
    description: 'Risk of ransomware compromising critical business operations',
    category: 'Cybersecurity',
    likelihood: 3,
    impact: 5,
    riskScore: 15,
    inherentRisk: 20,
    residualRisk: 15,
    mitigation: 'Enhanced backup procedures, employee training, and endpoint protection',
    owner: 'Sarah Chen',
    status: 'mitigating',
    dueDate: new Date('2024-04-01'),
    relatedControls: ['gv-2', 'pr-1'],
    lastReview: new Date('2024-02-01'),
    nextReview: new Date('2024-05-01')
  },
  {
    id: 'risk-2',
    title: 'Third-Party Data Breach',
    description: 'Risk of data breach through third-party vendor systems',
    category: 'Supply Chain',
    likelihood: 2,
    impact: 4,
    riskScore: 8,
    inherentRisk: 12,
    residualRisk: 8,
    mitigation: 'Vendor security assessments and contractual requirements',
    owner: 'Michael Rodriguez',
    status: 'monitoring',
    dueDate: new Date('2024-06-01'),
    relatedControls: ['id-2'],
    lastReview: new Date('2024-01-15'),
    nextReview: new Date('2024-04-15')
  }
];

export const mockMaturityDomains: MaturityDomain[] = [
  {
    id: 'domain-1',
    name: 'Identity & Access Management',
    description: 'Management of digital identities and access controls',
    currentLevel: 3,
    targetLevel: 4,
    assessmentDate: new Date('2024-01-15'),
    nextAssessment: new Date('2024-07-15'),
    trend: 'improving',
    benchmarkScore: 3.2,
    subDomains: [
      {
        id: 'subdomain-1',
        name: 'User Provisioning',
        currentLevel: 3,
        targetLevel: 4,
        progress: 65,
        dependencies: ['subdomain-2']
      },
      {
        id: 'subdomain-2',
        name: 'Privileged Access',
        currentLevel: 2,
        targetLevel: 4,
        progress: 40,
        dependencies: []
      }
    ]
  },
  {
    id: 'domain-2',
    name: 'Data Protection',
    description: 'Protection of sensitive data throughout its lifecycle',
    currentLevel: 2,
    targetLevel: 3,
    assessmentDate: new Date('2024-01-10'),
    nextAssessment: new Date('2024-07-10'),
    trend: 'stable',
    benchmarkScore: 2.8,
    subDomains: [
      {
        id: 'subdomain-3',
        name: 'Data Classification',
        currentLevel: 2,
        targetLevel: 3,
        progress: 30,
        dependencies: []
      }
    ]
  }
];

export const mockIntelligenceInsights: IntelligenceInsight[] = [
  {
    id: 'insight-1',
    type: 'predictive',
    source: 'threatIntel',
    confidence: 87,
    impact: 'high',
    title: 'Elevated Ransomware Risk Detected',
    description: 'Analysis indicates 23% increase in ransomware targeting your industry sector',
    actionable: true,
    relatedItems: ['risk-1'],
    timestamp: new Date('2024-02-20T10:30:00'),
    acknowledged: false
  },
  {
    id: 'insight-2',
    type: 'recommendation',
    source: 'intelligence',
    confidence: 92,
    impact: 'medium',
    title: 'Optimization Opportunity: Access Controls',
    description: 'Consolidating access control tools could reduce complexity by 35%',
    actionable: true,
    relatedItems: ['domain-1'],
    timestamp: new Date('2024-02-19T14:15:00'),
    acknowledged: false
  },
  {
    id: 'insight-3',
    type: 'correlation',
    source: 'threatIntel',
    confidence: 78,
    impact: 'medium',
    title: 'Vendor Risk Correlation',
    description: 'Three vendors show similar security posture degradation patterns',
    actionable: true,
    relatedItems: ['risk-2'],
    timestamp: new Date('2024-02-18T09:45:00'),
    acknowledged: true
  }
];

export const mockExecutiveMetrics: ExecutiveMetrics = {
  overallRiskScore: 7.2, // Out of 10
  complianceStatus: [
    {
      frameworkId: 'nist-csf-2',
      frameworkName: 'NIST CSF 2.0',
      score: 82,
      maxScore: 100,
      percentage: 82,
      status: 'partially-compliant',
      lastAssessment: new Date('2024-02-01')
    },
    {
      frameworkId: 'iso-27001',
      frameworkName: 'ISO/IEC 27001:2022',
      score: 76,
      maxScore: 100,
      percentage: 76,
      status: 'partially-compliant',
      lastAssessment: new Date('2024-01-15')
    }
  ],
  budgetUtilization: {
    totalBudget: 2500000,
    allocatedBudget: 2300000,
    spentBudget: 1850000,
    remainingBudget: 450000,
    categories: [
      { id: 'tools', name: 'Security Tools', allocated: 800000, spent: 650000, percentage: 81.25 },
      { id: 'training', name: 'Training & Awareness', allocated: 300000, spent: 280000, percentage: 93.33 },
      { id: 'consulting', name: 'Consulting Services', allocated: 500000, spent: 420000, percentage: 84 },
      { id: 'compliance', name: 'Compliance & Audit', allocated: 700000, spent: 500000, percentage: 71.43 }
    ],
    forecast: [
      { month: 'Mar 2024', projected: 200000 },
      { month: 'Apr 2024', projected: 180000 },
      { month: 'May 2024', projected: 150000 }
    ]
  },
  maturityProgression: [
    {
      domainId: 'domain-1',
      domainName: 'Identity & Access Management',
      currentLevel: 3,
      targetLevel: 4,
      progress: 65,
      trend: 'improving'
    },
    {
      domainId: 'domain-2',
      domainName: 'Data Protection',
      currentLevel: 2,
      targetLevel: 3,
      progress: 30,
      trend: 'stable'
    }
  ],
  keyRiskIndicators: [
    {
      id: 'kri-1',
      name: 'Mean Time to Detect',
      description: 'Average time to detect security incidents',
      value: 4.2,
      threshold: 6.0,
      unit: 'hours',
      status: 'normal',
      trend: 'improving',
      lastUpdated: new Date('2024-02-20')
    },
    {
      id: 'kri-2',
      name: 'Patch Management SLA',
      description: 'Percentage of critical patches applied within SLA',
      value: 92,
      threshold: 95,
      unit: '%',
      status: 'warning',
      trend: 'stable',
      lastUpdated: new Date('2024-02-19')
    }
  ],
  recommendations: [
    {
      id: 'rec-1',
      title: 'Enhance Multi-Factor Authentication',
      description: 'Expand MFA coverage to all privileged accounts',
      priority: 'high',
      category: 'Access Control',
      estimatedEffort: '2-3 weeks',
      estimatedCost: 50000,
      expectedImpact: 'Reduce authentication-related risks by 85%',
      relatedFrameworks: ['nist-csf-2', 'iso-27001'],
      dueDate: new Date('2024-03-31'),
      assignee: 'Michael Rodriguez'
    }
  ],
  trendData: [
    { period: 'Jan 2024', value: 7.8, metric: 'Risk Score' },
    { period: 'Feb 2024', value: 7.2, metric: 'Risk Score' },
    { period: 'Jan 2024', value: 78, metric: 'Compliance Score' },
    { period: 'Feb 2024', value: 82, metric: 'Compliance Score' }
  ]
};

export const mockEvidence: Evidence[] = [
  {
    id: 'evidence-1',
    controlId: 'gv-1',
    title: 'Information Security Policy Document',
    description: 'Current version of enterprise information security policy',
    type: 'document',
    url: '/documents/security-policy-v2.pdf',
    uploadDate: new Date('2024-02-01'),
    uploadedBy: 'Emma Thompson',
    reviewStatus: 'approved',
    reviewedBy: 'Sarah Chen',
    reviewDate: new Date('2024-02-05'),
    tags: ['policy', 'governance', 'approved']
  },
  {
    id: 'evidence-2',
    controlId: 'gv-2',
    title: 'Risk Management Framework Documentation',
    description: 'Enterprise risk management framework and procedures',
    type: 'document',
    uploadDate: new Date('2024-02-10'),
    uploadedBy: 'Michael Rodriguez',
    reviewStatus: 'pending',
    tags: ['risk-management', 'framework', 'pending-review']
  }
];

// Helper function to generate additional mock data
export const generateMockAssessmentData = (frameworkId: string, userId: string) => {
  return {
    id: `assessment-${Date.now()}`,
    frameworkId,
    userId,
    startDate: new Date(),
    status: 'in-progress',
    progress: Math.floor(Math.random() * 100),
    findings: Math.floor(Math.random() * 20),
    score: Math.random() * 5
  };
};

export const mockIntegrationData = {
  threatIntel: {
    threatLevel: 'elevated',
    activeThreats: 12,
    newVulnerabilities: 8,
    lastUpdate: new Date('2024-02-20T15:30:00')
  },
  cyberCorrect: {
    findingsOpen: 23,
    findingsClosed: 156,
    complianceScore: 82,
    lastUpdate: new Date('2024-02-20T16:45:00')
  },
  ermitsTraining: {
    trainingCompletion: 94,
    phishingTestPass: 89,
    certificationProgress: 67,
    lastUpdate: new Date('2024-02-20T11:15:00')
  }
};