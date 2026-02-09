# VenciTrack Docker Deployment Guide

## Prerequisites
- Docker and Docker Compose installed
- Node.js (for secret generation script)

## Architecture Overview
VenciTrack uses a highly optimized **Native DB Layer** to minimize container size and memory usage.
- **Native SQL Initialization**: Uses `scripts/db-init.js` with raw SQL (`prisma/init.sql`) instead of Prisma Migrate in production.
- **Native Seeding**: Uses `scripts/db-seed.js` with `bcryptjs` and `pg` to seed initial data without requiring the heavy Prisma Engine binary.
- **Standalone Build**: The Next.js application runs in `standalone` mode on Alpine Linux (~120MB image size).

## Quick Start

### 1. Configure Environment Variables
```bash
# Copy template to .env
cp .env.example .env

# Generate a secure NEXTAUTH_SECRET (Requires Node.js)
node scripts/generate-secret.js
# -> Copy the output and paste it into .env

# Edit other variables in .env (DB Password, etc.)
```

### 2. Build and Start Services
```bash
docker-compose up --build -d
```
The application will be available at:
- Local: **http://localhost:3000**
- Production (CapRover): **https://your-domain.com** (Managed automatically)

The container **automatically** initializes and seeds the database on startup using the `SERVICE_TYPE=api` entrypoint logic. No manual migration commands are needed.

### 3. Verify Health
```bash
# Check container status
docker-compose ps

# Health check endpoint
curl http://localhost:3000/api/health
```

## Production Configuration (CapRover)

When deploying to CapRover:
1.  **NEXTAUTH_URL**: Set this to your full domain (e.g., `https://app.vencitrack.com`). No port is needed.
2.  **Environment Variables**: Enter your variables in the CapRover "App Config" section.
3.  **Ports**: CapRover automatically maps the container's exposed port (3000) to the public domain (80/443).

## Configuration Management
System settings (SMTP, Analytics) are managed via the **Admin Panel** (`/admin/settings`), NOT environment variables. This allows dynamic updates without restarting containers.

## Useful Commands

### Restart Services
```bash
docker-compose restart
```

### View Logs
```bash
docker-compose logs -f app
```

### Backup Database
```bash
docker-compose exec db pg_dump -U vencitrack_admin vencitrack_db > backup.sql
```
