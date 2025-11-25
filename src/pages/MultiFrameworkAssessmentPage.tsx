import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AdvancedDashboard } from '../features/ermits/AdvancedDashboard';
import SEOHead from '../components/common/SEOHead';
import { useNotification } from '../components/notifications/NotificationSystem';
import { AssessmentData } from '../shared/types';
import { ermitsFrameworks } from '../data/frameworks';
import { generateAssessmentPdf } from '../utils/generatePdf';

const MultiFrameworkAssessmentPage: React.FC = () => {
  const navigate = useNavigate();
  const { addNotification } = useNotification();
  const [savedAssessments, setSavedAssessments] = useState<AssessmentData[]>([]);

  const handleStartAssessment = (frameworkId: string) => {
    // Navigate to assessment page
    navigate(`/assessments/${frameworkId}`);
  };

  const handleLoadAssessment = (assessment: AssessmentData) => {
    navigate(`/assessments/${assessment.frameworkId}?assessmentId=${assessment.id}`);
  };

  const handleDeleteAssessment = (assessmentId: string) => {
    setSavedAssessments(prev => prev.filter(a => a.id !== assessmentId));
    addNotification('success', 'Assessment deleted successfully');
  };

  const handleGenerateReport = (assessment: AssessmentData) => {
    try {
      const reportData = {
        assessment,
        generatedAt: new Date().toISOString(),
        summary: {
          totalQuestions: Object.keys(assessment.responses || {}).length,
          completed: assessment.isComplete,
          lastModified: assessment.lastModified
        }
      };
      const blob = new Blob([JSON.stringify(reportData, null, 2)], { type: 'application/json' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `assessment-report-${assessment.id}-${Date.now()}.json`;
      a.click();
      URL.revokeObjectURL(url);
      addNotification('success', 'Report generated and downloaded successfully');
    } catch (error) {
      addNotification('error', 'Failed to generate report');
    }
  };

  const handleExportAssessment = (assessment: AssessmentData, format: 'json' | 'csv' | 'pdf') => {
    try {
      if (format === 'json') {
        const blob = new Blob([JSON.stringify(assessment, null, 2)], { type: 'application/json' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `assessment-${assessment.id}.json`;
        a.click();
        URL.revokeObjectURL(url);
        addNotification('success', 'Assessment exported as JSON');
      } else if (format === 'csv') {
        const headers = ['Question ID', 'Response', 'Notes'];
        const rows = Object.entries(assessment.responses || {}).map(([questionId, response]) => [
          questionId,
          response.toString(),
          assessment.questionNotes?.[questionId] || ''
        ]);
        const csv = [headers, ...rows].map(row => row.join(',')).join('\n');
        const blob = new Blob([csv], { type: 'text/csv' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `assessment-${assessment.id}.csv`;
        a.click();
        URL.revokeObjectURL(url);
        addNotification('success', 'Assessment exported as CSV');
      } else if (format === 'pdf') {
        try {
          const framework = ermitsFrameworks.find(f => f.id === assessment.frameworkId);
          generateAssessmentPdf(assessment, framework);
          addNotification('success', 'Assessment exported as PDF');
        } catch (error) {
          console.error('PDF export error:', error);
          addNotification('error', 'Failed to export assessment as PDF');
        }
      }
    } catch (error) {
      addNotification('error', `Failed to export assessment as ${format.toUpperCase()}`);
    }
  };

  const handleImportAssessment = (file: File) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const importedData = JSON.parse(e.target?.result as string);
        if (importedData.id && importedData.frameworkId) {
          const storedAssessments = localStorage.getItem('ermits-assessments');
          let assessments: AssessmentData[] = storedAssessments ? JSON.parse(storedAssessments) : [];
          const index = assessments.findIndex(a => a.id === importedData.id);
          if (index >= 0) {
            assessments[index] = importedData;
          } else {
            assessments.push(importedData);
          }
          localStorage.setItem('ermits-assessments', JSON.stringify(assessments));
          setSavedAssessments(assessments);
          addNotification('success', 'Assessment imported successfully');
        } else {
          addNotification('error', 'Invalid assessment file format');
        }
      } catch (error) {
        addNotification('error', 'Failed to import assessment file');
      }
    };
    reader.readAsText(file);
  };

  return (
    <>
      <SEOHead 
        title="Multi-Framework Assessment - CyberSoluce"
        description="Assess compliance across multiple frameworks"
      />
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <AdvancedDashboard
            savedAssessments={savedAssessments}
            onStartAssessment={handleStartAssessment}
            onLoadAssessment={handleLoadAssessment}
            onDeleteAssessment={handleDeleteAssessment}
            onGenerateReport={handleGenerateReport}
            onExportAssessment={handleExportAssessment}
            onImportAssessment={handleImportAssessment}
            userProfile={null}
            addNotification={addNotification}
          />
        </div>
      </div>
    </>
  );
};

export default MultiFrameworkAssessmentPage;

