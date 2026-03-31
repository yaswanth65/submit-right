import { NextRequest } from "next/server";
import { ok } from "@/lib/http";
import { asResponse, parseJson } from "@/lib/route";
import { requireRole } from "@/lib/auth";
import { assignEditorSchema } from "@/lib/validators";
import { createNotification } from "@/lib/services/document-service";
import { supabaseAdmin } from "@/lib/supabase";

export async function POST(req: NextRequest) {
  try {
    const admin = await requireRole("admin");
    const body = await parseJson(req, assignEditorSchema);
    const { data } = await supabaseAdmin
      .from("documents")
      .update({
        assigned_editor_id: body.editorId,
        status: "being_edited",
        last_activity_at: new Date().toISOString()
      })
      .eq("id", body.documentId)
      .select("*")
      .single();

    await supabaseAdmin.from("audit_logs").insert({
      actor_id: admin.profileId,
      document_id: body.documentId,
      target_user_id: body.editorId,
      action: "assign_editor",
      notes: body.reason,
      payload: body
    });

    if (data?.assigned_editor_id) {
      await createNotification({
        userId: data.assigned_editor_id,
        documentId: data.id,
        type: "document_update",
        title: "New document assigned",
        body: `${data.document_title} has been assigned to you.`
      });
    }

    return ok(data);
  } catch (error) {
    return asResponse(error);
  }
}
