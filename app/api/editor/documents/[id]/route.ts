import { ok, fail } from "@/lib/http";
import { asResponse } from "@/lib/route";
import { requireRole } from "@/lib/auth";
import { supabaseAdmin } from "@/lib/supabase";
import { env } from "@/lib/env";

async function getSignedFileUrl(filePath?: string | null) {
  if (!filePath) {
    return null;
  }

  const { data, error } = await supabaseAdmin.storage
    .from(env.SUPABASE_STORAGE_BUCKET)
    .createSignedUrl(filePath, 60 * 60);

  if (error) {
    return null;
  }

  const signedUrl = data?.signedUrl || null;
  if (!signedUrl) {
    return null;
  }

  if (/^https?:\/\//i.test(signedUrl)) {
    return signedUrl;
  }

  if (signedUrl.startsWith("/object/")) {
    return `${env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1${signedUrl}`;
  }

  if (signedUrl.startsWith("/")) {
    return `${env.NEXT_PUBLIC_SUPABASE_URL}${signedUrl}`;
  }

  return `${env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/${signedUrl}`;
}

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

    const [signedOriginal, signedVersions] = await Promise.all([
      getSignedFileUrl(document.uploaded_file_path),
      Promise.all(
        (versions ?? []).map(async (version) => {
          const signed = await getSignedFileUrl(version.file_path);
          return {
            ...version,
            file_url: signed || version.file_url || null
          };
        })
      )
    ]);

    return ok({
      assignmentOverview: document,
      originalFileDownloadLink: signedOriginal || document.uploaded_file_url,
      messageList: messages ?? [],
      versionHistory: signedVersions
    });
  } catch (error) {
    return asResponse(error);
  }
}
