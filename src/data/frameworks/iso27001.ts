import { Framework } from '../../types';

export const iso27001Framework: Framework = {
  id: 'iso27001',
  name: 'ISO/IEC 27001:2022',
  description: 'Information security management systems standard',
  version: '2022',
  complexity: 'advanced',
  estimatedTime: 120,
  industry: ['All Industries'],
  prerequisites: ['Understanding of information security management', 'Familiarity with ISO standards'],
  certificationBody: 'ISO',
  lastUpdated: new Date('2022-10-25'),
  relatedFrameworks: ['NIST CSF', 'COBIT', 'ITIL', 'ISO 27002'],
  applicableRegulations: ['GDPR', 'SOX', 'HIPAA', 'PCI DSS'],
  learningResources: [
    {
      title: 'ISO/IEC 27001:2022 Implementation Guide',
      type: 'guide',
      url: 'https://www.iso.org/standard/27001',
      description: 'Official implementation guide for ISO 27001:2022',
      duration: 240,
      difficulty: 'advanced'
    },
    {
      title: 'ISO 27001 Lead Auditor Training',
      type: 'course',
      url: 'https://www.iso.org/training',
      description: 'Professional training for ISO 27001 lead auditors',
      duration: 40,
      difficulty: 'expert'
    },
    {
      title: 'ISO 27001 Toolkit',
      type: 'toolkit',
      url: 'https://www.iso.org/toolkit',
      description: 'Comprehensive toolkit for ISO 27001 implementation',
      duration: 120,
      difficulty: 'intermediate'
    }
  ],
  maturityLevels: [
    { level: 1, name: 'Initial', description: 'Ad hoc security practices', color: '#ef4444', minScore: 0, maxScore: 20 },
    { level: 2, name: 'Repeatable', description: 'Basic security processes', color: '#f97316', minScore: 21, maxScore: 40 },
    { level: 3, name: 'Defined', description: 'Documented ISMS', color: '#eab308', minScore: 41, maxScore: 60 },
    { level: 4, name: 'Managed', description: 'Measured ISMS', color: '#22c55e', minScore: 61, maxScore: 80 },
    { level: 5, name: 'Optimized', description: 'Continuously improving ISMS', color: '#3b82f6', minScore: 81, maxScore: 100 }
  ],
  sections: [
    {
      id: 'context',
      name: 'Context of Organization',
      description: 'Understanding the organization and its context',
      weight: 15,
      priority: 'high',
      categories: [
        {
          id: 'context-analysis',
          name: 'Context Analysis',
          description: 'Determine external and internal issues relevant to the organization',
          weight: 100,
          questions: [
            {
              id: 'iso.4.1.1',
              text: 'Has the organization determined external and internal issues relevant to its purpose?',
              guidance: 'Conduct PESTLE and SWOT analysis for context determination. Consider regulatory, technological, competitive, and market factors.',
              priority: 'high',
              references: ['4.1'],
              examples: ['Context analysis documents', 'PESTLE analysis', 'SWOT analysis', 'Environmental scanning'],
              options: [
                { value: 0, label: 'Not addressed', description: 'No context analysis performed' },
                { value: 1, label: 'Informally addressed', description: 'Ad hoc context consideration' },
                { value: 2, label: 'Formally documented', description: 'Documented context analysis' },
                { value: 3, label: 'Documented and reviewed regularly', description: 'Regular context review and updates' }
              ]
            },
            {
              id: 'iso.4.2.1',
              text: 'Are the needs and expectations of interested parties determined?',
              guidance: 'Identify all stakeholders and their information security requirements and expectations.',
              priority: 'high',
              references: ['4.2'],
              examples: ['Stakeholder analysis', 'Requirements documentation', 'Expectation mapping', 'Interest registers'],
              options: [
                { value: 0, label: 'Not addressed', description: 'No stakeholder analysis' },
                { value: 1, label: 'Informally addressed', description: 'Basic stakeholder identification' },
                { value: 2, label: 'Formally documented', description: 'Comprehensive stakeholder analysis' },
                { value: 3, label: 'Documented and reviewed regularly', description: 'Regular stakeholder review and engagement' }
              ]
            },
            {
              id: 'iso.4.3.1',
              text: 'Is the scope of the information security management system determined?',
              guidance: 'Determine the scope of the ISMS including boundaries, applicability, and exclusions.',
              priority: 'high',
              references: ['4.3'],
              examples: ['ISMS scope document', 'System boundaries', 'Applicability statement', 'Exclusion justification'],
              options: [
                { value: 0, label: 'Not determined', description: 'No ISMS scope defined' },
                { value: 1, label: 'Basic scope defined', description: 'Informal scope determination' },
                { value: 2, label: 'Formally documented', description: 'Well-documented ISMS scope' },
                { value: 3, label: 'Comprehensive scope management', description: 'Detailed scope with regular review and updates' }
              ]
            },
            {
              id: 'iso.4.4.1',
              text: 'Is the information security management system established, implemented, maintained, and continually improved?',
              guidance: 'Establish, implement, maintain, and continually improve the ISMS in accordance with ISO 27001 requirements.',
              priority: 'high',
              references: ['4.4'],
              examples: ['ISMS implementation plan', 'Process documentation', 'Continuous improvement', 'Management system'],
              options: [
                { value: 0, label: 'Not established', description: 'No ISMS implementation' },
                { value: 1, label: 'Partially established', description: 'Basic ISMS elements in place' },
                { value: 2, label: 'Well established', description: 'Comprehensive ISMS implementation' },
                { value: 3, label: 'Fully mature', description: 'Mature ISMS with continuous improvement' }
              ]
            }
          ]
        }
      ]
    },
    {
      id: 'leadership',
      name: 'Leadership',
      description: 'Leadership and commitment to the ISMS',
      weight: 15,
      priority: 'high',
      categories: [
        {
          id: 'leadership-commitment',
          name: 'Leadership and Commitment',
          description: 'Demonstrate leadership and commitment to the ISMS',
          weight: 100,
          questions: [
            {
              id: 'iso.5.1.1',
              text: 'Does top management demonstrate leadership and commitment with respect to the ISMS?',
              guidance: 'Top management must actively support and participate in the ISMS, providing resources and ensuring integration with business processes.',
              priority: 'high',
              references: ['5.1'],
              examples: ['Management commitment statements', 'Resource allocation', 'Policy approval', 'Regular reviews'],
              options: [
                { value: 0, label: 'Not demonstrated', description: 'No visible management commitment' },
                { value: 1, label: 'Limited demonstration', description: 'Some management support' },
                { value: 2, label: 'Good demonstration', description: 'Clear management commitment' },
                { value: 3, label: 'Excellent demonstration', description: 'Strong, visible leadership commitment' }
              ]
            },
            {
              id: 'iso.5.1.2',
              text: 'Is an information security policy established and maintained?',
              guidance: 'Establish and maintain an information security policy that is appropriate to the purpose of the organization.',
              priority: 'high',
              references: ['5.1.1'],
              examples: ['Information security policy', 'Policy approval', 'Policy communication', 'Policy review'],
              options: [
                { value: 0, label: 'Not established', description: 'No information security policy' },
                { value: 1, label: 'Basic policy exists', description: 'Informal security policy' },
                { value: 2, label: 'Formally established', description: 'Documented security policy' },
                { value: 3, label: 'Comprehensive policy', description: 'Well-maintained and regularly updated policy' }
              ]
            },
            {
              id: 'iso.5.1.3',
              text: 'Are information security roles and responsibilities assigned and communicated?',
              guidance: 'Assign and communicate information security roles and responsibilities throughout the organization.',
              priority: 'high',
              references: ['5.1.2'],
              examples: ['Role definitions', 'Responsibility matrices', 'Job descriptions', 'Communication plans'],
              options: [
                { value: 0, label: 'Not assigned', description: 'No defined security roles' },
                { value: 1, label: 'Partially assigned', description: 'Some security roles defined' },
                { value: 2, label: 'Well assigned', description: 'Most security roles clearly defined' },
                { value: 3, label: 'Comprehensively assigned', description: 'All security roles clearly defined and communicated' }
              ]
            }
          ]
        }
      ]
    },
    {
      id: 'planning',
      name: 'Planning',
      description: 'Planning for the ISMS',
      weight: 20,
      priority: 'high',
      categories: [
        {
          id: 'risk-opportunities',
          name: 'Actions to Address Risks and Opportunities',
          description: 'Plan actions to address risks and opportunities',
          weight: 50,
          questions: [
            {
              id: 'iso.6.1.1',
              text: 'Are actions planned to address risks and opportunities?',
              guidance: 'Develop comprehensive risk treatment plans and identify opportunities for improvement.',
              priority: 'high',
              references: ['6.1.1'],
              examples: ['Risk treatment plans', 'Opportunity registers', 'Action plans', 'Risk assessments'],
              options: [
                { value: 0, label: 'Not planned', description: 'No systematic approach to risks and opportunities' },
                { value: 1, label: 'Basic planning', description: 'Some risk and opportunity planning' },
                { value: 2, label: 'Comprehensive planning', description: 'Good risk and opportunity management' },
                { value: 3, label: 'Integrated planning', description: 'Fully integrated risk and opportunity planning' }
              ]
            }
          ]
        },
        {
          id: 'objectives',
          name: 'Information Security Objectives',
          description: 'Establish information security objectives',
          weight: 50,
          questions: [
            {
              id: 'iso.6.2.1',
              text: 'Are information security objectives established?',
              guidance: 'Set measurable information security objectives that align with the information security policy and business objectives.',
              priority: 'high',
              references: ['6.2'],
              examples: ['Security objectives', 'KPIs', 'Measurement criteria', 'Target setting'],
              options: [
                { value: 0, label: 'Not established', description: 'No security objectives defined' },
                { value: 1, label: 'Basic objectives', description: 'Some security objectives set' },
                { value: 2, label: 'Comprehensive objectives', description: 'Well-defined, measurable objectives' },
                { value: 3, label: 'Integrated objectives', description: 'Fully integrated with business objectives' }
              ]
            },
            {
              id: 'iso.6.2.2',
              text: 'Are information security objectives communicated and updated?',
              guidance: 'Communicate information security objectives throughout the organization and update them as necessary.',
              priority: 'medium',
              references: ['6.2.1'],
              examples: ['Objective communication', 'Regular updates', 'Progress reporting', 'Stakeholder engagement'],
              options: [
                { value: 0, label: 'Not communicated', description: 'Objectives not communicated' },
                { value: 1, label: 'Basic communication', description: 'Limited objective communication' },
                { value: 2, label: 'Good communication', description: 'Regular objective communication' },
                { value: 3, label: 'Comprehensive communication', description: 'Effective communication with regular updates' }
              ]
            },
            {
              id: 'iso.6.3.1',
              text: 'Are changes to the information security management system planned?',
              guidance: 'Plan changes to the ISMS considering the purpose of changes and their potential consequences.',
              priority: 'medium',
              references: ['6.3'],
              examples: ['Change planning', 'Impact assessment', 'Change management', 'Risk evaluation'],
              options: [
                { value: 0, label: 'Not planned', description: 'No change planning process' },
                { value: 1, label: 'Basic planning', description: 'Informal change planning' },
                { value: 2, label: 'Good planning', description: 'Formal change planning process' },
                { value: 3, label: 'Comprehensive planning', description: 'Thorough change planning with impact assessment' }
              ]
            }
          ]
        }
      ]
    },
    {
      id: 'support',
      name: 'Support',
      description: 'Support for the ISMS',
      weight: 15,
      priority: 'medium',
      categories: [
        {
          id: 'resources',
          name: 'Resources',
          description: 'Provide necessary resources for the ISMS',
          weight: 50,
          questions: [
            {
              id: 'iso.7.1.1',
              text: 'Are resources needed for the ISMS determined and provided?',
              guidance: 'Identify and allocate sufficient resources including personnel, infrastructure, and financial resources for the ISMS.',
              priority: 'high',
              references: ['7.1'],
              examples: ['Resource planning', 'Budget allocation', 'Staffing plans', 'Infrastructure requirements'],
              options: [
                { value: 0, label: 'Not determined', description: 'No resource planning for ISMS' },
                { value: 1, label: 'Basic determination', description: 'Some resource identification' },
                { value: 2, label: 'Good determination', description: 'Adequate resource planning' },
                { value: 3, label: 'Comprehensive determination', description: 'Comprehensive resource planning and allocation' }
              ]
            }
          ]
        },
        {
          id: 'competence',
          name: 'Competence',
          description: 'Ensure competence of persons working under the organization\'s control',
          weight: 50,
          questions: [
            {
              id: 'iso.7.2.1',
              text: 'Is the competence of persons determined and ensured?',
              guidance: 'Identify required competencies for information security roles and ensure personnel have or acquire necessary skills.',
              priority: 'medium',
              references: ['7.2'],
              examples: ['Competency frameworks', 'Training programs', 'Skill assessments', 'Certification tracking'],
              options: [
                { value: 0, label: 'Not determined', description: 'No competency requirements defined' },
                { value: 1, label: 'Basic determination', description: 'Some competency identification' },
                { value: 2, label: 'Good determination', description: 'Clear competency requirements' },
                { value: 3, label: 'Comprehensive determination', description: 'Comprehensive competency management program' }
              ]
            },
            {
              id: 'iso.7.2.2',
              text: 'Is training provided to ensure personnel are competent?',
              guidance: 'Provide training to ensure personnel are competent to perform their assigned information security roles.',
              priority: 'medium',
              references: ['7.2.2'],
              examples: ['Security training programs', 'Role-specific training', 'Competency assessments', 'Training records'],
              options: [
                { value: 0, label: 'Not provided', description: 'No security training provided' },
                { value: 1, label: 'Basic training', description: 'Limited security training' },
                { value: 2, label: 'Good training', description: 'Regular security training programs' },
                { value: 3, label: 'Comprehensive training', description: 'Extensive training with competency validation' }
              ]
            },
            {
              id: 'iso.7.3.1',
              text: 'Are personnel made aware of the information security policy and their contribution to the ISMS?',
              guidance: 'Ensure personnel are aware of the information security policy and their contribution to the effectiveness of the ISMS.',
              priority: 'medium',
              references: ['7.3'],
              examples: ['Awareness programs', 'Policy communication', 'Role awareness', 'Contribution recognition'],
              options: [
                { value: 0, label: 'Not aware', description: 'No awareness of security policy' },
                { value: 1, label: 'Basic awareness', description: 'Limited policy awareness' },
                { value: 2, label: 'Good awareness', description: 'Regular awareness programs' },
                { value: 3, label: 'Comprehensive awareness', description: 'Strong awareness with clear role understanding' }
              ]
            },
            {
              id: 'iso.7.4.1',
              text: 'Is internal and external communication managed?',
              guidance: 'Determine what information security-related communications are necessary and how to communicate internally and externally.',
              priority: 'low',
              references: ['7.4'],
              examples: ['Communication plans', 'Internal communications', 'External communications', 'Information sharing'],
              options: [
                { value: 0, label: 'Not managed', description: 'No communication management' },
                { value: 1, label: 'Basic management', description: 'Informal communication processes' },
                { value: 2, label: 'Good management', description: 'Formal communication procedures' },
                { value: 3, label: 'Comprehensive management', description: 'Well-structured communication management program' }
              ]
            }
          ]
        }
      ]
    },
    {
      id: 'operation',
      name: 'Operation',
      description: 'Operational planning and control',
      weight: 20,
      priority: 'medium',
      categories: [
        {
          id: 'operational-planning',
          name: 'Operational Planning and Control',
          description: 'Plan, implement and control processes needed to meet information security requirements',
          weight: 100,
          questions: [
            {
              id: 'iso.8.1.1',
              text: 'Are processes needed to meet information security requirements planned, implemented and controlled?',
              guidance: 'Establish operational procedures and controls to implement the information security requirements.',
              priority: 'high',
              references: ['8.1'],
              examples: ['Operational procedures', 'Control implementation', 'Process documentation', 'Work instructions'],
              options: [
                { value: 0, label: 'Not planned', description: 'No operational planning for security requirements' },
                { value: 1, label: 'Basic planning', description: 'Some operational procedures' },
                { value: 2, label: 'Good planning', description: 'Comprehensive operational planning' },
                { value: 3, label: 'Excellent planning', description: 'Fully integrated operational control' }
              ]
            },
            {
              id: 'iso.8.1.2',
              text: 'Are information security risk assessments performed?',
              guidance: 'Perform information security risk assessments to identify and assess information security risks.',
              priority: 'high',
              references: ['8.1.1'],
              examples: ['Risk assessments', 'Threat analysis', 'Vulnerability assessments', 'Risk treatment'],
              options: [
                { value: 0, label: 'Not performed', description: 'No risk assessments conducted' },
                { value: 1, label: 'Basic assessments', description: 'Limited risk assessment activities' },
                { value: 2, label: 'Good assessments', description: 'Regular risk assessment program' },
                { value: 3, label: 'Comprehensive assessments', description: 'Thorough risk assessment with treatment planning' }
              ]
            },
            {
              id: 'iso.8.1.3',
              text: 'Are information security risk treatment plans implemented?',
              guidance: 'Implement information security risk treatment plans to address identified risks.',
              priority: 'high',
              references: ['8.1.2'],
              examples: ['Risk treatment plans', 'Control implementation', 'Risk mitigation', 'Treatment monitoring'],
              options: [
                { value: 0, label: 'Not implemented', description: 'No risk treatment plans' },
                { value: 1, label: 'Basic implementation', description: 'Some risk treatment activities' },
                { value: 2, label: 'Good implementation', description: 'Most risks addressed through treatment' },
                { value: 3, label: 'Comprehensive implementation', description: 'Complete risk treatment program with monitoring' }
              ]
            }
          ]
        }
      ]
    },
    {
      id: 'performance-evaluation',
      name: 'Performance Evaluation',
      description: 'Monitoring, measurement, analysis and evaluation',
      weight: 10,
      priority: 'medium',
      categories: [
        {
          id: 'monitoring-measurement',
          name: 'Monitoring, Measurement, Analysis and Evaluation',
          description: 'Monitor and measure ISMS performance',
          weight: 100,
          questions: [
            {
              id: 'iso.9.1.1',
              text: 'Is the performance and effectiveness of the ISMS monitored and measured?',
              guidance: 'Establish monitoring and measurement processes to evaluate ISMS performance against objectives.',
              priority: 'high',
              references: ['9.1'],
              examples: ['Performance metrics', 'Monitoring procedures', 'Measurement tools', 'KPI tracking'],
              options: [
                { value: 0, label: 'Not monitored', description: 'No ISMS performance monitoring' },
                { value: 1, label: 'Basic monitoring', description: 'Some performance measurement' },
                { value: 2, label: 'Good monitoring', description: 'Regular performance monitoring' },
                { value: 3, label: 'Comprehensive monitoring', description: 'Comprehensive performance management system' }
              ]
            },
            {
              id: 'iso.9.1.2',
              text: 'Are internal audits conducted at planned intervals?',
              guidance: 'Conduct internal audits at planned intervals to determine whether the ISMS conforms to planned arrangements and is effectively implemented and maintained.',
              priority: 'high',
              references: ['9.2'],
              examples: ['Internal audit program', 'Audit schedules', 'Audit reports', 'Corrective actions'],
              options: [
                { value: 0, label: 'Not conducted', description: 'No internal audits conducted' },
                { value: 1, label: 'Basic audits', description: 'Occasional internal audits' },
                { value: 2, label: 'Good audits', description: 'Regular internal audit program' },
                { value: 3, label: 'Comprehensive audits', description: 'Thorough internal audit program with follow-up' }
              ]
            },
            {
              id: 'iso.9.1.3',
              text: 'Is management review of the ISMS conducted at planned intervals?',
              guidance: 'Conduct management review of the ISMS at planned intervals to ensure its continuing suitability, adequacy, and effectiveness.',
              priority: 'high',
              references: ['9.3'],
              examples: ['Management reviews', 'Review agendas', 'Review minutes', 'Action items'],
              options: [
                { value: 0, label: 'Not conducted', description: 'No management reviews conducted' },
                { value: 1, label: 'Basic reviews', description: 'Occasional management reviews' },
                { value: 2, label: 'Good reviews', description: 'Regular management review program' },
                { value: 3, label: 'Comprehensive reviews', description: 'Thorough management review with action tracking' }
              ]
            }
          ]
        }
      ]
    },
    {
      id: 'improvement',
      name: 'Improvement',
      description: 'Continual improvement',
      weight: 5,
      priority: 'low',
      categories: [
        {
          id: 'continual-improvement',
          name: 'Continual Improvement',
          description: 'Continually improve the suitability, adequacy and effectiveness of the ISMS',
          weight: 100,
          questions: [
            {
              id: 'iso.10.1.1',
              text: 'Is the ISMS continually improved?',
              guidance: 'Implement processes for continual improvement of the ISMS based on monitoring results and management reviews.',
              priority: 'medium',
              references: ['10.1'],
              examples: ['Improvement processes', 'Corrective actions', 'Preventive actions', 'Innovation initiatives'],
              options: [
                { value: 0, label: 'Not improved', description: 'No continual improvement process' },
                { value: 1, label: 'Ad hoc improvement', description: 'Some improvement activities' },
                { value: 2, label: 'Systematic improvement', description: 'Regular improvement process' },
                { value: 3, label: 'Mature improvement', description: 'Comprehensive continual improvement program' }
              ]
            },
            {
              id: 'iso.10.1.2',
              text: 'Are nonconformities and corrective actions managed?',
              guidance: 'React to nonconformities and take action to eliminate their causes to prevent recurrence.',
              priority: 'high',
              references: ['10.1.1'],
              examples: ['Nonconformity management', 'Corrective action procedures', 'Root cause analysis', 'Action tracking'],
              options: [
                { value: 0, label: 'Not managed', description: 'No nonconformity management process' },
                { value: 1, label: 'Basic management', description: 'Some nonconformity handling' },
                { value: 2, label: 'Good management', description: 'Systematic nonconformity management' },
                { value: 3, label: 'Comprehensive management', description: 'Thorough nonconformity and corrective action program' }
              ]
            },
            {
              id: 'iso.10.1.3',
              text: 'Are opportunities for improvement identified and acted upon?',
              guidance: 'Identify opportunities for improvement and implement necessary actions to enhance the ISMS.',
              priority: 'medium',
              references: ['10.1.2'],
              examples: ['Improvement opportunities', 'Innovation initiatives', 'Process enhancements', 'Best practices'],
              options: [
                { value: 0, label: 'Not identified', description: 'No improvement opportunity identification' },
                { value: 1, label: 'Basic identification', description: 'Some improvement opportunities identified' },
                { value: 2, label: 'Good identification', description: 'Regular opportunity identification and action' },
                { value: 3, label: 'Comprehensive identification', description: 'Proactive improvement opportunity management' }
              ]
            }
          ]
        }
      ]
    }
  ]
};