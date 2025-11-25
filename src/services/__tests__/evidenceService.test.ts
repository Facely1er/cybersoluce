/**
 * Tests for Evidence Service - Supabase evidence persistence
 */

import { describe, it, expect, beforeEach, vi } from 'vitest';
import {
  saveEvidenceToSupabase,
  loadEvidenceFromSupabase,
  deleteEvidenceFromSupabase
} from '../evidenceService';
import { Evidence } from '../../types/cybersoluce';

// Mock Supabase client
const mockSupabaseClient = {
  auth: {
    getUser: vi.fn()
  },
  from: vi.fn(() => ({
    insert: vi.fn().mockReturnThis(),
    select: vi.fn().mockReturnThis(),
    delete: vi.fn().mockReturnThis(),
    eq: vi.fn().mockReturnThis(),
    single: vi.fn(),
    order: vi.fn().mockReturnThis()
  }))
};

vi.mock('../../lib/supabaseClient', () => ({
  supabaseClient: mockSupabaseClient
}));

vi.mock('../../config/env', () => ({
  ENV: {
    backendMode: 'supabase'
  }
}));

describe('Evidence Service', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    
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

  describe('saveEvidenceToSupabase', () => {
    it('should save evidence to Supabase successfully', async () => {
      const evidenceData: Omit<Evidence, 'id' | 'addedAt' | 'lastUpdatedAt'> = {
        controlId: 'control-123',
        frameworkId: 'nist-csf-2',
        title: 'Access Control Policy',
        description: 'Policy document for access control',
        type: 'policy',
        location: '/policies/access-control.pdf',
        addedBy: 'user-123',
        tags: ['access-control', 'policy']
      };

      const mockInsert = vi.fn().mockReturnThis();
      const mockSelect = vi.fn().mockReturnThis();
      const mockSingle = vi.fn().mockResolvedValue({
        data: {
          id: 'evidence-123',
          owner_id: 'user-123',
          control_id: evidenceData.controlId,
          framework_id: evidenceData.frameworkId,
          title: evidenceData.title,
          description: evidenceData.description,
          type: evidenceData.type,
          location: evidenceData.location,
          tags: evidenceData.tags,
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString()
        },
        error: null
      });

      mockSupabaseClient.from.mockReturnValueOnce({
        insert: mockInsert,
        select: mockSelect,
        single: mockSingle
      });

      const result = await saveEvidenceToSupabase(evidenceData);

      expect(result).not.toBeNull();
      expect(result?.id).toBe('evidence-123');
      expect(result?.title).toBe(evidenceData.title);
      expect(result?.controlId).toBe(evidenceData.controlId);
      expect(result?.frameworkId).toBe(evidenceData.frameworkId);
    });

    it('should return null when not using Supabase backend', async () => {
      vi.mock('../../config/env', () => ({
        ENV: {
          backendMode: 'local'
        }
      }));

      const evidenceData: Omit<Evidence, 'id' | 'addedAt' | 'lastUpdatedAt'> = {
        controlId: 'control-123',
        frameworkId: 'nist-csf-2',
        title: 'Test Evidence',
        type: 'policy',
        addedBy: 'user-123',
        tags: []
      };

      const result = await saveEvidenceToSupabase(evidenceData);

      expect(result).toBeNull();
    });

    it('should return null when user is not authenticated', async () => {
      mockSupabaseClient.auth.getUser.mockResolvedValue({
        data: { user: null },
        error: { message: 'Not authenticated' }
      });

      const evidenceData: Omit<Evidence, 'id' | 'addedAt' | 'lastUpdatedAt'> = {
        controlId: 'control-123',
        frameworkId: 'nist-csf-2',
        title: 'Test Evidence',
        type: 'policy',
        addedBy: 'user-123',
        tags: []
      };

      const result = await saveEvidenceToSupabase(evidenceData);

      expect(result).toBeNull();
    });

    it('should handle database errors gracefully', async () => {
      const evidenceData: Omit<Evidence, 'id' | 'addedAt' | 'lastUpdatedAt'> = {
        controlId: 'control-123',
        frameworkId: 'nist-csf-2',
        title: 'Test Evidence',
        type: 'policy',
        addedBy: 'user-123',
        tags: []
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

      const result = await saveEvidenceToSupabase(evidenceData);

      expect(result).toBeNull();
    });
  });

  describe('loadEvidenceFromSupabase', () => {
    it('should load evidence from Supabase successfully', async () => {
      const controlId = 'control-123';
      const frameworkId = 'nist-csf-2';

      const mockSelect = vi.fn().mockReturnThis();
      const mockEq = vi.fn().mockReturnThis();
      const mockOrder = vi.fn().mockResolvedValue({
        data: [
          {
            id: 'evidence-1',
            owner_id: 'user-123',
            control_id: controlId,
            framework_id: frameworkId,
            title: 'Evidence 1',
            description: 'Description 1',
            type: 'policy',
            location: '/path/to/evidence1.pdf',
            tags: ['tag1'],
            created_at: new Date().toISOString(),
            updated_at: new Date().toISOString()
          },
          {
            id: 'evidence-2',
            owner_id: 'user-123',
            control_id: controlId,
            framework_id: frameworkId,
            title: 'Evidence 2',
            description: null,
            type: 'procedure',
            location: null,
            tags: [],
            created_at: new Date().toISOString(),
            updated_at: null
          }
        ],
        error: null
      });

      mockSupabaseClient.from.mockReturnValueOnce({
        select: mockSelect,
        eq: mockEq,
        order: mockOrder
      });

      const result = await loadEvidenceFromSupabase(controlId, frameworkId);

      expect(result.length).toBe(2);
      expect(result[0].id).toBe('evidence-1');
      expect(result[0].title).toBe('Evidence 1');
      expect(result[1].id).toBe('evidence-2');
      expect(result[1].title).toBe('Evidence 2');
    });

    it('should return empty array when no evidence exists', async () => {
      const controlId = 'control-123';
      const frameworkId = 'nist-csf-2';

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

      const result = await loadEvidenceFromSupabase(controlId, frameworkId);

      expect(result).toEqual([]);
    });

    it('should return empty array when not using Supabase backend', async () => {
      vi.mock('../../config/env', () => ({
        ENV: {
          backendMode: 'local'
        }
      }));

      const result = await loadEvidenceFromSupabase('control-123', 'nist-csf-2');

      expect(result).toEqual([]);
    });

    it('should return empty array when user is not authenticated', async () => {
      mockSupabaseClient.auth.getUser.mockResolvedValue({
        data: { user: null },
        error: { message: 'Not authenticated' }
      });

      const result = await loadEvidenceFromSupabase('control-123', 'nist-csf-2');

      expect(result).toEqual([]);
    });

    it('should handle database errors gracefully', async () => {
      const mockSelect = vi.fn().mockReturnThis();
      const mockEq = vi.fn().mockReturnThis();
      const mockOrder = vi.fn().mockResolvedValue({
        data: null,
        error: { message: 'Database error' }
      });

      mockSupabaseClient.from.mockReturnValueOnce({
        select: mockSelect,
        eq: mockEq,
        order: mockOrder
      });

      const result = await loadEvidenceFromSupabase('control-123', 'nist-csf-2');

      expect(result).toEqual([]);
    });
  });

  describe('deleteEvidenceFromSupabase', () => {
    it('should delete evidence from Supabase successfully', async () => {
      const evidenceId = 'evidence-123';

      const mockDelete = vi.fn().mockReturnThis();
      const mockEq = vi.fn().mockResolvedValue({
        data: null,
        error: null
      });

      mockSupabaseClient.from.mockReturnValueOnce({
        delete: mockDelete,
        eq: mockEq
      });

      const result = await deleteEvidenceFromSupabase(evidenceId);

      expect(result).toBe(true);
      expect(mockEq).toHaveBeenCalledWith('id', evidenceId);
      expect(mockEq).toHaveBeenCalledWith('owner_id', 'user-123');
    });

    it('should return false when not using Supabase backend', async () => {
      vi.mock('../../config/env', () => ({
        ENV: {
          backendMode: 'local'
        }
      }));

      const result = await deleteEvidenceFromSupabase('evidence-123');

      expect(result).toBe(false);
    });

    it('should return false when user is not authenticated', async () => {
      mockSupabaseClient.auth.getUser.mockResolvedValue({
        data: { user: null },
        error: { message: 'Not authenticated' }
      });

      const result = await deleteEvidenceFromSupabase('evidence-123');

      expect(result).toBe(false);
    });

    it('should handle deletion errors gracefully', async () => {
      const evidenceId = 'evidence-123';

      const mockDelete = vi.fn().mockReturnThis();
      const mockEq = vi.fn().mockResolvedValue({
        data: null,
        error: { message: 'Database error' }
      });

      mockSupabaseClient.from.mockReturnValueOnce({
        delete: mockDelete,
        eq: mockEq
      });

      const result = await deleteEvidenceFromSupabase(evidenceId);

      expect(result).toBe(false);
    });

    it('should only delete evidence owned by current user', async () => {
      const evidenceId = 'evidence-123';

      const mockDelete = vi.fn().mockReturnThis();
      const mockEq = vi.fn().mockResolvedValue({
        data: null,
        error: null
      });

      mockSupabaseClient.from.mockReturnValueOnce({
        delete: mockDelete,
        eq: mockEq
      });

      await deleteEvidenceFromSupabase(evidenceId);

      // Verify RLS enforcement - should check owner_id
      expect(mockEq).toHaveBeenCalledWith('owner_id', 'user-123');
    });
  });
});

