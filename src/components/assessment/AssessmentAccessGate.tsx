import React from 'react';
import { Link } from 'react-router-dom';
import { Shield, Lock, TrendingUp } from 'lucide-react';

interface AssessmentAccessGateProps {
  children: React.ReactNode;
  userTier?: 'free' | 'professional' | 'enterprise' | 'anonymous';
  remainingFreeAssessments?: number;
}

const AssessmentAccessGate: React.FC<AssessmentAccessGateProps> = ({
  children,
  userTier = 'free',
  remainingFreeAssessments = 1,
}) => {
  // No authentication gate for now - allow all users access
  
  return <>{children}</>;
};

export default AssessmentAccessGate;