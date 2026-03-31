import { NextRequest } from "next/server";
import { ok } from "@/lib/http";
import { asResponse, parseJson } from "@/lib/route";
import { requireRole } from "@/lib/auth";
import { updateAvailabilitySchema } from "@/lib/validators";
import { supabaseAdmin } from "@/lib/supabase";

export async function PATCH(req: NextRequest) {
  try {
    await requireRole("admin");
    const editorId = req.nextUrl.searchParams.get("editorId");
    if (!editorId) throw new Error("editorId query param is required");
    const body = await parseJson(req, updateAvailabilitySchema);
    const { data } = await supabaseAdmin
      .from("editor_availability")
      .upsert(
        {
          editor_id: editorId,
          availability_status: body.availabilityStatus,
          maximum_active_assignments: body.maximumActiveAssignments ?? 5,
          maximum_word_count_per_day: body.maximumWordCountPerDay ?? null,
          vacation_start_date: body.vacationStartDate ?? null,
          vacation_end_date: body.vacationEndDate ?? null,
          admin_notes: body.adminNotes ?? null,
          updated_at: new Date().toISOString()
        },
        { onConflict: "editor_id" }
      )
      .select("*")
      .single();
    return ok(data);
  } catch (error) {
    return asResponse(error);
  }
}
