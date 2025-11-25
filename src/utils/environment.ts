/**
 * Environment configuration and validation utilities
 */

// Environment types
export type Environment = 'development' | 'staging' | 'production';

// Configuration interface
export interface AppConfig {
  name: string;
  version: string;
  environment: Environment;
  description: string;
  api: {
    baseUrl: string;
    version: string;
    timeout: number;
  };
  auth: {
    tokenStorageKey: string;
    refreshTokenKey: string;
    sessionTimeout: number;
  };
  analytics: {
    enabled: boolean;
    googleAnalyticsId?: string;
    hotjarId?: string;
  };
  monitoring: {
    sentryDsn?: string;
    sentryEnvironment: string;
    errorTrackingEnabled: boolean;
    performanceMonitoringEnabled: boolean;
  };
  features: {
    demoMode: boolean;
    debugMode: boolean;
    lazyLoading: boolean;
    compression: boolean;
  };
  security: {
    cspEnabled: boolean;
    allowedOrigins: string[];
    maxFileSize: number;
  };
  services: {
    pdfServiceUrl?: string;
    notificationServiceUrl?: string;
    storageServiceUrl?: string;
  };
  cdn: {
    baseUrl?: string;
    staticAssetsUrl?: string;
  };
}

/**
 * Validates required environment variables
 * Never throws - only logs warnings
 * All variables have fallbacks in getAppConfig()
 */
const validateEnvironment = (): void => {
  // Never throw errors - just log warnings if needed
  // All environment variables have safe defaults
  
  // Only log warnings in production for Supabase if backend mode is set to supabase
  if (isProduction() && import.meta.env.VITE_BACKEND_MODE === 'supabase') {
    if (!import.meta.env.VITE_SUPABASE_URL || !import.meta.env.VITE_SUPABASE_ANON_KEY) {
      console.warn(
        'Supabase backend mode is enabled but credentials are missing. ' +
        'The app will use localStorage backend instead. ' +
        'Set VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY to use Supabase backend.'
      );
    }
  }
};

/**
 * Gets the current environment
 */
export const getEnvironment = (): Environment => {
  const env = import.meta.env.VITE_APP_ENVIRONMENT as Environment;
  return env || (import.meta.env.DEV ? 'development' : 'production');
};

/**
 * Checks if the application is running in development mode
 */
export const isDevelopment = (): boolean => {
  return getEnvironment() === 'development' || import.meta.env.DEV;
};

/**
 * Checks if the application is running in staging mode
 */
export const isStaging = (): boolean => {
  return getEnvironment() === 'staging';
};

/**
 * Checks if the application is running in production mode
 */
export const isProduction = (): boolean => {
  return getEnvironment() === 'production' || import.meta.env.PROD;
};

/**
 * Checks if the application is running in a demo environment
 */
export const isDemoEnvironment = (): boolean => {
  return (
    import.meta.env.VITE_ENABLE_DEMO_MODE === 'true' ||
    isDevelopment() || 
    window.location.hostname.includes('demo') ||
    window.location.hostname.includes('staging')
  );
};

/**
 * Gets the application configuration
 * All values have fallbacks to ensure the app works without environment variables
 */
export const getAppConfig = (): AppConfig => {
  // Only validate critical variables in production (non-blocking)
  try {
    if (isProduction()) {
      validateEnvironment();
    }
  } catch (error) {
    // Log but don't throw - use fallbacks instead
    console.warn('Environment validation warning (using fallbacks):', error);
  }

  return {
    name: import.meta.env.VITE_APP_NAME || 'CyberSoluce',
    version: import.meta.env.VITE_APP_VERSION || '1.0.0',
    environment: getEnvironment(),
    description: import.meta.env.VITE_APP_DESCRIPTION || 'Strategic cybersecurity governance platform',
    
    api: {
      baseUrl: import.meta.env.VITE_CS_API_BASE_URL || (isDevelopment() ? 'http://localhost:3000' : 'https://api.cybersoluce.com'),
      version: import.meta.env.VITE_CS_API_VERSION || 'v1',
      timeout: Number(import.meta.env.VITE_CS_API_TIMEOUT) || 30000,
    },
    
    auth: {
      tokenStorageKey: import.meta.env.VITE_AUTH_TOKEN_STORAGE_KEY || 'cs_auth_token',
      refreshTokenKey: import.meta.env.VITE_AUTH_REFRESH_TOKEN_KEY || 'cs_refresh_token',
      sessionTimeout: Number(import.meta.env.VITE_AUTH_SESSION_TIMEOUT) || 3600000,
    },
    
    analytics: {
      enabled: import.meta.env.VITE_ENABLE_ANALYTICS === 'true' && isProduction(),
      googleAnalyticsId: import.meta.env.VITE_GOOGLE_ANALYTICS_ID,
      hotjarId: import.meta.env.VITE_HOTJAR_ID,
    },
    
    monitoring: {
      sentryDsn: import.meta.env.VITE_SENTRY_DSN,
      sentryEnvironment: import.meta.env.VITE_SENTRY_ENVIRONMENT || getEnvironment(),
      errorTrackingEnabled: import.meta.env.VITE_ENABLE_ERROR_TRACKING === 'true' && isProduction(),
      performanceMonitoringEnabled: import.meta.env.VITE_ENABLE_PERFORMANCE_MONITORING === 'true' && isProduction(),
    },
    
    features: {
      demoMode: import.meta.env.VITE_ENABLE_DEMO_MODE === 'true' || isDemoEnvironment(),
      debugMode: import.meta.env.VITE_ENABLE_DEBUG_MODE === 'true' || isDevelopment(),
      lazyLoading: import.meta.env.VITE_ENABLE_LAZY_LOADING !== 'false',
      compression: import.meta.env.VITE_ENABLE_COMPRESSION !== 'false',
    },
    
    security: {
      cspEnabled: import.meta.env.VITE_ENABLE_CSP === 'true',
      allowedOrigins: import.meta.env.VITE_ALLOWED_ORIGINS?.split(',') || [],
      maxFileSize: Number(import.meta.env.VITE_MAX_FILE_SIZE) || 10485760, // 10MB default
    },
    
    services: {
      pdfServiceUrl: import.meta.env.VITE_CS_PDF_SERVICE_URL,
      notificationServiceUrl: import.meta.env.VITE_CS_NOTIFICATION_SERVICE_URL,
      storageServiceUrl: import.meta.env.VITE_CS_STORAGE_SERVICE_URL,
    },
    
    cdn: {
      baseUrl: import.meta.env.VITE_CDN_BASE_URL,
      staticAssetsUrl: import.meta.env.VITE_STATIC_ASSETS_URL,
    },
  };
};

/**
 * Gets the application version
 * Safe to call - always returns a value
 */
export const getAppVersion = (): string => {
  try {
    return getAppConfig().version;
  } catch {
    return '1.0.0';
  }
};

/**
 * Gets the application name
 * Safe to call - always returns a value
 */
export const getAppName = (): string => {
  try {
    return getAppConfig().name;
  } catch {
    return 'CyberSoluce';
  }
};

/**
 * Enable or disable features based on environment and configuration
 * Safe to call - always returns a value
 */
export const getFeatureFlags = (): Record<string, boolean> => {
  try {
    const config = getAppConfig();
    return {
      demoModeEnabled: config.features.demoMode,
      analyticsEnabled: config.analytics.enabled,
      errorTrackingEnabled: config.monitoring.errorTrackingEnabled,
      performanceMonitoringEnabled: config.monitoring.performanceMonitoringEnabled,
      debugModeEnabled: config.features.debugMode,
      lazyLoadingEnabled: config.features.lazyLoading,
      compressionEnabled: config.features.compression,
      cspEnabled: config.security.cspEnabled,
    };
  } catch {
    // Return safe defaults if config fails
    return {
      demoModeEnabled: false,
      analyticsEnabled: false,
      errorTrackingEnabled: false,
      performanceMonitoringEnabled: false,
      debugModeEnabled: true,
      lazyLoadingEnabled: true,
      compressionEnabled: true,
      cspEnabled: false,
    };
  }
};

// Export the configuration for use throughout the app
// Wrapped in try-catch to ensure it never throws
let appConfig: AppConfig;
try {
  appConfig = getAppConfig();
} catch (error) {
  console.warn('Failed to load app config, using minimal fallback:', error);
  // Minimal fallback configuration
  appConfig = {
    name: 'CyberSoluce',
    version: '1.0.0',
    environment: 'development',
    description: 'Strategic cybersecurity governance platform',
    api: {
      baseUrl: 'http://localhost:3000',
      version: 'v1',
      timeout: 30000,
    },
    auth: {
      tokenStorageKey: 'cs_auth_token',
      refreshTokenKey: 'cs_refresh_token',
      sessionTimeout: 3600000,
    },
    analytics: {
      enabled: false,
    },
    monitoring: {
      sentryEnvironment: 'development',
      errorTrackingEnabled: false,
      performanceMonitoringEnabled: false,
    },
    features: {
      demoMode: false,
      debugMode: true,
      lazyLoading: true,
      compression: true,
    },
    security: {
      cspEnabled: false,
      allowedOrigins: [],
      maxFileSize: 10485760,
    },
    services: {},
    cdn: {},
  };
}

export { appConfig };