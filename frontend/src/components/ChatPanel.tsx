"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import {
  Bot,
  ChevronDown,
  FileText,
  Loader2,
  Send,
  Upload,
  User,
} from "lucide-react";
import {
  askQuestion,
  checkHealth,
  uploadDocument,
  type Source,
} from "@/lib/api";
import { site } from "@/lib/site";

type Message = {
  id: string;
  role: "user" | "assistant";
  content: string;
  sources?: Source[];
};

type LoadingStep = "search" | "generate" | null;

function SourceCards({ sources }: { sources: Source[] }) {
  const [open, setOpen] = useState(false);

  return (
    <div className="mt-3 border-t border-border/60 pt-3">
      <button
        type="button"
        onClick={() => setOpen(!open)}
        className="flex w-full items-center justify-between text-xs font-semibold text-accent"
      >
        {sources.length} source{sources.length > 1 ? "s" : ""}{" "}
        citée{sources.length > 1 ? "s" : ""}
        <ChevronDown
          size={14}
          className={`transition-transform ${open ? "rotate-180" : ""}`}
        />
      </button>
      {open && (
        <div className="mt-2 space-y-2">
          {sources.map((src, i) => (
            <div
              key={i}
              className="rounded-lg border border-border bg-surface/80 p-2.5 text-xs"
            >
              <p className="font-medium text-foreground">
                {src.source}
                {src.page != null ? ` — page ${src.page + 1}` : ""}
              </p>
              <p className="mt-1 text-muted">{src.excerpt}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export function ChatPanel() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "welcome",
      role: "assistant",
      content:
        "Bonjour ! Je suis l'assistant RAG Enterprise. Un document de démo (politique RH TechVision) est déjà indexé — posez une question ou uploadez votre propre PDF/TXT.",
    },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [loadingStep, setLoadingStep] = useState<LoadingStep>(null);
  const [uploading, setUploading] = useState(false);
  const [apiOnline, setApiOnline] = useState(true);
  const [uploadStatus, setUploadStatus] = useState<string | null>(null);
  const bottomRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    checkHealth().then(setApiOnline);
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
          content: `Document "${result.filename}" indexé (${result.chunks_indexed} segments). Vous pouvez poser des questions dessus.`,
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

      setMessages((prev) => [
        ...prev,
        {
          id: crypto.randomUUID(),
          role: "user",
          content: question.trim(),
        },
      ]);
      setInput("");
      setLoading(true);
      setLoadingStep("search");

      const stepTimer = setTimeout(() => setLoadingStep("generate"), 1200);

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
                : "L'API met quelques secondes à démarrer (plan gratuit Render). Réessayez.",
          },
        ]);
      } finally {
        clearTimeout(stepTimer);
        setLoading(false);
        setLoadingStep(null);
      }
    },
    [loading],
  );

  return (
    <div className="grid gap-6 lg:grid-cols-[280px_1fr]">
      <aside className="space-y-4">
        <div className="rounded-2xl border border-border bg-background p-5">
          <h3 className="mb-3 flex items-center gap-2 text-sm font-semibold">
            <Upload size={16} className="text-accent" />
            Vos documents
          </h3>
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
            className="flex w-full flex-col items-center gap-2 rounded-xl border border-dashed border-border py-8 text-sm text-muted transition-colors hover:border-accent hover:text-accent disabled:opacity-50"
          >
            {uploading ? (
              <Loader2 size={22} className="animate-spin text-accent" />
            ) : (
              <FileText size={22} />
            )}
            {uploading ? "Indexation en cours..." : "Glisser ou cliquer — PDF / TXT"}
          </button>
          {uploadStatus && (
            <p className="mt-3 text-xs text-muted">{uploadStatus}</p>
          )}
        </div>

        <div className="rounded-2xl border border-emerald-500/20 bg-emerald-500/5 p-4 text-xs leading-relaxed text-muted">
          <p className="font-semibold text-emerald-400">Doc de démo pré-chargé</p>
          <p className="mt-1">
            Politique RH fictive (TechVision SAS) — télétravail, congés, sécurité.
            Testez sans upload.
          </p>
        </div>
      </aside>

      <div className="flex min-h-[520px] flex-col overflow-hidden rounded-2xl border border-border bg-background shadow-xl shadow-black/20">
        <div className="border-b border-border bg-surface/80 px-4 py-3">
          <p className="text-sm font-semibold">Assistant documentaire</p>
          <p className="text-xs text-muted">
            Propulsé par RAG · {site.developer.name}
          </p>
        </div>

        <div className="flex-1 space-y-4 overflow-y-auto p-4">
          {messages.map((msg) => (
            <div
              key={msg.id}
              className={`flex gap-3 ${msg.role === "user" ? "flex-row-reverse" : ""}`}
            >
              <div
                className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-xl ${
                  msg.role === "user"
                    ? "bg-accent text-white"
                    : "bg-accent/15 text-accent"
                }`}
              >
                {msg.role === "user" ? <User size={16} /> : <Bot size={16} />}
              </div>
              <div
                className={`max-w-[88%] rounded-2xl px-4 py-3 text-sm leading-relaxed ${
                  msg.role === "user"
                    ? "bg-accent text-white"
                    : "border border-border bg-surface"
                }`}
              >
                <p className="whitespace-pre-wrap">{msg.content}</p>
                {msg.sources && msg.sources.length > 0 && (
                  <SourceCards sources={msg.sources} />
                )}
              </div>
            </div>
          ))}

          {loading && (
            <div className="flex gap-3">
              <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-accent/15">
                <Loader2 size={16} className="animate-spin text-accent" />
              </div>
              <div className="rounded-2xl border border-border bg-surface px-4 py-3 text-sm text-muted">
                {loadingStep === "search"
                  ? "Recherche sémantique dans les documents..."
                  : "Génération de la réponse avec GPT..."}
              </div>
            </div>
          )}
          <div ref={bottomRef} />
        </div>

        <div className="border-t border-border px-4 py-3">
          <div className="mb-3 flex flex-wrap gap-2">
            {site.suggestions.map((s) => (
              <button
                key={s}
                type="button"
                onClick={() => handleAsk(s)}
                disabled={loading}
                className="rounded-full border border-border px-3 py-1 text-xs text-muted transition-colors hover:border-accent hover:text-accent disabled:opacity-50"
              >
                {s}
              </button>
            ))}
          </div>
          <form
            className="flex gap-2"
            onSubmit={(e) => {
              e.preventDefault();
              handleAsk(input);
            }}
          >
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ex : Quelle est la politique de télétravail ?"
              disabled={loading}
              className="flex-1 rounded-xl border border-border bg-surface px-4 py-3 text-sm outline-none focus:border-accent disabled:opacity-50"
            />
            <button
              type="submit"
              disabled={loading || !input.trim()}
              className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-accent text-white transition-colors hover:bg-accent-hover disabled:opacity-50"
            >
              <Send size={18} />
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
