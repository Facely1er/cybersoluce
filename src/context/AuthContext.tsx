import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import apiService, { User, LoginCredentials, SignupCredentials, ApiResponse } from '../services/apiService';
import { supabaseClient } from '../lib/supabaseClient';
import { ENV } from '../config/env';

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
  login: (credentials: LoginCredentials) => Promise<ApiResponse<User>>;
  signup: (credentials: SignupCredentials) => Promise<ApiResponse<User>>;
  logout: () => Promise<void>;
  clearError: () => void;
}

const defaultContext: AuthContextType = {
  user: null,
  isAuthenticated: false,
  isLoading: true,
  error: null,
  login: () => Promise.resolve({ success: false, error: 'AuthContext not initialized' }),
  signup: () => Promise.resolve({ success: false, error: 'AuthContext not initialized' }),
  logout: () => Promise.resolve(),
  clearError: () => {},
};

const AuthContext = createContext<AuthContextType>(defaultContext);

export const useAuth = () => useContext(AuthContext);

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Check if there's a logged-in user on app startup
    const checkAuthStatus = async () => {
      try {
        const response = await apiService.getCurrentUser();
        if (response.success && response.data) {
          setUser(response.data);
        }
      } catch (error) {
        console.error('Error checking auth status:', error);
        setError('Failed to verify authentication status');
      } finally {
        setIsLoading(false);
      }
    };

    checkAuthStatus();

    // Listen to Supabase auth state changes (only if using Supabase backend)
    if (ENV.backendMode === 'supabase' && supabaseClient) {
      const {
        data: { subscription },
      } = supabaseClient.auth.onAuthStateChange(async (event, session) => {
        if (event === 'SIGNED_IN' && session) {
          // User signed in - fetch profile
          const response = await apiService.getCurrentUser();
          if (response.success && response.data) {
            setUser(response.data);
          }
        } else if (event === 'SIGNED_OUT') {
          // User signed out - clear user state
          setUser(null);
        } else if (event === 'TOKEN_REFRESHED' && session) {
          // Token refreshed - ensure user is still set
          const response = await apiService.getCurrentUser();
          if (response.success && response.data) {
            setUser(response.data);
          }
        }
      });

      return () => {
        subscription.unsubscribe();
      };
    }
  }, []);

  const login = async (credentials: LoginCredentials): Promise<ApiResponse<User>> => {
    setIsLoading(true);
    setError(null);
    
    try {
      const response = await apiService.login(credentials);
      
      if (response.success && response.data) {
        setUser(response.data);
        return response;
      } else {
        setError(response.error || 'Login failed');
        return response;
      }
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'An unexpected error occurred';
      setError(errorMessage);
      return { success: false, error: errorMessage };
    } finally {
      setIsLoading(false);
    }
  };

  const signup = async (credentials: SignupCredentials): Promise<ApiResponse<User>> => {
    setIsLoading(true);
    setError(null);
    
    try {
      const response = await apiService.signup(credentials);
      
      if (!response.success) {
        setError(response.error || 'Signup failed');
      }
      
      return response;
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'An unexpected error occurred';
      setError(errorMessage);
      return { success: false, error: errorMessage };
    } finally {
      setIsLoading(false);
    }
  };

  const logout = async (): Promise<void> => {
    setIsLoading(true);
    
    try {
      await apiService.logout();
      setUser(null);
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Logout failed';
      setError(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  const clearError = (): void => {
    setError(null);
  };

  const value = {
    user,
    isAuthenticated: !!user,
    isLoading,
    error,
    login,
    signup,
    logout,
    clearError,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};