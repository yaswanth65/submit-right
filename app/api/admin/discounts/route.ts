import { NextRequest } from "next/server";
import { created, ok } from "@/lib/http";
import { asResponse, parseJson } from "@/lib/route";
import { requireRole } from "@/lib/auth";
import { discountCampaignSchema } from "@/lib/validators";
import { createDiscountCampaign, listDiscountCampaigns } from "@/lib/services/discount-service";

export async function GET() {
  try {
    await requireRole("admin");
    return ok(await listDiscountCampaigns());
  } catch (error) {
    return asResponse(error);
  }
}

export async function POST(req: NextRequest) {
  try {
    await requireRole("admin");
    const body = await parseJson(req, discountCampaignSchema);
    return created(await createDiscountCampaign(body));
  } catch (error) {
    return asResponse(error);
  }
}
