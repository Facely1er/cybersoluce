import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import {
  Calendar,
  Plus,
  TrendingUp,
  Clock,
  AlertTriangle,
  CheckCircle,
  Filter,
  Download,
  Target
} from 'lucide-react';
import { Timeline, Milestone } from '../types/orchestration';
import { orchestrationService } from '../services/orchestrationService';
import PageHeader from '../components/common/PageHeader';
import { Button } from '../components/ui/button';
import StatusBadge from '../components/ui/StatusBadge';
import EmptyState from '../components/common/EmptyState';
import { useNotify } from '../components/notifications/NotificationSystem';
import EnhancedChart from '../components/charts/EnhancedChart';
import GanttChart from '../components/orchestration/GanttChart';
import { Modal } from '../components/ui/modal';
import { Input } from '../components/ui/input';
import { Select } from '../components/ui/select';

const TimelineManagement: React.FC = () => {
  const [timelines, setTimelines] = useState<Timeline[]>([]);
  const [selectedTimeline, setSelectedTimeline] = useState<Timeline | null>(null);
  const [loading, setLoading] = useState(true);
  const [analytics, setAnalytics] = useState<any>(null);
  const [newTimelineModalOpen, setNewTimelineModalOpen] = useState(false);
  const notify = useNotify();

  const handleExportTimeline = () => {
    if (!selectedTimeline) {
      notify.warning('No timeline selected', 'Please select a timeline to export');
      return;
    }

    try {
      // Prepare timeline data for export
      const exportData = {
        timeline: {
          name: selectedTimeline.name,
          description: selectedTimeline.description,
          framework: selectedTimeline.framework,
          startDate: selectedTimeline.startDate.toISOString(),
          targetCompletion: selectedTimeline.targetCompletion.toISOString(),
          status: selectedTimeline.status,
          currentProgress: selectedTimeline.currentProgress,
          healthScore: selectedTimeline.healthScore
        },
        milestones: selectedTimeline.milestones.map(milestone => ({
          name: milestone.name,
          type: milestone.type,
          targetDate: milestone.targetDate.toISOString(),
          status: milestone.status,
          progress: milestone.progress,
          successCriteria: milestone.successCriteria,
          attendees: milestone.attendees
        })),
        resourceAllocation: selectedTimeline.resourceAllocation,
        analytics: selectedTimeline.analytics
      };

      // Convert to CSV format
      const csvData = [
        ['Timeline Name', selectedTimeline.name],
        ['Framework', selectedTimeline.framework],
        ['Start Date', selectedTimeline.startDate.toLocaleDateString()],
        ['Target Completion', selectedTimeline.targetCompletion.toLocaleDateString()],
        ['Current Progress', `${selectedTimeline.currentProgress}%`],
        ['Health Score', selectedTimeline.healthScore.toString()],
        [''],
        ['Milestones'],
        ['Name', 'Type', 'Target Date', 'Status', 'Progress'],
        ...selectedTimeline.milestones.map(milestone => [
          milestone.name,
          milestone.type,
          milestone.targetDate.toLocaleDateString(),
          milestone.status,
          `${milestone.progress}%`
        ])
      ];

      const csvContent = csvData.map(row => row.join(',')).join('\n');
      
      // Create and download file
      const blob = new Blob([csvContent], { type: 'text/csv' });
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `timeline-${selectedTimeline.name.replace(/[^a-zA-Z0-9]/g, '-')}-${new Date().toISOString().split('T')[0]}.csv`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);

      notify.success('Timeline exported successfully');
    } catch (error) {
      console.error('Export failed:', error);
      notify.error('Export failed', 'Unable to export timeline data');
    }
  };

  useEffect(() => {
    loadTimelines();
  }, []);

  useEffect(() => {
    if (selectedTimeline) {
      loadTimelineAnalytics(selectedTimeline.id);
    }
  }, [selectedTimeline]);

  const loadTimelines = async () => {
    try {
      setLoading(true);
      const timelinesData = await orchestrationService.getTimelines();
      setTimelines(timelinesData);
      if (timelinesData.length > 0 && !selectedTimeline) {
        setSelectedTimeline(timelinesData[0]);
      }
    } catch (error) {
      console.error('Failed to load timelines:', error);
      // Use mock data for demonstration
      const mockTimelines: Timeline[] = [
        {
          id: 'timeline-1',
          name: 'NIST 800-171r3 Implementation',
          description: 'Complete implementation of NIST 800-171r3 controls for DoD contract compliance',
          framework: 'NIST 800-171r3',
          startDate: new Date('2024-08-15'),
          targetCompletion: new Date('2024-12-31'),
          status: 'active',
          currentProgress: 45,
          healthScore: 85,
          milestones: [
            {
              id: 'milestone-1',
              name: 'Assessment Complete',
              type: 'framework',
              targetDate: new Date('2024-09-01'),
              status: 'completed',
              progress: 100,
              dependencies: []
            },
            {
              id: 'milestone-2',
              name: 'High Priority Controls Implemented',
              type: 'business',
              targetDate: new Date('2024-10-15'),
              status: 'in_progress',
              progress: 60,
              dependencies: [],
              successCriteria: 'All high priority gaps closed'
            },
            {
              id: 'milestone-3',
              name: 'Executive Review',
              type: 'business',
              targetDate: new Date('2024-11-30'),
              status: 'pending',
              progress: 0,
              dependencies: [],
              attendees: ['ceo@company.com', 'ciso@company.com']
            }
          ],
          criticalPath: ['task-1', 'task-2'],
          resourceAllocation: {
            fteSecurityEngineers: 2.5,
            fteComplianceOfficers: 1.0,
            budgetAllocated: 150000,
            budgetSpent: 45000
          },
          analytics: {
            projectedCompletion: new Date('2024-12-28'),
            riskScore: 'low',
            bufferDays: 3,
            scheduleVariance: -2.3,
            resourceUtilization: 85
          }
        }
      ];
      setTimelines(mockTimelines);
      setSelectedTimeline(mockTimelines[0]);
    } finally {
      setLoading(false);
    }
  };

  const loadTimelineAnalytics = async (timelineId: string) => {
    try {
      const analyticsData = await orchestrationService.getTimelineAnalytics(timelineId);
      setAnalytics(analyticsData);
    } catch (error) {
      console.error('Failed to load timeline analytics:', error);
      // Mock analytics data
      setAnalytics({
        currentStatus: {
          overallProgress: 45,
          milestonesCompleted: 1,
          milestonesTotal: 3,
          tasksCompleted: 12,
          tasksTotal: 25,
          daysElapsed: 30,
          daysRemaining: 95
        },
        performanceMetrics: {
          velocity: {
            tasksPerWeek: 2.8,
            projectedCompletion: '2024-12-28',
            onSchedule: true
          },
          quality: {
            reworkRate: 8,
            firstTimeSuccess: 92,
            stakeholderSatisfaction: 4.3
          },
          resourceUtilization: {
            teamCapacity: 85,
            budgetUtilization: 30,
            efficiencyScore: 88
          }
        }
      });
    }
  };

  const getMilestoneStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'text-green-600 bg-green-100 dark:bg-green-900/30';
      case 'in_progress': return 'text-blue-600 bg-blue-100 dark:bg-blue-900/30';
      case 'delayed': return 'text-red-600 bg-red-100 dark:bg-red-900/30';
      default: return 'text-gray-600 bg-gray-100 dark:bg-gray-700';
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'framework': return Target;
      case 'business': return TrendingUp;
      case 'risk': return AlertTriangle;
      default: return Calendar;
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
      <PageHeader
        title="Timeline Management"
        subtitle="Orchestrate compliance projects with intelligent scheduling"
        icon={Calendar}
        actions={
          <div className="flex items-center space-x-3">
            <Button 
              variant="outline" 
              size="sm" 
              onClick={handleExportTimeline}
              disabled={!selectedTimeline}
            >
              <Download className="h-4 w-4 mr-2" />
              Export
            </Button>
            <Button onClick={() => setNewTimelineModalOpen(true)}>
              <Plus className="h-4 w-4 mr-2" />
              New Timeline
            </Button>
          </div>
        }
      />

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Timeline List */}
        <div className="lg:col-span-1">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
              Active Timelines
            </h3>
            <div className="space-y-3">
              {timelines.map((timeline) => (
                <button
                  key={timeline.id}
                  onClick={() => setSelectedTimeline(timeline)}
                  className={`w-full text-left p-3 rounded-lg border transition-all ${
                    selectedTimeline?.id === timeline.id
                      ? 'border-blue-500 bg-blue-50 dark:border-blue-400 dark:bg-blue-900/20'
                      : 'border-gray-200 dark:border-gray-700 hover:border-blue-300 dark:hover:border-blue-600'
                  }`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="font-medium text-gray-900 dark:text-white text-sm">
                      {timeline.name}
                    </h4>
                    <StatusBadge status={timeline.status} size="sm" />
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-gray-500 dark:text-gray-400">
                      {timeline.framework}
                    </span>
                    <span className="text-xs font-medium text-blue-600 dark:text-blue-400">
                      {timeline.currentProgress}%
                    </span>
                  </div>
                  <div className="mt-2 w-full bg-gray-200 dark:bg-gray-700 rounded-full h-1.5">
                    <div 
                      className="bg-blue-600 h-1.5 rounded-full transition-all duration-300"
                      style={{ width: `${timeline.currentProgress}%` }}
                    />
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Timeline Details */}
        <div className="lg:col-span-3">
          {selectedTimeline ? (
            <div className="space-y-6">
              {/* Timeline Header */}
              <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
                      {selectedTimeline.name}
                    </h2>
                    <p className="text-gray-600 dark:text-gray-400 mt-1">
                      {selectedTimeline.description}
                    </p>
                  </div>
                  <StatusBadge status={selectedTimeline.status} />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                  <div className="text-center p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                    <p className="text-sm text-gray-600 dark:text-gray-400">Overall Progress</p>
                    <p className="text-2xl font-bold text-blue-600 dark:text-blue-400">
                      {selectedTimeline.currentProgress}%
                    </p>
                  </div>
                  <div className="text-center p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                    <p className="text-sm text-gray-600 dark:text-gray-400">Health Score</p>
                    <p className="text-2xl font-bold text-green-600 dark:text-green-400">
                      {selectedTimeline.healthScore}
                    </p>
                  </div>
                  <div className="text-center p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                    <p className="text-sm text-gray-600 dark:text-gray-400">Start Date</p>
                    <p className="text-sm font-medium text-gray-900 dark:text-white">
                      {selectedTimeline.startDate.toLocaleDateString()}
                    </p>
                  </div>
                  <div className="text-center p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                    <p className="text-sm text-gray-600 dark:text-gray-400">Target Date</p>
                    <p className="text-sm font-medium text-gray-900 dark:text-white">
                      {selectedTimeline.targetCompletion.toLocaleDateString()}
                    </p>
                  </div>
                </div>
              </div>

              {/* Milestones */}
              <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                  Project Milestones
                </h3>
                <div className="space-y-4">
                  {selectedTimeline.milestones.map((milestone, index) => {
                    const Icon = getTypeIcon(milestone.type);
                    const isLast = index === selectedTimeline.milestones.length - 1;
                    
                    return (
                      <div key={milestone.id} className="relative">
                        <div className="flex items-start space-x-4">
                          <div className="flex flex-col items-center">
                            <div className={`p-2 rounded-full ${getMilestoneStatusColor(milestone.status)}`}>
                              <Icon className="h-5 w-5" />
                            </div>
                            {!isLast && (
                              <div className="w-0.5 h-16 bg-gray-200 dark:bg-gray-700 mt-2" />
                            )}
                          </div>
                          <div className="flex-1 min-w-0 pb-8">
                            <div className="flex items-center justify-between mb-2">
                              <h4 className="text-sm font-medium text-gray-900 dark:text-white">
                                {milestone.name}
                              </h4>
                              <div className="flex items-center space-x-2">
                                <span className={`px-2 py-1 rounded-full text-xs font-medium ${getMilestoneStatusColor(milestone.status)}`}>
                                  {milestone.status.replace('_', ' ')}
                                </span>
                                <span className="text-xs text-gray-500 dark:text-gray-400">
                                  {milestone.targetDate.toLocaleDateString()}
                                </span>
                              </div>
                            </div>
                            <div className="flex items-center space-x-4">
                              <div className="flex-1 bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                                <div 
                                  className={`h-2 rounded-full transition-all duration-300 ${
                                    milestone.status === 'completed' ? 'bg-green-600' :
                                    milestone.status === 'in_progress' ? 'bg-blue-600' :
                                    milestone.status === 'delayed' ? 'bg-red-600' :
                                    'bg-gray-400'
                                  }`}
                                  style={{ width: `${milestone.progress}%` }}
                                />
                              </div>
                              <span className="text-xs text-gray-600 dark:text-gray-400 w-10">
                                {milestone.progress}%
                              </span>
                            </div>
                            {milestone.successCriteria && (
                              <p className="text-xs text-gray-500 dark:text-gray-400 mt-2">
                                Success Criteria: {milestone.successCriteria}
                              </p>
                            )}
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Analytics */}
              {analytics && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Gantt Chart */}
                  <div className="md:col-span-2 bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                      Project Gantt Chart
                    </h3>
                    <GanttChart
                      timeline={selectedTimeline}
                      tasks={[]} // Would be loaded from API
                      onTaskClick={(task) => console.log('Task clicked:', task)}
                      onMilestoneClick={(milestone) => console.log('Milestone clicked:', milestone)}
                    />
                  </div>

                  <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                      Performance Metrics
                    </h3>
                    <div className="space-y-4">
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-gray-600 dark:text-gray-400">Tasks per week</span>
                        <span className="font-semibold text-gray-900 dark:text-white">
                          {analytics.performanceMetrics.velocity.tasksPerWeek}
                        </span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-gray-600 dark:text-gray-400">First-time success</span>
                        <span className="font-semibold text-green-600">
                          {analytics.performanceMetrics.quality.firstTimeSuccess}%
                        </span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-gray-600 dark:text-gray-400">Team capacity</span>
                        <span className="font-semibold text-blue-600">
                          {analytics.performanceMetrics.resourceUtilization.teamCapacity}%
                        </span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-gray-600 dark:text-gray-400">Budget utilization</span>
                        <span className="font-semibold text-purple-600">
                          {analytics.performanceMetrics.resourceUtilization.budgetUtilization}%
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                      Schedule Health
                    </h3>
                    <div className="space-y-4">
                      <div className="text-center">
                        <div className="inline-flex items-center justify-center w-20 h-20 bg-green-100 dark:bg-green-900/30 rounded-full mb-2">
                          <span className="text-2xl font-bold text-green-600 dark:text-green-400">
                            {selectedTimeline.healthScore}
                          </span>
                        </div>
                        <p className="text-sm text-gray-600 dark:text-gray-400">Health Score</p>
                      </div>
                      <div className="grid grid-cols-2 gap-4 text-center">
                        <div>
                          <p className="text-lg font-bold text-gray-900 dark:text-white">
                            {analytics.currentStatus.daysRemaining}
                          </p>
                          <p className="text-xs text-gray-500 dark:text-gray-400">Days remaining</p>
                        </div>
                        <div>
                          <p className="text-lg font-bold text-blue-600 dark:text-blue-400">
                            {analytics.performanceMetrics.velocity.onSchedule ? 'On Track' : 'Delayed'}
                          </p>
                          <p className="text-xs text-gray-500 dark:text-gray-400">Schedule status</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          ) : (
            <EmptyState
              icon={Calendar}
              title="No timelines found"
              description="Create your first timeline to start orchestrating compliance projects"
              action={{
                label: 'Create Timeline',
                onClick: () => console.log('Create new timeline')
              }}
            />
          )}
        </div>
      </div>

      {/* New Timeline Modal */}
      <Modal
        isOpen={newTimelineModalOpen}
        onClose={() => setNewTimelineModalOpen(false)}
        title="Create New Timeline"
        size="lg"
      >
        <NewTimelineForm
          onSubmit={(timelineData) => {
            // Add the new timeline to the list
            const newTimeline = {
              id: `timeline-${Date.now()}`,
              ...timelineData,
              status: 'draft',
              currentProgress: 0,
              healthScore: 100,
              milestones: [],
              criticalPath: [],
              resourceAllocation: {
                fteSecurityEngineers: 0,
                fteComplianceOfficers: 0,
                budgetAllocated: 0,
                budgetSpent: 0
              },
              analytics: {
                projectedCompletion: timelineData.targetCompletion,
                riskScore: 'low',
                bufferDays: 0,
                scheduleVariance: 0,
                resourceUtilization: 0
              }
            } as Timeline;
            setTimelines(prev => [newTimeline, ...prev]);
            setNewTimelineModalOpen(false);
            notify.success('Timeline created successfully');
          }}
          onCancel={() => setNewTimelineModalOpen(false)}
        />
      </Modal>
    </div>
  );
};

// New Timeline Form Component
const NewTimelineForm: React.FC<{
  onSubmit: (timelineData: any) => void;
  onCancel: () => void;
}> = ({ onSubmit, onCancel }) => {
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    framework: '',
    startDate: '',
    targetCompletion: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.name.trim()) {
      alert('Please enter a timeline name');
      return;
    }

    const timelineData = {
      ...formData,
      startDate: formData.startDate ? new Date(formData.startDate) : new Date(),
      targetCompletion: formData.targetCompletion ? new Date(formData.targetCompletion) : new Date(Date.now() + 90 * 24 * 60 * 60 * 1000)
    };

    onSubmit(timelineData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <Input
        label="Timeline Name"
        value={formData.name}
        onChange={(e) => setFormData({...formData, name: e.target.value})}
        placeholder="Enter timeline name"
        required
      />
      
      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
          Description
        </label>
        <textarea
          value={formData.description}
          onChange={(e) => setFormData({...formData, description: e.target.value})}
          placeholder="Enter timeline description"
          rows={3}
          className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700"
        />
      </div>

      <Select
        label="Framework"
        value={formData.framework}
        onChange={(e) => setFormData({...formData, framework: e.target.value})}
        options={[
          { value: '', label: 'Select Framework' },
          { value: 'NIST 800-171r3', label: 'NIST 800-171r3' },
          { value: 'ISO 27001', label: 'ISO 27001' },
          { value: 'NIST CSF 2.0', label: 'NIST CSF 2.0' },
          { value: 'CMMC 2.0', label: 'CMMC 2.0' }
        ]}
        required
      />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Input
          label="Start Date"
          type="date"
          value={formData.startDate}
          onChange={(e) => setFormData({...formData, startDate: e.target.value})}
        />
        
        <Input
          label="Target Completion"
          type="date"
          value={formData.targetCompletion}
          onChange={(e) => setFormData({...formData, targetCompletion: e.target.value})}
          required
        />
      </div>

      <div className="flex justify-end space-x-3 pt-4">
        <Button variant="outline" onClick={onCancel}>
          Cancel
        </Button>
        <Button type="submit">
          Create Timeline
        </Button>
      </div>
    </form>
  );
};

export default TimelineManagement;