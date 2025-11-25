import { createClient, SupabaseClient } from "@supabase/supabase-js";
import { ENV } from "../config/env";

export const supabaseClient: SupabaseClient | null = (() => {
  if (!ENV.supabaseUrl || !ENV.supabaseAnonKey) {
    // In local/demo mode, we don't fail hard – we just return null.
    return null;
  }
  
  return createClient(ENV.supabaseUrl, ENV.supabaseAnonKey, {
    auth: {
      persistSession: true,
      autoRefreshToken: true,
      detectSessionInUrl: true,
      storage: typeof window !== "undefined" ? window.localStorage : undefined,
    },
  });
})();

