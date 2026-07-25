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

  sampleDocument: {
    filename: "sample_entreprise.txt",
    title: "Politique interne — TechVision SAS",
    content: `POLITIQUE INTERNE — TechVision SAS
===================================

1. TÉLÉTRAVAIL
L'entreprise TechVision autorise le télétravail jusqu'à 3 jours par semaine.
Chaque employé doit être présent au bureau au minimum 2 jours par semaine,
les mardi et jeudi étant les jours de présence obligatoire pour les réunions d'équipe.

2. HORAIRES
Les horaires flexibles sont autorisés entre 8h et 10h pour l'arrivée,
et entre 17h et 19h pour le départ. Un forfait jours s'applique aux cadres.

3. CONGÉS
Chaque salarié dispose de 25 jours de congés payés par an, plus 2 jours
de RTT pour les cadres. Les demandes doivent être validées 2 semaines à l'avance
via l'intranet RH.

4. SÉCURITÉ INFORMATIQUE
Tous les employés doivent activer l'authentification à deux facteurs (2FA)
sur leurs comptes. Les mots de passe doivent être changés tous les 90 jours.
Il est interdit de stocker des données clients sur des clés USB personnelles.

5. FORMATION
TechVision alloue un budget de 2000€ par an et par employé pour la formation
continue. Les formations en cybersécurité et intelligence artificielle sont
prioritaires pour l'année 2026.

6. CONTACT RH
Pour toute question : rh@techvision.fr ou Marie Dupont, DRH, poste 1234.`,
  },
};
