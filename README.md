# VenciTrack

Sistema de gestión de vencimientos y documentos con arquitectura premium.

## 🚀 Modos de Ejecución

### 1. Desarrollo Local (Rápido)
Ideal para programar nuevas funcionalidades. Usa **SQLite**.

1. Instalar dependencias: `npm install`
2. Configurar `.env` (usa los valores por defecto de SQLite).
3. Sincronizar base de datos: `npx prisma db push`
4. Iniciar: `npm run dev`

### 2. Pruebas de Producción (Docker)
Ideal para validar el despliegue antes de subir a CapRover. Usa **PostgreSQL**.

1. Preparar entorno:
   ```bash
   cp .env.example .env
   node scripts/generate-secret.js # Generar NEXTAUTH_SECRET
   ```
2. Iniciar contenedores: `docker-compose up --build -d`
3. Sincronizar base de datos:
   ```bash
   docker-compose exec app npx prisma db push
   docker-compose exec app npx prisma db seed
   ```
4. Acceder en: `http://localhost:3000`

## 🛡️ Configuración Dinámica
Una vez desplegado, la configuración de **SMTP** y **Analytics (Meta/Google)** se gestiona directamente desde el **Panel de Administración** (`/admin/settings`). No es necesario reiniciar el servidor ni modificar el archivo `.env`.

## 🏗️ Tecnología
- **Frontend**: Next.js 15 (App Router)
- **UI**: Tailwind CSS + Antigravity UI
- **ORM**: Prisma
- **DB**: SQLite (Dev) / PostgreSQL (Prod)
- **Auth**: NextAuth.js
