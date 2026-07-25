import { Quote, Rocket, Shield, Upload } from "lucide-react";
import { site } from "@/lib/site";

const icons = { shield: Shield, quote: Quote, upload: Upload, rocket: Rocket };

export function FeaturesSection() {
  return (
    <section id="features" className="scroll-mt-24 bg-surface/40 px-6 py-24">
      <div className="mx-auto max-w-6xl">
        <p className="mb-2 text-sm font-medium uppercase tracking-widest text-accent">
          Pour vos clients
        </p>
        <h2 className="text-3xl font-bold sm:text-4xl">
          Pourquoi choisir une solution RAG ?
        </h2>
        <p className="mt-4 max-w-2xl text-muted">
          ChatGPT seul invente des réponses. Un système RAG interroge{" "}
          <em>vos</em> documents et cite ses sources — idéal pour RH, support,
          conformité, onboarding.
        </p>

        <div className="mt-12 grid gap-6 sm:grid-cols-2">
          {site.features.map((f) => {
            const Icon = icons[f.icon];
            return (
              <article
                key={f.title}
                className="rounded-2xl border border-border bg-background p-6 transition-colors hover:border-accent/40"
              >
                <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-xl bg-accent/10 text-accent">
                  <Icon size={20} />
                </div>
                <h3 className="text-lg font-bold">{f.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted">
                  {f.description}
                </p>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
