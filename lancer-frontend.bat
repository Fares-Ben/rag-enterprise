@echo off
chcp 65001 >nul
title RAG Enterprise - Frontend
cd /d "%~dp0frontend"

if not exist "node_modules" (
    echo Installation des dependances frontend...
    call npm install
)

echo.
echo ============================================
echo   Interface chat : http://localhost:3001
echo   ^(Lance lancer-api.bat dans un autre terminal^)
echo ============================================
echo.

call npm run dev
