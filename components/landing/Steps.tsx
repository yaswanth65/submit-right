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
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3 sm:gap-4 lg:gap-4 w-full">
          {steps.map((step, idx) => (
            <div key={idx} className="h-auto lg:h-[180px] bg-[#F8F8F8] rounded-lg lg:rounded-[14px] p-4 sm:p-5 lg:p-[14px] border border-[#ECECEC] flex flex-col gap-4 lg:gap-[20px] justify-start">
              {/* Icon + Number Row */}
              <div className="flex items-center justify-between w-full gap-3 lg:gap-[32px]">
                <div className="w-10 h-10 lg:w-[44px] lg:h-[44px] bg-[#DAEDF6] rounded-lg lg:rounded-[8px] flex items-center justify-center flex-shrink-0">
                  <step.icon className="w-5 h-5 lg:w-6 lg:h-6 text-[#00A0E3]" />
                </div>
                
                <span className="text-lg lg:text-[24px] font-bold text-[#1C1C1D] opacity-[0.08] flex-shrink-0">
                  0{idx + 1}
                </span>
              </div>
              
              {/* Content */}
              <div className="flex flex-col gap-2 lg:gap-[8px]">
                <h3 className="text-sm sm:text-base lg:text-[18px] font-semibold lg:font-[500] text-[#1C1C1D] leading-snug lg:leading-[110%]">
                  {step.title}
                </h3>
                
                <p className="text-xs sm:text-sm lg:text-[14px] font-normal text-[#78788D] leading-relaxed lg:leading-[120%]">
                  {step.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
