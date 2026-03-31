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
    const [{ data: document }, { data: messages }, { data: audits }, { data: versions }] =
      await Promise.all([
        supabaseAdmin
          .from("documents")
          .select("*, profiles!documents_client_id_fkey(full_name, email), services(title)")
          .eq("id", id)
          .single(),
        supabaseAdmin.from("messages").select("*").eq("document_id", id).order("created_at", { ascending: true }),
        supabaseAdmin.from("audit_logs").select("*").eq("document_id", id).order("created_at", { ascending: false }),
        supabaseAdmin.from("file_versions").select("*").eq("document_id", id).order("created_at", { ascending: false })
      ]);
    if (!document) return fail("Document not found", 404);
    return ok({
      detail: document,
      communicationHistory: messages ?? [],
      systemAuditTrail: audits ?? [],
      fileVersionTimeline: versions ?? []
    });
  } catch (error) {
    return asResponse(error);
  }
}
