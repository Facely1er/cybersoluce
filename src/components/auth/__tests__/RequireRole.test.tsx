/**
 * Tests for RequireRole component - RBAC protection
 */

import React from 'react';
import { render, screen } from '@testing-library/react';
import { describe, it, expect, beforeEach, vi } from 'vitest';
import { RequireRole } from '../RequireRole';
import { useAuth } from '../../../context/AuthContext';

// Mock AuthContext
vi.mock('../../../context/AuthContext');

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

describe('RequireRole', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should render children when user has required role', () => {
    (useAuth as any).mockReturnValue({
      user: { ...mockUser, role: 'admin' },
      isAuthenticated: true
    });

    render(
      <RequireRole minRole="admin">
        <div>Admin Content</div>
      </RequireRole>
    );

    expect(screen.getByText('Admin Content')).toBeInTheDocument();
  });

  it('should render children when user has higher role than required', () => {
    (useAuth as any).mockReturnValue({
      user: { ...mockUser, role: 'admin' },
      isAuthenticated: true
    });

    render(
      <RequireRole minRole="analyst">
        <div>Analyst Content</div>
      </RequireRole>
    );

    expect(screen.getByText('Analyst Content')).toBeInTheDocument();
  });

  it('should not render children when user has lower role', () => {
    (useAuth as any).mockReturnValue({
      user: { ...mockUser, role: 'viewer' },
      isAuthenticated: true
    });

    render(
      <RequireRole minRole="analyst">
        <div>Analyst Content</div>
      </RequireRole>
    );

    expect(screen.queryByText('Analyst Content')).not.toBeInTheDocument();
  });

  it('should not render children when user has lower role than admin', () => {
    (useAuth as any).mockReturnValue({
      user: { ...mockUser, role: 'analyst' },
      isAuthenticated: true
    });

    render(
      <RequireRole minRole="admin">
        <div>Admin Content</div>
      </RequireRole>
    );

    expect(screen.queryByText('Admin Content')).not.toBeInTheDocument();
  });

  it('should render fallback when user does not have required role', () => {
    (useAuth as any).mockReturnValue({
      user: { ...mockUser, role: 'viewer' },
      isAuthenticated: true
    });

    render(
      <RequireRole minRole="admin" fallback={<div>Access Denied</div>}>
        <div>Admin Content</div>
      </RequireRole>
    );

    expect(screen.queryByText('Admin Content')).not.toBeInTheDocument();
    expect(screen.getByText('Access Denied')).toBeInTheDocument();
  });

  it('should render nothing when user is not authenticated', () => {
    (useAuth as any).mockReturnValue({
      user: null,
      isAuthenticated: false
    });

    render(
      <RequireRole minRole="viewer">
        <div>Content</div>
      </RequireRole>
    );

    expect(screen.queryByText('Content')).not.toBeInTheDocument();
  });

  it('should render fallback when user is not authenticated', () => {
    (useAuth as any).mockReturnValue({
      user: null,
      isAuthenticated: false
    });

    render(
      <RequireRole minRole="viewer" fallback={<div>Please Login</div>}>
        <div>Content</div>
      </RequireRole>
    );

    expect(screen.queryByText('Content')).not.toBeInTheDocument();
    expect(screen.getByText('Please Login')).toBeInTheDocument();
  });

  it('should handle role hierarchy correctly', () => {
    // Test viewer -> analyst
    (useAuth as any).mockReturnValue({
      user: { ...mockUser, role: 'viewer' },
      isAuthenticated: true
    });

    const { rerender } = render(
      <RequireRole minRole="viewer">
        <div>Viewer Content</div>
      </RequireRole>
    );

    expect(screen.getByText('Viewer Content')).toBeInTheDocument();

    // Test analyst -> admin
    (useAuth as any).mockReturnValue({
      user: { ...mockUser, role: 'analyst' },
      isAuthenticated: true
    });

    rerender(
      <RequireRole minRole="analyst">
        <div>Analyst Content</div>
      </RequireRole>
    );

    expect(screen.getByText('Analyst Content')).toBeInTheDocument();

    // Test admin -> admin
    (useAuth as any).mockReturnValue({
      user: { ...mockUser, role: 'admin' },
      isAuthenticated: true
    });

    rerender(
      <RequireRole minRole="admin">
        <div>Admin Content</div>
      </RequireRole>
    );

    expect(screen.getByText('Admin Content')).toBeInTheDocument();
  });

  it('should handle edge case with invalid role', () => {
    (useAuth as any).mockReturnValue({
      user: { ...mockUser, role: 'invalid-role' as any },
      isAuthenticated: true
    });

    render(
      <RequireRole minRole="analyst">
        <div>Content</div>
      </RequireRole>
    );

    // Invalid role should be treated as lowest privilege
    expect(screen.queryByText('Content')).not.toBeInTheDocument();
  });

  it('should allow viewer role to access viewer content', () => {
    (useAuth as any).mockReturnValue({
      user: { ...mockUser, role: 'viewer' },
      isAuthenticated: true
    });

    render(
      <RequireRole minRole="viewer">
        <div>Viewer Content</div>
      </RequireRole>
    );

    expect(screen.getByText('Viewer Content')).toBeInTheDocument();
  });
});

