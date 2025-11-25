import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Mail, Lock, ArrowRight, ShieldCheck, AlertTriangle } from 'lucide-react';
import DomainBackground from '../components/common/DomainBackground';
import { useAuth } from '../context/AuthContext';

const LoginPage: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const { login, isAuthenticated, isLoading, error, clearError } = useAuth();

  // Redirect if already authenticated
  useEffect(() => {
    if (isAuthenticated) {
      const from = (location.state as any)?.from?.pathname || '/dashboard';
      navigate(from);
    }
  }, [isAuthenticated, navigate, location]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    clearError();
    
    const response = await login({ email, password });
    
    if (response.success) {
      // Navigate to dashboard or the page they were trying to access
      const from = (location.state as any)?.from?.pathname || '/dashboard';
      navigate(from);
    }
    // If unsuccessful, the error will be handled by the auth context
  };

  return (
    <div className="min-h-screen flex flex-col">
      <div className="relative flex-1 flex flex-col md:flex-row">
        {/* Left Section - Login Form */}
        <div className="relative flex-1 flex items-center justify-center p-8">
          <div className="w-full max-w-md">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="text-center mb-8"
            >
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white">
                Sign in to your account
              </h2>
              <p className="mt-2 text-gray-600 dark:text-gray-400">
                Enter your credentials to access the platform
              </p>
            </motion.div>
            
            {error && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="mb-4 p-4 bg-red-50 dark:bg-red-900/20 text-red-700 dark:text-red-300 rounded-md flex items-start"
              >
                <AlertTriangle className="h-5 w-5 mr-3 mt-0.5 flex-shrink-0" />
                <p className="text-sm">{error}</p>
              </motion.div>
            )}
            
            <motion.form
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              onSubmit={handleSubmit}
              className="space-y-6"
            >
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Email address
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Mail className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="block w-full pl-10 pr-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                    placeholder="you@example.com"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="password" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Password
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Lock className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    id="password"
                    name="password"
                    type="password"
                    autoComplete="current-password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="block w-full pl-10 pr-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                    placeholder="••••••••"
                  />
                </div>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <input
                    id="remember-me"
                    name="remember-me"
                    type="checkbox"
                    checked={rememberMe}
                    onChange={(e) => setRememberMe(e.target.checked)}
                    className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                  />
                  <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-700 dark:text-gray-300">
                    Remember me
                  </label>
                </div>

                <div className="text-sm">
                  <Link to="/forgot-password" className="font-medium text-blue-600 dark:text-blue-400 hover:text-blue-500">
                    Forgot your password?
                  </Link>
                </div>
              </div>

              <div>
                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full flex justify-center items-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isLoading ? (
                    <>
                      <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Loading...
                    </>
                  ) : (
                    'Sign in'
                  )}
                </button>
              </div>
            </motion.form>
            
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="mt-8 text-center"
            >
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Don't have an account?{' '}
                <Link to="/signup" className="font-medium text-blue-600 dark:text-blue-400 hover:text-blue-500">
                  Create a free account
                </Link>
              </p>
            </motion.div>
          </div>
        </div>
        
        {/* Right Section - Promotional Content */}
        <div className="hidden md:flex flex-1 relative overflow-hidden">
          <DomainBackground color="59, 130, 246" secondaryColor="29, 78, 216" />
          <div className="absolute inset-0 flex flex-col justify-center p-12 text-white z-10">
            <div className="max-w-md mx-auto">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
              >
                <ShieldCheck className="h-16 w-16 text-white mb-6" />
                <h3 className="text-3xl font-bold mb-4">
                  Strengthen your security posture
                </h3>
                <p className="text-lg text-blue-100 mb-8">
                  Access comprehensive assessment tools and analytics to improve your organization's security and compliance
                </p>
                
                <div className="space-y-4">
                  {[
                    'Track security maturity across multiple domains',
                    'Stay compliant with regional regulations',
                    'Generate detailed security reports for stakeholders'
                  ].map((benefit, index) => (
                    <div key={index} className="flex items-start">
                      <div className="flex-shrink-0 pt-1">
                        <ArrowRight className="h-5 w-5 text-blue-300" />
                      </div>
                      <p className="ml-3 text-blue-100">{benefit}</p>
                    </div>
                  ))}
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;