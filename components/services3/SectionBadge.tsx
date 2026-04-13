type SectionBadgeProps = {
  label: string;
  tone?: "neutral" | "blue";
};

export function SectionBadge({ label, tone = "neutral" }: SectionBadgeProps) {
  const isBlue = tone === "blue";

  return (
    <div
      className={`inline-flex items-center gap-2 rounded-full border px-3 py-1.5 shadow-[0_0_12px_rgba(28,28,29,0.08)] ${
        isBlue ? "border-[#BFE2F6] bg-[#EAF6FB]" : "border-[#ECECEC] bg-white"
      }`}
    >
      <span className={`inline-flex h-4 w-4 items-center justify-center rounded-[4px] ${isBlue ? "bg-[#00A0E3]" : "bg-[#1C1C1D]"}`}>
        <svg className="h-2.5 w-2.5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 5h10a2 2 0 012 2v10a2 2 0 01-2 2H7a2 2 0 01-2-2V7a2 2 0 012-2zm0 3h10M7 13h10M7 17h6" />
        </svg>
      </span>
      <span className={`text-[11px] sm:text-[12px] font-medium uppercase tracking-[0.08em] ${isBlue ? "text-[#00A0E3]" : "text-[#1C1C1D]"}`}>
        {label}
      </span>
    </div>
  );
}
