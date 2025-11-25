import React from 'react';
import { motion } from 'framer-motion';
import { Network } from 'lucide-react';

interface NetworkVisualizationProps {
  data: { source: string; target: string; strength: number; type: string }[];
  title: string;
  subtitle?: string;
  className?: string;
}

const NetworkVisualization: React.FC<NetworkVisualizationProps> = ({
  data,
  title,
  subtitle,
  className = ''
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className={`bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 overflow-hidden ${className}`}
    >
      <div className="p-6 border-b border-gray-200 dark:border-gray-700">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
              {title}
            </h3>
            {subtitle && (
              <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                {subtitle}
              </p>
            )}
          </div>
          <Network className="h-6 w-6 text-blue-600 dark:text-blue-400" />
        </div>
      </div>
      
      <div className="p-6">
        {data.length > 0 ? (
          <div className="space-y-4">
            {data.map((connection, index) => (
              <div key={index} className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                <div className="flex items-center space-x-3">
                  <div className="text-sm font-medium text-gray-900 dark:text-white">
                    {connection.source}
                  </div>
                  <div className="text-gray-400">→</div>
                  <div className="text-sm font-medium text-gray-900 dark:text-white">
                    {connection.target}
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <div className={`px-2 py-1 rounded-full text-xs ${
                    connection.type === 'high-correlation' ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300' :
                    connection.type === 'medium-correlation' ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300' :
                    'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300'
                  }`}>
                    {connection.type.replace('-', ' ')}
                  </div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">
                    {Math.abs(connection.strength * 100).toFixed(0)}%
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="h-64 flex items-center justify-center text-gray-500 dark:text-gray-400">
            <div className="text-center">
              <Network className="h-12 w-12 mx-auto mb-4 opacity-50" />
              <p>No correlation data available</p>
              <p className="text-sm mt-1">Click "Run Analysis" to generate correlations</p>
            </div>
          </div>
        )}
      </div>
    </motion.div>
  );
};

export default NetworkVisualization;