-- Seed initial control mappings for CyberSoluce
-- Run this AFTER the main schema to populate cs_control_mappings table
-- This is optional - you can add more mappings as needed

-- Clear existing mappings (optional - comment out if you want to keep existing)
-- TRUNCATE TABLE public.cs_control_mappings;

-- Insert sample NIST CSF to other framework mappings
INSERT INTO public.cs_control_mappings (
  source_control_id,
  source_framework_id,
  target_control_id,
  target_framework_id,
  strength,
  rationale
) VALUES
  -- NIST CSF ID.AM-01 to ISO 27001
  (
    'id.am-01',
    'nist-csf-2',
    'iso-27001-A.8.1.1',
    'iso_27001',
    'strong',
    'Both require maintaining an inventory of physical assets and systems.'
  ),
  -- NIST CSF PR.AA-01 to NIST 800-171
  (
    'pr.aa-01',
    'nist-csf-2',
    'nist-800-171-3.1.1',
    'nist_800_171',
    'strong',
    'Both require comprehensive identity and access management with lifecycle management.'
  ),
  -- NIST CSF GV.OC-01 to ISO 27001
  (
    'gv.oc-01',
    'nist-csf-2',
    'iso-27001-A.5.1.1',
    'iso_27001',
    'partial',
    'Both address organizational context and cybersecurity strategy, but ISO 27001 focuses more on ISMS policies.'
  ),
  -- NIST CSF PR.DS-01 to HIPAA
  (
    'pr.ds-01',
    'nist-csf-2',
    'hipaa-164.312.a.2.iv',
    'hipaa',
    'related',
    'Both address data protection, but HIPAA specifically focuses on PHI encryption requirements.'
  ),
  -- NIST CSF DE.CM-01 to SOC 2
  (
    'de.cm-01',
    'nist-csf-2',
    'soc2-CC6.1',
    'soc2',
    'partial',
    'Both require monitoring and detection capabilities, but SOC 2 focuses on logical access monitoring.'
  )
ON CONFLICT DO NOTHING;

-- Verify mappings were inserted
SELECT 
  source_control_id,
  source_framework_id,
  target_control_id,
  target_framework_id,
  strength
FROM public.cs_control_mappings
ORDER BY created_at DESC;

