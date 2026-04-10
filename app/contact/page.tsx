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
      <section className="relative hero-svg-bg pt-14 sm:pt-16 pb-16 sm:pb-20 lg:pt-24 lg:pb-32 overflow-hidden">

        <div className="w-full max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-10 xl:px-14 relative z-10">
          <div className="flex flex-col lg:flex-row gap-10 sm:gap-12 lg:gap-24">
            
            {/* Left Content */}
            <div className="flex-1 lg:max-w-[480px]">
              {/* Badge */}
             

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
                <a href="#" className="w-8 h-8 rounded-full bg-white flex items-center justify-center text-[#65656D] hover:text-[#00A0E3] shadow-sm border border-[#E5E7EB] transition-all">
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M18.77 7.46H14.5v-1.9c0-.9.6-1.1 1-1.1h3V.5h-4.33C10.24.5 9.5 3.44 9.5 5.32v2.15h-3v4h3v12h5v-12h3.85l.42-4z"/></svg>
                </a>
                <a href="#" className="w-8 h-8 rounded-full bg-white flex items-center justify-center text-[#65656D] hover:text-[#00A0E3] shadow-sm border border-[#E5E7EB] transition-all">
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/></svg>
                </a>
                <a href="#" className="w-8 h-8 rounded-full bg-white flex items-center justify-center text-[#65656D] hover:text-[#00A0E3] shadow-sm border border-[#E5E7EB] transition-all">
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
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
      <section className="py-14 sm:py-20 lg:py-24 bg-white relative z-10 -mt-3 sm:-mt-10">
        <div className="w-full max-w-[1000px] mx-auto px-4 sm:px-6 lg:px-10 xl:px-14">
          
       
          <div className="flex flex-col items-center mb-8 sm:mb-12">
            <h2 className="text-[26px] sm:text-[32px] font-semibold text-[#1C1C1D] text-center mb-3">
              Everything You Need to Know Before You Reach Out
            </h2>
            <p className="text-[15px] sm:text-[16px] text-[#65656D] leading-relaxed text-center max-w-[650px]">
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