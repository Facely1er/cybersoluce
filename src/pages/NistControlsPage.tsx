import React from 'react';
import { ControlsManagementView } from '../features/nist/controls';
import SEOHead from '../components/common/SEOHead';

const NistControlsPage: React.FC = () => {
  return (
    <>
      <SEOHead 
        title="NIST Controls Management - CyberSoluce"
        description="Manage and track NIST CSF controls implementation"
      />
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <ControlsManagementView />
        </div>
      </div>
    </>
  );
};

export default NistControlsPage;

