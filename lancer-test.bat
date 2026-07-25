@echo off
chcp 65001 >nul
title RAG Enterprise - Lancement
cd /d "%~dp0"

echo.
echo ============================================
echo   RAG ENTERPRISE - Guide de lancement
echo ============================================
echo.

REM --- Verifier le venv ---
if not exist "venv\Scripts\python.exe" (
    echo [1/4] Creation de l'environnement Python...
    python -m venv venv
    call venv\Scripts\activate.bat
    pip install -r requirements.txt
) else (
    echo [OK] Environnement Python trouve
    call venv\Scripts\activate.bat
)

REM --- Verifier le .env ---
if not exist ".env" (
    echo.
    echo [2/4] Fichier .env manquant !
    echo.
    copy .env.example .env
    echo.
    echo  IMPORTANT : Ouvre le fichier .env et remplace sk-ta-cle-ici
    echo  par ta vraie cle OpenAI.
    echo.
    echo  Obtiens une cle ici : https://platform.openai.com/api-keys
    echo.
    notepad .env
    echo.
    echo  Appuie sur une touche APRES avoir sauvegarde ta cle dans .env...
    pause >nul
)

REM --- Verifier que la cle est configuree ---
findstr /C:"sk-ta-cle-ici" .env >nul 2>&1
if %errorlevel%==0 (
    echo.
    echo  ERREUR : Ta cle OpenAI n'est pas configuree dans .env
    echo  Ouvre .env et mets ta vraie cle ^(commence par sk-^)
    echo.
    notepad .env
    pause
    exit /b 1
)

echo [OK] Cle API configuree
echo.
echo [3/4] Lancement du test RAG...
echo.
python scripts\test_rag.py

echo.
echo ============================================
if %errorlevel%==0 (
    echo   Test reussi ! Le RAG fonctionne.
    echo.
    echo   Pour lancer l'API web :
    echo   lancer-api.bat
) else (
    echo   Erreur lors du test. Lis le message ci-dessus.
)
echo ============================================
echo.
pause
