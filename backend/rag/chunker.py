"""
chunker.py — Étape 2 du RAG : DÉCOUPER le texte
================================================

POURQUOI DÉCOUPER ?
    Un LLM a une limite de contexte (ex. 128k tokens). Un PDF de 100 pages
    ne rentre pas entier. Et surtout : pour une question précise, on veut
    envoyer au LLM SEULEMENT les passages pertinents, pas tout le livre.

    → On découpe en "chunks" (morceaux) de ~1000 caractères.

C'EST QUOI L'OVERLAP (chevauchement) ?
    Imagine qu'une phrase importante est coupée entre chunk 1 et chunk 2.
    Avec un overlap de 200 caractères, la fin du chunk 1 = début du chunk 2.
    → On ne perd pas d'info aux frontières.

    [---- chunk 1 ----]
              [---- chunk 2 ----]   ← 200 caractères en commun
                        [---- chunk 3 ----]

COMMENT ÇA MARCHE ?
    RecursiveCharacterTextSplitter essaie de couper aux retours à la ligne,
    puis aux points, puis aux espaces — pour ne pas couper au milieu d'un mot.
"""

from langchain_core.documents import Document
from langchain_text_splitters import RecursiveCharacterTextSplitter

from backend.config import CHUNK_OVERLAP, CHUNK_SIZE


def split_documents(documents: list[Document]) -> list[Document]:
    """Découpe une liste de Documents en morceaux plus petits."""
    splitter = RecursiveCharacterTextSplitter(
        chunk_size=CHUNK_SIZE,
        chunk_overlap=CHUNK_OVERLAP,
        length_function=len,
        separators=["\n\n", "\n", ". ", " ", ""],
    )

    return splitter.split_documents(documents)
