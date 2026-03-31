import { NextRequest } from "next/server";
import { ok } from "@/lib/http";
import { asResponse } from "@/lib/route";
import { requireRole } from "@/lib/auth";
import { supabaseAdmin } from "@/lib/supabase";

export async function POST(req: NextRequest) {
  try {
    const admin = await requireRole("admin");
    const { ticketId, message } = (await req.json()) as { ticketId: string; message: string };
    await supabaseAdmin.from("ticket_responses").insert({
      ticket_id: ticketId,
      author_id: admin.profileId,
      message
    });
    const { data } = await supabaseAdmin
      .from("support_tickets")
      .update({
        status: "resolved",
        resolved_by: admin.profileId,
        resolved_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      })
      .eq("id", ticketId)
      .select("*")
      .single();
    return ok(data);
  } catch (error) {
    return asResponse(error);
  }
}
