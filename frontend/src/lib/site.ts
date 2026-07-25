export const site = {
  name: "RAG Enterprise",
  tagline: "Transformez vos documents en assistant IA fiable",
  description:
    "Solution RAG clé en main : vos PDF et documents internes deviennent un chatbot intelligent qui répond avec citations sources — sans inventer.",
  url: "https://rag-enterprise-tan.vercel.app",
  apiUrl: process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:8000",

  developer: {
    name: "Fares Ben Mabrouk",
    title: "Ingénieur Applications IA — Freelance",
    email: "fares.bmabrouk@gmail.com",
    github: "https://github.com/Fares-Ben",
    portfolio: "https://github.com/Fares-Ben",
    bio: "Je conçois et déploie des systèmes IA en production pour les entreprises. Spécialisé RAG, agents autonomes et intégration LLM. Ce projet est une démo live de mon savoir-faire.",
  },

  features: [
    {
      title: "Zéro hallucination",
      description:
        "Le LLM répond uniquement à partir de vos documents. S'il ne sait pas, il le dit clairement.",
      icon: "shield" as const,
    },
    {
      title: "Citations sources",
      description:
        "Chaque réponse cite le document et l'extrait utilisé. Traçabilité totale pour vos équipes.",
      icon: "quote" as const,
    },
    {
      title: "Upload instantané",
      description:
        "Déposez un PDF ou TXT — indexation automatique en quelques secondes via embeddings OpenAI.",
      icon: "upload" as const,
    },
    {
      title: "Production-ready",
      description:
        "Architecture scalable : FastAPI, ChromaDB, Next.js. Déployé sur Render + Vercel.",
      icon: "rocket" as const,
    },
  ],

  steps: [
    {
      num: "01",
      title: "Ingestion",
      description: "Vos PDF/TXT sont lus, découpés en morceaux optimisés.",
    },
    {
      num: "02",
      title: "Vectorisation",
      description: "Chaque morceau devient un vecteur sémantique (embedding).",
    },
    {
      num: "03",
      title: "Recherche",
      description: "Votre question trouve les passages les plus pertinents.",
    },
    {
      num: "04",
      title: "Génération",
      description: "GPT synthétise une réponse fiable avec les sources.",
    },
  ],

  stack: [
    "Python",
    "FastAPI",
    "LangChain",
    "ChromaDB",
    "OpenAI",
    "Next.js",
    "Tailwind CSS",
  ],

  suggestions: [
    "Quelle est la politique de télétravail ?",
    "Combien de jours de congés payés ?",
    "Quelles règles de sécurité informatique ?",
    "Quel budget formation par employé ?",
  ],
};
