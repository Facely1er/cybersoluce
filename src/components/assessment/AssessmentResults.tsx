import React from 'react';

interface SectionScore {
  title: string;
  percentage: number;
  completed: boolean;
}

interface AssessmentResultsProps {
  data: {
    overallScore: number;
    sectionScores: SectionScore[];
    assessmentType: string;
    frameworkName: string;
    completedDate: string;
  };
  onExport: () => void;
}

export const AssessmentResults: React.FC<AssessmentResultsProps> = ({ 
  data, 
  onExport 
}) => {
  const { overallScore, sectionScores, frameworkName, completedDate } = data;
  
  // Function to determine the color based on percentage
  const getScoreColor = (score: number) => {
    if (score >= 80) return 'text-green-500';
    if (score >= 60) return 'text-yellow-500';
    return 'text-red-500';
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
      <div className="flex flex-col lg:flex-row justify-between mb-6">
        <div>
          <h2 className="text-2xl font-bold text-foreground mb-2">{frameworkName}</h2>
          <p className="text-sm text-muted-foreground">Completed on {completedDate}</p>
        </div>
        
        <div className="mt-4 lg:mt-0">
          <button 
            onClick={onExport}
            className="px-4 py-2 bg-secondary text-secondary-foreground rounded hover:bg-secondary/90 transition-colors"
          >
            Export to PDF
          </button>
        </div>
      </div>
      
      <div className="flex flex-col lg:flex-row items-center mb-8 p-4 bg-muted/30 dark:bg-muted/20 rounded-lg">
        <div className="flex items-center justify-center lg:w-1/4 mb-4 lg:mb-0">
          <div className="relative inline-flex items-center justify-center">
            <div className="w-36 h-36 rounded-full flex items-center justify-center border-8 border-primary/20">
              <span className={`text-4xl font-bold ${getScoreColor(overallScore)}`}>
                {overallScore}%
              </span>
            </div>
          </div>
        </div>
        
        <div className="lg:w-3/4 lg:pl-8">
          <h3 className="text-xl font-semibold mb-3 text-foreground">Overall Maturity Score</h3>
          <p className="text-muted-foreground mb-4">
            This score represents your organization's overall compliance with {frameworkName} controls. 
            A higher score indicates better protection against potential threats.
          </p>
          
          <div className="flex flex-wrap gap-2">
            {overallScore >= 80 ? (
              <span className="px-2 py-1 bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-100 rounded text-xs font-medium">
                Good Standing
              </span>
            ) : overallScore >= 60 ? (
              <span className="px-2 py-1 bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-100 rounded text-xs font-medium">
                Needs Improvement
              </span>
            ) : (
              <span className="px-2 py-1 bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-100 rounded text-xs font-medium">
                Critical Attention Required
              </span>
            )}
          </div>
        </div>
      </div>
      
      <h3 className="text-xl font-semibold mb-4 text-foreground">Section Scores</h3>
      <div className="space-y-4">
        {sectionScores.map((section, index) => (
          <div key={index} className="p-4 bg-muted/20 dark:bg-muted/10 rounded-lg">
            <div className="flex flex-col sm:flex-row justify-between mb-2">
              <h4 className="font-medium text-foreground">{section.title}</h4>
              <span className={`${getScoreColor(section.percentage)} font-medium`}>
                {section.percentage}%
              </span>
            </div>
            
            <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2.5 mb-2">
              <div 
                className={`h-2.5 rounded-full ${
                  section.percentage >= 80 ? 'bg-green-500' : 
                  section.percentage >= 60 ? 'bg-yellow-500' : 'bg-red-500'
                }`}
                style={{ width: `${section.percentage}%` }}
              ></div>
            </div>
            
            <div className="text-xs text-muted-foreground">
              {section.percentage >= 80 ? 'Strong compliance' : 
               section.percentage >= 60 ? 'Moderate compliance' : 'Weak compliance'}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};