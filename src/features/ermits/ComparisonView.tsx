import React, { useState, useMemo, useRef, useEffect } from 'react';
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore - Icons exist in lucide-react but TypeScript definitions may be outdated
import * as LucideIcons from 'lucide-react';

// Type-safe icon imports with fallbacks
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const LucideIconsAny = LucideIcons as any;
const ChevronLeft = LucideIconsAny.ChevronLeft as React.ComponentType<{ className?: string; [key: string]: unknown }>;
const TrendingUp = LucideIconsAny.TrendingUp as React.ComponentType<{ className?: string; [key: string]: unknown }>;

// Icons that TypeScript recognizes
const { BarChart3, Target } = LucideIcons;
import { AssessmentData } from '../../shared/types/assessment';
import { Question } from '../../types/ermits';
import { frameworks } from '../../data/frameworks/index';

interface ComparisonViewProps {
  assessments: AssessmentData[];
  onBack: () => void;
}

export const ComparisonView: React.FC<ComparisonViewProps> = ({
  assessments,
  onBack
}) => {
  const [selectedAssessments, setSelectedAssessments] = useState<string[]>([]);

  const comparisonData = useMemo(() => {
    const selected = assessments.filter(a => selectedAssessments.includes(a.id));
    
    if (selected.length === 0) return null;

    // Calculate scores for each assessment
    const assessmentScores = selected.map(assessment => {
      const responses = Object.values(assessment.responses) as number[];
      const score = responses.length > 0 
        ? Math.round((responses.reduce((sum: number, value: number) => sum + value, 0) / responses.length) * 25)
        : 0;
      
      const framework = frameworks.find(f => f.id === assessment.frameworkId);
      const totalQuestions = framework?.sections.reduce((sum, section) => 
        sum + section.categories.reduce((catSum, category) => 
          catSum + category.questions.length, 0), 0) || 0;

      // Section scores
      const sectionScores = framework?.sections.map(section => {
        const sectionQuestions = section.categories.reduce((questions, category) => {
          return [...questions, ...category.questions];
        }, [] as Question[]);
        
        const sectionResponses = sectionQuestions
          .map(q => assessment.responses[q.id])
          .filter(r => r !== undefined);
        
        const sectionScore = sectionResponses.length > 0
          ? Math.round((sectionResponses.reduce((sum, value) => sum + value, 0) / sectionResponses.length) * 25)
          : 0;

        return {
          name: section.name,
          score: sectionScore
        };
      }) || [];

      return {
        assessment,
        overallScore: score,
        completionRate: Math.round((Object.keys(assessment.responses).length / totalQuestions) * 100),
        sectionScores
      };
    });

    // Calculate trends if we have multiple assessments from same framework
    const trends = assessmentScores.length > 1 ? {
      scoreChange: assessmentScores[assessmentScores.length - 1].overallScore - assessmentScores[0].overallScore,
      completionChange: assessmentScores[assessmentScores.length - 1].completionRate - assessmentScores[0].completionRate
    } : null;

    return {
      assessmentScores,
      trends
    };
  }, [assessments, selectedAssessments]);

  // Refs for progress bars
  const progressBarRefs = useRef<Map<string, HTMLDivElement>>(new Map());

  // Update progress bar widths when comparison data changes
  useEffect(() => {
    if (comparisonData) {
      comparisonData.assessmentScores.forEach((item) => {
        const ref = progressBarRefs.current.get(item.assessment.id);
        if (ref) {
          ref.style.width = `${item.overallScore}%`;
        }
      });
    }
  }, [comparisonData]);

  const setProgressBarRef = (assessmentId: string, score: number) => (element: HTMLDivElement | null) => {
    if (element) {
      progressBarRefs.current.set(assessmentId, element);
      element.style.width = `${score}%`;
    } else {
      progressBarRefs.current.delete(assessmentId);
    }
  };

  const handleAssessmentToggle = (assessmentId: string) => {
    setSelectedAssessments(prev => 
      prev.includes(assessmentId)
        ? prev.filter(id => id !== assessmentId)
        : [...prev, assessmentId]
    );
  };

  const getScoreColor = (score: number) => {
    if (score >= 80) return 'text-green-600 dark:text-green-400';
    if (score >= 60) return 'text-yellow-600 dark:text-yellow-400';
    if (score >= 40) return 'text-orange-600 dark:text-orange-400';
    return 'text-red-600 dark:text-red-400';
  };

  const getScoreBgColor = (score: number) => {
    if (score >= 80) return 'bg-green-500';
    if (score >= 60) return 'bg-yellow-500';
    if (score >= 40) return 'bg-orange-500';
    return 'bg-red-500';
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 mb-8">
        <div className="p-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <button
                onClick={onBack}
                className="flex items-center space-x-2 text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
              >
                <ChevronLeft className="w-5 h-5" />
                <span>Back to Dashboard</span>
              </button>
              <div className="h-6 w-px bg-gray-300 dark:bg-gray-600" />
              <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
                Assessment Comparison
              </h1>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Assessment Selection */}
        <div className="lg:col-span-1">
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 sticky top-24">
            <div className="p-6">
              <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                Select Assessments
              </h2>
              <p className="text-sm text-gray-600 dark:text-gray-300 mb-4">
                Choose up to 4 assessments to compare
              </p>
              
              <div className="space-y-3 max-h-96 overflow-y-auto">
                {assessments.map(assessment => (
                  <label
                    key={assessment.id}
                    className={`flex items-start space-x-3 p-3 rounded-lg border cursor-pointer transition-colors ${
                      selectedAssessments.includes(assessment.id)
                        ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20'
                        : 'border-gray-200 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-700/50'
                    }`}
                  >
                    <input
                      type="checkbox"
                      checked={selectedAssessments.includes(assessment.id)}
                      onChange={() => handleAssessmentToggle(assessment.id)}
                      disabled={!selectedAssessments.includes(assessment.id) && selectedAssessments.length >= 4}
                      className="mt-1 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                    />
                    <div className="flex-1 min-w-0">
                      <div className="font-medium text-gray-900 dark:text-white text-sm">
                        {assessment.frameworkName}
                      </div>
                      <div className="text-xs text-gray-600 dark:text-gray-300 mt-1">
                        {new Date(assessment.lastModified).toLocaleDateString()}
                      </div>
                      <div className={`text-xs mt-1 ${
                        assessment.isComplete 
                          ? 'text-green-600 dark:text-green-400' 
                          : 'text-yellow-600 dark:text-yellow-400'
                      }`}>
                        {assessment.isComplete ? 'Complete' : 'In Progress'}
                      </div>
                    </div>
                  </label>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Comparison Results */}
        <div className="lg:col-span-3">
          {!comparisonData ? (
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 p-12 text-center">
              <BarChart3 className="w-16 h-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
                Select Assessments to Compare
              </h3>
              <p className="text-gray-600 dark:text-gray-300">
                Choose at least one assessment from the sidebar to begin comparison analysis
              </p>
            </div>
          ) : (
            <div className="space-y-8">
              {/* Overview Cards */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 p-6">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="font-semibold text-gray-900 dark:text-white">
                      Assessments Selected
                    </h3>
                    <Target className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                  </div>
                  <div className="text-3xl font-bold text-blue-600 dark:text-blue-400">
                    {comparisonData.assessmentScores.length}
                  </div>
                </div>

                <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 p-6">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="font-semibold text-gray-900 dark:text-white">
                      Average Score
                    </h3>
                    <BarChart3 className="w-6 h-6 text-green-600 dark:text-green-400" />
                  </div>
                  <div className="text-3xl font-bold text-green-600 dark:text-green-400">
                    {Math.round(
                      comparisonData.assessmentScores.reduce((sum, a) => sum + a.overallScore, 0) / 
                      comparisonData.assessmentScores.length
                    )}%
                  </div>
                </div>

                {comparisonData.trends && (
                  <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 p-6">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="font-semibold text-gray-900 dark:text-white">
                        Score Trend
                      </h3>
                      <TrendingUp className="w-6 h-6 text-purple-600 dark:text-purple-400" />
                    </div>
                    <div className={`text-3xl font-bold ${
                      comparisonData.trends.scoreChange >= 0 
                        ? 'text-green-600 dark:text-green-400' 
                        : 'text-red-600 dark:text-red-400'
                    }`}>
                      {comparisonData.trends.scoreChange >= 0 ? '+' : ''}{comparisonData.trends.scoreChange}%
                    </div>
                  </div>
                )}
              </div>

              {/* Score Comparison Chart */}
              <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 p-6">
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-6">
                  Overall Score Comparison
                </h3>
                
                <div className="space-y-4">
                  {comparisonData.assessmentScores.map((item, _index) => (
                    <div key={item.assessment.id} className="space-y-2">
                      <div className="flex items-center justify-between">
                        <div>
                          <div className="font-medium text-gray-900 dark:text-white">
                            {item.assessment.frameworkName}
                          </div>
                          <div className="text-sm text-gray-600 dark:text-gray-300">
                            {new Date(item.assessment.lastModified).toLocaleDateString()} • 
                            {item.completionRate}% Complete
                          </div>
                        </div>
                        <div className={`text-2xl font-bold ${getScoreColor(item.overallScore)}`}>
                          {item.overallScore}%
                        </div>
                      </div>
                      
                      <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-4">
                        <div
                          ref={setProgressBarRef(item.assessment.id, item.overallScore)}
                          className={`h-4 rounded-full transition-all duration-300 ${getScoreBgColor(item.overallScore)}`}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Section Comparison */}
              {comparisonData.assessmentScores.length > 0 && comparisonData.assessmentScores[0].sectionScores.length > 0 && (
                <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 p-6">
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-6">
                    Section Performance Comparison
                  </h3>
                  
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead>
                        <tr className="border-b border-gray-200 dark:border-gray-700">
                          <th className="text-left py-3 px-4 font-medium text-gray-900 dark:text-white">
                            Section
                          </th>
                          {comparisonData.assessmentScores.map((item, index) => (
                            <th key={item.assessment.id} className="text-center py-3 px-4 font-medium text-gray-900 dark:text-white">
                              Assessment {index + 1}
                            </th>
                          ))}
                        </tr>
                      </thead>
                      <tbody>
                        {comparisonData.assessmentScores[0].sectionScores.map((section, sectionIndex) => (
                          <tr key={sectionIndex} className="border-b border-gray-100 dark:border-gray-700/50">
                            <td className="py-3 px-4 font-medium text-gray-900 dark:text-white">
                              {section.name}
                            </td>
                            {comparisonData.assessmentScores.map((item) => (
                              <td key={item.assessment.id} className="py-3 px-4 text-center">
                                <span className={`font-bold ${getScoreColor(item.sectionScores[sectionIndex]?.score || 0)}`}>
                                  {item.sectionScores[sectionIndex]?.score || 0}%
                                </span>
                              </td>
                            ))}
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}

              {/* Assessment Details */}
              <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 p-6">
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-6">
                  Assessment Details
                </h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {comparisonData.assessmentScores.map((item, index) => (
                    <div key={item.assessment.id} className="border border-gray-200 dark:border-gray-700 rounded-lg p-4">
                      <div className="flex items-center justify-between mb-3">
                        <h4 className="font-semibold text-gray-900 dark:text-white">
                          Assessment {index + 1}
                        </h4>
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                          item.assessment.isComplete
                            ? 'bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-300'
                            : 'bg-yellow-100 dark:bg-yellow-900/30 text-yellow-800 dark:text-yellow-300'
                        }`}>
                          {item.assessment.isComplete ? 'Complete' : 'In Progress'}
                        </span>
                      </div>
                      
                      <div className="space-y-2 text-sm">
                        <div className="flex justify-between">
                          <span className="text-gray-600 dark:text-gray-300">Framework:</span>
                          <span className="text-gray-900 dark:text-white font-medium">
                            {item.assessment.frameworkName}
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600 dark:text-gray-300">Score:</span>
                          <span className={`font-bold ${getScoreColor(item.overallScore)}`}>
                            {item.overallScore}%
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600 dark:text-gray-300">Completion:</span>
                          <span className="text-gray-900 dark:text-white font-medium">
                            {item.completionRate}%
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600 dark:text-gray-300">Last Modified:</span>
                          <span className="text-gray-900 dark:text-white font-medium">
                            {new Date(item.assessment.lastModified).toLocaleDateString()}
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};