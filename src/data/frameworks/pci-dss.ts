import { Framework } from '../../types';

export const pciDssFramework: Framework = {
  id: 'pci_dss',
  name: 'PCI DSS',
  description: 'Payment Card Industry Data Security Standard for organizations that handle credit card information',
  version: '4.0.1',
  complexity: 'expert',
  estimatedTime: 360,
  industry: ['Payment Processing', 'E-commerce', 'Financial Services', 'Retail', 'Hospitality'],
  prerequisites: ['Understanding of payment card processing', 'Familiarity with data security standards'],
  certificationBody: 'PCI Security Standards Council',
  lastUpdated: new Date('2024-04-30'),
  relatedFrameworks: ['ISO 27001', 'NIST CSF', 'SOX', 'GLBA'],
  applicableRegulations: ['PCI DSS', 'SOX', 'GLBA', 'State Data Breach Laws'],
  maturityLevels: [
    { 
      level: 1, 
      name: 'Basic', 
      description: 'Minimal PCI DSS compliance', 
      color: '#ef4444', 
      minScore: 0, 
      maxScore: 20,
      characteristics: ['Basic security controls', 'Limited documentation', 'Ad hoc processes'],
      typicalOrganizations: ['Small merchants', 'Local businesses'],
      nextSteps: ['Implement basic controls', 'Security awareness training', 'Regular assessments']
    },
    { 
      level: 2, 
      name: 'Developing', 
      description: 'Developing PCI DSS compliance program', 
      color: '#f97316', 
      minScore: 21, 
      maxScore: 40,
      characteristics: ['Some security controls', 'Basic documentation', 'Informal processes'],
      typicalOrganizations: ['Growing merchants', 'Organizations implementing PCI'],
      nextSteps: ['Complete control implementation', 'Enhance documentation', 'Formalize processes']
    },
    { 
      level: 3, 
      name: 'Defined', 
      description: 'Merchants processing 20K-1M transactions annually', 
      color: '#eab308', 
      minScore: 41, 
      maxScore: 60,
      characteristics: ['Annual self-assessment', 'Quarterly network scans', 'Basic security controls'],
      typicalOrganizations: ['Small to mid-size merchants', 'Online retailers'],
      nextSteps: ['Implement missing controls', 'Enhance security program', 'Regular monitoring']
    },
    { 
      level: 4, 
      name: 'Managed', 
      description: 'Merchants processing 1M-6M transactions annually', 
      color: '#22c55e', 
      minScore: 61, 
      maxScore: 80,
      characteristics: ['Annual self-assessment', 'Quarterly network scans', 'Good security practices'],
      typicalOrganizations: ['Mid-size merchants', 'Regional retailers'],
      nextSteps: ['Enhance security controls', 'Prepare for Level 1', 'Regular assessments']
    },
    { 
      level: 5, 
      name: 'Optimized', 
      description: 'Merchants processing over 6M transactions annually', 
      color: '#3b82f6', 
      minScore: 81, 
      maxScore: 100,
      characteristics: ['Annual onsite assessment', 'Quarterly network scans', 'Comprehensive security program'],
      typicalOrganizations: ['Large merchants', 'Payment processors', 'Service providers'],
      nextSteps: ['Maintain compliance', 'Continuous monitoring', 'Advanced security controls']
    }
  ],
  sections: [
    {
      id: 'build-secure-network',
      name: 'Build and Maintain Secure Network',
      description: 'Install and maintain a firewall configuration to protect cardholder data',
      weight: 20,
      priority: 'high',
      categories: [
        {
          id: 'firewall-configuration',
          name: 'Firewall Configuration',
          description: 'Install and maintain a firewall configuration to protect cardholder data',
          weight: 50,
          questions: [
            {
              id: 'pci.1.1.1',
              text: 'Is a formal process for approving and testing all network connections and changes to firewall and router configurations established?',
              guidance: 'Establish a formal process for approving and testing all network connections and changes to firewall and router configurations to ensure security.',
              priority: 'high',
              references: ['1.1.1'],
              examples: ['Change management procedures', 'Firewall rule approval process', 'Network change testing', 'Configuration documentation'],
              options: [
                { value: 0, label: 'Not implemented', description: 'No formal process for network changes' },
                { value: 1, label: 'Partially implemented', description: 'Basic change procedures exist' },
                { value: 2, label: 'Largely implemented', description: 'Formal process with some gaps' },
                { value: 3, label: 'Fully implemented', description: 'Comprehensive change management process' }
              ]
            },
            {
              id: 'pci.1.1.2',
              text: 'Are current network diagrams with all connections to cardholder data documented?',
              guidance: 'Maintain current network diagrams that show all connections to cardholder data, including wireless networks.',
              priority: 'high',
              references: ['1.1.2'],
              examples: ['Network topology diagrams', 'Data flow diagrams', 'Wireless network documentation', 'Cardholder data environment maps'],
              options: [
                { value: 0, label: 'Not implemented', description: 'No network documentation' },
                { value: 1, label: 'Partially implemented', description: 'Basic network diagrams exist' },
                { value: 2, label: 'Largely implemented', description: 'Most network connections documented' },
                { value: 3, label: 'Fully implemented', description: 'Comprehensive network documentation' }
              ]
            },
            {
              id: 'pci.1.1.3',
              text: 'Are firewall and router configuration standards documented and implemented?',
              guidance: 'Document and implement firewall and router configuration standards that define how these devices are configured.',
              priority: 'high',
              references: ['1.1.3'],
              examples: ['Firewall configuration standards', 'Router security baselines', 'Configuration templates', 'Security policies'],
              options: [
                { value: 0, label: 'Not implemented', description: 'No configuration standards' },
                { value: 1, label: 'Partially implemented', description: 'Basic configuration guidelines' },
                { value: 2, label: 'Largely implemented', description: 'Most standards documented and implemented' },
                { value: 3, label: 'Fully implemented', description: 'Comprehensive configuration standards' }
              ]
            }
          ]
        },
        {
          id: 'network-segmentation',
          name: 'Network Segmentation',
          description: 'Implement network segmentation to isolate cardholder data environment',
          weight: 50,
          questions: [
            {
              id: 'pci.1.2.1',
              text: 'Is the cardholder data environment isolated from other networks?',
              guidance: 'Implement network segmentation to isolate the cardholder data environment from other networks.',
              priority: 'high',
              references: ['1.2.1'],
              examples: ['Network segmentation', 'DMZ configuration', 'VLAN separation', 'Access controls'],
              options: [
                { value: 0, label: 'Not implemented', description: 'No network isolation' },
                { value: 1, label: 'Partially implemented', description: 'Basic network separation' },
                { value: 2, label: 'Largely implemented', description: 'Most networks properly isolated' },
                { value: 3, label: 'Fully implemented', description: 'Comprehensive network segmentation' }
              ]
            },
            {
              id: 'pci.1.2.2',
              text: 'Are wireless networks properly secured and isolated from the cardholder data environment?',
              guidance: 'Implement proper security controls for wireless networks and ensure they are isolated from the cardholder data environment.',
              priority: 'high',
              references: ['1.2.2'],
              examples: ['Wireless security protocols', 'Network isolation', 'Access controls', 'Encryption'],
              options: [
                { value: 0, label: 'Not implemented', description: 'No wireless security' },
                { value: 1, label: 'Partially implemented', description: 'Basic wireless security' },
                { value: 2, label: 'Largely implemented', description: 'Good wireless security controls' },
                { value: 3, label: 'Fully implemented', description: 'Comprehensive wireless security' }
              ]
            }
          ]
        }
      ]
    },
    {
      id: 'protect-cardholder-data',
      name: 'Protect Cardholder Data',
      description: 'Protect stored cardholder data and encrypt transmission of cardholder data across open, public networks',
      weight: 25,
      priority: 'high',
      categories: [
        {
          id: 'data-storage',
          name: 'Data Storage',
          description: 'Protect stored cardholder data',
          weight: 50,
          questions: [
            {
              id: 'pci.3.1.1',
              text: 'Is cardholder data storage minimized and retention policies implemented?',
              guidance: 'Minimize cardholder data storage and implement retention policies to limit data exposure.',
              priority: 'high',
              references: ['3.1.1'],
              examples: ['Data retention policies', 'Storage minimization', 'Data inventory', 'Retention schedules'],
              options: [
                { value: 0, label: 'Not implemented', description: 'No data minimization or retention policies' },
                { value: 1, label: 'Partially implemented', description: 'Basic retention guidelines' },
                { value: 2, label: 'Largely implemented', description: 'Most data properly managed' },
                { value: 3, label: 'Fully implemented', description: 'Comprehensive data management program' }
              ]
            },
            {
              id: 'pci.3.2.1',
              text: 'Is sensitive authentication data not stored after authorization?',
              guidance: 'Do not store sensitive authentication data after authorization, even if encrypted.',
              priority: 'high',
              references: ['3.2.1'],
              examples: ['Authentication data policies', 'Data deletion procedures', 'System configurations', 'Compliance monitoring'],
              options: [
                { value: 0, label: 'Not implemented', description: 'Sensitive authentication data stored' },
                { value: 1, label: 'Partially implemented', description: 'Some sensitive data properly handled' },
                { value: 2, label: 'Largely implemented', description: 'Most sensitive data not stored' },
                { value: 3, label: 'Fully implemented', description: 'No sensitive authentication data stored' }
              ]
            },
            {
              id: 'pci.3.4.1',
              text: 'Is cardholder data rendered unreadable anywhere it is stored?',
              guidance: 'Render cardholder data unreadable anywhere it is stored using strong encryption, truncation, or other methods.',
              priority: 'high',
              references: ['3.4.1'],
              examples: ['Database encryption', 'File encryption', 'Tokenization', 'Hashing'],
              options: [
                { value: 0, label: 'Not implemented', description: 'Cardholder data stored in plain text' },
                { value: 1, label: 'Partially implemented', description: 'Some data encrypted' },
                { value: 2, label: 'Largely implemented', description: 'Most data properly protected' },
                { value: 3, label: 'Fully implemented', description: 'All cardholder data properly protected' }
              ]
            }
          ]
        },
        {
          id: 'data-transmission',
          name: 'Data Transmission',
          description: 'Encrypt transmission of cardholder data across open, public networks',
          weight: 50,
          questions: [
            {
              id: 'pci.4.1.1',
              text: 'Is strong cryptography used to encrypt cardholder data during transmission over open, public networks?',
              guidance: 'Use strong cryptography to encrypt cardholder data during transmission over open, public networks.',
              priority: 'high',
              references: ['4.1.1'],
              examples: ['TLS/SSL encryption', 'VPN connections', 'Secure protocols', 'Certificate management'],
              options: [
                { value: 0, label: 'Not implemented', description: 'No encryption for data transmission' },
                { value: 1, label: 'Partially implemented', description: 'Some transmissions encrypted' },
                { value: 2, label: 'Largely implemented', description: 'Most transmissions properly encrypted' },
                { value: 3, label: 'Fully implemented', description: 'All transmissions properly encrypted' }
              ]
            },
            {
              id: 'pci.4.2.1',
              text: 'Are wireless networks transmitting cardholder data encrypted using strong cryptography?',
              guidance: 'Ensure wireless networks transmitting cardholder data use strong cryptography.',
              priority: 'high',
              references: ['4.2.1'],
              examples: ['WPA3 encryption', 'Strong wireless protocols', 'Network security', 'Access controls'],
              options: [
                { value: 0, label: 'Not implemented', description: 'No wireless encryption' },
                { value: 1, label: 'Partially implemented', description: 'Basic wireless security' },
                { value: 2, label: 'Largely implemented', description: 'Good wireless encryption' },
                { value: 3, label: 'Fully implemented', description: 'Strong wireless encryption implemented' }
              ]
            }
          ]
        }
      ]
    },
    {
      id: 'vulnerability-management',
      name: 'Maintain Vulnerability Management Program',
      description: 'Regularly update anti-virus software and develop and maintain secure systems and applications',
      weight: 20,
      priority: 'high',
      categories: [
        {
          id: 'anti-virus',
          name: 'Anti-Virus Software',
          description: 'Use and regularly update anti-virus software',
          weight: 30,
          questions: [
            {
              id: 'pci.5.1.1',
              text: 'Is anti-virus software deployed on all systems commonly affected by malicious software?',
              guidance: 'Deploy anti-virus software on all systems commonly affected by malicious software.',
              priority: 'high',
              references: ['5.1.1'],
              examples: ['Anti-virus deployment', 'Endpoint protection', 'Server protection', 'Mobile device security'],
              options: [
                { value: 0, label: 'Not implemented', description: 'No anti-virus software deployed' },
                { value: 1, label: 'Partially implemented', description: 'Anti-virus on some systems' },
                { value: 2, label: 'Largely implemented', description: 'Anti-virus on most systems' },
                { value: 3, label: 'Fully implemented', description: 'Comprehensive anti-virus coverage' }
              ]
            },
            {
              id: 'pci.5.2.1',
              text: 'Is anti-virus software kept current and signature files updated?',
              guidance: 'Keep anti-virus software current and ensure signature files are updated regularly.',
              priority: 'high',
              references: ['5.2.1'],
              examples: ['Automatic updates', 'Signature management', 'Update monitoring', 'Compliance reporting'],
              options: [
                { value: 0, label: 'Not implemented', description: 'Anti-virus not updated' },
                { value: 1, label: 'Partially implemented', description: 'Some systems updated' },
                { value: 2, label: 'Largely implemented', description: 'Most systems current' },
                { value: 3, label: 'Fully implemented', description: 'All systems current and updated' }
              ]
            }
          ]
        },
        {
          id: 'secure-systems',
          name: 'Secure Systems and Applications',
          description: 'Develop and maintain secure systems and applications',
          weight: 70,
          questions: [
            {
              id: 'pci.6.1.1',
              text: 'Are security patches installed within one month of release?',
              guidance: 'Install security patches within one month of release to address vulnerabilities.',
              priority: 'high',
              references: ['6.1.1'],
              examples: ['Patch management process', 'Vulnerability scanning', 'Update schedules', 'Testing procedures'],
              options: [
                { value: 0, label: 'Not implemented', description: 'No patch management process' },
                { value: 1, label: 'Partially implemented', description: 'Some patches applied' },
                { value: 2, label: 'Largely implemented', description: 'Most patches applied timely' },
                { value: 3, label: 'Fully implemented', description: 'Comprehensive patch management' }
              ]
            },
            {
              id: 'pci.6.2.1',
              text: 'Are secure coding practices implemented for all custom applications?',
              guidance: 'Implement secure coding practices for all custom applications handling cardholder data.',
              priority: 'high',
              references: ['6.2.1'],
              examples: ['Secure coding standards', 'Code reviews', 'Security training', 'Development guidelines'],
              options: [
                { value: 0, label: 'Not implemented', description: 'No secure coding practices' },
                { value: 1, label: 'Partially implemented', description: 'Some secure coding practices' },
                { value: 2, label: 'Largely implemented', description: 'Most applications follow secure coding' },
                { value: 3, label: 'Fully implemented', description: 'Comprehensive secure coding program' }
              ]
            },
            {
              id: 'pci.6.3.1',
              text: 'Are web applications protected against common attacks?',
              guidance: 'Protect web applications against common attacks such as injection, cross-site scripting, and broken authentication.',
              priority: 'high',
              references: ['6.3.1'],
              examples: ['Web application firewalls', 'Input validation', 'Output encoding', 'Authentication controls'],
              options: [
                { value: 0, label: 'Not implemented', description: 'No web application protection' },
                { value: 1, label: 'Partially implemented', description: 'Basic web security measures' },
                { value: 2, label: 'Largely implemented', description: 'Good web application security' },
                { value: 3, label: 'Fully implemented', description: 'Comprehensive web application protection' }
              ]
            }
          ]
        }
      ]
    },
    {
      id: 'access-control',
      name: 'Implement Strong Access Control Measures',
      description: 'Restrict access to cardholder data by business need-to-know and assign unique ID to each person with computer access',
      weight: 20,
      priority: 'high',
      categories: [
        {
          id: 'access-restrictions',
          name: 'Access Restrictions',
          description: 'Restrict access to cardholder data by business need-to-know',
          weight: 50,
          questions: [
            {
              id: 'pci.7.1.1',
              text: 'Is access to cardholder data restricted to only those individuals whose job requires such access?',
              guidance: 'Restrict access to cardholder data to only those individuals whose job requires such access.',
              priority: 'high',
              references: ['7.1.1'],
              examples: ['Role-based access control', 'Need-to-know basis', 'Access authorization', 'Job function mapping'],
              options: [
                { value: 0, label: 'Not implemented', description: 'No access restrictions' },
                { value: 1, label: 'Partially implemented', description: 'Basic access controls' },
                { value: 2, label: 'Largely implemented', description: 'Most access properly restricted' },
                { value: 3, label: 'Fully implemented', description: 'Comprehensive access restrictions' }
              ]
            },
            {
              id: 'pci.7.2.1',
              text: 'Are access control systems implemented to deny all access by default?',
              guidance: 'Implement access control systems that deny all access by default and grant access only as needed.',
              priority: 'high',
              references: ['7.2.1'],
              examples: ['Default deny policies', 'Explicit access grants', 'Access control lists', 'Permission matrices'],
              options: [
                { value: 0, label: 'Not implemented', description: 'No default deny access controls' },
                { value: 1, label: 'Partially implemented', description: 'Some systems use default deny' },
                { value: 2, label: 'Largely implemented', description: 'Most systems properly configured' },
                { value: 3, label: 'Fully implemented', description: 'Comprehensive default deny implementation' }
              ]
            }
          ]
        },
        {
          id: 'unique-identification',
          name: 'Unique Identification',
          description: 'Assign unique ID to each person with computer access',
          weight: 50,
          questions: [
            {
              id: 'pci.8.1.1',
              text: 'Are unique IDs assigned to all users with access to cardholder data?',
              guidance: 'Assign unique IDs to all users with access to cardholder data to ensure accountability.',
              priority: 'high',
              references: ['8.1.1'],
              examples: ['Unique user accounts', 'No shared accounts', 'User identification', 'Account management'],
              options: [
                { value: 0, label: 'Not implemented', description: 'Shared accounts or no unique IDs' },
                { value: 1, label: 'Partially implemented', description: 'Some users have unique IDs' },
                { value: 2, label: 'Largely implemented', description: 'Most users have unique IDs' },
                { value: 3, label: 'Fully implemented', description: 'All users have unique IDs' }
              ]
            },
            {
              id: 'pci.8.2.1',
              text: 'Is multi-factor authentication implemented for all non-console administrative access?',
              guidance: 'Implement multi-factor authentication for all non-console administrative access to systems with cardholder data.',
              priority: 'high',
              references: ['8.2.1'],
              examples: ['MFA for admin access', 'Remote access controls', 'Privileged access management', 'Authentication systems'],
              options: [
                { value: 0, label: 'Not implemented', description: 'No MFA for administrative access' },
                { value: 1, label: 'Partially implemented', description: 'MFA for some admin access' },
                { value: 2, label: 'Largely implemented', description: 'MFA for most admin access' },
                { value: 3, label: 'Fully implemented', description: 'MFA for all administrative access' }
              ]
            }
          ]
        }
      ]
    },
    {
      id: 'monitor-networks',
      name: 'Regularly Monitor and Test Networks',
      description: 'Track and monitor all access to network resources and cardholder data',
      weight: 15,
      priority: 'high',
      categories: [
        {
          id: 'access-monitoring',
          name: 'Access Monitoring',
          description: 'Track and monitor all access to network resources and cardholder data',
          weight: 60,
          questions: [
            {
              id: 'pci.10.1.1',
              text: 'Are audit logs implemented and maintained for all system components?',
              guidance: 'Implement and maintain audit logs for all system components that process, store, or transmit cardholder data.',
              priority: 'high',
              references: ['10.1.1'],
              examples: ['System logging', 'Audit trails', 'Log management', 'Event logging'],
              options: [
                { value: 0, label: 'Not implemented', description: 'No audit logging' },
                { value: 1, label: 'Partially implemented', description: 'Basic logging on some systems' },
                { value: 2, label: 'Largely implemented', description: 'Most systems have audit logs' },
                { value: 3, label: 'Fully implemented', description: 'Comprehensive audit logging' }
              ]
            },
            {
              id: 'pci.10.2.1',
              text: 'Are audit logs reviewed at least daily?',
              guidance: 'Review audit logs at least daily to identify suspicious activity and security incidents.',
              priority: 'high',
              references: ['10.2.1'],
              examples: ['Daily log reviews', 'Automated monitoring', 'Security alerts', 'Incident detection'],
              options: [
                { value: 0, label: 'Not implemented', description: 'No log review process' },
                { value: 1, label: 'Partially implemented', description: 'Occasional log reviews' },
                { value: 2, label: 'Largely implemented', description: 'Regular log reviews' },
                { value: 3, label: 'Fully implemented', description: 'Daily log review process' }
              ]
            }
          ]
        },
        {
          id: 'network-testing',
          name: 'Network Testing',
          description: 'Regularly test security systems and processes',
          weight: 40,
          questions: [
            {
              id: 'pci.11.1.1',
              text: 'Are quarterly vulnerability scans performed by qualified personnel?',
              guidance: 'Perform quarterly vulnerability scans by qualified personnel to identify security vulnerabilities.',
              priority: 'high',
              references: ['11.1.1'],
              examples: ['Vulnerability scanning', 'Quarterly assessments', 'Qualified personnel', 'Scan reports'],
              options: [
                { value: 0, label: 'Not implemented', description: 'No vulnerability scanning' },
                { value: 1, label: 'Partially implemented', description: 'Occasional vulnerability scans' },
                { value: 2, label: 'Largely implemented', description: 'Regular vulnerability scanning' },
                { value: 3, label: 'Fully implemented', description: 'Quarterly vulnerability scanning program' }
              ]
            },
            {
              id: 'pci.11.2.1',
              text: 'Are penetration tests performed at least annually?',
              guidance: 'Perform penetration tests at least annually to identify security vulnerabilities and weaknesses.',
              priority: 'high',
              references: ['11.2.1'],
              examples: ['Penetration testing', 'Annual assessments', 'External testing', 'Remediation tracking'],
              options: [
                { value: 0, label: 'Not implemented', description: 'No penetration testing' },
                { value: 1, label: 'Partially implemented', description: 'Occasional penetration testing' },
                { value: 2, label: 'Largely implemented', description: 'Regular penetration testing' },
                { value: 3, label: 'Fully implemented', description: 'Annual penetration testing program' }
              ]
            }
          ]
        }
      ]
    },
    {
      id: 'information-security-policy',
      name: 'Maintain Information Security Policy',
      description: 'Maintain a policy that addresses information security for all personnel',
      weight: 10,
      priority: 'medium',
      categories: [
        {
          id: 'security-policy',
          name: 'Security Policy',
          description: 'Maintain information security policy',
          weight: 60,
          questions: [
            {
              id: 'pci.12.1.1',
              text: 'Is an information security policy established and published?',
              guidance: 'Establish and publish an information security policy that addresses all personnel.',
              priority: 'high',
              references: ['12.1.1'],
              examples: ['Security policy document', 'Policy communication', 'Staff training', 'Policy updates'],
              options: [
                { value: 0, label: 'Not implemented', description: 'No security policy' },
                { value: 1, label: 'Partially implemented', description: 'Basic security policy exists' },
                { value: 2, label: 'Largely implemented', description: 'Comprehensive security policy' },
                { value: 3, label: 'Fully implemented', description: 'Complete security policy program' }
              ]
            },
            {
              id: 'pci.12.2.1',
              text: 'Are security policies reviewed at least annually?',
              guidance: 'Review security policies at least annually and update as needed.',
              priority: 'medium',
              references: ['12.2.1'],
              examples: ['Annual policy review', 'Policy updates', 'Stakeholder input', 'Version control'],
              options: [
                { value: 0, label: 'Not implemented', description: 'No policy review process' },
                { value: 1, label: 'Partially implemented', description: 'Occasional policy reviews' },
                { value: 2, label: 'Largely implemented', description: 'Regular policy reviews' },
                { value: 3, label: 'Fully implemented', description: 'Annual policy review program' }
              ]
            }
          ]
        },
        {
          id: 'security-awareness',
          name: 'Security Awareness',
          description: 'Provide security awareness training',
          weight: 40,
          questions: [
            {
              id: 'pci.12.6.1',
              text: 'Is security awareness training provided to all personnel?',
              guidance: 'Provide security awareness training to all personnel to ensure they understand security responsibilities.',
              priority: 'medium',
              references: ['12.6.1'],
              examples: ['Security training programs', 'Awareness materials', 'Training records', 'Regular updates'],
              options: [
                { value: 0, label: 'Not implemented', description: 'No security awareness training' },
                { value: 1, label: 'Partially implemented', description: 'Basic security training' },
                { value: 2, label: 'Largely implemented', description: 'Regular security training' },
                { value: 3, label: 'Fully implemented', description: 'Comprehensive security awareness program' }
              ]
            }
          ]
        }
      ]
    }
  ]
};