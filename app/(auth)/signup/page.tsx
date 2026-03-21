// // "use client";

// // import React, { useState } from "react";
// // import Link from "next/link";
// // import { Eye, EyeOff, CheckCircle2, Circle } from "lucide-react";

// // export default function SignUpPage() {
// //   const [agreementChecked, setAgreementChecked] = useState(false);
// //   const [showPassword, setShowPassword] = useState(false);
// //   const [showConfirmPassword, setShowConfirmPassword] = useState(false);
// //   const [password, setPassword] = useState("");

// //   const hasMinLength = password.length >= 8;
// //   const hasUppercase = /[A-Z]/.test(password);
// //   const hasNumber = /[0-9]/.test(password);

// //   return (
// //     <div className="flex h-screen w-full font-sans bg-white overflow-hidden">

// //       {/* =========================================================
// //           LEFT COLUMN: SIGNUP FORM
// //           ========================================================= */}
// //       <div
// //         className="flex flex-col py-10 overflow-y-auto shrink-0 h-full"
// //         style={{ width: "480px", paddingLeft: "56px", paddingRight: "56px" }}
// //       >
// //         {/* Logo */}
// //         <div className="mb-14 mt-2">
// //           <img src="/logo.svg" alt="Submit Right Logo" className="h-8 w-auto" />
// //         </div>

// //         {/* Form Container */}
// //         <div className="w-full flex flex-col flex-1">

// //           {/* Header */}
// //           <div className="mb-7">
// //             <h1 className="text-[28px] font-bold text-[#171717] mb-2 tracking-tight leading-tight">
// //               Create Account
// //             </h1>
// //             <p className="text-[#8A94A6] text-[15px] leading-relaxed">
// //               Sign up to submit and manage your documents.
// //             </p>
// //           </div>

// //           {/* Form */}
// //           <div className="flex flex-col gap-4">

// //             {/* Full Name */}
// //             <div className="flex flex-col gap-1.5">
// //               <label className="text-[13px] font-medium text-[#171717]">Full Name</label>
// //               <input
// //                 type="text"
// //                 placeholder="Enter your full name"
// //                 className="px-4 py-3 rounded-lg border border-[#EAECF0] text-[14px] text-[#171717] placeholder:text-[#C0C7D0] focus:outline-none focus:border-[#00A0E3] transition-colors bg-white"
// //               />
// //             </div>

// //             {/* Email */}
// //             <div className="flex flex-col gap-1.5">
// //               <label className="text-[13px] font-medium text-[#171717]">Email</label>
// //               <input
// //                 type="email"
// //                 placeholder="Enter your email"
// //                 className="px-4 py-3 rounded-lg border border-[#EAECF0] text-[14px] text-[#171717] placeholder:text-[#C0C7D0] focus:outline-none focus:border-[#00A0E3] transition-colors bg-white"
// //               />
// //             </div>

// //             {/* Password */}
// //             <div className="flex flex-col gap-1.5">
// //               <label className="text-[13px] font-medium text-[#171717]">Password</label>
// //               <div className="relative">
// //                 <input
// //                   type={showPassword ? "text" : "password"}
// //                   placeholder="Enter your password"
// //                   value={password}
// //                   onChange={(e) => setPassword(e.target.value)}
// //                   className="w-full px-4 py-3 pr-11 rounded-lg border border-[#EAECF0] text-[14px] text-[#171717] placeholder:text-[#C0C7D0] focus:outline-none focus:border-[#00A0E3] transition-colors bg-white"
// //                 />
// //                 <button
// //                   type="button"
// //                   onClick={() => setShowPassword(!showPassword)}
// //                   className="absolute right-3.5 top-1/2 -translate-y-1/2 text-[#B0BAC8] hover:text-[#525866] transition-colors"
// //                 >
// //                   {showPassword
// //                     ? <Eye className="w-[17px] h-[17px]" strokeWidth={2} />
// //                     : <EyeOff className="w-[17px] h-[17px]" strokeWidth={2} />
// //                   }
// //                 </button>
// //               </div>
// //             </div>

// //             {/* Password Validations */}
// //             <div className="flex flex-col gap-2 -mt-1">
// //               {[
// //                 { label: "Minimum 8 characters", met: hasMinLength },
// //                 { label: "At least one uppercase letter", met: hasUppercase },
// //                 { label: "At least one number", met: hasNumber },
// //               ].map(({ label, met }) => (
// //                 <div key={label} className="flex items-center gap-2">
// //                   {met
// //                     ? <CheckCircle2 className="w-[15px] h-[15px] text-[#00A0E3] shrink-0" strokeWidth={2} />
// //                     : <CheckCircle2 className="w-[15px] h-[15px] text-[#C0C7D0] shrink-0" strokeWidth={2} />
// //                   }
// //                   <span className={`text-[12px] ${met ? "text-[#525866]" : "text-[#8A94A6]"}`}>{label}</span>
// //                 </div>
// //               ))}
// //             </div>

// //             {/* Confirm Password */}
// //             <div className="flex flex-col gap-1.5">
// //               <label className="text-[13px] font-medium text-[#171717]">Confirm Password</label>
// //               <div className="relative">
// //                 <input
// //                   type={showConfirmPassword ? "text" : "password"}
// //                   placeholder="Enter your confirm password"
// //                   className="w-full px-4 py-3 pr-11 rounded-lg border border-[#EAECF0] text-[14px] text-[#171717] placeholder:text-[#C0C7D0] focus:outline-none focus:border-[#00A0E3] transition-colors bg-white"
// //                 />
// //                 <button
// //                   type="button"
// //                   onClick={() => setShowConfirmPassword(!showConfirmPassword)}
// //                   className="absolute right-3.5 top-1/2 -translate-y-1/2 text-[#B0BAC8] hover:text-[#525866] transition-colors"
// //                 >
// //                   {showConfirmPassword
// //                     ? <Eye className="w-[17px] h-[17px]" strokeWidth={2} />
// //                     : <EyeOff className="w-[17px] h-[17px]" strokeWidth={2} />
// //                   }
// //                 </button>
// //               </div>
// //             </div>

// //             {/* Consent Checkbox */}
// //             <div className="flex items-start gap-3 mt-1">
// //               <div className="flex items-center shrink-0 mt-[2px]">
// //                 <input
// //                   type="checkbox"
// //                   id="agreement"
// //                   checked={agreementChecked}
// //                   onChange={(e) => setAgreementChecked(e.target.checked)}
// //                   className="w-[16px] h-[16px] rounded border-[#EAECF0] cursor-pointer accent-[#00A0E3]"
// //                 />
// //               </div>
// //               <label htmlFor="agreement" className="text-[13px] text-[#171717] cursor-pointer leading-relaxed">
// //                 I agree to the{" "}
// //                 <Link href="/terms" className="text-[#00A0E3] font-medium hover:underline">
// //                   Terms of Service
// //                 </Link>
// //                 {" "}and{" "}
// //                 <Link href="/privacy" className="text-[#00A0E3] font-medium hover:underline">
// //                   Privacy Policy
// //                 </Link>
// //                 .
// //               </label>
// //             </div>

// //             {/* Create Account Button */}
// //             <button
// //               disabled={!agreementChecked}
// //               className="w-full py-3 bg-[#00A0E3] hover:bg-[#0090CF] disabled:opacity-50 disabled:cursor-not-allowed text-white font-semibold rounded-lg text-[14px] transition-colors mt-1"
// //             >
// //               Create Account
// //             </button>

// //           </div>

// //           {/* Switch to Login */}
// //           <div className="mt-auto pt-10 pb-4 text-center text-[13px] text-[#8A94A6]">
// //             Already have an account?{" "}
// //             <Link href="/login" className="font-semibold text-[#00A0E3] hover:underline">
// //               Login
// //             </Link>
// //           </div>
// //         </div>
// //       </div>

// //       {/* =========================================================
// //           RIGHT COLUMN: GRAPHIC PRESENTATION
// //           ========================================================= */}
// //       <div className="flex-1 relative bg-[#F0F7FB] h-full overflow-hidden">

// //         {/* Text Content — sits ~10% from top */}
// //         <div className="absolute left-0 px-14 z-10" style={{ top: "10%" }}>
// //           <h2 className="text-[28px] font-bold text-[#171717] mb-3 tracking-tight">
// //             Lorem ipsum dolor sit
// //           </h2>
// //           <p className="text-[#8A94A6] text-[15px] max-w-[520px] leading-relaxed">
// //             Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor.{" "}
// //             amet, consectetur adipiscing elit, sed do eiusmod tempor.
// //           </p>
// //         </div>

// //         {/* Dashboard Image — starts ~38% down, left margin, bleeds right & bottom */}
// //         <div
// //           className="absolute overflow-hidden rounded-tl-[16px] shadow-2xl"
// //           style={{
// //             top: "25%",
// //             left: "10%",
// //             right: "-2px",
// //             bottom: "-2px",
// //             borderTop: "1.5px solid #C8D8E8",
// //             borderLeft: "1.5px solid #C8D8E8",
// //           }}
// //         >
// //           <img
// //             src="/images/signup.jpg"
// //             alt="Dashboard Preview"
// //             style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "left top" }}
// //           />
// //         </div>

// //       </div>

// //     </div>
// //   );
// // }
// "use client";

// import React, { useState } from "react";
// import Link from "next/link";
// import { Eye, EyeOff, CheckCircle2 } from "lucide-react";

// export default function SignUpPage() {
//   const [agreementChecked, setAgreementChecked] = useState(false);
//   const [showPassword, setShowPassword] = useState(false);
//   const [showConfirmPassword, setShowConfirmPassword] = useState(false);
//   const [password, setPassword] = useState("");

//   const hasMinLength = password.length >= 8;
//   const hasUppercase = /[A-Z]/.test(password);
//   const hasNumber = /[0-9]/.test(password);

//   return (
//     <div className="flex h-screen w-full font-sans bg-white overflow-hidden">

//       {/* =========================================================
//           LEFT COLUMN: SIGNUP FORM
//           ========================================================= */}
//       <div
//         className="flex flex-col py-10 overflow-y-auto shrink-0 h-full"
//         style={{ width: "480px", paddingLeft: "56px", paddingRight: "56px" }}
//       >
//         {/* Logo */}
//         <div className="mb-14 mt-2">
//           <img src="/logo.svg" alt="Submit Right Logo" className="h-8 w-auto" />
//         </div>

//         {/* Form Container */}
//         <div className="w-full flex flex-col flex-1">

//           {/* Header */}
//           <div className="mb-7">
//             <h1 className="text-[28px] font-bold text-[#171717] mb-2 tracking-tight leading-tight">
//               Create Account
//             </h1>
//             <p className="text-[#8A94A6] text-[15px] leading-relaxed">
//               Sign up to submit and manage your documents.
//             </p>
//           </div>

//           {/* Form */}
//           <div className="flex flex-col gap-4">

//             {/* Full Name */}
//             <div className="flex flex-col gap-1.5">
//               <label className="text-[13px] font-medium text-[#171717]">Full Name</label>
//               <input
//                 type="text"
//                 placeholder="Enter your full name"
//                 className="px-4 py-3 rounded-lg border border-[#EAECF0] text-[14px] text-[#171717] placeholder:text-[#C0C7D0] focus:outline-none focus:border-[#00A0E3] transition-colors bg-white"
//               />
//             </div>

//             {/* Email */}
//             <div className="flex flex-col gap-1.5">
//               <label className="text-[13px] font-medium text-[#171717]">Email</label>
//               <input
//                 type="email"
//                 placeholder="Enter your email"
//                 className="px-4 py-3 rounded-lg border border-[#EAECF0] text-[14px] text-[#171717] placeholder:text-[#C0C7D0] focus:outline-none focus:border-[#00A0E3] transition-colors bg-white"
//               />
//             </div>

//             {/* Password */}
//             <div className="flex flex-col gap-1.5">
//               <label className="text-[13px] font-medium text-[#171717]">Password</label>
//               <div className="relative">
//                 <input
//                   type={showPassword ? "text" : "password"}
//                   placeholder="Enter your password"
//                   value={password}
//                   onChange={(e) => setPassword(e.target.value)}
//                   className="w-full px-4 py-3 pr-11 rounded-lg border border-[#EAECF0] text-[14px] text-[#171717] placeholder:text-[#C0C7D0] focus:outline-none focus:border-[#00A0E3] transition-colors bg-white"
//                 />
//                 <button
//                   type="button"
//                   onClick={() => setShowPassword(!showPassword)}
//                   className="absolute right-3.5 top-1/2 -translate-y-1/2 text-[#B0BAC8] hover:text-[#525866] transition-colors"
//                 >
//                   {showPassword
//                     ? <Eye className="w-[17px] h-[17px]" strokeWidth={2} />
//                     : <EyeOff className="w-[17px] h-[17px]" strokeWidth={2} />
//                   }
//                 </button>
//               </div>
//             </div>

//             {/* Password Validations */}
//             <div className="flex flex-col gap-2 -mt-1">
//               {[
//                 { label: "Minimum 8 characters", met: hasMinLength },
//                 { label: "At least one uppercase letter", met: hasUppercase },
//                 { label: "At least one number", met: hasNumber },
//               ].map(({ label, met }) => (
//                 <div key={label} className="flex items-center gap-2">
//                   {met
//                     ? <CheckCircle2 className="w-[15px] h-[15px] text-[#00A0E3] shrink-0" strokeWidth={2} />
//                     : <CheckCircle2 className="w-[15px] h-[15px] text-[#C0C7D0] shrink-0" strokeWidth={2} />
//                   }
//                   <span className={`text-[12px] ${met ? "text-[#525866]" : "text-[#8A94A6]"}`}>{label}</span>
//                 </div>
//               ))}
//             </div>

//             {/* Confirm Password */}
//             <div className="flex flex-col gap-1.5">
//               <label className="text-[13px] font-medium text-[#171717]">Confirm Password</label>
//               <div className="relative">
//                 <input
//                   type={showConfirmPassword ? "text" : "password"}
//                   placeholder="Enter your confirm password"
//                   className="w-full px-4 py-3 pr-11 rounded-lg border border-[#EAECF0] text-[14px] text-[#171717] placeholder:text-[#C0C7D0] focus:outline-none focus:border-[#00A0E3] transition-colors bg-white"
//                 />
//                 <button
//                   type="button"
//                   onClick={() => setShowConfirmPassword(!showConfirmPassword)}
//                   className="absolute right-3.5 top-1/2 -translate-y-1/2 text-[#B0BAC8] hover:text-[#525866] transition-colors"
//                 >
//                   {showConfirmPassword
//                     ? <Eye className="w-[17px] h-[17px]" strokeWidth={2} />
//                     : <EyeOff className="w-[17px] h-[17px]" strokeWidth={2} />
//                   }
//                 </button>
//               </div>
//             </div>

//             {/* Consent Checkbox */}
//             <div className="flex items-start gap-3 mt-1">
//               <div className="flex items-center shrink-0 mt-[2px]">
//                 <input
//                   type="checkbox"
//                   id="agreement"
//                   checked={agreementChecked}
//                   onChange={(e) => setAgreementChecked(e.target.checked)}
//                   className="w-[16px] h-[16px] rounded border-[#EAECF0] cursor-pointer accent-[#00A0E3]"
//                 />
//               </div>
//               <label htmlFor="agreement" className="text-[13px] text-[#171717] cursor-pointer leading-relaxed">
//                 I agree to the{" "}
//                 <Link href="/terms" className="text-[#00A0E3] font-medium hover:underline">
//                   Terms of Service
//                 </Link>
//                 {" "}and{" "}
//                 <Link href="/privacy" className="text-[#00A0E3] font-medium hover:underline">
//                   Privacy Policy
//                 </Link>
//                 .
//               </label>
//             </div>

//             {/* Create Account Button */}
//             <button
//               disabled={!agreementChecked}
//               className="w-full py-3 bg-[#00A0E3] hover:bg-[#0090CF] disabled:opacity-50 disabled:cursor-not-allowed text-white font-semibold rounded-lg text-[14px] transition-colors mt-1"
//             >
//               Create Account
//             </button>

//           </div>

//           {/* Switch to Login */}
//           <div className="mt-auto pt-10 pb-4 text-center text-[13px] text-[#8A94A6]">
//             Already have an account?{" "}
//             <Link href="/login" className="font-semibold text-[#00A0E3] hover:underline">
//               Login
//             </Link>
//           </div>
//         </div>
//       </div>

//       {/* =========================================================
//           RIGHT COLUMN: GRAPHIC PRESENTATION
//           ========================================================= */}
//       <div className="flex-1 flex flex-col bg-[#F0F7FB] h-full overflow-hidden">
        
//         {/* Text Content — Pushed right */}
//         <div className="shrink-0 pt-16 pb-8 pl-24 pr-10">
//           <h2 className="text-[28px] font-bold text-[#171717] mb-3 tracking-tight">
//             Lorem ipsum dolor sit
//           </h2>
//           <p className="text-[#8A94A6] text-[15px] max-w-[560px] leading-relaxed">
//             Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor.{" "}
//             amet, consectetur adipiscing elit, sed do eiusmod tempor.
//           </p>
//         </div>

//         {/* Dashboard Image — Pushed bottom-right */}
//         <div className="flex-1 relative min-h-0 ml-24 mt-8">
//           <div className="absolute inset-0 rounded-tl-2xl overflow-hidden shadow-xl border-t border-l border-[#D8E8F0] bg-white">
//             <img
//               src="/images/signup.jpg"
//               alt="Dashboard Preview"
//               className="w-[50%] h-full object-fit "
//             />
//           </div>
//         </div>

//       </div>

//     </div>
//   );
// }

// "use client";

// import React, { useState } from "react";
// import Link from "next/link";
// import { Eye, EyeOff, CheckCircle2 } from "lucide-react";

// export default function SignUpPage() {
//   const [agreementChecked, setAgreementChecked] = useState(false);
//   const [showPassword, setShowPassword] = useState(false);
//   const [showConfirmPassword, setShowConfirmPassword] = useState(false);
//   const [password, setPassword] = useState("");

//   const hasMinLength = password.length >= 8;
//   const hasUppercase = /[A-Z]/.test(password);
//   const hasNumber = /[0-9]/.test(password);

//   return (
//     <div style={{ display: "flex", height: "100vh", width: "100%", overflow: "hidden", background: "#fff", fontFamily: "sans-serif" }}>

//       {/* ===================== LEFT: FORM ===================== */}
//       <div style={{ width: "544px", flexShrink: 0, display: "flex", flexDirection: "column", padding: "40px 56px", overflowY: "auto" }}>

//         {/* Logo */}
//         <div style={{ marginBottom: "48px" }}>
//           <img src="/logo.svg" alt="Submit Right" style={{ height: "32px", width: "auto" }} />
//         </div>

//         {/* Heading */}
//         <div style={{ marginBottom: "28px" }}>
//           <h1 style={{ fontSize: "28px", fontWeight: 700, color: "#171717", marginBottom: "8px", lineHeight: 1.2 }}>Create Account</h1>
//           <p style={{ fontSize: "15px", color: "#8A94A6", lineHeight: 1.6 }}>Sign up to submit and manage your documents.</p>
//         </div>

//         {/* Fields */}
//         <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>

//           {/* Full Name */}
//           <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
//             <label style={{ fontSize: "13px", fontWeight: 500, color: "#171717" }}>Full Name</label>
//             <input type="text" placeholder="Enter your full name"
//               style={{ padding: "12px 16px", borderRadius: "8px", border: "1px solid #EAECF0", fontSize: "14px", color: "#171717", outline: "none", background: "#fff" }} />
//           </div>

//           {/* Email */}
//           <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
//             <label style={{ fontSize: "13px", fontWeight: 500, color: "#171717" }}>Email</label>
//             <input type="email" placeholder="Enter your email"
//               style={{ padding: "12px 16px", borderRadius: "8px", border: "1px solid #EAECF0", fontSize: "14px", color: "#171717", outline: "none", background: "#fff" }} />
//           </div>

//           {/* Password */}
//           <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
//             <label style={{ fontSize: "13px", fontWeight: 500, color: "#171717" }}>Password</label>
//             <div style={{ position: "relative" }}>
//               <input type={showPassword ? "text" : "password"} placeholder="Enter your password"
//                 value={password} onChange={(e) => setPassword(e.target.value)}
//                 style={{ width: "100%", padding: "12px 44px 12px 16px", borderRadius: "8px", border: "1px solid #EAECF0", fontSize: "14px", color: "#171717", outline: "none", background: "#fff", boxSizing: "border-box" }} />
//               <button type="button" onClick={() => setShowPassword(!showPassword)}
//                 style={{ position: "absolute", right: "14px", top: "50%", transform: "translateY(-50%)", background: "none", border: "none", cursor: "pointer", color: "#B0BAC8", display: "flex", alignItems: "center" }}>
//                 {showPassword ? <Eye width={17} height={17} /> : <EyeOff width={17} height={17} />}
//               </button>
//             </div>
//           </div>

//           {/* Password Validations */}
//           <div style={{ display: "flex", flexDirection: "column", gap: "8px", marginTop: "-4px" }}>
//             {[
//               { label: "Minimum 8 characters", met: hasMinLength },
//               { label: "At least one uppercase letter", met: hasUppercase },
//               { label: "At least one number", met: hasNumber },
//             ].map(({ label, met }) => (
//               <div key={label} style={{ display: "flex", alignItems: "center", gap: "8px" }}>
//                 <CheckCircle2 width={15} height={15} strokeWidth={2} style={{ color: met ? "#00A0E3" : "#C0C7D0", flexShrink: 0 }} />
//                 <span style={{ fontSize: "12px", color: met ? "#525866" : "#8A94A6" }}>{label}</span>
//               </div>
//             ))}
//           </div>

//           {/* Confirm Password */}
//           <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
//             <label style={{ fontSize: "13px", fontWeight: 500, color: "#171717" }}>Confirm Password</label>
//             <div style={{ position: "relative" }}>
//               <input type={showConfirmPassword ? "text" : "password"} placeholder="Enter your confirm password"
//                 style={{ width: "100%", padding: "12px 44px 12px 16px", borderRadius: "8px", border: "1px solid #EAECF0", fontSize: "14px", color: "#171717", outline: "none", background: "#fff", boxSizing: "border-box" }} />
//               <button type="button" onClick={() => setShowConfirmPassword(!showConfirmPassword)}
//                 style={{ position: "absolute", right: "14px", top: "50%", transform: "translateY(-50%)", background: "none", border: "none", cursor: "pointer", color: "#B0BAC8", display: "flex", alignItems: "center" }}>
//                 {showConfirmPassword ? <Eye width={17} height={17} /> : <EyeOff width={17} height={17} />}
//               </button>
//             </div>
//           </div>

//           {/* Checkbox */}
//           <div style={{ display: "flex", alignItems: "flex-start", gap: "10px", marginTop: "4px" }}>
//             <input type="checkbox" id="agreement" checked={agreementChecked} onChange={(e) => setAgreementChecked(e.target.checked)}
//               style={{ width: "16px", height: "16px", marginTop: "2px", flexShrink: 0, accentColor: "#00A0E3", cursor: "pointer" }} />
//             <label htmlFor="agreement" style={{ fontSize: "13px", color: "#171717", cursor: "pointer", lineHeight: 1.6 }}>
//               I agree to the{" "}
//               <Link href="/terms" style={{ color: "#00A0E3", fontWeight: 500, textDecoration: "none" }}>Terms of Service</Link>
//               {" "}and{" "}
//               <Link href="/privacy" style={{ color: "#00A0E3", fontWeight: 500, textDecoration: "none" }}>Privacy Policy</Link>.
//             </label>
//           </div>

//           {/* Button */}
//           <button disabled={!agreementChecked}
//             style={{ width: "100%", padding: "13px", background: agreementChecked ? "#00A0E3" : "#7FCEF1", border: "none", borderRadius: "8px", color: "#fff", fontWeight: 600, fontSize: "14px", cursor: agreementChecked ? "pointer" : "not-allowed", marginTop: "4px" }}>
//             Create Account
//           </button>
//         </div>

//         {/* Login link */}
//         <div style={{ marginTop: "auto", paddingTop: "32px", textAlign: "center", fontSize: "13px", color: "#8A94A6" }}>
//           Already have an account?{" "}
//           <Link href="/login" style={{ color: "#00A0E3", fontWeight: 600, textDecoration: "none" }}>Login</Link>
//         </div>
//       </div>

//       {/* ===================== RIGHT: PANEL ===================== */}
//       {/*
//         Layout logic (matching the design exactly):
//         - Blue #F0F7FB background fills the entire right column
//         - Text sits at top with 60px top padding, 56px left padding
//         - Image container starts BELOW the text block, with 56px left margin
//         - Image bleeds to the right edge and bottom edge (no padding right/bottom)
//         - Only top-left corner is rounded on the image card
//       */}
//       <div style={{ flex: 1, display: "flex", flexDirection: "column", background: "#F0F7FB", overflow: "hidden", height: "100vh" }}>

//         {/* Text block — fixed, does not grow */}
//         <div style={{ flexShrink: 0, paddingTop: "60px", paddingBottom: "28px", paddingLeft: "100px", paddingRight: "56px" }}>
//           <h2 style={{ fontSize: "28px", fontWeight: 700, color: "#171717", marginBottom: "12px", lineHeight: 1.2 }}>
//             Lorem ipsum dolor sit
//           </h2>
//           <p style={{ fontSize: "15px", color: "#8A94A6", lineHeight: 1.7, maxWidth: "520px" }}>
//             Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor.
//             amet, consectetur adipiscing elit, sed do eiusmod tempor.
//           </p>
//         </div>

//         {/* Image block — grows to fill remaining height */}
//         <div style={{ flex: 1, minHeight: 0, paddingLeft: "100px" }}>
//           {/*
//             The image card:
//             - starts right where the text ends (flex child, no absolute positioning)
//             - left edge = 56px from right panel edge (same as text)
//             - right edge = 0 (bleeds to viewport right)
//             - bottom = 0 (bleeds to viewport bottom)
//             - only top-left corner rounded
//           */}
//           <div  style={{
//             height: "100%",
//             borderTop: "3px solid black",
//             borderLeft: "3px solid black",
//             borderRadius: "14px 0 0 0",
//             overflow: "hidden",
//             boxShadow: "0 8px 32px rgba(0,0,0,0.10)",
//             background: "#fff",
//           }}>
//             <img
//               src="/images/signin.jpg"
//               alt="Dashboard Preview"
//               style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "left top" }}
//             />
//           </div>
//         </div>

//       </div>

//     </div>
//   );
// }
"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Eye, EyeOff, CheckCircle2 } from "lucide-react";

export default function SignUpPage() {
  const [agreementChecked, setAgreementChecked] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [password, setPassword] = useState("");

  const hasMinLength = password.length >= 8;
  const hasUppercase = /[A-Z]/.test(password);
  const hasNumber = /[0-9]/.test(password);

  return (
    <>
      <style>{`
        .signup-root {
          display: flex;
          height: 100vh;
          width: 100%;
          overflow: hidden;
          background: #fff;
          font-family: sans-serif;
        }

        /* LEFT COLUMN */
        .signup-left {
          width: 544px;
          flex-shrink: 0;
          display: flex;
          flex-direction: column;
          padding: 40px 56px;
          overflow-y: auto;
        }

        /* RIGHT COLUMN */
        .signup-right {
          flex: 1;
          display: flex;
          flex-direction: column;
          background: #F0F7FB;
          overflow: hidden;
          height: 100vh;
        }

        .signup-right-text {
          flex-shrink: 0;
          padding: 60px 56px 28px 100px;
        }

        .signup-right-image-wrapper {
          flex: 1;
          min-height: 0;
          padding-left: 100px;
        }

        .signup-right-image-card {
          height: 100%;
          border-top: 3px solid black;
          border-left: 3px solid black;
          border-radius: 14px 0 0 0;
          overflow: hidden;
          box-shadow: 0 8px 32px rgba(0,0,0,0.10);
          background: #fff;
        }

        .signup-right-image-card img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          object-position: left top;
        }

        /* ── TABLET: 768px–1100px — shrink left, shrink right text padding ── */
        @media (max-width: 1100px) {
          .signup-left {
            width: 420px;
            padding: 36px 40px;
          }
          .signup-right-text {
            padding: 48px 40px 24px 64px;
          }
          .signup-right-image-wrapper {
            padding-left: 64px;
          }
        }

        /* ── SMALL TABLET: hide right panel, center form ── */
        @media (max-width: 768px) {
          .signup-root {
            height: auto;
            min-height: 100vh;
            overflow: auto;
          }
          .signup-left {
            width: 100%;
            max-width: 520px;
            margin: 0 auto;
            padding: 36px 32px;
            overflow-y: visible;
          }
          .signup-right {
            display: none;
          }
        }

        /* ── MOBILE: tighter padding ── */
        @media (max-width: 480px) {
          .signup-left {
            padding: 28px 20px;
          }
        }

        /* Input focus ring */
        .signup-input:focus {
          border-color: #00A0E3 !important;
          box-shadow: 0 0 0 3px rgba(0,160,227,0.12);
        }
      `}</style>

      <div className="signup-root">

        {/* ===================== LEFT: FORM ===================== */}
        <div className="signup-left">

          {/* Logo */}
          <div style={{ marginBottom: "48px" }}>
            <img src="/logo.svg" alt="Submit Right" style={{ height: "32px", width: "auto" }} />
          </div>

          {/* Heading */}
          <div style={{ marginBottom: "28px" }}>
            <h1 style={{ fontSize: "28px", fontWeight: 700, color: "#171717", marginBottom: "8px", lineHeight: 1.2 }}>
              Create Account
            </h1>
            <p style={{ fontSize: "15px", color: "#8A94A6", lineHeight: 1.6 }}>
              Sign up to submit and manage your documents.
            </p>
          </div>

          {/* Fields */}
          <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>

            {/* Full Name */}
            <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
              <label style={{ fontSize: "13px", fontWeight: 500, color: "#171717" }}>Full Name</label>
              <input type="text" placeholder="Enter your full name" className="signup-input"
                style={{ padding: "12px 16px", borderRadius: "8px", border: "1px solid #EAECF0", fontSize: "14px", color: "#171717", outline: "none", background: "#fff", transition: "border-color 0.15s, box-shadow 0.15s", width: "100%", boxSizing: "border-box" }} />
            </div>

            {/* Email */}
            <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
              <label style={{ fontSize: "13px", fontWeight: 500, color: "#171717" }}>Email</label>
              <input type="email" placeholder="Enter your email" className="signup-input"
                style={{ padding: "12px 16px", borderRadius: "8px", border: "1px solid #EAECF0", fontSize: "14px", color: "#171717", outline: "none", background: "#fff", transition: "border-color 0.15s, box-shadow 0.15s", width: "100%", boxSizing: "border-box" }} />
            </div>

            {/* Password */}
            <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
              <label style={{ fontSize: "13px", fontWeight: 500, color: "#171717" }}>Password</label>
              <div style={{ position: "relative" }}>
                <input type={showPassword ? "text" : "password"} placeholder="Enter your password" className="signup-input"
                  value={password} onChange={(e) => setPassword(e.target.value)}
                  style={{ width: "100%", padding: "12px 44px 12px 16px", borderRadius: "8px", border: "1px solid #EAECF0", fontSize: "14px", color: "#171717", outline: "none", background: "#fff", boxSizing: "border-box", transition: "border-color 0.15s, box-shadow 0.15s" }} />
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

            {/* Confirm Password */}
            <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
              <label style={{ fontSize: "13px", fontWeight: 500, color: "#171717" }}>Confirm Password</label>
              <div style={{ position: "relative" }}>
                <input type={showConfirmPassword ? "text" : "password"} placeholder="Enter your confirm password" className="signup-input"
                  style={{ width: "100%", padding: "12px 44px 12px 16px", borderRadius: "8px", border: "1px solid #EAECF0", fontSize: "14px", color: "#171717", outline: "none", background: "#fff", boxSizing: "border-box", transition: "border-color 0.15s, box-shadow 0.15s" }} />
                <button type="button" onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  style={{ position: "absolute", right: "14px", top: "50%", transform: "translateY(-50%)", background: "none", border: "none", cursor: "pointer", color: "#B0BAC8", display: "flex", alignItems: "center", padding: 0 }}>
                  {showConfirmPassword ? <Eye width={17} height={17} /> : <EyeOff width={17} height={17} />}
                </button>
              </div>
            </div>

            {/* Checkbox */}
            <div style={{ display: "flex", alignItems: "flex-start", gap: "10px", marginTop: "4px" }}>
              <input type="checkbox" id="agreement" checked={agreementChecked} onChange={(e) => setAgreementChecked(e.target.checked)}
                style={{ width: "16px", height: "16px", marginTop: "2px", flexShrink: 0, accentColor: "#00A0E3", cursor: "pointer" }} />
              <label htmlFor="agreement" style={{ fontSize: "13px", color: "#171717", cursor: "pointer", lineHeight: 1.6 }}>
                I agree to the{" "}
                <Link href="/terms" style={{ color: "#00A0E3", fontWeight: 500, textDecoration: "none" }}>Terms of Service</Link>
                {" "}and{" "}
                <Link href="/privacy" style={{ color: "#00A0E3", fontWeight: 500, textDecoration: "none" }}>Privacy Policy</Link>.
              </label>
            </div>

            {/* Button */}
            <button
              disabled={!agreementChecked}
              style={{
                width: "100%", padding: "13px",
                background: agreementChecked ? "#00A0E3" : "#7FCEF1",
                border: "none", borderRadius: "8px", color: "#fff",
                fontWeight: 600, fontSize: "14px",
                cursor: agreementChecked ? "pointer" : "not-allowed",
                marginTop: "4px", transition: "background 0.15s",
              }}
            >
              Create Account
            </button>
          </div>

          {/* Login link */}
          <div style={{ marginTop: "auto", paddingTop: "32px", textAlign: "center", fontSize: "13px", color: "#8A94A6" }}>
            Already have an account?{" "}
            <Link href="/login" style={{ color: "#00A0E3", fontWeight: 600, textDecoration: "none" }}>Login</Link>
          </div>
        </div>

        {/* ===================== RIGHT: PANEL ===================== */}
        <div className="signup-right">

          {/* Text block */}
          <div className="signup-right-text">
            <h2 style={{ fontSize: "28px", fontWeight: 700, color: "#171717", marginBottom: "12px", lineHeight: 1.2 }}>
              Lorem ipsum dolor sit
            </h2>
            <p style={{ fontSize: "15px", color: "#8A94A6", lineHeight: 1.7, maxWidth: "520px" }}>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor.
              amet, consectetur adipiscing elit, sed do eiusmod tempor.
            </p>
          </div>

          {/* Image block */}
          <div className="signup-right-image-wrapper">
            <div className="signup-right-image-card">
              <img
                src="/images/signin.jpg"
                alt="Dashboard Preview"
              />
            </div>
          </div>

        </div>

      </div>
    </>
  );
}