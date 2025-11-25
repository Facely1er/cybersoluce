import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  CheckSquare,
  AlertTriangle,
  Clock,
  User,
  FileText,
  Plus,
  X,
  Download,
  Upload
} from 'lucide-react';
import ImportButton from '../common/ImportButton';
import { BulkTaskRequest, ComplianceGap } from '../../types/orchestration';
import { orchestrationService } from '../../services/orchestrationService';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Select } from '../ui/select';
import { Textarea } from '../ui/textarea';
import { useNotify } from '../notifications/NotificationSystem';

interface BulkTaskCreatorProps {
  onTasksCreated: (tasks: any[]) => void;
  onClose: () => void;
}

const BulkTaskCreator: React.FC<BulkTaskCreatorProps> = ({
  onTasksCreated,
  onClose
}) => {
  const [step, setStep] = useState(1);
  const [bulkRequest, setBulkRequest] = useState<BulkTaskRequest>({
    source: 'gap_analysis',
    sourceId: '',
    taskTemplate: {
      framework: 'NIST 800-171r3',
      defaultPriority: 'medium',
      dueDateOffsetDays: 30,
      autoAssign: true,
      businessUnit: 'IT Security'
    },
    gaps: []
  });
  const [loading, setLoading] = useState(false);

  const notify = useNotify();

  const handleAddGap = () => {
    setBulkRequest({
      ...bulkRequest,
      gaps: [
        ...bulkRequest.gaps,
        {
          controlId: '',
          gapDescription: '',
          remediationType: 'technical',
          estimatedEffort: 'medium'
        }
      ]
    });
  };

  const handleRemoveGap = (index: number) => {
    setBulkRequest({
      ...bulkRequest,
      gaps: bulkRequest.gaps.filter((_, i) => i !== index)
    });
  };

  const handleGapChange = (index: number, field: keyof ComplianceGap, value: any) => {
    const updatedGaps = [...bulkRequest.gaps];
    updatedGaps[index] = { ...updatedGaps[index], [field]: value };
    setBulkRequest({ ...bulkRequest, gaps: updatedGaps });
  };

  const handleCreateTasks = async () => {
    try {
      setLoading(true);
      const result = await orchestrationService.createBulkTasks(bulkRequest);
      onTasksCreated(result.tasks);
      notify.success(`Created ${result.tasksCreated} tasks successfully`);
    } catch (error) {
      console.error('Failed to create bulk tasks:', error);
      notify.error('Failed to create bulk tasks');
    } finally {
      setLoading(false);
    }
  };

  const validateStep = (stepNumber: number) => {
    switch (stepNumber) {
      case 1:
        return bulkRequest.taskTemplate.framework && bulkRequest.taskTemplate.businessUnit;
      case 2:
        return bulkRequest.gaps.length > 0 && bulkRequest.gaps.every(gap => 
          gap.controlId && gap.gapDescription && gap.remediationType
        );
      default:
        return false;
    }
  };

  return (
    <div className="space-y-6">
      {/* Progress Steps */}
      <div className="flex items-center justify-between mb-8">
        {[
          { number: 1, title: 'Configuration', icon: FileText },
          { number: 2, title: 'Gaps & Tasks', icon: CheckSquare },
          { number: 3, title: 'Review & Create', icon: User }
        ].map((stepInfo, index) => {
          const Icon = stepInfo.icon;
          return (
            <div key={stepInfo.number} className="flex items-center">
              <div className={`flex items-center justify-center w-10 h-10 rounded-full ${
                step >= stepInfo.number 
                  ? 'bg-blue-600 text-white' 
                  : 'bg-gray-200 dark:bg-gray-700 text-gray-600 dark:text-gray-400'
              }`}>
                {step > stepInfo.number ? (
                  <CheckSquare className="h-5 w-5" />
                ) : (
                  <Icon className="h-5 w-5" />
                )}
              </div>
              <div className="ml-3">
                <p className={`text-sm font-medium ${
                  step >= stepInfo.number ? 'text-gray-900 dark:text-white' : 'text-gray-500 dark:text-gray-400'
                }`}>
                  {stepInfo.title}
                </p>
              </div>
              {index < 2 && (
                <div className={`mx-4 h-0.5 w-16 ${
                  step > stepInfo.number ? 'bg-blue-600' : 'bg-gray-200 dark:bg-gray-700'
                }`} />
              )}
            </div>
          );
        })}
      </div>

      {/* Step Content */}
      <motion.div
        key={step}
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.3 }}
      >
        {step === 1 && (
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
              Task Configuration
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Select
                label="Framework"
                value={bulkRequest.taskTemplate.framework}
                onChange={(e) => setBulkRequest({
                  ...bulkRequest,
                  taskTemplate: { ...bulkRequest.taskTemplate, framework: e.target.value }
                })}
                options={[
                  { value: 'NIST 800-171r3', label: 'NIST 800-171r3' },
                  { value: 'ISO 27001', label: 'ISO 27001' },
                  { value: 'NIST CSF 2.0', label: 'NIST CSF 2.0' },
                  { value: 'CMMC 2.0', label: 'CMMC 2.0' }
                ]}
                required
              />
              
              <Input
                label="Business Unit"
                value={bulkRequest.taskTemplate.businessUnit || ''}
                onChange={(e) => setBulkRequest({
                  ...bulkRequest,
                  taskTemplate: { ...bulkRequest.taskTemplate, businessUnit: e.target.value }
                })}
                placeholder="e.g., IT Security"
                required
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Select
                label="Default Priority"
                value={bulkRequest.taskTemplate.defaultPriority}
                onChange={(e) => setBulkRequest({
                  ...bulkRequest,
                  taskTemplate: { ...bulkRequest.taskTemplate, defaultPriority: e.target.value as any }
                })}
                options={[
                  { value: 'critical', label: 'Critical' },
                  { value: 'high', label: 'High' },
                  { value: 'medium', label: 'Medium' },
                  { value: 'low', label: 'Low' }
                ]}
              />
              
              <Input
                label="Due Date Offset (days)"
                type="number"
                value={bulkRequest.taskTemplate.dueDateOffsetDays}
                onChange={(e) => setBulkRequest({
                  ...bulkRequest,
                  taskTemplate: { ...bulkRequest.taskTemplate, dueDateOffsetDays: parseInt(e.target.value) }
                })}
                min="1"
                max="365"
              />
              
              <div className="flex items-center space-x-2 pt-6">
                <input
                  type="checkbox"
                  id="autoAssign"
                  checked={bulkRequest.taskTemplate.autoAssign}
                  onChange={(e) => setBulkRequest({
                    ...bulkRequest,
                    taskTemplate: { ...bulkRequest.taskTemplate, autoAssign: e.target.checked }
                  })}
                  className="h-4 w-4 text-blue-600 rounded border-gray-300"
                />
                <label htmlFor="autoAssign" className="text-sm text-gray-700 dark:text-gray-300">
                  Auto-assign tasks
                </label>
              </div>
            </div>
          </div>
        )}

        {step === 2 && (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                Compliance Gaps & Tasks
              </h3>
              <Button onClick={handleAddGap}>
                <Plus className="h-4 w-4 mr-2" />
                Add Gap
              </Button>
              <ImportButton
                onImport={(importedGaps) => {
                  setBulkRequest({
                    ...bulkRequest,
                    gaps: [...bulkRequest.gaps, ...importedGaps.map(gap => ({
                      controlId: gap.control_id || gap.controlId || '',
                      gapDescription: gap.gap_description || gap.gapDescription || '',
                      remediationType: gap.remediation_type || gap.remediationType || 'technical',
                      estimatedEffort: gap.estimated_effort || gap.estimatedEffort || 'medium',
                      priority: gap.priority || undefined
                    }))]
                  });
                }}
                templateData={[
                  {
                    control_id: 'AC-3.13',
                    gap_description: 'Multi-factor authentication not implemented',
                    remediation_type: 'technical',
                    estimated_effort: 'medium',
                    priority: 'high'
                  }
                ]}
                templateFilename="compliance-gaps-template"
                acceptedTypes=".csv"
                importOptions={{
                  requiredFields: ['control_id', 'gap_description'],
                  skipEmptyRows: true
                }}
                buttonText="Import Gaps"
                buttonSize="sm"
              />
            </div>

            <div className="space-y-4">
              {bulkRequest.gaps.map((gap, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="border border-gray-200 dark:border-gray-700 rounded-lg p-4"
                >
                  <div className="flex items-center justify-between mb-3">
                    <h4 className="font-medium text-gray-900 dark:text-white">
                      Gap #{index + 1}
                    </h4>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleRemoveGap(index)}
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <Input
                      label="Control ID"
                      value={gap.controlId}
                      onChange={(e) => handleGapChange(index, 'controlId', e.target.value)}
                      placeholder="e.g., AC-3.13"
                      required
                    />
                    
                    <Select
                      label="Remediation Type"
                      value={gap.remediationType}
                      onChange={(e) => handleGapChange(index, 'remediationType', e.target.value)}
                      options={[
                        { value: 'technical', label: 'Technical Implementation' },
                        { value: 'documentation', label: 'Documentation' },
                        { value: 'process', label: 'Process Improvement' },
                        { value: 'training', label: 'Training & Awareness' }
                      ]}
                      required
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                    <Select
                      label="Estimated Effort"
                      value={gap.estimatedEffort}
                      onChange={(e) => handleGapChange(index, 'estimatedEffort', e.target.value)}
                      options={[
                        { value: 'minimal', label: 'Minimal (1-4 hours)' },
                        { value: 'low', label: 'Low (1-2 days)' },
                        { value: 'medium', label: 'Medium (1-2 weeks)' },
                        { value: 'high', label: 'High (2-4 weeks)' },
                        { value: 'significant', label: 'Significant (1+ months)' }
                      ]}
                      required
                    />
                    
                    <Select
                      label="Priority Override"
                      value={gap.priority || 'default'}
                      onChange={(e) => handleGapChange(index, 'priority', e.target.value === 'default' ? undefined : e.target.value)}
                      options={[
                        { value: 'default', label: 'Use Default Priority' },
                        { value: 'critical', label: 'Critical' },
                        { value: 'high', label: 'High' },
                        { value: 'medium', label: 'Medium' },
                        { value: 'low', label: 'Low' }
                      ]}
                    />
                  </div>

                  <Textarea
                    label="Gap Description"
                    value={gap.gapDescription}
                    onChange={(e) => handleGapChange(index, 'gapDescription', e.target.value)}
                    placeholder="Describe the compliance gap and what needs to be addressed..."
                    rows={2}
                    required
                  />
                </motion.div>
              ))}
            </div>

            {bulkRequest.gaps.length === 0 && (
              <div className="text-center py-8 border border-dashed border-gray-300 dark:border-gray-600 rounded-lg">
                <CheckSquare className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <h4 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
                  No gaps added yet
                </h4>
                <p className="text-gray-600 dark:text-gray-400 mb-4">
                  Add compliance gaps to automatically generate remediation tasks
                </p>
                <Button onClick={handleAddGap}>
                  <Plus className="h-4 w-4 mr-2" />
                  Add First Gap
                </Button>
              </div>
            )}
          </div>
        )}

        {step === 3 && (
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
              Review & Create Tasks
            </h3>
            
            <div className="bg-gray-50 dark:bg-gray-900 rounded-lg p-4">
              <h4 className="font-medium text-gray-900 dark:text-white mb-3">
                Task Generation Summary
              </h4>
              
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4">
                <div className="text-center">
                  <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">
                    {bulkRequest.gaps.length}
                  </div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">Tasks to Create</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-green-600 dark:text-green-400">
                    {bulkRequest.gaps.filter(g => g.priority === 'critical' || g.priority === 'high').length}
                  </div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">High Priority</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-purple-600 dark:text-purple-400">
                    {bulkRequest.taskTemplate.autoAssign ? bulkRequest.gaps.length : 0}
                  </div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">Auto-assigned</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-orange-600 dark:text-orange-400">
                    {bulkRequest.taskTemplate.dueDateOffsetDays}
                  </div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">Days to Complete</div>
                </div>
              </div>
            </div>

            <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg">
              <div className="p-4 border-b border-gray-200 dark:border-gray-700">
                <h4 className="font-medium text-gray-900 dark:text-white">
                  Tasks Preview
                </h4>
              </div>
              <div className="max-h-64 overflow-y-auto">
                {bulkRequest.gaps.map((gap, index) => (
                  <div key={index} className="p-4 border-b border-gray-100 dark:border-gray-700 last:border-b-0">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center space-x-2 mb-2">
                          <span className="text-sm font-mono text-blue-600 dark:text-blue-400">
                            {gap.controlId}
                          </span>
                          <span className={`px-2 py-0.5 rounded-full text-xs ${
                            (gap.priority || bulkRequest.taskTemplate.defaultPriority) === 'critical' ? 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300' :
                            (gap.priority || bulkRequest.taskTemplate.defaultPriority) === 'high' ? 'bg-orange-100 text-orange-800 dark:bg-orange-900/30 dark:text-orange-300' :
                            'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300'
                          }`}>
                            {gap.priority || bulkRequest.taskTemplate.defaultPriority}
                          </span>
                        </div>
                        <p className="text-sm text-gray-900 dark:text-white">
                          {gap.gapDescription}
                        </p>
                        <div className="flex items-center space-x-3 mt-2 text-xs text-gray-500 dark:text-gray-400">
                          <span>Type: {gap.remediationType}</span>
                          <span>Effort: {gap.estimatedEffort}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </motion.div>

      {/* Navigation */}
      <div className="flex justify-between pt-6">
        <div>
          {step > 1 && (
            <Button variant="outline" onClick={() => setStep(step - 1)}>
              Previous
            </Button>
          )}
        </div>
        
        <div className="flex space-x-3">
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>
          
          {step < 3 ? (
            <Button 
              onClick={() => setStep(step + 1)}
              disabled={!validateStep(step)}
            >
              Next
            </Button>
          ) : (
            <Button 
              onClick={handleCreateTasks}
              disabled={!validateStep(step) || loading}
              loading={loading}
            >
              Create {bulkRequest.gaps.length} Tasks
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};

export default BulkTaskCreator;