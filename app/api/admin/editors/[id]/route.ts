import { ok, fail } from "@/lib/http";
import { asResponse } from "@/lib/route";
import { requireRole } from "@/lib/auth";
import { supabaseAdmin } from "@/lib/supabase";

export async function GET(
  _req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    await requireRole("admin");
    const { id } = await params;
    const [{ data: profile }, { data: docs }, { data: audits }, { data: payments }] =
      await Promise.all([
        supabaseAdmin.from("profiles").select("*, editor_availability(*)").eq("id", id).eq("role", "editor").single(),
        supabaseAdmin.from("documents").select("*").eq("assigned_editor_id", id).order("created_at", { ascending: false }),
        supabaseAdmin.from("audit_logs").select("*").eq("target_user_id", id).order("created_at", { ascending: false }),
        supabaseAdmin
          .from("payment_transactions")
          .select("*, documents!payment_transactions_document_id_fkey(document_title)")
          .order("created_at", { ascending: false })
      ]);
    if (!profile) return fail("Editor not found", 404);
    return ok({
      profileOverview: profile,
      currentWorkload: (docs ?? []).filter((row) => row.status !== "completed"),
      paymentHistory: payments ?? [],
      auditTrail: audits ?? [],
      documentHistory: docs ?? []
    });
  } catch (error) {
    return asResponse(error);
  }
}
