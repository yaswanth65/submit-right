import { NextRequest } from "next/server";
import { created } from "@/lib/http";
import { asResponse, parseJson } from "@/lib/route";
import { requireRole } from "@/lib/auth";
import { requestExtensionSchema } from "@/lib/validators";
import { supabaseAdmin } from "@/lib/supabase";

export async function POST(req: NextRequest) {
  try {
    const user = await requireRole("editor");
    const body = await parseJson(req, requestExtensionSchema);
    const { data, error } = await supabaseAdmin
      .from("audit_logs")
      .insert({
        actor_id: user.profileId,
        document_id: body.documentId,
        action: "deadline_extension_requested",
        notes: body.reason,
        payload: {
          proposedNewDeadline: body.proposedNewDeadline
        }
      })
      .select("*")
      .single();

    if (error) throw error;
    return created(data);
  } catch (error) {
    return asResponse(error);
  }
}
