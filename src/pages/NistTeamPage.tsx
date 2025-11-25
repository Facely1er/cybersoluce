import React from 'react';
import { TeamCollaborationDashboard } from '../features/nist/collaboration';
import SEOHead from '../components/common/SEOHead';

const NistTeamPage: React.FC = () => {
  return (
    <>
      <SEOHead 
        title="NIST Team Collaboration - CyberSoluce"
        description="Collaborate with your team on NIST CSF compliance"
      />
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <TeamCollaborationDashboard />
        </div>
      </div>
    </>
  );
};

export default NistTeamPage;

