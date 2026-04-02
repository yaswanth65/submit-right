import { ok, fail } from "@/lib/http";
import { asResponse } from "@/lib/route";
import { requireRole } from "@/lib/auth";
import { supabaseAdmin } from "@/lib/supabase";

export async function GET(
  _req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    await requireRole("admin");
    const { id } = await params;
    const { data } = await supabaseAdmin.from("payment_transactions").select("*").eq("id", id).single();
    if (!data) return fail("Payment not found", 404);
    return ok({
      transactionOverview: data,
      paymentEventTimeline: data.event_timeline,
      paymentBreakdown: data.breakdown,
      financialAuditTrail: [],
      transactionDetails: data
    });
  } catch (error) {
    return asResponse(error);
  }
}
