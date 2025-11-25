import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { UnifiedWorkflowView } from '../components/workflow/UnifiedWorkflowView';
import SEOHead from '../components/common/SEOHead';
import LoadingSpinner from '../components/common/LoadingSpinner';
import { SkeletonWorkflowPhase, SkeletonMetrics } from '../components/common/SkeletonLoader';
import { AssessmentData } from '../shared/types';
import { ermitsFrameworks } from '../data/frameworks';

const UnifiedWorkflowPage: React.FC = () => {
  const navigate = useNavigate();
  const [assessments, setAssessments] = useState<AssessmentData[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Load assessments from localStorage
    const loadAssessments = async () => {
      setIsLoading(true);
      setError(null);
      
      try {
        // Simulate loading delay for better UX
        await new Promise(resolve => setTimeout(resolve, 300));
        
        const stored = localStorage.getItem('ermits-assessments');
        if (stored) {
          const parsed = JSON.parse(stored);
          setAssessments(Array.isArray(parsed) ? parsed : []);
        }
      } catch (error) {
        console.error('Failed to load assessments:', error);
        setError('Failed to load assessments. Please try refreshing the page.');
      } finally {
        setIsLoading(false);
      }
    };

    loadAssessments();
  }, []);

  if (isLoading) {
    return (
      <>
        <SEOHead 
          title="Unified Compliance Workflow - CyberSoluce"
          description="End-to-end compliance lifecycle: Audit → Implementation → Governance"
        />
        <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <div className="space-y-6">
              {/* Header Skeleton */}
              <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-6">
                <div className="h-8 bg-gray-200 dark:bg-gray-700 rounded w-64 mb-4 animate-pulse" />
                <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-96 mb-6 animate-pulse" />
                <SkeletonMetrics />
              </div>
              {/* Phase Skeletons */}
              <div className="space-y-4">
                <SkeletonWorkflowPhase />
                <SkeletonWorkflowPhase />
                <SkeletonWorkflowPhase />
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }

  if (error) {
    return (
      <>
        <SEOHead 
          title="Unified Compliance Workflow - CyberSoluce"
          description="End-to-end compliance lifecycle: Audit → Implementation → Governance"
        />
        <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-6">
              <div className="flex items-start space-x-3">
                <div className="flex-shrink-0">
                  <svg className="h-5 w-5 text-red-600 dark:text-red-400" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                  </svg>
                </div>
                <div className="flex-1">
                  <h3 className="text-sm font-medium text-red-800 dark:text-red-200">
                    Error Loading Workflow Data
                  </h3>
                  <p className="mt-2 text-sm text-red-700 dark:text-red-300">
                    {error}
                  </p>
                  <div className="mt-4">
                    <button
                      onClick={() => window.location.reload()}
                      className="text-sm font-medium text-red-800 dark:text-red-200 hover:text-red-900 dark:hover:text-red-100 underline"
                    >
                      Refresh Page
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <SEOHead 
        title="Unified Compliance Workflow - CyberSoluce"
        description="End-to-end compliance lifecycle: Audit → Implementation → Governance"
      />
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <UnifiedWorkflowView 
            assessments={assessments}
            frameworks={ermitsFrameworks}
          />
        </div>
      </div>
    </>
  );
};

export default UnifiedWorkflowPage;

