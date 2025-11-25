import React, { useMemo } from 'react';
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore - Icons exist in lucide-react but TypeScript definitions may be outdated
import * as LucideIcons from 'lucide-react';
import { AssessmentData } from '../../shared/types/assessment';
import { PieChart } from './charts/PieChart';

// Type-safe icon imports with fallbacks
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const LucideIconsAny = LucideIcons as any;
const FileText = LucideIconsAny.FileText as React.ComponentType<{ className?: string; [key: string]: unknown }>;
const Download = LucideIconsAny.Download as React.ComponentType<{ className?: string; [key: string]: unknown }>;
const TrendingUp = LucideIconsAny.TrendingUp as React.ComponentType<{ className?: string; [key: string]: unknown }>;
const BarChart3 = LucideIconsAny.BarChart3 as React.ComponentType<{ className?: string; [key: string]: unknown }>;
const Calendar = LucideIconsAny.Calendar as React.ComponentType<{ className?: string; [key: string]: unknown }>;

interface AdvancedReportingDashboardProps {
  assessments?: AssessmentData[];
  onGenerateReport?: (assessment: AssessmentData, format: 'pdf' | 'csv' | 'json') => void;
  onExportData?: (format: 'csv' | 'json') => void;
  [key: string]: any;
}

export const AdvancedReportingDashboard: React.FC<AdvancedReportingDashboardProps> = ({
  assessments = [],
  onGenerateReport,
  onExportData,
  ...props
}) => {
  const reportMetrics = useMemo(() => {
    if (!assessments.length) {
      return {
        totalAssessments: 0,
        completedAssessments: 0,
        averageCompletionRate: 0,
        frameworks: [] as string[],
        completionByFramework: {} as Record<string, number>,
        recentAssessments: [] as AssessmentData[]
      };
    }

    const completed = assessments.filter(a => a.isComplete);
    const frameworks = [...new Set(assessments.map(a => a.frameworkName))];
    
    const completionByFramework: Record<string, number> = {};
    frameworks.forEach(fw => {
      const fwAssessments = assessments.filter(a => a.frameworkName === fw);
      const fwCompleted = fwAssessments.filter(a => a.isComplete).length;
      completionByFramework[fw] = fwAssessments.length > 0 
        ? Math.round((fwCompleted / fwAssessments.length) * 100) 
        : 0;
    });

    const totalQuestions = assessments.reduce((sum, a) => {
      return sum + Object.keys(a.responses || {}).length;
    }, 0);
    
    const answeredQuestions = assessments.reduce((sum, a) => {
      return sum + Object.keys(a.responses || {}).length;
    }, 0);

    const averageCompletionRate = assessments.length > 0
      ? Math.round((answeredQuestions / (totalQuestions || 1)) * 100)
      : 0;

    const recentAssessments = [...assessments]
      .sort((a, b) => new Date(b.lastModified).getTime() - new Date(a.lastModified).getTime())
      .slice(0, 5);

    return {
      totalAssessments: assessments.length,
      completedAssessments: completed.length,
      averageCompletionRate,
      frameworks,
      completionByFramework,
      recentAssessments
    };
  }, [assessments]);

  const handleGenerateReport = (assessment: AssessmentData, format: 'pdf' | 'csv' | 'json') => {
    if (onGenerateReport) {
      onGenerateReport(assessment, format);
    } else {
      // Default implementation
      console.log(`Generating ${format.toUpperCase()} report for assessment:`, assessment.id);
      // In a real implementation, this would trigger report generation
    }
  };

  const handleExportData = (format: 'csv' | 'json') => {
    if (onExportData) {
      onExportData(format);
    } else {
      // Default implementation
      const data = format === 'json' 
        ? JSON.stringify(assessments, null, 2)
        : convertToCSV(assessments);
      
      const blob = new Blob([data], { type: format === 'json' ? 'application/json' : 'text/csv' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `assessments-export.${format}`;
      a.click();
      URL.revokeObjectURL(url);
    }
  };

  const convertToCSV = (data: AssessmentData[]): string => {
    if (!data.length) return '';
    
    const headers = ['ID', 'Framework', 'Status', 'Completion Rate', 'Last Modified'];
    const rows = data.map(a => [
      a.id,
      a.frameworkName,
      a.isComplete ? 'Complete' : 'In Progress',
      `${Math.round((Object.keys(a.responses || {}).length / 100) * 100)}%`,
      new Date(a.lastModified).toLocaleDateString()
    ]);
    
    return [headers, ...rows].map(row => row.join(',')).join('\n');
  };

  if (assessments.length === 0) {
    return (
      <div className="advanced-reporting-dashboard bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-6">
        <div className="text-center py-8 text-gray-500 dark:text-gray-400">
          <BarChart3 className="w-12 h-12 mx-auto mb-2 opacity-50" />
          <p>No assessment data available for reporting.</p>
          <p className="text-sm mt-1">Complete assessments to generate reports.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="advanced-reporting-dashboard space-y-6" {...props}>
      {/* Header */}
      <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white flex items-center space-x-2">
            <BarChart3 className="w-6 h-6 text-blue-600 dark:text-blue-400" />
            <span>Reporting Dashboard</span>
          </h2>
          <div className="flex items-center space-x-2">
            <button
              onClick={() => handleExportData('csv')}
              className="flex items-center space-x-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
            >
              <Download className="w-4 h-4" />
              <span>Export CSV</span>
            </button>
            <button
              onClick={() => handleExportData('json')}
              className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              <Download className="w-4 h-4" />
              <span>Export JSON</span>
            </button>
          </div>
        </div>

        {/* Key Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg">
            <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">
              {reportMetrics.totalAssessments}
            </div>
            <div className="text-sm text-gray-600 dark:text-gray-400">Total Assessments</div>
          </div>
          <div className="bg-green-50 dark:bg-green-900/20 p-4 rounded-lg">
            <div className="text-2xl font-bold text-green-600 dark:text-green-400">
              {reportMetrics.completedAssessments}
            </div>
            <div className="text-sm text-gray-600 dark:text-gray-400">Completed</div>
          </div>
          <div className="bg-purple-50 dark:bg-purple-900/20 p-4 rounded-lg">
            <div className="text-2xl font-bold text-purple-600 dark:text-purple-400">
              {reportMetrics.averageCompletionRate}%
            </div>
            <div className="text-sm text-gray-600 dark:text-gray-400">Avg. Completion</div>
          </div>
          <div className="bg-orange-50 dark:bg-orange-900/20 p-4 rounded-lg">
            <div className="text-2xl font-bold text-orange-600 dark:text-orange-400">
              {reportMetrics.frameworks.length}
            </div>
            <div className="text-sm text-gray-600 dark:text-gray-400">Frameworks</div>
          </div>
        </div>
      </div>

      {/* Completion by Framework Chart */}
      {reportMetrics.frameworks.length > 0 && (
        <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-6">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
            Completion by Framework
          </h3>
          <PieChart
            data={reportMetrics.frameworks.map(fw => {
              const fwAssessments = assessments.filter(a => a.frameworkName === fw);
              return fwAssessments.filter(a => a.isComplete).length;
            })}
            labels={reportMetrics.frameworks}
            size={250}
            showLegend={true}
          />
        </div>
      )}

      {/* Recent Assessments */}
      {reportMetrics.recentAssessments.length > 0 && (
        <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-6">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center space-x-2">
            <Calendar className="w-5 h-5 text-gray-500 dark:text-gray-400" />
            <span>Recent Assessments</span>
          </h3>
          <div className="space-y-3">
            {reportMetrics.recentAssessments.map((assessment) => {
              const responseCount = Object.keys(assessment.responses || {}).length;
              const completionRate = Math.round((responseCount / 100) * 100); // Assuming 100 questions average
              
              return (
                <div
                  key={assessment.id}
                  className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700/50 rounded-lg border border-gray-200 dark:border-gray-600"
                >
                  <div className="flex-1">
                    <div className="flex items-center space-x-3">
                      <div className="flex-1">
                        <div className="font-medium text-gray-900 dark:text-white">
                          {assessment.frameworkName}
                        </div>
                        <div className="text-sm text-gray-500 dark:text-gray-400">
                          {new Date(assessment.lastModified).toLocaleDateString()} • {completionRate}% complete
                        </div>
                      </div>
                      <div className={`px-3 py-1 rounded-full text-xs font-medium ${
                        assessment.isComplete
                          ? 'bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-300'
                          : 'bg-yellow-100 dark:bg-yellow-900/30 text-yellow-800 dark:text-yellow-300'
                      }`}>
                        {assessment.isComplete ? 'Complete' : 'In Progress'}
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2 ml-4">
                    <button
                      onClick={() => handleGenerateReport(assessment, 'pdf')}
                      className="p-2 text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                      title="Generate PDF Report"
                    >
                      <FileText className="w-5 h-5" />
                    </button>
                    <button
                      onClick={() => handleGenerateReport(assessment, 'csv')}
                      className="p-2 text-gray-600 dark:text-gray-400 hover:text-green-600 dark:hover:text-green-400 transition-colors"
                      title="Export CSV"
                    >
                      <Download className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Trends */}
      <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-6">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center space-x-2">
          <TrendingUp className="w-5 h-5 text-gray-500 dark:text-gray-400" />
          <span>Assessment Trends</span>
        </h3>
        <div className="text-sm text-gray-600 dark:text-gray-400">
          <p>• {reportMetrics.completedAssessments} of {reportMetrics.totalAssessments} assessments completed</p>
          <p>• Average completion rate: {reportMetrics.averageCompletionRate}%</p>
          <p>• Active across {reportMetrics.frameworks.length} compliance framework{reportMetrics.frameworks.length !== 1 ? 's' : ''}</p>
        </div>
      </div>
    </div>
  );
};
