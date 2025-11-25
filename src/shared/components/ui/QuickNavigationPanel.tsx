import React from 'react';
import { Link } from 'react-router-dom';

interface QuickNavigationPanelProps {
  currentPage?: string;
}

export const QuickNavigationPanel: React.FC<QuickNavigationPanelProps> = ({ currentPage }) => {
  const navigationItems = [
    { label: 'Dashboard', href: '/dashboard', icon: '📊' },
    { label: 'Assessments', href: '/assessments', icon: '📋' },
    { label: 'Compliance', href: '/compliance', icon: '✅' },
    { label: 'Evidence', href: '/evidence', icon: '📁' },
    { label: 'Tasks', href: '/tasks', icon: '✓' },
    { label: 'Reports', href: '/reports', icon: '📄' },
  ];

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg border border-gray-200 dark:border-gray-700">
      <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
        Quick Navigation
      </h3>
      <nav className="space-y-2">
        {navigationItems.map((item) => {
          const isActive = currentPage === item.href;
          return (
            <Link
              key={item.href}
              to={item.href}
              className={`flex items-center space-x-3 px-4 py-2 rounded-lg transition-all duration-200 ${
                isActive
                  ? 'bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 font-medium'
                  : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
              }`}
            >
              <span className="text-lg">{item.icon}</span>
              <span>{item.label}</span>
            </Link>
          );
        })}
      </nav>
    </div>
  );
};

