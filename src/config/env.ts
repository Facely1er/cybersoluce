export type RuntimeEnv = "development" | "staging" | "production";

function getRuntimeEnv(): RuntimeEnv {
  const mode = import.meta.env.MODE;
  if (mode === "production") return "production";
  if (mode === "staging") return "staging";
  return "development";
}

export const ENV = {
  runtime: getRuntimeEnv(),
  supabaseUrl: import.meta.env.VITE_SUPABASE_URL ?? "",
  supabaseAnonKey: import.meta.env.VITE_SUPABASE_ANON_KEY ?? "",
  backendMode:
    (import.meta.env.VITE_BACKEND_MODE as "local" | "supabase" | undefined) ??
    "local",
};

