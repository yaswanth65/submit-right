import { ok, fail } from "@/lib/http";
import { asResponse } from "@/lib/route";
import { requireRole } from "@/lib/auth";
import { supabaseAdmin } from "@/lib/supabase";

export async function GET(
  _req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const user = await requireRole("editor");
    const { id } = await params;

    const [{ data: document }, { data: messages }, { data: versions }] = await Promise.all([
      supabaseAdmin
        .from("documents")
        .select("*, profiles!documents_client_id_fkey(full_name, email), services(title)")
        .eq("id", id)
        .eq("assigned_editor_id", user.profileId)
        .single(),
      supabaseAdmin
        .from("messages")
        .select("*, sender:profiles!messages_sender_id_fkey(full_name), receiver:profiles!messages_receiver_id_fkey(full_name)")
        .eq("document_id", id)
        .order("created_at", { ascending: true }),
      supabaseAdmin
        .from("file_versions")
        .select("*")
        .eq("document_id", id)
        .order("created_at", { ascending: false })
    ]);

    if (!document) return fail("Document not found", 404);

    return ok({
      assignmentOverview: document,
      originalFileDownloadLink: document.uploaded_file_url,
      messageList: messages ?? [],
      versionHistory: versions ?? []
    });
  } catch (error) {
    return asResponse(error);
  }
}
