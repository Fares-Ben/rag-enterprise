"""
Script de test en ligne de commande — pour apprendre sans lancer l'API
=======================================================================

Usage :
    cd rag-enterprise
    python scripts/test_rag.py
"""

import sys
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
sys.path.insert(0, str(ROOT))

from backend.rag.chain import ask
from backend.rag.pipeline import ingest_file

SAMPLE_DOC = ROOT / "data" / "sample_entreprise.txt"


def main():
    print("=" * 60)
    print("  RAG ENTERPRISE - Test du pipeline")
    print("=" * 60)

    if not SAMPLE_DOC.exists():
        print(f"[ERREUR] Fichier sample introuvable : {SAMPLE_DOC}")
        return

    print("\n[1/2] Ingestion du document sample...")
    result = ingest_file(SAMPLE_DOC)
    print(f"      {result['message']}")

    question = "Quelle est la politique de teletravail de l'entreprise ?"
    print(f"\n[2/2] Question : {question}")
    print("      Recherche + generation en cours...")
    response = ask(question)

    print(f"\n--- REPONSE ---\n{response.answer}")
    print(f"\n--- SOURCES ({len(response.sources)}) ---")
    for src in response.sources:
        print(f"  - {src['source']} : {src['excerpt'][:80]}...")

    print("\n[OK] Test termine avec succes !")


if __name__ == "__main__":
    try:
        main()
    except ValueError as e:
        print(f"\n[ERREUR] {e}")
        print("\n=> Copie .env.example en .env et ajoute ta cle OpenAI.")
        print("   https://platform.openai.com/api-keys")
        sys.exit(1)
    except Exception as e:
        print(f"\n[ERREUR] {type(e).__name__}: {e}")
        sys.exit(1)
