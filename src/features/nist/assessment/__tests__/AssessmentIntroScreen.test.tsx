import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { AssessmentIntroScreen } from '../components/AssessmentIntroScreen';

// Mock the framework data
const mockFramework = {
  id: 'nist-csf-v2',
  name: 'NIST Cybersecurity Framework v2.0',
  version: '2.0',
  description: 'Test framework',
  functions: [
    {
      id: 'govern',
      name: 'Govern',
      description: 'Test function',
      categories: []
    }
  ]
};

describe('AssessmentIntroScreen', () => {
  const mockOnStartAssessment = vi.fn();
  const mockOnBack = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('renders framework information', () => {
    render(
      <AssessmentIntroScreen
        framework={mockFramework}
        onStartAssessment={mockOnStartAssessment}
        onBack={mockOnBack}
      />
    );

    expect(screen.getByText('NIST Cybersecurity Framework v2.0')).toBeInTheDocument();
    expect(screen.getByText('Test framework')).toBeInTheDocument();
  });

  it('calls onStartAssessment when start button is clicked', () => {
    render(
      <AssessmentIntroScreen
        framework={mockFramework}
        onStartAssessment={mockOnStartAssessment}
        onBack={mockOnBack}
      />
    );

    const startButton = screen.getByRole('button', { name: /start assessment/i });
    fireEvent.click(startButton);

    expect(mockOnStartAssessment).toHaveBeenCalledTimes(1);
  });

  it('calls onBack when back button is clicked', () => {
    render(
      <AssessmentIntroScreen
        framework={mockFramework}
        onStartAssessment={mockOnStartAssessment}
        onBack={mockOnBack}
      />
    );

    const backButton = screen.getByRole('button', { name: /back/i });
    fireEvent.click(backButton);

    expect(mockOnBack).toHaveBeenCalledTimes(1);
  });

  it('displays framework functions', () => {
    render(
      <AssessmentIntroScreen
        framework={mockFramework}
        onStartAssessment={mockOnStartAssessment}
        onBack={mockOnBack}
      />
    );

    expect(screen.getByText('Govern')).toBeInTheDocument();
  });

  it('shows assessment overview', () => {
    render(
      <AssessmentIntroScreen
        framework={mockFramework}
        onStartAssessment={mockOnStartAssessment}
        onBack={mockOnBack}
      />
    );

    // Look for common assessment intro text
    expect(screen.getByText(/assessment/i)).toBeInTheDocument();
  });
});