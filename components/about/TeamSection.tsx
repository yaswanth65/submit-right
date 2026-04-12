export function TeamSection() {
  const team = [
    {
      id: 1,
      name: "Dr. Ansh Mehta",
      role: "Academic Editing",
      image: "/images/team-member-1.jpg"
    },
    {
      id: 2,
      name: "Dr. Ansh Mehta",
      role: "Academic Editing",
      image: "/images/team-member-2.jpg"
    },
    {
      id: 3,
      name: "Dr. Ansh Mehta",
      role: "Academic Editing",
      image: "/images/team-member-3.jpg"
    },
    {
      id: 4,
      name: "Dr. Ansh Mehta",
      role: "Academic Editing",
      image: "/images/team-member-4.jpg"
    },
    {
      id: 5,
      name: "Dr. Ansh Mehta",
      role: "Academic Editing",
      image: "/images/team-member-5.jpg"
    },
    {
      id: 6,
      name: "Dr. Ansh Mehta",
      role: "Academic Editing",
      image: "/images/team-member-6.jpg"
    },
    {
      id: 7,
      name: "Dr. Ansh Mehta",
      role: "Academic Editing",
      image: "/images/team-member-7.jpg"
    },
    {
      id: 8,
      name: "Dr. Ansh Mehta",
      role: "Academic Editing",
      image: "/images/team-member-8.jpg"
    }
  ];

  return (
    <section className="py-12 sm:py-16 lg:py-20 bg-white relative">
      <div className="landing-shell">
        
        {/* Header */}
        <div className="text-center mb-10 sm:mb-16">
          {/* Badge */}
          <div className="landing-section-badge mb-6">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#00A0E3" strokeWidth="2">
              <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" />
              <circle cx="12" cy="7" r="4" />
            </svg>
            <span className="landing-section-badge-text text-[#00A0E3]">
              The People Behind Submit Right
            </span>
          </div>

          {/* Heading */}
          <h2 className="landing-section-title mb-4 max-w-[700px] mx-auto">
            Your Manuscript Is in the Hands of People Who've Published in Your Field
          </h2>

          {/* Description */}
          <p className="landing-section-description max-w-[600px] mx-auto">
            Every editor, reviewer, and subject expert on Submit Right has been vetted, tested, and approved through a rigorous onboarding process.
          </p>
        </div>

        {/* Team Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6 lg:gap-8">
          {team.map((member) => (
            <div key={member.id} className="flex flex-col">
              {/* Image Card */}
              <div 
                className="w-full rounded-[20px] border border-[#E5E7EB] overflow-hidden shadow-[0_4px_20px_rgb(0,0,0,0.03)] mb-4"
                style={{
                  width: "100%",
                  paddingBottom: "96.55%", /* 280/290 aspect ratio */
                  position: "relative"
                }}
              >
                <img
                  src={member.image}
                  alt={member.name}
                  className="absolute inset-0 w-full h-full object-cover"
                />
              </div>

              {/* Text Below */}
              <div>
                <h3 className="text-[14px] sm:text-[15px] font-medium text-[#1C1C1D] mb-1">
                  {member.name}
                </h3>
                <p className="text-[13px] text-[#65656D]">
                  {member.role}
                </p>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
