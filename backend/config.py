"""
config.py — Configuration centralisée du projet
================================================

À QUOI ÇA SERT ?
    Un seul endroit pour tous les paramètres (clé API, chemins, modèles).
    Comme ça, si tu changes de modèle OpenAI, tu modifies UN fichier.

COMMENT ÇA MARCHE ?
    python-dotenv lit le fichier .env à la racine du projet
    et charge OPENAI_API_KEY dans les variables d'environnement.
"""

import os
from pathlib import Path

from dotenv import load_dotenv

# Racine du projet (dossier rag-enterprise/)
ROOT_DIR = Path(__file__).resolve().parent.parent

# Charge les variables du fichier .env
load_dotenv(ROOT_DIR / ".env")

# Clé API OpenAI — obligatoire pour embeddings + chat
OPENAI_API_KEY = os.getenv("OPENAI_API_KEY", "")

# Dossier où on stocke les PDF uploadés par l'utilisateur
UPLOAD_DIR = ROOT_DIR / "data" / "uploads"
UPLOAD_DIR.mkdir(parents=True, exist_ok=True)

# Dossier où ChromaDB stocke les vecteurs (embeddings)
CHROMA_DIR = ROOT_DIR / "data" / "chroma_db"

# Modèle pour transformer le texte en vecteurs (embeddings)
# "text-embedding-3-small" = rapide, pas cher, très bon pour débuter
EMBEDDING_MODEL = "text-embedding-3-small"

# Modèle pour générer les réponses (le "cerveau" du chat)
CHAT_MODEL = "gpt-4o-mini"

# Taille des morceaux de texte (en caractères approximatifs → tokens)
# 1000 caractères ≈ 250 tokens. Overlap = chevauchement entre morceaux
# pour ne pas couper une phrase au milieu.
CHUNK_SIZE = 1000
CHUNK_OVERLAP = 200
