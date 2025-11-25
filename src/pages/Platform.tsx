import React from 'react';
import { motion } from 'framer-motion';
import { Shield, Check, Globe, ArrowRight, Shield as SecurityShield, BarChart2, Clock, Lock, Database, Box } from 'lucide-react';
import { Link } from 'react-router-dom';
import DomainBackground from '../components/common/DomainBackground';

const Platform: React.FC = () => {
  // Animation variants
  const fadeInUp = {
    hidden: { opacity: 0, y: 40 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8 } }
  };
  
  const features = [
    {
      title: "Framework Fusion Technology™",
      description: "Map and align controls across multiple cybersecurity frameworks with intelligent crosswalk capabilities, providing unified governance across NIST CSF 2.0, ISO 27001, and regional frameworks.",
      icon: Globe
    },
    {
      title: "Executive Command Center",
      description: "Board-ready dashboards with KPI visualization and strategic governance intelligence for executive decision-making across the cybersecurity portfolio.",
      icon: BarChart2
    },
    {
      title: "Intelligence Engine™",
      description: "AI-powered insights with cross-product data correlation and predictive analytics from the entire ERMITS ecosystem for strategic governance decisions.",
      icon: Shield
    },
    {
      title: "Maturity Acceleration Engine",
      description: "Track and accelerate cybersecurity maturity with CMMI-style progression tracking and strategic roadmap development for organizational advancement.",
      icon: Lock
    }
  ];
  
  const benefits = [
    {
      title: "80% reduction",
      description: "in governance overhead through automation and intelligence",
      icon: Clock
    },
    {
      title: "360° governance",
      description: "visibility across the entire cybersecurity program",
      icon: Check
    },
    {
      title: "AI-powered insights",
      description: "from cross-product intelligence correlation",
      icon: BarChart2
    },
    {
      title: "Executive intelligence",
      description: "for strategic cybersecurity decision-making",
      icon: Globe
    }
  ];
  
  return (
    <div className="w-full">
      {/* Hero Section */}
      <section className="relative bg-blue-600">
        <DomainBackground color="59, 130, 246" secondaryColor="29, 78, 216" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 relative z-10">
          <div className="text-center">
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="text-4xl font-bold text-white mb-6"
            >
              The Governance Command Center for Global Enterprise
            </motion.h1>
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="text-xl text-blue-100 max-w-3xl mx-auto mb-8"
            >
              Strategic cybersecurity governance platform that orchestrates the entire ERMITS ecosystem with AI-powered intelligence
            </motion.p>
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <Link
                to="/dashboard"
                className="inline-block px-6 py-3 bg-white text-blue-700 rounded-lg font-medium hover:bg-blue-50 transition-colors shadow-lg"
              >
                Access Command Center
                <ArrowRight className="inline-block ml-2 h-5 w-5" />
              </Link>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Key Features */}
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
              Governance Platform Capabilities
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              Strategic governance capabilities for enterprise cybersecurity management
            </p>
          </motion.div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <motion.div
                  key={feature.title}
                  variants={fadeInUp}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6 border border-gray-100 dark:border-gray-700 hover:border-blue-200 dark:hover:border-blue-700 transition-all duration-300"
                >
                  <div className="flex items-start">
                    <div className="bg-blue-100 dark:bg-blue-900/30 p-3 rounded-lg mr-4">
                      <Icon className="h-6 w-6 text-blue-600 dark:text-blue-400" />
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                        {feature.title}
                      </h3>
                      <p className="text-gray-600 dark:text-gray-300">
                        {feature.description}
                      </p>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Security Domains */}
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
              Security Domains
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              Specialized assessment domains tailored to your security needs
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 text-center">
            <motion.div
              variants={fadeInUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-8"
            >
              <div className="bg-blue-100 dark:bg-blue-900/30 p-3 rounded-full inline-flex mb-4">
                <SecurityShield className="h-8 w-8 text-blue-600 dark:text-blue-400" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                Strategic Governance
              </h3>
              <p className="text-gray-600 dark:text-gray-300 mb-4">
                Framework-agnostic governance orchestration with executive intelligence
              </p>
              <Link
                to="/framework-mapper"
                className="text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 font-medium inline-flex items-center"
              >
                Learn More
                <ArrowRight className="ml-1 h-4 w-4" />
              </Link>
            </motion.div>
            
            <motion.div
              variants={fadeInUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-8"
            >
              <div className="bg-purple-100 dark:bg-purple-900/30 p-3 rounded-full inline-flex mb-4">
                <Box className="h-8 w-8 text-purple-600 dark:text-purple-400" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                Maturity Acceleration
              </h3>
              <p className="text-gray-600 dark:text-gray-300 mb-4">
                Track and accelerate cybersecurity maturity progression
              </p>
              <Link
                to="/maturity-tracker"
                className="text-purple-600 dark:text-purple-400 hover:text-purple-700 dark:hover:text-purple-300 font-medium inline-flex items-center"
              >
                Learn More
                <ArrowRight className="ml-1 h-4 w-4" />
              </Link>
            </motion.div>
            
            <motion.div
              variants={fadeInUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
              className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-8"
            >
              <div className="bg-green-100 dark:bg-green-900/30 p-3 rounded-full inline-flex mb-4">
                <Lock className="h-8 w-8 text-green-600 dark:text-green-400" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                Intelligence Engine™
              </h3>
              <p className="text-gray-600 dark:text-gray-300 mb-4">
                AI-powered insights with predictive analytics and automation
              </p>
              <Link
                to="/intelligence"
                className="text-green-600 dark:text-green-400 hover:text-green-700 dark:hover:text-green-300 font-medium inline-flex items-center"
              >
                Learn More
                <ArrowRight className="ml-1 h-4 w-4" />
              </Link>
            </motion.div>
            
            <motion.div
              variants={fadeInUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              transition={{ delay: 0.4 }}
              className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-8"
            >
              <div className="bg-orange-100 dark:bg-orange-900/30 p-3 rounded-full inline-flex mb-4">
                <Database className="h-8 w-8 text-orange-600 dark:text-orange-400" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                Budget Optimization
              </h3>
              <p className="text-gray-600 dark:text-gray-300 mb-4">
                Simulate and optimize cybersecurity investments for maximum ROI
              </p>
              <Link
                to="/budget-simulator"
                className="text-orange-600 dark:text-orange-400 hover:text-orange-700 dark:hover:text-orange-300 font-medium inline-flex items-center"
              >
                Learn More
                <ArrowRight className="ml-1 h-4 w-4" />
              </Link>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Business Benefits */}
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
              Business Benefits
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              Real results for your organization's security program
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {benefits.map((benefit, index) => {
              const Icon = benefit.icon;
              return (
                <motion.div
                  key={benefit.title}
                  variants={fadeInUp}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 text-center border border-gray-100 dark:border-gray-700"
                >
                  <div className="bg-blue-50 dark:bg-blue-900/30 p-3 rounded-full inline-flex mb-4">
                    <Icon className="h-6 w-6 text-blue-600 dark:text-blue-400" />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                    {benefit.title}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300">
                    {benefit.description}
                  </p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-blue-600 relative">
        <DomainBackground color="59, 130, 246" secondaryColor="29, 78, 216" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center">
            <motion.h2 
              variants={fadeInUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="text-3xl font-bold text-white mb-6"
            >
              Ready to strengthen your security posture?
            </motion.h2>
            <motion.p 
              variants={fadeInUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-xl text-blue-100 max-w-2xl mx-auto mb-8"
            >
              Experience the power of unified cybersecurity governance and strategic intelligence for your organization.
            </motion.p>
            <motion.div
              variants={fadeInUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
            >
              <Link
                to="/dashboard"
                className="inline-block px-8 py-4 bg-white text-blue-700 rounded-lg font-medium hover:bg-blue-50 transition-colors shadow-lg"
              >
                Access Command Center
              </Link>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Platform;