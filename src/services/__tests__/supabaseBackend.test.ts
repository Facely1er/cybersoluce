/**
 * Tests for SupabaseBackend - Supabase-based backend
 */

import { describe, it, expect, beforeEach, vi } from 'vitest';
import { SupabaseBackend } from '../supabaseBackend';
import { LoginCredentials, SignupCredentials } from '../apiService.types';

// Mock Supabase client
const mockSupabaseClient = {
  auth: {
    signInWithPassword: vi.fn(),
    signUp: vi.fn(),
    signOut: vi.fn(),
    getUser: vi.fn(),
    onAuthStateChange: vi.fn(() => ({
      data: { subscription: { unsubscribe: vi.fn() } }
    }))
  },
  from: vi.fn(() => ({
    select: vi.fn().mockReturnThis(),
    insert: vi.fn().mockReturnThis(),
    update: vi.fn().mockReturnThis(),
    delete: vi.fn().mockReturnThis(),
    eq: vi.fn().mockReturnThis(),
    single: vi.fn(),
    order: vi.fn().mockReturnThis()
  }))
};

vi.mock('../../lib/supabaseClient', () => ({
  supabaseClient: mockSupabaseClient
}));

describe('SupabaseBackend', () => {
  let backend: SupabaseBackend;

  beforeEach(() => {
    backend = new SupabaseBackend();
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

        // Mock Supabase auth signup
        mockSupabaseClient.auth.signUp.mockResolvedValue({
          data: {
            user: {
              id: 'user-123',
              email: credentials.email
            }
          },
          error: null
        });

        // Mock profile creation
        const mockSelect = vi.fn().mockReturnThis();
        const mockInsert = vi.fn().mockReturnThis();
        const mockSingle = vi.fn().mockResolvedValue({
          data: {
            id: 'user-123',
            email: credentials.email,
            first_name: credentials.firstName,
            last_name: credentials.lastName,
            organization: credentials.organization,
            user_tier: 'free',
            role: 'analyst',
            created_at: new Date().toISOString()
          },
          error: null
        });

        mockSupabaseClient.from.mockReturnValueOnce({
          insert: mockInsert,
          select: mockSelect,
          single: mockSingle
        });

        mockInsert.mockResolvedValue({
          data: {
            id: 'user-123',
            email: credentials.email,
            first_name: credentials.firstName,
            last_name: credentials.lastName,
            organization: credentials.organization,
            user_tier: 'free',
            role: 'analyst',
            created_at: new Date().toISOString()
          },
          error: null
        });

        const response = await backend.signup(credentials);

        expect(response.success).toBe(true);
        expect(response.data).toBeDefined();
        expect(response.data?.email).toBe(credentials.email);
        expect(response.data?.firstName).toBe(credentials.firstName);
      });

      it('should handle signup errors', async () => {
        const credentials: SignupCredentials = {
          email: 'test@example.com',
          password: 'password123',
          firstName: 'Test',
          lastName: 'User'
        };

        mockSupabaseClient.auth.signUp.mockResolvedValue({
          data: { user: null },
          error: { message: 'Email already exists' }
        });

        const response = await backend.signup(credentials);

        expect(response.success).toBe(false);
        expect(response.error).toBeDefined();
      });
    });

    describe('login', () => {
      it('should login with correct credentials', async () => {
        const credentials: LoginCredentials = {
          email: 'test@example.com',
          password: 'password123'
        };

        // Mock auth signin
        mockSupabaseClient.auth.signInWithPassword.mockResolvedValue({
          data: {
            user: {
              id: 'user-123',
              email: credentials.email
            }
          },
          error: null
        });

        // Mock profile fetch
        const mockSelect = vi.fn().mockReturnThis();
        const mockEq = vi.fn().mockReturnThis();
        const mockSingle = vi.fn().mockResolvedValue({
          data: {
            id: 'user-123',
            email: credentials.email,
            first_name: 'Test',
            last_name: 'User',
            organization: 'Test Org',
            user_tier: 'free',
            role: 'analyst',
            created_at: new Date().toISOString()
          },
          error: null
        });

        mockSupabaseClient.from.mockReturnValueOnce({
          select: mockSelect,
          eq: mockEq,
          single: mockSingle
        });

        const response = await backend.login(credentials);

        expect(response.success).toBe(true);
        expect(response.data).toBeDefined();
        expect(response.data?.email).toBe(credentials.email);
      });

      it('should handle login errors', async () => {
        const credentials: LoginCredentials = {
          email: 'test@example.com',
          password: 'wrongpassword'
        };

        mockSupabaseClient.auth.signInWithPassword.mockResolvedValue({
          data: { user: null },
          error: { message: 'Invalid credentials' }
        });

        const response = await backend.login(credentials);

        expect(response.success).toBe(false);
        expect(response.error).toContain('Invalid');
      });

      it('should handle missing profile', async () => {
        const credentials: LoginCredentials = {
          email: 'test@example.com',
          password: 'password123'
        };

        mockSupabaseClient.auth.signInWithPassword.mockResolvedValue({
          data: {
            user: {
              id: 'user-123',
              email: credentials.email
            }
          },
          error: null
        });

        const mockSelect = vi.fn().mockReturnThis();
        const mockEq = vi.fn().mockReturnThis();
        const mockSingle = vi.fn().mockResolvedValue({
          data: null,
          error: { message: 'Profile not found' }
        });

        mockSupabaseClient.from.mockReturnValueOnce({
          select: mockSelect,
          eq: mockEq,
          single: mockSingle
        });

        const response = await backend.login(credentials);

        expect(response.success).toBe(false);
        expect(response.error).toBeDefined();
      });
    });

    describe('logout', () => {
      it('should logout successfully', async () => {
        mockSupabaseClient.auth.signOut.mockResolvedValue({
          error: null
        });

        const response = await backend.logout();

        expect(response.success).toBe(true);
        expect(mockSupabaseClient.auth.signOut).toHaveBeenCalled();
      });
    });

    describe('getCurrentUser', () => {
      it('should return current user if authenticated', async () => {
        mockSupabaseClient.auth.getUser.mockResolvedValue({
          data: {
            user: {
              id: 'user-123',
              email: 'test@example.com'
            }
          },
          error: null
        });

        const mockSelect = vi.fn().mockReturnThis();
        const mockEq = vi.fn().mockReturnThis();
        const mockSingle = vi.fn().mockResolvedValue({
          data: {
            id: 'user-123',
            email: 'test@example.com',
            first_name: 'Test',
            last_name: 'User',
            organization: 'Test Org',
            user_tier: 'free',
            role: 'analyst',
            created_at: new Date().toISOString()
          },
          error: null
        });

        mockSupabaseClient.from.mockReturnValueOnce({
          select: mockSelect,
          eq: mockEq,
          single: mockSingle
        });

        const response = await backend.getCurrentUser();

        expect(response.success).toBe(true);
        expect(response.data).toBeDefined();
      });

      it('should return error if not authenticated', async () => {
        mockSupabaseClient.auth.getUser.mockResolvedValue({
          data: { user: null },
          error: { message: 'Not authenticated' }
        });

        const response = await backend.getCurrentUser();

        expect(response.success).toBe(false);
      });
    });
  });

  describe('Assessment CRUD Operations', () => {
    beforeEach(() => {
      // Mock authenticated user
      mockSupabaseClient.auth.getUser.mockResolvedValue({
        data: {
          user: {
            id: 'user-123',
            email: 'test@example.com'
          }
        },
        error: null
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

        const mockInsert = vi.fn().mockReturnThis();
        const mockSelect = vi.fn().mockReturnThis();
        const mockSingle = vi.fn().mockResolvedValue({
          data: {
            id: 'assessment-123',
            owner_id: 'user-123',
            name: config.name,
            domain: config.domain,
            config: config,
            status: 'in_progress',
            scores: { progress: 0, score: 0 },
            created_at: new Date().toISOString(),
            updated_at: new Date().toISOString(),
            frameworks: config.frameworks,
            regions: config.regions
          },
          error: null
        });

        mockSupabaseClient.from.mockReturnValueOnce({
          insert: mockInsert,
          select: mockSelect,
          single: mockSingle
        });

        const response = await backend.createAssessment(config);

        expect(response.success).toBe(true);
        expect(response.data).toBeDefined();
        expect(response.data?.name).toBe(config.name);
      });

      it('should handle creation errors', async () => {
        const config = {
          domain: 'cybersecurity',
          name: 'Test Assessment',
          frameworks: ['NIST'],
          regions: ['US']
        };

        const mockInsert = vi.fn().mockReturnThis();
        const mockSelect = vi.fn().mockReturnThis();
        const mockSingle = vi.fn().mockResolvedValue({
          data: null,
          error: { message: 'Database error' }
        });

        mockSupabaseClient.from.mockReturnValueOnce({
          insert: mockInsert,
          select: mockSelect,
          single: mockSingle
        });

        const response = await backend.createAssessment(config);

        expect(response.success).toBe(false);
        expect(response.error).toBeDefined();
      });
    });

    describe('getAssessments', () => {
      it('should return assessments for current user', async () => {
        const mockSelect = vi.fn().mockReturnThis();
        const mockEq = vi.fn().mockReturnThis();
        const mockOrder = vi.fn().mockResolvedValue({
          data: [
            {
              id: 'assessment-1',
              owner_id: 'user-123',
              name: 'Assessment 1',
              domain: 'cybersecurity',
              status: 'in_progress',
              scores: { progress: 50, score: 75 },
              created_at: new Date().toISOString(),
              updated_at: new Date().toISOString(),
              config: { domain: 'cybersecurity', name: 'Assessment 1', frameworks: ['NIST'], regions: ['US'] },
              frameworks: ['NIST'],
              regions: ['US']
            }
          ],
          error: null
        });

        mockSupabaseClient.from.mockReturnValueOnce({
          select: mockSelect,
          eq: mockEq,
          order: mockOrder
        });

        const response = await backend.getAssessments();

        expect(response.success).toBe(true);
        expect(response.data?.length).toBeGreaterThan(0);
      });

      it('should return empty array when no assessments exist', async () => {
        const mockSelect = vi.fn().mockReturnThis();
        const mockEq = vi.fn().mockReturnThis();
        const mockOrder = vi.fn().mockResolvedValue({
          data: [],
          error: null
        });

        mockSupabaseClient.from.mockReturnValueOnce({
          select: mockSelect,
          eq: mockEq,
          order: mockOrder
        });

        const response = await backend.getAssessments();

        expect(response.success).toBe(true);
        expect(response.data).toEqual([]);
      });
    });

    describe('updateAssessment', () => {
      it('should update assessment successfully', async () => {
        const assessmentId = 'assessment-123';
        const updates = {
          name: 'Updated Assessment',
          status: 'completed' as const
        };

        const mockUpdate = vi.fn().mockReturnThis();
        const mockSelect = vi.fn().mockReturnThis();
        const mockEq = vi.fn().mockReturnThis();
        const mockSingle = vi.fn().mockResolvedValue({
          data: {
            id: assessmentId,
            owner_id: 'user-123',
            name: updates.name,
            status: updates.status,
            domain: 'cybersecurity',
            scores: { progress: 100, score: 95 },
            created_at: new Date().toISOString(),
            updated_at: new Date().toISOString(),
            config: { domain: 'cybersecurity', name: updates.name, frameworks: ['NIST'], regions: ['US'] },
            frameworks: ['NIST'],
            regions: ['US']
          },
          error: null
        });

        mockSupabaseClient.from.mockReturnValueOnce({
          update: mockUpdate,
          select: mockSelect,
          eq: mockEq,
          single: mockSingle
        });

        const response = await backend.updateAssessment(assessmentId, updates);

        expect(response.success).toBe(true);
        expect(response.data?.name).toBe(updates.name);
        expect(response.data?.status).toBe(updates.status);
      });
    });

    describe('deleteAssessment', () => {
      it('should delete assessment successfully', async () => {
        const assessmentId = 'assessment-123';

        const mockDelete = vi.fn().mockReturnThis();
        const mockEq = vi.fn().mockResolvedValue({
          data: null,
          error: null
        });

        mockSupabaseClient.from.mockReturnValueOnce({
          delete: mockDelete,
          eq: mockEq
        });

        const response = await backend.deleteAssessment(assessmentId);

        expect(response.success).toBe(true);
      });
    });
  });

  describe('RLS Policy Enforcement', () => {
    it('should only return assessments for authenticated user', async () => {
      mockSupabaseClient.auth.getUser.mockResolvedValue({
        data: {
          user: {
            id: 'user-123',
            email: 'test@example.com'
          }
        },
        error: null
      });

      const mockSelect = vi.fn().mockReturnThis();
      const mockEq = vi.fn().mockReturnThis();
      const mockOrder = vi.fn().mockResolvedValue({
        data: [],
        error: null
      });

      mockSupabaseClient.from.mockReturnValueOnce({
        select: mockSelect,
        eq: mockEq,
        order: mockOrder
      });

      await backend.getAssessments();

      // Verify that eq('owner_id', 'user-123') was called
      expect(mockEq).toHaveBeenCalledWith('owner_id', 'user-123');
    });
  });

  describe('Error Handling', () => {
    it('should handle Supabase not configured', async () => {
      // Temporarily set supabaseClient to null
      const originalClient = require('../../lib/supabaseClient').supabaseClient;
      vi.mock('../../lib/supabaseClient', () => ({
        supabaseClient: null
      }));

      const backend = new SupabaseBackend();
      const response = await backend.login({
        email: 'test@example.com',
        password: 'password123'
      });

      expect(response.success).toBe(false);
      expect(response.error).toContain('not configured');
    });
  });
});

