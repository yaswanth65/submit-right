import { NextRequest } from "next/server";
import { ok } from "@/lib/http";
import { asResponse, parseJson } from "@/lib/route";
import { getAuthUser } from "@/lib/auth";
import { updateProfileSchema } from "@/lib/validators";
import { supabaseAdmin } from "@/lib/supabase";

export async function GET() {
  try {
    const user = await getAuthUser();
    const { data } = await supabaseAdmin
      .from("profiles")
      .select("*")
      .eq("id", user.profileId)
      .single();
    return ok(data);
  } catch (error) {
    return asResponse(error);
  }
}

export async function PATCH(req: NextRequest) {
  try {
    const user = await getAuthUser();
    const body = await parseJson(req, updateProfileSchema);
    const payload: Record<string, unknown> = {
      updated_at: new Date().toISOString()
    };

    if (body.fullName !== undefined) payload.full_name = body.fullName;
    if (body.email !== undefined) payload.email = body.email;
    if (body.mobileNumber !== undefined) payload.mobile_number = body.mobileNumber;
    if (body.country !== undefined) payload.country = body.country;
    if (body.state !== undefined) payload.state = body.state;
    if (body.yearsOfExperience !== undefined) payload.years_of_experience = body.yearsOfExperience;
    if (body.primaryLanguage !== undefined) payload.primary_language = body.primaryLanguage;
    if (body.primaryExpertise !== undefined) payload.primary_expertise = body.primaryExpertise;
    if (body.languagePairs !== undefined) payload.language_pairs = body.languagePairs;

    const { data } = await supabaseAdmin
      .from("profiles")
      .update(payload)
      .eq("id", user.profileId)
      .select("*")
      .single();

    return ok(data);
  } catch (error) {
    return asResponse(error);
  }
}
