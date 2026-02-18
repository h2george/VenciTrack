@echo off
REM Script de inicio inteligente para desarrollo en Windows
REM Detecta puerto disponible y levanta el servidor API

set PREFERRED_PORT=3000
set SCRIPT_DIR=%~dp0

echo Buscando puerto disponible para API...

REM Ejecutar el script de detección de puerto
for /f %%i in ('node "%SCRIPT_DIR%find-port.js" %PREFERRED_PORT%') do set AVAILABLE_PORT=%%i

if defined AVAILABLE_PORT (
    echo Iniciando API en puerto %AVAILABLE_PORT%
    set PORT=%AVAILABLE_PORT%
    next dev -p %AVAILABLE_PORT%
) else (
    echo No se pudo encontrar un puerto disponible
    exit /b 1
)
