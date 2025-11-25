// Source: ERMITS-AUDITOR-main/src/data/complianceFrameworks.ts
// Sanitized: Removed type imports, using loose types for compatibility

export const complianceFrameworks: Record<string, any> = {
  'nist_csf': {
    name: 'NIST Cybersecurity Framework',
    version: '2.0',
    releaseDate: '2024-02-26',
    domains: ['Govern', 'Identify', 'Protect', 'Detect', 'Respond', 'Recover'],
    totalControls: 106,
    description: 'Comprehensive cybersecurity risk management framework',
    industry: 'All Industries',
    complexity: 'Advanced',
    maturityLevels: ['Partial', 'Risk Informed', 'Repeatable', 'Adaptive'],
    regulatoryMapping: ['SOX', 'FISMA', 'HIPAA'],
    icon: null // Removed icon import for compatibility
  },
  'iso_27001': {
    name: 'ISO/IEC 27001:2022',
    version: '2022',
    releaseDate: '2022-10-25',
    domains: ['Information Security Policies', 'Organization of Information Security', 'Human Resource Security', 'Asset Management', 'Access Control', 'Cryptography', 'Physical Security', 'Operations Security', 'Communications Security', 'System Acquisition', 'Supplier Relationships', 'Information Security Incident Management', 'Business Continuity', 'Compliance'],
    totalControls: 10,
    description: 'International standard for information security management systems',
    industry: 'Global Standard',
    complexity: 'Expert',
    maturityLevels: ['Basic', 'Managed', 'Defined', 'Quantitatively Managed', 'Optimizing'],
    regulatoryMapping: ['GDPR', 'NIS2', 'EU AI Act'],
    icon: null
  },
  'soc2': {
    name: 'SOC 2 Type II',
    version: '2017',
    releaseDate: '2017-05-01',
    domains: ['Security', 'Availability', 'Processing Integrity', 'Confidentiality', 'Privacy'],
    totalControls: 64,
    description: 'Trust services criteria for service organizations',
    industry: 'Service Providers',
    complexity: 'Intermediate',
    maturityLevels: ['Informal', 'Planned', 'Well-Defined', 'Quantitatively Controlled', 'Continuously Improving'],
    regulatoryMapping: ['HIPAA', 'PCI DSS', 'GLBA'],
    icon: null
  },
  'pci_dss': {
    name: 'PCI DSS',
    version: '4.0.1',
    releaseDate: '2024-04-30',
    domains: ['Build and Maintain Secure Network', 'Protect Cardholder Data', 'Maintain Vulnerability Management Program', 'Implement Strong Access Control Measures', 'Regularly Monitor and Test Networks', 'Maintain Information Security Policy'],
    totalControls: 362,
    description: 'Payment card industry data security standard',
    industry: 'Payment Processing',
    complexity: 'Expert',
    maturityLevels: ['Level 1', 'Level 2', 'Level 3', 'Level 4'],
    regulatoryMapping: ['GDPR', 'CCPA', 'SOX'],
    icon: null
  },
  'hipaa': {
    name: 'HIPAA Security Rule',
    version: '2013',
    releaseDate: '2013-01-25',
    domains: ['Administrative Safeguards', 'Physical Safeguards', 'Technical Safeguards'],
    totalControls: 21,
    description: 'Healthcare information privacy and security requirements',
    industry: 'Healthcare',
    complexity: 'Intermediate',
    maturityLevels: ['Basic', 'Standard', 'Comprehensive', 'Advanced'],
    regulatoryMapping: ['HITECH', 'FDA 21 CFR Part 11', 'State Privacy Laws'],
    icon: null
  },
  'nist_800_171': {
    name: 'NIST SP 800-171',
    version: 'Rev 2',
    releaseDate: '2020-02-01',
    domains: ['Access Control', 'Awareness and Training', 'Audit and Accountability', 'Configuration Management', 'Identification and Authentication', 'Incident Response', 'Maintenance', 'Media Protection', 'Personnel Security', 'Physical Protection', 'Risk Assessment', 'Security Assessment', 'System and Communications Protection', 'System and Information Integrity'],
    totalControls: 110,
    description: 'Protecting Controlled Unclassified Information in nonfederal systems',
    industry: 'Government Contractors',
    complexity: 'Advanced',
    maturityLevels: ['Basic', 'Derived', 'Tailored'],
    regulatoryMapping: ['DFARS', 'CMMC', 'FISMA'],
    icon: null
  },
  'ferpa': {
    name: 'FERPA',
    version: '2012',
    releaseDate: '2012-01-03',
    domains: ['Student Access Rights', 'Disclosure Controls', 'Directory Information', 'Security Safeguards'],
    totalControls: 11,
    description: 'Family Educational Rights and Privacy Act for student education records',
    industry: 'Education',
    complexity: 'Intermediate',
    maturityLevels: ['Basic', 'Standard', 'Comprehensive', 'Advanced'],
    regulatoryMapping: ['COPPA', 'State Privacy Laws', 'PPRA'],
    icon: null
  }
};

