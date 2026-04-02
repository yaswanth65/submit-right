import { ok } from "@/lib/http";
import { asResponse } from "@/lib/route";
import { requireRole } from "@/lib/auth";
import { supabaseAdmin } from "@/lib/supabase";

export async function GET() {
  try {
    const user = await requireRole("editor");
    const { data } = await supabaseAdmin
      .from("documents")
      .select("*")
      .eq("assigned_editor_id", user.profileId)
      .eq("status", "completed")
      .order("completed_at", { ascending: false });

    const docs = data ?? [];
    const currentMonth = new Date().getMonth();
    const currentYear = new Date().getFullYear();

    const completedThisMonth = docs.filter((doc) => {
      if (!doc.completed_at) return false;
      const date = new Date(doc.completed_at);
      return date.getMonth() === currentMonth && date.getFullYear() === currentYear;
    });

    return ok({
      totalCompletedCount: docs.length,
      completedThisMonthCount: completedThisMonth.length,
      averageTurnaroundTimeInDays: 0,
      revisionRatePercent: 0,
      documents: docs
    });
  } catch (error) {
    return asResponse(error);
  }
}
