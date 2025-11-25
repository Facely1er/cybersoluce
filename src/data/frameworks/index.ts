// Unified Framework Index
// Exports both CyberSoluce-style frameworks and ERMITS-style frameworks

// ERMITS-style frameworks (question-based) - these use sections -> categories -> questions structure
export { nistFramework } from "./nist";
export { iso27001Framework } from "./iso27001";
export { hipaaFramework } from "./hipaa";
export { cmmcFramework } from "./cmmc";
export { ferpaFramework } from "./ferpa";
export { privacyFramework } from "./privacy";
export { scrmFramework } from "./scrm";
export { hecvatFramework } from "./hecvat";
export { soc2Framework } from "./soc2";
export { pciDssFramework } from "./pci-dss";
export { nist800171Framework } from "./nist-800-171";
export { nistCSFv2Framework } from "./nist-csf-v2";

// Array of all ERMITS frameworks for easy iteration
import { nistFramework } from "./nist";
import { iso27001Framework } from "./iso27001";
import { hipaaFramework } from "./hipaa";
import { cmmcFramework } from "./cmmc";
import { ferpaFramework } from "./ferpa";
import { privacyFramework } from "./privacy";
import { scrmFramework } from "./scrm";
import { hecvatFramework } from "./hecvat";
import { soc2Framework } from "./soc2";
import { pciDssFramework } from "./pci-dss";
import { nist800171Framework } from "./nist-800-171";
import { nistCSFv2Framework } from "./nist-csf-v2";
import { Framework } from "../../types/ermits";

export const ermitsFrameworks: Framework[] = [
  nistFramework,
  nistCSFv2Framework, // NIST CSF v2.0 from NIST-Implementator
  iso27001Framework,
  hipaaFramework,
  cmmcFramework,
  ferpaFramework,
  privacyFramework,
  scrmFramework,
  hecvatFramework,
  soc2Framework,
  pciDssFramework,
  nist800171Framework,
];

// Alias for compatibility
export const frameworks = ermitsFrameworks;

// Helper to get framework by ID
export function getFrameworkById(id: string): Framework | undefined {
  return ermitsFrameworks.find(f => f.id === id);
}

// Helper to get all framework IDs
export function getAllFrameworkIds(): string[] {
  return ermitsFrameworks.map(f => f.id);
}
