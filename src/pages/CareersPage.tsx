import React from 'react';
import { Briefcase, Users, MapPin, Star, Zap, Heart, Coffee, Book, Shield } from 'lucide-react';

const CareersPage = () => {
  const positions = [
    {
      title: 'Senior Security Engineer',
      department: 'Engineering',
      location: 'Remote',
      type: 'Full-time',
    },
    {
      title: 'Product Manager',
      department: 'Product',
      location: 'New York, NY',
      type: 'Full-time',
    },
    {
      title: 'Security Analyst',
      department: 'Security',
      location: 'London, UK',
      type: 'Full-time',
    },
    {
      title: 'Customer Success Manager',
      department: 'Customer Success',
      location: 'Remote',
      type: 'Full-time',
    },
  ];

  const benefits = [
    {
      icon: Heart,
      title: 'Health & Wellness',
      description: 'Comprehensive health insurance and wellness programs',
    },
    {
      icon: Coffee,
      title: 'Work-Life Balance',
      description: 'Flexible working hours and unlimited PTO',
    },
    {
      icon: Book,
      title: 'Learning & Development',
      description: 'Professional development and certification support',
    },
    {
      icon: Star,
      title: 'Equity',
      description: 'Competitive equity package for all employees',
    },
  ];

  const values = [
    {
      icon: Shield,
      title: 'Security First',
      description: 'We prioritize security in everything we do',
    },
    {
      icon: Users,
      title: 'Collaborative',
      description: 'We work together to achieve common goals',
    },
    {
      icon: Zap,
      title: 'Innovation',
      description: 'We constantly push boundaries and embrace new ideas',
    },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-16">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
          Join Our Team
        </h1>
        <p className="text-xl text-gray-600 dark:text-gray-300">
          Help us build the future of security assessment
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {values.map((value) => {
          const Icon = value.icon;
          return (
            <div key={value.title} className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 text-center">
              <Icon className="h-12 w-12 text-blue-600 dark:text-blue-400 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                {value.title}
              </h3>
              <p className="text-gray-600 dark:text-gray-300">
                {value.description}
              </p>
            </div>
          );
        })}
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-8">
          Open Positions
        </h2>
        <div className="space-y-6">
          {positions.map((position) => (
            <div
              key={position.title}
              className="border border-gray-200 dark:border-gray-700 rounded-lg p-6 hover:border-blue-500 dark:hover:border-blue-400 transition-colors"
            >
              <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                    {position.title}
                  </h3>
                  <div className="flex flex-wrap gap-4 text-sm text-gray-600 dark:text-gray-300">
                    <span className="flex items-center">
                      <Briefcase className="h-4 w-4 mr-1" />
                      {position.department}
                    </span>
                    <span className="flex items-center">
                      <MapPin className="h-4 w-4 mr-1" />
                      {position.location}
                    </span>
                    <span className="flex items-center">
                      <Users className="h-4 w-4 mr-1" />
                      {position.type}
                    </span>
                  </div>
                </div>
                <a 
                  href={`mailto:careers@ermits.com?subject=Application for ${position.title}&body=Hello, I am interested in applying for the ${position.title} position.`}
                  className="mt-4 md:mt-0 inline-flex items-center px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 transition-colors"
                >
                  Apply Now
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-8">
          Benefits & Perks
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {benefits.map((benefit) => {
            const Icon = benefit.icon;
            return (
              <div key={benefit.title} className="text-center">
                <Icon className="h-12 w-12 text-blue-600 dark:text-blue-400 mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                  {benefit.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-300">
                  {benefit.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default CareersPage;