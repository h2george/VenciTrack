#!/bin/sh
# Ensure line endings are LF

echo "Starting service..."
echo "Current directory: $(pwd)"
ls -F

if [ -d "api" ]; then
    echo "Checking api directory:"
    ls -F api/
fi

if [ "$SERVICE_TYPE" = "api" ]; then
    echo "🚀 Service: BACKEND API"
    if [ -f "scripts/db-init.js" ]; then
        node scripts/db-init.js
    fi
fi

if [ -f "server.js" ]; then
    echo "🚀 Start standalone (server.js found)"
    exec node server.js
elif [ -f "api/server.js" ]; then
    echo "🚀 Start standalone (api/server.js found)"
    exec node api/server.js
else
    echo "🚀 Start standalone (server.js not found, listing files to debug)"
    find . -maxdepth 3 -not -path '*/.*'
    echo "❌ Error: server.js not found and npm not available."
    exit 1
fi
