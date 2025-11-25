import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { useInView } from 'react-intersection-observer';
import { Book, FileText, Code, Globe, Shield, HelpCircle, Cog, Wrench, TestTube, AlertTriangle, Download, Users, Play, ExternalLink, ChevronRight } from 'lucide-react';
import SEOHead from '../components/common/SEOHead';
import { useAnalytics } from '../components/common/Analytics';
import NewsletterSignup from '../components/common/NewsletterSignup';

const ResourcesPage = () => {
  const { trackEvent, trackOutboundLink } = useAnalytics();
  const { ref: heroRef, inView: heroInView } = useInView({ 
    threshold: 0.1, 
    triggerOnce: true 
  });
  const documentationSections = [
    {
      title: 'Getting Started',
      description: 'Begin your security assessment journey',
      icon: Book,
      docs: [
        { title: 'Getting Started Guide', path: '/docs/getting-started', description: 'Quick start guide and basic concepts' },
        { title: 'Architecture Overview', path: '/docs/architecture', description: 'System design and technical architecture' },
        { title: 'Component Documentation', path: '/docs/components', description: 'UI component library reference' },
      ],
    },
    {
      title: 'Implementation',
      description: 'Detailed guides for deployment',
      icon: Code,
      docs: [
        { title: 'Implementation Guide', path: '/docs/implementation-guide', description: 'Step-by-step implementation process' },
        { title: 'Deployment Guide', path: '/docs/deployment', description: 'Environment configuration and deployment options' },
        { title: 'API Documentation', path: '/docs/api', description: 'API reference and integration patterns' },
      ],
    },
    {
      title: 'Security & Compliance',
      description: 'Security features and compliance guidance',
      icon: Shield,
      docs: [
        { title: 'Security Guide', path: '/docs/security', description: 'Security controls and best practices' },
        { title: 'Compliance Guide', path: '/docs/compliance-guide', description: 'Framework compliance and regulatory guidance' },
        { title: 'Regional Adaptation', path: '/docs/regional-adaptation', description: 'Region-specific implementations' },
      ],
    },
    {
      title: 'Customization',
      description: 'Platform customization and extension',
      icon: Cog,
      docs: [
        { title: 'Customization Guide', path: '/docs/customization', description: 'Adapting the platform to your needs' },
        { title: 'Testing Guide', path: '/docs/testing', description: 'Comprehensive testing methodologies' },
        { title: 'Troubleshooting', path: '/docs/troubleshooting', description: 'Common issues and solutions' },
      ],
    },
  ];

  const additionalResources = [
    {
      title: 'Webinars & Training',
      description: 'Educational content for users and administrators',
      icon: Play,
      items: [
        {
          title: 'Getting Started with CyberSoluce',
          description: '60-minute introduction to key platform features',
          date: 'On-demand',
          link: '#'
        },
        {
          title: 'Advanced Assessment Techniques',
          description: 'Deep dive into security assessment methodologies',
          date: 'Weekly on Thursdays',
          link: '#'
        },
        {
          title: 'Administrator Training',
          description: 'Complete training for platform administrators',
          date: 'Monthly on first Tuesday',
          link: '#'
        }
      ]
    },
    {
      title: 'Templates & Downloads',
      description: 'Ready-to-use assets and resources',
      icon: Download,
      items: [
        {
          title: 'Assessment Templates',
          description: 'Industry-specific assessment templates',
          type: 'ZIP Archive',
          link: '#'
        },
        {
          title: 'Implementation Checklist',
          description: 'Step-by-step implementation checklist',
          type: 'PDF Document',
          link: '#'
        },
        {
          title: 'Security Frameworks Reference',
          description: 'Comprehensive framework comparison',
          type: 'Excel Spreadsheet',
          link: '#'
        }
      ]
    },
    {
      title: 'Community Resources',
      description: 'Connect with other security professionals',
      icon: Users,
      items: [
        {
          title: 'User Forum',
          description: 'Discussion community for CyberSoluce users',
          members: '5,000+',
          link: '#'
        },
        {
          title: 'Knowledge Exchange',
          description: 'Share implementation best practices',
          articles: '250+',
          link: '#'
        },
        {
          title: 'Monthly Roundtable',
          description: 'Industry trends and platform updates',
          schedule: 'Last Friday monthly',
          link: '#'
        }
      ]
    }
  ];

  return (
    <>
      <SEOHead 
        title="CyberSoluce Resources - Documentation & Implementation Guides"
        description="Access comprehensive documentation, implementation guides, API references, and training resources for CyberSoluce security assessment platform. Perfect for administrators, developers, and security professionals."
        keywords="CyberSoluce documentation, security assessment guides, compliance resources, implementation documentation, API reference, cybersecurity training"
      />
      
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div 
          ref={heroRef}
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          animate={heroInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.6 }}
        >
          <div className="relative">
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-gray-900 dark:text-white mb-8 leading-tight">
              Resources & Documentation
            </h1>
            <div className="absolute inset-0 bg-gradient-to-r from-blue-600/20 to-purple-600/20 blur-3xl opacity-30 -z-10"></div>
          </div>
          <p className="text-xl md:text-2xl text-gray-600 dark:text-gray-300 max-w-5xl mx-auto leading-relaxed font-light">
            Everything you need to implement, customize, and optimize CyberSoluce for your organization's security assessment and compliance requirements
          </p>
        </motion.div>

        {/* Documentation Grid */}
        <motion.div 
          className="mb-24"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-12 text-center">Documentation Library</h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {documentationSections.map((section, index) => {
              const Icon = section.icon;
              return (
                <motion.div 
                  key={section.title} 
                  className="doc-card group"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.1 * index }}
                >
                  <div className="doc-card-header">
                    <div className="flex items-center mb-4">
                      <div className="p-3 bg-blue-100 dark:bg-blue-900/50 rounded-xl group-hover:bg-blue-200 dark:group-hover:bg-blue-800/50 transition-colors">
                        <Icon className="h-7 w-7 text-blue-600 dark:text-blue-400" />
                      </div>
                      <div className="ml-5">
                        <h3 className="text-xl md:text-2xl font-bold text-gray-900 dark:text-white mb-1">
                          {section.title}
                        </h3>
                        <p className="text-sm md:text-base text-gray-600 dark:text-gray-400 leading-relaxed">
                          {section.description}
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="doc-card-body bg-gray-50 dark:bg-gray-800/50">
                    <div className="space-y-0 divide-y divide-gray-200 dark:divide-gray-700">
                      {section.docs.map((doc) => (
                        <Link
                          key={doc.path}
                          to={doc.path}
                          className="block p-6 hover:bg-blue-50 dark:hover:bg-blue-900/30 transition-all duration-200 group/item"
                        >
                          <div className="flex items-center justify-between">
                            <div>
                              <h4 className="text-base md:text-lg font-semibold text-gray-900 dark:text-white mb-2 group-hover/item:text-blue-700 dark:group-hover/item:text-blue-300 transition-colors">
                                {doc.title}
                              </h4>
                              <p className="text-sm md:text-base text-gray-600 dark:text-gray-400 leading-relaxed">
                                {doc.description}
                              </p>
                            </div>
                            <ChevronRight className="h-5 w-5 text-gray-400 dark:text-gray-500 group-hover/item:text-blue-500 dark:group-hover/item:text-blue-400 transition-colors" />
                          </div>
                        </Link>
                      ))}
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </motion.div>

        {/* Additional Resources */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-12 text-center">Additional Resources</h2>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {additionalResources.map((resource, index) => {
              const Icon = resource.icon;
              return (
                <motion.div 
                  key={resource.title} 
                  className="doc-card group"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.2 + (0.1 * index) }}
                >
                  <div className="doc-card-header">
                    <div className="flex items-center mb-4">
                      <div className="p-3 bg-blue-100 dark:bg-blue-900/50 rounded-xl group-hover:bg-blue-200 dark:group-hover:bg-blue-800/50 transition-colors">
                        <Icon className="h-7 w-7 text-blue-600 dark:text-blue-400" />
                      </div>
                      <div className="ml-4">
                        <h3 className="text-lg md:text-xl font-bold text-gray-900 dark:text-white mb-1">
                          {resource.title}
                        </h3>
                        <p className="text-sm md:text-base text-gray-600 dark:text-gray-400 leading-relaxed">
                          {resource.description}
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="doc-card-body bg-gray-50 dark:bg-gray-800/50">
                    <ul className="space-y-4">
                      {resource.items.map((item, itemIndex) => (
                        <li key={itemIndex}>
                          <a 
                            href={item.link} 
                            className="block p-5 border border-gray-200 dark:border-gray-700 rounded-xl hover:border-blue-300 dark:hover:border-blue-500 hover:bg-blue-50 dark:hover:bg-blue-900/30 transition-all duration-300 group/item"
                            onClick={() => trackEvent('resource_click', {
                              event_category: 'Additional Resources',
                              event_label: item.title,
                              section: resource.title
                            })}
                          >
                            <div className="flex justify-between items-start">
                              <div>
                                <h4 className="font-semibold text-gray-900 dark:text-white text-base md:text-lg mb-2 group-hover/item:text-blue-700 dark:group-hover/item:text-blue-300 transition-colors">
                                  {item.title}
                                </h4>
                                <p className="text-sm md:text-base text-gray-600 dark:text-gray-400 leading-relaxed">
                                  {item.description}
                                </p>
                              </div>
                              <ExternalLink className="h-4 w-4 text-gray-400 dark:text-gray-500 flex-shrink-0 mt-1 group-hover/item:text-blue-500 dark:group-hover/item:text-blue-400 transition-colors" />
                            </div>
                            <div className="mt-4 flex items-center text-xs md:text-sm text-gray-500 dark:text-gray-400">
                              {'date' in item && <span>Available: {item.date}</span>}
                              {'type' in item && <span>Format: {item.type}</span>}
                              {'members' in item && <span>Community: {item.members} members</span>}
                              {'articles' in item && <span>Resources: {item.articles}</span>}
                              {'schedule' in item && <span>Schedule: {item.schedule}</span>}
                            </div>
                          </a>
                        </li>
                      ))}
                    </ul>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </motion.div>

        {/* CTA Section */}
        <motion.div 
          className="mt-24 bg-gradient-to-br from-blue-600 to-blue-700 dark:from-blue-700 dark:to-blue-800 rounded-2xl p-8 md:p-12 relative overflow-hidden"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
        >
          <div className="absolute inset-0 opacity-20">
            <div className="absolute transform -rotate-45 top-1/2 left-1/2 w-[200%] h-[30%] bg-gradient-to-r from-blue-400 to-purple-500 dark:from-blue-500 dark:to-purple-600"></div>
          </div>
          <div className="relative z-10 text-center">
            <h3 className="text-3xl md:text-4xl font-bold text-white mb-6 leading-tight">
              Need Additional Support?
            </h3>
            <p className="text-blue-100 text-lg md:text-xl mb-10 max-w-2xl mx-auto leading-relaxed">
              Our expert team is available to provide personalized assistance with your implementation and answer any questions you may have.
            </p>
            <div className="flex flex-col sm:flex-row gap-6 justify-center">
              <Link 
                to="/contact" 
                className="inline-flex items-center justify-center px-8 py-4 border border-transparent text-base md:text-lg font-semibold rounded-xl text-blue-700 bg-white hover:bg-blue-50 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
                onClick={() => trackOutboundLink('https://cybersoluce.com/contact', 'Contact Support CTA')}
              >
                <HelpCircle className="w-5 h-5 mr-2" />
                Contact Support
              </Link>
              <Link 
                to="/demo" 
                className="inline-flex items-center justify-center px-8 py-4 border-2 border-white text-base md:text-lg font-semibold rounded-xl text-white hover:bg-white hover:text-blue-700 transition-all duration-300 transform hover:-translate-y-1"
                onClick={() => trackOutboundLink('https://cybersoluce.com/demo', 'Watch Demo CTA')}
              >
                <Play className="w-5 h-5 mr-2" />
                Watch Demo
              </Link>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
    </>
  );
};

export default ResourcesPage;