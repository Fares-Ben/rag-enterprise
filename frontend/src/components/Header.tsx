"use client";

import { useEffect, useState } from "react";
import { Github, Mail, Menu, Wifi, WifiOff, X } from "lucide-react";
import { checkHealth } from "@/lib/api";
import { site } from "@/lib/site";

const nav = [
  { label: "Fonctionnalités", href: "#features" },
  { label: "Comment ça marche", href: "#how" },
  { label: "Démo live", href: "#demo" },
  { label: "Développeur", href: "#developer" },
];

export function Header() {
  const [apiOnline, setApiOnline] = useState<boolean | null>(null);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    checkHealth().then(setApiOnline);
    const id = setInterval(() => checkHealth().then(setApiOnline), 15000);
    return () => clearInterval(id);
  }, []);

  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-border/60 bg-background/85 backdrop-blur-xl">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        <a href="#" className="text-lg font-bold tracking-tight">
          {site.name}
          <span className="text-accent">.</span>
        </a>

        <nav className="hidden items-center gap-8 md:flex">
          {nav.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="text-sm text-muted transition-colors hover:text-accent"
            >
              {item.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <div
            className={`hidden items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-medium sm:flex ${
              apiOnline
                ? "bg-emerald-500/15 text-emerald-400"
                : "bg-amber-500/15 text-amber-400"
            }`}
          >
            {apiOnline ? <Wifi size={12} /> : <WifiOff size={12} />}
            {apiOnline === null ? "..." : apiOnline ? "Live" : "API wake up"}
          </div>
          <a
            href={`mailto:${site.developer.email}?subject=Mission RAG Enterprise`}
            className="hidden rounded-lg bg-accent px-4 py-2 text-xs font-semibold text-white transition-colors hover:bg-accent-hover sm:block"
          >
            Me contacter
          </a>
          <button
            type="button"
            className="rounded-lg p-2 text-muted md:hidden"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Menu"
          >
            {menuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {menuOpen && (
        <nav className="border-t border-border px-6 py-4 md:hidden">
          {nav.map((item) => (
            <a
              key={item.href}
              href={item.href}
              onClick={() => setMenuOpen(false)}
              className="block py-2 text-sm text-muted hover:text-accent"
            >
              {item.label}
            </a>
          ))}
          <a
            href={`mailto:${site.developer.email}`}
            className="mt-2 block text-sm font-semibold text-accent"
          >
            Me contacter
          </a>
        </nav>
      )}
    </header>
  );
}

export function Footer() {
  return (
    <footer className="border-t border-border bg-surface/50 px-6 py-10">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-6 sm:flex-row">
        <div className="text-center sm:text-left">
          <p className="font-bold">
            {site.name}
            <span className="text-accent">.</span>
          </p>
          <p className="mt-1 text-sm text-muted">
            Développé par{" "}
            <a href="#developer" className="text-accent hover:underline">
              {site.developer.name}
            </a>
          </p>
        </div>
        <div className="flex gap-4">
          <a
            href={site.developer.github}
            target="_blank"
            rel="noopener noreferrer"
            className="flex h-10 w-10 items-center justify-center rounded-xl border border-border text-muted transition-colors hover:border-accent hover:text-accent"
            aria-label="GitHub"
          >
            <Github size={18} />
          </a>
          <a
            href={`mailto:${site.developer.email}`}
            className="flex h-10 w-10 items-center justify-center rounded-xl border border-border text-muted transition-colors hover:border-accent hover:text-accent"
            aria-label="Email"
          >
            <Mail size={18} />
          </a>
        </div>
        <p className="text-xs text-muted">
          Stack : {site.stack.slice(0, 4).join(" · ")}
        </p>
      </div>
    </footer>
  );
}
