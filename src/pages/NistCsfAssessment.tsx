import React, { useState, useMemo, useRef, useEffect } from 'react';
import { Card } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { CheckCircle } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import AssessmentStartScreen, { SectionInfo } from '../components/assessment/AssessmentStartScreen';
import { useGovernanceStore } from '../stores/governanceStore';
import ControlEvidencePanel from '../components/framework/ControlEvidencePanel';

interface Question {
  id: string;
  question: string;
  control: string;
  guidance: string;
}

interface Section {
  title: string;
  description: string;
  estimatedTime: string;
  complexity: "Basic" | "Intermediate" | "Advanced";
  questionCount: number;
  questions: Question[];
}

const NistCsfAssessment: React.FC = () => {
  const navigate = useNavigate();
  const { categories, controls, getMappingsForControl } = useGovernanceStore();
  const [currentSection, setCurrentSection] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [showStartScreen, setShowStartScreen] = useState(true);
  const progressBarRef = useRef<HTMLDivElement>(null);

  // Filter NIST CSF categories and controls
  const nistCategories = useMemo(() => 
    categories.filter((c) => c.frameworkId === "nist-csf-2"),
    [categories]
  );

  const nistControls = useMemo(() =>
    controls.filter((ctrl) => ctrl.frameworkId === "nist-csf-2"),
    [controls]
  );

  // Build sections from NIST CSF categories
  const sections: Section[] = useMemo(() => {
    if (nistCategories.length === 0 || nistControls.length === 0) {
      return [];
    }

    return nistCategories.map((category) => {
      const categoryControls = nistControls.filter((ctrl) => ctrl.categoryId === category.id);
      
      return {
        title: category.name,
        description: category.description,
        estimatedTime: `${Math.ceil(categoryControls.length * 2)}min`,
        complexity: categoryControls.length > 5 ? "Advanced" as const : 
                   categoryControls.length > 3 ? "Intermediate" as const : "Basic" as const,
        questionCount: categoryControls.length,
        questions: categoryControls.map((control) => ({
          id: control.id,
          question: control.title,
          control: control.id,
          guidance: control.implementationGuidance || control.description,
        })),
      };
    }).filter((section) => section.questions.length > 0);
  }, [nistCategories, nistControls]);

  const handleAnswer = (questionId: string, answer: string) => {
    setAnswers((prev) => ({ ...prev, [questionId]: answer }));
  };

  const handleNext = () => {
    if (currentSection < sections.length - 1) {
      setCurrentSection(currentSection + 1);
    } else {
      // Assessment complete
      navigate('/assessment/results', { 
        state: { 
          domain: 'nist-csf',
          answers,
          sections 
        } 
      });
    }
  };

  const handlePrevious = () => {
    if (currentSection > 0) {
      setCurrentSection(currentSection - 1);
    }
  };

  const getProgress = () => {
    const totalQuestions = sections.reduce((sum, section) => sum + section.questions.length, 0);
    const answeredQuestions = Object.keys(answers).length;
    return totalQuestions > 0 ? Math.round((answeredQuestions / totalQuestions) * 100) : 0;
  };

  const getSectionProgress = (sectionIndex: number) => {
    const section = sections[sectionIndex];
    if (!section) return 0;
    const answered = section.questions.filter((q) => answers[q.id]).length;
    return section.questions.length > 0 
      ? Math.round((answered / section.questions.length) * 100) 
      : 0;
  };

  // Update progress bar width via CSS custom property
  useEffect(() => {
    if (progressBarRef.current) {
      const totalQuestions = sections.reduce((sum, section) => sum + section.questions.length, 0);
      const answeredQuestions = Object.keys(answers).length;
      const progress = totalQuestions > 0 ? Math.round((answeredQuestions / totalQuestions) * 100) : 0;
      progressBarRef.current.style.setProperty('--progress-width', `${progress}%`);
    }
  }, [answers, sections]);


  if (sections.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center p-6">
        <Card className="max-w-2xl w-full p-8">
          <div className="text-center">
            {/* Fallback icon if AlertTriangle is not available */}
            <svg
              className="h-16 w-16 text-yellow-500 mx-auto mb-4"
              fill="none"
              stroke="currentColor"
              strokeWidth={2}
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 9v4m0 4h.01M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"
              />
            </svg>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
              NIST CSF Framework Not Loaded
            </h2>
            <p className="text-gray-600 dark:text-gray-400 mb-6">
              The NIST CSF v2 framework is being loaded. Please refresh the page in a moment.
            </p>
            <Button onClick={() => window.location.reload()}>
              Refresh Page
            </Button>
          </div>
        </Card>
      </div>
    );
  }

  if (showStartScreen) {
    const sectionInfos: SectionInfo[] = sections.map((section) => ({
      title: section.title,
      description: section.description,
      estimatedTime: section.estimatedTime,
      complexity: section.complexity,
      questionCount: section.questionCount,
    }));

    return (
      <AssessmentStartScreen
        title="NIST CSF v2 Program Assessment"
        description="Comprehensive assessment of your organization's cybersecurity posture aligned with the NIST Cybersecurity Framework v2.0"
        frameworkName="NIST CSF v2.0"
        sections={sectionInfos}
        onStart={() => setShowStartScreen(false)}
      />
    );
  }

  const currentSectionData = sections[currentSection];
  if (!currentSectionData) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 p-6">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="mb-6">
          <Link to="/dashboard" className="inline-flex items-center text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white mb-4">
            <svg
              className="h-4 w-4 mr-2"
              fill="none"
              stroke="currentColor"
              strokeWidth={2}
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15 19l-7-7 7-7"
              />
            </svg>
            Back to Dashboard
          </Link>
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
                NIST CSF v2 Assessment
              </h1>
              <p className="text-gray-600 dark:text-gray-400 mt-1">
                Section {currentSection + 1} of {sections.length}: {currentSectionData.title}
              </p>
            </div>
            <div className="text-right">
              <div className="text-sm text-gray-600 dark:text-gray-400">Overall Progress</div>
              <div className="text-2xl font-bold text-gray-900 dark:text-white">{getProgress()}%</div>
            </div>
          </div>
           <div className="mt-4 w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
             <div
               ref={progressBarRef}
               className="progress-bar-fill"
             />
           </div>
        </div>

        {/* Section Progress */}
        <Card className="mb-6 p-4">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-sm text-gray-600 dark:text-gray-400">Section Progress</div>
              <div className="text-xl font-semibold text-gray-900 dark:text-white">
                {getSectionProgress(currentSection)}%
              </div>
            </div>
            <div className="text-sm text-gray-600 dark:text-gray-400">
              {currentSectionData.questions.filter((q) => answers[q.id]).length} / {currentSectionData.questions.length} answered
            </div>
          </div>
        </Card>

        {/* Questions */}
        <div className="space-y-6">
          {currentSectionData.questions.map((question, index) => (
            <Card key={question.id} className="p-6">
              <div className="mb-4">
                <div className="flex items-start justify-between mb-2">
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                    Question {index + 1}
                  </h3>
                  <span className="text-xs text-gray-500 dark:text-gray-400 bg-gray-100 dark:bg-gray-800 px-2 py-1 rounded">
                    {question.control}
                  </span>
                </div>
                <p className="text-gray-700 dark:text-gray-300 mb-4">{question.question}</p>
                {question.guidance && (
                  <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-4 mb-4">
                    <div className="flex items-start">
                      {/* Fixed: use lucide-react Info icon import if not present */}
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-blue-600 dark:text-blue-400 mr-2 mt-0.5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <circle cx="12" cy="12" r="10" strokeWidth="2" />
                        <line x1="12" y1="16" x2="12" y2="12" strokeWidth="2" />
                        <circle cx="12" cy="8" r="1.5" />
                      </svg>
                      <div>
                        <div className="text-sm font-medium text-blue-900 dark:text-blue-100 mb-1">
                          Guidance
                        </div>
                        <div className="text-sm text-blue-800 dark:text-blue-200">
                          {question.guidance}
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Answer Options */}
              <div className="space-y-2">
                {['Not Implemented', 'Partially Implemented', 'Largely Implemented', 'Fully Implemented'].map((option) => {
                  const isSelected = answers[question.id] === option;
                  return (
                    <button
                      key={option}
                      onClick={() => handleAnswer(question.id, option)}
                      className={`w-full text-left p-4 rounded-lg border-2 transition-all ${
                        isSelected
                          ? 'border-blue-600 bg-blue-50 dark:bg-blue-900/20'
                          : 'border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600'
                      }`}
                    >
                      <div className="flex items-center">
                        {isSelected ? (
                          <CheckCircle className="h-5 w-5 text-blue-600 dark:text-blue-400 mr-3" />
                        ) : (
                          <CheckCircle className="h-5 w-5 text-gray-400 mr-3" />
                        )}
                        <span className="text-gray-900 dark:text-white font-medium">{option}</span>
                      </div>
                    </button>
                  );
                })}
              </div>

              {/* Mappings Badge */}
              {(() => {
                const mappings = getMappingsForControl(question.id);
                return mappings.length > 0 && (
                  <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700">
                    <span className="inline-flex items-center px-2 py-1 text-xs rounded bg-action-cyan-50 text-action-cyan-700 dark:bg-action-cyan-900/30 dark:text-action-cyan-300">
                      {mappings.length} mapped control{mappings.length > 1 ? 's' : ''}
                    </span>
                  </div>
                );
              })()}

              {/* Evidence Panel */}
              <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700">
                <ControlEvidencePanel
                  controlId={question.id}
                  frameworkId="nist-csf-2"
                />
              </div>
            </Card>
          ))}
        </div>

        {/* Navigation */}
        <div className="mt-8 flex items-center justify-between">
          <Button
            variant="outline"
            onClick={handlePrevious}
            disabled={currentSection === 0}
          >
            {/* Replace with an inline svg chevron icon since ChevronLeft is not defined */}
            <svg
              className="h-4 w-4 mr-2"
              fill="none"
              stroke="currentColor"
              strokeWidth={2}
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
            </svg>
            Previous
          </Button>
          <Button
            onClick={handleNext}
            disabled={currentSectionData.questions.some((q) => !answers[q.id])}
          >
            {currentSection === sections.length - 1 ? 'Complete Assessment' : 'Next Section'}
            {/* Replace with an inline svg chevron icon since ChevronRight is not defined */}
            <svg
              className="h-4 w-4 ml-2"
              fill="none"
              stroke="currentColor"
              strokeWidth={2}
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
            </svg>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default NistCsfAssessment;

