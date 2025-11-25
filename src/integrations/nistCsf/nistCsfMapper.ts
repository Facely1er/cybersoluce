import { nistCSFv2Framework } from "../../data/frameworks";
import { Framework, Category, Control } from "../../types/cybersoluce";

/**
 * Map raw nistCSFv2Framework from NIST-Implementator
 * into CyberSoluce Framework + Category + Control structures.
 *
 * This creates:
 *  - A single Framework with id "nist-csf-2"
 *  - Categories: one per NIST CSF category
 *  - Controls: one per NIST CSF question/subcategory
 */
export function mapNistCsfToCyberSoluce(): {
  framework: Framework;
  categories: Category[];
  controls: Control[];
} {
  const raw = nistCSFv2Framework as any;
  const frameworkId = "nist-csf-2";
  
  const categories: Category[] = [];
  const controls: Control[] = [];
  const categoryIds: string[] = [];
  const controlIds: string[] = [];

  // Iterate through sections (functions)
  const sections = raw.sections ?? [];
  
  for (const section of sections) {
    const sectionId = section.id ?? "";
    const sectionName = section.name ?? "";
    const sectionCategories = section.categories ?? [];

    // Process each category within the section
    for (const category of sectionCategories) {
      const categoryId = `nist-${sectionId}-${category.id}`;
      const categoryName = category.name ?? "";
      const categoryDescription = category.description ?? "";
      
      // Create category
      categories.push({
        id: categoryId,
        name: categoryName,
        description: `${sectionName}: ${categoryDescription}`,
        frameworkId: frameworkId,
        controls: []
      });
      
      categoryIds.push(categoryId);

      // Process questions as controls
      const questions = category.questions ?? [];
      for (const question of questions) {
        const controlId = question.id ?? `nist-${sectionId}-${category.id}-${questions.indexOf(question)}`;
        const controlTitle = question.text ?? "";
        const controlGuidance = question.guidance ?? "";
        const controlPriority = mapPriority(question.priority ?? "medium");
        const controlDescription = buildControlDescription(question);

        // Create control
        controls.push({
          id: controlId,
          frameworkId: frameworkId,
          categoryId: categoryId,
          title: controlTitle,
          description: controlDescription,
          implementationGuidance: controlGuidance,
          priority: controlPriority,
          status: "not-started",
          mappings: [],
          evidence: [],
          maturityLevel: 1
        });

        controlIds.push(controlId);
        // Add control ID to category
        const catIndex = categories.findIndex(c => c.id === categoryId);
        if (catIndex >= 0) {
          categories[catIndex].controls.push(controlId);
        }
      }
    }
  }

  // Create the framework
  // Framework.categories and Framework.controls are arrays of Category and Control objects
  const framework: Framework = {
    id: frameworkId,
    name: raw.name ?? "NIST Cybersecurity Framework v2.0",
    version: raw.version ?? "2.0",
    description: raw.description ?? "",
    lastUpdated: raw.lastUpdated ? new Date(raw.lastUpdated) : new Date(),
    status: "active",
    region: "global",
    externalSource: "nist-csf-v2",
    origin: "nist-implementator",
    categories: categories,
    controls: controls
  };

  return {
    framework,
    categories,
    controls
  };
}

/**
 * Map NIST priority to CyberSoluce priority
 */
function mapPriority(priority: string): 'low' | 'medium' | 'high' | 'critical' {
  const normalized = priority.toLowerCase();
  if (normalized === 'critical') return 'critical';
  if (normalized === 'high') return 'high';
  if (normalized === 'low') return 'low';
  return 'medium';
}

/**
 * Build control description from question data
 */
function buildControlDescription(question: any): string {
  const parts: string[] = [];
  
  if (question.text) {
    parts.push(question.text);
  }
  
  if (question.guidance) {
    parts.push(`\n\nGuidance: ${question.guidance}`);
  }
  
  if (question.references && question.references.length > 0) {
    parts.push(`\n\nReferences: ${question.references.join(", ")}`);
  }
  
  if (question.examples && question.examples.length > 0) {
    parts.push(`\n\nExamples: ${question.examples.join("; ")}`);
  }

  return parts.join("");
}

