"use client";

import { useState } from "react";
import { Eye, LogOut, Shield, Trash2, Upload } from "lucide-react";

type ActionKey =
  | "avatar"
  | "name"
  | "email"
  | "phone"
  | "country"
  | "experience"
  | "language"
  | "expertise"
  | "pairs"
  | "certifications"
  | "twoFactor"
  | "password"
  | "logout"
  | "deactivate"
  | null;

export default function EditorProfile() {
  const [openPanel, setOpenPanel] = useState<ActionKey>(null);

  const togglePanel = (panel: Exclude<ActionKey, null>) => {
    setOpenPanel((prev) => (prev === panel ? null : panel));
  };

  const renderPanel = (panel: Exclude<ActionKey, null>) => {
    if (openPanel !== panel) {
      return null;
    }

    switch (panel) {
      case "avatar":
        return (
          <div className="p-6 bg-[#FCFCFD] border-t border-[#EAECF0]">
            <div className="flex flex-col md:flex-row md:items-center gap-4">
              <img src="https://i.pravatar.cc/120?u=a042581f4e29026024d" alt="Profile avatar" className="w-16 h-16 rounded-full border border-[#EAECF0]" />
              <div className="flex-1">
                <div className="text-[13px] font-medium text-[#171717]">Upload a new avatar</div>
                <div className="text-[12px] text-[#525866] mt-1">Recommended: square image, at least 400x400px.</div>
              </div>
              <button className="inline-flex items-center gap-2 px-4 py-2 border border-[#EAECF0] rounded-[8px] text-[13px] font-medium text-[#171717] hover:bg-[#F9FAFB]">
                <Upload className="w-4 h-4" /> Upload Photo
              </button>
            </div>
          </div>
        );
      case "name":
        return (
          <div className="p-6 bg-[#FCFCFD] border-t border-[#EAECF0]">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-[12px] font-medium text-[#171717] mb-1.5">First Name</label>
                <input defaultValue="Alexander" className="w-full h-10 px-3 border border-[#EAECF0] rounded-[8px] text-[13px] outline-none focus:border-[#00A0E3]" />
              </div>
              <div>
                <label className="block text-[12px] font-medium text-[#171717] mb-1.5">Last Name</label>
                <input defaultValue="Thompson" className="w-full h-10 px-3 border border-[#EAECF0] rounded-[8px] text-[13px] outline-none focus:border-[#00A0E3]" />
              </div>
            </div>
            <div className="flex justify-end mt-4">
              <button className="px-4 py-2 bg-[#00A0E3] text-white rounded-[8px] text-[13px] font-medium hover:bg-[#008CC2]">Save Name</button>
            </div>
          </div>
        );
      case "email":
        return (
          <div className="p-6 bg-[#FCFCFD] border-t border-[#EAECF0] space-y-4">
            <div>
              <label className="block text-[12px] font-medium text-[#171717] mb-1.5">Email Address</label>
              <input defaultValue="alex.thompson@student.stanford.edu" className="w-full h-10 px-3 border border-[#EAECF0] rounded-[8px] text-[13px] outline-none focus:border-[#00A0E3]" />
            </div>
            <div className="flex justify-end">
              <button className="px-4 py-2 bg-[#00A0E3] text-white rounded-[8px] text-[13px] font-medium hover:bg-[#008CC2]">Save Email</button>
            </div>
          </div>
        );
      case "phone":
        return (
          <div className="p-6 bg-[#FCFCFD] border-t border-[#EAECF0] space-y-4">
            <div>
              <label className="block text-[12px] font-medium text-[#171717] mb-1.5">Mobile Number</label>
              <input defaultValue="+1 123456789" className="w-full h-10 px-3 border border-[#EAECF0] rounded-[8px] text-[13px] outline-none focus:border-[#00A0E3]" />
            </div>
            <div className="flex justify-end">
              <button className="px-4 py-2 bg-[#00A0E3] text-white rounded-[8px] text-[13px] font-medium hover:bg-[#008CC2]">Save Number</button>
            </div>
          </div>
        );
      case "country":
        return (
          <div className="p-6 bg-[#FCFCFD] border-t border-[#EAECF0] grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-[12px] font-medium text-[#171717] mb-1.5">Country</label>
              <select className="w-full h-10 px-3 border border-[#EAECF0] rounded-[8px] text-[13px] outline-none focus:border-[#00A0E3] bg-white">
                <option>United States</option>
                <option>India</option>
                <option>United Kingdom</option>
              </select>
            </div>
            <div>
              <label className="block text-[12px] font-medium text-[#171717] mb-1.5">State</label>
              <input defaultValue="California" className="w-full h-10 px-3 border border-[#EAECF0] rounded-[8px] text-[13px] outline-none focus:border-[#00A0E3]" />
            </div>
            <div className="md:col-span-2 flex justify-end">
              <button className="px-4 py-2 bg-[#00A0E3] text-white rounded-[8px] text-[13px] font-medium hover:bg-[#008CC2]">Save Location</button>
            </div>
          </div>
        );
      case "experience":
        return (
          <div className="p-6 bg-[#FCFCFD] border-t border-[#EAECF0] space-y-4">
            <div>
              <label className="block text-[12px] font-medium text-[#171717] mb-1.5">Years of Experience</label>
              <input defaultValue="12" className="w-full h-10 px-3 border border-[#EAECF0] rounded-[8px] text-[13px] outline-none focus:border-[#00A0E3]" />
            </div>
            <div className="flex justify-end">
              <button className="px-4 py-2 bg-[#00A0E3] text-white rounded-[8px] text-[13px] font-medium hover:bg-[#008CC2]">Save Experience</button>
            </div>
          </div>
        );
      case "language":
        return (
          <div className="p-6 bg-[#FCFCFD] border-t border-[#EAECF0] space-y-4">
            <div>
              <label className="block text-[12px] font-medium text-[#171717] mb-1.5">Primary Language</label>
              <select className="w-full h-10 px-3 border border-[#EAECF0] rounded-[8px] text-[13px] outline-none focus:border-[#00A0E3] bg-white">
                <option>English (UK)</option>
                <option>English (US)</option>
                <option>Spanish</option>
              </select>
            </div>
            <div className="flex justify-end">
              <button className="px-4 py-2 bg-[#00A0E3] text-white rounded-[8px] text-[13px] font-medium hover:bg-[#008CC2]">Save Language</button>
            </div>
          </div>
        );
      case "expertise":
        return (
          <div className="p-6 bg-[#FCFCFD] border-t border-[#EAECF0] space-y-4">
            <div>
              <label className="block text-[12px] font-medium text-[#171717] mb-1.5">Primary Expertise</label>
              <select className="w-full h-10 px-3 border border-[#EAECF0] rounded-[8px] text-[13px] outline-none focus:border-[#00A0E3] bg-white">
                <option>Editing</option>
                <option>Proofreading</option>
                <option>Translation</option>
              </select>
            </div>
            <div className="flex gap-2 flex-wrap">
              <span className="px-2 py-1 text-[11px] rounded-[6px] bg-[#E1F4FD] text-[#171717]">Editing</span>
              <span className="px-2 py-1 text-[11px] rounded-[6px] bg-[#E1F4FD] text-[#171717]">Proofreading</span>
            </div>
            <div className="flex justify-end">
              <button className="px-4 py-2 bg-[#00A0E3] text-white rounded-[8px] text-[13px] font-medium hover:bg-[#008CC2]">Save Expertise</button>
            </div>
          </div>
        );
      case "pairs":
        return (
          <div className="p-6 bg-[#FCFCFD] border-t border-[#EAECF0] space-y-4">
            <div>
              <label className="block text-[12px] font-medium text-[#171717] mb-1.5">Language Pairs</label>
              <select className="w-full h-10 px-3 border border-[#EAECF0] rounded-[8px] text-[13px] outline-none focus:border-[#00A0E3] bg-white">
                <option>English ↔ Spanish</option>
                <option>English ↔ French</option>
                <option>English ↔ German</option>
              </select>
            </div>
            <div className="flex gap-2 flex-wrap">
              <span className="px-2 py-1 text-[11px] rounded-[6px] bg-[#EAF0F5] text-[#171717]">English ↔ Spanish</span>
              <span className="px-2 py-1 text-[11px] rounded-[6px] bg-[#EAF0F5] text-[#171717]">English ↔ French</span>
              <span className="px-2 py-1 text-[11px] rounded-[6px] bg-[#EAF0F5] text-[#171717]">English ↔ German</span>
            </div>
            <div className="flex justify-end">
              <button className="px-4 py-2 bg-[#00A0E3] text-white rounded-[8px] text-[13px] font-medium hover:bg-[#008CC2]">Save Pairs</button>
            </div>
          </div>
        );
      case "certifications":
        return (
          <div className="p-6 bg-[#FCFCFD] border-t border-[#EAECF0] space-y-4">
            <div className="border border-dashed border-[#EAECF0] bg-[#F9FAFB] rounded-[10px] p-8 text-center">
              <div className="inline-flex items-center justify-center w-8 h-8 rounded-[8px] border border-[#EAECF0] bg-white mb-2">
                <Upload className="w-4 h-4 text-[#525866]" />
              </div>
              <div className="text-[14px] text-[#171717]">Drag and drop your document here or click to <span className="text-[#00A0E3] font-medium">browse files</span></div>
              <div className="text-[12px] text-[#525866] mt-1">Supported formats: DOC, DOCX, PDF. Maximum file size: 25MB</div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              <div className="flex items-center justify-between bg-[#EAF4FB] rounded-[8px] px-3 py-2">
                <div>
                  <div className="text-[12px] font-medium text-[#171717]">ATA Certification.pdf</div>
                  <div className="text-[11px] text-[#525866]">1.4 MB</div>
                </div>
                <Trash2 className="w-3.5 h-3.5 text-[#EF4444]" />
              </div>
              <div className="flex items-center justify-between bg-[#EAF4FB] rounded-[8px] px-3 py-2">
                <div>
                  <div className="text-[12px] font-medium text-[#171717]">Cambridge CELTA.pdf</div>
                  <div className="text-[11px] text-[#525866]">1.4 MB</div>
                </div>
                <Trash2 className="w-3.5 h-3.5 text-[#EF4444]" />
              </div>
            </div>
            <div className="flex justify-end">
              <button className="px-4 py-2 bg-[#00A0E3] text-white rounded-[8px] text-[13px] font-medium hover:bg-[#008CC2]">Save Certifications</button>
            </div>
          </div>
        );
      case "twoFactor":
        return (
          <div className="p-6 bg-[#FCFCFD] border-t border-[#EAECF0] space-y-4">
            <div className="flex items-start gap-3 rounded-[8px] border border-[#EAECF0] bg-white p-4">
              <Shield className="w-4 h-4 text-[#00A0E3] mt-0.5" />
              <div>
                <div className="text-[13px] font-medium text-[#171717]">Two-Factor Authentication</div>
                <div className="text-[12px] text-[#525866] mt-1">Protect your account with one-time verification on sign in.</div>
              </div>
            </div>
            <div className="flex justify-end">
              <button className="px-4 py-2 bg-[#00A0E3] text-white rounded-[8px] text-[13px] font-medium hover:bg-[#008CC2]">Enable 2FA</button>
            </div>
          </div>
        );
      case "password":
        return (
          <div className="p-6 bg-[#FCFCFD] border-t border-[#EAECF0] space-y-4">
            <div>
              <label className="block text-[12px] font-medium text-[#171717] mb-1.5">Current Password</label>
              <div className="relative">
                <input type="password" defaultValue="Password@123" className="w-full h-10 px-3 pr-10 border border-[#EAECF0] rounded-[8px] text-[13px] outline-none focus:border-[#00A0E3]" />
                <Eye className="w-4 h-4 text-[#525866] absolute right-3 top-1/2 -translate-y-1/2" />
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-[12px] font-medium text-[#171717] mb-1.5">New Password</label>
                <input type="password" placeholder="Create new password" className="w-full h-10 px-3 border border-[#EAECF0] rounded-[8px] text-[13px] outline-none focus:border-[#00A0E3]" />
              </div>
              <div>
                <label className="block text-[12px] font-medium text-[#171717] mb-1.5">Confirm New Password</label>
                <input type="password" placeholder="Repeat new password" className="w-full h-10 px-3 border border-[#EAECF0] rounded-[8px] text-[13px] outline-none focus:border-[#00A0E3]" />
              </div>
            </div>
            <div className="rounded-[8px] bg-[#F2F4F7] p-4 text-[12px] text-[#171717]">
              <div className="font-semibold mb-1">Password Requirements</div>
              <div>Minimum 8 characters, at least one number, and one special character.</div>
            </div>
            <div className="flex justify-end">
              <button className="px-4 py-2 bg-[#00A0E3] text-white rounded-[8px] text-[13px] font-medium hover:bg-[#008CC2]">Update Password</button>
            </div>
          </div>
        );
      case "logout":
        return (
          <div className="p-6 bg-[#FCFCFD] border-t border-[#EAECF0] flex items-center justify-between gap-4">
            <div className="text-[13px] text-[#525866]">You will be logged out of this device and asked to sign in again.</div>
            <button className="inline-flex items-center gap-2 px-4 py-2 border border-[#EAECF0] rounded-[8px] text-[13px] font-medium text-[#171717] hover:bg-[#F9FAFB]">
              <LogOut className="w-4 h-4" /> Confirm Sign Out
            </button>
          </div>
        );
      case "deactivate":
        return (
          <div className="p-6 bg-[#FFF7F7] border-t border-[#FECACA] flex items-center justify-between gap-4">
            <div className="text-[13px] text-[#7F1D1D]">This action permanently deletes your account and cannot be undone.</div>
            <button className="inline-flex items-center gap-2 px-4 py-2 border border-[#FECACA] rounded-[8px] text-[13px] font-medium text-[#EF4444] hover:bg-[#FEF2F2]">
              <Trash2 className="w-4 h-4" /> Delete Account
            </button>
          </div>
        );
      default:
        return null;
    }
  };

  const rows: Array<{
    key: Exclude<ActionKey, null>;
    label: string;
    value: string;
    action: string;
    danger?: boolean;
  }> = [
    { key: "avatar", label: "Your Avatar", value: "Recommended: Square image, at least 400x400px.", action: "Change Photo" },
    { key: "name", label: "Full Name", value: "Alexander Thompson", action: "Update Full Name" },
    { key: "email", label: "E-Mail Address", value: "alex.thompson@student.stanford.edu", action: "Change E-Mail" },
    { key: "phone", label: "Mobile Number (Optional)", value: "+1 123456789", action: "Add Mobile Number" },
    { key: "country", label: "Country, State (Optional)", value: "United States, California", action: "Update Country, State" },
    { key: "experience", label: "Years of Experience", value: "Current Set 12", action: "Update Years of Experience" },
    { key: "language", label: "Primary Language", value: "English (UK)", action: "Update Language" },
    { key: "expertise", label: "Primary Expertise", value: "Editing, Proofreading", action: "Update Expertise" },
    { key: "pairs", label: "Language Pairs", value: "English to Spanish, English to French, English to German", action: "Update Language Pairs" },
    { key: "certifications", label: "Certifications", value: "ATA Certification.pdf, Cambridge CELTA.pdf", action: "Manage Certifications" },
    { key: "twoFactor", label: "Two-Factor Authentication", value: "Disabled", action: "Add Two-Factor Authentication" },
    { key: "password", label: "Current Password", value: "••••••••••••••••", action: "Reset Password" },
    {
      key: "logout",
      label: "Sign Out",
      value: "Sign out of this device and session. You will need to sign in again on this device.",
      action: "Sign Out",
    },
    {
      key: "deactivate",
      label: "Deactivate Account",
      value: "Permanently delete your account across all devices. You will no longer be able to create a Submit Right account with this email.",
      action: "Delete Account",
      danger: true,
    },
  ];

  return (
    <div className="w-full font-dm-sans animate-in fade-in duration-500">
      <div>
        <div className="text-[24px] font-bold text-[#171717] mb-1">Profile & Settings</div>
        <p className="text-[14px] text-[#525866]">Manage your profile and workspace information.</p>
      </div>

      <div className="mt-6 bg-[#FFFFFF] border border-[#EAECF0] rounded-[12px] shadow-sm overflow-hidden">
        {rows.map((row) => (
          <div key={row.key} className="border-b border-[#EAECF0] last:border-b-0">
            <div className="p-6 flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div>
                <div className={`text-[14px] font-bold mb-1 ${row.danger ? "text-[#EF4444]" : "text-[#171717]"}`}>{row.label}</div>
                <div className="text-[13px] text-[#525866] max-w-[700px]">{row.value}</div>
              </div>

              <button
                onClick={() => togglePanel(row.key)}
                className={`px-4 py-2 rounded-[8px] text-[13px] font-medium transition-colors ${
                  row.danger
                    ? "border border-[#FECACA] text-[#EF4444] hover:bg-[#FEF2F2]"
                    : "border border-[#EAECF0] text-[#171717] hover:bg-[#F9FAFB]"
                }`}
              >
                {openPanel === row.key ? "Hide" : row.action}
              </button>
            </div>

            {renderPanel(row.key)}
          </div>
        ))}
      </div>
    </div>
  );
}
