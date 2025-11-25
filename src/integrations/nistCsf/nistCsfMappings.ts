import { ControlMapping } from "../../types/cybersoluce";

/**
 * Seed mappings between NIST CSF v2 controls and other frameworks.
 * 
 * NOTE: This is a starter set only.
 * DO NOT claim full coverage; expand gradually and deliberately.
 */
export const seedNistCsfControlMappings: ControlMapping[] = [
  {
    id: "map-nist-id-am-01-iso-27001",
    sourceControlId: "id.am-01",
    sourceFrameworkId: "nist-csf-2",
    targetControlId: "iso-27001-A.8.1.1",
    targetFrameworkId: "iso_27001",
    strength: "strong",
    rationale: "Both require maintaining an inventory of physical assets and systems.",
  },
  {
    id: "map-nist-pr-aa-01-nist-800-171",
    sourceControlId: "pr.aa-01",
    sourceFrameworkId: "nist-csf-2",
    targetControlId: "nist-800-171-3.1.1",
    targetFrameworkId: "nist_800_171",
    strength: "strong",
    rationale: "Both require comprehensive identity and access management with lifecycle management.",
  },
  {
    id: "map-nist-gv-oc-01-iso-27001",
    sourceControlId: "gv.oc-01",
    sourceFrameworkId: "nist-csf-2",
    targetControlId: "iso-27001-A.5.1.1",
    targetFrameworkId: "iso_27001",
    strength: "partial",
    rationale: "Both address organizational context and cybersecurity strategy, but ISO 27001 focuses more on ISMS policies.",
  },
  {
    id: "map-nist-pr-ds-01-hipaa",
    sourceControlId: "pr.ds-01",
    sourceFrameworkId: "nist-csf-2",
    targetControlId: "hipaa-164.312.a.2.iv",
    targetFrameworkId: "hipaa",
    strength: "related",
    rationale: "Both address data protection, but HIPAA specifically focuses on PHI encryption requirements.",
  },
  {
    id: "map-nist-de-cm-01-soc2",
    sourceControlId: "de.cm-01",
    sourceFrameworkId: "nist-csf-2",
    targetControlId: "soc2-CC6.1",
    targetFrameworkId: "soc2",
    strength: "partial",
    rationale: "Both require monitoring and detection capabilities, but SOC 2 focuses on logical access monitoring.",
  },
];

