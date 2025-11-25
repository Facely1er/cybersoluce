import React from 'react';
import { ArrowRight } from 'lucide-react';
import { Button } from '../ui/button';

export type SectionInfo = {
  title: string;
  description: string;
  estimatedTime: string;
  complexity: 'Basic' | 'Intermediate' | 'Advanced';
  questionCount: number;
};

interface AssessmentStartScreenProps {
  title: string;
  description: string;
  frameworkName: string;
  sections: SectionInfo[];
  onStart: () => void;
}

const AssessmentStartScreen: React.FC<AssessmentStartScreenProps> = ({
  title,
  description,
  frameworkName,
  sections,
  onStart
}) => {
  const totalQuestions = sections.reduce((total, section) => total + section.questionCount, 0);
  const totalEstimatedTime = sections.reduce((total, section) => {
    const timeStr = section.estimatedTime;
    const minutes = parseInt(timeStr.replace('min', ''));
    return total + minutes;
  }, 0);
  
  return (
    <div className="container mx-auto px-4 py-8 max-w-5xl">
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold mb-4 text-foreground">{title}</h1>
        <p className="text-xl text-muted-foreground mb-4">{description}</p>
        <div className="inline-flex items-center justify-center bg-primary/10 rounded-full px-4 py-1 text-primary font-medium">
          Based on {frameworkName}
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-background rounded-lg border p-6 flex flex-col items-center justify-center">
          <div className="text-4xl font-bold text-primary mb-2">{sections.length}</div>
          <div className="text-muted-foreground text-center">Assessment Sections</div>
        </div>
        
        <div className="bg-background rounded-lg border p-6 flex flex-col items-center justify-center">
          <div className="text-4xl font-bold text-primary mb-2">{totalQuestions}</div>
          <div className="text-muted-foreground text-center">Total Questions</div>
        </div>
        
        <div className="bg-background rounded-lg border p-6 flex flex-col items-center justify-center">
          <div className="text-4xl font-bold text-primary mb-2">{totalEstimatedTime}</div>
          <div className="text-muted-foreground text-center">Est. Minutes</div>
        </div>
      </div>
      
      <div className="bg-background border rounded-lg p-6 mb-8">
        <h2 className="text-2xl font-bold mb-4 text-foreground">Assessment Sections</h2>
        <div className="space-y-4">
          {sections.map((section, index) => (
            <div key={index} className="border-b pb-4 last:border-b-0 last:pb-0">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="font-semibold text-foreground">{section.title}</h3>
                  <p className="text-sm text-muted-foreground">{section.description}</p>
                </div>
                <div className="text-right">
                  <div className="text-sm font-medium text-foreground">{section.questionCount} questions</div>
                  <div className="text-sm text-muted-foreground">{section.estimatedTime} • {section.complexity}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      
      <div className="flex justify-center">
        <Button size="lg" onClick={onStart} className="px-8 py-6 h-auto text-lg flex items-center gap-2">
          Start Assessment
          <ArrowRight className="ml-2 h-5 w-5" />
        </Button>
      </div>
    </div>
  );
};

export default AssessmentStartScreen;