"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import {
  Bot,
  FileText,
  Loader2,
  Send,
  Upload,
  User,
  Wifi,
  WifiOff,
} from "lucide-react";
import {
  askQuestion,
  checkHealth,
  uploadDocument,
  type Source,
} from "@/lib/api";

type Message = {
  id: string;
  role: "user" | "assistant";
  content: string;
  sources?: Source[];
};

const SUGGESTIONS = [
  "Quelle est la politique de teletravail ?",
  "Combien de jours de conges payes ?",
  "Quelles regles de securite informatique ?",
];

export default function Home() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "welcome",
      role: "assistant",
      content:
        "Bonjour ! Uploade un PDF ou TXT a gauche, puis pose-moi des questions sur tes documents. Je reponds uniquement a partir de leur contenu.",
    },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [apiOnline, setApiOnline] = useState<boolean | null>(null);
  const [uploadStatus, setUploadStatus] = useState<string | null>(null);
  const bottomRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    checkHealth().then(setApiOnline);
    const interval = setInterval(() => checkHealth().then(setApiOnline), 10000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, loading]);

  const handleUpload = useCallback(async (file: File) => {
    setUploading(true);
    setUploadStatus(null);
    try {
      const result = await uploadDocument(file);
      setUploadStatus(result.message);
      setMessages((prev) => [
        ...prev,
        {
          id: crypto.randomUUID(),
          role: "assistant",
          content: `Document "${result.filename}" indexe avec succes (${result.chunks_indexed} morceaux). Tu peux poser des questions dessus.`,
        },
      ]);
    } catch (e) {
      setUploadStatus(e instanceof Error ? e.message : "Erreur upload");
    } finally {
      setUploading(false);
    }
  }, []);

  const handleAsk = useCallback(
    async (question: string) => {
      if (!question.trim() || loading) return;

      const userMsg: Message = {
        id: crypto.randomUUID(),
        role: "user",
        content: question.trim(),
      };
      setMessages((prev) => [...prev, userMsg]);
      setInput("");
      setLoading(true);

      try {
        const response = await askQuestion(question.trim());
        setMessages((prev) => [
          ...prev,
          {
            id: crypto.randomUUID(),
            role: "assistant",
            content: response.answer,
            sources: response.sources,
          },
        ]);
      } catch (e) {
        setMessages((prev) => [
          ...prev,
          {
            id: crypto.randomUUID(),
            role: "assistant",
            content:
              e instanceof Error
                ? e.message
                : "Erreur. Verifie que l'API tourne (lancer-api.bat).",
          },
        ]);
      } finally {
        setLoading(false);
      }
    },
    [loading],
  );

  return (
    <div className="flex min-h-screen flex-col">
      <header className="border-b border-border bg-surface/80 px-6 py-4 backdrop-blur">
        <div className="mx-auto flex max-w-6xl items-center justify-between">
          <div>
            <h1 className="text-xl font-bold">
              RAG Enterprise
              <span className="text-accent">.</span>
            </h1>
            <p className="text-sm text-muted">Base de connaissances IA</p>
          </div>
          <div
            className={`flex items-center gap-2 rounded-full px-3 py-1 text-xs font-medium ${
              apiOnline
                ? "bg-emerald-500/15 text-emerald-400"
                : "bg-red-500/15 text-red-400"
            }`}
          >
            {apiOnline ? <Wifi size={14} /> : <WifiOff size={14} />}
            {apiOnline === null
              ? "Verification..."
              : apiOnline
                ? "API connectee"
                : "API hors ligne — lance lancer-api.bat"}
          </div>
        </div>
      </header>

      <div className="mx-auto flex w-full max-w-6xl flex-1 flex-col gap-6 p-6 lg:flex-row">
        {/* Panneau upload */}
        <aside className="w-full shrink-0 lg:w-72">
          <div className="rounded-2xl border border-border bg-surface p-5">
            <h2 className="mb-3 flex items-center gap-2 text-sm font-semibold">
              <Upload size={16} className="text-accent" />
              Documents
            </h2>
            <input
              ref={fileInputRef}
              type="file"
              accept=".pdf,.txt"
              className="hidden"
              onChange={(e) => {
                const file = e.target.files?.[0];
                if (file) handleUpload(file);
                e.target.value = "";
              }}
            />
            <button
              type="button"
              disabled={uploading || !apiOnline}
              onClick={() => fileInputRef.current?.click()}
              className="flex w-full items-center justify-center gap-2 rounded-xl border border-dashed border-border py-8 text-sm text-muted transition-colors hover:border-accent hover:text-accent disabled:opacity-50"
            >
              {uploading ? (
                <Loader2 size={18} className="animate-spin" />
              ) : (
                <FileText size={18} />
              )}
              {uploading ? "Indexation..." : "PDF ou TXT"}
            </button>
            {uploadStatus && (
              <p className="mt-3 text-xs text-muted">{uploadStatus}</p>
            )}
            <p className="mt-4 text-xs leading-relaxed text-muted">
              Chaque fichier est decoupe, vectorise et stocke dans ChromaDB pour
              la recherche semantique.
            </p>
          </div>
        </aside>

        {/* Chat */}
        <main className="flex min-h-[60vh] flex-1 flex-col rounded-2xl border border-border bg-surface">
          <div className="flex-1 space-y-4 overflow-y-auto p-6">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex gap-3 ${msg.role === "user" ? "flex-row-reverse" : ""}`}
              >
                <div
                  className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-lg ${
                    msg.role === "user"
                      ? "bg-accent/20 text-accent"
                      : "bg-border text-muted"
                  }`}
                >
                  {msg.role === "user" ? <User size={16} /> : <Bot size={16} />}
                </div>
                <div
                  className={`max-w-[85%] rounded-2xl px-4 py-3 text-sm leading-relaxed ${
                    msg.role === "user"
                      ? "bg-accent text-white"
                      : "bg-background text-foreground"
                  }`}
                >
                  <p className="whitespace-pre-wrap">{msg.content}</p>
                  {msg.sources && msg.sources.length > 0 && (
                    <div className="mt-3 border-t border-border pt-3">
                      <p className="mb-2 text-xs font-semibold text-accent">
                        Sources ({msg.sources.length})
                      </p>
                      {msg.sources.map((src, i) => (
                        <p key={i} className="mb-1 text-xs text-muted">
                          {src.source}
                          {src.page != null ? ` (p.${src.page + 1})` : ""} —{" "}
                          {src.excerpt.slice(0, 100)}...
                        </p>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            ))}
            {loading && (
              <div className="flex gap-3">
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-border">
                  <Loader2 size={16} className="animate-spin text-accent" />
                </div>
                <div className="rounded-2xl bg-background px-4 py-3 text-sm text-muted">
                  Recherche dans les documents...
                </div>
              </div>
            )}
            <div ref={bottomRef} />
          </div>

          {messages.length <= 1 && (
            <div className="flex flex-wrap gap-2 px-6 pb-2">
              {SUGGESTIONS.map((s) => (
                <button
                  key={s}
                  type="button"
                  onClick={() => handleAsk(s)}
                  className="rounded-full border border-border px-3 py-1 text-xs text-muted transition-colors hover:border-accent hover:text-accent"
                >
                  {s}
                </button>
              ))}
            </div>
          )}

          <form
            className="flex gap-3 border-t border-border p-4"
            onSubmit={(e) => {
              e.preventDefault();
              handleAsk(input);
            }}
          >
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Pose une question sur tes documents..."
              disabled={loading || !apiOnline}
              className="flex-1 rounded-xl border border-border bg-background px-4 py-3 text-sm outline-none focus:border-accent disabled:opacity-50"
            />
            <button
              type="submit"
              disabled={loading || !input.trim() || !apiOnline}
              className="flex h-12 w-12 items-center justify-center rounded-xl bg-accent text-white transition-colors hover:bg-accent-hover disabled:opacity-50"
            >
              <Send size={18} />
            </button>
          </form>
        </main>
      </div>
    </div>
  );
}
