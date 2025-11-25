import React from 'react';
import { motion } from 'framer-motion';
import { CheckCircle, Clock, AlertTriangle, XCircle, Info } from 'lucide-react';

interface StatusBadgeProps {
  status: 'success' | 'warning' | 'error' | 'info' | 'pending' | 'in-progress' | 'completed' | 'failed';
  label?: string;
  size?: 'sm' | 'md' | 'lg';
  showIcon?: boolean;
  animated?: boolean;
  className?: string;
}

const StatusBadge: React.FC<StatusBadgeProps> = ({
  status,
  label,
  size = 'md',
  showIcon = true,
  animated = false,
  className = ''
}) => {
  const getStatusConfig = (status: string) => {
    switch (status) {
      case 'success':
      case 'completed':
        return {
          icon: CheckCircle,
          bgColor: 'bg-green-100 dark:bg-green-900/30',
          textColor: 'text-green-800 dark:text-green-300',
          borderColor: 'border-green-200 dark:border-green-800',
          label: label || 'Success'
        };
      case 'warning':
        return {
          icon: AlertTriangle,
          bgColor: 'bg-yellow-100 dark:bg-yellow-900/30',
          textColor: 'text-yellow-800 dark:text-yellow-300',
          borderColor: 'border-yellow-200 dark:border-yellow-800',
          label: label || 'Warning'
        };
      case 'error':
      case 'failed':
        return {
          icon: XCircle,
          bgColor: 'bg-red-100 dark:bg-red-900/30',
          textColor: 'text-red-800 dark:text-red-300',
          borderColor: 'border-red-200 dark:border-red-800',
          label: label || 'Error'
        };
      case 'info':
        return {
          icon: Info,
          bgColor: 'bg-blue-100 dark:bg-blue-900/30',
          textColor: 'text-blue-800 dark:text-blue-300',
          borderColor: 'border-blue-200 dark:border-blue-800',
          label: label || 'Info'
        };
      case 'pending':
      case 'in-progress':
        return {
          icon: Clock,
          bgColor: 'bg-gray-100 dark:bg-gray-700',
          textColor: 'text-gray-800 dark:text-gray-300',
          borderColor: 'border-gray-200 dark:border-gray-600',
          label: label || (status === 'pending' ? 'Pending' : 'In Progress')
        };
      default:
        return {
          icon: Info,
          bgColor: 'bg-gray-100 dark:bg-gray-700',
          textColor: 'text-gray-800 dark:text-gray-300',
          borderColor: 'border-gray-200 dark:border-gray-600',
          label: label || status
        };
    }
  };

  const config = getStatusConfig(status);
  const Icon = config.icon;

  const sizeClasses = {
    sm: 'px-2 py-1 text-xs',
    md: 'px-3 py-1 text-sm',
    lg: 'px-4 py-2 text-base'
  };

  const iconSizes = {
    sm: 'h-3 w-3',
    md: 'h-4 w-4',
    lg: 'h-5 w-5'
  };

  const badgeClasses = `
    inline-flex items-center rounded-full font-medium border
    ${config.bgColor} ${config.textColor} ${config.borderColor}
    ${sizeClasses[size]}
    ${className}
  `;

  const badge = (
    <span className={badgeClasses}>
      {showIcon && (
        <Icon className={`${iconSizes[size]} mr-1 flex-shrink-0`} />
      )}
      {config.label}
    </span>
  );

  if (animated) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.2, ease: "easeOut" }}
      >
        {badge}
      </motion.div>
    );
  }

  return badge;
};

export default StatusBadge;