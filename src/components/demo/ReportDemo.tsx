import React, { useState } from 'react';
import { FileText, Download, Settings, Filter, ChevronRight } from 'lucide-react';

const ReportDemo: React.FC = () => {
  const [selectedTemplate, setSelectedTemplate] = useState<string>('executive');
  const [selectedFrameworks, setSelectedFrameworks] = useState<string[]>(['nist']);
  const [dateRange, setDateRange] = useState<string>('30d');

  const templates = [
    { id: 'executive', name: 'Executive Summary', description: 'High-level overview for stakeholders' },
    { id: 'technical', name: 'Technical Report', description: 'Detailed technical findings and metrics' },
    { id: 'compliance', name: 'Compliance Report', description: 'Framework-specific compliance status' },
    { id: 'progress', name: 'Progress Report', description: 'Implementation progress and trends' },
  ];

  const frameworks = [
    { id: 'nist', name: 'NIST CSF 2.0' },
    { id: 'iso27001', name: 'ISO 27001' },
    { id: 'gdpr', name: 'GDPR' },
    { id: 'pci', name: 'PCI DSS' },
  ];

  const toggleFramework = (id: string) => {
    setSelectedFrameworks(prev =>
      prev.includes(id)
        ? prev.filter(f => f !== id)
        : [...prev, id]
    );
  };

  return (
    <div className="space-y-8">
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
          Report Generator
        </h2>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-6">
            <div>
              <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">Report Template</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {templates.map(template => (
                  <button
                    key={template.id}
                    onClick={() => setSelectedTemplate(template.id)}
                    className={`p-4 rounded-lg border dark:border-gray-700 text-left transition-all ${
                      selectedTemplate === template.id
                        ? 'border-blue-500 dark:border-blue-400 ring-2 ring-blue-200 dark:ring-blue-900'
                        : 'border-gray-200 hover:border-blue-300 dark:hover:border-blue-600'
                    } bg-white dark:bg-gray-800`}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <FileText className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                      <ChevronRight className="h-4 w-4 text-gray-400 dark:text-gray-500" />
                    </div>
                    <h4 className="font-medium text-gray-900 dark:text-white">{template.name}</h4>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">{template.description}</p>
                  </button>
                ))}
              </div>
            </div>

            <div>
              <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">Compliance Frameworks</h3>
              <div className="grid grid-cols-2 gap-4">
                {frameworks.map(framework => (
                  <label
                    key={framework.id}
                    className="flex items-center p-4 border dark:border-gray-700 rounded-lg cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-700"
                  >
                    <input
                      type="checkbox"
                      checked={selectedFrameworks.includes(framework.id)}
                      onChange={() => toggleFramework(framework.id)}
                      className="h-4 w-4 text-blue-600 dark:text-blue-400 rounded border-gray-300 dark:border-gray-600"
                    />
                    <span className="ml-3 text-gray-900 dark:text-white">{framework.name}</span>
                  </label>
                ))}
              </div>
            </div>

            <div>
              <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">Date Range</h3>
              <div className="flex space-x-4">
                {[
                  { id: '30d', label: 'Last 30 Days' },
                  { id: '90d', label: 'Last Quarter' },
                  { id: '1y', label: 'Last Year' },
                  { id: 'custom', label: 'Custom Range' },
                ].map(range => (
                  <button
                    key={range.id}
                    onClick={() => setDateRange(range.id)}
                    className={`px-4 py-2 rounded-lg transition-colors ${
                      dateRange === range.id
                        ? 'bg-blue-600 dark:bg-blue-500 text-white'
                        : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
                    }`}
                  >
                    {range.label}
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div className="bg-gray-50 dark:bg-gray-900 rounded-lg p-6">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-medium text-gray-900 dark:text-white">Report Preview</h3>
              <button className="text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300">
                <Settings className="h-5 w-5" />
              </button>
            </div>

            <div className="space-y-4">
              <div className="bg-white dark:bg-gray-800 rounded border dark:border-gray-700 p-4">
                <h4 className="font-medium text-gray-900 dark:text-white mb-2">Executive Summary</h4>
                <div className="h-20 bg-gray-100 dark:bg-gray-700 rounded animate-pulse" />
              </div>

              <div className="bg-white dark:bg-gray-800 rounded border dark:border-gray-700 p-4">
                <h4 className="font-medium text-gray-900 dark:text-white mb-2">Key Metrics</h4>
                <div className="grid grid-cols-2 gap-2">
                  <div className="h-12 bg-gray-100 dark:bg-gray-700 rounded animate-pulse" />
                  <div className="h-12 bg-gray-100 dark:bg-gray-700 rounded animate-pulse" />
                </div>
              </div>

              <div className="bg-white dark:bg-gray-800 rounded border dark:border-gray-700 p-4">
                <h4 className="font-medium text-gray-900 dark:text-white mb-2">Findings</h4>
                <div className="space-y-2">
                  <div className="h-8 bg-gray-100 dark:bg-gray-700 rounded animate-pulse" />
                  <div className="h-8 bg-gray-100 dark:bg-gray-700 rounded animate-pulse" />
                  <div className="h-8 bg-gray-100 dark:bg-gray-700 rounded animate-pulse" />
                </div>
              </div>
            </div>

            <button className="w-full mt-6 flex items-center justify-center px-4 py-2 bg-blue-600 dark:bg-blue-500 text-white rounded-lg hover:bg-blue-700 dark:hover:bg-blue-600">
              <Download className="h-5 w-5 mr-2" />
              Generate Report
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReportDemo;