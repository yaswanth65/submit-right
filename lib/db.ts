import { fail } from "@/lib/http";
import { supabaseAdmin } from "@/lib/supabase";

export async function maybeSingle<T>(query: Promise<{ data: T | null; error: unknown }>) {
  const { data, error } = await query;
  if (error) {
    throw fail("Database query failed", 500, error);
  }
  return data;
}

export async function many<T>(query: Promise<{ data: T[] | null; error: unknown }>) {
  const { data, error } = await query;
  if (error) {
    throw fail("Database query failed", 500, error);
  }
  return data ?? [];
}
