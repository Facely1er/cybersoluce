import React, { useMemo } from 'react';
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore - Icons exist in lucide-react but TypeScript definitions may be outdated
import * as LucideIcons from 'lucide-react';
import { AssessmentData } from '../../shared/types/assessment';
import { Framework } from '../../types/ermits';
import { WorkflowActions } from '../../components/workflow/WorkflowActions';
import { workflowBridge } from '../../services/workflowBridge';
import { useAuth } from '../../context/AuthContext';
import EmptyState from '../../components/common/EmptyState';
import { FileSearch } from 'lucide-react';

// Type-safe icon imports with fallbacks
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const LucideIconsAny = LucideIcons as any;
const AlertTriangle = LucideIconsAny.AlertTriangle as React.ComponentType<{ className?: string; [key: string]: unknown }>;
const CheckCircle = LucideIconsAny.CheckCircle as React.ComponentType<{ className?: string; [key: string]: unknown }>;
const XCircle = LucideIconsAny.XCircle as React.ComponentType<{ className?: string; [key: string]: unknown }>;
const TrendingUp = LucideIconsAny.TrendingUp as React.ComponentType<{ className?: string; [key: string]: unknown }>;

interface ComplianceGapAnalyzerProps {
  assessments?: AssessmentData[];
  frameworks?: Framework[];
}

interface GapAnalysis {
  frameworkId: string;
  frameworkName: string;
  totalQuestions: number;
  answeredQuestions: number;
  complianceRate: number;
  gaps: Array<{
    sectionId: string;
    sectionName: string;
    categoryId: string;
    categoryName: string;
    questionId: string;
    questionText: string;
    severity: 'critical' | 'high' | 'medium' | 'low';
    currentResponse?: number;
    recommendedResponse: number;
  }>;
  strengths: string[];
  recommendations: string[];
}

export const ComplianceGapAnalyzer: React.FC<ComplianceGapAnalyzerProps> = ({ 
  assessments = [], 
  frameworks = [] 
}) => {
  const { user } = useAuth();
  const userId = user?.id || 'anonymous';

  const gapAnalyses = useMemo(() => {
    if (!assessments.length || !frameworks.length) return [];

    return assessments.map(assessment => {
      const framework = frameworks.find(f => f.id === assessment.frameworkId);
      if (!framework) return null;

      const gaps: GapAnalysis['gaps'] = [];
      const strengths: string[] = [];
      let totalQuestions = 0;
      let answeredQuestions = 0;

      // Analyze each section
      framework.sections.forEach(section => {
        section.categories?.forEach(category => {
          category.questions?.forEach(question => {
            totalQuestions++;
            const response = assessment.responses[question.id];
            
            if (response !== undefined) {
              answeredQuestions++;
              
              // Identify gaps (response value 0 or 1 indicates non-compliance)
              if (response <= 1) {
                gaps.push({
                  sectionId: section.id,
                  sectionName: section.name,
                  categoryId: category.id,
                  categoryName: category.name,
                  questionId: question.id,
                  questionText: question.text,
                  severity: response === 0 ? 'critical' : 'high',
                  currentResponse: response,
                  recommendedResponse: 3 // Fully implemented
                });
              } else if (response >= 3) {
                strengths.push(`${section.name} - ${category.name}: ${question.text.substring(0, 50)}...`);
              }
            } else {
              // Unanswered questions are gaps
              gaps.push({
                sectionId: section.id,
                sectionName: section.name,
                categoryId: category.id,
                categoryName: category.name,
                questionId: question.id,
                questionText: question.text,
                severity: question.priority === 'high' ? 'critical' : question.priority === 'medium' ? 'high' : 'medium',
                recommendedResponse: 3
              });
            }
          });
        });
      });

      const complianceRate = totalQuestions > 0 ? (answeredQuestions / totalQuestions) * 100 : 0;
      
      // Generate recommendations
      const recommendations: string[] = [];
      const criticalGaps = gaps.filter(g => g.severity === 'critical');
      const highGaps = gaps.filter(g => g.severity === 'high');
      
      if (criticalGaps.length > 0) {
        recommendations.push(`Address ${criticalGaps.length} critical compliance gaps immediately`);
      }
      if (highGaps.length > 0) {
        recommendations.push(`Prioritize ${highGaps.length} high-priority gaps for remediation`);
      }
      if (complianceRate < 50) {
        recommendations.push('Overall compliance is below 50%. Consider a comprehensive remediation plan.');
      } else if (complianceRate < 75) {
        recommendations.push('Compliance is improving. Focus on remaining gaps to reach 75%+ compliance.');
      }

      return {
        frameworkId: framework.id,
        frameworkName: framework.name,
        totalQuestions,
        answeredQuestions,
        complianceRate: Math.round(complianceRate),
        gaps,
        strengths: strengths.slice(0, 5), // Top 5 strengths
        recommendations
      } as GapAnalysis;
    }).filter((analysis): analysis is GapAnalysis => analysis !== null);
  }, [assessments, frameworks]);

  // Show empty state if no assessments
  if (!assessments.length || !frameworks.length) {
    return (
      <EmptyState
        icon={FileSearch}
        title="No Assessments Available"
        description="Complete an assessment to see gap analysis and compliance insights."
        action={{
          label: "Start Assessment",
          onClick: () => window.location.href = '/assessments/multi-framework',
          variant: 'default'
        }}
      />
    );
  }

  // Show success state if no gaps found
  if (gapAnalyses.length === 0 || gapAnalyses.every(analysis => analysis.gaps.length === 0)) {
    return (
      <EmptyState
        icon={CheckCircle}
        title="No Compliance Gaps Found"
        description="Excellent! Your assessments show full compliance. All requirements are being met."
        action={{
          label: "View Assessments",
          onClick: () => window.location.href = '/assessments/comparison',
          variant: 'outline'
        }}
      />
    );
  }

  return (
    <div className="compliance-gap-analyzer space-y-6">
      {gapAnalyses.map((analysis) => (
        <div
          key={analysis.frameworkId}
          className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-6"
        >
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
              {analysis.frameworkName} Gap Analysis
            </h3>
            <div className="flex items-center space-x-2">
              <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                analysis.complianceRate >= 75
                  ? 'bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-300'
                  : analysis.complianceRate >= 50
                  ? 'bg-yellow-100 dark:bg-yellow-900/30 text-yellow-800 dark:text-yellow-300'
                  : 'bg-red-100 dark:bg-red-900/30 text-red-800 dark:text-red-300'
              }`}>
                {analysis.complianceRate}% Compliant
              </span>
            </div>
          </div>

          {/* Summary Stats */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
            <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg">
              <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">
                {analysis.totalQuestions}
              </div>
              <div className="text-sm text-gray-600 dark:text-gray-400">Total Questions</div>
            </div>
            <div className="bg-green-50 dark:bg-green-900/20 p-4 rounded-lg">
              <div className="text-2xl font-bold text-green-600 dark:text-green-400">
                {analysis.answeredQuestions}
              </div>
              <div className="text-sm text-gray-600 dark:text-gray-400">Answered</div>
            </div>
            <div className="bg-red-50 dark:bg-red-900/20 p-4 rounded-lg">
              <div className="text-2xl font-bold text-red-600 dark:text-red-400">
                {analysis.gaps.length}
              </div>
              <div className="text-sm text-gray-600 dark:text-gray-400">Gaps Identified</div>
            </div>
            <div className="bg-purple-50 dark:bg-purple-900/20 p-4 rounded-lg">
              <div className="text-2xl font-bold text-purple-600 dark:text-purple-400">
                {analysis.strengths.length}
              </div>
              <div className="text-sm text-gray-600 dark:text-gray-400">Strengths</div>
            </div>
          </div>

          {/* Recommendations */}
          {analysis.recommendations.length > 0 && (
            <div className="mb-6 p-4 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg border border-yellow-200 dark:border-yellow-700">
              <h4 className="font-semibold text-yellow-900 dark:text-yellow-100 mb-2 flex items-center space-x-2">
                <TrendingUp className="w-4 h-4" />
                <span>Recommendations</span>
              </h4>
              <ul className="space-y-1">
                {analysis.recommendations.map((rec, idx) => (
                  <li key={idx} className="text-sm text-yellow-800 dark:text-yellow-200 flex items-start space-x-2">
                    <span className="text-yellow-600 dark:text-yellow-400 mt-1">•</span>
                    <span>{rec}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Critical Gaps */}
          {analysis.gaps.filter(g => g.severity === 'critical').length > 0 && (
            <div className="mb-4">
              <h4 className="font-semibold text-red-900 dark:text-red-100 mb-2 flex items-center space-x-2">
                <XCircle className="w-4 h-4 text-red-600 dark:text-red-400" />
                <span>Critical Gaps ({analysis.gaps.filter(g => g.severity === 'critical').length})</span>
              </h4>
              <div className="space-y-2 max-h-48 overflow-y-auto">
                {analysis.gaps.filter(g => g.severity === 'critical').slice(0, 5).map((gap, idx) => (
                  <div
                    key={idx}
                    className="p-3 bg-red-50 dark:bg-red-900/20 rounded-lg border border-red-200 dark:border-red-700"
                  >
                    <div className="text-sm font-medium text-red-900 dark:text-red-100">
                      {gap.sectionName} - {gap.categoryName}
                    </div>
                    <div className="text-xs text-red-700 dark:text-red-300 mt-1 line-clamp-2">
                      {gap.questionText}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* High Priority Gaps */}
          {analysis.gaps.filter(g => g.severity === 'high').length > 0 && (
            <div className="mb-4">
              <h4 className="font-semibold text-orange-900 dark:text-orange-100 mb-2 flex items-center space-x-2">
                <AlertTriangle className="w-4 h-4 text-orange-600 dark:text-orange-400" />
                <span>High Priority Gaps ({analysis.gaps.filter(g => g.severity === 'high').length})</span>
              </h4>
              <div className="space-y-2 max-h-48 overflow-y-auto">
                {analysis.gaps.filter(g => g.severity === 'high').slice(0, 5).map((gap, idx) => (
                  <div
                    key={idx}
                    className="p-3 bg-orange-50 dark:bg-orange-900/20 rounded-lg border border-orange-200 dark:border-orange-700"
                  >
                    <div className="text-sm font-medium text-orange-900 dark:text-orange-100">
                      {gap.sectionName} - {gap.categoryName}
                    </div>
                    <div className="text-xs text-orange-700 dark:text-orange-300 mt-1 line-clamp-2">
                      {gap.questionText}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Strengths */}
          {analysis.strengths.length > 0 && (
            <div className="mb-6">
              <h4 className="font-semibold text-green-900 dark:text-green-100 mb-2 flex items-center space-x-2">
                <CheckCircle className="w-4 h-4 text-green-600 dark:text-green-400" />
                <span>Key Strengths</span>
              </h4>
              <div className="space-y-2">
                {analysis.strengths.map((strength, idx) => (
                  <div
                    key={idx}
                    className="p-3 bg-green-50 dark:bg-green-900/20 rounded-lg border border-green-200 dark:border-green-700"
                  >
                    <div className="text-sm text-green-800 dark:text-green-200">
                      {strength}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Workflow Actions - Connect to Implementation */}
          {(() => {
            const assessment = assessments.find(a => a.frameworkId === analysis.frameworkId);
            const framework = frameworks.find(f => f.id === analysis.frameworkId);
            if (!assessment || !framework) return null;

            const flow = workflowBridge.analyzeAssessmentForImplementation(assessment, framework);
            if (flow.totalGaps === 0) return null;

            return (
              <div className="mt-6 pt-6 border-t border-gray-200 dark:border-gray-700">
                <WorkflowActions
                  flow={flow}
                  userId={userId}
                />
              </div>
            );
          })()}
        </div>
      ))}
    </div>
  );
};
