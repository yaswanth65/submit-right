export function SectionBadge({ label }: { label: string }) {
  return (
    <div className="landing-section-badge">
      <svg className="w-3.5 h-3.5 text-[#1C1C1D]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
      <span className="landing-section-badge-text">{label}</span>
    </div>
  );
}