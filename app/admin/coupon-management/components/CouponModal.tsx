import React, { useEffect, useMemo, useState } from "react";
import { Calendar, ChevronDown, Info, X } from "lucide-react";
import { apiGet, apiRequest } from "@/lib/client-api";
import {
  CouponApplyScope,
  CouponCampaign,
  CouponCatalogOption,
  CouponCatalogOptionsResponse,
  EditableCouponType,
  CouponFormState,
  CouponType
} from "./types";

const typeCards: Array<{
  value: EditableCouponType;
  label: string;
}> = [
  {
    value: "flat_discount",
    label: "Rupee Discount"
  },
  {
    value: "percentage_discount",
    label: "Percentage Discount"
  },
  {
    value: "sale_price",
    label: "Sale Price"
  },
  {
    value: "buy_x_get_y",
    label: "Buy X Get Y Free"
  }
];

const applyScopeOptions: Array<{ value: CouponApplyScope; label: string }> = [
  { value: "all_services", label: "All Services" },
  { value: "all_packages", label: "All Packages" },
  { value: "all_domains", label: "All Domains" },
  { value: "specific_service", label: "Specific Service" },
  { value: "specific_package", label: "Specific Package" },
  { value: "specific_domain", label: "Specific Domain" }
];

const inputClassName =
  "w-full h-[40px] rounded-[8px] border border-[#EAECF0] bg-white px-3 text-[14px] text-[#171717] placeholder-[#9AA4B2] outline-none focus:border-[#00A0E3] focus:ring-1 focus:ring-[#00A0E3]";

function toDateInput(value: string | null | undefined) {
  if (!value) return "";
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return "";
  return date.toISOString().slice(0, 10);
}

function toNullableNumber(value: string) {
  const normalized = value.trim();
  if (!normalized) return null;
  const numberValue = Number(normalized);
  return Number.isFinite(numberValue) ? numberValue : null;
}

function toNullableInteger(value: string) {
  const normalized = value.trim();
  if (!normalized) return null;
  const numberValue = Number(normalized);
  if (!Number.isInteger(numberValue)) return null;
  return numberValue;
}

function toIsoDate(value: string) {
  return `${value}T00:00:00.000Z`;
}

function defaultApplyScope(type: CouponType | EditableCouponType): CouponApplyScope {
  if (type === "buy_x_get_y") return "specific_service";
  return "all_services";
}

function toEditableCouponType(type: CouponType | null | undefined, description?: string | null): EditableCouponType {
  if (type === "discount") {
    const isPercentageMode = String(description ?? "").toLowerCase().includes("discount_mode:percentage");
    return isPercentageMode ? "percentage_discount" : "flat_discount";
  }

  if (type === "sale_price") return "sale_price";
  if (type === "buy_x_get_y") return "buy_x_get_y";
  return "flat_discount";
}

function buildInitialForm(mode: "create" | "edit", initialCoupon: CouponCampaign | null): CouponFormState {
  const today = new Date().toISOString().slice(0, 10);
  const type = toEditableCouponType(initialCoupon?.couponType, initialCoupon?.description);

  return {
    couponType: type,
    code: initialCoupon?.couponCode ?? (mode === "create" ? "SUBMIT500" : ""),
    name: initialCoupon?.couponName ?? "",
    applyScope: initialCoupon?.applyTo ?? defaultApplyScope(type),
    targetItemId: initialCoupon?.targetItemId ?? "",
    discountValue: initialCoupon?.discountValue != null ? String(initialCoupon.discountValue) : "",
    salePrice: initialCoupon?.salePrice != null ? String(initialCoupon.salePrice) : "",
    buyQty: initialCoupon?.buyQuantity != null ? String(initialCoupon.buyQuantity) : "1",
    getQty: initialCoupon?.getQuantity != null ? String(initialCoupon.getQuantity) : "1",
    startDate: toDateInput(initialCoupon?.startDate) || today,
    endDate: toDateInput(initialCoupon?.endDate),
    noEndDate: !initialCoupon?.endDate,
    limitTotalUses: (initialCoupon?.limitTotalUses ?? 0) > 0,
    totalUsesLimit: initialCoupon?.limitTotalUses != null ? String(initialCoupon.limitTotalUses) : "",
    limitPerCustomer: (initialCoupon?.limitPerCustomer ?? 0) > 0,
    usesPerCustomerLimit: initialCoupon?.limitPerCustomer != null ? String(initialCoupon.limitPerCustomer) : "",
    isActive: initialCoupon?.isActive ?? true
  };
}

function getScopeOptions(scope: CouponApplyScope, options: CouponCatalogOptionsResponse): CouponCatalogOption[] {
  if (scope === "specific_service") return options.services;
  if (scope === "specific_package") return options.packages;
  if (scope === "specific_domain") return options.domains;
  return [];
}

type CouponModalProps = {
  mode: "create" | "edit";
  isOpen: boolean;
  onClose: () => void;
  onSaved: () => Promise<void> | void;
  initialCoupon: CouponCampaign | null;
};

export function CouponModal({ mode, isOpen, onClose, onSaved, initialCoupon }: CouponModalProps) {
  const [form, setForm] = useState<CouponFormState>(() => buildInitialForm(mode, initialCoupon));
  const [catalogOptions, setCatalogOptions] = useState<CouponCatalogOptionsResponse>({
    services: [],
    packages: [],
    domains: []
  });
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!isOpen) return;
    setForm(buildInitialForm(mode, initialCoupon));
    setError(null);
  }, [isOpen, mode, initialCoupon]);

  useEffect(() => {
    if (!isOpen) return;

    let cancelled = false;

    async function loadOptions() {
      try {
        const options = await apiGet<CouponCatalogOptionsResponse>("/api/admin/catalog/options");
        if (!cancelled) {
          setCatalogOptions(options);
        }
      } catch {
        if (!cancelled) {
          setCatalogOptions({ services: [], packages: [], domains: [] });
        }
      }
    }

    loadOptions();

    return () => {
      cancelled = true;
    };
  }, [isOpen]);

  const targetOptions = useMemo(() => getScopeOptions(form.applyScope, catalogOptions), [form.applyScope, catalogOptions]);
  const needsTarget = form.applyScope.startsWith("specific_");

  if (!isOpen) return null;

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError(null);

    if (!form.code.trim() || !form.name.trim()) {
      setError("Coupon code and coupon name are required.");
      return;
    }

    if (!form.startDate) {
      setError("Start date is required.");
      return;
    }

    if (needsTarget && !form.targetItemId) {
      setError("Please select a target item for this scope.");
      return;
    }

    if (["flat_discount", "percentage_discount"].includes(form.couponType) && toNullableNumber(form.discountValue) == null) {
      setError("Discount value is required for discount coupons.");
      return;
    }

    if (form.couponType === "percentage_discount") {
      const value = toNullableNumber(form.discountValue);
      if (value == null || value <= 0 || value > 100) {
        setError("Percentage discount must be greater than 0 and up to 100.");
        return;
      }
    }

    if (form.couponType === "sale_price" && toNullableNumber(form.salePrice) == null) {
      setError("Sale price is required for sale price coupons.");
      return;
    }

    if (
      form.couponType === "buy_x_get_y" &&
      (toNullableInteger(form.buyQty) == null || toNullableInteger(form.getQty) == null)
    ) {
      setError("Buy and get quantities are required for Buy X Get Y coupons.");
      return;
    }

    const payload = {
      couponCode: form.code.trim().toUpperCase(),
      couponName: form.name.trim(),
      couponType: ["flat_discount", "percentage_discount"].includes(form.couponType)
        ? "discount"
        : form.couponType,
      applyTo: form.applyScope,
      targetItemId: needsTarget ? form.targetItemId : null,
      discountValue: ["flat_discount", "percentage_discount"].includes(form.couponType)
        ? toNullableNumber(form.discountValue)
        : null,
      salePrice: form.couponType === "sale_price" ? toNullableNumber(form.salePrice) : null,
      buyQuantity: form.couponType === "buy_x_get_y" ? toNullableInteger(form.buyQty) : null,
      getQuantity: form.couponType === "buy_x_get_y" ? toNullableInteger(form.getQty) : null,
      startDate: toIsoDate(form.startDate),
      endDate: form.noEndDate || !form.endDate ? null : toIsoDate(form.endDate),
      limitTotalUses: form.limitTotalUses ? toNullableInteger(form.totalUsesLimit) : null,
      limitPerCustomer: form.limitPerCustomer ? toNullableInteger(form.usesPerCustomerLimit) : null,
      isActive: form.isActive,
      description:
        form.couponType === "percentage_discount"
          ? "discount_mode:percentage"
          : form.couponType === "flat_discount"
            ? "discount_mode:flat"
            : null
    };

    setIsSaving(true);
    try {
      const path = mode === "create" ? "/api/admin/discounts" : `/api/admin/discounts/${initialCoupon?.id}`;
      await apiRequest(path, {
        method: mode === "create" ? "POST" : "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
      });
      await onSaved();
      onClose();
    } catch (saveError) {
      setError(saveError instanceof Error ? saveError.message : "Unable to save coupon");
    } finally {
      setIsSaving(false);
    }
  }

  async function handleDelete() {
    if (mode !== "edit" || !initialCoupon?.id) return;
    const confirmed = window.confirm("Delete this coupon?");
    if (!confirmed) return;

    setIsSaving(true);
    setError(null);

    try {
      await apiRequest(`/api/admin/discounts/${initialCoupon.id}`, {
        method: "DELETE"
      });
      await onSaved();
      onClose();
    } catch (deleteError) {
      setError(deleteError instanceof Error ? deleteError.message : "Unable to delete coupon");
    } finally {
      setIsSaving(false);
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 font-dm-sans sm:p-4">
      <div className="absolute inset-0 bg-[#171717]/80 backdrop-blur-[5px]" onClick={onClose}></div>

      <div className="relative z-10 w-full max-w-[600px] overflow-hidden rounded-[16px] border border-[#EAECF0] bg-white shadow-[0_0_27px_rgba(23,23,23,0.2)]">
        <div className="flex h-[60px] items-center justify-between border-b border-[#EAECF0] px-4 sm:px-6">
          <div className="text-[18px] font-medium leading-[1.2] text-[#171717]">{mode === "create" ? "New Coupon" : "Edit Coupon"}</div>
          <button
            onClick={onClose}
            className="inline-flex h-8 w-8 items-center justify-center rounded-[6px] text-[#525866] hover:bg-[#F5F7FA]"
            aria-label="Close modal"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="max-h-[calc(100vh-160px)] space-y-4 overflow-y-auto p-4 sm:p-6">
          <div>
            <div className="mb-1.5 text-[14px] font-medium text-[#0E121B]">Select coupon type:</div>
            <div className="grid grid-cols-1 gap-1.5 sm:grid-cols-2">
              {typeCards.map((card) => {
                const isSelected = form.couponType === card.value;
                return (
                  <button
                    key={card.value}
                    type="button"
                    onClick={() => setForm((prev) => ({ ...prev, couponType: card.value }))}
                    className={`flex h-[40px] items-center gap-2.5 rounded-[8px] border px-3 text-left text-[14px] text-[#525866] transition-colors ${
                      isSelected ? "border-[#00A0E3] bg-[#EFF9FF]" : "border-[#EAECF0] bg-white"
                    }`}
                  >
                    <span
                      className={`inline-flex h-5 w-5 items-center justify-center rounded-full border ${
                        isSelected ? "border-[#00A0E3]" : "border-[#D7DCE2]"
                      }`}
                    >
                      <span className={`h-2.5 w-2.5 rounded-full ${isSelected ? "bg-[#00A0E3]" : "bg-transparent"}`}></span>
                    </span>
                    {card.label}
                  </button>
                );
              })}
            </div>
          </div>

          <div className="space-y-4 rounded-[12px] border border-[#EAECF0] p-4 sm:p-5">
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div>
                <label className="mb-1.5 block text-[14px] font-medium text-[#0E121B]">Coupon Code</label>
                <input
                  className={inputClassName}
                  value={form.code}
                  onChange={(event) => setForm((prev) => ({ ...prev, code: event.target.value.toUpperCase() }))}
                  placeholder="SUBMIT500"
                />
              </div>

              <div>
                <label className="mb-1.5 block text-[14px] font-medium text-[#0E121B]">Coupon Name</label>
                <input
                  className={inputClassName}
                  value={form.name}
                  onChange={(event) => setForm((prev) => ({ ...prev, name: event.target.value }))}
                  placeholder="First Order"
                />
              </div>
            </div>

            <div className="h-px bg-[#EAECF0]"></div>

            {form.couponType === "flat_discount" ? (
              <div>
                <label className="mb-1.5 block text-[14px] font-medium text-[#0E121B]">Discount Amount (INR)</label>
                <input
                  className={inputClassName}
                  value={form.discountValue}
                  onChange={(event) => setForm((prev) => ({ ...prev, discountValue: event.target.value }))}
                  placeholder="500"
                />
              </div>
            ) : null}

            {form.couponType === "percentage_discount" ? (
              <div>
                <label className="mb-1.5 block text-[14px] font-medium text-[#0E121B]">Discount Percentage</label>
                <input
                  className={inputClassName}
                  value={form.discountValue}
                  onChange={(event) => setForm((prev) => ({ ...prev, discountValue: event.target.value }))}
                  placeholder="15"
                />
              </div>
            ) : null}

            {form.couponType === "sale_price" ? (
              <div>
                <label className="mb-1.5 block text-[14px] font-medium text-[#0E121B]">Sale Price</label>
                <input
                  className={inputClassName}
                  value={form.salePrice}
                  onChange={(event) => setForm((prev) => ({ ...prev, salePrice: event.target.value }))}
                  placeholder="1200"
                />
              </div>
            ) : null}

            {form.couponType === "buy_x_get_y" ? (
              <div>
                <div className="mb-2 text-[14px] font-semibold text-[#171717]">Offer</div>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="mb-1.5 block text-[14px] font-medium text-[#0E121B]">Buy</label>
                    <input
                      type="number"
                      min={1}
                      className={inputClassName}
                      value={form.buyQty}
                      onChange={(event) => setForm((prev) => ({ ...prev, buyQty: event.target.value }))}
                    />
                  </div>
                  <div>
                    <label className="mb-1.5 block text-[14px] font-medium text-[#0E121B]">Get</label>
                    <input
                      type="number"
                      min={1}
                      className={inputClassName}
                      value={form.getQty}
                      onChange={(event) => setForm((prev) => ({ ...prev, getQty: event.target.value }))}
                    />
                  </div>
                </div>
                <div className="mt-2 flex items-center gap-1.5 text-[13px] text-[#717784]">
                  <Info className="h-3.5 w-3.5" />
                  e.g., Buy 1 item, get 1 for free.
                </div>
              </div>
            ) : null}

            <div className="h-px bg-[#EAECF0]"></div>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div>
                <label className="mb-1.5 block text-[14px] font-medium text-[#0E121B]">Apply to</label>
                <div className="relative">
                  <select
                    className={`${inputClassName} appearance-none pr-9`}
                    value={form.applyScope}
                    onChange={(event) =>
                      setForm((prev) => ({
                        ...prev,
                        applyScope: event.target.value as CouponApplyScope,
                        targetItemId: ""
                      }))
                    }
                  >
                    {applyScopeOptions.map((scope) => (
                      <option key={scope.value} value={scope.value}>
                        {scope.label}
                      </option>
                    ))}
                  </select>
                  <ChevronDown className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[#8A94A6]" />
                </div>
              </div>

              {needsTarget ? (
                <div>
                  <label className="mb-1.5 block text-[14px] font-medium text-[#0E121B]">Target Item</label>
                  <div className="relative">
                    <select
                      className={`${inputClassName} appearance-none pr-9`}
                      value={form.targetItemId}
                      onChange={(event) => setForm((prev) => ({ ...prev, targetItemId: event.target.value }))}
                    >
                      <option value="">Select item</option>
                      {targetOptions.map((option) => (
                        <option key={option.id} value={option.id}>
                          {option.title}
                        </option>
                      ))}
                    </select>
                    <ChevronDown className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[#8A94A6]" />
                  </div>
                </div>
              ) : null}
            </div>

            <div className="h-px bg-[#EAECF0]"></div>

            <div>
              <div className="mb-2 text-[16px] font-semibold text-[#171717]">Valid Between</div>
              <div className="mb-2.5 grid grid-cols-1 gap-3 sm:grid-cols-2">
                <div>
                  <label className="mb-1.5 block text-[14px] font-medium text-[#0E121B]">Start Date</label>
                  <div className="relative">
                    <input
                      type="date"
                      className={`${inputClassName} pr-9`}
                      value={form.startDate}
                      onChange={(event) => setForm((prev) => ({ ...prev, startDate: event.target.value }))}
                    />
                    <Calendar className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[#8A94A6]" />
                  </div>
                </div>
                <div>
                  <label className="mb-1.5 block text-[14px] font-medium text-[#0E121B]">End Date</label>
                  <div className="relative">
                    <input
                      type="date"
                      className={`${inputClassName} pr-9 disabled:bg-[#F5F7FA]`}
                      value={form.endDate}
                      onChange={(event) => setForm((prev) => ({ ...prev, endDate: event.target.value }))}
                      disabled={form.noEndDate}
                    />
                    <Calendar className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[#8A94A6]" />
                  </div>
                </div>
              </div>

              <label className="flex items-center gap-2 text-[14px] text-[#525866]">
                <input
                  type="checkbox"
                  className="h-4 w-4 rounded border-[#D7DCE2] accent-[#00A0E3]"
                  checked={form.noEndDate}
                  onChange={(event) => setForm((prev) => ({ ...prev, noEndDate: event.target.checked }))}
                />
                Do not set an end date
              </label>
            </div>

            <label className="flex items-center gap-2 text-[14px] text-[#525866]">
              <input
                type="checkbox"
                className="h-4 w-4 rounded border-[#D7DCE2] accent-[#00A0E3]"
                checked={form.isActive}
                onChange={(event) => setForm((prev) => ({ ...prev, isActive: event.target.checked }))}
              />
              Coupon is active
            </label>
          </div>

          <div className="space-y-3">
            <div>
              <label className="flex items-center gap-2 text-[14px] text-[#525866]">
                <input
                  type="checkbox"
                  className="h-4 w-4 rounded border-[#D7DCE2] accent-[#00A0E3]"
                  checked={form.limitTotalUses}
                  onChange={(event) => setForm((prev) => ({ ...prev, limitTotalUses: event.target.checked }))}
                />
                Limit total number of uses for this coupon
              </label>
              {form.limitTotalUses ? (
                <input
                  type="number"
                  min="1"
                  className={`ml-6 mt-2 ${inputClassName}`}
                  value={form.totalUsesLimit}
                  onChange={(event) => setForm((prev) => ({ ...prev, totalUsesLimit: event.target.value }))}
                  placeholder="Enter number of uses"
                />
              ) : null}
            </div>

            <div>
              <label className="flex items-center gap-2 text-[14px] text-[#525866]">
                <input
                  type="checkbox"
                  className="h-4 w-4 rounded border-[#D7DCE2] accent-[#00A0E3]"
                  checked={form.limitPerCustomer}
                  onChange={(event) => setForm((prev) => ({ ...prev, limitPerCustomer: event.target.checked }))}
                />
                Limit uses per customer
              </label>
              {form.limitPerCustomer ? (
                <input
                  type="number"
                  min="1"
                  className={`ml-6 mt-2 ${inputClassName}`}
                  value={form.usesPerCustomerLimit}
                  onChange={(event) => setForm((prev) => ({ ...prev, usesPerCustomerLimit: event.target.value }))}
                  placeholder="Enter number of uses"
                />
              ) : null}
            </div>
          </div>

          {error ? <div className="rounded-[8px] border border-[#FECACA] bg-[#FEF2F2] px-3 py-2 text-[13px] text-[#B42318]">{error}</div> : null}

          <div className="flex items-center justify-between border-t border-[#EAECF0] pt-4">
            {mode === "edit" ? (
              <button
                type="button"
                onClick={handleDelete}
                disabled={isSaving}
                className="h-[40px] rounded-[6px] border border-[#FDA4AF] px-4 text-[15px] font-medium text-[#FB3748] hover:bg-[#FFF1F2] disabled:cursor-not-allowed disabled:opacity-60"
              >
                Delete
              </button>
            ) : (
              <button
                type="button"
                onClick={onClose}
                className="h-[40px] rounded-[6px] border border-[#EAECF0] px-4 text-[15px] font-medium text-[#171717] hover:bg-[#F9FAFB]"
              >
                Cancel
              </button>
            )}

            <div className="flex items-center gap-2">
              {mode === "edit" ? (
                <button
                  type="button"
                  onClick={onClose}
                  className="h-[40px] rounded-[6px] border border-[#EAECF0] px-4 text-[15px] font-medium text-[#171717] hover:bg-[#F9FAFB]"
                >
                  Cancel
                </button>
              ) : null}
              <button
                type="submit"
                disabled={isSaving}
                className="h-[40px] rounded-[6px] bg-[#00A0E3] px-4 text-[15px] font-medium text-white hover:bg-[#0090CF] disabled:cursor-not-allowed disabled:opacity-60"
              >
                {isSaving ? "Saving..." : mode === "create" ? "Create Coupon" : "Save Changes"}
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
