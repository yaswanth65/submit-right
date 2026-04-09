"use client";

import React, { useState } from "react";
import Link from "next/link";
import { ArrowLeft, Pencil, X, Upload } from "lucide-react";
import { useRouter } from "next/navigation";

// Form modal component
function EditModal({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm">
      <div className="bg-white rounded-[16px] shadow-xl w-full max-w-[600px] overflow-hidden flex flex-col max-h-[90vh]">
        <div className="px-6 py-4 border-b border-[#EAECF0] flex items-center justify-between">
          <h2 className="text-[18px] font-medium text-[#1C1C1D] font-inter">Edit Service Details</h2>
          <button onClick={onClose} className="p-1.5 text-[#A0AAB5] hover:text-[#525866] hover:bg-[#F9FAFB] rounded-md transition-colors">
            <X className="w-5 h-5" />
          </button>
        </div>
        
        <div className="p-6 overflow-y-auto flex-1 font-dm-sans">
          <div className="mb-6">
            <label className="block text-[14px] font-medium text-[#171717] mb-2">Thumbnail</label>
            <div className="relative rounded-[12px] overflow-hidden border border-[#EAECF0] bg-[#F9FAFB] shrink-0 inline-block">
              <img 
                src="https://images.unsplash.com/photo-1499750310107-5fef28a66643?q=80&w=2670&auto=format&fit=crop" 
                alt="Service thumbnail" 
                className="w-full max-w-[400px] h-[240px] object-cover"
              />
              <button className="absolute top-3 right-3 bg-red-500 text-white rounded-full p-1 shadow-sm hover:bg-red-600 transition-colors">
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>
          
          <div className="space-y-5">
            <div>
              <label className="block text-[14px] font-medium text-[#171717] mb-1.5">Service Name</label>
              <input 
                type="text" 
                defaultValue="Improve grammar and clarity"
                className="w-full px-3 py-2.5 border border-[#EAECF0] rounded-[8px] text-[14px] text-[#171717] focus:outline-none focus:ring-1 focus:ring-[#00A0E3] focus:border-[#00A0E3]" 
              />
            </div>
            
            <div>
              <label className="block text-[14px] font-medium text-[#171717] mb-1.5">Word Count Rate</label>
              <input 
                type="text" 
                defaultValue="0.20"
                className="w-full px-3 py-2.5 border border-[#EAECF0] rounded-[8px] text-[14px] text-[#171717] focus:outline-none focus:ring-1 focus:ring-[#00A0E3] focus:border-[#00A0E3]" 
              />
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-[14px] font-medium text-[#171717] mb-1.5">Domain Type</label>
                <select className="w-full px-3 py-2.5 border border-[#EAECF0] rounded-[8px] text-[14px] text-[#171717] focus:outline-none focus:ring-1 focus:ring-[#00A0E3] focus:border-[#00A0E3] bg-white appearance-none">
                  <option value="Editing" selected>Editing</option>
                  <option value="Translation">Translation</option>
                  <option value="Proofreading">Proofreading</option>
                </select>
              </div>
              
              <div>
                <label className="block text-[14px] font-medium text-[#171717] mb-1.5">Availability Status</label>
                <select className="w-full px-3 py-2.5 border border-[#EAECF0] rounded-[8px] text-[14px] text-[#171717] focus:outline-none focus:ring-1 focus:ring-[#00A0E3] focus:border-[#00A0E3] bg-white appearance-none">
                  <option value="Active" selected>Active</option>
                  <option value="Unactive">Unactive</option>
                </select>
              </div>
            </div>
          </div>
        </div>
        
        <div className="px-6 py-4 border-t border-[#EAECF0] flex justify-between items-center bg-white">
          <button 
            onClick={onClose}
            className="px-5 py-2.5 border border-[#EAECF0] rounded-[8px] text-[14px] font-medium text-[#525866] hover:bg-[#F9FAFB] transition-colors"
          >
            Cancel
          </button>
          <button className="px-5 py-2.5 bg-[#00A0E3] hover:bg-[#008CC7] text-white rounded-[8px] text-[14px] font-medium shadow-sm transition-colors">
            Save Changes
          </button>
        </div>
      </div>
    </div>
  );
}

export default function ServiceDetailsPage() {
  const router = useRouter();
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("Landing Page");
  const [activeSection, setActiveSection] = useState("Hero Section");

  const pageLayoutTabs = ["Landing Page", "Dashboard Page"];
  const sections = [
    "Hero Section",
    "Introduction",
    "Why Choose",
    "Contact",
    "FAQs",
    "CTA Banner"
  ];

  return (
    <div className="w-full font-dm-sans">
      <div className="flex items-center text-[13px] text-[#A0AAB5] mb-6">
        <Link href="/admin/dashboard" className="hover:text-[#171717] transition-colors">Home</Link>
        <span className="mx-2">&gt;</span>
        <Link href="/admin/domains-services" className="hover:text-[#171717] transition-colors">Domains & Services</Link>
        <span className="mx-2">&gt;</span>
        <span className="text-[#171717] font-medium">Improve grammar and clarity</span>
      </div>

      <div className="flex items-center gap-3 mb-8">
        <Link 
          href="/admin/domains-services"
          className="p-1.5 flex items-center justify-center text-[#1C1C1D] hover:bg-gray-100 rounded-md transition-colors"
        >
          <ArrowLeft className="w-5 h-5" />
        </Link>
        <h1 className="text-[24px] font-medium text-[#1C1C1D] font-inter">Improve grammar and clarity</h1>
      </div>

      {/* Detail Card top */}
      <div className="bg-white rounded-[12px] border border-[#EAECF0] shadow-sm mb-6 p-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-[18px] font-bold text-[#1C1C1D] font-inter">Service Details</h2>
          <button 
            onClick={() => setIsEditModalOpen(true)}
            className="flex items-center gap-1.5 text-[#00A0E3] hover:text-[#008CC7] font-medium text-[14px] transition-colors"
          >
            <Pencil className="w-[14px] h-[14px]" /> Edit
          </button>
        </div>

        <div className="flex flex-col md:flex-row gap-8">
          <div className="shrink-0 w-[400px]">
            <img 
              src="https://images.unsplash.com/photo-1499750310107-5fef28a66643?q=80&w=2670&auto=format&fit=crop" 
              alt="Typing on laptop" 
              className="w-full h-[220px] object-cover rounded-[8px] border border-[#EAECF0] shadow-sm"
            />
          </div>
          
          <div className="flex-1 grid grid-cols-1 md:grid-cols-2 items-start gap-y-6">
            <div>
              <p className="text-[13px] text-[#78788D] mb-1">Service Name:</p>
              <p className="text-[15px] font-medium text-[#1C1C1D]">Improve grammar and clarity</p>
            </div>
            
            <div className="md:border-l md:border-[#EAECF0] md:pl-6">
              <p className="text-[13px] text-[#78788D] mb-1">Domain Type:</p>
              <p className="text-[15px] font-medium text-[#1C1C1D]">Editing</p>
            </div>
            
            <div>
              <p className="text-[13px] text-[#78788D] mb-1">Word Count Rate:</p>
              <p className="text-[15px] font-medium text-[#1C1C1D]">₹0.20</p>
            </div>
            
            <div className="md:border-l md:border-[#EAECF0] md:pl-6">
              <p className="text-[13px] text-[#78788D] mb-1">Availability Status:</p>
              <span className="inline-flex items-center px-3 py-1 rounded-full text-[12px] font-medium bg-[#ECFDF3] text-[#027A48]">
                Active
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Layout Editor Section */}
      <div className="flex flex-col lg:flex-row gap-6">
        {/* Left Sidebar */}
        <div className="w-full lg:w-[320px] bg-white rounded-[12px] border border-[#EAECF0] shadow-sm p-5 shrink-0 h-fit">
          <h3 className="text-[16px] font-bold text-[#1C1C1D] mb-5">Page Layout</h3>
          
          <div className="flex rounded-[8px] bg-[#F5F7FA] p-1 mb-6 border border-[#EAECF0]">
            {pageLayoutTabs.map(tab => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`flex-1 py-1.5 px-3 text-[13px] font-medium rounded-[6px] transition-all text-center ${
                  activeTab === tab 
                    ? "bg-[#00A0E3] text-white shadow-sm" 
                    : "text-[#78788D] hover:text-[#171717]"
                }`}
              >
                {tab}
              </button>
            ))}
          </div>
          
          <div className="space-y-3">
            {sections.map(section => (
              <button
                key={section}
                onClick={() => setActiveSection(section)}
                className={`w-full text-left py-3 px-4 rounded-[8px] text-[14px] font-medium transition-all ${
                  activeSection === section
                    ? "border border-[#00A0E3] text-[#1C1C1D] bg-[#F5FBFE] shadow-sm"
                    : "border border-[#EAECF0] text-[#525866] bg-white hover:bg-[#F9FAFB]"
                }`}
              >
                {section}
              </button>
            ))}
          </div>
        </div>

        {/* Right Content Area */}
        <div className="flex-1 bg-white rounded-[12px] border border-[#EAECF0] shadow-sm overflow-hidden flex flex-col min-h-[500px]">
          <div className="p-6 border-b border-[#EAECF0]">
            <div className="flex justify-between items-start">
              <div>
                <h3 className="text-[18px] font-bold text-[#1C1C1D] mb-1 font-inter">{activeTab}</h3>
                <p className="text-[14px] text-[#78788D]">Lorem ipsum dolor sit amet consectetur.</p>
              </div>
              <button className="px-5 py-2.5 bg-[#00A0E3] hover:bg-[#008CC7] text-white rounded-[8px] text-[14px] font-medium shadow-sm transition-colors">
                Save Changes
              </button>
            </div>
          </div>
          
          <div className="p-6 flex-1 bg-[#FAFAFA]">
            <h4 className="text-[16px] font-bold text-[#1C1C1D] mb-4 px-2">{activeSection}</h4>
            <div className="bg-white rounded-[12px] border border-dashed border-[#D0D5DD] min-h-[300px] flex items-center justify-center m-2 shadow-sm">
              <span className="text-[#A0AAB5] text-[14px]">Empty placeholder for {activeSection} editor</span>
            </div>
          </div>
        </div>
      </div>

      <EditModal isOpen={isEditModalOpen} onClose={() => setIsEditModalOpen(false)} />
    </div>
  );
}
