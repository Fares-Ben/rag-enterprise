"""
main.py — API REST FastAPI
===========================

À QUOI ÇA SERT ?
    Expose ton RAG sur internet (localhost pour l'instant) via HTTP.
    Le frontend (ou Postman, ou curl) appelle ces URLs :

    POST /upload   → envoie un PDF, l'indexe
    POST /ask      → pose une question, reçoit une réponse
    GET  /health   → vérifie que le serveur tourne

POURQUOI FASTAPI ?
    - Rapide à écrire
    - Documentation auto sur /docs (Swagger)
    - Standard en Python pour les APIs IA

LANCER LE SERVEUR :
    cd rag-enterprise
    python -m uvicorn backend.main:app --reload
    → http://localhost:8000/docs
"""

import shutil
from contextlib import asynccontextmanager
from pathlib import Path

from fastapi import FastAPI, File, HTTPException, UploadFile
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel

from backend.config import UPLOAD_DIR
from backend.rag.chain import ask
from backend.rag.pipeline import ingest_file
from backend.startup import seed_sample_document


@asynccontextmanager
async def lifespan(app: FastAPI):
    seed_sample_document()
    yield


app = FastAPI(
    title="RAG Enterprise API",
    description="Base de connaissances IA — upload de docs + questions/réponses",
    version="0.1.0",
    lifespan=lifespan,
)

# CORS = autorise le frontend (Next.js sur port 3000) à appeler cette API
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)


class AskRequest(BaseModel):
    question: str


class AskResponse(BaseModel):
    answer: str
    sources: list[dict]


@app.get("/health")
def health():
    return {"status": "ok", "message": "RAG Enterprise API is running"}


@app.post("/upload")
async def upload_document(file: UploadFile = File(...)):
    """
    Upload un PDF ou TXT → indexation automatique dans ChromaDB.

    Exemple avec curl :
    curl -X POST http://localhost:8000/upload -F "file=@mon_doc.pdf"
    """
    suffix = Path(file.filename or "").suffix.lower()
    if suffix not in {".pdf", ".txt"}:
        raise HTTPException(400, "Seuls les fichiers .pdf et .txt sont acceptés.")

    dest = UPLOAD_DIR / (file.filename or "document")
    with dest.open("wb") as buffer:
        shutil.copyfileobj(file.file, buffer)

    try:
        result = ingest_file(dest)
        return result
    except Exception as e:
        raise HTTPException(500, f"Erreur d'indexation : {e}") from e


@app.post("/ask", response_model=AskResponse)
def ask_question(body: AskRequest):
    """
    Pose une question sur les documents indexés.

    Exemple :
    curl -X POST http://localhost:8000/ask -H "Content-Type: application/json" \\
         -d '{"question": "Quels sont les points clés du document ?"}'
    """
    if not body.question.strip():
        raise HTTPException(400, "La question ne peut pas être vide.")

    try:
        response = ask(body.question)
        return AskResponse(answer=response.answer, sources=response.sources)
    except ValueError as e:
        raise HTTPException(400, str(e)) from e
    except Exception as e:
        raise HTTPException(500, f"Erreur RAG : {e}") from e
