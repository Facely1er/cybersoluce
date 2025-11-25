import {
  User,
  LoginCredentials,
  SignupCredentials,
  ApiResponse,
  AssessmentConfig,
  AssessmentRecord,
} from "./apiService.types";

export interface IApiBackend {
  login(credentials: LoginCredentials): Promise<ApiResponse<User>>;
  signup(credentials: SignupCredentials): Promise<ApiResponse<User>>;
  logout(): Promise<ApiResponse<null>>;
  getCurrentUser(): Promise<ApiResponse<User | null>>;

  createAssessment(config: AssessmentConfig): Promise<ApiResponse<AssessmentRecord>>;
  listAssessments(): Promise<ApiResponse<AssessmentRecord[]>>;
  getAssessment(id: string): Promise<ApiResponse<AssessmentRecord | null>>;
  updateAssessment(
    id: string,
    updates: Partial<AssessmentRecord>
  ): Promise<ApiResponse<AssessmentRecord>>;
  deleteAssessment(id: string): Promise<ApiResponse<null>>;
  getUsedAssessments(): Promise<ApiResponse<Record<string, boolean>>>;
}

