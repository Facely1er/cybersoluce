import React from 'react';
import { motion } from 'framer-motion';
import { X } from 'lucide-react';
import AssessmentWizard from '../assessment/AssessmentWizard';

interface AssessmentModalProps {
  onClose: () => void;
  data?: {
    domain?: string;
    userTier?: 'free' | 'professional' | 'enterprise' | 'anonymous';
    freeAssessmentsUsed?: Record<string, boolean>;
  };
}

const AssessmentModal: React.FC<AssessmentModalProps> = ({ 
  onClose,
  data = {}
}) => {
  const handleComplete = (config: any) => {
    console.log('Assessment completed:', config);
    onClose();
    // Here you would typically save the assessment and redirect
  };
  
  const handleUpgradeRequired = () => {
    // Close this modal and open the upgrade modal instead
    onClose();
    // Here you would typically open the upgrade modal
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4 overflow-y-auto">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.9 }}
        className="bg-white dark:bg-gray-800 rounded-xl shadow-xl w-full max-w-5xl max-h-[90vh] overflow-y-auto"
      >
        <div className="flex items-center justify-between p-6 border-b border-gray-200 dark:border-gray-700">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
            Create New Assessment
          </h2>
          <button
            onClick={onClose}
            className="p-1 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
          >
            <X className="h-6 w-6 text-gray-500 dark:text-gray-400" />
          </button>
        </div>
        
        <div className="p-6">
          <AssessmentWizard 
            onComplete={handleComplete}
            onUpgradeRequired={handleUpgradeRequired}
            userTier={data.userTier}
            freeAssessmentsUsed={data.freeAssessmentsUsed}
          />
        </div>
      </motion.div>
    </div>
  );
};

export default AssessmentModal;