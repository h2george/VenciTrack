#!/bin/sh
set -e

# SERVICE TYPE LOGIC
if [ "$SERVICE_TYPE" = "api" ]; then
    echo "🏗️  Service: BACKEND API (Native PG)"
    
    # Run Native Database Initialization
    echo "⏳ Initializing Database Schema..."
    node scripts/db-init.js
    
    # Run Native Seed
    echo "🌱 Seeding initial system data..."
    if [ -f "scripts/db-seed.js" ]; then
        node scripts/db-seed.js
    elif [ -f "prisma/seed.js" ]; then
        # Fallback to compiled prisma seed if exists
        node prisma/seed.js
    fi
    
    echo "✅ Native driver active."

elif [ "$SERVICE_TYPE" = "web" ]; then
    echo "🎨 Service: FRONTEND WEB"
    echo "🚀 Direct start..."
fi

# Start Server
echo "⚡ Starting Next.js Standalone..."
exec node server.js
