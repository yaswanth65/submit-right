import { ok } from "@/lib/http";
import { asResponse } from "@/lib/route";
import { requireRole } from "@/lib/auth";
import { supabaseAdmin } from "@/lib/supabase";

export async function GET() {
  try {
    const user = await requireRole("client");
    const { data: documents } = await supabaseAdmin
      .from("documents")
      .select("*")
      .eq("client_id", user.profileId)
      .order("created_at", { ascending: false });

    const rows = documents ?? [];

    return ok({
      pendingPaymentDocuments: rows.filter((row) => row.status === "payment_needed"),
      totalSubmittedDocumentsCount: rows.length,
      totalSubmittedDocuments: rows,
      inProgressCount: rows.filter((row) => ["being_edited", "in_revision"].includes(row.status)).length,
      completedCount: rows.filter((row) => row.status === "completed").length,
      recentProgress: rows.slice(0, 5)
    });
  } catch (error) {
    return asResponse(error);
  }
}
