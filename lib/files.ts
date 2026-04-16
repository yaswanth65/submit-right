type SupabaseAdminClient = (typeof import("@/lib/supabase"))["supabaseAdmin"];

let isPdfWorkerConfigured = false;

type PdfJsModule = Awaited<typeof import("pdfjs-dist/legacy/build/pdf.mjs")>;
type MammothModule = {
  extractRawText: (
    input: { arrayBuffer: ArrayBuffer } | { buffer: Uint8Array }
  ) => Promise<{ value: string }>;
};

let pdfJsModule: PdfJsModule | null = null;

function isServerRuntime() {
  return typeof window === "undefined";
}

function assertServerRuntime(feature: string) {
  if (!isServerRuntime()) {
    throw new Error(`${feature} is only supported in server runtime`);
  }
}

function getFileExtension(fileName: string) {
  const lastDotIndex = fileName.lastIndexOf(".");
  if (lastDotIndex < 0) {
    return "";
  }

  return fileName.slice(lastDotIndex).toLowerCase();
}

function normalizeMammothModule(mod: unknown): MammothModule {
  const resolved = (mod as { default?: unknown }).default ?? mod;
  return resolved as MammothModule;
}

async function loadPdfJsModule() {
  if (pdfJsModule) {
    return pdfJsModule;
  }

  const mod = await import("pdfjs-dist/legacy/build/pdf.mjs");
  pdfJsModule = mod;
  return mod;
}

function ensurePdfWorkerConfigured(pdfjs: PdfJsModule) {
  if (isPdfWorkerConfigured || isServerRuntime()) {
    return;
  }

  const version = typeof pdfjs.version === "string" ? pdfjs.version : "4.8.69";
  pdfjs.GlobalWorkerOptions.workerSrc = `https://cdnjs.cloudflare.com/ajax/libs/pdf.js/${version}/pdf.worker.min.mjs`;
  isPdfWorkerConfigured = true;
}

async function extractPdfText(arrayBuffer: ArrayBuffer) {
  const pdfjs = await loadPdfJsModule();
  ensurePdfWorkerConfigured(pdfjs);

  const loadingTask = pdfjs.getDocument({
    data: new Uint8Array(arrayBuffer),
    useSystemFonts: true
  });

  const pdf = await loadingTask.promise;
  const pageTexts: string[] = [];

  try {
    for (let pageNumber = 1; pageNumber <= pdf.numPages; pageNumber += 1) {
      const page = await pdf.getPage(pageNumber);
      const textContent = await page.getTextContent();
      const pageText = textContent.items
        .map((item) => {
          if ("str" in item && typeof item.str === "string") {
            return item.str;
          }
          return "";
        })
        .join(" ");

      if (pageText) {
        pageTexts.push(pageText);
      }

      page.cleanup();
    }
  } finally {
    await pdf.destroy();
  }

  return pageTexts.join(" ");
}

async function extractDocxText(arrayBuffer: ArrayBuffer) {
  const mammothImport = await import("mammoth");
  const mammoth = normalizeMammothModule(mammothImport);

  if (isServerRuntime()) {
    const { Buffer } = await import("node:buffer");
    const result = await mammoth.extractRawText({ buffer: Buffer.from(arrayBuffer) });
    return result.value;
  }

  const result = await mammoth.extractRawText({ arrayBuffer });
  return result.value;
}

async function extractDocTextServerOnly(arrayBuffer: ArrayBuffer) {
  assertServerRuntime("DOC parsing");

  const [{ Buffer }, wordExtractorImport] = await Promise.all([
    import("node:buffer"),
    import("word-extractor")
  ]);
  const WordExtractor = (wordExtractorImport as { default?: new () => { extract: (input: Uint8Array) => Promise<{ getBody: () => string }> } }).default ??
    (wordExtractorImport as new () => { extract: (input: Uint8Array) => Promise<{ getBody: () => string }> });
  const extractor = new WordExtractor();
  const extracted = await extractor.extract(Buffer.from(arrayBuffer));
  return extracted.getBody();
}

export function countWords(text: string) {
  const words = text
    .normalize("NFKC")
    .match(/[\p{L}\p{N}]+(?:[\u2019'-.][\p{L}\p{N}]+)*/gu);

  if (!words) {
    return 0;
  }

  return words.length;
}

export async function extractWordCount(file: File) {
  const arrayBuffer = await file.arrayBuffer();
  const extension = getFileExtension(file.name || "");

  if (extension === ".docx") {
    const text = await extractDocxText(arrayBuffer);
    return countWords(text);
  }

  if (extension === ".pdf") {
    const text = await extractPdfText(arrayBuffer);
    return countWords(text);
  }

  if (extension === ".doc") {
    const text = await extractDocTextServerOnly(arrayBuffer);
    return countWords(text);
  }

  throw new Error("Unsupported file type");
}

export function validateUpload(file: File) {
  const maxBytes = 25 * 1024 * 1024;
  const allowedMimeTypes = [
    "application/msword",
    "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
    "application/pdf",
    "application/x-pdf"
  ];
  const allowedExtensions = [".doc", ".docx", ".pdf"];
  const extension = getFileExtension(file.name || "");

  if (!allowedExtensions.includes(extension)) {
    throw new Error("Only DOC, DOCX, and PDF files are allowed");
  }

  const hasMimeType = typeof file.type === "string" && file.type.length > 0;
  const isGenericMime = file.type === "application/octet-stream";

  if (hasMimeType && !allowedMimeTypes.includes(file.type) && !isGenericMime) {
    throw new Error("Only DOC, DOCX, and PDF files are allowed");
  }

  if (file.size > maxBytes) {
    throw new Error("File size must be 25MB or less");
  }
}

async function loadStorageContext(): Promise<{ bucket: string; supabaseAdmin: SupabaseAdminClient }> {
  assertServerRuntime("Document upload");
  const [{ env }, { supabaseAdmin }] = await Promise.all([
    import("@/lib/env"),
    import("@/lib/supabase")
  ]);

  return { bucket: env.SUPABASE_STORAGE_BUCKET, supabaseAdmin };
}

async function ensureStorageBucketExists(
  supabaseAdmin: SupabaseAdminClient,
  bucket: string
) {
  const { data, error } = await supabaseAdmin.storage.getBucket(bucket);

  if (data && !error) {
    return;
  }

  const notFound =
    error && /not\s*found|bucket/i.test(`${error.message || ""}`);

  if (notFound) {
    const { error: createError } = await supabaseAdmin.storage.createBucket(bucket, {
      public: true,
      fileSizeLimit: "25MB"
    });

    if (!createError) {
      return;
    }

    // Ignore race when another request creates the bucket concurrently.
    if (/already exists/i.test(`${createError.message || ""}`)) {
      return;
    }

    throw createError;
  }

  if (error) {
    throw error;
  }
}

export async function uploadDocumentFile(path: string, file: File) {
  assertServerRuntime("Document upload");
  const [{ Buffer }, storage] = await Promise.all([
    import("node:buffer"),
    loadStorageContext()
  ]);
  const { bucket, supabaseAdmin } = storage;
  await ensureStorageBucketExists(supabaseAdmin, bucket);
  const bytes = Buffer.from(await file.arrayBuffer());

  const { data, error } = await supabaseAdmin.storage
    .from(bucket)
    .upload(path, bytes, {
      contentType: file.type,
      upsert: true
    });

  if (error) {
    throw new Error(`Storage upload failed for bucket '${bucket}': ${error.message}`);
  }

  const { data: publicUrl } = supabaseAdmin.storage
    .from(bucket)
    .getPublicUrl(data.path);

  return { path: data.path, publicUrl: publicUrl.publicUrl };
}
