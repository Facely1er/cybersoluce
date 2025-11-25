// Utility functions for formatting data display

export const formatDate = (date: Date | string, options?: Intl.DateTimeFormatOptions): string => {
  const dateObj = typeof date === 'string' ? new Date(date) : date;
  
  if (isNaN(dateObj.getTime())) {
    return 'Invalid Date';
  }

  const defaultOptions: Intl.DateTimeFormatOptions = {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    ...options
  };

  return new Intl.DateTimeFormat('en-US', defaultOptions).format(dateObj);
};

export const formatDateTime = (date: Date | string): string => {
  return formatDate(date, {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  });
};

export const formatRelativeTime = (date: Date | string): string => {
  const dateObj = typeof date === 'string' ? new Date(date) : date;
  const now = new Date();
  const diffInSeconds = Math.floor((now.getTime() - dateObj.getTime()) / 1000);

  if (diffInSeconds < 60) return 'Just now';
  if (diffInSeconds < 3600) return `${Math.floor(diffInSeconds / 60)} minutes ago`;
  if (diffInSeconds < 86400) return `${Math.floor(diffInSeconds / 3600)} hours ago`;
  if (diffInSeconds < 2592000) return `${Math.floor(diffInSeconds / 86400)} days ago`;
  
  return formatDate(dateObj);
};

export const formatCurrency = (
  amount: number,
  currency: string = 'USD',
  locale: string = 'en-US'
): string => {
  return new Intl.NumberFormat(locale, {
    style: 'currency',
    currency,
    minimumFractionDigits: 0,
    maximumFractionDigits: 2
  }).format(amount);
};

export const formatNumber = (
  number: number,
  options?: Intl.NumberFormatOptions
): string => {
  return new Intl.NumberFormat('en-US', options).format(number);
};

export const formatPercentage = (value: number, decimals: number = 1): string => {
  return `${value.toFixed(decimals)}%`;
};

export const formatFileSize = (bytes: number): string => {
  if (bytes === 0) return '0 Bytes';
  
  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
};

export const formatDuration = (milliseconds: number): string => {
  const seconds = Math.floor(milliseconds / 1000);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);

  if (days > 0) return `${days}d ${hours % 24}h`;
  if (hours > 0) return `${hours}h ${minutes % 60}m`;
  if (minutes > 0) return `${minutes}m ${seconds % 60}s`;
  return `${seconds}s`;
};

export const formatScore = (score: number, maxScore: number = 5): string => {
  return `${score.toFixed(1)}/${maxScore.toFixed(1)}`;
};

export const formatMaturityLevel = (level: number): { name: string; color: string } => {
  const levels = [
    { name: 'Not Assessed', color: 'gray' },
    { name: 'Initial', color: 'red' },
    { name: 'Developing', color: 'orange' },
    { name: 'Defined', color: 'yellow' },
    { name: 'Managed', color: 'blue' },
    { name: 'Optimizing', color: 'green' }
  ];

  return levels[Math.max(0, Math.min(5, Math.floor(level)))] || levels[0];
};

export const formatPriority = (priority: string): { label: string; color: string } => {
  const priorities: Record<string, { label: string; color: string }> = {
    low: { label: 'Low', color: 'green' },
    medium: { label: 'Medium', color: 'yellow' },
    high: { label: 'High', color: 'orange' },
    critical: { label: 'Critical', color: 'red' }
  };

  return priorities[priority.toLowerCase()] || { label: priority, color: 'gray' };
};

export const formatStatus = (status: string): { label: string; color: string } => {
  const statuses: Record<string, { label: string; color: string }> = {
    'not-started': { label: 'Not Started', color: 'gray' },
    'in-progress': { label: 'In Progress', color: 'blue' },
    'completed': { label: 'Completed', color: 'green' },
    'on-hold': { label: 'On Hold', color: 'yellow' },
    'cancelled': { label: 'Cancelled', color: 'red' },
    'overdue': { label: 'Overdue', color: 'red' }
  };

  return statuses[status.toLowerCase()] || { label: status, color: 'gray' };
};

export const truncateText = (text: string, maxLength: number): string => {
  if (text.length <= maxLength) return text;
  return text.slice(0, maxLength - 3) + '...';
};

export const capitalizeFirst = (str: string): string => {
  return str.charAt(0).toUpperCase() + str.slice(1);
};

export const camelToTitle = (str: string): string => {
  return str
    .replace(/([A-Z])/g, ' $1')
    .replace(/^./, (char) => char.toUpperCase())
    .trim();
};

export const formatInitials = (firstName: string, lastName: string): string => {
  return `${firstName.charAt(0)}${lastName.charAt(0)}`.toUpperCase();
};