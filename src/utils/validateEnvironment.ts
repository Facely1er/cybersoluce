/**
 * Environment validation utility
 * Validates required environment variables and provides helpful error messages
 */

import { ENV } from "../config/env";
import { logError, logWarn } from "../lib/logger";

interface ValidationResult {
  isValid: boolean;
  errors: string[];
  warnings: string[];
}

/**
 * Validates environment configuration
 * @returns Validation result with errors and warnings
 */
export function validateEnvironment(): ValidationResult {
  const errors: string[] = [];
  const warnings: string[] = [];

  // Check backend mode configuration
  if (ENV.backendMode === "supabase") {
    if (!ENV.supabaseUrl || !ENV.supabaseAnonKey) {
      errors.push(
        "Supabase backend mode is enabled but credentials are missing. " +
        "Set VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY in your .env file, " +
        "or set VITE_BACKEND_MODE=local to use localStorage backend."
      );
    } else {
      // Validate Supabase URL format
      try {
        new URL(ENV.supabaseUrl);
      } catch {
        errors.push(
          `Invalid Supabase URL format: ${ENV.supabaseUrl}. Expected format: https://your-project.supabase.co`
        );
      }

      // Validate anon key format (should be a JWT-like string)
      if (ENV.supabaseAnonKey.length < 100) {
        warnings.push(
          "Supabase anon key appears to be invalid. Ensure you're using the ANON key, not the service_role key."
        );
      }
    }
  }

  // Production environment checks
  if (ENV.runtime === "production") {
    if (!ENV.supabaseUrl && ENV.backendMode === "supabase") {
      errors.push(
        "Production mode requires Supabase configuration. " +
        "Set VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY for production deployment."
      );
    }

    // Warn about missing error tracking in production
    const sentryDsn = import.meta.env.VITE_SENTRY_DSN;
    if (!sentryDsn) {
      warnings.push(
        "Error tracking (Sentry) is not configured. " +
        "Consider setting VITE_SENTRY_DSN for production error monitoring."
      );
    }
  }

  // Log errors and warnings
  if (errors.length > 0) {
    errors.forEach((error) => logError("Environment validation error", { error }));
  }

  if (warnings.length > 0) {
    warnings.forEach((warning) => logWarn("Environment validation warning", { warning }));
  }

  return {
    isValid: errors.length === 0,
    errors,
    warnings,
  };
}

/**
 * Validates environment on app startup and shows user-friendly errors
 * Non-blocking - app will still load even with validation errors
 * Never throws - always uses fallbacks
 */
export function validateEnvironmentOnStartup(): void {
  try {
    const result = validateEnvironment();

    if (!result.isValid && result.errors.length > 0) {
      // Show user-friendly error message (non-blocking)
      const errorMessage = `
        ⚠️ Configuration Warning
        
        ${result.errors.join("\n\n")}
        
        The app will run with default settings. Some features may be limited.
        See ENV_VARIABLES.md for details.
      `;

      // Log to console only (non-blocking)
      console.warn(errorMessage);
    }

    // Log warnings (non-blocking)
    if (result.warnings.length > 0) {
      console.warn("Environment warnings:", result.warnings);
    }
  } catch (error) {
    // Catch any validation errors to prevent app from crashing
    // This should never happen, but we ensure the app always loads
    console.warn("Environment validation encountered an issue, continuing with defaults:", error);
  }
}

/**
 * Get environment status summary
 */
export function getEnvironmentStatus(): {
  backendMode: string;
  supabaseConfigured: boolean;
  isProduction: boolean;
  hasErrors: boolean;
} {
  const validation = validateEnvironment();
  
  return {
    backendMode: ENV.backendMode,
    supabaseConfigured: !!(ENV.supabaseUrl && ENV.supabaseAnonKey),
    isProduction: ENV.runtime === "production",
    hasErrors: !validation.isValid,
  };
}

