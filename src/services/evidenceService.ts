import { ENV } from "../config/env";
import { supabaseClient } from "../lib/supabaseClient";
import { Evidence } from "../types/cybersoluce";
import { logError } from "../lib/logger";

/**
 * Save evidence to Supabase when backend mode is "supabase"
 * Returns null if Supabase is not configured or not in use
 */
export async function saveEvidenceToSupabase(
  e: Omit<Evidence, "id" | "addedAt" | "lastUpdatedAt">
): Promise<Evidence | null> {
  if (!supabaseClient || ENV.backendMode !== "supabase") {
    return null;
  }

  const { data: authData, error: authError } =
    await supabaseClient.auth.getUser();
  if (authError || !authData.user) {
    return null;
  }

  const now = new Date().toISOString();

  const { data, error } = await supabaseClient
    .from("cs_evidence")
    .insert({
      owner_id: authData.user.id,
      control_id: e.controlId,
      framework_id: e.frameworkId,
      title: e.title,
      description: e.description ?? null,
      type: e.type,
      location: e.location ?? null,
      tags: e.tags ?? [],
      created_at: now,
      updated_at: now,
    })
    .select("*")
    .single();

  if (error || !data) {
    logError("Failed to save evidence to Supabase", { error, controlId: e.controlId, frameworkId: e.frameworkId });
    return null;
  }

  return {
    id: data.id,
    controlId: data.control_id,
    frameworkId: data.framework_id,
    title: data.title,
    description: data.description ?? undefined,
    type: data.type as Evidence["type"],
    location: data.location ?? undefined,
    tags: data.tags ?? [],
    addedBy: authData.user.id,
    addedAt: new Date(data.created_at),
    lastUpdatedAt: new Date(data.updated_at),
  };
}

/**
 * Load evidence from Supabase for a specific control
 */
export async function loadEvidenceFromSupabase(
  controlId: string,
  frameworkId: string
): Promise<Evidence[]> {
  if (!supabaseClient || ENV.backendMode !== "supabase") {
    return [];
  }

  const { data: authData, error: authError } =
    await supabaseClient.auth.getUser();
  if (authError || !authData.user) {
    return [];
  }

  const { data, error } = await supabaseClient
    .from("cs_evidence")
    .select("*")
    .eq("control_id", controlId)
    .eq("framework_id", frameworkId)
    .order("created_at", { ascending: false });

  if (error || !data) {
    logError("Failed to load evidence from Supabase", { error, controlId, frameworkId });
    return [];
  }

  return data.map((row) => ({
    id: row.id,
    controlId: row.control_id,
    frameworkId: row.framework_id,
    title: row.title,
    description: row.description ?? undefined,
    type: row.type as Evidence["type"],
    location: row.location ?? undefined,
    tags: row.tags ?? [],
    addedBy: row.owner_id,
    addedAt: new Date(row.created_at),
    lastUpdatedAt: row.updated_at ? new Date(row.updated_at) : undefined,
  }));
}

/**
 * Delete evidence from Supabase
 */
export async function deleteEvidenceFromSupabase(
  evidenceId: string
): Promise<boolean> {
  if (!supabaseClient || ENV.backendMode !== "supabase") {
    return false;
  }

  const { data: authData, error: authError } =
    await supabaseClient.auth.getUser();
  if (authError || !authData.user) {
    return false;
  }

  const { error } = await supabaseClient
    .from("cs_evidence")
    .delete()
    .eq("id", evidenceId)
    .eq("owner_id", authData.user.id);

  if (error) {
    logError("Failed to delete evidence from Supabase", { error, evidenceId });
    return false;
  }

  return true;
}

