@echo off
chcp 65001 >nul
title RAG Enterprise - Demarrage complet
cd /d "%~dp0"

echo Demarrage de l'API backend...
start "RAG API" cmd /k "cd /d %~dp0 && call venv\Scripts\activate.bat && python -m uvicorn backend.main:app --reload"

timeout /t 3 /nobreak >nul

echo Demarrage de l'interface chat...
start "RAG Frontend" cmd /k "cd /d %~dp0 && lancer-frontend.bat"

echo.
echo ============================================
echo   Deux fenetres ont ete ouvertes :
echo   1. API      -> http://localhost:8000/docs
echo   2. Chat UI  -> http://localhost:3001
echo ============================================
pause
