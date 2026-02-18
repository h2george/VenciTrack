#!/bin/bash
set -e

echo "🚀 VenciTrack - Professional Setup Script"
echo "=========================================="
echo ""

# Check if .env already exists
if [ -f ".env" ]; then
    echo "⚠️  .env file already exists."
    read -p "Do you want to regenerate it? (y/N): " -n 1 -r
    echo
    if [[ ! $REPLY =~ ^[Yy]$ ]]; then
        echo "✅ Using existing .env file"
        ENV_EXISTS=true
    else
        rm .env
        ENV_EXISTS=false
    fi
else
    ENV_EXISTS=false
fi

# Generate .env from template if needed
if [ "$ENV_EXISTS" = false ]; then
    echo "📝 Generating secure environment variables..."
    
    # Generate secure random values
    POSTGRES_PASSWORD=$(openssl rand -base64 32 | tr -d "=+/" | cut -c1-32)
    NEXTAUTH_SECRET=$(openssl rand -base64 48 | tr -d "=+/" | cut -c1-64)
    
    # Create .env file
    cat > .env << EOF
# --- VenciTrack Environment Configuration (AUTO-GENERATED) ---
# Generated on: $(date)

# Database Configuration
POSTGRES_USER="vencitrack_admin"
POSTGRES_PASSWORD="${POSTGRES_PASSWORD}"
POSTGRES_DB="vencitrack_db"
POSTGRES_HOST="localhost"
POSTGRES_PORT=5434

# Authentication Security
NEXTAUTH_SECRET="${NEXTAUTH_SECRET}"
NEXTAUTH_URL="http://localhost:3001"
PORT=3001
EOF

    echo "✅ .env file created successfully!"
    echo ""
    echo "🔐 Generated Credentials:"
    echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
    echo "Database User:     vencitrack_admin"
    echo "Database Password: ${POSTGRES_PASSWORD}"
    echo "Database Name:     vencitrack_db"
    echo "Database Port:     5434"
    echo ""
    echo "NextAuth Secret:   ${NEXTAUTH_SECRET}"
    echo "Application URL:   http://localhost:3001"
    echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
    echo ""
    echo "⚠️  IMPORTANT: Save these credentials securely!"
    echo ""
fi

# Start Docker containers
echo "🐳 Starting Docker containers..."
docker-compose up -d --build

echo ""
echo "✅ VenciTrack is starting up!"
echo "📊 Check status: docker-compose ps"
echo "📋 View logs: docker-compose logs -f"
echo "🌐 Access app: http://localhost:3001"
echo ""
echo "Default admin credentials:"
echo "  Email: vencitrack_admin@example.com"
echo "  Password: VenciTrack2025!"
