import crypto from "crypto";
import Razorpay from "razorpay";
import { env } from "@/lib/env";

export const razorpay = new Razorpay({
  key_id: env.RAZORPAY_KEY_ID,
  key_secret: env.RAZORPAY_KEY_SECRET
});

export function verifyRazorpaySignature(payload: string, signature: string) {
  const digest = crypto
    .createHmac("sha256", env.RAZORPAY_KEY_SECRET)
    .update(payload)
    .digest("hex");

  return digest === signature;
}
