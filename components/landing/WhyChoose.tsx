import { Shield, Settings, BarChart2, Users, Puzzle, Star, Lock, HeadphonesIcon } from "lucide-react";

export function WhyChoose() {
  const features = [
    {
      icon: Shield,
      title: "Secure & Trusted",
      description: "Lorem ipsum dolor sit amet consectetur Sagittis eu vel habitant.",
    },
    {
      icon: Settings,
      title: "Automate Your Workflows",
      description: "Lorem ipsum dolor sit amet consectetur Sagittis eu vel habitant.",
    },
    {
      icon: BarChart2,
      title: "Real-Time Analytics",
      description: "Lorem ipsum dolor sit amet consectetur Sagittis eu vel habitant.",
    },
    {
      icon: Users,
      title: "Collaborate Effortlessly",
      description: "Lorem ipsum dolor sit amet consectetur Sagittis eu vel habitant.",
    },
    {
      icon: Puzzle,
      title: "Seamless Integrations",
      description: "Lorem ipsum dolor sit amet consectetur Sagittis eu vel habitant.",
    },
    {
      icon: Star,
      title: "Prioritize Opportunities",
      description: "Lorem ipsum dolor sit amet consectetur Sagittis eu vel habitant.",
    },
    {
      icon: Lock,
      title: "Secure & Compliant",
      description: "Lorem ipsum dolor sit amet consectetur Sagittis eu vel habitant.",
    },
    {
      icon: HeadphonesIcon,
      title: "24/7 Priority Support",
      description: "Lorem ipsum dolor sit amet consectetur Sagittis eu vel habitant.",
    },
  ];

  return (
    <section className="py-16 lg:py-24 bg-[#FAFAFA]">
      <div className="w-full max-w-[1280px] mx-auto px-6 lg:px-10 xl:px-14">
        {/* Header */}
        <div className="text-center mb-16">
          {/* Badge */}
          <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-white border border-[#E5E5E5] rounded-full mb-5">
             <svg className="w-3.5 h-3.5 text-[#1C1C1D]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
             </svg>
            <span className="text-[11px] font-semibold text-[#1C1C1D] uppercase tracking-wider">
              LOREM IPSUM DOLOR
            </span>
          </div>

          <h2 className="text-[32px] font-medium text-[#1C1C1D] leading-[1.1] mb-4">
            Why Choose Submit Right
          </h2>

          <p className="text-[15px] text-[#65656D] leading-relaxed max-w-xl mx-auto">
            Lorem ipsum dolor sit amet consectetur. Sagittis eu vel habitant cursus. 
            Elementum suscipit donec viverra posuere at lorem nullam.
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-x-12 lg:gap-y-12 max-w-5xl mx-auto">
          {features.map((feature, idx) => (
            <div
              key={idx}
              className="text-center flex flex-col items-center"
            >
              <div className="w-12 h-12 mb-4 bg-white rounded-xl flex items-center justify-center shadow-sm border border-[#F0F0F0]">
                <feature.icon className="w-5 h-5 text-[#1C1C1D]" strokeWidth={2.5} />
              </div>
              <h3 className="text-[15px] font-semibold text-[#1C1C1D] mb-2">
                {feature.title}
              </h3>
              <p className="text-[13px] text-[#65656D] leading-relaxed px-4">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
