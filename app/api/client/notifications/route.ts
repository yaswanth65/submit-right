import { NextRequest } from "next/server";
import { ok } from "@/lib/http";
import { asResponse } from "@/lib/route";
import { requireRole } from "@/lib/auth";
import { supabaseAdmin } from "@/lib/supabase";

export async function GET(req: NextRequest) {
  try {
    const user = await requireRole("client");
    const type = req.nextUrl.searchParams.get("type");
    const unread = req.nextUrl.searchParams.get("unread");

    let query = supabaseAdmin
      .from("notifications")
      .select("*")
      .eq("user_id", user.profileId)
      .order("created_at", { ascending: false });

    if (type) query = query.eq("type", type);
    if (unread === "true") query = query.eq("is_read", false);

    const { data } = await query;

    return ok({
      all: data ?? [],
      unread: (data ?? []).filter((item) => !item.is_read),
      documentUpdates: (data ?? []).filter((item) => item.type === "document_update"),
      payments: (data ?? []).filter((item) => item.type === "payment"),
      messages: (data ?? []).filter((item) => item.type === "message")
    });
  } catch (error) {
    return asResponse(error);
  }
}
