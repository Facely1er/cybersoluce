import { v4 as uuidv4 } from "uuid";
import {
  User,
  LoginCredentials,
  SignupCredentials,
  ApiResponse,
  AssessmentConfig,
  AssessmentRecord,
} from "./apiService.types";
import { IApiBackend } from "./apiBackend";

// Mock data storage
const STORAGE_KEYS = {
  USERS: "cybersoluceUsers",
  CURRENT_USER: "cybersoluceCurrentUser",
  ASSESSMENTS: "cybersoluceAssessments",
  USED_ASSESSMENTS: "cybersoluceUsedAssessments",
};

// Environment detection for demo features
const isDevelopment = () => {
  return (
    import.meta.env.DEV ||
    window.location.hostname === "localhost" ||
    window.location.hostname === "127.0.0.1"
  );
};

// Helper functions
const getFromStorage = <T>(key: string, defaultValue: T): T => {
  const storedData = localStorage.getItem(key);
  return storedData ? JSON.parse(storedData) : defaultValue;
};

const saveToStorage = (key: string, data: any): void => {
  localStorage.setItem(key, JSON.stringify(data));
};

// Simulated delay to mimic network request
const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

// Convert Assessment to AssessmentRecord
const assessmentToRecord = (assessment: any, config?: AssessmentConfig): AssessmentRecord => {
  const assessmentConfig = config ?? {
    domain: assessment.domain,
    name: assessment.name,
    frameworks: assessment.frameworks ?? [],
    regions: assessment.regions ?? [],
  };

  // Map status from legacy format to new format
  let status: AssessmentRecord["status"] = "in_progress";
  if (assessment.status === "completed") {
    status = "completed";
  } else if (assessment.status === "notStarted") {
    status = "notStarted"; // Keep for backward compat
  } else if (assessment.status === "inProgress") {
    status = "in_progress";
  }

  return {
    id: assessment.id,
    config: assessmentConfig,
    domain: assessment.domain,
    name: assessment.name,
    status,
    scores: {
      progress: assessment.progress ?? 0,
      score: assessment.score ?? 0,
    },
    createdAt: assessment.createdAt || assessment.lastUpdated || new Date().toISOString(),
    updatedAt: assessment.lastUpdated || assessment.createdAt || new Date().toISOString(),
    userId: assessment.userId,
    // Legacy fields for backward compatibility
    progress: assessment.progress,
    score: assessment.score,
    lastUpdated: assessment.lastUpdated,
    frameworks: assessment.frameworks,
    regions: assessment.regions,
  };
};

export class LocalBackend implements IApiBackend {
  async login(credentials: LoginCredentials): Promise<ApiResponse<User>> {
    try {
      await delay(800);

      const users = getFromStorage<User[]>(STORAGE_KEYS.USERS, []);
      let user = users.find((u) => u.email === credentials.email);

      // Special handling for demo user - only in development or demo environments
      if (
        user &&
        user.email === "demo@cybersoluce.com" &&
        (isDevelopment() || window.location.hostname.includes("demo"))
      ) {
        // Ensure demo user has a role
        if (!user.role) {
          user = { ...user, role: "analyst" };
          const userIndex = users.findIndex((u) => u.email === user!.email);
          if (userIndex !== -1) {
            users[userIndex] = user;
            saveToStorage(STORAGE_KEYS.USERS, users);
          }
        }
        saveToStorage(STORAGE_KEYS.CURRENT_USER, user);
        return { success: true, data: user };
      }

      // In a real implementation, we would check password hash
      if (!user) {
        return { success: false, error: "Invalid email or password" };
      }

      // Backward compatibility: add default role if missing
      if (!user.role) {
        user = { ...user, role: "analyst" };
        const userIndex = users.findIndex((u) => u.email === user!.email);
        if (userIndex !== -1) {
          users[userIndex] = user;
          saveToStorage(STORAGE_KEYS.USERS, users);
        }
      }

      // Store current user
      saveToStorage(STORAGE_KEYS.CURRENT_USER, user);

      return { success: true, data: user };
    } catch (error) {
      return { success: false, error: "An error occurred during login" };
    }
  }

  async signup(credentials: SignupCredentials): Promise<ApiResponse<User>> {
    try {
      await delay(1000);

      const users = getFromStorage<User[]>(STORAGE_KEYS.USERS, []);

      // Check if user already exists
      if (users.some((u) => u.email === credentials.email)) {
        return { success: false, error: "User with this email already exists" };
      }

      // Create new user with default role
      const newUser: User = {
        id: uuidv4(),
        email: credentials.email,
        firstName: credentials.firstName,
        lastName: credentials.lastName,
        organization: credentials.organization,
        userTier: "free", // Default to free tier
        role: "analyst", // Default role
        createdAt: new Date().toISOString(),
      };

      // Save user
      users.push(newUser);
      saveToStorage(STORAGE_KEYS.USERS, users);

      // Initialize used assessments for the user
      const usedAssessments = getFromStorage<Record<string, Record<string, boolean>>>(
        STORAGE_KEYS.USED_ASSESSMENTS,
        {}
      );
      usedAssessments[newUser.id] = {
        ransomware: false,
        supplyChain: false,
        privacy: false,
        sensitiveInfo: false,
      };
      saveToStorage(STORAGE_KEYS.USED_ASSESSMENTS, usedAssessments);

      return { success: true, data: newUser };
    } catch (error) {
      return { success: false, error: "An error occurred during signup" };
    }
  }

  async logout(): Promise<ApiResponse<null>> {
    try {
      await delay(300);
      localStorage.removeItem(STORAGE_KEYS.CURRENT_USER);
      return { success: true };
    } catch (error) {
      return { success: false, error: "An error occurred during logout" };
    }
  }

  async getCurrentUser(): Promise<ApiResponse<User | null>> {
    try {
      await delay(300);
      let currentUser = getFromStorage<User | null>(STORAGE_KEYS.CURRENT_USER, null);
      if (!currentUser) {
        return { success: false, error: "No user logged in" };
      }
      
      // Backward compatibility: add default role if missing
      if (!currentUser.role) {
        currentUser = { ...currentUser, role: "analyst" };
        // Update in storage
        const users = getFromStorage<User[]>(STORAGE_KEYS.USERS, []);
        const userIndex = users.findIndex((u) => u.id === currentUser!.id);
        if (userIndex !== -1) {
          users[userIndex] = currentUser;
          saveToStorage(STORAGE_KEYS.USERS, users);
        }
        saveToStorage(STORAGE_KEYS.CURRENT_USER, currentUser);
      }
      
      return { success: true, data: currentUser };
    } catch (error) {
      return { success: false, error: "An error occurred while fetching current user" };
    }
  }

  async createAssessment(config: AssessmentConfig): Promise<ApiResponse<AssessmentRecord>> {
    try {
      await delay(1000);

      const currentUser = getFromStorage<User | null>(STORAGE_KEYS.CURRENT_USER, null);

      if (!currentUser) {
        return { success: false, error: "Authentication required" };
      }

      // Check if this is a free user using their free assessment
      if (currentUser.userTier === "free" && config.domain !== "threat-intelligence") {
        return {
          success: false,
          error:
            "Free users can only access the CyberCaution domain. Please upgrade to access additional domains.",
        };
      }

      // Check if this free user has already used their threat intelligence assessment
      if (currentUser.userTier === "free" && config.domain === "threat-intelligence") {
        const usedAssessments = getFromStorage<Record<string, Record<string, boolean>>>(
          STORAGE_KEYS.USED_ASSESSMENTS,
          {}
        );

        if (usedAssessments[currentUser.id]?.["threat-intelligence"]) {
          return {
            success: false,
            error:
              "You have already used your free CyberCaution assessment. Please upgrade to run additional assessments.",
          };
        }

        // Mark the threat intelligence assessment as used
        if (!usedAssessments[currentUser.id]) {
          usedAssessments[currentUser.id] = {};
        }
        usedAssessments[currentUser.id]["threat-intelligence"] = true;
        saveToStorage(STORAGE_KEYS.USED_ASSESSMENTS, usedAssessments);
      }

      const now = new Date().toISOString();
      const newAssessment = {
        id: uuidv4(),
        name: config.name,
        domain: config.domain,
        progress: 0,
        score: 0,
        status: "notStarted" as const, // Legacy status for backward compat
        lastUpdated: now,
        createdAt: now,
        userId: currentUser.id,
        frameworks: config.frameworks,
        regions: config.regions,
      };

      // Save the new assessment
      const assessments = getFromStorage<any[]>(STORAGE_KEYS.ASSESSMENTS, []);
      assessments.push(newAssessment);
      saveToStorage(STORAGE_KEYS.ASSESSMENTS, assessments);

      const record = assessmentToRecord(newAssessment, config);
      return { success: true, data: record };
    } catch (error) {
      return { success: false, error: "An error occurred while creating the assessment" };
    }
  }

  async listAssessments(): Promise<ApiResponse<AssessmentRecord[]>> {
    try {
      await delay(800);

      const currentUser = getFromStorage<User | null>(STORAGE_KEYS.CURRENT_USER, null);

      if (!currentUser) {
        return { success: false, error: "Authentication required" };
      }

      const assessments = getFromStorage<any[]>(STORAGE_KEYS.ASSESSMENTS, []);
      const userAssessments = assessments
        .filter((a) => a.userId === currentUser.id)
        .map((a) => assessmentToRecord(a));

      return { success: true, data: userAssessments };
    } catch (error) {
      return { success: false, error: "An error occurred while fetching assessments" };
    }
  }

  async getAssessment(id: string): Promise<ApiResponse<AssessmentRecord | null>> {
    try {
      await delay(500);

      const currentUser = getFromStorage<User | null>(STORAGE_KEYS.CURRENT_USER, null);

      if (!currentUser) {
        return { success: false, error: "Authentication required" };
      }

      const assessments = getFromStorage<any[]>(STORAGE_KEYS.ASSESSMENTS, []);
      const assessment = assessments.find((a) => a.id === id && a.userId === currentUser.id);

      if (!assessment) {
        return { success: false, error: "Assessment not found" };
      }

      const record = assessmentToRecord(assessment);
      return { success: true, data: record };
    } catch (error) {
      return { success: false, error: "An error occurred while fetching the assessment" };
    }
  }

  async updateAssessment(
    id: string,
    updates: Partial<AssessmentRecord>
  ): Promise<ApiResponse<AssessmentRecord>> {
    try {
      await delay(800);

      const currentUser = getFromStorage<User | null>(STORAGE_KEYS.CURRENT_USER, null);

      if (!currentUser) {
        return { success: false, error: "Authentication required" };
      }

      const assessments = getFromStorage<any[]>(STORAGE_KEYS.ASSESSMENTS, []);
      const index = assessments.findIndex((a) => a.id === id && a.userId === currentUser.id);

      if (index === -1) {
        return { success: false, error: "Assessment not found" };
      }

      // Update the assessment
      const updatedAssessment = {
        ...assessments[index],
        ...updates,
        lastUpdated: new Date().toISOString(),
      };

      assessments[index] = updatedAssessment;
      saveToStorage(STORAGE_KEYS.ASSESSMENTS, assessments);

      const record = assessmentToRecord(updatedAssessment);
      return { success: true, data: record };
    } catch (error) {
      return { success: false, error: "An error occurred while updating the assessment" };
    }
  }

  async deleteAssessment(id: string): Promise<ApiResponse<null>> {
    try {
      await delay(700);

      const currentUser = getFromStorage<User | null>(STORAGE_KEYS.CURRENT_USER, null);

      if (!currentUser) {
        return { success: false, error: "Authentication required" };
      }

      const assessments = getFromStorage<any[]>(STORAGE_KEYS.ASSESSMENTS, []);
      const filteredAssessments = assessments.filter(
        (a) => !(a.id === id && a.userId === currentUser.id)
      );

      if (filteredAssessments.length === assessments.length) {
        return { success: false, error: "Assessment not found" };
      }

      saveToStorage(STORAGE_KEYS.ASSESSMENTS, filteredAssessments);

      return { success: true };
    } catch (error) {
      return { success: false, error: "An error occurred while deleting the assessment" };
    }
  }

  async getUsedAssessments(): Promise<ApiResponse<Record<string, boolean>>> {
    try {
      await delay(400);

      const currentUser = getFromStorage<User | null>(STORAGE_KEYS.CURRENT_USER, null);

      if (!currentUser) {
        return { success: false, error: "Authentication required" };
      }

      const usedAssessments = getFromStorage<Record<string, Record<string, boolean>>>(
        STORAGE_KEYS.USED_ASSESSMENTS,
        {}
      );

      // Initialize if not present
      if (!usedAssessments[currentUser.id]) {
        usedAssessments[currentUser.id] = {
          'threat-intelligence': false,
          'supply-chain-risk': false,
          'compliance-management': false,
          'training-awareness': false,
        };
        saveToStorage(STORAGE_KEYS.USED_ASSESSMENTS, usedAssessments);
      }

      return { success: true, data: usedAssessments[currentUser.id] };
    } catch (error) {
      return { success: false, error: "An error occurred while fetching used assessments" };
    }
  }
}

