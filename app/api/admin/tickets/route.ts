import { NextRequest } from "next/server";
import { ok } from "@/lib/http";
import { asResponse } from "@/lib/route";
import { requireRole } from "@/lib/auth";
import { supabaseAdmin } from "@/lib/supabase";

export async function GET(req: NextRequest) {
  try {
    await requireRole("admin");
    const status = req.nextUrl.searchParams.get("status");
    let query = supabaseAdmin
      .from("support_tickets")
      .select("*, profiles!support_tickets_created_by_fkey(full_name, email)")
      .order("created_at", { ascending: false });
    if (status) query = query.eq("status", status);
    const { data } = await query;
    return ok(data ?? []);
  } catch (error) {
    return asResponse(error);
  }
}
