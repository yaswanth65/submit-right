export type UserRole = "client" | "editor" | "admin";

export type DocumentStatus =
  | "draft"
  | "submitted"
  | "being_edited"
  | "payment_needed"
  | "completed"
  | "in_revision"
  | "cancelled";

export type NotificationType =
  | "message"
  | "payment"
  | "document_update"
  | "system";

export type AvailabilityStatus = "available" | "busy" | "at_capacity" | "vacation";

export type CatalogItemKind = "service" | "package" | "domain";

export type DiscountCampaignType = "discount" | "sale_price" | "buy_x_get_y";

export type DiscountApplyTo =
  | "all_services"
  | "all_packages"
  | "all_domains"
  | "specific_service"
  | "specific_package"
  | "specific_domain";
