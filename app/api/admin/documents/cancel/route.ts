import { NextRequest } from "next/server";
import { ok } from "@/lib/http";
import { asResponse, parseJson } from "@/lib/route";
import { requireRole } from "@/lib/auth";
import { cancelDocumentSchema } from "@/lib/validators";
import { supabaseAdmin } from "@/lib/supabase";

export async function POST(req: NextRequest) {
  try {
    const admin = await requireRole("admin");
    const body = await parseJson(req, cancelDocumentSchema);
    const { data } = await supabaseAdmin
      .from("documents")
      .update({ status: "cancelled", last_activity_at: new Date().toISOString() })
      .eq("id", body.documentId)
      .select("*")
      .single();
    await supabaseAdmin.from("audit_logs").insert({
      actor_id: admin.profileId,
      document_id: body.documentId,
      action: "cancel_document",
      notes: body.cancellationReason,
      payload: body
    });
    return ok(data);
  } catch (error) {
    return asResponse(error);
  }
}
