@echo off
REM Script de verification de la configuration de l'app Meteo

echo.
echo ========================================
echo  Verification de Configuration
echo ========================================
echo.

setlocal enabledelayedexpansion

REM Couleurs (en utilisant mode CON)
set "SUCCESS=✓"
set "FAIL=✗"

echo [1/5] Verification de Node.js...
where node >nul 2>nul
if %ERRORLEVEL% EQU 0 (
    for /f "tokens=*" %%i in ('node --version') do set NODE_VERSION=%%i
    echo %SUCCESS% Node.js %NODE_VERSION% est installe
) else (
    echo %FAIL% Node.js n'est PAS installe!
    echo Telechargez depuis: https://nodejs.org/
    goto ERROR
)

echo.
echo [2/5] Verification de npm...
where npm >nul 2>nul
if %ERRORLEVEL% EQU 0 (
    for /f "tokens=*" %%i in ('npm --version') do set NPM_VERSION=%%i
    echo %SUCCESS% npm %NPM_VERSION% est installe
) else (
    echo %FAIL% npm n'est PAS installe!
    goto ERROR
)

echo.
echo [3/5] Verification des fichiers du projet...
if exist "server.js" (
    echo %SUCCESS% server.js trouve
) else (
    echo %FAIL% server.js manquant!
    goto ERROR
)

if exist "src\App.js" (
    echo %SUCCESS% src\App.js trouve
) else (
    echo %FAIL% src\App.js manquant!
    goto ERROR
)

if exist "package.json" (
    echo %SUCCESS% package.json trouve
) else (
    echo %FAIL% package.json manquant!
    goto ERROR
)

echo.
echo [4/5] Verification des dependances...
if exist "node_modules" (
    echo %SUCCESS% node_modules existe (dependances installes)
) else (
    echo %FAIL% node_modules n'existe pas
    echo Executez: npm install
    echo.
    set /p INSTALL="Installer maintenant? (o/n): "
    if /i "!INSTALL!"=="o" (
        call npm install
        if %ERRORLEVEL% NEQ 0 (
            echo %FAIL% Erreur lors de l'installation!
            goto ERROR
        )
        echo %SUCCESS% Dependances installes avec succes
    ) else (
        goto ERROR
    )
)

echo.
echo [5/5] Verification des fichiers critiques...
if exist "Lancer.bat" (
    echo %SUCCESS% Lancer.bat trouve
) else (
    echo %FAIL% Lancer.bat manquant (non critique)
)

if exist "README.md" (
    echo %SUCCESS% README.md trouve
) else (
    echo %FAIL% README.md manquant (non critique)
)

echo.
echo ========================================
echo  Configuration OK!
echo ========================================
echo.
echo Vous pouvez maintenant:
echo 1. Double-cliquer sur Lancer.bat
echo    OU
echo 2. Lancer manuellement:
echo    - Terminal 1: node server.js
echo    - Terminal 2: npm start
echo.
echo L'application ouvrira automatiquement sur http://localhost:3000
echo.
pause
exit /b 0

:ERROR
echo.
echo ========================================
echo  Erreur de Configuration
echo ========================================
echo.
echo Veuillez verifier les problemes ci-dessus.
echo.
pause
exit /b 1
