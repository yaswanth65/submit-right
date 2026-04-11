import { Shield, Settings, BarChart2, Users, Puzzle, Star, Lock, HeadphonesIcon } from "lucide-react";

export function WhyChoose() {
  const features = [
    {
      icon: Shield,
      title: "ISO-Certified Security",
      description: "Files encrypted and auto-deleted after 90 days  your research stays yours",
    },
    {
      icon: Settings,
      title: "Express Delivery",
      description: "Turnaround as fast as 8 hours for urgent pre-submission editing",
    },
    {
      icon: BarChart2,
      title: "Unlimited Re-Editing",
      description: "Revise as many times as needed on Publication-Ready and High-Impact plans",
    },
    {
      icon: Users,
      title: "1,600+ Subject Areas",
      description: "Manuscripts matched to editors who specialize in your exact field",
    },
    {
      icon: Puzzle,
      title: "Dual-Expert Review",
      description: "Every paper passes through two independent expert reviewers before delivery",
    },
    {
      icon: Star,
      title: "Real-Time Order Tracking",
      description: "Watch your manuscript move from submitted to delivered  live on your dashboard",
    },
    {
      icon: Lock,
      title: "24/7 Multilingual Support",
      description: "Chat, WhatsApp, or callback  support available around the clock",
    },
    {
      icon: HeadphonesIcon,
      title: "100% Satisfaction Guarantee",
      description: "Not satisfied with the output? We re-edit it or refund you in full",
    },
  ];

  return (
    <section className="py-12 sm:py-16 lg:py-24 bg-[#FAFAFA]">
      <div className="w-full max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-10 xl:px-14">
        {/* Header */}
        <div className="text-center mb-10 sm:mb-16">
          {/* Badge */}
          <div className="inline-flex items-center gap-1.5 px-3 py-2 bg-white border border-[#E5E5E5] rounded-full mb-5">
             <img src="/q.svg" alt="icon" className="w-4 h-4" />
            <span className="text-[11px] font-normal text-[#1C1C1D] uppercase tracking-wider">
              WHY SUBMIT RIGHT
            </span>
          </div>

          <h2 className="text-[26px] sm:text-[32px] font-medium text-[#1C1C1D] leading-[1.15] sm:leading-[1.1] mb-4">
            The Platform Serious Researchers Choose
          </h2>

          <p className="text-[13px] sm:text-[15px] text-[#65656D] leading-relaxed max-w-xl mx-auto">
            Every feature on Submit Right is built for one outcome: your research gets published, on time, with your data fully protected.
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-5 sm:gap-8 lg:gap-x-12 lg:gap-y-12 max-w-5xl mx-auto">
          {features.map((feature, idx) => (
            <div
              key={idx}
              className="text-center flex flex-col items-center"
            >
              <div className="w-11 h-11 sm:w-12 sm:h-12 mb-3 sm:mb-4 bg-white rounded-xl flex items-center justify-center shadow-sm border border-[#F0F0F0]">
                <feature.icon className="w-4 h-4 sm:w-5 sm:h-5 text-[#1C1C1D]" strokeWidth={2.5} />
              </div>
              <h3 className="text-[14px] sm:text-[15px] font-normal text-[#1C1C1D] mb-1.5 sm:mb-2">
                {feature.title}
              </h3>
              <p className="text-[12px] sm:text-[13px] text-[#65656D] leading-relaxed px-1 sm:px-4">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
