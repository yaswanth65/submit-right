import { FileText, Upload, Settings, Eye, Send } from "lucide-react";

export function Steps() {
  const steps = [
    {
      icon: FileText,
      title: "Document Details",
      description: "Tell us your subject, word count, and target journal  we handle the match",
    },
    {
      icon: Upload,
      title: "Upload Your Document",
      description: "Securely upload your PDF or Word file in seconds from your device",
    },
    {
      icon: Settings,
      title: "Choose Your Service",
      description: "Pick editing, translation, or publication support  compare packages instantly",
    },
    {
      icon: Eye,
      title: "Review Your Quote",
      description: "See the exact price and timeline before committing  no surprises",
    },
    {
      icon: Send,
      title: "Submit & Track Live",
      description: "Pay securely, your expert is assigned, and you track every update in real time",
    },
  ];

  return (
    <section className="py-12 sm:py-16 lg:py-20 bg-white">
      <div className="landing-shell">
        {/* Header */}
        <div className="text-center mb-10 sm:mb-16">
          {/* Badge */}
          <div className="landing-section-badge">
             <svg className="w-3.5 h-3.5 text-[#1C1C1D]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 10h16M4 14h16M4 18h16" />
             </svg>
            <span className="landing-section-badge-text">
              THE PROCESS
            </span>
          </div>

          <h2 className="landing-section-title">
            From Upload to Delivered  In 5 Simple Steps
          </h2>

          <p className="landing-section-description">
            No back-and-forth emails. No confusing forms. Just upload your document and let Submit Right's workflow handle everything  automatically.
          </p>
        </div>

        {/* Steps Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3 sm:gap-4 w-full">
          {steps.map((step, idx) => (
            <div key={idx} className="bg-[#F9F9F9] rounded-xl sm:rounded-2xl p-[14px] sm:p-5 relative border border-[#F0F0F0]">
              <div className="absolute top-3.5 sm:top-4 right-3.5 sm:right-4 text-[22px] sm:text-[24px] font-normal text-[#E5E5E5]">
                0{idx + 1}
              </div>
              
              <div className="w-10 h-10 bg-[#E8F6FC] rounded-lg flex items-center justify-center mb-3 sm:mb-4">
                <step.icon className="w-4.5 h-4.5 sm:w-5 sm:h-5 text-[#00A0E3]" />
              </div>
              
              <h3 className="text-[14px] sm:text-[15px] font-medium text-[#1C1C1D] mb-2 leading-tight">
                {step.title}
              </h3>
              
              <p className="text-[12px] text-[#65656D] leading-relaxed pr-1 sm:pr-2">
                {step.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
