// Security utilities for production deployment

export const SecurityConfig = {
  // Content Security Policy
  CSP: {
    'default-src': ["'self'"],
    'script-src': [
      "'self'",
      "'unsafe-inline'", // Required for Google Analytics and React hydration
      // Note: 'unsafe-eval' removed for production security (not needed for production builds)
      "https://www.googletagmanager.com",
      "https://www.google-analytics.com"
    ],
    'style-src': [
      "'self'",
      "'unsafe-inline'", // Required for styled-components and Tailwind
      "https://fonts.googleapis.com"
    ],
    'img-src': [
      "'self'",
      "data:",
      "https:",
      "https://images.pexels.com",
      "https://stackblitz.com"
    ],
    'font-src': [
      "'self'",
      "https://fonts.gstatic.com"
    ],
    'connect-src': [
      "'self'",
      "https://api.cybersoluce.com",
      "https://analytics.google.com",
      "https://www.google-analytics.com"
    ],
    'frame-ancestors': ["'none'"],
    'base-uri': ["'self'"],
    'object-src': ["'none'"]
  },

  // Security Headers
  headers: {
    'X-Frame-Options': 'DENY',
    'X-Content-Type-Options': 'nosniff',
    'X-XSS-Protection': '1; mode=block',
    'Referrer-Policy': 'strict-origin-when-cross-origin',
    'Permissions-Policy': 'geolocation=(), microphone=(), camera=()',
    'Strict-Transport-Security': 'max-age=31536000; includeSubDomains; preload'
  }
};

// Input sanitization utilities
export const sanitizeInput = (input: string): string => {
  return input
    .replace(/[<>]/g, '') // Remove potential HTML tags
    .replace(/javascript:/gi, '') // Remove javascript: protocols
    .replace(/on\w+=/gi, '') // Remove event handlers
    .trim();
};

export const validateEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email) && email.length <= 254;
};

export const validatePassword = (password: string): {
  isValid: boolean;
  errors: string[];
} => {
  const errors: string[] = [];
  
  if (password.length < 8) {
    errors.push('Password must be at least 8 characters long');
  }
  
  if (!/[A-Z]/.test(password)) {
    errors.push('Password must contain at least one uppercase letter');
  }
  
  if (!/[a-z]/.test(password)) {
    errors.push('Password must contain at least one lowercase letter');
  }
  
  if (!/\d/.test(password)) {
    errors.push('Password must contain at least one number');
  }
  
  if (!/[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(password)) {
    errors.push('Password must contain at least one special character');
  }

  return {
    isValid: errors.length === 0,
    errors
  };
};

// Rate limiting for API calls
export class RateLimiter {
  private attempts: Map<string, number[]> = new Map();

  isAllowed(key: string, maxAttempts: number = 5, windowMs: number = 60000): boolean {
    const now = Date.now();
    const attempts = this.attempts.get(key) || [];
    
    // Remove expired attempts
    const validAttempts = attempts.filter(time => now - time < windowMs);
    
    if (validAttempts.length >= maxAttempts) {
      return false;
    }
    
    // Add current attempt
    validAttempts.push(now);
    this.attempts.set(key, validAttempts);
    
    return true;
  }

  reset(key: string): void {
    this.attempts.delete(key);
  }
}

export const rateLimiter = new RateLimiter();

// Secure token storage
export const SecureStorage = {
  setItem: (key: string, value: string): void => {
    try {
      // In production, consider encrypting sensitive data
      localStorage.setItem(key, value);
    } catch (error) {
      console.error('Failed to store item securely:', error);
    }
  },

  getItem: (key: string): string | null => {
    try {
      return localStorage.getItem(key);
    } catch (error) {
      console.error('Failed to retrieve item securely:', error);
      return null;
    }
  },

  removeItem: (key: string): void => {
    try {
      localStorage.removeItem(key);
    } catch (error) {
      console.error('Failed to remove item securely:', error);
    }
  },

  clear: (): void => {
    try {
      localStorage.clear();
    } catch (error) {
      console.error('Failed to clear storage securely:', error);
    }
  }
};

// CSRF protection utilities
export const generateCSRFToken = (): string => {
  const array = new Uint8Array(32);
  crypto.getRandomValues(array);
  return Array.from(array, byte => byte.toString(16).padStart(2, '0')).join('');
};

export const validateCSRFToken = (token: string, expectedToken: string): boolean => {
  return token === expectedToken && token.length === 64;
};

// Content sanitization for rich text
export const sanitizeHTML = (html: string): string => {
  const allowedTags = ['p', 'br', 'strong', 'em', 'u', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'ul', 'ol', 'li'];
  const allowedAttributes = ['class', 'id'];
  
  // This is a basic implementation - in production, use a library like DOMPurify
  let sanitized = html;
  
  // Remove script tags
  sanitized = sanitized.replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '');
  
  // Remove dangerous event handlers
  sanitized = sanitized.replace(/on\w+="[^"]*"/gi, '');
  sanitized = sanitized.replace(/on\w+='[^']*'/gi, '');
  
  return sanitized;
};

// API request interceptor for security
export const secureApiRequest = async (
  url: string, 
  options: RequestInit = {}
): Promise<Response> => {
  // Add security headers
  const secureOptions: RequestInit = {
    ...options,
    mode: 'cors',
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
      'X-Requested-With': 'XMLHttpRequest',
      ...options.headers
    }
  };

  // Add CSRF token for state-changing requests
  if (options.method && ['POST', 'PUT', 'DELETE', 'PATCH'].includes(options.method.toUpperCase())) {
    const csrfToken = SecureStorage.getItem('csrf_token');
    if (csrfToken) {
      secureOptions.headers = {
        ...secureOptions.headers,
        'X-CSRF-Token': csrfToken
      };
    }
  }

  try {
    const response = await fetch(url, secureOptions);
    
    // Check for security-related response headers
    if (response.status === 429) {
      throw new Error('Rate limit exceeded. Please try again later.');
    }
    
    if (response.status === 403) {
      throw new Error('Access forbidden. Please check your permissions.');
    }
    
    return response;
  } catch (error) {
    // Log security-related errors
    if (error instanceof Error) {
      console.error(`Secure API request failed: ${error.message}`);
    }
    throw error;
  }
};