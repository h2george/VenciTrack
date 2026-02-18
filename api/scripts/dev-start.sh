#!/bin/bash

# Script de inicio inteligente para desarrollo
# Detecta puerto disponible y levanta el servidor API

PREFERRED_PORT=3000
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"

echo "🔍 Buscando puerto disponible para API..."

# Ejecutar el script de detección de puerto
AVAILABLE_PORT=$(node "$SCRIPT_DIR/find-port.js" $PREFERRED_PORT)

if [ $? -eq 0 ]; then
    echo "🚀 Iniciando API en puerto $AVAILABLE_PORT"
    export PORT=$AVAILABLE_PORT
    next dev -p $AVAILABLE_PORT
else
    echo "❌ No se pudo encontrar un puerto disponible"
    exit 1
fi
