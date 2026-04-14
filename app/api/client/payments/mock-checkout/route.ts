import { NextRequest } from "next/server";
import { ok } from "@/lib/http";
import { asResponse, parseJson } from "@/lib/route";
import { requireRole } from "@/lib/auth";
import { mockCheckoutSchema } from "@/lib/validators";
import { completeMockCheckout, getPaymentDocument } from "@/lib/services/payment-service";

export async function POST(req: NextRequest) {
  try {
    const user = await requireRole("client");
    const body = await parseJson(req, mockCheckoutSchema);

    const document = await getPaymentDocument({
      documentId: body.documentId,
      clientId: user.profileId
    });

    return ok(
      await completeMockCheckout({
        document,
        clientId: user.profileId,
        couponCode: body.couponCode,
        paymentMethod: body.paymentMethod
      })
    );
  } catch (error) {
    return asResponse(error);
  }
}
