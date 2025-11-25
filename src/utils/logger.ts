/**
 * Production-ready logging utility with multiple levels and contexts
 */

import { appConfig, isDevelopment, isProduction } from './environment';
import { addBreadcrumb } from './errorTracking';

export type LogLevel = 'debug' | 'info' | 'warn' | 'error' | 'critical';

export interface LogEntry {
  level: LogLevel;
  message: string;
  timestamp: string;
  context?: string;
  data?: Record<string, any>;
  stack?: string;
  sessionId?: string;
  userId?: string;
}

class Logger {
  private enabled: boolean;
  private logLevel: LogLevel;
  private sessionId: string;
  private context?: string;

  constructor(context?: string) {
    this.enabled = true;
    this.logLevel = this.getLogLevel();
    this.sessionId = this.generateSessionId();
    this.context = context;
  }

  private generateSessionId(): string {
    return `log_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
  }

  private getLogLevel(): LogLevel {
    const envLevel = import.meta.env.VITE_LOG_LEVEL as LogLevel;
    if (envLevel) return envLevel;
    
    return isDevelopment() ? 'debug' : 'error';
  }

  private shouldLog(level: LogLevel): boolean {
    if (!this.enabled) return false;

    const levels: Record<LogLevel, number> = {
      debug: 0,
      info: 1,
      warn: 2,
      error: 3,
      critical: 4
    };

    return levels[level] >= levels[this.logLevel];
  }

  private formatMessage(level: LogLevel, message: string, data?: Record<string, any>): string {
    const timestamp = new Date().toISOString();
    const contextStr = this.context ? `[${this.context}] ` : '';
    const dataStr = data ? ` ${JSON.stringify(data)}` : '';
    
    return `[${timestamp}] ${level.toUpperCase()} ${contextStr}${message}${dataStr}`;
  }

  private createLogEntry(level: LogLevel, message: string, data?: Record<string, any>, error?: Error): LogEntry {
    return {
      level,
      message,
      timestamp: new Date().toISOString(),
      context: this.context,
      data,
      stack: error?.stack,
      sessionId: this.sessionId,
      userId: this.getCurrentUserId()
    };
  }

  private getCurrentUserId(): string | undefined {
    try {
      const authToken = localStorage.getItem(appConfig.auth.tokenStorageKey);
      if (authToken) {
        const payload = JSON.parse(atob(authToken.split('.')[1]));
        return payload.sub || payload.userId;
      }
    } catch {
      // Ignore errors
    }
    return undefined;
  }

  private sendToRemote(entry: LogEntry): void {
    if (!isProduction()) return;

    const endpoint = import.meta.env.VITE_LOG_ENDPOINT;
    if (!endpoint) return;

    // Send asynchronously without waiting
    fetch(endpoint, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        ...entry,
        environment: appConfig.environment,
        version: appConfig.version,
        url: window.location.href,
        userAgent: navigator.userAgent
      })
    }).catch(() => {
      // Silently fail to avoid infinite loops
    });
  }

  debug(message: string, data?: Record<string, any>): void {
    if (!this.shouldLog('debug')) return;

    const formatted = this.formatMessage('debug', message, data);
    console.debug(formatted);

    const entry = this.createLogEntry('debug', message, data);
    this.sendToRemote(entry);

    // Add breadcrumb for debugging context
    addBreadcrumb('debug', message, 'info', data);
  }

  info(message: string, data?: Record<string, any>): void {
    if (!this.shouldLog('info')) return;

    const formatted = this.formatMessage('info', message, data);
    console.info(formatted);

    const entry = this.createLogEntry('info', message, data);
    this.sendToRemote(entry);

    addBreadcrumb('info', message, 'info', data);
  }

  warn(message: string, data?: Record<string, any>): void {
    if (!this.shouldLog('warn')) return;

    const formatted = this.formatMessage('warn', message, data);
    console.warn(formatted);

    const entry = this.createLogEntry('warn', message, data);
    this.sendToRemote(entry);

    addBreadcrumb('warning', message, 'warning', data);
  }

  error(message: string, error?: Error, data?: Record<string, any>): void {
    if (!this.shouldLog('error')) return;

    const formatted = this.formatMessage('error', message, { ...data, error: error?.message });
    console.error(formatted, error);

    const entry = this.createLogEntry('error', message, { ...data, error: error?.message }, error);
    this.sendToRemote(entry);

    addBreadcrumb('error', message, 'error', { ...data, error: error?.message });
  }

  critical(message: string, error?: Error, data?: Record<string, any>): void {
    if (!this.shouldLog('critical')) return;

    const formatted = this.formatMessage('critical', message, { ...data, error: error?.message });
    console.error('🚨 CRITICAL:', formatted, error);

    const entry = this.createLogEntry('critical', message, { ...data, error: error?.message }, error);
    this.sendToRemote(entry);

    addBreadcrumb('critical', message, 'error', { ...data, error: error?.message });

    // For critical errors, also send to error tracking
    if (error) {
      import('./errorTracking').then(({ captureError }) => {
        captureError(error, { 
          severity: 'critical',
          context: this.context,
          ...data 
        });
      });
    }
  }

  // Performance logging
  time(label: string): void {
    if (isDevelopment()) {
      console.time(label);
    }
  }

  timeEnd(label: string, data?: Record<string, any>): void {
    if (isDevelopment()) {
      console.timeEnd(label);
    }

    this.info(`Performance: ${label} completed`, data);
  }

  // Group logging for related operations
  group(label: string): void {
    if (isDevelopment()) {
      console.group(label);
    }
    this.debug(`Group started: ${label}`);
  }

  groupEnd(): void {
    if (isDevelopment()) {
      console.groupEnd();
    }
    this.debug('Group ended');
  }

  // Create a child logger with additional context
  child(context: string): Logger {
    const childContext = this.context ? `${this.context}:${context}` : context;
    return new Logger(childContext);
  }

  // Disable/enable logging
  setEnabled(enabled: boolean): void {
    this.enabled = enabled;
  }

  // Change log level dynamically
  setLogLevel(level: LogLevel): void {
    this.logLevel = level;
  }
}

// Create default logger
const defaultLogger = new Logger();

// Export convenience functions
export const debug = (message: string, data?: Record<string, any>) => defaultLogger.debug(message, data);
export const info = (message: string, data?: Record<string, any>) => defaultLogger.info(message, data);
export const warn = (message: string, data?: Record<string, any>) => defaultLogger.warn(message, data);
export const error = (message: string, err?: Error, data?: Record<string, any>) => defaultLogger.error(message, err, data);
export const critical = (message: string, err?: Error, data?: Record<string, any>) => defaultLogger.critical(message, err, data);
export const time = (label: string) => defaultLogger.time(label);
export const timeEnd = (label: string, data?: Record<string, any>) => defaultLogger.timeEnd(label, data);
export const group = (label: string) => defaultLogger.group(label);
export const groupEnd = () => defaultLogger.groupEnd();

// Compatibility exports for code expecting logError/logInfo/logWarn from utils/logger
export const logError = (message: string, error?: unknown) => {
  if (error instanceof Error) {
    defaultLogger.error(message, error);
  } else {
    defaultLogger.error(message, undefined, error as Record<string, any>);
  }
};

export const logInfo = (message: string, data?: unknown) => {
  defaultLogger.info(message, data as Record<string, any>);
};

export const logWarn = (message: string, data?: unknown) => {
  defaultLogger.warn(message, data as Record<string, any>);
};

// Export Logger class for custom instances
export { Logger };

// Export default logger instance
export default defaultLogger;