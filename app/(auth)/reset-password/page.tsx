"use client";

import React, { useMemo, useState } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { Eye, EyeOff, CheckCircle2, ArrowLeft } from "lucide-react";

type ResetPasswordResponse = {
  success: boolean;
  data?: {
    success?: boolean;
  };
  error?: {
    message?: string;
  };
};

export default function ResetPasswordPage() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const token = useMemo(() => searchParams.get("token") ?? "", [searchParams]);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const hasMinLength = newPassword.length >= 8;
  const hasUppercase = /[A-Z]/.test(newPassword);
  const hasNumber = /[0-9]/.test(newPassword);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setErrorMessage(null);

    if (!token) {
      setErrorMessage("This reset link is invalid or missing.");
      return;
    }

    if (newPassword !== confirmPassword) {
      setErrorMessage("Passwords do not match.");
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await fetch("/api/auth/reset-password", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          token,
          newPassword,
          confirmPassword,
        }),
      });

      const payload = (await response.json()) as ResetPasswordResponse;

      if (!response.ok || !payload.success) {
        throw new Error(payload.error?.message ?? "Unable to reset password. Please request a new reset link.");
      }

      setIsSuccess(true);
    } catch (error) {
      setErrorMessage(
        error instanceof Error
          ? error.message
          : "Unable to reset password. Please request a new reset link."
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <style>{`
        .auth-root {
          display: flex;
          height: 100vh;
          width: 100%;
          overflow: hidden;
          background: #fff;
          font-family: sans-serif;
        }
        .auth-left {
          width: 544px;
          flex-shrink: 0;
          display: flex;
          flex-direction: column;
          padding: 40px 56px;
          overflow-y: auto;
        }
        .auth-right {
          flex: 1;
          display: flex;
          flex-direction: column;
          background: #F0F7FB;
          overflow: hidden;
          height: 100vh;
        }
        .auth-right-text {
          flex-shrink: 0;
          padding: 60px 56px 28px 100px;
        }
        .auth-right-image-wrapper {
          flex: 1;
          min-height: 0;
          padding-left: 100px;
        }
        .auth-right-image-card {
          height: 100%;
          border-top: 3px solid black;
          border-left: 3px solid black;
          border-radius: 14px 0 0 0;
          overflow: hidden;
          box-shadow: 0 8px 32px rgba(0,0,0,0.10);
          background: #fff;
        }
        .auth-right-image-card img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          object-position: left top;
        }
        .auth-input:focus {
          border-color: #00A0E3 !important;
          box-shadow: 0 0 0 3px rgba(0,160,227,0.12);
        }
        .btn-primary {
          width: 100%;
          padding: 13px;
          background: #00A0E3;
          border: none;
          border-radius: 8px;
          color: #fff;
          font-weight: 600;
          font-size: 14px;
          cursor: pointer;
          transition: background 0.15s;
        }
        .btn-primary:hover { background: #0090CF; }
        .btn-primary[disabled] {
          background: #7FCEF1;
          cursor: not-allowed;
        }
        .btn-secondary {
          width: 100%;
          padding: 13px;
          background: #fff;
          border: 1px solid #EAECF0;
          border-radius: 8px;
          color: #171717;
          font-weight: 600;
          font-size: 14px;
          cursor: pointer;
          transition: background 0.15s, border-color 0.15s;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
          text-decoration: none;
          box-sizing: border-box;
        }
        .btn-secondary:hover { background: #F8FAFB; border-color: #C8D0DA; }

        @media (max-width: 1100px) {
          .auth-left { width: 420px; padding: 36px 40px; }
          .auth-right-text { padding: 48px 40px 24px 64px; }
          .auth-right-image-wrapper { padding-left: 64px; }
        }
        @media (max-width: 768px) {
          .auth-root { height: auto; min-height: 100vh; overflow: auto; }
          .auth-left { width: 100%; max-width: 520px; margin: 0 auto; padding: 36px 32px; overflow-y: visible; }
          .auth-right { display: none; }
        }
        @media (max-width: 480px) {
          .auth-left { padding: 28px 20px; }
        }
      `}</style>

      <div className="auth-root">
        <div className="auth-left">
          <div style={{ marginBottom: "56px" }}>
            <img src="/logo.svg" alt="Submit Right" style={{ height: "32px", width: "auto" }} />
          </div>

          <div style={{ marginBottom: "32px" }}>
            <h1 style={{ fontSize: "28px", fontWeight: 700, color: "#171717", marginBottom: "8px", lineHeight: 1.2 }}>
              Reset Password
            </h1>
            <p style={{ fontSize: "15px", color: "#8A94A6", lineHeight: 1.6, maxWidth: "340px" }}>
              Create a new password for your account.
            </p>
          </div>

          {errorMessage ? (
            <div
              style={{
                marginBottom: "14px",
                padding: "10px 12px",
                borderRadius: "8px",
                border: "1px solid #FFD0D5",
                background: "#FFF4F6",
                color: "#B42318",
                fontSize: "13px",
                lineHeight: 1.5,
              }}
            >
              {errorMessage}
            </div>
          ) : null}

          {isSuccess ? (
            <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
              <div
                style={{
                  padding: "14px 16px",
                  borderRadius: "10px",
                  border: "1px solid #BAE0F5",
                  background: "#EBF6FD",
                  color: "#0C4A6E",
                  fontSize: "13px",
                  lineHeight: 1.6,
                }}
              >
                Your password has been reset successfully.
              </div>
              <button className="btn-primary" type="button" onClick={() => router.replace("/signin")}>
                Continue to Login
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
              <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
                <label style={{ fontSize: "13px", fontWeight: 500, color: "#171717" }}>New Password</label>
                <div style={{ position: "relative" }}>
                  <input
                    type={showPassword ? "text" : "password"}
                    placeholder="Enter your new password"
                    className="auth-input"
                    value={newPassword}
                    onChange={(event) => setNewPassword(event.target.value)}
                    autoComplete="new-password"
                    required
                    style={{
                      width: "100%",
                      padding: "12px 44px 12px 16px",
                      borderRadius: "8px",
                      border: "1px solid #EAECF0",
                      fontSize: "14px",
                      color: "#171717",
                      outline: "none",
                      background: "#fff",
                      boxSizing: "border-box",
                      transition: "border-color 0.15s, box-shadow 0.15s",
                    }}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    style={{
                      position: "absolute",
                      right: "14px",
                      top: "50%",
                      transform: "translateY(-50%)",
                      background: "none",
                      border: "none",
                      cursor: "pointer",
                      color: "#B0BAC8",
                      display: "flex",
                      alignItems: "center",
                      padding: 0,
                    }}
                  >
                    {showPassword ? <Eye width={17} height={17} /> : <EyeOff width={17} height={17} />}
                  </button>
                </div>
              </div>

              <div style={{ display: "flex", flexDirection: "column", gap: "8px", marginTop: "-4px" }}>
                {[
                  { label: "Minimum 8 characters", met: hasMinLength },
                  { label: "At least one uppercase letter", met: hasUppercase },
                  { label: "At least one number", met: hasNumber },
                ].map(({ label, met }) => (
                  <div key={label} style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                    <CheckCircle2
                      width={15}
                      height={15}
                      strokeWidth={2}
                      style={{ color: met ? "#00A0E3" : "#C0C7D0", flexShrink: 0 }}
                    />
                    <span style={{ fontSize: "12px", color: met ? "#525866" : "#8A94A6" }}>{label}</span>
                  </div>
                ))}
              </div>

              <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
                <label style={{ fontSize: "13px", fontWeight: 500, color: "#171717" }}>Confirm New Password</label>
                <div style={{ position: "relative" }}>
                  <input
                    type={showConfirmPassword ? "text" : "password"}
                    placeholder="Confirm your new password"
                    className="auth-input"
                    value={confirmPassword}
                    onChange={(event) => setConfirmPassword(event.target.value)}
                    autoComplete="new-password"
                    required
                    style={{
                      width: "100%",
                      padding: "12px 44px 12px 16px",
                      borderRadius: "8px",
                      border: "1px solid #EAECF0",
                      fontSize: "14px",
                      color: "#171717",
                      outline: "none",
                      background: "#fff",
                      boxSizing: "border-box",
                      transition: "border-color 0.15s, box-shadow 0.15s",
                    }}
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    style={{
                      position: "absolute",
                      right: "14px",
                      top: "50%",
                      transform: "translateY(-50%)",
                      background: "none",
                      border: "none",
                      cursor: "pointer",
                      color: "#B0BAC8",
                      display: "flex",
                      alignItems: "center",
                      padding: 0,
                    }}
                  >
                    {showConfirmPassword ? <Eye width={17} height={17} /> : <EyeOff width={17} height={17} />}
                  </button>
                </div>
              </div>

              <button className="btn-primary" type="submit" disabled={isSubmitting || !token}>
                {isSubmitting ? "Resetting Password..." : "Reset Password"}
              </button>

              <Link href="/forgot-password" className="btn-secondary">
                <ArrowLeft width={15} height={15} />
                Request New Reset Link
              </Link>
            </form>
          )}
        </div>

        <div className="auth-right">
          <div className="auth-right-text">
            <h2 style={{ fontSize: "28px", fontWeight: 700, color: "#171717", marginBottom: "12px", lineHeight: 1.2 }}>
              Lorem ipsum dolor sit
            </h2>
            <p style={{ fontSize: "15px", color: "#8A94A6", lineHeight: 1.7, maxWidth: "520px" }}>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor.
              amet, consectetur adipiscing elit, sed do eiusmod tempor.
            </p>
          </div>
          <div className="auth-right-image-wrapper">
            <div className="auth-right-image-card">
              <img src="/images/signin.jpg" alt="Dashboard Preview" />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
