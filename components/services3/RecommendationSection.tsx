import { SectionBadge } from "./SectionBadge";
import { recommendationCards } from "./service3Data";

function JournalIllustrationCard() {
  return (
    <div className="rounded-[18px] border flex justify-center border-[#EEF2F5] bg-white p-5 sm:p-6 shadow-[0_10px_24px_rgba(18,74,102,0.04)]">
      <img src="/serv3/details.png" alt="Journal illustration" className="w-[200px] h-auto rounded-lg" />
    </div>
  );
}

export function RecommendationSection() {
  return (
    <section className="py-12 sm:py-16 lg:py-20 bg-[#F8F8F8]">
      <div className="landing-shell">
        <div className="text-center max-w-[780px] mx-auto mb-10 sm:mb-12 lg:mb-14">
          <SectionBadge label="LOREM IPSUM" />
          <div className="mt-5 text-[28px] sm:text-[32px] lg:text-[40px] font-medium leading-[1.12] text-[#1C1C1D]">
            We&apos;ve Got Your Back with a Free Journal Re-recommendation
          </div>
          <p className="mt-3 max-w-[640px] mx-auto text-[14px] sm:text-[16px] text-[#78788D] leading-[1.5]">
            Lorem ipsum dolor sit amet consectetur. Sagittis eu vel habitant cursus.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-3 sm:gap-5">
          {recommendationCards.map((card) =>
            card.kind === "illustration" ? (
              <JournalIllustrationCard key={card.title} />
            ) : (
              <div key={card.title} className="rounded-[18px] border border-[#EEF2F5] bg-white p-5 sm:p-6 shadow-[0_10px_24px_rgba(18,74,102,0.04)]">
                <div className="mb-4 inline-flex h-9 w-9 items-center justify-center rounded-[10px] bg-[#EAF6FB] text-[#00A0E3]">
                  <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 5h10a2 2 0 012 2v10a2 2 0 01-2 2H7a2 2 0 01-2-2V7a2 2 0 012-2zm0 3h10M7 13h10M7 17h6" />
                  </svg>
                </div>
                <div className="text-[18px] sm:text-[20px] font-medium leading-[1.15] text-[#1C1C1D]">
                  {card.title}
                </div>
                <p className="mt-3 text-[13px] sm:text-[14px] leading-[1.55] text-[#78788D]">
                  {card.description}
                </p>
              </div>
            )
          )}
        </div>
      </div>
    </section>
  );
}
