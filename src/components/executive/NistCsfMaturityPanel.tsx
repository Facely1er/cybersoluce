import React, { useMemo } from 'react';
import { useGovernanceStore } from '../../stores/governanceStore';
import { Card } from '../ui/card';
import { Progress } from '../ui/progress';
import { Badge } from '../ui/badge';
import { Shield, Eye, Lock, AlertCircle, RotateCcw } from 'lucide-react';

interface FunctionScore {
  functionId: string;
  label: string;
  score: number;
  icon: React.ReactNode;
}

const NistCsfMaturityPanel: React.FC = () => {
  const { controls, categories } = useGovernanceStore();

  // Filter NIST CSF controls
  const nistControls = useMemo(() =>
    controls.filter((ctrl) => ctrl.frameworkId === "nist-csf-2"),
    [controls]
  );

  // Calculate scores per NIST CSF function
  const functionScores: FunctionScore[] = useMemo(() => {
    const functions = [
      { id: 'govern', label: 'Govern', icon: <Shield className="h-5 w-5" /> },
      { id: 'identify', label: 'Identify', icon: <Eye className="h-5 w-5" /> },
      { id: 'protect', label: 'Protect', icon: <Lock className="h-5 w-5" /> },
      { id: 'detect', label: 'Detect', icon: <AlertCircle className="h-5 w-5" /> },
      { id: 'respond', label: 'Respond', icon: <RotateCcw className="h-5 w-5" /> },
      { id: 'recover', label: 'Recover', icon: <RotateCcw className="h-5 w-5" /> },
    ];

    return functions.map((func) => {
      // Find categories for this function
      const functionCategories = categories.filter(
        (cat) => cat.frameworkId === "nist-csf-2" && cat.id.includes(`nist-${func.id}-`)
      );

      // Get controls for these categories
      const functionControls = nistControls.filter((ctrl) =>
        functionCategories.some((cat) => cat.id === ctrl.categoryId)
      );

      if (functionControls.length === 0) {
        return { ...func, score: 0 };
      }

      // Calculate average maturity level (1-5 scale, convert to 0-100)
      const avgMaturity = functionControls.reduce((sum, ctrl) => sum + ctrl.maturityLevel, 0) / functionControls.length;
      const score = Math.round((avgMaturity / 5) * 100);

      return { ...func, score };
    });
  }, [nistControls, categories]);

  const overallScore = useMemo(() => {
    if (functionScores.length === 0) return 0;
    const sum = functionScores.reduce((acc, func) => acc + func.score, 0);
    return Math.round(sum / functionScores.length);
  }, [functionScores]);

  const getScoreColor = (score: number) => {
    if (score >= 75) return 'text-green-600 dark:text-green-400';
    if (score >= 50) return 'text-yellow-600 dark:text-yellow-400';
    if (score >= 25) return 'text-orange-600 dark:text-orange-400';
    return 'text-red-600 dark:text-red-400';
  };

  const getScoreBadgeColor = (score: number) => {
    if (score >= 75) return 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300';
    if (score >= 50) return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300';
    if (score >= 25) return 'bg-orange-100 text-orange-800 dark:bg-orange-900/30 dark:text-orange-300';
    return 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300';
  };

  if (nistControls.length === 0) {
    return (
      <Card className="p-6">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
          NIST CSF v2 Maturity
        </h3>
        <p className="text-sm text-gray-600 dark:text-gray-400">
          Complete a NIST CSF assessment to view maturity scores.
        </p>
      </Card>
    );
  }

  return (
    <Card className="p-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
          NIST CSF v2 Maturity
        </h3>
        <Badge className={getScoreBadgeColor(overallScore)}>
          {overallScore}% Overall
        </Badge>
      </div>

      <div className="space-y-4">
        {functionScores.map((func) => (
          <div key={func.functionId}>
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center space-x-2">
                <div className="text-gray-600 dark:text-gray-400">
                  {func.icon}
                </div>
                <span className="text-sm font-medium text-gray-900 dark:text-white">
                  {func.label}
                </span>
              </div>
              <span className={`text-sm font-semibold ${getScoreColor(func.score)}`}>
                {func.score}%
              </span>
            </div>
            <Progress 
              value={func.score} 
              color={func.score >= 75 ? 'success' : func.score >= 50 ? 'warning' : 'danger'}
              size="sm"
            />
          </div>
        ))}
      </div>

      <div className="mt-6 pt-4 border-t border-gray-200 dark:border-gray-700">
        <a
          href="/assessments/nist-csf"
          className="text-sm text-blue-600 dark:text-blue-400 hover:underline"
        >
          Run NIST CSF Assessment →
        </a>
      </div>
    </Card>
  );
};

export default NistCsfMaturityPanel;

