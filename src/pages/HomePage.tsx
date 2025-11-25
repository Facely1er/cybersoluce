import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { 
  Shield, 
  ArrowRight, 
  Target, 
  Brain, 
  GitBranch, 
  BarChart3, 
  Users, 
  DollarSign,
  CheckCircle,
  TrendingUp,
  Eye,
  Zap,
  CheckSquare,
  Play,
  Database
} from 'lucide-react';
import DomainBackground from '../components/common/DomainBackground';
import TextCarousel from '../components/common/TextCarousel';

const HomePage: React.FC = () => {
  const heroCarouselItems = [
    {
      primary: "Unified Asset Inventory",
      secondary: "The foundational Intelligence Operations platform that powers the entire ERMITS ecosystem through a single source of truth"
    },
    {
      primary: "The Governance Command Center",
      secondary: "Strategic cybersecurity governance platform that orchestrates the entire ERMITS ecosystem with AI-powered intelligence"
    },
    {
      primary: "AI-Powered Intelligence Engine™",
      secondary: "Advanced cybersecurity insights with predictive analytics and cross-product data correlation across global frameworks"
    },
    {
      primary: "Framework Fusion Technology™",
      secondary: "Intelligent crosswalk capabilities that map and align controls across multiple cybersecurity frameworks with unified compliance"
    },
    {
      primary: "Executive Command Center",
      secondary: "Board-ready dashboards with KPI visualization and strategic governance intelligence for executive decision-making"
    }
  ];

  const coreModules = [
    {
      icon: Database,
      title: 'Unified Asset Inventory',
      description: 'The foundational platform that powers the entire ERMITS ecosystem. Single source of truth for all assets with product-specific extensions',
      link: '/assets'
    },
    {
      icon: GitBranch,
      title: 'Framework Fusion Technology™',
      description: 'Map and align controls across multiple cybersecurity frameworks with intelligent crosswalk capabilities',
      link: '/framework-mapper'
    },
    {
      icon: Users,
      title: 'Governance Orchestration',
      description: 'Coordinate cybersecurity governance activities, risk management, and stakeholder workflows',
      link: '/compliance-orchestrator'
    },
    {
      icon: BarChart3,
      title: 'Executive Command Center',
      description: 'Board-ready dashboards with KPI visualization and strategic governance intelligence',
      link: '/executive-reporting'
    },
    {
      icon: Target,
      title: 'Maturity Acceleration Engine',
      description: 'Track and accelerate cybersecurity maturity with CMMI-style progression tracking',
      link: '/maturity-tracker'
    },
    {
      icon: Brain,
      title: 'Intelligence Engine™',
      description: 'AI-powered insights with cross-product data correlation and predictive analytics',
      link: '/intelligence'
    },
    {
      icon: DollarSign,
      title: 'Budget Optimization',
      description: 'Simulate and optimize cybersecurity investments for maximum risk reduction ROI',
      link: '/budget-simulator'
    }
  ];

  const assetExtensions = [
    {
      name: 'TechnoSoluce',
      description: 'Software components, SBOM, and vulnerability management',
      status: 'Extension',
      link: '/domains/threat-intelligence'
    },
    {
      name: 'VendorSoluce',
      description: 'Vendor risk, contracts, and supply chain management',
      status: 'Extension',
      link: '/domains/supply-chain-risk'
    },
    {
      name: 'CyberCorrect',
      description: 'Privacy compliance, GDPR, and data protection',
      status: 'Extension',
      link: '/domains/compliance-management'
    }
  ];

  const keyCapabilities = [
    {
      icon: Database,
      title: 'Unified Asset Inventory',
      description: 'The foundational Intelligence Operations platform that powers the entire ERMITS ecosystem. Single source of truth with polymorphic extensions for TechnoSoluce, VendorSoluce, and CyberCorrect',
      metrics: { value: '95%', label: 'Code Reuse' },
      link: '/assets'
    },
    {
      icon: Shield,
      title: 'Strategic Governance',
      description: 'Framework-agnostic governance orchestration with executive intelligence across NIST CSF 2.0, ISO 27001, and regional frameworks',
      metrics: { value: '80%', label: 'Governance Efficiency Gain' },
      link: '/compliance-orchestrator'
    },
    {
      icon: Eye,
      title: 'Executive Intelligence',
      description: 'Board-level dashboards with predictive analytics, strategic insights, and real-time governance KPIs for executive decision-making',
      metrics: { value: '24/7', label: 'Continuous Monitoring' },
      link: '/executive-reporting'
    },
    {
      icon: Zap,
      title: 'ERMITS Integration',
      description: 'Seamless data flow and correlation across the entire ERMITS ecosystem with cross-product intelligence and unified governance',
      metrics: { value: '4+', label: 'Integrated Products' },
      link: '/intelligence'
    },
    {
      icon: Brain,
      title: 'Intelligence Engine™',
      description: 'AI-powered insights with predictive modeling, automated recommendations, and cross-ecosystem intelligence correlation',
      metrics: { value: '95%', label: 'Prediction Accuracy' },
      link: '/intelligence'
    },
    {
      icon: GitBranch,
      title: 'Framework Fusion Technology™',
      description: 'Intelligent crosswalk capabilities that map and align controls across multiple cybersecurity frameworks with unified compliance tracking',
      metrics: { value: '25+', label: 'Supported Frameworks' },
      link: '/framework-mapper'
    },
    {
      icon: Target,
      title: 'Maturity Acceleration',
      description: 'CMMI-style maturity progression tracking with strategic roadmap development and automated advancement recommendations',
      metrics: { value: '3.2x', label: 'Faster Maturity Growth' },
      link: '/maturity-tracker'
    }
  ];

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1, 
      transition: { 
        staggerChildren: 0.1,
        delayChildren: 0.2 
      } 
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0, 
      transition: { duration: 0.5 } 
    }
  };

  const fadeInUpVariants = {
    hidden: { opacity: 0, y: 40 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.6 } 
    }
  };

  const fadeInRightVariants = {
    hidden: { opacity: 0, x: -40 },
    visible: { 
      opacity: 1, 
      x: 0,
      transition: { duration: 0.8, ease: "easeOut" } 
    }
  };

  const staggerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      }
    }
  };

  const pathVariants = {
    hidden: { pathLength: 0 },
    visible: {
      pathLength: 1,
      transition: {
        duration: 1.5,
        ease: "easeInOut"
      }
    }
  };
  
  return (
    <>
    <div className="w-full overflow-hidden">
      {/* Hero Section */}
      <section className="relative bg-command-blue-600 py-24">
        {/* Use DomainBackground component for animated background */}
        <DomainBackground color="0, 91, 150" secondaryColor="51, 161, 222" />
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Hero Content */}
            <motion.div 
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              className="text-white"
            >
              <motion.div
                variants={itemVariants}
                className="mb-8 max-w-lg"
              >
                <TextCarousel 
                  items={heroCarouselItems}
                  interval={4000}
                />
              </motion.div>
              
              <motion.div 
                variants={itemVariants}
                className="flex flex-wrap gap-4 mb-8"
              >
                <Link to="/dashboard" className="px-6 py-3 bg-white text-command-blue-700 rounded-lg font-medium hover:bg-command-blue-50 transition-all shadow-lg hover:shadow-xl">
                  Access Command Center
                </Link>
                <Link to="/demo" className="px-6 py-3 bg-command-blue-500 text-white rounded-lg font-medium hover:bg-command-blue-600 transition-all shadow-lg hover:shadow-command-blue-500/20">
                  <Play size={18} className="mr-2 inline-block" />
                  View Demo
                </Link>
              </motion.div>
            </motion.div>
            
            {/* Dashboard Visualization */}
            <motion.div 
              variants={fadeInRightVariants}
              initial="hidden"
              animate="visible"
              className="relative rounded-2xl overflow-hidden shadow-2xl mt-8 lg:mt-0"
            >
              <div className="bg-command-blue-600/30 backdrop-blur-sm rounded-xl p-8 border border-command-blue-400/30 shadow-inner">
                {/* Governance Score */}
                <div className="mb-8 text-center">
                  <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.7 }}
                    className="text-white text-sm mb-1 uppercase tracking-wider font-medium"
                  >
                    Governance Maturity
                  </motion.div>
                  <motion.div 
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ 
                      type: "spring", 
                      stiffness: 100, 
                      delay: 0.9 
                    }}
                    className="text-white text-4xl font-bold mb-2"
                  >
                    4.1
                  </motion.div>
                  
                  <div className="h-3 bg-command-blue-900/50 rounded-full mt-4 mb-8">
                    <motion.div 
                      initial={{ width: 0 }}
                      animate={{ width: "82%" }}
                      transition={{ duration: 1.5, delay: 1.1, ease: "easeOut" }}
                      className="h-3 bg-gradient-to-r from-command-blue-400 to-action-cyan-400 rounded-full"
                    ></motion.div>
                  </div>
                </div>
                
                {/* Governance Modules Grid */}
                <motion.div 
                  variants={staggerVariants}
                  initial="hidden"
                  animate="visible"
                  className="grid grid-cols-2 gap-4"
                >
                  <motion.div 
                    variants={itemVariants}
                    className="bg-command-blue-700/40 p-4 rounded-lg backdrop-blur-sm border border-command-blue-400/20"
                  >
                    <div className="flex justify-between mb-2">
                      <div className="text-sm text-command-blue-100 font-medium">Framework Fusion</div>
                      <div className="text-sm text-action-cyan-300 font-bold">94%</div>
                    </div>
                    <div className="h-2 bg-command-blue-900/50 rounded-full">
                      <motion.div 
                        initial={{ width: 0 }}
                        animate={{ width: '94%' }}
                        transition={{ duration: 1, delay: 0.8 }}
                        className="h-2 bg-gradient-to-r from-action-cyan-400 to-action-cyan-500 rounded-full"
                      ></motion.div>
                    </div>
                  </motion.div>
                  
                  <motion.div 
                    variants={itemVariants}
                    className="bg-command-blue-700/40 p-4 rounded-lg backdrop-blur-sm border border-command-blue-400/20"
                  >
                    <div className="flex justify-between mb-2">
                      <div className="text-sm text-command-blue-100 font-medium">Intelligence Engine</div>
                      <div className="text-sm text-action-cyan-300 font-bold">87%</div>
                    </div>
                    <div className="h-2 bg-command-blue-900/50 rounded-full">
                      <motion.div 
                        initial={{ width: 0 }}
                        animate={{ width: '87%' }}
                        transition={{ duration: 1, delay: 0.9 }}
                        className="h-2 bg-gradient-to-r from-action-cyan-400 to-action-cyan-500 rounded-full"
                      ></motion.div>
                    </div>
                  </motion.div>
                  
                  <motion.div 
                    variants={itemVariants}
                    className="bg-command-blue-700/40 p-4 rounded-lg backdrop-blur-sm border border-command-blue-400/20"
                  >
                    <div className="flex justify-between mb-2">
                      <div className="text-sm text-command-blue-100 font-medium">Maturity Tracking</div>
                      <div className="text-sm text-action-cyan-300 font-bold">91%</div>
                    </div>
                    <div className="h-2 bg-command-blue-900/50 rounded-full">
                      <motion.div 
                        initial={{ width: 0 }}
                        animate={{ width: '91%' }}
                        transition={{ duration: 1, delay: 1.0 }}
                        className="h-2 bg-gradient-to-r from-action-cyan-400 to-action-cyan-500 rounded-full"
                      ></motion.div>
                    </div>
                  </motion.div>
                  
                  <motion.div 
                    variants={itemVariants}
                    className="bg-command-blue-700/40 p-4 rounded-lg backdrop-blur-sm border border-command-blue-400/20"
                  >
                    <div className="flex justify-between mb-2">
                      <div className="text-sm text-command-blue-100 font-medium">Budget Optimization</div>
                      <div className="text-sm text-action-cyan-300 font-bold">78%</div>
                    </div>
                    <div className="h-2 bg-command-blue-900/50 rounded-full">
                      <motion.div 
                        initial={{ width: 0 }}
                        animate={{ width: '78%' }}
                        transition={{ duration: 1, delay: 1.1 }}
                        className="h-2 bg-gradient-to-r from-action-cyan-400 to-action-cyan-500 rounded-full"
                      ></motion.div>
                    </div>
                  </motion.div>
                </motion.div>
              </div>
              
              {/* Reflection effect */}
              <div className="absolute inset-x-0 bottom-0 h-10 bg-gradient-to-t from-command-blue-400/10 to-transparent"></div>
            </motion.div>
          </div>
        </div>
      </section>
      
      {/* Core Modules Section */}
      <section className="py-24 bg-white dark:bg-gray-800 relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            className="text-center mb-16"
            variants={fadeInUpVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
              Core Governance Modules
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              Comprehensive governance capabilities for strategic cybersecurity management
            </p>
          </motion.div>
          
          <motion.div 
            variants={staggerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {coreModules.map((module, index) => {
              const Icon = module.icon;
              return (
                <Link key={module.title} to={module.link}>
                  <motion.div
                    variants={itemVariants}
                    whileHover={{ y: -10, boxShadow: '0 10px 25px -5px rgba(0, 91, 150, 0.5), 0 8px 10px -6px rgba(0, 91, 150, 0.1)' }}
                    className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-8 border border-gray-100 dark:border-gray-700 hover:border-command-blue-200 dark:hover:border-command-blue-700 transition-all duration-300 transform cursor-pointer text-center"
                    data-tour={module.title.toLowerCase().replace(/[^a-z0-9]/g, '-')}
                    layout
                  >
                    <motion.div
                      className="bg-gradient-to-br from-command-blue-50 to-action-cyan-50 dark:from-command-blue-900/30 dark:to-action-cyan-900/30 p-4 rounded-2xl mb-6 w-16 h-16 flex items-center justify-center shadow-inner mx-auto"
                      initial={{ scale: 0 }}
                      whileInView={{ scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ type: "spring", stiffness: 200, damping: 15, delay: 0.1 * index }}
                    >
                      <Icon className="h-8 w-8 text-command-blue-600 dark:text-command-blue-400" />
                    </motion.div>
                    <motion.h3
                      className="text-xl font-bold text-gray-900 dark:text-white mb-3"
                      layout
                    >
                      {module.title}
                    </motion.h3>
                    <motion.p className="text-gray-600 dark:text-gray-300" layout>
                      {module.description}
                    </motion.p>
                  </motion.div>
                </Link>
              );
            })}
          </motion.div>
        </div>
        
        {/* Dotted background */}
        <div className="absolute inset-0 pointer-events-none opacity-10 dark:opacity-5" 
             style={{
               backgroundImage: 'radial-gradient(#005B96 1px, transparent 1px), radial-gradient(#005B96 1px, transparent 1px)',
               backgroundSize: '40px 40px',
               backgroundPosition: '0 0, 20px 20px'
             }}>
        </div>
      </section>
      
      {/* Asset Extensions Section */}
      <section className="py-24 bg-gradient-to-br from-gray-50 to-command-blue-50 dark:from-gray-900 dark:to-command-blue-900/20 relative">
        <div className="absolute inset-0 pointer-events-none opacity-20">
          {/* Add subtle diagonal pattern */}
          <div className="absolute inset-0" style={{
            backgroundImage: 'linear-gradient(45deg, #005B96 25%, transparent 25%, transparent 50%, #005B96 50%, #005B96 75%, transparent 75%, transparent)',
            backgroundSize: '60px 60px',
            opacity: '0.03'
          }}></div>
        </div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div 
            className="text-center mb-16"
            variants={fadeInUpVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
              Asset Inventory Extensions
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              Extend your asset inventory with specialized product capabilities. Each extension enriches the core inventory with domain-specific intelligence.
            </p>
          </motion.div>
          
          <motion.div 
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid grid-cols-1 md:grid-cols-3 gap-6"
          >
            {assetExtensions.map((extension, index) => {
              return (
                <Link key={extension.name} to={extension.link}>
                  <motion.div 
                    variants={itemVariants}
                    whileHover={{ y: -5 }}
                    className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 border border-gray-100 dark:border-gray-700 hover:shadow-xl hover:border-command-blue-200 dark:hover:border-command-blue-700 transition-all duration-300 cursor-pointer"
                  >
                    <div className="flex items-center justify-between mb-3">
                      <h3 className="font-semibold text-gray-900 dark:text-white">{extension.name}</h3>
                      <div className="flex items-center">
                        <div className="w-2 h-2 bg-blue-500 rounded-full mr-2"></div>
                        <span className="text-xs text-blue-600 dark:text-blue-400">{extension.status}</span>
                      </div>
                    </div>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      {extension.description}
                    </p>
                  </motion.div>
                </Link>
              );
            })}
          </motion.div>
        </div>
      </section>
      
      {/* Key Capabilities Section */}
      <section className="py-24 bg-white dark:bg-gray-800">
        {/* Subtle background pattern */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute inset-0 opacity-5 dark:opacity-10"
               style={{
                 backgroundImage: `url("data:image/svg+xml,%3Csvg width='20' height='20' viewBox='0 0 20 20' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23005B96' fill-opacity='0.2' fill-rule='evenodd'%3E%3Ccircle cx='3' cy='3' r='3'/%3E%3Ccircle cx='13' cy='13' r='3'/%3E%3C/g%3E%3C/svg%3E")`,
                 backgroundSize: '20px 20px'
               }}>
          </div>
        </div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div 
            className="text-center mb-16"
            variants={fadeInUpVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
              Key Capabilities
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              Strategic governance capabilities that transform cybersecurity management
            </p>
          </motion.div>
          
          <motion.div 
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {keyCapabilities.map((capability, index) => {
              const Icon = capability.icon;
              return (
                <Link key={capability.title} to={capability.link}>
                  <motion.div
                    variants={itemVariants}
                    whileHover={{ 
                      y: -12, 
                      scale: 1.02,
                      boxShadow: '0 20px 40px -8px rgba(0, 91, 150, 0.3), 0 12px 16px -8px rgba(0, 91, 150, 0.15)' 
                    }}
                    className="bg-gradient-to-br from-white to-command-blue-50 dark:from-gray-800 dark:to-command-blue-900/20 rounded-xl shadow-md p-8 text-center border border-gray-100 dark:border-gray-700 hover:border-command-blue-200 dark:hover:border-command-blue-700 transition-all duration-300"
                  >
                    <motion.div 
                      className="bg-gradient-to-br from-command-blue-100 to-action-cyan-100 dark:from-command-blue-900/40 dark:to-action-cyan-900/40 p-4 rounded-2xl w-16 h-16 mx-auto mb-6 flex items-center justify-center shadow-inner"
                      initial={{ scale: 0, rotate: -10 }}
                      whileInView={{ scale: 1, rotate: 0 }}
                      viewport={{ once: true }}
                      transition={{ type: "spring", stiffness: 200, damping: 10, delay: 0.2 * index }}
                      data-tour={capability.title.toLowerCase().replace(/[^a-z0-9]/g, '-')}
                    >
                      <Icon className="h-8 w-8 text-command-blue-600 dark:text-command-blue-400" />
                    </motion.div>
                    <motion.div
                      initial={{ opacity: 0 }}
                      whileInView={{ opacity: 1 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.3 + (0.1 * index) }}
                      className="text-center"
                    >
                      <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">{capability.title}</h3>
                      <p className="text-sm text-gray-600 dark:text-gray-300">{capability.description}</p>
                    </motion.div>
                    
                    {/* Capability Metrics */}
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.4 + (0.1 * index) }}
                      className="mt-6 pt-4 border-t border-gray-100 dark:border-gray-700"
                    >
                      <div className="flex items-center justify-center space-x-2">
                        <div className="text-2xl font-bold text-command-blue-600 dark:text-command-blue-400">
                          {capability.metrics.value}
                        </div>
                        <div className="text-sm text-gray-500 dark:text-gray-400">
                          {capability.metrics.label}
                        </div>
                      </div>
                    </motion.div>
                    
                    {/* Hover indicator */}
                    <motion.div
                      className="mt-4 flex items-center justify-center text-command-blue-600 dark:text-command-blue-400 opacity-0 group-hover:opacity-100 transition-opacity"
                      whileHover={{ x: 5 }}
                    >
                      <span className="text-sm font-medium mr-1">Explore</span>
                      <ArrowRight className="h-4 w-4" />
                    </motion.div>
                  </motion.div>
                </Link>
              );
            })}
          </motion.div>
        </div>
      </section>
      
      {/* Value Proposition Section */}
      <section className="py-24 bg-gradient-to-br from-gray-50 to-command-blue-50 dark:from-gray-900 dark:to-command-blue-900/20 relative">
        <div className="absolute inset-0 pointer-events-none opacity-10">
          <div className="absolute inset-0"
               style={{
                 backgroundImage: 'radial-gradient(circle, #005B96 1px, transparent 1px)',
                 backgroundSize: '40px 40px'
               }}>
          </div>
        </div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div 
            className="text-center mb-16"
            variants={fadeInUpVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
              Strategic Value
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              Transform your cybersecurity governance with strategic intelligence and automation
            </p>
          </motion.div>
          
          <motion.div 
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {[
              {
                icon: CheckCircle,
                title: 'Unified Governance',
                description: 'Single platform for all cybersecurity governance activities across frameworks'
              },
              {
                icon: Brain,
                title: 'AI-Powered Intelligence',
                description: 'Predictive analytics and automated insights from cross-product data correlation'
              },
              {
                icon: TrendingUp,
                title: 'Strategic Optimization',
                description: 'Data-driven budget allocation and maturity acceleration recommendations'
              }
            ].map((value, index) => {
              const Icon = value.icon;
              return (
                <motion.div
                  key={value.title}
                  variants={itemVariants}
                  whileHover={{ 
                    y: -5, 
                    boxShadow: '0 10px 25px -5px rgba(0, 91, 150, 0.5), 0 8px 10px -6px rgba(0, 91, 150, 0.1)'
                  }}
                  transition={{ duration: 0.3 }}
                  className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8 hover:shadow-xl transition-all duration-300 border border-gray-100 dark:border-gray-700 hover:border-command-blue-200 dark:hover:border-command-blue-700"
                >
                  <motion.div 
                    initial={{ scale: 0, opacity: 0 }}
                    whileInView={{ scale: 1, opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ 
                      type: "spring", 
                      stiffness: 150, 
                      delay: 0.1 * index 
                    }}
                    className="mb-6"
                  >
                    <Icon className="h-8 w-8 text-command-blue-600 dark:text-command-blue-400" />
                  </motion.div>
                  
                  <motion.h3
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.2 + (0.1 * index) }}
                    className="text-xl font-bold text-gray-900 dark:text-white mb-3"
                  >
                    {value.title}
                  </motion.h3>
                  
                  <motion.p
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.3 + (0.1 * index) }}
                    className="text-gray-600 dark:text-gray-300"
                  >
                    {value.description}
                  </motion.p>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="py-20 bg-command-blue-600 relative overflow-hidden">
        <DomainBackground color="0, 91, 150" secondaryColor="51, 161, 222" />
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div 
            className="text-center"
            variants={fadeInUpVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <h2 className="text-3xl font-bold text-white mb-6 drop-shadow-sm">
              Ready to transform your cybersecurity governance?
            </h2>
            <p className="text-xl text-command-blue-100 mb-10 max-w-3xl mx-auto">
              Experience the power of unified cybersecurity governance with AI-powered intelligence
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-6">
              <motion.div 
                whileHover={{ scale: 1.05, boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.2), 0 10px 10px -6px rgba(0, 0, 0, 0.1)' }}
                whileTap={{ scale: 0.95 }}
              >
                <Link 
                  to="/dashboard" 
                  className="inline-flex items-center px-8 py-4 bg-white text-command-blue-700 rounded-lg font-semibold hover:bg-command-blue-50 transition-all shadow-lg hover:shadow-xl"
                >
                  Access Command Center
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </motion.div>
              <motion.div 
                whileHover={{ scale: 1.05, boxShadow: '0 20px 25px -5px rgba(255, 255, 255, 0.2), 0 10px 10px -6px rgba(255, 255, 255, 0.1)' }}
                whileTap={{ scale: 0.95 }}
              >
                <Link 
                  to="/demo" 
                  className="inline-flex items-center px-8 py-4 bg-command-blue-500 text-white rounded-lg font-semibold hover:bg-command-blue-600 transition-all shadow-lg hover:shadow-xl border border-command-blue-400"
                >
                  View Demo
                  <Play className="ml-2 h-5 w-5" />
                </Link>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
    </>
  );
};

export default HomePage;