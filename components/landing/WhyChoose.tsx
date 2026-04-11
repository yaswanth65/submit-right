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
      <div className="landing-shell">
        {/* Header */}
        <div className="text-center mb-10 sm:mb-16">
          {/* Badge */}
          <div className="landing-section-badge">
             <img src="/q.svg" alt="icon" className="w-4 h-4" />
            <span className="landing-section-badge-text">
              WHY SUBMIT RIGHT
            </span>
          </div>

          <h2 className="landing-section-title">
            The Platform Serious Researchers Choose
          </h2>

          <p className="landing-section-description">
            Every feature on Submit Right is built for one outcome: your research gets published, on time, with your data fully protected.
          </p>
        </div>

        {/* Features Grid */}
      <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 
          gap-x-6 gap-y-10 lg:gap-x-12 lg:gap-y-12 w-full">

  {features.map((feature, idx) => (
    <div
      key={idx}
      className="flex flex-col items-center text-center gap-8 w-full"
    >
      {/* Icon Container */}
      <div className="relative flex items-center justify-center
                      w-14 h-14 rounded-full
                      bg-white/60 backdrop-blur-sm
                      border border-[#ECECEC]
                      shadow-[0px_7px_17px_-12px_rgba(28,28,29,0.1)]">
        <feature.icon
          className="w-7 h-7 text-[#1C1C1D]"
          strokeWidth={2}
        />
      </div>

      {/* Text Content */}
      <div className="flex flex-col items-center gap-2 w-full">
        {/* Title */}
        <h3 className="font-inter font-medium text-[20px] leading-[110%] text-[#1C1C1D]">
          {feature.title}
        </h3>

        {/* Description */}
        <p className="font-inter font-normal text-[14px] leading-[120%] text-center text-[#78788D] max-w-[274px]">
          {feature.description}
        </p>
      </div>
    </div>
  ))}
</div>
      </div>
    </section>
  );
}
