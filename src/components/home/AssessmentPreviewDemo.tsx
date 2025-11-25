import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { CheckCircle, Shield, AlertTriangle, X } from 'lucide-react';

const AssessmentPreviewDemo = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [isPlaying, setIsPlaying] = useState(true);
  const [showTooltip, setShowTooltip] = useState<number | null>(null);

  const questions = [
    {
      question: "How would you rate your organization's backup strategy?",
      helpText: "Consider frequency, encryption, and recoverability of your backups",
      levels: [
        { level: 1, label: "Initial", description: "Ad-hoc or inconsistent backups" },
        { level: 2, label: "Developing", description: "Regular backups but limited testing" },
        { level: 3, label: "Defined", description: "Documented strategy with periodic testing" },
        { level: 4, label: "Managed", description: "Automated with validation" },
        { level: 5, label: "Optimizing", description: "Advanced strategy with continuous testing" },
      ]
    },
    {
      question: "How would you rate your incident response capabilities?",
      helpText: "Consider detection, response, and recovery capabilities",
      levels: [
        { level: 1, label: "Initial", description: "Ad-hoc response with no formal procedures" },
        { level: 2, label: "Developing", description: "Basic procedures documented but not tested" },
        { level: 3, label: "Defined", description: "Formal procedures with regular testing" },
        { level: 4, label: "Managed", description: "Measured and automated response" },
        { level: 5, label: "Optimizing", description: "Continuously improving capabilities" },
      ]
    },
  ];

  useEffect(() => {
    if (!isPlaying) return;
    
    const timeout = setTimeout(() => {
      // Auto-select an answer after 2 seconds
      if (currentStep === 0 && selectedAnswer === null) {
        setSelectedAnswer(3); // Select level 3
      }
      
      // Move to next step after 4 seconds
      const interval = setTimeout(() => {
        if (currentStep < questions.length - 1) {
          setCurrentStep(prev => prev + 1);
          setSelectedAnswer(null);
        } else {
          setCurrentStep(0);
          setSelectedAnswer(null);
        }
      }, 4000);
      
      return () => clearTimeout(interval);
    }, 2000);
    
    return () => clearTimeout(timeout);
  }, [currentStep, selectedAnswer, isPlaying, questions.length]);

  // Add a safety check to ensure currentStep is within bounds
  const safeCurrentStep = Math.min(currentStep, questions.length - 1);
  const currentQuestion = questions[safeCurrentStep];

  // If for some reason questions array is empty or currentQuestion is undefined, provide fallback
  if (!currentQuestion || questions.length === 0) {
    return (
      <div className="bg-white dark:bg-gray-800 p-6 rounded-lg border border-gray-200 dark:border-gray-700 shadow-lg max-w-2xl mx-auto">
        <p className="text-gray-600 dark:text-gray-400">No assessment questions available.</p>
      </div>
    );
  }

  return (
    <div className="relative bg-white dark:bg-gray-800 p-6 rounded-lg border border-gray-200 dark:border-gray-700 shadow-lg max-w-2xl mx-auto">
      {/* Close button */}
      <button 
        className="absolute top-2 right-2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-200"
        onClick={() => setIsPlaying(false)}
      >
        <X className="h-5 w-5" />
      </button>
      
      {/* Question header */}
      <div className="mb-6">
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center">
            <Shield className="h-5 w-5 text-blue-600 dark:text-blue-400 mr-2" />
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
              Ransomware Defense Assessment
            </h3>
          </div>
          <span className="text-sm text-gray-500 dark:text-gray-400">
            Question {safeCurrentStep + 1} of {questions.length}
          </span>
        </div>
        
        <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-1.5 mb-4">
          <div 
            className="bg-blue-600 dark:bg-blue-500 h-1.5 rounded-full transition-all duration-300"
            style={{ width: `${((safeCurrentStep + 1) / questions.length) * 100}%` }}
          ></div>
        </div>
      </div>
      
      {/* Question content */}
      <motion.div
        key={safeCurrentStep}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        transition={{ duration: 0.5 }}
        className="mb-6"
      >
        <h4 className="text-xl font-medium text-gray-900 dark:text-white mb-2">
          {currentQuestion.question}
        </h4>
        <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
          {currentQuestion.helpText}
        </p>
        
        <div className="bg-blue-50 dark:bg-blue-900/20 p-3 rounded-lg border border-blue-100 dark:border-blue-800 mb-6">
          <div className="flex items-start">
            <AlertTriangle className="h-5 w-5 text-blue-600 dark:text-blue-400 mt-0.5 mr-2" />
            <p className="text-xs text-blue-700 dark:text-blue-300">
              This assessment is aligned with NIST CSF 2.0 (PR.IP-4) and ISO 27001 (A.12.3.1)
            </p>
          </div>
        </div>
      </motion.div>
      
      {/* Maturity levels */}
      <div className="space-y-3">
        {currentQuestion.levels.map((level) => (
          <motion.button
            key={level.level}
            onClick={() => setSelectedAnswer(level.level)}
            onMouseEnter={() => setShowTooltip(level.level)}
            onMouseLeave={() => setShowTooltip(null)}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className={`w-full p-4 rounded-lg text-left transition-colors ${
              selectedAnswer === level.level
                ? 'border-2 border-blue-500 bg-blue-50 dark:border-blue-400 dark:bg-blue-900/20'
                : 'border border-gray-200 dark:border-gray-700 hover:border-blue-300 dark:hover:border-blue-700'
            }`}
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <div className={`w-6 h-6 rounded-full flex items-center justify-center mr-3 ${
                  selectedAnswer === level.level
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300'
                }`}>
                  {level.level}
                </div>
                <h5 className="font-medium text-gray-900 dark:text-white">
                  {level.label}
                </h5>
              </div>
              {selectedAnswer === level.level && (
                <CheckCircle className="h-5 w-5 text-blue-600 dark:text-blue-400" />
              )}
            </div>
            <p className="mt-1 text-sm text-gray-600 dark:text-gray-400 ml-9">
              {level.description}
            </p>
            
            {/* Enhanced tooltip */}
            {showTooltip === level.level && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="absolute z-10 p-2 bg-gray-900 text-white text-xs rounded shadow-lg mt-2 max-w-xs"
              >
                Level {level.level} represents {level.label.toLowerCase()} maturity with {level.description.toLowerCase()}
              </motion.div>
            )}
          </motion.button>
        ))}
      </div>
      
      {/* Demo navigation */}
      <div className="flex justify-center mt-6">
        <div className="flex space-x-2">
          {questions.map((_, index) => (
            <button
              key={index}
              className={`w-2.5 h-2.5 rounded-full ${
                safeCurrentStep === index ? 'bg-blue-600 dark:bg-blue-500' : 'bg-gray-300 dark:bg-gray-600'
              }`}
              onClick={() => {
                setCurrentStep(index);
                setSelectedAnswer(null);
                setIsPlaying(false);
              }}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default AssessmentPreviewDemo;