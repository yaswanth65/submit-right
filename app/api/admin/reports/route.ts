import { NextRequest } from "next/server";
import { ok } from "@/lib/http";
import { asResponse } from "@/lib/route";
import { requireRole } from "@/lib/auth";
import { supabaseAdmin } from "@/lib/supabase";

export async function GET(req: NextRequest) {
  try {
    await requireRole("admin");
    const filter = req.nextUrl.searchParams.get("filter") ?? "30days";
    const [{ data: docs }, { data: payments }, { data: editors }] = await Promise.all([
      supabaseAdmin.from("documents").select("*"),
      supabaseAdmin.from("payment_transactions").select("*"),
      supabaseAdmin.from("profiles").select("*").eq("role", "editor")
    ]);

    return ok({
      filter,
      totalDocumentsSubmitted: docs?.length ?? 0,
      documentsCompleted: (docs ?? []).filter((row) => row.status === "completed").length,
      averageTurnaroundTime: 0,
      overdueRate: 0,
      revenueAnalyticsLine: Array.from({ length: 12 }, (_, index) => ({
        month: index + 1,
        totalRevenue: (payments ?? [])
          .filter((row) => row.status === "paid" && new Date(row.created_at).getMonth() === index)
          .reduce((sum, row) => sum + Number(row.amount), 0),
        averageOrderValue: 0
      })),
      revenueAnalyticsBar: {
        totalOrders: payments?.length ?? 0,
        totalRevenue: (payments ?? [])
          .filter((row) => row.status === "paid")
          .reduce((sum, row) => sum + Number(row.amount), 0)
      },
      editorPerformanceOverview: (editors ?? []).map((editor) => ({
        editorName: editor.full_name,
        completedDocs: (docs ?? []).filter((doc) => doc.assigned_editor_id === editor.id && doc.status === "completed").length,
        onTimeDeliver: 0,
        revisionRate: 0,
        activeAssignments: (docs ?? []).filter((doc) => doc.assigned_editor_id === editor.id && doc.status !== "completed").length
      }))
    });
  } catch (error) {
    return asResponse(error);
  }
}
