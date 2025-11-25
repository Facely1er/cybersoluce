import React from 'react';
import { motion } from 'framer-motion';
import { Users, Shield, Globe, HeartHandshake as Handshake, TrendingUp, Award, CheckCircle, ArrowRight, Building, Zap, Target, Star, Briefcase, Code, HeadphonesIcon, DollarSign, Clock, MessageSquare, ExternalLink, Mail, Phone } from 'lucide-react';
import { Link } from 'react-router-dom';
import DomainBackground from '../components/common/DomainBackground';

const PartnerPage = () => {
  const fadeInUp = {
    hidden: { opacity: 0, y: 40 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8 } }
  };

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  const partnerTypes = [
    {
      icon: Building,
      title: 'Technology Partners',
      description: 'Integrate your security solutions with our governance platform',
      benefits: [
        'API access and documentation',
        'Technical integration support',
        'Joint go-to-market opportunities',
        'Co-innovation programs'
      ],
      requirements: [
        'Proven security technology',
        'API-first architecture',
        'SOC 2 Type II certification',
        'Technical partnership team'
      ]
    },
    {
      icon: Users,
      title: 'Channel Partners',
      description: 'Resell CyberSoluce to your customer base',
      benefits: [
        'Competitive partner margins',
        'Sales enablement training',
        'Marketing development funds',
        'Lead sharing programs'
      ],
      requirements: [
        'Cybersecurity expertise',
        'Established customer base',
        'Sales and support capabilities',
        'Partner certification completion'
      ]
    },
    {
      icon: Briefcase,
      title: 'Consulting Partners',
      description: 'Deliver CyberSoluce implementations and services',
      benefits: [
        'Implementation methodology',
        'Professional services training',
        'Referral commissions',
        'Technical support access'
      ],
      requirements: [
        'Cybersecurity consulting experience',
        'Certified security professionals',
        'Implementation track record',
        'Customer success focus'
      ]
    },
    {
      icon: Code,
      title: 'System Integrators',
      description: 'Build custom integrations and enterprise solutions',
      benefits: [
        'Advanced API access',
        'White-label options',
        'Custom development support',
        'Enterprise sales collaboration'
      ],
      requirements: [
        'Enterprise integration experience',
        'DevOps and security expertise',
        'Large enterprise customer base',
        'Technical certification required'
      ]
    }
  ];

  const partnerBenefits = [
    {
      icon: TrendingUp,
      title: 'Revenue Growth',
      description: 'Expand your revenue streams with our growing cybersecurity governance market',
      metrics: { value: '40%', label: 'Average Revenue Increase' }
    },
    {
      icon: Shield,
      title: 'Market Leadership',
      description: 'Position yourself as a leader in next-generation cybersecurity governance',
      metrics: { value: '95%', label: 'Customer Satisfaction' }
    },
    {
      icon: Target,
      title: 'Competitive Edge',
      description: 'Differentiate with AI-powered governance intelligence and framework fusion',
      metrics: { value: '300%', label: 'Faster Deal Closure' }
    },
    {
      icon: Globe,
      title: 'Global Reach',
      description: 'Access our worldwide customer base and regional market opportunities',
      metrics: { value: '50+', label: 'Countries Served' }
    }
  ];

  const integrationCapabilities = [
    {
      category: 'ERMITS Ecosystem',
      tools: [
        { name: 'ThreatIntel™', description: 'Threat intelligence correlation', status: 'available' },
        { name: 'CyberCorrect™', description: 'Compliance management integration', status: 'available' },
        { name: 'VendorRisk™', description: 'Supply chain risk data', status: 'available' },
        { name: 'EduSoluce™', description: 'Training effectiveness metrics', status: 'available' }
      ]
    },
    {
      category: 'Security Tools',
      tools: [
        { name: 'SIEM Platforms', description: 'Security monitoring integration', status: 'available' },
        { name: 'Vulnerability Scanners', description: 'Automated risk assessment', status: 'available' },
        { name: 'GRC Platforms', description: 'Governance workflow sync', status: 'available' },
        { name: 'Cloud Security', description: 'Cloud posture management', status: 'development' }
      ]
    },
    {
      category: 'Enterprise Systems',
      tools: [
        { name: 'Active Directory', description: 'Identity management sync', status: 'available' },
        { name: 'ServiceNow', description: 'ITSM workflow integration', status: 'available' },
        { name: 'Salesforce', description: 'CRM and opportunity tracking', status: 'available' },
        { name: 'Microsoft 365', description: 'Productivity suite integration', status: 'available' }
      ]
    }
  ];

  const partnerResources = [
    {
      icon: Award,
      title: 'Certification Program',
      description: 'Comprehensive training and certification for partner teams',
      actions: ['Technical certification', 'Sales enablement', 'Marketing certification']
    },
    {
      icon: Code,
      title: 'Developer Portal',
      description: 'Complete API documentation and integration tools',
      actions: ['API documentation', 'SDK downloads', 'Code samples']
    },
    {
      icon: HeadphonesIcon,
      title: 'Partner Support',
      description: 'Dedicated support team for partner success',
      actions: ['Technical support', 'Sales assistance', 'Marketing resources']
    },
    {
      icon: TrendingUp,
      title: 'Co-Marketing',
      description: 'Joint marketing initiatives and demand generation',
      actions: ['Case studies', 'Webinars', 'Trade shows']
    }
  ];

  const successStories = [
    {
      partner: 'SecureConsult Group',
      industry: 'Consulting',
      challenge: 'Needed a comprehensive governance platform for enterprise clients',
      solution: 'Integrated CyberSoluce as core governance offering',
      results: [
        '60% increase in engagement value',
        '40% faster client onboarding',
        '25 new enterprise accounts'
      ]
    },
    {
      partner: 'TechSecure Solutions',
      industry: 'Technology',
      challenge: 'Required framework mapping capabilities for compliance automation',
      solution: 'Built API integration with Framework Fusion Technology™',
      results: [
        '300% improvement in automation',
        '50% reduction in compliance overhead',
        '95% customer retention rate'
      ]
    },
    {
      partner: 'GlobalRisk Advisors',
      industry: 'Risk Management',
      challenge: 'Clients needed executive-level cybersecurity intelligence',
      solution: 'Leveraged Intelligence Engine™ for strategic consulting',
      results: [
        '80% increase in advisory revenue',
        '35% improvement in client outcomes',
        'Board-level engagement expansion'
      ]
    }
  ];

  return (
      <div className="w-full">
        {/* Hero Section */}
        <section className="relative bg-gradient-to-r from-command-blue-600 to-action-cyan-600 py-24">
          <DomainBackground color="0, 91, 150" secondaryColor="51, 161, 222" />
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-center"
            >
              <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
                Partner with CyberSoluce™
              </h1>
              <p className="text-xl text-command-blue-100 max-w-4xl mx-auto mb-8">
                Join our ecosystem and deliver next-generation cybersecurity governance solutions. Transform how organizations approach security with AI-powered intelligence and strategic framework orchestration.
              </p>
              <div className="flex flex-col sm:flex-row justify-center gap-4">
                <Link 
                  to="/contact"
                  className="px-8 py-3 bg-white text-command-blue-700 rounded-lg font-medium hover:bg-command-blue-50 transition-colors shadow-lg"
                >
                  Become a Partner
                </Link>
                <a 
                  href="mailto:partners@ermits.com"
                  className="px-8 py-3 border border-white text-white rounded-lg font-medium hover:bg-white/10 transition-colors"
                >
                  Partner Portal Login
                </a>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Partner Types */}
        <section className="py-20 bg-white dark:bg-gray-800">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div 
              variants={fadeInUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
                Partnership Opportunities
              </h2>
              <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
                Multiple pathways to success in the cybersecurity governance market
              </p>
            </motion.div>

            <motion.div 
              variants={staggerContainer}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="grid grid-cols-1 md:grid-cols-2 gap-8"
            >
              {partnerTypes.map((type, index) => {
                const Icon = type.icon;
                return (
                  <motion.div
                    key={type.title}
                    variants={fadeInUp}
                    whileHover={{ y: -8, boxShadow: '0 20px 40px -8px rgba(0, 91, 150, 0.3)' }}
                    className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8 border border-gray-200 dark:border-gray-700"
                  >
                    <div className="flex items-center mb-6">
                      <div className="bg-command-blue-100 dark:bg-command-blue-900/30 p-3 rounded-xl mr-4">
                        <Icon className="h-8 w-8 text-command-blue-600 dark:text-command-blue-400" />
                      </div>
                      <div>
                        <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                          {type.title}
                        </h3>
                        <p className="text-gray-600 dark:text-gray-300">
                          {type.description}
                        </p>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <h4 className="font-semibold text-gray-900 dark:text-white mb-3">Benefits</h4>
                        <ul className="space-y-2">
                          {type.benefits.map((benefit, idx) => (
                            <li key={idx} className="flex items-start text-sm">
                              <CheckCircle className="h-4 w-4 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                              <span className="text-gray-700 dark:text-gray-300">{benefit}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                      
                      <div>
                        <h4 className="font-semibold text-gray-900 dark:text-white mb-3">Requirements</h4>
                        <ul className="space-y-2">
                          {type.requirements.map((requirement, idx) => (
                            <li key={idx} className="flex items-start text-sm">
                              <Star className="h-4 w-4 text-command-blue-500 mr-2 mt-0.5 flex-shrink-0" />
                              <span className="text-gray-700 dark:text-gray-300">{requirement}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>

                    <div className="mt-6 pt-6 border-t border-gray-200 dark:border-gray-700">
                      <Link
                        to="/contact"
                        className="inline-flex items-center text-command-blue-600 dark:text-command-blue-400 hover:text-command-blue-800 dark:hover:text-command-blue-300 font-medium"
                      >
                        Learn More
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </Link>
                    </div>
                  </motion.div>
                );
              })}
            </motion.div>
          </div>
        </section>

        {/* Partner Benefits */}
        <section className="py-20 bg-gray-50 dark:bg-gray-900">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div 
              variants={fadeInUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
                Why Partner with CyberSoluce™?
              </h2>
              <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
                Transform your business with the leading cybersecurity governance platform
              </p>
            </motion.div>

            <motion.div 
              variants={staggerContainer}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
            >
              {partnerBenefits.map((benefit, index) => {
                const Icon = benefit.icon;
                return (
                  <motion.div
                    key={benefit.title}
                    variants={fadeInUp}
                    whileHover={{ y: -5 }}
                    className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 text-center"
                  >
                    <div className="bg-command-blue-100 dark:bg-command-blue-900/30 p-4 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-6">
                      <Icon className="h-8 w-8 text-command-blue-600 dark:text-command-blue-400" />
                    </div>
                    <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-3">
                      {benefit.title}
                    </h3>
                    <p className="text-gray-600 dark:text-gray-300 mb-4">
                      {benefit.description}
                    </p>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-command-blue-600 dark:text-command-blue-400">
                        {benefit.metrics.value}
                      </div>
                      <div className="text-sm text-gray-500 dark:text-gray-400">
                        {benefit.metrics.label}
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </motion.div>
          </div>
        </section>

        {/* Integration Capabilities */}
        <section className="py-20 bg-white dark:bg-gray-800">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div 
              variants={fadeInUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
                Integration Ecosystem
              </h2>
              <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
                Connect with leading cybersecurity tools and enterprise platforms
              </p>
            </motion.div>

            <motion.div 
              variants={staggerContainer}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="grid grid-cols-1 lg:grid-cols-3 gap-8"
            >
              {integrationCapabilities.map((category, index) => (
                <motion.div
                  key={category.category}
                  variants={fadeInUp}
                  className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 border border-gray-200 dark:border-gray-700"
                >
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-6 border-b border-gray-200 dark:border-gray-700 pb-3">
                    {category.category}
                  </h3>
                  <div className="space-y-4">
                    {category.tools.map((tool, toolIndex) => (
                      <div key={toolIndex} className="flex items-center justify-between">
                        <div className="flex-1">
                          <h4 className="font-medium text-gray-900 dark:text-white text-sm">
                            {tool.name}
                          </h4>
                          <p className="text-xs text-gray-600 dark:text-gray-400">
                            {tool.description}
                          </p>
                        </div>
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                          tool.status === 'available' 
                            ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300'
                            : 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300'
                        }`}>
                          {tool.status}
                        </span>
                      </div>
                    ))}
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* Success Stories */}
        <section className="py-20 bg-gray-50 dark:bg-gray-900">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div 
              variants={fadeInUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
                Partner Success Stories
              </h2>
              <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
                See how our partners are transforming cybersecurity governance for their clients
              </p>
            </motion.div>

            <motion.div 
              variants={staggerContainer}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="grid grid-cols-1 lg:grid-cols-3 gap-8"
            >
              {successStories.map((story, index) => (
                <motion.div
                  key={story.partner}
                  variants={fadeInUp}
                  whileHover={{ y: -5 }}
                  className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8"
                >
                  <div className="mb-6">
                    <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">
                      {story.partner}
                    </h3>
                    <span className="inline-block px-3 py-1 bg-command-blue-100 dark:bg-command-blue-900/30 text-command-blue-800 dark:text-command-blue-300 rounded-full text-sm">
                      {story.industry}
                    </span>
                  </div>

                  <div className="space-y-4 mb-6">
                    <div>
                      <h4 className="font-medium text-gray-900 dark:text-white mb-2">Challenge</h4>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        {story.challenge}
                      </p>
                    </div>
                    
                    <div>
                      <h4 className="font-medium text-gray-900 dark:text-white mb-2">Solution</h4>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        {story.solution}
                      </p>
                    </div>
                  </div>

                  <div>
                    <h4 className="font-medium text-gray-900 dark:text-white mb-3">Results</h4>
                    <ul className="space-y-2">
                      {story.results.map((result, resultIndex) => (
                        <li key={resultIndex} className="flex items-start text-sm">
                          <TrendingUp className="h-4 w-4 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                          <span className="text-gray-700 dark:text-gray-300">{result}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* Partner Resources */}
        <section className="py-20 bg-white dark:bg-gray-800">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div 
              variants={fadeInUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
                Partner Resources & Support
              </h2>
              <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
                Comprehensive resources to ensure your success as a CyberSoluce partner
              </p>
            </motion.div>

            <motion.div 
              variants={staggerContainer}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
            >
              {partnerResources.map((resource, index) => {
                const Icon = resource.icon;
                return (
                  <motion.div
                    key={resource.title}
                    variants={fadeInUp}
                    whileHover={{ scale: 1.05 }}
                    className="bg-gray-50 dark:bg-gray-700 rounded-lg p-6 text-center"
                  >
                    <Icon className="h-12 w-12 text-command-blue-600 dark:text-command-blue-400 mx-auto mb-4" />
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                      {resource.title}
                    </h3>
                    <p className="text-gray-600 dark:text-gray-300 mb-4 text-sm">
                      {resource.description}
                    </p>
                    <ul className="space-y-1">
                      {resource.actions.map((action, actionIndex) => (
                        <li key={actionIndex} className="text-xs text-gray-500 dark:text-gray-400">
                          • {action}
                        </li>
                      ))}
                    </ul>
                  </motion.div>
                );
              })}
            </motion.div>
          </div>
        </section>

        {/* Partnership Process */}
        <section className="py-20 bg-gray-50 dark:bg-gray-900">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div 
              variants={fadeInUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
                Partnership Process
              </h2>
              <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
                Our streamlined onboarding process gets you up and running quickly
              </p>
            </motion.div>

            <div className="relative">
              <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-0.5 bg-command-blue-300 dark:bg-command-blue-700 hidden lg:block"></div>
              
              <motion.div 
                variants={staggerContainer}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                className="space-y-12"
              >
                {[
                  {
                    step: 1,
                    title: 'Application & Review',
                    description: 'Submit your partnership application with company details and partnership objectives',
                    timeline: '1-2 business days',
                    icon: MessageSquare
                  },
                  {
                    step: 2,
                    title: 'Technical Evaluation',
                    description: 'Technical team review and integration capability assessment',
                    timeline: '3-5 business days',
                    icon: Shield
                  },
                  {
                    step: 3,
                    title: 'Partnership Agreement',
                    description: 'Finalize partnership terms and sign the agreement',
                    timeline: '1-2 weeks',
                    icon: Handshake
                  },
                  {
                    step: 4,
                    title: 'Onboarding & Training',
                    description: 'Complete certification training and access partner resources',
                    timeline: '2-3 weeks',
                    icon: Award
                  },
                  {
                    step: 5,
                    title: 'Go-to-Market',
                    description: 'Launch partnership with marketing support and sales enablement',
                    timeline: 'Ongoing',
                    icon: TrendingUp
                  }
                ].map((item, index) => {
                  const Icon = item.icon;
                  return (
                    <motion.div
                      key={item.step}
                      variants={fadeInUp}
                      className={`flex items-center ${index % 2 === 0 ? 'lg:flex-row' : 'lg:flex-row-reverse'}`}
                    >
                      <div className={`flex-1 ${index % 2 === 0 ? 'lg:pr-8' : 'lg:pl-8'}`}>
                        <div className={`bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 max-w-md ${
                          index % 2 === 0 ? 'lg:ml-auto' : 'lg:mr-auto'
                        }`}>
                          <div className="flex items-center mb-4">
                            <div className="bg-command-blue-100 dark:bg-command-blue-900/30 p-2 rounded-lg mr-3">
                              <Icon className="h-6 w-6 text-command-blue-600 dark:text-command-blue-400" />
                            </div>
                            <div>
                              <h3 className="text-lg font-bold text-gray-900 dark:text-white">
                                Step {item.step}: {item.title}
                              </h3>
                            </div>
                          </div>
                          <p className="text-gray-600 dark:text-gray-300 mb-3">
                            {item.description}
                          </p>
                          <div className="flex items-center text-sm text-command-blue-600 dark:text-command-blue-400">
                            <Clock className="h-4 w-4 mr-2" />
                            {item.timeline}
                          </div>
                        </div>
                      </div>
                      
                      <div className="w-8 h-8 bg-command-blue-600 rounded-full border-4 border-white dark:border-gray-900 relative z-10 flex items-center justify-center hidden lg:flex">
                        <span className="text-white font-bold text-sm">{item.step}</span>
                      </div>
                      
                      <div className="flex-1 hidden lg:block"></div>
                    </motion.div>
                  );
                })}
              </motion.div>
            </div>
          </div>
        </section>

        {/* Partner Portal Preview */}
        <section className="py-20 bg-white dark:bg-gray-800">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <motion.div
                variants={fadeInUp}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
              >
                <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">
                  Partner Portal Access
                </h2>
                <p className="text-lg text-gray-600 dark:text-gray-300 mb-8 leading-relaxed">
                  Get exclusive access to our partner portal with comprehensive resources, training materials, and business development tools designed to accelerate your success.
                </p>
                
                <div className="space-y-4">
                  {[
                    'API documentation and integration guides',
                    'Sales training and certification materials',
                    'Marketing assets and co-branding resources',
                    'Technical support and escalation channels',
                    'Deal registration and opportunity management',
                    'Performance dashboards and analytics'
                  ].map((feature, index) => (
                    <motion.div
                      key={feature}
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: index * 0.1 }}
                      className="flex items-center"
                    >
                      <CheckCircle className="h-5 w-5 text-command-blue-600 dark:text-command-blue-400 mr-3 flex-shrink-0" />
                      <span className="text-gray-700 dark:text-gray-300">{feature}</span>
                    </motion.div>
                  ))}
                </div>
                
                <div className="mt-8">
                  <a
                    href="mailto:partners@ermits.com"
                    className="inline-flex items-center px-6 py-3 bg-command-blue-600 text-white rounded-lg font-medium hover:bg-command-blue-700 transition-colors"
                  >
                    Request Portal Access
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </a>
                </div>
              </motion.div>
              
              <motion.div
                variants={fadeInUp}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                className="bg-gradient-to-br from-command-blue-600 to-action-cyan-600 rounded-2xl p-8 text-white relative overflow-hidden"
              >
                <DomainBackground color="0, 91, 150" secondaryColor="51, 161, 222" />
                <div className="relative z-10">
                  <h3 className="text-2xl font-bold mb-6">Partner Portal Features</h3>
                  <div className="grid grid-cols-2 gap-6">
                    {[
                      { icon: Code, label: 'API Access' },
                      { icon: Award, label: 'Certifications' },
                      { icon: TrendingUp, label: 'Analytics' },
                      { icon: Users, label: 'Community' },
                      { icon: HeadphonesIcon, label: 'Support' },
                      { icon: DollarSign, label: 'Commissions' }
                    ].map((feature, index) => {
                      const Icon = feature.icon;
                      return (
                        <div key={feature.label} className="text-center">
                          <Icon className="h-8 w-8 text-action-cyan-300 mx-auto mb-2" />
                          <p className="text-sm text-command-blue-100">{feature.label}</p>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Contact Section */}
        <section className="py-20 bg-command-blue-600 relative">
          <DomainBackground color="0, 91, 150" secondaryColor="51, 161, 222" />
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <motion.div
                variants={fadeInUp}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                className="text-white"
              >
                <h2 className="text-3xl font-bold mb-6">
                  Ready to Partner with Us?
                </h2>
                <p className="text-xl text-command-blue-100 mb-8">
                  Join our growing ecosystem of partners and deliver cutting-edge cybersecurity governance solutions to your customers.
                </p>
                
                <div className="space-y-4">
                  <div className="flex items-center">
                    <Mail className="h-5 w-5 text-action-cyan-300 mr-3" />
                    <div>
                      <p className="font-medium">Partner Team</p>
                      <p className="text-command-blue-100">partners@ermits.com</p>
                    </div>
                  </div>
                  <div className="flex items-center">
                    <Phone className="h-5 w-5 text-action-cyan-300 mr-3" />
                    <div>
                      <p className="font-medium">Partner Hotline</p>
                      <p className="text-command-blue-100">+1 (240) 599-0102</p>
                    </div>
                  </div>
                </div>
              </motion.div>
              
              <motion.div
                variants={fadeInUp}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                className="bg-white dark:bg-gray-800 rounded-xl shadow-2xl p-8"
              >
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-6">
                  Start Your Partnership Journey
                </h3>
                
                <form className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <input
                      type="text"
                      placeholder="Company Name"
                      className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-command-blue-500 focus:border-command-blue-500 dark:bg-gray-700"
                      required
                    />
                    <input
                      type="text"
                      placeholder="Your Name"
                      className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-command-blue-500 focus:border-command-blue-500 dark:bg-gray-700"
                      required
                    />
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <input
                      type="email"
                      placeholder="Email Address"
                      className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-command-blue-500 focus:border-command-blue-500 dark:bg-gray-700"
                      required
                    />
                    <select
                      className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-command-blue-500 focus:border-command-blue-500 dark:bg-gray-700"
                      required
                    >
                      <option value="">Partnership Type</option>
                      <option value="technology">Technology Partner</option>
                      <option value="channel">Channel Partner</option>
                      <option value="consulting">Consulting Partner</option>
                      <option value="integration">System Integrator</option>
                    </select>
                  </div>
                  
                  <textarea
                    placeholder="Tell us about your partnership goals and how you'd like to work with CyberSoluce..."
                    rows={4}
                    className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-command-blue-500 focus:border-command-blue-500 dark:bg-gray-700"
                    required
                  ></textarea>
                  
                  <button
                    type="submit"
                    className="w-full px-6 py-3 bg-command-blue-600 text-white rounded-lg font-medium hover:bg-command-blue-700 transition-colors"
                  >
                    Submit Partnership Application
                  </button>
                </form>
                
                <p className="text-xs text-gray-500 dark:text-gray-400 text-center mt-4">
                  We'll review your application within 2 business days
                </p>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Partner Benefits Summary */}
        <section className="py-16 bg-gradient-to-r from-gray-900 to-command-blue-900">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div 
              variants={staggerContainer}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="grid grid-cols-1 md:grid-cols-4 gap-8 text-center"
            >
              {[
                { value: '500+', label: 'Organizations Served', icon: Building },
                { value: '99.5%', label: 'Partner Satisfaction', icon: Star },
                { value: '$2.5M+', label: 'Partner Revenue Generated', icon: DollarSign },
                { value: '24/7', label: 'Partner Support', icon: HeadphonesIcon }
              ].map((stat, index) => {
                const Icon = stat.icon;
                return (
                  <motion.div
                    key={stat.label}
                    variants={fadeInUp}
                    className="text-white"
                  >
                    <Icon className="h-10 w-10 text-action-cyan-300 mx-auto mb-4" />
                    <div className="text-3xl font-bold mb-2">{stat.value}</div>
                    <div className="text-command-blue-200">{stat.label}</div>
                  </motion.div>
                );
              })}
            </motion.div>
          </div>
        </section>
      </div>
  );
};

export default PartnerPage;