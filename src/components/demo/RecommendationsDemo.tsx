import React, { useState } from 'react';
import { AlertTriangle, Clock, Users, ChevronRight } from 'lucide-react';

const RecommendationsDemo: React.FC = () => {
  const [selectedRec, setSelectedRec] = useState<string | null>(null);

  const recommendations = [
    {
      id: 'rec1',
      title: 'Implement Multi-Factor Authentication',
      description: 'Deploy MFA across all critical systems and user accounts',
      priority: 'high',
      effort: 'medium',
      impact: 'high',
      domain: 'access',
      progress: 65,
    },
    {
      id: 'rec2',
      title: 'Enhance Data Encryption',
      description: 'Implement end-to-end encryption for sensitive data storage and transmission',
      priority: 'critical',
      effort: 'high',
      impact: 'high',
      domain: 'data',
      progress: 30,
    },
  ];

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'critical':
        return 'bg-red-100 dark:bg-red-900/50 text-red-800 dark:text-red-200';
      case 'high':
        return 'bg-orange-100 dark:bg-orange-900/50 text-orange-800 dark:text-orange-200';
      case 'medium':
        return 'bg-yellow-100 dark:bg-yellow-900/50 text-yellow-800 dark:text-yellow-200';
      default:
        return 'bg-blue-100 dark:bg-blue-900/50 text-blue-800 dark:text-blue-200';
    }
  };

  return (
    <div className="space-y-8">
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
          Security Recommendations
        </h2>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="space-y-4">
            {recommendations.map((rec) => (
              <button
                key={rec.id}
                onClick={() => setSelectedRec(rec.id)}
                className={`w-full p-6 rounded-lg border dark:border-gray-700 transition-all ${
                  selectedRec === rec.id
                    ? 'border-blue-500 dark:border-blue-400 ring-2 ring-blue-200 dark:ring-blue-900'
                    : 'border-gray-200 hover:border-blue-300 dark:hover:border-blue-600'
                } bg-white dark:bg-gray-800`}
              >
                <div className="flex items-start justify-between mb-3">
                  <div className="flex-1">
                    <div className="flex items-center space-x-2 mb-2">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${getPriorityColor(rec.priority)}`}>
                        {rec.priority.toUpperCase()}
                      </span>
                      <span className="text-sm text-gray-500 dark:text-gray-400">
                        {rec.domain.toUpperCase()}
                      </span>
                    </div>
                    <h3 className="text-lg font-medium text-gray-900 dark:text-white text-left">
                      {rec.title}
                    </h3>
                  </div>
                  <ChevronRight className="h-5 w-5 text-gray-400 dark:text-gray-500" />
                </div>

                <p className="text-sm text-gray-600 dark:text-gray-300 text-left mb-4">
                  {rec.description}
                </p>

                <div className="flex items-center justify-between text-sm text-gray-500 dark:text-gray-400">
                  <div className="flex items-center space-x-4">
                    <span className="flex items-center">
                      <Clock className="h-4 w-4 mr-1" />
                      {rec.effort} effort
                    </span>
                    <span className="flex items-center">
                      <AlertTriangle className="h-4 w-4 mr-1" />
                      {rec.impact} impact
                    </span>
                  </div>
                  <div className="flex items-center">
                    <div className="w-32 h-2 bg-gray-200 dark:bg-gray-700 rounded-full mr-2">
                      <div
                        className="h-2 bg-blue-600 dark:bg-blue-500 rounded-full"
                        style={{ width: `${rec.progress}%` }}
                      />
                    </div>
                    <span>{rec.progress}%</span>
                  </div>
                </div>
              </button>
            ))}
          </div>

          <div className="bg-gray-50 dark:bg-gray-900 rounded-lg p-6">
            <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">
              Implementation Details
            </h3>
            {selectedRec ? (
              <div className="space-y-6">
                <div>
                  <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Required Steps
                  </h4>
                  <ul className="space-y-2">
                    <li className="flex items-center text-sm text-gray-600 dark:text-gray-400">
                      <span className="w-5 h-5 rounded-full bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-400 flex items-center justify-center mr-2">
                        1
                      </span>
                      Initial Assessment
                    </li>
                    <li className="flex items-center text-sm text-gray-600 dark:text-gray-400">
                      <span className="w-5 h-5 rounded-full bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-400 flex items-center justify-center mr-2">
                        2
                      </span>
                      Technical Implementation
                    </li>
                    <li className="flex items-center text-sm text-gray-600 dark:text-gray-400">
                      <span className="w-5 h-5 rounded-full bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-400 flex items-center justify-center mr-2">
                        3
                      </span>
                      User Training
                    </li>
                    <li className="flex items-center text-sm text-gray-600 dark:text-gray-400">
                      <span className="w-5 h-5 rounded-full bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-400 flex items-center justify-center mr-2">
                        4
                      </span>
                      Validation & Testing
                    </li>
                  </ul>
                </div>

                <div>
                  <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Resource Requirements
                  </h4>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="p-3 bg-white dark:bg-gray-800 rounded-lg border dark:border-gray-700">
                      <span className="text-sm text-gray-600 dark:text-gray-400">Time Estimate</span>
                      <p className="text-lg font-medium text-gray-900 dark:text-white">2-3 Weeks</p>
                    </div>
                    <div className="p-3 bg-white dark:bg-gray-800 rounded-lg border dark:border-gray-700">
                      <span className="text-sm text-gray-600 dark:text-gray-400">Team Size</span>
                      <p className="text-lg font-medium text-gray-900 dark:text-white">3-4 People</p>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <p className="text-gray-600 dark:text-gray-400 text-center py-8">
                Select a recommendation to view implementation details
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default RecommendationsDemo;