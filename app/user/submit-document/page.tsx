// "use client";

// import React, { useState } from "react";
// import { Info, ArrowRight, ArrowLeft, ChevronDown, Check, Upload } from "lucide-react";

// export default function SubmitDocumentPage() {
//   // State to manage current step
//   const [currentStep, setCurrentStep] = useState(2); // Set to 2 to show the new step

//   const steps = [
//     { num: 1, name: "Document Details" },
//     { num: 2, name: "Upload Document" },
//     { num: 3, name: "Choose Service" },
//     { num: 4, name: "Review" },
//     { num: 5, name: "Submit Document" },
//   ];

//   const handleNext = () => {
//     if (currentStep < steps.length) {
//       setCurrentStep(currentStep + 1);
//     }
//   };

//   const handleBack = () => {
//     if (currentStep > 1) {
//       setCurrentStep(currentStep - 1);
//     }
//   };

//   return (
//     <div className="w-full font-dm-sans bg-white min-h-[calc(100vh-76px)] flex flex-col">
      
//       {/* --- PAGE HEADER --- */}
//       <div className="px-6 lg:px-8 py-5 border-b border-[#EAECF0] shrink-0">
//         <h1 className="text-[24px] lg:text-[26px] font-bold text-[#171717] mb-1 tracking-tight">
//           Submit New Document
//         </h1>
//         <p className="text-[#8A94A6] text-[14px]">
//           Easily upload your document in just a few steps.
//         </p>
//       </div>

//       {/* --- MAIN CONTENT CONTAINER --- */}
//       <div className="  mx-auto w-full px-6 lg:px-8 py-10 flex-1 flex flex-col">
        
//         {/* --- STEPPER --- */}
//         <div className="relative flex justify-between w-full mb-16">
//           {/* Connecting Line Background - Adjusted top value to 44px for perfect center alignment with circles */}
//           <div className="absolute top-[44px] left-[10%] right-[10%] h-[1px] bg-[#EAECF0] z-0">
//              {/* Dynamic Blue Progress Line */}
//              <div 
//                className="h-full bg-[#00A0E3] transition-all duration-300 ease-in-out"
//                style={{ width: `${((currentStep - 1) / (steps.length - 1)) * 100}%` }}
//              ></div>
//           </div>

//           {steps.map((step) => {
//             const isActive = currentStep === step.num;
//             const isCompleted = currentStep > step.num;

//             return (
//               <div key={step.num} className="flex flex-col items-center relative z-10 w-[140px]">
//                 <span 
//                   className={`text-[12px] tracking-wider mb-3 font-medium uppercase ${
//                     isActive ? "text-[#00A0E3]" : "text-[#A0AAB5]"
//                   }`}
//                 >
//                   Step {step.num}
//                 </span>
                
//                 <div 
//                   className={`w-[26px] h-[26px] rounded-full bg-white flex items-center justify-center mb-3 transition-all duration-200 ${
//                     isActive 
//                       ? "border-[2px] border-[#00A0E3]" 
//                       : isCompleted
//                         ? "border-[2px] border-[#00A0E3] bg-[#00A0E3]"
//                         : "border border-[#EAECF0]"
//                   }`}
//                 >
//                   {isActive && (
//                     <div className="w-[12px] h-[12px] bg-[#00A0E3] rounded-full"></div>
//                   )}
//                   {isCompleted && (
//                     <Check className="w-3.5 h-3.5 text-white rounded-full bg-[#00A0E3]" fill="#00A0E3" strokeWidth={3} />
//                 )}
//                 </div>

//                 <span 
//                   className={`text-[14px] text-center transition-colors duration-200 ${
//                     isActive 
//                       ? "text-[#00A0E3] font-medium" 
//                       : isCompleted
//                         ? "text-[#00A0E3]"
//                         : "text-[#8A94A6]"
//                   }`}
//                 >
//                   {step.name}
//                 </span>
//               </div>
//             );
//           })}
//         </div>

//         {/* --- FORM SECTION: STEP 1 --- */}
//         {currentStep === 1 && (
//           <div className="flex flex-col gap-6 flex-1">
            
//             {/* Document Title */}
//             <div className="flex flex-col gap-2">
//               <label className="text-[14px] font-medium text-[#171717]">
//                 Document Title
//               </label>
//               <input 
//                 type="text" 
//                 placeholder="e.g. Analysis of Macroeconomic Trends in Emerging Markets" 
//                 className="w-full border border-[#EAECF0] rounded-[8px] px-4 py-3 text-[14px] text-[#171717] placeholder:text-[#A0AAB5] focus:outline-none focus:border-[#00A0E3] focus:ring-1 focus:ring-[#00A0E3] transition-all"
//               />
//             </div>

//             {/* Academic Field & Document Type */}
//             <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//               <div className="flex flex-col gap-2">
//                 <label className="text-[14px] font-medium text-[#171717]">
//                   Academic Field / Subject
//                 </label>
//                 <div className="relative">
//                   <select className="w-full border border-[#EAECF0] rounded-[8px] px-4 py-3 text-[14px] text-[#525866] appearance-none focus:outline-none focus:border-[#00A0E3] focus:ring-1 focus:ring-[#00A0E3] bg-white transition-all cursor-pointer" defaultValue="">
//                     <option value="" disabled>Select field...</option>
//                     <option value="economics">Economics</option>
//                     <option value="medicine">Medicine</option>
//                     <option value="engineering">Engineering</option>
//                   </select>
//                   <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-[#A0AAB5] pointer-events-none" />
//                 </div>
//               </div>

//               <div className="flex flex-col gap-2">
//                 <label className="text-[14px] font-medium text-[#171717]">
//                   Document Type
//                 </label>
//                 <div className="relative">
//                   <select className="w-full border border-[#EAECF0] rounded-[8px] px-4 py-3 text-[14px] text-[#525866] appearance-none focus:outline-none focus:border-[#00A0E3] focus:ring-1 focus:ring-[#00A0E3] bg-white transition-all cursor-pointer" defaultValue="">
//                     <option value="" disabled>Select type...</option>
//                     <option value="research_paper">Research Paper</option>
//                     <option value="thesis">Thesis</option>
//                     <option value="essay">Essay</option>
//                   </select>
//                   <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-[#A0AAB5] pointer-events-none" />
//                 </div>
//               </div>
//             </div>

//             {/* Word Count */}
//             <div className="flex flex-col gap-2">
//               <label className="text-[14px] font-medium text-[#171717]">
//                 Word Count
//               </label>
//               <input 
//                 type="text" 
//                 value="0"
//                 readOnly
//                 className="w-full border border-[#EAECF0] bg-[#FAFAFB] rounded-[8px] px-4 py-3 text-[14px] text-[#8A94A6] cursor-not-allowed focus:outline-none"
//               />
//               <div className="flex items-center gap-1.5 mt-0.5">
//                 <Info className="w-3.5 h-3.5 text-[#8A94A6]" strokeWidth={2.5} />
//                 <span className="text-[12px] text-[#8A94A6]">
//                   Word count will be calculated automatically after upload in Step 2.
//                 </span>
//               </div>
//             </div>

//             {/* Short Description */}
//             <div className="flex flex-col gap-2">
//               <label className="text-[14px] font-medium text-[#171717]">
//                 Short Description
//               </label>
//               <textarea 
//                 placeholder="Briefly describe the context or specific requirements for the editor..." 
//                 className="w-full border border-[#EAECF0] rounded-[8px] px-4 py-3 text-[14px] text-[#171717] placeholder:text-[#A0AAB5] focus:outline-none focus:border-[#00A0E3] focus:ring-1 focus:ring-[#00A0E3] transition-all min-h-[140px] resize-y"
//               ></textarea>
//               <div className="flex justify-end">
//                 <span className="text-[12px] text-[#A0AAB5]">
//                   0/500 characters
//                 </span>
//               </div>
//             </div>

//           </div>
//         )}

//         {/* --- FORM SECTION: STEP 2 --- */}
//         {currentStep === 2 && (
//           <div className="flex flex-col flex-1 w-full min-h-[400px]">
//             <div className="flex-1 w-full border-[2px] border-dashed border-[#EAECF0] rounded-[16px] bg-[#FAFAFB] flex flex-col items-center justify-center p-12 transition-colors hover:bg-[#F4F5F7] hover:border-[#D1D5DB] cursor-pointer group">
//               <div className="w-[48px] h-[48px] bg-white border border-[#EAECF0] rounded-[12px] flex items-center justify-center mb-5 shadow-sm group-hover:shadow transition-shadow">
//                 <Upload className="w-5 h-5 text-[#525866]" strokeWidth={2} />
//               </div>
              
//               <p className="text-[#171717] text-[15px] font-medium mb-2.5">
//                 Drag and drop your document here or click to <span className="text-[#00A0E3] hover:underline cursor-pointer">browse files</span>
//               </p>
              
//               <p className="text-[#8A94A6] text-[13px]">
//                 Supported formats: DOC, DOCX, PDF Maximum file size: 25MB
//               </p>
//             </div>
//           </div>
//         )}

//       </div>

//       {/* --- FOOTER ACTIONS --- */}
//       <div className="border-t border-[#EAECF0] bg-white px-6 lg:px-12 py-5 flex items-center justify-between shrink-0 mt-auto">
//         {currentStep === 1 ? (
//           <button className="px-6 py-2.5 border border-[#EAECF0] rounded-[8px] text-[14px] font-bold text-[#171717] hover:bg-[#F9FAFB] transition-colors shadow-[0_1px_2px_rgba(0,0,0,0.02)]">
//             Cancel
//           </button>
//         ) : (
//           <button 
//             onClick={handleBack}
//             className="px-6 py-2.5 border border-[#EAECF0] rounded-[8px] text-[14px] font-bold text-[#171717] hover:bg-[#F9FAFB] transition-colors shadow-[0_1px_2px_rgba(0,0,0,0.02)] flex items-center gap-2"
//           >
//             <ArrowLeft className="w-4 h-4" strokeWidth={2.5} /> Back
//           </button>
//         )}
        
//         <button 
//           onClick={handleNext}
//           className="px-6 py-2.5 bg-[#00A0E3] hover:bg-[#008bc5] text-white rounded-[8px] text-[14px] font-bold flex items-center gap-2 transition-colors shadow-sm"
//         >
//           {currentStep === steps.length ? "Submit" : "Continue"} 
//           {currentStep < steps.length && <ArrowRight className="w-4 h-4" strokeWidth={2.5} />}
//         </button>
//       </div>

//     </div>
//   );
// }

"use client";

import React, { useState, useRef } from "react";
import { Info, ArrowRight, ArrowLeft, ChevronDown, Check, Upload, File as FileIcon ,BookOpen ,Languages ,Edit3,FileSearch, FileText, Users} from "lucide-react";

export default function SubmitDocumentPage() {
  // State to manage current step
  const [currentStep, setCurrentStep] = useState(1);
  const [selectedService, setSelectedService] = useState("editing");
  const [isTermsAgreed, setIsTermsAgreed] = useState(true);
  // State and ref for file upload
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const steps = [
    { num: 1, name: "Document Details" },
    { num: 2, name: "Upload Document" },
    { num: 3, name: "Choose Service" },
    { num: 4, name: "Review" },
    { num: 5, name: "Submit Document" },
  ];

  const services = [
    {
      id: 'editing',
      title: 'Editing',
      icon: Edit3, 
      features: ['Improve grammar and clarity', 'Structure refinement', 'Academic tone correction', 'Includes revision cycle']
    },
    {
      id: 'proofreading',
      title: 'Proofreading',
      icon: FileSearch, 
      features: ['Improve grammar and clarity', 'Structure refinement', 'Academic tone correction', 'Includes revision cycle']
    },
    {
      id: 'translation',
      title: 'Translation',
      icon: Languages, 
      features: ['Convert to academic English', 'Maintain subject accuracy', 'Includes quality review', '']
    },
    {
      id: 'publication',
      title: 'Publication Support',
      icon: BookOpen,
      features: ['Journal selection guidance', 'Formatting compliance', 'Plagiarism check', 'Resubmission support']
    }
  ];
  const handleNext = () => {
    if (currentStep < steps.length) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleBrowseClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setUploadedFile(e.target.files[0]);
    }
  };

  const handleRemoveFile = () => {
    setUploadedFile(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = ""; // Reset input
    }
  };

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(1)) + ' ' + sizes[i];
  };

  return (
    <div className="w-full font-dm-sans bg-white min-h-[calc(100vh-76px)] flex flex-col">
      
      {/* --- PAGE HEADER --- */}
      <div className="px-6 lg:px-8 py-5 border-b border-[#EAECF0] shrink-0">
        <h1 className="text-[24px] lg:text-[26px] font-bold text-[#171717] mb-1 tracking-tight">
          Submit New Document
        </h1>
        <p className="text-[#8A94A6] text-[14px]">
          Easily upload your document in just a few steps.
        </p>
      </div>

      {/* --- MAIN CONTENT CONTAINER --- */}
      <div className=" mx-auto w-full px-6 lg:px-8 py-10 flex-1 flex flex-col">
        
        {/* --- STEPPER --- */}
        <div className="relative flex justify-between w-full mb-16">
          {/* Connecting Line Background - Adjusted to align perfectly with circle centers */}
          <div className="absolute top-[41px] left-[10%] right-[10%] h-[1px] bg-[#EAECF0] z-0">
             {/* Dynamic Blue Progress Line */}
             <div 
               className="h-full bg-[#00A0E3] transition-all duration-300 ease-in-out"
               style={{ width: `${((currentStep - 1) / (steps.length - 1)) * 100}%` }}
             ></div>
          </div>

          {steps.map((step) => {
            const isActive = currentStep === step.num;
            const isCompleted = currentStep > step.num;

            return (
              <div key={step.num} className="flex flex-col items-center relative z-10 w-[140px]">
                <span 
                  className={`text-[12px] tracking-wider mb-3 font-medium uppercase ${
                    isActive ? "text-[#00A0E3]" : "text-[#A0AAB5]"
                  }`}
                >
                  Step {step.num}
                </span>
                
                <div 
                  className={`w-[26px] h-[26px] rounded-full bg-white flex items-center justify-center mb-3 transition-all duration-200 ${
                    isActive 
                      ? "border-[2px] border-[#00A0E3]" 
                      : isCompleted
                        ? "border-[2px] border-[#00A0E3] bg-[#00A0E3]"
                        : "border border-[#EAECF0]"
                  }`}
                >
                  {isActive && (
                    <div className="w-[12px] h-[12px] bg-[#00A0E3] rounded-full"></div>
                  )}
                  {isCompleted && (
                    // <Check className="w-3.5 h-3.5 text-white" strokeWidth={3} />
                <Check className="w-3.5 h-3.5 text-white rounded-full bg-[#00A0E3]" fill="#00A0E3" strokeWidth={3} />

                  )}
                </div>

                <span 
                  className={`text-[14px] text-center transition-colors duration-200 ${
                    isActive 
                      ? "text-[#00A0E3] font-medium" 
                      : isCompleted
                        ? "text-[#00A0E3]"
                        : "text-[#8A94A6]"
                  }`}
                >
                  {step.name}
                </span>
              </div>
            );
          })}
        </div>

        {/* --- FORM SECTION: STEP 1 --- */}
        {currentStep === 1 && (
          <div className="flex flex-col gap-6 flex-1">
            
            {/* Document Title */}
            <div className="flex flex-col gap-2">
              <label className="text-[14px] font-medium text-[#171717]">
                Document Title
              </label>
              <input 
                type="text" 
                placeholder="e.g. Analysis of Macroeconomic Trends in Emerging Markets" 
                className="w-full border border-[#EAECF0] rounded-[8px] px-4 py-3 text-[14px] text-[#171717] placeholder:text-[#A0AAB5] focus:outline-none focus:border-[#00A0E3] focus:ring-1 focus:ring-[#00A0E3] transition-all"
              />
            </div>

            {/* Academic Field & Document Type */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="flex flex-col gap-2">
                <label className="text-[14px] font-medium text-[#171717]">
                  Academic Field / Subject
                </label>
                <div className="relative">
                  <select className="w-full border border-[#EAECF0] rounded-[8px] px-4 py-3 text-[14px] text-[#525866] appearance-none focus:outline-none focus:border-[#00A0E3] focus:ring-1 focus:ring-[#00A0E3] bg-white transition-all cursor-pointer" defaultValue="">
                    <option value="" disabled>Select field...</option>
                    <option value="economics">Economics</option>
                    <option value="medicine">Medicine</option>
                    <option value="engineering">Engineering</option>
                  </select>
                  <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-[#A0AAB5] pointer-events-none" />
                </div>
              </div>

              <div className="flex flex-col gap-2">
                <label className="text-[14px] font-medium text-[#171717]">
                  Document Type
                </label>
                <div className="relative">
                  <select className="w-full border border-[#EAECF0] rounded-[8px] px-4 py-3 text-[14px] text-[#525866] appearance-none focus:outline-none focus:border-[#00A0E3] focus:ring-1 focus:ring-[#00A0E3] bg-white transition-all cursor-pointer" defaultValue="">
                    <option value="" disabled>Select type...</option>
                    <option value="research_paper">Research Paper</option>
                    <option value="thesis">Thesis</option>
                    <option value="essay">Essay</option>
                  </select>
                  <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-[#A0AAB5] pointer-events-none" />
                </div>
              </div>
            </div>

            {/* Word Count */}
            <div className="flex flex-col gap-2">
              <label className="text-[14px] font-medium text-[#171717]">
                Word Count
              </label>
              <input 
                type="text" 
                value="0"
                readOnly
                className="w-full border border-[#EAECF0] bg-[#FAFAFB] rounded-[8px] px-4 py-3 text-[14px] text-[#8A94A6] cursor-not-allowed focus:outline-none"
              />
              <div className="flex items-center gap-1.5 mt-0.5">
                <Info className="w-3.5 h-3.5 text-[#8A94A6]" strokeWidth={2.5} />
                <span className="text-[12px] text-[#8A94A6]">
                  Word count will be calculated automatically after upload in Step 2.
                </span>
              </div>
            </div>

            {/* Short Description */}
            <div className="flex flex-col gap-2">
              <label className="text-[14px] font-medium text-[#171717]">
                Short Description
              </label>
              <textarea 
                placeholder="Briefly describe the context or specific requirements for the editor..." 
                className="w-full border border-[#EAECF0] rounded-[8px] px-4 py-3 text-[14px] text-[#171717] placeholder:text-[#A0AAB5] focus:outline-none focus:border-[#00A0E3] focus:ring-1 focus:ring-[#00A0E3] transition-all min-h-[140px] resize-y"
              ></textarea>
              <div className="flex justify-end">
                <span className="text-[12px] text-[#A0AAB5]">
                  0/500 characters
                </span>
              </div>
            </div>

          </div>
        )}

        {/* --- FORM SECTION: STEP 2 --- */}
        {currentStep === 2 && (
          <div className="flex flex-col flex-1 w-full min-h-[400px]">
            {/* Hidden File Input */}
            <input 
              type="file" 
              ref={fileInputRef} 
              onChange={handleFileChange} 
              className="hidden" 
              accept=".doc,.docx,.pdf"
            />

            {!uploadedFile ? (
              /* Drag & Drop Area (Empty State) */
              <div 
                className="flex-1 w-full border-[2px] border-dashed border-[#EAECF0] rounded-[16px] bg-[#FAFAFB] flex flex-col items-center justify-center p-12 transition-colors hover:bg-[#F4F5F7] hover:border-[#D1D5DB] cursor-pointer group"
                onClick={handleBrowseClick}
              >
                <div className="w-[48px] h-[48px] bg-[#EAEFF4] rounded-[8px] flex items-center justify-center mb-5 shadow-sm group-hover:shadow transition-shadow">
                  <Upload className="w-5 h-5 text-[#525866]" strokeWidth={2.5} />
                </div>
                
                <p className="text-[#171717] text-[15px] font-medium mb-2">
                  Drag and drop your document here or click to <span className="text-[#00A0E3] hover:underline cursor-pointer">browse files</span>
                </p>
                
                <p className="text-[#8A94A6] text-[13px]">
                  Supported formats: DOC, DOCX, PDF Maximum file size: 25MB
                </p>
              </div>
            ) : (
              /* Uploaded File Area */
              <div className="w-full">
                <div className="w-full border border-[#EAECF0] bg-[#F4FAFD] rounded-[8px] p-4 flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="w-[40px] h-[40px] bg-[#E1F4FD] rounded-[8px] flex items-center justify-center shrink-0">
                      <FileIcon className="w-5 h-5 text-[#00A0E3]" strokeWidth={2} />
                    </div>
                    <div className="flex flex-col">
                      <span className="text-[14px] font-medium text-[#171717] truncate max-w-[400px]">
                        {uploadedFile.name}
                      </span>
                      <span className="text-[12px] text-[#8A94A6]">
                        {formatFileSize(uploadedFile.size)}
                      </span>
                    </div>
                  </div>
                  <button 
                    onClick={handleRemoveFile}
                    className="text-[#FF4D4F] text-[13px] font-medium hover:underline transition-all"
                  >
                    Remove
                  </button>
                </div>
              </div>
            )}
          </div>
        )}

        {/* Step-3 */}
        {currentStep === 3 && (
          <div className="flex flex-col flex-1 w-full gap-6">
            
            {/* Services Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {services.map((service) => {
                const isSelected = selectedService === service.id;
                
                return (
                  <div 
                    key={service.id}
                    onClick={() => setSelectedService(service.id)}
                    className={`cursor-pointer border rounded-[12px] p-6 transition-all duration-200 ${
                      isSelected 
                        ? "border-[#00A0E3] bg-[#F4FAFD]" 
                        : "border-[#EAECF0] bg-white hover:border-[#D1D5DB]"
                    }`}
                  >
                    <div className="flex justify-between items-start mb-6">
                      <div className="flex items-center gap-4">
                        <div className={`w-[42px] h-[42px] rounded-[8px] flex items-center justify-center shrink-0 ${
                          isSelected ? "bg-[#E1F4FD]" : "bg-[#F4F5F7]"
                        }`}>
                          <service.icon className={`w-[20px] h-[20px] ${
                            isSelected ? "text-[#00A0E3]" : "text-[#525866]"
                          }`} strokeWidth={2} />
                        </div>
                        <h3 className="text-[16px] font-bold text-[#171717]">
                          {service.title}
                        </h3>
                      </div>
                      
                      {/* Custom Radio Button */}
                      <div className={`w-5 h-5 rounded-full border-[2px] flex items-center justify-center shrink-0 mt-2.5 ${
                        isSelected ? "border-[#00A0E3]" : "border-[#EAECF0]"
                      }`}>
                        {isSelected && <div className="w-2.5 h-2.5 bg-[#00A0E3] rounded-full"></div>}
                      </div>
                    </div>

                    {/* Features List */}
                    <div className="grid grid-cols-2 gap-y-3 gap-x-4">
                      {service.features.map((feature, idx) => (
                        feature ? (
                          <div key={idx} className="flex items-start gap-2.5 text-[13px] text-[#8A94A6]">
                            <span className="text-[#A0AAB5] text-[18px] leading-[14px] mt-[-1px]">•</span>
                            <span className="leading-tight">{feature}</span>
                          </div>
                        ) : <div key={idx}></div> // Empty div to maintain grid structure if feature is blank
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Agreement Checkbox */}
            <div className="mt-2 border border-[#EAECF0] bg-[#FAFAFB] rounded-[8px] p-4 flex items-center gap-3">
              <div className="flex items-center h-5 mt-0.5">
                <input 
                  type="checkbox" 
                  checked={isTermsAgreed}
                  onChange={(e) => setIsTermsAgreed(e.target.checked)}
                  className="w-[18px] h-[18px] border-[#EAECF0] rounded-[4px] text-[#00A0E3] focus:ring-[#00A0E3] cursor-pointer accent-[#00A0E3]"
                />
              </div>
              <label 
                className="text-[#171717] text-[14px] cursor-pointer"
                onClick={() => setIsTermsAgreed(!isTermsAgreed)}
              >
                I understand what is included in this service and agree to the terms of engagement.
              </label>
            </div>

          </div>
        )}

        {/* Step-4 */}

        {currentStep === 4 && (
          <div className="flex flex-col gap-8 flex-1 w-full">
            
            {/* Document Summary */}
            <div className="flex flex-col gap-5">
              <div className="flex items-center gap-2.5">
                <div className="text-[#00A0E3]">
                  {/* Using FileText as a matching icon representation */}
                  <FileText className="w-5 h-5 fill-[#E1F4FD]" strokeWidth={2} />
                </div>
                <h2 className="text-[16px] font-bold text-[#171717]">Document Summary</h2>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-y-6 gap-x-12">
                {/* Column 1 */}
                <div className="flex flex-col gap-6">
                  <div className="flex flex-col gap-1">
                    <span className="text-[13px] text-[#8A94A6]">Document Title</span>
                    <span className="text-[14px] font-bold text-[#171717]">AI Research Paper</span>
                  </div>
                  <div className="flex flex-col gap-1">
                    <span className="text-[13px] text-[#8A94A6]">Document Type</span>
                    <span className="text-[14px] font-bold text-[#171717]">Journal Article</span>
                  </div>
                  <div className="flex flex-col gap-1">
                    <span className="text-[13px] text-[#8A94A6]">Short Description</span>
                    <p className="text-[14px] font-bold text-[#171717] leading-relaxed pr-4">
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                    </p>
                  </div>
                </div>

                {/* Column 2 */}
                <div className="flex flex-col gap-6">
                  <div className="flex flex-col gap-1">
                    <span className="text-[13px] text-[#8A94A6]">Academic Field / Subject</span>
                    <span className="text-[14px] font-bold text-[#171717]">Computer Science</span>
                  </div>
                  <div className="flex flex-col gap-1">
                    <span className="text-[13px] text-[#8A94A6]">Service Selected</span>
                    <span className="text-[14px] font-bold text-[#171717]">Editing</span>
                  </div>
                  <div className="flex flex-col gap-1">
                    {/* Note: The design mockup shows "Service Selected" again here, but it logically represents the Uploaded Document */}
                    <span className="text-[13px] text-[#8A94A6]">Uploaded Document</span>
                    <div className="w-full bg-[#F4FAFD] rounded-[8px] p-3 flex items-center gap-3 mt-1">
                      <div className="w-[36px] h-[36px] bg-[#E1F4FD] rounded-[6px] flex items-center justify-center shrink-0">
                        <FileIcon className="w-4 h-4 text-[#00A0E3]" strokeWidth={2} />
                      </div>
                      <div className="flex flex-col">
                        <span className="text-[13px] font-medium text-[#171717] truncate">
                          AI_Research_Paper_Final.docx
                        </span>
                        <span className="text-[12px] text-[#8A94A6]">
                          1.4 MB
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Word Count & Pricing Breakdown */}
            <div className="flex flex-col gap-5 mt-2">
              <div className="flex items-center gap-2.5">
                <div className="text-[#00A0E3]">
                  <Users className="w-5 h-5 fill-[#E1F4FD]" strokeWidth={2} />
                </div>
                <h2 className="text-[16px] font-bold text-[#171717]">Word Count & Pricing Breakdown</h2>
              </div>

              <div className="border bg-[#EFF7FB] border-[#0396d6] rounded-[12px] p-4 flex flex-col gap-4">
                <div className="flex justify-between items-center">
                  <span className="text-[#8A94A6] text-[14px]">Our academic experts verify your submission and select the best editor.</span>
                  <span className="text-[#171717] text-[14px] font-bold">4,250 Words</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-[#8A94A6] text-[14px]">Rate per word</span>
                  <span className="text-[#171717] text-[14px] font-bold">₹0.10</span>
                </div>

                <div className="w-full h-[1px] bg-[#00A0E3]/30 my-2"></div>

                <div className="flex justify-between items-center">
                  <span className="text-[#171717] text-[18px] font-bold">Estimated Total</span>
                  <span className="text-[#00A0E3] text-[20px] font-bold">₹425.00</span>
                </div>
                <span className="text-[#8A94A6] text-[12px] italic mt-[-8px]">
                  * Final price will be confirmed after review, if necessary. Changes in word count or specialized requirements may affect the final quote.
                </span>
              </div>
            </div>

            {/* Confirmation Checkbox */}
            <div className="mt-2 border border-[#EAECF0] rounded-[8px] p-4 flex items-center gap-3">
              <div className="flex items-center h-5 mt-0.5">
                <input 
                  type="checkbox" 
                  defaultChecked
                  className="w-[18px] h-[18px] border-[#EAECF0] rounded-[4px] text-[#00A0E3] focus:ring-[#00A0E3] cursor-pointer accent-[#00A0E3]"
                />
              </div>
              <label className="text-[#171717] text-[14px] cursor-pointer">
                I confirm that all information provided above is correct and I have uploaded the correct version of my document for editing.
              </label>
            </div>

          </div>
        )}

{/* --- FORM SECTION: STEP 5 (SUCCESS) --- */}
                {currentStep === 5 && (
             <div className="flex flex-col items-center justify-center flex-1 w-full relative py-8 lg:py-12 overflow-hidden">
                            
             {/* --- CONFETTI IMAGES --- */}
            
            {/* Left Confetti Image (Update src with your actual path) */}
            <img 
              src="/images/party-left.svg" 
              alt="Success Confetti Left" 
              className="absolute -left-60 top-[10%] w-[300px] lg:w-[700px] h-auto pointer-events-none z-0 opacity-100 scale-x-[-1]" // scale-x-[-1] to flip if using same image, adjust as needed
            />

            {/* Right Confetti Image (Update src with your actual path) */}
            <img 
              src="/images/party-right.svg" 
              alt="Success Confetti Right" 
              className="absolute right-32 top-[10%] w-[300px] lg:w-[700px] h-auto pointer-events-none z-0 opacity-100"
            />

            {/* --- CENTRAL CONTENT --- */}
            <div className="relative z-10 flex flex-col items-center text-center w-full max-w-[520px]">
              
              {/* Success Icon */}
              <div className="relative w-[72px] h-[72px] rounded-full flex items-center justify-center bg-[#E1F4FD] mb-6 shadow-[0_0_20px_rgba(0,160,227,0.1)]">
                <div className="w-[44px] h-[44px] rounded-full bg-white flex items-center justify-center shadow-sm">
                  <div className="w-6 h-6 bg-[#00A0E3] rounded-full flex items-center justify-center">
                    <Check className="w-3.5 h-3.5 text-white" strokeWidth={4} />
                  </div>
                </div>
              </div>

              {/* Success Text */}
              <h2 className="text-[20px] lg:text-[24px] font-bold text-[#171717] mb-2 tracking-tight">
                Your document has been submitted successfully.
              </h2>
              <p className="text-[#8A94A6] text-[15px] mb-8 leading-relaxed">
                We are reviewing your document and will notify<br className="hidden sm:block" /> you once the next step is ready.
              </p>

              {/* What Happens Next Card */}
              <div className="w-full border border-[#EAECF0] bg-[#FAFAFB] rounded-[16px] p-6 lg:p-8 text-left shadow-sm">
                <h3 className="text-[16px] font-bold text-[#171717] mb-5">
                  What Happens Next
                </h3>
                <ul className="space-y-4">
                  <li className="flex items-start gap-3 text-[14px] text-[#8A94A6]">
                    <span className="text-[#A0AAB5] text-[18px] leading-[14px] mt-[-1px]">•</span>
                    <span className="leading-relaxed">We review your document for quality and compliance.</span>
                  </li>
                  <li className="flex items-start gap-3 text-[14px] text-[#8A94A6]">
                    <span className="text-[#A0AAB5] text-[18px] leading-[14px] mt-[-1px]">•</span>
                    <span className="leading-relaxed">An expert editor matching your field is assigned.</span>
                  </li>
                  <li className="flex items-start gap-3 text-[14px] text-[#8A94A6]">
                    <span className="text-[#A0AAB5] text-[18px] leading-[14px] mt-[-1px]">•</span>
                    <span className="leading-relaxed">You'll receive a notification when updates are ready.</span>
                  </li>
                </ul>
              </div>

            </div>
          </div>
        )}
      </div>

      {/* --- FOOTER ACTIONS --- */}
      <div className="border-t border-[#EAECF0] bg-white px-6 lg:px-12 py-5 flex items-center justify-between shrink-0 mt-auto">
        {currentStep === 1 ? (
          <button className="px-6 py-2.5 border border-[#EAECF0] rounded-[8px] text-[14px] font-bold text-[#171717] hover:bg-[#F9FAFB] transition-colors shadow-[0_1px_2px_rgba(0,0,0,0.02)]">
            Cancel
          </button>
        ) : (
          <button 
            onClick={handleBack}
            className="px-6 py-2.5 border border-[#EAECF0] rounded-[8px] text-[14px] font-bold text-[#171717] hover:bg-[#F9FAFB] transition-colors shadow-[0_1px_2px_rgba(0,0,0,0.02)] flex items-center gap-2"
          >
            <ArrowLeft className="w-4 h-4" strokeWidth={2.5} /> Back
          </button>
        )}
        
        <button 
          onClick={handleNext}
          className="px-6 py-2.5 bg-[#00A0E3] hover:bg-[#008bc5] text-white rounded-[8px] text-[14px] font-bold flex items-center gap-2 transition-colors shadow-sm"
        >
          {currentStep === steps.length ? "Submit" : "Continue"} 
          {currentStep < steps.length && <ArrowRight className="w-4 h-4" strokeWidth={2.5} />}
        </button>
      </div>

    </div>
  );
}