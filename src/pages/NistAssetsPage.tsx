import React from 'react';
import { AssetDashboard } from '../features/nist/assets';
import SEOHead from '../components/common/SEOHead';

const NistAssetsPage: React.FC = () => {
  return (
    <>
      <SEOHead 
        title="NIST Asset Management - CyberSoluce"
        description="Manage assets, inventory, categories, and dependencies for NIST CSF compliance"
      />
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <AssetDashboard />
        </div>
      </div>
    </>
  );
};

export default NistAssetsPage;

