/**
 * Tests for Governance Store - Control Mappings and Evidence
 */

import { describe, it, expect, beforeEach, vi } from 'vitest';
import { useGovernanceStore } from '../governanceStore';
import { ControlMapping, Evidence } from '../../types/cybersoluce';

describe('Governance Store - Control Mappings', () => {
  beforeEach(() => {
    // Reset store state
    useGovernanceStore.setState({
      controlMappings: [],
      evidence: [],
      frameworks: [],
      controls: []
    });
  });

  describe('Control Mappings', () => {
    it('should add control mapping', () => {
      const mapping: Omit<ControlMapping, 'id'> = {
        sourceFrameworkId: 'nist-csf-2',
        sourceControlId: 'GV.OC-1',
        targetFrameworkId: 'iso27001',
        targetControlId: 'A.5.1.1',
        strength: 'strong',
        notes: 'Direct mapping'
      };

      useGovernanceStore.getState().addControlMapping(mapping);

      const mappings = useGovernanceStore.getState().controlMappings;
      expect(mappings.length).toBe(1);
      expect(mappings[0].sourceControlId).toBe('GV.OC-1');
      expect(mappings[0].targetControlId).toBe('A.5.1.1');
      expect(mappings[0].strength).toBe('strong');
    });

    it('should get mappings for a specific control', () => {
      // Add multiple mappings
      useGovernanceStore.getState().addControlMapping({
        sourceFrameworkId: 'nist-csf-2',
        sourceControlId: 'GV.OC-1',
        targetFrameworkId: 'iso27001',
        targetControlId: 'A.5.1.1',
        strength: 'strong',
        notes: 'Mapping 1'
      });

      useGovernanceStore.getState().addControlMapping({
        sourceFrameworkId: 'nist-csf-2',
        sourceControlId: 'GV.OC-1',
        targetFrameworkId: 'cmmc',
        targetControlId: 'AC.L2-3.1.1',
        strength: 'partial',
        notes: 'Mapping 2'
      });

      useGovernanceStore.getState().addControlMapping({
        sourceFrameworkId: 'nist-csf-2',
        sourceControlId: 'PR.AC-1',
        targetFrameworkId: 'iso27001',
        targetControlId: 'A.9.1.1',
        strength: 'strong',
        notes: 'Mapping 3'
      });

      const mappings = useGovernanceStore.getState().getMappingsForControl('GV.OC-1');

      expect(mappings.length).toBe(2);
      expect(mappings.every(m => m.sourceControlId === 'GV.OC-1')).toBe(true);
    });

    it('should return empty array when no mappings exist for control', () => {
      const mappings = useGovernanceStore.getState().getMappingsForControl('non-existent-control');

      expect(mappings).toEqual([]);
    });

    it('should handle mappings with different strength levels', () => {
      const strengths: ControlMapping['strength'][] = ['strong', 'partial', 'related'];

      strengths.forEach((strength, index) => {
        useGovernanceStore.getState().addControlMapping({
          sourceFrameworkId: 'nist-csf-2',
          sourceControlId: `GV.OC-${index + 1}`,
          targetFrameworkId: 'iso27001',
          targetControlId: `A.5.1.${index + 1}`,
          strength,
          notes: `Mapping ${index + 1}`
        });
      });

      const mappings = useGovernanceStore.getState().controlMappings;
      expect(mappings.length).toBe(3);
      expect(mappings.map(m => m.strength)).toEqual(expect.arrayContaining(['strong', 'partial', 'related']));
    });
  });

  describe('Evidence Management', () => {
    it('should add evidence', () => {
      const evidenceData: Omit<Evidence, 'id' | 'addedAt'> = {
        controlId: 'control-123',
        frameworkId: 'nist-csf-2',
        title: 'Access Control Policy',
        description: 'Policy document',
        type: 'policy',
        location: '/policies/access-control.pdf',
        addedBy: 'user-123',
        tags: ['access-control']
      };

      useGovernanceStore.getState().addEvidence(evidenceData);

      const evidence = useGovernanceStore.getState().evidence;
      expect(evidence.length).toBe(1);
      expect(evidence[0].title).toBe('Access Control Policy');
      expect(evidence[0].controlId).toBe('control-123');
      expect(evidence[0].id).toBeDefined();
      expect(evidence[0].addedAt).toBeInstanceOf(Date);
    });

    it('should update evidence', () => {
      // Add evidence first
      const evidenceData: Omit<Evidence, 'id' | 'addedAt'> = {
        controlId: 'control-123',
        frameworkId: 'nist-csf-2',
        title: 'Original Title',
        type: 'policy',
        addedBy: 'user-123',
        tags: []
      };

      useGovernanceStore.getState().addEvidence(evidenceData);
      const evidenceId = useGovernanceStore.getState().evidence[0].id;

      // Update evidence
      useGovernanceStore.getState().updateEvidence(evidenceId, {
        title: 'Updated Title',
        description: 'Updated description'
      });

      const updatedEvidence = useGovernanceStore.getState().evidence.find(e => e.id === evidenceId);
      expect(updatedEvidence?.title).toBe('Updated Title');
      expect(updatedEvidence?.description).toBe('Updated description');
    });

    it('should remove evidence', () => {
      // Add evidence first
      const evidenceData: Omit<Evidence, 'id' | 'addedAt'> = {
        controlId: 'control-123',
        frameworkId: 'nist-csf-2',
        title: 'Test Evidence',
        type: 'policy',
        addedBy: 'user-123',
        tags: []
      };

      useGovernanceStore.getState().addEvidence(evidenceData);
      const evidenceId = useGovernanceStore.getState().evidence[0].id;

      // Remove evidence
      useGovernanceStore.getState().removeEvidence(evidenceId);

      const evidence = useGovernanceStore.getState().evidence;
      expect(evidence.length).toBe(0);
    });

    it('should filter evidence by control and framework', () => {
      // Add multiple evidence items
      useGovernanceStore.getState().addEvidence({
        controlId: 'control-123',
        frameworkId: 'nist-csf-2',
        title: 'Evidence 1',
        type: 'policy',
        addedBy: 'user-123',
        tags: []
      });

      useGovernanceStore.getState().addEvidence({
        controlId: 'control-123',
        frameworkId: 'nist-csf-2',
        title: 'Evidence 2',
        type: 'procedure',
        addedBy: 'user-123',
        tags: []
      });

      useGovernanceStore.getState().addEvidence({
        controlId: 'control-456',
        frameworkId: 'nist-csf-2',
        title: 'Evidence 3',
        type: 'policy',
        addedBy: 'user-123',
        tags: []
      });

      const evidence = useGovernanceStore.getState().evidence;
      const controlEvidence = evidence.filter(
        e => e.controlId === 'control-123' && e.frameworkId === 'nist-csf-2'
      );

      expect(controlEvidence.length).toBe(2);
      expect(controlEvidence.every(e => e.controlId === 'control-123')).toBe(true);
    });

    it('should handle different evidence types', () => {
      const types: Evidence['type'][] = ['policy', 'procedure', 'log', 'screenshot', 'ticket', 'other'];

      types.forEach((type, index) => {
        useGovernanceStore.getState().addEvidence({
          controlId: `control-${index}`,
          frameworkId: 'nist-csf-2',
          title: `Evidence ${index + 1}`,
          type,
          addedBy: 'user-123',
          tags: []
        });
      });

      const evidence = useGovernanceStore.getState().evidence;
      expect(evidence.length).toBe(6);
      expect(evidence.map(e => e.type)).toEqual(expect.arrayContaining(types));
    });
  });

  describe('Cross-Framework Mappings', () => {
    it('should support mappings between multiple frameworks', () => {
      const frameworks = [
        { id: 'nist-csf-2', name: 'NIST CSF 2.0' },
        { id: 'iso27001', name: 'ISO 27001' },
        { id: 'cmmc', name: 'CMMC 2.0' }
      ];

      frameworks.forEach(fw => {
        useGovernanceStore.getState().setFrameworks([...useGovernanceStore.getState().frameworks, fw as any]);
      });

      // Create mappings between frameworks
      useGovernanceStore.getState().addControlMapping({
        sourceFrameworkId: 'nist-csf-2',
        sourceControlId: 'GV.OC-1',
        targetFrameworkId: 'iso27001',
        targetControlId: 'A.5.1.1',
        strength: 'strong',
        notes: 'NIST to ISO mapping'
      });

      useGovernanceStore.getState().addControlMapping({
        sourceFrameworkId: 'nist-csf-2',
        sourceControlId: 'PR.AC-1',
        targetFrameworkId: 'cmmc',
        targetControlId: 'AC.L2-3.1.1',
        strength: 'partial',
        notes: 'NIST to CMMC mapping'
      });

      const mappings = useGovernanceStore.getState().controlMappings;
      expect(mappings.length).toBe(2);
      expect(mappings.some(m => m.targetFrameworkId === 'iso27001')).toBe(true);
      expect(mappings.some(m => m.targetFrameworkId === 'cmmc')).toBe(true);
    });
  });
});

