import { NextRequest } from "next/server";
import { ok } from "@/lib/http";
import { asResponse } from "@/lib/route";
import { requireRole } from "@/lib/auth";
import { supabaseAdmin } from "@/lib/supabase";

export async function GET(req: NextRequest) {
  try {
    const user = await requireRole("editor");
    const type = req.nextUrl.searchParams.get("type");
    let query = supabaseAdmin
      .from("notifications")
      .select("*")
      .eq("user_id", user.profileId)
      .order("created_at", { ascending: false });
    if (type) query = query.eq("type", type);
    const { data } = await query;
    return ok(data ?? []);
  } catch (error) {
    return asResponse(error);
  }
}
