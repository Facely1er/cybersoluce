import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { AssessmentResults } from '../components/assessment/AssessmentResults';
import { generateResultsPdf } from '../utils/generatePdf';

const RansomwareResults = () => {
  const navigate = useNavigate();
  const location = useLocation();
  
  // In a real application, this would be passed through the location state
  // We're mocking it here for demonstration purposes
  const mockResults = {
    overallScore: 68,
    sectionScores: [
      { title: "Risk Management", percentage: 75, completed: true },
      { title: "Identity Management & Access Control", percentage: 60, completed: true },
      { title: "Protective Technology", percentage: 80, completed: true },
      { title: "Email & Phishing Defense", percentage: 85, completed: true },
      { title: "Detection & Monitoring", percentage: 55, completed: true },
      { title: "Incident Response & Recovery", percentage: 50, completed: true }
    ],
    assessmentType: 'ransomware',
    frameworkName: "NIST Ransomware Risk Management",
    completedDate: new Date().toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    })
  };

  const handleExport = () => {
    generateResultsPdf(
      'Ransomware Readiness Assessment Results',
      mockResults.overallScore,
      mockResults.sectionScores,
      mockResults.completedDate,
      'ransomware-assessment-results.pdf'
    );
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h1 className="text-3xl font-bold mb-6 text-foreground">Ransomware Readiness Assessment Results</h1>
      
      <AssessmentResults 
        data={mockResults as any}
        onExport={handleExport}
      />
      
      <div className="mt-8">
        <h2 className="text-xl font-semibold mb-4 text-foreground">Key Findings</h2>
        <div className="space-y-4">
          <div className="p-4 bg-muted/30 dark:bg-muted/20 rounded-lg">
            <h3 className="font-medium mb-2 text-foreground">Primary Risk Areas</h3>
            <ul className="list-disc list-inside space-y-1 text-muted-foreground">
              <li>Incident response capabilities need improvement (50% compliance)</li>
              <li>Detection and monitoring systems have critical gaps (55% compliance)</li>
              <li>Identity and access management controls require strengthening (60% compliance)</li>
            </ul>
          </div>
          
          <div className="p-4 bg-muted/30 dark:bg-muted/20 rounded-lg">
            <h3 className="font-medium mb-2 text-foreground">Strengths</h3>
            <ul className="list-disc list-inside space-y-1 text-muted-foreground">
              <li>Strong email and phishing defenses (85% compliance)</li>
              <li>Effective protective technologies implemented (80% compliance)</li>
              <li>Good risk management foundation (75% compliance)</li>
            </ul>
          </div>
        </div>
      </div>

      <div className="mt-8 flex justify-end">
        <button
          onClick={() => navigate('/ransomware-recommendations')}
          className="px-4 py-2 bg-primary text-white rounded hover:bg-primary/90 transition-colors"
        >
          View Detailed Recommendations
        </button>
      </div>
    </div>
  );
};

export default RansomwareResults;