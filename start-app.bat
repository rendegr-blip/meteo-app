@echo off
REM Script pour lancer le serveur météo et l'application React

echo Lancement du serveur meteorologique...
start cmd /k "node server.js"

echo.
echo En attente que le serveur démarre (3 secondes)...
timeout /t 3 /nobreak

echo.
echo Lancement de l'application React...
start cmd /k "npm start"

echo.
echo Applications lancées!
echo - Serveur: http://localhost:3000
echo - App React: http://localhost:3000 (via npm start)
