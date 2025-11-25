import React, { useState, useEffect, useRef, useCallback } from 'react';
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore - Icons exist in lucide-react but TypeScript definitions may be outdated
import * as LucideIcons from 'lucide-react';

// Type-safe icon imports with fallbacks
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const LucideIconsAny = LucideIcons as any;
const ChevronLeft = LucideIconsAny.ChevronLeft as React.ComponentType<{ className?: string; [key: string]: unknown }>;
const ChevronRight = LucideIconsAny.ChevronRight as React.ComponentType<{ className?: string; [key: string]: unknown }>;
const Save = LucideIconsAny.Save as React.ComponentType<{ className?: string; [key: string]: unknown }>;
const BookOpen = LucideIconsAny.BookOpen as React.ComponentType<{ className?: string; [key: string]: unknown }>;
const Bookmark = LucideIconsAny.Bookmark as React.ComponentType<{ className?: string; [key: string]: unknown }>;
const BookmarkCheck = LucideIconsAny.BookmarkCheck as React.ComponentType<{ className?: string; [key: string]: unknown }>;
const Play = LucideIconsAny.Play as React.ComponentType<{ className?: string; [key: string]: unknown }>;
const Pause = LucideIconsAny.Pause as React.ComponentType<{ className?: string; [key: string]: unknown }>;
const MessageSquare = LucideIconsAny.MessageSquare as React.ComponentType<{ className?: string; [key: string]: unknown }>;
const Flag = LucideIconsAny.Flag as React.ComponentType<{ className?: string; [key: string]: unknown }>;
const Lightbulb = LucideIconsAny.Lightbulb as React.ComponentType<{ className?: string; [key: string]: unknown }>;
const Timer = LucideIconsAny.Timer as React.ComponentType<{ className?: string; [key: string]: unknown }>;
const Zap = LucideIconsAny.Zap as React.ComponentType<{ className?: string; [key: string]: unknown }>;
const Star = LucideIconsAny.Star as React.ComponentType<{ className?: string; [key: string]: unknown }>;
const History = LucideIconsAny.History as React.ComponentType<{ className?: string; [key: string]: unknown }>;

// Icons that TypeScript recognizes
const { FileText, Clock, BarChart3, Shield } = LucideIcons;
import { Breadcrumbs } from './Breadcrumbs';
import { AssessmentData, QuestionEvidence, EvidenceItem } from '../../shared/types/assessment';
import { Framework, Question } from '../../types/ermits';
import { EvidenceManager } from './EvidenceManager';
import { useAuth } from '../../context/AuthContext';

interface EnhancedAssessmentViewProps {
  assessment: AssessmentData;
  framework: Framework;
  onSave: (assessment: AssessmentData) => void;
  onGenerateReport: (assessment: AssessmentData) => void;
  onBack: () => void;
}

export const EnhancedAssessmentView: React.FC<EnhancedAssessmentViewProps> = ({
  assessment,
  framework,
  onSave,
  onGenerateReport,
  onBack
}) => {
  const { user } = useAuth();
  const [currentSectionIndex, setCurrentSectionIndex] = useState(0);
  const [currentCategoryIndex, setCurrentCategoryIndex] = useState(0);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [responses, setResponses] = useState<Record<string, number>>(assessment.responses);
  const [bookmarks, setBookmarks] = useState<string[]>(assessment.bookmarks || []);
  const [showGuidance, setShowGuidance] = useState<string | null>(null);
  const [autoSave, setAutoSave] = useState(true);
  const [lastSaved, setLastSaved] = useState<Date>(assessment.lastModified);
  const [sessionStartTime] = useState<Date>(new Date());
  const [questionStartTime, setQuestionStartTime] = useState<Date>(new Date());
  const [timeSpentPerQuestion, setTimeSpentPerQuestion] = useState<Record<string, number>>({});
  const [notes, setNotes] = useState<Record<string, string>>(() => {
    if (assessment.questionNotes) {
      return assessment.questionNotes;
    }
    if (assessment.notes) {
      try {
        return JSON.parse(assessment.notes);
      } catch (error) {
        console.warn('Failed to parse assessment.notes as JSON:', error);
        return {};
      }
    }
    return {};
  });
  const [showNotes, setShowNotes] = useState(false);
  const [showTimer, _setShowTimer] = useState(true);
  const [sessionTime, setSessionTime] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [showHints, setShowHints] = useState(false);
  const [confidence, setConfidence] = useState<Record<string, number>>({});
  const [flaggedQuestions, setFlaggedQuestions] = useState<string[]>([]);
  const [questionEvidence, setQuestionEvidence] = useState<Record<string, QuestionEvidence[]>>(
    assessment.questionEvidence || {}
  );
  const [evidenceLibrary, setEvidenceLibrary] = useState<EvidenceItem[]>(
    assessment.evidenceLibrary || []
  );
  const [_showVersionHistory, setShowVersionHistory] = useState(false);
  
  const timerRef = useRef<NodeJS.Timeout>();
  const progressBarRef = useRef<HTMLDivElement>(null);

  const currentSection = framework?.sections?.[currentSectionIndex];
  const currentCategory = currentSection?.categories?.[currentCategoryIndex];
  const currentQuestion = currentCategory?.questions?.[currentQuestionIndex];

  // Calculate totalQuestions as a memoized value to avoid recalculation
  const totalQuestionsMemo = React.useMemo(() => {
    return (framework?.sections || []).reduce((sum: number, section: { categories?: Array<{ questions?: unknown[] }> }) => {
      const categories = section?.categories || [];
      return sum + categories.reduce((catSum: number, category: { questions?: unknown[] }) => {
        const questions = category?.questions || [];
        return catSum + questions.length;
      }, 0);
    }, 0);
  }, [framework]);
  
  const answeredQuestions = Object.keys(responses).length;
  const progressPercentage = totalQuestionsMemo > 0 ? Math.round((answeredQuestions / totalQuestionsMemo) * 100) : 0;

  // Timer functionality
  useEffect(() => {
    if (!isPaused) {
      timerRef.current = setInterval(() => {
        setSessionTime(prev => prev + 1);
      }, 1000);
    } else {
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    }

    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    };
  }, [isPaused]);

  // Track time spent on each question
  useEffect(() => {
    if (currentQuestion) {
      setQuestionStartTime(new Date());
    }
  }, [currentQuestion]);

  // Update progress bar width
  useEffect(() => {
    if (progressBarRef.current) {
      progressBarRef.current.style.width = `${progressPercentage}%`;
    }
  }, [progressPercentage]);

  const handleResponseChange = (questionId: string, value: number) => {
    // Track time spent on previous question
    if (currentQuestion && timeSpentPerQuestion[currentQuestion.id] === undefined) {
      const timeSpent = Math.round((new Date().getTime() - questionStartTime.getTime()) / 1000);
      setTimeSpentPerQuestion(prev => ({
        ...prev,
        [currentQuestion.id]: timeSpent
      }));
    }

    setResponses(prev => ({
      ...prev,
      [questionId]: value
    }));
  };

  const handleBookmark = (questionId: string) => {
    setBookmarks(prev => 
      prev.includes(questionId)
        ? prev.filter(id => id !== questionId)
        : [...prev, questionId]
    );
  };

  const handleFlag = (questionId: string) => {
    setFlaggedQuestions(prev => 
      prev.includes(questionId)
        ? prev.filter(id => id !== questionId)
        : [...prev, questionId]
    );
  };

  const handleNoteChange = (questionId: string, note: string) => {
    setNotes(prev => ({
      ...prev,
      [questionId]: note
    }));
  };

  const handleConfidenceChange = (questionId: string, level: number) => {
    setConfidence(prev => ({
      ...prev,
      [questionId]: level
    }));
  };

  // Helper function to get user display name
  const getUserDisplayName = useCallback((): string => {
    if (!user) return 'Anonymous User';
    if (user.firstName && user.lastName) {
      return `${user.firstName} ${user.lastName}`;
    }
    if (user.email) {
      return user.email.split('@')[0];
    }
    return 'User';
  }, [user]);

  const handleSave = useCallback(() => {
    const totalTimeSpent = Math.round((new Date().getTime() - sessionStartTime.getTime()) / 60000);
    
    const updatedAssessment: AssessmentData = {
      ...assessment,
      responses,
      bookmarks,
      lastModified: new Date(),
      isComplete: answeredQuestions === totalQuestionsMemo,
      timeSpent: (assessment.timeSpent || 0) + totalTimeSpent,
      questionNotes: notes,
      notes: assessment.notes, // Keep legacy notes field for backward compatibility
      questionEvidence,
      evidenceLibrary,
      assessmentVersion: assessment.assessmentVersion || '1.0.0',
      versionHistory: assessment.versionHistory || [],
      changeLog: [
        ...(assessment.changeLog || []),
        {
          id: Date.now().toString(),
          timestamp: new Date(),
          changeType: 'response_modified',
          changedBy: getUserDisplayName(),
          impact: 'medium',
          reviewRequired: false,
          automatedChange: false,
          rollbackable: true,
          confidenceLevel: 'high'
        }
      ],
      customFields: {
        ...assessment.customFields,
        timeSpentPerQuestion,
        confidence,
        flaggedQuestions,
        sessionData: {
          startTime: sessionStartTime,
          duration: totalTimeSpent
        }
      }
    };
    
    onSave(updatedAssessment);
    setLastSaved(new Date());
  }, [assessment, responses, answeredQuestions, totalQuestionsMemo, onSave, bookmarks, notes, questionEvidence, evidenceLibrary, sessionStartTime, timeSpentPerQuestion, confidence, flaggedQuestions, getUserDisplayName]);

  // Auto-save functionality
  useEffect(() => {
    if (autoSave && (Object.keys(responses).length > 0 || Object.keys(notes).length > 0)) {
      const timer = setTimeout(() => {
        handleSave();
      }, 5000);

      return () => clearTimeout(timer);
    }
  }, [responses, autoSave, bookmarks, notes, handleSave]);

  const formatTime = (seconds: number) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    
    if (hours > 0) {
      return `${hours}:${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
    }
    return `${minutes}:${secs.toString().padStart(2, '0')}`;
  };

  const getQuestionRiskLevel = (_question: Question, response?: number) => {
    if (response === undefined) return 'unknown';
    if (response === 0) return 'critical';
    if (response === 1) return 'high';
    if (response === 2) return 'medium';
    return 'low';
  };

  const goToNextQuestion = () => {
    if (!framework?.sections || framework.sections.length === 0) return;
    
    const section = framework.sections[currentSectionIndex];
    if (!section?.categories || section.categories.length === 0) return;
    
    const category = section.categories[currentCategoryIndex];
    if (!category?.questions || category.questions.length === 0) return;
    
    if (currentQuestionIndex < category.questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else if (currentCategoryIndex < section.categories.length - 1) {
      setCurrentCategoryIndex(currentCategoryIndex + 1);
      setCurrentQuestionIndex(0);
    } else if (currentSectionIndex < framework.sections.length - 1) {
      setCurrentSectionIndex(currentSectionIndex + 1);
      setCurrentCategoryIndex(0);
      setCurrentQuestionIndex(0);
    }
  };

  const goToPreviousQuestion = () => {
    if (!framework?.sections || framework.sections.length === 0) return;
    
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
    } else if (currentCategoryIndex > 0) {
      const section = framework.sections[currentSectionIndex];
      if (!section?.categories || section.categories.length === 0) return;
      
      const prevCategoryIndex = currentCategoryIndex - 1;
      const prevCategory = section.categories[prevCategoryIndex];
      if (!prevCategory?.questions || prevCategory.questions.length === 0) return;
      
      setCurrentCategoryIndex(prevCategoryIndex);
      setCurrentQuestionIndex(prevCategory.questions.length - 1);
    } else if (currentSectionIndex > 0) {
      const prevSectionIndex = currentSectionIndex - 1;
      const prevSection = framework.sections[prevSectionIndex];
      if (!prevSection?.categories || prevSection.categories.length === 0) return;
      
      const lastCategoryIndex = prevSection.categories.length - 1;
      const prevCategory = prevSection.categories[lastCategoryIndex];
      if (!prevCategory?.questions || prevCategory.questions.length === 0) return;
      
      setCurrentSectionIndex(prevSectionIndex);
      setCurrentCategoryIndex(lastCategoryIndex);
      setCurrentQuestionIndex(prevCategory.questions.length - 1);
    }
  };

  // Evidence management handlers
  const handleEvidenceUpload = useCallback(async (file: File): Promise<EvidenceItem> => {
    // Create a new evidence item from the uploaded file
    const newEvidence: EvidenceItem = {
      id: `evidence-${Date.now()}-${Math.random().toString(36).slice(2, 11)}`,
      name: file.name,
      type: file.type.startsWith('image/') ? 'screenshot' : 
            file.type.includes('pdf') ? 'document' :
            file.type.includes('word') || file.type.includes('excel') ? 'document' :
            'other',
      description: `Uploaded evidence file: ${file.name}`,
      uploadedAt: new Date(),
      uploadedBy: getUserDisplayName(),
      fileSize: file.size,
      mimeType: file.type,
      tags: [],
      linkedQuestions: [],
      version: '1.0',
      status: 'active',
      confidentialityLevel: 'internal',
      metadata: {
        originalFileName: file.name,
        uploadTimestamp: new Date().toISOString(),
        uploadedByUserId: user?.id || null,
        uploadedByEmail: user?.email || null
      }
    };

    // Add to evidence library
    setEvidenceLibrary(prev => [...prev, newEvidence]);
    
    // Trigger auto-save if enabled
    if (autoSave) {
      setTimeout(() => handleSave(), 1000);
    }

    return newEvidence;
  }, [autoSave, handleSave, getUserDisplayName, user]);

  const handleEvidenceLink = useCallback(async (evidenceId: string, relevance: 'primary' | 'supporting' | 'reference'): Promise<void> => {
    if (!currentQuestion) return;

    const newLink: QuestionEvidence = {
      evidenceId,
      relevance,
      linkedAt: new Date(),
      linkedBy: getUserDisplayName(),
      confidence: 'medium'
    };

    setQuestionEvidence(prev => {
      const currentLinks = prev[currentQuestion.id] || [];
      // Check if already linked
      if (currentLinks.some(link => link.evidenceId === evidenceId)) {
        return prev; // Already linked
      }
      return {
        ...prev,
        [currentQuestion.id]: [...currentLinks, newLink]
      };
    });

    // Update evidence library to include this question in linkedQuestions
    setEvidenceLibrary(prev => prev.map(evidence => {
      if (evidence.id === evidenceId && !evidence.linkedQuestions.includes(currentQuestion.id)) {
        return {
          ...evidence,
          linkedQuestions: [...evidence.linkedQuestions, currentQuestion.id]
        };
      }
      return evidence;
    }));

    // Trigger auto-save if enabled
    if (autoSave) {
      setTimeout(() => handleSave(), 500);
    }
  }, [currentQuestion, autoSave, handleSave]);

  const handleEvidenceUnlink = useCallback(async (evidenceId: string): Promise<void> => {
    if (!currentQuestion) return;

    setQuestionEvidence(prev => {
      const currentLinks = prev[currentQuestion.id] || [];
      return {
        ...prev,
        [currentQuestion.id]: currentLinks.filter(link => link.evidenceId !== evidenceId)
      };
    });

    // Update evidence library to remove this question from linkedQuestions
    setEvidenceLibrary(prev => prev.map(evidence => {
      if (evidence.id === evidenceId) {
        return {
          ...evidence,
          linkedQuestions: evidence.linkedQuestions.filter(qId => qId !== currentQuestion.id)
        };
      }
      return evidence;
    }));

    // Trigger auto-save if enabled
    if (autoSave) {
      setTimeout(() => handleSave(), 500);
    }
  }, [currentQuestion, autoSave, handleSave]);

  if (!currentQuestion) {
    return <div>Loading...</div>;
  }

  const isBookmarked = bookmarks.includes(currentQuestion.id);
  const isFlagged = flaggedQuestions.includes(currentQuestion.id);
  const currentResponse = responses[currentQuestion.id];
  const riskLevel = getQuestionRiskLevel(currentQuestion, currentResponse);
  
  // Get evidence for current question
  const currentQuestionEvidence = questionEvidence[currentQuestion.id] || [];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Breadcrumbs */}
      <div className="mb-6">
        <Breadcrumbs
          items={[
            { label: 'Dashboard', href: '#' },
            { label: `${framework?.name || 'Unknown Framework'} Assessment` }
          ]}
          onBack={onBack}
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Enhanced Sidebar */}
        <div className="lg:col-span-1">
          <div className="bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm rounded-xl shadow-xl border border-gray-200 dark:border-gray-700 sticky top-24">
            {/* Session Timer */}
            {showTimer && (
              <div className="p-4 border-b border-gray-200 dark:border-gray-700 bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 rounded-t-xl">
                <div className="flex items-center justify-between mb-2">
                  <h4 className="font-bold text-gray-900 dark:text-white flex items-center space-x-2">
                    <Timer className="w-4 h-4 text-green-600 dark:text-green-400" />
                    <span>Session Time</span>
                  </h4>
                  <button
                    onClick={() => setIsPaused(!isPaused)}
                    aria-label={isPaused ? 'Resume session timer' : 'Pause session timer'}
                    title={isPaused ? 'Resume session timer' : 'Pause session timer'}
                    className="p-1 rounded-full hover:bg-green-100 dark:hover:bg-green-900/30 transition-colors"
                  >
                    <span className="sr-only">{isPaused ? 'Resume' : 'Pause'} timer</span>
                    {isPaused ? <Play className="w-4 h-4 text-green-600" aria-hidden="true" /> : <Pause className="w-4 h-4 text-green-600" aria-hidden="true" />}
                  </button>
                </div>
                <div className="text-2xl font-bold text-green-600 dark:text-green-400">
                  {formatTime(sessionTime)}
                </div>
                <div className="text-xs text-green-700 dark:text-green-300 mt-1">
                  Avg: {Math.round(sessionTime / Math.max(answeredQuestions, 1))}s per question
                </div>
              </div>
            )}

            {/* Progress Overview */}
            <div className="p-6 border-b border-gray-200 dark:border-gray-700 bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-bold text-gray-900 dark:text-white flex items-center space-x-2">
                  <BarChart3 className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                  <span>Progress</span>
                </h3>
                <span className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                  {progressPercentage}%
                </span>
              </div>
              <div 
                className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-4 mb-4 overflow-hidden shadow-inner"
                aria-label={`Assessment progress: ${progressPercentage}%`}
              >
                <div
                  ref={progressBarRef}
                  className="bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-500 h-4 rounded-full transition-all duration-500 shadow-lg relative overflow-hidden"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-pulse"></div>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-2 text-xs">
                <div className="text-gray-700 dark:text-gray-200">
                  <span className="font-medium">{answeredQuestions}</span> / {totalQuestionsMemo} completed
                </div>
                <div className="text-gray-700 dark:text-gray-200">
                  <span className="font-medium">{bookmarks.length}</span> bookmarked
                </div>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="p-4 border-b border-gray-200 dark:border-gray-700">
              <h4 className="font-bold text-gray-900 dark:text-white mb-3 flex items-center space-x-2">
                <Zap className="w-4 h-4 text-yellow-600 dark:text-yellow-400" />
                <span>Quick Actions</span>
              </h4>
              <div className="grid grid-cols-2 gap-2">
                <button
                  onClick={() => handleBookmark(currentQuestion.id)}
                  className={`p-2 rounded-lg text-xs font-medium transition-all duration-200 flex items-center justify-center space-x-1 ${
                    isBookmarked
                      ? 'bg-yellow-100 dark:bg-yellow-900/30 text-yellow-800 dark:text-yellow-300'
                      : 'bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 hover:bg-yellow-50 dark:hover:bg-yellow-900/20'
                  }`}
                >
                  {isBookmarked ? <BookmarkCheck className="w-3 h-3" /> : <Bookmark className="w-3 h-3" />}
                  <span>Bookmark</span>
                </button>
                
                <button
                  onClick={() => handleFlag(currentQuestion.id)}
                  className={`p-2 rounded-lg text-xs font-medium transition-all duration-200 flex items-center justify-center space-x-1 ${
                    isFlagged
                      ? 'bg-red-100 dark:bg-red-900/30 text-red-800 dark:text-red-300'
                      : 'bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 hover:bg-red-50 dark:hover:bg-red-900/20'
                  }`}
                >
                  <Flag className="w-3 h-3" />
                  <span>Flag</span>
                </button>
                
                <button
                  onClick={() => setShowNotes(!showNotes)}
                  className={`p-2 rounded-lg text-xs font-medium transition-all duration-200 flex items-center justify-center space-x-1 ${
                    showNotes || notes[currentQuestion.id]
                      ? 'bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-300'
                      : 'bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 hover:bg-blue-50 dark:hover:bg-blue-900/20'
                  }`}
                >
                  <MessageSquare className="w-3 h-3" />
                  <span>Notes</span>
                  {notes[currentQuestion.id] && (
                    <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse" />
                  )}
                </button>
                
                <button
                  onClick={() => setShowHints(!showHints)}
                  className="p-2 rounded-lg text-xs font-medium bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 hover:bg-purple-50 dark:hover:bg-purple-900/20 transition-all duration-200 flex items-center justify-center space-x-1"
                >
                  <Lightbulb className="w-3 h-3" />
                  <span>Hints</span>
                </button>
              </div>
            </div>

            {/* Auto-save Toggle */}
            <div className="p-6 bg-gradient-to-r from-gray-50 to-blue-50 dark:from-gray-700 dark:to-blue-900/20 rounded-b-xl">
              <label className="flex items-center space-x-3">
                <input
                  type="checkbox"
                  checked={autoSave}
                  onChange={(e) => setAutoSave(e.target.checked)}
                  className="rounded border-gray-300 text-blue-600 focus:ring-blue-500 focus:ring-offset-2 transform hover:scale-110 transition-transform"
                />
                <span className="text-sm font-medium text-gray-700 dark:text-gray-200">
                  Auto-save
                </span>
              </label>
              {lastSaved && (
                <div className="text-xs text-gray-600 dark:text-gray-300 mt-3 flex items-center space-x-1">
                  <Clock className="w-3 h-3" />
                  <span>Last saved: {lastSaved.toLocaleTimeString()}</span>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Enhanced Main Content */}
        <div className="lg:col-span-3">
          <div className="bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm rounded-xl shadow-xl border border-gray-200 dark:border-gray-700">
            {/* Enhanced Header */}
            <div className="p-8 border-b border-gray-200 dark:border-gray-700 bg-gradient-to-r from-white to-blue-50 dark:from-gray-800 dark:to-blue-900/20 rounded-t-xl">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center space-x-4">
                  <div className="p-3 bg-gradient-to-br from-blue-100 to-indigo-100 dark:from-blue-900/30 dark:to-indigo-900/30 rounded-xl">
                    <Shield className="w-8 h-8 text-blue-600 dark:text-blue-400" />
                  </div>
                  <div>
                    <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                      {framework?.name || 'Unknown Framework'} Assessment
                    </h1>
                    <div className="flex items-center space-x-4 mt-1">
                      <p className="text-gray-600 dark:text-gray-300">
                        Version {framework?.version || 'Unknown'} • {framework?.complexity || 'Unknown'} complexity
                      </p>
                      {currentResponse !== undefined && (
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                          riskLevel === 'critical' ? 'bg-red-100 dark:bg-red-900/30 text-red-800 dark:text-red-300' :
                          riskLevel === 'high' ? 'bg-orange-100 dark:bg-orange-900/30 text-orange-800 dark:text-orange-300' :
                          riskLevel === 'medium' ? 'bg-yellow-100 dark:bg-yellow-900/30 text-yellow-800 dark:text-yellow-300' :
                          'bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-300'
                        }`}>
                          Risk: {riskLevel}
                        </span>
                      )}
                    </div>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex items-center space-x-4">
                  <button
                    onClick={handleSave}
                    className="flex items-center space-x-2 bg-gradient-to-r from-blue-600 to-blue-700 text-white px-6 py-3 rounded-xl hover:from-blue-700 hover:to-blue-800 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:scale-105 font-medium"
                  >
                    <Save className="w-5 h-5" />
                    <span>Save Progress</span>
                  </button>
                  
                  <button
                    onClick={() => onGenerateReport(assessment)}
                    className="flex items-center space-x-2 bg-gradient-to-r from-green-600 to-green-700 text-white px-6 py-3 rounded-xl hover:from-green-700 hover:to-green-800 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:scale-105 font-medium"
                  >
                    <FileText className="w-5 h-5" />
                    <span>Generate Report</span>
                  </button>
                  
                  <button
                    onClick={() => setShowVersionHistory(true)}
                    className="flex items-center space-x-2 bg-gradient-to-r from-purple-600 to-purple-700 text-white px-6 py-3 rounded-xl hover:from-purple-700 hover:to-purple-800 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:scale-105 font-medium"
                  >
                    <History className="w-5 h-5" />
                    <span>Version History</span>
                  </button>
                </div>
              </div>

              {/* Enhanced Breadcrumb */}
                <div className="flex items-center space-x-2 text-sm text-gray-600 dark:text-gray-300 bg-white/50 dark:bg-gray-700/50 backdrop-blur-sm px-4 py-2 rounded-lg border border-gray-200 dark:border-gray-600">
                <span>{framework?.name || 'Unknown Framework'}</span>
                <ChevronRight className="w-4 h-4" />
                <span>{currentSection?.name || 'Unknown Section'}</span>
                <ChevronRight className="w-4 h-4" />
                <span>{currentCategory?.name || 'Unknown Category'}</span>
                <ChevronRight className="w-4 h-4" />
                <span>Question {currentQuestionIndex + 1}</span>
                {isBookmarked && <BookmarkCheck className="w-4 h-4 text-yellow-500" />}
                {isFlagged && <Flag className="w-4 h-4 text-red-500" />}
              </div>
            </div>

            {/* Enhanced Question Content */}
            <div className="p-8">
              {/* Question */}
              <div className="bg-gradient-to-br from-gray-50 via-blue-50/30 to-indigo-50/30 dark:from-gray-700/50 dark:via-blue-900/10 dark:to-indigo-900/10 rounded-2xl p-8 mb-8 border border-gray-200 dark:border-gray-600 shadow-lg">
                <div className="flex items-start space-x-3 mb-4">
                  <div className="flex-shrink-0 w-10 h-10 bg-gradient-to-br from-blue-600 to-indigo-600 text-white rounded-full flex items-center justify-center font-bold text-lg shadow-lg">
                    {currentQuestionIndex + 1}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center space-x-3 mb-4">
                      <span className={`text-sm font-bold px-3 py-1 rounded-full ${
                        currentQuestion.priority === 'high' ? 'bg-red-100 dark:bg-red-900/30 text-red-800 dark:text-red-300' :
                        currentQuestion.priority === 'medium' ? 'bg-yellow-100 dark:bg-yellow-900/30 text-yellow-800 dark:text-yellow-300' :
                        'bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-300'
                      }`}>
                        {currentQuestion.priority.charAt(0).toUpperCase() + currentQuestion.priority.slice(1)} Priority
                      </span>
                      {currentQuestion.references && currentQuestion.references.length > 0 && (
                        <span className="text-xs bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 px-2 py-1 rounded">
                          Ref: {currentQuestion.references.join(', ')}
                        </span>
                      )}
                    </div>
                    
                    <h4 className="text-xl font-bold text-gray-900 dark:text-white mb-6 leading-relaxed">
                      {currentQuestion.text}
                    </h4>
                    
                    {/* Enhanced Guidance */}
                    {currentQuestion.guidance && (
                      <div className="mb-6">
                        <button
                          onClick={() => setShowGuidance(showGuidance === currentQuestion.id ? null : currentQuestion.id)}
                          className="flex items-center space-x-2 text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 transition-all duration-200 bg-blue-50 dark:bg-blue-900/20 px-4 py-2 rounded-lg hover:bg-blue-100 dark:hover:bg-blue-900/30 transform hover:scale-105"
                        >
                          <BookOpen className="w-5 h-5" />
                          <span className="font-medium">
                            {showGuidance === currentQuestion.id ? 'Hide' : 'Show'} Guidance
                          </span>
                        </button>
                        
                        {showGuidance === currentQuestion.id && (
                          <div className="mt-4 p-6 bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 rounded-xl border border-blue-200 dark:border-blue-700 shadow-lg animate-slide-up">
                            <p className="text-blue-800 dark:text-blue-200 leading-relaxed mb-4">
                              {currentQuestion.guidance}
                            </p>
                            
                            {currentQuestion.examples && currentQuestion.examples.length > 0 && (
                              <div className="mt-4">
                                <h5 className="font-semibold text-blue-900 dark:text-blue-100 mb-2">Examples:</h5>
                                <ul className="list-disc list-inside space-y-1 text-blue-700 dark:text-blue-300">
                                  {currentQuestion.examples.map((example: string, index: number) => (
                                    <li key={index} className="text-sm">{example}</li>
                                  ))}
                                </ul>
                              </div>
                            )}
                          </div>
                        )}
                      </div>
                    )}

                    {/* Enhanced Answer Options */}
                    <div className="space-y-4 mb-6">
                      {(currentQuestion.options || []).map((option: { value: number; label: string; description?: string; riskLevel?: string; recommendedActions?: string[] }) => (
                        <label
                          key={option.value}
                          className={`flex items-center space-x-4 p-6 rounded-xl border-2 cursor-pointer transition-all duration-200 transform hover:scale-105 ${
                            responses[currentQuestion.id] === option.value
                              ? 'border-blue-500 bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 shadow-lg'
                              : 'border-gray-200 dark:border-gray-600 hover:border-blue-300 dark:hover:border-blue-500 hover:bg-gradient-to-r hover:from-gray-50 hover:to-blue-50/30 dark:hover:from-gray-700/50 dark:hover:to-blue-900/10 hover:shadow-md'
                          }`}
                        >
                          <input
                            type="radio"
                            name={currentQuestion.id}
                            value={option.value}
                            checked={responses[currentQuestion.id] === option.value}
                            onChange={() => handleResponseChange(currentQuestion.id, option.value)}
                            className="text-blue-600 focus:ring-blue-500 focus:ring-offset-2 w-5 h-5 transform hover:scale-110 transition-transform"
                          />
                          <div className="flex-1">
                            <div className="flex items-center justify-between mb-2">
                              <div className="font-bold text-gray-900 dark:text-white text-lg">
                                {option.label}
                              </div>
                              {option.riskLevel && (
                                <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                                  option.riskLevel === 'critical' ? 'bg-red-100 dark:bg-red-900/30 text-red-800 dark:text-red-300' :
                                  option.riskLevel === 'high' ? 'bg-orange-100 dark:bg-orange-900/30 text-orange-800 dark:text-orange-300' :
                                  option.riskLevel === 'medium' ? 'bg-yellow-100 dark:bg-yellow-900/30 text-yellow-800 dark:text-yellow-300' :
                                  'bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-300'
                                }`}>
                                  {option.riskLevel} risk
                                </span>
                              )}
                            </div>
                            {option.description && (
                              <div className="text-gray-600 dark:text-gray-300 leading-relaxed">
                                {option.description}
                              </div>
                            )}
                            {option.recommendedActions && option.recommendedActions.length > 0 && (
                              <div className="mt-2">
                                <div className="text-xs font-medium text-gray-500 dark:text-gray-400 mb-1">Recommended Actions:</div>
                                <ul className="text-xs text-gray-600 dark:text-gray-300 space-y-1">
                                  {option.recommendedActions.map((action: string, index: number) => (
                                    <li key={index} className="flex items-start space-x-1">
                                      <span className="text-blue-500 mt-1">•</span>
                                      <span>{action}</span>
                                    </li>
                                  ))}
                                </ul>
                              </div>
                            )}
                          </div>
                        </label>
                      ))}
                      {(!currentQuestion.options || currentQuestion.options.length === 0) && (
                        <div className="text-center text-gray-500 dark:text-gray-400 py-4">
                          No answer options available for this question.
                        </div>
                      )}
                    </div>

                    {/* Confidence Level */}
                    {currentResponse !== undefined && (
                      <div className="mb-6 p-4 bg-white/50 dark:bg-gray-700/50 rounded-lg border border-gray-200 dark:border-gray-600">
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                          How confident are you in this response?
                        </label>
                        <div className="flex space-x-2">
                          {[1, 2, 3, 4, 5].map((level) => (
                            <button
                              key={level}
                              onClick={() => handleConfidenceChange(currentQuestion.id, level)}
                              aria-label={`Set confidence level to ${level} out of 5`}
                              title={`Confidence level ${level} out of 5`}
                              className={`p-2 rounded-lg transition-all duration-200 ${
                                confidence[currentQuestion.id] === level
                                  ? 'bg-yellow-100 dark:bg-yellow-900/30 text-yellow-800 dark:text-yellow-300'
                                  : 'bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 hover:bg-yellow-50 dark:hover:bg-yellow-900/20'
                              }`}
                            >
                              <span className="sr-only">Confidence level {level}</span>
                              <Star className={`w-4 h-4 ${confidence[currentQuestion.id] >= level ? 'fill-current' : ''}`} aria-hidden="true" />
                            </button>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Notes Section */}
                    {showNotes && (
                      <div className="mb-6 p-6 bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 rounded-xl border border-blue-200 dark:border-blue-700 shadow-lg">
                        <div className="flex items-center space-x-2 mb-4">
                          <MessageSquare className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                          <h5 className="font-semibold text-blue-900 dark:text-blue-100">
                            Question Notes & Comments
                          </h5>
                        </div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                          Add your observations, context, or additional information:
                        </label>
                        <textarea
                          value={notes[currentQuestion.id] || ''}
                          onChange={(e) => handleNoteChange(currentQuestion.id, e.target.value)}
                          placeholder="Add your notes, observations, evidence references, or additional context for this question..."
                          className="w-full p-4 border border-blue-300 dark:border-blue-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-blue-400 dark:placeholder-blue-500 focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none transition-all duration-200"
                          rows={4}
                        />
                        <div className="mt-3 flex items-center justify-between">
                          <div className="text-xs text-blue-700 dark:text-blue-300">
                            💡 Tip: Notes are automatically saved and can be viewed in reports
                          </div>
                          <div className="text-xs text-blue-600 dark:text-blue-400">
                            {notes[currentQuestion.id]?.length || 0} characters
                          </div>
                        </div>
                      </div>
                    )}

                    {/* Hints Section */}
                    {showHints && currentQuestion.examples && (
                      <div className="mb-6 p-4 bg-purple-50 dark:bg-purple-900/20 rounded-lg border border-purple-200 dark:border-purple-700">
                        <div className="flex items-center space-x-2 mb-3">
                          <Lightbulb className="w-5 h-5 text-purple-600 dark:text-purple-400" />
                          <h5 className="font-semibold text-purple-900 dark:text-purple-100">Helpful Hints</h5>
                        </div>
                        <ul className="space-y-2 text-purple-800 dark:text-purple-200">
                          {currentQuestion.examples.map((hint: string, index: number) => (
                            <li key={index} className="flex items-start space-x-2 text-sm">
                              <span className="text-purple-500 mt-1">💡</span>
                              <span>{hint}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}

                    {/* Evidence Manager */}
                    <EvidenceManager
                      questionId={currentQuestion.id}
                      assessmentId={assessment.id}
                      evidenceLibrary={evidenceLibrary}
                      questionEvidence={currentQuestionEvidence}
                      onEvidenceUpload={handleEvidenceUpload}
                      onEvidenceLink={handleEvidenceLink}
                      onEvidenceUnlink={handleEvidenceUnlink}
                    />
                  </div>
                </div>
              </div>

              {/* Enhanced Navigation */}
              <div className="flex items-center justify-between bg-gradient-to-r from-gray-50 to-blue-50 dark:from-gray-700/50 dark:to-blue-900/20 p-6 rounded-xl border border-gray-200 dark:border-gray-600">
                <button
                  onClick={goToPreviousQuestion}
                  disabled={currentSectionIndex === 0 && currentCategoryIndex === 0 && currentQuestionIndex === 0}
                  className="flex items-center space-x-2 px-6 py-3 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-xl hover:bg-white dark:hover:bg-gray-600 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 transform hover:scale-105 font-medium shadow-lg hover:shadow-xl"
                >
                  <ChevronLeft className="w-5 h-5" />
                  <span>Previous</span>
                </button>

                <div className="text-center">
                  <div className="text-sm font-bold text-gray-900 dark:text-white">
                    Question {currentQuestionIndex + 1} of {currentCategory?.questions?.length || 0} in {currentCategory?.name || 'Unknown Category'}
                  </div>
                  {currentCategory?.questions && currentCategory.questions.length > 0 && (
                    <div className="text-xs text-gray-600 dark:text-gray-300 mt-1">
                      {Math.round(((currentQuestionIndex + 1) / currentCategory.questions.length) * 100)}% of category complete
                    </div>
                  )}
                  {timeSpentPerQuestion[currentQuestion.id] && (
                    <div className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                      Time spent: {timeSpentPerQuestion[currentQuestion.id]}s
                    </div>
                  )}
                </div>

                <button
                  onClick={goToNextQuestion}
                  disabled={
                    !framework?.sections ||
                    (currentSectionIndex === (framework.sections.length - 1) &&
                    (!currentSection?.categories ||
                    currentCategoryIndex === (currentSection.categories.length - 1)) &&
                    (!currentCategory?.questions ||
                    currentQuestionIndex === (currentCategory.questions.length - 1)))
                  }
                  className="flex items-center space-x-2 px-6 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-xl hover:from-blue-700 hover:to-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 transform hover:scale-105 font-medium shadow-lg hover:shadow-xl"
                >
                  <span>Next</span>
                  <ChevronRight className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};