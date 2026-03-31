import { ok } from "@/lib/http";
import { asResponse } from "@/lib/route";
import { requireRole } from "@/lib/auth";
import { supabaseAdmin } from "@/lib/supabase";

export async function GET() {
  try {
    const user = await requireRole("client");

    const [{ data: pending }, { data: history }, { data: docs }] = await Promise.all([
      supabaseAdmin
        .from("documents")
        .select("*")
        .eq("client_id", user.profileId)
        .eq("status", "payment_needed"),
      supabaseAdmin
        .from("payment_transactions")
        .select("*")
        .eq("client_id", user.profileId)
        .order("created_at", { ascending: false }),
      supabaseAdmin
        .from("documents")
        .select("id, document_title, status, estimated_total")
        .eq("client_id", user.profileId)
        .order("created_at", { ascending: false })
    ]);

    return ok({
      pendingPaymentDocuments: pending ?? [],
      transactionHistory: history ?? [],
      documentList: docs ?? [],
      transactionInvoices: (history ?? []).map((item) => ({
        invoiceNumber: item.invoice_number,
        amount: item.amount,
        status: item.status
      }))
    });
  } catch (error) {
    return asResponse(error);
  }
}
