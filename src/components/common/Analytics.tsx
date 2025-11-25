import React from 'react';
import { analytics, trackPageView, trackUserAction } from '../../utils/analytics';

// React hook for analytics functionality
export const useAnalytics = () => {
  React.useEffect(() => {
    // Initialize analytics when the hook is first used
    analytics.initialize();
  }, []);

  return {
    trackEvent: (action: string, properties?: Record<string, any>) => {
      analytics.trackUserAction(action, properties);
    },
    trackPageView: (path: string, title?: string) => {
      analytics.trackPageView(path, title);
    },
    trackUserAction: (action: string, details?: Record<string, any>) => {
      analytics.trackUserAction(action, details);
    },
    trackDownload: (filename: string, category?: string) => {
      analytics.trackUserAction('download', { filename, category });
    },
    trackOutboundLink: (url: string, context?: string) => {
      analytics.trackUserAction('outbound_link', { url, context });
    },
    trackConversion: (type: 'signup' | 'upgrade' | 'trial_start', value?: number) => {
      analytics.trackConversion(type, value);
    }
  };
};

export default useAnalytics;