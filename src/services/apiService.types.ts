export type UserRole = "viewer" | "analyst" | "admin";

export interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  organization: string;
  userTier: "free" | "professional" | "enterprise";
  role: UserRole;
  createdAt: string;
}

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface SignupCredentials {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  organization: string;
}

export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
}

export interface Assessment {
  id: string;
  name: string;
  domain: string;
  progress: number;
  score: number;
  status: "notStarted" | "inProgress" | "completed";
  lastUpdated: string;
  userId: string;
  frameworks: string[];
  regions: string[];
}

export interface AssessmentConfig {
  domain: string;
  name: string;
  frameworks: string[];
  regions: string[];
  scope?: {
    systems: string[];
    locations: string[];
  };
  team?: string[];
}

export interface AssessmentRecord {
  id: string;
  config: AssessmentConfig;     // stored as JSONB in cs_assessments.config
  domain: string;
  name: string;
  status: "in_progress" | "completed" | "archived" | "notStarted"; // "notStarted" for backward compat
  scores?: Record<string, unknown>; // stored as JSONB in cs_assessments.scores
  createdAt: string;
  updatedAt: string;
  userId?: string; // Optional for backward compatibility, maps to owner_id in DB
  // Legacy fields for backward compatibility
  progress?: number;
  score?: number;
  lastUpdated?: string;
  frameworks?: string[];
  regions?: string[];
}

