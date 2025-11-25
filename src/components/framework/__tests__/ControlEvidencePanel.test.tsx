/**
 * Tests for ControlEvidencePanel component
 */

import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { describe, it, expect, beforeEach, vi } from 'vitest';
import ControlEvidencePanel from '../ControlEvidencePanel';
import { useGovernanceStore } from '../../../stores/governanceStore';
import { useAuth } from '../../../context/AuthContext';
import * as evidenceService from '../../../services/evidenceService';

// Mock dependencies
vi.mock('../../../stores/governanceStore');
vi.mock('../../../context/AuthContext');
vi.mock('../../../services/evidenceService');
vi.mock('../../../config/env', () => ({
  ENV: {
    backendMode: 'local'
  }
}));

const mockAddEvidence = vi.fn();
const mockRemoveEvidence = vi.fn();
const mockEvidence = [
  {
    id: 'evidence-1',
    controlId: 'control-123',
    frameworkId: 'nist-csf-2',
    title: 'Existing Evidence',
    description: 'Test description',
    type: 'policy' as const,
    location: '/path/to/evidence.pdf',
    addedBy: 'user-123',
    addedAt: new Date('2024-01-01'),
    lastUpdatedAt: new Date('2024-01-01'),
    tags: []
  }
];

const mockUser = {
  id: 'user-123',
  email: 'test@example.com',
  firstName: 'Test',
  lastName: 'User',
  organization: 'Test Org',
  userTier: 'professional' as const,
  role: 'analyst' as const,
  createdAt: '2024-01-01T00:00:00.000Z'
};

describe('ControlEvidencePanel', () => {
  beforeEach(() => {
    vi.clearAllMocks();

    (useGovernanceStore as any).mockReturnValue({
      evidence: mockEvidence,
      addEvidence: mockAddEvidence,
      removeEvidence: mockRemoveEvidence
    });

    (useAuth as any).mockReturnValue({
      user: mockUser,
      isAuthenticated: true
    });

    (evidenceService.loadEvidenceFromSupabase as any).mockResolvedValue([]);
  });

  it('renders evidence list', () => {
    render(
      <ControlEvidencePanel
        controlId="control-123"
        frameworkId="nist-csf-2"
      />
    );

    expect(screen.getByText('Evidence (1)')).toBeInTheDocument();
    expect(screen.getByText('Existing Evidence')).toBeInTheDocument();
  });

  it('shows empty state when no evidence exists', () => {
    (useGovernanceStore as any).mockReturnValue({
      evidence: [],
      addEvidence: mockAddEvidence,
      removeEvidence: mockRemoveEvidence
    });

    render(
      <ControlEvidencePanel
        controlId="control-123"
        frameworkId="nist-csf-2"
      />
    );

    expect(screen.getByText(/No evidence attached yet/i)).toBeInTheDocument();
  });

  it('shows add evidence form when button is clicked', () => {
    render(
      <ControlEvidencePanel
        controlId="control-123"
        frameworkId="nist-csf-2"
      />
    );

    const addButton = screen.getByRole('button', { name: /add evidence/i });
    fireEvent.click(addButton);

    expect(screen.getByPlaceholderText(/evidence title/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/location/i)).toBeInTheDocument();
  });

  it('adds evidence when form is submitted', async () => {
    render(
      <ControlEvidencePanel
        controlId="control-123"
        frameworkId="nist-csf-2"
      />
    );

    // Open form
    const addButton = screen.getByRole('button', { name: /add evidence/i });
    fireEvent.click(addButton);

    // Fill form
    const titleInput = screen.getByPlaceholderText(/evidence title/i);
    const locationInput = screen.getByPlaceholderText(/location/i);
    const descriptionInput = screen.getByPlaceholderText(/description/i);

    fireEvent.change(titleInput, { target: { value: 'New Evidence' } });
    fireEvent.change(locationInput, { target: { value: '/path/to/new.pdf' } });
    fireEvent.change(descriptionInput, { target: { value: 'New description' } });

    // Submit
    const submitButton = screen.getByRole('button', { name: /add evidence/i });
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(mockAddEvidence).toHaveBeenCalled();
    });

    const callArgs = mockAddEvidence.mock.calls[0][0];
    expect(callArgs.title).toBe('New Evidence');
    expect(callArgs.controlId).toBe('control-123');
    expect(callArgs.frameworkId).toBe('nist-csf-2');
    expect(callArgs.location).toBe('/path/to/new.pdf');
  });

  it('does not add evidence without title', () => {
    render(
      <ControlEvidencePanel
        controlId="control-123"
        frameworkId="nist-csf-2"
      />
    );

    // Open form
    const addButton = screen.getByRole('button', { name: /add evidence/i });
    fireEvent.click(addButton);

    // Try to submit without title
    const submitButton = screen.getByRole('button', { name: /add evidence/i });
    expect(submitButton).toBeDisabled();
  });

  it('removes evidence when delete button is clicked', async () => {
    // Mock window.confirm
    window.confirm = vi.fn(() => true);

    render(
      <ControlEvidencePanel
        controlId="control-123"
        frameworkId="nist-csf-2"
      />
    );

    const deleteButton = screen.getAllByLabelText(/remove evidence/i)[0];
    fireEvent.click(deleteButton);

    await waitFor(() => {
      expect(mockRemoveEvidence).toHaveBeenCalledWith('evidence-1');
    });
  });

  it('does not remove evidence if user cancels confirmation', () => {
    window.confirm = vi.fn(() => false);

    render(
      <ControlEvidencePanel
        controlId="control-123"
        frameworkId="nist-csf-2"
      />
    );

    const deleteButton = screen.getAllByLabelText(/remove evidence/i)[0];
    fireEvent.click(deleteButton);

    expect(mockRemoveEvidence).not.toHaveBeenCalled();
  });

  it('loads evidence from Supabase on mount when backend mode is supabase', async () => {
    vi.mock('../../../config/env', () => ({
      ENV: {
        backendMode: 'supabase'
      }
    }));

    const loadedEvidence = [
      {
        id: 'loaded-1',
        controlId: 'control-123',
        frameworkId: 'nist-csf-2',
        title: 'Loaded Evidence',
        type: 'policy' as const,
        addedBy: 'user-123',
        addedAt: new Date(),
        tags: []
      }
    ];

    (evidenceService.loadEvidenceFromSupabase as any).mockResolvedValue(loadedEvidence);

    (useGovernanceStore as any).mockReturnValue({
      evidence: [],
      addEvidence: mockAddEvidence,
      removeEvidence: mockRemoveEvidence
    });

    render(
      <ControlEvidencePanel
        controlId="control-123"
        frameworkId="nist-csf-2"
      />
    );

    await waitFor(() => {
      expect(evidenceService.loadEvidenceFromSupabase).toHaveBeenCalledWith('control-123', 'nist-csf-2');
    });
  });

  it('uses user ID from auth context when adding evidence', async () => {
    render(
      <ControlEvidencePanel
        controlId="control-123"
        frameworkId="nist-csf-2"
      />
    );

    // Open form
    const addButton = screen.getByRole('button', { name: /add evidence/i });
    fireEvent.click(addButton);

    // Fill and submit
    const titleInput = screen.getByPlaceholderText(/evidence title/i);
    fireEvent.change(titleInput, { target: { value: 'New Evidence' } });

    const submitButton = screen.getByRole('button', { name: /add evidence/i });
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(mockAddEvidence).toHaveBeenCalled();
    });

    const callArgs = mockAddEvidence.mock.calls[0][0];
    expect(callArgs.addedBy).toBe('user-123');
  });

  it('handles missing user gracefully', async () => {
    (useAuth as any).mockReturnValue({
      user: null,
      isAuthenticated: false
    });

    render(
      <ControlEvidencePanel
        controlId="control-123"
        frameworkId="nist-csf-2"
      />
    );

    // Open form
    const addButton = screen.getByRole('button', { name: /add evidence/i });
    fireEvent.click(addButton);

    // Fill and submit
    const titleInput = screen.getByPlaceholderText(/evidence title/i);
    fireEvent.change(titleInput, { target: { value: 'New Evidence' } });

    const submitButton = screen.getByRole('button', { name: /add evidence/i });
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(mockAddEvidence).toHaveBeenCalled();
    });

    const callArgs = mockAddEvidence.mock.calls[0][0];
    expect(callArgs.addedBy).toBe('anonymous');
  });

  it('displays evidence type badges correctly', () => {
    render(
      <ControlEvidencePanel
        controlId="control-123"
        frameworkId="nist-csf-2"
      />
    );

    expect(screen.getByText(/policy/i)).toBeInTheDocument();
  });

  it('displays evidence location when available', () => {
    render(
      <ControlEvidencePanel
        controlId="control-123"
        frameworkId="nist-csf-2"
      />
    );

    expect(screen.getByText('/path/to/evidence.pdf')).toBeInTheDocument();
  });

  it('displays evidence description when available', () => {
    render(
      <ControlEvidencePanel
        controlId="control-123"
        frameworkId="nist-csf-2"
      />
    );

    expect(screen.getByText('Test description')).toBeInTheDocument();
  });
});

