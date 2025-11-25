import type { RecommendationItem } from '../components/assessment/Recommendations';
import { AssessmentData } from '../shared/types/assessment';

// Add missing jsPDF import
import { jsPDF } from 'jspdf';
import 'jspdf-autotable';

declare module 'jspdf' {
  interface jsPDF {
    autoTable: (options: any) => jsPDF;
  }
}

export interface SectionScore {
  title: string;
  percentage: number;
  completed: boolean;
}

export const generateRecommendationsPdf = (
  title: string,
  recommendations: RecommendationItem[],
  date: string,
  filename: string
) => {
  // Create a new PDF document
  const doc = new jsPDF({
    orientation: 'portrait',
    unit: 'mm',
    format: 'a4'
  });

  // Add title
  doc.setFontSize(20);
  doc.text(title, 15, 20);
  
  // Add date
  doc.setFontSize(10);
  doc.text(`Generated on: ${date}`, 15, 30);
  
  // Add introduction
  doc.setFontSize(12);
  doc.text('This document contains security recommendations based on your assessment.', 15, 40);
  
  // Move down
  let yPos = 50;
  
  // Add recommendations
  recommendations.forEach((recommendation, index) => {
    // Check if we need a new page
    if (yPos > 240) {
      doc.addPage();
      yPos = 20;
    }
    
    // Add recommendation title with priority
    doc.setFontSize(14);
    doc.setFont('helvetica', 'bold');
    doc.text(`${index + 1}. ${recommendation.title} (${recommendation.priority.toUpperCase()})`, 15, yPos);
    yPos += 8;
    
    // Add description
    doc.setFontSize(10);
    doc.setFont('helvetica', 'normal');
    
    // Split text to avoid overflow
    const descriptionLines = doc.splitTextToSize(recommendation.description, 180);
    doc.text(descriptionLines, 15, yPos);
    yPos += descriptionLines.length * 5 + 5;
    
    // Add category, effort and timeframe
    doc.setFont('helvetica', 'bold');
    doc.text('Category:', 15, yPos);
    doc.setFont('helvetica', 'normal');
    doc.text(recommendation.category, 40, yPos);
    yPos += 5;
    
    doc.setFont('helvetica', 'bold');
    doc.text('Effort:', 15, yPos);
    doc.setFont('helvetica', 'normal');
    doc.text(recommendation.effort, 40, yPos);
    yPos += 5;
    
    doc.setFont('helvetica', 'bold');
    doc.text('Timeframe:', 15, yPos);
    doc.setFont('helvetica', 'normal');
    doc.text(recommendation.timeframe, 40, yPos);
    yPos += 10;
    
    // Add implementation steps
    if (recommendation.steps && recommendation.steps.length > 0) {
      doc.setFont('helvetica', 'bold');
      doc.text('Implementation Steps:', 15, yPos);
      yPos += 6;
      
      doc.setFont('helvetica', 'normal');
      recommendation.steps.forEach((step, i) => {
        // Check if we need a new page
        if (yPos > 270) {
          doc.addPage();
          yPos = 20;
        }
        
        const stepLines = doc.splitTextToSize(`${i + 1}. ${step}`, 170);
        doc.text(stepLines, 20, yPos);
        yPos += stepLines.length * 5 + 2;
      });
    }
    
    yPos += 10;
  });
  
  // Save the PDF
  doc.save(filename);
};

export const generateResultsPdf = (
  title: string,
  overallScore: number,
  sectionScores: SectionScore[],
  completionDate: string,
  filename: string
) => {
  // Create a new PDF document
  const doc = new jsPDF({
    orientation: 'portrait',
    unit: 'mm',
    format: 'a4'
  });

  // Add title
  doc.setFontSize(20);
  doc.text(title, 15, 20);
  
  // Add completion date
  doc.setFontSize(10);
  doc.text(`Completed on: ${completionDate}`, 15, 30);
  
  // Add overall score
  doc.setFontSize(16);
  doc.setFont('helvetica', 'bold');
  doc.text(`Overall Score: ${overallScore}%`, 15, 45);
  
  // Add section breakdown
  doc.setFontSize(14);
  doc.text('Section Breakdown:', 15, 60);
  
  let yPos = 70;
  
  // Add section scores
  sectionScores.forEach((section, index) => {
    // Check if we need a new page
    if (yPos > 250) {
      doc.addPage();
      yPos = 20;
    }
    
    doc.setFontSize(12);
    doc.setFont('helvetica', 'bold');
    doc.text(`${index + 1}. ${section.title}`, 15, yPos);
    
    doc.setFont('helvetica', 'normal');
    doc.text(`Score: ${section.percentage}%`, 15, yPos + 6);
    doc.text(`Status: ${section.completed ? 'Completed' : 'In Progress'}`, 15, yPos + 12);
    
    yPos += 20;
  });
  
  // Add summary section
  if (yPos > 220) {
    doc.addPage();
    yPos = 20;
  }
  
  doc.setFontSize(14);
  doc.setFont('helvetica', 'bold');
  doc.text('Summary', 15, yPos + 10);
  
  doc.setFontSize(10);
  doc.setFont('helvetica', 'normal');
  const summaryText = `This assessment report provides a comprehensive overview of your security posture. The overall score of ${overallScore}% reflects your current security maturity level across all assessed domains.`;
  const summaryLines = doc.splitTextToSize(summaryText, 180);
  doc.text(summaryLines, 15, yPos + 20);
  
  // Save the PDF
  doc.save(filename);
};

export const generateAssessmentPdf = (assessment: AssessmentData, framework?: any) => {
  const doc = new jsPDF({
    orientation: 'portrait',
    unit: 'mm',
    format: 'a4'
  });

  let yPos = 20;
  const pageWidth = doc.internal.pageSize.getWidth();
  const margin = 15;
  const contentWidth = pageWidth - (margin * 2);

  // Helper function to add a new page if needed
  const checkPageBreak = (requiredSpace: number = 10) => {
    if (yPos + requiredSpace > 270) {
      doc.addPage();
      yPos = 20;
      return true;
    }
    return false;
  };

  // Header
  doc.setFontSize(20);
  doc.setFont('helvetica', 'bold');
  doc.text('Compliance Assessment Report', margin, yPos);
  yPos += 10;

  // Assessment Info
  doc.setFontSize(12);
  doc.setFont('helvetica', 'normal');
  doc.text(`Framework: ${assessment.frameworkName || assessment.frameworkId}`, margin, yPos);
  yPos += 6;
  doc.text(`Assessment ID: ${assessment.id}`, margin, yPos);
  yPos += 6;
  doc.text(`Created: ${new Date(assessment.createdAt).toLocaleDateString()}`, margin, yPos);
  yPos += 6;
  doc.text(`Last Modified: ${new Date(assessment.lastModified).toLocaleDateString()}`, margin, yPos);
  yPos += 6;
  doc.text(`Status: ${assessment.isComplete ? 'Complete' : 'In Progress'}`, margin, yPos);
  yPos += 10;

  // Organization Info
  if (assessment.organizationInfo) {
    checkPageBreak(20);
    doc.setFontSize(14);
    doc.setFont('helvetica', 'bold');
    doc.text('Organization Information', margin, yPos);
    yPos += 8;
    
    doc.setFontSize(10);
    doc.setFont('helvetica', 'normal');
    doc.text(`Name: ${assessment.organizationInfo.name}`, margin, yPos);
    yPos += 5;
    doc.text(`Industry: ${assessment.organizationInfo.industry}`, margin, yPos);
    yPos += 5;
    doc.text(`Size: ${assessment.organizationInfo.size}`, margin, yPos);
    yPos += 5;
    if (assessment.organizationInfo.location) {
      doc.text(`Location: ${assessment.organizationInfo.location}`, margin, yPos);
      yPos += 5;
    }
    if (assessment.organizationInfo.assessor) {
      doc.text(`Assessor: ${assessment.organizationInfo.assessor}`, margin, yPos);
      yPos += 5;
    }
    yPos += 5;
  }

  // Assessment Summary
  checkPageBreak(15);
  doc.setFontSize(14);
  doc.setFont('helvetica', 'bold');
  doc.text('Assessment Summary', margin, yPos);
  yPos += 8;

  const totalQuestions = Object.keys(assessment.responses || {}).length;
  const answeredQuestions = Object.values(assessment.responses || {}).filter(r => r !== null && r !== undefined).length;
  const completionRate = totalQuestions > 0 ? Math.round((answeredQuestions / totalQuestions) * 100) : 0;

  doc.setFontSize(10);
  doc.setFont('helvetica', 'normal');
  doc.text(`Total Questions: ${totalQuestions}`, margin, yPos);
  yPos += 5;
  doc.text(`Answered: ${answeredQuestions}`, margin, yPos);
  yPos += 5;
  doc.text(`Completion Rate: ${completionRate}%`, margin, yPos);
  yPos += 5;
  
  if (assessment.riskRating) {
    doc.text(`Risk Rating: ${assessment.riskRating.toUpperCase()}`, margin, yPos);
    yPos += 5;
  }
  if (assessment.businessImpact) {
    doc.text(`Business Impact: ${assessment.businessImpact.toUpperCase()}`, margin, yPos);
    yPos += 5;
  }
  yPos += 5;

  // Responses Table
  if (Object.keys(assessment.responses || {}).length > 0) {
    checkPageBreak(30);
    doc.setFontSize(14);
    doc.setFont('helvetica', 'bold');
    doc.text('Assessment Responses', margin, yPos);
    yPos += 8;

    // Prepare table data
    const tableData: any[][] = [];
    Object.entries(assessment.responses || {}).forEach(([questionId, response]) => {
      const responseText = response === 0 ? 'Not Implemented' :
                          response === 1 ? 'Partially Implemented' :
                          response === 2 ? 'Mostly Implemented' :
                          response === 3 ? 'Fully Implemented' : 'Not Answered';
      
      const note = assessment.questionNotes?.[questionId] || '';
      tableData.push([
        questionId.length > 30 ? questionId.substring(0, 30) + '...' : questionId,
        responseText,
        note.length > 40 ? note.substring(0, 40) + '...' : note
      ]);
    });

    // Add table using autoTable
    (doc as any).autoTable({
      startY: yPos,
      head: [['Question ID', 'Response', 'Notes']],
      body: tableData,
      theme: 'striped',
      headStyles: { fillColor: [66, 139, 202], textColor: 255, fontStyle: 'bold' },
      styles: { fontSize: 8, cellPadding: 2 },
      columnStyles: {
        0: { cellWidth: 50 },
        1: { cellWidth: 50 },
        2: { cellWidth: 80 }
      },
      margin: { left: margin, right: margin },
      didDrawPage: (data: any) => {
        yPos = data.cursor.y + 5;
      }
    });

    yPos = (doc as any).lastAutoTable.finalY + 10;
  }

  // Notes Section
  if (assessment.notes) {
    checkPageBreak(20);
    doc.setFontSize(14);
    doc.setFont('helvetica', 'bold');
    doc.text('General Notes', margin, yPos);
    yPos += 8;

    doc.setFontSize(10);
    doc.setFont('helvetica', 'normal');
    const notesLines = doc.splitTextToSize(assessment.notes, contentWidth);
    doc.text(notesLines, margin, yPos);
    yPos += notesLines.length * 5 + 5;
  }

  // Evidence Links
  if (assessment.questionEvidence && Object.keys(assessment.questionEvidence).length > 0) {
    checkPageBreak(20);
    doc.setFontSize(14);
    doc.setFont('helvetica', 'bold');
    doc.text('Evidence Attachments', margin, yPos);
    yPos += 8;

    doc.setFontSize(10);
    doc.setFont('helvetica', 'normal');
    let evidenceCount = 0;
    Object.entries(assessment.questionEvidence).forEach(([questionId, evidenceList]) => {
      if (evidenceList && evidenceList.length > 0) {
        checkPageBreak(10);
        doc.setFont('helvetica', 'bold');
        doc.text(`Question: ${questionId}`, margin, yPos);
        yPos += 5;
        doc.setFont('helvetica', 'normal');
        evidenceList.forEach((evidence) => {
          checkPageBreak(5);
          doc.text(`  • ${evidence.evidenceId}${evidence.notes ? ` - ${evidence.notes}` : ''}`, margin + 5, yPos);
          yPos += 5;
          evidenceCount++;
        });
        yPos += 2;
      }
    });
    if (evidenceCount === 0) {
      doc.text('No evidence attached', margin, yPos);
      yPos += 5;
    }
  }

  // Compliance Requirements
  if (assessment.complianceRequirements && assessment.complianceRequirements.length > 0) {
    checkPageBreak(15);
    doc.setFontSize(14);
    doc.setFont('helvetica', 'bold');
    doc.text('Compliance Requirements', margin, yPos);
    yPos += 8;

    doc.setFontSize(10);
    doc.setFont('helvetica', 'normal');
    assessment.complianceRequirements.forEach((req) => {
      checkPageBreak(5);
      doc.text(`• ${req}`, margin, yPos);
      yPos += 5;
    });
  }

  // Footer on each page
  const pageCount = doc.getNumberOfPages();
  for (let i = 1; i <= pageCount; i++) {
    doc.setPage(i);
    doc.setFontSize(8);
    doc.setFont('helvetica', 'italic');
    doc.text(
      `Page ${i} of ${pageCount} - Generated by CyberSoluce Platform`,
      pageWidth / 2,
      doc.internal.pageSize.getHeight() - 10,
      { align: 'center' }
    );
  }

  // Save the PDF
  const filename = `assessment-${assessment.id}-${new Date().toISOString().split('T')[0]}.pdf`;
  doc.save(filename);
  
  return filename;
};