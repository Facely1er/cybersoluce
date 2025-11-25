import React from 'react';
import { PolicyRepositoryView } from '../features/ermits/PolicyRepositoryView';
import SEOHead from '../components/common/SEOHead';

const PolicyRepositoryPage: React.FC = () => {
  return (
    <>
      <SEOHead 
        title="Policy Repository - CyberSoluce"
        description="Browse and manage compliance policies"
      />
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <PolicyRepositoryView />
        </div>
      </div>
    </>
  );
};

export default PolicyRepositoryPage;

