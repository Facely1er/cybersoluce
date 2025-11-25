import { complianceFrameworks } from "../data/complianceFrameworks.source";
import { Framework } from "../../../types/cybersoluce";

/**
 * Map ERMITS-AUDITOR "complianceFrameworks" entries
 * into the CyberSoluce Framework type.
 *
 * NOTE:
 *  - This is metadata-level only (no deep control catalogs yet).
 *  - Controls array will be empty for now.
 */
export function mapErmitsFrameworksToCyberSoluce(): Framework[] {
  return Object.entries(complianceFrameworks).map(([id, fw]: [string, any]) => {
    const name = fw?.name ?? id;
    const version = fw?.version ?? "1.0";
    const description = fw?.description ?? "";
    const lastUpdated =
      fw?.releaseDate ? new Date(fw.releaseDate) : new Date();

    return {
      id,
      name,
      version,
      description,
      lastUpdated,
      status: "active" as const,
      region: "global" as const,
      // Minimal viable fields
      categories: [],
      controls: [],
      // Optional metadata
      origin: "ermits-auditor" as const,
    } as Framework;
  });
}

