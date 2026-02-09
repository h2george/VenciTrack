# 🏗️ Arquitectura de VenciTrack (Estándar 2025)

Este documento define la estructura y principios arquitectónicos de VenciTrack para garantizar escalabilidad, seguridad y mantenibilidad profesional.

---

## 📂 Estructura de Directorios

```text
src/
├── app/                  # Capa de Ruteo (Thin Routes)
│   ├── (auth)/           # Grupo de rutas de autenticación
│   ├── (dashboard)/      # Grupo de rutas de aplicación principal
│   ├── admin/            # Panel de control administrativo
│   └── api/              # Endpoints RESTful
│
├── features/             # Lógica de Negocio (Domain Driven Design simple)
│   ├── auth/             # Componentes, hooks y acciones de login/registro
│   ├── documents/        # Gestión de documentos y vencimientos
│   ├── reminders/        # Lógica de notificaciones y colas
│   └── users/            # Gestión de perfil y preferencias
│
├── shared/               # Recursos Compartidos (Agnósticos al dominio)
│   ├── components/       # Componentes UI reutilizables (shadcn/ui adaptado)
│   ├── lib/              # Utilidades, hooks globales y constantes
│   └── types/            # Definiciones de TypeScript compartidas
│
└── server/               # Capa de Infraestructura (Server-only)
    └── db/               # Cliente Prisma Proxy y Bridge Nativo
```

---

## 🛠️ Stack Tecnológico

- **Framework**: Next.js 16 (App Router) - Standalone Build
- **Lenguaje**: TypeScript (Strict Mode)
- **Base de Datos**: PostgreSQL 15
- **ORM (Dev)**: Prisma (para esquema y tipos)
- **ORM (Prod)**: Native DB Bridge (`pg` + `db-init.js` + `db-seed.js`) para optimización de contenedor.
- **Estilos**: Tailwind CSS v4
- **Despliegue**: Docker (Alpine Multi-stage build)

---

## 🔐 Principios de Seguridad

1.  **Secretos Dinámicos**: Nunca incluir contraseñas en el código o en `docker-compose.yml`. Se usa `scripts/setup-env.mjs` para generar secretos robustos en el entorno.
2.  **Identidad Proyectual**: Los usuarios de DB deben seguir el formato `[app_name]_admin` (e.g., `vencitrack_admin`).
3.  **Contraseñas Robustas**: Mínimo 32 caracteres hexadecimales para bases de datos en producción.
4.  **Aislamiento**: El entorno local utiliza `.env` y el entorno de contenedores utiliza `.env.production`.

---

## 🚀 Flujo de Desarrollo y Despliegue

### Local
1.  `npm install`
2.  `npx prisma generate`
3.  `npm run dev`

### Docker (Producción)
1.  `node scripts/setup-env.mjs` (Genera credenciales seguras)
2.  `docker-compose up --build -d`

**Nota Importante**: En producción, el contenedor detecta `SERVICE_TYPE=api` y ejecuta automáticamente `scripts/db-init.js` y `scripts/db-seed.js` para inicializar la base de datos sin necesitar el binario de Prisma.

---

## 📜 Reglas de Oro para el Agente (Antigravity)

1.  **No ensucies**: Elimina archivos temporales o de prueba inmediatamente después de usarlos.
2.  **Sigue la estructura**: Si vas a crear un componente, pregúntate si es de una `feature` o es `shared`.
3.  **Tipado Estricto**: No uses `any`. Define interfaces robustas en `shared/types`.
4.  **Acciones de Servidor**: Prefiere Server Actions en `features/[name]/actions.ts` para mutaciones de datos.
