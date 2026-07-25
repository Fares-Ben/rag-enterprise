# RAG Enterprise

Base de connaissances IA avec **RAG** (Retrieval-Augmented Generation) — upload de documents, recherche semantique et chat avec citations sources.

![Python](https://img.shields.io/badge/Python-3.12-blue)
![FastAPI](https://img.shields.io/badge/FastAPI-0.115+-green)
![Next.js](https://img.shields.io/badge/Next.js-16-black)
![LangChain](https://img.shields.io/badge/LangChain-RAG-orange)

## Demo

- **Interface chat** : deploy sur Vercel (voir [DEPLOY.md](./DEPLOY.md))
- **API** : FastAPI + Swagger sur `/docs`

## Fonctionnalites

- Upload PDF / TXT avec indexation automatique
- Recherche semantique via ChromaDB + OpenAI embeddings
- Chat RAG avec citations sources (anti-hallucination)
- Interface web Next.js responsive
- API REST documentee (FastAPI)

## Stack

| Couche | Technologie |
|--------|-------------|
| Backend | Python, FastAPI, LangChain |
| Vector DB | ChromaDB |
| LLM | OpenAI GPT-4o-mini |
| Frontend | Next.js 16, Tailwind CSS 4 |
| Deploy | Render (API) + Vercel (UI) |

## Demarrage rapide (local)

```cmd
# 1. Installer
python -m venv venv
venv\Scripts\activate
pip install -r requirements.txt
copy .env.example .env
# Editer .env avec ta cle OPENAI_API_KEY

# 2. Tester
test.bat

# 3. Interface complete
lancer-tout.bat
# → http://localhost:3001
```

## Architecture

```
Document PDF/TXT
      │
      ▼
 [Loader] → [Chunker] → [Embeddings] → [ChromaDB]
                                              │
Question ──► [Recherche semantique] ──────────┘
                      │
                      ▼
              [GPT + Contexte] → Reponse + Sources
```

## Deploiement

Guide complet : **[DEPLOY.md](./DEPLOY.md)**

## Auteur

**Fares Ben Mabrouk** — Ingénieur Applications IA

- GitHub : [@Fares-ben](https://github.com/Fares-ben)
- Portfolio : [portfolio](https://github.com/Fares-ben)
