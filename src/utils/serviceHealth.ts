/**
 * Service Health Check Utilities
 * Provides fallback mechanisms for unavailable services
 */

export interface ServiceStatus {
  name: string;
  available: boolean;
  lastChecked: Date;
  error?: string;
}

class ServiceHealthMonitor {
  private services: Map<string, ServiceStatus> = new Map();
  private checkInterval: number = 60000; // Check every minute
  private intervalId?: number;

  constructor() {
    // Initialize service statuses
    this.services.set('supabase', {
      name: 'Supabase',
      available: false,
      lastChecked: new Date()
    });
    this.services.set('sentry', {
      name: 'Sentry',
      available: false,
      lastChecked: new Date()
    });
    this.services.set('analytics', {
      name: 'Analytics',
      available: false,
      lastChecked: new Date()
    });
  }

  /**
   * Check if a service is available
   */
  isServiceAvailable(serviceName: string): boolean {
    const status = this.services.get(serviceName);
    return status?.available ?? false;
  }

  /**
   * Update service status
   */
  updateServiceStatus(serviceName: string, available: boolean, error?: string): void {
    const status = this.services.get(serviceName);
    if (status) {
      status.available = available;
      status.lastChecked = new Date();
      status.error = error;
    } else {
      this.services.set(serviceName, {
        name: serviceName,
        available,
        lastChecked: new Date(),
        error
      });
    }
  }

  /**
   * Get service status
   */
  getServiceStatus(serviceName: string): ServiceStatus | undefined {
    return this.services.get(serviceName);
  }

  /**
   * Get all service statuses
   */
  getAllStatuses(): ServiceStatus[] {
    return Array.from(this.services.values());
  }

  /**
   * Start periodic health checks
   */
  startHealthChecks(): void {
    if (this.intervalId) return;

    this.intervalId = window.setInterval(() => {
      this.checkServices();
    }, this.checkInterval);

    // Initial check
    this.checkServices();
  }

  /**
   * Stop periodic health checks
   */
  stopHealthChecks(): void {
    if (this.intervalId) {
      clearInterval(this.intervalId);
      this.intervalId = undefined;
    }
  }

  /**
   * Check all services
   */
  private async checkServices(): Promise<void> {
    // Check Supabase
    await this.checkSupabase();

    // Check Analytics
    await this.checkAnalytics();

    // Sentry doesn't need explicit check - it handles failures internally
  }

  /**
   * Check Supabase availability
   */
  private async checkSupabase(): Promise<void> {
    try {
      const { supabase, isSupabaseReady } = await import('../lib/supabase');
      if (supabase && isSupabaseReady) {
        // Try a simple query with timeout using Promise.race
        const queryPromise = supabase.from('profiles').select('id').limit(1);
        const timeoutPromise = new Promise((_, reject) => 
          setTimeout(() => reject(new Error('Timeout')), 3000)
        );

        try {
          await Promise.race([queryPromise, timeoutPromise]);
          this.updateServiceStatus('supabase', true);
        } catch {
          this.updateServiceStatus('supabase', false, 'Connection timeout or unavailable');
        }
      } else {
        this.updateServiceStatus('supabase', false, 'Not configured or not ready');
      }
    } catch (error) {
      this.updateServiceStatus('supabase', false, error instanceof Error ? error.message : 'Unknown error');
    }
  }

  /**
   * Check Analytics availability
   */
  private async checkAnalytics(): Promise<void> {
    try {
      // Analytics is available if it's initialized or can be initialized
      const available = typeof (window as any).gtag === 'function' || 
                       import.meta.env.VITE_GOOGLE_ANALYTICS_ID;
      this.updateServiceStatus('analytics', !!available);
    } catch (error) {
      this.updateServiceStatus('analytics', false, error instanceof Error ? error.message : 'Unknown error');
    }
  }
}

// Singleton instance
export const serviceHealthMonitor = new ServiceHealthMonitor();

// Auto-start health checks in production
if (import.meta.env.PROD) {
  serviceHealthMonitor.startHealthChecks();
}

/**
 * Get fallback message for unavailable service
 */
export const getServiceFallbackMessage = (serviceName: string): string => {
  const messages: Record<string, string> = {
    supabase: 'Data will be stored locally. Some features may be limited.',
    sentry: 'Error tracking unavailable. Errors will be logged to console only.',
    analytics: 'Analytics unavailable. Usage data will not be tracked.',
  };

  return messages[serviceName] || 'Service unavailable. App will continue with limited functionality.';
};

/**
 * Check if app can function without a service
 */
export const canFunctionWithoutService = (_serviceName: string): boolean => {
  // All services are optional - app can function without any of them
  return true;
};

