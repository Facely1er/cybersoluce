import React, { useState } from 'react';
import { Shield, ArrowRight, Check, AlertTriangle } from 'lucide-react';

const FrameworkDemo: React.FC = () => {
  const [selectedFramework, setSelectedFramework] = useState<string | null>(null);
  const [selectedControl, setSelectedControl] = useState<string | null>(null);

  const frameworks = [
    {
      id: 'nist',
      name: 'NIST CSF 2.0',
      description: 'Comprehensive cybersecurity framework',
      coverage: 85,
    },
    {
      id: 'iso27001',
      name: 'ISO 27001',
      description: 'Information security management standard',
      coverage: 78,
    },
    {
      id: 'gdpr',
      name: 'GDPR',
      description: 'Data protection regulation',
      coverage: 92,
    },
  ];

  const controls = [
    {
      id: 'id-1',
      nist: 'ID.AM-1',
      iso: 'A.8.1.1',
      name: 'Asset Inventory',
      status: 'implemented',
      mappings: ['GDPR Art.30', 'NIST CSF ID.AM-1', 'ISO 27001 A.8.1.1'],
    },
    {
      id: 'id-2',
      nist: 'PR.AC-1',
      iso: 'A.9.2.1',
      name: 'Access Control',
      status: 'partial',
      mappings: ['GDPR Art.32', 'NIST CSF PR.AC-1', 'ISO 27001 A.9.2.1'],
    },
    {
      id: 'id-3',
      nist: 'DE.CM-1',
      iso: 'A.12.4.1',
      name: 'Continuous Monitoring',
      status: 'planned',
      mappings: ['NIST CSF DE.CM-1', 'ISO 27001 A.12.4.1'],
    },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'implemented':
        return 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300';
      case 'partial':
        return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300';
      case 'planned':
        return 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300';
      default:
        return 'bg-gray-100 text-gray-800 dark:bg-gray-700/50 dark:text-gray-300';
    }
  };

  return (
    <div className="space-y-8">
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
          Framework Integration
        </h2>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div>
            <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">Frameworks</h3>
            <div className="space-y-4">
              {frameworks.map(framework => (
                <button
                  key={framework.id}
                  onClick={() => setSelectedFramework(framework.id)}
                  className={`w-full p-4 rounded-lg border transition-all ${
                    selectedFramework === framework.id
                      ? 'border-blue-500 ring-2 ring-blue-200 dark:ring-blue-800 dark:border-blue-500'
                      : 'border-gray-200 dark:border-gray-700 hover:border-blue-300 dark:hover:border-blue-700'
                  } bg-white dark:bg-gray-800`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center">
                      <Shield className="h-5 w-5 text-blue-600 dark:text-blue-400 mr-2" />
                      <h4 className="font-medium text-gray-900 dark:text-white">{framework.name}</h4>
                    </div>
                    <span className="text-sm text-gray-500 dark:text-gray-400">{framework.coverage}%</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <p className="text-sm text-gray-600 dark:text-gray-300">{framework.description}</p>
                    <ArrowRight className="h-4 w-4 text-gray-400 dark:text-gray-500" />
                  </div>
                </button>
              ))}
            </div>
          </div>

          <div className="lg:col-span-2">
            <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">Control Mapping</h3>
            <div className="space-y-4">
              {controls.map((control) => (
                <button
                  key={control.id}
                  onClick={() => setSelectedControl(control.id)}
                  className={`w-full p-4 rounded-lg border transition-all ${
                    selectedControl === control.id
                      ? 'border-blue-500 ring-2 ring-blue-200 dark:ring-blue-800 dark:border-blue-500'
                      : 'border-gray-200 dark:border-gray-700 hover:border-blue-300 dark:hover:border-blue-700'
                  } bg-white dark:bg-gray-800`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center space-x-2">
                      <span className="text-sm font-mono text-gray-500 dark:text-gray-400">{control.nist}</span>
                      <span className="text-gray-400 dark:text-gray-500">|</span>
                      <span className="text-sm font-mono text-gray-500 dark:text-gray-400">{control.iso}</span>
                    </div>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(control.status)}`}>
                      {control.status}
                    </span>
                  </div>
                  <h4 className="font-medium text-gray-900 dark:text-white text-left mb-2">{control.name}</h4>
                  <div className="flex flex-wrap gap-2">
                    {control.mappings.map((mapping) => (
                      <span
                        key={mapping}
                        className="px-2 py-1 bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 rounded text-sm"
                      >
                        {mapping}
                      </span>
                    ))}
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FrameworkDemo;