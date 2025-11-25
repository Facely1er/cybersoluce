import React from 'react';
import { EvidenceCollectionDashboard } from '../features/nist/evidence';
import SEOHead from '../components/common/SEOHead';
import { useNotification } from '../components/notifications/NotificationSystem';

const NistEvidencePage: React.FC = () => {
  const { addNotification } = useNotification();

  return (
    <>
      <SEOHead 
        title="NIST Evidence Collection - CyberSoluce"
        description="Collect and manage evidence for NIST CSF compliance assessments"
      />
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <EvidenceCollectionDashboard 
            onBack={() => window.history.back()}
            addNotification={addNotification}
          />
        </div>
      </div>
    </>
  );
};

export default NistEvidencePage;

