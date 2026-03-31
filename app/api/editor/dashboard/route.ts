import { ok } from "@/lib/http";
import { asResponse } from "@/lib/route";
import { requireRole } from "@/lib/auth";
import { supabaseAdmin } from "@/lib/supabase";

export async function GET() {
  try {
    const user = await requireRole("editor");
    const [{ data: docs }, { data: profile }] = await Promise.all([
      supabaseAdmin
        .from("documents")
        .select("*")
        .eq("assigned_editor_id", user.profileId)
        .order("deadline_at", { ascending: true }),
      supabaseAdmin.from("profiles").select("full_name, email").eq("id", user.profileId).single()
    ]);

    const rows = docs ?? [];
    const today = new Date().toISOString().slice(0, 10);

    return ok({
      activeDocumentCount: rows.filter((row) => ["submitted", "being_edited", "in_revision"].includes(row.status)).length,
      activeDocuments: rows.filter((row) => ["submitted", "being_edited", "in_revision"].includes(row.status)),
      pendingRevisionCount: rows.filter((row) => row.status === "in_revision").length,
      pendingRevisionDocuments: rows.filter((row) => row.status === "in_revision"),
      dueTodayCount: rows.filter((row) => row.deadline_at?.slice(0, 10) === today).length,
      dueTodayDocuments: rows.filter((row) => row.deadline_at?.slice(0, 10) === today),
      completedCount: rows.filter((row) => row.status === "completed").length,
      completedDocuments: rows.filter((row) => row.status === "completed"),
      recentActivity: rows.slice(0, 10),
      dueSoon: rows.filter((row) => row.deadline_at && row.status !== "completed").slice(0, 10),
      user: profile
    });
  } catch (error) {
    return asResponse(error);
  }
}
