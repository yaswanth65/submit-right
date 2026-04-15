export function SectionBadge({ label }: { label: string }) {
  return (
    <div className="landing-section-badge">
     <img src="/vector2.svg" alt="icon" className="w-4 h-4" />
      <span className="landing-section-badge-text">{label}</span>
    </div>
  );
}