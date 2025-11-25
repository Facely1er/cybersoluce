import { Framework } from '../../types';

export const hipaaFramework: Framework = {
  id: 'hipaa',
  name: 'HIPAA Security Rule',
  description: 'Health Insurance Portability and Accountability Act Security Rule for protecting electronic protected health information (ePHI)',
  version: '2013',
  complexity: 'intermediate',
  estimatedTime: 90,
  industry: ['Healthcare', 'Health Insurance', 'Healthcare Clearinghouses'],
  prerequisites: ['Understanding of healthcare regulations', 'Familiarity with PHI requirements'],
  certificationBody: 'HHS',
  lastUpdated: new Date('2013-01-25'),
  relatedFrameworks: ['HITECH', 'NIST CSF', 'ISO 27001'],
  applicableRegulations: ['HIPAA', 'HITECH', 'State Privacy Laws'],
  learningResources: [
    {
      title: 'HIPAA Security Rule Implementation Guide',
      type: 'guide',
      url: 'https://www.hhs.gov/hipaa/for-professionals/security/guidance',
      description: 'Official HHS guide for implementing HIPAA Security Rule',
      duration: 180,
      difficulty: 'intermediate'
    },
    {
      title: 'HIPAA Compliance Training',
      type: 'course',
      url: 'https://www.hhs.gov/hipaa/for-professionals/training',
      description: 'Comprehensive HIPAA compliance training program',
      duration: 8,
      difficulty: 'beginner'
    },
    {
      title: 'HIPAA Risk Assessment Tool',
      type: 'tool',
      url: 'https://www.hhs.gov/hipaa/for-professionals/security/guidance/cybersecurity',
      description: 'NIST HIPAA Security Rule Assessment Tool',
      duration: 60,
      difficulty: 'intermediate'
    }
  ],
  maturityLevels: [
    { level: 1, name: 'Basic', description: 'Minimal HIPAA compliance', color: '#ef4444', minScore: 0, maxScore: 25 },
    { level: 2, name: 'Standard', description: 'Standard HIPAA implementation', color: '#f97316', minScore: 26, maxScore: 50 },
    { level: 3, name: 'Comprehensive', description: 'Comprehensive HIPAA program', color: '#eab308', minScore: 51, maxScore: 75 },
    { level: 4, name: 'Advanced', description: 'Advanced HIPAA security posture', color: '#22c55e', minScore: 76, maxScore: 100 }
  ],
  sections: [
    {
      id: 'administrative-safeguards',
      name: 'Administrative Safeguards',
      description: 'Administrative actions, policies, and procedures to manage the selection, development, implementation, and maintenance of security measures',
      weight: 40,
      priority: 'high',
      categories: [
        {
          id: 'security-officer',
          name: 'Security Officer',
          description: 'Assign a security officer responsible for developing and implementing security policies',
          weight: 20,
          questions: [
            {
              id: 'hipaa.admin.so.1',
              text: 'Has your organization assigned a security officer responsible for developing and implementing security policies and procedures?',
              guidance: 'The Security Officer must be assigned responsibility for developing and implementing the policies and procedures required by the Security Rule. This person may be the same as the Privacy Officer.',
              priority: 'high',
              references: ['§164.308(a)(2)'],
              examples: ['Security Officer job description', 'Formal appointment documentation', 'Security policies signed by Security Officer'],
              options: [
                { value: 0, label: 'No security officer assigned', description: 'No designated security officer or unclear responsibilities' },
                { value: 1, label: 'Security officer assigned but limited authority', description: 'Security officer designated but lacks full authority or resources' },
                { value: 2, label: 'Security officer with defined responsibilities', description: 'Security officer assigned with clear responsibilities and some authority' },
                { value: 3, label: 'Security officer with full authority and resources', description: 'Security officer with complete authority, resources, and executive support' }
              ]
            },
            {
              id: 'hipaa.admin.so.2',
              text: 'Does the security officer have appropriate authority and resources to carry out their responsibilities?',
              guidance: 'The security officer must have sufficient authority within the organization to implement and enforce security policies and procedures.',
              priority: 'high',
              references: ['§164.308(a)(2)'],
              examples: ['Organizational chart showing reporting structure', 'Budget allocation for security initiatives', 'Executive support documentation'],
              options: [
                { value: 0, label: 'No authority or resources', description: 'Security officer lacks authority and resources to be effective' },
                { value: 1, label: 'Limited authority and resources', description: 'Some authority but insufficient resources or support' },
                { value: 2, label: 'Adequate authority and resources', description: 'Sufficient authority and resources for most responsibilities' },
                { value: 3, label: 'Full authority and comprehensive resources', description: 'Complete authority and all necessary resources to fulfill role' }
              ]
            }
          ]
        },
        {
          id: 'workforce-training',
          name: 'Workforce Training and Access Management',
          description: 'Implement procedures for authorizing access to ePHI and training workforce members',
          weight: 25,
          questions: [
            {
              id: 'hipaa.admin.wt.1',
              text: 'Do you have procedures for authorizing access to electronic protected health information?',
              guidance: 'Implement procedures to authorize access to ePHI that are consistent with the applicable requirements of the Privacy Rule.',
              priority: 'high',
              references: ['§164.308(a)(3)(i)'],
              examples: ['Access authorization procedures', 'Role-based access controls', 'Access request forms', 'Approval workflows'],
              options: [
                { value: 0, label: 'No access authorization procedures', description: 'No formal procedures for authorizing ePHI access' },
                { value: 1, label: 'Basic access procedures', description: 'Informal or basic access authorization procedures' },
                { value: 2, label: 'Documented access procedures', description: 'Formal, documented procedures for access authorization' },
                { value: 3, label: 'Comprehensive access management', description: 'Comprehensive procedures with regular review and updates' }
              ]
            },
            {
              id: 'hipaa.admin.wt.2',
              text: 'Do you provide security awareness and training for all workforce members?',
              guidance: 'Implement a security awareness and training program for all members of its workforce (including management).',
              priority: 'medium',
              references: ['§164.308(a)(5)(i)'],
              examples: ['Training curriculum', 'Training records', 'Security awareness materials', 'Annual training completion reports'],
              options: [
                { value: 0, label: 'No security training program', description: 'No formal security awareness or training program' },
                { value: 1, label: 'Basic training provided', description: 'Some security training but not comprehensive or regular' },
                { value: 2, label: 'Regular training program', description: 'Formal training program with regular updates' },
                { value: 3, label: 'Comprehensive training with tracking', description: 'Comprehensive program with completion tracking and effectiveness measurement' }
              ]
            },
            {
              id: 'hipaa.admin.wt.3',
              text: 'Do you have procedures for granting access to ePHI based on access authorization?',
              guidance: 'Implement procedures to grant access to ePHI, for example, through access to a workstation, transaction, program, process, or other mechanism.',
              priority: 'high',
              references: ['§164.308(a)(3)(ii)(A)'],
              examples: ['User provisioning procedures', 'Role definitions', 'Access control matrices', 'System access logs'],
              options: [
                { value: 0, label: 'No access granting procedures', description: 'No formal procedures for granting system access' },
                { value: 1, label: 'Basic access granting', description: 'Informal access granting without clear procedures' },
                { value: 2, label: 'Documented access procedures', description: 'Formal procedures for granting and managing access' },
                { value: 3, label: 'Automated access management', description: 'Automated systems with comprehensive access controls and monitoring' }
              ]
            }
          ]
        },
        {
          id: 'information-access-management',
          name: 'Information Access Management',
          description: 'Implement policies and procedures for authorizing access to ePHI',
          weight: 25,
          questions: [
            {
              id: 'hipaa.admin.iam.1',
              text: 'Do you have policies and procedures that limit access to ePHI to authorized users?',
              guidance: 'Implement policies and procedures for authorizing access to ePHI that are consistent with the applicable requirements of the Privacy Rule.',
              priority: 'high',
              references: ['§164.308(a)(4)(i)'],
              examples: ['Access control policies', 'User access procedures', 'Authorization matrices', 'Privacy Rule compliance documentation'],
              options: [
                { value: 0, label: 'No access limitation policies', description: 'No formal policies limiting ePHI access' },
                { value: 1, label: 'Basic access policies', description: 'Some policies but not comprehensive or enforced' },
                { value: 2, label: 'Comprehensive access policies', description: 'Well-documented policies with regular enforcement' },
                { value: 3, label: 'Advanced access governance', description: 'Comprehensive policies with automated enforcement and monitoring' }
              ]
            },
            {
              id: 'hipaa.admin.iam.2',
              text: 'Do you regularly review and update user access to ePHI?',
              guidance: 'Implement procedures to review access rights to ePHI and modify access as needed.',
              priority: 'medium',
              references: ['§164.308(a)(4)(ii)(C)'],
              examples: ['Access review procedures', 'Quarterly access reviews', 'Access modification logs', 'Termination procedures'],
              options: [
                { value: 0, label: 'No access reviews', description: 'No regular review of user access rights' },
                { value: 1, label: 'Irregular access reviews', description: 'Occasional or ad-hoc access reviews' },
                { value: 2, label: 'Regular access reviews', description: 'Scheduled access reviews with documentation' },
                { value: 3, label: 'Automated access governance', description: 'Automated access reviews with real-time monitoring and alerts' }
              ]
            }
          ]
        },
        {
          id: 'contingency-plan',
          name: 'Contingency Plan',
          description: 'Establish procedures for responding to emergencies or other occurrences',
          weight: 15,
          questions: [
            {
              id: 'hipaa.admin.cp.1',
              text: 'Do you have a contingency plan for responding to emergencies that damage systems containing ePHI?',
              guidance: 'Establish (and implement as needed) procedures for responding to an emergency or other occurrence that damages systems that contain ePHI.',
              priority: 'high',
              references: ['§164.308(a)(7)(i)'],
              examples: ['Business continuity plan', 'Disaster recovery procedures', 'Emergency response plan', 'System backup procedures'],
              options: [
                { value: 0, label: 'No contingency plan', description: 'No formal contingency or emergency response plan' },
                { value: 1, label: 'Basic contingency procedures', description: 'Some emergency procedures but not comprehensive' },
                { value: 2, label: 'Documented contingency plan', description: 'Formal contingency plan with defined procedures' },
                { value: 3, label: 'Tested and maintained plan', description: 'Comprehensive plan with regular testing and updates' }
              ]
            },
            {
              id: 'hipaa.admin.cp.2',
              text: 'Do you regularly test and update your contingency plan?',
              guidance: 'The contingency plan should be tested periodically and updated as needed to ensure its effectiveness.',
              priority: 'medium',
              references: ['§164.308(a)(7)'],
              examples: ['Testing schedules', 'Test results documentation', 'Plan update logs', 'Lessons learned reports'],
              options: [
                { value: 0, label: 'No testing or updates', description: 'Contingency plan not tested or updated' },
                { value: 1, label: 'Irregular testing', description: 'Occasional testing but no regular schedule' },
                { value: 2, label: 'Regular testing schedule', description: 'Scheduled testing with documented results' },
                { value: 3, label: 'Comprehensive testing program', description: 'Regular testing with continuous improvement and updates' }
              ]
            }
          ]
        },
        {
          id: 'evaluation',
          name: 'Evaluation',
          description: 'Conduct periodic technical and non-technical evaluations',
          weight: 15,
          questions: [
            {
              id: 'hipaa.admin.eval.1',
              text: 'Do you conduct periodic security evaluations in response to environmental or operational changes?',
              guidance: 'Conduct periodic technical and non-technical evaluations, based initially upon the standards implemented under this rule and subsequently, in response to environmental or operational changes affecting the security of ePHI.',
              priority: 'medium',
              references: ['§164.308(a)(8)'],
              examples: ['Security assessment reports', 'Evaluation schedules', 'Risk assessment updates', 'Compliance audits'],
              options: [
                { value: 0, label: 'No security evaluations', description: 'No periodic security evaluations conducted' },
                { value: 1, label: 'Irregular evaluations', description: 'Some evaluations but not systematic or regular' },
                { value: 2, label: 'Regular evaluation program', description: 'Scheduled evaluations with documented results' },
                { value: 3, label: 'Continuous evaluation process', description: 'Ongoing evaluation with real-time monitoring and assessment' }
              ]
            }
          ]
        }
      ]
    },
    {
      id: 'physical-safeguards',
      name: 'Physical Safeguards',
      description: 'Physical measures, policies, and procedures to protect electronic information systems and related buildings and equipment',
      weight: 30,
      priority: 'high',
      categories: [
        {
          id: 'facility-access-controls',
          name: 'Facility Access Controls',
          description: 'Implement policies and procedures to limit physical access to electronic information systems',
          weight: 40,
          questions: [
            {
              id: 'hipaa.phys.fac.1',
              text: 'Do you have policies and procedures to limit physical access to electronic information systems and the facilities in which they are housed?',
              guidance: 'Implement policies and procedures to limit physical access to its electronic information systems and the facility or facilities in which they are housed, while ensuring that properly authorized access is allowed.',
              priority: 'high',
              references: ['§164.310(a)(1)'],
              examples: ['Physical access control policies', 'Facility security procedures', 'Access control systems', 'Visitor management procedures'],
              options: [
                { value: 0, label: 'No physical access controls', description: 'No formal physical access control policies or procedures' },
                { value: 1, label: 'Basic physical controls', description: 'Some physical controls but not comprehensive' },
                { value: 2, label: 'Documented access controls', description: 'Formal policies with implemented physical controls' },
                { value: 3, label: 'Advanced physical security', description: 'Comprehensive physical security with monitoring and access logging' }
              ]
            },
            {
              id: 'hipaa.phys.fac.2',
              text: 'Do you maintain records of facility access authorizations?',
              guidance: 'Implement procedures to control and validate a person\'s access to facilities based on their role or function, including visitor control, and control of access to software programs for testing and revision.',
              priority: 'medium',
              references: ['§164.310(a)(2)(i)'],
              examples: ['Access authorization records', 'Visitor logs', 'Badge access systems', 'Facility access reviews'],
              options: [
                { value: 0, label: 'No access records', description: 'No records of facility access or authorizations' },
                { value: 1, label: 'Basic access logging', description: 'Some access records but not comprehensive' },
                { value: 2, label: 'Systematic access records', description: 'Regular maintenance of access authorization records' },
                { value: 3, label: 'Automated access management', description: 'Automated systems with comprehensive access logging and monitoring' }
              ]
            }
          ]
        },
        {
          id: 'workstation-use',
          name: 'Workstation Use',
          description: 'Implement policies and procedures that specify proper functions and physical attributes of workstations',
          weight: 30,
          questions: [
            {
              id: 'hipaa.phys.ws.1',
              text: 'Do you have policies and procedures that specify the proper functions to be performed and the manner in which workstations may be used?',
              guidance: 'Implement policies and procedures that specify the proper functions to be performed, the manner in which those functions are to be performed, and the physical attributes of the surroundings of a specific workstation or class of workstation that can access ePHI.',
              priority: 'medium',
              references: ['§164.310(b)'],
              examples: ['Workstation use policies', 'Clean desk policies', 'Screen lock procedures', 'Physical workstation requirements'],
              options: [
                { value: 0, label: 'No workstation policies', description: 'No formal workstation use policies or procedures' },
                { value: 1, label: 'Basic workstation guidelines', description: 'Some workstation guidelines but not comprehensive' },
                { value: 2, label: 'Documented workstation policies', description: 'Formal policies specifying workstation use and requirements' },
                { value: 3, label: 'Comprehensive workstation management', description: 'Detailed policies with enforcement and monitoring' }
              ]
            }
          ]
        },
        {
          id: 'device-media-controls',
          name: 'Device and Media Controls',
          description: 'Implement policies and procedures that govern receipt and removal of hardware and electronic media',
          weight: 30,
          questions: [
            {
              id: 'hipaa.phys.dmc.1',
              text: 'Do you have policies and procedures that govern the receipt and removal of hardware and electronic media that contain ePHI?',
              guidance: 'Implement policies and procedures that govern the receipt and removal of hardware and electronic media that contain ePHI into and out of a facility, and the movement of these items within the facility.',
              priority: 'high',
              references: ['§164.310(d)(1)'],
              examples: ['Media handling procedures', 'Hardware disposal policies', 'Data destruction procedures', 'Media inventory tracking'],
              options: [
                { value: 0, label: 'No media control policies', description: 'No formal policies for hardware and media containing ePHI' },
                { value: 1, label: 'Basic media procedures', description: 'Some procedures but not comprehensive or enforced' },
                { value: 2, label: 'Documented media controls', description: 'Formal policies for media handling and disposal' },
                { value: 3, label: 'Comprehensive media management', description: 'Complete media lifecycle management with tracking and secure disposal' }
              ]
            },
            {
              id: 'hipaa.phys.dmc.2',
              text: 'Do you maintain a record of the movements of hardware and electronic media and any person responsible for them?',
              guidance: 'Maintain a record of the movements of hardware and electronic media and any person responsible therefore.',
              priority: 'medium',
              references: ['§164.310(d)(2)(i)'],
              examples: ['Media movement logs', 'Asset tracking systems', 'Chain of custody records', 'Responsibility assignments'],
              options: [
                { value: 0, label: 'No movement records', description: 'No tracking of hardware and media movements' },
                { value: 1, label: 'Basic movement tracking', description: 'Some tracking but not systematic' },
                { value: 2, label: 'Systematic movement records', description: 'Regular tracking of media and hardware movements' },
                { value: 3, label: 'Automated tracking system', description: 'Comprehensive automated tracking with real-time visibility' }
              ]
            }
          ]
        }
      ]
    },
    {
      id: 'technical-safeguards',
      name: 'Technical Safeguards',
      description: 'Technology and the policy and procedures for its use that protect ePHI and control access to it',
      weight: 30,
      priority: 'high',
      categories: [
        {
          id: 'access-control',
          name: 'Access Control',
          description: 'Implement technical policies and procedures for electronic information systems that maintain ePHI',
          weight: 30,
          questions: [
            {
              id: 'hipaa.tech.ac.1',
              text: 'Do you have technical policies and procedures that allow access to ePHI only to authorized persons or software programs?',
              guidance: 'Implement technical policies and procedures for electronic information systems that maintain ePHI to allow access only to those persons or software programs that have been granted access rights.',
              priority: 'high',
              references: ['§164.312(a)(1)'],
              examples: ['User authentication systems', 'Access control lists', 'Role-based access controls', 'System access policies'],
              options: [
                { value: 0, label: 'No technical access controls', description: 'No technical controls limiting access to ePHI' },
                { value: 1, label: 'Basic access controls', description: 'Some technical controls but not comprehensive' },
                { value: 2, label: 'Implemented access controls', description: 'Technical controls implemented with regular management' },
                { value: 3, label: 'Advanced access management', description: 'Comprehensive technical controls with automated management and monitoring' }
              ]
            },
            {
              id: 'hipaa.tech.ac.2',
              text: 'Do you assign unique user identification for each person or entity seeking access to ePHI?',
              guidance: 'Assign a unique name and/or number for identifying and tracking user identity.',
              priority: 'high',
              references: ['§164.312(a)(2)(i)'],
              examples: ['Unique user IDs', 'User account management', 'Identity management systems', 'User provisioning procedures'],
              options: [
                { value: 0, label: 'No unique identification', description: 'Shared accounts or no unique user identification' },
                { value: 1, label: 'Some unique IDs', description: 'Partial implementation of unique user identification' },
                { value: 2, label: 'Unique IDs implemented', description: 'Unique identification for all users accessing ePHI' },
                { value: 3, label: 'Advanced identity management', description: 'Comprehensive identity management with lifecycle controls' }
              ]
            }
          ]
        },
        {
          id: 'audit-controls',
          name: 'Audit Controls',
          description: 'Implement hardware, software, and procedural mechanisms for recording access to ePHI',
          weight: 25,
          questions: [
            {
              id: 'hipaa.tech.audit.1',
              text: 'Do you implement hardware, software, and/or procedural mechanisms that record and examine access and other activity in information systems that contain or use ePHI?',
              guidance: 'Implement hardware, software, and/or procedural mechanisms that record and examine access and other activity in information systems that contain or use ePHI.',
              priority: 'high',
              references: ['§164.312(b)'],
              examples: ['Audit logging systems', 'Access logs', 'Security information and event management (SIEM)', 'Log review procedures'],
              options: [
                { value: 0, label: 'No audit controls', description: 'No mechanisms for recording or examining ePHI access' },
                { value: 1, label: 'Basic audit logging', description: 'Some logging but not comprehensive or regularly reviewed' },
                { value: 2, label: 'Implemented audit controls', description: 'Audit mechanisms implemented with regular review' },
                { value: 3, label: 'Advanced audit management', description: 'Comprehensive audit controls with automated analysis and alerting' }
              ]
            }
          ]
        },
        {
          id: 'integrity',
          name: 'Integrity',
          description: 'Protect ePHI from improper alteration or destruction',
          weight: 20,
          questions: [
            {
              id: 'hipaa.tech.integrity.1',
              text: 'Do you protect ePHI from improper alteration or destruction?',
              guidance: 'Implement policies and procedures to protect ePHI from improper alteration or destruction.',
              priority: 'high',
              references: ['§164.312(c)(1)'],
              examples: ['Data integrity controls', 'Version control systems', 'Digital signatures', 'Change management procedures'],
              options: [
                { value: 0, label: 'No integrity protection', description: 'No measures to protect ePHI from alteration or destruction' },
                { value: 1, label: 'Basic integrity measures', description: 'Some protection but not comprehensive' },
                { value: 2, label: 'Implemented integrity controls', description: 'Formal controls to protect ePHI integrity' },
                { value: 3, label: 'Advanced integrity management', description: 'Comprehensive integrity protection with monitoring and validation' }
              ]
            }
          ]
        },
        {
          id: 'transmission-security',
          name: 'Transmission Security',
          description: 'Implement technical security measures to guard against unauthorized access to ePHI transmitted over networks',
          weight: 25,
          questions: [
            {
              id: 'hipaa.tech.trans.1',
              text: 'Do you implement technical security measures to guard against unauthorized access to ePHI that is being transmitted over an electronic communications network?',
              guidance: 'Implement technical security measures to guard against unauthorized access to ePHI that is being transmitted over an electronic communications network.',
              priority: 'high',
              references: ['§164.312(e)(1)'],
              examples: ['Encryption in transit', 'VPN connections', 'Secure email systems', 'Network security controls'],
              options: [
                { value: 0, label: 'No transmission security', description: 'No protection for ePHI transmitted over networks' },
                { value: 1, label: 'Basic transmission protection', description: 'Some protection but not comprehensive' },
                { value: 2, label: 'Implemented transmission security', description: 'Technical measures implemented for network transmission' },
                { value: 3, label: 'Advanced transmission security', description: 'Comprehensive encryption and security for all ePHI transmissions' }
              ]
            },
            {
              id: 'hipaa.tech.trans.2',
              text: 'Do you implement a mechanism to encrypt ePHI whenever deemed appropriate?',
              guidance: 'Implement a mechanism to encrypt and decrypt ePHI.',
              priority: 'medium',
              references: ['§164.312(e)(2)(ii)'],
              examples: ['Encryption policies', 'Key management systems', 'Encrypted databases', 'Encrypted file systems'],
              options: [
                { value: 0, label: 'No encryption', description: 'No encryption mechanisms for ePHI' },
                { value: 1, label: 'Limited encryption', description: 'Some encryption but not comprehensive' },
                { value: 2, label: 'Implemented encryption', description: 'Encryption mechanisms implemented where appropriate' },
                { value: 3, label: 'Comprehensive encryption', description: 'Full encryption with proper key management and policies' }
              ]
            }
          ]
        }
      ]
    }
  ]
};