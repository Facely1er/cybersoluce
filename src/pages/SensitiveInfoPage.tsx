import React from 'react';
import { FileText, Lock, Shield, Eye, ArrowRight, CheckCircle, Database, AlertTriangle, Layers, KeySquare, ClipboardList, Tag, Search, Server, FileKey } from 'lucide-react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import DomainBackground from '../components/common/DomainBackground';

const SensitiveInfoPage = () => {
  const infoManagementFramework = [
    {
      icon: Layers,
      title: 'Classification',
      description: 'Identify and categorize sensitive information',
      capabilities: [
        'Automated data discovery',
        'Classification schema implementation',
        'Metadata tagging system',
        'Classification verification',
      ],
    },
    {
      icon: KeySquare,
      title: 'Protection',
      description: 'Apply appropriate security controls to sensitive data',
      capabilities: [
        'Encryption management',
        'Access control enforcement',
        'Data masking implementation',
        'Rights management services',
      ],
    },
    {
      icon: ClipboardList,
      title: 'Governance',
      description: 'Define and enforce data handling policies',
      capabilities: [
        'Policy creation and management',
        'Handling procedures enforcement',
        'Compliance validation',
        'Audit trail logging',
      ],
    },
    {
      icon: Search,
      title: 'Discovery & Mapping',
      description: 'Continuously monitor data location and flows',
      capabilities: [
        'Sensitive data discovery',
        'Data flow visualization',
        'Unauthorized storage detection',
        'Shadow IT identification',
      ],
    },
    {
      icon: Server,
      title: 'Retention & Disposal',
      description: 'Manage the data lifecycle securely',
      capabilities: [
        'Retention policy enforcement',
        'Secure data deletion',
        'Archiving automation',
        'Legal hold management',
      ],
    },
    {
      icon: Shield,
      title: 'Monitoring & Detection',
      description: 'Detect and respond to unauthorized activity',
      capabilities: [
        'Activity monitoring',
        'Anomaly detection',
        'Exfiltration prevention',
        'Incident response automation',
      ],
    },
  ];

  const technicalControls = [
    {
      icon: FileKey,
      title: 'Data Protection',
      features: [
        { name: 'Field-Level Encryption', status: 'essential' },
        { name: 'Access Control Matrix', status: 'essential' },
        { name: 'Data Masking', status: 'essential' },
        { name: 'Tokenization', status: 'recommended' },
      ]
    },
    {
      icon: Eye,
      title: 'Monitoring',
      features: [
        { name: 'Access Logging', status: 'essential' },
        { name: 'User Activity Tracking', status: 'essential' },
        { name: 'DLP Integration', status: 'essential' },
        { name: 'Behavior Analytics', status: 'recommended' },
      ]
    },
    {
      icon: Tag,
      title: 'Classification',
      features: [
        { name: 'Pattern Recognition', status: 'essential' },
        { name: 'Metadata Tagging', status: 'essential' },
        { name: 'Data Cataloging', status: 'recommended' },
        { name: 'Sensitive AI Detection', status: 'advanced' },
      ]
    },
    {
      icon: Database,
      title: 'Lifecycle Management',
      features: [
        { name: 'Retention Enforcement', status: 'essential' },
        { name: 'Secure Disposal', status: 'essential' },
        { name: 'Archiving Automation', status: 'recommended' },
        { name: 'Legal Hold Workflow', status: 'recommended' },
      ]
    }
  ];

  const dataCategories = [
    {
      name: 'Confidential',
      description: 'Business sensitive information',
      examples: [
        'Trade secrets',
        'Strategic plans',
        'Financial forecasts',
        'Merger details'
      ],
      controls: [
        'Encryption',
        'Strict access control',
        'DLP monitoring',
        'Audit logging'
      ]
    },
    {
      name: 'Personal Data',
      description: 'Information identifying individuals',
      examples: [
        'Contact information',
        'Government IDs',
        'Biometrics',
        'Online identifiers'
      ],
      controls: [
        'Consent management',
        'Rights fulfillment',
        'Security measures',
        'Transfer controls'
      ]
    },
    {
      name: 'Regulated Data',
      description: 'Information under specific regulations',
      examples: [
        'Health records',
        'Payment data',
        'Financial accounts',
        'Legal documents'
      ],
      controls: [
        'Regulatory controls',
        'Compliance monitoring',
        'Special handling',
        'Enhanced security'
      ]
    },
    {
      name: 'Intellectual Property',
      description: 'Valuable creative and technical assets',
      examples: [
        'Patents',
        'Copyrighted materials',
        'Source code',
        'Product designs'
      ],
      controls: [
        'Watermarking',
        'Rights management',
        'Usage tracking',
        'Leakage prevention'
      ]
    }
  ];

  const standards = [
    {
      name: 'NIST 800-171',
      description: 'Protection of Controlled Unclassified Information',
      compliance: '95%',
      key: 'Protection of sensitive federal information in non-federal systems'
    },
    {
      name: 'ISO/IEC 27701',
      description: 'Privacy Information Management',
      compliance: '93%',
      key: 'Extension to ISO 27001 for privacy management'
    },
    {
      name: 'EUCI Guidelines',
      description: 'EU Classified Information',
      compliance: '91%',
      key: 'Handling of sensitive EU information'
    },
    {
      name: 'CUI Framework',
      description: 'Controlled Unclassified Information',
      compliance: '92%',
      key: 'Standards for handling sensitive but unclassified information'
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-gray-800">
      {/* Hero Section */}
      <div className="relative bg-gradient-to-r from-orange-600 to-orange-800 dark:from-orange-900 dark:to-orange-700 overflow-hidden">
        <DomainBackground color="249, 115, 22" secondaryColor="194, 65, 12" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 relative z-10">
          <div className="text-center">
            <motion.h1 
              className="text-4xl font-bold text-white mb-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              Sensitive Information Management
            </motion.h1>
            <motion.p 
              className="text-xl text-orange-100 max-w-3xl mx-auto mb-8"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              Comprehensive sensitive information management aligned with NIST 800-171 and ISO 27701. Protect controlled unclassified information with proven security frameworks.
            </motion.p>
            <motion.div 
              className="flex justify-center space-x-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              <Link 
                to="/cui-assessment" 
                className="px-8 py-3 bg-white text-orange-600 rounded-lg font-medium hover:bg-orange-50 transition-colors"
              >
                CUI Assessment
              </Link>
              <Link 
                to="/dashboard" 
                className="px-8 py-3 border border-white text-white rounded-lg font-medium hover:bg-white/10 transition-colors"
              >
                View Dashboard
              </Link>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Information Management Framework */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
            Information Management Framework
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Comprehensive information management aligned with NIST 800-171 and ISO 27701 for controlled unclassified information protection
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {infoManagementFramework.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8 h-full"
              >
                <Icon className="h-12 w-12 text-orange-600 dark:text-orange-400 mb-6" />
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                  {feature.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-300 mb-6">
                  {feature.description}
                </p>
                <ul className="space-y-3">
                  {feature.capabilities.map((capability) => (
                    <li key={capability} className="flex items-start">
                      <CheckCircle className="h-5 w-5 text-green-500 mr-3 flex-shrink-0 mt-0.5" />
                      <span className="text-gray-700 dark:text-gray-300">{capability}</span>
                    </li>
                  ))}
                </ul>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* Essential Technical Controls Section */}
      <div className="bg-gray-50 dark:bg-gray-900 py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
              Essential Information Controls
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              Critical controls for sensitive information protection based on NIST 800-171 and CUI protection requirements
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {technicalControls.map((control, index) => (
              <motion.div
                key={control.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 h-full"
              >
                <div className="flex items-center mb-6">
                  <control.icon className="h-10 w-10 text-orange-600 dark:text-orange-400 mr-4" />
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                    {control.title}
                  </h3>
                </div>
                
                <ul className="space-y-3">
                  {control.features.map((feature) => (
                    <li key={feature.name} className="flex items-center justify-between">
                      <div className="flex items-center text-gray-700 dark:text-gray-300">
                        <CheckCircle className="h-5 w-5 text-green-500 mr-3 flex-shrink-0" />
                        <span>{feature.name}</span>
                      </div>
                      <span className={`text-xs px-2 py-1 rounded-full ${
                        feature.status === 'essential' 
                          ? 'bg-red-100 text-red-800 dark:bg-red-900/50 dark:text-red-300' 
                          : feature.status === 'recommended'
                            ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/50 dark:text-yellow-300'
                            : 'bg-blue-100 text-blue-800 dark:bg-blue-900/50 dark:text-blue-300'
                      }`}>
                        {feature.status.charAt(0).toUpperCase() + feature.status.slice(1)}
                      </span>
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Data Categories Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
            Data Classification Framework
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Comprehensive data classification for all types of sensitive information across organizational operations
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {dataCategories.map((category, index) => (
            <motion.div
              key={category.name}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 h-full"
            >
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2 border-b border-gray-200 dark:border-gray-700 pb-2">
                {category.name}
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                {category.description}
              </p>
              
              <div className="mb-4">
                <h4 className="text-sm font-medium text-gray-900 dark:text-white mb-2">Examples:</h4>
                <ul className="space-y-1">
                  {category.examples.map((example) => (
                    <li key={example} className="text-sm text-gray-600 dark:text-gray-300 flex items-center">
                      <div className="w-1.5 h-1.5 rounded-full bg-orange-400 mr-2"></div>
                      {example}
                    </li>
                  ))}
                </ul>
              </div>
              
              <div>
                <h4 className="text-sm font-medium text-gray-900 dark:text-white mb-2">Controls:</h4>
                <ul className="space-y-1">
                  {category.controls.map((control) => (
                    <li key={control} className="text-sm text-gray-600 dark:text-gray-300 flex items-center">
                      <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                      {control}
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Standards and Frameworks */}
      <div className="bg-gray-50 dark:bg-gray-900 py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
              Framework Coverage
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              Information security controls mapped across multiple standards for comprehensive protection coverage
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {standards.map((standard, index) => (
              <motion.div
                key={standard.name}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 text-center h-full"
              >
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                  {standard.name}
                </h3>
                <div className="text-3xl font-bold text-orange-600 dark:text-orange-400 mb-4">
                  {standard.compliance}
                </div>
                <p className="text-sm text-gray-600 dark:text-gray-300 mb-3">
                  {standard.description}
                </p>
                <div className="text-xs text-gray-500 dark:text-gray-400 border-t border-gray-200 dark:border-gray-700 pt-3">
                  {standard.key}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Regional Compliance Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">
              Regional Information Requirements
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-300 mb-8">
              Navigate regional requirements for sensitive information handling and protection
            </p>
            
            <div className="space-y-6">
              <div className="border-l-4 border-orange-500 pl-4 py-2">
                <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-1">European Union</h3>
                <p className="text-gray-600 dark:text-gray-300">EUCI guidelines and EU classified information handling requirements</p>
              </div>
              
              <div className="border-l-4 border-orange-500 pl-4 py-2">
                <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-1">North America</h3>
                <p className="text-gray-600 dark:text-gray-300">CUI framework, NIST 800-171/172, and CMMC 2.0 requirements</p>
              </div>
              
              <div className="border-l-4 border-orange-500 pl-4 py-2">
                <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-1">Asia Pacific</h3>
                <p className="text-gray-600 dark:text-gray-300">Regional classification schemes and PSPF (Australia) requirements</p>
              </div>
              
              <div className="border-l-4 border-orange-500 pl-4 py-2">
                <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-1">Latin America</h3>
                <p className="text-gray-600 dark:text-gray-300">Cross-border data handling requirements and information sharing controls</p>
              </div>
            </div>
          </div>
          
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8">
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-6">
              Cross-Border Information Challenges
            </h3>
            
            <div className="space-y-5">
              <div className="flex items-start">
                <AlertTriangle className="h-6 w-6 text-yellow-500 mr-4 flex-shrink-0 mt-1" />
                <div>
                  <h4 className="font-medium text-gray-900 dark:text-white">Data Sovereignty</h4>
                  <p className="text-sm text-gray-600 dark:text-gray-300">Managing regional data residency requirements and access controls</p>
                </div>
              </div>
              
              <div className="flex items-start">
                <AlertTriangle className="h-6 w-6 text-yellow-500 mr-4 flex-shrink-0 mt-1" />
                <div>
                  <h4 className="font-medium text-gray-900 dark:text-white">Classification Compatibility</h4>
                  <p className="text-sm text-gray-600 dark:text-gray-300">Aligning different regional classification schemes and standards</p>
                </div>
              </div>
              
              <div className="flex items-start">
                <AlertTriangle className="h-6 w-6 text-yellow-500 mr-4 flex-shrink-0 mt-1" />
                <div>
                  <h4 className="font-medium text-gray-900 dark:text-white">Regulatory Divergence</h4>
                  <p className="text-sm text-gray-600 dark:text-gray-300">Addressing contradictory requirements across international borders</p>
                </div>
              </div>
              
              <div className="flex items-start">
                <AlertTriangle className="h-6 w-6 text-yellow-500 mr-4 flex-shrink-0 mt-1" />
                <div>
                  <h4 className="font-medium text-gray-900 dark:text-white">Security Clearances</h4>
                  <p className="text-sm text-gray-600 dark:text-gray-300">Managing personnel access requirements across different countries</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
        <div className="bg-orange-600 dark:bg-orange-700 rounded-2xl p-12 text-center relative overflow-hidden">
          <DomainBackground color="249, 115, 22" secondaryColor="194, 65, 12" />
          <div className="relative z-10">
            <h2 className="text-3xl font-bold text-white mb-6">
              Ready to secure sensitive information?
            </h2>
            <p className="text-xl text-orange-100 mb-8 max-w-2xl mx-auto">
              Build comprehensive information protection with NIST 800-171 aligned controls and proven security practices.
            </p>
            <div className="flex justify-center space-x-4">
              <Link 
                to="/cui-assessment" 
                className="px-8 py-3 bg-white text-orange-600 rounded-lg font-medium hover:bg-orange-50 transition-colors"
              >
                Start CUI Assessment
                <ArrowRight className="inline-block ml-2 h-5 w-5" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SensitiveInfoPage;