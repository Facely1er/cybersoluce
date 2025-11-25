import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Shield, Box, Lock, FileText, ChevronRight, ArrowLeft, ArrowRight, Clock, Globe, CheckCircle } from 'lucide-react';

interface AssessmentWizardProps {
  onComplete?: (config: any) => void;
  onUpgradeRequired?: () => void;
  userTier?: 'free' | 'professional' | 'enterprise' | 'anonymous';
  freeAssessmentsUsed?: Record<string, boolean>;
}

interface AssessmentConfig {
  domain: string;
  frameworks: string[];
  regions: string[];
  scope: {
    systems: string[];
    locations: string[];
  };
  team: string[];
  name: string;
}

const AssessmentWizard: React.FC<AssessmentWizardProps> = ({ 
  onComplete, 
  userTier = 'free',
  freeAssessmentsUsed = { 'threat-intelligence': false, 'supply-chain-risk': true, 'compliance-management': true, 'training-awareness': true }
}) => {
  const [step, setStep] = useState(1);
  const [config, setConfig] = useState<AssessmentConfig>({
    domain: '',
    frameworks: [],
    regions: [],
    scope: {
      systems: [],
      locations: [],
    },
    team: [],
    name: '',
  });

  const domains = [
    { id: 'threat-intelligence', name: 'CyberCaution', icon: Shield, freeEligible: true },
    { id: 'supply-chain-risk', name: 'VendorSoluce', icon: Box, freeEligible: false },
    { id: 'compliance-management', name: 'CyberCorrect', icon: Lock, freeEligible: false },
    { id: 'training-awareness', name: 'CyberCertitude', icon: FileText, freeEligible: false },
  ];

  const frameworks = [
    { id: 'nist-csf', name: 'NIST CSF 2.0', description: 'Comprehensive cybersecurity framework' },
    { id: 'iso27001', name: 'ISO 27001:2022', description: 'Information security management standard' },
    { id: 'cis', name: 'CIS Controls v8', description: 'Critical security controls' },
  ];

  const regions = [
    { id: 'na', name: 'North America', frameworks: ['NIST CSF', 'SOC 2', 'HIPAA'] },
    { id: 'eu', name: 'European Union', frameworks: ['GDPR', 'NIS2'] },
    { id: 'apac', name: 'Asia Pacific', frameworks: ['PIPL', 'PDPA'] },
    { id: 'latam', name: 'Latin America', frameworks: ['LGPD'] },
  ];

  const handleDomainSelect = (domainId: string) => {
    setConfig({ ...config, domain: domainId });
    
    // Auto-advance to next step after selection
    setTimeout(() => {
      if (step === 1) {
        setStep(2);
      }
    }, 500);
  };

  const handleFrameworkToggle = (frameworkId: string) => {
    const currentFrameworks = [...config.frameworks];
    if (currentFrameworks.includes(frameworkId)) {
      setConfig({ 
        ...config, 
        frameworks: currentFrameworks.filter(f => f !== frameworkId)
      });
    } else {
      setConfig({
        ...config,
        frameworks: [...currentFrameworks, frameworkId]
      });
    }
  };

  const handleRegionToggle = (regionId: string) => {
    const currentRegions = [...config.regions];
    if (currentRegions.includes(regionId)) {
      setConfig({ 
        ...config, 
        regions: currentRegions.filter(r => r !== regionId)
      });
    } else {
      setConfig({
        ...config,
        regions: [...currentRegions, regionId]
      });
    }
  };

  const isStepComplete = (step: number) => {
    switch (step) {
      case 1: // Domain selection
        return !!config.domain;
      case 2: // Framework selection
        return config.frameworks.length > 0;
      case 3: // Region selection
        return config.regions.length > 0;
      case 4: // Review
        return !!config.name;
      default:
        return false;
    }
  };

  const handleComplete = () => {
    if (onComplete) {
      onComplete(config);
    }
  };

  return (
    <div className="max-w-5xl mx-auto">
      {/* Progress bar */}
      <div className="mb-8">
        <div className="flex justify-between text-sm text-gray-600 dark:text-gray-400 mb-2">
          <span>Step {step} of 4</span>
          <span>{Math.round(((step - 1) / 3) * 100)}% Completed</span>
        </div>
        
        <div className="h-2 w-full bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: `${((step - 1) / 3) * 100}%` }}
            className="h-full bg-blue-600 dark:bg-blue-500"
          />
        </div>
        
        <div className="flex justify-between mt-2">
          {['Domain', 'Framework', 'Region', 'Review'].map((label, index) => (
            <div key={label} className="flex flex-col items-center">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                step > index + 1 ? 'bg-blue-600 text-white dark:bg-blue-500' :
                step === index + 1 ? 'bg-blue-100 border-2 border-blue-600 text-blue-600 dark:bg-blue-900/30 dark:border-blue-500 dark:text-blue-400' :
                'bg-gray-200 dark:bg-gray-700 text-gray-400 dark:text-gray-500'
              }`}>
                {step > index + 1 ? <ChevronRight size={16} /> : index + 1}
              </div>
              <span className={`mt-1 text-xs ${
                step >= index + 1 ? 'text-gray-900 dark:text-gray-100' : 'text-gray-400 dark:text-gray-500'
              }`}>{label}</span>
            </div>
          ))}
        </div>
      </div>
      
      {/* Step content */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="bg-white dark:bg-gray-800 rounded-lg"
      >
        {step === 1 && (
          <>
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-xl font-semibold text-gray-900 dark:text-white mb-6"
            >
              Select Security Domain
            </motion.h2>
            
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="grid grid-cols-1 md:grid-cols-2 gap-6"
            >
              {domains.map(domain => {
                const Icon = domain.icon;
                const isPremium = userTier === 'free' && !domain.freeEligible;
                const isUsed = userTier === 'free' && domain.freeEligible && freeAssessmentsUsed[domain.id];
                const isDisabled = isPremium || isUsed;
                
                return (
                  <button
                    key={domain.id}
                    onClick={() => handleDomainSelect(domain.id)}
                    className={`flex items-center p-4 border rounded-lg text-left transition-colors relative overflow-hidden ${
                      config.domain === domain.id 
                        ? 'border-blue-600 bg-blue-50 dark:border-blue-400 dark:bg-blue-900/20' 
                        : isDisabled
                          ? 'border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 opacity-75'
                          : 'border-gray-200 dark:border-gray-700 hover:border-blue-300 dark:hover:border-blue-700'
                    }`}
                    disabled={isDisabled}
                  >
                    {isDisabled && (
                      <div className="absolute inset-0 bg-gray-200 dark:bg-gray-700 opacity-10 flex items-center justify-center">
                        {isPremium ? (
                          <div className="bg-yellow-100 dark:bg-yellow-900/30 text-yellow-800 dark:text-yellow-300 px-3 py-1 rounded-full text-xs font-medium">
                            Premium
                          </div>
                        ) : (
                          <div className="bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-gray-300 px-3 py-1 rounded-full text-xs font-medium">
                            Already Used
                          </div>
                        )}
                      </div>
                    )}
                    
                    <Icon className={`h-10 w-10 mr-4 ${
                      domain.id === 'threat-intelligence' ? 'text-blue-500 dark:text-blue-400' :
                      domain.id === 'supply-chain-risk' ? 'text-purple-500 dark:text-purple-400' :
                      domain.id === 'compliance-management' ? 'text-green-500 dark:text-green-400' :
                      'text-orange-500 dark:text-orange-400'
                    }`} />
                    
                    <div>
                      <h3 className="font-medium text-gray-900 dark:text-white text-lg mb-1">{domain.name}</h3>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        {domain.id === 'threat-intelligence' && 'Threat intelligence and security monitoring with CyberCaution'}
                        {domain.id === 'supply-chain-risk' && 'Vendor risk management and supply chain security with VendorSoluce'}
                        {domain.id === 'compliance-management' && 'Compliance gap analysis and audit management with CyberCorrect'}
                        {domain.id === 'training-awareness' && 'Security training metrics and awareness programs with CyberCertitude'}
                      </p>
                      
                      {domain.freeEligible && !isUsed && userTier === 'free' && (
                        <span className="inline-block mt-2 bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-300 px-2 py-0.5 rounded text-xs font-medium">
                          Free Assessment Available
                        </span>
                      )}
                    </div>
                  </button>
                );
              })}
            </motion.div>
            
            {userTier === 'free' && (
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="mt-6 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-100 dark:border-blue-800"
              >
                <div className="flex items-start">
                  <div className="flex-shrink-0 mt-0.5">
                    <svg className="h-5 w-5 text-blue-600 dark:text-blue-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <div className="ml-3 flex-1 md:flex md:justify-between">
                    <p className="text-sm text-blue-700 dark:text-blue-300">
                      You have access to one free assessment. Choose wisely!
                      <a href="/pricing" className="font-medium underline ml-1">Upgrade</a>
                    </p>
                  </div>
                </div>
              </motion.div>
            )}
          </>
        )}
        
        {step === 2 && (
          <>
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-xl font-semibold text-gray-900 dark:text-white mb-6"
            >
              Select Compliance Frameworks
            </motion.h2>
            
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-4"
            >
              {frameworks.map(framework => (
                <div
                  key={framework.id}
                  className={`flex items-start p-4 border rounded-lg transition-colors ${
                    config.frameworks.includes(framework.id) 
                      ? 'border-blue-500 bg-blue-50 dark:border-blue-400 dark:bg-blue-900/20' 
                      : 'border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700'
                  }`}
                >
                  <input
                    type="checkbox"
                    id={`framework-${framework.id}`}
                    checked={config.frameworks.includes(framework.id)}
                    onChange={() => handleFrameworkToggle(framework.id)}
                    className="h-5 w-5 text-blue-600 rounded border-gray-300 focus:ring-blue-500 mt-0.5 dark:bg-gray-700 dark:border-gray-600"
                  />
                  
                  <label 
                    htmlFor={`framework-${framework.id}`}
                    className="ml-3 flex-1 cursor-pointer"
                  >
                    <span className="block text-sm font-medium text-gray-900 dark:text-white">
                      {framework.name}
                    </span>
                    <span className="block text-sm text-gray-500 dark:text-gray-400">
                      {framework.description}
                    </span>
                  </label>
                </div>
              ))}
            </motion.div>
            
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-6 p-4 bg-gray-50 dark:bg-gray-700/50 rounded-lg"
            >
              <h3 className="text-sm font-medium text-gray-900 dark:text-white mb-2">
                Selected Frameworks
              </h3>
              <div className="flex flex-wrap gap-2">
                {config.frameworks.length > 0 ? (
                  config.frameworks.map(frameworkId => {
                    const framework = frameworks.find(f => f.id === frameworkId);
                    return framework ? (
                      <div
                        key={frameworkId}
                        className="bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-300 px-3 py-1 rounded-full text-sm"
                      >
                        {framework.name}
                      </div>
                    ) : null;
                  })
                ) : (
                  <div className="text-sm text-gray-500 dark:text-gray-400">
                    No frameworks selected
                  </div>
                )}
              </div>
            </motion.div>
          </>
        )}
        
        {step === 3 && (
          <>
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-xl font-semibold text-gray-900 dark:text-white mb-6"
            >
              Select Applicable Regions
            </motion.h2>
            
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="grid grid-cols-1 md:grid-cols-2 gap-6"
            >
              {regions.map(region => (
                <div
                  key={region.id}
                  className={`flex items-start p-4 border rounded-lg transition-colors ${
                    config.regions.includes(region.id) 
                      ? 'border-blue-500 bg-blue-50 dark:border-blue-400 dark:bg-blue-900/20' 
                      : 'border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700'
                  }`}
                >
                  <input
                    type="checkbox"
                    id={`region-${region.id}`}
                    checked={config.regions.includes(region.id)}
                    onChange={() => handleRegionToggle(region.id)}
                    className="h-5 w-5 text-blue-600 rounded border-gray-300 focus:ring-blue-500 mt-0.5 dark:bg-gray-700 dark:border-gray-600"
                  />
                  
                  <label 
                    htmlFor={`region-${region.id}`}
                    className="ml-3 flex-1 cursor-pointer"
                  >
                    <span className="block text-sm font-medium text-gray-900 dark:text-white">
                      {region.name}
                    </span>
                    <div className="mt-1 flex flex-wrap gap-1">
                      {region.frameworks.map(framework => (
                        <span 
                          key={framework} 
                          className="inline-block bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-300 px-2 py-0.5 rounded text-xs"
                        >
                          {framework}
                        </span>
                      ))}
                    </div>
                  </label>
                </div>
              ))}
            </motion.div>
            
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-6 p-4 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg border border-yellow-100 dark:border-yellow-800"
            >
              <div className="flex items-start">
                <div className="flex-shrink-0 mt-0.5">
                  <svg className="h-5 w-5 text-yellow-400 dark:text-yellow-300" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                  </svg>
                </div>
                <div className="ml-3 flex-1">
                  <p className="text-sm text-yellow-700 dark:text-yellow-300">
                    Selected regions will automatically adapt the assessment to include region-specific regulatory requirements.
                  </p>
                </div>
              </div>
            </motion.div>
          </>
        )}
        
        {step === 4 && (
          <>
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-xl font-semibold text-gray-900 dark:text-white mb-6"
            >
              Review & Create Assessment
            </motion.h2>
            
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-6">
              <label 
                htmlFor="assessment-name" 
                className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
              >
                Assessment Name*
              </label>
              <input
                type="text"
                id="assessment-name"
                value={config.name}
                onChange={(e) => setConfig({ ...config, name: e.target.value })}
                placeholder="e.g., Q3 2025 Ransomware Defense Assessment"
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
              />
            </motion.div>
            
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-gray-50 dark:bg-gray-700/50 rounded-lg p-5"
            >
              <h3 className="text-md font-medium text-gray-900 dark:text-white mb-4">
                Assessment Summary
              </h3>
              
              <div className="space-y-4">
                <div className="flex items-start">
                  <Shield className="h-5 w-5 text-gray-400 dark:text-gray-500 mt-0.5 mr-3" />
                  <div>
                    <span className="text-sm text-gray-500 dark:text-gray-400">
                      Security Domain:
                    </span>
                    <span className="ml-2 text-sm font-medium text-gray-900 dark:text-white">
                      {domains.find(d => d.id === config.domain)?.name || 'Not selected'}
                    </span>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <Globe className="h-5 w-5 text-gray-400 dark:text-gray-500 mt-0.5 mr-3" />
                  <div>
                    <span className="text-sm text-gray-500 dark:text-gray-400">
                      Regions:
                    </span>
                    <div className="mt-1 flex flex-wrap gap-1">
                      {config.regions.length > 0 ? (
                        config.regions.map(regionId => {
                          const region = regions.find(r => r.id === regionId);
                          return region ? (
                            <span 
                              key={regionId}
                              className="inline-block bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-300 px-2 py-0.5 rounded text-xs"
                            >
                              {region.name}
                            </span>
                          ) : null;
                        })
                      ) : (
                        <span className="text-sm text-gray-500 dark:text-gray-400">
                          Not selected
                        </span>
                      )}
                    </div>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-gray-400 dark:text-gray-500 mt-0.5 mr-3" />
                  <div>
                    <span className="text-sm text-gray-500 dark:text-gray-400">
                      Frameworks:
                    </span>
                    <div className="mt-1 flex flex-wrap gap-1">
                      {config.frameworks.length > 0 ? (
                        config.frameworks.map(frameworkId => {
                          const framework = frameworks.find(f => f.id === frameworkId);
                          return framework ? (
                            <span 
                              key={frameworkId}
                              className="inline-block bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-300 px-2 py-0.5 rounded text-xs"
                            >
                              {framework.name}
                            </span>
                          ) : null;
                        })
                      ) : (
                        <span className="text-sm text-gray-500 dark:text-gray-400">
                          Not selected
                        </span>
                      )}
                    </div>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <Clock className="h-5 w-5 text-gray-400 dark:text-gray-500 mt-0.5 mr-3" />
                  <div>
                    <span className="text-sm text-gray-500 dark:text-gray-400">
                      Estimated Time:
                    </span>
                    <span className="ml-2 text-sm font-medium text-gray-900 dark:text-white">
                      Approximately 20 minutes
                    </span>
                  </div>
                </div>
              </div>
            </motion.div>
            
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-6 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-100 dark:border-blue-800"
            >
              <div className="flex items-start">
                <CheckCircle className="h-5 w-5 text-blue-600 dark:text-blue-400 mr-3 mt-0.5" />
                <div>
                  <h3 className="text-sm font-medium text-blue-800 dark:text-blue-300">
                    Ready to Create Your Assessment
                  </h3>
                  <p className="text-sm text-blue-700 dark:text-blue-200 mt-1">
                    Your assessment will be configured according to the selected parameters and will be ready to start immediately.
                  </p>
                </div>
              </div>
            </motion.div>
          </>
        )}
        
        {/* Navigation buttons */}
        <div className="flex justify-between mt-8">
          {step > 1 ? (
            <button
              onClick={() => setStep(Math.max(1, step - 1))}
              className="flex items-center px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
            >
              <ArrowLeft className="h-5 w-5 mr-2" />
              Back
            </button>
          ) : (
            <div></div>
          )}
          
          {step < 4 ? (
            <button
              onClick={() => setStep(Math.min(4, step + 1))}
              disabled={!isStepComplete(step)}
              className={`flex items-center px-4 py-2 rounded-md text-white transition-colors ${
                isStepComplete(step)
                  ? 'bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600'
                  : 'bg-gray-300 dark:bg-gray-600 cursor-not-allowed'
              }`}
            >
              Next
              <ArrowRight className="h-5 w-5 ml-2" />
            </button>
          ) : (
            <button
              onClick={handleComplete}
              disabled={!isStepComplete(step)}
              className={`flex items-center px-6 py-2 rounded-md text-white transition-colors ${
                isStepComplete(step)
                  ? 'bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600'
                  : 'bg-gray-300 dark:bg-gray-600 cursor-not-allowed'
              }`}
            >
              Create Assessment
              <ChevronRight className="h-5 w-5 ml-2" />
            </button>
          )}
        </div>
      </motion.div>
    </div>
  );
};

export default AssessmentWizard;