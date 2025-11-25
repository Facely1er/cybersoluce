/**
 * Security Policies Data
 * Comprehensive policy repository for compliance frameworks
 */

export interface SecurityPolicy {
  id: string;
  name: string;
  description: string;
  category: string;
  priority: 'critical' | 'high' | 'medium' | 'low';
  frequencyOfUse: string;
  complianceMapping: string[];
  tags: string[];
  lastUpdated: string | Date;
  templateAvailable?: boolean;
  version?: string;
  documentType?: string;
  spanOfUse?: string;
  businessImpact?: string;
  owner?: string;
  approver?: string;
  reviewFrequency?: string;
  estimatedImplementationTime?: string;
  implementationGuidance?: string;
  complianceRequirements?: Array<{
    framework: string;
    mandatory: boolean;
    controls: string[];
  }>;
}

export const securityPolicies: SecurityPolicy[] = [
  {
    id: 'acc-001',
    name: 'Access Control Policy',
    description: 'Defines requirements for user access management, authentication, and authorization across all systems and applications.',
    category: 'Access Control',
    priority: 'critical',
    frequencyOfUse: 'Daily',
    complianceMapping: ['NIST CSF', 'ISO 27001', 'SOC 2', 'HIPAA'],
    tags: ['access-control', 'authentication', 'authorization', 'identity-management'],
    lastUpdated: new Date('2024-01-15'),
    templateAvailable: true,
    version: '2.1',
    documentType: 'Policy',
    spanOfUse: 'Organization-wide',
    businessImpact: 'High',
    owner: 'IT Security Team',
    approver: 'CISO',
    reviewFrequency: 'Annual',
    estimatedImplementationTime: '2-4 weeks',
    implementationGuidance: 'Implement role-based access control (RBAC), enforce least privilege principles, and establish regular access reviews.',
    complianceRequirements: [
      { framework: 'NIST CSF', mandatory: true, controls: ['PR.AC-1', 'PR.AC-3', 'PR.AC-4'] },
      { framework: 'ISO 27001', mandatory: true, controls: ['A.9.1', 'A.9.2', 'A.9.4'] },
      { framework: 'SOC 2', mandatory: true, controls: ['CC6.1', 'CC6.2'] }
    ]
  },
  {
    id: 'inc-001',
    name: 'Incident Response Policy',
    description: 'Establishes procedures for detecting, responding to, and recovering from security incidents.',
    category: 'Incident Management',
    priority: 'critical',
    frequencyOfUse: 'As needed',
    complianceMapping: ['NIST CSF', 'ISO 27001', 'HIPAA'],
    tags: ['incident-response', 'security-operations', 'breach-response'],
    lastUpdated: new Date('2024-02-01'),
    templateAvailable: true,
    version: '3.0',
    documentType: 'Policy',
    spanOfUse: 'Organization-wide',
    businessImpact: 'Critical',
    owner: 'Security Operations',
    approver: 'CISO',
    reviewFrequency: 'Semi-annual',
    estimatedImplementationTime: '4-6 weeks',
    implementationGuidance: 'Establish incident response team, define escalation procedures, and conduct regular tabletop exercises.',
    complianceRequirements: [
      { framework: 'NIST CSF', mandatory: true, controls: ['RS.RP-1', 'RS.CO-1', 'RS.CO-2'] },
      { framework: 'ISO 27001', mandatory: true, controls: ['A.16.1'] }
    ]
  },
  {
    id: 'data-001',
    name: 'Data Classification and Handling Policy',
    description: 'Defines data classification levels and handling requirements for different types of sensitive information.',
    category: 'Data Protection',
    priority: 'critical',
    frequencyOfUse: 'Daily',
    complianceMapping: ['NIST CSF', 'ISO 27001', 'HIPAA', 'GDPR'],
    tags: ['data-classification', 'data-protection', 'privacy', 'pii'],
    lastUpdated: new Date('2024-01-20'),
    templateAvailable: true,
    version: '2.3',
    documentType: 'Policy',
    spanOfUse: 'Organization-wide',
    businessImpact: 'High',
    owner: 'Data Protection Officer',
    approver: 'CISO',
    reviewFrequency: 'Annual',
    estimatedImplementationTime: '3-5 weeks',
    implementationGuidance: 'Classify all data assets, implement data loss prevention (DLP) tools, and train staff on data handling procedures.',
    complianceRequirements: [
      { framework: 'NIST CSF', mandatory: true, controls: ['PR.DS-1', 'PR.DS-2'] },
      { framework: 'HIPAA', mandatory: true, controls: ['164.308(a)(3)', '164.312(a)(2)'] },
      { framework: 'GDPR', mandatory: true, controls: ['Article 32'] }
    ]
  },
  {
    id: 'pwd-001',
    name: 'Password Management Policy',
    description: 'Establishes requirements for password creation, storage, and management to ensure strong authentication.',
    category: 'Access Control',
    priority: 'high',
    frequencyOfUse: 'Daily',
    complianceMapping: ['NIST CSF', 'ISO 27001', 'SOC 2'],
    tags: ['password', 'authentication', 'credential-management'],
    lastUpdated: new Date('2024-01-10'),
    templateAvailable: true,
    version: '2.0',
    documentType: 'Policy',
    spanOfUse: 'Organization-wide',
    businessImpact: 'Medium',
    owner: 'IT Security Team',
    approver: 'IT Director',
    reviewFrequency: 'Annual',
    estimatedImplementationTime: '1-2 weeks',
    implementationGuidance: 'Enforce password complexity requirements, implement password managers, and enable multi-factor authentication.',
    complianceRequirements: [
      { framework: 'NIST CSF', mandatory: true, controls: ['PR.AC-1'] },
      { framework: 'ISO 27001', mandatory: true, controls: ['A.9.4.3'] }
    ]
  },
  {
    id: 'enc-001',
    name: 'Encryption Policy',
    description: 'Defines encryption requirements for data at rest and in transit to protect sensitive information.',
    category: 'Data Protection',
    priority: 'high',
    frequencyOfUse: 'Daily',
    complianceMapping: ['NIST CSF', 'ISO 27001', 'HIPAA', 'PCI DSS'],
    tags: ['encryption', 'data-protection', 'cryptography'],
    lastUpdated: new Date('2024-01-25'),
    templateAvailable: true,
    version: '1.8',
    documentType: 'Policy',
    spanOfUse: 'Organization-wide',
    businessImpact: 'High',
    owner: 'IT Security Team',
    approver: 'CISO',
    reviewFrequency: 'Annual',
    estimatedImplementationTime: '4-8 weeks',
    implementationGuidance: 'Implement encryption for all sensitive data, use strong encryption algorithms (AES-256), and manage encryption keys securely.',
    complianceRequirements: [
      { framework: 'NIST CSF', mandatory: true, controls: ['PR.DS-1'] },
      { framework: 'HIPAA', mandatory: true, controls: ['164.312(a)(2)(iv)'] },
      { framework: 'PCI DSS', mandatory: true, controls: ['Requirement 3', 'Requirement 4'] }
    ]
  },
  {
    id: 'backup-001',
    name: 'Backup and Recovery Policy',
    description: 'Establishes procedures for regular data backups and disaster recovery to ensure business continuity.',
    category: 'Business Continuity',
    priority: 'high',
    frequencyOfUse: 'Weekly',
    complianceMapping: ['NIST CSF', 'ISO 27001', 'SOC 2'],
    tags: ['backup', 'disaster-recovery', 'business-continuity'],
    lastUpdated: new Date('2024-01-18'),
    templateAvailable: true,
    version: '2.2',
    documentType: 'Policy',
    spanOfUse: 'Organization-wide',
    businessImpact: 'High',
    owner: 'IT Operations',
    approver: 'IT Director',
    reviewFrequency: 'Semi-annual',
    estimatedImplementationTime: '3-6 weeks',
    implementationGuidance: 'Implement automated backup systems, test recovery procedures regularly, and maintain off-site backups.',
    complianceRequirements: [
      { framework: 'NIST CSF', mandatory: true, controls: ['RC.RP-1', 'RC.IM-1'] },
      { framework: 'ISO 27001', mandatory: true, controls: ['A.12.3'] }
    ]
  },
  {
    id: 'vuln-001',
    name: 'Vulnerability Management Policy',
    description: 'Defines processes for identifying, assessing, and remediating security vulnerabilities.',
    category: 'Security Operations',
    priority: 'high',
    frequencyOfUse: 'Weekly',
    complianceMapping: ['NIST CSF', 'ISO 27001', 'SOC 2'],
    tags: ['vulnerability-management', 'patch-management', 'security-operations'],
    lastUpdated: new Date('2024-02-05'),
    templateAvailable: true,
    version: '1.9',
    documentType: 'Policy',
    spanOfUse: 'Organization-wide',
    businessImpact: 'High',
    owner: 'Security Operations',
    approver: 'CISO',
    reviewFrequency: 'Quarterly',
    estimatedImplementationTime: '4-6 weeks',
    implementationGuidance: 'Implement vulnerability scanning tools, establish patch management procedures, and prioritize critical vulnerabilities.',
    complianceRequirements: [
      { framework: 'NIST CSF', mandatory: true, controls: ['DE.CM-1', 'RS.MI-1'] },
      { framework: 'ISO 27001', mandatory: true, controls: ['A.12.6'] }
    ]
  },
  {
    id: 'aware-001',
    name: 'Security Awareness and Training Policy',
    description: 'Establishes requirements for security awareness training and education programs for all personnel.',
    category: 'Training',
    priority: 'medium',
    frequencyOfUse: 'Quarterly',
    complianceMapping: ['NIST CSF', 'ISO 27001', 'HIPAA'],
    tags: ['training', 'awareness', 'education', 'phishing'],
    lastUpdated: new Date('2024-01-12'),
    templateAvailable: true,
    version: '1.5',
    documentType: 'Policy',
    spanOfUse: 'Organization-wide',
    businessImpact: 'Medium',
    owner: 'Human Resources',
    approver: 'CISO',
    reviewFrequency: 'Annual',
    estimatedImplementationTime: '2-3 weeks',
    implementationGuidance: 'Develop training materials, conduct regular security awareness sessions, and perform phishing simulations.',
    complianceRequirements: [
      { framework: 'NIST CSF', mandatory: true, controls: ['PR.AT-1', 'PR.AT-2'] },
      { framework: 'ISO 27001', mandatory: true, controls: ['A.7.2.2'] }
    ]
  },
  {
    id: 'info-001',
    name: 'Information Security Policy',
    description: 'Overarching policy establishing the organization\'s commitment to information security and defining the ISMS framework.',
    category: 'Compliance',
    priority: 'critical',
    frequencyOfUse: 'Daily',
    complianceMapping: ['NIST CSF', 'ISO 27001', 'SOC 2'],
    tags: ['information-security', 'governance', 'isms', 'framework'],
    lastUpdated: new Date('2024-01-05'),
    templateAvailable: true,
    version: '3.0',
    documentType: 'Policy',
    spanOfUse: 'Organization-wide',
    businessImpact: 'Critical',
    owner: 'CISO',
    approver: 'CEO',
    reviewFrequency: 'Annual',
    estimatedImplementationTime: '2-3 weeks',
    implementationGuidance: 'Define security objectives, establish governance structure, and communicate policy to all stakeholders.',
    complianceRequirements: [
      { framework: 'ISO 27001', mandatory: true, controls: ['A.5.1.1', 'A.5.1.2'] },
      { framework: 'NIST CSF', mandatory: true, controls: ['GV.OC-1', 'GV.RM-1'] }
    ]
  },
  {
    id: 'net-001',
    name: 'Network Security Policy',
    description: 'Defines requirements for network architecture, segmentation, firewall configuration, and network monitoring.',
    category: 'Network Security',
    priority: 'critical',
    frequencyOfUse: 'Daily',
    complianceMapping: ['NIST CSF', 'ISO 27001', 'SOC 2', 'NIS2'],
    tags: ['network-security', 'firewall', 'segmentation', 'monitoring'],
    lastUpdated: new Date('2024-01-22'),
    templateAvailable: true,
    version: '2.4',
    documentType: 'Policy',
    spanOfUse: 'Organization-wide',
    businessImpact: 'High',
    owner: 'Network Security Team',
    approver: 'CISO',
    reviewFrequency: 'Semi-annual',
    estimatedImplementationTime: '4-8 weeks',
    implementationGuidance: 'Implement network segmentation, configure firewalls and IDS/IPS, establish network monitoring, and enforce secure network protocols.',
    complianceRequirements: [
      { framework: 'NIST CSF', mandatory: true, controls: ['PR.DS-5', 'PR.AC-5'] },
      { framework: 'ISO 27001', mandatory: true, controls: ['A.13.1', 'A.13.2'] },
      { framework: 'NIS2', mandatory: true, controls: ['Network Security'] }
    ]
  },
  {
    id: 'net-002',
    name: 'Wireless Network Security Policy',
    description: 'Establishes security requirements for wireless network infrastructure and device connections.',
    category: 'Network Security',
    priority: 'high',
    frequencyOfUse: 'Daily',
    complianceMapping: ['NIST CSF', 'ISO 27001', 'PCI DSS'],
    tags: ['wireless', 'wifi', 'network-security', 'authentication'],
    lastUpdated: new Date('2024-01-28'),
    templateAvailable: true,
    version: '1.7',
    documentType: 'Policy',
    spanOfUse: 'Organization-wide',
    businessImpact: 'Medium',
    owner: 'Network Security Team',
    approver: 'IT Director',
    reviewFrequency: 'Annual',
    estimatedImplementationTime: '2-4 weeks',
    implementationGuidance: 'Use WPA3 encryption, implement network access control, disable SSID broadcasting for sensitive networks, and monitor wireless traffic.',
    complianceRequirements: [
      { framework: 'NIST CSF', mandatory: true, controls: ['PR.AC-5'] },
      { framework: 'ISO 27001', mandatory: true, controls: ['A.13.1.3'] }
    ]
  },
  {
    id: 'phys-001',
    name: 'Physical Security Policy',
    description: 'Defines physical security controls for facilities, equipment, and sensitive areas.',
    category: 'Physical Security',
    priority: 'high',
    frequencyOfUse: 'Daily',
    complianceMapping: ['NIST CSF', 'ISO 27001', 'SOC 2'],
    tags: ['physical-security', 'facilities', 'access-control', 'surveillance'],
    lastUpdated: new Date('2024-01-30'),
    templateAvailable: true,
    version: '2.1',
    documentType: 'Policy',
    spanOfUse: 'Organization-wide',
    businessImpact: 'High',
    owner: 'Facilities Management',
    approver: 'CISO',
    reviewFrequency: 'Annual',
    estimatedImplementationTime: '6-12 weeks',
    implementationGuidance: 'Implement access control systems, surveillance cameras, secure storage for sensitive equipment, and visitor management procedures.',
    complianceRequirements: [
      { framework: 'ISO 27001', mandatory: true, controls: ['A.11.1', 'A.11.2'] },
      { framework: 'NIST CSF', mandatory: true, controls: ['PR.DS-5'] }
    ]
  },
  {
    id: 'phys-002',
    name: 'Environmental Security Policy',
    description: 'Establishes requirements for environmental controls, power systems, and climate management in data centers.',
    category: 'Physical Security',
    priority: 'high',
    frequencyOfUse: 'Daily',
    complianceMapping: ['ISO 27001', 'SOC 2'],
    tags: ['environmental', 'data-center', 'power', 'climate-control'],
    lastUpdated: new Date('2024-02-02'),
    templateAvailable: true,
    version: '1.6',
    documentType: 'Policy',
    spanOfUse: 'Data Centers',
    businessImpact: 'High',
    owner: 'IT Operations',
    approver: 'IT Director',
    reviewFrequency: 'Annual',
    estimatedImplementationTime: '4-8 weeks',
    implementationGuidance: 'Implement UPS systems, backup generators, climate control systems, fire suppression, and environmental monitoring.',
    complianceRequirements: [
      { framework: 'ISO 27001', mandatory: true, controls: ['A.11.2'] }
    ]
  },
  {
    id: 'vendor-001',
    name: 'Third-Party Risk Management Policy',
    description: 'Establishes processes for assessing, monitoring, and managing security risks from third-party vendors and suppliers.',
    category: 'Third-Party Management',
    priority: 'critical',
    frequencyOfUse: 'Monthly',
    complianceMapping: ['NIST CSF', 'ISO 27001', 'SOC 2', 'NIS2'],
    tags: ['vendor-management', 'third-party', 'risk-assessment', 'supply-chain'],
    lastUpdated: new Date('2024-02-10'),
    templateAvailable: true,
    version: '2.3',
    documentType: 'Policy',
    spanOfUse: 'Organization-wide',
    businessImpact: 'High',
    owner: 'Procurement',
    approver: 'CISO',
    reviewFrequency: 'Annual',
    estimatedImplementationTime: '4-6 weeks',
    implementationGuidance: 'Conduct vendor security assessments, establish contract security requirements, implement continuous monitoring, and maintain vendor inventory.',
    complianceRequirements: [
      { framework: 'NIST CSF', mandatory: true, controls: ['GV.SC-1', 'GV.SC-2'] },
      { framework: 'ISO 27001', mandatory: true, controls: ['A.15.1', 'A.15.2'] },
      { framework: 'NIS2', mandatory: true, controls: ['Supply Chain Security'] }
    ]
  },
  {
    id: 'vendor-002',
    name: 'Cloud Service Provider Security Policy',
    description: 'Defines security requirements and assessment criteria for cloud service providers.',
    category: 'Third-Party Management',
    priority: 'high',
    frequencyOfUse: 'Quarterly',
    complianceMapping: ['NIST CSF', 'ISO 27001', 'SOC 2'],
    tags: ['cloud', 'saas', 'csp', 'vendor-management'],
    lastUpdated: new Date('2024-02-15'),
    templateAvailable: true,
    version: '1.8',
    documentType: 'Policy',
    spanOfUse: 'Cloud Services',
    businessImpact: 'High',
    owner: 'IT Security Team',
    approver: 'CISO',
    reviewFrequency: 'Annual',
    estimatedImplementationTime: '3-5 weeks',
    implementationGuidance: 'Assess CSP security certifications, review data residency requirements, establish data processing agreements, and implement cloud security controls.',
    complianceRequirements: [
      { framework: 'NIST CSF', mandatory: true, controls: ['GV.SC-1'] },
      { framework: 'ISO 27001', mandatory: true, controls: ['A.15.2'] }
    ]
  },
  {
    id: 'ops-001',
    name: 'Change Management Policy',
    description: 'Establishes procedures for managing changes to systems, applications, and infrastructure to minimize security risks.',
    category: 'Security Operations',
    priority: 'high',
    frequencyOfUse: 'Weekly',
    complianceMapping: ['NIST CSF', 'ISO 27001', 'SOC 2'],
    tags: ['change-management', 'operations', 'itil', 'governance'],
    lastUpdated: new Date('2024-01-25'),
    templateAvailable: true,
    version: '2.0',
    documentType: 'Policy',
    spanOfUse: 'IT Operations',
    businessImpact: 'High',
    owner: 'IT Operations',
    approver: 'IT Director',
    reviewFrequency: 'Annual',
    estimatedImplementationTime: '3-4 weeks',
    implementationGuidance: 'Establish change advisory board, implement change request process, require security review for all changes, and maintain change logs.',
    complianceRequirements: [
      { framework: 'ISO 27001', mandatory: true, controls: ['A.12.1.2'] },
      { framework: 'SOC 2', mandatory: true, controls: ['CC7.2'] }
    ]
  },
  {
    id: 'ops-002',
    name: 'Logging and Monitoring Policy',
    description: 'Defines requirements for security event logging, log retention, and security monitoring activities.',
    category: 'Security Operations',
    priority: 'critical',
    frequencyOfUse: 'Daily',
    complianceMapping: ['NIST CSF', 'ISO 27001', 'SOC 2', 'HIPAA'],
    tags: ['logging', 'monitoring', 'siem', 'audit-trail'],
    lastUpdated: new Date('2024-02-08'),
    templateAvailable: true,
    version: '2.2',
    documentType: 'Policy',
    spanOfUse: 'Organization-wide',
    businessImpact: 'High',
    owner: 'Security Operations',
    approver: 'CISO',
    reviewFrequency: 'Annual',
    estimatedImplementationTime: '4-6 weeks',
    implementationGuidance: 'Implement centralized logging, configure SIEM systems, establish log retention policies, and implement real-time alerting.',
    complianceRequirements: [
      { framework: 'NIST CSF', mandatory: true, controls: ['DE.AE-1', 'DE.CM-1'] },
      { framework: 'ISO 27001', mandatory: true, controls: ['A.12.4'] },
      { framework: 'HIPAA', mandatory: true, controls: ['164.312(b)'] }
    ]
  },
  {
    id: 'ops-003',
    name: 'System Hardening Policy',
    description: 'Establishes baseline security configurations and hardening requirements for systems and applications.',
    category: 'Security Operations',
    priority: 'high',
    frequencyOfUse: 'Monthly',
    complianceMapping: ['NIST CSF', 'ISO 27001', 'SOC 2'],
    tags: ['hardening', 'configuration', 'baseline', 'security'],
    lastUpdated: new Date('2024-01-20'),
    templateAvailable: true,
    version: '1.9',
    documentType: 'Policy',
    spanOfUse: 'IT Infrastructure',
    businessImpact: 'High',
    owner: 'IT Security Team',
    approver: 'CISO',
    reviewFrequency: 'Annual',
    estimatedImplementationTime: '6-10 weeks',
    implementationGuidance: 'Develop security baselines, disable unnecessary services, remove default accounts, implement least privilege, and use configuration management tools.',
    complianceRequirements: [
      { framework: 'NIST CSF', mandatory: true, controls: ['PR.IP-1'] },
      { framework: 'ISO 27001', mandatory: true, controls: ['A.12.2'] }
    ]
  },
  {
    id: 'asset-001',
    name: 'Asset Management Policy',
    description: 'Defines processes for identifying, classifying, and managing information assets throughout their lifecycle.',
    category: 'Compliance',
    priority: 'high',
    frequencyOfUse: 'Monthly',
    complianceMapping: ['NIST CSF', 'ISO 27001', 'SOC 2'],
    tags: ['asset-management', 'inventory', 'lifecycle', 'governance'],
    lastUpdated: new Date('2024-02-05'),
    templateAvailable: true,
    version: '2.1',
    documentType: 'Policy',
    spanOfUse: 'Organization-wide',
    businessImpact: 'High',
    owner: 'IT Operations',
    approver: 'IT Director',
    reviewFrequency: 'Annual',
    estimatedImplementationTime: '4-8 weeks',
    implementationGuidance: 'Maintain asset inventory, classify assets by criticality, assign asset owners, and establish asset lifecycle procedures.',
    complianceRequirements: [
      { framework: 'NIST CSF', mandatory: true, controls: ['ID.AM-1', 'ID.AM-2'] },
      { framework: 'ISO 27001', mandatory: true, controls: ['A.8.1', 'A.8.2'] }
    ]
  },
  {
    id: 'risk-001',
    name: 'Risk Management Policy',
    description: 'Establishes the framework for identifying, assessing, and managing information security risks.',
    category: 'Compliance',
    priority: 'critical',
    frequencyOfUse: 'Quarterly',
    complianceMapping: ['NIST CSF', 'ISO 27001', 'SOC 2'],
    tags: ['risk-management', 'risk-assessment', 'governance', 'strategy'],
    lastUpdated: new Date('2024-01-15'),
    templateAvailable: true,
    version: '3.1',
    documentType: 'Policy',
    spanOfUse: 'Organization-wide',
    businessImpact: 'Critical',
    owner: 'Risk Management',
    approver: 'CISO',
    reviewFrequency: 'Annual',
    estimatedImplementationTime: '6-8 weeks',
    implementationGuidance: 'Establish risk assessment methodology, conduct regular risk assessments, maintain risk register, and implement risk treatment plans.',
    complianceRequirements: [
      { framework: 'NIST CSF', mandatory: true, controls: ['ID.RA-1', 'ID.RM-1'] },
      { framework: 'ISO 27001', mandatory: true, controls: ['A.6.1.2', 'A.8.3'] }
    ]
  },
  {
    id: 'bc-001',
    name: 'Business Continuity Policy',
    description: 'Establishes the framework for maintaining business operations during disruptions and disasters.',
    category: 'Business Continuity',
    priority: 'critical',
    frequencyOfUse: 'Quarterly',
    complianceMapping: ['NIST CSF', 'ISO 27001', 'SOC 2'],
    tags: ['business-continuity', 'disaster-recovery', 'resilience', 'planning'],
    lastUpdated: new Date('2024-01-10'),
    templateAvailable: true,
    version: '2.5',
    documentType: 'Policy',
    spanOfUse: 'Organization-wide',
    businessImpact: 'Critical',
    owner: 'Business Continuity',
    approver: 'CEO',
    reviewFrequency: 'Annual',
    estimatedImplementationTime: '8-12 weeks',
    implementationGuidance: 'Develop business impact analysis, create business continuity plans, establish recovery objectives, and conduct regular testing.',
    complianceRequirements: [
      { framework: 'NIST CSF', mandatory: true, controls: ['RC.RP-1', 'RC.IM-1'] },
      { framework: 'ISO 27001', mandatory: true, controls: ['A.12.3', 'A.17.1'] }
    ]
  },
  {
    id: 'privacy-001',
    name: 'Privacy Policy',
    description: 'Defines how personal information is collected, used, stored, and protected in accordance with privacy regulations.',
    category: 'Data Protection',
    priority: 'critical',
    frequencyOfUse: 'Daily',
    complianceMapping: ['GDPR', 'CCPA', 'PIPL', 'PDPA', 'LGPD'],
    tags: ['privacy', 'gdpr', 'data-protection', 'pii', 'personal-data'],
    lastUpdated: new Date('2024-02-12'),
    templateAvailable: true,
    version: '2.8',
    documentType: 'Policy',
    spanOfUse: 'Organization-wide',
    businessImpact: 'High',
    owner: 'Data Protection Officer',
    approver: 'Legal',
    reviewFrequency: 'Annual',
    estimatedImplementationTime: '4-6 weeks',
    implementationGuidance: 'Document data processing activities, implement privacy by design, establish data subject rights procedures, and conduct privacy impact assessments.',
    complianceRequirements: [
      { framework: 'GDPR', mandatory: true, controls: ['Article 5', 'Article 6', 'Article 15-22'] },
      { framework: 'CCPA', mandatory: true, controls: ['Section 1798.100'] },
      { framework: 'PIPL', mandatory: true, controls: ['Article 6', 'Article 13'] }
    ]
  },
  {
    id: 'retention-001',
    name: 'Data Retention and Disposal Policy',
    description: 'Establishes requirements for data retention periods and secure data disposal procedures.',
    category: 'Data Protection',
    priority: 'high',
    frequencyOfUse: 'Monthly',
    complianceMapping: ['GDPR', 'HIPAA', 'SOC 2', 'ISO 27001'],
    tags: ['data-retention', 'data-disposal', 'records-management', 'compliance'],
    lastUpdated: new Date('2024-01-28'),
    templateAvailable: true,
    version: '2.0',
    documentType: 'Policy',
    spanOfUse: 'Organization-wide',
    businessImpact: 'Medium',
    owner: 'Data Protection Officer',
    approver: 'Legal',
    reviewFrequency: 'Annual',
    estimatedImplementationTime: '3-4 weeks',
    implementationGuidance: 'Define retention periods by data type, implement automated retention policies, establish secure disposal procedures, and maintain disposal logs.',
    complianceRequirements: [
      { framework: 'GDPR', mandatory: true, controls: ['Article 5(1)(e)'] },
      { framework: 'HIPAA', mandatory: true, controls: ['164.312(c)(1)'] },
      { framework: 'ISO 27001', mandatory: true, controls: ['A.8.3.1'] }
    ]
  },
  {
    id: 'hr-001',
    name: 'Human Resource Security Policy',
    description: 'Establishes security requirements for personnel throughout the employment lifecycle.',
    category: 'Training',
    priority: 'high',
    frequencyOfUse: 'As needed',
    complianceMapping: ['ISO 27001', 'NIST CSF', 'SOC 2'],
    tags: ['hr', 'personnel', 'background-checks', 'onboarding'],
    lastUpdated: new Date('2024-01-18'),
    templateAvailable: true,
    version: '1.7',
    documentType: 'Policy',
    spanOfUse: 'HR',
    businessImpact: 'High',
    owner: 'Human Resources',
    approver: 'CISO',
    reviewFrequency: 'Annual',
    estimatedImplementationTime: '2-3 weeks',
    implementationGuidance: 'Conduct background checks, implement security awareness during onboarding, establish termination procedures, and maintain confidentiality agreements.',
    complianceRequirements: [
      { framework: 'ISO 27001', mandatory: true, controls: ['A.7.1', 'A.7.2', 'A.7.3'] },
      { framework: 'NIST CSF', mandatory: true, controls: ['PR.AT-1'] }
    ]
  },
  {
    id: 'comm-001',
    name: 'Communications Security Policy',
    description: 'Defines security requirements for electronic communications, email, and messaging systems.',
    category: 'Network Security',
    priority: 'high',
    frequencyOfUse: 'Daily',
    complianceMapping: ['ISO 27001', 'NIST CSF', 'HIPAA'],
    tags: ['communications', 'email', 'messaging', 'encryption'],
    lastUpdated: new Date('2024-02-01'),
    templateAvailable: true,
    version: '1.9',
    documentType: 'Policy',
    spanOfUse: 'Organization-wide',
    businessImpact: 'Medium',
    owner: 'IT Security Team',
    approver: 'IT Director',
    reviewFrequency: 'Annual',
    estimatedImplementationTime: '3-4 weeks',
    implementationGuidance: 'Implement email encryption, establish secure communication channels, configure spam filters, and enforce secure messaging policies.',
    complianceRequirements: [
      { framework: 'ISO 27001', mandatory: true, controls: ['A.13.2'] },
      { framework: 'HIPAA', mandatory: true, controls: ['164.312(e)(1)'] }
    ]
  },
  {
    id: 'dev-001',
    name: 'Secure Development Lifecycle Policy',
    description: 'Establishes security requirements for software development, testing, and deployment processes.',
    category: 'Security Operations',
    priority: 'high',
    frequencyOfUse: 'Weekly',
    complianceMapping: ['NIST CSF', 'ISO 27001', 'SOC 2'],
    tags: ['secure-development', 'sdlc', 'code-review', 'testing'],
    lastUpdated: new Date('2024-02-05'),
    templateAvailable: true,
    version: '2.1',
    documentType: 'Policy',
    spanOfUse: 'Development',
    businessImpact: 'High',
    owner: 'Development Team',
    approver: 'CISO',
    reviewFrequency: 'Annual',
    estimatedImplementationTime: '6-10 weeks',
    implementationGuidance: 'Implement secure coding practices, conduct security code reviews, perform security testing, and establish secure deployment procedures.',
    complianceRequirements: [
      { framework: 'ISO 27001', mandatory: true, controls: ['A.14.2', 'A.14.3'] },
      { framework: 'NIST CSF', mandatory: true, controls: ['PR.DS-8'] }
    ]
  },
  {
    id: 'use-001',
    name: 'Acceptable Use Policy',
    description: 'Defines acceptable and prohibited uses of organizational information systems and resources.',
    category: 'Compliance',
    priority: 'high',
    frequencyOfUse: 'Daily',
    complianceMapping: ['ISO 27001', 'SOC 2', 'NIST CSF'],
    tags: ['acceptable-use', 'user-behavior', 'compliance', 'ethics'],
    lastUpdated: new Date('2024-01-22'),
    templateAvailable: true,
    version: '2.3',
    documentType: 'Policy',
    spanOfUse: 'Organization-wide',
    businessImpact: 'Medium',
    owner: 'IT Security Team',
    approver: 'HR Director',
    reviewFrequency: 'Annual',
    estimatedImplementationTime: '1-2 weeks',
    implementationGuidance: 'Define acceptable uses, establish monitoring procedures, implement user agreements, and enforce policy violations.',
    complianceRequirements: [
      { framework: 'ISO 27001', mandatory: true, controls: ['A.8.1.3'] },
      { framework: 'SOC 2', mandatory: true, controls: ['CC6.7'] }
    ]
  },
  {
    id: 'mobile-001',
    name: 'Mobile Device Security Policy',
    description: 'Establishes security requirements for mobile devices, BYOD programs, and mobile applications.',
    category: 'Access Control',
    priority: 'high',
    frequencyOfUse: 'Daily',
    complianceMapping: ['NIST CSF', 'ISO 27001', 'HIPAA'],
    tags: ['mobile', 'byod', 'device-management', 'mdm'],
    lastUpdated: new Date('2024-02-08'),
    templateAvailable: true,
    version: '1.8',
    documentType: 'Policy',
    spanOfUse: 'Mobile Devices',
    businessImpact: 'High',
    owner: 'IT Security Team',
    approver: 'CISO',
    reviewFrequency: 'Annual',
    estimatedImplementationTime: '4-6 weeks',
    implementationGuidance: 'Implement mobile device management (MDM), enforce device encryption, require screen locks, and establish remote wipe capabilities.',
    complianceRequirements: [
      { framework: 'NIST CSF', mandatory: true, controls: ['PR.AC-1'] },
      { framework: 'ISO 27001', mandatory: true, controls: ['A.6.2.1'] },
      { framework: 'HIPAA', mandatory: true, controls: ['164.312(a)(2)(iv)'] }
    ]
  }
];

export const policyCategories: string[] = [
  'Access Control',
  'Incident Management',
  'Data Protection',
  'Business Continuity',
  'Security Operations',
  'Training',
  'Network Security',
  'Physical Security',
  'Third-Party Management',
  'Compliance'
];

export const frameworkMappings: Record<string, string[]> = {
  'NIST CSF': [
    'acc-001', 'inc-001', 'data-001', 'pwd-001', 'enc-001', 'backup-001', 'vuln-001', 'aware-001',
    'info-001', 'net-001', 'net-002', 'vendor-001', 'vendor-002', 'ops-001', 'ops-002', 'ops-003',
    'asset-001', 'risk-001', 'bc-001', 'retention-001', 'hr-001', 'comm-001', 'dev-001', 'use-001', 'mobile-001'
  ],
  'ISO 27001': [
    'acc-001', 'inc-001', 'data-001', 'pwd-001', 'enc-001', 'backup-001', 'vuln-001', 'aware-001',
    'info-001', 'net-001', 'net-002', 'phys-001', 'phys-002', 'vendor-001', 'vendor-002', 'ops-001',
    'ops-002', 'ops-003', 'asset-001', 'risk-001', 'bc-001', 'retention-001', 'hr-001', 'comm-001',
    'dev-001', 'use-001', 'mobile-001'
  ],
  'SOC 2': [
    'acc-001', 'pwd-001', 'enc-001', 'backup-001', 'vuln-001', 'info-001', 'net-001', 'phys-001',
    'vendor-001', 'vendor-002', 'ops-001', 'ops-002', 'ops-003', 'asset-001', 'risk-001', 'bc-001',
    'retention-001', 'use-001'
  ],
  'HIPAA': [
    'acc-001', 'inc-001', 'data-001', 'enc-001', 'aware-001', 'ops-002', 'retention-001', 'comm-001', 'mobile-001'
  ],
  'GDPR': [
    'data-001', 'enc-001', 'privacy-001', 'retention-001'
  ],
  'PCI DSS': [
    'enc-001', 'pwd-001', 'net-001', 'ops-002', 'ops-003'
  ],
  'NIS2': [
    'net-001', 'vendor-001', 'risk-001', 'inc-001', 'ops-002'
  ],
  'CCPA': [
    'privacy-001', 'data-001', 'retention-001'
  ],
  'PIPL': [
    'privacy-001', 'data-001', 'retention-001'
  ],
  'PDPA': [
    'privacy-001', 'data-001', 'retention-001'
  ],
  'LGPD': [
    'privacy-001', 'data-001', 'retention-001'
  ]
};
