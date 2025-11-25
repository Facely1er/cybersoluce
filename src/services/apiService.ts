import { ENV } from "../config/env";
import { LocalBackend } from "./localBackend";
import { SupabaseBackend } from "./supabaseBackend";
import { IApiBackend } from "./apiBackend";
import {
  User,
  LoginCredentials,
  SignupCredentials,
  ApiResponse,
  AssessmentConfig,
  AssessmentRecord,
  Assessment,
} from "./apiService.types";

let backend: IApiBackend;

function getBackend(): IApiBackend {
  if (!backend) {
    backend =
      ENV.backendMode === "supabase" ? new SupabaseBackend() : new LocalBackend();
  }
  return backend;
}

// Re-export types for backward compatibility
export type {
  User,
  LoginCredentials,
  SignupCredentials,
  ApiResponse,
  AssessmentConfig,
  AssessmentRecord,
  Assessment,
};

// Export NIST CSF config constant
export const NIST_CSF_ASSESSMENT_CONFIG: AssessmentConfig = {
  domain: "nist-csf",
  name: "NIST CSF v2 Program Assessment",
  frameworks: ["nist-csf-2"],
  regions: ["global"],
  scope: {
    systems: [],
    locations: [],
  },
};

// Thin wrapper functions that maintain backward compatibility
const apiService = {
  login: (c: LoginCredentials) => getBackend().login(c),
  signup: (c: SignupCredentials) => getBackend().signup(c),
  logout: () => getBackend().logout(),
  getCurrentUser: () => getBackend().getCurrentUser(),
  createAssessment: (cfg: AssessmentConfig) => getBackend().createAssessment(cfg),
  getAssessments: async (): Promise<ApiResponse<Assessment[]>> => {
    const result = await getBackend().listAssessments();
    if (!result.success || !result.data) {
      return result as ApiResponse<Assessment[]>;
    }
    // Convert AssessmentRecord[] to Assessment[] for backward compatibility
    const assessments: Assessment[] = result.data.map((record) => {
      // Extract legacy fields from scores or use defaults
      const progress = record.progress ?? (record.scores?.progress as number) ?? 0;
      const score = record.score ?? (record.scores?.score as number) ?? 0;
      const frameworks = record.frameworks ?? record.config?.frameworks ?? [];
      const regions = record.regions ?? record.config?.regions ?? [];
      
      // Map status back to legacy format
      let status: Assessment["status"] = "inProgress";
      if (record.status === "completed") {
        status = "completed";
      } else if (record.status === "notStarted") {
        status = "notStarted";
      } else if (record.status === "in_progress") {
        status = "inProgress";
      }

      return {
        id: record.id,
        name: record.name,
        domain: record.domain,
        progress,
        score,
        status,
        lastUpdated: record.lastUpdated ?? record.updatedAt,
        userId: record.userId ?? "",
        frameworks,
        regions,
      };
    });
    return { success: true, data: assessments };
  },
  getAssessment: async (id: string): Promise<ApiResponse<Assessment>> => {
    const result = await getBackend().getAssessment(id);
    if (!result.success || !result.data) {
      return result as ApiResponse<Assessment>;
    }
    // Convert AssessmentRecord to Assessment for backward compatibility
    const record = result.data;
    
    // Extract legacy fields from scores or use defaults
    const progress = record.progress ?? (record.scores?.progress as number) ?? 0;
    const score = record.score ?? (record.scores?.score as number) ?? 0;
    const frameworks = record.frameworks ?? record.config?.frameworks ?? [];
    const regions = record.regions ?? record.config?.regions ?? [];
    
    // Map status back to legacy format
    let status: Assessment["status"] = "inProgress";
    if (record.status === "completed") {
      status = "completed";
    } else if (record.status === "notStarted") {
      status = "notStarted";
    } else if (record.status === "in_progress") {
      status = "inProgress";
    }

    const assessment: Assessment = {
      id: record.id,
      name: record.name,
      domain: record.domain,
      progress,
      score,
      status,
      lastUpdated: record.lastUpdated ?? record.updatedAt,
      userId: record.userId ?? "",
      frameworks,
      regions,
    };
    return { success: true, data: assessment };
  },
  updateAssessment: (id: string, upd: Partial<Assessment>) => {
    // Convert Assessment partial to AssessmentRecord partial
    // Exclude status, progress, score from spread since they need special handling
    const { status, progress, score, ...rest } = upd;
    const recordUpdates: Partial<AssessmentRecord> = {
      ...rest,
    };
    
    // Map status from Assessment format to AssessmentRecord format
    if (status) {
      if (status === "inProgress") {
        recordUpdates.status = "in_progress";
      } else if (status === "completed") {
        recordUpdates.status = "completed";
      } else if (status === "notStarted") {
        recordUpdates.status = "notStarted";
      }
    }
    
    // Map progress/score to scores object if provided
    if (progress !== undefined || score !== undefined) {
      recordUpdates.scores = {
        progress: progress ?? 0,
        score: score ?? 0,
      };
    }
    
    return getBackend().updateAssessment(id, recordUpdates);
  },
  deleteAssessment: (id: string) => getBackend().deleteAssessment(id),
  getUsedAssessments: () => getBackend().getUsedAssessments(),
};

export default apiService;
