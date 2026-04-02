import { ok } from "@/lib/http";
import { asResponse } from "@/lib/route";
import { requireRole } from "@/lib/auth";
import { supabaseAdmin } from "@/lib/supabase";

export async function GET() {
  try {
    const user = await requireRole("editor");
    const { data } = await supabaseAdmin
      .from("documents")
      .select("*, profiles!documents_client_id_fkey(full_name, email), services(title)")
      .eq("assigned_editor_id", user.profileId)
      .order("deadline_at", { ascending: true });
    return ok(data ?? []);
  } catch (error) {
    return asResponse(error);
  }
}
