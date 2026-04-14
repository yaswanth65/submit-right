# Payment APIs Documentation - Submit Right

## Table of Contents
1. [Available APIs](#available-apis)
2. [Current Integration Status](#current-integration-status)
3. [Payment Flow Breakdown](#payment-flow-breakdown)
4. [Post-Payment Workflows](#post-payment-workflows)
5. [Mock Payment Form Implementation](#mock-payment-form-implementation)
6. [User Flow Feasibility Analysis](#user-flow-feasibility-analysis)

---

## Available APIs

### 1. **Client Payment APIs** (`/api/client/payments/`)

#### GET `/api/client/payments`
**Purpose**: Fetch client's payment and document overview
**Authentication**: Client role required
**Response**:
```typescript
{
  pendingPaymentDocuments: PaymentDocument[], // Documents awaiting payment
  transactionHistory: Transaction[],          // All past transactions
  documentList: PaymentDocument[],           // All documents (any status)
  transactionInvoices: Array<{
    invoiceNumber: string;
    amount: number;
    status: "pending" | "paid" | "completed" | "failed";
  }>
}
```

**Use Case**: Display pending payments and transaction history on client dashboard

---

#### POST `/api/client/payments/create-order`
**Purpose**: Create a Razorpay order for document payment
**Authentication**: Client role required
**Request Body**:
```typescript
{
  documentId: string; // UUID of document to pay for
}
```

**Response**:
```typescript
{
  id: string;                    // Razorpay Order ID
  amount: number;               // Amount in paise (INR × 100)
  currency: "INR";
  receipt: string;              // Invoice number (INV-{timestamp})
  status: "created" | "paid";
  notes: {
    documentId: string;
    clientId: string;
  }
}
```

**Database Side Effects**:
- Creates entry in `payment_transactions` table with:
  - `razorpay_order_id`: Order ID from Razorpay
  - `invoice_number`: Generated format (INV-{timestamp})
  - `amount`: From document's `estimated_total`
  - `status`: "pending"
  - `gateway_status`: "created"

---

### 2. **Admin Payment APIs** (`/api/admin/payments/`)

#### GET `/api/admin/payments`
**Purpose**: Admin dashboard payment overview and transaction management
**Authentication**: Admin role required
**Response**:
```typescript
{
  totalRevenueThisMonth: number;              // Sum of paid transactions
  pendingStudentPayments: number;             // Count of pending transactions
  transactionsAwaitingSettlement: Payment[];  // Array of pending payments
  studentPayments: Payment[]                  // All payment records with relations
}
```

**Data Includes** (per transaction):
```typescript
{
  id: string;
  document_id: string;
  client_id: string;
  invoice_number: string;
  razorpay_order_id: string;
  razorpay_payment_id?: string;
  payment_method?: string; // "card", "upi", "netbanking", etc.
  amount: number;
  status: "pending" | "paid" | "failed";
  gateway_status: "created" | "captured";
  paid_at?: string;
  created_at: string;
  // Relations populated:
  documents: {
    document_title: string;
    deadline_at: string;
    service_id: string;
  };
  profiles: {
    full_name: string; // Client name
  }
}
```

**Use Case**: Admin overview of revenue, pending payments, and settlement tracking

---

### 3. **Payment Webhook** (`/api/payments/webhook`)

#### POST `/api/payments/webhook`
**Purpose**: Receive and verify Razorpay webhook notifications
**Trigger**: Razorpay sends this when payment is completed
**Authentication**: Signature verification using HMAC-SHA256

**Payload**:
```typescript
{
  event: "payment.captured" | "payment.failed" | "payment.authorized";
  payload: {
    payment: {
      entity: {
        id: string;              // razorpay_payment_id
        order_id: string;        // razorpay_order_id
        method: string;          // payment method
        status: "captured";
        amount: number;
      }
    }
  }
}
```

**Webhook Processing** (on `payment.captured`):
1. ✅ Verifies signature validity
2. ✅ Updates `payment_transactions`:
   - `status` → "paid"
   - `gateway_status` → "captured"
   - `razorpay_payment_id` → payment ID
   - `payment_method` → method used
   - `paid_at` → current timestamp

3. ✅ Updates `documents`:
   - `status` → "completed"
   - `payment_status` → "paid"
   - `completed_at` → current timestamp

4. ✅ Creates notification for client:
   - Type: "payment"
   - Title: "Payment received"
   - Body: `Payment received for invoice {invoice_number}`

---

## Current Integration Status

### ✅ What's Implemented
- Razorpay SDK configured (`lib/razorpay.ts`)
- Order creation endpoint working
- Webhook signature verification in place
- Post-payment document status updates
- Client payment history tracking
- Admin payment dashboard with revenue aggregation

### ❌ What's Missing (For Production)
1. **Frontend Payment Form**:
   - No Razorpay modal/form integration on client side
   - No checkout UI component
   - Coupon validation on checkout not implemented
   - No "Proceed to Checkout" button functionality

2. **Real Payment Gateway UI**:
   - Currently hardcoded flow, no actual payment modal
   - No test/live mode switching

3. **Refund Handling**:
   - No refund API endpoint
   - No refund webhook listener

4. **Payment Retry Logic**:
   - No retry mechanism for failed payments

---

## Payment Flow Breakdown

### Current Complete Flow
```
1. Client uploads document
     ↓
2. Client selects service/package
     ↓
3. Estimated total calculated (stored in documents.estimated_total)
     ↓
4. Client clicks "Pay Now" (MISSING - no UI yet)
     ↓
5. POST /api/client/payments/create-order
     ↓
6. Razorpay order created (order.id returned)
     ↓
7. Frontend displays Razorpay payment modal (MISSING)
     ↓
8. Client enters payment details
     ↓
9. Razorpay processes payment
     ↓
10. POST /api/payments/webhook
     ↓
11. Signature verified, database updated
     ↓
12. Document marked "completed" with payment_status = "paid"
     ↓
13. Notification sent to client
```

---

## Post-Payment Workflows

### Workflow 1: Service Selection → Payment → Release to Editor
```
BEFORE PAYMENT:
- Document status: "submitted"
- Document.service_id: populated
- Document.estimated_total: calculated
- Document.payment_status: null

PAYMENT TRIGGERED:
- POST /api/client/payments/create-order
- Razorpay modal shown (TO IMPLEMENT)

AFTER PAYMENT CAPTURED (via webhook):
- Document.status → "completed"
- Document.payment_status → "paid"
- Document.completed_at → set
- Notification → sent to client
- Document → READY FOR EDITOR ASSIGNMENT

Editor flow (admin side):
- Admin can view document as "paid" and ready
- Admin assigns editor
- Document status might change to "in_progress" or "assigned"
```

### Workflow 2: Multiple Services/Packages Selection
```
CURRENT LIMITATION:
- Document can only have ONE service_id (single payment)
- If package/service includes multiple sub-services, 
  they're bundled in estimated_total calculation

TO SUPPORT MULTIPLE SERVICES:
- Would need to change database structure
- Allow multiple service entries per document
- Adjust pricing calculation logic
```

---

## Mock Payment Form Implementation

### Step 1: Create Mock Payment Modal Component (`/components/MockPaymentModal.tsx`)

```tsx
"use client";

import React, { useState } from "react";
import { X, AlertCircle, CheckCircle, Lock } from "lucide-react";

type MockPaymentModalProps = {
  isOpen: boolean;
  onClose: () => void;
  onPaymentSuccess: () => Promise<void>;
  documentTitle: string;
  estimatedTotal: number;
  invoiceNumber: string;
};

export function MockPaymentModal({
  isOpen,
  onClose,
  onPaymentSuccess,
  documentTitle,
  estimatedTotal,
  invoiceNumber
}: MockPaymentModalProps) {
  const [couponCode, setCouponCode] = useState("");
  const [discountAmount, setDiscountAmount] = useState(0);
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [paymentStep, setPaymentStep] = useState<"cart" | "payment" | "success">("cart");

  if (!isOpen) return null;

  const finalAmount = estimatedTotal - discountAmount;

  async function handleApplyCoupon() {
    // Mock coupon validation (TO IMPLEMENT: call actual API)
    const mockCoupons: Record<string, number> = {
      "SUBMIT500": 500,
      "WELCOME20": estimatedTotal * 0.20,
      "NEWUSER10": estimatedTotal * 0.10
    };

    const discount = mockCoupons[couponCode.toUpperCase()];
    if (discount) {
      setDiscountAmount(discount);
      setError(null);
    } else {
      setError("Invalid coupon code");
      setDiscountAmount(0);
    }
  }

  async function handlePayment() {
    setIsProcessing(true);
    setError(null);

    try {
      // Step 1: Simulate payment processing
      await new Promise((resolve) => setTimeout(resolve, 1500));

      // Step 2: Mock payment success
      setPaymentStep("success");

      // Step 3: Call success callback
      await onPaymentSuccess();

      // Step 4: Close after 2 seconds
      setTimeout(() => {
        onClose();
        setPaymentStep("cart");
      }, 2000);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Payment failed");
      setPaymentStep("payment");
    } finally {
      setIsProcessing(false);
    }
  }

  return (
    <div className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-[16px] w-full max-w-md shadow-2xl">
        {/* Header */}
        <div className="p-6 border-b border-[#EAECF0] flex items-center justify-between">
          <div className="text-[18px] font-bold text-[#171717]">
            {paymentStep === "success" ? "✓ Payment Successful" : "Checkout"}
          </div>
          <button
            onClick={onClose}
            disabled={isProcessing}
            className="p-2 hover:bg-[#F9FAFB] rounded-full transition-colors disabled:opacity-50"
          >
            <X className="w-5 h-5 text-[#525866]" />
          </button>
        </div>

        {/* Body */}
        <div className="p-6">
          {paymentStep === "cart" && (
            <div className="space-y-6">
              {/* Order Summary */}
              <div className="bg-[#FAFAFA] rounded-[12px] p-4 space-y-3">
                <div className="text-[14px] font-medium text-[#525866]">Order Summary</div>
                <div className="flex justify-between items-start">
                  <div className="text-[13px] text-[#525866]">
                    <p className="font-medium text-[#171717]">{documentTitle}</p>
                    <p className="text-[12px] mt-1">Invoice: {invoiceNumber}</p>
                  </div>
                  <div className="text-[14px] font-semibold text-[#171717]">
                    ₹{estimatedTotal.toFixed(2)}
                  </div>
                </div>
                {discountAmount > 0 && (
                  <>
                    <div className="h-px bg-[#EAECF0]" />
                    <div className="flex justify-between">
                      <span className="text-[13px] text-[#1CB061]">Discount Applied</span>
                      <span className="text-[13px] font-semibold text-[#1CB061]">
                        -₹{discountAmount.toFixed(2)}
                      </span>
                    </div>
                  </>
                )}
              </div>

              {/* Coupon Entry */}
              <div className="space-y-2">
                <label className="text-[13px] font-medium text-[#171717]">
                  Coupon Code (Optional)
                </label>
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={couponCode}
                    onChange={(e) => setCouponCode(e.target.value)}
                    placeholder="e.g., SUBMIT500"
                    className="flex-1 px-4 py-2.5 border border-[#EAECF0] rounded-[8px] text-[13px] outline-none focus:border-[#00A0E3]"
                  />
                  <button
                    onClick={handleApplyCoupon}
                    disabled={!couponCode}
                    className="px-4 py-2.5 bg-[#F9FAFB] border border-[#EAECF0] rounded-[8px] text-[13px] font-medium text-[#171717] hover:bg-[#EAECF0] transition-colors disabled:opacity-50"
                  >
                    Apply
                  </button>
                </div>
              </div>

              {error && (
                <div className="flex gap-2 p-3 bg-[#FEF2F2] border border-[#FECACA] rounded-[8px]">
                  <AlertCircle className="w-5 h-5 text-[#FB3748] shrink-0 mt-0.5" />
                  <p className="text-[13px] text-[#FB3748]">{error}</p>
                </div>
              )}

              {/* Total */}
              <div className="bg-[#EFF6FF] border border-[#00A0E3] rounded-[12px] p-4">
                <div className="flex justify-between items-center">
                  <span className="text-[14px] font-medium text-[#171717]">Total Amount</span>
                  <span className="text-[20px] font-bold text-[#00A0E3]">
                    ₹{finalAmount.toFixed(2)}
                  </span>
                </div>
              </div>
            </div>
          )}

          {paymentStep === "payment" && (
            <div className="space-y-4">
              <div className="bg-[#F9FAFB] rounded-[12px] p-4 border border-[#EAECF0] space-y-3">
                <div className="text-[13px] font-medium text-[#171717]">Payment Details</div>
                <div className="space-y-3">
                  <div>
                    <label className="text-[12px] font-medium text-[#525866]">
                      Card Number
                    </label>
                    <input
                      type="text"
                      placeholder="4242 4242 4242 4242"
                      className="w-full mt-1 px-3 py-2 border border-[#EAECF0] rounded-[8px] text-[13px] outline-none focus:border-[#00A0E3]"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="text-[12px] font-medium text-[#525866]">Expiry</label>
                      <input
                        type="text"
                        placeholder="MM/YY"
                        className="w-full mt-1 px-3 py-2 border border-[#EAECF0] rounded-[8px] text-[13px] outline-none focus:border-[#00A0E3]"
                      />
                    </div>
                    <div>
                      <label className="text-[12px] font-medium text-[#525866]">CVV</label>
                      <input
                        type="text"
                        placeholder="123"
                        className="w-full mt-1 px-3 py-2 border border-[#EAECF0] rounded-[8px] text-[13px] outline-none focus:border-[#00A0E3]"
                      />
                    </div>
                  </div>
                </div>
              </div>
              <div className="flex gap-2 p-3 bg-[#EFF6FF] border border-[#00A0E3] rounded-[8px]">
                <Lock className="w-4 h-4 text-[#00A0E3] shrink-0 mt-0.5" />
                <p className="text-[12px] text-[#00A0E3]">
                  All payments are secured by Razorpay. Your card data is encrypted.
                </p>
              </div>
            </div>
          )}

          {paymentStep === "success" && (
            <div className="space-y-4 text-center">
              <div className="mx-auto w-[60px] h-[60px] bg-[#E0F2E9] rounded-full flex items-center justify-center">
                <CheckCircle className="w-8 h-8 text-[#1CB061]" />
              </div>
              <div>
                <p className="text-[16px] font-bold text-[#171717]">Payment Successful!</p>
                <p className="text-[13px] text-[#525866] mt-1">
                  Your document has been submitted for editing
                </p>
              </div>
              <div className="bg-[#FAFAFA] rounded-[8px] p-3 text-[13px]">
                <p className="text-[#525866]">
                  Invoice: <span className="font-semibold text-[#171717]">{invoiceNumber}</span>
                </p>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-6 border-t border-[#EAECF0] flex gap-3">
          <button
            onClick={onClose}
            disabled={isProcessing}
            className="flex-1 px-4 py-2.5 border border-[#EAECF0] rounded-[8px] text-[14px] font-medium text-[#171717] hover:bg-[#F9FAFB] transition-colors disabled:opacity-50"
          >
            {paymentStep === "success" ? "Close" : "Cancel"}
          </button>
          {paymentStep !== "success" && (
            <button
              onClick={() => {
                if (paymentStep === "cart") {
                  setPaymentStep("payment");
                } else {
                  handlePayment();
                }
              }}
              disabled={isProcessing}
              className="flex-1 px-4 py-2.5 bg-[#00A0E3] rounded-[8px] text-[14px] font-medium text-white hover:bg-[#008cc2] transition-colors disabled:opacity-50"
            >
              {isProcessing ? "Processing..." : paymentStep === "cart" ? "Continue" : "Pay Now"}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
```

### Step 2: Integrate into User Payments Page

```tsx
// In app/user/payments/page.tsx
import { MockPaymentModal } from "@/components/MockPaymentModal";
import { apiRequest } from "@/lib/client-api";

export default function PaymentsPage() {
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [selectedDoc, setSelectedDoc] = useState<PaymentDocument | null>(null);

  async function handleCheckoutClick(doc: PaymentDocument) {
    setSelectedDoc(doc);
    setShowPaymentModal(true);
  }

  async function handlePaymentSuccess() {
    try {
      // Call actual payment creation endpoint
      const order = await apiRequest("/api/client/payments/create-order", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ documentId: selectedDoc!.id })
      });

      // In production, initialize Razorpay modal with order details
      // For now, mock simulates payment captured webhook
      console.log("Order created:", order);

      // Refresh payment list
      await loadPayments();
    } catch (error) {
      console.error("Payment failed:", error);
    }
  }

  return (
    <>
      {/* Existing content */}
      
      {/* Checkout Pending Button */}
      <button
        onClick={() => handleCheckoutClick(selectedPendingDoc)}
        className="bg-[#F97316] hover:bg-[#EA580C] text-white px-5 py-2.5 rounded-[8px]"
      >
        Checkout Pending
      </button>

      {/* Payment Modal */}
      <MockPaymentModal
        isOpen={showPaymentModal}
        onClose={() => {
          setShowPaymentModal(false);
          setSelectedDoc(null);
        }}
        onPaymentSuccess={handlePaymentSuccess}
        documentTitle={selectedDoc?.document_title || ""}
        estimatedTotal={selectedDoc?.estimated_total || 0}
        invoiceNumber={`INV-${Date.now()}`}
      />
    </>
  );
}
```

### Step 3: API Endpoint for Real Coupon Validation (TO CREATE)

```typescript
// app/api/client/payments/validate-coupon/route.ts
import { NextRequest } from "next/server";
import { ok, fail } from "@/lib/http";
import { asResponse } from "@/lib/route";
import { requireRole } from "@/lib/auth";
import { supabaseAdmin } from "@/lib/supabase";

export async function POST(req: NextRequest) {
  try {
    const user = await requireRole("client");
    const { couponCode, documentId } = (await req.json()) as {
      couponCode: string;
      documentId: string;
    };

    // Fetch document to get estimated total
    const { data: document } = await supabaseAdmin
      .from("documents")
      .select("*")
      .eq("id", documentId)
      .eq("client_id", user.profileId)
      .single();

    if (!document) return fail("Document not found", 404);

    // Fetch coupon
    const { data: coupon } = await supabaseAdmin
      .from("discount_campaigns")
      .select("*")
      .eq("coupon_code", couponCode.toUpperCase())
      .eq("is_active", true)
      .single();

    if (!coupon) return fail("Coupon not found or expired", 404);

    // Validate coupon dates
    const now = new Date();
    if (coupon.start_date && new Date(coupon.start_date) > now) {
      return fail("Coupon not yet active", 400);
    }
    if (coupon.end_date && new Date(coupon.end_date) < now) {
      return fail("Coupon has expired", 400);
    }

    // Validate coupon usage limits
    if (coupon.limit_total_uses && coupon.current_usage_count >= coupon.limit_total_uses) {
      return fail("Coupon usage limit reached", 400);
    }

    // Calculate discount
    let discountAmount = 0;
    if (coupon.coupon_type === "discount") {
      discountAmount = coupon.discount_value || 0;
    } else if (coupon.coupon_type === "sale_price") {
      discountAmount = Math.max(0, document.estimated_total - (coupon.sale_price || 0));
    }

    return ok({
      isValid: true,
      couponId: coupon.id,
      descountAmount,
      finalAmount: Math.max(0, document.estimated_total - discountAmount)
    });
  } catch (error) {
    return asResponse(error);
  }
}
```

---

## User Flow Feasibility Analysis

### Flow 1: Service Detail Page → Direct Service Selection → Payment

**Scenario**: Client clicks "Get Started" on Service 1 page and should be directed to submit document with Service pre-selected

#### Current Status: ⚠️ **PARTIALLY FEASIBLE**

**What Needs to Change**:

1. **Service ID Passing**:
   - Service detail page (e.g., `/services/1`) needs to capture service ID
   - Pass to `/user/submit-document` as query param: `?serviceId={id}&serviceName={name}`

2. **Document Submission Flow Update**:
```typescript
// In app/user/submit-document/page.tsx

export default function SubmitDocumentPage() {
  const searchParams = useSearchParams();
  const preSelectedServiceId = searchParams.get("serviceId");
  
  useEffect(() => {
    if (preSelectedServiceId) {
      // Skip step 3 (service selection), go directly to step 4 (review)
      setCurrentStep(4); // or skip to step 5
      setSelectedServiceId(preSelectedServiceId);
      
      // Load service details and calculate pricing
      loadServiceAndCalculatePrice(preSelectedServiceId);
    }
  }, [preSelectedServiceId]);
}
```

3. **Step Flow Change**:
```
CURRENT: Step 1 → Step 2 → Step 3 (Select Service) → Step 4 → Step 5
NEW:     Step 1 → Step 2 → [SKIP Step 3 if pre-selected] → Step 4 → Step 5
```

#### Implementation Steps:
- [ ] Modify ServiceHero component to include "Get Started" CTA with service ID
- [ ] Update `/user/submit-document` to accept `serviceId` query parameter
- [ ] Conditionally skip service selection step if serviceId exists
- [ ] Show selected service prominently in review step

#### Feasibility: **HIGH** ✅ (2-3 hours work)

---

### Flow 2: Dashboard Submit Document → Show Services/Packages First → Then Payment

**Scenario**: Client clicks "Submit Document" on dashboard and should see:
1. All available services and packages
2. Select one (service is optional, but package requires payment)
3. Only show payment form if package selected (payment-first flow)
4. Upon payment, document is released/ready

#### Current Status: ⚠️ **NEEDS ARCHITECTURE CHANGE**

**Current Architecture Issues**:
1. **Single Service per Document**: Database schema allows only one `service_id` per document
2. **Payment Tied to Service**: Payment created only after service selection
3. **No Pre-payment Service Browsing**: Services selected in step 3 of document submission

**Proposed Architecture Changes**:

#### Option A: Package-Only Payment Flow (SIMPLER)
- Packages = Payment First
- Services = Payment Not Required (Free or bundled with package)

```typescript
// Modified document flow:
documents.service_id: null        // Can be null until service is assigned
documents.package_id: UUID        // NEW: package reference (if applicable)
documents.payment_required: boolean
documents.payment_status: null | "pending" | "paid"

// Service/Package Selection Logic:
if (itemKind === "package") {
  // Payment required, create order, mark payment_required = true
  // Trigger payment flow BEFORE document submission
  
} else if (itemKind === "service") {
  // No payment required, allow direct submission
  // Admin can assign service later
}
```

#### Option B: Full Multi-Selection Framework (COMPLEX)
- Allow multiple services/packages per document
- Calculate total across all selections
- Single payment for all items

```typescript
// NEW TABLE: document_selections
document_selections: {
  id: UUID;
  document_id: UUID;
  service_id?: UUID;
  package_id?: UUID;
  quantity: number;
  price: number;
  selected_at: timestamp;
}

// Document update:
documents: {
  // ... existing fields
  total_selections: number;
  total_amount: number;
  payment_required: boolean;
}
```

#### Implementation Path for Option A:

1. **Create Package-First UI Component**:
```tsx
// components/PackageMarketplace.tsx
export function PackageMarketplace({ onSelect }: { onSelect: (packageId: string) => void }) {
  const [packages, setPackages] = useState<Package[]>([]);

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {packages.map((pkg) => (
        <div key={pkg.id} className="border rounded-lg p-6 hover:shadow-lg">
          <h3>{pkg.title}</h3>
          <p className="text-[14px] text-gray-600">{pkg.description}</p>
          <div className="mt-4">
            <p className="text-[20px] font-bold">₹{pkg.base_price}</p>
            <button
              onClick={() => onSelect(pkg.id)}
              className="mt-4 w-full bg-[#00A0E3] text-white py-2 rounded"
            >
              Select Package
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}
```

2. **Modify Document Submission Flow**:
```typescript
// New flow for dashboard "Submit Document"
STEP 1: Show package marketplace
  ├─ User selects package → proceed to payment (PAYMENT FIRST)
  └─ User skips → proceed to document upload (SERVICE LATER)

STEP 2: Upload document (conditional on package selection)

STEP 3: Add details (optional service additional)

STEP 4: Review & Submit

STEP 5: If package selected → Redirect to payment
        If no package → Submit document, mark ready for assignment
```

3. **Update Pricing Logic**:
```typescript
// In selectDocumentService / selectDocumentPackage
if (item.kind === "package") {
  estimatedTotal = item.base_price; // Flat price
  paymentRequired = true;
} else if (item.kind === "service") {
  estimatedTotal = wordCount × item.rate_per_word;
  paymentRequired = false; // Service pricing used by admin for assignment
}
```

#### Feasibility Assessment:

| Aspect | Option A (Simpler) | Option B (Complex) |
|--------|-------------------|-------------------|
| **Implementation Time** | 4-6 hours | 2-3 days |
| **Database Changes** | Minimal (1 field) | Moderate (1 new table) |
| **API Changes** | 1-2 endpoints | 3-4 endpoints |
| **Frontend Changes** | 3 components | 6-8 components |
| **Breaking Changes** | None | Potential |
| **Recommended** | ✅ YES | Later phase |

#### Step-by-Step Implementation (Option A):

**Phase 1: Backend**
- [ ] Add `package_id` nullable column to documents table
- [ ] Add `payment_required` boolean to documents table
- [ ] Create `POST /api/client/documents/select-package` endpoint
- [ ] Update `selectDocumentService` to check item kind

**Phase 2: Frontend**
- [ ] Create `PackageMarketplace` UI component
- [ ] Update dashboard "Submit Document" flow
- [ ] Add package selection modal/page
- [ ] Modify document submission to accept package_id

**Phase 3: Integration**
- [ ] Wire MockPaymentModal into package selection flow
- [ ] Test package + payment flow end-to-end
- [ ] Update admin dashboard to handle package-assigned documents

#### Feasibility: **MEDIUM** ✅ (Achievable in 1 sprint with Option A)

---

## Summary & Recommendations

### Immediate Actions (Week 1)
1. **Implement Mock Payment Form** using provided component
2. **Add coupon validation API** endpoint
3. **Test Payment Flow**: Create-Order → Mock → Webhook → Document update

### Short Term (Week 2-3)
1. **Flow 1 (Service Pre-selection)**: 
   - Add serviceId query parameter handling
   - Skip service selection step if pre-selected
   - HIGH PRIORITY - Easy win

2. **Flow 2 (Package-First)**:
   - Implement Option A (Package-only payment first)
   - Add package selection UI
   - Update document submission flow
   - MEDIUM PRIORITY - Two-way value

### Long Term (Month 2+)
1. Real Razorpay integration (replace mock)
2. Refund handling
3. Payment retry logic
4. Option B implementation if needed

---

## Code Examples - Integration Points

### Where to Add Payment Buttons

**1. Client Payments Dashboard**:
```tsx
// In app/user/payments/page.tsx - Add to pending documents section
<button
  onClick={() => initiateCheckout(doc)}
  className="bg-[#F97316] text-white px-4 py-2 rounded"
>
  Pay Now
</button>
```

**2. Document Review Page**:
```tsx
// In app/user/submit-document/page.tsx - Step 5 Review
{currentStep === 5 && (
  <button
    onClick={() => setShowPaymentModal(true)}
    className="bg-[#00A0E3] text-white px-6 py-3 rounded-lg"
  >
    Proceed to Payment
  </button>
)}
```

**3. Admin Payment Detail**:
```tsx
// In app/admin/payments/[id]/page.tsx - Action buttons
{transaction.status === "pending" && (
  <button className="text-[#FB3748]">Mark as Failed</button>
)}
```

---

## Testing Checklist

- [ ] Create order returns valid Razorpay order object
- [ ] Invoice number generates correctly
- [ ] Payment transaction record created
- [ ] Webhook signature verification works
- [ ] Document status updates to "completed" post-payment
- [ ] Notification sent to client
- [ ] Coupon validation API works
- [ ] Discount calculation correct
- [ ] Final amount reflects discount
- [ ] Admin can see all transactions
- [ ] Revenue metrics calculate correctly

