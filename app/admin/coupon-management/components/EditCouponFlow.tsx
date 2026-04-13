import { CouponModal } from "./CouponModal";
import { CouponCampaign } from "./types";

type EditCouponFlowProps = {
  isOpen: boolean;
  onClose: () => void;
  coupon: CouponCampaign | null;
  onSaved: () => Promise<void> | void;
};

export function EditCouponFlow({ isOpen, onClose, coupon, onSaved }: EditCouponFlowProps) {
  return (
    <CouponModal
      key={`edit-${coupon?.id ?? "none"}-${isOpen ? "open" : "closed"}`}
      mode="edit"
      isOpen={isOpen}
      onClose={onClose}
      onSaved={onSaved}
      initialCoupon={coupon}
    />
  );
}
