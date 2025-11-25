import React, { useState, useEffect, useMemo } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import AssessmentWizard from '../components/assessment/AssessmentWizard';
import AssessmentAccessGate from '../components/assessment/AssessmentAccessGate';
import apiService, { AssessmentConfig } from '../services/apiService';
import { useAuth } from '../context/AuthContext';
import { EnhancedAssessmentView } from '../features/ermits/EnhancedAssessmentView';
import { getFrameworkById } from '../data/frameworks';
import { AssessmentData } from '../shared/types/assessment';
import { Framework } from '../types/ermits';

const AssessmentPage: React.FC = () => {
  const { id, frameworkId } = useParams<{ id?: string; frameworkId?: string }>();
  const navigate = useNavigate();
  const location = useLocation();
  const { user } = useAuth();
  
  // Check if this is an ERMITS framework route
  const ermitsFramework = useMemo(() => {
    const fwId = frameworkId || id;
    if (fwId) {
      return getFrameworkById(fwId);
    }
    return null;
  }, [frameworkId, id]);
  
  const [isLoading, setIsLoading] = useState(id ? true : false);
  const [error, setError] = useState<string | null>(null);
  const [assessment, setAssessment] = useState<AssessmentData | null>(null);
  const [usedAssessments, setUsedAssessments] = useState({
    'threat-intelligence': false,
    'supply-chain-risk': true, 
    'compliance-management': true,
    'training-awareness': true
  });
  
  const remainingFreeAssessments = Object.values(usedAssessments).filter(used => !used).length;
  
  // If this is an ERMITS framework route, handle it differently
  const isErmitsRoute = !!ermitsFramework;
  
  // Fetch used assessments when component mounts
  useEffect(() => {
    const fetchUsedAssessments = async () => {
      const response = await apiService.getUsedAssessments();
      if (response.success && response.data) {
        setUsedAssessments(response.data);
      }
    };
    
    fetchUsedAssessments();
  }, []);
  
  // Fetch assessment details if id is provided
  useEffect(() => {
    if (isErmitsRoute && ermitsFramework) {
      // For ERMITS frameworks, check for assessmentId in query params
      const params = new URLSearchParams(location.search);
      const assessmentId = params.get('assessmentId');
      const templateId = params.get('templateId');
      
      if (assessmentId) {
        // Load existing assessment from localStorage
        setIsLoading(true);
        try {
          const storedAssessments = localStorage.getItem('ermits-assessments');
          if (storedAssessments) {
            const assessments: AssessmentData[] = JSON.parse(storedAssessments);
            const foundAssessment = assessments.find(a => a.id === assessmentId);
            if (foundAssessment) {
              // Convert date strings back to Date objects
              const loadedAssessment: AssessmentData = {
                ...foundAssessment,
                createdAt: new Date(foundAssessment.createdAt),
                lastModified: new Date(foundAssessment.lastModified)
              };
              setAssessment(loadedAssessment);
              setIsLoading(false);
              return;
            }
          }
          // If not found, create a new one
          const newAssessment: AssessmentData = {
            id: assessmentId,
            frameworkId: ermitsFramework.id,
            frameworkName: ermitsFramework.name,
            responses: {},
            createdAt: new Date(),
            lastModified: new Date(),
            isComplete: false,
            version: '1.0.0'
          };
          setAssessment(newAssessment);
        } catch (error) {
          console.error('Error loading assessment:', error);
          setError('Failed to load assessment');
        } finally {
          setIsLoading(false);
        }
      } else {
        // Create new assessment
        const newAssessment: AssessmentData = {
          id: `assessment-${Date.now()}`,
          frameworkId: ermitsFramework.id,
          frameworkName: ermitsFramework.name,
          responses: {},
          createdAt: new Date(),
          lastModified: new Date(),
          isComplete: false,
          version: '1.0.0',
          templateId: templateId || undefined
        };
        setAssessment(newAssessment);
      }
    } else if (id && id !== 'new') {
      // Legacy assessment loading
      const fetchAssessment = async () => {
        setIsLoading(true);
        setError(null);
        
        try {
          const response = await apiService.getAssessment(id);
          if (!response.success) {
            setError(response.error || 'Failed to load assessment');
          }
          // Note: In a real application, you would use the assessment data here
        } catch (err) {
          setError('An error occurred while loading the assessment');
        } finally {
          setIsLoading(false);
        }
      };
      
      fetchAssessment();
    }
  }, [id, isErmitsRoute, ermitsFramework, location.search]);
  
  const handleAssessmentComplete = async (config: AssessmentConfig) => {
    try {
      // Show loading state while creating
      setIsLoading(true);
      
      const response = await apiService.createAssessment(config);
      
      if (response.success && response.data) {
        // Navigate to the assessment
        navigate(`/assessment/${response.data.id}`);
      } else {
        setError(response.error || 'Failed to create assessment');
      }
    } catch (err) {
      setError('An error occurred while creating the assessment');
    } finally {
      setIsLoading(false);
    }
  };
  
  const handleUpgradeRequired = () => {
    navigate('/pricing');
  };
  
  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-96">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 dark:border-blue-400"></div>
      </div>
    );
  }
  
  // Handle ERMITS framework assessment
  if (isErmitsRoute && ermitsFramework) {
    if (!assessment) {
      return (
        <div className="flex justify-center items-center h-96">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 dark:border-blue-400"></div>
        </div>
      );
    }

    return (
      <EnhancedAssessmentView
        assessment={assessment}
        framework={ermitsFramework}
        onSave={(updatedAssessment) => {
          setAssessment(updatedAssessment);
          // Save to localStorage
          try {
            const storedAssessments = localStorage.getItem('ermits-assessments');
            let assessments: AssessmentData[] = storedAssessments ? JSON.parse(storedAssessments) : [];
            const index = assessments.findIndex(a => a.id === updatedAssessment.id);
            if (index >= 0) {
              assessments[index] = updatedAssessment;
            } else {
              assessments.push(updatedAssessment);
            }
            localStorage.setItem('ermits-assessments', JSON.stringify(assessments));
          } catch (error) {
            console.error('Error saving assessment:', error);
          }
        }}
        onGenerateReport={(assessmentData) => {
          // Generate and download report as JSON
          try {
            const reportData = {
              assessment: assessmentData,
              generatedAt: new Date().toISOString(),
              framework: ermitsFramework?.name,
              summary: {
                totalQuestions: Object.keys(assessmentData.responses || {}).length,
                completed: assessmentData.isComplete,
                lastModified: assessmentData.lastModified
              }
            };
            const blob = new Blob([JSON.stringify(reportData, null, 2)], { type: 'application/json' });
            const url = URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = `assessment-report-${assessmentData.id}-${Date.now()}.json`;
            a.click();
            URL.revokeObjectURL(url);
          } catch (error) {
            console.error('Error generating report:', error);
          }
        }}
        onBack={() => navigate('/assessments/multi-framework')}
      />
    );
  }

  if (error) {
    return (
      <div className="p-4 sm:p-6 md:p-8 max-w-7xl mx-auto">
        <div className="bg-red-50 dark:bg-red-900/20 p-6 rounded-lg border border-red-200 dark:border-red-800">
          <h2 className="text-xl font-semibold text-red-700 dark:text-red-300 mb-2">Error</h2>
          <p className="text-red-600 dark:text-red-400 mb-4">{error}</p>
          <button 
            onClick={() => navigate(-1)}
            className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
          >
            Go Back
          </button>
        </div>
      </div>
    );
  }
  
  // Legacy assessment wizard
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
          {id && id !== 'new'
            ? 'Continue Assessment' 
            : 'Start New Assessment'}
        </h1>
        <p className="text-gray-600 dark:text-gray-400">
          {id && id !== 'new'
            ? 'Continue your assessment where you left off.'
            : 'Configure and start a new security assessment to evaluate your organization\'s security posture.'}
        </p>
      </div>
      
      <AssessmentAccessGate
        userTier={user?.userTier || 'anonymous'}
        remainingFreeAssessments={remainingFreeAssessments}
      >
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
          <AssessmentWizard
            onComplete={handleAssessmentComplete}
            onUpgradeRequired={handleUpgradeRequired}
            userTier={user?.userTier || 'anonymous'}
            freeAssessmentsUsed={usedAssessments}
          />
        </div>
      </AssessmentAccessGate>
    </div>
  );
};

export default AssessmentPage;