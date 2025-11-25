import { Framework } from '../../types';

export const soc2Framework: Framework = {
  id: 'soc2',
  name: 'SOC 2 Type II',
  description: 'Trust services criteria for service organizations providing assurance on security, availability, processing integrity, confidentiality, and privacy',
  version: '2017',
  complexity: 'intermediate',
  estimatedTime: 180,
  industry: ['Service Providers', 'Cloud Services', 'SaaS', 'Technology', 'Financial Services'],
  prerequisites: ['Understanding of IT controls', 'Familiarity with service organization controls'],
  certificationBody: 'AICPA',
  lastUpdated: new Date('2017-05-01'),
  relatedFrameworks: ['SOC 1', 'ISO 27001', 'NIST CSF', 'COBIT'],
  applicableRegulations: ['SOX', 'HIPAA', 'PCI DSS', 'GLBA'],
  maturityLevels: [
    { 
      level: 1, 
      name: 'Informal', 
      description: 'Ad hoc controls with limited documentation', 
      color: '#ef4444', 
      minScore: 0, 
      maxScore: 20,
      characteristics: ['Reactive approach', 'Limited documentation', 'Informal processes'],
      typicalOrganizations: ['Startups', 'Small service providers'],
      nextSteps: ['Document existing controls', 'Implement basic policies', 'Begin formal assessment']
    },
    { 
      level: 2, 
      name: 'Planned', 
      description: 'Planned and documented controls with some implementation', 
      color: '#f97316', 
      minScore: 21, 
      maxScore: 40,
      characteristics: ['Documented procedures', 'Some control implementation', 'Basic monitoring'],
      typicalOrganizations: ['Growing service providers', 'Organizations preparing for SOC 2'],
      nextSteps: ['Implement remaining controls', 'Enhance monitoring', 'Prepare for assessment']
    },
    { 
      level: 3, 
      name: 'Well-Defined', 
      description: 'Well-defined and consistently implemented controls', 
      color: '#eab308', 
      minScore: 41, 
      maxScore: 60,
      characteristics: ['Consistent implementation', 'Regular monitoring', 'Documented evidence'],
      typicalOrganizations: ['Service providers with SOC 2 Type I', 'Mid-size organizations'],
      nextSteps: ['Maintain controls over time', 'Enhance monitoring', 'Prepare for Type II']
    },
    { 
      level: 4, 
      name: 'Quantitatively Controlled', 
      description: 'Controls are measured and managed with quantitative data', 
      color: '#22c55e', 
      minScore: 61, 
      maxScore: 80,
      characteristics: ['Quantitative monitoring', 'Data-driven improvements', 'Advanced controls'],
      typicalOrganizations: ['Service providers with SOC 2 Type II', 'Mature organizations'],
      nextSteps: ['Optimize control effectiveness', 'Implement automation', 'Continuous improvement']
    },
    { 
      level: 5, 
      name: 'Continuously Improving', 
      description: 'Continuous improvement based on monitoring and feedback', 
      color: '#3b82f6', 
      minScore: 81, 
      maxScore: 100,
      characteristics: ['Continuous improvement', 'Predictive controls', 'Industry leadership'],
      typicalOrganizations: ['Leading service providers', 'SOC 2 leaders'],
      nextSteps: ['Share best practices', 'Mentor others', 'Innovate controls']
    }
  ],
  sections: [
    {
      id: 'security',
      name: 'Security',
      description: 'The system is protected against unauthorized access (both physical and logical)',
      weight: 25,
      priority: 'high',
      categories: [
        {
          id: 'access-controls',
          name: 'Access Controls',
          description: 'Controls to prevent unauthorized access to systems and data',
          weight: 30,
          questions: [
            {
              id: 'soc2.security.ac.1',
              text: 'Are logical access controls implemented to prevent unauthorized access to systems and data?',
              guidance: 'Implement appropriate logical access controls including user authentication, authorization, and access management processes.',
              priority: 'high',
              references: ['CC6.1'],
              examples: ['User authentication systems', 'Role-based access controls', 'Access provisioning procedures', 'Privileged access management'],
              options: [
                { value: 0, label: 'Not implemented', description: 'No logical access controls in place' },
                { value: 1, label: 'Partially implemented', description: 'Basic access controls for some systems' },
                { value: 2, label: 'Largely implemented', description: 'Comprehensive access controls with some gaps' },
                { value: 3, label: 'Fully implemented', description: 'Complete logical access control framework' }
              ]
            },
            {
              id: 'soc2.security.ac.2',
              text: 'Are physical access controls implemented to protect facilities and equipment?',
              guidance: 'Implement appropriate physical security controls to protect facilities, equipment, and sensitive areas.',
              priority: 'high',
              references: ['CC6.2'],
              examples: ['Facility access controls', 'Equipment security', 'Visitor management', 'Environmental controls'],
              options: [
                { value: 0, label: 'Not implemented', description: 'No physical access controls' },
                { value: 1, label: 'Partially implemented', description: 'Basic physical security measures' },
                { value: 2, label: 'Largely implemented', description: 'Good physical security with some gaps' },
                { value: 3, label: 'Fully implemented', description: 'Comprehensive physical security program' }
              ]
            },
            {
              id: 'soc2.security.ac.3',
              text: 'Is multi-factor authentication implemented for privileged access?',
              guidance: 'Implement multi-factor authentication for all privileged accounts and sensitive system access.',
              priority: 'high',
              references: ['CC6.3'],
              examples: ['MFA for admin accounts', 'Privileged access controls', 'Strong authentication', 'Access monitoring'],
              options: [
                { value: 0, label: 'Not implemented', description: 'No MFA for privileged access' },
                { value: 1, label: 'Partially implemented', description: 'MFA for some privileged accounts' },
                { value: 2, label: 'Largely implemented', description: 'MFA for most privileged access' },
                { value: 3, label: 'Fully implemented', description: 'MFA required for all privileged access' }
              ]
            }
          ]
        },
        {
          id: 'network-security',
          name: 'Network Security',
          description: 'Network security controls to protect against unauthorized access',
          weight: 25,
          questions: [
            {
              id: 'soc2.security.net.1',
              text: 'Are firewalls and network security controls implemented and properly configured?',
              guidance: 'Implement and maintain firewalls and network security controls to protect against unauthorized network access.',
              priority: 'high',
              references: ['CC6.4'],
              examples: ['Firewall configurations', 'Network segmentation', 'Intrusion detection', 'Network monitoring'],
              options: [
                { value: 0, label: 'Not implemented', description: 'No network security controls' },
                { value: 1, label: 'Partially implemented', description: 'Basic network security measures' },
                { value: 2, label: 'Largely implemented', description: 'Good network security with monitoring' },
                { value: 3, label: 'Fully implemented', description: 'Comprehensive network security program' }
              ]
            },
            {
              id: 'soc2.security.net.2',
              text: 'Is network traffic monitored and analyzed for security threats?',
              guidance: 'Implement network monitoring and analysis to detect and respond to security threats.',
              priority: 'medium',
              references: ['CC6.5'],
              examples: ['Network monitoring tools', 'Traffic analysis', 'Threat detection', 'Security alerts'],
              options: [
                { value: 0, label: 'Not implemented', description: 'No network monitoring' },
                { value: 1, label: 'Partially implemented', description: 'Basic network monitoring' },
                { value: 2, label: 'Largely implemented', description: 'Regular network monitoring and analysis' },
                { value: 3, label: 'Fully implemented', description: 'Advanced network monitoring with threat intelligence' }
              ]
            }
          ]
        },
        {
          id: 'data-protection',
          name: 'Data Protection',
          description: 'Controls to protect data from unauthorized access and disclosure',
          weight: 25,
          questions: [
            {
              id: 'soc2.security.data.1',
              text: 'Is data encrypted in transit and at rest?',
              guidance: 'Implement appropriate encryption for data in transit and at rest to protect against unauthorized access.',
              priority: 'high',
              references: ['CC6.6'],
              examples: ['TLS/SSL encryption', 'Database encryption', 'File encryption', 'Key management'],
              options: [
                { value: 0, label: 'Not implemented', description: 'No data encryption' },
                { value: 1, label: 'Partially implemented', description: 'Some data encrypted' },
                { value: 2, label: 'Largely implemented', description: 'Most sensitive data encrypted' },
                { value: 3, label: 'Fully implemented', description: 'Comprehensive data encryption program' }
              ]
            },
            {
              id: 'soc2.security.data.2',
              text: 'Are data backup and recovery procedures implemented and tested?',
              guidance: 'Implement and regularly test data backup and recovery procedures to ensure data availability and integrity.',
              priority: 'high',
              references: ['CC6.7'],
              examples: ['Backup procedures', 'Recovery testing', 'Data retention policies', 'Offsite storage'],
              options: [
                { value: 0, label: 'Not implemented', description: 'No backup procedures' },
                { value: 1, label: 'Partially implemented', description: 'Basic backup procedures' },
                { value: 2, label: 'Largely implemented', description: 'Regular backup and testing' },
                { value: 3, label: 'Fully implemented', description: 'Comprehensive backup and recovery program' }
              ]
            }
          ]
        },
        {
          id: 'incident-response',
          name: 'Incident Response',
          description: 'Procedures for detecting, responding to, and recovering from security incidents',
          weight: 20,
          questions: [
            {
              id: 'soc2.security.ir.1',
              text: 'Is a security incident response plan implemented and tested?',
              guidance: 'Implement and regularly test a security incident response plan to ensure effective response to security incidents.',
              priority: 'high',
              references: ['CC6.8'],
              examples: ['Incident response procedures', 'Response team roles', 'Communication plans', 'Recovery procedures'],
              options: [
                { value: 0, label: 'Not implemented', description: 'No incident response plan' },
                { value: 1, label: 'Partially implemented', description: 'Basic incident response procedures' },
                { value: 2, label: 'Largely implemented', description: 'Documented and tested incident response' },
                { value: 3, label: 'Fully implemented', description: 'Comprehensive incident response program' }
              ]
            }
          ]
        }
      ]
    },
    {
      id: 'availability',
      name: 'Availability',
      description: 'The system is available for operation and use as committed or agreed',
      weight: 20,
      priority: 'high',
      categories: [
        {
          id: 'system-availability',
          name: 'System Availability',
          description: 'Controls to ensure system availability and performance',
          weight: 40,
          questions: [
            {
              id: 'soc2.avail.sys.1',
              text: 'Are system availability and performance monitored and maintained?',
              guidance: 'Implement monitoring and maintenance procedures to ensure system availability meets service level commitments.',
              priority: 'high',
              references: ['CC7.1'],
              examples: ['Uptime monitoring', 'Performance metrics', 'Capacity planning', 'Service level agreements'],
              options: [
                { value: 0, label: 'Not implemented', description: 'No availability monitoring' },
                { value: 1, label: 'Partially implemented', description: 'Basic availability monitoring' },
                { value: 2, label: 'Largely implemented', description: 'Regular monitoring and maintenance' },
                { value: 3, label: 'Fully implemented', description: 'Comprehensive availability management program' }
              ]
            },
            {
              id: 'soc2.avail.sys.2',
              text: 'Are backup and recovery procedures tested and validated?',
              guidance: 'Regularly test and validate backup and recovery procedures to ensure they meet recovery time objectives.',
              priority: 'high',
              references: ['CC7.2'],
              examples: ['Recovery testing', 'RTO validation', 'Recovery procedures', 'Disaster recovery plans'],
              options: [
                { value: 0, label: 'Not implemented', description: 'No recovery testing' },
                { value: 1, label: 'Partially implemented', description: 'Basic recovery testing' },
                { value: 2, label: 'Largely implemented', description: 'Regular recovery testing and validation' },
                { value: 3, label: 'Fully implemented', description: 'Comprehensive recovery testing program' }
              ]
            }
          ]
        },
        {
          id: 'capacity-management',
          name: 'Capacity Management',
          description: 'Controls to manage system capacity and performance',
          weight: 30,
          questions: [
            {
              id: 'soc2.avail.cap.1',
              text: 'Is system capacity monitored and managed to meet demand?',
              guidance: 'Implement capacity monitoring and management to ensure systems can handle expected loads.',
              priority: 'medium',
              references: ['CC7.3'],
              examples: ['Capacity monitoring', 'Load balancing', 'Resource allocation', 'Performance tuning'],
              options: [
                { value: 0, label: 'Not implemented', description: 'No capacity management' },
                { value: 1, label: 'Partially implemented', description: 'Basic capacity monitoring' },
                { value: 2, label: 'Largely implemented', description: 'Regular capacity management' },
                { value: 3, label: 'Fully implemented', description: 'Comprehensive capacity management program' }
              ]
            }
          ]
        },
        {
          id: 'change-management',
          name: 'Change Management',
          description: 'Controls to manage system changes and minimize availability impact',
          weight: 30,
          questions: [
            {
              id: 'soc2.avail.change.1',
              text: 'Are system changes managed through a formal change control process?',
              guidance: 'Implement a formal change control process to manage system changes and minimize availability impact.',
              priority: 'medium',
              references: ['CC7.4'],
              examples: ['Change control procedures', 'Change approval process', 'Testing requirements', 'Rollback procedures'],
              options: [
                { value: 0, label: 'Not implemented', description: 'No formal change control' },
                { value: 1, label: 'Partially implemented', description: 'Basic change procedures' },
                { value: 2, label: 'Largely implemented', description: 'Formal change control process' },
                { value: 3, label: 'Fully implemented', description: 'Comprehensive change management program' }
              ]
            }
          ]
        }
      ]
    },
    {
      id: 'processing-integrity',
      name: 'Processing Integrity',
      description: 'System processing is complete, valid, accurate, timely, and authorized',
      weight: 20,
      priority: 'medium',
      categories: [
        {
          id: 'data-integrity',
          name: 'Data Integrity',
          description: 'Controls to ensure data accuracy and completeness',
          weight: 40,
          questions: [
            {
              id: 'soc2.proc.data.1',
              text: 'Are data validation and integrity controls implemented?',
              guidance: 'Implement controls to validate data accuracy, completeness, and integrity throughout processing.',
              priority: 'high',
              references: ['CC8.1'],
              examples: ['Data validation rules', 'Integrity checks', 'Error detection', 'Data quality controls'],
              options: [
                { value: 0, label: 'Not implemented', description: 'No data integrity controls' },
                { value: 1, label: 'Partially implemented', description: 'Basic data validation' },
                { value: 2, label: 'Largely implemented', description: 'Comprehensive data integrity controls' },
                { value: 3, label: 'Fully implemented', description: 'Advanced data integrity and validation program' }
              ]
            },
            {
              id: 'soc2.proc.data.2',
              text: 'Are processing errors detected, logged, and corrected?',
              guidance: 'Implement controls to detect, log, and correct processing errors to maintain data integrity.',
              priority: 'high',
              references: ['CC8.2'],
              examples: ['Error logging', 'Exception handling', 'Error correction procedures', 'Audit trails'],
              options: [
                { value: 0, label: 'Not implemented', description: 'No error handling' },
                { value: 1, label: 'Partially implemented', description: 'Basic error detection' },
                { value: 2, label: 'Largely implemented', description: 'Comprehensive error handling' },
                { value: 3, label: 'Fully implemented', description: 'Advanced error detection and correction program' }
              ]
            }
          ]
        },
        {
          id: 'processing-controls',
          name: 'Processing Controls',
          description: 'Controls to ensure accurate and complete processing',
          weight: 30,
          questions: [
            {
              id: 'soc2.proc.ctrl.1',
              text: 'Are processing controls implemented to ensure accurate and complete processing?',
              guidance: 'Implement controls to ensure all processing is accurate, complete, and authorized.',
              priority: 'medium',
              references: ['CC8.3'],
              examples: ['Processing validation', 'Authorization checks', 'Completeness controls', 'Accuracy verification'],
              options: [
                { value: 0, label: 'Not implemented', description: 'No processing controls' },
                { value: 1, label: 'Partially implemented', description: 'Basic processing controls' },
                { value: 2, label: 'Largely implemented', description: 'Comprehensive processing controls' },
                { value: 3, label: 'Fully implemented', description: 'Advanced processing control framework' }
              ]
            }
          ]
        },
        {
          id: 'audit-trails',
          name: 'Audit Trails',
          description: 'Controls to maintain audit trails of processing activities',
          weight: 30,
          questions: [
            {
              id: 'soc2.proc.audit.1',
              text: 'Are audit trails maintained for all processing activities?',
              guidance: 'Maintain comprehensive audit trails of all processing activities for monitoring and compliance.',
              priority: 'medium',
              references: ['CC8.4'],
              examples: ['Transaction logs', 'Processing records', 'Audit trail retention', 'Log analysis'],
              options: [
                { value: 0, label: 'Not implemented', description: 'No audit trails' },
                { value: 1, label: 'Partially implemented', description: 'Basic audit logging' },
                { value: 2, label: 'Largely implemented', description: 'Comprehensive audit trails' },
                { value: 3, label: 'Fully implemented', description: 'Advanced audit trail management program' }
              ]
            }
          ]
        }
      ]
    },
    {
      id: 'confidentiality',
      name: 'Confidentiality',
      description: 'Information designated as confidential is protected as committed or agreed',
      weight: 20,
      priority: 'high',
      categories: [
        {
          id: 'data-classification',
          name: 'Data Classification',
          description: 'Controls to classify and protect confidential information',
          weight: 40,
          questions: [
            {
              id: 'soc2.conf.class.1',
              text: 'Is confidential information identified and classified appropriately?',
              guidance: 'Implement data classification procedures to identify and protect confidential information.',
              priority: 'high',
              references: ['CC9.1'],
              examples: ['Data classification policies', 'Confidentiality labels', 'Data handling procedures', 'Access restrictions'],
              options: [
                { value: 0, label: 'Not implemented', description: 'No data classification' },
                { value: 1, label: 'Partially implemented', description: 'Basic classification procedures' },
                { value: 2, label: 'Largely implemented', description: 'Comprehensive data classification' },
                { value: 3, label: 'Fully implemented', description: 'Advanced data classification program' }
              ]
            },
            {
              id: 'soc2.conf.class.2',
              text: 'Are appropriate controls implemented to protect confidential information?',
              guidance: 'Implement appropriate technical and administrative controls to protect confidential information.',
              priority: 'high',
              references: ['CC9.2'],
              examples: ['Encryption controls', 'Access restrictions', 'Data loss prevention', 'Confidentiality agreements'],
              options: [
                { value: 0, label: 'Not implemented', description: 'No confidentiality controls' },
                { value: 1, label: 'Partially implemented', description: 'Basic confidentiality measures' },
                { value: 2, label: 'Largely implemented', description: 'Comprehensive confidentiality controls' },
                { value: 3, label: 'Fully implemented', description: 'Advanced confidentiality protection program' }
              ]
            }
          ]
        },
        {
          id: 'access-restrictions',
          name: 'Access Restrictions',
          description: 'Controls to restrict access to confidential information',
          weight: 30,
          questions: [
            {
              id: 'soc2.conf.access.1',
              text: 'Is access to confidential information restricted to authorized personnel?',
              guidance: 'Implement access controls to ensure only authorized personnel can access confidential information.',
              priority: 'high',
              references: ['CC9.3'],
              examples: ['Access authorization', 'Need-to-know basis', 'Confidentiality training', 'Access monitoring'],
              options: [
                { value: 0, label: 'Not implemented', description: 'No access restrictions' },
                { value: 1, label: 'Partially implemented', description: 'Basic access controls' },
                { value: 2, label: 'Largely implemented', description: 'Comprehensive access restrictions' },
                { value: 3, label: 'Fully implemented', description: 'Advanced access control program' }
              ]
            }
          ]
        },
        {
          id: 'data-handling',
          name: 'Data Handling',
          description: 'Controls for handling confidential information',
          weight: 30,
          questions: [
            {
              id: 'soc2.conf.handle.1',
              text: 'Are procedures implemented for secure handling of confidential information?',
              guidance: 'Implement procedures for secure handling, storage, and disposal of confidential information.',
              priority: 'medium',
              references: ['CC9.4'],
              examples: ['Secure handling procedures', 'Storage requirements', 'Disposal procedures', 'Transport security'],
              options: [
                { value: 0, label: 'Not implemented', description: 'No handling procedures' },
                { value: 1, label: 'Partially implemented', description: 'Basic handling procedures' },
                { value: 2, label: 'Largely implemented', description: 'Comprehensive handling procedures' },
                { value: 3, label: 'Fully implemented', description: 'Advanced data handling program' }
              ]
            }
          ]
        }
      ]
    },
    {
      id: 'privacy',
      name: 'Privacy',
      description: 'Personal information is collected, used, retained, disclosed, and disposed of in conformity with commitments',
      weight: 15,
      priority: 'medium',
      categories: [
        {
          id: 'privacy-policies',
          name: 'Privacy Policies',
          description: 'Policies and procedures for privacy protection',
          weight: 30,
          questions: [
            {
              id: 'soc2.priv.policy.1',
              text: 'Are privacy policies and procedures implemented and communicated?',
              guidance: 'Implement and communicate privacy policies and procedures to protect personal information.',
              priority: 'high',
              references: ['CC10.1'],
              examples: ['Privacy policies', 'Data collection notices', 'Consent mechanisms', 'Privacy training'],
              options: [
                { value: 0, label: 'Not implemented', description: 'No privacy policies' },
                { value: 1, label: 'Partially implemented', description: 'Basic privacy policies' },
                { value: 2, label: 'Largely implemented', description: 'Comprehensive privacy policies' },
                { value: 3, label: 'Fully implemented', description: 'Advanced privacy program' }
              ]
            }
          ]
        },
        {
          id: 'data-subject-rights',
          name: 'Data Subject Rights',
          description: 'Controls to support individual privacy rights',
          weight: 35,
          questions: [
            {
              id: 'soc2.priv.rights.1',
              text: 'Are procedures implemented to support individual privacy rights?',
              guidance: 'Implement procedures to support individual rights such as access, correction, and deletion of personal information.',
              priority: 'high',
              references: ['CC10.2'],
              examples: ['Data subject request procedures', 'Access rights', 'Correction procedures', 'Deletion processes'],
              options: [
                { value: 0, label: 'Not implemented', description: 'No privacy rights support' },
                { value: 1, label: 'Partially implemented', description: 'Basic rights procedures' },
                { value: 2, label: 'Largely implemented', description: 'Comprehensive rights support' },
                { value: 3, label: 'Fully implemented', description: 'Advanced privacy rights program' }
              ]
            }
          ]
        },
        {
          id: 'data-minimization',
          name: 'Data Minimization',
          description: 'Controls to minimize data collection and retention',
          weight: 35,
          questions: [
            {
              id: 'soc2.priv.min.1',
              text: 'Are data minimization principles implemented?',
              guidance: 'Implement data minimization principles to collect and retain only necessary personal information.',
              priority: 'medium',
              references: ['CC10.3'],
              examples: ['Data minimization policies', 'Retention schedules', 'Collection limits', 'Purpose limitation'],
              options: [
                { value: 0, label: 'Not implemented', description: 'No data minimization' },
                { value: 1, label: 'Partially implemented', description: 'Basic minimization practices' },
                { value: 2, label: 'Largely implemented', description: 'Comprehensive data minimization' },
                { value: 3, label: 'Fully implemented', description: 'Advanced data minimization program' }
              ]
            }
          ]
        }
      ]
    }
  ]
};