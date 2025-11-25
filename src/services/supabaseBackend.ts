import { supabaseClient } from "../lib/supabaseClient";
import {
  User,
  LoginCredentials,
  SignupCredentials,
  ApiResponse,
  AssessmentConfig,
  AssessmentRecord,
} from "./apiService.types";
import { IApiBackend } from "./apiBackend";

function mapProfileRowToUser(row: any): User {
  return {
    id: row.id,
    email: row.email,
    firstName: row.first_name ?? "",
    lastName: row.last_name ?? "",
    organization: row.organization ?? "",
    userTier: (row.user_tier ?? "free") as User["userTier"],
    role: (row.role ?? "analyst") as User["role"],
    createdAt: row.created_at ?? new Date().toISOString(),
  };
}

function mapAssessmentRowToRecord(row: any): AssessmentRecord {
  const config = row.config as AssessmentConfig;
  // Extract legacy fields from config for backward compatibility
  const frameworks = config?.frameworks ?? row.frameworks ?? [];
  const regions = config?.regions ?? row.regions ?? [];
  
  return {
    id: row.id,
    config: config ?? {
      domain: row.domain,
      name: row.name,
      frameworks,
      regions,
    },
    domain: row.domain,
    name: row.name,
    status: (row.status ?? "in_progress") as AssessmentRecord["status"],
    scores: row.scores ?? undefined,
    createdAt: row.created_at,
    updatedAt: row.updated_at,
    userId: row.owner_id,
    // Legacy fields for backward compatibility
    progress: row.scores?.progress ?? 0,
    score: row.scores?.score ?? 0,
    lastUpdated: row.updated_at,
    frameworks,
    regions,
  };
}

export class SupabaseBackend implements IApiBackend {
  async login(credentials: LoginCredentials): Promise<ApiResponse<User>> {
    if (!supabaseClient) {
      return { success: false, error: "Supabase not configured" };
    }

    const { data, error } = await supabaseClient.auth.signInWithPassword({
      email: credentials.email,
      password: credentials.password,
    });

    if (error || !data.user) {
      return { success: false, error: error?.message ?? "Invalid credentials" };
    }

    const { data: profile, error: profileError } = await supabaseClient
      .from("cs_profiles")
      .select("*")
      .eq("id", data.user.id)
      .single();

    if (profileError || !profile) {
      return {
        success: false,
        error:
          profileError?.message ?? "Profile not found for authenticated user",
      };
    }

    return {
      success: true,
      data: mapProfileRowToUser(profile),
    };
  }

  async signup(credentials: SignupCredentials): Promise<ApiResponse<User>> {
    if (!supabaseClient) {
      return { success: false, error: "Supabase not configured" };
    }

    const { data, error } = await supabaseClient.auth.signUp({
      email: credentials.email,
      password: credentials.password,
      options: {
        data: {
          first_name: credentials.firstName,
          last_name: credentials.lastName,
          organization: credentials.organization,
        },
      },
    });

    if (error) {
      return { success: false, error: error.message ?? "Signup failed" };
    }

    // Handle email confirmation requirement
    if (!data.user) {
      return {
        success: false,
        error:
          "Please check your email to confirm your account before logging in.",
      };
    }

    const userId = data.user.id;

    const { data: profile, error: profileError } = await supabaseClient
      .from("cs_profiles")
      .insert({
        id: userId,
        email: credentials.email,
        first_name: credentials.firstName,
        last_name: credentials.lastName,
        organization: credentials.organization,
        user_tier: "free",
        role: "analyst",
      })
      .select("*")
      .single();

    if (profileError || !profile) {
      return {
        success: false,
        error: profileError?.message ?? "Failed to create profile",
      };
    }

    return {
      success: true,
      data: mapProfileRowToUser(profile),
    };
  }

  async logout(): Promise<ApiResponse<null>> {
    if (!supabaseClient) {
      return { success: false, error: "Supabase not configured" };
    }

    const { error } = await supabaseClient.auth.signOut();

    if (error) {
      return { success: false, error: error.message };
    }

    return { success: true };
  }

  async getCurrentUser(): Promise<ApiResponse<User | null>> {
    if (!supabaseClient) {
      return { success: false, error: "Supabase not configured" };
    }

    const {
      data: { user },
      error: authError,
    } = await supabaseClient.auth.getUser();

    if (authError || !user) {
      return { success: true, data: null };
    }

    const { data: profile, error: profileError } = await supabaseClient
      .from("cs_profiles")
      .select("*")
      .eq("id", user.id)
      .single();

    if (profileError || !profile) {
      return {
        success: false,
        error: profileError?.message ?? "Profile not found",
      };
    }

    return {
      success: true,
      data: mapProfileRowToUser(profile),
    };
  }

  async createAssessment(
    config: AssessmentConfig
  ): Promise<ApiResponse<AssessmentRecord>> {
    if (!supabaseClient) {
      return { success: false, error: "Supabase not configured" };
    }

    const {
      data: { user },
      error: authError,
    } = await supabaseClient.auth.getUser();

    if (authError || !user) {
      return { success: false, error: "Authentication required" };
    }

    // Check if this is a free user using their free assessment
    const { data: profile } = await supabaseClient
      .from("cs_profiles")
      .select("user_tier")
      .eq("id", user.id)
      .single();

    if (profile?.user_tier === "free" && config.domain !== "threat-intelligence") {
      return {
        success: false,
        error:
          "Free users can only access the CyberCaution domain. Please upgrade to access additional domains.",
      };
    }

    // Check if free user has already used their threat intelligence assessment
    if (profile?.user_tier === "free" && config.domain === "threat-intelligence") {
      const { data: existingAssessments } = await supabaseClient
        .from("cs_assessments")
        .select("id")
        .eq("owner_id", user.id)
        .eq("domain", "threat-intelligence");

      if (existingAssessments && existingAssessments.length > 0) {
        return {
          success: false,
          error:
            "You have already used your free CyberCaution assessment. Please upgrade to run additional assessments.",
        };
      }
    }

    const { data: assessment, error } = await supabaseClient
      .from("cs_assessments")
      .insert({
        owner_id: user.id,
        domain: config.domain,
        name: config.name,
        config: config,
        status: "in_progress",
        scores: {
          progress: 0,
          score: 0,
        },
      })
      .select("*")
      .single();

    if (error || !assessment) {
      return {
        success: false,
        error: error?.message ?? "Failed to create assessment",
      };
    }

    return {
      success: true,
      data: mapAssessmentRowToRecord(assessment),
    };
  }

  async listAssessments(): Promise<ApiResponse<AssessmentRecord[]>> {
    if (!supabaseClient) {
      return { success: false, error: "Supabase not configured" };
    }

    const {
      data: { user },
      error: authError,
    } = await supabaseClient.auth.getUser();

    if (authError || !user) {
      return { success: false, error: "Authentication required" };
    }

    const { data: assessments, error } = await supabaseClient
      .from("cs_assessments")
      .select("*")
      .eq("owner_id", user.id)
      .order("created_at", { ascending: false });

    if (error) {
      return {
        success: false,
        error: error.message ?? "Failed to fetch assessments",
      };
    }

    return {
      success: true,
      data: (assessments ?? []).map(mapAssessmentRowToRecord),
    };
  }

  async getAssessment(
    id: string
  ): Promise<ApiResponse<AssessmentRecord | null>> {
    if (!supabaseClient) {
      return { success: false, error: "Supabase not configured" };
    }

    const {
      data: { user },
      error: authError,
    } = await supabaseClient.auth.getUser();

    if (authError || !user) {
      return { success: false, error: "Authentication required" };
    }

    const { data: assessment, error } = await supabaseClient
      .from("cs_assessments")
      .select("*")
      .eq("id", id)
      .eq("owner_id", user.id)
      .single();

    if (error || !assessment) {
      return {
        success: false,
        error: error?.message ?? "Assessment not found",
      };
    }

    return {
      success: true,
      data: mapAssessmentRowToRecord(assessment),
    };
  }

  async updateAssessment(
    id: string,
    updates: Partial<AssessmentRecord>
  ): Promise<ApiResponse<AssessmentRecord>> {
    if (!supabaseClient) {
      return { success: false, error: "Supabase not configured" };
    }

    const {
      data: { user },
      error: authError,
    } = await supabaseClient.auth.getUser();

    if (authError || !user) {
      return { success: false, error: "Authentication required" };
    }

    // Build update object from AssessmentRecord partial
    const updateData: any = {
      updated_at: new Date().toISOString(),
    };

    if (updates.config) {
      updateData.config = updates.config;
    }
    if (updates.domain) {
      updateData.domain = updates.domain;
    }
    if (updates.name) {
      updateData.name = updates.name;
    }
    if (updates.status) {
      updateData.status = updates.status;
    }
    if (updates.scores) {
      updateData.scores = updates.scores;
    }

    // Handle legacy fields
    if (updates.progress !== undefined || updates.score !== undefined) {
      const { data: existing } = await supabaseClient
        .from("cs_assessments")
        .select("scores")
        .eq("id", id)
        .single();

      const currentScores = existing?.scores ?? {};
      updateData.scores = {
        ...currentScores,
        progress: updates.progress ?? currentScores.progress ?? 0,
        score: updates.score ?? currentScores.score ?? 0,
      };
    }

    const { data: assessment, error } = await supabaseClient
      .from("cs_assessments")
      .update(updateData)
      .eq("id", id)
      .eq("owner_id", user.id)
      .select("*")
      .single();

    if (error || !assessment) {
      return {
        success: false,
        error: error?.message ?? "Failed to update assessment",
      };
    }

    return {
      success: true,
      data: mapAssessmentRowToRecord(assessment),
    };
  }

  async deleteAssessment(id: string): Promise<ApiResponse<null>> {
    if (!supabaseClient) {
      return { success: false, error: "Supabase not configured" };
    }

    const {
      data: { user },
      error: authError,
    } = await supabaseClient.auth.getUser();

    if (authError || !user) {
      return { success: false, error: "Authentication required" };
    }

    const { error } = await supabaseClient
      .from("cs_assessments")
      .delete()
      .eq("id", id)
      .eq("owner_id", user.id);

    if (error) {
      return {
        success: false,
        error: error.message ?? "Failed to delete assessment",
      };
    }

    return { success: true };
  }

  async getUsedAssessments(): Promise<ApiResponse<Record<string, boolean>>> {
    if (!supabaseClient) {
      return { success: false, error: "Supabase not configured" };
    }

    const {
      data: { user },
      error: authError,
    } = await supabaseClient.auth.getUser();

    if (authError || !user) {
      return { success: false, error: "Authentication required" };
    }

    const { data: assessments, error } = await supabaseClient
      .from("cs_assessments")
      .select("domain")
      .eq("owner_id", user.id);

    if (error) {
      return {
        success: false,
        error: error.message ?? "Failed to fetch used assessments",
      };
    }

    // Build used assessments map
    const usedAssessments: Record<string, boolean> = {
      'threat-intelligence': false,
      'supply-chain-risk': false,
      'compliance-management': false,
      'training-awareness': false,
    };

    (assessments ?? []).forEach((assessment) => {
      const domain = assessment.domain;
      if (domain === "threat-intelligence" || domain === "ransomware") {
        usedAssessments['threat-intelligence'] = true;
      } else if (domain === "supply-chain-risk" || domain === "supply-chain") {
        usedAssessments['supply-chain-risk'] = true;
      } else if (domain === "compliance-management" || domain === "privacy") {
        usedAssessments['compliance-management'] = true;
      } else if (domain === "training-awareness" || domain === "sensitive-info" || domain === "cui") {
        usedAssessments['training-awareness'] = true;
      }
    });

    return {
      success: true,
      data: usedAssessments,
    };
  }
}
