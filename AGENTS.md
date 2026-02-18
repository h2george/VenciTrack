# AGENTS.md - Contexto y Reglas Operativas

> **Rol:** Actúas como un Ingeniero de Software Senior experto en este stack tecnológico. Prioriza la mantenibilidad, la seguridad y la consistencia con el código existente.

## 1. Contexto del Proyecto

**VenciTrack** es una plataforma de gestión de vencimientos y documentos críticos con arquitectura segregada (Frontend/Backend/Database) desplegada en contenedores Docker.

**Stack Principal:**
- **Lenguaje:** TypeScript 5.9
- **Frontend:** React 18 + Vite 5 + React Router 6
- **Backend:** Next.js 16 (API Routes) + Prisma ORM
- **Base de Datos:** PostgreSQL 15
- **Styling:** Tailwind CSS v4 + Framer Motion
- **Auth:** NextAuth.js 4.24 + JWT (jose)
- **Containerización:** Docker + Docker Compose

**Arquitectura:**
- `/client` - Frontend (React + Vite) → Puerto 3002 (dev) / 3004 (prod)
- `/api` - Backend (Next.js API) → Puerto 3001 (interno) / 3003 (externo)
- `/prisma` - Schema de base de datos y migraciones
- `/scripts` - Utilidades de deployment y setup

## 2. Comandos Operativos (Usa estos EXACTAMENTE)

El agente debe usar estos comandos para validar su trabajo:

**Desarrollo:**
- **Instalar dependencias:** `npm install --legacy-peer-deps`
- **Iniciar servidor dev completo:** `npm run dev` (Frontend + Backend concurrentemente)
- **Iniciar solo frontend:** `npm run dev:web` (Puerto 3002)
- **Iniciar solo backend:** `npm run dev:api` (Puerto 3001)

**Build y Deploy:**
- **Build completo:** `npm run build`
- **Build frontend:** `npm run build:web`
- **Build backend:** `npm run build:api`
- **Docker (Producción):** `docker-compose up --build -d`
- **Docker (Solo Frontend):** `docker-compose up --build -d frontend`

**Testing y Calidad:**
- **Linting:** `npm run lint` (Ejecutar siempre antes de confirmar cambios)
- **Prisma Studio:** `npx prisma studio` (Inspeccionar BD en desarrollo)
- **Migraciones:** `npx prisma migrate dev` (Solo en desarrollo)

## 3. Convenciones de Código

**Estilo:** Sigue estrictamente los patrones existentes en el código. No introduzcas estilos ajenos.

**Nombres:**
- **Componentes React:** `PascalCase` (Ej: `DocumentShowcase`, `ThemeToggle`)
- **Funciones/Variables:** `camelCase` (Ej: `getUserById`, `isAuthenticated`)
- **Constantes:** `UPPER_SNAKE_CASE` (Ej: `MAX_FILE_SIZE`, `API_BASE_URL`)
- **Archivos de componentes:** `PascalCase.tsx` (Ej: `Features.tsx`, `CTA.tsx`)
- **Archivos de utilidades:** `kebab-case.ts` (Ej: `auth-utils.ts`, `date-helpers.ts`)

**Imports:**
- Usa alias `@/` para imports absolutos desde `src/`
- Agrupa imports: externos → internos → tipos
- Ejemplo:
  ```typescript
  import { useState } from "react";
  import { Link } from "react-router-dom";
  
  import { Button } from "@/shared/components/ui/button";
  import type { User } from "@/types";
  ```

**Manejo de Errores:**
- Backend: Usa bloques `try-catch` con respuestas HTTP apropiadas
- Frontend: Usa Error Boundaries para errores de renderizado
- **Nunca** ignores errores silenciosamente
- Ejemplo:
  ```typescript
  try {
    const result = await riskyOperation();
    return NextResponse.json(result);
  } catch (error) {
    console.error("Error en operación:", error);
    return NextResponse.json(
      { error: "Mensaje amigable para el usuario" },
      { status: 500 }
    );
  }
  ```

**Comentarios:**
- Solo explica el "por qué" de la lógica compleja, no el "qué"
- Usa JSDoc para funciones públicas/exportadas
- Evita comentarios obvios

## 4. Estructura del Directorio

```
VenciTrack/
├── api/                    # Backend (Next.js)
│   ├── app/               # API Routes (Next.js App Router)
│   ├── lib/               # Utilidades del servidor
│   ├── prisma/            # Schema y migraciones
│   └── public/            # Assets estáticos del backend
├── client/                # Frontend (React + Vite)
│   ├── src/
│   │   ├── pages/         # Páginas principales
│   │   ├── shared/        # Componentes compartidos
│   │   │   ├── components/
│   │   │   │   ├── landing/  # Componentes de landing
│   │   │   │   ├── layout/   # Layout components
│   │   │   │   └── ui/       # UI primitives
│   │   ├── types/         # Definiciones TypeScript
│   │   ├── App.tsx        # Router principal
│   │   ├── main.tsx       # Entry point
│   │   └── index.css      # Estilos globales
│   ├── index.html         # HTML template
│   └── vite.config.ts     # Configuración Vite
├── scripts/               # Scripts de utilidad
├── docker-compose.yml     # Orquestación de contenedores
├── Dockerfile             # Multi-stage build
├── .env                   # Variables de entorno (NO COMMITEAR)
└── package.json           # Dependencias del monorepo
```

**Documentación Adicional:**
- `README.md` - Información general del proyecto
- `PORTS.md` - Configuración de puertos y networking
- `AGENTS.md` - Este archivo

## 5. Límites y Seguridad (NO HACER)

- 🚫 **Nunca** comitees secretos, claves API o archivos `.env`
- 🚫 **Nunca** elimines tests que fallan; arréglalos
- 🚫 **Nunca** cambies la configuración de build sin permiso explícito
- 🚫 **Nunca** uses `any` en TypeScript sin justificación documentada
- 🚫 **Nunca** expongas endpoints de API sin autenticación cuando sea necesaria
- 🚫 **Nunca** hagas queries directas a la BD desde el frontend
- ⚠️ **Pregunta siempre** antes de realizar migraciones destructivas en la base de datos
- ⚠️ **Pregunta siempre** antes de modificar el schema de Prisma
- ⚠️ **Pregunta siempre** antes de cambiar variables de entorno en producción

## 6. Flujo de Trabajo

### Para Nuevas Features:
1. **Analiza** el código relacionado antes de escribir
2. **Planifica** la estructura de archivos y componentes
3. **Implementa** siguiendo las convenciones establecidas
4. **Verifica** que el código compila sin errores TypeScript
5. **Ejecuta** `npm run lint` para validar estilo
6. **Prueba** manualmente la funcionalidad en desarrollo
7. **Documenta** cambios significativos si es necesario

### Para Bugs:
1. **Reproduce** el error en desarrollo
2. **Identifica** la causa raíz (usa logs, debugger)
3. **Corrige** el problema mínimamente (no refactorices innecesariamente)
4. **Verifica** que la corrección no rompe otras funcionalidades
5. **Ejecuta** linting y tests

### Para Refactoring:
1. **Justifica** por qué el refactor es necesario
2. **Mantén** la funcionalidad existente intacta
3. **Refactoriza** en pasos pequeños e incrementales
4. **Verifica** después de cada paso que todo sigue funcionando

## 7. Patrones Específicos del Proyecto

### Autenticación:
- Usa `jose` para JWT en lugar de `jsonwebtoken`
- Middleware de auth en `/api/middleware.ts`
- Tokens se validan con `NEXTAUTH_SECRET`

### Componentes React:
- Prefiere componentes funcionales con hooks
- Usa `framer-motion` para animaciones
- Componentes de UI siguen patrón de composición (ver `/client/src/shared/components/ui`)

### Estilos:
- Tailwind CSS v4 con configuración en `@theme`
- Variables CSS para temas (light/dark mode)
- Clases utilitarias preferidas sobre CSS custom

### Base de Datos:
- Prisma Client se genera automáticamente
- Schema está en `/api/prisma/schema.prisma`
- Migraciones se aplican con `npx prisma migrate dev`

### Docker:
- Multi-stage build (builder → api → web)
- Frontend servido por Nginx
- Backend usa Next.js standalone
- Variables de entorno se inyectan en tiempo de ejecución

## 8. Troubleshooting Común

**"Cannot find module '@/...'"**
→ Verifica que `tsconfig.json` tenga el path alias configurado

**"Prisma Client not generated"**
→ Ejecuta `npx prisma generate`

**"Port already in use"**
→ Verifica `PORTS.md` y mata procesos en puertos 3001-3004

**"Docker build fails"**
→ Limpia cache: `docker-compose down && docker system prune -f`

**"Styles not loading"**
→ Verifica que `index.css` esté importado en `main.tsx`

---

**Última actualización:** 2026-02-17
**Versión del proyecto:** 0.1.0