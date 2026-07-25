"""
pipeline.py — ORCHESTRATEUR : assemble toutes les étapes
=========================================================

À QUOI ÇA SERT ?
    Quand l'utilisateur upload un PDF, on enchaîne automatiquement :
    Load → Chunk → Index (embed + store)

    Un seul appel : ingest_file(chemin_du_pdf)
    au lieu de rappeler loader, chunker, store à la main.

C'EST LE "PIPELINE D'INGESTION" — l'autre moitié du RAG :
    - Ingestion  = documents → base vectorielle  (upload)
    - Query      = question → réponse            (chain.py)
"""

from pathlib import Path

from backend.rag.chunker import split_documents
from backend.rag.loader import load_document
from backend.rag.store import index_documents


def ingest_file(file_path: Path) -> dict:
    """
    Ingère un fichier complet dans la base vectorielle.

    Retourne un résumé : combien de pages, combien de chunks indexés.
    """
    # Étape 1 : charger le document
    documents = load_document(file_path)

    # Étape 2 : découper en morceaux
    chunks = split_documents(documents)

    # Étape 3 : vectoriser et stocker dans ChromaDB
    count = index_documents(chunks)

    return {
        "filename": file_path.name,
        "pages_loaded": len(documents),
        "chunks_indexed": count,
        "message": f"[OK] {file_path.name} indexe : {count} morceaux en base.",
    }
