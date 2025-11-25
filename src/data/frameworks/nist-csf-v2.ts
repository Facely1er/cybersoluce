import { Framework } from '../../types/ermits';

export const nistCSFv2Framework: Framework = {
  id: 'nist-csf-v2',
  name: 'NIST Cybersecurity Framework v2.0',
  description: 'The NIST Cybersecurity Framework provides a policy framework of computer security guidance for how organizations can assess and improve their ability to prevent, detect, and respond to cyber attacks.',
  version: '2.0',
  complexity: 'intermediate',
  estimatedTime: 180,
  industry: ['All Industries', 'Critical Infrastructure', 'Government', 'Healthcare', 'Financial Services'],
  lastUpdated: new Date('2024-02-26'),
  maturityLevels: [
    {
      level: 1,
      name: 'Partial',
      description: 'The organization has limited awareness of cybersecurity risk and the need for cybersecurity risk management.',
      color: '#ef4444',
      minScore: 0,
      maxScore: 25,
      characteristics: ['Ad hoc processes', 'Limited documentation', 'Reactive approach'],
      typicalOrganizations: ['Small organizations', 'Early-stage companies'],
      nextSteps: ['Establish basic cybersecurity policies', 'Identify critical assets']
    },
    {
      level: 2,
      name: 'Risk Informed',
      description: 'The organization is aware of cybersecurity risk and has established basic cybersecurity risk management practices.',
      color: '#f97316',
      minScore: 26,
      maxScore: 50,
      characteristics: ['Documented processes', 'Risk-based decisions', 'Basic controls'],
      typicalOrganizations: ['Growing companies', 'Organizations with basic IT'],
      nextSteps: ['Implement comprehensive controls', 'Establish monitoring']
    },
    {
      level: 3,
      name: 'Repeatable',
      description: 'The organization has established, documented cybersecurity risk management practices that are regularly updated.',
      color: '#eab308',
      minScore: 51,
      maxScore: 75,
      characteristics: ['Regular processes', 'Continuous improvement', 'Comprehensive controls'],
      typicalOrganizations: ['Mature organizations', 'Regulated industries'],
      nextSteps: ['Optimize processes', 'Advanced threat detection']
    },
    {
      level: 4,
      name: 'Adaptive',
      description: 'The organization adapts its cybersecurity practices based on lessons learned and predictive indicators.',
      color: '#22c55e',
      minScore: 76,
      maxScore: 100,
      characteristics: ['Adaptive processes', 'Predictive capabilities', 'Innovation'],
      typicalOrganizations: ['Advanced organizations', 'Security leaders'],
      nextSteps: ['Industry leadership', 'Threat intelligence sharing']
    }
  ],
  sections: [
    {
      id: 'govern',
      name: 'Govern',
      description: 'The organizational cybersecurity governance and risk management strategy, expectations, and policies.',
      weight: 20,
      priority: 'high',
      estimatedTime: 35,
      categories: [
        {
          id: 'gv-oc',
          name: 'Organizational Context',
          description: 'The organization establishes and communicates its cybersecurity strategy, expectations, and policies.',
          weight: 25,
          questions: [
            {
              id: 'gv.oc-01',
              text: 'Organizational cybersecurity strategy is established and communicated',
              guidance: 'The organization should have a documented cybersecurity strategy that aligns with business objectives and is communicated to all stakeholders.',
              priority: 'high',
              references: ['NIST CSF 2.0 GV.OC-01'],
              examples: [
                'Formal cybersecurity strategy document approved by executive leadership',
                'Regular communication of cybersecurity objectives to all employees',
                'Integration of cybersecurity considerations into business planning'
              ],
              options: [
                {
                  value: 0,
                  label: 'Not Implemented',
                  description: 'No cybersecurity strategy exists or is documented',
                  riskLevel: 'critical',
                  recommendedActions: ['Develop cybersecurity strategy', 'Engage executive leadership']
                },
                {
                  value: 1,
                  label: 'Partially Implemented',
                  description: 'Basic cybersecurity strategy exists but is not well communicated',
                  riskLevel: 'high',
                  recommendedActions: ['Formalize strategy documentation', 'Improve communication']
                },
                {
                  value: 2,
                  label: 'Largely Implemented',
                  description: 'Cybersecurity strategy is documented and communicated',
                  riskLevel: 'medium',
                  recommendedActions: ['Regular strategy reviews', 'Stakeholder feedback']
                },
                {
                  value: 3,
                  label: 'Fully Implemented',
                  description: 'Comprehensive strategy with regular updates and communication',
                  riskLevel: 'low',
                  recommendedActions: ['Continuous improvement', 'Industry benchmarking']
                }
              ]
            },
            {
              id: 'gv.oc-02',
              text: 'Cybersecurity roles and responsibilities are established and communicated',
              guidance: 'Clear roles and responsibilities for cybersecurity should be defined and communicated throughout the organization.',
              priority: 'high',
              references: ['NIST CSF 2.0 GV.OC-02'],
              examples: [
                'RACI matrix for cybersecurity responsibilities',
                'Job descriptions include cybersecurity duties',
                'Clear escalation paths for security incidents'
              ],
              options: [
                {
                  value: 0,
                  label: 'Not Implemented',
                  description: 'Cybersecurity roles and responsibilities are not defined',
                  riskLevel: 'critical'
                },
                {
                  value: 1,
                  label: 'Partially Implemented',
                  description: 'Some roles defined but not comprehensive or well communicated',
                  riskLevel: 'high'
                },
                {
                  value: 2,
                  label: 'Largely Implemented',
                  description: 'Most roles defined and communicated',
                  riskLevel: 'medium'
                },
                {
                  value: 3,
                  label: 'Fully Implemented',
                  description: 'Comprehensive roles with clear accountability',
                  riskLevel: 'low'
                }
              ]
            }
          ]
        },
        {
          id: 'gv-rm',
          name: 'Risk Management Strategy',
          description: 'The organization establishes and implements a cybersecurity risk management strategy.',
          weight: 30,
          questions: [
            {
              id: 'gv.rm-01',
              text: 'Risk management processes are established, managed, and agreed to by organizational stakeholders',
              guidance: 'Risk management processes should be formally established and have stakeholder buy-in.',
              priority: 'high',
              options: [
                { value: 0, label: 'Not Implemented', description: 'No formal risk management processes' },
                { value: 1, label: 'Partially Implemented', description: 'Basic processes exist but lack stakeholder agreement' },
                { value: 2, label: 'Largely Implemented', description: 'Processes established with most stakeholder agreement' },
                { value: 3, label: 'Fully Implemented', description: 'Comprehensive processes with full stakeholder support' }
              ]
            }
          ]
        }
      ]
    },
    {
      id: 'identify',
      name: 'Identify',
      description: 'Develop an organizational understanding to manage cybersecurity risk to systems, people, assets, data, and capabilities.',
      weight: 20,
      priority: 'high',
      estimatedTime: 40,
      categories: [
        {
          id: 'id-am',
          name: 'Asset Management',
          description: 'The data, personnel, devices, systems, and facilities that enable the organization to achieve business purposes are identified and managed.',
          weight: 40,
          questions: [
            {
              id: 'id.am-01',
              text: 'Physical devices and systems within the organization are inventoried',
              guidance: 'Maintain an accurate, up-to-date inventory of all physical devices and systems.',
              priority: 'high',
              references: ['NIST CSF 2.0 ID.AM-01'],
              examples: [
                'Automated network discovery tools',
                'Asset management database with real-time updates',
                'Regular physical asset audits'
              ],
              options: [
                { value: 0, label: 'Not Implemented', description: 'No asset inventory exists', riskLevel: 'critical' },
                { value: 1, label: 'Partially Implemented', description: 'Basic inventory exists but is incomplete', riskLevel: 'high' },
                { value: 2, label: 'Largely Implemented', description: 'Comprehensive inventory with regular updates', riskLevel: 'medium' },
                { value: 3, label: 'Fully Implemented', description: 'Real-time automated asset management', riskLevel: 'low' }
              ]
            },
            {
              id: 'id.am-02',
              text: 'Software platforms and applications within the organization are inventoried',
              guidance: 'Maintain comprehensive inventory of all software assets including licenses and versions.',
              priority: 'high',
              options: [
                { value: 0, label: 'Not Implemented', description: 'No software inventory' },
                { value: 1, label: 'Partially Implemented', description: 'Basic software tracking' },
                { value: 2, label: 'Largely Implemented', description: 'Comprehensive software inventory' },
                { value: 3, label: 'Fully Implemented', description: 'Automated software asset management' }
              ]
            }
          ]
        },
        {
          id: 'id-ra',
          name: 'Risk Assessment',
          description: 'The organization understands the cybersecurity risk to organizational operations, organizational assets, and individuals.',
          weight: 35,
          questions: [
            {
              id: 'id.ra-01',
              text: 'Asset vulnerabilities are identified and documented',
              guidance: 'Regularly assess and document vulnerabilities in organizational assets.',
              priority: 'high',
              options: [
                { value: 0, label: 'Not Implemented', description: 'No vulnerability assessments' },
                { value: 1, label: 'Partially Implemented', description: 'Ad-hoc vulnerability scanning' },
                { value: 2, label: 'Largely Implemented', description: 'Regular vulnerability assessments' },
                { value: 3, label: 'Fully Implemented', description: 'Continuous vulnerability management' }
              ]
            }
          ]
        }
      ]
    },
    {
      id: 'protect',
      name: 'Protect',
      description: 'Develop and implement appropriate safeguards to ensure delivery of critical infrastructure services.',
      weight: 25,
      priority: 'high',
      estimatedTime: 45,
      categories: [
        {
          id: 'pr-aa',
          name: 'Identity Management, Authentication and Access Control',
          description: 'Access to physical and logical assets and associated facilities is limited to authorized users, processes, and devices.',
          weight: 35,
          questions: [
            {
              id: 'pr.aa-01',
              text: 'Identities and credentials are issued, managed, verified, revoked, and audited for authorized devices, users and processes',
              guidance: 'Implement comprehensive identity lifecycle management for all users and devices.',
              priority: 'critical',
              references: ['NIST CSF 2.0 PR.AA-01'],
              examples: [
                'Active Directory with automated provisioning/deprovisioning',
                'Multi-factor authentication for all accounts',
                'Regular access reviews and audits'
              ],
              options: [
                { value: 0, label: 'Not Implemented', description: 'No formal identity management', riskLevel: 'critical' },
                { value: 1, label: 'Partially Implemented', description: 'Basic identity management processes', riskLevel: 'high' },
                { value: 2, label: 'Largely Implemented', description: 'Comprehensive identity management', riskLevel: 'medium' },
                { value: 3, label: 'Fully Implemented', description: 'Automated identity lifecycle management', riskLevel: 'low' }
              ]
            }
          ]
        },
        {
          id: 'pr-ds',
          name: 'Data Security',
          description: 'Information and records are managed consistent with the organization\'s risk strategy.',
          weight: 25,
          questions: [
            {
              id: 'pr.ds-01',
              text: 'Data-at-rest is protected',
              guidance: 'Implement appropriate protection for data stored in systems and databases.',
              priority: 'high',
              options: [
                { value: 0, label: 'Not Implemented', description: 'No data-at-rest protection' },
                { value: 1, label: 'Partially Implemented', description: 'Basic encryption for some data' },
                { value: 2, label: 'Largely Implemented', description: 'Comprehensive data encryption' },
                { value: 3, label: 'Fully Implemented', description: 'Advanced encryption with key management' }
              ]
            }
          ]
        }
      ]
    },
    {
      id: 'detect',
      name: 'Detect',
      description: 'Develop and implement appropriate activities to identify the occurrence of a cybersecurity event.',
      weight: 15,
      priority: 'medium',
      estimatedTime: 30,
      categories: [
        {
          id: 'de-cm',
          name: 'Continuous Monitoring',
          description: 'The organization monitors cybersecurity events and verifies the effectiveness of protective measures.',
          weight: 50,
          questions: [
            {
              id: 'de.cm-01',
              text: 'Networks and network communications are monitored to detect potential cybersecurity events',
              guidance: 'Implement network monitoring to identify suspicious activities and potential threats.',
              priority: 'high',
              options: [
                { value: 0, label: 'Not Implemented', description: 'No network monitoring' },
                { value: 1, label: 'Partially Implemented', description: 'Basic network monitoring' },
                { value: 2, label: 'Largely Implemented', description: 'Comprehensive network monitoring' },
                { value: 3, label: 'Fully Implemented', description: 'Advanced threat detection and analytics' }
              ]
            }
          ]
        }
      ]
    },
    {
      id: 'respond',
      name: 'Respond',
      description: 'Develop and implement appropriate activities to take action regarding a detected cybersecurity incident.',
      weight: 10,
      priority: 'medium',
      estimatedTime: 25,
      categories: [
        {
          id: 'rs-rp',
          name: 'Response Planning',
          description: 'Response processes and procedures are executed and maintained.',
          weight: 40,
          questions: [
            {
              id: 'rs.rp-01',
              text: 'Response plan is executed during or after an incident',
              guidance: 'Ensure incident response plans are properly executed when cybersecurity events occur.',
              priority: 'high',
              options: [
                { value: 0, label: 'Not Implemented', description: 'No incident response plan' },
                { value: 1, label: 'Partially Implemented', description: 'Basic response procedures' },
                { value: 2, label: 'Largely Implemented', description: 'Comprehensive response plan' },
                { value: 3, label: 'Fully Implemented', description: 'Tested and optimized response capabilities' }
              ]
            }
          ]
        }
      ]
    },
    {
      id: 'recover',
      name: 'Recover',
      description: 'Develop and implement appropriate activities to maintain plans for resilience and to restore any capabilities or services.',
      weight: 10,
      priority: 'medium',
      estimatedTime: 25,
      categories: [
        {
          id: 'rc-rp',
          name: 'Recovery Planning',
          description: 'Recovery processes and procedures are executed and maintained.',
          weight: 50,
          questions: [
            {
              id: 'rc.rp-01',
              text: 'Recovery plan is executed during or after a cybersecurity incident',
              guidance: 'Establish and maintain recovery plans to restore normal operations after incidents.',
              priority: 'medium',
              options: [
                { value: 0, label: 'Not Implemented', description: 'No recovery plan exists' },
                { value: 1, label: 'Partially Implemented', description: 'Basic recovery procedures' },
                { value: 2, label: 'Largely Implemented', description: 'Comprehensive recovery plan' },
                { value: 3, label: 'Fully Implemented', description: 'Tested recovery capabilities with RTO/RPO' }
              ]
            }
          ]
        }
      ]
    }
  ]
};

export default nistCSFv2Framework;

