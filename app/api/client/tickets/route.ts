import { NextRequest } from "next/server";
import { created, ok } from "@/lib/http";
import { asResponse, parseJson } from "@/lib/route";
import { requireRole } from "@/lib/auth";
import { supportTicketSchema } from "@/lib/validators";
import { supabaseAdmin } from "@/lib/supabase";

export async function GET() {
  try {
    const user = await requireRole("client");
    const { data } = await supabaseAdmin
      .from("support_tickets")
      .select("id, subject, category, status, created_at")
      .eq("created_by", user.profileId)
      .order("created_at", { ascending: false });
    return ok(data ?? []);
  } catch (error) {
    return asResponse(error);
  }
}

export async function POST(req: NextRequest) {
  try {
    const user = await requireRole("client");
    const body = await parseJson(req, supportTicketSchema);
    const { data, error } = await supabaseAdmin
      .from("support_tickets")
      .insert({
        created_by: user.profileId,
        subject: body.subject,
        category: body.category,
        message: body.message
      })
      .select("*")
      .single();

    if (error) throw error;
    return created(data);
  } catch (error) {
    return asResponse(error);
  }
}
