import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Check, X, HelpCircle, Shield, Users, Database, Globe, AlertTriangle, Check as CheckIcon, ChevronDown, ChevronUp, Calculator, MessageSquare, ExternalLink, LockIcon, Clock, Zap, LifeBuoy } from 'lucide-react';

const PricingPage: React.FC = () => {
  const [billingCycle, setBillingCycle] = useState<'monthly' | 'annual'>('annual');
  const [selectedRegion, setSelectedRegion] = useState<'na' | 'eu' | 'apac'>('na');
  const [showCalculator, setShowCalculator] = useState<boolean>(false);
  const [activeFaq, setActiveFaq] = useState<number | null>(null);
  const [showComparisonTable, setShowComparisonTable] = useState<boolean>(true);
  
  // ROI Calculator state
  const [roiInputs, setRoiInputs] = useState({
    employees: 100,
    securitySpend: 5000,
    complianceHours: 20,
    industry: 'technology'
  });

  // Define getRegionalPrice function before it's used in calculateRoi
  const getRegionalPrice = (basePrice: number, region: string) => {
    const multipliers = {
      na: 1,
      eu: 1.1,  // 10% higher for EU
      apac: 0.9, // 10% lower for APAC
    };
    return Math.round(basePrice * multipliers[region as keyof typeof multipliers]);
  };

  // Calculate ROI based on inputs
  const calculateRoi = () => {
    const monthlyHoursSaved = roiInputs.complianceHours * 4; // Monthly hours saved
    const hourlyCost = 75; // Assumed hourly cost
    const monthlySavings = monthlyHoursSaved * hourlyCost;
    const yearlySavings = monthlySavings * 12;
    const planCost = billingCycle === 'annual' 
      ? getRegionalPrice(2490, selectedRegion) 
      : getRegionalPrice(249, selectedRegion) * 12;
    
    return {
      monthlySavings,
      yearlySavings,
      paybackPeriod: planCost / monthlySavings,
      threeYearSavings: yearlySavings * 3 - planCost * 3
    };
  };

  const roiResults = calculateRoi();

  const plans = [
    {
      name: 'Basic',
      description: 'For small teams getting started with governance and assessment',
      monthlyPrice: 79,
      annualPrice: 790,
      features: [
        'Governance Command Center dashboard',
        'Framework Fusion Technology™ (2 frameworks)',
        'Basic maturity tracking',
        'Regional adaptation (basic)',
        'Ransomware Defense',
        'Standard governance reports',
        'API access'
      ],
      limits: {
        assessments: 5,
        users: 5,
        storage: '50GB',
      },
      ideal: 'Small businesses',
      setupTime: 'Under 3 days',
      roi: '2-3x',
      cta: 'Start Free Trial',
      popular: false,
      badge: 'Starter'
    },
    {
      name: 'Professional',
      description: 'Complete governance platform for growing organizations',
      monthlyPrice: 249,
      annualPrice: 2490,
      features: [
        'Full Governance Command Center',
        'Framework Fusion Technology™ (unlimited)',
        'Maturity Acceleration Engine',
        'Intelligence Engine™ (basic)',
        'Regional adaptation (full)',
        'Ransomware Defense',
        'Supply Chain Security',
        'Privacy Protection',
        'Sensitive Information',
        'Executive Command Center',
        'Compliance Orchestrator',
        'Audit Packager',
        'Advanced governance reports',
        'API access',
        'Cross-product intelligence'
      ],
      limits: {
        assessments: 20,
        users: 25,
        storage: '250GB',
      },
      ideal: 'Mid-sized organizations',
      setupTime: '1-2 weeks',
      roi: '4-5x',
      cta: 'Start Free Trial',
      popular: true,
      badge: 'Most Popular'
    },
    {
      name: 'Enterprise',
      description: 'Advanced governance platform for large organizations with complex needs',
      monthlyPrice: null,
      annualPrice: null,
      features: [
        'Full Governance Command Center',
        'Framework Fusion Technology™ (unlimited)',
        'Maturity Acceleration Engine',
        'Intelligence Engine™ (advanced)',
        'Budget Optimization Simulator',
        'Regional adaptation (enterprise)',
        'Ransomware Defense',
        'Supply Chain Security',
        'Privacy Protection',
        'Sensitive Information',
        'Custom security domains',
        'Executive Command Center',
        'Compliance Orchestrator',
        'Audit Packager',
        'Advanced governance reports',
        'Custom executive reports',
        'API access',
        'Single Sign-On integration',
        'Cross-product intelligence (advanced)',
        'ERMITS ecosystem integration',
        'White-label deployment options'
      ],
      limits: {
        assessments: 'Unlimited',
        users: 'Unlimited',
        storage: 'Unlimited',
      },
      ideal: 'Large enterprises',
      setupTime: 'Custom implementation',
      roi: '6-8x',
      cta: 'Contact Sales',
      popular: false,
      badge: 'Enterprise'
    },
  ];

  // Expanded feature comparison data
  const featureCategories = [
    {
      name: 'Governance Platform',
      features: [
        { name: 'Governance Command Center', basic: true, professional: true, enterprise: true },
        { name: 'Framework Fusion Technology™', basic: '2 frameworks', professional: 'Unlimited', enterprise: 'Unlimited' },
        { name: 'Maturity Acceleration Engine', basic: 'Basic', professional: true, enterprise: true },
        { name: 'Intelligence Engine™', basic: false, professional: 'Basic', enterprise: 'Advanced' },
        { name: 'Budget Optimization Simulator', basic: false, professional: false, enterprise: true },
      ]
    },
    {
      name: 'Security Domains',
      features: [
        { name: 'Ransomware Defense', basic: true, professional: true, enterprise: true },
        { name: 'Supply Chain Security', basic: false, professional: true, enterprise: true },
        { name: 'Privacy Protection', basic: false, professional: true, enterprise: true },
        { name: 'Sensitive Information', basic: false, professional: true, enterprise: true },
        { name: 'Custom Domains', basic: false, professional: false, enterprise: true },
      ]
    },
    {
      name: 'Framework & Compliance',
      features: [
        { name: 'NIST CSF 2.0', basic: true, professional: true, enterprise: true },
        { name: 'ISO 27001', basic: true, professional: true, enterprise: true },
        { name: 'CIS Controls v8', basic: 'Basic', professional: true, enterprise: true },
        { name: 'Regional frameworks (GDPR, CCPA, LGPD, PIPL)', basic: 'Basic', professional: true, enterprise: true },
        { name: 'Industry-specific frameworks', basic: false, professional: 'Limited', enterprise: 'Unlimited' },
        { name: 'Custom frameworks', basic: false, professional: false, enterprise: true },
      ]
    },
    {
      name: 'Governance & Reporting',
      features: [
        { name: 'Executive Command Center', basic: 'Basic', professional: true, enterprise: 'Advanced' },
        { name: 'Compliance Orchestrator', basic: false, professional: true, enterprise: true },
        { name: 'Audit Packager', basic: false, professional: true, enterprise: true },
        { name: 'Standard governance reports', basic: true, professional: true, enterprise: true },
        { name: 'Custom executive reports', basic: false, professional: 'Limited', enterprise: 'Unlimited' },
        { name: 'Cross-product intelligence', basic: false, professional: 'Basic', enterprise: 'Advanced' },
      ]
    },
    {
      name: 'Integration & Ecosystem',
      features: [
        { name: 'API access', basic: 'Read-only', professional: 'Full access', enterprise: 'Unlimited' },
        { name: 'ERMITS ecosystem integration', basic: false, professional: 'Basic', enterprise: 'Full' },
        { name: 'Pre-built connectors', basic: '3', professional: '15+', enterprise: '50+' },
        { name: 'Single Sign-On', basic: false, professional: true, enterprise: true },
        { name: 'Custom integrations', basic: false, professional: 'Limited', enterprise: 'Unlimited' },
        { name: 'White-label deployment', basic: false, professional: false, enterprise: true },
      ]
    },
    {
      name: 'Support',
      features: [
        { name: 'Support channels', basic: 'Email', professional: 'Email, chat & phone', enterprise: 'All + dedicated TAM' },
        { name: 'SLA response time', basic: '24 hours', professional: '4 hours', enterprise: '1 hour' },
        { name: 'Implementation support', basic: 'Self-service', professional: 'Guided setup', enterprise: 'White-glove' },
        { name: 'Training', basic: 'Documentation', professional: 'Online training', enterprise: 'Custom training' },
      ]
    }
  ];

  const expandedFaqs = [
    {
      question: 'Are there any limits on the number of assessments?',
      answer: 'Each plan has specific limits for the number of assessments you can run. The Basic plan includes up to 5 assessments, Professional includes 20 assessments, and Enterprise offers unlimited assessments. Additional assessments can be purchased separately if needed.'
    },
    {
      question: 'Can I change plans later?',
      answer: "Yes, you can upgrade or downgrade your plan at any time. When upgrading, the new features will be instantly available and we'll prorate the difference in cost. When downgrading, the changes will take effect at the end of your current billing cycle."
    },
    {
      question: 'How long does implementation take?',
      answer: 'Implementation time varies by plan. The Basic plan is designed for self-service setup and can be up and running in under a week. The Professional plan includes guided setup that typically takes 2-3 weeks. Enterprise deployments involve customized implementation with timelines based on your specific requirements, typically 3-6 weeks.'
    },
    {
      question: 'Are there any discounts available?',
      answer: 'We offer discounts for non-profit organizations, educational institutions, and for annual billing. Enterprise customers may qualify for volume discounts based on user count and commitment period. Contact our sales team for specific pricing information.'
    },
    {
      question: 'How do you ensure the security of our data?',
      answer: 'We employ industry-leading security measures including data encryption at rest and in transit, strict access controls, regular security assessments, and compliance with major security standards. Our platform is hosted in SOC 2 Type II and ISO 27001 certified data centers with regional deployment options for data sovereignty requirements.'
    },
    {
      question: 'Is there a free trial available?',
      answer: 'Yes, we offer a 14-day free trial for both the Basic and Professional plans. The trial gives you full access to all features included in the selected plan. No credit card is required to start a trial, and you can cancel anytime before the trial ends without being charged.'
    },
    {
      question: 'What payment methods do you accept?',
      answer: 'We accept major credit cards (Visa, Mastercard, American Express), PayPal, and wire transfers for annual subscriptions. Enterprise customers can also arrange for purchase orders and invoicing terms.'
    },
    {
      question: 'Do you offer special pricing for non-profits?',
      answer: 'Yes, we offer special pricing for qualified non-profit organizations, educational institutions, and government agencies. Please contact our sales team with appropriate documentation to learn more about our discount programs.'
    },
  ];

  const formatCurrency = (amount: number | null, currency: string) => {
    if (amount === null) return 'Custom';
    return new Intl.NumberFormat(navigator.language, {
      style: 'currency',
      currency,
    }).format(amount);
  };

  const toggleFaq = (index: number) => {
    setActiveFaq(activeFaq === index ? null : index);
  };

  useEffect(() => {
    // Recalculate ROI when inputs change
    calculateRoi();
  }, [roiInputs, billingCycle, selectedRegion]);

  return (
    <div className="py-12 bg-gray-50 dark:bg-gray-900 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Header */}
        <div className="text-center">
          <motion.h1 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-4xl font-bold text-gray-900 dark:text-white mb-4"
          >
            Simple, Transparent Pricing
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto"
          >
            Choose the perfect plan for your organization's security and compliance needs
          </motion.p>
        </div>

        {/* Trust Indicators */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="flex flex-wrap justify-center items-center gap-8 mb-12"
        >
          <div className="flex items-center space-x-2 text-sm text-gray-600 dark:text-gray-400">
            <Shield className="w-5 h-5 text-blue-600 dark:text-blue-400" />
            <span>SOC 2 Type II Certified</span>
          </div>
          <div className="flex items-center space-x-2 text-sm text-gray-600 dark:text-gray-400">
            <Clock className="w-5 h-5 text-blue-600 dark:text-blue-400" />
            <span>14-Day Money Back</span>
          </div>
          <div className="flex items-center space-x-2 text-sm text-gray-600 dark:text-gray-400">
            <LockIcon className="w-5 h-5 text-blue-600 dark:text-blue-400" />
            <span>99.9% Uptime SLA</span>
          </div>
          <div className="flex items-center space-x-2 text-sm text-gray-600 dark:text-gray-400">
            <Users className="w-5 h-5 text-blue-600 dark:text-blue-400" />
            <span>500+ Organizations</span>
          </div>
        </motion.div>

        {/* Pricing Controls */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-6 mb-12">
          {/* Billing Cycle Toggle */}
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-1 flex">
            <button
              onClick={() => setBillingCycle('monthly')}
              className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                billingCycle === 'monthly'
                  ? 'bg-blue-600 text-white dark:bg-blue-500'
                  : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
              }`}
            >
              Monthly
            </button>
            <button
              onClick={() => setBillingCycle('annual')}
              className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                billingCycle === 'annual'
                  ? 'bg-blue-600 text-white dark:bg-blue-500'
                  : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
              }`}
            >
              Annual <span className="text-green-500 dark:text-green-400 font-normal">Save 15%</span>
            </button>
          </div>

          {/* Region Selector */}
          <div className="flex items-center gap-2 bg-white dark:bg-gray-800 rounded-lg shadow-sm p-1">
            <Globe className="h-5 w-5 text-gray-400 dark:text-gray-500 ml-2" />
            <select
              value={selectedRegion}
              onChange={(e) => setSelectedRegion(e.target.value as 'na' | 'eu' | 'apac')}
              className="bg-transparent border-none text-sm font-medium text-gray-700 dark:text-gray-300 focus:ring-0 py-2 pr-2"
            >
              <option value="na">North America</option>
              <option value="eu">Europe</option>
              <option value="apac">Asia Pacific</option>
            </select>
          </div>

          {/* ROI Calculator Toggle */}
          <button 
            onClick={() => setShowCalculator(!showCalculator)}
            className="flex items-center gap-2 bg-blue-50 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 px-4 py-2 rounded-lg text-sm font-medium hover:bg-blue-100 dark:hover:bg-blue-900/50 transition-colors"
          >
            <Calculator className="h-5 w-5" />
            {showCalculator ? 'Hide ROI Calculator' : 'Show ROI Calculator'}
          </button>
        </div>

        {/* ROI Calculator */}
        {showCalculator && (
          <motion.div 
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 mb-12"
          >
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-gray-900 dark:text-white">ROI Calculator</h2>
              <span className="text-sm text-gray-500 dark:text-gray-400">Estimate your savings with CyberSoluce</span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">Your Information</h3>
                
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      Organization Size
                    </label>
                    <select 
                      value={roiInputs.employees}
                      onChange={(e) => setRoiInputs({...roiInputs, employees: parseInt(e.target.value)})}
                      className="w-full rounded-md border-gray-300 dark:border-gray-600 shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
                    >
                      <option value={50}>Small (1-50 employees)</option>
                      <option value={100}>Medium (51-200 employees)</option>
                      <option value={500}>Large (201-1000 employees)</option>
                      <option value={2000}>Enterprise (1000+ employees)</option>
                    </select>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      Monthly Security Spend ($)
                    </label>
                    <input 
                      type="number" 
                      value={roiInputs.securitySpend}
                      onChange={(e) => setRoiInputs({...roiInputs, securitySpend: parseInt(e.target.value)})}
                      className="w-full rounded-md border-gray-300 dark:border-gray-600 shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      Weekly Compliance Hours
                    </label>
                    <input 
                      type="number" 
                      value={roiInputs.complianceHours}
                      onChange={(e) => setRoiInputs({...roiInputs, complianceHours: parseInt(e.target.value)})}
                      className="w-full rounded-md border-gray-300 dark:border-gray-600 shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      Industry
                    </label>
                    <select 
                      value={roiInputs.industry}
                      onChange={(e) => setRoiInputs({...roiInputs, industry: e.target.value})}
                      className="w-full rounded-md border-gray-300 dark:border-gray-600 shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
                    >
                      <option value="technology">Technology</option>
                      <option value="healthcare">Healthcare</option>
                      <option value="financial">Financial Services</option>
                      <option value="manufacturing">Manufacturing</option>
                      <option value="retail">Retail</option>
                      <option value="government">Government</option>
                    </select>
                  </div>
                </div>
              </div>
              
              <div className="bg-gray-50 dark:bg-gray-700 p-6 rounded-lg">
                <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">Estimated Savings</h3>
                
                <div className="space-y-6">
                  <div>
                    <div className="flex justify-between mb-1">
                      <span className="text-sm text-gray-600 dark:text-gray-300">Hours saved monthly</span>
                      <span className="text-sm font-medium text-gray-900 dark:text-white">{roiInputs.complianceHours * 4} hours</span>
                    </div>
                    <div className="w-full bg-gray-200 dark:bg-gray-600 rounded-full h-2">
                      <div className="bg-blue-600 dark:bg-blue-500 h-2 rounded-full" style={{ width: `${Math.min(100, roiInputs.complianceHours * 4)}%` }}></div>
                    </div>
                  </div>
                  
                  <div className="border-t border-gray-200 dark:border-gray-600 pt-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <span className="text-sm text-gray-600 dark:text-gray-300">Monthly Savings</span>
                        <p className="text-2xl font-bold text-blue-600 dark:text-blue-400">
                          ${roiResults.monthlySavings}
                        </p>
                      </div>
                      <div>
                        <span className="text-sm text-gray-600 dark:text-gray-300">Annual Savings</span>
                        <p className="text-2xl font-bold text-blue-600 dark:text-blue-400">
                          ${roiResults.yearlySavings}
                        </p>
                      </div>
                      <div>
                        <span className="text-sm text-gray-600 dark:text-gray-300">Payback Period</span>
                        <p className="text-2xl font-bold text-green-600 dark:text-green-400">
                          {roiResults.paybackPeriod.toFixed(1)} months
                        </p>
                      </div>
                      <div>
                        <span className="text-sm text-gray-600 dark:text-gray-300">3-Year Savings</span>
                        <p className="text-2xl font-bold text-green-600 dark:text-green-400">
                          ${roiResults.threeYearSavings.toFixed(0)}
                        </p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="border-t border-gray-200 dark:border-gray-600 pt-4 text-center">
                    <p className="text-sm text-gray-600 dark:text-gray-300 mb-3">
                      Want a detailed ROI analysis for your organization?
                    </p>
                    <button className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600">
                      Download Full ROI Report
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {/* Toggle for Comparison Table */}
        <div className="text-center mb-6">
          <button 
            onClick={() => setShowComparisonTable(!showComparisonTable)}
            className="inline-flex items-center px-4 py-2 border border-gray-300 dark:border-gray-600 text-sm font-medium rounded-md shadow-sm text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700"
          >
            {showComparisonTable ? 'Hide feature comparison' : 'Show feature comparison'}
            {showComparisonTable ? <ChevronUp className="ml-2 h-4 w-4" /> : <ChevronDown className="ml-2 h-4 w-4" />}
          </button>
        </div>

        {/* Feature Comparison Table */}
        {showComparisonTable && (
          <motion.div 
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="bg-white dark:bg-gray-800 rounded-lg shadow-lg mb-12 overflow-hidden"
          >
            <div className="p-4 border-b border-gray-200 dark:border-gray-700">
              <h2 className="text-xl font-bold text-gray-900 dark:text-white">Feature Comparison</h2>
            </div>
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                <thead>
                  <tr>
                    <th scope="col" className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 dark:text-white sm:pl-6">
                      Feature
                    </th>
                    <th scope="col" className="px-3 py-3.5 text-center text-sm font-semibold text-gray-900 dark:text-white">
                      Basic
                    </th>
                    <th scope="col" className="px-3 py-3.5 text-center text-sm font-semibold text-gray-900 dark:text-white relative">
                      <span className="bg-blue-100 dark:bg-blue-900/50 text-blue-800 dark:text-blue-300 text-xs font-medium py-1 px-2 rounded-full absolute top-1 right-1">Most Popular</span>
                      Professional
                    </th>
                    <th scope="col" className="px-3 py-3.5 text-center text-sm font-semibold text-gray-900 dark:text-white">
                      Enterprise
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                  {featureCategories.map((category, categoryIndex) => (
                    <React.Fragment key={category.name}>
                      <tr className="bg-gray-50 dark:bg-gray-700">
                        <th
                          colSpan={4}
                          scope="colgroup"
                          className="py-2 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 dark:text-white sm:pl-6"
                        >
                          {category.name}
                        </th>
                      </tr>
                      {category.features.map((feature, featureIndex) => (
                        <tr key={`${categoryIndex}-${featureIndex}`}>
                          <td className="py-4 pl-4 pr-3 text-sm font-medium text-gray-900 dark:text-white sm:pl-6">
                            {feature.name}
                          </td>
                          <td className="px-3 py-4 text-center text-sm text-gray-500 dark:text-gray-400">
                            {typeof feature.basic === 'string' ? (
                              <span>{feature.basic}</span>
                            ) : feature.basic ? (
                              <Check className="w-5 h-5 text-green-500 mx-auto" />
                            ) : (
                              <X className="w-5 h-5 text-red-500 mx-auto" />
                            )}
                          </td>
                          <td className="px-3 py-4 text-center text-sm text-gray-500 dark:text-gray-400">
                            {typeof feature.professional === 'string' ? (
                              <span>{feature.professional}</span>
                            ) : feature.professional ? (
                              <Check className="w-5 h-5 text-green-500 mx-auto" />
                            ) : (
                              <X className="w-5 h-5 text-red-500 mx-auto" />
                            )}
                          </td>
                          <td className="px-3 py-4 text-center text-sm text-gray-500 dark:text-gray-400">
                            {typeof feature.enterprise === 'string' ? (
                              <span>{feature.enterprise}</span>
                            ) : feature.enterprise ? (
                              <Check className="w-5 h-5 text-green-500 mx-auto" />
                            ) : (
                              <X className="w-5 h-5 text-red-500 mx-auto" />
                            )}
                          </td>
                        </tr>
                      ))}
                    </React.Fragment>
                  ))}
                </tbody>
              </table>
            </div>
          </motion.div>
        )}

        {/* Pricing Cards */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-8"
        >
          {plans.map((plan, index) => {
            const price = billingCycle === 'monthly'
              ? plan.monthlyPrice !== null ? getRegionalPrice(plan.monthlyPrice, selectedRegion) : null
              : plan.annualPrice !== null ? getRegionalPrice(plan.annualPrice, selectedRegion) : null;
            
            const isCustomPrice = price === null;

            return (
              <motion.div
                key={plan.name}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 * index }}
                className={`relative bg-white dark:bg-gray-800 rounded-2xl shadow-lg overflow-hidden ${
                  plan.popular ? 'ring-2 ring-blue-500 dark:ring-blue-400 transform scale-105 z-10 my-4 md:my-0' : ''
                }`}
              >
                {plan.popular && (
                  <div className="absolute top-0 right-0 bg-blue-500 dark:bg-blue-600 text-white px-4 py-1 rounded-bl-lg text-sm font-medium">
                    Most Popular
                  </div>
                )}

                {plan.badge && (
                  <div className="absolute top-3 left-3 bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200 px-3 py-1 rounded-full text-xs font-medium">
                    {plan.badge}
                  </div>
                )}

                <div className="p-8">
                  <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                    {plan.name}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300 mb-6 h-12">
                    {plan.description}
                  </p>

                  <div className="mb-8">
                    <div className="flex items-baseline">
                      {isCustomPrice ? (
                        <span className="text-3xl font-bold text-gray-900 dark:text-white">
                          Custom
                        </span>
                      ) : (
                        <>
                          <span className="text-4xl font-bold text-gray-900 dark:text-white">
                            ${price}
                          </span>
                          <span className="text-gray-600 dark:text-gray-300 ml-2">
                            {billingCycle === 'monthly' ? '/month' : '/year'}
                          </span>
                        </>
                      )}
                    </div>
                    {billingCycle === 'annual' && plan.monthlyPrice && (
                      <p className="text-sm text-green-600 dark:text-green-400 mt-2">
                        Save ${getRegionalPrice(plan.monthlyPrice * 2.4, selectedRegion)} per year
                      </p>
                    )}
                  </div>

                  <div className="space-y-3 mb-8 text-sm text-gray-700 dark:text-gray-300">
                    <div className="flex items-center">
                      <Users className="h-5 w-5 text-blue-600 dark:text-blue-400 mr-2" />
                      <span>Ideal for: {plan.ideal}</span>
                    </div>
                    <div className="flex items-center">
                      <Clock className="h-5 w-5 text-blue-600 dark:text-blue-400 mr-2" />
                      <span>Setup time: {plan.setupTime}</span>
                    </div>
                    <div className="flex items-center">
                      <Zap className="h-5 w-5 text-blue-600 dark:text-blue-400 mr-2" />
                      <span>Typical ROI: {plan.roi}</span>
                    </div>
                  </div>

                  <button
                    className={`w-full py-3 px-6 rounded-lg font-medium transition-colors ${
                      plan.popular
                        ? 'bg-blue-600 text-white hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600'
                        : isCustomPrice 
                          ? 'bg-blue-600 text-white hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600'
                          : 'bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white hover:bg-gray-200 dark:hover:bg-gray-600'
                    }`}
                    onClick={() => {
                      if (isCustomPrice) {
                        window.location.href = '/contact';
                      } else {
                        window.location.href = '/signup';
                      }
                    }}
                  >
                    {plan.cta}
                  </button>

                  {!isCustomPrice && (
                    <p className="text-center text-xs text-gray-500 dark:text-gray-400 mt-2">
                      No credit card required
                    </p>
                  )}

                  <div className="mt-6 space-y-4">
                    <div className="flex items-center justify-center gap-4 mb-4">
                      <div className="flex items-center gap-2">
                        <Shield className="h-5 w-5 text-blue-600" />
                        <span className="text-sm text-gray-700 dark:text-gray-300">
                          {plan.limits.assessments} Assessments
                        </span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Users className="h-5 w-5 text-blue-600" />
                        <span className="text-sm text-gray-700 dark:text-gray-300">
                          {plan.limits.users} Users
                        </span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Database className="h-5 w-5 text-blue-600" />
                        <span className="text-sm text-gray-700 dark:text-gray-300">
                          {plan.limits.storage} Storage
                        </span>
                      </div>
                    </div>

                    <h4 className="font-medium text-gray-900 dark:text-white text-sm">
                      Includes:
                    </h4>
                    <ul className="space-y-3 mt-2">
                      {plan.features.slice(0, 6).map((feature) => (
                        <li key={feature} className="flex items-start">
                          <CheckIcon className="h-5 w-5 text-green-500 mr-2 flex-shrink-0" />
                          <span className="text-gray-700 dark:text-gray-300 text-sm">{feature}</span>
                        </li>
                      ))}
                    </ul>
                    {plan.features.length > 6 && (
                      <div className="border-t border-gray-200 dark:border-gray-700 pt-3 text-center">
                        <button className="text-sm text-blue-600 dark:text-blue-400 font-medium hover:text-blue-800 dark:hover:text-blue-300">
                          Show all {plan.features.length} features
                        </button>
                      </div>
                    )}
                  </div>
                </div>

                {plan.popular && (
                  <div className="bg-blue-50 dark:bg-blue-900/20 p-4 text-center">
                    <p className="text-blue-700 dark:text-blue-300 text-sm font-medium">
                      Includes free implementation assistance
                    </p>
                  </div>
                )}
              </motion.div>
            );
          })}
        </motion.div>

        {/* Need Help Section */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="bg-gray-100 dark:bg-gray-800 rounded-lg p-6 flex flex-col sm:flex-row items-center justify-between mt-12 mb-16"
        >
          <div className="flex items-start mb-4 sm:mb-0">
            <LifeBuoy className="h-10 w-10 text-blue-600 dark:text-blue-400 mr-4 flex-shrink-0" />
            <div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-1">Not sure which plan is right for you?</h3>
              <p className="text-gray-600 dark:text-gray-300 text-sm">Our security experts can help you find the perfect solution for your organization.</p>
            </div>
          </div>
          <div className="flex flex-col sm:flex-row gap-3">
            <a href="#" className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600">
              <MessageSquare className="h-4 w-4 mr-2" />
              Chat with us
            </a>
            <a href="#" className="inline-flex items-center px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm text-sm font-medium text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
              Schedule a Demo
            </a>
          </div>
        </motion.div>

        {/* FAQ Section */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8 mb-16">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white text-center mb-8">
            Frequently Asked Questions
          </h2>
          <div className="space-y-4 max-w-3xl mx-auto">
            {expandedFaqs.map((faq, index) => (
              <div 
                key={index} 
                className={`border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden transition-all duration-200 ${
                  activeFaq === index ? 'bg-gray-50 dark:bg-gray-700' : 'bg-white dark:bg-gray-800'
                }`}
              >
                <button
                  onClick={() => toggleFaq(index)}
                  className="w-full px-6 py-4 text-left flex items-center justify-between focus:outline-none"
                >
                  <h3 className={`text-lg font-medium ${
                    activeFaq === index ? 'text-blue-600 dark:text-blue-400' : 'text-gray-900 dark:text-white'
                  }`}>
                    {faq.question}
                  </h3>
                  {activeFaq === index ? (
                    <ChevronUp className="h-5 w-5 text-gray-500 dark:text-gray-400" />
                  ) : (
                    <ChevronDown className="h-5 w-5 text-gray-500 dark:text-gray-400" />
                  )}
                </button>
                {activeFaq === index && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    transition={{ duration: 0.3 }}
                    className="px-6 pb-4"
                  >
                    <p className="text-gray-600 dark:text-gray-300">
                      {faq.answer}
                    </p>
                  </motion.div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* CTA Section */}
        <div className="bg-gradient-to-r from-blue-600 to-indigo-600 dark:from-blue-800 dark:to-indigo-800 rounded-xl shadow-xl p-8 text-center">
          <h2 className="text-2xl font-bold text-white mb-4">Ready to secure your organization?</h2>
          <p className="text-blue-100 mb-6 max-w-2xl mx-auto">
            Start with a free trial today and discover how CyberSoluce can transform your security assessment process.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <a href="#" className="px-8 py-3 bg-white text-blue-600 rounded-lg font-medium hover:bg-blue-50 transition-colors">
              Start Free Trial
            </a>
            <a href="#" className="px-8 py-3 border border-white text-white rounded-lg font-medium hover:bg-white/10 transition-colors">
              Schedule a Demo
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PricingPage;