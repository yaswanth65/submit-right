import { NextRequest } from "next/server";
import { ok } from "@/lib/http";
import { asResponse } from "@/lib/route";
import { requireRole } from "@/lib/auth";
import { supabaseAdmin } from "@/lib/supabase";

export async function GET(req: NextRequest) {
  try {
    await requireRole("admin");
    const search = req.nextUrl.searchParams.get("search");
    let query = supabaseAdmin
      .from("profiles")
      .select("*, editor_availability(*)")
      .eq("role", "editor");
    if (search) query = query.ilike("full_name", `%${search}%`);
    const { data } = await query.order("created_at", { ascending: false });
    return ok(data ?? []);
  } catch (error) {
    return asResponse(error);
  }
}
