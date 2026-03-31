import { NextRequest } from "next/server";
import { created } from "@/lib/http";
import { asResponse, parseJson } from "@/lib/route";
import { requireRole } from "@/lib/auth";
import { suspendAccountSchema } from "@/lib/validators";
import { supabaseAdmin } from "@/lib/supabase";

export async function POST(req: NextRequest) {
  try {
    const admin = await requireRole("admin");
    const body = await parseJson(req, suspendAccountSchema);
    await supabaseAdmin.from("profiles").update({ account_status: "suspended" }).eq("id", body.targetUserId);
    const { data } = await supabaseAdmin
      .from("audit_logs")
      .insert({
        actor_id: admin.profileId,
        target_user_id: body.targetUserId,
        action: "suspend_client_account",
        notes: body.reason,
        payload: body
      })
      .select("*")
      .single();
    return created(data);
  } catch (error) {
    return asResponse(error);
  }
}
