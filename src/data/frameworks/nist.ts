import { Framework } from '../../types';

export const nistFramework: Framework = {
  id: 'nist',
  name: 'NIST Cybersecurity Framework (CSF)',
  description: 'The NIST Cybersecurity Framework (CSF) 2.0 provides guidance to industry, government agencies, and other organizations to manage cybersecurity risks. It offers a taxonomy of high-level cybersecurity outcomes that can be used by any organization — regardless of its size, sector, or maturity — to better understand, assess, prioritize, and communicate its cybersecurity efforts.',
  version: '2.0',
  complexity: 'advanced',
  estimatedTime: 240,
  industry: ['All Industries'],
  prerequisites: ['Basic understanding of cybersecurity concepts', 'Risk management fundamentals'],
  certificationBody: 'NIST',
  lastUpdated: new Date('2024-02-26'),
  relatedFrameworks: ['ISO 27001', 'COBIT', 'ITIL', 'NIST SP 800-53', 'NIST SP 800-171'],
  applicableRegulations: ['SOX', 'HIPAA', 'PCI DSS', 'GDPR', 'CCPA', 'FISMA'],
  changeLog: [
    {
      version: '2.0',
      date: new Date('2024-02-26'),
      changes: [
        'Added new GOVERN function',
        'Expanded scope beyond critical infrastructure to all organizations',
        'Enhanced supply chain risk management guidance',
        'Improved integration with enterprise risk management',
        'Added new categories: Improvement (ID.IM), Cybersecurity Supply Chain Risk Management (GV.SC)',
        'Reorganized and updated all functions with new subcategories'
      ],
      impact: 'major'
    },
    {
      version: '1.1',
      date: new Date('2018-04-16'),
      changes: ['Added Supply Chain Risk Management', 'Enhanced Implementation Guidance', 'Improved Self-Assessment Tools'],
      impact: 'minor'
    }
  ],
  learningResources: [
    {
      title: 'NIST Cybersecurity Framework 2.0 Quick Start Guide',
      type: 'whitepaper',
      url: 'https://www.nist.gov/cyberframework',
      description: 'Comprehensive guide to implementing the NIST CSF 2.0',
      duration: 120,
      difficulty: 'intermediate'
    },
    {
      title: 'NIST CSF 2.0 Reference Tool',
      type: 'tool',
      url: 'https://www.nist.gov/cyberframework/framework',
      description: 'Interactive reference tool for exploring CSF 2.0 functions and categories',
      duration: 60,
      difficulty: 'beginner'
    },
    {
      title: 'Cybersecurity Framework Implementation Guide',
      type: 'guide',
      url: 'https://www.nist.gov/cyberframework/implementation',
      description: 'Step-by-step implementation guide for organizations',
      duration: 180,
      difficulty: 'advanced'
    }
  ],
  maturityLevels: [
    { 
      level: 1, 
      name: 'Partial', 
      description: 'Ad hoc cybersecurity practices with limited organization-wide coordination', 
      color: '#ef4444', 
      minScore: 0, 
      maxScore: 20,
      characteristics: ['Reactive approach', 'Limited documentation', 'Informal processes', 'Ad hoc risk management'],
      typicalOrganizations: ['Small businesses', 'Startups', 'Organizations new to cybersecurity'],
      nextSteps: ['Establish governance structure', 'Implement basic policies', 'Begin risk assessment', 'Create asset inventory']
    },
    { 
      level: 2, 
      name: 'Risk Informed', 
      description: 'Risk management practices approved by management but not organization-wide policy', 
      color: '#f97316', 
      minScore: 21, 
      maxScore: 40,
      characteristics: ['Management awareness', 'Basic risk assessment', 'Some documented procedures', 'Informal information sharing'],
      typicalOrganizations: ['Growing companies', 'Organizations with basic IT governance'],
      nextSteps: ['Formalize policies', 'Expand security controls', 'Improve documentation', 'Establish regular reviews']
    },
    { 
      level: 3, 
      name: 'Repeatable', 
      description: 'Organization-wide approach to managing cybersecurity risk with formal policies', 
      color: '#eab308', 
      minScore: 41, 
      maxScore: 60,
      characteristics: ['Formal policies', 'Regular risk assessments', 'Defined roles and responsibilities', 'Routine information sharing'],
      typicalOrganizations: ['Mid-size enterprises', 'Organizations with established IT departments'],
      nextSteps: ['Implement continuous monitoring', 'Enhance incident response', 'Improve metrics', 'Advanced training']
    },
    { 
      level: 4, 
      name: 'Adaptive', 
      description: 'Organization adapts cybersecurity practices based on lessons learned and predictive indicators', 
      color: '#22c55e', 
      minScore: 61, 
      maxScore: 80,
      characteristics: ['Continuous improvement', 'Predictive capabilities', 'Advanced monitoring', 'Real-time adaptation'],
      typicalOrganizations: ['Large enterprises', 'Organizations in regulated industries', 'Critical infrastructure'],
      nextSteps: ['Optimize processes', 'Enhance threat intelligence', 'Improve automation', 'Industry leadership']
    }
  ],
  sections: [
    {
      id: 'govern',
      name: 'Govern (GV)',
      description: 'The organization\'s cybersecurity risk management strategy, expectations, and policy are established, communicated, and monitored',
      weight: 20,
      priority: 'high',
      estimatedTime: 40,
      learningResources: [
        {
          title: 'NIST CSF 2.0 Governance Quick Start Guide',
          type: 'whitepaper',
          url: 'https://www.nist.gov/cyberframework',
          description: 'Comprehensive guide to implementing the Govern function',
          duration: 60,
          difficulty: 'intermediate'
        }
      ],
      categories: [
        {
          id: 'organizational-context',
          name: 'Organizational Context (GV.OC)',
          description: 'The circumstances — mission, stakeholder expectations, dependencies, and legal, regulatory, and contractual requirements — surrounding the organization\'s cybersecurity risk management decisions are understood',
          weight: 16,
          questions: [
            {
              id: 'nist.gv.oc.1',
              text: 'Is the organizational mission understood and does it inform cybersecurity risk management?',
              guidance: 'Document how the organization\'s mission, objectives, and business purposes directly inform and guide cybersecurity risk management decisions and priorities.',
              priority: 'high',
              references: ['GV.OC-01'],
              examples: [
                'Mission statement integrated with cybersecurity strategy',
                'Business objectives mapped to security requirements',
                'Risk appetite aligned with mission criticality',
                'Regular mission impact assessments'
              ],
              options: [
                { value: 0, label: 'Not understood', description: 'Mission not considered in cybersecurity decisions', riskLevel: 'high' },
                { value: 1, label: 'Partially understood', description: 'Some consideration of mission in security planning', riskLevel: 'medium' },
                { value: 2, label: 'Well understood', description: 'Mission clearly informs cybersecurity strategy', riskLevel: 'low' },
                { value: 3, label: 'Fully integrated', description: 'Mission completely integrated with risk management', riskLevel: 'low' }
              ]
            },
            {
              id: 'nist.gv.oc.2',
              text: 'Are internal and external stakeholders understood, and their cybersecurity expectations considered?',
              guidance: 'Identify all stakeholders and understand their cybersecurity expectations, requirements, and dependencies on the organization.',
              priority: 'high',
              references: ['GV.OC-02'],
              examples: [
                'Stakeholder mapping and analysis',
                'Regular stakeholder communication',
                'Expectation documentation and management',
                'Feedback mechanisms for stakeholder input'
              ],
              options: [
                { value: 0, label: 'Not identified', description: 'Stakeholders and expectations not identified', riskLevel: 'high' },
                { value: 1, label: 'Partially identified', description: 'Some stakeholders identified', riskLevel: 'medium' },
                { value: 2, label: 'Well identified', description: 'Most stakeholders and expectations documented', riskLevel: 'low' },
                { value: 3, label: 'Fully managed', description: 'Comprehensive stakeholder management program', riskLevel: 'low' }
              ]
            },
            {
              id: 'nist.gv.oc.3',
              text: 'Are legal, regulatory, and contractual cybersecurity requirements understood and managed?',
              guidance: 'Maintain comprehensive understanding of all applicable legal, regulatory, and contractual requirements including privacy and civil liberties obligations.',
              priority: 'high',
              references: ['GV.OC-03'],
              examples: [
                'Legal and regulatory requirement inventory',
                'Compliance monitoring and reporting',
                'Contract cybersecurity clauses',
                'Privacy impact assessments'
              ],
              options: [
                { value: 0, label: 'Not understood', description: 'Requirements not identified or managed', riskLevel: 'critical' },
                { value: 1, label: 'Partially understood', description: 'Some requirements identified', riskLevel: 'high' },
                { value: 2, label: 'Well understood', description: 'Most requirements documented and managed', riskLevel: 'medium' },
                { value: 3, label: 'Fully managed', description: 'Comprehensive compliance management program', riskLevel: 'low' }
              ]
            },
            {
              id: 'nist.gv.oc.4',
              text: 'Are critical objectives, capabilities, and services that external stakeholders depend on understood?',
              guidance: 'Identify and document what external stakeholders depend on from your organization, including critical services and capabilities.',
              priority: 'medium',
              references: ['GV.OC-04'],
              examples: [
                'Critical service identification',
                'Dependency mapping',
                'Service level agreements',
                'Business impact analysis'
              ],
              options: [
                { value: 0, label: 'Not understood', description: 'External dependencies not identified', riskLevel: 'high' },
                { value: 1, label: 'Partially understood', description: 'Some dependencies identified', riskLevel: 'medium' },
                { value: 2, label: 'Well understood', description: 'Most dependencies documented', riskLevel: 'low' },
                { value: 3, label: 'Fully managed', description: 'Comprehensive dependency management program', riskLevel: 'low' }
              ]
            },
            {
              id: 'nist.gv.oc.5',
              text: 'Are outcomes, capabilities, and services that the organization depends on understood?',
              guidance: 'Document what your organization depends on from external parties, including suppliers, partners, and service providers.',
              priority: 'medium',
              references: ['GV.OC-05'],
              examples: [
                'Supplier dependency analysis',
                'Critical service mapping',
                'Third-party risk assessment',
                'Contingency planning'
              ],
              options: [
                { value: 0, label: 'Not understood', description: 'Internal dependencies not identified', riskLevel: 'high' },
                { value: 1, label: 'Partially understood', description: 'Some dependencies identified', riskLevel: 'medium' },
                { value: 2, label: 'Well understood', description: 'Most dependencies documented', riskLevel: 'low' },
                { value: 3, label: 'Fully managed', description: 'Comprehensive dependency management program', riskLevel: 'low' }
              ]
            }
          ]
        },
        {
          id: 'risk-management-strategy',
          name: 'Risk Management Strategy (GV.RM)',
          description: 'The organization\'s priorities, constraints, risk tolerance and appetite statements, and assumptions are established, communicated, and used to support operational risk decisions',
          weight: 23,
          questions: [
            {
              id: 'nist.gv.rm.1',
              text: 'Are risk management objectives established and agreed to by organizational stakeholders?',
              guidance: 'Establish clear risk management objectives that are understood and agreed upon by all relevant stakeholders.',
              priority: 'high',
              references: ['GV.RM-01'],
              examples: [
                'Documented risk management objectives',
                'Stakeholder agreement documentation',
                'Objective review and approval process',
                'Regular objective assessment'
              ],
              options: [
                { value: 0, label: 'Not established', description: 'No formal risk management objectives', riskLevel: 'high' },
                { value: 1, label: 'Basic objectives', description: 'Some objectives exist but limited agreement', riskLevel: 'medium' },
                { value: 2, label: 'Well established', description: 'Clear objectives with stakeholder agreement', riskLevel: 'low' },
                { value: 3, label: 'Optimized', description: 'Comprehensive objectives with full alignment', riskLevel: 'low' }
              ]
            },
            {
              id: 'nist.gv.rm.2',
              text: 'Are risk appetite and tolerance statements established, communicated, and maintained?',
              guidance: 'Define and communicate the organization\'s risk appetite and tolerance levels to guide decision-making.',
              priority: 'high',
              references: ['GV.RM-02'],
              examples: [
                'Risk appetite statements',
                'Risk tolerance thresholds',
                'Communication to all levels',
                'Regular review and updates'
              ],
              options: [
                { value: 0, label: 'Not defined', description: 'No risk appetite or tolerance statements', riskLevel: 'high' },
                { value: 1, label: 'Basic definition', description: 'Some risk appetite guidance exists', riskLevel: 'medium' },
                { value: 2, label: 'Well defined', description: 'Clear statements communicated organization-wide', riskLevel: 'low' },
                { value: 3, label: 'Optimized', description: 'Comprehensive risk appetite framework', riskLevel: 'low' }
              ]
            },
            {
              id: 'nist.gv.rm.3',
              text: 'Are cybersecurity risk management activities included in enterprise risk management processes?',
              guidance: 'Integrate cybersecurity risk management with broader enterprise risk management processes and frameworks.',
              priority: 'high',
              references: ['GV.RM-03'],
              examples: [
                'ERM integration documentation',
                'Risk reporting consolidation',
                'Shared risk language and metrics',
                'Executive oversight alignment'
              ],
              options: [
                { value: 0, label: 'Not integrated', description: 'Cybersecurity managed separately from ERM', riskLevel: 'medium' },
                { value: 1, label: 'Basic integration', description: 'Some coordination with ERM', riskLevel: 'low' },
                { value: 2, label: 'Well integrated', description: 'Good integration with ERM processes', riskLevel: 'low' },
                { value: 3, label: 'Fully integrated', description: 'Comprehensive integration with enterprise risk management', riskLevel: 'low' }
              ]
            },
            {
              id: 'nist.gv.rm.4',
              text: 'Is strategic direction for risk response options established and communicated?',
              guidance: 'Provide clear guidance on how the organization should respond to different types and levels of cybersecurity risks.',
              priority: 'medium',
              references: ['GV.RM-04'],
              examples: [
                'Risk response strategy documentation',
                'Decision-making frameworks',
                'Escalation procedures',
                'Response option guidelines'
              ],
              options: [
                { value: 0, label: 'Not established', description: 'No strategic direction for risk responses', riskLevel: 'medium' },
                { value: 1, label: 'Basic direction', description: 'Some guidance on risk responses', riskLevel: 'low' },
                { value: 2, label: 'Well established', description: 'Clear strategic direction communicated', riskLevel: 'low' },
                { value: 3, label: 'Optimized', description: 'Comprehensive risk response framework', riskLevel: 'low' }
              ]
            },
            {
              id: 'nist.gv.rm.5',
              text: 'Are lines of communication established for cybersecurity risks across the organization?',
              guidance: 'Establish clear communication channels for cybersecurity risks, including those from suppliers and third parties.',
              priority: 'medium',
              references: ['GV.RM-05'],
              examples: [
                'Communication protocols',
                'Reporting structures',
                'Escalation paths',
                'Information sharing procedures'
              ],
              options: [
                { value: 0, label: 'Not established', description: 'No formal communication lines', riskLevel: 'medium' },
                { value: 1, label: 'Basic communication', description: 'Some communication channels exist', riskLevel: 'low' },
                { value: 2, label: 'Well established', description: 'Clear communication lines across organization', riskLevel: 'low' },
                { value: 3, label: 'Optimized', description: 'Comprehensive communication framework', riskLevel: 'low' }
              ]
            },
            {
              id: 'nist.gv.rm.6',
              text: 'Is a standardized method for calculating, documenting, and prioritizing cybersecurity risks established?',
              guidance: 'Implement consistent methodologies for risk calculation, documentation, and prioritization across the organization.',
              priority: 'high',
              references: ['GV.RM-06'],
              examples: [
                'Risk assessment methodologies',
                'Risk calculation frameworks',
                'Documentation standards',
                'Prioritization criteria'
              ],
              options: [
                { value: 0, label: 'Not standardized', description: 'No consistent risk methodology', riskLevel: 'high' },
                { value: 1, label: 'Basic methodology', description: 'Some standardization exists', riskLevel: 'medium' },
                { value: 2, label: 'Well standardized', description: 'Consistent methodology across organization', riskLevel: 'low' },
                { value: 3, label: 'Optimized', description: 'Advanced standardized risk management', riskLevel: 'low' }
              ]
            },
            {
              id: 'nist.gv.rm.7',
              text: 'Are strategic opportunities (positive risks) characterized and included in cybersecurity discussions?',
              guidance: 'Identify and manage positive risks (opportunities) that may arise from cybersecurity investments and decisions.',
              priority: 'low',
              references: ['GV.RM-07'],
              examples: [
                'Opportunity identification processes',
                'Positive risk documentation',
                'Strategic benefit analysis',
                'Investment opportunity assessment'
              ],
              options: [
                { value: 0, label: 'Not considered', description: 'Positive risks not addressed', riskLevel: 'low' },
                { value: 1, label: 'Basic consideration', description: 'Some attention to opportunities', riskLevel: 'low' },
                { value: 2, label: 'Well characterized', description: 'Good identification of opportunities', riskLevel: 'low' },
                { value: 3, label: 'Optimized', description: 'Comprehensive opportunity management', riskLevel: 'low' }
              ]
            }
          ]
        },
        {
          id: 'roles-responsibilities',
          name: 'Roles, Responsibilities, and Authorities (GV.RR)',
          description: 'Cybersecurity roles, responsibilities, and authorities to foster accountability, performance assessment, and continuous improvement are established and communicated',
          weight: 8,
          questions: [
            {
              id: 'nist.gv.rr.1',
              text: 'Is organizational leadership responsible and accountable for cybersecurity risk?',
              guidance: 'Ensure organizational leadership takes responsibility for cybersecurity risk and fosters a risk-aware, ethical culture.',
              priority: 'high',
              references: ['GV.RR-01'],
              examples: [
                'Executive accountability frameworks',
                'Leadership cybersecurity responsibilities',
                'Cultural assessment and development',
                'Ethics and compliance programs'
              ],
              options: [
                { value: 0, label: 'Not accountable', description: 'No leadership accountability for cybersecurity', riskLevel: 'high' },
                { value: 1, label: 'Basic accountability', description: 'Some leadership responsibility', riskLevel: 'medium' },
                { value: 2, label: 'Clear accountability', description: 'Well-defined leadership accountability', riskLevel: 'low' },
                { value: 3, label: 'Full accountability', description: 'Comprehensive leadership engagement', riskLevel: 'low' }
              ]
            },
            {
              id: 'nist.gv.rr.2',
              text: 'Are cybersecurity roles, responsibilities, and authorities established and communicated?',
              guidance: 'Define and communicate specific cybersecurity roles, responsibilities, and authorities throughout the organization.',
              priority: 'high',
              references: ['GV.RR-02'],
              examples: [
                'Role definition documents',
                'Responsibility matrices',
                'Authority delegation',
                'Communication and training'
              ],
              options: [
                { value: 0, label: 'Not defined', description: 'Roles and responsibilities unclear', riskLevel: 'high' },
                { value: 1, label: 'Basic definition', description: 'Some roles defined', riskLevel: 'medium' },
                { value: 2, label: 'Well defined', description: 'Clear roles and responsibilities', riskLevel: 'low' },
                { value: 3, label: 'Comprehensive', description: 'Comprehensive role framework', riskLevel: 'low' }
              ]
            },
            {
              id: 'nist.gv.rr.3',
              text: 'Are adequate resources allocated commensurate with cybersecurity risk strategy?',
              guidance: 'Ensure sufficient resources (people, budget, technology) are allocated to support the cybersecurity risk strategy.',
              priority: 'high',
              references: ['GV.RR-03'],
              examples: [
                'Resource allocation planning',
                'Budget justification processes',
                'Staffing assessments',
                'Technology investment plans'
              ],
              options: [
                { value: 0, label: 'Inadequate', description: 'Insufficient resources for cybersecurity', riskLevel: 'high' },
                { value: 1, label: 'Basic allocation', description: 'Some resources allocated', riskLevel: 'medium' },
                { value: 2, label: 'Adequate allocation', description: 'Sufficient resources for current needs', riskLevel: 'low' },
                { value: 3, label: 'Optimized allocation', description: 'Resources fully aligned with strategy', riskLevel: 'low' }
              ]
            },
            {
              id: 'nist.gv.rr.4',
              text: 'Is cybersecurity included in human resources practices?',
              guidance: 'Integrate cybersecurity considerations into HR practices including hiring, training, performance management, and termination.',
              priority: 'medium',
              references: ['GV.RR-04'],
              examples: [
                'Background check requirements',
                'Cybersecurity job descriptions',
                'Performance evaluation criteria',
                'Termination procedures'
              ],
              options: [
                { value: 0, label: 'Not included', description: 'No cybersecurity in HR practices', riskLevel: 'medium' },
                { value: 1, label: 'Basic inclusion', description: 'Some cybersecurity in HR', riskLevel: 'low' },
                { value: 2, label: 'Well integrated', description: 'Good integration with HR practices', riskLevel: 'low' },
                { value: 3, label: 'Fully integrated', description: 'Comprehensive HR integration', riskLevel: 'low' }
              ]
            }
          ]
        },
        {
          id: 'policy',
          name: 'Policy (GV.PO)',
          description: 'Organizational cybersecurity policy is established, communicated, and enforced',
          weight: 15,
          questions: [
            {
              id: 'nist.gv.po.1',
              text: 'Is cybersecurity policy established based on organizational context and strategy?',
              guidance: 'Develop cybersecurity policies that reflect organizational context, strategy, and priorities, and ensure they are communicated and enforced.',
              priority: 'high',
              references: ['GV.PO-01'],
              examples: [
                'Comprehensive cybersecurity policy',
                'Policy alignment with strategy',
                'Communication procedures',
                'Enforcement mechanisms'
              ],
              options: [
                { value: 0, label: 'No policy', description: 'No formal cybersecurity policy', riskLevel: 'high' },
                { value: 1, label: 'Basic policy', description: 'Basic policy exists but may be outdated', riskLevel: 'medium' },
                { value: 2, label: 'Good policy', description: 'Well-developed and current policy', riskLevel: 'low' },
                { value: 3, label: 'Excellent policy', description: 'Comprehensive, well-aligned policy', riskLevel: 'low' }
              ]
            },
            {
              id: 'nist.gv.po.2',
              text: 'Is cybersecurity policy regularly reviewed and updated?',
              guidance: 'Establish processes to regularly review, update, and communicate cybersecurity policies to reflect changes in requirements, threats, and technology.',
              priority: 'medium',
              references: ['GV.PO-02'],
              examples: [
                'Policy review schedules',
                'Update procedures',
                'Change management processes',
                'Version control systems'
              ],
              options: [
                { value: 0, label: 'Not updated', description: 'Policy not regularly reviewed or updated', riskLevel: 'medium' },
                { value: 1, label: 'Occasional updates', description: 'Policy updated occasionally', riskLevel: 'low' },
                { value: 2, label: 'Regular updates', description: 'Policy regularly reviewed and updated', riskLevel: 'low' },
                { value: 3, label: 'Continuous improvement', description: 'Dynamic policy management process', riskLevel: 'low' }
              ]
            }
          ]
        },
        {
          id: 'oversight',
          name: 'Oversight (GV.OV)',
          description: 'Results of organization-wide cybersecurity risk management activities and performance are used to inform, improve, and adjust the risk management strategy',
          weight: 26,
          questions: [
            {
              id: 'nist.gv.ov.1',
              text: 'Are cybersecurity risk management strategy outcomes reviewed to inform and adjust strategy?',
              guidance: 'Regularly review the outcomes of cybersecurity risk management strategy implementation to inform adjustments and improvements.',
              priority: 'medium',
              references: ['GV.OV-01'],
              examples: [
                'Strategy outcome assessment',
                'Performance metrics review',
                'Strategy adjustment processes',
                'Lessons learned integration'
              ],
              options: [
                { value: 0, label: 'No review', description: 'Strategy outcomes not reviewed', riskLevel: 'medium' },
                { value: 1, label: 'Basic review', description: 'Some review of strategy outcomes', riskLevel: 'low' },
                { value: 2, label: 'Regular review', description: 'Systematic review and adjustment', riskLevel: 'low' },
                { value: 3, label: 'Continuous review', description: 'Dynamic strategy optimization', riskLevel: 'low' }
              ]
            },
            {
              id: 'nist.gv.ov.2',
              text: 'Is the cybersecurity risk management strategy reviewed for coverage of requirements and risks?',
              guidance: 'Ensure the cybersecurity risk management strategy adequately covers all organizational requirements and identified risks.',
              priority: 'medium',
              references: ['GV.OV-02'],
              examples: [
                'Coverage assessment procedures',
                'Gap analysis processes',
                'Risk inventory reviews',
                'Strategy completeness evaluation'
              ],
              options: [
                { value: 0, label: 'No coverage review', description: 'Strategy coverage not assessed', riskLevel: 'medium' },
                { value: 1, label: 'Basic coverage review', description: 'Some assessment of strategy coverage', riskLevel: 'low' },
                { value: 2, label: 'Regular coverage review', description: 'Systematic coverage assessment', riskLevel: 'low' },
                { value: 3, label: 'Comprehensive review', description: 'Thorough coverage evaluation process', riskLevel: 'low' }
              ]
            },
            {
              id: 'nist.gv.ov.3',
              text: 'Is cybersecurity risk management performance evaluated and reviewed for needed adjustments?',
              guidance: 'Evaluate the performance of cybersecurity risk management activities and make necessary adjustments to improve effectiveness.',
              priority: 'medium',
              references: ['GV.OV-03'],
              examples: [
                'Performance evaluation frameworks',
                'Metrics and KPI tracking',
                'Adjustment procedures',
                'Continuous improvement processes'
              ],
              options: [
                { value: 0, label: 'No evaluation', description: 'Performance not evaluated', riskLevel: 'medium' },
                { value: 1, label: 'Basic evaluation', description: 'Some performance evaluation', riskLevel: 'low' },
                { value: 2, label: 'Regular evaluation', description: 'Systematic performance evaluation', riskLevel: 'low' },
                { value: 3, label: 'Advanced evaluation', description: 'Comprehensive performance management', riskLevel: 'low' }
              ]
            }
          ]
        },
        {
          id: 'supply-chain',
          name: 'Cybersecurity Supply Chain Risk Management (GV.SC)',
          description: 'Cyber supply chain risk management processes are identified, established, managed, monitored, and improved by organizational stakeholders',
          weight: 12,
          questions: [
            {
              id: 'nist.gv.sc.1',
              text: 'Is a cybersecurity supply chain risk management program established?',
              guidance: 'Establish a comprehensive cybersecurity supply chain risk management program with strategy, objectives, policies, and processes.',
              priority: 'high',
              references: ['GV.SC-01'],
              examples: [
                'Supply chain risk management program',
                'Program governance structure',
                'Policies and procedures',
                'Stakeholder agreement'
              ],
              options: [
                { value: 0, label: 'Not established', description: 'No supply chain risk management program', riskLevel: 'high' },
                { value: 1, label: 'Basic program', description: 'Basic supply chain risk activities', riskLevel: 'medium' },
                { value: 2, label: 'Established program', description: 'Formal supply chain risk management program', riskLevel: 'low' },
                { value: 3, label: 'Mature program', description: 'Comprehensive, mature program', riskLevel: 'low' }
              ]
            },
            {
              id: 'nist.gv.sc.2',
              text: 'Are cybersecurity roles and responsibilities for suppliers established and coordinated?',
              guidance: 'Define and coordinate cybersecurity roles and responsibilities for suppliers, customers, and partners both internally and externally.',
              priority: 'medium',
              references: ['GV.SC-02'],
              examples: [
                'Supplier role definitions',
                'Responsibility matrices',
                'Coordination procedures',
                'Communication protocols'
              ],
              options: [
                { value: 0, label: 'Not defined', description: 'Supplier roles and responsibilities unclear', riskLevel: 'medium' },
                { value: 1, label: 'Basic definition', description: 'Some supplier roles defined', riskLevel: 'low' },
                { value: 2, label: 'Well defined', description: 'Clear supplier roles and coordination', riskLevel: 'low' },
                { value: 3, label: 'Comprehensive', description: 'Comprehensive supplier role management', riskLevel: 'low' }
              ]
            },
            {
              id: 'nist.gv.sc.3',
              text: 'Is supply chain risk management integrated into cybersecurity and enterprise risk management?',
              guidance: 'Integrate cybersecurity supply chain risk management into broader cybersecurity and enterprise risk management processes.',
              priority: 'medium',
              references: ['GV.SC-03'],
              examples: [
                'Integration documentation',
                'Risk reporting consolidation',
                'Process alignment',
                'Shared governance structures'
              ],
              options: [
                { value: 0, label: 'Not integrated', description: 'Supply chain risks managed separately', riskLevel: 'medium' },
                { value: 1, label: 'Basic integration', description: 'Some integration with risk management', riskLevel: 'low' },
                { value: 2, label: 'Well integrated', description: 'Good integration across risk programs', riskLevel: 'low' },
                { value: 3, label: 'Fully integrated', description: 'Comprehensive integration with all risk management', riskLevel: 'low' }
              ]
            },
            {
              id: 'nist.gv.sc.4',
              text: 'Are suppliers known and prioritized by criticality?',
              guidance: 'Maintain knowledge of all suppliers and prioritize them based on their criticality to organizational operations and risk.',
              priority: 'high',
              references: ['GV.SC-04'],
              examples: [
                'Supplier inventory',
                'Criticality assessment',
                'Risk-based prioritization',
                'Supplier classification schemes'
              ],
              options: [
                { value: 0, label: 'Unknown', description: 'Suppliers not identified or prioritized', riskLevel: 'high' },
                { value: 1, label: 'Partially known', description: 'Some suppliers identified', riskLevel: 'medium' },
                { value: 2, label: 'Well known', description: 'Most suppliers identified and prioritized', riskLevel: 'low' },
                { value: 3, label: 'Comprehensive', description: 'Comprehensive supplier knowledge and prioritization', riskLevel: 'low' }
              ]
            },
            {
              id: 'nist.gv.sc.5',
              text: 'Are cybersecurity requirements integrated into supplier contracts and agreements?',
              guidance: 'Establish and integrate cybersecurity requirements into contracts and agreements with suppliers and third parties.',
              priority: 'high',
              references: ['GV.SC-05'],
              examples: [
                'Contract cybersecurity clauses',
                'Security requirements documentation',
                'SLA security provisions',
                'Compliance requirements'
              ],
              options: [
                { value: 0, label: 'Not integrated', description: 'No cybersecurity requirements in contracts', riskLevel: 'high' },
                { value: 1, label: 'Basic integration', description: 'Some contracts include security requirements', riskLevel: 'medium' },
                { value: 2, label: 'Well integrated', description: 'Most contracts include security requirements', riskLevel: 'low' },
                { value: 3, label: 'Comprehensive', description: 'All contracts include comprehensive security requirements', riskLevel: 'low' }
              ]
            },
            {
              id: 'nist.gv.sc.6',
              text: 'Are planning and due diligence performed to reduce risks before entering supplier relationships?',
              guidance: 'Perform planning and due diligence activities to reduce risks before entering into formal supplier or other third-party relationships.',
              priority: 'high',
              references: ['GV.SC-06'],
              examples: [
                'Supplier due diligence processes',
                'Pre-contract risk assessments',
                'Vendor evaluation criteria',
                'Third-party vetting procedures'
              ],
              options: [
                { value: 0, label: 'Not performed', description: 'No due diligence before supplier relationships', riskLevel: 'high' },
                { value: 1, label: 'Basic due diligence', description: 'Some planning and assessment performed', riskLevel: 'medium' },
                { value: 2, label: 'Comprehensive due diligence', description: 'Systematic planning and due diligence process', riskLevel: 'low' },
                { value: 3, label: 'Advanced due diligence', description: 'Comprehensive risk-based due diligence program', riskLevel: 'low' }
              ]
            },
            {
              id: 'nist.gv.sc.7',
              text: 'Are supplier risks understood, recorded, assessed, and monitored throughout the relationship?',
              guidance: 'Understand, record, prioritize, assess, respond to, and monitor the risks posed by suppliers, their products and services, and other third parties over the course of the relationship.',
              priority: 'high',
              references: ['GV.SC-07'],
              examples: [
                'Ongoing supplier risk assessments',
                'Risk monitoring programs',
                'Supplier performance tracking',
                'Third-party risk registers'
              ],
              options: [
                { value: 0, label: 'Not monitored', description: 'No ongoing supplier risk management', riskLevel: 'high' },
                { value: 1, label: 'Basic monitoring', description: 'Some supplier risk tracking', riskLevel: 'medium' },
                { value: 2, label: 'Systematic monitoring', description: 'Comprehensive supplier risk management', riskLevel: 'low' },
                { value: 3, label: 'Continuous monitoring', description: 'Advanced continuous supplier risk monitoring', riskLevel: 'low' }
              ]
            },
            {
              id: 'nist.gv.sc.8',
              text: 'Are suppliers included in incident planning, response, and recovery activities?',
              guidance: 'Include relevant suppliers and other third parties in incident planning, response, and recovery activities.',
              priority: 'medium',
              references: ['GV.SC-08'],
              examples: [
                'Supplier incident response coordination',
                'Third-party incident notification procedures',
                'Joint incident response exercises',
                'Supplier recovery planning'
              ],
              options: [
                { value: 0, label: 'Not included', description: 'Suppliers not included in incident activities', riskLevel: 'medium' },
                { value: 1, label: 'Basic inclusion', description: 'Some supplier incident coordination', riskLevel: 'low' },
                { value: 2, label: 'Well included', description: 'Systematic supplier incident involvement', riskLevel: 'low' },
                { value: 3, label: 'Fully integrated', description: 'Comprehensive supplier incident integration', riskLevel: 'low' }
              ]
            },
            {
              id: 'nist.gv.sc.9',
              text: 'Are supply chain security practices integrated and monitored throughout the technology lifecycle?',
              guidance: 'Integrate supply chain security practices into cybersecurity and enterprise risk management programs, and monitor their performance throughout the technology product and service lifecycle.',
              priority: 'medium',
              references: ['GV.SC-09'],
              examples: [
                'Lifecycle security integration',
                'Supply chain security monitoring',
                'Technology lifecycle management',
                'Performance metrics and KPIs'
              ],
              options: [
                { value: 0, label: 'Not integrated', description: 'No lifecycle supply chain security integration', riskLevel: 'medium' },
                { value: 1, label: 'Basic integration', description: 'Some lifecycle security practices', riskLevel: 'low' },
                { value: 2, label: 'Well integrated', description: 'Systematic lifecycle security integration', riskLevel: 'low' },
                { value: 3, label: 'Fully integrated', description: 'Comprehensive lifecycle security management', riskLevel: 'low' }
              ]
            },
            {
              id: 'nist.gv.sc.10',
              text: 'Do supply chain risk management plans include post-relationship provisions?',
              guidance: 'Ensure cybersecurity supply chain risk management plans include provisions for activities that occur after the conclusion of a partnership or service agreement.',
              priority: 'low',
              references: ['GV.SC-10'],
              examples: [
                'Contract termination procedures',
                'Data return and destruction',
                'Asset recovery processes',
                'Post-relationship risk assessment'
              ],
              options: [
                { value: 0, label: 'No provisions', description: 'No post-relationship risk management provisions', riskLevel: 'low' },
                { value: 1, label: 'Basic provisions', description: 'Some post-relationship planning', riskLevel: 'low' },
                { value: 2, label: 'Good provisions', description: 'Systematic post-relationship risk management', riskLevel: 'low' },
                { value: 3, label: 'Comprehensive provisions', description: 'Comprehensive post-relationship risk management', riskLevel: 'low' }
              ]
            }
          ]
        }
      ]
    },
    {
      id: 'identify',
      name: 'Identify (ID)',
      description: 'The organization\'s current cybersecurity risks are understood',
      weight: 20,
      priority: 'high',
      estimatedTime: 35,
      categories: [
        {
          id: 'asset-management',
          name: 'Asset Management (ID.AM)',
          description: 'Assets (e.g., data, hardware, software, systems, facilities, services, people) that enable the organization to achieve business purposes are identified and managed consistent with their relative importance to organizational objectives and the organization\'s risk strategy',
          weight: 40,
          questions: [
            {
              id: 'nist.id.am.1',
              text: 'Are inventories of hardware managed by the organization maintained?',
              guidance: 'Maintain comprehensive inventories of all hardware assets managed by the organization, including computers, servers, network equipment, mobile devices, and IoT devices.',
              priority: 'high',
              references: ['ID.AM-01'],
              examples: [
                'Asset management database with device details',
                'Network discovery tools for automated inventory',
                'Asset tags and tracking systems',
                'Regular physical audits and reconciliation'
              ],
              options: [
                { value: 0, label: 'Not maintained', description: 'No systematic hardware inventory', riskLevel: 'critical' },
                { value: 1, label: 'Basic inventory', description: 'Some hardware inventoried but incomplete', riskLevel: 'high' },
                { value: 2, label: 'Good inventory', description: 'Comprehensive hardware inventory with regular updates', riskLevel: 'medium' },
                { value: 3, label: 'Excellent inventory', description: 'Comprehensive, automated, real-time hardware inventory', riskLevel: 'low' }
              ]
            },
            {
              id: 'nist.id.am.2',
              text: 'Are inventories of software, services, and systems maintained?',
              guidance: 'Maintain comprehensive inventories of all software, services, and systems managed by the organization.',
              priority: 'high',
              references: ['ID.AM-02'],
              examples: [
                'Software asset management (SAM) tools',
                'Application portfolio management',
                'Service catalog management',
                'System architecture documentation'
              ],
              options: [
                { value: 0, label: 'Not maintained', description: 'No software/system inventory', riskLevel: 'critical' },
                { value: 1, label: 'Basic inventory', description: 'Some software/systems inventoried', riskLevel: 'high' },
                { value: 2, label: 'Good inventory', description: 'Comprehensive inventory with regular updates', riskLevel: 'medium' },
                { value: 3, label: 'Excellent inventory', description: 'Comprehensive, automated inventory management', riskLevel: 'low' }
              ]
            },
            {
              id: 'nist.id.am.3',
              text: 'Are network communication and data flows documented and maintained?',
              guidance: 'Maintain representations of authorized network communications and internal/external network data flows.',
              priority: 'medium',
              references: ['ID.AM-03'],
              examples: [
                'Network diagrams and topology maps',
                'Data flow documentation',
                'Network segmentation documentation',
                'External connection inventories'
              ],
              options: [
                { value: 0, label: 'Not documented', description: 'No network flow documentation', riskLevel: 'high' },
                { value: 1, label: 'Basic documentation', description: 'Some network flows documented', riskLevel: 'medium' },
                { value: 2, label: 'Good documentation', description: 'Comprehensive network flow documentation', riskLevel: 'low' },
                { value: 3, label: 'Excellent documentation', description: 'Comprehensive, automated network flow management', riskLevel: 'low' }
              ]
            },
            {
              id: 'nist.id.am.4',
              text: 'Are inventories of services provided by suppliers maintained?',
              guidance: 'Maintain comprehensive inventories of all services provided by external suppliers and vendors.',
              priority: 'high',
              references: ['ID.AM-04'],
              examples: [
                'Supplier service catalogs',
                'Third-party service documentation',
                'Vendor management systems',
                'Service dependency mapping'
              ],
              options: [
                { value: 0, label: 'Not maintained', description: 'No supplier service inventory', riskLevel: 'high' },
                { value: 1, label: 'Basic inventory', description: 'Some supplier services documented', riskLevel: 'medium' },
                { value: 2, label: 'Good inventory', description: 'Comprehensive supplier service inventory', riskLevel: 'low' },
                { value: 3, label: 'Excellent inventory', description: 'Comprehensive supplier service management', riskLevel: 'low' }
              ]
            },
            {
              id: 'nist.id.am.5',
              text: 'Are assets prioritized based on classification, criticality, and impact?',
              guidance: 'Prioritize assets based on their classification, criticality to operations, available resources, and impact on the mission.',
              priority: 'high',
              references: ['ID.AM-05'],
              examples: [
                'Asset classification schemes',
                'Criticality assessment criteria',
                'Business impact analysis',
                'Risk-based prioritization'
              ],
              options: [
                { value: 0, label: 'Not prioritized', description: 'No asset prioritization scheme', riskLevel: 'high' },
                { value: 1, label: 'Basic prioritization', description: 'Some asset prioritization exists', riskLevel: 'medium' },
                { value: 2, label: 'Good prioritization', description: 'Well-defined asset prioritization', riskLevel: 'low' },
                { value: 3, label: 'Excellent prioritization', description: 'Comprehensive, risk-based asset prioritization', riskLevel: 'low' }
              ]
            },
            {
              id: 'nist.id.am.7',
              text: 'Are inventories of data and corresponding metadata maintained?',
              guidance: 'Maintain inventories of data and corresponding metadata for designated data types throughout their lifecycle.',
              priority: 'medium',
              references: ['ID.AM-07'],
              examples: [
                'Data catalogs and inventories',
                'Metadata management systems',
                'Data lineage documentation',
                'Data classification schemes'
              ],
              options: [
                { value: 0, label: 'Not maintained', description: 'No data inventory or metadata management', riskLevel: 'medium' },
                { value: 1, label: 'Basic inventory', description: 'Some data inventoried', riskLevel: 'low' },
                { value: 2, label: 'Good inventory', description: 'Comprehensive data inventory with metadata', riskLevel: 'low' },
                { value: 3, label: 'Excellent inventory', description: 'Comprehensive data and metadata management', riskLevel: 'low' }
              ]
            },
            {
              id: 'nist.id.am.8',
              text: 'Are systems, hardware, software, services, and data managed throughout their life cycles?',
              guidance: 'Implement lifecycle management for all organizational assets including acquisition, deployment, maintenance, and disposal.',
              priority: 'medium',
              references: ['ID.AM-08'],
              examples: [
                'Asset lifecycle policies',
                'Lifecycle management processes',
                'Secure disposal procedures',
                'Change management integration'
              ],
              options: [
                { value: 0, label: 'Not managed', description: 'No lifecycle management', riskLevel: 'medium' },
                { value: 1, label: 'Basic management', description: 'Some lifecycle management activities', riskLevel: 'low' },
                { value: 2, label: 'Good management', description: 'Comprehensive lifecycle management', riskLevel: 'low' },
                { value: 3, label: 'Excellent management', description: 'Optimized lifecycle management processes', riskLevel: 'low' }
              ]
            }
          ]
        },
        {
          id: 'risk-assessment',
          name: 'Risk Assessment (ID.RA)',
          description: 'The cybersecurity risk to the organization, assets, and individuals is understood by the organization',
          weight: 40,
          questions: [
            {
              id: 'nist.id.ra.1',
              text: 'Are vulnerabilities in assets identified, validated, and recorded?',
              guidance: 'Systematically identify, validate, and record vulnerabilities in organizational assets including systems, applications, and infrastructure.',
              priority: 'high',
              references: ['ID.RA-01'],
              examples: [
                'Vulnerability scanning programs',
                'Penetration testing',
                'Security assessments',
                'Vulnerability management databases'
              ],
              options: [
                { value: 0, label: 'Not identified', description: 'No systematic vulnerability identification', riskLevel: 'critical' },
                { value: 1, label: 'Basic identification', description: 'Some vulnerability scanning performed', riskLevel: 'high' },
                { value: 2, label: 'Good identification', description: 'Regular vulnerability assessment program', riskLevel: 'medium' },
                { value: 3, label: 'Excellent identification', description: 'Comprehensive vulnerability management', riskLevel: 'low' }
              ]
            },
            {
              id: 'nist.id.ra.2',
              text: 'Is cyber threat intelligence received from information sharing forums and sources?',
              guidance: 'Establish processes to receive, analyze, and act upon cyber threat intelligence from various sources.',
              priority: 'medium',
              references: ['ID.RA-02'],
              examples: [
                'Threat intelligence feeds',
                'Information sharing participation',
                'Government security bulletins',
                'Industry threat reports'
              ],
              options: [
                { value: 0, label: 'No intelligence', description: 'No threat intelligence program', riskLevel: 'medium' },
                { value: 1, label: 'Basic intelligence', description: 'Some threat intelligence sources', riskLevel: 'low' },
                { value: 2, label: 'Good intelligence', description: 'Multiple intelligence sources with analysis', riskLevel: 'low' },
                { value: 3, label: 'Excellent intelligence', description: 'Comprehensive threat intelligence program', riskLevel: 'low' }
              ]
            },
            {
              id: 'nist.id.ra.3',
              text: 'Are internal and external threats to the organization identified and recorded?',
              guidance: 'Identify and document both internal and external threats that could impact the organization.',
              priority: 'high',
              references: ['ID.RA-03'],
              examples: [
                'Threat modeling exercises',
                'Threat landscape analysis',
                'Internal threat assessments',
                'Threat documentation and tracking'
              ],
              options: [
                { value: 0, label: 'Not identified', description: 'Threats not systematically identified', riskLevel: 'high' },
                { value: 1, label: 'Basic identification', description: 'Some threats identified', riskLevel: 'medium' },
                { value: 2, label: 'Good identification', description: 'Comprehensive threat identification', riskLevel: 'low' },
                { value: 3, label: 'Excellent identification', description: 'Advanced threat intelligence and modeling', riskLevel: 'low' }
              ]
            },
            {
              id: 'nist.id.ra.4',
              text: 'Are potential impacts and likelihoods of threats exploiting vulnerabilities identified?',
              guidance: 'Assess and document the potential impacts and likelihood of identified threats exploiting known vulnerabilities.',
              priority: 'high',
              references: ['ID.RA-04'],
              examples: [
                'Risk impact assessments',
                'Likelihood analysis',
                'Threat-vulnerability pairing',
                'Impact quantification methods'
              ],
              options: [
                { value: 0, label: 'Not assessed', description: 'No impact or likelihood assessment', riskLevel: 'high' },
                { value: 1, label: 'Basic assessment', description: 'Some impact and likelihood analysis', riskLevel: 'medium' },
                { value: 2, label: 'Good assessment', description: 'Systematic impact and likelihood assessment', riskLevel: 'low' },
                { value: 3, label: 'Excellent assessment', description: 'Comprehensive risk impact analysis', riskLevel: 'low' }
              ]
            },
            {
              id: 'nist.id.ra.5',
              text: 'Are threats, vulnerabilities, likelihoods, and impacts used to understand inherent risk?',
              guidance: 'Combine threat, vulnerability, likelihood, and impact information to understand inherent risk and inform response prioritization.',
              priority: 'high',
              references: ['ID.RA-05'],
              examples: [
                'Risk calculation methodologies',
                'Risk matrices and frameworks',
                'Inherent risk documentation',
                'Risk prioritization schemes'
              ],
              options: [
                { value: 0, label: 'Not used', description: 'No systematic risk understanding', riskLevel: 'high' },
                { value: 1, label: 'Basic use', description: 'Some risk calculation performed', riskLevel: 'medium' },
                { value: 2, label: 'Good use', description: 'Systematic risk understanding and prioritization', riskLevel: 'low' },
                { value: 3, label: 'Excellent use', description: 'Advanced risk analysis and prioritization', riskLevel: 'low' }
              ]
            },
            {
              id: 'nist.id.ra.6',
              text: 'Are risk responses chosen, prioritized, planned, tracked, and communicated?',
              guidance: 'Develop, prioritize, plan, track, and communicate appropriate responses to identified cybersecurity risks.',
              priority: 'high',
              references: ['ID.RA-06'],
              examples: [
                'Risk response strategies',
                'Risk treatment plans',
                'Risk tracking systems',
                'Risk communication protocols'
              ],
              options: [
                { value: 0, label: 'Not managed', description: 'No systematic risk response management', riskLevel: 'high' },
                { value: 1, label: 'Basic management', description: 'Some risk responses planned', riskLevel: 'medium' },
                { value: 2, label: 'Good management', description: 'Systematic risk response management', riskLevel: 'low' },
                { value: 3, label: 'Excellent management', description: 'Comprehensive risk response program', riskLevel: 'low' }
              ]
            },
            {
              id: 'nist.id.ra.7',
              text: 'Are changes and exceptions managed, assessed for risk impact, and tracked?',
              guidance: 'Implement processes to manage changes and exceptions, assess their risk impact, and track them appropriately.',
              priority: 'medium',
              references: ['ID.RA-07'],
              examples: [
                'Change management processes',
                'Exception management procedures',
                'Risk impact assessments for changes',
                'Change tracking systems'
              ],
              options: [
                { value: 0, label: 'Not managed', description: 'No change or exception management', riskLevel: 'medium' },
                { value: 1, label: 'Basic management', description: 'Some change management exists', riskLevel: 'low' },
                { value: 2, label: 'Good management', description: 'Systematic change and exception management', riskLevel: 'low' },
                { value: 3, label: 'Excellent management', description: 'Comprehensive change management with risk assessment', riskLevel: 'low' }
              ]
            },
            {
              id: 'nist.id.ra.8',
              text: 'Are processes for receiving and responding to vulnerability disclosures established?',
              guidance: 'Establish processes for receiving, analyzing, and responding to vulnerability disclosures from internal and external sources.',
              priority: 'medium',
              references: ['ID.RA-08'],
              examples: [
                'Vulnerability disclosure policies',
                'Coordinated disclosure processes',
                'Bug bounty programs',
                'Vulnerability response procedures'
              ],
              options: [
                { value: 0, label: 'Not established', description: 'No vulnerability disclosure process', riskLevel: 'medium' },
                { value: 1, label: 'Basic process', description: 'Some vulnerability disclosure handling', riskLevel: 'low' },
                { value: 2, label: 'Good process', description: 'Established vulnerability disclosure process', riskLevel: 'low' },
                { value: 3, label: 'Excellent process', description: 'Comprehensive vulnerability disclosure program', riskLevel: 'low' }
              ]
            },
            {
              id: 'nist.id.ra.9',
              text: 'Is the authenticity and integrity of hardware and software assessed prior to acquisition?',
              guidance: 'Implement processes to assess the authenticity and integrity of hardware and software before acquisition and use.',
              priority: 'medium',
              references: ['ID.RA-09'],
              examples: [
                'Supply chain verification processes',
                'Hardware authentication procedures',
                'Software integrity checking',
                'Vendor verification programs'
              ],
              options: [
                { value: 0, label: 'Not assessed', description: 'No authenticity or integrity assessment', riskLevel: 'medium' },
                { value: 1, label: 'Basic assessment', description: 'Some verification performed', riskLevel: 'low' },
                { value: 2, label: 'Good assessment', description: 'Systematic authenticity and integrity assessment', riskLevel: 'low' },
                { value: 3, label: 'Excellent assessment', description: 'Comprehensive supply chain verification', riskLevel: 'low' }
              ]
            },
            {
              id: 'nist.id.ra.10',
              text: 'Are critical suppliers assessed prior to acquisition?',
              guidance: 'Conduct comprehensive assessments of critical suppliers before establishing business relationships.',
              priority: 'high',
              references: ['ID.RA-10'],
              examples: [
                'Supplier risk assessments',
                'Due diligence processes',
                'Security evaluation criteria',
                'Vendor qualification programs'
              ],
              options: [
                { value: 0, label: 'Not assessed', description: 'No supplier assessment process', riskLevel: 'high' },
                { value: 1, label: 'Basic assessment', description: 'Some supplier evaluation performed', riskLevel: 'medium' },
                { value: 2, label: 'Good assessment', description: 'Systematic supplier assessment process', riskLevel: 'low' },
                { value: 3, label: 'Excellent assessment', description: 'Comprehensive supplier risk assessment program', riskLevel: 'low' }
              ]
            }
          ]
        },
        {
          id: 'improvement',
          name: 'Improvement (ID.IM)',
          description: 'Improvements to organizational cybersecurity risk management processes, procedures and activities are identified across all CSF Functions',
          weight: 20,
          questions: [
            {
              id: 'nist.id.im.1',
              text: 'Are improvements identified from evaluations?',
              guidance: 'Systematically identify improvements from cybersecurity evaluations, assessments, and audits.',
              priority: 'medium',
              references: ['ID.IM-01'],
              examples: [
                'Evaluation and assessment programs',
                'Improvement identification processes',
                'Lessons learned documentation',
                'Continuous improvement frameworks'
              ],
              options: [
                { value: 0, label: 'Not identified', description: 'No systematic improvement identification', riskLevel: 'medium' },
                { value: 1, label: 'Basic identification', description: 'Some improvements identified from evaluations', riskLevel: 'low' },
                { value: 2, label: 'Good identification', description: 'Systematic improvement identification process', riskLevel: 'low' },
                { value: 3, label: 'Excellent identification', description: 'Comprehensive improvement identification program', riskLevel: 'low' }
              ]
            },
            {
              id: 'nist.id.im.2',
              text: 'Are improvements identified from security tests and exercises?',
              guidance: 'Identify improvements from security tests, exercises, and drills, including those conducted with suppliers and third parties.',
              priority: 'medium',
              references: ['ID.IM-02'],
              examples: [
                'Security testing programs',
                'Tabletop exercises',
                'Penetration testing',
                'Third-party exercise coordination'
              ],
              options: [
                { value: 0, label: 'Not identified', description: 'No improvements from testing/exercises', riskLevel: 'medium' },
                { value: 1, label: 'Basic identification', description: 'Some improvements from tests/exercises', riskLevel: 'low' },
                { value: 2, label: 'Good identification', description: 'Regular improvement identification from testing', riskLevel: 'low' },
                { value: 3, label: 'Excellent identification', description: 'Comprehensive test-based improvement program', riskLevel: 'low' }
              ]
            },
            {
              id: 'nist.id.im.3',
              text: 'Are improvements identified from operational processes and activities?',
              guidance: 'Continuously identify improvements from the execution of operational cybersecurity processes, procedures, and activities.',
              priority: 'low',
              references: ['ID.IM-03'],
              examples: [
                'Operational review processes',
                'Process improvement initiatives',
                'Performance monitoring',
                'Feedback collection mechanisms'
              ],
              options: [
                { value: 0, label: 'Not identified', description: 'No operational improvement identification', riskLevel: 'low' },
                { value: 1, label: 'Basic identification', description: 'Some operational improvements identified', riskLevel: 'low' },
                { value: 2, label: 'Good identification', description: 'Systematic operational improvement process', riskLevel: 'low' },
                { value: 3, label: 'Excellent identification', description: 'Continuous operational improvement program', riskLevel: 'low' }
              ]
            },
            {
              id: 'nist.id.im.4',
              text: 'Are incident response and cybersecurity plans established, maintained, and improved?',
              guidance: 'Establish, communicate, maintain, and continuously improve incident response plans and other cybersecurity plans that affect operations.',
              priority: 'high',
              references: ['ID.IM-04'],
              examples: [
                'Incident response plan development',
                'Plan maintenance procedures',
                'Regular plan updates',
                'Plan improvement processes'
              ],
              options: [
                { value: 0, label: 'Not established', description: 'No formal cybersecurity plans', riskLevel: 'high' },
                { value: 1, label: 'Basic plans', description: 'Some plans exist but may be outdated', riskLevel: 'medium' },
                { value: 2, label: 'Good plans', description: 'Well-maintained and current plans', riskLevel: 'low' },
                { value: 3, label: 'Excellent plans', description: 'Comprehensive, continuously improved plans', riskLevel: 'low' }
              ]
            }
          ]
        }
      ]
    },
    {
      id: 'protect',
      name: 'Protect (PR)',
      description: 'Safeguards to manage the organization\'s cybersecurity risks are used',
      weight: 25,
      priority: 'high',
      estimatedTime: 45,
      categories: [
        {
          id: 'identity-authentication-access',
          name: 'Identity Management, Authentication, and Access Control (PR.AA)',
          description: 'Access to physical and logical assets is limited to authorized users, services, and hardware and managed commensurate with the assessed risk of unauthorized access',
          weight: 30,
          questions: [
            {
              id: 'nist.pr.aa.1',
              text: 'Are identities and credentials for authorized users, services, and hardware managed?',
              guidance: 'Implement comprehensive identity and access management for all users, services, and hardware components.',
              priority: 'high',
              references: ['PR.AA-01'],
              examples: [
                'Identity management systems',
                'Credential lifecycle management',
                'Service account management',
                'Hardware identity management'
              ],
              options: [
                { value: 0, label: 'Not managed', description: 'No systematic identity management', riskLevel: 'critical' },
                { value: 1, label: 'Basic management', description: 'Some identity management exists', riskLevel: 'high' },
                { value: 2, label: 'Good management', description: 'Comprehensive identity management system', riskLevel: 'medium' },
                { value: 3, label: 'Excellent management', description: 'Advanced identity management with automation', riskLevel: 'low' }
              ]
            },
            {
              id: 'nist.pr.aa.2',
              text: 'Are identities proofed and bound to credentials based on interaction context?',
              guidance: 'Implement identity proofing and credential binding processes appropriate to the context of user interactions.',
              priority: 'high',
              references: ['PR.AA-02'],
              examples: [
                'Identity verification processes',
                'Risk-based authentication',
                'Credential binding procedures',
                'Context-aware access controls'
              ],
              options: [
                { value: 0, label: 'Not implemented', description: 'No identity proofing or credential binding', riskLevel: 'high' },
                { value: 1, label: 'Basic implementation', description: 'Some identity proofing exists', riskLevel: 'medium' },
                { value: 2, label: 'Good implementation', description: 'Systematic identity proofing and binding', riskLevel: 'low' },
                { value: 3, label: 'Excellent implementation', description: 'Advanced context-aware identity management', riskLevel: 'low' }
              ]
            },
            {
              id: 'nist.pr.aa.3',
              text: 'Are users, services, and hardware authenticated?',
              guidance: 'Implement authentication mechanisms for all users, services, and hardware accessing organizational resources.',
              priority: 'high',
              references: ['PR.AA-03'],
              examples: [
                'Multi-factor authentication',
                'Service authentication',
                'Hardware authentication',
                'Strong authentication protocols'
              ],
              options: [
                { value: 0, label: 'No authentication', description: 'No systematic authentication requirements', riskLevel: 'critical' },
                { value: 1, label: 'Basic authentication', description: 'Basic authentication implemented', riskLevel: 'high' },
                { value: 2, label: 'Strong authentication', description: 'Multi-factor authentication implemented', riskLevel: 'medium' },
                { value: 3, label: 'Advanced authentication', description: 'Comprehensive authentication with risk-based controls', riskLevel: 'low' }
              ]
            },
            {
              id: 'nist.pr.aa.4',
              text: 'Are identity assertions protected, conveyed, and verified?',
              guidance: 'Protect, convey, and verify identity assertions using secure protocols and mechanisms.',
              priority: 'medium',
              references: ['PR.AA-04'],
              examples: [
                'Secure token systems',
                'Identity assertion protocols',
                'Cryptographic protection',
                'Assertion verification mechanisms'
              ],
              options: [
                { value: 0, label: 'Not protected', description: 'Identity assertions not properly protected', riskLevel: 'high' },
                { value: 1, label: 'Basic protection', description: 'Some protection of identity assertions', riskLevel: 'medium' },
                { value: 2, label: 'Good protection', description: 'Strong protection and verification', riskLevel: 'low' },
                { value: 3, label: 'Excellent protection', description: 'Comprehensive identity assertion security', riskLevel: 'low' }
              ]
            },
            {
              id: 'nist.pr.aa.5',
              text: 'Are access permissions managed using least privilege and separation of duties?',
              guidance: 'Define, manage, enforce, and review access permissions incorporating principles of least privilege and separation of duties.',
              priority: 'high',
              references: ['PR.AA-05'],
              examples: [
                'Role-based access control',
                'Least privilege implementation',
                'Separation of duties matrices',
                'Access review processes'
              ],
              options: [
                { value: 0, label: 'Not managed', description: 'No systematic access management', riskLevel: 'critical' },
                { value: 1, label: 'Basic management', description: 'Some access controls exist', riskLevel: 'high' },
                { value: 2, label: 'Good management', description: 'Well-implemented access controls with reviews', riskLevel: 'medium' },
                { value: 3, label: 'Excellent management', description: 'Comprehensive access management with automation', riskLevel: 'low' }
              ]
            },
            {
              id: 'nist.pr.aa.6',
              text: 'Is physical access to assets managed, monitored, and enforced?',
              guidance: 'Manage, monitor, and enforce physical access to assets commensurate with risk levels.',
              priority: 'medium',
              references: ['PR.AA-06'],
              examples: [
                'Physical access control systems',
                'Badge access management',
                'Visitor management',
                'Physical security monitoring'
              ],
              options: [
                { value: 0, label: 'Not managed', description: 'No physical access controls', riskLevel: 'high' },
                { value: 1, label: 'Basic management', description: 'Some physical access controls', riskLevel: 'medium' },
                { value: 2, label: 'Good management', description: 'Comprehensive physical access controls', riskLevel: 'low' },
                { value: 3, label: 'Excellent management', description: 'Advanced physical security with monitoring', riskLevel: 'low' }
              ]
            }
          ]
        },
        {
          id: 'awareness-training',
          name: 'Awareness and Training (PR.AT)',
          description: 'The organization\'s personnel are provided with cybersecurity awareness and training so that they can perform their cybersecurity-related tasks',
          weight: 15,
          questions: [
            {
              id: 'nist.pr.at.1',
              text: 'Are personnel provided with cybersecurity awareness and training?',
              guidance: 'Provide all personnel with cybersecurity awareness and training so they can perform general tasks with cybersecurity risks in mind.',
              priority: 'medium',
              references: ['PR.AT-01'],
              examples: [
                'General security awareness training',
                'Phishing awareness programs',
                'Security policy training',
                'Regular awareness updates'
              ],
              options: [
                { value: 0, label: 'No training', description: 'No cybersecurity awareness training', riskLevel: 'high' },
                { value: 1, label: 'Basic training', description: 'Some awareness training provided', riskLevel: 'medium' },
                { value: 2, label: 'Good training', description: 'Regular comprehensive awareness training', riskLevel: 'low' },
                { value: 3, label: 'Excellent training', description: 'Advanced awareness program with simulations', riskLevel: 'low' }
              ]
            },
            {
              id: 'nist.pr.at.2',
              text: 'Are individuals in specialized roles provided with specialized training?',
              guidance: 'Provide individuals in specialized cybersecurity roles with specific awareness and training for their responsibilities.',
              priority: 'medium',
              references: ['PR.AT-02'],
              examples: [
                'Role-specific security training',
                'Technical security training',
                'Professional certification programs',
                'Specialized skill development'
              ],
              options: [
                { value: 0, label: 'No specialized training', description: 'No role-specific training provided', riskLevel: 'medium' },
                { value: 1, label: 'Basic specialized training', description: 'Some role-specific training exists', riskLevel: 'low' },
                { value: 2, label: 'Good specialized training', description: 'Comprehensive role-based training', riskLevel: 'low' },
                { value: 3, label: 'Excellent specialized training', description: 'Advanced specialized training with certifications', riskLevel: 'low' }
              ]
            }
          ]
        },
        {
          id: 'data-security',
          name: 'Data Security (PR.DS)',
          description: 'Data are managed consistent with the organization\'s risk strategy to protect the confidentiality, integrity, and availability of information',
          weight: 25,
          questions: [
            {
              id: 'nist.pr.ds.1',
              text: 'Is the confidentiality, integrity, and availability of data-at-rest protected?',
              guidance: 'Implement controls to protect data when stored, including encryption, access controls, and secure storage practices.',
              priority: 'high',
              references: ['PR.DS-01'],
              examples: [
                'Database encryption',
                'File system encryption',
                'Encrypted backup systems',
                'Secure storage configurations'
              ],
              options: [
                { value: 0, label: 'Not protected', description: 'No protection for data at rest', riskLevel: 'critical' },
                { value: 1, label: 'Basic protection', description: 'Some data encryption exists', riskLevel: 'high' },
                { value: 2, label: 'Good protection', description: 'Comprehensive data-at-rest protection', riskLevel: 'medium' },
                { value: 3, label: 'Excellent protection', description: 'Advanced encryption with key management', riskLevel: 'low' }
              ]
            },
            {
              id: 'nist.pr.ds.2',
              text: 'Is the confidentiality, integrity, and availability of data-in-transit protected?',
              guidance: 'Protect data while being transmitted across networks using encryption and secure protocols.',
              priority: 'high',
              references: ['PR.DS-02'],
              examples: [
                'TLS/SSL encryption',
                'VPN connections',
                'Encrypted communications',
                'Secure file transfer protocols'
              ],
              options: [
                { value: 0, label: 'Not protected', description: 'No protection for data in transit', riskLevel: 'critical' },
                { value: 1, label: 'Basic protection', description: 'Some encrypted communications', riskLevel: 'high' },
                { value: 2, label: 'Good protection', description: 'Most communications encrypted', riskLevel: 'medium' },
                { value: 3, label: 'Excellent protection', description: 'All communications encrypted with strong protocols', riskLevel: 'low' }
              ]
            },
            {
              id: 'nist.pr.ds.10',
              text: 'Is the confidentiality, integrity, and availability of data-in-use protected?',
              guidance: 'Protect data while being processed or in active use through appropriate technical and procedural controls.',
              priority: 'medium',
              references: ['PR.DS-10'],
              examples: [
                'Application-level encryption',
                'Secure processing environments',
                'Memory protection',
                'Confidential computing technologies'
              ],
              options: [
                { value: 0, label: 'Not protected', description: 'No protection for data in use', riskLevel: 'high' },
                { value: 1, label: 'Basic protection', description: 'Some data-in-use protection', riskLevel: 'medium' },
                { value: 2, label: 'Good protection', description: 'Comprehensive data-in-use protection', riskLevel: 'low' },
                { value: 3, label: 'Excellent protection', description: 'Advanced data-in-use protection technologies', riskLevel: 'low' }
              ]
            },
            {
              id: 'nist.pr.ds.11',
              text: 'Are backups of data created, protected, maintained, and tested?',
              guidance: 'Implement comprehensive backup processes including creation, protection, maintenance, and regular testing of data backups.',
              priority: 'high',
              references: ['PR.DS-11'],
              examples: [
                'Automated backup systems',
                'Backup encryption',
                'Offsite backup storage',
                'Regular restore testing'
              ],
              options: [
                { value: 0, label: 'No backups', description: 'No systematic backup process', riskLevel: 'critical' },
                { value: 1, label: 'Basic backups', description: 'Some backup processes exist', riskLevel: 'high' },
                { value: 2, label: 'Good backups', description: 'Comprehensive backup system with testing', riskLevel: 'medium' },
                { value: 3, label: 'Excellent backups', description: 'Advanced backup system with automation and encryption', riskLevel: 'low' }
              ]
            }
          ]
        },
        {
          id: 'platform-security',
          name: 'Platform Security (PR.PS)',
          description: 'The hardware, software (e.g., firmware, operating systems, applications), and services of physical and virtual platforms are managed consistent with the organization\'s risk strategy',
          weight: 20,
          questions: [
            {
              id: 'nist.pr.ps.1',
              text: 'Are configuration management practices established and applied?',
              guidance: 'Establish and apply configuration management practices for all organizational systems and platforms.',
              priority: 'high',
              references: ['PR.PS-01'],
              examples: [
                'Configuration management databases',
                'Baseline configurations',
                'Change control processes',
                'Configuration compliance monitoring'
              ],
              options: [
                { value: 0, label: 'Not established', description: 'No configuration management', riskLevel: 'high' },
                { value: 1, label: 'Basic practices', description: 'Some configuration management exists', riskLevel: 'medium' },
                { value: 2, label: 'Good practices', description: 'Comprehensive configuration management', riskLevel: 'low' },
                { value: 3, label: 'Excellent practices', description: 'Advanced automated configuration management', riskLevel: 'low' }
              ]
            },
            {
              id: 'nist.pr.ps.2',
              text: 'Is software maintained, replaced, and removed commensurate with risk?',
              guidance: 'Implement software lifecycle management including maintenance, replacement, and removal based on risk assessment.',
              priority: 'high',
              references: ['PR.PS-02'],
              examples: [
                'Software patch management',
                'End-of-life software replacement',
                'Secure software removal',
                'Software inventory management'
              ],
              options: [
                { value: 0, label: 'Not managed', description: 'No software lifecycle management', riskLevel: 'high' },
                { value: 1, label: 'Basic management', description: 'Some software management exists', riskLevel: 'medium' },
                { value: 2, label: 'Good management', description: 'Systematic software lifecycle management', riskLevel: 'low' },
                { value: 3, label: 'Excellent management', description: 'Advanced automated software management', riskLevel: 'low' }
              ]
            },
            {
              id: 'nist.pr.ps.3',
              text: 'Is hardware maintained, replaced, and removed commensurate with risk?',
              guidance: 'Implement hardware lifecycle management including maintenance, replacement, and secure disposal based on risk.',
              priority: 'medium',
              references: ['PR.PS-03'],
              examples: [
                'Hardware maintenance schedules',
                'End-of-life replacement planning',
                'Secure hardware disposal',
                'Hardware warranty management'
              ],
              options: [
                { value: 0, label: 'Not managed', description: 'No hardware lifecycle management', riskLevel: 'medium' },
                { value: 1, label: 'Basic management', description: 'Some hardware management exists', riskLevel: 'low' },
                { value: 2, label: 'Good management', description: 'Systematic hardware lifecycle management', riskLevel: 'low' },
                { value: 3, label: 'Excellent management', description: 'Comprehensive hardware asset management', riskLevel: 'low' }
              ]
            },
            {
              id: 'nist.pr.ps.4',
              text: 'Are log records generated and made available for continuous monitoring?',
              guidance: 'Ensure comprehensive log generation and availability to support continuous monitoring and security analysis.',
              priority: 'high',
              references: ['PR.PS-04'],
              examples: [
                'Centralized logging systems',
                'Log retention policies',
                'Log correlation and analysis',
                'Real-time log monitoring'
              ],
              options: [
                { value: 0, label: 'No logging', description: 'Minimal or no log generation', riskLevel: 'high' },
                { value: 1, label: 'Basic logging', description: 'Some log generation exists', riskLevel: 'medium' },
                { value: 2, label: 'Good logging', description: 'Comprehensive logging with monitoring', riskLevel: 'low' },
                { value: 3, label: 'Excellent logging', description: 'Advanced logging with automated analysis', riskLevel: 'low' }
              ]
            },
            {
              id: 'nist.pr.ps.5',
              text: 'Is installation and execution of unauthorized software prevented?',
              guidance: 'Implement controls to prevent the installation and execution of unauthorized software on organizational systems.',
              priority: 'high',
              references: ['PR.PS-05'],
              examples: [
                'Application control systems',
                'Software restriction policies',
                'Whitelisting/allowlisting',
                'Endpoint protection platforms'
              ],
              options: [
                { value: 0, label: 'Not prevented', description: 'No controls for unauthorized software', riskLevel: 'high' },
                { value: 1, label: 'Basic prevention', description: 'Some software controls exist', riskLevel: 'medium' },
                { value: 2, label: 'Good prevention', description: 'Comprehensive software control systems', riskLevel: 'low' },
                { value: 3, label: 'Excellent prevention', description: 'Advanced application control with automation', riskLevel: 'low' }
              ]
            },
            {
              id: 'nist.pr.ps.6',
              text: 'Are secure software development practices integrated and monitored?',
              guidance: 'Integrate secure software development practices throughout the software development lifecycle and monitor their performance.',
              priority: 'medium',
              references: ['PR.PS-06'],
              examples: [
                'Secure coding standards',
                'Security testing in development',
                'Code review processes',
                'DevSecOps practices'
              ],
              options: [
                { value: 0, label: 'Not integrated', description: 'No secure development practices', riskLevel: 'high' },
                { value: 1, label: 'Basic integration', description: 'Some secure development practices', riskLevel: 'medium' },
                { value: 2, label: 'Good integration', description: 'Comprehensive secure development program', riskLevel: 'low' },
                { value: 3, label: 'Excellent integration', description: 'Advanced DevSecOps with continuous monitoring', riskLevel: 'low' }
              ]
            }
          ]
        },
        {
          id: 'technology-infrastructure',
          name: 'Technology Infrastructure Resilience (PR.IR)',
          description: 'Security architectures are managed with the organization\'s risk strategy to protect asset confidentiality, integrity, and availability, and organizational resilience',
          weight: 10,
          questions: [
            {
              id: 'nist.pr.ir.1',
              text: 'Are networks and environments protected from unauthorized logical access?',
              guidance: 'Implement network security controls to protect against unauthorized logical access and usage.',
              priority: 'high',
              references: ['PR.IR-01'],
              examples: [
                'Network segmentation',
                'Firewalls and intrusion prevention',
                'Network access control',
                'Zero trust architecture'
              ],
              options: [
                { value: 0, label: 'Not protected', description: 'No network security controls', riskLevel: 'critical' },
                { value: 1, label: 'Basic protection', description: 'Some network security controls', riskLevel: 'high' },
                { value: 2, label: 'Good protection', description: 'Comprehensive network security', riskLevel: 'medium' },
                { value: 3, label: 'Excellent protection', description: 'Advanced network security with zero trust', riskLevel: 'low' }
              ]
            },
            {
              id: 'nist.pr.ir.2',
              text: 'Are technology assets protected from environmental threats?',
              guidance: 'Protect organizational technology assets from environmental threats such as natural disasters and physical hazards.',
              priority: 'medium',
              references: ['PR.IR-02'],
              examples: [
                'Environmental monitoring',
                'Physical protection measures',
                'Redundant power systems',
                'Climate control systems'
              ],
              options: [
                { value: 0, label: 'Not protected', description: 'No environmental protection', riskLevel: 'medium' },
                { value: 1, label: 'Basic protection', description: 'Some environmental controls', riskLevel: 'low' },
                { value: 2, label: 'Good protection', description: 'Comprehensive environmental protection', riskLevel: 'low' },
                { value: 3, label: 'Excellent protection', description: 'Advanced environmental monitoring and protection', riskLevel: 'low' }
              ]
            },
            {
              id: 'nist.pr.ir.3',
              text: 'Are mechanisms implemented to achieve resilience requirements?',
              guidance: 'Implement mechanisms to achieve organizational resilience requirements in both normal and adverse situations.',
              priority: 'medium',
              references: ['PR.IR-03'],
              examples: [
                'Redundancy and failover systems',
                'Business continuity planning',
                'Disaster recovery capabilities',
                'High availability architectures'
              ],
              options: [
                { value: 0, label: 'Not implemented', description: 'No resilience mechanisms', riskLevel: 'high' },
                { value: 1, label: 'Basic implementation', description: 'Some resilience capabilities', riskLevel: 'medium' },
                { value: 2, label: 'Good implementation', description: 'Comprehensive resilience mechanisms', riskLevel: 'low' },
                { value: 3, label: 'Excellent implementation', description: 'Advanced resilience with automated recovery', riskLevel: 'low' }
              ]
            },
            {
              id: 'nist.pr.ir.4',
              text: 'Is adequate resource capacity maintained to ensure availability?',
              guidance: 'Maintain adequate resource capacity including computing, storage, and network resources to ensure service availability.',
              priority: 'medium',
              references: ['PR.IR-04'],
              examples: [
                'Capacity planning processes',
                'Resource monitoring',
                'Scalability planning',
                'Performance management'
              ],
              options: [
                { value: 0, label: 'Not maintained', description: 'No capacity planning or monitoring', riskLevel: 'medium' },
                { value: 1, label: 'Basic maintenance', description: 'Some capacity management', riskLevel: 'low' },
                { value: 2, label: 'Good maintenance', description: 'Systematic capacity planning and monitoring', riskLevel: 'low' },
                { value: 3, label: 'Excellent maintenance', description: 'Advanced capacity management with automation', riskLevel: 'low' }
              ]
            }
          ]
        }
      ]
    },
    {
      id: 'detect',
      name: 'Detect (DE)',
      description: 'Possible cybersecurity attacks and compromises are found and analyzed',
      weight: 15,
      priority: 'medium',
      estimatedTime: 30,
      categories: [
        {
          id: 'continuous-monitoring',
          name: 'Continuous Monitoring (DE.CM)',
          description: 'Assets are monitored to find anomalies, indicators of compromise, and other potentially adverse events',
          weight: 60,
          questions: [
            {
              id: 'nist.de.cm.1',
              text: 'Are networks and network services monitored to find potentially adverse events?',
              guidance: 'Implement continuous monitoring of networks and network services to detect suspicious activities and potential security incidents.',
              priority: 'high',
              references: ['DE.CM-01'],
              examples: [
                'Network intrusion detection systems',
                'Network traffic analysis',
                'SIEM solutions',
                'Network behavior monitoring'
              ],
              options: [
                { value: 0, label: 'Not monitored', description: 'No network monitoring', riskLevel: 'critical' },
                { value: 1, label: 'Basic monitoring', description: 'Some network monitoring tools', riskLevel: 'high' },
                { value: 2, label: 'Good monitoring', description: 'Comprehensive network monitoring', riskLevel: 'medium' },
                { value: 3, label: 'Excellent monitoring', description: 'Advanced network monitoring with AI/ML detection', riskLevel: 'low' }
              ]
            },
            {
              id: 'nist.de.cm.2',
              text: 'Is the physical environment monitored to find potentially adverse events?',
              guidance: 'Monitor the physical environment to detect unauthorized access, tampering, or other physical security incidents.',
              priority: 'medium',
              references: ['DE.CM-02'],
              examples: [
                'Security cameras and surveillance',
                'Physical access monitoring',
                'Environmental sensors',
                'Intrusion detection systems'
              ],
              options: [
                { value: 0, label: 'Not monitored', description: 'No physical environment monitoring', riskLevel: 'medium' },
                { value: 1, label: 'Basic monitoring', description: 'Some physical monitoring systems', riskLevel: 'low' },
                { value: 2, label: 'Good monitoring', description: 'Comprehensive physical monitoring', riskLevel: 'low' },
                { value: 3, label: 'Excellent monitoring', description: 'Advanced physical monitoring with analytics', riskLevel: 'low' }
              ]
            },
            {
              id: 'nist.de.cm.3',
              text: 'Are personnel activity and technology usage monitored?',
              guidance: 'Monitor personnel activities and technology usage patterns to identify potentially adverse events and insider threats.',
              priority: 'medium',
              references: ['DE.CM-03'],
              examples: [
                'User behavior analytics',
                'Privileged access monitoring',
                'Data access monitoring',
                'Activity logging and analysis'
              ],
              options: [
                { value: 0, label: 'Not monitored', description: 'No personnel activity monitoring', riskLevel: 'medium' },
                { value: 1, label: 'Basic monitoring', description: 'Some activity monitoring exists', riskLevel: 'low' },
                { value: 2, label: 'Good monitoring', description: 'Comprehensive activity monitoring', riskLevel: 'low' },
                { value: 3, label: 'Excellent monitoring', description: 'Advanced behavioral analytics and monitoring', riskLevel: 'low' }
              ]
            },
            {
              id: 'nist.de.cm.6',
              text: 'Are external service provider activities monitored?',
              guidance: 'Monitor external service provider activities and services to detect potentially adverse events in the supply chain.',
              priority: 'medium',
              references: ['DE.CM-06'],
              examples: [
                'Third-party monitoring systems',
                'Supplier security monitoring',
                'Service provider oversight',
                'Supply chain visibility tools'
              ],
              options: [
                { value: 0, label: 'Not monitored', description: 'No external service provider monitoring', riskLevel: 'medium' },
                { value: 1, label: 'Basic monitoring', description: 'Some third-party monitoring', riskLevel: 'low' },
                { value: 2, label: 'Good monitoring', description: 'Systematic supplier monitoring', riskLevel: 'low' },
                { value: 3, label: 'Excellent monitoring', description: 'Comprehensive supply chain monitoring', riskLevel: 'low' }
              ]
            },
            {
              id: 'nist.de.cm.9',
              text: 'Are computing hardware, software, and data monitored for adverse events?',
              guidance: 'Monitor computing hardware, software, runtime environments, and data for indicators of compromise and adverse events.',
              priority: 'high',
              references: ['DE.CM-09'],
              examples: [
                'Endpoint detection and response',
                'System monitoring tools',
                'Application monitoring',
                'Data integrity monitoring'
              ],
              options: [
                { value: 0, label: 'Not monitored', description: 'No system and data monitoring', riskLevel: 'high' },
                { value: 1, label: 'Basic monitoring', description: 'Some system monitoring exists', riskLevel: 'medium' },
                { value: 2, label: 'Good monitoring', description: 'Comprehensive system and data monitoring', riskLevel: 'low' },
                { value: 3, label: 'Excellent monitoring', description: 'Advanced EDR with automated response', riskLevel: 'low' }
              ]
            }
          ]
        },
        {
          id: 'adverse-event-analysis',
          name: 'Adverse Event Analysis (DE.AE)',
          description: 'Anomalies, indicators of compromise, and other potentially adverse events are analyzed to characterize the events and detect cybersecurity incidents',
          weight: 40,
          questions: [
            {
              id: 'nist.de.ae.2',
              text: 'Are potentially adverse events analyzed to understand associated activities?',
              guidance: 'Analyze potentially adverse events to better understand the nature, scope, and associated activities of security incidents.',
              priority: 'high',
              references: ['DE.AE-02'],
              examples: [
                'Security event analysis',
                'Incident investigation procedures',
                'Forensic analysis capabilities',
                'Event correlation systems'
              ],
              options: [
                { value: 0, label: 'Not analyzed', description: 'No systematic event analysis', riskLevel: 'high' },
                { value: 1, label: 'Basic analysis', description: 'Some event analysis performed', riskLevel: 'medium' },
                { value: 2, label: 'Good analysis', description: 'Systematic event analysis process', riskLevel: 'low' },
                { value: 3, label: 'Excellent analysis', description: 'Advanced automated event analysis', riskLevel: 'low' }
              ]
            },
            {
              id: 'nist.de.ae.3',
              text: 'Is information correlated from multiple sources?',
              guidance: 'Correlate information from multiple monitoring sources to provide comprehensive situational awareness.',
              priority: 'medium',
              references: ['DE.AE-03'],
              examples: [
                'SIEM correlation rules',
                'Multi-source data fusion',
                'Cross-platform analytics',
                'Centralized analysis platforms'
              ],
              options: [
                { value: 0, label: 'Not correlated', description: 'No information correlation from multiple sources', riskLevel: 'medium' },
                { value: 1, label: 'Basic correlation', description: 'Some information correlation exists', riskLevel: 'low' },
                { value: 2, label: 'Good correlation', description: 'Systematic multi-source correlation', riskLevel: 'low' },
                { value: 3, label: 'Excellent correlation', description: 'Advanced correlation with machine learning', riskLevel: 'low' }
              ]
            },
            {
              id: 'nist.de.ae.4',
              text: 'Is the estimated impact and scope of adverse events understood?',
              guidance: 'Assess and understand the estimated impact and scope of detected adverse events to inform response decisions.',
              priority: 'high',
              references: ['DE.AE-04'],
              examples: [
                'Impact assessment procedures',
                'Scope analysis methods',
                'Business impact evaluation',
                'Risk assessment integration'
              ],
              options: [
                { value: 0, label: 'Not understood', description: 'No impact or scope assessment', riskLevel: 'high' },
                { value: 1, label: 'Basic understanding', description: 'Some impact assessment performed', riskLevel: 'medium' },
                { value: 2, label: 'Good understanding', description: 'Systematic impact and scope assessment', riskLevel: 'low' },
                { value: 3, label: 'Excellent understanding', description: 'Advanced impact analysis with automation', riskLevel: 'low' }
              ]
            },
            {
              id: 'nist.de.ae.6',
              text: 'Is information on adverse events provided to authorized staff and tools?',
              guidance: 'Ensure relevant information about adverse events is provided to authorized personnel and automated tools for action.',
              priority: 'medium',
              references: ['DE.AE-06'],
              examples: [
                'Incident notification systems',
                'Alert distribution mechanisms',
                'Information sharing protocols',
                'Automated tool integration'
              ],
              options: [
                { value: 0, label: 'Not provided', description: 'No systematic information sharing', riskLevel: 'medium' },
                { value: 1, label: 'Basic provision', description: 'Some information sharing exists', riskLevel: 'low' },
                { value: 2, label: 'Good provision', description: 'Systematic information sharing to authorized parties', riskLevel: 'low' },
                { value: 3, label: 'Excellent provision', description: 'Advanced automated information sharing', riskLevel: 'low' }
              ]
            },
            {
              id: 'nist.de.ae.7',
              text: 'Are cyber threat intelligence and contextual information integrated into analysis?',
              guidance: 'Integrate cyber threat intelligence and other contextual information to enhance the analysis of detected events.',
              priority: 'medium',
              references: ['DE.AE-07'],
              examples: [
                'Threat intelligence integration',
                'Contextual analysis systems',
                'Intelligence-driven analytics',
                'Threat hunting programs'
              ],
              options: [
                { value: 0, label: 'Not integrated', description: 'No threat intelligence integration', riskLevel: 'medium' },
                { value: 1, label: 'Basic integration', description: 'Some threat intelligence used', riskLevel: 'low' },
                { value: 2, label: 'Good integration', description: 'Systematic threat intelligence integration', riskLevel: 'low' },
                { value: 3, label: 'Excellent integration', description: 'Advanced intelligence-driven analysis', riskLevel: 'low' }
              ]
            },
            {
              id: 'nist.de.ae.8',
              text: 'Are incidents declared when adverse events meet defined criteria?',
              guidance: 'Establish clear criteria for declaring incidents and ensure incidents are declared when adverse events meet those criteria.',
              priority: 'high',
              references: ['DE.AE-08'],
              examples: [
                'Incident declaration criteria',
                'Decision-making frameworks',
                'Escalation procedures',
                'Incident classification systems'
              ],
              options: [
                { value: 0, label: 'No criteria', description: 'No defined incident declaration criteria', riskLevel: 'high' },
                { value: 1, label: 'Basic criteria', description: 'Some incident criteria exist', riskLevel: 'medium' },
                { value: 2, label: 'Good criteria', description: 'Clear incident declaration criteria and process', riskLevel: 'low' },
                { value: 3, label: 'Excellent criteria', description: 'Advanced automated incident declaration', riskLevel: 'low' }
              ]
            }
          ]
        }
      ]
    },
    {
      id: 'respond',
      name: 'Respond (RS)',
      description: 'Actions regarding a detected cybersecurity incident are taken',
      weight: 10,
      priority: 'medium',
      estimatedTime: 25,
      categories: [
        {
          id: 'incident-management',
          name: 'Incident Management (RS.MA)',
          description: 'Responses to detected cybersecurity incidents are managed',
          weight: 40,
          questions: [
            {
              id: 'nist.rs.ma.1',
              text: 'Is the incident response plan executed in coordination with relevant third parties?',
              guidance: 'Execute the incident response plan in coordination with relevant third parties once an incident is declared.',
              priority: 'high',
              references: ['RS.MA-01'],
              examples: [
                'Incident response plan activation',
                'Third-party coordination procedures',
                'Response team mobilization',
                'Communication protocols'
              ],
              options: [
                { value: 0, label: 'No plan execution', description: 'No systematic incident response plan execution', riskLevel: 'high' },
                { value: 1, label: 'Basic execution', description: 'Some incident response activities', riskLevel: 'medium' },
                { value: 2, label: 'Good execution', description: 'Systematic plan execution with coordination', riskLevel: 'low' },
                { value: 3, label: 'Excellent execution', description: 'Advanced coordinated incident response', riskLevel: 'low' }
              ]
            },
            {
              id: 'nist.rs.ma.2',
              text: 'Are incident reports triaged and validated?',
              guidance: 'Implement processes to triage and validate incident reports to ensure appropriate response prioritization.',
              priority: 'high',
              references: ['RS.MA-02'],
              examples: [
                'Incident triage procedures',
                'Validation criteria and processes',
                'Priority classification systems',
                'Quality assurance measures'
              ],
              options: [
                { value: 0, label: 'Not triaged', description: 'No incident triage or validation process', riskLevel: 'medium' },
                { value: 1, label: 'Basic triage', description: 'Some incident triage exists', riskLevel: 'low' },
                { value: 2, label: 'Good triage', description: 'Systematic triage and validation process', riskLevel: 'low' },
                { value: 3, label: 'Excellent triage', description: 'Advanced automated triage with validation', riskLevel: 'low' }
              ]
            },
            {
              id: 'nist.rs.ma.3',
              text: 'Are incidents categorized and prioritized?',
              guidance: 'Categorize and prioritize incidents based on their severity, impact, and organizational risk to guide response efforts.',
              priority: 'high',
              references: ['RS.MA-03'],
              examples: [
                'Incident categorization schemes',
                'Priority classification systems',
                'Severity assessment criteria',
                'Risk-based prioritization'
              ],
              options: [
                { value: 0, label: 'Not categorized', description: 'No incident categorization or prioritization', riskLevel: 'medium' },
                { value: 1, label: 'Basic categorization', description: 'Some incident categorization exists', riskLevel: 'low' },
                { value: 2, label: 'Good categorization', description: 'Systematic categorization and prioritization', riskLevel: 'low' },
                { value: 3, label: 'Excellent categorization', description: 'Advanced automated categorization', riskLevel: 'low' }
              ]
            },
            {
              id: 'nist.rs.ma.4',
              text: 'Are incidents escalated or elevated as needed?',
              guidance: 'Implement escalation procedures to ensure incidents are elevated to appropriate levels of management and expertise.',
              priority: 'medium',
              references: ['RS.MA-04'],
              examples: [
                'Escalation procedures',
                'Decision-making criteria',
                'Management notification systems',
                'Expert team activation'
              ],
              options: [
                { value: 0, label: 'No escalation', description: 'No incident escalation procedures', riskLevel: 'medium' },
                { value: 1, label: 'Basic escalation', description: 'Some escalation procedures exist', riskLevel: 'low' },
                { value: 2, label: 'Good escalation', description: 'Clear escalation procedures and criteria', riskLevel: 'low' },
                { value: 3, label: 'Excellent escalation', description: 'Advanced automated escalation systems', riskLevel: 'low' }
              ]
            },
            {
              id: 'nist.rs.ma.5',
              text: 'Are criteria for initiating incident recovery applied?',
              guidance: 'Apply established criteria to determine when to initiate incident recovery activities.',
              priority: 'medium',
              references: ['RS.MA-05'],
              examples: [
                'Recovery initiation criteria',
                'Decision-making frameworks',
                'Readiness assessments',
                'Transition procedures'
              ],
              options: [
                { value: 0, label: 'No criteria', description: 'No criteria for recovery initiation', riskLevel: 'medium' },
                { value: 1, label: 'Basic criteria', description: 'Some recovery criteria exist', riskLevel: 'low' },
                { value: 2, label: 'Good criteria', description: 'Clear recovery initiation criteria', riskLevel: 'low' },
                { value: 3, label: 'Excellent criteria', description: 'Advanced automated recovery triggers', riskLevel: 'low' }
              ]
            }
          ]
        },
        {
          id: 'incident-analysis',
          name: 'Incident Analysis (RS.AN)',
          description: 'Investigations are conducted to ensure effective response and support forensics and recovery activities',
          weight: 30,
          questions: [
            {
              id: 'nist.rs.an.3',
              text: 'Is analysis performed to establish what occurred during an incident?',
              guidance: 'Conduct thorough analysis to establish what took place during an incident and determine the root cause.',
              priority: 'high',
              references: ['RS.AN-03'],
              examples: [
                'Forensic analysis procedures',
                'Root cause analysis methods',
                'Timeline reconstruction',
                'Evidence collection and analysis'
              ],
              options: [
                { value: 0, label: 'No analysis', description: 'No systematic incident analysis', riskLevel: 'medium' },
                { value: 1, label: 'Basic analysis', description: 'Some incident analysis performed', riskLevel: 'low' },
                { value: 2, label: 'Good analysis', description: 'Thorough incident analysis with root cause', riskLevel: 'low' },
                { value: 3, label: 'Excellent analysis', description: 'Advanced forensic analysis capabilities', riskLevel: 'low' }
              ]
            },
            {
              id: 'nist.rs.an.6',
              text: 'Are investigation actions recorded with integrity and provenance preserved?',
              guidance: 'Record all investigation actions while preserving the integrity and provenance of the records.',
              priority: 'medium',
              references: ['RS.AN-06'],
              examples: [
                'Investigation documentation procedures',
                'Chain of custody processes',
                'Digital evidence preservation',
                'Audit trail maintenance'
              ],
              options: [
                { value: 0, label: 'Not recorded', description: 'Investigation actions not systematically recorded', riskLevel: 'medium' },
                { value: 1, label: 'Basic recording', description: 'Some investigation documentation', riskLevel: 'low' },
                { value: 2, label: 'Good recording', description: 'Systematic documentation with integrity', riskLevel: 'low' },
                { value: 3, label: 'Excellent recording', description: 'Advanced automated documentation systems', riskLevel: 'low' }
              ]
            },
            {
              id: 'nist.rs.an.7',
              text: 'Are incident data and metadata collected with integrity preserved?',
              guidance: 'Collect incident data and metadata while preserving their integrity and provenance for analysis and legal purposes.',
              priority: 'medium',
              references: ['RS.AN-07'],
              examples: [
                'Data collection procedures',
                'Evidence preservation methods',
                'Metadata documentation',
                'Forensic imaging techniques'
              ],
              options: [
                { value: 0, label: 'Not collected', description: 'No systematic data collection', riskLevel: 'medium' },
                { value: 1, label: 'Basic collection', description: 'Some data collection performed', riskLevel: 'low' },
                { value: 2, label: 'Good collection', description: 'Systematic data collection with integrity', riskLevel: 'low' },
                { value: 3, label: 'Excellent collection', description: 'Advanced automated evidence collection', riskLevel: 'low' }
              ]
            },
            {
              id: 'nist.rs.an.8',
              text: 'Is an incident\'s magnitude estimated and validated?',
              guidance: 'Estimate and validate the magnitude of incidents to understand their full scope and impact.',
              priority: 'medium',
              references: ['RS.AN-08'],
              examples: [
                'Impact assessment procedures',
                'Magnitude estimation methods',
                'Validation techniques',
                'Scope analysis frameworks'
              ],
              options: [
                { value: 0, label: 'Not estimated', description: 'No magnitude estimation performed', riskLevel: 'medium' },
                { value: 1, label: 'Basic estimation', description: 'Some magnitude assessment', riskLevel: 'low' },
                { value: 2, label: 'Good estimation', description: 'Systematic magnitude estimation and validation', riskLevel: 'low' },
                { value: 3, label: 'Excellent estimation', description: 'Advanced automated impact analysis', riskLevel: 'low' }
              ]
            }
          ]
        },
        {
          id: 'incident-communication',
          name: 'Incident Response Reporting and Communication (RS.CO)',
          description: 'Response activities are coordinated with internal and external stakeholders as required by laws, regulations, or policies',
          weight: 20,
          questions: [
            {
              id: 'nist.rs.co.2',
              text: 'Are internal and external stakeholders notified of incidents?',
              guidance: 'Notify appropriate internal and external stakeholders of incidents according to legal, regulatory, and policy requirements.',
              priority: 'high',
              references: ['RS.CO-02'],
              examples: [
                'Notification procedures',
                'Stakeholder contact lists',
                'Communication templates',
                'Regulatory reporting requirements'
              ],
              options: [
                { value: 0, label: 'Not notified', description: 'No stakeholder notification process', riskLevel: 'high' },
                { value: 1, label: 'Basic notification', description: 'Some stakeholder notification exists', riskLevel: 'medium' },
                { value: 2, label: 'Good notification', description: 'Systematic stakeholder notification process', riskLevel: 'low' },
                { value: 3, label: 'Excellent notification', description: 'Advanced automated notification systems', riskLevel: 'low' }
              ]
            },
            {
              id: 'nist.rs.co.3',
              text: 'Is information shared with designated internal and external stakeholders?',
              guidance: 'Share relevant incident information with designated internal and external stakeholders as appropriate.',
              priority: 'medium',
              references: ['RS.CO-03'],
              examples: [
                'Information sharing protocols',
                'Stakeholder communication plans',
                'Data sharing agreements',
                'Confidentiality considerations'
              ],
              options: [
                { value: 0, label: 'Not shared', description: 'No systematic information sharing', riskLevel: 'medium' },
                { value: 1, label: 'Basic sharing', description: 'Some information sharing exists', riskLevel: 'low' },
                { value: 2, label: 'Good sharing', description: 'Systematic information sharing with stakeholders', riskLevel: 'low' },
                { value: 3, label: 'Excellent sharing', description: 'Advanced secure information sharing systems', riskLevel: 'low' }
              ]
            }
          ]
        },
        {
          id: 'incident-mitigation',
          name: 'Incident Mitigation (RS.MI)',
          description: 'Activities are performed to prevent expansion of an event and mitigate its effects',
          weight: 10,
          questions: [
            {
              id: 'nist.rs.mi.1',
              text: 'Are incidents contained?',
              guidance: 'Implement containment activities to prevent incidents from spreading and causing additional damage.',
              priority: 'high',
              references: ['RS.MI-01'],
              examples: [
                'Containment procedures',
                'System isolation techniques',
                'Network segmentation',
                'Quarantine mechanisms'
              ],
              options: [
                { value: 0, label: 'Not contained', description: 'No incident containment capabilities', riskLevel: 'high' },
                { value: 1, label: 'Basic containment', description: 'Some containment procedures exist', riskLevel: 'medium' },
                { value: 2, label: 'Good containment', description: 'Systematic incident containment process', riskLevel: 'low' },
                { value: 3, label: 'Excellent containment', description: 'Advanced automated containment systems', riskLevel: 'low' }
              ]
            },
            {
              id: 'nist.rs.mi.2',
              text: 'Are incidents eradicated?',
              guidance: 'Implement eradication activities to eliminate the root cause of incidents and prevent recurrence.',
              priority: 'high',
              references: ['RS.MI-02'],
              examples: [
                'Eradication procedures',
                'Malware removal techniques',
                'Vulnerability remediation',
                'System cleaning processes'
              ],
              options: [
                { value: 0, label: 'Not eradicated', description: 'No incident eradication capabilities', riskLevel: 'high' },
                { value: 1, label: 'Basic eradication', description: 'Some eradication procedures exist', riskLevel: 'medium' },
                { value: 2, label: 'Good eradication', description: 'Systematic incident eradication process', riskLevel: 'low' },
                { value: 3, label: 'Excellent eradication', description: 'Advanced automated eradication systems', riskLevel: 'low' }
              ]
            }
          ]
        }
      ]
    },
    {
      id: 'recover',
      name: 'Recover (RC)',
      description: 'Assets and operations affected by a cybersecurity incident are restored',
      weight: 10,
      priority: 'low',
      estimatedTime: 20,
      categories: [
        {
          id: 'recovery-planning',
          name: 'Incident Recovery Plan Execution (RC.RP)',
          description: 'Restoration activities are performed to ensure operational availability of systems and services affected by cybersecurity incidents',
          weight: 70,
          questions: [
            {
              id: 'nist.rc.rp.1',
              text: 'Is the recovery portion of the incident response plan executed?',
              guidance: 'Execute the recovery portion of the incident response plan once initiated from the incident response process.',
              priority: 'high',
              references: ['RC.RP-01'],
              examples: [
                'Recovery plan activation',
                'Recovery team mobilization',
                'Recovery procedure execution',
                'Progress monitoring'
              ],
              options: [
                { value: 0, label: 'Not executed', description: 'No systematic recovery plan execution', riskLevel: 'high' },
                { value: 1, label: 'Basic execution', description: 'Some recovery activities performed', riskLevel: 'medium' },
                { value: 2, label: 'Good execution', description: 'Systematic recovery plan execution', riskLevel: 'low' },
                { value: 3, label: 'Excellent execution', description: 'Advanced automated recovery execution', riskLevel: 'low' }
              ]
            },
            {
              id: 'nist.rc.rp.2',
              text: 'Are recovery actions selected, scoped, prioritized, and performed?',
              guidance: 'Select, scope, prioritize, and perform recovery actions based on incident impact and organizational priorities.',
              priority: 'high',
              references: ['RC.RP-02'],
              examples: [
                'Recovery action selection criteria',
                'Prioritization frameworks',
                'Scope definition procedures',
                'Performance monitoring'
              ],
              options: [
                { value: 0, label: 'Not managed', description: 'No systematic recovery action management', riskLevel: 'medium' },
                { value: 1, label: 'Basic management', description: 'Some recovery action planning', riskLevel: 'low' },
                { value: 2, label: 'Good management', description: 'Systematic recovery action management', riskLevel: 'low' },
                { value: 3, label: 'Excellent management', description: 'Advanced recovery optimization', riskLevel: 'low' }
              ]
            },
            {
              id: 'nist.rc.rp.3',
              text: 'Is the integrity of backups and restoration assets verified before use?',
              guidance: 'Verify the integrity of backups and other restoration assets before using them for recovery purposes.',
              priority: 'high',
              references: ['RC.RP-03'],
              examples: [
                'Backup integrity verification',
                'Asset validation procedures',
                'Integrity checking tools',
                'Verification documentation'
              ],
              options: [
                { value: 0, label: 'Not verified', description: 'No backup integrity verification', riskLevel: 'high' },
                { value: 1, label: 'Basic verification', description: 'Some backup verification performed', riskLevel: 'medium' },
                { value: 2, label: 'Good verification', description: 'Systematic backup integrity verification', riskLevel: 'low' },
                { value: 3, label: 'Excellent verification', description: 'Advanced automated integrity verification', riskLevel: 'low' }
              ]
            },
            {
              id: 'nist.rc.rp.4',
              text: 'Are critical functions and cybersecurity risk management considered for post-incident operations?',
              guidance: 'Consider critical mission functions and cybersecurity risk management when establishing post-incident operational norms.',
              priority: 'medium',
              references: ['RC.RP-04'],
              examples: [
                'Critical function assessment',
                'Risk management integration',
                'Operational norm establishment',
                'Business continuity planning'
              ],
              options: [
                { value: 0, label: 'Not considered', description: 'No consideration of critical functions in recovery', riskLevel: 'medium' },
                { value: 1, label: 'Basic consideration', description: 'Some critical function consideration', riskLevel: 'low' },
                { value: 2, label: 'Good consideration', description: 'Systematic consideration of critical functions', riskLevel: 'low' },
                { value: 3, label: 'Excellent consideration', description: 'Comprehensive critical function integration', riskLevel: 'low' }
              ]
            },
            {
              id: 'nist.rc.rp.5',
              text: 'Is the integrity of restored assets verified and normal status confirmed?',
              guidance: 'Verify the integrity of restored assets, restore systems and services, and confirm normal operating status.',
              priority: 'high',
              references: ['RC.RP-05'],
              examples: [
                'Asset integrity verification',
                'System restoration procedures',
                'Service restoration processes',
                'Status confirmation methods'
              ],
              options: [
                { value: 0, label: 'Not verified', description: 'No restoration verification process', riskLevel: 'medium' },
                { value: 1, label: 'Basic verification', description: 'Some restoration verification', riskLevel: 'low' },
                { value: 2, label: 'Good verification', description: 'Systematic restoration verification', riskLevel: 'low' },
                { value: 3, label: 'Excellent verification', description: 'Advanced automated restoration verification', riskLevel: 'low' }
              ]
            },
            {
              id: 'nist.rc.rp.6',
              text: 'Is the end of incident recovery declared and documentation completed?',
              guidance: 'Declare the end of incident recovery based on established criteria and complete all incident-related documentation.',
              priority: 'medium',
              references: ['RC.RP-06'],
              examples: [
                'Recovery completion criteria',
                'End-of-recovery declaration',
                'Documentation completion',
                'Lessons learned capture'
              ],
              options: [
                { value: 0, label: 'Not declared', description: 'No formal end of recovery process', riskLevel: 'low' },
                { value: 1, label: 'Basic declaration', description: 'Some recovery completion process', riskLevel: 'low' },
                { value: 2, label: 'Good declaration', description: 'Systematic recovery completion and documentation', riskLevel: 'low' },
                { value: 3, label: 'Excellent declaration', description: 'Comprehensive recovery closure process', riskLevel: 'low' }
              ]
            }
          ]
        },
        {
          id: 'recovery-communication',
          name: 'Incident Recovery Communication (RC.CO)',
          description: 'Restoration activities are coordinated with internal and external parties',
          weight: 30,
          questions: [
            {
              id: 'nist.rc.co.3',
              text: 'Are recovery activities and progress communicated to stakeholders?',
              guidance: 'Communicate recovery activities and progress in restoring operational capabilities to designated internal and external stakeholders.',
              priority: 'medium',
              references: ['RC.CO-03'],
              examples: [
                'Recovery communication plans',
                'Progress reporting procedures',
                'Stakeholder updates',
                'Status dashboards'
              ],
              options: [
                { value: 0, label: 'Not communicated', description: 'No recovery communication process', riskLevel: 'low' },
                { value: 1, label: 'Basic communication', description: 'Some recovery communication exists', riskLevel: 'low' },
                { value: 2, label: 'Good communication', description: 'Systematic recovery communication', riskLevel: 'low' },
                { value: 3, label: 'Excellent communication', description: 'Advanced recovery communication systems', riskLevel: 'low' }
              ]
            },
            {
              id: 'nist.rc.co.4',
              text: 'Are public updates on incident recovery shared using approved methods?',
              guidance: 'Share public updates on incident recovery using approved methods and messaging when appropriate.',
              priority: 'low',
              references: ['RC.CO-04'],
              examples: [
                'Public communication procedures',
                'Approved messaging templates',
                'Media relations protocols',
                'Public notification systems'
              ],
              options: [
                { value: 0, label: 'Not shared', description: 'No public recovery communication', riskLevel: 'low' },
                { value: 1, label: 'Basic sharing', description: 'Some public communication capability', riskLevel: 'low' },
                { value: 2, label: 'Good sharing', description: 'Systematic public recovery communication', riskLevel: 'low' },
                { value: 3, label: 'Excellent sharing', description: 'Comprehensive public communication program', riskLevel: 'low' }
              ]
            }
          ]
        }
      ]
    }
  ]
};