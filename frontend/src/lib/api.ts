/**
 * api.ts — Pont entre le frontend et l'API FastAPI
 *
 * Le frontend (Next.js, port 3001) appelle le backend (FastAPI, port 8000).
 * NEXT_PUBLIC_API_URL = variable lue cote navigateur (prefixe NEXT_PUBLIC obligatoire).
 */

const API_URL = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:8000";

export type Source = {
  source: string;
  page?: number;
  excerpt: string;
};

export type AskResponse = {
  answer: string;
  sources: Source[];
};

export type UploadResponse = {
  filename: string;
  pages_loaded: number;
  chunks_indexed: number;
  message: string;
};

export async function checkHealth(): Promise<boolean> {
  try {
    const res = await fetch(`${API_URL}/health`);
    return res.ok;
  } catch {
    return false;
  }
}

export async function uploadDocument(file: File): Promise<UploadResponse> {
  const formData = new FormData();
  formData.append("file", file);

  const res = await fetch(`${API_URL}/upload`, {
    method: "POST",
    body: formData,
  });

  if (!res.ok) {
    const err = await res.text();
    throw new Error(err || "Erreur lors de l'upload");
  }

  return res.json();
}

export async function askQuestion(question: string): Promise<AskResponse> {
  const res = await fetch(`${API_URL}/ask`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ question }),
  });

  if (!res.ok) {
    const err = await res.text();
    throw new Error(err || "Erreur lors de la question");
  }

  return res.json();
}
