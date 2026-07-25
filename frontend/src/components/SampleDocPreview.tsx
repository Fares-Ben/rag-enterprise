"use client";

import { useState } from "react";
import { ChevronDown, FileText } from "lucide-react";
import { site } from "@/lib/site";

export function SampleDocPreview() {
  const [open, setOpen] = useState(false);
  const { sampleDocument } = site;

  return (
    <div className="rounded-2xl border border-border bg-background">
      <button
        type="button"
        onClick={() => setOpen(!open)}
        className="flex w-full items-center justify-between p-4 text-left"
      >
        <div className="flex items-center gap-2">
          <FileText size={16} className="shrink-0 text-accent" />
          <div>
            <p className="text-sm font-semibold">Contenu du doc de démo</p>
            <p className="text-xs text-muted">{sampleDocument.filename}</p>
          </div>
        </div>
        <ChevronDown
          size={16}
          className={`shrink-0 text-muted transition-transform ${open ? "rotate-180" : ""}`}
        />
      </button>

      {open && (
        <div className="border-t border-border px-4 pb-4">
          <p className="py-2 text-xs font-medium text-accent">
            {sampleDocument.title}
          </p>
          <pre className="max-h-64 overflow-y-auto rounded-xl border border-border bg-surface p-3 text-xs leading-relaxed text-muted whitespace-pre-wrap">
            {sampleDocument.content}
          </pre>
          <p className="mt-2 text-xs text-muted">
            C&apos;est ce texte que le RAG indexe et interroge quand vous posez
            une question.
          </p>
        </div>
      )}
    </div>
  );
}
