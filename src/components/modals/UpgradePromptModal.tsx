import React from 'react';
import { motion } from 'framer-motion';
import { X, Lock, CheckCircle } from 'lucide-react';
import { Link } from 'react-router-dom';

interface UpgradePromptModalProps {
  onClose: () => void;
  data?: {
    feature?: string;
    domain?: string;
  };
}

const UpgradePromptModal: React.FC<UpgradePromptModalProps> = ({ 
  onClose,
  data = {} 
}) => {
  const feature = data.feature || 'this feature';
  const domain = data.domain || 'this domain';
  
  const benefits = [
    'Unlimited assessments across all domains',
    'Cross-framework compliance mapping',
    'Team collaboration and sharing',
    'Advanced reporting and analytics',
    'API access and integrations',
    'Priority support'
  ];

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.9 }}
        className="bg-white dark:bg-gray-800 rounded-xl shadow-xl w-full max-w-md"
      >
        <div className="p-6 text-center">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
          >
            <X className="h-6 w-6" />
          </button>
          
          <div className="rounded-full bg-blue-100 dark:bg-blue-900/30 p-3 w-16 h-16 flex items-center justify-center mx-auto mb-4">
            <Lock className="h-8 w-8 text-blue-600 dark:text-blue-400" />
          </div>
          
          <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
            {data.feature ? `Unlock ${feature}` : data.domain ? `Access ${domain}` : 'Upgrade Required'}
          </h2>
          
          <p className="text-gray-600 dark:text-gray-300 mb-6">
            {data.feature 
              ? `${feature} is available exclusively to our premium users. Upgrade today to unlock this and many more features!`
              : data.domain 
                ? `${domain} assessment is available exclusively to our premium users. Upgrade today to access all security domains!`
                : 'This functionality requires a premium account. Upgrade today to access all features!'}
          </p>
          
          <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4 mb-6 text-left">
            <h3 className="font-medium text-gray-900 dark:text-white mb-3">Premium Benefits:</h3>
            <ul className="space-y-2">
              {benefits.map((benefit, index) => (
                <li key={index} className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-green-500 dark:text-green-400 mr-2 mt-0.5 flex-shrink-0" />
                  <span className="text-sm text-gray-700 dark:text-gray-300">{benefit}</span>
                </li>
              ))}
            </ul>
          </div>
          
          <div className="flex flex-col space-y-3">
            <Link
              to="/pricing"
              className="w-full py-2.5 bg-blue-600 text-white rounded-md hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 text-center font-medium"
            >
              View Pricing Plans
            </Link>
            <button
              onClick={onClose}
              className="w-full py-2.5 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-md hover:bg-gray-50 dark:hover:bg-gray-700 text-center font-medium"
            >
              Maybe Later
            </button>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default UpgradePromptModal;