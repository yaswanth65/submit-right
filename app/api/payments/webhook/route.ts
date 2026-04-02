import { headers } from "next/headers";
import { ok, fail } from "@/lib/http";
import { verifyRazorpaySignature } from "@/lib/razorpay";
import { supabaseAdmin } from "@/lib/supabase";
import { createNotification } from "@/lib/services/document-service";

export async function POST(req: Request) {
  const rawBody = await req.text();
  const signature = (await headers()).get("x-razorpay-signature");

  if (!signature || !verifyRazorpaySignature(rawBody, signature)) {
    return fail("Invalid webhook signature", 401);
  }

  const payload = JSON.parse(rawBody);
  const event = payload.event as string;
  const paymentEntity = payload.payload?.payment?.entity;
  const orderId = paymentEntity?.order_id as string | undefined;
  const paymentId = paymentEntity?.id as string | undefined;
  const method = paymentEntity?.method as string | undefined;

  if (event === "payment.captured" && orderId) {
    const { data: transaction } = await supabaseAdmin
      .from("payment_transactions")
      .update({
        razorpay_payment_id: paymentId,
        payment_method: method,
        gateway_status: "captured",
        status: "paid",
        paid_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      })
      .eq("razorpay_order_id", orderId)
      .select("*")
      .single();

    if (transaction) {
      await supabaseAdmin
        .from("documents")
        .update({
          status: "completed",
          payment_status: "paid",
          completed_at: new Date().toISOString(),
          last_activity_at: new Date().toISOString()
        })
        .eq("id", transaction.document_id);

      await createNotification({
        userId: transaction.client_id,
        documentId: transaction.document_id,
        type: "payment",
        title: "Payment received",
        body: `Payment received for invoice ${transaction.invoice_number}.`
      });
    }
  }

  return ok({ received: true });
}
