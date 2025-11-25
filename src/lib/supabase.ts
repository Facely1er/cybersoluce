import { createClient, SupabaseClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;
const storagePrefix = import.meta.env.VITE_LOCAL_STORAGE_PREFIX || 'cybersoluce';

let supabase: SupabaseClient | null = null;
let isSupabaseReady = false;

// Custom localStorage adapter for Supabase
const localStorageAdapter = {
  getItem: (key: string) => {
    try {
      return localStorage.getItem(`${storagePrefix}_${key}`);
    } catch (error) {
      console.warn('Failed to get item from localStorage:', error);
      return null;
    }
  },
  setItem: (key: string, value: string) => {
    try {
      localStorage.setItem(`${storagePrefix}_${key}`, value);
    } catch (error) {
      console.warn('Failed to set item in localStorage:', error);
    }
  },
  removeItem: (key: string) => {
    try {
      localStorage.removeItem(`${storagePrefix}_${key}`);
    } catch (error) {
      console.warn('Failed to remove item from localStorage:', error);
    }
  }
};

try {
  if (supabaseUrl && supabaseAnonKey && supabaseUrl !== '' && supabaseAnonKey !== '') {
    // Validate URL format before creating client
    try {
      new URL(supabaseUrl);
    } catch {
      throw new Error('Invalid Supabase URL format');
    }

    supabase = createClient(supabaseUrl, supabaseAnonKey, {
      auth: {
        autoRefreshToken: true,
        persistSession: true,
        detectSessionInUrl: true,
        storage: localStorageAdapter,
        storageKey: 'supabase.auth.token'
      },
      global: {
        headers: {
          'X-Client-Info': 'cybersoluce-platform@1.0.0'
        }
      },
      // Add timeout and retry configuration for better resilience
      db: {
        schema: 'public'
      },
      realtime: {
        params: {
          eventsPerSecond: 10
        }
      }
    });
    
    // Test connection with a simple health check (non-blocking)
    Promise.resolve(supabase.from('profiles').select('id').limit(1)).then(() => {
      isSupabaseReady = true;
      if (process.env.NODE_ENV === 'development') {
        console.log('Supabase client initialized successfully');
      }
    }).catch(() => {
      // Connection test failed - mark as not ready but don't crash
      console.warn('Supabase connection test failed, will use local fallback');
      isSupabaseReady = false;
    });
    
    // Set ready immediately for optimistic initialization
    isSupabaseReady = true;
  } else {
    if (process.env.NODE_ENV === 'development') {
      console.warn('Supabase environment variables not configured. Running in local-only mode.');
    }
  }
} catch (error) {
  // Supabase initialization failed - gracefully fall back to local mode
  console.warn('Failed to initialize Supabase client. Running in local-only mode.', error);
  supabase = null;
  isSupabaseReady = false;
}

export { supabase, isSupabaseReady };

// Auth helpers
export const signUp = async (email: string, password: string, metadata?: Record<string, unknown>) => {
  if (!isSupabaseReady || !supabase) {
    return { data: null, error: new Error('Authentication not available in local-only mode') };
  }
  
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: metadata
    }
  });
  return { data, error };
};

export const signIn = async (email: string, password: string) => {
  if (!isSupabaseReady || !supabase) {
    return { data: null, error: new Error('Authentication not available in local-only mode') };
  }
  
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password
  });
  return { data, error };
};

export const signOut = async () => {
  if (!isSupabaseReady || !supabase) {
    return { error: null };
  }
  
  const { error } = await supabase.auth.signOut();
  return { error };
};

export const getCurrentUser = async () => {
  if (!isSupabaseReady || !supabase) {
    return { user: null, error: null };
  }
  
  const { data: { user }, error } = await supabase.auth.getUser();
  return { user, error };
};

export const getCurrentSession = async () => {
  if (!isSupabaseReady || !supabase) {
    return { session: null, error: null };
  }
  
  const { data: { session }, error } = await supabase.auth.getSession();
  return { session, error };
};

// Profile helpers
export const getProfile = async (userId: string) => {
  if (!isSupabaseReady || !supabase) {
    return { data: null, error: new Error('Profile management not available in local-only mode') };
  }
  
  const { data, error } = await supabase
    .from('profiles')
    .select('*')
    .eq('id', userId)
    .single();
  return { data, error };
};

export const updateProfile = async (userId: string, updates: Record<string, unknown>) => {
  if (!isSupabaseReady || !supabase) {
    return { data: null, error: new Error('Profile management not available in local-only mode') };
  }
  
  const { data, error } = await supabase
    .from('profiles')
    .update(updates)
    .eq('id', userId)
    .select()
    .single();
  return { data, error };
};

// Assessment helpers
export const getAssessments = async (userId: string) => {
  if (!isSupabaseReady || !supabase) {
    return { data: [], error: null };
  }
  
  const { data, error } = await supabase
    .from('assessments')
    .select('*')
    .eq('user_id', userId)
    .order('updated_at', { ascending: false });
  return { data, error };
};

export const createAssessment = async (assessment: Record<string, unknown>) => {
  if (!isSupabaseReady || !supabase) {
    return { data: null, error: new Error('Assessment sync not available in local-only mode') };
  }
  
  const { data, error } = await supabase
    .from('assessments')
    .insert(assessment)
    .select()
    .single();
  return { data, error };
};

export const updateAssessment = async (assessmentId: string, updates: Record<string, unknown>) => {
  if (!isSupabaseReady || !supabase) {
    return { data: null, error: new Error('Assessment sync not available in local-only mode') };
  }
  
  const { data, error } = await supabase
    .from('assessments')
    .update(updates)
    .eq('id', assessmentId)
    .select()
    .single();
  return { data, error };
};

export const deleteAssessment = async (assessmentId: string) => {
  if (!isSupabaseReady || !supabase) {
    return { error: null };
  }
  
  const { error } = await supabase
    .from('assessments')
    .delete()
    .eq('id', assessmentId);
  return { error };
};

