/**
 * Unified Workflow View
 * Shows the complete flow: Audit (ERMITS) → Implementation (NIST) → Governance (CyberSoluce)
 */

import React, { useState, useMemo } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { 
  FileSearch, 
  Wrench, 
  Shield, 
  ArrowRight,
  CheckCircle,
  Clock,
  AlertTriangle,
  BarChart3,
  Target,
  Users,
  FileText,
  TrendingUp,
  Plus
} from 'lucide-react';
import { useGovernanceStore } from '../../stores/governanceStore';
import { workflowBridge } from '../../services/workflowBridge';
import { AssessmentData } from '../../shared/types';
import { Framework } from '../../types/ermits';
import EmptyState from '../common/EmptyState';

interface UnifiedWorkflowViewProps {
  assessments?: AssessmentData[];
  frameworks?: Framework[];
}

type WorkflowPhase = 'audit' | 'implementation' | 'governance';

interface PhaseMetrics {
  total: number;
  completed: number;
  inProgress: number;
  pending: number;
  percentage: number;
}

export const UnifiedWorkflowView: React.FC<UnifiedWorkflowViewProps> = ({
  assessments = [],
  frameworks = []
}) => {
  const navigate = useNavigate();
  const { governanceItems, frameworks: governanceFrameworks } = useGovernanceStore();
  const [activePhase, setActivePhase] = useState<WorkflowPhase | null>(null);

  // Calculate metrics for each phase
  const auditMetrics = useMemo<PhaseMetrics>(() => {
    const total = assessments.length;
    const completed = assessments.filter(a => a.isComplete).length;
    const inProgress = assessments.filter(a => !a.isComplete && Object.keys(a.responses || {}).length > 0).length;
    const pending = total - completed - inProgress;
    
    return {
      total,
      completed,
      inProgress,
      pending,
      percentage: total > 0 ? Math.round((completed / total) * 100) : 0
    };
  }, [assessments]);

  const implementationMetrics = useMemo<PhaseMetrics>(() => {
    // Get tasks from localStorage or governance store
    try {
      const tasks = JSON.parse(localStorage.getItem('cybersoluce-tasks') || '[]');
      const total = tasks.length;
      const completed = tasks.filter((t: any) => t.status === 'completed' || t.status === 'approved').length;
      const inProgress = tasks.filter((t: any) => t.status === 'in-progress' || t.status === 'review').length;
      const pending = total - completed - inProgress;

      return {
        total,
        completed,
        inProgress,
        pending,
        percentage: total > 0 ? Math.round((completed / total) * 100) : 0
      };
    } catch (error) {
      console.error('Error loading implementation metrics:', error);
      return {
        total: 0,
        completed: 0,
        inProgress: 0,
        pending: 0,
        percentage: 0
      };
    }
  }, []);

  const governanceMetrics = useMemo<PhaseMetrics>(() => {
    const total = governanceItems.length;
    const completed = governanceItems.filter(g => g.status === 'completed').length;
    const inProgress = governanceItems.filter(g => g.status === 'in-progress').length;
    const pending = total - completed - inProgress;

    return {
      total,
      completed,
      inProgress,
      pending,
      percentage: total > 0 ? Math.round((completed / total) * 100) : 0
    };
  }, [governanceItems]);

  // Calculate gap analysis
  const gapAnalysis = useMemo(() => {
    if (assessments.length === 0 || frameworks.length === 0) {
      return { totalGaps: 0, criticalGaps: 0, highGaps: 0 };
    }

    let totalGaps = 0;
    let criticalGaps = 0;
    let highGaps = 0;

    assessments.forEach(assessment => {
      const framework = frameworks.find(f => f.id === assessment.frameworkId);
      if (!framework) return;

      const flow = workflowBridge.analyzeAssessmentForImplementation(assessment, framework);
      totalGaps += flow.totalGaps;
      criticalGaps += flow.criticalGaps;
      highGaps += flow.highGaps;
    });

    return { totalGaps, criticalGaps, highGaps };
  }, [assessments, frameworks]);

  const phases = [
    {
      id: 'audit' as WorkflowPhase,
      name: 'Audit & Assessment',
      description: 'ERMITS Auditor - Multi-framework compliance assessment',
      icon: FileSearch,
      color: 'blue',
      metrics: auditMetrics,
      actions: [
        { label: 'Start Assessment', path: '/assessments/multi-framework', icon: FileSearch },
        { label: 'View Gap Analysis', path: '/assessments/comparison', icon: BarChart3 },
        { label: 'Assessment Templates', path: '/assessments/templates', icon: FileText }
      ],
      status: auditMetrics.completed > 0 ? 'completed' : auditMetrics.inProgress > 0 ? 'in-progress' : 'pending'
    },
    {
      id: 'implementation' as WorkflowPhase,
      name: 'Implementation',
      description: 'NIST Implementator - Execute remediation tasks and controls',
      icon: Wrench,
      color: 'orange',
      metrics: implementationMetrics,
      actions: [
        { label: 'Task Management', path: '/orchestration/tasks', icon: CheckCircle },
        { label: 'Controls Management', path: '/nist/controls', icon: Shield },
        { label: 'Evidence Collection', path: '/nist/evidence', icon: FileText },
        { label: 'Compliance Status', path: '/nist/compliance', icon: Target }
      ],
      status: implementationMetrics.completed > 0 ? 'completed' : implementationMetrics.inProgress > 0 ? 'in-progress' : 'pending',
      blockers: gapAnalysis.totalGaps > 0 && implementationMetrics.total === 0 ? ['Create tasks from assessment gaps'] : []
    },
    {
      id: 'governance' as WorkflowPhase,
      name: 'Centralized Governance',
      description: 'CyberSoluce Platform - Unified oversight and orchestration',
      icon: Shield,
      color: 'purple',
      metrics: governanceMetrics,
      actions: [
        { label: 'Governance Dashboard', path: '/dashboard', icon: BarChart3 },
        { label: 'Compliance Orchestrator', path: '/compliance-orchestrator', icon: Users },
        { label: 'Executive Reporting', path: '/executive-reporting', icon: TrendingUp },
        { label: 'Framework Mapper', path: '/framework-mapper', icon: Target }
      ],
      status: governanceMetrics.completed > 0 ? 'completed' : governanceMetrics.inProgress > 0 ? 'in-progress' : 'pending'
    }
  ];

  // Show empty state if no assessments
  if (assessments.length === 0 && implementationMetrics.total === 0 && governanceMetrics.total === 0) {
    return (
      <EmptyState
        icon={FileSearch}
        title="Start Your Compliance Journey"
        description="Create your first assessment to begin tracking your compliance workflow across audit, implementation, and governance phases."
        action={{
          label: "Create Assessment",
          onClick: () => navigate('/assessments/multi-framework'),
          icon: Plus
        }}
        secondaryAction={{
          label: "View Templates",
          onClick: () => navigate('/assessments/templates'),
          variant: 'outline'
        }}
      />
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-6">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
              Unified Compliance Workflow
            </h2>
            <p className="text-gray-600 dark:text-gray-400 mt-1">
              End-to-end compliance lifecycle: Audit → Implementation → Governance
            </p>
          </div>
        </div>

        {/* Overall Progress */}
        <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-3 gap-4 mt-6">
          <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg">
            <div className="text-sm text-blue-700 dark:text-blue-300 font-medium mb-1">
              Audit Phase
            </div>
            <div className="text-2xl font-bold text-blue-900 dark:text-blue-100">
              {auditMetrics.percentage}%
            </div>
            <div className="text-xs text-blue-600 dark:text-blue-400 mt-1">
              {auditMetrics.completed} of {auditMetrics.total} completed
            </div>
          </div>
          <div className="bg-orange-50 dark:bg-orange-900/20 p-4 rounded-lg">
            <div className="text-sm text-orange-700 dark:text-orange-300 font-medium mb-1">
              Implementation Phase
            </div>
            <div className="text-2xl font-bold text-orange-900 dark:text-orange-100">
              {implementationMetrics.percentage}%
            </div>
            <div className="text-xs text-orange-600 dark:text-orange-400 mt-1">
              {implementationMetrics.completed} of {implementationMetrics.total} completed
            </div>
          </div>
          <div className="bg-purple-50 dark:bg-purple-900/20 p-4 rounded-lg">
            <div className="text-sm text-purple-700 dark:text-purple-300 font-medium mb-1">
              Governance Phase
            </div>
            <div className="text-2xl font-bold text-purple-900 dark:text-purple-100">
              {governanceMetrics.percentage}%
            </div>
            <div className="text-xs text-purple-600 dark:text-purple-400 mt-1">
              {governanceMetrics.completed} of {governanceMetrics.total} completed
            </div>
          </div>
        </div>
      </div>

      {/* Workflow Phases */}
      <div className="space-y-4">
        {phases.map((phase, index) => {
          const Icon = phase.icon;
          const isActive = activePhase === phase.id;
          const colorClasses = {
            blue: {
              bg: 'bg-blue-50 dark:bg-blue-900/20',
              border: 'border-blue-200 dark:border-blue-800',
              text: 'text-blue-900 dark:text-blue-100',
              icon: 'text-blue-600 dark:text-blue-400',
              button: 'bg-blue-600 hover:bg-blue-700'
            },
            orange: {
              bg: 'bg-orange-50 dark:bg-orange-900/20',
              border: 'border-orange-200 dark:border-orange-800',
              text: 'text-orange-900 dark:text-orange-100',
              icon: 'text-orange-600 dark:text-orange-400',
              button: 'bg-orange-600 hover:bg-orange-700'
            },
            purple: {
              bg: 'bg-purple-50 dark:bg-purple-900/20',
              border: 'border-purple-200 dark:border-purple-800',
              text: 'text-purple-900 dark:text-purple-100',
              icon: 'text-purple-600 dark:text-purple-400',
              button: 'bg-purple-600 hover:bg-purple-700'
            }
          };
          const colors = colorClasses[phase.color];

          return (
            <div key={phase.id}>
              {/* Phase Card */}
              <div
                className={`bg-white dark:bg-gray-800 rounded-lg border-2 ${colors.border} p-6 transition-all ${
                  isActive ? 'ring-2 ring-offset-2 ring-offset-gray-100 dark:ring-offset-gray-800' : ''
                }`}
              >
                <div className="flex items-start justify-between">
                  <div className="flex items-start space-x-4 flex-1">
                    {/* Phase Number & Icon */}
                    <div className={`${colors.bg} p-4 rounded-lg`}>
                      <div className="flex items-center space-x-2 mb-2">
                        <span className={`text-sm font-bold ${colors.text}`}>
                          Phase {index + 1}
                        </span>
                        {phase.status === 'completed' && (
                          <CheckCircle className="w-4 h-4 text-green-600 dark:text-green-400" />
                        )}
                        {phase.status === 'in-progress' && (
                          <Clock className="w-4 h-4 text-orange-600 dark:text-orange-400" />
                        )}
                      </div>
                      <Icon className={`w-8 h-8 ${colors.icon}`} />
                    </div>

                    {/* Phase Info */}
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-2">
                        <h3 className={`text-xl font-bold ${colors.text}`}>
                          {phase.name}
                        </h3>
                        <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                          phase.status === 'completed' 
                            ? 'bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-300'
                            : phase.status === 'in-progress'
                            ? 'bg-orange-100 dark:bg-orange-900/30 text-orange-800 dark:text-orange-300'
                            : 'bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-300'
                        }`}>
                          {phase.status === 'completed' ? 'Completed' : 
                           phase.status === 'in-progress' ? 'In Progress' : 'Pending'}
                        </span>
                      </div>
                      <p className="text-gray-600 dark:text-gray-400 mb-4">
                        {phase.description}
                      </p>

                      {/* Metrics */}
                      <div className="grid grid-cols-4 gap-4 mb-4">
                        <div>
                          <div className="text-2xl font-bold text-gray-900 dark:text-white">
                            {phase.metrics.total}
                          </div>
                          <div className="text-xs text-gray-600 dark:text-gray-400">
                            Total Items
                          </div>
                        </div>
                        <div>
                          <div className="text-2xl font-bold text-green-600 dark:text-green-400">
                            {phase.metrics.completed}
                          </div>
                          <div className="text-xs text-gray-600 dark:text-gray-400">
                            Completed
                          </div>
                        </div>
                        <div>
                          <div className="text-2xl font-bold text-orange-600 dark:text-orange-400">
                            {phase.metrics.inProgress}
                          </div>
                          <div className="text-xs text-gray-600 dark:text-gray-400">
                            In Progress
                          </div>
                        </div>
                        <div>
                          <div className="text-2xl font-bold text-gray-600 dark:text-gray-400">
                            {phase.metrics.pending}
                          </div>
                          <div className="text-xs text-gray-600 dark:text-gray-400">
                            Pending
                          </div>
                        </div>
                      </div>

                      {/* Progress Bar */}
                      <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2 mb-4">
                        <div
                          className={`h-2 rounded-full transition-all ${
                            phase.color === 'blue' ? 'bg-blue-600' :
                            phase.color === 'orange' ? 'bg-orange-600' :
                            'bg-purple-600'
                          }`}
                          style={{ width: `${phase.metrics.percentage}%` }}
                        />
                      </div>

                      {/* Blockers */}
                      {phase.blockers && phase.blockers.length > 0 && (
                        <div className="mb-4 p-3 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg border border-yellow-200 dark:border-yellow-800">
                          <div className="flex items-start space-x-2">
                            <AlertTriangle className="w-5 h-5 text-yellow-600 dark:text-yellow-400 flex-shrink-0 mt-0.5" />
                            <div>
                              <div className="text-sm font-medium text-yellow-900 dark:text-yellow-100">
                                Action Required
                              </div>
                              <ul className="text-xs text-yellow-800 dark:text-yellow-200 mt-1 space-y-1">
                                {phase.blockers.map((blocker, idx) => (
                                  <li key={idx}>• {blocker}</li>
                                ))}
                              </ul>
                            </div>
                          </div>
                        </div>
                      )}

                      {/* Actions */}
                      <div className="flex flex-wrap gap-2 sm:gap-2">
                        {phase.actions.map((action) => {
                          const ActionIcon = action.icon;
                          return (
                            <Link
                              key={action.path}
                              to={action.path}
                              className={`flex items-center space-x-2 px-4 py-2 ${colors.button} text-white rounded-lg hover:opacity-90 transition-opacity text-sm`}
                            >
                              <ActionIcon className="w-4 h-4" />
                              <span>{action.label}</span>
                            </Link>
                          );
                        })}
                      </div>
                    </div>
                  </div>

                  {/* Arrow to next phase */}
                  {index < phases.length - 1 && (
                    <div className="flex items-center mx-4">
                      <ArrowRight className={`w-6 h-6 ${colors.icon} opacity-50`} />
                    </div>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Gap Analysis Summary */}
      {gapAnalysis.totalGaps > 0 && (
        <div className="bg-red-50 dark:bg-red-900/20 rounded-lg border border-red-200 dark:border-red-800 p-6">
          <div className="flex items-start space-x-3">
            <AlertTriangle className="w-6 h-6 text-red-600 dark:text-red-400 flex-shrink-0 mt-1" />
            <div className="flex-1">
              <h3 className="text-lg font-semibold text-red-900 dark:text-red-100 mb-2">
                Assessment Gaps Identified
              </h3>
              <p className="text-sm text-red-800 dark:text-red-200 mb-4">
                {gapAnalysis.totalGaps} compliance gaps found across assessments. 
                {gapAnalysis.criticalGaps > 0 && ` ${gapAnalysis.criticalGaps} are critical priority.`}
              </p>
              <div className="flex space-x-3">
                <button
                  onClick={() => navigate('/assessments/comparison')}
                  className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors text-sm"
                >
                  View Gap Analysis
                </button>
                <button
                  onClick={() => {
                    // Navigate to implementation with gap context
                    navigate('/orchestration/tasks?source=assessment-gaps');
                  }}
                  className="px-4 py-2 bg-white dark:bg-gray-800 text-red-600 dark:text-red-400 border border-red-600 dark:border-red-400 rounded-lg hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors text-sm"
                >
                  Create Implementation Tasks
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Quick Links */}
      <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-6">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
          Quick Navigation
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Link
            to="/assessments/multi-framework"
            className="p-4 border border-gray-200 dark:border-gray-700 rounded-lg hover:border-blue-500 dark:hover:border-blue-500 hover:bg-blue-50 dark:hover:bg-blue-900/20 transition-all"
          >
            <FileSearch className="w-6 h-6 text-blue-600 dark:text-blue-400 mb-2" />
            <div className="font-medium text-gray-900 dark:text-white">Start Assessment</div>
            <div className="text-sm text-gray-600 dark:text-gray-400">Begin compliance audit</div>
          </Link>
          <Link
            to="/orchestration/tasks"
            className="p-4 border border-gray-200 dark:border-gray-700 rounded-lg hover:border-orange-500 dark:hover:border-orange-500 hover:bg-orange-50 dark:hover:bg-orange-900/20 transition-all"
          >
            <Wrench className="w-6 h-6 text-orange-600 dark:text-orange-400 mb-2" />
            <div className="font-medium text-gray-900 dark:text-white">Manage Tasks</div>
            <div className="text-sm text-gray-600 dark:text-gray-400">Track implementation</div>
          </Link>
          <Link
            to="/dashboard"
            className="p-4 border border-gray-200 dark:border-gray-700 rounded-lg hover:border-purple-500 dark:hover:border-purple-500 hover:bg-purple-50 dark:hover:bg-purple-900/20 transition-all"
          >
            <Shield className="w-6 h-6 text-purple-600 dark:text-purple-400 mb-2" />
            <div className="font-medium text-gray-900 dark:text-white">Governance Dashboard</div>
            <div className="text-sm text-gray-600 dark:text-gray-400">Centralized oversight</div>
          </Link>
        </div>
      </div>
    </div>
  );
};

