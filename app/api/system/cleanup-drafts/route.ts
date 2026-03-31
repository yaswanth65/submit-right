import { ok } from "@/lib/http";
import { supabaseAdmin } from "@/lib/supabase";

export async function POST() {
  const now = new Date().toISOString();

  const { data } = await supabaseAdmin
    .from("documents")
    .delete()
    .eq("status", "draft")
    .lt("draft_expires_at", now)
    .select("id, document_title");

  return ok({
    deletedCount: data?.length ?? 0,
    deletedDrafts: data ?? []
  });
}
