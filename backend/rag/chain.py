"""
chain.py — Étape 5 du RAG : GÉNÉRER la réponse
===============================================

C'EST LE CŒUR DU RAG !
    RAG = Retrieval-Augmented Generation
    = Récupération augmentée + Génération

FLUX QUAND L'UTILISATEUR POSE UNE QUESTION :
    1. RETRIEVAL  → search_similar() trouve les 4 chunks pertinents
    2. AUGMENT    → on injecte ces chunks dans le prompt du LLM
    3. GENERATION → le LLM répond EN SE BASANT sur ces chunks

POURQUOI UN PROMPT SPÉCIAL ?
    Sans instructions, le LLM pourrait inventer (halluciner).
    On lui dit explicitement :
    - "Réponds UNIQUEMENT avec le contexte fourni"
    - "Si tu ne sais pas, dis-le"
    - "Cite tes sources"

    → Réponses plus fiables, traçables.

SCHÉMA :
    Question ──► [Recherche vectorielle] ──► Chunks pertinents
                                                    │
                                                    ▼
    Réponse ◄── [GPT-4o-mini] ◄── Prompt = Question + Chunks
"""

from dataclasses import dataclass

from langchain_core.documents import Document
from langchain_core.prompts import ChatPromptTemplate
from langchain_openai import ChatOpenAI

from backend.config import CHAT_MODEL, OPENAI_API_KEY
from backend.rag.store import search_similar

# Template du prompt — {context} et {question} seront remplis à l'exécution
RAG_PROMPT = ChatPromptTemplate.from_messages(
    [
        (
            "system",
            """Tu es un assistant expert qui répond aux questions en te basant
UNIQUEMENT sur le contexte documentaire fourni ci-dessous.

Règles :
- Si la réponse n'est pas dans le contexte, dis : "Je ne trouve pas cette information dans les documents."
- Cite la source quand c'est possible (nom du fichier).
- Réponds dans la langue de la question.
- Sois précis et concis.

Contexte documentaire :
{context}""",
        ),
        ("human", "{question}"),
    ]
)


@dataclass
class RAGResponse:
    """Structure de la réponse RAG — réponse + sources utilisées."""

    answer: str
    sources: list[dict]


def _format_context(docs: list[Document]) -> str:
    """Assemble les chunks en un seul bloc de texte pour le prompt."""
    parts = []
    for i, doc in enumerate(docs, 1):
        source = doc.metadata.get("source", "inconnu")
        page = doc.metadata.get("page")
        page_info = f", page {page + 1}" if page is not None else ""
        parts.append(f"[Source {i}: {source}{page_info}]\n{doc.page_content}")
    return "\n\n---\n\n".join(parts)


def ask(question: str, k: int = 4) -> RAGResponse:
    """
    Pipeline RAG complet : question → recherche → génération → réponse.

    Paramètres :
        question : la question de l'utilisateur
        k        : nombre de chunks à récupérer (défaut 4)
    """
    if not OPENAI_API_KEY:
        raise ValueError("OPENAI_API_KEY manquante dans le fichier .env")

    # 1. RETRIEVAL — chercher les passages pertinents
    relevant_docs = search_similar(question, k=k)

    if not relevant_docs:
        return RAGResponse(
            answer="Aucun document indexé. Uploade d'abord un PDF ou TXT.",
            sources=[],
        )

    # 2. AUGMENT — préparer le contexte
    context = _format_context(relevant_docs)

    # 3. GENERATION — appeler le LLM
    llm = ChatOpenAI(model=CHAT_MODEL, api_key=OPENAI_API_KEY, temperature=0)
    chain = RAG_PROMPT | llm
    result = chain.invoke({"context": context, "question": question})

    # Extraire les sources pour les afficher à l'utilisateur
    sources = [
        {
            "source": doc.metadata.get("source", "inconnu"),
            "page": doc.metadata.get("page"),
            "excerpt": doc.page_content[:200] + "...",
        }
        for doc in relevant_docs
    ]

    return RAGResponse(answer=result.content, sources=sources)
