import React, { useState, useEffect, useCallback } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import { Book, FileText, Shield, Globe, Code, HelpCircle, Wrench, TestTube, AlertTriangle, Download, Search, ExternalLink, ArrowLeft, ArrowRight, Clock, ChevronRight, Home, ArrowUp, CheckCircle } from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import { motion, AnimatePresence } from 'framer-motion';
import SEOHead from '../components/common/SEOHead';
import LoadingSpinner from '../components/common/LoadingSpinner';
import { useAnalytics } from '../components/common/Analytics';

const DocumentationPage = () => {
  const { docId } = useParams();
  const navigate = useNavigate();
  const [content, setContent] = useState<string>('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [tocVisible, setTocVisible] = useState(false);
  const [headings, setHeadings] = useState<{level: number; text: string; id: string}[]>([]);
  const [activeHeading, setActiveHeading] = useState<string | null>(null);
  const [showScrollTop, setShowScrollTop] = useState(false);
  const { trackEvent, trackDownload, trackOutboundLink } = useAnalytics();

  // Map of documentation metadata
  const docContent: Record<string, { title: string; path: string; description: string; icon: React.ElementType; category: string }> = {
    'getting-started': {
      title: 'Getting Started Guide',
      path: '/docs/getting-started.md',
      description: 'Quick start guide and basic concepts to begin using CyberSoluce effectively',
      icon: Book,
      category: 'Getting Started'
    },
    'architecture': {
      title: 'Architecture Guide',
      path: '/docs/architecture.md',
      description: 'Technical overview of CyberSoluce architecture, components, and design principles',
      icon: Code,
      category: 'Getting Started'
    },
    'components': {
      title: 'Component Documentation',
      path: '/docs/components.md',
      description: 'Detailed documentation for reusable UI components and their implementation',
      icon: Wrench,
      category: 'Getting Started'
    },
    'implementation-guide': {
      title: 'Implementation Guide',
      path: '/docs/implementation-guide.md',
      description: 'Comprehensive step-by-step guide for implementing CyberSoluce in your organization',
      icon: FileText,
      category: 'Implementation'
    },
    'deployment': {
      title: 'Deployment Guide',
      path: '/docs/deployment.md',
      description: 'Instructions for deploying CyberSoluce across different environments and regions',
      icon: Globe,
      category: 'Implementation'
    },
    'api': {
      title: 'API Documentation',
      path: '/docs/api.md',
      description: 'Comprehensive API reference and integration patterns for extending CyberSoluce',
      icon: Code,
      category: 'Implementation'
    },
    'security': {
      title: 'Security Guide',
      path: '/docs/security.md',
      description: 'Security architecture, features, and best practices for securing your implementation',
      icon: Shield,
      category: 'Security & Compliance'
    },
    'compliance-guide': {
      title: 'Compliance Guide',
      path: '/docs/compliance-guide.md',
      description: 'Framework compliance and regulatory guidance for different regions',
      icon: Shield,
      category: 'Security & Compliance'
    },
    'regional-adaptation': {
      title: 'Regional Adaptation Guide',
      path: '/docs/regional-adaptation.md',
      description: 'Strategies for adapting CyberSoluce to different geographic regions and regulations',
      icon: Globe,
      category: 'Security & Compliance'
    },
    'customization': {
      title: 'Customization Guide',
      path: '/docs/customization.md',
      description: 'Platform customization options and configuration techniques',
      icon: Wrench,
      category: 'Customization'
    },
    'testing': {
      title: 'Testing Guide',
      path: '/docs/testing.md',
      description: 'Testing methodologies and best practices for quality assurance',
      icon: TestTube,
      category: 'Customization'
    },
    'troubleshooting': {
      title: 'Troubleshooting Guide',
      path: '/docs/troubleshooting.md',
      description: 'Solutions for common issues and debugging strategies',
      icon: AlertTriangle,
      category: 'Customization'
    },
  };

  useEffect(() => {
    // Scroll tracking for active heading and scroll-to-top button
    const handleScroll = () => {
      const scrollY = window.scrollY;
      setShowScrollTop(scrollY > 400);
      
      // Find active heading based on scroll position
      if (headings.length > 0) {
        let activeId = null;
        for (const heading of headings) {
          const element = document.getElementById(heading.id);
          if (element) {
            const rect = element.getBoundingClientRect();
            if (rect.top <= 100) {
              activeId = heading.id;
            } else {
              break;
            }
          }
        }
        setActiveHeading(activeId);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [headings]);

  useEffect(() => {
    const loadContent = async () => {
      if (!docId || !docContent[docId]) {
        setContent('');
        return;
      }

      setIsLoading(true);
      setError(null);

      try {
        const response = await fetch(docContent[docId].path);
        if (!response.ok) {
          throw new Error(`Failed to load documentation: ${response.statusText}`);
        }
        const text = await response.text();
        setContent(text);
        
        // Extract headings for table of contents
        const headingsRegex = /^(#{1,3})\s+(.+)$/gm;
        const matches = [...text.matchAll(headingsRegex)];
        const extractedHeadings = matches.map(match => {
          const level = match[1].length;
          const text = match[2];
          const id = text.toLowerCase().replace(/[^\w\s]/g, '').replace(/\s+/g, '-');
          return { level, text, id };
        });
        setHeadings(extractedHeadings);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to load documentation');
        setContent('');
      } finally {
        setIsLoading(false);
      }
    };

    loadContent();
  }, [docId]);

  const scrollToTop = useCallback(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    trackEvent('scroll_to_top', { page: docId || 'index' });
  }, [docId, trackEvent]);

  const scrollToHeading = useCallback((headingId: string) => {
    const element = document.getElementById(headingId);
    if (element) {
      const headerOffset = 80;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
      
      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  }, []);

  const sections = [
    {
      title: 'Getting Started',
      icon: Book,
      items: [
        { id: 'getting-started', title: 'Getting Started Guide' },
        { id: 'architecture', title: 'Architecture Guide' },
        { id: 'components', title: 'Component Documentation' },
      ],
    },
    {
      title: 'Implementation',
      icon: Code,
      items: [
        { id: 'implementation-guide', title: 'Implementation Guide' },
        { id: 'deployment', title: 'Deployment Guide' },
        { id: 'api', title: 'API Documentation' },
      ],
    },
    {
      title: 'Security & Compliance',
      icon: Shield,
      items: [
        { id: 'security', title: 'Security Guide' },
        { id: 'compliance-guide', title: 'Compliance Guide' },
        { id: 'regional-adaptation', title: 'Regional Adaptation' },
      ],
    },
    {
      title: 'Customization',
      icon: Wrench,
      items: [
        { id: 'customization', title: 'Customization Guide' },
        { id: 'testing', title: 'Testing Guide' },
        { id: 'troubleshooting', title: 'Troubleshooting' },
      ],
    },
  ];

  const filteredSections = searchTerm ? sections.map(section => ({
    ...section,
    items: section.items.filter(item => 
      item.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
      (docContent[item.id]?.description.toLowerCase().includes(searchTerm.toLowerCase()))
    )
  })).filter(section => section.items.length > 0) : sections;

  const handleDownloadPdf = () => {
    // In a real implementation, this would generate and download a PDF
    if (docId) {
      trackDownload(`${docId}.pdf`, 'Documentation');
      console.log(`Downloading PDF for ${docId}`);
      alert('PDF download feature is not implemented in this demo');
    }
  };

  // Get next and previous document IDs
  const getAllDocIds = () => sections.flatMap(section => section.items.map(item => item.id));
  const allDocIds = getAllDocIds();
  const currentIndex = allDocIds.indexOf(docId || '');
  const prevDocId = currentIndex > 0 ? allDocIds[currentIndex - 1] : null;
  const nextDocId = currentIndex < allDocIds.length - 1 ? allDocIds[currentIndex + 1] : null;

  return (
    <>
      <SEOHead 
        title={docId && docContent[docId] ? `${docContent[docId].title}` : "Documentation"}
        description={docId && docContent[docId] ? docContent[docId].description : "Browse comprehensive documentation and guides for CyberSoluce security assessment platform."}
        canonical={`https://resources.cybersoluce.com${docId ? `/docs/${docId}` : '/docs'}`}
      />
      
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Sidebar Navigation */}
          <div className="lg:col-span-1">
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-4 mb-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 dark:text-gray-500" size={18} />
                <input
                  type="text"
                  placeholder="Search documentation..."
                  className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 focus:border-transparent text-gray-700 dark:text-gray-200"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
            </div>
            
            <nav className="space-y-6 bg-white dark:bg-gray-800 rounded-lg shadow-md p-4 sticky top-6">
              {filteredSections.map((section) => {
                const Icon = section.icon;
                return (
                  <div key={section.title}>
                    <div className="flex items-center mb-3">
                      <Icon className="h-5 w-5 text-blue-600 dark:text-blue-400 mr-2" />
                      <h3 className="text-sm font-medium text-gray-900 dark:text-white">
                        {section.title}
                      </h3>
                    </div>
                    <ul className="space-y-1">
                      {section.items.map((item) => (
                        <li key={item.id}>
                          <Link
                            to={`/docs/${item.id}`}
                            className={`block px-3 py-2 rounded-lg text-sm ${
                              docId === item.id
                                ? 'bg-blue-50 dark:bg-blue-900/50 text-blue-700 dark:text-blue-300 font-medium'
                                : 'text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800 hover:text-gray-900 dark:hover:text-white'
                            }`}
                            onClick={() => trackEvent('documentation_navigate', {
                              event_category: 'Documentation',
                              event_label: item.title,
                              from_page: docId || 'index'
                            })}
                          >
                            <div className="flex items-center justify-between">
                              <span className="truncate">{item.title}</span>
                              {docId === item.id && (
                                <ChevronRight size={16} className="text-blue-600 dark:text-blue-400 flex-shrink-0" />
                              )}
                            </div>
                            {docId === item.id && (
                              <p className="text-xs text-gray-500 dark:text-gray-400 mt-1 line-clamp-2">
                                {docContent[item.id]?.description}
                              </p>
                            )}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                );
              })}
            </nav>
          </div>

          {/* Documentation Content */}
          <div className="lg:col-span-3">
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden">
              {docId && docContent[docId] ? (
                <motion.div
                  key={docId}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="p-8 border-b border-gray-200 dark:border-gray-700 bg-gradient-to-r from-gray-50 to-white dark:from-gray-800 dark:to-gray-800">
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                      <div className="flex items-center">
                        <div className="bg-blue-100 dark:bg-blue-900/30 p-3 rounded-xl mr-4">
                          {React.createElement(docContent[docId].icon, { 
                            size: 28, 
                            className: "text-blue-600 dark:text-blue-400" 
                          })}
                        </div>
                        <div>
                          <div className="text-xs font-semibold text-blue-600 dark:text-blue-400 uppercase tracking-wider mb-1">
                            {docContent[docId].category}
                          </div>
                          <h1 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white leading-tight">
                            {docContent[docId].title}
                          </h1>
                        </div>
                      </div>
                      <div className="flex flex-wrap gap-3">
                        <button 
                          className="inline-flex items-center px-4 py-2.5 border border-gray-300 dark:border-gray-600 rounded-lg shadow-sm text-sm font-semibold text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700 transition-all"
                          onClick={handleDownloadPdf}
                        >
                          <Download size={16} className="mr-1.5" />
                          PDF
                        </button>
                        <button className="inline-flex items-center px-4 py-2.5 border border-transparent rounded-lg shadow-sm text-sm font-semibold text-white bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 transition-all">
                          <ExternalLink size={16} className="mr-1.5" />
                          Share
                        </button>
                      </div>
                    </div>
                    
                    <div className="flex items-center text-sm text-gray-500 dark:text-gray-400 mt-4">
                      <Clock size={14} className="mr-2" />
                      <span className="mr-6">Last updated: {new Date().toLocaleDateString('en-US', { 
                        year: 'numeric', 
                        month: 'short', 
                        day: 'numeric' 
                      })} • Reading time: ~12 min</span>
                    </div>
                  </div>
                  
                  <div className="p-6 md:p-8">
                    <div className="flex flex-col md:flex-row gap-6">
                      {/* Main content area */}
                      <div className={`${tocVisible ? "md:w-3/4" : "w-full"}`}>
                        <div className="mb-6 p-4 border-l-4 border-blue-500 bg-blue-50 dark:bg-blue-900/20 dark:border-blue-700 rounded-r-lg">
                          <p className="text-blue-800 dark:text-blue-300 text-sm md:text-base leading-relaxed">
                            {docContent[docId].description}
                          </p>
                        </div>
                        
                        <button 
                          onClick={() => setTocVisible(!tocVisible)}
                          className="md:hidden mb-4 text-sm font-medium text-blue-600 dark:text-blue-400 flex items-center hover:text-blue-800 dark:hover:text-blue-300 transition-colors"
                        >
                          {tocVisible ? "Hide Table of Contents" : "Show Table of Contents"}
                          <ChevronRight className={`ml-2 h-4 w-4 transform transition-transform ${tocVisible ? "rotate-90" : ""}`} />
                        </button>
                        
                        {isLoading ? (
                          <LoadingSpinner size="lg" text="Loading documentation..." />
                        ) : error ? (
                          <div className="text-center py-16">
                            <AlertTriangle size={48} className="text-red-500 dark:text-red-400 mx-auto mb-6" />
                            <h2 className="text-xl md:text-2xl font-semibold text-red-600 dark:text-red-400 mb-4">
                              Error Loading Documentation
                            </h2>
                            <p className="text-gray-600 dark:text-gray-300 mb-8 text-base md:text-lg">{error}</p>
                            <button
                              onClick={() => window.location.reload()}
                              className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 font-semibold transition-all"
                            >
                              Try Again
                            </button>
                          </div>
                        ) : (
                          <article className="prose prose-base md:prose-lg dark:prose-invert max-w-none
                            prose-headings:font-bold prose-headings:tracking-tight
                            prose-h1:text-3xl prose-h1:mb-8 prose-h1:text-gray-900 dark:prose-h1:text-white
                            prose-h2:text-2xl prose-h2:mt-12 prose-h2:mb-6 prose-h2:text-gray-900 dark:prose-h2:text-white prose-h2:border-b prose-h2:border-gray-200 dark:prose-h2:border-gray-700 prose-h2:pb-3
                            prose-h3:text-xl prose-h3:mt-8 prose-h3:mb-4 prose-h3:text-gray-900 dark:prose-h3:text-white
                            prose-h4:text-lg prose-h4:mt-6 prose-h4:mb-3 prose-h4:text-gray-900 dark:prose-h4:text-white
                            prose-p:text-gray-700 dark:prose-p:text-gray-300 prose-p:leading-relaxed prose-p:mb-4
                            prose-a:text-blue-600 dark:prose-a:text-blue-400 prose-a:no-underline hover:prose-a:underline prose-a:font-medium
                            prose-ul:text-gray-700 dark:prose-ul:text-gray-300 prose-ul:mb-4
                            prose-ol:text-gray-700 dark:prose-ol:text-gray-300 prose-ol:mb-4
                            prose-li:mb-2 prose-li:leading-relaxed
                            prose-code:text-blue-700 dark:prose-code:text-blue-300 prose-code:bg-blue-50 dark:prose-code:bg-blue-900/30 prose-code:px-1.5 prose-code:py-0.5 prose-code:rounded prose-code:text-sm prose-code:font-medium
                            prose-pre:bg-gray-900 dark:prose-pre:bg-gray-950 prose-pre:border prose-pre:border-gray-700 prose-pre:rounded-lg prose-pre:overflow-hidden prose-pre:text-sm
                            prose-blockquote:border-l-4 prose-blockquote:border-blue-500 prose-blockquote:bg-blue-50 dark:prose-blockquote:bg-blue-900/20 prose-blockquote:p-4 prose-blockquote:rounded-r prose-blockquote:my-6
                            prose-strong:text-gray-900 dark:prose-strong:text-white prose-strong:font-semibold
                            prose-table:border-collapse prose-table:border prose-table:border-gray-200 dark:prose-table:border-gray-700
                            prose-th:bg-gray-50 dark:prose-th:bg-gray-800 prose-th:border prose-th:border-gray-200 dark:prose-th:border-gray-700 prose-th:px-4 prose-th:py-2 prose-th:text-left prose-th:font-semibold
                            prose-td:border prose-td:border-gray-200 dark:prose-td:border-gray-700 prose-td:px-4 prose-td:py-2
                            prose-hr:border-gray-300 dark:prose-hr:border-gray-600 prose-hr:my-8"
                          >
                            <ReactMarkdown 
                              components={{
                                h1: ({ children, ...props }) => {
                                  const id = children?.toString().toLowerCase().replace(/[^\w\s]/g, '').replace(/\s+/g, '-');
                                  return <h1 id={id} {...props}>{children}</h1>;
                                },
                                h2: ({ children, ...props }) => {
                                  const id = children?.toString().toLowerCase().replace(/[^\w\s]/g, '').replace(/\s+/g, '-');
                                  return <h2 id={id} {...props}>{children}</h2>;
                                },
                                h3: ({ children, ...props }) => {
                                  const id = children?.toString().toLowerCase().replace(/[^\w\s]/g, '').replace(/\s+/g, '-');
                                  return <h3 id={id} {...props}>{children}</h3>;
                                },
                                code: ({ inline, children, ...props }) => {
                                  return inline ? (
                                    <code {...props}>{children}</code>
                                  ) : (
                                    <div className="relative">
                                      <pre className="relative overflow-x-auto">
                                        <code {...props}>{children}</code>
                                      </pre>
                                      <button
                                        onClick={() => {
                                          navigator.clipboard.writeText(children?.toString() || '');
                                          trackEvent('code_copy', { page: docId });
                                        }}
                                        className="absolute top-2 right-2 p-1.5 bg-gray-700 hover:bg-gray-600 text-gray-300 hover:text-white rounded text-xs transition-colors"
                                        title="Copy code"
                                      >
                                        Copy
                                      </button>
                                    </div>
                                  );
                                }
                              }}
                            >
                              {content}
                            </ReactMarkdown>
                          </article>
                        )}
                      </div>
                      
                      {/* Table of Contents sidebar */}
                      {(tocVisible || headings.length > 0) && (
                        <div className={`${tocVisible ? 'block' : 'hidden'} md:block md:w-1/4`}>
                          <div className="sticky top-24 bg-white dark:bg-gray-800 rounded-xl p-4 border border-gray-200 dark:border-gray-700 shadow-lg">
                            <h3 className="text-sm font-bold text-gray-900 dark:text-white mb-3 pb-2 border-b border-gray-200 dark:border-gray-700 flex items-center">
                              <Book className="h-4 w-4 mr-2 text-blue-600 dark:text-blue-400" />
                              On This Page
                            </h3>
                            <nav className="space-y-1 max-h-96 overflow-y-auto">
                              {headings.map((heading, index) => (
                                <button
                                  key={index}
                                  onClick={() => scrollToHeading(heading.id)}
                                  className={`block w-full text-left text-sm hover:text-blue-600 dark:hover:text-blue-400 transition-all py-2 px-2 rounded-md ${
                                    activeHeading === heading.id 
                                      ? 'text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-900/30 font-medium' 
                                      : ''
                                  } ${
                                    heading.level === 1 
                                      ? "font-semibold text-gray-900 dark:text-white pl-0" 
                                      : heading.level === 2 
                                        ? "pl-3 text-gray-700 dark:text-gray-300" 
                                        : "pl-6 text-gray-600 dark:text-gray-400 text-xs"
                                  }`}
                                >
                                  {heading.text}
                                </button>
                              ))}
                            </nav>
                          </div>
                        </div>
                      )}
                    </div>
                    
                    <div className="mt-12 pt-8 border-t border-gray-200 dark:border-gray-700 grid grid-cols-1 md:grid-cols-2 gap-6">
                      {prevDocId && (
                        <button
                          onClick={() => {
                            navigate(`/docs/${prevDocId}`);
                            trackEvent('documentation_navigate', {
                              event_category: 'Documentation',
                              event_label: docContent[prevDocId].title,
                              navigation_type: 'previous'
                            });
                          }}
                          className="w-full p-6 border border-gray-200 dark:border-gray-700 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-700 hover:border-blue-300 dark:hover:border-blue-500 transition-all text-left flex items-center group"
                        >
                          <ArrowLeft className="h-5 w-5 text-gray-400 dark:text-gray-500 mr-4 flex-shrink-0 group-hover:text-blue-500 dark:group-hover:text-blue-400 transition-colors" />
                          <div className="min-w-0">
                            <div className="text-sm md:text-base text-gray-500 dark:text-gray-400 font-medium">Previous</div>
                            <div className="font-semibold text-gray-900 dark:text-white truncate text-base md:text-lg mt-1">
                              {docContent[prevDocId].title}
                            </div>
                          </div>
                        </button>
                      )}
                      
                      {nextDocId && (
                        <button
                          onClick={() => {
                            navigate(`/docs/${nextDocId}`);
                            trackEvent('documentation_navigate', {
                              event_category: 'Documentation',
                              event_label: docContent[nextDocId].title,
                              navigation_type: 'next'
                            });
                          }}
                          className="w-full p-6 border border-gray-200 dark:border-gray-700 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-700 hover:border-blue-300 dark:hover:border-blue-500 transition-all text-right flex items-center justify-end group"
                        >
                          <div className="min-w-0 text-right">
                            <div className="text-sm md:text-base text-gray-500 dark:text-gray-400 font-medium">Next</div>
                            <div className="font-semibold text-gray-900 dark:text-white truncate text-base md:text-lg mt-1">
                              {docContent[nextDocId].title}
                            </div>
                          </div>
                          <ArrowRight className="h-5 w-5 text-gray-400 dark:text-gray-500 ml-4 flex-shrink-0 group-hover:text-blue-500 dark:group-hover:text-blue-400 transition-colors" />
                        </button>
                      )}
                    </div>
                    
                    {/* Feedback section */}
                    <div className="mt-12 pt-8 border-t border-gray-200 dark:border-gray-700">
                      <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4">
                        Was this documentation helpful?
                      </h3>
                      <div className="flex flex-wrap gap-3">
                        <button
                          className="flex items-center px-4 py-2 bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400 rounded-lg hover:bg-green-200 dark:hover:bg-green-900/50 transition-all text-sm font-medium"
                          onClick={() => trackEvent('feedback', {
                            event_category: 'Documentation Feedback',
                            event_label: docId || 'unknown',
                            value: 'positive'
                          })}
                        >
                          <CheckCircle className="h-4 w-4 mr-2" />
                          Yes, it helped me
                        </button>
                        <button
                          className="flex items-center px-4 py-2 bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-400 rounded-lg hover:bg-red-200 dark:hover:bg-red-900/50 transition-all text-sm font-medium"
                          onClick={() => trackEvent('feedback', {
                            event_category: 'Documentation Feedback',
                            event_label: docId || 'unknown',
                            value: 'negative'
                          })}
                        >
                          <HelpCircle className="h-4 w-4 mr-2" />
                          No, I still need help
                        </button>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ) : (
                <div className="p-12 text-center">
                  <div className="bg-blue-100 dark:bg-blue-900/30 p-6 rounded-full w-24 h-24 flex items-center justify-center mx-auto mb-6">
                    <Book size={40} className="text-blue-600 dark:text-blue-400" />
                  </div>
                  <h2 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white mb-4">
                    Welcome to the Documentation
                  </h2>
                  <p className="text-base md:text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto mb-8 leading-relaxed">
                    Explore comprehensive guides, API references, and best practices for implementing 
                    and customizing CyberSoluce for your organization's security needs.
                  </p>
                  
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 max-w-4xl mx-auto mb-8">
                    {['getting-started', 'security', 'api'].map((docKey) => {
                      const Icon = docContent[docKey].icon;
                      return (
                        <Link
                          key={docKey}
                          to={`/docs/${docKey}`}
                          className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-6 shadow-sm hover:shadow-md hover:border-blue-300 dark:hover:border-blue-600 transition-all duration-300 group"
                          onClick={() => trackEvent('documentation_quick_access', {
                            event_category: 'Documentation',
                            event_label: docContent[docKey].title,
                            from_page: 'documentation_home'
                          })}
                        >
                          <div className="bg-blue-100 dark:bg-blue-900/30 p-3 rounded-lg w-12 h-12 flex items-center justify-center mb-3 group-hover:bg-blue-200 dark:group-hover:bg-blue-800/50 transition-colors">
                            <Icon className="h-6 w-6 text-blue-600 dark:text-blue-400" />
                          </div>
                          <h3 className="text-base font-bold text-gray-900 dark:text-white mb-2 group-hover:text-blue-700 dark:group-hover:text-blue-300 transition-colors">
                            {docContent[docKey].title}
                          </h3>
                          <p className="text-sm text-gray-600 dark:text-gray-300 mb-3 leading-relaxed">
                            {docContent[docKey].description}
                          </p>
                          <div className="text-sm text-blue-600 dark:text-blue-400 font-semibold flex items-center group-hover:text-blue-700 dark:group-hover:text-blue-300 transition-colors">
                            <span>Read more</span>
                            <ChevronRight size={14} className="ml-1" />
                          </div>
                        </Link>
                      );
                    })}
                  </div>
                  
                  <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-6 text-left max-w-2xl mx-auto border border-blue-100 dark:border-blue-800">
                    <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4 flex items-center">
                      <HelpCircle className="h-5 w-5 text-blue-600 dark:text-blue-400 mr-2" />
                      Need Additional Help?
                    </h3>
                    <p className="text-sm md:text-base text-gray-600 dark:text-gray-300 mb-4 leading-relaxed">
                      If you can't find what you're looking for in our documentation, our support team is ready to assist you.
                    </p>
                    <div className="flex flex-wrap gap-3">
                      <a 
                        href="https://cybersoluce.com/contact" 
                        className="text-sm text-blue-600 dark:text-blue-400 font-medium hover:text-blue-800 dark:hover:text-blue-300 transition-colors"
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={() => trackOutboundLink('https://cybersoluce.com/contact', 'Support Help Section')}
                      >
                        Contact Support
                      </a>
                      <a 
                        href="https://cybersoluce.com/community" 
                        className="text-sm text-blue-600 dark:text-blue-400 font-medium hover:text-blue-800 dark:hover:text-blue-300 transition-colors"
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={() => trackOutboundLink('https://cybersoluce.com/community', 'Community Help Section')}
                      >
                        Join Community Forum
                      </a>
                    </div>
                  </div>
                </div>
              )}
            </div>
            
            {/* Scroll to Top Button */}
            <AnimatePresence>
              {showScrollTop && (
                <motion.button
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={scrollToTop}
                  className="fixed bottom-8 right-8 z-50 p-3 bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 text-white rounded-full shadow-lg hover:shadow-xl transition-all duration-300"
                  title="Scroll to top"
                >
                  <ArrowUp className="h-5 w-5" />
                </motion.button>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </div>
    </>
  );
};

export default DocumentationPage;