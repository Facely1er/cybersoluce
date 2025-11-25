import React, { useState } from 'react';
import { ArrowLeft, Filter, Download, ExternalLink } from 'lucide-react';
import { Button } from '../ui/button';

export type RecommendationItem = {
  id: string;
  title: string;
  description: string;
  priority: 'critical' | 'high' | 'medium' | 'low';
  category: string;
  effort: 'minimal' | 'moderate' | 'significant' | 'major';
  timeframe: 'immediate' | 'short-term' | 'medium-term' | 'long-term';
  impact: string;
  steps: string[];
  references?: { title: string; url: string }[];
};

interface RecommendationsProps {
  title: string;
  subtitle: string;
  assessmentType: string;
  recommendations: RecommendationItem[];
  onBack: () => void;
  onExport: () => void;
}

const Recommendations: React.FC<RecommendationsProps> = ({
  title,
  subtitle,
  assessmentType,
  recommendations,
  onBack,
  onExport
}) => {
  const [filter, setFilter] = useState<'all' | 'critical' | 'high' | 'medium' | 'low'>('all');
  const [showFilters, setShowFilters] = useState(false);

  const filteredRecommendations = recommendations.filter(
    rec => filter === 'all' || rec.priority === filter
  );

  const priorityColorMap = {
    critical: 'text-red-600 bg-red-100 dark:bg-red-950 dark:text-red-300',
    high: 'text-orange-600 bg-orange-100 dark:bg-orange-950 dark:text-orange-300',
    medium: 'text-yellow-600 bg-yellow-100 dark:bg-yellow-950 dark:text-yellow-300',
    low: 'text-green-600 bg-green-100 dark:bg-green-950 dark:text-green-300',
  };

  const effortMap = {
    minimal: 'Low effort (hours)',
    moderate: 'Moderate effort (days)',
    significant: 'Significant effort (weeks)',
    major: 'Major effort (months)'
  };

  const timeframeMap = {
    immediate: 'Immediate (within days)',
    'short-term': 'Short-term (within weeks)',
    'medium-term': 'Medium-term (within months)',
    'long-term': 'Long-term (6+ months)'
  };

  return (
    <div className="max-w-7xl mx-auto">
      <Button
        variant="outline"
        className="mb-6 flex items-center gap-2"
        onClick={onBack}
      >
        <ArrowLeft className="h-4 w-4" />
        Back to Results
      </Button>

      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
        <div>
          <h1 className="text-3xl font-bold text-foreground">{title}</h1>
          <p className="text-muted-foreground">{subtitle}</p>
        </div>

        <div className="flex gap-2 mt-4 md:mt-0">
          <Button
            variant="outline"
            className="flex items-center gap-2"
            onClick={() => setShowFilters(!showFilters)}
          >
            <Filter className="h-4 w-4" />
            Filter
          </Button>
          <Button
            className="flex items-center gap-2"
            onClick={onExport}
          >
            <Download className="h-4 w-4" />
            Export PDF
          </Button>
        </div>
      </div>

      {showFilters && (
        <div className="mb-6 p-4 bg-muted rounded-lg">
          <h3 className="text-sm font-medium mb-2">Filter by Priority</h3>
          <div className="flex flex-wrap gap-2">
            <Button
              size="sm"
              variant={filter === 'all' ? 'default' : 'outline'}
              onClick={() => setFilter('all')}
            >
              All
            </Button>
            <Button
              size="sm"
              variant={filter === 'critical' ? 'default' : 'outline'}
              onClick={() => setFilter('critical')}
              className="border-red-300"
            >
              Critical
            </Button>
            <Button
              size="sm"
              variant={filter === 'high' ? 'default' : 'outline'}
              onClick={() => setFilter('high')}
              className="border-orange-300"
            >
              High
            </Button>
            <Button
              size="sm"
              variant={filter === 'medium' ? 'default' : 'outline'}
              onClick={() => setFilter('medium')}
              className="border-yellow-300"
            >
              Medium
            </Button>
            <Button
              size="sm"
              variant={filter === 'low' ? 'default' : 'outline'}
              onClick={() => setFilter('low')}
              className="border-green-300"
            >
              Low
            </Button>
          </div>
        </div>
      )}

      <div className="space-y-8">
        {filteredRecommendations.map((recommendation) => (
          <div key={recommendation.id} className="border rounded-lg overflow-hidden bg-card">
            <div className="p-6 border-b">
              <div className="flex justify-between items-start">
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${priorityColorMap[recommendation.priority]}`}>
                      {recommendation.priority.charAt(0).toUpperCase() + recommendation.priority.slice(1)} Priority
                    </span>
                    <span className="px-2 py-1 bg-muted rounded-full text-xs font-medium text-muted-foreground">
                      {recommendation.category}
                    </span>
                  </div>
                  <h3 className="text-xl font-bold text-foreground mb-2">{recommendation.title}</h3>
                  <p className="text-muted-foreground mb-4">{recommendation.description}</p>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                    <div>
                      <span className="font-medium text-foreground">Implementation Effort:</span>{' '}
                      <span className="text-muted-foreground">{effortMap[recommendation.effort]}</span>
                    </div>
                    <div>
                      <span className="font-medium text-foreground">Recommended Timeframe:</span>{' '}
                      <span className="text-muted-foreground">{timeframeMap[recommendation.timeframe]}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="p-6 border-b bg-muted/30">
              <h4 className="font-medium text-foreground mb-2">Expected Impact</h4>
              <p className="text-muted-foreground mb-0">{recommendation.impact}</p>
            </div>
            
            <div className="p-6 border-b">
              <h4 className="font-medium text-foreground mb-3">Implementation Steps</h4>
              <ol className="list-decimal pl-5 space-y-2">
                {recommendation.steps.map((step, index) => (
                  <li key={index} className="text-muted-foreground">{step}</li>
                ))}
              </ol>
            </div>
            
            {recommendation.references && recommendation.references.length > 0 && (
              <div className="p-6 bg-muted/20">
                <h4 className="font-medium text-foreground mb-3">References & Resources</h4>
                <ul className="space-y-2">
                  {recommendation.references.map((reference, index) => (
                    <li key={index} className="flex items-center gap-2">
                      <ExternalLink className="h-4 w-4 text-blue-500" />
                      <a 
                        href={reference.url} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="text-blue-500 hover:underline"
                      >
                        {reference.title}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Recommendations;