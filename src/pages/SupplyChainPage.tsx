import React from 'react';
import { Box, Shield, Users, GitBranch, ArrowRight, CheckCircle, AlertTriangle, BarChart, FileText, Eye, Lock, GitPullRequest, Truck, Search, UserCheck } from 'lucide-react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import DomainBackground from '../components/common/DomainBackground';

const SupplyChainPage = () => {
  const frameworkCategories = [
    {
      icon: Box,
      title: 'Supplier Assessment',
      description: 'Evaluating and qualifying third-party vendors',
      capabilities: [
        'Pre-qualification risk assessment',
        'Security questionnaire automation',
        'Documentation collection & verification',
        'Continuous monitoring framework',
      ],
    },
    {
      icon: GitBranch,
      title: 'Supply Chain Mapping',
      description: 'Visualizing and analyzing your supply network',
      capabilities: [
        'End-to-end supply chain visibility',
        'Dependency mapping and analysis',
        'Critical path identification',
        'Bottleneck and single-point-of-failure detection',
      ],
    },
    {
      icon: Shield,
      title: 'Secure Sourcing',
      description: 'Ensuring secure acquisition processes',
      capabilities: [
        'Supplier security requirements',
        'Provenance verification',
        'Counterfeit prevention',
        'Secure contracting procedures',
      ],
    },
    {
      icon: Users,
      title: 'Third-Party Governance',
      description: 'Managing external relationships securely',
      capabilities: [
        'Vendor risk classification',
        'Compliance verification',
        'Performance monitoring',
        'Service level management',
      ],
    },
    {
      icon: GitPullRequest,
      title: 'Secure Development',
      description: 'Integrating security into development workflows',
      capabilities: [
        'Secure code repositories',
        'Component analysis',
        'Build system security',
        'Integrity verification',
      ],
    },
    {
      icon: Truck,
      title: 'Secure Delivery',
      description: 'Protecting the distribution process',
      capabilities: [
        'Secure logistics management',
        'Chain of custody verification',
        'Tamper-evident packaging',
        'Delivery validation',
      ],
    },
  ];

  const technicalControls = [
    {
      icon: Search,
      title: 'Supplier Analysis',
      features: [
        { name: 'Automated Security Questionnaires', status: 'essential' },
        { name: 'Supplier Risk Scoring', status: 'essential' },
        { name: 'Financial Stability Assessment', status: 'recommended' },
        { name: 'Fourth-Party Risk Analysis', status: 'advanced' },
      ]
    },
    {
      icon: Shield,
      title: 'Security Controls',
      features: [
        { name: 'Secure Access Management', status: 'essential' },
        { name: 'Data Transfer Controls', status: 'essential' },
        { name: 'Vulnerability Management', status: 'essential' },
        { name: 'Container Security', status: 'recommended' },
      ]
    },
    {
      icon: FileText,
      title: 'Documentation',
      features: [
        { name: 'Security Requirements', status: 'essential' },
        { name: 'Evidence Collection', status: 'essential' },
        { name: 'Compliance Attestations', status: 'recommended' },
        { name: 'Audit Reports Management', status: 'recommended' },
      ]
    },
    {
      icon: Eye,
      title: 'Monitoring',
      features: [
        { name: 'Continuous Control Monitoring', status: 'essential' },
        { name: 'Breach Notification System', status: 'essential' },
        { name: 'Operational Disruption Alerts', status: 'recommended' },
        { name: 'Geopolitical Risk Tracking', status: 'advanced' },
      ]
    }
  ];

  const frameworks = [
    { 
      name: 'NIST SP 800-161 Rev. 1', 
      compliance: '95%',
      key: 'Supply Chain Risk Management Practices'
    },
    { 
      name: 'ISO 28000', 
      compliance: '92%',
      key: 'Supply Chain Security Management Systems'
    },
    { 
      name: 'C-TPAT & AEO', 
      compliance: '98%',
      key: 'Customs-Trade Partnership Against Terrorism'
    },
    { 
      name: 'CMMC 2.0', 
      coverage: '94%',
      key: 'Cybersecurity Maturity Model Certification'
    },
  ];

  const supplyChainCheckList = [
    { 
      category: 'Risk Assessment',
      items: [
        'Third-party risk assessment program',
        'Supply chain vulnerability mapping',
        'Critical supplier identification',
        'Geopolitical risk analysis'
      ]
    },
    { 
      category: 'Governance',
      items: [
        'Supply chain security policy',
        'Vendor management procedures',
        'Security requirements in contracts',
        'Executive oversight program'
      ]
    },
    { 
      category: 'Verification',
      items: [
        'Supplier security assessment process',
        'Compliance verification procedures',
        'Component authenticity validation',
        'Evidence collection system'
      ]
    },
    { 
      category: 'Monitoring',
      items: [
        'Continuous monitoring program',
        'Incident reporting channels',
        'Performance metrics tracking',
        'External threat intelligence'
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-gray-800">
      {/* Hero Section */}
      <div className="relative bg-gradient-to-r from-purple-600 to-purple-800 dark:from-purple-900 dark:to-purple-700">
        <DomainBackground color="147, 51, 234" secondaryColor="126, 34, 206" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 relative z-10">
          <div className="text-center">
            <motion.h1 
              className="text-4xl font-bold text-white mb-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              Supply Chain Security
            </motion.h1>
            <motion.p 
              className="text-xl text-purple-100 max-w-3xl mx-auto mb-8"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              Comprehensive supply chain security management aligned with NIST SP 800-161 and ISO 28000. Manage vendor ecosystems and third-party risks with proven frameworks.
            </motion.p>
            <motion.div 
              className="flex justify-center space-x-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              <Link 
                to="/dashboard" 
                className="px-8 py-3 bg-white text-purple-600 rounded-lg font-medium hover:bg-purple-50 transition-colors"
              >
                View Dashboard
              </Link>
              <Link 
                to="/intelligence" 
                className="px-8 py-3 border border-white text-white rounded-lg font-medium hover:bg-white/10 transition-colors"
              >
                Intelligence Engine
              </Link>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Framework Categories */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
            Supply Chain Security Framework
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Comprehensive supply chain risk management aligned with NIST SP 800-161 and ISO 28000 frameworks
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {frameworkCategories.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8 h-full"
              >
                <Icon className="h-12 w-12 text-purple-600 dark:text-purple-400 mb-6" />
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
              Essential Supply Chain Controls
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              Critical controls for supply chain security based on NIST SP 800-161 and industry best practices
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
                  <control.icon className="h-10 w-10 text-purple-600 dark:text-purple-400 mr-4" />
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
            Framework Coverage
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Supply chain security controls mapped across multiple standards and regulations for comprehensive coverage
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {frameworks.map((framework, index) => (
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
              <div className="text-3xl font-bold text-purple-600 dark:text-purple-400 mb-4">
                {framework.compliance || framework.coverage}
              </div>
              <p className="text-sm text-gray-600 dark:text-gray-300">
                {framework.key}
              </p>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Supply Chain Security Checklist */}
      <div className="bg-gray-50 dark:bg-gray-900 py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
              Supply Chain Security Checklist
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              Essential activities to build comprehensive supply chain risk management across your organization
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {supplyChainCheckList.map((category, index) => (
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
              Regional Supply Chain Regulations
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-300 mb-8">
              Navigate regional supply chain security regulations and compliance requirements
            </p>
            
            <div className="space-y-6">
              <div className="border-l-4 border-purple-500 pl-4 py-2">
                <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-1">European Union</h3>
                <p className="text-gray-600 dark:text-gray-300">EU Supply Chain Due Diligence Directive and critical infrastructure supplier security requirements</p>
              </div>
              
              <div className="border-l-4 border-purple-500 pl-4 py-2">
                <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-1">North America</h3>
                <p className="text-gray-600 dark:text-gray-300">CISA ICT supply chain guidance, NIST SP 800-161, and CMMC 2.0 supplier requirements</p>
              </div>
              
              <div className="border-l-4 border-purple-500 pl-4 py-2">
                <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-1">Asia Pacific</h3>
                <p className="text-gray-600 dark:text-gray-300">Regional supplier security standards and cross-border trade security requirements</p>
              </div>
              
              <div className="border-l-4 border-purple-500 pl-4 py-2">
                <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-1">Latin America</h3>
                <p className="text-gray-600 dark:text-gray-300">Emerging supply chain security standards and international trade controls</p>
              </div>
            </div>
          </div>
          
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8">
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-6">
              Emerging Supply Chain Challenges
            </h3>
            
            <div className="space-y-5">
              <div className="flex items-start">
                <AlertTriangle className="h-6 w-6 text-yellow-500 mr-4 flex-shrink-0 mt-1" />
                <div>
                  <h4 className="font-medium text-gray-900 dark:text-white">Digital Supply Chain</h4>
                  <p className="text-sm text-gray-600 dark:text-gray-300">Software composition analysis and digital dependency management</p>
                </div>
              </div>
              
              <div className="flex items-start">
                <AlertTriangle className="h-6 w-6 text-yellow-500 mr-4 flex-shrink-0 mt-1" />
                <div>
                  <h4 className="font-medium text-gray-900 dark:text-white">Geopolitical Shifts</h4>
                  <p className="text-sm text-gray-600 dark:text-gray-300">Managing regional tensions and disruptions to global supply chains</p>
                </div>
              </div>
              
              <div className="flex items-start">
                <AlertTriangle className="h-6 w-6 text-yellow-500 mr-4 flex-shrink-0 mt-1" />
                <div>
                  <h4 className="font-medium text-gray-900 dark:text-white">ESG Requirements</h4>
                  <p className="text-sm text-gray-600 dark:text-gray-300">Environmental, social, and governance compliance in supply chains</p>
                </div>
              </div>
              
              <div className="flex items-start">
                <AlertTriangle className="h-6 w-6 text-yellow-500 mr-4 flex-shrink-0 mt-1" />
                <div>
                  <h4 className="font-medium text-gray-900 dark:text-white">Artificial Intelligence</h4>
                  <p className="text-sm text-gray-600 dark:text-gray-300">Managing security risks in AI-enhanced supply chain systems</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
        <div className="bg-purple-600 dark:bg-purple-700 rounded-2xl p-12 text-center relative overflow-hidden">
          <DomainBackground color="147, 51, 234" secondaryColor="126, 34, 206" />
          <div className="relative z-10">
            <h2 className="text-3xl font-bold text-white mb-6">
              Ready to secure your supply chain?
            </h2>
            <p className="text-xl text-purple-100 mb-8 max-w-2xl mx-auto">
              Build comprehensive supply chain security with NIST SP 800-161 aligned controls and proven risk management practices.
            </p>
            <div className="flex justify-center space-x-4">
              <Link 
                to="/dashboard" 
                className="px-8 py-3 bg-white text-purple-600 rounded-lg font-medium hover:bg-purple-50 transition-colors"
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

export default SupplyChainPage;