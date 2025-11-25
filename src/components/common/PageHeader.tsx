import React from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, DivideIcon as LucideIcon } from 'lucide-react';
import { Button } from '../ui/button';
import { useNavigate } from 'react-router-dom';

interface PageHeaderProps {
  title: string;
  subtitle?: string;
  icon?: LucideIcon;
  showBackButton?: boolean;
  backTo?: string;
  actions?: React.ReactNode;
  breadcrumbs?: { label: string; href?: string }[];
  className?: string;
}

const PageHeader: React.FC<PageHeaderProps> = ({
  title,
  subtitle,
  icon: Icon,
  showBackButton = false,
  backTo,
  actions,
  breadcrumbs,
  className = ''
}) => {
  const navigate = useNavigate();

  const handleBack = () => {
    if (backTo) {
      navigate(backTo);
    } else {
      navigate(-1);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className={`bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 px-6 py-4 ${className}`}
    >
      {breadcrumbs && (
        <nav className="mb-4">
          <ol className="flex items-center space-x-2 text-sm text-gray-500 dark:text-gray-400">
            {breadcrumbs.map((crumb, index) => (
              <li key={index} className="flex items-center">
                {index > 0 && <span className="mx-2">/</span>}
                {crumb.href ? (
                  <button
                    onClick={() => navigate(crumb.href!)}
                    className="hover:text-gray-700 dark:hover:text-gray-300 transition-colors"
                  >
                    {crumb.label}
                  </button>
                ) : (
                  <span className="text-gray-900 dark:text-white font-medium">
                    {crumb.label}
                  </span>
                )}
              </li>
            ))}
          </ol>
        </nav>
      )}
      
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          {showBackButton && (
            <Button
              variant="ghost"
              size="sm"
              onClick={handleBack}
              className="p-2"
            >
              <ArrowLeft className="h-5 w-5" />
            </Button>
          )}
          
          <div className="flex items-center space-x-3">
            {Icon && (
              <div className="bg-blue-100 dark:bg-blue-900/30 p-2 rounded-lg">
                <Icon className="h-6 w-6 text-blue-600 dark:text-blue-400" />
              </div>
            )}
            
            <div>
              <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
                {title}
              </h1>
              {subtitle && (
                <p className="text-gray-600 dark:text-gray-400 mt-1">
                  {subtitle}
                </p>
              )}
            </div>
          </div>
        </div>
        
        {actions && (
          <div className="flex items-center space-x-3">
            {actions}
          </div>
        )}
      </div>
    </motion.div>
  );
};

export default PageHeader;