import React from 'react';
import { PolicyManagementView } from '../features/nist/policies';
import SEOHead from '../components/common/SEOHead';

const NistPoliciesPage: React.FC = () => {
  return (
    <>
      <SEOHead 
        title="NIST Policy Management - CyberSoluce"
        description="Manage policies for NIST CSF compliance"
      />
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <PolicyManagementView />
        </div>
      </div>
    </>
  );
};

export default NistPoliciesPage;

