"""
store.py — Étapes 3 & 4 du RAG : EMBEDDINGS + STOCKAGE VECTORIEL
=================================================================

C'EST QUOI UN EMBEDDING ?
    C'est transformer du texte en une liste de nombres (vecteur).
    Exemple simplifié : "chat" → [0.2, -0.5, 0.8, ...]  (1536 nombres)

    La magie : des textes SIMILAIRES ont des vecteurs PROCHES.
    "chat" et "felin" → vecteurs voisins
    "chat" et "voiture" → vecteurs éloignés

    → La "recherche sémantique" = trouver les chunks dont le vecteur
      est le plus proche de la question de l'utilisateur.

C'EST QUOI CHROMADB ?
    Une base de données spécialisée pour stocker et chercher des vecteurs.
    Gratuite, locale (sur ton disque), parfaite pour apprendre.
    En prod, on utilise souvent Pinecone ou pgvector.

FLUX COMPLET DE CE FICHIER :
    1. OpenAIEmbeddings appelle l'API OpenAI pour vectoriser chaque chunk
    2. Chroma stocke (vecteur + texte original + metadata) sur le disque
    3. similarity_search(question) vectorise la question, puis trouve
       les k chunks les plus proches
"""

from pathlib import Path

from langchain_chroma import Chroma
from langchain_core.documents import Document
from langchain_openai import OpenAIEmbeddings

from backend.config import CHROMA_DIR, EMBEDDING_MODEL, OPENAI_API_KEY

COLLECTION_NAME = "enterprise_docs"


def _get_embeddings() -> OpenAIEmbeddings:
    if not OPENAI_API_KEY:
        raise ValueError(
            "OPENAI_API_KEY manquante. Copie .env.example en .env et ajoute ta clé."
        )
    return OpenAIEmbeddings(model=EMBEDDING_MODEL, api_key=OPENAI_API_KEY)


def get_vector_store() -> Chroma:
    """Ouvre (ou crée) la base vectorielle ChromaDB."""
    CHROMA_DIR.mkdir(parents=True, exist_ok=True)
    return Chroma(
        collection_name=COLLECTION_NAME,
        embedding_function=_get_embeddings(),
        persist_directory=str(CHROMA_DIR),
    )


def index_documents(chunks: list[Document]) -> int:
    """
    Indexe des chunks dans ChromaDB.
    Retourne le nombre de morceaux ajoutés.
    """
    store = get_vector_store()
    store.add_documents(chunks)
    return len(chunks)


def search_similar(query: str, k: int = 4) -> list[Document]:
    """
    Recherche sémantique : trouve les k chunks les plus pertinents
    par rapport à la question.

    k=4 → on envoie les 4 meilleurs passages au LLM (compromis qualité/coût).
    """
    store = get_vector_store()
    return store.similarity_search(query, k=k)
