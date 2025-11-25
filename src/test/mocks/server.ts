/**
 * Mock Service Worker server setup for testing
 */

import { setupServer } from 'msw/node';
import { http, HttpResponse } from 'msw';

// Mock API responses
const handlers = [
  // Authentication endpoints
  http.post('/api/auth/login', () => {
    return HttpResponse.json({
      success: true,
      data: {
        user: {
          id: '1',
          email: 'test@cybersoluce.com',
          firstName: 'Test',
          lastName: 'User',
          organization: 'Test Org',
          userTier: 'professional',
          createdAt: '2024-01-01T00:00:00.000Z'
        },
        token: 'mock-jwt-token',
        refreshToken: 'mock-refresh-token'
      }
    });
  }),

  http.post('/api/auth/signup', () => {
    return HttpResponse.json({
      success: true,
      data: {
        user: {
          id: '2',
          email: 'newuser@cybersoluce.com',
          firstName: 'New',
          lastName: 'User',
          organization: 'New Org',
          userTier: 'free',
          createdAt: new Date().toISOString()
        },
        token: 'mock-jwt-token',
        refreshToken: 'mock-refresh-token'
      }
    });
  }),

  http.post('/api/auth/logout', () => {
    return HttpResponse.json({
      success: true
    });
  }),

  // Assessment endpoints
  http.get('/api/assessments', () => {
    return HttpResponse.json({
      success: true,
      data: [
        {
          id: '1',
          name: 'Cybersecurity Assessment',
          domain: 'cybersecurity',
          progress: 75,
          score: 85,
          status: 'inProgress',
          lastUpdated: '2024-01-01T00:00:00.000Z',
          userId: '1',
          frameworks: ['NIST', 'ISO27001'],
          regions: ['US', 'EU']
        },
        {
          id: '2',
          name: 'Privacy Assessment',
          domain: 'privacy',
          progress: 100,
          score: 92,
          status: 'completed',
          lastUpdated: '2024-01-02T00:00:00.000Z',
          userId: '1',
          frameworks: ['GDPR', 'CCPA'],
          regions: ['EU', 'US']
        }
      ]
    });
  }),

  http.get('/api/assessments/:id', ({ params }) => {
    const { id } = params;
    return HttpResponse.json({
      success: true,
      data: {
        id,
        name: `Assessment ${id}`,
        domain: 'cybersecurity',
        progress: 50,
        score: 75,
        status: 'inProgress',
        lastUpdated: '2024-01-01T00:00:00.000Z',
        userId: '1',
        frameworks: ['NIST'],
        regions: ['US']
      }
    });
  }),

  http.post('/api/assessments', () => {
    return HttpResponse.json({
      success: true,
      data: {
        id: '3',
        name: 'New Assessment',
        domain: 'cybersecurity',
        progress: 0,
        score: 0,
        status: 'notStarted',
        lastUpdated: new Date().toISOString(),
        userId: '1',
        frameworks: ['NIST'],
        regions: ['US']
      }
    });
  }),

  http.put('/api/assessments/:id', ({ params }) => {
    const { id } = params;
    return HttpResponse.json({
      success: true,
      data: {
        id,
        name: 'Updated Assessment',
        domain: 'cybersecurity',
        progress: 100,
        score: 95,
        status: 'completed',
        lastUpdated: new Date().toISOString(),
        userId: '1',
        frameworks: ['NIST', 'ISO27001'],
        regions: ['US', 'EU']
      }
    });
  }),

  http.delete('/api/assessments/:id', () => {
    return HttpResponse.json({
      success: true
    });
  }),

  // Framework mapping endpoints
  http.get('/api/frameworks', () => {
    return HttpResponse.json({
      success: true,
      data: [
        {
          id: 'nist',
          name: 'NIST Cybersecurity Framework',
          version: '1.1',
          description: 'National Institute of Standards and Technology framework'
        },
        {
          id: 'iso27001',
          name: 'ISO 27001',
          version: '2013',
          description: 'Information security management systems'
        },
        {
          id: 'gdpr',
          name: 'GDPR',
          version: '2018',
          description: 'General Data Protection Regulation'
        }
      ]
    });
  }),

  // Error tracking endpoints
  http.post('/api/errors', () => {
    return HttpResponse.json({
      success: true
    });
  }),

  // Analytics endpoints
  http.post('/api/analytics', () => {
    return HttpResponse.json({
      success: true
    });
  }),

  // Generic error handler for unhandled requests
  http.get('*', ({ request }) => {
    console.error(`Unhandled ${request.method} request to ${request.url}`);
    return HttpResponse.json(
      {
        success: false,
        error: 'Not found'
      },
      { status: 404 }
    );
  }),
];

export const server = setupServer(...handlers);