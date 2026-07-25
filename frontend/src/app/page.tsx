import { Header, Footer } from "@/components/Header";
import { HeroSection } from "@/components/HeroSection";
import { FeaturesSection } from "@/components/FeaturesSection";
import { HowItWorksSection } from "@/components/HowItWorksSection";
import { ChatPanel } from "@/components/ChatPanel";
import { DeveloperSection } from "@/components/DeveloperSection";

export default function Home() {
  return (
    <>
      <Header />
      <main>
        <HeroSection />

        <FeaturesSection />
        <HowItWorksSection />

        <section id="demo" className="scroll-mt-24 px-6 py-24">
          <div className="mx-auto max-w-6xl">
            <p className="mb-2 text-sm font-medium uppercase tracking-widest text-accent">
              Démo interactive
            </p>
            <h2 className="text-3xl font-bold sm:text-4xl">
              Testez le RAG en direct
            </h2>
            <p className="mt-4 max-w-2xl text-muted">
              Un document RH de démonstration est déjà indexé. Posez une question ou
              uploadez votre propre fichier — c&apos;est le même pipeline que je
              livre en mission client.
            </p>
            <div className="mt-10">
              <ChatPanel />
            </div>
          </div>
        </section>

        <DeveloperSection />
      </main>
      <Footer />
    </>
  );
}
