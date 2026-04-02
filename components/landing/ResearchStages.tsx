'use client';

import { useState } from 'react';
import { ArrowRight, Check, HelpCircle } from 'lucide-react';
import Image from 'next/image';

const steps = [
  { id: 1, title: 'Write Your Document' },
  { id: 2, title: 'Get Expert Editing' },
  { id: 3, title: 'Find Top Journals' },
  { id: 4, title: 'Journal Desk Review' },
  { id: 5, title: 'Revise and Resubmit' },
  { id: 6, title: 'Create Visuals' },
];

export function ResearchStages() {
  const [activeStep, setActiveStep] = useState(1);

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          {/* Badge */}
          <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-white border border-[#E5E5E5] rounded-full mb-5">
            <HelpCircle className="w-3.5 h-3.5 text-[#1C1C1D]" />
            <span className="text-[11px] font-semibold text-[#1C1C1D] uppercase tracking-wider">
              Lorem Ipsum Dolor
            </span>
          </div>

          <h2 className="text-[32px] font-medium text-[#1C1C1D] leading-[1.1] mb-4">
            Solutions for Every Stage of Your Research
          </h2>

          <p className="text-[15px] text-[#65656D] leading-relaxed max-w-xl mx-auto">
            Lorem ipsum dolor sit amet consectetur. Sagittis eu vel habitant cursus.
            <br />
            Elementum suscipit donec viverra posuere at lorem nullam.
          </p>
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 mb-8 items-stretch">
          {/* Sidebar Steps */}
          <div className="lg:col-span-1 flex flex-col gap-3">
            {steps.map((step) => (
              <button
                key={step.id}
                onClick={() => setActiveStep(step.id)}
                className={`text-left p-4 rounded-xl border transition-all duration-200 ${
                  activeStep === step.id
                    ? 'border-[#00A0E3] bg-[#F8FCFF] shadow-sm'
                    : 'border-[#ECECEC] bg-white hover:border-[#00A0E3]/50'
                }`}
              >
                <div
                  className={`text-xs font-semibold mb-1 ${
                    activeStep === step.id ? 'text-[#00A0E3]' : 'text-gray-400'
                  }`}
                >
                  STEP {step.id}
                </div>
                <div
                  className={`font-medium ${
                    activeStep === step.id ? 'text-[#1C1C1D]' : 'text-[#65656D]'
                  }`}
                >
                  {step.title}
                </div>
              </button>
            ))}
          </div>

          {/* Right Content Area */}
          <div className="lg:col-span-3 min-h-0 h-full">
            {activeStep === 1 && <Step1Content />}
            {activeStep === 2 && <Step2Content />}
            {activeStep === 3 && <Step3Content />}
            {activeStep === 4 && <Step4Content />}
            {activeStep === 5 && <Step5Content />}
            {activeStep === 6 && <Step6Content />}
          </div>
        </div>

        {/* Bottom Steps (7 & 8) */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <Step7Content />
          <Step8Content />
        </div>
      </div>
    </section>
  );
}

// -------------------------------------------------------------
// Step Components Below
// -------------------------------------------------------------

function Step1Content() {
  return (
    <div className="flex flex-col gap-4 h-full">
      <div className="bg-[#F8F9FA] rounded-2xl p-6 border border-gray-100 flex-1 flex flex-col justify-center">
        <div className="flex justify-between items-start mb-4">
          <div className="text-xs font-bold text-[#00A0E3] uppercase tracking-wider">Our Tool</div>
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 bg-[#00A0E3] rounded-full flex items-center justify-center text-white font-bold text-xs">B</div>
            <span className="font-bold text-[#1C1C1D]">Logoispsum</span>
          </div>
        </div>
        <h3 className="text-xl font-bold text-[#1C1C1D] mb-2">Beentu AI Writing</h3>
        <p className="text-[#65656D] text-sm mb-4 max-w-2xl leading-relaxed">
          Lorem ipsum dolor sit amet consectetur. Sagittis eu vel habitant cursus. 
          Elementum suscipit donec viverra posuere at lorem nullam. Porttitor mauris morbi 
          tincidunt enim nascetur sed.
        </p>
        <div>
          <button className="inline-flex items-center gap-2 bg-[#00A0E3] text-white px-5 py-2 rounded-full text-sm font-medium hover:bg-[#0088CC] transition-colors">
            Explore Now <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      <div className="bg-[#F8F9FA] rounded-2xl p-6 border border-gray-100 flex-1 flex flex-col justify-center">
        <div className="flex justify-between items-start mb-4">
          <div className="text-xs font-bold text-[#00A0E3] uppercase tracking-wider">Our Tool</div>
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 bg-[#00A0E3] rounded-full flex items-center justify-center text-white font-bold text-xs">S</div>
            <span className="font-bold text-[#1C1C1D]">Logoispsum</span>
          </div>
        </div>
        <h3 className="text-xl font-bold text-[#1C1C1D] mb-2">Submit Right Service</h3>
        <p className="text-[#65656D] text-sm mb-4 max-w-2xl leading-relaxed">
          Lorem ipsum dolor sit amet consectetur. Sagittis eu vel habitant cursus. 
          Elementum suscipit donec viverra posuere at lorem nullam. Porttitor mauris morbi 
          tincidunt enim nascetur sed.
        </p>
        <div>
          <button className="inline-flex items-center gap-2 bg-[#00A0E3] text-white px-5 py-2 rounded-full text-sm font-medium hover:bg-[#0088CC] transition-colors">
            Explore Now <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
}

function Step2Content() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 h-full">
      {[1, 2].map((i) => (
        <div key={i} className="bg-[#F8F9FA] rounded-2xl p-6 border border-gray-100 flex flex-col h-full overflow-hidden">
          <h3 className="text-lg font-bold text-[#1C1C1D] mb-1">Lorem ipsum dolor sit</h3>
          <p className="text-[#65656D] text-xs mb-4 pb-4 border-b border-gray-200 border-dashed">
            amet, consectetur adipiscing elit, sed do eiusmod tempor.
          </p>
          
          <div className="flex items-center justify-between mb-4 pb-4 border-b border-gray-200 border-dashed">
            <div>
              <div className="text-xs text-[#65656D]">Starts from</div>
              <div className="text-xl font-bold text-[#1C1C1D]">
                $0.0425 <span className="text-xs text-[#65656D] font-normal">/per word</span>
              </div>
            </div>
            <button className="inline-flex items-center gap-1.5 bg-[#00A0E3] text-white px-4 py-2 rounded-full text-xs font-medium hover:bg-[#0088CC] whitespace-nowrap">
              Submit Enquiry <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="space-y-2.5 mb-4 pb-4 border-b border-gray-200 border-dashed">
            {['Lorem ipsum consectetur adipiscing', 'sed do eiusmod tempor', 'amet, consectetur adipiscing elit.', 'Lorem ipsum dolor sit'].map((feat, idx) => (
              <div key={idx} className="flex items-center gap-1.5 text-xs text-[#65656D]">
                <Check className="w-3.5 h-3.5 text-gray-400 shrink-0" /> <span className="truncate">{feat}</span>
              </div>
            ))}
            <a href="#" className="inline-block text-xs font-medium text-[#00A0E3] hover:underline mt-1">Learn more</a>
          </div>

          <div className="mt-auto">
            <h4 className="text-xs font-bold text-[#1C1C1D] mb-2">Lorem ipsum dolor sit</h4>
            <ul className="space-y-1.5 text-xs text-[#65656D]">
              <li className="flex items-start gap-1.5 before:content-['•'] before:text-gray-400 before:mr-0.5 truncate">Lorem ipsum consectetur adipiscing</li>
              <li className="flex items-start gap-1.5 before:content-['•'] before:text-gray-400 before:mr-0.5 truncate">sed do eiusmod tempor</li>
              <li className="flex items-start gap-1.5 before:content-['•'] before:text-gray-400 before:mr-0.5 truncate">amet, consectetur adipiscing elit.</li>
              <li className="flex items-start gap-1.5 before:content-['•'] before:text-gray-400 before:mr-0.5 truncate">Lorem ipsum dolor sit</li>
            </ul>
          </div>
        </div>
      ))}
    </div>
  );
}

function Step3Content() {
  return (
    <div className="bg-[#F8F9FA] rounded-2xl p-6 border border-gray-100 h-full flex flex-col">
      <div className="inline-flex items-center justify-center text-[#00A0E3] font-bold mb-3 self-start">
        <HomeIcon className="w-5 h-5 mr-1" /> Beentu <ArrowRight className="w-4 h-4 ml-1" />
      </div>
      <p className="text-[#1C1C1D] font-medium leading-relaxed mb-6 max-w-3xl text-sm">
        Lorem ipsum dolor sit amet consectetur. Sagittis eu vel habitant cursus. 
        Elementum suscipit donec viverra posuere at lorem nullam.
      </p>
      
      {/* Placeholder for dashboard image - using a div that visually resembles a dashboard UI skeleton */}
      <div className="w-full bg-white rounded-lg border border-gray-200 overflow-hidden shadow-sm flex-1 flex relative min-h-[200px]">
        {/* Placeholder for dashboard screenshot */}
        <div className="absolute inset-0 bg-gray-50 flex items-center justify-center text-gray-300">
          Dashboard Image
        </div>
      </div>
    </div>
  );
}

function Step4Content() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 grid-rows-2 gap-4 h-full">
      {/* Top Left */}
      <div className="bg-[#F8F9FA] rounded-2xl p-6 border border-gray-100 flex flex-col justify-center">
        <h3 className="text-lg font-bold text-[#1C1C1D] mb-2">Lorem ipsum dolor</h3>
        <p className="text-[#65656D] mb-4 text-xs leading-relaxed">
          Lorem ipsum dolor sit amet consectetur. Sagittis eu vel habitant cursus. 
          Elementum suscipit donec viverra posuere at lorem nullam. Porttitor mauris morbi 
          tincidunt enim nascetur sed.
        </p>
        <div>
          <button className="inline-flex items-center gap-2 bg-[#00A0E3] text-white px-4 py-2 rounded-full text-xs font-medium hover:bg-[#0088CC] transition-colors">
            Explore Now <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
      {/* Top Right */}
      <div className="bg-[#F8F9FA] rounded-2xl p-6 border border-gray-100 flex flex-col justify-center">
        <h3 className="text-lg font-bold text-[#1C1C1D] mb-2">Lorem ipsum dolor</h3>
        <p className="text-[#65656D] mb-4 text-xs leading-relaxed">
          Lorem ipsum dolor sit amet consectetur. Sagittis eu vel habitant cursus. 
          Elementum suscipit donec viverra posuere at lorem nullam. Porttitor mauris morbi 
          tincidunt enim nascetur sed.
        </p>
        <div>
          <button className="inline-flex items-center gap-2 bg-[#00A0E3] text-white px-4 py-2 rounded-full text-xs font-medium hover:bg-[#0088CC] transition-colors">
            Explore Now <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
      {/* Bottom Left */}
      <div className="bg-[#F8F9FA] rounded-2xl p-6 border border-gray-100 flex flex-col justify-between">
        <div>
          <h3 className="text-lg font-bold text-[#1C1C1D] mb-2">Lorem ipsum dolor</h3>
          <p className="text-[#65656D] text-xs leading-relaxed">
            Lorem ipsum dolor sit amet consectetur. Sagittis eu vel habitant cursus. 
            Elementum suscipit donec viverra posuere at lorem nullam. Porttitor mauris morbi 
            tincidunt enim nascetur sed.
          </p>
        </div>
        <div>
          <button className="inline-flex items-center gap-2 bg-[#00A0E3] text-white px-4 py-2 rounded-full text-xs font-medium hover:bg-[#0088CC] transition-colors">
            Explore Now <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
      {/* Bottom Right */}
      <div className="bg-[#F8F9FA] rounded-2xl p-6 border border-gray-100 flex flex-col justify-between">
        <div>
          <h3 className="text-lg font-bold text-[#1C1C1D] mb-2">Lorem ipsum dolor</h3>
          <p className="text-[#65656D] text-xs leading-relaxed">
            Lorem ipsum dolor sit amet consectetur. Sagittis eu vel habitant cursus. 
            Elementum suscipit donec viverra posuere at lorem nullam. Porttitor mauris morbi 
            tincidunt enim nascetur sed.
          </p>
        </div>
        <div>
          <button className="inline-flex items-center gap-2 bg-[#00A0E3] text-white px-4 py-2 rounded-full text-xs font-medium hover:bg-[#0088CC] transition-colors">
            Explore Now <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
}

function Step5Content() {
  return (
    <div className="flex flex-col gap-4 h-full">
      {/* Top Card */}
      <div className="bg-[#F8F9FA] rounded-2xl p-6 border border-gray-100 flex flex-col justify-between flex-1">
        <div>
          <h3 className="text-lg font-bold text-[#1C1C1D] mb-3">Lorem ipsum dolor</h3>
          <p className="text-[#65656D] text-xs leading-relaxed">
            Lorem ipsum dolor sit amet consectetur. Sagittis eu vel habitant cursus. 
            Elementum suscipit donec viverra posuere at lorem nullam. Porttitor mauris morbi 
            tincidunt enim nascetur sed. Eu neque sagittis in gravida elementum. Semper tempor 
            viverra senectus eget enim purus enim congue.
          </p>
        </div>
        <div className="mt-6">
          <button className="inline-flex items-center gap-2 bg-[#00A0E3] text-white px-4 py-2 rounded-full text-xs font-medium hover:bg-[#0088CC] transition-colors">
            Explore Now <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
      
      {/* Bottom Card */}
      <div className="bg-[#F8F9FA] rounded-2xl p-6 border border-gray-100 flex flex-col justify-between flex-1">
        <div>
          <h3 className="text-lg font-bold text-[#1C1C1D] mb-3">Lorem ipsum dolor</h3>
          <p className="text-[#65656D] text-xs leading-relaxed">
            Lorem ipsum dolor sit amet consectetur. Sagittis eu vel habitant cursus. 
            Elementum suscipit donec viverra posuere at lorem nullam. Porttitor mauris morbi 
            tincidunt enim nascetur sed. Eu neque sagittis in gravida elementum. Semper tempor 
            viverra senectus eget enim purus enim congue.
          </p>
        </div>
        <div className="mt-6">
          <button className="inline-flex items-center gap-2 bg-[#00A0E3] text-white px-4 py-2 rounded-full text-xs font-medium hover:bg-[#0088CC] transition-colors">
            Explore Now <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
}

function Step6Content() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 h-full">
      {[1, 2].map((i) => (
        <div key={i} className="bg-[#F8F9FA] rounded-2xl p-6 border border-gray-100 flex flex-col justify-between h-full">
          <div>
            <h3 className="text-lg font-bold text-[#1C1C1D] mb-2">Lorem ipsum dolor</h3>
            <p className="text-[#65656D] mb-4 text-xs leading-relaxed">
              Lorem ipsum dolor sit amet consectetur. Sagittis eu vel habitant cursus. 
              Elementum suscipit donec viverra posuere at lorem nullam. Porttitor mauris morbi 
              tincidunt enim nascetur sed.
            </p>
            <div className="space-y-1.5">
               {['Lorem ipsum consectetur adipiscing', 'sed do eiusmod tempor', 'amet, consectetur adipiscing elit.', 'Lorem ipsum dolor sit'].map((feat, idx) => (
                  <div key={idx} className="flex items-center gap-1.5 text-xs text-[#65656D]">
                    <Check className="w-3 h-3 text-gray-400 shrink-0" /> <span className="truncate">{feat}</span>
                  </div>
                ))}
            </div>
          </div>
          <div className="mt-5">
            <button className="inline-flex items-center gap-2 bg-[#00A0E3] text-white px-4 py-2 rounded-full text-xs font-medium hover:bg-[#0088CC] transition-colors">
              Explore Now <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}

function Step7Content() {
  return (
    <div className="bg-[#F8F9FA] rounded-3xl p-8 border border-gray-100 flex flex-col h-full">
      <div className="text-xs font-bold text-[#00A0E3] uppercase tracking-wider mb-2">STEP 7</div>
      <h3 className="text-2xl font-bold text-[#1C1C1D] mb-3">Publication Support</h3>
      <p className="text-[#65656D] text-sm mb-8 max-w-md">
        Lorem ipsum dolor sit amet consectetur. Sagittis eu vel habitant cursus. 
        Elementum suscipit donec viverra posuere at lorem nullam.
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-auto">
        {/* Yellow Card */}
        <div className="rounded-2xl border border-[#F4C252] bg-[#FFFBF3] p-5 relative overflow-hidden flex flex-col">
          <div className="absolute top-0 right-0 bg-[#F4C252] text-white text-[10px] font-bold px-3 py-1 rounded-bl-lg">
            You Save: $328
          </div>
          <h4 className="text-lg font-bold text-[#F4C252] mb-1">Lorem ipsum dolor</h4>
          <p className="text-xs text-[#65656D] mb-4">Lorem ipsum dolor sit amet, consectetur adipiscing.</p>
          
          <div className="space-y-2 mb-6">
             {['Lorem ipsum dolor', 'consectetur adipiscing', 'Lorem ipsum dolor sit amet'].map((feat, idx) => (
                <div key={idx} className="flex items-center gap-2 text-xs text-[#1C1C1D] font-medium">
                  <div className="w-4 h-4 rounded-full bg-[#F4C252] text-white flex items-center justify-center shrink-0">
                    <Check className="w-3 h-3" />
                  </div> {feat}
                </div>
              ))}
          </div>

          <div className="mt-auto">
            <div className="flex items-end justify-between border-t border-[#F4C252]/20 pt-4 mb-4">
              <div className="text-xs text-[#65656D]">
                Get 8 services worth<br/>
                For only:
              </div>
              <div className="text-right">
                <div className="text-xs text-gray-400 line-through font-medium">$1240</div>
                <div className="text-xl font-bold text-[#F4C252]">$912</div>
              </div>
            </div>
            <button className="w-full bg-[#1C1C1D] text-white py-2 rounded-full text-sm font-medium hover:bg-black transition-colors">
              Buy Now
            </button>
          </div>
        </div>

        {/* Blue Card */}
        <div className="rounded-2xl border border-[#00A0E3] bg-[#F1F9FF] p-5 relative overflow-hidden flex flex-col">
          <div className="absolute top-0 right-0 bg-[#00A0E3] text-white text-[10px] font-bold px-3 py-1 rounded-bl-lg">
            You Save: $328
          </div>
          <h4 className="text-lg font-bold text-[#00A0E3] mb-1">Lorem ipsum dolor</h4>
          <p className="text-xs text-[#65656D] mb-4">Lorem ipsum dolor sit amet, consectetur adipiscing.</p>
          
          <div className="space-y-2 mb-6">
             {['Lorem ipsum dolor', 'consectetur adipiscing', 'Lorem ipsum dolor sit amet'].map((feat, idx) => (
                <div key={idx} className="flex items-center gap-2 text-xs text-[#1C1C1D] font-medium">
                  <div className="w-4 h-4 rounded-full bg-[#00A0E3] text-white flex items-center justify-center shrink-0">
                    <Check className="w-3 h-3" />
                  </div> {feat}
                </div>
              ))}
          </div>

          <div className="mt-auto">
             <div className="flex items-end justify-between border-t border-[#00A0E3]/20 pt-4 mb-4">
              <div className="text-xs text-[#65656D]">
                Get 8 services worth<br/>
                For only:
              </div>
              <div className="text-right">
                <div className="text-xs text-gray-400 line-through font-medium">$1240</div>
                <div className="text-xl font-bold text-[#00A0E3]">$912</div>
              </div>
            </div>
            <button className="w-full bg-[#00A0E3] text-white py-2 rounded-full text-sm font-medium hover:bg-[#0088CC] transition-colors">
              Buy Now
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

function Step8Content() {
  return (
    <div className="bg-[#F8F9FA] rounded-3xl p-8 border border-gray-100 flex flex-col h-full">
      <div className="text-xs font-bold text-[#00A0E3] uppercase tracking-wider mb-2">STEP 8</div>
      <h3 className="text-2xl font-bold text-[#1C1C1D] mb-3">Post Publication</h3>
      <p className="text-[#65656D] text-sm mb-8 max-w-md">
        Lorem ipsum dolor sit amet consectetur. Sagittis eu vel habitant cursus. 
        Elementum suscipit donec viverra posuere at lorem nullam.
      </p>

      <form className="space-y-4 mt-auto">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-medium text-[#1C1C1D] mb-1.5">First Name</label>
            <input type="text" placeholder="First name" className="w-full border border-[#E7E7E9] rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-[#00A0E3]" />
          </div>
          <div>
            <label className="block text-xs font-medium text-[#1C1C1D] mb-1.5">Last Name</label>
            <input type="text" placeholder="Last name" className="w-full border border-[#E7E7E9] rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-[#00A0E3]" />
          </div>
        </div>
        
        <div>
          <label className="block text-xs font-medium text-[#1C1C1D] mb-1.5">Email</label>
          <input type="email" placeholder="Enter your email" className="w-full border border-[#E7E7E9] rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-[#00A0E3]" />
        </div>

        <div>
          <label className="block text-xs font-medium text-[#1C1C1D] mb-1.5">Message</label>
          <textarea rows={3} placeholder="Type your message" className="w-full border border-[#E7E7E9] rounded-lg px-3 py-2 text-sm resize-none focus:outline-none focus:border-[#00A0E3]"></textarea>
        </div>

        <button type="button" className="w-full bg-[#00A0E3] text-white py-2.5 rounded-full text-sm font-medium hover:bg-[#0088CC] transition-colors mt-2">
          Submit Message
        </button>
      </form>
    </div>
  );
}

function HomeIcon(props: any) {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinelinejoin="round" {...props}>
      <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
      <polyline points="9 22 9 12 15 12 15 22"></polyline>
    </svg>
  );
}
