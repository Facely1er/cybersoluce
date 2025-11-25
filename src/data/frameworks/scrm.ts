import { Framework } from '../../types';

export const scrmFramework: Framework = {
  id: 'scrm',
  name: 'Supply Chain Risk Management (NIST SP 800-161)',
  description: 'Cyber Supply Chain Risk Management practices',
  version: '1.0',
  complexity: 'advanced',
  estimatedTime: 180,
  industry: ['Manufacturing', 'Technology', 'Government', 'Healthcare', 'Financial Services'],
  prerequisites: ['Understanding of supply chain risks', 'Familiarity with cybersecurity frameworks'],
  certificationBody: 'NIST',
  lastUpdated: new Date('2021-05-12'),
  relatedFrameworks: ['NIST CSF', 'ISO 27001', 'NIST SP 800-53'],
  applicableRegulations: ['NIST SP 800-161', 'Executive Order 14028'],
  maturityLevels: [
    { level: 1, name: 'Initial', description: 'Ad hoc supply chain practices', color: '#ef4444', minScore: 0, maxScore: 20 },
    { level: 2, name: 'Developing', description: 'Basic supply chain processes', color: '#f97316', minScore: 21, maxScore: 40 },
    { level: 3, name: 'Defined', description: 'Documented supply chain program', color: '#eab308', minScore: 41, maxScore: 60 },
    { level: 4, name: 'Managed', description: 'Measured supply chain program', color: '#22c55e', minScore: 61, maxScore: 80 },
    { level: 5, name: 'Optimized', description: 'Continuously improving supply chain program', color: '#3b82f6', minScore: 81, maxScore: 100 }
  ],
  sections: [
    {
      id: 'governance',
      name: 'Governance',
      description: 'Establish supply chain risk management governance',
      weight: 18,
      priority: 'high',
      categories: [
        {
          id: 'governance',
          name: 'Supply Chain Governance',
          description: 'Establish governance for supply chain risk management',
          weight: 40,
          questions: [
            {
              id: 'scrm.gov.1',
              text: 'Is supply chain risk management governance established?',
              guidance: 'Establish governance structures, policies, and procedures for managing supply chain cybersecurity risks.',
              priority: 'high',
              references: ['GOV-1'],
              examples: ['Governance frameworks', 'Policy documents', 'Oversight committees', 'Risk management procedures'],
              options: [
                { value: 0, label: 'Not established', description: 'No supply chain risk governance' },
                { value: 1, label: 'Basic establishment', description: 'Some governance elements in place' },
                { value: 2, label: 'Good establishment', description: 'Comprehensive governance with some gaps' },
                { value: 3, label: 'Mature establishment', description: 'Comprehensive governance framework' }
              ]
            },
            {
              id: 'scrm.gov.2',
              text: 'Are supply chain risk management roles and responsibilities defined?',
              guidance: 'Define clear roles and responsibilities for supply chain risk management across the organization.',
              priority: 'high',
              references: ['GOV-2'],
              examples: ['RACI matrices', 'Job descriptions', 'Responsibility assignments', 'Accountability frameworks'],
              options: [
                { value: 0, label: 'Not defined', description: 'No defined roles and responsibilities' },
                { value: 1, label: 'Partially defined', description: 'Some roles defined' },
                { value: 2, label: 'Well defined', description: 'Most roles clearly defined' },
                { value: 3, label: 'Fully defined', description: 'Comprehensive role and responsibility framework' }
              ]
            },
            {
              id: 'scrm.gov.3',
              text: 'Is supply chain risk management integrated into enterprise risk management?',
              guidance: 'Integrate supply chain cybersecurity risks into the organization\'s overall enterprise risk management program.',
              priority: 'medium',
              references: ['GOV-3'],
              examples: ['ERM integration', 'Risk reporting', 'Board oversight', 'Risk appetite statements'],
              options: [
                { value: 0, label: 'Not integrated', description: 'No integration with ERM' },
                { value: 1, label: 'Basic integration', description: 'Some integration with ERM' },
                { value: 2, label: 'Good integration', description: 'Well integrated with ERM' },
                { value: 3, label: 'Full integration', description: 'Comprehensive ERM integration' }
              ]
            },
            {
              id: 'scrm.gov.4',
              text: 'Are supply chain risk tolerance and appetite defined?',
              guidance: 'Define organizational risk tolerance and appetite for supply chain cybersecurity risks.',
              priority: 'medium',
              references: ['GOV-4'],
              examples: ['Risk appetite statements', 'Tolerance thresholds', 'Acceptable risk levels', 'Risk criteria'],
              options: [
                { value: 0, label: 'Not defined', description: 'No risk tolerance defined' },
                { value: 1, label: 'Basic definition', description: 'Some risk tolerance guidelines' },
                { value: 2, label: 'Clear definition', description: 'Well-defined risk appetite' },
                { value: 3, label: 'Comprehensive definition', description: 'Comprehensive risk tolerance framework' }
              ]
            }
          ]
        },
        {
          id: 'policies-procedures',
          name: 'Policies and Procedures',
          description: 'Establish supply chain policies and procedures',
          weight: 30,
          questions: [
            {
              id: 'scrm.pol.1',
              text: 'Are supply chain cybersecurity policies and procedures established?',
              guidance: 'Develop comprehensive policies and procedures for managing cybersecurity risks throughout the supply chain.',
              priority: 'high',
              references: ['POL-1'],
              examples: ['Security policies', 'Procurement procedures', 'Vendor management policies', 'Risk procedures'],
              options: [
                { value: 0, label: 'Not established', description: 'No supply chain security policies' },
                { value: 1, label: 'Basic policies', description: 'Some basic policies exist' },
                { value: 2, label: 'Comprehensive policies', description: 'Well-developed policy framework' },
                { value: 3, label: 'Mature policies', description: 'Comprehensive and regularly updated policies' }
              ]
            },
            {
              id: 'scrm.pol.2',
              text: 'Are supply chain security requirements integrated into contracts and agreements?',
              guidance: 'Include cybersecurity requirements and clauses in all supplier contracts and service agreements.',
              priority: 'high',
              references: ['POL-2'],
              examples: ['Contract security clauses', 'SLA requirements', 'Compliance terms', 'Security standards'],
              options: [
                { value: 0, label: 'Not integrated', description: 'No security requirements in contracts' },
                { value: 1, label: 'Basic integration', description: 'Some contracts include security terms' },
                { value: 2, label: 'Good integration', description: 'Most contracts include security requirements' },
                { value: 3, label: 'Full integration', description: 'All contracts include comprehensive security terms' }
              ]
            },
            {
              id: 'scrm.pol.3',
              text: 'Are policies reviewed and updated regularly?',
              guidance: 'Establish a regular review and update cycle for all supply chain security policies and procedures.',
              priority: 'medium',
              references: ['POL-3'],
              examples: ['Policy review schedules', 'Update procedures', 'Version control', 'Stakeholder reviews'],
              options: [
                { value: 0, label: 'Not reviewed', description: 'No regular policy reviews' },
                { value: 1, label: 'Ad hoc reviews', description: 'Occasional policy updates' },
                { value: 2, label: 'Scheduled reviews', description: 'Regular review cycles' },
                { value: 3, label: 'Continuous improvement', description: 'Ongoing policy optimization' }
              ]
            }
          ]
        },
        {
          id: 'compliance-legal',
          name: 'Compliance and Legal',
          description: 'Ensure compliance with legal and regulatory requirements',
          weight: 30,
          questions: [
            {
              id: 'scrm.comp.1',
              text: 'Are legal and regulatory requirements identified and addressed?',
              guidance: 'Identify and address all applicable legal and regulatory requirements for supply chain cybersecurity.',
              priority: 'high',
              references: ['COMP-1'],
              examples: ['Regulatory mapping', 'Compliance frameworks', 'Legal requirements', 'Industry standards'],
              options: [
                { value: 0, label: 'Not identified', description: 'No legal/regulatory requirement identification' },
                { value: 1, label: 'Partially identified', description: 'Some requirements identified' },
                { value: 2, label: 'Well identified', description: 'Most requirements identified and addressed' },
                { value: 3, label: 'Fully identified', description: 'Comprehensive compliance framework' }
              ]
            },
            {
              id: 'scrm.comp.2',
              text: 'Is compliance with supply chain security requirements monitored?',
              guidance: 'Monitor and validate compliance with supply chain security requirements across all suppliers.',
              priority: 'medium',
              references: ['COMP-2'],
              examples: ['Compliance monitoring', 'Audit programs', 'Validation procedures', 'Non-compliance tracking'],
              options: [
                { value: 0, label: 'Not monitored', description: 'No compliance monitoring' },
                { value: 1, label: 'Basic monitoring', description: 'Some compliance checks' },
                { value: 2, label: 'Regular monitoring', description: 'Systematic compliance monitoring' },
                { value: 3, label: 'Comprehensive monitoring', description: 'Comprehensive compliance management program' }
              ]
            }
          ]
        }
      ]
    },
    {
      id: 'risk-assessment-scrm',
      name: 'Risk Assessment',
      description: 'Assess supply chain cybersecurity risks',
      weight: 18,
      priority: 'high',
      categories: [
        {
          id: 'supplier-assessment',
          name: 'Supplier Risk Assessment',
          description: 'Assess cybersecurity risks from suppliers',
          weight: 35,
          questions: [
            {
              id: 'scrm.ra.1',
              text: 'Are supplier cybersecurity risks assessed?',
              guidance: 'Conduct regular assessments of cybersecurity risks posed by suppliers and third-party providers.',
              priority: 'high',
              references: ['RA-1'],
              examples: ['Supplier assessments', 'Risk questionnaires', 'Security evaluations', 'Due diligence processes'],
              options: [
                { value: 0, label: 'Not assessed', description: 'No supplier risk assessment' },
                { value: 1, label: 'Basic assessment', description: 'Some supplier risk evaluation' },
                { value: 2, label: 'Good assessment', description: 'Regular supplier risk assessment' },
                { value: 3, label: 'Comprehensive assessment', description: 'Comprehensive supplier risk management program' }
              ]
            },
            {
              id: 'scrm.ra.2',
              text: 'Are suppliers categorized and prioritized based on risk?',
              guidance: 'Categorize suppliers based on their risk levels and criticality to business operations.',
              priority: 'high',
              references: ['RA-2'],
              examples: ['Supplier tiering', 'Risk categorization', 'Criticality analysis', 'Priority matrices'],
              options: [
                { value: 0, label: 'Not categorized', description: 'No supplier categorization' },
                { value: 1, label: 'Basic categorization', description: 'Simple supplier grouping' },
                { value: 2, label: 'Risk-based categorization', description: 'Suppliers categorized by risk' },
                { value: 3, label: 'Comprehensive categorization', description: 'Multi-dimensional supplier categorization' }
              ]
            },
            {
              id: 'scrm.ra.3',
              text: 'Are third-party and fourth-party risks assessed?',
              guidance: 'Assess cybersecurity risks from third-party suppliers and their sub-contractors (fourth parties).',
              priority: 'medium',
              references: ['RA-3'],
              examples: ['Third-party assessments', 'Sub-contractor evaluations', 'Vendor chain analysis', 'Extended supply chain mapping'],
              options: [
                { value: 0, label: 'Not assessed', description: 'No third/fourth-party assessment' },
                { value: 1, label: 'Third-party only', description: 'Only direct suppliers assessed' },
                { value: 2, label: 'Extended assessment', description: 'Some fourth-party assessment' },
                { value: 3, label: 'Comprehensive assessment', description: 'Comprehensive supply chain risk assessment' }
              ]
            },
            {
              id: 'scrm.ra.4',
              text: 'Are risk assessments updated based on changes?',
              guidance: 'Update risk assessments when suppliers undergo significant changes or new threats emerge.',
              priority: 'medium',
              references: ['RA-4'],
              examples: ['Change-triggered assessments', 'Periodic reassessments', 'Event-driven updates', 'Risk refresh cycles'],
              options: [
                { value: 0, label: 'Not updated', description: 'Static risk assessments' },
                { value: 1, label: 'Occasional updates', description: 'Some assessment updates' },
                { value: 2, label: 'Event-driven updates', description: 'Updates based on significant changes' },
                { value: 3, label: 'Dynamic assessments', description: 'Continuous risk assessment updates' }
              ]
            }
          ]
        },
        {
          id: 'supply-chain-mapping',
          name: 'Supply Chain Mapping',
          description: 'Map and understand the supply chain',
          weight: 30,
          questions: [
            {
              id: 'scrm.map.1',
              text: 'Is the supply chain mapped and documented?',
              guidance: 'Create comprehensive maps of the supply chain including all suppliers, sub-contractors, and dependencies.',
              priority: 'medium',
              references: ['MAP-1'],
              examples: ['Supply chain diagrams', 'Dependency mapping', 'Supplier inventories', 'Flow documentation'],
              options: [
                { value: 0, label: 'Not mapped', description: 'No supply chain mapping' },
                { value: 1, label: 'Basic mapping', description: 'Some key suppliers mapped' },
                { value: 2, label: 'Good mapping', description: 'Most supply chain mapped' },
                { value: 3, label: 'Comprehensive mapping', description: 'Comprehensive supply chain visibility' }
              ]
            },
            {
              id: 'scrm.map.2',
              text: 'Are critical supply chain components and single points of failure identified?',
              guidance: 'Identify critical components, services, and potential single points of failure in the supply chain.',
              priority: 'high',
              references: ['MAP-2'],
              examples: ['Critical component analysis', 'Single point of failure identification', 'Dependency analysis', 'Impact assessment'],
              options: [
                { value: 0, label: 'Not identified', description: 'No critical component identification' },
                { value: 1, label: 'Partially identified', description: 'Some critical components identified' },
                { value: 2, label: 'Well identified', description: 'Most critical components identified' },
                { value: 3, label: 'Fully identified', description: 'Comprehensive critical component analysis' }
              ]
            },
            {
              id: 'scrm.map.3',
              text: 'Are supply chain interdependencies mapped?',
              guidance: 'Map interdependencies between suppliers, systems, and business processes.',
              priority: 'medium',
              references: ['MAP-3'],
              examples: ['Interdependency diagrams', 'Process flows', 'System integration maps', 'Business impact analysis'],
              options: [
                { value: 0, label: 'Not mapped', description: 'No interdependency mapping' },
                { value: 1, label: 'Basic mapping', description: 'Some interdependencies identified' },
                { value: 2, label: 'Good mapping', description: 'Most interdependencies mapped' },
                { value: 3, label: 'Comprehensive mapping', description: 'Comprehensive interdependency analysis' }
              ]
            },

          ]
        },
        {
          id: 'threat-assessment',
          name: 'Threat Assessment',
          description: 'Assess supply chain threats',
          weight: 35,
          questions: [
            {
              id: 'scrm.threat.1',
              text: 'Are supply chain threat assessments conducted?',
              guidance: 'Conduct regular assessments of threats targeting the supply chain ecosystem.',
              priority: 'medium',
              references: ['THR-1'],
              examples: ['Threat intelligence', 'Attack vector analysis', 'Threat modeling', 'Risk scenarios'],
              options: [
                { value: 0, label: 'Not conducted', description: 'No threat assessment' },
                { value: 1, label: 'Basic assessment', description: 'Some threat evaluation' },
                { value: 2, label: 'Regular assessment', description: 'Periodic threat assessment' },
                { value: 3, label: 'Comprehensive assessment', description: 'Continuous threat assessment program' }
              ]
            },
            {
              id: 'scrm.threat.2',
              text: 'Are supply chain threat intelligence sources utilized?',
              guidance: 'Leverage threat intelligence sources to understand current and emerging supply chain threats.',
              priority: 'low',
              references: ['THR-2'],
              examples: ['Threat feeds', 'Industry intelligence', 'Government sources', 'Vendor notifications'],
              options: [
                { value: 0, label: 'Not utilized', description: 'No threat intelligence sources' },
                { value: 1, label: 'Basic sources', description: 'Some threat intelligence used' },
                { value: 2, label: 'Multiple sources', description: 'Various intelligence sources used' },
                { value: 3, label: 'Comprehensive sources', description: 'Extensive threat intelligence program' }
              ]
            },
            {
              id: 'scrm.threat.3',
              text: 'Are threat scenarios and attack vectors specific to supply chain documented?',
              guidance: 'Document and analyze threat scenarios and attack vectors specific to your supply chain.',
              priority: 'medium',
              references: ['THR-3'],
              examples: ['Attack scenario modeling', 'Threat actor profiling', 'Supply chain attack vectors', 'Impact scenarios'],
              options: [
                { value: 0, label: 'Not documented', description: 'No scenario documentation' },
                { value: 1, label: 'Basic scenarios', description: 'Some threat scenarios identified' },
                { value: 2, label: 'Comprehensive scenarios', description: 'Well-documented threat scenarios' },
                { value: 3, label: 'Advanced modeling', description: 'Sophisticated threat modeling program' }
              ]
            },

          ]
        }
      ]
    },
    {
      id: 'risk-mitigation',
      name: 'Risk Mitigation',
      description: 'Implement supply chain risk mitigation strategies',
      weight: 15,
      priority: 'medium',
      categories: [
        {
          id: 'mitigation-strategies',
          name: 'Mitigation Strategies',
          description: 'Implement strategies to mitigate supply chain risks',
          weight: 35,
          questions: [
            {
              id: 'scrm.rm.1',
              text: 'Are supply chain risk mitigation strategies implemented?',
              guidance: 'Implement appropriate strategies to mitigate identified supply chain cybersecurity risks.',
              priority: 'medium',
              references: ['RM-1'],
              examples: ['Mitigation plans', 'Contract requirements', 'Security controls', 'Alternative suppliers'],
              options: [
                { value: 0, label: 'Not implemented', description: 'No mitigation strategies' },
                { value: 1, label: 'Partially implemented', description: 'Some mitigation measures' },
                { value: 2, label: 'Good implementation', description: 'Comprehensive mitigation strategies' },
                { value: 3, label: 'Mature implementation', description: 'Comprehensive risk mitigation program' }
              ]
            },
            {
              id: 'scrm.rm.2',
              text: 'Are supplier security controls verified and validated?',
              guidance: 'Verify and validate that suppliers implement required security controls and maintain adequate security posture.',
              priority: 'high',
              references: ['RM-2'],
              examples: ['Security audits', 'Control validation', 'Compliance verification', 'Assessment reports'],
              options: [
                { value: 0, label: 'Not verified', description: 'No supplier control verification' },
                { value: 1, label: 'Basic verification', description: 'Some supplier verification' },
                { value: 2, label: 'Regular verification', description: 'Periodic supplier validation' },
                { value: 3, label: 'Comprehensive verification', description: 'Continuous supplier validation program' }
              ]
            },
            {
              id: 'scrm.rm.3',
              text: 'Are alternative suppliers and redundancy measures established?',
              guidance: 'Establish alternative suppliers and redundancy measures to reduce dependency risks.',
              priority: 'medium',
              references: ['RM-3'],
              examples: ['Backup suppliers', 'Redundant services', 'Diversification strategies', 'Contingency plans'],
              options: [
                { value: 0, label: 'Not established', description: 'No alternative suppliers' },
                { value: 1, label: 'Limited alternatives', description: 'Some backup suppliers' },
                { value: 2, label: 'Good alternatives', description: 'Multiple alternative suppliers' },
                { value: 3, label: 'Comprehensive alternatives', description: 'Comprehensive redundancy framework' }
              ]
            }
          ]
        },
        {
          id: 'secure-development',
          name: 'Secure Development',
          description: 'Implement secure development practices',
          weight: 35,
          questions: [
            {
              id: 'scrm.dev.1',
              text: 'Are secure software development practices implemented in the supply chain?',
              guidance: 'Ensure suppliers follow secure software development practices and provide software supply chain security.',
              priority: 'high',
              references: ['DEV-1'],
              examples: ['Secure coding standards', 'Code reviews', 'Vulnerability testing', 'SBOM requirements'],
              options: [
                { value: 0, label: 'Not implemented', description: 'No secure development requirements' },
                { value: 1, label: 'Basic requirements', description: 'Some secure development practices' },
                { value: 2, label: 'Good practices', description: 'Comprehensive secure development' },
                { value: 3, label: 'Mature practices', description: 'Comprehensive secure development lifecycle' }
              ]
            },
            {
              id: 'scrm.dev.2',
              text: 'Are software bills of materials (SBOMs) required and maintained?',
              guidance: 'Require suppliers to provide and maintain software bills of materials for software components.',
              priority: 'medium',
              references: ['DEV-2'],
              examples: ['SBOM requirements', 'Component tracking', 'Vulnerability management', 'License compliance'],
              options: [
                { value: 0, label: 'Not required', description: 'No SBOM requirements' },
                { value: 1, label: 'Basic SBOMs', description: 'Some SBOM collection' },
                { value: 2, label: 'Regular SBOMs', description: 'SBOMs for most software' },
                { value: 3, label: 'Comprehensive SBOMs', description: 'Comprehensive SBOM management program' }
              ]
            },
            {
              id: 'scrm.dev.3',
              text: 'Are software integrity and authenticity controls implemented?',
              guidance: 'Implement controls to verify software integrity and authenticity throughout the supply chain.',
              priority: 'high',
              references: ['DEV-3'],
              examples: ['Code signing', 'Digital signatures', 'Hash verification', 'Provenance tracking'],
              options: [
                { value: 0, label: 'Not implemented', description: 'No integrity controls' },
                { value: 1, label: 'Basic controls', description: 'Some integrity verification' },
                { value: 2, label: 'Good controls', description: 'Comprehensive integrity program' },
                { value: 3, label: 'Advanced controls', description: 'Comprehensive integrity and authenticity framework' }
              ]
            }
          ]
        },
        {
          id: 'procurement-controls',
          name: 'Procurement Controls',
          description: 'Implement secure procurement controls',
          weight: 30,
          questions: [
            {
              id: 'scrm.proc.1',
              text: 'Are cybersecurity requirements integrated into procurement processes?',
              guidance: 'Integrate cybersecurity requirements and considerations into all procurement activities.',
              priority: 'high',
              references: ['PROC-1'],
              examples: ['Procurement security criteria', 'RFP security requirements', 'Vendor selection criteria', 'Security specifications'],
              options: [
                { value: 0, label: 'Not integrated', description: 'No security in procurement' },
                { value: 1, label: 'Basic integration', description: 'Some security considerations' },
                { value: 2, label: 'Good integration', description: 'Security integrated in most procurement' },
                { value: 3, label: 'Full integration', description: 'Comprehensive security-focused procurement' }
              ]
            },
            {
              id: 'scrm.proc.2',
              text: 'Are supplier onboarding and offboarding processes implemented?',
              guidance: 'Implement secure onboarding and offboarding processes for all suppliers and service providers.',
              priority: 'medium',
              references: ['PROC-2'],
              examples: ['Onboarding procedures', 'Security assessments', 'Access provisioning', 'Termination procedures'],
              options: [
                { value: 0, label: 'Not implemented', description: 'No formal onboarding/offboarding' },
                { value: 1, label: 'Basic processes', description: 'Some onboarding procedures' },
                { value: 2, label: 'Good processes', description: 'Comprehensive onboarding/offboarding' },
                { value: 3, label: 'Mature processes', description: 'Comprehensive lifecycle management' }
              ]
            },

          ]
        }
      ]
    },
    {
      id: 'access-control',
      name: 'Access Control',
      description: 'Manage access controls across the supply chain',
      weight: 10,
      priority: 'medium',
      categories: [
        {
          id: 'supplier-access',
          name: 'Supplier Access Management',
          description: 'Manage supplier access to systems and data',
          weight: 60,
          questions: [
            {
              id: 'scrm.ac.1',
              text: 'Are supplier access controls implemented and managed?',
              guidance: 'Implement and manage access controls for suppliers accessing organizational systems and data.',
              priority: 'high',
              references: ['AC-1'],
              examples: ['Access control policies', 'User provisioning', 'Authentication systems', 'Authorization frameworks'],
              options: [
                { value: 0, label: 'Not implemented', description: 'No supplier access controls' },
                { value: 1, label: 'Basic controls', description: 'Some access management' },
                { value: 2, label: 'Good controls', description: 'Comprehensive access control program' },
                { value: 3, label: 'Advanced controls', description: 'Comprehensive access management framework' }
              ]
            },
            {
              id: 'scrm.ac.2',
              text: 'Is least privilege access enforced for suppliers?',
              guidance: 'Enforce least privilege access principles for all supplier access to systems and data.',
              priority: 'high',
              references: ['AC-2'],
              examples: ['Privilege management', 'Role-based access', 'Access reviews', 'Permission audits'],
              options: [
                { value: 0, label: 'Not enforced', description: 'No least privilege enforcement' },
                { value: 1, label: 'Basic enforcement', description: 'Some privilege restrictions' },
                { value: 2, label: 'Good enforcement', description: 'Regular privilege management' },
                { value: 3, label: 'Strict enforcement', description: 'Comprehensive least privilege framework' }
              ]
            },
            {
              id: 'scrm.ac.3',
              text: 'Are supplier access reviews and certifications performed?',
              guidance: 'Perform regular reviews and certifications of supplier access rights and permissions.',
              priority: 'medium',
              references: ['AC-3'],
              examples: ['Access reviews', 'Certification processes', 'Permission audits', 'Recertification cycles'],
              options: [
                { value: 0, label: 'Not performed', description: 'No access reviews' },
                { value: 1, label: 'Ad hoc reviews', description: 'Occasional access reviews' },
                { value: 2, label: 'Regular reviews', description: 'Scheduled access certifications' },
                { value: 3, label: 'Continuous reviews', description: 'Ongoing access review program' }
              ]
            },

          ]
        },
        {
          id: 'remote-access',
          name: 'Remote Access Controls',
          description: 'Control remote access by suppliers',
          weight: 40,
          questions: [
            {
              id: 'scrm.ra.5',
              text: 'Are remote access controls implemented for suppliers?',
              guidance: 'Implement secure remote access controls for suppliers accessing systems remotely.',
              priority: 'high',
              references: ['RA-5'],
              examples: ['VPN controls', 'Multi-factor authentication', 'Session monitoring', 'Network segmentation'],
              options: [
                { value: 0, label: 'Not implemented', description: 'No remote access controls' },
                { value: 1, label: 'Basic controls', description: 'Some remote access security' },
                { value: 2, label: 'Good controls', description: 'Comprehensive remote access program' },
                { value: 3, label: 'Advanced controls', description: 'Comprehensive remote access security framework' }
              ]
            },
            {
              id: 'scrm.ra.6',
              text: 'Is supplier remote access monitored and logged?',
              guidance: 'Monitor and log all supplier remote access activities for security and compliance purposes.',
              priority: 'medium',
              references: ['RA-6'],
              examples: ['Access logging', 'Session recording', 'Activity monitoring', 'Audit trails'],
              options: [
                { value: 0, label: 'Not monitored', description: 'No remote access monitoring' },
                { value: 1, label: 'Basic monitoring', description: 'Some access logging' },
                { value: 2, label: 'Good monitoring', description: 'Comprehensive access monitoring' },
                { value: 3, label: 'Advanced monitoring', description: 'Comprehensive access monitoring and analysis' }
              ]
            }
          ]
        }
      ]
    },
    {
      id: 'data-protection',
      name: 'Data Protection',
      description: 'Protect data across the supply chain',
      weight: 8,
      priority: 'medium',
      categories: [
        {
          id: 'data-handling',
          name: 'Data Handling and Protection',
          description: 'Ensure proper data handling by suppliers',
          weight: 60,
          questions: [
            {
              id: 'scrm.dp.1',
              text: 'Are data protection requirements defined for suppliers?',
              guidance: 'Define clear data protection requirements and standards for all suppliers handling organizational data.',
              priority: 'high',
              references: ['DP-1'],
              examples: ['Data protection policies', 'Handling requirements', 'Privacy standards', 'Compliance obligations'],
              options: [
                { value: 0, label: 'Not defined', description: 'No data protection requirements' },
                { value: 1, label: 'Basic requirements', description: 'Some data protection standards' },
                { value: 2, label: 'Good requirements', description: 'Comprehensive data protection framework' },
                { value: 3, label: 'Advanced requirements', description: 'Comprehensive data protection program' }
              ]
            },
            {
              id: 'scrm.dp.2',
              text: 'Is data encryption required for data in transit and at rest?',
              guidance: 'Require suppliers to encrypt organizational data both in transit and at rest.',
              priority: 'high',
              references: ['DP-2'],
              examples: ['Encryption standards', 'Key management', 'Transport security', 'Storage encryption'],
              options: [
                { value: 0, label: 'Not required', description: 'No encryption requirements' },
                { value: 1, label: 'Basic requirements', description: 'Some encryption standards' },
                { value: 2, label: 'Good requirements', description: 'Comprehensive encryption program' },
                { value: 3, label: 'Advanced requirements', description: 'Comprehensive encryption framework' }
              ]
            },
            {
              id: 'scrm.dp.3',
              text: 'Are data retention and disposal requirements enforced?',
              guidance: 'Enforce data retention and secure disposal requirements for all suppliers handling organizational data.',
              priority: 'medium',
              references: ['DP-3'],
              examples: ['Retention policies', 'Disposal procedures', 'Data lifecycle management', 'Secure deletion'],
              options: [
                { value: 0, label: 'Not enforced', description: 'No retention/disposal requirements' },
                { value: 1, label: 'Basic enforcement', description: 'Some retention standards' },
                { value: 2, label: 'Good enforcement', description: 'Comprehensive data lifecycle management' },
                { value: 3, label: 'Strict enforcement', description: 'Comprehensive data governance program' }
              ]
            }
          ]
        },
        {
          id: 'data-sharing',
          name: 'Data Sharing Controls',
          description: 'Control data sharing with suppliers',
          weight: 40,
          questions: [
            {
              id: 'scrm.ds.1',
              text: 'Are data sharing agreements and controls implemented?',
              guidance: 'Implement formal data sharing agreements and controls for all supplier data exchanges.',
              priority: 'medium',
              references: ['DS-1'],
              examples: ['Data sharing agreements', 'Transfer controls', 'Usage restrictions', 'Sharing policies'],
              options: [
                { value: 0, label: 'Not implemented', description: 'No data sharing controls' },
                { value: 1, label: 'Basic implementation', description: 'Some data sharing agreements' },
                { value: 2, label: 'Good implementation', description: 'Comprehensive data sharing framework' },
                { value: 3, label: 'Advanced implementation', description: 'Comprehensive data sharing governance' }
              ]
            },
            {
              id: 'scrm.ds.2',
              text: 'Is supplier data handling monitored and audited?',
              guidance: 'Monitor and audit supplier data handling practices to ensure compliance with requirements.',
              priority: 'medium',
              references: ['DS-2'],
              examples: ['Data handling audits', 'Compliance monitoring', 'Usage tracking', 'Violation detection'],
              options: [
                { value: 0, label: 'Not monitored', description: 'No data handling monitoring' },
                { value: 1, label: 'Basic monitoring', description: 'Some compliance checks' },
                { value: 2, label: 'Good monitoring', description: 'Regular data handling audits' },
                { value: 3, label: 'Comprehensive monitoring', description: 'Continuous data governance monitoring' }
              ]
            }
          ]
        }
      ]
    },
    {
      id: 'asset-management',
      name: 'Asset Management',
      description: 'Manage assets across the supply chain',
      weight: 7,
      priority: 'medium',
      categories: [
        {
          id: 'asset-inventory',
          name: 'Asset Inventory',
          description: 'Maintain inventory of supply chain assets',
          weight: 50,
          questions: [
            {
              id: 'scrm.am.1',
              text: 'Is an inventory of supply chain assets maintained?',
              guidance: 'Maintain a comprehensive inventory of all assets provided by or dependent on suppliers.',
              priority: 'medium',
              references: ['AM-1'],
              examples: ['Asset inventories', 'Configuration databases', 'Dependency tracking', 'Asset classifications'],
              options: [
                { value: 0, label: 'Not maintained', description: 'No supply chain asset inventory' },
                { value: 1, label: 'Basic inventory', description: 'Some asset tracking' },
                { value: 2, label: 'Good inventory', description: 'Comprehensive asset management' },
                { value: 3, label: 'Comprehensive inventory', description: 'Real-time asset tracking system' }
              ]
            },
            {
              id: 'scrm.am.2',
              text: 'Are supply chain assets classified based on criticality?',
              guidance: 'Classify supply chain assets based on their criticality to business operations and security impact.',
              priority: 'medium',
              references: ['AM-2'],
              examples: ['Asset classification', 'Criticality ratings', 'Impact assessments', 'Risk categories'],
              options: [
                { value: 0, label: 'Not classified', description: 'No asset classification' },
                { value: 1, label: 'Basic classification', description: 'Some asset categorization' },
                { value: 2, label: 'Good classification', description: 'Systematic asset classification' },
                { value: 3, label: 'Advanced classification', description: 'Multi-dimensional asset classification' }
              ]
            },
            {
              id: 'scrm.am.3',
              text: 'Are asset ownership and responsibilities defined?',
              guidance: 'Define clear ownership and responsibilities for all supply chain assets.',
              priority: 'medium',
              references: ['AM-3'],
              examples: ['Asset ownership', 'Responsibility matrices', 'Custodian assignments', 'Accountability frameworks'],
              options: [
                { value: 0, label: 'Not defined', description: 'No asset ownership definition' },
                { value: 1, label: 'Basic definition', description: 'Some ownership clarity' },
                { value: 2, label: 'Clear definition', description: 'Well-defined asset ownership' },
                { value: 3, label: 'Comprehensive definition', description: 'Comprehensive ownership framework' }
              ]
            }
          ]
        },
        {
          id: 'configuration-management',
          name: 'Configuration Management',
          description: 'Manage configuration of supply chain assets',
          weight: 50,
          questions: [
            {
              id: 'scrm.cm.1',
              text: 'Are configuration baselines established for supply chain assets?',
              guidance: 'Establish and maintain configuration baselines for critical supply chain assets and systems.',
              priority: 'medium',
              references: ['CM-1'],
              examples: ['Configuration baselines', 'Standard configurations', 'Hardening standards', 'Security configurations'],
              options: [
                { value: 0, label: 'Not established', description: 'No configuration baselines' },
                { value: 1, label: 'Basic baselines', description: 'Some configuration standards' },
                { value: 2, label: 'Good baselines', description: 'Comprehensive configuration management' },
                { value: 3, label: 'Advanced baselines', description: 'Automated configuration management' }
              ]
            },
            {
              id: 'scrm.cm.2',
              text: 'Are configuration changes controlled and monitored?',
              guidance: 'Control and monitor configuration changes to supply chain assets to prevent unauthorized modifications.',
              priority: 'medium',
              references: ['CM-2'],
              examples: ['Change control', 'Configuration monitoring', 'Drift detection', 'Change approval'],
              options: [
                { value: 0, label: 'Not controlled', description: 'No configuration change control' },
                { value: 1, label: 'Basic control', description: 'Some change management' },
                { value: 2, label: 'Good control', description: 'Systematic change control' },
                { value: 3, label: 'Advanced control', description: 'Automated change control and monitoring' }
              ]
            }
          ]
        }
      ]
    },
    {
      id: 'vulnerability-management',
      name: 'Vulnerability Management',
      description: 'Manage vulnerabilities in the supply chain',
      weight: 7,
      priority: 'high',
      categories: [
        {
          id: 'vulnerability-assessment',
          name: 'Vulnerability Assessment',
          description: 'Assess vulnerabilities in supply chain components',
          weight: 50,
          questions: [
            {
              id: 'scrm.vm.1',
              text: 'Are supply chain vulnerabilities regularly assessed?',
              guidance: 'Regularly assess vulnerabilities in supply chain components, software, and services.',
              priority: 'high',
              references: ['VM-1'],
              examples: ['Vulnerability scans', 'Security assessments', 'Penetration testing', 'Code analysis'],
              options: [
                { value: 0, label: 'Not assessed', description: 'No vulnerability assessment' },
                { value: 1, label: 'Basic assessment', description: 'Some vulnerability testing' },
                { value: 2, label: 'Regular assessment', description: 'Systematic vulnerability assessment' },
                { value: 3, label: 'Comprehensive assessment', description: 'Continuous vulnerability management' }
              ]
            },
            {
              id: 'scrm.vm.2',
              text: 'Are supplier vulnerability disclosure processes established?',
              guidance: 'Establish processes for suppliers to disclose vulnerabilities in their products and services.',
              priority: 'medium',
              references: ['VM-2'],
              examples: ['Disclosure processes', 'Vulnerability reporting', 'Communication channels', 'Response procedures'],
              options: [
                { value: 0, label: 'Not established', description: 'No disclosure processes' },
                { value: 1, label: 'Basic processes', description: 'Some disclosure mechanisms' },
                { value: 2, label: 'Good processes', description: 'Clear disclosure procedures' },
                { value: 3, label: 'Mature processes', description: 'Comprehensive vulnerability disclosure program' }
              ]
            },
            {
              id: 'scrm.vm.3',
              text: 'Are vulnerability remediation timelines defined and enforced?',
              guidance: 'Define and enforce timelines for vulnerability remediation based on risk levels and criticality.',
              priority: 'high',
              references: ['VM-3'],
              examples: ['Remediation timelines', 'SLA requirements', 'Escalation procedures', 'Compliance tracking'],
              options: [
                { value: 0, label: 'Not defined', description: 'No remediation timelines' },
                { value: 1, label: 'Basic timelines', description: 'Some remediation expectations' },
                { value: 2, label: 'Clear timelines', description: 'Well-defined remediation SLAs' },
                { value: 3, label: 'Enforced timelines', description: 'Strict remediation management' }
              ]
            }
          ]
        },
        {
          id: 'patch-management',
          name: 'Patch Management',
          description: 'Manage patches and updates in supply chain',
          weight: 50,
          questions: [
            {
              id: 'scrm.pm.1',
              text: 'Are patch management processes established for supply chain components?',
              guidance: 'Establish patch management processes for all supply chain components and dependencies.',
              priority: 'high',
              references: ['PM-1'],
              examples: ['Patch management', 'Update procedures', 'Testing protocols', 'Deployment schedules'],
              options: [
                { value: 0, label: 'Not established', description: 'No patch management' },
                { value: 1, label: 'Basic processes', description: 'Some patch management' },
                { value: 2, label: 'Good processes', description: 'Systematic patch management' },
                { value: 3, label: 'Mature processes', description: 'Automated patch management program' }
              ]
            },
            {
              id: 'scrm.pm.2',
              text: 'Are emergency patch procedures defined for critical vulnerabilities?',
              guidance: 'Define emergency patch procedures for addressing critical vulnerabilities in supply chain components.',
              priority: 'high',
              references: ['PM-2'],
              examples: ['Emergency procedures', 'Critical patch processes', 'Rapid deployment', 'Risk mitigation'],
              options: [
                { value: 0, label: 'Not defined', description: 'No emergency patch procedures' },
                { value: 1, label: 'Basic procedures', description: 'Some emergency response' },
                { value: 2, label: 'Good procedures', description: 'Clear emergency patch process' },
                { value: 3, label: 'Advanced procedures', description: 'Rapid emergency response capability' }
              ]
            }
          ]
        }
      ]
    },
    {
      id: 'incident-response',
      name: 'Incident Response',
      description: 'Manage supply chain security incidents',
      weight: 8,
      priority: 'high',
      categories: [
        {
          id: 'incident-planning',
          name: 'Incident Response Planning',
          description: 'Plan for supply chain security incidents',
          weight: 50,
          questions: [
            {
              id: 'scrm.ir.1',
              text: 'Is a supply chain incident response plan established?',
              guidance: 'Establish a comprehensive incident response plan specifically for supply chain security incidents.',
              priority: 'high',
              references: ['IR-1'],
              examples: ['Incident response plans', 'Communication procedures', 'Escalation processes', 'Response teams'],
              options: [
                { value: 0, label: 'Not established', description: 'No supply chain incident response plan' },
                { value: 1, label: 'Basic plan', description: 'Some incident response procedures' },
                { value: 2, label: 'Good plan', description: 'Comprehensive incident response framework' },
                { value: 3, label: 'Mature plan', description: 'Comprehensive incident response program' }
              ]
            },
            {
              id: 'scrm.ir.2',
              text: 'Are supplier incident reporting requirements defined?',
              guidance: 'Define clear requirements for suppliers to report security incidents that may impact the organization.',
              priority: 'high',
              references: ['IR-2'],
              examples: ['Reporting requirements', 'Notification timelines', 'Incident categories', 'Contact procedures'],
              options: [
                { value: 0, label: 'Not defined', description: 'No supplier incident reporting requirements' },
                { value: 1, label: 'Basic requirements', description: 'Some reporting guidelines' },
                { value: 2, label: 'Clear requirements', description: 'Well-defined reporting procedures' },
                { value: 3, label: 'Comprehensive requirements', description: 'Comprehensive incident reporting framework' }
              ]
            },
            {
              id: 'scrm.ir.3',
              text: 'Are incident response roles and responsibilities defined for supply chain incidents?',
              guidance: 'Define roles and responsibilities for responding to supply chain security incidents.',
              priority: 'medium',
              references: ['IR-3'],
              examples: ['Response team roles', 'Responsibility matrices', 'Decision authority', 'Communication roles'],
              options: [
                { value: 0, label: 'Not defined', description: 'No incident response roles defined' },
                { value: 1, label: 'Basic roles', description: 'Some response responsibilities' },
                { value: 2, label: 'Clear roles', description: 'Well-defined response structure' },
                { value: 3, label: 'Comprehensive roles', description: 'Comprehensive response organization' }
              ]
            }
          ]
        },
        {
          id: 'incident-handling',
          name: 'Incident Handling',
          description: 'Handle supply chain security incidents',
          weight: 50,
          questions: [
            {
              id: 'scrm.ih.1',
              text: 'Are supply chain incidents detected and analyzed?',
              guidance: 'Implement capabilities to detect and analyze security incidents involving the supply chain.',
              priority: 'high',
              references: ['IH-1'],
              examples: ['Incident detection', 'Analysis procedures', 'Investigation tools', 'Forensic capabilities'],
              options: [
                { value: 0, label: 'Not implemented', description: 'No incident detection/analysis' },
                { value: 1, label: 'Basic capabilities', description: 'Some incident handling' },
                { value: 2, label: 'Good capabilities', description: 'Comprehensive incident management' },
                { value: 3, label: 'Advanced capabilities', description: 'Comprehensive incident handling program' }
              ]
            },
            {
              id: 'scrm.ih.2',
              text: 'Are incident containment and recovery procedures implemented?',
              guidance: 'Implement procedures for containing and recovering from supply chain security incidents.',
              priority: 'high',
              references: ['IH-2'],
              examples: ['Containment procedures', 'Recovery plans', 'Business continuity', 'Service restoration'],
              options: [
                { value: 0, label: 'Not implemented', description: 'No containment/recovery procedures' },
                { value: 1, label: 'Basic procedures', description: 'Some incident response' },
                { value: 2, label: 'Good procedures', description: 'Comprehensive response procedures' },
                { value: 3, label: 'Advanced procedures', description: 'Comprehensive incident response capabilities' }
              ]
            },
            {
              id: 'scrm.ih.3',
              text: 'Are lessons learned captured and applied from supply chain incidents?',
              guidance: 'Capture lessons learned from supply chain incidents and apply them to improve security posture.',
              priority: 'medium',
              references: ['IH-3'],
              examples: ['Lessons learned reports', 'Process improvements', 'Training updates', 'Policy revisions'],
              options: [
                { value: 0, label: 'Not captured', description: 'No lessons learned process' },
                { value: 1, label: 'Basic capture', description: 'Some incident learning' },
                { value: 2, label: 'Good capture', description: 'Regular lessons learned process' },
                { value: 3, label: 'Comprehensive capture', description: 'Comprehensive learning and improvement program' }
              ]
            }
          ]
        }
      ]
    },
    {
      id: 'business-continuity',
      name: 'Business Continuity',
      description: 'Ensure business continuity across supply chain',
      weight: 7,
      priority: 'high',
      categories: [
        {
          id: 'continuity-planning',
          name: 'Continuity Planning',
          description: 'Plan for supply chain business continuity',
          weight: 60,
          questions: [
            {
              id: 'scrm.bc.1',
              text: 'Are business continuity plans established for supply chain disruptions?',
              guidance: 'Establish business continuity plans specifically addressing supply chain disruptions and failures.',
              priority: 'high',
              references: ['BC-1'],
              examples: ['Continuity plans', 'Contingency procedures', 'Alternative suppliers', 'Recovery strategies'],
              options: [
                { value: 0, label: 'Not established', description: 'No supply chain continuity planning' },
                { value: 1, label: 'Basic plans', description: 'Some continuity procedures' },
                { value: 2, label: 'Good plans', description: 'Comprehensive continuity planning' },
                { value: 3, label: 'Mature plans', description: 'Comprehensive business continuity program' }
              ]
            },
            {
              id: 'scrm.bc.2',
              text: 'Are critical supplier dependencies identified and addressed?',
              guidance: 'Identify critical supplier dependencies and implement measures to address potential disruptions.',
              priority: 'high',
              references: ['BC-2'],
              examples: ['Dependency analysis', 'Critical supplier identification', 'Risk mitigation', 'Alternative sources'],
              options: [
                { value: 0, label: 'Not identified', description: 'No critical dependency analysis' },
                { value: 1, label: 'Partially identified', description: 'Some critical suppliers identified' },
                { value: 2, label: 'Well identified', description: 'Most dependencies mapped and addressed' },
                { value: 3, label: 'Fully identified', description: 'Comprehensive dependency management' }
              ]
            },
            {
              id: 'scrm.bc.3',
              text: 'Are business continuity plans tested and updated?',
              guidance: 'Regularly test and update business continuity plans for supply chain scenarios.',
              priority: 'medium',
              references: ['BC-3'],
              examples: ['Plan testing', 'Simulation exercises', 'Plan updates', 'Effectiveness reviews'],
              options: [
                { value: 0, label: 'Not tested', description: 'No plan testing' },
                { value: 1, label: 'Basic testing', description: 'Some plan validation' },
                { value: 2, label: 'Regular testing', description: 'Systematic plan testing' },
                { value: 3, label: 'Comprehensive testing', description: 'Continuous plan improvement' }
              ]
            }
          ]
        },
        {
          id: 'recovery-procedures',
          name: 'Recovery Procedures',
          description: 'Implement supply chain recovery procedures',
          weight: 40,
          questions: [
            {
              id: 'scrm.rp.1',
              text: 'Are recovery procedures defined for supply chain failures?',
              guidance: 'Define clear recovery procedures for various types of supply chain failures and disruptions.',
              priority: 'medium',
              references: ['RP-1'],
              examples: ['Recovery procedures', 'Restoration plans', 'Service recovery', 'Operations resumption'],
              options: [
                { value: 0, label: 'Not defined', description: 'No recovery procedures' },
                { value: 1, label: 'Basic procedures', description: 'Some recovery planning' },
                { value: 2, label: 'Good procedures', description: 'Comprehensive recovery framework' },
                { value: 3, label: 'Advanced procedures', description: 'Comprehensive recovery management' }
              ]
            },
            {
              id: 'scrm.rp.2',
              text: 'Are recovery time objectives (RTOs) defined for critical supply chain services?',
              guidance: 'Define recovery time objectives for critical supply chain services and components.',
              priority: 'medium',
              references: ['RP-2'],
              examples: ['Recovery time objectives', 'Service level agreements', 'Recovery priorities', 'Time targets'],
              options: [
                { value: 0, label: 'Not defined', description: 'No RTOs defined' },
                { value: 1, label: 'Basic RTOs', description: 'Some recovery targets' },
                { value: 2, label: 'Clear RTOs', description: 'Well-defined recovery objectives' },
                { value: 3, label: 'Comprehensive RTOs', description: 'Comprehensive recovery framework' }
              ]
            }
          ]
        }
      ]
    },
    {
      id: 'monitoring',
      name: 'Monitoring',
      description: 'Monitor supply chain cybersecurity risks',
      weight: 8,
      priority: 'medium',
      categories: [
        {
          id: 'continuous-monitoring',
          name: 'Continuous Monitoring',
          description: 'Continuously monitor supply chain risks',
          weight: 60,
          questions: [
            {
              id: 'scrm.mon.1',
              text: 'Is supply chain risk monitoring implemented?',
              guidance: 'Implement continuous monitoring of supply chain cybersecurity risks and supplier performance.',
              priority: 'medium',
              references: ['MON-1'],
              examples: ['Monitoring systems', 'Performance metrics', 'Risk indicators', 'Supplier scorecards'],
              options: [
                { value: 0, label: 'Not implemented', description: 'No supply chain monitoring' },
                { value: 1, label: 'Basic implementation', description: 'Some monitoring activities' },
                { value: 2, label: 'Good implementation', description: 'Regular monitoring with metrics' },
                { value: 3, label: 'Mature implementation', description: 'Comprehensive continuous monitoring' }
              ]
            },
            {
              id: 'scrm.mon.2',
              text: 'Are supply chain security incidents tracked and analyzed?',
              guidance: 'Track and analyze security incidents involving suppliers and supply chain components.',
              priority: 'high',
              references: ['MON-2'],
              examples: ['Incident tracking', 'Supplier incident reporting', 'Root cause analysis', 'Trend analysis'],
              options: [
                { value: 0, label: 'Not tracked', description: 'No incident tracking' },
                { value: 1, label: 'Basic tracking', description: 'Some incident documentation' },
                { value: 2, label: 'Good tracking', description: 'Regular incident analysis' },
                { value: 3, label: 'Comprehensive tracking', description: 'Comprehensive incident management program' }
              ]
            },
            {
              id: 'scrm.mon.3',
              text: 'Are supplier security posture changes monitored?',
              guidance: 'Monitor changes in supplier security posture, including acquisitions, changes in ownership, or security incidents.',
              priority: 'medium',
              references: ['MON-3'],
              examples: ['Security posture monitoring', 'Change notifications', 'Risk reassessment triggers', 'Continuous assessment'],
              options: [
                { value: 0, label: 'Not monitored', description: 'No posture monitoring' },
                { value: 1, label: 'Basic monitoring', description: 'Some change awareness' },
                { value: 2, label: 'Regular monitoring', description: 'Systematic posture monitoring' },
                { value: 3, label: 'Comprehensive monitoring', description: 'Real-time posture monitoring' }
              ]
            },

          ]
        },
        {
          id: 'performance-metrics',
          name: 'Performance Metrics',
          description: 'Measure supply chain security performance',
          weight: 40,
          questions: [
            {
              id: 'scrm.metrics.1',
              text: 'Are supply chain security metrics and KPIs established?',
              guidance: 'Establish key performance indicators and metrics to measure supply chain cybersecurity effectiveness.',
              priority: 'medium',
              references: ['MET-1'],
              examples: ['Security KPIs', 'Performance dashboards', 'Risk metrics', 'Compliance measurements'],
              options: [
                { value: 0, label: 'Not established', description: 'No security metrics' },
                { value: 1, label: 'Basic metrics', description: 'Some performance indicators' },
                { value: 2, label: 'Good metrics', description: 'Comprehensive KPI framework' },
                { value: 3, label: 'Mature metrics', description: 'Advanced analytics and reporting' }
              ]
            },
            {
              id: 'scrm.metrics.2',
              text: 'Is supply chain security performance regularly reported?',
              guidance: 'Regularly report on supply chain security performance to management and stakeholders.',
              priority: 'low',
              references: ['MET-2'],
              examples: ['Security reports', 'Executive dashboards', 'Trend analysis', 'Risk reporting'],
              options: [
                { value: 0, label: 'Not reported', description: 'No performance reporting' },
                { value: 1, label: 'Ad hoc reporting', description: 'Occasional reports' },
                { value: 2, label: 'Regular reporting', description: 'Scheduled performance reports' },
                { value: 3, label: 'Comprehensive reporting', description: 'Real-time reporting and analytics' }
              ]
            }
          ]
        }
      ]
    },
    {
      id: 'physical-security',
      name: 'Physical Security',
      description: 'Manage physical security across supply chain',
      weight: 4,
      priority: 'medium',
      categories: [
        {
          id: 'facility-security',
          name: 'Facility Security',
          description: 'Ensure physical security of supplier facilities',
          weight: 60,
          questions: [
            {
              id: 'scrm.ps.1',
              text: 'Are supplier facility security requirements defined?',
              guidance: 'Define physical security requirements for supplier facilities handling sensitive data or components.',
              priority: 'medium',
              references: ['PS-1'],
              examples: ['Facility security standards', 'Access controls', 'Surveillance requirements', 'Environmental controls'],
              options: [
                { value: 0, label: 'Not defined', description: 'No facility security requirements' },
                { value: 1, label: 'Basic requirements', description: 'Some facility security standards' },
                { value: 2, label: 'Good requirements', description: 'Comprehensive facility security framework' },
                { value: 3, label: 'Advanced requirements', description: 'Comprehensive facility security program' }
              ]
            },
            {
              id: 'scrm.ps.2',
              text: 'Are supplier facilities assessed for physical security compliance?',
              guidance: 'Assess supplier facilities for compliance with physical security requirements and standards.',
              priority: 'medium',
              references: ['PS-2'],
              examples: ['Facility assessments', 'Security audits', 'Compliance verification', 'Site visits'],
              options: [
                { value: 0, label: 'Not assessed', description: 'No facility security assessment' },
                { value: 1, label: 'Basic assessment', description: 'Some facility reviews' },
                { value: 2, label: 'Regular assessment', description: 'Systematic facility security evaluation' },
                { value: 3, label: 'Comprehensive assessment', description: 'Comprehensive facility security management' }
              ]
            }
          ]
        },
        {
          id: 'asset-protection',
          name: 'Asset Protection',
          description: 'Protect physical assets in supply chain',
          weight: 40,
          questions: [
            {
              id: 'scrm.ap.1',
              text: 'Are physical asset protection measures implemented?',
              guidance: 'Implement measures to protect physical assets throughout the supply chain lifecycle.',
              priority: 'medium',
              references: ['AP-1'],
              examples: ['Asset protection', 'Tamper evidence', 'Secure transport', 'Chain of custody'],
              options: [
                { value: 0, label: 'Not implemented', description: 'No asset protection measures' },
                { value: 1, label: 'Basic protection', description: 'Some asset security' },
                { value: 2, label: 'Good protection', description: 'Comprehensive asset protection' },
                { value: 3, label: 'Advanced protection', description: 'Comprehensive asset security program' }
              ]
            },
            {
              id: 'scrm.ap.2',
              text: 'Is secure transportation and logistics ensured?',
              guidance: 'Ensure secure transportation and logistics processes for supply chain assets and components.',
              priority: 'low',
              references: ['AP-2'],
              examples: ['Secure transport', 'Logistics security', 'Delivery verification', 'Transit protection'],
              options: [
                { value: 0, label: 'Not ensured', description: 'No secure transportation' },
                { value: 1, label: 'Basic security', description: 'Some transport security' },
                { value: 2, label: 'Good security', description: 'Comprehensive logistics security' },
                { value: 3, label: 'Advanced security', description: 'Comprehensive transportation security program' }
              ]
            }
          ]
        }
      ]
    },
    {
      id: 'training-awareness',
      name: 'Training and Awareness',
      description: 'Provide supply chain security training and awareness',
      weight: 4,
      priority: 'low',
      categories: [
        {
          id: 'training-programs',
          name: 'Training Programs',
          description: 'Implement supply chain security training',
          weight: 60,
          questions: [
            {
              id: 'scrm.tr.1',
              text: 'Is supply chain security training provided to staff?',
              guidance: 'Provide training to staff on supply chain cybersecurity risks and management practices.',
              priority: 'medium',
              references: ['TR-1'],
              examples: ['Training programs', 'Security awareness', 'Best practices', 'Role-specific training'],
              options: [
                { value: 0, label: 'Not provided', description: 'No supply chain security training' },
                { value: 1, label: 'Basic training', description: 'Some security awareness' },
                { value: 2, label: 'Good training', description: 'Regular training programs' },
                { value: 3, label: 'Comprehensive training', description: 'Comprehensive training and awareness program' }
              ]
            },
            {
              id: 'scrm.tr.2',
              text: 'Are supplier security requirements communicated and enforced?',
              guidance: 'Communicate security requirements to suppliers and ensure they understand their obligations.',
              priority: 'medium',
              references: ['TR-2'],
              examples: ['Requirement communication', 'Supplier training', 'Compliance education', 'Best practice sharing'],
              options: [
                { value: 0, label: 'Not communicated', description: 'No supplier requirement communication' },
                { value: 1, label: 'Basic communication', description: 'Some requirement sharing' },
                { value: 2, label: 'Good communication', description: 'Regular supplier education' },
                { value: 3, label: 'Comprehensive communication', description: 'Comprehensive supplier awareness program' }
              ]
            },
            {
              id: 'scrm.tr.3',
              text: 'Is specialized training provided for supply chain roles?',
              guidance: 'Provide specialized training for personnel with supply chain security responsibilities.',
              priority: 'medium',
              references: ['TR-3'],
              examples: ['Role-based training', 'Specialized curricula', 'Technical training', 'Certification programs'],
              options: [
                { value: 0, label: 'Not provided', description: 'No specialized training' },
                { value: 1, label: 'Basic training', description: 'Some role-specific training' },
                { value: 2, label: 'Good training', description: 'Comprehensive specialized training' },
                { value: 3, label: 'Advanced training', description: 'Comprehensive role-based training program' }
              ]
            }
          ]
        },
        {
          id: 'awareness-programs',
          name: 'Awareness Programs',
          description: 'Maintain supply chain security awareness',
          weight: 40,
          questions: [
            {
              id: 'scrm.aw.1',
              text: 'Are supply chain threat awareness programs implemented?',
              guidance: 'Implement programs to maintain awareness of current supply chain threats and attack methods.',
              priority: 'low',
              references: ['AW-1'],
              examples: ['Threat briefings', 'Security updates', 'Industry alerts', 'Awareness campaigns'],
              options: [
                { value: 0, label: 'Not implemented', description: 'No threat awareness programs' },
                { value: 1, label: 'Basic programs', description: 'Some threat communications' },
                { value: 2, label: 'Good programs', description: 'Regular awareness activities' },
                { value: 3, label: 'Comprehensive programs', description: 'Comprehensive threat awareness program' }
              ]
            },
            {
              id: 'scrm.aw.2',
              text: 'Is supply chain security knowledge regularly updated?',
              guidance: 'Regularly update supply chain security knowledge based on emerging threats and best practices.',
              priority: 'low',
              references: ['AW-2'],
              examples: ['Knowledge updates', 'Training refreshers', 'Best practice reviews', 'Continuous learning'],
              options: [
                { value: 0, label: 'Not updated', description: 'No knowledge updates' },
                { value: 1, label: 'Occasional updates', description: 'Some knowledge refreshing' },
                { value: 2, label: 'Regular updates', description: 'Scheduled knowledge updates' },
                { value: 3, label: 'Continuous updates', description: 'Ongoing learning and development program' }
              ]
            }
          ]
        }
      ]
    }
  ]
};