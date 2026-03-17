export function StatCard({ 
  title, 
  value, 
  subtitle, 
  subtitleHighlight,
  highlightColor = "#1CB061" 
}: { 
  title: string; 
  value: string; 
  subtitle: string; 
  subtitleHighlight: string;
  highlightColor?: string;
}) {
  return (
    <div className="bg-white border border-[#EAECF0] rounded-xl p-5 flex flex-col">
      <div className="text-sm font-medium text-[#525866] mb-3">{title}</div>
      <div className="text-2xl font-bold text-[#171717] font-sans mb-2">{value}</div>
      <div className="text-xs text-[#525866] flex items-center space-x-1">
        <span style={{ color: highlightColor }} className="font-semibold">{subtitleHighlight}</span>
        <span>{subtitle}</span>
      </div>
    </div>
  );
}
