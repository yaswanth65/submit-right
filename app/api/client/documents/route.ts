import { NextRequest } from "next/server";
import { created, fail, ok } from "@/lib/http";
import { asResponse, parseJson } from "@/lib/route";
import { requireRole } from "@/lib/auth";
import { documentListQuerySchema, submitDocumentStep1Schema } from "@/lib/validators";
import { createDraftDocument } from "@/lib/services/document-service";
import { supabaseAdmin } from "@/lib/supabase";
import { env } from "@/lib/env";
import { z } from "zod";

function buildDocumentTimeline(document: {
  status: string;
  submitted_at: string | null;
  assigned_editor_id: string | null;
  completed_at: string | null;
  revision_requested: boolean | null;
  created_at: string;
  updated_at: string;
}) {
  return [
    {
      key: "submitted",
      label: "Submitted",
      status: document.submitted_at ? "completed" : "pending",
      timestamp: document.submitted_at ?? null
    },
    {
      key: "assigned_to_editor",
      label: "Assigned to Editor",
      status: document.assigned_editor_id ? "completed" : "pending",
      timestamp: document.assigned_editor_id ? document.updated_at : null
    },
    {
      key: "in_progress",
      label: "In Progress",
      status:
        document.status === "being_edited" ||
        document.status === "payment_needed" ||
        document.status === "completed" ||
        document.status === "in_revision"
          ? "completed"
          : "pending",
      timestamp:
        document.status === "being_edited" ||
        document.status === "payment_needed" ||
        document.status === "completed" ||
        document.status === "in_revision"
          ? document.updated_at
          : null
    },
    {
      key: "completed_and_delivered",
      label: "Completed & Delivered",
      status:
        document.status === "payment_needed" || document.status === "completed"
          ? "completed"
          : "pending",
      timestamp:
        document.status === "payment_needed" || document.status === "completed"
          ? document.completed_at ?? document.updated_at
          : null
    },
    {
      key: "revision_shared",
      label: "Revision Shared",
      status: document.revision_requested ? "active" : "pending",
      timestamp: document.revision_requested ? document.updated_at : null
    }
  ];
}

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

export async function GET(req: NextRequest) {
  try {
    const user = await requireRole("client");
    const documentId = req.nextUrl.searchParams.get("documentId");

    if (documentId) {
      const id = z.string().uuid().parse(documentId);
      const [
        { data: document },
        { data: messages },
        { data: versions },
        { data: payments }
      ] = await Promise.all([
        supabaseAdmin
          .from("documents")
          .select(
            "*, service:services(*), client:profiles!documents_client_id_fkey(id, full_name, email), assignedEditor:profiles!documents_assigned_editor_id_fkey(id, full_name, email)"
          )
          .eq("id", id)
          .eq("client_id", user.profileId)
          .single(),
        supabaseAdmin
          .from("messages")
          .select(
            "*, sender:profiles!messages_sender_id_fkey(id, full_name, email), receiver:profiles!messages_receiver_id_fkey(id, full_name, email)"
          )
          .eq("document_id", id)
          .order("created_at", { ascending: true }),
        supabaseAdmin
          .from("file_versions")
          .select("*, uploadedBy:profiles!file_versions_uploaded_by_profile_id_fkey(id, full_name, email)")
          .eq("document_id", id)
          .order("created_at", { ascending: false }),
        supabaseAdmin
          .from("payment_transactions")
          .select("*")
          .eq("document_id", id)
          .eq("client_id", user.profileId)
          .order("created_at", { ascending: false })
      ]);

      if (!document) return fail("Document not found", 404);

      const canDownloadFinalFile =
        document.payment_status === "paid" || document.status === "completed";

      const [signedOriginalFileUrl, signedLatestEditorFileUrl, signedVersions] = await Promise.all([
        getSignedFileUrl(document.uploaded_file_path),
        canDownloadFinalFile ? getSignedFileUrl(document.latest_editor_file_path) : Promise.resolve(null),
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
        detail: document,
        paymentSummary: {
          status: document.payment_status,
          totalAmountDue: document.estimated_total,
          ratePerWord: document.rate_per_word,
          wordCount: document.word_count,
          canMakePayment: document.status === "payment_needed",
          canDownloadFinalFile
        },
        originalFile: document.uploaded_file_url
          ? {
              fileName: document.uploaded_file_name,
              fileUrl: signedOriginalFileUrl || document.uploaded_file_url,
              filePath: document.uploaded_file_path
            }
          : null,
        latestEditorFile: document.latest_editor_file_url
          ? {
              fileName: document.latest_editor_file_name,
              fileUrl: signedLatestEditorFileUrl || document.latest_editor_file_url,
              filePath: document.latest_editor_file_path,
              isLockedUntilPayment: !canDownloadFinalFile
            }
          : null,
        documentTimeline: buildDocumentTimeline(document),
        messageList: messages ?? [],
        versionHistory: signedVersions,
        paymentHistory: payments ?? []
      });
    }

    const query = documentListQuerySchema.parse({
      search: req.nextUrl.searchParams.get("search") ?? undefined,
      status: req.nextUrl.searchParams.get("status") ?? undefined,
      sort: req.nextUrl.searchParams.get("sort") ?? undefined
    });

    let builder = supabaseAdmin
      .from("documents")
      .select("*, services(*)")
      .eq("client_id", user.profileId);

    if (query.search) builder = builder.ilike("document_title", `%${query.search}%`);
    if (query.status) builder = builder.eq("status", query.status);

    if (query.sort === "oldest") {
      builder = builder.order("updated_at", { ascending: true });
    } else if (query.sort === "a_to_z") {
      builder = builder.order("document_title", { ascending: true });
    } else {
      builder = builder.order("updated_at", { ascending: false });
    }

    const { data } = await builder;
    return ok({
      totalSubmittedDocumentsCount: data?.length ?? 0,
      documents: data ?? []
    });
  } catch (error) {
    return asResponse(error);
  }
}

export async function POST(req: NextRequest) {
  try {
    const user = await requireRole("client");
    const body = await parseJson(req, submitDocumentStep1Schema);
    const draft = await createDraftDocument({
      clientId: user.profileId,
      documentTitle: body.documentTitle,
      academicField: body.academicField,
      documentType: body.documentType,
      shortDescription: body.shortDescription
    });
    return created(draft);
  } catch (error) {
    return asResponse(error);
  }
}
