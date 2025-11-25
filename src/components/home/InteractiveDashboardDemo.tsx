import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Shield, Clock, CheckCircle, TrendingUp, PlusCircle, X } from 'lucide-react';

const InteractiveDashboardDemo = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  
  const animatedValues = {
    securityScore: 64,
    inProgress: 3,
    completed: 12,
    trend: 15
  };

  useEffect(() => {
    if (!isPlaying) return;
    
    const interval = setInterval(() => {
      setCurrentStep((prev) => (prev + 1) % steps.length);
    }, 5000);
    
    return () => clearInterval(interval);
  }, [isPlaying]);

  const steps = [
    {
      title: "Security Dashboard",
      description: "Monitor your organization's security posture across all domains",
      content: (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow">
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300">Security Score</h3>
              <Shield className="h-5 w-5 text-blue-500" />
            </div>
            <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">3.2/5.0</div>
            <div className="mt-2 h-1.5 w-full bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
              <motion.div 
                className="h-full bg-blue-600 dark:bg-blue-500 rounded-full" 
                initial={{ width: 0 }}
                animate={{ width: `${animatedValues.securityScore}%` }}
                transition={{ duration: 1.5, ease: "easeOut" }}
              />
            </div>
          </div>
          
          <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow">
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300">In Progress</h3>
              <Clock className="h-5 w-5 text-yellow-500" />
            </div>
            <motion.div 
              className="text-2xl font-bold text-yellow-600 dark:text-yellow-400"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.5, type: "spring" }}
            >
              {animatedValues.inProgress}
            </motion.div>
            <div className="text-xs text-gray-500 dark:text-gray-400 mt-4">Assessments</div>
          </div>
          
          <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow">
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300">Completed</h3>
              <CheckCircle className="h-5 w-5 text-green-500" />
            </div>
            <motion.div 
              className="text-2xl font-bold text-green-600 dark:text-green-400"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.7, type: "spring" }}
            >
              {animatedValues.completed}
            </motion.div>
            <div className="text-xs text-gray-500 dark:text-gray-400 mt-4">Assessments</div>
          </div>
          
          <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow">
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300">Trend</h3>
              <TrendingUp className="h-5 w-5 text-purple-500" />
            </div>
            <motion.div 
              className="text-2xl font-bold text-purple-600 dark:text-purple-400"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.9, type: "spring" }}
            >
              +{animatedValues.trend}%
            </motion.div>
            <div className="text-xs text-gray-500 dark:text-gray-400 mt-4">This month</div>
          </div>
        </div>
      )
    },
    {
      title: "Assessment Status",
      description: "Track progress across all security domains",
      content: (
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow overflow-hidden">
          <div className="p-4 border-b border-gray-200 dark:border-gray-700">
            <div className="flex justify-between">
              <h3 className="font-medium text-gray-900 dark:text-white">Security Assessments</h3>
              <button className="text-blue-600 dark:text-blue-400 text-sm flex items-center">
                <PlusCircle className="h-4 w-4 mr-1" />
                New Assessment
              </button>
            </div>
          </div>
          
          <div className="p-4">
            <div className="space-y-4">
              {[
                { name: "Ransomware Defense", progress: 75, score: 3.2 },
                { name: "Supply Chain Security", progress: 45, score: 2.5 },
                { name: "Privacy Protection", progress: 90, score: 4.1 },
              ].map((assessment, index) => (
                <div key={index} className="flex items-center">
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-sm font-medium text-gray-900 dark:text-white">{assessment.name}</span>
                      <span className="text-sm text-gray-600 dark:text-gray-400">{assessment.score}/5.0</span>
                    </div>
                    <div className="w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                      <div 
                        className={`h-2 rounded-full ${
                          assessment.score > 4 ? 'bg-green-500' :
                          assessment.score > 3 ? 'bg-blue-500' :
                          assessment.score > 2 ? 'bg-yellow-500' :
                          'bg-red-500'
                        }`} 
                        style={{ width: `${assessment.progress}%` }}
                      ></div>
                    </div>
                  </div>
                  <button className="ml-4 px-3 py-1 text-xs bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-300 rounded">
                    Continue
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      )
    },
    {
      title: "Compliance Status",
      description: "Track your compliance across multiple frameworks",
      content: (
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow overflow-hidden">
          <div className="p-4 border-b border-gray-200 dark:border-gray-700">
            <h3 className="font-medium text-gray-900 dark:text-white">Framework Compliance</h3>
          </div>
          
          <div className="p-4">
            <div className="space-y-4">
              {[
                { name: "NIST CSF 2.0", progress: 72, status: "Partially Compliant" },
                { name: "ISO 27001", progress: 68, status: "Partially Compliant" },
                { name: "GDPR", progress: 85, status: "Compliant" },
              ].map((framework, index) => (
                <div key={index} className="flex items-center space-x-4">
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-sm font-medium text-gray-900 dark:text-white">{framework.name}</span>
                      <span className={`px-2 py-0.5 rounded-full text-xs ${
                        framework.progress >= 80 ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300' :
                        'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300'
                      }`}>
                        {framework.status}
                      </span>
                    </div>
                    <div className="w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                      <div 
                        className={`h-2 rounded-full ${
                          framework.progress >= 80 ? 'bg-green-500' :
                          framework.progress >= 60 ? 'bg-yellow-500' :
                          'bg-red-500'
                        }`} 
                        style={{ width: `${framework.progress}%` }}
                      ></div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )
    }
  ];
  
  const currentContent = steps[currentStep];

  return (
    <div className="relative bg-gray-50 dark:bg-gray-900 p-6 rounded-lg border border-gray-200 dark:border-gray-700 shadow-lg max-w-xl mx-auto">
      {/* Close button */}
      <button 
        className="absolute top-2 right-2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-200"
        onClick={() => setIsPlaying(false)}
      >
        <X className="h-5 w-5" />
      </button>
      
      {/* Demo header */}
      <div className="mb-4 text-center">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-1">
          {currentContent.title}
        </h3>
        <p className="text-sm text-gray-500 dark:text-gray-400">
          {currentContent.description}
        </p>
      </div>
      
      {/* Demo content */}
      <motion.div
        key={currentStep}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        transition={{ duration: 0.5 }}
      >
        {currentContent.content}
      </motion.div>
      
      {/* Demo navigation */}
      <div className="flex justify-center mt-6">
        <div className="flex space-x-2">
          {steps.map((_, index) => (
            <button
              key={index}
              className={`w-2.5 h-2.5 rounded-full ${
                currentStep === index ? 'bg-blue-600 dark:bg-blue-500' : 'bg-gray-300 dark:bg-gray-600'
              }`}
              onClick={() => {
                setCurrentStep(index);
                setIsPlaying(false);
              }}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default InteractiveDashboardDemo;