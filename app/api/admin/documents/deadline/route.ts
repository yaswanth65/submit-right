import { NextRequest } from "next/server";
import { ok } from "@/lib/http";
import { asResponse, parseJson } from "@/lib/route";
import { requireRole } from "@/lib/auth";
import { adjustDeadlineSchema } from "@/lib/validators";
import { supabaseAdmin } from "@/lib/supabase";

export async function PATCH(req: NextRequest) {
  try {
    const admin = await requireRole("admin");
    const body = await parseJson(req, adjustDeadlineSchema);
    const { data } = await supabaseAdmin
      .from("documents")
      .update({ deadline_at: body.newDeadline, last_activity_at: new Date().toISOString() })
      .eq("id", body.documentId)
      .select("*")
      .single();
    await supabaseAdmin.from("audit_logs").insert({
      actor_id: admin.profileId,
      document_id: body.documentId,
      action: "adjust_deadline",
      notes: body.reason,
      payload: body
    });
    return ok(data);
  } catch (error) {
    return asResponse(error);
  }
}
