/**
 * Tests for NIST CSF Board Report Generation
 */

import { describe, it, expect, beforeEach, vi } from 'vitest';
import { generateNistCsfBoardReport } from '../nistCsfReport';
import { useGovernanceStore } from '../../../stores/governanceStore';

// Mock the governance store
vi.mock('../../../stores/governanceStore', () => ({
  useGovernanceStore: {
    getState: vi.fn()
  }
}));

describe('generateNistCsfBoardReport', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should generate HTML report with basic structure', () => {
    (useGovernanceStore.getState as any).mockReturnValue({
      frameworks: [
        {
          id: 'nist-csf-2',
          name: 'NIST Cybersecurity Framework v2.0',
          version: '2.0',
          description: 'Test framework',
          status: 'active'
        }
      ],
      categories: [
        {
          id: 'cat-1',
          frameworkId: 'nist-csf-2',
          name: 'Govern',
          description: 'Governance category'
        }
      ],
      controls: [
        {
          id: 'control-1',
          frameworkId: 'nist-csf-2',
          categoryId: 'cat-1',
          name: 'GV.OC-1',
          status: 'implemented',
          maturityLevel: 3
        }
      ],
      evidence: [],
      controlMappings: []
    });

    const html = generateNistCsfBoardReport();

    expect(html).toContain('<!DOCTYPE html>');
    expect(html).toContain('NIST CSF 2.0 Board Report');
    expect(html).toContain('Executive Summary');
    expect(html).toContain('Framework Overview');
    expect(html).toContain('Category Breakdown');
  });

  it('should include evidence summary when includeEvidence is true', () => {
    (useGovernanceStore.getState as any).mockReturnValue({
      frameworks: [
        {
          id: 'nist-csf-2',
          name: 'NIST Cybersecurity Framework v2.0',
          version: '2.0',
          description: 'Test framework',
          status: 'active'
        }
      ],
      categories: [
        {
          id: 'cat-1',
          frameworkId: 'nist-csf-2',
          name: 'Govern',
          description: 'Governance category'
        }
      ],
      controls: [
        {
          id: 'control-1',
          frameworkId: 'nist-csf-2',
          categoryId: 'cat-1',
          name: 'GV.OC-1',
          status: 'implemented',
          maturityLevel: 3
        }
      ],
      evidence: [
        {
          id: 'evidence-1',
          controlId: 'control-1',
          frameworkId: 'nist-csf-2',
          title: 'Access Control Policy',
          type: 'policy',
          addedBy: 'user-123',
          addedAt: new Date(),
          tags: []
        }
      ],
      controlMappings: []
    });

    const html = generateNistCsfBoardReport({ includeEvidence: true });

    expect(html).toContain('Evidence Summary');
    expect(html).toContain('Total Evidence Items:');
    expect(html).toContain('Evidence by Category');
    expect(html).toContain('Evidence Types');
  });

  it('should include mappings summary when includeMappings is true', () => {
    (useGovernanceStore.getState as any).mockReturnValue({
      frameworks: [
        {
          id: 'nist-csf-2',
          name: 'NIST Cybersecurity Framework v2.0',
          version: '2.0',
          description: 'Test framework',
          status: 'active'
        }
      ],
      categories: [
        {
          id: 'cat-1',
          frameworkId: 'nist-csf-2',
          name: 'Govern',
          description: 'Governance category'
        }
      ],
      controls: [
        {
          id: 'control-1',
          frameworkId: 'nist-csf-2',
          categoryId: 'cat-1',
          name: 'GV.OC-1',
          status: 'implemented',
          maturityLevel: 3
        }
      ],
      evidence: [],
      controlMappings: [
        {
          id: 'mapping-1',
          sourceFrameworkId: 'nist-csf-2',
          sourceControlId: 'GV.OC-1',
          targetFrameworkId: 'iso27001',
          targetControlId: 'A.5.1.1',
          strength: 'strong',
          notes: 'Direct mapping'
        }
      ]
    });

    const html = generateNistCsfBoardReport({ includeMappings: true });

    expect(html).toContain('Cross-Framework Mappings');
    expect(html).toContain('Total Mappings:');
    expect(html).toContain('Strong Mappings');
    expect(html).toContain('Sample Mappings');
  });

  it('should calculate maturity statistics correctly', () => {
    (useGovernanceStore.getState as any).mockReturnValue({
      frameworks: [
        {
          id: 'nist-csf-2',
          name: 'NIST Cybersecurity Framework v2.0',
          version: '2.0',
          description: 'Test framework',
          status: 'active'
        }
      ],
      categories: [
        {
          id: 'cat-1',
          frameworkId: 'nist-csf-2',
          name: 'Govern',
          description: 'Governance category'
        }
      ],
      controls: [
        {
          id: 'control-1',
          frameworkId: 'nist-csf-2',
          categoryId: 'cat-1',
          name: 'GV.OC-1',
          status: 'implemented',
          maturityLevel: 4
        },
        {
          id: 'control-2',
          frameworkId: 'nist-csf-2',
          categoryId: 'cat-1',
          name: 'GV.OC-2',
          status: 'in-progress',
          maturityLevel: 2
        },
        {
          id: 'control-3',
          frameworkId: 'nist-csf-2',
          categoryId: 'cat-1',
          name: 'GV.OC-3',
          status: 'not-started',
          maturityLevel: 0
        }
      ],
      evidence: [],
      controlMappings: []
    });

    const html = generateNistCsfBoardReport();

    expect(html).toContain('Total Controls');
    expect(html).toContain('Implemented');
    expect(html).toContain('In Progress');
    expect(html).toContain('Not Started');
    expect(html).toContain('Avg Maturity Level');
  });

  it('should throw error when NIST CSF framework is not loaded', () => {
    (useGovernanceStore.getState as any).mockReturnValue({
      frameworks: [],
      categories: [],
      controls: [],
      evidence: [],
      controlMappings: []
    });

    expect(() => generateNistCsfBoardReport()).toThrow('NIST CSF v2 framework not loaded');
  });

  it('should include recommendations based on maturity stats', () => {
    (useGovernanceStore.getState as any).mockReturnValue({
      frameworks: [
        {
          id: 'nist-csf-2',
          name: 'NIST Cybersecurity Framework v2.0',
          version: '2.0',
          description: 'Test framework',
          status: 'active'
        }
      ],
      categories: [
        {
          id: 'cat-1',
          frameworkId: 'nist-csf-2',
          name: 'Govern',
          description: 'Governance category'
        }
      ],
      controls: [
        {
          id: 'control-1',
          frameworkId: 'nist-csf-2',
          categoryId: 'cat-1',
          name: 'GV.OC-1',
          status: 'not-started',
          maturityLevel: 0
        }
      ],
      evidence: [],
      controlMappings: []
    });

    const html = generateNistCsfBoardReport();

    expect(html).toContain('Recommendations');
    expect(html).toContain('Priority:');
  });

  it('should format dates correctly in report', () => {
    (useGovernanceStore.getState as any).mockReturnValue({
      frameworks: [
        {
          id: 'nist-csf-2',
          name: 'NIST Cybersecurity Framework v2.0',
          version: '2.0',
          description: 'Test framework',
          status: 'active'
        }
      ],
      categories: [],
      controls: [],
      evidence: [],
      controlMappings: []
    });

    const html = generateNistCsfBoardReport();

    // Check for date formatting in meta section
    expect(html).toContain('Generated on');
  });

  it('should include print styles', () => {
    (useGovernanceStore.getState as any).mockReturnValue({
      frameworks: [
        {
          id: 'nist-csf-2',
          name: 'NIST Cybersecurity Framework v2.0',
          version: '2.0',
          description: 'Test framework',
          status: 'active'
        }
      ],
      categories: [],
      controls: [],
      evidence: [],
      controlMappings: []
    });

    const html = generateNistCsfBoardReport();

    expect(html).toContain('@media print');
  });

  it('should handle empty categories and controls gracefully', () => {
    (useGovernanceStore.getState as any).mockReturnValue({
      frameworks: [
        {
          id: 'nist-csf-2',
          name: 'NIST Cybersecurity Framework v2.0',
          version: '2.0',
          description: 'Test framework',
          status: 'active'
        }
      ],
      categories: [],
      controls: [],
      evidence: [],
      controlMappings: []
    });

    const html = generateNistCsfBoardReport();

    expect(html).toContain('Total Controls');
    expect(html).toContain('0'); // Should show 0 controls
  });
});

