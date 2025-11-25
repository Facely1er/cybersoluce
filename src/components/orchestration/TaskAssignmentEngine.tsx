import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import {
  User,
  Clock,
  Target,
  TrendingUp,
  AlertTriangle,
  CheckCircle,
  Brain,
  Users,
  Award,
  Activity
} from 'lucide-react';
import { Task, AssignmentSuggestion } from '../../types/orchestration';
import { orchestrationService } from '../../services/orchestrationService';
import { Button } from '../ui/button';
import StatusBadge from '../ui/StatusBadge';
import { useNotify } from '../notifications/NotificationSystem';

interface TaskAssignmentEngineProps {
  task: Task;
  onAssigned: (updatedTask: Task) => void;
  onClose: () => void;
}

const TaskAssignmentEngine: React.FC<TaskAssignmentEngineProps> = ({
  task,
  onAssigned,
  onClose
}) => {
  const [suggestions, setSuggestions] = useState<AssignmentSuggestion[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedUser, setSelectedUser] = useState<string | null>(null);
  const [assigning, setAssigning] = useState(false);
  const [assignmentNote, setAssignmentNote] = useState('');

  const notify = useNotify();

  useEffect(() => {
    loadAssignmentSuggestions();
  }, [task.id]);

  const loadAssignmentSuggestions = async () => {
    try {
      setLoading(true);
      const response = await orchestrationService.getAssignmentSuggestions(task.id, {
        considerWorkload: true,
        considerSkills: true,
        considerAvailability: true,
        maxSuggestions: 5
      });
      setSuggestions(response.suggestions);
      setSelectedUser(response.assignmentRecommendation.recommendedUser);
    } catch (error) {
      console.error('Failed to load assignment suggestions:', error);
      // Mock suggestions for demonstration
      setSuggestions([
        {
          userId: 'user-789',
          name: 'Sarah Johnson',
          email: 'sarah.johnson@company.com',
          score: 92,
          reasoning: {
            skillMatch: 95,
            workloadCapacity: 85,
            previousPerformance: 98,
            availability: 90
          },
          currentWorkload: {
            activeTasks: 3,
            estimatedHours: 24,
            capacityUtilization: 60
          },
          relevantSkills: [
            'Multi-Factor Authentication',
            'Identity Management',
            'NIST 800-171',
            'Privileged Access Management'
          ],
          recentPerformance: {
            completionRate: 98,
            avgQualityScore: 4.7,
            onTimeDelivery: 96
          }
        },
        {
          userId: 'user-234',
          name: 'Michael Chen',
          email: 'michael.chen@company.com',
          score: 87,
          reasoning: {
            skillMatch: 88,
            workloadCapacity: 95,
            previousPerformance: 92,
            availability: 75
          },
          currentWorkload: {
            activeTasks: 2,
            estimatedHours: 16,
            capacityUtilization: 40
          },
          relevantSkills: [
            'Authentication Systems',
            'Security Architecture',
            'Compliance Implementation'
          ],
          recentPerformance: {
            completionRate: 94,
            avgQualityScore: 4.5,
            onTimeDelivery: 89
          }
        }
      ]);
      setSelectedUser('user-789');
    } finally {
      setLoading(false);
    }
  };

  const handleAssign = async () => {
    if (!selectedUser) return;

    try {
      setAssigning(true);
      const updatedTask = await orchestrationService.assignTask(task.id, {
        assignedTo: selectedUser,
        assignmentNote
      });
      onAssigned(updatedTask);
      notify.success('Task assigned successfully');
    } catch (error) {
      console.error('Failed to assign task:', error);
      notify.error('Failed to assign task');
    } finally {
      setAssigning(false);
    }
  };

  const getScoreColor = (score: number) => {
    if (score >= 90) return 'text-green-600 bg-green-100 dark:bg-green-900/30';
    if (score >= 80) return 'text-blue-600 bg-blue-100 dark:bg-blue-900/30';
    if (score >= 70) return 'text-yellow-600 bg-yellow-100 dark:bg-yellow-900/30';
    return 'text-red-600 bg-red-100 dark:bg-red-900/30';
  };

  const getCapacityColor = (utilization: number) => {
    if (utilization <= 60) return 'text-green-600';
    if (utilization <= 80) return 'text-yellow-600';
    return 'text-red-600';
  };

  if (loading) {
    return (
      <div className="space-y-4">
        <div className="animate-pulse">
          <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-1/4 mb-4"></div>
          <div className="space-y-3">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="h-16 bg-gray-200 dark:bg-gray-700 rounded"></div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="bg-gray-50 dark:bg-gray-900 rounded-lg p-4">
        <h3 className="font-semibold text-gray-900 dark:text-white mb-2">Task Details</h3>
        <div className="grid grid-cols-2 gap-4 text-sm">
          <div>
            <span className="text-gray-600 dark:text-gray-400">Priority:</span>
            <span className="ml-2 font-medium text-gray-900 dark:text-white capitalize">{task.priority}</span>
          </div>
          <div>
            <span className="text-gray-600 dark:text-gray-400">Estimated Hours:</span>
            <span className="ml-2 font-medium text-gray-900 dark:text-white">{task.estimatedHours || 'TBD'}</span>
          </div>
          <div>
            <span className="text-gray-600 dark:text-gray-400">Due Date:</span>
            <span className="ml-2 font-medium text-gray-900 dark:text-white">
              {task.dueDate?.toLocaleDateString() || 'TBD'}
            </span>
          </div>
          <div>
            <span className="text-gray-600 dark:text-gray-400">Framework:</span>
            <span className="ml-2 font-medium text-gray-900 dark:text-white">{task.framework || 'General'}</span>
          </div>
        </div>
      </div>

      <div>
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
            Assignment Suggestions
          </h3>
          <div className="flex items-center text-sm text-gray-600 dark:text-gray-400">
            <Brain className="h-4 w-4 mr-1" />
            AI-Powered Recommendations
          </div>
        </div>

        <div className="space-y-4">
          {suggestions.map((suggestion, index) => (
            <motion.div
              key={suggestion.userId}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className={`border rounded-lg p-4 cursor-pointer transition-all ${
                selectedUser === suggestion.userId
                  ? 'border-blue-500 bg-blue-50 dark:border-blue-400 dark:bg-blue-900/20'
                  : 'border-gray-200 dark:border-gray-700 hover:border-blue-300 dark:hover:border-blue-600'
              }`}
              onClick={() => setSelectedUser(suggestion.userId)}
            >
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-center">
                  <div className="bg-gray-200 dark:bg-gray-600 rounded-full h-10 w-10 flex items-center justify-center mr-3">
                    <User className="h-5 w-5 text-gray-600 dark:text-gray-300" />
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-900 dark:text-white">
                      {suggestion.name}
                    </h4>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      {suggestion.email}
                    </p>
                  </div>
                </div>
                <div className={`px-3 py-1 rounded-full text-sm font-medium ${getScoreColor(suggestion.score)}`}>
                  {suggestion.score}% Match
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                <div className="text-center p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                  <div className="flex items-center justify-center mb-1">
                    <Target className="h-4 w-4 text-blue-600 dark:text-blue-400 mr-1" />
                    <span className="text-sm font-medium text-gray-900 dark:text-white">
                      Skills
                    </span>
                  </div>
                  <div className="text-lg font-bold text-blue-600 dark:text-blue-400">
                    {suggestion.reasoning.skillMatch}%
                  </div>
                </div>

                <div className="text-center p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                  <div className="flex items-center justify-center mb-1">
                    <Activity className="h-4 w-4 text-green-600 dark:text-green-400 mr-1" />
                    <span className="text-sm font-medium text-gray-900 dark:text-white">
                      Capacity
                    </span>
                  </div>
                  <div className={`text-lg font-bold ${getCapacityColor(suggestion.currentWorkload.capacityUtilization)}`}>
                    {suggestion.currentWorkload.capacityUtilization}%
                  </div>
                </div>

                <div className="text-center p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                  <div className="flex items-center justify-center mb-1">
                    <Award className="h-4 w-4 text-purple-600 dark:text-purple-400 mr-1" />
                    <span className="text-sm font-medium text-gray-900 dark:text-white">
                      Performance
                    </span>
                  </div>
                  <div className="text-lg font-bold text-purple-600 dark:text-purple-400">
                    {suggestion.recentPerformance.avgQualityScore.toFixed(1)}
                  </div>
                </div>
              </div>

              <div className="mb-3">
                <h5 className="text-sm font-medium text-gray-900 dark:text-white mb-2">
                  Relevant Skills
                </h5>
                <div className="flex flex-wrap gap-1">
                  {suggestion.relevantSkills.slice(0, 4).map((skill, index) => (
                    <span
                      key={index}
                      className="px-2 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-300 rounded-full text-xs"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-3 gap-4 text-xs text-gray-600 dark:text-gray-400">
                <div>
                  <span>Active Tasks:</span>
                  <span className="ml-1 font-medium text-gray-900 dark:text-white">
                    {suggestion.currentWorkload.activeTasks}
                  </span>
                </div>
                <div>
                  <span>Completion Rate:</span>
                  <span className="ml-1 font-medium text-gray-900 dark:text-white">
                    {suggestion.recentPerformance.completionRate}%
                  </span>
                </div>
                <div>
                  <span>On-Time Delivery:</span>
                  <span className="ml-1 font-medium text-gray-900 dark:text-white">
                    {suggestion.recentPerformance.onTimeDelivery}%
                  </span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
          Assignment Note (Optional)
        </label>
        <textarea
          value={assignmentNote}
          onChange={(e) => setAssignmentNote(e.target.value)}
          placeholder="Add a note about why this person was selected..."
          rows={3}
          className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700"
        />
      </div>

      <div className="flex justify-end space-x-3">
        <Button variant="outline" onClick={onClose}>
          Cancel
        </Button>
        <Button 
          onClick={handleAssign}
          disabled={!selectedUser || assigning}
          loading={assigning}
        >
          Assign Task
        </Button>
      </div>
    </div>
  );
};

export default TaskAssignmentEngine;