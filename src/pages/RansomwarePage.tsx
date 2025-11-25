import React from 'react';
import { Shield, Lock, FileText, AlertTriangle, CheckCircle, Server, Cloud, ArrowRight, Users, Eye, AlarmClock, Zap, Database, RefreshCw, PlayCircle } from 'lucide-react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import DomainBackground from '../components/common/DomainBackground';

const RansomwarePage = () => {
  const nistFunctions = [
    {
      icon: Eye,
      title: 'Identify',
      description: 'Asset management and risk assessment',
      capabilities: [
        'Automated asset discovery and inventory',
        'Risk assessment for ransomware vulnerabilities',
        'Supply chain risk management',
        'Data classification and prioritization',
      ],
    },
    {
      icon: Shield,
      title: 'Protect',
      description: 'Implement safeguards to ensure delivery of services',
      capabilities: [
        'Multi-factor authentication enforcement',
        'Zero trust architecture implementation',
        'Email security and phishing protection',
        'Endpoint protection and application controls',
      ],
    },
    {
      icon: AlarmClock,
      title: 'Detect',
      description: 'Identify ransomware activity through monitoring',
      capabilities: [
        'Behavioral-based ransomware detection',
        'Anomaly and threat detection',
        'Continuous monitoring capabilities',
        'Security information and event management',
      ],
    },
    {
      icon: Zap,
      title: 'Respond',
      description: 'Take action when ransomware is detected',
      capabilities: [
        'Automated containment protocols',
        'Incident response playbooks',
        'Forensic analysis tools',
        'Stakeholder communication templates',
      ],
    },
    {
      icon: RefreshCw,
      title: 'Recover',
      description: 'Restore capabilities and services after an incident',
      capabilities: [
        'Immutable backup implementation',
        'Air-gapped recovery systems',
        'Business continuity plans',
        'Post-incident analysis tools',
      ],
    },
    {
      icon: Users,
      title: 'Govern',
      description: 'Develop organizational cybersecurity strategy',
      capabilities: [
        'Executive ransomware readiness dashboard',
        'Security policy management',
        'Cyber risk governance framework',
        'Compliance and regulatory mapping',
      ],
    },
  ];

  const technicalControls = [
    {
      icon: Database,
      title: 'Data Resilience',
      features: [
        { name: '3-2-1 Backup Strategy', status: 'essential' },
        { name: 'Immutable Backups', status: 'essential' },
        { name: 'Air-Gapped Storage', status: 'essential' },
        { name: 'Automated Verification', status: 'recommended' },
      ]
    },
    {
      icon: Cloud,
      title: 'Infrastructure Security',
      features: [
        { name: 'Network Segmentation', status: 'essential' },
        { name: 'Privileged Access Management', status: 'essential' },
        { name: 'Secure Remote Access', status: 'essential' },
        { name: 'Cloud Security Posture Management', status: 'recommended' },
      ]
    },
    {
      icon: Lock,
      title: 'Access Controls',
      features: [
        { name: 'Multi-Factor Authentication', status: 'essential' },
        { name: 'Least Privilege Principles', status: 'essential' },
        { name: 'Identity Management', status: 'essential' },
        { name: 'Just-in-Time Access', status: 'recommended' },
      ]
    },
    {
      icon: Eye,
      title: 'Monitoring & Detection',
      features: [
        { name: 'EDR/XDR Solutions', status: 'essential' },
        { name: 'Behavioral Analysis', status: 'essential' },
        { name: 'Network Traffic Analysis', status: 'recommended' },
        { name: 'Threat Hunting', status: 'advanced' },
      ]
    }
  ];

  const frameworkAlignments = [
    { 
      name: 'NIST CSF 2.0', 
      compliance: '98%',
      key: 'Added Govern function with focus on cyber risk oversight'
    },
    { 
      name: 'ISO 27001 & 27032', 
      compliance: '95%',
      key: 'Emphasis on security controls and cyber resilience'
    },
    { 
      name: 'CISA Shields Up', 
      compliance: '100%',
      key: 'Focused on reducing attack surface and improving resilience'
    },
    { 
      name: 'CIS Controls v8', 
      coverage: '96%',
      key: 'Implementation Groups approach for prioritized controls'
    },
  ];

  const ransomwareReadinessChecklist = [
    { 
      category: 'Preparation',
      items: [
        'Cybersecurity awareness training for all staff',
        'Regular phishing simulations',
        'Ransomware-specific incident response plan',
        'Tested backup and recovery procedures'
      ]
    },
    { 
      category: 'Prevention',
      items: [
        'Endpoint protection deployed to all systems',
        'Email security gateway with advanced filtering',
        'Multi-factor authentication for all users',
        'Software patch management process'
      ]
    },
    { 
      category: 'Detection',
      items: [
        '24/7 security monitoring',
        'File integrity monitoring',
        'Anomalous behavior detection',
        'Regular vulnerability scanning'
      ]
    },
    { 
      category: 'Response',
      items: [
        'Automated containment capabilities',
        'Forensic investigation tools',
        'External communication plan',
        'Law enforcement contact procedures'
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-gray-800">
      {/* Hero Section */}
      <div className="relative bg-gradient-to-r from-blue-600 to-blue-800 dark:from-blue-900 dark:to-blue-700 overflow-hidden">
        <DomainBackground color="59, 130, 246" secondaryColor="29, 78, 216" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 relative z-10">
          <div className="text-center">
            <motion.h1 
              className="text-4xl font-bold text-white mb-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              Ransomware Defense
            </motion.h1>
            <motion.p 
              className="text-xl text-blue-100 max-w-3xl mx-auto mb-8"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              Comprehensive ransomware defense aligned with NIST CSF 2.0 and CISA guidelines. Build resilience through proven frameworks and strategic defense planning.
            </motion.p>
            <motion.div 
              className="flex justify-center space-x-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              <Link 
                to="/ransomware-assessment" 
                className="px-8 py-3 bg-white text-blue-600 rounded-lg font-medium hover:bg-blue-50 transition-colors"
              >
                Start Assessment
              </Link>
              <Link 
                to="/dashboard" 
                className="px-8 py-3 bg-blue-500 text-white rounded-lg font-medium hover:bg-blue-600 transition-colors flex items-center"
              >
                View Dashboard
              </Link>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Assessment CTA Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-100 dark:border-blue-800 p-6 shadow-md"
        >
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
            <div className="flex items-start gap-4">
              <div className="bg-blue-100 dark:bg-blue-900/50 p-3 rounded-lg">
                <Shield className="h-10 w-10 text-blue-600 dark:text-blue-400" />
              </div>
              <div>
                <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                  Governance Intelligence for Ransomware Resilience
                </h2>
                <p className="text-gray-600 dark:text-gray-300">
                  Leverage executive intelligence and governance orchestration to build comprehensive ransomware resilience across your organization with AI-powered insights from the ERMITS ecosystem.
                </p>
              </div>
            </div>
            <Link
              to="/ransomware-assessment"
              className="inline-flex items-center justify-center px-6 py-3 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 transition-colors shadow-sm"
            >
              Launch Governance Assessment
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </div>
        </motion.div>
      </div>

      {/* NIST CSF 2.0 Framework Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
            NIST CSF 2.0 Ransomware Framework
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Comprehensive ransomware defense across all six NIST CSF 2.0 functions with integrated governance and compliance tracking
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {nistFunctions.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8 h-full"
              >
                <Icon className="h-12 w-12 text-blue-600 dark:text-blue-400 mb-6" />
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                  {feature.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-300 mb-6">
                  {feature.description}
                </p>
                <ul className="space-y-3">
                  {feature.capabilities.map((capability) => (
                    <li key={capability} className="flex items-center text-gray-700 dark:text-gray-300">
                      <CheckCircle className="h-5 w-5 text-green-500 mr-3 flex-shrink-0" />
                      {capability}
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
              Essential Ransomware Controls
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              Critical technical controls for ransomware prevention, detection, and recovery based on NIST and CISA guidance
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
                  <control.icon className="h-10 w-10 text-blue-600 dark:text-blue-400 mr-4" />
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

      {/* Framework Alignment Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
            Framework Alignment
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Ransomware defense controls mapped across multiple security frameworks for comprehensive coverage
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {frameworkAlignments.map((framework, index) => (
            <motion.div
              key={framework.name}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 text-center h-full"
            >
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                {framework.name}
              </h3>
              <div className="text-3xl font-bold text-blue-600 dark:text-blue-400 mb-4">
                {framework.compliance || framework.coverage}
              </div>
              <p className="text-sm text-gray-600 dark:text-gray-300">
                {framework.key}
              </p>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Ransomware Readiness Checklist */}
      <div className="bg-gray-50 dark:bg-gray-900 py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
              Ransomware Readiness Checklist
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              Essential activities to build comprehensive ransomware resilience across your organization
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {ransomwareReadinessChecklist.map((category, index) => (
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
              Regional Ransomware Regulations
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-300 mb-8">
              Adapt to regional ransomware reporting requirements and regulatory frameworks
            </p>
            
            <div className="space-y-6">
              <div className="border-l-4 border-blue-500 pl-4 py-2">
                <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-1">
                  European Union
                </h3>
                <p className="text-gray-600 dark:text-gray-300">
                  NIS2 Directive compliance with 72-hour ransomware incident reporting requirements
                </p>
              </div>
              
              <div className="border-l-4 border-blue-500 pl-4 py-2">
                <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-1">
                  North America
                </h3>
                <p className="text-gray-600 dark:text-gray-300">
                  CISA ransomware guidelines and FBI IC3 reporting with state breach notification laws
                </p>
              </div>
              
              <div className="border-l-4 border-blue-500 pl-4 py-2">
                <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-1">
                  Asia Pacific
                </h3>
                <p className="text-gray-600 dark:text-gray-300">
                  Regional cyber authority ransomware reporting with local incident disclosure timelines
                </p>
              </div>
              
              <div className="border-l-4 border-blue-500 pl-4 py-2">
                <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-1">
                  Latin America
                </h3>
                <p className="text-gray-600 dark:text-gray-300">
                  Emerging ransomware legislation compliance and cross-border incident coordination
                </p>
              </div>
            </div>
          </div>
          
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8">
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-6">
              Why Regional Adaptation Matters
            </h3>
            
            <div className="space-y-5">
              <div className="flex items-start">
                <AlertTriangle className="h-6 w-6 text-yellow-500 mr-4 flex-shrink-0 mt-1" />
                <div>
                  <h4 className="font-medium text-gray-900 dark:text-white">
                    Reporting Requirements
                  </h4>
                  <p className="text-sm text-gray-600 dark:text-gray-300">
                    Different regions have varying mandatory reporting timelines and authorities
                  </p>
                </div>
              </div>
              
              <div className="flex items-start">
                <AlertTriangle className="h-6 w-6 text-yellow-500 mr-4 flex-shrink-0 mt-1" />
                <div>
                  <h4 className="font-medium text-gray-900 dark:text-white">
                    Legal Implications
                  </h4>
                  <p className="text-sm text-gray-600 dark:text-gray-300">
                    Regulatory penalties and legal exposure vary by jurisdiction
                  </p>
                </div>
              </div>
              
              <div className="flex items-start">
                <AlertTriangle className="h-6 w-6 text-yellow-500 mr-4 flex-shrink-0 mt-1" />
                <div>
                  <h4 className="font-medium text-gray-900 dark:text-white">
                    Industry Regulations
                  </h4>
                  <p className="text-sm text-gray-600 dark:text-gray-300">
                    Sector-specific requirements create compliance complexity
                  </p>
                </div>
              </div>
              
              <div className="flex items-start">
                <AlertTriangle className="h-6 w-6 text-yellow-500 mr-4 flex-shrink-0 mt-1" />
                <div>
                  <h4 className="font-medium text-gray-900 dark:text-white">
                    Data Sovereignty
                  </h4>
                  <p className="text-sm text-gray-600 dark:text-gray-300">
                    Backup and recovery must adhere to data residency laws
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* CTA Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
        <div className="bg-blue-600 dark:bg-blue-700 rounded-2xl p-12 text-center relative overflow-hidden">
          <DomainBackground color="59, 130, 246" secondaryColor="29, 78, 216" />
          <div className="relative z-10">
            <h2 className="text-3xl font-bold text-white mb-6">
              Ready to strengthen ransomware defenses?
            </h2>
            <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
              Build comprehensive ransomware resilience with NIST CSF 2.0 aligned controls and proven defense strategies.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link 
                to="/ransomware-assessment" 
                className="px-8 py-3 bg-white text-blue-600 rounded-lg font-medium hover:bg-blue-50 transition-colors"
              >
                Start Assessment
              </Link>
              <Link 
                to="/dashboard" 
                className="px-8 py-3 bg-blue-500 border border-blue-400 text-white rounded-lg font-medium hover:bg-blue-600 transition-colors flex items-center"
              >
                View Dashboard
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RansomwarePage;