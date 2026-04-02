import Image from "next/image";

export function TrustedLogos() {
  const logos = [
    { id: 1, src: "/images/logo1.svg" },
    { id: 2, src: "/images/logo2.svg" },
    { id: 3, src: "/images/logo3.svg" },
    { id: 4, src: "/images/logo4.svg" },
    { id: 5, src: "/images/logo5.svg" },
    { id: 6, src: "/images/logo6.svg" },
  ];

  // Create an extended list for seamless infinite scroll
  const extendedLogos = [...logos, ...logos, ...logos];

  return (
    <section className="py-12 bg-white">
      <div className="w-full max-w-[1280px] mx-auto px-6 lg:px-10 xl:px-14">
       

        {/* Title */}
        <div className="text-center mb-8">
          <h2 className="text-[32px] font-medium text-[#1C1C1D] leading-[1.1]">
            Lorem ipsum dolor sit amet
          </h2>
        </div>

        {/* Carousel Container */}
        <div className="relative overflow-hidden">
          {/* Fade Overlay Left */}
          <div className="absolute left-0 top-0 bottom-0 w-[10%] bg-gradient-to-r from-white to-transparent z-10 pointer-events-none" />
          
          {/* Fade Overlay Right */}
          <div className="absolute right-0 top-0 bottom-0 w-[10%] bg-gradient-to-l from-white to-transparent z-10 pointer-events-none" />
          
          {/* Scrolling Container */}
          <div className="carousel-scroll">
            {extendedLogos.map((logo, index) => (
              <div key={`${logo.id}-${index}`} className="carousel-item flex items-center justify-center flex-shrink-0">
                <div className="relative w-[120px] h-[80px] flex items-center justify-center">
                  <img 
                    src={logo.src} 
                    alt={`Logo ${logo.id}`}
                    className="max-w-[100px] max-h-[60px] object-contain opacity-80 grayscale hover:opacity-100 hover:grayscale-0 transition-all"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
