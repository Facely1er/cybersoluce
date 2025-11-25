/**
 * Workflow Actions Component
 * Provides navigation and actions to move from assessment to implementation
 */

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  ArrowRight, 
  CheckSquare, 
  Shield, 
  FileText, 
  Target,
  Loader2,
  AlertCircle
} from 'lucide-react';
import { workflowBridge, AssessmentToImplementationFlow } from '../../services/workflowBridge';
import { taskService } from '../../services/taskService';
import { useNotification } from '../notifications/NotificationSystem';
import { Tooltip } from '../ui/tooltip';
import { HelpCircle } from 'lucide-react';

interface WorkflowActionsProps {
  flow: AssessmentToImplementationFlow;
  userId: string;
  onTasksCreated?: (count: number) => void;
  onControlsCreated?: (count: number) => void;
  onEvidenceLinked?: (count: number) => void;
}

export const WorkflowActions: React.FC<WorkflowActionsProps> = ({
  flow,
  userId,
  onTasksCreated,
  onControlsCreated,
  onEvidenceLinked
}) => {
  const navigate = useNavigate();
  const { addNotification } = useNotification();
  const [isCreatingTasks, setIsCreatingTasks] = useState(false);
  const [isCreatingControls, setIsCreatingControls] = useState(false);
  const [isLinkingEvidence, setIsLinkingEvidence] = useState(false);
  const [taskCreationError, setTaskCreationError] = useState<string | null>(null);
  const [controlCreationError, setControlCreationError] = useState<string | null>(null);

  const handleCreateTasks = async () => {
    if (flow.gaps.length === 0) {
      addNotification('warning', 'No gaps found to create tasks from');
      return;
    }

    setIsCreatingTasks(true);
    setTaskCreationError(null);
    
    try {
      const tasks = workflowBridge.generateTasksFromGaps(
        flow,
        [userId], // Default to current user, can be expanded
        userId
      );

      // Create tasks using task service with progress tracking
      const createdTasks = [];
      const failedTasks = [];
      
      for (let i = 0; i < tasks.length; i++) {
        try {
          const task = await taskService.createTask(tasks[i], userId);
          createdTasks.push(task);
        } catch (error) {
          console.error(`Failed to create task ${i + 1}:`, error);
          failedTasks.push({ index: i + 1, error: error instanceof Error ? error.message : 'Unknown error' });
        }
      }

      if (createdTasks.length > 0) {
        addNotification('success', `Created ${createdTasks.length} of ${tasks.length} tasks from assessment gaps`);
        onTasksCreated?.(createdTasks.length);
        
        if (failedTasks.length > 0) {
          setTaskCreationError(`${failedTasks.length} task(s) failed to create. You can retry or create them manually.`);
        } else {
          // Navigate to tasks page only if all succeeded
          setTimeout(() => navigate('/orchestration/tasks'), 1000);
        }
      } else {
        setTaskCreationError('Failed to create any tasks. Please check your connection and try again.');
        addNotification('error', 'Failed to create tasks from gaps');
      }
    } catch (error) {
      console.error('Error creating tasks:', error);
      const errorMessage = error instanceof Error ? error.message : 'Failed to create tasks from gaps';
      setTaskCreationError(errorMessage);
      addNotification('error', errorMessage);
    } finally {
      setIsCreatingTasks(false);
    }
  };

  const handleCreateControls = async () => {
    if (flow.gaps.length === 0) {
      addNotification('warning', 'No gaps found to create controls from');
      return;
    }

    setIsCreatingControls(true);
    try {
      const controls = workflowBridge.generateControlsFromGaps(flow);
      
      // Store controls locally (can be extended to use a controls service)
      const existingControls = JSON.parse(
        localStorage.getItem('cybersoluce-controls') || '[]'
      );
      existingControls.push(...controls);
      localStorage.setItem('cybersoluce-controls', JSON.stringify(existingControls));

      addNotification('success', `Created ${controls.length} controls from assessment gaps`);
      onControlsCreated?.(controls.length);
      
      // Navigate to controls page
      navigate('/nist/controls');
    } catch (error) {
      console.error('Error creating controls:', error);
      addNotification('error', 'Failed to create controls from gaps');
    } finally {
      setIsCreatingControls(false);
    }
  };

  const handleLinkEvidence = () => {
    navigate(`/nist/evidence?assessmentId=${flow.assessmentId}`);
    onEvidenceLinked?.(1);
  };

  const handleViewGapAnalysis = () => {
    navigate(`/assessments/comparison?assessmentId=${flow.assessmentId}`);
  };

  const handleViewImplementation = () => {
    navigate('/nist/compliance');
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-6">
      <div className="flex items-center justify-between mb-4">
        <div>
          <div className="flex items-center space-x-2">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
              Implementation Workflow
            </h3>
            <Tooltip content="Use these actions to convert assessment gaps into trackable implementation tasks, controls, and evidence links. This connects your audit findings to actionable remediation work.">
              <HelpCircle className="w-4 h-4 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 cursor-help" />
            </Tooltip>
          </div>
          <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
            Move from assessment to implementation
          </p>
        </div>
        <div className="flex items-center space-x-2">
          <span className="text-xs font-medium px-2 py-1 rounded-full bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300">
            {flow.totalGaps} Gaps
          </span>
          {flow.criticalGaps > 0 && (
            <span className="text-xs font-medium px-2 py-1 rounded-full bg-red-100 dark:bg-red-900 text-red-700 dark:text-red-300">
              {flow.criticalGaps} Critical
            </span>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 gap-4">
        {/* Create Tasks Action */}
        <button
          onClick={handleCreateTasks}
          disabled={!flow.canCreateTasks || isCreatingTasks}
          aria-label="Create implementation tasks from assessment gaps"
          aria-describedby="create-tasks-help"
          className="flex items-start space-x-3 p-4 rounded-lg border border-gray-200 dark:border-gray-700 hover:border-blue-500 dark:hover:border-blue-500 hover:bg-blue-50 dark:hover:bg-blue-900/20 transition-all disabled:opacity-50 disabled:cursor-not-allowed focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          onKeyDown={(e) => {
            if (e.key === 'Enter' || e.key === ' ') {
              e.preventDefault();
              if (!isCreatingTasks && flow.canCreateTasks) {
                handleCreateTasks();
              }
            }
          }}
        >
          <div className="flex-shrink-0 mt-1">
            {isCreatingTasks ? (
              <Loader2 className="w-5 h-5 text-blue-600 dark:text-blue-400 animate-spin" />
            ) : (
              <CheckSquare className="w-5 h-5 text-blue-600 dark:text-blue-400" />
            )}
          </div>
          <div className="flex-1 text-left">
            <h4 className="font-medium text-gray-900 dark:text-white">
              Create Implementation Tasks
            </h4>
            <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
              Generate {flow.totalGaps} tasks from identified gaps
            </p>
            <span id="create-tasks-help" className="sr-only">
              Creates trackable implementation tasks for each identified compliance gap. Each task will be assigned to you and can be managed in the Task Management section.
            </span>
            {flow.criticalGaps > 0 && (
              <p className="text-xs text-red-600 dark:text-red-400 mt-1">
                {flow.criticalGaps} critical priority tasks
              </p>
            )}
          </div>
          <ArrowRight className="w-4 h-4 text-gray-400 flex-shrink-0 mt-1" />
        </button>

        {/* Create Controls Action */}
        <button
          onClick={handleCreateControls}
          disabled={!flow.canCreateControls || isCreatingControls}
          aria-label="Create security controls from assessment gaps"
          aria-describedby="create-controls-help"
          className="flex items-start space-x-3 p-4 rounded-lg border border-gray-200 dark:border-gray-700 hover:border-green-500 dark:hover:border-green-500 hover:bg-green-50 dark:hover:bg-green-900/20 transition-all disabled:opacity-50 disabled:cursor-not-allowed focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
          onKeyDown={(e) => {
            if (e.key === 'Enter' || e.key === ' ') {
              e.preventDefault();
              if (!isCreatingControls && flow.canCreateControls) {
                handleCreateControls();
              }
            }
          }}
        >
          <div className="flex-shrink-0 mt-1">
            {isCreatingControls ? (
              <Loader2 className="w-5 h-5 text-green-600 dark:text-green-400 animate-spin" />
            ) : (
              <Shield className="w-5 h-5 text-green-600 dark:text-green-400" />
            )}
          </div>
          <div className="flex-1 text-left">
            <h4 className="font-medium text-gray-900 dark:text-white">
              Create Security Controls
            </h4>
            <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
              Generate controls to address compliance gaps
            </p>
            <span id="create-controls-help" className="sr-only">
              Creates security controls based on identified compliance gaps. These controls can be tracked and managed in the Controls Management section.
            </span>
          </div>
          <ArrowRight className="w-4 h-4 text-gray-400 flex-shrink-0 mt-1" />
        </button>

        {/* Link Evidence Action */}
        <button
          onClick={handleLinkEvidence}
          disabled={!flow.canLinkEvidence || isLinkingEvidence}
          className="flex items-start space-x-3 p-4 rounded-lg border border-gray-200 dark:border-gray-700 hover:border-purple-500 dark:hover:border-purple-500 hover:bg-purple-50 dark:hover:bg-purple-900/20 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <div className="flex-shrink-0 mt-1">
            <FileText className="w-5 h-5 text-purple-600 dark:text-purple-400" />
          </div>
          <div className="flex-1 text-left">
            <h4 className="font-medium text-gray-900 dark:text-white">
              Link Assessment Evidence
            </h4>
            <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
              Connect evidence from assessment to implementation
            </p>
          </div>
          <ArrowRight className="w-4 h-4 text-gray-400 flex-shrink-0 mt-1" />
        </button>

        {/* View Gap Analysis */}
        <button
          onClick={handleViewGapAnalysis}
          className="flex items-start space-x-3 p-4 rounded-lg border border-gray-200 dark:border-gray-700 hover:border-orange-500 dark:hover:border-orange-500 hover:bg-orange-50 dark:hover:bg-orange-900/20 transition-all"
        >
          <div className="flex-shrink-0 mt-1">
            <Target className="w-5 h-5 text-orange-600 dark:text-orange-400" />
          </div>
          <div className="flex-1 text-left">
            <h4 className="font-medium text-gray-900 dark:text-white">
              View Gap Analysis
            </h4>
            <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
              Detailed analysis of compliance gaps
            </p>
          </div>
          <ArrowRight className="w-4 h-4 text-gray-400 flex-shrink-0 mt-1" />
        </button>
      </div>

      {/* Quick Stats */}
      <div className="mt-6 pt-6 border-t border-gray-200 dark:border-gray-700">
        <div className="grid grid-cols-3 gap-4 text-center">
          <div>
            <div className="text-2xl font-bold text-gray-900 dark:text-white">
              {flow.totalGaps}
            </div>
            <div className="text-xs text-gray-600 dark:text-gray-400 mt-1">
              Total Gaps
            </div>
          </div>
          <div>
            <div className="text-2xl font-bold text-red-600 dark:text-red-400">
              {flow.criticalGaps}
            </div>
            <div className="text-xs text-gray-600 dark:text-gray-400 mt-1">
              Critical
            </div>
          </div>
          <div>
            <div className="text-2xl font-bold text-orange-600 dark:text-orange-400">
              {flow.highGaps}
            </div>
            <div className="text-xs text-gray-600 dark:text-gray-400 mt-1">
              High Priority
            </div>
          </div>
        </div>
      </div>

      {/* Error Recovery */}
      {taskCreationError && (
        <div className="mt-4 p-4 rounded-lg bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800">
          <div className="flex items-start space-x-3">
            <AlertCircle className="w-5 h-5 text-red-600 dark:text-red-400 flex-shrink-0 mt-0.5" />
            <div className="flex-1">
              <p className="text-sm font-medium text-red-900 dark:text-red-300 mb-2">
                Task Creation Error
              </p>
              <p className="text-sm text-red-700 dark:text-red-400 mb-3">
                {taskCreationError}
              </p>
              <div className="flex space-x-2">
                <button
                  onClick={handleCreateTasks}
                  disabled={isCreatingTasks}
                  className="px-3 py-1.5 text-sm font-medium text-white bg-red-600 hover:bg-red-700 rounded-md transition-colors disabled:opacity-50 disabled:cursor-not-allowed focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
                  aria-label="Retry creating tasks"
                >
                  {isCreatingTasks ? 'Retrying...' : 'Retry'}
                </button>
                <button
                  onClick={() => setTaskCreationError(null)}
                  className="px-3 py-1.5 text-sm font-medium text-red-700 dark:text-red-300 bg-red-100 dark:bg-red-900/30 hover:bg-red-200 dark:hover:bg-red-900/50 rounded-md transition-colors focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
                >
                  Dismiss
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Warning for critical gaps */}
      {flow.criticalGaps > 0 && !taskCreationError && (
        <div className="mt-4 p-3 rounded-lg bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 flex items-start space-x-2">
          <AlertCircle className="w-5 h-5 text-red-600 dark:text-red-400 flex-shrink-0 mt-0.5" />
          <div className="flex-1">
            <p className="text-sm font-medium text-red-900 dark:text-red-300">
              {flow.criticalGaps} critical gap{flow.criticalGaps > 1 ? 's' : ''} identified
            </p>
            <p className="text-xs text-red-700 dark:text-red-400 mt-1">
              Consider creating tasks immediately to address these high-priority issues.
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

