"use client";

import { useEffect, useMemo, useState } from "react";
import { AlertTriangle, LogOut, Save, ShieldCheck, Trash2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { apiGet, apiRequest } from "@/lib/client-api";
import { getStoredAuthSession, signOutClient } from "@/lib/client-auth";

type ProfileRecord = {
  full_name?: string | null;
  email?: string | null;
  mobile_number?: string | null;
  country?: string | null;
  state?: string | null;
  years_of_experience?: number | null;
  primary_language?: string | null;
  primary_expertise?: string | null;
  language_pairs?: string[] | null;
};

type ProfileForm = {
  fullName: string;
  email: string;
  mobileNumber: string;
  country: string;
  state: string;
  yearsOfExperience: string;
  primaryLanguage: string;
  primaryExpertise: string;
  languagePairs: string;
};

function emptyForm(): ProfileForm {
  return {
    fullName: "",
    email: "",
    mobileNumber: "",
    country: "",
    state: "",
    yearsOfExperience: "",
    primaryLanguage: "",
    primaryExpertise: "",
    languagePairs: "",
  };
}

function mapRecordToForm(record: ProfileRecord): ProfileForm {
  return {
    fullName: record.full_name ?? "",
    email: record.email ?? "",
    mobileNumber: record.mobile_number ?? "",
    country: record.country ?? "",
    state: record.state ?? "",
    yearsOfExperience:
      typeof record.years_of_experience === "number"
        ? String(record.years_of_experience)
        : "",
    primaryLanguage: record.primary_language ?? "",
    primaryExpertise: record.primary_expertise ?? "",
    languagePairs: Array.isArray(record.language_pairs)
      ? record.language_pairs.join(", ")
      : "",
  };
}

export default function AdminProfilePage() {
  const router = useRouter();
  const session = getStoredAuthSession();

  const [form, setForm] = useState<ProfileForm>(emptyForm());
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [isSigningOut, setIsSigningOut] = useState(false);
  const [isDeactivating, setIsDeactivating] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const roleLabel = useMemo(() => {
    const role =
      typeof session?.user?.role === "string" && session.user.role.trim()
        ? session.user.role
        : "admin";
    return role;
  }, [session]);

  const hasRequiredFields = useMemo(() => {
    return form.fullName.trim().length >= 2 && form.email.trim().length > 0;
  }, [form.fullName, form.email]);

  useEffect(() => {
    const loadProfile = async () => {
      setIsLoading(true);
      setError(null);

      try {
        const data = await apiGet<ProfileRecord>("/api/profile");
        setForm(mapRecordToForm(data));
      } catch (err) {
        setError(err instanceof Error ? err.message : "Failed to load profile.");
      } finally {
        setIsLoading(false);
      }
    };

    void loadProfile();
  }, []);

  const onFieldChange = (key: keyof ProfileForm, value: string) => {
    setSuccess(null);
    setForm((prev) => ({ ...prev, [key]: value }));
  };

  const saveProfile = async () => {
    if (!hasRequiredFields) {
      setError("Full name and email are required.");
      return;
    }

    const parsedYears = Number.parseInt(form.yearsOfExperience, 10);
    const languagePairs = form.languagePairs
      .split(",")
      .map((item) => item.trim())
      .filter(Boolean);

    setIsSaving(true);
    setError(null);
    setSuccess(null);

    try {
      const payload = {
        fullName: form.fullName.trim(),
        email: form.email.trim(),
        mobileNumber: form.mobileNumber.trim() || null,
        country: form.country.trim() || null,
        state: form.state.trim() || null,
        yearsOfExperience: Number.isNaN(parsedYears) ? null : parsedYears,
        primaryLanguage: form.primaryLanguage.trim() || null,
        primaryExpertise: form.primaryExpertise.trim() || null,
        languagePairs: languagePairs.length ? languagePairs : null,
      };

      const updated = await apiRequest<ProfileRecord>("/api/profile", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      setForm(mapRecordToForm(updated));
      setSuccess("Profile updated successfully.");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to update profile.");
    } finally {
      setIsSaving(false);
    }
  };

  const handleSignOut = async () => {
    setIsSigningOut(true);
    await signOutClient();
    router.replace("/signin");
  };

  const handleDeactivate = async () => {
    setIsDeactivating(true);
    setError(null);

    try {
      await apiRequest<{ deactivated: boolean }>("/api/auth/deactivate", {
        method: "DELETE",
      });
      await signOutClient();
      router.replace("/signin");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to deactivate account.");
      setIsDeactivating(false);
    }
  };

  return (
    <div className="w-full font-dm-sans">
      <div className="mb-6">
        <div className="text-[22px] font-medium text-[#171717]">Profile & Settings</div>
        <p className="text-[13px] text-[#78788D] mt-1">Manage your admin identity and profile settings.</p>
      </div>

      {error ? <div className="mb-4 rounded-[8px] border border-[#FECACA] bg-[#FEF2F2] px-4 py-3 text-[13px] text-[#B42318]">{error}</div> : null}
      {success ? <div className="mb-4 rounded-[8px] border border-[#ABEFC6] bg-[#ECFDF3] px-4 py-3 text-[13px] text-[#067647]">{success}</div> : null}

      {isLoading ? (
        <div className="rounded-[12px] border border-[#EAECF0] bg-white px-5 py-6 text-[14px] text-[#525866]">Loading profile...</div>
      ) : (
        <div className="rounded-[12px] border border-[#EAECF0] bg-white overflow-hidden">
          <div className="p-5 border-b border-[#EAECF0] flex items-center justify-between">
            <div className="text-[13px] font-medium text-[#171717]">Role</div>
            <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-[999px] bg-[#EEF8F2] text-[#067647] text-[12px] font-medium capitalize">
              <ShieldCheck className="w-3.5 h-3.5" />
              {roleLabel}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-5 border-b border-[#EAECF0]">
            <div>
              <label className="text-[12px] font-medium text-[#171717]">Full Name</label>
              <input value={form.fullName} onChange={(e) => onFieldChange("fullName", e.target.value)} className="mt-1 w-full h-10 rounded-[8px] border border-[#EAECF0] px-3 text-[13px] outline-none focus:border-[#00A0E3]" />
            </div>
            <div>
              <label className="text-[12px] font-medium text-[#171717]">Email</label>
              <input type="email" value={form.email} onChange={(e) => onFieldChange("email", e.target.value)} className="mt-1 w-full h-10 rounded-[8px] border border-[#EAECF0] px-3 text-[13px] outline-none focus:border-[#00A0E3]" />
            </div>
            <div>
              <label className="text-[12px] font-medium text-[#171717]">Mobile Number</label>
              <input value={form.mobileNumber} onChange={(e) => onFieldChange("mobileNumber", e.target.value)} className="mt-1 w-full h-10 rounded-[8px] border border-[#EAECF0] px-3 text-[13px] outline-none focus:border-[#00A0E3]" />
            </div>
            <div>
              <label className="text-[12px] font-medium text-[#171717]">Years Of Experience</label>
              <input value={form.yearsOfExperience} onChange={(e) => onFieldChange("yearsOfExperience", e.target.value)} className="mt-1 w-full h-10 rounded-[8px] border border-[#EAECF0] px-3 text-[13px] outline-none focus:border-[#00A0E3]" />
            </div>
            <div>
              <label className="text-[12px] font-medium text-[#171717]">Country</label>
              <input value={form.country} onChange={(e) => onFieldChange("country", e.target.value)} className="mt-1 w-full h-10 rounded-[8px] border border-[#EAECF0] px-3 text-[13px] outline-none focus:border-[#00A0E3]" />
            </div>
            <div>
              <label className="text-[12px] font-medium text-[#171717]">State</label>
              <input value={form.state} onChange={(e) => onFieldChange("state", e.target.value)} className="mt-1 w-full h-10 rounded-[8px] border border-[#EAECF0] px-3 text-[13px] outline-none focus:border-[#00A0E3]" />
            </div>
            <div>
              <label className="text-[12px] font-medium text-[#171717]">Primary Language</label>
              <input value={form.primaryLanguage} onChange={(e) => onFieldChange("primaryLanguage", e.target.value)} className="mt-1 w-full h-10 rounded-[8px] border border-[#EAECF0] px-3 text-[13px] outline-none focus:border-[#00A0E3]" />
            </div>
            <div>
              <label className="text-[12px] font-medium text-[#171717]">Primary Expertise</label>
              <input value={form.primaryExpertise} onChange={(e) => onFieldChange("primaryExpertise", e.target.value)} className="mt-1 w-full h-10 rounded-[8px] border border-[#EAECF0] px-3 text-[13px] outline-none focus:border-[#00A0E3]" />
            </div>
            <div className="md:col-span-2">
              <label className="text-[12px] font-medium text-[#171717]">Language Pairs (comma-separated)</label>
              <input value={form.languagePairs} onChange={(e) => onFieldChange("languagePairs", e.target.value)} className="mt-1 w-full h-10 rounded-[8px] border border-[#EAECF0] px-3 text-[13px] outline-none focus:border-[#00A0E3]" />
            </div>
          </div>

          <div className="p-5 border-b border-[#EAECF0] flex justify-end">
            <button onClick={saveProfile} disabled={isSaving || !hasRequiredFields} className="inline-flex items-center gap-2 px-4 py-2 rounded-[8px] bg-[#00A0E3] text-white text-[13px] hover:bg-[#008ec9] disabled:opacity-60 disabled:cursor-not-allowed">
              <Save className="w-4 h-4" />
              {isSaving ? "Saving..." : "Save Profile"}
            </button>
          </div>

          <div className="p-5 border-b border-[#EAECF0] flex items-center justify-between gap-4">
            <div>
              <div className="text-[14px] font-medium text-[#171717]">Sign Out</div>
              <p className="text-[13px] text-[#78788D] mt-1">Sign out of this admin session.</p>
            </div>
            <button onClick={handleSignOut} disabled={isSigningOut} className="inline-flex items-center gap-2 px-4 py-2 rounded-[8px] border border-[#EAECF0] text-[13px] text-[#171717] hover:bg-[#F9FAFB] disabled:opacity-60">
              <LogOut className="w-4 h-4" />
              {isSigningOut ? "Signing out..." : "Sign Out"}
            </button>
          </div>

          <div className="p-5 flex items-center justify-between gap-4 bg-[#FFF7F7]">
            <div>
              <div className="text-[14px] font-medium text-[#B42318]">Deactivate Account</div>
              <p className="text-[13px] text-[#7A271A] mt-1">This will permanently delete your account and cannot be undone.</p>
            </div>
            <button onClick={handleDeactivate} disabled={isDeactivating} className="inline-flex items-center gap-2 px-4 py-2 rounded-[8px] border border-[#FECACA] text-[13px] text-[#B42318] hover:bg-[#FEF2F2] disabled:opacity-60">
              {isDeactivating ? <AlertTriangle className="w-4 h-4" /> : <Trash2 className="w-4 h-4" />}
              {isDeactivating ? "Deactivating..." : "Deactivate"}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
