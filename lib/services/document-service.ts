import { fail } from "@/lib/http";
import { extractWordCount, uploadDocumentFile, validateUpload } from "@/lib/files";
import { supabaseAdmin } from "@/lib/supabase";

export async function createDraftDocument(input: {
  clientId: string;
  documentTitle: string;
  academicField: string;
  documentType: string;
  shortDescription: string;
}) {
  const { data, error } = await supabaseAdmin
    .from("documents")
    .insert({
      client_id: input.clientId,
      document_title: input.documentTitle,
      academic_field: input.academicField,
      document_type: input.documentType,
      short_description: input.shortDescription,
      status: "draft",
      draft_expires_at: new Date(Date.now() + 2 * 60 * 60 * 1000).toISOString()
    })
    .select("*")
    .single();

  if (error || !data) {
    throw fail("Unable to create draft document", 500, error);
  }

  return data;
}

export async function uploadClientDocument(input: {
  documentId: string;
  clientId: string;
  file: File;
}) {
  validateUpload(input.file);
  const wordCount = await extractWordCount(input.file);
  const path = `${input.clientId}/${input.documentId}/client/${Date.now()}-${input.file.name}`;
  const uploaded = await uploadDocumentFile(path, input.file);

  const { data: document, error } = await supabaseAdmin
    .from("documents")
    .update({
      uploaded_file_name: input.file.name,
      uploaded_file_url: uploaded.publicUrl,
      uploaded_file_path: uploaded.path,
      word_count: wordCount,
      last_activity_at: new Date().toISOString()
    })
    .eq("id", input.documentId)
    .eq("client_id", input.clientId)
    .select("*")
    .single();

  if (error || !document) {
    throw fail("Unable to upload file", 500, error);
  }

  await supabaseAdmin.from("file_versions").insert({
    document_id: input.documentId,
    uploaded_by_profile_id: input.clientId,
    version_type: "client_file",
    file_name: input.file.name,
    file_url: uploaded.publicUrl,
    file_path: uploaded.path,
    file_size_bytes: input.file.size
  });

  return document;
}

export async function selectDocumentService(input: {
  documentId: string;
  clientId: string;
  serviceId: string;
}) {
  const { data: service, error: serviceError } = await supabaseAdmin
    .from("services")
    .select("*")
    .eq("id", input.serviceId)
    .single();

  if (serviceError || !service) {
    throw fail("Service not found", 404, serviceError);
  }

  const { data: document, error } = await supabaseAdmin
    .from("documents")
    .update({
      service_id: service.id,
      rate_per_word: service.rate_per_word,
      estimated_total: service.rate_per_word,
      last_activity_at: new Date().toISOString()
    })
    .eq("id", input.documentId)
    .eq("client_id", input.clientId)
    .select("*, services(*)")
    .single();

  if (error || !document) {
    throw fail("Unable to select service", 500, error);
  }

  const estimatedTotal =
    Number(document.word_count ?? 0) * Number(service.rate_per_word ?? 0);

  const { data: finalDocument, error: finalError } = await supabaseAdmin
    .from("documents")
    .update({ estimated_total: estimatedTotal })
    .eq("id", input.documentId)
    .select("*, services(*)")
    .single();

  if (finalError || !finalDocument) {
    throw fail("Unable to update estimate", 500, finalError);
  }

  return {
    documentId: finalDocument.id,
    documentTitle: finalDocument.document_title,
    academicField: finalDocument.academic_field,
    documentType: finalDocument.document_type,
    serviceSelected: finalDocument.services?.title,
    shortDescription: finalDocument.short_description,
    uploadedDocument: finalDocument.uploaded_file_url,
    wordCount: finalDocument.word_count,
    ratePerWord: finalDocument.rate_per_word,
    estimatedTotal: finalDocument.estimated_total
  };
}

export async function submitDocument(input: {
  documentId: string;
  clientId: string;
}) {
  const { data, error } = await supabaseAdmin
    .from("documents")
    .update({
      status: "submitted",
      submitted_at: new Date().toISOString(),
      last_activity_at: new Date().toISOString(),
      draft_expires_at: null
    })
    .eq("id", input.documentId)
    .eq("client_id", input.clientId)
    .select("*")
    .single();

  if (error || !data) {
    throw fail("Unable to submit document", 500, error);
  }

  await createNotification({
    userId: input.clientId,
    documentId: data.id,
    type: "document_update",
    title: "Document submitted",
    body: `${data.document_title} has been submitted successfully.`
  });

  return data;
}

export async function createNotification(input: {
  userId: string;
  documentId?: string;
  type: "message" | "payment" | "document_update" | "system";
  title: string;
  body: string;
}) {
  await supabaseAdmin.from("notifications").insert({
    user_id: input.userId,
    document_id: input.documentId,
    type: input.type,
    title: input.title,
    body: input.body
  });
}

export async function submitEditorFile(input: {
  documentId: string;
  editorId: string;
  file: File;
}) {
  validateUpload(input.file);
  const path = `${input.editorId}/${input.documentId}/editor/${Date.now()}-${input.file.name}`;
  const uploaded = await uploadDocumentFile(path, input.file);

  const { data: document, error } = await supabaseAdmin
    .from("documents")
    .update({
      latest_editor_file_name: input.file.name,
      latest_editor_file_url: uploaded.publicUrl,
      latest_editor_file_path: uploaded.path,
      status: "payment_needed",
      revision_requested: false,
      last_activity_at: new Date().toISOString()
    })
    .eq("id", input.documentId)
    .eq("assigned_editor_id", input.editorId)
    .select("*")
    .single();

  if (error || !document) {
    throw fail("Unable to submit editor file", 500, error);
  }

  await supabaseAdmin.from("file_versions").insert({
    document_id: input.documentId,
    uploaded_by_profile_id: input.editorId,
    version_type: "editor_submission",
    file_name: input.file.name,
    file_url: uploaded.publicUrl,
    file_path: uploaded.path,
    file_size_bytes: input.file.size
  });

  await createNotification({
    userId: document.client_id,
    documentId: document.id,
    type: "document_update",
    title: "Edited file uploaded",
    body: `${document.document_title} is ready for payment and download.`
  });

  return document;
}
