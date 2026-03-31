import { NextRequest } from "next/server";
import { ok } from "@/lib/http";
import { asResponse, parseJson } from "@/lib/route";
import { requireRole } from "@/lib/auth";
import { markReadSchema } from "@/lib/validators";
import { supabaseAdmin } from "@/lib/supabase";

export async function POST(req: NextRequest) {
  try {
    const user = await requireRole(["client", "editor", "admin"]);
    const body = await parseJson(req, markReadSchema);
    const { data } = await supabaseAdmin
      .from("notifications")
      .update({ is_read: true })
      .eq("user_id", user.profileId)
      .in("id", body.notificationIds)
      .select("*");

    return ok(data ?? []);
  } catch (error) {
    return asResponse(error);
  }
}
