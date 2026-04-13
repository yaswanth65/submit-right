import { CouponModal } from "./CouponModal";

type AddCouponFlowProps = {
  isOpen: boolean;
  onClose: () => void;
  onSaved: () => Promise<void> | void;
};

export function AddCouponFlow({ isOpen, onClose, onSaved }: AddCouponFlowProps) {
  return (
    <CouponModal
      key={`create-${isOpen ? "open" : "closed"}`}
      mode="create"
      isOpen={isOpen}
      onClose={onClose}
      onSaved={onSaved}
      initialCoupon={null}
    />
  );
}
