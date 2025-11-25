import React from 'react';
import { ActivityCalendar } from '../features/nist/calendar';
import SEOHead from '../components/common/SEOHead';

const NistCalendarPage: React.FC = () => {
  return (
    <>
      <SEOHead 
        title="NIST Activity Calendar - CyberSoluce"
        description="Track compliance activities and deadlines for NIST CSF"
      />
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <ActivityCalendar />
        </div>
      </div>
    </>
  );
};

export default NistCalendarPage;

