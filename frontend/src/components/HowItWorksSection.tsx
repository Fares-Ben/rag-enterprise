import { site } from "@/lib/site";

export function HowItWorksSection() {
  return (
    <section id="how" className="scroll-mt-24 px-6 py-24">
      <div className="mx-auto max-w-6xl">
        <p className="mb-2 text-sm font-medium uppercase tracking-widest text-accent">
          Pipeline RAG
        </p>
        <h2 className="text-3xl font-bold sm:text-4xl">Comment ça marche ?</h2>
        <p className="mt-4 max-w-2xl text-muted">
          Quatre étapes entre vos documents et une réponse fiable. C&apos;est exactement
          ce pipeline que je déploie pour mes clients freelance.
        </p>

        <div className="mt-12 grid gap-6 md:grid-cols-4">
          {site.steps.map((step, i) => (
            <div key={step.num} className="relative">
              {i < site.steps.length - 1 && (
                <div className="absolute left-1/2 top-8 hidden h-0.5 w-full bg-border md:block" />
              )}
              <div className="relative rounded-2xl border border-border bg-surface p-5">
                <span className="text-2xl font-bold text-accent/40">{step.num}</span>
                <h3 className="mt-2 font-bold">{step.title}</h3>
                <p className="mt-2 text-sm text-muted">{step.description}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-10 rounded-2xl border border-accent/20 bg-accent/5 p-6 text-center text-sm text-muted">
          <strong className="text-foreground">Exemple concret :</strong> un PDF de 50
          pages RH devient un assistant qui répond « Combien de jours de télétravail ? »
          en citant la page exacte — en moins de 3 secondes.
        </div>
      </div>
    </section>
  );
}
