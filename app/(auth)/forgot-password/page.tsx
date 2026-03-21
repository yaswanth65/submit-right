"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Eye, EyeOff, CheckCircle2, Info, ArrowLeft } from "lucide-react";

type Screen = "forgot" | "reset";

export default function ForgotPasswordPage() {
  const [screen, setScreen] = useState<Screen>("forgot");

  // Forgot password state
  const [email, setEmail] = useState("");

  // Reset password state
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [password, setPassword] = useState("");

  const hasMinLength = password.length >= 8;
  const hasUppercase = /[A-Z]/.test(password);
  const hasNumber = /[0-9]/.test(password);

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

        /* Screen transition */
        .screen { animation: fadeSlide 0.25s ease; }
        @keyframes fadeSlide {
          from { opacity: 0; transform: translateX(16px); }
          to   { opacity: 1; transform: translateX(0); }
        }

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

        {/* ===================== LEFT ===================== */}
        <div className="auth-left">

          {/* Logo */}
          <div style={{ marginBottom: "56px" }}>
            <img src="/logo.svg" alt="Submit Right" style={{ height: "32px", width: "auto" }} />
          </div>

          {/* ── SCREEN: FORGOT PASSWORD ── */}
          {screen === "forgot" && (
            <div className="screen" style={{ display: "flex", flexDirection: "column", flex: 1 }}>

              <div style={{ marginBottom: "32px" }}>
                <h1 style={{ fontSize: "28px", fontWeight: 700, color: "#171717", marginBottom: "8px", lineHeight: 1.2 }}>
                  Forgot Password
                </h1>
                <p style={{ fontSize: "15px", color: "#8A94A6", lineHeight: 1.6, maxWidth: "340px" }}>
                  Enter your email address and we'll send you a reset link.
                </p>
              </div>

              <div style={{ display: "flex", flexDirection: "column", gap: "18px" }}>

                {/* Email */}
                <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
                  <label style={{ fontSize: "13px", fontWeight: 500, color: "#171717" }}>Email Address</label>
                  <input
                    type="email"
                    placeholder="Enter your email address"
                    className="auth-input"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    style={{
                      padding: "12px 16px", borderRadius: "8px", border: "1px solid #EAECF0",
                      fontSize: "14px", color: "#171717", outline: "none", background: "#fff",
                      transition: "border-color 0.15s, box-shadow 0.15s", width: "100%", boxSizing: "border-box",
                    }}
                  />
                </div>

                {/* Info Banner */}
                <div style={{
                  display: "flex", alignItems: "flex-start", gap: "12px",
                  padding: "14px 16px", borderRadius: "10px",
                  border: "1px solid #BAE0F5", background: "#EBF6FD",
                }}>
                  <div style={{
                    width: "28px", height: "28px", borderRadius: "50%",
                    background: "#00A0E3", display: "flex", alignItems: "center",
                    justifyContent: "center", flexShrink: 0, marginTop: "1px",
                  }}>
                    <Info width={15} height={15} color="#fff" strokeWidth={2.5} />
                  </div>
                  <p style={{ fontSize: "13px", color: "#525866", lineHeight: 1.6, margin: 0 }}>
                    If an account exists, a reset link has been sent to your inbox. Please check your spam folder as well.
                  </p>
                </div>

                {/* Send Reset Link */}
                <button
                  className="btn-primary"
                  onClick={() => setScreen("reset")}
                >
                  Send Reset Link
                </button>

                {/* Back to Login */}
                <Link href="/signin" className="btn-secondary">
                  Back to Login
                </Link>

              </div>
            </div>
          )}

          {/* ── SCREEN: RESET PASSWORD ── */}
          {screen === "reset" && (
            <div className="screen" style={{ display: "flex", flexDirection: "column", flex: 1 }}>

              <div style={{ marginBottom: "32px" }}>
                <h1 style={{ fontSize: "28px", fontWeight: 700, color: "#171717", marginBottom: "8px", lineHeight: 1.2 }}>
                  Reset Password
                </h1>
                <p style={{ fontSize: "15px", color: "#8A94A6", lineHeight: 1.6 }}>
                  Create a new password for your account.
                </p>
              </div>

              <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>

                {/* New Password */}
                <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
                  <label style={{ fontSize: "13px", fontWeight: 500, color: "#171717" }}>New Password</label>
                  <div style={{ position: "relative" }}>
                    <input
                      type={showPassword ? "text" : "password"}
                      placeholder="Enter your new password"
                      className="auth-input"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      style={{
                        width: "100%", padding: "12px 44px 12px 16px", borderRadius: "8px",
                        border: "1px solid #EAECF0", fontSize: "14px", color: "#171717", outline: "none",
                        background: "#fff", boxSizing: "border-box", transition: "border-color 0.15s, box-shadow 0.15s",
                      }}
                    />
                    <button type="button" onClick={() => setShowPassword(!showPassword)}
                      style={{ position: "absolute", right: "14px", top: "50%", transform: "translateY(-50%)", background: "none", border: "none", cursor: "pointer", color: "#B0BAC8", display: "flex", alignItems: "center", padding: 0 }}>
                      {showPassword ? <Eye width={17} height={17} /> : <EyeOff width={17} height={17} />}
                    </button>
                  </div>
                </div>

                {/* Password Validations */}
                <div style={{ display: "flex", flexDirection: "column", gap: "8px", marginTop: "-4px" }}>
                  {[
                    { label: "Minimum 8 characters", met: hasMinLength },
                    { label: "At least one uppercase letter", met: hasUppercase },
                    { label: "At least one number", met: hasNumber },
                  ].map(({ label, met }) => (
                    <div key={label} style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                      <CheckCircle2 width={15} height={15} strokeWidth={2} style={{ color: met ? "#00A0E3" : "#C0C7D0", flexShrink: 0 }} />
                      <span style={{ fontSize: "12px", color: met ? "#525866" : "#8A94A6" }}>{label}</span>
                    </div>
                  ))}
                </div>

                {/* Confirm New Password */}
                <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
                  <label style={{ fontSize: "13px", fontWeight: 500, color: "#171717" }}>Confirm New Password</label>
                  <div style={{ position: "relative" }}>
                    <input
                      type={showConfirmPassword ? "text" : "password"}
                      placeholder="Confirm your new password"
                      className="auth-input"
                      style={{
                        width: "100%", padding: "12px 44px 12px 16px", borderRadius: "8px",
                        border: "1px solid #EAECF0", fontSize: "14px", color: "#171717", outline: "none",
                        background: "#fff", boxSizing: "border-box", transition: "border-color 0.15s, box-shadow 0.15s",
                      }}
                    />
                    <button type="button" onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                      style={{ position: "absolute", right: "14px", top: "50%", transform: "translateY(-50%)", background: "none", border: "none", cursor: "pointer", color: "#B0BAC8", display: "flex", alignItems: "center", padding: 0 }}>
                      {showConfirmPassword ? <Eye width={17} height={17} /> : <EyeOff width={17} height={17} />}
                    </button>
                  </div>
                </div>

                {/* Reset Password Button */}
                <button className="btn-primary" style={{ marginTop: "4px" }}>
                  Reset Password
                </button>

                {/* Back to Login */}
                <button
                  className="btn-secondary"
                  onClick={() => setScreen("forgot")}
                >
                  <ArrowLeft width={15} height={15} />
                  Back to Login
                </button>

              </div>
            </div>
          )}

        </div>

        {/* ===================== RIGHT PANEL ===================== */}
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