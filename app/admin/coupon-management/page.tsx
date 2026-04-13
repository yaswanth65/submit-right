"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { apiGet } from "@/lib/client-api";
import { AddCouponFlow } from "./components/AddCouponFlow";
import { CouponManagementLayout } from "./components/CouponManagementLayout";
import { EditCouponFlow } from "./components/EditCouponFlow";
import { CouponCampaign, CouponListResponse } from "./components/types";

export default function CouponManagementPage() {
  const [search, setSearch] = useState("");
  const [rows, setRows] = useState<CouponCampaign[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editingCoupon, setEditingCoupon] = useState<CouponCampaign | null>(null);

  const loadCoupons = useCallback(async () => {
    setIsLoading(true);
    setError(null);

    try {
      const data = await apiGet<CouponListResponse>("/api/admin/discounts");
      setRows(data.cards ?? []);
    } catch (loadError) {
      setError(loadError instanceof Error ? loadError.message : "Unable to load coupons");
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    loadCoupons();
  }, [loadCoupons]);

  const filteredRows = useMemo(() => {
    const query = search.trim().toLowerCase();
    if (!query) return rows;

    return rows.filter((row) => {
      const text = `${row.couponName} ${row.couponCode} ${row.couponType} ${row.applyTo}`.toLowerCase();
      return text.includes(query);
    });
  }, [search, rows]);

  const handleEditClick = (coupon: CouponCampaign) => {
    setEditingCoupon(coupon);
    setIsEditModalOpen(true);
  };

  return (
    <div className="w-full font-dm-sans">
      <CouponManagementLayout
        search={search}
        onSearchChange={setSearch}
        rows={filteredRows}
        isLoading={isLoading}
        error={error}
        onCreateCoupon={() => setIsCreateModalOpen(true)}
        onEditCoupon={handleEditClick}
      />

      <AddCouponFlow isOpen={isCreateModalOpen} onClose={() => setIsCreateModalOpen(false)} onSaved={loadCoupons} />
      <EditCouponFlow isOpen={isEditModalOpen} onClose={() => setIsEditModalOpen(false)} coupon={editingCoupon} onSaved={loadCoupons} />
    </div>
  );
}
