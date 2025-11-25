/**
 * Tests for LocalBackend - localStorage-based backend
 */

import { describe, it, expect, beforeEach, vi } from 'vitest';
import { LocalBackend } from '../localBackend';
import { LoginCredentials, SignupCredentials } from '../apiService.types';

// Mock localStorage
const localStorageMock = (() => {
  let store: Record<string, string> = {};
  return {
    getItem: vi.fn((key: string) => store[key] || null),
    setItem: vi.fn((key: string, value: string) => {
      store[key] = value.toString();
    }),
    removeItem: vi.fn((key: string) => {
      delete store[key];
    }),
    clear: vi.fn(() => {
      store = {};
    }),
    key: vi.fn((index: number) => Object.keys(store)[index] || null),
    get length() {
      return Object.keys(store).length;
    }
  };
})();

Object.defineProperty(window, 'localStorage', {
  value: localStorageMock,
  writable: true
});

describe('LocalBackend', () => {
  let backend: LocalBackend;

  beforeEach(() => {
    backend = new LocalBackend();
    localStorage.clear();
    vi.clearAllMocks();
  });

  describe('User Authentication', () => {
    describe('signup', () => {
      it('should create a new user successfully', async () => {
        const credentials: SignupCredentials = {
          email: 'test@example.com',
          password: 'password123',
          firstName: 'Test',
          lastName: 'User',
          organization: 'Test Org'
        };

        const response = await backend.signup(credentials);

        expect(response.success).toBe(true);
        expect(response.data).toBeDefined();
        expect(response.data?.email).toBe(credentials.email);
        expect(response.data?.firstName).toBe(credentials.firstName);
        expect(response.data?.lastName).toBe(credentials.lastName);
        expect(response.data?.organization).toBe(credentials.organization);
        expect(response.data?.id).toBeDefined();
      });

      it('should fail if email already exists', async () => {
        const credentials: SignupCredentials = {
          email: 'existing@example.com',
          password: 'password123',
          firstName: 'Test',
          lastName: 'User'
        };

        // Create first user
        await backend.signup(credentials);

        // Try to create duplicate
        const response = await backend.signup(credentials);

        expect(response.success).toBe(false);
        expect(response.error).toContain('already exists');
      });

      it('should hash password before storing', async () => {
        const credentials: SignupCredentials = {
          email: 'test@example.com',
          password: 'password123',
          firstName: 'Test',
          lastName: 'User'
        };

        await backend.signup(credentials);

        const users = JSON.parse(localStorage.getItem('cybersoluceUsers') || '[]');
        const user = users.find((u: any) => u.email === credentials.email);
        
        expect(user.password).not.toBe(credentials.password);
        expect(user.password).toBeDefined();
      });
    });

    describe('login', () => {
      beforeEach(async () => {
        // Create a test user
        await backend.signup({
          email: 'test@example.com',
          password: 'password123',
          firstName: 'Test',
          lastName: 'User'
        });
      });

      it('should login with correct credentials', async () => {
        const credentials: LoginCredentials = {
          email: 'test@example.com',
          password: 'password123'
        };

        const response = await backend.login(credentials);

        expect(response.success).toBe(true);
        expect(response.data).toBeDefined();
        expect(response.data?.email).toBe(credentials.email);
      });

      it('should fail with incorrect password', async () => {
        const credentials: LoginCredentials = {
          email: 'test@example.com',
          password: 'wrongpassword'
        };

        const response = await backend.login(credentials);

        expect(response.success).toBe(false);
        expect(response.error).toContain('Invalid');
      });

      it('should fail with non-existent email', async () => {
        const credentials: LoginCredentials = {
          email: 'nonexistent@example.com',
          password: 'password123'
        };

        const response = await backend.login(credentials);

        expect(response.success).toBe(false);
        expect(response.error).toContain('Invalid');
      });

      it('should set current user after successful login', async () => {
        const credentials: LoginCredentials = {
          email: 'test@example.com',
          password: 'password123'
        };

        await backend.login(credentials);

        const currentUser = JSON.parse(localStorage.getItem('cybersoluceCurrentUser') || 'null');
        expect(currentUser).toBeDefined();
        expect(currentUser.email).toBe(credentials.email);
      });
    });

    describe('logout', () => {
      it('should clear current user', async () => {
        // Login first
        await backend.signup({
          email: 'test@example.com',
          password: 'password123',
          firstName: 'Test',
          lastName: 'User'
        });

        await backend.login({
          email: 'test@example.com',
          password: 'password123'
        });

        // Logout
        await backend.logout();

        const currentUser = localStorage.getItem('cybersoluceCurrentUser');
        expect(currentUser).toBeNull();
      });
    });

    describe('getCurrentUser', () => {
      it('should return current user if logged in', async () => {
        await backend.signup({
          email: 'test@example.com',
          password: 'password123',
          firstName: 'Test',
          lastName: 'User'
        });

        await backend.login({
          email: 'test@example.com',
          password: 'password123'
        });

        const response = await backend.getCurrentUser();

        expect(response.success).toBe(true);
        expect(response.data?.email).toBe('test@example.com');
      });

      it('should return null if not logged in', async () => {
        const response = await backend.getCurrentUser();

        expect(response.success).toBe(false);
        expect(response.data).toBeUndefined();
      });
    });
  });

  describe('Assessment CRUD Operations', () => {
    let userId: string;

    beforeEach(async () => {
      // Create and login user
      const signupResponse = await backend.signup({
        email: 'test@example.com',
        password: 'password123',
        firstName: 'Test',
        lastName: 'User'
      });
      userId = signupResponse.data!.id;

      await backend.login({
        email: 'test@example.com',
        password: 'password123'
      });
    });

    describe('createAssessment', () => {
      it('should create a new assessment', async () => {
        const config = {
          domain: 'cybersecurity',
          name: 'Test Assessment',
          frameworks: ['NIST'],
          regions: ['US']
        };

        const response = await backend.createAssessment(config);

        expect(response.success).toBe(true);
        expect(response.data).toBeDefined();
        expect(response.data?.name).toBe(config.name);
        expect(response.data?.domain).toBe(config.domain);
        expect(response.data?.userId).toBe(userId);
        expect(response.data?.id).toBeDefined();
      });

      it('should initialize assessment with default values', async () => {
        const config = {
          domain: 'cybersecurity',
          name: 'Test Assessment',
          frameworks: ['NIST'],
          regions: ['US']
        };

        const response = await backend.createAssessment(config);

        expect(response.data?.status).toBe('in_progress');
        expect(response.data?.scores?.progress).toBe(0);
        expect(response.data?.scores?.score).toBe(0);
      });
    });

    describe('getAssessments', () => {
      it('should return empty array when no assessments exist', async () => {
        const response = await backend.getAssessments();

        expect(response.success).toBe(true);
        expect(response.data).toEqual([]);
      });

      it('should return all assessments for current user', async () => {
        // Create multiple assessments
        await backend.createAssessment({
          domain: 'cybersecurity',
          name: 'Assessment 1',
          frameworks: ['NIST'],
          regions: ['US']
        });

        await backend.createAssessment({
          domain: 'privacy',
          name: 'Assessment 2',
          frameworks: ['GDPR'],
          regions: ['EU']
        });

        const response = await backend.getAssessments();

        expect(response.success).toBe(true);
        expect(response.data?.length).toBe(2);
      });

      it('should only return assessments for current user', async () => {
        // Create assessment for current user
        await backend.createAssessment({
          domain: 'cybersecurity',
          name: 'My Assessment',
          frameworks: ['NIST'],
          regions: ['US']
        });

        // Create another user and their assessment
        await backend.signup({
          email: 'other@example.com',
          password: 'password123',
          firstName: 'Other',
          lastName: 'User'
        });

        await backend.login({
          email: 'other@example.com',
          password: 'password123'
        });

        await backend.createAssessment({
          domain: 'cybersecurity',
          name: 'Other Assessment',
          frameworks: ['NIST'],
          regions: ['US']
        });

        const response = await backend.getAssessments();

        expect(response.success).toBe(true);
        expect(response.data?.length).toBe(1);
        expect(response.data?.[0].name).toBe('Other Assessment');
      });
    });

    describe('getAssessment', () => {
      it('should return assessment by id', async () => {
        const createResponse = await backend.createAssessment({
          domain: 'cybersecurity',
          name: 'Test Assessment',
          frameworks: ['NIST'],
          regions: ['US']
        });

        const assessmentId = createResponse.data!.id;
        const response = await backend.getAssessment(assessmentId);

        expect(response.success).toBe(true);
        expect(response.data?.id).toBe(assessmentId);
        expect(response.data?.name).toBe('Test Assessment');
      });

      it('should return error for non-existent assessment', async () => {
        const response = await backend.getAssessment('non-existent-id');

        expect(response.success).toBe(false);
        expect(response.error).toBeDefined();
      });

      it('should not return assessment from another user', async () => {
        const createResponse = await backend.createAssessment({
          domain: 'cybersecurity',
          name: 'My Assessment',
          frameworks: ['NIST'],
          regions: ['US']
        });

        const assessmentId = createResponse.data!.id;

        // Switch to another user
        await backend.signup({
          email: 'other@example.com',
          password: 'password123',
          firstName: 'Other',
          lastName: 'User'
        });

        await backend.login({
          email: 'other@example.com',
          password: 'password123'
        });

        const response = await backend.getAssessment(assessmentId);

        expect(response.success).toBe(false);
      });
    });

    describe('updateAssessment', () => {
      it('should update assessment successfully', async () => {
        const createResponse = await backend.createAssessment({
          domain: 'cybersecurity',
          name: 'Test Assessment',
          frameworks: ['NIST'],
          regions: ['US']
        });

        const assessmentId = createResponse.data!.id;

        const updates = {
          name: 'Updated Assessment',
          status: 'completed' as const,
          scores: { progress: 100, score: 95 }
        };

        const response = await backend.updateAssessment(assessmentId, updates);

        expect(response.success).toBe(true);
        expect(response.data?.name).toBe('Updated Assessment');
        expect(response.data?.status).toBe('completed');
        expect(response.data?.scores?.progress).toBe(100);
        expect(response.data?.scores?.score).toBe(95);
      });

      it('should return error for non-existent assessment', async () => {
        const response = await backend.updateAssessment('non-existent-id', {
          name: 'Updated'
        });

        expect(response.success).toBe(false);
      });
    });

    describe('deleteAssessment', () => {
      it('should delete assessment successfully', async () => {
        const createResponse = await backend.createAssessment({
          domain: 'cybersecurity',
          name: 'Test Assessment',
          frameworks: ['NIST'],
          regions: ['US']
        });

        const assessmentId = createResponse.data!.id;

        const response = await backend.deleteAssessment(assessmentId);

        expect(response.success).toBe(true);

        // Verify it's deleted
        const getResponse = await backend.getAssessment(assessmentId);
        expect(getResponse.success).toBe(false);
      });

      it('should return error for non-existent assessment', async () => {
        const response = await backend.deleteAssessment('non-existent-id');

        expect(response.success).toBe(false);
      });
    });
  });

  describe('Data Persistence', () => {
    it('should persist users in localStorage', async () => {
      await backend.signup({
        email: 'test@example.com',
        password: 'password123',
        firstName: 'Test',
        lastName: 'User'
      });

      const users = JSON.parse(localStorage.getItem('cybersoluceUsers') || '[]');
      expect(users.length).toBeGreaterThan(0);
      expect(users.some((u: any) => u.email === 'test@example.com')).toBe(true);
    });

    it('should persist assessments in localStorage', async () => {
      await backend.signup({
        email: 'test@example.com',
        password: 'password123',
        firstName: 'Test',
        lastName: 'User'
      });

      await backend.login({
        email: 'test@example.com',
        password: 'password123'
      });

      await backend.createAssessment({
        domain: 'cybersecurity',
        name: 'Test Assessment',
        frameworks: ['NIST'],
        regions: ['US']
      });

      const assessments = JSON.parse(localStorage.getItem('cybersoluceAssessments') || '[]');
      expect(assessments.length).toBeGreaterThan(0);
    });

    it('should maintain data across backend instances', async () => {
      // Create user with first instance
      await backend.signup({
        email: 'test@example.com',
        password: 'password123',
        firstName: 'Test',
        lastName: 'User'
      });

      // Create new instance
      const newBackend = new LocalBackend();

      // Should be able to login with same credentials
      const response = await newBackend.login({
        email: 'test@example.com',
        password: 'password123'
      });

      expect(response.success).toBe(true);
    });
  });
});

