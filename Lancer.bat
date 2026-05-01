@echo off
cd /d "%~dp0"

echo.
echo ========================================
echo  Application Meteo - Demarrage
echo ========================================
echo.

REM Verifier si npm est installe
where npm >nul 2>nul
if %ERRORLEVEL% NEQ 0 (
    echo ERREUR: npm n'est pas installe!
    echo Veuillez installer Node.js depuis https://nodejs.org/
    pause
    exit /b 1
)

REM Installer les dependances si node_modules n'existe pas
if not exist "node_modules" (
    echo Installation des dependances...
    call npm install
    if %ERRORLEVEL% NEQ 0 (
        echo ERREUR: Impossible d'installer les dependances!
        pause
        exit /b 1
    )
)

echo.
echo Lancement du serveur meteorologique...
start cmd /k "title Serveur Meteo & node server.js"

echo.
echo Attente du demarrage du serveur (3 secondes)...
timeout /t 3 /nobreak

echo.
echo Lancement de l'application React...
start cmd /k "title Application Meteo React & npm start"

echo.
echo ========================================
echo  Applications demarrees!
echo ========================================
echo.
echo Serveur API: http://localhost:3000/api/weather/Paris
echo Application: Une fenetre React devrait s'ouvrir automatiquement
echo.
echo IMPORTANT:
echo - Ne fermez pas ces fenetres pour maintenir les applications actives
echo - Fermer une fenetre arretera l'application correspondante
echo.
pause
