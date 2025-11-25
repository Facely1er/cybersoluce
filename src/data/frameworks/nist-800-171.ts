import { Framework } from '../../types';

export const nist800171Framework: Framework = {
  id: 'nist_800_171',
  name: 'NIST SP 800-171',
  description: 'Protecting Controlled Unclassified Information in Nonfederal Systems and Organizations',
  version: 'Rev 2',
  complexity: 'advanced',
  estimatedTime: 300,
  industry: ['Government Contractors', 'Defense', 'Aerospace', 'Technology', 'Research'],
  prerequisites: ['Understanding of CUI requirements', 'Familiarity with federal security standards'],
  certificationBody: 'NIST',
  lastUpdated: new Date('2020-02-01'),
  relatedFrameworks: ['NIST CSF', 'NIST SP 800-53', 'CMMC', 'FISMA'],
  applicableRegulations: ['DFARS', 'CMMC', 'FISMA', 'ITAR'],
  maturityLevels: [
    { 
      level: 1, 
      name: 'Basic', 
      description: 'Basic security controls implemented', 
      color: '#ef4444', 
      minScore: 0, 
      maxScore: 20,
      characteristics: ['Basic security controls', 'Limited documentation', 'Ad hoc processes'],
      typicalOrganizations: ['Small contractors', 'Organizations new to CUI'],
      nextSteps: ['Implement remaining controls', 'Enhance documentation', 'Develop processes']
    },
    { 
      level: 2, 
      name: 'Developing', 
      description: 'Security controls being developed and implemented', 
      color: '#f97316', 
      minScore: 21, 
      maxScore: 40,
      characteristics: ['Some controls implemented', 'Basic documentation', 'Informal processes'],
      typicalOrganizations: ['Growing contractors', 'Organizations implementing CUI controls'],
      nextSteps: ['Complete control implementation', 'Enhance documentation', 'Formalize processes']
    },
    { 
      level: 3, 
      name: 'Defined', 
      description: 'Security controls derived from NIST SP 800-53', 
      color: '#eab308', 
      minScore: 41, 
      maxScore: 60,
      characteristics: ['Most controls implemented', 'Good documentation', 'Regular processes'],
      typicalOrganizations: ['Mid-size contractors', 'Organizations with CUI experience'],
      nextSteps: ['Complete remaining controls', 'Enhance monitoring', 'Improve documentation']
    },
    { 
      level: 4, 
      name: 'Managed', 
      description: 'Security controls managed and monitored', 
      color: '#22c55e', 
      minScore: 61, 
      maxScore: 80,
      characteristics: ['All controls implemented', 'Comprehensive documentation', 'Mature processes'],
      typicalOrganizations: ['Large contractors', 'CMMC Level 3 organizations'],
      nextSteps: ['Maintain compliance', 'Continuous improvement', 'Advanced monitoring']
    },
    { 
      level: 5, 
      name: 'Optimized', 
      description: 'Tailored security controls for specific requirements', 
      color: '#3b82f6', 
      minScore: 81, 
      maxScore: 100,
      characteristics: ['Optimized controls', 'Advanced documentation', 'Continuous improvement'],
      typicalOrganizations: ['Leading contractors', 'CMMC Level 3+ organizations'],
      nextSteps: ['Industry leadership', 'Best practice sharing', 'Innovation']
    }
  ],
  sections: [
    {
      id: 'access-control',
      name: 'Access Control (AC)',
      description: 'Limit information system access to authorized users, processes, and devices',
      weight: 15,
      priority: 'high',
      categories: [
        {
          id: 'access-control-policy',
          name: 'Access Control Policy',
          description: 'Develop, document, and disseminate access control policy',
          weight: 20,
          questions: [
            {
              id: 'nist800171.ac.1.1',
              text: 'Is an access control policy developed, documented, and disseminated?',
              guidance: 'Develop, document, and disseminate an access control policy that addresses purpose, scope, roles, responsibilities, management commitment, coordination among organizational entities, and compliance.',
              priority: 'high',
              references: ['AC-1'],
              examples: ['Access control policy document', 'Policy communication', 'Staff training', 'Policy updates'],
              options: [
                { value: 0, label: 'Not implemented', description: 'No access control policy' },
                { value: 1, label: 'Partially implemented', description: 'Basic policy exists' },
                { value: 2, label: 'Largely implemented', description: 'Comprehensive policy with some gaps' },
                { value: 3, label: 'Fully implemented', description: 'Complete access control policy program' }
              ]
            }
          ]
        },
        {
          id: 'account-management',
          name: 'Account Management',
          description: 'Manage information system accounts',
          weight: 30,
          questions: [
            {
              id: 'nist800171.ac.2.1',
              text: 'Are information system accounts managed through the entire account lifecycle?',
              guidance: 'Manage information system accounts through the entire account lifecycle including account creation, modification, enabling, disabling, and removal.',
              priority: 'high',
              references: ['AC-2'],
              examples: ['Account provisioning', 'Account modification', 'Account deactivation', 'Account removal'],
              options: [
                { value: 0, label: 'Not implemented', description: 'No account management process' },
                { value: 1, label: 'Partially implemented', description: 'Basic account management' },
                { value: 2, label: 'Largely implemented', description: 'Most accounts properly managed' },
                { value: 3, label: 'Fully implemented', description: 'Comprehensive account management program' }
              ]
            },
            {
              id: 'nist800171.ac.2.2',
              text: 'Are information system accounts automatically disabled after a specified period of inactivity?',
              guidance: 'Automatically disable information system accounts after a specified period of inactivity.',
              priority: 'high',
              references: ['AC-2(2)'],
              examples: ['Automatic account disabling', 'Inactivity timeouts', 'Account monitoring', 'Reactivation procedures'],
              options: [
                { value: 0, label: 'Not implemented', description: 'No automatic account disabling' },
                { value: 1, label: 'Partially implemented', description: 'Some accounts automatically disabled' },
                { value: 2, label: 'Largely implemented', description: 'Most accounts automatically disabled' },
                { value: 3, label: 'Fully implemented', description: 'All accounts automatically disabled after inactivity' }
              ]
            }
          ]
        },
        {
          id: 'access-enforcement',
          name: 'Access Enforcement',
          description: 'Enforce approved authorizations for logical access',
          weight: 30,
          questions: [
            {
              id: 'nist800171.ac.3.1',
              text: 'Are approved authorizations enforced for logical access to information and information system resources?',
              guidance: 'Enforce approved authorizations for logical access to information and information system resources in accordance with applicable access control policies.',
              priority: 'high',
              references: ['AC-3'],
              examples: ['Access control lists', 'Role-based access control', 'Permission matrices', 'Authorization enforcement'],
              options: [
                { value: 0, label: 'Not implemented', description: 'No access enforcement' },
                { value: 1, label: 'Partially implemented', description: 'Basic access controls' },
                { value: 2, label: 'Largely implemented', description: 'Most access properly enforced' },
                { value: 3, label: 'Fully implemented', description: 'Comprehensive access enforcement' }
              ]
            }
          ]
        },
        {
          id: 'information-flow-enforcement',
          name: 'Information Flow Enforcement',
          description: 'Enforce approved authorizations for controlling the flow of information',
          weight: 20,
          questions: [
            {
              id: 'nist800171.ac.4.1',
              text: 'Are approved authorizations enforced for controlling the flow of information within the system and between interconnected systems?',
              guidance: 'Enforce approved authorizations for controlling the flow of information within the system and between interconnected systems.',
              priority: 'medium',
              references: ['AC-4'],
              examples: ['Information flow controls', 'Network segmentation', 'Data flow policies', 'Interconnection agreements'],
              options: [
                { value: 0, label: 'Not implemented', description: 'No information flow controls' },
                { value: 1, label: 'Partially implemented', description: 'Basic flow controls' },
                { value: 2, label: 'Largely implemented', description: 'Most information flows controlled' },
                { value: 3, label: 'Fully implemented', description: 'Comprehensive information flow enforcement' }
              ]
            }
          ]
        }
      ]
    },
    {
      id: 'awareness-training',
      name: 'Awareness and Training (AT)',
      description: 'Ensure that managers and users of organizational information systems are made aware of security risks',
      weight: 10,
      priority: 'medium',
      categories: [
        {
          id: 'security-awareness',
          name: 'Security Awareness',
          description: 'Provide security awareness training',
          weight: 50,
          questions: [
            {
              id: 'nist800171.at.2.1',
              text: 'Is security awareness training provided to information system users?',
              guidance: 'Provide security awareness training to information system users as part of initial training and at least annually thereafter.',
              priority: 'high',
              references: ['AT-2'],
              examples: ['Security training programs', 'Awareness materials', 'Training records', 'Regular updates'],
              options: [
                { value: 0, label: 'Not implemented', description: 'No security awareness training' },
                { value: 1, label: 'Partially implemented', description: 'Basic security training' },
                { value: 2, label: 'Largely implemented', description: 'Regular security training' },
                { value: 3, label: 'Fully implemented', description: 'Comprehensive security awareness program' }
              ]
            }
          ]
        },
        {
          id: 'role-based-training',
          name: 'Role-Based Training',
          description: 'Provide role-based security training',
          weight: 50,
          questions: [
            {
              id: 'nist800171.at.3.1',
              text: 'Is role-based security training provided to personnel with assigned security roles?',
              guidance: 'Provide role-based security training to personnel with assigned security roles and responsibilities.',
              priority: 'medium',
              references: ['AT-3'],
              examples: ['Role-specific training', 'Security role training', 'Specialized training', 'Certification programs'],
              options: [
                { value: 0, label: 'Not implemented', description: 'No role-based training' },
                { value: 1, label: 'Partially implemented', description: 'Basic role training' },
                { value: 2, label: 'Largely implemented', description: 'Most roles have training' },
                { value: 3, label: 'Fully implemented', description: 'Comprehensive role-based training program' }
              ]
            }
          ]
        }
      ]
    },
    {
      id: 'audit-accountability',
      name: 'Audit and Accountability (AU)',
      description: 'Create, protect, and retain information system audit records',
      weight: 15,
      priority: 'high',
      categories: [
        {
          id: 'audit-events',
          name: 'Audit Events',
          description: 'Create and retain audit records',
          weight: 40,
          questions: [
            {
              id: 'nist800171.au.2.1',
              text: 'Are audit records created and retained for auditable events?',
              guidance: 'Create and retain audit records for auditable events to enable monitoring, analysis, investigation, and reporting of unlawful, unauthorized, or inappropriate information system activity.',
              priority: 'high',
              references: ['AU-2'],
              examples: ['Audit logging', 'Event recording', 'Log retention', 'Audit trails'],
              options: [
                { value: 0, label: 'Not implemented', description: 'No audit records created' },
                { value: 1, label: 'Partially implemented', description: 'Basic audit logging' },
                { value: 2, label: 'Largely implemented', description: 'Most events audited' },
                { value: 3, label: 'Fully implemented', description: 'Comprehensive audit record creation' }
              ]
            }
          ]
        },
        {
          id: 'audit-content',
          name: 'Audit Content',
          description: 'Include specific information in audit records',
          weight: 30,
          questions: [
            {
              id: 'nist800171.au.3.1',
              text: 'Do audit records contain sufficient information to establish what events occurred?',
              guidance: 'Ensure audit records contain sufficient information to establish what events occurred, when they occurred, where they occurred, who was involved, and the outcome of the events.',
              priority: 'high',
              references: ['AU-3'],
              examples: ['Event details', 'Timestamps', 'User identification', 'Outcome information'],
              options: [
                { value: 0, label: 'Not implemented', description: 'Insufficient audit information' },
                { value: 1, label: 'Partially implemented', description: 'Basic audit information' },
                { value: 2, label: 'Largely implemented', description: 'Most audit records complete' },
                { value: 3, label: 'Fully implemented', description: 'Comprehensive audit information' }
              ]
            }
          ]
        },
        {
          id: 'audit-storage',
          name: 'Audit Storage',
          description: 'Protect and retain audit records',
          weight: 30,
          questions: [
            {
              id: 'nist800171.au.4.1',
              text: 'Are audit records protected from unauthorized access, modification, and deletion?',
              guidance: 'Protect audit records from unauthorized access, modification, and deletion.',
              priority: 'high',
              references: ['AU-4'],
              examples: ['Audit log protection', 'Access controls', 'Integrity protection', 'Secure storage'],
              options: [
                { value: 0, label: 'Not implemented', description: 'No audit record protection' },
                { value: 1, label: 'Partially implemented', description: 'Basic audit protection' },
                { value: 2, label: 'Largely implemented', description: 'Most audit records protected' },
                { value: 3, label: 'Fully implemented', description: 'Comprehensive audit record protection' }
              ]
            }
          ]
        }
      ]
    },
    {
      id: 'configuration-management',
      name: 'Configuration Management (CM)',
      description: 'Establish and maintain baseline configurations and inventories',
      weight: 10,
      priority: 'medium',
      categories: [
        {
          id: 'baseline-configurations',
          name: 'Baseline Configurations',
          description: 'Establish and maintain baseline configurations',
          weight: 50,
          questions: [
            {
              id: 'nist800171.cm.2.1',
              text: 'Are baseline configurations established and maintained for information systems?',
              guidance: 'Establish and maintain baseline configurations for information systems and system components.',
              priority: 'high',
              references: ['CM-2'],
              examples: ['Configuration baselines', 'System configurations', 'Hardening standards', 'Configuration management'],
              options: [
                { value: 0, label: 'Not implemented', description: 'No baseline configurations' },
                { value: 1, label: 'Partially implemented', description: 'Basic configuration baselines' },
                { value: 2, label: 'Largely implemented', description: 'Most systems have baselines' },
                { value: 3, label: 'Fully implemented', description: 'Comprehensive baseline configuration program' }
              ]
            }
          ]
        },
        {
          id: 'configuration-change-control',
          name: 'Configuration Change Control',
          description: 'Control changes to information systems',
          weight: 50,
          questions: [
            {
              id: 'nist800171.cm.3.1',
              text: 'Are changes to information systems controlled through a formal change control process?',
              guidance: 'Control changes to information systems through a formal change control process.',
              priority: 'high',
              references: ['CM-3'],
              examples: ['Change control procedures', 'Change approval process', 'Testing requirements', 'Rollback procedures'],
              options: [
                { value: 0, label: 'Not implemented', description: 'No change control process' },
                { value: 1, label: 'Partially implemented', description: 'Basic change procedures' },
                { value: 2, label: 'Largely implemented', description: 'Most changes controlled' },
                { value: 3, label: 'Fully implemented', description: 'Comprehensive change control program' }
              ]
            }
          ]
        }
      ]
    },
    {
      id: 'identification-authentication',
      name: 'Identification and Authentication (IA)',
      description: 'Identify information system users and authenticate their identities',
      weight: 15,
      priority: 'high',
      categories: [
        {
          id: 'identification-policy',
          name: 'Identification Policy',
          description: 'Develop identification and authentication policy',
          weight: 20,
          questions: [
            {
              id: 'nist800171.ia.1.1',
              text: 'Is an identification and authentication policy developed, documented, and disseminated?',
              guidance: 'Develop, document, and disseminate an identification and authentication policy that addresses purpose, scope, roles, responsibilities, management commitment, coordination among organizational entities, and compliance.',
              priority: 'high',
              references: ['IA-1'],
              examples: ['IA policy document', 'Policy communication', 'Staff training', 'Policy updates'],
              options: [
                { value: 0, label: 'Not implemented', description: 'No IA policy' },
                { value: 1, label: 'Partially implemented', description: 'Basic IA policy' },
                { value: 2, label: 'Largely implemented', description: 'Comprehensive IA policy' },
                { value: 3, label: 'Fully implemented', description: 'Complete IA policy program' }
              ]
            }
          ]
        },
        {
          id: 'user-identification',
          name: 'User Identification',
          description: 'Uniquely identify users',
          weight: 40,
          questions: [
            {
              id: 'nist800171.ia.2.1',
              text: 'Are users uniquely identified before allowing access to information systems?',
              guidance: 'Uniquely identify users before allowing access to information systems.',
              priority: 'high',
              references: ['IA-2'],
              examples: ['Unique user IDs', 'User identification', 'Account management', 'Identity verification'],
              options: [
                { value: 0, label: 'Not implemented', description: 'No user identification' },
                { value: 1, label: 'Partially implemented', description: 'Basic user identification' },
                { value: 2, label: 'Largely implemented', description: 'Most users identified' },
                { value: 3, label: 'Fully implemented', description: 'Comprehensive user identification' }
              ]
            }
          ]
        },
        {
          id: 'authentication',
          name: 'Authentication',
          description: 'Authenticate user identities',
          weight: 40,
          questions: [
            {
              id: 'nist800171.ia.3.1',
              text: 'Are user identities authenticated before allowing access to information systems?',
              guidance: 'Authenticate user identities before allowing access to information systems.',
              priority: 'high',
              references: ['IA-3'],
              examples: ['User authentication', 'Password policies', 'Multi-factor authentication', 'Authentication systems'],
              options: [
                { value: 0, label: 'Not implemented', description: 'No user authentication' },
                { value: 1, label: 'Partially implemented', description: 'Basic authentication' },
                { value: 2, label: 'Largely implemented', description: 'Most users authenticated' },
                { value: 3, label: 'Fully implemented', description: 'Comprehensive user authentication' }
              ]
            }
          ]
        }
      ]
    },
    {
      id: 'incident-response',
      name: 'Incident Response (IR)',
      description: 'Establish operational incident response capability',
      weight: 10,
      priority: 'high',
      categories: [
        {
          id: 'incident-response-policy',
          name: 'Incident Response Policy',
          description: 'Develop incident response policy',
          weight: 30,
          questions: [
            {
              id: 'nist800171.ir.1.1',
              text: 'Is an incident response policy developed, documented, and disseminated?',
              guidance: 'Develop, document, and disseminate an incident response policy that addresses purpose, scope, roles, responsibilities, management commitment, coordination among organizational entities, and compliance.',
              priority: 'high',
              references: ['IR-1'],
              examples: ['Incident response policy', 'Policy communication', 'Staff training', 'Policy updates'],
              options: [
                { value: 0, label: 'Not implemented', description: 'No incident response policy' },
                { value: 1, label: 'Partially implemented', description: 'Basic incident response policy' },
                { value: 2, label: 'Largely implemented', description: 'Comprehensive incident response policy' },
                { value: 3, label: 'Fully implemented', description: 'Complete incident response policy program' }
              ]
            }
          ]
        },
        {
          id: 'incident-response-plan',
          name: 'Incident Response Plan',
          description: 'Develop incident response plan',
          weight: 40,
          questions: [
            {
              id: 'nist800171.ir.2.1',
              text: 'Is an incident response plan developed and implemented?',
              guidance: 'Develop and implement an incident response plan that addresses incident response roles and responsibilities, incident response procedures, and incident response testing.',
              priority: 'high',
              references: ['IR-2'],
              examples: ['Incident response plan', 'Response procedures', 'Role definitions', 'Testing procedures'],
              options: [
                { value: 0, label: 'Not implemented', description: 'No incident response plan' },
                { value: 1, label: 'Partially implemented', description: 'Basic incident response plan' },
                { value: 2, label: 'Largely implemented', description: 'Comprehensive incident response plan' },
                { value: 3, label: 'Fully implemented', description: 'Complete incident response program' }
              ]
            }
          ]
        },
        {
          id: 'incident-response-testing',
          name: 'Incident Response Testing',
          description: 'Test incident response capability',
          weight: 30,
          questions: [
            {
              id: 'nist800171.ir.3.1',
              text: 'Is incident response capability tested at least annually?',
              guidance: 'Test incident response capability at least annually to ensure effectiveness.',
              priority: 'medium',
              references: ['IR-3'],
              examples: ['Incident response testing', 'Tabletop exercises', 'Simulation exercises', 'Test results'],
              options: [
                { value: 0, label: 'Not implemented', description: 'No incident response testing' },
                { value: 1, label: 'Partially implemented', description: 'Basic incident response testing' },
                { value: 2, label: 'Largely implemented', description: 'Regular incident response testing' },
                { value: 3, label: 'Fully implemented', description: 'Comprehensive incident response testing program' }
              ]
            }
          ]
        }
      ]
    },
    {
      id: 'maintenance',
      name: 'Maintenance (MA)',
      description: 'Perform maintenance on information systems',
      weight: 5,
      priority: 'medium',
      categories: [
        {
          id: 'system-maintenance',
          name: 'System Maintenance',
          description: 'Perform maintenance on information systems',
          weight: 60,
          questions: [
            {
              id: 'nist800171.ma.2.1',
              text: 'Is system maintenance performed in accordance with organizational policies and procedures?',
              guidance: 'Perform system maintenance in accordance with organizational policies and procedures.',
              priority: 'medium',
              references: ['MA-2'],
              examples: ['Maintenance procedures', 'Maintenance schedules', 'Maintenance records', 'Maintenance policies'],
              options: [
                { value: 0, label: 'Not implemented', description: 'No system maintenance procedures' },
                { value: 1, label: 'Partially implemented', description: 'Basic maintenance procedures' },
                { value: 2, label: 'Largely implemented', description: 'Regular system maintenance' },
                { value: 3, label: 'Fully implemented', description: 'Comprehensive system maintenance program' }
              ]
            }
          ]
        },
        {
          id: 'maintenance-tools',
          name: 'Maintenance Tools',
          description: 'Control maintenance tools',
          weight: 40,
          questions: [
            {
              id: 'nist800171.ma.3.1',
              text: 'Are maintenance tools controlled and monitored?',
              guidance: 'Control and monitor maintenance tools to ensure they are used only for authorized purposes.',
              priority: 'medium',
              references: ['MA-3'],
              examples: ['Tool inventory', 'Access controls', 'Usage monitoring', 'Tool management'],
              options: [
                { value: 0, label: 'Not implemented', description: 'No maintenance tool controls' },
                { value: 1, label: 'Partially implemented', description: 'Basic tool controls' },
                { value: 2, label: 'Largely implemented', description: 'Most tools controlled' },
                { value: 3, label: 'Fully implemented', description: 'Comprehensive maintenance tool control program' }
              ]
            }
          ]
        }
      ]
    },
    {
      id: 'media-protection',
      name: 'Media Protection (MP)',
      description: 'Protect information system media',
      weight: 10,
      priority: 'medium',
      categories: [
        {
          id: 'media-access',
          name: 'Media Access',
          description: 'Control access to information system media',
          weight: 50,
          questions: [
            {
              id: 'nist800171.mp.2.1',
              text: 'Is access to information system media controlled?',
              guidance: 'Control access to information system media to prevent unauthorized access.',
              priority: 'medium',
              references: ['MP-2'],
              examples: ['Media access controls', 'Media storage', 'Access restrictions', 'Media handling'],
              options: [
                { value: 0, label: 'Not implemented', description: 'No media access controls' },
                { value: 1, label: 'Partially implemented', description: 'Basic media controls' },
                { value: 2, label: 'Largely implemented', description: 'Most media controlled' },
                { value: 3, label: 'Fully implemented', description: 'Comprehensive media access control program' }
              ]
            }
          ]
        },
        {
          id: 'media-marking',
          name: 'Media Marking',
          description: 'Mark information system media',
          weight: 50,
          questions: [
            {
              id: 'nist800171.mp.3.1',
              text: 'Is information system media marked with appropriate security markings?',
              guidance: 'Mark information system media with appropriate security markings to indicate the sensitivity of the information.',
              priority: 'medium',
              references: ['MP-3'],
              examples: ['Security labels', 'Media marking', 'Classification markings', 'Handling instructions'],
              options: [
                { value: 0, label: 'Not implemented', description: 'No media marking' },
                { value: 1, label: 'Partially implemented', description: 'Basic media marking' },
                { value: 2, label: 'Largely implemented', description: 'Most media marked' },
                { value: 3, label: 'Fully implemented', description: 'Comprehensive media marking program' }
              ]
            }
          ]
        }
      ]
    },
    {
      id: 'personnel-security',
      name: 'Personnel Security (PS)',
      description: 'Ensure personnel security',
      weight: 5,
      priority: 'medium',
      categories: [
        {
          id: 'personnel-screening',
          name: 'Personnel Screening',
          description: 'Screen personnel before authorizing access',
          weight: 60,
          questions: [
            {
              id: 'nist800171.ps.2.1',
              text: 'Are personnel screened before authorizing access to information systems?',
              guidance: 'Screen personnel before authorizing access to information systems.',
              priority: 'medium',
              references: ['PS-2'],
              examples: ['Background checks', 'Security clearances', 'Personnel screening', 'Access authorization'],
              options: [
                { value: 0, label: 'Not implemented', description: 'No personnel screening' },
                { value: 1, label: 'Partially implemented', description: 'Basic personnel screening' },
                { value: 2, label: 'Largely implemented', description: 'Most personnel screened' },
                { value: 3, label: 'Fully implemented', description: 'Comprehensive personnel screening program' }
              ]
            }
          ]
        },
        {
          id: 'personnel-termination',
          name: 'Personnel Termination',
          description: 'Terminate access when employment ends',
          weight: 40,
          questions: [
            {
              id: 'nist800171.ps.4.1',
              text: 'Is access to information systems terminated when employment ends?',
              guidance: 'Terminate access to information systems when employment ends.',
              priority: 'high',
              references: ['PS-4'],
              examples: ['Access termination', 'Account deactivation', 'Return of equipment', 'Exit procedures'],
              options: [
                { value: 0, label: 'Not implemented', description: 'No access termination procedures' },
                { value: 1, label: 'Partially implemented', description: 'Basic termination procedures' },
                { value: 2, label: 'Largely implemented', description: 'Most access terminated' },
                { value: 3, label: 'Fully implemented', description: 'Comprehensive access termination program' }
              ]
            }
          ]
        }
      ]
    },
    {
      id: 'physical-protection',
      name: 'Physical Protection (PE)',
      description: 'Limit physical access to information systems',
      weight: 10,
      priority: 'medium',
      categories: [
        {
          id: 'physical-access-authorizations',
          name: 'Physical Access Authorizations',
          description: 'Authorize physical access to information systems',
          weight: 50,
          questions: [
            {
              id: 'nist800171.pe.2.1',
              text: 'Is physical access to information systems authorized?',
              guidance: 'Authorize physical access to information systems based on organizational policies and procedures.',
              priority: 'medium',
              references: ['PE-2'],
              examples: ['Physical access controls', 'Access authorization', 'Badge systems', 'Visitor management'],
              options: [
                { value: 0, label: 'Not implemented', description: 'No physical access authorization' },
                { value: 1, label: 'Partially implemented', description: 'Basic physical access controls' },
                { value: 2, label: 'Largely implemented', description: 'Most physical access authorized' },
                { value: 3, label: 'Fully implemented', description: 'Comprehensive physical access authorization program' }
              ]
            }
          ]
        },
        {
          id: 'physical-access-monitoring',
          name: 'Physical Access Monitoring',
          description: 'Monitor physical access to information systems',
          weight: 50,
          questions: [
            {
              id: 'nist800171.pe.3.1',
              text: 'Is physical access to information systems monitored?',
              guidance: 'Monitor physical access to information systems to detect unauthorized access.',
              priority: 'medium',
              references: ['PE-3'],
              examples: ['Access monitoring', 'Surveillance systems', 'Access logs', 'Alarm systems'],
              options: [
                { value: 0, label: 'Not implemented', description: 'No physical access monitoring' },
                { value: 1, label: 'Partially implemented', description: 'Basic physical monitoring' },
                { value: 2, label: 'Largely implemented', description: 'Most physical access monitored' },
                { value: 3, label: 'Fully implemented', description: 'Comprehensive physical access monitoring program' }
              ]
            }
          ]
        }
      ]
    },
    {
      id: 'risk-assessment',
      name: 'Risk Assessment (RA)',
      description: 'Assess information system risks',
      weight: 10,
      priority: 'high',
      categories: [
        {
          id: 'risk-assessment-policy',
          name: 'Risk Assessment Policy',
          description: 'Develop risk assessment policy',
          weight: 30,
          questions: [
            {
              id: 'nist800171.ra.1.1',
              text: 'Is a risk assessment policy developed, documented, and disseminated?',
              guidance: 'Develop, document, and disseminate a risk assessment policy that addresses purpose, scope, roles, responsibilities, management commitment, coordination among organizational entities, and compliance.',
              priority: 'high',
              references: ['RA-1'],
              examples: ['Risk assessment policy', 'Policy communication', 'Staff training', 'Policy updates'],
              options: [
                { value: 0, label: 'Not implemented', description: 'No risk assessment policy' },
                { value: 1, label: 'Partially implemented', description: 'Basic risk assessment policy' },
                { value: 2, label: 'Largely implemented', description: 'Comprehensive risk assessment policy' },
                { value: 3, label: 'Fully implemented', description: 'Complete risk assessment policy program' }
              ]
            }
          ]
        },
        {
          id: 'risk-assessment',
          name: 'Risk Assessment',
          description: 'Conduct risk assessments',
          weight: 70,
          questions: [
            {
              id: 'nist800171.ra.2.1',
              text: 'Are risk assessments conducted at least annually?',
              guidance: 'Conduct risk assessments at least annually to identify and assess risks to organizational operations, organizational assets, individuals, other organizations, and the Nation.',
              priority: 'high',
              references: ['RA-2'],
              examples: ['Risk assessments', 'Risk analysis', 'Risk evaluation', 'Risk documentation'],
              options: [
                { value: 0, label: 'Not implemented', description: 'No risk assessments conducted' },
                { value: 1, label: 'Partially implemented', description: 'Basic risk assessments' },
                { value: 2, label: 'Largely implemented', description: 'Regular risk assessments' },
                { value: 3, label: 'Fully implemented', description: 'Comprehensive risk assessment program' }
              ]
            }
          ]
        }
      ]
    },
    {
      id: 'security-assessment',
      name: 'Security Assessment (CA)',
      description: 'Assess security controls',
      weight: 10,
      priority: 'high',
      categories: [
        {
          id: 'security-assessment-policy',
          name: 'Security Assessment Policy',
          description: 'Develop security assessment policy',
          weight: 30,
          questions: [
            {
              id: 'nist800171.ca.1.1',
              text: 'Is a security assessment policy developed, documented, and disseminated?',
              guidance: 'Develop, document, and disseminate a security assessment policy that addresses purpose, scope, roles, responsibilities, management commitment, coordination among organizational entities, and compliance.',
              priority: 'high',
              references: ['CA-1'],
              examples: ['Security assessment policy', 'Policy communication', 'Staff training', 'Policy updates'],
              options: [
                { value: 0, label: 'Not implemented', description: 'No security assessment policy' },
                { value: 1, label: 'Partially implemented', description: 'Basic security assessment policy' },
                { value: 2, label: 'Largely implemented', description: 'Comprehensive security assessment policy' },
                { value: 3, label: 'Fully implemented', description: 'Complete security assessment policy program' }
              ]
            }
          ]
        },
        {
          id: 'security-assessment',
          name: 'Security Assessment',
          description: 'Conduct security assessments',
          weight: 70,
          questions: [
            {
              id: 'nist800171.ca.2.1',
              text: 'Are security assessments conducted at least annually?',
              guidance: 'Conduct security assessments at least annually to determine the effectiveness of security controls.',
              priority: 'high',
              references: ['CA-2'],
              examples: ['Security assessments', 'Control testing', 'Vulnerability assessments', 'Assessment reports'],
              options: [
                { value: 0, label: 'Not implemented', description: 'No security assessments conducted' },
                { value: 1, label: 'Partially implemented', description: 'Basic security assessments' },
                { value: 2, label: 'Largely implemented', description: 'Regular security assessments' },
                { value: 3, label: 'Fully implemented', description: 'Comprehensive security assessment program' }
              ]
            }
          ]
        }
      ]
    },
    {
      id: 'system-communications-protection',
      name: 'System and Communications Protection (SC)',
      description: 'Control information at system boundaries',
      weight: 15,
      priority: 'high',
      categories: [
        {
          id: 'boundary-protection',
          name: 'Boundary Protection',
          description: 'Control information at system boundaries',
          weight: 40,
          questions: [
            {
              id: 'nist800171.sc.7.1',
              text: 'Is information at system boundaries controlled?',
              guidance: 'Control information at system boundaries to prevent unauthorized access.',
              priority: 'high',
              references: ['SC-7'],
              examples: ['Network boundaries', 'Access controls', 'Firewalls', 'Network segmentation'],
              options: [
                { value: 0, label: 'Not implemented', description: 'No boundary protection' },
                { value: 1, label: 'Partially implemented', description: 'Basic boundary controls' },
                { value: 2, label: 'Largely implemented', description: 'Most boundaries protected' },
                { value: 3, label: 'Fully implemented', description: 'Comprehensive boundary protection program' }
              ]
            }
          ]
        },
        {
          id: 'cryptography',
          name: 'Cryptography',
          description: 'Use cryptography to protect information',
          weight: 30,
          questions: [
            {
              id: 'nist800171.sc.13.1',
              text: 'Is cryptography used to protect information in accordance with organizational policies?',
              guidance: 'Use cryptography to protect information in accordance with organizational policies and procedures.',
              priority: 'high',
              references: ['SC-13'],
              examples: ['Encryption', 'Cryptographic controls', 'Key management', 'Cryptographic policies'],
              options: [
                { value: 0, label: 'Not implemented', description: 'No cryptographic controls' },
                { value: 1, label: 'Partially implemented', description: 'Basic cryptographic controls' },
                { value: 2, label: 'Largely implemented', description: 'Most information protected' },
                { value: 3, label: 'Fully implemented', description: 'Comprehensive cryptographic protection program' }
              ]
            }
          ]
        },
        {
          id: 'secure-communications',
          name: 'Secure Communications',
          description: 'Protect communications',
          weight: 30,
          questions: [
            {
              id: 'nist800171.sc.8.1',
              text: 'Are communications protected during transmission?',
              guidance: 'Protect communications during transmission to prevent unauthorized disclosure.',
              priority: 'high',
              references: ['SC-8'],
              examples: ['Encrypted communications', 'Secure protocols', 'VPN connections', 'TLS/SSL'],
              options: [
                { value: 0, label: 'Not implemented', description: 'No communication protection' },
                { value: 1, label: 'Partially implemented', description: 'Basic communication protection' },
                { value: 2, label: 'Largely implemented', description: 'Most communications protected' },
                { value: 3, label: 'Fully implemented', description: 'Comprehensive communication protection program' }
              ]
            }
          ]
        }
      ]
    },
    {
      id: 'system-information-integrity',
      name: 'System and Information Integrity (SI)',
      description: 'Identify, report, and correct information system flaws',
      weight: 10,
      priority: 'high',
      categories: [
        {
          id: 'flaw-remediation',
          name: 'Flaw Remediation',
          description: 'Identify, report, and correct information system flaws',
          weight: 50,
          questions: [
            {
              id: 'nist800171.si.2.1',
              text: 'Are information system flaws identified, reported, and corrected?',
              guidance: 'Identify, report, and correct information system flaws in a timely manner.',
              priority: 'high',
              references: ['SI-2'],
              examples: ['Vulnerability management', 'Patch management', 'Flaw tracking', 'Remediation procedures'],
              options: [
                { value: 0, label: 'Not implemented', description: 'No flaw remediation process' },
                { value: 1, label: 'Partially implemented', description: 'Basic flaw remediation' },
                { value: 2, label: 'Largely implemented', description: 'Most flaws addressed' },
                { value: 3, label: 'Fully implemented', description: 'Comprehensive flaw remediation program' }
              ]
            }
          ]
        },
        {
          id: 'malicious-code-protection',
          name: 'Malicious Code Protection',
          description: 'Protect against malicious code',
          weight: 50,
          questions: [
            {
              id: 'nist800171.si.3.1',
              text: 'Are information systems protected against malicious code?',
              guidance: 'Protect information systems against malicious code through the use of anti-virus software and other protective measures.',
              priority: 'high',
              references: ['SI-3'],
              examples: ['Anti-virus software', 'Malware protection', 'Endpoint security', 'Threat protection'],
              options: [
                { value: 0, label: 'Not implemented', description: 'No malicious code protection' },
                { value: 1, label: 'Partially implemented', description: 'Basic malware protection' },
                { value: 2, label: 'Largely implemented', description: 'Most systems protected' },
                { value: 3, label: 'Fully implemented', description: 'Comprehensive malicious code protection program' }
              ]
            }
          ]
        }
      ]
    }
  ]
};