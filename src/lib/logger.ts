import { ENV } from "../config/env";

/**
 * Lazy-load Sentry for error tracking
 * Sentry is initialized in main.tsx, but we import it here for logger integration
 */
let SentryModule: typeof import('@sentry/react') | null = null;

/**
 * Get Sentry module if available and initialized
 */
async function getSentry(): Promise<typeof import('@sentry/react') | null> {
  // Only try to load Sentry in production
  if (ENV.runtime !== "production") {
    return null;
  }

  // Check if Sentry DSN is configured
  if (!import.meta.env.VITE_SENTRY_DSN) {
    return null;
  }

  // Return cached module if already loaded
  if (SentryModule) {
    return SentryModule;
  }

  try {
    // Dynamically import Sentry (it's already initialized in main.tsx)
    SentryModule = await import('@sentry/react');
    return SentryModule;
  } catch (error) {
    // Sentry not available - fail silently
    return null;
  }
}

export function logInfo(message: string, data?: unknown) {
  if (ENV.runtime === "development") {
    console.info("[CyberSoluce][INFO]", message, data ?? "");
  }
  
  // Send to Sentry in production if available (async, non-blocking)
  if (ENV.runtime === "production") {
    getSentry().then((Sentry) => {
      if (Sentry) {
        Sentry.addBreadcrumb({
          message,
          level: 'info',
          data: data ? { data } : undefined,
        });
      }
    }).catch(() => {
      // Silently fail - Sentry not available
    });
  }
}

export function logError(message: string, error?: unknown) {
  console.error("[CyberSoluce][ERROR]", message, error ?? "");
  
  // Send to Sentry in production if available (async, non-blocking)
  if (ENV.runtime === "production") {
    getSentry().then((Sentry) => {
      if (Sentry) {
        if (error instanceof Error) {
          Sentry.captureException(error, {
            tags: { source: 'logger' },
            extra: { message },
          });
        } else {
          Sentry.captureMessage(message, {
            level: 'error',
            tags: { source: 'logger' },
            extra: { error },
          });
        }
      }
    }).catch(() => {
      // Silently fail - Sentry not available
    });
  }
}

export function logWarn(message: string, data?: unknown) {
  if (ENV.runtime === "development" || ENV.runtime === "staging") {
    console.warn("[CyberSoluce][WARN]", message, data ?? "");
  }
  
  // Send to Sentry in production if available (async, non-blocking)
  if (ENV.runtime === "production") {
    getSentry().then((Sentry) => {
      if (Sentry) {
        Sentry.addBreadcrumb({
          message,
          level: 'warning',
          data: data ? { data } : undefined,
        });
      }
    }).catch(() => {
      // Silently fail - Sentry not available
    });
  }
}

