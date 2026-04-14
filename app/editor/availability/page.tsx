"use client";

import { useEffect, useMemo, useState } from "react";
import { Globe } from "lucide-react";
import { apiGet } from "@/lib/client-api";

type AvailabilityPayload = {
  availability_status?: string;
  maximum_active_assignments?: number;
  maximum_word_count_per_day?: number | null;
  vacation_start_date?: string | null;
  vacation_end_date?: string | null;
};

function toDateInput(value?: string | null) {
  if (!value) {
    return "";
  }

  return new Date(value).toISOString().slice(0, 10);
}

export default function AvailabilityPage() {
  const [data, setData] = useState<AvailabilityPayload | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let active = true;

    const load = async () => {
      try {
        setLoading(true);
        const payload = await apiGet<AvailabilityPayload | null>("/api/editor/availability");
        if (active) {
          setData(payload);
          setError(null);
        }
      } catch (err) {
        if (active) {
          setError(err instanceof Error ? err.message : "Failed to load availability.");
        }
      } finally {
        if (active) {
          setLoading(false);
        }
      }
    };

    load();
    return () => {
      active = false;
    };
  }, []);

  const isAvailable = useMemo(
    () => (data?.availability_status || "available") !== "at_capacity" && (data?.availability_status || "available") !== "vacation",
    [data]
  );

  const scheduleEnabled = Boolean(data?.maximum_active_assignments || data?.maximum_word_count_per_day);
  const vacationEnabled = Boolean(data?.vacation_start_date || data?.vacation_end_date);

  return (
    <div className="w-full font-dm-sans animate-in fade-in duration-500">
      <div className="-mx-6 lg:-mx-8 px-6 lg:px-8 pb-3 border-b border-[#E7E7E9] bg-white flex flex-col justify-center">
        <div className="text-[22px] font-medium text-[#1C1C1D] leading-tight">Availability</div>
        <div className="text-[14px] text-[#78788D] mt-1.5">
          Manage your assignment availability and workload preferences to optimize your queue.
        </div>
      </div>

      <div className="space-y-6 pt-6 text-[#171717]">
        {error ? (
        <div className="mb-4 rounded-[10px] border border-[#FECACA] bg-[#FEF2F2] px-4 py-3 text-[13px] text-[#B91C1C]">{error}</div>
      ) : null}

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
              disabled
              className={`w-11 h-6 rounded-full relative transition-colors ${
                isAvailable ? "bg-[#00A0E3]" : "bg-[#E5E7EB]"
              } cursor-not-allowed`}
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
                value={loading ? "" : String(data?.maximum_active_assignments ?? 5)}
                readOnly
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
                value={loading ? "" : String(data?.maximum_word_count_per_day ?? "")}
                readOnly
                className="w-full h-11 px-4 border border-[#EAECF0] rounded-[8px] text-[15px] outline-none focus:border-[#00A0E3] transition-colors"
              />
              <p className="text-[13px] text-[#8A94A6] mt-2">
                Leave empty for no daily word count limit
              </p>
            </div>
          </div>
          
          <div className="flex justify-end mt-6">
            <button disabled className="bg-[#A0AAB5] text-white px-5 py-2.5 rounded-[8px] font-medium text-[14px] transition-colors cursor-not-allowed">
              Save Changes
            </button>
          </div>
        </div>

        {/* Schedule Settings */}
        <div className="bg-white border border-[#EAECF0] rounded-[12px] p-6 shadow-[0_1px_2px_rgba(0,0,0,0.02)]">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-[16px] font-semibold text-[#171717]">Schedule Settings</h2>
              <p className="text-[14px] text-[#8A94A6] mt-0.5">Read-only in this phase (no writes wired).</p>
            </div>
            <button
              disabled
              className={`w-11 h-6 rounded-full relative transition-colors ${
                scheduleEnabled ? "bg-[#00A0E3]" : "bg-[#E5E7EB]"
              } cursor-not-allowed`}
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
                      value="09:00 AM"
                      readOnly
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
                      value="05:00 PM"
                      readOnly
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
                <button disabled className="bg-[#A0AAB5] text-white px-5 py-2.5 rounded-[8px] font-medium text-[14px] transition-colors cursor-not-allowed">
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
              disabled
              className={`w-11 h-6 rounded-full relative transition-colors ${
                vacationEnabled ? "bg-[#00A0E3]" : "bg-[#E5E7EB]"
              } cursor-not-allowed`}
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
                      type="date"
                      value={toDateInput(data?.vacation_start_date)}
                      readOnly
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
                      type="date"
                      value={toDateInput(data?.vacation_end_date)}
                      readOnly
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
                <button disabled className="bg-[#A0AAB5] text-white px-5 py-2.5 rounded-[8px] font-medium text-[14px] transition-colors cursor-not-allowed">
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
