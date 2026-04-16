type SectionBadgeProps = {
  label: string;
  imgSrc?: string;
  imgAlt?: string;
  icon?: React.ReactNode;
  tone?: string;
};

export function SectionBadge({
  label,
  imgSrc = "/vector2.svg",
  imgAlt = "icon",
  icon,
  tone,
}: SectionBadgeProps) {
  return (
    <div className="landing-section-badge">
      {icon ? (
        icon
      ) : (
        imgSrc && (
          <img
            src={imgSrc}
            alt={imgAlt}
            className="w-4 h-4"
          />
        )
      )}
      <span className="landing-section-badge-text">{label}</span>
    </div>
  );
}