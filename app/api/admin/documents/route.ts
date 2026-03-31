import { ok } from "@/lib/http";
import { asResponse } from "@/lib/route";
import { requireRole } from "@/lib/auth";
import { supabaseAdmin } from "@/lib/supabase";

export async function GET() {
  try {
    await requireRole("admin");
    const { data } = await supabaseAdmin
      .from("documents")
      .select("*, profiles!documents_client_id_fkey(full_name), services(title)")
      .order("updated_at", { ascending: false });
    const docs = data ?? [];
    return ok({
      totalActive: docs.filter((row) => row.status !== "completed").length,
      overdueTasks: docs.filter((row) => row.deadline_at && new Date(row.deadline_at) < new Date() && row.status !== "completed").length,
      pendingRevisions: docs.filter((row) => row.status === "in_revision").length,
      avgTime: 0,
      list: docs
    });
  } catch (error) {
    return asResponse(error);
  }
}
