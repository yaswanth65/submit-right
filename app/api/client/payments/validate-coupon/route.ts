import { NextRequest } from "next/server";
import { ok } from "@/lib/http";
import { asResponse, parseJson } from "@/lib/route";
import { requireRole } from "@/lib/auth";
import { paymentCouponValidationSchema } from "@/lib/validators";
import { getPaymentDocument, resolveCoupon } from "@/lib/services/payment-service";

export async function POST(req: NextRequest) {
  try {
    const user = await requireRole("client");
    const body = await parseJson(req, paymentCouponValidationSchema);

    const document = await getPaymentDocument({
      documentId: body.documentId,
      clientId: user.profileId
    });

    const coupon = await resolveCoupon({
      document,
      clientId: user.profileId,
      couponCode: body.couponCode
    });

    return ok({
      isValid: true,
      couponId: coupon.coupon?.id ?? null,
      couponCode: coupon.couponCode,
      subtotal: coupon.subtotal,
      discountAmount: coupon.discountAmount,
      finalAmount: coupon.finalAmount
    });
  } catch (error) {
    return asResponse(error);
  }
}
