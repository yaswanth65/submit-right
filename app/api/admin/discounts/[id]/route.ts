import { NextRequest } from "next/server";
import { fail, ok } from "@/lib/http";
import { asResponse, parseJson } from "@/lib/route";
import { requireRole } from "@/lib/auth";
import { discountCampaignUpdateSchema } from "@/lib/validators";
import { deleteDiscountCampaign, listDiscountCampaigns, updateDiscountCampaign } from "@/lib/services/discount-service";

export async function GET(_req: NextRequest, { params }: { params: { id: string } }) {
  try {
    await requireRole("admin");
    const campaigns = await listDiscountCampaigns();
    const campaign = campaigns.cards.find((item) => item.id === params.id);
    if (!campaign) return fail("Discount campaign not found", 404);
    return ok(campaign);
  } catch (error) {
    return asResponse(error);
  }
}

export async function PATCH(req: NextRequest, { params }: { params: { id: string } }) {
  try {
    await requireRole("admin");
    const body = await parseJson(req, discountCampaignUpdateSchema);
    return ok(await updateDiscountCampaign(params.id, body));
  } catch (error) {
    return asResponse(error);
  }
}

export async function DELETE(_req: NextRequest, { params }: { params: { id: string } }) {
  try {
    await requireRole("admin");
    return ok(await deleteDiscountCampaign(params.id));
  } catch (error) {
    return asResponse(error);
  }
}
