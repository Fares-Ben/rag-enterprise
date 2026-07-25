"""
startup.py — Initialisation au demarrage du serveur
====================================================

Sur Render (hebergement cloud), le disque est efface a chaque redeploiement.
Donc ChromaDB est vide au demarrage.

Ce script re-indexe automatiquement le document sample pour que la demo
fonctionne immediatement sans upload manuel.
"""

from pathlib import Path

from backend.config import ROOT_DIR
from backend.rag.pipeline import ingest_file
from backend.rag.store import get_vector_store

SAMPLE_DOC = ROOT_DIR / "data" / "sample_entreprise.txt"


def seed_sample_document() -> None:
    """Indexe le document sample si la base vectorielle est vide."""
    if not SAMPLE_DOC.exists():
        return

    try:
        store = get_vector_store()
        count = store._collection.count()
        if count == 0:
            result = ingest_file(SAMPLE_DOC)
            print(f"[startup] {result['message']}")
        else:
            print(f"[startup] Base deja indexee ({count} chunks)")
    except Exception as e:
        print(f"[startup] Seed ignore : {e}")
