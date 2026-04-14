import { fail } from "@/lib/http";
import { supabaseAdmin } from "@/lib/supabase";

type ServiceKind = "service" | "package" | "domain";

type PaymentDocument = {
  id: string;
  client_id: string;
  document_title: string;
  service_id: string | null;
  estimated_total: number | null;
  word_count: number | null;
  rate_per_word: number | null;
  status: string;
  payment_status: string;
  services:
    | {
        id: string;
        title: string;
        kind: ServiceKind;
        base_price: number | null;
        rate_per_word: number | null;
      }
    | {
        id: string;
        title: string;
        kind: ServiceKind;
        base_price: number | null;
        rate_per_word: number | null;
      }[]
    | null;
};

type DiscountCampaign = {
  id: string;
  coupon_code: string;
  coupon_type: "discount" | "sale_price" | "buy_x_get_y";
  apply_to:
    | "all_services"
    | "all_packages"
    | "all_domains"
    | "specific_service"
    | "specific_package"
    | "specific_domain";
  target_item_id: string | null;
  discount_value: number | null;
  sale_price: number | null;
  buy_quantity: number | null;
  get_quantity: number | null;
  start_date: string;
  end_date: string | null;
  limit_total_uses: number | null;
  limit_per_customer: number | null;
  current_usage_count: number;
  is_active: boolean;
};

type CouponResolution = {
  coupon: DiscountCampaign | null;
  couponCode: string | null;
  discountAmount: number;
  finalAmount: number;
  subtotal: number;
};

function roundCurrency(value: number) {
  return Number(value.toFixed(2));
}

function normalizeService(service: PaymentDocument["services"]) {
  if (!service) return null;
  if (Array.isArray(service)) {
    return service[0] ?? null;
  }
  return service;
}

function getSubtotal(document: PaymentDocument) {
  const service = normalizeService(document.services);
  const estimated = Number(document.estimated_total ?? 0);

  if (estimated > 0) {
    return roundCurrency(estimated);
  }

  if (service?.kind === "package") {
    return roundCurrency(Number(service.base_price ?? service.rate_per_word ?? 0));
  }

  const words = Number(document.word_count ?? 0);
  const rate = Number(document.rate_per_word ?? service?.rate_per_word ?? 0);
  return roundCurrency(words * rate);
}

function generateInvoiceNumber() {
  return `INV-${Date.now()}`;
}

function generateMockOrderId() {
  return `order_mock_${Date.now()}_${Math.random().toString(36).slice(2, 8)}`;
}

function generateMockPaymentReference() {
  return `pay_mock_${Date.now()}_${Math.random().toString(36).slice(2, 8)}`;
}

function isCouponApplicable(coupon: DiscountCampaign, serviceKind: ServiceKind, serviceId: string) {
  if (coupon.apply_to === "all_services") return serviceKind === "service";
  if (coupon.apply_to === "all_packages") return serviceKind === "package";
  if (coupon.apply_to === "all_domains") return serviceKind === "domain";

  if (coupon.apply_to === "specific_service") {
    return serviceKind === "service" && coupon.target_item_id === serviceId;
  }

  if (coupon.apply_to === "specific_package") {
    return serviceKind === "package" && coupon.target_item_id === serviceId;
  }

  if (coupon.apply_to === "specific_domain") {
    return serviceKind === "domain" && coupon.target_item_id === serviceId;
  }

  return false;
}

function calculateDiscount(subtotal: number, coupon: DiscountCampaign) {
  if (coupon.coupon_type === "discount") {
    return Math.min(subtotal, Math.max(0, Number(coupon.discount_value ?? 0)));
  }

  if (coupon.coupon_type === "sale_price") {
    const salePrice = Number(coupon.sale_price ?? subtotal);
    return Math.max(0, subtotal - salePrice);
  }

  const buyQuantity = Number(coupon.buy_quantity ?? 0);
  const getQuantity = Number(coupon.get_quantity ?? 0);
  if (buyQuantity <= 0 || getQuantity <= 0) {
    return 0;
  }

  const freeRatio = getQuantity / (buyQuantity + getQuantity);
  return subtotal * freeRatio;
}

export async function getPaymentDocument(input: { documentId: string; clientId: string }) {
  const { data: document, error } = await supabaseAdmin
    .from("documents")
    .select("id, client_id, document_title, service_id, estimated_total, word_count, rate_per_word, status, payment_status, services(id, title, kind, base_price, rate_per_word)")
    .eq("id", input.documentId)
    .eq("client_id", input.clientId)
    .single();

  if (error || !document) {
    throw fail("Document not found", 404, error);
  }

  const typedDocument = document as PaymentDocument;
  const service = normalizeService(typedDocument.services);

  if (!typedDocument.service_id || !service) {
    throw fail("Select a service or package before checkout", 400);
  }

  return typedDocument;
}

export async function resolveCoupon(input: {
  document: PaymentDocument;
  clientId: string;
  couponCode?: string | null;
}) {
  const subtotal = getSubtotal(input.document);
  const rawCode = (input.couponCode ?? "").trim().toUpperCase();

  if (!rawCode) {
    return {
      coupon: null,
      couponCode: null,
      discountAmount: 0,
      finalAmount: subtotal,
      subtotal
    } satisfies CouponResolution;
  }

  const service = normalizeService(input.document.services);
  if (!service) {
    throw fail("Document service data is unavailable", 400);
  }

  const { data: coupon, error: couponError } = await supabaseAdmin
    .from("discount_campaigns")
    .select("*")
    .eq("coupon_code", rawCode)
    .eq("is_active", true)
    .single();

  if (couponError || !coupon) {
    throw fail("Coupon not found or inactive", 404);
  }

  const campaign = coupon as DiscountCampaign;
  const now = new Date();

  if (campaign.start_date && new Date(campaign.start_date) > now) {
    throw fail("Coupon is not active yet", 400);
  }

  if (campaign.end_date && new Date(campaign.end_date) < now) {
    throw fail("Coupon has expired", 400);
  }

  if (!isCouponApplicable(campaign, service.kind, service.id)) {
    throw fail("Coupon does not apply to this service or package", 400);
  }

  if (campaign.limit_total_uses != null && campaign.current_usage_count >= campaign.limit_total_uses) {
    throw fail("Coupon usage limit reached", 400);
  }

  if (campaign.limit_per_customer != null) {
    const { count } = await supabaseAdmin
      .from("discount_redemptions")
      .select("id", { count: "exact", head: true })
      .eq("discount_campaign_id", campaign.id)
      .eq("client_id", input.clientId);

    if ((count ?? 0) >= campaign.limit_per_customer) {
      throw fail("Coupon usage limit reached for your account", 400);
    }
  }

  const discountAmount = roundCurrency(calculateDiscount(subtotal, campaign));
  const finalAmount = roundCurrency(Math.max(0, subtotal - discountAmount));

  return {
    coupon: campaign,
    couponCode: campaign.coupon_code,
    discountAmount,
    finalAmount,
    subtotal
  } satisfies CouponResolution;
}

async function getPendingTransaction(input: { documentId: string; clientId: string }) {
  const { data } = await supabaseAdmin
    .from("payment_transactions")
    .select("*")
    .eq("document_id", input.documentId)
    .eq("client_id", input.clientId)
    .eq("status", "pending")
    .order("created_at", { ascending: false })
    .limit(1)
    .maybeSingle();

  return data;
}

export async function createMockOrder(input: { document: PaymentDocument; clientId: string }) {
  const subtotal = getSubtotal(input.document);
  if (subtotal <= 0) {
    throw fail("Unable to create order because amount is invalid", 400);
  }

  const existingPending = await getPendingTransaction({
    documentId: input.document.id,
    clientId: input.clientId
  });

  if (existingPending) {
    return {
      id: existingPending.razorpay_order_id || generateMockOrderId(),
      amount: Math.round(Number(existingPending.amount ?? subtotal) * 100),
      currency: "INR",
      receipt: existingPending.invoice_number,
      status: "created",
      notes: {
        documentId: input.document.id,
        clientId: input.clientId,
        provider: "mock"
      },
      transactionId: existingPending.id
    };
  }

  const invoiceNumber = generateInvoiceNumber();
  const orderId = generateMockOrderId();

  const { data: transaction, error } = await supabaseAdmin
    .from("payment_transactions")
    .insert({
      document_id: input.document.id,
      client_id: input.clientId,
      invoice_number: invoiceNumber,
      razorpay_order_id: orderId,
      gateway_status: "created",
      amount: subtotal,
      status: "pending",
      currency: "INR",
      breakdown: {
        subtotal,
        discount: 0,
        total: subtotal
      },
      event_timeline: [{ status: "created", at: new Date().toISOString(), source: "mock_checkout" }]
    })
    .select("id")
    .single();

  if (error || !transaction) {
    throw fail("Unable to create payment transaction", 500, error);
  }

  return {
    id: orderId,
    amount: Math.round(subtotal * 100),
    currency: "INR",
    receipt: invoiceNumber,
    status: "created",
    notes: {
      documentId: input.document.id,
      clientId: input.clientId,
      provider: "mock"
    },
    transactionId: transaction.id
  };
}

export async function completeMockCheckout(input: {
  document: PaymentDocument;
  clientId: string;
  couponCode?: string | null;
  paymentMethod?: string | null;
}) {
  const coupon = await resolveCoupon({
    document: input.document,
    clientId: input.clientId,
    couponCode: input.couponCode
  });

  const existingPending = await getPendingTransaction({
    documentId: input.document.id,
    clientId: input.clientId
  });

  const transactionBase = existingPending
    ? {
        id: existingPending.id,
        invoice_number: existingPending.invoice_number,
        razorpay_order_id: existingPending.razorpay_order_id || generateMockOrderId()
      }
    : {
        id: null as string | null,
        invoice_number: generateInvoiceNumber(),
        razorpay_order_id: generateMockOrderId()
      };

  const now = new Date().toISOString();
  const paymentReference = generateMockPaymentReference();

  let transactionId = transactionBase.id;

  if (!transactionId) {
    const { data: createdTransaction, error: createError } = await supabaseAdmin
      .from("payment_transactions")
      .insert({
        document_id: input.document.id,
        client_id: input.clientId,
        invoice_number: transactionBase.invoice_number,
        razorpay_order_id: transactionBase.razorpay_order_id,
        amount: coupon.finalAmount,
        status: "pending",
        gateway_status: "created",
        currency: "INR",
        breakdown: {
          subtotal: coupon.subtotal,
          discount: coupon.discountAmount,
          total: coupon.finalAmount,
          couponCode: coupon.couponCode,
          couponId: coupon.coupon?.id ?? null
        },
        event_timeline: [{ status: "created", at: now, source: "mock_checkout" }]
      })
      .select("id")
      .single();

    if (createError || !createdTransaction) {
      throw fail("Unable to create payment transaction", 500, createError);
    }

    transactionId = createdTransaction.id;
  }

  const { data: paidTransaction, error: updateTransactionError } = await supabaseAdmin
    .from("payment_transactions")
    .update({
      amount: coupon.finalAmount,
      status: "paid",
      gateway_status: "captured",
      payment_method: input.paymentMethod || "mock_checkout",
      payment_reference_number: paymentReference,
      razorpay_payment_id: paymentReference,
      breakdown: {
        subtotal: coupon.subtotal,
        discount: coupon.discountAmount,
        total: coupon.finalAmount,
        couponCode: coupon.couponCode,
        couponId: coupon.coupon?.id ?? null
      },
      event_timeline: [
        { status: "created", at: now, source: "mock_checkout" },
        { status: "paid", at: now, source: "mock_checkout" }
      ],
      paid_at: now,
      updated_at: now
    })
    .eq("id", transactionId)
    .select("*")
    .single();

  if (updateTransactionError || !paidTransaction) {
    throw fail("Unable to complete payment", 500, updateTransactionError);
  }

  const shouldMarkDocumentCompleted = input.document.status === "payment_needed";

  const { data: updatedDocument, error: updateDocumentError } = await supabaseAdmin
    .from("documents")
    .update({
      payment_status: "paid",
      status: shouldMarkDocumentCompleted ? "completed" : input.document.status,
      completed_at: shouldMarkDocumentCompleted ? now : undefined,
      last_activity_at: now,
      updated_at: now
    })
    .eq("id", input.document.id)
    .eq("client_id", input.clientId)
    .select("id, status, payment_status")
    .single();

  if (updateDocumentError || !updatedDocument) {
    throw fail("Unable to update document payment state", 500, updateDocumentError);
  }

  if (coupon.coupon && coupon.discountAmount > 0) {
    const { data: existingRedemption } = await supabaseAdmin
      .from("discount_redemptions")
      .select("id")
      .eq("discount_campaign_id", coupon.coupon.id)
      .eq("document_id", input.document.id)
      .maybeSingle();

    if (!existingRedemption) {
      await supabaseAdmin.from("discount_redemptions").insert({
        discount_campaign_id: coupon.coupon.id,
        document_id: input.document.id,
        client_id: input.clientId,
        discount_amount: coupon.discountAmount
      });

      await supabaseAdmin
        .from("discount_campaigns")
        .update({
          current_usage_count: coupon.coupon.current_usage_count + 1,
          updated_at: now
        })
        .eq("id", coupon.coupon.id);
    }
  }

  await supabaseAdmin.from("notifications").insert({
    user_id: input.clientId,
    document_id: input.document.id,
    type: "payment",
    title: "Payment received",
    body: `Payment received for invoice ${paidTransaction.invoice_number}`
  });

  return {
    transaction: paidTransaction,
    document: updatedDocument,
    billing: {
      subtotal: coupon.subtotal,
      discountAmount: coupon.discountAmount,
      total: coupon.finalAmount,
      couponCode: coupon.couponCode
    }
  };
}
