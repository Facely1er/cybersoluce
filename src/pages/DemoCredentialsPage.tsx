import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Shield, CheckCircle, AlertTriangle, User, Lock, RefreshCw, X, AlertOctagon } from 'lucide-react';
import { setupDemoCredentials, cleanupDemoCredentials } from '../utils/setupDemoCredentials';
import { isDemoEnvironment } from '../utils/environment';

const DemoCredentialsPage: React.FC = () => {
  const [status, setStatus] = useState<'idle' | 'success' | 'error' | 'restricted'>('idle');
  const [message, setMessage] = useState<string>('');
  const [isRemoving, setIsRemoving] = useState<boolean>(false);
  const navigate = useNavigate();

  useEffect(() => {
    // Check if this environment allows demo credentials
    if (!isDemoEnvironment()) {
      setStatus('restricted');
      setMessage('Demo credentials are only available in development or demo environments.');
    }
  }, []);

  const handleSetupDemo = () => {
    try {
      const result = setupDemoCredentials();
      if (result.allowed) {
        setStatus('success');
        setMessage(result.message || 'Demo credentials created successfully.');
      } else {
        setStatus('restricted');
        setMessage(result.error || 'This environment does not allow demo credentials.');
      }
    } catch (error) {
      setStatus('error');
      setMessage('Failed to set up demo credentials. Please try again.');
      console.error('Error setting up demo credentials:', error);
    }
  };

  const handleCleanupDemo = () => {
    try {
      setIsRemoving(true);
      const result = cleanupDemoCredentials();
      if (result.allowed) {
        setStatus('idle');
        setMessage(result.message || 'Demo credentials removed successfully.');
        setTimeout(() => setMessage(''), 3000);
      } else {
        setStatus('restricted');
        setMessage(result.error || 'This environment does not allow demo credentials.');
      }
    } catch (error) {
      setStatus('error');
      setMessage('Failed to remove demo credentials. Please try again.');
      console.error('Error removing demo credentials:', error);
    } finally {
      setIsRemoving(false);
    }
  };

  const handleGoToLogin = () => {
    navigate('/login');
  };

  return (
    <div className="max-w-3xl mx-auto px-4 py-16">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white dark:bg-gray-800 rounded-xl shadow-xl p-8"
      >
        <div className="flex items-center justify-center mb-8">
          <div className="bg-blue-100 dark:bg-blue-900/30 p-4 rounded-full">
            <Shield className="h-12 w-12 text-blue-600 dark:text-blue-400" />
          </div>
        </div>

        <h1 className="text-2xl font-bold text-center text-gray-900 dark:text-white mb-6">
          Demo Credentials Manager
        </h1>

        <p className="text-gray-600 dark:text-gray-300 mb-8 text-center">
          Create demo credentials to explore the CyberSoluce platform with pre-populated assessments and data.
        </p>

        {status === 'restricted' && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            className="bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800 rounded-lg p-6 mb-8"
          >
            <div className="flex items-start">
              <AlertOctagon className="h-6 w-6 text-amber-600 dark:text-amber-400 mt-0.5 mr-3" />
              <div>
                <h3 className="text-lg font-medium text-amber-800 dark:text-amber-200 mb-2">
                  Feature Restricted
                </h3>
                <p className="text-amber-700 dark:text-amber-300 mb-4">
                  {message || 'Demo credentials are only available in development or demo environments.'}
                </p>
                <div className="bg-white dark:bg-gray-800 rounded-lg p-4 border border-amber-200 dark:border-amber-800">
                  <p className="text-sm text-gray-700 dark:text-gray-300">
                    For security reasons, demo accounts cannot be created in production environments. 
                    Please contact support if you need a demonstration of the platform.
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {status === 'success' && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg p-6 mb-8"
          >
            <div className="flex items-start">
              <CheckCircle className="h-6 w-6 text-green-600 dark:text-green-400 mt-0.5 mr-3" />
              <div>
                <h3 className="text-lg font-medium text-green-800 dark:text-green-200 mb-2">
                  Demo Credentials Ready
                </h3>
                <p className="text-green-700 dark:text-green-300 mb-4">
                  {message}
                </p>

                <div className="bg-white dark:bg-gray-800 rounded-lg p-4 border border-green-200 dark:border-green-800">
                  <div className="mb-3">
                    <div className="flex items-center mb-1">
                      <User className="h-4 w-4 text-gray-500 dark:text-gray-400 mr-2" />
                      <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Email:</span>
                    </div>
                    <code className="text-sm bg-gray-100 dark:bg-gray-700 px-2 py-1 rounded">demo@cybersoluce.com</code>
                  </div>
                  <div>
                    <div className="flex items-center mb-1">
                      <Lock className="h-4 w-4 text-gray-500 dark:text-gray-400 mr-2" />
                      <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Password:</span>
                    </div>
                    <code className="text-sm bg-gray-100 dark:bg-gray-700 px-2 py-1 rounded">demo123</code>
                    <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                      (Any password will work for the demo account)
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {status === 'error' && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-6 mb-8"
          >
            <div className="flex items-start">
              <AlertTriangle className="h-6 w-6 text-red-600 dark:text-red-400 mt-0.5 mr-3" />
              <div>
                <h3 className="text-lg font-medium text-red-800 dark:text-red-200 mb-2">
                  Error
                </h3>
                <p className="text-red-700 dark:text-red-300">
                  {message}
                </p>
              </div>
            </div>
          </motion.div>
        )}

        {status !== 'restricted' && (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
            <button
              onClick={handleSetupDemo}
              disabled={status === 'success'}
              className={`flex items-center justify-center px-6 py-3 rounded-lg text-white font-medium ${
                status === 'success'
                  ? 'bg-gray-400 dark:bg-gray-600 cursor-not-allowed'
                  : 'bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600'
              }`}
            >
              <Shield className="h-5 w-5 mr-2" />
              Setup Demo Account
            </button>

            <button
              onClick={handleCleanupDemo}
              className="flex items-center justify-center px-6 py-3 border border-gray-300 dark:border-gray-600 rounded-lg text-gray-700 dark:text-gray-200 font-medium hover:bg-gray-50 dark:hover:bg-gray-700"
            >
              {isRemoving ? (
                <RefreshCw className="h-5 w-5 mr-2 animate-spin" />
              ) : (
                <X className="h-5 w-5 mr-2" />
              )}
              Remove Demo Data
            </button>
          </div>
        )}

        {status === 'success' && (
          <div className="text-center">
            <button
              onClick={handleGoToLogin}
              className="inline-flex items-center justify-center px-6 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-lg text-white font-medium shadow-md hover:shadow-lg transition-all"
            >
              Go to Login
              <svg className="ml-2 h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </button>
          </div>
        )}

        {status === 'restricted' && (
          <div className="text-center">
            <button
              onClick={() => navigate('/login')}
              className="inline-flex items-center justify-center px-6 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-lg text-white font-medium shadow-md hover:shadow-lg transition-all"
            >
              Go to Login
              <svg className="ml-2 h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </button>
          </div>
        )}
      </motion.div>

      {message && status !== 'success' && status !== 'error' && status !== 'restricted' && (
        <div className="mt-4 text-center text-sm text-gray-500 dark:text-gray-400">
          {message}
        </div>
      )}

      <div className="mt-8 text-center text-sm text-gray-500 dark:text-gray-400">
        <p>
          This is a demo environment. All data is stored locally in your browser and will be lost when you clear your browser cache.
        </p>
      </div>
    </div>
  );
};

export default DemoCredentialsPage;