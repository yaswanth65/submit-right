import mammoth from "mammoth";
import { PDFParse } from "pdf-parse";
import WordExtractor from "word-extractor";
import { env } from "@/lib/env";
import { supabaseAdmin } from "@/lib/supabase";

export function countWords(text: string) {
  return text
    .trim()
    .split(/\s+/)
    .filter(Boolean).length;
}

export async function extractWordCount(file: File) {
  const buffer = Buffer.from(await file.arrayBuffer());
  const fileName = file.name.toLowerCase();

  if (fileName.endsWith(".docx")) {
    const result = await mammoth.extractRawText({ buffer });
    return countWords(result.value);
  }

  if (fileName.endsWith(".pdf")) {
    const parser = new PDFParse({ data: buffer });
    const result = await parser.getText();
    await parser.destroy();
    return countWords(result.text);
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
  const allowed = [
    "application/msword",
    "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
    "application/pdf"
  ];

  if (!allowed.includes(file.type)) {
    throw new Error("Only DOC, DOCX, and PDF files are allowed");
  }

  if (file.size > maxBytes) {
    throw new Error("File size must be 25MB or less");
  }
}

export async function uploadDocumentFile(path: string, file: File) {
  const bytes = Buffer.from(await file.arrayBuffer());

  const { data, error } = await supabaseAdmin.storage
    .from(env.SUPABASE_STORAGE_BUCKET)
    .upload(path, bytes, {
      contentType: file.type,
      upsert: true
    });

  if (error) {
    throw error;
  }

  const { data: publicUrl } = supabaseAdmin.storage
    .from(env.SUPABASE_STORAGE_BUCKET)
    .getPublicUrl(data.path);

  return { path: data.path, publicUrl: publicUrl.publicUrl };
}
