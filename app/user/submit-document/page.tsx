"use client";

import React, { Suspense, useEffect, useMemo, useRef, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Info, ArrowRight, ArrowLeft, Check, Upload, File as FileIcon, FileText, Users } from "lucide-react";
import { apiGet, apiRequest } from "@/lib/client-api";
import { MockCheckoutModal } from "@/components/MockCheckoutModal";

type ServiceApiRow = {
  id: string;
  slug?: string | null;
  title: string;
  kind?: "service" | "package" | "domain" | null;
  basePrice?: number | null;
  base_price?: number | null;
  ratePerWord?: number | null;
  rate_per_word?: number | null;
};

type ServiceRow = {
  id: string;
  slug: string;
  title: string;
  kind: "service" | "package";
  basePrice: number;
  ratePerWord: number;
};

type ClientHomePayload = {
  services: ServiceApiRow[];
};

type DocumentRow = {
  id: string;
  uploaded_file_name?: string | null;
  word_count?: number | null;
  rate_per_word?: number | null;
  estimated_total?: number | null;
};

type ServiceSelectionResult = {
  wordCount?: number | null;
  ratePerWord?: number | null;
  estimatedTotal?: number | null;
};

type FormState = {
  documentTitle: string;
  academicField: string;
  documentType: string;
  shortDescription: string;
};

const steps = [
  { num: 1, name: "Document Details" },
  { num: 2, name: "Upload Document" },
  { num: 3, name: "Choose Offer" },
  { num: 4, name: "Review" },
  { num: 5, name: "Submit Document" }
];

function formatFileSize(bytes: number) {
  if (bytes === 0) return "0 Bytes";
  const k = 1024;
  const sizes = ["Bytes", "KB", "MB", "GB"];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return `${parseFloat((bytes / Math.pow(k, i)).toFixed(1))} ${sizes[i]}`;
}

function formatCurrency(value: number) {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  }).format(value);
}

function SubmitDocumentContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [currentStep, setCurrentStep] = useState(1);
  const [services, setServices] = useState<ServiceRow[]>([]);
  const [servicesLoading, setServicesLoading] = useState(true);
  const [selectedServiceId, setSelectedServiceId] = useState<string>("");
  const [isTermsAgreed, setIsTermsAgreed] = useState(true);
  const [isReviewConfirmed, setIsReviewConfirmed] = useState(true);

  const [documentId, setDocumentId] = useState<string | null>(null);
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [uploadedFileName, setUploadedFileName] = useState<string>("");
  const [uploadedFileSize, setUploadedFileSize] = useState<number>(0);
  const [isUploadSynced, setIsUploadSynced] = useState(false);
  const [uploadingFile, setUploadingFile] = useState(false);

  const [wordCount, setWordCount] = useState(0);
  const [ratePerWord, setRatePerWord] = useState(0);
  const [estimatedTotal, setEstimatedTotal] = useState(0);

  const [form, setForm] = useState<FormState>({
    documentTitle: "",
    academicField: "",
    documentType: "",
    shortDescription: ""
  });

  const [actionError, setActionError] = useState<string | null>(null);
  const [isBusy, setIsBusy] = useState(false);
  const [showCheckoutModal, setShowCheckoutModal] = useState(false);
  const [isPackagePaymentDone, setIsPackagePaymentDone] = useState(false);

  const preSelectedItemId =
    searchParams.get("serviceId") || searchParams.get("itemId") || searchParams.get("selectedItemId") || "";
  const preSelectedItemKind = searchParams.get("kind");

  const selectedService = useMemo(
    () => services.find((service) => service.id === selectedServiceId) ?? null,
    [services, selectedServiceId]
  );

  const isPackageSelected = selectedService?.kind === "package";

  useEffect(() => {
    let active = true;

    const loadServices = async () => {
      try {
        const payload = await apiGet<ClientHomePayload>("/api/client/home");
        if (!active) return;

        const activeServices = (payload.services ?? [])
          .filter((service) => service && typeof service.id === "string" && typeof service.title === "string")
          .filter((service) => service.kind === "service" || service.kind === "package")
          .map((service) => ({
            id: service.id,
            slug: String(service.slug ?? ""),
            title: service.title,
            kind: service.kind as "service" | "package",
            basePrice: Number(service.basePrice ?? service.base_price ?? 0),
            ratePerWord: Number(service.ratePerWord ?? service.rate_per_word ?? 0)
          }));

        setServices(activeServices);
        if (activeServices.length > 0) {
          const normalizedPreSelectedItem = preSelectedItemId.trim().toLowerCase();
          const preSelected = activeServices.find((service) => {
            const matchesId = preSelectedItemId ? service.id === preSelectedItemId : false;
            const matchesSlug = normalizedPreSelectedItem
              ? service.slug.trim().toLowerCase() === normalizedPreSelectedItem
              : false;
            const matchesKind =
              !preSelectedItemKind || preSelectedItemKind === service.kind || preSelectedItemKind === "offer";
            return (matchesId || matchesSlug) && matchesKind;
          });

          const defaultByKind =
            preSelectedItemKind === "package"
              ? activeServices.find((service) => service.kind === "package")
              : preSelectedItemKind === "service"
                ? activeServices.find((service) => service.kind === "service")
                : null;

          setSelectedServiceId(preSelected?.id ?? defaultByKind?.id ?? activeServices[0].id);
        }
      } catch (error) {
        if (!active) return;
        setActionError(error instanceof Error ? error.message : "Failed to load services.");
      } finally {
        if (active) {
          setServicesLoading(false);
        }
      }
    };

    void loadServices();

    return () => {
      active = false;
    };
  }, [preSelectedItemId, preSelectedItemKind]);

  useEffect(() => {
    setIsPackagePaymentDone(false);
  }, [selectedServiceId]);

  useEffect(() => {
    if (!selectedService) {
      return;
    }

    if (selectedService.kind === "package") {
      const packagePrice = Number(selectedService.basePrice ?? selectedService.ratePerWord ?? 0);
      if (packagePrice > 0) {
        setRatePerWord(0);
        setEstimatedTotal(packagePrice);
      }
      return;
    }

    const liveRate = Number(selectedService.ratePerWord ?? 0);
    if (liveRate > 0) {
      setRatePerWord(liveRate);
      setEstimatedTotal(wordCount * liveRate);
    }
  }, [selectedService, wordCount]);

  const canMoveFromStep1 =
    form.documentTitle.trim().length >= 2 &&
    form.academicField.trim().length >= 2 &&
    form.documentType.trim().length >= 2 &&
    form.shortDescription.trim().length >= 2;

  const applySelectedOffer = async (activeDocumentId: string) => {
    if (!selectedServiceId) {
      throw new Error("Please select a service or package before continuing.");
    }

    const service = await apiRequest<ServiceSelectionResult>("/api/client/documents/service", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        documentId: activeDocumentId,
        serviceId: selectedServiceId
      })
    });

    const nextWordCount = Number(service.wordCount ?? wordCount);
    const nextRate = Number(service.ratePerWord ?? selectedService?.ratePerWord ?? ratePerWord);
    const nextEstimate = Number(service.estimatedTotal ?? nextWordCount * nextRate);

    setWordCount(nextWordCount);
    setRatePerWord(nextRate);
    setEstimatedTotal(nextEstimate);
  };

  const syncUploadWithServer = async (file: File) => {
    if (!documentId) {
      setActionError("Draft document is missing. Please go back to step 1.");
      return false;
    }

    try {
      setUploadingFile(true);
      const formData = new FormData();
      formData.append("documentId", documentId);
      formData.append("file", file);

      const uploaded = await apiRequest<DocumentRow>("/api/client/documents/upload", {
        method: "POST",
        body: formData
      });

      const nextWordCount = Number(uploaded.word_count ?? 0);
      const apiRate = Number(uploaded.rate_per_word ?? 0);
      const fallbackRate = Number(selectedService?.ratePerWord ?? ratePerWord ?? 0);
      const nextRate = apiRate > 0 ? apiRate : fallbackRate;
      const apiEstimate = Number(uploaded.estimated_total ?? 0);
      const nextEstimate = apiEstimate > 0 ? apiEstimate : nextWordCount * nextRate;

      setUploadedFileName(uploaded.uploaded_file_name || file.name);
      setUploadedFileSize(file.size);
      setWordCount(nextWordCount);
      setRatePerWord(nextRate);
      setEstimatedTotal(nextEstimate);
      setIsUploadSynced(true);
      return true;
    } catch (error) {
      setActionError(error instanceof Error ? error.message : "Failed to upload file.");
      return false;
    } finally {
      setUploadingFile(false);
    }
  };

  const handleBrowseClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];
      setUploadedFile(file);
      setUploadedFileName(file.name);
      setUploadedFileSize(file.size);
      setIsUploadSynced(false);
      setActionError(null);
      if (documentId) {
        void syncUploadWithServer(file);
      }
    }
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    const file = e.dataTransfer.files?.[0];
    if (!file) return;
    setUploadedFile(file);
    setUploadedFileName(file.name);
    setUploadedFileSize(file.size);
    setIsUploadSynced(false);
    setActionError(null);
    if (documentId) {
      void syncUploadWithServer(file);
    }
  };

  const handleRemoveFile = () => {
    setUploadedFile(null);
    setUploadedFileName("");
    setUploadedFileSize(0);
    setIsUploadSynced(false);
    setWordCount(0);
    setEstimatedTotal(0);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const handleBack = () => {
    if (isBusy) return;
    if (currentStep > 1) {
      setCurrentStep((prev) => prev - 1);
      setActionError(null);
    }
  };

  const moveToNextStep = async () => {
    if (isBusy) return;
    setActionError(null);

    try {
      setIsBusy(true);

      if (currentStep === 1) {
        if (!canMoveFromStep1) {
          throw new Error("Please complete all document details before continuing.");
        }

        if (!documentId) {
          const draft = await apiRequest<DocumentRow>("/api/client/documents", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              documentTitle: form.documentTitle.trim(),
              academicField: form.academicField.trim(),
              documentType: form.documentType.trim(),
              shortDescription: form.shortDescription.trim()
            })
          });
          setDocumentId(draft.id);
        }

        setCurrentStep(2);
        return;
      }

      if (currentStep === 2) {
        if (!uploadedFile) {
          throw new Error("Please upload a file before continuing.");
        }

        if (!isUploadSynced) {
          const success = await syncUploadWithServer(uploadedFile);
          if (!success) {
            return;
          }
        }

        setCurrentStep(3);
        return;
      }

      if (currentStep === 3) {
        if (!documentId) {
          throw new Error("Draft document is missing. Please go back to step 1.");
        }
        if (!selectedServiceId) {
          throw new Error("Please select a service or package before continuing.");
        }
        if (!isTermsAgreed) {
          throw new Error("Please agree to the terms before continuing.");
        }

        await applySelectedOffer(documentId);
        setCurrentStep(4);
        return;
      }

      if (currentStep === 4) {
        if (!documentId) {
          throw new Error("Draft document is missing. Please restart the flow.");
        }
        if (!isReviewConfirmed) {
          throw new Error("Please confirm your review details before submitting.");
        }

        if (isPackageSelected && !isPackagePaymentDone) {
          setShowCheckoutModal(true);
          return;
        }

        await apiRequest<DocumentRow>("/api/client/documents/submit", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ documentId })
        });

        setCurrentStep(5);
      }
    } catch (error) {
      setActionError(error instanceof Error ? error.message : "Something went wrong. Please try again.");
    } finally {
      setIsBusy(false);
    }
  };

  const wordCountLabel = wordCount > 0 ? `${wordCount.toLocaleString()} words` : "Not calculated yet";
  const selectedRate = Number(selectedService?.ratePerWord ?? 0);
  const packagePrice = Number(selectedService?.basePrice ?? 0);
  const activeRate = Number(ratePerWord > 0 ? ratePerWord : selectedRate);
  const liveEstimate = Number(
    selectedService?.kind === "package" ? estimatedTotal || packagePrice || 0 : estimatedTotal || wordCount * activeRate || 0
  );
  const serviceOptions = services.filter((item) => item.kind === "service");
  const packageOptions = services.filter((item) => item.kind === "package");
  const activeStepMeta = steps[currentStep - 1] ?? steps[0];

  return (
    <div className="w-full font-dm-sans bg-white min-h-[calc(100vh-76px)] flex flex-col">
      <div className="shrink-0 border-b py-4 border-gray-100 px-4">
        <h1 className="text-[22px] font-medium text-[#1C1C1D] mb-1.5 tracking-tight">Submit New Document</h1>
        <p className="text-[#78788D] text-[14px]">Easily upload your document in just a few steps.</p>
      </div>

      <div className="mx-auto w-full px-4 sm:px-6 lg:px-8 py-6 sm:py-8 lg:py-10 flex-1 flex flex-col">
        <div className="mb-8 sm:mb-12">
          <div className="relative flex justify-between w-full">
            <div className="absolute top-[33px] sm:top-[41px] left-[8%] sm:left-[10%] right-[8%] sm:right-[10%] h-[1px] bg-[#EAECF0] z-0">
              <div
                className="h-full bg-[#00A0E3] transition-all duration-300 ease-in-out"
                style={{ width: `${((currentStep - 1) / (steps.length - 1)) * 100}%` }}
              />
            </div>

            {steps.map((step) => {
              const isActive = currentStep === step.num;
              const isCompleted = currentStep > step.num;

              return (
                <div key={step.num} className="flex flex-col items-center relative z-10 w-[60px] min-[420px]:w-[72px] sm:w-[140px]">
                  <span
                    className={`text-[12px] tracking-[0.06em] mb-3 font-medium uppercase ${
                      isActive ? "text-[#00A0E3]" : "text-[#7E8095]"
                    }`}
                  >
                    Step {step.num}
                  </span>

                  <div
                    className={`w-[28px] h-[28px] sm:w-[26px] sm:h-[26px] rounded-full bg-white flex items-center justify-center mb-3 transition-all duration-200 ${
                      isActive
                        ? "border-[2px] border-[#00A0E3]"
                        : isCompleted
                          ? "border-[2px] border-[#00A0E3] bg-[#00A0E3]"
                          : "border border-[#EAECF0]"
                    }`}
                  >
                    {isActive ? <div className="w-[12px] h-[12px] bg-[#00A0E3] rounded-full" /> : null}
                    {isCompleted ? <Check className="w-3.5 h-3.5 text-white" strokeWidth={3} /> : null}
                  </div>

                  <span
                    className={`hidden sm:block text-[14px] text-center transition-colors duration-200 ${
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

          <div className="sm:hidden mt-4 text-[18px] font-medium text-[#00A0E3]">{activeStepMeta.name}</div>
        </div>

        {actionError ? (
          <div className="mb-5 border border-[#FECACA] bg-[#FEF2F2] text-[#B91C1C] rounded-[8px] px-4 py-3 text-[13px]">
            {actionError}
          </div>
        ) : null}

        {currentStep === 1 ? (
          <div className="flex flex-col gap-6 flex-1">
            <div className="flex flex-col gap-2">
              <label className="text-[14px] font-medium text-[#171717]">Document Title</label>
              <input
                type="text"
                value={form.documentTitle}
                onChange={(e) => setForm((prev) => ({ ...prev, documentTitle: e.target.value }))}
                placeholder="e.g. Analysis of Macroeconomic Trends in Emerging Markets"
                className="w-full border border-[#EAECF0] rounded-[8px] px-4 py-3 text-[14px] text-[#171717] placeholder:text-[#A0AAB5] focus:outline-none focus:border-[#00A0E3] focus:ring-1 focus:ring-[#00A0E3] transition-all"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="flex flex-col gap-2">
                <label className="text-[14px] font-medium text-[#171717]">Academic Field / Subject</label>
                <input
                  type="text"
                  value={form.academicField}
                  onChange={(e) => setForm((prev) => ({ ...prev, academicField: e.target.value }))}
                  placeholder="e.g. Computer Science"
                  className="w-full border border-[#EAECF0] rounded-[8px] px-4 py-3 text-[14px] text-[#171717] placeholder:text-[#A0AAB5] focus:outline-none focus:border-[#00A0E3] focus:ring-1 focus:ring-[#00A0E3] transition-all"
                />
              </div>

              <div className="flex flex-col gap-2">
                <label className="text-[14px] font-medium text-[#171717]">Document Type</label>
                <input
                  type="text"
                  value={form.documentType}
                  onChange={(e) => setForm((prev) => ({ ...prev, documentType: e.target.value }))}
                  placeholder="e.g. Journal Article"
                  className="w-full border border-[#EAECF0] rounded-[8px] px-4 py-3 text-[14px] text-[#171717] placeholder:text-[#A0AAB5] focus:outline-none focus:border-[#00A0E3] focus:ring-1 focus:ring-[#00A0E3] transition-all"
                />
              </div>
            </div>

            <div className="flex flex-col gap-2">
              <label className="text-[14px] font-medium text-[#171717]">Word Count</label>
              <input
                type="text"
                value={wordCountLabel}
                readOnly
                className="w-full border border-[#EAECF0] bg-[#FAFAFB] rounded-[8px] px-4 py-3 text-[14px] text-[#8A94A6] cursor-not-allowed focus:outline-none"
              />
              <div className="flex items-center gap-1.5 mt-0.5">
                <Info className="w-3.5 h-3.5 text-[#8A94A6]" strokeWidth={2.5} />
                <span className="text-[12px] text-[#8A94A6]">Word count is calculated from your uploaded file in step 2.</span>
              </div>
            </div>

            <div className="flex flex-col gap-2">
              <label className="text-[14px] font-medium text-[#171717]">Short Description</label>
              <textarea
                value={form.shortDescription}
                onChange={(e) => setForm((prev) => ({ ...prev, shortDescription: e.target.value.slice(0, 500) }))}
                placeholder="Briefly describe the context or specific requirements for the editor..."
                className="w-full border border-[#EAECF0] rounded-[8px] px-4 py-3 text-[14px] text-[#171717] placeholder:text-[#A0AAB5] focus:outline-none focus:border-[#00A0E3] focus:ring-1 focus:ring-[#00A0E3] transition-all min-h-[140px] resize-y"
              />
              <div className="flex justify-end">
                <span className="text-[12px] text-[#A0AAB5]">{form.shortDescription.length}/500 characters</span>
              </div>
            </div>
          </div>
        ) : null}

        {currentStep === 2 ? (
          <div className="flex flex-col flex-1 w-full min-h-[340px] sm:min-h-[400px]">
            <input
              type="file"
              ref={fileInputRef}
              onChange={handleFileChange}
              className="hidden"
              accept=".doc,.docx,.pdf"
            />

            {!uploadedFile ? (
              <div
                className="flex-1 w-full border-[2px] border-dashed border-[#EAECF0] rounded-[16px] bg-[#FAFAFB] flex flex-col items-center justify-center p-6 sm:p-10 md:p-12 transition-colors hover:bg-[#F4F5F7] hover:border-[#D1D5DB] cursor-pointer group text-center"
                onClick={handleBrowseClick}
                onDragOver={(e) => e.preventDefault()}
                onDrop={handleDrop}
              >
                <div className="w-[48px] h-[48px] bg-[#EAEFF4] rounded-[8px] flex items-center justify-center mb-5 shadow-sm group-hover:shadow transition-shadow">
                  <Upload className="w-5 h-5 text-[#525866]" strokeWidth={2.5} />
                </div>

                <p className="text-[#171717] text-[15px] font-medium mb-2 max-w-[440px]">Drag and drop your document here or click to browse files</p>

                <p className="text-[#8A94A6] text-[13px] max-w-[440px]">Supported formats: DOC, DOCX, PDF. Maximum file size: 25MB.</p>
              </div>
            ) : (
              <div className="w-full space-y-4">
                <div className="w-full border border-[#EAECF0] bg-[#F4FAFD] rounded-[8px] p-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                  <div className="flex items-center gap-4 min-w-0">
                    <div className="w-[40px] h-[40px] bg-[#E1F4FD] rounded-[8px] flex items-center justify-center shrink-0">
                      <FileIcon className="w-5 h-5 text-[#00A0E3]" strokeWidth={2} />
                    </div>
                    <div className="flex flex-col min-w-0">
                      <span className="text-[14px] font-medium text-[#171717] truncate max-w-[180px] min-[420px]:max-w-[260px] sm:max-w-[400px]">{uploadedFile.name}</span>
                      <span className="text-[12px] text-[#8A94A6]">{formatFileSize(uploadedFile.size)}</span>
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={handleRemoveFile}
                    className="text-[#FF4D4F] text-[13px] font-medium hover:underline transition-all"
                  >
                    Remove
                  </button>
                </div>

                <div className="border border-[#EAECF0] rounded-[10px] p-4 bg-white">
                  <div className="text-[13px] font-semibold text-[#171717] mb-3">Upload Analysis</div>
                  {uploadingFile ? (
                    <p className="text-[13px] text-[#8A94A6]">Analyzing word count and pricing...</p>
                  ) : (
                    <div className="grid grid-cols-1 gap-3 text-[13px]">
                      <div className="bg-[#F8FAFC] border border-[#EAECF0] rounded-[8px] px-3 py-2">
                        <div className="text-[#8A94A6] text-[12px]">Word Count</div>
                        <div className="text-[#171717] font-semibold mt-0.5">{wordCount > 0 ? wordCount.toLocaleString() : "Pending"}</div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        ) : null}

        {currentStep === 3 ? (
          <div className="flex flex-col flex-1 w-full gap-6">
            {servicesLoading ? <p className="text-[14px] text-[#78788D]">Loading available services and packages...</p> : null}

            {!servicesLoading && services.length === 0 ? (
              <div className="border border-[#FEE2E2] bg-[#FFF7F7] text-[#B42318] rounded-[8px] p-4 text-[13px]">
                No active services or packages are available right now. Please contact support.
              </div>
            ) : null}

            {!servicesLoading && services.length > 0 ? (
              <div className="space-y-6">
                {serviceOptions.length > 0 ? (
                  <div className="space-y-3">
                    <div className="text-[14px] font-semibold text-[#171717]">Services (pay later)</div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                      {serviceOptions.map((service) => {
                        const isSelected = selectedServiceId === service.id;
                        return (
                          <button
                            key={service.id}
                            type="button"
                            onClick={() => setSelectedServiceId(service.id)}
                            className={`text-left border rounded-[12px] p-6 transition-all duration-200 ${
                              isSelected ? "border-[#00A0E3] bg-[#F4FAFD]" : "border-[#EAECF0] bg-white hover:border-[#D1D5DB]"
                            }`}
                          >
                            <div className="flex justify-between items-start mb-4 gap-4">
                              <div>
                                <span className="inline-flex mb-2 rounded-full bg-[#EFF8FF] px-2 py-1 text-[11px] font-semibold text-[#0369A1]">
                                  Service
                                </span>
                                <p className="text-[16px] font-medium text-[#171717]">{service.title}</p>
                                <p className="text-[13px] text-[#8A94A6] mt-1">
                                  Rate per word: {formatCurrency(Number(service.ratePerWord ?? 0))}
                                </p>
                              </div>
                              <div
                                className={`w-5 h-5 rounded-full border-[2px] flex items-center justify-center shrink-0 mt-0.5 ${
                                  isSelected ? "border-[#00A0E3]" : "border-[#EAECF0]"
                                }`}
                              >
                                {isSelected ? <div className="w-2.5 h-2.5 bg-[#00A0E3] rounded-full" /> : null}
                              </div>
                            </div>

                            <p className="text-[13px] text-[#525866] leading-relaxed">
                              Current estimate: {wordCount > 0 ? formatCurrency(wordCount * Number(service.ratePerWord ?? 0)) : "Upload a file to see estimate"}
                            </p>
                          </button>
                        );
                      })}
                    </div>
                  </div>
                ) : null}

                {packageOptions.length > 0 ? (
                  <div className="space-y-3">
                    <div className="text-[14px] font-semibold text-[#171717]">Packages (upfront payment required)</div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                      {packageOptions.map((service) => {
                        const isSelected = selectedServiceId === service.id;
                        return (
                          <button
                            key={service.id}
                            type="button"
                            onClick={() => setSelectedServiceId(service.id)}
                            className={`text-left border rounded-[12px] p-6 transition-all duration-200 ${
                              isSelected ? "border-[#00A0E3] bg-[#F4FAFD]" : "border-[#EAECF0] bg-white hover:border-[#D1D5DB]"
                            }`}
                          >
                            <div className="flex justify-between items-start mb-4 gap-4">
                              <div>
                                <span className="inline-flex mb-2 rounded-full bg-[#FFF7ED] px-2 py-1 text-[11px] font-semibold text-[#C2410C]">
                                  Package
                                </span>
                                <p className="text-[16px] font-medium text-[#171717]">{service.title}</p>
                                <p className="text-[13px] text-[#8A94A6] mt-1">
                                  Flat price: {formatCurrency(Number(service.basePrice || service.ratePerWord || 0))}
                                </p>
                              </div>
                              <div
                                className={`w-5 h-5 rounded-full border-[2px] flex items-center justify-center shrink-0 mt-0.5 ${
                                  isSelected ? "border-[#00A0E3]" : "border-[#EAECF0]"
                                }`}
                              >
                                {isSelected ? <div className="w-2.5 h-2.5 bg-[#00A0E3] rounded-full" /> : null}
                              </div>
                            </div>

                            <p className="text-[13px] text-[#525866] leading-relaxed">
                              Pay now to start processing this package.
                            </p>
                          </button>
                        );
                      })}
                    </div>
                  </div>
                ) : null}
              </div>
            ) : null}

            <div className="mt-2 border border-[#EAECF0] bg-[#FAFAFB] rounded-[8px] p-4 flex items-center gap-3">
              <div className="flex items-center h-5 mt-0.5">
                <input
                  type="checkbox"
                  checked={isTermsAgreed}
                  onChange={(e) => setIsTermsAgreed(e.target.checked)}
                  className="w-[18px] h-[18px] border-[#EAECF0] rounded-[4px] text-[#00A0E3] focus:ring-[#00A0E3] cursor-pointer accent-[#00A0E3]"
                />
              </div>
              <label className="text-[#171717] text-[14px] cursor-pointer" onClick={() => setIsTermsAgreed((prev) => !prev)}>
                I understand what is included in this selected offer and agree to the terms of engagement.
              </label>
            </div>
          </div>
        ) : null}

        {currentStep === 4 ? (
          <div className="flex flex-col gap-8 flex-1 w-full">
            <div className="flex flex-col gap-5">
              <div className="flex items-center gap-2.5">
                <div className="text-[#00A0E3]">
                  <FileText className="w-5 h-5" strokeWidth={2} />
                </div>
                <h2 className="text-[16px] font-medium text-[#171717]">Document Summary</h2>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-y-6 gap-x-12">
                <div className="flex flex-col gap-6">
                  <div className="flex flex-col gap-1">
                    <span className="text-[13px] text-[#8A94A6]">Document Title</span>
                    <span className="text-[14px] font-medium text-[#171717]">{form.documentTitle || "-"}</span>
                  </div>
                  <div className="flex flex-col gap-1">
                    <span className="text-[13px] text-[#8A94A6]">Document Type</span>
                    <span className="text-[14px] font-medium text-[#171717]">{form.documentType || "-"}</span>
                  </div>
                  <div className="flex flex-col gap-1">
                    <span className="text-[13px] text-[#8A94A6]">Short Description</span>
                    <p className="text-[14px] font-medium text-[#171717] leading-relaxed pr-4">{form.shortDescription || "-"}</p>
                  </div>
                </div>

                <div className="flex flex-col gap-6">
                  <div className="flex flex-col gap-1">
                    <span className="text-[13px] text-[#8A94A6]">Academic Field / Subject</span>
                    <span className="text-[14px] font-medium text-[#171717]">{form.academicField || "-"}</span>
                  </div>
                  <div className="flex flex-col gap-1">
                    <span className="text-[13px] text-[#8A94A6]">Offer Selected</span>
                    <span className="text-[14px] font-medium text-[#171717]">{selectedService?.title || "-"}</span>
                  </div>
                  <div className="flex flex-col gap-1">
                    <span className="text-[13px] text-[#8A94A6]">Offer Type</span>
                    <span className="text-[14px] font-medium text-[#171717]">
                      {selectedService?.kind === "package" ? "Package (upfront payment)" : "Service (deferred payment)"}
                    </span>
                  </div>
                  <div className="flex flex-col gap-1">
                    <span className="text-[13px] text-[#8A94A6]">Uploaded Document</span>
                    <div className="w-full bg-[#F4FAFD] rounded-[8px] p-3 flex items-center gap-3 mt-1">
                      <div className="w-[36px] h-[36px] bg-[#E1F4FD] rounded-[6px] flex items-center justify-center shrink-0">
                        <FileIcon className="w-4 h-4 text-[#00A0E3]" strokeWidth={2} />
                      </div>
                      <div className="flex flex-col">
                        <span className="text-[13px] font-medium text-[#171717] truncate">{uploadedFileName || "No file uploaded"}</span>
                        <span className="text-[12px] text-[#8A94A6]">{uploadedFileSize > 0 ? formatFileSize(uploadedFileSize) : "-"}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex flex-col gap-5 mt-2">
              <div className="flex items-center gap-2.5">
                <div className="text-[#00A0E3]">
                  <Users className="w-5 h-5" strokeWidth={2} />
                </div>
                <h2 className="text-[16px] font-medium text-[#171717]">Word Count & Pricing Breakdown</h2>
              </div>

              <div className="border bg-[#EFF7FB] border-[#0396d6] rounded-[12px] p-4 flex flex-col gap-4">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                  <span className="text-[#8A94A6] text-[14px]">Our academic experts verify your submission and select the best editor.</span>
                  <span className="text-[#171717] text-[14px] font-medium sm:text-right">
                    {selectedService?.kind === "package" ? "Package" : `${wordCount.toLocaleString()} Words`}
                  </span>
                </div>
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1">
                  <span className="text-[#8A94A6] text-[14px]">
                    {selectedService?.kind === "package" ? "Package price" : "Rate per word"}
                  </span>
                  <span className="text-[#171717] text-[14px] font-medium sm:text-right">
                    {selectedService?.kind === "package" ? formatCurrency(liveEstimate) : formatCurrency(activeRate)}
                  </span>
                </div>

                <div className="w-full h-[1px] bg-[#00A0E3]/30 my-2" />

                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1.5">
                  <span className="text-[#171717] text-[18px] font-medium">Estimated Total</span>
                  <span className="text-[#00A0E3] text-[20px] font-medium">{formatCurrency(liveEstimate)}</span>
                </div>
                <span className="text-[#8A94A6] text-[12px] italic mt-[-8px]">
                  * Final price will be confirmed after review, if necessary. Changes in word count or specialized requirements may affect the final quote.
                </span>
                {isPackageSelected ? (
                  <span className="text-[12px] text-[#0C4A6E]">
                    Upfront package payment is required before your document can be submitted for processing.
                  </span>
                ) : null}
                {isPackageSelected && isPackagePaymentDone ? (
                  <span className="text-[12px] text-[#15803D]">Payment completed. You can now submit your document.</span>
                ) : null}
              </div>
            </div>

            <div className="mt-2 border border-[#EAECF0] rounded-[8px] p-4 flex items-center gap-3">
              <div className="flex items-center h-5 mt-0.5">
                <input
                  type="checkbox"
                  checked={isReviewConfirmed}
                  onChange={(e) => setIsReviewConfirmed(e.target.checked)}
                  className="w-[18px] h-[18px] border-[#EAECF0] rounded-[4px] text-[#00A0E3] focus:ring-[#00A0E3] cursor-pointer accent-[#00A0E3]"
                />
              </div>
              <label className="text-[#171717] text-[14px] cursor-pointer" onClick={() => setIsReviewConfirmed((prev) => !prev)}>
                I confirm that all information provided above is correct and I have uploaded the correct version of my document for editing.
              </label>
            </div>
          </div>
        ) : null}

        {currentStep === 5 ? (
          <div className="flex flex-col items-center justify-center flex-1 w-full relative py-8 lg:py-12 overflow-hidden">
            <img
              src="/images/party-left.svg"
              alt="Success Confetti Left"
              className="absolute -left-28 sm:-left-40 lg:-left-60 top-[8%] w-[220px] sm:w-[300px] lg:w-[700px] h-auto pointer-events-none z-0 opacity-100 scale-x-[-1]"
            />
            <img
              src="/images/party-right.svg"
              alt="Success Confetti Right"
              className="absolute -right-28 sm:-right-16 lg:right-32 top-[8%] w-[220px] sm:w-[300px] lg:w-[700px] h-auto pointer-events-none z-0 opacity-100"
            />

            <div className="relative z-10 flex flex-col items-center text-center w-full max-w-[520px]">
              <div className="relative w-[72px] h-[72px] rounded-full flex items-center justify-center bg-[#E1F4FD] mb-6 shadow-[0_0_20px_rgba(0,160,227,0.1)]">
                <div className="w-[44px] h-[44px] rounded-full bg-white flex items-center justify-center shadow-sm">
                  <div className="w-6 h-6 bg-[#00A0E3] rounded-full flex items-center justify-center">
                    <Check className="w-3.5 h-3.5 text-white" strokeWidth={4} />
                  </div>
                </div>
              </div>

              <h2 className="text-[20px] lg:text-[24px] font-semibold text-[#171717] mb-2 tracking-tight">Your document has been submitted successfully.</h2>
              <p className="text-[#8A94A6] text-[15px] mb-8 leading-relaxed">
                We are reviewing your document and will notify you once the next step is ready.
              </p>

              <div className="w-full border border-[#EAECF0] bg-[#FAFAFB] rounded-[16px] p-5 sm:p-6 lg:p-8 text-left shadow-sm">
                <h3 className="text-[16px] font-semibold text-[#171717] mb-5">What Happens Next</h3>
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
                    <span className="leading-relaxed">You will receive a notification when updates are ready.</span>
                  </li>
                </ul>
              </div>

              <div className="mt-8 w-full grid grid-cols-1 sm:grid-cols-2 gap-3 lg:hidden">
                <button
                  type="button"
                  onClick={() => router.push("/user/dashboard")}
                  className="w-full px-6 py-2.5 border border-[#D0D5DD] bg-white hover:bg-[#F9FAFB] text-[#171717] rounded-[10px] text-[14px] font-semibold transition-colors"
                >
                  Go to Dashboard
                </button>
                <button
                  type="button"
                  onClick={() => router.push(documentId ? `/user/documents/${documentId}` : "/user/documents")}
                  className="w-full px-6 py-2.5 bg-[#00A0E3] hover:bg-[#008bc5] text-white rounded-[10px] text-[14px] font-semibold transition-colors inline-flex items-center justify-center gap-2"
                >
                  View Document
                  <ArrowRight className="w-4 h-4" strokeWidth={2.5} />
                </button>
              </div>

              <button
                type="button"
                onClick={() => router.push("/user/documents")}
                className="mt-8 hidden lg:inline-flex px-6 py-2.5 bg-[#00A0E3] hover:bg-[#008bc5] text-white rounded-[8px] text-[14px] font-bold transition-colors shadow-sm"
              >
                Go to My Documents
              </button>
            </div>
          </div>
        ) : null}
      </div>

      {currentStep < 5 ? (
        <div className="sticky bottom-0 z-20 md:static border-t border-[#EAECF0] bg-white px-4 sm:px-6 lg:px-12 py-4 sm:py-5 pb-[calc(16px+env(safe-area-inset-bottom))] sm:pb-5 flex items-center justify-between gap-3 shrink-0 mt-auto">
          {currentStep === 1 ? (
            <button
              type="button"
              onClick={() => router.push("/user/dashboard")}
              disabled={isBusy}
              className="px-5 sm:px-6 py-2.5 border border-[#EAECF0] rounded-[10px] text-[15px] sm:text-[14px] font-bold text-[#171717] hover:bg-[#F9FAFB] transition-colors shadow-[0_1px_2px_rgba(0,0,0,0.02)] disabled:opacity-60"
            >
              Cancel
            </button>
          ) : (
            <button
              type="button"
              onClick={handleBack}
              disabled={isBusy}
              className="px-5 sm:px-6 py-2.5 border border-[#EAECF0] rounded-[10px] text-[15px] sm:text-[14px] font-bold text-[#171717] hover:bg-[#F9FAFB] transition-colors shadow-[0_1px_2px_rgba(0,0,0,0.02)] flex items-center gap-2 disabled:opacity-60"
            >
              <ArrowLeft className="w-4 h-4" strokeWidth={2.5} /> Back
            </button>
          )}

          <button
            type="button"
            onClick={moveToNextStep}
            disabled={isBusy || uploadingFile || (currentStep === 1 && !canMoveFromStep1) || (currentStep === 3 && services.length === 0)}
            className="min-w-[142px] px-5 sm:px-6 py-2.5 bg-[#00A0E3] hover:bg-[#008bc5] text-white rounded-[10px] text-[15px] sm:text-[14px] font-bold flex items-center justify-center gap-2 transition-colors shadow-sm disabled:opacity-60 disabled:cursor-not-allowed"
          >
            {currentStep === 4
              ? isBusy
                ? "Submitting..."
                : isPackageSelected
                  ? isPackagePaymentDone
                    ? "Submit"
                    : "Proceed to Payment"
                  : "Submit"
              : isBusy
                ? "Please wait..."
                : "Continue"}
            {currentStep < 4 && !isBusy ? <ArrowRight className="w-4 h-4" strokeWidth={2.5} /> : null}
          </button>
        </div>
      ) : null}

      <MockCheckoutModal
        isOpen={showCheckoutModal}
        onClose={() => setShowCheckoutModal(false)}
        context={
          showCheckoutModal && documentId
            ? {
                documentId,
                documentTitle: form.documentTitle || uploadedFileName || "Selected Document",
                amount: liveEstimate,
                requireUpfrontPayment: true
              }
            : null
        }
        onSuccess={async () => {
          setIsPackagePaymentDone(true);
          setShowCheckoutModal(false);
        }}
      />
    </div>
  );
}

export default function SubmitDocumentPage() {
  return (
    <Suspense
      fallback={
        <div className="w-full font-dm-sans bg-white min-h-[calc(100vh-76px)] flex items-center justify-center">
          <p className="text-[14px] text-[#78788D]">Loading submit flow...</p>
        </div>
      }
    >
      <SubmitDocumentContent />
    </Suspense>
  );
}