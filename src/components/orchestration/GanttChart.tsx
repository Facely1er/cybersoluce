import React, { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import {
  Calendar,
  ChevronLeft,
  ChevronRight,
  Target,
  Clock,
  AlertTriangle,
  CheckCircle,
  Settings,
  ZoomIn,
  ZoomOut
} from 'lucide-react';
import { Button } from '../ui/button';
import StatusBadge from '../ui/StatusBadge';
import { Timeline, Milestone, Task } from '../../types/orchestration';

interface GanttChartProps {
  timeline: Timeline;
  tasks: Task[];
  onTaskClick?: (task: Task) => void;
  onMilestoneClick?: (milestone: Milestone) => void;
  className?: string;
}

interface GanttBar {
  id: string;
  name: string;
  startDate: Date;
  endDate: Date;
  progress: number;
  type: 'task' | 'milestone';
  status: string;
  dependencies: string[];
  critical: boolean;
}

const GanttChart: React.FC<GanttChartProps> = ({
  timeline,
  tasks = [],
  onTaskClick,
  onMilestoneClick,
  className = ''
}) => {
  const [viewMode, setViewMode] = useState<'days' | 'weeks' | 'months'>('weeks');
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedItem, setSelectedItem] = useState<string | null>(null);
  const chartRef = useRef<HTMLDivElement>(null);

  // Combine tasks and milestones into gantt bars
  const ganttBars: GanttBar[] = [
    ...tasks.map(task => ({
      id: task.id,
      name: task.title,
      startDate: task.createdAt,
      endDate: task.dueDate || new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
      progress: task.progress,
      type: 'task' as const,
      status: task.status,
      dependencies: task.dependencies.map(d => d.taskId),
      critical: timeline.criticalPath.includes(task.id)
    })),
    ...timeline.milestones.map(milestone => ({
      id: milestone.id,
      name: milestone.name,
      startDate: milestone.targetDate,
      endDate: milestone.targetDate,
      progress: milestone.progress,
      type: 'milestone' as const,
      status: milestone.status,
      dependencies: milestone.dependencies,
      critical: false
    }))
  ];

  // Calculate time scale based on view mode
  const getTimeScale = () => {
    const start = timeline.startDate;
    const end = timeline.targetCompletion;
    const totalDays = Math.ceil((end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24));
    
    switch (viewMode) {
      case 'days':
        return { unit: 'day', unitWidth: 30, totalUnits: totalDays };
      case 'weeks':
        return { unit: 'week', unitWidth: 40, totalUnits: Math.ceil(totalDays / 7) };
      case 'months':
        return { unit: 'month', unitWidth: 50, totalUnits: Math.ceil(totalDays / 30) };
      default:
        return { unit: 'week', unitWidth: 40, totalUnits: Math.ceil(totalDays / 7) };
    }
  };

  const timeScale = getTimeScale();

  // Generate time header
  const generateTimeHeader = () => {
    const headers = [];
    const start = new Date(timeline.startDate);
    
    for (let i = 0; i < timeScale.totalUnits; i++) {
      const date = new Date(start);
      
      if (viewMode === 'days') {
        date.setDate(start.getDate() + i);
        headers.push({
          label: date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
          date: new Date(date)
        });
      } else if (viewMode === 'weeks') {
        date.setDate(start.getDate() + (i * 7));
        headers.push({
          label: `Week ${i + 1}`,
          date: new Date(date)
        });
      } else {
        date.setMonth(start.getMonth() + i);
        headers.push({
          label: date.toLocaleDateString('en-US', { month: 'short', year: 'numeric' }),
          date: new Date(date)
        });
      }
    }
    
    return headers;
  };

  const timeHeaders = generateTimeHeader();

  // Calculate bar position and width
  const calculateBarMetrics = (item: GanttBar) => {
    const timelineStart = timeline.startDate.getTime();
    const timelineEnd = timeline.targetCompletion.getTime();
    const totalDuration = timelineEnd - timelineStart;
    
    const itemStart = item.startDate.getTime();
    const itemEnd = item.endDate.getTime();
    
    const leftPercent = ((itemStart - timelineStart) / totalDuration) * 100;
    const widthPercent = item.type === 'milestone' 
      ? 0.5 // Milestones are thin vertical lines
      : ((itemEnd - itemStart) / totalDuration) * 100;
    
    return { leftPercent, widthPercent };
  };

  const getBarColor = (item: GanttBar) => {
    if (item.critical) {
      return 'bg-red-500';
    }
    
    switch (item.status) {
      case 'completed':
        return 'bg-green-500';
      case 'in_progress':
        return 'bg-blue-500';
      case 'blocked':
        return 'bg-red-500';
      case 'delayed':
        return 'bg-orange-500';
      default:
        return 'bg-gray-500';
    }
  };

  const getTodayPosition = () => {
    const timelineStart = timeline.startDate.getTime();
    const timelineEnd = timeline.targetCompletion.getTime();
    const today = new Date().getTime();
    const totalDuration = timelineEnd - timelineStart;
    
    if (today < timelineStart || today > timelineEnd) return null;
    
    return ((today - timelineStart) / totalDuration) * 100;
  };

  const todayPosition = getTodayPosition();

  return (
    <div className={`bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 ${className}`}>
      {/* Gantt Header */}
      <div className="p-4 border-b border-gray-200 dark:border-gray-700">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
              Project Timeline: {timeline.name}
            </h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              {timeline.startDate.toLocaleDateString()} - {timeline.targetCompletion.toLocaleDateString()}
            </p>
          </div>
          
          <div className="flex items-center space-x-2">
            <div className="flex items-center space-x-1 bg-gray-100 dark:bg-gray-700 rounded-lg p-1">
              {['days', 'weeks', 'months'].map((mode) => (
                <button
                  key={mode}
                  onClick={() => setViewMode(mode as any)}
                  className={`px-3 py-1 text-xs font-medium rounded ${
                    viewMode === mode
                      ? 'bg-white dark:bg-gray-600 text-gray-900 dark:text-white shadow-sm'
                      : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'
                  }`}
                >
                  {mode.charAt(0).toUpperCase() + mode.slice(1)}
                </button>
              ))}
            </div>
            
            <Button variant="outline" size="sm">
              <Settings className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>

      {/* Gantt Chart */}
      <div className="overflow-auto" style={{ maxHeight: '600px' }}>
        <div className="min-w-full">
          {/* Time Header */}
          <div className="sticky top-0 bg-gray-50 dark:bg-gray-700 border-b border-gray-200 dark:border-gray-600 z-10">
            <div className="flex">
              <div className="w-64 px-4 py-3 border-r border-gray-200 dark:border-gray-600">
                <span className="font-medium text-gray-900 dark:text-white">Task/Milestone</span>
              </div>
              <div className="flex-1 flex">
                {timeHeaders.map((header, index) => (
                  <div
                    key={index}
                    className="border-r border-gray-200 dark:border-gray-600 text-center py-3"
                    style={{ minWidth: `${timeScale.unitWidth}px` }}
                  >
                    <span className="text-xs text-gray-600 dark:text-gray-400">
                      {header.label}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Gantt Rows */}
          <div className="relative">
            {ganttBars.map((item, index) => {
              const { leftPercent, widthPercent } = calculateBarMetrics(item);
              const Icon = item.type === 'milestone' ? Target : 
                         item.status === 'completed' ? CheckCircle :
                         item.status === 'blocked' ? AlertTriangle : Clock;
              
              return (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.05 }}
                  className={`flex border-b border-gray-100 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700 ${
                    selectedItem === item.id ? 'bg-blue-50 dark:bg-blue-900/20' : ''
                  }`}
                  onClick={() => {
                    setSelectedItem(item.id);
                    if (item.type === 'task') {
                      const task = tasks.find(t => t.id === item.id);
                      if (task && onTaskClick) onTaskClick(task);
                    } else {
                      const milestone = timeline.milestones.find(m => m.id === item.id);
                      if (milestone && onMilestoneClick) onMilestoneClick(milestone);
                    }
                  }}
                >
                  <div className="w-64 px-4 py-3 border-r border-gray-200 dark:border-gray-600">
                    <div className="flex items-center">
                      <Icon className={`h-4 w-4 mr-2 ${
                        item.critical ? 'text-red-600 dark:text-red-400' :
                        item.status === 'completed' ? 'text-green-600 dark:text-green-400' :
                        item.status === 'blocked' ? 'text-red-600 dark:text-red-400' :
                        'text-blue-600 dark:text-blue-400'
                      }`} />
                      <div className="min-w-0 flex-1">
                        <p className="text-sm font-medium text-gray-900 dark:text-white truncate">
                          {item.name}
                        </p>
                        <div className="flex items-center space-x-2 mt-1">
                          <StatusBadge status={item.status.replace('_', '-')} size="sm" />
                          {item.critical && (
                            <span className="text-xs text-red-600 dark:text-red-400 font-medium">
                              Critical Path
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex-1 relative py-3" style={{ minHeight: '60px' }}>
                    {/* Task/Milestone Bar */}
                    <div
                      className={`absolute top-1/2 transform -translate-y-1/2 h-6 rounded ${getBarColor(item)} opacity-80 hover:opacity-100 transition-opacity cursor-pointer`}
                      style={{
                        left: `${leftPercent}%`,
                        width: item.type === 'milestone' ? '4px' : `${Math.max(widthPercent, 2)}%`
                      }}
                    >
                      {item.type === 'task' && item.progress > 0 && (
                        <div
                          className="h-full bg-white dark:bg-gray-300 opacity-60 rounded-l"
                          style={{ width: `${item.progress}%` }}
                        />
                      )}
                    </div>

                    {/* Progress Label */}
                    {item.type === 'task' && (
                      <div
                        className="absolute top-0 text-xs text-gray-600 dark:text-gray-400"
                        style={{ left: `${leftPercent}%` }}
                      >
                        {item.progress}%
                      </div>
                    )}
                  </div>
                </motion.div>
              );
            })}
            
            {/* Today Line */}
            {todayPosition !== null && (
              <div
                className="absolute top-0 bottom-0 w-0.5 bg-red-500 z-20"
                style={{ left: `${todayPosition}%` }}
              >
                <div className="absolute -top-2 -left-8 bg-red-500 text-white text-xs px-2 py-1 rounded">
                  Today
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Chart Controls */}
      <div className="p-4 border-t border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2 text-sm">
              <div className="w-3 h-3 bg-red-500 rounded"></div>
              <span className="text-gray-600 dark:text-gray-400">Critical Path</span>
            </div>
            <div className="flex items-center space-x-2 text-sm">
              <div className="w-3 h-3 bg-blue-500 rounded"></div>
              <span className="text-gray-600 dark:text-gray-400">In Progress</span>
            </div>
            <div className="flex items-center space-x-2 text-sm">
              <div className="w-3 h-3 bg-green-500 rounded"></div>
              <span className="text-gray-600 dark:text-gray-400">Completed</span>
            </div>
          </div>
          
          <div className="flex items-center space-x-2">
            <span className="text-sm text-gray-600 dark:text-gray-400">
              Progress: {timeline.currentProgress}%
            </span>
            <div className="w-24 h-2 bg-gray-200 dark:bg-gray-700 rounded-full">
              <div
                className="h-2 bg-blue-600 rounded-full transition-all duration-300"
                style={{ width: `${timeline.currentProgress}%` }}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GanttChart;