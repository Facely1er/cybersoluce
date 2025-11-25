import React from 'react';
import { HelpCircle, MessageSquare, Phone, Mail, FileText, Book, ExternalLink } from 'lucide-react';

const SupportPage = () => {
  const supportChannels = [
    {
      title: 'Documentation',
      description: 'Browse our comprehensive governance platform documentation and best practices',
      icon: Book,
      link: '/docs',
      buttonText: 'View Documentation',
    },
    {
      title: 'Live Chat',
      description: '24/7 governance expert chat support for immediate assistance',
      icon: MessageSquare,
      link: '#chat',
      buttonText: 'Start Chat',
    },
    {
      title: 'Email Support',
      description: 'Send us an email for detailed governance platform inquiries',
      icon: Mail,
      link: 'mailto:support@example.com',
      buttonText: 'Send Email',
    },
    {
      title: 'Phone Support',
      description: 'Governance experts available during business hours',
      icon: Phone,
      link: 'tel:+1234567890',
      buttonText: 'Call Support',
    },
  ];

  const faqs = [
    {
      question: 'How do I get started with the governance platform?',
      answer: 'Our governance platform offers executive onboarding with strategic guidance. Begin by requesting a demo, and our governance experts will help you configure the system according to your organizational needs.',
    },
    {
      question: 'What governance frameworks does the platform support?',
      answer: 'We support major frameworks including NIST CSF 2.0, ISO 27001, CMMC 2.0, and regional frameworks. Our Framework Fusion Technology™ automatically maps controls across different frameworks for unified governance.',
    },
    {
      question: 'How often is governance intelligence updated?',
      answer: 'Governance intelligence is continuously updated through our Intelligence Engine™ based on new threats, regulatory changes, and ERMITS ecosystem data. We recommend quarterly strategic reviews.',
    },
    {
      question: 'Can I integrate with existing governance and security tools?',
      answer: 'Yes, our governance platform offers extensive integration capabilities with the ERMITS ecosystem, popular GRC platforms, SIEM systems, and executive reporting tools.',
    },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-16">
      <div className="text-center mb-12">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
          Governance Support Center
        </h1>
        <p className="text-lg text-gray-600 dark:text-gray-300">
          Get expert guidance for your cybersecurity governance initiatives
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {supportChannels.map((channel) => {
          const Icon = channel.icon;
          return (
            <div key={channel.title} className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
              <div className="flex flex-col items-center text-center">
                <Icon className="h-12 w-12 text-blue-600 dark:text-blue-400 mb-4" />
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                  {channel.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-300 mb-4">
                  {channel.description}
                </p>
                <a
                  href={channel.link}
                  className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600"
                >
                  {channel.buttonText}
                  <ExternalLink className="ml-2 h-4 w-4" />
                </a>
              </div>
            </div>
          );
        })}
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-8">
          Frequently Asked Questions
        </h2>
        <p className="text-gray-600 dark:text-gray-300 mb-8 text-center">
          Common questions about our cybersecurity governance platform and strategic intelligence capabilities.
        </p>
        <div className="space-y-6">
          {faqs.map((faq, index) => (
            <div key={index} className="border-b border-gray-200 dark:border-gray-700 pb-6 last:border-0">
              <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
                {faq.question}
              </h3>
              <p className="text-gray-600 dark:text-gray-300">
                {faq.answer}
              </p>
            </div>
          ))}
        </div>
      </div>

      <div className="bg-blue-600 dark:bg-blue-700 rounded-lg shadow-lg p-8 text-white">
        <div className="flex flex-col md:flex-row items-center justify-between">
          <div className="mb-6 md:mb-0">
            <h2 className="text-2xl font-bold mb-2">Need Governance Strategy Consultation?</h2>
            <p className="text-blue-100">
              Our governance experts are available 24/7 to provide strategic guidance
            </p>
          </div>
          <div className="flex space-x-4">
            <button className="px-6 py-3 bg-white text-blue-600 rounded-md hover:bg-blue-50 transition-colors"
              onClick={() => window.location.href = '/contact'}>
              Contact Governance Expert
            </button>
            <button className="px-6 py-3 border border-white text-white rounded-md hover:bg-blue-700 transition-colors"
              onClick={() => window.location.href = '/demo'}>
              Schedule Strategy Session
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SupportPage;