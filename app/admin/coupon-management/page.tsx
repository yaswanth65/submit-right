"use client";

import React, { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import {
  Calendar,
  ChevronDown,
  Filter,
  MoreVertical,
  Plus,
  Search,
  X,
} from "lucide-react";

type CouponType = "flat" | "percent" | "free_shipping" | "sale_price" | "buy_x_get_y";
type CouponStatus = "Active" | "Expired";
type ApplyScope = "all_services" | "specific_domain" | "specific_service";

type CouponRow = {
  id: string;
  name: string;
  discountTitle: string;
  discountSubtitle?: string;
  typeLabel: string;
  type: CouponType;
  code: string;
  uses: number;
  status: CouponStatus;
};

type CouponFormState = {
  couponType: CouponType;
  code: string;
  name: string;
  status: CouponStatus;

  flatAmount: string;
  percentOff: string;
  maxDiscountCap: string;
  salePrice: string;
  shippingDiscountCap: string;
  buyQty: string;
  getQty: string;
  maxFreeItemsPerOrder: string;
  minOrderAmount: string;

  applyScope: ApplyScope;
  domain: string;
  service: string;

  startDate: string;
  endDate: string;
  noEndDate: boolean;

  includeSubscriptions: boolean;
  firstOrderOnly: boolean;
  newUsersOnly: boolean;
  excludeDiscountedServices: boolean;
  stackable: boolean;

  limitTotalUses: boolean;
  totalUsesLimit: string;
  limitPerCustomer: boolean;
  usesPerCustomer: string;
};

const couponRows: CouponRow[] = [
  {
    id: "1",
    name: "First Order",
    discountTitle: "₹500.00 OFF",
    discountSubtitle: "on orders over ₹999.00",
    typeLabel: "₹ Discount",
    type: "flat",
    code: "SUBMIT500",
    uses: 0,
    status: "Active",
  },
  {
    id: "2",
    name: "First Order",
    discountTitle: "20% OFF",
    discountSubtitle: "on orders over 2,499.00",
    typeLabel: "% Discount",
    type: "percent",
    code: "FIRST20",
    uses: 12,
    status: "Expired",
  },
  {
    id: "3",
    name: "First Order",
    discountTitle: "Only ₹500",
    typeLabel: "Sale Price",
    type: "sale_price",
    code: "SALE500",
    uses: 4,
    status: "Active",
  },
  {
    id: "4",
    name: "April Fools",
    discountTitle: "Buy 1 Get 1 Free",
    discountSubtitle: "All products",
    typeLabel: "Buy X Get Y Free",
    type: "buy_x_get_y",
    code: "APRILBOGO",
    uses: 2,
    status: "Active",
  },
  {
    id: "5",
    name: "Shipping Day",
    discountTitle: "Free Shipping",
    discountSubtitle: "on orders over ₹999.00",
    typeLabel: "Free Shipping",
    type: "free_shipping",
    code: "SHIPFREE",
    uses: 6,
    status: "Active",
  },
];

const typeCards: Array<{
  value: CouponType;
  label: string;
  subtitle: string;
  className: string;
  hint: string;
}> = [
  {
    value: "flat",
    label: "₹",
    subtitle: "Discount",
    className: "bg-[#FF6A5E]",
    hint: "Fixed amount off",
  },
  {
    value: "percent",
    label: "%",
    subtitle: "Discount",
    className: "bg-[#5DAAF8]",
    hint: "Percentage discount",
  },
  {
    value: "free_shipping",
    label: "Free",
    subtitle: "Shipping",
    className: "bg-[#FFAA2C]",
    hint: "Waive shipping fees",
  },
  {
    value: "sale_price",
    label: "Sale",
    subtitle: "Price",
    className: "bg-[#A78BDA]",
    hint: "Set fixed offer price",
  },
  {
    value: "buy_x_get_y",
    label: "Buy X Get Y",
    subtitle: "Free",
    className: "bg-[#81C784]",
    hint: "Bundle based offer",
  },
];

const inputClassName =
  "w-full h-[36px] rounded-[7px] border border-[#EAECF0] bg-white px-3 text-[13px] text-[#171717] placeholder-[#A0AAB5] outline-none focus:border-[#00A0E3] focus:ring-1 focus:ring-[#00A0E3]";

function getTypeCard(type: CouponType) {
  return typeCards.find((card) => card.value === type) ?? typeCards[0];
}

function getTypeDefaults(type: CouponType): Pick<
  CouponFormState,
  | "flatAmount"
  | "percentOff"
  | "maxDiscountCap"
  | "salePrice"
  | "shippingDiscountCap"
  | "buyQty"
  | "getQty"
  | "maxFreeItemsPerOrder"
  | "minOrderAmount"
> {
  if (type === "flat") {
    return {
      flatAmount: "500",
      percentOff: "",
      maxDiscountCap: "",
      salePrice: "",
      shippingDiscountCap: "",
      buyQty: "",
      getQty: "",
      maxFreeItemsPerOrder: "",
      minOrderAmount: "999",
    };
  }

  if (type === "percent") {
    return {
      flatAmount: "",
      percentOff: "20",
      maxDiscountCap: "1200",
      salePrice: "",
      shippingDiscountCap: "",
      buyQty: "",
      getQty: "",
      maxFreeItemsPerOrder: "",
      minOrderAmount: "2499",
    };
  }

  if (type === "free_shipping") {
    return {
      flatAmount: "",
      percentOff: "",
      maxDiscountCap: "",
      salePrice: "",
      shippingDiscountCap: "300",
      buyQty: "",
      getQty: "",
      maxFreeItemsPerOrder: "",
      minOrderAmount: "999",
    };
  }

  if (type === "sale_price") {
    return {
      flatAmount: "",
      percentOff: "",
      maxDiscountCap: "",
      salePrice: "500",
      shippingDiscountCap: "",
      buyQty: "",
      getQty: "",
      maxFreeItemsPerOrder: "",
      minOrderAmount: "0",
    };
  }

  return {
    flatAmount: "",
    percentOff: "",
    maxDiscountCap: "",
    salePrice: "",
    shippingDiscountCap: "",
    buyQty: "1",
    getQty: "1",
    maxFreeItemsPerOrder: "1",
    minOrderAmount: "0",
  };
}

function buildInitialForm(mode: "create" | "edit", initialCoupon: CouponRow | null): CouponFormState {
  const couponType = initialCoupon?.type ?? "flat";
  const typeDefaults = getTypeDefaults(couponType);

  return {
    couponType,
    code: initialCoupon?.code ?? "",
    name: initialCoupon?.name ?? "",
    status: initialCoupon?.status ?? "Active",

    ...typeDefaults,

    applyScope: couponType === "buy_x_get_y" ? "specific_service" : "all_services",
    domain: "Editing",
    service: "Improve grammar and clarity",

    startDate: "2026-03-15",
    endDate: "2026-04-10",
    noEndDate: false,

    includeSubscriptions: false,
    firstOrderOnly: false,
    newUsersOnly: false,
    excludeDiscountedServices: true,
    stackable: false,

    limitTotalUses: true,
    totalUsesLimit: mode === "edit" ? "100" : "",
    limitPerCustomer: true,
    usesPerCustomer: "1",
  };
}

function updateType(state: CouponFormState, type: CouponType): CouponFormState {
  return {
    ...state,
    couponType: type,
    ...getTypeDefaults(type),
    applyScope: type === "buy_x_get_y" ? "specific_service" : state.applyScope,
  };
}

function TypeSpecificFields({
  form,
  setForm,
}: {
  form: CouponFormState;
  setForm: React.Dispatch<React.SetStateAction<CouponFormState>>;
}) {
  if (form.couponType === "flat") {
    return (
      <div className="grid grid-cols-2 gap-3">
        <div>
          <label className="block text-[12px] font-medium text-[#171717] mb-1.5">Flat Discount Amount</label>
          <div className="relative">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-[13px] text-[#8A94A6]">₹</span>
            <input
              className={`${inputClassName} pl-7`}
              value={form.flatAmount}
              onChange={(event) => setForm((prev) => ({ ...prev, flatAmount: event.target.value }))}
              placeholder="500"
            />
          </div>
        </div>
        <div>
          <label className="block text-[12px] font-medium text-[#171717] mb-1.5">Minimum Order Amount</label>
          <div className="relative">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-[13px] text-[#8A94A6]">₹</span>
            <input
              className={`${inputClassName} pl-7`}
              value={form.minOrderAmount}
              onChange={(event) => setForm((prev) => ({ ...prev, minOrderAmount: event.target.value }))}
              placeholder="999"
            />
          </div>
        </div>
      </div>
    );
  }

  if (form.couponType === "percent") {
    return (
      <div className="grid grid-cols-3 gap-3">
        <div>
          <label className="block text-[12px] font-medium text-[#171717] mb-1.5">Discount Percentage</label>
          <div className="relative">
            <input
              className={`${inputClassName} pr-7`}
              value={form.percentOff}
              onChange={(event) => setForm((prev) => ({ ...prev, percentOff: event.target.value }))}
              placeholder="20"
            />
            <span className="absolute right-3 top-1/2 -translate-y-1/2 text-[13px] text-[#8A94A6]">%</span>
          </div>
        </div>
        <div>
          <label className="block text-[12px] font-medium text-[#171717] mb-1.5">Minimum Order Amount</label>
          <div className="relative">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-[13px] text-[#8A94A6]">₹</span>
            <input
              className={`${inputClassName} pl-7`}
              value={form.minOrderAmount}
              onChange={(event) => setForm((prev) => ({ ...prev, minOrderAmount: event.target.value }))}
              placeholder="2499"
            />
          </div>
        </div>
        <div>
          <label className="block text-[12px] font-medium text-[#171717] mb-1.5">Max Discount Cap</label>
          <div className="relative">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-[13px] text-[#8A94A6]">₹</span>
            <input
              className={`${inputClassName} pl-7`}
              value={form.maxDiscountCap}
              onChange={(event) => setForm((prev) => ({ ...prev, maxDiscountCap: event.target.value }))}
              placeholder="1200"
            />
          </div>
        </div>
      </div>
    );
  }

  if (form.couponType === "sale_price") {
    return (
      <div className="grid grid-cols-2 gap-3">
        <div>
          <label className="block text-[12px] font-medium text-[#171717] mb-1.5">Offer Price</label>
          <div className="relative">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-[13px] text-[#8A94A6]">₹</span>
            <input
              className={`${inputClassName} pl-7`}
              value={form.salePrice}
              onChange={(event) => setForm((prev) => ({ ...prev, salePrice: event.target.value }))}
              placeholder="500"
            />
          </div>
        </div>
        <div>
          <label className="block text-[12px] font-medium text-[#171717] mb-1.5">Minimum Order Amount</label>
          <div className="relative">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-[13px] text-[#8A94A6]">₹</span>
            <input
              className={`${inputClassName} pl-7`}
              value={form.minOrderAmount}
              onChange={(event) => setForm((prev) => ({ ...prev, minOrderAmount: event.target.value }))}
              placeholder="0"
            />
          </div>
        </div>
      </div>
    );
  }

  if (form.couponType === "free_shipping") {
    return (
      <div className="grid grid-cols-2 gap-3">
        <div>
          <label className="block text-[12px] font-medium text-[#171717] mb-1.5">Minimum Order Amount</label>
          <div className="relative">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-[13px] text-[#8A94A6]">₹</span>
            <input
              className={`${inputClassName} pl-7`}
              value={form.minOrderAmount}
              onChange={(event) => setForm((prev) => ({ ...prev, minOrderAmount: event.target.value }))}
              placeholder="999"
            />
          </div>
        </div>
        <div>
          <label className="block text-[12px] font-medium text-[#171717] mb-1.5">Max Shipping Discount Cap</label>
          <div className="relative">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-[13px] text-[#8A94A6]">₹</span>
            <input
              className={`${inputClassName} pl-7`}
              value={form.shippingDiscountCap}
              onChange={(event) => setForm((prev) => ({ ...prev, shippingDiscountCap: event.target.value }))}
              placeholder="300"
            />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-2">
      <div className="grid grid-cols-3 gap-3">
        <div>
          <label className="block text-[12px] font-medium text-[#171717] mb-1.5">Buy Quantity</label>
          <input
            type="number"
            min={1}
            className={inputClassName}
            value={form.buyQty}
            onChange={(event) => setForm((prev) => ({ ...prev, buyQty: event.target.value }))}
          />
        </div>
        <div>
          <label className="block text-[12px] font-medium text-[#171717] mb-1.5">Get Quantity</label>
          <input
            type="number"
            min={1}
            className={inputClassName}
            value={form.getQty}
            onChange={(event) => setForm((prev) => ({ ...prev, getQty: event.target.value }))}
          />
        </div>
        <div>
          <label className="block text-[12px] font-medium text-[#171717] mb-1.5">Max Free Items / Order</label>
          <input
            type="number"
            min={1}
            className={inputClassName}
            value={form.maxFreeItemsPerOrder}
            onChange={(event) => setForm((prev) => ({ ...prev, maxFreeItemsPerOrder: event.target.value }))}
          />
        </div>
      </div>
      <div className="text-[11px] text-[#8A94A6]">Example: Buy 2 eligible services and get 1 free.</div>
    </div>
  );
}

function CouponModal({
  mode,
  isOpen,
  onClose,
  initialCoupon,
}: {
  mode: "create" | "edit";
  isOpen: boolean;
  onClose: () => void;
  initialCoupon: CouponRow | null;
}) {
  const [form, setForm] = useState<CouponFormState>(() => buildInitialForm(mode, initialCoupon));

  useEffect(() => {
    if (!isOpen) return;
    setForm(buildInitialForm(mode, initialCoupon));
  }, [isOpen, mode, initialCoupon]);

  if (!isOpen) return null;

  const typeCard = getTypeCard(form.couponType);
  const codeLocked = mode === "edit" && (initialCoupon?.uses ?? 0) > 0;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 font-dm-sans">
      <div className="absolute inset-0 bg-[#171717]/45" onClick={onClose}></div>

      <div className="relative z-10 w-full max-w-[640px] bg-white rounded-[14px] border border-[#EAECF0] shadow-[0_14px_40px_rgba(0,0,0,0.18)] overflow-hidden">
        <div className="px-5 py-3.5 border-b border-[#EAECF0] flex items-center justify-between">
          <div className="text-[18px] font-medium text-[#1C1C1D] font-inter">
            {mode === "create" ? "New Coupon" : "Edit Coupon"}
          </div>
          <button
            onClick={onClose}
            className="w-7 h-7 rounded-[6px] border border-transparent hover:border-[#EAECF0] hover:bg-[#F9FAFB] flex items-center justify-center text-[#525866] transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <div className="px-5 py-4 max-h-[72vh] overflow-y-auto custom-scrollbar space-y-3">
          {mode === "create" ? (
            <>
              <div className="text-[12px] text-[#525866]">Select the type of coupon you want to offer:</div>
              <div className="grid grid-cols-5 gap-2">
                {typeCards.map((card) => {
                  const isSelected = form.couponType === card.value;
                  return (
                    <button
                      key={card.value}
                      type="button"
                      onClick={() => setForm((prev) => updateType(prev, card.value))}
                      className={`h-[46px] rounded-[6px] text-white border transition-all ${
                        isSelected ? "border-[#171717] shadow-sm" : "border-transparent"
                      } ${card.className}`}
                    >
                      <div className="text-[11px] font-semibold leading-tight">{card.label}</div>
                      <div className="text-[10px] leading-tight opacity-95">{card.subtitle}</div>
                    </button>
                  );
                })}
              </div>
            </>
          ) : (
            <div className="rounded-[8px] border border-[#EAECF0] bg-[#F9FAFB] px-3 py-2.5 flex items-center justify-between gap-3">
              <div className="flex items-center gap-2">
                <span className={`inline-flex h-[24px] items-center rounded-[999px] px-2 text-white text-[11px] font-medium ${typeCard.className}`}>
                  {typeCard.label} {typeCard.subtitle}
                </span>
                <span className="text-[12px] text-[#525866]">Coupon type is fixed for edits</span>
              </div>
              <div className="text-[12px] text-[#525866]">Used <span className="font-semibold text-[#171717]">{initialCoupon?.uses ?? 0}</span> times</div>
            </div>
          )}

          <div className="grid grid-cols-3 gap-3">
            <div>
              <label className="block text-[12px] font-medium text-[#171717] mb-1.5">Coupon Code</label>
              <input
                className={inputClassName}
                value={form.code}
                onChange={(event) => setForm((prev) => ({ ...prev, code: event.target.value.toUpperCase() }))}
                placeholder="e.g. SUMMERSALE20"
                disabled={codeLocked}
              />
              {codeLocked ? <div className="text-[11px] text-[#8A94A6] mt-1">Code is locked after coupon usage.</div> : null}
            </div>
            <div>
              <label className="block text-[12px] font-medium text-[#171717] mb-1.5">Coupon Name</label>
              <input
                className={inputClassName}
                value={form.name}
                onChange={(event) => setForm((prev) => ({ ...prev, name: event.target.value }))}
                placeholder="e.g. Summer Sale"
              />
            </div>
            <div>
              <label className="block text-[12px] font-medium text-[#171717] mb-1.5">Status</label>
              <div className="relative">
                <select
                  className={`${inputClassName} appearance-none pr-8`}
                  value={form.status}
                  onChange={(event) => setForm((prev) => ({ ...prev, status: event.target.value as CouponStatus }))}
                >
                  <option value="Active">Active</option>
                  <option value="Expired">Expired</option>
                </select>
                <ChevronDown className="w-4 h-4 text-[#8A94A6] absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
              </div>
            </div>
          </div>

          <div className="rounded-[8px] border border-[#EAECF0] p-3 space-y-2">
            <div className="text-[12px] font-semibold text-[#171717]">Offer Rules</div>
            <TypeSpecificFields form={form} setForm={setForm} />
          </div>

          <div className="rounded-[8px] border border-[#EAECF0] p-3 space-y-2">
            <div className="text-[12px] font-semibold text-[#171717]">Eligibility</div>
            <div className="grid grid-cols-3 gap-3">
              <div>
                <label className="block text-[12px] font-medium text-[#171717] mb-1.5">Apply To</label>
                <div className="relative">
                  <select
                    className={`${inputClassName} appearance-none pr-8`}
                    value={form.applyScope}
                    onChange={(event) => setForm((prev) => ({ ...prev, applyScope: event.target.value as ApplyScope }))}
                  >
                    <option value="all_services">All Services</option>
                    <option value="specific_domain">Specific Domain</option>
                    <option value="specific_service">Specific Service</option>
                  </select>
                  <ChevronDown className="w-4 h-4 text-[#8A94A6] absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                </div>
              </div>

              <div>
                <label className="block text-[12px] font-medium text-[#171717] mb-1.5">Domain</label>
                <div className="relative">
                  <select
                    className={`${inputClassName} appearance-none pr-8`}
                    value={form.domain}
                    onChange={(event) => setForm((prev) => ({ ...prev, domain: event.target.value }))}
                    disabled={form.applyScope === "all_services"}
                  >
                    <option>Editing</option>
                    <option>Proofreading</option>
                    <option>Translation</option>
                    <option>Publication Support</option>
                  </select>
                  <ChevronDown className="w-4 h-4 text-[#8A94A6] absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                </div>
              </div>

              <div>
                <label className="block text-[12px] font-medium text-[#171717] mb-1.5">Service</label>
                <div className="relative">
                  <select
                    className={`${inputClassName} appearance-none pr-8`}
                    value={form.service}
                    onChange={(event) => setForm((prev) => ({ ...prev, service: event.target.value }))}
                    disabled={form.applyScope !== "specific_service"}
                  >
                    <option>Improve grammar and clarity</option>
                    <option>Structure refinement</option>
                    <option>Academic tone correction</option>
                  </select>
                  <ChevronDown className="w-4 h-4 text-[#8A94A6] absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                </div>
              </div>
            </div>
          </div>

          <div className="rounded-[8px] border border-[#EAECF0] p-3">
            <div className="text-[12px] font-semibold text-[#171717] mb-2">Valid Between</div>
            <div className="grid grid-cols-2 gap-3 mb-2">
              <div>
                <label className="block text-[11px] text-[#525866] mb-1">Start Date</label>
                <div className="relative">
                  <input
                    type="date"
                    className={`${inputClassName} pr-9`}
                    value={form.startDate}
                    onChange={(event) => setForm((prev) => ({ ...prev, startDate: event.target.value }))}
                  />
                  <Calendar className="w-4 h-4 text-[#8A94A6] absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                </div>
              </div>
              <div>
                <label className="block text-[11px] text-[#525866] mb-1">End Date</label>
                <div className="relative">
                  <input
                    type="date"
                    className={`${inputClassName} pr-9`}
                    value={form.endDate}
                    onChange={(event) => setForm((prev) => ({ ...prev, endDate: event.target.value }))}
                    disabled={form.noEndDate}
                  />
                  <Calendar className="w-4 h-4 text-[#8A94A6] absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                </div>
              </div>
            </div>
            <label className="flex items-center gap-2 text-[12px] text-[#525866]">
              <input
                type="checkbox"
                className="w-[13px] h-[13px] rounded-[3px] border-[#D0D5DD]"
                checked={form.noEndDate}
                onChange={(event) => setForm((prev) => ({ ...prev, noEndDate: event.target.checked }))}
              />
              Don&apos;t set an end date
            </label>
          </div>

          <div className="rounded-[8px] border border-[#EAECF0] p-3 space-y-2">
            <div className="text-[12px] font-semibold text-[#171717]">Usage Controls</div>

            <label className="flex items-center gap-2 text-[12px] text-[#525866]">
              <input
                type="checkbox"
                className="w-[13px] h-[13px] rounded-[3px] border-[#D0D5DD]"
                checked={form.includeSubscriptions}
                onChange={(event) => setForm((prev) => ({ ...prev, includeSubscriptions: event.target.checked }))}
              />
              Include subscriptions
            </label>
            <label className="flex items-center gap-2 text-[12px] text-[#525866]">
              <input
                type="checkbox"
                className="w-[13px] h-[13px] rounded-[3px] border-[#D0D5DD]"
                checked={form.firstOrderOnly}
                onChange={(event) => setForm((prev) => ({ ...prev, firstOrderOnly: event.target.checked }))}
              />
              First order only
            </label>
            <label className="flex items-center gap-2 text-[12px] text-[#525866]">
              <input
                type="checkbox"
                className="w-[13px] h-[13px] rounded-[3px] border-[#D0D5DD]"
                checked={form.newUsersOnly}
                onChange={(event) => setForm((prev) => ({ ...prev, newUsersOnly: event.target.checked }))}
              />
              New users only
            </label>
            <label className="flex items-center gap-2 text-[12px] text-[#525866]">
              <input
                type="checkbox"
                className="w-[13px] h-[13px] rounded-[3px] border-[#D0D5DD]"
                checked={form.excludeDiscountedServices}
                onChange={(event) => setForm((prev) => ({ ...prev, excludeDiscountedServices: event.target.checked }))}
              />
              Exclude already discounted services
            </label>
            <label className="flex items-center gap-2 text-[12px] text-[#525866]">
              <input
                type="checkbox"
                className="w-[13px] h-[13px] rounded-[3px] border-[#D0D5DD]"
                checked={form.stackable}
                onChange={(event) => setForm((prev) => ({ ...prev, stackable: event.target.checked }))}
              />
              Allow stacking with other coupons
            </label>

            <div className="grid grid-cols-2 gap-3 pt-1">
              <div>
                <label className="flex items-center gap-2 text-[12px] text-[#525866] mb-1.5">
                  <input
                    type="checkbox"
                    className="w-[13px] h-[13px] rounded-[3px] border-[#D0D5DD]"
                    checked={form.limitTotalUses}
                    onChange={(event) => setForm((prev) => ({ ...prev, limitTotalUses: event.target.checked }))}
                  />
                  Limit total uses
                </label>
                <input
                  className={inputClassName}
                  value={form.totalUsesLimit}
                  onChange={(event) => setForm((prev) => ({ ...prev, totalUsesLimit: event.target.value }))}
                  disabled={!form.limitTotalUses}
                  placeholder="e.g. 100"
                />
              </div>
              <div>
                <label className="flex items-center gap-2 text-[12px] text-[#525866] mb-1.5">
                  <input
                    type="checkbox"
                    className="w-[13px] h-[13px] rounded-[3px] border-[#D0D5DD]"
                    checked={form.limitPerCustomer}
                    onChange={(event) => setForm((prev) => ({ ...prev, limitPerCustomer: event.target.checked }))}
                  />
                  Limit per customer
                </label>
                <input
                  className={inputClassName}
                  value={form.usesPerCustomer}
                  onChange={(event) => setForm((prev) => ({ ...prev, usesPerCustomer: event.target.value }))}
                  disabled={!form.limitPerCustomer}
                  placeholder="e.g. 1"
                />
              </div>
            </div>
          </div>
        </div>

        <div className="px-5 py-3 border-t border-[#EAECF0] flex items-center justify-between bg-white">
          {mode === "edit" ? (
            <button
              onClick={onClose}
              className="px-3.5 py-2 rounded-[7px] text-[12px] font-medium border border-[#FDA4AF] text-[#FB3748] hover:bg-[#FFF1F2]"
            >
              Delete Coupon
            </button>
          ) : (
            <button
              onClick={onClose}
              className="px-3.5 py-2 rounded-[7px] text-[12px] font-medium border border-[#EAECF0] text-[#525866] hover:bg-[#F9FAFB]"
            >
              Cancel
            </button>
          )}

          <div className="flex items-center gap-2">
            {mode === "edit" ? (
              <button
                onClick={onClose}
                className="px-3.5 py-2 rounded-[7px] text-[12px] font-medium border border-[#EAECF0] text-[#525866] hover:bg-[#F9FAFB]"
              >
                Cancel
              </button>
            ) : null}
            <button className="px-4 py-2 rounded-[7px] text-[12px] font-medium text-white bg-[#00A0E3] hover:bg-[#008CC7]">
              {mode === "create" ? "Create Coupon" : "Save"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function CouponManagementPage() {
  const [search, setSearch] = useState("");
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editingCoupon, setEditingCoupon] = useState<CouponRow | null>(null);

  const filteredRows = useMemo(() => {
    const query = search.trim().toLowerCase();
    if (!query) return couponRows;

    return couponRows.filter((row) => {
      const text = `${row.name} ${row.discountTitle} ${row.discountSubtitle ?? ""} ${row.typeLabel} ${row.code}`.toLowerCase();
      return text.includes(query);
    });
  }, [search]);

  const handleEditClick = (coupon: CouponRow) => {
    setEditingCoupon(coupon);
    setIsEditModalOpen(true);
  };

  return (
    <div className="w-full font-dm-sans">
      <div className="mb-6 flex items-start justify-between gap-4">
        <div>
          <div className="text-[24px] font-medium text-[#1C1C1D] mb-1 font-inter">Coupon Management</div>
          <p className="text-[14px] text-[#78788D]">Boost sales by giving customers special offers and discounts.</p>
        </div>

        <button
          onClick={() => setIsCreateModalOpen(true)}
          className="h-[40px] px-4 rounded-[8px] bg-[#00A0E3] hover:bg-[#008CC7] text-white text-[14px] font-medium inline-flex items-center gap-2 shadow-sm"
        >
          <Plus className="w-4 h-4" />
          New Coupon
        </button>
      </div>

      <div className="bg-white rounded-[12px] border border-[#EAECF0] shadow-sm">
        <div className="p-4 flex items-center justify-between border-b border-[#EAECF0]">
          <div className="relative w-full max-w-[360px]">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-[18px] w-[18px] text-[#A0AAB5]" />
            <input
              type="text"
              placeholder="Search"
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              className="block w-full pl-9 pr-3 py-[9px] border border-[#EAECF0] rounded-[8px] text-[14px] text-[#171717] placeholder-[#A0AAB5] focus:outline-none focus:ring-1 focus:ring-[#00A0E3] focus:border-[#00A0E3] transition-colors"
            />
          </div>

          <button className="flex items-center gap-2 px-4 py-[9px] border border-[#EAECF0] rounded-[8px] text-[14px] font-medium text-[#525866] hover:bg-[#F9FAFB] transition-colors shadow-sm bg-white">
            <Filter className="h-[16px] w-[16px]" />
            Filter
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-[#F9FAFB] border-b border-[#EAECF0]">
                <th className="px-6 py-4 text-[13px] font-bold text-[#525866]">Name</th>
                <th className="px-6 py-4 text-[13px] font-bold text-[#525866]">Discount</th>
                <th className="px-6 py-4 text-[13px] font-bold text-[#525866]">Type</th>
                <th className="px-6 py-4 text-[13px] font-bold text-[#525866]">Code</th>
                <th className="px-6 py-4 text-[13px] font-bold text-[#525866]">Uses</th>
                <th className="px-6 py-4 text-[13px] font-bold text-[#525866]">Status</th>
                <th className="px-6 py-4 text-[13px] font-bold text-[#525866] text-center">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#EAECF0]">
              {filteredRows.map((row) => (
                <tr key={row.id} className="hover:bg-[#F9FAFB]/50 transition-colors">
                  <td className="px-6 py-3.5 text-[14px] font-medium text-[#1C1C1D] whitespace-nowrap">{row.name}</td>
                  <td className="px-6 py-3.5 text-[14px] text-[#525866] min-w-[220px]">
                    <div className="leading-tight">{row.discountTitle}</div>
                    {row.discountSubtitle ? <div className="text-[13px] text-[#6B7280] mt-0.5">{row.discountSubtitle}</div> : null}
                  </td>
                  <td className="px-6 py-3.5 text-[14px] text-[#525866] whitespace-nowrap">{row.typeLabel}</td>
                  <td className="px-6 py-3.5 text-[14px] text-[#525866] whitespace-nowrap">{row.code}</td>
                  <td className="px-6 py-3.5 text-[14px] text-[#525866] whitespace-nowrap">{row.uses}</td>
                  <td className="px-6 py-3.5 whitespace-nowrap">
                    <span
                      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-[12px] font-medium ${
                        row.status === "Active" ? "bg-[#ECFDF3] text-[#027A48]" : "bg-[#FEF3F2] text-[#FB3748]"
                      }`}
                    >
                      {row.status}
                    </span>
                  </td>
                  <td className="px-6 py-3.5 text-center">
                    <button
                      onClick={() => handleEditClick(row)}
                      className="w-8 h-8 rounded-[8px] border border-transparent hover:border-[#EAECF0] hover:bg-[#F9FAFB] inline-flex items-center justify-center text-[#525866]"
                      aria-label={`Edit ${row.name}`}
                    >
                      <MoreVertical className="w-4 h-4" />
                    </button>
                  </td>
                </tr>
              ))}

              {filteredRows.length === 0 ? (
                <tr>
                  <td colSpan={7} className="px-6 py-10 text-center">
                    <div className="text-[14px] text-[#8A94A6]">No coupons found for this search.</div>
                  </td>
                </tr>
              ) : null}
            </tbody>
          </table>
        </div>
      </div>

      <CouponModal mode="create" isOpen={isCreateModalOpen} onClose={() => setIsCreateModalOpen(false)} initialCoupon={null} />
      <CouponModal
        mode="edit"
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        initialCoupon={editingCoupon}
      />
    </div>
  );
}
