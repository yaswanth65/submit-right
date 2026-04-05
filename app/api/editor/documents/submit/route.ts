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
    const filePart = formData.get("file");
    const isValidFileLike =
      !!filePart &&
      typeof filePart !== "string" &&
      "name" in filePart &&
      "size" in filePart &&
      "type" in filePart &&
      "arrayBuffer" in filePart;

    if (!documentId || !isValidFileLike) {
      return fail("documentId and file are required");
    }

    const file = filePart as File;

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
