@echo off
REM Script de test de l'API meteorologique pour Windows

setlocal enabledelayedexpansion

echo.
echo ========================================
echo  Tests de l'API Meteo
echo ========================================
echo.

set API_URL=http://localhost:3001/api/weather

REM Verifier si curl est disponible
where curl >nul 2>nul
if %ERRORLEVEL% NEQ 0 (
    echo ERREUR: curl n'est pas installe ou accessible
    echo Pour installer curl, utilisez: choco install curl
    pause
    exit /b 1
)

REM Test 1: Paris
echo Test 1: Recuperer la meteo de Paris
echo Requete: %API_URL%/Paris
curl -s "%API_URL%/Paris"
echo.
echo.

REM Test 2: London
echo Test 2: Recuperer la meteo de London
echo Requete: %API_URL%/London
curl -s "%API_URL%/London"
echo.
echo.

REM Test 3: New York
echo Test 3: Recuperer la meteo de New York
echo Requete: %API_URL%/New York
curl -s "%API_URL%/New York"
echo.
echo.

REM Test 4: Ville inexistante
echo Test 4: Ville inexistante (test d'erreur)
echo Requete: %API_URL%/XyzInvalidCity123
curl -s "%API_URL%/XyzInvalidCity123"
echo.
echo.

echo ========================================
echo  Tests termines!
echo ========================================
echo.

pause
