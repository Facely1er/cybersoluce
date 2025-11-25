/**
 * Test setup configuration
 * This file is run before all tests
 */

import '@testing-library/jest-dom';
import { expect, afterEach, beforeAll, afterAll, vi } from 'vitest';
import { cleanup } from '@testing-library/react';
import { server } from './mocks/server';

// Mock environment variables for tests
vi.mock('../utils/environment', () => ({
  isDevelopment: () => false,
  isProduction: () => false,
  isStaging: () => false,
  getEnvironment: () => 'test',
  getAppConfig: () => ({
    name: 'CyberSoluce Test',
    version: '1.0.0-test',
    environment: 'test',
    description: 'Test environment',
    api: {
      baseUrl: 'http://localhost:3000',
      version: 'v1',
      timeout: 5000
    },
    auth: {
      tokenStorageKey: 'test_auth_token',
      refreshTokenKey: 'test_refresh_token',
      sessionTimeout: 3600000
    },
    analytics: {
      enabled: false
    },
    monitoring: {
      errorTrackingEnabled: false,
      performanceMonitoringEnabled: false,
      sentryEnvironment: 'test'
    },
    features: {
      demoMode: true,
      debugMode: true,
      lazyLoading: false,
      compression: false
    },
    security: {
      cspEnabled: false,
      allowedOrigins: [],
      maxFileSize: 10485760
    },
    services: {},
    cdn: {}
  }),
  appConfig: {
    name: 'CyberSoluce Test',
    version: '1.0.0-test',
    environment: 'test'
  }
}));

// Mock browser APIs that are not available in jsdom
Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: vi.fn().mockImplementation(query => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: vi.fn(), // deprecated
    removeListener: vi.fn(), // deprecated
    addEventListener: vi.fn(),
    removeEventListener: vi.fn(),
    dispatchEvent: vi.fn(),
  })),
});

// Mock IntersectionObserver
global.IntersectionObserver = vi.fn().mockImplementation(() => ({
  observe: vi.fn(),
  unobserve: vi.fn(),
  disconnect: vi.fn(),
}));

// Mock ResizeObserver
global.ResizeObserver = vi.fn().mockImplementation(() => ({
  observe: vi.fn(),
  unobserve: vi.fn(),
  disconnect: vi.fn(),
}));

// Mock localStorage
Object.defineProperty(window, 'localStorage', {
  value: {
    getItem: vi.fn(),
    setItem: vi.fn(),
    removeItem: vi.fn(),
    clear: vi.fn(),
    length: 0,
    key: vi.fn(),
  },
  writable: true,
});

// Mock sessionStorage
Object.defineProperty(window, 'sessionStorage', {
  value: {
    getItem: vi.fn(),
    setItem: vi.fn(),
    removeItem: vi.fn(),
    clear: vi.fn(),
    length: 0,
    key: vi.fn(),
  },
  writable: true,
});

// Mock fetch globally
global.fetch = vi.fn();

// Mock console methods to avoid noise in tests
global.console = {
  ...console,
  log: vi.fn(),
  debug: vi.fn(),
  info: vi.fn(),
  warn: vi.fn(),
  error: vi.fn(),
};

// Setup MSW server
beforeAll(() => {
  server.listen({ onUnhandledRequest: 'error' });
});

afterEach(() => {
  // Clean up DOM after each test
  cleanup();
  
  // Reset MSW handlers
  server.resetHandlers();
  
  // Clear all mocks
  vi.clearAllMocks();
  
  // Clear localStorage and sessionStorage
  localStorage.clear();
  sessionStorage.clear();
});

afterAll(() => {
  server.close();
});

// Extend expect with custom matchers
expect.extend({
  toBeInTheDocument: (received) => {
    const pass = received && received.ownerDocument && received.ownerDocument.contains(received);
    return {
      message: () => `expected element ${pass ? 'not ' : ''}to be in the document`,
      pass,
    };
  },
});

// Global test utilities
export const mockUser = {
  id: '1',
  email: 'test@cybersoluce.com',
  firstName: 'Test',
  lastName: 'User',
  organization: 'Test Org',
  userTier: 'professional' as const,
  createdAt: '2024-01-01T00:00:00.000Z'
};

export const mockAssessment = {
  id: '1',
  name: 'Test Assessment',
  domain: 'cybersecurity',
  progress: 50,
  score: 75,
  status: 'inProgress' as const,
  lastUpdated: '2024-01-01T00:00:00.000Z',
  userId: '1',
  frameworks: ['NIST', 'ISO27001'],
  regions: ['US', 'EU']
};

// Test helper functions
export const renderWithProviders = (ui: React.ReactElement, options = {}) => {
  // This would typically wrap with providers like Router, Theme, etc.
  // For now, just return the basic render
  return ui;
};

export const createMockApiResponse = <T>(data: T, success = true) => ({
  success,
  data: success ? data : undefined,
  error: success ? undefined : 'Mock error'
});

export const waitForLoadingToFinish = () => 
  new Promise(resolve => setTimeout(resolve, 0));