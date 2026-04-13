export type CouponType = "discount" | "sale_price" | "buy_x_get_y";

export type CouponApplyScope =
  | "all_services"
  | "all_packages"
  | "all_domains"
  | "specific_service"
  | "specific_package"
  | "specific_domain";

export type CouponStatus = "Active" | "Inactive" | "Expired";

export type CouponCampaign = {
  id: string;
  couponCode: string;
  couponName: string;
  couponType: CouponType;
  applyTo: CouponApplyScope;
  targetItemId: string | null;
  discountValue: number | null;
  salePrice: number | null;
  buyQuantity: number | null;
  getQuantity: number | null;
  startDate: string;
  endDate: string | null;
  limitTotalUses: number | null;
  limitPerCustomer: number | null;
  currentUsageCount: number;
  isActive: boolean;
  description: string | null;
  createdAt: string;
  updatedAt: string;
};

export type CouponListResponse = {
  cards: CouponCampaign[];
  rows: unknown[];
};

export type CouponCatalogOption = {
  id: string;
  title: string;
  kind: "service" | "package" | "domain";
};

export type CouponCatalogOptionsResponse = {
  services: CouponCatalogOption[];
  packages: CouponCatalogOption[];
  domains: CouponCatalogOption[];
};

export type CouponFormState = {
  couponType: CouponType;
  code: string;
  name: string;
  applyScope: CouponApplyScope;
  targetItemId: string;
  discountValue: string;
  salePrice: string;
  buyQty: string;
  getQty: string;
  startDate: string;
  endDate: string;
  noEndDate: boolean;
  limitTotalUses: boolean;
  totalUsesLimit: string;
  limitPerCustomer: boolean;
  usesPerCustomerLimit: string;
  isActive: boolean;
};
