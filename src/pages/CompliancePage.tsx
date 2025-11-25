import React from 'react';
import { Shield, Check, AlertTriangle, Globe, FileText, Lock } from 'lucide-react';

const CompliancePage = () => {
  const frameworks = [
    {
      name: 'NIST CSF 2.0',
      description: 'Cybersecurity Framework',
      status: 'Compliant',
      lastAudit: '2024-02-15',
      icon: Shield,
    },
    {
      name: 'ISO 27001',
      description: 'Information Security Management',
      status: 'In Progress',
      lastAudit: '2024-01-20',
      icon: Lock,
    },
    {
      name: 'GDPR',
      description: 'Data Protection Regulation',
      status: 'Compliant',
      lastAudit: '2024-02-01',
      icon: FileText,
    },
  ];

  const certifications = [
    {
      name: 'SOC 2 Type II',
      validUntil: '2025-03-15',
      status: 'Active',
    },
    {
      name: 'ISO 27001:2013',
      validUntil: '2025-06-30',
      status: 'In Progress',
    },
    {
      name: 'HIPAA Compliance',
      validUntil: '2025-04-20',
      status: 'Active',
    },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12">
      <div className="text-center mb-12">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
          Compliance & Certifications
        </h1>
        <p className="text-lg text-gray-600 dark:text-gray-300">
          Our commitment to maintaining the highest standards of security and compliance
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {frameworks.map((framework) => {
          const Icon = framework.icon;
          return (
            <div key={framework.name} className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
              <div className="flex items-center mb-4">
                <Icon className="h-8 w-8 text-blue-600 dark:text-blue-400" />
                <div className="ml-3">
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                    {framework.name}
                  </h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    {framework.description}
                  </p>
                </div>
              </div>
              <div className="flex justify-between items-center">
                <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                  framework.status === 'Compliant'
                    ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
                    : 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200'
                }`}>
                  {framework.status}
                </span>
                <span className="text-sm text-gray-500 dark:text-gray-400">
                  Last audit: {framework.lastAudit}
                </span>
              </div>
            </div>
          );
        })}
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
          Active Certifications
        </h2>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
            <thead>
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Certification
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Valid Until
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Status
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
              {certifications.map((cert) => (
                <tr key={cert.name}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-white">
                    {cert.name}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                    {cert.validUntil}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                      cert.status === 'Active'
                        ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
                        : 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200'
                    }`}>
                      {cert.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
          Global Compliance Coverage
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-4 border border-gray-200 dark:border-gray-700 rounded-lg">
            <div className="flex items-center mb-3">
              <Globe className="h-6 w-6 text-blue-600 dark:text-blue-400 mr-2" />
              <h3 className="text-lg font-medium text-gray-900 dark:text-white">
                European Union
              </h3>
            </div>
            <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-300">
              <li>• GDPR Compliance</li>
              <li>• NIS2 Directive</li>
              <li>• ePrivacy Regulation</li>
            </ul>
          </div>
          <div className="p-4 border border-gray-200 dark:border-gray-700 rounded-lg">
            <div className="flex items-center mb-3">
              <Globe className="h-6 w-6 text-blue-600 dark:text-blue-400 mr-2" />
              <h3 className="text-lg font-medium text-gray-900 dark:text-white">
                North America
              </h3>
            </div>
            <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-300">
              <li>• CCPA (California)</li>
              <li>• HIPAA Compliance</li>
              <li>• SOC 2 Type II</li>
            </ul>
          </div>
          <div className="p-4 border border-gray-200 dark:border-gray-700 rounded-lg">
            <div className="flex items-center mb-3">
              <Globe className="h-6 w-6 text-blue-600 dark:text-blue-400 mr-2" />
              <h3 className="text-lg font-medium text-gray-900 dark:text-white">
                Asia Pacific
              </h3>
            </div>
            <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-300">
              <li>• PIPL (China)</li>
              <li>• PDPA (Singapore)</li>
              <li>• Privacy Act (Australia)</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CompliancePage;