import { ArrowRight, Brain, Shield, Sparkles } from "lucide-react";
import { site } from "@/lib/site";

export function HeroSection() {
  return (
    <section className="relative overflow-hidden px-6 pb-20 pt-32">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -left-40 top-20 h-96 w-96 rounded-full bg-accent/10 blur-3xl" />
        <div className="absolute -right-40 bottom-0 h-96 w-96 rounded-full bg-violet-500/10 blur-3xl" />
      </div>

      <div className="relative mx-auto max-w-6xl">
        <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-accent/25 bg-accent/5 px-4 py-1.5 text-sm text-accent">
          <Sparkles size={14} />
          Démo live — Projet portfolio IA
        </div>

        <h1 className="max-w-3xl text-4xl font-bold leading-tight tracking-tight sm:text-5xl lg:text-6xl">
          {site.tagline}
        </h1>

        <p className="mt-6 max-w-2xl text-lg leading-relaxed text-muted">
          {site.description} Solution développée par{" "}
          <strong className="text-foreground">{site.developer.name}</strong>, ingénieur
          applications IA freelance.
        </p>

        <div className="mt-8 flex flex-wrap gap-4">
          <a
            href="#demo"
            className="inline-flex items-center gap-2 rounded-xl bg-accent px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-accent/25 transition-all hover:bg-accent-hover"
          >
            Essayer la démo
            <ArrowRight size={16} />
          </a>
          <a
            href="#how"
            className="inline-flex items-center gap-2 rounded-xl border border-border px-6 py-3 text-sm font-semibold transition-colors hover:border-accent hover:text-accent"
          >
            Comment ça marche
          </a>
        </div>

        <div className="mt-12 grid gap-4 sm:grid-cols-3">
          {[
            { icon: Brain, label: "RAG en production", sub: "LangChain + ChromaDB" },
            { icon: Shield, label: "Réponses traçables", sub: "Citations sources" },
            { icon: Sparkles, label: "GPT-4o-mini", sub: "OpenAI API" },
          ].map(({ icon: Icon, label, sub }) => (
            <div
              key={label}
              className="rounded-2xl border border-border bg-surface/60 p-4 backdrop-blur"
            >
              <Icon size={20} className="mb-2 text-accent" />
              <p className="text-sm font-semibold">{label}</p>
              <p className="text-xs text-muted">{sub}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
