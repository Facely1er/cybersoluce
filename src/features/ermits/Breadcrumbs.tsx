import React from 'react';

interface BreadcrumbsProps {
  items?: Array<{ label: string; href?: string }>;
  onBack?: () => void;
}

export const Breadcrumbs: React.FC<BreadcrumbsProps> = ({ items = [], onBack }) => {
  return (
    <nav className="flex items-center space-x-2 text-sm text-gray-600 dark:text-gray-400">
      {items.map((item, index) => (
        <React.Fragment key={index}>
          {index > 0 && <span>/</span>}
          {item.href ? (
            <a href={item.href} className="hover:text-gray-900 dark:hover:text-white">
              {item.label}
            </a>
          ) : (
            <span>{item.label}</span>
          )}
        </React.Fragment>
      ))}
    </nav>
  );
};

