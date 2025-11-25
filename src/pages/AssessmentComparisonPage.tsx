import React, { useState } from 'react';
import { ComparisonView } from '../features/ermits/ComparisonView';
import SEOHead from '../components/common/SEOHead';
import { AssessmentData } from '../shared/types';

const AssessmentComparisonPage: React.FC = () => {
  const [assessments, setAssessments] = useState<AssessmentData[]>([]);
  
  // Load assessments from localStorage
  React.useEffect(() => {
    try {
      const storedAssessments = localStorage.getItem('ermits-assessments');
      if (storedAssessments) {
        const loaded: AssessmentData[] = JSON.parse(storedAssessments);
        // Convert date strings back to Date objects
        const converted = loaded.map(a => ({
          ...a,
          createdAt: new Date(a.createdAt),
          lastModified: new Date(a.lastModified)
        }));
        setAssessments(converted);
      }
    } catch (error) {
      console.error('Error loading assessments:', error);
    }
  }, []);

  return (
    <>
      <SEOHead 
        title="Assessment Comparison - CyberSoluce"
        description="Compare assessments across different frameworks and versions"
      />
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <ComparisonView
            assessments={assessments}
            onBack={() => window.history.back()}
          />
        </div>
      </div>
    </>
  );
};

export default AssessmentComparisonPage;

