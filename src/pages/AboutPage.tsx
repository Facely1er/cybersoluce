import React from 'react';
import { motion } from 'framer-motion';
import { Shield, Globe, Users, Award, TrendingUp, Target, Brain, GitBranch, Zap, CheckCircle, ArrowRight, Building, MapPin, Calendar } from 'lucide-react';
import { Link } from 'react-router-dom';
import DomainBackground from '../components/common/DomainBackground';

const AboutPage = () => {
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

  const achievements = [
    {
      icon: Globe,
      title: 'Global Reach',
      value: 'Global',
      label: 'Platform Access',
      description: 'Available worldwide with regional framework support'
    },
    {
      icon: Shield,
      title: 'Security Focus',
      value: 'Enterprise',
      label: 'Grade Security',
      description: 'Built with enterprise-grade security and compliance'
    },
    {
      icon: Target,
      title: 'Framework Support',
      value: 'Multi',
      label: 'Framework Coverage',
      description: 'Support for NIST CSF 2.0, ISO 27001, and other standards'
    },
    {
      icon: Award,
      title: 'Innovation',
      value: 'AI',
      label: 'Powered Platform',
      description: 'Advanced AI and machine learning capabilities'
    }
  ];

  const coreCapabilities = [
    {
      icon: GitBranch,
      title: 'Framework Fusion Technology™',
      description: 'Proprietary technology that intelligently maps and aligns controls across multiple cybersecurity frameworks, providing unified governance across NIST CSF 2.0, ISO 27001, CMMC, and regional frameworks.',
      keyFeatures: ['Cross-framework control mapping', 'Intelligent gap analysis', 'Unified compliance tracking']
    },
    {
      icon: Brain,
      title: 'Intelligence Engine™',
      description: 'AI-powered insights engine that correlates data across the entire ERMITS ecosystem, providing predictive analytics and strategic recommendations for executive decision-making.',
      keyFeatures: ['Predictive risk modeling', 'Cross-product correlation', 'Executive intelligence']
    },
    {
      icon: Target,
      title: 'Maturity Acceleration Engine',
      description: 'CMMI-style maturity progression tracking with strategic roadmap development and automated advancement recommendations for organizational cybersecurity maturity.',
      keyFeatures: ['Maturity assessment', 'Strategic roadmaps', 'Benchmark analysis']
    },
    {
      icon: Zap,
      title: 'Governance Orchestration',
      description: 'Comprehensive orchestration platform that coordinates cybersecurity governance activities, risk management workflows, and stakeholder collaboration across the enterprise.',
      keyFeatures: ['Workflow automation', 'Stakeholder coordination', 'Risk orchestration']
    }
  ];


  const values = [
    {
      icon: Brain,
      title: 'Strategic Intelligence',
      description: 'We deliver AI-powered insights that enable executive cybersecurity decision-making with unprecedented clarity and strategic depth.',
      principle: 'Intelligence drives strategy'
    },
    {
      icon: Globe,
      title: 'Global Excellence',
      description: 'We maintain the highest standards across all international operations, adapting to regional requirements while preserving platform consistency.',
      principle: 'Excellence without borders'
    },
    {
      icon: TrendingUp,
      title: 'Executive Impact',
      description: 'We deliver measurable improvements in cybersecurity governance maturity that translate directly to business value and risk reduction.',
      principle: 'Results that matter'
    },
    {
      icon: Shield,
      title: 'Security First',
      description: 'We prioritize security in everything we build, ensuring that our governance platform exemplifies the highest cybersecurity standards.',
      principle: 'Practice what we preach'
    }
  ];

  const timeline = [
    {
      year: 'Planning',
      event: 'Platform Design',
      description: 'Comprehensive platform architecture and design phase'
    },
    {
      year: 'Development',
      event: 'Core Features',
      description: 'Development of core governance and assessment capabilities'
    },
    {
      year: 'Integration',
      event: 'Framework Integration',
      description: 'Implementation of multi-framework support and mapping'
    },
    {
      year: 'Launch',
      event: 'Platform Release',
      description: 'Public release of the cybersecurity governance platform'
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
                Transforming Global Cybersecurity Governance
              </h1>
              <p className="text-xl text-command-blue-100 max-w-4xl mx-auto mb-8">
                CyberSoluce™ is revolutionizing how organizations approach strategic cybersecurity governance with AI-powered intelligence across global frameworks and unified orchestration of the entire ERMITS ecosystem.
              </p>
              <div className="flex justify-center space-x-4">
                <Link
                  to="/platform"
                  className="px-8 py-3 bg-white text-command-blue-700 rounded-lg font-medium hover:bg-command-blue-50 transition-colors shadow-lg"
                >
                  Explore Platform
                </Link>
                <Link
                  to="/contact"
                  className="px-8 py-3 border border-white text-white rounded-lg font-medium hover:bg-white/10 transition-colors"
                >
                  Contact Our Team
                </Link>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Mission & Vision */}
        <section className="py-20 bg-white dark:bg-gray-800">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
              <motion.div
                variants={fadeInUp}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
              >
                <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">Our Mission</h2>
                <p className="text-lg text-gray-600 dark:text-gray-300 mb-8 leading-relaxed">
                  To empower organizations worldwide with strategic cybersecurity governance capabilities that transcend geographical and regulatory boundaries through AI-powered intelligence and unified framework orchestration.
                </p>
                <div className="space-y-4">
                  {[
                    'Orchestrate cybersecurity governance across global frameworks',
                    'Provide executive-level intelligence and strategic insights',
                    'Enable data-driven cybersecurity decision-making',
                    'Integrate the entire ERMITS ecosystem for unified operations',
                  ].map((point, index) => (
                    <motion.div 
                      key={point}
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: index * 0.1 }}
                      className="flex items-center"
                    >
                      <CheckCircle className="h-5 w-5 text-command-blue-600 dark:text-command-blue-400 mr-3 flex-shrink-0" />
                      <span className="text-gray-700 dark:text-gray-300">{point}</span>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
              
              <motion.div
                variants={staggerContainer}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                className="grid grid-cols-2 gap-6"
              >
                {achievements.map((achievement, index) => {
                  const Icon = achievement.icon;
                  return (
                    <motion.div
                      key={achievement.title}
                      variants={fadeInUp}
                      whileHover={{ y: -5, boxShadow: '0 10px 25px -5px rgba(0, 91, 150, 0.3)' }}
                      className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 text-center border border-gray-100 dark:border-gray-700"
                    >
                      <div className="bg-command-blue-100 dark:bg-command-blue-900/30 p-3 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                        <Icon className="h-8 w-8 text-command-blue-600 dark:text-command-blue-400" />
                      </div>
                      <div className="text-3xl font-bold text-gray-900 dark:text-white mb-1">
                        {achievement.value}
                      </div>
                      <div className="text-sm font-medium text-command-blue-600 dark:text-command-blue-400 mb-2">
                        {achievement.label}
                      </div>
                      <p className="text-xs text-gray-600 dark:text-gray-400">
                        {achievement.description}
                      </p>
                    </motion.div>
                  );
                })}
              </motion.div>
            </div>
          </div>
        </section>

        {/* Core Capabilities */}
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
                Core Platform Capabilities
              </h2>
              <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
                Proprietary technologies that define the next generation of cybersecurity governance
              </p>
            </motion.div>

            <motion.div 
              variants={staggerContainer}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="grid grid-cols-1 md:grid-cols-2 gap-8"
            >
              {coreCapabilities.map((capability, index) => {
                const Icon = capability.icon;
                return (
                  <motion.div
                    key={capability.title}
                    variants={fadeInUp}
                    whileHover={{ y: -8, boxShadow: '0 20px 40px -8px rgba(0, 91, 150, 0.3)' }}
                    className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8 border border-gray-200 dark:border-gray-700"
                  >
                    <div className="flex items-center mb-6">
                      <div className="bg-command-blue-100 dark:bg-command-blue-900/30 p-3 rounded-xl mr-4">
                        <Icon className="h-8 w-8 text-command-blue-600 dark:text-command-blue-400" />
                      </div>
                      <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                        {capability.title}
                      </h3>
                    </div>
                    <p className="text-gray-600 dark:text-gray-300 mb-6 leading-relaxed">
                      {capability.description}
                    </p>
                    <div className="space-y-2">
                      {capability.keyFeatures.map((feature, featureIndex) => (
                        <div key={featureIndex} className="flex items-center text-sm">
                          <div className="w-1.5 h-1.5 bg-command-blue-500 rounded-full mr-3"></div>
                          <span className="text-gray-700 dark:text-gray-300">{feature}</span>
                        </div>
                      ))}
                    </div>
                  </motion.div>
                );
              })}
            </motion.div>
          </div>
        </section>

        {/* Company Values */}
        <section className="py-20 bg-white dark:bg-gray-800">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div 
              variants={fadeInUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">Our Values</h2>
              <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
                The principles that guide our approach to cybersecurity governance innovation
              </p>
            </motion.div>
            
            <motion.div 
              variants={staggerContainer}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
            >
              {values.map((value, index) => {
                const Icon = value.icon;
                return (
                  <motion.div
                    key={value.title}
                    variants={fadeInUp}
                    whileHover={{ y: -5 }}
                    className="text-center"
                  >
                    <div className="bg-command-blue-100 dark:bg-command-blue-900/30 p-4 rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-6">
                      <Icon className="h-10 w-10 text-command-blue-600 dark:text-command-blue-400" />
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">
                      {value.title}
                    </h3>
                    <p className="text-gray-600 dark:text-gray-300 mb-4 leading-relaxed">
                      {value.description}
                    </p>
                    <div className="inline-block px-3 py-1 bg-command-blue-50 dark:bg-command-blue-900/20 text-command-blue-700 dark:text-command-blue-300 rounded-full text-sm font-medium">
                      {value.principle}
                    </div>
                  </motion.div>
                );
              })}
            </motion.div>
          </div>
        </section>

        {/* Company Timeline */}
        <section className="py-20 bg-gray-50 dark:bg-gray-900">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div 
              variants={fadeInUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">Our Journey</h2>
              <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
                Building the future of cybersecurity governance through innovation and excellence
              </p>
            </motion.div>

            <div className="relative">
              <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-0.5 bg-command-blue-300 dark:bg-command-blue-700"></div>
              
              <motion.div 
                variants={staggerContainer}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                className="space-y-12"
              >
                {timeline.map((item, index) => (
                  <motion.div
                    key={item.year}
                    variants={fadeInUp}
                    className={`flex items-center ${index % 2 === 0 ? 'flex-row' : 'flex-row-reverse'}`}
                  >
                    <div className="flex-1">
                      <div className={`bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 max-w-md ${
                        index % 2 === 0 ? 'ml-auto mr-8' : 'mr-auto ml-8'
                      }`}>
                        <div className="flex items-center mb-3">
                          <Calendar className="h-5 w-5 text-command-blue-600 dark:text-command-blue-400 mr-2" />
                          <span className="text-sm font-medium text-command-blue-600 dark:text-command-blue-400">
                            {item.year}
                          </span>
                        </div>
                        <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">
                          {item.event}
                        </h3>
                        <p className="text-gray-600 dark:text-gray-300">
                          {item.description}
                        </p>
                      </div>
                    </div>
                    
                    <div className="w-4 h-4 bg-command-blue-600 rounded-full border-4 border-white dark:border-gray-900 relative z-10"></div>
                    
                    <div className="flex-1"></div>
                  </motion.div>
                ))}
              </motion.div>
            </div>
          </div>
        </section>


        {/* ERMITS Ecosystem */}
        <section className="py-20 bg-gradient-to-br from-gray-50 to-command-blue-50 dark:from-gray-900 dark:to-command-blue-900/20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div 
              variants={fadeInUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
                The ERMITS Ecosystem
              </h2>
              <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
                CyberSoluce™ orchestrates and correlates intelligence across our comprehensive cybersecurity platform suite
              </p>
            </motion.div>

            <motion.div 
              variants={staggerContainer}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
            >
              {[
                {
                  name: 'ThreatIntel™',
                  description: 'Advanced threat intelligence and vulnerability management',
                  status: 'Integrated',
                  connection: 'Real-time threat data feeds'
                },
                {
                  name: 'CyberCorrect™',
                  description: 'Comprehensive compliance and audit management',
                  status: 'Integrated',
                  connection: 'Compliance gap analysis'
                },
                {
                  name: 'VendorRisk™',
                  description: 'Supply chain and vendor risk assessment',
                  status: 'Integrated',
                  connection: 'Vendor risk intelligence'
                },
                {
                  name: 'EduSoluce™',
                  description: 'Security training and awareness programs',
                  status: 'Integrated',
                  connection: 'Training effectiveness data'
                }
              ].map((product, index) => (
                <motion.div
                  key={product.name}
                  variants={fadeInUp}
                  whileHover={{ y: -5 }}
                  className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 border border-gray-200 dark:border-gray-700"
                >
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="font-bold text-gray-900 dark:text-white">
                      {product.name}
                    </h3>
                    <div className="flex items-center">
                      <div className="w-2 h-2 bg-green-500 rounded-full mr-2"></div>
                      <span className="text-xs text-green-600 font-medium">
                        {product.status}
                      </span>
                    </div>
                  </div>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                    {product.description}
                  </p>
                  <div className="border-t border-gray-200 dark:border-gray-700 pt-3">
                    <span className="text-xs text-command-blue-600 dark:text-command-blue-400 font-medium">
                      → {product.connection}
                    </span>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* Company Information */}
        <section className="py-20 bg-white dark:bg-gray-800">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
              <motion.div
                variants={fadeInUp}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
              >
                <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">
                  ERMITS LLC
                </h2>
                <p className="text-lg text-gray-600 dark:text-gray-300 mb-8 leading-relaxed">
                  Founded with the vision of creating a comprehensive cybersecurity ecosystem, ERMITS LLC has established itself as a leader in strategic cybersecurity governance technology. Our headquarters in Gaithersburg, Maryland serves as the innovation hub for developing next-generation cybersecurity solutions.
                </p>
                
                <div className="space-y-4">
                  <div className="flex items-center">
                    <Building className="h-5 w-5 text-command-blue-600 dark:text-command-blue-400 mr-3" />
                    <div>
                      <span className="font-medium text-gray-900 dark:text-white">Founded:</span>
                      <span className="text-gray-600 dark:text-gray-300 ml-2">2019</span>
                    </div>
                  </div>
                  <div className="flex items-center">
                    <MapPin className="h-5 w-5 text-command-blue-600 dark:text-command-blue-400 mr-3" />
                    <div>
                      <span className="font-medium text-gray-900 dark:text-white">Headquarters:</span>
                      <span className="text-gray-600 dark:text-gray-300 ml-2">Gaithersburg, Maryland</span>
                    </div>
                  </div>
                  <div className="flex items-center">
                    <Users className="h-5 w-5 text-command-blue-600 dark:text-command-blue-400 mr-3" />
                    <div>
                      <span className="font-medium text-gray-900 dark:text-white">Team Size:</span>
                      <span className="text-gray-600 dark:text-gray-300 ml-2">50+ Cybersecurity Experts</span>
                    </div>
                  </div>
                  <div className="flex items-center">
                    <Award className="h-5 w-5 text-command-blue-600 dark:text-command-blue-400 mr-3" />
                    <div>
                      <span className="font-medium text-gray-900 dark:text-white">Certifications:</span>
                      <span className="text-gray-600 dark:text-gray-300 ml-2">SOC 2, ISO 27001, CMMI Level 3</span>
                    </div>
                  </div>
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
                  <h3 className="text-2xl font-bold mb-6">Why Choose CyberSoluce™?</h3>
                  <div className="space-y-4">
                    {[
                      'Industry-first Framework Fusion Technology™',
                      'AI-powered Intelligence Engine™ with predictive analytics',
                      'Complete ERMITS ecosystem integration',
                      'Executive-level strategic intelligence and reporting',
                      'Global framework support with regional adaptation',
                      'Proven track record with 1,000+ organizations'
                    ].map((reason, index) => (
                      <motion.div
                        key={reason}
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: index * 0.1 }}
                        className="flex items-center"
                      >
                        <CheckCircle className="h-5 w-5 text-action-cyan-300 mr-3 flex-shrink-0" />
                        <span className="text-command-blue-100">{reason}</span>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 bg-command-blue-600 relative">
          <DomainBackground color="0, 91, 150" secondaryColor="51, 161, 222" />
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <motion.div 
              variants={fadeInUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="text-center"
            >
              <h2 className="text-3xl font-bold text-white mb-6">
                Ready to Transform Your Cybersecurity Governance?
              </h2>
              <p className="text-xl text-command-blue-100 mb-8 max-w-3xl mx-auto">
                Join leading organizations worldwide in revolutionizing cybersecurity governance with strategic intelligence and AI-powered orchestration.
              </p>
              <div className="flex flex-col sm:flex-row justify-center gap-4">
                <Link
                  to="/dashboard"
                  className="px-8 py-3 bg-white text-command-blue-700 rounded-lg font-medium hover:bg-command-blue-50 transition-colors shadow-lg"
                >
                  Access Command Center
                  <ArrowRight className="inline-block ml-2 h-5 w-5" />
                </Link>
                <Link
                  to="/contact"
                  className="px-8 py-3 border border-white text-white rounded-lg font-medium hover:bg-white/10 transition-colors"
                >
                  Schedule Consultation
                </Link>
              </div>
            </motion.div>
          </div>
        </section>
      </div>
  );
};

export default AboutPage;