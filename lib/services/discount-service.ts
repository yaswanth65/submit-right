import { fail } from "@/lib/http";
import { supabaseAdmin } from "@/lib/supabase";
import type { DiscountApplyTo, DiscountCampaignType } from "@/lib/types";

export type DiscountCampaignRow = {
  id: string;
  coupon_code: string;
  coupon_name: string;
  coupon_type: DiscountCampaignType;
  apply_to: DiscountApplyTo;
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
  description: string | null;
  created_at: string;
  updated_at: string;
};

export type DiscountCampaignInput = {
  couponCode: string;
  couponName: string;
  couponType: DiscountCampaignType;
  applyTo: DiscountApplyTo;
  targetItemId?: string | null;
  discountValue?: number | null;
  salePrice?: number | null;
  buyQuantity?: number | null;
  getQuantity?: number | null;
  startDate: string;
  endDate?: string | null;
  limitTotalUses?: number | null;
  limitPerCustomer?: number | null;
  isActive?: boolean;
  description?: string | null;
};

function toDiscountCard(row: DiscountCampaignRow) {
  return {
    id: row.id,
    couponCode: row.coupon_code,
    couponName: row.coupon_name,
    couponType: row.coupon_type,
    applyTo: row.apply_to,
    targetItemId: row.target_item_id,
    discountValue: row.discount_value,
    salePrice: row.sale_price,
    buyQuantity: row.buy_quantity,
    getQuantity: row.get_quantity,
    startDate: row.start_date,
    endDate: row.end_date,
    limitTotalUses: row.limit_total_uses,
    limitPerCustomer: row.limit_per_customer,
    currentUsageCount: row.current_usage_count,
    isActive: row.is_active,
    description: row.description,
    createdAt: row.created_at,
    updatedAt: row.updated_at
  };
}

export async function listDiscountCampaigns() {
  const { data, error } = await supabaseAdmin
    .from("discount_campaigns")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) {
    throw fail("Unable to load discount campaigns", 500, error);
  }

  const rows = (data ?? []) as DiscountCampaignRow[];

  return {
    rows,
    cards: rows.map(toDiscountCard)
  };
}

export async function createDiscountCampaign(input: DiscountCampaignInput) {
  const { data, error } = await supabaseAdmin
    .from("discount_campaigns")
    .insert({
      coupon_code: input.couponCode,
      coupon_name: input.couponName,
      coupon_type: input.couponType,
      apply_to: input.applyTo,
      target_item_id: input.targetItemId ?? null,
      discount_value: input.discountValue ?? null,
      sale_price: input.salePrice ?? null,
      buy_quantity: input.buyQuantity ?? null,
      get_quantity: input.getQuantity ?? null,
      start_date: input.startDate,
      end_date: input.endDate ?? null,
      limit_total_uses: input.limitTotalUses ?? null,
      limit_per_customer: input.limitPerCustomer ?? null,
      is_active: input.isActive ?? true,
      description: input.description ?? null
    })
    .select("*")
    .single();

  if (error || !data) {
    throw fail("Unable to create discount campaign", 500, error);
  }

  return toDiscountCard(data as DiscountCampaignRow);
}

export async function updateDiscountCampaign(id: string, input: Partial<DiscountCampaignInput>) {
  const payload: Record<string, unknown> = { updated_at: new Date().toISOString() };

  if (input.couponCode !== undefined) payload.coupon_code = input.couponCode;
  if (input.couponName !== undefined) payload.coupon_name = input.couponName;
  if (input.couponType !== undefined) payload.coupon_type = input.couponType;
  if (input.applyTo !== undefined) payload.apply_to = input.applyTo;
  if (input.targetItemId !== undefined) payload.target_item_id = input.targetItemId ?? null;
  if (input.discountValue !== undefined) payload.discount_value = input.discountValue ?? null;
  if (input.salePrice !== undefined) payload.sale_price = input.salePrice ?? null;
  if (input.buyQuantity !== undefined) payload.buy_quantity = input.buyQuantity ?? null;
  if (input.getQuantity !== undefined) payload.get_quantity = input.getQuantity ?? null;
  if (input.startDate !== undefined) payload.start_date = input.startDate;
  if (input.endDate !== undefined) payload.end_date = input.endDate ?? null;
  if (input.limitTotalUses !== undefined) payload.limit_total_uses = input.limitTotalUses ?? null;
  if (input.limitPerCustomer !== undefined) payload.limit_per_customer = input.limitPerCustomer ?? null;
  if (input.isActive !== undefined) payload.is_active = input.isActive;
  if (input.description !== undefined) payload.description = input.description ?? null;

  const { data, error } = await supabaseAdmin
    .from("discount_campaigns")
    .update(payload)
    .eq("id", id)
    .select("*")
    .single();

  if (error || !data) {
    throw fail("Unable to update discount campaign", 500, error);
  }

  return toDiscountCard(data as DiscountCampaignRow);
}

export async function deleteDiscountCampaign(id: string) {
  const { error } = await supabaseAdmin.from("discount_campaigns").delete().eq("id", id);

  if (error) {
    throw fail("Unable to delete discount campaign", 500, error);
  }

  return { deleted: true };
}
