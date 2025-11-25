import React from 'react';
import { TemplateView } from '../features/ermits/TemplateView';
import SEOHead from '../components/common/SEOHead';
import { useNavigate } from 'react-router-dom';

const AssessmentTemplatePage: React.FC = () => {
  const navigate = useNavigate();

  const handleStartFromTemplate = (frameworkId: string, templateId: string) => {
    navigate(`/assessments/${frameworkId}?templateId=${templateId}`);
  };

  const handleBack = () => {
    navigate(-1);
  };

  return (
    <>
      <SEOHead 
        title="Assessment Templates - CyberSoluce"
        description="Create and manage assessment templates"
      />
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <TemplateView 
            onStartFromTemplate={handleStartFromTemplate}
            onBack={handleBack}
          />
        </div>
      </div>
    </>
  );
};

export default AssessmentTemplatePage;

