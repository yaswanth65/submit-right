import { ok } from "@/lib/http";
import { asResponse } from "@/lib/route";
import { requireRole } from "@/lib/auth";
import { supabaseAdmin } from "@/lib/supabase";

export async function GET() {
  try {
    await requireRole("admin");
    const { data } = await supabaseAdmin
      .from("payment_transactions")
      .select("*, documents(document_title, deadline_at, service_id), profiles!payment_transactions_client_id_fkey(full_name)")
      .order("created_at", { ascending: false });
    const rows = data ?? [];
    return ok({
      totalRevenueThisMonth: rows.filter((row) => row.status === "paid").reduce((sum, row) => sum + Number(row.amount), 0),
      pendingStudentPayments: rows.filter((row) => row.status === "pending").length,
      transactionsAwaitingSettlement: rows.filter((row) => row.status === "pending"),
      studentPayments: rows
    });
  } catch (error) {
    return asResponse(error);
  }
}
