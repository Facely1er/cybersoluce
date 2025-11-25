import React, { useState, useMemo, useCallback, useRef, useEffect } from 'react';
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore - Icons exist in lucide-react but TypeScript definitions may be outdated
import * as LucideIcons from 'lucide-react';
import { EvidenceItem, QuestionEvidence } from '../../shared/types/assessment';

// Type-safe icon imports with fallbacks
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const LucideIconsAny = LucideIcons as any;
const Upload = LucideIconsAny.Upload as React.ComponentType<{ className?: string; [key: string]: unknown }>;
const Link = LucideIconsAny.Link as React.ComponentType<{ className?: string; [key: string]: unknown }>;
const FileText = LucideIconsAny.FileText as React.ComponentType<{ className?: string; [key: string]: unknown }>;
const X = LucideIconsAny.X as React.ComponentType<{ className?: string; [key: string]: unknown }>;
const CheckCircle = LucideIconsAny.CheckCircle as React.ComponentType<{ className?: string; [key: string]: unknown }>;
const AlertCircle = LucideIconsAny.AlertCircle as React.ComponentType<{ className?: string; [key: string]: unknown }>;
const Loader2 = LucideIconsAny.Loader2 as React.ComponentType<{ className?: string; [key: string]: unknown }>;

// File upload configuration
const MAX_FILE_SIZE = 50 * 1024 * 1024; // 50MB
const ALLOWED_FILE_TYPES = [
  'application/pdf',
  'image/png',
  'image/jpeg',
  'image/jpg',
  'image/gif',
  'application/msword',
  'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
  'application/vnd.ms-excel',
  'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
  'text/plain',
  'text/csv'
];

const ALLOWED_FILE_EXTENSIONS = ['.pdf', '.png', '.jpg', '.jpeg', '.gif', '.doc', '.docx', '.xls', '.xlsx', '.txt', '.csv'];

interface EvidenceManagerProps {
  questionId?: string;
  assessmentId?: string;
  onClose?: () => void;
  evidenceLibrary?: EvidenceItem[];
  questionEvidence?: QuestionEvidence[];
  onEvidenceLink?: (evidenceId: string, relevance: 'primary' | 'supporting' | 'reference') => Promise<void> | void;
  onEvidenceUnlink?: (evidenceId: string) => Promise<void> | void;
  onEvidenceUpload?: (file: File) => Promise<EvidenceItem | void> | void;
}

interface UploadState {
  isUploading: boolean;
  progress: number;
  error: string | null;
}

export const EvidenceManager: React.FC<EvidenceManagerProps> = ({
  questionId,
  evidenceLibrary = [],
  questionEvidence = [],
  onClose,
  onEvidenceLink,
  onEvidenceUnlink,
  onEvidenceUpload
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState<string>('all');
  const [showUpload, setShowUpload] = useState(false);
  const [uploadState, setUploadState] = useState<UploadState>({
    isUploading: false,
    progress: 0,
    error: null
  });
  const [linkError, setLinkError] = useState<string | null>(null);
  const [linkingEvidenceId, setLinkingEvidenceId] = useState<string | null>(null);
  const [unlinkingEvidenceId, setUnlinkingEvidenceId] = useState<string | null>(null);
  const progressBarRef = useRef<HTMLDivElement>(null);

  // Update progress bar width using ref to avoid inline styles
  useEffect(() => {
    if (progressBarRef.current) {
      progressBarRef.current.style.width = `${uploadState.progress}%`;
    }
  }, [uploadState.progress]);

  // Get linked evidence IDs for this question
  const linkedEvidenceIds = useMemo(() => {
    return new Set(questionEvidence.map(e => e.evidenceId));
  }, [questionEvidence]);

  // Filter evidence library
  const filteredEvidence = useMemo(() => {
    return evidenceLibrary.filter(evidence => {
      const matchesSearch = evidence.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           evidence.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           evidence.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
      const matchesType = filterType === 'all' || evidence.type === filterType;
      const matchesQuestion = !questionId || evidence.linkedQuestions.includes(questionId);
      return matchesSearch && matchesType && matchesQuestion;
    });
  }, [evidenceLibrary, searchTerm, filterType, questionId]);

  // Validate file before upload
  const validateFile = useCallback((file: File): string | null => {
    // Check file size
    if (file.size > MAX_FILE_SIZE) {
      return `File size exceeds the maximum limit of ${MAX_FILE_SIZE / (1024 * 1024)}MB`;
    }

    // Check file type
    const fileExtension = '.' + file.name.split('.').pop()?.toLowerCase();
    const isValidType = ALLOWED_FILE_TYPES.includes(file.type) || 
                       ALLOWED_FILE_EXTENSIONS.includes(fileExtension);
    
    if (!isValidType) {
      return `File type not allowed. Allowed types: ${ALLOWED_FILE_EXTENSIONS.join(', ')}`;
    }

    // Check for duplicate file names
    const duplicateExists = evidenceLibrary.some(
      evidence => evidence.name.toLowerCase() === file.name.toLowerCase()
    );
    
    if (duplicateExists) {
      return `A file with the name "${file.name}" already exists`;
    }

    return null;
  }, [evidenceLibrary]);

  const handleFileUpload = useCallback(async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    // Reset previous errors
    setUploadState({ isUploading: false, progress: 0, error: null });

    // Validate file
    const validationError = validateFile(file);
    if (validationError) {
      setUploadState({ isUploading: false, progress: 0, error: validationError });
      return;
    }

    if (!onEvidenceUpload) {
      setUploadState({ 
        isUploading: false, 
        progress: 0, 
        error: 'Upload handler not configured' 
      });
      return;
    }

    let progressInterval: NodeJS.Timeout | null = null;
    
    try {
      setUploadState({ isUploading: true, progress: 0, error: null });
      
      // Simulate progress for better UX (if handler doesn't provide progress)
      progressInterval = setInterval(() => {
        setUploadState(prev => ({
          ...prev,
          progress: Math.min(prev.progress + 10, 90)
        }));
      }, 200);

      // Call upload handler
      await onEvidenceUpload(file);
      
      if (progressInterval) {
        clearInterval(progressInterval);
      }
      setUploadState({ isUploading: false, progress: 100, error: null });
      
      // Reset form and hide upload after successful upload
      setTimeout(() => {
        setShowUpload(false);
        setUploadState({ isUploading: false, progress: 0, error: null });
        // Reset file input
        const fileInput = document.getElementById('evidence-file-upload') as HTMLInputElement;
        if (fileInput) fileInput.value = '';
      }, 1000);
    } catch (error) {
      // Ensure progress interval is cleared on error
      if (progressInterval) {
        clearInterval(progressInterval);
      }
      setUploadState({
        isUploading: false,
        progress: 0,
        error: error instanceof Error ? error.message : 'Failed to upload file. Please try again.'
      });
    }
  }, [onEvidenceUpload, validateFile]);

  const handleLinkEvidence = useCallback(async (evidenceId: string, relevance: 'primary' | 'supporting' | 'reference') => {
    if (!onEvidenceLink) {
      setLinkError('Link handler not configured');
      return;
    }

    try {
      setLinkError(null);
      setLinkingEvidenceId(evidenceId);
      await onEvidenceLink(evidenceId, relevance);
      setLinkingEvidenceId(null);
    } catch (error) {
      setLinkError(error instanceof Error ? error.message : 'Failed to link evidence. Please try again.');
      setLinkingEvidenceId(null);
    }
  }, [onEvidenceLink]);

  const handleUnlinkEvidence = useCallback(async (evidenceId: string) => {
    if (!onEvidenceUnlink) {
      setLinkError('Unlink handler not configured');
      return;
    }

    try {
      setLinkError(null);
      setUnlinkingEvidenceId(evidenceId);
      await onEvidenceUnlink(evidenceId);
      setUnlinkingEvidenceId(null);
    } catch (error) {
      setLinkError(error instanceof Error ? error.message : 'Failed to unlink evidence. Please try again.');
      setUnlinkingEvidenceId(null);
    }
  }, [onEvidenceUnlink]);

  const getRelevanceColor = (relevance: string) => {
    switch (relevance) {
      case 'primary': return 'bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-300';
      case 'supporting': return 'bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-300';
      case 'reference': return 'bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-300';
      default: return 'bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-300';
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'document': return <FileText className="w-4 h-4" />;
      case 'screenshot': return <FileText className="w-4 h-4" />;
      case 'policy': return <FileText className="w-4 h-4" />;
      case 'procedure': return <FileText className="w-4 h-4" />;
      case 'certificate': return <CheckCircle className="w-4 h-4" />;
      case 'audit-report': return <FileText className="w-4 h-4" />;
      default: return <FileText className="w-4 h-4" />;
    }
  };

  return (
    <>
      <style>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 8px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: transparent;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: rgba(156, 163, 175, 0.5);
          border-radius: 4px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: rgba(156, 163, 175, 0.7);
        }
        .dark .custom-scrollbar::-webkit-scrollbar-thumb {
          background: rgba(75, 85, 99, 0.5);
        }
        .dark .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: rgba(75, 85, 99, 0.7);
        }
      `}</style>
      <div className="evidence-manager bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm rounded-xl shadow-xl border border-gray-200 dark:border-gray-700 p-6 mt-6 transition-all duration-300 hover:shadow-2xl">
      {/* Enhanced Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-3">
          <div className="p-2 bg-gradient-to-br from-blue-100 to-indigo-100 dark:from-blue-900/30 dark:to-indigo-900/30 rounded-xl">
            <Link className="w-5 h-5 text-blue-600 dark:text-blue-400" />
          </div>
          <div>
            <h3 className="text-lg font-bold text-gray-900 dark:text-white">
              Evidence Management
            </h3>
            <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">
              Link documents and evidence to support your assessment
            </p>
          </div>
        </div>
        {onClose && (
          <button
            onClick={onClose}
            className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-all duration-200 hover:scale-110"
            aria-label="Close evidence manager"
            title="Close evidence manager"
          >
            <span className="sr-only">Close</span>
            <X className="w-5 h-5 text-gray-500 dark:text-gray-400" aria-hidden="true" />
          </button>
        )}
      </div>

      {/* Enhanced Search and Filter */}
      <div className="mb-6 space-y-4">
        <div className="relative">
          <label htmlFor="evidence-search" className="sr-only">Search evidence</label>
          <input
            id="evidence-search"
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search evidence by name, description, or tags..."
            className="w-full pl-10 pr-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 shadow-sm hover:shadow-md"
            aria-label="Search evidence by name, description, or tags"
          />
          <FileText className="absolute left-3 top-3.5 w-5 h-5 text-gray-400" aria-hidden="true" />
        </div>
        <div className="flex items-center space-x-3">
          <label htmlFor="evidence-type-filter" className="sr-only">Filter by evidence type</label>
          <select
            id="evidence-type-filter"
            value={filterType}
            onChange={(e) => setFilterType(e.target.value)}
            className="flex-1 px-4 py-2.5 border border-gray-300 dark:border-gray-600 rounded-xl bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 shadow-sm hover:shadow-md"
            aria-label="Filter evidence by type"
          >
            <option value="all">All Types</option>
            <option value="document">Document</option>
            <option value="screenshot">Screenshot</option>
            <option value="policy">Policy</option>
            <option value="procedure">Procedure</option>
            <option value="certificate">Certificate</option>
            <option value="audit-report">Audit Report</option>
            <option value="other">Other</option>
          </select>
          <button
            onClick={() => setShowUpload(!showUpload)}
            className="flex items-center space-x-2 px-5 py-2.5 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-xl hover:from-blue-700 hover:to-blue-800 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:scale-105 font-medium"
            aria-label="Upload evidence file"
            title="Upload evidence file"
          >
            <Upload className="w-4 h-4" />
            <span>Upload Evidence</span>
          </button>
        </div>
      </div>

      {/* Enhanced Error Messages */}
      {(uploadState.error || linkError) && (
        <div className="mb-4 p-4 bg-gradient-to-r from-red-50 to-orange-50 dark:from-red-900/20 dark:to-orange-900/20 border-l-4 border-red-500 dark:border-red-400 rounded-xl shadow-md flex items-start space-x-3 animate-in slide-in-from-top-2 duration-300">
          <div className="p-1.5 bg-red-100 dark:bg-red-900/30 rounded-lg">
            <AlertCircle className="w-5 h-5 text-red-600 dark:text-red-400 flex-shrink-0" />
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-semibold text-red-800 dark:text-red-300">
              {uploadState.error || linkError}
            </p>
          </div>
          <button
            onClick={() => {
              setUploadState(prev => ({ ...prev, error: null }));
              setLinkError(null);
            }}
            className="text-red-600 dark:text-red-400 hover:text-red-800 dark:hover:text-red-200 transition-colors p-1 rounded-lg hover:bg-red-100 dark:hover:bg-red-900/30"
            aria-label="Dismiss error"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      )}

      {/* Enhanced Upload Form */}
      {showUpload && (
        <div className="mb-6 p-5 bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 rounded-xl border-2 border-blue-200 dark:border-blue-700 shadow-lg animate-in slide-in-from-top-2 duration-300">
          <label htmlFor="evidence-file-upload" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Upload Evidence File
          </label>
          <input
            id="evidence-file-upload"
            type="file"
            onChange={handleFileUpload}
            disabled={uploadState.isUploading}
            accept={ALLOWED_FILE_EXTENSIONS.join(',')}
            className="block w-full text-sm text-gray-500 dark:text-gray-400 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100 dark:file:bg-blue-900/30 dark:file:text-blue-300 disabled:opacity-50 disabled:cursor-not-allowed"
            aria-label="Select evidence file to upload"
          />
          <p className="mt-2 text-xs text-gray-500 dark:text-gray-400">
            Maximum file size: {MAX_FILE_SIZE / (1024 * 1024)}MB. Allowed types: {ALLOWED_FILE_EXTENSIONS.join(', ')}
          </p>
          
          {/* Upload Progress */}
          {uploadState.isUploading && (
            <div className="mt-3">
              <div className="flex items-center justify-between mb-1">
                <span className="text-xs font-medium text-gray-700 dark:text-gray-300">Uploading...</span>
                <span className="text-xs text-gray-500 dark:text-gray-400">{uploadState.progress}%</span>
              </div>
              <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                <div
                  ref={progressBarRef}
                  className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                />
              </div>
            </div>
          )}
          
          {/* Enhanced Success Message */}
          {!uploadState.isUploading && uploadState.progress === 100 && (
            <div className="mt-4 p-3 bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 border border-green-200 dark:border-green-700 rounded-lg flex items-center space-x-2 animate-in slide-in-from-top-2 duration-300">
              <div className="p-1 bg-green-100 dark:bg-green-900/30 rounded-full">
                <CheckCircle className="w-4 h-4 text-green-600 dark:text-green-400" />
              </div>
              <span className="text-sm font-semibold text-green-700 dark:text-green-300">File uploaded successfully!</span>
            </div>
          )}
        </div>
      )}

      {/* Enhanced Linked Evidence */}
      {questionEvidence.length > 0 && (
        <div className="mb-6">
          <div className="flex items-center space-x-2 mb-4">
            <div className="p-1.5 bg-blue-100 dark:bg-blue-900/30 rounded-lg">
              <CheckCircle className="w-4 h-4 text-blue-600 dark:text-blue-400" />
            </div>
            <h4 className="text-sm font-bold text-gray-900 dark:text-white">Linked Evidence ({questionEvidence.length})</h4>
          </div>
          <div className="space-y-3">
            {questionEvidence.map((link) => {
              const evidence = evidenceLibrary.find(e => e.id === link.evidenceId);
              if (!evidence) return null;
              return (
                <div
                  key={link.evidenceId}
                  className="flex items-center justify-between p-4 bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 rounded-xl border border-blue-200 dark:border-blue-700 shadow-md hover:shadow-lg transition-all duration-200 hover:scale-[1.02]"
                >
                  <div className="flex items-center space-x-3 flex-1 min-w-0">
                    <div className="p-2 bg-white dark:bg-gray-800 rounded-lg shadow-sm">
                      {getTypeIcon(evidence.type)}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center space-x-2 mb-1">
                        <span className="text-sm font-semibold text-gray-900 dark:text-white truncate">
                          {evidence.name}
                        </span>
                        <span className={`px-2.5 py-1 rounded-full text-xs font-bold ${getRelevanceColor(link.relevance)} shadow-sm`}>
                          {link.relevance}
                        </span>
                      </div>
                      <p className="text-xs text-gray-600 dark:text-gray-300 truncate">
                        {evidence.description}
                      </p>
                    </div>
                  </div>
                  <button
                    onClick={() => handleUnlinkEvidence(link.evidenceId)}
                    disabled={unlinkingEvidenceId === link.evidenceId || uploadState.isUploading}
                    className="p-2 rounded-xl hover:bg-red-100 dark:hover:bg-red-900/30 text-red-600 dark:text-red-400 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center space-x-1 hover:scale-110"
                    aria-label={`Unlink evidence ${evidence.name}`}
                    title={`Unlink evidence ${evidence.name}`}
                  >
                    {unlinkingEvidenceId === link.evidenceId ? (
                      <>
                        <Loader2 className="w-4 h-4 animate-spin" />
                        <span className="sr-only">Unlinking evidence</span>
                      </>
                    ) : (
                      <>
                        <span className="sr-only">Unlink evidence</span>
                        <X className="w-4 h-4" aria-hidden="true" />
                      </>
                    )}
                  </button>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Enhanced Available Evidence */}
      <div>
        <div className="flex items-center space-x-2 mb-4">
          <div className="p-1.5 bg-gray-100 dark:bg-gray-700 rounded-lg">
            <FileText className="w-4 h-4 text-gray-600 dark:text-gray-300" />
          </div>
          <h4 className="text-sm font-bold text-gray-900 dark:text-white">
            Available Evidence ({filteredEvidence.length})
          </h4>
        </div>
        {filteredEvidence.length === 0 ? (
          <div className="text-center py-12 bg-gradient-to-br from-gray-50 to-blue-50 dark:from-gray-800/50 dark:to-blue-900/10 rounded-xl border-2 border-dashed border-gray-300 dark:border-gray-600">
            <div className="p-4 bg-white dark:bg-gray-800 rounded-full w-20 h-20 mx-auto mb-4 flex items-center justify-center shadow-lg">
              <FileText className="w-10 h-10 text-gray-400 dark:text-gray-500" />
            </div>
            <p className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1">No evidence found</p>
            <p className="text-xs text-gray-500 dark:text-gray-400">Upload evidence to get started</p>
          </div>
        ) : (
          <div className="space-y-3 max-h-80 overflow-y-auto pr-2 custom-scrollbar">
            {filteredEvidence.map((evidence) => {
              const isLinked = linkedEvidenceIds.has(evidence.id);
              return (
                <div
                  key={evidence.id}
                  className={`p-4 rounded-xl border-2 transition-all duration-200 ${
                    isLinked
                      ? 'bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 border-blue-300 dark:border-blue-600 shadow-md'
                      : 'bg-white dark:bg-gray-700 border-gray-200 dark:border-gray-600 hover:border-blue-300 dark:hover:border-blue-500 hover:shadow-lg hover:scale-[1.01]'
                  }`}
                >
                  <div className="flex items-start justify-between">
                    <div className="flex items-start space-x-3 flex-1 min-w-0">
                      <div className="p-2 bg-gray-100 dark:bg-gray-600 rounded-lg shadow-sm">
                        {getTypeIcon(evidence.type)}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center space-x-2 mb-1.5">
                          <span className="text-sm font-semibold text-gray-900 dark:text-white truncate">
                            {evidence.name}
                          </span>
                          <span className="px-2.5 py-1 rounded-full text-xs font-bold bg-gray-200 dark:bg-gray-600 text-gray-700 dark:text-gray-300 shadow-sm">
                            {evidence.type}
                          </span>
                        </div>
                        <p className="text-xs text-gray-600 dark:text-gray-300 line-clamp-2 mb-2">
                          {evidence.description}
                        </p>
                        {evidence.tags.length > 0 && (
                          <div className="flex flex-wrap gap-1.5 mt-2">
                            {evidence.tags.slice(0, 3).map((tag, idx) => (
                              <span
                                key={idx}
                                className="px-2 py-0.5 rounded-md text-xs bg-gray-100 dark:bg-gray-600 text-gray-600 dark:text-gray-300 font-medium"
                              >
                                #{tag}
                              </span>
                            ))}
                            {evidence.tags.length > 3 && (
                              <span className="px-2 py-0.5 rounded-md text-xs bg-gray-100 dark:bg-gray-600 text-gray-500 dark:text-gray-400">
                                +{evidence.tags.length - 3}
                              </span>
                            )}
                          </div>
                        )}
                      </div>
                    </div>
                    {!isLinked && (
                      <div className="flex items-center space-x-2 ml-3 flex-shrink-0">
                        <button
                          onClick={() => handleLinkEvidence(evidence.id, 'primary')}
                          disabled={linkingEvidenceId === evidence.id || uploadState.isUploading}
                          className="px-3 py-1.5 text-xs bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-lg hover:from-blue-700 hover:to-blue-800 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center space-x-1 shadow-md hover:shadow-lg transform hover:scale-105 font-semibold"
                          title="Link as primary evidence"
                          aria-label={`Link ${evidence.name} as primary evidence`}
                        >
                          {linkingEvidenceId === evidence.id ? (
                            <>
                              <Loader2 className="w-3 h-3 animate-spin" />
                              <span>Linking...</span>
                            </>
                          ) : (
                            <span>Primary</span>
                          )}
                        </button>
                        <button
                          onClick={() => handleLinkEvidence(evidence.id, 'supporting')}
                          disabled={linkingEvidenceId === evidence.id || uploadState.isUploading}
                          className="px-3 py-1.5 text-xs bg-gradient-to-r from-green-600 to-green-700 text-white rounded-lg hover:from-green-700 hover:to-green-800 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center space-x-1 shadow-md hover:shadow-lg transform hover:scale-105 font-semibold"
                          title="Link as supporting evidence"
                          aria-label={`Link ${evidence.name} as supporting evidence`}
                        >
                          {linkingEvidenceId === evidence.id ? (
                            <>
                              <Loader2 className="w-3 h-3 animate-spin" />
                              <span>Linking...</span>
                            </>
                          ) : (
                            <span>Support</span>
                          )}
                        </button>
                      </div>
                    )}
                    {isLinked && (
                      <div className="ml-3 flex-shrink-0 p-2 bg-green-100 dark:bg-green-900/30 rounded-lg">
                        <CheckCircle className="w-5 h-5 text-green-600 dark:text-green-400" />
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
      </div>
    </>
  );
};
