import { NextRequest } from "next/server";
import { fail, ok } from "@/lib/http";
import { asResponse, parseJson } from "@/lib/route";
import { requireRole } from "@/lib/auth";
import { assignEditorSchema } from "@/lib/validators";
import { createNotification } from "@/lib/services/document-service";
import { supabaseAdmin } from "@/lib/supabase";

const UUID_REGEX =
  /^([0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[1-8][0-9a-fA-F]{3}-[89abAB][0-9a-fA-F]{3}-[0-9a-fA-F]{12}|00000000-0000-0000-0000-000000000000|ffffffff-ffff-ffff-ffff-ffffffffffff)$/;

async function resolveEditorProfileId(editorIdentifier: string) {
  const normalized = editorIdentifier.trim();

  if (UUID_REGEX.test(normalized)) {
    const byProfileId = await supabaseAdmin
      .from("profiles")
      .select("id")
      .eq("id", normalized)
      .eq("role", "editor")
      .maybeSingle();

    if (byProfileId.data?.id) {
      return byProfileId.data.id;
    }

    const byAuthUserId = await supabaseAdmin
      .from("profiles")
      .select("id")
      .eq("auth_user_id", normalized)
      .eq("role", "editor")
      .maybeSingle();

    if (byAuthUserId.data?.id) {
      return byAuthUserId.data.id;
    }
  }

  const byEmail = await supabaseAdmin
    .from("profiles")
    .select("id")
    .ilike("email", normalized)
    .eq("role", "editor")
    .maybeSingle();

  return byEmail.data?.id ?? null;
}

export async function POST(req: NextRequest) {
  try {
    const admin = await requireRole("admin");
    const body = await parseJson(req, assignEditorSchema);
    const resolvedEditorId = await resolveEditorProfileId(body.editorId);

    if (!resolvedEditorId) {
      return fail("Invalid editor selection. Please refresh and choose a valid editor.", 422);
    }

    const { data } = await supabaseAdmin
      .from("documents")
      .update({
        assigned_editor_id: resolvedEditorId,
        status: "being_edited",
        last_activity_at: new Date().toISOString()
      })
      .eq("id", body.documentId)
      .select("*")
      .single();

    await supabaseAdmin.from("audit_logs").insert({
      actor_id: admin.profileId,
      document_id: body.documentId,
      target_user_id: resolvedEditorId,
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
