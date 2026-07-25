"""
loader.py — Étape 1 du RAG : CHARGER les documents
===================================================

C'EST QUOI LE RAG EN 4 ÉTAPES ?
    1. LOAD   → lire tes documents (PDF, TXT...)
    2. CHUNK  → découper en petits morceaux
    3. EMBED  → transformer chaque morceau en vecteur (liste de nombres)
    4. RETRIEVE + GENERATE → chercher les morceaux pertinents, puis demander
       au LLM de répondre EN SE BASANT sur ces morceaux

À QUOI SERT CE FICHIER ?
    Il prend un fichier (PDF ou TXT) sur le disque et le transforme
    en liste de "Documents" LangChain — des objets qui contiennent :
    - page_content : le texte brut
    - metadata     : infos extra (nom du fichier, numéro de page...)

POURQUOI DES METADATA ?
    Pour citer la source dans la réponse : "D'après le document X, page 3..."
"""

from pathlib import Path

from langchain_community.document_loaders import PyPDFLoader, TextLoader
from langchain_core.documents import Document


def load_document(file_path: Path) -> list[Document]:
    """
    Charge un fichier et retourne une liste de Documents LangChain.

    Un PDF de 10 pages → 10 Documents (1 par page).
    Un TXT → 1 Document.
    """
    suffix = file_path.suffix.lower()

    if suffix == ".pdf":
        loader = PyPDFLoader(str(file_path))
    elif suffix == ".txt":
        loader = TextLoader(str(file_path), encoding="utf-8")
    else:
        raise ValueError(f"Format non supporté : {suffix}. Utilise .pdf ou .txt")

    documents = loader.load()

    # On enrichit chaque morceau avec le nom du fichier source
    for doc in documents:
        doc.metadata["source"] = file_path.name

    return documents
