interface AnalyticsEvent {
  action: string;
  category: string;
  label?: string;
  value?: number;
  customData?: Record<string, any>;
}

interface AnalyticsConfig {
  trackingId?: string;
  enabled: boolean;
  debug: boolean;
}

class AnalyticsService {
  private config: AnalyticsConfig;
  private queue: AnalyticsEvent[] = [];
  private initialized = false;

  constructor() {
    this.config = {
      trackingId: import.meta.env.VITE_CS_ANALYTICS_ID,
      enabled: import.meta.env.PROD && !!import.meta.env.VITE_CS_ANALYTICS_ID,
      debug: import.meta.env.DEV
    };
  }

  async initialize(): Promise<void> {
    if (this.initialized || !this.config.enabled) return;

    try {
      // Initialize Google Analytics 4 if tracking ID is provided
      if (this.config.trackingId) {
        // Load gtag script with error handling
        const script = document.createElement('script');
        script.async = true;
        script.src = `https://www.googletagmanager.com/gtag/js?id=${this.config.trackingId}`;
        
        // Handle script load errors
        script.onerror = () => {
          console.warn('Failed to load Google Analytics script, continuing without analytics');
          this.initialized = true; // Mark as initialized to prevent retries
          this.queue = []; // Clear queue
        };
        
        script.onload = () => {
          try {
            // Initialize gtag
            (window as any).dataLayer = (window as any).dataLayer || [];
            (window as any).gtag = function() {
              try {
                (window as any).dataLayer.push(arguments);
              } catch {
                // Silently fail if dataLayer push fails
              }
            };
            (window as any).gtag('js', new Date());
            (window as any).gtag('config', this.config.trackingId, {
              page_title: document.title,
              page_location: window.location.href
            });
          } catch (error) {
            console.warn('Failed to initialize gtag, continuing without analytics:', error);
          }
        };
        
        document.head.appendChild(script);
      }

      this.initialized = true;

      // Process queued events (with error handling)
      this.queue.forEach(event => {
        try {
          this.trackEvent(event);
        } catch {
          // Silently skip failed events
        }
      });
      this.queue = [];

      if (this.config.debug) {
        console.log('Analytics initialized');
      }
    } catch (error) {
      // Analytics failed - app continues normally
      console.warn('Analytics initialization failed, continuing without analytics:', error);
      this.initialized = true; // Mark as initialized to prevent retries
      this.queue = []; // Clear queue
    }
  }

  trackEvent(event: AnalyticsEvent): void {
    if (!this.config.enabled) return;

    if (!this.initialized) {
      // Queue events if not initialized (max queue size to prevent memory issues)
      if (this.queue.length < 100) {
        this.queue.push(event);
      }
      return;
    }

    try {
      // Google Analytics 4 event tracking (with fallback)
      if (this.config.trackingId) {
        try {
          if (typeof (window as any).gtag === 'function') {
            (window as any).gtag('event', event.action, {
              event_category: event.category,
              event_label: event.label,
              value: event.value,
              custom_parameters: event.customData
            });
          }
        } catch (gaError) {
          // GA failed - continue without tracking this event
          if (this.config.debug) {
            console.warn('Google Analytics tracking failed:', gaError);
          }
        }
      }

      // Custom analytics endpoint (if needed) - non-blocking
      this.sendToCustomEndpoint(event).catch(() => {
        // Silently fail custom endpoint
      });

      if (this.config.debug) {
        console.log('Analytics event tracked:', event);
      }
    } catch (error) {
      // Analytics tracking failed - app continues normally
      if (this.config.debug) {
        console.warn('Failed to track analytics event:', error);
      }
    }
  }

  trackPageView(path: string, title?: string): void {
    if (!this.config.enabled) return;

    try {
      if (this.config.trackingId && (window as any).gtag) {
        (window as any).gtag('config', this.config.trackingId, {
          page_path: path,
          page_title: title || document.title
        });
      }

      if (this.config.debug) {
        console.log('Page view tracked:', { path, title });
      }
    } catch (error) {
      console.error('Failed to track page view:', error);
    }
  }

  trackUserAction(action: string, details?: Record<string, any>): void {
    this.trackEvent({
      action,
      category: 'user_interaction',
      customData: details
    });
  }

  trackAssessmentEvent(action: 'started' | 'completed' | 'abandoned', assessmentType: string, details?: any): void {
    this.trackEvent({
      action: `assessment_${action}`,
      category: 'assessment',
      label: assessmentType,
      customData: details
    });
  }

  trackConversion(conversionType: 'signup' | 'upgrade' | 'trial_start', value?: number): void {
    this.trackEvent({
      action: 'conversion',
      category: 'business',
      label: conversionType,
      value
    });
  }

  private async sendToCustomEndpoint(event: AnalyticsEvent): Promise<void> {
    try {
      // Send to custom analytics endpoint if configured
      const endpoint = import.meta.env.VITE_CUSTOM_ANALYTICS_ENDPOINT;
      if (endpoint) {
        await fetch(endpoint, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            ...event,
            timestamp: new Date().toISOString(),
            userAgent: navigator.userAgent,
            url: window.location.href
          })
        });
      }
    } catch (error) {
      // Silently fail for analytics
      if (this.config.debug) {
        console.error('Custom analytics endpoint failed:', error);
      }
    }
  }
}

export const analytics = new AnalyticsService();

// Convenience functions
export const trackPageView = (path: string, title?: string) => analytics.trackPageView(path, title);
export const trackUserAction = (action: string, details?: Record<string, any>) => analytics.trackUserAction(action, details);
export const trackAssessmentEvent = (action: 'started' | 'completed' | 'abandoned', type: string, details?: any) => analytics.trackAssessmentEvent(action, type, details);
export const trackConversion = (type: 'signup' | 'upgrade' | 'trial_start', value?: number) => analytics.trackConversion(type, value);