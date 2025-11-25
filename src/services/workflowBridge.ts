/**
 * Workflow Bridge Service
 * Connects assessment results (ERMITS Auditor) to implementation features (NIST Implementator)
 */

import { AssessmentData } from '../shared/types';
import { Framework } from '../types/ermits';
import { Task } from '../features/nist/tasks/types';

export interface GapToTaskMapping {
  gapId: string;
  questionId: string;
  sectionId: string;
  categoryId: string;
  severity: 'critical' | 'high' | 'medium' | 'low';
  taskTitle: string;
  taskDescription: string;
  priority: 'critical' | 'high' | 'medium' | 'low';
  estimatedHours: number;
  relatedControlId?: string;
  nistFunction?: string;
  nistCategory?: string;
}

export interface AssessmentToImplementationFlow {
  assessmentId: string;
  assessmentName: string;
  frameworkId: string;
  gaps: GapToTaskMapping[];
  totalGaps: number;
  criticalGaps: number;
  highGaps: number;
  canCreateTasks: boolean;
  canCreateControls: boolean;
  canLinkEvidence: boolean;
}

export class WorkflowBridgeService {
  private static instance: WorkflowBridgeService;

  static getInstance(): WorkflowBridgeService {
    if (!WorkflowBridgeService.instance) {
      WorkflowBridgeService.instance = new WorkflowBridgeService();
    }
    return WorkflowBridgeService.instance;
  }

  /**
   * Analyze assessment and create workflow mapping for implementation
   */
  analyzeAssessmentForImplementation(
    assessment: AssessmentData,
    framework: Framework
  ): AssessmentToImplementationFlow {
    const gaps: GapToTaskMapping[] = [];
    let criticalGaps = 0;
    let highGaps = 0;

    // Analyze each section and category for gaps
    framework.sections.forEach(section => {
      section.categories?.forEach(category => {
        category.questions?.forEach(question => {
          const response = assessment.responses[question.id];
          
          // Identify gaps (response <= 1 indicates non-compliance or partial compliance)
          if (response === undefined || response <= 1) {
            const severity = this.determineSeverity(response, question.priority);
            if (severity === 'critical') criticalGaps++;
            if (severity === 'high') highGaps++;

            const gap: GapToTaskMapping = {
              gapId: `${assessment.id}-${question.id}`,
              questionId: question.id,
              sectionId: section.id,
              categoryId: category.id,
              severity,
              taskTitle: this.generateTaskTitle(question.text, section.name, category.name),
              taskDescription: this.generateTaskDescription(question, section, category, response),
              priority: severity,
              estimatedHours: this.estimateHours(severity, question.priority),
              relatedControlId: question.id,
              nistFunction: this.mapToNistFunction(section.id, section.name),
              nistCategory: category.id
            };

            gaps.push(gap);
          }
        });
      });
    });

    return {
      assessmentId: assessment.id,
      assessmentName: assessment.frameworkName || 'Assessment',
      frameworkId: assessment.frameworkId,
      gaps,
      totalGaps: gaps.length,
      criticalGaps,
      highGaps,
      canCreateTasks: gaps.length > 0,
      canCreateControls: gaps.length > 0,
      canLinkEvidence: Object.keys(assessment.questionEvidence || {}).length > 0
    };
  }

  /**
   * Generate tasks from assessment gaps
   */
  generateTasksFromGaps(
    flow: AssessmentToImplementationFlow,
    assignedTo: string[],
    assignedBy: string
  ): Array<Omit<Task, 'id' | 'createdAt' | 'updatedAt'>> {
    return flow.gaps.map(gap => {
      // Calculate due date based on priority (critical = 1 week, high = 2 weeks, etc.)
      const daysUntilDue = gap.priority === 'critical' ? 7 : 
                          gap.priority === 'high' ? 14 : 
                          gap.priority === 'medium' ? 30 : 60;
      
      return {
        title: gap.taskTitle,
        description: gap.taskDescription,
        type: 'remediation' as const,
        priority: gap.priority,
        status: 'not-started' as const,
        nistFunction: (gap.nistFunction || 'Identify') as 'Govern' | 'Identify' | 'Protect' | 'Detect' | 'Respond' | 'Recover',
        nistCategory: gap.nistCategory || gap.categoryId,
        nistSubcategory: gap.questionId,
        relatedControlId: gap.relatedControlId || gap.questionId,
        estimatedHours: gap.estimatedHours,
        assignedTo,
        assignedBy,
        dueDate: new Date(Date.now() + daysUntilDue * 24 * 60 * 60 * 1000),
        progress: 0,
        dependencies: [],
        subtasks: [],
        attachments: [],
        comments: [],
        evidence: [],
        approvalRequired: false,
        tags: ['assessment-gap', 'auto-generated', gap.severity, flow.frameworkId],
        metadata: {
          businessImpact: (gap.severity === 'critical' ? 'high' : gap.severity === 'high' ? 'medium' : 'low') as 'low' | 'medium' | 'high' | 'critical',
          technicalComplexity: 'medium' as const,
          riskReduction: gap.severity === 'critical' ? 30 : gap.severity === 'high' ? 20 : 10,
          complianceImpact: [flow.frameworkId],
          successCriteria: [
            'Gap remediated',
            'Evidence collected',
            'Control implemented',
            'Assessment updated'
          ]
        }
      };
    });
  }

  /**
   * Generate controls from assessment gaps
   */
  generateControlsFromGaps(
    flow: AssessmentToImplementationFlow
  ): Array<{
    controlId: string;
    name: string;
    description: string;
    framework: string;
    category: string;
    priority: 'critical' | 'high' | 'medium' | 'low';
    status: 'not-implemented' | 'in-progress' | 'implemented' | 'verified';
    relatedGapId: string;
    relatedQuestionId: string;
  }> {
    return flow.gaps.map(gap => ({
      controlId: `control-${gap.gapId}`,
      name: `Control for ${gap.taskTitle}`,
      description: gap.taskDescription,
      framework: flow.frameworkId,
      category: gap.nistCategory || gap.categoryId,
      priority: gap.priority,
      status: 'not-implemented' as const,
      relatedGapId: gap.gapId,
      relatedQuestionId: gap.questionId
    }));
  }

  /**
   * Link assessment evidence to evidence collection
   */
  extractEvidenceFromAssessment(assessment: AssessmentData): Array<{
    evidenceId: string;
    title: string;
    description: string;
    type: string;
    source: string;
    relatedQuestionId: string;
    relatedControlId?: string;
    uploadedAt: Date;
    metadata: Record<string, unknown>;
  }> {
    const evidenceList: Array<{
      evidenceId: string;
      title: string;
      description: string;
      type: string;
      source: string;
      relatedQuestionId: string;
      relatedControlId?: string;
      uploadedAt: Date;
      metadata: Record<string, unknown>;
    }> = [];

    // Extract from questionEvidence
    // Note: questionEvidence contains references to evidence, not the evidence itself
    // We'll create evidence entries based on the question evidence references
    if (assessment.questionEvidence) {
      Object.entries(assessment.questionEvidence).forEach(([questionId, evidenceRefs]) => {
        evidenceRefs.forEach((evidenceRef, index) => {
          // Find the actual evidence in evidenceLibrary if it exists
          const actualEvidence = assessment.evidenceLibrary?.find(
            ev => ev.id === evidenceRef.evidenceId
          );
          
          evidenceList.push({
            evidenceId: `${assessment.id}-${questionId}-${index}`,
            title: actualEvidence?.name || `Evidence for Question ${questionId}`,
            description: actualEvidence?.description || evidenceRef.notes || '',
            type: actualEvidence?.type || 'document',
            source: 'assessment',
            relatedQuestionId: questionId,
            relatedControlId: questionId,
            uploadedAt: actualEvidence?.uploadedAt || evidenceRef.linkedAt || new Date(),
            metadata: {
              assessmentId: assessment.id,
              questionId,
              evidenceId: evidenceRef.evidenceId,
              relevance: evidenceRef.relevance,
              confidence: evidenceRef.confidence,
              linkedBy: evidenceRef.linkedBy,
              ...actualEvidence?.metadata
            }
          });
        });
      });
    }

    // Extract from evidenceLibrary (only items not already linked via questionEvidence)
    if (assessment.evidenceLibrary) {
      const linkedEvidenceIds = new Set<string>();
      if (assessment.questionEvidence) {
        Object.values(assessment.questionEvidence).forEach(evidenceRefs => {
          evidenceRefs.forEach(ref => linkedEvidenceIds.add(ref.evidenceId));
        });
      }
      
      assessment.evidenceLibrary.forEach((evidence, index) => {
        // Skip if already included via questionEvidence
        if (linkedEvidenceIds.has(evidence.id)) return;
        
        evidenceList.push({
          evidenceId: `${assessment.id}-library-${index}`,
          title: evidence.name || 'Evidence Item',
          description: evidence.description || '',
          type: evidence.type || 'document',
          source: 'assessment-library',
          relatedQuestionId: evidence.linkedQuestions?.[0] || '',
          relatedControlId: evidence.linkedQuestions?.[0],
          uploadedAt: evidence.uploadedAt || new Date(),
          metadata: {
            assessmentId: assessment.id,
            evidenceId: evidence.id,
            status: evidence.status,
            confidentialityLevel: evidence.confidentialityLevel,
            ...evidence.metadata
          }
        });
      });
    }

    return evidenceList;
  }

  private determineSeverity(
    response: number | undefined,
    questionPriority?: string
  ): 'critical' | 'high' | 'medium' | 'low' {
    if (response === undefined) {
      return questionPriority === 'high' ? 'critical' : 
             questionPriority === 'medium' ? 'high' : 'medium';
    }
    
    if (response === 0) return 'critical';
    if (response === 1) return 'high';
    return 'medium';
  }

  private generateTaskTitle(questionText: string, sectionName: string, categoryName: string): string {
    const shortQuestion = questionText.length > 60 
      ? questionText.substring(0, 60) + '...' 
      : questionText;
    return `Implement: ${sectionName} - ${categoryName} - ${shortQuestion}`;
  }

  private generateTaskDescription(
    question: { text: string; guidance?: string },
    section: { name: string; description?: string },
    category: { name: string; description?: string },
    currentResponse?: number
  ): string {
    let description = `Remediate gap identified in assessment.\n\n`;
    description += `Section: ${section.name}\n`;
    if (section.description) description += `${section.description}\n\n`;
    description += `Category: ${category.name}\n`;
    if (category.description) description += `${category.description}\n\n`;
    description += `Question: ${question.text}\n\n`;
    if (question.guidance) description += `Guidance: ${question.guidance}\n\n`;
    if (currentResponse !== undefined) {
      description += `Current Status: ${currentResponse === 0 ? 'Not Implemented' : 'Partially Implemented'}\n`;
      description += `Target Status: Fully Implemented\n`;
    }
    return description;
  }

  private estimateHours(severity: string, priority?: 'high' | 'medium' | 'low'): number {
    const baseHours: Record<string, number> = {
      critical: 16,
      high: 8,
      medium: 4,
      low: 2
    };

    const priorityMultiplier: Record<string, number> = {
      high: 2,
      medium: 1.5,
      low: 1
    };

    const base = baseHours[severity] || 4;
    const multiplier = priorityMultiplier[priority || 'medium'] || 1;
    
    return Math.round(base * multiplier);
  }

  private mapToNistFunction(sectionId: string, sectionName: string): string {
    const lowerId = sectionId.toLowerCase();
    const lowerName = sectionName.toLowerCase();

    if (lowerId.includes('govern') || lowerName.includes('govern')) return 'Govern';
    if (lowerId.includes('identify') || lowerName.includes('identify')) return 'Identify';
    if (lowerId.includes('protect') || lowerName.includes('protect')) return 'Protect';
    if (lowerId.includes('detect') || lowerName.includes('detect')) return 'Detect';
    if (lowerId.includes('respond') || lowerName.includes('respond')) return 'Respond';
    if (lowerId.includes('recover') || lowerName.includes('recover')) return 'Recover';

    // Try to infer from common patterns
    if (lowerId.includes('risk') || lowerName.includes('risk')) return 'Identify';
    if (lowerId.includes('access') || lowerName.includes('access')) return 'Protect';
    if (lowerId.includes('monitor') || lowerName.includes('monitor')) return 'Detect';
    if (lowerId.includes('incident') || lowerName.includes('incident')) return 'Respond';
    if (lowerId.includes('backup') || lowerName.includes('backup')) return 'Recover';

    return 'Identify'; // Default fallback
  }
}

export const workflowBridge = WorkflowBridgeService.getInstance();

