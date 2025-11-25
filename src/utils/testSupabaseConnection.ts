/**
 * Utility function to test Supabase connection
 * Run this in browser console: testSupabaseConnection()
 * 
 * Usage:
 * import { testSupabaseConnection } from './utils/testSupabaseConnection';
 * testSupabaseConnection();
 */

import { supabaseClient } from "../lib/supabaseClient";
import { ENV } from "../config/env";

export async function testSupabaseConnection(): Promise<void> {
  console.log("🔍 Testing Supabase Connection...");
  console.log("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━");

  // Check environment configuration
  console.log("\n📋 Environment Configuration:");
  console.log(`  Backend Mode: ${ENV.backendMode}`);
  console.log(`  Supabase URL: ${ENV.supabaseUrl ? "✅ Set" : "❌ Missing"}`);
  console.log(`  Supabase Anon Key: ${ENV.supabaseAnonKey ? "✅ Set" : "❌ Missing"}`);

  if (!ENV.supabaseUrl || !ENV.supabaseAnonKey) {
    console.error("\n❌ Supabase credentials not configured!");
    console.log("   Create a .env file with VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY");
    return;
  }

  // Check Supabase client
  if (!supabaseClient) {
    console.error("\n❌ Supabase client is null!");
    return;
  }

  console.log("\n✅ Supabase client initialized");

  // Test connection
  try {
    console.log("\n🔌 Testing connection...");
    const { data, error } = await supabaseClient.from("cs_profiles").select("count").limit(1);

    if (error) {
      console.error("\n❌ Connection test failed:");
      console.error(`   Error: ${error.message}`);
      console.error(`   Code: ${error.code}`);
      console.error(`   Details: ${error.details}`);
      
      if (error.code === "PGRST116") {
        console.log("\n💡 Tip: The cs_profiles table might not exist.");
        console.log("   Run the schema in Supabase SQL Editor: supabase/schema.cybersoluce.sql");
      }
      return;
    }

    console.log("✅ Connection successful!");
    console.log("   Database is reachable and tables are accessible");

    // Test authentication state
    console.log("\n🔐 Testing authentication state...");
    const {
      data: { user },
      error: authError,
    } = await supabaseClient.auth.getUser();

    if (authError) {
      console.log(`   ⚠️  Auth check: ${authError.message}`);
      console.log("   (This is normal if no user is logged in)");
    } else if (user) {
      console.log(`   ✅ User authenticated: ${user.email}`);
    } else {
      console.log("   ℹ️  No user currently logged in");
    }

    // Test table access
    console.log("\n📊 Testing table access...");
    const tables = ["cs_profiles", "cs_assessments", "cs_evidence", "cs_control_mappings"];
    
    for (const table of tables) {
      try {
        const { error: tableError } = await supabaseClient
          .from(table)
          .select("*")
          .limit(0);
        
        if (tableError) {
          console.log(`   ❌ ${table}: ${tableError.message}`);
        } else {
          console.log(`   ✅ ${table}: Accessible`);
        }
      } catch (err) {
        console.log(`   ❌ ${table}: ${err instanceof Error ? err.message : "Unknown error"}`);
      }
    }

    console.log("\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━");
    console.log("✅ Supabase connection test complete!");
    console.log("\n💡 Next steps:");
    console.log("   1. Run the schema in Supabase SQL Editor if tables are missing");
    console.log("   2. Try signing up/logging in to test authentication");
    console.log("   3. Create an assessment to test data persistence");

  } catch (error) {
    console.error("\n❌ Unexpected error during connection test:");
    console.error(error);
  }
}

// Make it available globally for browser console testing
if (typeof window !== "undefined") {
  (window as any).testSupabaseConnection = testSupabaseConnection;
}

