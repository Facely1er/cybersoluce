import React from 'react';
import { motion } from 'framer-motion';
import { Mail, Phone, MapPin, Clock, ArrowRight, MessageSquare } from 'lucide-react';
import ContactForm from '../components/forms/ContactForm';

const ContactPage = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-center mb-16"
      >
        <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
          Contact Us
        </h1>
        <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
          Get in touch with our governance experts for strategic cybersecurity consulting, platform demonstrations, or enterprise solutions
        </p>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-5 gap-10 mb-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="md:col-span-3 bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8"
        >
          <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-6">
            Send Us a Message
          </h2>
          <p className="text-gray-600 dark:text-gray-400 mb-6">
            Whether you're looking to transform your cybersecurity governance, integrate with the ERMITS ecosystem, or explore our executive intelligence capabilities, our team is here to help.
          </p>
          <form className="space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Full Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
                  placeholder="Your name"
                />
              </div>
              
              <div>
                <label htmlFor="interest" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Area of Interest
                </label>
                <select
                  id="interest"
                  name="interest"
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
                >
                  <option value="">Select an area</option>
                  <option value="governance">Cybersecurity Governance</option>
                  <option value="framework-mapping">Framework Fusion Technology™</option>
                  <option value="executive-intelligence">Executive Command Center</option>
                  <option value="maturity-tracking">Maturity Acceleration</option>
                  <option value="ermits-integration">ERMITS Ecosystem Integration</option>
                  <option value="enterprise-solutions">Enterprise Solutions</option>
                  <option value="other">Other</option>
                </select>
              </div>
              
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Email Address
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
                  placeholder="Your email"
                />
              </div>
            </div>
            
            <div>
              <label htmlFor="subject" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Subject
              </label>
              <input
                type="text"
                id="subject"
                name="subject"
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
                placeholder="How can we help you?"
              />
            </div>
            
            <div>
              <label htmlFor="message" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Message
              </label>
              <textarea
                id="message"
                name="message"
                rows={5}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
                placeholder="Your message..."
              ></textarea>
            </div>
            
            <div>
              <button
                type="submit"
                className="w-full flex justify-center items-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                onClick={(e) => {
                  e.preventDefault();
                  // Collect form data
                  const form = e.currentTarget.closest('form') as HTMLFormElement;
                  const formData = new FormData(form);
                  const data = Object.fromEntries(formData.entries());
                  console.log('Contact form submitted:', data);
                  alert('Thank you for your message! We will get back to you soon.');
                  form.reset();
                }}
              >
                Send Message
                <ArrowRight className="ml-2 h-4 w-4" />
              </button>
            </div>
          </form>
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="md:col-span-2 bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8"
        >
          <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-6">
            Contact Information
          </h2>
          <p className="text-gray-600 dark:text-gray-300 mb-6">
            Our governance experts are available to discuss how CyberSoluce can transform your cybersecurity strategy.
          </p>
          
          <div className="space-y-6">
            <div className="flex items-start">
              <div className="flex-shrink-0">
                <div className="bg-blue-100 dark:bg-blue-900/30 p-3 rounded-lg">
                  <MapPin className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                </div>
              </div>
              <div className="ml-4">
                <h3 className="text-lg font-medium text-gray-900 dark:text-white">
                  Office Location
                </h3>
                <address className="mt-1 text-gray-600 dark:text-gray-300 not-italic">
                  8300 McCullough Lane<br />
                  Suite 203<br />
                  Gaithersburg, MD 20877
                </address>
              </div>
            </div>
            
            <div className="flex items-start">
              <div className="flex-shrink-0">
                <div className="bg-blue-100 dark:bg-blue-900/30 p-3 rounded-lg">
                  <Phone className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                </div>
              </div>
              <div className="ml-4">
                <h3 className="text-lg font-medium text-gray-900 dark:text-white">
                  Phone
                </h3>
                <p className="mt-1 text-gray-600 dark:text-gray-300">
                  <a href="tel:+18886186160" className="hover:text-blue-600 dark:hover:text-blue-400">
                    +1 (240) 599-0102
                  </a>
                </p>
              </div>
            </div>
            
            <div className="flex items-start">
              <div className="flex-shrink-0">
                <div className="bg-blue-100 dark:bg-blue-900/30 p-3 rounded-lg">
                  <Mail className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                </div>
              </div>
              <div className="ml-4">
                <h3 className="text-lg font-medium text-gray-900 dark:text-white">
                  Email
                </h3>
                <p className="mt-1 text-gray-600 dark:text-gray-300">
                  <a href="mailto:contact@ermits.com" className="hover:text-blue-600 dark:hover:text-blue-400">
                    contact@ermits.com
                  </a>
                </p>
              </div>
            </div>
            
            <div className="flex items-start">
              <div className="flex-shrink-0">
                <div className="bg-blue-100 dark:bg-blue-900/30 p-3 rounded-lg">
                  <Clock className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                </div>
              </div>
              <div className="ml-4">
                <h3 className="text-lg font-medium text-gray-900 dark:text-white">
                  Business Hours
                </h3>
                <p className="mt-1 text-gray-600 dark:text-gray-300">
                  Monday - Friday: 9:00 AM - 5:00 PM EST<br />
                  Saturday - Sunday: Closed
                </p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
      
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.3 }}
        className="bg-blue-600 dark:bg-blue-800 rounded-lg shadow-lg p-8 text-center"
      >
        <h2 className="text-2xl font-bold text-white mb-4">
          Ready to transform your cybersecurity governance?
        </h2>
        <p className="text-blue-100 max-w-3xl mx-auto mb-8">
          Our governance experts are available to demonstrate how CyberSoluce can revolutionize your cybersecurity strategy with AI-powered intelligence
        </p>
        <div className="flex flex-wrap justify-center gap-4">
          <a
            href="tel:+18886186160"
            className="inline-flex items-center px-6 py-3 bg-white text-blue-700 rounded-lg hover:bg-blue-50 transition-colors font-medium"
          >
            <Phone className="mr-2 h-5 w-5" />
            Speak with Expert
          </a>
          <a
            href="#"
            className="inline-flex items-center px-6 py-3 border border-white text-white rounded-lg hover:bg-white/10 transition-colors font-medium"
          >
            <MessageSquare className="mr-2 h-5 w-5" />
            Schedule Demo
          </a>
        </div>
      </motion.div>
    </div>
  );
};

export default ContactPage;