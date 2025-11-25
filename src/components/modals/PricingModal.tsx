import React from 'react';
import { motion } from 'framer-motion';
import { X, Check } from 'lucide-react';
import { Link } from 'react-router-dom';

interface PricingModalProps {
  onClose: () => void;
  data?: {
    domain?: string;
    feature?: string;
  };
}

const PricingModal: React.FC<PricingModalProps> = ({ onClose, data = {} }) => {
  const plans = [
    {
      name: 'Professional',
      price: 249,
      period: 'month',
      features: [
        'Unlimited assessments',
        'All security domains',
        'Cross-framework mapping',
        'Advanced reporting',
        'Team collaboration',
        'API access',
        'Priority support',
      ],
      cta: 'Start Free Trial',
      highlight: true,
    },
    {
      name: 'Enterprise',
      price: null,
      period: 'custom',
      features: [
        'Everything in Professional',
        'Custom integrations',
        'On-premises deployment',
        'Dedicated support',
        'Custom frameworks',
        'SSO & advanced security',
        'SLA guarantees',
      ],
      cta: 'Contact Sales',
      highlight: false,
    }
  ];

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.9 }}
        className="bg-white dark:bg-gray-800 rounded-xl shadow-xl w-full max-w-3xl"
      >
        <div className="flex items-center justify-between p-6 border-b border-gray-200 dark:border-gray-700">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
            Upgrade Your Plan
          </h2>
          <button
            onClick={onClose}
            className="p-1 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
          >
            <X className="h-6 w-6 text-gray-500 dark:text-gray-400" />
          </button>
        </div>
        
        <div className="p-6">
          {data.domain && (
            <div className="mb-6 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-100 dark:border-blue-800">
              <p className="text-blue-700 dark:text-blue-300">
                <span className="font-medium">Upgrade required:</span> Access to the {data.domain} domain is only available on paid plans.
              </p>
            </div>
          )}
          
          {data.feature && (
            <div className="mb-6 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-100 dark:border-blue-800">
              <p className="text-blue-700 dark:text-blue-300">
                <span className="font-medium">Upgrade required:</span> The {data.feature} feature is only available on paid plans.
              </p>
            </div>
          )}
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {plans.map((plan, index) => (
              <div 
                key={plan.name}
                className={`border rounded-lg p-6 ${
                  plan.highlight 
                    ? 'border-blue-500 dark:border-blue-400 ring-2 ring-blue-200 dark:ring-blue-900/50' 
                    : 'border-gray-200 dark:border-gray-700'
                }`}
              >
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">{plan.name}</h3>
                
                {plan.price ? (
                  <div className="mb-4">
                    <span className="text-3xl font-bold text-gray-900 dark:text-white">${plan.price}</span>
                    <span className="text-gray-600 dark:text-gray-400">/{plan.period}</span>
                    <p className="text-sm text-gray-500 dark:text-gray-400">billed annually</p>
                  </div>
                ) : (
                  <div className="mb-4">
                    <span className="text-3xl font-bold text-gray-900 dark:text-white">Custom</span>
                    <p className="text-sm text-gray-500 dark:text-gray-400">tailored to your needs</p>
                  </div>
                )}
                
                <ul className="space-y-3 mb-6">
                  {plan.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-start">
                      <Check className="h-5 w-5 text-green-500 dark:text-green-400 mr-2 mt-0.5 flex-shrink-0" />
                      <span className="text-gray-700 dark:text-gray-300">{feature}</span>
                    </li>
                  ))}
                </ul>
                
                <Link
                  to={plan.highlight ? "/signup" : "/contact"}
                  className={`block w-full py-2 text-center rounded-md ${
                    plan.highlight 
                      ? 'bg-blue-600 text-white hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600' 
                      : 'border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700'
                  }`}
                >
                  {plan.cta}
                </Link>
              </div>
            ))}
          </div>
          
          <div className="mt-6 text-center">
            <Link to="/pricing" className="text-blue-600 dark:text-blue-400 hover:underline text-sm">
              View full pricing details
            </Link>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default PricingModal;