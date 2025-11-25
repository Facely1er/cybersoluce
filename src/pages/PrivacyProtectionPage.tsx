import React from 'react';
import { Lock, Shield, FileText, Eye, ArrowRight, CheckCircle, Database, Globe, UserCheck, AlertTriangle, Settings, FileDigit, Fingerprint, Scale } from 'lucide-react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import DomainBackground from '../components/common/DomainBackground';

const PrivacyProtectionPage = () => {
  const privacyFramework = [
    {
      icon: UserCheck,
      title: 'Lawful Basis Management',
      description: 'Establish and document valid bases for processing',
      capabilities: [
        'Consent management system',
        'Purpose limitation controls',
        'Legitimate interest assessments',
        'Processing records maintenance',
      ],
    },
    {
      icon: Fingerprint,
      title: 'Data Subject Rights',
      description: 'Fulfill individual privacy rights requests',
      capabilities: [
        'Automated rights request handling',
        'Identity verification workflow',
        'Response tracking system',
        'Exemption management',
      ],
    },
    {
      icon: Eye,
      title: 'Privacy Governance',
      description: 'Establish privacy management framework',
      capabilities: [
        'Privacy policy management',
        'Privacy impact assessments',
        'Privacy by design implementation',
        'Training and awareness programs',
      ],
    },
    {
      icon: Database,
      title: 'Data Protection',
      description: 'Implement technical safeguards for personal data',
      capabilities: [
        'Data encryption mechanisms',
        'Pseudonymization techniques',
        'Access controls management',
        'Data minimization tools',
      ],
    },
    {
      icon: Scale,
      title: 'Accountability',
      description: 'Demonstrate compliance with privacy requirements',
      capabilities: [
        'Compliance documentation system',
        'Privacy audit framework',
        'DPO/privacy office support',
        'Vendor assessment program',
      ],
    },
    {
      icon: AlertTriangle,
      title: 'Breach Management',
      description: 'Prepare for and respond to privacy incidents',
      capabilities: [
        'Breach detection tools',
        'Impact assessment workflow',
        'Notification management system',
        'Remediation tracking',
      ],
    },
  ];

  const technicalControls = [
    {
      icon: Database,
      title: 'Data Security',
      features: [
        { name: 'Encryption (at rest/transit)', status: 'essential' },
        { name: 'Access Control Matrix', status: 'essential' },
        { name: 'Data Loss Prevention', status: 'essential' },
        { name: 'Secure Data Transfer', status: 'recommended' },
      ]
    },
    {
      icon: Settings,
      title: 'Privacy Engineering',
      features: [
        { name: 'Data Minimization', status: 'essential' },
        { name: 'Purpose Limitation Controls', status: 'essential' },
        { name: 'Retention Management', status: 'essential' },
        { name: 'Privacy-Preserving Analytics', status: 'advanced' },
      ]
    },
    {
      icon: UserCheck,
      title: 'Consent Management',
      features: [
        { name: 'Preference Center', status: 'essential' },
        { name: 'Consent Records', status: 'essential' },
        { name: 'Withdrawal Mechanism', status: 'essential' },
        { name: 'Granular Permissions', status: 'recommended' },
      ]
    },
    {
      icon: FileDigit,
      title: 'Rights Fulfillment',
      features: [
        { name: 'Subject Request Portal', status: 'essential' },
        { name: 'Data Discovery Tool', status: 'essential' },
        { name: 'Identity Verification', status: 'recommended' },
        { name: 'Response Automation', status: 'advanced' },
      ]
    }
  ];

  const regulations = [
    {
      name: 'GDPR (EU)',
      description: 'General Data Protection Regulation',
      compliance: '98%',
      key_features: [
        'Data Subject Rights',
        'Privacy by Design',
        'Lawful Processing',
        'Accountability'
      ]
    },
    {
      name: 'CCPA/CPRA (California)',
      description: 'California Consumer Privacy Act/Rights Act',
      compliance: '96%',
      key_features: [
        'Right to Delete',
        'Right to Know',
        'Opt-out of Sale/Share',
        'Sensitive Data Protection'
      ]
    },
    {
      name: 'LGPD (Brazil)',
      description: 'Lei Geral de Proteção de Dados',
      compliance: '94%',
      key_features: [
        'Legal Bases',
        'Data Subject Rights',
        'Privacy Officer',
        'Security Measures'
      ]
    },
    {
      name: 'PIPL (China)',
      description: 'Personal Information Protection Law',
      compliance: '92%',
      key_features: [
        'Separate Consent',
        'Cross-border Reviews',
        'PI Handlers',
        'Privacy Notices'
      ]
    },
  ];

  const privacyCheckList = [
    { 
      category: 'Governance',
      items: [
        'Privacy policy implementation',
        'Data protection officer designation',
        'Privacy awareness training',
        'Vendor management program'
      ]
    },
    { 
      category: 'Data Inventory',
      items: [
        'Data mapping and flows',
        'Legal basis documentation',
        'Processing purposes tracking',
        'Data retention schedules'
      ]
    },
    { 
      category: 'Individual Rights',
      items: [
        'Rights request mechanism',
        'Identity verification process',
        'Response tracking system',
        'Request fulfillment procedures'
      ]
    },
    { 
      category: 'Security Measures',
      items: [
        'Encryption implementation',
        'Access control system',
        'Breach detection capabilities',
        'Notification procedures'
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-gray-800">
      {/* Hero Section */}
      <div className="relative bg-gradient-to-r from-green-600 to-green-800 dark:from-green-900 dark:to-green-700 overflow-hidden">
        <DomainBackground color="34, 197, 94" secondaryColor="21, 128, 61" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 relative z-10">
          <div className="text-center">
            <motion.h1 
              className="text-4xl font-bold text-white mb-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              Privacy Protection
            </motion.h1>
            <motion.p 
              className="text-xl text-green-100 max-w-3xl mx-auto mb-8"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              Comprehensive privacy protection ensuring compliance with GDPR, CCPA, LGPD, and PIPL through proven privacy management practices and automated compliance workflows.
            </motion.p>
            <motion.div 
              className="flex justify-center space-x-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              <Link 
                to="/dashboard" 
                className="px-8 py-3 bg-white text-green-600 rounded-lg font-medium hover:bg-green-50 transition-colors"
              >
                View Dashboard
              </Link>
              <Link 
                to="/intelligence" 
                className="px-8 py-3 border border-white text-white rounded-lg font-medium hover:bg-white/10 transition-colors"
              >
                Privacy Intelligence
              </Link>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Privacy Framework Categories */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
            Privacy Management Framework
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Comprehensive privacy management aligned with global regulations including GDPR, CCPA, LGPD, and PIPL
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {privacyFramework.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8 h-full"
              >
                <Icon className="h-12 w-12 text-green-600 dark:text-green-400 mb-6" />
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
              Essential Privacy Controls
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              Critical technical and administrative controls for privacy protection based on global privacy regulations
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
                  <control.icon className="h-10 w-10 text-green-600 dark:text-green-400 mr-4" />
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

      {/* Regulatory Compliance Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
            Global Privacy Framework Coverage
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Privacy controls mapped across global data protection regulations for comprehensive compliance coverage
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {regulations.map((regulation, index) => (
            <motion.div
              key={regulation.name}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 h-full"
            >
              <div className="flex items-center justify-between mb-2">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                  {regulation.name}
                </h3>
                <span className="text-xl font-bold text-green-600 dark:text-green-400">
                  {regulation.compliance}
                </span>
              </div>
              <p className="text-sm text-gray-500 dark:text-gray-400 mb-4 border-b border-gray-200 dark:border-gray-700 pb-3">
                {regulation.description}
              </p>
              <ul className="space-y-2 mt-4">
                {regulation.key_features.map((feature) => (
                  <li key={feature} className="flex items-center text-sm text-gray-700 dark:text-gray-300">
                    <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                    {feature}
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Privacy Checklist */}
      <div className="bg-gray-50 dark:bg-gray-900 py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
              Privacy Protection Checklist
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              Essential activities to build comprehensive privacy protection programs across global operations
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {privacyCheckList.map((category, index) => (
              <motion.div
                key={category.category}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 h-full"
              >
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 border-b border-gray-200 dark:border-gray-700 pb-2">
                  {category.category}
                </h3>
                <ul className="space-y-3 mt-4">
                  {category.items.map((item) => (
                    <li key={item} className="flex items-start">
                      <CheckCircle className="h-5 w-5 text-green-500 mr-3 flex-shrink-0 mt-0.5" />
                      <span className="text-gray-700 dark:text-gray-300">{item}</span>
                    </li>
                  ))}
                </ul>
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
              Regional Privacy Regulations
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-300 mb-8">
              Navigate regional privacy requirements and data protection regulations
            </p>
            
            <div className="space-y-6">
              <div className="border-l-4 border-green-500 pl-4 py-2">
                <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-1">European Union</h3>
                <p className="text-gray-600 dark:text-gray-300">GDPR compliance with cross-border transfer mechanisms and data subject rights</p>
              </div>
              
              <div className="border-l-4 border-green-500 pl-4 py-2">
                <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-1">United States</h3>
                <p className="text-gray-600 dark:text-gray-300">State privacy laws compliance (CCPA, CPRA, VCDPA, CPA, CTDPA)</p>
              </div>
              
              <div className="border-l-4 border-green-500 pl-4 py-2">
                <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-1">Asia Pacific</h3>
                <p className="text-gray-600 dark:text-gray-300">PIPL (China), PDPA (Singapore), Privacy Act (Australia), APPI (Japan) compliance</p>
              </div>
              
              <div className="border-l-4 border-green-500 pl-4 py-2">
                <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-1">Latin America</h3>
                <p className="text-gray-600 dark:text-gray-300">LGPD (Brazil) and emerging regional privacy frameworks compliance</p>
              </div>
            </div>
          </div>
          
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8">
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-6">
              Cross-Border Privacy Challenges
            </h3>
            
            <div className="space-y-5">
              <div className="flex items-start">
                <AlertTriangle className="h-6 w-6 text-yellow-500 mr-4 flex-shrink-0 mt-1" />
                <div>
                  <h4 className="font-medium text-gray-900 dark:text-white">Cross-Border Data Flows</h4>
                  <p className="text-sm text-gray-600 dark:text-gray-300">Managing data transfers between different regulatory regions</p>
                </div>
              </div>
              
              <div className="flex items-start">
                <AlertTriangle className="h-6 w-6 text-yellow-500 mr-4 flex-shrink-0 mt-1" />
                <div>
                  <h4 className="font-medium text-gray-900 dark:text-white">Regulatory Fragmentation</h4>
                  <p className="text-sm text-gray-600 dark:text-gray-300">Addressing inconsistent requirements across jurisdictions</p>
                </div>
              </div>
              
              <div className="flex items-start">
                <AlertTriangle className="h-6 w-6 text-yellow-500 mr-4 flex-shrink-0 mt-1" />
                <div>
                  <h4 className="font-medium text-gray-900 dark:text-white">Privacy Rights Automation</h4>
                  <p className="text-sm text-gray-600 dark:text-gray-300">Scaling rights fulfillment across global operations</p>
                </div>
              </div>
              
              <div className="flex items-start">
                <AlertTriangle className="h-6 w-6 text-yellow-500 mr-4 flex-shrink-0 mt-1" />
                <div>
                  <h4 className="font-medium text-gray-900 dark:text-white">Consent Management</h4>
                  <p className="text-sm text-gray-600 dark:text-gray-300">Implementing different consent models for different regions</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* CTA Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
        <div className="bg-green-600 dark:bg-green-700 rounded-2xl p-12 text-center relative overflow-hidden">
          <DomainBackground color="34, 197, 94" secondaryColor="21, 128, 61" />
          <div className="relative z-10">
            <h2 className="text-3xl font-bold text-white mb-6">
              Ready to enhance privacy protection?
            </h2>
            <p className="text-xl text-green-100 mb-8 max-w-2xl mx-auto">
              Build comprehensive privacy protection with global regulation compliance and proven privacy management practices.
            </p>
            <div className="flex justify-center space-x-4">
              <Link 
                to="/dashboard" 
                className="px-8 py-3 bg-white text-green-600 rounded-lg font-medium hover:bg-green-50 transition-colors"
              >
                View Dashboard
                <ArrowRight className="inline-block ml-2 h-5 w-5" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PrivacyProtectionPage;