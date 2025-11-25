import React from "react";
import { logError } from "../../lib/logger";

interface ErrorBoundaryState {
  hasError: boolean;
  error?: Error;
}

interface ErrorBoundaryProps {
  children: React.ReactNode;
  fallback?: React.ReactNode;
}

class ErrorBoundary extends React.Component<
  ErrorBoundaryProps,
  ErrorBoundaryState
> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo): void {
    logError("React component error boundary caught an error", {
      error: error.message,
      errorStack: error.stack,
      errorInfo,
    });
  }

  render() {
    if (this.state.hasError) {
      if (this.props.fallback) {
        return this.props.fallback;
      }

      return (
        <div className="min-h-screen flex items-center justify-center p-4 bg-gray-50 dark:bg-gray-900">
          <div className="max-w-md w-full p-6 border border-red-200 dark:border-red-800 rounded-lg bg-red-50 dark:bg-red-900/20 text-red-800 dark:text-red-200">
            <h2 className="text-xl font-semibold mb-2">Something went wrong</h2>
            <p className="text-sm mb-4">
              An unexpected error occurred. Please refresh the page. If the problem
              persists, contact support.
            </p>
            {this.state.error && (
              <details className="text-xs mt-4">
                <summary className="cursor-pointer mb-2">Error details</summary>
                <pre className="bg-red-100 dark:bg-red-900/40 p-2 rounded overflow-auto">
                  {this.state.error.toString()}
                </pre>
              </details>
            )}
            <button
              onClick={() => window.location.reload()}
              className="mt-4 px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition-colors"
            >
              Refresh Page
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
export { ErrorBoundary };
