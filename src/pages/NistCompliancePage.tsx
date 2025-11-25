import React from 'react';
import { RealTimeComplianceStatus } from '../features/nist/compliance';
import SEOHead from '../components/common/SEOHead';

const NistCompliancePage: React.FC = () => {
  return (
    <>
      <SEOHead 
        title="NIST Real-Time Compliance Status - CyberSoluce"
        description="Monitor real-time compliance status for NIST CSF framework"
      />
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <RealTimeComplianceStatus />
        </div>
      </div>
    </>
  );
};

export default NistCompliancePage;

