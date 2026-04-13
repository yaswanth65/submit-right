"use client";

import { Filter, MoreVertical, Plus, Search } from "lucide-react";
import { CouponCampaign, CouponStatus } from "./types";

type CouponManagementLayoutProps = {
  search: string;
  onSearchChange: (value: string) => void;
  rows: CouponCampaign[];
  isLoading: boolean;
  error: string | null;
  onCreateCoupon: () => void;
  onEditCoupon: (coupon: CouponCampaign) => void;
};

function typeLabel(type: CouponCampaign["couponType"]) {
  if (type === "discount") return "Discount";
  if (type === "sale_price") return "Sale Price";
  return "Buy X Get Y";
}

function formatCurrency(value: number | null) {
  if (value == null) return "-";
  return `INR ${value.toFixed(2)}`;
}

function discountText(coupon: CouponCampaign) {
  if (coupon.couponType === "discount") {
    return `${coupon.discountValue ?? 0} OFF`;
  }

  if (coupon.couponType === "sale_price") {
    return `Only ${formatCurrency(coupon.salePrice)}`;
  }

  return `Buy ${coupon.buyQuantity ?? 0} Get ${coupon.getQuantity ?? 0} Free`;
}

function discountSubtext(coupon: CouponCampaign) {
  if (coupon.applyTo.startsWith("specific_")) {
    return `Applied to specific ${coupon.applyTo.replace("specific_", "")}`;
  }

  return `Applied to ${coupon.applyTo.replace("all_", "all ").replace("_", " ")}`;
}

function statusFor(coupon: CouponCampaign): CouponStatus {
  if (!coupon.isActive) return "Inactive";
  if (coupon.endDate && new Date(coupon.endDate).getTime() < Date.now()) return "Expired";
  return "Active";
}

export function CouponManagementLayout({
  search,
  onSearchChange,
  rows,
  isLoading,
  error,
  onCreateCoupon,
  onEditCoupon
}: CouponManagementLayoutProps) {
  return (
    <div className="w-full animate-in space-y-6 font-dm-sans fade-in duration-500">
      <div className="-mx-6 flex items-start justify-between gap-4 border-b border-[#EAECF0] bg-white px-6 py-3 lg:-mx-8 lg:px-8">
        <div>
          <div className="text-[20px] font-bold leading-tight text-[#171717]">Coupon Management</div>
          <p className="mt-1 text-[14px] text-[#525866]">Boost sales by giving customers special offers and discounts.</p>
        </div>

        <button
          onClick={onCreateCoupon}
          className="inline-flex h-[40px] items-center gap-2 rounded-[8px] bg-[#00A0E3] px-4 text-[14px] font-medium text-white transition-colors hover:bg-[#008CC7]"
        >
          <Plus className="h-4 w-4" />
          New Coupon
        </button>
      </div>

      <div className="rounded-[12px] border border-[#EAECF0] bg-[#FFFFFF] p-6 shadow-sm">
        <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
          <div className="relative w-[280px] max-w-full">
            <Search className="absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-[#A0AAB5]" />
            <input
              type="text"
              placeholder="Search"
              value={search}
              onChange={(event) => onSearchChange(event.target.value)}
              className="h-[42px] w-full rounded-[8px] border border-[#EAECF0] pl-10 pr-3 text-[14px] text-[#171717] placeholder-[#A0AAB5] outline-none focus:ring-1 focus:ring-[#00A0E3]"
            />
          </div>

          <button className="inline-flex h-[42px] items-center gap-2 rounded-[8px] border border-[#EAECF0] px-4 text-[14px] font-semibold text-[#525866] transition-colors hover:bg-[#F9FAFB]">
            <Filter className="h-[16px] w-[16px]" />
            Filter
          </button>
        </div>

        {error ? (
          <div className="mb-4 rounded-[8px] border border-[#FECACA] bg-[#FEF2F2] px-3 py-2 text-[13px] text-[#B42318]">{error}</div>
        ) : null}

        <div className="overflow-x-auto rounded-[10px] border border-[#EAECF0]">
          <table className="w-full min-w-[1084px] whitespace-nowrap border-collapse text-left">
            <thead>
              <tr className="border-b border-[#EAECF0] bg-[#F9FAFB]">
                <th className="px-4 py-3 text-[13px] font-bold text-[#525866]">Name</th>
                <th className="px-4 py-3 text-[13px] font-bold text-[#525866]">Discount</th>
                <th className="px-4 py-3 text-[13px] font-bold text-[#525866]">Type</th>
                <th className="px-4 py-3 text-[13px] font-bold text-[#525866]">Code</th>
                <th className="px-4 py-3 text-[13px] font-bold text-[#525866]">Uses</th>
                <th className="px-4 py-3 text-[13px] font-bold text-[#525866]">Status</th>
                <th className="px-4 py-3 text-[13px] font-bold text-[#525866]">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#EAECF0] bg-white">
              {isLoading ? (
                <tr>
                  <td colSpan={7} className="px-4 py-8 text-center text-[14px] text-[#525866]">
                    Loading coupons...
                  </td>
                </tr>
              ) : null}

              {!isLoading &&
                rows.map((row) => {
                  const status = statusFor(row);
                  return (
                    <tr key={row.id} className="transition-colors hover:bg-[#F9FAFB]">
                      <td className="px-4 py-3 text-[13px] font-medium text-[#525866]">{row.couponName}</td>
                      <td className="whitespace-normal px-4 py-3 text-[13px] font-medium text-[#525866]">
                        <div>{discountText(row)}</div>
                        <div>{discountSubtext(row)}</div>
                      </td>
                      <td className="px-4 py-3 text-[13px] font-medium text-[#525866]">{typeLabel(row.couponType)}</td>
                      <td className="px-4 py-3 text-[13px] font-medium text-[#525866]">{row.couponCode}</td>
                      <td className="px-4 py-3 text-[13px] font-medium text-[#525866]">{row.currentUsageCount}</td>
                      <td className="px-4 py-3">
                        <span
                          className={`inline-flex h-6 items-center justify-center rounded-[9999px] px-2 text-[12px] font-medium leading-[120%] ${
                            status === "Active"
                              ? "bg-[#E3F7EC] text-[#1CB061]"
                              : "bg-[#FEF2F2] text-[#FB3748]"
                          }`}
                        >
                          {status}
                        </span>
                      </td>
                      <td className="px-4 py-3">
                        <button
                          onClick={() => onEditCoupon(row)}
                          className="inline-flex h-[18px] w-[18px] items-center justify-center text-[#171717]"
                          aria-label={`Edit ${row.couponName}`}
                        >
                          <MoreVertical className="h-[18px] w-[18px]" />
                        </button>
                      </td>
                    </tr>
                  );
                })}

              {!isLoading && rows.length === 0 ? (
                <tr>
                  <td colSpan={7} className="px-4 py-8 text-center text-[14px] text-[#525866]">
                    No coupons found for this search.
                  </td>
                </tr>
              ) : null}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
