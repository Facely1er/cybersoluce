import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTimeout } from 'react-use';
import { Link } from 'react-router-dom';
import { Shield, GitBranch, Brain, Target, Users, DollarSign, X, ChevronRight, ChevronLeft, Play, Pause } from 'lucide-react';
import AssessmentDemo from '../components/demo/AssessmentDemo';
import DashboardDemo from '../components/demo/DashboardDemo';
import RecommendationsDemo from '../components/demo/RecommendationsDemo';
import ReportDemo from '../components/demo/ReportDemo';
import FrameworkDemo from '../components/demo/FrameworkDemo';
import SensitiveInfoDemo from '../components/demo/SensitiveInfoDemo';

const DemoPage: React.FC = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [isActive, setIsActive] = useState(true);
  const [isPlaying, setIsPlaying] = useState(true);
  const [, cancel] = useTimeout(() => setIsActive(false), 1800000); // 30 minutes

  useEffect(() => {
    const handleActivity = () => setIsActive(true);
    window.addEventListener('mousemove', handleActivity);
    window.addEventListener('keydown', handleActivity);

    let autoplayInterval: NodeJS.Timeout;
    if (isPlaying) {
      autoplayInterval = setInterval(() => {
        setCurrentStep((prev) => (prev === steps.length - 1 ? 0 : prev + 1));
      }, 10000); // Change slide every 10 seconds
    }

    return () => {
      window.removeEventListener('mousemove', handleActivity);
      window.removeEventListener('keydown', handleActivity);
      cancel();
      if (autoplayInterval) clearInterval(autoplayInterval);
    };
  }, [cancel, isPlaying]);

  const steps = [
    {
      id: 'command-center',
      title: 'Executive Command Center',
      component: DashboardDemo,
      icon: Shield,
      description: 'Board-ready governance dashboard with strategic intelligence',
    },
    {
      id: 'framework-fusion',
      title: 'Framework Fusion Technology™',
      component: FrameworkDemo,
      icon: GitBranch,
      description: 'Map and align controls across multiple security frameworks',
    },
    {
      id: 'intelligence-engine',
      title: 'Intelligence Engine™',
      component: AssessmentDemo,
      icon: Brain,
      description: 'AI-powered insights with predictive analytics and automation',
    },
    {
      id: 'maturity-acceleration',
      title: 'Maturity Acceleration Engine',
      component: RecommendationsDemo,
      icon: Target,
      description: 'Track and accelerate cybersecurity maturity progression',
    },
    {
      id: 'governance-orchestration',
      title: 'Governance Orchestration',
      component: ReportDemo,
      icon: Users,
      description: 'Coordinate cybersecurity governance workflows and tasks',
    },
    {
      id: 'budget-optimization',
      title: 'Budget Optimization Simulator',
      component: SensitiveInfoDemo,
      icon: DollarSign,
      description: 'Optimize cybersecurity investments for maximum ROI',
    },
  ];

  if (!isActive) {
    return (
      <div className="fixed inset-0 flex items-center justify-center bg-gray-900/50 dark:bg-gray-900/75">
        <div className="bg-white dark:bg-gray-800 rounded-lg p-8 text-center shadow-xl">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Session Expired</h2>
          <p className="text-gray-600 dark:text-gray-300 mb-6">
            Your demo session has expired due to inactivity.
          </p>
          <button
            onClick={() => setIsActive(true)}
            className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 transition-colors"
          >
            Restart Demo
          </button>
        </div>
      </div>
    );
  }

  const CurrentStepComponent = steps[currentStep].component;

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Progress Bar */}
      <div className="fixed top-0 left-0 right-0 h-1 bg-gray-200 dark:bg-gray-700">
        <motion.div
          className="h-full bg-blue-600 dark:bg-blue-500"
          initial={{ width: '0%' }}
          animate={{ width: `${((currentStep + 1) / steps.length) * 100}%` }}
          transition={{ duration: 0.3 }}
        />
      </div>

      {/* Step Indicator */}
      <div className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
                {steps[currentStep].title}
              </h2>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                {steps[currentStep].description}
              </p>
            </div>
            <button
              onClick={() => setIsPlaying(!isPlaying)}
              className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
            >
              {isPlaying ? (
                <Pause className="h-5 w-5 text-gray-600 dark:text-gray-400" />
              ) : (
                <Play className="h-5 w-5 text-gray-600 dark:text-gray-400" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentStep}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="space-y-8"
          >
            <CurrentStepComponent />
          </motion.div>
        </AnimatePresence>

        {/* Navigation */}
        <div className="fixed bottom-0 left-0 right-0 bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
            <button
              onClick={() => setCurrentStep(Math.max(0, currentStep - 1))}
              disabled={currentStep === 0}
              className="flex items-center text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white disabled:opacity-50 transition-colors"
            >
              <ChevronLeft className="h-5 w-5 mr-2" />
              Previous
            </button>

            <div className="flex space-x-2">
              {steps.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentStep(index)}
                  className={`w-2 h-2 rounded-full transition-colors ${
                    currentStep === index 
                      ? 'bg-blue-600 dark:bg-blue-500' 
                      : 'bg-gray-300 dark:bg-gray-600'
                  }`}
                />
              ))}
            </div>

            {currentStep === steps.length - 1 ? (
              <Link
                to="/dashboard"
                className="flex items-center px-6 py-2 bg-blue-600 dark:bg-blue-500 text-white rounded-lg hover:bg-blue-700 dark:hover:bg-blue-600 transition-colors"
              >
                Access Command Center
                <ChevronRight className="h-5 w-5 ml-2" />
              </Link>
            ) : (
              <button
                onClick={() => setCurrentStep(Math.min(steps.length - 1, currentStep + 1))}
                className="flex items-center text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-colors"
              >
                Next
                <ChevronRight className="h-5 w-5 ml-2" />
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DemoPage;