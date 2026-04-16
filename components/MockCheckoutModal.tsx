"use client";

import { useEffect, useMemo, useState } from "react";
import { AlertCircle, CheckCircle2, CreditCard, Loader2, Lock, X } from "lucide-react";
import { apiRequest } from "@/lib/client-api";

type MockOrderResponse = {
  id: string;
  amount: number;
  currency: string;
  receipt: string;
  status: string;
  transactionId: string;
};

type CouponValidationResponse = {
  isValid: boolean;
  couponId: string | null;
  couponCode: string | null;
  subtotal: number;
  discountAmount: number;
  finalAmount: number;
};

type MockCheckoutResponse = {
  transaction: {
    invoice_number?: string;
    amount?: number;
    status?: string;
  };
  billing: {
    subtotal: number;
    discountAmount: number;
    total: number;
    couponCode: string | null;
  };
};

type CheckoutContext = {
  documentId: string;
  documentTitle: string;
  amount: number;
  requireUpfrontPayment?: boolean;
};

type MockCheckoutModalProps = {
  isOpen: boolean;
  onClose: () => void;
  onSuccess?: (result: MockCheckoutResponse) => Promise<void> | void;
  context: CheckoutContext | null;
};

function formatCurrency(value: number) {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 2
  }).format(value);
}

export function MockCheckoutModal({ isOpen, onClose, onSuccess, context }: MockCheckoutModalProps) {
  const [couponCode, setCouponCode] = useState("");
  const [appliedCouponCode, setAppliedCouponCode] = useState<string | null>(null);
  const [discountAmount, setDiscountAmount] = useState(0);
  const [isApplyingCoupon, setIsApplyingCoupon] = useState(false);
  const [isLoadingOrder, setIsLoadingOrder] = useState(false);
  const [isPaying, setIsPaying] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [invoiceNumber, setInvoiceNumber] = useState("");
  const [orderError, setOrderError] = useState<string | null>(null);
  const [couponError, setCouponError] = useState<string | null>(null);
  const [paymentError, setPaymentError] = useState<string | null>(null);

  const subtotal = Number(context?.amount ?? 0);

  const finalAmount = useMemo(() => {
    return Math.max(0, subtotal - discountAmount);
  }, [subtotal, discountAmount]);

  useEffect(() => {
    if (!isOpen || !context) {
      return;
    }

    let active = true;

    const bootstrapOrder = async () => {
      setIsLoadingOrder(true);
      setOrderError(null);
      setCouponError(null);
      setPaymentError(null);
      setIsSuccess(false);
      setCouponCode("");
      setAppliedCouponCode(null);
      setDiscountAmount(0);

      try {
        const order = await apiRequest<MockOrderResponse>("/api/client/payments/create-order", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ documentId: context.documentId })
        });

        if (active) {
          setInvoiceNumber(order.receipt || "");
        }
      } catch (error) {
        if (active) {
          setOrderError(error instanceof Error ? error.message : "Unable to initialize checkout");
        }
      } finally {
        if (active) {
          setIsLoadingOrder(false);
        }
      }
    };

    void bootstrapOrder();

    return () => {
      active = false;
    };
  }, [isOpen, context]);

  if (!isOpen || !context) {
    return null;
  }

  async function handleApplyCoupon() {
    if (!context) return;
    
    if (!couponCode.trim()) {
      setCouponError("Enter a coupon code to apply");
      return;
    }

    try {
      setIsApplyingCoupon(true);
      setCouponError(null);
      const response = await apiRequest<CouponValidationResponse>("/api/client/payments/validate-coupon", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          documentId: context.documentId,
          couponCode: couponCode.trim().toUpperCase()
        })
      });

      setDiscountAmount(Number(response.discountAmount ?? 0));
      setAppliedCouponCode(response.couponCode || couponCode.trim().toUpperCase());
    } catch (error) {
      setDiscountAmount(0);
      setAppliedCouponCode(null);
      setCouponError(error instanceof Error ? error.message : "Unable to validate coupon");
    } finally {
      setIsApplyingCoupon(false);
    }
  }

  async function handlePayNow() {
    if (!context) return;
    
    try {
      setIsPaying(true);
      setPaymentError(null);

      const result = await apiRequest<MockCheckoutResponse>("/api/client/payments/mock-checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          documentId: context.documentId,
          couponCode: appliedCouponCode,
          paymentMethod: "mock_checkout"
        })
      });

      setIsSuccess(true);
      if (onSuccess) {
        await onSuccess(result);
      }
    } catch (error) {
      setPaymentError(error instanceof Error ? error.message : "Payment failed");
    } finally {
      setIsPaying(false);
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#171717]/70 p-3 sm:p-4 backdrop-blur-[2px]">
      <div className="w-full max-w-[520px] overflow-hidden rounded-[14px] border border-[#EAECF0] bg-white shadow-[0_12px_40px_rgba(0,0,0,0.24)]">
        <div className="flex items-center justify-between border-b border-[#EAECF0] px-5 py-4">
          <div className="text-[18px] font-semibold text-[#171717]">Secure Checkout</div>
          <button
            type="button"
            onClick={onClose}
            disabled={isPaying}
            className="rounded-[8px] p-2 text-[#525866] transition-colors hover:bg-[#F5F7FA] disabled:opacity-60"
            aria-label="Close checkout"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        <div className="space-y-4 p-4 sm:p-5">
          {orderError ? (
            <div className="rounded-[10px] border border-[#FECACA] bg-[#FEF2F2] px-3 py-2 text-[13px] text-[#B42318]">{orderError}</div>
          ) : null}

          {isSuccess ? (
            <div className="rounded-[12px] border border-[#B7E5C8] bg-[#F0FDF5] p-4">
              <div className="mb-2 flex items-center gap-2 text-[#15803D]">
                <CheckCircle2 className="h-5 w-5" />
                <div className="text-[15px] font-semibold">Payment Successful</div>
              </div>
              <div className="text-[13px] text-[#166534]">
                <div>Invoice: {invoiceNumber || "Generated"}</div>
                <div>Amount Paid: {formatCurrency(finalAmount)}</div>
                <div className="mt-1">
                  {context.requireUpfrontPayment
                    ? "Your package payment is complete. You can continue and submit your document."
                    : "Payment was captured and your document access was updated."}
                </div>
              </div>
            </div>
          ) : null}

          <div className="rounded-[12px] border border-[#EAECF0] bg-[#FAFAFB] p-4">
            <div className="mb-3 text-[13px] font-semibold text-[#171717]">Order Summary</div>
            <div className="space-y-2 text-[13px] text-[#525866]">
              <div className="flex items-start justify-between gap-3">
                <div className="max-w-[65%]">{context.documentTitle || "Selected Document"}</div>
                <div className="font-medium text-[#171717]">{formatCurrency(subtotal)}</div>
              </div>
              <div className="flex items-center justify-between">
                <div>Invoice</div>
                <div className="font-medium text-[#171717]">{isLoadingOrder ? "Generating..." : invoiceNumber || "Pending"}</div>
              </div>
              {discountAmount > 0 ? (
                <div className="flex items-center justify-between text-[#15803D]">
                  <div>Coupon Discount</div>
                  <div className="font-semibold">- {formatCurrency(discountAmount)}</div>
                </div>
              ) : null}
              <div className="h-px bg-[#E4E7EC]" />
              <div className="flex items-center justify-between text-[15px] font-semibold text-[#171717]">
                <div>Total Payable</div>
                <div>{formatCurrency(finalAmount)}</div>
              </div>
            </div>
          </div>

          <div>
            <label className="mb-1.5 block text-[13px] font-medium text-[#171717]">Coupon Code</label>
            <div className="flex flex-col sm:flex-row gap-2">
              <input
                type="text"
                value={couponCode}
                onChange={(event) => setCouponCode(event.target.value.toUpperCase())}
                placeholder="Enter coupon"
                className="h-[40px] flex-1 rounded-[8px] border border-[#EAECF0] px-3 text-[14px] text-[#171717] outline-none focus:border-[#00A0E3]"
              />
              <button
                type="button"
                onClick={handleApplyCoupon}
                disabled={isApplyingCoupon || isPaying}
                className="h-[40px] rounded-[8px] border border-[#00A0E3] px-4 text-[13px] font-semibold text-[#00A0E3] transition-colors hover:bg-[#F0F9FF] disabled:opacity-60 w-full sm:w-auto"
              >
                {isApplyingCoupon ? "Applying..." : "Apply"}
              </button>
            </div>
            {couponError ? (
              <div className="mt-1.5 flex items-center gap-1.5 text-[12px] text-[#B42318]">
                <AlertCircle className="h-3.5 w-3.5" />
                <span>{couponError}</span>
              </div>
            ) : null}
            {appliedCouponCode && !couponError ? (
              <div className="mt-1.5 text-[12px] text-[#15803D]">Coupon {appliedCouponCode} applied successfully.</div>
            ) : null}
          </div>

          <div className="rounded-[10px] border border-[#B9E0F6] bg-[#EFF8FF] px-3 py-2 text-[12px] text-[#0C4A6E]">
            <div className="flex items-center gap-1.5">
              <Lock className="h-3.5 w-3.5" />
              <span>Mock checkout mode is active. No external gateway is called.</span>
            </div>
          </div>

          {paymentError ? (
            <div className="rounded-[10px] border border-[#FECACA] bg-[#FEF2F2] px-3 py-2 text-[13px] text-[#B42318]">{paymentError}</div>
          ) : null}
        </div>

        <div className="flex flex-col-reverse sm:flex-row items-stretch sm:items-center justify-end gap-2 border-t border-[#EAECF0] px-4 sm:px-5 py-4">
          <button
            type="button"
            onClick={onClose}
            disabled={isPaying}
            className="h-[40px] rounded-[8px] border border-[#EAECF0] px-4 text-[14px] font-medium text-[#525866] hover:bg-[#F9FAFB] disabled:opacity-60 w-full sm:w-auto"
          >
            {isSuccess ? "Done" : "Cancel"}
          </button>
          {!isSuccess ? (
            <button
              type="button"
              onClick={handlePayNow}
              disabled={isPaying || isLoadingOrder || !!orderError}
              className="inline-flex h-[40px] items-center justify-center gap-2 rounded-[8px] bg-[#00A0E3] px-5 text-[14px] font-semibold text-white transition-colors hover:bg-[#008CC7] disabled:opacity-60 w-full sm:w-auto"
            >
              {isPaying ? <Loader2 className="h-4 w-4 animate-spin" /> : <CreditCard className="h-4 w-4" />}
              {isPaying ? "Processing" : "Pay Now"}
            </button>
          ) : null}
        </div>
      </div>
    </div>
  );
}
