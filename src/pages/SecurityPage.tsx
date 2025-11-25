import React from 'react';
import { motion } from 'framer-motion';
import { Shield, Lock, Server, Globe, CheckCircle, UserCheck, Layout, ClipboardCheck, AlertOctagon, ShieldCheck, Database, HardDrive, Key, Activity } from 'lucide-react';
import DomainBackground from '../components/common/DomainBackground';

const SecurityPage = () => {
  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
  };

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-gray-800">
      {/* Hero Section */}
      <div className="relative bg-gradient-to-r from-blue-800 to-indigo-900 dark:from-blue-900 dark:to-indigo-950 overflow-hidden">
        <DomainBackground color="30, 64, 175" secondaryColor="17, 24, 39" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 relative z-10">
          <div className="text-center">
            <motion.h1 
              className="text-4xl font-bold text-white mb-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              Security & Trust Center
            </motion.h1>
            <motion.p 
              className="text-xl text-blue-100 max-w-3xl mx-auto mb-8"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              Discover how we protect your governance data with enterprise-grade security measures, rigorous compliance standards, and a commitment to privacy by design in our strategic intelligence platform.
            </motion.p>
            <motion.div 
              className="flex justify-center space-x-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              <a 
                href="#security-measures" 
                className="px-8 py-3 bg-white text-blue-800 rounded-lg font-medium hover:bg-blue-50 transition-colors"
              >
                Explore Platform Security
              </a>
              <a 
                href="#compliance" 
                className="px-8 py-3 border border-white text-white rounded-lg font-medium hover:bg-white/10 transition-colors"
              >
                Governance Compliance
              </a>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Security Highlights */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <motion.div
          variants={fadeIn}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
            Enterprise-Grade Governance Security
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Protecting your governance intelligence with multiple layers of defense
          </p>
        </motion.div>

        <motion.div 
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-3 gap-8"
        >
          {[
            {
              icon: Shield,
              title: 'Advanced Governance Data Protection',
              description: 'Enterprise-grade encryption at rest and in transit with AES-256 and TLS 1.3 protocols, ensuring your strategic intelligence and governance data remains secure.',
            },
            {
              icon: Lock,
              title: 'Zero Trust Governance Access',
              description: 'Comprehensive access controls with multi-factor authentication, just-in-time access, and continuous verification for executive and governance data access.',
            },
            {
              icon: Server,
              title: 'Secure Governance Infrastructure',
              description: 'Our governance platform runs on SOC 2 certified cloud infrastructure with continuous security monitoring, protecting your strategic intelligence operations.',
            },
          ].map(({ icon: Icon, title, description }) => (
            <motion.div
              key={title}
              variants={fadeIn}
              whileHover={{ y: -5, boxShadow: '0 10px 25px -5px rgba(59, 130, 246, 0.5), 0 8px 10px -6px rgba(59, 130, 246, 0.1)' }}
              className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8 transition-all duration-300"
            >
              <div className="bg-blue-100 dark:bg-blue-900/30 p-4 rounded-full w-16 h-16 flex items-center justify-center mb-6">
                <Icon className="h-8 w-8 text-blue-600 dark:text-blue-400" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                {title}
              </h3>
              <p className="text-gray-600 dark:text-gray-300">{description}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* Security Measures */}
      <div id="security-measures" className="bg-gray-50 dark:bg-gray-900 py-16 -mx-4 sm:-mx-6 lg:-mx-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <motion.div
            variants={fadeIn}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
              Comprehensive Governance Security Measures
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              Our multi-layered security approach protects your governance intelligence and strategic data at every level
            </p>
          </motion.div>

          <motion.div 
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {[
              {
                icon: ShieldCheck,
                title: 'SOC 2 Type II Certified',
                description: 'Independent verification of our security, availability, and confidentiality controls for governance operations'
              },
              {
                icon: Globe,
                title: 'ISO 27001 Certified',
                description: 'Adherence to international information security management standards for strategic intelligence'
              },
              {
                icon: Lock,
                title: 'GDPR Compliant',
                description: 'Full compliance with European data protection regulations for governance data'
              },
              {
                icon: Activity,
                title: 'Regular Penetration Testing',
                description: 'Continuous security validation of governance platform by independent security researchers'
              },
              {
                icon: HardDrive,
                title: '24/7 Security Monitoring',
                description: 'Around-the-clock threat detection and response for governance platform operations'
              },
              {
                icon: Shield,
                title: 'Governance Security Team',
                description: 'Dedicated experts ready to respond to governance platform security incidents'
              },
              {
                icon: Database,
                title: 'Governance Data Backup & Recovery',
                description: 'Automated backup systems with verified recovery procedures for strategic intelligence'
              },
              {
                icon: UserCheck,
                title: 'Governance Security Training',
                description: 'Regular employee training on governance platform security best practices'
              },
              {
                icon: Key,
                title: 'Governance Data Encryption',
                description: 'All governance and intelligence data encrypted at rest and in transit with no exceptions'
              },
            ].map(({ icon: Icon, title, description }) => (
              <motion.div
                key={title}
                variants={fadeIn}
                whileHover={{ scale: 1.03 }}
                className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6 border border-gray-200 dark:border-gray-700 flex items-start"
              >
                <div className="bg-blue-100 dark:bg-blue-900/30 p-3 rounded-lg mr-4 flex-shrink-0">
                  <Icon className="h-6 w-6 text-blue-600 dark:text-blue-400" />
                </div>
                <div>
                  <h3 className="font-medium text-gray-900 dark:text-white mb-1">{title}</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-300">{description}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>

      {/* Data Centers */}
      <div id="compliance" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <motion.div
          variants={fadeIn}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
            Global Governance Data Centers
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Regional governance intelligence with data sovereignty controls for strategic operations
          </p>
        </motion.div>

        <motion.div 
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-3 gap-8"
        >
          {[
            {
              region: 'Europe',
              location: 'Frankfurt, Germany',
              certifications: ['GDPR Compliant', 'ISO 27001', 'C5 Certified', 'NIS2 Ready'],
              features: ['Local data residency', 'EU-based support', 'Schrems II compliant']
            },
            {
              region: 'North America',
              location: 'Virginia, USA',
              certifications: ['SOC 2', 'FedRAMP', 'HIPAA', 'CCPA Compliant'],
              features: ['US-based governance data storage', 'CMMC 2.0 aligned', '99.99% uptime SLA']
            },
            {
              region: 'Asia Pacific',
              location: 'Singapore',
              certifications: ['MTCS Level 3', 'ISO 27001', 'GDPR', 'APAC Ready'],
              features: ['Regional governance compliance', 'Fast local access', 'Dedicated APAC support']
            },
          ].map(({ region, location, certifications, features }) => (
            <motion.div
              key={region}
              variants={fadeIn}
              whileHover={{ y: -5, boxShadow: '0 10px 25px -5px rgba(59, 130, 246, 0.5), 0 8px 10px -6px rgba(59, 130, 246, 0.1)' }}
              className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 border border-gray-200 dark:border-gray-700 transition-all duration-300"
            >
              <div className="flex items-center mb-4">
                <Globe className="h-6 w-6 text-blue-600 dark:text-blue-400 mr-2" />
                <h3 className="text-lg font-medium text-gray-900 dark:text-white">
                  {region}
                </h3>
              </div>
              <p className="text-gray-800 dark:text-gray-200 font-medium mb-4">{location}</p>
              
              <h4 className="text-sm uppercase text-gray-500 dark:text-gray-400 font-medium mb-2">Certifications</h4>
              <div className="flex flex-wrap gap-2 mb-4">
                {certifications.map((cert) => (
                  <span key={cert} className="bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-300 px-2 py-1 rounded-full text-xs font-medium">
                    {cert}
                  </span>
                ))}
              </div>
              
              <h4 className="text-sm uppercase text-gray-500 dark:text-gray-400 font-medium mb-2">Features</h4>
              <ul className="space-y-2">
                {features.map((feature) => (
                  <li key={feature} className="flex items-center text-sm text-gray-600 dark:text-gray-300">
                    <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                    {feature}
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* CTA Section */}
      <div className="bg-blue-600 dark:bg-blue-800 -mx-4 sm:-mx-6 lg:-mx-8 px-4 sm:px-6 lg:px-8 py-16">
        <div className="max-w-7xl mx-auto">
          <div className="bg-gradient-to-r from-blue-700 to-indigo-700 dark:from-blue-900 dark:to-indigo-900 rounded-2xl p-10 relative overflow-hidden">
            <DomainBackground color="37, 99, 235" secondaryColor="79, 70, 229" />
            <div className="relative z-10 text-center">
              <motion.h2 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
                className="text-3xl font-bold text-white mb-4"
              >
                We take governance security seriously
              </motion.h2>
              <motion.p 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 }}
                viewport={{ once: true }}
                className="text-lg text-blue-100 mb-8 max-w-3xl mx-auto"
              >
                Join hundreds of organizations that trust CyberSoluce with their cybersecurity governance needs. Our rigorous security measures ensure your strategic intelligence is always protected.
              </motion.p>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                viewport={{ once: true }}
              >
                <a
                  href="/contact"
                  className="inline-block px-8 py-3 bg-white text-blue-700 rounded-lg font-medium hover:bg-blue-50 transition-colors shadow-lg"
                >
                  Contact Our Governance Team
                </a>
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SecurityPage;