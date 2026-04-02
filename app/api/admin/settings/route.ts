import { NextRequest } from "next/server";
import { ok } from "@/lib/http";
import { asResponse } from "@/lib/route";
import { requireRole } from "@/lib/auth";
import { supabaseAdmin } from "@/lib/supabase";

export async function GET() {
  try {
    await requireRole("admin");
    const { data } = await supabaseAdmin.from("app_settings").select("*").limit(1).single();
    return ok(data);
  } catch (error) {
    return asResponse(error);
  }
}

export async function PATCH(req: NextRequest) {
  try {
    const admin = await requireRole("admin");
    const body = (await req.json()) as {
      supportEmail: string;
      defaultTimezone: string;
      defaultCurrency: string;
    };
    const { data: settings } = await supabaseAdmin.from("app_settings").select("id").limit(1).single();
    const { data } = await supabaseAdmin
      .from("app_settings")
      .update({
        support_email: body.supportEmail,
        default_timezone: body.defaultTimezone,
        default_currency: body.defaultCurrency,
        updated_by: admin.profileId,
        updated_at: new Date().toISOString()
      })
      .eq("id", settings!.id)
      .select("*")
      .single();
    return ok(data);
  } catch (error) {
    return asResponse(error);
  }
}
