import React, { useState } from 'react';
import { Globe, Lock, FileText, AlertTriangle } from 'lucide-react';

const SensitiveInfoDemo: React.FC = () => {
  const [selectedRegion, setSelectedRegion] = useState<string>('eu');
  const [selectedCategory, setSelectedCategory] = useState<string>('pii');

  const regions = [
    { id: 'eu', name: 'European Union', regulations: ['GDPR', 'NIS2', 'EUCI'] },
    { id: 'na', name: 'North America', regulations: ['NIST 800-171', 'CMMC', 'CCPA'] },
    { id: 'apac', name: 'Asia Pacific', regulations: ['PIPL', 'PDPA', 'PSPF'] },
  ];

  const categories = [
    {
      id: 'pii',
      name: 'Personal Information',
      description: 'Individual identifiable information',
      requirements: [
        'Encryption at rest and in transit',
        'Access control and monitoring',
        'Data minimization principles',
        'Regular privacy impact assessments',
      ],
    },
    {
      id: 'financial',
      name: 'Financial Data',
      description: 'Payment and financial records',
      requirements: [
        'End-to-end encryption',
        'Audit logging',
        'Secure deletion procedures',
        'Access restrictions',
      ],
    },
    {
      id: 'health',
      name: 'Health Information',
      description: 'Medical and health records',
      requirements: [
        'Special category protection',
        'Consent management',
        'Access tracking',
        'Breach notification procedures',
      ],
    },
  ];

  const getRegionalRequirements = (region: string, category: string) => {
    const requirements = {
      eu: {
        pii: ['GDPR Article 32 - Security measures', 'Privacy by Design principles'],
        financial: ['PSD2 security requirements', 'Strong customer authentication'],
        health: ['GDPR Special Categories', 'Health data protection'],
      },
      na: {
        pii: ['CCPA privacy controls', 'State-specific requirements'],
        financial: ['SOX compliance', 'PCI DSS requirements'],
        health: ['HIPAA security rules', 'State health privacy laws'],
      },
      apac: {
        pii: ['PIPL security measures', 'PDPA requirements'],
        financial: ['MAS-TRM guidelines', 'Financial data protection'],
        health: ['Healthcare privacy regulations', 'Medical data protection'],
      },
    };
    return requirements[region as keyof typeof requirements][category as keyof typeof requirements['eu']] || [];
  };

  return (
    <div className="space-y-8">
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
          Sensitive Information Management
        </h2>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div>
            <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">Regions</h3>
            <div className="space-y-4">
              {regions.map((region) => (
                <button
                  key={region.id}
                  onClick={() => setSelectedRegion(region.id)}
                  className={`w-full p-4 rounded-lg border transition-all ${
                    selectedRegion === region.id
                      ? 'border-blue-500 ring-2 ring-blue-200 dark:ring-blue-800 bg-blue-50 dark:bg-blue-900/20 dark:border-blue-500'
                      : 'border-gray-200 dark:border-gray-700 hover:border-blue-300 dark:hover:border-blue-700 bg-white dark:bg-gray-800'
                  }`}
                >
                  <div className="flex items-center mb-2">
                    <Globe className="h-5 w-5 text-blue-600 dark:text-blue-400 mr-2" />
                    <h4 className="font-medium text-gray-900 dark:text-white">{region.name}</h4>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {region.regulations.map((reg) => (
                      <span
                        key={reg}
                        className="px-2 py-1 bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 rounded text-sm"
                      >
                        {reg}
                      </span>
                    ))}
                  </div>
                </button>
              ))}
            </div>
          </div>

          <div>
            <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">
              Information Categories
            </h3>
            <div className="space-y-4">
              {categories.map((category) => (
                <button
                  key={category.id}
                  onClick={() => setSelectedCategory(category.id)}
                  className={`w-full p-4 rounded-lg border transition-all ${
                    selectedCategory === category.id
                      ? 'border-blue-500 ring-2 ring-blue-200 dark:ring-blue-800 bg-blue-50 dark:bg-blue-900/20 dark:border-blue-500'
                      : 'border-gray-200 dark:border-gray-700 hover:border-blue-300 dark:hover:border-blue-700 bg-white dark:bg-gray-800'
                  }`}
                >
                  <div className="flex items-center mb-2">
                    <Lock className="h-5 w-5 text-blue-600 dark:text-blue-400 mr-2" />
                    <h4 className="font-medium text-gray-900 dark:text-white">{category.name}</h4>
                  </div>
                  <p className="text-sm text-gray-600 dark:text-gray-300 text-left">{category.description}</p>
                </button>
              ))}
            </div>
          </div>

          <div className="bg-gray-50 dark:bg-gray-900/50 rounded-lg p-6">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-medium text-gray-900 dark:text-white">
                Protection Requirements
              </h3>
              <AlertTriangle className="h-5 w-5 text-yellow-600 dark:text-yellow-400" />
            </div>

            <div className="space-y-6">
              <div>
                <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Regional Requirements
                </h4>
                <ul className="space-y-2">
                  {getRegionalRequirements(selectedRegion, selectedCategory).map((req, index) => (
                    <li key={index} className="flex items-center text-sm text-gray-600 dark:text-gray-300">
                      <FileText className="h-4 w-4 text-blue-600 dark:text-blue-400 mr-2" />
                      {req}
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Technical Controls
                </h4>
                <ul className="space-y-2">
                  {categories.find(c => c.id === selectedCategory)?.requirements.map((req, index) => (
                    <li key={index} className="flex items-center text-sm text-gray-600 dark:text-gray-300">
                      <Lock className="h-4 w-4 text-green-600 dark:text-green-400 mr-2" />
                      {req}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SensitiveInfoDemo;