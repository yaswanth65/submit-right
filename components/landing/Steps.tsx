import { FileText, Upload, Settings, Eye, Send } from "lucide-react";

export function Steps() {
  const steps = [
    {
      icon: FileText,
      title: "Document Details",
      description: "Lorem ipsum dolor sit amet consectetur Sagittis.",
    },
    {
      icon: Upload,
      title: "Upload Document",
      description: "Lorem ipsum dolor sit amet consectetur Sagittis.",
    },
    {
      icon: Settings,
      title: "Choose Service",
      description: "Lorem ipsum dolor sit amet consectetur Sagittis.",
    },
    {
      icon: Eye,
      title: "Review",
      description: "Lorem ipsum dolor sit amet consectetur Sagittis.",
    },
    {
      icon: Send,
      title: "Submit Document",
      description: "Lorem ipsum dolor sit amet consectetur Sagittis.",
    },
  ];

  return (
    <section className="py-16 lg:py-24 bg-white">
      <div className="w-full max-w-[1280px] mx-auto px-6 lg:px-10 xl:px-14">
        {/* Header */}
        <div className="text-center mb-16">
          {/* Badge */}
          <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-white border border-[#E5E5E5] rounded-full mb-5">
             <svg className="w-3.5 h-3.5 text-[#1C1C1D]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 10h16M4 14h16M4 18h16" />
             </svg>
            <span className="text-[11px] font-normal text-[#1C1C1D] uppercase tracking-wider">
              HOW IT WORKS
            </span>
          </div>

          <h2 className="text-[32px] font-medium text-[#1C1C1D] leading-[1.1] mb-4">
            Five Simple Steps
          </h2>

          <p className="text-[15px] text-[#65656D] leading-relaxed max-w-xl mx-auto">
            Lorem ipsum dolor sit amet consectetur. Sagittis eu vel habitant cursus. 
            Elementum suscipit donec viverra posuere at lorem nullam.
          </p>
        </div>

        {/* Steps Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 max-w-6xl mx-auto">
          {steps.map((step, idx) => (
            <div key={idx} className="bg-[#F9F9F9] rounded-xl p-5 relative border border-[#F0F0F0]">
              <div className="absolute top-4 right-4 text-[24px] font-normal text-[#E5E5E5]">
                0{idx + 1}
              </div>
              
              <div className="w-10 h-10 bg-[#E8F6FC] rounded-lg flex items-center justify-center mb-4">
                <step.icon className="w-5 h-5 text-[#00A0E3]" />
              </div>
              
              <h3 className="text-[15px] font-normal text-[#1C1C1D] mb-2 leading-tight">
                {step.title}
              </h3>
              
              <p className="text-[12px] text-[#65656D] leading-relaxed pr-2">
                {step.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
