import Image from "next/image";

export function WhyChoose() {
  const features = [
    {
      icon: "/why/Frame 2147237022 (2).svg",
      title: "ISO-Certified Security",
      description: "Files encrypted and auto-deleted after 90 days  your research stays yours",
    },
    {
      icon: "/why/Frame 2147237022 (3).svg",
      title: "Express Delivery",
      description: "Turnaround as fast as 8 hours for urgent pre-submission editing",
    },
    {
      icon: "/why/Frame 2147237022 (4).svg",
      title: "Unlimited Re-Editing",
      description: "Revise as many times as needed on Publication-Ready and High-Impact plans",
    },
    {
      icon: "/why/Frame 2147237022 (5).svg",
      title: "1,600+ Subject Areas",
      description: "Manuscripts matched to editors who specialize in your exact field",
    },
    {
      icon: "/why/Frame 2147237022 (6).svg",
      title: "Dual-Expert Review",
      description: "Every paper passes through two independent expert reviewers before delivery",
    },
    {
      icon: "/why/Frame 2147237022 (7).svg",
      title: "Real-Time Order Tracking",
      description: "Watch your manuscript move from submitted to delivered  live on your dashboard",
    },
    {
      icon: "/why/Frame 2147237022 (8).svg",
      title: "24/7 Multilingual Support",
      description: "Chat, WhatsApp, or callback  support available around the clock",
    },
    {
      icon: "/why/Frame 2147237022 (9).svg",
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
        <div className="grid grid-cols-1 min-[520px]:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-x-6 gap-y-10 lg:gap-x-12 lg:gap-y-12 w-full justify-items-center">

  {features.map((feature, idx) => (
    <div
      key={idx}
      className="flex flex-col items-center text-center gap-8 w-full max-w-[281px] min-h-[154px] lg:h-[154px]"
    >
      {/* Icon Container */}
      <Image
        src={feature.icon}
        alt=""
        width={66}
        height={68}
        className="w-[56px] h-[56px] object-contain shrink-0"
      />

      {/* Text Content */}
      <div className="flex flex-col items-center gap-[10px] w-full max-w-[281px]">
        {/* Title */}
        <h3 className="font-inter font-medium text-[18px] sm:text-[20px] leading-[110%] text-[#1C1C1D] w-full text-center">
          {feature.title}
        </h3>

        {/* Description */}
        <p className="font-inter font-normal text-[14px] leading-[120%] text-center text-[#78788D] w-full max-w-[274px]">
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
