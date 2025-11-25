/**
 * Assessment Templates
 * Industry-specific templates with pre-configured baseline responses
 */

export interface Template {
  id: string;
  name: string;
  description: string;
  frameworkId: string;
  industry: string;
  tags: string[];
  prefilledResponses: Record<string, number>;
  createdBy: string;
  createdAt: Date;
  isPublic: boolean;
}

export const templates: Template[] = [
  // Empty array for now - templates can be added later
  // Example structure:
  // {
  //   id: 'template-1',
  //   name: 'Financial Services NIST CSF',
  //   description: 'Pre-configured template for financial services organizations',
  //   frameworkId: 'nist',
  //   industry: 'Financial Services',
  //   tags: ['nist', 'financial', 'baseline'],
  //   prefilledResponses: {},
  //   createdBy: 'System',
  //   createdAt: new Date(),
  //   isPublic: true
  // }
];

