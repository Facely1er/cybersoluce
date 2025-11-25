import React from 'react';
import { motion } from 'framer-motion';
import { Play, X } from 'lucide-react';

interface DemoModeToggleProps {
  isDemoActive: boolean;
  onToggle: () => void;
}

const DemoModeToggle: React.FC<DemoModeToggleProps> = ({ 
  isDemoActive, 
  onToggle 
}) => {
  return (
    <div className="mt-6">
      <motion.button
        onClick={onToggle}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className={`inline-flex items-center px-6 py-3 rounded-lg transition-colors ${
          isDemoActive
            ? 'bg-red-600 text-white hover:bg-red-700 dark:bg-red-500 dark:hover:bg-red-600'
            : 'bg-white text-blue-600 hover:bg-blue-50 dark:bg-blue-500 dark:text-white dark:hover:bg-blue-600'
        }`}
      >
        {isDemoActive ? (
          <>
            <X className="w-5 h-5 mr-2" />
            Exit Demo
          </>
        ) : (
          <>
            <Play className="w-5 h-5 mr-2" />
            Try Interactive Demo
          </>
        )}
      </motion.button>
    </div>
  );
};

export default DemoModeToggle;