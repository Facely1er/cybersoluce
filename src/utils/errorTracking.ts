import { appConfig, isProduction } from './environment';

export interface ErrorDetails {
  id: string;
  message: string;
  stack?: string;
  componentStack?: string;
  errorBoundary?: string;
  userId?: string;
  sessionId?: string;
  url: string;
  userAgent: string;
  timestamp: string;
  environment: string;
  version: string;
  severity: 'low' | 'medium' | 'high' | 'critical';
  category: 'javascript' | 'network' | 'ui' | 'performance' | 'security' | 'business';
  tags?: string[];
  breadcrumbs?: Breadcrumb[];
  customData?: Record<string, any>;
}

export interface Breadcrumb {
  timestamp: string;
  category: string;
  message: string;
  level: 'info' | 'warning' | 'error';
  data?: Record<string, any>;
}

export interface PerformanceMetric {
  name: string;
  value: number;
  unit: string;
  timestamp: string;
  context?: Record<string, any>;
}

class ErrorTrackingService {
  private enabled: boolean;
  private endpoint?: string;
  private queue: ErrorDetails[] = [];
  private breadcrumbs: Breadcrumb[] = [];
  private sessionId: string;
  private maxBreadcrumbs = 50;
  private maxQueueSize = 100;

  constructor() {
    const config = appConfig;
    this.enabled = config.monitoring.errorTrackingEnabled;
    this.endpoint = import.meta.env.VITE_ERROR_TRACKING_ENDPOINT;
    this.sessionId = this.generateSessionId();
    
    // Set up global error handlers
    this.setupGlobalHandlers();
  }

  private setupGlobalHandlers(): void {
    // Handle unhandled JavaScript errors
    window.addEventListener('error', (event) => {
      this.captureError(new Error(event.message), {
        filename: event.filename,
        lineno: event.lineno,
        colno: event.colno
      });
    });

    // Handle unhandled promise rejections
    window.addEventListener('unhandledrejection', (event) => {
      this.captureError(new Error(`Unhandled Promise Rejection: ${event.reason}`), {
        reason: event.reason
      });
    });
  }

  private generateSessionId(): string {
    return `session_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
  }

  private addBreadcrumb(breadcrumb: Breadcrumb): void {
    this.breadcrumbs.push(breadcrumb);
    if (this.breadcrumbs.length > this.maxBreadcrumbs) {
      this.breadcrumbs.shift();
    }
  }

  private getSeverity(error: Error, customData?: Record<string, any>): ErrorDetails['severity'] {
    if (customData?.severity) return customData.severity;
    
    const message = error.message.toLowerCase();
    if (message.includes('critical') || message.includes('fatal')) return 'critical';
    if (message.includes('network') || message.includes('timeout')) return 'high';
    if (message.includes('warning')) return 'medium';
    return 'low';
  }

  private getCategory(error: Error, customData?: Record<string, any>): ErrorDetails['category'] {
    if (customData?.category) return customData.category;
    
    const message = error.message.toLowerCase();
    const stack = error.stack?.toLowerCase() || '';
    
    if (message.includes('network') || message.includes('fetch') || message.includes('timeout')) return 'network';
    if (message.includes('component') || stack.includes('react')) return 'ui';
    if (message.includes('performance') || message.includes('slow')) return 'performance';
    if (message.includes('security') || message.includes('unauthorized')) return 'security';
    if (customData?.business) return 'business';
    return 'javascript';
  }

  captureError(error: Error, customData?: Record<string, any>): void {
    // Always log errors in development
    if (!isProduction()) {
      console.error('Error captured:', error, customData);
    }

    if (!this.enabled) return;

    const errorDetails: ErrorDetails = {
      id: `error_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      message: error.message,
      stack: error.stack,
      url: window.location.href,
      userAgent: navigator.userAgent,
      timestamp: new Date().toISOString(),
      environment: appConfig.environment,
      version: appConfig.version,
      sessionId: this.sessionId,
      severity: this.getSeverity(error, customData),
      category: this.getCategory(error, customData),
      breadcrumbs: [...this.breadcrumbs],
      tags: customData?.tags || [],
      customData: {
        ...customData,
        userId: this.getCurrentUserId(),
        viewport: {
          width: window.innerWidth,
          height: window.innerHeight
        },
        connection: this.getConnectionInfo()
      }
    };

    // Add breadcrumb for this error
    this.addBreadcrumb({
      timestamp: errorDetails.timestamp,
      category: 'error',
      message: error.message,
      level: 'error',
      data: { severity: errorDetails.severity, category: errorDetails.category }
    });

    // Add to queue
    this.queue.push(errorDetails);
    
    // Prevent queue from growing too large
    if (this.queue.length > this.maxQueueSize) {
      this.queue = this.queue.slice(-this.maxQueueSize);
    }

    // Send immediately for critical errors, batch for others
    if (errorDetails.severity === 'critical') {
      this.sendErrors([errorDetails]);
    } else {
      this.batchSendErrors();
    }
  }

  captureMessage(message: string, level: 'info' | 'warning' | 'error' = 'info', customData?: Record<string, any>): void {
    if (!this.enabled) {
      console.log(`[${level.toUpperCase()}] ${message}`, customData);
      return;
    }

    this.captureError(new Error(message), {
      level,
      ...customData
    });
  }


  private async batchSendErrors(): Promise<void> {
    // Debounce error sending
    setTimeout(() => {
      if (this.queue.length > 0) {
        const errors = [...this.queue];
        this.queue = [];
        this.sendErrors(errors);
      }
    }, 1000);
  }

  private async sendErrors(errors: ErrorDetails[]): Promise<void> {
    if (!this.endpoint) return;

    try {
      // Add timeout to prevent hanging
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 5000); // 5 second timeout

      await fetch(this.endpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ errors }),
        signal: controller.signal
      });

      clearTimeout(timeoutId);
    } catch (err) {
      // Silently fail error tracking to avoid infinite loops
      // Only log in development mode
      if (process.env.NODE_ENV === 'development') {
        console.warn('Error tracking endpoint unavailable:', err);
      }
    }
  }

  private getCurrentUserId(): string | undefined {
    // Try to get user ID from localStorage or session storage
    try {
      const authToken = localStorage.getItem(appConfig.auth.tokenStorageKey);
      if (authToken) {
        const payload = JSON.parse(atob(authToken.split('.')[1]));
        return payload.sub || payload.userId;
      }
    } catch (error) {
      // Ignore errors when parsing token
    }
    return undefined;
  }

  private getConnectionInfo(): Record<string, any> {
    const connection = (navigator as any).connection || (navigator as any).mozConnection || (navigator as any).webkitConnection;
    if (!connection) return {};

    return {
      effectiveType: connection.effectiveType,
      downlink: connection.downlink,
      rtt: connection.rtt,
      saveData: connection.saveData
    };
  }

  // Public methods for adding breadcrumbs
  addBreadcrumbPublic(category: string, message: string, level: 'info' | 'warning' | 'error' = 'info', data?: Record<string, any>): void {
    this.addBreadcrumb({
      timestamp: new Date().toISOString(),
      category,
      message,
      level,
      data
    });
  }

  // Track user interactions
  trackUserAction(action: string, element?: string, data?: Record<string, any>): void {
    this.addBreadcrumb({
      timestamp: new Date().toISOString(),
      category: 'user',
      message: `User ${action}${element ? ` on ${element}` : ''}`,
      level: 'info',
      data
    });
  }

  // Track navigation
  trackNavigation(from: string, to: string): void {
    this.addBreadcrumb({
      timestamp: new Date().toISOString(),
      category: 'navigation',
      message: `Navigation from ${from} to ${to}`,
      level: 'info',
      data: { from, to }
    });
  }

  // Enhanced performance tracking
  capturePerformanceMetric(metric: PerformanceMetric): void {
    if (!this.enabled) return;

    this.addBreadcrumb({
      timestamp: metric.timestamp,
      category: 'performance',
      message: `${metric.name}: ${metric.value}${metric.unit}`,
      level: metric.value > 1000 ? 'warning' : 'info', // Warn if metric is high
      data: metric
    });

    // Send performance data to endpoint if configured
    if (appConfig.monitoring.performanceMonitoringEnabled) {
      this.sendPerformanceMetric(metric);
    }
  }

  private async sendPerformanceMetric(metric: PerformanceMetric): Promise<void> {
    const endpoint = import.meta.env.VITE_PERFORMANCE_ENDPOINT;
    if (!endpoint) return;

    try {
      // Add timeout to prevent hanging
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 5000); // 5 second timeout

      await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...metric,
          sessionId: this.sessionId,
          userId: this.getCurrentUserId(),
          environment: appConfig.environment,
          version: appConfig.version
        }),
        signal: controller.signal
      });

      clearTimeout(timeoutId);
    } catch (error) {
      // Silently fail to avoid infinite loops - performance metrics are non-critical
      if (process.env.NODE_ENV === 'development') {
        console.warn('Performance metric endpoint unavailable:', error);
      }
    }
  }

  // React Error Boundary integration
  captureReactError(error: Error, errorInfo: { componentStack: string }): void {
    this.captureError(error, {
      componentStack: errorInfo.componentStack,
      errorBoundary: true,
      severity: 'critical',
      category: 'ui',
      tags: ['react', 'error-boundary']
    });
  }

  // Enhanced user feedback capture
  captureUserFeedback(feedback: {
    email?: string;
    name?: string;
    comments: string;
    rating?: number;
    category?: string;
    url?: string;
    context?: Record<string, any>;
  }): void {
    if (!this.enabled) return;

    this.captureMessage('User Feedback Received', 'info', {
      ...feedback,
      type: 'user_feedback',
      sessionId: this.sessionId,
      timestamp: new Date().toISOString()
    });
  }

  // Clear sensitive data from breadcrumbs and queue
  clearSensitiveData(): void {
    this.breadcrumbs = [];
    this.queue = [];
  }

  // Get current session info for debugging
  getSessionInfo(): { sessionId: string; breadcrumbCount: number; queueSize: number } {
    return {
      sessionId: this.sessionId,
      breadcrumbCount: this.breadcrumbs.length,
      queueSize: this.queue.length
    };
  }
}

export const errorTracking = new ErrorTrackingService();

// Convenience functions
export const captureError = (error: Error, customData?: Record<string, any>) => errorTracking.captureError(error, customData);
export const captureMessage = (message: string, level?: 'info' | 'warning' | 'error', customData?: Record<string, any>) => errorTracking.captureMessage(message, level, customData);
export const captureUserFeedback = (feedback: Parameters<typeof errorTracking.captureUserFeedback>[0]) => errorTracking.captureUserFeedback(feedback);
export const capturePerformanceMetric = (metric: PerformanceMetric) => errorTracking.capturePerformanceMetric(metric);
export const addBreadcrumb = (category: string, message: string, level?: 'info' | 'warning' | 'error', data?: Record<string, any>) => errorTracking.addBreadcrumbPublic(category, message, level, data);
export const trackUserAction = (action: string, element?: string, data?: Record<string, any>) => errorTracking.trackUserAction(action, element, data);
export const trackNavigation = (from: string, to: string) => errorTracking.trackNavigation(from, to);
export const getSessionInfo = () => errorTracking.getSessionInfo();