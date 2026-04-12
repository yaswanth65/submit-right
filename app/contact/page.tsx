"use client";

import { Footer } from "@/components/landing/Footer";
import { Navbar } from "@/components/landing/Navbar";
import { CTABanner } from "@/components/landing/CTABanner";
import { useState } from "react";

export default function ContactPage() {
  const [expandedFAQ, setExpandedFAQ] = useState<number | null>(null);
  return (
    <div className="min-h-screen bg-white">
      <Navbar />

      {/* Hero Section */}
      <section className="relative hero-svg-bg pt-24 sm:pt-28 pb-16 sm:pb-20 lg:pt-32 lg:pb-32 overflow-hidden">

        <div className="landing-shell relative z-10">
          <div className="flex flex-col lg:flex-row gap-10 sm:gap-12 lg:gap-24">
            
            {/* Left Content */}
            <div className="flex-1 lg:max-w-[480px]">
              {/* Badge */}
              <div className="inline-flex items-center justify-center flex-wrap gap-2 px-4 py-1.5 rounded-full border border-[#00A0E34D] bg-[#00A0E314] mb-6">
                <img src="/v1.svg" alt="icon" className="w-4 h-4 shrink-0" />
                <span className="text-[13px] font-medium leading-[1.4] text-[#00A0E3] uppercase">
                  Contact & Support
                </span>
              </div>

              <h1 className="text-[30px] sm:text-[36px] lg:text-[34px] font-semibold text-[#1C1C1D] leading-[1.15] mb-4">
                Have a Question? We're Here Before You Submit, While You Wait, and After You Publish.
              </h1>
              <p className="text-[14px] sm:text-[15px] text-[#65656D] leading-relaxed mb-8 sm:mb-12">
                Whether you're unsure which service fits your manuscript, have a question about an active order, or need help with payment  our support team responds fast.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 sm:gap-8 mb-8 sm:mb-12">
                {/* Find us on */}
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <svg className="w-4 h-4 text-[#1C1C1D]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                    <span className="text-[14px] font-semibold text-[#1C1C1D]">Find us on</span>
                  </div>
                  <p className="text-[14px] text-[#65656D] leading-relaxed">
                    Lorem ipsum dolor sit amet,<br className="hidden sm:block" />
                    consectetur adipiscing elit
                  </p>
                </div>

                {/* Email */}
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <svg className="w-4 h-4 text-[#1C1C1D]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                    <span className="text-[14px] font-semibold text-[#1C1C1D]">Email</span>
                  </div>
                  <a href="mailto:info@example.com" className="text-[14px] text-[#65656D] hover:text-[#00A0E3] transition-colors">
                    info@example.com
                  </a>
                </div>

                {/* Let your work speak for itself */}
                <div className="sm:col-span-2">
                  <div className="flex items-center gap-2 mb-2">
                    <svg className="w-4 h-4 text-[#1C1C1D]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                    </svg>
                    <span className="text-[14px] font-semibold text-[#1C1C1D]">Let your work speak for itself</span>
                  </div>
                  <p className="text-[14px] text-[#65656D]">
                    (000) 000 0000
                  </p>
                </div>
              </div>

              {/* Separator / Socials */}
              <div className="border-t border-[#DDE7ED] pt-6 flex items-center gap-4 flex-wrap">
                <a href="#" className="block hover:opacity-90 transition-opacity">
                  <svg className="w-12 h-12 block" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                    <rect width="48" height="48" rx="24" fill="#00A0E3" fillOpacity="0.08" />
                    <path d="M25 31.9381C28.9463 31.446 32 28.0796 32 24C32 19.5817 28.4183 16 24 16C19.5817 16 16 19.5817 16 24C16 28.0796 19.0537 31.446 23 31.9381V26H21V24H23V22.3458C23 21.0086 23.1392 20.5236 23.4007 20.0347C23.6621 19.5458 24.0458 19.1622 24.5347 18.9007C24.9174 18.696 25.3921 18.5725 26.2217 18.5195C26.5509 18.4985 26.9771 18.5253 27.5 18.6V20.5H27C26.0827 20.5 25.7042 20.5433 25.4779 20.6643C25.3376 20.7394 25.2394 20.8376 25.1643 20.9779C25.0433 21.2042 25 21.4285 25 22.3458V24H27.5L27 26H25V31.9381ZM24 34C18.4772 34 14 29.5228 14 24C14 18.4771 18.4772 14 24 14C29.5228 14 34 18.4771 34 24C34 29.5228 29.5228 34 24 34Z" fill="#00A0E3" />
                  </svg>
                </a>
                <a href="#" className="block hover:opacity-90 transition-opacity">
                  <svg className="w-12 h-12 block" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                    <rect width="48" height="48" rx="24" fill="#00A0E3" fillOpacity="0.08" />
                    <path d="M24 21C22.3426 21 21 22.3431 21 24C21 25.6573 22.3431 27 24 27C25.6573 27 27 25.6569 27 24C27 22.3427 25.6569 21 24 21ZM24 19C26.7604 19 29 21.2371 29 24C29 26.7605 26.7629 29 24 29C21.2395 29 19 26.7629 19 24C19 21.2395 21.2371 19 24 19ZM30.5 18.7491C30.5 19.4393 29.9392 19.9992 29.25 19.9992C28.5599 19.9992 28 19.4384 28 18.7491C28 18.0599 28.5607 17.5 29.25 17.5C29.9383 17.4991 30.5 18.0599 30.5 18.7491ZM24 16C21.5255 16 21.1222 16.0065 19.9713 16.0578C19.1872 16.0946 18.6616 16.2001 18.1732 16.3897C17.7392 16.558 17.4261 16.759 17.0925 17.0925C16.7577 17.4274 16.5571 17.7396 16.3894 18.1738C16.1994 18.6633 16.094 19.1881 16.0578 19.9711C16.0061 21.0752 16 21.4611 16 24C16 26.4745 16.0066 26.8778 16.0578 28.0286C16.0946 28.8124 16.2002 29.3388 16.3894 29.826C16.5581 30.2606 16.7595 30.5744 17.0915 30.9064C17.4277 31.2421 17.7408 31.4434 18.1709 31.6094C18.6652 31.8005 19.1905 31.9061 19.9711 31.9422C21.0752 31.9939 21.4611 32 24 32C26.4745 32 26.8778 31.9934 28.0286 31.9422C28.8107 31.9055 29.3375 31.7996 29.826 31.6106C30.2594 31.4423 30.5742 31.2402 30.9064 30.9085C31.2426 30.5718 31.4435 30.2594 31.6097 29.8283C31.8003 29.3358 31.9061 28.8098 31.9422 28.0289C31.9939 26.9248 32 26.5389 32 24C32 21.5255 31.9934 21.1222 31.9422 19.9714C31.9054 18.1891 31.7995 18.6615 31.6103 18.1732C31.4424 17.7404 31.2407 17.4263 30.9074 17.0925C30.572 16.7571 30.2606 16.5569 29.8261 16.3894C29.337 16.1995 28.8114 16.094 28.0288 16.0578C26.9248 16.006 26.5389 16 24 16ZM24 14C26.7166 14 27.0558 14.01 28.1225 14.06C29.1866 14.1092 29.9125 14.2775 30.55 14.525C31.2091 14.7792 31.7658 15.1225 32.3216 15.6783C32.8766 16.2342 33.22 16.7925 33.475 17.45C33.7216 18.0867 33.89 18.8133 33.94 19.8775C33.9875 20.9442 34 21.2833 34 24C34 26.7167 33.99 27.0558 33.94 28.1225C33.8908 29.1867 33.7216 29.9125 33.475 30.55C33.2208 31.2092 32.8766 31.7658 32.3216 32.3217C31.7658 32.8767 31.2066 33.22 30.55 33.475C29.9125 33.7217 29.1866 33.89 28.1225 33.94C27.0558 33.9875 26.7166 34 24 34C21.2833 34 20.9442 33.99 19.8775 33.94C18.8133 33.8908 18.0883 33.7217 17.45 33.475C16.7917 33.2208 16.2342 32.8767 15.6783 32.3217C15.1225 31.7658 14.78 31.2067 14.525 30.55C14.2775 29.9125 14.11 29.1867 14.06 28.1225C14.0125 27.0558 14 26.7167 14 24C14 21.2833 14.01 20.9442 14.06 19.8775C14.1092 18.8125 14.2775 18.0875 14.525 17.45C14.7792 16.7917 15.1225 16.2342 15.6783 15.6783C16.2342 15.1225 16.7925 14.78 17.45 14.525C18.0875 14.2775 18.8125 14.11 19.8775 14.06C20.9442 14.0125 21.2833 14 24 14Z" fill="#00A0E3" />
                  </svg>
                </a>
                <a href="#" className="block hover:opacity-90 transition-opacity">
                  <svg className="w-12 h-12 block" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                    <rect width="48" height="48" rx="24" fill="#00A0E3" fillOpacity="0.08" />
                    <path d="M16 15H32C32.5523 15 33 15.4477 33 16V32C33 32.5523 32.5523 33 32 33H16C15.4477 33 15 32.5523 15 32V16C15 15.4477 15.4477 15 16 15ZM17 17V31H31V17H17ZM19.5 21C18.6716 21 18 20.3284 18 19.5C18 18.6716 18.6716 18 19.5 18C20.3284 18 21 18.6716 21 19.5C21 20.3284 20.3284 21 19.5 21ZM18.5 22H20.5V29.5H18.5V22ZM24 22.4295C24.5844 21.8653 25.2655 21.5 26 21.5C28.071 21.5 29.5 23.1789 29.5 25.25V29.5H27.5V25.25C27.5 24.2835 26.7165 23.5 25.75 23.5C24.7835 23.5 24 24.2835 24 25.25V29.5H22V22H24V22.4295Z" fill="#00A0E3" />
                  </svg>
                </a>
              </div>
            </div>

            {/* Right Form Card */}
            <div className="flex-1">
              <div className="bg-white rounded-[20px] sm:rounded-[24px] shadow-[0_8px_30px_rgb(0,0,0,0.04)] p-5 sm:p-8 lg:p-10 border border-[#F3F4F6]">
                <form className="space-y-5">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div className="space-y-2">
                      <label className="text-[13px] font-medium text-[#1C1C1D]">First Name</label>
                      <input 
                        type="text" 
                        placeholder="First Name"
                        className="w-full h-[46px] px-4 bg-white border border-[#E5E7EB] rounded-lg text-[14px] focus:outline-none focus:border-[#00A0E3] focus:ring-1 focus:ring-[#00A0E3] transition-all placeholder:text-[#9CA3AF]"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-[13px] font-medium text-[#1C1C1D]">Last Name</label>
                      <input 
                        type="text" 
                        placeholder="Last Name"
                        className="w-full h-[46px] px-4 bg-white border border-[#E5E7EB] rounded-lg text-[14px] focus:outline-none focus:border-[#00A0E3] focus:ring-1 focus:ring-[#00A0E3] transition-all placeholder:text-[#9CA3AF]"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div className="space-y-2">
                      <label className="text-[13px] font-medium text-[#1C1C1D]">Email Address</label>
                      <input 
                        type="email" 
                        placeholder="Enter your email"
                        className="w-full h-[46px] px-4 bg-white border border-[#E5E7EB] rounded-lg text-[14px] focus:outline-none focus:border-[#00A0E3] focus:ring-1 focus:ring-[#00A0E3] transition-all placeholder:text-[#9CA3AF]"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-[13px] font-medium text-[#1C1C1D]">Phone Number (optional)</label>
                      <input 
                        type="tel" 
                        placeholder="Phone Number"
                        className="w-full h-[46px] px-4 bg-white border border-[#E5E7EB] rounded-lg text-[14px] focus:outline-none focus:border-[#00A0E3] focus:ring-1 focus:ring-[#00A0E3] transition-all placeholder:text-[#9CA3AF]"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-[13px] font-medium text-[#1C1C1D]">Subject / Query Type</label>
                    <div className="relative">
                      <select className="w-full h-[46px] px-4 bg-white border border-[#E5E7EB] rounded-lg text-[14px] text-[#65656D] appearance-none focus:outline-none focus:border-[#00A0E3] focus:ring-1 focus:ring-[#00A0E3] transition-all">
                        <option value="">Select</option>
                        <option value="general">General Enquiry</option>
                        <option value="order">Order Support</option>
                        <option value="payment">Payment Issue</option>
                        <option value="partnership">Partnership</option>
                        <option value="other">Other</option>
                      </select>
                      <svg className="w-4 h-4 absolute right-4 top-1/2 -translate-y-1/2 text-[#9CA3AF] pointer-events-none" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /></svg>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-[13px] font-medium text-[#1C1C1D]">Message</label>
                    <textarea 
                      placeholder="Type your message"
                      rows={4}
                      className="w-full px-4 py-3 bg-white border border-[#E5E7EB] rounded-lg text-[14px] focus:outline-none focus:border-[#00A0E3] focus:ring-1 focus:ring-[#00A0E3] transition-all placeholder:text-[#9CA3AF] resize-none"
                    ></textarea>
                  </div>

                  <button 
                    type="submit"
                    className="w-full h-[46px] mt-2 bg-[#00A0E3] hover:bg-[#028ac7] text-white font-medium rounded-lg text-[14px] transition-colors"
                  >
                    Send My Message →
                  </button>

                  <p className="text-[12px] text-[#65656D] text-center mt-4">
                    Your message and details are fully encrypted. We never share your information with third parties.
                  </p>
                </form>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* FAQ Wrap */}
      <section className="py-12 sm:py-16 lg:py-20 bg-white relative z-10 -mt-3 sm:-mt-10">
        <div className="landing-shell">
          
       
          <div className="flex flex-col items-center mb-8 sm:mb-12">
            <h2 className="landing-section-title mb-3">
              Everything You Need to Know Before You Reach Out
            </h2>
            <p className="landing-section-description max-w-[650px]">
              Most questions our team receives fall into a handful of clear categories document submission, order tracking, payments, security, and certifications. We've answered all of them here so you can get answers instantly, without waiting on a reply.
            </p>
          </div>
          
          <div className="space-y-0">
            {[
              {
                id: 1,
                question: "How do I submit my document on Submit Right?",
                answer: "Create a free account, go to your dashboard, and click New Order. Upload your PDF or Word file, enter your document details   word count, subject area, and target journal if applicable   then select your service and turnaround time. The system generates an instant price estimate and you proceed to secure checkout. Once payment is confirmed, your manuscript is assigned to a subject-matched expert within hours. You can track every update live from your dashboard from that point forward."
              },
              {
                id: 2,
                question: "What file formats does Submit Right accept?",
                answer: "We accept PDF and Microsoft Word (.doc / .docx) files. LaTeX files can be submitted in PDF format for editing, with the original LaTeX source uploaded as a supporting file. If you are unsure whether your file format is compatible, contact us before uploading and our team will confirm within a few hours."
              },
              {
                id: 3,
                question: "How do I track my order after submission?",
                answer: "Every order has a live progress tracker inside your dashboard. The stages you will see are: Received → Assigned → In Progress → QA Review → Delivered. You also receive real-time notifications via email and   if enabled   SMS or WhatsApp at each key stage. You never have to chase an update. It comes to you automatically."
              },
              {
                id: 4,
                question: "How can I contact my assigned editor directly?",
                answer: "Submit Right includes a built-in secure messaging system inside every order. Once an editor is assigned to your manuscript, a chat thread opens within that order. You can ask questions, share additional instructions, upload reference files, and communicate directly   all without leaving the platform. Every conversation is stored securely for the full duration of the order and beyond."
              },
              {
                id: 5,
                question: "What payment methods are accepted and are transactions secure?",
                answer: "Submit Right accepts payments via Razorpay and Stripe   supporting UPI, credit and debit cards, net banking, and international card payments. All transactions are processed over encrypted, PCI-compliant payment gateways. Your card details are never stored on our servers. An invoice is automatically generated and available for download from your dashboard immediately after every successful payment."
              },
              {
                id: 6,
                question: "What happens if I am not satisfied with the editing output?",
                answer: "Every plan on Submit Right includes a built-in re-editing entitlement. Language Clarity includes one free re-edit within 12 months. Publication-Ready and High-Impact plans include unlimited re-editing for 365 days from the date of first delivery. If you have completed re-editing and are still genuinely unsatisfied with the output, Submit Right's 100% Satisfaction Guarantee entitles you to a full refund. Refund requests are reviewed by our team and processed within 5 to 7 business days."
              },
              {
                id: 7,
                question: "Does Submit Right provide an editing certificate with completed orders?",
                answer: "Yes. An official Submit Right Editing Certificate is issued with every completed editing order. The certificate confirms that your manuscript has been professionally edited and reviewed by a qualified expert on our platform. Many journals and supervisors request this documentation as part of the submission or approval process. Your certificate is available for download directly from the Files tab inside your order dashboard."
              },
              {
                id: 8,
                question: "How does Submit Right protect my manuscript and research data?",
                answer: "All files uploaded to Submit Right are encrypted end-to-end during transfer and storage using TLS 1.3 protocol. Your documents are stored on ISO-certified compliant servers and are permanently and automatically deleted from our systems 90 days after order completion. No editor, team member, or third party has access to your files beyond what is strictly required to complete your order. Submit Right is fully compliant with GDPR and India's Digital Personal Data Protection Act (DPDPB)."
              },
              {
                id: 9,
                question: "Does Submit Right work with institutions and universities for bulk or ongoing orders?",
                answer: "Yes. Submit Right offers institutional partnership arrangements for universities, research departments, medical colleges, publishing houses, and funding organisations. Institutional partners receive a dedicated branded submission portal, centralised order tracking and billing, and periodic usage and performance reports. If you represent an institution and want to explore a partnership, use the contact form above and select Partnership from the query type dropdown. Our partnerships team will respond within one business day."
              },
              {
                id: 10,
                question: "I submitted a query or support request   how long will it take to get a response?",
                answer: "General enquiries submitted via the contact form are responded to within 4 to 6 business hours during standard working hours. For active order issues   such as delivery delays, payment errors, or editor communication problems  use the live chat or WhatsApp support line for a faster response. Our support team is available 24 hours a day, 7 days a week, across chat, WhatsApp, and callback channels. No enquiry goes unanswered."
              }
            ].map((item) => (
              <div key={item.id} className="border-b border-[#F0F0F0] last:border-0 group">
                <button 
                  onClick={() => setExpandedFAQ(expandedFAQ === item.id ? null : item.id)}
                  className="w-full flex items-center justify-between py-5 sm:py-6 text-left hover:text-[#00A0E3] transition-colors gap-4"
                >
                  <div className="flex items-start sm:items-center gap-3 sm:gap-4 pr-3">
                    <span className="text-[13px] sm:text-[14px] font-bold text-[#1C1C1D] shrink-0 mt-0.5 sm:mt-0">
                      {item.id.toString().padStart(2, '0')}
                    </span>
                    <span className="text-[14px] sm:text-[15px] font-medium text-[#65656D] group-hover:text-[#00A0E3] leading-relaxed">
                      {item.question}
                    </span>
                  </div>
                  <span className={`text-[20px] text-[#00A0E3] font-light shrink-0 transition-transform duration-300 ${expandedFAQ === item.id ? "rotate-45" : ""}`}>
                    +
                  </span>
                </button>
                
                {/* Expanded Answer */}
                {expandedFAQ === item.id && (
                  <div className="pb-5 sm:pb-6 pl-11 pr-3">
                    <p className="text-[14px] sm:text-[15px] leading-[1.6] text-[#65656D]">
                      {item.answer}
                    </p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      <div className="relative z-20">
        <CTABanner variant="secondary" />
      </div>

      <Footer />
    </div>
  );
}