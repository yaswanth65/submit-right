import path from "node:path";
import { pathToFileURL } from "node:url";
import mammoth from "mammoth";
import WordExtractor from "word-extractor";
import { env } from "@/lib/env";
import { supabaseAdmin } from "@/lib/supabase";

let isPdfWorkerConfigured = false;

type PdfParserInstance = {
  getText: () => Promise<{ text: string }>;
  destroy: () => Promise<void> | void;
};

type PdfParseCtor = {
  new (input: { data: Buffer }): PdfParserInstance;
  setWorker: (workerSrc: string) => void;
};

let pdfParseCtor: PdfParseCtor | null = null;

async function loadPdfParseCtor() {
  if (pdfParseCtor) {
    return pdfParseCtor;
  }

  const mod = (await import("pdf-parse")) as { PDFParse?: PdfParseCtor };
  if (!mod.PDFParse) {
    throw new Error("PDF parser is unavailable in this runtime");
  }

  pdfParseCtor = mod.PDFParse;
  return pdfParseCtor;
}

function ensurePdfWorkerConfigured(pdfParse: PdfParseCtor) {
  if (isPdfWorkerConfigured) {
    return;
  }

  const workerPath = path.join(
    process.cwd(),
    "node_modules",
    "pdfjs-dist",
    "legacy",
    "build",
    "pdf.worker.mjs"
  );

  pdfParse.setWorker(pathToFileURL(workerPath).toString());
  isPdfWorkerConfigured = true;
}

export function countWords(text: string) {
  return text
    .trim()
    .split(/\s+/)
    .filter(Boolean).length;
}

function fallbackPdfWordCount(buffer: Buffer) {
  const source = buffer.toString("latin1");
  const chunks = source.match(/\(([^()]*)\)/g) ?? [];
  const extracted = chunks
    .map((chunk) => chunk.slice(1, -1))
    .join(" ")
    .replace(/\\[nrtbf()\\]/g, " ")
    .replace(/[^\p{L}\p{N}\s]/gu, " ")
    .replace(/\s+/g, " ")
    .trim();

  return extracted ? countWords(extracted) : 0;
}

export async function extractWordCount(file: File) {
  const buffer = Buffer.from(await file.arrayBuffer());
  const fileName = file.name.toLowerCase();

  if (fileName.endsWith(".docx")) {
    const result = await mammoth.extractRawText({ buffer });
    return countWords(result.value);
  }

  if (fileName.endsWith(".pdf")) {
    try {
      const PdfParse = await loadPdfParseCtor();
      ensurePdfWorkerConfigured(PdfParse);
      const parser = new PdfParse({ data: buffer });
      const result = await parser.getText();
      await parser.destroy();
      return countWords(result.text);
    } catch (error) {
      const message = error instanceof Error ? error.message : "";
      if (/DOMMatrix|ImageData|Path2D|OffscreenCanvas|Worker/i.test(message)) {
        // Production runtimes can miss some pdf.js globals; fallback keeps upload flow alive.
        return fallbackPdfWordCount(buffer);
      }
      throw error;
    }
  }

  if (fileName.endsWith(".doc")) {
    const extractor = new WordExtractor();
    const extracted = await extractor.extract(buffer);
    return countWords(extracted.getBody());
  }

  throw new Error("Unsupported file type");
}

export function validateUpload(file: File) {
  const maxBytes = 25 * 1024 * 1024;
  const allowedMimeTypes = [
    "application/msword",
    "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
    "application/pdf"
  ];
  const allowedExtensions = [".doc", ".docx", ".pdf"];
  const extension = path.extname(file.name || "").toLowerCase();

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

async function ensureStorageBucketExists() {
  const bucket = env.SUPABASE_STORAGE_BUCKET;
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
  await ensureStorageBucketExists();
  const bytes = Buffer.from(await file.arrayBuffer());
  const bucket = env.SUPABASE_STORAGE_BUCKET;

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
