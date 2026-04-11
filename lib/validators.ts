import { z } from "zod";

export const signupSchema = z
  .object({
    fullName: z.string().min(2).max(120),
    email: z.string().email(),
    password: z.string().min(8).max(128),
    confirmPassword: z.string().min(8).max(128)
  })
  .refine((data) => data.password === data.confirmPassword, {
    path: ["confirmPassword"],
    message: "Passwords do not match"
  });

export const signinSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8).max(128)
});

export const forgotPasswordSchema = z.object({
  email: z.string().email()
});

export const resetPasswordSchema = z
  .object({
    token: z.string().min(1),
    newPassword: z.string().min(8).max(128),
    confirmPassword: z.string().min(8).max(128)
  })
  .refine((data) => data.newPassword === data.confirmPassword, {
    path: ["confirmPassword"],
    message: "Passwords do not match"
  });

export const updateProfileSchema = z.object({
  fullName: z.string().min(2).max(120).optional(),
  email: z.string().email().optional(),
  mobileNumber: z.string().max(30).optional().nullable(),
  country: z.string().max(80).optional().nullable(),
  state: z.string().max(80).optional().nullable(),
  yearsOfExperience: z.number().int().min(0).max(60).optional().nullable(),
  primaryLanguage: z.string().max(80).optional().nullable(),
  primaryExpertise: z.string().max(120).optional().nullable(),
  languagePairs: z.array(z.string().max(120)).optional().nullable()
});

export const submitDocumentStep1Schema = z.object({
  documentTitle: z.string().min(2).max(255),
  academicField: z.string().min(2).max(120),
  documentType: z.string().min(2).max(120),
  shortDescription: z.string().min(2).max(2000)
});

export const serviceSelectionSchema = z.object({
  documentId: z.string().uuid(),
  serviceId: z.string().uuid()
});

export const catalogItemKindSchema = z.enum(["service", "package", "domain"]);

export const catalogItemUpsertSchema = z.object({
  slug: z.string().min(2).max(120).optional(),
  title: z.string().min(2).max(160),
  description: z.string().max(2000).optional().nullable(),
  imageUrl: z.string().url().optional().nullable(),
  kind: catalogItemKindSchema,
  category: z.string().min(2).max(120).optional().nullable(),
  domainType: z.string().min(2).max(120).optional().nullable(),
  basePrice: z.number().nonnegative().optional().nullable(),
  ratePerWord: z.number().nonnegative().optional().nullable(),
  isBest: z.boolean().optional(),
  isActive: z.boolean().optional(),
  sortOrder: z.number().int().min(0).optional()
});

export const catalogItemsQuerySchema = z.object({
  kind: catalogItemKindSchema.optional(),
  search: z.string().optional()
});

export const discountCampaignTypeSchema = z.enum(["discount", "sale_price", "buy_x_get_y"]);

export const discountCampaignApplyToSchema = z.enum([
  "all_services",
  "all_packages",
  "all_domains",
  "specific_service",
  "specific_package",
  "specific_domain"
]);

const discountCampaignBaseSchema = z.object({
  couponCode: z.string().min(2).max(80),
  couponName: z.string().min(2).max(160),
  couponType: discountCampaignTypeSchema,
  applyTo: discountCampaignApplyToSchema,
  targetItemId: z.string().uuid().optional().nullable(),
  discountValue: z.number().nonnegative().optional().nullable(),
  salePrice: z.number().nonnegative().optional().nullable(),
  buyQuantity: z.number().int().min(1).optional().nullable(),
  getQuantity: z.number().int().min(1).optional().nullable(),
  startDate: z.string().datetime(),
  endDate: z.string().datetime().optional().nullable(),
  limitTotalUses: z.number().int().min(1).optional().nullable(),
  limitPerCustomer: z.number().int().min(1).optional().nullable(),
  isActive: z.boolean().optional(),
  description: z.string().max(1000).optional().nullable()
});

export const discountCampaignSchema = discountCampaignBaseSchema
  .refine((data) => data.applyTo.startsWith("specific_") ? !!data.targetItemId : true, {
    path: ["targetItemId"],
    message: "Target item is required for specific discounts"
  })
  .refine((data) => data.couponType === "discount" ? data.discountValue != null : true, {
    path: ["discountValue"],
    message: "Discount value is required for discount coupons"
  })
  .refine((data) => data.couponType === "sale_price" ? data.salePrice != null : true, {
    path: ["salePrice"],
    message: "Sale price is required for sale price coupons"
  })
  .refine((data) => data.couponType === "buy_x_get_y" ? data.buyQuantity != null && data.getQuantity != null : true, {
    path: ["buyQuantity"],
    message: "Buy/Get quantities are required for BOGO coupons"
  });

export const discountCampaignUpdateSchema = discountCampaignBaseSchema
  .partial()
  .superRefine((data, ctx) => {
    if (data.applyTo?.startsWith("specific_") && !data.targetItemId) {
      ctx.addIssue({
        code: "custom",
        path: ["targetItemId"],
        message: "Target item is required for specific discounts"
      });
    }

    if (data.couponType === "discount" && data.discountValue == null) {
      ctx.addIssue({
        code: "custom",
        path: ["discountValue"],
        message: "Discount value is required for discount coupons"
      });
    }

    if (data.couponType === "sale_price" && data.salePrice == null) {
      ctx.addIssue({
        code: "custom",
        path: ["salePrice"],
        message: "Sale price is required for sale price coupons"
      });
    }

    if (data.couponType === "buy_x_get_y" && (data.buyQuantity == null || data.getQuantity == null)) {
      ctx.addIssue({
        code: "custom",
        path: ["buyQuantity"],
        message: "Buy/Get quantities are required for BOGO coupons"
      });
    }
  });

export const documentListQuerySchema = z.object({
  search: z.string().optional(),
  status: z.string().optional(),
  sort: z.enum(["latest", "oldest", "a_to_z"]).optional()
});

export const supportTicketSchema = z.object({
  subject: z.string().min(3).max(255),
  category: z.string().min(2).max(100),
  message: z.string().min(5).max(5000)
});

export const messageSchema = z.object({
  documentId: z.string().uuid(),
  receiverId: z.string().uuid(),
  message: z.string().min(1).max(5000)
});

export const assignEditorSchema = z.object({
  documentId: z.string().uuid(),
  editorId: z.string().uuid(),
  reason: z.string().max(500).optional(),
  adminNotes: z.string().max(2000).optional()
});

export const adjustDeadlineSchema = z.object({
  documentId: z.string().uuid(),
  newDeadline: z.string().datetime(),
  reason: z.string().max(500),
  adminNotes: z.string().max(2000).optional()
});

export const restrictAccountSchema = z.object({
  targetUserId: z.string().uuid(),
  restrictionType: z.string().min(2).max(80),
  restrictionDuration: z.string().min(1).max(80),
  reason: z.string().min(3).max(500),
  adminNotes: z.string().max(2000).optional()
});

export const suspendAccountSchema = z.object({
  targetUserId: z.string().uuid(),
  reason: z.string().min(3).max(500),
  adminNotes: z.string().max(2000).optional()
});

export const updateAvailabilitySchema = z.object({
  availabilityStatus: z.enum(["available", "busy", "at_capacity", "vacation"]),
  maximumActiveAssignments: z.number().int().min(0).max(999).optional(),
  maximumWordCountPerDay: z.number().int().min(0).max(100000).optional().nullable(),
  vacationStartDate: z.string().datetime().optional().nullable(),
  vacationEndDate: z.string().datetime().optional().nullable(),
  adminNotes: z.string().max(2000).optional()
});

export const requestExtensionSchema = z.object({
  documentId: z.string().uuid(),
  proposedNewDeadline: z.string().datetime(),
  reason: z.string().min(3).max(1000)
});

export const cancelDocumentSchema = z.object({
  documentId: z.string().uuid(),
  cancellationReason: z.string().min(3).max(500),
  refundRequired: z.boolean(),
  adminNotes: z.string().max(2000).optional()
});

export const markReadSchema = z.object({
  notificationIds: z.array(z.string().uuid()).min(1)
});
