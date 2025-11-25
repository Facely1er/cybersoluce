/**
 * Tests for environment utilities
 */

import { describe, it, expect, vi, beforeEach } from 'vitest';
import { 
  isDevelopment, 
  isProduction, 
  isStaging, 
  getEnvironment,
  getAppConfig,
  getFeatureFlags 
} from '../environment';

// Mock import.meta.env
const mockEnv = vi.hoisted(() => ({
  DEV: false,
  PROD: false,
  VITE_APP_ENVIRONMENT: 'test',
  VITE_APP_NAME: 'CyberSoluce Test',
  VITE_APP_VERSION: '1.0.0-test'
}));

vi.mock('import.meta.env', () => mockEnv);

describe('Environment Utilities', () => {
  beforeEach(() => {
    // Reset mocks before each test
    vi.clearAllMocks();
  });

  describe('Environment Detection', () => {
    it('should detect test environment', () => {
      expect(getEnvironment()).toBe('test');
    });

    it('should detect development environment', () => {
      mockEnv.DEV = true;
      mockEnv.VITE_APP_ENVIRONMENT = 'development';
      expect(isDevelopment()).toBe(true);
      expect(isProduction()).toBe(false);
      expect(isStaging()).toBe(false);
    });

    it('should detect production environment', () => {
      mockEnv.PROD = true;
      mockEnv.VITE_APP_ENVIRONMENT = 'production';
      expect(isProduction()).toBe(true);
      expect(isDevelopment()).toBe(false);
      expect(isStaging()).toBe(false);
    });

    it('should detect staging environment', () => {
      mockEnv.VITE_APP_ENVIRONMENT = 'staging';
      expect(isStaging()).toBe(true);
      expect(isDevelopment()).toBe(false);
      expect(isProduction()).toBe(false);
    });
  });

  describe('App Configuration', () => {
    it('should return valid app configuration', () => {
      const config = getAppConfig();
      
      expect(config).toHaveProperty('name');
      expect(config).toHaveProperty('version');
      expect(config).toHaveProperty('environment');
      expect(config).toHaveProperty('api');
      expect(config).toHaveProperty('auth');
      expect(config).toHaveProperty('analytics');
      expect(config).toHaveProperty('monitoring');
      expect(config).toHaveProperty('features');
      expect(config).toHaveProperty('security');
    });

    it('should have correct default values', () => {
      const config = getAppConfig();
      
      expect(config.name).toBe('CyberSoluce Test');
      expect(config.version).toBe('1.0.0-test');
      expect(config.environment).toBe('test');
      expect(config.api.timeout).toBe(5000);
    });

    it('should disable analytics in test environment', () => {
      const config = getAppConfig();
      expect(config.analytics.enabled).toBe(false);
    });

    it('should disable error tracking in test environment', () => {
      const config = getAppConfig();
      expect(config.monitoring.errorTrackingEnabled).toBe(false);
    });
  });

  describe('Feature Flags', () => {
    it('should return feature flags object', () => {
      const flags = getFeatureFlags();
      
      expect(flags).toHaveProperty('demoModeEnabled');
      expect(flags).toHaveProperty('analyticsEnabled');
      expect(flags).toHaveProperty('errorTrackingEnabled');
      expect(flags).toHaveProperty('debugModeEnabled');
    });

    it('should enable demo mode in test environment', () => {
      const flags = getFeatureFlags();
      expect(flags.demoModeEnabled).toBe(true);
    });

    it('should enable debug mode in test environment', () => {
      const flags = getFeatureFlags();
      expect(flags.debugModeEnabled).toBe(true);
    });

    it('should disable analytics in test environment', () => {
      const flags = getFeatureFlags();
      expect(flags.analyticsEnabled).toBe(false);
    });
  });

  describe('Environment Validation', () => {
    it('should not throw in test environment', () => {
      expect(() => getAppConfig()).not.toThrow();
    });

    it('should validate required variables in production', () => {
      mockEnv.PROD = true;
      mockEnv.VITE_APP_ENVIRONMENT = 'production';
      
      // Remove required variable
      delete mockEnv.VITE_APP_NAME;
      
      expect(() => getAppConfig()).toThrow('Missing required environment variables');
    });
  });
});