import { NextRequest } from "next/server";
import { fail, ok } from "@/lib/http";
import { asResponse } from "@/lib/route";
import { requireRole } from "@/lib/auth";
import { submitEditorFile } from "@/lib/services/document-service";
import { supabaseAdmin } from "@/lib/supabase";

export async function POST(req: NextRequest) {
  try {
    const user = await requireRole("editor");
    const formData = await req.formData();
    const documentId = String(formData.get("documentId") ?? "");
    const file = formData.get("file");

    if (!documentId || !(file instanceof File)) {
      return fail("documentId and file are required");
    }

    const { data: document } = await supabaseAdmin
      .from("documents")
      .select("revision_requested")
      .eq("id", documentId)
      .eq("assigned_editor_id", user.profileId)
      .single();

    if (!document) return fail("Document not found", 404);

    return ok(await submitEditorFile({ documentId, editorId: user.profileId, file }));
  } catch (error) {
    return asResponse(error);
  }
}
