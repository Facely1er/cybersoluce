import React from 'react';
import { Link } from 'react-router-dom';
import { 
  Mail, 
  Globe, 
  Info,
  Users,
  Zap,
  Box,
  Lock,
  Database,
  CreditCard,
  ExternalLink,
  BookOpen,
  HelpCircle,
  Shield,
  FileText,
  CheckSquare
} from 'lucide-react';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="bg-gray-900 text-white">
      {/* Main Footer */}
      <div className="max-w-7xl mx-auto pt-10 pb-4 px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
          {/* Logo and social */}
          <div className="col-span-1 md:col-span-3">
            <div className="flex items-center mb-3">
              <img src="/cybersoluce.png" alt="CyberSoluce" className="h-12 w-12 mr-2" />
              <div className="flex flex-col">
                <span className="text-lg font-bold">CyberSoluce™</span>
                <span className="text-xs text-gray-400">by ERMITS</span>
              </div>
            </div>
            <p className="text-gray-400 mb-4 text-xs max-w-xs">
              Advanced cybersecurity governance platform aligned with NIST CSF 2.0, ISO 27001, and multi-framework orchestration for comprehensive organizational resilience management.
            </p>
            <div className="flex items-center space-x-3">
              <a href="https://linkedin.com/company/cybersoluce" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition-colors" aria-label="LinkedIn">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                </svg>
              </a>
              <a href="https://twitter.com/cybersoluce" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition-colors" aria-label="Twitter">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
                </svg>
              </a>
              <a href="https://github.com/cybersoluce" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition-colors" aria-label="GitHub">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd"/>
                </svg>
              </a>
            </div>
          </div>

          {/* Menu sections */}
          <div className="col-span-1 md:col-span-2">
            <h3 className="text-sm font-semibold text-white mb-3">Company</h3>
            <ul className="space-y-1">
              <li>
                <Link to="/about" className="text-gray-400 hover:text-white transition-colors flex items-center text-xs py-1">
                  <Info size={14} className="mr-1.5" />
                  <span>About</span>
                </Link>
              </li>
              <li>
                <Link to="/partners" className="text-gray-400 hover:text-white transition-colors flex items-center text-xs py-1">
                  <Users size={14} className="mr-1.5" />
                  <span>Partners</span>
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-gray-400 hover:text-white transition-colors flex items-center text-xs py-1">
                  <Mail size={14} className="mr-1.5" />
                  <span>Contact</span>
                </Link>
              </li>
            </ul>
          </div>

          <div className="col-span-1 md:col-span-2">
            <h3 className="text-sm font-semibold text-white mb-3">Solutions</h3>
            <ul className="space-y-1">
              <li>
                <Link to="/domains/threat-intelligence" className="text-gray-400 hover:text-white transition-colors flex items-center text-xs py-1">
                  <Zap size={14} className="mr-1.5" />
                  <span>CyberCaution</span>
                </Link>
              </li>
              <li>
                <Link to="/domains/supply-chain-risk" className="text-gray-400 hover:text-white transition-colors flex items-center text-xs py-1">
                  <Box size={14} className="mr-1.5" />
                  <span>VendorSoluce</span>
                </Link>
              </li>
              <li>
                <Link to="/domains/compliance-management" className="text-gray-400 hover:text-white transition-colors flex items-center text-xs py-1">
                  <Lock size={14} className="mr-1.5" />
                  <span>CyberCorrect</span>
                </Link>
              </li>
              <li>
                <Link to="/domains/training-awareness" className="text-gray-400 hover:text-white transition-colors flex items-center text-xs py-1">
                  <Database size={14} className="mr-1.5" />
                  <span>CyberCertitude</span>
                </Link>
              </li>
              <li>
                <Link to="/compliance" className="text-gray-400 hover:text-white transition-colors flex items-center text-xs py-1">
                  <Shield size={14} className="mr-1.5" />
                  <span>Compliance</span>
                </Link>
              </li>
            </ul>
          </div>

          <div className="col-span-1 md:col-span-2">
            <h3 className="text-sm font-semibold text-white mb-3">Resources</h3>
            <ul className="space-y-1">
              <li>
                <Link to="/resources" className="text-gray-400 hover:text-white transition-colors flex items-center text-xs py-1">
                  <BookOpen size={14} className="mr-1.5" />
                  <span>Documentation</span>
                </Link>
              </li>
              <li>
                <Link to="/docs" className="text-gray-400 hover:text-white transition-colors flex items-center text-xs py-1">
                  <FileText size={14} className="mr-1.5" />
                  <span>Docs</span>
                </Link>
              </li>
              <li>
                <a href="https://www.cybercorrect.com" className="text-gray-400 hover:text-white transition-colors flex items-center text-xs py-1" target="_blank" rel="noopener noreferrer">
                  <ExternalLink size={14} className="mr-1.5" />
                  <span>CyberCorrect™</span>
                </a>
              </li>
              <li>
                <Link to="/support" className="text-gray-400 hover:text-white transition-colors flex items-center text-xs py-1">
                  <HelpCircle size={14} className="mr-1.5" />
                  <span>Support</span>
                </Link>
              </li>
            </ul>
          </div>

          <div className="col-span-1 md:col-span-3">
            <h3 className="text-sm font-semibold text-white mb-3">Get Started</h3>
            <ul className="space-y-1">
              <li>
                <Link to="/pricing" className="text-gray-400 hover:text-white transition-colors flex items-center text-xs py-1">
                  <CreditCard size={14} className="mr-1.5" />
                  <span>Pricing</span>
                </Link>
              </li>
              <li>
                <Link to="/demo" className="text-gray-400 hover:text-white transition-colors flex items-center text-xs py-1">
                  <CheckSquare size={14} className="mr-1.5" />
                  <span>Demo</span>
                </Link>
              </li>
              <li>
                <Link to="/experience" className="text-gray-400 hover:text-white transition-colors flex items-center text-xs py-1">
                  <CheckSquare size={14} className="mr-1.5" />
                  <span>Experience It</span>
                </Link>
              </li>
              <li className="flex items-center text-xs text-gray-400 mt-3 pt-3 border-t border-gray-800">
                <Mail className="h-4 w-4 text-blue-500 mr-1.5" />
                <a href="mailto:contact@ermits.com" className="hover:text-white transition-colors">contact@ermits.com</a>
              </li>
            </ul>
          </div>
        </div>
      </div>
      
      {/* Bottom Footer */}
      <div className="border-t border-gray-800">
        <div className="max-w-7xl mx-auto py-4 px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div className="flex flex-wrap items-center gap-4 text-xs">
              <span className="text-gray-400">© {currentYear} ERMITS LLC. All rights reserved </span>
              <Link to="/privacy" className="text-gray-400 hover:text-white transition-colors">Privacy</Link>
              <Link to="/terms" className="text-gray-400 hover:text-white transition-colors">Terms</Link>
              <Link to="/security" className="text-gray-400 hover:text-white transition-colors">Security</Link>
            </div>
            
            <div className="flex items-center">
              <Globe className="h-3.5 w-3.5 text-gray-500 mr-1" />
              <select 
                className="bg-gray-800 border border-gray-700 text-gray-300 text-xs rounded-md px-2 py-1 focus:outline-none focus:ring-1 focus:ring-blue-500"
                aria-label="Select region"
                title="Select region"
              >
                <option value="global">Global</option>
                <option value="eu">European Union</option>
                <option value="na">North America</option>
                <option value="apac">Asia Pacific</option>
              </select>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;