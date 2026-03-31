import { NextRequest } from "next/server";
import { created, ok } from "@/lib/http";
import { asResponse, parseJson } from "@/lib/route";
import { requireRole } from "@/lib/auth";
import { messageSchema } from "@/lib/validators";
import { createNotification } from "@/lib/services/document-service";
import { supabaseAdmin } from "@/lib/supabase";

export async function GET() {
  try {
    const user = await requireRole("client");
    const { data } = await supabaseAdmin
      .from("documents")
      .select("id, document_title, assigned_editor_id, profiles!documents_assigned_editor_id_fkey(id, full_name, email), status")
      .eq("client_id", user.profileId)
      .not("assigned_editor_id", "is", null);

    const rows = (data ?? []).filter((row) => row.status !== "payment_needed");
    return ok(rows);
  } catch (error) {
    return asResponse(error);
  }
}

export async function POST(req: NextRequest) {
  try {
    const user = await requireRole("client");
    const body = await parseJson(req, messageSchema);

    const { data: document } = await supabaseAdmin
      .from("documents")
      .select("*")
      .eq("id", body.documentId)
      .eq("client_id", user.profileId)
      .single();

    if (!document || document.status === "payment_needed") {
      throw new Error("Messaging is disabled after editor resubmission until payment is completed");
    }

    const { data, error } = await supabaseAdmin
      .from("messages")
      .insert({
        document_id: body.documentId,
        sender_id: user.profileId,
        receiver_id: body.receiverId,
        message: body.message
      })
      .select("*")
      .single();

    if (error) throw error;

    await createNotification({
      userId: body.receiverId,
      documentId: body.documentId,
      type: "message",
      title: "New message",
      body: body.message
    });

    return created(data);
  } catch (error) {
    return asResponse(error);
  }
}
