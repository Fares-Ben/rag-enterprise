@echo off
chcp 65001 >nul
title RAG Enterprise - API
cd /d "%~dp0"

call venv\Scripts\activate.bat

if not exist ".env" (
    echo Fichier .env manquant. Lance d'abord lancer-test.bat
    pause
    exit /b 1
)

echo.
echo ============================================
echo   API RAG demarree !
echo   Ouvre dans ton navigateur :
echo   http://localhost:8000/docs
echo.
echo   Appuie sur Ctrl+C pour arreter
echo ============================================
echo.

python -m uvicorn backend.main:app --reload
