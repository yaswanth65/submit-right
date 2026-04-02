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
