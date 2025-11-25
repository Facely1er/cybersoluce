import React from 'react';
import { Lock, Shield, FileText, Database, Globe, AlertTriangle } from 'lucide-react';

const PrivacyPage = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Privacy Policy</h1>
        <Lock className="h-8 w-8 text-blue-600 dark:text-blue-400" />
      </div>
      
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-8 mb-8">
        <div className="prose dark:prose-invert max-w-none">
          <p className="text-gray-600 dark:text-gray-300">
            Last updated: {new Date().toLocaleDateString('en-US', {
              year: 'numeric',
              month: 'long',
              day: 'numeric'
            })}
          </p>
          
          <section className="mt-8">
            <h2 className="text-2xl font-semibold mb-4 text-gray-900 dark:text-white">1. Introduction</h2>
            <p className="text-gray-600 dark:text-gray-300">
              CyberSoluce ("we", "our", or "us") is committed to protecting your privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you use our security assessment platform ("the Platform").
            </p>
            <p className="text-gray-600 dark:text-gray-300 mt-2">
              We take data protection and privacy regulations seriously and have designed our Platform with privacy by design principles. This policy is designed to help you understand our practices regarding your information across different regions where we operate, including the European Union, North America, Asia-Pacific, and Latin America.
            </p>
          </section>

          <section className="mt-6">
            <h2 className="text-2xl font-semibold mb-4 text-gray-900 dark:text-white">2. Information We Collect</h2>
            
            <div className="pl-4 border-l-4 border-blue-200 dark:border-blue-800 mb-4">
              <h3 className="text-xl font-medium mb-2 text-gray-900 dark:text-white">2.1 Information You Provide</h3>
              <ul className="list-disc list-inside text-gray-600 dark:text-gray-300 space-y-1">
                <li><strong>Account Information:</strong> Name, email address, job title, organization name, and contact details provided during registration.</li>
                <li><strong>Assessment Data:</strong> Responses to security assessment questions, evidence uploads, notes, and comments provided during the assessment process.</li>
                <li><strong>Organization Information:</strong> Details about your organization's structure, systems, and security practices submitted for assessment purposes.</li>
                <li><strong>User Profiles:</strong> Information you provide in your user profile, including profile pictures, biographical information, and professional credentials.</li>
                <li><strong>Communication Data:</strong> Content of communications you send through the Platform, such as feedback, support requests, and questions.</li>
              </ul>
            </div>
            
            <div className="pl-4 border-l-4 border-blue-200 dark:border-blue-800">
              <h3 className="text-xl font-medium mb-2 text-gray-900 dark:text-white">2.2 Automatically Collected Information</h3>
              <ul className="list-disc list-inside text-gray-600 dark:text-gray-300 space-y-1">
                <li><strong>Usage Data:</strong> Information about how you use the Platform, including features accessed, time spent, actions performed, and navigation patterns.</li>
                <li><strong>Log Data:</strong> Server logs, IP addresses, device information, browser type and version, operating system, and timestamps.</li>
                <li><strong>Performance Data:</strong> Error reports, feature usage statistics, and performance metrics that help us improve the Platform.</li>
                <li><strong>Cookies and Similar Technologies:</strong> Information collected through cookies, web beacons, and similar technologies as detailed in our Cookie Policy.</li>
                <li><strong>Location Information:</strong> General location information derived from IP addresses for regional adaptation and compliance purposes.</li>
              </ul>
            </div>
          </section>

          <section className="mt-6">
            <h2 className="text-2xl font-semibold mb-4 text-gray-900 dark:text-white">3. How We Use Your Information</h2>
            <p className="text-gray-600 dark:text-gray-300">
              We use the information we collect for various purposes, including but not limited to:
            </p>
            <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-gray-50 dark:bg-gray-700/50 p-4 rounded-lg">
                <div className="flex items-start">
                  <Shield className="h-5 w-5 text-blue-600 dark:text-blue-400 mt-1 mr-2" />
                  <div>
                    <h4 className="font-medium text-gray-900 dark:text-white mb-1">Providing Services</h4>
                    <p className="text-sm text-gray-600 dark:text-gray-300">
                      To deliver the Platform functionality, process assessments, generate reports, and provide security recommendations.
                    </p>
                  </div>
                </div>
              </div>
              <div className="bg-gray-50 dark:bg-gray-700/50 p-4 rounded-lg">
                <div className="flex items-start">
                  <Globe className="h-5 w-5 text-blue-600 dark:text-blue-400 mt-1 mr-2" />
                  <div>
                    <h4 className="font-medium text-gray-900 dark:text-white mb-1">Regional Adaptation</h4>
                    <p className="text-sm text-gray-600 dark:text-gray-300">
                      To adapt the Platform to regional regulatory requirements and provide region-specific compliance guidance.
                    </p>
                  </div>
                </div>
              </div>
              <div className="bg-gray-50 dark:bg-gray-700/50 p-4 rounded-lg">
                <div className="flex items-start">
                  <FileText className="h-5 w-5 text-blue-600 dark:text-blue-400 mt-1 mr-2" />
                  <div>
                    <h4 className="font-medium text-gray-900 dark:text-white mb-1">Improving Services</h4>
                    <p className="text-sm text-gray-600 dark:text-gray-300">
                      To analyze usage patterns, troubleshoot issues, and enhance Platform features and functionality.
                    </p>
                  </div>
                </div>
              </div>
              <div className="bg-gray-50 dark:bg-gray-700/50 p-4 rounded-lg">
                <div className="flex items-start">
                  <Database className="h-5 w-5 text-blue-600 dark:text-blue-400 mt-1 mr-2" />
                  <div>
                    <h4 className="font-medium text-gray-900 dark:text-white mb-1">Security</h4>
                    <p className="text-sm text-gray-600 dark:text-gray-300">
                      To protect the Platform, detect and prevent unauthorized access, and ensure data integrity.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <section className="mt-6">
            <h2 className="text-2xl font-semibold mb-4 text-gray-900 dark:text-white">4. Data Protection and Security</h2>
            <p className="text-gray-600 dark:text-gray-300">
              We implement appropriate technical and organizational measures to protect the security, confidentiality, and integrity of your information. Our security measures include:
            </p>
            <ul className="list-disc list-inside text-gray-600 dark:text-gray-300 mt-2 space-y-1">
              <li>Encryption of data at rest and in transit</li>
              <li>Multi-factor authentication for platform access</li>
              <li>Regular security assessments and penetration testing</li>
              <li>Access controls and role-based permissions</li>
              <li>Audit logging and monitoring</li>
              <li>Incident response procedures</li>
              <li>Regional data storage to comply with data residency requirements</li>
            </ul>
          </section>

          <section className="mt-6">
            <h2 className="text-2xl font-semibold mb-4 text-gray-900 dark:text-white">5. Data Sharing and Disclosure</h2>
            <p className="text-gray-600 dark:text-gray-300">
              We may share your information in the following circumstances:
            </p>
            <div className="pl-4 border-l-4 border-blue-200 dark:border-blue-800 mt-4">
              <h3 className="text-xl font-medium mb-2 text-gray-900 dark:text-white">5.1 Service Providers</h3>
              <p className="text-gray-600 dark:text-gray-300">
                We may share your information with third-party service providers who perform services on our behalf, such as hosting, data analysis, payment processing, customer service, and marketing assistance. These providers are contractually obligated to safeguard your information and may only use it for the specific services they provide.
              </p>
            </div>
            <div className="pl-4 border-l-4 border-blue-200 dark:border-blue-800 mt-4">
              <h3 className="text-xl font-medium mb-2 text-gray-900 dark:text-white">5.2 Compliance and Legal Obligations</h3>
              <p className="text-gray-600 dark:text-gray-300">
                We may disclose your information to comply with applicable laws, regulations, legal processes, or governmental requests, including to meet national security or law enforcement requirements.
              </p>
            </div>
            <div className="pl-4 border-l-4 border-blue-200 dark:border-blue-800 mt-4">
              <h3 className="text-xl font-medium mb-2 text-gray-900 dark:text-white">5.3 Business Transfers</h3>
              <p className="text-gray-600 dark:text-gray-300">
                If we are involved in a merger, acquisition, financing, reorganization, bankruptcy, or sale of company assets, your information may be transferred as part of that transaction. We will notify you of any such change in ownership or control of your personal information.
              </p>
            </div>
            <div className="pl-4 border-l-4 border-blue-200 dark:border-blue-800 mt-4">
              <h3 className="text-xl font-medium mb-2 text-gray-900 dark:text-white">5.4 With Your Consent</h3>
              <p className="text-gray-600 dark:text-gray-300">
                We may share your information with third parties when we have your consent to do so.
              </p>
            </div>
          </section>

          <section className="mt-6">
            <h2 className="text-2xl font-semibold mb-4 text-gray-900 dark:text-white">6. Regional Data Protection Provisions</h2>
            
            <div className="pl-4 border-l-4 border-blue-200 dark:border-blue-800 mb-4">
              <h3 className="text-xl font-medium mb-2 text-gray-900 dark:text-white">6.1 European Economic Area (EEA), United Kingdom, and Switzerland</h3>
              <p className="text-gray-600 dark:text-gray-300">
                If you are located in the EEA, UK, or Switzerland, we comply with applicable data protection laws, including the General Data Protection Regulation (GDPR). We process your personal data based on legitimate interests, consent, contractual necessity, and legal obligations.
              </p>
              <p className="text-gray-600 dark:text-gray-300 mt-2">
                You have the following rights under the GDPR:
              </p>
              <ul className="list-disc list-inside text-gray-600 dark:text-gray-300 space-y-1 mt-2">
                <li>Right to access your personal data</li>
                <li>Right to rectification of inaccurate personal data</li>
                <li>Right to erasure of your personal data</li>
                <li>Right to restriction of processing</li>
                <li>Right to data portability</li>
                <li>Right to object to processing</li>
                <li>Rights relating to automated decision-making and profiling</li>
              </ul>
            </div>
            
            <div className="pl-4 border-l-4 border-blue-200 dark:border-blue-800 mb-4">
              <h3 className="text-xl font-medium mb-2 text-gray-900 dark:text-white">6.2 United States</h3>
              <p className="text-gray-600 dark:text-gray-300">
                We comply with applicable U.S. privacy laws, including the California Consumer Privacy Act (CCPA) and California Privacy Rights Act (CPRA) for California residents, and state-specific privacy laws as applicable.
              </p>
              <p className="text-gray-600 dark:text-gray-300 mt-2">
                California residents have specific rights regarding their personal information, including:
              </p>
              <ul className="list-disc list-inside text-gray-600 dark:text-gray-300 space-y-1 mt-2">
                <li>Right to know what personal information is collected</li>
                <li>Right to know whether personal information is sold or disclosed</li>
                <li>Right to say no to the sale of personal information</li>
                <li>Right to access personal information</li>
                <li>Right to request deletion of personal information</li>
                <li>Right to non-discrimination for exercising consumer rights</li>
              </ul>
            </div>
            
            <div className="pl-4 border-l-4 border-blue-200 dark:border-blue-800 mb-4">
              <h3 className="text-xl font-medium mb-2 text-gray-900 dark:text-white">6.3 Asia-Pacific Region</h3>
              <p className="text-gray-600 dark:text-gray-300">
                We comply with applicable data protection laws in the Asia-Pacific region, including China's Personal Information Protection Law (PIPL), Singapore's Personal Data Protection Act (PDPA), and Australia's Privacy Act, among others.
              </p>
              <p className="text-gray-600 dark:text-gray-300 mt-2">
                For users in China, we adhere to PIPL requirements, including obtaining separate consent for certain processing activities and implementing additional security measures for cross-border data transfers.
              </p>
            </div>
            
            <div className="pl-4 border-l-4 border-blue-200 dark:border-blue-800">
              <h3 className="text-xl font-medium mb-2 text-gray-900 dark:text-white">6.4 Latin America</h3>
              <p className="text-gray-600 dark:text-gray-300">
                We comply with applicable data protection laws in Latin America, including Brazil's Lei Geral de Proteção de Dados (LGPD) and similar regulations in other countries.
              </p>
              <p className="text-gray-600 dark:text-gray-300 mt-2">
                For users in Brazil, we adhere to LGPD requirements regarding the legal bases for processing, data subject rights, and transfer mechanisms.
              </p>
            </div>
          </section>

          <section className="mt-6">
            <h2 className="text-2xl font-semibold mb-4 text-gray-900 dark:text-white">7. Data Retention</h2>
            <p className="text-gray-600 dark:text-gray-300">
              We retain your information for as long as needed to provide you with the Platform services and to comply with our legal obligations, resolve disputes, and enforce our agreements. The retention period depends on the type of information, the purpose of collection, and legal requirements.
            </p>
            <p className="text-gray-600 dark:text-gray-300 mt-2">
              Assessment data is typically retained for the duration of your subscription plus an additional period to comply with audit and regulatory requirements. Account information is retained while your account is active and for a period afterward for legal and business purposes.
            </p>
          </section>

          <section className="mt-6">
            <h2 className="text-2xl font-semibold mb-4 text-gray-900 dark:text-white">8. Data Transfers</h2>
            <p className="text-gray-600 dark:text-gray-300">
              We may transfer, process, and store your information on servers located outside of your country of residence, including in the United States and other countries which may have different data protection laws than those in your jurisdiction.
            </p>
            <p className="text-gray-600 dark:text-gray-300 mt-2">
              For transfers from the EEA, UK, or Switzerland to countries not deemed to provide an adequate level of data protection, we implement appropriate safeguards such as Standard Contractual Clauses or rely on derogations applicable to specific situations.
            </p>
          </section>

          <section className="mt-6">
            <h2 className="text-2xl font-semibold mb-4 text-gray-900 dark:text-white">9. Your Choices and Rights</h2>
            <p className="text-gray-600 dark:text-gray-300">
              Depending on your location, you may have certain rights regarding your personal information. To exercise these rights, please contact us using the information provided in the "Contact Us" section below.
            </p>
            <p className="text-gray-600 dark:text-gray-300 mt-2">
              We will respond to your request within the timeframe required by applicable law. We may need to verify your identity before processing your request. In some cases, we may need to keep certain information for legitimate business or legal purposes.
            </p>
          </section>

          <section className="mt-6">
            <h2 className="text-2xl font-semibold mb-4 text-gray-900 dark:text-white">10. Children's Privacy</h2>
            <p className="text-gray-600 dark:text-gray-300">
              The Platform is not intended for use by children under the age of 16, and we do not knowingly collect personal information from children under 16. If we learn that we have collected personal information from a child under 16, we will take steps to delete this information as quickly as possible.
            </p>
          </section>

          <section className="mt-6">
            <h2 className="text-2xl font-semibold mb-4 text-gray-900 dark:text-white">11. Changes to This Privacy Policy</h2>
            <p className="text-gray-600 dark:text-gray-300">
              We may update this Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page and updating the "Last updated" date at the top. For significant changes, we will provide additional notice, such as a prominent statement on our homepage or an email notification.
            </p>
            <p className="text-gray-600 dark:text-gray-300 mt-2">
              We encourage you to review this Privacy Policy periodically to stay informed about how we are protecting your information.
            </p>
          </section>

          <section className="mt-6">
            <h2 className="text-2xl font-semibold mb-4 text-gray-900 dark:text-white">12. Contact Us</h2>
            <p className="text-gray-600 dark:text-gray-300">
              If you have any questions about this Privacy Policy or our data practices, please contact us at:
            </p>
            <p className="text-gray-600 dark:text-gray-300 mt-2">
              <strong>Data Protection Officer</strong><br />
              Email: privacy@ermits.com<br />
              Address: 8300 McCullough lane, Suite 203, Gaithersburg, MD 20877<br />
              Phone: +1 (240) 599-0102
            </p>
            <p className="text-gray-600 dark:text-gray-300 mt-2">
              For users in the European Union, our EU representative can be contacted at:
            </p>
            <p className="text-gray-600 dark:text-gray-300 mt-2">
              <strong>EU Representative</strong><br />
              Email: eu-privacy@ermits.com<br />
              Address:  Address: 8300 McCullough lane, Suite 203, Gaithersburg, MD 20877
            </p>
          </section>
        </div>
      </div>
      
      <div className="bg-blue-50 dark:bg-blue-900/30 rounded-lg p-6 border border-blue-100 dark:border-blue-800">
        <div className="flex items-start">
          <AlertTriangle className="h-6 w-6 text-blue-600 dark:text-blue-400 mt-1 mr-3" />
          <div>
            <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">Privacy Policy Disclaimer</h3>
            <p className="text-gray-600 dark:text-gray-300 text-sm">
              This Privacy Policy is provided as a template and should be reviewed by your legal counsel before implementation. CyberSoluce is not responsible for any legal consequences arising from the use of this document. This policy should be customized to reflect your actual data practices and to comply with all applicable laws in the jurisdictions where you operate.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PrivacyPage;