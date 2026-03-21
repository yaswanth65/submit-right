"use client";

import { useState } from "react";
import { Globe } from "lucide-react";

export default function AvailabilityPage() {
  const [isAvailable, setIsAvailable] = useState(true);
  const [scheduleEnabled, setScheduleEnabled] = useState(false);
  const [vacationEnabled, setVacationEnabled] = useState(false);

  return (
    <div className="w-full font-dm-sans text-[#171717] animate-in fade-in duration-500">
      <div className="mb-8">
        <h1 className="text-[24px] font-bold text-[#171717]">Availability</h1>
        <p className="text-[15px] text-[#525866] mt-1">
          Manage your assignment availability and workload preferences to optimize your queue.
        </p>
      </div>

      <div className="space-y-6">
        {/* Availability Status */}
        <div className="bg-white border border-[#EAECF0] rounded-[12px] p-6 shadow-[0_1px_2px_rgba(0,0,0,0.02)] flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-[#E1F4FD] rounded-lg flex items-center justify-center text-[#00A0E3] shrink-0">
              <Globe className="w-6 h-6" />
            </div>
            <div>
              <h2 className="text-[16px] font-semibold text-[#171717]">Availability Status</h2>
              {isAvailable ? (
                <p className="text-[14px] text-[#16A34A] mt-0.5">
                  You are currently eligible to receive new assignments.
                </p>
              ) : (
                <p className="text-[14px] text-[#F43F5E] mt-0.5">
                  You will not receive new assignments.
                </p>
              )}
            </div>
          </div>
          <div className="flex items-center gap-3">
            <span className="text-[14px] font-medium text-[#171717]">Available</span>
            <button
              onClick={() => setIsAvailable(!isAvailable)}
              className={`w-11 h-6 rounded-full relative transition-colors ${
                isAvailable ? "bg-[#00A0E3]" : "bg-[#E5E7EB]"
              }`}
            >
              <div
                className={`w-5 h-5 bg-white rounded-full absolute top-[2px] transition-transform ${
                  isAvailable ? "left-[22px]" : "left-[2px]"
                }`}
              />
            </button>
          </div>
        </div>

        {/* Workload Settings */}
        <div className="bg-white border border-[#EAECF0] rounded-[12px] p-6 shadow-[0_1px_2px_rgba(0,0,0,0.02)]">
          <h2 className="text-[16px] font-semibold text-[#171717] mb-5">Workload Settings</h2>
          
          <div className="grid grid-cols-2 gap-6">
            <div>
              <label className="block text-[14px] font-medium text-[#171717] mb-2">
                Maximum Active Assignments
              </label>
              <input
                type="text"
                defaultValue="12"
                className="w-full h-11 px-4 border border-[#EAECF0] rounded-[8px] text-[15px] outline-none focus:border-[#00A0E3] transition-colors"
              />
              <p className="text-[13px] text-[#8A94A6] mt-2">
                Maximum number of documents you can work on simultaneously
              </p>
            </div>
            <div>
              <label className="block text-[14px] font-medium text-[#171717] mb-2">
                Maximum Word Count Per Day (Optional)
              </label>
              <input
                type="text"
                defaultValue="10000"
                className="w-full h-11 px-4 border border-[#EAECF0] rounded-[8px] text-[15px] outline-none focus:border-[#00A0E3] transition-colors"
              />
              <p className="text-[13px] text-[#8A94A6] mt-2">
                Leave empty for no daily word count limit
              </p>
            </div>
          </div>
          
          <div className="flex justify-end mt-6">
            <button className="bg-[#00A0E3] text-white px-5 py-2.5 rounded-[8px] font-medium text-[14px] hover:bg-[#008AC5] transition-colors">
              Save Changes
            </button>
          </div>
        </div>

        {/* Schedule Settings */}
        <div className="bg-white border border-[#EAECF0] rounded-[12px] p-6 shadow-[0_1px_2px_rgba(0,0,0,0.02)]">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-[16px] font-semibold text-[#171717]">Schedule Settings</h2>
              <p className="text-[14px] text-[#8A94A6] mt-0.5">Set your preferred working hours</p>
            </div>
            <button
              onClick={() => setScheduleEnabled(!scheduleEnabled)}
              className={`w-11 h-6 rounded-full relative transition-colors ${
                scheduleEnabled ? "bg-[#00A0E3]" : "bg-[#E5E7EB]"
              }`}
            >
              <div
                className={`w-5 h-5 bg-white rounded-full absolute top-[2px] transition-transform ${
                  scheduleEnabled ? "left-[22px]" : "left-[2px]"
                }`}
              />
            </button>
          </div>

          {scheduleEnabled && (
            <div className="mt-6 pt-6 border-t border-[#EAECF0]">
              <div className="grid grid-cols-2 gap-6 mb-6">
                <div>
                  <label className="block text-[14px] font-medium text-[#171717] mb-2">
                    Start Time
                  </label>
                  <div className="relative">
                    <input
                      type="text"
                      defaultValue="09:00 AM"
                      className="w-full h-11 px-4 border border-[#EAECF0] rounded-[8px] text-[15px] outline-none focus:border-[#00A0E3] transition-colors"
                    />
                    <div className="absolute right-4 top-1/2 -translate-y-1/2 text-[#8A94A6]">
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <circle cx="12" cy="12" r="10" />
                        <polyline points="12 6 12 12 16 14" />
                      </svg>
                    </div>
                  </div>
                </div>
                <div>
                  <label className="block text-[14px] font-medium text-[#171717] mb-2">
                    End Time
                  </label>
                  <div className="relative">
                    <input
                      type="text"
                      defaultValue="05:00 PM"
                      className="w-full h-11 px-4 border border-[#EAECF0] rounded-[8px] text-[15px] outline-none focus:border-[#00A0E3] transition-colors"
                    />
                    <div className="absolute right-4 top-1/2 -translate-y-1/2 text-[#8A94A6]">
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <circle cx="12" cy="12" r="10" />
                        <polyline points="12 6 12 12 16 14" />
                      </svg>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-[#F9FAFB] border border-[#EAECF0] rounded-[8px] p-4 flex items-center gap-3 mb-6">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-[#525866]">
                  <circle cx="12" cy="12" r="10"/>
                  <polyline points="12 6 12 12 16 14"/>
                </svg>
                <span className="text-[14px] text-[#525866] font-medium">Timezone: EST (UTC-5)</span>
              </div>

              <div className="flex justify-end">
                <button className="bg-[#00A0E3] text-white px-5 py-2.5 rounded-[8px] font-medium text-[14px] hover:bg-[#008AC5] transition-colors">
                  Save Changes
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Vacation Mode */}
        <div className="bg-white border border-[#EAECF0] rounded-[12px] p-6 shadow-[0_1px_2px_rgba(0,0,0,0.02)]">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-[16px] font-semibold text-[#171717]">Vacation Mode</h2>
              <p className="text-[14px] text-[#8A94A6] mt-0.5">Schedule time away from work</p>
            </div>
            <button
              onClick={() => setVacationEnabled(!vacationEnabled)}
              className={`w-11 h-6 rounded-full relative transition-colors ${
                vacationEnabled ? "bg-[#00A0E3]" : "bg-[#E5E7EB]"
              }`}
            >
              <div
                className={`w-5 h-5 bg-white rounded-full absolute top-[2px] transition-transform ${
                  vacationEnabled ? "left-[22px]" : "left-[2px]"
                }`}
              />
            </button>
          </div>

          {vacationEnabled && (
            <div className="mt-6 pt-6 border-t border-[#EAECF0]">
              <div className="grid grid-cols-2 gap-6 mb-6">
                <div>
                  <label className="block text-[14px] font-medium text-[#171717] mb-2">
                    Start Date
                  </label>
                  <div className="relative">
                    <input
                      type="text"
                      defaultValue="01-03-2026"
                      className="w-full h-11 px-4 border border-[#EAECF0] rounded-[8px] text-[15px] outline-none focus:border-[#00A0E3] transition-colors"
                    />
                    <div className="absolute right-4 top-1/2 -translate-y-1/2 text-[#8A94A6]">
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <rect x="3" y="4" width="18" height="18" rx="2" ry="2"/>
                        <line x1="16" y1="2" x2="16" y2="6"/>
                        <line x1="8" y1="2" x2="8" y2="6"/>
                        <line x1="3" y1="10" x2="21" y2="10"/>
                      </svg>
                    </div>
                  </div>
                </div>
                <div>
                  <label className="block text-[14px] font-medium text-[#171717] mb-2">
                    End Date
                  </label>
                  <div className="relative">
                    <input
                      type="text"
                      defaultValue="07-03-2026"
                      className="w-full h-11 px-4 border border-[#EAECF0] rounded-[8px] text-[15px] outline-none focus:border-[#00A0E3] transition-colors"
                    />
                    <div className="absolute right-4 top-1/2 -translate-y-1/2 text-[#8A94A6]">
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <rect x="3" y="4" width="18" height="18" rx="2" ry="2"/>
                        <line x1="16" y1="2" x2="16" y2="6"/>
                        <line x1="8" y1="2" x2="8" y2="6"/>
                        <line x1="3" y1="10" x2="21" y2="10"/>
                      </svg>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-[#FEF3C7] border border-[#FDE68A] rounded-[8px] p-4 flex items-start gap-3 mb-6">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#D97706" strokeWidth="2" className="mt-0.5 shrink-0">
                  <circle cx="12" cy="12" r="10"></circle>
                  <line x1="12" y1="8" x2="12" y2="12"></line>
                  <line x1="12" y1="16" x2="12.01" y2="16"></line>
                </svg>
                <div className="text-[14px] text-[#D97706] font-medium leading-relaxed">
                  You will automatically be marked as unavailable during this period.
                </div>
              </div>

              <div className="flex justify-end">
                <button className="bg-[#00A0E3] text-white px-5 py-2.5 rounded-[8px] font-medium text-[14px] hover:bg-[#008AC5] transition-colors">
                  Save Vacation Schedule
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
