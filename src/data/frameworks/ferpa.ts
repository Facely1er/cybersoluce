import { Framework } from '../../types';

export const ferpaFramework: Framework = {
  id: 'ferpa',
  name: 'FERPA (Family Educational Rights and Privacy Act)',
  description: 'Federal law that protects the privacy of student education records and gives parents certain rights with respect to their children\'s education records',
  version: '2012',
  complexity: 'intermediate',
  estimatedTime: 75,
  industry: ['Education', 'K-12 Schools', 'Higher Education', 'Educational Technology'],
  prerequisites: ['Understanding of education privacy laws', 'Familiarity with student data requirements'],
  certificationBody: 'ED',
  lastUpdated: new Date('2012-01-03'),
  relatedFrameworks: ['COPPA', 'PPRA', 'State Privacy Laws'],
  applicableRegulations: ['FERPA', 'COPPA', 'State Privacy Laws'],
  maturityLevels: [
    { level: 1, name: 'Basic Compliance', description: 'Minimal FERPA compliance with basic privacy protections', color: '#ef4444', minScore: 0, maxScore: 25 },
    { level: 2, name: 'Standard Implementation', description: 'Standard FERPA implementation with documented procedures', color: '#f97316', minScore: 26, maxScore: 50 },
    { level: 3, name: 'Comprehensive Program', description: 'Comprehensive FERPA program with proactive privacy management', color: '#eab308', minScore: 51, maxScore: 75 },
    { level: 4, name: 'Advanced Privacy Governance', description: 'Advanced student privacy governance with continuous improvement', color: '#22c55e', minScore: 76, maxScore: 100 }
  ],
  sections: [
    {
      id: 'access-rights',
      name: 'Student and Parent Access Rights',
      description: 'Rights of students and parents to access and review education records',
      weight: 25,
      priority: 'high',
      categories: [
        {
          id: 'record-access',
          name: 'Education Record Access',
          description: 'Procedures for providing access to education records',
          weight: 60,
          questions: [
            {
              id: 'ferpa.access.records.1',
              text: 'Do you have procedures to provide students and eligible parents access to education records within 45 days of request?',
              guidance: 'FERPA requires educational institutions to provide students and parents access to education records within 45 days of receiving a request. This includes the right to inspect and review records.',
              priority: 'high',
              references: ['34 CFR 99.10'],
              examples: ['Record access request forms', 'Response procedures', 'Access scheduling systems', 'Record review policies'],
              options: [
                { value: 0, label: 'No access procedures', description: 'No formal procedures for providing record access' },
                { value: 1, label: 'Informal access process', description: 'Ad hoc process without documented procedures' },
                { value: 2, label: 'Documented access procedures', description: 'Formal procedures with reasonable response times' },
                { value: 3, label: 'Streamlined access system', description: 'Efficient system with tracking and timely responses within 45 days' }
              ]
            },
            {
              id: 'ferpa.access.records.2',
              text: 'Do you provide students and parents the right to request amendment of education records they believe are inaccurate?',
              guidance: 'Students and parents have the right to request amendment of education records that they believe are inaccurate, misleading, or in violation of privacy rights.',
              priority: 'high',
              references: ['34 CFR 99.20'],
              examples: ['Amendment request forms', 'Review procedures', 'Appeal processes', 'Record correction policies'],
              options: [
                { value: 0, label: 'No amendment procedures', description: 'No process for requesting record amendments' },
                { value: 1, label: 'Basic amendment process', description: 'Informal process for record corrections' },
                { value: 2, label: 'Formal amendment procedures', description: 'Documented procedures with review process' },
                { value: 3, label: 'Comprehensive amendment system', description: 'Comprehensive system with appeals process and timely resolution' }
              ]
            }
          ]
        },
        {
          id: 'notification-rights',
          name: 'Annual Notification',
          description: 'Annual notification of FERPA rights to students and parents',
          weight: 40,
          questions: [
            {
              id: 'ferpa.access.notify.1',
              text: 'Do you provide annual notification to students and parents of their FERPA rights?',
              guidance: 'Educational institutions must annually notify students and parents of their rights under FERPA, including the right to inspect records, request amendments, and file complaints.',
              priority: 'high',
              references: ['34 CFR 99.7'],
              examples: ['Annual FERPA notices', 'Student handbooks', 'Website postings', 'Registration materials'],
              options: [
                { value: 0, label: 'No annual notification', description: 'No systematic notification of FERPA rights' },
                { value: 1, label: 'Irregular notification', description: 'Occasional or incomplete notification of rights' },
                { value: 2, label: 'Annual notification provided', description: 'Regular annual notification with basic rights information' },
                { value: 3, label: 'Comprehensive notification program', description: 'Detailed annual notification with multiple communication channels' }
              ]
            }
          ]
        }
      ]
    },
    {
      id: 'disclosure-controls',
      name: 'Disclosure Controls and Consent',
      description: 'Controls and procedures for disclosing education records',
      weight: 30,
      priority: 'high',
      categories: [
        {
          id: 'consent-management',
          name: 'Consent Management',
          description: 'Obtaining and managing consent for education record disclosures',
          weight: 50,
          questions: [
            {
              id: 'ferpa.disclosure.consent.1',
              text: 'Do you obtain written consent before disclosing personally identifiable information from education records?',
              guidance: 'FERPA generally requires written consent from students or parents before disclosing personally identifiable information from education records, except for specific exceptions.',
              priority: 'high',
              references: ['34 CFR 99.30'],
              examples: ['Consent forms', 'Disclosure authorization procedures', 'Consent tracking systems', 'Third-party agreements'],
              options: [
                { value: 0, label: 'No consent procedures', description: 'No systematic approach to obtaining disclosure consent' },
                { value: 1, label: 'Informal consent process', description: 'Ad hoc consent collection without proper documentation' },
                { value: 2, label: 'Documented consent procedures', description: 'Formal consent procedures with proper documentation' },
                { value: 3, label: 'Comprehensive consent management', description: 'Comprehensive consent management system with tracking and audit trails' }
              ]
            },
            {
              id: 'ferpa.disclosure.consent.2',
              text: 'Do you maintain records of all disclosures of education records?',
              guidance: 'Educational institutions must maintain a record of each request for access to and each disclosure of personally identifiable information from education records.',
              priority: 'high',
              references: ['34 CFR 99.32'],
              examples: ['Disclosure logs', 'Access tracking systems', 'Third-party disclosure records', 'Audit trails'],
              options: [
                { value: 0, label: 'No disclosure records', description: 'No tracking of education record disclosures' },
                { value: 1, label: 'Basic disclosure tracking', description: 'Some tracking but not comprehensive or systematic' },
                { value: 2, label: 'Systematic disclosure records', description: 'Regular maintenance of disclosure records' },
                { value: 3, label: 'Automated disclosure tracking', description: 'Comprehensive automated tracking with detailed audit trails' }
              ]
            }
          ]
        },
        {
          id: 'legitimate-interests',
          name: 'Legitimate Educational Interests',
          description: 'Defining and managing legitimate educational interests for internal disclosures',
          weight: 50,
          questions: [
            {
              id: 'ferpa.disclosure.interests.1',
              text: 'Have you defined what constitutes "legitimate educational interest" for your institution?',
              guidance: 'Institutions must define legitimate educational interest in their annual notification and ensure that school officials only access records when they have a legitimate educational interest.',
              priority: 'medium',
              references: ['34 CFR 99.31(a)(1)'],
              examples: ['Legitimate interest definitions', 'Role-based access policies', 'Staff training materials', 'Access justification procedures'],
              options: [
                { value: 0, label: 'No definition provided', description: 'No clear definition of legitimate educational interest' },
                { value: 1, label: 'Basic definition exists', description: 'General definition but not well-communicated or enforced' },
                { value: 2, label: 'Clear definition and communication', description: 'Well-defined legitimate interest with staff awareness' },
                { value: 3, label: 'Comprehensive interest framework', description: 'Detailed framework with role-based definitions and regular training' }
              ]
            }
          ]
        }
      ]
    },
    {
      id: 'directory-information',
      name: 'Directory Information Management',
      description: 'Management and disclosure of directory information',
      weight: 20,
      priority: 'medium',
      categories: [
        {
          id: 'directory-designation',
          name: 'Directory Information Designation',
          description: 'Defining and managing directory information categories',
          weight: 100,
          questions: [
            {
              id: 'ferpa.directory.designation.1',
              text: 'Have you clearly defined what information is considered "directory information" at your institution?',
              guidance: 'Institutions may designate certain information as "directory information" that can be disclosed without consent, but must clearly define these categories and provide opt-out opportunities.',
              priority: 'medium',
              references: ['34 CFR 99.3', '34 CFR 99.37'],
              examples: ['Directory information policies', 'Student opt-out forms', 'Information category definitions', 'Disclosure guidelines'],
              options: [
                { value: 0, label: 'No directory information defined', description: 'No designation of directory information categories' },
                { value: 1, label: 'Basic directory categories', description: 'Some directory information defined but not comprehensive' },
                { value: 2, label: 'Clear directory definitions', description: 'Well-defined directory information with opt-out procedures' },
                { value: 3, label: 'Comprehensive directory management', description: 'Comprehensive directory information program with regular review and updates' }
              ]
            },
            {
              id: 'ferpa.directory.designation.2',
              text: 'Do you provide students the opportunity to opt out of directory information disclosures?',
              guidance: 'Students must be given the opportunity to refuse to let the institution designate any or all of their information as directory information.',
              priority: 'medium',
              references: ['34 CFR 99.37'],
              examples: ['Opt-out forms', 'Student portal options', 'Registration processes', 'Directory suppression systems'],
              options: [
                { value: 0, label: 'No opt-out opportunity', description: 'No mechanism for students to opt out of directory disclosures' },
                { value: 1, label: 'Limited opt-out process', description: 'Basic opt-out available but not well-publicized' },
                { value: 2, label: 'Clear opt-out procedures', description: 'Well-communicated opt-out process with easy access' },
                { value: 3, label: 'Comprehensive opt-out system', description: 'User-friendly system with granular opt-out controls' }
              ]
            }
          ]
        }
      ]
    },
    {
      id: 'security-safeguards',
      name: 'Security and Safeguards',
      description: 'Physical and technical safeguards for protecting education records',
      weight: 25,
      priority: 'high',
      categories: [
        {
          id: 'physical-security',
          name: 'Physical Security',
          description: 'Physical protection of education records and systems',
          weight: 40,
          questions: [
            {
              id: 'ferpa.security.physical.1',
              text: 'Do you have physical safeguards to protect education records from unauthorized access?',
              guidance: 'Educational institutions must implement appropriate physical safeguards to protect education records from unauthorized access, alteration, or destruction.',
              priority: 'high',
              references: ['34 CFR 99.31'],
              examples: ['Locked file cabinets', 'Secure storage areas', 'Access controls', 'Clean desk policies'],
              options: [
                { value: 0, label: 'No physical safeguards', description: 'No physical protection for education records' },
                { value: 1, label: 'Basic physical security', description: 'Some physical controls but not comprehensive' },
                { value: 2, label: 'Adequate physical safeguards', description: 'Appropriate physical security measures implemented' },
                { value: 3, label: 'Comprehensive physical security', description: 'Advanced physical security with monitoring and access controls' }
              ]
            }
          ]
        },
        {
          id: 'technical-security',
          name: 'Technical Security',
          description: 'Technical safeguards for electronic education records',
          weight: 60,
          questions: [
            {
              id: 'ferpa.security.technical.1',
              text: 'Do you have technical safeguards to protect electronic education records?',
              guidance: 'Implement appropriate technical safeguards including access controls, encryption, and audit logging to protect electronic education records.',
              priority: 'high',
              references: ['34 CFR 99.31'],
              examples: ['User authentication', 'Access controls', 'Encryption', 'Audit logs', 'Firewalls'],
              options: [
                { value: 0, label: 'No technical safeguards', description: 'No technical protection for electronic records' },
                { value: 1, label: 'Basic technical security', description: 'Some technical controls but not comprehensive' },
                { value: 2, label: 'Adequate technical safeguards', description: 'Appropriate technical security measures implemented' },
                { value: 3, label: 'Advanced technical security', description: 'Comprehensive technical security with monitoring and encryption' }
              ]
            },
            {
              id: 'ferpa.security.technical.2',
              text: 'Do you maintain audit logs of access to electronic education records?',
              guidance: 'Maintain comprehensive audit logs of who accesses electronic education records, when, and for what purpose to ensure accountability and detect unauthorized access.',
              priority: 'medium',
              references: ['34 CFR 99.32'],
              examples: ['Access logs', 'Audit trails', 'User activity monitoring', 'Log review procedures'],
              options: [
                { value: 0, label: 'No audit logging', description: 'No logging of record access activities' },
                { value: 1, label: 'Basic logging', description: 'Some logging but not comprehensive or regularly reviewed' },
                { value: 2, label: 'Systematic audit logging', description: 'Regular audit logging with periodic review' },
                { value: 3, label: 'Comprehensive audit system', description: 'Advanced logging with real-time monitoring and automated alerts' }
              ]
            }
          ]
        }
      ]
    }
  ]
};