import { NextRequest } from "next/server";
import { created, ok } from "@/lib/http";
import { asResponse, parseJson } from "@/lib/route";
import { requireRole } from "@/lib/auth";
import { messageSchema } from "@/lib/validators";
import { createNotification } from "@/lib/services/document-service";
import { supabaseAdmin } from "@/lib/supabase";

export async function GET(req: NextRequest) {
  try {
    const user = await requireRole("editor");
    const documentId = req.nextUrl.searchParams.get("documentId");
    let query = supabaseAdmin
      .from("messages")
      .select("*")
      .eq("receiver_id", user.profileId)
      .order("created_at", { ascending: true });
    if (documentId) query = query.eq("document_id", documentId);
    const { data } = await query;
    return ok(data ?? []);
  } catch (error) {
    return asResponse(error);
  }
}

export async function POST(req: NextRequest) {
  try {
    const user = await requireRole("editor");
    const body = await parseJson(req, messageSchema);
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
