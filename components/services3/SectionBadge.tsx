type SectionBadgeProps = {
  label: string;
  icon?: React.ReactNode;
  tone?: string;
};

export function SectionBadge({
  label,
  icon,
}: SectionBadgeProps) {
  return (
    <div className="landing-section-badge">
      {icon ? (
        icon
      ) : (
        <svg className="w-4 h-4" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
          <circle cx="8" cy="8" r="8" fill="#00A0E3" />
          <path d="M4 8L7 11L12 5" stroke="white" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      )}
      <span className="landing-section-badge-text">{label}</span>
    </div>
  );
}