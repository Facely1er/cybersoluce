import React from 'react';
import { TaskManagementDashboard } from '../features/nist/tasks';
import SEOHead from '../components/common/SEOHead';

const NistTasksPage: React.FC = () => {
  return (
    <>
      <SEOHead 
        title="NIST Task Management - CyberSoluce"
        description="Manage tasks for NIST CSF compliance implementation"
      />
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <TaskManagementDashboard />
        </div>
      </div>
    </>
  );
};

export default NistTasksPage;

