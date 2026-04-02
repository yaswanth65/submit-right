import { NextRequest } from "next/server";
import { ok, fail } from "@/lib/http";
import { asResponse } from "@/lib/route";
import { requireRole } from "@/lib/auth";
import { razorpay } from "@/lib/razorpay";
import { supabaseAdmin } from "@/lib/supabase";

export async function POST(req: NextRequest) {
  try {
    const user = await requireRole("client");
    const { documentId } = (await req.json()) as { documentId: string };
    const { data: document } = await supabaseAdmin
      .from("documents")
      .select("*")
      .eq("id", documentId)
      .eq("client_id", user.profileId)
      .single();

    if (!document) return fail("Document not found", 404);

    const amount = Math.round(Number(document.estimated_total ?? 0) * 100);
    const invoiceNumber = `INV-${Date.now()}`;

    const order = await razorpay.orders.create({
      amount,
      currency: "INR",
      receipt: invoiceNumber,
      notes: {
        documentId: document.id,
        clientId: user.profileId
      }
    });

    await supabaseAdmin.from("payment_transactions").insert({
      document_id: document.id,
      client_id: user.profileId,
      invoice_number: invoiceNumber,
      razorpay_order_id: order.id,
      gateway_status: "created",
      amount: Number(document.estimated_total ?? 0),
      status: "pending"
    });

    return ok(order);
  } catch (error) {
    return asResponse(error);
  }
}
