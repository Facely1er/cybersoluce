import { Framework } from '../../types';

export const hecvatFramework: Framework = {
  id: 'hecvat',
  name: 'HECVAT (Higher Education Community Vendor Assessment Toolkit)',
  description: 'Comprehensive security and privacy assessment framework for higher education technology vendors and service providers covering all regulatory and security requirements',
  version: '4.1.0',
  complexity: 'advanced',
  estimatedTime: 480,
  industry: ['Higher Education', 'Educational Technology', 'Cloud Services', 'Software Vendors', 'Healthcare Technology', 'Financial Services'],
  prerequisites: ['Understanding of higher education requirements', 'Familiarity with vendor assessment processes'],
  certificationBody: 'EDUCAUSE',
  lastUpdated: new Date('2023-03-15'),
  relatedFrameworks: ['NIST CSF', 'ISO 27001', 'SOC 2', 'HIPAA', 'FERPA'],
  applicableRegulations: ['FERPA', 'HIPAA', 'GDPR', 'CCPA', 'State Privacy Laws'],
  maturityLevels: [
    { level: 1, name: 'Basic Compliance', description: 'Minimal security and privacy controls with basic vendor oversight', color: '#ef4444', minScore: 0, maxScore: 25 },
    { level: 2, name: 'Standard Implementation', description: 'Standard security practices with documented procedures and regular assessments', color: '#f97316', minScore: 26, maxScore: 50 },
    { level: 3, name: 'Advanced Security Program', description: 'Comprehensive security program with proactive risk management and third-party oversight', color: '#eab308', minScore: 51, maxScore: 75 },
    { level: 4, name: 'Enterprise Security Excellence', description: 'Advanced security governance with continuous improvement and industry-leading practices', color: '#22c55e', minScore: 76, maxScore: 100 }
  ],
  sections: [
    {
      id: 'general-company-info',
      name: 'General Company Information',
      description: 'Basic company information, contact details, and business structure',
      weight: 5,
      priority: 'medium',
      categories: [
        {
          id: 'company-profile',
          name: 'Company Profile and Structure',
          description: 'Basic company information and organizational structure',
          weight: 60,
          questions: [
            {
              id: 'hecvat.general.profile.1',
              text: 'Solution Provider Name',
              guidance: 'Provide the official legal name of your organization.',
              priority: 'high',
              references: ['HECVAT GNRL-01'],
              examples: ['Legal business name', 'DBA names', 'Subsidiary names'],
              options: [
                { value: 0, label: 'Not provided', description: 'Company name not provided' },
                { value: 1, label: 'Partial information', description: 'Some company information provided but incomplete' },
                { value: 2, label: 'Standard information', description: 'Complete company name and basic details provided' },
                { value: 3, label: 'Comprehensive information', description: 'Complete company profile with detailed organizational information' }
              ]
            },
            {
              id: 'hecvat.general.profile.2',
              text: 'Do you have a dedicated software and system development team(s) (e.g., customer support, implementation, product management, etc.)?',
              guidance: 'Having dedicated development teams indicates organizational maturity and commitment to product quality.',
              priority: 'high',
              references: ['HECVAT COMP-01'],
              examples: ['Development team structure', 'Team roles and responsibilities', 'Organizational charts'],
              options: [
                { value: 0, label: 'No dedicated teams', description: 'No dedicated development or support teams' },
                { value: 1, label: 'Basic team structure', description: 'Some dedicated roles but limited team structure' },
                { value: 2, label: 'Standard team organization', description: 'Well-defined teams for key functions' },
                { value: 3, label: 'Comprehensive team structure', description: 'Mature organizational structure with specialized teams' }
              ]
            },
            {
              id: 'hecvat.general.profile.3',
              text: 'Describe your organization\'s business background and ownership structure, including all parent and subsidiary relationships.',
              guidance: 'Understanding ownership structure helps assess potential risks and dependencies.',
              priority: 'medium',
              references: ['HECVAT COMP-02'],
              examples: ['Corporate structure diagrams', 'Ownership documentation', 'Parent company information'],
              options: [
                { value: 0, label: 'No structure information', description: 'No information about business structure provided' },
                { value: 1, label: 'Basic structure information', description: 'Some ownership information but not comprehensive' },
                { value: 2, label: 'Standard structure documentation', description: 'Clear documentation of ownership and key relationships' },
                { value: 3, label: 'Comprehensive structure transparency', description: 'Complete transparency of all ownership and subsidiary relationships' }
              ]
            }
          ]
        },
        {
          id: 'business-stability',
          name: 'Business Stability and Operations',
          description: 'Assessment of business continuity and operational stability',
          weight: 40,
          questions: [
            {
              id: 'hecvat.general.stability.1',
              text: 'Have you operated without unplanned disruptions to this solution in the past 12 months?',
              guidance: 'Track record of stable operations indicates reliability and operational maturity.',
              priority: 'medium',
              references: ['HECVAT COMP-03'],
              examples: ['Uptime reports', 'Incident logs', 'Service availability metrics'],
              options: [
                { value: 0, label: 'Multiple major disruptions', description: 'Frequent unplanned service disruptions' },
                { value: 1, label: 'Some disruptions', description: 'Occasional unplanned disruptions with impact' },
                { value: 2, label: 'Minor disruptions only', description: 'Few minor disruptions with minimal impact' },
                { value: 3, label: 'No significant disruptions', description: 'Stable operations with no material service disruptions' }
              ]
            }
          ]
        }
      ]
    },
    {
      id: 'organizational-security',
      name: 'Organizational Security and Governance',
      description: 'Business continuity, disaster recovery, security frameworks, and organizational policies',
      weight: 20,
      priority: 'high',
      categories: [
        {
          id: 'business-continuity',
          name: 'Business Continuity and Disaster Recovery',
          description: 'Plans and procedures for maintaining operations during disruptions',
          weight: 25,
          questions: [
            {
              id: 'hecvat.org.continuity.1',
              text: 'Do you have a well-documented business continuity plan (BCP), with a clear owner, that is tested annually?',
              guidance: 'A comprehensive BCP should include procedures for maintaining essential business functions during various types of disruptions, with regular testing and updates.',
              priority: 'high',
              references: ['HECVAT DOCU-01'],
              examples: ['Annual BCP testing reports', 'Business impact assessments', 'Recovery time objectives', 'Incident response procedures'],
              options: [
                { value: 0, label: 'No BCP exists', description: 'No formal business continuity planning in place' },
                { value: 1, label: 'Basic BCP without testing', description: 'BCP exists but is not regularly tested or updated' },
                { value: 2, label: 'Documented BCP with periodic testing', description: 'Formal BCP with some testing but not comprehensive' },
                { value: 3, label: 'Comprehensive BCP with annual testing', description: 'Well-documented BCP with clear ownership and annual testing cycles' }
              ]
            },
            {
              id: 'hecvat.org.continuity.2',
              text: 'Do you have a well-documented disaster recovery plan (DRP), with a clear owner, that is tested annually?',
              guidance: 'DRP should detail how to restore IT systems and data after a disaster, including recovery priorities, procedures, and testing protocols.',
              priority: 'high',
              references: ['HECVAT DOCU-02'],
              examples: ['DR testing schedules', 'Recovery procedures', 'Backup verification processes', 'Recovery time/point objectives'],
              options: [
                { value: 0, label: 'No DRP exists', description: 'No formal disaster recovery planning in place' },
                { value: 1, label: 'Basic DRP without testing', description: 'DRP exists but is not regularly tested or validated' },
                { value: 2, label: 'Documented DRP with periodic testing', description: 'Formal DRP with some testing but not comprehensive' },
                { value: 3, label: 'Comprehensive DRP with annual testing', description: 'Well-documented DRP with clear ownership and annual testing cycles' }
              ]
            }
          ]
        },
        {
          id: 'security-frameworks',
          name: 'Security Frameworks and Standards',
          description: 'Adherence to industry security standards and frameworks',
          weight: 20,
          questions: [
            {
              id: 'hecvat.org.frameworks.1',
              text: 'Have you undergone a SSAE 18/SOC 2 audit?',
              guidance: 'SOC 2 audits provide independent verification of security controls and are important for demonstrating security commitments to customers.',
              priority: 'high',
              references: ['HECVAT DOCU-03'],
              examples: ['SOC 2 Type II reports', 'Audit findings remediation', 'Control effectiveness assessments'],
              options: [
                { value: 0, label: 'No SOC audit', description: 'No SOC 2 or similar audit conducted' },
                { value: 1, label: 'SOC audit in progress', description: 'Currently undergoing or planning SOC 2 audit' },
                { value: 2, label: 'SOC 2 Type I completed', description: 'SOC 2 Type I audit completed within last 2 years' },
                { value: 3, label: 'SOC 2 Type II completed', description: 'SOC 2 Type II audit completed within last year' }
              ]
            },
            {
              id: 'hecvat.org.frameworks.2',
              text: 'Do you conform with a specific industry standard security framework (e.g., NIST Cybersecurity Framework, CIS Controls, ISO 27001, etc.)?',
              guidance: 'Following established security frameworks demonstrates commitment to security best practices and provides structured approach to risk management.',
              priority: 'high',
              references: ['HECVAT DOCU-04'],
              examples: ['NIST CSF implementation', 'ISO 27001 certification', 'CIS Controls assessment', 'Framework gap analysis'],
              options: [
                { value: 0, label: 'No formal framework', description: 'No adherence to recognized security frameworks' },
                { value: 1, label: 'Framework partially implemented', description: 'Some framework elements implemented but not comprehensive' },
                { value: 2, label: 'Framework substantially implemented', description: 'Most framework requirements met with documented processes' },
                { value: 3, label: 'Framework comprehensively implemented and certified', description: 'Complete framework implementation with third-party certification' }
              ]
            }
          ]
        },
        {
          id: 'third-party-management',
          name: 'Third-Party Risk Management',
          description: 'Assessment and management of third-party vendor relationships',
          weight: 20,
          questions: [
            {
              id: 'hecvat.org.thirdparty.1',
              text: 'Do you perform security assessments of third-party companies with which you share data (e.g., hosting providers, cloud services, PaaS, IaaS, SaaS)?',
              guidance: 'Regular security assessments of third parties help ensure that vendors maintain appropriate security standards and do not introduce additional risks.',
              priority: 'high',
              references: ['HECVAT THRD-01'],
              examples: ['Vendor security questionnaires', 'Third-party audits', 'Due diligence assessments', 'Risk ratings'],
              options: [
                { value: 0, label: 'No third-party assessments', description: 'No formal assessment of third-party security practices' },
                { value: 1, label: 'Basic vendor screening', description: 'Minimal screening of critical vendors only' },
                { value: 2, label: 'Regular third-party assessments', description: 'Systematic assessment of major third-party vendors' },
                { value: 3, label: 'Comprehensive third-party program', description: 'Formal program with regular assessments, monitoring, and risk management' }
              ]
            },
            {
              id: 'hecvat.org.thirdparty.2',
              text: 'Do you have contractual language in place with third parties governing access to institutional data?',
              guidance: 'Contracts should clearly define data handling requirements, security obligations, and access restrictions for third parties.',
              priority: 'high',
              references: ['HECVAT THRD-02'],
              examples: ['Data processing agreements', 'Security requirements in contracts', 'Access control clauses', 'Audit rights provisions'],
              options: [
                { value: 0, label: 'No contractual data governance', description: 'No specific contractual language for data handling' },
                { value: 1, label: 'Basic contractual protections', description: 'Some data protection clauses but not comprehensive' },
                { value: 2, label: 'Standard contractual language', description: 'Appropriate contractual language for most third parties' },
                { value: 3, label: 'Comprehensive contractual framework', description: 'Detailed contractual language with strong data governance provisions' }
              ]
            }
          ]
        },
        {
          id: 'security-organization',
          name: 'Security Organization and Staffing',
          description: 'Dedicated security resources and organizational structure',
          weight: 15,
          questions: [
            {
              id: 'hecvat.org.security.1',
              text: 'Do you have a dedicated information security staff or office?',
              guidance: 'Dedicated security resources demonstrate commitment to security and provide specialized expertise for managing security programs.',
              priority: 'high',
              references: ['HECVAT COMP-04'],
              examples: ['Security team structure', 'CISO/security officer roles', 'Security staff responsibilities', 'Security governance'],
              options: [
                { value: 0, label: 'No dedicated security staff', description: 'No dedicated information security personnel' },
                { value: 1, label: 'Part-time security responsibilities', description: 'Security handled as additional duties by existing staff' },
                { value: 2, label: 'Dedicated security personnel', description: 'One or more dedicated security staff members' },
                { value: 3, label: 'Comprehensive security organization', description: 'Formal security organization with specialized roles and clear governance' }
              ]
            }
          ]
        },
        {
          id: 'employee-management',
          name: 'Employee Security Management',
          description: 'Employee onboarding, offboarding, and security training',
          weight: 20,
          questions: [
            {
              id: 'hecvat.org.employee.1',
              text: 'Do you have a documented, and currently implemented, employee onboarding and offboarding policy?',
              guidance: 'Proper onboarding and offboarding procedures help ensure security throughout the employee lifecycle.',
              priority: 'medium',
              references: ['HECVAT DOCU-07'],
              examples: ['Onboarding checklists', 'Access provisioning procedures', 'Offboarding procedures', 'Background check policies'],
              options: [
                { value: 0, label: 'No formal policies', description: 'No documented onboarding/offboarding procedures' },
                { value: 1, label: 'Basic procedures exist', description: 'Some procedures but not comprehensive or well-documented' },
                { value: 2, label: 'Documented policies implemented', description: 'Well-documented procedures that are actively followed' },
                { value: 3, label: 'Comprehensive employee lifecycle management', description: 'Detailed policies with automated workflows and compliance tracking' }
              ]
            },
            {
              id: 'hecvat.org.employee.2',
              text: 'Do you conduct background checks on employees?',
              guidance: 'Background checks help verify employee qualifications and identify potential security risks.',
              priority: 'medium',
              references: ['HECVAT Employee Security'],
              examples: ['Criminal background checks', 'Reference verification', 'Education verification', 'Credit checks for financial roles'],
              options: [
                { value: 0, label: 'No background checks', description: 'No background verification procedures' },
                { value: 1, label: 'Limited background checks', description: 'Basic checks for certain roles only' },
                { value: 2, label: 'Standard background checks', description: 'Regular background checks for most employees' },
                { value: 3, label: 'Comprehensive background verification', description: 'Thorough background checks for all employees with role-appropriate depth' }
              ]
            }
          ]
        }
      ]
    },
    {
      id: 'infrastructure-security',
      name: 'Infrastructure and Technical Security',
      description: 'Technical security controls, network security, and system administration',
      weight: 25,
      priority: 'high',
      categories: [
        {
          id: 'network-security',
          name: 'Network Security Controls',
          description: 'Network segmentation, monitoring, and access controls',
          weight: 25,
          questions: [
            {
              id: 'hecvat.infra.network.1',
              text: 'Do you have network segmentation controls in place to isolate sensitive systems?',
              guidance: 'Network segmentation helps contain security incidents and limits unauthorized access to sensitive systems and data.',
              priority: 'high',
              references: ['HECVAT Infrastructure Security'],
              examples: ['Network diagrams', 'VLAN configurations', 'Firewall rules', 'Access control lists'],
              options: [
                { value: 0, label: 'No network segmentation', description: 'Flat network architecture without segmentation' },
                { value: 1, label: 'Basic network segmentation', description: 'Some network separation but not comprehensive' },
                { value: 2, label: 'Standard network segmentation', description: 'Appropriate segmentation for most systems' },
                { value: 3, label: 'Advanced network segmentation', description: 'Comprehensive micro-segmentation with zero trust principles' }
              ]
            },
            {
              id: 'hecvat.infra.network.2',
              text: 'Do you implement network monitoring and intrusion detection systems?',
              guidance: 'Network monitoring helps detect unauthorized access attempts and security incidents in real-time.',
              priority: 'high',
              references: ['HECVAT Infrastructure Security'],
              examples: ['IDS/IPS systems', 'SIEM tools', 'Network traffic analysis', 'Security monitoring dashboards'],
              options: [
                { value: 0, label: 'No network monitoring', description: 'No systematic network monitoring or intrusion detection' },
                { value: 1, label: 'Basic monitoring tools', description: 'Some monitoring capabilities but limited coverage' },
                { value: 2, label: 'Standard monitoring implementation', description: 'Good monitoring coverage with regular review' },
                { value: 3, label: 'Advanced monitoring and analytics', description: 'Comprehensive monitoring with AI/ML-based threat detection' }
              ]
            },
            {
              id: 'hecvat.infra.network.3',
              text: 'Do you use firewalls to protect your network perimeter and internal network segments?',
              guidance: 'Firewalls provide essential network security controls and should be properly configured and maintained.',
              priority: 'high',
              references: ['HECVAT Infrastructure Security'],
              examples: ['Firewall configurations', 'Rule sets', 'Change management procedures', 'Security policies'],
              options: [
                { value: 0, label: 'No firewall protection', description: 'No firewall controls in place' },
                { value: 1, label: 'Basic firewall implementation', description: 'Basic firewall with minimal configuration' },
                { value: 2, label: 'Standard firewall deployment', description: 'Well-configured firewalls with documented rules' },
                { value: 3, label: 'Advanced firewall architecture', description: 'Next-generation firewalls with advanced threat protection and monitoring' }
              ]
            }
          ]
        },
        {
          id: 'access-controls',
          name: 'Identity and Access Management',
          description: 'User authentication, authorization, and access controls',
          weight: 20,
          questions: [
            {
              id: 'hecvat.infra.access.1',
              text: 'Do you implement multi-factor authentication for administrative access?',
              guidance: 'Multi-factor authentication significantly reduces the risk of unauthorized access to critical systems.',
              priority: 'high',
              references: ['HECVAT Access Controls'],
              examples: ['MFA implementations', 'Authentication policies', 'Privileged access controls'],
              options: [
                { value: 0, label: 'No MFA implemented', description: 'No multi-factor authentication in use' },
                { value: 1, label: 'Limited MFA deployment', description: 'MFA for some systems but not comprehensive' },
                { value: 2, label: 'Standard MFA implementation', description: 'MFA required for administrative access' },
                { value: 3, label: 'Comprehensive MFA program', description: 'MFA for all privileged access with risk-based authentication' }
              ]
            },
            {
              id: 'hecvat.infra.access.2',
              text: 'Do you implement role-based access controls (RBAC) for your systems?',
              guidance: 'Role-based access controls help ensure users have appropriate access based on their job functions.',
              priority: 'medium',
              references: ['HECVAT Access Controls'],
              examples: ['Role definitions', 'Access matrices', 'Privilege escalation procedures', 'Access reviews'],
              options: [
                { value: 0, label: 'No RBAC implementation', description: 'No formal role-based access controls' },
                { value: 1, label: 'Basic access controls', description: 'Some role-based controls but not systematic' },
                { value: 2, label: 'Standard RBAC implementation', description: 'Well-defined roles with appropriate access controls' },
                { value: 3, label: 'Advanced access management', description: 'Comprehensive RBAC with automated provisioning and regular reviews' }
              ]
            }
          ]
        },
        {
          id: 'encryption-cryptography',
          name: 'Encryption and Cryptography',
          description: 'Data encryption in transit and at rest',
          weight: 20,
          questions: [
            {
              id: 'hecvat.infra.encryption.1',
              text: 'Do you encrypt data in transit using industry-standard protocols?',
              guidance: 'Encryption in transit protects data from interception during transmission.',
              priority: 'high',
              references: ['HECVAT Data Protection'],
              examples: ['TLS/SSL implementations', 'VPN configurations', 'Secure protocols', 'Certificate management'],
              options: [
                { value: 0, label: 'No encryption in transit', description: 'Data transmitted without encryption' },
                { value: 1, label: 'Limited encryption', description: 'Some encrypted channels but not comprehensive' },
                { value: 2, label: 'Standard encryption protocols', description: 'Industry-standard encryption for most data transmission' },
                { value: 3, label: 'Advanced encryption implementation', description: 'Comprehensive encryption with strong protocols and key management' }
              ]
            },
            {
              id: 'hecvat.infra.encryption.2',
              text: 'Do you encrypt sensitive data at rest?',
              guidance: 'Encryption at rest protects stored data from unauthorized access.',
              priority: 'high',
              references: ['HECVAT Data Protection'],
              examples: ['Database encryption', 'File system encryption', 'Key management systems', 'Encrypted backups'],
              options: [
                { value: 0, label: 'No encryption at rest', description: 'Stored data is not encrypted' },
                { value: 1, label: 'Limited data encryption', description: 'Some sensitive data encrypted but not comprehensive' },
                { value: 2, label: 'Standard encryption at rest', description: 'Most sensitive data encrypted with appropriate key management' },
                { value: 3, label: 'Comprehensive data encryption', description: 'All sensitive data encrypted with advanced key management and HSMs' }
              ]
            }
          ]
        },
        {
          id: 'system-hardening',
          name: 'System Hardening and Configuration',
          description: 'Secure configuration and hardening of systems and applications',
          weight: 15,
          questions: [
            {
              id: 'hecvat.infra.hardening.1',
              text: 'Do you follow secure configuration standards for all systems and applications?',
              guidance: 'Secure configuration standards help reduce attack surface and ensure consistent security across all systems.',
              priority: 'medium',
              references: ['HECVAT Infrastructure Security'],
              examples: ['Configuration baselines', 'Hardening checklists', 'Security benchmarks', 'Configuration management tools'],
              options: [
                { value: 0, label: 'No configuration standards', description: 'No formal secure configuration practices' },
                { value: 1, label: 'Basic configuration practices', description: 'Some secure configuration but not systematic' },
                { value: 2, label: 'Standard configuration management', description: 'Documented standards with regular compliance checks' },
                { value: 3, label: 'Advanced configuration automation', description: 'Automated configuration management with continuous compliance monitoring' }
              ]
            }
          ]
        },
        {
          id: 'monitoring-logging',
          name: 'Security Monitoring and Logging',
          description: 'Security event monitoring, logging, and incident detection',
          weight: 20,
          questions: [
            {
              id: 'hecvat.infra.monitoring.1',
              text: 'Do you maintain comprehensive security logs and monitoring?',
              guidance: 'Security logging and monitoring are essential for detecting and responding to security incidents.',
              priority: 'high',
              references: ['HECVAT Monitoring'],
              examples: ['Log management systems', 'Security event monitoring', 'SIEM implementations', 'Log retention policies'],
              options: [
                { value: 0, label: 'No security logging', description: 'No systematic security logging or monitoring' },
                { value: 1, label: 'Basic logging capabilities', description: 'Some logging but limited monitoring and analysis' },
                { value: 2, label: 'Standard logging and monitoring', description: 'Good logging coverage with regular monitoring' },
                { value: 3, label: 'Advanced security analytics', description: 'Comprehensive logging with advanced analytics and automated alerting' }
              ]
            }
          ]
        }
      ]
    },
    {
      id: 'product-security',
      name: 'Product and Application Security',
      description: 'Secure development practices, application security testing, and vulnerability management',
      weight: 15,
      priority: 'high',
      categories: [
        {
          id: 'secure-development',
          name: 'Secure Development Lifecycle',
          description: 'Security practices integrated into software development processes',
          weight: 40,
          questions: [
            {
              id: 'hecvat.product.development.1',
              text: 'Do you have a secure software development lifecycle (SDLC) process?',
              guidance: 'Secure SDLC ensures security is considered throughout the development process, from design to deployment.',
              priority: 'high',
              references: ['HECVAT Product Security'],
              examples: ['Security requirements documentation', 'Threat modeling processes', 'Security code reviews', 'Security testing integration'],
              options: [
                { value: 0, label: 'No secure SDLC', description: 'No formal security integration in development process' },
                { value: 1, label: 'Basic security practices', description: 'Some security considerations but not systematic' },
                { value: 2, label: 'Standard secure SDLC', description: 'Documented secure development practices with regular implementation' },
                { value: 3, label: 'Advanced secure SDLC', description: 'Comprehensive security integration with automated security testing' }
              ]
            },
            {
              id: 'hecvat.product.development.2',
              text: 'Do you perform security code reviews for all applications?',
              guidance: 'Security code reviews help identify vulnerabilities before code is deployed to production.',
              priority: 'high',
              references: ['HECVAT Product Security'],
              examples: ['Code review procedures', 'Security review checklists', 'Static analysis tools', 'Review documentation'],
              options: [
                { value: 0, label: 'No security code reviews', description: 'No formal security review of code' },
                { value: 1, label: 'Ad hoc security reviews', description: 'Occasional security reviews but not systematic' },
                { value: 2, label: 'Regular security code reviews', description: 'Security reviews for major releases and changes' },
                { value: 3, label: 'Comprehensive security review process', description: 'All code reviewed for security with automated tools and manual review' }
              ]
            }
          ]
        },
        {
          id: 'application-security-testing',
          name: 'Application Security Testing',
          description: 'Security testing methodologies and vulnerability assessments',
          weight: 35,
          questions: [
            {
              id: 'hecvat.product.testing.1',
              text: 'Do you perform regular security testing of your applications (e.g., SAST, DAST, penetration testing)?',
              guidance: 'Regular security testing helps identify vulnerabilities before they can be exploited by attackers.',
              priority: 'high',
              references: ['HECVAT Product Security'],
              examples: ['Static code analysis', 'Dynamic application testing', 'Penetration test reports', 'Vulnerability scan results'],
              options: [
                { value: 0, label: 'No security testing', description: 'No formal security testing of applications' },
                { value: 1, label: 'Ad hoc security testing', description: 'Occasional security testing but not systematic' },
                { value: 2, label: 'Regular security testing', description: 'Scheduled security testing with documented results' },
                { value: 3, label: 'Continuous security testing', description: 'Automated security testing integrated into CI/CD pipeline' }
              ]
            },
            {
              id: 'hecvat.product.testing.2',
              text: 'Do you conduct penetration testing of your applications and infrastructure?',
              guidance: 'Penetration testing provides real-world assessment of security controls and identifies exploitable vulnerabilities.',
              priority: 'medium',
              references: ['HECVAT Product Security'],
              examples: ['Penetration test reports', 'Testing schedules', 'Remediation tracking', 'Third-party testing'],
              options: [
                { value: 0, label: 'No penetration testing', description: 'No penetration testing performed' },
                { value: 1, label: 'Infrequent penetration testing', description: 'Occasional penetration testing but not regular' },
                { value: 2, label: 'Annual penetration testing', description: 'Regular annual penetration testing with remediation' },
                { value: 3, label: 'Comprehensive penetration testing program', description: 'Regular penetration testing with continuous improvement and threat simulation' }
              ]
            }
          ]
        },
        {
          id: 'vulnerability-management',
          name: 'Vulnerability Management',
          description: 'Processes for identifying, assessing, and remediating security vulnerabilities',
          weight: 25,
          questions: [
            {
              id: 'hecvat.product.vulnerability.1',
              text: 'Do you have a formal vulnerability management program with defined SLAs for remediation?',
              guidance: 'Formal vulnerability management ensures timely identification and remediation of security vulnerabilities.',
              priority: 'high',
              references: ['HECVAT Product Security'],
              examples: ['Vulnerability scanning schedules', 'Remediation SLAs', 'Risk-based prioritization', 'Patch management processes'],
              options: [
                { value: 0, label: 'No vulnerability management', description: 'No formal process for managing vulnerabilities' },
                { value: 1, label: 'Basic vulnerability tracking', description: 'Some vulnerability identification but no formal program' },
                { value: 2, label: 'Standard vulnerability program', description: 'Documented program with defined processes and timelines' },
                { value: 3, label: 'Advanced vulnerability management', description: 'Comprehensive program with automation and risk-based prioritization' }
              ]
            }
          ]
        }
      ]
    },
    {
      id: 'privacy-data-protection',
      name: 'Privacy and Data Protection',
      description: 'Data privacy controls, consent management, and regulatory compliance',
      weight: 20,
      priority: 'high',
      categories: [
        {
          id: 'data-governance',
          name: 'Data Governance and Classification',
          description: 'Data classification, inventory, and governance frameworks',
          weight: 25,
          questions: [
            {
              id: 'hecvat.privacy.governance.1',
              text: 'Do you maintain a comprehensive data inventory and classification system?',
              guidance: 'Data inventory and classification help ensure appropriate protection measures are applied based on data sensitivity.',
              priority: 'high',
              references: ['HECVAT Privacy'],
              examples: ['Data flow diagrams', 'Data classification policies', 'Data inventories', 'Sensitivity labels'],
              options: [
                { value: 0, label: 'No data inventory', description: 'No systematic tracking or classification of data' },
                { value: 1, label: 'Basic data tracking', description: 'Some data identification but not comprehensive' },
                { value: 2, label: 'Standard data inventory', description: 'Good data inventory with basic classification' },
                { value: 3, label: 'Comprehensive data governance', description: 'Complete data inventory with detailed classification and automated tracking' }
              ]
            },
            {
              id: 'hecvat.privacy.governance.2',
              text: 'Do you have documented data retention and disposal policies?',
              guidance: 'Clear data retention policies help minimize data exposure and ensure compliance with regulatory requirements.',
              priority: 'high',
              references: ['HECVAT Privacy'],
              examples: ['Retention schedules', 'Secure disposal procedures', 'Data lifecycle management', 'Compliance documentation'],
              options: [
                { value: 0, label: 'No retention policies', description: 'No formal data retention or disposal procedures' },
                { value: 1, label: 'Basic retention guidelines', description: 'Some retention practices but not well-documented' },
                { value: 2, label: 'Documented retention policies', description: 'Clear policies with defined retention periods and disposal procedures' },
                { value: 3, label: 'Automated retention management', description: 'Comprehensive policies with automated enforcement and compliance monitoring' }
              ]
            },
            {
              id: 'hecvat.privacy.governance.3',
              text: 'Does your organization have a data privacy policy?',
              guidance: 'Data privacy policies establish the foundation for privacy protection and regulatory compliance.',
              priority: 'high',
              references: ['HECVAT DOCU-06'],
              examples: ['Privacy policy documentation', 'Policy updates and versions', 'Staff training on privacy policies'],
              options: [
                { value: 0, label: 'No privacy policy', description: 'No formal data privacy policy exists' },
                { value: 1, label: 'Basic privacy policy', description: 'Privacy policy exists but may be outdated or incomplete' },
                { value: 2, label: 'Current privacy policy', description: 'Up-to-date privacy policy covering key privacy requirements' },
                { value: 3, label: 'Comprehensive privacy framework', description: 'Detailed privacy policy with regular updates and comprehensive coverage' }
              ]
            }
          ]
        },
        {
          id: 'regulatory-compliance',
          name: 'Privacy Regulatory Compliance',
          description: 'Compliance with privacy regulations like GDPR, CCPA, FERPA',
          weight: 20,
          questions: [
            {
              id: 'hecvat.privacy.regulatory.1',
              text: 'Do you comply with applicable privacy regulations (GDPR, CCPA, FERPA, etc.)?',
              guidance: 'Compliance with privacy regulations is essential for protecting individual rights and avoiding regulatory penalties.',
              priority: 'high',
              references: ['HECVAT Privacy Compliance'],
              examples: ['Compliance assessments', 'Data protection impact assessments', 'Privacy by design implementations'],
              options: [
                { value: 0, label: 'No regulatory compliance program', description: 'No formal compliance with privacy regulations' },
                { value: 1, label: 'Basic compliance efforts', description: 'Some compliance activities but not comprehensive' },
                { value: 2, label: 'Standard compliance program', description: 'Good compliance program covering applicable regulations' },
                { value: 3, label: 'Comprehensive regulatory compliance', description: 'Full compliance program with regular assessments and continuous improvement' }
              ]
            },
            {
              id: 'hecvat.privacy.regulatory.2',
              text: 'Do you conduct privacy impact assessments for new systems or data processing activities?',
              guidance: 'Privacy impact assessments help identify and mitigate privacy risks before implementation.',
              priority: 'medium',
              references: ['HECVAT Privacy'],
              examples: ['PIA procedures', 'Assessment templates', 'Risk mitigation plans', 'Approval processes'],
              options: [
                { value: 0, label: 'No privacy impact assessments', description: 'No formal privacy impact assessment process' },
                { value: 1, label: 'Ad hoc privacy assessments', description: 'Occasional privacy assessments but not systematic' },
                { value: 2, label: 'Regular privacy impact assessments', description: 'PIAs conducted for major changes and new systems' },
                { value: 3, label: 'Comprehensive PIA program', description: 'Systematic PIAs with detailed risk assessment and mitigation tracking' }
              ]
            }
          ]
        },
        {
          id: 'consent-privacy-rights',
          name: 'Consent Management and Privacy Rights',
          description: 'Managing user consent and supporting individual privacy rights',
          weight: 25,
          questions: [
            {
              id: 'hecvat.privacy.consent.1',
              text: 'Do you have mechanisms to obtain, track, and manage user consent for data processing?',
              guidance: 'Effective consent management ensures compliance with privacy regulations and respects user preferences.',
              priority: 'high',
              references: ['HECVAT Privacy'],
              examples: ['Consent management platforms', 'Privacy notices', 'Consent tracking systems', 'Withdrawal mechanisms'],
              options: [
                { value: 0, label: 'No consent management', description: 'No formal mechanisms for managing user consent' },
                { value: 1, label: 'Basic consent collection', description: 'Some consent collection but not comprehensive tracking' },
                { value: 2, label: 'Standard consent management', description: 'Good consent processes with tracking capabilities' },
                { value: 3, label: 'Advanced consent platform', description: 'Comprehensive consent management with granular controls and audit trails' }
              ]
            },
            {
              id: 'hecvat.privacy.consent.2',
              text: 'Do you support individual privacy rights (e.g., access, correction, deletion requests)?',
              guidance: 'Supporting privacy rights is required by many regulations and demonstrates commitment to privacy protection.',
              priority: 'high',
              references: ['HECVAT Privacy'],
              examples: ['Data subject request procedures', 'Identity verification processes', 'Response time tracking', 'Rights management systems'],
              options: [
                { value: 0, label: 'No privacy rights support', description: 'No formal process for handling privacy rights requests' },
                { value: 1, label: 'Basic rights handling', description: 'Some capability to handle requests but not systematic' },
                { value: 2, label: 'Standard rights management', description: 'Documented processes with reasonable response times' },
                { value: 3, label: 'Advanced rights automation', description: 'Automated systems for handling rights requests with full compliance tracking' }
              ]
            }
          ]
        },
        {
          id: 'data-transfers',
          name: 'International Data Transfers',
          description: 'Mechanisms for international data transfers and cross-border data protection',
          weight: 15,
          questions: [
            {
              id: 'hecvat.privacy.transfers.1',
              text: 'Do you have appropriate safeguards for international data transfers?',
              guidance: 'International data transfers must comply with privacy laws and include appropriate safeguards.',
              priority: 'medium',
              references: ['HECVAT Privacy'],
              examples: ['Standard contractual clauses', 'Adequacy decisions', 'Binding corporate rules', 'Transfer impact assessments'],
              options: [
                { value: 0, label: 'No transfer safeguards', description: 'No formal safeguards for international data transfers' },
                { value: 1, label: 'Basic transfer protections', description: 'Some transfer protections but not comprehensive' },
                { value: 2, label: 'Standard transfer mechanisms', description: 'Appropriate safeguards using recognized transfer mechanisms' },
                { value: 3, label: 'Comprehensive transfer governance', description: 'Full transfer governance with regular assessments and multiple safeguards' }
              ]
            }
          ]
        },
        {
          id: 'breach-incident-response',
          name: 'Data Breach and Incident Response',
          description: 'Procedures for detecting, responding to, and reporting data breaches',
          weight: 15,
          questions: [
            {
              id: 'hecvat.privacy.incident.1',
              text: 'Do you have a documented data breach response plan with notification procedures?',
              guidance: 'Data breach response plans help ensure rapid response and appropriate notifications to affected parties and regulators.',
              priority: 'high',
              references: ['HECVAT Privacy'],
              examples: ['Incident response procedures', 'Notification timelines', 'Communication templates', 'Regulatory reporting processes'],
              options: [
                { value: 0, label: 'No breach response plan', description: 'No formal data breach response procedures' },
                { value: 1, label: 'Basic incident procedures', description: 'Some incident response capability but not comprehensive' },
                { value: 2, label: 'Standard breach response plan', description: 'Documented plan with notification procedures and timelines' },
                { value: 3, label: 'Advanced breach response program', description: 'Comprehensive plan with automated detection, escalation, and notification systems' }
              ]
            }
          ]
        }
      ]
    },
    {
      id: 'case-specific-requirements',
      name: 'Case-Specific Regulatory Requirements',
      description: 'Specialized requirements for HIPAA, PCI DSS, and other industry-specific regulations',
      weight: 15,
      priority: 'high',
      categories: [
        {
          id: 'hipaa-compliance',
          name: 'HIPAA Compliance',
          description: 'Health Insurance Portability and Accountability Act requirements',
          weight: 35,
          questions: [
            {
              id: 'hecvat.case.hipaa.1',
              text: 'Does your solution process protected health information (PHI) or any data covered by the Health Insurance Portability and Accountability Act (HIPAA)?',
              guidance: 'Organizations handling PHI must comply with HIPAA Security and Privacy Rules.',
              priority: 'high',
              references: ['HECVAT REQU-05'],
              examples: ['PHI data flows', 'HIPAA risk assessments', 'Business associate agreements'],
              options: [
                { value: 0, label: 'No PHI processing', description: 'Solution does not process any protected health information' },
                { value: 1, label: 'Limited PHI exposure', description: 'Minimal or indirect exposure to PHI' },
                { value: 2, label: 'Regular PHI processing', description: 'Solution regularly processes PHI with appropriate safeguards' },
                { value: 3, label: 'Comprehensive HIPAA compliance', description: 'Full HIPAA compliance program with BAAs and regular assessments' }
              ]
            },
            {
              id: 'hecvat.case.hipaa.2',
              text: 'Do you have Business Associate Agreements (BAAs) in place for HIPAA compliance?',
              guidance: 'BAAs are required when third parties handle PHI on behalf of covered entities.',
              priority: 'high',
              references: ['HECVAT HIPAA'],
              examples: ['Signed BAAs', 'HIPAA compliance attestations', 'Subcontractor agreements'],
              options: [
                { value: 0, label: 'No BAAs in place', description: 'No Business Associate Agreements executed' },
                { value: 1, label: 'Some BAAs executed', description: 'BAAs in place for some relationships but not comprehensive' },
                { value: 2, label: 'Standard BAA program', description: 'BAAs in place for all required relationships' },
                { value: 3, label: 'Comprehensive HIPAA contracting', description: 'Full BAA program with regular reviews and compliance monitoring' }
              ]
            },
            {
              id: 'hecvat.case.hipaa.3',
              text: 'Do you implement HIPAA Security Rule administrative, physical, and technical safeguards?',
              guidance: 'HIPAA Security Rule requires specific safeguards for protecting electronic PHI.',
              priority: 'high',
              references: ['HECVAT HIPAA Security'],
              examples: ['Security policies', 'Access controls', 'Audit logs', 'Encryption implementations'],
              options: [
                { value: 0, label: 'No HIPAA safeguards', description: 'No specific HIPAA Security Rule safeguards implemented' },
                { value: 1, label: 'Partial safeguards implementation', description: 'Some HIPAA safeguards but not comprehensive' },
                { value: 2, label: 'Standard HIPAA compliance', description: 'Most required HIPAA safeguards implemented' },
                { value: 3, label: 'Comprehensive HIPAA security program', description: 'Full implementation of all HIPAA Security Rule requirements' }
              ]
            }
          ]
        },
        {
          id: 'pci-compliance',
          name: 'PCI DSS Compliance',
          description: 'Payment Card Industry Data Security Standard requirements',
          weight: 30,
          questions: [
            {
              id: 'hecvat.case.pci.1',
              text: 'Is the solution designed to process, store, or transmit credit card information?',
              guidance: 'Systems handling cardholder data must comply with PCI DSS requirements.',
              priority: 'high',
              references: ['HECVAT REQU-06'],
              examples: ['Payment processing flows', 'PCI DSS assessments', 'Card data environments'],
              options: [
                { value: 0, label: 'No card data processing', description: 'Solution does not handle credit card information' },
                { value: 1, label: 'Limited card data exposure', description: 'Minimal or indirect exposure to cardholder data' },
                { value: 2, label: 'Regular card data processing', description: 'Solution processes cardholder data with PCI controls' },
                { value: 3, label: 'Full PCI DSS compliance', description: 'Complete PCI DSS compliance with regular assessments' }
              ]
            },
            {
              id: 'hecvat.case.pci.2',
              text: 'Do you maintain PCI DSS compliance certification?',
              guidance: 'PCI DSS compliance must be validated through appropriate assessment methods.',
              priority: 'high',
              references: ['HECVAT PCI'],
              examples: ['PCI compliance certificates', 'AOC documents', 'QSA assessments', 'SAQ completions'],
              options: [
                { value: 0, label: 'No PCI certification', description: 'No PCI DSS compliance certification maintained' },
                { value: 1, label: 'Working toward compliance', description: 'PCI compliance efforts in progress but not certified' },
                { value: 2, label: 'Current PCI certification', description: 'Valid PCI DSS compliance certification maintained' },
                { value: 3, label: 'Advanced PCI program', description: 'Comprehensive PCI program with continuous compliance monitoring' }
              ]
            }
          ]
        },
        {
          id: 'ferpa-compliance',
          name: 'FERPA Compliance',
          description: 'Family Educational Rights and Privacy Act requirements',
          weight: 25,
          questions: [
            {
              id: 'hecvat.case.ferpa.1',
              text: 'Does your solution process student education records covered by FERPA?',
              guidance: 'Solutions handling education records must comply with FERPA privacy requirements.',
              priority: 'high',
              references: ['HECVAT FERPA'],
              examples: ['Education record data flows', 'FERPA compliance policies', 'Directory information controls'],
              options: [
                { value: 0, label: 'No education records', description: 'Solution does not process student education records' },
                { value: 1, label: 'Limited education data', description: 'Minimal exposure to education records' },
                { value: 2, label: 'Regular education records processing', description: 'Solution processes education records with FERPA controls' },
                { value: 3, label: 'Comprehensive FERPA compliance', description: 'Full FERPA compliance program with appropriate safeguards' }
              ]
            }
          ]
        },
        {
          id: 'physical-appliances',
          name: 'Physical and Virtual Appliances',
          description: 'Security requirements for on-premises appliances and remote administration',
          weight: 10,
          questions: [
            {
              id: 'hecvat.case.appliance.1',
              text: 'Does operating your solution require the institution to operate a physical or virtual appliance in their own environment or to provide inbound firewall exceptions to allow your employees to remotely administer systems in the institution\'s environment?',
              guidance: 'On-premises appliances and remote administration introduce additional security considerations.',
              priority: 'medium',
              references: ['HECVAT REQU-07'],
              examples: ['Appliance security documentation', 'Remote access procedures', 'Firewall requirements'],
              options: [
                { value: 0, label: 'Cloud-only solution', description: 'Solution operates entirely in vendor cloud environment' },
                { value: 1, label: 'Minimal on-premises components', description: 'Some on-premises components with limited access requirements' },
                { value: 2, label: 'Standard appliance deployment', description: 'On-premises appliances with documented security controls' },
                { value: 3, label: 'Secure appliance program', description: 'Comprehensive security for on-premises components with hardened configurations' }
              ]
            }
          ]
        }
      ]
    },
    {
      id: 'accessibility-compliance',
      name: 'IT Accessibility Compliance',
      description: 'Accessibility standards compliance including ADA, Section 508, and WCAG',
      weight: 5,
      priority: 'medium',
      categories: [
        {
          id: 'wcag-compliance',
          name: 'WCAG and Accessibility Standards',
          description: 'Web Content Accessibility Guidelines and related accessibility standards',
          weight: 60,
          questions: [
            {
              id: 'hecvat.access.wcag.1',
              text: 'Does your product or service have an interface?',
              guidance: 'Products with user interfaces must consider accessibility requirements for compliance with ADA and Section 508.',
              priority: 'medium',
              references: ['HECVAT REQU-02'],
              examples: ['User interface documentation', 'Accessibility testing reports', 'WCAG compliance assessments'],
              options: [
                { value: 0, label: 'No user interface', description: 'Product has no user-facing interface' },
                { value: 1, label: 'Limited interface', description: 'Basic interface with minimal user interaction' },
                { value: 2, label: 'Standard interface', description: 'Full user interface with accessibility considerations' },
                { value: 3, label: 'Fully accessible interface', description: 'Interface designed with comprehensive accessibility features' }
              ]
            },
            {
              id: 'hecvat.access.wcag.2',
              text: 'Do you comply with WCAG 2.1 Level AA accessibility standards?',
              guidance: 'WCAG 2.1 Level AA is the standard for accessibility compliance in higher education.',
              priority: 'high',
              references: ['HECVAT Accessibility'],
              examples: ['WCAG compliance testing', 'Accessibility audit reports', 'Remediation plans'],
              options: [
                { value: 0, label: 'No WCAG compliance', description: 'No formal WCAG compliance program' },
                { value: 1, label: 'Basic accessibility features', description: 'Some accessibility features but not comprehensive WCAG compliance' },
                { value: 2, label: 'WCAG 2.1 AA compliance', description: 'Substantial compliance with WCAG 2.1 Level AA' },
                { value: 3, label: 'Advanced accessibility program', description: 'Comprehensive accessibility program exceeding WCAG requirements' }
              ]
            },
            {
              id: 'hecvat.access.wcag.3',
              text: 'Do you perform regular accessibility testing and auditing?',
              guidance: 'Regular accessibility testing helps ensure ongoing compliance and identifies issues for remediation.',
              priority: 'medium',
              references: ['HECVAT Accessibility'],
              examples: ['Automated accessibility testing', 'Manual accessibility audits', 'User testing with assistive technologies'],
              options: [
                { value: 0, label: 'No accessibility testing', description: 'No formal accessibility testing program' },
                { value: 1, label: 'Ad hoc accessibility testing', description: 'Occasional accessibility testing but not systematic' },
                { value: 2, label: 'Regular accessibility auditing', description: 'Scheduled accessibility testing and auditing' },
                { value: 3, label: 'Continuous accessibility monitoring', description: 'Automated and manual accessibility testing integrated into development process' }
              ]
            }
          ]
        },
        {
          id: 'assistive-technology',
          name: 'Assistive Technology Support',
          description: 'Support for screen readers and other assistive technologies',
          weight: 40,
          questions: [
            {
              id: 'hecvat.access.assistive.1',
              text: 'Do you test your interface with common assistive technologies (screen readers, voice recognition, etc.)?',
              guidance: 'Testing with assistive technologies ensures real-world accessibility for users with disabilities.',
              priority: 'medium',
              references: ['HECVAT Accessibility'],
              examples: ['Screen reader testing', 'Voice recognition testing', 'Keyboard navigation testing'],
              options: [
                { value: 0, label: 'No assistive technology testing', description: 'No testing with assistive technologies' },
                { value: 1, label: 'Limited assistive technology testing', description: 'Some testing but not comprehensive' },
                { value: 2, label: 'Regular assistive technology testing', description: 'Testing with major assistive technologies' },
                { value: 3, label: 'Comprehensive assistive technology program', description: 'Extensive testing with multiple assistive technologies and user feedback' }
              ]
            }
          ]
        }
      ]
    },
    {
      id: 'ai-governance',
      name: 'AI Governance and Ethics',
      description: 'Governance frameworks for AI systems including bias management, transparency, and ethical use',
      weight: 10,
      priority: 'medium',
      categories: [
        {
          id: 'ai-risk-management',
          name: 'AI Risk Management',
          description: 'Identifying and managing risks associated with AI systems',
          weight: 40,
          questions: [
            {
              id: 'hecvat.ai.risk.1',
              text: 'Does your solution have AI features, or are there plans to implement AI features in the next 12 months?',
              guidance: 'AI features require additional governance and risk management considerations.',
              priority: 'medium',
              references: ['HECVAT REQU-04'],
              examples: ['AI feature documentation', 'AI risk assessments', 'AI governance policies'],
              options: [
                { value: 0, label: 'No AI features', description: 'Solution has no AI capabilities and no plans for AI' },
                { value: 1, label: 'Limited AI features', description: 'Basic AI features or plans for implementation' },
                { value: 2, label: 'Standard AI implementation', description: 'AI features with appropriate governance' },
                { value: 3, label: 'Advanced AI governance', description: 'Comprehensive AI program with robust governance and risk management' }
              ]
            },
            {
              id: 'hecvat.ai.risk.2',
              text: 'Do you have a documented AI governance framework that addresses bias, fairness, and transparency?',
              guidance: 'AI governance frameworks help ensure responsible AI development and deployment while managing associated risks.',
              priority: 'medium',
              references: ['HECVAT AI'],
              examples: ['AI ethics policies', 'Bias testing procedures', 'Algorithmic audits', 'Transparency reports'],
              options: [
                { value: 0, label: 'No AI governance', description: 'No formal AI governance or risk management framework' },
                { value: 1, label: 'Basic AI guidelines', description: 'Some AI guidance but not comprehensive governance' },
                { value: 2, label: 'Standard AI governance', description: 'Documented framework addressing key AI risks and ethics' },
                { value: 3, label: 'Advanced AI governance program', description: 'Comprehensive governance with continuous monitoring and improvement' }
              ]
            },
            {
              id: 'hecvat.ai.risk.3',
              text: 'Do you perform regular testing and monitoring of AI systems for bias and performance degradation?',
              guidance: 'Regular testing helps ensure AI systems continue to perform fairly and accurately over time.',
              priority: 'medium',
              references: ['HECVAT AI'],
              examples: ['Bias testing reports', 'Performance monitoring dashboards', 'Model validation procedures', 'Fairness metrics'],
              options: [
                { value: 0, label: 'No AI testing', description: 'No systematic testing of AI systems for bias or performance' },
                { value: 1, label: 'Basic AI monitoring', description: 'Some monitoring but not comprehensive or regular' },
                { value: 2, label: 'Regular AI testing', description: 'Scheduled testing with documented results and remediation' },
                { value: 3, label: 'Continuous AI monitoring', description: 'Automated continuous monitoring with real-time bias and performance tracking' }
              ]
            }
          ]
        },
        {
          id: 'ai-transparency',
          name: 'AI Transparency and Explainability',
          description: 'Providing transparency and explainability for AI-driven decisions',
          weight: 35,
          questions: [
            {
              id: 'hecvat.ai.transparency.1',
              text: 'Do you provide clear documentation about how your AI systems make decisions?',
              guidance: 'AI transparency helps users understand how decisions are made and builds trust in AI systems.',
              priority: 'medium',
              references: ['HECVAT AI'],
              examples: ['Algorithm documentation', 'Decision logic explanations', 'Feature importance reports', 'User-facing explanations'],
              options: [
                { value: 0, label: 'No AI transparency', description: 'No documentation or explanation of AI decision-making' },
                { value: 1, label: 'Basic AI documentation', description: 'Some documentation but not comprehensive or user-friendly' },
                { value: 2, label: 'Standard AI transparency', description: 'Good documentation with clear explanations for key stakeholders' },
                { value: 3, label: 'Advanced AI explainability', description: 'Comprehensive transparency with user-friendly explanations and interactive tools' }
              ]
            },
            {
              id: 'hecvat.ai.transparency.2',
              text: 'Do you disclose when AI is being used to make decisions that affect users?',
              guidance: 'Users have a right to know when AI systems are making decisions that affect them.',
              priority: 'medium',
              references: ['HECVAT AI'],
              examples: ['AI disclosure notices', 'User interface indicators', 'Terms of service disclosures'],
              options: [
                { value: 0, label: 'No AI disclosure', description: 'Users are not informed when AI makes decisions' },
                { value: 1, label: 'Limited AI disclosure', description: 'Some disclosure but not comprehensive' },
                { value: 2, label: 'Standard AI transparency', description: 'Clear disclosure when AI affects user decisions' },
                { value: 3, label: 'Comprehensive AI transparency', description: 'Full transparency with detailed explanations and user controls' }
              ]
            }
          ]
        },
        {
          id: 'ai-data-management',
          name: 'AI Data Management',
          description: 'Data governance and privacy considerations for AI systems',
          weight: 25,
          questions: [
            {
              id: 'hecvat.ai.data.1',
              text: 'Do you have appropriate data governance for AI training and inference data?',
              guidance: 'AI systems require careful data governance to ensure quality, privacy, and compliance.',
              priority: 'medium',
              references: ['HECVAT AI'],
              examples: ['Training data policies', 'Data quality procedures', 'Privacy-preserving AI techniques'],
              options: [
                { value: 0, label: 'No AI data governance', description: 'No specific governance for AI data usage' },
                { value: 1, label: 'Basic data controls', description: 'Some data governance but not AI-specific' },
                { value: 2, label: 'Standard AI data governance', description: 'Appropriate governance for AI data usage' },
                { value: 3, label: 'Advanced AI data management', description: 'Comprehensive data governance with privacy-preserving techniques' }
              ]
            }
          ]
        }
      ]
    }
  ]
};