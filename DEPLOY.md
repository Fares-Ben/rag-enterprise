# Deploiement en ligne — RAG Enterprise

Guide pour mettre le projet sur internet (gratuit).

## Architecture deployee

```
Utilisateur
    │
    ▼
Vercel (frontend)     →  https://ton-app.vercel.app
    │
    ▼  API calls
Render (backend)      →  https://rag-enterprise-api.onrender.com
    │
    ▼
OpenAI API + ChromaDB
```

---

## Etape 1 — GitHub (5 min)

```cmd
cd C:\Users\Administrateur\rag-enterprise
git add .
git commit -m "RAG Enterprise: API FastAPI + interface chat Next.js"
```

Cree un repo sur https://github.com/new nomme `rag-enterprise`, puis :

```cmd
git remote add origin https://github.com/Fares-ben/rag-enterprise.git
git branch -M main
git push -u origin main
```

---

## Etape 2 — Backend sur Render (10 min)

1. Va sur https://render.com et cree un compte (gratuit)
2. **New +** → **Blueprint** (ou Web Service)
3. Connecte ton repo GitHub `rag-enterprise`
4. Render detecte `render.yaml` automatiquement
5. Ajoute la variable d'environnement :
   - `OPENAI_API_KEY` = ta cle OpenAI
6. Clique **Deploy**

Attends 5-10 min. Tu obtiens une URL du type :
`https://rag-enterprise-api.onrender.com`

Teste : ouvre `https://TON-URL.onrender.com/health`

> **Note :** Le plan gratuit "s'endort" apres 15 min d'inactivite.
> Le premier appel peut prendre ~30 secondes (cold start).

---

## Etape 3 — Frontend sur Vercel (5 min)

1. Va sur https://vercel.com et connecte GitHub
2. **Add New Project** → importe `rag-enterprise`
3. Configure :
   - **Root Directory** : `frontend`
   - **Framework** : Next.js (auto)
4. Variable d'environnement :
   - `NEXT_PUBLIC_API_URL` = `https://TON-URL-RENDER.onrender.com`
5. **Deploy**

Tu obtiens : `https://rag-enterprise-xxx.vercel.app`

---

## Etape 4 — Mettre a jour le portfolio

Dans `portfolio/src/data/content.ts`, projet RAG Enterprise :

```ts
status: "live",
liveUrl: "https://rag-enterprise-xxx.vercel.app",
repoUrl: "https://github.com/Fares-ben/rag-enterprise",
```

Puis redeploie le portfolio sur Vercel.

---

## Checklist finale

- [ ] `/health` du backend repond `ok`
- [ ] Le frontend affiche "API connectee" (badge vert)
- [ ] Question test : "Quelle est la politique de teletravail ?" fonctionne
- [ ] Upload PDF fonctionne
- [ ] Lien demo sur le portfolio

---

## Cout mensuel

| Service | Cout |
|---------|------|
| Render (free) | 0 EUR |
| Vercel (free) | 0 EUR |
| OpenAI API | ~0.01-0.05 EUR par question |

Budget demo : quelques centimes pour des dizaines de tests.
