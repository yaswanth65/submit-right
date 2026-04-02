import { ok } from "@/lib/http";
import { asResponse } from "@/lib/route";
import { requireRole } from "@/lib/auth";
import { supabaseAdmin } from "@/lib/supabase";

export async function GET() {
  try {
    await requireRole("admin");

    const [{ data: documents }, { data: editors }, { data: payments }, { data: me }] =
      await Promise.all([
        supabaseAdmin.from("documents").select("*").order("created_at", { ascending: false }),
        supabaseAdmin.from("profiles").select("*").eq("role", "editor"),
        supabaseAdmin.from("payment_transactions").select("*").order("created_at", { ascending: false }),
        supabaseAdmin.from("app_settings").select("*").limit(1).single()
      ]);

    const docs = documents ?? [];
    const payRows = payments ?? [];

    return ok({
      activeDocuments: {
        totalCount: docs.filter((row) => ["submitted", "being_edited", "in_revision", "payment_needed"].includes(row.status)).length,
        list: docs.filter((row) => ["submitted", "being_edited", "in_revision", "payment_needed"].includes(row.status))
      },
      pendingDocuments: {
        totalCount: docs.filter((row) => row.status === "submitted").length,
        list: docs.filter((row) => row.status === "submitted")
      },
      revisionRequests: {
        totalCount: docs.filter((row) => row.status === "in_revision").length,
        list: docs.filter((row) => row.status === "in_revision")
      },
      overdueTasks: {
        totalCount: docs.filter((row) => row.deadline_at && new Date(row.deadline_at) < new Date() && row.status !== "completed").length,
        list: docs.filter((row) => row.deadline_at && new Date(row.deadline_at) < new Date() && row.status !== "completed")
      },
      activeEditors: {
        totalCount: editors?.length ?? 0,
        list: editors ?? []
      },
      revenueThisMonth: {
        totalCount: payRows.filter((row) => row.status === "paid").reduce((sum, row) => sum + Number(row.amount), 0),
        list: payRows.filter((row) => row.status === "paid")
      },
      revenueSnapshot: {
        thisMonth: payRows.filter((row) => row.status === "paid").reduce((sum, row) => sum + Number(row.amount), 0),
        pendingPayouts: payRows.filter((row) => row.status === "pending").reduce((sum, row) => sum + Number(row.amount), 0),
        paidPayouts: payRows.filter((row) => row.status === "paid").reduce((sum, row) => sum + Number(row.amount), 0),
        graph: Array.from({ length: 12 }, (_, month) => ({
          month: month + 1,
          revenue: payRows
            .filter((row) => new Date(row.created_at).getMonth() === month && row.status === "paid")
            .reduce((sum, row) => sum + Number(row.amount), 0)
        }))
      },
      pendingAction: docs.filter((row) => row.status === "submitted"),
      workloadDistribution: editors ?? [],
      myData: me
    });
  } catch (error) {
    return asResponse(error);
  }
}
