import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { BarChart2, FileText, Play, ChevronRight, Shield, ArrowRight } from 'lucide-react';
import { useModal } from '../components/modals/ModalProvider';
import DemoModeToggle from '../components/home/DemoModeToggle';

const ExperienceItPage: React.FC = () => {
  const { openModal } = useModal();
  const [isDemoActive, setIsDemoActive] = useState(false);
  
  const handleStartDemo = () => {
    openModal('demo');
  };
  
  const toggleDemo = () => {
    setIsDemoActive(!isDemoActive);
  };

  return (
    <div className="py-12 bg-gray-50 dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-4xl font-bold text-gray-900 dark:text-white mb-4"
          >
            Experience CyberSoluce
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto"
          >
            Explore our platform through interactive demos, assessments, and dashboards
          </motion.p>
          
          {/* Demo Mode Toggle */}
          <DemoModeToggle 
            isDemoActive={isDemoActive}
            onToggle={toggleDemo}
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          {/* Interactive Demo Card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden flex flex-col"
          >
            <div className="p-6 flex-grow">
              <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/50 flex items-center justify-center rounded-lg mb-4">
                <Play className="h-6 w-6 text-blue-600 dark:text-blue-400" />
              </div>
              <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                Interactive Demo
              </h2>
              <p className="text-gray-600 dark:text-gray-300 mb-6">
                Explore a guided tour of our platform's features without creating an account.
                See dashboards, assessments, and reporting in action.
              </p>
              <button
                onClick={handleStartDemo}
                className="inline-flex items-center text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 font-medium"
              >
                Start Interactive Demo
                <ChevronRight className="ml-1 h-5 w-5" />
              </button>
            </div>
            <div className="bg-blue-50 dark:bg-blue-900/20 p-4 border-t border-blue-100 dark:border-blue-800">
              <div className="flex items-center text-sm">
                <Shield className="h-4 w-4 text-blue-600 dark:text-blue-400 mr-2" />
                <span className="text-blue-700 dark:text-blue-300">No account required</span>
              </div>
            </div>
          </motion.div>
          
          {/* Dashboard Card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden flex flex-col"
          >
            <div className="p-6 flex-grow">
              <div className="w-12 h-12 bg-purple-100 dark:bg-purple-900/50 flex items-center justify-center rounded-lg mb-4">
                <BarChart2 className="h-6 w-6 text-purple-600 dark:text-purple-400" />
              </div>
              <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                Security Dashboard
              </h2>
              <p className="text-gray-600 dark:text-gray-300 mb-6">
                Monitor your organization's security posture in real-time with interactive dashboards
                and comprehensive analytics.
              </p>
              <Link
                to="/dashboard"
                className="inline-flex items-center text-purple-600 dark:text-purple-400 hover:text-purple-800 dark:hover:text-purple-300 font-medium"
              >
                View Dashboard
                <ChevronRight className="ml-1 h-5 w-5" />
              </Link>
            </div>
            <div className="bg-purple-50 dark:bg-purple-900/20 p-4 border-t border-purple-100 dark:border-purple-800">
              <div className="flex items-center text-sm">
                <Shield className="h-4 w-4 text-purple-600 dark:text-purple-400 mr-2" />
                <span className="text-purple-700 dark:text-purple-300">
                  Free account available
                </span>
              </div>
            </div>
          </motion.div>
          
          {/* Assessment Card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden flex flex-col"
          >
            <div className="p-6 flex-grow">
              <div className="w-12 h-12 bg-green-100 dark:bg-green-900/50 flex items-center justify-center rounded-lg mb-4">
                <FileText className="h-6 w-6 text-green-600 dark:text-green-400" />
              </div>
              <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                Security Assessment
              </h2>
              <p className="text-gray-600 dark:text-gray-300 mb-6">
                Run comprehensive security assessments aligned with major frameworks like 
                NIST CSF 2.0, ISO 27001, and more.
              </p>
              <Link
                to="/assessment"
                className="inline-flex items-center text-green-600 dark:text-green-400 hover:text-green-800 dark:hover:text-green-300 font-medium"
              >
                Start Assessment
                <ChevronRight className="ml-1 h-5 w-5" />
              </Link>
            </div>
            <div className="bg-green-50 dark:bg-green-900/20 p-4 border-t border-green-100 dark:border-green-800">
              <div className="flex items-center text-sm">
                <Shield className="h-4 w-4 text-green-600 dark:text-green-400 mr-2" />
                <span className="text-green-700 dark:text-green-300">
                  One free assessment available
                </span>
              </div>
            </div>
          </motion.div>
        </div>
        
        {/* Call to Action Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="bg-gradient-to-r from-blue-600 to-indigo-600 dark:from-blue-800 dark:to-indigo-800 rounded-xl shadow-xl p-8 text-center"
        >
          <h2 className="text-2xl font-bold text-white mb-4">Ready to get started with CyberSoluce?</h2>
          <p className="text-blue-100 mb-6 max-w-2xl mx-auto">
            Create a free account today to access your first security assessment and explore our platform's capabilities.
          </p>
          <Link
            to="/signup"
            className="inline-flex items-center px-6 py-3 bg-white text-blue-600 rounded-lg font-medium hover:bg-blue-50 transition-colors"
          >
            Create Free Account
            <ArrowRight className="ml-2 h-5 w-5" />
          </Link>
        </motion.div>
      </div>
    </div>
  );
};

export default ExperienceItPage;