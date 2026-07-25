import { Github, Mail, ExternalLink } from "lucide-react";
import { site } from "@/lib/site";

export function DeveloperSection() {
  const initials = site.developer.name
    .split(" ")
    .map((n) => n[0])
    .join("");

  return (
    <section id="developer" className="scroll-mt-24 bg-surface/40 px-6 py-24">
      <div className="mx-auto max-w-6xl">
        <p className="mb-2 text-sm font-medium uppercase tracking-widest text-accent">
          Derrière le projet
        </p>
        <h2 className="text-3xl font-bold sm:text-4xl">
          Qui a développé RAG Enterprise ?
        </h2>

        <div className="mt-12 grid gap-10 lg:grid-cols-5">
          <div className="flex flex-col items-center text-center lg:col-span-2 lg:items-start lg:text-left">
            <div className="flex h-24 w-24 items-center justify-center rounded-2xl bg-gradient-to-br from-accent to-violet-600 text-3xl font-bold text-white shadow-lg shadow-accent/30">
              {initials}
            </div>
            <h3 className="mt-5 text-2xl font-bold">{site.developer.name}</h3>
            <p className="mt-1 text-accent">{site.developer.title}</p>
            <p className="mt-4 text-sm leading-relaxed text-muted">
              {site.developer.bio}
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <a
                href={`mailto:${site.developer.email}?subject=Mission RAG / IA`}
                className="inline-flex items-center gap-2 rounded-xl bg-accent px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-accent-hover"
              >
                <Mail size={16} />
                Me contacter
              </a>
              <a
                href={site.developer.github}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-xl border border-border px-5 py-2.5 text-sm font-semibold transition-colors hover:border-accent hover:text-accent"
              >
                <Github size={16} />
                GitHub
              </a>
            </div>
          </div>

          <div className="lg:col-span-3">
            <div className="rounded-2xl border border-border bg-background p-6">
              <h4 className="font-bold">Ce que je propose en freelance</h4>
              <ul className="mt-4 space-y-3 text-sm text-muted">
                <li className="flex gap-2">
                  <span className="text-accent">→</span>
                  Chatbot RAG sur vos documents internes (PDF, Notion, Confluence)
                </li>
                <li className="flex gap-2">
                  <span className="text-accent">→</span>
                  Intégration API OpenAI / Anthropic dans votre produit existant
                </li>
                <li className="flex gap-2">
                  <span className="text-accent">→</span>
                  MVP SaaS avec IA intégrée — de l&apos;idée au deploy en 4-8 semaines
                </li>
                <li className="flex gap-2">
                  <span className="text-accent">→</span>
                  Agents IA & automatisation de workflows métier
                </li>
              </ul>

              <div className="mt-6 border-t border-border pt-6">
                <p className="mb-3 text-xs font-semibold uppercase tracking-widest text-muted">
                  Stack de ce projet
                </p>
                <div className="flex flex-wrap gap-2">
                  {site.stack.map((tech) => (
                    <span
                      key={tech}
                      className="rounded-lg border border-border bg-surface px-3 py-1 text-xs font-medium"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              <a
                href="https://github.com/Fares-Ben/rag-enterprise"
                target="_blank"
                rel="noopener noreferrer"
                className="mt-6 inline-flex items-center gap-1.5 text-sm font-medium text-accent hover:underline"
              >
                Voir le code source sur GitHub
                <ExternalLink size={14} />
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
